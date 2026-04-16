'use client'

import { useState } from 'react'
import { X, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { openPaystackPopup, openFlutterwavePopup, verifyPayment } from '@/lib/payment'
import Button from './Button'

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

type Stage = 'form' | 'processing' | 'success' | 'error'

export default function PaymentModal({
  planName, amountUSD, amountNGN, currency, onClose,
}: PaymentModalProps) {
  const [stage, setStage] = useState<Stage>('form')

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const displayAmount = currency === 'ngn'
    ? `₦${amountNGN.toLocaleString()}`
    : `$${amountUSD.toLocaleString()}`
  const provider = currency === 'ngn' ? 'Paystack' : 'Flutterwave'

  const onSubmit = async (data: FormData) => {
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={stage === 'processing' ? undefined : onClose} />

      {/* Card */}
      <div className="relative bg-white rounded-2xl w-full max-w-md shadow-2xl p-7">
        {stage !== 'processing' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        )}

        {/* Success */}
        {stage === 'success' && (
          <div className="text-center py-4">
            <CheckCircle size={48} className="text-prescript-green mx-auto mb-4" />
            <p className="font-syne font-extrabold text-xl text-gray-900 mb-2">Payment confirmed!</p>
            <p className="font-sans text-sm text-gray-500 mb-6 leading-relaxed">
              Welcome to <strong>{planName}</strong>. We&apos;ll reach out within 24 hours to get you onboarded.
            </p>
            <Button variant="primary" size="md" onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        )}

        {/* Error */}
        {stage === 'error' && (
          <div className="text-center py-4">
            <p className="font-syne font-extrabold text-xl text-gray-900 mb-2">Verification failed</p>
            <p className="font-sans text-sm text-gray-500 mb-2 leading-relaxed">
              Your payment may have gone through but we couldn&apos;t verify it automatically.
            </p>
            <p className="font-sans text-sm text-gray-500 mb-6">
              Email us at{' '}
              <a href="mailto:billing@prescriptdigital.com" className="text-prescript-green underline">
                billing@prescriptdigital.com
              </a>{' '}
              with your payment reference and we&apos;ll sort it out.
            </p>
            <Button variant="outline" size="md" onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}

        {/* Form */}
        {(stage === 'form' || stage === 'processing') && (
          <>
            <div className="mb-6">
              <p className="font-syne font-extrabold text-xl text-gray-900 mb-1">{planName}</p>
              <div className="flex items-center gap-2">
                <span className="font-sans text-2xl font-bold text-prescript-green">{displayAmount}</span>
                <span className="text-xs font-sans text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                  via {provider}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                  Full name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-1"
                disabled={stage === 'processing'}
              >
                {stage === 'processing' ? 'Opening checkout…' : `Pay ${displayAmount} →`}
              </Button>

              <p className="text-xs font-sans text-gray-400 text-center">
                Secured by {provider}. Your card details are never stored by us.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
