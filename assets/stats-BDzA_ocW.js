import"./modulepreload-polyfill-B5Qt9EMX.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=r(t);fetch(t.href,e)}})();const c=document.getElementById("stats-root"),h="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function g(s){return`${h}${s}`}async function o(s,r={}){const n=await fetch(g(s),{credentials:"include",headers:{"Content-Type":"application/json",...r.headers||{}},...r}),t=await n.text(),e=t?JSON.parse(t):{};if(!n.ok)throw new Error((e==null?void 0:e.message)||`Request failed: ${n.status}`);return e}function y(s){if(!s)return"-";const r=new Date(s);return Number.isNaN(r.getTime())?s:r.toLocaleString()}function l(s=""){c.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <h1>Portfolio Analytics Login</h1>
        <p>Enter your analytics credentials. If 2FA is enabled, provide the current code.</p>
        <form id="login-form" class="stats-form">
          <label>
            Username
            <input name="username" type="text" autocomplete="username" required value="admin" />
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
          <p class="form-message">${s||""}</p>
        </form>
      </section>
    </main>
  `;const r=document.getElementById("login-form");r==null||r.addEventListener("submit",async n=>{n.preventDefault();const t=new FormData(r),e={username:String(t.get("username")||""),password:String(t.get("password")||""),totpCode:String(t.get("totpCode")||"").trim()};try{await o("/api/auth/login",{method:"POST",body:JSON.stringify(e)}),await d()}catch(i){l(i.message)}})}function f(s,r,n){var t;const e=s.countries.map(a=>`<li><span>${a.label}</span><strong>${a.total}</strong></li>`).join(""),i=s.operatingSystems.map(a=>`<li><span>${a.label}</span><strong>${a.total}</strong></li>`).join(""),u=s.devices.map(a=>`<li><span>${a.label}</span><strong>${a.total}</strong></li>`).join(""),p=r.points.map(a=>`<tr><td>${a.day}</td><td>${a.visits}</td></tr>`).join(""),m=n.records.map(a=>`
      <tr>
        <td>${y(a.created_at)}</td>
        <td>${a.country||"-"}${a.city?` / ${a.city}`:""}</td>
        <td>${a.device_type||"-"} | ${a.os_name||"-"}</td>
        <td>${a.browser_name||"-"}</td>
        <td>${a.path||"-"}</td>
        <td>${a.referrer||"-"}</td>
      </tr>
    `).join("");c.innerHTML=`
    <main class="stats-container">
      <header class="stats-header">
        <h1>Portfolio Visitor Analytics</h1>
        <button id="logout-button" class="logout-button" type="button">Log out</button>
      </header>

      <section class="stats-grid totals-grid">
        <article class="stats-card">
          <h2>Total Visits</h2>
          <p class="big-number">${s.totals.visits}</p>
        </article>
        <article class="stats-card">
          <h2>Unique Visitors</h2>
          <p class="big-number">${s.totals.visitors}</p>
        </article>
        <article class="stats-card">
          <h2>Total Pageviews</h2>
          <p class="big-number">${s.totals.pageviews}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${e||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${u||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${i||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${r.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${p||"<tr><td>-</td><td>0</td></tr>"}</tbody>
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
              <tbody>${m||'<tr><td colspan="6">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(t=document.getElementById("logout-button"))==null||t.addEventListener("click",async()=>{await o("/api/auth/logout",{method:"POST"}),l()})}async function d(){try{const[s,r,n]=await Promise.all([o("/api/stats/summary"),o("/api/stats/daily?days=30"),o("/api/stats/recent?limit=120")]);f(s,r,n)}catch(s){l(s.message)}}async function b(){c.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await o("/api/auth/me"),await d()}catch{l()}}b();
