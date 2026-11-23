"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Button from "@/components/ui/Button"
import { submitToWebhook } from "@/lib/submitForm"
import { CheckCircle2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  website: string
  goals: string
  timeline: string
  assets: string
  source: string
}

const EMPTY: FormData = { name: "", email: "", company: "", website: "", goals: "", timeline: "", assets: "", source: "" }

function OnboardingInner() {
  const params = useSearchParams()
  const ref = params.get("ref") || ""
  const plan = params.get("plan") || "your plan"

  const [form, setForm] = useState<FormData>({ ...EMPTY })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  const setField = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.goals) { setError("Please fill in all required fields."); return }
    setError("")
    setSubmitting(true)
    try {
      await submitToWebhook({
        _subject: "New project brief: " + plan + (ref ? " (" + ref + ")" : ""),
        formType: "Project onboarding",
        name: form.name,
        email: form.email,
        company: form.company,
        website: form.website,
        tracking_reference: ref,
        plan,
        goals: form.goals,
        timeline: form.timeline,
        existing_assets: form.assets,
        how_they_found_us: form.source,
      })
      setDone(true)
    } catch {
      setError("Something went wrong. Please email hello@prescriptdigital.com.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-pd-paper py-16 px-4">
        <div className="max-w-xl mx-auto">
          {done ? (
            <div className="bg-pd-surface rounded-2xl border border-pd-line  p-10 text-center">
              <CheckCircle2 size={48} className="text-pd-brick-700 mx-auto mb-4" />
              <p className="font-display font-light text-2xl text-pd-ink mb-2">Brief received!</p>
              <p className="font-sans text-sm text-pd-muted leading-relaxed mb-2">Thanks {form.name}. We have everything we need to kick off your project.</p>
              <p className="font-sans text-sm text-pd-muted leading-relaxed">We will reach out within 24 hours to schedule your onboarding call.{ref && <> Track your project at <a href={"/track/?ref=" + ref} className="text-pd-brick-700 underline">/track</a> using ref <span className="font-medium text-pd-muted">{ref}</span>.</>}</p>
            </div>
          ) : (
            <div className="bg-pd-surface rounded-2xl border border-pd-line  p-8">
              <div className="mb-8">
                <span className="text-xs font-sans font-medium tracking-widest uppercase text-pd-brick-700 mb-2 block">Project Brief</span>
                <h1 className="font-display font-light text-2xl text-pd-ink mb-1">Let us get started</h1>
                <p className="font-sans text-sm text-pd-muted">Tell us about your project so we can hit the ground running. This takes about 5 minutes.</p>
                {ref && <p className="font-sans text-xs text-pd-subtle mt-2">Plan: <span className="font-medium text-pd-muted">{plan}</span> &middot; Ref: <span className="font-medium text-pd-muted">{ref}</span></p>}
              </div>

              <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">Full name <span className="text-pd-error">*</span></label>
                    <input type="text" value={form.name} onChange={setField("name")} placeholder="Your name" className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                  </div>
                  <div>
                    <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">Email <span className="text-pd-error">*</span></label>
                    <input type="email" value={form.email} onChange={setField("email")} placeholder="you@company.com" className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">Company name</label>
                    <input type="text" value={form.company} onChange={setField("company")} placeholder="Your company" className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                  </div>
                  <div>
                    <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">Current website</label>
                    <input type="url" value={form.website} onChange={setField("website")} placeholder="https://..." className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">What do you want to achieve? <span className="text-pd-error">*</span></label>
                  <textarea value={form.goals} onChange={setField("goals")} rows={4} placeholder="Describe your goals, what problem you are solving, and what success looks like to you..." className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans resize-none focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">Timeline expectations</label>
                  <select value={form.timeline} onChange={setField("timeline")} className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700">
                    <option value="">Select a timeframe</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1month">Within 1 month</option>
                    <option value="3months">Within 3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">Existing assets or materials</label>
                  <textarea value={form.assets} onChange={setField("assets")} rows={2} placeholder="Any existing brand assets, copy, logins, or materials we should know about..." className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans resize-none focus:outline-none focus:ring-2 focus:ring-pd-brick-700" />
                </div>
                <div>
                  <label className="text-sm font-sans font-medium text-pd-muted mb-1 block">How did you find us?</label>
                  <select value={form.source} onChange={setField("source")} className="w-full border border-pd-line rounded-lg px-3 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-pd-brick-700">
                    <option value="">Select an option</option>
                    <option value="google">Google search</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral</option>
                    <option value="twitter">X / Twitter</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {error && <p className="text-xs text-pd-error">{error}</p>}
                <Button type="submit" variant="primary" size="lg" className="w-full mt-1" disabled={submitting}>
                  {submitting ? "Sending..." : "Submit project brief"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function OnboardingPage() {
  return <Suspense><OnboardingInner /></Suspense>
}
