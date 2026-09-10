"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { path, type Lang, type RouteKey } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { Button, Container } from "./ui";

/**
 * Strings arrive as props from the (server) layout rather than being looked up
 * here, so only the current language's copy ends up in the client payload.
 */
export type HeaderLabels = {
  homeAriaLabel: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenu: string;
  closeMenu: string;
  demoCta: string;
};

export function SiteHeader({
  lang,
  labels,
  nav,
}: {
  lang: Lang;
  labels: HeaderLabels;
  nav: { key: RouteKey; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const contactHref = path("contact", lang);

  return (
    <header className="absolute inset-x-0 top-0 z-50 py-[25px]">
      <Container>
        <div className="flex items-center justify-between gap-10">
          <Link
            href={path("home", lang)}
            aria-label={labels.homeAriaLabel}
            className="shrink-0"
          >
            <Image
              src="/images/logo-nusku-2025.svg"
              alt="Nusku"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav
            aria-label={labels.mainNavLabel}
            className="hidden flex-1 items-center justify-center gap-7 lg:flex"
          >
            {nav.map((link) => {
              const href = path(link.key, lang);
              return (
                <Link
                  key={link.key}
                  href={href}
                  aria-current={pathname === href ? "page" : undefined}
                  className="p-1.5 text-[15px] text-white transition-colors duration-200 hover:text-blue-plus aria-[current=page]:text-blue-plus"
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <LanguageSwitcher variant="header" />
            <Button href={contactHref}>{labels.demoCta}</Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="ring-hairline rounded-md bg-white/5 p-3 text-white lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        {open ? (
          <nav
            id="mobile-menu"
            aria-label={labels.mobileNavLabel}
            className="ring-hairline mt-4 flex flex-col gap-1 rounded-xl bg-surface p-4 lg:hidden"
          >
            {nav.map((link) => (
              <Link
                key={link.key}
                href={path(link.key, lang)}
                className="rounded-md px-3 py-3 text-[15px] text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Button href={contactHref} className="mt-2">
              {labels.demoCta}
            </Button>
            <div className="mt-4 flex justify-center border-t border-white/10 pt-4">
              <LanguageSwitcher variant="header" />
            </div>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
