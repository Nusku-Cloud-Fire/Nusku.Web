import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { canView, isKnownEmail } from "./registry";
import { getAuthSecret, verifyToken } from "./token";

export const DOCS_COOKIE = "nusku_docs";

/** Only internal docs paths; anything else (external URLs, protocol-relative, the login page) falls back to the index. */
export function safeNext(next: unknown): string {
  if (
    typeof next === "string" &&
    next.startsWith("/documentacion") &&
    !next.includes("//") &&
    !next.includes("\\") &&
    !next.startsWith("/documentacion/acceso")
  ) {
    return next;
  }
  return "/documentacion";
}

export async function getDocsSession(): Promise<{ email: string } | null> {
  if (!getAuthSecret()) return null;
  const token = (await cookies()).get(DOCS_COOKIE)?.value;
  const session = token ? verifyToken(token, "session") : null;
  // Re-checked on every request so removing someone from the registry cuts
  // their access even while their cookie is still valid.
  return session && isKnownEmail(session.email) ? session : null;
}

/** Whether access can work at all: the secret, plus a mail key in production. */
export function docsAvailable(): boolean {
  if (!getAuthSecret()) return false;
  return process.env.NODE_ENV !== "production" || !!process.env.RESEND_API_KEY;
}

export type DocsAccess =
  | { status: "unavailable" }
  | { status: "forbidden"; email: string }
  | { status: "ok"; email: string };

/**
 * Session check shared by the docs pages. Whether a slug exists is decided by
 * the page AFTER this, so an anonymous visitor can't probe for page names.
 */
export async function docsAccess(
  pageId: string | undefined,
  nextPath: string,
): Promise<DocsAccess> {
  // Opt the route into dynamic rendering before reading env vars: otherwise a
  // build without the secret would prerender and serve "unavailable" forever.
  await cookies();
  if (!docsAvailable()) return { status: "unavailable" };
  const session = await getDocsSession();
  if (!session) redirect("/documentacion/acceso?next=" + encodeURIComponent(nextPath));
  if (pageId !== undefined && !canView(session.email, pageId)) {
    return { status: "forbidden", email: session.email };
  }
  return { status: "ok", email: session.email };
}
