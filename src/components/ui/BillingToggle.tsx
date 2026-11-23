'use client'

import { clsx } from 'clsx'
import { BILLING, type Billing } from '@/lib/pricing'

interface BillingToggleProps {
  value: Billing
  onChange: (v: Billing) => void
}

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 flex-wrap">
      <div className="inline-flex items-center border border-pd-line p-0.5 bg-pd-paper">
        {(Object.keys(BILLING) as Billing[]).map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={value === b}
            onClick={() => onChange(b)}
            className={clsx(
              'px-4 py-2 text-xs font-sans font-medium transition-colors duration-150',
              value === b ? 'bg-pd-oxblood text-pd-cream' : 'text-pd-muted hover:text-pd-ink'
            )}
          >
            {BILLING[b].label}
          </button>
        ))}
      </div>
      {BILLING[value].discountPercent > 0 && (
        <span className="text-xs font-sans font-medium text-pd-brick-700 bg-pd-surface-2 px-2 py-0.5">Save {BILLING[value].discountPercent}%</span>
      )}
    </div>
  )
}
