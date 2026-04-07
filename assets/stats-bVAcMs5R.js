import"./modulepreload-polyfill-B5Qt9EMX.js";const Z=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,D=document.getElementById("stats-root"),z="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function tt(e){return`${z}${e}`}async function p(e,s={}){const n=await fetch(tt(e),{credentials:"include",headers:{"Content-Type":"application/json",...s.headers||{}},...s}),a=await n.text(),i=a?JSON.parse(a):{};if(!n.ok)throw new Error((i==null?void 0:i.message)||`Request failed: ${n.status}`);return i}function et(e){if(!e)return"-";const s=new Date(e);return Number.isNaN(s.getTime())?e:s.toLocaleString()}function f(e){return Number.isFinite(e)?`${Math.round(e)}%`:"0%"}function st(e){return e.toISOString().slice(0,10)}function at(e,s){const n=new Map((e||[]).map(o=>[String(o.day),Number(o.visits||0)])),a=[],i=new Date,r=new Date(Date.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()));for(let o=s-1;o>=0;o-=1){const g=new Date(r);g.setUTCDate(r.getUTCDate()-o);const b=st(g);a.push({day:b,visits:n.get(b)||0})}return a}function it(e){return(e||[]).reduce((s,n)=>s+Number(n.visits||0),0)}function nt(e,s,n){const a=[];let i=0;for(let r=0;r<e.length;r+=s){const o=e.slice(r,r+s);a.push({label:`${n}${i+1}`,visits:it(o)}),i+=1}return a}function U(e,s){const n=new Map;for(const r of e){const o=String(r.day).slice(0,7);n.set(o,(n.get(o)||0)+Number(r.visits||0))}const a=new Date,i=[];for(let r=s-1;r>=0;r-=1){const o=new Date(Date.UTC(a.getUTCFullYear(),a.getUTCMonth()-r,1)),g=`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}`;i.push({label:g,visits:n.get(g)||0})}return i}function v(e,s=""){if(!e||e.length===0)return"<p>No data</p>";const n=Math.max(1,...e.map(a=>Number(a.visits||0)));return`
    <div class="mini-bars">
      ${e.map(a=>{const i=Number(a.visits||0),r=Math.max(8,Math.round(i/n*100));return`<div class="mini-bar ${s}" style="height:${r}%" title="${a.label}: ${i}"></div>`}).join("")}
    </div>
  `}function rt(e){const s=e.country||"-",n=e.region||null,a=e.city||null;return!e.country&&!n&&!a?"-":n?`${s} / ${n}`:a?`${s} / ${a}`:s}function $(e=""){D.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${Z}" alt="Portfolio Analytics" class="login-hero-image" />
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
  `;const s=document.getElementById("login-form");s==null||s.addEventListener("submit",async n=>{n.preventDefault();const a=new FormData(s),i={username:String(a.get("username")||""),password:String(a.get("password")||""),totpCode:String(a.get("totpCode")||"").trim()};try{await p("/api/auth/login",{method:"POST",body:JSON.stringify(i)}),await d()}catch(r){$(r.message)}})}function ot(e,s,n,a){var T,C,P,M,E,x,I,L;const i=Number(e.totals.visits||0),r=Number(e.totals.visitors||0),o=Number(e.totals.pageviews||0),g=i>0?o/i:0,b=i>0?(i-r)/i*100:0,k=((C=(T=e.countries)==null?void 0:T[0])==null?void 0:C.total)||0,V=i>0?k/i*100:0,R=(e.countries||[]).filter(t=>t.label&&t.label!=="Unknown").length,m=at(a.points||[],365),B=m.slice(-7).map((t,c)=>({label:`D${c+1}`,visits:t.visits})),j=nt(m.slice(-30),6,"W"),F=U(m.slice(-90),3).map(t=>({label:t.label.slice(5),visits:t.visits})),A=U(m,12).map(t=>({label:t.label.slice(5),visits:t.visits})),O=m.map(t=>{const c=Number(t.visits||0),l=Math.min(c,10)/10,X=l>0?.16+l*.62:0;return`<div class="heat-cell" style="background:${l>0?`rgba(45, 217, 138, ${X.toFixed(2)})`:"rgba(140, 160, 180, 0.18)"}" title="${t.day}: ${c} visitors"></div>`}).join(""),q=e.countries.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),_=e.operatingSystems.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),Y=e.devices.map(t=>`<li><span>${t.label}</span><strong>${t.total}</strong></li>`).join(""),H=s.points.map(t=>`<tr><td>${t.day}</td><td>${t.visits}</td></tr>`).join(""),S=[...s.points].reverse(),J=Math.max(1,...S.map(t=>Number(t.visits||0))),W=S.map(t=>{const c=Number(t.visits||0),l=Math.max(4,Math.round(c/J*100));return`
        <div class="bar-row">
          <span class="bar-label">${t.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${l}%"></div></div>
          <strong class="bar-value">${c}</strong>
        </div>
      `}).join(""),G=Math.max(1,(e.devices||[]).reduce((t,c)=>t+Number(c.total||0),0)),K=(e.devices||[]).map(t=>{const c=Number(t.total||0)/G*100,l=Math.max(4,Math.round(c));return`
        <div class="bar-row">
          <span class="bar-label">${t.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${l}%"></div></div>
          <strong class="bar-value">${f(c)}</strong>
        </div>
      `}).join(""),Q=n.records.map(t=>`
      <tr>
        <td><input type="checkbox" class="event-check" value="${t.event_id}" /></td>
        <td>${et(t.created_at)}</td>
        <td>${rt(t)}</td>
        <td>${t.device_type||"-"} | ${t.os_name||"-"}</td>
        <td>${t.browser_name||"-"}</td>
        <td>${t.referrer||"-"}</td>
      </tr>
    `).join(""),u=n.paging||{page:1,perPage:w,totalPages:1};D.innerHTML=`
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

      <section class="stats-grid">
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${g.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${f(b)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${f(V)}</strong></div>
            <div class="metric-item"><span>Geo Coverage</span><strong>${R}</strong></div>
          </div>
        </article>
      </section>

      <section class="stats-grid period-charts-grid">
        <article class="stats-card period-card">
          <h2>Week Visitors</h2>
          ${v(B)}
        </article>
        <article class="stats-card period-card">
          <h2>Month Visitors</h2>
          ${v(j,"mini-bar-accent")}
        </article>
        <article class="stats-card period-card">
          <h2>Quarter Visitors</h2>
          ${v(F)}
        </article>
        <article class="stats-card period-card">
          <h2>Year Visitors</h2>
          ${v(A,"mini-bar-accent")}
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <h2>Visitor Calendar (1 Year)</h2>
            <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
          </div>
          <div class="heatmap-grid">${O}</div>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${q||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${Y||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${_||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${s.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${H||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${W||"<p>No trend data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${K||"<p>No device data</p>"}</div>
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
                ${[10,20,50,100].map(t=>`<option value="${t}" ${u.perPage===t?"selected":""}>${t}</option>`).join("")}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${u.page<=1?"disabled":""}>Prev</button>
              <span class="paging-meta">Page ${u.page} / ${u.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${u.page>=u.totalPages?"disabled":""}>Next</button>
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
              <tbody>${Q||'<tr><td colspan="6">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(P=document.getElementById("logout-button"))==null||P.addEventListener("click",async()=>{N(),await p("/api/auth/logout",{method:"POST"}),$()}),(M=document.getElementById("refresh-button"))==null||M.addEventListener("click",()=>{d()}),(E=document.getElementById("prev-page-button"))==null||E.addEventListener("click",()=>{h>1&&(h-=1,d())}),(x=document.getElementById("next-page-button"))==null||x.addEventListener("click",()=>{h<u.totalPages&&(h+=1,d())}),(I=document.getElementById("per-page-select"))==null||I.addEventListener("change",t=>{const c=Number.parseInt(t.target.value,10);Number.isFinite(c)&&(w=c,h=1,d())}),(L=document.getElementById("delete-selected-button"))==null||L.addEventListener("click",async()=>{const t=Array.from(document.querySelectorAll(".event-check:checked")).map(l=>Number.parseInt(l.value,10)).filter(l=>Number.isInteger(l)&&l>0);if(!(t.length===0||!window.confirm(`Delete ${t.length} selected visit row(s)?`)))try{await p("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:t})}),await d()}catch(l){window.alert(l.message||"Failed to delete selected rows.")}})}let y=null,h=1,w=20;function N(){y&&(clearInterval(y),y=null)}async function d(){var e;try{const[s,n,a,i]=await Promise.all([p("/api/stats/summary"),p("/api/stats/daily?days=30"),p(`/api/stats/recent?page=${h}&perPage=${w}`),p("/api/stats/daily?days=365")]);(e=a==null?void 0:a.paging)!=null&&e.page&&(h=a.paging.page),ot(s,n,a,i)}catch(s){N(),$(s.message)}}async function ct(){D.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await p("/api/auth/me"),await d(),N(),y=setInterval(d,60*1e3)}catch{$()}}ct();
