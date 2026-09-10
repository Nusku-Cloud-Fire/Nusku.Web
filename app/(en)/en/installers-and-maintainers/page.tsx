import type { Metadata } from "next";
import { InstallersPage } from "@/components/pages/installers";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("en").installers;

export const metadata: Metadata = pageMetadata("installers", "en", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <InstallersPage lang="en" />;
}
