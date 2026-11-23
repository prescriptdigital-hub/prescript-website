'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@/components/ui/Button'
import { submitToWebhook } from '@/lib/submitForm'

interface FormData {
  fullName: string
  email: string
  whatsapp: string
  service: string
}

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [failed, setFailed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setFailed(false)
    try {
      await submitToWebhook({
        fullName: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        service: data.service,
        formSource: 'homepage-cta',
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Form submission error:', err)
      setFailed(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-pd-paper py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display font-light text-3xl lg:text-4xl tracking-tighter text-pd-ink mb-3 text-center">
          Your business deserves a digital team that actually delivers
        </h2>
        <p className="font-sans text-pd-muted text-base text-center mb-8 leading-relaxed">
          Tell us where you are, we&apos;ll show you how{' '}
          <span className="text-pd-brick-700 font-medium">Imprint</span>,{' '}
          Forge, Surge, Flow, and Cortex fit together for your business.
        </p>

        {submitted ? (
          <div className="border border-pd-brick-700 bg-pd-surface-2 rounded-xl p-8 text-center">
            <p className="font-display font-normal text-pd-oxblood text-lg mb-1">
              We&apos;ve received your message!
            </p>
            <p className="font-sans text-sm text-pd-oxblood">
              We respond within 24 hours. Check your WhatsApp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Full name"
                className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent"
                {...register('fullName', { required: true })}
              />
              {errors.fullName && (
                <p className="text-xs text-pd-error mt-1">Full name is required</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Business email"
                className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="text-xs text-pd-error mt-1">Email is required</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="WhatsApp number"
                className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent"
                {...register('whatsapp', { required: true })}
              />
              {errors.whatsapp && (
                <p className="text-xs text-pd-error mt-1">WhatsApp number is required</p>
              )}
            </div>

            <div>
              <select
                className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-muted focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent bg-pd-surface"
                {...register('service', { required: true })}
                defaultValue=""
              >
                <option value="" disabled>
                  Which service do you need most?
                </option>
                <option value="imprint">Imprint, Branding &amp; Creative</option>
                <option value="forge">Forge, Digital &amp; Tech Platforms</option>
                <option value="surge">Surge, Digital Marketing</option>
                <option value="flow">Flow, Business Automation</option>
                <option value="cortex">Cortex, Agentic AI Deployment</option>
                <option value="full">Full Package, All Five Services</option>
              </select>
              {errors.service && (
                <p className="text-xs text-pd-error mt-1">Please select a service</p>
              )}
            </div>

            {failed && (
              <p role="alert" className="border border-pd-error bg-pd-error-bg text-pd-error text-sm p-4">
                Your message was not sent. Please try again, or email{' '}
                <a href="mailto:hello@prescriptdigital.com" className="underline">hello@prescriptdigital.com</a>.
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={submitting}>
              {submitting ? 'Sending…' : 'Book My Free Strategy Call →'}
            </Button>

            <p className="text-sm font-sans text-pd-subtle text-center">
              No commitment. We respond within 24 hours.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
