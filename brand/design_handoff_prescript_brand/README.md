# Handoff: Prescript Digital — Brand Identity v1.0

> **For Claude Code:** Read this whole file before touching the codebase. Your job is to roll the new Prescript brand out across the **existing website** in this repo, using the repo's current framework, components and conventions. Do not paste the HTML reference files into the site.

---

## 1. Overview

Prescript Digital Solutions Ltd is a digital agency and AI software company. It helps businesses through five services — **Imprint** (branding), **Forge** (tech platforms), **Surge** (marketing), **Flow** (automation), **Cortex** (AI deployment) — plus two software products, **PRESCRIPT IQ™** and **PRESYNQ™**.

This package contains the complete new identity: logo system, colour, typography, texture, usage rules, web logo kit, and design tokens ready to drop into the site.

### The concept: "A prescription, written in code"
A doctor doesn't hand you every medicine on the shelf. They diagnose, then write one precise prescription. Prescript does the same for businesses.

The mark is a line of code, `< · >`, rotated 45° into a diamond:

| Part | Meaning |
|---|---|
| `<` opening bracket | **Diagnose** — frame the real problem first |
| `>` closing bracket | **Deliver** — build, ship, keep it running |
| ■ centre square | **The prescription** — the one precise solution |
| ◇ the diamond | **Lasting value** — left slightly open, because a good prescription keeps improving |

The two brackets interlock but never touch: Prescript's expertise and the client's business, working as one.

**Tagline:** `Diagnose. Prescribe. Deliver.`
**Core line (from current site):** `We build, automate & deploy AI into businesses.`

---

## 2. About the design files

The files in `reference/` are **design references built in HTML**: they show the intended look, not production code. Recreate the designs **in the existing site's stack** (React/Next, Vue, plain HTML, WordPress, etc.) using its established patterns. Open `reference/Prescript Brand Guidelines.dc.html` in a browser to see every rule visually; `reference/Prescript Brand Sheet.dc.html` is a one-page summary.

The files in `brand-assets/` and `tokens/` **are production-ready** and should be copied into the site.

## 3. Fidelity

**High-fidelity.** Colours, type, logo geometry and spacing are final. Match them exactly. Page layouts in the guideline mockups (hero, nav, etc.) are direction — apply them to the site's existing page structure and content.

---

## 4. Rollout plan for the existing site (do in this order)

1. **Install assets**
   - Copy `brand-assets/` into the site's public/static folder as `/brand/` (e.g. `public/brand/`).
   - Copy everything in `brand-assets/favicon/` **and** `brand-assets/web/og-image-1200x630.png` to the **public root** (`/favicon.ico`, `/favicon.svg`, `/apple-touch-icon.png`, `/site.webmanifest`, etc.).
   - Remove the old logo (`prescriptcreatives_logo.png`) and old favicons once nothing references them.
2. **Install tokens**
   - Import `tokens/prescript-tokens.css` globally (it also loads the Google Fonts).
   - If the site uses Tailwind, merge `tokens/tailwind.prescript.js` into `theme.extend`. If it uses CSS-in-JS or a theme object, map from `tokens/prescript-tokens.json`.
   - Replace existing hard-coded brand colours/fonts with the tokens. Search the codebase for old hex values and font names.
3. **Update `<head>`** — paste `brand-assets/favicon/HEAD-SNIPPET.html` into the root layout/document head (Next.js: `app/layout.tsx` metadata or `_document.tsx`). Set `theme-color` to `#C24E4E`.
4. **Header / nav** — swap the logo (see §6). Apply nav styling (§7.3).
5. **Buttons, links, headings** — restyle global components per §7.
6. **Hero** — restyle per §7.4.
7. **Footer** — per §7.5.
8. **Service & product pages** — apply sub-brand rules (§9).
9. **Status/alerts/forms** — use status colours (§5.3).
10. **Audit** — check every page in light and dark OS mode, at 375px and 1440px, and run an accessibility contrast check.

---

## 5. Colour

### 5.1 Core palette
| Token | Hex | RGB | Role |
|---|---|---|---|
| `--pd-cream` | `#EFEA8C` | 239 234 140 | Mark, wordmark, headlines on brick/oxblood |
| `--pd-brick` | `#C24E4E` | 194 78 78 | Brand ground, accent square, primary buttons |
| `--pd-oxblood` | `#3A1714` | 58 23 20 | Depth, dark sections, secondary buttons |
| `--pd-paper` | `#F7F4EC` | 247 244 236 | Light page background |
| `--pd-ink` | `#141110` | 20 17 16 | Primary text, dark UI |
| `--pd-brick-700` | `#A33E3E` | | Links & labels on light grounds |
| `--pd-text-muted` | `#4A403B` | | Body text on paper |
| `--pd-text-subtle` | `#6B605A` | | Captions, meta |
| `--pd-line` | `#DED8C8` | | 1px hairlines, dividers |
| `--pd-surface` | `#FFFDF7` | | Cards on paper |

