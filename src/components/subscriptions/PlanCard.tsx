'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import Button from '@/components/ui/Button'
import PaymentModal from '@/components/ui/PaymentModal'
import ServiceTag from '@/components/ui/ServiceTag'
import type { SubscriptionPlan } from '@/lib/pricing'
import { CURRENCY_RATES, isEnterprise } from '@/lib/pricing'

type ServiceSlug = 'imprint' | 'forge' | 'surge' | 'flow' | 'cortex'

interface PlanCardProps {
  plan: SubscriptionPlan
  currency: 'usd' | 'ngn'
  billing: 'monthly' | 'annual'
}

function getAmountUSD(plan: SubscriptionPlan, billing: 'monthly' | 'annual'): number {
  return billing === 'annual' ? plan.priceMonthly * 10 : plan.priceMonthly
}

function getPrice(plan: SubscriptionPlan, currency: 'usd' | 'ngn', billing: 'monthly' | 'annual'): string {
  const monthly = billing === 'annual'
    ? Math.round((plan.priceMonthly * 10) / 12)
    : plan.priceMonthly
  const amount = monthly * CURRENCY_RATES[currency]
  return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${amount.toLocaleString()}`
}

function getAnnualTotal(plan: SubscriptionPlan, currency: 'usd' | 'ngn'): string {
  const amount = plan.priceMonthly * 10 * CURRENCY_RATES[currency]
  return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${amount.toLocaleString()}`
}

export default function PlanCard({ plan, currency, billing }: PlanCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const enterprise = isEnterprise(plan.priceMonthly)
  const amountUSD = getAmountUSD(plan, billing)
  const amountNGN = amountUSD * CURRENCY_RATES.ngn

  return (
    <>
      <div
        className={`border rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.01] ${
          plan.isFeatured ? 'border-[1.5px] border-pd-brick-700' : 'border-pd-line'
        }`}
      >
        {plan.isFeatured && (
          <div className="bg-pd-brick-700 text-white text-center text-xs font-sans font-medium py-1.5">
            Most Popular
          </div>
        )}

        <div className="p-6 border-b border-pd-line">
          <p className="text-xs font-sans text-pd-subtle uppercase tracking-widest mb-0.5">{plan.tier}</p>
          <p className="font-display font-light text-2xl text-pd-ink mb-1">{plan.name}</p>
          <p className="font-sans text-sm text-pd-subtle mb-4 leading-relaxed">{plan.forWhom}</p>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-display font-light text-4xl text-pd-brick-700 leading-none">
              {enterprise ? 'Enterprise' : getPrice(plan, currency, billing)}
            </span>
            <span className="text-sm font-sans text-pd-subtle">{enterprise ? 'Custom quote' : '/mo'}</span>
          </div>
          {billing === 'annual' && !enterprise && (
            <p className="text-xs font-sans text-pd-subtle mb-3">
              {getAnnualTotal(plan, currency)} billed annually
            </p>
          )}

          <div className="flex flex-wrap gap-1 mt-3">
            {plan.services.map((s) => (
              <ServiceTag key={s} service={s as ServiceSlug} />
            ))}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <ul className="space-y-2.5 flex-1 mb-6">
            {plan.features.map((f) => (
              <li key={f.text} className="flex items-start gap-2">
                {f.included ? (
                  <Check size={13} className="text-pd-brick-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <Minus size={13} className="text-pd-subtle flex-shrink-0 mt-0.5" />
                )}
                <span className={`font-sans text-sm ${f.included ? 'text-pd-muted' : 'text-pd-subtle'}`}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
          <Button
            variant={plan.isFeatured ? 'primary' : 'outline'}
            size="md"
            href={enterprise ? '/contact' : undefined}
            onClick={() => setModalOpen(true)}
            className="w-full"
          >
            {enterprise ? 'Contact us' : plan.ctaLabel}
          </Button>
        </div>
      </div>

      {modalOpen && !enterprise && (
        <PaymentModal
          planName={plan.name}
          amountUSD={amountUSD}
          amountNGN={amountNGN}
          currency={currency}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
