import { Check, Minus } from 'lucide-react'
import type { SubscriptionPlan } from '@/lib/pricing'
import { CURRENCY_RATES } from '@/lib/pricing'

interface ComparisonTableProps {
  plans: SubscriptionPlan[]
  currency: 'usd' | 'ngn'
  billing: 'monthly' | 'annual'
}

function getPrice(plan: SubscriptionPlan, currency: 'usd' | 'ngn', billing: 'monthly' | 'annual'): string {
  const monthly = billing === 'annual' ? Math.round((plan.priceMonthly * 10) / 12) : plan.priceMonthly
  const amount = monthly * CURRENCY_RATES[currency]
  return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${amount.toLocaleString()}`
}

// Collect all unique feature texts
function getFeatures(plans: SubscriptionPlan[]): string[] {
  const seen = new Set<string>()
  const features: string[] = []
  plans.forEach((p) => {
    p.features.forEach((f) => {
      if (!seen.has(f.text)) {
        seen.add(f.text)
        features.push(f.text)
      }
    })
  })
  return features
}

export default function ComparisonTable({ plans, currency, billing }: ComparisonTableProps) {
  const features = getFeatures(plans)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr>
            <th className="text-left py-3 pr-4 text-xs font-sans font-medium text-gray-400 uppercase tracking-widest w-40">
              Feature
            </th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                className={`py-3 px-4 text-center min-w-[120px] ${
                  plan.isFeatured ? 'bg-prescript-green-light rounded-t-lg' : ''
                }`}
              >
                <p className="font-syne font-bold text-sm text-gray-900">{plan.name}</p>
                <p className="font-sans font-light text-xs text-prescript-green">
                  {getPrice(plan, currency, billing)}/mo
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr key={feature} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-3 pr-4 text-xs font-sans text-gray-600 leading-relaxed">{feature}</td>
              {plans.map((plan) => {
                const match = plan.features.find((f) => f.text === feature)
                return (
                  <td
                    key={plan.name}
                    className={`py-3 px-4 text-center ${plan.isFeatured ? 'bg-prescript-green-light bg-opacity-40' : ''}`}
                  >
                    {match?.included ? (
                      <Check size={14} className="text-prescript-green mx-auto" />
                    ) : (
                      <Minus size={14} className="text-gray-300 mx-auto" />
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
