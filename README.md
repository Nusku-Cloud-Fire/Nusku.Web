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
4. **Set the three variables** (see the table below) in the hosting provider.
   On Vercel: *Project → Settings → Environment Variables*, added to
   **Production** (and Preview, if the form should work on preview URLs).
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

The English form at `/en/contact` posts to the same endpoint with the same
field names and the same Spanish `Perfil` values (`Instalador`, `Mantenedor`,
`Receptora`, `Propietario`) — only the visible labels are translated, so the
notification reads identically whichever language the lead used. It carries one
extra row, *Idioma*, which says **"Inglés — responder en inglés"** when the lead
came from the English site.

### If the form reports an error

The form shows its fallback message whenever the API route returns a non-200.
The server logs (Vercel → *Logs*) say which case it was:

- `RESEND_API_KEY is not set` — step 3/4 not done, or the deploy predates them.
- `Resend responded 403` — usually the domain in `CONTACT_FROM_EMAIL` is not
  verified, or does not match the domain from step 2.
- `could not reach Resend` — network failure calling the Resend API.

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
