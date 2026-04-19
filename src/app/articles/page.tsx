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
        <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-4 block">Articles</span>
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl text-gray-900 tracking-tight mb-4 max-w-2xl">Thinking that moves business forward</h1>
            <p className="font-sans text-base text-gray-500 max-w-xl leading-relaxed">Practical writing on automation, AI deployment, branding, and digital marketing - grounded in real work with businesses across Nigeria, Africa, Europe, and America.</p>
          </div>
        </section>
        <ArticlesGrid />
      </main>
      <Footer />
    </>
  )
}
