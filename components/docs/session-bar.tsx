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

/**
 * Email + logout, laid over the right end of the site header. The header lives
 * in the root layout and is a client component, so it can't read the httpOnly
 * session; this overlay mirrors its padding and Container so it lines up with
 * the logo, and is rendered server-side by the /documentacion layout.
 * Logout is a POST: a GET could be triggered by prefetch.
 */
export function HeaderSession({ email }: { email: string }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] py-[25px]">
      <Container className="flex h-8 items-center justify-end">
        <div className="pointer-events-auto flex min-w-0 items-center gap-3 text-sm">
          <span className="hidden min-w-0 truncate text-body sm:block" title={email}>
            {email}
          </span>
          <form method="post" action="/api/docs/logout" className="shrink-0">
            <button
              type="submit"
              className="ring-hairline rounded-md bg-white/5 px-3 py-1.5 text-white transition-colors hover:bg-white/10"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </Container>
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
        <p>
          Has entrado como <span className="text-white">{email}</span>. Si crees que
          deberías verla, escríbenos a info@nusku.cloud.
        </p>
        <a href="/documentacion" className="w-fit text-blue-plus underline">
          Volver al índice
        </a>
      </DocsNotice>
    </DocsShell>
  );
}
