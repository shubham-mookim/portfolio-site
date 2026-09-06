#!/usr/bin/env node
/* Minimal, dependency-free static file server. Serves ONE directory.
 *
 *   node serve.cjs <dir> [port]
 *
 * Security posture (intentional):
 *   - Binds to 127.0.0.1 only — never exposed on the LAN; only a local
 *     reverse tunnel (cloudflared) can reach it.
 *   - Serves ONLY files inside <dir>. Path traversal (../) is rejected (403).
 *   - Blocks dotfiles/dot-directories (e.g. .git) so repo internals never leak.
 *   - GET/HEAD only.
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = path.resolve(process.argv[2] || '.');
const HOST = '127.0.0.1';
const PORT = parseInt(process.argv[3] || process.env.PORT || '8080', 10);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.avif': 'image/avif',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.pdf': 'application/pdf',
  '.map': 'application/json; charset=utf-8', '.mp4': 'video/mp4', '.webm': 'video/webm',
};

/* Serve the site's own 404 page when it has one. */
function notFound(req, res) {
  const custom = path.join(ROOT, '404.html');
  fs.readFile(custom, (err, buf) => {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8',
                         'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') return res.end();
    res.end(err ? '<h1>404 — Not found</h1>' : buf);
  });
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname);
  } catch { res.writeHead(400); return res.end('Bad Request'); }

  if (pathname.split('/').some(seg => seg.startsWith('.') && seg.length)) {
    res.writeHead(403); return res.end('Forbidden');
  }
  // extensionless path without a trailing slash -> redirect to the canonical form,
  // so directory-style builds (/work/) work when someone types /work
  if (!pathname.endsWith('/') && !path.extname(pathname)) {
    if (fs.existsSync(path.join(ROOT, pathname, 'index.html'))) {
      res.writeHead(301, { Location: pathname + '/' });
      return res.end();
    }
  }
  if (pathname.endsWith('/')) pathname += 'index.html';

  const filePath = path.join(ROOT, pathname);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403); return res.end('Forbidden');
  }

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) return notFound(req, res);
    // fingerprinted build assets can be cached hard; everything else stays fresh
    const immutable = /^\/(_astro|photos)\//.test(pathname);
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res).on('error', () => res.destroy());
  });
});

if (!fs.existsSync(ROOT)) { console.error(`Directory not found: ${ROOT}`); process.exit(1); }
server.listen(PORT, HOST, () => console.log(`Serving ${ROOT} at http://${HOST}:${PORT}`));