### 5.2 Sub-brand accents (software only)
| Product | Hex | Use |
|---|---|---|
| PRESCRIPT IQ™ | `#8B7CFF` violet | Centre square, full stop, product UI |
| PRESYNQ™ | `#2EE6A6` mint | Centre square, full stop, product UI |

Never use violet or mint on the master brand or Studio pages.

### 5.3 Status colours (UI only)
| Status | Text/icon | Background |
|---|---|---|
| Error | `#B3123B` | `#F9E3E8` |
| Warning | `#9A5B00` | `#FBEFD9` |
| Success | `#1F7A4F` | `#E0F2E8` |
| Info | `#2F5FC4` | `#E3EBFA` |

**Brick is a brand colour, not an error colour.** Always pair status colour with an icon + text label.

### 5.4 Proportions
- **Brand/marketing surfaces** (hero, social, decks): Brick 55% · Oxblood 20% · Cream 15% · Paper 10%.
- **Website/product reading surfaces**: Paper 60% · Ink 22% · Oxblood 10% · Brick 8% (actions + square only).

### 5.5 Accessibility (WCAG 2.2)
| Pair | Ratio | Allowed use |
|---|---|---|
| Cream on Brick | 3.7:1 | **Logo + text ≥ 24px (or ≥ 19px bold) only** |
| White on Brick | 4.7:1 | Body text & button labels on brick |
| Cream on Oxblood | 13:1 | Any size |
| Oxblood on Cream | 13:1 | Any size |
| Ink on Paper | 17:1 | Any size |
| Brick 700 on Paper | 5.6:1 | Links, labels, body |
| Brick on Paper | 4.2:1 | Large text & icons only |

### 5.6 Text-on-ground rules
| Ground | Headline | Body | Link | Primary button |
|---|---|---|---|---|
| Brick | Cream | White | Cream, underlined | Oxblood bg / Cream text |
| Oxblood | Cream | Paper | Cream, underlined | Brick bg / White text |
| Paper | Ink | `#4A403B` | Brick 700, underline on hover | Brick bg / White text |
| Cream | Oxblood | Oxblood (short copy only) | Oxblood underlined | Oxblood bg / Cream text |

---

## 6. Logo system

### 6.1 Files (`brand-assets/`)
All logos are **outlined, transparent SVGs** (no background, no fonts required) with transparent PNG fallbacks.

| Lockup | SVG folder | Use |
|---|---|---|
| Horizontal (primary) | `svg/horizontal/` | Header, documents, most uses |
| Stacked | `svg/stacked/` | Footer, posters, square formats |
| Mark only | `svg/mark/` | Mobile header, avatars, icons |
| Wordmark only | `svg/wordmark/` | When the mark is already nearby |
| Hero mark (offset shadow) | `svg/mark/prescript-mark-hero-shadow-*.svg` | Hero & posters **only** |
| Small-size cut | `svg/mark/prescript-mark-small-size-cut.svg` | Mark below 32px |

Each lockup comes in five colour versions (file suffix):
- `full-colour-on-brick` — cream, for brick backgrounds (signature)
- `cream-on-dark` — cream + brick square, for oxblood/ink
- `dark-on-cream` — oxblood + brick square, for paper/cream/white
- `black` / `white` — one-colour

### 6.2 Web kit (`brand-assets/web/`)
| Slot | File | Size |
|---|---|---|
| Desktop header (auto light/dark) | `web/prescript-logo-auto-theme.svg` | 28–36px tall |
| Mobile header (auto light/dark) | `web/prescript-mark-auto-theme.svg` | 24–32px |
| Header on brick hero | `svg/horizontal/prescript-horizontal-full-colour-on-brick.svg` | 28–36px |
| Footer (dark) | `svg/stacked/prescript-stacked-cream-on-dark.svg` | 80–120px tall |
| Favicon | `favicon.ico` + `favicon.svg` (switches to cream in dark mode) | 16/32/48 |
| iOS home screen | `apple-touch-icon.png` | 180 |
| Android / PWA | `android-chrome-192x192.png`, `-512x512.png` | |
| Link previews (OG) | `web/og-image-1200x630.png` | 1200×630 |
| Loading state | `web/prescript-loader.svg` (animated, loops) | 40–64px |
| Email header | `png/prescript-horizontal-dark-on-cream.png` | display at 320px wide |

