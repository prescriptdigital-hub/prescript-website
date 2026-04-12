'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '5', label: 'Focused services', isNumeric: true, target: 5 },
  { value: '3', label: 'Continents served', isNumeric: true, target: 3 },
  { value: 'AI', label: 'At our core', isNumeric: false, target: 0 },
  { value: '24/7', label: 'Agent uptime', isNumeric: false, target: 0 },
]

function CountUp({ target, active }: { target: number; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = 0
    const duration = 1000
    const step = target / (duration / 16)

    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [active, target])

  return <>{count}</>
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="border-y border-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="flex flex-col items-start px-4 py-6 border-r last:border-r-0 border-b md:border-b-0 border-gray-100 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r"
          >
            <span className="font-syne font-extrabold text-3xl text-prescript-green leading-none">
              {stat.isNumeric ? (
                <CountUp target={stat.target} active={inView} />
              ) : (
                stat.value
              )}
            </span>
            <span className="font-sans text-xs text-gray-400 mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
