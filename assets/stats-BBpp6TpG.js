import"./modulepreload-polyfill-B5Qt9EMX.js";const M=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,N=document.getElementById("stats-root"),q="https://alitman22-portfolio.onrender.com".replace(/\/$/,""),o={rangeDays:30,page:1,perPage:20,filters:{eventType:"all",country:"all",query:""},data:null,refreshTimer:null};function B(t){return`${q}${t}`}async function f(t,e={}){const r=await fetch(B(t),{credentials:"include",headers:{"Content-Type":"application/json",...e.headers||{}},...e}),s=await r.text(),n=s?JSON.parse(s):{};if(!r.ok)throw new Error((n==null?void 0:n.message)||`Request failed: ${r.status}`);return n}function d(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function w(t,e=0){return(Number(t)||0).toLocaleString(void 0,{maximumFractionDigits:e,minimumFractionDigits:e})}function E(t,e=1){return`${(Number(t)||0).toFixed(e)}%`}function _(t){return t>.01?"trend-up":t<-.01?"trend-down":"trend-flat"}function O(t){const e=Array.isArray(t)?t.map(u=>Number(u)||0):[];if(e.length===0)return"";const r=120,s=36,n=4,l=Math.min(...e),p=Math.max(...e)-l||1,c=(r-n*2)/Math.max(e.length-1,1),g=e.map((u,b)=>{const m=n+c*b,v=s-n-(u-l)/p*(s-n*2);return`${m},${v}`}).join(" ");return`
    <svg viewBox="0 0 ${r} ${s}" class="sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${g}" class="sparkline-line"></polyline>
    </svg>
  `}function T(t,e,r){if(!Array.isArray(t)||t.length===0)return'<p class="empty">No data</p>';const s=760,n=220,l=36,i=20,p=s-l*2,c=n-i*2,g=t.flatMap(y=>r.map(h=>Number(y[h])||0)),u=Math.max(1,...g),b=p/Math.max(t.length-1,1),m=r.map((y,h)=>{const k=h===0?"chart-line-a":h===1?"chart-line-b":"chart-line-c";return`<polyline points="${t.map((R,a)=>{const x=l+a*b,C=n-i-(Number(R[y])||0)/u*c;return`${x},${C}`}).join(" ")}" class="${k}" />`}).join(""),v=t.filter((y,h)=>h===0||h===t.length-1||h%Math.ceil(t.length/4)===0).map((y,h)=>{const k=l+h*(p/Math.max(Math.ceil(t.length/4),1)),S=String(y[e]||"").slice(5);return`<text x="${k}" y="${n-4}" class="chart-x-label">${d(S)}</text>`}).join("");return`
    <svg viewBox="0 0 ${s} ${n}" class="chart-svg" preserveAspectRatio="none">
      <line x1="${l}" y1="${n-i}" x2="${s-l}" y2="${n-i}" class="chart-axis" />
      <line x1="${l}" y1="${i}" x2="${l}" y2="${n-i}" class="chart-axis" />
      ${m}
      ${v}
    </svg>
  `}function P(t,e,r,s=!1){const n=Array.isArray(t)?t:[];if(n.length===0)return'<p class="empty">No data</p>';const l=Math.max(1,...n.map(i=>Number(i[r])||0));return n.map(i=>{const p=Number(i[r])||0,c=Math.max(3,Math.round(p/l*100));return`
      <div class="bar-row">
        <span>${d(i[e])}</span>
        <div class="bar-track"><div class="bar-fill ${s?"bar-danger":""}" style="width:${c}%"></div></div>
        <strong>${w(p)}</strong>
      </div>
    `}).join("")}function L(t,e,r){const s=Array.isArray(t)?t:[],n=s.reduce((g,u)=>g+(Number(u[r])||0),0);if(!n)return'<p class="empty">No data</p>';let l=0;const i=["#2dd98a","#28b4ff","#f5b84a","#9b7cff","#f56f7f"],p=s.map((g,u)=>{const m=(Number(g[r])||0)/n*100,v=`<circle r="44" cx="60" cy="60" stroke="${i[u%i.length]}" stroke-dasharray="${m} ${100-m}" stroke-dashoffset="${-l}" />`;return l+=m,v}).join(""),c=s.map((g,u)=>{const m=(Number(g[r])||0)/n*100;return`<li><span><i style="background:${i[u%i.length]}"></i>${d(g[e])}</span><strong>${E(m,1)}</strong></li>`}).join("");return`
    <div class="donut-wrap">
      <svg viewBox="0 0 120 120" class="donut-svg">
        <g transform="rotate(-90 60 60)">
          ${p}
        </g>
        <text x="60" y="58" text-anchor="middle" class="donut-total">${w(n)}</text>
        <text x="60" y="73" text-anchor="middle" class="donut-sub">visitors</text>
      </svg>
      <ul class="legend-list">${c}</ul>
    </div>
  `}function A(t=""){var e;N.innerHTML=`
    <main class="analytics-shell auth-shell">
      <section class="panel auth-panel">
        <img src="${M}" alt="Portfolio Analytics" class="auth-logo" />
        <h1>Portfolio Analytics</h1>
        <p>Sign in to access the insight dashboard.</p>
        <form id="login-form" class="auth-form">
          <label>Username<input name="username" type="text" required autocomplete="username" /></label>
          <label>Password<input name="password" type="password" required autocomplete="current-password" /></label>
          <label>2FA Code (optional)<input name="totpCode" type="text" inputmode="numeric" pattern="[0-9 ]*" maxlength="8" /></label>
          <button type="submit">Sign in</button>
          <p class="error">${d(t)}</p>
        </form>
      </section>
    </main>
  `,(e=document.getElementById("login-form"))==null||e.addEventListener("submit",async r=>{r.preventDefault();const s=new FormData(r.currentTarget);try{await f("/api/auth/login",{method:"POST",body:JSON.stringify({username:String(s.get("username")||""),password:String(s.get("password")||""),totpCode:String(s.get("totpCode")||"").trim()})}),await $(),I()}catch(n){A(n.message)}})}function D(t,e,r=""){const s=Number(e==null?void 0:e.changePct)||0,n=Number(e==null?void 0:e.value)||0;return`
    <article class="kpi-card">
      <header>
        <h3>${d(t)}</h3>
        <span class="kpi-trend ${_(s)}">${s>=0?"+":""}${s.toFixed(1)}%</span>
      </header>
      <p class="kpi-value">${w(n,r==="%"?1:0)}${r}</p>
      ${O((e==null?void 0:e.sparkline)||[])}
    </article>
  `}function V(t){var v,y,h,k,S,R;const{summary:e,sources:r,funnel:s,conversions:n,recent:l}=t,i=e.kpis||{},p=l.records||[],c=l.paging||{page:1,totalPages:1,total:0},g=["all","page_view","scroll","section_view","project_click","resume_download","contact_click","outbound_click"],u=["all",...new Set([...(((v=e.segmentation)==null?void 0:v.byCountry)||[]).map(a=>a.country)])].slice(0,30),b=(s.funnel||[]).map(a=>({step:a.step,dropOff:a.dropOffPct})),m=p.map(a=>{const x=new Date(a.created_at).toLocaleString(),C=String(a.ip_address||"-").replace(/(\d+\.\d+\.\d+)\.\d+/,"$1.xxx");return`
      <tr>
        <td>${d(x)}</td>
        <td>${d(C)}</td>
        <td>${d(a.country||"Unknown")}</td>
        <td>${d(a.device_type||"-")}</td>
        <td>${d(a.event_type||"-")}</td>
        <td>${d(a.referrer||"-")}</td>
      </tr>
    `}).join("");N.innerHTML=`
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
              <option value="14" ${o.rangeDays===14?"selected":""}>14d</option>
              <option value="30" ${o.rangeDays===30?"selected":""}>30d</option>
              <option value="60" ${o.rangeDays===60?"selected":""}>60d</option>
              <option value="90" ${o.rangeDays===90?"selected":""}>90d</option>
            </select>
          </label>
          <button id="refresh-btn" type="button">Refresh</button>
          <button id="logout-btn" type="button" class="danger">Logout</button>
        </div>
      </header>

      <section class="kpi-row">
        ${D("Unique Visitors",i.uniqueVisitors)}
        ${D("Conversion Rate",i.conversionRate,"%")}
        ${D("Resume Downloads",i.resumeDownloads)}
        ${D("Project Clicks",i.projectClicks)}
        ${D("Engagement Score",i.engagementScore)}
        ${D("Avg Scroll Depth",i.avgScrollDepth,"%")}
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
                  <td>${d(a.source)}</td>
                  <td>${w(a.visitors)}</td>
                  <td>${E(a.conversionRate,1)}</td>
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
          <div class="bar-stack">${P(b,"step","dropOff",!0)}</div>
        </article>
        <article class="panel">
          <h2>Section Engagement</h2>
          <div class="bar-stack">${P(s.sectionEngagement||[],"section","interactions")}</div>
        </article>
        <article class="panel">
          <h2>Scroll Depth Distribution</h2>
          ${T((n.scrollDistribution||[]).map(a=>({day:`${a.depth}%`,users:a.users})),"day",["users"])}
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>Conversion Trend</h2>
          ${T(n.trend||[],"day",["resumeDownloads","projectClicks"])}
          <div class="chart-legend">
            <span><i class="legend-a"></i> Resume Downloads</span>
            <span><i class="legend-b"></i> Project Clicks</span>
          </div>
        </article>
        <article class="panel">
          <h2>Conversion by Device</h2>
          <div class="bar-stack">${P(n.byDevice||[],"segment","conversionRate")}</div>
          <h3>Conversion by Country</h3>
          <div class="bar-stack">${P((n.byCountry||[]).slice(0,8),"segment","conversionRate")}</div>
        </article>
      </section>

      <section class="grid two">
        <article class="panel">
          <h2>New vs Returning Users</h2>
          ${L([{label:"New",value:((h=(y=e.segmentation)==null?void 0:y.newVsReturning)==null?void 0:h.newUsers)||0},{label:"Returning",value:((S=(k=e.segmentation)==null?void 0:k.newVsReturning)==null?void 0:S.returningUsers)||0}],"label","value")}
          <p class="hint">Returning user ratio: ${E(((R=e.derived)==null?void 0:R.returningUserRatio)||0,1)}</p>
        </article>
        <article class="panel">
          <h2>Geo Distribution</h2>
          <table class="data-table">
            <thead><tr><th>Country</th><th>Visitors</th><th>Conv%</th></tr></thead>
            <tbody>
              ${(n.byCountry||[]).map(a=>`
                <tr>
                  <td>${d(a.segment)}</td>
                  <td>${w(a.visitors)}</td>
                  <td>${E(a.conversionRate,1)}</td>
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
            <select id="filter-event-type">
              ${g.map(a=>`<option value="${a}" ${o.filters.eventType===a?"selected":""}>${a}</option>`).join("")}
            </select>
            <select id="filter-country">
              ${u.map(a=>`<option value="${d(a)}" ${o.filters.country===a?"selected":""}>${d(a)}</option>`).join("")}
            </select>
            <input id="filter-query" type="search" placeholder="Search path / referrer / event" value="${d(o.filters.query)}" />
            <button id="apply-filters" type="button">Apply</button>
          </div>
        </div>

        <table class="data-table mono">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>IP (masked)</th>
              <th>Country</th>
              <th>Device</th>
              <th>Event Type</th>
              <th>Referrer</th>
            </tr>
          </thead>
          <tbody>${m||'<tr><td colspan="6">No events</td></tr>'}</tbody>
        </table>

        <div class="pager">
          <button id="prev-page" ${c.page<=1?"disabled":""}>Prev</button>
          <span>Page ${c.page} / ${c.totalPages} (${w(c.total)} events)</span>
          <button id="next-page" ${c.page>=c.totalPages?"disabled":""}>Next</button>
        </div>
      </section>

      <section class="panel">
        <h2>Automated Insights</h2>
        <ul class="insights">
          ${(e.insights||[]).map(a=>`<li>${d(a)}</li>`).join("")||"<li>No critical anomalies for this period.</li>"}
          ${(()=>{const x=(s.funnel||[]).find(C=>C.step==="Projects");return x&&x.dropOffPct>=50?`<li>High funnel leakage: ${E(x.dropOffPct,1)} drop-off before Projects.</li>`:""})()}
        </ul>
      </section>
    </main>
  `,U()}function U(){var t,e,r,s,n,l;(t=document.getElementById("refresh-btn"))==null||t.addEventListener("click",$),(e=document.getElementById("logout-btn"))==null||e.addEventListener("click",async()=>{j(),await f("/api/auth/logout",{method:"POST"}),A()}),(r=document.getElementById("range-days"))==null||r.addEventListener("change",i=>{o.rangeDays=Number.parseInt(i.target.value,10)||30,o.page=1,$()}),(s=document.getElementById("apply-filters"))==null||s.addEventListener("click",()=>{var i,p,c;o.filters.eventType=((i=document.getElementById("filter-event-type"))==null?void 0:i.value)||"all",o.filters.country=((p=document.getElementById("filter-country"))==null?void 0:p.value)||"all",o.filters.query=((c=document.getElementById("filter-query"))==null?void 0:c.value)||"",o.page=1,$()}),(n=document.getElementById("prev-page"))==null||n.addEventListener("click",()=>{o.page>1&&(o.page-=1,$())}),(l=document.getElementById("next-page"))==null||l.addEventListener("click",()=>{o.page+=1,$()})}async function $(){try{const t=new URLSearchParams({days:String(o.rangeDays),page:String(o.page),perPage:String(o.perPage),eventType:o.filters.eventType,country:o.filters.country,search:o.filters.query}),[e,r,s,n,l]=await Promise.all([f(`/api/stats/summary?days=${o.rangeDays}`),f(`/api/stats/sources?days=${o.rangeDays}`),f(`/api/stats/funnel?days=${o.rangeDays}`),f(`/api/stats/conversions?days=${o.rangeDays}`),f(`/api/stats/recent?${t.toString()}`)]);o.data={summary:e,sources:r,funnel:s,conversions:n,recent:l},V(o.data)}catch(t){j(),A(t.message)}}function I(){j(),o.refreshTimer=setInterval(()=>{$().catch(()=>{})},60*1e3)}function j(){o.refreshTimer&&(clearInterval(o.refreshTimer),o.refreshTimer=null)}async function F(){N.innerHTML='<main class="analytics-shell"><section class="panel"><p>Loading analytics dashboard...</p></section></main>';try{await f("/api/auth/me"),await $(),I()}catch{A()}}F();
