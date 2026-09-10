import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("es").privacy;

export const metadata: Metadata = pageMetadata("privacy", "es", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <PrivacyPage lang="es" />;
}
