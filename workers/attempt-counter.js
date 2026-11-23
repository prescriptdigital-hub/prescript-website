// Exact per-minute counter (Durable Object). Cloudflare's rate-limit binding is approximate and let dozens of requests through.
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

// IPv6 visitors are grouped by /64, which a single user controls.
export function visitorKey(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown"
  return ip.includes(":") ? ip.split(":").slice(0, 4).join(":") : ip
}

export async function overLimit(namespace, name, limit) {
  const stub = namespace.get(namespace.idFromName(name))
  return (await stub.fetch("https://counter/?limit=" + limit)).status === 429
}
