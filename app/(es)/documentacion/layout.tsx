import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HeaderSession } from "@/components/docs/session-bar";
import { getDocsSession } from "@/lib/docs/session";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Same sticky header treatment as /recursos: pull the page up so its
 * background shows through, and let each page pad itself below the logo.
 */
export default async function DocumentacionLayout({ children }: { children: ReactNode }) {
  const session = await getDocsSession();

  return (
    <div className="-mt-[82px]">
      {session ? <HeaderSession email={session.email} /> : null}
      {children}
    </div>
  );
}
