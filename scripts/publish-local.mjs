import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

  const existingAssetEntries = await readdir(rootAssetsDir, { withFileTypes: true });
  for (const entry of existingAssetEntries) {
    if (!entry.isFile()) {
      continue;
    }

    // Keep manually-managed static files (e.g., profile image, resumes).
    if (!entry.name.endsWith('.js') && !entry.name.endsWith('.css')) {
      continue;
    }

    await rm(path.join(rootAssetsDir, entry.name), { force: true });
  }

  await cp(distAssetsDir, rootAssetsDir, { recursive: true, force: true });

  console.log('Local publish complete: root index.html, root stats.html, and assets/ synced from dist/.');
}

publishToRoot().catch((error) => {
  console.error('Local publish failed:', error.message);
  process.exitCode = 1;
});
