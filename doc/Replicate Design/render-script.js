import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We can't import TSX easily in pure Node without a bundler.
// We'll use Vite's SSR mode to render it!
