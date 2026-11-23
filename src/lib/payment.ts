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
      meta: { planName: string }
      customizations: { title: string; description: string; logo: string }
      callback: (response: { transaction_id: number; status: string }) => void
      onclose: () => void
    }) => void
    paypal?: {
      Buttons: (config: {
        style?: Record<string, string | number>
        createOrder: (data: unknown, actions: { order: { create: (order: object) => Promise<string> } }) => Promise<string>
        onApprove: (data: { orderID: string }) => Promise<void>
        onCancel?: () => void
        onError?: (err: unknown) => void
      }) => { render: (el: HTMLElement) => Promise<void>; close: () => Promise<void> }
    }
  }
}

export const PAYPAL_CLIENT_ID =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ||
  'BAAZJju5Uflqwat2C3tXCwEW_0cMxL8ksYBHPB_LkK5EFBgrX4q6_7rbNowzXTqBSegfJufT1CEJW5GS1Q'

let paypalSdk: Promise<void> | null = null

export function loadPayPalSdk(): Promise<void> {
  if (paypalSdk) return paypalSdk
  paypalSdk = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL_CLIENT_ID)}&currency=USD&intent=capture&components=buttons`
    script.onload = () => resolve()
    script.onerror = () => {
      paypalSdk = null
      reject(new Error('PayPal failed to load'))
    }
    document.body.appendChild(script)
  })
  return paypalSdk
}

export function generateRef(): string {
  return `PSC-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
}

export async function verifyPayment(
  reference: string,
  provider: 'paystack' | 'flutterwave' | 'paypal'
): Promise<boolean> {
  const url = process.env.NEXT_PUBLIC_PAYMENT_VERIFY_URL
  if (!url) {
    // No worker configured yet, optimistic success in dev
    console.log('[Payment verify, no worker URL]', { reference, provider })
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
    meta: { planName },
    customizations: {
      title: 'Prescript Digital',
      description: planName,
      logo: 'https://prescriptdigital.com/android-chrome-512x512.png',
    },
    callback: (response) => onSuccess(String(response.transaction_id)),
    onclose: onClose,
  })
}
