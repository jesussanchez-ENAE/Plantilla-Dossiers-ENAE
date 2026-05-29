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
function initApp() {
    const saved = localStorage.getItem("enae_dossiers");
    if (saved) {
        try {
            state.dossiers = JSON.parse(saved);
        } catch (e) {
            console.error("Error loading saved dossiers, resetting.", e);
            state.dossiers = [];
        }
    } else {
        state.dossiers = JSON.parse(JSON.stringify(PRESET_TEMPLATES));
        saveStateToLocalStorage();
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

window.updateThemeConfig = function(key, val) {
    if (!state.currentDossier) return;
    state.currentDossier[key] = val;
    renderDossierHighFidelity();
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




function renderDossierHighFidelity() {
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

    let modulesHtml = "";
    if (d.modules) {
        d.modules.forEach(m => {
            modulesHtml += `
            <div class="card-glass" style="padding:14px 16px;">
                <div style="font-size:10px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.50);margin-bottom:5px;">${escapeHtml(m.ects || '')} ECTS</div>
                <div style="font-weight:700;font-size:12.5px;color:#fff;line-height:1.3;">${escapeHtml(m.title)}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:5px;">${escapeHtml(m.desc || '')}</div>
            </div>`;
        });
    }

    let facultyHtml = "";
    if (d.faculty) {
        d.faculty.forEach(f => {
            facultyHtml += `
            <div style="display:flex;align-items:center;gap:12px;">
                <img src="${escapeHtml(f.avatar)}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;border:2px solid var(--granate);" />
                <div>
                    <div style="font-weight:700;font-size:13px;color:#fff;">${escapeHtml(f.name)}</div>
                    <div style="font-size:11px;color:rgba(255,255,255,0.6);">${escapeHtml(f.role)}</div>
                </div>
            </div>`;
        });
    }

    let testimonialsHtml = "";
    if (d.testimonials && d.testimonials.length > 0) {
        const t = d.testimonials[0];
        testimonialsHtml = `
        <div style="margin-top:40px;padding:30px;background:rgba(255,255,255,0.05);border-radius:12px;border-left:4px solid var(--granate);">
            <div style="font-size:16px;font-style:italic;color:#fff;margin-bottom:15px;">"${escapeHtml(t.text)}"</div>
            <div style="display:flex;align-items:center;gap:12px;">
                <img src="${escapeHtml(t.avatar)}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;" />
                <div>
                    <div style="font-weight:700;font-size:12px;color:#fff;">${escapeHtml(t.author)}</div>
                    <div style="font-size:10px;color:rgba(255,255,255,0.5);">${escapeHtml(t.role)}</div>
                </div>
            </div>
        </div>`;
    }

    const html = `
    <div class="page" style="width: 794px; min-height: 1123px; margin: 0 auto 4px; position: relative; overflow: hidden; background: var(--negro); color: var(--blanco); font-family: var(--font-body);">
        
        <!-- COVER -->
        <div style="position:relative; height:1123px; padding: 60px;">
            <div class="cover-overlay" style="position:absolute;inset:0;background:linear-gradient(140deg, rgba(32,34,33,0.97) 0%, rgba(32,34,33,0.60) 42%, rgba(169,24,49,0.82) 100%);z-index:1;"></div>
            <img src="${escapeHtml(d.coverPhoto)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;" />
            
            <div style="position:relative; z-index:2; height:100%; display:flex; flex-direction:column; justify-content:center;">
                <div style="display:inline-block; background:var(--blanco); color:var(--negro); border-radius:999px; padding:8px 20px; font-weight:700; font-size:12px; margin-bottom:20px; width:max-content;">${escapeHtml(d.category || 'Programa')}</div>
                <h1 style="font-family:var(--font-body); font-weight:800; font-size:55px; line-height:1.0; margin:0; letter-spacing:-1px;">${escapeHtml(d.title)}</h1>
                <div style="font-family:var(--font-serif); font-style:italic; font-size:35px; color:var(--granate); margin-top:10px;">${escapeHtml(d.subtitle || '')}</div>
                
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:60px; padding-top:40px; border-top:1px solid rgba(255,255,255,0.2);">
                    <div>
                        <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.5);">Duración</div>
                        <div style="font-weight:800; font-size:18px;">${escapeHtml(d.duration)}</div>
                    </div>
                    <div>
                        <div style="font-size:10px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.5);">Formato</div>
                        <div style="font-weight:800; font-size:18px;">${escapeHtml(d.format)}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- INTRO -->
        <div style="padding: 60px; background:var(--negro);">
            <div style="font-size:14px; color:var(--granate); font-family:var(--font-serif); font-style:italic; margin-bottom:10px;">Introducción al programa</div>
            <h2 style="font-size:36px; font-weight:800; line-height:1.1; margin:0 0 30px 0;">${escapeHtml(d.introTitle)}</h2>
            <div style="font-size:16px; font-weight:700; color:#fff; line-height:1.5; margin-bottom:20px;">${escapeHtml(d.introText)}</div>
            <div style="font-size:14px; font-weight:300; color:rgba(255,255,255,0.7); line-height:1.6;">${escapeHtml(d.introTextSecondary)}</div>
            ${testimonialsHtml}
        </div>

        <!-- MODULES -->
        <div style="padding: 60px; background:#111;">
            <div style="font-size:14px; color:var(--granate); font-family:var(--font-serif); font-style:italic; margin-bottom:10px;">Programa Académico</div>
            <h2 style="font-size:36px; font-weight:800; line-height:1.1; margin:0 0 30px 0;">Todo lo que aprenderás.</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                ${modulesHtml}
            </div>
        </div>

        <!-- FACULTY -->
        <div style="padding: 60px; background:var(--negro);">
            <div style="font-size:14px; color:var(--granate); font-family:var(--font-serif); font-style:italic; margin-bottom:10px;">Claustro Docente</div>
            <h2 style="font-size:36px; font-weight:800; line-height:1.1; margin:0 0 30px 0;">Aprende de los mejores.</h2>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
                ${facultyHtml}
            </div>
        </div>

    </div>
    `;
    mount.innerHTML = html;
}

// --- Dynamic Event: SVG placements select ---
window.toggleSectorSelection = function(index) {
    activeSectorIndex = index;
    renderDossierHighFidelity();
};

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
    if (!unsafe) return "";
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.addEventListener("DOMContentLoaded", initApp);
window.initApp = initApp;
