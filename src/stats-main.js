import './stats.css';

const root = document.getElementById('stats-root');
const apiOrigin = (import.meta.env.VITE_ANALYTICS_API_ORIGIN || '').replace(/\/$/, '');

function endpoint(path) {
  return `${apiOrigin}${path}`;
}

async function apiRequest(path, options = {}) {
  const response = await fetch(endpoint(path), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(payload?.message || `Request failed: ${response.status}`);
  }

  return payload;
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function renderLogin(message = '') {
  root.innerHTML = `
    <main class="stats-container">
      <section class="stats-card login-card">
        <h1>Portfolio Analytics Login</h1>
        <p>Enter your analytics credentials. If 2FA is enabled, provide the current code.</p>
        <form id="login-form" class="stats-form">
          <label>
            Username
            <input name="username" type="text" autocomplete="username" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autocomplete="current-password" required minlength="10" />
          </label>
          <label>
            2FA Code (optional)
            <input name="totpCode" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="8" />
          </label>
          <button type="submit">Sign in</button>
          <p class="form-message">${message || ''}</p>
        </form>
      </section>
    </main>
  `;

  const form = document.getElementById('login-form');
  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const payload = {
      username: String(formData.get('username') || ''),
      password: String(formData.get('password') || ''),
      totpCode: String(formData.get('totpCode') || '').trim()
    };

    try {
      await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      await loadDashboard();
    } catch (error) {
      renderLogin(error.message);
    }
  });
}

function renderDashboard(summary, daily, recent) {
  const countryRows = summary.countries
    .map((row) => `<li><span>${row.label}</span><strong>${row.total}</strong></li>`)
    .join('');

  const osRows = summary.operatingSystems
    .map((row) => `<li><span>${row.label}</span><strong>${row.total}</strong></li>`)
    .join('');

  const deviceRows = summary.devices
    .map((row) => `<li><span>${row.label}</span><strong>${row.total}</strong></li>`)
    .join('');

  const dailyRows = daily.points
    .map((row) => `<tr><td>${row.day}</td><td>${row.visits}</td></tr>`)
    .join('');

  const recentRows = recent.records
    .map((row) => `
      <tr>
        <td>${formatDate(row.created_at)}</td>
        <td>${row.country || '-'}${row.city ? ` / ${row.city}` : ''}</td>
        <td>${row.device_type || '-'} | ${row.os_name || '-'}</td>
        <td>${row.browser_name || '-'}</td>
        <td>${row.path || '-'}</td>
        <td>${row.referrer || '-'}</td>
      </tr>
    `)
    .join('');

  root.innerHTML = `
    <main class="stats-container">
      <header class="stats-header">
        <h1>Portfolio Visitor Analytics</h1>
        <div class="header-actions">
          <span class="last-updated" id="last-updated">Updated: ${new Date().toLocaleTimeString()}</span>
          <button id="refresh-button" class="refresh-button" type="button">Refresh</button>
          <button id="logout-button" class="logout-button" type="button">Log out</button>
        </div>
      </header>

      <section class="stats-grid totals-grid">
        <article class="stats-card">
          <h2>Total Visits</h2>
          <p class="big-number">${summary.totals.visits}</p>
        </article>
        <article class="stats-card">
          <h2>Unique Visitors</h2>
          <p class="big-number">${summary.totals.visitors}</p>
        </article>
        <article class="stats-card">
          <h2>Total Pageviews</h2>
          <p class="big-number">${summary.totals.pageviews}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${countryRows || '<li><span>No data</span><strong>0</strong></li>'}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${deviceRows || '<li><span>No data</span><strong>0</strong></li>'}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${osRows || '<li><span>No data</span><strong>0</strong></li>'}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${daily.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${dailyRows || '<tr><td>-</td><td>0</td></tr>'}</tbody>
          </table>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Recent Events</h2>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Path</th>
                  <th>Referrer</th>
                </tr>
              </thead>
              <tbody>${recentRows || '<tr><td colspan="6">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `;

  document.getElementById('logout-button')?.addEventListener('click', async () => {
    stopAutoRefresh();
    await apiRequest('/api/auth/logout', { method: 'POST' });
    renderLogin();
  });

  document.getElementById('refresh-button')?.addEventListener('click', () => {
    loadDashboard();
  });
}

let _refreshTimer = null;

function stopAutoRefresh() {
  if (_refreshTimer) {
    clearInterval(_refreshTimer);
    _refreshTimer = null;
  }
}

async function loadDashboard() {
  try {
    const [summary, daily, recent] = await Promise.all([
      apiRequest('/api/stats/summary'),
      apiRequest('/api/stats/daily?days=30'),
      apiRequest('/api/stats/recent?limit=120')
    ]);

    renderDashboard(summary, daily, recent);
  } catch (error) {
    stopAutoRefresh();
    renderLogin(error.message);
  }
}

async function boot() {
  root.innerHTML = '<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';

  try {
    await apiRequest('/api/auth/me');
    await loadDashboard();
    stopAutoRefresh();
    _refreshTimer = setInterval(loadDashboard, 60 * 1000);
  } catch {
    renderLogin();
  }
}

boot();
