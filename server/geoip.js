import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import maxmind from 'maxmind';
import { config } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let cityReader = null;

function resolveDbPath(dbPath) {
  if (!dbPath) return null;
  if (path.isAbsolute(dbPath)) return dbPath;
  // Try relative to CWD (repo root) first, then fall back to this file's dir
  const fromCwd = path.resolve(process.cwd(), dbPath);
  if (fs.existsSync(fromCwd)) return fromCwd;
  const fromDir = path.resolve(__dirname, dbPath);
  if (fs.existsSync(fromDir)) return fromDir;
  return fromCwd;
}

export async function initGeoIp() {
  if (!config.maxmindDbPath) {
    console.info('ℹ️  MAXMIND_DB_PATH not set — geo lookup disabled.');
    return;
  }

  const resolvedPath = resolveDbPath(config.maxmindDbPath);
  if (!resolvedPath || !fs.existsSync(resolvedPath)) {
    console.warn(`⚠️  GeoIP database not found. Tried: ${resolvedPath}`);
    return;
  }

  try {
    cityReader = await maxmind.open(resolvedPath);
    console.log(`✅ GeoIP database loaded: ${resolvedPath}`);
  } catch (error) {
    console.warn(`⚠️  GeoIP database could not be opened (${resolvedPath}): ${error.message}`);
  }
}

export function lookupGeo(ipAddress) {
  if (!cityReader || !ipAddress) {
    return { country: null, city: null, region: null };
  }

  try {
    const result = cityReader.get(ipAddress);
    return {
      country: result?.country?.names?.en || null,
      city: result?.city?.names?.en || null,
      region: result?.subdivisions?.[0]?.names?.en || null
    };
  } catch {
    return { country: null, city: null, region: null };
  }
}
