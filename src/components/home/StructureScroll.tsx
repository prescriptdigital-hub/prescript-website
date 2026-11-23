'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'

// x/y are offsets in % of a tile's own size while scattered.
const TILES = [
  { label: 'Logo', tone: 'bg-pd-oxblood text-pd-cream', x: -22, y: 28, r: -17 },
  { label: 'Website', tone: 'bg-pd-cream text-pd-oxblood', x: 96, y: -8, r: 14 },
  { label: 'Ads', tone: 'bg-pd-ink text-pd-cream', x: -88, y: 112, r: -24 },
  { label: 'Leads', tone: 'bg-pd-surface-2 text-pd-ink', x: 104, y: 88, r: 21 },
  { label: 'Your business', tone: 'bg-pd-brick text-white', x: -112, y: 96, r: -32 },
  { label: 'CRM', tone: 'bg-pd-oxblood text-pd-cream', x: 14, y: -84, r: 12 },
  { label: 'WhatsApp', tone: 'bg-pd-ink text-pd-cream', x: 18, y: -108, r: 18 },
  { label: 'Invoices', tone: 'bg-pd-surface-2 text-pd-ink', x: 92, y: 12, r: -13 },
  { label: 'Reports', tone: 'bg-pd-cream text-pd-oxblood', x: -104, y: -14, r: 26 },
]

function Tile({ tile, i, progress }: { tile: (typeof TILES)[number]; i: number; progress: MotionValue<number> }) {
  const start = 0.06 + i * 0.03
  const range = [start, start + 0.5]
  const x = useTransform(progress, range, [`${tile.x}%`, '0%'])
  const y = useTransform(progress, range, [`${tile.y}%`, '0%'])
  const rotate = useTransform(progress, range, [tile.r, 0])
  return (
    <motion.li
      style={{ x, y, rotate }}
      className={`${tile.tone} aspect-square flex items-end p-2.5 sm:p-4 font-display text-sm sm:text-lg leading-tight will-change-transform`}
    >
      {tile.label}
    </motion.li>
  )
}

export default function StructureScroll() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.0005 })

  return (
    <section ref={ref} aria-label="From scattered to structured" className="relative bg-pd-surface border-y border-pd-line motion-safe:h-[260vh]">
      <div className="motion-safe:sticky motion-safe:top-16 motion-safe:h-[calc(100svh-4rem)] overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-20 items-center content-center">
          <div className="relative z-10">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-brick-700 mb-4">The problem we solve</p>
            <h2 className="font-display font-light text-pd-ink text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-tighter">
              From scattered to structured
            </h2>
            <p className="mt-4 text-pd-muted sm:text-lg leading-relaxed max-w-md">
              A logo here, a website there, leads in three inboxes. We put the pieces in order so your business works as one system.
            </p>
          </div>
          <ul className="w-[62vw] max-w-[270px] sm:max-w-[380px] lg:max-w-[min(480px,62svh)] mx-auto grid grid-cols-3 gap-2 sm:gap-2.5">
            {TILES.map((t, i) =>
              reduce ? (
                <li key={t.label} className={`${t.tone} aspect-square flex items-end p-2.5 sm:p-4 font-display text-sm sm:text-lg leading-tight`}>
                  {t.label}
                </li>
              ) : (
                <Tile key={t.label} tile={t} i={i} progress={progress} />
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
