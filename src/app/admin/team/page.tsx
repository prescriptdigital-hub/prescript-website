'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, FolderOpen, LogOut } from 'lucide-react'
import { listTeam, createTeamMember, updateTeamMember, deleteTeamMember, type TeamMember } from '@/lib/tracker'
import Button from '@/components/ui/Button'

const EMPTY = { name: "", role: "", whatsapp: "", email: "" }

export default function AdminTeamPage() {
  const router = useRouter()
  const [adminKey, setAdminKey] = useState('')
  const [members, setMembers] = useState<TeamMember[]>([])
  const [form, setForm] = useState(EMPTY)
  const [editingEmail, setEditingEmail] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const k = sessionStorage.getItem('admin_key')
    if (!k) { router.push('/admin'); return }
    setAdminKey(k)
    listTeam(k).then(setMembers).catch(() => router.push("/admin"))
  }, [router])

  const logout = () => { sessionStorage.removeItem("admin_key"); router.push("/admin") }

  const startEdit = (m: TeamMember) => {
    setEditingEmail(m.email)
    setForm({ name: m.name, role: m.role, whatsapp: m.whatsapp, email: m.email })
    setError('')
  }

  const cancelEdit = () => { setEditingEmail(null); setForm(EMPTY) }

  const submit = async () => {
    if (!form.name || !form.email) { setError("Name and email are required"); return }
    setSaving(true)
    setError('')
    try {
      if (editingEmail) {
        const updated = await updateTeamMember(adminKey, editingEmail, form)
        setMembers(prev => prev.map(m => m.email === editingEmail ? updated : m))
      } else {
        const created = await createTeamMember(adminKey, form)
        setMembers(prev => [...prev, created])
      }
      setForm(EMPTY)
      setEditingEmail(null)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error saving")
    } finally {
      setSaving(false)
    }
  }

  const remove = async (email: string) => {
    if (!confirm("Remove this team member?")) return
    await deleteTeamMember(adminKey, email)
    setMembers(prev => prev.filter(m => m.email !== email))
  }
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-syne font-extrabold text-2xl text-gray-900">Team</p>
            <p className="font-sans text-sm text-gray-400">{members.length} member{members.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin/projects")}><FolderOpen size={14} className="mr-1.5" />Projects</Button>
            <Button variant="outline" size="sm" onClick={logout}><LogOut size={14} className="mr-1.5" />Logout</Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <p className="font-syne font-bold text-base text-gray-900 mb-4">{editingEmail ? "Edit member" : "Add team member"}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-sans text-gray-400 mb-1 block">Full name *</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-prescript-green" />
            </div>
            <div>
              <label className="text-xs font-sans text-gray-400 mb-1 block">Role</label>
              <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Project Manager" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-prescript-green" />
            </div>
            <div>
              <label className="text-xs font-sans text-gray-400 mb-1 block">Email *</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} disabled={!!editingEmail} placeholder="email@example.com" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-prescript-green disabled:bg-gray-50 disabled:text-gray-400" />
            </div>
            <div>
              <label className="text-xs font-sans text-gray-400 mb-1 block">WhatsApp</label>
              <input type="text" value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="e.g. 07030057040" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-prescript-green" />
            </div>
          </div>
          {error && <p className="text-xs text-red-500 mb-3">{error}</p>}
          <div className="flex gap-3">
            <Button variant="primary" size="sm" onClick={submit} disabled={saving}>{saving ? "Saving..." : editingEmail ? "Save changes" : <><Plus size={14} className="mr-1" />Add member</>}</Button>
            {editingEmail && <Button variant="outline" size="sm" onClick={cancelEdit}>Cancel</Button>}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {members.map(m => (
            <div key={m.email} className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between">
              <div>
                <p className="font-syne font-bold text-sm text-gray-900">{m.name}</p>
                <p className="font-sans text-xs text-gray-400">{m.role}{m.role && m.whatsapp ? " · " : ""}{m.whatsapp}</p>
                <p className="font-sans text-xs text-gray-400">{m.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(m)} className="text-xs font-sans text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:border-prescript-green hover:text-prescript-green transition-colors">Edit</button>
                <button onClick={() => remove(m.email)} className="text-xs font-sans text-red-400 border border-red-100 rounded-lg px-3 py-1.5 hover:bg-red-50 transition-colors"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
          {members.length === 0 && <p className="text-center font-sans text-sm text-gray-400 py-12">No team members yet.</p>}
        </div>
      </div>
    </main>
  )
}