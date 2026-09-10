import { notFound } from "next/navigation";

/**
 * Catch-all so unmatched URLs get the styled 404 in the right language.
 * Each language has its own root layout (for `<html lang>`), which means there
 * is no single `app/layout.tsx` for Next to hang a global `not-found.tsx` on —
 * without this, unmatched paths fall back to Next's bare built-in 404 page.
 *
 * Anything under `/en/` matches the more specific catch-all in the English
 * group instead, so it gets the English 404.
 */
export default function CatchAll(): never {
  notFound();
}
