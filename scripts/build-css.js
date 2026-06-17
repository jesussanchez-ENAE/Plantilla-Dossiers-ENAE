#!/usr/bin/env node
/*
 * Replaces the Tailwind Play CDN runtime (cdn.tailwindcss.com) with a
 * statically pre-compiled stylesheet, per file.
 *
 * Why: the CDN script recompiles the whole page's CSS via a MutationObserver
 * on every DOM mutation. Combined with the editor's full innerHTML re-render
 * on every keystroke, that meant a full Tailwind JIT pass per keystroke.
 * Pre-compiling removes the runtime compiler entirely.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');

const ROOT = path.join(__dirname, '..');
const CONFIG = path.join(ROOT, 'tailwind.config.js');

const TARGETS = [
  { file: 'index.html', kind: 'html' },
  { file: 'app.js', kind: 'js' },
  { file: 'dossiers/_PLANTILLA-BASE.html', kind: 'html' },
  { file: 'dossiers/master-marketing-digital-ia.html', kind: 'html' },
  { file: 'dossiers/master-rrhh-ia.html', kind: 'html' },
];

const STYLE_BLOCK_RE = /<style type="text\/tailwindcss">([\s\S]*?)<\/style>/;
const CDN_SCRIPT_RE = /\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>\n?/;

function compile(rawCss) {
  const tmpIn = path.join(os.tmpdir(), `tw-in-${process.pid}-${Date.now()}.css`);
  const tmpOut = path.join(os.tmpdir(), `tw-out-${process.pid}-${Date.now()}.css`);
  fs.writeFileSync(tmpIn, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' + rawCss);
  try {
    execFileSync(
      path.join(ROOT, 'node_modules', '.bin', 'tailwindcss'),
      ['-i', tmpIn, '-o', tmpOut, '-c', CONFIG, '--minify'],
      { cwd: ROOT, stdio: 'pipe' }
    );
    return fs.readFileSync(tmpOut, 'utf-8').trim();
  } finally {
    fs.rmSync(tmpIn, { force: true });
    fs.rmSync(tmpOut, { force: true });
  }
}

let totalBefore = 0, totalAfter = 0;

for (const { file } of TARGETS) {
  const filePath = path.join(ROOT, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  const match = content.match(STYLE_BLOCK_RE);
  if (!match) {
    console.log(`[skip] ${file}: no <style type="text/tailwindcss"> block found (already migrated?)`);
    continue;
  }

  const rawCss = match[1];
  let compiled = compile(rawCss);

  if (compiled.includes('`') || compiled.includes('${')) {
    throw new Error(`${file}: compiled CSS contains backtick/template syntax — unsafe to inline, aborting.`);
  }

  // When the style block lives inside a JS template literal (app.js), CSS escape
  // sequences like \[ or \2c (from Tailwind's arbitrary-value class names) would
  // otherwise be parsed as JS escape sequences and break the file.
  if (TARGETS.find(t => t.file === file).kind === 'js') {
    compiled = compiled.replace(/\\/g, '\\\\');
  }

  content = content.replace(STYLE_BLOCK_RE, `<style>${compiled}</style>`);
  content = content.replace(CDN_SCRIPT_RE, '\n');

  fs.writeFileSync(filePath, content, 'utf-8');

  totalBefore += rawCss.length;
  totalAfter += compiled.length;
  console.log(`[ok] ${file}: ${rawCss.length}B source -> ${compiled.length}B compiled, CDN script removed`);
}

console.log(`\nDone. ${totalBefore}B -> ${totalAfter}B total across ${TARGETS.length} targets.`);
