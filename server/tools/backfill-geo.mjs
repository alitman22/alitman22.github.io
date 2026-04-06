#!/usr/bin/env node
/**
 * Backfill geo data for visits that have no country/city/region.
 * Looks up the IP from the sessions table and updates matching visits.
 * Usage: node server/tools/backfill-geo.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@libsql/client';
import maxmind from 'maxmind';
import { config } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveDbPath(dbPath) {
  if (!dbPath) return null;
  if (path.isAbsolute(dbPath)) return dbPath;
  const fromCwd = path.resolve(process.cwd(), dbPath);
  if (fs.existsSync(fromCwd)) return fromCwd;
  return path.resolve(__dirname, dbPath);
}

async function main() {
  const dbPath = resolveDbPath(config.maxmindDbPath);
  if (!dbPath || !fs.existsSync(dbPath)) {
    console.error(`❌ GeoIP database not found. Set MAXMIND_DB_PATH in .env.\n   Tried: ${dbPath}`);
    process.exit(1);
  }

  const reader = await maxmind.open(dbPath);
  console.log(`✅ GeoIP database loaded: ${dbPath}\n`);

  const client = createClient({ url: config.tursoUrl, authToken: config.tursoToken });

  // Find visits with missing country but whose session has an IP
  const result = await client.execute(`
    SELECT v.session_id, s.ip_address
    FROM visits v
    JOIN sessions s ON s.session_id = v.session_id
    WHERE v.country IS NULL AND s.ip_address IS NOT NULL
  `);

  console.log(`Found ${result.rows.length} visit(s) with missing geo data.\n`);

  if (result.rows.length === 0) {
    console.log('✅ Nothing to backfill.');
    return;
  }

  let updated = 0;
  for (const row of result.rows) {
    const ip = String(row.ip_address);
    let geo = { country: null, city: null, region: null };
    try {
      const lookup = reader.get(ip);
      geo.country = lookup?.country?.names?.en || null;
      geo.city = lookup?.city?.names?.en || null;
      geo.region = lookup?.subdivisions?.[0]?.names?.en || null;
    } catch {
      // leave geo as null
    }

    if (!geo.country && !geo.city) {
      console.log(`  ⚠️  No geo result for IP ${ip} (session ${row.session_id})`);
      continue;
    }

    await client.execute({
      sql: 'UPDATE visits SET country = ?, city = ?, region = ? WHERE session_id = ?',
      args: [geo.country, geo.city, geo.region, row.session_id]
    });
    console.log(`  ✅ ${row.session_id}: ${geo.city || '-'}, ${geo.country || '-'}`);
    updated++;
  }

  console.log(`\n🎉 Backfill complete: ${updated}/${result.rows.length} visits updated.`);
}

main().catch((err) => {
  console.error('❌ Backfill failed:', err.message);
  process.exit(1);
});
