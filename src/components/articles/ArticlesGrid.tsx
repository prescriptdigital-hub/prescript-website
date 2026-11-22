"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { POSTS, CATEGORIES } from "@/lib/posts"

export default function ArticlesGrid() {
  const [active, setActive] = useState("All")

  const visible = active === "All" ? POSTS : POSTS.filter(p => p.category === active)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-pd-paper">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={"text-sm font-sans font-medium px-4 py-2 border transition-colors " + (active === c ? "bg-pd-brick-700 text-white border-pd-brick-700" : "bg-pd-surface border-pd-line text-pd-muted hover:border-pd-brick-700")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(p => (
            <Link key={p.slug} href={"/articles/" + p.slug} className="group bg-pd-surface rounded-2xl border border-pd-line p-6 flex flex-col  transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans font-medium px-2.5 py-1 bg-pd-surface-2 text-pd-muted">{p.category}</span>
                <span className="text-xs font-sans text-pd-subtle">{p.readTime}</span>
              </div>
              <p className="font-display font-normal text-base text-pd-ink mb-2 leading-snug flex-1">{p.title}</p>
              <p className="font-sans text-sm text-pd-muted leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-pd-line">
                <div className="flex items-center gap-1 text-xs font-sans text-pd-subtle">
                  <MapPin size={10} className="flex-shrink-0" />
                  {p.location}
                </div>
                <span className="flex items-center gap-1 text-xs font-sans font-medium text-pd-brick-700 group-hover:underline">
                  Read <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
