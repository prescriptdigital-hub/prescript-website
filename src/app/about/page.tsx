import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Prescript Digital Solutions',
  description: 'We are a Lagos-based digital agency helping businesses in Africa, Europe, and America build, grow, and operate at the highest level.',
}

const SERVICES = [
  { name: 'Imprint', full: 'Branding and Creative', desc: 'We build visual identities that communicate authority and trust. From your first logo to a complete brand system, every deliverable is built to travel globally.' },
  { name: 'Forge', full: 'Digital and Tech Platforms', desc: 'Websites, web apps, custom platforms, and mobile products. We build the digital infrastructure your business runs on.' },
  { name: 'Surge', full: 'Digital Marketing', desc: 'We drive consistent, qualified traffic to your business through SEO, paid media, social strategy, and content that converts.' },
  { name: 'Flow', full: 'Business Automation', desc: 'We map your operations and eliminate the manual work. Your business keeps moving even when you step back.' },
  { name: 'Cortex', full: 'Agentic AI Deployment', desc: 'We deploy AI agents inside your business, handling customer service, lead generation, and internal operations around the clock.' },
]

const VALUES = [
  { title: 'We build for the long run', body: 'Everything we create is designed to scale. We do not take shortcuts that look good today and break tomorrow.' },
  { title: 'Context is everything', body: 'We work across Lagos, London, New York, and beyond. We understand that a solution built without local context is not really a solution.' },
  { title: 'Honest over impressive', body: 'We tell clients what they need to hear, not what they want to hear. That is how we have kept the relationships we have.' },
  { title: 'Execution is the product', body: 'Strategy without delivery is just conversation. We are a team that ships.' },
]

const STATS = [
  { number: '50+', label: 'Projects delivered' },
  { number: '3', label: 'Continents served' },
  { number: '5', label: 'Integrated services' },
  { number: '98%', label: 'Client retention' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="border-b border-gray-100 px-6 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-prescript-green mb-5">About us</p>
        <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-gray-900 tracking-tight leading-tight max-w-3xl mb-8">
          We help businesses look, run, and grow at their best.
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
          Prescript Digital Solutions is a Lagos-based agency working with founders, businesses, and brands across Africa, Europe, and America. We cover everything from brand identity and tech platforms to marketing, automation, and AI deployment.
        </p>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 px-6 py-14 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-syne font-extrabold text-4xl text-prescript-green mb-1">{s.number}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-gray-100 px-6 py-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-prescript-green mb-5">Our story</p>
            <h2 className="font-syne font-extrabold text-3xl text-gray-900 tracking-tight leading-tight mb-6">
              Built out of a real frustration.
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 text-base leading-relaxed">
            <p>
              Prescript Digital was founded because good businesses were being underserved. Too many agencies promised the world, delivered inconsistently, and disappeared after payment. Too many founders in Africa were building great things but could not communicate their value to global audiences.
            </p>
            <p>
              We started in Lagos because that is where we are from. We built a team that understands what it means to operate in a market with infrastructure challenges, a complex regulatory environment, and enormous untapped potential.
            </p>
            <p>
              Today we work with clients across Nigeria, the UK, Europe, and the United States. Our model is simple: we combine the creative and technical quality of a top-tier global agency with the contextual understanding of a local one. That combination is rare, and it is what our clients keep coming back for.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-gray-100 px-6 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-prescript-green mb-5">What we do</p>
        <h2 className="font-syne font-extrabold text-3xl text-gray-900 tracking-tight leading-tight mb-12 max-w-xl">
          Five services. One integrated operation.
        </h2>
        <div className="grid gap-6">
          {SERVICES.map((s, i) => (
            <div key={s.name} className="flex gap-6 items-start border-t border-gray-100 pt-6">
              <span className="font-syne text-xs text-gray-300 mt-1 w-8 flex-shrink-0">0{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="font-syne font-bold text-lg text-gray-900">{s.name}</h3>
                  <span className="text-sm text-gray-400">{s.full}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
              <Link href={"/services/" + s.name.toLowerCase()} className="text-xs font-medium text-prescript-green hover:underline flex-shrink-0 mt-1">
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-gray-100 px-6 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-prescript-green mb-5">How we work</p>
        <h2 className="font-syne font-extrabold text-3xl text-gray-900 tracking-tight leading-tight mb-12 max-w-xl">
          The things we will not compromise on.
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {VALUES.map(v => (
            <div key={v.title} className="border border-gray-100 rounded-xl p-6">
              <h3 className="font-syne font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Markets */}
      <section className="border-b border-gray-100 px-6 py-20 max-w-5xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase text-prescript-green mb-5">Where we work</p>
        <h2 className="font-syne font-extrabold text-3xl text-gray-900 tracking-tight leading-tight mb-6 max-w-xl">
          Lagos is home. The world is the market.
        </h2>
        <p className="text-gray-500 leading-relaxed max-w-2xl mb-10">
          We are headquartered in Lagos, Nigeria, with clients and partners across the United Kingdom, mainland Europe, and the United States. We understand the nuances of each market and how to position a business for success in all of them.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { flag: "🇳🇬", market: "Nigeria", note: "Headquarters" },
            { flag: "🇬🇧", market: "United Kingdom", note: "Active market" },
            { flag: "🇪🇺", market: "Europe", note: "Active market" },
            { flag: "🇺🇸", market: "United States", note: "Active market" },
          ].map(m => (
            <div key={m.market} className="bg-gray-50 rounded-xl p-4">
              <span className="text-2xl block mb-2">{m.flag}</span>
              <p className="font-syne font-bold text-sm text-gray-900">{m.market}</p>
              <p className="text-xs text-gray-400 mt-0.5">{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <div className="bg-prescript-green rounded-2xl px-8 py-12 md:flex items-center justify-between gap-8">
          <div className="mb-6 md:mb-0">
            <h2 className="font-syne font-extrabold text-2xl text-white mb-2">Ready to work together?</h2>
            <p className="text-white/70 text-sm">Tell us about your project and we will get back to you within 24 hours.</p>
          </div>
          <Link href="/contact" className="inline-block bg-white text-prescript-green font-syne font-bold text-sm px-6 py-3 rounded-lg hover:bg-prescript-green-light transition-colors flex-shrink-0">
            Start a conversation
          </Link>
        </div>
      </section>

    </div>
  )
}
