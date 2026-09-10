import type { Metadata } from "next";
import { OwnersPage } from "@/components/pages/owners";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("es").owners;

export const metadata: Metadata = pageMetadata("owners", "es", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <OwnersPage lang="es" />;
}
