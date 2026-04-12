'use client'

import { clsx } from 'clsx'

interface CurrencyToggleProps {
  value: 'usd' | 'ngn'
  onChange: (v: 'usd' | 'ngn') => void
}

export default function CurrencyToggle({ value, onChange }: CurrencyToggleProps) {
  return (
    <div className="inline-flex items-center border border-gray-200 rounded-full p-0.5 bg-gray-50">
      {(['usd', 'ngn'] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={clsx(
            'px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-150',
            value === c
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {c === 'usd' ? 'USD $' : 'NGN ₦'}
        </button>
      ))}
    </div>
  )
}
