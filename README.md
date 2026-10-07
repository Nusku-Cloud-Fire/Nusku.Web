# Nusku.Web

Marketing site for [nusku.cloud](https://www.nusku.cloud), migrated from Webflow to Next.js.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Rethink Sans via `next/font/google`
- Spanish + English, no i18n library — see [Languages](#languages)
- All pages statically prerendered; only `/api/contact` and the 404 catch-alls run on demand

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Resend vars — see "Contact form"
npm run dev
```

## Routes

Every published Webflow URL is preserved 1:1, so no redirects are needed at
launch. Spanish stays at the root; English is the same pages under `/en` with
translated slugs.

| Page | Spanish (default) | English |
| --- | --- | --- |
| Home | `/` | `/en` |
| Instaladores y Mantenedores | `/instaladores-y-mantenedores` | `/en/installers-and-maintainers` |
| Receptoras | `/receptoras` | `/en/alarm-receiving-centres` |
| App para Propietarios | `/propietarios` | `/en/property-owners` |
| Contacta con nosotros | `/contacta` | `/en/contact` |
| Términos y Condiciones | `/terminos-y-condiciones` | `/en/terms-and-conditions` |
| Política de privacidad | `/politica-de-privacidad` | `/en/privacy-policy` |

`/contact` (referenced from the old privacy policy, and a 404 on Webflow) now
308-redirects to `/contacta`.

## Languages

Spanish is the default and the source of truth. English is a full translation
at `/en/…`; there is no machine translation at runtime and no i18n library —
both languages are plain TypeScript objects, statically prerendered.

### Where the copy lives

| File | What it is |
| --- | --- |
| `lib/content/es.ts` | Every Spanish string, plus `SiteContent` — the type derived from it |
| `lib/content/en.ts` | The English translation, typed as `SiteContent` |
| `lib/i18n.ts` | The route table (which slug is which page in which language) and helpers |

Because `SiteContent` is derived from the Spanish object with `typeof`, **adding
a string to `es.ts` fails the build until `en.ts` has it too**. That is the
whole safety net: `npm run typecheck` catches an untranslated key, so nothing
can silently fall back to Spanish on the English site.

To change copy, edit the dictionary — never the components. To add a page, add
it to `ROUTES` in `lib/i18n.ts`, add its copy to both dictionaries, and create
the two route files.

### How the URLs work

No middleware and no redirects. `app/(es)/` and `app/(en)/` are [route
groups][groups] — bracketed folder names that organise files without adding a
URL segment. So `app/(es)/receptoras/page.tsx` still serves `/receptoras`,
exactly the URL it had before English existed.

[groups]: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

Each group has its own root layout, which is what lets `<html lang>` and the
OpenGraph locale be correct in the *served* HTML rather than patched in the
browser. The trade-off is that switching language is a full page load rather
than a client-side transition — which is the right behaviour anyway, since the
whole document changes.

Because there is no single `app/layout.tsx` for Next to attach a global
`not-found.tsx` to, each group has a `[...notFound]` catch-all so an unknown
URL still gets the styled 404 — in Spanish for `/nope`, in English for
`/en/nope`.

### SEO

Every page declares its canonical URL and `hreflang` links to its counterpart,
with `x-default` pointing at Spanish. `sitemap.xml` lists both languages with
`xhtml:link` alternates. Nothing auto-redirects visitors by browser language,
so a shared link always opens in the language it was written in.

### The language switcher

`components/language-switcher.tsx` maps the current path to the same page in
the other language via `counterpartPath()`, falling back to that language's
home page if the URL is not one of ours. It appears in the header (and mobile
menu) as an ES/EN toggle, and in the footer under *Idioma* / *Language*.

## Contact form

The Webflow form posted to Webflow's own endpoint, which stops working once the
site leaves Webflow. `app/api/contact/route.ts` replaces it: it validates the
six fields, drops honeypot submissions, and emails the lead through
[Resend](https://resend.com) — a transactional email service that sends mail via
an HTTP API instead of an SMTP server.

The code is finished and wired. **What is missing is the account**: the three
environment variables below ship empty on purpose, because the Resend account
belongs to Nusku, not to the agency. Until they are filled in, the form
validates input and then shows its fallback message ("envíanos un correo a
info@nusku.cloud") rather than pretending a lead was captured — no lead is ever
silently dropped.

### Setup (to be completed by Nusku)

1. **Create a Resend account** at [resend.com](https://resend.com). The free
   tier covers 3.000 emails/month, well above this form's volume.
2. **Verify the sending domain** at
   [resend.com/domains](https://resend.com/domains) → *Add Domain* →
   `nusku.cloud`. Resend shows a handful of DNS records (DKIM, SPF); add them
   wherever `nusku.cloud` DNS is managed. Verification usually completes within
   minutes. This step is what allows mail to be sent *from* `@nusku.cloud`
   without landing in spam — it cannot be skipped.
3. **Create an API key** at [resend.com/api-keys](https://resend.com/api-keys).
   *Sending access* is the only permission needed. Copy it once — Resend shows
   the full key only at creation.
4. **Set the three variables** (see the table below) as **application settings
   on the Static Web App**, not as GitHub secrets. The route reads them at
   request time on Azure, so a GitHub secret — which only exists during the
   build — leaves it seeing them unset and returning `not_configured`:

   ```bash
   az staticwebapp appsettings set      --name nusku-marketing-web --resource-group rg-nusku-marketing-web      --setting-names RESEND_API_KEY=re_xxx CONTACT_TO_EMAIL=info@nusku.cloud                      CONTACT_FROM_EMAIL=web@nusku.cloud
   ```

   Or in the portal: the Static Web App → *Environment variables*. They apply
   without a redeploy.
5. Application settings take effect on the next request — no redeploy needed.
6. **Test** by submitting the real form at `/contacta` and confirming the email
   arrives at `CONTACT_TO_EMAIL`.

### Variables

| Variable | Example | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_xxxxxxxx` | From step 3. Server-side only — it has no `NEXT_PUBLIC_` prefix, so it is never sent to the browser. Treat it as a password: never commit it. |
| `CONTACT_TO_EMAIL` | `info@nusku.cloud` | Where the lead notification is delivered. Any inbox; it does **not** need to be on the verified domain. Defaults to `info@nusku.cloud` if left blank. |
| `CONTACT_FROM_EMAIL` | `web@nusku.cloud` | The "From" address. **Must** be on the domain verified in step 2, or Resend rejects the send. Defaults to `web@nusku.cloud` if left blank. |

`.env.example` is the committed template with all three keys and these notes.
For local development, copy it and fill in your own values:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored, so real keys never reach the repository.

Each notification arrives with the subject *"Nueva solicitud de demo — Nombre
Apellidos (Perfil)"* and has `Reply-To` set to the lead's own address, so
replying from the inbox goes straight back to them.

The English form at `/en/contact` posts to the same endpoint with the same
field names and the same Spanish `Perfil` values (`Instalador`, `Mantenedor`,
`Receptora`, `Propietario`) — only the visible labels are translated, so the
notification reads identically whichever language the lead used. It carries one
extra row, *Idioma*, which says **"Inglés — responder en inglés"** when the lead
came from the English site.

### If the form reports an error

The form shows its fallback message whenever the API route returns a non-200.
The server logs (Azure portal → the Static Web App → *Monitoring*) say which
case it was:

- `RESEND_API_KEY is not set` (the form gets `not_configured`) — step 4 not done,
  or the variables were set as GitHub secrets instead of application settings.
- `Resend responded 403` — usually the domain in `CONTACT_FROM_EMAIL` is not
  verified, or does not match the domain from step 2.
- `could not reach Resend` — network failure calling the Resend API.

## Private documentation

`/documentacion` is a private area for partners (monitoring stations, installers)
with technical pages such as the SIA event codes. Visitors sign in with their
email: the site sends a login link (valid 15 minutes) and then sets a 7-day
session cookie. There are no passwords or accounts, and nothing is stored
server-side. The pages are not indexed (`noindex` plus `robots.txt`).

**Granting or removing access** means editing `content/docs/consumers.json` in a
pull request: each consumer lists its `contacts` (emails) and the `pages` it may
see. `npm run docs:check` validates the registry and runs in CI. Removing
someone takes effect on the next deploy, even if they still hold a cookie, since
the registry is checked on every request. Any `@nusku.cloud` email can sign in
and sees every page without being listed.

**Configuration.** The variables are application settings on the Static Web App,
set the same way as the Resend ones for the contact form (not GitHub secrets).
Login emails reuse `RESEND_API_KEY`. See `.env.example` for each one.

```bash
az staticwebapp appsettings set --name nusku-marketing-web --resource-group rg-nusku-marketing-web --setting-names DOCS_AUTH_SECRET="$(openssl rand -base64 48)" DOCS_FROM_EMAIL=docs@nusku.cloud
```

Without `DOCS_AUTH_SECRET` (at least 32 bytes), or without `RESEND_API_KEY` in
production, the area shows "access not available" and lets nobody in. In local
development, with no `RESEND_API_KEY`, the login link is printed in the `next
dev` console instead of being emailed.

Login links point at `SITE_URL` when set, otherwise at `https://www.nusku.cloud`
in production (request host headers are never trusted there, since a forged one
would put a valid token in a link to another domain). Locally they use the
request host.

**Auditing.** Logins show up in the Azure logs as `[docs] login ok <email>
<timestamp>`; page views are deliberately not logged. Access grants are the
history of the registry: `git log -p content/docs/consumers.json`.

**Limitations.** Links are not single-use, so one can be reused until it expires
(15 minutes). There is no per-session revocation: to sign everyone out, rotate
`DOCS_AUTH_SECRET`.

### Change notifications

An explicit change is a new entry in a page's `changelog`
(`content/docs/pages/<id>.json`). Editing a page without adding an entry
notifies nobody, so fix typos freely. Rewriting the `note` of an existing entry
counts as a new entry and notifies again, so correct notes before merging.

Contacts get one email per deployment: if a push adds entries to several pages
they can see, they receive a single email listing all of them. Recipients are
the `contacts` of every consumer in `content/docs/consumers.json` that has the
page in `pages`; `@nusku.cloud` members who are not in the registry are never
notified.

The `notify_docs_changes` job in the Azure workflow runs
`scripts/docs-notify.mjs` only after `build_and_deploy_job` succeeds, and only on
pushes to `main`. It never runs on pull requests or manual runs. It compares
`github.event.before` with `github.sha`, so git is the only state: nothing
records who was already notified.

| Name | Kind | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | GitHub secret | Resend key used by the job |
| `DOCS_FROM_EMAIL` | GitHub repo variable | Sender address (default `docs@nusku.cloud`) |
| `SITE_URL` | GitHub repo variable | Base URL of the links (default `https://www.nusku.cloud`) |

This differs from the contact form on purpose: `/api/contact` reads its
variables at request time on Azure, so they are application settings, while
this email is sent from the GitHub runner, so it needs GitHub secrets.

If the job fails (missing key or a Resend error), it lists the contacts that
did not receive the notice and the deployment is not rolled back. Re-run the
job from the Actions tab. Each email carries an `Idempotency-Key`
(`docs-<sha>-<email>`), so the ones that already went out are not duplicated.

To test locally without sending anything, from the repo root:

```bash
node scripts/docs-notify.mjs <before> <after> --dry-run
```

### Keeping docs in sync with the backend (`@docs-sync`)

A `@docs-sync: <page-id>` comment in the backend marks the code that feeds a
docs page. The backend agent warns when it edits a marked file (a rule in that
repo's `CLAUDE.md` plus a `PostToolUse` hook, both configured there). When that
happens, update the page here and add an entry to its `changelog` so the
consumers are notified.

Current ids:

- `sia-codigos-eventos`: the SIA event catalog (`HardcodedSiaEventCodeCatalog` /
  `FromConfigSiaEventCodeCatalog` in EventInjestion).

## Deployment

The site runs on **Azure Static Web Apps** (`purple-sky-0e786d103`), deployed by
`.github/workflows/azure-static-web-apps-purple-sky-0e786d103.yml` on every push
to `main`. Pull requests get their own staging environment, torn down on close.
The workflow runs `npm run typecheck` first and fails the run before deploying
if it does not pass.

Three things about this host are worth knowing before changing the config, each
of which broke a deploy once:

- **`output_location` must be empty**, not `.next`. The workflow Azure generates
  defaults to `build` (the Create React App convention); Next emits `.next`, so
  the deploy failed with *"failed to produce artifact folder: 'build'"* even
  though `next build` had succeeded. The SWA build detects Next and handles the
  directory itself, and an explicit `.next` fails the same way.
- **`images.unoptimized` is required** (set in `next.config.ts`). SWA has no
  `next/image` optimizer — `/_next/image` returns 404 — so without it every
  image on the site breaks. It costs almost nothing here: 32 of the 51 assets
  are already AVIF and 14 are SVG.
- **`globalHeaders` in `staticwebapp.config.json` does not apply** to pages Next
  serves, which is all of them. The security headers therefore live in
  `next.config.ts`. Path-scoped `routes` entries *do* work, which is why the
  immutable caching on `/images` stays in the SWA config.

- **Runtime variables are application settings, not GitHub secrets.** The
  workflow's `env:` only reaches the build; `/api/contact` runs on Azure and
  reads `process.env` per request, so a secret passed through the workflow
  leaves it returning `not_configured`. See "Contact form".

### DNS

`nusku.cloud` is managed at Piensa Solutions, and mail already runs on Microsoft
365. When adding the Resend verification records, **merge the SPF into the
single existing TXT record** — a second, separate SPF record invalidates both
and takes the company mail down with it.

## Design system

Tokens mirror the Webflow "Base collection" variables:

| Token | Value | Webflow name |
| --- | --- | --- |
| `--color-g6` | `#0c0c13` | background |
| `--color-g5` | `#151520` | surface |
| `--color-g2` | `#bac8d2` | body text |
| `--color-blue` | `#2d8dff` | brand |
| `--color-blue-minus` | `#1976e4` | brand hover |
| `--color-blue-plus` | `#97c7ff` | badges / links |
| `--color-ai` | `#c745ff` | "Próximamente" |

Headline sizes match Webflow's `.display-1` (74/50/37px) and `.display-2`
(50/40/30px), including the white→transparent gradient fill.

## Assets

The 51 images from the Webflow CDN live in `public/images/` with kebab-case
names. Nothing is loaded from `website-files.com` any more.
