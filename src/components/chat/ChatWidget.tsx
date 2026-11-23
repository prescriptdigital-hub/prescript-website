'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { MessageSquare, Send, X } from 'lucide-react'
import { COMPANY_INFO } from '@/lib/constants'
import { submitToWebhook } from '@/lib/submitForm'

const CHAT_URL = process.env.NEXT_PUBLIC_CHAT_URL || 'https://prescript-chat.prescriptdigital.workers.dev'
const WHATSAPP = `https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`
const GREETING = 'Hello, I am the Prescript AI assistant. Ask me about our services, software or pricing, or leave your details for the team.'
const SUGGESTIONS = ['What do you do?', 'How much does it cost?', 'Can you automate WhatsApp?']

interface Message {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

const FIELD = 'w-full border border-pd-line bg-pd-surface px-3 py-2.5 text-base sm:text-sm text-pd-ink placeholder-pd-subtle focus:outline-none focus:border-pd-oxblood'

function LeadForm({ messages, onClose }: { messages: Message[]; onClose: () => void }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      await submitToWebhook({
        _subject: 'Website chat: new enquiry',
        formSource: 'website-chat',
        fullName: String(form.get('name')),
        email: String(form.get('email')),
        whatsapp: String(form.get('phone') || ''),
        message: String(form.get('message')),
        conversation: messages.filter((m) => !m.error).map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n').slice(0, 6000),
      })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <div className="p-5" role="status">
        <p className="font-display text-xl text-pd-ink mb-1">Sent to the team.</p>
        <p className="text-sm text-pd-muted mb-4">We reply within 24 hours, Monday to Saturday.</p>
        <button type="button" onClick={onClose} className="text-sm font-semibold text-pd-brick-700 underline underline-offset-4">Back to chat</button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="p-5 space-y-3 overflow-y-auto">
      <p className="text-sm text-pd-muted">Your details and this conversation go to our team by email.</p>
      <label className="block text-sm text-pd-ink">Name<input name="name" required maxLength={100} autoComplete="name" className={`${FIELD} mt-1`} /></label>
      <label className="block text-sm text-pd-ink">Email<input name="email" type="email" required maxLength={150} autoComplete="email" className={`${FIELD} mt-1`} /></label>
      <label className="block text-sm text-pd-ink">WhatsApp (optional)<input name="phone" type="tel" maxLength={40} autoComplete="tel" className={`${FIELD} mt-1`} /></label>
      <label className="block text-sm text-pd-ink">How can we help?<textarea name="message" required maxLength={1500} rows={3} className={`${FIELD} mt-1 resize-none`} /></label>
      {status === 'failed' && (
        <p role="alert" className="text-sm text-pd-error">Not sent. Please try again, or email {COMPANY_INFO.email}.</p>
      )}
      <div className="flex gap-3 items-center">
        <button type="submit" disabled={status === 'sending'} className="bg-pd-brick text-white hover:bg-pd-brick-700 font-semibold text-sm px-5 py-3 disabled:opacity-60">
          {status === 'sending' ? 'Sending…' : 'Send to team'}
        </button>
        <button type="button" onClick={onClose} className="text-sm text-pd-muted underline underline-offset-4">Back</button>
      </div>
    </form>
  )
}

export default function ChatWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [leadOpen, setLeadOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && !leadOpen) inputRef.current?.focus()
  }, [open, leadOpen])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [messages, busy])

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/company-profile')) return null

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => launcherRef.current?.focus())
  }

  const ask = async (text: string) => {
    const content = text.trim()
    if (!content || busy) return
    const next: Message[] = [...messages, { role: 'user', content }]
    setMessages(next)
    setDraft('')
    setBusy(true)
    try {
      const res = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => !m.error).slice(-12).map(({ role, content }) => ({ role, content })) }),
        signal: AbortSignal.timeout(30000),
      })
      const data = await res.json()
      if (!res.ok || !data.reply) throw new Error(data.error)
      setMessages([...next, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([...next, { role: 'assistant', error: true, content: 'I cannot answer right now. Please leave your details or message us on WhatsApp.' }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="no-print">
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Prescript"
          onKeyDown={(e) => e.key === 'Escape' && close()}
          className="fixed z-[60] inset-0 sm:inset-auto sm:right-6 sm:bottom-24 sm:w-[380px] sm:h-[min(580px,calc(100svh-8rem))] flex flex-col bg-pd-paper border border-pd-oxblood"
        >
          <div className="flex items-center gap-3 bg-pd-oxblood px-4 py-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/svg/mark/prescript-mark-cream-on-dark.svg" alt="" width={30} height={30} />
            <div className="flex-1">
              <p className="font-display text-lg leading-tight text-pd-cream">Ask Prescript</p>
              <p className="text-xs text-pd-paper">AI assistant. It can make mistakes.</p>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="p-2 text-pd-cream"><X size={20} /></button>
          </div>

          {leadOpen ? (
            <LeadForm messages={messages} onClose={() => setLeadOpen(false)} />
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite">
                {[{ role: 'assistant' as const, content: GREETING }, ...messages].map((m, i) => (
                  <p
                    key={i}
                    className={`max-w-[86%] w-fit px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      m.role === 'user' ? 'ml-auto bg-pd-oxblood text-pd-paper' : 'bg-pd-surface border border-pd-line text-pd-ink'
                    }`}
                  >
                    {m.content}
                  </p>
                ))}
                {busy && <p className="text-sm text-pd-subtle">Typing…</p>}
                {!messages.length && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" onClick={() => ask(s)} className="border border-pd-oxblood text-pd-oxblood text-sm px-3 py-2 hover:bg-pd-oxblood hover:text-pd-cream transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}
                <div ref={endRef} />
              </div>

              <div className="border-t border-pd-line">
                <div className="flex gap-5 px-4 pt-3 text-sm font-semibold">
                  <button type="button" onClick={() => setLeadOpen(true)} className="text-pd-brick-700 hover:text-pd-oxblood">Talk to the team</button>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-pd-brick-700 hover:text-pd-oxblood">WhatsApp</a>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    ask(draft)
                  }}
                  className="flex gap-2 p-4 pt-3"
                >
                  <label htmlFor="chat-input" className="sr-only">Your message</label>
                  <input id="chat-input" ref={inputRef} value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={800} autoComplete="off" placeholder="Type your question" className={FIELD} />
                  <button type="submit" disabled={busy || !draft.trim()} aria-label="Send message" className="bg-pd-brick text-white px-4 disabled:opacity-50 hover:bg-pd-brick-700"><Send size={18} /></button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`fixed z-[55] right-4 bottom-4 sm:right-6 sm:bottom-6 h-14 w-14 grid place-items-center bg-pd-oxblood text-pd-cream border border-pd-cream/40 hover:bg-pd-ink transition-colors ${open ? 'hidden sm:grid' : ''}`}
      >
        {open ? <X size={22} /> : <MessageSquare size={22} />}
      </button>
    </div>
  )
}
