# Tasks

## 1. Contenido y registro

- [x] 1.1 Mover el metadato del prototipo `lib/docs/sia-codigos-eventos.ts` a `content/docs/pages/sia-codigos-eventos.json` (`id` = slug `sia-codigos-eventos`, `title`, `summary`, `changelog`) y dejar en TS solo los datos de la tabla; verificar que la página muestra el mismo título e historial que antes
- [x] 1.2 Crear el índice tipado de páginas (`lib/docs/pages.ts`: slug → metadato JSON + componente de cuerpo) y la ruta dinámica `app/(es)/documentacion/[slug]/page.tsx` que sustituye a la ruta fija del prototipo; verificar que `/documentacion/sia-codigos-eventos` se ve igual y que `/documentacion/no-existe` da el 404 en español
- [x] 1.3 Ordenar el historial del más reciente al más antiguo en `components/pages/doc-page.tsx`; verificar con una segunda entrada de prueba que aparece arriba (y quitarla)
- [x] 1.4 Crear `content/docs/consumers.json` con el formato de D2 (vacío o con un consumidor de prueba) y `lib/docs/registry.ts` con `canView(email, pageId)` y `pagesFor(email)` (normalizando trim + minúsculas, con `@nusku.cloud` viendo todo); verificar con `npm run typecheck`
- [x] 1.5 Escribir `scripts/docs-check.mjs` (sin dependencias) que valide ids de página existentes, emails bien formados e ids de consumidor únicos, y añadir `npm run docs:check`; verificar que pasa con el registro real y falla con un id de página erróneo
- [x] 1.6 Añadir `npm run docs:check` al workflow antes del despliegue, junto al typecheck; verificar leyendo el YAML que va en el mismo job y antes de `Build And Deploy`

## 2. Acceso

- [ ] 2.1 Implementar `lib/docs/token.ts` (firma y verificación HMAC con `purpose` y `exp`, `timingSafeEqual`, lectura de `DOCS_AUTH_SECRET` que falla si tiene menos de 32 bytes); verificar con un script ad hoc que un token alterado, caducado o con otro `purpose` se rechaza
- [ ] 2.2 Implementar `POST /api/docs/login`: validar el email, comprobar `canView` o `@nusku.cloud`, enviar por Resend el enlace `/api/docs/verify?t=…&next=…` y devolver siempre la misma respuesta; sin secreto o sin clave, `not_configured`. Verificar en local que un email registrado recibe el correo y que uno desconocido obtiene la misma respuesta sin envío
- [ ] 2.3 Implementar `GET /api/docs/verify` (cookie `nusku_docs` de 7 días con `HttpOnly`, `SameSite=Lax` y `Secure` en producción; `console.info` del inicio de sesión; `next` restringido a `/documentacion…`) y `GET /api/docs/logout`; verificar que un enlace caducado vuelve a la pantalla de acceso con aviso y que `next=https://evil.example` acaba en `/documentacion`
- [ ] 2.4 Crear la pantalla `app/(es)/documentacion/acceso/page.tsx` (formulario de email, mensaje neutro tras enviar, avisos de caducado y no disponible), con la estética de la web; verificar el flujo completo en `npm run dev`
- [ ] 2.5 Añadir `requireDocsSession(pageId?)` y usarlo en `/documentacion/[slug]`: sin sesión redirige a acceso con `next`, y con sesión sin permiso muestra "sin acceso" sin el contenido. Verificar con un contacto de prueba asignado y otro no asignado, y confirmar en `npm run build` que la ruta es dinámica (ƒ)
- [ ] 2.6 Crear el índice `app/(es)/documentacion/page.tsx` con las páginas de `pagesFor(email)`, el título y la fecha del último cambio, y un botón para cerrar sesión; verificar que un contacto ve solo lo suyo y un `@nusku.cloud` lo ve todo
- [ ] 2.7 Asegurar `noindex` en todas las rutas de `/documentacion` (metadata en el layout) y mantener `/documentacion` en `disallow` de `app/robots.ts`; verificar con `curl /robots.txt` y el HTML servido
- [ ] 2.8 Documentar en README ("Documentación privada") y en `.env.example` las variables `DOCS_AUTH_SECRET`, `DOCS_FROM_EMAIL` y `SITE_URL`, cómo dar o quitar acceso y qué se puede auditar (inicios de sesión en los logs, concesiones en `git log`); verificar que el comando `az staticwebapp appsettings set` documentado incluye el nuevo secreto

## 3. Avisos de cambios

- [ ] 3.1 Escribir `scripts/docs-notify.mjs <before> <after>` (sin dependencias): detectar entradas nuevas por `(date, note)` con `git show`, agrupar por contacto, un email por contacto vía Resend, error con la lista de pendientes si falla o falta la clave, sin avisos si `before` es nulo. Incluir `--dry-run`. Verificar en local con `--dry-run` contra dos commits de prueba: una entrada nueva, una errata sin entrada y dos páginas para el mismo contacto
- [ ] 3.2 Añadir al workflow de Azure el job `notify_docs_changes` (`needs: build_and_deploy_job`, solo con `github.event_name == 'push'`, `fetch-depth: 0`, secrets `RESEND_API_KEY` y variables `DOCS_FROM_EMAIL` y `SITE_URL`); verificar leyendo el YAML que no se ejecuta en PRs ni en ejecuciones manuales
- [ ] 3.3 Documentar en README el flujo "cambio explícito = entrada en el changelog", que aquí `RESEND_API_KEY` sí va como secret de GitHub (el envío es en el runner) y cómo reenviar avisos relanzando el job; verificar que la sección enlaza desde "Deployment"
- [ ] 3.4 Documentar en README la convención `@docs-sync: <id-de-página>` para el backend, con los ids actuales; verificar que el id documentado coincide con el de `content/docs/pages/`

## 4. Puesta en marcha

- [ ] 4.1 Crear el application setting `DOCS_AUTH_SECRET` en Azure y el secret o las variables en GitHub; verificar en staging (PR) que un email `@nusku.cloud` entra y ve la página SIA
- [ ] 4.2 Prueba de extremo a extremo tras el merge: con un consumidor de prueba (un buzón propio) asignado a `sia-codigos-eventos`, añadir una entrada al historial, hacer push a `main` y comprobar que llega un solo email con la nota y el enlace, y que el enlace lleva a la página tras entrar
