'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import ServiceStrip from './ServiceStrip'

const EASE = [0.2, 0.8, 0.2, 1] as const

export default function Hero() {
  const reduce = useReducedMotion()
  const fadeUp = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.08, duration: 0.5, ease: EASE },
  })

  return (
    <>
      <section className="pd-texture bg-pd-brick text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:py-24 grid lg:grid-cols-[56fr_44fr] gap-10 lg:gap-12 items-center">
          <motion.div {...fadeUp(0)} className="order-first lg:order-last flex justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/svg/mark/prescript-mark-hero-shadow-on-brick.svg"
              alt=""
              aria-hidden="true"
              width={440}
              height={440}
              className="w-[46%] lg:w-[80%] max-w-[440px] h-auto"
            />
          </motion.div>

          <div className="min-w-0">
            <motion.p {...fadeUp(1)} className="font-mono text-[12px] uppercase tracking-[0.1em] text-white mb-6">
              Diagnose. Prescribe. Deliver. · Nigeria · Africa · America · Europe
            </motion.p>
            <motion.h1
              {...fadeUp(2)}
              className="font-display font-light text-pd-cream text-[30px] sm:text-[44px] lg:text-[64px] leading-[1.02] tracking-tighter mb-6"
            >
              We build, automate &amp; deploy AI into businesses<span className="pd-dot pd-dot--cream" aria-hidden="true" />
            </motion.h1>
            <motion.p {...fadeUp(3)} className="text-white text-[15px] sm:text-lg leading-relaxed max-w-xl mb-9">
              Five focused services through Prescript Studio. Two AI products through Prescript Software. One precise
              prescription for your business, from brand identity to deployed AI agents.
            </motion.p>
            <motion.div {...fadeUp(4)} className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" size="md" href="/pricing" className="w-full sm:w-auto">
                See packages &amp; pricing
              </Button>
              <Link
                href="#services"
                className="inline-flex items-center justify-center font-sans font-semibold leading-none text-[15px] px-[20.5px] py-[12.5px] border-[1.5px] border-white text-white hover:bg-white hover:text-pd-brick-700 transition-colors duration-150"
              >
                Explore services
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceStrip />
      </div>
    </>
  )
}
