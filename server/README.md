# Analytics API

This service stores visitor analytics into Turso (SQLite-compatible libSQL).

## Start

```bash
npm run analytics:server
```

or for auto-reload:

```bash
npm run analytics:server:dev
```

## Endpoints

- `POST /api/track` - Collects visitor events and deduplicates visits by session.
- `POST /api/auth/login` - Password login (+ optional TOTP).
- `POST /api/auth/logout` - Clears auth cookie.
- `GET /api/auth/me` - Validates current auth cookie.
- `GET /api/stats/summary` - Aggregated metrics.
- `GET /api/stats/daily` - Daily visit trend.
- `GET /api/stats/recent` - Recent event records.
