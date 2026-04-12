import './stats.css';
import logoStats from './assets/logo-stats.png';

const root = document.getElementById('stats-root');
const apiOrigin = (import.meta.env.VITE_ANALYTICS_API_ORIGIN || '').replace(/\/$/, '');

const state = {
  rangeDays: 30,
  page: 1,
  perPage: 20,
  compactEventTable: true,
  filters: {
    eventType: 'all',
    country: 'all',
    query: ''
  },
  data: null,
  selectedEventIds: new Set(),
  refreshTimer: null
};

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
  if (!response.ok) throw new Error(payload?.message || `Request failed: ${response.status}`);
  return payload;
}

function esc(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function fmt(value, digits = 0) {
  const num = Number(value) || 0;
  return num.toLocaleString(undefined, { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

function pct(value, digits = 1) {
  const num = Number(value) || 0;
  return `${num.toFixed(digits)}%`;
}

const COUNTRY_CODE_MAP = {
  'turkiye': 'TR',
  'turkey': 'TR',
  'united states': 'US',
  'usa': 'US',
  'germany': 'DE',
  'netherlands': 'NL',
  'iran': 'IR',
  'russia': 'RU',
  'lithuania': 'LT',
  'united kingdom': 'GB',
  'uk': 'GB',
  'france': 'FR',
  'spain': 'ES',
  'italy': 'IT',
  'canada': 'CA',
  'unknown': ''
};

function countryFlag(countryName) {
  const key = String(countryName || '').trim().toLowerCase();
  const code = COUNTRY_CODE_MAP[key] || '';
  if (!code || code.length !== 2) return '';
  return code
    .toUpperCase()
    .split('')
    .map((ch) => String.fromCodePoint(127397 + ch.charCodeAt(0)))
    .join('');
}

function withCountryFlag(countryName) {
  const name = String(countryName || 'Unknown');
  const flag = countryFlag(name);
  return flag ? `${flag} ${name}` : name;
}

function osIcon(osName) {
  const os = String(osName || '').toLowerCase();
  if (os.includes('windows')) return '🪟';
  if (os.includes('android')) return '🤖';
  if (os.includes('ios') || os.includes('mac')) return '🍎';
  if (os.includes('linux')) return '🐧';
  return '💻';
}

function deviceIcon(deviceType) {
  const device = String(deviceType || '').toLowerCase();
  if (device.includes('mobile')) return '📱';
  if (device.includes('tablet')) return '📲';
  if (device.includes('desktop')) return '🖥️';
  return '🧩';
}

function formatCountryCity(row) {
  const country = withCountryFlag(row.country || 'Unknown');
  const region = String(row.region || '').trim();
  const city = String(row.city || '').trim();

  // TR geo providers sometimes return district/neighborhood in city.
  // Prefer region for a cleaner city-level readout and keep city in parentheses.
  if (region && city && region.toLowerCase() !== city.toLowerCase()) {
    return `${country} / ${region} (${city})`;
  }
  if (region) return `${country} / ${region}`;
  if (city) return `${country} / ${city}`;
  return country;
}

function parseEventIds(rawValue) {
  return String(rawValue || '')
    .split(',')
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isFinite(value));
}

function compactRecentRecords(records) {
  const groups = [];
  const byKey = new Map();

  for (const row of records) {
    const ts = String(row.created_at || '');
    const minute = ts.slice(0, 16);
    const session = String(row.session_id || row.ip_address || 'unknown');
    const path = String(row.path || '');
    const key = `${session}|${minute}|${path}`;

    let group = byKey.get(key);
    if (!group) {
      group = {
        created_at: row.created_at,
        ip_address: row.ip_address,
        country: row.country,
        city: row.city,
        region: row.region,
        device_type: row.device_type,
        os_name: row.os_name,
        referrer: row.referrer,
        eventIds: [],
        eventCounts: new Map()
      };
      byKey.set(key, group);
      groups.push(group);
    }

    const eventId = Number.parseInt(String(row.event_id), 10);
    if (Number.isFinite(eventId)) {
      group.eventIds.push(eventId);
    }

    const eventType = String(row.event_type || 'unknown');
    group.eventCounts.set(eventType, (group.eventCounts.get(eventType) || 0) + 1);
  }

  return groups.map((group) => {
    const entries = Array.from(group.eventCounts.entries()).sort((a, b) => b[1] - a[1]);
    const total = entries.reduce((sum, [, count]) => sum + count, 0);
    const summary = entries
      .slice(0, 3)
      .map(([eventType, count]) => (count > 1 ? `${eventType} x${count}` : eventType))
      .join(', ');
    const extra = entries.length > 3 ? ` +${entries.length - 3} more` : '';

    return {
      ...group,
      eventCount: total,
      eventSummary: `${summary}${extra}`
    };
  });
}

function trendClass(changePct) {
  if (changePct > 0.01) return 'trend-up';
  if (changePct < -0.01) return 'trend-down';
  return 'trend-flat';
}

function sparkline(values) {
  const data = Array.isArray(values) ? values.map((v) => Number(v) || 0) : [];
  if (data.length === 0) return '';

  const width = 120;
  const height = 36;
  const pad = 4;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const spread = max - min || 1;
  const step = (width - pad * 2) / Math.max(data.length - 1, 1);
  const points = data.map((v, i) => {
    const x = pad + (step * i);
    const y = height - pad - (((v - min) / spread) * (height - pad * 2));
    return `${x},${y}`;
  }).join(' ');

  return `
    <svg viewBox="0 0 ${width} ${height}" class="sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${points}" class="sparkline-line"></polyline>
    </svg>
  `;
}

function lineChart(series, xKey, yKeys) {
  if (!Array.isArray(series) || series.length === 0) return '<p class="empty">No data</p>';

  const width = 760;
  const height = 220;
  const padX = 36;
  const padY = 20;
  const plotW = width - (padX * 2);
  const plotH = height - (padY * 2);

  const allValues = series.flatMap((row) => yKeys.map((key) => Number(row[key]) || 0));
  const maxVal = Math.max(1, ...allValues);
  const step = plotW / Math.max(series.length - 1, 1);

  const lines = yKeys.map((key, idx) => {
    const colorClass = idx === 0 ? 'chart-line-a' : idx === 1 ? 'chart-line-b' : 'chart-line-c';
    const points = series.map((row, i) => {
      const x = padX + (i * step);
      const y = height - padY - (((Number(row[key]) || 0) / maxVal) * plotH);
      return `${x},${y}`;
    }).join(' ');
    return `<polyline points="${points}" class="${colorClass}" />`;
  }).join('');

  const labels = series
    .filter((_, idx) => idx === 0 || idx === series.length - 1 || idx % Math.ceil(series.length / 4) === 0)
    .map((row, i) => {
      const x = padX + (i * (plotW / Math.max(Math.ceil(series.length / 4), 1)));
      const text = String(row[xKey] || '').slice(5);
      return `<text x="${x}" y="${height - 4}" class="chart-x-label">${esc(text)}</text>`;
    })
    .join('');

  return `
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
      <line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" class="chart-axis" />
      <line x1="${padX}" y1="${padY}" x2="${padX}" y2="${height - padY}" class="chart-axis" />
      ${lines}
      ${labels}
    </svg>
  `;
}

function barChart(rows, labelKey, valueKey, danger = false) {
  const data = Array.isArray(rows) ? rows : [];
  if (data.length === 0) return '<p class="empty">No data</p>';
  const max = Math.max(1, ...data.map((row) => Number(row[valueKey]) || 0));
  return data.map((row) => {
    const value = Number(row[valueKey]) || 0;
    const width = Math.max(3, Math.round((value / max) * 100));
    return `
      <div class="bar-row">
        <span>${esc(row[labelKey])}</span>
        <div class="bar-track"><div class="bar-fill ${danger ? 'bar-danger' : ''}" style="width:${width}%"></div></div>
        <strong>${fmt(value)}</strong>
      </div>
    `;
  }).join('');
}

function donutChart(rows, labelKey, valueKey) {
  const data = Array.isArray(rows) ? rows : [];
  const total = data.reduce((acc, row) => acc + (Number(row[valueKey]) || 0), 0);
  if (!total) return '<p class="empty">No data</p>';

  let offset = 0;
  const colors = ['#2dd98a', '#28b4ff', '#f5b84a', '#9b7cff', '#f56f7f'];
  const segments = data.map((row, idx) => {
    const value = Number(row[valueKey]) || 0;
    const pctVal = (value / total) * 100;
    const seg = `<circle r="44" cx="60" cy="60" stroke="${colors[idx % colors.length]}" stroke-dasharray="${pctVal} ${100 - pctVal}" stroke-dashoffset="${-offset}" />`;
    offset += pctVal;
    return seg;
  }).join('');

  const legend = data.map((row, idx) => {
    const value = Number(row[valueKey]) || 0;
    const share = (value / total) * 100;
    return `<li><span><i style="background:${colors[idx % colors.length]}"></i>${esc(row[labelKey])}</span><strong>${pct(share, 1)}</strong></li>`;
  }).join('');

  return `
    <div class="donut-wrap">
      <svg viewBox="0 0 120 120" class="donut-svg">
        <g transform="rotate(-90 60 60)">
          ${segments}
        </g>
        <text x="60" y="58" text-anchor="middle" class="donut-total">${fmt(total)}</text>
        <text x="60" y="73" text-anchor="middle" class="donut-sub">visitors</text>
      </svg>
      <ul class="legend-list">${legend}</ul>
    </div>
  `;
}

function renderLogin(message = '') {
  root.innerHTML = `
    <main class="analytics-shell auth-shell">
      <section class="panel auth-panel">
        <img src="${logoStats}" alt="Portfolio Analytics" class="auth-logo" />
        <h1>Portfolio Analytics</h1>
        <p>Sign in to access the insight dashboard.</p>
        <form id="login-form" class="auth-form">
          <label>Username<input name="username" type="text" required autocomplete="username" /></label>
          <label>Password<input name="password" type="password" required autocomplete="current-password" /></label>
          <label>2FA Code (optional)<input name="totpCode" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="8" /></label>
          <button type="submit">Sign in</button>
          <p class="error">${esc(message)}</p>
        </form>
      </section>
    </main>
  `;

  document.getElementById('login-form')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username: String(formData.get('username') || ''),
          password: String(formData.get('password') || ''),
          totpCode: String(formData.get('totpCode') || '').trim()
        })
      });
      await loadDashboard();
      scheduleRefresh();
    } catch (error) {
      renderLogin(error.message);
    }
  });
}

