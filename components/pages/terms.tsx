import { Container, Display2 } from "@/components/ui";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export function TermsPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).terms;

  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Display2 as="h1">{c.title}</Display2>
          <p className="mt-8 text-lg text-body">
            {c.bodyBefore}{" "}
            <a
              href="mailto:info@nusku.cloud"
              className="text-blue-plus underline"
            >
              info@nusku.cloud
            </a>{" "}
            {c.bodyAfter}
          </p>
        </div>
      </Container>
    </section>
  );
}
