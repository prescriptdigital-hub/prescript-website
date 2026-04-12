/**
 * Submits form data to the configured CRM webhook (GoHighLevel or Zoho).
 *
 * GoHighLevel setup:
 *   Settings → Integrations → Webhooks → Add Webhook (POST)
 *   Paste the webhook URL into NEXT_PUBLIC_FORM_WEBHOOK_URL in .env.local
 *
 * Zoho setup:
 *   Zoho Flow → New Flow → Webhook trigger
 *   OR Zoho CRM → Webforms → embed the form URL directly
 *   Paste the Zoho Flow webhook URL into NEXT_PUBLIC_FORM_WEBHOOK_URL
 */
export async function submitToWebhook(data: Record<string, string>): Promise<void> {
  const url = process.env.NEXT_PUBLIC_FORM_WEBHOOK_URL

  if (!url) {
    // No webhook configured — log locally (dev/staging mode)
    console.log('[Form submission — no webhook configured]', data)
    return
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      source: 'prescriptdigital.com',
      submittedAt: new Date().toISOString(),
    }),
  })

  if (!response.ok) {
    throw new Error(`Webhook responded with ${response.status}`)
  }
}
