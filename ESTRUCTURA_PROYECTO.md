# Estructura del Proyecto: Plantilla Dossiers ENAE

Este documento actúa como guía y auditoría de la organización de los archivos del proyecto, pensado para mantener una arquitectura coherente, limpia y fácilmente comprensible tanto para usuarios como para integraciones de Inteligencia Artificial.

## Organización Principal

- **`assets/`**: Centraliza todos los recursos web. Es la única fuente de verdad para elementos estáticos.
  - `css/`, `fonts/`, `js/`: Código fuente front-end.
  - `images/`: Almacenamiento categorizado de todas las imágenes.
    - `professors/`: Fotografías individuales del claustro docente.
    - `logos/`: Identidad corporativa y logos de partners (Universidades, empresas).
    - `seals/`: Sellos de calidad y certificaciones.
    - `rankings/`: Distintivos y medallas de rankings internacionales (QS, El Mundo).
    - `masters/`: Subcarpetas por área de conocimiento (Marketing, RRHH, etc.) con imágenes de portada e interiores.
    - `resources/` y `experiencia/`: Fotografías genéricas de aulas, alumnos y campus.
    - `ENAE/`: Imágenes por defecto o de resguardo.
  - `source_files/`: Archivos editables crudos de diseño (.psd, .ai).

- **`dossiers/`**: Contiene todos los archivos `.html` correspondientes a cada uno de los másteres. 
  - Archivo clave: `_PLANTILLA-BASE.html` (Template base para nuevos másteres).
  - Cada archivo aquí enlaza a las imágenes relativas en `../assets/images/`.

- **`src/`** (Obsoleto/Limpiado): Anteriormente usado para imágenes. Ha sido migrado íntegramente a `assets/images/` para mantener una estructura web estandarizada.

- **`doc/`**: Carpeta para documentación adicional del proyecto o notas temporales. Los recursos multimedia que antes residían aquí han sido clasificados en `assets/`.

- **`scripts/`**: Herramientas y scripts de automatización (ej. Python, Node.js) para procesar datos, hidratar plantillas o generar PDFs.

## Beneficios del Sistema Actual
1. **Predictibilidad (Para la IA y Desarrolladores):** Cualquier sistema automatizado sabe exactamente dónde depositar una foto de profesor (`assets/images/professors/`) o un nuevo logo (`assets/images/logos/`).
2. **Prevención de Duplicados:** Al centralizar todo en `assets/images/`, se evita tener recursos repetidos dispersos por diferentes carpetas.
3. **Mantenimiento Ágil:** Los cambios de diseño global (como actualizar el logo de una universidad o un ranking) solo se tienen que hacer en una única carpeta.
