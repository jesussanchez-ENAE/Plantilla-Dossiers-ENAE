# Guía de Organización de Recursos (Assets)

Esta carpeta centraliza todos los recursos gráficos, estilos y fuentes utilizados en los dossiers y la plantilla principal de ENAE. Para garantizar que tanto los desarrolladores, los usuarios finales como las herramientas de Inteligencia Artificial (IA) sepan dónde encontrar y guardar la información, se ha establecido la siguiente estructura coherente.

## Estructura de Directorios

### 1. `images/` - Recursos Gráficos
Esta es la carpeta principal para todas las imágenes. Se subdivide de forma lógica para clasificar el contenido:

- **`professors/` (Fotografía de Profesores)**
  Aquí se deben guardar todas las fotos de los docentes y ponentes.
  *Convención recomendada: `nombre_apellido_web250.jpg`*

- **`logos/` (Logotipos)**
  Contiene los logos institucionales (ENAE, universidades asociadas como UMU o UPCT, logos de partners, etc.).
  *Formatos recomendados: `.svg` o `.png` transparente.*

- **`seals/` (Sellos y Certificaciones)**
  Sellos de calidad, membresías y acreditaciones de escuelas (ej. AMBA, AACSB, ISO).

- **`rankings/` (Rankings y Premios)**
  Imágenes e insignias relacionadas con rankings de prestigio (ej. QS Rankings, El Mundo, Financial Magazine).

- **`resources/` (Imágenes de Recursos Generales)**
  Fotografías generales de apoyo para marketing, campus, alumnos, sesiones de clase o recursos genéricos para ilustrar.

- **`experiencia/` (Imágenes de Experiencia)**
  Imágenes específicas para la sección de "Experiencia ENAE" (fotografías del entorno, networking, etc.).

- **`masters/` (Imágenes Específicas por Máster)**
  Contiene subcarpetas para cada área de conocimiento (ej. `Agronegocios`, `Marketing`, `Logistica`, `RRHH`). Aquí se guardan las fotos de portada o recursos exclusivos que aplican a un dossier en particular.

- **`ENAE/` (Imágenes Fallback/Generales de ENAE)**
  Imágenes por defecto o de respaldo en caso de que un máster no tenga imágenes específicas configuradas.

### 2. `source_files/` - Archivos Fuente de Diseño (Editables)
Aquí se almacenan los archivos originales de diseño (Photoshop `.psd`, Illustrator `.ai`, etc.) que no se sirven directamente en la web pero que son el origen de las imágenes exportadas. Mantenerlos aquí permite a los diseñadores acceder rápidamente a ellos.

### 3. `css/`, `fonts/`, `js/`
Carpetas estándar para hojas de estilo, tipografías y scripts respectivamente.

---

## Instrucciones para IA y Asistentes Virtuales
- Cuando se te solicite añadir una **foto de un nuevo profesor**, colócala en `assets/images/professors/`.
- Al crear o modificar un **dossier en `.html`**, todas las rutas de imágenes deben ser relativas a la carpeta assets: `../assets/images/<categoria>/<archivo>`.
- Las imágenes de **rankings y acreditaciones** deben apuntar a `../assets/images/rankings/` o `../assets/images/seals/` según corresponda.
- Si requieres **logos institucionales**, búscalo en `assets/images/logos/`.
