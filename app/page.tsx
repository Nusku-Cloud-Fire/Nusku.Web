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

const installerFeatures = [
  {
    icon: "/images/map-02.svg",
    title: "Planimetría",
    body: "Gestiona incidencias a través de la planimetría informando las coordenadas específicas de la alarma o avería en la instalación.",
  },
  {
    icon: "/images/route.svg",
    title: "Rutas de Evacuación",
    body: "Cálculo de rutas de evacuación dimensionada a tiempo real y apoyo a las señalizaciones de emergencia.",
  },
  {
    icon: "/images/star-06.svg",
    title: "Mantenimiento predictivo",
    body: "Realiza el mantenimiento de su instalación de forma remota, no presencial.",
  },
];

const ownerFeatures = [
  {
    icon: "/images/settings-03.svg",
    title: "Administración de instalaciones",
    body: "El usuario final podrá administrar recursos para su instalación así como tener conectividad con los profesionales a cargo de la instalación.",
  },
  {
    icon: "/images/dotpoints-02.svg",
    title: "Visualización de dispositivos",
    body: "Con la herramienta para usuario final se podrá interaccionar con los dispositivos y comprobar el estado de los mismos.",
  },
  {
    icon: "/images/alert-triangle.svg",
    title: "Estados de alarma",
    body: "En caso de alarmas de incendio o averías, el usuario final dispondrá de los recursos para contactar con la Central Receptora o el mantenedor de la instalación.",
  },
  {
    icon: "/images/alert-triangle.svg",
    title: "Puesta en marcha",
    body: "La plataforma incorpora el innovador sistema Plex Sensor que permite identificar el dispositivo a través del destello del led. También se podrán direccionar los elementos por código QR, teléfono móvil y Bluetooth para una programación en remoto.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden pt-40 pb-20 md:pt-48 md:pb-[110px]">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
            <Display1>Detección de incendios con I.A.</Display1>
            <p className="max-w-3xl text-lg text-body">
              Configura y gestiona instalaciones de detección de incendios de
              forma rápida y sencilla, aportando prestaciones predictivas únicas
              en el mercado mediante Inteligencia Artificial.
            </p>
            <p className="max-w-3xl text-body">
              Nuestra IA procesa y analiza datos, aprende y crea algoritmos
              aportando soluciones revolucionarias y únicas de manera continua.
            </p>
            <Button href="/contacta" className="mt-2">
              Programa una demo
            </Button>
          </div>

          <Image
            src="/images/hero-visual.avif"
            alt="Panel de la plataforma Nusku mostrando el estado de una instalación de detección de incendios"
            width={1400}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 1400px"
            className="mt-16 h-auto w-full"
          />
        </Container>
      </section>

      {/* Instaladores y mantenedores */}
      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <TitleBadge>Instaladores y mantenedores</TitleBadge>
              <Display2>Proyecta y diseña tu instalación perfecta</Display2>
              <p className="text-lg text-body">
                El algoritmo de I.A. de Nusku realiza un estudio detallado de las
                necesidades para la instalación e identifica las áreas de alto
                riesgo aumentando la efectividad de la realización del proyecto.
              </p>
              <Button href="/instaladores-y-mantenedores" className="mt-2">
                Saber más
              </Button>
            </div>
            <Image
              src="/images/instaladores-visual.avif"
              alt="Vista de planimetría con las áreas de riesgo identificadas por la IA de Nusku"
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="h-auto w-full"
            />
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3">
            {installerFeatures.map((feature) => (
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

      {/* Centrales receptoras */}
      <Section>
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <TitleBadge>Centrales receptoras</TitleBadge>
            <Display2>Gestiona las alarmas de forma rápida y eficaz</Display2>
            <p className="text-lg text-body">
              El sistema de visualización y alertas de NUSKU minimiza y mejora la
              gestión de falsos positivos en cualquier instalación y en cualquier
              circunstancia.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            <FramedCard>
              <div className="flex flex-col gap-4 px-8 pt-9">
                <Display4>
                  Video verificación de la instalación en tiempo real
                </Display4>
                <p className="text-body">
                  El sistema monitoriza las alarmas de incendio en tiempo real,
                  facilitando la comprobación de las incidencias en la
                  instalación.
                </p>
              </div>
              <div className="mt-8 px-8">
                <Image
                  src="/images/screen-verificacion.avif"
                  alt="Pantalla de video verificación de una alarma en curso"
                  width={600}
                  height={420}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-auto w-full rounded-xl border border-white/10"
                />
              </div>
            </FramedCard>

            <div className="ring-hairline flex flex-col justify-between overflow-hidden rounded-[10px] bg-surface bg-[radial-gradient(circle_at_0_0,#5e7ce0,#090639)] pt-9">
              <div className="flex flex-col gap-4 px-8">
                <Display4>Conectividad directa con emergencias</Display4>
                <p className="text-white/90">
                  En situaciones de emergencia, el sistema genera un enlace para
                  conexión directa a planimetría y visualización de la
                  instalación.
                </p>
              </div>
              <Image
                src="/images/frame-74.avif"
                alt="Enlace de emergencia compartido con los servicios de emergencia"
                width={600}
                height={420}
                sizes="(max-width: 1024px) 100vw, 420px"
                className="mt-8 h-auto w-full"
              />
            </div>

            <FramedCard>
              <div className="flex flex-col gap-4 px-8 pt-9">
                <Display4>Alertas automáticas y personalizadas</Display4>
                <p className="text-body">
                  Posibilidad de acceso a listados de contactos directos con el
                  personal responsable de la instalación o empresa encargada del
                  mantenimiento.
                </p>
              </div>
              <div className="mt-8 px-8">
                <Image
                  src="/images/mockup-emergency.avif"
                  alt="Listado de contactos de emergencia en la aplicación de Nusku"
                  width={600}
                  height={420}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="h-auto w-full rounded-xl border border-white/10"
                />
              </div>
            </FramedCard>
          </div>

          <div className="mt-14 flex justify-center">
            <Button href="/receptoras">Saber más</Button>
          </div>
        </Container>
      </Section>

      {/* Visor para propietarios */}
      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Image
              src="/images/visor-visual.avif"
              alt="Visor de Nusku para propietarios de instalación"
              width={800}
              height={600}
              sizes="(max-width: 1024px) 100vw, 700px"
              className="h-auto w-full lg:order-1"
            />
            <div className="flex flex-col items-start gap-6 lg:order-2">
              <TitleBadge>Visor para propietarios</TitleBadge>
              <Display2>Ofrece una herramienta para el usuario final</Display2>
              <p className="text-lg text-body">
                Proporcionamos una herramienta para el usuario final donde le
                permite visualizar e interaccionar con los alertas y eventos de la
                instalación.
              </p>
              <Button href="/propietarios" className="mt-2">
                Saber más
              </Button>
            </div>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-2">
            {ownerFeatures.map((feature) => (
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

      <DemoCtaSection />
    </>
  );
}
