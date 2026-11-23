'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const PACKAGES = [
  {
    name: 'Digital Foundation',
    tag: 'Imprint + Forge',
    price: 'Enterprise',
    period: 'Custom quote',
    featured: false,
    features: [
      'Brand identity + full guide',
      '5-page website',
      'Business email setup',
      'CRM (GoHighLevel)',
      'WhatsApp Business integration',
      '1-month content calendar',
    ],
    cta: 'Contact us',
    href: '/contact',
  },
  {
    name: 'Growth Engine',
    tag: 'Surge + Flow',
    price: 'Enterprise',
    period: 'Custom quote',
    featured: true,
    features: [
      'Social media, 3 platforms',
      'Meta + Google Ads management',
      '2 email campaigns/month',
      'WhatsApp automation',
      'Basic CRM automation',
      'Monthly report + strategy call',
    ],
    cta: 'Contact us',
    href: '/contact',
  },
  {
    name: 'AI Business System',
    tag: 'All 5 Services',
    price: 'Enterprise',
    period: 'Custom quote',
    featured: false,
    features: [
      'Business process audit',
      'Flow custom workflows',
      'Cortex AI agent',
      'CRM + eCommerce integration',
      'Full Growth Engine included',
      'Dedicated account manager',
    ],
    cta: 'Contact us',
    href: '/contact',
  },
]

export default function PackagesPreview() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionLabel>Enterprise Packages</SectionLabel>
      <h2 className="font-display font-light text-3xl lg:text-4xl tracking-tighter text-pd-ink mb-3">
        For corporations &amp; established businesses.
      </h2>
      <p className="font-sans font-light text-pd-muted text-base max-w-2xl mb-10 leading-relaxed">
        One-time or retainer packages built for companies that need the full stack, brand, tech,
        marketing, automation, and AI working as a single system.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PACKAGES.map((pkg) => (
          <div
            key={pkg.name}
            className={`border rounded-2xl overflow-hidden flex flex-col ${
              pkg.featured
                ? 'border-[1.5px] border-pd-brick-700'
                : 'border-pd-line'
            }`}
          >
            {pkg.featured && (
              <div className="bg-pd-brick-700 text-white text-center text-xs font-sans font-medium py-1.5">
                Recommended
              </div>
            )}

            {/* Card header */}
            <div className="p-6 border-b border-pd-line">
              <p className="font-display font-normal text-pd-ink text-lg">{pkg.name}</p>
              <p className="text-xs font-sans text-pd-brick-700 font-medium mt-0.5 mb-3">
                {pkg.tag}
              </p>
              <div className="flex items-baseline gap-1">
                <span className="font-display font-light text-3xl text-pd-ink">
                  {pkg.price}
                </span>
                <span className="text-sm font-sans text-pd-subtle">{pkg.period}</span>
              </div>
            </div>

            {/* Card body */}
            <div className="p-6 flex flex-col flex-1">
              <ul className="space-y-2.5 flex-1 mb-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} className="text-pd-brick-700 mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-sm text-pd-muted">{f}</span>
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
          className="text-sm font-sans text-pd-brick-700 hover:underline"
        >
          Compare enterprise packages →
        </Link>
      </p>
    </section>
  )
}
