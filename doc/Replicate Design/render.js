import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

// We need to transpile or use ts-node to run the React components, 
// but wait, they are already compiled in dist/assets/index-CD9HoXJU.js!
// However, the compiled JS is a client-side bundle that expects window/document.
