import { NextResponse } from "next/server";
import { DOCS_COOKIE } from "@/lib/docs/session";

// POST only: a GET could be fired by a link prefetch and log people out.
export async function POST() {
  const res = new NextResponse(null, {
    status: 303,
    headers: { Location: "/documentacion/acceso" },
  });
  res.cookies.set(DOCS_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
