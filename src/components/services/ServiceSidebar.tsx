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
      <div className="border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-2">Investment</p>
        <p className="font-syne font-extrabold text-4xl text-prescript-green leading-none mb-1">
          {service.investment.price}
        </p>
        <p className="text-sm font-sans text-gray-500 mb-5">{service.investment.note}</p>
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
      <div className="border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-3">
          Tools we use
        </p>
        <div className="flex flex-wrap gap-1.5">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="text-xs font-sans text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-3">
          What you walk away with
        </p>
        <ul className="flex flex-col gap-2">
          {service.results.map((r) => (
            <li key={r} className="flex items-start gap-2">
              <Check size={13} className="text-prescript-green flex-shrink-0 mt-0.5" />
              <span className="text-sm font-sans text-gray-600 leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next service */}
      <div className="border border-[1.5px] border-prescript-green rounded-xl p-5">
        <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-1">
          Next: pair with
        </p>
        <p className="font-syne font-bold text-prescript-green text-base mb-2">
          {service.nextService.name}
        </p>
        <p className="text-xs font-sans text-gray-500 leading-relaxed mb-4">
          {service.nextService.teaser}
        </p>
        <Link
          href={`/services/${service.nextService.slug}`}
          className="text-xs font-sans text-prescript-green hover:underline font-medium"
        >
          Explore {service.nextService.name} →
        </Link>
      </div>
    </div>
  )
}
