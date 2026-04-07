import"./modulepreload-polyfill-B5Qt9EMX.js";const lt=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,U=document.getElementById("stats-root"),dt="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function pt(t){return`${dt}${t}`}async function $(t,e={}){const s=await fetch(pt(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),n=await s.text(),i=n?JSON.parse(n):{};if(!s.ok)throw new Error((i==null?void 0:i.message)||`Request failed: ${s.status}`);return i}function ut(t){if(!t)return"-";const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function B(t){return Number.isFinite(t)?`${Math.round(t)}%`:"0%"}function p(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Q(t,e=42){const s=String(t||"").trim();return s?s.length>e?`${s.slice(0,Math.max(0,e-1))}…`:s:"-"}function gt(t){const e=String(t||"").trim();if(!e)return{short:"-",full:"-"};try{const s=new URL(e),n=`${s.hostname}${s.pathname==="/"?"":s.pathname}`;return{short:Q(n,34),full:e}}catch{return{short:Q(e,34),full:e}}}function ht(t){return t.toISOString().slice(0,10)}function mt(t,e){const s=new Map((t||[]).map(o=>[String(o.day),Number(o.visits||0)])),n=[],i=new Date,c=new Date(Date.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()));for(let o=e-1;o>=0;o-=1){const g=new Date(c);g.setUTCDate(c.getUTCDate()-o);const h=ht(g);n.push({day:h,visits:s.get(h)||0})}return n}function vt(t){return(t||[]).reduce((e,s)=>e+Number(s.visits||0),0)}function bt(t,e,s){const n=[];let i=0;for(let c=0;c<t.length;c+=e){const o=t.slice(c,c+e);n.push({label:`${s}${i+1}`,visits:vt(o)}),i+=1}return n}function X(t,e){const s=new Map;for(const c of t){const o=String(c.day).slice(0,7);s.set(o,(s.get(o)||0)+Number(c.visits||0))}const n=new Date,i=[];for(let c=e-1;c>=0;c-=1){const o=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth()-c,1)),g=`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}`;i.push({label:g,visits:s.get(g)||0})}return i}function ft(t){const e=t.country||"-",s=t.region||null,n=t.city||null;return!t.country&&!s&&!n?"-":s?`${e} / ${s}`:n?`${e} / ${n}`:e}function yt(t){const e=String(t||"").toLowerCase();return e.includes("windows")?{label:"Windows",className:"os-win",icon:"windows"}:e.includes("linux")?{label:"Linux",className:"os-lnx",icon:"linux"}:e.includes("android")?{label:"Android",className:"os-and",icon:"android"}:e.includes("ios")?{label:"iOS",className:"os-ios",icon:"ios"}:e.includes("mac")?{label:"macOS",className:"os-mac",icon:"mac"}:{label:"Other OS",className:"os-generic",icon:"generic"}}function Z(t){const e=yt(t);let s="";return e.icon==="windows"?s=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="8" height="7" rx="1"></rect>
        <rect x="13" y="4" width="8" height="7" rx="1"></rect>
        <rect x="3" y="13" width="8" height="7" rx="1"></rect>
        <rect x="13" y="13" width="8" height="7" rx="1"></rect>
      </svg>`:e.icon==="linux"?s=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="3"></circle>
        <path d="M8 11.5c0-1.2 1-2.2 2.2-2.2h3.6c1.2 0 2.2 1 2.2 2.2v4.2c0 2.2-1.8 4-4 4s-4-1.8-4-4z"></path>
        <path d="M8 19.5l-2 1.5M16 19.5l2 1.5M9 14H6.5M15 14h2.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:e.icon==="android"?s=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 9.5A4 4 0 0 1 12 6a4 4 0 0 1 4 3.5z"></path>
        <rect x="7" y="10" width="10" height="8" rx="2"></rect>
        <path d="M9 6L7.5 4.5M15 6l1.5-1.5M9 12.5h0M15 12.5h0M9 18v2M15 18v2M7 11.5v5M17 11.5v5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:e.icon==="ios"?s=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7.5" y="3.5" width="9" height="17" rx="2.4"></rect>
        <circle cx="12" cy="17.5" r="0.9" fill="currentColor"></circle>
      </svg>`:e.icon==="mac"?s=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="10" rx="2"></rect>
        <path d="M2.8 18h18.4M9 20h6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:s=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10" rx="2"></rect>
        <path d="M9 19h6M12 15v4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`,`<span class="os-badge ${e.className}" title="${p(e.label)}" aria-label="${p(e.label)}">${s}</span>`}function $t(t){return t.toLocaleString(void 0,{month:"long",year:"numeric"})}function wt(t,e){const s=t.getFullYear(),n=t.getMonth(),c=(new Date(s,n,1).getDay()+6)%7,o=new Date(s,n,1-c),g=[];for(let h=0;h<42;h+=1){const v=new Date(o);v.setDate(o.getDate()+h);const D=v.toISOString().slice(0,10),m=Number(e.get(D)||0),b=v.getMonth()===n;g.push({dayNum:v.getDate(),iso:D,visits:m,inMonth:b})}return g}function xt(t,e){return e==="day"?t.slice(-14).map(n=>({label:n.day.slice(5),visits:n.visits})):e==="week"?t.slice(-7).map(n=>({label:n.day.slice(5),visits:n.visits})):e==="month"?bt(t.slice(-30),6,"W"):e==="quarter"?X(t.slice(-90),3).map(s=>({label:s.label.slice(5),visits:s.visits})):X(t,12).map(s=>({label:s.label.slice(5),visits:s.visits}))}function Mt(t){if(!t||t.length===0)return"<p>No data</p>";const e=t.map(r=>Number(r.visits||0)),s=Math.max(1,...e),n=0,i=640,c=140,o=40,g=i-o*2,h=c-o*2,v=g/(t.length-1||1),D=h/(s-n||1),m=e.map((r,u)=>({x:o+u*v,y:o+h-(r-n)*D,label:t[u].label,visits:r}));m.map((r,u)=>`${u===0?"M":"L"} ${r.x} ${r.y}`).join(" ");const b=[];for(let r=0;r<=4;r++){const u=o+h/4*r,P=Math.round(s-s/4*r);b.push(`<line x1="${o}" y1="${u}" x2="${i-o}" y2="${u}" class="chart-grid-line" />`),b.push(`<text x="${o-8}" y="${u+4}" class="chart-y-label">${P}</text>`)}const C=m.filter((r,u)=>u===0||u===m.length-1||u%Math.ceil(m.length/4)===0).map(r=>`<text x="${r.x}" y="${c-8}" class="chart-x-label" text-anchor="middle">${p(r.label)}</text>`).join(""),L=m.map(r=>`<circle cx="${r.x}" cy="${r.y}" r="3" class="chart-dot" title="${p(r.label)}: ${r.visits}" />`).join("");return`
    <div class="timeseries-chart-wrap">
      <svg viewBox="0 0 ${i} ${c}" class="timeseries-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#0fc7ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2dd98a;stop-opacity:1" />
          </linearGradient>
        </defs>
        ${b.join(`
`)}
        <polyline points="${m.map(r=>`${r.x},${r.y}`).join(" ")}" class="chart-line" />
        ${L}
        ${C}
      </svg>
    </div>
  `}function T(t=""){U.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${lt}" alt="Portfolio Analytics" class="login-hero-image" />
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
          <p class="form-message">${t||""}</p>
        </form>
      </section>
    </main>
  `;const e=document.getElementById("login-form");e==null||e.addEventListener("submit",async s=>{s.preventDefault();const n=new FormData(e),i={username:String(n.get("username")||""),password:String(n.get("password")||""),totpCode:String(n.get("totpCode")||"").trim()};try{await $("/api/auth/login",{method:"POST",body:JSON.stringify(i)}),await y()}catch(c){T(c.message)}})}function N(t,e,s,n){var V,j,O,q,Y,_,W,H,G,J,z;const i=Number(t.totals.visits||0),c=Number(t.totals.visitors||0),o=Number(t.totals.pageviews||0),g=i>0?o/i:0,h=i>0?(i-c)/i*100:0,v=((j=(V=t.countries)==null?void 0:V[0])==null?void 0:j.total)||0,D=i>0?v/i*100:0,m=(t.countries||[]).filter(a=>a.label&&a.label!=="Unknown").length,b=mt(n.points||[],365),A=new Map(b.map(a=>[a.day,Number(a.visits||0)])),C=xt(b,x),L=Mt(C),r=new Date(f.getFullYear(),f.getMonth(),1),u=wt(r,A).map(a=>{const l=Math.min(a.visits,10)/10,d=l>0?.16+l*.62:0,k=l>0?`rgba(45, 217, 138, ${d.toFixed(2)})`:"rgba(140, 160, 180, 0.18)";return`<button class="heat-cell-button${a.inMonth?"":" heat-cell-muted"}" style="background:${k}" title="${a.iso}: ${a.visits} visitors" type="button">${a.dayNum}<span class="heat-cell-count">${a.visits>0?a.visits:""}</span></button>`}).join(""),P=t.countries.map(a=>`<li><span>${p(a.label||"Unknown")}</span><strong>${a.total}</strong></li>`).join(""),tt=t.operatingSystems.map(a=>`<li><span class="os-entry">${Z(a.label)}<span>${p(a.label||"Unknown")}</span></span><strong>${a.total}</strong></li>`).join(""),et=t.devices.map(a=>`<li><span>${p(a.label||"Unknown")}</span><strong>${a.total}</strong></li>`).join(""),st=e.points.map(a=>`<tr><td>${a.day}</td><td>${a.visits}</td></tr>`).join(""),F=[...e.points].reverse(),at=Math.max(1,...F.map(a=>Number(a.visits||0))),nt=F.map(a=>{const l=Number(a.visits||0),d=Math.max(4,Math.round(l/at*100));return`
        <div class="bar-row">
          <span class="bar-label">${a.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${d}%"></div></div>
          <strong class="bar-value">${l}</strong>
        </div>
      `}).join(""),it=Math.max(1,(t.devices||[]).reduce((a,l)=>a+Number(l.total||0),0)),ot=(t.devices||[]).map(a=>{const l=Number(a.total||0)/it*100,d=Math.max(4,Math.round(l));return`
        <div class="bar-row">
          <span class="bar-label">${a.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${d}%"></div></div>
          <strong class="bar-value">${B(l)}</strong>
        </div>
      `}).join(""),rt=s.records.map(a=>{const l=p(a.device_type||"-"),d=p(a.os_name||"Unknown"),k=p(a.browser_name||"-"),E=p(ft(a)),ct=p(a.ip_address||"-"),K=gt(a.referrer);return`
        <tr>
          <td><input type="checkbox" class="event-check" value="${a.event_id}" /></td>
          <td><span class="cell-time">${p(ut(a.created_at))}</span></td>
          <td><span class="mono-cell">${ct}</span></td>
          <td><span class="truncate-cell" title="${E}">${E}</span></td>
          <td>
            <span class="device-stack">
              <span class="device-topline">${Z(a.os_name)}<span class="truncate-cell" title="${d}">${d}</span></span>
              <span class="device-subline">${l}</span>
            </span>
          </td>
          <td><span class="truncate-cell" title="${k}">${k}</span></td>
          <td><span class="truncate-cell" title="${p(K.full)}">${p(K.short)}</span></td>
        </tr>
      `}).join(""),w=s.paging||{page:1,perPage:I,totalPages:1};U.innerHTML=`
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
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${g.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${B(h)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${B(D)}</strong></div>
            <div class="metric-item"><span>Geo Coverage</span><strong>${m}</strong></div>
          </div>
        </article>
      </section>

      <section class="stats-grid focus-grid compact-focus-grid">
        <article class="stats-card period-card">
          <div class="period-header">
            <h2>Visitors Trend</h2>
            <select id="period-select" class="per-page-select">
              <option value="day" ${x==="day"?"selected":""}>Day</option>
              <option value="week" ${x==="week"?"selected":""}>Week</option>
              <option value="month" ${x==="month"?"selected":""}>Month</option>
              <option value="quarter" ${x==="quarter"?"selected":""}>Quarter</option>
              <option value="year" ${x==="year"?"selected":""}>Year</option>
            </select>
          </div>
          ${L}
        </article>
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <button id="calendar-prev" class="refresh-button" type="button">Prev</button>
            <div class="calendar-title-wrap">
              <h2>${$t(r)}</h2>
              <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
            </div>
            <button id="calendar-next" class="refresh-button" type="button">Next</button>
          </div>
          <div class="calendar-weekdays">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="calendar-grid">${u}</div>
        </article>
      </section>

      <section class="stats-grid compact-analytics-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${P||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${et||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${tt||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Visits by Day (${e.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${st||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${nt||"<p>No trend data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${ot||"<p>No device data</p>"}</div>
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
                ${[10,20,50,100].map(a=>`<option value="${a}" ${w.perPage===a?"selected":""}>${a}</option>`).join("")}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${w.page<=1?"disabled":""}>Prev</button>
              <span class="paging-meta">Page ${w.page} / ${w.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${w.page>=w.totalPages?"disabled":""}>Next</button>
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
              <tbody>${rt||'<tr><td colspan="7">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(O=document.getElementById("logout-button"))==null||O.addEventListener("click",async()=>{R(),await $("/api/auth/logout",{method:"POST"}),T()}),(q=document.getElementById("refresh-button"))==null||q.addEventListener("click",()=>{y()}),(Y=document.getElementById("prev-page-button"))==null||Y.addEventListener("click",()=>{M>1&&(M-=1,y())}),(_=document.getElementById("next-page-button"))==null||_.addEventListener("click",()=>{M<w.totalPages&&(M+=1,y())}),(W=document.getElementById("per-page-select"))==null||W.addEventListener("change",a=>{const l=Number.parseInt(a.target.value,10);Number.isFinite(l)&&(I=l,M=1,y())}),(H=document.getElementById("period-select"))==null||H.addEventListener("change",a=>{x=String(a.target.value||"week"),N(t,e,s,n)}),(G=document.getElementById("calendar-prev"))==null||G.addEventListener("click",()=>{f=new Date(f.getFullYear(),f.getMonth()-1,1),N(t,e,s,n)}),(J=document.getElementById("calendar-next"))==null||J.addEventListener("click",()=>{f=new Date(f.getFullYear(),f.getMonth()+1,1),N(t,e,s,n)}),(z=document.getElementById("delete-selected-button"))==null||z.addEventListener("click",async()=>{const a=Array.from(document.querySelectorAll(".event-check:checked")).map(d=>Number.parseInt(d.value,10)).filter(d=>Number.isInteger(d)&&d>0);if(!(a.length===0||!window.confirm(`Delete ${a.length} selected visit row(s)?`)))try{await $("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:a})}),await y()}catch(d){window.alert(d.message||"Failed to delete selected rows.")}})}let S=null,M=1,I=20,x="week",f=new Date(new Date().getFullYear(),new Date().getMonth(),1);function R(){S&&(clearInterval(S),S=null)}async function y(){var t;try{const[e,s,n,i]=await Promise.all([$("/api/stats/summary"),$("/api/stats/daily?days=30"),$(`/api/stats/recent?page=${M}&perPage=${I}`),$("/api/stats/daily?days=365")]);(t=n==null?void 0:n.paging)!=null&&t.page&&(M=n.paging.page),N(e,s,n,i)}catch(e){R(),T(e.message)}}async function Dt(){U.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await $("/api/auth/me"),await y(),R(),S=setInterval(y,60*1e3)}catch{T()}}Dt();
