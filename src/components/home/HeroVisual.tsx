'use client'

import { motion } from 'framer-motion'

const nodes = [
  { cx: 55,  cy: 50,  r: 5,   delay: 0   },
  { cx: 160, cy: 30,  r: 4,   delay: 0.5 },
  { cx: 270, cy: 55,  r: 6,   delay: 1.0 },
  { cx: 100, cy: 120, r: 4,   delay: 0.3 },
  { cx: 210, cy: 110, r: 5,   delay: 0.8 },
  { cx: 330, cy: 130, r: 4,   delay: 0.6 },
  { cx: 60,  cy: 185, r: 4,   delay: 1.2 },
  { cx: 175, cy: 175, r: 5,   delay: 0.2 },
  { cx: 295, cy: 190, r: 4,   delay: 1.4 },
]

const edges: [number, number][] = [
  [0, 1], [1, 2], [1, 4], [2, 5],
  [0, 3], [3, 7], [4, 7], [4, 5],
  [5, 8], [6, 7], [7, 8],
]

const steps = [
  { label: 'Imprint',  desc: 'Brand identity deployed',   status: 'done'   },
  { label: 'Forge',    desc: 'Platform infrastructure up', status: 'done'   },
  { label: 'Surge',    desc: 'Campaigns running',          status: 'active' },
  { label: 'Flow',     desc: 'Automations executing',      status: 'active' },
  { label: 'Cortex',   desc: 'AI agents online',           status: 'queued' },
]

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      className="relative w-full max-w-md lg:max-w-lg mx-auto lg:mx-0"
    >
      {/* Glow backdrop */}
      <div className="absolute -inset-6 bg-prescript-green/10 rounded-3xl blur-3xl pointer-events-none" />

      {/* Card */}
      <div className="relative bg-gray-950 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">

        {/* ── Network animation section ── */}
        <div className="relative bg-gray-900 border-b border-gray-800" style={{ height: '230px' }}>

          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#1D9E75 1px, transparent 1px), linear-gradient(90deg, #1D9E75 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <svg
            className="absolute inset-0"
            width="100%"
            height="100%"
            viewBox="0 0 390 230"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Edge paths for particle travel */}
              {edges.map(([a, b], i) => (
                <path
                  key={`path-${i}`}
                  id={`edge-path-${i}`}
                  d={`M${nodes[a].cx},${nodes[a].cy} L${nodes[b].cx},${nodes[b].cy}`}
                  fill="none"
                />
              ))}
            </defs>

            {/* Edges */}
            {edges.map(([a, b], i) => (
              <line
                key={i}
                x1={nodes[a].cx} y1={nodes[a].cy}
                x2={nodes[b].cx} y2={nodes[b].cy}
                stroke="#1D9E75"
                strokeWidth="1.5"
                strokeOpacity="0.4"
                strokeDasharray="4 3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;-14"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>
            ))}

            {/* Traveling particles */}
            {edges.map(([, ], i) => (
              <circle
                key={`particle-${i}`}
                r="2.5"
                fill="#1D9E75"
                filter="url(#glow)"
              >
                <animateMotion
                  dur={`${1.8 + (i % 4) * 0.5}s`}
                  begin={`${(i * 0.3) % 2}s`}
                  repeatCount="indefinite"
                >
                  <mpath href={`#edge-path-${i}`} />
                </animateMotion>
              </circle>
            ))}

            {/* Pulse rings */}
            {nodes.map((n, i) => (
              <circle
                key={`ring-${i}`}
                cx={n.cx} cy={n.cy}
                r={n.r + 3}
                fill="none"
                stroke="#1D9E75"
                strokeWidth="1"
              >
                <animate
                  attributeName="r"
                  values={`${n.r + 2};${n.r + 12};${n.r + 2}`}
                  dur={`${2.5 + n.delay}s`}
                  begin={`${n.delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.7;0;0.7"
                  dur={`${2.5 + n.delay}s`}
                  begin={`${n.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Nodes */}
            {nodes.map((n, i) => (
              <circle
                key={i}
                cx={n.cx} cy={n.cy}
                r={n.r}
                fill="#1D9E75"
                filter="url(#glow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur={`${2 + n.delay}s`}
                  begin={`${n.delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </svg>

          {/* Corner label */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prescript-green opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-prescript-green" />
            </span>
            <span className="text-[10px] font-sans text-gray-400 uppercase tracking-widest">Live</span>
          </div>
        </div>

        {/* ── UI content ── */}
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prescript-green opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-prescript-green" />
              </span>
              <span className="text-xs font-sans font-medium text-gray-300 tracking-wide uppercase">
                System Active
              </span>
            </div>
            <span className="text-xs font-sans text-gray-600">v2.4.1</span>
          </div>

          {/* Pipeline steps */}
          <div className="flex flex-col gap-1.5">
            {steps.map((step, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-gray-900/80 border border-gray-800 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-sans text-gray-600 w-4">0{i + 1}</span>
                  <div>
                    <p className="text-xs font-sans font-medium text-gray-200">{step.label}</p>
                    <p className="text-[10px] font-sans text-gray-500">{step.desc}</p>
                  </div>
                </div>
                {step.status === 'done' && (
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-prescript-green/15 text-prescript-green border border-prescript-green/25">
                    Done
                  </span>
                )}
                {step.status === 'active' && (
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />
                    Running
                  </span>
                )}
                {step.status === 'queued' && (
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-500 border border-gray-700">
                    Queued
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Footer metrics */}
          <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-3 gap-2">
            {[
              { val: '99.9%', label: 'Uptime'   },
              { val: '2 AI',  label: 'Agents'   },
              { val: '14ms',  label: 'Latency'  },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <p className="text-sm font-syne font-bold text-prescript-green">{m.val}</p>
                <p className="text-[10px] font-sans text-gray-600">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
