import Image from "next/image";
import { getContent } from "@/lib/content";
import { path, type Lang } from "@/lib/i18n";
import {
  Button,
  Container,
  Display2,
  Display4,
  Section,
  TitleBadge,
} from "./ui";

/** Closing "Programa una demo" band. Shown at the bottom of every marketing page. */
export function DemoCtaSection({ lang }: { lang: Lang }) {
  const c = getContent(lang).demoCta;

  return (
    <section className="relative overflow-hidden py-32 md:py-48 lg:py-[269px]">
      <Image
        src="/images/dots-background.avif"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none object-contain object-center select-none"
      />
      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <TitleBadge>{c.badge}</TitleBadge>
          <Display2>{c.title}</Display2>
          <p className="text-lg text-body">{c.body}</p>
          <Button href={path("contact", lang)} className="mt-2">
            {c.cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}

/** "Soporte técnico" block, shared by the three audience pages. */
export function SupportSection({ lang }: { lang: Lang }) {
  const c = getContent(lang).support;

  return (
    <Section>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <TitleBadge>{c.badge}</TitleBadge>
          <Display2>{c.title}</Display2>
          <p className="text-lg text-body">{c.body}</p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {c.features.map((feature) => (
            <div
              key={feature.title}
              className="ring-hairline flex flex-col gap-4 rounded-2xl bg-surface p-8"
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
  );
}

/** "Por qué es importante el Cloud" block, shared by the owners and installers pages. */
export function CloudSection({ lang }: { lang: Lang }) {
  const c = getContent(lang).cloud;

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="rounded-[20px] border border-[#bad0ff24] p-[11px]">
            <div className="flex flex-col gap-6 rounded-[11px] bg-surface bg-[radial-gradient(circle_at_0_0,#1976e4,#1976e45e_0%,#1976e400_64%)] p-10 shadow-[0_0_0_1px_#bcdfff1a]">
              <Image
                src="/images/cloud-illustration.avif"
                alt=""
                width={420}
                height={280}
                aria-hidden="true"
                className="mx-auto h-auto w-full max-w-sm"
              />
              <Display4 as="h3">{c.cardTitle}</Display4>
              <p className="text-body">{c.cardBody}</p>
            </div>
          </div>

          <div>
            <Display2>{c.title}</Display2>
            <p className="mt-6 text-lg text-body">{c.body}</p>
            <ul className="mt-10 flex flex-col gap-6">
              {c.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <span className="ring-hairline flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Image
                      src={feature.icon}
                      alt=""
                      width={20}
                      height={20}
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </span>
                  <span className="font-medium text-white">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
