import type { Metadata } from "next";
import { InstallersPage } from "@/components/pages/installers";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("es").installers;

export const metadata: Metadata = pageMetadata("installers", "es", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <InstallersPage lang="es" />;
}
