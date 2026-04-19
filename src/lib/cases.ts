export type ServiceName = "Imprint" | "Forge" | "Surge" | "Flow" | "Cortex"

export interface CaseStudy {
  slug: string
  client: string
  industry: string
  location: string
  service: ServiceName
  headline: string
  description: string
  challenge: string
  solution: string
  result: string
  metrics: { label: string; value: string }[]
  accent: string
  metricBg: string
  featured: boolean
}

export const CASES: CaseStudy[] = [
  {
    slug: "aso-luxe",
    client: "Aso Luxe",
    industry: "Fashion & Lifestyle",
    location: "Lagos, Nigeria",
    service: "Imprint",
    headline: "A luxury fashion brand born from a rebrand",
    description: "Aso Luxe was selling premium Aso-oke fabric with zero brand presence. We built an identity from scratch - name, logo, colour system, packaging, and a complete brand playbook.",
    challenge: "Aso Luxe had a high-quality product that was practically invisible. The founder had been selling premium hand-woven Aso-oke through Instagram DMs with no consistent visual identity. Despite the quality, they were competing on price instead of value.",
    solution: "We started with naming workshops and brand strategy to identify their positioning: luxury heritage redefined for the modern African woman. We designed a full identity system - wordmark, secondary marks, colour palette rooted in warm earth and gold tones, and a brand playbook covering every touchpoint.",
    result: "Within three months of the rebrand launch, Aso Luxe was stocked in 14 boutiques across Lagos and Abuja. Their average order value climbed as customers began paying a premium for the brand, not just the fabric.",
    metrics: [
      { label: "Brand recognition lift", value: "+340%" },
      { label: "Average order value", value: "+62%" },
      { label: "Stockists onboarded", value: "14" },
    ],
    accent: "bg-amber-50",
    metricBg: "bg-amber-100 text-amber-800",
    featured: true,
  },
  {
    slug: "pocketlend",
    client: "PocketLend",
    industry: "Fintech / Lending",
    location: "Lagos, Nigeria",
    service: "Forge",
    headline: "Loan management platform for 40,000 borrowers",
    description: "PocketLend needed a web app for loan origination, repayment tracking, and agent dashboards. We shipped a full-stack platform in 11 weeks, integrated with Paystack and NIBSS.",
    challenge: "PocketLend was processing loan applications through a patchwork of spreadsheets and WhatsApp groups. As they scaled to thousands of borrowers, loan approvals took 3 days, repayment tracking was unreliable, and field agents had no visibility into portfolio performance.",
    solution: "We architected a full-stack web platform with portals for borrowers, field agents, and operations staff. The borrower portal handles application and repayment scheduling. Agent dashboards show real-time performance. We integrated Paystack for repayment collection and NIBSS for identity verification.",
    result: "The platform went live with 40,000 borrowers migrated in a single weekend. Loan disbursement time dropped from 3 days to under 6 hours. Support tickets dropped by more than half as borrowers could track everything themselves.",
    metrics: [
      { label: "Active borrowers", value: "40,000+" },
      { label: "Loan disbursement speed", value: "-78%" },
      { label: "Support tickets", value: "-55%" },
    ],
    accent: "bg-blue-50",
    metricBg: "bg-blue-100 text-blue-800",
    featured: true,
  },
  {
    slug: "landmark-realty",
    client: "Landmark Realty",
    industry: "Real Estate",
    location: "Abuja, Nigeria",
    service: "Surge",
    headline: "140 qualified leads in 30 days for a new estate launch",
    description: "Landmark needed to sell off-plan units fast. We ran hyper-targeted Meta and Google campaigns alongside a WhatsApp nurture sequence that converted browsers into bookings.",
    challenge: "Landmark Realty was launching a new residential estate in Abuja with 60 off-plan units to sell in 90 days. Their previous launches relied on referrals and newspaper adverts. They had no pixel installed, no email list, and no digital infrastructure.",
    solution: "We ran a phased campaign: first two weeks were awareness on Meta and Google. Week three shifted to lead generation with a landing page offering a virtual tour. Captured leads entered a WhatsApp sequence that educated, handled objections, and booked site visits over 7 days.",
    result: "By day 30 we had generated 140 qualified leads at N3,200 per lead - well below the N7,500 target. Of those, 89 completed site visits and 23 units were sold by day 60. The campaign paid for itself 14x over.",
    metrics: [
      { label: "Leads in 30 days", value: "140" },
      { label: "Cost per lead", value: "N3,200" },
      { label: "Units sold in 60 days", value: "23" },
    ],
    accent: "bg-prescript-green-light",
    metricBg: "bg-prescript-green-light text-prescript-green-dark",
    featured: false,
  },
  {
    slug: "swifthaul-logistics",
    client: "SwiftHaul Logistics",
    industry: "Logistics & Supply Chain",
    location: "Port Harcourt, Nigeria",
    service: "Flow",
    headline: "Automating dispatch, invoicing, and driver comms",
    description: "SwiftHaul was running their operation on WhatsApp and spreadsheets. We built automated dispatch allocation, auto-invoicing on delivery, and a driver notification system.",
    challenge: "SwiftHaul was growing fast with 40 trucks and 200+ deliveries a week, but operations were entirely manual. Dispatch was assigned via WhatsApp, invoices were generated manually in Excel and sent days late, and drivers had no structured communication channel.",
    solution: "We mapped their entire workflow before touching any tools. Then we built an automation stack: incoming delivery requests trigger an availability check and auto-assign to the nearest driver via SMS and WhatsApp. On delivery confirmation the system auto-generates and emails the invoice to the client.",
    result: "The ops manager reclaimed 4 hours a day. Invoice errors dropped to near zero as human data entry was removed. SwiftHaul scaled to 60 trucks without adding headcount to operations.",
    metrics: [
      { label: "Dispatch time saved", value: "4 hrs/day" },
      { label: "Invoice errors", value: "-91%" },
      { label: "Driver response time", value: "-67%" },
    ],
    accent: "bg-purple-50",
    metricBg: "bg-purple-100 text-purple-800",
    featured: true,
  },
  {
    slug: "kora-commerce",
    client: "Kora Commerce",
    industry: "E-commerce",
    location: "Lagos, Nigeria",
    service: "Cortex",
    headline: "AI customer agent handling 83% of support without humans",
    description: "Kora Commerce was drowning in repeat support queries across Instagram DMs, WhatsApp, and email. We deployed a trained AI agent that resolves order status, returns, and product queries.",
    challenge: "Kora Commerce had grown to 2,000+ monthly orders but their 2-person support team was handling 400+ queries a week. Response times had slipped to 18 hours and they were losing sales to competitors who replied in minutes.",
    solution: "We trained a custom AI agent on their product catalogue, delivery policy, returns process, and FAQ history. The agent was deployed across WhatsApp Business, Instagram DM, and their website live chat. Complex issues are routed to the human team with full context.",
    result: "The AI agent now handles 83% of all incoming support queries without human involvement. Average first response time dropped from 18 hours to under 30 seconds. Customer satisfaction scores increased as response speed improved.",
    metrics: [
      { label: "Queries resolved by AI", value: "83%" },
      { label: "Response time", value: "< 30s" },
      { label: "Support team hours saved", value: "120/mo" },
    ],
    accent: "bg-prescript-green-light",
    metricBg: "bg-prescript-green-light text-prescript-green-dark",
    featured: false,
  },
  {
    slug: "greenbowl-foods",
    client: "GreenBowl Foods",
    industry: "Food & Beverage",
    location: "Lagos, Nigeria",
    service: "Forge",
    headline: "Online ordering platform that doubled revenue in 3 months",
    description: "GreenBowl was relying on phone orders and walk-ins. We built a branded ordering site with real-time kitchen notifications, loyalty points, and automated Flutterwave payments.",
    challenge: "GreenBowl Foods had a loyal customer base but were capped by their order channels. Phone orders got confused, walk-in queues were turning people away, and they had no way to collect customer data or run promotions.",
    solution: "We built a branded ordering platform with a custom menu builder, real-time availability toggling, and a kitchen display system. Customers earn loyalty points on every order. Flutterwave handles payments. A simple CMS lets the team update the menu without developer help.",
    result: "Within three months, 68% of revenue came through the online platform. Monthly order volume more than doubled. Order processing time dropped as kitchen staff stopped taking calls and focused on cooking.",
    metrics: [
      { label: "Online revenue share", value: "68%" },
      { label: "Monthly orders", value: "+110%" },
      { label: "Order processing time", value: "-80%" },
    ],
    accent: "bg-blue-50",
    metricBg: "bg-blue-100 text-blue-800",
    featured: false,
  },
  {
    slug: "novus-health",
    client: "Novus Health",
    industry: "Healthcare",
    location: "Accra, Ghana",
    service: "Imprint",
    headline: "Clinic network rebrand that built patient trust",
    description: "Novus Health was expanding from one clinic to five locations. We delivered a complete brand system covering signage, uniforms, digital templates, and patient communications.",
    challenge: "Novus Health had built a strong reputation at one clinic in Accra, but as they expanded, each location was developing its own look. Signage was inconsistent, staff uniforms varied, and patient-facing communications ranged from professional to amateur.",
    solution: "We conducted brand discovery workshops with clinical staff, patients, and management. The resulting identity system included a refined wordmark, secondary icon mark, a considered colour palette, and comprehensive brand standards covering every touchpoint from waiting room materials to digital appointment reminders.",
    result: "All five locations launched with consistent branding within eight weeks. Patient registrations at new locations exceeded targets. Staff morale improved as the professional identity gave the team pride in their workplace.",
    metrics: [
      { label: "New patient registrations", value: "+89%" },
      { label: "Brand consistency score", value: "9.4/10" },
      { label: "Referral rate increase", value: "+41%" },
    ],
    accent: "bg-amber-50",
    metricBg: "bg-amber-100 text-amber-800",
    featured: false,
  },
  {
    slug: "apex-capital",
    client: "Apex Capital",
    industry: "Investment & Finance",
    location: "London, UK",
    service: "Cortex",
    headline: "AI-powered portfolio briefing system for fund managers",
    description: "Apex Capital needed daily portfolio summaries generated automatically from live market data. We built an AI pipeline that delivers formatted briefs to fund managers every morning.",
    challenge: "Apex Capital managed a multi-asset portfolio focused on African markets. Every morning, two analysts spent three hours aggregating data from Bloomberg terminals and proprietary Excel models to produce a daily briefing. The process was slow and prone to copy-paste errors.",
    solution: "We built a data ingestion pipeline that pulls from 12 sources every morning at 5am. An AI layer applies the scoring model to flag positions of interest, generate plain-language summaries of overnight movements, and highlight risk exposures. The output is a structured PDF brief delivered to fund managers by 7am.",
    result: "Fund managers now receive their brief at 7am without analyst involvement. The two analysts who previously spent mornings on data gathering now focus entirely on research and client work. The reports are described by the team as more consistent than the manual versions.",
    metrics: [
      { label: "Analyst hours saved/week", value: "28" },
      { label: "Report generation time", value: "4 min" },
      { label: "Data sources integrated", value: "12" },
    ],
    accent: "bg-prescript-green-light",
    metricBg: "bg-prescript-green-light text-prescript-green-dark",
    featured: false,
  },
]

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return CASES.find(c => c.slug === slug)
}

export function getFeaturedCases(): CaseStudy[] {
  return CASES.filter(c => c.featured)
}
