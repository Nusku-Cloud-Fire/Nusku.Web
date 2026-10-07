import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsForbidden, DocsUnavailable } from "@/components/docs/session-bar";
import { DocPageLayout } from "@/components/pages/doc-page";
import { getDocPage } from "@/lib/docs/pages";
import { docsAccess } from "@/lib/docs/session";

type Props = { params: Promise<{ slug: string }> };

// The title is deliberately not in the metadata: it would leak to anyone
// without access. The layout already sets noindex.
export async function generateMetadata(): Promise<Metadata> {
  return { title: "Documentación" };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const access = await docsAccess(slug, "/documentacion/" + slug);

  if (access.status === "unavailable") return <DocsUnavailable />;
  if (access.status === "forbidden") return <DocsForbidden email={access.email} />;

  const page = getDocPage(slug);
  if (!page) notFound();
  const { meta, Body } = page;

  return (
    <DocPageLayout page={meta}>
      <Body />
    </DocPageLayout>
  );
}
