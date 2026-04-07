import"./modulepreload-polyfill-B5Qt9EMX.js";const lt=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,P=document.getElementById("stats-root"),dt="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function pt(t){return`${dt}${t}`}async function v(t,e={}){const s=await fetch(pt(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),n=await s.text(),i=n?JSON.parse(n):{};if(!s.ok)throw new Error((i==null?void 0:i.message)||`Request failed: ${s.status}`);return i}function ut(t){if(!t)return"-";const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function T(t){return Number.isFinite(t)?`${Math.round(t)}%`:"0%"}function d(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function H(t,e=42){const s=String(t||"").trim();return s?s.length>e?`${s.slice(0,Math.max(0,e-1))}…`:s:"-"}function gt(t){const e=String(t||"").trim();if(!e)return{short:"-",full:"-"};try{const s=new URL(e),n=`${s.hostname}${s.pathname==="/"?"":s.pathname}`;return{short:H(n,34),full:e}}catch{return{short:H(e,34),full:e}}}function ht(t){return t.toISOString().slice(0,10)}function vt(t,e){const s=new Map((t||[]).map(o=>[String(o.day),Number(o.visits||0)])),n=[],i=new Date,r=new Date(Date.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()));for(let o=e-1;o>=0;o-=1){const p=new Date(r);p.setUTCDate(r.getUTCDate()-o);const u=ht(p);n.push({day:u,visits:s.get(u)||0})}return n}function mt(t){return(t||[]).reduce((e,s)=>e+Number(s.visits||0),0)}function bt(t,e,s){const n=[];let i=0;for(let r=0;r<t.length;r+=e){const o=t.slice(r,r+e);n.push({label:`${s}${i+1}`,visits:mt(o)}),i+=1}return n}function J(t,e){const s=new Map;for(const r of t){const o=String(r.day).slice(0,7);s.set(o,(s.get(o)||0)+Number(r.visits||0))}const n=new Date,i=[];for(let r=e-1;r>=0;r-=1){const o=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth()-r,1)),p=`${o.getUTCFullYear()}-${String(o.getUTCMonth()+1).padStart(2,"0")}`;i.push({label:p,visits:s.get(p)||0})}return i}function ft(t){const e=t.country||"-",s=t.region||null,n=t.city||null;return!t.country&&!s&&!n?"-":s?`${e} / ${s}`:n?`${e} / ${n}`:e}function yt(t){const e=String(t||"").toLowerCase();return e.includes("windows")?{label:"Windows",className:"os-win",icon:"windows"}:e.includes("linux")?{label:"Linux",className:"os-lnx",icon:"linux"}:e.includes("android")?{label:"Android",className:"os-and",icon:"android"}:e.includes("ios")?{label:"iOS",className:"os-ios",icon:"ios"}:e.includes("mac")?{label:"macOS",className:"os-mac",icon:"mac"}:{label:"Other OS",className:"os-generic",icon:"generic"}}function z(t){const e=yt(t);let s="";return e.icon==="windows"?s=`
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
      </svg>`,`<span class="os-badge ${e.className}" title="${d(e.label)}" aria-label="${d(e.label)}">${s}</span>`}function $t(t){return t.toLocaleString(void 0,{month:"long",year:"numeric"})}function wt(t,e){const s=t.getFullYear(),n=t.getMonth(),r=(new Date(s,n,1).getDay()+6)%7,o=new Date(s,n,1-r),p=[];for(let u=0;u<42;u+=1){const y=new Date(o);y.setDate(o.getDate()+u);const $=y.toISOString().slice(0,10),k=Number(e.get($)||0),w=y.getMonth()===n;p.push({dayNum:y.getDate(),iso:$,visits:k,inMonth:w})}return p}function Mt(t,e){return e==="day"?t.slice(-14).map(n=>({label:n.day.slice(5),visits:n.visits})):e==="week"?t.slice(-7).map(n=>({label:n.day.slice(5),visits:n.visits})):e==="month"?bt(t.slice(-30),6,"W"):e==="quarter"?J(t.slice(-90),3).map(s=>({label:s.label.slice(5),visits:s.visits})):J(t,12).map(s=>({label:s.label.slice(5),visits:s.visits}))}function xt(t){if(!t||t.length===0)return"<p>No data</p>";const e=Math.max(1,...t.map(s=>Number(s.visits||0)));return`
    <div class="period-bars-wrap">
      <div class="period-bars">
        ${t.map(s=>{const n=Number(s.visits||0),i=Math.max(10,Math.round(n/e*100));return`
              <div class="period-bar-wrap" title="${d(s.label)}: ${n}">
                <span class="period-bar-value">${n}</span>
                <div class="period-bar" style="height:${i}%"></div>
                <span class="period-bar-label">${d(s.label)}</span>
              </div>
            `}).join("")}
      </div>
    </div>
  `}function N(t=""){P.innerHTML=`
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
  `;const e=document.getElementById("login-form");e==null||e.addEventListener("submit",async s=>{s.preventDefault();const n=new FormData(e),i={username:String(n.get("username")||""),password:String(n.get("password")||""),totpCode:String(n.get("totpCode")||"").trim()};try{await v("/api/auth/login",{method:"POST",body:JSON.stringify(i)}),await h()}catch(r){N(r.message)}})}function x(t,e,s,n){var I,U,R,F,A,O,V,j,q,Y,_;const i=Number(t.totals.visits||0),r=Number(t.totals.visitors||0),o=Number(t.totals.pageviews||0),p=i>0?o/i:0,u=i>0?(i-r)/i*100:0,y=((U=(I=t.countries)==null?void 0:I[0])==null?void 0:U.total)||0,$=i>0?y/i*100:0,k=(t.countries||[]).filter(a=>a.label&&a.label!=="Unknown").length,w=vt(n.points||[],365),G=new Map(w.map(a=>[a.day,Number(a.visits||0)])),K=Mt(w,b),Q=xt(K),L=new Date(g.getFullYear(),g.getMonth(),1),X=wt(L,G).map(a=>{const c=Math.min(a.visits,10)/10,l=c>0?.16+c*.62:0,M=c>0?`rgba(45, 217, 138, ${l.toFixed(2)})`:"rgba(140, 160, 180, 0.18)";return`<button class="heat-cell-button${a.inMonth?"":" heat-cell-muted"}" style="background:${M}" title="${a.iso}: ${a.visits} visitors" type="button">${a.dayNum}<span class="heat-cell-count">${a.visits>0?a.visits:""}</span></button>`}).join(""),Z=t.countries.map(a=>`<li><span>${d(a.label||"Unknown")}</span><strong>${a.total}</strong></li>`).join(""),tt=t.operatingSystems.map(a=>`<li><span class="os-entry">${z(a.label)}<span>${d(a.label||"Unknown")}</span></span><strong>${a.total}</strong></li>`).join(""),et=t.devices.map(a=>`<li><span>${d(a.label||"Unknown")}</span><strong>${a.total}</strong></li>`).join(""),st=e.points.map(a=>`<tr><td>${a.day}</td><td>${a.visits}</td></tr>`).join(""),B=[...e.points].reverse(),at=Math.max(1,...B.map(a=>Number(a.visits||0))),nt=B.map(a=>{const c=Number(a.visits||0),l=Math.max(4,Math.round(c/at*100));return`
        <div class="bar-row">
          <span class="bar-label">${a.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${l}%"></div></div>
          <strong class="bar-value">${c}</strong>
        </div>
      `}).join(""),it=Math.max(1,(t.devices||[]).reduce((a,c)=>a+Number(c.total||0),0)),rt=(t.devices||[]).map(a=>{const c=Number(a.total||0)/it*100,l=Math.max(4,Math.round(c));return`
        <div class="bar-row">
          <span class="bar-label">${a.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${l}%"></div></div>
          <strong class="bar-value">${T(c)}</strong>
        </div>
      `}).join(""),ot=s.records.map(a=>{const c=d(a.device_type||"-"),l=d(a.os_name||"Unknown"),M=d(a.browser_name||"-"),S=d(ft(a)),ct=d(a.ip_address||"-"),W=gt(a.referrer);return`
        <tr>
          <td><input type="checkbox" class="event-check" value="${a.event_id}" /></td>
          <td><span class="cell-time">${d(ut(a.created_at))}</span></td>
          <td><span class="mono-cell">${ct}</span></td>
          <td><span class="truncate-cell" title="${S}">${S}</span></td>
          <td>
            <span class="device-stack">
              <span class="device-topline">${z(a.os_name)}<span class="truncate-cell" title="${l}">${l}</span></span>
              <span class="device-subline">${c}</span>
            </span>
          </td>
          <td><span class="truncate-cell" title="${M}">${M}</span></td>
          <td><span class="truncate-cell" title="${d(W.full)}">${d(W.short)}</span></td>
        </tr>
      `}).join(""),m=s.paging||{page:1,perPage:C,totalPages:1};P.innerHTML=`
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
        <article class="stats-card metrics-merged-card">
          <h2>Performance Insights</h2>
          <div class="metrics-merged-grid">
            <div class="metric-item"><span>Pages / Visit</span><strong>${p.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${T(u)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${T($)}</strong></div>
            <div class="metric-item"><span>Geo Coverage</span><strong>${k}</strong></div>
          </div>
        </article>
      </section>

      <section class="stats-grid focus-grid compact-focus-grid">
        <article class="stats-card period-card">
          <div class="period-header">
            <h2>Visitors Trend</h2>
            <select id="period-select" class="per-page-select">
              <option value="day" ${b==="day"?"selected":""}>Day</option>
              <option value="week" ${b==="week"?"selected":""}>Week</option>
              <option value="month" ${b==="month"?"selected":""}>Month</option>
              <option value="quarter" ${b==="quarter"?"selected":""}>Quarter</option>
              <option value="year" ${b==="year"?"selected":""}>Year</option>
            </select>
          </div>
          ${Q}
        </article>
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <button id="calendar-prev" class="refresh-button" type="button">Prev</button>
            <div class="calendar-title-wrap">
              <h2>${$t(L)}</h2>
              <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
            </div>
            <button id="calendar-next" class="refresh-button" type="button">Next</button>
          </div>
          <div class="calendar-weekdays">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="calendar-grid">${X}</div>
        </article>
      </section>

      <section class="stats-grid compact-analytics-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${Z||"<li><span>No data</span><strong>0</strong></li>"}</ul>
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
          <div class="bar-chart">${rt||"<p>No device data</p>"}</div>
        </article>
      </section>

      <section class="stats-grid compact-table-grid">
        <article class="stats-card">
          <div class="recent-events-header">
            <h2>Recent Events</h2>
            <div class="paging-controls">
              <button id="delete-selected-button" class="refresh-button danger-button" type="button">Delete Selected</button>
              <label for="per-page-select">Rows</label>
              <select id="per-page-select" class="per-page-select">
                ${[10,20,50,100].map(a=>`<option value="${a}" ${m.perPage===a?"selected":""}>${a}</option>`).join("")}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${m.page<=1?"disabled":""}>Prev</button>
              <span class="paging-meta">Page ${m.page} / ${m.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${m.page>=m.totalPages?"disabled":""}>Next</button>
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
              <tbody>${ot||'<tr><td colspan="7">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(R=document.getElementById("logout-button"))==null||R.addEventListener("click",async()=>{E(),await v("/api/auth/logout",{method:"POST"}),N()}),(F=document.getElementById("refresh-button"))==null||F.addEventListener("click",()=>{h()}),(A=document.getElementById("prev-page-button"))==null||A.addEventListener("click",()=>{f>1&&(f-=1,h())}),(O=document.getElementById("next-page-button"))==null||O.addEventListener("click",()=>{f<m.totalPages&&(f+=1,h())}),(V=document.getElementById("per-page-select"))==null||V.addEventListener("change",a=>{const c=Number.parseInt(a.target.value,10);Number.isFinite(c)&&(C=c,f=1,h())}),(j=document.getElementById("period-select"))==null||j.addEventListener("change",a=>{b=String(a.target.value||"week"),x(t,e,s,n)}),(q=document.getElementById("calendar-prev"))==null||q.addEventListener("click",()=>{g=new Date(g.getFullYear(),g.getMonth()-1,1),x(t,e,s,n)}),(Y=document.getElementById("calendar-next"))==null||Y.addEventListener("click",()=>{g=new Date(g.getFullYear(),g.getMonth()+1,1),x(t,e,s,n)}),(_=document.getElementById("delete-selected-button"))==null||_.addEventListener("click",async()=>{const a=Array.from(document.querySelectorAll(".event-check:checked")).map(l=>Number.parseInt(l.value,10)).filter(l=>Number.isInteger(l)&&l>0);if(!(a.length===0||!window.confirm(`Delete ${a.length} selected visit row(s)?`)))try{await v("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:a})}),await h()}catch(l){window.alert(l.message||"Failed to delete selected rows.")}})}let D=null,f=1,C=20,b="week",g=new Date(new Date().getFullYear(),new Date().getMonth(),1);function E(){D&&(clearInterval(D),D=null)}async function h(){var t;try{const[e,s,n,i]=await Promise.all([v("/api/stats/summary"),v("/api/stats/daily?days=30"),v(`/api/stats/recent?page=${f}&perPage=${C}`),v("/api/stats/daily?days=365")]);(t=n==null?void 0:n.paging)!=null&&t.page&&(f=n.paging.page),x(e,s,n,i)}catch(e){E(),N(e.message)}}async function Dt(){P.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await v("/api/auth/me"),await h(),E(),D=setInterval(h,60*1e3)}catch{N()}}Dt();
