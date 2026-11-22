'use client'

import { useEffect, useRef, useState } from 'react'
import { X, CheckCircle, Copy, Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
  openPaystackPopup, openFlutterwavePopup, verifyPayment, generateRef,
  loadPayPalSdk, PAYPAL_CLIENT_ID,
} from '@/lib/payment'
import Button from './Button'
import { COMPANY_INFO } from '@/lib/constants'

// Transaction limits
const PAYSTACK_NGN_LIMIT = 1_000_000
const FLUTTERWAVE_USD_LIMIT = 5_000

const BANK = {
  name: 'GT Bank',
  account: '0254852285',
  accountName: 'Prescript Digital Solutions',
}

interface FormData {
  name: string
  email: string
}

interface PaymentModalProps {
  planName: string
  amountUSD: number
  amountNGN: number
  currency: 'usd' | 'ngn'
  onClose: () => void
}

type Stage = 'form' | 'processing' | 'success' | 'error' | 'bank-transfer' | 'paypal'

function PayPalCheckout({
  planName, amountUSD, onApproved, onCancel, onFailed,
}: {
  planName: string
  amountUSD: number
  onApproved: (orderID: string) => void
  onCancel: () => void
  onFailed: () => void
}) {
  const container = useRef<HTMLDivElement>(null)
  const handlers = useRef({ onApproved, onCancel, onFailed })
  handlers.current = { onApproved, onCancel, onFailed }

  useEffect(() => {
    let buttons: ReturnType<NonNullable<Window['paypal']>['Buttons']> | null = null
    let cancelled = false
    loadPayPalSdk()
      .then(() => {
        if (cancelled || !container.current || !window.paypal) return
        buttons = window.paypal.Buttons({
          style: { layout: 'vertical', shape: 'rect', label: 'pay', height: 45 },
          createOrder: (_data, actions) =>
            actions.order.create({
              purchase_units: [{
                amount: { currency_code: 'USD', value: amountUSD.toFixed(2) },
                description: `Prescript Digital: ${planName}`.slice(0, 127),
                custom_id: planName.slice(0, 127),
              }],
              application_context: { brand_name: 'Prescript Digital', shipping_preference: 'NO_SHIPPING' },
            }),
          onApprove: async ({ orderID }) => handlers.current.onApproved(orderID),
          onCancel: () => handlers.current.onCancel(),
          onError: () => handlers.current.onFailed(),
        })
        return buttons.render(container.current)
      })
      .catch(() => handlers.current.onFailed())
    return () => {
      cancelled = true
      buttons?.close().catch(() => {})
    }
  }, [planName, amountUSD])

  return <div ref={container} className="min-h-[50px]" />
}

