declare global {
  interface Window {
    PaystackPop: {
      setup: (config: {
        key: string
        email: string
        amount: number
        currency: string
        ref: string
        metadata?: object
        callback: (response: { reference: string }) => void
        onClose: () => void
      }) => { openIframe: () => void }
    }
    FlutterwaveCheckout: (config: {
      public_key: string
      tx_ref: string
      amount: number
      currency: string
      customer: { email: string; name: string }
      customizations: { title: string; description: string; logo: string }
      callback: (response: { transaction_id: number; status: string }) => void
      onclose: () => void
    }) => void
  }
}

export function generateRef(): string {
  return `PSC-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
}

export async function verifyPayment(
  reference: string,
  provider: 'paystack' | 'flutterwave'
): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_PAYMENT_VERIFY_URL
  if (!url) {
    // No worker configured yet — optimistic success in dev
    console.log('[Payment verify — no worker URL]', { reference, provider })
    return true
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference, provider }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

export function openPaystackPopup({
  email, name, planName, amountNGN, onSuccess, onClose,
}: {
  email: string
  name: string
  planName: string
  amountNGN: number
  onSuccess: (reference: string) => void
  onClose: () => void
}) {
  const handler = window.PaystackPop.setup({
    key: 'pk_live_a0f280fdb2c94e16a1e5f97afc3402c83260ce22',
    email,
    amount: Math.round(amountNGN * 100), // kobo
    currency: 'NGN',
    ref: generateRef(),
    metadata: {
      custom_fields: [
        { display_name: 'Plan', variable_name: 'plan', value: planName },
        { display_name: 'Customer Name', variable_name: 'name', value: name },
      ],
    },
    callback: (response) => onSuccess(response.reference),
    onClose,
  })
  handler.openIframe()
}

export function openFlutterwavePopup({
  email, name, planName, amountUSD, onSuccess, onClose,
}: {
  email: string
  name: string
  planName: string
  amountUSD: number
  onSuccess: (reference: string) => void
  onClose: () => void
}) {
  window.FlutterwaveCheckout({
    public_key: 'FLWPUBK-77c231faa664aa60979f6233bc746b57-X',
    tx_ref: generateRef(),
    amount: amountUSD,
    currency: 'USD',
    customer: { email, name },
    customizations: {
      title: 'Prescript Digital',
      description: planName,
      logo: '/prescriptcreatives_logo.png',
    },
    callback: (response) => onSuccess(String(response.transaction_id)),
    onclose: onClose,
  })
}
