import type { MetadataRoute } from "next";
import { LANGS, ROUTE_KEYS, url } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  return LANGS.flatMap((lang) =>
    ROUTE_KEYS.map((key) => ({
      url: url(key, lang),
      lastModified: new Date(),
      changeFrequency: key === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: key === "home" ? 1 : 0.7,
      // Tells search engines the two language versions are the same page.
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, url(key, l)])),
      },
    })),
  );
}
