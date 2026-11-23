'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Button from '@/components/ui/Button'
import BrandMark from '@/components/brand/BrandMark'

const EASE = [0.2, 0.8, 0.2, 1] as const

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const markY = useTransform(scrollYProgress, [0, 1], [0, 160])
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, -12])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const textureY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 1.1 + i * 0.09, duration: 0.6, ease: EASE },
  })

  return (
    <section ref={ref} className="relative bg-pd-brick text-white overflow-hidden isolate">
      <motion.div
        aria-hidden="true"
        className="absolute -inset-x-0 -top-[10%] h-[130%] -z-10 opacity-70 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/brand/texture/prescript-weathered-texture-dark.svg')", y: reduce ? 0 : textureY }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100svh-4rem)] pt-10 pb-16 lg:py-20 grid lg:grid-cols-[56fr_44fr] gap-8 lg:gap-12 items-center">
        <motion.div
          className="order-first lg:order-last flex justify-center lg:justify-end"
          style={reduce ? undefined : { y: markY, scale: markScale, rotate: markRotate }}
        >
          <BrandMark shadow initialReveal={!reduce} className="w-[48%] lg:w-[88%] max-w-[460px] h-auto" label="" />
        </motion.div>

        <motion.div className="min-w-0" style={reduce ? undefined : { y: textY, opacity: textOpacity }}>
          <motion.p {...rise(0)} className="font-mono text-[12px] uppercase tracking-[0.1em] text-white mb-6">
            Diagnose. Prescribe. Deliver.
          </motion.p>
          <h1 className="font-display font-light text-pd-cream text-[34px] sm:text-[48px] lg:text-[54px] xl:text-[66px] leading-[1.02] tracking-tighter mb-6">
            {['We build, automate', '& deploy AI into', 'businesses'].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.95 + i * 0.12, duration: 0.8, ease: EASE }}
                >
                  {line}
                  {i === 2 && <span className="pd-dot pd-dot--cream" aria-hidden="true" />}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p {...rise(3)} className="text-white text-[15px] sm:text-lg leading-relaxed max-w-xl mb-9">
            Five focused services through Prescript Studio. Two AI products through Prescript Software. One precise
            prescription for your business, from brand identity to deployed AI agents.
          </motion.p>
          <motion.div {...rise(4)} className="flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" size="md" href="/contact" className="w-full sm:w-auto">
              Book a free call
            </Button>
            <Link
              href="#services"
              className="inline-flex items-center justify-center font-sans font-semibold leading-none text-[15px] px-[20.5px] py-[12.5px] border-[1.5px] border-white text-white hover:bg-white hover:text-pd-brick-700 transition-colors duration-150"
            >
              Explore services
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Scroll
        <motion.span
          className="block w-[7px] h-[7px] bg-pd-cream"
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
