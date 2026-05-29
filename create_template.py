import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Remove the #form-ov block
html = re.sub(r'<!-- FORM OVERLAY -->.*?<script>', '<script>', html, flags=re.DOTALL)

# Remove the #trigger button
html = re.sub(r'<!-- TRIGGER -->.*?<!-- FULLSCREEN BUTTON -->', '<!-- FULLSCREEN BUTTON -->', html, flags=re.DOTALL)

# Replace the "Personalizar dossier" logic with standalone logic
init_script = """
        // Auto-load embedded dossier data
        window.addEventListener('DOMContentLoaded', () => {
            const dataScript = document.getElementById('dossier-data');
            if (dataScript) {
                try {
                    const data = JSON.parse(dataScript.textContent);
                    fillDossier(data);
                } catch (e) {
                    console.error("Error parsing dossier data", e);
                }
            }
        });
"""

# Insert the init script before the first function
html = html.replace('function openForm() {', init_script + '\n        function openForm() {')

with open('template.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("template.html created")
