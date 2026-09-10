import type { Metadata } from "next";
import { ReceiversPage } from "@/components/pages/receivers";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const c = getContent("es").receivers;

export const metadata: Metadata = pageMetadata("receivers", "es", {
  title: c.metaTitle,
  description: c.metaDescription,
});

export default function Page() {
  return <ReceiversPage lang="es" />;
}