The auto-theme SVGs use an internal `prefers-color-scheme` media query. This works when loaded via `<img>`. If the site has its **own** dark-mode toggle (class-based), instead swap between `dark-on-cream` and `cream-on-dark` files based on that class.

```html
<a href="/" aria-label="Prescript Digital home">
  <img src="/brand/web/prescript-logo-auto-theme.svg" alt="Prescript Digital" height="32">
</a>
```

### 6.3 Clear space & minimum size
- **Unit X = the centre square** (12.5% of mark width). Keep **2X** clear on every side.
- Minimums: mark **16px** (use small-size cut < 32px) · horizontal **120px wide** / 30mm · stacked **64px wide** / 18mm.

### 6.4 Construction (for reference — don't redraw)
Built on a 100-unit square rotated −45°. Stroke 27 units (19% of mark width). Interlock gap 10 units. Outer corner radius 12. Inner ends square-cut. Centre square 18 units, axis-aligned. Wordmark: Exo 2 Light, lowercase, tracked +110, ending in a square full stop 0.12em.

### 6.5 Don'ts
Don't stretch, rotate, recolour outside the palette, add shadows/glows/gradients, put texture inside the logo, retype the wordmark in a live font, or place the cream logo on light/low-contrast grounds.

---

## 7. Typography & components

### 7.1 Fonts (Google Fonts, loaded by `prescript-tokens.css`)
- **Display:** Exo 2 — 300 for headlines, 400 for sub-heads
- **Body:** IBM Plex Sans — 400 / 500 / 600
- **Mono:** JetBrains Mono — labels, eyebrows, code, data

### 7.2 Type scale
| Style | Font | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| H1 | Exo 2 | clamp(40px, 5vw, 64px) | 300 | 1.02 | −0.01em |
| H2 | Exo 2 | clamp(32px, 4vw, 48px) | 300 | 1.05 | 0 |
| H3 | Exo 2 | 36px | 400 | 1.1 | 0 |
| H4 | Exo 2 | 28px | 400 | 1.15 | 0 |
| H5 | Plex Sans | 22px | 600 | 1.25 | 0 |
| H6 | JetBrains Mono | 14px uppercase | 500 | 1.3 | 0.08em |
| Body L | Plex Sans | 18px | 400 | 1.6 | 0 |
| Body | Plex Sans | 16px | 400 | 1.6 | 0 |
| Caption | Plex Sans | 13px | 400 | 1.45 | 0 |
| Button | Plex Sans | 15px sentence case | 600 | 1 | 0 |
| Eyebrow | JetBrains Mono | 12px uppercase | 400 | — | 0.1em |

**Signature full stop:** key headlines end in a small square instead of a period: `<h1>Diagnose. Prescribe. Deliver<span class="pd-dot pd-dot--brick"></span></h1>`. Use it on max one headline per screen.

### 7.3 Components
- **Shape:** square corners everywhere (radius 0). Only app-icon tiles are rounded.
- **Primary button:** bg `#C24E4E`, text `#FFFFFF`, Plex 600 15px, padding 14px 22px, optional 7×7px cream square after the label. Hover: bg `#A33E3E`. Focus: 2px outline `#3A1714`, offset 2px.
- **Secondary button:** bg `#3A1714`, text `#EFEA8C`. Hover: bg `#141110`.
- **Ghost button:** 1.5px border `#3A1714`, text `#3A1714`, padding 12.5px 20.5px. Hover: bg `#3A1714`, text `#EFEA8C`.
- **Text link CTA:** JetBrains Mono 13px uppercase, 0.08em, `#A33E3E`, followed by `→`.
- **Nav bar (dark):** bg `#141110`, 16px vertical padding, logo 30px tall, links Plex 14px `#F7F4EC` with 28px gap; active item `#EFEA8C` preceded by a 5×5px brick square; CTA = primary button (10px 16px).
- **Nav bar (light):** bg `#F7F4EC`, 1px bottom border `#DED8C8`, ink links, CTA = secondary button.
- **Cards:** bg `#FFFDF7` or `#F7F4EC`, 1px border `#DED8C8`, no shadow, 24px padding. Grids of cards may use 2px gaps over a `#DED8C8` background to form hairlines.
- **Section eyebrow:** `NN — Section name` in mono 12px uppercase `#A33E3E`.
- **Alerts:** status bg colour, 28×28 square icon tile in the status colour with white glyph, bold title in status colour, body in `#2B2421`.

### 7.4 Hero
- Background brick `#C24E4E` + weathered texture overlay (`.pd-texture` class, 65–75% opacity).
- Left (≈56%): eyebrow (mono, cream) → H1 in cream, Exo 2 300, ending in a cream square full stop → buttons (secondary + ghost-white).
- Right: hero mark with offset shadow (`svg/mark/prescript-mark-hero-shadow-on-brick.svg`), ~80% of column width.
- Mobile: stack — mark (46% width) → H1 30px → white body 13–15px → full-width secondary button pinned to bottom.

