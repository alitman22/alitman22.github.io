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
import { lookupGeo, initGeoIp } from './geoip.js';

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

function isLocalhostIp(ip) {
  if (!ip) return false;
  ip = String(ip).toLowerCase().trim();
  // IPv4: 127.0.0.1 and 127.0.0.0/8 range
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return true;
  // IPv4: ::1 (IPv6 loopback)
  if (ip === '::1' || ip === '::ffff:127.0.0.1') return true;
  // Edge case: "localhost"
  if (ip === 'localhost' || ip === '::ffff:localhost') return true;
  return false;
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

function normalizeEventType(value, fallback = 'pageview') {
  const normalized = normalizeString(value, 40);
  if (!normalized) return fallback;
  if (!/^[a-z0-9_:-]{2,40}$/i.test(normalized)) return fallback;
  return normalized.toLowerCase();
}

function normalizeEventCategory(value) {
  const normalized = normalizeString(value, 40);
  if (!normalized) return null;
  if (!/^[a-z0-9_:-]{2,40}$/i.test(normalized)) return null;
  return normalized.toLowerCase();
}

function sanitizeTargetUrl(value) {
  const normalized = normalizeString(value, 600);
  if (!normalized) return null;

  try {
    const parsed = new URL(normalized);
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return null;
    }

    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return `${parsed.origin}${parsed.pathname || '/'}`.slice(0, 400);
    }

    return parsed.toString().slice(0, 400);
  } catch {
    return null;
  }
}

function normalizeMetadata(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;

  const entries = Object.entries(value).slice(0, 20);
  const normalized = {};

  for (const [rawKey, rawValue] of entries) {
    const key = normalizeString(rawKey, 60);
    if (!key) continue;

    if (rawValue == null) {
      normalized[key] = null;
      continue;
    }

    if (typeof rawValue === 'string') {
      normalized[key] = rawValue.slice(0, 200);
      continue;
    }

    if (typeof rawValue === 'number' || typeof rawValue === 'boolean') {
      normalized[key] = rawValue;
      continue;
    }

    normalized[key] = String(rawValue).slice(0, 200);
  }

  if (Object.keys(normalized).length === 0) return null;

  const json = JSON.stringify(normalized);
  if (json.length > 1500) return null;
  return json;
}

function normalizeInteger(value, min, max) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return null;
  if (parsed < min || parsed > max) return null;
  return parsed;
}

function sanitizeReferrer(referrer) {
  const normalized = normalizeString(referrer, 600);
  if (!normalized) return null;

  try {
    const parsed = new URL(normalized);
    // Keep only origin + pathname to avoid storing query/hash identifiers.
    const safePath = parsed.pathname || '/';
    return `${parsed.origin}${safePath}`.slice(0, 400);
  } catch {
    // If parsing fails, store a bounded raw string rather than rejecting event.
    return normalized.slice(0, 400);
  }
}

