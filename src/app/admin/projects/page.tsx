'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Users, LogOut } from 'lucide-react'
import { listProjects, updateProject, listTeam, type Project, type TeamMember } from '@/lib/tracker'
import Button from '@/components/ui/Button'

export default function AdminProjectsPage() {
  const router = useRouter()
  const [adminKey, setAdminKey] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [team, setTeam] = useState<TeamMember[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState<string | null>(null)
  const [edits, setEdits] = useState<Record<string, Partial<Project>>>({})

  useEffect(() => {
    const k = sessionStorage.getItem('admin_key')
    if (!k) { router.push('/admin'); return }
    setAdminKey(k)
    Promise.all([listProjects(k), listTeam(k)]).then(([p, t]) => { setProjects(p); setTeam(t) }).catch(() => router.push("/admin"))
  }, [router])

  const logout = () => { sessionStorage.removeItem("admin_key"); router.push("/admin") }

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
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-syne font-extrabold text-2xl text-gray-900">Projects</p>
            <p className="font-sans text-sm text-gray-400">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/team")}><Users size={14} className="mr-1.5" />Team</Button>
            <Button variant="outline" size="sm" onClick={logout}><LogOut size={14} className="mr-1.5" />Logout</Button>
          </div>
        </div>

        {projects.length === 0 && <p className="text-center font-sans text-sm text-gray-400 py-16">No projects yet. They appear here automatically after a payment is verified.</p>}

        <div className="flex flex-col gap-4">
          {projects.map(p => {
            const isOpen = expanded === p.reference
            const draft = edits[p.reference] || {}
            const current = { ...p, ...draft }
            return (
              <div key={p.reference} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button onClick={() => toggleExpand(p.reference)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="text-left min-w-0">
                      <p className="font-syne font-bold text-base text-gray-900 truncate">{p.planName}</p>
                      <p className="font-sans text-xs text-gray-400">{p.customerName || p.customerEmail} · {p.reference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <span className="text-xs font-sans font-medium bg-prescript-green-light text-prescript-green-dark px-2 py-0.5 rounded-full">{p.stages[p.currentStage] || "Complete"}</span>
                    {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </div>
                </button>                {isOpen && (
                  <div className="border-t border-gray-100 px-6 py-5 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-sans text-gray-400 mb-1">Current stage</p>
                        <select value={current.currentStage} onChange={e => setEdit(p.reference, "currentStage", Number(e.target.value))} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-prescript-green">
                          {p.stages.map((s, i) => <option key={s} value={i}>{i + 1}. {s}</option>)}
                        </select>
                      </div>
                      <div>
                        <p className="text-xs font-sans text-gray-400 mb-1">Status</p>
                        <select value={current.status} onChange={e => setEdit(p.reference, "status", e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans text-gray-800 focus:outline-none focus:ring-2 focus:ring-prescript-green">
                          <option value="active">Active</option>
                          <option value="paused">Paused</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-sans text-gray-400 mb-1">Assigned team</p>
                      <div className="flex flex-wrap gap-2">
                        {team.map(m => {
                          const assigned = (current.assignedTeam || []).includes(m.email)
                          return (
                            <button key={m.email} onClick={() => { const cur = current.assignedTeam || []; setEdit(p.reference, "assignedTeam", assigned ? cur.filter(e => e !== m.email) : [...cur, m.email]) }} className={"text-xs font-sans px-3 py-1.5 rounded-full border transition-colors " + (assigned ? "bg-prescript-green text-white border-prescript-green" : "border-gray-200 text-gray-600 hover:border-prescript-green")}>{m.name}</button>
                          )
                        })}
                        {team.length === 0 && <p className="text-xs text-gray-400">No team members. Add some in the Team tab.</p>}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-sans text-gray-400 mb-1">Internal notes</p>
                      <textarea value={current.notes || ""} onChange={e => setEdit(p.reference, "notes", e.target.value)} rows={3} placeholder="Notes visible only to the team..." className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-prescript-green" />
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