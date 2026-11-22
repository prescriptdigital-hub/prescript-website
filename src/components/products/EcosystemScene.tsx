'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { IQ, SYNQ } from '@/lib/products'

const IQ_CENTER = { x: 165, y: 215 }
const IQ_NODES = [
  { x: 165, y: 92, label: 'Diagnose' },
  { x: 268, y: 150 },
  { x: 268, y: 282, label: 'Decide' },
  { x: 165, y: 340 },
  { x: 62, y: 282, label: 'Plan' },
  { x: 62, y: 150 },
]

const HUB = { x: 515, y: 215 }
const APPS = [
  { id: 'crm', x: 430, y: 110, label: 'CRM' },
  { id: 'mail', x: 600, y: 110, label: 'Email' },
  { id: 'chat', x: 430, y: 320, label: 'Chat' },
  { id: 'cal', x: 600, y: 320, label: 'Calendar' },
]

function AppIcon({ id }: { id: string }) {
  const stroke = SYNQ.accent
  if (id === 'mail')
    return (
      <g stroke={stroke} strokeWidth="1.6" fill="none">
        <rect x="-10" y="-7" width="20" height="14" rx="2" />
        <path d="M-10 -6 L0 2 L10 -6" />
      </g>
    )
  if (id === 'chat')
    return (
      <g stroke={stroke} strokeWidth="1.6" fill="none">
        <path d="M-10 -7 h20 v11 h-12 l-5 5 v-5 h-3 z" strokeLinejoin="round" />
      </g>
    )
  if (id === 'cal')
    return (
      <g stroke={stroke} strokeWidth="1.6" fill="none">
        <rect x="-9" y="-8" width="18" height="16" rx="2" />
        <path d="M-9 -3 h18 M-4 -11 v5 M4 -11 v5" />
      </g>
    )
  return (
    <g stroke={stroke} strokeWidth="1.6" fill="none">
      <circle cx="-3" cy="-3" r="4" />
      <path d="M-10 9 c1 -6 13 -6 14 0 M5 -6 h6 M5 -1 h6 M7 4 h4" />
    </g>
  )
}

