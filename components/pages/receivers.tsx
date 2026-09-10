import { DemoCtaSection, SupportSection } from "@/components/sections";
import {
  AiHighlightSection,
  ProfileHero,
  ProfileSection,
} from "@/components/profile";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export function ReceiversPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).receivers;

  return (
    <>
      <ProfileHero
        lang={lang}
        badge={c.hero.badge}
        title={c.hero.title}
        body={c.hero.body}
        visual="/images/visual-hero-receptoras.avif"
        visualAlt={c.hero.alt}
        ctaLabel={c.hero.cta}
      />

      <ProfileSection
        lang={lang}
        title={c.secure.title}
        body={c.secure.body}
        cards={c.secure.cards}
      />

      <ProfileSection
        lang={lang}
        title={c.design.title}
        body={c.design.body}
        cards={c.design.cards}
      />

      <ProfileSection
        lang={lang}
        title={c.manage.title}
        body={c.manage.body}
        cards={c.manage.cards}
      />

      <AiHighlightSection lang={lang} />
      <SupportSection lang={lang} />
      <DemoCtaSection lang={lang} />
    </>
  );
}
