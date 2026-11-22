'use client'

import { clsx } from 'clsx'

interface CurrencyToggleProps {
  value: 'usd' | 'ngn'
  onChange: (v: 'usd' | 'ngn') => void
}

export default function CurrencyToggle({ value, onChange }: CurrencyToggleProps) {
  return (
    <div className="inline-flex items-center border border-pd-line p-0.5 bg-pd-paper">
      {(['usd', 'ngn'] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={clsx(
            'px-4 py-1.5 text-xs font-sans font-medium transition-all duration-150',
            value === c
              ? 'bg-pd-surface text-pd-ink '
              : 'text-pd-muted hover:text-pd-muted'
          )}
        >
          {c === 'usd' ? 'USD $' : 'NGN ₦'}
        </button>
      ))}
    </div>
  )
}
