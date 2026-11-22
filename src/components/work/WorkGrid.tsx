"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CASES } from "@/lib/cases"
import Button from "@/components/ui/Button"

type ServiceFilter = "All" | "Imprint" | "Forge" | "Surge" | "Flow" | "Cortex"

const SERVICE_COLORS: Record<string, string> = {
  Imprint: "bg-pd-surface-2 text-pd-oxblood",
  Forge: "bg-pd-surface-2 text-pd-oxblood",
  Surge: "bg-pd-surface-2 text-pd-oxblood",
  Flow: "bg-pd-surface-2 text-pd-oxblood",
  Cortex: "bg-pd-surface-2 text-pd-oxblood",
}

const FILTERS: ServiceFilter[] = ["All", "Imprint", "Forge", "Surge", "Flow", "Cortex"]

export default function WorkGrid() {
  const [active, setActive] = useState<ServiceFilter>("All")

  const visible = active === "All" ? CASES : CASES.filter(c => c.service === active)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-pd-paper">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={"text-sm font-sans font-medium px-4 py-2 border transition-colors " + (active === f ? "bg-pd-brick-700 text-white border-pd-brick-700" : "bg-pd-surface border-pd-line text-pd-muted hover:border-pd-brick-700")}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map(c => (
            <Link key={c.client} href={"/work/" + c.slug} className={"group rounded-2xl border border-pd-line overflow-hidden block  transition-colors " + c.accent}>
              <div className="p-6 pb-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-display font-light text-xl text-pd-ink">{c.client}</p>
                    <p className="font-sans text-xs text-pd-muted mt-0.5">{c.industry} &middot; {c.location}</p>
                  </div>
                  <span className={"text-xs font-sans font-medium px-2.5 py-1 " + SERVICE_COLORS[c.service]}>{c.service}</span>
                </div>
                <p className="font-display font-normal text-base text-pd-ink mb-2 leading-snug">{c.headline}</p>
                <p className="font-sans text-sm text-pd-muted leading-relaxed">{c.description}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {c.metrics.map(m => (
                    <div key={m.label} className={"rounded-xl px-3 py-3 text-center " + c.metricBg}>
                      <p className="font-display font-light text-lg leading-tight">{m.value}</p>
                      <p className="font-sans text-xs mt-0.5 opacity-80">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-xs font-sans font-medium text-pd-brick-700 group-hover:underline">
                  Read case study <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-pd-oxblood px-8 py-10 text-center">
          <p className="font-display font-light text-2xl text-pd-cream mb-2">Want results like these?</p>
          <p className="font-sans text-sm text-pd-paper mb-6 max-w-md mx-auto">Tell us about your business and we will put together the right plan.</p>
          <Button variant="primary" size="md" onClick={() => { window.location.href = "/contact" }}>
            Start a conversation <ArrowRight size={14} className="ml-1.5 inline" />
          </Button>
        </div>
      </div>
    </section>
  )
}
