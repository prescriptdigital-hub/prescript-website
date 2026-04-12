'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface FAQItemProps {
  question: string
  answer: string
  isOpen?: boolean
  onToggle?: () => void
}

export default function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const [localOpen, setLocalOpen] = useState(false)
  const open = isOpen !== undefined ? isOpen : localOpen
  const toggle = onToggle ?? (() => setLocalOpen((v) => !v))

  return (
    <div className="border-b border-gray-100">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
        onClick={toggle}
        type="button"
      >
        <span className="font-sans font-medium text-sm text-gray-800 group-hover:text-prescript-green transition-colors">
          {question}
        </span>
        <span className="text-prescript-green text-lg leading-none flex-shrink-0 font-light">
          {open ? '−' : '+'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-gray-500 font-sans font-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
