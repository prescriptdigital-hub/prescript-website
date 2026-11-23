# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Prescript Digital Solutions** — a Lagos-based digital agency website serving Nigeria, Pan-Africa, North America, and Europe. The site markets five integrated services: Imprint (Branding), Forge (Tech Platforms), Surge (Marketing), Flow (Automation), and Cortex (AI Deployment).

**Live site:** prescriptdigital.com  
**Deployment:** Cloudflare Pages (static export, auto-deploys from `main` branch on GitHub)

---

## BRAND: the source of truth is `brand/`

`brand/design_handoff_prescript_brand/` is the official Prescript brand guide (Identity v1.0). **Read its `README.md` before any UI, copy or design change.** It overrides anything else in this file about look and feel.

- Colours, fonts and spacing come ONLY from tokens: Tailwind `pd-*` classes (`tailwind.config.ts`) or `--pd-*` CSS variables (`src/app/prescript-tokens.css`). Never hard-code hex values in components.
- Logo files are served from `public/brand/` (copied from `brand/.../brand-assets/`). Never redraw, retype or recolour the logo. The site has no dark mode, so the header uses the fixed `svg/horizontal/prescript-horizontal-dark-on-cream.svg` (not the auto-theme file, which turns cream on dark-mode devices).
- Fonts: Exo 2 300 headlines (`font-display font-light`) · IBM Plex Sans body (`font-sans`) · JetBrains Mono labels and eyebrows (`font-mono`). Loaded via `next/font` in `layout.tsx`.
- Square corners on all UI (the Tailwind radius scale is 0; only `rounded-full` circles and `rounded-app` icon tiles remain). Flat, no UI drop shadows.
- Cream on brick only for the logo and text ≥ 24px; body text on brick is white.
- Brick `#C24E4E` is the brand, not an error colour. Errors use `pd-error` `#B3123B` with an icon and label.
- Violet `#8B7CFF` = PRESCRIPT IQ™ only. Mint `#2EE6A6` = PRESYNQ™ only. Never on master or Studio pages.
- Weathered texture (`.pd-texture`): social and print only. The owner rejected it for the website hero (Nov 2026): the hero is clean paper with no texture, which overrides README 7.4.
- Signature square full stop (`.pd-dot`): at most one headline per screen.
- Tagline "Diagnose. Prescribe. Deliver." Voice: precise, confident, honest, no hype. No gradients, globes, circuit boards, light bulbs or robot heads.

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

See **BRAND** above and `brand/design_handoff_prescript_brand/README.md`. Quick map of Tailwind tokens:
- Grounds: `bg-pd-paper` (page), `bg-pd-surface` (cards), `bg-pd-surface-2`, `bg-pd-brick` (hero/brand), `bg-pd-oxblood` (dark sections/footer), `bg-pd-ink`
- Text: `text-pd-ink`, `text-pd-muted` (body on paper), `text-pd-subtle` (captions), `text-pd-brick-700` (links/labels on light), `text-pd-cream` (headlines on brick/oxblood)
- Lines: `border-pd-line`
- `<Button>` variants: `primary` (brick), `secondary` (oxblood/cream), `outline` (ghost)
- Cards: `bg-pd-surface border border-pd-line`, square, no shadow

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
The `prescript-tracker` Worker (`workers/tracker.js`) backs `/track` (public status lookup by reference) and `/admin`, `/admin/projects`, `/admin/team` (password-gated). KV namespace `PROJECTS`; secrets `ADMIN_PASSWORD`, `INTERNAL_KEY`.

### Email
`hello@prescriptdigital.com` is forwarded to Gmail via **Cloudflare Email Routing** (Cloudflare dashboard → prescriptdigital.com → Email → Email Routing).

---

## Deploys

Cloudflare Pages builds from `main` on every push. The last successful production build is what's live. Note: a run of "Failed" deployments in the dashboard from ~May 2025 are **manual retries of one broken commit** (`d25528f`, a `/company-profile` static-generation timeout, fixed in `02dd101`) — not the current state. `npm run build` on `main` passes clean.

## Pending Setup

- [ ] Set `RESEND_API_KEY` on the `prescript-payment-verify` Worker so payment/billing emails send
- [ ] Point `www.prescriptdigital.com` at Cloudflare Pages (currently serves a stale Hostinger site) — add `www` as a Pages custom domain or a redirect to the apex
- [ ] Replace placeholder case studies in `src/lib/cases.ts` with real client work (or label them as samples)

## Logo / Brand Assets

All logos, favicons, the OG image and the texture come from `brand/design_handoff_prescript_brand/brand-assets/`, installed into `public/brand/` (full kit) and the `public/` root (favicons, `site.webmanifest`, `og-image-1200x630.png`). To update an asset, replace it in `brand/` first, then copy it to `public/`.

---

## NGN Pricing

All NGN prices are calculated at **₦1,400 per $1 USD**. If the exchange rate is updated, search for `ngn:` in `src/lib/pricing.ts` and update the rate there — it flows automatically to all pricing components.
