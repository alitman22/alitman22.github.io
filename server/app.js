import argon2 from 'argon2';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import { config } from './config.js';
import { db, initDatabase } from './db.js';
import { lookupGeo } from './geoip.js';

const app = express();

app.set('trust proxy', config.trustedProxyHops);
app.use(helmet());
app.use(express.json({ limit: '25kb' }));
app.use(cookieParser());

if (config.corsOrigins.length > 0) {
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || config.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error('Origin not allowed by CORS'));
      },
      credentials: true
    })
  );
}

const trackLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 180,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Too many tracking requests.' }
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: 'Too many login attempts. Try again later.' }
});

function readClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  if (typeof req.ip === 'string') {
    return req.ip;
  }

  return null;
}

function isBotUserAgent(userAgent) {
  if (!userAgent) return false;
  return /bot|crawler|spider|crawling|curl|wget|python-requests|headless/i.test(userAgent);
}

function parseUserAgent(userAgent) {
  const ua = String(userAgent || '').toLowerCase();
  const browser = { name: null, version: null };
  const os = { name: null, version: null };
  const device = { type: 'desktop', vendor: null, model: null };

  if (/edg\//.test(ua)) browser.name = 'Edge';
  else if (/chrome\//.test(ua) && !/edg\//.test(ua)) browser.name = 'Chrome';
  else if (/firefox\//.test(ua)) browser.name = 'Firefox';
  else if (/safari\//.test(ua) && !/chrome\//.test(ua)) browser.name = 'Safari';

  const browserVersionMatch = ua.match(/(?:edg|chrome|firefox|version)\/([\d.]+)/);
  if (browserVersionMatch) browser.version = browserVersionMatch[1];

  if (/windows nt/.test(ua)) os.name = 'Windows';
  else if (/android/.test(ua)) os.name = 'Android';
  else if (/iphone|ipad|ipod/.test(ua)) os.name = 'iOS';
  else if (/mac os x|macintosh/.test(ua)) os.name = 'macOS';
  else if (/linux/.test(ua)) os.name = 'Linux';

  const osVersionMatch = ua.match(/(?:android|windows nt|os x)\s([\d_\.]+)/);
  if (osVersionMatch) {
    os.version = osVersionMatch[1].replace(/_/g, '.');
  }

  if (/tablet|ipad/.test(ua)) {
    device.type = 'tablet';
  } else if (/mobi|iphone|android/.test(ua)) {
    device.type = 'mobile';
  }

  if (/iphone|ipad|macintosh/.test(ua)) {
    device.vendor = 'Apple';
  } else if (/samsung/.test(ua)) {
    device.vendor = 'Samsung';
  }

  return { browser, os, device };
}

function normalizeString(value, max = 500) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return normalized.slice(0, max);
}

function normalizeInteger(value, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return null;
  if (parsed < min || parsed > max) return null;
  return parsed;
}

function isValidOpaqueId(value) {
  if (typeof value !== 'string') return false;
  return /^[a-zA-Z0-9_-]{12,80}$/.test(value);
}

function authCookieOptions() {
  return {
    httpOnly: true,
    secure: config.isProduction,
    // GitHub Pages frontend and Render API are different sites, so production
    // needs SameSite=None to allow credentialed cross-site requests.
    sameSite: config.isProduction ? 'none' : 'lax',
    path: '/',
    maxAge: 12 * 60 * 60 * 1000
  };
}

function createAuthToken() {
  return jwt.sign(
    {
      sub: config.adminUsername,
      scope: 'analytics-admin'
    },
    config.jwtSecret,
    {
      issuer: 'portfolio-analytics',
      audience: 'analytics-admin',
      expiresIn: '12h'
    }
  );
}

function requireAuth(req, res, next) {
  const token = req.cookies?.[config.cookieName];
  if (!token) {
    res.status(401).json({ ok: false, message: 'Authentication required.' });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret, {
      issuer: 'portfolio-analytics',
      audience: 'analytics-admin'
    });
    req.auth = payload;
    next();
  } catch {
    res.status(401).json({ ok: false, message: 'Invalid or expired session.' });
  }
}

function toNumber(value) {
  if (typeof value === 'bigint') return Number(value);
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, status: 'up' });
});

