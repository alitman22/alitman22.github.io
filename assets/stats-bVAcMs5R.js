import"./modulepreload-polyfill-B5Qt9EMX.js";const mt=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,V=document.getElementById("stats-root"),vt="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function bt(t){return`${vt}${t}`}async function v(t,s={}){const a=await fetch(bt(t),{credentials:"include",headers:{"Content-Type":"application/json",...s.headers||{}},...s}),o=await a.text(),n=o?JSON.parse(o):{};if(!a.ok)throw new Error((n==null?void 0:n.message)||`Request failed: ${a.status}`);return n}function $t(t){if(!t)return"-";const s=new Date(t);return Number.isNaN(s.getTime())?t:s.toLocaleString()}function I(t){return Number.isFinite(t)?`${Math.round(t)}%`:"0%"}function d(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function T(t,s=42){const a=String(t||"").trim();return a?a.length>s?`${a.slice(0,Math.max(0,s-1))}…`:a:"-"}function ft(t){const s=String(t||"").trim();if(!s)return{short:"-",full:"-"};try{const a=new URL(s),o=`${a.hostname}${a.pathname==="/"?"":a.pathname}`;return{short:T(o,34),full:s}}catch{return{short:T(s,34),full:s}}}function yt(t){const s=String(t||"").trim();return s?s.replaceAll("_"," ").replaceAll("-"," ").replace(/\b\w/g,a=>a.toUpperCase()):"Unknown"}function wt(t){return t.toISOString().slice(0,10)}function xt(t,s){const a=new Map((t||[]).map(r=>[String(r.day),Number(r.visits||0)])),o=[],n=new Date,i=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()));for(let r=s-1;r>=0;r-=1){const g=new Date(i);g.setUTCDate(i.getUTCDate()-r);const h=wt(g);o.push({day:h,visits:a.get(h)||0})}return o}function Mt(t){return(t||[]).reduce((s,a)=>s+Number(a.visits||0),0)}function kt(t,s,a){const o=[];let n=0;for(let i=0;i<t.length;i+=s){const r=t.slice(i,i+s);o.push({label:`${a}${n+1}`,visits:Mt(r)}),n+=1}return o}function Z(t,s){const a=new Map;for(const i of t){const r=String(i.day).slice(0,7);a.set(r,(a.get(r)||0)+Number(i.visits||0))}const o=new Date,n=[];for(let i=s-1;i>=0;i-=1){const r=new Date(Date.UTC(o.getUTCFullYear(),o.getUTCMonth()-i,1)),g=`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}`;n.push({label:g,visits:a.get(g)||0})}return n}function Dt(t){const s=t.country||"-",a=t.region||null,o=t.city||null;return!t.country&&!a&&!o?"-":a?`${s} / ${a}`:o?`${s} / ${o}`:s}function Nt(t){const s=String(t||"").toLowerCase();return s.includes("windows")?{label:"Windows",className:"os-win",icon:"windows"}:s.includes("linux")?{label:"Linux",className:"os-lnx",icon:"linux"}:s.includes("android")?{label:"Android",className:"os-and",icon:"android"}:s.includes("ios")?{label:"iOS",className:"os-ios",icon:"ios"}:s.includes("mac")?{label:"macOS",className:"os-mac",icon:"mac"}:{label:"Other OS",className:"os-generic",icon:"generic"}}function tt(t){const s=Nt(t);let a="";return s.icon==="windows"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="8" height="7" rx="1"></rect>
        <rect x="13" y="4" width="8" height="7" rx="1"></rect>
        <rect x="3" y="13" width="8" height="7" rx="1"></rect>
        <rect x="13" y="13" width="8" height="7" rx="1"></rect>
      </svg>`:s.icon==="linux"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="7" r="3"></circle>
        <path d="M8 11.5c0-1.2 1-2.2 2.2-2.2h3.6c1.2 0 2.2 1 2.2 2.2v4.2c0 2.2-1.8 4-4 4s-4-1.8-4-4z"></path>
        <path d="M8 19.5l-2 1.5M16 19.5l2 1.5M9 14H6.5M15 14h2.5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:s.icon==="android"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 9.5A4 4 0 0 1 12 6a4 4 0 0 1 4 3.5z"></path>
        <rect x="7" y="10" width="10" height="8" rx="2"></rect>
        <path d="M9 6L7.5 4.5M15 6l1.5-1.5M9 12.5h0M15 12.5h0M9 18v2M15 18v2M7 11.5v5M17 11.5v5" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:s.icon==="ios"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="7.5" y="3.5" width="9" height="17" rx="2.4"></rect>
        <circle cx="12" cy="17.5" r="0.9" fill="currentColor"></circle>
      </svg>`:s.icon==="mac"?a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5.5" width="16" height="10" rx="2"></rect>
        <path d="M2.8 18h18.4M9 20h6" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`:a=`
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4" y="5" width="16" height="10" rx="2"></rect>
        <path d="M9 19h6M12 15v4" stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round"></path>
      </svg>`,`<span class="os-badge ${s.className}" title="${d(s.label)}" aria-label="${d(s.label)}">${a}</span>`}function St(t){return t.toLocaleString(void 0,{month:"long",year:"numeric"})}function Tt(t,s){const a=t.getFullYear(),o=t.getMonth(),i=(new Date(a,o,1).getDay()+6)%7,r=new Date(a,o,1-i),g=[];for(let h=0;h<42;h+=1){const b=new Date(r);b.setDate(r.getDate()+h);const k=b.toISOString().slice(0,10),m=Number(s.get(k)||0),y=b.getMonth()===o;g.push({dayNum:b.getDate(),iso:k,visits:m,inMonth:y})}return g}function Ct(t,s){return s==="day"?t.slice(-14).map(o=>({label:o.day.slice(5),visits:o.visits})):s==="week"?t.slice(-7).map(o=>({label:o.day.slice(5),visits:o.visits})):s==="month"?kt(t.slice(-30),6,"W"):s==="quarter"?Z(t.slice(-90),3).map(a=>({label:a.label.slice(5),visits:a.visits})):Z(t,12).map(a=>({label:a.label.slice(5),visits:a.visits}))}function Lt(t){if(!t||t.length===0)return"<p>No data</p>";const s=t.map(l=>Number(l.visits||0)),a=Math.max(1,...s),o=0,n=640,i=140,r=40,g=n-r*2,h=i-r*2,b=g/(t.length-1||1),k=h/(a-o||1),m=s.map((l,p)=>({x:r+p*b,y:r+h-(l-o)*k,label:t[p].label,visits:l}));m.map((l,p)=>`${p===0?"M":"L"} ${l.x} ${l.y}`).join(" ");const y=[];for(let l=0;l<=4;l++){const p=r+h/4*l,E=Math.round(a-a/4*l);y.push(`<line x1="${r}" y1="${p}" x2="${n-r}" y2="${p}" class="chart-grid-line" />`),y.push(`<text x="${r-8}" y="${p+4}" class="chart-y-label">${E}</text>`)}const P=m.filter((l,p)=>p===0||p===m.length-1||p%Math.ceil(m.length/4)===0).map(l=>`<text x="${l.x}" y="${i-8}" class="chart-x-label" text-anchor="middle">${d(l.label)}</text>`).join(""),j=m.map(l=>`<circle cx="${l.x}" cy="${l.y}" r="3" class="chart-dot" title="${d(l.label)}: ${l.visits}" />`).join("");return`
    <div class="timeseries-chart-wrap">
      <svg viewBox="0 0 ${n} ${i}" class="timeseries-chart" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#0fc7ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2dd98a;stop-opacity:1" />
          </linearGradient>
        </defs>
        ${y.join(`
`)}
        <polyline points="${m.map(l=>`${l.x},${l.y}`).join(" ")}" class="chart-line" />
        ${j}
        ${P}
      </svg>
    </div>
  `}function C(t=""){V.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${mt}" alt="Portfolio Analytics" class="login-hero-image" />
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
  `;const s=document.getElementById("login-form");s==null||s.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(s),n={username:String(o.get("username")||""),password:String(o.get("password")||""),totpCode:String(o.get("totpCode")||"").trim()};try{await v("/api/auth/login",{method:"POST",body:JSON.stringify(n)}),await f()}catch(i){C(i.message)}})}function N(t,s,a,o,n){var O,q,_,Y,W,H,G,J,z,K,Q;const i=Number(t.totals.visits||0),r=Number(t.totals.visitors||0),g=Number(t.totals.pageviews||0),h=i>0?g/i:0,b=i>0?(i-r)/i*100:0,k=((q=(O=t.countries)==null?void 0:O[0])==null?void 0:q.total)||0,m=i>0?k/i*100:0,y=(t.countries||[]).filter(e=>e.label&&e.label!=="Unknown").length,L=xt(o.points||[],365),P=new Map(L.map(e=>[e.day,Number(e.visits||0)])),j=Ct(L,x),l=Lt(j),p=new Date($.getFullYear(),$.getMonth(),1),E=Tt(p,P).map(e=>{const c=Math.min(e.visits,10)/10,u=c>0?.16+c*.62:0,D=c>0?`rgba(45, 217, 138, ${u.toFixed(2)})`:"rgba(140, 160, 180, 0.18)";return`<button class="heat-cell-button${e.inMonth?"":" heat-cell-muted"}" style="background:${D}" title="${e.iso}: ${e.visits} visitors" type="button">${e.dayNum}<span class="heat-cell-count">${e.visits>0?e.visits:""}</span></button>`}).join(""),et=t.countries.map(e=>`<li><span>${d(e.label||"Unknown")}</span><strong>${e.total}</strong></li>`).join(""),st=t.operatingSystems.map(e=>`<li><span class="os-entry">${tt(e.label)}<span>${d(e.label||"Unknown")}</span></span><strong>${e.total}</strong></li>`).join(""),at=t.devices.map(e=>`<li><span>${d(e.label||"Unknown")}</span><strong>${e.total}</strong></li>`).join(""),nt=s.points.map(e=>`<tr><td>${e.day}</td><td>${e.visits}</td></tr>`).join(""),F=[...s.points].reverse(),ot=Math.max(1,...F.map(e=>Number(e.visits||0))),it=F.map(e=>{const c=Number(e.visits||0),u=Math.max(4,Math.round(c/ot*100));return`
        <div class="bar-row">
          <span class="bar-label">${e.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${u}%"></div></div>
          <strong class="bar-value">${c}</strong>
        </div>
      `}).join(""),rt=Math.max(1,(t.devices||[]).reduce((e,c)=>e+Number(c.total||0),0)),lt=(t.devices||[]).map(e=>{const c=Number(e.total||0)/rt*100,u=Math.max(4,Math.round(c));return`
        <div class="bar-row">
          <span class="bar-label">${e.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${u}%"></div></div>
          <strong class="bar-value">${I(c)}</strong>
        </div>
      `}).join(""),U=(n==null?void 0:n.totals)||{},ct=((n==null?void 0:n.byType)||[]).map(e=>`<li><span>${d(yt(e.eventType))}</span><strong>${e.total}</strong></li>`).join(""),dt=((n==null?void 0:n.topProjects)||[]).map(e=>{const c=T(e.project||"Unknown Project",26);return`
        <li>
          <span title="${d(e.project||"Unknown Project")}">${d(c)}</span>
          <strong>${e.total}</strong>
        </li>
      `}).join(""),pt=((n==null?void 0:n.resumeVersions)||[]).map(e=>{const c=T(e.version||"unknown-resume",28);return`<li><span title="${d(e.version||"unknown-resume")}">${d(c)}</span><strong>${e.total}</strong></li>`}).join(""),ut=((n==null?void 0:n.topSections)||[]).map(e=>`<li><span>${d(e.section||"unknown")}</span><strong>${e.total}</strong></li>`).join(""),gt=a.records.map(e=>{const c=d(e.device_type||"-"),u=d(e.os_name||"Unknown"),D=d(e.browser_name||"-"),B=d(Dt(e)),ht=d(e.ip_address||"-"),X=ft(e.referrer);return`
        <tr>
          <td><input type="checkbox" class="event-check" value="${e.event_id}" /></td>
          <td><span class="cell-time">${d($t(e.created_at))}</span></td>
          <td><span class="mono-cell">${ht}</span></td>
          <td><span class="truncate-cell" title="${B}">${B}</span></td>
          <td>
            <span class="device-stack">
              <span class="device-topline">${tt(e.os_name)}<span class="truncate-cell" title="${u}">${u}</span></span>
              <span class="device-subline">${c}</span>
            </span>
          </td>
          <td><span class="truncate-cell" title="${D}">${D}</span></td>
          <td><span class="truncate-cell" title="${d(X.full)}">${d(X.short)}</span></td>
        </tr>
      `}).join(""),w=a.paging||{page:1,perPage:R,totalPages:1};V.innerHTML=`
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
          <p class="big-number">${U.resumeDownloads||0}</p>
        </article>
        <article class="stats-card">
          <h2>Project Link Clicks (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${U.projectLinkClicks||0}</p>
        </article>
        <article class="stats-card">
          <h2>Section Views (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${U.sectionViews||0}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${h.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${I(b)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${I(m)}</strong></div>
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
              <h2>${St(p)}</h2>
              <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
            </div>
            <button id="calendar-next" class="refresh-button" type="button">Next</button>
          </div>
          <div class="calendar-weekdays">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="calendar-grid">${E}</div>
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
          <h2>Visits by Day (${s.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${nt||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${it||"<p>No trend data</p>"}</div>
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
          <h2>Resume Versions Downloaded</h2>
          <ul class="stats-list">${pt||"<li><span>No resume downloads yet</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Top Viewed Sections</h2>
          <ul class="stats-list">${ut||"<li><span>No section views yet</span><strong>0</strong></li>"}</ul>
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
                ${[10,20,50,100].map(e=>`<option value="${e}" ${w.perPage===e?"selected":""}>${e}</option>`).join("")}
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
              <tbody>${gt||'<tr><td colspan="7">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(_=document.getElementById("logout-button"))==null||_.addEventListener("click",async()=>{A(),await v("/api/auth/logout",{method:"POST"}),C()}),(Y=document.getElementById("refresh-button"))==null||Y.addEventListener("click",()=>{f()}),(W=document.getElementById("prev-page-button"))==null||W.addEventListener("click",()=>{M>1&&(M-=1,f())}),(H=document.getElementById("next-page-button"))==null||H.addEventListener("click",()=>{M<w.totalPages&&(M+=1,f())}),(G=document.getElementById("per-page-select"))==null||G.addEventListener("change",e=>{const c=Number.parseInt(e.target.value,10);Number.isFinite(c)&&(R=c,M=1,f())}),(J=document.getElementById("period-select"))==null||J.addEventListener("change",e=>{x=String(e.target.value||"week"),N(t,s,a,o,n)}),(z=document.getElementById("calendar-prev"))==null||z.addEventListener("click",()=>{$=new Date($.getFullYear(),$.getMonth()-1,1),N(t,s,a,o,n)}),(K=document.getElementById("calendar-next"))==null||K.addEventListener("click",()=>{$=new Date($.getFullYear(),$.getMonth()+1,1),N(t,s,a,o,n)}),(Q=document.getElementById("delete-selected-button"))==null||Q.addEventListener("click",async()=>{const e=Array.from(document.querySelectorAll(".event-check:checked")).map(u=>Number.parseInt(u.value,10)).filter(u=>Number.isInteger(u)&&u>0);if(!(e.length===0||!window.confirm(`Delete ${e.length} selected visit row(s)?`)))try{await v("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:e})}),await f()}catch(u){window.alert(u.message||"Failed to delete selected rows.")}})}let S=null,M=1,R=20,x="week",$=new Date(new Date().getFullYear(),new Date().getMonth(),1);function A(){S&&(clearInterval(S),S=null)}async function f(){var t;try{const[s,a,o,n,i]=await Promise.all([v("/api/stats/summary"),v("/api/stats/daily?days=30"),v(`/api/stats/recent?page=${M}&perPage=${R}`),v("/api/stats/daily?days=365"),v("/api/stats/interactions?days=90")]);(t=o==null?void 0:o.paging)!=null&&t.page&&(M=o.paging.page),N(s,a,o,n,i)}catch(s){A(),C(s.message)}}async function Pt(){V.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await v("/api/auth/me"),await f(),A(),S=setInterval(f,60*1e3)}catch{C()}}Pt();
