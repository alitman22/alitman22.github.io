# Portfolio Analytics Setup (Turso + Secure Login + Optional 2FA)

## 1) Create Turso database

1. Install Turso CLI and authenticate.
2. Create a database:

   ```bash
   turso db create portfolio-analytics
   ```

3. Get DB URL:

   ```bash
   turso db show portfolio-analytics --url
   ```

4. Create an auth token:

   ```bash
   turso db tokens create portfolio-analytics
   ```

## 2) Generate secure admin credentials

1. Generate Argon2 password hash:

   ```bash
   node server/tools/hash-password.mjs "your-very-strong-password"
   ```

2. Optional 2FA setup (TOTP):

   ```bash
   node server/tools/generate-totp.mjs "admin" "AliPortfolioStats"
   ```

   Save `TOTP_SECRET` and scan `OTPAUTH_URL` in an authenticator app.

## 3) Configure `.env`

Add these values:

```env
ANALYTICS_PORT=8787
TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token

ANALYTICS_JWT_SECRET=replace-with-long-random-secret
ANALYTICS_COOKIE_NAME=portfolio_analytics_session
ANALYTICS_ADMIN_USERNAME=admin
ANALYTICS_ADMIN_PASSWORD_HASH=argon2id-hash-from-tool
ANALYTICS_ADMIN_TOTP_SECRET=optional-totp-secret

ANALYTICS_CORS_ORIGINS=http://localhost:5173
ANALYTICS_TRUST_PROXY_HOPS=1

# Optional: MaxMind GeoLite2-City local DB for improved location accuracy
MAXMIND_DB_PATH=./server/data/GeoLite2-City.mmdb

# Frontend -> API origin (for production if API is on another origin)
VITE_ANALYTICS_API_ORIGIN=
```

## 4) Run locally

In terminal A:

```bash
npm run analytics:server:dev
```

In terminal B:

```bash
npm run dev
```

Open:

- Portfolio: `http://localhost:5173/`
- Stats page: `http://localhost:5173/stats.html`

## 5) Precision model and refresh dedupe

- A persistent `visitorId` is stored in local storage.
- A `sessionId` is stored in session storage.
- A **visit** is counted once per `sessionId` (refresh does not create a new visit).
- Refreshes add pageview events, but not new visit rows.

## 6) Security notes

- Uses Argon2 password verification.
- Uses HTTP-only signed auth cookie for stats endpoints.
- Uses rate limiting on login and tracking endpoints.
- Optional TOTP 2FA support.
- City precision depends on IP intelligence quality (best with MaxMind GeoLite2 DB).
