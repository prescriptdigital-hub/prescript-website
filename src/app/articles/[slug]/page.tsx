import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { getPostBySlug, POSTS } from "@/lib/posts"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock } from "lucide-react"

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getPostBySlug(params.slug)
  if (!p) return {}
  return {
    title: p.title + " | Prescript Digital Solutions",
    description: p.excerpt,
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  if (!post) return notFound()

  const idx = POSTS.findIndex(p => p.slug === params.slug)
  const prev = POSTS[idx - 1]
  const next = POSTS[idx + 1]

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-3xl mx-auto">
            <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-sans text-gray-400 hover:text-prescript-green mb-8 transition-colors">
              <ArrowLeft size={14} /> All articles
            </Link>
            <span className="text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 mb-4 inline-block">{post.category}</span>
            <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight mb-4 mt-2 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-gray-400">
              <span>{new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
              <span className="flex items-center gap-1"><MapPin size={11} /> {post.location}</span>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <p className="font-sans text-lg text-gray-600 leading-relaxed mb-10 font-light">{post.excerpt}</p>

            <div className="flex flex-col gap-8">
              {post.content.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="font-syne font-extrabold text-xl text-gray-900 mb-4">{section.heading}</h2>
                  )}
                  <div className="flex flex-col gap-4">
                    {section.paragraphs.map((para, j) => (
                      <p key={j} className="font-sans text-base text-gray-700 leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-prescript-green-light rounded-2xl px-8 py-8">
              <p className="font-syne font-extrabold text-xl text-prescript-green-dark mb-2">Ready to apply this to your business?</p>
              <p className="font-sans text-sm text-prescript-green-dark opacity-80 mb-5">We work with businesses in Nigeria, across Africa, the UK, Europe, and America. Tell us about your situation.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-prescript-green text-white font-sans font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-prescript-green-mid transition-colors">
                Start a conversation
              </Link>
            </div>
          </div>
        </section>

        {(prev || next) && (
          <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-100">
            <div className="max-w-3xl mx-auto flex items-start justify-between gap-8">
              {prev ? (
                <Link href={"/articles/" + prev.slug} className="group flex-1">
                  <p className="text-xs font-sans text-gray-400 mb-1">Previous article</p>
                  <p className="font-syne font-bold text-sm text-gray-700 group-hover:text-prescript-green transition-colors leading-snug">{prev.title}</p>
                </Link>
              ) : <span className="flex-1" />}
              {next ? (
                <Link href={"/articles/" + next.slug} className="group flex-1 text-right">
                  <p className="text-xs font-sans text-gray-400 mb-1">Next article</p>
                  <p className="font-syne font-bold text-sm text-gray-700 group-hover:text-prescript-green transition-colors leading-snug">{next.title}</p>
                </Link>
              ) : <span className="flex-1" />}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
