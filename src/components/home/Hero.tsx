'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import ServiceStrip from './ServiceStrip'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
}

export default function Hero() {
  return (
    <section className="pt-16 pb-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl">
        {/* Chip */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-prescript-green" />
          <span className="text-sm font-sans text-gray-500">
            Nigeria · Africa · America · Europe
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-syne font-extrabold text-4xl lg:text-6xl tracking-tighter text-gray-900 leading-tight mb-5"
        >
          We Build, Automate &<br />
          Deploy{' '}
          <span className="text-prescript-green">AI</span>{' '}
          Into Businesses
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-sans text-gray-500 text-lg lg:text-xl max-w-xl leading-relaxed mb-8"
        >
          Five focused services. One integrated system. Prescript delivers the full digital
          infrastructure your business needs to scale globally — from brand identity to deployed AI
          agents.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 mb-12"
        >
          <Button variant="primary" size="lg" href="/pricing">
            See Packages &amp; Pricing
          </Button>
          <Button variant="outline" size="lg" href="#services">
            Explore Services
          </Button>
        </motion.div>
      </div>

      {/* Service strip */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
      >
        <ServiceStrip />
      </motion.div>
    </section>
  )
}