function anonymizeIp(ipAddress) {
  const ip = normalizeString(ipAddress, 200);
  if (!ip) return null;

  const ipv4 = ip.startsWith('::ffff:') ? ip.slice(7) : ip;
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(ipv4)) {
    const [a, b, c] = ipv4.split('.');
    return `${a}.${b}.${c}.0`;
  }

  if (ip.includes(':')) {
    const segments = ip.split(':').filter(Boolean).slice(0, 4);
    if (segments.length > 0) {
      return `${segments.join(':')}::`;
    }
  }

  return null;
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
    const eventType = normalizeEventType(req.body?.eventType, 'pageview');
    const eventCategory = normalizeEventCategory(req.body?.eventCategory);
    const eventLabel = normalizeString(req.body?.eventLabel, 160);
    const targetUrl = sanitizeTargetUrl(req.body?.targetUrl);
    const metadataJson = normalizeMetadata(req.body?.metadata);
    const path = normalizeString(req.body?.path, 400) || '/';
    const referrer = sanitizeReferrer(req.body?.referrer);
    const visitorId = normalizeString(req.body?.visitorId, 80);
    const sessionId = normalizeString(req.body?.sessionId, 80);

    if (!isValidOpaqueId(visitorId) || !isValidOpaqueId(sessionId)) {
      res.status(400).json({ ok: false, message: 'Invalid visitor/session identifier.' });
      return;
    }

    const userAgent = normalizeString(req.headers['user-agent'] || '', 600) || 'unknown';
    const ipAddress = readClientIp(req);
    const anonymizedIp = anonymizeIp(ipAddress);
    const ua = parseUserAgent(userAgent);
    const botVisit = isBotUserAgent(userAgent);
    const now = new Date().toISOString();

    if (botVisit) {
      res.json({ ok: true, ignored: 'bot' });
      return;
    }

    // Ignore localhost development traffic
    if (isLocalhostIp(ipAddress)) {
      res.json({ ok: true, ignored: 'localhost' });
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
      args: [sessionId, visitorId, anonymizedIp, userAgent, path, path, now, now]
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
      sql: `INSERT INTO events (
        session_id,
        visitor_id,
        event_type,
        event_category,
        event_label,
        target_url,
        path,
        referrer,
        metadata_json,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [sessionId, visitorId, eventType, eventCategory, eventLabel, targetUrl, path, referrer, metadataJson, now]
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

app.post('/api/auth/password-reset-request', loginLimiter, async (req, res) => {
  try {
    const username = normalizeString(req.body?.username, 120) || '';

    if (username !== config.adminUsername) {
      // Don't reveal whether username exists for security
      res.status(200).json({ ok: true, message: 'If an account exists, a reset link has been sent.' });
      return;
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign(
      {
        sub: config.adminUsername,
        type: 'password-reset'
      },
      config.resetTokenSecret,
      {
        issuer: 'portfolio-analytics',
        audience: 'password-reset',
        expiresIn: '1h'
      }
    );

    // Send email with reset link (or log if Mailgun not configured)
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password?token=${encodeURIComponent(resetToken)}`;

    if (config.mailgun.apiKey && config.mailgun.domain) {
      // Queue Mailgun email sending
      const _mailgunPromise = sendPasswordResetEmail(config.adminEmail, resetUrl);
      // Fire and forget – don't wait for email to send
      _mailgunPromise.catch((err) => console.error('Failed to send email:', err));
    } else {
      // Development: log to console
      console.log(`\n📧 PASSWORD RESET REQUEST for ${config.adminUsername}`);
      console.log(`   To: ${config.adminEmail}`);
      console.log(`   Reset link: ${resetUrl}`);
      console.log(`   Token expires in: 1 hour\n`);
    }

    res.json({ ok: true, message: 'If an account exists, a reset link has been sent.' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ ok: false, message: 'Failed to process request.' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const token = normalizeString(req.body?.token, 500) || '';
    const newPassword = normalizeString(req.body?.password, 500) || '';

    if (!token || !newPassword) {
      res.status(400).json({ ok: false, message: 'Token and new password are required.' });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({ ok: false, message: 'Password must be at least 8 characters.' });
      return;
    }

    let tokenPayload;
    try {
      tokenPayload = jwt.verify(token, config.resetTokenSecret, {
        issuer: 'portfolio-analytics',
        audience: 'password-reset'
      });
    } catch {
      res.status(401).json({ ok: false, message: 'Invalid or expired reset token.' });
      return;
    }

    if (tokenPayload.type !== 'password-reset' || tokenPayload.sub !== config.adminUsername) {
      res.status(401).json({ ok: false, message: 'Invalid reset token.' });
      return;
    }

    // Hash new password
    const newPasswordHash = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 19456,
      timeCost: 3,
      parallelism: 1
    });

    // Update .env file (in production, use a more secure password manager)
    console.log(`✅ Password successfully reset for ${config.adminUsername}`);
    console.log(`⚠️  WARNING: You must manually update ANALYTICS_ADMIN_PASSWORD_HASH in .env:`);
    console.log(`   ${newPasswordHash}`);
    console.log(`   After updating, restart the server.\n`);

    res.json({
      ok: true,
      message: 'Password reset successful. The server admin must update .env and restart the server.'
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ ok: false, message: 'Failed to reset password.' });
  }
});

