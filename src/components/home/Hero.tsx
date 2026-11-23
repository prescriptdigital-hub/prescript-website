'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

const EASE = [0.2, 0.8, 0.2, 1] as const

const TILES = [
  { n: '01', name: 'Imprint', role: 'Branding & Creative', slug: 'imprint', cell: 'col-start-1 col-span-4 row-start-1 row-span-2', tone: 'bg-pd-oxblood text-pd-cream', from: { x: '-9%', y: '34%', rotate: -13 } },
  { n: '02', name: 'Forge', role: 'Digital & Tech Platforms', slug: 'forge', cell: 'col-start-5 col-span-2 row-start-1 row-span-4', tone: 'bg-pd-surface-2 text-pd-ink', from: { x: '-42%', y: '-12%', rotate: 16 } },
  { n: '03', name: 'Surge', role: 'Digital Marketing', slug: 'surge', cell: 'col-start-3 col-span-4 row-start-5 row-span-2', tone: 'bg-pd-ink text-pd-cream', from: { x: '7%', y: '-46%', rotate: 11 } },
  { n: '04', name: 'Flow', role: 'Business Automation', slug: 'flow', cell: 'col-start-1 col-span-2 row-start-3 row-span-4', tone: 'bg-pd-cream text-pd-oxblood', from: { x: '38%', y: '9%', rotate: -18 } },
  { n: '05', name: 'Cortex', role: 'Agentic AI', slug: 'cortex', cell: 'col-start-3 col-span-2 row-start-3 row-span-2', tone: 'bg-pd-brick text-white', from: { x: '70%', y: '-85%', rotate: 38 } },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: EASE },
  })

  return (
    <section className="bg-pd-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 lg:min-h-[calc(100svh-4rem)] grid lg:grid-cols-[1.08fr_1fr] gap-14 lg:gap-20 items-center">
        <div className="min-w-0">
          <motion.p {...rise(0)} className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-brick-700 mb-6">
            Diagnose. Prescribe. Deliver.
          </motion.p>
          <motion.h1
            {...rise(1)}
            className="font-display font-light text-pd-ink text-[40px] sm:text-[54px] lg:text-[58px] xl:text-[68px] leading-[1.02] tracking-tighter mb-7"
          >
            We build, automate &amp; deploy AI into businesses
            <span className="pd-dot pd-dot--brick" aria-hidden="true" />
          </motion.h1>
          <motion.p {...rise(2)} className="text-pd-muted text-base sm:text-lg leading-relaxed max-w-xl mb-9">
            Five services and two AI products, planned as one system. We find what your business needs, put it in order
            and keep it running.
          </motion.p>
          <motion.div {...rise(3)} className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" size="md" href="/contact">
              Book a free call
            </Button>
            <Button variant="outline" size="md" href="#services">
              Explore services
            </Button>
          </motion.div>
        </div>

        <nav aria-label="Our five services" className="w-full max-w-[540px] mx-auto lg:mr-0 aspect-square grid grid-cols-6 grid-rows-6 gap-2.5">
          {TILES.map((t, i) => (
            <motion.div
              key={t.slug}
              className={`${t.cell} min-w-0 min-h-0`}
              initial={reduce ? false : { ...t.from, opacity: 0.9 }}
              animate={{ x: '0%', y: '0%', rotate: 0, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.14, duration: 1.1, ease: EASE }}
            >
              <Link
                href={`/services/${t.slug}`}
                className={`${t.tone} group h-full flex flex-col justify-between p-3 sm:p-5 transition-opacity hover:opacity-90`}
              >
                <span className="flex items-center justify-between font-mono text-[11px] sm:text-[12px]">
                  {t.n}
                  <span aria-hidden="true" className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </span>
                <span>
                  <span className="block font-display text-lg sm:text-2xl leading-tight">{t.name}</span>
                  <span className="hidden sm:block text-[13px] leading-snug mt-1">{t.role}</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </section>
  )
}
