"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LANGS,
  LANG_META,
  counterpartPath,
  langFromPathname,
} from "@/lib/i18n";

/**
 * Links the current page to its counterpart in the other language. Client-side
 * because it needs the pathname; it imports only the small route table, never
 * the content dictionaries.
 */
export function LanguageSwitcher({
  variant = "footer",
}: {
  variant?: "header" | "footer";
}) {
  const pathname = usePathname();
  const current = langFromPathname(pathname);

  if (variant === "header") {
    return (
      <div className="ring-hairline flex shrink-0 items-center rounded-md p-0.5">
        {LANGS.map((lang) => (
          <Link
            key={lang}
            href={counterpartPath(pathname, lang)}
            hrefLang={lang}
            aria-label={LANG_META[lang].switchLabel}
            aria-current={lang === current ? "true" : undefined}
            className="rounded-[5px] px-2.5 py-1.5 text-xs font-medium text-g3 uppercase transition-colors duration-200 hover:text-white aria-[current]:bg-white/10 aria-[current]:text-white"
          >
            {lang}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <ul className="mt-5 space-y-3">
      {LANGS.map((lang) => (
        <li key={lang}>
          <Link
            href={counterpartPath(pathname, lang)}
            hrefLang={lang}
            aria-current={lang === current ? "true" : undefined}
            className="text-sm text-g3 transition-colors hover:text-white aria-[current]:text-white"
          >
            {LANG_META[lang].name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
