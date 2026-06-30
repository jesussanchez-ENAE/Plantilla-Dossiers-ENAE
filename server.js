const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const fsMod = require('fs');

// Set up multer for file uploads in memory (documentos para IA)
const upload = multer({ storage: multer.memoryStorage() });

// Carpeta de imágenes subidas por el usuario
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fsMod.existsSync(UPLOADS_DIR)) fsMod.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer a disco para fotos (profesores, portada…)
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOADS_DIR),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.jpg';
        const base = (req.body.slot || 'img').toString().replace(/[^a-z0-9_-]/gi, '').slice(0, 40);
        cb(null, base + '-' + Date.now() + '-' + Math.round(Math.random() * 1e4) + ext);
    }
});
const uploadImg = multer({
    storage: imgStorage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
    fileFilter: (req, file, cb) => {
        const ok = /^image\/(jpe?g|png|webp|avif)$/i.test(file.mimetype);
        cb(ok ? null : new Error('Solo se admiten imágenes JPG, PNG, WEBP o AVIF.'), ok);
    }
});

// Enable CORS and JSON parsing (límite ampliado por si llegan payloads grandes)
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/uploads', express.static(UPLOADS_DIR));

// ── Endpoint: subir imagen (foto profesor, portada, etc.) ──
app.post('/api/upload-image', uploadImg.single('imagen'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No se recibió ninguna imagen.' });
    // Ruta relativa desde un dossier (que está en /dossiers/xxx.html)
    res.json({
        success: true,
        url: '/uploads/' + req.file.filename,           // ruta absoluta para el editor
        relPath: '../uploads/' + req.file.filename        // ruta relativa para el HTML del dossier
    });
});

// Available product types and thematic areas configuration
const PRODUCT_CONFIG = {
    types: [
        { id: "master", name: "Máster" },
        { id: "mba", name: "MBA" },
        { id: "ejecutivo", name: "Programa Ejecutivo" },
        { id: "curso", name: "Curso" },
        { id: "directivo", name: "Programa Directivo" }
    ],
    modalities: [
        { id: "presencial", name: "Presencial" },
        { id: "online", name: "Online" },
        { id: "hibrido", name: "Híbrido" },
        { id: "semipresencial", name: "Semipresencial" }
    ],
    areas: [
        "Dirección y Estrategia",
        "Marketing y Comercial",
        "Finanzas y Control",
        "Operaciones y Logística",
        "Recursos Humanos y Liderazgo",
        "Tecnología y Business Intelligence",
        "Agroalimentación y Medio Ambiente"
    ]
};

// API Endpoint to get product configuration options
app.get('/api/config', (req, res) => {
    res.json(PRODUCT_CONFIG);
});

