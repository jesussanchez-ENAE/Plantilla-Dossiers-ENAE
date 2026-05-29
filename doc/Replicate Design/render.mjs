import { createServer } from 'vite';
import fs from 'fs';
import path from 'path';

async function render() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  try {
    // Load the App module
    const { default: App } = await vite.ssrLoadModule('/src/app/App.tsx');
    const { renderToString } = await vite.ssrLoadModule('react-dom/server');
    const React = await vite.ssrLoadModule('react');

    // Render Rankings
    const htmlRankings = renderToString(React.createElement(App, { page: 'Rankings' }));
    fs.writeFileSync('rankings.html', htmlRankings);

    // Render ExperienciaEnae
    const htmlExperiencia = renderToString(React.createElement(App, { page: 'ExperienciaEnae' }));
    fs.writeFileSync('experiencia.html', htmlExperiencia);

    console.log("Render successful!");
  } catch (e) {
    console.error(e);
  } finally {
    vite.close();
  }
}

render();
