'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SectionLabel from '@/components/ui/SectionLabel'
import MarketPill from '@/components/ui/MarketPill'
import { SERVICES } from '@/lib/services'
import { MARKET_PILLS } from '@/lib/constants'

const FROM_PRICE: Record<string, string> = {
  imprint: '$500',
  forge: '$800',
  surge: '$500/mo',
  flow: '$1,200',
  cortex: '$2,000',
}

export default function ServicesGrid() {
  const router = useRouter()

  return (
    <section id="services" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionLabel>Our services</SectionLabel>
      <h2 className="font-syne font-extrabold text-3xl lg:text-4xl tracking-tighter text-gray-900 mb-3">
        Five Services. One Partner.
      </h2>
      <p className="font-sans font-light text-gray-500 text-base max-w-2xl mb-6 leading-relaxed">
        From your first logo to your first AI agent — we handle every layer of your digital
        business, and each service feeds the next.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {MARKET_PILLS.map((p) => (
          <MarketPill key={p.label} flag={p.flag} label={p.label} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            onClick={() => router.push(`/services/${service.slug}`)}
            className="border border-gray-100 rounded-xl p-5 cursor-pointer hover:bg-gray-50 transition-colors flex flex-col gap-3"
          >
            {/* Icon */}
            <div
              className="w-[38px] h-[38px] rounded-lg flex items-center justify-center text-base flex-shrink-0"
              style={{ backgroundColor: service.accentBg, color: service.accentText }}
            >
              {service.icon}
            </div>

            {/* Name */}
            <div>
              <p className="font-syne font-extrabold text-prescript-green text-base leading-tight">
                {service.name}
              </p>
              <p className="font-sans text-sm text-gray-400 mt-0.5">{service.fullName}</p>
            </div>

            {/* Description */}
            <p className="font-sans text-sm text-gray-500 leading-relaxed flex-1">
              {service.description.slice(0, 110)}…
            </p>

            {/* From price */}
            <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-prescript-green-light text-prescript-green-dark">
              From {FROM_PRICE[service.slug]}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