// API Endpoint to generate dossier contents via Claude
app.post('/api/generate-dossier', upload.single('documento'), async (req, res) => {
    const { tipo, nombre, area, duracion, modal, precio, fecha, notas } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre del programa es obligatorio." });
    }

    let documentText = "";
    if (req.file) {
        try {
            const ext = path.extname(req.file.originalname).toLowerCase();
            if (ext === '.pdf') {
                const data = await pdfParse(req.file.buffer);
                documentText = data.text;
            } else if (ext === '.docx') {
                const result = await mammoth.extractRawText({ buffer: req.file.buffer });
                documentText = result.value;
            } else if (ext === '.txt') {
                documentText = req.file.buffer.toString('utf-8');
            }
        } catch (e) {
            console.error("Error parsing document:", e);
            // Non-fatal, just continue without doc text or with partial
        }
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        console.error("Falta ANTHROPIC_API_KEY en el entorno (.env)");
        return res.status(500).json({ error: "Configuración del servidor incompleta: falta la clave API de IA en el archivo .env." });
    }

    // Extraer campos del body con nombres del nuevo formulario
    const meses  = req.body.meses  || duracion || '12';
    const ects   = req.body.ects   || '60';

    // Inferir líneas del título a partir del nombre y tipo
    const tipoLabels = {
        master: 'Máster en', mba: 'MBA', ejecutivo: 'Programa Ejecutivo en',
        curso: 'Curso en', directivo: 'Programa Directivo en'
    };
    const titulo_l_default = tipoLabels[tipo] || 'Programa en';

    let prompt = `Eres director de contenidos de ENAE International Business School (Murcia, España).
Genera el contenido académico para el siguiente programa:
- Tipo: ${tipo || 'máster'}
- Nombre completo: ${nombre}
- Área temática: ${area || 'Dirección y Estrategia'}
- Duración: ${meses} meses · ${ects} ECTS
- Modalidad: ${modal || 'Online en directo'}
- Precio: ${precio || 'no especificado'}
- Notas de enfoque: ${notas || 'ninguna'}
`;
    if (documentText) {
        prompt += `\nContenido del documento de referencia adjunto:\n${documentText.substring(0, 10000)}\n`;
    }

    prompt += `
Responde ÚNICAMENTE con un objeto JSON válido, sin markdown, sin comentarios. Formato exacto:
{
  "programa": "${nombre}",
  "titulo_l": "${titulo_l_default}",
  "titulo_b1": "primera palabra o grupo de palabras en bold (ej: 'Marketing Digital')",
  "titulo_b2": "segunda línea bold más corta con punto final (ej: 'e IA.')",
  "subtitulo": "mención especial o énfasis diferenciador breve (ej: 'Mención en Inteligencia Artificial Aplicada')",
  "descripcion": "2-3 frases impactantes describiendo el valor diferencial del programa. Puede incluir etiquetas <strong> para énfasis.",
  "cadena_valor": [
    { "label": "Fase 1", "sub": "descripción corta" },
    { "label": "Fase 2", "sub": "descripción corta" },
    { "label": "Fase 3", "sub": "descripción corta" },
    { "label": "Fase 4", "sub": "descripción corta" },
    { "label": "Fase 5", "sub": "descripción corta" }
  ],
  "modulos": [
    { "num": "01", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "02", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "03", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "04", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "05", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "06", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "07", "area": "Área corta", "nombre": "Nombre completo del módulo" },
    { "num": "08", "area": "Área corta", "nombre": "Nombre completo del módulo" }
  ],
  "ia_asignaturas": [
    "Asignatura especializada 1",
    "Asignatura especializada 2",
    "Asignatura especializada 3",
    "Asignatura especializada 4",
    "Asignatura especializada 5",
    "Asignatura especializada 6"
  ],
  "kpi1": { "valor": 91, "label": "trabajando<br>al terminar" },
  "kpi2": { "valor": 82, "label": "mejora profesional<br>demostrada" },
  "empresas": ["Empresa 1", "Empresa 2", "Empresa 3", "Empresa 4", "Empresa 5", "Empresa 6", "Empresa 7", "Empresa 8"],
  "perfil_bullets": [
    "Perfil de alumno objetivo 1",
    "Perfil de alumno objetivo 2",
    "Perfil de alumno objetivo 3",
    "Perfil de alumno objetivo 4",
    "Perfil de alumno objetivo 5"
  ],
  "demo_stats": [
    { "n": "44<span>%</span>", "l": "mujeres",          "pct": 44 },
    { "n": "9",                "l": "nacionalidades",    "pct": 90 },
    { "n": "33<span>%</span>", "l": "21–26 años",       "pct": 33 },
    { "n": "42<span>%</span>", "l": "mando intermedio", "pct": 42 }
  ]
}
IMPORTANTE: los campos titulo_b1 y titulo_b2 deben ser las palabras clave más impactantes del nombre del programa, divididas en dos líneas visuales. Usa términos reales del área ${area || 'del programa'}.`;

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 1500,
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok) {
            const errData = await response.json();
            console.error("Error de Anthropic API:", errData);
            return res.status(502).json({ error: "Error en la respuesta del motor de Inteligencia Artificial de Anthropic." });
        }

        const data = await response.json();
        const textContent = data.content[0].text.trim();
        
        // Clean markdown blocks if LLM accidentally outputs them
        const cleanedJson = textContent.replace(/```json|```/g, "").trim();
        const parsedDossier = JSON.parse(cleanedJson);

        res.json(parsedDossier);
    } catch (error) {
        console.error("Error al procesar la generación del dossier:", error);
        res.status(500).json({ error: "Error interno al estructurar el contenido con IA. Comprueba la conexión y claves." });
    }
});

