/**
 * Submits form data to Formspree.
 * Formspree emails the submission to the address linked to your form.
 *
 * Endpoint: https://formspree.io/f/maqaqvqg
 */
export async function submitToWebhook(data: Record<string, string>): Promise<void> {
  const response = await fetch('https://formspree.io/f/maqaqvqg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.error ?? 'Form submission failed')
  }
}
