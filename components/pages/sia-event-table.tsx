"use client";

import { useMemo, useState } from "react";
import {
  SIA_GROUPS,
  type SiaEvent,
  type SiaEventGroup,
} from "@/lib/docs/sia-codigos-eventos";

const GROUP_ORDER: SiaEventGroup[] = ["alarma", "averia", "plataforma"];

function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function YesNo({ value }: { value: boolean }) {
  return value ? (
    <span className="text-white">Sí</span>
  ) : (
    <span className="text-detail">No</span>
  );
}

export function SiaEventTable({ events }: { events: SiaEvent[] }) {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState<SiaEventGroup | "all">("all");

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return events.filter(
      (e) =>
        (group === "all" || e.group === group) &&
        (!q || normalize(`${e.code} ${e.event} ${e.origin}`).includes(q)),
    );
  }, [events, query, group]);

  const filters: { key: SiaEventGroup | "all"; label: string }[] = [
    { key: "all", label: "Todos" },
    ...GROUP_ORDER.map((key) => ({ key, label: SIA_GROUPS[key].label })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-sm">
          <span className="sr-only">Buscar evento o código</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar código o evento…"
            className="ring-hairline w-full rounded-md bg-surface px-4 py-3 text-[15px] text-white placeholder:text-detail focus:outline-none focus-visible:shadow-[inset_0_0_0_1.5px_var(--color-blue-plus)]"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setGroup(f.key)}
              aria-pressed={group === f.key}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                group === f.key
                  ? "bg-blue text-white"
                  : "ring-hairline text-body hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {GROUP_ORDER.map((key) => {
        const rows = filtered.filter((e) => e.group === key);
        if (rows.length === 0) return null;
        return (
          <section key={key} aria-labelledby={`grupo-${key}`} className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={`grupo-${key}`} className="text-[22px] leading-[1.2] font-medium text-white">
                {SIA_GROUPS[key].label}
              </h2>
              <p className="text-sm text-detail">{SIA_GROUPS[key].detail}</p>
            </div>
            <div className="ring-hairline overflow-x-auto rounded-lg bg-surface">
              <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-white/[0.07] text-xs tracking-wide text-detail uppercase">
                    <th scope="col" className="w-28 px-5 py-3 font-medium">Código SIA</th>
                    <th scope="col" className="px-5 py-3 font-medium">Evento Nusku</th>
                    <th scope="col" className="px-5 py-3 font-medium">Origen</th>
                    <th scope="col" className="px-5 py-3 font-medium">Zona (área SIA)</th>
                    <th scope="col" className="px-5 py-3 font-medium">Elemento</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((e) => (
                    <tr
                      key={`${e.code}-${e.event}`}
                      className="border-b border-white/[0.05] last:border-0"
                    >
                      <td className="px-5 py-4">
                        <code className="rounded-md bg-blue/10 px-2.5 py-1 font-mono text-base font-semibold tracking-wider text-blue-plus shadow-[inset_0_0_0_1px_#97c7ff33]">
                          {e.code}
                        </code>
                      </td>
                      <td className="px-5 py-4 text-white">{e.event}</td>
                      <td className="px-5 py-4 whitespace-nowrap">{e.origin}</td>
                      <td className="px-5 py-4"><YesNo value={e.zone} /></td>
                      <td className="px-5 py-4"><YesNo value={e.element} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      {filtered.length === 0 ? (
        <p className="ring-hairline rounded-lg bg-surface px-5 py-8 text-center text-detail">
          Ningún evento coincide con la búsqueda.
        </p>
      ) : null}
    </div>
  );
}
