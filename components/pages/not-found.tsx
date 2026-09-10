import { Button, Container, Display2 } from "@/components/ui";
import { getContent } from "@/lib/content";
import { path, type Lang } from "@/lib/i18n";

export function NotFoundPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).notFound;

  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Display2 as="h1">{c.title}</Display2>
          <p className="text-lg text-body">{c.body}</p>
          <Button href={path("home", lang)}>{c.cta}</Button>
        </div>
      </Container>
    </section>
  );
}
