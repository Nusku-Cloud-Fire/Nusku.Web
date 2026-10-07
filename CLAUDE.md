# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Marketing site for nusku.cloud (migrated from Webflow): Next.js 15 App Router, React 19,
TypeScript, Tailwind CSS v4. `README.md` is the detailed reference; this file keeps what you need
before changing anything.

## Commands

```bash
npm ci
npm run dev          # http://localhost:3000
npm run typecheck    # the real safety net, see Languages; CI fails on it before deploying
npm run lint
npm run build
```

There is no test suite: a change is verified with `typecheck` + `build`, plus checking the affected
pages in both languages in `npm run dev`.

## Architecture that spans files

- **Two languages without an i18n library.** Spanish at the root, English under `/en` with
  translated slugs. `app/(es)/` and `app/(en)/` are route groups, each with its own root layout
  and its own `[...notFound]` catch-all. There is no global `app/layout.tsx` and no middleware or
  redirects.
- **Copy lives only in the dictionaries.** `lib/content/es.ts` is the source of truth, and
  `SiteContent` is derived from it with `typeof`. `lib/content/en.ts` must satisfy that type, so a
  string added to Spanish fails `typecheck` until English has it. Never put copy in components.
- **Routes are a table.** `ROUTES` in `lib/i18n.ts` maps each page to its slug per language.
  `counterpartPath()` drives the language switcher, canonical/`hreflang` links and the sitemap.
  Adding a page means: the `ROUTES` entry, copy in both dictionaries, and both route files.
- **Published Webflow URLs are preserved 1:1.** Changing an existing slug breaks SEO and
  inbound links.
- **Everything is statically prerendered** except `app/api/contact/route.ts`, which emails leads
  through Resend. Its env vars are Static Web App application settings, not GitHub secrets.
  Without them the form shows its fallback message on purpose.

## Hosting constraints (Azure Static Web Apps)

Deployed on every push to `main`; PRs get a staging environment. Each of these broke a deploy once:
`output_location` must stay empty, `images.unoptimized` is required (there is no `/_next/image` on
SWA), and security headers go in `next.config.ts` because `globalHeaders` in
`staticwebapp.config.json` does not apply to Next pages.

## Workflow

Product changes follow OpenSpec (`openspec/`, skills in `.claude/skills/openspec-*`, commands
`/opsx:*`). PR review runs from the Nusku workspace (`/review-pr`); this repo provides
`docs/agents/review-focus.md`.
