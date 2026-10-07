import type { Metadata } from "next";
import { DocPageLayout } from "@/components/pages/doc-page";
import { SiaEventTable } from "@/components/pages/sia-event-table";
import { siaCodigosEventos as page } from "@/lib/docs/sia-codigos-eventos";

export const metadata: Metadata = {
  title: "Eventos SIA DC-09",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <DocPageLayout page={page}>
      <SiaEventTable events={page.events} />
      {page.notes.map((note) => (
        <p
          key={note}
          className="ring-hairline-blue max-w-4xl rounded-lg bg-blue/5 px-5 py-4 text-[15px]"
        >
          {note}
        </p>
      ))}
    </DocPageLayout>
  );
}
