import"./modulepreload-polyfill-B5Qt9EMX.js";const H=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,P=document.getElementById("stats-root"),G="https://alitman22-portfolio.onrender.com".replace(/\/$/,""),a={rangeDays:30,page:1,perPage:20,compactEventTable:!0,filters:{eventType:"all",country:"all",query:""},data:null,selectedEventIds:new Set,refreshTimer:null};function J(t){return`${G}${t}`}async function b(t,e={}){const r=await fetch(J(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),n=await r.text(),s=n?JSON.parse(n):{};if(!r.ok)throw new Error((s==null?void 0:s.message)||`Request failed: ${r.status}`);return s}function m(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function E(t,e=0){return(Number(t)||0).toLocaleString(void 0,{maximumFractionDigits:e,minimumFractionDigits:e})}function C(t,e=1){return`${(Number(t)||0).toFixed(e)}%`}const Y={turkiye:"TR",turkey:"TR","united states":"US",usa:"US",germany:"DE",netherlands:"NL",iran:"IR",russia:"RU",lithuania:"LT","united kingdom":"GB",uk:"GB",france:"FR",spain:"ES",italy:"IT",canada:"CA",unknown:""};function Q(t){const e=String(t||"").trim().toLowerCase(),r=Y[e]||"";return!r||r.length!==2?"":r.toUpperCase().split("").map(n=>String.fromCodePoint(127397+n.charCodeAt(0))).join("")}function M(t){const e=String(t||"Unknown"),r=Q(e);return r?`${r} ${e}`:e}function W(t){const e=String(t||"").toLowerCase();return e.includes("windows")?"🪟":e.includes("android")?"🤖":e.includes("ios")||e.includes("mac")?"🍎":e.includes("linux")?"🐧":"💻"}function X(t){const e=String(t||"").toLowerCase();return e.includes("mobile")?"📱":e.includes("tablet")?"📲":e.includes("desktop")?"🖥️":"🧩"}function z(t){const e=M(t.country||"Unknown"),r=String(t.region||"").trim(),n=String(t.city||"").trim();return r&&n&&r.toLowerCase()!==n.toLowerCase()?`${e} / ${r} (${n})`:r?`${e} / ${r}`:n?`${e} / ${n}`:e}function A(t){return String(t||"").split(",").map(e=>Number.parseInt(e,10)).filter(e=>Number.isFinite(e))}function Z(t){const e=[],r=new Map;for(const n of t){const d=String(n.created_at||"").slice(0,16),i=String(n.session_id||n.ip_address||"unknown"),p=String(n.path||""),u=`${i}|${d}|${p}`;let l=r.get(u);l||(l={created_at:n.created_at,ip_address:n.ip_address,country:n.country,city:n.city,region:n.region,device_type:n.device_type,os_name:n.os_name,referrer:n.referrer,eventIds:[],eventCounts:new Map},r.set(u,l),e.push(l));const c=Number.parseInt(String(n.event_id),10);Number.isFinite(c)&&l.eventIds.push(c);const h=String(n.event_type||"unknown");l.eventCounts.set(h,(l.eventCounts.get(h)||0)+1)}return e.map(n=>{const s=Array.from(n.eventCounts.entries()).sort((u,l)=>l[1]-u[1]),d=s.reduce((u,[,l])=>u+l,0),i=s.slice(0,3).map(([u,l])=>l>1?`${u} x${l}`:u).join(", "),p=s.length>3?` +${s.length-3} more`:"";return{...n,eventCount:d,eventSummary:`${i}${p}`}})}function K(t){return t>.01?"trend-up":t<-.01?"trend-down":"trend-flat"}function ee(t){const e=Array.isArray(t)?t.map(c=>Number(c)||0):[];if(e.length===0)return"";const r=120,n=36,s=4,d=Math.min(...e),p=Math.max(...e)-d||1,u=(r-s*2)/Math.max(e.length-1,1),l=e.map((c,h)=>{const g=s+u*h,v=n-s-(c-d)/p*(n-s*2);return`${g},${v}`}).join(" ");return`
    <svg viewBox="0 0 ${r} ${n}" class="sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${l}" class="sparkline-line"></polyline>
    </svg>
  `}function j(t,e,r){if(!Array.isArray(t)||t.length===0)return'<p class="empty">No data</p>';const n=760,s=220,d=36,i=20,p=n-d*2,u=s-i*2,l=t.flatMap(y=>r.map(f=>Number(y[f])||0)),c=Math.max(1,...l),h=p/Math.max(t.length-1,1),g=r.map((y,f)=>{const w=f===0?"chart-line-a":f===1?"chart-line-b":"chart-line-c";return`<polyline points="${t.map((I,D)=>{const o=d+D*h,k=s-i-(Number(I[y])||0)/c*u;return`${o},${k}`}).join(" ")}" class="${w}" />`}).join(""),v=t.filter((y,f)=>f===0||f===t.length-1||f%Math.ceil(t.length/4)===0).map((y,f)=>{const w=d+f*(p/Math.max(Math.ceil(t.length/4),1)),x=String(y[e]||"").slice(5);return`<text x="${w}" y="${s-4}" class="chart-x-label">${m(x)}</text>`}).join("");return`
    <svg viewBox="0 0 ${n} ${s}" class="chart-svg" preserveAspectRatio="none">
      <line x1="${d}" y1="${s-i}" x2="${n-d}" y2="${s-i}" class="chart-axis" />
      <line x1="${d}" y1="${i}" x2="${d}" y2="${s-i}" class="chart-axis" />
      ${g}
      ${v}
    </svg>
  `}function R(t,e,r,n=!1){const s=Array.isArray(t)?t:[];if(s.length===0)return'<p class="empty">No data</p>';const d=Math.max(1,...s.map(i=>Number(i[r])||0));return s.map(i=>{const p=Number(i[r])||0,u=Math.max(3,Math.round(p/d*100));return`
      <div class="bar-row">
        <span>${m(i[e])}</span>
        <div class="bar-track"><div class="bar-fill ${n?"bar-danger":""}" style="width:${u}%"></div></div>
        <strong>${E(p)}</strong>
      </div>
    `}).join("")}function B(t,e,r){const n=Array.isArray(t)?t:[],s=n.reduce((l,c)=>l+(Number(c[r])||0),0);if(!s)return'<p class="empty">No data</p>';let d=0;const i=["#2dd98a","#28b4ff","#f5b84a","#9b7cff","#f56f7f"],p=n.map((l,c)=>{const g=(Number(l[r])||0)/s*100,v=`<circle r="44" cx="60" cy="60" stroke="${i[c%i.length]}" stroke-dasharray="${g} ${100-g}" stroke-dashoffset="${-d}" />`;return d+=g,v}).join(""),u=n.map((l,c)=>{const g=(Number(l[r])||0)/s*100;return`<li><span><i style="background:${i[c%i.length]}"></i>${m(l[e])}</span><strong>${C(g,1)}</strong></li>`}).join("");return`
    <div class="donut-wrap">
      <svg viewBox="0 0 120 120" class="donut-svg">
        <g transform="rotate(-90 60 60)">
          ${p}
        </g>
        <text x="60" y="58" text-anchor="middle" class="donut-total">${E(s)}</text>
        <text x="60" y="73" text-anchor="middle" class="donut-sub">visitors</text>
      </svg>
      <ul class="legend-list">${u}</ul>
    </div>
  `}function N(t=""){var e;P.innerHTML=`
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
          <p class="error">${m(t)}</p>
        </form>
      </section>
    </main>
  `,(e=document.getElementById("login-form"))==null||e.addEventListener("submit",async r=>{r.preventDefault();const n=new FormData(r.currentTarget);try{await b("/api/auth/login",{method:"POST",body:JSON.stringify({username:String(n.get("username")||""),password:String(n.get("password")||""),totpCode:String(n.get("totpCode")||"").trim()})}),await $(),U()}catch(s){N(s.message)}})}function S(t,e,r="",n=""){const s=Number(e==null?void 0:e.changePct)||0,d=Number(e==null?void 0:e.value)||0;return`
    <article class="kpi-card">
      <header>
        <h3>${m(t)}${n?` <span class="kpi-help" title="${m(n)}">?</span>`:""}</h3>
        <span class="kpi-trend ${K(s)}">${s>=0?"+":""}${s.toFixed(1)}%</span>
      </header>
      <p class="kpi-value">${E(d,r==="%"?1:0)}${r}</p>
      ${ee((e==null?void 0:e.sparkline)||[])}
    </article>
  `}function q(t){var y,f,w,x,I,D;const{summary:e,sources:r,funnel:n,conversions:s,recent:d}=t,i=e.kpis||{},p=d.records||[],u=d.paging||{page:1,totalPages:1,total:0},l=["all","page_view","scroll","section_view","project_click","resume_download","contact_click","outbound_click"],c=["all",...new Set([...(((y=e.segmentation)==null?void 0:y.byCountry)||[]).map(o=>o.country)])].slice(0,30),h=(n.funnel||[]).map(o=>({step:o.step,dropOff:o.dropOffPct})),g=a.compactEventTable?Z(p):p,v=g.map(o=>{const k=new Date(o.created_at).toLocaleString(),T=z(o),_=a.compactEventTable?o.eventIds:A(String(Number.parseInt(String(o.event_id),10))),O=_.join(","),F=_.length>0&&_.every(V=>a.selectedEventIds.has(V));return`
      <tr>
        <td><input type="checkbox" class="event-select" value="${m(O)}" ${F?"checked":""} /></td>
        <td>${m(k)}</td>
        <td>${m(o.ip_address||"-")}</td>
        <td>${m(T)}</td>
        <td><span class="metric-icon" title="${m(o.device_type||"-")}" aria-hidden="true">${X(o.device_type)}</span> ${m(o.device_type||"-")}</td>
        <td><span class="metric-icon" title="${m(o.os_name||"-")}" aria-hidden="true">${W(o.os_name)}</span> ${m(o.os_name||"-")}</td>
        <td>${m(a.compactEventTable?`${o.eventSummary} (${o.eventCount})`:o.event_type||"-")}</td>
        <td>${m(o.referrer||"-")}</td>
      </tr>
    `}).join("");P.innerHTML=`
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
              <option value="14" ${a.rangeDays===14?"selected":""}>14d</option>
              <option value="30" ${a.rangeDays===30?"selected":""}>30d</option>
              <option value="60" ${a.rangeDays===60?"selected":""}>60d</option>
              <option value="90" ${a.rangeDays===90?"selected":""}>90d</option>
            </select>
          </label>
          <button id="refresh-btn" type="button">Refresh</button>
          <button id="logout-btn" type="button" class="danger">Logout</button>
        </div>
      </header>

      <section class="kpi-row">
        ${S("Unique Visitors",i.uniqueVisitors,"","Count of distinct anonymous users in selected period.")}
        ${S("Conversion Rate",i.conversionRate,"%","Ratio of resume downloads + project clicks to unique visitors.")}
        ${S("Resume Downloads",i.resumeDownloads,"","How many resume download events happened in selected period.")}
        ${S("Project Clicks",i.projectClicks,"","How many outbound project link clicks happened in selected period.")}
        ${S("Engagement Score",i.engagementScore,"","Composite signal from scroll depth and interactions per user.")}
        ${S("Avg Scroll Depth",i.avgScrollDepth,"%","Average maximum scroll depth reached by users.")}
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Acquisition Sources</h2>
          ${B(r.chart||[],"source","visitors")}
        </article>
        <article class="panel">
          <h2>Source Quality</h2>
          <table class="data-table">
            <thead><tr><th>Source</th><th>Visitors</th><th>Conv%</th><th>Avg Engagement</th></tr></thead>
            <tbody>
              ${(r.table||[]).map(o=>`
                <tr>
                  <td>${m(o.source)}</td>
                  <td>${E(o.visitors)}</td>
                  <td>${C(o.conversionRate,1)}</td>
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
          ${j((s.scrollDistribution||[]).map(o=>({day:`${o.depth}%`,users:o.users})),"day",["users"])}
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Conversion Trend</h2>
          ${j(s.trend||[],"day",["resumeDownloads","projectClicks"])}
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
          ${B([{label:"New",value:((w=(f=e.segmentation)==null?void 0:f.newVsReturning)==null?void 0:w.newUsers)||0},{label:"Returning",value:((I=(x=e.segmentation)==null?void 0:x.newVsReturning)==null?void 0:I.returningUsers)||0}],"label","value")}
          <p class="hint">Returning user ratio: ${C(((D=e.derived)==null?void 0:D.returningUserRatio)||0,1)}</p>
        </article>
        <article class="panel">
          <h2>Geo Distribution</h2>
          <table class="data-table">
            <thead><tr><th>Country</th><th>Visitors</th><th>Conv%</th></tr></thead>
            <tbody>
              ${(s.byCountry||[]).map(o=>`
                <tr>
                  <td>${m(M(o.segment))}</td>
                  <td>${E(o.visitors)}</td>
                  <td>${C(o.conversionRate,1)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </article>
      </section>

      <section class="panel panel-scroll">
          <h2>Event Log (Developer View)</h2>
          <div class="filter-row">
            <label class="event-select-all"><input id="select-all-events" type="checkbox" /> Select page</label>
            <select id="filter-event-type">
              ${l.map(o=>`<option value="${o}" ${a.filters.eventType===o?"selected":""}>${o}</option>`).join("")}
            </select>
            <select id="filter-country">
              ${c.map(o=>`<option value="${m(o)}" ${a.filters.country===o?"selected":""}>${m(o)}</option>`).join("")}
            </select>
            <label>
              Rows
              <select id="rows-per-page">
                <option value="10" ${a.perPage===10?"selected":""}>10</option>
                <option value="20" ${a.perPage===20?"selected":""}>20</option>
                <option value="50" ${a.perPage===50?"selected":""}>50</option>
                <option value="100" ${a.perPage===100?"selected":""}>100</option>
              </select>
            </label>
            <input id="filter-query" type="search" placeholder="Search path / referrer / event" value="${m(a.filters.query)}" />
            <label class="event-select-all"><input id="compact-view" type="checkbox" ${a.compactEventTable?"checked":""} /> Compact</label>
            <button id="delete-selected" type="button" class="danger">Delete Selected</button>
            <button id="apply-filters" type="button">Apply</button>
          </div>
        </div>

        <div class="table-scroll table-scroll-events">
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
        </div>

        <div class="pager">
          <button id="prev-page" ${u.page<=1?"disabled":""}>Prev</button>
          <span>Page ${u.page} / ${u.totalPages} (${E(u.total)} events${a.compactEventTable?`, ${E(g.length)} compact rows`:""})</span>
          <button id="next-page" ${u.page>=u.totalPages?"disabled":""}>Next</button>
        </div>
      </section>

      <section class="panel">
        <h2>Automated Insights</h2>
        <ul class="insights">
          ${(e.insights||[]).map(o=>`<li>${m(o)}</li>`).join("")||"<li>No critical anomalies for this period.</li>"}
          ${(()=>{const k=(n.funnel||[]).find(T=>T.step==="Projects");return k&&k.dropOffPct>=50?`<li>High funnel leakage: ${C(k.dropOffPct,1)} drop-off before Projects.</li>`:""})()}
        </ul>
      </section>
    </main>
  `,te()}function te(){var t,e,r,n,s,d,i,p,u,l;(t=document.getElementById("refresh-btn"))==null||t.addEventListener("click",$),(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",async()=>{L(),await b("/api/auth/logout",{method:"POST"}),N()}),(r=document.getElementById("range-days"))==null||r.addEventListener("change",c=>{a.rangeDays=Number.parseInt(c.target.value,10)||30,a.page=1,$()}),(n=document.getElementById("apply-filters"))==null||n.addEventListener("click",()=>{var c,h,g;a.filters.eventType=((c=document.getElementById("filter-event-type"))==null?void 0:c.value)||"all",a.filters.country=((h=document.getElementById("filter-country"))==null?void 0:h.value)||"all",a.filters.query=((g=document.getElementById("filter-query"))==null?void 0:g.value)||"",a.page=1,$()}),(s=document.getElementById("rows-per-page"))==null||s.addEventListener("change",c=>{const h=Number.parseInt(c.target.value,10);a.perPage=[10,20,50,100].includes(h)?h:20,a.page=1,$()}),(d=document.getElementById("compact-view"))==null||d.addEventListener("change",c=>{a.compactEventTable=!!c.target.checked,q(a.data)}),document.querySelectorAll(".event-select").forEach(c=>{c.addEventListener("change",h=>{const g=A(h.target.value);g.length!==0&&(h.target.checked?g.forEach(v=>a.selectedEventIds.add(v)):g.forEach(v=>a.selectedEventIds.delete(v)))})}),(i=document.getElementById("select-all-events"))==null||i.addEventListener("change",c=>{const h=!!c.target.checked;document.querySelectorAll(".event-select").forEach(g=>{g.checked=h;const v=A(g.value);v.length!==0&&(h?v.forEach(y=>a.selectedEventIds.add(y)):v.forEach(y=>a.selectedEventIds.delete(y)))})}),(p=document.getElementById("delete-selected"))==null||p.addEventListener("click",async()=>{const c=Array.from(a.selectedEventIds.values());if(!(c.length===0||!window.confirm(`Delete ${c.length} selected record(s)?`)))try{await b("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:c})}),a.selectedEventIds.clear(),await $()}catch(g){window.alert(g.message||"Delete failed")}}),(u=document.getElementById("prev-page"))==null||u.addEventListener("click",()=>{a.page>1&&(a.page-=1,$())}),(l=document.getElementById("next-page"))==null||l.addEventListener("click",()=>{a.page+=1,$()})}async function $(){try{const t=new Set(a.selectedEventIds),e=new URLSearchParams({days:String(a.rangeDays),page:String(a.page),perPage:String(a.perPage),eventType:a.filters.eventType,country:a.filters.country,search:a.filters.query}),[r,n,s,d,i]=await Promise.all([b(`/api/stats/summary?days=${a.rangeDays}`),b(`/api/stats/sources?days=${a.rangeDays}`),b(`/api/stats/funnel?days=${a.rangeDays}`),b(`/api/stats/conversions?days=${a.rangeDays}`),b(`/api/stats/recent?${e.toString()}`)]);a.data={summary:r,sources:n,funnel:s,conversions:d,recent:i},a.selectedEventIds=new Set((i.records||[]).map(p=>Number.parseInt(String(p.event_id),10)).filter(p=>Number.isFinite(p)&&t.has(p))),q(a.data)}catch(t){L(),N(t.message)}}function U(){L(),a.refreshTimer=setInterval(()=>{$().catch(()=>{})},60*1e3)}function L(){a.refreshTimer&&(clearInterval(a.refreshTimer),a.refreshTimer=null)}async function ne(){P.innerHTML='<main class="analytics-shell"><section class="panel"><p>Loading analytics dashboard...</p></section></main>';try{await b("/api/auth/me"),await $(),U()}catch{N()}}ne();
