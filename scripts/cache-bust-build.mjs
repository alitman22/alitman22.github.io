import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const buildVersion = `v${Date.now().toString(36)}`;
const files = ['dist/index.html', 'dist/stats.html'];

for (const relativePath of files) {
  const absolutePath = resolve(process.cwd(), relativePath);
  let html = readFileSync(absolutePath, 'utf8');

  html = html.replace(/((?:\.\/)?assets\/[^?"'\s]+)(?:[?&][^"'\s]+)?/g, (match, assetPath) => `${assetPath}?${buildVersion}`);
  html = html.replace(/((?:\.\/)?assets\/[^?"'\s]+)(?:[?&][^"'\s]+)?/g, (match, assetPath) => `${assetPath}?${buildVersion}`);

  writeFileSync(absolutePath, html);
}
