'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IQ } from '@/lib/products'

const QUESTION = 'Why are my sales flat this quarter?'
const INSIGHTS = [
  { k: '62%', t: 'of leads never get a second follow-up' },
  { k: '3 days', t: 'average reply time to new enquiries' },
  { k: '1 channel', t: 'drives most sales, and it is under-funded' },
]
const PLAN = ['Reply to every lead within 1 hour', 'Add a 3-step follow-up sequence', 'Move budget to your best channel']

// Each scene step, in ms from loop start.
const TIMELINE = { typingDone: 1900, insights: 2300, plan: 4300, done: 6600, loop: 9800 }

export default function IQVisual() {
  const reduce = useReducedMotion()
  const [t, setT] = useState(reduce ? TIMELINE.done : 0)

  useEffect(() => {
    if (reduce) {
      setT(TIMELINE.done)
      return
    }
    const start = performance.now()
    const id = window.setInterval(() => {
      setT((performance.now() - start) % TIMELINE.loop)
    }, 60)
    return () => window.clearInterval(id)
  }, [reduce])

  const typed = QUESTION.slice(0, Math.floor((Math.min(t, TIMELINE.typingDone) / TIMELINE.typingDone) * QUESTION.length))
  const showInsights = t >= TIMELINE.insights
  const showPlan = t >= TIMELINE.plan
  const ticked = showPlan ? Math.min(PLAN.length, Math.floor((t - TIMELINE.plan) / 650)) : 0

  return (
    <div
      className="relative rounded-2xl border border-white/10 bg-[#0D0B1F]/90 shadow-[0_30px_80px_-20px_rgba(139,124,255,0.45)] overflow-hidden"
      role="img"
      aria-label={`PRESCRIPT IQ example: the question "${QUESTION}" becomes three insights and a three-step plan.`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-[11px] tracking-[0.18em] uppercase text-white/40 font-sans">Digital Doctor</span>
      </div>

      <div className="p-5 sm:p-6 min-h-[360px]" aria-hidden="true">
        <div className="flex items-start gap-3 mb-5">
          <span className="shrink-0 w-8 h-8 rounded-full bg-white/10 grid place-items-center text-xs text-white/70 font-sans">You</span>
          <p className="font-sans text-white text-[15px] leading-relaxed pt-1">
            {typed}
            {!reduce && t < TIMELINE.typingDone && <span className="inline-block w-[2px] h-4 align-middle ml-0.5 bg-white/80 animate-pulse" />}
          </p>
        </div>

        <AnimatePresence>
          {showInsights && (
            <motion.div key="insights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-5">
              <p className="text-[11px] tracking-[0.18em] uppercase font-sans mb-2" style={{ color: IQ.accent }}>What the evidence says</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {INSIGHTS.map((ins, i) => (
                  <motion.div
                    key={ins.k}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduce ? 0 : i * 0.35, duration: 0.4 }}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-3"
                  >
                    <p className="font-syne font-extrabold text-lg text-white">{ins.k}</p>
                    <p className="font-sans text-xs text-white/60 leading-snug">{ins.t}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPlan && (
            <motion.div key="plan" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] tracking-[0.18em] uppercase font-sans" style={{ color: IQ.accent }}>Your 30-day plan</p>
                <p className="text-[11px] font-sans text-white/50">{ticked}/{PLAN.length} approved</p>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 mb-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${IQ.accent}, #2EE6A6)` }}
                  animate={{ width: `${(ticked / PLAN.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <ul className="space-y-2">
                {PLAN.map((p, i) => {
                  const done = i < ticked
                  return (
                    <li key={p} className="flex items-center gap-3 rounded-lg border border-white/10 px-3 py-2.5">
                      <span
                        className="w-5 h-5 rounded-md grid place-items-center text-[11px] transition-colors"
                        style={{ background: done ? IQ.accent : 'transparent', border: `1.5px solid ${done ? IQ.accent : 'rgba(255,255,255,0.25)'}`, color: '#0D0B1F' }}
                      >
                        {done ? '✓' : ''}
                      </span>
                      <span className={`font-sans text-sm ${done ? 'text-white' : 'text-white/60'}`}>{p}</span>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
