#!/usr/bin/env node
/* Minimal, dependency-free static file server for self-hosting the portfolio.
 *
 * Security posture (intentional):
 *   - Binds to 127.0.0.1 only — never exposed to the LAN; only a local
 *     reverse tunnel (e.g. cloudflared) can reach it.
 *   - Serves ONLY files inside this script's own directory. Any request that
 *     resolves outside the root (path traversal) is rejected with 403.
 *   - Blocks dotfiles/dot-directories (e.g. .git) so repo internals can't leak.
 *   - Accepts GET/HEAD only.
 *
 * Usage:  node serve.js [port]        (default port 8080)
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT = __dirname;
const HOST = '127.0.0.1';
const PORT = parseInt(process.argv[2] || process.env.PORT || '8080', 10);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${HOST}`).pathname);
  } catch {
    res.writeHead(400); return res.end('Bad Request');
  }

  // block dotfiles / dot-directories (e.g. /.git/config)
  if (pathname.split('/').some(seg => seg.startsWith('.') && seg.length)) {
    res.writeHead(403); return res.end('Forbidden');
  }

  if (pathname.endsWith('/')) pathname += 'index.html';

  const filePath = path.join(ROOT, pathname);
  // ensure the resolved path stays inside ROOT (blocks ../ traversal)
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403); return res.end('Forbidden');
  }

  fs.stat(filePath, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404 — Not found</h1>');
    }
    const type = TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res).on('error', () => res.destroy());
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Portfolio served at http://${HOST}:${PORT}`);
  console.log(`Root: ${ROOT}`);
  console.log('Localhost-only — expose it with a reverse tunnel (see host.sh).');
});
