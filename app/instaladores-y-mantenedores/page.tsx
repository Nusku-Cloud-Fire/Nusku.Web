import type { Metadata } from "next";
import { CloudSection, DemoCtaSection, SupportSection } from "@/components/sections";
import {
  AiHighlightSection,
  ProfileHero,
  ProfileSection,
  type ProfileCard,
} from "@/components/profile";

export const metadata: Metadata = {
  title: "Instaladores y Mantenedores",
  description:
    "Diseña, instala y haz el mantenimiento de instalaciones de detección de incendios sin desplazamientos, con la I.A. de Nusku.",
  alternates: { canonical: "/instaladores-y-mantenedores" },
};

const installCards: ProfileCard[] = [
  {
    image: "/images/ilus-a-1-01.avif",
    alt: "Operaciones automatizadas por la I.A. en la plataforma Nusku",
    title: "Operaciones automatizadas por la I.A.",
    soon: true,
    body: "Automatiza las operaciones en tu instalación de forma predictiva con ayuda de la I.A.",
  },
  {
    image: "/images/ilus-a2-01.avif",
    alt: "Configuración de la instalación sobre la planimetría",
    title: "Configura la instalación y verifica con la Planimetría",
    body: "Con ayuda de la planimetría podrás acceder a los eventos de la instalación con tan solo un clic.",
  },
  {
    image: "/images/ilus-a-1-03.avif",
    alt: "Creación de escenarios en la instalación",
    title: "Crea escenarios en la instalación",
    body: "La plataforma permite crear diferentes escenarios para optimizar así la eficiencia de falsas alarmas.",
  },
  {
    image: "/images/ilus-a-1-04.avif",
    alt: "Dispositivos inteligentes conectados a la plataforma",
    title: "Dispositivos inteligentes",
    body: "El sistema permite que los dispositivos manden su estado de situación en cualquier momento.",
  },
];

const designCards: ProfileCard[] = [
  {
    image: "/images/ilus-a2-01.avif",
    alt: "Planimetría incorporada en la plataforma",
    title: "Planimetría incorporada",
    body: "La plataforma incorpora la planimetría de la instalación para ayudar a configurarla y visualizar los dispositivos.",
  },
  {
    image: "/images/ilus-a2-02.avif",
    alt: "Cálculo de rutas de evacuación",
    title: "Cálculo de rutas de evacuación",
    soon: true,
    body: "Con ayuda de la I.A. de la plataforma, podremos calcular las rutas de evacuación más idóneas para la instalación y con interacción a tiempo real.",
  },
  {
    image: "/images/ilus-a-1-04.avif",
    alt: "Dispositivos inteligentes enviando información de estado",
    title: "Dispositivos inteligentes",
    body: "Los dispositivos conectados al sistema de la plataforma, interaccionan y envían información del estado de la instalación, facilitando así su arquitectura y diseño.",
  },
  {
    image: "/images/ilus-a2-04.avif",
    alt: "Cálculo predictivo de probabilidad de fuego",
    title: "Cálculo predictivo",
    body: "La I.A. del sistema de NUSKU permite calcular el porcentaje de la probabilidad de fuego a tiempo real antes de que ocurra.",
  },
];

const manageCards: ProfileCard[] = [
  {
    image: "/images/ilus-a3-01.avif",
    alt: "Interacción remota con la instalación",
    title: "Interacciona con tu instalación",
    body: "Desde la plataforma podrás interaccionar y obtener información del estado de tu instalación allá donde estés.",
  },
  {
    image: "/images/ilus-a3-02.avif",
    alt: "Gestión de permisos de usuarios",
    title: "Permisos de usuarios",
    body: "En la configuración de la instalación, podrás dar permisos a los usuarios de la plataforma conforme el grado de responsabilidad del mismo.",
  },
  {
    image: "/images/ilus-a3-03.avif",
    alt: "Configuración de alarmas según nivel de riesgo",
    title: "Configuración de alarmas",
    body: "Podrás obtener la información de la tipología de la alarma de tu instalación según el nivel de importancia y calculado, basándose en el porcentaje de riesgo con ayuda de la I.A.",
  },
  {
    image: "/images/ilus-a3-04.avif",
    alt: "Conexión bidireccional con la Central Receptora",
    title: "Conexión con Central Receptora",
    body: "Estarás conectado con tu Central Receptora de Incendios de una forma bidireccional desde la aplicación e interaccionando con ellos a tiempo real para mayor verificación en caso de alarma y averías.",
  },
];

export default function InstaladoresPage() {
  return (
    <>
      <ProfileHero
        badge="nusku para instaladores y mantenedores"
        title="Instala y haz el mantenimiento de la instalación mediante nuestra I.A."
        body="Gana y optimiza su tiempo. Diseña, instala y haz el mantenimiento de la instalación sin desplazamientos y tan solo con un clic."
        visual="/images/visual-hero-instaladores.avif"
        visualAlt="Plataforma Nusku para instaladores y mantenedores"
        ctaLabel="Programar una demo"
      />

      <ProfileSection
        badge="01 - instala"
        title="Instala y proyecta su instalación de una forma rápida, segura y efectiva"
        body="Gestiona cualquier instalación desde la misma plataforma NUSKU, de manera segura, ahorrando desplazamientos y ganando tiempo y agilidad."
        cards={installCards}
      />

      <ProfileSection
        badge="02 - Diseña"
        title="Proyecta tu instalación con precisión y con todas las comodidades"
        body="Con la herramienta de configuración de la instalación, podrás cumplir con todos los requerimientos necesarios y diseñar un proyecto a medida."
        cards={designCards}
      />

      <ProfileSection
        badge="03 - Gestiona"
        title="Gestiona tu instalación desde cualquier lugar de una forma ágil y sencilla"
        body="Con Nusku podrás gestionar tu instalación, visualizar alertas y modificar configuraciones de una manera remota de muy fácil uso."
        cards={manageCards}
      />

      <AiHighlightSection />
      <CloudSection />
      <SupportSection />
      <DemoCtaSection />
    </>
  );
}
