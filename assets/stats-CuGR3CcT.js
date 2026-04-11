import"./modulepreload-polyfill-B5Qt9EMX.js";const H=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,L=document.getElementById("stats-root"),G="https://alitman22-portfolio.onrender.com".replace(/\/$/,""),r={rangeDays:30,page:1,perPage:20,compactEventTable:!0,filters:{eventType:"all",country:"all",query:""},data:null,selectedEventIds:new Set,refreshTimer:null};function J(t){return`${G}${t}`}async function b(t,e={}){const a=await fetch(J(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),n=await a.text(),s=n?JSON.parse(n):{};if(!a.ok)throw new Error((s==null?void 0:s.message)||`Request failed: ${a.status}`);return s}function g(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function E(t,e=0){return(Number(t)||0).toLocaleString(void 0,{maximumFractionDigits:e,minimumFractionDigits:e})}function x(t,e=1){return`${(Number(t)||0).toFixed(e)}%`}const Y={turkiye:"TR",turkey:"TR","united states":"US",usa:"US",germany:"DE",netherlands:"NL",iran:"IR",russia:"RU",lithuania:"LT","united kingdom":"GB",uk:"GB",france:"FR",spain:"ES",italy:"IT",canada:"CA",unknown:""};function Q(t){const e=String(t||"").trim().toLowerCase(),a=Y[e]||"";return!a||a.length!==2?"":a.toUpperCase().split("").map(n=>String.fromCodePoint(127397+n.charCodeAt(0))).join("")}function M(t){const e=String(t||"Unknown"),a=Q(e);return a?`${a} ${e}`:e}function W(t){const e=String(t||"").toLowerCase();return e.includes("windows")?"🪟":e.includes("android")?"🤖":e.includes("ios")||e.includes("mac")?"🍎":e.includes("linux")?"🐧":"💻"}function X(t){const e=String(t||"").toLowerCase();return e.includes("mobile")?"📱":e.includes("tablet")?"📲":e.includes("desktop")?"🖥️":"🧩"}function z(t){const e=M(t.country||"Unknown"),a=String(t.region||"").trim(),n=String(t.city||"").trim();return a&&n&&a.toLowerCase()!==n.toLowerCase()?`${e} / ${a} (${n})`:a?`${e} / ${a}`:n?`${e} / ${n}`:e}function A(t){return String(t||"").split(",").map(e=>Number.parseInt(e,10)).filter(e=>Number.isFinite(e))}function Z(t){const e=[],a=new Map;for(const n of t){const l=String(n.created_at||"").slice(0,16),c=String(n.session_id||n.ip_address||"unknown"),p=String(n.path||""),d=`${c}|${l}|${p}`;let i=a.get(d);i||(i={created_at:n.created_at,ip_address:n.ip_address,country:n.country,city:n.city,region:n.region,device_type:n.device_type,os_name:n.os_name,referrer:n.referrer,eventIds:[],eventCounts:new Map},a.set(d,i),e.push(i));const u=Number.parseInt(String(n.event_id),10);Number.isFinite(u)&&i.eventIds.push(u);const h=String(n.event_type||"unknown");i.eventCounts.set(h,(i.eventCounts.get(h)||0)+1)}return e.map(n=>{const s=Array.from(n.eventCounts.entries()).sort((d,i)=>i[1]-d[1]),l=s.reduce((d,[,i])=>d+i,0),c=s.slice(0,3).map(([d,i])=>i>1?`${d} x${i}`:d).join(", "),p=s.length>3?` +${s.length-3} more`:"";return{...n,eventCount:l,eventSummary:`${c}${p}`}})}function K(t){return t>.01?"trend-up":t<-.01?"trend-down":"trend-flat"}function ee(t){const e=Array.isArray(t)?t.map(u=>Number(u)||0):[];if(e.length===0)return"";const a=120,n=36,s=4,l=Math.min(...e),p=Math.max(...e)-l||1,d=(a-s*2)/Math.max(e.length-1,1),i=e.map((u,h)=>{const m=s+d*h,y=n-s-(u-l)/p*(n-s*2);return`${m},${y}`}).join(" ");return`
    <svg viewBox="0 0 ${a} ${n}" class="sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${i}" class="sparkline-line"></polyline>
    </svg>
  `}function P(t,e,a){if(!Array.isArray(t)||t.length===0)return'<p class="empty">No data</p>';const n=760,s=220,l=36,c=20,p=n-l*2,d=s-c*2,i=t.flatMap(f=>a.map(v=>Number(f[v])||0)),u=Math.max(1,...i),h=p/Math.max(t.length-1,1),m=a.map((f,v)=>{const S=v===0?"chart-line-a":v===1?"chart-line-b":"chart-line-c";return`<polyline points="${t.map((I,D)=>{const o=l+D*h,k=s-c-(Number(I[f])||0)/u*d;return`${o},${k}`}).join(" ")}" class="${S}" />`}).join(""),y=t.filter((f,v)=>v===0||v===t.length-1||v%Math.ceil(t.length/4)===0).map((f,v)=>{const S=l+v*(p/Math.max(Math.ceil(t.length/4),1)),C=String(f[e]||"").slice(5);return`<text x="${S}" y="${s-4}" class="chart-x-label">${g(C)}</text>`}).join("");return`
    <svg viewBox="0 0 ${n} ${s}" class="chart-svg" preserveAspectRatio="none">
      <line x1="${l}" y1="${s-c}" x2="${n-l}" y2="${s-c}" class="chart-axis" />
      <line x1="${l}" y1="${c}" x2="${l}" y2="${s-c}" class="chart-axis" />
      ${m}
      ${y}
    </svg>
  `}function R(t,e,a,n=!1){const s=Array.isArray(t)?t:[];if(s.length===0)return'<p class="empty">No data</p>';const l=Math.max(1,...s.map(c=>Number(c[a])||0));return s.map(c=>{const p=Number(c[a])||0,d=Math.max(3,Math.round(p/l*100));return`
      <div class="bar-row">
        <span>${g(c[e])}</span>
        <div class="bar-track"><div class="bar-fill ${n?"bar-danger":""}" style="width:${d}%"></div></div>
        <strong>${E(p)}</strong>
      </div>
    `}).join("")}function B(t,e,a){const n=Array.isArray(t)?t:[],s=n.reduce((i,u)=>i+(Number(u[a])||0),0);if(!s)return'<p class="empty">No data</p>';let l=0;const c=["#2dd98a","#28b4ff","#f5b84a","#9b7cff","#f56f7f"],p=n.map((i,u)=>{const m=(Number(i[a])||0)/s*100,y=`<circle r="44" cx="60" cy="60" stroke="${c[u%c.length]}" stroke-dasharray="${m} ${100-m}" stroke-dashoffset="${-l}" />`;return l+=m,y}).join(""),d=n.map((i,u)=>{const m=(Number(i[a])||0)/s*100;return`<li><span><i style="background:${c[u%c.length]}"></i>${g(i[e])}</span><strong>${x(m,1)}</strong></li>`}).join("");return`
    <div class="donut-wrap">
      <svg viewBox="0 0 120 120" class="donut-svg">
        <g transform="rotate(-90 60 60)">
          ${p}
        </g>
        <text x="60" y="58" text-anchor="middle" class="donut-total">${E(s)}</text>
        <text x="60" y="73" text-anchor="middle" class="donut-sub">visitors</text>
      </svg>
      <ul class="legend-list">${d}</ul>
    </div>
  `}function N(t=""){var e;L.innerHTML=`
    <main class="analytics-shell auth-shell">
      <section class="panel auth-panel">
        <img src="${H}" alt="Portfolio Analytics" class="auth-logo" />
        <h1>Portfolio Analytics</h1>
        <p>Sign in to access the insight dashboard.</p>
        <form id="login-form" class="auth-form">
          <label>Username<input name="username" type="text" required autocomplete="username" /></label>
          <label>Password<input name="password" type="password" required autocomplete="current-password" /></label>
          <label>2FA Code (optional)<input name="totpCode" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="8" /></label>
          <button type="submit">Sign in</button>
          <p class="error">${g(t)}</p>
        </form>
      </section>
    </main>
  `,(e=document.getElementById("login-form"))==null||e.addEventListener("submit",async a=>{a.preventDefault();const n=new FormData(a.currentTarget);try{await b("/api/auth/login",{method:"POST",body:JSON.stringify({username:String(n.get("username")||""),password:String(n.get("password")||""),totpCode:String(n.get("totpCode")||"").trim()})}),await $(),U()}catch(s){N(s.message)}})}function w(t,e,a="",n=""){const s=Number(e==null?void 0:e.changePct)||0,l=Number(e==null?void 0:e.value)||0;return`
    <article class="kpi-card">
      <header>
        <h3>${g(t)}${n?` <span class="kpi-help" title="${g(n)}">?</span>`:""}</h3>
        <span class="kpi-trend ${K(s)}">${s>=0?"+":""}${s.toFixed(1)}%</span>
      </header>
      <p class="kpi-value">${E(l,a==="%"?1:0)}${a}</p>
      ${ee((e==null?void 0:e.sparkline)||[])}
    </article>
  `}function q(t){var f,v,S,C,I,D;const{summary:e,sources:a,funnel:n,conversions:s,recent:l}=t,c=e.kpis||{},p=l.records||[],d=l.paging||{page:1,totalPages:1,total:0},i=["all","page_view","scroll","section_view","project_click","resume_download","contact_click","outbound_click"],u=["all",...new Set([...(((f=e.segmentation)==null?void 0:f.byCountry)||[]).map(o=>o.country)])].slice(0,30),h=(n.funnel||[]).map(o=>({step:o.step,dropOff:o.dropOffPct})),m=r.compactEventTable?Z(p):p,y=m.map(o=>{const k=new Date(o.created_at).toLocaleString(),T=z(o),_=r.compactEventTable?o.eventIds:A(String(Number.parseInt(String(o.event_id),10))),O=_.join(","),F=_.length>0&&_.every(V=>r.selectedEventIds.has(V));return`
      <tr>
        <td><input type="checkbox" class="event-select" value="${g(O)}" ${F?"checked":""} /></td>
        <td>${g(k)}</td>
        <td>${g(o.ip_address||"-")}</td>
        <td>${g(T)}</td>
        <td><span class="metric-icon" title="${g(o.device_type||"-")}" aria-hidden="true">${X(o.device_type)}</span> ${g(o.device_type||"-")}</td>
        <td><span class="metric-icon" title="${g(o.os_name||"-")}" aria-hidden="true">${W(o.os_name)}</span> ${g(o.os_name||"-")}</td>
        <td>${g(r.compactEventTable?`${o.eventSummary} (${o.eventCount})`:o.event_type||"-")}</td>
        <td>${g(o.referrer||"-")}</td>
      </tr>
    `}).join("");L.innerHTML=`
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
        ${w("Unique Visitors",c.uniqueVisitors,"","Count of distinct anonymous users in selected period.")}
        ${w("Conversion Rate",c.conversionRate,"%","Ratio of resume downloads + project clicks to unique visitors.")}
        ${w("Resume Downloads",c.resumeDownloads,"","How many resume download events happened in selected period.")}
        ${w("Project Clicks",c.projectClicks,"","How many outbound project link clicks happened in selected period.")}
        ${w("Engagement Score",c.engagementScore,"","Composite signal from scroll depth and interactions per user.")}
        ${w("Avg Scroll Depth",c.avgScrollDepth,"%","Average maximum scroll depth reached by users.")}
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Acquisition Sources</h2>
          ${B(a.chart||[],"source","visitors")}
        </article>
        <article class="panel">
          <h2>Source Quality</h2>
          <table class="data-table">
            <thead><tr><th>Source</th><th>Visitors</th><th>Conv%</th><th>Avg Engagement</th></tr></thead>
            <tbody>
              ${(a.table||[]).map(o=>`
                <tr>
                  <td>${g(o.source)}</td>
                  <td>${E(o.visitors)}</td>
                  <td>${x(o.conversionRate,1)}</td>
                  <td>${E(o.avgEngagement,1)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>

      <section class="grid three">
        <article class="panel">
          <h2>Scroll Funnel</h2>
          <div class="bar-stack">${R(h,"step","dropOff",!0)}</div>
        </article>
        <article class="panel">
          <h2>Section Engagement</h2>
          <div class="bar-stack">${R(n.sectionEngagement||[],"section","interactions")}</div>
        </article>
        <article class="panel">
          <h2>Scroll Depth Distribution</h2>
          ${P((s.scrollDistribution||[]).map(o=>({day:`${o.depth}%`,users:o.users})),"day",["users"])}
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
          <div class="bar-stack">${R(s.byDevice||[],"segment","conversionRate")}</div>
          <h3>Conversion by Country</h3>
          <div class="bar-stack">${R((s.byCountry||[]).slice(0,8),"segment","conversionRate")}</div>
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>New vs Returning Users</h2>
          ${B([{label:"New",value:((S=(v=e.segmentation)==null?void 0:v.newVsReturning)==null?void 0:S.newUsers)||0},{label:"Returning",value:((I=(C=e.segmentation)==null?void 0:C.newVsReturning)==null?void 0:I.returningUsers)||0}],"label","value")}
          <p class="hint">Returning user ratio: ${x(((D=e.derived)==null?void 0:D.returningUserRatio)||0,1)}</p>
        </article>
        <article class="panel">
          <h2>Geo Distribution</h2>
          <table class="data-table">
            <thead><tr><th>Country</th><th>Visitors</th><th>Conv%</th></tr></thead>
            <tbody>
              ${(s.byCountry||[]).map(o=>`
                <tr>
                  <td>${g(M(o.segment))}</td>
                  <td>${E(o.visitors)}</td>
                  <td>${x(o.conversionRate,1)}</td>
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
              ${i.map(o=>`<option value="${o}" ${r.filters.eventType===o?"selected":""}>${o}</option>`).join("")}
            </select>
            <select id="filter-country">
              ${u.map(o=>`<option value="${g(o)}" ${r.filters.country===o?"selected":""}>${g(o)}</option>`).join("")}
            </select>
            <input id="filter-query" type="search" placeholder="Search path / referrer / event" value="${g(r.filters.query)}" />
            <label class="event-select-all"><input id="compact-view" type="checkbox" ${r.compactEventTable?"checked":""} /> Compact</label>
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
          <button id="prev-page" ${d.page<=1?"disabled":""}>Prev</button>
          <span>Page ${d.page} / ${d.totalPages} (${E(d.total)} events${r.compactEventTable?`, ${E(m.length)} compact rows`:""})</span>
          <button id="next-page" ${d.page>=d.totalPages?"disabled":""}>Next</button>
        </div>
      </section>

      <section class="panel">
        <h2>Automated Insights</h2>
        <ul class="insights">
          ${(e.insights||[]).map(o=>`<li>${g(o)}</li>`).join("")||"<li>No critical anomalies for this period.</li>"}
          ${(()=>{const k=(n.funnel||[]).find(T=>T.step==="Projects");return k&&k.dropOffPct>=50?`<li>High funnel leakage: ${x(k.dropOffPct,1)} drop-off before Projects.</li>`:""})()}
        </ul>
      </section>
    </main>
  `,te()}function te(){var t,e,a,n,s,l,c,p,d;(t=document.getElementById("refresh-btn"))==null||t.addEventListener("click",$),(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",async()=>{j(),await b("/api/auth/logout",{method:"POST"}),N()}),(a=document.getElementById("range-days"))==null||a.addEventListener("change",i=>{r.rangeDays=Number.parseInt(i.target.value,10)||30,r.page=1,$()}),(n=document.getElementById("apply-filters"))==null||n.addEventListener("click",()=>{var i,u,h;r.filters.eventType=((i=document.getElementById("filter-event-type"))==null?void 0:i.value)||"all",r.filters.country=((u=document.getElementById("filter-country"))==null?void 0:u.value)||"all",r.filters.query=((h=document.getElementById("filter-query"))==null?void 0:h.value)||"",r.page=1,$()}),(s=document.getElementById("compact-view"))==null||s.addEventListener("change",i=>{r.compactEventTable=!!i.target.checked,q(r.data)}),document.querySelectorAll(".event-select").forEach(i=>{i.addEventListener("change",u=>{const h=A(u.target.value);h.length!==0&&(u.target.checked?h.forEach(m=>r.selectedEventIds.add(m)):h.forEach(m=>r.selectedEventIds.delete(m)))})}),(l=document.getElementById("select-all-events"))==null||l.addEventListener("change",i=>{const u=!!i.target.checked;document.querySelectorAll(".event-select").forEach(h=>{h.checked=u;const m=A(h.value);m.length!==0&&(u?m.forEach(y=>r.selectedEventIds.add(y)):m.forEach(y=>r.selectedEventIds.delete(y)))})}),(c=document.getElementById("delete-selected"))==null||c.addEventListener("click",async()=>{const i=Array.from(r.selectedEventIds.values());if(!(i.length===0||!window.confirm(`Delete ${i.length} selected record(s)?`)))try{await b("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:i})}),r.selectedEventIds.clear(),await $()}catch(h){window.alert(h.message||"Delete failed")}}),(p=document.getElementById("prev-page"))==null||p.addEventListener("click",()=>{r.page>1&&(r.page-=1,$())}),(d=document.getElementById("next-page"))==null||d.addEventListener("click",()=>{r.page+=1,$()})}async function $(){try{const t=new Set(r.selectedEventIds),e=new URLSearchParams({days:String(r.rangeDays),page:String(r.page),perPage:String(r.perPage),eventType:r.filters.eventType,country:r.filters.country,search:r.filters.query}),[a,n,s,l,c]=await Promise.all([b(`/api/stats/summary?days=${r.rangeDays}`),b(`/api/stats/sources?days=${r.rangeDays}`),b(`/api/stats/funnel?days=${r.rangeDays}`),b(`/api/stats/conversions?days=${r.rangeDays}`),b(`/api/stats/recent?${e.toString()}`)]);r.data={summary:a,sources:n,funnel:s,conversions:l,recent:c},r.selectedEventIds=new Set((c.records||[]).map(p=>Number.parseInt(String(p.event_id),10)).filter(p=>Number.isFinite(p)&&t.has(p))),q(r.data)}catch(t){j(),N(t.message)}}function U(){j(),r.refreshTimer=setInterval(()=>{$().catch(()=>{})},60*1e3)}function j(){r.refreshTimer&&(clearInterval(r.refreshTimer),r.refreshTimer=null)}async function ne(){L.innerHTML='<main class="analytics-shell"><section class="panel"><p>Loading analytics dashboard...</p></section></main>';try{await b("/api/auth/me"),await $(),U()}catch{N()}}ne();
