export interface PricingFeature {
  text: string
  included: boolean
}

export interface OneTimePackage {
  name: string
  tagline: string
  servicesIncluded: string[]
  price: number
  period: string
  features: PricingFeature[]
  buttonLabel: string
  buttonVariant: 'primary' | 'outline'
  isFeatured: boolean
}

export interface Addon {
  name: string
  description: string
  price: string
}

export interface SubscriptionPlan {
  name: string
  tier: string
  forWhom: string
  priceMonthly: number
  services: string[]
  features: PricingFeature[]
  isFeatured: boolean
  ctaLabel: string
}

export const CURRENCY_RATES: Record<string, number> = {
  usd: 1,
  ngn: 1400,
}

export function formatPrice(
  usdAmount: number,
  currency: 'usd' | 'ngn',
  billing: 'monthly' | 'annual' = 'monthly'
): string {
  const amount = billing === 'annual' ? usdAmount * 10 : usdAmount
  const converted = amount * CURRENCY_RATES[currency]

  if (currency === 'ngn') {
    return `₦${converted.toLocaleString()}`
  }
  if (billing === 'annual') {
    const perMonth = (usdAmount * 10) / 12
    return `$${Math.round(perMonth).toLocaleString()}`
  }
  return `$${usdAmount.toLocaleString()}`
}

