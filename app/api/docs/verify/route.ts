import { NextResponse, type NextRequest } from "next/server";
import { isKnownEmail } from "@/lib/docs/registry";
import { DOCS_COOKIE, safeNext } from "@/lib/docs/session";
import { SESSION_TTL, signToken, verifyToken } from "@/lib/docs/token";

// Location is relative on purpose: behind SWA, request.url may not be the public host.
function redirectTo(location: string) {
  return new NextResponse(null, { status: 303, headers: { Location: location } });
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const link = verifyToken(params.get("t") ?? "", "link");

  if (!link || !isKnownEmail(link.email)) {
    return redirectTo("/documentacion/acceso?error=expirado");
  }

  const res = redirectTo(safeNext(params.get("next")));
  res.cookies.set(DOCS_COOKIE, signToken(link.email, "session", SESSION_TTL), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
  console.info("[docs] login ok", link.email, new Date().toISOString());
  return res;
}
