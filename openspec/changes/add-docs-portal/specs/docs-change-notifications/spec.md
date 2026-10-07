# Spec Delta

## Purpose

Avisa por email a los contactos de cada consumidor cuando una página a la que tienen acceso recibe un cambio explícito, es decir, una entrada nueva en su historial de cambios.

## ADDED Requirements

### Requirement: Aviso por entrada nueva en el historial
Tras desplegar en producción un push a `main`, el sistema SHALL detectar las entradas de historial que no existían antes del push y enviar un email a cada contacto de cada consumidor con acceso a esas páginas.

#### Scenario: Entrada nueva en una página
- **WHEN** se despliega un push que añade una entrada al historial de `sia-codigos-eventos-central-x`
- **THEN** cada contacto de los consumidores con acceso a esa página recibe un email con el título de la página, la fecha y la nota de la entrada, y un enlace a la página

### Requirement: Sin entrada no hay aviso
Los cambios en el contenido de una página que no añaden ninguna entrada al historial MUST NOT generar avisos.

#### Scenario: Corrección de una errata
- **WHEN** se despliega un push que corrige texto de una página sin tocar su historial
- **THEN** no se envía ningún email

### Requirement: Un email por contacto y despliegue
Si un despliegue añade entradas en varias páginas, cada contacto SHALL recibir un único email con todas las páginas que le afectan.

#### Scenario: Dos páginas en el mismo push
- **WHEN** un push añade entradas en dos páginas a las que tiene acceso el mismo contacto
- **THEN** ese contacto recibe un solo email que menciona ambas

### Requirement: Solo después de desplegar
El aviso MUST enviarse solo si el despliegue a producción ha terminado bien, para que el enlace muestre ya el contenido nuevo.

#### Scenario: Despliegue fallido
- **WHEN** el despliegue de un push con entradas nuevas falla
- **THEN** no se envía ningún email

### Requirement: Los internos no reciben avisos
Los avisos SHALL enviarse solo a los contactos del registro, no a los miembros de `nusku.cloud` que no figuren en él.

#### Scenario: Página solo interna
- **WHEN** se añade una entrada a una página que ningún consumidor tiene asignada
- **THEN** no se envía ningún email

### Requirement: Ejecución manual sin avisos
Una ejecución manual del despliegue, sin push asociado, MUST NOT enviar avisos.

#### Scenario: Ejecución manual
- **WHEN** se lanza el workflow de despliegue a mano
- **THEN** se despliega y no se envía ningún email

### Requirement: Fallos de envío visibles
Si el envío falla o la clave de correo no está configurada, el job de avisos MUST terminar en error indicando qué contactos no recibieron el aviso. El despliegue ya hecho no se revierte.

#### Scenario: Clave ausente
- **WHEN** la clave de correo no está configurada en CI y hay entradas nuevas
- **THEN** el job de avisos falla y lista los avisos pendientes
