import Link from "next/link"
import { ArrowRight, FolderOpen } from "lucide-react"

export default function ClientTracker() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-pd-paper">
      <div className="max-w-7xl mx-auto">
        <div className="bg-pd-surface rounded-2xl border border-pd-line px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-pd-surface-2 flex items-center justify-center flex-shrink-0">
              <FolderOpen size={20} className="text-pd-brick-700" />
            </div>
            <div>
              <p className="font-display font-light text-lg text-pd-ink mb-1">Already a client?</p>
              <p className="font-sans text-sm text-pd-muted leading-relaxed max-w-md">Track your project progress in real time. See exactly what stage your project is at and what comes next, anytime, anywhere.</p>
            </div>
          </div>
          <Link href="/track" className="flex items-center gap-2 bg-pd-brick-700 text-white font-sans font-medium text-sm px-6 py-3 rounded-xl hover:bg-pd-brick transition-colors flex-shrink-0">
            Track your project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}