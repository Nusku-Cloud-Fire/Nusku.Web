import {
  CloudSection,
  DemoCtaSection,
  SupportSection,
} from "@/components/sections";
import {
  AiHighlightSection,
  ProfileHero,
  ProfileSection,
} from "@/components/profile";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export function InstallersPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).installers;

  return (
    <>
      <ProfileHero
        lang={lang}
        badge={c.hero.badge}
        title={c.hero.title}
        body={c.hero.body}
        visual="/images/visual-hero-instaladores.avif"
        visualAlt={c.hero.alt}
        ctaLabel={c.hero.cta}
      />

      <ProfileSection
        lang={lang}
        badge={c.install.badge}
        title={c.install.title}
        body={c.install.body}
        cards={c.install.cards}
      />

      <ProfileSection
        lang={lang}
        badge={c.design.badge}
        title={c.design.title}
        body={c.design.body}
        cards={c.design.cards}
      />

      <ProfileSection
        lang={lang}
        badge={c.manage.badge}
        title={c.manage.title}
        body={c.manage.body}
        cards={c.manage.cards}
      />

      <AiHighlightSection lang={lang} />
      <CloudSection lang={lang} />
      <SupportSection lang={lang} />
      <DemoCtaSection lang={lang} />
    </>
  );
}
