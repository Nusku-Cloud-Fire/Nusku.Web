# Spec Delta

## Purpose

Publica documentación privada de integración (por ejemplo, los códigos SIA que enviamos a cada central receptora) como páginas individuales con historial de cambios, y define en el repo qué consumidor puede ver cada página.

## ADDED Requirements

### Requirement: Una página por documentación
El sistema SHALL servir cada documentación como una página propia bajo `/documentacion/<slug>`, identificada por un id estable. Cada página MUST declarar id, título e historial de cambios.

#### Scenario: Página publicada
- **WHEN** existe una página con slug `sia-codigos-eventos` y un usuario autorizado la abre
- **THEN** ve su título, su contenido y su historial de cambios

#### Scenario: Slug inexistente
- **WHEN** un usuario abre `/documentacion/no-existe`
- **THEN** recibe la página 404 de la web

### Requirement: Historial de cambios visible
Cada página SHALL mostrar su historial de cambios del más reciente al más antiguo. Cada entrada MUST tener fecha y nota.

#### Scenario: Página con varias entradas
- **WHEN** una página tiene entradas del 2026-09-01 y del 2026-10-07
- **THEN** la del 2026-10-07 aparece primero, con su fecha y su nota

### Requirement: Registro de consumidores en el repo
El sistema SHALL decidir el acceso externo a partir de un registro versionado en el repo. En él, cada consumidor tiene nombre, uno o más emails de contacto y la lista de ids de página a los que tiene acceso.

#### Scenario: Concesión de acceso
- **WHEN** se añade el id de una página a un consumidor y el cambio se despliega
- **THEN** sus contactos pueden ver esa página

#### Scenario: Retirada de acceso
- **WHEN** se quita el id de una página de un consumidor y el cambio se despliega
- **THEN** sus contactos dejan de poder verla, aunque tengan una sesión abierta

### Requirement: Registro válido antes de desplegar
El despliegue MUST fallar si el registro hace referencia a un id de página que no existe, contiene un email mal formado o repite el id de un consumidor.

#### Scenario: Id de página con errata
- **WHEN** un consumidor lista `sia-codigos-evento` y esa página no existe
- **THEN** el workflow de despliegue falla antes de desplegar e indica el id erróneo

### Requirement: Índice personal
`/documentacion` SHALL listar solo las páginas que el usuario identificado puede ver, cada una con su título y la fecha de su último cambio.

#### Scenario: Consumidor con dos páginas
- **WHEN** un contacto cuyo consumidor tiene acceso a dos páginas abre `/documentacion`
- **THEN** ve esas dos páginas y ninguna otra

### Requirement: Fuera de buscadores
Las páginas de documentación MUST declarar `noindex`. La ruta `/documentacion` MUST figurar en `disallow` de `robots.txt` y no aparecer en el sitemap.

#### Scenario: Robots
- **WHEN** se solicita `/robots.txt`
- **THEN** incluye `Disallow: /documentacion`
