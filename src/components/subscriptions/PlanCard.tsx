'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import Button from '@/components/ui/Button'
import PaymentModal from '@/components/ui/PaymentModal'
import ServiceTag from '@/components/ui/ServiceTag'
import type { SubscriptionPlan } from '@/lib/pricing'
import { BILLING, billingTotalUSD, canCheckout, CURRENCY_RATES, isEnterprise, monthlyEquivalentUSD, type Billing } from '@/lib/pricing'

type ServiceSlug = 'imprint' | 'forge' | 'surge' | 'flow' | 'cortex'

interface PlanCardProps {
  plan: SubscriptionPlan
  currency: 'usd' | 'ngn'
  billing: Billing
}

function money(usd: number, currency: 'usd' | 'ngn'): string {
  const amount = usd * CURRENCY_RATES[currency]
  return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${amount.toLocaleString()}`
}

export default function PlanCard({ plan, currency, billing }: PlanCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const enterprise = isEnterprise(plan.priceMonthly)
  const contactOnly = !canCheckout(plan.priceMonthly, billing)
  const bookCall = !contactOnly && plan.name === 'Scale'
  const amountUSD = billingTotalUSD(plan.priceMonthly, billing)
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
            Recommended
          </div>
        )}

        <div className="p-6 border-b border-pd-line">
          <p className="text-xs font-sans text-pd-subtle uppercase tracking-widest mb-0.5">{plan.tier}</p>
          <p className="font-display font-light text-2xl text-pd-ink mb-1">{plan.name}</p>
          <p className="font-sans text-sm text-pd-subtle mb-4 leading-relaxed">{plan.forWhom}</p>

          <div className="flex items-baseline gap-1 mb-1">
            <span className="font-display font-light text-4xl text-pd-brick-700 leading-none">
              {enterprise ? 'Enterprise' : money(monthlyEquivalentUSD(plan.priceMonthly, billing), currency)}
            </span>
            <span className="text-sm font-sans text-pd-subtle">{enterprise ? 'Custom quote' : '/mo'}</span>
          </div>
          {billing !== 'monthly' && !enterprise && (
            <p className="text-xs font-sans text-pd-subtle mb-3">
              {contactOnly ? 'Contact us for yearly billing' : `${money(amountUSD, currency)} ${BILLING[billing].suffix}`}
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
            href={contactOnly ? '/contact' : undefined}
            onClick={() => setModalOpen(true)}
            className="w-full"
          >
            {contactOnly ? 'Contact us' : plan.ctaLabel}
          </Button>
          {bookCall && (
            <Button variant="outline" size="md" href="/contact" className="w-full mt-2">
              Book a call first
            </Button>
          )}
        </div>
      </div>

      {modalOpen && !contactOnly && (
        <PaymentModal
          planName={plan.name}
          amountUSD={amountUSD}
          amountNGN={amountNGN}
          currency={currency}
          periodLabel={BILLING[billing].suffix}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
