import { SiteShell, shellMetadata } from "@/components/site-shell";
import "../globals.css";

export const metadata = shellMetadata("es");

export default function EsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell lang="es">{children}</SiteShell>;
}
