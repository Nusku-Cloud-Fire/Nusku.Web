import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { path, type Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { Container } from "./ui";

export function SiteFooter({ lang }: { lang: Lang }) {
  const c = getContent(lang).footer;

  return (
    <footer>
      <Container>
        <div className="flex flex-col gap-12 py-20 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-xs">
            <Image
              src="/images/logo-nusku-2025-white.svg"
              alt="Nusku"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-6 text-sm leading-relaxed text-g3">{c.tagline}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:flex lg:gap-24">
            <nav aria-labelledby="footer-platform">
              <h2 id="footer-platform" className="text-sm font-medium text-white">
                {c.platformHeading}
              </h2>
              <ul className="mt-5 space-y-3">
                {c.platformLinks.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={path(link.key, lang)}
                      className="text-sm text-g3 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-contact">
              <h2 id="footer-contact" className="text-sm font-medium text-white">
                {c.contactHeading}
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="mailto:info@nusku.cloud"
                    className="text-sm text-g3 transition-colors hover:text-white"
                  >
                    info@nusku.cloud
                  </a>
                </li>
                <li>
                  <Link
                    href={path("contact", lang)}
                    className="text-sm text-g3 transition-colors hover:text-white"
                  >
                    {c.contactFormLabel}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-language">
              <h2 id="footer-language" className="text-sm font-medium text-white">
                {c.languageHeading}
              </h2>
              <LanguageSwitcher variant="footer" />
            </nav>
          </div>
        </div>
      </Container>

      <div className="bg-black py-11">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 text-sm text-g4 sm:flex-row sm:items-center">
            <p>{c.copyright}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {c.legalLinks.map((link) => (
                <Link
                  key={link.key}
                  href={path(link.key, lang)}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
