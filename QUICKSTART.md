# Prescript Digital Solutions — Claude Code Quick Start

## Files in this folder

| File | Purpose |
|---|---|
| `PRESCRIPT_PROJECT_SPEC.md` | Full website specification — every page, component, copy, and data |
| `CLAUDE_CODE_PROMPT.txt` | The exact prompt to paste into Claude Code to build the website |
| `QUICKSTART.md` | This file — how to use everything |

---

## Prerequisites

Install these before you start:

- **Node.js** v18 or higher → https://nodejs.org
- **VS Code** → https://code.visualstudio.com
- **Claude Code extension** → Install from VS Code Extensions panel
  Search: "Claude Code" by Anthropic
  OR install via terminal: `npm install -g @anthropic-ai/claude-code`

---

## Step-by-Step Setup

### 1. Create your project folder

```bash
mkdir prescript-website
cd prescript-website
```

Copy both `PRESCRIPT_PROJECT_SPEC.md` and `CLAUDE_CODE_PROMPT.txt` 
into this folder.

### 2. Open in VS Code

```bash
code .
```

### 3. Open Claude Code

Option A — VS Code panel:
- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type: "Claude Code"
- Select: "Claude Code: Open"

Option B — Terminal:
- Open VS Code terminal (Ctrl+`)
- Type: `claude`
- Press Enter

### 4. Paste the prompt

- Open `CLAUDE_CODE_PROMPT.txt`
- Select ALL text (Ctrl+A)
- Copy (Ctrl+C)
- Paste into the Claude Code input box
- Press Enter

### 5. Let Claude Code work

Claude Code will:
1. Scaffold the Next.js project
2. Install all dependencies
3. Create all components
4. Build all pages
5. Wire up routing and data

This takes approximately 10–20 minutes.

### 6. Run the website

```bash
npm run dev
```

Open your browser: **http://localhost:3000**

---

## Pages You Will Get

| URL | Page |
|---|---|
| `/` | Home — Hero, services, packages, why Prescript, contact |
| `/services/imprint` | Imprint — Branding & Creative service page |
| `/services/forge` | Forge — Digital & Tech Platforms service page |
| `/services/surge` | Surge — Digital Marketing service page |
| `/services/flow` | Flow — Business Automation service page |
| `/services/cortex` | Cortex — Agentic AI Deployment service page |
| `/pricing` | One-time packages + add-ons + FAQ |
| `/subscriptions` | Monthly subscription plans (personal + business) |
| `/contact` | Contact form + booking |

---

## Deploy to the Internet (Free)

1. Push your code to GitHub (create a free account at github.com)
2. Go to **vercel.com** (free account)
3. Click "New Project" → Import your GitHub repo
4. Click "Deploy"
5. Your site is live at `yourproject.vercel.app`

To use a custom domain (e.g. prescriptdigital.com):
- Buy domain from Namecheap or Whogohost (Nigeria)
- Add it in Vercel under "Domains"

---

## If Claude Code Gets Stuck

If Claude Code stops or asks for clarification, say:

> "Continue from where you left off. 
>  Next step: [tell it what step number from the prompt]"

Or if a specific component isn't working:

> "Fix the [ComponentName] component. The error is: [paste error]"

---

## Common Issues

**"Module not found" errors:**
```bash
npm install
```

**TypeScript errors on build:**
Tell Claude Code: "Fix all TypeScript errors and run npm run build again"

**Fonts not loading:**
Check that Google Fonts import is in globals.css AND layout.tsx

**Tailwind colors not working:**
Check tailwind.config.ts — ensure the prescript color keys are correct

---

*Built with Claude · Prescript Digital Solutions · Lagos, Nigeria*
