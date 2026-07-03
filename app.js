/* ==========================================================================
   ENAE EXCLUSIVE INTERACTIVE DOSSIER GENERATOR - CONTROLLER
   ========================================================================== */

// --- Official ENAE Inline Logos (Directly from manual specifications) ---
const LOGO_ENAE_POSITIVE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50" width="160" height="36" style="display: block;">
    <g transform="translate(0, 5)">
        <rect width="40" height="40" rx="6" fill="#a91831"/>
        <path d="M12 11h16v5H18v5h9v5h-9v5h10v5H12z" fill="#ffffff"/>
        <!-- Angular slash cut representing ENAE shards -->
        <path d="M24 11l6 6v-6z" fill="#dee5ec"/>
    </g>
    <text x="52" y="27" font-family="var(--font-display)" font-weight="900" font-size="22" fill="#a91831" letter-spacing="-1">ENAE</text>
    <text x="52" y="41" font-family="var(--font-body)" font-weight="700" font-size="8.5" fill="#202221" letter-spacing="1.2">BUSINESS SCHOOL</text>
</svg>
`;

const LOGO_ENAE_NEGATIVE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 50" width="160" height="36" style="display: block;">
    <g transform="translate(0, 5)">
        <rect width="40" height="40" rx="6" fill="#ffffff"/>
        <path d="M12 11h16v5H18v5h9v5h-9v5h10v5H12z" fill="#a91831"/>
        <path d="M24 11l6 6v-6z" fill="#dee5ec"/>
    </g>
    <text x="52" y="27" font-family="var(--font-display)" font-weight="900" font-size="22" fill="#ffffff" letter-spacing="-1">ENAE</text>
    <text x="52" y="41" font-family="var(--font-body)" font-weight="700" font-size="8.5" fill="#dee5ec" letter-spacing="1.2">BUSINESS SCHOOL</text>
</svg>
`;

// --- ENAE Official Shards Brand Pattern (watermark background decor) ---
const ENAE_SHARDS_WATERMARK_SVG = `
<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="enae-shards-watermark top-right">
    <!-- Asymmetrical blocks representing fragmented pieces of letter 'E' in ENAE -->
    <path d="M10 20h30l-15 20H10z" fill="var(--enae-red)" opacity="0.06"/>
    <path d="M50 15h25l-10 12H50z" fill="var(--enae-red)" opacity="0.08"/>
    <path d="M25 50h45l-20 24H25z" fill="var(--enae-red)" opacity="0.05"/>
    <path d="M72 45h20l-8 10H72z" fill="var(--enae-red)" opacity="0.07"/>
</svg>
`;

// --- ENAE Official Sector Placements for Donut Chart ---
const enaeSectorPlacements = [
    { name: "Dirección General y Estrategia", pct: 35, color: "#a91831", desc: "Dirección ejecutiva de negocio, consultoría estratégica y gestión de unidades operativas globales.", partners: "PwC, EY, Grupo Fuertes, El Pozo", salary: "48.000 €" },
    { name: "Finanzas & Control de Gestión", pct: 25, color: "#202221", desc: "Análisis estratégico de inversiones, dirección financiera corporativa y control presupuestario transnacional.", partners: "Banco Sabadell, KPMG, Bankinter", salary: "52.000 €" },
    { name: "Dirección Comercial y Marketing", pct: 25, color: "#404040", desc: "Gestión comercial integral omnicanal, branding y analítica digital de adquisición de clientes.", partners: "Hero España, PC Componentes, L'Oréal", salary: "42.000 €" },
    { name: "Operaciones y AgriTech", pct: 15, color: "#999999", desc: "Logística y cadena de suministro global, integraciones agrícolas tecnológicas y optimización industrial.", partners: "PROEXPORT, Primafrio, Alvalle", salary: "40.000 €" }
];

// --- Predefined High-Quality Professional Templates (Strictly ENAE) ---
const PRESET_TEMPLATES = [
    {
        id: "tpl-emba",
        schoolTheme: "enae",
        curriculumStyle: "accordion", // Classic Accordions
        outcomesStyle: "stats", // Standard metric boxes
        title: "Executive MBA <span class='mixed-title-accent'>(EMBA)</span>",
        subtitle: "Liderazgo Estratégico y <span class='mixed-title-accent'>Dirección</span> Directiva en un Entorno Exponencial",
        academicYear: "2026 / 2027",
        category: "Executive",
        accentColor: "burgundy",
        coverTheme: "dark",
        coverPhoto: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        fontPair: "outfit-inter", // SFUIDisplay + OpenSans
        tagline: "LEAD YOUR FUTURE · ENAE BUSINESS SCHOOL",
        duration: "12 Meses",
        format: "Presencial (Fines de Semana)",
        language: "Español",
        schedule: "Viernes 17:00 a 22:00 | Sábados 9:00 a 14:00",
        introTitle: "El impulso directivo y el <span class='mixed-title-accent'>liderazgo del cambio</span>",
        introText: "El Executive MBA de ENAE Business School está diseñado para profesionales con experiencia que buscan adquirir una visión global de la dirección de empresas, potenciar su capacidad de toma de decisiones y acelerar su desarrollo como líderes estratégicos en un entorno global cambiante.",
        introTextSecondary: "A través de metodologías activas y casos reales, este programa te preparará para afrontar los retos más complejos del ecosistema empresarial global con rigor metodológico y un claustro docente compuesto exclusivamente por directivos y consultores en activo.",
        modules: [
            {
                id: "emba-m1",
                title: "Dirección Estratégica y Entorno Competitivo",
                ects: 8,
                desc: "Análisis del entorno macroeconómico y diseño de ventajas competitivas sostenibles en sectores cambiantes.",
                subjects: [
                    "Análisis de Sectores y Competidores",
                    "Formulación de Estrategias Corporativas",
                    "Gobierno Corporativo y Sostenibilidad",
                    "Simulación de Estrategia Empresarial"
                ]
            },
            {
                id: "emba-m2",
                title: "Finanzas Corporativas y Control de Gestión",
                ects: 10,
                desc: "Herramientas financieras avanzadas para la toma de decisiones directivas y control presupuestario.",
                subjects: [
                    "Contabilidad Directiva e Interpretación de Balances",
                    "Análisis de Inversiones y Valoración de Empresas",
                    "Estrategias de Financiación Internacional",
                    "Cuadro de Mando Integral (Balanced Scorecard)"
                ]
            },
            {
                id: "emba-m3",
                title: "Marketing Estratégico y Comercialización Global",
                ects: 8,
                desc: "Enfoque integrado del comportamiento del consumidor, branding moderno y estrategias omnicanal.",
                subjects: [
                    "Marketing Estratégico y Posicionamiento de Marca",
                    "Gestión Comercial y Negociación de Alto Nivel",
                    "Marketing Digital y Analítica de Clientes",
                    "Internacionalización de Mercados"
                ]
            },
            {
                id: "emba-m4",
                title: "Liderazgo, Gestión del Talento y Operaciones",
                ects: 10,
                desc: "Desarrollo de habilidades directivas clave, liderazgo de equipos de alto rendimiento y excelencia operativa.",
                subjects: [
                    "Habilidades Directivas y Negociación",
                    "Dirección de Operaciones y Cadena de Suministro",
                    "Transformación Digital en Operaciones",
                    "Gestión del Talento y Liderazgo Innovador"
                ]
            }
        ],
        faculty: [
            {
                id: "fac-1",
                name: "Dr. Francisco Martínez-López",
                role: "Catedrático de Marketing y Asesor de Corporaciones",
                bio: "Especialista en Marketing Digital y estrategia minorista multinacional. Autor de más de 10 libros científicos con editoriales premium internacionales.",
                avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80"
            },
            {
                id: "fac-2",
                name: "Ana Cristina Salvador",
                role: "Directora Financiera en Global Tech Iberia",
                bio: "Ex-controller en consultora Big Four y especialista en fusiones y adquisiciones corporativas en el mercado hispanoamericano.",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80"
            },
            {
                id: "fac-3",
                name: "José Luis Navarro",
                role: "Socio Fundador de Nexus Consultores",
                bio: "Ingeniero industrial con más de 20 años optimizando cadenas de suministro globales en Europa y Latam. Mentor de startups.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80"
            }
        ],
        employabilityRate: 96,
        satisfactionRate: 98,
        growthRate: 35,
        testimonials: [
            {
                id: "test-1",
                text: "El EMBA de ENAE supuso un antes y un después en mi carrera. La calidad del claustro y el networking con mis compañeros directivos me dieron las herramientas para ascender a Directora General de mi compañía a los 6 meses de terminar.",
                author: "Mercedes Gómez",
                role: "Directora General en Murciaplast S.A.",
                avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=128&h=128&q=80"
            },
            {
                id: "test-2",
                text: "Una experiencia sumamente exigente pero increíblemente gratificante. No es un máster teórico; cada caso estudiado correspondía a problemas directivos reales del día a día. El simulador estratégico final fue espectacular.",
                author: "Javier Belmonte",
                role: "Director de Operaciones en Alimentos Segura",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80"
            }
        ],
        tuitionFee: 14500,
        installmentMonths: 12,
        scholarshipDiscount: 15,
        reservationFee: 1500,
        coordName: "Dra. Isabel Sánchez",
        coordRole: "Directora Académica EMBA",
        coordEmail: "isabel.sanchez@enae.es",
        coordPhone: "+34 968 899 899",
        coordAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
        id: "tpl-mdm",
        schoolTheme: "enae",
        curriculumStyle: "timeline", // Interactive Journey Timeline
        outcomesStyle: "bento-chart", // Bento Grid + SVG placements donut chart
        title: "Máster en Dirección Comercial y <span class='mixed-title-accent'>Marketing Digital</span>",
        subtitle: "Estrategias de Growth, Omnicanalidad y <span class='mixed-title-accent'>Modelos Predictivos</span> de Adquisición",
        academicYear: "2026 / 2027",
        category: "Máster",
        accentColor: "burgundy",
        coverTheme: "dark",
        coverPhoto: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
        fontPair: "outfit-inter",
        tagline: "LEAD YOUR FUTURE · ENAE BUSINESS SCHOOL",
        duration: "10 Meses",
        format: "Semipresencial e Interactivo",
        language: "Español (Módulos en Inglés)",
        schedule: "Viernes 17:00 a 22:00 | Sábados 9:00 a 14:00",
        introTitle: "Domina el ecosistema <span class='mixed-title-accent'>digital y comercial</span> moderno",
        introText: "El Máster en Dirección Comercial y Marketing Digital de ENAE Business School dota a los perfiles comerciales, directivos y ejecutivos de las herramientas analíticas y tecnológicas óptimas para dirigir campañas omnicanal globales de alto rendimiento.",
        introTextSecondary: "A través del modelo ENAE Active Learning, aprenderás a liderar el crecimiento empresarial mediante laboratorios prácticos de marketing predictivo, embudos avanzados de growth hacking y simulaciones de negociación comercial de alto nivel.",
        modules: [
            {
                id: "mdm-t1",
                title: "Fase 1: Estrategia y Branding Omnicanal",
                ects: 20,
                desc: "Asimilación de bases estratégicas de branding comercial, comportamiento de cliente digital y diseño omnicanal.",
                subjects: [
                    "Estrategia de Branding y Posicionamiento",
                    "Customer Journey & Análisis del Consumidor",
                    "Dirección de Equipos de Venta Modernos",
                    "Modelos y Métodos de Negociación Comercial"
                ]
            },
            {
                id: "mdm-t2",
                title: "Fase 2: Tech, Growth & Analítica Digital",
                ects: 18,
                desc: "Optimización técnica avanzada de embudos de adquisición, automatizaciones comerciales y analítica de datos.",
                subjects: [
                    "Growth Hacking & Adquisición Avanzada",
                    "Google Analytics & Inbound Marketing",
                    "SEO/SEM & Campañas de Pago de Alto Impacto",
                    "CRM, Automatizaciones de Marketing & Big Data"
                ]
            },
            {
                id: "mdm-t3",
                title: "Fase 3: Especialización & Proyecto Internacional",
                ects: 22,
                desc: "Personalización comercial, comercio electrónico transnacional, simuladores y proyecto directivo global.",
                subjects: [
                    "E-commerce Transnacional & Gestión de Stock",
                    "Fintech aplicada a Modelos de Cobro Online",
                    "Derecho Digital, GDPR y Privacidad de Datos",
                    "Proyecto Final de Integración Comercial Directiva"
                ]
            }
        ],
        faculty: [
            {
                id: "iefac-1",
                name: "Dr. Sandeep Sandhu",
                role: "Professor of Practice in Global Strategy",
                bio: "Doctor por la London School of Economics. Ex-socio de McKinsey & Company con 15 años de experiencia asesorando consejos de administración tecnológicos.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
            },
            {
                id: "iefac-2",
                name: "Dra. Maria von Apfel",
                role: "Directora de ENAE Innovation Lab",
                bio: "Autora de 'The Liquid Corporation'. Especialista en integraciones tecnológicas de marketing predictivo y transformaciones de ventas corporativas.",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80"
            }
        ],
        employabilityRate: 98,
        satisfactionRate: 94,
        growthRate: 42,
        testimonials: [
            {
                id: "ietest-1",
                text: "El máster supuso una revolución directiva para mí. Me dio las claves matemáticas de analítica web y comerciales corporativas para asumir la Dirección de Marketing de mi grupo corporativo internacional.",
                author: "Jean-Pierre Blanc",
                role: "Director de Marketing en RetailGroup España",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=128&h=128&q=80"
            }
        ],
        tuitionFee: 11200,
        installmentMonths: 12,
        scholarshipDiscount: 15,
        reservationFee: 1500,
        coordName: "Dra. Isabela Cruz",
        coordRole: "Directora Académica Dirección Comercial",
        coordEmail: "isabela.cruz@enae.es",
        coordPhone: "+34 968 899 899",
        coordAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80"
    },
    {
        id: "tpl-agro",
        schoolTheme: "enae",
        curriculumStyle: "accordion",
        outcomesStyle: "stats",
        title: "Máster en Dirección de <span class='mixed-title-accent'>Agronegocios</span>",
        subtitle: "Gestión Estratégica, Sostenibilidad y <span class='mixed-title-accent'>Cadena Global</span> de Valor Agroalimentario",
        academicYear: "2026 / 2027",
        category: "Máster",
        accentColor: "gold",
        coverTheme: "light",
        coverPhoto: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=1200&q=80",
        fontPair: "outfit-inter",
        tagline: "LEAD YOUR FUTURE · ENAE BUSINESS SCHOOL",
        duration: "11 Meses",
        format: "Semipresencial / Executive",
        language: "Español",
        schedule: "Viernes 16:30 a 21:30 | Sábados 9:00 a 14:00",
        introTitle: "Lidera la agroexportación y la <span class='mixed-title-accent'>sostenibilidad alimentaria</span>",
        introText: "Ubicados en la huerta de Europa, ENAE Business School ofrece este Máster altamente especializado para capacitar a los futuros gerentes, exportadores y directores operativos del sector agrícola y agroindustrial internacional, aunando sostenibilidad técnica y viabilidad financiera.",
        introTextSecondary: "Estudiarás la cadena de suministro agroalimentaria de cabo a rabo, abordando las nuevas tecnologías agrícolas (AgriTech), el derecho alimentario internacional, y las estrategias críticas de comercialización en mercados exigentes como los de la UE, Asia y América.",
        modules: [
            {
                id: "agro-m1",
                title: "Mercados Agroalimentarios Globales y Finanzas",
                ects: 8,
                desc: "Análisis de la balanza exportadora mundial, cadenas globales de valor y control de costes agrícolas.",
                subjects: [
                    "Economía de los Recursos Naturales",
                    "Política Agrícola Común (PAC) y Normativa",
                    "Análisis Financiero de Proyectos Agropecuarios",
                    "Comercio Exterior y Contratos Agrarios"
                ]
            },
            {
                id: "agro-m2",
                title: "Tecnología, Sostenibilidad y Cadena de Suministro",
                ects: 10,
                desc: "Innovación aplicada al campo, digitalización de cosechas, trazabilidad y logística de frescos en frío.",
                subjects: [
                    "AgriTech e Internet de las Cosas (IoT) en el Campo",
                    "Gestión Sostenible del Agua y Huella de Carbono",
                    "Logística y Cadena de Frío Agroalimentaria",
                    "Seguridad Alimentaria y Certificaciones (GlobalGAP, IFS)"
                ]
            },
            {
                id: "agro-m3",
                title: "Dirección de Marketing y Ventas en el Sector Hortofrutícola",
                ects: 8,
                desc: "Branding de alimentos, negociación con la gran distribución (retailers) e innovación de packaging.",
                subjects: [
                    "Marketing de Frutas y Hortalizas",
                    "Estrategias de Negociación con Cadenas de Distribución",
                    "Packaging, Ecodiseño y Consumidor Consciente",
                    "E-commerce de Productos Frescos y Gourmet"
                ]
            }
        ],
        faculty: [
            {
                id: "agrofac-1",
                name: "Manuel Rosique",
                role: "Director General de la Asociación de Productores Exportadores (PROEXPORT)",
                bio: "Más de 25 años representando el sector de las exportaciones hortofrutícolas españolas ante Bruselas y mercados internacionales.",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80"
            },
            {
                id: "agrofac-2",
                name: "Dra. Carmen Cánovas",
                role: "Investigadora Principal en Biotecnología Alimentaria - IMIDA",
                bio: "Doctora en ciencias agroalimentarias, especialista en conservación post-cosecha y desarrollo de alimentos funcionales ecológicos.",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80"
            }
        ],
        employabilityRate: 98,
        satisfactionRate: 95,
        growthRate: 28,
        testimonials: [
            {
                id: "agrotest-1",
                text: "Hacer este máster fue clave para convertirme en Director de Exportación en mi cooperativa. ENAE está en el epicentro de la agroexportación, y los profesores son los propios directores de las grandes empresas del sector.",
                author: "Pedro Martínez Rueda",
                role: "Director de Exportación en Cooperativa Frutera Sur",
                avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=128&h=128&q=80"
            }
        ],
        tuitionFee: 9200,
        installmentMonths: 10,
        scholarshipDiscount: 10,
        reservationFee: 900,
        coordName: "Dr. Carlos García",
        coordRole: "Director Académico de Agronegocios",
        coordEmail: "carlos.garcia@enae.es",
        coordPhone: "+34 968 899 700",
        coordAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=128&h=128&q=80"
    }
];

