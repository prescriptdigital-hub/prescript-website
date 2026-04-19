/**
 * Cloudflare Worker - Project Tracker
 * KV namespace: PROJECTS | Secrets: ADMIN_PASSWORD, INTERNAL_KEY
 */

const ALLOWED_ORIGINS = ["https://prescriptdigital.com", "http://localhost:3000"]
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
function requireAdmin(req, env) { return req.headers.get("X-Admin-Key") === env.ADMIN_PASSWORD }
function requireInternal(req, env) { return req.headers.get("X-Internal-Key") === env.INTERNAL_KEY }

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || ""
    const url = new URL(request.url)
    const path = url.pathname

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(origin) })

    if (path === "/seed" && request.method === "POST") {
      const existing = await env.PROJECTS.get("team:oluwaseun.olatunde@prescriptdigital.com")
      if (existing) return json({ success: true, message: "Already seeded" }, 200, origin)
      const member = { id: "tm_" + Date.now(), name: "Oluwaseun Olatunde", role: "Project Manager", whatsapp: "07030057040", email: "oluwaseun.olatunde@prescriptdigital.com", createdAt: new Date().toISOString() }
      await env.PROJECTS.put("team:" + member.email, JSON.stringify(member))
      const ti = await env.PROJECTS.get("index:team")
      const tia = ti ? JSON.parse(ti) : []
      tia.push(member.email)
      await env.PROJECTS.put("index:team", JSON.stringify(tia))
      return json({ success: true, member }, 200, origin)
    }

    if (path === "/auth" && request.method === "POST") {
      let body
      try { body = await request.json() } catch { return json({ success: false }, 400, origin) }
      if (body.password === env.ADMIN_PASSWORD) return json({ success: true }, 200, origin)
      return json({ success: false, error: "Invalid password" }, 401, origin)
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
      if (!requireAdmin(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
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
      if (!requireAdmin(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
      const pi = await env.PROJECTS.get("index:projects")
      const index = pi ? JSON.parse(pi) : []
      const projects = await Promise.all(index.map(async r => { const raw = await env.PROJECTS.get("project:" + r); return raw ? JSON.parse(raw) : null }))
      return json({ success: true, projects: projects.filter(Boolean) }, 200, origin)
    }

    if (path === "/team" && request.method === "GET") {
      if (!requireAdmin(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
      const ti = await env.PROJECTS.get("index:team")
      const index = ti ? JSON.parse(ti) : []
      const members = await Promise.all(index.map(async e => { const raw = await env.PROJECTS.get("team:" + e); return raw ? JSON.parse(raw) : null }))
      return json({ success: true, members: members.filter(Boolean) }, 200, origin)
    }

    if (path === "/team" && request.method === "POST") {
      if (!requireAdmin(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
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
      if (!requireAdmin(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
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
      if (!requireAdmin(request, env)) return json({ success: false, error: "Unauthorized" }, 401, origin)
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