// --- CMS Endpoints ---
const fs = require('fs');
const DOSSIERS_DIR = path.join(__dirname, 'dossiers');

// Ensure dossiers directory exists
if (!fs.existsSync(DOSSIERS_DIR)) {
    fs.mkdirSync(DOSSIERS_DIR);
}

// Helper to slugify names
function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

// Save a dossier (creates a standalone HTML from the master template)
app.post('/api/dossiers', (req, res) => {
    try {
        const dossierData = req.body;
        if (!dossierData.nombre) {
            return res.status(400).json({ error: "Falta el nombre del programa" });
        }

        const fileName = slugify(dossierData.nombre) + '.html';
        const filePath = path.join(DOSSIERS_DIR, fileName);

        // ── Plantilla oficial: _PLANTILLA-BASE.html (fuente de verdad del diseño) ──
        // Si por error se borra, caemos al dossier de Marketing como respaldo (misma estructura).
        const basePath     = path.join(DOSSIERS_DIR, '_PLANTILLA-BASE.html');
        const fallbackPath = path.join(DOSSIERS_DIR, 'master-marketing-digital-ia.html');

        let templatePath = fs.existsSync(basePath) ? basePath
                         : fs.existsSync(fallbackPath) ? fallbackPath
                         : null;

        if (!templatePath) {
            return res.status(500).json({ error: "No se encuentra la plantilla base (_PLANTILLA-BASE.html)." });
        }

        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // ── Reemplazar el bloque dossier-data con los nuevos datos ──
        const newDataBlock = `<script id="dossier-data" type="application/json">\n${JSON.stringify(dossierData, null, 2)}\n</script>`;

        if (htmlContent.includes('<script id="dossier-data"')) {
            // Sustituir el bloque existente (desde la apertura hasta el cierre del </script>)
            htmlContent = htmlContent.replace(
                /<script id="dossier-data"[^>]*>[\s\S]*?<\/script>/,
                newDataBlock
            );
        } else {
            // Fallback: inyectar antes de </head>
            htmlContent = htmlContent.replace('</head>', `    ${newDataBlock}\n</head>`);
        }

        // ── Actualizar el <title> con el nombre del programa ──
        if (dossierData.programa) {
            htmlContent = htmlContent.replace(
                /<title>[^<]*<\/title>/,
                `<title>${dossierData.programa} — ENAE Business School</title>`
            );
        }

        // ── Guardar como archivo independiente ──
        fs.writeFileSync(filePath, htmlContent, 'utf-8');

        res.json({ success: true, fileName: fileName, path: `/dossiers/${fileName}` });
    } catch (error) {
        console.error("Error al guardar dossier:", error);
        res.status(500).json({ error: "Error al guardar el archivo." });
    }
});

// Helper: derive a category label from the dossier data
function deriveCategoria(data, fileName) {
    if (data && data.categoria) {
        // "Programa de Posgrado · Máster Internacional" → "Máster"
        if (/MBA/i.test(data.categoria) || /MBA/i.test(data.programa || '')) return 'MBA';
        if (/Máster|Master/i.test(data.categoria)) return 'Máster';
        if (/Ejecutivo/i.test(data.categoria)) return 'Executive';
        if (/Curso/i.test(data.categoria)) return 'Curso';
        if (/Directivo/i.test(data.categoria)) return 'Directivo';
    }
    if (/mba/i.test(fileName)) return 'MBA';
    if (/master|máster/i.test(fileName)) return 'Máster';
    return 'Programa';
}

