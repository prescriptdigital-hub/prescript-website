'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Users, LogOut, KeyRound, Plus, Copy, Trash2 } from 'lucide-react'
import { listProjects, updateProject, listTeam, changeAdminPassword, createProject, deleteProject, MONTHLY_PLANS, PROJECT_TYPES, type NewProject, type Project, type TeamMember } from '@/lib/tracker'
import Button from '@/components/ui/Button'

const EMPTY_PROJECT: NewProject = { customerName: '', customerEmail: '', planName: '', type: 'monthly', amount: '', paymentReference: '' }
const INPUT = 'w-full border border-pd-line bg-pd-surface px-3 py-2 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700'

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
  const [notice, setNotice] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [draftProject, setDraftProject] = useState<NewProject>(EMPTY_PROJECT)
  const [adding, setAdding] = useState(false)
  const [addError, setAddError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    const k = sessionStorage.getItem('admin_key')
    if (!k) { router.push('/admin'); return }
    setAdminKey(k)
    Promise.all([listProjects(k), listTeam(k)]).then(([p, t]) => { setProjects(p); setTeam(t); setLoaded(true) }).catch(e => {
      const message = e instanceof Error ? e.message : ''
      if (message === 'Unauthorized') { sessionStorage.removeItem('admin_key'); router.push('/admin') }
      else setNotice(message || 'Could not load projects. Please refresh.')
    })
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
    setNotice('')
    try {
      const updated = await updateProject(adminKey, ref, edits[ref])
      setProjects(prev => prev.map(p => p.reference === ref ? updated : p))
      setEdits(prev => { const n = { ...prev }; delete n[ref]; return n })
    } catch (e) {
      setNotice('Not saved. ' + (e instanceof Error ? e.message : ''))
    }
    setSaving(null)
  }

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    setAddError('')
    try {
      const created = await createProject(adminKey, draftProject)
      setProjects(prev => [created, ...prev])
      setExpanded(created.reference)
      setDraftProject(EMPTY_PROJECT)
      setShowAdd(false)
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Could not add the project.')
    }
    setAdding(false)
  }

  const remove = async (ref: string) => {
    setNotice('')
    try {
      await deleteProject(adminKey, ref)
      setProjects(prev => prev.filter(p => p.reference !== ref))
    } catch (e) {
      setNotice('Not deleted. ' + (e instanceof Error ? e.message : ''))
    }
    setConfirmDelete(null)
  }

  const copyLink = async (ref: string) => {
    try {
      await navigator.clipboard.writeText('https://prescriptdigital.com/track/?ref=' + ref)
      setCopied(ref)
      setTimeout(() => setCopied(null), 2000)
    } catch { setNotice('Could not copy. Select the reference and copy it yourself.') }
  }

  const choosePlan = (planName: string) => setDraftProject(d => ({ ...d, planName, type: MONTHLY_PLANS.includes(planName) ? 'monthly' : PROJECT_TYPES.includes(planName) ? 'project' : d.type }))

  return (
    <main className="min-h-screen bg-pd-paper py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="font-display font-light text-2xl text-pd-ink">Projects</p>
            <p className="font-sans text-sm text-pd-subtle">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm" onClick={() => setShowAdd(!showAdd)}><Plus size={14} className="mr-1.5" />Add project</Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/team")}><Users size={14} className="mr-1.5" />Team</Button>
            <Button variant="outline" size="sm" onClick={() => setShowChangePw(!showChangePw)}><KeyRound size={14} className="mr-1.5" />Password</Button>
            <Button variant="outline" size="sm" onClick={logout}><LogOut size={14} className="mr-1.5" />Logout</Button>
          </div>
        </div>

        {notice && <p role="alert" className="font-sans text-sm text-pd-error bg-pd-error-bg px-4 py-3 mb-6">{notice}</p>}

        {showAdd && (
          <form onSubmit={add} className="bg-pd-surface border border-pd-line p-5 mb-6">
            <p className="font-display font-normal text-base text-pd-ink mb-1">Add project</p>
            <p className="font-sans text-xs text-pd-subtle mb-4">For bank transfers and Enterprise clients. A tracking reference is created for you to send.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <label className="font-sans text-xs text-pd-subtle">Client name *<input required value={draftProject.customerName} onChange={e => setDraftProject({ ...draftProject, customerName: e.target.value })} className={INPUT + ' mt-1'} /></label>
              <label className="font-sans text-xs text-pd-subtle">Client email<input type="email" value={draftProject.customerEmail} onChange={e => setDraftProject({ ...draftProject, customerEmail: e.target.value })} className={INPUT + ' mt-1'} /></label>
              <label className="font-sans text-xs text-pd-subtle">Plan or project (the client sees this) *<input required list="plan-names" value={draftProject.planName} onChange={e => choosePlan(e.target.value)} placeholder="Choose or type a name" className={INPUT + ' mt-1'} /></label>
              <datalist id="plan-names">{[...MONTHLY_PLANS, ...PROJECT_TYPES].map(n => <option key={n} value={n} />)}</datalist>
              <label className="font-sans text-xs text-pd-subtle">Stages to show<select value={draftProject.type} onChange={e => setDraftProject({ ...draftProject, type: e.target.value as NewProject['type'] })} className={INPUT + ' mt-1'}><option value="monthly">Monthly plan</option><option value="project">One-time project</option></select></label>
              <label className="font-sans text-xs text-pd-subtle">Amount (private)<input value={draftProject.amount} onChange={e => setDraftProject({ ...draftProject, amount: e.target.value })} className={INPUT + ' mt-1'} /></label>
              <label className="font-sans text-xs text-pd-subtle">Bank transfer reference (private)<input value={draftProject.paymentReference} onChange={e => setDraftProject({ ...draftProject, paymentReference: e.target.value })} className={INPUT + ' mt-1'} /></label>
            </div>
            {addError && <p role="alert" className="text-xs text-pd-error mt-3">{addError}</p>}
            <div className="flex gap-3 mt-4">
              <Button type="submit" variant="primary" size="sm" disabled={adding}>{adding ? 'Adding...' : 'Create project'}</Button>
              <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
            </div>
          </form>
        )}

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

        {loaded && projects.length === 0 && <p className="text-center font-sans text-sm text-pd-subtle py-16">No projects yet. Online payments appear here automatically. Use Add project for bank transfers.</p>}

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
                    <span className="text-xs font-sans font-medium bg-pd-surface-2 text-pd-oxblood px-2 py-0.5">{p.status === "completed" ? "Completed" : p.stages[p.currentStage] || "Complete"}</span>
                    {isOpen ? <ChevronUp size={16} className="text-pd-subtle" /> : <ChevronDown size={16} className="text-pd-subtle" />}
                  </div>
                </button>                {isOpen && (
                  <div className="border-t border-pd-line px-6 py-5 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-pd-paper border border-pd-line px-4 py-3">
                      <div className="font-sans text-xs text-pd-subtle">
                        <p>Tracking reference <span className="font-mono text-sm text-pd-ink">{p.reference}</span></p>
                        <p className="mt-1">{[p.customerEmail, p.amount, p.provider, p.paymentReference && 'Payment ref ' + p.paymentReference].filter(Boolean).join(' · ')}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyLink(p.reference)}><Copy size={14} className="mr-1.5" />{copied === p.reference ? 'Copied' : 'Copy tracking link'}</Button>
                    </div>
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
                    <div className="border-t border-pd-line pt-4 flex items-center gap-3 font-sans text-xs text-pd-subtle">
                      {confirmDelete === p.reference ? (
                        <>
                          <span>Delete permanently? The client can no longer track it.</span>
                          <button onClick={() => remove(p.reference)} className="text-pd-error font-semibold underline">Yes, delete</button>
                          <button onClick={() => setConfirmDelete(null)} className="underline">Keep</button>
                        </>
                      ) : (
                        <button onClick={() => setConfirmDelete(p.reference)} className="flex items-center gap-1.5 hover:text-pd-error"><Trash2 size={13} />Delete project</button>
                      )}
                    </div>
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