import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("es").contact;

export const metadata: Metadata = pageMetadata("contact", "es", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <ContactPage lang="es" />;
}
