import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui";

const platformLinks = [
  { href: "/instaladores-y-mantenedores", label: "Instaladores y mantenedores" },
  { href: "/receptoras", label: "Receptoras" },
  { href: "/propietarios", label: "Propietarios de instalación" },
];

export function SiteFooter() {
  return (
    <footer>
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="max-w-xs">
            <Image
              src="/images/logo-nusku-2025-white.svg"
              alt="Nusku"
              width={120}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-6 text-sm leading-relaxed text-g3">
              Nusku es una plataforma Cloud que permite la gestión óptima de
              instalaciones de detección de incendios.
            </p>
          </div>

          <nav aria-labelledby="footer-plataforma">
            <h2
              id="footer-plataforma"
              className="text-sm font-medium text-white"
            >
              Plataforma
            </h2>
            <ul className="mt-5 space-y-3">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-g3 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-contacto">
            <h2 id="footer-contacto" className="text-sm font-medium text-white">
              Contacta con nosotros
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
                  href="/contacta"
                  className="text-sm text-g3 transition-colors hover:text-white"
                >
                  Formulario de contacto
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-medium text-white">Idioma</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-g3 transition-colors hover:text-white"
                >
                  Español
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="bg-black py-11">
        <Container>
          <div className="flex flex-col items-start justify-between gap-4 text-sm text-g4 sm:flex-row sm:items-center">
            <p>© 2025 Copyright. Nusku Cloud S.L.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/terminos-y-condiciones"
                className="transition-colors hover:text-white"
              >
                Términos y condiciones
              </Link>
              <Link
                href="/politica-de-privacidad"
                className="transition-colors hover:text-white"
              >
                Política de privacidad
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