// --- Application State ---
let state = {
    dossiers: [], // List of user custom dossiers
    currentDossier: null, // The active dossier being edited
    activeView: "dashboard", // "dashboard" | "builder"
    activePreviewMode: "desktop", // "desktop" | "mobile" | "pdf"
    activeEditorTab: "design" // "design" | "content"
};

// --- ENAE Interactive Components Local State ---
let activeTimelineStage = 0; // Tracks chronological stages clickable inside preview
let activeSectorIndex = 0; // Tracks SVG placements donut selection inside preview

// --- Initialization & LocalStorage ---
async function initApp() {
    const saved = localStorage.getItem("enae_dossiers");
    if (saved) {
        try {
            state.dossiers = JSON.parse(saved);
            // Sanitize loaded dossiers to ensure they have an ID and required fields
            state.dossiers = state.dossiers.map(d => {
                if (!d.id) d.id = "dos-" + Date.now() + "-" + Math.floor(Math.random()*1000);
                d.title = d.title || d.nombre || "Dossier Sin Título";
                d.category = d.category || "Programa";
                d.subtitle = d.subtitle || "";
                return d;
            });
        } catch (e) {
            console.error("Error loading saved dossiers, resetting.", e);
            state.dossiers = [];
        }
    } else {
        state.dossiers = JSON.parse(JSON.stringify(PRESET_TEMPLATES));
        saveStateToLocalStorage();
    }

    try {
        const res = await fetch('http://localhost:3000/api/dossiers');
        if (res.ok) {
            const data = await res.json();
            let newDossiersAdded = false;
            
            for (const file of data) {
                try {
                    const htmlRes = await fetch('http://localhost:3000' + file.url);
                    const htmlText = await htmlRes.text();
                    // extract JSON payload
                    const match = htmlText.match(/<script id="dossier-data" type="application\/json">([\s\S]*?)<\/script>/);
                    if (match && match[1]) {
                        const dossierData = JSON.parse(match[1]);
                        
                        // Assign ID if missing (critical for dashboard render)
                        if (!dossierData.id) {
                            dossierData.id = "gen-" + Date.now() + "-" + Math.floor(Math.random()*1000);
                        }
                        
                        // Ensure it has required fields for dashboard
                        dossierData.category = dossierData.category || "Máster";
                        dossierData.subtitle = dossierData.subtitle || "";
                        dossierData.title = dossierData.title || dossierData.nombre || "Dossier Sin Título";

                        // Check if it already exists by ID or title
                        const existsIndex = state.dossiers.findIndex(d => (d.id === dossierData.id) || (d.title === dossierData.title));
                        if (existsIndex === -1) {
                            state.dossiers.unshift(dossierData); // Add generated to the top
                            newDossiersAdded = true;
                        }
                    }
                } catch(err) {
                    console.error("Error fetching dossier file:", file.fileName, err);
                }
            }
            if (newDossiersAdded) {
                saveStateToLocalStorage();
            }
        }
    } catch(err) {
        console.error("Error fetching from /api/dossiers", err);
    }

    setupGlobalEventListeners();
    checkUrlHashForSharedDossier();
    renderView();
}

function saveStateToLocalStorage() {
    localStorage.setItem("enae_dossiers", JSON.stringify(state.dossiers));
}

// --- Navigation & Routing ---
function navigateTo(viewName, dossierId = null) {
    state.activeView = viewName;
    if (viewName === "builder" && dossierId) {
        const found = state.dossiers.find(d => d.id === dossierId);
        if (found) {
            state.currentDossier = JSON.parse(JSON.stringify(found));
        } else {
            const preset = PRESET_TEMPLATES.find(d => d.id === dossierId);
            if (preset) {
                const cloned = JSON.parse(JSON.stringify(preset));
                cloned.id = "dos-" + Date.now();
                cloned.title = "Copia de " + cloned.title;
                state.dossiers.push(cloned);
                saveStateToLocalStorage();
                state.currentDossier = cloned;
            }
        }
        activeTimelineStage = 0;
        activeSectorIndex = 0;
    } else if (viewName === "dashboard") {
        state.currentDossier = null;
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
    
    renderView();
}

// --- Global Event Handlers ---
function setupGlobalEventListeners() {
    window.addEventListener("hashchange", checkUrlHashForSharedDossier);

    document.querySelectorAll(".modal-close-btn, .close-modal").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
        });
    });

    document.body.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;
        const arg = btn.dataset.arg;

        switch (action) {
            case "nav-dashboard":
                navigateTo("dashboard");
                break;
            case "create-blank":
                createNewBlankDossier();
                break;
            case "open-dossier":
                navigateTo("builder", arg);
                break;
            case "delete-dossier":
                e.stopPropagation();
                deleteDossier(arg);
                break;
            case "clone-dossier":
                e.stopPropagation();
                cloneDossier(arg);
                break;
            case "save-dossier":
                saveCurrentDossierEdits();
                break;
            case "set-preview-mode":
                setPreviewDeviceMode(arg);
                break;
            case "export-json":
                exportCurrentDossierJson();
                break;
            case "import-json-btn":
                document.getElementById("import-file-input").click();
                break;
            case "trigger-share":
                openShareModal();
                break;
            case "copy-share-link":
                copyShareLink();
                break;
            case "download-pdf":
                triggerPdfDownload();
                break;
        }
    });

    const fileInput = document.getElementById("import-file-input");
    if (fileInput) {
        fileInput.addEventListener("change", handleJsonImport);
    }
}

// --- Core Operations ---
function createNewBlankDossier() {
    const blankDossier = {
        id: "dos-" + Date.now(),
        schoolTheme: "enae",
        curriculumStyle: "accordion",
        outcomesStyle: "stats",
        title: "Nuevo Dossier <span class='mixed-title-accent'>Académico</span> ENAE",
        subtitle: "Subtítulo elegante del <span class='mixed-title-accent'>programa de dirección</span>",
        academicYear: "2026 / 2027",
        category: "Máster",
        accentColor: "burgundy",
        coverTheme: "dark",
        coverPhoto: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        fontPair: "outfit-inter",
        tagline: "LEAD YOUR FUTURE · ENAE BUSINESS SCHOOL",
        duration: "9 Meses",
        format: "Presencial",
        language: "Español",
        schedule: "Viernes tarde y Sábados mañana",
        introTitle: "Presentación del <span class='mixed-title-accent'>Programa Directivo</span>",
        introText: "Describe en un párrafo la misión y propuesta de valor de este programa académico para los alumnos. Qué van a conseguir y por qué es una titulación de prestigio.",
        introTextSecondary: "Completa la presentación con más detalles sobre metodologías innovadoras, la visión directiva y las habilidades prácticas que asimilarán a lo largo del curso.",
        modules: [
            {
                id: "mod-1",
                title: "Módulo I: Fundamentos y Estrategia Inicial",
                ects: 6,
                desc: "Breve resumen introductorio sobre lo que comprende el primer módulo de asignaturas.",
                subjects: ["Introducción al sector", "Metodologías de análisis", "Casos de negocio I"]
            }
        ],
        faculty: [
            {
                id: "fac-new",
                name: "Profesor Coordinador",
                role: "Director de Programa en ENAE",
                bio: "Perfil profesional premium con amplia experiencia en dirección ejecutiva y consultoría internacional.",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
            }
        ],
        employabilityRate: 95,
        satisfactionRate: 93,
        growthRate: 20,
        testimonials: [
            {
                id: "test-new",
                text: "Estudiar en ENAE Business School me proporcionó una red de contactos única y un marco conceptual sumamente práctico para resolver los retos reales de mi negocio.",
                author: "Alumno ENAE Alumni",
                role: "Responsable de Departamento",
                avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80"
            }
        ],
        tuitionFee: 8500,
        installmentMonths: 10,
        scholarshipDiscount: 10,
        reservationFee: 1000,
        coordName: "Coordinador Académico",
        coordRole: "Director Académico ENAE",
        coordEmail: "info@enae.es",
        coordPhone: "+34 968 899 899",
        coordAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80"
    };

    state.dossiers.unshift(blankDossier);
    saveStateToLocalStorage();
    navigateTo("builder", blankDossier.id);
}

function cloneDossier(id) {
    const found = state.dossiers.find(d => d.id === id);
    if (!found) return;

    const cloned = JSON.parse(JSON.stringify(found));
    cloned.id = "dos-" + Date.now();
    cloned.title = "Copia de " + cloned.title;
    
    const index = state.dossiers.findIndex(d => d.id === id);
    state.dossiers.splice(index + 1, 0, cloned);
    
    saveStateToLocalStorage();
    renderView();
}

function deleteDossier(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este dossier de forma permanente?")) return;

    state.dossiers = state.dossiers.filter(d => d.id !== id);
    saveStateToLocalStorage();
    renderView();
}

function saveCurrentDossierEdits() {
    if (!state.currentDossier) return;

    const index = state.dossiers.findIndex(d => d.id === state.currentDossier.id);
    if (index !== -1) {
        state.dossiers[index] = JSON.parse(JSON.stringify(state.currentDossier));
    } else {
        state.dossiers.unshift(JSON.parse(JSON.stringify(state.currentDossier)));
    }
    
    saveStateToLocalStorage();
    showAppToast("¡Dossier guardado con éxito!");
}

function setPreviewDeviceMode(mode) {
    state.activePreviewMode = mode;
    
    const viewport = document.getElementById("preview-viewport");
    viewport.className = "preview-viewport mode-" + mode;

    document.querySelectorAll(".device-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.arg === mode);
    });

    if (mode === "pdf") {
        showAppToast("Formato A4 optimizado para descarga PDF.");
    }
}

// --- Dynamic Toast UI ---
function showAppToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.position = "fixed";
        container.style.bottom = "24px";
        container.style.right = "24px";
        container.style.zIndex = "999";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "8px";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.style.background = "linear-gradient(135deg, #1E232A, #12161A)";
    toast.style.color = "white";
    toast.style.padding = "12px 24px";
    toast.style.borderRadius = "8px";
    toast.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(169, 24, 49, 0.4)";
    toast.style.fontFamily = "var(--font-body)";
    toast.style.fontSize = "0.9rem";
    toast.style.fontWeight = "600";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";

    toast.innerHTML = `<span style="color: #a91831;">✦</span> ${message}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    }, 10);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Import & Export JSON ---
function exportCurrentDossierJson() {
    if (!state.currentDossier) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.currentDossier, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Dossier_ENAE_${state.currentDossier.title.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showAppToast("Archivo JSON exportado correctamente.");
}

function handleJsonImport(e) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const imported = JSON.parse(event.target.result);
            if (!imported.title || !imported.modules || !imported.faculty) {
                alert("El archivo JSON no tiene el formato de dossier válido.");
                return;
            }

            imported.id = "dos-" + Date.now();
            imported.schoolTheme = "enae"; // Force ENAE
            imported.curriculumStyle = imported.curriculumStyle || "accordion";
            imported.outcomesStyle = imported.outcomesStyle || "stats";
            imported.title = "[Importado] " + imported.title;
            state.dossiers.unshift(imported);
            saveStateToLocalStorage();
            renderView();
            showAppToast("¡Dossier importado correctamente!");
        } catch (err) {
            alert("Error al procesar el archivo JSON: " + err.message);
        }
    };
    fileReader.readAsText(e.target.files[0]);
}

// --- Share Hash logic ---
function openShareModal() {
    if (!state.currentDossier) return;
    saveCurrentDossierEdits();

    const overlay = document.getElementById("share-modal-overlay");
    const linkInput = document.getElementById("share-link-input");

    const stringified = JSON.stringify(state.currentDossier);
    const base64Payload = btoa(unescape(encodeURIComponent(stringified)));

    const shareableUrl = `${window.location.origin}${window.location.pathname}#shared=${base64Payload}`;
    linkInput.value = shareableUrl;

    overlay.classList.add("active");
}

function copyShareLink() {
    const linkInput = document.getElementById("share-link-input");
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(linkInput.value)
        .then(() => {
            showAppToast("¡Enlace copiado al portapapeles!");
            document.getElementById("share-modal-overlay").classList.remove("active");
        })
        .catch(err => {
            alert("No se pudo copiar el enlace: " + err);
        });
}

function checkUrlHashForSharedDossier() {
    const hash = window.location.hash;
    if (hash.startsWith("#shared=")) {
        const base64Payload = hash.substring(8);
        try {
            const decodedString = decodeURIComponent(escape(atob(base64Payload)));
            const sharedDossier = JSON.parse(decodedString);

            sharedDossier.id = "shared-" + Date.now();
            sharedDossier.schoolTheme = "enae";
            sharedDossier.curriculumStyle = sharedDossier.curriculumStyle || "accordion";
            sharedDossier.outcomesStyle = sharedDossier.outcomesStyle || "stats";
            
            const exists = state.dossiers.some(d => d.title === sharedDossier.title && d.tuitionFee === sharedDossier.tuitionFee);
            if (!exists) {
                state.dossiers.unshift(sharedDossier);
                saveStateToLocalStorage();
            }

            state.activeView = "builder";
            state.currentDossier = sharedDossier;
            showAppToast("¡Dossier compartido cargado con éxito!");
        } catch (e) {
            console.error("Error decoding shared dossier payload", e);
            alert("El enlace compartido está corrupto o es incompleto.");
        }
    }
}

// --- PDF Print Trigger ---
function triggerPdfDownload() {
    showAppToast("Preparando dossier para impresión...");
    setTimeout(() => {
        window.print();
    }, 500);
}

