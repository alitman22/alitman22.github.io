import"./modulepreload-polyfill-B5Qt9EMX.js";const nt=""+new URL("logo-stats-My1wrg3h.png",import.meta.url).href,P=document.getElementById("stats-root"),it="https://alitman22-portfolio.onrender.com".replace(/\/$/,"");function ot(t){return`${it}${t}`}async function h(t,s={}){const a=await fetch(ot(t),{credentials:"include",headers:{"Content-Type":"application/json",...s.headers||{}},...s}),n=await a.text(),i=n?JSON.parse(n):{};if(!a.ok)throw new Error((i==null?void 0:i.message)||`Request failed: ${a.status}`);return i}function rt(t){if(!t)return"-";const s=new Date(t);return Number.isNaN(s.getTime())?t:s.toLocaleString()}function S(t){return Number.isFinite(t)?`${Math.round(t)}%`:"0%"}function ct(t){return t.toISOString().slice(0,10)}function lt(t,s){const a=new Map((t||[]).map(r=>[String(r.day),Number(r.visits||0)])),n=[],i=new Date,o=new Date(Date.UTC(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()));for(let r=s-1;r>=0;r-=1){const d=new Date(o);d.setUTCDate(o.getUTCDate()-r);const p=ct(d);n.push({day:p,visits:a.get(p)||0})}return n}function dt(t){return(t||[]).reduce((s,a)=>s+Number(a.visits||0),0)}function pt(t,s,a){const n=[];let i=0;for(let o=0;o<t.length;o+=s){const r=t.slice(o,o+s);n.push({label:`${a}${i+1}`,visits:dt(r)}),i+=1}return n}function Y(t,s){const a=new Map;for(const o of t){const r=String(o.day).slice(0,7);a.set(r,(a.get(r)||0)+Number(o.visits||0))}const n=new Date,i=[];for(let o=s-1;o>=0;o-=1){const r=new Date(Date.UTC(n.getUTCFullYear(),n.getUTCMonth()-o,1)),d=`${r.getUTCFullYear()}-${String(r.getUTCMonth()+1).padStart(2,"0")}`;i.push({label:d,visits:a.get(d)||0})}return i}function ut(t){const s=t.country||"-",a=t.region||null,n=t.city||null;return!t.country&&!a&&!n?"-":a?`${s} / ${a}`:n?`${s} / ${n}`:s}function T(t){const s=String(t||"").toLowerCase();return s.includes("windows")?{label:"WIN",className:"os-win"}:s.includes("linux")?{label:"LNX",className:"os-lnx"}:s.includes("android")?{label:"AND",className:"os-and"}:s.includes("ios")?{label:"iOS",className:"os-ios"}:s.includes("mac")?{label:"MAC",className:"os-mac"}:{label:"OS",className:"os-generic"}}function gt(t){return t.toLocaleString(void 0,{month:"long",year:"numeric"})}function ht(t,s){const a=t.getFullYear(),n=t.getMonth(),o=(new Date(a,n,1).getDay()+6)%7,r=new Date(a,n,1-o),d=[];for(let p=0;p<42;p+=1){const f=new Date(r);f.setDate(r.getDate()+p);const $=f.toISOString().slice(0,10),M=Number(s.get($)||0),y=f.getMonth()===n;d.push({dayNum:f.getDate(),iso:$,visits:M,inMonth:y})}return d}function bt(t,s){return s==="day"?t.slice(-14).map(n=>({label:n.day.slice(5),visits:n.visits})):s==="week"?t.slice(-7).map(n=>({label:n.day.slice(5),visits:n.visits})):s==="month"?pt(t.slice(-30),6,"W"):s==="quarter"?Y(t.slice(-90),3).map(a=>({label:a.label.slice(5),visits:a.visits})):Y(t,12).map(a=>({label:a.label.slice(5),visits:a.visits}))}function mt(t){if(!t||t.length===0)return"<p>No data</p>";const s=Math.max(1,...t.map(a=>Number(a.visits||0)));return`
    <div class="period-bars">
      ${t.map(a=>{const n=Number(a.visits||0),i=Math.max(10,Math.round(n/s*100));return`
            <div class="period-bar-wrap" title="${a.label}: ${n}">
              <span class="period-bar-value">${n}</span>
              <div class="period-bar" style="height:${i}%"></div>
              <span class="period-bar-label">${a.label}</span>
            </div>
          `}).join("")}
    </div>
  `}function N(t=""){P.innerHTML=`
    <main class="stats-container">
      <section class="stats-card login-card">
        <div class="login-hero">
          <img src="${nt}" alt="Portfolio Analytics" class="login-hero-image" />
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
  `;const s=document.getElementById("login-form");s==null||s.addEventListener("submit",async a=>{a.preventDefault();const n=new FormData(s),i={username:String(n.get("username")||""),password:String(n.get("password")||""),totpCode:String(n.get("totpCode")||"").trim()};try{await h("/api/auth/login",{method:"POST",body:JSON.stringify(i)}),await g()}catch(o){N(o.message)}})}function w(t,s,a,n){var I,L,B,U,F,R,V,j,A,O,q;const i=Number(t.totals.visits||0),o=Number(t.totals.visitors||0),r=Number(t.totals.pageviews||0),d=i>0?r/i:0,p=i>0?(i-o)/i*100:0,f=((L=(I=t.countries)==null?void 0:I[0])==null?void 0:L.total)||0,$=i>0?f/i*100:0,M=(t.countries||[]).filter(e=>e.label&&e.label!=="Unknown").length,y=lt(n.points||[],365),_=new Map(y.map(e=>[e.day,Number(e.visits||0)])),W=bt(y,m),H=mt(W),k=new Date(u.getFullYear(),u.getMonth(),1),J=ht(k,_).map(e=>{const c=Math.min(e.visits,10)/10,l=c>0?.16+c*.62:0,at=c>0?`rgba(45, 217, 138, ${l.toFixed(2)})`:"rgba(140, 160, 180, 0.18)";return`<button class="heat-cell-button${e.inMonth?"":" heat-cell-muted"}" style="background:${at}" title="${e.iso}: ${e.visits} visitors" type="button">${e.dayNum}</button>`}).join(""),G=t.countries.map(e=>`<li><span>${e.label}</span><strong>${e.total}</strong></li>`).join(""),K=t.operatingSystems.map(e=>{const c=T(e.label);return`<li><span><span class="os-chip ${c.className}">${c.label}</span> ${e.label}</span><strong>${e.total}</strong></li>`}).join(""),Q=t.devices.map(e=>`<li><span>${e.label}</span><strong>${e.total}</strong></li>`).join(""),X=s.points.map(e=>`<tr><td>${e.day}</td><td>${e.visits}</td></tr>`).join(""),x=[...s.points].reverse(),Z=Math.max(1,...x.map(e=>Number(e.visits||0))),z=x.map(e=>{const c=Number(e.visits||0),l=Math.max(4,Math.round(c/Z*100));return`
        <div class="bar-row">
          <span class="bar-label">${e.day}</span>
          <div class="bar-track"><div class="bar-fill" style="width: ${l}%"></div></div>
          <strong class="bar-value">${c}</strong>
        </div>
      `}).join(""),tt=Math.max(1,(t.devices||[]).reduce((e,c)=>e+Number(c.total||0),0)),et=(t.devices||[]).map(e=>{const c=Number(e.total||0)/tt*100,l=Math.max(4,Math.round(c));return`
        <div class="bar-row">
          <span class="bar-label">${e.label}</span>
          <div class="bar-track"><div class="bar-fill bar-fill-accent" style="width: ${l}%"></div></div>
          <strong class="bar-value">${S(c)}</strong>
        </div>
      `}).join(""),st=a.records.map(e=>`
      <tr>
        <td><input type="checkbox" class="event-check" value="${e.event_id}" /></td>
        <td>${rt(e.created_at)}</td>
        <td>${e.ip_address||"-"}</td>
        <td>${ut(e)}</td>
        <td>${e.device_type||"-"} | <span class="os-chip ${T(e.os_name).className}">${T(e.os_name).label}</span> ${e.os_name||"-"}</td>
        <td>${e.browser_name||"-"}</td>
        <td>${e.referrer||"-"}</td>
      </tr>
    `).join(""),b=a.paging||{page:1,perPage:C,totalPages:1};P.innerHTML=`
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
            <div class="metric-item"><span>Pages / Visit</span><strong>${d.toFixed(2)}</strong></div>
            <div class="metric-item"><span>Returning Rate</span><strong>${S(p)}</strong></div>
            <div class="metric-item"><span>Top Country Share</span><strong>${S($)}</strong></div>
            <div class="metric-item"><span>Geo Coverage</span><strong>${M}</strong></div>
          </div>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card period-card">
          <div class="period-header">
            <h2>Visitors Trend</h2>
            <select id="period-select" class="per-page-select">
              <option value="day" ${m==="day"?"selected":""}>Day</option>
              <option value="week" ${m==="week"?"selected":""}>Week</option>
              <option value="month" ${m==="month"?"selected":""}>Month</option>
              <option value="quarter" ${m==="quarter"?"selected":""}>Quarter</option>
              <option value="year" ${m==="year"?"selected":""}>Year</option>
            </select>
          </div>
          ${H}
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card heatmap-card">
          <div class="heatmap-header">
            <button id="calendar-prev" class="refresh-button" type="button">Prev</button>
            <div class="calendar-title-wrap">
              <h2>${gt(k)}</h2>
              <span class="heatmap-legend">0 = grey, 10+ = bright green</span>
            </div>
            <button id="calendar-next" class="refresh-button" type="button">Next</button>
          </div>
          <div class="calendar-weekdays">
            <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          </div>
          <div class="calendar-grid">${J}</div>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Top Countries</h2>
          <ul class="stats-list">${G||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Device Types</h2>
          <ul class="stats-list">${Q||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
        <article class="stats-card">
          <h2>Operating Systems</h2>
          <ul class="stats-list">${K||"<li><span>No data</span><strong>0</strong></li>"}</ul>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <h2>Visits by Day (${s.days} days)</h2>
          <table>
            <thead><tr><th>Date</th><th>Visits</th></tr></thead>
            <tbody>${X||"<tr><td>-</td><td>0</td></tr>"}</tbody>
          </table>
        </article>
        <article class="stats-card">
          <h2>Visits Trend</h2>
          <div class="bar-chart">${z||"<p>No trend data</p>"}</div>
        </article>
        <article class="stats-card">
          <h2>Device Distribution</h2>
          <div class="bar-chart">${et||"<p>No device data</p>"}</div>
        </article>
      </section>

      <section class="stats-grid">
        <article class="stats-card">
          <div class="recent-events-header">
            <h2>Recent Events</h2>
            <div class="paging-controls">
              <button id="delete-selected-button" class="refresh-button danger-button" type="button">Delete Selected</button>
              <label for="per-page-select">Rows</label>
              <select id="per-page-select" class="per-page-select">
                ${[10,20,50,100].map(e=>`<option value="${e}" ${b.perPage===e?"selected":""}>${e}</option>`).join("")}
              </select>
              <button id="prev-page-button" class="refresh-button" type="button" ${b.page<=1?"disabled":""}>Prev</button>
              <span class="paging-meta">Page ${b.page} / ${b.totalPages}</span>
              <button id="next-page-button" class="refresh-button" type="button" ${b.page>=b.totalPages?"disabled":""}>Next</button>
            </div>
          </div>
          <div class="table-wrap">
            <table>
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
              <tbody>${st||'<tr><td colspan="7">No events yet</td></tr>'}</tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  `,(B=document.getElementById("logout-button"))==null||B.addEventListener("click",async()=>{E(),await h("/api/auth/logout",{method:"POST"}),N()}),(U=document.getElementById("refresh-button"))==null||U.addEventListener("click",()=>{g()}),(F=document.getElementById("prev-page-button"))==null||F.addEventListener("click",()=>{v>1&&(v-=1,g())}),(R=document.getElementById("next-page-button"))==null||R.addEventListener("click",()=>{v<b.totalPages&&(v+=1,g())}),(V=document.getElementById("per-page-select"))==null||V.addEventListener("change",e=>{const c=Number.parseInt(e.target.value,10);Number.isFinite(c)&&(C=c,v=1,g())}),(j=document.getElementById("period-select"))==null||j.addEventListener("change",e=>{m=String(e.target.value||"week"),w(t,s,a,n)}),(A=document.getElementById("calendar-prev"))==null||A.addEventListener("click",()=>{u=new Date(u.getFullYear(),u.getMonth()-1,1),w(t,s,a,n)}),(O=document.getElementById("calendar-next"))==null||O.addEventListener("click",()=>{u=new Date(u.getFullYear(),u.getMonth()+1,1),w(t,s,a,n)}),(q=document.getElementById("delete-selected-button"))==null||q.addEventListener("click",async()=>{const e=Array.from(document.querySelectorAll(".event-check:checked")).map(l=>Number.parseInt(l.value,10)).filter(l=>Number.isInteger(l)&&l>0);if(!(e.length===0||!window.confirm(`Delete ${e.length} selected visit row(s)?`)))try{await h("/api/stats/events",{method:"DELETE",body:JSON.stringify({eventIds:e})}),await g()}catch(l){window.alert(l.message||"Failed to delete selected rows.")}})}let D=null,v=1,C=20,m="week",u=new Date(new Date().getFullYear(),new Date().getMonth(),1);function E(){D&&(clearInterval(D),D=null)}async function g(){var t;try{const[s,a,n,i]=await Promise.all([h("/api/stats/summary"),h("/api/stats/daily?days=30"),h(`/api/stats/recent?page=${v}&perPage=${C}`),h("/api/stats/daily?days=365")]);(t=n==null?void 0:n.paging)!=null&&t.page&&(v=n.paging.page),w(s,a,n,i)}catch(s){E(),N(s.message)}}async function vt(){P.innerHTML='<main class="stats-container"><section class="stats-card"><p>Loading analytics dashboard...</p></section></main>';try{await h("/api/auth/me"),await g(),E(),D=setInterval(g,60*1e3)}catch{N()}}vt();
