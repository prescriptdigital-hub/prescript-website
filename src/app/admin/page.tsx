'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { verifyAdminPassword } from '@/lib/tracker'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const login = async () => {
    setLoading(true)
    setError('')
    try {
      await verifyAdminPassword(password)
      sessionStorage.setItem('admin_key', password)
      router.push('/admin/projects')
    } catch (e) {
      const message = e instanceof Error ? e.message : ''
      setError(message === 'Invalid password' ? 'Incorrect password' : message || 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-pd-paper flex items-center justify-center p-4">
      <div className="bg-pd-surface rounded-2xl border border-pd-line p-8 w-full max-w-sm ">
        <div className="mb-6">
          <p className="font-display font-light text-2xl text-pd-ink mb-1">Admin</p>
          <p className="font-sans text-sm text-pd-subtle">Prescript Digital internal panel</p>
        </div>
        <div className="flex flex-col gap-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Admin password" className="w-full border border-pd-line rounded-lg px-4 py-3 text-sm font-sans text-pd-ink placeholder-pd-subtle focus:outline-none focus:ring-2 focus:ring-pd-brick-700 focus:border-transparent" />
          {error && <p role="alert" className="text-xs text-pd-error">{error}</p>}
          <Button variant="primary" size="lg" onClick={login} disabled={loading} className="w-full">{loading ? "Checking..." : "Sign in"}</Button>
        </div>
      </div>
    </main>
  )
}