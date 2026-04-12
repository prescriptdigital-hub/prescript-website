/**
 * Submits form data to Web3Forms.
 * Web3Forms sends an email notification to the address linked to your access key.
 *
 * Setup:
 *   1. Sign up at web3forms.com (free)
 *   2. Copy your Access Key
 *   3. Add NEXT_PUBLIC_WEB3FORMS_KEY to Cloudflare Pages environment variables
 */
export async function submitToWebhook(data: Record<string, string>): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

  if (!accessKey) {
    console.log('[Form submission — no Web3Forms key configured]', data)
    return
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New enquiry from ${data.fullName} — Prescript Digital`,
      from_name: 'Prescript Digital Website',
      ...data,
    }),
  })

  const result = await response.json()

  if (!result.success) {
    throw new Error(result.message ?? 'Form submission failed')
  }
}
