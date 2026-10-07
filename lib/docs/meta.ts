import siaCodigosEventos from "@/content/docs/pages/sia-codigos-eventos.json";
import type { DocPageMeta } from "./types";

// No React here: API routes import this module. Every page JSON is listed
// explicitly so a forgotten one fails the typecheck, not production.
export const DOC_PAGES_META: DocPageMeta[] = [siaCodigosEventos];

export function getDocMeta(id: string): DocPageMeta | undefined {
  return DOC_PAGES_META.find((meta) => meta.id === id);
}

/** Most recent changelog date (YYYY-MM-DD sorts lexicographically), whatever the order. */
export function lastUpdated(meta: DocPageMeta): string | undefined {
  return meta.changelog.reduce<string | undefined>(
    (latest, { date }) => (latest === undefined || date > latest ? date : latest),
    undefined,
  );
}
