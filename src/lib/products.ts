export type Audience = 'individuals' | 'teams'

export interface ProductModule {
  name: string
  blurb: string
  glyph: string
}

export interface UseCase {
  title: string
  body: string
}

export interface Product {
  slug: 'prescript-iq' | 'presynq'
  name: string
  verb: string
  tagline: string
  promise: string
  accent: string
  accentSoft: string
  modules: ProductModule[]
  useCases: Record<Audience, UseCase[]>
  principles: { title: string; body: string }[]
  faqs: { q: string; a: string }[]
}

export const IQ: Product = {
  slug: 'prescript-iq',
  name: 'PRESCRIPT IQ',
  verb: 'Think · Decide · Plan',
  tagline: 'Turn business questions into decisions and measurable action.',
  promise:
    'An AI-assisted workspace that helps you diagnose what is holding a business back, decide what to do next, and leave with a plan you can actually execute.',
  accent: '#8B7CFF',
  accentSoft: 'rgba(139,124,255,0.14)',
  modules: [
    { name: 'AI Advisor', blurb: 'Ask anything about your business and get a structured, reasoned answer.', glyph: '◎' },
    { name: 'Digital Doctor', blurb: 'An evidence-aware diagnosis of what is slowing your business down.', glyph: '✚' },
    { name: 'What Can I Build?', blurb: 'Map your skills, assets and market into real opportunities.', glyph: '◇' },
    { name: 'Business Ideas', blurb: 'Generate and stress-test ideas against your budget and market.', glyph: '✦' },
    { name: 'Build My Business', blurb: 'A step-by-step launch path from idea to first customers.', glyph: '▲' },
    { name: 'Tech Builder', blurb: 'Plan the website, app or platform you need before spending on it.', glyph: '⌘' },
    { name: 'Automation Architect', blurb: 'Design the automations that would save you the most time.', glyph: '⟳' },
    { name: 'Academy', blurb: 'Short, practical lessons that track your progress as you grow.', glyph: '❖' },
  ],
  useCases: {
    individuals: [
      { title: 'Find your next move', body: 'Turn a skill, a side hustle or a hunch into a business idea you have actually tested on paper.' },
      { title: 'Plan before you spend', body: 'Know what to build, what it costs and what to do first, before you pay anyone.' },
      { title: 'Learn as you go', body: 'Bite-sized Academy lessons tied to the exact stage you are at.' },
    ],
    teams: [
      { title: 'Diagnose the business', body: 'A structured health check across sales, operations, marketing and tech, with evidence behind every finding.' },
      { title: 'Decide with your team', body: 'Projects keep the conversation, approved decisions and tasks together in one place.' },
      { title: 'Hand off clean specs', body: 'Export documents and automation plans your developers or PRESYNQ can pick up.' },
    ],
  },
  principles: [
    { title: 'Advises, never acts', body: 'IQ plans and prepares. It never deploys code or runs automations behind your back.' },
    { title: 'Honest when unsure', body: 'Guided worksheets when live AI is unavailable, clearly labelled, never invented answers.' },
    { title: 'Your work stays yours', body: 'Projects, decisions and documents belong to you and your workspace.' },
  ],
  faqs: [
    { q: 'Who is PRESCRIPT IQ for?', a: 'Founders, professionals, consultants and small to medium businesses who want clearer decisions and a concrete plan, in any market.' },
    { q: 'Does IQ do the work for me?', a: 'IQ thinks and plans with you. When you are ready to automate, the approved plan can be handed to PRESYNQ, which only runs what you explicitly approve.' },
    { q: 'When can I start?', a: 'We are opening access in stages. Join the early-access list and we will invite you as places open.' },
    { q: 'How much will it cost?', a: 'Pricing is being finalised. Early-access members will hear first, including any founding-member offers.' },
  ],
}

export const SYNQ: Product = {
  slug: 'presynq',
  name: 'PRESYNQ',
  verb: 'Connect · Automate · Execute',
  tagline: 'Connect your business systems. Automate the work that slows you down.',
  promise:
    'An automation platform that links your CRM, messaging, email and tools, then runs the repetitive work for you, with a human approving anything that matters.',
  accent: '#2EE6A6',
  accentSoft: 'rgba(46,230,166,0.12)',
  modules: [
    { name: 'Workflow Designer', blurb: 'Build automations visually, or start from a ready-made template.', glyph: '⟳' },
    { name: 'Connectors', blurb: 'Link your CRM, email and messaging tools with secure, scoped access.', glyph: '⇄' },
    { name: 'AI Agents', blurb: 'Let AI classify, summarise and draft inside the guardrails you set.', glyph: '◆' },
    { name: 'Human Approval', blurb: 'Anything that sends, spends or deletes waits for a person to approve it.', glyph: '✓' },
    { name: 'Run History', blurb: 'See every run, every step, every retry. Nothing happens silently.', glyph: '☰' },
    { name: 'Schedules & Triggers', blurb: 'Start workflows on a schedule, a webhook or an app event.', glyph: '◷' },
  ],
  useCases: {
    individuals: [
      { title: 'Never miss a lead', body: 'Every enquiry gets an instant, personal reply and lands in your follow-up list.' },
      { title: 'Stop copy-pasting', body: 'Move details between forms, email and spreadsheets automatically.' },
      { title: 'Reminders that send themselves', body: 'Appointment, payment and follow-up nudges go out on time, every time.' },
    ],
    teams: [
      { title: 'Sales on autopilot', body: 'Route, score and follow up leads across your CRM and messaging channels.' },
      { title: 'Support that scales', body: 'AI drafts the reply, your team approves, the customer hears back in minutes.' },
      { title: 'Operations you can audit', body: 'Onboarding, invoicing and handoffs run the same way every time, with a full log.' },
    ],
  },
  principles: [
    { title: 'You stay in control', body: 'Consequential actions need approval. Nothing contacts your customers without your say-so.' },
    { title: 'Least access, always', body: 'Each connection only gets the permissions it needs, and you can revoke it in one click.' },
    { title: 'Built not to double-send', body: 'Retries are designed so a hiccup never sends the same message twice.' },
  ],
  faqs: [
    { q: 'Which tools will PRESYNQ connect to?', a: 'We are starting with a small set of proven connectors, beginning with CRM and email, and adding more only once each is fully tested.' },
    { q: 'Will automations run without me knowing?', a: 'No. You choose what needs approval, and every run is logged so you can see exactly what happened.' },
    { q: 'Do I need to be technical?', a: 'No. Start from a template or describe what you want. Teams with developers can go deeper.' },
    { q: 'When can I start?', a: 'PRESYNQ is opening to pilot customers first. Join the early-access list to be considered.' },
  ],
}

export const PRODUCTS = [IQ, SYNQ]
