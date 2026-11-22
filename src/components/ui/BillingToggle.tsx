'use client'

import { clsx } from 'clsx'

interface BillingToggleProps {
  value: 'monthly' | 'annual'
  onChange: (v: 'monthly' | 'annual') => void
}

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="inline-flex items-center border border-pd-line p-0.5 bg-pd-paper">
        {(['monthly', 'annual'] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onChange(b)}
            className={clsx(
              'px-4 py-1.5 text-xs font-sans font-medium transition-all duration-150',
              value === b
                ? 'bg-pd-surface text-pd-ink '
                : 'text-pd-muted hover:text-pd-muted'
            )}
          >
            {b === 'monthly' ? 'Monthly' : 'Annual'}
          </button>
        ))}
      </div>
      {value === 'annual' && (
        <span className="text-xs font-sans font-medium text-pd-brick-700 bg-pd-surface-2 px-2 py-0.5">
          Save 17%
        </span>
      )}
    </div>
  )
}
