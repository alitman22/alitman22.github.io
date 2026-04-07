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

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function compactText(value, max = 42) {
  const text = String(value || '').trim();
  if (!text) return '-';
  return text.length > max ? `${text.slice(0, Math.max(0, max - 1))}…` : text;
}

function formatReferrer(value) {
  const raw = String(value || '').trim();
  if (!raw) return { short: '-', full: '-' };

  try {
    const parsed = new URL(raw);
    const short = `${parsed.hostname}${parsed.pathname === '/' ? '' : parsed.pathname}`;
    return { short: compactText(short, 34), full: raw };
  } catch {
    return { short: compactText(raw, 34), full: raw };
  }
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

function osMeta(osName) {
  const key = String(osName || '').toLowerCase();
  if (key.includes('windows')) return { label: 'Windows', className: 'os-win', icon: 'windows' };
  if (key.includes('linux')) return { label: 'Linux', className: 'os-lnx', icon: 'linux' };
  if (key.includes('android')) return { label: 'Android', className: 'os-and', icon: 'android' };
  if (key.includes('ios')) return { label: 'iOS', className: 'os-ios', icon: 'ios' };
  if (key.includes('mac')) return { label: 'macOS', className: 'os-mac', icon: 'mac' };
  return { label: 'Other OS', className: 'os-generic', icon: 'generic' };
}

function renderOsIcon(osName) {
  const meta = osMeta(osName);
  let svg = '';

  if (meta.icon === 'windows') {
    svg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="8" height="7" rx="1"></rect>
        <rect x="13" y="4" width="8" height="7" rx="1"></rect>
        <rect x="3" y="13" width="8" height="7" rx="1"></rect>
        <rect x="13" y="13" width="8" height="7" rx="1"></rect>
      </svg>`;
  } else if (meta.icon === 'linux') {
    svg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="3"></circle>
        <path d="M8 11.5c0-1.2 1-2.2 2.2-2.2h3.6c1.2 0 2.2 1 2.2 2.2v4.2c0 2.2-1.8 4-4 4s-4-1.8-4-4z"></path>
        <path d="M8 19.5l-2 1.5M16 19.5l2 1.5M9 14H6.5M15 14h2.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`;
  } else if (meta.icon === 'android') {
    svg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 9.5A4 4 0 0 1 12 6a4 4 0 0 1 4 3.5z"></path>
        <rect x="7" y="10" width="10" height="8" rx="2"></rect>
        <path d="M9 6L7.5 4.5M15 6l1.5-1.5M9 12.5h0M15 12.5h0M9 18v2M15 18v2M7 11.5v5M17 11.5v5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`;
  } else if (meta.icon === 'ios') {
    svg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7.5" y="3.5" width="9" height="17" rx="2.4"></rect>
        <circle cx="12" cy="17.5" r="0.9" fill="currentColor"></circle>
      </svg>`;
  } else if (meta.icon === 'mac') {
    svg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="10" rx="2"></rect>
        <path d="M2.8 18h18.4M9 20h6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`;
  } else {
    svg = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10" rx="2"></rect>
        <path d="M9 19h6M12 15v4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`;
  }

  return `<span class="os-badge ${meta.className}" title="${escapeHtml(meta.label)}" aria-label="${escapeHtml(meta.label)}">${svg}</span>`;
}

function toMonthTitle(dateObj) {
  return dateObj.toLocaleString(undefined, { month: 'long', year: 'numeric' });
}

function buildMonthCalendar(dateObj, visitsByDate) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const first = new Date(year, month, 1);
  const startWeekday = (first.getDay() + 6) % 7; // Monday-first
  const start = new Date(year, month, 1 - startWeekday);
  const cells = [];

  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const visits = Number(visitsByDate.get(iso) || 0);
    const inMonth = d.getMonth() === month;
    cells.push({
      dayNum: d.getDate(),
      iso,
      visits,
      inMonth
    });
  }

  return cells;
}

