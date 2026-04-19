"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CASES } from "@/lib/cases"
import Button from "@/components/ui/Button"

type ServiceFilter = "All" | "Imprint" | "Forge" | "Surge" | "Flow" | "Cortex"

const SERVICE_COLORS: Record<string, string> = {
  Imprint: "bg-amber-100 text-amber-800",
  Forge: "bg-blue-100 text-blue-800",
  Surge: "bg-prescript-green-light text-prescript-green-dark",
  Flow: "bg-purple-100 text-purple-800",
  Cortex: "bg-prescript-green-light text-prescript-green-dark",
}

const FILTERS: ServiceFilter[] = ["All", "Imprint", "Forge", "Surge", "Flow", "Cortex"]

export default function WorkGrid() {
  const [active, setActive] = useState<ServiceFilter>("All")

  const visible = active === "All" ? CASES : CASES.filter(c => c.service === active)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={"text-sm font-sans font-medium px-4 py-2 rounded-full border transition-colors " + (active === f ? "bg-prescript-green text-white border-prescript-green" : "bg-white border-gray-200 text-gray-600 hover:border-prescript-green")}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map(c => (
            <Link key={c.client} href={"/work/" + c.slug} className={"group rounded-2xl border border-gray-100 overflow-hidden block hover:shadow-md transition-shadow " + c.accent}>
              <div className="p-6 pb-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-syne font-extrabold text-xl text-gray-900">{c.client}</p>
                    <p className="font-sans text-xs text-gray-500 mt-0.5">{c.industry} &middot; {c.location}</p>
                  </div>
                  <span className={"text-xs font-sans font-medium px-2.5 py-1 rounded-full " + SERVICE_COLORS[c.service]}>{c.service}</span>
                </div>
                <p className="font-syne font-bold text-base text-gray-900 mb-2 leading-snug">{c.headline}</p>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">{c.description}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {c.metrics.map(m => (
                    <div key={m.label} className={"rounded-xl px-3 py-3 text-center " + c.metricBg}>
                      <p className="font-syne font-extrabold text-lg leading-tight">{m.value}</p>
                      <p className="font-sans text-xs mt-0.5 opacity-80">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 mt-4 text-xs font-sans font-medium text-prescript-green group-hover:underline">
                  Read case study <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gray-900 px-8 py-10 text-center">
          <p className="font-syne font-extrabold text-2xl text-white mb-2">Want results like these?</p>
          <p className="font-sans text-sm text-gray-400 mb-6 max-w-md mx-auto">Tell us about your business and we will put together the right plan.</p>
          <Button variant="primary" size="md" onClick={() => { window.location.href = "/contact" }}>
            Start a conversation <ArrowRight size={14} className="ml-1.5 inline" />
          </Button>
        </div>
      </div>
    </section>
  )
}
