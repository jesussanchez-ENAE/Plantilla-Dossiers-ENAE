================================================================================
ENAE DOSSIER STUDIO - DOCUMENTACIÓN TÉCNICA Y DE DESPLIEGUE
================================================================================

1. INFORMACIÓN TÉCNICA GENERAL
--------------------------------------------------------------------------------
Este proyecto es una aplicación web full-stack diseñada para la generación 
interactiva de dossiers para ENAE Business School.

* Arquitectura: 
  - Frontend: HTML5, TailwindCSS, JavaScript Vanilla (app.js).
  - Backend: Node.js con Express (server.js).
* Dependencias clave (Backend):
  - puppeteer: Generación y exportación de archivos PDF.
  - multer: Gestión de subida de archivos e imágenes.
  - pdf-parse / mammoth: Lectura y extracción de texto de PDFs y archivos Word (DOCX).
  - @21st-sdk/agent: Integración de IA (Anthropic) para procesamiento de contenido.
* Almacenamiento:
  - Temporal (Memoria): Los documentos de referencia subidos para la IA se procesan en memoria.
  - Persistente (Disco): Las fotos de los profesores, logos y material subido desde el CMS se guardan en la carpeta local `/uploads`.

2. REQUISITOS PREVIOS
--------------------------------------------------------------------------------
- Node.js (v18.x o superior recomendado).
- NPM (Incluido con Node.js).
- Para el servidor de producción: Sistema operativo basado en Linux/Ubuntu (recomendado).

3. INSTALACIÓN EN MODO DESARROLLO (LOCAL)
--------------------------------------------------------------------------------
Paso 1: Clonar el repositorio y abrir la carpeta.
Paso 2: Instalar dependencias de Node.js:
    $ npm install

Paso 3: Configurar variables de entorno:
    - Duplica el archivo `.env.example` y renómbralo a `.env`.
    - Edita el archivo `.env` y añade tu clave de Anthropic (y opcionalmente cambia el puerto):
      ANTHROPIC_API_KEY=sk-ant-tu-clave-api-aqui
      PORT=3000

Paso 4: Iniciar el servidor local:
    $ npm start

    La aplicación principal estará en: http://localhost:3000
    El panel de gestión (CMS) estará en: http://localhost:3000/manager.html

4. GUÍA DE DESPLIEGUE EN SERVIDOR DE PRODUCCIÓN (VPS Linux / Ubuntu)
--------------------------------------------------------------------------------
Debido al uso de Puppeteer (Chrome en segundo plano) y a la necesidad de mantener 
la carpeta `/uploads` de manera persistente, se recomienda usar un servidor VPS propio (DigitalOcean, AWS, Hostinger, etc.).

PASO A: Preparar el Servidor y Dependencias del Sistema
1. Conéctate a tu servidor mediante SSH.
2. Actualiza los paquetes del sistema operativo:
   $ sudo apt update && sudo apt upgrade -y
3. Instala Node.js y NPM.
4. (¡IMPORTANTE!) Instala las dependencias gráficas necesarias para que Puppeteer funcione en Linux:
   $ sudo apt install -y ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 \
     libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 \
     libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 \
     libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
     libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
     libxss1 libxtst6 lsb-release wget xdg-utils

PASO B: Desplegar el Proyecto
1. Descarga el proyecto en el servidor (ej. `/var/www/enae-dossiers`).
   $ git clone <url-de-tu-repo> /var/www/enae-dossiers
   $ cd /var/www/enae-dossiers
2. Instala las dependencias:
   $ npm install
3. Crea tu archivo de entorno y configura la API Key de producción:
   $ cp .env.example .env
   $ nano .env
4. (Opcional) Compila el CSS si has hecho cambios en Tailwind:
   $ npm run build:css

PASO C: Configurar PM2 (Gestor de Procesos para Producción)
PM2 mantendrá el servidor Node.js ejecutándose 24/7 y lo reiniciará si hay fallos o si la máquina se reinicia.
1. Instala PM2 globalmente:
   $ sudo npm install -g pm2
2. Inicia el servidor Node con PM2:
   $ pm2 start server.js --name "enae-dossiers"
3. Guarda la configuración para que se inicie tras reinicios del sistema:
   $ pm2 startup
   $ pm2 save

PASO D: Proxy Inverso y Dominio HTTPS (Usando Nginx)
Para acceder a la app usando un dominio real (ej: dossiers.enae.es) y no un puerto.
1. Instala Nginx:
   $ sudo apt install -y nginx
2. Configura un Virtual Host en `/etc/nginx/sites-available/enae-dossiers` que apunte (proxy_pass) al puerto 3000 de localhost.
3. Activa el sitio y reinicia Nginx.
4. Instala un certificado SSL gratuito con Certbot:
   $ sudo apt install certbot python3-certbot-nginx
   $ sudo certbot --nginx -d dossiers.tudominio.com

5. CONSIDERACIONES DE MANTENIMIENTO
--------------------------------------------------------------------------------
- Copias de Seguridad (Backups): Haz backups regulares de la carpeta `/uploads`, ya que ahí se guardan los recursos persistentes (fotos de los profesores, portadas).
- Actualizaciones de Código: Cuando actualices el código, entra al servidor, haz `git pull`, instala nuevas dependencias (si las hay con `npm install`) y ejecuta `pm2 restart enae-dossiers`.