async function sendPasswordResetEmail(toEmail, resetUrl) {
  if (!config.mailgun.apiKey || !config.mailgun.domain) {
    throw new Error('Mailgun not configured');
  }

  const mailgunUrl = `https://api.mailgun.net/v3/${config.mailgun.domain}/messages`;
  const auth = `Basic ${Buffer.from(`api:${config.mailgun.apiKey}`).toString('base64')}`;

  const emailBody = `
Hello,

You requested to reset your portfolio analytics password. Click the link below to continue:

${resetUrl}

This link expires in 1 hour.

If you didn't request this, you can safely ignore this email.

Best regards,
Portfolio Analytics
  `.trim();

  const response = await fetch(mailgunUrl, {
    method: 'POST',
    headers: {
      Authorization: auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      from: config.mailgun.fromEmail,
      to: toEmail,
      subject: 'Portfolio Analytics - Password Reset',
      text: emailBody
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Mailgun error: ${response.statusText} - ${error}`);
  }

  return response.json();
}


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
    const perPage = Math.min(Math.max(Number.parseInt(req.query.perPage || '20', 10), 1), 100);
    const page = Math.max(Number.parseInt(req.query.page || '1', 10), 1);
    const offset = (page - 1) * perPage;

    const totalResult = await db.execute("SELECT COUNT(*) AS total FROM events WHERE event_type = 'pageview'");
    const total = toNumber(totalResult.rows[0]?.total);
    const totalPages = Math.max(Math.ceil(total / perPage), 1);
    const safePage = Math.min(page, totalPages);
    const safeOffset = (safePage - 1) * perPage;

    const result = await db.execute({
      sql: `SELECT
        e.id AS event_id,
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
        s.ip_address,
        e.session_id
      FROM events e
      LEFT JOIN visits v ON v.session_id = e.session_id
      LEFT JOIN sessions s ON s.session_id = e.session_id
      WHERE e.event_type = 'pageview'
      ORDER BY e.created_at DESC
      LIMIT ?
      OFFSET ?`,
      args: [perPage, safeOffset]
    });

    res.json({
      ok: true,
      records: result.rows,
      paging: {
        total,
        page: safePage,
        perPage,
        totalPages
      }
    });
  } catch (error) {
    console.error('Recent stats error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load recent events.' });
  }
});

app.delete('/api/stats/events', requireAuth, async (req, res) => {
  try {
    const rawIds = Array.isArray(req.body?.eventIds) ? req.body.eventIds : [];
    const eventIds = rawIds
      .map((value) => Number.parseInt(String(value), 10))
      .filter((value) => Number.isInteger(value) && value > 0)
      .slice(0, 200);

    if (eventIds.length === 0) {
      res.status(400).json({ ok: false, message: 'No valid event IDs provided.' });
      return;
    }

    const placeholders = eventIds.map(() => '?').join(', ');

    const affectedSessionsResult = await db.execute({
      sql: `SELECT DISTINCT session_id
        FROM events
        WHERE event_type = 'pageview'
          AND id IN (${placeholders})`,
      args: eventIds
    });

    const affectedSessionIds = affectedSessionsResult.rows
      .map((row) => row.session_id)
      .filter(Boolean);

    const deleteEventsResult = await db.execute({
      sql: `DELETE FROM events
        WHERE event_type = 'pageview'
          AND id IN (${placeholders})`,
      args: eventIds
    });

    if (affectedSessionIds.length > 0) {
      const sessionPlaceholders = affectedSessionIds.map(() => '?').join(', ');

      await db.execute({
        sql: `DELETE FROM visits
          WHERE session_id IN (${sessionPlaceholders})
            AND NOT EXISTS (
              SELECT 1 FROM events e
              WHERE e.session_id = visits.session_id
                AND e.event_type = 'pageview'
            )`,
        args: affectedSessionIds
      });

      await db.execute({
        sql: `DELETE FROM sessions
          WHERE session_id IN (${sessionPlaceholders})
            AND NOT EXISTS (
              SELECT 1 FROM events e
              WHERE e.session_id = sessions.session_id
            )`,
        args: affectedSessionIds
      });
    }

    res.json({
      ok: true,
      deleted: toNumber(deleteEventsResult.rowsAffected)
    });
  } catch (error) {
    console.error('Delete events error:', error);
    res.status(500).json({ ok: false, message: 'Failed to delete selected visits.' });
  }
});

app.get('/api/stats/referrers', requireAuth, async (req, res) => {
  try {
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '20', 10), 1), 50);
    const days = Math.min(Math.max(Number.parseInt(req.query.days || '90', 10), 1), 365);
    const interval = `-${days} days`;

    // Top referrers by visit count
    const result = await db.execute({
      sql: `SELECT
        COALESCE(referrer, 'direct') AS referrer,
        COUNT(DISTINCT session_id) AS visits,
        COUNT(DISTINCT visitor_id) AS visitors,
        COUNT(*) AS events,
        MIN(created_at) AS first_seen,
        MAX(created_at) AS last_seen
      FROM visits
      WHERE created_at >= datetime('now', ?)
        AND referrer IS NOT NULL
      GROUP BY COALESCE(referrer, 'direct')
      ORDER BY visits DESC
      LIMIT ?`,
      args: [interval, limit]
    });

    // Also fetch direct traffic (no referrer)
    const directResult = await db.execute({
      sql: `SELECT COUNT(DISTINCT session_id) AS visits FROM visits
        WHERE created_at >= datetime('now', ?)
        AND (referrer IS NULL OR referrer = '')`,
      args: [interval]
    });

    const directVisits = toNumber(directResult.rows[0]?.visits) || 0;

    res.json({
      ok: true,
      days,
      directVisits,
      referrers: result.rows.map((row) => ({
        referrer: row.referrer,
        visits: toNumber(row.visits),
        visitors: toNumber(row.visitors),
        events: toNumber(row.events),
        firstSeen: row.first_seen,
        lastSeen: row.last_seen
      }))
    });
  } catch (error) {
    console.error('Referrer stats error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load referrer stats.' });
  }
});

app.get('/api/stats/pages', requireAuth, async (req, res) => {
  try {
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit || '15', 10), 1), 50);
    const days = Math.min(Math.max(Number.parseInt(req.query.days || '90', 10), 1), 365);
    const interval = `-${days} days`;

    const result = await db.execute({
      sql: `SELECT
        path,
        COUNT(DISTINCT session_id) AS visits,
        COUNT(DISTINCT visitor_id) AS visitors,
        COUNT(*) AS events,
        MIN(created_at) AS first_seen,
        MAX(created_at) AS last_seen
      FROM events
      WHERE created_at >= datetime('now', ?)
        AND event_type = 'pageview'
      GROUP BY path
      ORDER BY events DESC
      LIMIT ?`,
      args: [interval, limit]
    });

    res.json({
      ok: true,
      days,
      pages: result.rows.map((row) => ({
        path: row.path,
        visits: toNumber(row.visits),
        visitors: toNumber(row.visitors),
        pageviews: toNumber(row.events),
        firstSeen: row.first_seen,
        lastSeen: row.last_seen
      }))
    });
  } catch (error) {
    console.error('Page stats error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load page stats.' });
  }
});

app.get('/api/stats/interactions', requireAuth, async (req, res) => {
  try {
    const days = Math.min(Math.max(Number.parseInt(req.query.days || '90', 10), 1), 365);
    const interval = `-${days} days`;

    const [totalsResult, eventTypesResult, topProjectsResult, topSectionsResult, resumeDownloadsResult] = await Promise.all([
      db.execute({
        sql: `SELECT
          SUM(CASE WHEN event_type = 'resume_download' THEN 1 ELSE 0 END) AS resume_downloads,
          SUM(CASE WHEN event_type = 'project_link_click' THEN 1 ELSE 0 END) AS project_link_clicks,
          SUM(CASE WHEN event_type = 'section_view' THEN 1 ELSE 0 END) AS section_views,
          COUNT(*) AS total
        FROM events
        WHERE created_at >= datetime('now', ?)
          AND (
            event_category IN ('conversion', 'outbound', 'engagement')
            OR event_type IN ('resume_download', 'project_link_click', 'section_view')
          )`,
        args: [interval]
      }),
      db.execute({
        sql: `SELECT
          event_type,
          COUNT(*) AS total
        FROM events
        WHERE created_at >= datetime('now', ?)
          AND (
            event_category IN ('conversion', 'outbound', 'engagement')
            OR event_type IN ('resume_download', 'project_link_click', 'section_view')
          )
        GROUP BY event_type
        ORDER BY total DESC
        LIMIT 12`,
        args: [interval]
      }),
      db.execute({
        sql: `SELECT
          COALESCE(event_label, 'Unknown Project') AS project,
          COUNT(*) AS total,
          COUNT(DISTINCT visitor_id) AS visitors,
          MAX(created_at) AS last_seen
        FROM events
        WHERE created_at >= datetime('now', ?)
          AND event_type = 'project_link_click'
        GROUP BY COALESCE(event_label, 'Unknown Project')
        ORDER BY total DESC, last_seen DESC
        LIMIT 10`,
        args: [interval]
      }),
      db.execute({
        sql: `SELECT
          COALESCE(event_label, 'unknown') AS section,
          COUNT(*) AS total,
          MAX(created_at) AS last_seen
        FROM events
        WHERE created_at >= datetime('now', ?)
          AND event_type = 'section_view'
        GROUP BY COALESCE(event_label, 'unknown')
        ORDER BY total DESC, last_seen DESC
        LIMIT 12`,
        args: [interval]
      }),
      db.execute({
        sql: `SELECT
          COALESCE(event_label, '-') AS label,
          COALESCE(target_url, path, '-') AS target,
          COUNT(*) AS total,
          MAX(created_at) AS last_seen
        FROM events
        WHERE created_at >= datetime('now', ?)
          AND event_type = 'resume_download'
        GROUP BY COALESCE(event_label, '-'), COALESCE(target_url, path, '-')
        ORDER BY total DESC, last_seen DESC
        LIMIT 20`,
        args: [interval]
      })
    ]);

    const totalsRow = totalsResult.rows[0] || {};

    const resumeByVersionMap = new Map();
    for (const row of resumeDownloadsResult.rows || []) {
      let version = String(row.label || '').trim();

      if (!version || version === '-') {
        const target = String(row.target || '').trim();
        try {
          const parsed = new URL(target);
          version = decodeURIComponent((parsed.pathname.split('/').pop() || '').trim());
        } catch {
          version = target.split('/').pop() || target;
        }
      }

      version = String(version || '').trim() || 'unknown-resume';
      const current = resumeByVersionMap.get(version) || { total: 0, lastSeen: null };
      current.total += toNumber(row.total);
      if (!current.lastSeen || String(row.last_seen || '') > String(current.lastSeen || '')) {
        current.lastSeen = row.last_seen;
      }
      resumeByVersionMap.set(version, current);
    }

    const resumeVersions = Array.from(resumeByVersionMap.entries())
      .map(([version, value]) => ({
        version,
        total: toNumber(value.total),
        lastSeen: value.lastSeen
      }))
      .sort((a, b) => b.total - a.total || String(b.lastSeen || '').localeCompare(String(a.lastSeen || '')))
      .slice(0, 10);

    res.json({
      ok: true,
      days,
      totals: {
        resumeDownloads: toNumber(totalsRow.resume_downloads),
        projectLinkClicks: toNumber(totalsRow.project_link_clicks),
        sectionViews: toNumber(totalsRow.section_views),
        total: toNumber(totalsRow.total)
      },
      byType: eventTypesResult.rows.map((row) => ({
        eventType: row.event_type,
        total: toNumber(row.total)
      })),
      topProjects: topProjectsResult.rows.map((row) => ({
        project: row.project,
        total: toNumber(row.total),
        visitors: toNumber(row.visitors),
        lastSeen: row.last_seen
      })),
      resumeVersions,
      topSections: topSectionsResult.rows.map((row) => ({
        section: row.section,
        total: toNumber(row.total),
        lastSeen: row.last_seen
      }))
    });
  } catch (error) {
    console.error('Interactions stats error:', error);
    res.status(500).json({ ok: false, message: 'Failed to load interaction stats.' });
  }
});


app.use((error, _req, res, _next) => {
  if (String(error?.message || '').includes('Origin not allowed by CORS')) {
    res.status(403).json({ ok: false, message: 'Origin not allowed by CORS.' });
    return;
  }

  console.error(error);
  res.status(500).json({ ok: false, message: 'Internal server error.' });
});

const start = async () => {
  await initDatabase();
  await initGeoIp();

  app.listen(config.port, () => {
    console.log(`Analytics API listening on http://localhost:${config.port}`);
  });
};

start().catch((error) => {
  console.error('Failed to start analytics API:', error);
  process.exit(1);
});
