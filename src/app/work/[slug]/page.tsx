import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getCaseBySlug, CASES } from "@/lib/cases"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function generateStaticParams() {
  return CASES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = getCaseBySlug(params.slug)
  if (!c) return {}
  return {
    title: c.client + " Case Study | Prescript Digital Solutions",
    description: c.description,
  }
}

const SERVICE_COLORS: Record<string, string> = {
  Imprint: "bg-amber-100 text-amber-800",
  Forge: "bg-blue-100 text-blue-800",
  Surge: "bg-prescript-green-light text-prescript-green-dark",
  Flow: "bg-purple-100 text-purple-800",
  Cortex: "bg-prescript-green-light text-prescript-green-dark",
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = getCaseBySlug(params.slug)
  if (!c) return notFound()

  const idx = CASES.findIndex(x => x.slug === params.slug)
  const prev = CASES[idx - 1]
  const next = CASES[idx + 1]

  return (
    <>
      <Navbar />
      <main>
        <section className={"py-16 px-4 sm:px-6 lg:px-8 " + c.accent}>
          <div className="max-w-3xl mx-auto">
            <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-sans text-gray-500 hover:text-prescript-green mb-8 transition-colors">
              <ArrowLeft size={14} /> All case studies
            </Link>
            <span className={"text-xs font-sans font-medium px-2.5 py-1 rounded-full mb-4 inline-block " + SERVICE_COLORS[c.service]}>{c.service}</span>
            <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight mb-3 mt-2">{c.headline}</h1>
            <p className="font-sans text-sm text-gray-500">{c.client} &middot; {c.industry} &middot; {c.location}</p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-4 mb-12">
              {c.metrics.map(m => (
                <div key={m.label} className={"rounded-2xl px-4 py-5 text-center " + c.metricBg}>
                  <p className="font-syne font-extrabold text-3xl mb-1">{m.value}</p>
                  <p className="font-sans text-xs opacity-80">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-10">
              <div>
                <p className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-3">The Challenge</p>
                <p className="font-sans text-base text-gray-700 leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <p className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-3">Our Solution</p>
                <p className="font-sans text-base text-gray-700 leading-relaxed">{c.solution}</p>
              </div>
              <div>
                <p className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-3">The Result</p>
                <p className="font-sans text-base text-gray-700 leading-relaxed">{c.result}</p>
              </div>
            </div>

            <div className="mt-12 bg-gray-900 rounded-2xl px-8 py-8 text-center">
              <p className="font-syne font-extrabold text-xl text-white mb-2">Ready to build something like this?</p>
              <p className="font-sans text-sm text-gray-400 mb-5">Let us look at your business and put together a plan.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-prescript-green text-white font-sans font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-prescript-green-mid transition-colors">
                Start a conversation <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {(prev || next) && (
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              {prev ? (
                <Link href={"/work/" + prev.slug} className="flex items-center gap-2 text-sm font-sans text-gray-500 hover:text-prescript-green transition-colors">
                  <ArrowLeft size={14} /> {prev.client}
                </Link>
              ) : <span />}
              {next ? (
                <Link href={"/work/" + next.slug} className="flex items-center gap-2 text-sm font-sans text-gray-500 hover:text-prescript-green transition-colors">
                  {next.client} <ArrowRight size={14} />
                </Link>
              ) : <span />}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
