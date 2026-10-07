import Link from "next/link";
import type { ReactNode } from "react";
import type { DocPageMeta } from "@/lib/docs/types";
import { Container, TitleBadge } from "@/components/ui";

const dateFormat = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

/** Shared frame for internal documentation pages: header, body, changelog. */
export function DocPageLayout({
  page,
  children,
}: {
  page: DocPageMeta;
  children: ReactNode;
}) {
  // Newest first, whatever the order in the JSON.
  const entries = [...page.changelog].sort((a, b) => b.date.localeCompare(a.date));
  const latest = entries[0];

  return (
    <div className="bg-g6 bg-[radial-gradient(1200px_600px_at_50%_-10%,#1976e426,#1976e400_60%)] pt-[82px]">
      <Container className="flex flex-col gap-12 pt-10 pb-24 md:pt-16">
        <header className="flex max-w-4xl flex-col items-start gap-5">
          <Link
            href="/documentacion"
            className="text-sm text-detail transition-colors hover:text-white"
          >
            ← Toda la documentación
          </Link>
          <TitleBadge>Documentación</TitleBadge>
          <h1 className="display-gradient pb-[11px] text-[35px] leading-none font-semibold md:text-[50px]">
            {page.title}
          </h1>
          <p className="text-lg">{page.summary}</p>
          <dl className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-detail">
            <div className="flex gap-2">
              <dt>Identificador</dt>
              <dd className="font-mono text-body">{page.id}</dd>
            </div>
            {latest ? (
              <div className="flex gap-2">
                <dt>Actualizado</dt>
                <dd className="text-body">{formatDate(latest.date)}</dd>
              </div>
            ) : null}
          </dl>
        </header>

        {children}

        <section aria-labelledby="historial" className="flex max-w-4xl flex-col gap-4">
          <h2 id="historial" className="text-[22px] leading-[1.2] font-medium text-white">
            Historial de cambios
          </h2>
          <ol className="ring-hairline flex flex-col rounded-lg bg-surface">
            {entries.map((entry) => (
              <li
                key={`${entry.date}-${entry.note}`}
                className="flex flex-col gap-1 border-b border-white/[0.05] px-5 py-4 last:border-0 md:flex-row md:gap-6"
              >
                <time dateTime={entry.date} className="shrink-0 text-sm text-detail md:w-40">
                  {formatDate(entry.date)}
                </time>
                <span>{entry.note}</span>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </div>
  );
}
