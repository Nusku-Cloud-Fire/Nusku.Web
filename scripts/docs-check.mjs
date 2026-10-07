// Validates content/docs (pages and consumer registry). No dependencies, so it
// runs in CI right after `npm ci` and blocks the deploy on any error.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const pagesDir = join(root, "content/docs/pages");
const bodiesDir = join(root, "components/docs/pages");
const consumersFile = join(root, "content/docs/consumers.json");

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const isText = (v) => typeof v === "string" && v.trim() !== "";

function readJson(file, where) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    fail(where, `cannot read JSON (${e.message})`);
    return undefined;
  }
}

function isValidDate(s) {
  if (typeof s !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

const pageIds = new Set();
const pageFiles = readdirSync(pagesDir).filter((f) => f.endsWith(".json"));

for (const file of pageFiles) {
  const slug = file.slice(0, -".json".length);
  const where = `content/docs/pages/${file}`;
  pageIds.add(slug);
  const page = readJson(join(pagesDir, file), where);
  if (page === undefined) continue;

  if (page.id !== slug) fail(where, `id "${page.id}" must equal the file name "${slug}"`);
  if (!isText(page.title)) fail(where, "title must be a non-empty string");
  if (!isText(page.summary)) fail(where, "summary must be a non-empty string");

  if (!Array.isArray(page.changelog)) {
    fail(where, "changelog must be an array");
  } else {
    page.changelog.forEach((entry, i) => {
      if (!isValidDate(entry?.date)) {
        fail(`${where} changelog[${i}]`, `date "${entry?.date}" must be a valid YYYY-MM-DD`);
      }
      if (!isText(entry?.note)) fail(`${where} changelog[${i}]`, "note must be a non-empty string");
    });
  }

  if (!existsSync(join(bodiesDir, `${slug}.tsx`))) {
    fail(where, `missing body component components/docs/pages/${slug}.tsx`);
  }
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const consumers = readJson(consumersFile, "content/docs/consumers.json");
let consumerCount = 0;

if (consumers !== undefined) {
  if (!Array.isArray(consumers)) {
    fail("content/docs/consumers.json", "must be an array");
  } else {
    consumerCount = consumers.length;
    const seen = new Set();
    consumers.forEach((c, i) => {
      const where = `consumers.json[${i}]${isText(c?.id) ? ` (${c.id})` : ""}`;
      if (!isText(c?.id)) fail(where, "id must be a non-empty string");
      else if (seen.has(c.id)) fail(where, `duplicate id "${c.id}"`);
      else seen.add(c.id);

      if (!isText(c?.name)) fail(where, "name must be a non-empty string");

      if (!Array.isArray(c?.contacts) || c.contacts.length === 0) {
        fail(where, "contacts must be a non-empty array of emails");
      } else {
        for (const email of c.contacts) {
          if (typeof email !== "string" || !EMAIL.test(email)) {
            fail(where, `invalid contact email "${email}"`);
          }
        }
      }

      if (!Array.isArray(c?.pages)) {
        fail(where, "pages must be an array of page ids");
      } else {
        for (const id of c.pages) {
          if (!pageIds.has(id)) fail(where, `unknown page id "${id}"`);
        }
      }
    });
  }
}

if (errors.length > 0) {
  console.error(`docs:check found ${errors.length} error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`docs:check OK: ${pageIds.size} page(s), ${consumerCount} consumer(s).`);
