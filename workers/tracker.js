/**
 * Cloudflare Worker - Project Tracker
 * KV namespace: PROJECTS | Secrets: ADMIN_PASSWORD, INTERNAL_KEY
 */

import { AttemptCounter, overLimit, visitorKey } from "./attempt-counter.js"

export { AttemptCounter }

const ALLOWED_ORIGINS = ["https://prescriptdigital.com", "https://www.prescriptdigital.com", "http://localhost:3000"]
// Keep in sync with MONTHLY_PLANS in src/lib/tracker.ts.
const MONTHLY_PLANS = ["Seed", "Bloom", "Authority", "Launch", "Build", "Scale", "Command", "Growth Engine"]
const STATUSES = ["active", "paused", "completed"]
const SUBSCRIPTION_STAGES = ["Onboarding","Account Setup","Strategy & Planning","Execution","Review & Reporting"]
const PACKAGE_STAGES = ["Brief & Discovery","Strategy","Design & Build","Client Review","Delivery"]

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
  }
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  })
}

function getStages(planName, type) {
  const monthly = type ? type === "monthly" : MONTHLY_PLANS.includes(planName)
  return monthly ? SUBSCRIPTION_STAGES : PACKAGE_STAGES
}

const text = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "")

// Unguessable. Payment references are not used because some (Flutterwave) are plain sequential numbers.
function newReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const c = [...crypto.getRandomValues(new Uint8Array(10))].map(b => alphabet[b % 32]).join("")
  return "PSC-" + c.slice(0, 5) + "-" + c.slice(5)
}

async function createProject(env, fields) {
  const now = new Date().toISOString()
  const project = { id: "prj_" + crypto.randomUUID(), reference: newReference(), currentStage: 0, notes: "", assignedTeam: [], startDate: now, updatedAt: now, status: "active", ...fields }
  await env.PROJECTS.put("project:" + project.reference, JSON.stringify(project))
  return project
}

function cleanUpdates(body, project) {
  const out = {}
  if (Number.isInteger(body.currentStage) && body.currentStage >= 0 && body.currentStage < project.stages.length) out.currentStage = body.currentStage
  if (STATUSES.includes(body.status)) out.status = body.status
  if (typeof body.notes === "string") out.notes = body.notes.slice(0, 5000)
  if (Array.isArray(body.assignedTeam)) out.assignedTeam = body.assignedTeam.filter(e => typeof e === "string").slice(0, 50)
  return out
}

