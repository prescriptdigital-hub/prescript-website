'use client'

import { motion } from 'framer-motion'

const nodes = [
  { cx: 40,  cy: 45,  r: 5,   delay: 0   },
  { cx: 120, cy: 25,  r: 4,   delay: 0.5 },
  { cx: 210, cy: 50,  r: 6,   delay: 1.0 },
  { cx: 75,  cy: 105, r: 4,   delay: 0.3 },
  { cx: 165, cy: 95,  r: 5,   delay: 0.8 },
  { cx: 240, cy: 120, r: 4,   delay: 0.6 },
  { cx: 45,  cy: 165, r: 4,   delay: 1.2 },
  { cx: 140, cy: 155, r: 5,   delay: 0.2 },
  { cx: 225, cy: 175, r: 4,   delay: 1.4 },
]

const edges: [number, number][] = [
  [0, 1], [1, 2], [1, 4], [2, 5],
  [0, 3], [3, 7], [4, 7], [4, 5],
  [5, 8], [6, 7], [7, 8],
]

const steps = [
  { label: 'Imprint',  desc: 'Brand identity',    status: 'done'   },
  { label: 'Forge',    desc: 'Platform infra',     status: 'done'   },
  { label: 'Surge',    desc: 'Campaigns live',     status: 'active' },
  { label: 'Flow',     desc: 'Automations on',     status: 'active' },
  { label: 'Cortex',   desc: 'AI agents ready',    status: 'queued' },
]

export default function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
      className="relative w-full mx-auto lg:mx-0"
    >
      {/* Glow */}
      <div className="absolute -inset-4 bg-prescript-green/10 rounded-3xl blur-2xl pointer-events-none" />

      {/* Card — side by side layout */}
      <div className="relative bg-gray-950 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl flex flex-row">

        {/* Left — animation panel */}
        <div className="relative bg-gray-900 border-r border-gray-800 flex-shrink-0 w-[300px]">
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#1D9E75 1px, transparent 1px), linear-gradient(90deg, #1D9E75 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          {/* Live badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prescript-green opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-prescript-green" />
            </span>
            <span className="text-[10px] font-sans text-gray-400 uppercase tracking-widest">Live</span>
          </div>

          <svg
            className="absolute inset-0"
            width="100%"
            height="100%"
            viewBox="0 0 270 210"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {edges.map(([a, b], i) => (
                <path
                  key={`path-${i}`}
                  id={`ep-${i}`}
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
                <animate attributeName="stroke-dashoffset" values="0;-14" dur="1.2s" repeatCount="indefinite" />
              </line>
            ))}

            {/* Traveling particles */}
            {edges.map(([,], i) => (
              <circle key={`p-${i}`} r="2.5" fill="#1D9E75" filter="url(#glow)">
                <animateMotion dur={`${1.8 + (i % 4) * 0.5}s`} begin={`${(i * 0.3) % 2}s`} repeatCount="indefinite">
                  <mpath href={`#ep-${i}`} />
                </animateMotion>
              </circle>
            ))}

            {/* Pulse rings */}
            {nodes.map((n, i) => (
              <circle key={`ring-${i}`} cx={n.cx} cy={n.cy} r={n.r + 3} fill="none" stroke="#1D9E75" strokeWidth="1">
                <animate attributeName="r" values={`${n.r + 2};${n.r + 11};${n.r + 2}`} dur={`${2.5 + n.delay}s`} begin={`${n.delay}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur={`${2.5 + n.delay}s`} begin={`${n.delay}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Nodes */}
            {nodes.map((n, i) => (
              <circle key={i} cx={n.cx} cy={n.cy} r={n.r} fill="#1D9E75" filter="url(#glow)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2 + n.delay}s`} begin={`${n.delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>

        {/* Right — pipeline + metrics */}
        <div className="flex-1 p-5 flex flex-col justify-between min-h-[260px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-prescript-green opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-prescript-green" />
              </span>
              <span className="text-[11px] font-sans font-medium text-gray-300 uppercase tracking-wide">
                System Active
              </span>
            </div>
            <span className="text-[10px] font-sans text-gray-600">v2.4.1</span>
          </div>

          {/* Pipeline steps */}
          <div className="flex flex-col gap-1 flex-1">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-2.5 py-1.5 bg-gray-900/70 border border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-sans text-gray-600 w-3">0{i + 1}</span>
                  <div>
                    <p className="text-[11px] font-sans font-medium text-gray-200 leading-none">{step.label}</p>
                    <p className="text-[9px] font-sans text-gray-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
                {step.status === 'done' && (
                  <span className="text-[9px] font-sans px-1.5 py-0.5 rounded-full bg-prescript-green/15 text-prescript-green border border-prescript-green/25">Done</span>
                )}
                {step.status === 'active' && (
                  <span className="text-[9px] font-sans px-1.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/25 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-blue-400 animate-pulse" />Run
                  </span>
                )}
                {step.status === 'queued' && (
                  <span className="text-[9px] font-sans px-1.5 py-0.5 rounded-full bg-gray-700/40 text-gray-500 border border-gray-700">Queue</span>
                )}
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="mt-3 pt-3 border-t border-gray-800 grid grid-cols-3 gap-1">
            {[
              { val: '99.9%', label: 'Uptime'  },
              { val: '2 AI',  label: 'Agents'  },
              { val: '14ms',  label: 'Latency' },
            ].map((m, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-syne font-bold text-prescript-green">{m.val}</p>
                <p className="text-[9px] font-sans text-gray-600">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
