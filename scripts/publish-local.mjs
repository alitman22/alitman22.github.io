import { cp, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function copyAssetAlias(rootAssetsDir, distAssetsDir, sourcePattern, targetName) {
  const distAssets = await readdir(distAssetsDir);
  const sourceAsset = distAssets.find((name) => sourcePattern.test(name));
  if (!sourceAsset) {
    return;
  }

  await cp(path.join(distAssetsDir, sourceAsset), path.join(rootAssetsDir, targetName), { force: true });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const rootAssetsDir = path.join(rootDir, 'assets');
const distAssetsDir = path.join(distDir, 'assets');
const distIndexPath = path.join(distDir, 'index.html');
const distStatsPath = path.join(distDir, 'stats.html');
const rootIndexPath = path.join(rootDir, 'index.html');
const rootStatsPath = path.join(rootDir, 'stats.html');

async function ensureDistExists() {
  try {
    const distStat = await stat(distDir);
    if (!distStat.isDirectory()) {
      throw new Error('dist is not a directory');
    }
  } catch {
    throw new Error('dist directory not found. Run build first.');
  }
}

async function publishToRoot() {
  await ensureDistExists();

  await mkdir(path.dirname(rootIndexPath), { recursive: true });
  await cp(distIndexPath, rootIndexPath, { force: true });
  await cp(distStatsPath, rootStatsPath, { force: true });

  await mkdir(rootAssetsDir, { recursive: true });

  // Keep old hashed JS/CSS bundles to avoid 404s for clients with cached HTML.
  // GitHub Pages can serve stale HTML briefly, and removing old bundles causes
  // transient failures (e.g., stats-<old-hash>.js not found).

  await cp(distAssetsDir, rootAssetsDir, { recursive: true, force: true });

  await copyAssetAlias(rootAssetsDir, distAssetsDir, /^main-.*\.js$/, 'main.js');
  await copyAssetAlias(rootAssetsDir, distAssetsDir, /^main-.*\.css$/, 'main.css');
  await copyAssetAlias(rootAssetsDir, distAssetsDir, /^stats-.*\.js$/, 'stats.js');
  await copyAssetAlias(rootAssetsDir, distAssetsDir, /^stats-.*\.css$/, 'stats.css');

  console.log('Local publish complete: root index.html, root stats.html, and assets/ synced from dist/.');
}

publishToRoot().catch((error) => {
  console.error('Local publish failed:', error.message);
  process.exitCode = 1;
});
