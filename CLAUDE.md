# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Prescript Digital Solutions** — a Lagos-based digital agency website serving Nigeria, Pan-Africa, North America, and Europe. The site markets five integrated services: Imprint (Branding), Forge (Tech Platforms), Surge (Marketing), Flow (Automation), and Cortex (AI Deployment).

**Live site:** prescriptdigital.com  
**Deployment:** Cloudflare Pages (static export, auto-deploys from `main` branch on GitHub)  
**Brand color:** `#1D9E75` (Prescript Green) — available as `text-prescript-green`, `bg-prescript-green`, etc.

---

## Commands

```bash
npm run dev      # Start local dev server at http://localhost:3000
npm run build    # Build static export → /out directory
npm run lint     # Run ESLint
```

> `npm run build` produces a static `/out` folder. Cloudflare Pages runs this automatically on each push to `main` — you never deploy manually.

---

## Deployment Architecture

- **Static export:** `output: 'export'` in `next.config.js` — no Node.js server, pure HTML/CSS/JS
- **Cloudflare Pages** builds from source on every `git push` to `main`. The `/out` folder is in `.gitignore`
- **Atomic deployments:** old HTML and new assets are never mixed — eliminates CDN cache/chunk hash mismatch errors
- **Environment variables** are set in Cloudflare Pages → project → Settings → Variables and Secrets (not in `.env.local` for production)
- `trailingSlash: true` ensures consistent URL routing on Cloudflare's static file server

---

## Environment Variables

| Variable | Purpose | Where to set |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for contact form submissions | Cloudflare Pages Variables and Secrets |
| `NEXT_PUBLIC_CRISP_ID` | Crisp live chat Website ID | Cloudflare Pages Variables and Secrets |

Both are optional at build time — the features gracefully degrade if the variables are absent (forms log to console; chat widget doesn't load).

---

## Architecture

### Pages
```
/                        → src/app/page.tsx
/services/[slug]         → src/app/services/[slug]/page.tsx  (imprint|forge|surge|flow|cortex)
/pricing                 → src/app/pricing/page.tsx
/subscriptions           → src/app/subscriptions/page.tsx
/contact                 → src/app/contact/page.tsx
```

### Key Data Files
- **`src/lib/services.ts`** — Single source of truth for all five service definitions (deliverables, process steps, tools, pricing, next-service links). The `SERVICES` array is used by both the home page and dynamic service pages. Any service content edits go here.
- **`src/lib/pricing.ts`** — Pricing card data
- **`src/lib/constants.ts`** — Shared constants (WhatsApp number, social links, etc.)
- **`src/lib/submitForm.ts`** — Web3Forms submission function used by all contact forms

### Component Structure
```
src/components/
├── layout/         Navbar, Footer
├── home/           Hero, ServiceStrip, StatsBar, ServicesGrid, PackagesPreview, WhyPreScript, ContactCTA
├── services/       ServiceHero, ServiceBody, ServiceSidebar, DeliverableItem, ProcessStep
├── pricing/        PricingCard, AddonGrid, CurrencyToggle, FAQAccordion
├── subscriptions/  PlanCard, BillingToggle, TrackToggle, ComparisonTable
└── ui/             Button, ServiceTag, SectionLabel, MarketPill
```

### Dynamic Service Pages
`/services/[slug]` uses `generateStaticParams()` to pre-render all five service pages at build time. The slug must match one of the five service slugs in `SERVICES` or the page returns `notFound()`.

---

## Design System

### Typography
- **Headings/display:** `font-syne font-extrabold` (Syne 800) — use `tracking-tighter` for large headings
- **Body:** `font-sans` (DM Sans) — `font-light` for paragraphs, `font-medium` for labels
- **Section labels:** uppercase, wide tracking, small, green — use `<SectionLabel>` component

### Colors (Tailwind)
- `prescript-green` → `#1D9E75`
- `prescript-green-light` → `#E1F5EE`
- `prescript-green-dark` → `#085041`
- `prescript-green-mid` → `#0F6E56`
- Accent backgrounds per service: Amber `#FAEEDA`, Blue `#E6F1FB`, Purple `#EEEDFE`

### Card Conventions
- Default: white bg, `border border-gray-100`, `rounded-xl`
- Featured/highlighted: `border-[1.5px] border-prescript-green`
- No heavy box shadows — keep it flat and clean

---

## Service Names (Critical)

Always capitalize. Always use exact names and descriptions:

| Name | Full Name | Accent | Position |
|---|---|---|---|
| **Imprint** | Branding & Creative | Amber | Service 01 |
| **Forge** | Digital & Tech Platforms | Blue | Service 02 |
| **Surge** | Digital Marketing | Green light | Service 03 |
| **Flow** | Business Automation | Purple | Service 04 · "Our Core" |
| **Cortex** | Agentic AI Deployment | Green light | Service 05 · "Our Deepest Core" |

---

## Integrations

### Contact Form (Web3Forms)
All contact forms call `submitToWebhook()` from `src/lib/submitForm.ts`. It posts to `https://api.web3forms.com/submit` and Web3Forms emails the submission to the address linked to the access key. No backend required.

### Live Chat (Crisp)
Loaded in `src/app/layout.tsx` via `next/script` with `strategy="afterInteractive"`. The widget only renders when `NEXT_PUBLIC_CRISP_ID` is set. Find the Website ID in Crisp Dashboard → Website Settings → Setup & Integrations.

### Email
`hello@prescriptdigital.com` is forwarded to Gmail via **Cloudflare Email Routing** (configured in Cloudflare dashboard → prescriptdigital.com → Email → Email Routing).

---

## Pending Setup (as of April 2025)

- [ ] Add `NEXT_PUBLIC_WEB3FORMS_KEY` in Cloudflare Pages Variables and Secrets, then redeploy
- [ ] Find Crisp Website ID (Website Settings → Setup & Integrations) and add as `NEXT_PUBLIC_CRISP_ID` in Cloudflare Pages, then redeploy
- [ ] Configure Crisp chatbot auto-replies with Prescript service information
- [ ] Verify Cloudflare Email Routing is active and forwarding `hello@prescriptdigital.com` to Gmail
- [ ] Optional: set up Gmail "Send as" via Brevo SMTP to reply from `hello@prescriptdigital.com`

---

## NGN Pricing

All NGN prices are calculated at **₦1,600 per $1 USD**. If the exchange rate is updated, search `1600` across pricing components and `src/lib/pricing.ts`.
