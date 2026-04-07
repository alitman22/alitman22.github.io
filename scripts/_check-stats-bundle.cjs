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

if (!/\.\/assets\/stats-latest\.js/i.test(html)) {
  fail('stats.html must reference ./assets/stats-latest.js');
}

if (!/\.\/assets\/stats-latest\.css/i.test(html)) {
  fail('stats.html must reference ./assets/stats-latest.css');
}

if (/<script[^>]+src=["'][^"']+\.(css|png|jpe?g|gif|webp)["']/i.test(html)) {
  fail('stats.html has a <script> tag pointing to a non-JS asset (css/image).');
}

const latestJsPath = path.join(assetsDir, 'stats-latest.js');
const latestCssPath = path.join(assetsDir, 'stats-latest.css');

if (!fs.existsSync(latestJsPath)) {
  fail('assets/stats-latest.js is missing.');
}

if (!fs.existsSync(latestCssPath)) {
  fail('assets/stats-latest.css is missing.');
}

console.log('[check-stats-bundle] OK: stats.html points to stable bundled assets.');
