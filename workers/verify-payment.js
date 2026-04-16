/**
 * Cloudflare Worker — Payment Verification
 * Verifies Paystack (NGN) and Flutterwave (USD) transactions.
 *
 * Environment variables to set in Cloudflare Workers dashboard:
 *   PAYSTACK_SECRET_KEY   — from Paystack → Settings → API Keys
 *   FLUTTERWAVE_SECRET_KEY — from Flutterwave → Settings → API Keys
 *   RESEND_API_KEY        — from resend.com (free, for billing notifications)
 */

const ALLOWED_ORIGINS = ['https://prescriptdigital.com', 'http://localhost:3000']
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

async function sendBillingEmail(env, { customerEmail, planName, reference, provider, amount }) {
  if (!env.RESEND_API_KEY) return

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: BILLING_EMAIL,
      to: [BILLING_EMAIL],
      subject: `New payment — ${planName}`,
      html: `
        <h2>New payment received</h2>
        <table>
          <tr><td><strong>Plan</strong></td><td>${planName}</td></tr>
          <tr><td><strong>Customer</strong></td><td>${customerEmail}</td></tr>
          <tr><td><strong>Amount</strong></td><td>${amount}</td></tr>
          <tr><td><strong>Provider</strong></td><td>${provider}</td></tr>
          <tr><td><strong>Reference</strong></td><td>${reference}</td></tr>
        </table>
      `,
    }),
  })
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

    // ── Paystack verification ──
    if (provider === 'paystack') {
      const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` },
      })
      const data = await res.json()

      if (data.data?.status === 'success') {
        const customerEmail = data.data.customer?.email ?? ''
        const planName = data.data.metadata?.custom_fields?.find(f => f.variable_name === 'plan')?.value ?? 'Unknown plan'
        const amount = `₦${(data.data.amount / 100).toLocaleString()}`

        await sendBillingEmail(env, { customerEmail, planName, reference, provider: 'Paystack', amount })
        return json({ success: true }, 200, origin)
      }

      return json({ success: false, error: 'Payment not successful' }, 400, origin)
    }

    // ── Flutterwave verification ──
    if (provider === 'flutterwave') {
      const res = await fetch(`https://api.flutterwave.com/v3/transactions/${reference}/verify`, {
        headers: { Authorization: `Bearer ${env.FLUTTERWAVE_SECRET_KEY}` },
      })
      const data = await res.json()

      if (data.data?.status === 'successful') {
        const customerEmail = data.data.customer?.email ?? ''
        const planName = data.data.meta?.planName ?? 'Unknown plan'
        const amount = `$${data.data.amount}`

        await sendBillingEmail(env, { customerEmail, planName, reference, provider: 'Flutterwave', amount })
        return json({ success: true }, 200, origin)
      }

      return json({ success: false, error: 'Payment not successful' }, 400, origin)
    }

    return json({ success: false, error: 'Unknown provider' }, 400, origin)
  },
}
