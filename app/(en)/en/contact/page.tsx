import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("en").contact;

export const metadata: Metadata = pageMetadata("contact", "en", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <ContactPage lang="en" />;
}
