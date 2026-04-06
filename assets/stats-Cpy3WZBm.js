import"./modulepreload-polyfill-B5Qt9EMX.js";const E=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,m=document.getElementById("stats-root"),T="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function R(t){return`${T}${t}`}async function c(t,a={}){const n=await fetch(R(t),{credentials:"include",headers:{"Content-Type":"application/json",...a.headers||{}},...a}),s=await n.text(),o=s?JSON.parse(s):{};if(!n.ok)throw new Error((o==null?void 0:o.message)||`Request failed: ${n.status}`);return o}function S(t){if(!t)return"-";const a=new Date(t);return Number.isNaN(a.getTime())?t:a.toLocaleString()}function D(t){const a=t.country||"-",n=t.region||null,s=t.city||null;return!t.country&&!n&&!s?"-":n?`${a} / ${n}`:s?`${a} / ${s}`:a}function p(t=""){m.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-logo-wrap">
          <img src="${E}" alt="Portfolio Analytics" class="login-logo" />
        </div>
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
          <p class="form-message">${t||""}</p>
        </form>
      </section>
    </main>
  `;const a=document.getElementById("login-form");a==null||a.addEventListener("submit",async n=>{n.preventDefault();const s=new FormData(a),o={username:String(s.get("username")||""),password:String(s.get("password")||""),totpCode:String(s.get("totpCode")||"").trim()};try{await c("/api/auth/login",{method:"POST",body:JSON.stringify(o)}),await l()}catch(g){p(g.message)}})}function N(t,a,n){var b,y,f,$,v;const s=t.countries.map(e=>`<li><span>${e.label}</span><strong>${e.total}</strong></li>`).join(""),o=t.operatingSystems.map(e=>`<li><span>${e.label}</span><strong>${e.total}</strong></li>`).join(""),g=t.devices.map(e=>`<li><span>${e.label}</span><strong>${e.total}</strong></li>`).join(""),P=a.points.map(e=>`<tr><td>${e.day}</td><td>${e.visits}</td></tr>`).join(""),L=n.records.map(e=>`
      <tr>
        <td>${S(e.created_at)}</td>
        <td>${D(e)}</td>
        <td>${e.device_type||"-"} | ${e.os_name||"-"}</td>
        <td>${e.browser_name||"-"}</td>
        <td>${e.referrer||"-"}</td>
      </tr>
    `).join(""),i=n.paging||{page:1,perPage:u,totalPages:1};m.innerHTML=`
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
          <p class="big-number">${t.totals.visits}</p>
        </article>
        <article class="stats-card">
          <h2>Unique Visitors</h2>
          <p class="big-number">${t.totals.visitors}</p>
        </article>
        <article class="stats-card">
          <h2>Total Pageviews</h2>
          <p class="big-number">${t.totals.pageviews}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${s||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${g||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${o||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${a.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${P||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <div class="recent-events-header">
            <h2>Recent Events</h2>
            <div class="paging-controls">
              <label for="per-page-select">Rows</label>
              <select id="per-page-select" class="per-page-select">
                ${[10,20,50,100].map(e=>`<option value="${e}" ${i.perPage===e?"selected":""}>${e}</option>`).join("")}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${i.page<=1?"disabled":""}>Prev</button>
              <span class="paging-meta">Page ${i.page} / ${i.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${i.page>=i.totalPages?"disabled":""}>Next</button>
            </div>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Location</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>Referrer</th>
                </tr>
              </thead>
              <tbody>${L||'<tr><td colspan="5">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(b=document.getElementById("logout-button"))==null||b.addEventListener("click",async()=>{h(),await c("/api/auth/logout",{method:"POST"}),p()}),(y=document.getElementById("refresh-button"))==null||y.addEventListener("click",()=>{l()}),(f=document.getElementById("prev-page-button"))==null||f.addEventListener("click",()=>{r>1&&(r-=1,l())}),($=document.getElementById("next-page-button"))==null||$.addEventListener("click",()=>{r<i.totalPages&&(r+=1,l())}),(v=document.getElementById("per-page-select"))==null||v.addEventListener("change",e=>{const w=Number.parseInt(e.target.value,10);Number.isFinite(w)&&(u=w,r=1,l())})}let d=null,r=1,u=20;function h(){d&&(clearInterval(d),d=null)}async function l(){var t;try{const[a,n,s]=await Promise.all([c("/api/stats/summary"),c("/api/stats/daily?days=30"),c(`/api/stats/recent?page=${r}&perPage=${u}`)]);(t=s==null?void 0:s.paging)!=null&&t.page&&(r=s.paging.page),N(a,n,s)}catch(a){h(),p(a.message)}}async function I(){m.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await c("/api/auth/me"),await l(),h(),d=setInterval(l,60*1e3)}catch{p()}}I();
