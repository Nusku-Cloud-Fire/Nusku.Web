import { SiaEventTable } from "@/components/pages/sia-event-table";
import { siaEvents, siaNotes } from "@/lib/docs/sia-codigos-eventos";

export default function SiaCodigosEventos() {
  return (
    <>
      <SiaEventTable events={siaEvents} />
      {siaNotes.map((note) => (
        <p
          key={note}
          className="ring-hairline-blue max-w-4xl rounded-lg bg-blue/5 px-5 py-4 text-[15px]"
        >
          {note}
        </p>
      ))}
    </>
  );
}
