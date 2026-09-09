import Image from "next/image";
import {
  Button,
  Container,
  Display1,
  Display2,
  Display4,
  Section,
  SoonBadge,
  TitleBadge,
} from "./ui";

export type ProfileCard = {
  image: string;
  alt: string;
  title: string;
  body: string;
  soon?: boolean;
};

export function ProfileHero({
  badge,
  title,
  body,
  visual,
  visualAlt,
  visualClassName = "",
  ctaLabel = "Programa una demo",
}: {
  badge: string;
  title: string;
  body: string;
  visual: string;
  visualAlt: string;
  visualClassName?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-48 md:pb-[110px]">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <TitleBadge>{badge}</TitleBadge>
            <Display1>{title}</Display1>
            <p className="text-lg text-body">{body}</p>
            <Button href="/contacta" className="mt-2">
              {ctaLabel}
            </Button>
          </div>
          <div className="-mx-[12vw] lg:-mr-[10vw] lg:ml-0 lg:w-[calc(100%+10vw)]">
            <Image
              src={visual}
              alt={visualAlt}
              width={900}
              height={700}
              priority
              sizes="(max-width: 1024px) 124vw, 60vw"
              className={`h-auto w-full ${visualClassName}`}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProfileFeatureCard({ card }: { card: ProfileCard }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-surface">
      <Image
        src={card.image}
        alt={card.alt}
        width={640}
        height={420}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 340px"
        className="h-auto w-full"
      />
      <div className="flex flex-col items-start gap-4 p-8">
        <div className="flex flex-wrap items-center gap-4">
          <Display4>{card.title}</Display4>
          {card.soon ? <SoonBadge /> : null}
        </div>
        <p className="text-body">{card.body}</p>
      </div>
    </article>
  );
}

export function ProfileSection({
  badge,
  title,
  body,
  cards,
}: {
  badge?: string;
  title?: string;
  body?: string;
  cards: ProfileCard[];
}) {
  return (
    <Section>
      <Container>
        {title ? (
          <div className="flex max-w-3xl flex-col items-start gap-6">
            {badge ? <TitleBadge>{badge}</TitleBadge> : null}
            <Display2>{title}</Display2>
            {body ? <p className="text-lg text-body">{body}</p> : null}
          </div>
        ) : null}

        <div className={`grid gap-10 sm:grid-cols-2 ${title ? "mt-16" : ""}`}>
          {cards.map((card) => (
            <ProfileFeatureCard key={card.title} card={card} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Closing highlight used on /instaladores-y-mantenedores and /receptoras. */
export function AiHighlightSection() {
  return (
    <Section className="!pt-0">
      <Container>
        <div className="ring-hairline relative overflow-hidden rounded-2xl bg-surface">
          <Image
            src="/images/ilus-a3-5.avif"
            alt="Operaciones automatizadas por la inteligencia artificial de Nusku"
            width={1290}
            height={778}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full lg:absolute lg:top-0 lg:right-0 lg:w-1/2"
          />
          <div className="flex flex-col items-start gap-5 px-10 py-14 lg:w-1/2 lg:px-14 lg:py-20">
            <SoonBadge />
            <Display2 as="h3">Operaciones automatizadas por la I.A.</Display2>
            <p className="text-lg text-body">
              Nusku es la única plataforma para gestión de instalaciones de
              detección de incendios que incorpora la I.A. y te ahorra horas de
              instalación y gestión.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Wide "Planimetría de emergencias" block used on /propietarios. */
export function PlanimetriaSection() {
  return (
    <Section className="!pt-0">
      <Container>
        <div className="grid items-center gap-10 overflow-hidden rounded-2xl bg-[#c2e8ff0a] shadow-[inset_0_0_0_1px_#c1d6ff1a] lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5 p-10 lg:p-14">
            <Display2 as="h3">Planimetría de emergencias</Display2>
            <p className="text-lg text-body">
              Es posible consultar en la plataforma lo que está pasando en cada
              dispositivo que está instalado y diferenciar la tipología del
              mismo y en que estado se encuentra.
            </p>
          </div>
          <Image
            src="/images/c1-05.avif"
            alt="Planimetría de emergencias mostrando el estado de cada dispositivo"
            width={900}
            height={700}
            sizes="(max-width: 1024px) 100vw, 700px"
            className="h-auto w-full"
          />
        </div>
      </Container>
    </Section>
  );
}
