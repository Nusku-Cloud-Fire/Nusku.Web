"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./ui";

const navLinks = [
  { href: "/instaladores-y-mantenedores", label: "Instaladores y mantenedores" },
  { href: "/receptoras", label: "Receptoras" },
  { href: "/propietarios", label: "Propietarios" },
];

export function SiteHeader() {
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

  return (
    <header className="absolute inset-x-0 top-0 z-50 py-[25px]">
      <Container>
        <div className="flex items-center justify-between gap-10">
          <Link href="/" aria-label="Nusku — Inicio" className="shrink-0">
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
            aria-label="Principal"
            className="hidden flex-1 items-center justify-center gap-7 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="p-1.5 text-[15px] text-white transition-colors duration-200 hover:text-blue-plus aria-[current=page]:text-blue-plus"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contacta"
            className="hidden shrink-0 rounded-md bg-gradient-to-b from-blue to-blue-minus px-6 py-4 font-medium text-white shadow-[0_0_24px_-5px_#2d8dff73] transition-[filter] duration-300 hover:brightness-110 lg:inline-flex"
          >
            Programa una demo
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
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
            aria-label="Principal (móvil)"
            className="ring-hairline mt-4 flex flex-col gap-1 rounded-xl bg-surface p-4 lg:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-3 text-[15px] text-white hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacta"
              className="mt-2 rounded-md bg-gradient-to-b from-blue to-blue-minus px-6 py-4 text-center font-medium text-white"
            >
              Programa una demo
            </Link>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