app.post('/api/track', trackLimiter, async (req, res) => {
  try {
    const eventType = normalizeString(req.body?.eventType, 40) || 'pageview';
    const path = normalizeString(req.body?.path, 400) || '/';
    const referrer = normalizeString(req.body?.referrer, 400);
    const visitorId = normalizeString(req.body?.visitorId, 80);
    const sessionId = normalizeString(req.body?.sessionId, 80);

    if (!isValidOpaqueId(visitorId) || !isValidOpaqueId(sessionId)) {
      res.status(400).json({ ok: false, message: 'Invalid visitor/session identifier.' });
      return;
    }

    const userAgent = normalizeString(req.headers['user-agent'] || '', 600) || 'unknown';
    const ipAddress = readClientIp(req);
    const ua = parseUserAgent(userAgent);
    const botVisit = isBotUserAgent(userAgent);
    const now = new Date().toISOString();

    if (botVisit) {
      res.json({ ok: true, ignored: 'bot' });
      return;
    }

    const geo = lookupGeo(ipAddress);
    const language = normalizeString(req.body?.language, 64);
    const timezone = normalizeString(req.body?.timezone, 128);
    const screenWidth = normalizeInteger(req.body?.screenWidth, 100, 9000);
    const screenHeight = normalizeInteger(req.body?.screenHeight, 100, 9000);

    await db.execute({
      sql: `INSERT INTO sessions (
        session_id, visitor_id, ip_address, user_agent, first_path, last_path, pageview_count, first_seen_at, last_seen_at
      ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
      ON CONFLICT(session_id) DO UPDATE SET
        last_seen_at = excluded.last_seen_at,
        last_path = excluded.last_path,
        pageview_count = sessions.pageview_count + 1`,
      args: [sessionId, visitorId, ipAddress, userAgent, path, path, now, now]
    });

    await db.execute({
      sql: `INSERT OR IGNORE INTO visits (
        session_id, visitor_id, country, city, region, browser_name, browser_version,
        os_name, os_version, device_type, device_vendor, device_model, is_bot,
        language, timezone, screen_width, screen_height, referrer, path, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        sessionId,
        visitorId,
        geo.country,
        geo.city,
        geo.region,
        ua.browser.name || null,
        ua.browser.version || null,
        ua.os.name || null,
        ua.os.version || null,
        ua.device.type || 'desktop',
        ua.device.vendor || null,
        ua.device.model || null,
        0,
        language,
        timezone,
        screenWidth,
        screenHeight,
        referrer,
        path,
        now
      ]
    });

    await db.execute({
      sql: 'INSERT INTO events (session_id, visitor_id, event_type, path, referrer, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      args: [sessionId, visitorId, eventType, path, referrer, now]
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ ok: false, message: 'Tracking failed.' });
  }
});

app.post('/api/auth/login', loginLimiter, async (req, res) => {
  try {
    const username = normalizeString(req.body?.username, 120) || '';
    const password = normalizeString(req.body?.password, 500) || '';
    const totpCode = normalizeString(req.body?.totpCode, 16) || '';

    if (username !== config.adminUsername) {
      res.status(401).json({ ok: false, message: 'Invalid credentials.' });
      return;
    }

    const passwordMatches = await argon2.verify(config.adminPasswordHash, password);
    if (!passwordMatches) {
      res.status(401).json({ ok: false, message: 'Invalid credentials.' });
      return;
    }

    if (config.adminTotpSecret) {
      if (!totpCode) {
        res.status(400).json({ ok: false, requiresTotp: true, message: 'Two-factor code is required.' });
        return;
      }

      const cleanedCode = totpCode.replace(/\s+/g, '');
      const codeIsValid = speakeasy.totp.verify({
        secret: config.adminTotpSecret,
        encoding: 'base32',
        token: cleanedCode,
        window: 1
      });
      if (!codeIsValid) {
        res.status(401).json({ ok: false, message: 'Invalid two-factor code.' });
        return;
      }
    }

    const token = createAuthToken();
    res.cookie(config.cookieName, token, authCookieOptions());
    res.json({ ok: true, twoFactorEnabled: Boolean(config.adminTotpSecret) });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ ok: false, message: 'Login failed.' });
  }
});

app.post('/api/auth/logout', (_req, res) => {
  res.clearCookie(config.cookieName, authCookieOptions());
  res.json({ ok: true });
});

app.get('/api/auth/me', requireAuth, (_req, res) => {
  res.json({
    ok: true,
    user: {
      username: config.adminUsername,
      twoFactorEnabled: Boolean(config.adminTotpSecret)
    }
  });
});

app.get('/api/stats/summary', requireAuth, async (_req, res) => {
  try {
    const [totalVisitsResult, totalVisitorsResult, totalPageviewsResult, countryResult, deviceResult, osResult] = await Promise.all([
      db.execute('SELECT COUNT(*) AS total FROM visits'),
      db.execute('SELECT COUNT(DISTINCT visitor_id) AS total FROM visits'),
      db.execute("SELECT COUNT(*) AS total FROM events WHERE event_type = 'pageview'"),
      db.execute(`SELECT COALESCE(country, 'Unknown') AS label, COUNT(*) AS total
        FROM visits
        GROUP BY COALESCE(country, 'Unknown')
        ORDER BY total DESC
        LIMIT 10`),
      db.execute(`SELECT COALESCE(device_type, 'unknown') AS label, COUNT(*) AS total
        FROM visits
        GROUP BY COALESCE(device_type, 'unknown')
        ORDER BY total DESC`),
      db.execute(`SELECT COALESCE(os_name, 'Unknown') AS label, COUNT(*) AS total
        FROM visits
        GROUP BY COALESCE(os_name, 'Unknown')
        ORDER BY total DESC
        LIMIT 8`)
    ]);

    res.json({
      ok: true,
      totals: {
        visits: toNumber(totalVisitsResult.rows[0]?.total),
        visitors: toNumber(totalVisitorsResult.rows[0]?.total),
        pageviews: toNumber(totalPageviewsResult.rows[0]?.total)
      },
      countries: countryResult.rows.map((row) => ({ label: row.label, total: toNumber(row.total) })),
      devices: deviceResult.rows.map((row) => ({ label: row.label, total: toNumber(row.total) })),
      operatingSystems: osResult.rows.map((row) => ({ label: row.label, total: toNumber(row.total) }))
    });
  } catch (error) {
    console.error('Stats summary error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load summary.' });
  }
});

app.get('/api/stats/daily', requireAuth, async (req, res) => {
  try {
    const days = Math.min(Math.max(Number.parseInt(req.query.days || '30', 10), 1), 365);
    const interval = `-${days} days`;

    const result = await db.execute({
      sql: `SELECT DATE(created_at) AS day, COUNT(*) AS visits
        FROM visits
        WHERE created_at >= datetime('now', ?)
        GROUP BY DATE(created_at)
        ORDER BY day DESC`,
      args: [interval]
    });

    res.json({
      ok: true,
      days,
      points: result.rows.map((row) => ({ day: row.day, visits: toNumber(row.visits) }))
    });
  } catch (error) {
    console.error('Daily stats error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load daily stats.' });
  }
});

app.get('/api/stats/recent', requireAuth, async (req, res) => {
  try {
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '100', 10), 1), 400);
    const result = await db.execute({
      sql: `SELECT
        e.created_at,
        e.event_type,
        e.path,
        e.referrer,
        v.country,
        v.city,
        v.region,
        v.device_type,
        v.os_name,
        v.browser_name,
        v.timezone,
        v.screen_width,
        v.screen_height,
        e.session_id
      FROM events e
      LEFT JOIN visits v ON v.session_id = e.session_id
      ORDER BY e.created_at DESC
      LIMIT ?`,
      args: [limit]
    });

    res.json({ ok: true, records: result.rows });
  } catch (error) {
    console.error('Recent stats error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load recent events.' });
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ ok: false, message: 'Internal server error.' });
});

const start = async () => {
  await initDatabase();

  app.listen(config.port, () => {
    console.log(`Analytics API listening on http://localhost:${config.port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start analytics API:', error);
  process.exit(1);
});