### 7.5 Footer
Bg `#3A1714` (or `#141110`), stacked cream logo, mono 11px copyright `© 2026 PRESCRIPT DIGITAL SOLUTIONS LTD` in cream, links in paper.

---

## 8. Texture
`brand-assets/texture/` — transparent overlays (`-dark.svg` for brick grounds, `-light.svg` for oxblood grounds, `-2048.png` raster). **Backgrounds only** — heroes, posters, social. Never behind body text blocks, never inside the logo. Always under the type layer.

## 9. Brand family
One master mark; only the centre square + full stop change colour.

| Brand | Files | Square colour |
|---|---|---|
| prescript digital (master) | `svg/horizontal/` | Brick / cream |
| prescript studio | `svg/family/studio-*` | Brick |
| imprint · forge · surge · flow · cortex | `svg/family/{name}-*` | Brick; label with `01`–`05` + role in mono |
| prescript software | `svg/family/software-*` | Brick |
| PRESCRIPT IQ™ — Think · Decide · Plan | `svg/family/prescript-iq-*` | Violet `#8B7CFF` |
| PRESYNQ™ — Connect · Automate · Execute | `svg/family/presynq-*` | Mint `#2EE6A6` |

Each file has `-on-dark` and `-on-light` versions. In running copy write product names as **PRESCRIPT IQ™** and **PRESYNQ™**; in lockups they're lowercase.

## 10. Imagery
Real people doing real work, natural light, candid; close-ups of hands, sketches, screens. Optional brick duotone (brick layer with `mix-blend-mode: multiply`) for heroes/social. Text over images always sits on a solid oxblood or brick band. **Avoid:** stock handshakes, globes, circuit boards, light bulbs, robot heads, neon gradients.

## 11. Voice
Precise · Confident · Honest · Prescriptive. Short sentences, concrete outcomes, no hype.
- Say "Cut response time from 6 hours to 4 minutes." — not "Revolutionising customer experience."
- Say "Here is what we recommend, and why." — not "We can do whatever you like."

## 12. Motion
- **Logo reveal:** brackets slide in from ±46px with opacity 0→1, 900ms `cubic-bezier(.2,.8,.2,1)`; centre square drops from −70px at 900ms delay, 450ms `cubic-bezier(.3,1.4,.5,1)`; wordmark fades up 8px at 1.3s, 500ms ease-out. Reference: `brand-assets/motion/prescript-logo-animation.svg`.
- **UI:** 150–250ms, `cubic-bezier(.2,.8,.2,1)`. Respect `prefers-reduced-motion` (disable the reveal and loader movement).

## 13. Design tokens
See `tokens/`:
- `prescript-tokens.css` — CSS custom properties + `.pd-dot` + `.pd-texture` helpers + font import
- `prescript-tokens.json` — same values for JS/TS theme objects
- `tailwind.prescript.js` — Tailwind `theme.extend` block

Spacing scale (px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 · 96. Section vertical padding on desktop: 80–96px. Content max-width: 1240px with `clamp(20px, 4vw, 48px)` side padding.

## 14. Files in this package
```
design_handoff_prescript_brand/
├── README.md                     ← this file
├── tokens/                       ← drop-in CSS / JSON / Tailwind tokens
├── brand-assets/
│   ├── svg/{horizontal,stacked,mark,wordmark,family,avatar}/
│   ├── png/                      ← transparent PNG exports
│   ├── favicon/                  ← .ico, .svg, PNGs, manifest, HEAD-SNIPPET.html
│   ├── web/                      ← auto-theme logos, loader, OG image
│   ├── texture/                  ← weathered background overlays
│   └── motion/                   ← animated logo SVG
└── reference/                    ← open in a browser: full guidelines + one-page sheet
```

## 15. Acceptance checklist
- [ ] No references to the old logo or old favicon remain
- [ ] Favicon shows in light & dark browser tabs; OG preview shows when the URL is shared
- [ ] All colours come from tokens; no stray hex values
- [ ] Headlines in Exo 2 300, body in IBM Plex Sans, labels in JetBrains Mono
- [ ] Cream text on brick is only used ≥ 24px; body on brick is white
- [ ] Buttons/cards have square corners
- [ ] Logo has 2X clear space and is never under minimum size
- [ ] Errors use `#B3123B`, not brick
- [ ] Texture never sits behind body copy or on the logo
- [ ] Passes WCAG AA contrast and works at 375px and 1440px
