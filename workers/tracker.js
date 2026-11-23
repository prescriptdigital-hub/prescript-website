/**
 * Cloudflare Worker - Project Tracker
 * KV namespace: PROJECTS | Secrets: ADMIN_PASSWORD, INTERNAL_KEY
 */

const ALLOWED_ORIGINS = ["https://prescriptdigital.com", "https://www.prescriptdigital.com", "http://localhost:3000"]
const SUBSCRIPTION_NAMES = ["Seed","Grow","Thrive","Launch","Build","Scale","Dominate","Growth Engine","AI Business System"]
const SUBSCRIPTION_STAGES = ["Onboarding","Account Setup","Strategy & Planning","Execution","Review & Reporting"]
const PACKAGE_STAGES = ["Brief & Discovery","Strategy","Design & Build","Client Review","Delivery"]

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key, X-Internal-Key",
  }
}

function json(data, status = 200, origin = "") {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  })
}

function isSubscription(n) { return SUBSCRIPTION_NAMES.some(s => n.toLowerCase().includes(s.toLowerCase())) }
function getStages(n) { return isSubscription(n) ? SUBSCRIPTION_STAGES : PACKAGE_STAGES }
// No built-in default: with neither the KV value nor the secret set, every login is refused.
async function getAdminPassword(env) { return (await env.PROJECTS.get("config:admin_password")) || env.ADMIN_PASSWORD || null }
async function passwordMatches(given, env) { const pw = await getAdminPassword(env); return Boolean(pw) && given === pw }
async function requireAdmin(req, env) { return passwordMatches(req.headers.get("X-Admin-Key"), env) }
// One counter per visitor and purpose. IPv6 visitors are grouped by /64, which a single user controls.
async function tooMany(env, req, name, limit) {
  const ip = req.headers.get("CF-Connecting-IP") || "unknown"
  const key = ip.includes(":") ? ip.split(":").slice(0, 4).join(":") : ip
  const stub = env.ATTEMPTS.get(env.ATTEMPTS.idFromName(name + ":" + key))
  const res = await stub.fetch("https://counter/?limit=" + limit)
  return res.status === 429
}
function tooManyResponse(origin) { return json({ success: false, error: "Too many attempts. Wait a minute and try again." }, 429, origin) }
function requireInternal(req, env) { return req.headers.get("X-Internal-Key") === env.INTERNAL_KEY }

// Exact attempt counter. Cloudflare's rate-limit binding is approximate and let dozens of guesses through.
export class AttemptCounter {
  constructor(state) { this.storage = state.storage }
  async fetch(request) {
    const limit = Number(new URL(request.url).searchParams.get("limit"))
    const now = Date.now()
    const saved = await this.storage.get("window")
    const win = saved && now - saved.start < 60000 ? saved : { start: now, count: 0 }
    if (win.count >= limit) return new Response(null, { status: 429 })
    win.count++
    await this.storage.put("window", win)
    if (win.count === 1) await this.storage.setAlarm(now + 120000)
    return new Response(null, { status: 204 })
  }
  async alarm() { await this.storage.deleteAll() }
}

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

    if (path === "/project" && request.method === "POST") {
      if (!requireInternal(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const { reference, planName, customerEmail, customerName, amount, provider } = body
      if (!reference || !planName) return json({ success: false, error: "Missing fields" }, 400, origin)
      const project = { id: "prj_" + Date.now(), reference, planName, customerEmail: customerEmail || "", customerName: customerName || "", amount: amount || "", provider: provider || "", currentStage: 0, stages: getStages(planName), notes: "", assignedTeam: [], startDate: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "active" }
      await env.PROJECTS.put("project:" + reference, JSON.stringify(project))
      const pi = await env.PROJECTS.get("index:projects")
      const pia = pi ? JSON.parse(pi) : []
      pia.unshift(reference)
      await env.PROJECTS.put("index:projects", JSON.stringify(pia))
      return json({ success: true, project }, 200, origin)
    }

    if (path === "/project" && request.method === "GET") {
      const ref = url.searchParams.get("ref")
      if (!ref) return json({ success: false, error: "Missing ref" }, 400, origin)
      const raw = await env.PROJECTS.get("project:" + ref)
      if (!raw) return json({ success: false, error: "Project not found" }, 404, origin)
      const { notes, assignedTeam, ...pub } = JSON.parse(raw)
      return json({ success: true, project: pub }, 200, origin)
    }

    if (path === "/project" && request.method === "PUT") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      const { reference, ...updates } = body
      if (!reference) return json({ success: false, error: "Missing reference" }, 400, origin)
      const raw = await env.PROJECTS.get("project:" + reference)
      if (!raw) return json({ success: false, error: "Project not found" }, 404, origin)
      const updated = { ...JSON.parse(raw), ...updates, reference, updatedAt: new Date().toISOString() }
      await env.PROJECTS.put("project:" + reference, JSON.stringify(updated))
      return json({ success: true, project: updated }, 200, origin)
    }

    if (path === "/projects" && request.method === "GET") {
      if (!(await requireAdmin(request, env))) return json({ success: false, error: "Unauthorized" }, 401, origin)
      const pi = await env.PROJECTS.get("index:projects")
      const index = pi ? JSON.parse(pi) : []
      const projects = await Promise.all(index.map(async r => { const raw = await env.PROJECTS.get("project:" + r); return raw ? JSON.parse(raw) : null }))
      return json({ success: true, projects: projects.filter(Boolean) }, 200, origin)
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