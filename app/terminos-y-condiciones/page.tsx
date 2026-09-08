import type { Metadata } from "next";
import { Container, Display2 } from "@/components/ui";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de la plataforma Nusku Cloud S.L.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TerminosPage() {
  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Display2 as="h1">Términos y condiciones</Display2>
          <p className="mt-8 text-lg text-body">
            En proceso de creación. Contacta con{" "}
            <a
              href="mailto:info@nusku.cloud"
              className="text-blue-plus underline"
            >
              info@nusku.cloud
            </a>{" "}
            para información sobre nuestros términos y condiciones.
          </p>
        </div>
      </Container>
    </section>
  );
}
