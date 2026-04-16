'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Script from 'next/script'
import { MessageCircle, Mail, Instagram, Linkedin, Facebook, Clock, MapPin } from 'lucide-react'

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import { COMPANY_INFO } from '@/lib/constants'
import { submitToWebhook } from '@/lib/submitForm'

interface ContactFormData {
  fullName: string
  email: string
  whatsapp: string
  company?: string
  service: string
  budget: string
  message: string
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'book' | 'message'>('book')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    setError(false)
    try {
      await submitToWebhook({
        fullName: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        company: data.company ?? '',
        service: data.service,
        budget: data.budget,
        message: data.message,
        formSource: 'contact-page',
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Form submission error:', err)
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <SectionLabel>Get in touch</SectionLabel>
          <h1 className="font-syne font-extrabold text-4xl lg:text-5xl tracking-tighter text-gray-900">
            Book a free strategy call.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form / Calendly */}
          <div className="lg:col-span-2">
            {/* Tab toggle */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
              <button
                onClick={() => setActiveTab('book')}
                className={`px-5 py-2 rounded-lg text-sm font-sans font-medium transition-colors ${
                  activeTab === 'book'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Book a Call
              </button>
              <button
                onClick={() => setActiveTab('message')}
                className={`px-5 py-2 rounded-lg text-sm font-sans font-medium transition-colors ${
                  activeTab === 'message'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Send a Message
              </button>
            </div>

            {/* Calendly embed — always in DOM, hidden when not active */}
            <div className={activeTab === 'book' ? 'block' : 'hidden'}>
              <div
                className="calendly-inline-widget rounded-xl overflow-hidden border border-gray-100"
                data-url="https://calendly.com/prescriptdigitalsolutions/strategy-call"
                style={{ minWidth: '320px', height: '700px' }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="afterInteractive"
              />
            </div>

            {/* Message form */}
            {activeTab === 'message' && (submitted ? (
              <div className="border border-prescript-green bg-prescript-green-light rounded-2xl p-10 text-center">
                <p className="font-syne font-bold text-prescript-green-dark text-2xl mb-2">
                  Message received!
                </p>
                <p className="font-sans text-prescript-green-dark text-sm">
                  We&apos;ll respond within 24 hours via email or WhatsApp.
                </p>
              </div>
            ) : error ? (
              <div className="border border-red-200 bg-red-50 rounded-2xl p-10 text-center">
                <p className="font-syne font-bold text-red-700 text-xl mb-2">
                  Something went wrong.
                </p>
                <p className="font-sans text-red-600 text-sm mb-4">
                  Your message could not be sent. Please reach us directly on WhatsApp or email.
                </p>
                <button
                  onClick={() => setError(false)}
                  className="text-sm font-sans text-red-600 underline"
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                      Full name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent"
                      {...register('fullName', { required: 'Full name is required' })}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                      Business email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                      })}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                      WhatsApp number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent"
                      {...register('whatsapp', { required: 'WhatsApp number is required' })}
                    />
                    {errors.whatsapp && (
                      <p className="text-xs text-red-500 mt-1">{errors.whatsapp.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                      Company name
                    </label>
                    <input
                      type="text"
                      placeholder="Optional"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent"
                      {...register('company')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                      Which service? <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent bg-white"
                      defaultValue=""
                      {...register('service', { required: 'Please select a service' })}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="imprint">Imprint — Branding &amp; Creative</option>
                      <option value="forge">Forge — Digital &amp; Tech Platforms</option>
                      <option value="surge">Surge — Digital Marketing</option>
                      <option value="flow">Flow — Business Automation</option>
                      <option value="cortex">Cortex — Agentic AI Deployment</option>
                      <option value="subscription">Subscription Plan</option>
                      <option value="full">Full Package — All Five Services</option>
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-1">{errors.service.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-sans font-medium text-gray-600 mb-1 block">
                      Budget range <span className="text-red-400">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-700 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent bg-white"
                      defaultValue=""
                      {...register('budget', { required: 'Please select a budget range' })}
                    >
                      <option value="" disabled>Select a range</option>
                      <option value="under-500">Under $500</option>
                      <option value="500-1500">$500 – $1,500</option>
                      <option value="1500-5000">$1,500 – $5,000</option>
                      <option value="5000-plus">$5,000+</option>
                      <option value="discuss">Let&apos;s discuss</option>
                    </select>
                    {errors.budget && (
                      <p className="text-xs text-red-500 mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-sans font-medium text-gray-600 mb-1 block">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your business and what you're looking to achieve..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent resize-none"
                    {...register('message', {
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Send Message →'}
                </Button>
              </form>
            ))}
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-5">
            <div className="border border-prescript-green bg-prescript-green-light rounded-xl p-5">
              <p className="font-syne font-bold text-prescript-green-dark text-base mb-1">
                We respond within 24 hours
              </p>
              <p className="font-sans text-sm text-prescript-green-dark leading-relaxed">
                Every enquiry gets a personal response — not an automated reply.
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">Location</p>
                  <p className="text-sm font-sans text-gray-400">Lagos, Nigeria</p>
                  <p className="text-sm font-sans text-gray-400">WAT (UTC+1)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">Response time</p>
                  <p className="text-sm font-sans text-gray-400">Within 24 hours</p>
                  <p className="text-sm font-sans text-gray-400">Mon – Sat, 8am – 8pm WAT</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">WhatsApp</p>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans text-prescript-green hover:underline"
                  >
                    {COMPANY_INFO.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">Email</p>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-sans text-prescript-green hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">Instagram</p>
                  <a
                    href={COMPANY_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans text-prescript-green hover:underline"
                  >
                    @prescriptdigital
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-prescript-green flex-shrink-0 mt-0.5"><XIcon size={16} /></span>
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">X (Twitter)</p>
                  <a
                    href={COMPANY_INFO.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans text-prescript-green hover:underline"
                  >
                    @prescriptdigit1
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Facebook size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">Facebook</p>
                  <a
                    href={COMPANY_INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans text-prescript-green hover:underline"
                  >
                    /prescriptdigital
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Linkedin size={16} className="text-prescript-green flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-sans font-medium text-gray-700">LinkedIn</p>
                  <a
                    href={COMPANY_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-sans text-prescript-green hover:underline"
                  >
                    /company/prescriptdigital
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
