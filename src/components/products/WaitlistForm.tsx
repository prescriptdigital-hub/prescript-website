'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { submitToWebhook } from '@/lib/submitForm'

interface WaitlistData {
  name: string
  email: string
  country: string
  product: string
  type: string
}

export default function WaitlistForm({ defaultProduct = 'Both' }: { defaultProduct?: 'PRESCRIPT IQ' | 'PRESYNQ' | 'Both' }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors } } = useForm<WaitlistData>({
    defaultValues: { product: defaultProduct, type: 'Business or team' },
  })

  const onSubmit = async (data: WaitlistData) => {
    setStatus('sending')
    try {
      await submitToWebhook({
        _subject: `Early access request: ${data.product}`,
        formType: 'Product early access',
        ...data,
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl border border-white/15 bg-pd-surface/[0.04] p-8 text-center" role="status">
        <p className="font-display font-light text-2xl text-white mb-2">You&apos;re on the list.</p>
        <p className="font-sans text-white/65 text-sm">We&apos;ll email you as early-access places open.</p>
      </div>
    )
  }

  const field =
    'w-full rounded-xl border border-white/15 bg-pd-surface/[0.06] px-4 py-3 text-sm font-sans text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pd-cream focus:border-transparent'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid sm:grid-cols-2 gap-3" noValidate>
      <div>
        <label htmlFor="wl-name" className="sr-only">Full name</label>
        <input id="wl-name" placeholder="Full name" autoComplete="name" className={field} {...register('name', { required: true })} aria-invalid={!!errors.name} />
      </div>
      <div>
        <label htmlFor="wl-email" className="sr-only">Email</label>
        <input id="wl-email" type="email" placeholder="Work or personal email" autoComplete="email" className={field}
          {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })} aria-invalid={!!errors.email} />
      </div>
      <div>
        <label htmlFor="wl-country" className="sr-only">Country</label>
        <input id="wl-country" placeholder="Country" autoComplete="country-name" className={field} {...register('country', { required: true })} aria-invalid={!!errors.country} />
      </div>
      <div>
        <label htmlFor="wl-type" className="sr-only">I am</label>
        <select id="wl-type" className={field} {...register('type')}>
          <option className="text-black">Business or team</option>
          <option className="text-black">Individual or freelancer</option>
          <option className="text-black">Agency or consultant</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="wl-product" className="sr-only">Interested in</label>
        <select id="wl-product" className={field} {...register('product')}>
          <option className="text-black" value="Both">Both products</option>
          <option className="text-black" value="PRESCRIPT IQ">PRESCRIPT IQ</option>
          <option className="text-black" value="PRESYNQ">PRESYNQ</option>
        </select>
      </div>
      {(errors.name || errors.email || errors.country) && (
        <p className="sm:col-span-2 text-xs text-[#FF9C9C] font-sans" role="alert">Please add your name, a valid email and your country.</p>
      )}
      {status === 'error' && (
        <p className="sm:col-span-2 text-xs text-[#FF9C9C] font-sans" role="alert">Something went wrong. Please try again, or email hello@prescriptdigital.com.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="sm:col-span-2 py-3.5 font-sans font-semibold bg-pd-brick text-white hover:bg-pd-brick-700 transition-colors disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {status === 'sending' ? 'Joining…' : 'Request early access'}
      </button>
      <p className="sm:col-span-2 text-[11px] text-white/45 font-sans text-center">
        We&apos;ll only use your details to contact you about early access.
      </p>
    </form>
  )
}
