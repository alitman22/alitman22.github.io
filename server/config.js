import 'dotenv/config';

function parseOrigins(value) {
  if (!value) return [];
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const tursoUrl = required('TURSO_DATABASE_URL');
const tursoToken = process.env.TURSO_AUTH_TOKEN || '';

if (!tursoUrl.startsWith('file:') && !tursoToken) {
  throw new Error('TURSO_AUTH_TOKEN is required for remote Turso URLs.');
}

export const config = {
  port: Number.parseInt(process.env.ANALYTICS_PORT || '8787', 10),
  tursoUrl,
  tursoToken,
  jwtSecret: required('ANALYTICS_JWT_SECRET'),
  cookieName: process.env.ANALYTICS_COOKIE_NAME || 'portfolio_analytics_session',
  adminUsername: process.env.ANALYTICS_ADMIN_USERNAME || 'admin',
  adminPasswordHash: required('ANALYTICS_ADMIN_PASSWORD_HASH'),
  adminTotpSecret: process.env.ANALYTICS_ADMIN_TOTP_SECRET || '',
  maxmindDbPath: process.env.MAXMIND_DB_PATH || '',
  trustedProxyHops: Number.parseInt(process.env.ANALYTICS_TRUST_PROXY_HOPS || '1', 10),
  corsOrigins: parseOrigins(process.env.ANALYTICS_CORS_ORIGINS),
  isProduction: process.env.NODE_ENV === 'production'
};
