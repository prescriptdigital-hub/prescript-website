'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionLabel from '@/components/ui/SectionLabel'
import BillingToggle from '@/components/ui/BillingToggle'
import CurrencyToggle from '@/components/ui/CurrencyToggle'
import FAQItem from '@/components/ui/FAQItem'
import PlanCard from '@/components/subscriptions/PlanCard'
import ComparisonTable from '@/components/subscriptions/ComparisonTable'
import Button from '@/components/ui/Button'
import { PERSONAL_PLANS, BUSINESS_PLANS, CURRENCY_RATES } from '@/lib/pricing'

const SUBSCRIBER_PERKS = [
  { title: 'WhatsApp Support Line', desc: '24hr response time on all plans.' },
  { title: 'Monthly Report', desc: 'Clear performance update every month.' },
  { title: 'Upgrade Anytime', desc: 'Move up a plan with no penalties.' },
  { title: 'Cancel After 3 Months', desc: '30 days notice required after the minimum.' },
]

const FAQS = [
  {
    q: 'What is the minimum subscription period?',
    a: '3 months. After that, you can cancel with 30 days notice or upgrade/downgrade at any time.',
  },
  {
    q: 'Is the annual plan billed upfront?',
    a: 'Yes, annual plans are billed in full at the start of the period. You get 2 months free compared to monthly billing — a 17% saving.',
  },
  {
    q: 'Can I mix Personal and Business plans?',
    a: 'No — plans are designed for either a personal brand or a registered business. Choose the track that fits your situation.',
  },
  {
    q: 'Do subscriptions include ad spend?',
    a: 'No. Ad spend (Meta, Google) is always the client\'s budget. Our fee covers campaign management and optimization, not the media spend itself.',
  },
  {
    q: 'Can I upgrade mid-month?',
    a: 'Yes. We pro-rate the difference and upgrade your services immediately. Downgrades take effect at the next billing cycle.',
  },
]

export default function SubscriptionsPage() {
  const [track, setTrack] = useState<'personal' | 'business'>('personal')
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [currency, setCurrency] = useState<'usd' | 'ngn'>('usd')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const plans = track === 'personal' ? PERSONAL_PLANS : BUSINESS_PLANS
  const personalStart = PERSONAL_PLANS[0].priceMonthly * CURRENCY_RATES[currency]
  const businessStart = BUSINESS_PLANS[0].priceMonthly * CURRENCY_RATES[currency]

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-10">
          <SectionLabel>Subscription Plans · New</SectionLabel>
          <h1 className="font-syne font-extrabold text-4xl lg:text-5xl tracking-tighter text-gray-900 mb-3">
            World-class services. Monthly. No big upfront.
          </h1>
          <p className="font-sans text-gray-500 text-base max-w-xl leading-relaxed mb-6">
            Choose your track — personal brand or business — and pick the plan that fits where you are now.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <BillingToggle value={billing} onChange={setBilling} />
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>
        </div>

        {/* Track selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <button
            type="button"
            onClick={() => setTrack('personal')}
            className={`text-left border rounded-xl p-5 transition-colors ${
              track === 'personal'
                ? 'border-[1.5px] border-prescript-green bg-prescript-green-light'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <p className="font-syne font-bold text-lg text-gray-900 mb-1">Personal Brand</p>
            <p className="font-sans text-sm text-gray-500 mb-3">
              For creators, coaches, consultants, and solo professionals building a personal brand.
            </p>
            <p className="font-syne font-bold text-prescript-green text-sm">
              From {currency === 'ngn' ? `₦${personalStart.toLocaleString()}` : `$${PERSONAL_PLANS[0].priceMonthly}`}/mo
            </p>
            <p className="text-xs font-sans text-gray-400 mt-0.5">3 plans</p>
          </button>

          <button
            type="button"
            onClick={() => setTrack('business')}
            className={`text-left border rounded-xl p-5 transition-colors ${
              track === 'business'
                ? 'border-[1.5px] border-prescript-green bg-prescript-green-light'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <p className="font-syne font-bold text-lg text-gray-900 mb-1">Business</p>
            <p className="font-sans text-sm text-gray-500 mb-3">
              For registered businesses, startups, and SMEs that need a full digital team.
            </p>
            <p className="font-syne font-bold text-prescript-green text-sm">
              From {currency === 'ngn' ? `₦${businessStart.toLocaleString()}` : `$${BUSINESS_PLANS[0].priceMonthly}`}/mo
            </p>
            <p className="text-xs font-sans text-gray-400 mt-0.5">4 plans</p>
          </button>
        </div>

        {/* Plan grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${track === 'business' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-5 mb-16`}>
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} currency={currency} billing={billing} />
          ))}
        </div>

        {/* Subscriber perks */}
        <div className="mb-16">
          <h2 className="font-syne font-bold text-2xl text-gray-900 mb-6">
            What every subscriber gets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUBSCRIBER_PERKS.map((perk) => (
              <div key={perk.title} className="border border-gray-100 rounded-xl p-5">
                <p className="font-sans font-medium text-sm text-gray-900 mb-1">{perk.title}</p>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <div className="mb-16">
          <h2 className="font-syne font-bold text-2xl text-gray-900 mb-6">
            Full comparison — {track === 'personal' ? 'Personal Brand' : 'Business'} plans
          </h2>
          <ComparisonTable plans={plans} currency={currency} billing={billing} />
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mb-16">
          <h2 className="font-syne font-bold text-2xl text-gray-900 mb-6">
            Subscription questions
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

        {/* CTA strip */}
        <div className="bg-prescript-green rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-syne font-bold text-white text-xl mb-1">Not sure which plan?</p>
            <p className="font-sans text-white text-sm opacity-80">
              Book a free 20-minute call and we&apos;ll recommend the right fit.
            </p>
          </div>
          <Button variant="outline" size="lg" href="/contact" className="border-white text-white hover:bg-white hover:text-prescript-green flex-shrink-0">
            Book a Free Call
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
