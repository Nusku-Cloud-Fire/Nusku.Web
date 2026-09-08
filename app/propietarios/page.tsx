import type { Metadata } from "next";
import { CloudSection, DemoCtaSection, SupportSection } from "@/components/sections";
import {
  PlanimetriaSection,
  ProfileHero,
  ProfileSection,
  type ProfileCard,
} from "@/components/profile";

export const metadata: Metadata = {
  title: "App para Propietarios",
  description:
    "Consulta y gestiona tu instalación de detección de incendios de una manera fácil e intuitiva, con notificaciones en tiempo real.",
  alternates: { canonical: "/propietarios" },
};

const ownerCards: ProfileCard[] = [
  {
    image: "/images/c1-01.avif",
    alt: "Sistema Plus Sensor analizando los minutos previos a una alarma",
    title: "Sistema Plus Sensor",
    body: "El sistema DM Sensor almacena 5 minutos anteriores a la alarma de fuego y se compara los algoritmos y curvas lógicas, generando una probabilidad real de fuego, en que punto se encuentra y la zona.",
  },
  {
    image: "/images/c1-02.avif",
    alt: "Aplicación de Nusku para propietarios de instalación",
    title: "Una aplicación moderna e intuitiva",
    body: "Gestiona y mantente comunicado con los profesionales y cuerpos de seguridad para tener la protección contra un incendio real necesaria e imprescindible en tu instalación.",
  },
  {
    image: "/images/c1-03.avif",
    alt: "Conectividad permanente con la instalación",
    title: "Conectividad 24/7",
    body: "La plataforma garantiza la conectividad en cualquier momento y en cualquier circunstancia para, de esta forma, mantenerte informado de que está pasando en tu negocio y hogar a tiempo real.",
  },
  {
    image: "/images/c1-04.avif",
    alt: "Video verificación en directo desde la aplicación",
    title: "Video verificación",
    body: "El sistema también incorpora la posibilidad de visualización de la instalación mediante video verificación. Podrás visualizar en la app a través del video en directo del estado de la situación.",
  },
];

export default function PropietariosPage() {
  return (
    <>
      <ProfileHero
        badge="Nusku para propietarios"
        title="Consulta y gestiona tu instalación de detección de incendios de una manera fácil e intuitiva"
        body="Consulta el estado de tu instalación y recibe notificaciones a tiempo real de los profesionales que trabajan en ella. Cualquier alarma de fuego te será notificada al instante."
        visual="/images/ilus-propietarios6.avif"
        visualAlt="Aplicación de Nusku para propietarios de instalación"
      />

      <ProfileSection cards={ownerCards} />
      <PlanimetriaSection />
      <CloudSection />
      <SupportSection />
      <DemoCtaSection />
    </>
  );
}
