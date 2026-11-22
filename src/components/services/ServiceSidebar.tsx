import Link from 'next/link'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import type { Service } from '@/lib/services'

interface ServiceSidebarProps {
  service: Service
}

export default function ServiceSidebar({ service }: ServiceSidebarProps) {
  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      {/* Investment */}
      <div className="border border-pd-line rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle mb-2">Investment</p>
        <p className="font-display font-light text-4xl text-pd-brick-700 leading-none mb-1">
          {service.investment.price}
        </p>
        <p className="text-sm font-sans text-pd-muted mb-5">{service.investment.note}</p>
        <div className="flex flex-col gap-2">
          <Button variant="primary" size="md" href="/contact" className="w-full">
            Start with {service.name}
          </Button>
          <Button variant="outline" size="md" href="/contact" className="w-full">
            Ask a question
          </Button>
        </div>
      </div>

      {/* Tools */}
      <div className="border border-pd-line rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle mb-3">
          Tools we use
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-sans text-pd-muted bg-pd-surface-2 px-2.5 py-1"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="border border-pd-line rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle mb-3">
          What you walk away with
        </p>
        <ul className="flex flex-col gap-2">
          {service.results.map((r) => (
            <li key={r} className="flex items-start gap-2">
              <Check size={13} className="text-pd-brick-700 flex-shrink-0 mt-0.5" />
              <span className="text-sm font-sans text-pd-muted leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next service */}
      <div className="border border-[1.5px] border-pd-brick-700 rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-pd-subtle mb-1">
          Next: pair with
        </p>
        <p className="font-display font-normal text-pd-brick-700 text-base mb-2">
          {service.nextService.name}
        </p>
        <p className="text-xs font-sans text-pd-muted leading-relaxed mb-4">
          {service.nextService.teaser}
        </p>
        <Link
          href={`/services/${service.nextService.slug}`}
          className="text-xs font-sans text-pd-brick-700 hover:underline font-medium"
        >
          Explore {service.nextService.name} →
        </Link>
      </div>
    </div>
  )
}
