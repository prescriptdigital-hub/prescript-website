'use client'

import { clsx } from 'clsx'

interface BillingToggleProps {
  value: 'monthly' | 'annual'
  onChange: (v: 'monthly' | 'annual') => void
}

export default function BillingToggle({ value, onChange }: BillingToggleProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="inline-flex items-center border border-gray-200 rounded-full p-0.5 bg-gray-50">
        {(['monthly', 'annual'] as const).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onChange(b)}
            className={clsx(
              'px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-150',
              value === b
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {b === 'monthly' ? 'Monthly' : 'Annual'}
          </button>
        ))}
      </div>
      {value === 'annual' && (
        <span className="text-xs font-sans font-medium text-prescript-green bg-prescript-green-light px-2 py-0.5 rounded-full">
          Save 17%
        </span>
      )}
    </div>
  )
}
