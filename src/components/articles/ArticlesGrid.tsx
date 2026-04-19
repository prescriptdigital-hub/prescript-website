"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { POSTS, CATEGORIES } from "@/lib/posts"

export default function ArticlesGrid() {
  const [active, setActive] = useState("All")

  const visible = active === "All" ? POSTS : POSTS.filter(p => p.category === active)

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={"text-sm font-sans font-medium px-4 py-2 rounded-full border transition-colors " + (active === c ? "bg-prescript-green text-white border-prescript-green" : "bg-white border-gray-200 text-gray-600 hover:border-prescript-green")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map(p => (
            <Link key={p.slug} href={"/articles/" + p.slug} className="group bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{p.category}</span>
                <span className="text-xs font-sans text-gray-400">{p.readTime}</span>
              </div>
              <p className="font-syne font-bold text-base text-gray-900 mb-2 leading-snug flex-1">{p.title}</p>
              <p className="font-sans text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs font-sans text-gray-400">
                  <MapPin size={10} className="flex-shrink-0" />
                  {p.location}
                </div>
                <span className="flex items-center gap-1 text-xs font-sans font-medium text-prescript-green group-hover:underline">
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
