const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads in memory
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));

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

    let prompt = `Eres director de contenidos de ENAE International Business School, Murcia, España.
Genera el dossier del programa académico con las siguientes especificaciones:
- Tipo: ${tipo}
- Nombre: ${nombre}
- Área temática: ${area}
- Duración: ${duracion}
- Modalidad: ${modal}
- Inversión/Precio: ${precio}
- Próxima Convocatoria: ${fecha}
- Notas de enfoque: ${notas}
`;

    if (documentText) {
        prompt += `\nInformación extraída del documento adjunto:\n${documentText.substring(0, 10000)}\n`;
    }

    prompt += `
Responde ÚNICAMENTE con un objeto JSON válido, sin bloques de código markdown, sin introducciones ni comentarios adicionales. El formato del JSON debe ser exactamente:
{
  "descripcion": "3-4 frases describiendo el valor diferencial, rigor e impacto del programa.",
  "dirigido": "3-4 frases detallando el perfil ideal del alumno y requisitos académicos/profesionales.",
  "competencias": ["c1", "c2", "c3", "c4", "c5", "c6"],
  "modulos": [
    {"n": "01", "t": "Nombre del Módulo 1", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "02", "t": "Nombre del Módulo 2", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "03", "t": "Nombre del Módulo 3", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "04", "t": "Nombre del Módulo 4", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "05", "t": "Nombre del Módulo 5", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "06", "t": "Nombre del Módulo 6", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "07", "t": "Nombre del Módulo 7", "s": "Subtema A · Subtema B · Subtema C"},
    {"n": "08", "t": "Nombre del Módulo 8", "s": "Subtema A · Subtema B · Subtema C"}
  ],
  "metodologia": "3-4 frases describiendo la metodología práctica de ENAE (método del caso, simuladores de negocio, proyectos reales y aplicación empresarial).",
  "salidas": ["Cargo 1", "Cargo 2", "Cargo 3", "Cargo 4", "Cargo 5", "Cargo 6", "Cargo 7", "Cargo 8"],
  "cta": "Una frase inspiradora y motivadora invitando al alumno a dar el salto a la excelencia académica junto a nosotros en ENAE."
}`;

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

// Save a dossier (creates a standalone HTML file)
app.post('/api/dossiers', (req, res) => {
    try {
        const dossierData = req.body;
        if (!dossierData.nombre) {
            return res.status(400).json({ error: "Falta el nombre del programa" });
        }

        const fileName = slugify(dossierData.nombre) + '.html';
        const filePath = path.join(DOSSIERS_DIR, fileName);

        // Read template.html
        const templatePath = path.join(__dirname, 'template.html');
        if (!fs.existsSync(templatePath)) {
            return res.status(500).json({ error: "No se encuentra template.html en el servidor." });
        }

        let htmlContent = fs.readFileSync(templatePath, 'utf-8');

        // Inject data into the HTML as a script tag
        const scriptInjection = `<script id="dossier-data" type="application/json">${JSON.stringify(dossierData)}</script>`;
        htmlContent = htmlContent.replace('</head>', `    ${scriptInjection}\n</head>`);

        // Save the file
        fs.writeFileSync(filePath, htmlContent, 'utf-8');

        res.json({ success: true, fileName: fileName, path: `/dossiers/${fileName}` });
    } catch (error) {
        console.error("Error al guardar dossier:", error);
        res.status(500).json({ error: "Error al guardar el archivo." });
    }
});

// List all dossiers
app.get('/api/dossiers', (req, res) => {
    try {
        const files = fs.readdirSync(DOSSIERS_DIR).filter(f => f.endsWith('.html'));
        const dossiers = files.map(file => {
            const filePath = path.join(DOSSIERS_DIR, file);
            const stats = fs.statSync(filePath);
            return {
                fileName: file,
                url: `/dossiers/${file}`,
                createdAt: stats.birthtime,
                updatedAt: stats.mtime
            };
        });

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
