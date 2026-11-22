import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ArticlesGrid from "@/components/articles/ArticlesGrid"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Articles | Prescript Digital Solutions",
  description: "Practical thinking on automation, AI, branding, and digital marketing for businesses in Nigeria, Africa, Europe, and America.",
}

export default function ArticlesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-pd-surface">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-pd-brick-700 mb-4 block">Articles</span>
            <h1 className="font-display font-light text-4xl md:text-5xl text-pd-ink tracking-tight mb-4 max-w-2xl">Thinking that moves business forward</h1>
            <p className="font-sans text-base text-pd-muted max-w-xl leading-relaxed">Practical writing on automation, AI deployment, branding, and digital marketing - grounded in real work with businesses across Nigeria, Africa, Europe, and America.</p>
          </div>
        </section>
        <ArticlesGrid />
      </main>
      <Footer />
    </>
  )
}
