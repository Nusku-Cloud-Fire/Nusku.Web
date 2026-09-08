import type { Metadata } from "next";
import Link from "next/link";
import { Container, Display2 } from "@/components/ui";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo Nusku recopila, utiliza y protege sus datos personales cuando usa nuestra aplicación móvil.",
  alternates: { canonical: "/politica-de-privacidad" },
};

const permisos = [
  {
    term: "Acceso a Internet",
    body: "Se utiliza para conectar con nuestros servidores y servicios, permitiendo funciones que requieren conectividad de red.",
  },
  {
    term: "Cámara",
    body: "Se utiliza para funciones de escaneo y captura de imágenes cuando usted inicia estas acciones.",
  },
  {
    term: "Bluetooth",
    body: "Se utiliza para conectar con dispositivos cercanos para transferencia de datos o funciones de control de dispositivos.",
  },
  {
    term: "Información de ubicación",
    body: "Se utiliza para ofrecer funciones basadas en ubicación, mejorar la detección de dispositivos Bluetooth y optimizar servicios que requieren conocer su ubicación aproximada.",
  },
];

const datosRecopilados = [
  "Información del dispositivo (modelo, versión del sistema operativo)",
  "Estadísticas de uso para mejorar nuestros servicios",
  "Datos de ubicación (cuando usa funciones relacionadas)",
  "Imágenes capturadas con la cámara (solo cuando inicia la captura)",
  "Información de conexiones Bluetooth para vincular dispositivos",
];

const usos = [
  "Para proporcionar y mantener nuestro servicio",
  "Para notificarle cambios en la aplicación",
  "Para ofrecer soporte técnico",
  "Para analizar patrones de uso y mejorar la aplicación",
  "Para habilitar funciones específicas que usted solicite (como conexiones Bluetooth)",
];

const comparticion = [
  "Proveedores de servicios que colaboran en nuestras operaciones",
  "Autoridades legales cuando lo exija la ley",
];

const derechos = [
  "Acceder a sus datos personales",
  "Solicitar corrección o eliminación de datos",
  "Excluirse de comunicaciones comerciales",
  "Desactivar permisos mediante la configuración de su dispositivo",
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 text-2xl font-semibold text-white">{children}</h2>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-body marker:text-blue">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PoliticaPrivacidadPage() {
  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Display2 as="h1">Política de privacidad</Display2>

          <Heading>Introducción</Heading>
          <p className="mt-4 text-body">
            Nusku Tools («nosotros», «nuestro» o «nos») respeta su privacidad y se
            compromete a proteger sus datos personales. Esta política de
            privacidad explica cómo recopilamos, utilizamos y protegemos su
            información cuando usa nuestra aplicación móvil.
          </p>

          <Heading>Información que recopilamos</Heading>

          <h3 className="mt-8 text-lg font-medium text-white">
            Permisos y su finalidad
          </h3>
          <dl className="mt-4 space-y-4">
            {permisos.map((permiso) => (
              <div key={permiso.term}>
                <dt className="font-medium text-white">{permiso.term}</dt>
                <dd className="text-body">{permiso.body}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-lg font-medium text-white">
            Datos que podemos recopilar
          </h3>
          <List items={datosRecopilados} />

          <Heading>Cómo utilizamos su información</Heading>
          <List items={usos} />

          <Heading>Compartición de datos</Heading>
          <p className="mt-4 text-body">
            No vendemos sus datos personales. Podemos compartir información con:
          </p>
          <List items={comparticion} />

          <Heading>Seguridad de los datos</Heading>
          <p className="mt-4 text-body">
            Implementamos medidas de seguridad adecuadas para proteger su
            información contra accesos no autorizados, alteraciones,
            divulgaciones o destrucción. Sin embargo, ningún método de
            transmisión por Internet o almacenamiento electrónico es 100% seguro,
            por lo que no podemos garantizar seguridad absoluta.
          </p>

          <Heading>Sus derechos</Heading>
          <p className="mt-4 text-body">Usted puede:</p>
          <List items={derechos} />
          <p className="mt-4 text-body">
            Para ejercer estos derechos, contáctenos usando los datos
            proporcionados al final.
          </p>

          <Heading>Privacidad infantil</Heading>
          <p className="mt-4 text-body">
            Nuestra aplicación no está dirigida a menores de 13 años. No
            recopilamos información de menores de 13 años de forma consciente. Si
            es padre/madre o tutor y cree que un menor nos ha proporcionado datos
            personales, contáctenos para tomar medidas.
          </p>

          <Heading>Actualizaciones de la política</Heading>
          <p className="mt-4 text-body">
            Podemos actualizar esta política periódicamente por motivos
            operativos, legales o regulatorios. Le notificaremos cambios
            significativos a través de la aplicación o por correo electrónico si
            disponemos de su contacto.
          </p>

          <Heading>Contacto</Heading>
          <p className="mt-4 text-body">
            Si tiene preguntas sobre esta política de privacidad, contáctenos en:
          </p>
          <ul className="mt-4 space-y-2 text-body">
            <li>
              Correo electrónico:{" "}
              <a
                href="mailto:privacy@nusku.cloud"
                className="text-blue-plus underline"
              >
                privacy@nusku.cloud
              </a>
            </li>
            <li>
              Sitio web:{" "}
              <Link href="/contacta" className="text-blue-plus underline">
                https://nusku.cloud/contacta
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
