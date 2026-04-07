import './stats.css';
import logoStats from './assets/logo-stats.png';

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

function formatPercent(value) {
  if (!Number.isFinite(value)) return '0%';
  return `${Math.round(value)}%`;
}

function toIsoDateUTC(date) {
  return date.toISOString().slice(0, 10);
}

function buildDailySeries(points, days) {
  const byDay = new Map((points || []).map((row) => [String(row.day), Number(row.visits || 0)]));
  const series = [];
  const now = new Date();
  const startUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(startUtc);
    d.setUTCDate(startUtc.getUTCDate() - i);
    const key = toIsoDateUTC(d);
    series.push({ day: key, visits: byDay.get(key) || 0 });
  }

  return series;
}

function sumVisits(series) {
  return (series || []).reduce((acc, row) => acc + Number(row.visits || 0), 0);
}

function aggregateByWindow(series, windowSize, labelPrefix) {
  const out = [];
  let index = 0;
  for (let i = 0; i < series.length; i += windowSize) {
    const slice = series.slice(i, i + windowSize);
    out.push({
      label: `${labelPrefix}${index + 1}`,
      visits: sumVisits(slice)
    });
    index += 1;
  }
  return out;
}

function aggregateByMonth(series, monthsBack) {
  const monthMap = new Map();
  for (const row of series) {
    const month = String(row.day).slice(0, 7);
    monthMap.set(month, (monthMap.get(month) || 0) + Number(row.visits || 0));
  }

  const now = new Date();
  const rows = [];
  for (let i = monthsBack - 1; i >= 0; i -= 1) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const monthKey = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    rows.push({
      label: monthKey,
      visits: monthMap.get(monthKey) || 0
    });
  }
  return rows;
}

function renderMiniBars(series, accentClass = '') {
  if (!series || series.length === 0) {
    return '<p>No data</p>';
  }

  const max = Math.max(1, ...series.map((row) => Number(row.visits || 0)));
  return `
    <div class="mini-bars">
      ${series
        .map((row) => {
          const visits = Number(row.visits || 0);
          const height = Math.max(8, Math.round((visits / max) * 100));
          return `<div class="mini-bar ${accentClass}" style="height:${height}%" title="${row.label}: ${visits}"></div>`;
        })
        .join('')}
    </div>
  `;
}

function formatLocation(row) {
  const country = row.country || '-';
  const region = row.region || null;
  const city = row.city || null;

  if (!row.country && !region && !city) return '-';
  if (region) return `${country} / ${region}`;
  if (city) return `${country} / ${city}`;
  return country;
}

