import type { Metadata } from "next";
import { alternates, type Lang, type RouteKey } from "./i18n";

/**
 * Per-page metadata. `openGraph` is deliberately not set here: Next merges
 * metadata objects shallowly, so setting it on a page would drop the site-wide
 * image and siteName from the layout. Locale lives in the layout instead.
 */
export function pageMetadata(
  key: RouteKey,
  lang: Lang,
  meta: { title?: string; description: string },
): Metadata {
  return {
    ...(meta.title === undefined ? {} : { title: meta.title }),
    description: meta.description,
    alternates: alternates(key, lang),
  };
}
