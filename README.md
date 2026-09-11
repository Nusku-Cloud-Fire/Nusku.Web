# Nusku.Web

Marketing site for [nusku.cloud](https://www.nusku.cloud), migrated from Webflow to Next.js.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Rethink Sans via `next/font/google`
- All pages statically prerendered; only `/api/contact` runs on demand

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Resend vars — see "Contact form"
npm run dev
```

## Routes

Every published Webflow URL is preserved 1:1, so no redirects are needed at launch.

| Route | Source |
| --- | --- |
| `/` | Home |
| `/instaladores-y-mantenedores` | Instaladores y Mantenedores |
| `/receptoras` | Receptoras |
| `/propietarios` | App para Propietarios |
| `/contacta` | Contacta con nosotros |
| `/terminos-y-condiciones` | Términos y Condiciones |
| `/politica-de-privacidad` | Política de privacidad |

`/contact` (referenced from the old privacy policy, and a 404 on Webflow) now
308-redirects to `/contacta`.

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
4. **Set the three variables** (see the table below) as repository secrets in
   GitHub: *Settings → Secrets and variables → Actions → New repository
   secret*. The deploy workflow already passes all three through to the build.
5. **Redeploy.** Environment variables are read at request time, but a running
   deployment does not pick up new values until it is redeployed.
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

### If the form reports an error

The form shows its fallback message whenever the API route returns a non-200.
The server logs (Azure portal → the Static Web App → *Monitoring*) say which
case it was:

- `RESEND_API_KEY is not set` — step 3/4 not done, or the deploy predates them.
- `Resend responded 403` — usually the domain in `CONTACT_FROM_EMAIL` is not
  verified, or does not match the domain from step 2.
- `could not reach Resend` — network failure calling the Resend API.

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
