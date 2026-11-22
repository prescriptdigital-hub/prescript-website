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
    <main className="min-h-screen bg-pd-paper py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-sans font-medium tracking-widest uppercase text-pd-brick-700 mb-3 block">Project Tracker</span>
          <h1 className="font-display font-light text-3xl text-pd-ink tracking-tight mb-3">Track your project</h1>
          <p className="font-sans text-sm text-pd-muted leading-relaxed">Enter the payment reference from your confirmation email to see your project status.</p>
        </div>
        <div className="bg-pd-surface rounded-2xl border border-pd-line p-6 mb-6 ">
          <label className="text-sm font-sans font-medium text-pd-muted mb-2 block">Payment reference</label>
          <div className="flex gap-3">
            <input type="text" value={ref} onChange={e => setRef(e.target.value)} onKeyDown={e => e.key === "Enter" && lookup()} placeholder="e.g. PSC-SCALE-A1B2C3" className="flex-1 border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent" />
            <Button variant="primary" size="md" onClick={lookup} disabled={loading}>{loading ? "..." : <Search size={16} />}</Button>
          </div>
          {error && <p className="text-xs text-pd-error mt-2">{error}</p>}
        </div>        {project && (
          <div className="bg-pd-surface rounded-2xl border border-pd-line p-6 ">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="font-display font-light text-xl text-pd-ink">{project.planName}</p>
                <p className="font-sans text-sm text-pd-subtle mt-0.5">{project.customerName && project.customerName + " · "}Started {new Date(project.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
              </div>
              <span className={"text-xs font-sans font-medium px-3 py-1 " + (project.status === "completed" ? "bg-pd-surface-2 text-pd-oxblood" : project.status === "paused" ? "bg-pd-surface text-pd-warning" : "bg-pd-surface text-pd-info")}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
            </div>
            <div className="space-y-0">
              {project.stages.map((stage, i) => {
                const status = stageStatus(i, project.currentStage)
                return (
                  <div key={stage} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={"w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 " + (status === "done" ? "bg-pd-brick-700 text-white" : status === "active" ? "bg-pd-surface-2 border-2 border-pd-brick-700" : "bg-pd-surface-2")}>
                        {status === "done" ? <CheckCircle2 size={14} /> : status === "active" ? <Clock size={12} className="text-pd-brick-700" /> : <Circle size={12} className="text-pd-subtle" />}
                      </div>
                      {i < project.stages.length - 1 && <div className={"w-0.5 h-8 mt-1 " + (status === "done" ? "bg-pd-brick-700" : "bg-pd-line")} />}
                    </div>
                    <div className="pb-8 last:pb-0 flex-1 min-w-0">
                      <p className={"font-sans text-sm font-medium leading-7 " + (status === "active" ? "text-pd-oxblood" : status === "done" ? "text-pd-muted" : "text-pd-subtle")}>
                        {stage}
                        {status === "active" && <span className="ml-2 text-xs text-pd-brick-700 bg-pd-surface-2 px-2 py-0.5">In progress</span>}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="border-t border-pd-line mt-2 pt-5 flex items-center justify-between">
              <p className="font-sans text-xs text-pd-subtle">Last updated {new Date(project.updatedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
              <a href={"https://wa.me/2347030057040?text=Hi, checking on my project (ref: " + project.reference + ")"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-sans text-pd-brick-700 hover:underline">Questions? WhatsApp us <ArrowRight size={12} /></a>
            </div>
          </div>
        )}
        {!project && !error && <p className="text-center font-sans text-xs text-pd-subtle mt-4">Your reference looks like <span className="font-medium text-pd-muted">PSC-SCALE-A1B2C3</span> and is in your payment confirmation email.</p>}
      </div>
    </main>
  )
}