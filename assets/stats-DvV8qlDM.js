import"./modulepreload-polyfill-B5Qt9EMX.js";const l=document.getElementById("stats-root"),m="".replace(/\/$/,"");function g(s){return`${m}${s}`}async function o(s,a={}){const e=await fetch(g(s),{credentials:"include",headers:{"Content-Type":"application/json",...a.headers||{}},...a}),n=await e.text(),i=n?JSON.parse(n):{};if(!e.ok)throw new Error((i==null?void 0:i.message)||`Request failed: ${e.status}`);return i}function b(s){if(!s)return"-";const a=new Date(s);return Number.isNaN(a.getTime())?s:a.toLocaleString()}function r(s=""){l.innerHTML=`
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
  `;const a=document.getElementById("login-form");a==null||a.addEventListener("submit",async e=>{e.preventDefault();const n=new FormData(a),i={username:String(n.get("username")||""),password:String(n.get("password")||""),totpCode:String(n.get("totpCode")||"").trim()};try{await o("/api/auth/login",{method:"POST",body:JSON.stringify(i)}),await p()}catch(c){r(c.message)}})}function y(s,a,e){var d;const n=s.countries.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),i=s.operatingSystems.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),c=s.devices.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),u=a.points.map(t=>`<tr><td>${t.day}</td><td>${t.visits}</td></tr>`).join(""),h=e.records.map(t=>`
      <tr>
        <td>${b(t.created_at)}</td>
        <td>${t.country||"-"}${t.city?` / ${t.city}`:""}</td>
        <td>${t.device_type||"-"} | ${t.os_name||"-"}</td>
        <td>${t.browser_name||"-"}</td>
        <td>${t.path||"-"}</td>
        <td>${t.referrer||"-"}</td>
      </tr>
    `).join("");l.innerHTML=`
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
          <ul class="stats-list">${n||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${c||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${i||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${a.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${u||"<tr><td>-</td><td>0</td></tr>"}</tbody>
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
              <tbody>${h||'<tr><td colspan="6">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(d=document.getElementById("logout-button"))==null||d.addEventListener("click",async()=>{await o("/api/auth/logout",{method:"POST"}),r()})}async function p(){try{const[s,a,e]=await Promise.all([o("/api/stats/summary"),o("/api/stats/daily?days=30"),o("/api/stats/recent?limit=120")]);y(s,a,e)}catch(s){r(s.message)}}async function $(){l.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await o("/api/auth/me"),await p()}catch{r()}}$();
