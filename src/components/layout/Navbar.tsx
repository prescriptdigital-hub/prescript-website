'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import Button from '@/components/ui/Button'

const NAV_LINKS = [
  { label: 'Imprint', href: '/services/imprint' },
  { label: 'Forge', href: '/services/forge' },
  { label: 'Surge', href: '/services/surge' },
  { label: 'Flow', href: '/services/flow' },
  { label: 'Cortex', href: '/services/cortex' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Subscriptions', href: '/subscriptions' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-syne font-extrabold text-lg tracking-tight text-gray-900">
            PRESCRIPT<span className="text-prescript-green">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-sans transition-colors',
                  pathname === link.href
                    ? 'text-prescript-green underline underline-offset-4'
                    : 'text-gray-600 hover:text-prescript-green'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <Button variant="primary" size="sm" href="/contact">
                Book a Free Call
              </Button>
            </div>
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              type="button"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-gray-100 md:hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1 bg-white">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'py-2 px-3 rounded-lg text-sm font-sans transition-colors',
                    pathname === link.href
                      ? 'text-prescript-green bg-prescript-green-light font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  href="/contact"
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  Book a Free Call
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
