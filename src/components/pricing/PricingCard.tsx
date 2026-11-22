'use client'

import { useState } from 'react'
import { Check, Minus } from 'lucide-react'
import Button from '@/components/ui/Button'
import PaymentModal from '@/components/ui/PaymentModal'
import type { OneTimePackage } from '@/lib/pricing'
import { CURRENCY_RATES } from '@/lib/pricing'

interface PricingCardProps {
  pkg: OneTimePackage
  currency: 'usd' | 'ngn'
}

function formatPkg(pkg: OneTimePackage, currency: 'usd' | 'ngn'): string {
  const amount = pkg.price * CURRENCY_RATES[currency]
  return currency === 'ngn' ? `₦${amount.toLocaleString()}` : `$${pkg.price.toLocaleString()}`
}

export default function PricingCard({ pkg, currency }: PricingCardProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const amountNGN = pkg.price * CURRENCY_RATES.ngn

  return (
    <>
      <div
        className={`border rounded-2xl overflow-hidden flex flex-col transition-transform hover:scale-[1.01] ${
          pkg.isFeatured ? 'border-[1.5px] border-pd-brick-700' : 'border-pd-line'
        }`}
      >
        {pkg.isFeatured && (
          <div className="bg-pd-brick-700 text-white text-center text-xs font-sans font-medium py-1.5">
            Most Popular
          </div>
        )}

        <div className="p-6 border-b border-pd-line">
          <p className="font-display font-normal text-pd-ink text-lg">{pkg.name}</p>
          <div className="flex flex-wrap gap-1 mt-1 mb-3">
            {pkg.servicesIncluded.map((s) => (
              <span key={s} className="text-xs font-sans text-pd-brick-700 font-medium">{s}</span>
            ))}
          </div>
          <p className="font-sans text-sm text-pd-subtle mb-3">{pkg.tagline}</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-light text-3xl text-pd-ink">
              {formatPkg(pkg, currency)}
            </span>
            <span className="text-sm font-sans text-pd-subtle">
              {pkg.period === 'one-time' ? 'one-time' : pkg.period === 'per month' ? '/mo' : pkg.period}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <ul className="space-y-2.5 flex-1 mb-6">
            {pkg.features.map((f) => (
              <li key={f.text} className="flex items-start gap-2">
                {f.included ? (
                  <Check size={14} className="text-pd-brick-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <Minus size={14} className="text-pd-subtle flex-shrink-0 mt-0.5" />
                )}
                <span className={`font-sans text-sm ${f.included ? 'text-pd-muted' : 'text-pd-subtle'}`}>
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
          <Button
            variant={pkg.buttonVariant}
            size="md"
            onClick={() => setModalOpen(true)}
            className="w-full"
          >
            {pkg.buttonLabel}
          </Button>
        </div>
      </div>

      {modalOpen && (
        <PaymentModal
          planName={pkg.name}
          amountUSD={pkg.price}
          amountNGN={amountNGN}
          currency={currency}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}
