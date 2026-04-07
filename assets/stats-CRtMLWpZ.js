import"./modulepreload-polyfill-B5Qt9EMX.js";const ht=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,A=document.getElementById("stats-root"),mt="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function vt(t){return`${mt}${t}`}async function v(t,e={}){const a=await fetch(vt(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),o=await a.text(),n=o?JSON.parse(o):{};if(!a.ok)throw new Error((n==null?void 0:n.message)||`Request failed: ${a.status}`);return n}function bt(t){if(!t)return"-";const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function j(t){return Number.isFinite(t)?`${Math.round(t)}%`:"0%"}function d(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function D(t,e=42){const a=String(t||"").trim();return a?a.length>e?`${a.slice(0,Math.max(0,e-1))}…`:a:"-"}function ft(t){const e=String(t||"").trim();if(!e)return{short:"-",full:"-"};try{const a=new URL(e),o=`${a.hostname}${a.pathname==="/"?"":a.pathname}`;return{short:D(o,34),full:e}}catch{return{short:D(e,34),full:e}}}function $t(t){const e=String(t||"").trim();return e?e.replaceAll("_"," ").replaceAll("-"," ").replace(/\b\w/g,a=>a.toUpperCase()):"Unknown"}function yt(t){const e=String(t||"").trim();if(!e||e==="-")return{short:"-",full:"-"};try{const a=new URL(e),o=`${a.hostname}${a.pathname==="/"?"":a.pathname}`;return{short:D(o,38),full:e}}catch{return{short:D(e,38),full:e}}}function wt(t){return t.toISOString().slice(0,10)}function xt(t,e){const a=new Map((t||[]).map(i=>[String(i.day),Number(i.visits||0)])),o=[],n=new Date,r=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()));for(let i=e-1;i>=0;i-=1){const g=new Date(r);g.setUTCDate(r.getUTCDate()-i);const h=wt(g);o.push({day:h,visits:a.get(h)||0})}return o}function Mt(t){return(t||[]).reduce((e,a)=>e+Number(a.visits||0),0)}function kt(t,e,a){const o=[];let n=0;for(let r=0;r<t.length;r+=e){const i=t.slice(r,r+e);o.push({label:`${a}${n+1}`,visits:Mt(i)}),n+=1}return o}function Z(t,e){const a=new Map;for(const r of t){const i=String(r.day).slice(0,7);a.set(i,(a.get(i)||0)+Number(r.visits||0))}const o=new Date,n=[];for(let r=e-1;r>=0;r-=1){const i=new Date(Date.UTC(o.getUTCFullYear(),o.getUTCMonth()-r,1)),g=`${i.getUTCFullYear()}-${String(i.getUTCMonth()+1).padStart(2,"0")}`;n.push({label:g,visits:a.get(g)||0})}return n}function Dt(t){const e=t.country||"-",a=t.region||null,o=t.city||null;return!t.country&&!a&&!o?"-":a?`${e} / ${a}`:o?`${e} / ${o}`:e}function Nt(t){const e=String(t||"").toLowerCase();return e.includes("windows")?{label:"Windows",className:"os-win",icon:"windows"}:e.includes("linux")?{label:"Linux",className:"os-lnx",icon:"linux"}:e.includes("android")?{label:"Android",className:"os-and",icon:"android"}:e.includes("ios")?{label:"iOS",className:"os-ios",icon:"ios"}:e.includes("mac")?{label:"macOS",className:"os-mac",icon:"mac"}:{label:"Other OS",className:"os-generic",icon:"generic"}}function tt(t){const e=Nt(t);let a="";return e.icon==="windows"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="8" height="7" rx="1"></rect>
        <rect x="13" y="4" width="8" height="7" rx="1"></rect>
        <rect x="3" y="13" width="8" height="7" rx="1"></rect>
        <rect x="13" y="13" width="8" height="7" rx="1"></rect>
      </svg>`:e.icon==="linux"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="3"></circle>
        <path d="M8 11.5c0-1.2 1-2.2 2.2-2.2h3.6c1.2 0 2.2 1 2.2 2.2v4.2c0 2.2-1.8 4-4 4s-4-1.8-4-4z"></path>
        <path d="M8 19.5l-2 1.5M16 19.5l2 1.5M9 14H6.5M15 14h2.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:e.icon==="android"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 9.5A4 4 0 0 1 12 6a4 4 0 0 1 4 3.5z"></path>
        <rect x="7" y="10" width="10" height="8" rx="2"></rect>
        <path d="M9 6L7.5 4.5M15 6l1.5-1.5M9 12.5h0M15 12.5h0M9 18v2M15 18v2M7 11.5v5M17 11.5v5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:e.icon==="ios"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7.5" y="3.5" width="9" height="17" rx="2.4"></rect>
        <circle cx="12" cy="17.5" r="0.9" fill="currentColor"></circle>
      </svg>`:e.icon==="mac"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="10" rx="2"></rect>
        <path d="M2.8 18h18.4M9 20h6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10" rx="2"></rect>
        <path d="M9 19h6M12 15v4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`,`<span class="os-badge ${e.className}" title="${d(e.label)}" aria-label="${d(e.label)}">${a}</span>`}function Tt(t){return t.toLocaleString(void 0,{month:"long",year:"numeric"})}function St(t,e){const a=t.getFullYear(),o=t.getMonth(),r=(new Date(a,o,1).getDay()+6)%7,i=new Date(a,o,1-r),g=[];for(let h=0;h<42;h+=1){const b=new Date(i);b.setDate(i.getDate()+h);const k=b.toISOString().slice(0,10),m=Number(e.get(k)||0),y=b.getMonth()===o;g.push({dayNum:b.getDate(),iso:k,visits:m,inMonth:y})}return g}function Ct(t,e){return e==="day"?t.slice(-14).map(o=>({label:o.day.slice(5),visits:o.visits})):e==="week"?t.slice(-7).map(o=>({label:o.day.slice(5),visits:o.visits})):e==="month"?kt(t.slice(-30),6,"W"):e==="quarter"?Z(t.slice(-90),3).map(a=>({label:a.label.slice(5),visits:a.visits})):Z(t,12).map(a=>({label:a.label.slice(5),visits:a.visits}))}function Lt(t){if(!t||t.length===0)return"<p>No data</p>";const e=t.map(l=>Number(l.visits||0)),a=Math.max(1,...e),o=0,n=640,r=140,i=40,g=n-i*2,h=r-i*2,b=g/(t.length-1||1),k=h/(a-o||1),m=e.map((l,u)=>({x:i+u*b,y:i+h-(l-o)*k,label:t[u].label,visits:l}));m.map((l,u)=>`${u===0?"M":"L"} ${l.x} ${l.y}`).join(" ");const y=[];for(let l=0;l<=4;l++){const u=i+h/4*l,U=Math.round(a-a/4*l);y.push(`<line x1="${i}" y1="${u}" x2="${n-i}" y2="${u}" class="chart-grid-line" />`),y.push(`<text x="${i-8}" y="${u+4}" class="chart-y-label">${U}</text>`)}const P=m.filter((l,u)=>u===0||u===m.length-1||u%Math.ceil(m.length/4)===0).map(l=>`<text x="${l.x}" y="${r-8}" class="chart-x-label" text-anchor="middle">${d(l.label)}</text>`).join(""),E=m.map(l=>`<circle cx="${l.x}" cy="${l.y}" r="3" class="chart-dot" title="${d(l.label)}: ${l.visits}" />`).join("");return`
    <div class="timeseries-chart-wrap">
      <svg viewBox="0 0 ${n} ${r}" class="timeseries-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#0fc7ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2dd98a;stop-opacity:1" />
          </linearGradient>
        </defs>
        ${y.join(`
`)}
        <polyline points="${m.map(l=>`${l.x},${l.y}`).join(" ")}" class="chart-line" />
        ${E}
        ${P}
      </svg>
    </div>
  `}function C(t=""){A.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${ht}" alt="Portfolio Analytics" class="login-hero-image" />
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
  `;const e=document.getElementById("login-form");e==null||e.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(e),n={username:String(o.get("username")||""),password:String(o.get("password")||""),totpCode:String(o.get("totpCode")||"").trim()};try{await v("/api/auth/login",{method:"POST",body:JSON.stringify(n)}),await $()}catch(r){C(r.message)}})}function T(t,e,a,o,n){var O,q,_,Y,W,H,G,J,z,K,Q;const r=Number(t.totals.visits||0),i=Number(t.totals.visitors||0),g=Number(t.totals.pageviews||0),h=r>0?g/r:0,b=r>0?(r-i)/r*100:0,k=((q=(O=t.countries)==null?void 0:O[0])==null?void 0:q.total)||0,m=r>0?k/r*100:0,y=(t.countries||[]).filter(s=>s.label&&s.label!=="Unknown").length,L=xt(o.points||[],365),P=new Map(L.map(s=>[s.day,Number(s.visits||0)])),E=Ct(L,x),l=Lt(E),u=new Date(f.getFullYear(),f.getMonth(),1),U=St(u,P).map(s=>{const c=Math.min(s.visits,10)/10,p=c>0?.16+c*.62:0,N=c>0?`rgba(45, 217, 138, ${p.toFixed(2)})`:"rgba(140, 160, 180, 0.18)";return`<button class="heat-cell-button${s.inMonth?"":" heat-cell-muted"}" style="background:${N}" title="${s.iso}: ${s.visits} visitors" type="button">${s.dayNum}<span class="heat-cell-count">${s.visits>0?s.visits:""}</span></button>`}).join(""),et=t.countries.map(s=>`<li><span>${d(s.label||"Unknown")}</span><strong>${s.total}</strong></li>`).join(""),st=t.operatingSystems.map(s=>`<li><span class="os-entry">${tt(s.label)}<span>${d(s.label||"Unknown")}</span></span><strong>${s.total}</strong></li>`).join(""),at=t.devices.map(s=>`<li><span>${d(s.label||"Unknown")}</span><strong>${s.total}</strong></li>`).join(""),nt=e.points.map(s=>`<tr><td>${s.day}</td><td>${s.visits}</td></tr>`).join(""),F=[...e.points].reverse(),ot=Math.max(1,...F.map(s=>Number(s.visits||0))),rt=F.map(s=>{const c=Number(s.visits||0),p=Math.max(4,Math.round(c/ot*100));return`
        <div class="bar-row">
          <span class="bar-label">${s.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${p}%"></div></div>
          <strong class="bar-value">${c}</strong>
        </div>
      `}).join(""),it=Math.max(1,(t.devices||[]).reduce((s,c)=>s+Number(c.total||0),0)),lt=(t.devices||[]).map(s=>{const c=Number(s.total||0)/it*100,p=Math.max(4,Math.round(c));return`
        <div class="bar-row">
          <span class="bar-label">${s.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${p}%"></div></div>
          <strong class="bar-value">${j(c)}</strong>
        </div>
      `}).join(""),B=(n==null?void 0:n.totals)||{},ct=((n==null?void 0:n.byType)||[]).map(s=>`<li><span>${d($t(s.eventType))}</span><strong>${s.total}</strong></li>`).join(""),dt=((n==null?void 0:n.topProjectTargets)||[]).map(s=>{const c=yt(s.target),p=D(s.label||"Unknown Project",26);return`
        <li>
          <span title="${d(`${s.label||"Unknown Project"} -> ${c.full}`)}">${d(p)}</span>
          <strong>${s.total}</strong>
        </li>
      `}).join(""),pt=((n==null?void 0:n.topSections)||[]).map(s=>`<li><span>${d(s.section||"unknown")}</span><strong>${s.total}</strong></li>`).join(""),ut=a.records.map(s=>{const c=d(s.device_type||"-"),p=d(s.os_name||"Unknown"),N=d(s.browser_name||"-"),I=d(Dt(s)),gt=d(s.ip_address||"-"),X=ft(s.referrer);return`
        <tr>
          <td><input type="checkbox" class="event-check" value="${s.event_id}" /></td>
          <td><span class="cell-time">${d(bt(s.created_at))}</span></td>
          <td><span class="mono-cell">${gt}</span></td>
          <td><span class="truncate-cell" title="${I}">${I}</span></td>
          <td>
            <span class="device-stack">
              <span class="device-topline">${tt(s.os_name)}<span class="truncate-cell" title="${p}">${p}</span></span>
              <span class="device-subline">${c}</span>
            </span>
          </td>
          <td><span class="truncate-cell" title="${N}">${N}</span></td>
          <td><span class="truncate-cell" title="${d(X.full)}">${d(X.short)}</span></td>
        </tr>
      `}).join(""),w=a.paging||{page:1,perPage:R,totalPages:1};A.innerHTML=`
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

      <section class="stats-grid totals-grid">
        <article class="stats-card">
          <h2>Resume Downloads (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${B.resumeDownloads||0}</p>
        </article>
        <article class="stats-card">
          <h2>Project Link Clicks (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${B.projectLinkClicks||0}</p>
        </article>
        <article class="stats-card">
          <h2>Section Views (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${B.sectionViews||0}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${h.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${j(b)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${j(m)}</strong></div>
            <div class="metric-item"><span>Geo Coverage</span><strong>${y}</strong></div>
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
          ${l}
        </article>
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <button id="calendar-prev" class="refresh-button" type="button">Prev</button>
            <div class="calendar-title-wrap">
              <h2>${Tt(u)}</h2>
              <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
            </div>
            <button id="calendar-next" class="refresh-button" type="button">Next</button>
          </div>
          <div class="calendar-weekdays">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="calendar-grid">${U}</div>
        </article>
      </section>

      <section class="stats-grid compact-analytics-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${et||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${at||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${st||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Visits by Day (${e.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${nt||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${rt||"<p>No trend data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${lt||"<p>No device data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Interaction Types (${(n==null?void 0:n.days)||90}d)</h2>
          <ul class="stats-list">${ct||"<li><span>No interactions yet</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Top Clicked Projects</h2>
          <ul class="stats-list">${dt||"<li><span>No project clicks yet</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Top Viewed Sections</h2>
          <ul class="stats-list">${pt||"<li><span>No section views yet</span><strong>0</strong></li>"}</ul>
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
                ${[10,20,50,100].map(s=>`<option value="${s}" ${w.perPage===s?"selected":""}>${s}</option>`).join("")}
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
              <tbody>${ut||'<tr><td colspan="7">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(_=document.getElementById("logout-button"))==null||_.addEventListener("click",async()=>{V(),await v("/api/auth/logout",{method:"POST"}),C()}),(Y=document.getElementById("refresh-button"))==null||Y.addEventListener("click",()=>{$()}),(W=document.getElementById("prev-page-button"))==null||W.addEventListener("click",()=>{M>1&&(M-=1,$())}),(H=document.getElementById("next-page-button"))==null||H.addEventListener("click",()=>{M<w.totalPages&&(M+=1,$())}),(G=document.getElementById("per-page-select"))==null||G.addEventListener("change",s=>{const c=Number.parseInt(s.target.value,10);Number.isFinite(c)&&(R=c,M=1,$())}),(J=document.getElementById("period-select"))==null||J.addEventListener("change",s=>{x=String(s.target.value||"week"),T(t,e,a,o,n)}),(z=document.getElementById("calendar-prev"))==null||z.addEventListener("click",()=>{f=new Date(f.getFullYear(),f.getMonth()-1,1),T(t,e,a,o,n)}),(K=document.getElementById("calendar-next"))==null||K.addEventListener("click",()=>{f=new Date(f.getFullYear(),f.getMonth()+1,1),T(t,e,a,o,n)}),(Q=document.getElementById("delete-selected-button"))==null||Q.addEventListener("click",async()=>{const s=Array.from(document.querySelectorAll(".event-check:checked")).map(p=>Number.parseInt(p.value,10)).filter(p=>Number.isInteger(p)&&p>0);if(!(s.length===0||!window.confirm(`Delete ${s.length} selected visit row(s)?`)))try{await v("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:s})}),await $()}catch(p){window.alert(p.message||"Failed to delete selected rows.")}})}let S=null,M=1,R=20,x="week",f=new Date(new Date().getFullYear(),new Date().getMonth(),1);function V(){S&&(clearInterval(S),S=null)}async function $(){var t;try{const[e,a,o,n,r]=await Promise.all([v("/api/stats/summary"),v("/api/stats/daily?days=30"),v(`/api/stats/recent?page=${M}&perPage=${R}`),v("/api/stats/daily?days=365"),v("/api/stats/interactions?days=90")]);(t=o==null?void 0:o.paging)!=null&&t.page&&(M=o.paging.page),T(e,a,o,n,r)}catch(e){V(),C(e.message)}}async function Pt(){A.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await v("/api/auth/me"),await $(),V(),S=setInterval($,60*1e3)}catch{C()}}Pt();
