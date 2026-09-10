import { NextResponse } from "next/server";

const REQUIRED_FIELDS = [
  "nombre",
  "apellidos",
  "email",
  "telefono",
  "empresa",
  "perfil",
] as const;

const PERFILES = ["Instalador", "Mantenedor", "Receptora", "Propietario"];

// An unset var is `undefined`, but a var left blank in .env is `""` — treat
// both as "not configured" so the defaults below still apply.
function envOr(name: string, fallback: string) {
  const value = process.env[name];
  return value && value.trim() !== "" ? value.trim() : fallback;
}

const CONTACT_TO = envOr("CONTACT_TO_EMAIL", "info@nusku.cloud");
const CONTACT_FROM = envOr("CONTACT_FROM_EMAIL", "web@nusku.cloud");

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: silently accept and drop bot submissions.
  if (typeof body.empresa_web === "string" && body.empresa_web.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const values: Record<string, string> = {};

  for (const field of REQUIRED_FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || value.trim() === "") {
      return NextResponse.json(
        { error: "missing_field", field },
        { status: 400 },
      );
    }
    values[field] = value.trim().slice(0, 256);
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
    return NextResponse.json(
      { error: "invalid_field", field: "email" },
      { status: 400 },
    );
  }

  if (!PERFILES.includes(values.perfil)) {
    return NextResponse.json(
      { error: "invalid_field", field: "perfil" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fail loudly rather than silently dropping a lead: the form then shows
    // the "escríbenos a info@nusku.cloud" fallback.
    console.error("[contact] RESEND_API_KEY is not set — submission not delivered");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  // The form posts the Spanish `perfil` value in both languages, so this stays
  // consistent; `lang` only records which version of the site the lead used,
  // so whoever replies knows to write back in English.
  const lang = body.lang === "en" ? "en" : "es";

  const rows = [
    ["Nombre", `${values.nombre} ${values.apellidos}`],
    ["Email", values.email],
    ["Teléfono", values.telefono],
    ["Empresa", values.empresa],
    ["Perfil", values.perfil],
    ["Idioma", lang === "en" ? "Inglés — responder en inglés" : "Español"],
  ];

  let response: Response;

  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Nusku Web <${CONTACT_FROM}>`,
        to: [CONTACT_TO],
        reply_to: values.email,
        subject: `Nueva solicitud de demo — ${values.nombre} ${values.apellidos} (${values.perfil})`,
        html: `<h2>Nueva solicitud de demo</h2><table>${rows
          .map(
            ([label, value]) =>
              `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")}</table>`,
        text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
      }),
    });
  } catch (error) {
    // Network/DNS failure reaching Resend: return the same fallback the form
    // already handles instead of throwing an unhandled 500.
    console.error("[contact] could not reach Resend:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  if (!response.ok) {
    console.error(
      "[contact] Resend responded %s: %s",
      response.status,
      await response.text().catch(() => ""),
    );
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
