import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Container, Display2, TitleBadge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contacta con nosotros",
  description:
    "Envíanos tus datos y programaremos una demo personalizada de la plataforma Nusku para ti.",
  alternates: { canonical: "/contacta" },
};

export default function ContactaPage() {
  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-start gap-6">
            <TitleBadge>Contacta</TitleBadge>
            <Display2 as="h1">
              Envíanos tus datos y programaremos una demo personalizada para ti
            </Display2>
          </div>

          <div className="mt-14">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
