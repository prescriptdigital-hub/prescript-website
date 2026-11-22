'use client'

import { useRouter } from 'next/navigation'
import { SERVICES } from '@/lib/services'

export default function ServiceStrip() {
  const router = useRouter()

  return (
    <div className="border-t border-pd-line grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
      {SERVICES.map((service, i) => (
        <button
          key={service.slug}
          type="button"
          onClick={() => router.push(`/services/${service.slug}`)}
          className={`flex flex-col items-start px-4 py-5 border-r border-b md:border-b-0 border-pd-line cursor-pointer hover:bg-pd-paper transition-colors text-left
            ${i % 2 === 1 ? 'border-r-0 sm:border-r' : ''}
            ${i % 3 === 2 ? 'sm:border-r-0 md:border-r' : ''}
            md:last:border-r-0`}
        >
          <span className="font-display font-light text-pd-brick-700 text-base leading-tight">
            {service.name}
          </span>
          <span className="font-sans text-xs text-pd-subtle mt-1 leading-snug">
            {service.fullName}
          </span>
        </button>
      ))}
    </div>
  )
}
