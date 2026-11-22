import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getFeaturedCases } from "@/lib/cases"

const SERVICE_COLORS: Record<string, string> = {
  Imprint: "bg-pd-surface-2 text-pd-oxblood",
  Forge: "bg-pd-surface-2 text-pd-oxblood",
  Surge: "bg-pd-surface-2 text-pd-oxblood",
  Flow: "bg-pd-surface-2 text-pd-oxblood",
  Cortex: "bg-pd-surface-2 text-pd-oxblood",
}

export default function WorkTeaser() {
  const featured = getFeaturedCases()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-pd-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-sans font-medium tracking-widest uppercase text-pd-brick-700 mb-3 block">Our Work</span>
            <h2 className="font-display font-light text-3xl md:text-4xl text-pd-ink tracking-tight">Results that speak</h2>
          </div>
          <Link href="/work" className="hidden md:flex items-center gap-1.5 text-sm font-sans font-medium text-pd-brick-700 hover:underline">
            See all case studies <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(c => (
            <Link key={c.slug} href={"/work/" + c.slug} className={"group rounded-2xl border border-pd-line overflow-hidden block  transition-colors " + c.accent}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={"text-xs font-sans font-medium px-2.5 py-1 " + SERVICE_COLORS[c.service]}>{c.service}</span>
                  <ArrowRight size={14} className="text-pd-subtle group-hover:text-pd-brick-700 transition-colors" />
                </div>
                <p className="font-display font-normal text-base text-pd-ink mb-2 leading-snug">{c.headline}</p>
                <p className="font-sans text-xs text-pd-muted mb-4">{c.client} &middot; {c.location}</p>
                <div className="flex gap-3">
                  {c.metrics.slice(0, 2).map(m => (
                    <div key={m.label} className={"rounded-lg px-3 py-2 flex-1 " + c.metricBg}>
                      <p className="font-display font-light text-base">{m.value}</p>
                      <p className="font-sans text-xs opacity-75 leading-tight mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 md:hidden text-center">
          <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-sans font-medium text-pd-brick-700 hover:underline">
            See all case studies <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
