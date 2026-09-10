import type { Lang } from "@/lib/i18n";
import en from "./en";
import es, { type SiteContent } from "./es";

const content: Record<Lang, SiteContent> = { es, en };

export function getContent(lang: Lang): SiteContent {
  return content[lang];
}

export type { SiteContent };
