import Link from "next/link"
import { ArrowRight, FolderOpen } from "lucide-react"

export default function ClientTracker() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-11 h-11 rounded-xl bg-prescript-green-light flex items-center justify-center flex-shrink-0">
              <FolderOpen size={20} className="text-prescript-green" />
            </div>
            <div>
              <p className="font-syne font-extrabold text-lg text-gray-900 mb-1">Already a client?</p>
              <p className="font-sans text-sm text-gray-500 leading-relaxed max-w-md">Track your project progress in real time. See exactly what stage your project is at and what comes next — anytime, anywhere.</p>
            </div>
          </div>
          <Link href="/track" className="flex items-center gap-2 bg-prescript-green text-white font-sans font-medium text-sm px-6 py-3 rounded-xl hover:bg-prescript-green-mid transition-colors flex-shrink-0">
            Track your project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}