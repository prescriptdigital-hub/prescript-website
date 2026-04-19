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
    const ok = await verifyAdminPassword(password)
    if (ok) {
      sessionStorage.setItem('admin_key', password)
      router.push('/admin/projects')
    } else {
      setError('Incorrect password')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-sm shadow-sm">
        <div className="mb-6">
          <p className="font-syne font-extrabold text-2xl text-gray-900 mb-1">Admin</p>
          <p className="font-sans text-sm text-gray-400">Prescript Digital internal panel</p>
        </div>
        <div className="flex flex-col gap-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Admin password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-sans text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prescript-green focus:border-transparent" />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button variant="primary" size="lg" onClick={login} disabled={loading} className="w-full">{loading ? "Checking..." : "Sign in"}</Button>
        </div>
      </div>
    </main>
  )
}