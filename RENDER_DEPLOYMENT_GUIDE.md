# Environment Variable Changes - Deployment Guide

## 🟢 GitHub Actions Secrets (Frontend - alitman22.github.io)

**Used for building frontend artifacts for GitHub Pages**

### Already Set
- ✅ `VITE_GA_MEASUREMENT_ID` → G-0MG58YE0TJ
- ✅ `VITE_ANALYTICS_API_ORIGIN` → https://alitman-portfolio.onrender.com

### Status
**No changes needed** - Frontend secrets are complete. The production URL is already configured.

---

## 🔴 Render Environment Variables (Backend - Analytics Server)

**These control the analytics API server behavior**

### CRITICAL CHANGES (Must Update in Render Dashboard)

| Variable | Old Value | New Value | Required | Notes |
|----------|-----------|-----------|----------|-------|
| `ANALYTICS_ADMIN_USERNAME` | `admin` | `alitman` | ✅ | **Breaking change** - old username won't work for login |
| `ANALYTICS_ADMIN_EMAIL` | N/A | `alit.fattahi@gmail.com` | ✅ | New - for password reset notifications |
| `ANALYTICS_RESET_TOKEN_SECRET` | N/A | Generate with: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` | ✅ | New - for secure password reset tokens |
| `MAXMIND_DB_PATH` | (not set) | `./server/data/GeoLite2-City.mmdb` | ✅ | **Now in repo** - City database for detailed geolocation |

### Already Set in Render (No Changes)
- ✅ `TURSO_DATABASE_URL` 
- ✅ `TURSO_AUTH_TOKEN`
- ✅ `ANALYTICS_JWT_SECRET`
- ✅ `ANALYTICS_ADMIN_PASSWORD_HASH`
- ✅ `ANALYTICS_ADMIN_TOTP_SECRET`
- ✅ `ANALYTICS_COOKIE_NAME`
- ✅ `ANALYTICS_CORS_ORIGINS`

### Optional for Future (Mailgun - Skip for Now)
```
MAILGUN_API_KEY=<leave empty>
MAILGUN_DOMAIN=<leave empty>
MAILGUN_FROM_EMAIL=noreply@yourdomain.com
```

---

## 📝 Render Setup Steps

### Step 1: Update Render Environment Variables
Go to: https://dashboard.render.com → Select "alitman22-portfolio" → Settings → Environment

Update these 3 variables:

```bash
# 1. Change admin username
ANALYTICS_ADMIN_USERNAME=alitman

# 2. Add admin email
ANALYTICS_ADMIN_EMAIL=alit.fattahi@gmail.com

# 3. Generate and add reset token secret
ANALYTICS_RESET_TOKEN_SECRET=<run: node -e "console.log(require('crypto').randomBytes(48).toString('hex'))" in terminal>
```

### Step 2: Restart Render Service
After updating env vars, click **"Manual Deploy"** or **"Redeploy"** in Render dashboard.

### Step 3: GeoLite2 Geolocation (Automatic - No Setup Needed!)

✅ **MaxMind database files are now committed to your repo:**
- `server/data/GeoLite2-City.mmdb` (64 MB) - Detailed: country, region, city, lat/long
- `server/data/GeoLite2-Country.mmdb` (9.5 MB) - Lightweight: country only
- `server/data/MAXMIND_LICENSE.txt` - MaxMind license

**To enable geolocation on Render:**
1. Set this env var in Render:
   ```bash
   MAXMIND_DB_PATH=./server/data/GeoLite2-City.mmdb
   ```
2. Deploy/redeploy Render service
3. Done! Geolocation will automatically work for analytics

**Alternative for production (if size matters):**
- Use `./server/data/GeoLite2-Country.mmdb` instead (smaller, country data only)

---

## 🌐 GitHub Pages Production Issue

### Why You Can't See Changes

The responsive CSS changes should be live, but there may be **caching issues**:

**Solution: Clear Browser Cache & Force Rebuild**

1. **Hard refresh GitHub Pages** (browser cache):
   ```
   Press: Ctrl + Shift + Delete (open DevTools > Network > "Disable cache")
   Then refresh: https://alitman22.github.io/stats.html
   ```

2. **Optional: Trigger GitHub Pages rebuild**
   - Go to repo Settings → Pages → Source
   - Verify it's set to deploy from `/ (root)`
   - If cached, try: Go to Actions → last workflow → **Re-run jobs**

3. **Verify New CSS is Deployed**
   - Open DevTools → Network tab
   - Look for `stats-ChcB6b5E.css` (new hash)
   - Old would be: `stats-CzmOM-H7.css`

---

## ✅ Checklist for Production

Before password reset & geolocation work:

- [ ] Updated `ANALYTICS_ADMIN_USERNAME` in Render
- [ ] Added `ANALYTICS_ADMIN_EMAIL` in Render
- [ ] Generated and added `ANALYTICS_RESET_TOKEN_SECRET` in Render
- [ ] Added `MAXMIND_DB_PATH=./server/data/GeoLite2-City.mmdb` in Render
- [ ] Redeployed Render service
- [ ] Tested login with new username: `alitman`
- [ ] Verified responsive CSS on https://alitman22.github.io/stats.html
- [ ] Verified geolocation working in stats dashboard

**Optional Future:**
- [ ] Add Mailgun credentials when ready for email password reset
- [ ] Switch to lightweight Country database if size/performance needs it

---

## 📌 Quick Reference: All Backend Endpoints

- **Login**: `POST /api/auth/login` (alitman + password + TOTP if enabled)
- **Password Reset Request**: `POST /api/auth/password-reset-request` → emails reset link (when Mailgun configured)
- **Reset Password**: `POST /api/auth/reset-password` → uses JWT token
- **Stats - Summary**: `GET /api/stats/summary` (countries, devices, OS, totals)
- **Stats - Referrers**: `GET /api/stats/referrers?days=90` (NEW - traffic sources)
- **Stats - Pages**: `GET /api/stats/pages?days=90` (NEW - page breakdown)
- **Stats - Daily**: `GET /api/stats/daily?days=30` (visitor trend)
- **Stats - Recent**: `GET /api/stats/recent?limit=100` (last events)

All stats endpoints require auth (login first).

