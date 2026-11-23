'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

const PHOTOS = [
  { src: '/media/studio-team.webp', alt: 'Three colleagues reviewing printed website layouts at a table' },
  { src: '/media/studio-sketch.webp', alt: 'A hand drawing a process flow diagram in a notebook' },
]

export default function StudioPhotos() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 grid md:grid-cols-[1.6fr_1fr] gap-4">
      {PHOTOS.map((p) => (
        <div key={p.src} className="relative h-[260px] sm:h-[360px] lg:h-[460px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            style={reduce ? undefined : { y }}
            className="absolute inset-x-0 -top-[8%] w-full h-[116%] object-cover"
          />
        </div>
      ))}
    </div>
  )
}
