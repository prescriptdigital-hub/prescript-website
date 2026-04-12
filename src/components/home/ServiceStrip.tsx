'use client'

import { useRouter } from 'next/navigation'
import { SERVICES } from '@/lib/services'

export default function ServiceStrip() {
  const router = useRouter()

  return (
    <div className="border-t border-gray-100 grid grid-cols-5 min-w-0 overflow-x-auto">
      {SERVICES.map((service) => (
        <button
          key={service.slug}
          type="button"
          onClick={() => router.push(`/services/${service.slug}`)}
          className="flex flex-col items-start px-4 py-5 border-r last:border-r-0 border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors text-left min-w-[120px]"
        >
          <span className="font-syne font-extrabold text-prescript-green text-base leading-tight">
            {service.name}
          </span>
          <span className="font-sans font-light text-xs text-gray-400 mt-1 leading-snug">
            {service.fullName}
          </span>
        </button>
      ))}
    </div>
  )
}
