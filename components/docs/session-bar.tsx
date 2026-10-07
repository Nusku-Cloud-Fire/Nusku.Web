import type { ReactNode } from "react";
import { Container, TitleBadge } from "@/components/ui";

/** Same dark frame as DocPageLayout, for pages that are not a doc body (login, notices, index). */
export function DocsShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-g6 bg-[radial-gradient(1200px_600px_at_50%_-10%,#1976e426,#1976e400_60%)] pt-[82px]">
      <Container className="flex min-h-[70vh] flex-col gap-10 pt-10 pb-24 md:pt-16">
        <header className="flex max-w-4xl flex-col items-start gap-5">
          <TitleBadge>Documentación</TitleBadge>
          <h1 className="display-gradient pb-[11px] text-[35px] leading-none font-semibold md:text-[50px]">
            {title}
          </h1>
        </header>
        {children}
      </Container>
    </div>
  );
}

/** "Has entrado como x" plus a POST logout (a GET could be triggered by prefetch). */
export function SessionBar({ email }: { email: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-detail">
      <span>
        Has entrado como <span className="text-body">{email}</span>
      </span>
      <form method="post" action="/api/docs/logout">
        <button type="submit" className="underline transition-colors hover:text-white">
          Cerrar sesión
        </button>
      </form>
    </div>
  );
}

export function DocsNotice({ children }: { children: ReactNode }) {
  return (
    <div role="status" className="ring-hairline flex max-w-2xl flex-col gap-4 rounded-xl bg-surface p-8">
      {children}
    </div>
  );
}

export function DocsUnavailable() {
  return (
    <DocsShell title="Documentación">
      <DocsNotice>
        <p className="text-xl font-medium text-white">
          El acceso a la documentación no está disponible en este momento
        </p>
        <p>Vuelve a intentarlo más tarde o escríbenos a info@nusku.cloud.</p>
      </DocsNotice>
    </DocsShell>
  );
}

export function DocsForbidden({ email }: { email: string }) {
  return (
    <DocsShell title="Documentación">
      <DocsNotice>
        <p className="text-xl font-medium text-white">No tienes acceso a esta página</p>
        <SessionBar email={email} />
        <a href="/documentacion" className="w-fit text-blue-plus underline">
          Volver al índice
        </a>
      </DocsNotice>
    </DocsShell>
  );
}
