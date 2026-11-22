'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { SYNQ } from '@/lib/products'

const STEPS = [
  { kind: 'Trigger', title: 'New lead from website form', meta: 'Webhook' },
  { kind: 'AI agent', title: 'Qualify lead & draft a reply', meta: 'Draft only' },
  { kind: 'Approval', title: 'Team approves the message', meta: 'Human in the loop' },
]
const ACTIONS = ['Create deal in CRM', 'Send WhatsApp reply', 'Notify sales team']
const LOG = [
  '09:41:02  trigger.received  lead_8f2c',
  '09:41:03  ai.qualified      score=High',
  '09:41:03  approval.pending  sales',
  '09:41:47  approval.granted  by Ada',
  '09:41:48  crm.deal.created  ok',
  '09:41:48  whatsapp.sent     ok',
  '09:41:49  team.notified     ok',
  '09:41:49  run.completed     7 steps, 0 retries',
]

const STEP_MS = 1100
const LOOP_STEPS = STEPS.length + 2 + 3

export default function SynqVisual() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(reduce ? LOOP_STEPS : 0)

  useEffect(() => {
    if (reduce) {
      setStep(LOOP_STEPS)
      return
    }
    const id = window.setInterval(() => setStep((s) => (s + 1) % (LOOP_STEPS + 1)), STEP_MS)
    return () => window.clearInterval(id)
  }, [reduce])

  const approvalPending = step === 2
  const actionsLive = step >= STEPS.length
  const logLines = Math.min(LOG.length, Math.max(0, Math.round((step / (STEPS.length + 1)) * LOG.length)))

  return (
    <div
      className="relative rounded-2xl border border-white/10 bg-[#06140F]/90 shadow-[0_30px_80px_-20px_rgba(46,230,166,0.35)] overflow-hidden"
      role="img"
      aria-label="PRESYNQ example: a new lead is qualified by AI, approved by a person, then a CRM deal, a WhatsApp reply and a team notification run, all recorded in a run log."
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-pd-surface/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-pd-surface/15" />
        <span className="w-2.5 h-2.5 rounded-full bg-pd-surface/15" />
        <span className="ml-3 text-[11px] tracking-[0.18em] uppercase text-white/40 font-sans">Workflow · Lead response</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11px] font-sans" style={{ color: SYNQ.accent }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: SYNQ.accent }} />
          Live
        </span>
      </div>

      <div className="grid md:grid-cols-[1.25fr_1fr]" aria-hidden="true">
        <div className="p-5 sm:p-6">
          {STEPS.map((s, i) => {
            const active = step >= i
            const isApproval = s.kind === 'Approval'
            return (
              <div key={s.title}>
                <motion.div
                  animate={{ opacity: active ? 1 : 0.35, scale: step === i && !reduce ? 1.02 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border px-4 py-3"
                  style={{
                    borderColor: active ? SYNQ.accent + '80' : 'rgba(255,255,255,0.1)',
                    background: active ? SYNQ.accentSoft : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans" style={{ color: SYNQ.accent }}>{s.kind}</span>
                    <span className="text-[10px] font-sans text-white/40">{s.meta}</span>
                  </div>
                  <p className="font-sans text-sm text-white mt-1">{s.title}</p>
                  {isApproval && active && (
                    <p className="font-sans text-xs mt-1.5" style={{ color: approvalPending ? '#F5C66B' : SYNQ.accent }}>
                      {approvalPending ? '● Waiting for approval…' : '✓ Approved by Ada'}
                    </p>
                  )}
                </motion.div>
                <div className="h-5 ml-6 w-px relative overflow-hidden bg-pd-surface/10">
                  {active && !reduce && (
                    <motion.span
                      key={step}
                      className="absolute left-0 w-px h-3"
                      style={{ background: SYNQ.accent }}
                      initial={{ top: -12 }}
                      animate={{ top: 20 }}
                      transition={{ duration: 0.6, ease: 'easeIn' }}
                    />
                  )}
                </div>
              </div>
            )
          })}

          <div className="grid grid-cols-3 gap-2">
            {ACTIONS.map((a, i) => {
              const live = actionsLive && step >= STEPS.length + Math.min(i, 2)
              return (
                <motion.div
                  key={a}
                  animate={{ opacity: live ? 1 : 0.35, y: live && !reduce ? [4, 0] : 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-lg border px-2.5 py-2 text-center"
                  style={{ borderColor: live ? SYNQ.accent + '80' : 'rgba(255,255,255,0.1)' }}
                >
                  <p className="font-sans text-[11px] leading-tight text-white/85">{a}</p>
                  <p className="font-sans text-[10px] mt-1" style={{ color: live ? SYNQ.accent : 'rgba(255,255,255,0.3)' }}>
                    {live ? '✓ done' : 'queued'}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="border-t md:border-t-0 md:border-l border-white/10 bg-black/30 p-4 sm:p-5 font-mono text-[11px] leading-6">
          <p className="text-white/40 mb-2 font-sans text-[10px] tracking-[0.2em] uppercase">Run history</p>
          {LOG.slice(0, logLines).map((line) => (
            <motion.p
              key={line}
              initial={{ opacity: reduce ? 1 : 0, x: reduce ? 0 : -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: line.includes('approval.pending') ? '#F5C66B' : line.includes('completed') ? SYNQ.accent : 'rgba(255,255,255,0.7)' }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}
