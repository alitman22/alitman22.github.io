import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const port = 41741;

const mimeByExt = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function sanitizePath(urlPath) {
  const cleanPath = (urlPath.split('?')[0] || '/').replace(/\\+/g, '/');
  if (cleanPath === '/') {
    return '/index.html';
  }

  return cleanPath;
}

async function serveFile(filePath) {
  try {
    const data = await readFile(filePath);
    return data;
  } catch (_error) {
    return null;
  }
}

function createStaticServer() {
  return createServer(async (req, res) => {
    const requestPath = sanitizePath(req.url || '/');
    const localPath = path.join(distDir, requestPath);
    const resolved = path.resolve(localPath);

    if (!resolved.startsWith(path.resolve(distDir))) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    let payload = await serveFile(resolved);
    let finalPath = resolved;

    if (!payload && !path.extname(resolved)) {
      finalPath = path.join(resolved, 'index.html');
      payload = await serveFile(finalPath);
    }

    if (!payload) {
      payload = await serveFile(path.join(distDir, 'index.html'));
      finalPath = path.join(distDir, 'index.html');
    }

    if (!payload) {
      res.statusCode = 404;
      res.end('Not Found');
      return;
    }

    const ext = path.extname(finalPath);
    res.setHeader('Content-Type', mimeByExt[ext] || 'application/octet-stream');
    res.end(payload);
  });
}

async function prerender() {
  const server = createStaticServer();

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('https://api.country.is')) {
        request.respond({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ country: 'US' })
        });
        return;
      }

      request.continue();
    });

    await page.goto(`http://127.0.0.1:${port}/`, {
      waitUntil: 'networkidle2'
    });

    await page.waitForSelector('#root .app-root, #root nav.navbar', {
      timeout: 15000
    });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const localOrigin = `http://127.0.0.1:${port}`;
    const html = (await page.content())
      .replaceAll(`${localOrigin}/`, './')
      .replaceAll(localOrigin, '');

    await writeFile(path.join(distDir, 'index.html'), html, 'utf8');

    await browser.close();
    console.log('Prerender complete: dist/index.html now contains rendered HTML.');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

prerender().catch((error) => {
  console.error('Prerender failed:', error);
  process.exitCode = 1;
});