function renderLogin(message = '') {
  root.innerHTML = `
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${logoStats}" alt="Portfolio Analytics" class="login-hero-image" />
        </div>
        <div class="login-brand-copy">
          <h1>Portfolio Analytics</h1>
          <p>Secure dashboard access</p>
        </div>
        <p class="login-help">Enter your analytics credentials. If 2FA is enabled, provide the current code.</p>
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

function renderDashboard(summary, daily, recent, yearlyDaily) {
  const totalVisits = Number(summary.totals.visits || 0);
  const totalVisitors = Number(summary.totals.visitors || 0);
  const totalPageviews = Number(summary.totals.pageviews || 0);

  const pagesPerVisit = totalVisits > 0 ? totalPageviews / totalVisits : 0;
  const returningRate = totalVisits > 0 ? ((totalVisits - totalVisitors) / totalVisits) * 100 : 0;
  const topCountryTotal = summary.countries?.[0]?.total || 0;
  const topCountryShare = totalVisits > 0 ? (topCountryTotal / totalVisits) * 100 : 0;
  const geoCoverage = (summary.countries || []).filter((row) => row.label && row.label !== 'Unknown').length;

  const yearlySeries = buildDailySeries(yearlyDaily.points || [], 365);
  const weekSeries = yearlySeries.slice(-7).map((row, idx) => ({ label: `D${idx + 1}`, visits: row.visits }));
  const monthSeries = aggregateByWindow(yearlySeries.slice(-30), 6, 'W');
  const quarterSeries = aggregateByMonth(yearlySeries.slice(-90), 3).map((row) => ({ label: row.label.slice(5), visits: row.visits }));
  const yearSeries = aggregateByMonth(yearlySeries, 12).map((row) => ({ label: row.label.slice(5), visits: row.visits }));

  const heatmapCells = yearlySeries
    .map((row) => {
      const visits = Number(row.visits || 0);
      const intensity = Math.min(visits, 10) / 10;
      const light = intensity > 0 ? 0.16 + (intensity * 0.62) : 0;
      const bg = intensity > 0
        ? `rgba(45, 217, 138, ${light.toFixed(2)})`
        : 'rgba(140, 160, 180, 0.18)';
      return `<div class="heat-cell" style="background:${bg}" title="${row.day}: ${visits} visitors"></div>`;
    })
    .join('');

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

  const orderedDaily = [...daily.points].reverse();
  const maxDailyVisits = Math.max(1, ...orderedDaily.map((row) => Number(row.visits || 0)));
  const dailyBars = orderedDaily
    .map((row) => {
      const visits = Number(row.visits || 0);
      const width = Math.max(4, Math.round((visits / maxDailyVisits) * 100));
      return `
        <div class="bar-row">
          <span class="bar-label">${row.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${width}%"></div></div>
          <strong class="bar-value">${visits}</strong>
        </div>
      `;
    })
    .join('');

  const totalDevices = Math.max(1, (summary.devices || []).reduce((acc, row) => acc + Number(row.total || 0), 0));
  const deviceBars = (summary.devices || [])
    .map((row) => {
      const ratio = (Number(row.total || 0) / totalDevices) * 100;
      const width = Math.max(4, Math.round(ratio));
      return `
        <div class="bar-row">
          <span class="bar-label">${row.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${width}%"></div></div>
          <strong class="bar-value">${formatPercent(ratio)}</strong>
        </div>
      `;
    })
    .join('');

  const recentRows = recent.records
    .map((row) => `
      <tr>
        <td><input type="checkbox" class="event-check" value="${row.event_id}" /></td>
        <td>${formatDate(row.created_at)}</td>
        <td>${formatLocation(row)}</td>
        <td>${row.device_type || '-'} | ${row.os_name || '-'}</td>
        <td>${row.browser_name || '-'}</td>
        <td>${row.referrer || '-'}</td>
      </tr>
    `)
    .join('');

  const paging = recent.paging || { page: 1, perPage: recentPerPage, totalPages: 1, total: 0 };

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
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${pagesPerVisit.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${formatPercent(returningRate)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${formatPercent(topCountryShare)}</strong></div>
            <div class="metric-item"><span>Geo Coverage</span><strong>${geoCoverage}</strong></div>
          </div>
        </article>
      </section>

      <section class="stats-grid period-charts-grid">
        <article class="stats-card period-card">
          <h2>Week Visitors</h2>
          ${renderMiniBars(weekSeries)}
        </article>
        <article class="stats-card period-card">
          <h2>Month Visitors</h2>
          ${renderMiniBars(monthSeries, 'mini-bar-accent')}
        </article>
        <article class="stats-card period-card">
          <h2>Quarter Visitors</h2>
          ${renderMiniBars(quarterSeries)}
        </article>
        <article class="stats-card period-card">
          <h2>Year Visitors</h2>
          ${renderMiniBars(yearSeries, 'mini-bar-accent')}
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <h2>Visitor Calendar (1 Year)</h2>
            <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
          </div>
          <div class="heatmap-grid">${heatmapCells}</div>
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
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${dailyBars || '<p>No trend data</p>'}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${deviceBars || '<p>No device data</p>'}</div>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <div class="recent-events-header">
            <h2>Recent Events</h2>
            <div class="paging-controls">
              <button id="delete-selected-button" class="refresh-button danger-button" type="button">Delete Selected</button>
              <label for="per-page-select">Rows</label>
              <select id="per-page-select" class="per-page-select">
                ${[10, 20, 50, 100]
                  .map((value) => `<option value="${value}" ${paging.perPage === value ? 'selected' : ''}>${value}</option>`)
                  .join('')}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${paging.page <= 1 ? 'disabled' : ''}>Prev</button>
              <span class="paging-meta">Page ${paging.page} / ${paging.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${paging.page >= paging.totalPages ? 'disabled' : ''}>Next</button>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Browser</th>
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

  document.getElementById('prev-page-button')?.addEventListener('click', () => {
    if (recentPage > 1) {
      recentPage -= 1;
      loadDashboard();
    }
  });

  document.getElementById('next-page-button')?.addEventListener('click', () => {
    if (recentPage < paging.totalPages) {
      recentPage += 1;
      loadDashboard();
    }
  });

  document.getElementById('per-page-select')?.addEventListener('change', (event) => {
    const value = Number.parseInt(event.target.value, 10);
    if (Number.isFinite(value)) {
      recentPerPage = value;
      recentPage = 1;
      loadDashboard();
    }
  });

  document.getElementById('delete-selected-button')?.addEventListener('click', async () => {
    const selectedIds = Array.from(document.querySelectorAll('.event-check:checked'))
      .map((input) => Number.parseInt(input.value, 10))
      .filter((value) => Number.isInteger(value) && value > 0);

    if (selectedIds.length === 0) {
      return;
    }

    const confirmed = window.confirm(`Delete ${selectedIds.length} selected visit row(s)?`);
    if (!confirmed) {
      return;
    }

    try {
      await apiRequest('/api/stats/events', {
        method: 'DELETE',
        body: JSON.stringify({ eventIds: selectedIds })
      });

      await loadDashboard();
    } catch (error) {
      window.alert(error.message || 'Failed to delete selected rows.');
    }
  });
}

let _refreshTimer = null;
let recentPage = 1;
let recentPerPage = 20;

function stopAutoRefresh() {
  if (_refreshTimer) {
    clearInterval(_refreshTimer);
    _refreshTimer = null;
  }
}

async function loadDashboard() {
  try {
    const [summary, daily, recent, yearlyDaily] = await Promise.all([
      apiRequest('/api/stats/summary'),
      apiRequest('/api/stats/daily?days=30'),
      apiRequest(`/api/stats/recent?page=${recentPage}&perPage=${recentPerPage}`),
      apiRequest('/api/stats/daily?days=365')
    ]);

    if (recent?.paging?.page) {
      recentPage = recent.paging.page;
    }

    renderDashboard(summary, daily, recent, yearlyDaily);
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
