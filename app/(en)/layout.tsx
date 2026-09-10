import { SiteShell, shellMetadata } from "@/components/site-shell";
import "../globals.css";

export const metadata = shellMetadata("en");

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell lang="en">{children}</SiteShell>;
}
