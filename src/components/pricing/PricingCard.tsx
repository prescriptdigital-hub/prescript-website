import { Check, Minus } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { OneTimePackage } from '@/lib/pricing'
import { CURRENCY_RATES } from '@/lib/pricing'

interface PricingCardProps {
  pkg: OneTimePackage
  currency: 'usd' | 'ngn'
}

function formatPkg(pkg: OneTimePackage, currency: 'usd' | 'ngn'): string {
  if (pkg.period === 'one-time' || pkg.period.includes('setup')) {
    const amount = pkg.price * CURRENCY_RATES[currency]
    return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${pkg.price.toLocaleString()}`
  }
  const amount = pkg.price * CURRENCY_RATES[currency]
  return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${pkg.price.toLocaleString()}`
}

export default function PricingCard({ pkg, currency }: PricingCardProps) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.01] ${
        pkg.isFeatured ? 'border-[1.5px] border-prescript-green' : 'border-gray-200'
      }`}
    >
      {pkg.isFeatured && (
        <div className="bg-prescript-green text-white text-center text-xs font-sans font-medium py-1.5">
          Most Popular
        </div>
      )}

      <div className="p-6 border-b border-gray-100">
        <p className="font-syne font-bold text-gray-900 text-lg">{pkg.name}</p>
        <div className="flex flex-wrap gap-1 mt-1 mb-3">
          {pkg.servicesIncluded.map((s) => (
            <span key={s} className="text-xs font-sans text-prescript-green font-medium">
              {s}
            </span>
          ))}
        </div>
        <p className="font-sans font-light text-xs text-gray-400 mb-3">{pkg.tagline}</p>
        <div className="flex items-baseline gap-1">
          <span className="font-syne font-extrabold text-3xl text-gray-900">
            {formatPkg(pkg, currency)}
          </span>
          <span className="text-sm font-sans text-gray-400">
            {pkg.period === 'one-time' ? 'one-time' : pkg.period === 'per month' ? '/mo' : pkg.period}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <ul className="space-y-2.5 flex-1 mb-6">
          {pkg.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2">
              {f.included ? (
                <Check size={14} className="text-prescript-green flex-shrink-0 mt-0.5" />
              ) : (
                <Minus size={14} className="text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <span
                className={`font-sans font-light text-sm ${
                  f.included ? 'text-gray-700' : 'text-gray-400'
                }`}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>
        <Button
          variant={pkg.buttonVariant}
          size="md"
          href="/contact"
          className="w-full"
        >
          {pkg.buttonLabel}
        </Button>
      </div>
    </div>
  )
}
