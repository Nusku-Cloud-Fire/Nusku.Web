/**
 * Shape every documentation page will share once pages move to .mdx: the
 * frontmatter becomes `id`, `title`, `summary` and `changelog`, and the body
 * becomes the page-specific content (here, `events` and `notes`).
 */
export type ChangelogEntry = {
  /** ISO date (YYYY-MM-DD). */
  date: string;
  note: string;
};

export type DocPage = {
  /** Stable id used by the consumer registry and by `@docs-sync` markers. */
  id: string;
  title: string;
  summary: string;
  /** Newest first. A new entry is what triggers the email to consumers. */
  changelog: ChangelogEntry[];
};

export type SiaEventGroup = "alarma" | "averia" | "plataforma";

export type SiaEvent = {
  code: string;
  event: string;
  origin: "Panel" | "Plataforma Nusku";
  /** SIA area — the panel zone travels in the message. */
  zone: boolean;
  /** The loop device travels in the message. */
  element: boolean;
  group: SiaEventGroup;
};

export const SIA_GROUPS: Record<SiaEventGroup, { label: string; detail: string }> = {
  alarma: {
    label: "Alarmas",
    detail: "Alarmas de fuego originadas en el panel.",
  },
  averia: {
    label: "Averías",
    detail: "Averías técnicas detectadas por el panel.",
  },
  plataforma: {
    label: "Plataforma Nusku",
    detail: "Eventos que genera la nube Nusku, no el panel.",
  },
};

export const siaCodigosEventos: DocPage & {
  events: SiaEvent[];
  notes: string[];
} = {
  id: "sia/codigos-eventos",
  title: "Eventos SIA DC-09 enviados a la CRI",
  summary:
    "El panel envía sus eventos a la nube Nusku, que los traduce a SIA DC-09 y los transmite a la receptora.",
  changelog: [
    {
      date: "2026-10-06",
      note: "Versión inicial: 11 eventos (2 alarmas, 4 averías, 5 de plataforma).",
    },
  ],
  events: [
    { code: "FA", event: "Alarma de fuego en zona (detector o pulsador)", origin: "Panel", zone: true, element: false, group: "alarma" },
    { code: "FA", event: "Alarma de fuego en dispositivo de lazo", origin: "Panel", zone: true, element: true, group: "alarma" },
    { code: "FY", event: "Avería de zona (cortocircuito o circuito abierto)", origin: "Panel", zone: true, element: false, group: "averia" },
    { code: "YA", event: "Avería de sirena (cortocircuito o circuito abierto)", origin: "Panel", zone: true, element: false, group: "averia" },
    { code: "YT", event: "Avería de batería (sin batería, batería baja, resistencia alta)", origin: "Panel", zone: true, element: false, group: "averia" },
    { code: "AT", event: "Fallo de red eléctrica", origin: "Panel", zone: true, element: false, group: "averia" },
    { code: "FJ", event: "Rearme del panel", origin: "Plataforma Nusku", zone: false, element: false, group: "plataforma" },
    { code: "FW", event: "Pérdida de conexión del panel con la nube", origin: "Plataforma Nusku", zone: false, element: false, group: "plataforma" },
    { code: "FQ", event: "Conexión del panel con la nube restablecida", origin: "Plataforma Nusku", zone: false, element: false, group: "plataforma" },
    { code: "RX", event: "Test manual de comunicación", origin: "Plataforma Nusku", zone: false, element: false, group: "plataforma" },
    { code: "RP", event: "Test automático de comunicación", origin: "Plataforma Nusku", zone: false, element: false, group: "plataforma" },
  ],
  notes: [
    "Cualquier otro evento del panel (avisos técnicos, de sistema u otras alarmas/averías) no se transmite actualmente a la receptora.",
  ],
};
