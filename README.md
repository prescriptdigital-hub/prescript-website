# Prescript Digital Solutions — Website

Production-ready Next.js website for Prescript Digital Solutions, a Nigerian digital agency serving Africa, America, and Europe.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Syne + DM Sans (Google Fonts)
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Icons:** Lucide React

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page
│   ├── services/[slug]/page.tsx  # Dynamic service pages (5 routes)
│   ├── pricing/page.tsx          # Pricing page
│   ├── subscriptions/page.tsx    # Subscriptions page
│   └── contact/page.tsx          # Contact page
├── components/
│   ├── layout/                   # Navbar, Footer
│   ├── home/                     # Hero, StatsBar, ServicesGrid, etc.
│   ├── services/                 # ServiceHero, ServiceBody, ServiceSidebar
│   ├── pricing/                  # PricingCard
│   ├── subscriptions/            # PlanCard, ComparisonTable
│   └── ui/                       # Button, SectionLabel, FAQItem, etc.
└── lib/
    ├── services.ts               # All 5 service data objects
    ├── pricing.ts                # Packages, add-ons, subscription plans
    └── constants.ts              # Company info, market pills
```

## Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/services/imprint` | Imprint — Branding & Creative |
| `/services/forge` | Forge — Digital & Tech Platforms |
| `/services/surge` | Surge — Digital Marketing |
| `/services/flow` | Flow — Business Automation |
| `/services/cortex` | Cortex — Agentic AI Deployment |
| `/pricing` | One-time packages + add-ons |
| `/subscriptions` | Monthly subscription plans |
| `/contact` | Contact / book a call |

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=+2348000000000
NEXT_PUBLIC_EMAIL=hello@prescriptdigital.com
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/prescriptdigital
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/company/prescriptdigital
```

## Deployment to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Add environment variables in the Vercel dashboard
5. Deploy — Vercel auto-detects Next.js

```bash
# Or deploy via CLI
npx vercel
```
