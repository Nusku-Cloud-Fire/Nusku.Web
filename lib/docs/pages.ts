import type { ComponentType } from "react";
import SiaCodigosEventos from "@/components/docs/pages/sia-codigos-eventos";
import { getDocMeta } from "./meta";
import type { DocPageMeta } from "./types";

/** slug -> body. Each slug must have a JSON in content/docs/pages/ (checked below). */
export const DOC_PAGE_BODIES: Record<string, ComponentType> = {
  "sia-codigos-eventos": SiaCodigosEventos,
};

// JSON ids are plain strings for TypeScript, so a body without meta can't be
// caught by types. Fail at build/load time instead of serving a broken page.
for (const slug of Object.keys(DOC_PAGE_BODIES)) {
  if (!getDocMeta(slug)) throw new Error(`Doc body "${slug}" has no metadata in content/docs/pages/`);
}

export function getDocPage(
  slug: string,
): { meta: DocPageMeta; Body: ComponentType } | undefined {
  const meta = getDocMeta(slug);
  const Body = Object.hasOwn(DOC_PAGE_BODIES, slug) ? DOC_PAGE_BODIES[slug] : undefined;
  return meta && Body ? { meta, Body } : undefined;
}
