import {
  CloudSection,
  DemoCtaSection,
  SupportSection,
} from "@/components/sections";
import {
  PlanimetriaSection,
  ProfileHero,
  ProfileSection,
} from "@/components/profile";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export function OwnersPage({ lang }: { lang: Lang }) {
  const c = getContent(lang).owners;

  return (
    <>
      <ProfileHero
        lang={lang}
        badge={c.hero.badge}
        title={c.hero.title}
        body={c.hero.body}
        visual="/images/ilus-propietarios6.avif"
        visualAlt={c.hero.alt}
        ctaLabel={c.hero.cta}
      />

      <ProfileSection lang={lang} cards={c.cards} />
      <PlanimetriaSection lang={lang} />
      <CloudSection lang={lang} />
      <SupportSection lang={lang} />
      <DemoCtaSection lang={lang} />
    </>
  );
}