function kpiCard(label, metric, unit = '', helpText = '') {
  const change = Number(metric?.changePct) || 0;
  const value = Number(metric?.value) || 0;
  return `
    <article class="kpi-card">
      <header>
        <h3>${esc(label)}${helpText ? ` <span class="kpi-help" title="${esc(helpText)}">?</span>` : ''}</h3>
        <span class="kpi-trend ${trendClass(change)}">${change >= 0 ? '+' : ''}${change.toFixed(1)}%</span>
      </header>
      <p class="kpi-value">${fmt(value, unit === '%' ? 1 : 0)}${unit}</p>
      ${sparkline(metric?.sparkline || [])}
    </article>
  `;
}

function renderDashboard(data) {
  const { summary, sources, funnel, conversions, recent } = data;
  const k = summary.kpis || {};
  const records = recent.records || [];
  const paging = recent.paging || { page: 1, totalPages: 1, total: 0, perPage: state.perPage };

  const eventTypes = ['all', 'page_view', 'scroll', 'section_view', 'project_click', 'resume_download', 'contact_click', 'outbound_click'];
  const countries = ['all', ...new Set([...(summary.segmentation?.byCountry || []).map((row) => row.country)])].slice(0, 30);

  const funnelRows = (funnel.funnel || []).map((row) => ({
    step: row.step,
    dropOff: row.dropOffPct
  }));

  const tableRows = state.compactEventTable ? compactRecentRecords(records) : records;

  const recentRows = tableRows.map((row) => {
    const when = new Date(row.created_at).toLocaleString();
    const location = formatCountryCity(row);
    const eventIds = state.compactEventTable
      ? row.eventIds
      : parseEventIds(String(Number.parseInt(String(row.event_id), 10)));
    const checkboxValue = eventIds.join(',');
    const allChecked = eventIds.length > 0 && eventIds.every((id) => state.selectedEventIds.has(id));
    return `
      <tr>
        <td><input type="checkbox" class="event-select" value="${esc(checkboxValue)}" ${allChecked ? 'checked' : ''} /></td>
        <td>${esc(when)}</td>
        <td>${esc(row.ip_address || '-')}</td>
        <td>${esc(location)}</td>
        <td><span class="metric-icon" title="${esc(row.device_type || '-')}" aria-hidden="true">${deviceIcon(row.device_type)}</span> ${esc(row.device_type || '-')}</td>
        <td><span class="metric-icon" title="${esc(row.os_name || '-')}" aria-hidden="true">${osIcon(row.os_name)}</span> ${esc(row.os_name || '-')}</td>
        <td>${esc(state.compactEventTable ? `${row.eventSummary} (${row.eventCount})` : (row.event_type || '-'))}</td>
        <td>${esc(row.referrer || '-')}</td>
      </tr>
    `;
  }).join('');

  root.innerHTML = `
    <main class="analytics-shell">
      <header class="topbar">
        <div>
          <h1>Portfolio Analytics Intelligence</h1>
          <p>Decision-driven funnel, behavior, and conversion panel</p>
        </div>
        <div class="topbar-actions">
          <label>
            Period
            <select id="range-days">
              <option value="14" ${state.rangeDays === 14 ? 'selected' : ''}>14d</option>
              <option value="30" ${state.rangeDays === 30 ? 'selected' : ''}>30d</option>
              <option value="60" ${state.rangeDays === 60 ? 'selected' : ''}>60d</option>
              <option value="90" ${state.rangeDays === 90 ? 'selected' : ''}>90d</option>
            </select>
          </label>
          <button id="refresh-btn" type="button">Refresh</button>
          <button id="logout-btn" type="button" class="danger">Logout</button>
        </div>
      </header>

      <section class="kpi-row">
        ${kpiCard('Unique Visitors', k.uniqueVisitors, '', 'Count of distinct anonymous users in selected period.')}
        ${kpiCard('Conversion Rate', k.conversionRate, '%', 'Ratio of resume downloads + project clicks to unique visitors.')}
        ${kpiCard('Resume Downloads', k.resumeDownloads, '', 'How many resume download events happened in selected period.')}
        ${kpiCard('Project Clicks', k.projectClicks, '', 'How many outbound project link clicks happened in selected period.')}
        ${kpiCard('Engagement Score', k.engagementScore, '', 'Composite signal from scroll depth and interactions per user.')}
        ${kpiCard('Avg Scroll Depth', k.avgScrollDepth, '%', 'Average maximum scroll depth reached by users.')}
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Acquisition Sources</h2>
          ${donutChart(sources.chart || [], 'source', 'visitors')}
        </article>
        <article class="panel">
          <h2>Source Quality</h2>
          <table class="data-table">
            <thead><tr><th>Source</th><th>Visitors</th><th>Conv%</th><th>Avg Engagement</th></tr></thead>
            <tbody>
              ${(sources.table || []).map((row) => `
                <tr>
                  <td>${esc(row.source)}</td>
                  <td>${fmt(row.visitors)}</td>
                  <td>${pct(row.conversionRate, 1)}</td>
                  <td>${fmt(row.avgEngagement, 1)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </article>
      </section>

      <section class="grid three">
        <article class="panel">
          <h2>Scroll Funnel</h2>
          <div class="bar-stack">${barChart(funnelRows, 'step', 'dropOff', true)}</div>
        </article>
        <article class="panel">
          <h2>Section Engagement</h2>
          <div class="bar-stack">${barChart(funnel.sectionEngagement || [], 'section', 'interactions')}</div>
        </article>
        <article class="panel">
          <h2>Scroll Depth Distribution</h2>
          ${lineChart((conversions.scrollDistribution || []).map((row) => ({ day: `${row.depth}%`, users: row.users })), 'day', ['users'])}
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Conversion Trend</h2>
          ${lineChart(conversions.trend || [], 'day', ['resumeDownloads', 'projectClicks'])}
          <div class="chart-legend">
            <span><i class="legend-a"></i> Resume Downloads</span>
            <span><i class="legend-b"></i> Project Clicks</span>
          </div>
        </article>
        <article class="panel">
          <h2>Conversion by Device</h2>
          <div class="bar-stack">${barChart(conversions.byDevice || [], 'segment', 'conversionRate')}</div>
          <h3>Conversion by Country</h3>
          <div class="bar-stack">${barChart((conversions.byCountry || []).slice(0, 8), 'segment', 'conversionRate')}</div>
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>New vs Returning Users</h2>
          ${donutChart([
            { label: 'New', value: summary.segmentation?.newVsReturning?.newUsers || 0 },
            { label: 'Returning', value: summary.segmentation?.newVsReturning?.returningUsers || 0 }
          ], 'label', 'value')}
          <p class="hint">Returning user ratio: ${pct(summary.derived?.returningUserRatio || 0, 1)}</p>
        </article>
        <article class="panel">
          <h2>Geo Distribution</h2>
          <table class="data-table">
            <thead><tr><th>Country</th><th>Visitors</th><th>Conv%</th></tr></thead>
            <tbody>
              ${(conversions.byCountry || []).map((row) => `
                <tr>
                  <td>${esc(withCountryFlag(row.segment))}</td>
                  <td>${fmt(row.visitors)}</td>
                  <td>${pct(row.conversionRate, 1)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </article>
      </section>

      <section class="panel panel-scroll">
          <h2>Event Log (Developer View)</h2>
          <div class="filter-row">
            <label class="event-select-all"><input id="select-all-events" type="checkbox" /> Select page</label>
            <select id="filter-event-type">
              ${eventTypes.map((type) => `<option value="${type}" ${state.filters.eventType === type ? 'selected' : ''}>${type}</option>`).join('')}
            </select>
            <select id="filter-country">
              ${countries.map((country) => `<option value="${esc(country)}" ${state.filters.country === country ? 'selected' : ''}>${esc(country)}</option>`).join('')}
            </select>
            <label>
              Rows
              <select id="rows-per-page">
                <option value="10" ${state.perPage === 10 ? 'selected' : ''}>10</option>
                <option value="20" ${state.perPage === 20 ? 'selected' : ''}>20</option>
                <option value="50" ${state.perPage === 50 ? 'selected' : ''}>50</option>
                <option value="100" ${state.perPage === 100 ? 'selected' : ''}>100</option>
              </select>
            </label>
            <input id="filter-query" type="search" placeholder="Search path / referrer / event" value="${esc(state.filters.query)}" />
            <label class="event-select-all"><input id="compact-view" type="checkbox" ${state.compactEventTable ? 'checked' : ''} /> Compact</label>
            <button id="delete-selected" type="button" class="danger">Delete Selected</button>
            <button id="apply-filters" type="button">Apply</button>
          </div>
        </div>

        <div class="table-scroll table-scroll-events">
          <table class="data-table mono">
            <thead>
              <tr>
                <th>Select</th>
                <th>Timestamp</th>
                <th>IP</th>
                <th>Country / City</th>
                <th>Device</th>
                <th>OS</th>
                <th>Event Type</th>
                <th>Referrer</th>
              </tr>
            </thead>
            <tbody>${recentRows || '<tr><td colspan="8">No events</td></tr>'}</tbody>
          </table>
        </div>

        <div class="pager">
          <button id="prev-page" ${paging.page <= 1 ? 'disabled' : ''}>Prev</button>
          <span>Page ${paging.page} / ${paging.totalPages} (${fmt(paging.total)} events${state.compactEventTable ? `, ${fmt(tableRows.length)} compact rows` : ''})</span>
          <button id="next-page" ${paging.page >= paging.totalPages ? 'disabled' : ''}>Next</button>
        </div>
      </section>

      <section class="panel">
        <h2>Automated Insights</h2>
        <ul class="insights">
          ${(summary.insights || []).map((msg) => `<li>${esc(msg)}</li>`).join('') || '<li>No critical anomalies for this period.</li>'}
          ${(() => {
            const steps = funnel.funnel || [];
            const projects = steps.find((s) => s.step === 'Projects');
            if (projects && projects.dropOffPct >= 50) {
              return `<li>High funnel leakage: ${pct(projects.dropOffPct, 1)} drop-off before Projects.</li>`;
            }
            return '';
          })()}
        </ul>
      </section>
    </main>
  `;

  bindDashboardEvents();
}

function bindDashboardEvents() {
  document.getElementById('refresh-btn')?.addEventListener('click', loadDashboard);

  document.getElementById('logout-btn')?.addEventListener('click', async () => {
    stopRefresh();
    await apiRequest('/api/auth/logout', { method: 'POST' });
    renderLogin();
  });

  document.getElementById('range-days')?.addEventListener('change', (event) => {
    state.rangeDays = Number.parseInt(event.target.value, 10) || 30;
    state.page = 1;
    loadDashboard();
  });

  document.getElementById('apply-filters')?.addEventListener('click', () => {
    state.filters.eventType = document.getElementById('filter-event-type')?.value || 'all';
    state.filters.country = document.getElementById('filter-country')?.value || 'all';
    state.filters.query = document.getElementById('filter-query')?.value || '';
    state.page = 1;
    loadDashboard();
  });

  document.getElementById('rows-per-page')?.addEventListener('change', (event) => {
    const next = Number.parseInt(event.target.value, 10);
    state.perPage = [10, 20, 50, 100].includes(next) ? next : 20;
    state.page = 1;
    loadDashboard();
  });

  document.getElementById('compact-view')?.addEventListener('change', (event) => {
    state.compactEventTable = Boolean(event.target.checked);
    renderDashboard(state.data);
  });

  document.querySelectorAll('.event-select').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => {
      const ids = parseEventIds(event.target.value);
      if (ids.length === 0) return;
      if (event.target.checked) {
        ids.forEach((id) => state.selectedEventIds.add(id));
      } else {
        ids.forEach((id) => state.selectedEventIds.delete(id));
      }
    });
  });

  document.getElementById('select-all-events')?.addEventListener('change', (event) => {
    const checked = Boolean(event.target.checked);
    document.querySelectorAll('.event-select').forEach((checkbox) => {
      checkbox.checked = checked;
      const ids = parseEventIds(checkbox.value);
      if (ids.length === 0) return;
      if (checked) ids.forEach((id) => state.selectedEventIds.add(id));
      else ids.forEach((id) => state.selectedEventIds.delete(id));
    });
  });

  document.getElementById('delete-selected')?.addEventListener('click', async () => {
    const eventIds = Array.from(state.selectedEventIds.values());
    if (eventIds.length === 0) return;

    const confirmed = window.confirm(`Delete ${eventIds.length} selected record(s)?`);
    if (!confirmed) return;

    try {
      await apiRequest('/api/stats/events', {
        method: 'DELETE',
        body: JSON.stringify({ eventIds })
      });
      state.selectedEventIds.clear();
      await loadDashboard();
    } catch (error) {
      window.alert(error.message || 'Delete failed');
    }
  });

  document.getElementById('prev-page')?.addEventListener('click', () => {
    if (state.page > 1) {
      state.page -= 1;
      loadDashboard();
    }
  });

  document.getElementById('next-page')?.addEventListener('click', () => {
    state.page += 1;
    loadDashboard();
  });
}