// Helper: build a mixed editorial title (sans + serif italic accent) from data
function buildMixedTitle(data, fileName) {
    if (data && (data.titulo_b1 || data.titulo_b2)) {
        const l  = data.titulo_l  ? `<span class="mt-light">${data.titulo_l}</span> ` : '';
        const b1 = data.titulo_b1 ? `${data.titulo_b1} ` : '';
        const b2 = data.titulo_b2 ? `<span class="mt-accent">${data.titulo_b2}</span>` : '';
        return (l + b1 + b2).trim();
    }
    if (data && data.programa) return data.programa;
    return fileName.replace('.html', '').replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

// Per-file cache keyed by mtime, so unchanged dossiers are never re-read/re-parsed.
const dossierMetaCache = new Map(); // fileName -> { mtimeMs, entry }

function getDossierEntry(file) {
    const filePath = path.join(DOSSIERS_DIR, file);
    const stats = fs.statSync(filePath);

    const cached = dossierMetaCache.get(file);
    if (cached && cached.mtimeMs === stats.mtimeMs) {
        return cached.entry;
    }

    // Try to read the embedded dossier-data JSON for rich metadata
    let data = null;
    try {
        const html = fs.readFileSync(filePath, 'utf-8');
        const m = html.match(/<script id="dossier-data"[^>]*>([\s\S]*?)<\/script>/);
        if (m) data = JSON.parse(m[1]);
    } catch (e) { /* non-fatal — fall back to filename */ }

    const descripcion = data && data.descripcion
        ? data.descripcion.replace(/<\/?[^>]+(>|$)/g, '').trim()
        : '';

    const entry = {
        fileName: file,
        url: `/dossiers/${file}`,
        createdAt: stats.birthtime,
        updatedAt: stats.mtime,
        programa: (data && data.programa) || file.replace('.html', '').replace(/-/g, ' '),
        titleHtml: buildMixedTitle(data, file),
        categoria: deriveCategoria(data, file),
        descripcion: descripcion
    };

    dossierMetaCache.set(file, { mtimeMs: stats.mtimeMs, entry });
    return entry;
}

// List all dossiers (enriched with embedded dossier-data, cached by mtime)
app.get('/api/dossiers', (req, res) => {
    try {
        const files = fs.readdirSync(DOSSIERS_DIR).filter(f => f.endsWith('.html'));
        const liveFiles = new Set(files);

        // Drop cache entries for files that no longer exist
        for (const cachedFile of dossierMetaCache.keys()) {
            if (!liveFiles.has(cachedFile)) dossierMetaCache.delete(cachedFile);
        }

        const dossiers = files.map(getDossierEntry);

        // Sort by newest first
        dossiers.sort((a, b) => b.updatedAt - a.updatedAt);
        res.json(dossiers);
    } catch (error) {
        console.error("Error al listar dossiers:", error);
        res.status(500).json({ error: "Error al listar los archivos." });
    }
});

// Delete a dossier
app.delete('/api/dossiers/:fileName', (req, res) => {
    try {
        const fileName = req.params.fileName;
        // Basic security to prevent directory traversal
        if (fileName.includes('/') || fileName.includes('\\') || !fileName.endsWith('.html')) {
            return res.status(400).json({ error: "Nombre de archivo inválido." });
        }

        const filePath = path.join(DOSSIERS_DIR, fileName);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "Archivo no encontrado." });
        }
    } catch (error) {
        console.error("Error al eliminar dossier:", error);
        res.status(500).json({ error: "Error al eliminar el archivo." });
    }
});

// Serve the dossiers directory directly so they can be viewed
app.use('/dossiers', express.static(DOSSIERS_DIR));

// Start the server
app.listen(PORT, () => {
    console.log(`=============================================================`);
    console.log(` ENAE DOSSIER STUDIO RUNNING AT: http://localhost:${PORT}`);
    console.log(` CMS MANAGER AT: http://localhost:${PORT}/manager.html`);
    console.log(`=============================================================`);
});
