import Link from 'next/link'
import { Instagram, Linkedin, Facebook } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { label: 'Imprint', href: '/services/imprint' },
      { label: 'Forge', href: '/services/forge' },
      { label: 'Surge', href: '/services/surge' },
      { label: 'Flow', href: '/services/flow' },
      { label: 'Cortex', href: '/services/cortex' },
    ],
  },
  {
    title: 'Software',
    links: [
      { label: 'PRESCRIPT IQ™', href: '/products/prescript-iq' },
      { label: 'PRESYNQ™', href: '/products/presynq' },
      { label: 'Compare products', href: '/products' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Work', href: '/work' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Articles', href: '/articles' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Track your project', href: '/track' },
    ],
  },
]

const SOCIALS = [
  { label: 'Instagram', href: COMPANY_INFO.instagram, icon: <Instagram size={18} aria-hidden="true" /> },
  { label: 'X (Twitter)', href: COMPANY_INFO.x, icon: <XIcon size={16} /> },
  { label: 'Facebook', href: COMPANY_INFO.facebook, icon: <Facebook size={18} aria-hidden="true" /> },
  { label: 'LinkedIn', href: COMPANY_INFO.linkedin, icon: <Linkedin size={18} aria-hidden="true" /> },
]

export default function Footer() {
  return (
    <footer className="bg-pd-oxblood text-pd-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
          <div>
            <Link href="/" aria-label="Prescript Digital home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/svg/stacked/prescript-stacked-cream-on-dark.svg" alt="Prescript Digital" width={192} height={96} className="h-24 w-auto" />
            </Link>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-pd-cream">Diagnose. Prescribe. Deliver.</p>
            <p className="mt-2 text-sm text-pd-paper/80">Lagos, Nigeria · serving Africa, America &amp; Europe</p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-pd-cream mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-pd-paper hover:text-pd-cream underline-offset-4 hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-pd-paper/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-pd-cream">© 2026 Prescript Digital Solutions Ltd</p>
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <Link key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="text-pd-paper hover:text-pd-cream transition-colors">
                {s.icon}
              </Link>
            ))}
            <Link
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-pd-paper hover:text-pd-cream transition-colors"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