async function loadDashboard() {
  try {
    const selectedBefore = new Set(state.selectedEventIds);
    const query = new URLSearchParams({
      days: String(state.rangeDays),
      page: String(state.page),
      perPage: String(state.perPage),
      eventType: state.filters.eventType,
      country: state.filters.country,
      search: state.filters.query
    });

    const [summary, sources, funnel, conversions, recent] = await Promise.all([
      apiRequest(`/api/stats/summary?days=${state.rangeDays}`),
      apiRequest(`/api/stats/sources?days=${state.rangeDays}`),
      apiRequest(`/api/stats/funnel?days=${state.rangeDays}`),
      apiRequest(`/api/stats/conversions?days=${state.rangeDays}`),
      apiRequest(`/api/stats/recent?${query.toString()}`)
    ]);

    state.data = { summary, sources, funnel, conversions, recent };
    state.selectedEventIds = new Set(
      (recent.records || [])
        .map((row) => Number.parseInt(String(row.event_id), 10))
        .filter((id) => Number.isFinite(id) && selectedBefore.has(id))
    );
    renderDashboard(state.data);
  } catch (error) {
    stopRefresh();
    renderLogin(error.message);
  }
}

function scheduleRefresh() {
  stopRefresh();
  state.refreshTimer = setInterval(() => {
    loadDashboard().catch(() => {
      // handled in loadDashboard
    });
  }, 60 * 1000);
}

function stopRefresh() {
  if (state.refreshTimer) {
    clearInterval(state.refreshTimer);
    state.refreshTimer = null;
  }
}

async function boot() {
  root.innerHTML = '<main class="analytics-shell"><section class="panel"><p>Loading analytics dashboard...</p></section></main>';
  try {
    await apiRequest('/api/auth/me');
    await loadDashboard();
    scheduleRefresh();
  } catch {
    renderLogin();
  }
}

boot();
