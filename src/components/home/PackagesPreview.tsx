'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const PACKAGES = [
  {
    name: 'Digital Foundation',
    tag: 'Imprint + Forge',
    price: '$1,500',
    period: 'one-time',
    featured: false,
    features: [
      'Brand identity + full guide',
      '5-page website',
      'Business email setup',
      'CRM (GoHighLevel)',
      'WhatsApp Business integration',
      '1-month content calendar',
    ],
    cta: 'Get Started',
    href: '/pricing',
  },
  {
    name: 'Growth Engine',
    tag: 'Surge + Flow',
    price: '$2,000',
    period: 'per month',
    featured: true,
    features: [
      'Social media — 3 platforms',
      'Meta + Google Ads management',
      '2 email campaigns/month',
      'WhatsApp automation',
      'Basic CRM automation',
      'Monthly report + strategy call',
    ],
    cta: 'Start Growing',
    href: '/pricing',
  },
  {
    name: 'AI Business System',
    tag: 'All 5 Services',
    price: '$5,000',
    period: 'setup + $1,500/mo',
    featured: false,
    features: [
      'Business process audit',
      'Flow custom workflows',
      'Cortex AI agent',
      'CRM + eCommerce integration',
      'Full Growth Engine included',
      'Dedicated account manager',
    ],
    cta: 'Book Strategy Call',
    href: '/contact',
  },
]

export default function PackagesPreview() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionLabel>Packages</SectionLabel>
      <h2 className="font-syne font-extrabold text-3xl lg:text-4xl tracking-tighter text-gray-900 mb-3">
        Three ways to start.
      </h2>
      <p className="font-sans font-light text-gray-500 text-base max-w-2xl mb-10 leading-relaxed">
        Every package stacks our five services into one clear engagement. Start where you are,
        scale as you grow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className={`border rounded-2xl overflow-hidden flex flex-col ${
              pkg.featured
                ? 'border-[1.5px] border-prescript-green'
                : 'border-gray-200'
            }`}
          >
            {pkg.featured && (
              <div className="bg-prescript-green text-white text-center text-xs font-sans font-medium py-1.5">
                Most Popular
              </div>
            )}

            {/* Card header */}
            <div className="p-6 border-b border-gray-100">
              <p className="font-syne font-bold text-gray-900 text-lg">{pkg.name}</p>
              <p className="text-xs font-sans text-prescript-green font-medium mt-0.5 mb-3">
                {pkg.tag}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-syne font-extrabold text-3xl text-gray-900">
                  {pkg.price}
                </span>
                <span className="text-sm font-sans text-gray-400">{pkg.period}</span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-6 flex flex-col flex-1">
              <ul className="space-y-2.5 flex-1 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className="text-prescript-green mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-sm text-gray-700">{f}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant={pkg.featured ? 'primary' : 'outline'}
                size="md"
                href={pkg.href}
                className="w-full"
              >
                {pkg.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-6">
        <Link
          href="/pricing"
          className="text-sm font-sans text-prescript-green hover:underline"
        >
          View full pricing details →
        </Link>
      </p>
    </section>
  )
}