export default function EcosystemScene() {
  const reduce = useReducedMotion()

  return (
    <div className="relative w-full" role="img" aria-label="PRESCRIPT IQ turns questions into an approved plan, which PRESYNQ then runs across connected business apps.">
      <svg viewBox="0 0 680 430" className="w-full h-auto" aria-hidden="true">
        <defs>
          <radialGradient id="glowIq" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={IQ.accent} stopOpacity="0.45" />
            <stop offset="100%" stopColor={IQ.accent} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glowSynq" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={SYNQ.accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={SYNQ.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="beam" x1="0" x2="1">
            <stop offset="0%" stopColor={IQ.accent} />
            <stop offset="100%" stopColor={SYNQ.accent} />
          </linearGradient>
          <path id="bridgePath" d={`M ${IQ_CENTER.x + 34} ${IQ_CENTER.y} C 300 150, 390 150, ${HUB.x - 34} ${HUB.y}`} />
          {APPS.map((a) => (
            <path key={a.id} id={`flow-${a.id}`} d={`M ${HUB.x} ${HUB.y} L ${a.x} ${a.y}`} />
          ))}
        </defs>

        <circle cx={IQ_CENTER.x} cy={IQ_CENTER.y} r="150" fill="url(#glowIq)" />
        <circle cx={HUB.x} cy={HUB.y} r="150" fill="url(#glowSynq)" />

        {/* IQ: a network of thoughts converging on a decision */}
        {IQ_NODES.map((n, i) => (
          <motion.line
            key={`l-${i}`}
            x1={IQ_CENTER.x} y1={IQ_CENTER.y} x2={n.x} y2={n.y}
            stroke={IQ.accent} strokeOpacity="0.5" strokeWidth="1.2"
            initial={{ pathLength: reduce ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
          />
        ))}
        {IQ_NODES.map((n, i) => {
          const next = IQ_NODES[(i + 1) % IQ_NODES.length]
          return (
            <motion.line
              key={`r-${i}`}
              x1={n.x} y1={n.y} x2={next.x} y2={next.y}
              stroke={IQ.accent} strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 5"
              initial={{ opacity: reduce ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 + i * 0.08 }}
            />
          )
        })}
        {IQ_NODES.map((n, i) => (
          <g key={`n-${i}`}>
            <motion.circle
              cx={n.x} cy={n.y} r="7" fill="#0B1411" stroke={IQ.accent} strokeWidth="2"
              initial={{ scale: reduce ? 1 : 0 }}
              animate={reduce ? { scale: 1 } : { scale: [1, 1.18, 1] }}
              transition={reduce ? undefined : { duration: 2.4, delay: 0.4 + i * 0.3, repeat: Infinity, repeatDelay: 1.2 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            />
            {n.label && (
              <text x={n.x} y={n.y + (n.y < IQ_CENTER.y ? -16 : 24)} textAnchor="middle" fill="#C9C3FF" fontSize="11" fontFamily="var(--font-dm-sans)" letterSpacing="0.08em">
                {n.label.toUpperCase()}
              </text>
            )}
          </g>
        ))}
        <circle cx={IQ_CENTER.x} cy={IQ_CENTER.y} r="34" fill="#120F2A" stroke={IQ.accent} strokeWidth="2" />
        <text x={IQ_CENTER.x} y={IQ_CENTER.y + 6} textAnchor="middle" fill="#fff" fontSize="18" fontWeight="800" fontFamily="var(--font-syne)">IQ</text>

        {/* Bridge: the approved plan travels from IQ to PRESYNQ */}
        <use href="#bridgePath" stroke="url(#beam)" strokeOpacity="0.55" strokeWidth="1.5" fill="none" strokeDasharray="4 6" />
        {!reduce && (
          <g>
            <rect x="-15" y="-19" width="30" height="38" rx="4" fill="#0B1411" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.4" />
            <path d="M-8 -9 h16 M-8 -2 h16 M-8 5 h10" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.4" />
            <circle cx="9" cy="12" r="6" fill={SYNQ.accent} />
            <path d="M6 12 l2 2 l4 -4" stroke="#07110E" strokeWidth="1.6" fill="none" />
            <animateMotion dur="4.5s" repeatCount="indefinite" rotate="0" keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear">
              <mpath href="#bridgePath" />
            </animateMotion>
            <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.08;0.62;0.72;1" dur="4.5s" repeatCount="indefinite" />
          </g>
        )}
        <text x="340" y="132" textAnchor="middle" fill="#E8F7F1" fillOpacity="0.75" fontSize="11" fontFamily="var(--font-dm-sans)" letterSpacing="0.12em">
          APPROVED PLAN
        </text>

        {/* PRESYNQ: a hub running work across connected apps */}
        {APPS.map((a) => (
          <use key={`f-${a.id}`} href={`#flow-${a.id}`} stroke={SYNQ.accent} strokeOpacity="0.35" strokeWidth="1.4" />
        ))}
        {!reduce &&
          APPS.map((a, i) => (
            <circle key={`p-${a.id}`} r="4" fill={SYNQ.accent}>
              <animateMotion dur="2.2s" begin={`${0.4 + i * 0.55}s`} repeatCount="indefinite">
                <mpath href={`#flow-${a.id}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.8;1" dur="2.2s" begin={`${0.4 + i * 0.55}s`} repeatCount="indefinite" />
            </circle>
          ))}
        {APPS.map((a, i) => (
          <motion.g
            key={`a-${a.id}`}
            initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
          >
            <rect x={a.x - 24} y={a.y - 24} width="48" height="48" rx="12" fill="#0B1411" stroke={SYNQ.accent} strokeOpacity="0.6" strokeWidth="1.4" />
            <g transform={`translate(${a.x} ${a.y})`}>
              <AppIcon id={a.id} />
            </g>
            <text x={a.x} y={a.y + (a.y < HUB.y ? -34 : 44)} textAnchor="middle" fill="#BDF5E2" fontSize="11" fontFamily="var(--font-dm-sans)" letterSpacing="0.08em">
              {a.label.toUpperCase()}
            </text>
          </motion.g>
        ))}
        <circle cx={HUB.x} cy={HUB.y} r="34" fill="#06201A" stroke={SYNQ.accent} strokeWidth="2" />
        {!reduce && (
          <circle cx={HUB.x} cy={HUB.y} r="34" fill="none" stroke={SYNQ.accent} strokeWidth="1.5">
            <animate attributeName="r" values="34;60" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0" dur="2.4s" repeatCount="indefinite" />
          </circle>
        )}
        <text x={HUB.x} y={HUB.y + 5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="var(--font-syne)" letterSpacing="0.02em">SYNQ</text>
      </svg>
    </div>
  )
}
