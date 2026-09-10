import Image from "next/image";
import { DemoCtaSection } from "@/components/sections";
import {
  Button,
  Container,
  Display1,
  Display2,
  Display4,
  FramedCard,
  Section,
  TitleBadge,
} from "@/components/ui";
import { getContent } from "@/lib/content";
import { path, type Lang } from "@/lib/i18n";

export function HomePage({ lang }: { lang: Lang }) {
  const c = getContent(lang).home;
  const chrome = getContent(lang).chrome;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden pt-40 pb-20 md:pt-48 md:pb-[110px]">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <Display1>{c.hero.title}</Display1>
            <p className="max-w-3xl text-lg text-body">{c.hero.body}</p>
            <p className="max-w-3xl text-body">{c.hero.body2}</p>
            <Button href={path("contact", lang)} className="mt-2">
              {c.hero.cta}
            </Button>
          </div>

          <Image
            src="/images/hero-visual.avif"
            alt={c.hero.alt}
            width={1400}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="mt-16 h-auto w-full"
          />
        </Container>
      </section>

      {/* Installers and maintainers */}
      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <TitleBadge>{c.installers.badge}</TitleBadge>
              <Display2>{c.installers.title}</Display2>
              <p className="text-lg text-body">{c.installers.body}</p>
              <Button href={path("installers", lang)} className="mt-2">
                {chrome.learnMore}
              </Button>
            </div>
            <Image
              src="/images/instaladores-visual.avif"
              alt={c.installers.alt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {c.installers.features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-6 text-center"
              >
                <Image
                  src={feature.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  className="h-6 w-6"
                />
                <Display4>{feature.title}</Display4>
                <p className="text-body">{feature.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Alarm receiving centres */}
      <Section>
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <TitleBadge>{c.receivers.badge}</TitleBadge>
            <Display2>{c.receivers.title}</Display2>
            <p className="text-lg text-body">{c.receivers.body}</p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <FramedCard>
              <div className="flex flex-col gap-4 px-8 pt-9">
                <Display4>{c.receivers.cardOne.title}</Display4>
                <p className="text-body">{c.receivers.cardOne.body}</p>
              </div>
              <div className="mt-8 px-8">
                <Image
                  src="/images/screen-verificacion.avif"
                  alt={c.receivers.cardOne.alt}
                  width={600}
                  height={420}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-auto w-full rounded-xl border border-white/10"
                />
              </div>
            </FramedCard>

            <div className="ring-hairline flex flex-col justify-between overflow-hidden rounded-[10px] bg-surface bg-[radial-gradient(circle_at_0_0,#5e7ce0,#090639)] pt-9">
              <div className="flex flex-col gap-4 px-8">
                <Display4>{c.receivers.cardTwo.title}</Display4>
                <p className="text-white/90">{c.receivers.cardTwo.body}</p>
              </div>
              <Image
                src="/images/frame-74.avif"
                alt={c.receivers.cardTwo.alt}
                width={600}
                height={420}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="mt-8 h-auto w-full"
              />
            </div>

            <FramedCard>
              <div className="flex flex-col gap-4 px-8 pt-9">
                <Display4>{c.receivers.cardThree.title}</Display4>
                <p className="text-body">{c.receivers.cardThree.body}</p>
              </div>
              <div className="mt-8 px-8">
                <Image
                  src="/images/mockup-emergency.avif"
                  alt={c.receivers.cardThree.alt}
                  width={600}
                  height={420}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-auto w-full rounded-xl border border-white/10"
                />
              </div>
            </FramedCard>
          </div>

          <div className="mt-14 flex justify-center">
            <Button href={path("receivers", lang)}>{chrome.learnMore}</Button>
          </div>
        </Container>
      </Section>

      {/* Viewer for owners */}
      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Image
              src="/images/visor-visual.avif"
              alt={c.owners.alt}
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="h-auto w-full lg:order-1"
            />
            <div className="flex flex-col items-start gap-6 lg:order-2">
              <TitleBadge>{c.owners.badge}</TitleBadge>
              <Display2>{c.owners.title}</Display2>
              <p className="text-lg text-body">{c.owners.body}</p>
              <Button href={path("owners", lang)} className="mt-2">
                {chrome.learnMore}
              </Button>
            </div>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-2">
            {c.owners.features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-6 text-center"
              >
                <Image
                  src={feature.icon}
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  className="h-6 w-6"
                />
                <Display4>{feature.title}</Display4>
                <p className="text-body">{feature.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <DemoCtaSection lang={lang} />
    </>
  );
}
