import type { Metadata } from "next";
import { TermsPage } from "@/components/pages/terms";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("es").terms;

export const metadata: Metadata = pageMetadata("terms", "es", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <TermsPage lang="es" />;
}
