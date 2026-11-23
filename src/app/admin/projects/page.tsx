'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Users, LogOut, KeyRound } from 'lucide-react'
import { listProjects, updateProject, listTeam, changeAdminPassword, type Project, type TeamMember } from '@/lib/tracker'
import Button from '@/components/ui/Button'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [adminKey, setAdminKey] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [edits, setEdits] = useState<Record<string, Partial<Project>>>({})
  const [showChangePw, setShowChangePw] = useState(false)
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)

  useEffect(() => {
    const k = sessionStorage.getItem('admin_key')
    if (!k) { router.push('/admin'); return }
    setAdminKey(k)
    Promise.all([listProjects(k), listTeam(k)]).then(([p, t]) => { setProjects(p); setTeam(t) }).catch(() => router.push("/admin"))
  }, [router])

  const logout = () => { sessionStorage.removeItem("admin_key"); router.push("/admin") }

  const submitChangePw = async () => {
    setPwError('')
    try {
      await changeAdminPassword(oldPw, newPw)
      sessionStorage.setItem('admin_key', newPw)
      setAdminKey(newPw)
      setPwSuccess(true)
      setOldPw('')
      setNewPw('')
      setTimeout(() => { setPwSuccess(false); setShowChangePw(false) }, 2000)
    } catch (e) {
      setPwError(e instanceof Error && e.message ? e.message : 'Something went wrong. Please try again.')
    }
  }

  const toggleExpand = (ref: string) => setExpanded(expanded === ref ? null : ref)

  const setEdit = (ref: string, field: keyof Project, value: unknown) => {
    setEdits(prev => ({ ...prev, [ref]: { ...prev[ref], [field]: value } }))
  }

  const save = async (ref: string) => {
    if (!edits[ref]) return
    setSaving(ref)
    const updated = await updateProject(adminKey, ref, edits[ref])
    setProjects(prev => prev.map(p => p.reference === ref ? updated : p))
    setEdits(prev => { const n = { ...prev }; delete n[ref]; return n })
    setSaving(null)
  }
  return (
    <main className="min-h-screen bg-pd-paper py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-display font-light text-2xl text-pd-ink">Projects</p>
            <p className="font-sans text-sm text-pd-subtle">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/team")}><Users size={14} className="mr-1.5" />Team</Button>
            <Button variant="outline" size="sm" onClick={() => setShowChangePw(!showChangePw)}><KeyRound size={14} className="mr-1.5" />Password</Button>
            <Button variant="outline" size="sm" onClick={logout}><LogOut size={14} className="mr-1.5" />Logout</Button>
          </div>
        </div>

        {showChangePw && (
          <div className="bg-pd-surface rounded-2xl border border-pd-line  p-5 mb-6">
            <p className="font-display font-normal text-base text-pd-ink mb-4">Change password</p>
            <div className="flex flex-col gap-3">
              <input type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} placeholder="Current password" className="border border-pd-line rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
              <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password (min 12 characters)" className="border border-pd-line rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
              {pwError && <p className="text-xs text-pd-error">{pwError}</p>}
              {pwSuccess && <p className="text-xs text-pd-brick-700">Password changed successfully!</p>}
              <div className="flex gap-3">
                <Button variant="primary" size="sm" onClick={submitChangePw}>Save new password</Button>
                <Button variant="outline" size="sm" onClick={() => setShowChangePw(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {projects.length === 0 && <p className="text-center font-sans text-sm text-pd-subtle py-16">No projects yet. They appear here automatically after a payment is verified.</p>}

        <div className="flex flex-col gap-4">
          {projects.map(p => {
            const isOpen = expanded === p.reference
            const draft = edits[p.reference] || {}
            const current = { ...p, ...draft }
            return (
              <div key={p.reference} className="bg-pd-surface rounded-2xl border border-pd-line  overflow-hidden">
                <button onClick={() => toggleExpand(p.reference)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-pd-paper transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="text-left min-w-0">
                      <p className="font-display font-normal text-base text-pd-ink truncate">{p.planName}</p>
                      <p className="font-sans text-xs text-pd-subtle">{p.customerName || p.customerEmail} · {p.reference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className="text-xs font-sans font-medium bg-pd-surface-2 text-pd-oxblood px-2 py-0.5">{p.stages[p.currentStage] || "Complete"}</span>
                    {isOpen ? <ChevronUp size={16} className="text-pd-subtle" /> : <ChevronDown size={16} className="text-pd-subtle" />}
                  </div>
                </button>                {isOpen && (
                  <div className="border-t border-pd-line px-6 py-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-sans text-pd-subtle mb-1">Current stage</p>
                        <select value={current.currentStage} onChange={e => setEdit(p.reference, "currentStage", Number(e.target.value))} className="w-full border border-pd-line rounded-lg px-3 py-2 text-sm font-sans text-pd-ink focus:outline-none focus:ring-2 focus:ring-pd-brick-700">
                          {p.stages.map((s, i) => <option key={s} value={i}>{i + 1}. {s}</option>)}
                        </select>
                      </div>
                      <div>
                        <p className="text-xs font-sans text-pd-subtle mb-1">Status</p>
                        <select value={current.status} onChange={e => setEdit(p.reference, "status", e.target.value)} className="w-full border border-pd-line rounded-lg px-3 py-2 text-sm font-sans text-pd-ink focus:outline-none focus:ring-2 focus:ring-pd-brick-700">
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-sans text-pd-subtle mb-1">Assigned team</p>
                      <div className="flex flex-wrap gap-2">
                        {team.map(m => {
                          const assigned = (current.assignedTeam || []).includes(m.email)
                          return (
                            <button key={m.email} onClick={() => { const cur = current.assignedTeam || []; setEdit(p.reference, "assignedTeam", assigned ? cur.filter(e => e !== m.email) : [...cur, m.email]) }} className={"text-xs font-sans px-3 py-1.5 border transition-colors " + (assigned ? "bg-pd-brick-700 text-white border-pd-brick-700" : "border-pd-line text-pd-muted hover:border-pd-brick-700")}>{m.name}</button>
                          )
                        })}
                        {team.length === 0 && <p className="text-xs text-pd-subtle">No team members. Add some in the Team tab.</p>}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-sans text-pd-subtle mb-1">Internal notes</p>
                      <textarea value={current.notes || ""} onChange={e => setEdit(p.reference, "notes", e.target.value)} rows={3} placeholder="Notes visible only to the team..." className="w-full border border-pd-line rounded-lg px-3 py-2 text-sm font-sans text-pd-ink placeholder-pd-subtle resize-none focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                    </div>
                    {edits[p.reference] && (
                      <Button variant="primary" size="sm" onClick={() => save(p.reference)} disabled={saving === p.reference} className="self-end">{saving === p.reference ? "Saving..." : "Save changes"}</Button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}