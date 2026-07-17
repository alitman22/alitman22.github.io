import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const buildVersion = `v${Date.now().toString(36)}`;
const files = ['dist/index.html', 'dist/stats.html'];

function normalizeAssetPath(assetPath) {
  if (assetPath.startsWith('./assets/main-') && assetPath.endsWith('.js')) {
    return './assets/main.js';
  }

  if (assetPath.startsWith('./assets/main-') && assetPath.endsWith('.css')) {
    return './assets/main.css';
  }

  if (assetPath.startsWith('./assets/stats-') && assetPath.endsWith('.js')) {
    return './assets/stats.js';
  }

  if (assetPath.startsWith('./assets/stats-') && assetPath.endsWith('.css')) {
    return './assets/stats.css';
  }

  return assetPath;
}

for (const relativePath of files) {
  const absolutePath = resolve(process.cwd(), relativePath);
  let html = readFileSync(absolutePath, 'utf8');

  html = html.replace(/((?:\.\/)?assets\/[^?"'\s]+)(?:[?&][^"'\s]+)?/g, (match, assetPath) => {
    const normalizedPath = normalizeAssetPath(assetPath);
    return `${normalizedPath}?${buildVersion}`;
  });

  writeFileSync(absolutePath, html);
}
