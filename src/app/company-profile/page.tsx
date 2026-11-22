import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Company Profile, Prescript Digital Solutions',
  description: 'Download or print the Prescript Digital Solutions company profile.',
}

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-pd-surface">

      {/* Print/Download bar - hidden when printing */}
      <div className="no-print bg-pd-paper border-b border-pd-line px-6 py-3 flex items-center justify-between">
        <p className="text-sm text-pd-muted">Company Profile 2025</p>
        <p className="text-sm text-pd-subtle">Press Ctrl+P (or Cmd+P on Mac) to save as PDF</p>
      </div>

      {/* Profile Content */}
      <div className="max-w-3xl mx-auto px-8 py-16 print:py-8 print:px-0">

        {/* Header */}
        <div className="border-b-2 border-pd-brick-700 pb-10 mb-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="font-display font-light text-3xl text-pd-ink tracking-tight">Prescript Digital Solutions</p>
              <p className="text-pd-brick-700 font-medium mt-1">Company Profile 2025</p>
            </div>
            <div className="text-right text-sm text-pd-subtle">
              <p>Lagos, Nigeria</p>
              <p>prescriptdigital.com</p>
              <p>hello@prescriptdigital.com</p>
            </div>
          </div>
          <p className="text-pd-muted leading-relaxed text-base">
            Prescript Digital Solutions is a Lagos-based digital agency helping businesses in Africa, Europe, and America build, grow, and operate at their best. We combine the creative and technical quality of a top-tier global agency with the on-the-ground understanding of a local one.
          </p>
        </div>

        {/* Services */}
        <div className="mb-10">
          <p className="font-display font-light text-lg text-pd-ink mb-6 uppercase tracking-wide text-sm">Our Services</p>
          <div className="space-y-6">
            {[
              { num: "01", name: "Imprint", full: "Branding and Creative", desc: "We build visual identities that communicate authority and trust. Logos, brand systems, content, video, and pitch decks built to travel globally." },
              { num: "02", name: "Forge", full: "Digital and Tech Platforms", desc: "Websites, web apps, mobile products, and custom platforms. We build the digital infrastructure your business depends on." },
              { num: "03", name: "Surge", full: "Digital Marketing", desc: "SEO, paid media, social strategy, and content that converts. We focus on what drives revenue, not just reach." },
              { num: "04", name: "Flow", full: "Business Automation", desc: "We map your operations and replace manual, time-consuming tasks with automated systems that keep your business moving." },
              { num: "05", name: "Cortex", full: "Agentic AI Deployment", desc: "Purpose-built AI agents deployed inside your business for customer service, lead qualification, and internal operations." },
            ].map(s => (
              <div key={s.name} className="flex gap-5 border-t border-pd-line pt-5">
                <span className="font-display text-xs text-pd-subtle mt-0.5 w-6 flex-shrink-0">{s.num}</span>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-normal text-pd-ink">{s.name}</span>
                    <span className="text-sm text-pd-subtle">{s.full}</span>
                  </div>
                  <p className="text-sm text-pd-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-pd-surface-2 rounded-xl p-6 mb-10">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { n: "50+", l: "Projects delivered" },
              { n: "3", l: "Continents served" },
              { n: "5", l: "Integrated services" },
              { n: "98%", l: "Client retention" },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display font-light text-2xl text-pd-brick-700">{s.n}</p>
                <p className="text-xs text-pd-muted mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Markets */}
        <div className="mb-10">
          <p className="font-display font-light text-sm text-pd-ink mb-4 uppercase tracking-wide">Where We Work</p>
          <p className="text-sm text-pd-muted leading-relaxed mb-5">
            Headquartered in Lagos with active clients in the UK, mainland Europe, and the United States. We understand what it takes to position a business for success in each of these markets.
          </p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { flag: "🇳🇬", market: "Nigeria", note: "Headquarters" },
              { flag: "🇬🇧", market: "United Kingdom", note: "Active market" },
              { flag: "🇪🇺", market: "Europe", note: "Active market" },
              { flag: "🇺🇸", market: "United States", note: "Active market" },
            ].map(m => (
              <div key={m.market} className="border border-pd-line rounded-lg p-3 text-center">
                <span className="text-xl block mb-1">{m.flag}</span>
                <p className="font-medium text-xs text-pd-ink">{m.market}</p>
                <p className="text-xs text-pd-subtle">{m.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-10">
          <p className="font-display font-light text-sm text-pd-ink mb-4 uppercase tracking-wide">How We Work</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "We build for the long run", body: "Every deliverable is built with your next stage of growth already in mind." },
              { title: "Context is everything", body: "Local market knowledge shapes every strategy we build and every product we ship." },
              { title: "Honest over impressive", body: "We tell clients what they need to hear. That is why the relationships last." },
              { title: "Execution is the product", body: "Strategy without delivery is just conversation. We ship and we meet timelines." },
            ].map(v => (
              <div key={v.title} className="border border-pd-line rounded-lg p-4">
                <p className="font-display font-normal text-sm text-pd-ink mb-1">{v.title}</p>
                <p className="text-xs text-pd-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="border-t-2 border-pd-brick-700 pt-8">
          <p className="font-display font-light text-sm text-pd-ink mb-4 uppercase tracking-wide">Get in Touch</p>
          <div className="flex gap-12 text-sm text-pd-muted">
            <div><p className="text-pd-subtle text-xs mb-0.5">Email</p><p>hello@prescriptdigital.com</p></div>
            <div><p className="text-pd-subtle text-xs mb-0.5">Website</p><p>prescriptdigital.com</p></div>
            <div><p className="text-pd-subtle text-xs mb-0.5">Location</p><p>Lagos, Nigeria</p></div>
          </div>
        </div>

      </div>
    </div>
  )
}
