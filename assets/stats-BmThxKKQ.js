import"./modulepreload-polyfill-B5Qt9EMX.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const c=document.getElementById("stats-root"),h="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function g(e){return`${h}${e}`}async function o(e,n={}){const r=await fetch(g(e),{credentials:"include",headers:{"Content-Type":"application/json",...n.headers||{}},...n}),t=await r.text(),a=t?JSON.parse(t):{};if(!r.ok)throw new Error((a==null?void 0:a.message)||`Request failed: ${r.status}`);return a}function y(e){if(!e)return"-";const n=new Date(e);return Number.isNaN(n.getTime())?e:n.toLocaleString()}function l(e=""){c.innerHTML=`
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
          <p class="form-message">${e||""}</p>
        </form>
      </section>
    </main>
  `;const n=document.getElementById("login-form");n==null||n.addEventListener("submit",async r=>{r.preventDefault();const t=new FormData(n),a={username:String(t.get("username")||""),password:String(t.get("password")||""),totpCode:String(t.get("totpCode")||"").trim()};try{await o("/api/auth/login",{method:"POST",body:JSON.stringify(a)}),await d()}catch(i){l(i.message)}})}function b(e,n,r){var t;const a=e.countries.map(s=>`<li><span>${s.label}</span><strong>${s.total}</strong></li>`).join(""),i=e.operatingSystems.map(s=>`<li><span>${s.label}</span><strong>${s.total}</strong></li>`).join(""),u=e.devices.map(s=>`<li><span>${s.label}</span><strong>${s.total}</strong></li>`).join(""),p=n.points.map(s=>`<tr><td>${s.day}</td><td>${s.visits}</td></tr>`).join(""),m=r.records.map(s=>`
      <tr>
        <td>${y(s.created_at)}</td>
        <td>${s.country||"-"}${s.city?` / ${s.city}`:""}</td>
        <td>${s.device_type||"-"} | ${s.os_name||"-"}</td>
        <td>${s.browser_name||"-"}</td>
        <td>${s.path||"-"}</td>
        <td>${s.referrer||"-"}</td>
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
          <p class="big-number">${e.totals.visits}</p>
        </article>
        <article class="stats-card">
          <h2>Unique Visitors</h2>
          <p class="big-number">${e.totals.visitors}</p>
        </article>
        <article class="stats-card">
          <h2>Total Pageviews</h2>
          <p class="big-number">${e.totals.pageviews}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${a||"<li><span>No data</span><strong>0</strong></li>"}</ul>
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
          <h2>Visits by Day (${n.days} days)</h2>
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
  `,(t=document.getElementById("logout-button"))==null||t.addEventListener("click",async()=>{await o("/api/auth/logout",{method:"POST"}),l()})}async function d(){try{const[e,n,r]=await Promise.all([o("/api/stats/summary"),o("/api/stats/daily?days=30"),o("/api/stats/recent?limit=120")]);b(e,n,r)}catch(e){l(e.message)}}async function f(){c.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await o("/api/auth/me"),await d()}catch{l()}}f();
