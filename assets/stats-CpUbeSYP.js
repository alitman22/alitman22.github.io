import"./modulepreload-polyfill-B5Qt9EMX.js";const _=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,v=document.getElementById("stats-root"),U="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function H(e){return`${U}${e}`}async function p(e,a={}){const n=await fetch(H(e),{credentials:"include",headers:{"Content-Type":"application/json",...a.headers||{}},...a}),s=await n.text(),o=s?JSON.parse(s):{};if(!n.ok)throw new Error((o==null?void 0:o.message)||`Request failed: ${n.status}`);return o}function J(e){if(!e)return"-";const a=new Date(e);return Number.isNaN(a.getTime())?e:a.toLocaleString()}function b(e){return Number.isFinite(e)?`${Math.round(e)}%`:"0%"}function G(e){const a=e.country||"-",n=e.region||null,s=e.city||null;return!e.country&&!n&&!s?"-":n?`${a} / ${n}`:s?`${a} / ${s}`:a}function u(e=""){v.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${_}" alt="Portfolio Analytics" class="login-hero-image" />
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
          <p class="form-message">${e||""}</p>
        </form>
      </section>
    </main>
  `;const a=document.getElementById("login-form");a==null||a.addEventListener("submit",async n=>{n.preventDefault();const s=new FormData(a),o={username:String(s.get("username")||""),password:String(s.get("password")||""),totpCode:String(s.get("totpCode")||"").trim()};try{await p("/api/auth/login",{method:"POST",body:JSON.stringify(o)}),await c()}catch(h){u(h.message)}})}function z(e,a,n){var $,w,N,P,E,D,S,L;const s=Number(e.totals.visits||0),o=Number(e.totals.visitors||0),h=Number(e.totals.pageviews||0),T=s>0?h/s:0,I=s>0?(s-o)/s*100:0,R=((w=($=e.countries)==null?void 0:$[0])==null?void 0:w.total)||0,x=s>0?R/s*100:0,k=(e.countries||[]).filter(t=>t.label&&t.label!=="Unknown").length,B=e.countries.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),C=e.operatingSystems.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),M=e.devices.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),V=a.points.map(t=>`<tr><td>${t.day}</td><td>${t.visits}</td></tr>`).join(""),y=[...a.points].reverse(),j=Math.max(1,...y.map(t=>Number(t.visits||0))),A=y.map(t=>{const i=Number(t.visits||0),r=Math.max(4,Math.round(i/j*100));return`
        <div class="bar-row">
          <span class="bar-label">${t.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${r}%"></div></div>
          <strong class="bar-value">${i}</strong>
        </div>
      `}).join(""),F=Math.max(1,(e.devices||[]).reduce((t,i)=>t+Number(i.total||0),0)),O=(e.devices||[]).map(t=>{const i=Number(t.total||0)/F*100,r=Math.max(4,Math.round(i));return`
        <div class="bar-row">
          <span class="bar-label">${t.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${r}%"></div></div>
          <strong class="bar-value">${b(i)}</strong>
        </div>
      `}).join(""),q=n.records.map(t=>`
      <tr>
        <td><input type="checkbox" class="event-check" value="${t.event_id}" /></td>
        <td>${J(t.created_at)}</td>
        <td>${G(t)}</td>
        <td>${t.device_type||"-"} | ${t.os_name||"-"}</td>
        <td>${t.browser_name||"-"}</td>
        <td>${t.referrer||"-"}</td>
      </tr>
    `).join(""),l=n.paging||{page:1,perPage:m,totalPages:1};v.innerHTML=`
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

      <section class="stats-grid totals-grid insights-grid">
        <article class="stats-card insight-card">
          <h2>Pages / Visit</h2>
          <p class="big-number">${T.toFixed(2)}</p>
        </article>
        <article class="stats-card insight-card">
          <h2>Returning Rate</h2>
          <p class="big-number">${b(I)}</p>
        </article>
        <article class="stats-card insight-card">
          <h2>Top Country Share</h2>
          <p class="big-number">${b(x)}</p>
        </article>
        <article class="stats-card insight-card">
          <h2>Geo Coverage</h2>
          <p class="big-number">${k}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${B||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${M||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${C||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${a.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${V||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${A||"<p>No trend data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${O||"<p>No device data</p>"}</div>
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
                ${[10,20,50,100].map(t=>`<option value="${t}" ${l.perPage===t?"selected":""}>${t}</option>`).join("")}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${l.page<=1?"disabled":""}>Prev</button>
              <span class="paging-meta">Page ${l.page} / ${l.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${l.page>=l.totalPages?"disabled":""}>Next</button>
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
              <tbody>${q||'<tr><td colspan="6">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(N=document.getElementById("logout-button"))==null||N.addEventListener("click",async()=>{f(),await p("/api/auth/logout",{method:"POST"}),u()}),(P=document.getElementById("refresh-button"))==null||P.addEventListener("click",()=>{c()}),(E=document.getElementById("prev-page-button"))==null||E.addEventListener("click",()=>{d>1&&(d-=1,c())}),(D=document.getElementById("next-page-button"))==null||D.addEventListener("click",()=>{d<l.totalPages&&(d+=1,c())}),(S=document.getElementById("per-page-select"))==null||S.addEventListener("change",t=>{const i=Number.parseInt(t.target.value,10);Number.isFinite(i)&&(m=i,d=1,c())}),(L=document.getElementById("delete-selected-button"))==null||L.addEventListener("click",async()=>{const t=Array.from(document.querySelectorAll(".event-check:checked")).map(r=>Number.parseInt(r.value,10)).filter(r=>Number.isInteger(r)&&r>0);if(!(t.length===0||!window.confirm(`Delete ${t.length} selected visit row(s)?`)))try{await p("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:t})}),await c()}catch(r){window.alert(r.message||"Failed to delete selected rows.")}})}let g=null,d=1,m=20;function f(){g&&(clearInterval(g),g=null)}async function c(){var e;try{const[a,n,s]=await Promise.all([p("/api/stats/summary"),p("/api/stats/daily?days=30"),p(`/api/stats/recent?page=${d}&perPage=${m}`)]);(e=s==null?void 0:s.paging)!=null&&e.page&&(d=s.paging.page),z(a,n,s)}catch(a){f(),u(a.message)}}async function K(){v.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await p("/api/auth/me"),await c(),f(),g=setInterval(c,60*1e3)}catch{u()}}K();
