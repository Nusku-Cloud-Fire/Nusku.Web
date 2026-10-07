import consumersData from "@/content/docs/consumers.json";
import { DOC_PAGES_META, getDocMeta } from "./meta";
import type { DocPageMeta } from "./types";

export type Consumer = {
  id: string;
  name: string;
  contacts: string[];
  /** Ids of the pages this consumer may see. */
  pages: string[];
};

const consumers: Consumer[] = consumersData;

const INTERNAL_DOMAIN = "nusku.cloud";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isInternalEmail(email: string): boolean {
  const e = normalizeEmail(email);
  // Compare the part after the LAST "@" exactly: endsWith would accept evilnusku.cloud.
  return e.includes("@") && e.slice(e.lastIndexOf("@") + 1) === INTERNAL_DOMAIN;
}

function consumersOf(email: string): Consumer[] {
  const e = normalizeEmail(email);
  return consumers.filter((c) => c.contacts.some((contact) => normalizeEmail(contact) === e));
}

export function isKnownEmail(email: string): boolean {
  return isInternalEmail(email) || consumersOf(email).length > 0;
}

export function canView(email: string, pageId: string): boolean {
  if (!getDocMeta(pageId)) return false;
  return isInternalEmail(email) || consumersOf(email).some((c) => c.pages.includes(pageId));
}

export function pagesFor(email: string): DocPageMeta[] {
  return DOC_PAGES_META.filter((meta) => canView(email, meta.id));
}
