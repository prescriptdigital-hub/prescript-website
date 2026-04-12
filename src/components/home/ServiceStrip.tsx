'use client'

import { useRouter } from 'next/navigation'
import { SERVICES } from '@/lib/services'

export default function ServiceStrip() {
  const router = useRouter()

  return (
    <div className="border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
      {SERVICES.map((service, i) => (
        <button
          key={service.slug}
          type="button"
          onClick={() => router.push(`/services/${service.slug}`)}
          className={`flex flex-col items-start px-4 py-5 border-r border-b md:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors text-left
            ${i % 2 === 1 ? 'border-r-0 sm:border-r' : ''}
            ${i % 3 === 2 ? 'sm:border-r-0 md:border-r' : ''}
            md:last:border-r-0`}
        >
          <span className="font-syne font-extrabold text-prescript-green text-base leading-tight">
            {service.name}
          </span>
          <span className="font-sans text-xs text-gray-400 mt-1 leading-snug">
            {service.fullName}
          </span>
        </button>
      ))}
    </div>
  )
}
