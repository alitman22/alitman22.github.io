import"./modulepreload-polyfill-B5Qt9EMX.js";const $t=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,V=document.getElementById("stats-root"),ft="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function yt(e){return`${ft}${e}`}async function v(e,s={}){const a=await fetch(yt(e),{credentials:"include",headers:{"Content-Type":"application/json",...s.headers||{}},...s}),o=await a.text(),n=o?JSON.parse(o):{};if(!a.ok)throw new Error((n==null?void 0:n.message)||`Request failed: ${a.status}`);return n}function wt(e){if(!e)return"-";const s=new Date(e);return Number.isNaN(s.getTime())?e:s.toLocaleString()}function B(e){return Number.isFinite(e)?`${Math.round(e)}%`:"0%"}function c(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function T(e,s=42){const a=String(e||"").trim();return a?a.length>s?`${a.slice(0,Math.max(0,s-1))}…`:a:"-"}function xt(e){const s=String(e||"").trim();if(!s)return{short:"-",full:"-"};try{const a=new URL(s),o=`${a.hostname}${a.pathname==="/"?"":a.pathname}`;return{short:T(o,34),full:s}}catch{return{short:T(s,34),full:s}}}function kt(e){const s=String(e||"").trim();return s?s.replaceAll("_"," ").replaceAll("-"," ").replace(/\b\w/g,a=>a.toUpperCase()):"Unknown"}function Mt(e){return e.toISOString().slice(0,10)}function Dt(e,s){const a=new Map((e||[]).map(l=>[String(l.day),Number(l.visits||0)])),o=[],n=new Date,i=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()));for(let l=s-1;l>=0;l-=1){const g=new Date(i);g.setUTCDate(i.getUTCDate()-l);const h=Mt(g);o.push({day:h,visits:a.get(h)||0})}return o}function Nt(e){return(e||[]).reduce((s,a)=>s+Number(a.visits||0),0)}function St(e,s,a){const o=[];let n=0;for(let i=0;i<e.length;i+=s){const l=e.slice(i,i+s);o.push({label:`${a}${n+1}`,visits:Nt(l)}),n+=1}return o}function Z(e,s){const a=new Map;for(const i of e){const l=String(i.day).slice(0,7);a.set(l,(a.get(l)||0)+Number(i.visits||0))}const o=new Date,n=[];for(let i=s-1;i>=0;i-=1){const l=new Date(Date.UTC(o.getUTCFullYear(),o.getUTCMonth()-i,1)),g=`${l.getUTCFullYear()}-${String(l.getUTCMonth()+1).padStart(2,"0")}`;n.push({label:g,visits:a.get(g)||0})}return n}function Tt(e){const s=e.country||"-",a=e.region||null,o=e.city||null;return!e.country&&!a&&!o?"-":a?`${s} / ${a}`:o?`${s} / ${o}`:s}function Ct(e){const s=String(e||"").toLowerCase();return s.includes("windows")?{label:"Windows",className:"os-win",icon:"windows"}:s.includes("linux")?{label:"Linux",className:"os-lnx",icon:"linux"}:s.includes("android")?{label:"Android",className:"os-and",icon:"android"}:s.includes("ios")?{label:"iOS",className:"os-ios",icon:"ios"}:s.includes("mac")?{label:"macOS",className:"os-mac",icon:"mac"}:{label:"Other OS",className:"os-generic",icon:"generic"}}function tt(e){const s=Ct(e);let a="";return s.icon==="windows"?a=`
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
      </svg>`,`<span class="os-badge ${s.className}" title="${c(s.label)}" aria-label="${c(s.label)}">${a}</span>`}function Lt(e){return e.toLocaleString(void 0,{month:"long",year:"numeric"})}function Pt(e,s){const a=e.getFullYear(),o=e.getMonth(),i=(new Date(a,o,1).getDay()+6)%7,l=new Date(a,o,1-i),g=[];for(let h=0;h<42;h+=1){const b=new Date(l);b.setDate(l.getDate()+h);const M=b.toISOString().slice(0,10),m=Number(s.get(M)||0),y=b.getMonth()===o;g.push({dayNum:b.getDate(),iso:M,visits:m,inMonth:y})}return g}function jt(e,s){return s==="day"?e.slice(-14).map(o=>({label:o.day.slice(5),visits:o.visits})):s==="week"?e.slice(-7).map(o=>({label:o.day.slice(5),visits:o.visits})):s==="month"?St(e.slice(-30),6,"W"):s==="quarter"?Z(e.slice(-90),3).map(a=>({label:a.label.slice(5),visits:a.visits})):Z(e,12).map(a=>({label:a.label.slice(5),visits:a.visits}))}function Ut(e){if(!e||e.length===0)return"<p>No data</p>";const s=e.map(r=>Number(r.visits||0)),a=Math.max(1,...s),o=0,n=640,i=140,l=40,g=n-l*2,h=i-l*2,b=g/(e.length-1||1),M=h/(a-o||1),m=s.map((r,p)=>({x:l+p*b,y:l+h-(r-o)*M,label:e[p].label,visits:r}));m.map((r,p)=>`${p===0?"M":"L"} ${r.x} ${r.y}`).join(" ");const y=[];for(let r=0;r<=4;r++){const p=l+h/4*r,U=Math.round(a-a/4*r);y.push(`<line x1="${l}" y1="${p}" x2="${n-l}" y2="${p}" class="chart-grid-line" />`),y.push(`<text x="${l-8}" y="${p+4}" class="chart-y-label">${U}</text>`)}const P=m.filter((r,p)=>p===0||p===m.length-1||p%Math.ceil(m.length/4)===0).map(r=>`<text x="${r.x}" y="${i-8}" class="chart-x-label" text-anchor="middle">${c(r.label)}</text>`).join(""),j=m.map(r=>`<circle cx="${r.x}" cy="${r.y}" r="3" class="chart-dot" title="${c(r.label)}: ${r.visits}" />`).join("");return`
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
        <polyline points="${m.map(r=>`${r.x},${r.y}`).join(" ")}" class="chart-line" />
        ${j}
        ${P}
      </svg>
    </div>
  `}function C(e=""){V.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${$t}" alt="Portfolio Analytics" class="login-hero-image" />
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
  `;const s=document.getElementById("login-form");s==null||s.addEventListener("submit",async a=>{a.preventDefault();const o=new FormData(s),n={username:String(o.get("username")||""),password:String(o.get("password")||""),totpCode:String(o.get("totpCode")||"").trim()};try{await v("/api/auth/login",{method:"POST",body:JSON.stringify(n)}),await f()}catch(i){C(i.message)}})}function N(e,s,a,o,n){var O,q,_,Y,W,H,G,J,z,K,Q;const i=Number(e.totals.visits||0),l=Number(e.totals.visitors||0),g=Number(e.totals.pageviews||0),h=i>0?g/i:0,b=i>0?(i-l)/i*100:0,M=((q=(O=e.countries)==null?void 0:O[0])==null?void 0:q.total)||0,m=i>0?M/i*100:0,y=(e.countries||[]).filter(t=>t.label&&t.label!=="Unknown").length,L=Dt(o.points||[],365),P=new Map(L.map(t=>[t.day,Number(t.visits||0)])),j=jt(L,x),r=Ut(j),p=new Date($.getFullYear(),$.getMonth(),1),U=Pt(p,P).map(t=>{const d=Math.min(t.visits,10)/10,u=d>0?.16+d*.62:0,D=d>0?`rgba(45, 217, 138, ${u.toFixed(2)})`:"rgba(140, 160, 180, 0.18)";return`<button class="heat-cell-button${t.inMonth?"":" heat-cell-muted"}" style="background:${D}" title="${t.iso}: ${t.visits} visitors" type="button">${t.dayNum}<span class="heat-cell-count">${t.visits>0?t.visits:""}</span></button>`}).join(""),et=e.countries.map(t=>`<li><span>${c(t.label||"Unknown")}</span><strong>${t.total}</strong></li>`).join(""),st=(e.countries||[]).slice(0,3).map(t=>`<li><span>${c(t.label||"Unknown")}</span><strong>${t.total}</strong></li>`).join(""),at=e.operatingSystems.map(t=>`<li><span class="os-entry">${tt(t.label)}<span>${c(t.label||"Unknown")}</span></span><strong>${t.total}</strong></li>`).join(""),nt=(e.operatingSystems||[]).slice(0,3).map(t=>`<li><span>${c(t.label||"Unknown")}</span><strong>${t.total}</strong></li>`).join(""),ot=e.devices.map(t=>`<li><span>${c(t.label||"Unknown")}</span><strong>${t.total}</strong></li>`).join(""),it=(e.devices||[]).slice(0,3).map(t=>`<li><span>${c(t.label||"Unknown")}</span><strong>${t.total}</strong></li>`).join(""),lt=s.points.map(t=>`<tr><td>${t.day}</td><td>${t.visits}</td></tr>`).join(""),F=[...s.points].reverse(),rt=Math.max(1,...F.map(t=>Number(t.visits||0))),ct=F.map(t=>{const d=Number(t.visits||0),u=Math.max(4,Math.round(d/rt*100));return`
        <div class="bar-row">
          <span class="bar-label">${t.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${u}%"></div></div>
          <strong class="bar-value">${d}</strong>
        </div>
      `}).join(""),dt=Math.max(1,(e.devices||[]).reduce((t,d)=>t+Number(d.total||0),0)),pt=(e.devices||[]).map(t=>{const d=Number(t.total||0)/dt*100,u=Math.max(4,Math.round(d));return`
        <div class="bar-row">
          <span class="bar-label">${t.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${u}%"></div></div>
          <strong class="bar-value">${B(d)}</strong>
        </div>
      `}).join(""),E=(n==null?void 0:n.totals)||{},ut=((n==null?void 0:n.byType)||[]).map(t=>`<li><span>${c(kt(t.eventType))}</span><strong>${t.total}</strong></li>`).join(""),gt=((n==null?void 0:n.topProjects)||[]).map(t=>{const d=T(t.project||"Unknown Project",26);return`
        <li>
          <span title="${c(t.project||"Unknown Project")}">${c(d)}</span>
          <strong>${t.total}</strong>
        </li>
      `}).join(""),ht=((n==null?void 0:n.resumeVersions)||[]).map(t=>{const d=T(t.version||"unknown-resume",28);return`<li><span title="${c(t.version||"unknown-resume")}">${c(d)}</span><strong>${t.total}</strong></li>`}).join(""),mt=((n==null?void 0:n.topSections)||[]).map(t=>`<li><span>${c(t.section||"unknown")}</span><strong>${t.total}</strong></li>`).join(""),vt=a.records.map(t=>{const d=c(t.device_type||"-"),u=c(t.os_name||"Unknown"),D=c(t.browser_name||"-"),R=c(Tt(t)),bt=c(t.ip_address||"-"),X=xt(t.referrer);return`
        <tr>
          <td><input type="checkbox" class="event-check" value="${t.event_id}" /></td>
          <td><span class="cell-time">${c(wt(t.created_at))}</span></td>
          <td><span class="mono-cell">${bt}</span></td>
          <td><span class="truncate-cell" title="${R}">${R}</span></td>
          <td>
            <span class="device-stack">
              <span class="device-topline">${tt(t.os_name)}<span class="truncate-cell" title="${u}">${u}</span></span>
              <span class="device-subline">${d}</span>
            </span>
          </td>
          <td><span class="truncate-cell" title="${D}">${D}</span></td>
          <td><span class="truncate-cell" title="${c(X.full)}">${c(X.short)}</span></td>
        </tr>
      `}).join(""),w=a.paging||{page:1,perPage:I,totalPages:1};V.innerHTML=`
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

      <section class="stats-grid totals-grid">
        <article class="stats-card">
          <h2>Resume Downloads (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${E.resumeDownloads||0}</p>
        </article>
        <article class="stats-card">
          <h2>Project Link Clicks (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${E.projectLinkClicks||0}</p>
        </article>
        <article class="stats-card">
          <h2>Section Views (${(n==null?void 0:n.days)||90}d)</h2>
          <p class="big-number">${E.sectionViews||0}</p>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${h.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${B(b)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${B(m)}</strong></div>
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
          ${r}
        </article>
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <button id="calendar-prev" class="refresh-button" type="button">Prev</button>
            <div class="calendar-title-wrap">
              <h2>${Lt(p)}</h2>
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
        <article class="stats-card compact-source-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${et||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card compact-source-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${ot||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card compact-source-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${at||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card mobile-overview-card">
          <h2>Traffic Snapshot</h2>
          <div class="mobile-overview-grid">
            <section>
              <h3>Countries</h3>
              <ul class="stats-list">${st||"<li><span>No data</span><strong>0</strong></li>"}</ul>
            </section>
            <section>
              <h3>Devices</h3>
              <ul class="stats-list">${it||"<li><span>No data</span><strong>0</strong></li>"}</ul>
            </section>
            <section>
              <h3>OS</h3>
              <ul class="stats-list">${nt||"<li><span>No data</span><strong>0</strong></li>"}</ul>
            </section>
          </div>
        </article>
        <article class="stats-card">
          <h2>Visits by Day (${s.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${lt||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${ct||"<p>No trend data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${pt||"<p>No device data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Interaction Types (${(n==null?void 0:n.days)||90}d)</h2>
          <ul class="stats-list">${ut||"<li><span>No interactions yet</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Top Clicked Projects</h2>
          <ul class="stats-list">${gt||"<li><span>No project clicks yet</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Resume Versions Downloaded</h2>
          <ul class="stats-list">${ht||"<li><span>No resume downloads yet</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Top Viewed Sections</h2>
          <ul class="stats-list">${mt||"<li><span>No section views yet</span><strong>0</strong></li>"}</ul>
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
                ${[10,20,50,100].map(t=>`<option value="${t}" ${w.perPage===t?"selected":""}>${t}</option>`).join("")}
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
              <tbody>${vt||'<tr><td colspan="7">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(_=document.getElementById("logout-button"))==null||_.addEventListener("click",async()=>{A(),await v("/api/auth/logout",{method:"POST"}),C()}),(Y=document.getElementById("refresh-button"))==null||Y.addEventListener("click",()=>{f()}),(W=document.getElementById("prev-page-button"))==null||W.addEventListener("click",()=>{k>1&&(k-=1,f())}),(H=document.getElementById("next-page-button"))==null||H.addEventListener("click",()=>{k<w.totalPages&&(k+=1,f())}),(G=document.getElementById("per-page-select"))==null||G.addEventListener("change",t=>{const d=Number.parseInt(t.target.value,10);Number.isFinite(d)&&(I=d,k=1,f())}),(J=document.getElementById("period-select"))==null||J.addEventListener("change",t=>{x=String(t.target.value||"week"),N(e,s,a,o,n)}),(z=document.getElementById("calendar-prev"))==null||z.addEventListener("click",()=>{$=new Date($.getFullYear(),$.getMonth()-1,1),N(e,s,a,o,n)}),(K=document.getElementById("calendar-next"))==null||K.addEventListener("click",()=>{$=new Date($.getFullYear(),$.getMonth()+1,1),N(e,s,a,o,n)}),(Q=document.getElementById("delete-selected-button"))==null||Q.addEventListener("click",async()=>{const t=Array.from(document.querySelectorAll(".event-check:checked")).map(u=>Number.parseInt(u.value,10)).filter(u=>Number.isInteger(u)&&u>0);if(!(t.length===0||!window.confirm(`Delete ${t.length} selected visit row(s)?`)))try{await v("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:t})}),await f()}catch(u){window.alert(u.message||"Failed to delete selected rows.")}})}let S=null,k=1,I=20,x="week",$=new Date(new Date().getFullYear(),new Date().getMonth(),1);function A(){S&&(clearInterval(S),S=null)}async function f(){var e;try{const[s,a,o,n,i]=await Promise.all([v("/api/stats/summary"),v("/api/stats/daily?days=30"),v(`/api/stats/recent?page=${k}&perPage=${I}`),v("/api/stats/daily?days=365"),v("/api/stats/interactions?days=90")]);(e=o==null?void 0:o.paging)!=null&&e.page&&(k=o.paging.page),N(s,a,o,n,i)}catch(s){A(),C(s.message)}}async function Et(){V.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await v("/api/auth/me"),await f(),A(),S=setInterval(f,60*1e3)}catch{C()}}Et();
