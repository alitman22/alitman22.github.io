const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const statsHtmlPath = path.join(rootDir, 'stats.html');
const assetsDir = path.join(rootDir, 'assets');

function fail(message) {
  console.error(`[check-stats-bundle] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(statsHtmlPath)) {
  fail('stats.html not found in repository root.');
}

const html = fs.readFileSync(statsHtmlPath, 'utf8');

if (/\/src\/stats-main\.js/i.test(html)) {
  fail('stats.html references /src/stats-main.js (dev entry). Production must use bundled assets.');
}

if (!/\.\/assets\/stats-[^"'\s]+\.js/i.test(html)) {
  fail('stats.html must reference a bundled ./assets/stats-*.js file.');
}

if (!/\.\/assets\/stats-[^"'\s]+\.css/i.test(html)) {
  fail('stats.html must reference a bundled ./assets/stats-*.css file.');
}

if (/<script[^>]+src=["'][^"']+\.(css|png|jpe?g|gif|webp)["']/i.test(html)) {
  fail('stats.html has a <script> tag pointing to a non-JS asset (css/image).');
}

const scriptMatch = html.match(/<script[^>]+src=["'](\.\/assets\/stats-[^"'\s]+\.js)["']/i);
const styleMatch = html.match(/<link[^>]+href=["'](\.\/assets\/stats-[^"'\s]+\.css)["']/i);

if (!scriptMatch || !styleMatch) {
  fail('stats.html is missing expected bundled stats script/style references.');
}

const bundledJsPath = path.join(rootDir, scriptMatch[1].replace(/^\.\//, ''));
const bundledCssPath = path.join(rootDir, styleMatch[1].replace(/^\.\//, ''));

if (!fs.existsSync(bundledJsPath)) {
  fail(`Bundled stats script not found: ${scriptMatch[1]}`);
}

if (!fs.existsSync(bundledCssPath)) {
  fail(`Bundled stats stylesheet not found: ${styleMatch[1]}`);
}

console.log('[check-stats-bundle] OK: stats.html points to stable bundled assets.');