export default function PaymentModal({
  planName, amountUSD, amountNGN, currency, onClose,
}: PaymentModalProps) {
  const exceedsLimit = currency === 'ngn'
    ? amountNGN > PAYSTACK_NGN_LIMIT
    : amountUSD > FLUTTERWAVE_USD_LIMIT

  const [stage, setStage] = useState<Stage>(exceedsLimit ? 'bank-transfer' : 'form')
  const [copied, setCopied] = useState(false)
  const payPalAvailable = currency === 'usd' && PAYPAL_CLIENT_ID !== ''
  const [method, setMethod] = useState<'card' | 'paypal'>('card')
  const usePayPal = payPalAvailable && method === 'paypal'

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const displayAmount = currency === 'ngn'
    ? `₦${amountNGN.toLocaleString()}`
    : `$${amountUSD.toLocaleString()}`
  const provider = currency === 'ngn' ? 'Paystack' : usePayPal ? 'PayPal' : 'Flutterwave'

  const onPayPalApproved = async (orderID: string) => {
    setStage('processing')
    const ok = await verifyPayment(orderID, 'paypal')
    setStage(ok ? 'success' : 'error')
  }
  const payRef = `PSC-${planName.toUpperCase().replace(/\s/g, '-')}-${generateRef().split('-')[1]}`

  const copyAccount = () => {
    navigator.clipboard.writeText(BANK.account)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const onSubmit = async (data: FormData) => {
    if (usePayPal) {
      setStage('paypal')
      return
    }
    setStage('processing')

    const handleSuccess = async (reference: string) => {
      const ok = await verifyPayment(reference, currency === 'ngn' ? 'paystack' : 'flutterwave')
      setStage(ok ? 'success' : 'error')
    }

    const handleClose = () => setStage('form')

    if (currency === 'ngn') {
      openPaystackPopup({
        email: data.email,
        name: data.name,
        planName,
        amountNGN,
        onSuccess: handleSuccess,
        onClose: handleClose,
      })
    } else {
      openFlutterwavePopup({
        email: data.email,
        name: data.name,
        planName,
        amountUSD,
        onSuccess: handleSuccess,
        onClose: handleClose,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={stage === 'processing' ? undefined : onClose}
      />

      {/* Card */}
      <div className="relative bg-pd-surface rounded-2xl w-full max-w-md  p-7">
        {stage !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-pd-subtle hover:text-pd-muted transition-colors"
          >
            <X size={18} />
          </button>
        )}

        {/* Success */}
        {stage === 'success' && (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-pd-brick-700 mx-auto mb-4" />
            <p className="font-display font-light text-xl text-pd-ink mb-2">Payment confirmed!</p>
            <p className="font-sans text-sm text-pd-muted mb-3 leading-relaxed">
              Welcome to <strong>{planName}</strong>. We&apos;ll reach out within 24 hours to get you onboarded.
            </p>
            <p className="font-sans text-xs text-pd-subtle mb-6">
              Track your project at{" "}
              <a href={"/track?ref=" + payRef} className="text-pd-brick-700 underline" target="_blank" rel="noopener noreferrer">prescriptdigital.com/track</a>
              {" "}using ref <span className="font-medium text-pd-muted">{payRef}</span>
            </p>
            <div className="flex flex-col gap-3">
              <a href={"/onboarding?ref=" + payRef + "&plan=" + encodeURIComponent(planName)} className="block">
                <Button variant="primary" size="md" className="w-full">Fill in your project brief</Button>
              </a>
              <Button variant="outline" size="md" onClick={onClose} className="w-full">Close</Button>
            </div>
          </div>
        )}

        {/* Error */}
        {stage === 'error' && (
          <div className="text-center py-4">
            <p className="font-display font-light text-xl text-pd-ink mb-2">Verification failed</p>
            <p className="font-sans text-sm text-pd-muted mb-2 leading-relaxed">
              Your payment may have gone through but we couldn&apos;t verify it automatically.
            </p>
            <p className="font-sans text-sm text-pd-muted mb-6">
              Email us at{' '}
              <a href="mailto:billing@prescriptdigital.com" className="text-pd-brick-700 underline">
                billing@prescriptdigital.com
              </a>{' '}
              with your payment reference and we&apos;ll sort it out.
            </p>
            <Button variant="outline" size="md" onClick={onClose} className="w-full">Close</Button>
          </div>
        )}

        {/* Bank Transfer */}
        {stage === 'bank-transfer' && (
          <div>
            <p className="font-display font-light text-xl text-pd-ink mb-1">{planName}</p>
            <p className="font-sans text-sm text-pd-subtle mb-5">
              {displayAmount} · Bank Transfer
            </p>

            <div className="bg-pd-paper border border-pd-line rounded-xl p-4 mb-5 flex flex-col gap-3">
              <div>
                <p className="text-xs font-sans text-pd-subtle mb-0.5">Bank</p>
                <p className="text-sm font-sans font-medium text-pd-ink">{BANK.name}</p>
              </div>
              <div>
                <p className="text-xs font-sans text-pd-subtle mb-0.5">Account name</p>
                <p className="text-sm font-sans font-medium text-pd-ink">{BANK.accountName}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-sans text-pd-subtle mb-0.5">Account number</p>
                  <p className="text-lg font-display font-normal text-pd-brick-700 tracking-wider">{BANK.account}</p>
                </div>
                <button
                  onClick={copyAccount}
                  className="flex items-center gap-1.5 text-xs font-sans text-pd-brick-700 border border-pd-brick-700/30 rounded-lg px-3 py-1.5 hover:bg-pd-surface-2 transition-colors"
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="border-t border-pd-line pt-3">
                <p className="text-xs font-sans text-pd-subtle mb-0.5">Use this as payment reference</p>
                <p className="text-xs font-sans font-medium text-pd-muted bg-pd-surface border border-pd-line rounded-lg px-3 py-2 tracking-wide">
                  {payRef}
                </p>
              </div>
            </div>

            <p className="font-sans text-xs text-pd-muted mb-5 leading-relaxed">
              After payment, send your receipt and the reference above to{' '}
              <a href="mailto:billing@prescriptdigital.com" className="text-pd-brick-700 underline">
                billing@prescriptdigital.com
              </a>{' '}
              and we&apos;ll activate your plan within 24 hours.
            </p>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}?text=Hi, I just made a bank transfer for ${planName} (${displayAmount}). Reference: ${payRef}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="primary" size="md" className="w-full">
                  Confirm on WhatsApp
                </Button>
              </a>
              <Button variant="outline" size="md" onClick={onClose} className="flex-shrink-0">
                Close
              </Button>
            </div>
          </div>
        )}

        {/* PayPal */}
        {stage === 'paypal' && (
          <div>
            <p className="font-display font-light text-xl text-pd-ink mb-1">{planName}</p>
            <p className="font-sans text-2xl font-bold text-pd-brick-700 mb-5">{displayAmount}</p>
            <PayPalCheckout
              planName={planName}
              amountUSD={amountUSD}
              onApproved={onPayPalApproved}
              onCancel={() => setStage('form')}
              onFailed={() => setStage('error')}
            />
            <button
              type="button"
              onClick={() => setStage('form')}
              className="w-full text-center text-xs font-sans text-pd-subtle hover:text-pd-muted mt-3"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Form */}
        {(stage === 'form' || stage === 'processing') && (
          <>
            <div className="mb-6">
              <p className="font-display font-light text-xl text-pd-ink mb-1">{planName}</p>
              <div className="flex items-center gap-2">
                <span className="font-sans text-2xl font-bold text-pd-brick-700">{displayAmount}</span>
                <span className="text-xs font-sans text-pd-subtle bg-pd-surface-2 px-2 py-1">
                  via {provider}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {payPalAvailable && (
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Payment method">
                  {(['card', 'paypal'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={method === m}
                      onClick={() => setMethod(m)}
                      className={`py-2.5 rounded-lg border text-sm font-sans font-medium transition-colors ${
                        method === m
                          ? 'border-pd-brick-700 bg-pd-surface-2 text-pd-oxblood'
                          : 'border-pd-line text-pd-muted hover:border-pd-line'
                      }`}
                    >
                      {m === 'card' ? 'Card' : 'PayPal'}
                    </button>
                  ))}
                </div>
              )}

              <div>
                <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">
                  Full name <span className="text-pd-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-xs text-pd-error mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">
                  Email <span className="text-pd-error">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && <p className="text-xs text-pd-error mt-1">{errors.email.message}</p>}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-1"
                disabled={stage === 'processing'}
              >
                {stage === 'processing'
                  ? 'Opening checkout…'
                  : usePayPal ? 'Continue to PayPal →' : `Pay ${displayAmount} →`}
              </Button>

              <p className="text-xs font-sans text-pd-subtle text-center">
                Secured by {provider}. Your card details are never stored by us.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
