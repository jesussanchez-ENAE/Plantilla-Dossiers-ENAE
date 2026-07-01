# Plantilla de Dossiers ENAE

Constructor interactivo de **dossiers académicos** para [ENAE International Business School](https://www.enae.es/) (Murcia, España). Cada dossier es un **deck HTML de 11 slides en 16:9** que se puede exportar a PDF (A4 vertical o A4 horizontal 16:9), navegar en móvil como long-scroll editorial, y **editar en tiempo real** desde un panel de administración web.

> **Estado**: producción · curso académico 2026/27 · 16 dossiers cargados

---

## 1 · Qué hay dentro

| Vista | Uso |
|---|---|
| **Panel de administración** (`/manager.html`) | Lista los dossiers existentes, permite verlos, elegir titulación oficial, editar y eliminar. |
| **Constructor / editor** (`/index.html`) | Flujo asistido para crear un dossier nuevo o editar uno existente. |
| **Dossier renderizado** (`/dossiers/<slug>.html`) | El deck 16:9 responsive + selector de exportación PDF (vertical/apaisado). |
| **Plantilla base** (`dossiers/_PLANTILLA-BASE.html`) | Fuente de verdad del diseño. Cualquier cambio de UI se hace aquí primero. |

### Estructura de una slide

```
S1  Portada — foto sangre + título mixto + KPI strip + titulación oficial
S2  Qué es — foto izquierda + cadena de valor
S2b Data-viz — 4 KPIs de impacto académico
S3  Programa — grid 3 col de módulos (paginación automática si > 8)
S3b Temario IA — 5 puntos + ECTS + modalidades
S4  Metodología 360 Learning + modalidades
S5  Empleabilidad — mega-número + secondary stats + empresas + foto
S6  Rankings — hero QS #9 + 8 rankings menores + acreditaciones
S7  Claustro — 7 fotos reales de profesores (paginable si > 8)
S8  Perfil del alumno + timeline vertical de admisión
S9  Cierre — "E" gigante + logo + contacto
```

---

## 2 · Stack técnico

| Capa | Tecnología |
|---|---|
| Backend | **Node.js 22** + **Express 4** (`server.js`) |
| Frontend admin | Vanilla JS + HTML5 + CSS3 (sin bundler) |
| Frontend dossier | HTML + CSS + Vanilla JS + [anime.js](https://animejs.com/) 3.2.1 |
| IA de generación | API Anthropic (`claude-3-5-sonnet-*`) para modo asistido |
| Uploads | `multer` (imágenes/PDFs de referencia) |
| Parseo PDF | `pdf-parse` (para importar pensums oficiales) |
| Motor de captura | `puppeteer` (auditorías responsivas y verificaciones) |

**Tres modos de renderizado** convivenen en el mismo HTML:

1. **Deck 16:9** (1366×768 nominal) — vista principal en pantalla.
2. **PDF A4 vertical** — reflow editorial vía `@media print`, banda fotográfica en S5, rankings a 2 columnas, contenido apilado.
3. **Móvil / long-scroll** — `@media (max-width: 768px)`, `overflow-y: auto` por slide, tipografía escalada a WCAG AA, touch targets ≥ 44 px.

---

## 3 · Requisitos

- **Node.js 22** o superior
- **npm 10+**
- **Chromium** (lo instala automáticamente `puppeteer`, ~170 MB)
- Opcional: `ANTHROPIC_API_KEY` en `.env` para el generador asistido

---

## 4 · Instalación

```bash
git clone https://github.com/jesussanchez-ENAE/Plantilla-Dossiers-ENAE.git
cd Plantilla-Dossiers-ENAE

npm install
cp .env.example .env         # edita ANTHROPIC_API_KEY si vas a usar el generador IA

npm start                    # arranca el server en http://localhost:3000
```

Endpoints útiles al arrancar:
- **`http://localhost:3000/manager.html`** — panel de administración
- **`http://localhost:3000/index.html`** — constructor/editor
- **`http://localhost:3000/dossiers/<slug>.html`** — dossier renderizado

---

## 5 · Cómo se crea un dossier

Hay **tres caminos**, según el escenario:

### 5.1 Desde el editor web (recomendado para uso diario)

1. Abre `http://localhost:3000/index.html`.
2. Rellena el formulario (nombre del programa, módulos, KPIs, empresas, claustro…).
3. Pulsa **Guardar**. El sistema hace un `POST /api/dossiers` con el JSON del dossier.
4. `server.js` copia `dossiers/_PLANTILLA-BASE.html`, sustituye el bloque `<script id="dossier-data">` con tus datos, y guarda como `dossiers/<slug>.html`.
5. El nuevo dossier aparece en el panel de administración.

### 5.2 Desde un PDF de pensum oficial (bulk import)

Para bulk import de los planes de estudio oficiales de ENAE (formato PDF):

```bash
node scratch/build_dossiers.js --pilot                # sanity check con Finanzas
node scratch/build_dossiers.js --all-new              # crea todos los faltantes
node scratch/build_dossiers.js --update-existing      # actualiza SOLO módulos de existentes
```

El script:
1. Lee cada PDF de `~/Downloads/1.7.05 PENSUM 2026_27/` con `pdf-parse`.
2. Extrae la sección **"4. Programa"** con `scratch/parse_modules.js` — soporta 3 formatos:
   - MAYÚSCULAS + bullets `•`
   - MAYÚSCULAS + texto continuado sin bullets
   - Title Case (español o inglés)
3. Infiere el área de cada módulo por keywords (`Finanzas`, `IA`, `Logística`, etc.).
4. Envía el JSON al endpoint `POST /api/dossiers`.

El resto de campos (empresas, KPIs, profesores) se rellenan con los defaults del template — se editan luego desde el manager.

### 5.3 Directamente vía API

```bash
curl -X POST http://localhost:3000/api/dossiers \
  -H 'Content-Type: application/json' \
  -d '{
    "nombre": "mi-master",
    "programa": "Máster en X",
    "modulos": [{"num":"01","area":"Estrategia","nombre":"…","desc":"…"}],
    ...
  }'
```

El único campo obligatorio es `nombre` (se convierte a slug del filename).

---

## 6 · Cómo se edita un dossier

### 6.1 Titulación oficial (rápido, desde el manager)

En cada card del panel de administración hay un selector desplegable **Titulación oficial** con 4 opciones:

| Opción | Efecto en la portada del dossier |
|---|---|
| Universidad de Murcia | Logo UMU + "Título oficial" |
| Universidad Politécnica de Cartagena | Logo UPCT + "Título oficial" |
| Panamerican University (doble título) | Logo Panamerican + "Doble título con" |
| Título propio de ENAE | Logo ENAE + "Título propio de" |

Al cambiar la opción se ejecuta un `POST /api/dossiers/:fileName/titulo-oficial` que **modifica solo el bloque `doble_titulo`** del JSON (conserva el resto del dossier intacto). El cambio se refleja instantáneamente en la portada del dossier.

### 6.2 Cualquier otro campo (desde el editor)

Botón **Editar** en cada card → abre `/index.html?edit=<fileName>` → mismo formulario del creador con los datos precargados. Al guardar se sobrescribe el archivo.

### 6.3 Edición manual del JSON

Cada dossier es un HTML autónomo con el JSON dentro:

```html
<script id="dossier-data" type="application/json">
{
  "programa": "…",
  "modulos": [ … ],
  "empresas": [ … ],
  "profesores": [ … ],
  ...
}
</script>
```

Se puede editar con cualquier editor de texto y recargar la página. `hydrateProgram()` se ejecuta en cada carga y aplica los datos a los placeholders.

> **⚠️ Cuidado**: NO metas el string literal `<script id="dossier-data"` en comentarios HTML. El regex de `server.js` lo matchearía y destruiría el bloque real al regenerar. Ya está saneado en la plantilla como `[bloque script dossier-data]`.

---

## 7 · Campos del JSON (referencia rápida)

```jsonc
{
  "programa":     "Máster en …",           // título completo
  "titulo_l":     "Máster en",              // primera línea (SFUIDisplay Bold)
  "titulo_b1":    "Marketing",              // segunda línea, sans-serif
  "titulo_b2":    "Digital.",               // segunda línea, Playfair italic
  "subtitulo":    "Mención en IA Aplicada",
  "categoria":    "Programa de Posgrado · Máster Internacional",

  "doble_titulo": {                          // ← se controla desde el manager
    "tipo":   "panamerican",
    "nombre": "Panamerican University",
    "pais":   "Florida, EE.UU.",
    "logo":   "../src/logos/Panamerican-University-W-T.png",
    "label":  "Doble título con"
  },

  "foto_portada":     "../doc/…/foto1.jpg",
  "foto_que_es":      "../doc/…/foto2.jpg",
  "foto_metodologia": "../doc/…/foto3.jpg",

  "kpis_portada":     [ { "n": "#9",   "l": "QS España 2026" }, … ],
  "descripcion":      "El mercado busca profesionales …",
  "cadena_valor":     [ { "label": "Investigación", "sub": "Insights & datos" }, … ],

  "modulos": [
    { "num": "01", "area": "E-Commerce", "nombre": "…", "desc": "…" },
    …
  ],
  "ia_temario":       [ { "nombre": "…", "desc": "…" }, … ],
  "ects":             60,
  "meses":            12,

  "kpi1":             { "valor": 91, "label": "trabajando<br>al terminar" },
  "kpi2":             { "valor": 82, "label": "mejora profesional<br>demostrada" },
  "empresas":         [ "Hero España", "IKEA Ibérica", … ],
  "profesores":       [ { "foto": "…", "nombre": "…", "rol": "…", "area": "…" }, … ],
  "perfil_bullets":   [ "Directivos y ejecutivos …", … ],
  "demo_stats":       [ { "n": "44<span>%</span>", "l": "mujeres", "pct": 44 }, … ]
}
```

**Paginación automática**: si `modulos.length > 8`, `ia_temario.length > 8`, o `profesores.length > 8`, la slide se clona en varias páginas (S3, S3-p2, S3-p3…) con tag `1 / 2`, `2 / 2` en la esquina superior derecha.

---

## 8 · Identidad corporativa

Aplicada estrictamente en todo el sistema. Reglas duras:

| Elemento | Valor |
|---|---|
| Granate | `#a91831` |
| Granate oscuro | `#7a1020` |
| Negro | `#202221` |
| Blanco | `#ffffff` |
| **Prohibido** | Azul institucional, gradientes morados, cyan, verde |
| Fuente display | SFUIDisplay Black/Bold (`../assets/fonts/SFUIDisplay-*`) |
| Fuente cuerpo | Open Sans ExtraBold / Bold / Light |
| Fuente serif de firma | Playfair Display italic (solo títulos, eyebrows y citas) |
| Título mixto | `.tb` (sans bold) + `.ti` (Playfair italic) — recurso central de marca |
| Patrón "E" | Bloques angulares granate a bajo alpha, decorativo |

---

## 9 · Exportar a PDF

Dos formatos desde el botón flotante **Exportar PDF** en la esquina inferior derecha:

- **Vertical** (A4 portrait) — dossier apilado como documento editorial. Ideal para envío a candidatos.
- **Presentación** (A4 landscape 16:9) — cada slide en una página horizontal, mantiene el layout del deck. Ideal para presentaciones proyectadas.

Bajo el capó: el JS inyecta un `<style>` con `@page {size: A4 landscape}` + inline styles con `!important` en cada `.slide` (única forma fiable de sobrescribir el reflow A4 vertical existente). Tras `window.print()` se restaura el estado original.

---

## 10 · Comandos disponibles

```bash
npm start           # server en :3000
npm run dev         # dev server con auto-reload (browser-sync)
npm run build:css   # compila styles.css (Tailwind)
```

Auditorías / mantenimiento:

```bash
node scratch/audit_responsive.js       # audit responsive completo
node scratch/verify_all.js             # verifica que todos los dossiers renderizan
node scratch/build_dossiers.js --help  # opciones del bulk importer
```

---

## 11 · Estructura del proyecto

```
├── server.js                       # Express + endpoints REST
├── index.html                      # constructor/editor
├── manager.html                    # panel de administración
├── app.js                          # lógica del constructor
├── styles.css                      # estilos globales del admin
├── package.json
├── .env.example                    # ANTHROPIC_API_KEY=...
│
├── dossiers/                       # ← salidas
│   ├── _PLANTILLA-BASE.html        # plantilla oficial (fuente de verdad)
│   └── master-*.html               # 16 dossiers de producción
│
├── assets/
│   ├── fonts/                      # SFUIDisplay, OpenSans (.otf/.ttf)
│   └── logos/                      # ENAE (varias variantes)
│
├── src/
│   ├── logos/                      # UMU, UPCT, Panamerican, Rankings, ENAE
│   ├── img/                        # fotografía de campus y programas
│   └── Rankings/                   # badges QS oficiales
│
├── doc/                            # PDFs de referencia y fotos por programa
│   ├── Marketing Digital/          # fotos + profesores del máster de marketing
│   ├── RRHH/                       # fotos + profesores del máster de RRHH
│   ├── Manual_de_Marca_ENAE.pdf
│   └── Rankings.jpg
│
├── scripts/
│   └── build-css.js                # compilador de styles.css
│
├── scratch/                        # utilidades y scratchpad (git-ignored)
│   ├── build_dossiers.js           # bulk importer desde pensums PDF
│   ├── parse_modules.js            # extractor de módulos PDF → JSON
│   ├── audit_responsive.js         # auditoría responsive con puppeteer
│   └── …
│
├── _archive/                       # vestigiales (plantillas antiguas archivadas)
│
├── uploads/                        # imágenes subidas vía manager
└── node_modules/
```

---

## 12 · API REST

| Método | Ruta | Uso |
|---|---|---|
| `GET`    | `/api/dossiers` | Lista todos los dossiers (metadatos + `tituloOficial` actual) |
| `POST`   | `/api/dossiers` | Crea o sobrescribe un dossier (body = JSON completo) |
| `DELETE` | `/api/dossiers/:fileName` | Elimina un dossier |
| `POST`   | `/api/dossiers/:fileName/titulo-oficial` | Cambia solo la titulación oficial. Body: `{ "tipo": "umu" \| "upct" \| "panamerican" \| "enae" }` |
| `GET`    | `/api/titulos-oficiales` | Devuelve el diccionario de opciones (nombre, país, logo, label) |
| `POST`   | `/api/generate-dossier` | Genera un dossier asistido por Claude a partir de un PDF/DOCX subido |
| `POST`   | `/api/upload-image` | Sube una imagen a `uploads/` |
| `GET`    | `/api/config` | Configuración pública (¿hay API key de Anthropic?) |

---

## 13 · Contribuir

Reglas heredadas de la sesión de diseño:

- **Todo cambio de diseño se hace primero en `_PLANTILLA-BASE.html`**, luego se propaga.
- **Nunca** meter azul, emoji, gradiente morado, o tipografía Inter/Roboto/Arial como display — rompe la identidad.
- **Tipografía**: Playfair italic solo en títulos, eyebrows y citas. Open Sans italic para etiquetas de datos.
- **PDF A4**: cualquier cambio del `@media print` requiere verificar los 16 dossiers (`node scratch/verify_all.js`).
- **Responsive**: touch targets ≥ 44 px en móvil, tipografía cuerpo ≥ 14 px, `overflow-y: auto` en todas las slides móvil.
- **Commits**: en español, prefijo por área (`S5:`, `PDF:`, `manager:`, etc.).

---

## Licencia

MIT © ENAE Business School / Antigravity AI
