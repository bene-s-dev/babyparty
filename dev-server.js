// Local Node.js Development Server supporting Vercel Serverless Functions (/api/*)
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Load environment variables from .env.local or .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
      break;
    }
  }

  // Sensible local defaults if not set in .env
  if (!process.env.DEV_PASSWORD) {
    process.env.DEV_PASSWORD = 'baby2026';
    console.log('[Dev Server] DEV_PASSWORD not set in env, defaulting to: baby2026');
  }

}

loadEnv();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Add Vercel response helper methods
  res.status = function(code) {
    res.statusCode = code;
    return res;
  };
  res.json = function(data) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
    return res;
  };

  // Route API requests to serverless handlers
  if (pathname.startsWith('/api/')) {
    const apiName = pathname.replace(/^\/api\//, '').replace(/\.js$/, '');
    const apiFile = path.join(__dirname, 'api', `${apiName}.js`);

    if (fs.existsSync(apiFile)) {
      // Collect request body
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', async () => {
        const bodyBuffer = Buffer.concat(chunks);
        const bodyStr = bodyBuffer.toString('utf8');
        try {
          req.body = bodyStr ? JSON.parse(bodyStr) : {};
        } catch {
          req.body = bodyStr;
        }

        try {
          delete require.cache[require.resolve(apiFile)];
          const handler = require(apiFile);
          await handler(req, res);
        } catch (err) {
          console.error('[API Error]', err);
          if (!res.writableEnded) {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
          }
        }
      });
      return;
    } else {
      return res.status(404).json({ error: 'API route not found' });
    }
  }

  // Static file serving
  if (pathname === '/') pathname = '/index.html';
  const safePath = path.normalize(decodeURIComponent(pathname)).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Support HTTP Range requests (crucial for smooth video playback)
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
      });
      file.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Local dev server running on http://127.0.0.1:${PORT}`);
  console.log(`Ready to serve static files and /api/* serverless endpoints.`);
});