// No built-in default: with neither the KV value nor the secret set, every login is refused.
async function getAdminPassword(env) { return (await env.PROJECTS.get("config:admin_password")) || env.ADMIN_PASSWORD || null }
async function passwordMatches(given, env) { const pw = await getAdminPassword(env); return Boolean(pw) && given === pw }
async function requireAdmin(req, env) { return passwordMatches(req.headers.get("X-Admin-Key"), env) }
async function tooMany(env, req, name, limit) { return overLimit(env.ATTEMPTS, name + ":" + visitorKey(req), limit) }
function tooManyResponse(origin) { return json({ success: false, error: "Too many attempts. Wait a minute and try again." }, 429, origin) }
function requireInternal(req, env) { return req.headers.get("X-Internal-Key") === env.INTERNAL_KEY }

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ""
    const url = new URL(request.url)
    const path = url.pathname

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(origin) })

    // Admin calls carry the password, so they are limited too; otherwise they could be used to guess it.
    if (request.headers.has("X-Admin-Key") && (await tooMany(env, request, "admin", 60))) return tooManyResponse(origin)

    if (path === "/auth" && request.method === "POST") {
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      if (await tooMany(env, request, "login", 5)) return tooManyResponse(origin)
      if (await passwordMatches(body.password, env)) return json({ success: true }, 200, origin)
      return json({ success: false, error: "Invalid password" }, 401, origin)
    }

    if (path === "/change-password" && request.method === "POST") {
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      if (await tooMany(env, request, "login", 5)) return tooManyResponse(origin)
      if (!(await passwordMatches(body.oldPassword, env))) return json({ success: false, error: "Current password incorrect" }, 401, origin)
      if (!body.newPassword || typeof body.newPassword !== "string" || body.newPassword.length < 12) return json({ success: false, error: "New password must be at least 12 characters" }, 400, origin)
      await env.PROJECTS.put("config:admin_password", body.newPassword)
      return json({ success: true }, 200, origin)
    }

    // Called by the payment Worker. Verifying the same payment twice returns the same project.
    if (path === "/project" && request.method === "POST") {
      if (!env.INTERNAL_KEY || !requireInternal(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const paymentReference = text(String(body.reference ?? ""), 100)
      const planName = text(body.planName, 100)
      const provider = text(body.provider, 40)
      if (!paymentReference || !planName || !provider) return json({ success: false, error: "Missing fields" }, 400, origin)
      const paymentKey = "payment:" + provider + ":" + paymentReference
      const known = await env.PROJECTS.get(paymentKey)
      if (known) return json({ success: true, created: false, reference: known }, 200, origin)
      const project = await createProject(env, { planName, customerEmail: text(body.customerEmail, 200), customerName: text(body.customerName, 200), amount: text(body.amount, 60), provider, paymentReference, stages: getStages(planName) })
      await env.PROJECTS.put(paymentKey, project.reference)
      return json({ success: true, created: true, reference: project.reference }, 200, origin)
    }

    // Added by hand in admin: bank transfers and Enterprise clients.
    if (path === "/projects" && request.method === "POST") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const planName = text(body.planName, 100)
      const customerName = text(body.customerName, 200)
      if (!planName || !customerName) return json({ success: false, error: "Add the client name and the plan or project" }, 400, origin)
      if (!["monthly", "project"].includes(body.type)) return json({ success: false, error: "Choose monthly plan or one-time project" }, 400, origin)
      const project = await createProject(env, { planName, customerName, customerEmail: text(body.customerEmail, 200), amount: text(body.amount, 60), provider: "Manual", paymentReference: text(body.paymentReference, 100), stages: getStages(planName, body.type) })
      return json({ success: true, project }, 200, origin)
    }

    // Public: only what the customer needs to see.
    if (path === "/project" && request.method === "GET") {
      if (await tooMany(env, request, "lookup", 20)) return tooManyResponse(origin)
      const ref = text(url.searchParams.get("ref"), 60).toUpperCase()
      if (!ref) return json({ success: false, error: "Missing ref" }, 400, origin)
      const raw = await env.PROJECTS.get("project:" + ref)
      if (!raw) return json({ success: false, error: "Project not found" }, 404, origin)
      const { reference, planName, currentStage, stages, startDate, updatedAt, status } = JSON.parse(raw)
      return json({ success: true, project: { reference, planName, currentStage, stages, startDate, updatedAt, status } }, 200, origin)
    }

    if (path === "/project" && request.method === "PUT") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const raw = await env.PROJECTS.get("project:" + text(body.reference, 60))
      if (!raw) return json({ success: false, error: "Project not found" }, 404, origin)
      const project = JSON.parse(raw)
      const updated = { ...project, ...cleanUpdates(body, project), updatedAt: new Date().toISOString() }
      await env.PROJECTS.put("project:" + project.reference, JSON.stringify(updated))
      return json({ success: true, project: updated }, 200, origin)
    }

    if (path === "/project" && request.method === "DELETE") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const raw = await env.PROJECTS.get("project:" + text(body.reference, 60))
      if (!raw) return json({ success: false, error: "Project not found" }, 404, origin)
      const project = JSON.parse(raw)
      if (project.provider !== "Manual") await env.PROJECTS.delete("payment:" + project.provider + ":" + project.paymentReference)
      await env.PROJECTS.delete("project:" + project.reference)
      return json({ success: true }, 200, origin)
    }

    // Listed by prefix rather than a shared index, which two simultaneous payments could overwrite.
    if (path === "/projects" && request.method === "GET") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      const names = []
      let cursor
      do {
        const page = await env.PROJECTS.list({ prefix: "project:", cursor })
        names.push(...page.keys.map(k => k.name))
        cursor = page.list_complete ? undefined : page.cursor
      } while (cursor)
      const projects = (await Promise.all(names.map(n => env.PROJECTS.get(n)))).filter(Boolean).map(r => JSON.parse(r))
      projects.sort((x, y) => y.startDate.localeCompare(x.startDate))
      return json({ success: true, projects }, 200, origin)
    }

    if (path === "/team" && request.method === "GET") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      const ti = await env.PROJECTS.get("index:team")
      const index = ti ? JSON.parse(ti) : []
      const members = await Promise.all(index.map(async e => { const raw = await env.PROJECTS.get("team:" + e); return raw ? JSON.parse(raw) : null }))
      return json({ success: true, members: members.filter(Boolean) }, 200, origin)
    }

    if (path === "/team" && request.method === "POST") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const { name, role, whatsapp, email } = body
      if (!name || !email) return json({ success: false, error: "name and email required" }, 400, origin)
      if (await env.PROJECTS.get("team:" + email)) return json({ success: false, error: "Email exists" }, 409, origin)
      const member = { id: "tm_" + Date.now(), name, role: role || "", whatsapp: whatsapp || "", email, createdAt: new Date().toISOString() }
      await env.PROJECTS.put("team:" + email, JSON.stringify(member))
      const ti2 = await env.PROJECTS.get("index:team")
      const tia = ti2 ? JSON.parse(ti2) : []
      tia.push(email)
      await env.PROJECTS.put("index:team", JSON.stringify(tia))
      return json({ success: true, member }, 200, origin)
    }

    if (path === "/team" && request.method === "PUT") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const { email, ...updates } = body
      if (!email) return json({ success: false, error: "Missing email" }, 400, origin)
      const raw = await env.PROJECTS.get("team:" + email)
      if (!raw) return json({ success: false, error: "Member not found" }, 404, origin)
      const updated = { ...JSON.parse(raw), ...updates, email }
      await env.PROJECTS.put("team:" + email, JSON.stringify(updated))
      return json({ success: true, member: updated }, 200, origin)
    }

    if (path === "/team" && request.method === "DELETE") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const { email } = body
      if (!email) return json({ success: false, error: "Missing email" }, 400, origin)
      await env.PROJECTS.delete("team:" + email)
      const ti = await env.PROJECTS.get("index:team")
      const tia = ti ? JSON.parse(ti) : []
      await env.PROJECTS.put("index:team", JSON.stringify(tia.filter(e => e !== email)))
      return json({ success: true }, 200, origin)
    }

    return json({ success: false, error: "Not found" }, 404, origin)
  },
}