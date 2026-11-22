'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import Button from '@/components/ui/Button'

const STUDIO = [
  { n: '01', name: 'Imprint', full: 'Branding & Creative', href: '/services/imprint' },
  { n: '02', name: 'Forge', full: 'Digital & Tech Platforms', href: '/services/forge' },
  { n: '03', name: 'Surge', full: 'Digital Marketing', href: '/services/surge' },
  { n: '04', name: 'Flow', full: 'Business Automation', href: '/services/flow' },
  { n: '05', name: 'Cortex', full: 'Agentic AI Deployment', href: '/services/cortex' },
]

const STUDIO_EXTRAS = [
  { label: 'Packages & pricing', href: '/pricing' },
  { label: 'Monthly subscriptions', href: '/subscriptions' },
]

const SOFTWARE = [
  { name: 'PRESCRIPT IQ™', tag: 'Think · Decide · Plan', href: '/products/prescript-iq', square: 'bg-pd-iq' },
  { name: 'PRESYNQ™', tag: 'Connect · Automate · Execute', href: '/products/presynq', square: 'bg-pd-synq' },
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

function ActiveSquare() {
  return <span aria-hidden="true" className="inline-block w-[5px] h-[5px] bg-pd-brick mr-2 align-middle" />
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
        'inline-flex items-center gap-1 text-sm font-sans whitespace-nowrap transition-colors',
        active || openMenu === id ? 'text-pd-brick-700' : 'text-pd-ink hover:text-pd-brick-700'
      )}
    >
      {active && <ActiveSquare />}
      {label}
      {badge && (
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 bg-pd-oxblood text-pd-cream">{badge}</span>
      )}
      <ChevronDown size={14} className={clsx('transition-transform', openMenu === id && 'rotate-180')} aria-hidden="true" />
    </button>
  )

  return (
    <header className="sticky top-0 z-50 bg-pd-paper border-b border-pd-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Prescript Digital home" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/svg/horizontal/prescript-horizontal-dark-on-cream.svg" alt="Prescript Digital" width={178} height={30} className="hidden sm:block h-[30px] w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/svg/mark/prescript-mark-dark-on-cream.svg" alt="Prescript Digital" width={32} height={32} className="sm:hidden h-8 w-8" />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden lg:flex items-center gap-7">
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
                    <div className="border border-pd-line bg-pd-surface p-3">
                      <p className="px-3 pt-1 pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-pd-brick-700">
                        Prescript Studio · Done for you
                      </p>
                      <div className="grid grid-cols-2 gap-px bg-pd-line border border-pd-line">
                        {STUDIO.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className={clsx(
                              'flex items-center gap-3 p-3 transition-colors',
                              isActive(s.href) ? 'bg-pd-surface-2' : 'bg-pd-surface hover:bg-pd-paper'
                            )}
                          >
                            <span className="font-mono text-xs text-pd-brick-700 w-6">{s.n}</span>
                            <span>
                              <span className="flex items-center font-display text-base text-pd-ink lowercase">
                                {s.name}
                                <span aria-hidden="true" className="inline-block w-[5px] h-[5px] bg-pd-brick ml-1 self-end mb-[5px]" />
                              </span>
                              <span className="block font-sans text-xs text-pd-subtle">{s.full}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-5 px-3 pb-1">
                        {STUDIO_EXTRAS.map((e) => (
                          <Link key={e.href} href={e.href} className="font-mono text-[12px] uppercase tracking-[0.08em] text-pd-brick-700 hover:text-pd-oxblood">
                            {e.label} →
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                    <div className="border border-pd-line bg-pd-surface p-3">
                      <p className="px-3 pt-1 pb-2 font-mono text-[11px] uppercase tracking-[0.1em] text-pd-brick-700">
                        Prescript Software · Do it yourself
                      </p>
                      {SOFTWARE.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          className={clsx(
                            'flex items-center gap-3 p-3 transition-colors',
                            isActive(p.href) ? 'bg-pd-surface-2' : 'hover:bg-pd-paper'
                          )}
                        >
                          <span aria-hidden="true" className="w-9 h-9 shrink-0 bg-pd-ink grid place-items-center">
                            <span className={clsx('w-3 h-3', p.square)} />
                          </span>
                          <span className="flex-1">
                            <span className="block font-display text-base text-pd-ink">{p.name}</span>
                            <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-pd-subtle">{p.tag}</span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-pd-subtle border border-pd-line px-2 py-0.5">
                            Early access
                          </span>
                        </Link>
                      ))}
                      <div className="mt-2 border-t border-pd-line px-3 pt-3 pb-1">
                        <Link href="/products" className="font-mono text-[12px] uppercase tracking-[0.08em] text-pd-brick-700 hover:text-pd-oxblood">
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
                  isActive(link.href) ? 'text-pd-brick-700' : 'text-pd-ink hover:text-pd-brick-700'
                )}
              >
                {isActive(link.href) && <ActiveSquare />}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button variant="secondary" size="sm" href="/contact">
                Book a Free Call
              </Button>
            </div>
            <button
              className="lg:hidden p-2 text-pd-ink"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              type="button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-y-auto max-h-[calc(100svh-4rem)] border-t border-pd-line lg:hidden"
          >
            <nav aria-label="Main" className="flex flex-col px-4 py-4 gap-5 bg-pd-paper">
              <div>
                <p className="px-3 mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-pd-brick-700">Studio · Done for you</p>
                {STUDIO.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 py-2.5 px-3 text-sm font-sans transition-colors',
                      isActive(s.href) ? 'bg-pd-surface-2 text-pd-ink' : 'text-pd-ink hover:bg-pd-surface'
                    )}
                  >
                    <span className="font-mono text-xs text-pd-brick-700 w-6">{s.n}</span>
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-pd-subtle">{s.full}</span>
                  </Link>
                ))}
                <div className="flex flex-wrap gap-x-5 gap-y-2 px-3 pt-2">
                  {STUDIO_EXTRAS.map((e) => (
                    <Link key={e.href} href={e.href} onClick={() => setMobileOpen(false)} className="font-mono text-[12px] uppercase tracking-[0.08em] text-pd-brick-700">
                      {e.label} →
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="px-3 mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-pd-brick-700">Software · Do it yourself</p>
                {SOFTWARE.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 py-2.5 px-3 text-sm font-sans transition-colors',
                      isActive(p.href) ? 'bg-pd-surface-2 text-pd-ink' : 'text-pd-ink hover:bg-pd-surface'
                    )}
                  >
                    <span aria-hidden="true" className="w-6 h-6 shrink-0 bg-pd-ink grid place-items-center"><span className={clsx('w-2 h-2', p.square)} /></span>
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.08em] text-pd-subtle">Early access</span>
                  </Link>
                ))}
                <Link href="/products" onClick={() => setMobileOpen(false)} className="block px-3 pt-2 font-mono text-[12px] uppercase tracking-[0.08em] text-pd-brick-700">
                  Compare both products →
                </Link>
              </div>

              <div className="border-t border-pd-line pt-3">
                {LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block py-2.5 px-3 text-sm font-sans transition-colors',
                      isActive(link.href) ? 'text-pd-brick-700 bg-pd-surface-2 font-medium' : 'text-pd-ink hover:bg-pd-surface'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Button variant="secondary" size="md" href="/contact" className="w-full">
                Book a Free Call
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
