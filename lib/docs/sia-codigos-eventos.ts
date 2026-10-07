/** Body data for the SIA events page. Metadata lives in content/docs/pages/. */

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

export const siaEvents: SiaEvent[] = [
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
];

export const siaNotes: string[] = [
  "Cualquier otro evento del panel (avisos técnicos, de sistema u otras alarmas/averías) no se transmite actualmente a la receptora.",
];
