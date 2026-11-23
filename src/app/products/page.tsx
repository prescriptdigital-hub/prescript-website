import type { Metadata } from 'next'
import Link from 'next/link'
import { IQ, SYNQ, PRODUCTS } from '@/lib/products'
import { ProductsShell, EarlyAccess } from '@/components/products/ProductPage'
import EcosystemScene from '@/components/products/EcosystemScene'
import Reveal from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Products | PRESCRIPT IQ & PRESYNQ by Prescript Digital',
  description:
    'Two AI products from Prescript Digital. PRESCRIPT IQ helps you think, decide and plan. PRESYNQ connects your tools and automates the work. Join early access.',
  alternates: { canonical: 'https://prescriptdigital.com/products/' },
  openGraph: {
    title: 'PRESCRIPT IQ & PRESYNQ',
    description: 'Think smarter with PRESCRIPT IQ. Execute consistently with PRESYNQ.',
    url: 'https://prescriptdigital.com/products/',
    type: 'website',
  },
}

const JOURNEY = [
  { n: '01', who: IQ, title: 'Ask & diagnose', body: 'Bring a question or a problem. IQ digs into the evidence and tells you what is really going on.' },
  { n: '02', who: IQ, title: 'Decide & approve', body: 'Choose the plan you believe in. Approved decisions and tasks are saved to your project.' },
  { n: '03', who: SYNQ, title: 'Connect & run', body: 'PRESYNQ links your tools and runs the work, pausing for your approval whenever it matters.' },
]

const AUDIENCES = [
  { title: 'Individuals & creators', body: 'Validate an idea, plan a launch and automate the busywork without hiring a team.', icon: '◐' },
  { title: 'Startups & SMEs', body: 'Diagnose growth problems and put sales, support and operations on reliable rails.', icon: '◑' },
  { title: 'Agencies & consultants', body: 'Run sharper client diagnostics and deliver automations across separate client workspaces.', icon: '◒' },
]

export default function ProductsPage() {
  return (
    <ProductsShell>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-10 max-w-7xl mx-auto">
        <div aria-hidden="true" className="absolute -top-32 left-[10%] w-[520px] h-[520px] rounded-full blur-3xl opacity-25" style={{ background: `radial-gradient(circle, ${IQ.accent}, transparent 65%)` }} />
        <div aria-hidden="true" className="absolute -top-24 right-[5%] w-[520px] h-[520px] rounded-full blur-3xl opacity-20" style={{ background: `radial-gradient(circle, ${SYNQ.accent}, transparent 65%)` }} />
        <div className="relative grid lg:grid-cols-[1fr_1.15fr] gap-10 items-center">
          <Reveal className="min-w-0">
            <p className="font-sans text-xs font-medium tracking-[0.22em] uppercase text-white/60 mb-4">Prescript Software · Early access</p>
            <h1 className="font-display font-light text-[2.15rem] sm:text-6xl lg:text-7xl tracking-tighter leading-[1.02] mb-6">
              Think smarter.
              <br />
              <span className="text-pd-cream">
                Execute consistently.
              </span>
            </h1>
            <p className="font-sans font-light text-lg text-white/70 leading-relaxed max-w-xl mb-8">
              Two AI products for anyone building a business, anywhere in the world. One helps you decide what to do. The other makes sure it gets done.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#early-access" className="rounded-xl px-6 py-3.5 font-sans font-semibold bg-pd-brick text-white hover:bg-pd-brick-700 hover:text-white transition-colors">
                Request early access
              </a>
              <a href="#products" className="rounded-xl px-6 py-3.5 font-sans font-medium border border-white/20 hover:bg-pd-surface/5">
                Meet the products
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="min-w-0">
            <EcosystemScene />
          </Reveal>
        </div>
      </section>

      {/* Product cards */}
      <section id="products" className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto scroll-mt-20">
        <div className="grid md:grid-cols-2 gap-5">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} className="min-w-0">
              <Link
                href={`/products/${p.slug}`}
                className="group relative block h-full rounded-3xl border border-white/10 bg-pd-surface/[0.03] p-6 sm:p-10 overflow-hidden transition-colors hover:border-white/30"
              >
                <div aria-hidden="true" className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20 group-hover:opacity-50 transition-opacity duration-700" style={{ background: p.accent }} />
                <p className="relative font-sans text-xs tracking-[0.22em] uppercase text-white/50 mb-3">{p.verb}</p>
                <h2 className="relative font-display font-light text-[1.7rem] sm:text-4xl tracking-tighter mb-3" style={{ color: p.accent }}>
                  {p.name}<sup className="font-sans font-normal text-xs ml-0.5">™</sup>
                </h2>
                <p className="relative font-sans text-lg text-white mb-6 max-w-md">{p.tagline}</p>
                <ul className="relative space-y-2 mb-8">
                  {p.modules.slice(0, 4).map((m) => (
                    <li key={m.name} className="flex items-center gap-3 font-sans text-sm text-white/70">
                      <span aria-hidden="true" className="w-6 h-6 rounded-md grid place-items-center text-xs" style={{ background: p.accentSoft, color: p.accent }}>{m.glyph}</span>
                      {m.name}
                    </li>
                  ))}
                </ul>
                <span className="relative inline-flex items-center gap-2 font-sans font-medium text-white group-hover:gap-3 transition-all">
                  Explore {p.name} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <p className="font-sans text-xs font-medium tracking-[0.22em] uppercase text-white/60 mb-3">From question to done</p>
          <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tighter mb-12 max-w-2xl">One journey, two products, no gaps.</h2>
        </Reveal>
        <div className="relative grid md:grid-cols-3 gap-5">
          <div aria-hidden="true" className="hidden md:block absolute top-7 left-[8%] right-[8%] h-px" style={{ background: 'rgba(247,244,236,0.2)' }} />
          {JOURNEY.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <div className="relative">
                <span className="relative z-10 w-14 h-14 rounded-2xl grid place-items-center font-display font-light text-pd-ink mb-5" style={{ background: s.who.accent }}>
                  {s.n}
                </span>
                <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: s.who.accent }}>{s.who.name}</p>
                <h3 className="font-display font-normal text-xl mb-2">{s.title}</h3>
                <p className="font-sans font-light text-sm text-white/65 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <p className="font-sans text-xs font-medium tracking-[0.22em] uppercase text-white/60 mb-3">Made for</p>
          <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tighter mb-10 max-w-2xl">From a solo founder in Lagos to a team in London.</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-4">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-pd-surface/[0.03] p-6">
                <span aria-hidden="true" className="text-3xl text-pd-cream">{a.icon}</span>
                <h3 className="font-display font-normal text-lg mt-3 mb-2">{a.title}</h3>
                <p className="font-sans font-light text-sm text-white/65 leading-relaxed">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="font-sans text-sm text-white/55 mt-10">
            Prefer it done for you? Our agency team still builds, markets and automates for clients.{' '}
            <Link href="/pricing" className="text-white underline underline-offset-4 hover:text-[#2EE6A6]">See agency services</Link>
          </p>
        </Reveal>
      </section>

      <EarlyAccess defaultProduct="Both" accent="#2EE6A6" />
    </ProductsShell>
  )
}
