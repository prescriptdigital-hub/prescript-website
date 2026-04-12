# Prescript Digital Solutions — Full Website Project Specification

## Project Overview

**Company:** Prescript Digital Solutions  
**Location:** Lagos, Nigeria  
**Markets Served:** Nigeria, Pan-Africa, North America, Europe  
**Tagline:** We Build, Automate & Deploy AI Into Businesses  
**Brand Color:** #1D9E75 (Prescript Green)  
**Brand Accent Light:** #E1F5EE  
**Brand Accent Dark:** #085041

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Syne (headings, weight 700/800) + DM Sans (body, weight 300/400/500) — via Google Fonts
- **Icons:** Lucide React
- **Animations:** Framer Motion (subtle scroll reveals, hover effects)
- **Forms:** React Hook Form
- **Deployment Ready:** Vercel

---

## Brand & Design System

### Colors
```
Primary Green:     #1D9E75
Light Green:       #E1F5EE
Dark Green:        #085041
Mid Green:         #0F6E56
Amber Accent:      #FAEEDA / #633806 (text on amber)
Blue Accent:       #E6F1FB / #0C447C (text on blue)
Purple Accent:     #EEEDFE / #3C3489 (text on purple)
```

### Typography
- **Display/Headings:** `Syne`, weight 800, letter-spacing tight (-0.03em)
- **Subheadings:** `Syne`, weight 700
- **Body:** `DM Sans`, weight 300 (light) for paragraphs, 400 normal, 500 medium for labels
- **Service Names (Imprint, Forge etc):** Syne 800, colored #1D9E75

