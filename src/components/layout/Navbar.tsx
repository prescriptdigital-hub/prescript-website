'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import Button from '@/components/ui/Button'

const STUDIO = [
  { name: 'Imprint', full: 'Branding & Creative', href: '/services/imprint', icon: '✦', bg: '#FAEEDA', fg: '#633806' },
  { name: 'Forge', full: 'Digital & Tech Platforms', href: '/services/forge', icon: '◈', bg: '#E6F1FB', fg: '#0C447C' },
  { name: 'Surge', full: 'Digital Marketing', href: '/services/surge', icon: '◉', bg: '#E1F5EE', fg: '#085041' },
  { name: 'Flow', full: 'Business Automation', href: '/services/flow', icon: '⟳', bg: '#EEEDFE', fg: '#3C3489' },
  { name: 'Cortex', full: 'Agentic AI Deployment', href: '/services/cortex', icon: '◆', bg: '#E1F5EE', fg: '#085041' },
]

const STUDIO_EXTRAS = [
  { label: 'Packages & pricing', href: '/pricing' },
  { label: 'Monthly subscriptions', href: '/subscriptions' },
]

const SOFTWARE = [
  { name: 'PRESCRIPT IQ', tag: 'Think · Decide · Plan', href: '/products/prescript-iq', accent: '#8B7CFF', icon: '◎' },
  { name: 'PRESYNQ', tag: 'Connect · Automate · Execute', href: '/products/presynq', accent: '#1D9E75', icon: '⟳' },
]

const LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Articles', href: '/articles' },
  { label: 'About', href: '/about' },
]

type MenuId = 'studio' | 'software'

