/**
 * Cloudflare Worker — Payment Verification
 * Verifies Paystack (NGN) and Flutterwave (USD) transactions.
 *
 * Environment variables to set in Cloudflare Workers dashboard:
 *   PAYSTACK_SECRET_KEY   — from Paystack → Settings → API Keys
 *   FLUTTERWAVE_SECRET_KEY — from Flutterwave → Settings → API Keys
 *   RESEND_API_KEY        — from resend.com (free, for billing notifications)
 */

const ALLOWED_ORIGINS = ['https://prescriptdigital.com', 'https://www.prescriptdigital.com', 'http://localhost:3000']
// Keep in sync with src/lib/pricing.ts: 1 month, 3 months less 5%, 12 months less 15%, whole dollars. Enterprise plans have no checkout.
const MONTHLY_USD = { Seed: 49, Bloom: 149, Authority: 349, Launch: 199, Build: 499, Scale: 999 }
const NGN_PER_USD = 1400

function isExpectedAmount(planName, amount, currency) {
  const rate = { USD: 1, NGN: NGN_PER_USD }[currency]
  if (!rate) return false
  // Flutterwave transactions may lack a plan name; then any exact plan price is accepted.
  const prices = planName ? [MONTHLY_USD[planName]] : Object.values(MONTHLY_USD)
  return prices.some(p => p && [p, Math.round(p * 3 * 95 / 100), Math.round(p * 12 * 85 / 100)].map(v => v * rate).some(v => Math.abs(v - Number(amount)) < 0.01))
}

const BILLING_EMAIL = 'billing@prescriptdigital.com'

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

function json(data, status = 200, origin = '') {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  })
}

// Creates the tracker project (or finds it, if this payment was verified before) and notifies billing once.
// The payment is already confirmed here, so problems are logged and never fail the customer.
async function recordPayment(env, payment) {
  let tracked = null
  try {
    const res = await env.TRACKER.fetch('https://tracker/project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Internal-Key': env.INTERNAL_KEY },
      body: JSON.stringify(payment),
    })
    const data = await res.json()
    if (!data.success) throw new Error(`${res.status} ${data.error}`)
    tracked = data
  } catch (e) {
    console.error('Tracker record failed', payment.provider, payment.reference, e?.message)
  }
  if (tracked?.created !== false) {
    try {
      await sendBillingEmail(env, { ...payment, trackingReference: tracked?.reference ?? 'Not created: add it in /admin' })
    } catch (e) {
      console.error('Billing email failed', payment.provider, payment.reference, e?.message)
    }
  }
  return tracked?.reference ?? null
}

const escapeHtml = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))

