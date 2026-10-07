import type { Metadata } from "next";
import { LoginForm } from "@/components/docs/login-form";
import { DocsNotice, DocsShell } from "@/components/docs/session-bar";
import { docsAvailable, safeNext } from "@/lib/docs/session";

export const metadata: Metadata = {
  title: "Acceso a la documentación",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ error?: string; next?: string }> };

export default async function Page({ searchParams }: Props) {
  const { error, next } = await searchParams;

  return (
    <DocsShell title="Acceso a la documentación">
      {!docsAvailable() ? (
        <DocsNotice>
          <p className="text-xl font-medium text-white">
            El acceso a la documentación no está disponible en este momento
          </p>
        </DocsNotice>
      ) : (
        <>
          {error === "expirado" ? (
            <p role="alert" className="max-w-xl text-[#ff9a9a]">
              El enlace ha caducado o no es válido. Pide uno nuevo.
            </p>
          ) : null}
          <p className="max-w-xl text-lg">
            Introduce tu email y te enviaremos un enlace para acceder.
          </p>
          <LoginForm next={safeNext(next)} />
        </>
      )}
    </DocsShell>
  );
}
