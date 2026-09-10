import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("en").privacy;

export const metadata: Metadata = pageMetadata("privacy", "en", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <PrivacyPage lang="en" />;
}
