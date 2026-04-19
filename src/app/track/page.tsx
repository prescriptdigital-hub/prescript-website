'use client'

import { useState } from 'react'
import { Search, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { getProject, type Project } from '@/lib/tracker'

export default function TrackPage() {
  const [ref, setRef] = useState('')
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const lookup = async () => {
    const trimmed = ref.trim()
    if (!trimmed) return
    setLoading(true)
    setError('')
    setProject(null)
    try {
      const p = await getProject(trimmed)
      setProject(p)
    } catch {
      setError('No project found for that reference. Double-check your payment confirmation email.')
    } finally {
      setLoading(false)
    }
  }

  const stageStatus = (i: number, current: number) => {
    if (i < current) return "done"
    if (i === current) return "active"
    return "pending"
  }
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-3 block">Project Tracker</span>
          <h1 className="font-syne font-extrabold text-3xl text-gray-900 tracking-tight mb-3">Track your project</h1>
          <p className="font-sans text-sm text-gray-500 leading-relaxed">Enter the payment reference from your confirmation email to see your project status.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 shadow-sm">
          <label className="text-sm font-sans font-medium text-gray-600 mb-2 block">Payment reference</label>
          <div className="flex gap-3">
            <input type="text" value={ref} onChange={e => setRef(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} placeholder="e.g. PSC-SCALE-A1B2C3" className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent" />
            <Button variant="primary" size="md" onClick={lookup} disabled={loading}>{loading ? "..." : <Search size={16} />}</Button>
          </div>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>        {project && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-syne font-extrabold text-xl text-gray-900">{project.planName}</p>
                <p className="font-sans text-sm text-gray-400 mt-0.5">{project.customerName && project.customerName + " · "}Started {new Date(project.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <span className={"text-xs font-sans font-medium px-3 py-1 rounded-full " + (project.status === "completed" ? "bg-prescript-green-light text-prescript-green-dark" : project.status === "paused" ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700")}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
            </div>
            <div className="space-y-0">
              {project.stages.map((stage, i) => {
                const status = stageStatus(i, project.currentStage)
                return (
                  <div key={stage} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={"w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 " + (status === "done" ? "bg-prescript-green text-white" : status === "active" ? "bg-prescript-green-light border-2 border-prescript-green" : "bg-gray-100")}>
                        {status === "done" ? <CheckCircle2 size={14} /> : status === "active" ? <Clock size={12} className="text-prescript-green" /> : <Circle size={12} className="text-gray-300" />}
                      </div>
                      {i < project.stages.length - 1 && <div className={"w-0.5 h-8 mt-1 " + (status === "done" ? "bg-prescript-green" : "bg-gray-200")} />}
                    </div>
                    <div className="pb-8 last:pb-0 flex-1 min-w-0">
                      <p className={"font-sans text-sm font-medium leading-7 " + (status === "active" ? "text-prescript-green-dark" : status === "done" ? "text-gray-700" : "text-gray-400")}>
                        {stage}
                        {status === "active" && <span className="ml-2 text-xs text-prescript-green bg-prescript-green-light px-2 py-0.5 rounded-full">In progress</span>}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-gray-100 mt-2 pt-5 flex items-center justify-between">
              <p className="font-sans text-xs text-gray-400">Last updated {new Date(project.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
              <a href={"https://wa.me/2347030057040?text=Hi, checking on my project (ref: " + project.reference + ")"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-sans text-prescript-green hover:underline">Questions? WhatsApp us <ArrowRight size={12} /></a>
            </div>
          </div>
        )}
        {!project && !error && <p className="text-center font-sans text-xs text-gray-400 mt-4">Your reference looks like <span className="font-medium text-gray-600">PSC-SCALE-A1B2C3</span> and is in your payment confirmation email.</p>}
      </div>
    </main>
  )
}