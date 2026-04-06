import"./modulepreload-polyfill-B5Qt9EMX.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const c=document.getElementById("stats-root"),f="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function g(s){return`${f}${s}`}async function o(s,n={}){const i=await fetch(g(s),{credentials:"include",headers:{"Content-Type":"application/json",...n.headers||{}},...n}),t=await i.text(),e=t?JSON.parse(t):{};if(!i.ok)throw new Error((e==null?void 0:e.message)||`Request failed: ${i.status}`);return e}function h(s){if(!s)return"-";const n=new Date(s);return Number.isNaN(n.getTime())?s:n.toLocaleString()}function l(s=""){c.innerHTML=`
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
  `;const n=document.getElementById("login-form");n==null||n.addEventListener("submit",async i=>{i.preventDefault();const t=new FormData(n),e={username:String(t.get("username")||""),password:String(t.get("password")||""),totpCode:String(t.get("totpCode")||"").trim()};try{await o("/api/auth/login",{method:"POST",body:JSON.stringify(e)}),await d()}catch(a){l(a.message)}})}function y(s,n,i){var t;const e=s.countries.map(r=>`<li><span>${r.label}</span><strong>${r.total}</strong></li>`).join(""),a=s.operatingSystems.map(r=>`<li><span>${r.label}</span><strong>${r.total}</strong></li>`).join(""),u=s.devices.map(r=>`<li><span>${r.label}</span><strong>${r.total}</strong></li>`).join(""),p=n.points.map(r=>`<tr><td>${r.day}</td><td>${r.visits}</td></tr>`).join(""),m=i.records.map(r=>`
      <tr>
        <td>${h(r.created_at)}</td>
        <td>${r.country||"-"}${r.city?` / ${r.city}`:""}</td>
        <td>${r.device_type||"-"} | ${r.os_name||"-"}</td>
        <td>${r.browser_name||"-"}</td>
        <td>${r.path||"-"}</td>
        <td>${r.referrer||"-"}</td>
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
          <ul class="stats-list">${a||"<li><span>No data</span><strong>0</strong></li>"}</ul>
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
  `,(t=document.getElementById("logout-button"))==null||t.addEventListener("click",async()=>{await o("/api/auth/logout",{method:"POST"}),l()})}async function d(){try{const[s,n,i]=await Promise.all([o("/api/stats/summary"),o("/api/stats/daily?days=30"),o("/api/stats/recent?limit=120")]);y(s,n,i)}catch(s){l(s.message)}}async function b(){c.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await o("/api/auth/me"),await d()}catch{l()}}b();
