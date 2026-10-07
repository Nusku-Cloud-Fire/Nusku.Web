import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocPageLayout } from "@/components/pages/doc-page";
import { getDocPage } from "@/lib/docs/pages";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  return {
    title: page?.meta.title,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getDocPage(slug);
  if (!page) notFound();
  const { meta, Body } = page;

  return (
    <DocPageLayout page={meta}>
      <Body />
    </DocPageLayout>
  );
}
