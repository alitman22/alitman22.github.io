import"./modulepreload-polyfill-B5Qt9EMX.js";const q=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,A=document.getElementById("stats-root"),M="https://alitman22-portfolio.onrender.com".replace(/\/$/,""),r={rangeDays:30,page:1,perPage:20,filters:{eventType:"all",country:"all",query:""},data:null,selectedEventIds:new Set,refreshTimer:null};function U(t){return`${M}${t}`}async function $(t,e={}){const n=await fetch(U(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),o=await n.text(),s=o?JSON.parse(o):{};if(!n.ok)throw new Error((s==null?void 0:s.message)||`Request failed: ${n.status}`);return s}function p(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function w(t,e=0){return(Number(t)||0).toLocaleString(void 0,{maximumFractionDigits:e,minimumFractionDigits:e})}function D(t,e=1){return`${(Number(t)||0).toFixed(e)}%`}const O={turkiye:"TR",turkey:"TR","united states":"US",usa:"US",germany:"DE",netherlands:"NL",iran:"IR",russia:"RU",lithuania:"LT","united kingdom":"GB",uk:"GB",france:"FR",spain:"ES",italy:"IT",canada:"CA",unknown:""};function F(t){const e=String(t||"").trim().toLowerCase(),n=O[e]||"";return!n||n.length!==2?"":n.toUpperCase().split("").map(o=>String.fromCodePoint(127397+o.charCodeAt(0))).join("")}function j(t){const e=String(t||"Unknown"),n=F(e);return n?`${n} ${e}`:e}function V(t){const e=String(t||"").toLowerCase();return e.includes("windows")?"🪟":e.includes("android")?"🤖":e.includes("ios")||e.includes("mac")?"🍎":e.includes("linux")?"🐧":"💻"}function H(t){const e=String(t||"").toLowerCase();return e.includes("mobile")?"📱":e.includes("tablet")?"📲":e.includes("desktop")?"🖥️":"🧩"}function G(t){const e=j(t.country||"Unknown"),n=String(t.region||"").trim(),o=String(t.city||"").trim();return n&&o&&n.toLowerCase()!==o.toLowerCase()?`${e} / ${n} (${o})`:n?`${e} / ${n}`:o?`${e} / ${o}`:e}function J(t){return t>.01?"trend-up":t<-.01?"trend-down":"trend-flat"}function Y(t){const e=Array.isArray(t)?t.map(d=>Number(d)||0):[];if(e.length===0)return"";const n=120,o=36,s=4,c=Math.min(...e),h=Math.max(...e)-c||1,l=(n-s*2)/Math.max(e.length-1,1),u=e.map((d,m)=>{const y=s+l*m,b=o-s-(d-c)/h*(o-s*2);return`${y},${b}`}).join(" ");return`
    <svg viewBox="0 0 ${n} ${o}" class="sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${u}" class="sparkline-line"></polyline>
    </svg>
  `}function P(t,e,n){if(!Array.isArray(t)||t.length===0)return'<p class="empty">No data</p>';const o=760,s=220,c=36,i=20,h=o-c*2,l=s-i*2,u=t.flatMap(f=>n.map(g=>Number(f[g])||0)),d=Math.max(1,...u),m=h/Math.max(t.length-1,1),y=n.map((f,g)=>{const S=g===0?"chart-line-a":g===1?"chart-line-b":"chart-line-c";return`<polyline points="${t.map((I,a)=>{const k=c+a*m,C=s-i-(Number(I[f])||0)/d*l;return`${k},${C}`}).join(" ")}" class="${S}" />`}).join(""),b=t.filter((f,g)=>g===0||g===t.length-1||g%Math.ceil(t.length/4)===0).map((f,g)=>{const S=c+g*(h/Math.max(Math.ceil(t.length/4),1)),x=String(f[e]||"").slice(5);return`<text x="${S}" y="${s-4}" class="chart-x-label">${p(x)}</text>`}).join("");return`
    <svg viewBox="0 0 ${o} ${s}" class="chart-svg" preserveAspectRatio="none">
      <line x1="${c}" y1="${s-i}" x2="${o-c}" y2="${s-i}" class="chart-axis" />
      <line x1="${c}" y1="${i}" x2="${c}" y2="${s-i}" class="chart-axis" />
      ${y}
      ${b}
    </svg>
  `}function N(t,e,n,o=!1){const s=Array.isArray(t)?t:[];if(s.length===0)return'<p class="empty">No data</p>';const c=Math.max(1,...s.map(i=>Number(i[n])||0));return s.map(i=>{const h=Number(i[n])||0,l=Math.max(3,Math.round(h/c*100));return`
      <div class="bar-row">
        <span>${p(i[e])}</span>
        <div class="bar-track"><div class="bar-fill ${o?"bar-danger":""}" style="width:${l}%"></div></div>
        <strong>${w(h)}</strong>
      </div>
    `}).join("")}function T(t,e,n){const o=Array.isArray(t)?t:[],s=o.reduce((u,d)=>u+(Number(d[n])||0),0);if(!s)return'<p class="empty">No data</p>';let c=0;const i=["#2dd98a","#28b4ff","#f5b84a","#9b7cff","#f56f7f"],h=o.map((u,d)=>{const y=(Number(u[n])||0)/s*100,b=`<circle r="44" cx="60" cy="60" stroke="${i[d%i.length]}" stroke-dasharray="${y} ${100-y}" stroke-dashoffset="${-c}" />`;return c+=y,b}).join(""),l=o.map((u,d)=>{const y=(Number(u[n])||0)/s*100;return`<li><span><i style="background:${i[d%i.length]}"></i>${p(u[e])}</span><strong>${D(y,1)}</strong></li>`}).join("");return`
    <div class="donut-wrap">
      <svg viewBox="0 0 120 120" class="donut-svg">
        <g transform="rotate(-90 60 60)">
          ${h}
        </g>
        <text x="60" y="58" text-anchor="middle" class="donut-total">${w(s)}</text>
        <text x="60" y="73" text-anchor="middle" class="donut-sub">visitors</text>
      </svg>
      <ul class="legend-list">${l}</ul>
    </div>
  `}function R(t=""){var e;A.innerHTML=`
    <main class="analytics-shell auth-shell">
      <section class="panel auth-panel">
        <img src="${q}" alt="Portfolio Analytics" class="auth-logo" />
        <h1>Portfolio Analytics</h1>
        <p>Sign in to access the insight dashboard.</p>
        <form id="login-form" class="auth-form">
          <label>Username<input name="username" type="text" required autocomplete="username" /></label>
          <label>Password<input name="password" type="password" required autocomplete="current-password" /></label>
          <label>2FA Code (optional)<input name="totpCode" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="8" /></label>
          <button type="submit">Sign in</button>
          <p class="error">${p(t)}</p>
        </form>
      </section>
    </main>
  `,(e=document.getElementById("login-form"))==null||e.addEventListener("submit",async n=>{n.preventDefault();const o=new FormData(n.currentTarget);try{await $("/api/auth/login",{method:"POST",body:JSON.stringify({username:String(o.get("username")||""),password:String(o.get("password")||""),totpCode:String(o.get("totpCode")||"").trim()})}),await v(),_()}catch(s){R(s.message)}})}function E(t,e,n="",o=""){const s=Number(e==null?void 0:e.changePct)||0,c=Number(e==null?void 0:e.value)||0;return`
    <article class="kpi-card">
      <header>
        <h3>${p(t)}${o?` <span class="kpi-help" title="${p(o)}">?</span>`:""}</h3>
        <span class="kpi-trend ${J(s)}">${s>=0?"+":""}${s.toFixed(1)}%</span>
      </header>
      <p class="kpi-value">${w(c,n==="%"?1:0)}${n}</p>
      ${Y((e==null?void 0:e.sparkline)||[])}
    </article>
  `}function Q(t){var b,f,g,S,x,I;const{summary:e,sources:n,funnel:o,conversions:s,recent:c}=t,i=e.kpis||{},h=c.records||[],l=c.paging||{page:1,totalPages:1,total:0},u=["all","page_view","scroll","section_view","project_click","resume_download","contact_click","outbound_click"],d=["all",...new Set([...(((b=e.segmentation)==null?void 0:b.byCountry)||[]).map(a=>a.country)])].slice(0,30),m=(o.funnel||[]).map(a=>({step:a.step,dropOff:a.dropOffPct})),y=h.map(a=>{const k=new Date(a.created_at).toLocaleString(),C=G(a),B=r.selectedEventIds.has(Number(a.event_id));return`
      <tr>
        <td><input type="checkbox" class="event-select" value="${Number(a.event_id)||0}" ${B?"checked":""} /></td>
        <td>${p(k)}</td>
        <td>${p(a.ip_address||"-")}</td>
        <td>${p(C)}</td>
        <td><span class="metric-icon" title="${p(a.device_type||"-")}" aria-hidden="true">${H(a.device_type)}</span> ${p(a.device_type||"-")}</td>
        <td><span class="metric-icon" title="${p(a.os_name||"-")}" aria-hidden="true">${V(a.os_name)}</span> ${p(a.os_name||"-")}</td>
        <td>${p(a.event_type||"-")}</td>
        <td>${p(a.referrer||"-")}</td>
      </tr>
    `}).join("");A.innerHTML=`
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
              <option value="14" ${r.rangeDays===14?"selected":""}>14d</option>
              <option value="30" ${r.rangeDays===30?"selected":""}>30d</option>
              <option value="60" ${r.rangeDays===60?"selected":""}>60d</option>
              <option value="90" ${r.rangeDays===90?"selected":""}>90d</option>
            </select>
          </label>
          <button id="refresh-btn" type="button">Refresh</button>
          <button id="logout-btn" type="button" class="danger">Logout</button>
        </div>
      </header>

      <section class="kpi-row">
        ${E("Unique Visitors",i.uniqueVisitors,"","Count of distinct anonymous users in selected period.")}
        ${E("Conversion Rate",i.conversionRate,"%","Ratio of resume downloads + project clicks to unique visitors.")}
        ${E("Resume Downloads",i.resumeDownloads,"","How many resume download events happened in selected period.")}
        ${E("Project Clicks",i.projectClicks,"","How many outbound project link clicks happened in selected period.")}
        ${E("Engagement Score",i.engagementScore,"","Composite signal from scroll depth and interactions per user.")}
        ${E("Avg Scroll Depth",i.avgScrollDepth,"%","Average maximum scroll depth reached by users.")}
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Acquisition Sources</h2>
          ${T(n.chart||[],"source","visitors")}
        </article>
        <article class="panel">
          <h2>Source Quality</h2>
          <table class="data-table">
            <thead><tr><th>Source</th><th>Visitors</th><th>Conv%</th><th>Avg Engagement</th></tr></thead>
            <tbody>
              ${(n.table||[]).map(a=>`
                <tr>
                  <td>${p(a.source)}</td>
                  <td>${w(a.visitors)}</td>
                  <td>${D(a.conversionRate,1)}</td>
                  <td>${w(a.avgEngagement,1)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>

      <section class="grid three">
        <article class="panel">
          <h2>Scroll Funnel</h2>
          <div class="bar-stack">${N(m,"step","dropOff",!0)}</div>
        </article>
        <article class="panel">
          <h2>Section Engagement</h2>
          <div class="bar-stack">${N(o.sectionEngagement||[],"section","interactions")}</div>
        </article>
        <article class="panel">
          <h2>Scroll Depth Distribution</h2>
          ${P((s.scrollDistribution||[]).map(a=>({day:`${a.depth}%`,users:a.users})),"day",["users"])}
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Conversion Trend</h2>
          ${P(s.trend||[],"day",["resumeDownloads","projectClicks"])}
          <div class="chart-legend">
            <span><i class="legend-a"></i> Resume Downloads</span>
            <span><i class="legend-b"></i> Project Clicks</span>
          </div>
        </article>
        <article class="panel">
          <h2>Conversion by Device</h2>
          <div class="bar-stack">${N(s.byDevice||[],"segment","conversionRate")}</div>
          <h3>Conversion by Country</h3>
          <div class="bar-stack">${N((s.byCountry||[]).slice(0,8),"segment","conversionRate")}</div>
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>New vs Returning Users</h2>
          ${T([{label:"New",value:((g=(f=e.segmentation)==null?void 0:f.newVsReturning)==null?void 0:g.newUsers)||0},{label:"Returning",value:((x=(S=e.segmentation)==null?void 0:S.newVsReturning)==null?void 0:x.returningUsers)||0}],"label","value")}
          <p class="hint">Returning user ratio: ${D(((I=e.derived)==null?void 0:I.returningUserRatio)||0,1)}</p>
        </article>
        <article class="panel">
          <h2>Geo Distribution</h2>
          <table class="data-table">
            <thead><tr><th>Country</th><th>Visitors</th><th>Conv%</th></tr></thead>
            <tbody>
              ${(s.byCountry||[]).map(a=>`
                <tr>
                  <td>${p(j(a.segment))}</td>
                  <td>${w(a.visitors)}</td>
                  <td>${D(a.conversionRate,1)}</td>
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
              ${u.map(a=>`<option value="${a}" ${r.filters.eventType===a?"selected":""}>${a}</option>`).join("")}
            </select>
            <select id="filter-country">
              ${d.map(a=>`<option value="${p(a)}" ${r.filters.country===a?"selected":""}>${p(a)}</option>`).join("")}
            </select>
            <input id="filter-query" type="search" placeholder="Search path / referrer / event" value="${p(r.filters.query)}" />
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
          <tbody>${y||'<tr><td colspan="8">No events</td></tr>'}</tbody>
        </table>

        <div class="pager">
          <button id="prev-page" ${l.page<=1?"disabled":""}>Prev</button>
          <span>Page ${l.page} / ${l.totalPages} (${w(l.total)} events)</span>
          <button id="next-page" ${l.page>=l.totalPages?"disabled":""}>Next</button>
        </div>
      </section>

      <section class="panel">
        <h2>Automated Insights</h2>
        <ul class="insights">
          ${(e.insights||[]).map(a=>`<li>${p(a)}</li>`).join("")||"<li>No critical anomalies for this period.</li>"}
          ${(()=>{const k=(o.funnel||[]).find(C=>C.step==="Projects");return k&&k.dropOffPct>=50?`<li>High funnel leakage: ${D(k.dropOffPct,1)} drop-off before Projects.</li>`:""})()}
        </ul>
      </section>
    </main>
  `,W()}function W(){var t,e,n,o,s,c,i,h;(t=document.getElementById("refresh-btn"))==null||t.addEventListener("click",v),(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",async()=>{L(),await $("/api/auth/logout",{method:"POST"}),R()}),(n=document.getElementById("range-days"))==null||n.addEventListener("change",l=>{r.rangeDays=Number.parseInt(l.target.value,10)||30,r.page=1,v()}),(o=document.getElementById("apply-filters"))==null||o.addEventListener("click",()=>{var l,u,d;r.filters.eventType=((l=document.getElementById("filter-event-type"))==null?void 0:l.value)||"all",r.filters.country=((u=document.getElementById("filter-country"))==null?void 0:u.value)||"all",r.filters.query=((d=document.getElementById("filter-query"))==null?void 0:d.value)||"",r.page=1,v()}),document.querySelectorAll(".event-select").forEach(l=>{l.addEventListener("change",u=>{const d=Number.parseInt(u.target.value,10);Number.isFinite(d)&&(u.target.checked?r.selectedEventIds.add(d):r.selectedEventIds.delete(d))})}),(s=document.getElementById("select-all-events"))==null||s.addEventListener("change",l=>{const u=!!l.target.checked;document.querySelectorAll(".event-select").forEach(d=>{d.checked=u;const m=Number.parseInt(d.value,10);Number.isFinite(m)&&(u?r.selectedEventIds.add(m):r.selectedEventIds.delete(m))})}),(c=document.getElementById("delete-selected"))==null||c.addEventListener("click",async()=>{const l=Array.from(r.selectedEventIds.values());if(!(l.length===0||!window.confirm(`Delete ${l.length} selected record(s)?`)))try{await $("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:l})}),r.selectedEventIds.clear(),await v()}catch(d){window.alert(d.message||"Delete failed")}}),(i=document.getElementById("prev-page"))==null||i.addEventListener("click",()=>{r.page>1&&(r.page-=1,v())}),(h=document.getElementById("next-page"))==null||h.addEventListener("click",()=>{r.page+=1,v()})}async function v(){try{const t=new Set(r.selectedEventIds),e=new URLSearchParams({days:String(r.rangeDays),page:String(r.page),perPage:String(r.perPage),eventType:r.filters.eventType,country:r.filters.country,search:r.filters.query}),[n,o,s,c,i]=await Promise.all([$(`/api/stats/summary?days=${r.rangeDays}`),$(`/api/stats/sources?days=${r.rangeDays}`),$(`/api/stats/funnel?days=${r.rangeDays}`),$(`/api/stats/conversions?days=${r.rangeDays}`),$(`/api/stats/recent?${e.toString()}`)]);r.data={summary:n,sources:o,funnel:s,conversions:c,recent:i},r.selectedEventIds=new Set((i.records||[]).map(h=>Number.parseInt(String(h.event_id),10)).filter(h=>Number.isFinite(h)&&t.has(h))),Q(r.data)}catch(t){L(),R(t.message)}}function _(){L(),r.refreshTimer=setInterval(()=>{v().catch(()=>{})},60*1e3)}function L(){r.refreshTimer&&(clearInterval(r.refreshTimer),r.refreshTimer=null)}async function X(){A.innerHTML='<main class="analytics-shell"><section class="panel"><p>Loading analytics dashboard...</p></section></main>';try{await $("/api/auth/me"),await v(),_()}catch{R()}}X();
