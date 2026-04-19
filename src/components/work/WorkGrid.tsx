'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

type Service = 'All' | 'Imprint' | 'Forge' | 'Surge' | 'Flow' | 'Cortex'

interface CaseStudy {
  client: string
  industry: string
  location: string
  service: Exclude<Service, 'All'>
  headline: string
  description: string
  metrics: { label: string; value: string }[]
  accent: string
  metricBg: string
}

const CASES: CaseStudy[] = [
  {
    client: 'Aso Luxe',
    industry: 'Fashion & Lifestyle',
    location: 'Lagos, Nigeria',
    service: 'Imprint',
    headline: 'A luxury fashion brand born from a rebrand',
    description: 'Aso Luxe was selling premium Aso-oke fabric with zero brand presence. We built an identity from scratch - name, logo, colour system, packaging, and a complete brand playbook.',
    metrics: [
      { label: 'Brand recognition lift', value: '+340%' },
      { label: 'Average order value', value: '+62%' },
      { label: 'Stockists onboarded', value: '14' },
    ],
    accent: 'bg-amber-50',
    metricBg: 'bg-amber-100 text-amber-800',
  },
  {
    client: 'PocketLend',
    industry: 'Fintech / Lending',
    location: 'Lagos, Nigeria',
    service: 'Forge',
    headline: 'Loan management platform for 40,000 borrowers',
    description: 'PocketLend needed a web app for loan origination, repayment tracking, and agent dashboards at scale. We shipped a full-stack platform in 11 weeks, integrated with Paystack and NIBSS.',
    metrics: [
      { label: 'Active borrowers', value: '40,000+' },
      { label: 'Loan disbursement speed', value: '-78%' },
      { label: 'Support tickets', value: '-55%' },
    ],
    accent: 'bg-blue-50',
    metricBg: 'bg-blue-100 text-blue-800',
  },
  {
    client: 'Landmark Realty',
    industry: 'Real Estate',
    location: 'Abuja, Nigeria',
    service: 'Surge',
    headline: '140 qualified leads in 30 days for a new estate launch',
    description: 'Landmark needed to sell off-plan units fast. We ran hyper-targeted Meta and Google campaigns alongside a WhatsApp nurture sequence that converted browsers into site visit bookings.',
    metrics: [
      { label: 'Leads in 30 days', value: '140' },
      { label: 'Cost per lead', value: 'N3,200' },
      { label: 'Units sold in 60 days', value: '23' },
    ],
    accent: 'bg-prescript-green-light',
    metricBg: 'bg-prescript-green-light text-prescript-green-dark',
  },
  {
    client: 'SwiftHaul Logistics',
    industry: 'Logistics & Supply Chain',
    location: 'Port Harcourt, Nigeria',
    service: 'Flow',
    headline: 'Automating dispatch, invoicing, and driver comms',
    description: 'SwiftHaul was running their operation on WhatsApp and spreadsheets. We built automated dispatch allocation, auto-invoicing on delivery, and a driver notification system.',
    metrics: [
      { label: 'Dispatch time saved', value: '4 hrs/day' },
      { label: 'Invoice errors', value: '-91%' },
      { label: 'Driver response time', value: '-67%' },
    ],
    accent: 'bg-purple-50',
    metricBg: 'bg-purple-100 text-purple-800',
  },
  {
    client: 'Kora Commerce',
    industry: 'E-commerce',
    location: 'Lagos, Nigeria',
    service: 'Cortex',
    headline: 'AI customer agent handling 83% of support without humans',
    description: 'Kora Commerce was drowning in repeat support queries across Instagram DMs, WhatsApp, and email. We deployed a trained AI agent that resolves order status, returns, and product queries.',
    metrics: [
      { label: 'Queries resolved by AI', value: '83%' },
      { label: 'Response time', value: '< 30s' },
      { label: 'Support team hours saved', value: '120/mo' },
    ],
    accent: 'bg-prescript-green-light',
    metricBg: 'bg-prescript-green-light text-prescript-green-dark',
  },
  {
    client: 'GreenBowl Foods',
    industry: 'Food & Beverage',
    location: 'Lagos, Nigeria',
    service: 'Forge',
    headline: 'Online ordering platform that doubled revenue in 3 months',
    description: 'GreenBowl was relying on phone orders and walk-ins. We built a branded ordering site with real-time kitchen notifications, loyalty points, and automated Flutterwave payments.',
    metrics: [
      { label: 'Online revenue share', value: '68%' },
      { label: 'Monthly orders', value: '+110%' },
      { label: 'Order processing time', value: '-80%' },
    ],
    accent: 'bg-blue-50',
    metricBg: 'bg-blue-100 text-blue-800',
  },
  {
    client: 'Novus Health',
    industry: 'Healthcare',
    location: 'Accra, Ghana',
    service: 'Imprint',
    headline: 'Clinic network rebrand that built patient trust',
    description: 'Novus Health was expanding from one clinic to five locations. We delivered a complete brand system covering signage, uniforms, digital templates, and patient communications.',
    metrics: [
      { label: 'New patient registrations', value: '+89%' },
      { label: 'Brand consistency score', value: '9.4/10' },
      { label: 'Referral rate increase', value: '+41%' },
    ],
    accent: 'bg-amber-50',
    metricBg: 'bg-amber-100 text-amber-800',
  },
  {
    client: 'Apex Capital',
    industry: 'Investment & Finance',
    location: 'London, UK',
    service: 'Cortex',
    headline: 'AI-powered portfolio briefing system for fund managers',
    description: 'Apex Capital needed daily portfolio summaries generated automatically from live market data. We built an AI pipeline that delivers formatted briefs to fund managers every morning.',
    metrics: [
      { label: 'Analyst hours saved/week', value: '28' },
      { label: 'Report generation time', value: '4 min' },
      { label: 'Data sources integrated', value: '12' },
    ],
    accent: 'bg-prescript-green-light',
    metricBg: 'bg-prescript-green-light text-prescript-green-dark',
  },
]