### Design Principles
- Clean, minimal, whitespace-generous
- Service names always styled in green (#1D9E75)
- Section labels: uppercase, letter-spacing wide, small, green
- Cards: white bg, subtle border (1px rgba border), 12px border radius
- Featured/highlighted cards: 1.5px solid #1D9E75 border
- Buttons: primary = green fill (#1D9E75), secondary = outline
- No excessive shadows — flat and clean

---

## Site Architecture

```
/                    → Home page
/services/imprint    → Imprint service page (Branding & Creative)
/services/forge      → Forge service page (Digital & Tech Platforms)
/services/surge      → Surge service page (Digital Marketing)
/services/flow       → Flow service page (Business Automation)
/services/cortex     → Cortex service page (Agentic AI Deployment)
/pricing             → One-time packages pricing page
/subscriptions       → Monthly subscription plans
/contact             → Contact / book a call page
```

---

## Service Names (CRITICAL — use these everywhere)

| Service Name | Full Description | Icon Symbol | Accent Color |
|---|---|---|---|
| **Imprint** | Branding & Creative | ✦ | Amber #FAEEDA |
| **Forge** | Digital & Tech Platforms | ◈ | Blue #E6F1FB |
| **Surge** | Digital Marketing | ◉ | Green #E1F5EE |
| **Flow** | Business Automation | ⟳ | Purple #EEEDFE |
| **Cortex** | Agentic AI Deployment | ◆ | Green #E1F5EE |

---

## Page Specifications

---

### 1. HOME PAGE (`/`)

#### Navigation (Sticky)
- Left: Logo "PRESCRIPT." with green dot/period
- Center: Nav links → Imprint | Forge | Surge | Flow | Cortex | Pricing | Subscriptions
- Right: CTA button "Book a Free Call" (green filled)

#### Hero Section
- Chip tag: "Nigeria · Africa · America · Europe" with green dot
- H1: "We Build, Automate &" + line break + "Deploy AI Into Businesses" (AI in green)
- Subtext: "Five focused services. One integrated system. Prescript delivers the full digital infrastructure your business needs to scale globally — from brand identity to deployed AI agents."
- CTA buttons: "See Packages & Pricing" (primary) + "Explore Services" (outline)
- Service Strip (below hero, bordered row of 5):
  - Each strip item shows: Service Name (green, Syne 800) + subtitle in small gray text
  - Clickable, routes to service page
  - Items: Imprint/Branding & Creative | Forge/Digital & Tech Platforms | Surge/Digital Marketing | Flow/Business Automation | Cortex/Agentic AI Deployment

#### Stats Bar (4 columns, bordered)
- 5 — Focused services
- 3 — Continents served
- AI — At our core
- 24/7 — Agent uptime

#### Services Section
- Label: "Our services"
- Title: "Five Services. One Partner."
- Sub: "From your first logo to your first AI agent — we handle every layer of your digital business, and each service feeds the next."
- Market pills (flags): 🇳🇬 Nigeria | 🌍 Pan-Africa | 🇺🇸 North America | 🇪🇺 Europe
- 5-column card grid (wraps on mobile):
  - Each card: accent icon, Service Name (green), full name (small gray), description, "From $X" pill
  - Cards are clickable → route to service page
  - IMPRINT: "Brand identities, graphic design, content creation, and video production that make businesses look world-class." From $500
  - FORGE: "Web and mobile app development, email setup, DevOps, eCommerce, and CRM — your full digital infrastructure." From $800
  - SURGE: "Meta Ads, Google Ads, social media management, email marketing campaigns, and outdoor/indoor strategies." From $500/mo
  - FLOW: "We map your operations then eliminate manual work — CRM automations, payment flows, integrations, and sequences." From $1,200
  - CORTEX: "We build and deploy AI agents into your business systems — sales, support, scheduling, and intelligent workflows." Our core offer

#### Packages Preview Section
- Label: "Packages"
- Title: "Three ways to start."
- Sub: "Every package stacks our five services into one clear engagement. Start where you are, scale as you grow."
- 3 offer cards:
  1. **Digital Foundation** — $1,500 one-time — For new brands. Includes Imprint + Forge. Features: brand identity, 5-page website, email setup, CRM, WhatsApp, content calendar
  2. **Growth Engine** (FEATURED — green border, "Most Popular" badge) — $2,000/month — Includes Surge + Flow. Features: social media 3 platforms, Meta + Google Ads, 2 email campaigns/mo, WhatsApp automation, CRM automation, monthly report
  3. **AI Business System** — $5,000 setup + $1,500/mo — Full stack, all five services. Features: business process audit, Flow automation, Cortex AI agent, CRM + eCommerce, Growth Engine included, dedicated manager

#### Why Prescript Section (4 cards)
- 01 — Five services, one partner
- 02 — Flow-first by default
- 03 — Cortex at our core
- 04 — 3-continent experience

#### CTA / Contact Section (light bg)
- Title: "Your business deserves a digital team that actually delivers"
- "Imprint" in green inline
- Form fields: Full name | Business email | WhatsApp number | Dropdown (which service needed most: Imprint/Forge/Surge/Flow/Cortex/Full Package)
- Button: "Book My Free Strategy Call →"
- Note: "No commitment. We respond within 24 hours."

#### Footer
- Left: PRESCRIPT. logo
- Center: © 2025 Prescript Digital Solutions · Lagos, Nigeria
- Right: Instagram | LinkedIn | WhatsApp links

---

### 2. SERVICE PAGES (pattern — same layout for all 5)

**Route pattern:** `/services/[slug]` where slug = imprint | forge | surge | flow | cortex

Each service page layout:

#### Hero
- Back link: "← Back to home"
- Large icon (emoji in accent-colored rounded box)
- Series label: "Prescript · Service 0X of 05 · [badge if core]"
- LARGE service name (Syne 800, ~3rem, green)
- Full name in small gray
- Description paragraph
- Meta row: Starting From | Turnaround | [Third metric]

#### Body (2-column: main + sidebar)

**Main column:**
- "What [Service] delivers" — list of 5 deliverable items
  - Each item: accent icon box + title + description
- "How [Service] works" — numbered process steps (4 steps)

**Sidebar:**
- Investment card: price + note + 2 buttons (Start / Ask a question)
- Tools we use: pill tags
- What you walk away with: checkmark list
- "Next: pair with [Next Service]" card (green border) → link to next service

---

#### IMPRINT Service Data
- Series: Service 01
- Meta: From $500 | 7–14 days | Retainer option $400/mo
- Deliverables:
  1. Brand Identity System — Logo suite, color palette, typography, brand guide
  2. Content Creation — Social graphics, carousels, banners, marketing collateral
  3. Video Production — Brand intros, product showcases, reels
  4. Brand Messaging — Tagline, voice guide, elevator pitch, messaging framework
  5. Packaging & Print — Business cards, letterheads, product packaging
- Process: Discovery → Concept Development → Design & Refinement → Delivery & Handoff
- Tools: Adobe Illustrator, Figma, Photoshop, Premiere Pro, After Effects, Canva Pro
- Results: Consistent brand, increased trust, 30+ days content, global-ready brand
- Investment: $500+, retainer from $400/mo
- Next service: Forge

#### FORGE Service Data
- Series: Service 02
- Meta: From $800 | 14–45 days | 30 days free support
- Deliverables:
  1. Website Development — WordPress, Webflow, or React. Mobile-first, SEO-optimized
  2. Mobile App Development — React Native or Flutter, iOS + Android
  3. eCommerce Stores — Shopify/WooCommerce with Paystack, Stripe, Flutterwave
  4. Email & Domain Setup — Google Workspace, SPF/DKIM
  5. CRM Implementation — GoHighLevel, HubSpot, or Zoho
  6. DevOps & Hosting — AWS, Vercel, cPanel, SSL
- Process: Requirements & Wireframes → Design Mockups (Figma) → Build & Test → Launch & Handover
- Tools: WordPress, React, Next.js, Webflow, Shopify, React Native, Flutter, Paystack, AWS, Vercel
- Results: Live presence in 30 days, mobile-optimized, integrated payments, full ownership
- Investment: $800+ (site), $1,500+ (eCommerce), $3,000+ (apps)
- Next service: Surge

#### SURGE Service Data
- Series: Service 03
- Meta: From $500/mo | 3-month minimum | Monthly reporting
- Deliverables:
  1. Meta Ads (Facebook & Instagram) — Campaign setup, targeting, creatives, A/B testing, optimization
  2. Google Ads — Search, display, YouTube. Keyword research, conversion tracking
  3. Social Media Management — Content calendar, scheduling, community management (Instagram, LinkedIn, X)
  4. Email Marketing — List management, 2 campaigns/month, automated sequences
  5. Outdoor & Indoor Marketing — Billboards, flyers, event branding, physical marketing (Nigeria)
- Process: Audit & 90-Day Strategy → Setup & Launch (Week 1–2) → Optimize & Scale (Monthly)
- Tools: Meta Ads Manager, Google Ads, GoHighLevel, Mailchimp, ActiveCampaign, Buffer, Google Analytics
- Results: Consistent qualified leads, reduced CPA, growing lists, clear attribution
- Investment: $500/mo (social only), $2,000/mo (full Surge)
- Next service: Flow

#### FLOW Service Data
- Series: Service 04 · Our Core
- Meta: From $1,200 | 1–3 weeks | $500/mo retainer
- Deliverables:
  1. Business Process Audit — Full workflow mapping, bottleneck identification
  2. Software Integration — CRM, email, payments, accounting, communication tools
  3. Lead & Sales Automation — Follow-up sequences, lead scoring, pipeline triggers, proposals
  4. Operations Automation — Invoices, onboarding, client portals, task assignments
  5. WhatsApp & Messaging Automation — Auto-responses, order updates, reminders, broadcasts
- Process: Process Discovery Session → Automation Blueprint → Build & Test → Handover & Training
- Tools: Make (Integromat), n8n, Zapier, GoHighLevel, Airtable, Notion, WhatsApp API, Paystack
- Results: 20–30 hrs saved/week, zero leads lost, faster onboarding, business runs without you
- Investment: $400 (single workflow), $1,200+ (full package), $500/mo support
- Next service: Cortex

#### CORTEX Service Data
- Series: Service 05 · Our Deepest Core
- Meta: From $2,000 | 2–4 weeks deployment | From $300/mo
- Deliverables:
  1. AI Customer Service Agent — Trained on business knowledge, handles FAQs and support 24/7
  2. AI Lead Qualification Agent — Engages leads, scores them, books calls for warm prospects only
  3. AI Scheduling & Booking Agent — Appointment management, reminders, reschedules
  4. Custom AI Workflow — Bespoke AI systems for unique operations
  5. Cortex-to-CRM Integration — Every AI interaction logged and synced to CRM
- Process: AI Opportunity Audit → Agent Design & Training → Integration & Testing → Live Monitoring
- Tools: Claude API, OpenAI GPT-4, Voiceflow, Botpress, n8n, Make, WhatsApp Business API, GoHighLevel
- Results: 24/7 lead engagement, response in seconds not hours, only warm leads reach team, scales to 1000s
- Investment: $2,000+ (single agent), $300/mo management, enterprise custom
- Next service: Pricing (AI Business System)

---

### 3. PRICING PAGE (`/pricing`)

#### Header
- Label: "Transparent pricing"
- Title: "Invest in what grows your business."
- Sub: "No hidden fees. No lock-ins beyond 3-month minimums on retainers."
- Currency toggle: USD ($) | NGN (₦) — default USD, NGN at ₦1,600/$1

#### Three Pricing Cards

**1. Digital Foundation** — $1,500 one-time
- For new brands. Includes Imprint + Forge essentials
- Included: Imprint (brand identity + guide), Forge (5-page website), business email, CRM (GoHighLevel), WhatsApp, 1-month content calendar
- Not included: Surge ad management, Flow automations, Cortex AI
- Button: "Get Started" (outline)

**2. Growth Engine** (FEATURED — green border, "Most Popular" badge)
- $2,000/month
- For growing businesses. Includes Surge + Flow
- Included: Surge (social 3 platforms), Surge (Meta + Google Ads), Surge (2 emails/mo), Flow (WhatsApp automation), Flow (basic CRM automation), monthly report + strategy call, ad creative production
- Not included: Custom Flow workflows, Cortex AI agent
- Button: "Start Growing" (green filled)

**3. AI Business System** — $5,000 setup + $1,500/mo
- Full stack — all five: Imprint, Forge, Surge, Flow + Cortex
- Included: Business process audit, Flow custom workflows, Cortex AI agent, CRM + eCommerce integration, full Growth Engine, monthly optimization, priority support (24hr), dedicated account manager, quarterly strategy sessions
- Button: "Book Strategy Call" (outline)

#### Add-On Services (grid of 6)
1. Extra Cortex Agent — $800 + $300/mo — Second AI agent added to any package
2. GoHighLevel White-Label — $150/mo per account — Resell Prescript CRM under your brand
3. Surge Content Pack — $600/mo — 30 graphics + 4 reels/month
4. Flow + Cortex Workshop — $300/session — Virtual AI automation training
5. Forge eCommerce — $1,500 one-time — Full Shopify/WooCommerce store
6. Surge SEO — $500/mo — On-page SEO, blog content, ranking reports

#### FAQ (expandable accordion — 5 questions)
1. Do you require a contract?
2. Can Nigerian businesses pay in Naira?
3. How quickly does Surge generate results?
4. Can I start with one service and stack more later?
5. What makes Cortex different from a chatbot?

---

### 4. SUBSCRIPTIONS PAGE (`/subscriptions`)

#### Intro
- Label: "Subscription Plans · New"
- Title: "World-class services. Monthly. No big upfront."
- Toggle: Monthly | Annual (save 17%)
- Currency toggle: USD | NGN

#### Two Tracks

**Track A: Personal Brand Subscriptions**

| Plan | Monthly USD | Annual USD | Monthly NGN |
|---|---|---|---|
| Seed | $49 | $41 | ₦78,400 |
| Bloom (Popular) | $149 | $124 | ₦238,400 |
| Authority | $349 | $290 | ₦558,400 |

**Seed Plan ($49/mo)**
- Services: Imprint only
- 8 branded social graphics/month
- Basic brand kit (logo, colors, fonts)
- 1 social platform content calendar
- WhatsApp Business profile setup
- Monthly check-in message

**Bloom Plan ($149/mo) — Most Popular Personal**
- Services: Imprint + Surge
- 16 branded graphics + 2 reels/month
- Full brand kit + monthly refresh
- 2 social platforms managed
- 1 email campaign/month
- Basic Meta Ads setup (client funds ads)
- Monthly performance report
- WhatsApp support line

**Authority Plan ($349/mo)**
- Services: Imprint + Surge + Flow + Cortex
- 20 graphics + 4 reels + 1 video/month
- 3 social platforms managed
- Meta + Google Ads management
- 2 email campaigns/month
- Flow — 2 automation workflows
- Cortex — 1 AI DM/booking agent
- Monthly strategy call (30 mins)
- Priority WhatsApp support

---

**Track B: Business Subscriptions**

| Plan | Monthly USD | Annual USD | Monthly NGN |
|---|---|---|---|
| Launch | $199 | $165 | ₦318,400 |
| Build | $499 | $415 | ₦798,400 |
| Scale (Popular) | $999 | $832 | ₦1,598,400 |
| Command | $1,800 | $1,500 | ₦2,880,000 |

**Launch Plan ($199/mo)**
- Services: Imprint + Surge
- 12 graphics + 2 reels/month
- 2 social platforms managed
- 1 email campaign/month
- WhatsApp Business auto-reply
- Monthly performance report

**Build Plan ($499/mo)**
- Services: Imprint + Surge + Flow
- 16 graphics + 4 reels/month
- 3 social platforms managed
- Meta Ads management (client funds ads)
- 2 email campaigns/month
- Flow — 2 automations (leads + onboarding)
- WhatsApp automation flows
- Monthly report + strategy call

**Scale Plan ($999/mo) — Most Popular Business**
- Services: Imprint + Surge + Flow + Cortex
- 20 graphics + 6 reels + 1 video/month
- 3 platforms + Meta & Google Ads
- 2 email campaigns + list management
- Flow — 4 custom automation workflows
- Cortex — 1 AI agent (support or sales)
- CRM pipeline setup + management
- Monthly strategy call (60 mins)
- Priority WhatsApp support (12hr response)

**Command Plan ($1,800/mo)**
- Services: Imprint + Surge + Flow + Cortex (enterprise tier)
- Everything in Scale PLUS:
- Unlimited content creation requests
- Cortex — up to 3 AI agents deployed
- Flow — unlimited workflow builds
- eCommerce management included
- Dedicated account manager
- Weekly strategy calls
- Priority support (4hr response)
- Quarterly business growth audit

#### Comparison Table
Full feature comparison table showing all 7 plans (3 personal + 4 business) side by side

#### What every subscriber gets (4 features)
1. WhatsApp Support Line — 24hr response
2. Monthly Report — clear performance update
3. Upgrade Anytime — no penalties
4. Cancel After 3 Months — 30 days notice

---

### 5. CONTACT PAGE (`/contact`)

#### Form
- Full name (required)
- Business email (required)
- WhatsApp number (required)
- Company name (optional)
- Dropdown: Which service? (Imprint / Forge / Surge / Flow / Cortex / Subscription / Full Package)
- Budget range dropdown: Under $500 / $500–$1,500 / $1,500–$5,000 / $5,000+ / Let's discuss
- Message textarea
- Submit button: "Book My Free Strategy Call →"

#### Side panel
- "We respond within 24 hours"
- Lagos, Nigeria timezone (WAT, UTC+1)
- WhatsApp: direct link
- Email: hello@prescriptdigital.com
- Instagram: @prescriptdigital
- LinkedIn: /company/prescriptdigital

---

## Component Architecture

```
src/
├── app/
│   ├── layout.tsx              (root layout, font imports)
│   ├── page.tsx                (home page)
│   ├── services/
│   │   └── [slug]/
│   │       └── page.tsx        (dynamic service page)
│   ├── pricing/
│   │   └── page.tsx
│   ├── subscriptions/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ServiceStrip.tsx
│   │   ├── StatsBar.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── PackagesPreview.tsx
│   │   ├── WhyPreScript.tsx
│   │   └── ContactCTA.tsx
│   ├── services/
│   │   ├── ServiceHero.tsx
│   │   ├── ServiceBody.tsx
│   │   ├── DeliverableItem.tsx
│   │   ├── ProcessStep.tsx
│   │   └── ServiceSidebar.tsx
│   ├── pricing/
│   │   ├── PricingCard.tsx
│   │   ├── AddonGrid.tsx
│   │   ├── CurrencyToggle.tsx
│   │   └── FAQAccordion.tsx
│   ├── subscriptions/
│   │   ├── PlanCard.tsx
│   │   ├── BillingToggle.tsx
│   │   ├── TrackToggle.tsx
│   │   └── ComparisonTable.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── ServiceTag.tsx
│       ├── SectionLabel.tsx
│       └── MarketPill.tsx
├── lib/
│   └── services.ts             (all service data)
└── styles/
    └── globals.css
```

---

## Data File: `lib/services.ts`

Export a `SERVICES` array with all 5 service objects. Each object contains:
- slug, name, fullName, tagline, series, isCoreService
- accentColor, accentBg, icon
- meta: { from, turnaround, thirdLabel, thirdValue }
- description (long paragraph)
- deliverables: array of { icon, title, description }
- process: array of { step, title, description }
- tools: string[]
- results: string[]
- investment: { price, note }
- nextService: { name, slug, teaser }

---

## SEO & Metadata

Each page should have proper Next.js metadata:

```typescript
export const metadata = {
  title: "Prescript Digital Solutions | We Build, Automate & Deploy AI Into Businesses",
  description: "Nigeria-based digital agency serving Africa, America & Europe. Imprint, Forge, Surge, Flow & Cortex — five integrated services.",
  keywords: ["digital agency Nigeria", "AI deployment Africa", "business automation Lagos", "branding Nigeria"],
  openGraph: { ... }
}
```

---

## Mobile Responsiveness

- Navbar: hamburger menu on mobile (< 768px), links in drawer
- Service strip: horizontal scroll on mobile
- Stats bar: 2x2 grid on mobile
- Services grid: 1-column on mobile, 2-col on tablet, 5-col on desktop
- Pricing cards: stack vertically on mobile
- Service page body: single column on mobile (sidebar moves below)
- Subscription comparison table: horizontal scroll on mobile

---

## Animations (Framer Motion)

- Hero: staggered fade-in for chip → h1 → subtext → buttons (0.1s delays)
- Service cards: fade-up on scroll (IntersectionObserver or Framer Motion whileInView)
- Stats: count-up animation on scroll into view
- Pricing cards: subtle scale on hover (scale: 1.01)
- Service page deliverables: stagger-in on page load
- Navigation: smooth underline slide on active state

---

## Environment Variables (`.env.local`)

```
NEXT_PUBLIC_WHATSAPP_NUMBER=+2348000000000
NEXT_PUBLIC_EMAIL=hello@prescriptdigital.com
NEXT_PUBLIC_INSTAGRAM=https://instagram.com/prescriptdigital
NEXT_PUBLIC_LINKEDIN=https://linkedin.com/company/prescriptdigital
```

---

## Package.json Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "react-hook-form": "^7.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.0.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

---

## Tailwind Config (Key Customizations)

```javascript
// tailwind.config.ts
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        prescript: {
          green: "#1D9E75",
          "green-light": "#E1F5EE",
          "green-dark": "#085041",
          "green-mid": "#0F6E56",
        }
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
      }
    }
  }
}
```

---

## Key Copy Notes

- Always write **Imprint**, **Forge**, **Surge**, **Flow**, **Cortex** with a capital first letter
- The word "Cortex" should always be followed by context about AI agents — never just "AI"
- Flow is described as "our core" — Cortex is "our deepest core"
- Pricing in NGN is calculated at ₦1,600 per $1
- The company tone is: confident, expert, warm, direct — never corporate-jargon-heavy
- All CTAs should feel actionable: "Deploy Cortex", "Start with Forge", "Start Growing"

---

*End of specification — Version 1.0 | Prescript Digital Solutions*
