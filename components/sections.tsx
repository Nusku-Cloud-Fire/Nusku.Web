import Image from "next/image";
import { Button, Container, Display2, Display4, Section, TitleBadge } from "./ui";

/** Closing "Programa una demo" band. Shown at the bottom of every marketing page. */
export function DemoCtaSection() {
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
          <TitleBadge>Realiza una demo</TitleBadge>
          <Display2>¿Te enseñamos de qué es capaz la plataforma?</Display2>
          <p className="text-lg text-body">
            Agenda una demostración y compártenos tus requerimientos para evaluar
            cómo podemos asistirte.
          </p>
          <Button href="/contacta" className="mt-2">
            Programa una demo
          </Button>
        </div>
      </Container>
    </section>
  );
}

const supportFeatures = [
  {
    icon: "/images/clock.svg",
    title: "Soporte 24/7",
    body: "Nuestro servicio de soporte técnico 24/7 está diseñado para darle la asistencia que necesitas desde cualquier parte y con un equipo de expertos en el sector.",
  },
  {
    icon: "/images/eye.svg",
    title: "Soporte en tiempo real",
    body: "Nuestros ingenieros pueden acceder a tu cuenta en remoto para darte soporte en tiempo real y resolver tu problema al momento.",
  },
];

/** "Soporte técnico" block, shared by the three audience pages. */
export function SupportSection() {
  return (
    <Section>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <TitleBadge>Soporte técnico</TitleBadge>
          <Display2>Un soporte técnico gestionado por ingenieros expertos</Display2>
          <p className="text-lg text-body">
            Contar con ingenieros en el soporte técnico garantiza una atención más
            especializada y eficiente. Ellos pueden diagnosticar problemas
            complejos rápidamente y ofrecer soluciones efectivas, lo que reduce el
            tiempo de inactividad. Además, su experiencia permite una mejor
            comprensión de los sistemas, lo que se traduce en un servicio más
            proactivo y preventivo.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {supportFeatures.map((feature) => (
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

const cloudFeatures = [
  {
    icon: "/images/globe-01.svg",
    label: "Arquitectura distribuida con escalabilidad sin límites",
  },
  {
    icon: "/images/shield-03.svg",
    label: "Más altos estándares de la industria en seguridad y fiabilidad",
  },
  // NOTE: the live Webflow site repeats the first label here. Kept verbatim.
  {
    icon: "/images/data.svg",
    label: "Arquitectura distribuida con escalabilidad sin límites",
  },
];

/** "Por qué es importante el Cloud" block, shared by /propietarios and /instaladores-y-mantenedores. */
export function CloudSection() {
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
                className="h-auto w-full max-w-sm"
              />
              <Display4 as="h3">
                Por qué es importante el Cloud en la seguridad de hoy en día
              </Display4>
              <p className="text-body">
                En la era digital, almacenar datos en la nube se ha convertido en
                una práctica común y conveniente. Sin embargo, la seguridad de esos
                datos es una preocupación fundamental para muchos usuarios.
                Afortunadamente, con la plataforma de NUSKU las soluciones de
                almacenamiento e interacción en la nube ofrecen múltiples capas de
                protección para garantizar que tu información y datos estén a salvo.
              </p>
            </div>
          </div>

          <div>
            <Display2>Tus datos siempre protegidos</Display2>
            <p className="mt-6 text-lg text-body">
              Agenda una demostración y compártenos tus requerimientos para evaluar
              cómo podemos asistirte.
            </p>
            <ul className="mt-10 flex flex-col gap-6">
              {cloudFeatures.map((feature, index) => (
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
