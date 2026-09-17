import type { ReactNode } from "react";

/**
 * Resource tools share a sticky transparent SiteHeader. Pull the page up so
 * each tool's background shows through the header; pages add their own
 * top padding so content clears the logo.
 */
export default function RecursosLayout({ children }: { children: ReactNode }) {
  return <div className="-mt-[82px]">{children}</div>;
}
