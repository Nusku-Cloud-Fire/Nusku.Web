# Spec Delta

## Purpose

Identifica a quien consulta la documentación sin cuentas ni contraseñas, mediante un enlace enviado a su email, y limita cada página a quien tiene acceso a ella.

## ADDED Requirements

### Requirement: Solicitud de enlace de acceso
El sistema SHALL permitir solicitar un enlace de acceso introduciendo un email. Si el email está autorizado, SHALL enviarle por correo un enlace de acceso. La respuesta visible MUST ser idéntica tanto si el email está autorizado como si no.

#### Scenario: Email de un contacto registrado
- **WHEN** `tecnico@central-x.es` figura en el registro y solicita acceso
- **THEN** recibe un email con un enlace de acceso, y la pantalla dice "si tu email tiene acceso, recibirás un enlace"

#### Scenario: Email desconocido
- **WHEN** `alguien@otro.com` no figura en el registro y solicita acceso
- **THEN** no se envía ningún email y la pantalla muestra el mismo mensaje

### Requirement: Comparación de emails sin distinguir mayúsculas
Los emails SHALL compararse tras recortar espacios y pasarlos a minúsculas.

#### Scenario: Mayúsculas
- **WHEN** el registro tiene `tecnico@central-x.es` y se solicita con ` Tecnico@Central-X.es `
- **THEN** se trata como el mismo contacto

### Requirement: Caducidad del enlace
El enlace de acceso MUST caducar a los 15 minutos de emitirse y MUST quedar ligado al email que lo solicitó.

#### Scenario: Enlace vigente
- **WHEN** se abre el enlace a los 5 minutos
- **THEN** se inicia sesión con ese email y se redirige a la página solicitada, o a `/documentacion`

#### Scenario: Enlace caducado o manipulado
- **WHEN** se abre el enlace a los 20 minutos, o con el contenido alterado
- **THEN** no se inicia sesión y se ofrece solicitar un enlace nuevo

### Requirement: Sesión de 7 días
Tras un acceso válido, el sistema SHALL mantener la sesión 7 días mediante una cookie firmada, inaccesible desde JavaScript y enviada solo por HTTPS en producción.

#### Scenario: Vuelta a los 3 días
- **WHEN** el usuario vuelve 3 días después en el mismo navegador
- **THEN** ve la documentación sin solicitar otro enlace

#### Scenario: Vuelta a los 8 días
- **WHEN** vuelve 8 días después
- **THEN** se le pide su email de nuevo

### Requirement: Acceso interno total
Cualquier email del dominio `nusku.cloud` SHALL poder acceder y ver todas las páginas, sin figurar en el registro.

#### Scenario: Miembro del equipo
- **WHEN** `pau@nusku.cloud` solicita acceso y entra
- **THEN** su índice lista todas las páginas

### Requirement: Autorización por página en cada petición
Cada petición a una página SHALL comprobar, contra el registro desplegado, que el email de la sesión tiene acceso a esa página. Sin sesión, MUST redirigirse a la pantalla de acceso conservando la página de destino.

#### Scenario: Sin sesión
- **WHEN** alguien sin sesión abre `/documentacion/sia-codigos-eventos`
- **THEN** se le redirige a la pantalla de acceso y, tras entrar, vuelve a esa página

#### Scenario: Página no asignada
- **WHEN** un contacto con sesión abre una página que su consumidor no tiene asignada
- **THEN** ve un aviso de que no tiene acceso a esa página, sin su contenido

### Requirement: Redirecciones solo internas
La página de destino tras el acceso MUST ser una ruta bajo `/documentacion`. Cualquier otro destino SHALL sustituirse por `/documentacion`.

#### Scenario: Destino externo
- **WHEN** el enlace lleva como destino `https://evil.example`
- **THEN** tras entrar se redirige a `/documentacion`

### Requirement: Cerrar sesión
El usuario SHALL poder cerrar sesión, lo que elimina la cookie.

#### Scenario: Cerrar sesión
- **WHEN** el usuario pulsa "Cerrar sesión"
- **THEN** la siguiente visita a una página le pide su email

### Requirement: Rastro de inicios de sesión
Cada inicio de sesión válido SHALL escribir en los logs del servidor una línea con el email y la fecha. El sistema MUST NOT registrar visitas a páginas.

#### Scenario: Inicio de sesión
- **WHEN** `tecnico@central-x.es` abre un enlace válido
- **THEN** los logs de Azure contienen una línea de inicio de sesión con ese email

### Requirement: Sin configuración no hay acceso
Si falta el secreto de firma o la clave de envío de correo, el sistema MUST NOT conceder acceso a nadie y SHALL mostrar que el acceso no está disponible.

#### Scenario: Secreto ausente
- **WHEN** falta el secreto de firma en el entorno
- **THEN** solicitar acceso muestra un mensaje de servicio no disponible y no se inicia ninguna sesión
