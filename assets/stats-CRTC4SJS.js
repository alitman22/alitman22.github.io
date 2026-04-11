import"./modulepreload-polyfill-B5Qt9EMX.js";const B=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,R=document.getElementById("stats-root"),M="https://alitman22-portfolio.onrender.com".replace(/\/$/,""),s={rangeDays:30,page:1,perPage:20,filters:{eventType:"all",country:"all",query:""},data:null,selectedEventIds:new Set,refreshTimer:null};function _(e){return`${M}${e}`}async function b(e,t={}){const r=await fetch(_(e),{credentials:"include",headers:{"Content-Type":"application/json",...t.headers||{}},...t}),o=await r.text(),n=o?JSON.parse(o):{};if(!r.ok)throw new Error((n==null?void 0:n.message)||`Request failed: ${r.status}`);return n}function h(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function E(e,t=0){return(Number(e)||0).toLocaleString(void 0,{maximumFractionDigits:t,minimumFractionDigits:t})}function I(e,t=1){return`${(Number(e)||0).toFixed(t)}%`}function O(e){return e>.01?"trend-up":e<-.01?"trend-down":"trend-flat"}function F(e){const t=Array.isArray(e)?e.map(d=>Number(d)||0):[];if(t.length===0)return"";const r=120,o=36,n=4,c=Math.min(...t),p=Math.max(...t)-c||1,i=(r-n*2)/Math.max(t.length-1,1),u=t.map((d,m)=>{const v=n+i*m,$=o-n-(d-c)/p*(o-n*2);return`${v},${$}`}).join(" ");return`
    <svg viewBox="0 0 ${r} ${o}" class="sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${u}" class="sparkline-line"></polyline>
    </svg>
  `}function j(e,t,r){if(!Array.isArray(e)||e.length===0)return'<p class="empty">No data</p>';const o=760,n=220,c=36,l=20,p=o-c*2,i=n-l*2,u=e.flatMap(y=>r.map(g=>Number(y[g])||0)),d=Math.max(1,...u),m=p/Math.max(e.length-1,1),v=r.map((y,g)=>{const w=g===0?"chart-line-a":g===1?"chart-line-b":"chart-line-c";return`<polyline points="${e.map((N,a)=>{const k=c+a*m,D=n-l-(Number(N[y])||0)/d*i;return`${k},${D}`}).join(" ")}" class="${w}" />`}).join(""),$=e.filter((y,g)=>g===0||g===e.length-1||g%Math.ceil(e.length/4)===0).map((y,g)=>{const w=c+g*(p/Math.max(Math.ceil(e.length/4),1)),S=String(y[t]||"").slice(5);return`<text x="${w}" y="${n-4}" class="chart-x-label">${h(S)}</text>`}).join("");return`
    <svg viewBox="0 0 ${o} ${n}" class="chart-svg" preserveAspectRatio="none">
      <line x1="${c}" y1="${n-l}" x2="${o-c}" y2="${n-l}" class="chart-axis" />
      <line x1="${c}" y1="${l}" x2="${c}" y2="${n-l}" class="chart-axis" />
      ${v}
      ${$}
    </svg>
  `}function C(e,t,r,o=!1){const n=Array.isArray(e)?e:[];if(n.length===0)return'<p class="empty">No data</p>';const c=Math.max(1,...n.map(l=>Number(l[r])||0));return n.map(l=>{const p=Number(l[r])||0,i=Math.max(3,Math.round(p/c*100));return`
      <div class="bar-row">
        <span>${h(l[t])}</span>
        <div class="bar-track"><div class="bar-fill ${o?"bar-danger":""}" style="width:${i}%"></div></div>
        <strong>${E(p)}</strong>
      </div>
    `}).join("")}function L(e,t,r){const o=Array.isArray(e)?e:[],n=o.reduce((u,d)=>u+(Number(d[r])||0),0);if(!n)return'<p class="empty">No data</p>';let c=0;const l=["#2dd98a","#28b4ff","#f5b84a","#9b7cff","#f56f7f"],p=o.map((u,d)=>{const v=(Number(u[r])||0)/n*100,$=`<circle r="44" cx="60" cy="60" stroke="${l[d%l.length]}" stroke-dasharray="${v} ${100-v}" stroke-dashoffset="${-c}" />`;return c+=v,$}).join(""),i=o.map((u,d)=>{const v=(Number(u[r])||0)/n*100;return`<li><span><i style="background:${l[d%l.length]}"></i>${h(u[t])}</span><strong>${I(v,1)}</strong></li>`}).join("");return`
    <div class="donut-wrap">
      <svg viewBox="0 0 120 120" class="donut-svg">
        <g transform="rotate(-90 60 60)">
          ${p}
        </g>
        <text x="60" y="58" text-anchor="middle" class="donut-total">${E(n)}</text>
        <text x="60" y="73" text-anchor="middle" class="donut-sub">visitors</text>
      </svg>
      <ul class="legend-list">${i}</ul>
    </div>
  `}function A(e=""){var t;R.innerHTML=`
    <main class="analytics-shell auth-shell">
      <section class="panel auth-panel">
        <img src="${B}" alt="Portfolio Analytics" class="auth-logo" />
        <h1>Portfolio Analytics</h1>
        <p>Sign in to access the insight dashboard.</p>
        <form id="login-form" class="auth-form">
          <label>Username<input name="username" type="text" required autocomplete="username" /></label>
          <label>Password<input name="password" type="password" required autocomplete="current-password" /></label>
          <label>2FA Code (optional)<input name="totpCode" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="8" /></label>
          <button type="submit">Sign in</button>
          <p class="error">${h(e)}</p>
        </form>
      </section>
    </main>
  `,(t=document.getElementById("login-form"))==null||t.addEventListener("submit",async r=>{r.preventDefault();const o=new FormData(r.currentTarget);try{await b("/api/auth/login",{method:"POST",body:JSON.stringify({username:String(o.get("username")||""),password:String(o.get("password")||""),totpCode:String(o.get("totpCode")||"").trim()})}),await f(),T()}catch(n){A(n.message)}})}function x(e,t,r="",o=""){const n=Number(t==null?void 0:t.changePct)||0,c=Number(t==null?void 0:t.value)||0;return`
    <article class="kpi-card">
      <header>
        <h3>${h(e)}${o?` <span class="kpi-help" title="${h(o)}">?</span>`:""}</h3>
        <span class="kpi-trend ${O(n)}">${n>=0?"+":""}${n.toFixed(1)}%</span>
      </header>
      <p class="kpi-value">${E(c,r==="%"?1:0)}${r}</p>
      ${F((t==null?void 0:t.sparkline)||[])}
    </article>
  `}function V(e){var $,y,g,w,S,N;const{summary:t,sources:r,funnel:o,conversions:n,recent:c}=e,l=t.kpis||{},p=c.records||[],i=c.paging||{page:1,totalPages:1,total:0},u=["all","page_view","scroll","section_view","project_click","resume_download","contact_click","outbound_click"],d=["all",...new Set([...((($=t.segmentation)==null?void 0:$.byCountry)||[]).map(a=>a.country)])].slice(0,30),m=(o.funnel||[]).map(a=>({step:a.step,dropOff:a.dropOffPct})),v=p.map(a=>{const k=new Date(a.created_at).toLocaleString(),D=`${a.country||"Unknown"}${a.city?` / ${a.city}`:""}`,q=s.selectedEventIds.has(Number(a.event_id));return`
      <tr>
        <td><input type="checkbox" class="event-select" value="${Number(a.event_id)||0}" ${q?"checked":""} /></td>
        <td>${h(k)}</td>
        <td>${h(a.ip_address||"-")}</td>
        <td>${h(D)}</td>
        <td>${h(a.device_type||"-")}</td>
        <td>${h(a.os_name||"-")}</td>
        <td>${h(a.event_type||"-")}</td>
        <td>${h(a.referrer||"-")}</td>
      </tr>
    `}).join("");R.innerHTML=`
    <main class="analytics-shell">
      <header class="topbar">
        <div>
          <h1>Portfolio Analytics Intelligence</h1>
          <p>Decision-driven funnel, behavior, and conversion panel</p>
        </div>
        <div class="topbar-actions">
          <label>
            Period
            <select id="range-days">
              <option value="14" ${s.rangeDays===14?"selected":""}>14d</option>
              <option value="30" ${s.rangeDays===30?"selected":""}>30d</option>
              <option value="60" ${s.rangeDays===60?"selected":""}>60d</option>
              <option value="90" ${s.rangeDays===90?"selected":""}>90d</option>
            </select>
          </label>
          <button id="refresh-btn" type="button">Refresh</button>
          <button id="logout-btn" type="button" class="danger">Logout</button>
        </div>
      </header>

      <section class="kpi-row">
        ${x("Unique Visitors",l.uniqueVisitors,"","Count of distinct anonymous users in selected period.")}
        ${x("Conversion Rate",l.conversionRate,"%","Ratio of resume downloads + project clicks to unique visitors.")}
        ${x("Resume Downloads",l.resumeDownloads,"","How many resume download events happened in selected period.")}
        ${x("Project Clicks",l.projectClicks,"","How many outbound project link clicks happened in selected period.")}
        ${x("Engagement Score",l.engagementScore,"","Composite signal from scroll depth and interactions per user.")}
        ${x("Avg Scroll Depth",l.avgScrollDepth,"%","Average maximum scroll depth reached by users.")}
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Acquisition Sources</h2>
          ${L(r.chart||[],"source","visitors")}
        </article>
        <article class="panel">
          <h2>Source Quality</h2>
          <table class="data-table">
            <thead><tr><th>Source</th><th>Visitors</th><th>Conv%</th><th>Avg Engagement</th></tr></thead>
            <tbody>
              ${(r.table||[]).map(a=>`
                <tr>
                  <td>${h(a.source)}</td>
                  <td>${E(a.visitors)}</td>
                  <td>${I(a.conversionRate,1)}</td>
                  <td>${E(a.avgEngagement,1)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>

      <section class="grid three">
        <article class="panel">
          <h2>Scroll Funnel</h2>
          <div class="bar-stack">${C(m,"step","dropOff",!0)}</div>
        </article>
        <article class="panel">
          <h2>Section Engagement</h2>
          <div class="bar-stack">${C(o.sectionEngagement||[],"section","interactions")}</div>
        </article>
        <article class="panel">
          <h2>Scroll Depth Distribution</h2>
          ${j((n.scrollDistribution||[]).map(a=>({day:`${a.depth}%`,users:a.users})),"day",["users"])}
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Conversion Trend</h2>
          ${j(n.trend||[],"day",["resumeDownloads","projectClicks"])}
          <div class="chart-legend">
            <span><i class="legend-a"></i> Resume Downloads</span>
            <span><i class="legend-b"></i> Project Clicks</span>
          </div>
        </article>
        <article class="panel">
          <h2>Conversion by Device</h2>
          <div class="bar-stack">${C(n.byDevice||[],"segment","conversionRate")}</div>
          <h3>Conversion by Country</h3>
          <div class="bar-stack">${C((n.byCountry||[]).slice(0,8),"segment","conversionRate")}</div>
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>New vs Returning Users</h2>
          ${L([{label:"New",value:((g=(y=t.segmentation)==null?void 0:y.newVsReturning)==null?void 0:g.newUsers)||0},{label:"Returning",value:((S=(w=t.segmentation)==null?void 0:w.newVsReturning)==null?void 0:S.returningUsers)||0}],"label","value")}
          <p class="hint">Returning user ratio: ${I(((N=t.derived)==null?void 0:N.returningUserRatio)||0,1)}</p>
        </article>
        <article class="panel">
          <h2>Geo Distribution</h2>
          <table class="data-table">
            <thead><tr><th>Country</th><th>Visitors</th><th>Conv%</th></tr></thead>
            <tbody>
              ${(n.byCountry||[]).map(a=>`
                <tr>
                  <td>${h(a.segment)}</td>
                  <td>${E(a.visitors)}</td>
                  <td>${I(a.conversionRate,1)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>

      <section class="panel">
        <div class="panel-head">
          <h2>Event Log (Developer View)</h2>
          <div class="filter-row">
            <label class="event-select-all"><input id="select-all-events" type="checkbox" /> Select page</label>
            <select id="filter-event-type">
              ${u.map(a=>`<option value="${a}" ${s.filters.eventType===a?"selected":""}>${a}</option>`).join("")}
            </select>
            <select id="filter-country">
              ${d.map(a=>`<option value="${h(a)}" ${s.filters.country===a?"selected":""}>${h(a)}</option>`).join("")}
            </select>
            <input id="filter-query" type="search" placeholder="Search path / referrer / event" value="${h(s.filters.query)}" />
            <button id="delete-selected" type="button" class="danger">Delete Selected</button>
            <button id="apply-filters" type="button">Apply</button>
          </div>
        </div>

        <table class="data-table mono">
          <thead>
            <tr>
              <th>Select</th>
              <th>Timestamp</th>
              <th>IP</th>
              <th>Country / City</th>
              <th>Device</th>
              <th>OS</th>
              <th>Event Type</th>
              <th>Referrer</th>
            </tr>
          </thead>
          <tbody>${v||'<tr><td colspan="8">No events</td></tr>'}</tbody>
        </table>

        <div class="pager">
          <button id="prev-page" ${i.page<=1?"disabled":""}>Prev</button>
          <span>Page ${i.page} / ${i.totalPages} (${E(i.total)} events)</span>
          <button id="next-page" ${i.page>=i.totalPages?"disabled":""}>Next</button>
        </div>
      </section>

      <section class="panel">
        <h2>Automated Insights</h2>
        <ul class="insights">
          ${(t.insights||[]).map(a=>`<li>${h(a)}</li>`).join("")||"<li>No critical anomalies for this period.</li>"}
          ${(()=>{const k=(o.funnel||[]).find(D=>D.step==="Projects");return k&&k.dropOffPct>=50?`<li>High funnel leakage: ${I(k.dropOffPct,1)} drop-off before Projects.</li>`:""})()}
        </ul>
      </section>
    </main>
  `,U()}function U(){var e,t,r,o,n,c,l,p;(e=document.getElementById("refresh-btn"))==null||e.addEventListener("click",f),(t=document.getElementById("logout-btn"))==null||t.addEventListener("click",async()=>{P(),await b("/api/auth/logout",{method:"POST"}),A()}),(r=document.getElementById("range-days"))==null||r.addEventListener("change",i=>{s.rangeDays=Number.parseInt(i.target.value,10)||30,s.page=1,f()}),(o=document.getElementById("apply-filters"))==null||o.addEventListener("click",()=>{var i,u,d;s.filters.eventType=((i=document.getElementById("filter-event-type"))==null?void 0:i.value)||"all",s.filters.country=((u=document.getElementById("filter-country"))==null?void 0:u.value)||"all",s.filters.query=((d=document.getElementById("filter-query"))==null?void 0:d.value)||"",s.page=1,f()}),document.querySelectorAll(".event-select").forEach(i=>{i.addEventListener("change",u=>{const d=Number.parseInt(u.target.value,10);Number.isFinite(d)&&(u.target.checked?s.selectedEventIds.add(d):s.selectedEventIds.delete(d))})}),(n=document.getElementById("select-all-events"))==null||n.addEventListener("change",i=>{const u=!!i.target.checked;document.querySelectorAll(".event-select").forEach(d=>{d.checked=u;const m=Number.parseInt(d.value,10);Number.isFinite(m)&&(u?s.selectedEventIds.add(m):s.selectedEventIds.delete(m))})}),(c=document.getElementById("delete-selected"))==null||c.addEventListener("click",async()=>{const i=Array.from(s.selectedEventIds.values());if(!(i.length===0||!window.confirm(`Delete ${i.length} selected record(s)?`)))try{await b("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:i})}),s.selectedEventIds.clear(),await f()}catch(d){window.alert(d.message||"Delete failed")}}),(l=document.getElementById("prev-page"))==null||l.addEventListener("click",()=>{s.page>1&&(s.page-=1,f())}),(p=document.getElementById("next-page"))==null||p.addEventListener("click",()=>{s.page+=1,f()})}async function f(){try{const e=new Set(s.selectedEventIds),t=new URLSearchParams({days:String(s.rangeDays),page:String(s.page),perPage:String(s.perPage),eventType:s.filters.eventType,country:s.filters.country,search:s.filters.query}),[r,o,n,c,l]=await Promise.all([b(`/api/stats/summary?days=${s.rangeDays}`),b(`/api/stats/sources?days=${s.rangeDays}`),b(`/api/stats/funnel?days=${s.rangeDays}`),b(`/api/stats/conversions?days=${s.rangeDays}`),b(`/api/stats/recent?${t.toString()}`)]);s.data={summary:r,sources:o,funnel:n,conversions:c,recent:l},s.selectedEventIds=new Set((l.records||[]).map(p=>Number.parseInt(String(p.event_id),10)).filter(p=>Number.isFinite(p)&&e.has(p))),V(s.data)}catch(e){P(),A(e.message)}}function T(){P(),s.refreshTimer=setInterval(()=>{f().catch(()=>{})},60*1e3)}function P(){s.refreshTimer&&(clearInterval(s.refreshTimer),s.refreshTimer=null)}async function H(){R.innerHTML='<main class="analytics-shell"><section class="panel"><p>Loading analytics dashboard...</p></section></main>';try{await b("/api/auth/me"),await f(),T()}catch{A()}}H();
