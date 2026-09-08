import type { Metadata } from "next";
import { DemoCtaSection, SupportSection } from "@/components/sections";
import {
  AiHighlightSection,
  ProfileHero,
  ProfileSection,
  type ProfileCard,
} from "@/components/profile";

export const metadata: Metadata = {
  title: "Receptoras",
  description:
    "Reduce las falsas alarmas a prácticamente cero y optimiza la gestión de tu Central Receptora con la información predictiva de Nusku.",
  alternates: { canonical: "/receptoras" },
};

const secureCards: ProfileCard[] = [
  {
    image: "/images/c1-01.avif",
    alt: "Sistema Plus Sensor analizando los minutos previos a una alarma",
    title: "Sistema Plus Sensor",
    body: "El sistema DM Sensor almacena 5 minutos anteriores a la alarma de fuego y se compara los algoritmos y curvas lógicas, generando una probabilidad real de fuego, en que punto se encuentra y la zona.",
  },
  {
    image: "/images/ilus-a2-02.avif",
    alt: "Detección de presencia mediante inteligencia artificial",
    title: "Detección de hombre muerto",
    soon: true,
    body: "Con ayuda de la inteligencia artificial, el sistema genera un algoritmo de detección de fuego, humo y presencia de «hombre muerto».",
  },
  {
    image: "/images/ilus-a2-01.avif",
    alt: "Planos de la instalación con itinerarios de evacuación",
    title: "Planimetría",
    body: "Acceso a planos para evaluación y revisión de espacios, localización de instalaciones y confirmación de itinerarios de evacuación en caso de emergencia.",
  },
  {
    image: "/images/b3-04.avif",
    alt: "Enlace de video verificación compartido con emergencias",
    title: "Conectividad e información",
    body: "Genera links con video verificación para consulta en tiempo real a bomberos o cualquier otra unidad de emergencia.",
  },
];

const designCards: ProfileCard[] = [
  {
    image: "/images/ilus-a2-02.avif",
    alt: "Cálculo de rutas de evacuación",
    title: "Cálculo de rutas de evacuación",
    soon: true,
    body: "Con ayuda de la I.A. de la plataforma, podremos calcular las rutas de evacuación más idóneas para la instalación y con interacción a tiempo real.",
  },
  {
    image: "/images/b2-02.avif",
    alt: "Dispositivos compatibles con la plataforma",
    title: "Compatibilidad con dispositivos",
    body: "Proyecta la instalación con los dispositivos que mejor se adapten a las circunstancias.",
  },
  {
    image: "/images/b3-01.avif",
    alt: "Definición de escenarios y zonas de la instalación",
    title: "Diferentes escenarios",
    body: "Delimita diferentes escenarios para la instalación, acotando zonas e instancias que sean cruciales para la seguridad de la misma.",
  },
  {
    image: "/images/ilus-a2-01.avif",
    alt: "Visualización de planos de la instalación",
    title: "Planimetría",
    body: "Visualiza los planos con facilidad y diseña de manera ágil la instalación perfecta.",
  },
];

const manageCards: ProfileCard[] = [
  {
    image: "/images/b3-01.avif",
    alt: "Gestión de escenarios en la plataforma",
    title: "Gestión de escenarios",
    body: "Visualiza las operaciones de mayor importancia, crea nuevos escenarios y relaciona los dispositivos de la instalación con ayuda del asistente.",
  },
  {
    image: "/images/b3-02.avif",
    alt: "Alertas y avisos de la instalación",
    title: "Alertas y avisos",
    body: "Las alarmas de fuego o alertas de avería, se podrán gestionar de forma fácil por el operador de la Central Receptora, ya que con la plataforma, tendrán toda la información a tiempo real sin falsas alarmas.",
  },
  {
    image: "/images/b3-03.avif",
    alt: "Gestión de una emergencia con video verificación y planimetría",
    title: "Emergencias",
    body: "Genera de forma automática un enlace para video verificación y planimetría donde podrás compartir con los propietarios de la instalación o con los cuerpos de seguridad de forma interactiva.",
  },
  {
    image: "/images/b3-04.avif",
    alt: "Responsables de la instalación conectados a la plataforma",
    title: "Conectividad con los responsables",
    body: "Los responsables de la instalación estarán siempre conectados a la plataforma y con la posibilidad de interactuar con la Central Receptora a tiempo real.",
  },
];

export default function ReceptorasPage() {
  return (
    <>
      <ProfileHero
        badge="nusku para receptoras"
        title="Reduce falsas alarmas y optimiza la gestión de tu Central Receptora"
        body="Con la información predictiva de que dispone la plataforma, podrás reducir las falsas alarmas a prácticamente cero, ya que el sistema te aportará la probabilidad de fuego con ayuda de la I.A."
        visual="/images/visual-hero-receptoras.avif"
        visualAlt="Plataforma Nusku para centrales receptoras de alarmas"
      />

      <ProfileSection
        title="Instalaciones más seguras, más completas y más conectadas"
        body="Accede a toda la información necesaria para informar de lo que está ocurriendo en la instalación en tiempo real y adelantarte a los acontecimientos."
        cards={secureCards}
      />

      <ProfileSection
        title="Diseña la instalación y facilita la conectividad con tu Central Receptora"
        body="El sistema ayuda a calcular el diseño de la instalación para proyectar la solución más adecuada y para que no pierdas conectividad en ningún momento."
        cards={designCards}
      />

      <ProfileSection
        title="Gestiona la instalación con ayuda de la I.A."
        body="Gestiona la instalación con ayuda de la inteligencia artificial y programa nuevos escenarios conforme las necesidades de tu cliente."
        cards={manageCards}
      />

      <AiHighlightSection />
      <SupportSection />
      <DemoCtaSection />
    </>
  );
}
