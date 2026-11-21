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
| `NEXT_PUBLIC_PAYMENT_VERIFY_URL` | URL of the `prescript-payment-verify` Worker. If unset, `verifyPayment()` optimistically returns `true` (dev only). | Cloudflare Pages Variables and Secrets |
| `NEXT_PUBLIC_TRACKER_URL` | URL of the `prescript-tracker` Worker, used by `/track` and `/admin`. | Cloudflare Pages Variables and Secrets |

Both are set in production. `NEXT_PUBLIC_WEB3FORMS_KEY` is still present in Pages settings but is **no longer used** — the contact form now posts to Formspree (see Integrations).

The contact form (Formspree) and live chat (Tawk.to) use hardcoded IDs in the code, not env vars.

---

## Architecture

### Pages
```
/                        → src/app/page.tsx
/services/[slug]         → src/app/services/[slug]/page.tsx  (imprint|forge|surge|flow|cortex)
/about                   → src/app/about/page.tsx
/company-profile         → src/app/company-profile/page.tsx  (print-to-PDF one-pager)
/pricing                 → src/app/pricing/page.tsx
/subscriptions           → src/app/subscriptions/page.tsx
/work, /work/[slug]      → case studies (data in src/lib/cases.ts — currently placeholder)
/articles, /articles/[slug] → articles (data in src/lib/posts.ts)
/contact                 → src/app/contact/page.tsx  (RHF form + Calendly embed)
/onboarding              → src/app/onboarding/page.tsx
/track                   → public project-status lookup (tracker Worker)
/admin, /admin/projects, /admin/team → password-gated admin (tracker Worker)
```

### Key Data Files
- **`src/lib/services.ts`** — Single source of truth for all five service definitions (deliverables, process steps, tools, pricing, next-service links). The `SERVICES` array is used by both the home page and dynamic service pages. Any service content edits go here.
- **`src/lib/pricing.ts`** — Pricing card data
- **`src/lib/constants.ts`** — Shared constants (WhatsApp number, social links, etc.)
- **`src/lib/submitForm.ts`** — `submitToWebhook()`, posts to Formspree (`formspree.io/f/maqaqvqg`); used by all contact forms

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

### Contact Form (Formspree)
All contact forms call `submitToWebhook()` from `src/lib/submitForm.ts`. It POSTs JSON to `https://formspree.io/f/maqaqvqg`; Formspree emails the submission to the linked address. No backend required.

### Live Chat (Tawk.to)
Loaded in `src/app/layout.tsx` via an inline `next/script` (`strategy="afterInteractive"`). The Tawk.to property/widget ID is hardcoded in that script tag (`embed.tawk.to/<propertyId>/<widgetId>`). To change accounts, edit the `src` in `layout.tsx`.

### Payments
- Client: Paystack (NGN) + Flutterwave (USD) publishable keys are hardcoded in `src/lib/payment.ts`. SDKs are loaded in `layout.tsx`.
- PayPal (USD, alongside Flutterwave "Card"): live Client ID in `src/lib/payment.ts`; the SDK is loaded on demand. The worker captures the order server-side with secrets `PAYPAL_CLIENT_ID` / `PAYPAL_SECRET` (set `PAYPAL_ENV=sandbox` only for testing).
- Verification: the `prescript-payment-verify` Worker (`workers/verify-payment.js`) checks each transaction server-side against the Paystack/Flutterwave APIs, creates a tracker record, and emails billing via Resend. Worker secrets: `PAYSTACK_SECRET_KEY`, `FLUTTERWAVE_SECRET_KEY`, `INTERNAL_KEY`, `TRACKER_URL`. `RESEND_API_KEY` is **not yet set** — billing emails are skipped until it is.

### Project Tracker
The `prescript-tracker` Worker (`workers/tracker.js`) backs `/track` (public status lookup by reference) and `/admin`, `/admin/projects`, `/admin/team` (password-gated). KV namespace `PROJECTS`; secrets `ADMIN_PASSWORD`, `INTERNAL_KEY`. Default admin password fallback in code is `prescript2026` if `config:admin_password` is unset in KV.

### Email
`hello@prescriptdigital.com` is forwarded to Gmail via **Cloudflare Email Routing** (Cloudflare dashboard → prescriptdigital.com → Email → Email Routing).

---

## Deploys

Cloudflare Pages builds from `main` on every push. The last successful production build is what's live. Note: a run of "Failed" deployments in the dashboard from ~May 2025 are **manual retries of one broken commit** (`d25528f`, a `/company-profile` static-generation timeout, fixed in `02dd101`) — not the current state. `npm run build` on `main` passes clean.

## Pending Setup

- [ ] Set `RESEND_API_KEY` on the `prescript-payment-verify` Worker so payment/billing emails send
- [ ] Point `www.prescriptdigital.com` at Cloudflare Pages (currently serves a stale Hostinger site) — add `www` as a Pages custom domain or a redirect to the apex
- [ ] Replace placeholder case studies in `src/lib/cases.ts` with real client work (or label them as samples)
- [ ] Supply a proper brand logo asset (see below)

## Logo / Brand Assets

`public/prescriptcreatives_logo.png` (used in Navbar + Footer, and as favicon in `layout.tsx`) is a low-resolution raster with a baked-in maroon background that does not match the `#1D9E75` brand green. `public/favicon.svg` is a different mark again (a plain "P"). These should be unified — ideally a single transparent SVG wordmark/monogram in brand green.

---

## NGN Pricing

All NGN prices are calculated at **₦1,400 per $1 USD**. If the exchange rate is updated, search for `ngn:` in `src/lib/pricing.ts` and update the rate there — it flows automatically to all pricing components.
