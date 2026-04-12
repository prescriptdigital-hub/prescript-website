'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import CurrencyToggle from '@/components/ui/CurrencyToggle'
import FAQItem from '@/components/ui/FAQItem'
import PricingCard from '@/components/pricing/PricingCard'
import { ONE_TIME_PACKAGES, ADDONS, CURRENCY_RATES } from '@/lib/pricing'

const FAQS = [
  {
    q: 'Do you require a contract?',
    a: 'For retainer and subscription services, we require a 3-month minimum commitment. One-time projects are contract-free. Everything is transparent upfront.',
  },
  {
    q: 'Can Nigerian businesses pay in Naira?',
    a: 'Yes. We accept NGN payments via bank transfer and Paystack. Our NGN rate is ₦1,600 per $1. All prices can be toggled to NGN on this page.',
  },
  {
    q: 'How quickly does Surge generate results?',
    a: 'Most clients see measurable traction within the first 30–60 days. Paid ads can generate leads in the first week. SEO and organic growth take 3–6 months to compound.',
  },
  {
    q: 'Can I start with one service and stack more later?',
    a: 'Absolutely. Many clients start with Imprint or Forge and add Surge, Flow, or Cortex as they grow. Our services are designed to integrate seamlessly.',
  },
  {
    q: 'What makes Cortex different from a chatbot?',
    a: 'A chatbot follows scripts. A Cortex AI agent thinks — it understands context, qualifies leads, books calls, and takes actions inside your systems. It\'s trained on your business and integrated with your CRM, WhatsApp, and workflows.',
  },
]

export default function PricingPage() {
  const [currency, setCurrency] = useState<'usd' | 'ngn'>('usd')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <SectionLabel>Transparent pricing</SectionLabel>
            <h1 className="font-syne font-extrabold text-4xl lg:text-5xl tracking-tighter text-gray-900 mb-3">
              Invest in what grows your business.
            </h1>
            <p className="font-sans font-light text-gray-500 text-base max-w-xl leading-relaxed">
              No hidden fees. No lock-ins beyond 3-month minimums on retainers.
            </p>
          </div>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {ONE_TIME_PACKAGES.map((pkg) => (
            <PricingCard key={pkg.name} pkg={pkg} currency={currency} />
          ))}
        </div>

        {/* Add-ons */}
        <div className="mb-16">
          <h2 className="font-syne font-bold text-2xl text-gray-900 mb-2">Add-on services</h2>
          <p className="font-sans font-light text-gray-500 text-sm mb-6">
            Layer these onto any package or subscription.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADDONS.map((addon) => (
              <div key={addon.name} className="border border-gray-200 rounded-xl p-5">
                <p className="font-sans font-medium text-sm text-gray-900 mb-1">{addon.name}</p>
                <p className="font-sans font-light text-xs text-gray-400 leading-relaxed mb-3">
                  {addon.description}
                </p>
                <p className="font-syne font-bold text-prescript-green text-sm">
                  {currency === 'ngn'
                    ? (() => {
                        const match = addon.price.match(/\$([0-9,]+)/)
                        if (match) {
                          const usd = parseInt(match[1].replace(',', ''))
                          return addon.price.replace(match[0], `₦${(usd * CURRENCY_RATES.ngn).toLocaleString()}`)
                        }
                        return addon.price
                      })()
                    : addon.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl">
          <h2 className="font-syne font-bold text-2xl text-gray-900 mb-6">
            Frequently asked questions
          </h2>
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