async function sendBillingEmail(env, { customerEmail, customerName, planName, reference, provider, amount, trackingReference }) {
  if (!env.RESEND_API_KEY) return

  const rows = { Plan: planName, Customer: customerName, Email: customerEmail, Amount: amount, Provider: provider, 'Payment reference': reference, 'Tracking reference': trackingReference }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: BILLING_EMAIL,
      to: [BILLING_EMAIL],
      subject: `New payment: ${planName}`,
      html: `<h2>New payment received</h2><table>${Object.entries(rows).map(([k, val]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(val)}</td></tr>`).join('')}</table>`,
    }),
  })
  if (!res.ok) throw new Error(`Resend ${res.status}`)
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders(origin) })
    }

    if (request.method !== 'POST') {
      return json({ success: false, error: 'Method not allowed' }, 405, origin)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ success: false, error: 'Invalid JSON' }, 400, origin)
    }

    const { reference, provider } = body

    if (!reference || !provider) {
      return json({ success: false, error: 'Missing reference or provider' }, 400, origin)
    }

    const mismatch = (details) => {
      console.error('Payment amount mismatch', JSON.stringify({ provider, reference, ...details }))
      return json({ success: false, error: 'Amount does not match plan' }, 400, origin)
    }

    // ── Paystack verification ──
    if (provider === 'paystack') {
      const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` },
      })
      const data = await res.json()

      if (data.data?.status === 'success') {
        const customerEmail = data.data.customer?.email ?? ''
        const planName = data.data.metadata?.custom_fields?.find(f => f.variable_name === 'plan')?.value ?? 'Unknown plan'
        if (!isExpectedAmount(planName, data.data.amount / 100, data.data.currency)) {
          return mismatch({ planName, amount: data.data.amount / 100, currency: data.data.currency })
        }
        const amount = `₦${(data.data.amount / 100).toLocaleString()}`

        const customerName = data.data.metadata?.custom_fields?.find(f => f.variable_name === 'name')?.value ?? ''
        const trackingRef = await recordPayment(env, { customerEmail, customerName, planName, reference, provider: 'Paystack', amount })
        return json({ success: true, trackingRef }, 200, origin)
      }

      return json({ success: false, error: 'Payment not successful' }, 400, origin)
    }

    // ── Flutterwave verification ──
    if (provider === 'flutterwave') {
      const res = await fetch(`https://api.flutterwave.com/v3/transactions/${encodeURIComponent(reference)}/verify`, {
        headers: { Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}` },
      })
      const data = await res.json()

      if (data.data?.status === 'successful') {
        const customerEmail = data.data.customer?.email ?? ''
        const planName = data.data.meta?.planName ?? 'Unknown plan'
        if (!isExpectedAmount(data.data.meta?.planName, data.data.amount, data.data.currency)) {
          return mismatch({ planName, amount: data.data.amount, currency: data.data.currency })
        }
        const amount = `$${data.data.amount}`

        const customerName = data.data.customer?.name ?? ''
        const trackingRef = await recordPayment(env, { customerEmail, customerName, planName, reference, provider: 'Flutterwave', amount })
        return json({ success: true, trackingRef }, 200, origin)
      }

      return json({ success: false, error: 'Payment not successful' }, 400, origin)
    }

    // ── PayPal: capture server-side so the browser can't fake an approval ──
    if (provider === 'paypal') {
      if (!/^[A-Z0-9]{10,40}$/.test(reference)) {
        return json({ success: false, error: 'Invalid order id' }, 400, origin)
      }
      const base = env.PAYPAL_ENV === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com'
      const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_SECRET}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      })
      const { access_token } = await tokenRes.json()
      if (!access_token) return json({ success: false, error: 'PayPal auth failed' }, 502, origin)

      const orderRes = await fetch(`${base}/v2/checkout/orders/${reference}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      const order = await orderRes.json()
      const units = order.purchase_units ?? []
      const ordered = units[0]
      if (units.length !== 1 || !ordered.custom_id || !isExpectedAmount(ordered.custom_id, ordered.amount?.value, ordered.amount?.currency_code)) {
        return mismatch({ planName: ordered?.custom_id, amount: ordered?.amount })
      }

      // A retry after a lost response finds the order already captured.
      let data = order
      if (order.status !== 'COMPLETED') {
        const captureRes = await fetch(`${base}/v2/checkout/orders/${reference}/capture`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${access_token}`, 'Content-Type': 'application/json' },
        })
        data = await captureRes.json()
      }
      const unit = data.purchase_units?.[0]
      const capture = unit?.payments?.captures?.[0]

      if (data.status === 'COMPLETED' && capture?.status === 'COMPLETED' && capture.amount?.currency_code === 'USD') {
        const customerEmail = data.payer?.email_address ?? ''
        const customerName = [data.payer?.name?.given_name, data.payer?.name?.surname].filter(Boolean).join(' ')
        const planName = capture.custom_id ?? unit.custom_id ?? 'Unknown plan'
        const amount = `$${capture.amount.value}`
        const trackingRef = await recordPayment(env, { customerEmail, customerName, planName, reference: capture.id, provider: 'PayPal', amount })
        return json({ success: true, trackingRef }, 200, origin)
      }

      return json({ success: false, error: 'Payment not successful' }, 400, origin)
    }

    return json({ success: false, error: 'Unknown provider' }, 400, origin)
  },
}
