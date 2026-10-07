# Review focus — Nusku.Web

Repo-specific input for the workspace PR review procedure (`docs/review-pr.md` in the Nusku
workspace). Paths are relative to this repo.

## Generated (skip entirely)

`package-lock.json`, `next-env.d.ts`, `.next/`, `out/`, binary assets under `public/images/`
(only check their names and references).

## Core (review in depth, list in the report)

`lib/i18n.ts`, `lib/content/es.ts`, `lib/content/en.ts`, `lib/metadata.ts`, `app/sitemap.ts`,
`app/robots.ts`, `app/api/contact/route.ts`, `components/contact-form.tsx`,
`components/language-switcher.tsx`, the route-group layouts and `[...notFound]` catch-alls,
`next.config.ts`, `staticwebapp.config.json` and `.github/workflows/`.

## Bug hotspots

- A changed or removed published slug (Spanish or English): breaks SEO and inbound links
  (**Bloqueante** unless the PR declares it and adds the redirect).
- Copy hardcoded in a component instead of the dictionaries, or a Spanish string whose English
  counterpart is missing or still in Spanish.
- A new page missing from `ROUTES`, the sitemap, canonical/`hreflang`, or one of the two route files.
- Contact form: validation, honeypot or `Perfil` values diverging between `/contacta` and
  `/en/contact`; a lead silently dropped instead of the fallback message; a secret exposed through
  a `NEXT_PUBLIC_` variable.
- Hosting regressions: non-empty `output_location`, `images.unoptimized` removed, security headers
  moved to `staticwebapp.config.json`.

## Conventions source

`CLAUDE.md` and `README.md` of this repo. There is no separate rules folder: check new code against
its closest sibling files.
