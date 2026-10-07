# Design

## Context

Nusku.Web es un sitio de marketing en Next.js 15 sobre Azure Static Web Apps en modo híbrido. Todo se prerenderiza salvo `/api/contact` y los 404, que corren bajo demanda. No hay base de datos, autenticación ni almacenamiento. El envío de correo ya existe vía la API HTTP de Resend (`app/api/contact/route.ts`), con la configuración en application settings de Azure. Hay que tener en cuenta lo que ya se sabe de este host (README, "Deployment"): `globalHeaders` de `staticwebapp.config.json` no se aplica a las páginas que sirve Next, y las variables de runtime son application settings, no secrets de GitHub. `/recursos/calculadora` es el precedente de página "oculta", pero solo con `noindex`, sin control de acceso.

Motivación y alcance: ver proposal.md. Comportamiento exigido: ver `specs/`.

## Goals / Non-Goals

**Goals:**
- Que la web siga sin estado: nada que guardar en runtime salvo una cookie en el navegador.
- Que el acceso no dependa de reglas de SWA cuyo efecto sobre páginas de Next no está verificado.
- Que el aviso de cambios use git como estado: sin registro de "ya avisado".

**Non-Goals:**
- Enlaces de un solo uso, revocación de sesiones concretas o registro de páginas vistas.
- Generar el contenido a partir del backend.
- Que el agente del backend avise: es una convención de ese repo.

## Decisions

### D1. Contenido: metadato en JSON y cuerpo en TSX, no MDX
Cada página es `content/docs/pages/<slug>.json` (id = slug, título, `changelog: [{ date, note }]`) más un componente en `components/docs/pages/<slug>.tsx` registrado en un índice tipado.
- **Por qué:** el job de avisos tiene que leer el historial de antes y de después del push con `git show <sha>:<ruta>` y `JSON.parse`, sin compilar TypeScript ni parsear frontmatter. Las páginas son sobre todo tablas de datos, que encajan mejor como datos tipados que como Markdown. Además, no añade dependencias (MDX necesitaría `@next/mdx` y su configuración).
- **Alternativa descartada:** `.mdx` con frontmatter, lo hablado en la exploración. Lo esencial se conserva (una página = una unidad con id y changelog). Si se quiere escribir en Markdown más adelante, se puede migrar el cuerpo sin tocar el metadato ni los avisos.

### D2. Registro: `content/docs/consumers.json`
`[{ id, name, contacts: string[], pages: string[] }]`. Se importa en el servidor, así que va en el bundle y cambia con cada despliegue. Un script sin dependencias (`scripts/docs-check.mjs`) valida ids de página existentes, emails bien formados e ids de consumidor únicos. Se ejecuta en el workflow junto al typecheck y, por tanto, bloquea el despliegue.
- **Alternativa descartada:** el registro en TS daría tipado gratis, pero el job de avisos tendría que compilarlo. JSON más un script de validación da las dos cosas.

### D3. Tokens firmados con HMAC sin estado, para el enlace y para la sesión
Un mismo formato para ambos: `base64url(payload).base64url(HMAC-SHA256(payload, DOCS_AUTH_SECRET))`, con `payload = { email, purpose: "link" | "session", exp }`. Se firma y verifica con `node:crypto` y se compara con `timingSafeEqual`. El campo `purpose` impide usar un token de enlace como cookie y viceversa.
- Enlace: `purpose: "link"`, 15 min, y se lleva el destino `next` como parámetro aparte, validado al usarlo.
- Sesión: cookie `nusku_docs`, `purpose: "session"`, 7 días, `HttpOnly`, `SameSite=Lax`, `Secure` en producción y `Path=/`. Las rutas de la API viven bajo `/api/docs`.
- **Por qué:** cero almacenamiento. El coste es que el enlace se puede reutilizar dentro de sus 15 minutos (ver riesgos).
- **Alternativa descartada:** Entra ID o reglas `allowedRoles` de SWA. Los consumidores externos no tienen cuenta, y además habría que demostrar que las reglas de SWA protegen páginas servidas por Next.

### D4. Verificación en cada página (componente de servidor), no middleware
`/documentacion` y `/documentacion/[slug]` leen la cookie con `cookies()`, verifican el token y comprueban el acceso con `canView(email, pageId)` contra el registro. Leer `cookies()` hace las rutas dinámicas, y eso es justo lo deseado. Una función compartida `requireDocsSession(pageId?)` concentra la lógica y redirige a `/documentacion/acceso?next=…`.
- **Por qué:** las rutas dinámicas de Next ya funcionan en este host (los catch-all de 404), mientras que el middleware en SWA híbrido no está verificado. Como se comprueba contra el registro en cada petición, retirar un acceso surte efecto en el siguiente despliegue aunque la cookie siga viva.