function periodSeries(yearlySeries, period) {
  if (period === 'day') {
    const s = yearlySeries.slice(-14);
    return s.map((row) => ({ label: row.day.slice(5), visits: row.visits }));
  }
  if (period === 'week') {
    const s = yearlySeries.slice(-7);
    return s.map((row) => ({ label: row.day.slice(5), visits: row.visits }));
  }
  if (period === 'month') {
    return aggregateByWindow(yearlySeries.slice(-30), 6, 'W');
  }
  if (period === 'quarter') {
    return aggregateByMonth(yearlySeries.slice(-90), 3).map((row) => ({ label: row.label.slice(5), visits: row.visits }));
  }
  return aggregateByMonth(yearlySeries, 12).map((row) => ({ label: row.label.slice(5), visits: row.visits }));
}

function renderTimeseriesChart(series) {
  if (!series || series.length === 0) return '<p>No data</p>';
  
  const data = series.map(row => Number(row.visits || 0));
  const maxVal = Math.max(1, ...data);
  const minVal = 0;
  const w = 640;
  const h = 140;
  const padding = 40;
  const plotW = w - padding * 2;
  const plotH = h - padding * 2;
  
  const xStep = plotW / (series.length - 1 || 1);
  const yStep = plotH / (maxVal - minVal || 1);
  
  const points = data.map((val, i) => ({
    x: padding + i * xStep,
    y: padding + plotH - (val - minVal) * yStep,
    label: series[i].label,
    visits: val
  }));
  
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const gridLines = [];
  for (let i = 0; i <= 4; i++) {
    const y = padding + (plotH / 4) * i;
    const val = Math.round(maxVal - (maxVal / 4) * i);
    gridLines.push(`<line x1="${padding}" y1="${y}" x2="${w - padding}" y2="${y}" class="chart-grid-line" />`);
    gridLines.push(`<text x="${padding - 8}" y="${y + 4}" class="chart-y-label">${val}</text>`);
  }
  
  const xLabels = points.filter((_, i) => i === 0 || i === points.length - 1 || i % Math.ceil(points.length / 4) === 0);
  const xLabelMarkup = xLabels.map(p => 
    `<text x="${p.x}" y="${h - 8}" class="chart-x-label" text-anchor="middle">${escapeHtml(p.label)}</text>`
  ).join('');
  
  const dots = points.map(p => 
    `<circle cx="${p.x}" cy="${p.y}" r="3" class="chart-dot" title="${escapeHtml(p.label)}: ${p.visits}" />`
  ).join('');
  
  return `
    <div class="timeseries-chart-wrap">
      <svg viewBox="0 0 ${w} ${h}" class="timeseries-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#0fc7ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2dd98a;stop-opacity:1" />
          </linearGradient>
        </defs>
        ${gridLines.join('\n')}
        <polyline points="${points.map(p => `${p.x},${p.y}`).join(' ')}" class="chart-line" />
        ${dots}
        ${xLabelMarkup}
      </svg>
    </div>
  `;
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
  const visitsByDate = new Map(yearlySeries.map((row) => [row.day, Number(row.visits || 0)]));
  const selectedSeries = periodSeries(yearlySeries, selectedPeriod);
  const periodBars = renderTimeseriesChart(selectedSeries);

  const monthBase = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const calendarCells = buildMonthCalendar(monthBase, visitsByDate)
    .map((cell) => {
      const intensity = Math.min(cell.visits, 10) / 10;
      const light = intensity > 0 ? 0.16 + (intensity * 0.62) : 0;
      const bg = intensity > 0
        ? `rgba(45, 217, 138, ${light.toFixed(2)})`
        : 'rgba(140, 160, 180, 0.18)';
      const dimClass = cell.inMonth ? '' : ' heat-cell-muted';
      return `<button class="heat-cell-button${dimClass}" style="background:${bg}" title="${cell.iso}: ${cell.visits} visitors" type="button">${cell.dayNum}<span class="heat-cell-count">${cell.visits > 0 ? cell.visits : ''}</span></button>`;
    })
    .join('');

  const countryRows = summary.countries
    .map((row) => `<li><span>${escapeHtml(row.label || 'Unknown')}</span><strong>${row.total}</strong></li>`)
    .join('');

  const osRows = summary.operatingSystems
    .map((row) => {
      return `<li><span class="os-entry">${renderOsIcon(row.label)}<span>${escapeHtml(row.label || 'Unknown')}</span></span><strong>${row.total}</strong></li>`;
    })
    .join('');

  const deviceRows = summary.devices
    .map((row) => `<li><span>${escapeHtml(row.label || 'Unknown')}</span><strong>${row.total}</strong></li>`)
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
    .map((row) => {
      const deviceType = escapeHtml(row.device_type || '-');
      const osName = escapeHtml(row.os_name || 'Unknown');
      const browserName = escapeHtml(row.browser_name || '-');
      const location = escapeHtml(formatLocation(row));
      const ipAddress = escapeHtml(row.ip_address || '-');
      const referrer = formatReferrer(row.referrer);

      return `
        <tr>
          <td><input type="checkbox" class="event-check" value="${row.event_id}" /></td>
          <td><span class="cell-time">${escapeHtml(formatDate(row.created_at))}</span></td>
          <td><span class="mono-cell">${ipAddress}</span></td>
          <td><span class="truncate-cell" title="${location}">${location}</span></td>
          <td>
            <span class="device-stack">
              <span class="device-topline">${renderOsIcon(row.os_name)}<span class="truncate-cell" title="${osName}">${osName}</span></span>
              <span class="device-subline">${deviceType}</span>
            </span>
          </td>
          <td><span class="truncate-cell" title="${browserName}">${browserName}</span></td>
          <td><span class="truncate-cell" title="${escapeHtml(referrer.full)}">${escapeHtml(referrer.short)}</span></td>
        </tr>
      `;
    })
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

        <div class="stats-overview">
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

      <section class="stats-grid focus-grid compact-focus-grid">
        <article class="stats-card period-card">
          <div class="period-header">
            <h2>Visitors Trend</h2>
            <select id="period-select" class="per-page-select">
              <option value="day" ${selectedPeriod === 'day' ? 'selected' : ''}>Day</option>
              <option value="week" ${selectedPeriod === 'week' ? 'selected' : ''}>Week</option>
              <option value="month" ${selectedPeriod === 'month' ? 'selected' : ''}>Month</option>
              <option value="quarter" ${selectedPeriod === 'quarter' ? 'selected' : ''}>Quarter</option>
              <option value="year" ${selectedPeriod === 'year' ? 'selected' : ''}>Year</option>
            </select>
          </div>
          ${periodBars}
        </article>
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <button id="calendar-prev" class="refresh-button" type="button">Prev</button>
            <div class="calendar-title-wrap">
              <h2>${toMonthTitle(monthBase)}</h2>
              <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
            </div>
            <button id="calendar-next" class="refresh-button" type="button">Next</button>
          </div>
          <div class="calendar-weekdays">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="calendar-grid">${calendarCells}</div>
        </article>
      </section>

      <section class="stats-grid compact-analytics-grid">
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
      </div>

      <section class="stats-grid compact-table-grid">
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
            <table class="recent-events-table">
              <colgroup>
                <col class="col-select" />
                <col class="col-time" />
                <col class="col-ip" />
                <col class="col-location" />
                <col class="col-device" />
                <col class="col-browser" />
                <col class="col-referrer" />
              </colgroup>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Time</th>
                  <th>IP</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Referrer</th>
                </tr>
              </thead>
              <tbody>${recentRows || '<tr><td colspan="7">No events yet</td></tr>'}</tbody>
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

  document.getElementById('period-select')?.addEventListener('change', (event) => {
    selectedPeriod = String(event.target.value || 'week');
    renderDashboard(summary, daily, recent, yearlyDaily);
  });

  document.getElementById('calendar-prev')?.addEventListener('click', () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
    renderDashboard(summary, daily, recent, yearlyDaily);
  });

  document.getElementById('calendar-next')?.addEventListener('click', () => {
    calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
    renderDashboard(summary, daily, recent, yearlyDaily);
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
let selectedPeriod = 'week';
let calendarMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

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
