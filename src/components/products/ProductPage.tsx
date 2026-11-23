import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { IQ, SYNQ, type Product } from '@/lib/products'
import Reveal from '@/components/ui/Reveal'
import AudienceUseCases from './AudienceUseCases'
import WaitlistForm from './WaitlistForm'

function Eyebrow({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p className="font-sans text-xs font-medium tracking-[0.22em] uppercase mb-3" style={{ color }}>
      {children}
    </p>
  )
}

export function ProductsShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="relative bg-pd-ink text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)',
          }}
        />
        {children}
      </main>
      <Footer />
    </>
  )
}

export function EarlyAccess({ defaultProduct, accent }: { defaultProduct?: 'PRESCRIPT IQ' | 'PRESYNQ' | 'Both'; accent: string }) {
  return (
    <section id="early-access" className="relative px-4 sm:px-6 lg:px-8 py-20 scroll-mt-20">
      <Reveal className="max-w-3xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 sm:p-10">
        <Eyebrow color={accent}>Early access</Eyebrow>
        <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tighter mb-3">Be first in line.</h2>
        <p className="font-sans font-light text-white/65 mb-8">
          We&apos;re opening access in stages to individuals and businesses worldwide. Tell us who you are and we&apos;ll invite you as places open.
        </p>
        <WaitlistForm defaultProduct={defaultProduct} />
      </Reveal>
    </section>
  )
}

export default function ProductPage({ product, visual }: { product: Product; visual: React.ReactNode }) {
  const other = product.slug === 'prescript-iq' ? SYNQ : IQ

  return (
    <ProductsShell>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 max-w-7xl mx-auto">
        <div
          aria-hidden="true"
          className="absolute -top-40 right-0 w-[640px] h-[640px] rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${product.accent}, transparent 65%)` }}
        />
        <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <Reveal className="min-w-0">
            <Link href="/products" className="inline-flex items-center gap-2 text-xs font-sans text-white/50 hover:text-white mb-6">
              ← All products
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-display font-light text-lg tracking-tight" style={{ color: product.accent }}>
                {product.name}
                <sup className="font-sans font-normal text-[10px] ml-0.5">™</sup>
              </span>
              <span className="text-[11px] font-sans tracking-widest uppercase px-2.5 py-1 border border-white/15 text-white/70">
                Early access
              </span>
            </div>
            <h1 className="font-display font-light text-[2.1rem] sm:text-5xl lg:text-[3.1rem] tracking-tighter leading-[1.08] mb-5">
              {product.tagline}
            </h1>
            <p className="font-sans font-light text-lg text-white/70 leading-relaxed mb-8 max-w-xl">{product.promise}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#early-access"
                className="rounded-xl px-6 py-3.5 font-sans font-semibold text-pd-ink transition-transform hover:scale-[1.02]"
                style={{ background: product.accent }}
              >
                Request early access
              </a>
              <a href="#how" className="rounded-xl px-6 py-3.5 font-sans font-medium border border-white/20 text-white hover:bg-pd-surface/5">
                See how it works
              </a>
            </div>
            <p className="font-sans text-xs tracking-[0.25em] uppercase text-white/40 mt-8">{product.verb}</p>
          </Reveal>
          <Reveal delay={0.15} className="min-w-0">{visual}</Reveal>
        </div>
      </section>

      {/* Who it's for */}
      <section id="how" className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto scroll-mt-20">
        <Reveal>
          <Eyebrow color={product.accent}>Who it&apos;s for</Eyebrow>
          <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tighter mb-8 max-w-2xl">
            Built for one person with a big idea, and for teams with a business to run.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <AudienceUseCases product={product} />
        </Reveal>
      </section>

      {/* Modules */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <Reveal>
          <Eyebrow color={product.accent}>Inside {product.name}</Eyebrow>
          <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tighter mb-10 max-w-2xl">Everything works together.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {product.modules.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.06}>
              <div className="group relative h-full rounded-2xl border border-white/10 bg-pd-surface/[0.03] p-6 overflow-hidden transition-colors hover:border-white/25">
                <div
                  aria-hidden="true"
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: product.accent }}
                />
                <span
                  aria-hidden="true"
                  className="relative w-11 h-11 rounded-xl grid place-items-center text-xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                  style={{ background: product.accentSoft, color: product.accent }}
                >
                  {m.glyph}
                </span>
                <h3 className="relative font-display font-normal text-white mb-1.5">{m.name}</h3>
                <p className="relative font-sans font-light text-sm text-white/60 leading-relaxed">{m.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <Reveal className="rounded-3xl border border-white/10 p-8 sm:p-12" >
          <Eyebrow color={product.accent}>Built to be trusted</Eyebrow>
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {product.principles.map((p) => (
              <div key={p.title}>
                <span className="block w-8 h-[3px] rounded-full mb-4" style={{ background: product.accent }} />
                <h3 className="font-display font-normal text-lg mb-2">{p.title}</h3>
                <p className="font-sans font-light text-sm text-white/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Better together */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
        <Reveal className="relative rounded-3xl overflow-hidden border border-white/10 p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-pd-oxblood"
          />
          <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <Eyebrow color="#fff">Better together</Eyebrow>
              <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tighter mb-3">
                Think smarter with PRESCRIPT IQ. Execute consistently with PRESYNQ.
              </h2>
              <p className="font-sans font-light text-white/70 leading-relaxed">
                The two are designed to work as one: plan an automation in IQ, approve it, then open it as a draft in PRESYNQ to connect, test and switch on, all from a single Prescript account.
              </p>
            </div>
            <Link
              href={`/products/${other.slug}`}
              className="group rounded-2xl border border-white/15 bg-black/30 p-6 hover:border-white/35 transition-colors"
            >
              <p className="font-sans text-xs tracking-widest uppercase text-white/50 mb-2">Explore</p>
              <p className="font-display font-light text-2xl" style={{ color: other.accent }}>{other.name}</p>
              <p className="font-sans text-sm text-white/65 mt-1">{other.verb}</p>
              <p className="font-sans text-sm text-white mt-4 group-hover:translate-x-1 transition-transform">See {other.name} →</p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow color={product.accent}>Questions</Eyebrow>
          <h2 className="font-display font-light text-3xl tracking-tighter mb-6">Good to know</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {product.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-sans font-medium text-white">
                  {f.q}
                  <span className="text-xl leading-none transition-transform group-open:rotate-45" style={{ color: product.accent }} aria-hidden="true">+</span>
                </summary>
                <p className="font-sans font-light text-sm text-white/65 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      <EarlyAccess defaultProduct={product.name as 'PRESCRIPT IQ' | 'PRESYNQ'} accent={product.accent} />
    </ProductsShell>
  )
}
