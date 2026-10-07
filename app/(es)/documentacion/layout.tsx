import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Same sticky header treatment as /recursos: pull the page up so its
 * background shows through, and let each page pad itself below the logo.
 */
export default function DocumentacionLayout({ children }: { children: ReactNode }) {
  return <div className="-mt-[82px]">{children}</div>;
}
