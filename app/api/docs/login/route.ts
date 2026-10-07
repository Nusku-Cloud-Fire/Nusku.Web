import { NextResponse } from "next/server";
import { isKnownEmail, normalizeEmail } from "@/lib/docs/registry";
import { safeNext } from "@/lib/docs/session";
import { LINK_TTL, getAuthSecret, signToken } from "@/lib/docs/token";

function envOr(name: string, fallback: string) {
  const value = process.env[name];
  return value && value.trim() !== "" ? value.trim() : fallback;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function originOf(request: Request) {
  const configured = process.env.SITE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  // Host headers are client-controlled: in production a forged one would put a
  // valid token in a link to someone else's domain. Only trust them locally.
  if (process.env.NODE_ENV === "production") return "https://www.nusku.cloud";
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto =
    request.headers.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const raw = typeof body?.email === "string" ? body.email.slice(0, 256) : "";
  const email = normalizeEmail(raw);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!getAuthSecret()) {
    console.error("[docs] DOCS_AUTH_SECRET is missing or shorter than 32 bytes");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey && process.env.NODE_ENV === "production") {
    console.error("[docs] RESEND_API_KEY is not set — login links cannot be sent");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // Same response whether or not the email is authorised, so the form can't
  // be used to discover who has access.
  if (!isKnownEmail(email)) return NextResponse.json({ ok: true });

  const token = signToken(email, "link", LINK_TTL);
  const link = `${originOf(request)}/api/docs/verify?t=${token}&next=${encodeURIComponent(safeNext(body.next))}`;

  if (!apiKey) {
    console.info(`[docs] dev login link for ${email}: ${link}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Nusku Documentación <${envOr("DOCS_FROM_EMAIL", "docs@nusku.cloud")}>`,
        to: [email],
        subject: "Tu enlace de acceso a la documentación de Nusku",
        html: `<p>Hola,</p><p>Pulsa el siguiente enlace para acceder a la documentación de Nusku. Caduca en 15 minutos.</p><p><a href="${escapeHtml(link)}">Acceder a la documentación</a></p><p>Si no lo has pedido, ignora este correo.</p>`,
        text: `Hola,\n\nAccede a la documentación de Nusku con este enlace (caduca en 15 minutos):\n${link}\n\nSi no lo has pedido, ignora este correo.`,
      }),
    });
    if (!response.ok) {
      console.error(
        "[docs] Resend responded %s: %s",
        response.status,
        await response.text().catch(() => ""),
      );
    }
  } catch (error) {
    console.error("[docs] could not reach Resend:", error);
  }

  return NextResponse.json({ ok: true });
}
