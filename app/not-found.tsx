import { Button, Container, Display2 } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="overflow-hidden pt-40 pb-20 md:pt-[203px] md:pb-[110px]">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <Display2 as="h1">Página no encontrada</Display2>
          <p className="text-lg text-body">
            La página que buscas no existe o se ha movido.
          </p>
          <Button href="/">Volver al inicio</Button>
        </div>
      </Container>
    </section>
  );
}