export const ONE_TIME_PACKAGES: OneTimePackage[] = [
  {
    name: 'Digital Foundation',
    tagline: 'For new brands entering the digital space.',
    servicesIncluded: ['Imprint', 'Forge'],
    price: 1500,
    period: 'one-time',
    features: [
      { text: 'Brand identity + full guide (Imprint)', included: true },
      { text: '5-page website (Forge)', included: true },
      { text: 'Business email setup (Google Workspace)', included: true },
      { text: 'CRM setup (GoHighLevel)', included: true },
      { text: 'WhatsApp Business integration', included: true },
      { text: '1-month content calendar', included: true },
      { text: 'Surge ad management', included: false },
      { text: 'Flow automations', included: false },
      { text: 'Cortex AI agent', included: false },
    ],
    buttonLabel: 'Get Started',
    buttonVariant: 'outline',
    isFeatured: false,
  },
  {
    name: 'Growth Engine',
    tagline: 'For growing businesses ready to scale.',
    servicesIncluded: ['Surge', 'Flow'],
    price: 2000,
    period: 'per month',
    features: [
      { text: 'Social media — 3 platforms (Surge)', included: true },
      { text: 'Meta + Google Ads management (Surge)', included: true },
      { text: '2 email campaigns/month (Surge)', included: true },
      { text: 'WhatsApp automation (Flow)', included: true },
      { text: 'Basic CRM automation (Flow)', included: true },
      { text: 'Monthly report + strategy call', included: true },
      { text: 'Ad creative production included', included: true },
      { text: 'Custom Flow workflows', included: false },
      { text: 'Cortex AI agent', included: false },
    ],
    buttonLabel: 'Start Growing',
    buttonVariant: 'primary',
    isFeatured: true,
  },
  {
    name: 'AI Business System',
    tagline: 'Full-stack. All five services. Enterprise-grade.',
    servicesIncluded: ['Imprint', 'Forge', 'Surge', 'Flow', 'Cortex'],
    price: 5000,
    period: '$5,000 setup + $1,500/mo',
    features: [
      { text: 'Business process audit', included: true },
      { text: 'Custom Flow workflows', included: true },
      { text: 'Cortex AI agent deployment', included: true },
      { text: 'CRM + eCommerce integration', included: true },
      { text: 'Full Growth Engine included', included: true },
      { text: 'Monthly optimization sessions', included: true },
      { text: 'Priority support (24hr response)', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Quarterly strategy sessions', included: true },
    ],
    buttonLabel: 'Book Strategy Call',
    buttonVariant: 'outline',
    isFeatured: false,
  },
]

export const ADDONS: Addon[] = [
  {
    name: 'Extra Cortex Agent',
    description: 'A second AI agent added to any package or subscription.',
    price: '$800 + $300/mo',
  },
  {
    name: 'GoHighLevel White-Label',
    description: 'Resell Prescript CRM under your own brand.',
    price: '$150/mo per account',
  },
  {
    name: 'Surge Content Pack',
    description: '30 branded graphics + 4 reels produced every month.',
    price: '$600/mo',
  },
  {
    name: 'Flow + Cortex Workshop',
    description: 'Virtual AI automation training session for your team.',
    price: '$300/session',
  },
  {
    name: 'Forge eCommerce',
    description: 'Full Shopify or WooCommerce store build with payment integration.',
    price: '$1,500 one-time',
  },
  {
    name: 'Surge SEO',
    description: 'On-page SEO, blog content, and monthly ranking reports.',
    price: '$500/mo',
  },
]

export const PERSONAL_PLANS: SubscriptionPlan[] = [
  {
    name: 'Seed',
    tier: 'Personal · Tier 1',
    forWhom: 'For individuals starting to build their personal brand online.',
    priceMonthly: 49,
    services: ['imprint'],
    features: [
      { text: '8 branded social graphics/month', included: true },
      { text: 'Basic brand kit (logo, colors, fonts)', included: true },
      { text: '1 social platform content calendar', included: true },
      { text: 'WhatsApp Business profile setup', included: true },
      { text: 'Monthly check-in message', included: true },
      { text: 'Social media management', included: false },
      { text: 'Paid ad management', included: false },
      { text: 'Email marketing', included: false },
      { text: 'AI agent', included: false },
    ],
    isFeatured: false,
    ctaLabel: 'Start with Seed',
  },
  {
    name: 'Bloom',
    tier: 'Personal · Tier 2',
    forWhom: 'For personal brands actively growing their audience and monetizing.',
    priceMonthly: 149,
    services: ['imprint', 'surge'],
    features: [
      { text: '16 branded graphics + 2 reels/month', included: true },
      { text: 'Full brand kit + monthly refresh', included: true },
      { text: '2 social platforms managed', included: true },
      { text: '1 email campaign/month', included: true },
      { text: 'Basic Meta Ads setup (client funds ads)', included: true },
      { text: 'Monthly performance report', included: true },
      { text: 'WhatsApp support line', included: true },
      { text: 'Google Ads', included: false },
      { text: 'AI agent', included: false },
    ],
    isFeatured: true,
    ctaLabel: 'Start with Bloom',
  },
  {
    name: 'Authority',
    tier: 'Personal · Tier 3',
    forWhom: 'For established personal brands scaling across multiple channels.',
    priceMonthly: 349,
    services: ['imprint', 'surge', 'flow', 'cortex'],
    features: [
      { text: '20 graphics + 4 reels + 1 video/month', included: true },
      { text: '3 social platforms managed', included: true },
      { text: 'Meta + Google Ads management', included: true },
      { text: '2 email campaigns/month', included: true },
      { text: 'Flow — 2 automation workflows', included: true },
      { text: 'Cortex — 1 AI DM/booking agent', included: true },
      { text: 'Monthly strategy call (30 mins)', included: true },
      { text: 'Priority WhatsApp support', included: true },
      { text: 'Dedicated account manager', included: false },
    ],
    isFeatured: false,
    ctaLabel: 'Start with Authority',
  },
]

export const BUSINESS_PLANS: SubscriptionPlan[] = [
  {
    name: 'Launch',
    tier: 'Business · Tier 1',
    forWhom: 'For small businesses establishing their digital presence.',
    priceMonthly: 199,
    services: ['imprint', 'surge'],
    features: [
      { text: '12 graphics + 2 reels/month', included: true },
      { text: '2 social platforms managed', included: true },
      { text: '1 email campaign/month', included: true },
      { text: 'WhatsApp Business auto-reply', included: true },
      { text: 'Monthly performance report', included: true },
      { text: 'Paid ad management', included: false },
      { text: 'Flow automations', included: false },
      { text: 'Cortex AI agent', included: false },
    ],
    isFeatured: false,
    ctaLabel: 'Start with Launch',
  },
  {
    name: 'Build',
    tier: 'Business · Tier 2',
    forWhom: 'For growing businesses adding automation to their marketing stack.',
    priceMonthly: 499,
    services: ['imprint', 'surge', 'flow'],
    features: [
      { text: '16 graphics + 4 reels/month', included: true },
      { text: '3 social platforms managed', included: true },
      { text: 'Meta Ads management (client funds ads)', included: true },
      { text: '2 email campaigns/month', included: true },
      { text: 'Flow — 2 automations (leads + onboarding)', included: true },
      { text: 'WhatsApp automation flows', included: true },
      { text: 'Monthly report + strategy call', included: true },
      { text: 'Google Ads', included: false },
      { text: 'Cortex AI agent', included: false },
    ],
    isFeatured: false,
    ctaLabel: 'Start with Build',
  },
  {
    name: 'Scale',
    tier: 'Business · Tier 3',
    forWhom: 'For businesses ready to run on AI-powered systems.',
    priceMonthly: 999,
    services: ['imprint', 'surge', 'flow', 'cortex'],
    features: [
      { text: '20 graphics + 6 reels + 1 video/month', included: true },
      { text: '3 platforms + Meta & Google Ads', included: true },
      { text: '2 email campaigns + list management', included: true },
      { text: 'Flow — 4 custom automation workflows', included: true },
      { text: 'Cortex — 1 AI agent (support or sales)', included: true },
      { text: 'CRM pipeline setup + management', included: true },
      { text: 'Monthly strategy call (60 mins)', included: true },
      { text: 'Priority WhatsApp support (12hr response)', included: true },
      { text: 'Dedicated account manager', included: false },
    ],
    isFeatured: true,
    ctaLabel: 'Start with Scale',
  },
  {
    name: 'Command',
    tier: 'Business · Tier 4',
    forWhom: 'For enterprises running at full capacity with dedicated support.',
    priceMonthly: 1800,
    services: ['imprint', 'surge', 'flow', 'cortex'],
    features: [
      { text: 'Unlimited content creation requests', included: true },
      { text: 'Cortex — up to 3 AI agents deployed', included: true },
      { text: 'Flow — unlimited workflow builds', included: true },
      { text: 'eCommerce management included', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Weekly strategy calls', included: true },
      { text: 'Priority support (4hr response)', included: true },
      { text: 'Quarterly business growth audit', included: true },
      { text: 'Custom SLA available', included: true },
    ],
    isFeatured: false,
    ctaLabel: 'Book a Command Call',
  },
]
