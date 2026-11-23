'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { SERVICES } from '@/lib/services'

function ServiceCard({ i }: { i: number }) {
  const s = SERVICES[i]
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group relative flex flex-col justify-between shrink-0 w-[82vw] sm:w-[440px] lg:w-[480px] h-[460px] sm:h-[500px] snap-start border border-pd-cream/15 bg-pd-ink/40 p-7 sm:p-9 transition-colors duration-300 hover:bg-pd-brick hover:border-pd-brick"
    >
      <span
        aria-hidden="true"
        className="absolute top-4 right-6 font-display font-light text-[120px] sm:text-[150px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(239,234,140,0.28)] group-hover:[-webkit-text-stroke:1px_rgba(239,234,140,0.6)] transition-all"
      >
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="relative">
        <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-cream/80">{String(i + 1).padStart(2, '0')} — {s.fullName}</p>
        <h3 className="mt-28 sm:mt-32 font-display font-light text-pd-cream text-[44px] sm:text-[56px] leading-none lowercase">
          {s.name}<span className="pd-dot pd-dot--brick group-hover:bg-pd-cream" aria-hidden="true" />
        </h3>
        <p className="mt-4 text-pd-paper/90 leading-relaxed">{s.tagline}</p>
      </div>
      <div className="relative">
        <ul className="space-y-1.5 mb-6">
          {s.deliverables.slice(0, 3).map((d) => (
            <li key={d.title} className="flex items-center gap-2.5 text-sm text-pd-paper">
              <span aria-hidden="true" className="w-1.5 h-1.5 bg-pd-cream shrink-0" />
              {d.title}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-pd-cream/15 pt-4">
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-pd-cream">{s.meta.from.startsWith('$') ? `From ${s.meta.from}` : 'Enterprise · contact us'}</span>
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-pd-cream group-hover:translate-x-1 transition-transform">Explore →</span>
        </div>
      </div>
    </Link>
  )
}

function Intro() {
  return (
    <div className="shrink-0 w-[82vw] sm:w-[380px] lg:w-[420px] flex flex-col justify-center pr-4">
      <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-cream/80 mb-5">Prescript Studio · Done for you</p>
      <h2 className="font-display font-light text-pd-cream text-[40px] sm:text-[52px] leading-[1.03] tracking-tighter">
        Five services. One prescription<span className="pd-dot pd-dot--brick" aria-hidden="true" />
      </h2>
      <p className="mt-5 text-pd-paper/90 leading-relaxed max-w-sm">
        From your first logo to your first AI agent. Each service feeds the next, so nothing gets built in isolation.
      </p>
      <p className="mt-8 hidden lg:block font-mono text-[11px] uppercase tracking-[0.14em] text-pd-cream/70">Keep scrolling →</p>
    </div>
  )
}

export default function ServicesShowcase() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [desktop, setDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const measure = () => {
      setDesktop(mq.matches)
      const track = trackRef.current
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    mq.addEventListener('change', measure)
    return () => {
      window.removeEventListener('resize', measure)
      mq.removeEventListener('change', measure)
    }
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
  }, [desktop])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  const pinned = desktop && !reduce && distance > 0

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Services"
      className="relative bg-pd-oxblood scroll-mt-16"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={pinned ? 'sticky top-16 h-[calc(100svh-4rem)] flex items-center overflow-hidden' : 'py-20'}>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? 'flex gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-16'
              : 'flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-4 [scrollbar-width:thin]'
          }
        >
          <Intro />
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.slug} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
