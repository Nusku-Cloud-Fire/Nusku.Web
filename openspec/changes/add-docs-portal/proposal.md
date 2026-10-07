# Proposal

## Why

La documentación de integración que compartimos con terceros vive dispersa: Excels, PDFs y el propio código del backend. La primera es la tabla de códigos SIA DC-09 que enviamos a cada central receptora. Nadie sabe qué versión tiene cada consumidor, y cuando cambia un código no hay forma ordenada de avisar a quien le afecta. Los consumidores (receptoras, clientes, proveedores) no tienen por qué tener cuenta en la plataforma Nusku, así que hace falta un canal propio, privado y ligero.

## What Changes

- Nueva zona `/documentacion` en Nusku.Web: una página por documentación, solo en español, fuera de buscadores y del sitemap.
- Registro de consumidores en el repo: cada consumidor tiene contactos (emails) y la lista de páginas a las que tiene acceso. Dar o quitar acceso se hace con una PR, y `git log` es el historial de concesiones.
- Acceso por enlace mágico: el consumidor escribe su email y, si está autorizado, recibe por Resend un enlace firmado de un solo propósito y corta caducidad. La sesión dura 7 días en una cookie firmada. Cualquier `@nusku.cloud` ve todas las páginas. Sin base de datos ni almacenamiento propio.
- Cada página lleva un historial de cambios (`changelog`). Añadir una entrada es el "cambio explícito": tras el despliegue a `main`, una tarea de CI envía un email a los contactos de los consumidores con acceso a esa página. Editar la página sin añadir entrada no avisa a nadie.
- Primera página: códigos de eventos SIA enviados a CRI. Cada receptora puede tener su propia página, porque cada una tiene su propia configuración.
- Convención `@docs-sync: <id-de-página>` para marcar en el backend el código que alimenta una página. Esta change la documenta. La regla y el hook del agente se aplican en el repo del backend, fuera de esta change.

Fuera de alcance: registro de accesos por página, panel de administración, base de datos, versión en inglés, sincronización automática backend → web.

## Capabilities

### New Capabilities
- `docs-pages`: páginas de documentación privadas, su metadato (id, título, historial de cambios) y el registro de consumidores que decide quién ve cada página.
- `docs-access`: identificación por enlace mágico, sesión y autorización por página.
- `docs-change-notifications`: aviso por email a los consumidores afectados cuando una página recibe una entrada nueva en su historial de cambios.

### Modified Capabilities
<!-- Ninguna: no hay specs previas en el proyecto. -->

## Impact

- **Rutas nuevas:** `/documentacion`, `/documentacion/[slug]`, `/documentacion/acceso` y `/api/docs/*`, todas renderizadas bajo demanda. Hasta ahora solo `/api/contact` y los 404 lo eran.
- **Contenido nuevo:** `content/docs/` (registro de consumidores y metadatos de páginas) y los componentes de cada página.
- **Configuración en Azure:** nuevo application setting `DOCS_AUTH_SECRET`. Se reutiliza `RESEND_API_KEY` y se añade opcionalmente `DOCS_FROM_EMAIL`.
- **CI:** nuevo job de avisos en el workflow de despliegue, que requiere `RESEND_API_KEY` también como secret de GitHub (el envío ocurre en el runner). También una validación del registro antes de desplegar.
- **`app/robots.ts`:** se añade `/documentacion` a `disallow`.
- **Datos personales:** emails corporativos de contactos externos en el repo privado.
- **Repo del backend (fuera de esta change):** marcadores `@docs-sync`, regla en su CLAUDE.md y hook `PostToolUse`.
