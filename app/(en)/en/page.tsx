import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata("home", "en", {
  description: getContent("en").siteMeta.description,
});

export default function Page() {
  return <HomePage lang="en" />;
}