// ==========================================================================
// RENDER CONTROLLER (MAIN TEMPLATERS)
// ==========================================================================
function renderView() {
    const root = document.getElementById("app-root");
    if (!root) return;

    if (state.activeView === "dashboard") {
        renderDashboard(root);
    } else if (state.activeView === "builder") {
        renderBuilder(root);
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// --- Dashboard HTML Builder ---
function renderDashboard(root) {
    let savedListHtml = "";
    if (state.dossiers.length === 0) {
        savedListHtml = `
            <div class="empty-state">
                <i data-lucide="folder-open" class="empty-state-icon"></i>
                <h4>No hay dossiers creados aún</h4>
                <p>Crea tu primer dossier utilizando uno de nuestros presets o empieza uno en blanco.</p>
                <button class="btn btn-primary" data-action="create-blank">
                    <i data-lucide="plus"></i> Empezar en Blanco
                </button>
            </div>
        `;
    } else {
        state.dossiers.forEach(dos => {
            const dateStr = new Date(parseInt(dos.id.split('-')[1]) || Date.now()).toLocaleDateString('es-ES', {
                year: 'numeric', month: 'short', day: 'numeric'
            });

            savedListHtml += `
                <div class="template-card saved-card">
                    <div class="saved-thumbnail" style="border-top: 4px solid var(--enae-red);">
                        <span class="dossier-tag">${dos.category}</span>
                        <h5 class="mixed-title">${dos.title}</h5>
                        <span>Creado: ${dateStr}</span>
                    </div>
                    <div class="template-card-body" style="padding: 16px;">
                        <p style="margin-bottom: 12px; font-size: 0.8rem; height: 36px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            ${dos.subtitle.replace(/<\/?[^>]+(>|$)/g, "") || "Sin descripción"}
                        </p>
                        <div class="saved-actions">
                            <button class="btn btn-secondary btn-icon-only" data-action="open-dossier" data-arg="${dos.id}" title="Editar Dossier">
                                <i data-lucide="edit-3" style="width: 16px; height: 16px;"></i>
                            </button>
                            <button class="btn btn-secondary btn-icon-only" data-action="clone-dossier" data-arg="${dos.id}" title="Duplicar">
                                <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
                            </button>
                            <button class="btn btn-danger btn-icon-only" data-action="delete-dossier" data-arg="${dos.id}" title="Eliminar Permanentemente">
                                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    let presetsHtml = "";
    PRESET_TEMPLATES.forEach(preset => {
        let themeClass = "";
        let themeIcon = "award";
        if (preset.id === "tpl-agro") {
            themeClass = "theme-agro";
            themeIcon = "leaf";
        } else if (preset.id === "tpl-mdm") {
            themeClass = "theme-tech";
            themeIcon = "sparkles";
        }

        presetsHtml += `
            <div class="template-card ${themeClass}" data-action="open-dossier" data-arg="${preset.id}">
                <div class="template-badge-bar">
                    <div class="template-badge-icon">
                        <i data-lucide="${themeIcon}" style="width: 48px; height: 48px; stroke-width: 1.5;"></i>
                    </div>
                </div>
                <div class="template-card-body">
                    <h4 class="mixed-title">${preset.title}</h4>
                    <p>${preset.subtitle.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                    <div class="template-meta">
                        <span>ENAE Business School</span>
                        <span style="color: var(--enae-red); font-weight: 700;">Usar Plantilla ➔</span>
                    </div>
                </div>
            </div>
        `;
    });

    root.innerHTML = `
        <header class="app-header">
            <div class="logo-container">
                <!-- ENAE Official logo negative SVG loaded directly into Header -->
                ${LOGO_ENAE_NEGATIVE_SVG}
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary" data-action="import-json-btn">
                    <i data-lucide="upload"></i> Importar Dossier (.json)
                </button>
                <button class="btn btn-primary" data-action="create-blank">
                    <i data-lucide="plus"></i> Crear Nuevo Dossier
                </button>
                <input type="file" id="import-file-input" accept=".json" style="display: none;" />
            </div>
        </header>

        <main class="main-content">
            <div class="dashboard-view">
                <div class="welcome-banner" style="background: linear-gradient(135deg, rgba(32, 34, 33, 0.95) 0%, rgba(15, 18, 21, 0.98) 100%), radial-gradient(circle at top right, rgba(169, 24, 49, 0.25), transparent 400px);">
                    <h2>Generador de Dossiers Académicos Interactivos ENAE</h2>
                    <p>Diseña catálogos corporativos interactivos alineados al **Manual de Identidad Oficial de ENAE Business School** (utilizando el Rojo Granate corporativo <code>#a91831</code>, tipografía editorial mixta didone y fuentes Open Sans locales).</p>
                    <button class="btn btn-accent" data-action="create-blank">
                        <i data-lucide="sparkles"></i> Diseñar desde Cero
                    </button>
                </div>

                <div class="dashboard-section">
                    <div class="section-header-row">
                        <h3>Tus Dossiers Creados</h3>
                    </div>
                    <div class="saved-grid">
                        ${savedListHtml}
                    </div>
                </div>

                <div class="dashboard-section">
                    <div class="section-header-row">
                        <h3>Plantillas Recomendadas (ENAE)</h3>
                    </div>
                    <div class="template-grid">
                        ${presetsHtml}
                    </div>
                </div>
            </div>
        </main>
    `;
}

// --- Builder HTML Layout ---
function renderBuilder(root) {
    if (!state.currentDossier) return;

    const d = state.currentDossier;

    root.innerHTML = `
        <header class="app-header">
            <div class="logo-container" style="cursor: pointer;" data-action="nav-dashboard">
                ${LOGO_ENAE_NEGATIVE_SVG}
            </div>
            <div class="header-actions">
                <button class="btn btn-secondary" data-action="nav-dashboard">
                    <i data-lucide="chevron-left"></i> Volver a Panel
                </button>
                <button class="btn btn-secondary" data-action="export-json">
                    <i data-lucide="download"></i> Exportar JSON
                </button>
                <button class="btn btn-accent" data-action="trigger-share">
                    <i data-lucide="share-2"></i> Generar Enlace
                </button>
                <button class="btn btn-primary" data-action="save-dossier" style="background-color: var(--enae-red)">
                    <i data-lucide="save"></i> Guardar Cambios
                </button>
            </div>
        </header>

        <div class="main-content workspace-view">
            <aside class="editor-sidebar school-enae">
                <div class="editor-tabs">
                    <button class="editor-tab-btn ${state.activeEditorTab === 'design' ? 'active' : ''}" onclick="switchEditorTab('design')">
                        <i data-lucide="palette" style="width: 16px; height: 16px;"></i> Identidad
                    </button>
                    <button class="editor-tab-btn ${state.activeEditorTab === 'content' ? 'active' : ''}" onclick="switchEditorTab('content')">
                        <i data-lucide="align-left" style="width: 16px; height: 16px;"></i> Contenido
                    </button>
                </div>
                <div class="editor-scroll-area" id="editor-inputs-panel"></div>
            </aside>

            <main class="preview-canvas">
                <div class="canvas-toolbar">
                    <div class="toolbar-group">
                        <div class="device-selector">
                            <button class="device-btn ${state.activePreviewMode === 'desktop' ? 'active' : ''}" data-action="set-preview-mode" data-arg="desktop" title="Vista Escritorio Stack A4">
                                <i data-lucide="monitor" style="width: 14px; height: 14px;"></i> Escritorio
                            </button>
                            <button class="device-btn ${state.activePreviewMode === 'mobile' ? 'active' : ''}" data-action="set-preview-mode" data-arg="mobile" title="Vista Teléfono Móvil">
                                <i data-lucide="smartphone" style="width: 14px; height: 14px;"></i> Móvil
                            </button>
                            <button class="device-btn ${state.activePreviewMode === 'pdf' ? 'active' : ''}" data-action="set-preview-mode" data-arg="pdf" title="Optimizar Layout de PDF">
                                <i data-lucide="file-text" style="width: 14px; height: 14px;"></i> Formato A4
                            </button>
                        </div>
                    </div>
                    <div class="toolbar-group">
                        <button class="btn btn-secondary btn-icon-only" data-action="download-pdf" title="Imprimir o guardar PDF A4">
                            <i data-lucide="printer" style="width: 16px; height: 16px; margin-right: 4px;"></i> Imprimir PDF
                        </button>
                    </div>
                </div>
                
                <div class="preview-viewport mode-${state.activePreviewMode}" id="preview-viewport">
                    <div class="viewport-container" id="dossier-preview-mount"></div>
                </div>
            </main>
        </div>

        <div class="modal-overlay" id="share-modal-overlay">
            <div class="modal-box">
                <div class="modal-header">
                    <h3>¡Dossier Interactivo Listo!</h3>
                    <button class="modal-close-btn"><i data-lucide="x"></i></button>
                </div>
                <div class="modal-body">
                    <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
                        Toda la información de tu dossier se ha codificado en el enlace. No se requiere servidor de bases de datos. Envía este enlace a tus alumnos o compañeros para que lo visualicen de inmediato.
                    </p>
                    <div class="share-link-box">
                        <input type="text" id="share-link-input" readonly value="" />
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-secondary close-modal">Cerrar</button>
                    <button class="btn btn-primary" data-action="copy-share-link" style="background-color: var(--enae-red)">
                        <i data-lucide="clipboard"></i> Copiar Enlace
                    </button>
                </div>
            </div>
        </div>
    `;

    renderEditorPanelInputs();
    renderDossierHighFidelity();
}

window.switchEditorTab = function(tabName) {
    state.activeEditorTab = tabName;
    renderBuilder(document.getElementById("app-root"));
};

// --- Left Panel Form Input Generator ---
function renderEditorPanelInputs() {
    const container = document.getElementById("editor-inputs-panel");
    if (!container || !state.currentDossier) return;

    const d = state.currentDossier;
    let html = "";

    if (state.activeEditorTab === "design") {
        html = `
            <!-- IDENTIDAD Y MARCA -->
            <div class="editor-section open" id="editor-sec-brand">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-brand')">
                    <h4><i data-lucide="palette"></i> Identidad y Componentes</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <!-- Visual Component Layout selectors instead of brand selectors! -->
                    <div class="form-group">
                        <label class="form-label">Plan de Estudios (Curriculum)</label>
                        <select class="form-control" onchange="updateThemeConfig('curriculumStyle', this.value)">
                            <option value="accordion" ${d.curriculumStyle === 'accordion' ? 'selected' : ''}>Acordeones Clásicos</option>
                            <option value="timeline" ${d.curriculumStyle === 'timeline' ? 'selected' : ''}>Ruta / Línea de Tiempo Horizontal</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Bloque de Empleabilidad</label>
                        <select class="form-control" onchange="updateThemeConfig('outcomesStyle', this.value)">
                            <option value="stats" ${d.outcomesStyle === 'stats' ? 'selected' : ''}>Métricas Planas (3 cajas)</option>
                            <option value="bento-chart" ${d.outcomesStyle === 'bento-chart' ? 'selected' : ''}>Diseño Bento Grid + SVG Circular</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Tema de Colores</label>
                        <div class="theme-picker">
                            <div class="theme-opt ${d.accentColor === 'burgundy' ? 'active' : ''}" onclick="updateThemeConfig('accentColor', 'burgundy')">
                                <div class="theme-opt-color" style="background-color: var(--enae-red)"></div>
                                Granate ENAE
                            </div>
                            <div class="theme-opt ${d.accentColor === 'gold' ? 'active' : ''}" onclick="updateThemeConfig('accentColor', 'gold')">
                                <div class="theme-opt-color" style="background-color: var(--enae-azul-gris)"></div>
                                Azul Gris
                            </div>
                            <div class="theme-opt ${d.accentColor === 'navy' ? 'active' : ''}" onclick="updateThemeConfig('accentColor', 'navy')">
                                <div class="theme-opt-color" style="background-color: var(--enae-negro)"></div>
                                Negro ENAE
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Diseño de la Portada</label>
                        <select class="form-control" onchange="updateThemeConfig('coverTheme', this.value)">
                            <option value="dark" ${d.coverTheme === 'dark' ? 'selected' : ''}>Oscuro Premium (Imagen de fondo)</option>
                            <option value="light" ${d.coverTheme === 'light' ? 'selected' : ''}>Limpio y Claro (Fondo blanco)</option>
                            <option value="burgundy" ${d.coverTheme === 'burgundy' ? 'selected' : ''}>Corporativo Pleno (Granate sólido)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">URL de Imagen Portada</label>
                        <input type="text" class="form-control" value="${escapeHtml(d.coverPhoto)}" oninput="updateThemeConfig('coverPhoto', this.value)" placeholder="Unsplash URL" />
                    </div>

                    <div class="form-group">
                        <label class="form-label">Tipografía del Documento</label>
                        <select class="form-control" onchange="updateThemeConfig('fontPair', this.value)">
                            <option value="outfit-inter" ${d.fontPair === 'outfit-inter' ? 'selected' : ''}>Outfit / Playfair Editorial + Open Sans</option>
                            <option value="inter-inter" ${d.fontPair === 'inter-inter' ? 'selected' : ''}>Open Sans total (Corporativo Técnico)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- PORTADA Y TEXTOS -->
            <div class="editor-section" id="editor-sec-cover">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-cover')">
                    <h4><i data-lucide="layout"></i> Portada e Hitos</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="form-group">
                        <label class="form-label">Título del Máster / Programa</label>
                        <textarea class="form-control" oninput="updateThemeConfig('title', this.value)" style="min-height: 60px;">${escapeHtml(d.title)}</textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Subtítulo Descriptivo</label>
                        <textarea class="form-control" oninput="updateThemeConfig('subtitle', this.value)" style="min-height: 80px;">${escapeHtml(d.subtitle)}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Año Académico</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.academicYear)}" oninput="updateThemeConfig('academicYear', this.value)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Categoría del Curso</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.category)}" oninput="updateThemeConfig('category', this.value)" placeholder="Máster, Executive..." />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Eslogan / Tagline Corporativo</label>
                        <input type="text" class="form-control" value="${escapeHtml(d.tagline)}" oninput="updateThemeConfig('tagline', this.value)" />
                    </div>
                </div>
            </div>
        `;
    } else {
        html = `
            <!-- PRESENTACIÓN Y CARACTERÍSTICAS -->
            <div class="editor-section open" id="editor-sec-intro">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-intro')">
                    <h4><i data-lucide="info"></i> Presentación General</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="form-group">
                        <label class="form-label">Gran Título Introductorio</label>
                        <input type="text" class="form-control" value="${escapeHtml(d.introTitle)}" oninput="updateThemeConfig('introTitle', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Párrafo Principal (Destacado)</label>
                        <textarea class="form-control" oninput="updateThemeConfig('introText', this.value)" style="min-height: 100px;">${escapeHtml(d.introText)}</textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Párrafo Secundario</label>
                        <textarea class="form-control" oninput="updateThemeConfig('introTextSecondary', this.value)" style="min-height: 100px;">${escapeHtml(d.introTextSecondary)}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Duración</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.duration)}" oninput="updateThemeConfig('duration', this.value)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Formato</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.format)}" oninput="updateThemeConfig('format', this.value)" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Idioma</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.language)}" oninput="updateThemeConfig('language', this.value)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Horarios</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.schedule)}" oninput="updateThemeConfig('schedule', this.value)" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- PLAN DE ESTUDIOS -->
            <div class="editor-section" id="editor-sec-curriculum">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-curriculum')">
                    <h4><i data-lucide="book-open"></i> ${d.curriculumStyle === 'timeline' ? 'Fases / Términos cronológicos' : 'Plan de Estudios'} (${d.modules.length})</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="list-manager" id="modules-list-manager">
                        ${generateModulesManagerHtml(d.modules)}
                    </div>
                    <button class="add-item-btn" onclick="addModuleToDossier()">
                        <i data-lucide="plus"></i> Añadir ${d.curriculumStyle === 'timeline' ? 'Fase' : 'Módulo'}
                    </button>
                </div>
            </div>

            <!-- CLAUSTRO DE PROFESORES -->
            <div class="editor-section" id="editor-sec-faculty">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-faculty')">
                    <h4><i data-lucide="users"></i> Claustro Docente (${d.faculty.length})</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="list-manager" id="faculty-list-manager">
                        ${generateFacultyManagerHtml(d.faculty)}
                    </div>
                    <button class="add-item-btn" onclick="addFacultyToDossier()">
                        <i data-lucide="plus"></i> Añadir Profesor
                    </button>
                </div>
            </div>

            <!-- SALIDAS Y EMPLEABILIDAD -->
            <div class="editor-section" id="editor-sec-outcomes">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-outcomes')">
                    <h4><i data-lucide="trending-up"></i> Empleabilidad e Impacto</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Tasa de Empleo (%)</label>
                            <input type="number" class="form-control" min="50" max="100" value="${d.employabilityRate}" oninput="updateThemeConfig('employabilityRate', parseInt(this.value) || 95)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Satisfacción (%)</label>
                            <input type="number" class="form-control" min="50" max="100" value="${d.satisfactionRate}" oninput="updateThemeConfig('satisfactionRate', parseInt(this.value) || 90)" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Crecimiento Salarial (%)</label>
                        <input type="number" class="form-control" min="0" max="100" value="${d.growthRate}" oninput="updateThemeConfig('growthRate', parseInt(this.value) || 20)" />
                    </div>

                    <label class="form-label" style="margin-top: 20px; display: block;">Testimonios de Alumnos</label>
                    <div class="list-manager" id="testimonials-list-manager">
                        ${generateTestimonialsManagerHtml(d.testimonials)}
                    </div>
                    <button class="add-item-btn" onclick="addTestimonialToDossier()">
                        <i data-lucide="plus"></i> Añadir Testimonio
                    </button>
                </div>
            </div>

            <!-- PRECIO Y MATRÍCULA -->
            <div class="editor-section" id="editor-sec-finance">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-finance')">
                    <h4><i data-lucide="credit-card"></i> Financiamiento y Becas</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Matrícula General (€)</label>
                            <input type="number" class="form-control" min="0" value="${d.tuitionFee}" oninput="updateThemeConfig('tuitionFee', parseInt(this.value) || 0)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Reserva de Plaza (€)</label>
                            <input type="number" class="form-control" min="0" value="${d.reservationFee}" oninput="updateThemeConfig('reservationFee', parseInt(this.value) || 0)" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Meses para Cuotas</label>
                        <select class="form-control" onchange="updateThemeConfig('installmentMonths', parseInt(this.value) || 12)">
                            <option value="6" ${d.installmentMonths === 6 ? 'selected' : ''}>6 Meses</option>
                            <option value="10" ${d.installmentMonths === 10 ? 'selected' : ''}>10 Meses</option>
                            <option value="12" ${d.installmentMonths === 12 ? 'selected' : ''}>12 Meses</option>
                            <option value="18" ${d.installmentMonths === 18 ? 'selected' : ''}>18 Meses</option>
                            <option value="24" ${d.installmentMonths === 24 ? 'selected' : ''}>24 Meses</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Descuento de Beca Simulada</label>
                        <div class="slider-container">
                            <input type="range" min="0" max="50" step="5" value="${d.scholarshipDiscount}" oninput="updateScholarshipSlider(this.value)" />
                            <span class="slider-val" id="val-scholarship">${d.scholarshipDiscount}%</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CONTACTO -->
            <div class="editor-section" id="editor-sec-contact">
                <div class="editor-section-header" onclick="toggleEditorSection('editor-sec-contact')">
                    <h4><i data-lucide="mail"></i> Contacto e Inscripciones</h4>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="editor-section-body">
                    <div class="form-group">
                        <label class="form-label">Nombre Coordinador</label>
                        <input type="text" class="form-control" value="${escapeHtml(d.coordName)}" oninput="updateThemeConfig('coordName', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Rol en la Escuela</label>
                        <input type="text" class="form-control" value="${escapeHtml(d.coordRole)}" oninput="updateThemeConfig('coordRole', this.value)" />
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Email de Contacto</label>
                            <input type="email" class="form-control" value="${escapeHtml(d.coordEmail)}" oninput="updateThemeConfig('coordEmail', this.value)" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Teléfono</label>
                            <input type="text" class="form-control" value="${escapeHtml(d.coordPhone)}" oninput="updateThemeConfig('coordPhone', this.value)" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">URL Foto de Contacto</label>
                        <input type="text" class="form-control" value="${escapeHtml(d.coordAvatar)}" oninput="updateThemeConfig('coordAvatar', this.value)" />
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

