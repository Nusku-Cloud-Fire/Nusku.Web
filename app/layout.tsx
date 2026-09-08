import type { Metadata } from "next";
import { Rethink_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-rethink-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nusku.cloud"),
  title: {
    default: "Nusku | Detección de incendios con IA",
    template: "%s | Nusku",
  },
  description:
    "Configura y gestiona las instalaciones de detección de incendios de una forma rápida, sencilla y con prestaciones predictivas únicas en el mercado.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Nusku",
    images: [{ url: "/images/opengraph.jpg", width: 1200, height: 630 }],
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/webclip.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={rethinkSans.variable}>
      <body className="font-sans">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
