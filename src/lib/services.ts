export interface ServiceMeta {
  from: string
  turnaround: string
  thirdLabel: string
  thirdValue: string
}

export interface Deliverable {
  title: string
  description: string
}

export interface ProcessStep {
  title: string
  description: string
}

export interface Investment {
  price: string
  note: string
}

export interface NextService {
  name: string
  slug: string
  teaser: string
}

export interface Service {
  slug: string
  name: string
  fullName: string
  icon: string
  seriesNum: string
  isCoreService: boolean
  accentBg: string
  accentText: string
  tagline: string
  description: string
  meta: ServiceMeta
  deliverables: Deliverable[]
  process: ProcessStep[]
  tools: string[]
  results: string[]
  investment: Investment
  nextService: NextService
}

export const SERVICES: Service[] = [
  {
    slug: 'imprint',
    name: 'Imprint',
    fullName: 'Branding & Creative',
    icon: '✦',
    seriesNum: '01',
    isCoreService: false,
    accentBg: '#FAEEDA',
    accentText: '#633806',
    tagline: 'Brand identities that make businesses look world-class.',
    description:
      'Imprint is where your brand is born. We craft visual identities, content systems, and creative assets that communicate authority and trust — from your first logo to your full brand guide. Every deliverable is built to scale across digital and physical touchpoints globally.',
    meta: {
      from: '$500',
      turnaround: '7–14 days',
      thirdLabel: 'Retainer',
      thirdValue: '$400/mo',
    },
    deliverables: [
      {
        title: 'Brand Identity System',
        description:
          'Logo suite, color palette, typography, brand guide — a complete visual system that travels across every touchpoint.',
      },
      {
        title: 'Content Creation',
        description:
          'Social graphics, carousels, banners, and marketing collateral that are on-brand every time.',
      },
      {
        title: 'Video Production',
        description:
          'Brand intros, product showcases, and reels that stop the scroll and communicate value fast.',
      },
      {
        title: 'Brand Messaging',
        description:
          'Tagline, voice guide, elevator pitch, and messaging framework — so every word represents your brand.',
      },
      {
        title: 'Packaging & Print',
        description:
          'Business cards, letterheads, and product packaging that make the right impression offline.',
      },
    ],
    process: [
      {
        title: 'Discovery',
        description:
          'We start by understanding your business, audience, competitors, and goals through a structured intake session.',
      },
      {
        title: 'Concept Development',
        description:
          'We develop 2–3 creative directions based on discovery insights, presenting mood boards and initial concepts.',
      },
      {
        title: 'Design & Refinement',
        description:
          'You choose a direction and we refine it through feedback rounds until every element is polished and intentional.',
      },
      {
        title: 'Delivery & Handoff',
        description:
          'Final files delivered in all formats (PNG, SVG, PDF) with a full brand guide and usage documentation.',
      },
    ],
    tools: [
      'Adobe Illustrator',
      'Figma',
      'Photoshop',
      'Premiere Pro',
      'After Effects',
      'Canva Pro',
    ],
    results: [
      'A consistent, professional brand presence',
      'Increased audience trust and recognition',
      '30+ days of ready-to-publish content',
      'A brand system built for global markets',
    ],
    investment: {
      price: '$500+',
      note: 'Retainer available from $400/mo for ongoing content and brand support.',
    },
    nextService: {
      name: 'Forge',
      slug: 'forge',
      teaser:
        'Once your brand is set, Forge builds the digital infrastructure — website, CRM, email, and more.',
    },
  },
  {
    slug: 'forge',
    name: 'Forge',
    fullName: 'Digital & Tech Platforms',
    icon: '◈',
    seriesNum: '02',
    isCoreService: false,
    accentBg: '#E6F1FB',
    accentText: '#0C447C',
    tagline: 'Your full digital infrastructure — built to last.',
    description:
      "Forge is your complete digital build-out. We design and develop websites, mobile apps, eCommerce stores, and integrate your CRM, email systems, and cloud hosting. Every platform we build is mobile-first, SEO-optimized, and ready to scale — whether you're in Lagos, London, or Los Angeles.",
    meta: {
      from: '$800',
      turnaround: '14–45 days',
      thirdLabel: 'Free Support',
      thirdValue: '30 days',
    },
    deliverables: [
      {
        title: 'Website Development',
        description:
          'WordPress, Webflow, or React/Next.js. Mobile-first, SEO-optimized, and built for performance.',
      },
      {
        title: 'Mobile App Development',
        description:
          'React Native or Flutter apps for iOS and Android — from MVP to full product.',
      },
      {
        title: 'eCommerce Stores',
        description:
          'Shopify or WooCommerce stores with Paystack, Stripe, and Flutterwave payment integrations.',
      },
      {
        title: 'Email & Domain Setup',
        description:
          'Google Workspace setup, SPF/DKIM configuration, professional email for your whole team.',
      },
      {
        title: 'CRM Implementation',
        description:
          'GoHighLevel, HubSpot, or Zoho — configured, customized, and ready to capture and close leads.',
      },
    ],
    process: [
      {
        title: 'Requirements & Wireframes',
        description:
          'We map out every page, feature, and integration before touching a line of code.',
      },
      {
        title: 'Design Mockups',
        description:
          'High-fidelity Figma mockups for every screen — reviewed and approved before build begins.',
      },
      {
        title: 'Build & Test',
        description:
          'Full development with QA testing across devices and browsers to ensure a flawless launch.',
      },
      {
        title: 'Launch & Handover',
        description:
          'We deploy, configure DNS, and hand over full ownership with documentation and a 30-day support window.',
      },
    ],
    tools: [
      'WordPress',
      'React',
      'Next.js',
      'Webflow',
      'Shopify',
      'React Native',
      'Flutter',
      'Paystack',
      'AWS',
      'Vercel',
    ],
    results: [
      'A live, professional digital presence in 30 days',
      'Mobile-optimized across all devices',
      'Integrated payment processing',
      'Full ownership of your platform',
    ],
    investment: {
      price: '$800+',
      note: 'Websites from $800. eCommerce from $1,500. Mobile apps from $3,000. 30-day free support included.',
    },
    nextService: {
      name: 'Surge',
      slug: 'surge',
      teaser:
        'With your platform live, Surge drives the traffic — ads, social, email, and outdoor marketing.',
    },
  },
  {
    slug: 'surge',
    name: 'Surge',
    fullName: 'Digital Marketing',
    icon: '◉',
    seriesNum: '03',
    isCoreService: false,
    accentBg: '#E1F5EE',
    accentText: '#085041',
    tagline: 'Drive consistent, qualified traffic to your business.',
    description:
      'Surge is your full-stack digital marketing engine. We run Meta and Google Ads, manage your social media presence, execute email marketing, and handle outdoor/indoor campaigns in Nigeria. Every campaign is data-driven, built for your audience, and optimized monthly for maximum ROI.',
    meta: {
      from: '$500/mo',
      turnaround: '3-month minimum',
      thirdLabel: 'Reporting',
      thirdValue: 'Monthly',
    },
    deliverables: [
      {
        title: 'Meta Ads (Facebook & Instagram)',
        description:
          'Campaign setup, audience targeting, creative production, A/B testing, and ongoing optimization.',
      },
      {
        title: 'Google Ads',
        description:
          'Search, display, and YouTube campaigns with keyword research, conversion tracking, and bid management.',
      },
      {
        title: 'Social Media Management',
        description:
          'Content calendar, scheduling, community management across Instagram, LinkedIn, and X.',
      },
      {
        title: 'Email Marketing',
        description:
          'List management, 2 campaigns per month, and automated sequences that nurture leads to purchase.',
      },
      {
        title: 'Outdoor & Indoor Marketing',
        description:
          'Billboards, flyers, event branding, and physical marketing activations across Nigeria.',
      },
    ],
    process: [
      {
        title: 'Audit & 90-Day Strategy',
        description:
          'We audit your current presence and build a 90-day marketing strategy tailored to your goals and market.',
      },
      {
        title: 'Setup & Launch',
        description:
          'Weeks 1–2: account setup, pixel installation, creative production, and campaign launch.',
      },
      {
        title: 'Optimize & Scale',
        description:
          'Monthly: performance review, budget reallocation, creative refresh, and scaling winning campaigns.',
      },
      {
        title: 'Report & Align',
        description:
          'Monthly performance report with clear attribution, insights, and the plan for the next month.',
      },
    ],
    tools: [
      'Meta Ads Manager',
      'Google Ads',
      'GoHighLevel',
      'Mailchimp',
      'ActiveCampaign',
      'Buffer',
      'Google Analytics',
    ],
    results: [
      'Consistent stream of qualified leads',
      'Reduced cost per acquisition over time',
      'Growing email and audience lists',
      'Clear attribution across every channel',
    ],
    investment: {
      price: '$500/mo',
      note: 'Social media only from $500/mo. Full Surge (ads + social + email) from $2,000/mo.',
    },
    nextService: {
      name: 'Flow',
      slug: 'flow',
      teaser:
        'As leads come in through Surge, Flow automates the follow-up — so no lead ever slips through the cracks.',
    },
  },
  {
    slug: 'flow',
    name: 'Flow',
    fullName: 'Business Automation',
    icon: '⟳',
    seriesNum: '04',
    isCoreService: true,
    accentBg: '#EEEDFE',
    accentText: '#3C3489',
    tagline: 'Eliminate manual work. Let your business run itself.',
    description:
      'Flow maps your operations and automates the repetitive. CRM workflows, payment sequences, lead follow-ups, onboarding, and WhatsApp automations — we build the systems that keep your business running while you focus on growth. Flow is our core service because without it, every other service underperforms.',
    meta: {
      from: '$1,200',
      turnaround: '1–3 weeks',
      thirdLabel: 'Retainer',
      thirdValue: '$500/mo',
    },
    deliverables: [
      {
        title: 'Business Process Audit',
        description:
          'Full workflow mapping and bottleneck identification — we find exactly where time and money are being lost.',
      },
      {
        title: 'Software Integration',
        description:
          'CRM, email, payments, accounting, and communication tools connected into one seamless system.',
      },
      {
        title: 'Lead & Sales Automation',
        description:
          'Follow-up sequences, lead scoring, pipeline triggers, and automated proposal delivery.',
      },
      {
        title: 'Operations Automation',
        description:
          'Invoices, client onboarding, portals, and task assignments — all running without manual input.',
      },
      {
        title: 'WhatsApp & Messaging Automation',
        description:
          'Auto-responses, order updates, appointment reminders, and broadcast messaging at scale.',
      },
    ],
    process: [
      {
        title: 'Process Discovery Session',
        description:
          'A deep-dive call to map every workflow, tool, and touchpoint in your current operation.',
      },
      {
        title: 'Automation Blueprint',
        description:
          'We design the full automation architecture — every trigger, action, and integration documented.',
      },
      {
        title: 'Build & Test',
        description:
          'We build and test each automation with real data before anything goes live in your business.',
      },
      {
        title: 'Handover & Training',
        description:
          'Full handover with video documentation and a live training session so your team can manage it.',
      },
    ],
    tools: [
      'Make (Integromat)',
      'n8n',
      'Zapier',
      'GoHighLevel',
      'Airtable',
      'Notion',
      'WhatsApp Business API',
      'Paystack',
    ],
    results: [
      '20–30 hours saved per week',
      'Zero leads lost to slow follow-up',
      'Faster client onboarding',
      'Business operates without you in every detail',
    ],
    investment: {
      price: '$1,200+',
      note: 'Single workflow from $400. Full automation package from $1,200. Ongoing support from $500/mo.',
    },
    nextService: {
      name: 'Cortex',
      slug: 'cortex',
      teaser:
        'Flow automates your workflows — Cortex deploys AI agents that think, respond, and act inside them.',
    },
  },
  {
    slug: 'cortex',
    name: 'Cortex',
    fullName: 'Agentic AI Deployment',
    icon: '◆',
    seriesNum: '05',
    isCoreService: true,
    accentBg: '#E1F5EE',
    accentText: '#085041',
    tagline: 'AI agents deployed inside your business — working 24/7.',
    description:
      'Cortex is our deepest core. We design, train, and deploy AI agents directly into your business systems — handling customer support, qualifying leads, booking appointments, and running intelligent workflows around the clock. Cortex agents are trained on your business knowledge and integrated with your CRM, WhatsApp, and operations stack.',
    meta: {
      from: '$2,000',
      turnaround: '2–4 weeks',
      thirdLabel: 'Management',
      thirdValue: '$300/mo',
    },
    deliverables: [
      {
        title: 'AI Customer Service Agent',
        description:
          'Trained on your business knowledge base, handles FAQs, complaints, and support queries 24/7 without human intervention.',
      },
      {
        title: 'AI Lead Qualification Agent',
        description:
          'Engages incoming leads, scores them based on your criteria, and books calls only for warm, qualified prospects.',
      },
      {
        title: 'AI Scheduling & Booking Agent',
        description:
          'Manages appointment booking, sends reminders, handles reschedules, and syncs with your calendar automatically.',
      },
      {
        title: 'Custom AI Workflow',
        description:
          'Bespoke AI systems built for your unique operations — from internal knowledge assistants to automated reporting.',
      },
      {
        title: 'Cortex-to-CRM Integration',
        description:
          'Every AI interaction is logged, tagged, and synced to your CRM — full visibility into every conversation.',
      },
    ],
    process: [
      {
        title: 'AI Opportunity Audit',
        description:
          'We identify every point in your business where an AI agent can save time, increase speed, or capture more revenue.',
      },
      {
        title: 'Agent Design & Training',
        description:
          'We design the agent personality, knowledge base, and response logic — trained on your actual business data.',
      },
      {
        title: 'Integration & Testing',
        description:
          'The agent is connected to your CRM, WhatsApp, website, and other systems and stress-tested before going live.',
      },
      {
        title: 'Live Monitoring',
        description:
          'We monitor agent performance post-launch and iterate based on real conversation data and your feedback.',
      },
    ],
    tools: [
      'Claude API',
      'OpenAI GPT-4',
      'Voiceflow',
      'Botpress',
      'n8n',
      'Make',
      'WhatsApp Business API',
      'GoHighLevel',
    ],
    results: [
      '24/7 lead engagement — no more missed enquiries',
      'Response in seconds, not hours',
      'Only warm, qualified leads reach your team',
      'Scales to thousands of conversations simultaneously',
    ],
    investment: {
      price: '$2,000+',
      note: 'Single agent deployment from $2,000. Monthly management from $300/mo. Enterprise pricing on request.',
    },
    nextService: {
      name: 'AI Business System',
      slug: 'pricing',
      teaser:
        'Ready to bring all five services together? The AI Business System packages everything into one integrated engagement.',
    },
  },
]
