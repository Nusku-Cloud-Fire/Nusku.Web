import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { getContent } from "@/lib/content";
import { LANG_META, SITE_URL, type Lang } from "@/lib/i18n";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-rethink-sans",
});

/**
 * Each language has its own root layout so `<html lang>` and the OpenGraph
 * locale are correct in the served HTML rather than patched up in the browser.
 * Both render this shell.
 */
export function SiteShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const c = getContent(lang);

  return (
    <html lang={LANG_META[lang].htmlLang} className={rethinkSans.variable}>
      <body className="font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
        >
          {c.chrome.skipToContent}
        </a>
        <SiteHeader
          lang={lang}
          nav={c.chrome.nav}
          labels={{
            homeAriaLabel: c.chrome.homeAriaLabel,
            mainNavLabel: c.chrome.mainNavLabel,
            mobileNavLabel: c.chrome.mobileNavLabel,
            openMenu: c.chrome.openMenu,
            closeMenu: c.chrome.closeMenu,
            demoCta: c.chrome.demoCta,
          }}
        />
        <main id="contenido">{children}</main>
        <SiteFooter lang={lang} />
      </body>
    </html>
  );
}

/** Site-wide metadata defaults for one language's root layout. */
export function shellMetadata(lang: Lang): Metadata {
  const c = getContent(lang).siteMeta;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: c.titleDefault, template: c.titleTemplate },
    description: c.description,
    openGraph: {
      type: "website",
      locale: LANG_META[lang].ogLocale,
      siteName: "Nusku",
      images: [{ url: "/images/opengraph.jpg", width: 1200, height: 630 }],
    },
    icons: {
      icon: "/images/favicon.png",
      apple: "/images/webclip.png",
    },
  };
}
