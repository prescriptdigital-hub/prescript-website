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
        className="inline-flex items-center gap-1.5 text-xs font-sans text-pd-subtle hover:text-pd-brick-700 transition-colors mb-6"
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
          <p className="text-xs font-sans text-pd-subtle uppercase tracking-widest mb-1">
            Prescript · Service {service.seriesNum} of 05
            {service.isCoreService && (
              <span className="ml-2 bg-pd-surface-2 text-pd-brick-700 px-2 py-0.5 text-xs normal-case tracking-normal">
                Our Core
              </span>
            )}
          </p>
          <h1 className="font-display font-light text-5xl lg:text-6xl tracking-tighter text-pd-brick-700 leading-none">
            {service.name}
          </h1>
          <p className="text-sm font-sans text-pd-subtle mt-1 mb-3">{service.fullName}</p>
        </div>
      </div>

      <p className="font-sans text-base text-pd-muted max-w-xl leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Meta row */}
      <div className="flex flex-wrap gap-6">
        <div>
          <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle">Starting from</p>
          <p className="font-sans font-medium text-pd-brick-700 text-sm">{service.meta.from}</p>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle">Turnaround</p>
          <p className="font-sans font-medium text-pd-brick-700 text-sm">{service.meta.turnaround}</p>
        </div>
        <div>
          <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle">{service.meta.thirdLabel}</p>
          <p className="font-sans font-medium text-pd-brick-700 text-sm">{service.meta.thirdValue}</p>
        </div>
      </div>
    </div>
  )
}
