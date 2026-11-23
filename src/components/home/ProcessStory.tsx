'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import BrandMark from '@/components/brand/BrandMark'

const STEPS = [
  {
    n: '01',
    word: 'Diagnose',
    title: 'We start with the real problem.',
    body: 'A structured audit of your brand, platforms, marketing and operations. We find where time and money are leaking before we recommend anything.',
    part: 'The opening bracket',
  },
  {
    n: '02',
    word: 'Prescribe',
    title: 'One precise plan, not a menu.',
    body: 'We recommend exactly what your business needs, in the order it needs it, and explain why. Nothing you do not need.',
    part: 'The centre square',
  },
  {
    n: '03',
    word: 'Deliver',
    title: 'We build it, ship it and keep it running.',
    body: 'Our Studio team executes across Imprint, Forge, Surge, Flow and Cortex, then measures the results and keeps improving.',
    part: 'The closing bracket',
  },
]

const EASE = [0.2, 0.8, 0.2, 1] as const

function StaticStory() {
  return (
    <section className="bg-pd-paper py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <BrandMark ink="#3A1714" square="#C24E4E" className="w-48 lg:w-80 h-auto mx-auto" />
        <ol className="space-y-10">
          {STEPS.map((s) => (
            <li key={s.n}>
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-brick-700 mb-2">{s.n} — {s.word}</p>
              <h3 className="font-display font-light text-3xl text-pd-ink mb-2">{s.title}</h3>
              <p className="text-pd-muted leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function ProcessStory() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setStep(p < 0.34 ? 0 : p < 0.67 ? 1 : 2)
  })

  const leftX = useTransform(scrollYProgress, [0, 0.22], [-50, 0])
  const leftOpacity = useTransform(scrollYProgress, [0, 0.12], [0.08, 1])
  const squareY = useTransform(scrollYProgress, [0.36, 0.55], [-70, 0])
  const squareOpacity = useTransform(scrollYProgress, [0.36, 0.44], [0, 1])
  const rightX = useTransform(scrollYProgress, [0.69, 0.9], [50, 0])
  const rightOpacity = useTransform(scrollYProgress, [0.69, 0.78], [0.08, 1])
  const markScale = useTransform(scrollYProgress, [0.9, 1], [1, 1.06])
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  if (reduce) return <StaticStory />

  const s = STEPS[step]

  return (
    <section ref={ref} aria-label="How we work" className="relative bg-pd-paper h-[320vh]">
      <div className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-16 content-center lg:items-center">
          <div className="relative flex justify-center">
            <motion.div style={{ scale: markScale }} className="w-[56vw] max-w-[240px] lg:max-w-[460px] lg:w-full">
              <BrandMark
                ink="#3A1714"
                square="#C24E4E"
                className="w-full h-auto"
                label="The Prescript mark assembling: opening bracket, centre square, closing bracket"
                motionValues={{ leftX, leftOpacity, squareY, squareOpacity, rightX, rightOpacity }}
              />
            </motion.div>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-brick-700 mb-5">How we work</p>
            <ol className="flex gap-2 mb-8" aria-label="Steps">
              {STEPS.map((st, i) => (
                <li
                  key={st.n}
                  aria-current={i === step ? 'step' : undefined}
                  className={`font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.08em] px-2.5 py-1.5 border transition-colors duration-300 ${
                    i === step ? 'bg-pd-oxblood text-pd-cream border-pd-oxblood' : i < step ? 'border-pd-oxblood text-pd-oxblood' : 'border-pd-line text-pd-subtle'
                  }`}
                >
                  {st.n} {st.word}
                </li>
              ))}
            </ol>

            <div className="relative min-h-[260px] sm:min-h-[230px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <h2 className="font-display font-light text-pd-ink text-[34px] sm:text-[48px] lg:text-[56px] leading-[1.04] tracking-tighter mb-5">
                    {s.word}<span className="pd-dot pd-dot--brick" aria-hidden="true" />
                  </h2>
                  <p className="font-display text-xl sm:text-2xl text-pd-ink mb-3">{s.title}</p>
                  <p className="text-pd-muted leading-relaxed max-w-lg">{s.body}</p>
                  <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-pd-subtle">In the mark: {s.part}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 h-[3px] bg-pd-line overflow-hidden" aria-hidden="true">
              <motion.div className="h-full bg-pd-brick origin-left" style={{ scaleX: barScale }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
