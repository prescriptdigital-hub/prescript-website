import Link from 'next/link'
import type { Service } from '@/lib/services'

interface ServiceHeroProps {
  service: Service
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <div className="mb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-sans text-gray-400 hover:text-prescript-green transition-colors mb-6"
      >
        ← Back to home
      </Link>

      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ backgroundColor: service.accentBg, color: service.accentText }}
        >
          {service.icon}
        </div>
        <div>
          <p className="text-xs font-sans text-gray-400 uppercase tracking-widest mb-1">
            Prescript · Service {service.seriesNum} of 05
            {service.isCoreService && (
              <span className="ml-2 bg-prescript-green-light text-prescript-green px-2 py-0.5 rounded-full text-xs normal-case tracking-normal">
                Our Core
              </span>
            )}
          </p>
          <h1 className="font-syne font-extrabold text-5xl lg:text-6xl tracking-tighter text-prescript-green leading-none">
            {service.name}
          </h1>
          <p className="text-sm font-sans text-gray-400 mt-1 mb-3">{service.fullName}</p>
        </div>
      </div>

      <p className="font-sans text-base text-gray-500 max-w-xl leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs font-sans uppercase tracking-widest text-gray-400">Starting from</p>
          <p className="font-sans font-medium text-prescript-green text-sm">{service.meta.from}</p>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-widest text-gray-400">Turnaround</p>
          <p className="font-sans font-medium text-prescript-green text-sm">{service.meta.turnaround}</p>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-widest text-gray-400">{service.meta.thirdLabel}</p>
          <p className="font-sans font-medium text-prescript-green text-sm">{service.meta.thirdValue}</p>
        </div>
      </div>
    </div>
  )
}
