import { createClient } from '@libsql/client';
import { config } from './config.js';

export const db = createClient({
  url: config.tursoUrl,
  authToken: config.tursoToken || undefined
});

const schemaStatements = [
  `CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    first_path TEXT,
    last_path TEXT,
    pageview_count INTEGER NOT NULL DEFAULT 0,
    first_seen_at TEXT NOT NULL,
    last_seen_at TEXT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL UNIQUE,
    visitor_id TEXT NOT NULL,
    country TEXT,
    city TEXT,
    region TEXT,
    browser_name TEXT,
    browser_version TEXT,
    os_name TEXT,
    os_version TEXT,
    device_type TEXT,
    device_vendor TEXT,
    device_model TEXT,
    is_bot INTEGER NOT NULL DEFAULT 0,
    language TEXT,
    timezone TEXT,
    screen_width INTEGER,
    screen_height INTEGER,
    referrer TEXT,
    path TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(session_id) REFERENCES sessions(session_id)
  );`,
  `CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    visitor_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    path TEXT,
    referrer TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(session_id) REFERENCES sessions(session_id)
  );`,
  'CREATE INDEX IF NOT EXISTS idx_visits_created_at ON visits(created_at);',
  'CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);',
  'CREATE INDEX IF NOT EXISTS idx_visits_visitor_id ON visits(visitor_id);',
  'CREATE INDEX IF NOT EXISTS idx_events_session_id ON events(session_id);'
];

export async function initDatabase() {
  for (const sql of schemaStatements) {
    await db.execute(sql);
  }
}
