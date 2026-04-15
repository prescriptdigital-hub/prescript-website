'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import CurrencyToggle from '@/components/ui/CurrencyToggle'
import FAQItem from '@/components/ui/FAQItem'
import PricingCard from '@/components/pricing/PricingCard'
import Button from '@/components/ui/Button'
import { ONE_TIME_PACKAGES, ADDONS, CURRENCY_RATES, PERSONAL_PLANS, BUSINESS_PLANS } from '@/lib/pricing'

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

  const subPlans = [
    { ...PERSONAL_PLANS[1], track: 'Personal Brand' },   // Bloom
    { ...BUSINESS_PLANS[0], track: 'Business' },          // Launch
    { ...BUSINESS_PLANS[2], track: 'Business' },          // Scale (featured)
  ]

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <SectionLabel>Transparent pricing</SectionLabel>
            <h1 className="font-syne font-extrabold text-4xl lg:text-5xl tracking-tighter text-gray-900 mb-3">
              Invest in what grows your business.
            </h1>
            <p className="font-sans font-light text-gray-500 text-base max-w-xl leading-relaxed">
              No hidden fees. No lock-ins beyond 3-month minimums on retainers. Two paths — subscriptions for individuals &amp; small businesses, packages for corporations.
            </p>
          </div>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        {/* Audience selector cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <div className="border border-prescript-green bg-prescript-green-light rounded-2xl p-6">
            <p className="text-xs font-sans text-prescript-green font-medium uppercase tracking-widest mb-2">Monthly Subscriptions</p>
            <p className="font-syne font-extrabold text-xl text-gray-900 mb-2">Individuals, Startups &amp; Small Businesses</p>
            <p className="font-sans text-sm text-gray-500 mb-4 leading-relaxed">
              No big upfront. World-class services on a monthly plan — from $49/mo. Cancel after 3 months.
            </p>
            <a href="#subscriptions" className="text-sm font-sans font-medium text-prescript-green hover:underline">
              View subscription plans ↓
            </a>
          </div>
          <div className="border border-gray-200 rounded-2xl p-6">
            <p className="text-xs font-sans text-gray-400 font-medium uppercase tracking-widest mb-2">Enterprise Packages</p>
            <p className="font-syne font-extrabold text-xl text-gray-900 mb-2">Corporations &amp; Established Businesses</p>
            <p className="font-sans text-sm text-gray-500 mb-4 leading-relaxed">
              One-time or retainer packages for companies that need the full stack — from $1,500.
            </p>
            <a href="#packages" className="text-sm font-sans font-medium text-gray-500 hover:underline">
              View enterprise packages ↓
            </a>
          </div>
        </div>

        {/* ── SUBSCRIPTIONS SECTION ── */}
        <div id="subscriptions" className="mb-20">
          <SectionLabel>Monthly Subscriptions</SectionLabel>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-syne font-extrabold text-3xl tracking-tighter text-gray-900 mb-2">
                For individuals, startups &amp; small businesses.
              </h2>
              <p className="font-sans font-light text-gray-500 text-sm max-w-xl leading-relaxed">
                Start from $49/month. No large upfront investment. Scale your plan as your business grows.
              </p>
            </div>
            <Link href="/subscriptions" className="text-sm font-sans text-prescript-green hover:underline whitespace-nowrap flex-shrink-0">
              See all 7 plans →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            {subPlans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white border rounded-2xl overflow-hidden flex flex-col ${
                  plan.isFeatured ? 'border-[1.5px] border-prescript-green' : 'border-gray-200'
                }`}
              >
                {plan.isFeatured && (
                  <div className="bg-prescript-green text-white text-center text-xs font-sans font-medium py-1.5">
                    Most Popular
                  </div>
                )}
                <div className="p-5 border-b border-gray-100">
                  <p className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-0.5">{plan.track}</p>
                  <p className="font-syne font-extrabold text-xl text-gray-900 mb-1">{plan.name}</p>
                  <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">{plan.forWhom}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-syne font-extrabold text-3xl text-prescript-green leading-none">
                      {currency === 'ngn'
                        ? `₦${(plan.priceMonthly * CURRENCY_RATES.ngn).toLocaleString()}`
                        : `$${plan.priceMonthly}`}
                    </span>
                    <span className="text-xs font-sans text-gray-400">/mo</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <ul className="space-y-2 flex-1 mb-5">
                    {plan.features.filter(f => f.included).slice(0, 5).map((f) => (
                      <li key={f.text} className="flex items-start gap-2">
                        <Check size={12} className="text-prescript-green mt-0.5 flex-shrink-0" />
                        <span className="font-sans text-xs text-gray-600 leading-relaxed">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.isFeatured ? 'primary' : 'outline'}
                    size="sm"
                    href="/subscriptions"
                    className="w-full"
                  >
                    {plan.ctaLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-sans font-medium text-sm text-gray-900 mb-0.5">7 plans across Personal Brand and Business tracks</p>
              <p className="font-sans text-xs text-gray-400">From $49/mo · 3-month minimum · Cancel anytime after</p>
            </div>
            <Button variant="primary" size="sm" href="/subscriptions" className="flex-shrink-0">
              See All Subscription Plans
            </Button>
          </div>
        </div>

        {/* ── ENTERPRISE PACKAGES SECTION ── */}
        <div id="packages" className="mb-16">
          <SectionLabel>Enterprise Packages</SectionLabel>
          <h2 className="font-syne font-extrabold text-3xl tracking-tighter text-gray-900 mb-2">
            For corporations &amp; established businesses.
          </h2>
          <p className="font-sans font-light text-gray-500 text-sm max-w-xl mb-8 leading-relaxed">
            Full-stack engagements that combine all five services. One clear investment, one integrated team.
          </p>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {ONE_TIME_PACKAGES.map((pkg) => (
              <PricingCard key={pkg.name} pkg={pkg} currency={currency} />
            ))}
          </div>
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
