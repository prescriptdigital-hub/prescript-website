'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Audience, Product } from '@/lib/products'

const LABELS: Record<Audience, string> = {
  individuals: 'For individuals',
  teams: 'For businesses & teams',
}

export default function AudienceUseCases({ product }: { product: Product }) {
  const [audience, setAudience] = useState<Audience>('teams')

  return (
    <div>
      <div
        className="inline-flex p-1 rounded-full border border-white/10 bg-white/[0.04] mb-8"
        role="tablist"
        aria-label="Who is this for"
      >
        {(Object.keys(LABELS) as Audience[]).map((a) => (
          <button
            key={a}
            type="button"
            role="tab"
            aria-selected={audience === a}
            onClick={() => setAudience(a)}
            className="relative px-4 sm:px-5 py-2 rounded-full text-sm font-sans font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            style={{ color: audience === a ? '#07110E' : 'rgba(255,255,255,0.7)' }}
          >
            {audience === a && (
              <motion.span
                layoutId={`aud-${product.slug}`}
                className="absolute inset-0 rounded-full"
                style={{ background: product.accent }}
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{LABELS[a]}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={audience}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {product.useCases[audience].map((u, i) => (
            <div key={u.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="font-syne font-extrabold text-sm" style={{ color: product.accent }}>
                0{i + 1}
              </span>
              <h3 className="font-syne font-bold text-lg text-white mt-2 mb-2">{u.title}</h3>
              <p className="font-sans font-light text-sm text-white/65 leading-relaxed">{u.body}</p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