function normalize(path: string | null) {
  if (!path) return '/'
  return path.length > 1 ? path.replace(/\/$/, '') : path
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = normalize(usePathname())

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const studioActive = pathname.startsWith('/services')
  const softwareActive = pathname.startsWith('/products')

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${openMenu}"]`)?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [openMenu])

  const trigger = (id: MenuId, label: string, active: boolean, badge?: string) => (
    <button
      type="button"
      data-menu={id}
      aria-expanded={openMenu === id}
      aria-controls={`menu-${id}`}
      onClick={(e) => setOpenMenu((m) => (e.detail === 0 && m === id ? null : id))}
      className={clsx(
        'inline-flex items-center gap-1 text-sm font-sans whitespace-nowrap transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-prescript-green focus-visible:ring-offset-2',
        active || openMenu === id ? 'text-prescript-green' : 'text-gray-600 hover:text-prescript-green'
      )}
    >
      {label}
      {badge && (
        <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#EEEDFE] text-[#3C3489]">{badge}</span>
      )}
      <ChevronDown size={14} className={clsx('transition-transform', openMenu === id && 'rotate-180')} aria-hidden="true" />
    </button>
  )

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/prescriptcreatives_logo.png"
              alt="Prescript Digital Solutions"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="font-syne font-extrabold text-lg tracking-tight text-gray-900">
              PRESCRIPT<span className="text-prescript-green">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} aria-label="Main" className="hidden lg:flex items-center gap-6 xl:gap-8">
            {/* Studio */}
            <div className="relative" onMouseEnter={() => setOpenMenu('studio')} onMouseLeave={() => setOpenMenu(null)}>
              {trigger('studio', 'Studio', studioActive)}
              <AnimatePresence>
                {openMenu === 'studio' && (
                  <motion.div
                    id="menu-studio"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]"
                  >
                    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10 p-3">
                      <p className="px-3 pt-1 pb-2 text-[11px] font-sans font-medium tracking-widest uppercase text-gray-400">
                        Prescript Studio · Done for you
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {STUDIO.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className={clsx(
                              'flex items-center gap-3 rounded-xl p-3 transition-colors',
                              isActive(s.href) ? 'bg-prescript-green-light' : 'hover:bg-gray-50'
                            )}
                          >
                            <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-lg grid place-items-center text-base" style={{ background: s.bg, color: s.fg }}>
                              {s.icon}
                            </span>
                            <span>
                              <span className="block font-syne font-bold text-sm text-gray-900">{s.name}</span>
                              <span className="block font-sans text-xs text-gray-500">{s.full}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 flex gap-4 border-t border-gray-100 px-3 pt-3 pb-1">
                        {STUDIO_EXTRAS.map((e) => (
                          <Link key={e.href} href={e.href} className="font-sans text-xs font-medium text-prescript-green hover:underline">
                            {e.label} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Software */}
            <div className="relative" onMouseEnter={() => setOpenMenu('software')} onMouseLeave={() => setOpenMenu(null)}>
              {trigger('software', 'Software', softwareActive, 'New')}
              <AnimatePresence>
                {openMenu === 'software' && (
                  <motion.div
                    id="menu-software"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[400px]"
                  >
                    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10 p-3">
                      <p className="px-3 pt-1 pb-2 text-[11px] font-sans font-medium tracking-widest uppercase text-gray-400">
                        Prescript Software · Do it yourself
                      </p>
                      {SOFTWARE.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          className={clsx(
                            'flex items-center gap-3 rounded-xl p-3 transition-colors',
                            isActive(p.href) ? 'bg-gray-50' : 'hover:bg-gray-50'
                          )}
                        >
                          <span aria-hidden="true" className="w-9 h-9 shrink-0 rounded-lg grid place-items-center text-base text-white" style={{ background: p.accent }}>
                            {p.icon}
                          </span>
                          <span className="flex-1">
                            <span className="block font-syne font-bold text-sm text-gray-900">{p.name}</span>
                            <span className="block font-sans text-xs text-gray-500">{p.tag}</span>
                          </span>
                          <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">
                            Early access
                          </span>
                        </Link>
                      ))}
                      <div className="mt-2 border-t border-gray-100 px-3 pt-3 pb-1">
                        <Link href="/products" className="font-sans text-xs font-medium text-prescript-green hover:underline">
                          Compare both products →
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-sm font-sans whitespace-nowrap transition-colors',
                  isActive(link.href) ? 'text-prescript-green underline underline-offset-4' : 'text-gray-600 hover:text-prescript-green'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button variant="primary" size="sm" href="/contact">
                Book a Free Call
              </Button>
            </div>
            <button
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
            className="overflow-y-auto max-h-[calc(100svh-4rem)] border-t border-gray-100 lg:hidden"
          >
            <nav aria-label="Main" className="flex flex-col px-4 py-4 gap-5 bg-white">
              <div>
                <p className="px-3 mb-1 text-[11px] font-sans font-medium tracking-widest uppercase text-gray-400">Studio · Done for you</p>
                {STUDIO.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-sans transition-colors',
                      isActive(s.href) ? 'bg-prescript-green-light text-prescript-green font-medium' : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span aria-hidden="true" className="w-7 h-7 shrink-0 rounded-md grid place-items-center text-xs" style={{ background: s.bg, color: s.fg }}>{s.icon}</span>
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-gray-400">{s.full}</span>
                  </Link>
                ))}
                <div className="flex gap-4 px-3 pt-2">
                  {STUDIO_EXTRAS.map((e) => (
                    <Link key={e.href} href={e.href} onClick={() => setMobileOpen(false)} className="text-xs font-medium text-prescript-green">
                      {e.label} →
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="px-3 mb-1 text-[11px] font-sans font-medium tracking-widest uppercase text-gray-400">Software · Do it yourself</p>
                {SOFTWARE.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 py-2 px-3 rounded-lg text-sm font-sans transition-colors',
                      isActive(p.href) ? 'bg-gray-50 font-medium' : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <span aria-hidden="true" className="w-7 h-7 shrink-0 rounded-md grid place-items-center text-xs text-white" style={{ background: p.accent }}>{p.icon}</span>
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-gray-400">Early access</span>
                  </Link>
                ))}
                <Link href="/products" onClick={() => setMobileOpen(false)} className="block px-3 pt-2 text-xs font-medium text-prescript-green">
                  Compare both products →
                </Link>
              </div>

              <div className="border-t border-gray-100 pt-3">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block py-2 px-3 rounded-lg text-sm font-sans transition-colors',
                      isActive(link.href) ? 'text-prescript-green bg-prescript-green-light font-medium' : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Button variant="primary" size="md" href="/contact" className="w-full">
                Book a Free Call
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