window.toggleEditorSection = function(sectionId) {
    const sec = document.getElementById(sectionId);
    if (!sec) return;
    const isOpen = sec.classList.contains("open");
    document.querySelectorAll(".editor-section").forEach(s => s.classList.remove("open"));
    if (!isOpen) {
        sec.classList.add("open");
    }
};

let _previewRenderTimer = null;
function scheduleDossierPreviewRender() {
    if (_previewRenderTimer) clearTimeout(_previewRenderTimer);
    _previewRenderTimer = setTimeout(() => {
        _previewRenderTimer = null;
        renderDossierHighFidelity();
    }, 150);
}

window.updateThemeConfig = function(key, val) {
    if (!state.currentDossier) return;
    state.currentDossier[key] = val;
    scheduleDossierPreviewRender();
};

window.updateScholarshipSlider = function(val) {
    document.getElementById("val-scholarship").innerText = val + "%";
    updateThemeConfig("scholarshipDiscount", parseInt(val));
};

// ==========================================================================
// DYNAMIC CONTENT SUB-MANAGERS (PLAN, FACULTY, TESTIMONIALS)
// ==========================================================================
window.toggleManagerItem = function(itemId) {
    const item = document.getElementById(itemId);
    if (item) item.classList.toggle("open");
};

/* --- 1. Academic Modules Manager --- */
function generateModulesManagerHtml(modules) {
    let html = "";
    modules.forEach((mod, idx) => {
        const itemId = `manager-mod-${mod.id}`;
        let subjectsFields = "";
        mod.subjects.forEach((subj, sIdx) => {
            subjectsFields += `
                <div style="display: flex; gap: 4px; margin-bottom: 6px;">
                    <input type="text" class="form-control" value="${escapeHtml(subj)}" oninput="updateModuleSubject(${idx}, ${sIdx}, this.value)" style="padding: 6px 8px; font-size: 0.8rem;" />
                    <button class="item-action-btn delete" onclick="deleteModuleSubject(${idx}, ${sIdx})" title="Quitar asignatura">
                        <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                    </button>
                </div>
            `;
        });

        html += `
            <div class="manager-item" id="${itemId}">
                <div class="manager-item-header">
                    <span class="manager-item-title" onclick="toggleManagerItem('${itemId}')">
                        Fase ${idx + 1}: ${escapeHtml(mod.title.replace(/<\/?[^>]+(>|$)/g, "") || "Fase sin título")}
                    </span>
                    <div class="manager-item-actions">
                        <button class="item-action-btn" onclick="moveModule(${idx}, -1)" title="Subir" ${idx === 0 ? 'disabled' : ''}>
                            <i data-lucide="arrow-up" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button class="item-action-btn" onclick="moveModule(${idx}, 1)" title="Bajar" ${idx === modules.length - 1 ? 'disabled' : ''}>
                            <i data-lucide="arrow-down" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button class="item-action-btn delete" onclick="deleteModule(${idx})" title="Eliminar">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                        </button>
                    </div>
                </div>
                <div class="manager-item-body">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Título</label>
                        <input type="text" class="form-control" value="${escapeHtml(mod.title)}" oninput="updateModuleField(${idx}, 'title', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Créditos ECTS</label>
                        <input type="number" class="form-control" value="${mod.ects}" oninput="updateModuleField(${idx}, 'ects', parseInt(this.value) || 0)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Resumen de Fase</label>
                        <textarea class="form-control" oninput="updateModuleField(${idx}, 'desc', this.value)" style="min-height: 60px;">${escapeHtml(mod.desc)}</textarea>
                    </div>
                    
                    <div class="nested-subjects">
                        <label class="form-label" style="font-size: 0.75rem; margin-bottom: 8px; display: block; color: var(--text-primary);">Asignaturas / Actividades</label>
                        ${subjectsFields}
                        <button class="add-item-btn" onclick="addSubjectToModule(${idx})" style="padding: 6px; font-size: 0.75rem; margin-top: 6px;">
                            + Añadir Asignatura
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}

window.updateModuleField = function(idx, field, val) {
    if (!state.currentDossier) return;
    state.currentDossier.modules[idx][field] = val;
    renderDossierHighFidelity();
};

window.updateModuleSubject = function(mIdx, sIdx, val) {
    if (!state.currentDossier) return;
    state.currentDossier.modules[mIdx].subjects[sIdx] = val;
    renderDossierHighFidelity();
};

window.deleteModuleSubject = function(mIdx, sIdx) {
    if (!state.currentDossier) return;
    state.currentDossier.modules[mIdx].subjects.splice(sIdx, 1);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

window.addSubjectToModule = function(mIdx) {
    if (!state.currentDossier) return;
    state.currentDossier.modules[mIdx].subjects.push("Nueva Asignatura / Taller");
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

window.addModuleToDossier = function() {
    if (!state.currentDossier) return;
    const newMod = {
        id: "mod-" + Date.now(),
        title: "Nueva Fase Académica",
        ects: 6,
        desc: "Descripción resumida de lo que comprende esta fase en el plan académico.",
        subjects: ["Asignatura 1", "Asignatura 2"]
    };
    state.currentDossier.modules.push(newMod);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

window.deleteModule = function(idx) {
    if (!state.currentDossier) return;
    if (state.currentDossier.modules.length <= 1) {
        alert("El dossier debe incluir al menos una fase académica.");
        return;
    }
    state.currentDossier.modules.splice(idx, 1);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

window.moveModule = function(idx, direction) {
    if (!state.currentDossier) return;
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= state.currentDossier.modules.length) return;

    const temp = state.currentDossier.modules[idx];
    state.currentDossier.modules[idx] = state.currentDossier.modules[targetIdx];
    state.currentDossier.modules[targetIdx] = temp;

    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

/* --- 2. Faculty / Claustro Manager --- */
function generateFacultyManagerHtml(faculty) {
    let html = "";
    faculty.forEach((prof, idx) => {
        const itemId = `manager-prof-${prof.id}`;
        html += `
            <div class="manager-item" id="${itemId}">
                <div class="manager-item-header">
                    <span class="manager-item-title" onclick="toggleManagerItem('${itemId}')">
                        ${escapeHtml(prof.name || "Profesor sin nombre")}
                    </span>
                    <div class="manager-item-actions">
                        <button class="item-action-btn delete" onclick="deleteFaculty(${idx})" title="Eliminar Profesor">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                        </button>
                    </div>
                </div>
                <div class="manager-item-body">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Nombre Completo</label>
                        <input type="text" class="form-control" value="${escapeHtml(prof.name)}" oninput="updateFacultyField(${idx}, 'name', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Cargo Corporativo</label>
                        <input type="text" class="form-control" value="${escapeHtml(prof.role)}" oninput="updateFacultyField(${idx}, 'role', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Foto Perfil (URL)</label>
                        <input type="text" class="form-control" value="${escapeHtml(prof.avatar)}" oninput="updateFacultyField(${idx}, 'avatar', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Mini Trayectoria</label>
                        <textarea class="form-control" oninput="updateFacultyField(${idx}, 'bio', this.value)" style="min-height: 60px;">${escapeHtml(prof.bio)}</textarea>
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}

window.updateFacultyField = function(idx, field, val) {
    if (!state.currentDossier) return;
    state.currentDossier.faculty[idx][field] = val;
    renderDossierHighFidelity();
};

window.addFacultyToDossier = function() {
    if (!state.currentDossier) return;
    const newProf = {
        id: "fac-" + Date.now(),
        name: "Nuevo Profesor",
        role: "Consultor de la Industria",
        bio: "Describe la trayectoria ejecutiva del profesor, cargos ocupados y logros industriales destacables.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80"
    };
    state.currentDossier.faculty.push(newProf);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

window.deleteFaculty = function(idx) {
    if (!state.currentDossier) return;
    if (state.currentDossier.faculty.length <= 1) {
        alert("El claustro debe contar con al menos un profesor.");
        return;
    }
    state.currentDossier.faculty.splice(idx, 1);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

/* --- 3. Testimonials Manager --- */
function generateTestimonialsManagerHtml(testimonials) {
    let html = "";
    testimonials.forEach((test, idx) => {
        const itemId = `manager-test-${test.id}`;
        html += `
            <div class="manager-item" id="${itemId}">
                <div class="manager-item-header">
                    <span class="manager-item-title" onclick="toggleManagerItem('${itemId}')">
                        ${escapeHtml(test.author || "Autor sin nombre")}
                    </span>
                    <div class="manager-item-actions">
                        <button class="item-action-btn delete" onclick="deleteTestimonial(${idx})" title="Eliminar">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                        </button>
                    </div>
                </div>
                <div class="manager-item-body">
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Nombre Alumno/Alumni</label>
                        <input type="text" class="form-control" value="${escapeHtml(test.author)}" oninput="updateTestimonialField(${idx}, 'author', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Cargo y Empresa</label>
                        <input type="text" class="form-control" value="${escapeHtml(test.role)}" oninput="updateTestimonialField(${idx}, 'role', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Foto (URL)</label>
                        <input type="text" class="form-control" value="${escapeHtml(test.avatar)}" oninput="updateTestimonialField(${idx}, 'avatar', this.value)" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="font-size: 0.75rem;">Testimonio</label>
                        <textarea class="form-control" oninput="updateTestimonialField(${idx}, 'text', this.value)" style="min-height: 60px;">${escapeHtml(test.text)}</textarea>
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}

window.updateTestimonialField = function(idx, field, val) {
    if (!state.currentDossier) return;
    state.currentDossier.testimonials[idx][field] = val;
    renderDossierHighFidelity();
};

window.addTestimonialToDossier = function() {
    if (!state.currentDossier) return;
    const newTest = {
        id: "test-" + Date.now(),
        text: "Una formación única e interactiva con metodologías ágiles que aceleró mi integración laboral.",
        author: "Nuevo Alumni ENAE",
        role: "Project Manager",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=128&h=128&q=80"
    };
    state.currentDossier.testimonials.push(newTest);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};

window.deleteTestimonial = function(idx) {
    if (!state.currentDossier) return;
    if (state.currentDossier.testimonials.length <= 1) {
        alert("El dossier debe contar con al menos un testimonio.");
        return;
    }
    state.currentDossier.testimonials.splice(idx, 1);
    renderEditorPanelInputs();
    renderDossierHighFidelity();
};


// ==========================================================================
// HIGH-FIDELITY PREVIEW RENDERER (Dossier page compiler)
// ==========================================================================
let activeTestimonialIndex = 0;





window.renderDossierHighFidelity = function() {
    const mount = document.getElementById("dossier-preview-mount") || document.getElementById("app-root");
    if (!mount) return;
    
    if (!state.currentDossier) {
        const dataScript = document.getElementById("dossier-data");
        if (dataScript) {
            state.currentDossier = JSON.parse(dataScript.textContent);
        }
    }
    
    if (!state.currentDossier) return;
    const d = state.currentDossier;

    const html = `
    <div class="dossier-master-wrap">
        <style>*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }.\\!container{width:100%!important}.container{width:100%}@media (min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media (min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media (min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media (min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media (min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.visible{visibility:visible}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.block{display:block}.inline{display:inline}.flex{display:flex}.grid{display:grid}.hidden{display:none}.flex-shrink{flex-shrink:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.items-stretch{align-items:stretch}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.gap-\\[5vw\\]{gap:5vw}.gap-\\[6vw\\]{gap:6vw}.gap-\\[8vw\\]{gap:8vw}.gap-\\[clamp\\(16px\\2c 2vw\\2c 36px\\)\\]{gap:clamp(16px,2vw,36px)}.border{border-width:1px}.p-20{padding:5rem}.uppercase{text-transform:uppercase}.italic{font-style:italic}.blur{--tw-blur:blur(8px)}.blur,.drop-shadow{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow{--tw-drop-shadow:drop-shadow(0 1px 2px rgba(0,0,0,.1)) drop-shadow(0 1px 1px rgba(0,0,0,.06))}.invert{--tw-invert:invert(100%)}.filter,.invert{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-filter{-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.ease-in-out{transition-timing-function:cubic-bezier(.4,0,.2,1)}@font-face{font-family:SFUIDisplay;src:url(../assets/fonts/SFUIDisplay-Black.otf) format("opentype");font-weight:900}@font-face{font-family:SFUIDisplay;src:url(../assets/fonts/SFUIDisplay-Bold.otf) format("opentype");font-weight:700}@font-face{font-family:OpenSans;src:url(../assets/fonts/OpenSans-ExtraBold.ttf) format("truetype");font-weight:800}@font-face{font-family:OpenSans;src:url(../assets/fonts/OpenSans-Bold.ttf) format("truetype");font-weight:700}@font-face{font-family:OpenSans;src:url(../assets/fonts/OpenSans-Light.ttf) format("truetype");font-weight:300}:root{--gr:#a91831;--grd:#7a1020;--ng:#202221;--bl:#fff;--ag:#dee5ec;--go:#404040;--fd:"SFUIDisplay","Arial Black",sans-serif;--fb:"OpenSans","Open Sans",Arial,sans-serif;--fs:"Playfair Display",Georgia,serif;--t-giant:clamp(52px,7.5vw,140px);--t-hero:clamp(36px,5.2vw,96px);--t-title:clamp(24px,3.2vw,60px);--t-sub:clamp(18px,2.0vw,36px);--t-lg:clamp(14px,1.1vw,20px);--t-md:clamp(12px,0.85vw,16px);--t-sm:clamp(10px,0.70vw,13px);--t-xs:clamp(8px,0.56vw,10px);--sp-xs:clamp(4px,0.6vh,8px);--sp-sm:clamp(8px,1.2vh,16px);--sp-md:clamp(16px,10vh,50px);--sp-lg:clamp(22px,3.2vh,48px);--sp-xl:clamp(36px,5.0vh,80px);--px:clamp(36px,5.2vw,88px);--py:clamp(48px,6.8vh,88px)}.dossier-master-wrap *,.dossier-master-wrap :after,.dossier-master-wrap :before{box-sizing:border-box;margin:0;padding:0}.dossier-master-wrap{width:100%;height:100%;overflow:hidden;background:#0a0a0a;font-family:var(--fb)}.msym{font-family:Material Symbols Outlined;font-weight:400;font-style:normal;font-size:inherit;line-height:1;display:inline-block;white-space:nowrap;direction:ltr;-webkit-font-smoothing:antialiased}#app-dossier{width:100vw;height:100vh;position:relative;overflow:hidden}.slide{position:absolute;inset:0;opacity:0;pointer-events:none;overflow:hidden}.slide.on{opacity:1;pointer-events:all}#bar{top:0;left:0;height:3px;background:var(--gr);transition:width .5s cubic-bezier(.4,0,.2,1);box-shadow:0 0 12px rgba(169,24,49,.55)}#bar,#ctr{position:fixed;z-index:200}#ctr{top:2.2vh;right:2.8vw;font-family:var(--fb);font-weight:700;font-size:var(--t-xs);color:hsla(0,0%,100%,.28);letter-spacing:2px}#nav{position:fixed;bottom:2.2vh;left:50%;transform:translateX(-50%);z-index:200;display:flex;align-items:center;gap:.8vw;background:rgba(8,8,8,.78);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-radius:999px;padding:.9vh 2vw;border:1px solid hsla(0,0%,100%,.07)}.dot{width:clamp(5px,.42vw,8px);height:clamp(5px,.42vw,8px);border-radius:50%;background:hsla(0,0%,100%,.18);cursor:pointer;transition:all .3s;border:none}.dot.on{background:var(--gr);transform:scale(1.55)}.arr{background:none;border:1px solid hsla(0,0%,100%,.15);color:#fff;cursor:pointer;border-radius:50%;width:clamp(24px,2vw,36px);height:clamp(24px,2vw,36px);display:flex;align-items:center;justify-content:center;font-size:clamp(14px,1.1vw,20px);transition:all .2s}.arr:hover{background:var(--gr);border-color:var(--gr)}.tm{line-height:.93}.tb{font-family:var(--fd);font-weight:900;letter-spacing:-.02em}.tb,.ti{display:block;color:var(--bl)}.ti{font-family:var(--fs);font-style:italic;font-weight:700}.tl{display:block;font-family:var(--fb);font-weight:300;color:hsla(0,0%,100%,.82)}.ey{color:var(--gr)}.ey,.ey-w{font-family:var(--fs);font-style:italic;font-size:var(--t-md);display:block;margin-bottom:var(--sp-xs)}.ey-w{color:hsla(0,0%,100%,.6)}.rule{background:var(--gr)}.rule,.rule-w{width:clamp(28px,2.5vw,44px);height:3px;border-radius:2px;margin:var(--sp-sm) 0}.rule-w{background:hsla(0,0%,100%,.32)}.lbl{font-family:var(--fb);font-weight:700;font-size:var(--t-xs);letter-spacing:2px;text-transform:uppercase;color:hsla(0,0%,100%,.38)}.lbl-gr{color:var(--gr)}.pill{display:inline-flex;align-items:center;background:rgba(169,24,49,.8);color:#fff;border-radius:4px;padding:clamp(4px,.5vh,7px) clamp(10px,1vw,16px);font-family:var(--fb);font-weight:800;font-size:var(--t-xs);letter-spacing:2px;text-transform:uppercase}.cw{background:var(--bl);border-radius:clamp(8px,.7vw,14px);padding:clamp(14px,1.6vw,28px);box-shadow:0 12px 40px rgba(0,0,0,.25)}.cw .ce{font-family:var(--fs);font-style:italic;color:var(--gr);margin-bottom:4px}.cw .ce,.cw .ct{font-weight:700;font-size:var(--t-sm)}.cw .ct{color:var(--ng);line-height:1.3}.cw .cb,.cw .ct{font-family:var(--fb)}.cw .cb{font-weight:300;color:var(--go);font-size:var(--t-sm);line-height:1.65;margin-top:4px}.cg{background:hsla(0,0%,100%,.09);border:1px solid hsla(0,0%,100%,.14);border-radius:clamp(6px,.6vw,12px);padding:clamp(10px,1.1vw,20px)}.kn{font-family:var(--fb);font-weight:800;color:var(--bl);line-height:.85;letter-spacing:-.03em}.ks{font-family:var(--fs);font-style:italic;color:hsla(0,0%,100%,.55);line-height:1.3}.gh{position:absolute;color:hsla(0,0%,100%,.06);line-height:.8;letter-spacing:-.04em;pointer-events:none;z-index:0}.gh,.nb{font-family:var(--fb);font-weight:800}.nb{background:var(--gr);color:#fff;font-size:clamp(11px,.85vw,15px);width:clamp(26px,2.1vw,36px);height:clamp(26px,2.1vw,36px);display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:4px}.cov-ov{background:radial-gradient(60% 50% at 76% 44%,rgba(169,24,49,.5) 0,transparent 70%),linear-gradient(130deg,rgba(28,30,29,.97),rgba(28,30,29,.58) 42%,rgba(169,24,49,.78));z-index:1}.cov-ov,.ph-wash:after{position:absolute;inset:0}.ph-wash:after{content:"";background:linear-gradient(180deg,rgba(32,34,33,.1),rgba(169,24,49,.3));mix-blend-mode:multiply}[data-a]{opacity:0}.btn{display:inline-flex;align-items:center;gap:.5vw;background:var(--gr);color:#fff;font-family:var(--fb);font-weight:800;font-size:var(--t-sm);letter-spacing:1px;text-transform:uppercase;padding:clamp(10px,1.3vh,18px) clamp(18px,2vw,32px);border-radius:4px;border:none;cursor:pointer;transition:all .25s;text-decoration:none}.btn:hover{background:var(--grd);transform:translateY(-2px);box-shadow:0 8px 24px rgba(169,24,49,.42)}.btn-ol{background:transparent;border:1.5px solid hsla(0,0%,100%,.2)}.btn-ol:hover{background:hsla(0,0%,100%,.07);border-color:hsla(0,0%,100%,.4);box-shadow:none}#s1{background:var(--ng)}#s1 .bg{position:absolute;inset:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;z-index:0;filter:brightness(.65)}#s1 .inner{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:var(--py) var(--px)}#s1 .kpi-strip{display:flex;gap:0;border-top:1px solid hsla(0,0%,100%,.12);padding-top:var(--sp-md);margin-top:var(--sp-md)}#s1 .kv{flex:1;text-align:center;padding:0 clamp(6px,.8vw,14px)}#s1 .kv:not(:last-child){border-right:1px solid hsla(0,0%,100%,.1)}#s1 .kv-n{font-weight:800;font-size:clamp(18px,2.2vw,38px);color:#fff;line-height:1}#s1 .kv-l,#s1 .kv-n{font-family:var(--fb)}#s1 .kv-l{font-size:var(--t-sm);color:hsla(0,0%,100%,.55);margin-top:3px}#s2{background:var(--ng)}#s2 .photo-col{position:absolute;top:0;left:0;bottom:0;width:40%;z-index:0}#s2 .photo-col img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;display:block}#s2 .photo-col:after{content:"";position:absolute;inset:0;background:linear-gradient(to right,transparent 55%,var(--ng) 100%)}#s2 .content-col{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;padding:var(--py) var(--px) var(--py) calc(40% + 5.5vw)}#s3{background:linear-gradient(152deg,#a91831,#7a1020 44%,#1c1e1d)}#s3 .inner{position:relative;z-index:2;height:100%;display:grid;grid-template-columns:1.15fr .85fr;gap:3.5vw;padding:var(--py) var(--px);align-items:start}.mg{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:.25rem}@media (min-width:768px){.mg{grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(4px,.4vw,8px)}}.mc{background:hsla(0,0%,100%,.09);border:1px solid hsla(0,0%,100%,.14);border-left:2px solid hsla(0,0%,100%,.22);border-radius:clamp(5px,.5vw,9px);padding:clamp(5px,.6vw,10px)}.mt{font-weight:800;font-size:var(--t-xs);letter-spacing:1.5px;text-transform:uppercase;color:hsla(0,0%,100%,.38);margin-bottom:4px}.mn,.mt{font-family:var(--fb)}.mn{font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.3}.ia-box{background:hsla(0,0%,100%,.1);border:1.5px solid hsla(0,0%,100%,.24);border-radius:clamp(8px,.7vw,14px);padding:clamp(12px,1.4vw,24px)}#s4{background:var(--ng)}#s4 .photo-r{position:absolute;top:0;right:0;bottom:0;width:42%;z-index:0}#s4 .photo-r img{width:100%;height:100%;-o-object-fit:cover;object-fit:cover;filter:brightness(.42) saturate(.7)}#s4 .photo-r:before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(to right,var(--ng) 0,transparent 45%)}#s4 .inner{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;padding:var(--py) var(--px);max-width:62%}.pg{display:grid;grid-template-columns:repeat(1,minmax(0,1fr));gap:.5rem}@media (min-width:768px){.pg{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(5px,.5vw,9px)}}.pc{background:hsla(0,0%,100%,.04);border:1px solid hsla(0,0%,100%,.08);border-radius:clamp(5px,.5vw,9px);padding:clamp(9px,1vw,17px);text-align:center}.pi{font-size:clamp(18px,1.8vw,30px);color:var(--gr);margin-bottom:var(--sp-xs)}.pw{grid-column:span 2;background:rgba(169,24,49,.14);border-color:rgba(169,24,49,.3)}.pw .pi{color:#fff}.mr{display:flex;align-items:center;gap:clamp(8px,.8vw,14px);background:hsla(0,0%,100%,.04);border-radius:clamp(5px,.5vw,9px);padding:clamp(7px,.9vh,13px) clamp(12px,1.2vw,20px);margin-bottom:clamp(4px,.5vh,7px)}.mt-pill{font-family:var(--fb);font-weight:800;font-size:var(--t-xs);letter-spacing:1.5px;text-transform:uppercase;padding:clamp(3px,.4vh,5px) clamp(6px,.6vw,10px);border-radius:3px;white-space:nowrap}#s5{background:linear-gradient(148deg,#161817,#000)}.k3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr))}.kb{text-align:center;padding:0 clamp(8px,1vw,20px);border-right:1px solid hsla(0,0%,100%,.07)}.kb:last-child{border-right:none}.kg{font-family:var(--fb);font-weight:800;font-size:var(--t-giant);color:#fff;line-height:.85;letter-spacing:-.03em}.kg span{font-size:.5em;vertical-align:middle}.kg.r{color:var(--gr)}.ctag{background:hsla(0,0%,100%,.06);border:1px solid hsla(0,0%,100%,.1);color:#fff;font-family:var(--fb);font-weight:700;font-size:var(--t-sm);padding:clamp(4px,.5vh,7px) clamp(8px,.9vw,14px);border-radius:5px}#s6{background:var(--gr)}#s6 .inner{position:relative;z-index:2;height:100%;display:grid;grid-template-columns:1fr 1fr;gap:4vw;padding:var(--py) var(--px);align-items:center}.rk-hero-n{font-family:var(--fb);font-weight:800;font-size:clamp(72px,9vw,168px);color:#fff;line-height:.82;letter-spacing:-.04em}.rk-g{background:rgba(0,0,0,.15);border-color:rgba(0,0,0,.18)}.badge-img{max-width:100%;max-height:clamp(38px,5.5vh,68px);-o-object-fit:contain;object-fit:contain;filter:brightness(0) invert(1);opacity:.82}#s7{background:var(--ng)}#s7 .inner{position:relative;z-index:2;height:100%;gap:var(--sp-sm);padding:var(--py) var(--px)}#s7 .inner,.pcard{display:flex;flex-direction:column}.pcard{background:hsla(0,0%,100%,.05);border:1px solid hsla(0,0%,100%,.08);border-radius:clamp(6px,.6vw,12px)}.pcard,.pw-img{overflow:hidden}.pw-img{position:relative;padding-top:62%}.pw-img img{position:absolute;inset:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-o-object-position:top center;object-position:top center}.pw-img:after{content:"";position:absolute;bottom:0;left:0;right:0;height:45%;background:linear-gradient(0deg,rgba(18,20,19,.92),transparent)}.pinfo{padding:clamp(7px,.8vw,13px)}.pname{font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.2}.pname,.prole{font-family:var(--fb)}.prole{font-weight:300;font-size:var(--t-xs);color:hsla(0,0%,100%,.48);margin-top:2px}.parea{display:inline-block;margin-top:4px;background:rgba(169,24,49,.2);border:1px solid rgba(169,24,49,.35);color:hsla(0,0%,100%,.8);font-family:var(--fb);font-weight:800;font-size:clamp(6px,.48vw,8px);letter-spacing:1.5px;text-transform:uppercase;padding:2px 7px;border-radius:3px}#s8{background:linear-gradient(135deg,#161817,#2c0d15 55%,#1b1d1c)}#s8 .inner{position:relative;z-index:2;min-height:100%;height:auto;padding:var(--py) var(--px);overflow-y:visible}#s8 .inner,.step{align-items:center}.step{display:flex;gap:clamp(8px,.8vw,14px);background:hsla(0,0%,100%,.04);border-radius:clamp(5px,.5vw,9px);padding:clamp(7px,.9vh,13px) clamp(10px,1vw,18px);margin-bottom:clamp(4px,.5vh,7px)}.step.hl{background:rgba(169,24,49,.18);border:1px solid rgba(169,24,49,.36)}.sm-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,.8vw,14px)}.sm-n{font-family:var(--fb);font-weight:800;font-size:clamp(18px,2vw,36px);color:#fff;line-height:1}.sm-n span{font-size:.55em}.sm-l{font-family:var(--fs);font-style:italic;font-size:var(--t-xs);color:hsla(0,0%,100%,.46)}#s9{background:linear-gradient(150deg,#161817,#3d0e1c 50%,#a91831)}#s9 .inner{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--py) var(--px);text-align:center}.ct-grid{display:grid;grid-template-columns:1fr auto 1fr;gap:0;width:100%;max-width:70vw;margin-top:var(--sp-lg)}.ct-col{padding:0 clamp(20px,2.5vw,44px)}.ct-div{width:1px;background:hsla(0,0%,100%,.2);align-self:stretch}.ct-label{font-weight:700;color:#fff;margin-bottom:var(--sp-xs)}.ct-label,.ct-val{font-family:var(--fb);font-size:var(--t-md)}.ct-val{font-weight:300;color:hsla(0,0%,100%,.75)}.ct-val strong{font-weight:700;color:#fff}.arc-kpi-cell{position:relative;overflow:visible}.arc-kpi-cell .arc-svg{position:absolute;top:50%;left:50%;transform:translate(-50%,-54%) rotate(-90deg);pointer-events:none;z-index:0;width:clamp(130px,15vw,230px);height:clamp(130px,15vw,230px)}.arc-kpi-cell .kg,.arc-kpi-cell .ks{position:relative;z-index:1}.tl{position:relative;padding-left:clamp(38px,4vw,62px)}.tl:before{content:"";position:absolute;left:clamp(16px,1.7vw,24px);top:clamp(20px,2.5vh,30px);bottom:clamp(20px,2.5vh,30px);width:2px;background:linear-gradient(to bottom,var(--gr) 0,rgba(169,24,49,.15) 100%);border-radius:1px}.tl-item{position:relative;margin-bottom:clamp(5px,.6vh,9px);display:flex;align-items:center;gap:clamp(8px,.8vw,14px);background:hsla(0,0%,100%,.04);border-radius:clamp(5px,.5vw,9px);padding:clamp(8px,1vh,14px) clamp(10px,1vw,18px)}.tl-item:before{content:"";position:absolute;left:calc(clamp(38px,4vw,62px)*-1 + clamp(16px,1.7vw,24px) - 6px);width:13px;height:13px;border-radius:50%;background:hsla(0,0%,5%,.8);border:2px solid var(--gr);box-shadow:0 0 0 3px rgba(169,24,49,.12)}.tl-item.hl{background:rgba(169,24,49,.18);border:1px solid rgba(169,24,49,.36)}.tl-item.hl:before{background:var(--gr);box-shadow:0 0 0 4px rgba(169,24,49,.22),0 0 14px rgba(169,24,49,.45)}.fchain{display:flex;align-items:stretch;margin-top:10px}.fchain-node{flex:1;background:rgba(169,24,49,.1);border:1px solid rgba(169,24,49,.24);border-right:none;padding:clamp(7px,.8vh,12px) clamp(4px,.4vw,8px);display:flex;flex-direction:column;align-items:center;gap:3px;position:relative}.fchain-node:first-child{border-radius:6px 0 0 6px}.fchain-node:last-child{border-right:1px solid rgba(169,24,49,.48);border-radius:0 6px 6px 0;background:rgba(169,24,49,.22)}.fchain-node:after{content:"›";position:absolute;right:-9px;top:50%;transform:translateY(-50%);color:rgba(169,24,49,.65);font-size:var(--t-lg);font-weight:900;z-index:2;pointer-events:none;line-height:1}.fchain-node:last-child:after{display:none}.fchain-icon{color:rgba(169,24,49,.8);line-height:1;display:flex}.fchain-node:last-child .fchain-icon{color:hsla(0,0%,100%,.9)}.fchain-label{font-family:var(--fb);font-weight:700;font-size:var(--t-sm);color:#fff;text-align:center;line-height:1.2}.fchain-sub{font-family:var(--fs);font-style:italic;font-size:clamp(7px,.5vw,9px);color:hsla(0,0%,100%,.42);text-align:center}.fchain-node:last-child .fchain-sub{color:hsla(0,0%,100%,.6)}.mc-num{font-family:var(--fb);font-weight:800;font-size:clamp(8px,.52vw,10px);color:rgba(169,24,49,.65);letter-spacing:1px;margin-bottom:2px}.mc{border-left:2.5px solid rgba(169,24,49,.45)!important}.dbar-track{height:3px;background:hsla(0,0%,100%,.1);border-radius:2px;overflow:hidden;margin-top:5px}.dbar-fill{height:100%;border-radius:2px;background:linear-gradient(to right,var(--gr),rgba(169,24,49,.6));width:0;transition:width 1.1s cubic-bezier(.4,0,.2,1)}.pcard{transition:transform .3s cubic-bezier(.4,0,.2,1),box-shadow .3s}.pcard:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.45)}.pcard:hover .pw-img img{filter:brightness(1.08) saturate(1.1);transition:filter .4s}.pw-img img{transition:filter .4s}@media (max-width:768px){.inner{padding:var(--py) 6vw!important}.tm .tb{font-size:clamp(36px,10vw,48px)!important}.lbl{font-size:10px!important}.btn{padding:10px 16px!important;font-size:11px!important}#s2{display:flex;flex-direction:column;overflow-y:auto}#s2b>div{grid-template-columns:1fr!important;height:auto!important;overflow-y:visible}#s2b>div>div:first-child{max-width:100%!important;margin-bottom:20px}.dv-grid{display:flex!important;flex-direction:column!important;gap:16px!important;height:auto!important}.dv-card{padding:20px!important;min-height:250px}.dv-chart{display:block!important;flex:1;min-height:120px}#s2 .photo-col{position:relative;width:100%;height:35vh;flex-shrink:0}#s2 .photo-col:after{background:linear-gradient(to bottom,transparent 55%,var(--ng) 100%)}#s2 .content-col{padding:5vw 6vw;align-items:flex-start;justify-content:flex-start;max-width:100%}#s3 .inner{grid-template-columns:1fr;gap:24px}#s3 .inner,#s4{display:flex;flex-direction:column;overflow-y:auto}#s4 .photo-r{position:relative;width:100%;height:25vh;flex-shrink:0}#s4 .photo-r:before{background:linear-gradient(to bottom,var(--ng) 0,transparent 45%)}#s4 .inner{max-width:100%;padding:5vw 6vw}.pw{grid-column:span 1}.kb{border-bottom:none!important;border-right:none!important;padding-bottom:0!important}.arc-kpi-cell .arc-svg{width:90px!important;height:90px!important}.arc-kpi-cell .kg{font-size:28px!important}.arc-kpi-cell .ks{font-size:10px!important;line-height:1.2!important;margin-top:8px!important}#s6 .inner{grid-template-columns:1fr;gap:24px;text-align:center;display:flex;flex-direction:column;justify-content:center;overflow-y:auto}.rk-hero-n{font-size:clamp(60px,15vw,120px)}#s7 .inner{overflow-y:auto}.pcard{flex-direction:row;align-items:center}.pw-img{width:90px!important;padding-top:0!important;height:90px!important;flex-shrink:0;border-radius:50%!important;margin:10px}.pw-img img{-o-object-position:center top!important;object-position:center top!important}.pw-img:after{display:none!important}.pw-name{font-size:16px!important}.pw-role{font-size:13px!important}.pw-desc{font-size:12px!important;display:block!important;margin-top:4px}#s8 .inner{grid-template-columns:1fr!important;gap:32px!important;display:flex!important;flex-direction:column!important;justify-content:center!important;overflow-y:auto}#s8 .inner>div{max-width:100%!important;min-height:auto!important}#demo-stats{grid-template-columns:1fr 1fr!important;gap:12px!important}#s9 .inner{overflow-y:auto;justify-content:center!important;padding-top:0!important}.ct-grid{grid-template-columns:1fr!important;gap:32px!important;max-width:100%!important}.ct-div{display:none!important}.ct-col{padding:0 16px!important;text-align:center!important}#nav{flex-wrap:wrap;justify-content:center;bottom:10px;padding:8px 12px}#ctr{top:10px;right:10px}}@media (min-width:768px){.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-\\[1\\.1fr_0\\.9fr\\]{grid-template-columns:1.1fr .9fr}.md\\:grid-cols-\\[1fr_1\\.15fr\\]{grid-template-columns:1fr 1.15fr}.md\\:gap-\\[3vw\\]{gap:3vw}.md\\:gap-\\[4vw\\]{gap:4vw}.md\\:gap-\\[5vw\\]{gap:5vw}.md\\:gap-\\[clamp\\(4px\\2c \\.4vw\\2c 8px\\)\\]{gap:clamp(4px,.4vw,8px)}.md\\:gap-\\[clamp\\(5px\\2c \\.5vw\\2c 9px\\)\\]{gap:clamp(5px,.5vw,9px)}}</style>
        
<div id="app-dossier">
  <div id="bar" style="width:11.11%"></div>
  <div id="ctr">01 / 09</div>

<!-- ═══════════════════════════════════════════════════════════
     S1 — PORTADA
     ════════════════════════════════════════════════════════ -->
<div class="slide on" id="s1">
  <img class="bg" src="../doc/Marketing Digital/10042023-317A7390.jpg" alt="">
  <div class="cov-ov"></div>

  <!-- Brand pattern sutil -->
  <!-- S1: rotación -18° — cae desde el ángulo superior derecho -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:40vw;top:-8vh;right:-10vw;opacity:.07;transform:rotate(-18deg);transform-origin:center center;" alt="">

  <div class="inner">
    <!-- Cabecera: logo + pill -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;">
      <div data-a>
        <img src="../assets/logos/LOGO_ENAE_HORIZONTAL.svg" alt="ENAE International Business School"
             style="height:clamp(22px,2.5vh,36px);width:auto;filter:brightness(0) invert(1);">
      </div>
      <div data-a>
        <span class="pill">Programa de Posgrado · Máster Internacional</span>
      </div>
    </div>

    <!-- Título mixto principal — elemento hero -->
    <div style="flex:1;display:flex;flex-direction:column;justify-content:center;">
      <div class="tm" data-a>
        <span class="tb" style="font-size:var(--t-hero);line-height:.9;">${escapeHtml(d.title)}</span>
      </div>
      <div data-a style="margin-top:var(--sp-sm);">
        <span class="ti" style="font-size:var(--t-sub);color:rgba(255,255,255,.84);">${escapeHtml(d.subtitle || "")}</span>
      </div>
      <div class="rule" data-a></div>
      <div data-a style="display:inline-flex;align-items:center;gap:1vw;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.13);border-radius:8px;padding:clamp(7px,1vh,14px) clamp(12px,1.2vw,22px);width:fit-content;">
        <span class="lbl">Doble título con</span>
        <span style="width:1px;height:1.4em;background:rgba(255,255,255,.2);"></span>
        <span style="font-family:var(--fd);font-weight:900;font-size:var(--t-md);color:#fff;">Panamerican University</span>
        <span style="font-family:var(--fb);font-weight:300;font-size:var(--t-xs);color:rgba(255,255,255,.5);">Florida, EE.UU.</span>
      </div>
    </div>

    <!-- Strip KPIs inferior -->
    <div>
      <div class="kpi-strip" data-a>
        <div class="kv"><div class="kv-n">#9</div><div class="kv-l">QS España 2025</div></div>
        <div class="kv"><div class="kv-n">91%</div><div class="kv-l">empleabilidad</div></div>
        <div class="kv"><div class="kv-n">+37</div><div class="kv-l">años formando líderes</div></div>
        <div class="kv"><div class="kv-n">1988</div><div class="kv-l">fundación ENAE</div></div>
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S2 — QUÉ ES ESTE MÁSTER
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s2">
  <!-- Brand pattern -->
  <!-- S2: rotación +14° — esquina inferior derecha, ascendente -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:34vw;bottom:-7vh;right:-8vw;opacity:.055;transform:rotate(14deg);transform-origin:center center;" alt="">

  <div class="photo-col ph-wash">
    <img src="../doc/Marketing Digital/Sesion_innegociable_-61.jpg" alt="Clase ENAE">
  </div>

  <div class="content-col">
    <span class="ey" data-a>Introducción al programa</span>

    <div class="tm" data-a>
      <span class="tb" style="font-size:var(--t-hero);">${escapeHtml(d.intro_t1||'El Máster que')}</span>
      <span class="ti" style="font-size:var(--t-hero);">${escapeHtml(d.intro_t2||'necesitas hoy.')}</span>
    </div>
    <div class="rule" data-a></div>

    <p data-a style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.72);line-height:1.78;max-width:48vw;margin-bottom:var(--sp-md);">
      ${d.descripcion||'El mercado busca profesionales que dominen tanto la <strong style="color:#fff;font-weight:700;">estrategia digital</strong> como la <strong style="color:#fff;font-weight:700;">inteligencia artificial aplicada</strong>. Este programa forma líderes capaces de dirigir la transformación digital completa de cualquier empresa.'}
    </p>

    <!-- Cadena de valor -->
    <div data-a style="margin-bottom:var(--sp-md);">
      <div class="lbl lbl-gr" style="margin-bottom:var(--sp-xs);">${escapeHtml(d.cv_label||'Cadena de valor del marketing digital')}</div>
      <div class="fchain">
        <div class="fchain-node">
          <div class="fchain-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg></div>
          <span class="fchain-label">${escapeHtml(d.cadena_valor?.[0]?.label||'Investigación')}</span>
          <span class="fchain-sub">${escapeHtml(d.cadena_valor?.[0]?.sub||'Insights & datos')}</span>
        </div>
        <div class="fchain-node">
          <div class="fchain-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <span class="fchain-label">${escapeHtml(d.cadena_valor?.[1]?.label||'Captación')}</span>
          <span class="fchain-sub">${escapeHtml(d.cadena_valor?.[1]?.sub||'SEO / SEM / Ads')}</span>
        </div>
        <div class="fchain-node">
          <div class="fchain-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>
          <span class="fchain-label">${escapeHtml(d.cadena_valor?.[2]?.label||'Venta')}</span>
          <span class="fchain-sub">${escapeHtml(d.cadena_valor?.[2]?.sub||'E-commerce')}</span>
        </div>
        <div class="fchain-node">
          <div class="fchain-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
          <span class="fchain-label">${escapeHtml(d.cadena_valor?.[3]?.label||'Fidelización')}</span>
          <span class="fchain-sub">${escapeHtml(d.cadena_valor?.[3]?.sub||'CRM & Email')}</span>
        </div>
        <div class="fchain-node">
          <div class="fchain-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          <span class="fchain-label">${escapeHtml(d.cadena_valor?.[4]?.label||'Analítica IA')}</span>
          <span class="fchain-sub">${escapeHtml(d.cadena_valor?.[4]?.sub||'Data-driven')}</span>
        </div>
      </div>
    </div>

    <!-- Quote editorial -->
    <div data-a style="border-left:3px solid var(--gr);padding-left:clamp(10px,1vw,18px);">
      <p style="font-family:var(--fs);font-style:italic;font-size:var(--t-lg);color:rgba(255,255,255,.8);line-height:1.55;">
        "Si no entiendes cómo funciona la inteligencia artificial, estarás compitiendo con profesionales que sí lo hacen… y perderás."
      </p>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S3 — PROGRAMA ACADÉMICO
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s3">
  <!-- Brand pattern E -->
  <!-- S3 granate: rotación -22° — dramático, diagonal pronunciada -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:42vw;bottom:-10vh;left:-10vw;opacity:.11;transform:rotate(-22deg);transform-origin:center center;" alt="">

  <!-- Layout: 2 columnas, ambas con altura completa del slide -->
  <div class="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[5vw] md:gap-[3vw] items-stretch" style="position:relative;z-index:2;height:100%;padding:var(--py) var(--px);">

    <!-- ── COLUMNA IZQUIERDA: encabezado + grid de módulos que llena el espacio ── -->
    <div style="display:flex;flex-direction:column;min-height:0;">

      <!-- Encabezado compacto (flex-shrink:0) -->
      <div style="flex-shrink:0;margin-bottom:clamp(8px,1.2vh,16px);">
        <span class="ey-w" data-a>Programa Académico</span>
        <div class="tm" data-a>
          <span class="tb" style="font-size:var(--t-hero);">Todo lo que</span>
          <span class="ti" style="font-size:var(--t-hero);">aprenderás.</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:clamp(6px,0.8vh,12px);">
          <div class="rule-w" data-a style="margin:0;"></div>
          <div class="lbl" data-a style="color:rgba(255,255,255,.4);">8 módulos · 60 ECTS · 12 meses</div>
        </div>
      </div>

      <!-- Grid de módulos: flex:1 + align-content:stretch → filas llenan la altura disponible -->
      
      <div style="flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:clamp(4px,.45vw,8px);">
        ${(d.modules || []).map((m, i) => `
        <div class="mc" data-a style="display:flex;flex-direction:column;justify-content:center;">
          <div class="mc-num">${String(i+1).padStart(2, '0')}</div><div class="mt">${escapeHtml(m.ects || '')} ECTS</div><div class="mn">${escapeHtml(m.title)}</div>
        </div>
        `).join('')}
      </div>
    </div><!-- ── COLUMNA DERECHA: IA (flex:1) + stats + modalidades ── -->
    <div style="display:flex;flex-direction:column;gap:clamp(6px,.8vh,12px);min-height:0;">

      <!-- Caja IA: flex:1 para ocupar el máximo espacio disponible -->
      <div class="ia-box" data-a style="flex:1;min-height:0;display:flex;flex-direction:column;">
        <div style="flex-shrink:0;display:flex;align-items:center;gap:.8vw;margin-bottom:clamp(8px,1.2vh,16px);">
          <span style="background:#fff;color:var(--gr);padding:3px 10px;border-radius:3px;font-family:var(--fb);font-size:var(--t-xs);font-weight:800;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;">MENCIÓN EXCLUSIVA</span>
          <span style="font-family:var(--fb);font-weight:800;font-size:var(--t-sm);color:#fff;">Inteligencia Artificial Aplicada</span>
        </div>
        <!-- Sujetos IA: flex:1 con align-content:space-around para distribuir verticalmente -->
        <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,.7vw,12px);align-content:space-around;">
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="color:rgba(255,255,255,.5);flex-shrink:0;font-size:clamp(14px,1.1vw,18px);line-height:1.2;">›</span>
            <span style="font-family:var(--fb);font-weight:400;font-size:var(--t-md);color:rgba(255,255,255,.85);line-height:1.4;">Intro a la Inteligencia Artificial</span>
          </div>
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="color:rgba(255,255,255,.5);flex-shrink:0;font-size:clamp(14px,1.1vw,18px);line-height:1.2;">›</span>
            <span style="font-family:var(--fb);font-weight:400;font-size:var(--t-md);color:rgba(255,255,255,.85);line-height:1.4;">IA Aplicada al Marketing</span>
          </div>
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="color:rgba(255,255,255,.5);flex-shrink:0;font-size:clamp(14px,1.1vw,18px);line-height:1.2;">›</span>
            <span style="font-family:var(--fb);font-weight:400;font-size:var(--t-md);color:rgba(255,255,255,.85);line-height:1.4;">IA para Relaciones con Clientes</span>
          </div>
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="color:rgba(255,255,255,.5);flex-shrink:0;font-size:clamp(14px,1.1vw,18px);line-height:1.2;">›</span>
            <span style="font-family:var(--fb);font-weight:400;font-size:var(--t-md);color:rgba(255,255,255,.85);line-height:1.4;">Publicidad Programática</span>
          </div>
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="color:rgba(255,255,255,.5);flex-shrink:0;font-size:clamp(14px,1.1vw,18px);line-height:1.2;">›</span>
            <span style="font-family:var(--fb);font-weight:400;font-size:var(--t-md);color:rgba(255,255,255,.85);line-height:1.4;">Marketing Automation con IA</span>
          </div>
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <span style="color:rgba(255,255,255,.5);flex-shrink:0;font-size:clamp(14px,1.1vw,18px);line-height:1.2;">›</span>
            <span style="font-family:var(--fb);font-weight:400;font-size:var(--t-md);color:rgba(255,255,255,.85);line-height:1.4;">Analítica &amp; Data Driven</span>
          </div>
        </div>
      </div>

      <!-- Stats: fila de 2 KPIs -->
      <div style="flex-shrink:0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(6px,.7vw,12px);" data-a>
        <div class="cg" style="text-align:center;padding:clamp(10px,1.3vw,22px);">
          <div class="kn" style="font-size:clamp(24px,2.8vw,50px);">60</div>
          <div class="lbl" style="margin-top:5px;">ECTS</div>
        </div>
        <div class="cg" style="text-align:center;padding:clamp(10px,1.3vw,22px);">
          <div class="kn" style="font-size:clamp(24px,2.8vw,50px);">12</div>
          <div class="lbl" style="margin-top:5px;">Meses</div>
        </div>
      </div>

      <!-- Modalidades -->
      <div class="cg" style="flex-shrink:0;" data-a>
        <div class="lbl" style="margin-bottom:clamp(5px,.7vh,10px);">Modalidades disponibles</div>
        <div style="display:flex;gap:clamp(4px,.5vw,8px);flex-wrap:wrap;">
          <span style="display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.1);color:#fff;font-family:var(--fb);font-size:var(--t-xs);font-weight:700;padding:clamp(4px,.5vh,7px) clamp(8px,.9vw,14px);border-radius:3px;">
            <span class="msym" style="font-size:clamp(10px,.85vw,14px);">videocam</span> Live Class Online
          </span>
          <span style="display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.1);color:#fff;font-family:var(--fb);font-size:var(--t-xs);font-weight:700;padding:clamp(4px,.5vh,7px) clamp(8px,.9vw,14px);border-radius:3px;">
            <span class="msym" style="font-size:clamp(10px,.85vw,14px);">laptop</span> Semipresencial
          </span>
          <span style="display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.1);color:#fff;font-family:var(--fb);font-size:var(--t-xs);font-weight:700;padding:clamp(4px,.5vh,7px) clamp(8px,.9vw,14px);border-radius:3px;">
            <span class="msym" style="font-size:clamp(10px,.85vw,14px);">location_on</span> Presencial Murcia
          </span>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S4 — METODOLOGÍA
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s4">
  <!-- S4: rotación +20° — esquina superior izquierda, apoyada -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:32vw;top:-6vh;left:-8vw;opacity:.055;transform:rotate(20deg);transform-origin:center center;" alt="">
  <div class="photo-r">
    <img src="../doc/Marketing Digital/10042023-317A8264.jpg" alt="Metodología ENAE">
  </div>
  <div class="inner">
    <span class="ey" data-a>Cómo aprenderás</span>
    <div class="tm" data-a>
      <span class="tb" style="font-size:var(--t-hero);">Metodología</span>
      <span class="ti" style="font-size:var(--t-hero);">360 Learning.</span>
    </div>
    <div class="rule" data-a></div>
    <p data-a style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.70);line-height:1.75;max-width:42vw;margin-bottom:var(--sp-md);">
      <em style="font-family:var(--fs);font-style:italic;color:#fff;">Learning by doing</em> — experiencia práctica, contacto con el mundo empresarial y apoyo tutorizado en cada paso.
    </p>
    <div class="pg" style="max-width:58%;margin-bottom:var(--sp-md);">
      <div class="pc"><div class="pi"><span class="msym">analytics</span></div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.3;">Mundo empresarial real</div></div>
      <div class="pc"><div class="pi"><span class="msym">school</span></div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.3;">Clases magistrales</div></div>
      <div class="pc"><div class="pi"><span class="msym">laptop</span></div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.3;">Campus virtual</div></div>
      <div class="pc"><div class="pi"><span class="msym">desktop_windows</span></div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.3;">Aulas con tecnología</div></div>
      <div class="pc pw"><div class="pi"><span class="msym">rocket_launch</span></div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-sm);color:#fff;line-height:1.3;">Proyecto final: Business Plan real</div></div>
    </div>
    <div data-a>
      <div class="lbl lbl-gr" style="margin-bottom:var(--sp-xs);">Elige tu modalidad</div>
      <div class="mr"><span class="mt-pill" style="background:var(--gr);color:#fff;">LIVE CLASS</span><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-md);color:#fff;margin-bottom:2px;">100% Online en Directo</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.55);">Sigue las clases desde cualquier lugar en tiempo real.</div></div></div>
      <div class="mr"><span class="mt-pill" style="background:rgba(169,24,49,.5);color:#fff;">SEMIPRES.</span><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-md);color:#fff;margin-bottom:2px;">Online + Fase Presencial en Murcia</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.55);">Clases online + 2-3 semanas de inmersión en el campus.</div></div></div>
      <div class="mr"><span class="mt-pill" style="background:rgba(169,24,49,.25);color:#fff;">PRESENCIAL</span><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-md);color:#fff;margin-bottom:2px;">Clases en el Campus de Murcia</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.55);">Viernes tarde y sábado mañana.</div></div></div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S5 — EMPLEABILIDAD
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s5">
  <!-- Ghost number masivo como en p-06 -->
  <div class="gh" style="font-size:clamp(120px,16vw,300px);top:-2%;right:-1%;opacity:.055;">91</div>

  <div style="position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:center;padding:var(--py) var(--px);gap:var(--sp-lg);">
    <div>
      <span class="ey" data-a>Prácticas &amp; Empleo</span>
      <div class="tm" data-a>
        <span class="tb" style="font-size:var(--t-hero);">Tu carrera</span>
        <span class="ti" style="font-size:var(--t-hero);">empieza aquí.</span>
      </div>
      <div class="rule" data-a></div>
    </div>

    <!-- Tres KPIs masivos – Open Sans ExtraBold (estándar corporativo) -->
    <div class="k3" data-a>
      <div class="kb arc-kpi-cell">
        <!-- Arco SVG 91%: circunferencia 2π·88 ≈ 553 -->
        <svg class="arc-svg" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="5"/>
          <circle id="arc1-fill" cx="100" cy="100" r="88" fill="none" stroke="#a91831" stroke-width="5" stroke-linecap="round" stroke-dasharray="553" stroke-dashoffset="553"/>
        </svg>
        <div class="kg" id="kpi1">0<span>%</span></div>
        <div class="ks" style="font-size:var(--t-md);margin-top:var(--sp-xs);">trabajando<br>al terminar</div>
      </div>
      <div class="kb arc-kpi-cell">
        <!-- Arco SVG 82%: mismo radio -->
        <svg class="arc-svg" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="5"/>
          <circle id="arc2-fill" cx="100" cy="100" r="88" fill="none" stroke="#a91831" stroke-width="5" stroke-linecap="round" stroke-dasharray="553" stroke-dashoffset="553"/>
        </svg>
        <div class="kg" id="kpi2">0<span>%</span></div>
        <div class="ks" style="font-size:var(--t-md);margin-top:var(--sp-xs);">mejora profesional<br>demostrada</div>
      </div>
      <div class="kb arc-kpi-cell">
        <!-- Arco estático decorativo para +1K -->
        <svg class="arc-svg" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(169,24,49,.15)" stroke-width="5"/>
          <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(169,24,49,.35)" stroke-width="5" stroke-linecap="round" stroke-dasharray="553" stroke-dashoffset="110"/>
        </svg>
        <div class="kg r">+1K</div>
        <div class="ks" style="font-size:var(--t-md);margin-top:var(--sp-xs);">ofertas gestionadas<br>al año</div>
      </div>
    </div>

    <!-- Empresas -->
    <div data-a>
      <div class="lbl" style="margin-bottom:var(--sp-xs);">Empresas donde han hecho prácticas nuestros alumnos</div>
      <div style="display:flex;flex-wrap:wrap;gap:clamp(5px,.5vw,8px);margin-top:8px;">
        <span class="ctag">Hero España</span><span class="ctag">IKEA Ibérica</span>
        <span class="ctag">Grupo HEFAME</span><span class="ctag">PC Componentes</span>
        <span class="ctag">Himoinsa</span><span class="ctag">El Pozo</span>
        <span class="ctag">Rapsodia</span><span class="ctag">Medina Artigas</span>
        <span class="ctag" style="opacity:.4;">+ muchas más</span>
      </div>
    </div>
  </div>
</div>


<!-- ═══════════════════════════════════════════════════════════
     S6 — RANKINGS (Rediseño 2-page spread folleto)
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s6" style="background:var(--grd);">
  <div class="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-[6vw] md:gap-[4vw] items-stretch" style="position:relative; z-index:2; height:100%; padding:var(--py) var(--px);">
    
    <!-- LEFT COLUMN -->
    <div style="display:flex; flex-direction:column; gap:1.5vh;">
      <!-- Headers -->
      <div style="flex-shrink:0;">
        <div style="font-family:var(--fd); font-weight:900; font-size:clamp(20px,2.5vw,40px); color:#fff; letter-spacing:-.02em; line-height:1;" data-a>>>></div>
        <div class="tm" data-a style="margin-top:1vh;">
          <span class="tb" style="font-size:clamp(36px,4.5vw,68px);">Rankings</span>
        </div>
        <div data-a style="font-family:var(--fb); font-weight:700; font-size:var(--t-lg); color:#fff; line-height:1.25; margin-top:1.5vh; max-width:85%;">
          ENAE se encuentra entre las mejores Escuelas de Negocios
        </div>
      </div>
      
      <!-- Forbes -->
      <div data-a style="flex:1; margin-top:1.5vh; display:flex; flex-direction:column;">
        <div style="display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:1vh;">
          <div>
            <img src="../src/Rankings/Forbes.png" alt="Forbes" style="height:clamp(22px,2.8vw,44px); filter:brightness(0) invert(1);" onerror="this.style.display='none'">
            <div style="font-family:var(--fs); font-style:italic; font-size:var(--t-xs); color:rgba(255,255,255,.8); margin-top:2px;">Mejores Escuelas de Negocio 2025</div>
          </div>
          <span style="font-family:var(--fb); font-weight:700; color:rgba(255,255,255,.6); font-size:var(--t-md); padding-bottom:5px;">Ranking 2025</span>
        </div>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:clamp(6px,.8vh,12px);">
          <!-- Items -->
          <div style="background:rgba(255,255,255,.06); border-radius:6px; padding:1.2vh; text-align:center; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.05);">
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:var(--fd); font-size:clamp(45px,6vw,90px); color:rgba(255,255,255,.07); font-weight:900; line-height:1;">#06</div>
            <div style="position:relative; z-index:1; font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; margin-bottom:2px;">Master in International Trade</div>
            <div style="position:relative; z-index:1; font-family:var(--fs); font-style:italic; font-size:var(--t-xs); color:rgba(255,255,255,.6);">Categoría: Recién licenciados</div>
          </div>
          <div style="background:rgba(255,255,255,.06); border-radius:6px; padding:1.2vh; text-align:center; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.05);">
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:var(--fd); font-size:clamp(45px,6vw,90px); color:rgba(255,255,255,.07); font-weight:900; line-height:1;">#07</div>
            <div style="position:relative; z-index:1; font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; margin-bottom:2px;">Global Executive MBA</div>
            <div style="position:relative; z-index:1; font-family:var(--fs); font-style:italic; font-size:var(--t-xs); color:rgba(255,255,255,.6);">Categoría: Programas Ejecutivos</div>
          </div>
          <div style="background:rgba(255,255,255,.06); border-radius:6px; padding:1.2vh; text-align:center; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.05);">
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:var(--fd); font-size:clamp(45px,6vw,90px); color:rgba(255,255,255,.07); font-weight:900; line-height:1;">#12</div>
            <div style="position:relative; z-index:1; font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; margin-bottom:2px;">International MBA</div>
            <div style="position:relative; z-index:1; font-family:var(--fs); font-style:italic; font-size:var(--t-xs); color:rgba(255,255,255,.6);">Categoría: MBA</div>
          </div>
          <div style="background:rgba(255,255,255,.06); border-radius:6px; padding:1.2vh; text-align:center; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,.05);">
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-family:var(--fd); font-size:clamp(45px,6vw,90px); color:rgba(255,255,255,.07); font-weight:900; line-height:1;">#04</div>
            <div style="position:relative; z-index:1; font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; margin-bottom:2px;">Magistrae</div>
            <div style="position:relative; z-index:1; font-family:var(--fs); font-style:italic; font-size:var(--t-xs); color:rgba(255,255,255,.6);">Categoría: Alta Dirección</div>
          </div>
        </div>
      </div>
      
      <!-- Financial Mag + El Mundo -->
      <div data-a style="display:grid; grid-template-columns:1fr 1fr; gap:2vw; margin-top:2vh;">
        <div style="display:flex; flex-direction:column; justify-content:center;">
           <img src="../src/Rankings/FinancialMagazine.png" style="height:clamp(22px,2.5vw,40px); filter:brightness(0) invert(1); margin-bottom:8px; object-fit:contain; object-position:left;">
           <div style="display:flex; align-items:center; gap:10px;">
             <div style="font-family:var(--fd); font-size:clamp(28px,3.5vw,56px); color:rgba(255,255,255,.25); font-weight:900; line-height:.9;">#06</div>
             <div style="font-family:var(--fb); font-size:var(--t-xs); color:#fff; font-weight:700; line-height:1.2;">Mejores Escuelas<br>de Negocios<br>en España</div>
           </div>
        </div>
        <div style="display:flex; flex-direction:column; justify-content:center;">
           <img src="../src/Rankings/El_Mundo_logo.svg.png" style="height:clamp(16px,2vw,32px); filter:brightness(0) invert(1); margin-bottom:4px; object-fit:contain; object-position:left;">
           <div style="font-family:var(--fs); font-style:italic; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-bottom:6px;">Mejores másters Online</div>
           <div style="display:flex; gap:1vw;">
             <div>
               <div style="font-family:var(--fd); font-size:clamp(20px,2.5vw,40px); color:rgba(255,255,255,.25); font-weight:900; line-height:.9;">#02</div>
               <div style="font-family:var(--fb); font-size:var(--t-xs); color:#fff; font-weight:700; line-height:1.2; margin-top:2px;">International<br>Trade</div>
             </div>
             <div>
               <div style="font-family:var(--fd); font-size:clamp(20px,2.5vw,40px); color:rgba(255,255,255,.25); font-weight:900; line-height:.9;">#04</div>
               <div style="font-family:var(--fb); font-size:var(--t-xs); color:#fff; font-weight:700; line-height:1.2; margin-top:2px;">Dirección de<br>Agronegocios</div>
             </div>
           </div>
        </div>
      </div>
    </div>
    
    <!-- RIGHT COLUMN -->
    <div style="display:flex; flex-direction:column; gap:1.5vh;">
       <!-- QS STARS -->
       <div data-a style="display:flex; align-items:center; justify-content:center; gap:1.2vw; margin-bottom:1vh;">
         <img src="../src/Rankings/0faf3965-9e4e-419c-a4cc-2ac0a6a48783.png" style="height:clamp(45px,6vw,90px); object-fit:contain;">
         <img src="../src/Rankings/e32d12cd-861d-4634-8b5d-ca1fbae0e4db.png" style="height:clamp(26px,3.5vw,52px); object-fit:contain;">
         <img src="../src/Rankings/b3b7e495-1f79-4615-97b7-688792bd45fd.png" style="height:clamp(26px,3.5vw,52px); object-fit:contain;">
         <img src="../src/Rankings/6db43692-2cf3-407f-b674-75311166e7cf.png" style="height:clamp(26px,3.5vw,52px); object-fit:contain;">
         <img src="../src/Rankings/2950d6d7-9af8-4583-9c77-d8240f953611.png" style="height:clamp(26px,3.5vw,52px); object-fit:contain;">
       </div>
       
       <!-- QS GRID -->
       <div style="flex:1; display:grid; grid-template-columns:1fr 1fr; gap:clamp(6px,.8vh,12px); grid-auto-rows:1fr;">
         <!-- 10 IA -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#10</div>
            <img src="../src/Rankings/99f03286-f60a-47a4-8774-bccf8abcbbdb.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">Máster en<br>IA y Data Science</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 06 Logistica -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#06</div>
            <img src="../src/Rankings/99f03286-f60a-47a4-8774-bccf8abcbbdb.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">Máster en<br>Logística y Operaciones</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 06 GEMBA -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#06</div>
            <img src="../src/Rankings/QS Executive MBA Rankings - Europe - 2026 - Badge.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">Global<br>Executive MBA</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 09 Marketing -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#09</div>
            <img src="../src/Rankings/99f03286-f60a-47a4-8774-bccf8abcbbdb.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">Máster en<br>Marketing Digital</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 08 Finanzas -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#08</div>
            <img src="../src/Rankings/99f03286-f60a-47a4-8774-bccf8abcbbdb.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">Máster en<br>Finanzas y Fintech</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 03 International Trade -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#03</div>
            <img src="../src/Rankings/qs_international_trade.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">International<br>Trade</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 13 Riesgos -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#13</div>
            <img src="../src/Rankings/99f03286-f60a-47a4-8774-bccf8abcbbdb.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">Máster en<br>Gestión de Riesgos</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
         <!-- 09 International MBA -->
         <div data-a style="background:rgba(0,0,0,.15); border-radius:6px; padding:1.2vh 1vw; display:flex; align-items:center; gap:1vw; position:relative; overflow:hidden; border:1px solid rgba(0,0,0,.1);">
            <div style="position:absolute; right:8%; top:50%; transform:translateY(-50%); font-family:var(--fd); font-size:clamp(55px,7.5vw,120px); color:rgba(255,255,255,.05); font-weight:900; line-height:1; pointer-events:none; letter-spacing:-.04em;">#09</div>
            <img src="../src/Rankings/QS Executive MBA Rankings - Europe - 2026 - Badge.png" style="height:clamp(35px,5vw,75px); object-fit:contain; z-index:1;">
            <div style="z-index:1; display:flex; flex-direction:column; justify-content:center;">
              <div style="font-family:var(--fb); font-weight:700; font-size:var(--t-sm); color:#fff; line-height:1.2;">International<br>MBA</div>
              <div style="font-family:var(--fb); font-weight:400; font-size:var(--t-xs); color:rgba(255,255,255,.6); margin-top:2px;">España</div>
            </div>
         </div>
       </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S7 — CLAUSTRO DOCENTE
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s7">
  <!-- S7: rotación -15° — arriba-derecha, suave -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:44vw;top:-8vh;right:-11vw;opacity:.065;transform:rotate(-15deg);transform-origin:center center;" alt="">
  <!-- Layout S7: flex column con flex:1 en cada fila para distribuir el espacio disponible -->
  <div class="inner" style="display:flex;flex-direction:column;gap:clamp(6px,1vh,12px);padding-bottom:calc(var(--py) + 36px);">

    <!-- Encabezado compacto — sin margin-bottom extra, el gap del flex lo gestiona -->
    <div style="flex-shrink:0;">
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:clamp(4px,.5vh,8px);">
        <div>
          <span class="ey" data-a>Claustro Docente</span>
          <div class="tm" data-a>
            <span class="tb" style="font-size:var(--t-title);">Aprende de</span>
            <span class="ti" style="font-size:var(--t-title);">los mejores.</span>
          </div>
        </div>
        <div data-a style="text-align:right;">
          <div class="lbl">+150 profesores</div>
          <div style="font-family:var(--fs);font-style:italic;font-size:var(--t-md);color:rgba(255,255,255,.55);">nacionales e internacionales</div>
        </div>
      </div>
      <div class="rule" data-a></div>
    </div>

    
    <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,.7vw,12px);min-height:0;">
      ${(d.faculty || []).map(f => `
      <div class="pcard" data-a style="display:flex;flex-direction:column;">
        <div class="pw-img" style="flex:1;min-height:0;padding-top:0;border-radius:clamp(6px,.6vw,12px) clamp(6px,.6vw,12px) 0 0;">
          <img src="${escapeHtml(f.avatar)}" alt="${escapeHtml(f.name)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 18%;">
        </div>
        <div class="pinfo"><div class="pname">${escapeHtml(f.name)}</div><div class="prole">${escapeHtml(f.role)}</div></div>
      </div>
      `).join('')}
    </div>
    
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S8 — PERFIL + ADMISIÓN
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s8">
  <!-- S8: rotación +25° — abajo-izquierda, inclinada hacia arriba -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:36vw;bottom:-8vh;left:-9vw;opacity:.065;transform:rotate(25deg);transform-origin:center center;" alt="">
  <div class="inner grid grid-cols-1 md:grid-cols-2 gap-[8vw] md:gap-[5vw] items-center" style="min-height:100%;">
      <!-- Izquierda: Perfil del alumno -->
      <div>
        <span class="ey" data-a>¿A quién va dirigido?</span>
        <div class="tm" data-a>
          <span class="tb" style="font-size:var(--t-title);">Perfil del</span>
          <span class="ti" style="font-size:var(--t-title);">alumno.</span>
        </div>
        <div class="rule" data-a></div>
        <div data-a style="margin-bottom:var(--sp-md);">
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:var(--sp-xs);"><span style="color:var(--gr);font-weight:900;font-size:var(--t-lg);flex-shrink:0;margin-top:1px;">›</span><span style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.72);line-height:1.5;">Directivos y ejecutivos de Marketing, Ventas y Agencias</span></div>
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:var(--sp-xs);"><span style="color:var(--gr);font-weight:900;font-size:var(--t-lg);flex-shrink:0;margin-top:1px;">›</span><span style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.72);line-height:1.5;">Profesionales de Innovación, I+D y Operaciones</span></div>
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:var(--sp-xs);"><span style="color:var(--gr);font-weight:900;font-size:var(--t-lg);flex-shrink:0;margin-top:1px;">›</span><span style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.72);line-height:1.5;">Emprendedores en fase de desarrollo comercial</span></div>
          <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:var(--sp-xs);"><span style="color:var(--gr);font-weight:900;font-size:var(--t-lg);flex-shrink:0;margin-top:1px;">›</span><span style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.72);line-height:1.5;">Profesionales en reciclaje hacia el entorno digital</span></div>
          <div style="display:flex;gap:10px;align-items:flex-start;"><span style="color:var(--gr);font-weight:900;font-size:var(--t-lg);flex-shrink:0;margin-top:1px;">›</span><span style="font-family:var(--fb);font-weight:300;font-size:var(--t-lg);color:rgba(255,255,255,.72);line-height:1.5;">Recién graduados con vocación digital</span></div>
        </div>
        <div class="cg" data-a>
          <div class="lbl" style="margin-bottom:var(--sp-sm);">Datos de la promoción</div>
          <div class="sm-grid">
            <div>
              <div class="sm-n">44<span>%</span></div>
              <div class="sm-l">mujeres</div>
              <div class="dbar-track"><div class="dbar-fill" data-pct="44"></div></div>
            </div>
            <div>
              <div class="sm-n">9</div>
              <div class="sm-l">nacionalidades</div>
              <div class="dbar-track"><div class="dbar-fill" data-pct="90" style="background:linear-gradient(to right,rgba(169,24,49,.8),rgba(169,24,49,.4));"></div></div>
            </div>
            <div>
              <div class="sm-n">33<span>%</span></div>
              <div class="sm-l">21–26 años</div>
              <div class="dbar-track"><div class="dbar-fill" data-pct="33"></div></div>
            </div>
            <div>
              <div class="sm-n">42<span>%</span></div>
              <div class="sm-l">mando intermedio</div>
              <div class="dbar-track"><div class="dbar-fill" data-pct="42"></div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Derecha: Proceso de admisión -->
      <div>
        <span class="ey" data-a>Proceso de admisión</span>
        <div class="tm" data-a>
          <span class="tb" style="font-size:var(--t-title);">5 pasos hacia</span>
          <span class="ti" style="font-size:var(--t-title);">tu futuro.</span>
        </div>
        <div class="rule" data-a></div>
        <!-- Timeline de admisión -->
        <div class="tl">
          <div class="tl-item" data-a><div class="nb" style="flex-shrink:0;">01</div><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-lg);color:#fff;">Preinscripción online</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.5);">a través de enae.es</div></div></div>
          <div class="tl-item" data-a><div class="nb" style="flex-shrink:0;">02</div><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-lg);color:#fff;">Envío de documentación</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.5);">Revisada por el equipo académico</div></div></div>
          <div class="tl-item" data-a><div class="nb" style="flex-shrink:0;">03</div><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-lg);color:#fff;">Entrevista personal</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.5);">Con el equipo de admisiones</div></div></div>
          <div class="tl-item" data-a><div class="nb" style="flex-shrink:0;">04</div><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-lg);color:#fff;">Evaluación del comité</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.5);">Decisión del comité académico</div></div></div>
          <div class="tl-item hl" data-a><div class="nb" style="flex-shrink:0;background:var(--gr);border:none;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div><div><div style="font-family:var(--fb);font-weight:700;font-size:var(--t-lg);color:#fff;">¡Admisión confirmada!</div><div style="font-family:var(--fb);font-weight:300;font-size:var(--t-sm);color:rgba(255,255,255,.5);">Se comunica la resolución oficial</div></div></div>
        </div>
      </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════════════════════
     S9 — CIERRE / CONTACTO
     Inspirado en p-20 del dossier oficial ENAE:
     gradiente negro→granate · "E" grande y visible · logo central
     ════════════════════════════════════════════════════════ -->
<div class="slide" id="s9">
  <!-- "E" brand pattern prominente (como en p-20) -->
  <!-- S9 cierre: E gigante -20° arriba-derecha (como p-20 oficial) + E mediana +10° abajo-izquierda -->
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:54vw;top:-12vh;right:-14vw;opacity:.12;transform:rotate(-20deg);transform-origin:center center;" alt="">
  <img src="../assets/logos/SIMBOLO-ENAE-BLANCO.png" style="position:absolute;z-index:0;pointer-events:none;user-select:none;width:30vw;bottom:-7vh;left:-7vw;opacity:.08;transform:rotate(10deg);transform-origin:center center;" alt="">

  <div class="inner" style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
    <!-- Logo ENAE grande centrado (como p-20) -->
    <div data-a style="margin-bottom:var(--sp-lg);">
      <img src="../assets/logos/LOGO_ENAE_HORIZONTAL.svg" alt="ENAE International Business School"
           style="height:clamp(36px,5.5vh,72px);width:auto;filter:brightness(0) invert(1);">
    </div>

    <!-- Título + claim -->
    <div data-a style="margin-bottom:var(--sp-md);">
      <div style="font-family:var(--fb);font-weight:800;font-size:var(--t-xs);letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:var(--sp-sm);">CONTACTO</div>
      <div class="tm">
        <span class="ti" style="font-size:var(--t-sub);color:rgba(255,255,255,.55);">Lead your future</span>
      </div>
    </div>

    <!-- Grid contacto – dos columnas separadas por línea (como p-20) -->
    <div class="ct-grid" data-a>
      <div class="ct-col" style="text-align:right;">
        <div class="ct-label">Departamento de Admisiones</div>
        <div class="ct-val"><strong>+34 968 899 899</strong></div>
        <div class="ct-val">admisiones@enae.es</div>
      </div>
      <div class="ct-div"></div>
      <div class="ct-col" style="text-align:left;">
        <div class="ct-label">Campus ENAE</div>
        <div class="ct-val"><strong>www.enae.es</strong></div>
        <div class="ct-val">Espinardo, Murcia, España</div>
      </div>
    </div>

    <!-- Botones CTA -->
    <div data-a style="display:flex;gap:1.2vw;margin-top:var(--sp-lg);">
      <a href="https://www.enae.es" class="btn" target="_blank" style="display:inline-flex;align-items:center;gap:.5vw;">
        <span class="msym" style="font-size:var(--t-lg);">arrow_forward</span>Solicitar información
      </a>
      <a href="https://www.enae.es" class="btn btn-ol" target="_blank" style="display:inline-flex;align-items:center;gap:.5vw;">
        <span class="msym" style="font-size:var(--t-lg);">download</span>Descargar dossier
      </a>
    </div>

    <!-- Strip KPIs de cierre -->
    <div data-a style="display:flex;gap:0;border-top:1px solid rgba(255,255,255,.12);padding-top:var(--sp-md);margin-top:var(--sp-md);width:100%;max-width:60vw;justify-content:center;">
      <div style="flex:1;text-align:center;border-right:1px solid rgba(255,255,255,.1);padding:0 clamp(8px,1vw,16px);">
        <div class="kn" style="font-size:clamp(20px,2.4vw,42px);">91%</div>
        <div class="ks" style="font-size:var(--t-xs);">empleabilidad</div>
      </div>
      <div style="flex:1;text-align:center;border-right:1px solid rgba(255,255,255,.1);padding:0 clamp(8px,1vw,16px);">
        <div class="kn" style="font-size:clamp(20px,2.4vw,42px);color:var(--gr);">#9</div>
        <div class="ks" style="font-size:var(--t-xs);">QS España</div>
      </div>
      <div style="flex:1;text-align:center;padding:0 clamp(8px,1vw,16px);">
        <div class="kn" style="font-size:clamp(20px,2.4vw,42px);">+37</div>
        <div class="ks" style="font-size:var(--t-xs);">años de excelencia</div>
      </div>
    </div>
  </div>
</div>

<!-- NAVEGACIÓN -->
<div id="nav">
  <button class="arr" onclick="go(cur-1)">‹</button>
  <button class="dot on"  onclick="go(0)"></button>
  <button class="dot"     onclick="go(1)"></button>
  <button class="dot"     onclick="go(2)"></button>
  <button class="dot"     onclick="go(3)"></button>
  <button class="dot"     onclick="go(4)"></button>
  <button class="dot"     onclick="go(5)"></button>
  <button class="dot"     onclick="go(6)"></button>
  <button class="dot"     onclick="go(7)"></button>
  <button class="dot"     onclick="go(8)"></button>
  <button class="arr" onclick="go(cur+1)">›</button>
</div>
</div><!-- #app -->


    </div>
    `;

    mount.innerHTML = html;

    // Execute the slider script
    setTimeout(() => {
        
const N = 9;
let cur = 0, busy = false;
const SL = document.querySelectorAll('.slide');
const DT = document.querySelectorAll('.dot');

function go(n) {
  if (busy || n < 0 || n >= N || n === cur) return;
  busy = true;
  const out = SL[cur], inn = SL[n], d = n > cur ? 1 : -1;

  inn.querySelectorAll('[data-a]').forEach(e => { e.style.opacity='0'; e.style.transform=''; });

  anime({ targets:out, opacity:[1,0], translateX:[0,-48*d], duration:380, easing:'easeInQuart',
    complete:()=>{ out.classList.remove('on'); out.style.cssText=''; }
  });
  inn.style.opacity='0'; inn.style.transform=`translateX(${48*d}px)`;
  inn.classList.add('on');
  anime({ targets:inn, opacity:[0,1], translateX:[48*d,0], duration:460, easing:'easeOutQuart',
    complete:()=>{ busy=false; cur=n; ui(); anim(n); }
  });
}

function ui() {
  document.getElementById('ctr').textContent = String(cur+1).padStart(2,'0')+' / '+String(N).padStart(2,'0');
  document.getElementById('bar').style.width = ((cur+1)/N*100)+'%';
  DT.forEach((d,i)=>d.classList.toggle('on',i===cur));
}

/* ── Animaciones por slide ────────────────────────── */
function anim(n) {
  const s = SL[n], da = Array.from(s.querySelectorAll('[data-a]'));

  const stg = (tgts, opts={}) => anime({ targets:tgts, opacity:[0,1], translateY:[18,0], easing:'easeOutQuart', duration:480, ...opts });

  switch(n) {
    case 0: // PORTADA
      // foto entra primero, luego contenido escalonado
      anime({ targets:s.querySelector('.bg'), opacity:[0,1], scale:[1.06,1], duration:900, easing:'easeOutCubic' });
      anime.timeline({ easing:'easeOutQuart' })
        .add({ targets:da[0], opacity:[0,1], translateY:[-12,0], duration:500 }, 200)   // logo
        .add({ targets:da[1], opacity:[0,1], translateX:[ 16,0], duration:400 }, 320)   // pill
        .add({ targets:da[2], opacity:[0,1], translateY:[ 30,0], duration:650 }, 500)   // título
        .add({ targets:da[3], opacity:[0,1], translateY:[ 14,0], duration:500 }, 870)   // mención serif
        .add({ targets:da[4], opacity:[0,1], translateY:[ 14,0], duration:500 }, 960)   // rule
        .add({ targets:da[5], opacity:[0,1], translateY:[ 14,0], duration:500 }, 1040)  // doble título
        .add({ targets:da[6], opacity:[0,1], translateY:[ 10,0], duration:500 }, 1160); // KPI strip
      break;

    case 1: // QUÉ ES
      stg(da, { delay:anime.stagger(110) });
      break;

    case 2: // PROGRAMA
      // da[0..3] = ey, tm, rule, lbl-resumen (todos en el encabezado izquierdo)
      stg(da.slice(0,4), { delay:anime.stagger(80) });
      // módulos: cada .mc[data-a] entra escalonado con bounce
      anime({ targets:s.querySelectorAll('.mc[data-a]'), opacity:[0,1], translateY:[12,0],
        scale:[0.97,1], delay:anime.stagger(45,{start:280}), duration:340, easing:'easeOutBack' });
      // columna derecha: ia-box, stats, modalidades entran desde la derecha
      anime({ targets:[da[da.length-3], da[da.length-2], da[da.length-1]],
        opacity:[0,1], translateX:[22,0],
        delay:anime.stagger(100,{start:360}), duration:480, easing:'easeOutQuart' });
      break;

    case 3: // METODOLOGÍA – da[] ya no incluye .pg (quitado data-a del padre)
      stg(da, { delay:anime.stagger(100) });
      // pillar cards entran tras el stagger del body text (~400ms)
      anime({ targets:s.querySelectorAll('.pc'), opacity:[0,1], translateY:[16,0],
        delay:anime.stagger(60,{start:420}), duration:360, easing:'easeOutBack' });
      break;

    case 4: // EMPLEABILIDAD – contadores + arcos SVG animados
      stg(da, { delay:anime.stagger(100) });
      setTimeout(() => {
        const C = 553; // circunferencia 2π·88
        const count = (id, arcId, to) => {
          anime({ targets:{v:0}, v:to, duration:1400, easing:'easeOutCubic', round:1,
            update: a => { document.getElementById(id).innerHTML = Math.round(a.animations[0].currentValue)+'<span>%</span>'; }
          });
          anime({ targets: document.getElementById(arcId),
            strokeDashoffset: [C, C * (1 - to / 100)],
            duration: 1500, easing: 'easeOutCubic'
          });
        };
        count('kpi1', 'arc1-fill', 91);
        count('kpi2', 'arc2-fill', 82);
      }, 350);
      break;

    case 5: // RANKINGS – 2 cols stretch, da[] = ey,tm,rule + hero + mini-media + 2-badge-rows + years + acred + panamerican
      stg(da.slice(0,3), { delay:anime.stagger(80) });  // título
      stg([da[3]], { delay:80*3, duration:500 });        // hero #9 card
      stg([da[4]], { delay:80*4 });                      // El Mundo / FM
      // badges entran desde arriba con un ligero scale
      anime({ targets:[da[5],da[6]], opacity:[0,1], translateY:[-18,0], scale:[.94,1],
        delay:anime.stagger(120,{start:80*3}), duration:480, easing:'easeOutBack' });
      // resto: años, acreditaciones, panamerican
      stg(da.slice(7), { delay:anime.stagger(90,{start:80*5}) });
      // número héroe bounce — después de que la card sea visible
      anime({ targets:s.querySelector('.rk-hero-n'), opacity:[0,1], scale:[.76,1],
        duration:620, easing:'easeOutBack', delay:600 });
      break;

    case 6: // CLAUSTRO – data-a en cada pcard directamente
      // Encabezado: ey, tm, stat-derecha, rule = da[0..3]
      stg([da[0],da[1],da[2],da[3]], { delay:anime.stagger(80) });
      // Fotos: cada .pcard[data-a] = da[4..10]
      anime({ targets:s.querySelectorAll('.pcard[data-a]'), opacity:[0,1], translateY:[22,0], scale:[.95,1],
        delay:anime.stagger(52,{start:220}), duration:400, easing:'easeOutBack' });
      break;

    case 7: // PERFIL + ADMISIÓN
      stg(da.slice(0,8), { delay:anime.stagger(80) });
      // timeline items con stagger desde la izquierda
      anime({ targets:da.slice(8), opacity:[0,1], translateX:[-16,0],
        delay:anime.stagger(80,{start:300}), duration:380, easing:'easeOutQuart' });
      // barras demográficas
      setTimeout(() => {
        s.querySelectorAll('.dbar-fill').forEach(bar => {
          bar.style.width = (bar.dataset.pct || 0) + '%';
        });
      }, 500);
      break;

    case 8: // CIERRE – logo grande primero, luego contenido
      anime.timeline({ easing:'easeOutQuart' })
        .add({ targets:da[0], opacity:[0,1], scale:[.92,1], duration:600 }, 0)
        .add({ targets:da[1], opacity:[0,1], translateY:[14,0], duration:500 }, 250)
        .add({ targets:da[2], opacity:[0,1], translateY:[14,0], duration:500 }, 400)
        .add({ targets:da[3], opacity:[0,1], translateY:[10,0], duration:500 }, 550);
      setTimeout(()=>{
        anime({ targets:s.querySelectorAll('.btn'), scale:[1,1.04,1],
          delay:anime.stagger(60), duration:500, easing:'easeInOutSine' });
      }, 900);
      break;

    default:
      stg(da, { delay:anime.stagger(90) });
  }
}

/* ── Teclado + touch ──────────────────────────────── */
document.addEventListener('keydown', e => {
  if (['ArrowRight','ArrowDown',' '].includes(e.key)) { e.preventDefault(); go(cur+1); }
  if (['ArrowLeft','ArrowUp'].includes(e.key))        { e.preventDefault(); go(cur-1); }
});
let tx=0;
document.addEventListener('touchstart', e=>{ tx=e.touches[0].clientX; },{passive:true});
document.addEventListener('touchend',   e=>{ const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>50) go(cur+(dx<0?1:-1)); },{passive:true});

/* ── Init ──────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', ()=>{ ui(); anim(0); });

    }, 100);
}

// --- Testimonial slide switcher ---
window.slideTestimonial = function(direction) {
    if (!state.currentDossier) return;

    const len = state.currentDossier.testimonials.length;
    activeTestimonialIndex = (activeTestimonialIndex + direction + len) % len;

    const container = document.querySelector(".testimonial-container");
    if (!container) return;

    let slidesHtml = "";
    state.currentDossier.testimonials.forEach((test, idx) => {
        const isActive = idx === activeTestimonialIndex;
        slidesHtml += `
            <div class="testimonial-slide ${isActive ? 'active' : ''}">
                <p class="testimonial-quote">${escapeHtml(test.text)}</p>
                <div class="testimonial-author">
                    <img class="testimonial-author-avatar" src="${escapeHtml(test.avatar)}" alt="${escapeHtml(test.author)}" onerror="this.src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80'" />
                    <div class="testimonial-author-info">
                        <h6 style="color: var(--enae-negro); font-weight:700;">${escapeHtml(test.author)}</h6>
                        <span>${escapeHtml(test.role)}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = slidesHtml;
};

// --- HTML escape utility ---
function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.addEventListener("DOMContentLoaded", initApp);
window.initApp = initApp;
