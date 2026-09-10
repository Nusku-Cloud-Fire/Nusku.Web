import type { Metadata } from "next";
import { TermsPage } from "@/components/pages/terms";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("en").terms;

export const metadata: Metadata = pageMetadata("terms", "en", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <TermsPage lang="en" />;
}
