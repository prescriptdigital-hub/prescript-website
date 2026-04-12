import { Check, Minus } from 'lucide-react'
import Button from '@/components/ui/Button'
import ServiceTag from '@/components/ui/ServiceTag'
import type { SubscriptionPlan } from '@/lib/pricing'
import { CURRENCY_RATES } from '@/lib/pricing'

type ServiceSlug = 'imprint' | 'forge' | 'surge' | 'flow' | 'cortex'

interface PlanCardProps {
  plan: SubscriptionPlan
  currency: 'usd' | 'ngn'
  billing: 'monthly' | 'annual'
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
  return (
    <div
      className={`border rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.01] ${
        plan.isFeatured ? 'border-[1.5px] border-prescript-green' : 'border-gray-200'
      }`}
    >
      {plan.isFeatured && (
        <div className="bg-prescript-green text-white text-center text-xs font-sans font-medium py-1.5">
          Most Popular
        </div>
      )}

      <div className="p-6 border-b border-gray-100">
        <p className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-0.5">{plan.tier}</p>
        <p className="font-syne font-extrabold text-2xl text-gray-900 mb-1">{plan.name}</p>
        <p className="font-sans font-light text-xs text-gray-400 mb-4 leading-relaxed">{plan.forWhom}</p>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-syne font-extrabold text-4xl text-prescript-green leading-none">
            {getPrice(plan, currency, billing)}
          </span>
          <span className="text-sm font-sans text-gray-400">/mo</span>
        </div>
        {billing === 'annual' && (
          <p className="text-xs font-sans text-gray-400 mb-3">
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
                <Check size={13} className="text-prescript-green flex-shrink-0 mt-0.5" />
              ) : (
                <Minus size={13} className="text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <span
                className={`font-sans font-light text-xs ${
                  f.included ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>
        <Button
          variant={plan.isFeatured ? 'primary' : 'outline'}
          size="md"
          href="/contact"
          className="w-full"
        >
          {plan.ctaLabel}
        </Button>
      </div>
    </div>
  )
}
