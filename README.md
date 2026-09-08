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
cp .env.example .env.local   # fill in RESEND_API_KEY
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
site leaves Webflow. `app/api/contact/route.ts` replaces it: it validates the six
fields, drops honeypot submissions, and emails the lead via Resend.

If `RESEND_API_KEY` is missing the route returns a 500 **on purpose** — the form
then shows the same fallback message as the original ("envíanos un correo a
info@nusku.cloud") rather than pretending a lead was captured.

**Before going live**, set `RESEND_API_KEY` and verify the sending domain in Resend.

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
