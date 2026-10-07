// Emails the consumer contacts when a docs page gets a new changelog entry
// between two commits. Usage: node scripts/docs-notify.mjs <before> <after> [--dry-run]
// Git is the only state: nothing records who was already notified.
import { execFileSync } from "node:child_process";
import path from "node:path";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const [before, after] = args.filter((a) => !a.startsWith("--"));

const PAGES_DIR = "content/docs/pages";
const CONSUMERS_FILE = "content/docs/consumers.json";
const fromEmail = process.env.DOCS_FROM_EMAIL || "docs@nusku.cloud";
const siteUrl = (process.env.SITE_URL || "https://www.nusku.cloud").replace(/\/+$/, "");

const git = (...a) =>
  execFileSync("git", a, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 64 * 1024 * 1024 });

function show(sha, file) {
  try {
    return git("show", `${sha}:${file}`);
  } catch {
    return undefined;
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

if (!after) {
  console.error("Usage: node scripts/docs-notify.mjs <before> <after> [--dry-run]");
  process.exit(2);
}

if (!before || /^0+$/.test(before)) {
  console.log("No previous commit; skipping notifications.");
  process.exit(0);
}

try {
  git("cat-file", "-e", `${before}^{commit}`);
} catch {
  console.log(`::warning::Commit ${before} is not in the repository (force-push?); skipping notifications.`);
  process.exit(0);
}

const changed = git("diff", "--name-only", before, after, "--", `${PAGES_DIR}/`)
  .split("\n")
  .map((f) => f.trim())
  .filter((f) => f.endsWith(".json"));

// pageId -> { title, entries }
const updated = new Map();
for (const file of changed) {
  const afterRaw = show(after, file);
  if (afterRaw === undefined) continue; // page deleted
  const page = JSON.parse(afterRaw);
  const beforeRaw = show(before, file);
  const previous = beforeRaw === undefined ? [] : (JSON.parse(beforeRaw).changelog ?? []);
  const seen = new Set(previous.map((e) => `${e.date}\u0000${e.note}`));
  const entries = (page.changelog ?? []).filter((e) => !seen.has(`${e.date}\u0000${e.note}`));
  if (entries.length > 0) {
    updated.set(page.id ?? path.basename(file, ".json"), { title: page.title, entries });
  }
}

// contact -> [{ id, title, entries }]
const byContact = new Map();
if (updated.size > 0) {
  const consumersRaw = show(after, CONSUMERS_FILE);
  const consumers = consumersRaw === undefined ? [] : JSON.parse(consumersRaw);
  for (const [id, { title, entries }] of updated) {
    const contacts = new Set();
    for (const c of consumers) {
      if (!c.pages?.includes(id)) continue;
      for (const email of c.contacts ?? []) contacts.add(email.trim().toLowerCase());
    }
    for (const email of contacts) {
      if (!byContact.has(email)) byContact.set(email, []);
      byContact.get(email).push({ id, title, entries });
    }
  }
}

if (byContact.size === 0) {
  console.log("No new changelog entries.");
  process.exit(0);
}

function buildEmail(email, pages) {
  const subject =
    pages.length === 1
      ? `Documentación actualizada: ${pages[0].title}`
      : `Documentación actualizada: ${pages.length} páginas`;
  const footer = "Recibes este aviso porque tienes acceso a esta documentación de Nusku.";

  const text = [
    ...pages.map((p) =>
      [
        p.title,
        ...p.entries.map((e) => `- ${formatDate(e.date)}: ${e.note}`),
        `${siteUrl}/documentacion/${p.id}`,
      ].join("\n"),
    ),
    footer,
  ].join("\n\n");

  const html = [
    ...pages.map(
      (p) =>
        `<h3>${escapeHtml(p.title)}</h3><ul>${p.entries
          .map((e) => `<li><strong>${escapeHtml(formatDate(e.date))}</strong>: ${escapeHtml(e.note)}</li>`)
          .join("")}</ul><p><a href="${escapeHtml(`${siteUrl}/documentacion/${p.id}`)}">Ver la página</a></p>`,
    ),
    `<p style="color:#666;font-size:12px">${escapeHtml(footer)}</p>`,
  ].join("");

  return { to: email, subject, text, html };
}

const emails = [...byContact].map(([email, pages]) => buildEmail(email, pages));

if (dryRun) {
  for (const m of emails) console.log(`To: ${m.to}\nSubject: ${m.subject}\n\n${m.text}\n\n---`);
  console.log(`Dry run: ${emails.length} notification(s), nothing sent.`);
  process.exit(0);
}

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("::error::RESEND_API_KEY is not set; pending notifications were not sent:");
  for (const [email, pages] of byContact) {
    console.error(`  ${email}: ${pages.map((p) => p.id).join(", ")}`);
  }
  process.exit(1);
}

const failed = [];
let sent = 0;
for (const m of emails) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        // Re-running the job does not duplicate emails that already went out.
        "Idempotency-Key": `docs-${after}-${m.to}`,
      },
      body: JSON.stringify({
        from: `Nusku Documentación <${fromEmail}>`,
        to: [m.to],
        subject: m.subject,
        html: m.html,
        text: m.text,
      }),
    });
    if (res.ok) {
      sent++;
    } else {
      failed.push(`${m.to}: HTTP ${res.status} ${(await res.text().catch(() => "")).slice(0, 200)}`);
    }
  } catch (e) {
    failed.push(`${m.to}: ${e.message}`);
  }
}

if (failed.length > 0) {
  console.error(`::error::${failed.length} notification(s) failed (${sent} sent):`);
  for (const f of failed) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`Sent ${sent} notification(s).`);
