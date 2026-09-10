import { ContactForm } from "@/components/contact-form";
import { Container, Display2, TitleBadge } from "@/components/ui";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export function ContactPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).contact;

  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-start gap-6">
            <TitleBadge>{c.badge}</TitleBadge>
            <Display2 as="h1">{c.title}</Display2>
          </div>

          <div className="mt-14">
            <ContactForm lang={lang} copy={c.form} />
          </div>
        </div>
      </Container>
    </section>
  );
}
