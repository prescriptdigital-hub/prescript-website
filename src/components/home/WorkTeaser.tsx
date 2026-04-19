import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedCases } from "@/lib/cases"

const SERVICE_COLORS: Record<string, string> = {
  Imprint: "bg-amber-100 text-amber-800",
  Forge: "bg-blue-100 text-blue-800",
  Surge: "bg-prescript-green-light text-prescript-green-dark",
  Flow: "bg-purple-100 text-purple-800",
  Cortex: "bg-prescript-green-light text-prescript-green-dark",
}

export default function WorkTeaser() {
  const featured = getFeaturedCases()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-3 block">Our Work</span>
            <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight">Results that speak</h2>
          </div>
          <Link href="/work" className="hidden md:flex items-center gap-1.5 text-sm font-sans font-medium text-prescript-green hover:underline">
            See all case studies <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(c => (
            <Link key={c.slug} href={"/work/" + c.slug} className={"group rounded-2xl border border-gray-100 overflow-hidden block hover:shadow-md transition-shadow " + c.accent}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={"text-xs font-sans font-medium px-2.5 py-1 rounded-full " + SERVICE_COLORS[c.service]}>{c.service}</span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-prescript-green transition-colors" />
                </div>
                <p className="font-syne font-bold text-base text-gray-900 mb-2 leading-snug">{c.headline}</p>
                <p className="font-sans text-xs text-gray-500 mb-4">{c.client} &middot; {c.location}</p>
                <div className="flex gap-3">
                  {c.metrics.slice(0, 2).map(m => (
                    <div key={m.label} className={"rounded-lg px-3 py-2 flex-1 " + c.metricBg}>
                      <p className="font-syne font-extrabold text-base">{m.value}</p>
                      <p className="font-sans text-xs opacity-75 leading-tight mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-prescript-green hover:underline">
            See all case studies <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
