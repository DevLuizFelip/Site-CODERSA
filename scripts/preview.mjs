// Preview the same explicit routes and SPA fallback declared in vercel.json.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { metadata } from '../src/site/content.js';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const args = process.argv.slice(2);
const option = (name, fallback) => args.includes(name) ? args[args.indexOf(name) + 1] : fallback;
const port = Number(option('--port', '4173'));
const host = option('--host', '127.0.0.1');
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.xml': 'application/xml', '.json': 'application/json', '.txt': 'text/plain' };
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${host}:${port}`);
    const route = decodeURIComponent(url.pathname).replace(/\/+$/, '') || '/';
    if (route.startsWith('/api/')) { response.writeHead(501, { 'Content-Type': 'application/json' }); response.end('{"success":false,"message":"Local preview does not run the Python API."}'); return; }
    let relative = metadata[route] ? (route === '/' ? 'index.html' : `${route.slice(1)}/index.html`) : route.slice(1);
    let target = path.resolve(root, relative);
    if (!target.startsWith(root)) { response.writeHead(403); response.end(); return; }
    try { if (!(await stat(target)).isFile()) throw new Error('Not a file'); }
    catch {
      if (path.extname(relative)) { response.writeHead(404); response.end('Not found'); return; }
      target = path.join(root, 'spa.html');
    }
    const contents = await readFile(target);
    response.writeHead(200, { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    response.end(contents);
  } catch { response.writeHead(400); response.end('Bad request'); }
}).listen(port, host, () => console.log(`Local: http://${host}:${port}/`));
