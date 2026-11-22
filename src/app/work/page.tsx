import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import WorkGrid from "@/components/work/WorkGrid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Work | Prescript Digital Solutions",
  description: "Case studies across branding, web development, digital marketing, automation, and AI deployment.",
}

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-pd-surface">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-pd-brick-700 mb-4 block">Case Studies</span>
            <h1 className="font-display font-light text-4xl md:text-5xl text-pd-ink tracking-tight mb-4 max-w-2xl">Work that moves businesses forward</h1>
            <p className="font-sans text-base text-pd-muted max-w-xl leading-relaxed">A selection of projects across branding, technology, marketing, automation, and AI, built for businesses across Nigeria and beyond.</p>
          </div>
        </section>
        <WorkGrid />
      </main>
      <Footer />
    </>
  )
}