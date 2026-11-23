'use client'

import { motion, type MotionValue } from 'framer-motion'

// Official geometry from brand/design_handoff_prescript_brand/brand-assets/svg/mark/.
// Only the parts move; the artwork itself is never redrawn.
const LEFT = 'M0 12A12 12 0 0 1 12 0L63 0L63 27L27 27L27 100L0 100Z'
const RIGHT = 'M100 88A12 12 0 0 1 88 100L37 100L37 73L73 73L73 0L100 0Z'
const ROTATE = 'translate(72 72) rotate(-45) translate(-50 -50)'

type MV = MotionValue<number> | number

export interface BrandMarkMotion {
  leftX?: MV
  leftOpacity?: MV
  rightX?: MV
  rightOpacity?: MV
  squareY?: MV
  squareOpacity?: MV
}

export default function BrandMark({
  className,
  ink = '#EFEA8C',
  square = ink,
  shadow = false,
  motionValues = {},
  initialReveal = false,
  label = 'Prescript Digital mark',
}: {
  className?: string
  ink?: string
  square?: string
  shadow?: boolean
  motionValues?: BrandMarkMotion
  initialReveal?: boolean
  label?: string
}) {
  const m = motionValues
  const ease = [0.2, 0.8, 0.2, 1] as const
  const settle = [0.3, 1.4, 0.5, 1] as const

  return (
    <svg viewBox="0 0 144 144" className={className} role="img" aria-label={label}>
      {shadow && <rect x="22" y="34" width="88" height="88" fill="#3A1714" fillOpacity="0.32" />}
      <motion.g
        style={{ x: m.leftX ?? 0, opacity: m.leftOpacity ?? 1 }}
        initial={initialReveal ? { x: -46, opacity: 0 } : false}
        animate={initialReveal ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, ease }}
      >
        <path transform={ROTATE} d={LEFT} fill={ink} />
      </motion.g>
      <motion.g
        style={{ x: m.rightX ?? 0, opacity: m.rightOpacity ?? 1 }}
        initial={initialReveal ? { x: 46, opacity: 0 } : false}
        animate={initialReveal ? { x: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, ease }}
      >
        <path transform={ROTATE} d={RIGHT} fill={ink} />
      </motion.g>
      <motion.rect
        x="63"
        y="63"
        width="18"
        height="18"
        fill={square}
        style={{ y: m.squareY ?? 0, opacity: m.squareOpacity ?? 1 }}
        initial={initialReveal ? { y: -70, opacity: 0 } : false}
        animate={initialReveal ? { y: 0, opacity: 1 } : undefined}
        transition={{ delay: 0.9, duration: 0.45, ease: settle }}
      />
    </svg>
  )
}
