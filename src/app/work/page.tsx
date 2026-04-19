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
        <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-4 block">Case Studies</span>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight mb-4 max-w-2xl">Work that moves businesses forward</h1>
            <p className="font-sans text-base text-gray-500 max-w-xl leading-relaxed">A selection of projects across branding, technology, marketing, automation, and AI — built for businesses across Nigeria and beyond.</p>
          </div>
        </section>
        <WorkGrid />
      </main>
      <Footer />
    </>
  )
}