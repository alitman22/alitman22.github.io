#!/usr/bin/env node
/**
 * Cleanup script: Remove all localhost-sourced data from analytics database
 * Usage: node server/tools/cleanup-localhost-data.mjs
 */

import { config } from '../config.js';
import { createClient } from '@libsql/client';

async function isLocalhostIp(ip) {
  if (!ip) return false;
  ip = String(ip).toLowerCase().trim();
  // IPv4: 127.0.0.1 and 127.0.0.0/8 range
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return true;
  // IPv6: ::1
  if (ip === '::1' || ip === '::ffff:127.0.0.1') return true;
  return false;
}

async function cleanup() {
  console.log('🗑️  Starting localhost data cleanup...\n');

  const client = createClient({
    url: config.tursoUrl,
    authToken: config.tursoToken
  });

  try {
    // Step 1: Fetch all localhost session IDs
    console.log('📊 Querying localhost sessions...');
    const sessionsResult = await client.execute({
      sql: "SELECT DISTINCT session_id FROM sessions WHERE ip_address LIKE '127.%' OR ip_address = '::1' OR ip_address = '::ffff:127.0.0.1'"
    });

    const localhostSessions = sessionsResult.rows.map(row => row.session_id);
    console.log(`   Found ${localhostSessions.length} localhost sessions\n`);

    if (localhostSessions.length === 0) {
      console.log('✅ No localhost data found. Database is clean.\n');
      return;
    }

    // Step 2: Delete events from localhost sessions
    console.log('🗑️  Deleting localhost events...');
    const eventsDelete = await client.execute({
      sql: "DELETE FROM events WHERE session_id IN (SELECT session_id FROM sessions WHERE ip_address LIKE '127.%' OR ip_address = '::1' OR ip_address = '::ffff:127.0.0.1')"
    });
    console.log(`   Deleted ${eventsDelete.rowsAffected} event records\n`);

    // Step 3: Delete visits from localhost sessions
    console.log('🗑️  Deleting localhost visits...');
    const visitsDelete = await client.execute({
      sql: "DELETE FROM visits WHERE session_id IN (SELECT session_id FROM sessions WHERE ip_address LIKE '127.%' OR ip_address = '::1' OR ip_address = '::ffff:127.0.0.1')"
    });
    console.log(`   Deleted ${visitsDelete.rowsAffected} visit records\n`);

    // Step 4: Delete sessions from localhost
    console.log('🗑️  Deleting localhost sessions...');
    const sessionsDelete = await client.execute({
      sql: "DELETE FROM sessions WHERE ip_address LIKE '127.%' OR ip_address = '::1' OR ip_address = '::ffff:127.0.0.1'"
    });
    console.log(`   Deleted ${sessionsDelete.rowsAffected} session records\n`);

    // Step 5: Verify cleanup
    console.log('✅ Verifying cleanup...');
    const verify = await client.execute({
      sql: "SELECT COUNT(*) as count FROM sessions WHERE ip_address LIKE '127.%' OR ip_address = '::1' OR ip_address = '::ffff:127.0.0.1'"
    });
    const remainingCount = verify.rows[0]?.count || 0;

    if (remainingCount === 0) {
      console.log('   Cleanup verified: 0 localhost records remaining\n');
      console.log('🎉 Localhost data successfully removed!\n');
    } else {
      console.error(`   ⚠️  Warning: ${remainingCount} localhost records still remain\n`);
    }

    // Step 6: Show summary
    console.log('📈 Remaining database summary:');
    const summary = await client.execute({
      sql: `
        SELECT
          (SELECT COUNT(*) FROM sessions) as total_sessions,
          (SELECT COUNT(*) FROM visits) as total_visits,
          (SELECT COUNT(*) FROM events) as total_events
      `
    });
    const stats = summary.rows[0];
    console.log(`   Total sessions: ${stats.total_sessions}`);
    console.log(`   Total visits: ${stats.total_visits}`);
    console.log(`   Total events: ${stats.total_events}\n`);
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

cleanup();