const SERVICE_COLORS: Record<Exclude<Service, 'All'>, string> = {
  Imprint: 'bg-amber-100 text-amber-800',
  Forge: 'bg-blue-100 text-blue-800',
  Surge: 'bg-prescript-green-light text-prescript-green-dark',
  Flow: 'bg-purple-100 text-purple-800',
  Cortex: 'bg-prescript-green-light text-prescript-green-dark',
}

const FILTERS: Service[] = ['All', 'Imprint', 'Forge', 'Surge', 'Flow', 'Cortex']

export default function WorkGrid() {
  const [active, setActive] = useState<Service>('All')

  const visible = active === 'All' ? CASES : CASES.filter(c => c.service === active)

  return (
    <section className='py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-wrap gap-2 mb-10'>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={'text-sm font-sans font-medium px-4 py-2 rounded-full border transition-colors ' + (active === f ? 'bg-prescript-green text-white border-prescript-green' : 'bg-white border-gray-200 text-gray-600 hover:border-prescript-green')}
            >
              {f}
            </button>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {visible.map(c => (
            <div key={c.client} className={'rounded-2xl border border-gray-100 overflow-hidden ' + c.accent}>
              <div className='p-6 pb-5'>
                <div className='flex items-start justify-between mb-4'>
                  <div>
                    <p className='font-syne font-extrabold text-xl text-gray-900'>{c.client}</p>
                    <p className='font-sans text-xs text-gray-500 mt-0.5'>{c.industry} · {c.location}</p>
                  </div>
                  <span className={'text-xs font-sans font-medium px-2.5 py-1 rounded-full ' + SERVICE_COLORS[c.service]}>{c.service}</span>
                </div>
                <p className='font-syne font-bold text-base text-gray-900 mb-2 leading-snug'>{c.headline}</p>
                <p className='font-sans text-sm text-gray-500 leading-relaxed'>{c.description}</p>
              </div>
              <div className='px-6 pb-6'>
                <div className='grid grid-cols-3 gap-3 mt-4'>
                  {c.metrics.map(m => (
                    <div key={m.label} className={'rounded-xl px-3 py-3 text-center ' + c.metricBg}>
                      <p className='font-syne font-extrabold text-lg leading-tight'>{m.value}</p>
                      <p className='font-sans text-xs mt-0.5 opacity-80'>{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 rounded-2xl bg-gray-900 px-8 py-10 text-center'>
          <p className='font-syne font-extrabold text-2xl text-white mb-2'>Want results like these?</p>
          <p className='font-sans text-sm text-gray-400 mb-6 max-w-md mx-auto'>Tell us about your business and we will put together the right plan.</p>
          <Button variant='primary' size='md' onClick={() => { window.location.href = '/contact' }}>
            Start a conversation <ArrowRight size={14} className='ml-1.5 inline' />
          </Button>
        </div>
      </div>
    </section>
  )
}
