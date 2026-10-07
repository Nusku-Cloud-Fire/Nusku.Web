import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell, DocsUnavailable } from "@/components/docs/session-bar";
import { lastUpdated } from "@/lib/docs/meta";
import { pagesFor } from "@/lib/docs/registry";
import { docsAccess } from "@/lib/docs/session";

export const metadata: Metadata = { title: "Documentación" };

const dateFormat = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export default async function Page() {
  const access = await docsAccess(undefined, "/documentacion");
  if (access.status === "unavailable") return <DocsUnavailable />;

  const pages = pagesFor(access.email);

  return (
    <DocsShell title="Tu documentación">
      {pages.length === 0 ? (
        <p className="text-lg">Todavía no tienes documentación asignada.</p>
      ) : (
        <ul className="ring-hairline flex max-w-4xl flex-col rounded-lg bg-surface">
          {pages.map((meta) => {
            const updated = lastUpdated(meta);
            return (
              <li key={meta.id} className="border-b border-white/[0.05] last:border-0">
                <Link
                  href={`/documentacion/${meta.id}`}
                  className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-white/[0.03]"
                >
                  <span className="text-[22px] leading-[1.2] font-medium text-white">
                    {meta.title}
                  </span>
                  <span>{meta.summary}</span>
                  {updated ? (
                    <span className="text-sm text-detail">
                      Actualizado {dateFormat.format(new Date(`${updated}T00:00:00Z`))}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </DocsShell>
  );
}