### D5. Flujo de acceso
```
/documentacion/acceso  --POST email-->  /api/docs/login
                                          | autorizado? (registro o @nusku.cloud)
                                          | si: Resend -> enlace /api/docs/verify?t=...&next=...
                                          v
                              respuesta identica en ambos casos
/api/docs/verify  --token ok-->  Set-Cookie nusku_docs; console.info login; 302 next
                  --token ko-->  302 /documentacion/acceso?error=expirado
/api/docs/logout  -->  borra cookie; 302 /documentacion/acceso
```
- El envío al email autorizado no se espera para responder distinto: los errores de Resend se registran en el log y no cambian la respuesta (spec: respuesta idéntica).
- Variables: `DOCS_AUTH_SECRET` (obligatoria, ≥32 bytes), `RESEND_API_KEY` (la existente), `DOCS_FROM_EMAIL` (por defecto `docs@nusku.cloud` en el dominio verificado) y `SITE_URL` para construir enlaces absolutos (por defecto `https://www.nusku.cloud`).
- El enlace es un GET que solo verifica y pone la cookie. Si un escáner de correo lo abre, solo crea una sesión en el escáner y el enlace sigue sirviendo al usuario, porque no se consume.

### D6. Avisos: job tras el despliegue en el workflow existente
Se añade al workflow de Azure un job `notify_docs_changes`, con `needs: build_and_deploy_job` y la condición `github.event_name == 'push'`. Pasos: checkout con `fetch-depth: 0` y `node scripts/docs-notify.mjs <before> <after>`.
- Para cada `content/docs/pages/*.json` cambiado entre `before` y `after`, se lee el JSON de ambos lados. Las entradas nuevas son las del después cuyo par `(date, note)` no estaba antes. Una página nueva cuenta todas sus entradas como nuevas.
- Se agrupan por contacto (página → consumidores → contactos, sin duplicados) y se envía un email por contacto con la lista de páginas, la nota de cada entrada y el enlace.
- Si `before` son todo ceros o no existe, no se avisa.
- `RESEND_API_KEY`, `DOCS_FROM_EMAIL` y `SITE_URL` se añaden como secrets o variables de GitHub. Aquí el envío ocurre en el runner, al contrario que en `/api/contact`, y así se documentará.
- **Por qué en el mismo workflow y no en uno aparte disparado por `paths`:** solo así el aviso espera a que el despliegue termine bien.

### D7. Página SIA
Primera página: `sia-codigos-eventos`, la tabla genérica de eventos SIA enviados a CRI, con los datos del Excel de referencia. Las variantes por receptora se crean como páginas propias (`sia-codigos-eventos-<receptora>`) cuando cada configuración exista. Hasta entonces, el registro asigna la genérica.

### D8. Convención `@docs-sync`
Se documenta en el README de la web: el comentario `@docs-sync: <id-de-página>` marca en el backend el código que alimenta una página. El repo del backend añade la regla en su CLAUDE.md y un hook `PostToolUse` que avisa al editar un fichero con el marcador. Esta change solo fija el formato y los ids.

## Risks / Trade-offs

- [El enlace se puede reutilizar durante 15 minutos] → Caducidad corta, ligado al email, y solo llega a esa bandeja. Aceptado frente a introducir almacenamiento.
- [Si el secreto se filtra, se pueden forjar sesiones] → Vive solo en application settings. Rotarlo invalida todas las sesiones de golpe, lo cual sirve también como "cerrar todas".
- [No se puede expulsar a un único usuario antes de 7 días] → Quitarlo del registro y desplegar le corta el acceso en la siguiente petición (D4).
- [Correos de contactos externos en git] → Repo privado y emails corporativos. Si deja de ser aceptable, se mueve el registro a un application setting sin cambiar el formato.
- [Olvidar la entrada del changelog] → No se avisa a nadie, el fallo menos grave. La página muestra el historial, así que el hueco se ve.
- [Una entrada editada (cambiar su nota) cuenta como nueva] → Por diseño: si se reescribe la nota, se avisa de nuevo. Hay que corregir las notas antes de hacer merge.
- [Fallo de Resend en el job de avisos] → El job falla en rojo y lista los pendientes. Se puede reenviar relanzando el job desde GitHub.
- [Abuso del formulario de acceso para enviar correos] → Solo se envía a emails del registro o de `@nusku.cloud`, así que no sirve para enviar correo a terceros arbitrarios.

## Migration Plan

1. Crear `DOCS_AUTH_SECRET` (y, si se quiere, `DOCS_FROM_EMAIL`) como application setting en el Static Web App.
2. Añadir `RESEND_API_KEY` y `SITE_URL` como secret y variable de GitHub.
3. Desplegar. Sin el secreto, las páginas solo muestran "acceso no disponible", así que no hay exposición.
4. Rollback: revertir el commit. No hay datos que migrar.
