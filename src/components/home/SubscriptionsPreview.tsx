'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const PREVIEW_PLANS = [
  {
    track: 'Personal Brand',
    name: 'Seed',
    price: '$49',
    forWhom: 'Build your personal brand online.',
    featured: false,
    features: [
      '8 branded social graphics/month',
      'Basic brand kit',
      '1 social platform content calendar',
      'WhatsApp Business profile setup',
    ],
    cta: 'Start with Seed',
  },
  {
    track: 'Personal Brand',
    name: 'Bloom',
    price: '$149',
    forWhom: 'Grow your audience and monetize.',
    featured: true,
    features: [
      '16 graphics + 2 reels/month',
      '2 social platforms managed',
      '1 email campaign/month',
      'Basic Meta Ads setup',
      'Monthly performance report',
    ],
    cta: 'Start with Bloom',
  },
  {
    track: 'Business',
    name: 'Launch',
    price: '$199',
    forWhom: 'Establish your business online.',
    featured: false,
    features: [
      '12 graphics + 2 reels/month',
      '2 social platforms managed',
      '1 email campaign/month',
      'WhatsApp Business auto-reply',
    ],
    cta: 'Start with Launch',
  },
  {
    track: 'Business',
    name: 'Scale',
    price: '$999',
    forWhom: 'Run on AI-powered systems.',
    featured: true,
    features: [
      '20 graphics + 6 reels + 1 video/month',
      'Meta + Google Ads management',
      'Flow — 4 automation workflows',
      'Cortex — 1 AI agent (support or sales)',
      'Monthly strategy call (60 mins)',
    ],
    cta: 'Start with Scale',
  },
]

export default function SubscriptionsPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionLabel>Monthly Subscriptions</SectionLabel>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-syne font-extrabold text-3xl lg:text-4xl tracking-tighter text-gray-900 mb-3">
              For individuals, startups &amp; small businesses.
            </h2>
            <p className="font-sans font-light text-gray-500 text-base max-w-2xl leading-relaxed">
              No big upfront costs. World-class digital services on a monthly plan — start small, scale as you grow.
            </p>
          </div>
          <Link
            href="/subscriptions"
            className="text-sm font-sans text-prescript-green hover:underline whitespace-nowrap flex-shrink-0"
          >
            View all 7 plans →
          </Link>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {PREVIEW_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white border rounded-2xl overflow-hidden flex flex-col ${
                plan.featured
                  ? 'border-[1.5px] border-prescript-green'
                  : 'border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="bg-prescript-green text-white text-center text-xs font-sans font-medium py-1.5">
                  Most Popular
                </div>
              )}

              <div className="p-5 border-b border-gray-100">
                <p className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-0.5">
                  {plan.track}
                </p>
                <p className="font-syne font-extrabold text-xl text-gray-900 mb-1">{plan.name}</p>
                <p className="font-sans text-xs text-gray-400 mb-3 leading-relaxed">{plan.forWhom}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-syne font-extrabold text-3xl text-prescript-green leading-none">
                    {plan.price}
                  </span>
                  <span className="text-xs font-sans text-gray-400">/mo</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <ul className="space-y-2 flex-1 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check size={12} className="text-prescript-green mt-0.5 flex-shrink-0" />
                      <span className="font-sans text-xs text-gray-600 leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? 'primary' : 'outline'}
                  size="sm"
                  href="/subscriptions"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="border border-gray-200 bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-syne font-bold text-gray-900 text-base mb-0.5">
              Not sure which plan fits?
            </p>
            <p className="font-sans text-sm text-gray-400">
              7 plans across Personal Brand and Business tracks. 3-month minimum, cancel anytime after.
            </p>
          </div>
          <Button variant="primary" size="md" href="/subscriptions" className="flex-shrink-0">
            See All Plans
          </Button>
        </div>
      </div>
    </section>
  )
}
