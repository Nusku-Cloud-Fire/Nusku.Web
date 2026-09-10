/**
 * Two-language setup: Spanish is the default and keeps the URLs the site
 * launched on (`/`, `/receptoras`, …); English lives under `/en/…` with
 * translated slugs. Nothing is rewritten or redirected, so every page in both
 * languages stays statically prerendered.
 */

export const LANGS = ["es", "en"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "es";

export const SITE_URL = "https://www.nusku.cloud";

/**
 * Language names are endonyms — each is always written in its own language,
 * so they read the same on every page and never need translating. Kept here
 * rather than in the dictionaries so the client-side switcher can import them
 * without pulling in both full content files.
 */
export const LANG_META: Record<
  Lang,
  { name: string; switchLabel: string; htmlLang: string; ogLocale: string }
> = {
  es: {
    name: "Español",
    switchLabel: "Ver en español",
    htmlLang: "es",
    ogLocale: "es_ES",
  },
  en: {
    name: "English",
    switchLabel: "View in English",
    htmlLang: "en",
    ogLocale: "en_GB",
  },
};

/** Every page, keyed by a language-independent id. */
export const ROUTES = {
  home: { es: "/", en: "/en" },
  installers: {
    es: "/instaladores-y-mantenedores",
    en: "/en/installers-and-maintainers",
  },
  receivers: { es: "/receptoras", en: "/en/alarm-receiving-centres" },
  owners: { es: "/propietarios", en: "/en/property-owners" },
  contact: { es: "/contacta", en: "/en/contact" },
  terms: { es: "/terminos-y-condiciones", en: "/en/terms-and-conditions" },
  privacy: { es: "/politica-de-privacidad", en: "/en/privacy-policy" },
} as const;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/** Path of a given page in a given language. */
export function path(key: RouteKey, lang: Lang): string {
  return ROUTES[key][lang];
}

/** Absolute URL, for metadata and the sitemap. */
export function url(key: RouteKey, lang: Lang): string {
  return `${SITE_URL}${path(key, lang)}`;
}

/**
 * Which language a pathname belongs to. Used by the header, which is a client
 * component and only has `usePathname()` to go on.
 */
export function langFromPathname(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** Which page a pathname is, or `null` for anything unrecognised (404s). */
export function routeKeyFromPathname(pathname: string): RouteKey | null {
  // Trailing slashes only ever appear on the home paths.
  const clean =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  return (
    ROUTE_KEYS.find((key) => ROUTES[key].es === clean || ROUTES[key].en === clean) ??
    null
  );
}

/**
 * The same page in the other language. Falls back to that language's home page
 * when the current URL is not one of ours, so the switcher never 404s.
 */
export function counterpartPath(pathname: string, target: Lang): string {
  const key = routeKeyFromPathname(pathname);
  return path(key ?? "home", target);
}

/**
 * `alternates` for a page's metadata: the canonical URL plus the hreflang map
 * telling search engines the two versions are translations of each other.
 */
export function alternates(key: RouteKey, lang: Lang) {
  return {
    canonical: url(key, lang),
    languages: {
      es: url(key, "es"),
      en: url(key, "en"),
      "x-default": url(key, DEFAULT_LANG),
    },
  };
}
