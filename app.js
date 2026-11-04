/*
  REFERRALFLOW JAVASCRIPT SECTIONS
  1. Fictional data: referral records used throughout the demo.
  2. Application state: current page, saved view, and selected rows.
  3. Rendering: page-specific markup for every sidebar destination.
  4. Interactions: navigation, search, filters, selection, and quick actions.
  5. Detail drawer: referral summary, tabs, and in-memory edits.
  6. Feedback: bulk undo, mock save state, and toast notifications.
*/ // FICTIONAL DATA: No real patient information is used.
const referrals=[  {
  id:'RF-1048',name:'Maya Bennett',status:'New',source:'Northside Family Practice',service:'Individual therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Review referral',follow:'2026-08-02',days:1
},  {
  id:'RF-1047',name:'Owen Fletcher',status:'Reviewing',source:'Self referral',service:'Couples therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Verify benefits',follow:'2026-08-03',days:2
},  {
  id:'RF-1044',name:'Julian Park',status:'Outreach in Progress',source:'Lakeside Pediatrics',service:'Family therapy',coordinator:'Devon Lee',provider:'Sam Rivera',action:'Second call',follow:'2026-08-02',days:6
},  {
  id:'RF-1042',name:'Amara Cole',status:'Patient Responded',source:'Community Center',service:'Individual therapy',coordinator:'Priya Shah',provider:'Lee Warren',action:'Send intake forms',follow:'2026-08-04',days:7
},  {
  id:'RF-1040',name:'Elena Torres',status:'Missing Information',source:'Northside Family Practice',service:'Individual therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Contact referral source',follow:'2026-08-01',days:9
},  {
  id:'RF-1038',name:'Caleb Vaughn',status:'Ready for Outreach',source:'Self referral',service:'Couples therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Initial call',follow:'2026-08-02',days:10
},  {
  id:'RF-1036',name:'Theo Morgan',status:'Intake Pending',source:'Harbor Primary Care',service:'Family therapy',coordinator:'Devon Lee',provider:'Sam Rivera',action:'Check forms',follow:'2026-08-03',days:12
},  {
  id:'RF-1034',name:'Sofia Kim',status:'Ready to Schedule',source:'University Counseling',service:'Individual therapy',coordinator:'Priya Shah',provider:'Lee Warren',action:'Scheduling handoff',follow:'',days:14
},  {
  id:'RF-1031',name:'Nina Brooks',status:'Ready to Schedule',source:'Self referral',service:'Individual therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Offer openings',follow:'',days:16
},  {
  id:'RF-1028',name:'Micah Stone',status:'Waitlisted',source:'Harbor Primary Care',service:'Individual therapy',coordinator:'Devon Lee',provider:'Lee Warren',action:'Monthly check-in',follow:'2026-08-08',days:23
},  {
  id:'RF-1024',name:'Leila Grant',status:'Scheduled',source:'Northside Family Practice',service:'Couples therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Complete handoff',follow:'',days:27
},  {
  id:'RF-1019',name:'Adrian Wells',status:'Waitlisted',source:'Self referral',service:'Family therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Confirm interest',follow:'2026-08-05',days:34
},  {
  id:'RF-1012',name:'Tessa Monroe',status:'Closed',source:'Community Center',service:'Individual therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'None',follow:'',days:41
},
{
  id:'RF-1049',name:'Eleanor Shaw',status:'New',source:'Northside Family Practice',service:'Individual therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Review referral',follow:'2026-08-02',days:1
},
{
  id:'RF-1050',name:'Miles Bennett',status:'New',source:'Self referral',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Verify benefits',follow:'2026-08-03',days:1
},
{
  id:'RF-1051',name:'Olivia Chen',status:'New',source:'Harbor Primary Care',service:'Family therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Review intake',follow:'2026-08-02',days:2
},
{
  id:'RF-1052',name:'Nathan Brooks',status:'New',source:'Community Center',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Verify insurance',follow:'2026-08-04',days:2
},
{
  id:'RF-1053',name:'Claire Donovan',status:'New',source:'Self referral',service:'Couples therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Review referral',follow:'2026-08-03',days:1
},
{
  id:'RF-1054',name:'Marcus Reid',status:'New',source:'University Counseling',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Confirm contact information',follow:'2026-08-05',days:3
},
{
  id:'RF-1055',name:'Emily Carter',status:'New',source:'Lakeside Pediatrics',service:'Family therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Review intake',follow:'2026-08-02',days:1
},
{
  id:'RF-1056',name:'Benjamin Wyatt',status:'Reviewing',source:'Self referral',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Verify benefits',follow:'2026-08-03',days:4
},
{
  id:'RF-1057',name:'Evelyn Parker',status:'Reviewing',source:'Northside Family Practice',service:'Individual therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Confirm eligibility',follow:'2026-08-04',days:5
},
{
  id:'RF-1058',name:'Daniel Mercer',status:'Reviewing',source:'Harbor Primary Care',service:'Couples therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Review documentation',follow:'2026-08-02',days:6
},
{
  id:'RF-1059',name:'Hannah Collins',status:'Reviewing',source:'Community Center',service:'Family therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Verify insurance',follow:'2026-08-05',days:4
},
{
  id:'RF-1060',name:'Adrian Foster',status:'Reviewing',source:'Self referral',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Confirm service eligibility',follow:'2026-08-03',days:7
},
{
  id:'RF-1061',name:'Rachel Morgan',status:'Missing Information',source:'University Counseling',service:'Individual therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Request missing documentation',follow:'2026-08-01',days:8
},
{
  id:'RF-1062',name:'Lauren Mitchell',status:'Ready for Outreach',source:'Northside Family Practice',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Initial call',follow:'2026-08-03',days:5
},
{
  id:'RF-1063',name:'James Sullivan',status:'Ready for Outreach',source:'Self referral',service:'Couples therapy',coordinator:'Priya Shah',provider:'Unassigned',action:'Send introduction email',follow:'2026-08-04',days:6
},
{
  id:'RF-1064',name:'Natalie Hayes',status:'Ready for Outreach',source:'Harbor Primary Care',service:'Family therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Initial call',follow:'2026-08-02',days:7
},
{
  id:'RF-1065',name:'Rebecca Turner',status:'Outreach in Progress',source:'Self referral',service:'Individual therapy',coordinator:'Priya Shah',provider:'Lee Warren',action:'Second call',follow:'2026-08-03',days:9
},
{
  id:'RF-1066',name:'Samuel Price',status:'Outreach in Progress',source:'Community Center',service:'Individual therapy',coordinator:'Devon Lee',provider:'Sam Rivera',action:'Follow up on voicemail',follow:'2026-08-02',days:11
},
{
  id:'RF-1067',name:'Katherine Ellis',status:'Outreach in Progress',source:'Lakeside Pediatrics',service:'Family therapy',coordinator:'Priya Shah',provider:'Lee Warren',action:'Confirm availability',follow:'2026-08-05',days:10
},
{
  id:'RF-1068',name:'Peter Parker',status:'Outreach in Progress',source:'Self referral',service:'Individual therapy',coordinator:'Devon Lee',provider:'Unassigned',action:'Second outreach attempt',follow:'2026-08-01',days:12
},
{
  id:'RF-1069',name:'Monica Bennett',status:'Patient Responded',source:'Northside Family Practice',service:'Couples therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Send intake forms',follow:'2026-08-04',days:9
},
{
  id:'RF-1070',name:'Jonathan Blake',status:'Patient Responded',source:'University Counseling',service:'Individual therapy',coordinator:'Devon Lee',provider:'Lee Warren',action:'Confirm insurance details',follow:'2026-08-03',days:13
},
{
  id:'RF-1071',name:'Alexandra Rivera',status:'Patient Responded',source:'Harbor Primary Care',service:'Individual therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Schedule intake call',follow:'2026-08-05',days:11
},
{
  id:'RF-1072',name:'Sophia Reynolds',status:'Intake Pending',source:'Self referral',service:'Individual therapy',coordinator:'Devon Lee',provider:'Lee Warren',action:'Check intake forms',follow:'2026-08-04',days:14
},
{
  id:'RF-1073',name:'Thomas Walker',status:'Intake Pending',source:'Northside Family Practice',service:'Family therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Confirm paperwork completion',follow:'2026-08-03',days:15
},
{
  id:'RF-1074',name:'Madison Clark',status:'Intake Pending',source:'Community Center',service:'Couples therapy',coordinator:'Devon Lee',provider:'Lee Warren',action:'Verify consent forms',follow:'2026-08-06',days:12
},
{
  id:'RF-1075',name:'Jessica Pearson',status:'Intake Pending',source:'Self referral',service:'Individual therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Review intake documents',follow:'2026-08-05',days:17
},
{
  id:'RF-1076',name:'Andrew Cooper',status:'Ready to Schedule',source:'Harbor Primary Care',service:'Individual therapy',coordinator:'Devon Lee',provider:'Lee Warren',action:'Offer appointment openings',follow:'2026-08-03',days:16
},
{
  id:'RF-1077',name:'Theodore Mason',status:'Ready to Schedule',source:'Self referral',service:'Couples therapy',coordinator:'Priya Shah',provider:'Sam Rivera',action:'Confirm preferred appointment',follow:'2026-08-04',days:18
},
{
  id:'RF-1078',name:'Danielle Foster',status:'Ready to Schedule',source:'University Counseling',service:'Individual therapy',coordinator:'Devon Lee',provider:'Lee Warren',action:'Scheduling handoff',follow:'2026-08-05',days:19
},
{
  id:'RF-1079',name:'Phoebe Bennett',status:'Waitlisted',source:'Self referral',service:'Individual therapy',coordinator:'Priya Shah',provider:'Lee Warren',action:'Monthly availability check',follow:'2026-08-08',days:25
},
{
  id:'RF-1080',name:'Christopher Hayes',status:'Waitlisted',source:'Northside Family Practice',service:'Family therapy',coordinator:'Devon Lee',provider:'Sam Rivera',action:'Confirm continued interest',follow:'2026-08-09',days:28
},
{
  id:'RF-1081',name:'Victoria Adams',status:'Scheduled',source:'Community Center',service:'Individual therapy',coordinator:'Priya Shah',provider:'Lee Warren',action:'Complete provider handoff',follow:'',days:20
},
{
  id:'RF-1082',name:'Michael Sullivan',status:'Scheduled',source:'Self referral',service:'Couples therapy',coordinator:'Devon Lee',provider:'Sam Rivera',action:'Confirm first appointment',follow:'',days:22
}
];
const pages=['Dashboard','Referrals','Follow-Ups','Waitlist','Import','Reports','Settings'];
let activePage='Dashboard',activeView='All Active',selected=new Set(),lastBulk=[];
const main=document.querySelector('#main'),drawer=document.querySelector('#drawer'),scrim=document.querySelector('#scrim');
const esc=s=>String(s).replace(/[&<>"']/g,c=>( {
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}
[c]));
const badge=s=>`<span class="badge ${s.includes('Ready')?'ready':s==='Scheduled'?'scheduled':s.includes('Missing')?'missing':''}">${esc(s)}</span>`;
const fmt=d=>d?new Date(d+'T12:00:00').toLocaleDateString('en-US', {
  month:'short',day:'numeric'
}):'—';
function init() {
  document.querySelector('#navigation').innerHTML=pages.map(p=>`<button class="nav-item ${p===activePage?'active':''}" data-page="${p}"><span>${p}</span></button>`).join('');
  document.querySelector('#navigation').onclick=e=> {
    const b=e.target.closest('[data-page]');
    if(b) {
      activePage=b.dataset.page;
      render()
    }
  };
  document.querySelector('#saveButton').onclick=save;
  document.querySelector('#newReferral').onclick=()=>toast('New referral form is a prototype placeholder.');
  document.querySelector('#globalSearch').oninput=e=> {
    activePage='Referrals';
    activeView='All Active';
    render(e.target.value)
  };
  scrim.onclick=closeDrawer;
  document.addEventListener('keydown',e=> {
    if(e.key==='Escape')closeDrawer()
  });
  render()
}
function render(search='') {
  document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===activePage));
  const f= {
    Dashboard:dashboard,Referrals:()=>referralsPage(search),'Follow-Ups':followups,Waitlist:waitlist,Import:importPage,Reports:reports,Settings:settings
  }
  [activePage];
  main.innerHTML=`<section class="main-page">${f()}</section>`;
  bind()
}
function head(t,s,a='') {
  return `<header class="page-head"><div><h1>${t}</h1><p>${s}</p></div>${a}</header>`
}

function dashboard() {
  // Fixed reference date for the fictional demo
  const today = '2026-08-02';

  const active = referrals.filter(r => r.status !== 'Closed');

  const newReferrals = active.filter(r => r.status === 'New').length;

  const followupsDue = active.filter(
    r => r.follow && r.follow <= today
  ).length;

  const overdue = active.filter(
    r => r.follow && r.follow < today
  ).length;

  const readyToSchedule = active.filter(
    r => r.status === 'Ready to Schedule'
  ).length;

  const waitlisted = active.filter(
    r => r.status === 'Waitlisted'
  ).length;

  // Sort attention queue by follow-up date
  const attention = active
    .filter(r => r.follow)
    .sort((a, b) => a.follow.localeCompare(b.follow))
    .slice(0, 5);

  // Pipeline stages calculated from referral records
  const pipeline = [
    ['New', active.filter(r => r.status === 'New').length],
    ['Reviewing', active.filter(r =>
      ['Reviewing', 'Missing Information'].includes(r.status)
    ).length],
    ['Outreach', active.filter(r =>
      ['Ready for Outreach', 'Outreach in Progress',
       'Patient Responded'].includes(r.status)
    ).length],
    ['Intake', active.filter(r =>
      r.status === 'Intake Pending'
    ).length],
    ['Ready', readyToSchedule],
    ['Scheduled', active.filter(r =>
      r.status === 'Scheduled'
    ).length],
    ['Waitlisted', waitlisted]
  ];

  const metrics = [
    ['New referrals', newReferrals, 'Review intake', 'Referrals'],
    ['Follow-ups due', followupsDue, 'Due or overdue', 'Follow-Ups'],
    ['Overdue', overdue, 'Needs attention', 'Follow-Ups'],
    ['Ready to schedule', readyToSchedule, 'Begin handoff', 'Referrals'],
    ['Waitlisted', waitlisted, 'Check availability', 'Waitlist']
  ];

  return `
    ${head(
      'Good morning',
      'Here’s what needs attention today.',
      '<span class="muted">August 2, 2026 · Demo</span>'
    )}

    <div class="metric-grid">
      ${metrics.map(([label, count, description, page]) => `
        <button class="metric" data-go="${page}">
          <span>${label}</span>
          <strong>${count}</strong>
          <small>${description} →</small>
        </button>
      `).join('')}
    </div>

    <div class="layout">
      <div class="panel">
        <div class="panel-head">
          <h2>Attention queue</h2>
          <button class="link-button" data-go="Referrals">
            View all
          </button>
        </div>
        ${table(attention, false)}
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2>Recent activity</h2>
        </div>
        <div class="activity">
          <div class="activity-item">
            Insurance verified — Maya B.
            <small>18 minutes ago · Priya</small>
          </div>
          <div class="activity-item">
            Voicemail left — Julian P.
            <small>46 minutes ago · Devon</small>
          </div>
          <div class="activity-item">
            Intake forms received — Theo M.
            <small>Yesterday · Priya</small>
          </div>
          <div class="activity-item">
            Referral scheduled — Leila G.
            <small>Yesterday · Priya</small>
          </div>
        </div>
      </div>

      <div class="panel full">
        <div class="panel-head">
          <h2>Referral pipeline</h2>
          <span class="muted">
            ${active.length} active referrals
          </span>
        </div>

        <div class="pipeline">
          ${pipeline.map(([stage, count]) => `
            <div class="stage">
              <span>${stage}</span>
              <strong>${count}</strong>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function filterData(search='') {
  let data=referrals.filter(r=>activeView==='All Active'?r.status!=='Closed':activeView==='Needs Review'?['Reviewing','Missing Information'].includes(r.status):activeView==='Awaiting Patient'?['Outreach in Progress','Intake Pending'].includes(r.status):r.status===activeView);
  if(search) {
    const q=search.toLowerCase();
    data=data.filter(r=>Object.values(r).join(' ').toLowerCase().includes(q))
  }
  return data
}
function referralsPage(search='') {
  const data=filterData(search);
  return `${head('Referrals',`${data.length} referrals in this view`,'<button class="button">Export view</button>')}<div class="toolbar">${['All Active','New','Needs Review','Awaiting Patient','Ready to Schedule','Waitlisted','Closed'].map(v=>`<button class="chip ${v===activeView?'active':''}" data-view="${v}">${v}</button>`).join('')}<input class="push" id="refSearch" type="search" placeholder="Search this view…" value="${esc(search)}" aria-label="Search referrals"></div><div class="bulk ${selected.size?'visible':''}"><strong>${selected.size} selected</strong><button class="button small" data-bulk="Ready to Schedule">Change status</button><button class="button small" data-bulk="Closed">Close referrals</button></div><div class="panel table-wrap">${table(data,true)}</div>`
}
function table(data,checks) {
  return `<table><thead><tr>${checks?'<th><input id="selectAll" type="checkbox" aria-label="Select all"></th>':''}<th>Referral ID ↕</th><th>Patient ↕</th><th>Status</th><th>Coordinator</th><th>Next action</th><th>Follow-up</th><th>Days</th></tr></thead><tbody>${data.map(r=>`<tr data-id="${r.id}">${checks?`<td><input class="row-check" type="checkbox" data-check="${r.id}" ${selected.has(r.id)?'checked':''} aria-label="Select ${r.name}"></td>`:''}<td>${r.id}</td><td><strong>${r.name}</strong><br><small class="muted">${r.service}</small></td><td>${badge(r.status)}</td><td>${r.coordinator}</td><td>${r.action}</td><td>${fmt(r.follow)}</td><td>${r.days}</td></tr>`).join('')}</tbody></table>`
}
function followups() {
  const groups=[['Overdue',r=>r.follow<'2026-08-02'],['Due Today',r=>r.follow==='2026-08-02'],['Upcoming',r=>r.follow>'2026-08-02']];
  return `${head('Follow-Ups','A task-oriented queue for patient and referral-source outreach.')}<div class="toolbar"><button class="chip active">All owners</button><button class="chip">Awaiting patient</button><button class="chip">Awaiting referral source</button></div>${groups.map(([n,fn])=>`<div class="panel" style="margin-bottom:14px"><div class="panel-head"><h2>${n}</h2><span class="muted">${referrals.filter(r=>r.follow&&fn(r)).length} tasks</span></div><div class="queue">${referrals.filter(r=>r.follow&&fn(r)).slice(0,4).map(r=>`<div class="queue-item"><div><strong>${r.name}</strong><small>${r.id}</small></div><div>${r.action}<small>${r.status}</small></div><div>${fmt(r.follow)}</div><div>${r.coordinator}</div><div><button class="button small" data-complete="${r.id}">Complete</button> <button class="button small" data-reschedule="${r.id}">Reschedule</button></div></div>`).join('')||'<p class="muted">No tasks in this group.</p>'}</div></div>`).join('')}`
}
function waitlist() {
  const data=referrals.filter(r=>r.status==='Waitlisted');
  return `${head('Waitlist',`${data.length} active waitlisted referrals`,'<button class="button primary">Offer appointment</button>')}<div class="toolbar"><input type="search" placeholder="Search waitlist…"><select><option>All providers</option><option>Lee Warren</option><option>Sam Rivera</option></select><button class="chip active">Still interested</button></div><div class="panel table-wrap"><table><thead><tr><th>Patient</th><th>Date added</th><th>Preferred provider</th><th>Availability</th><th>Last check-in</th><th>Next check-in</th><th>Interested</th><th></th></tr></thead><tbody>${data.map(r=>`<tr data-id="${r.id}"><td><strong>${r.name}</strong><br><small>${r.id}</small></td><td>Jul ${10+r.days%12}</td><td>${r.provider}</td><td>Weekday afternoons</td><td>Jul 22</td><td>${fmt(r.follow)}</td><td>${badge('Confirmed')}</td><td><button class="button small" data-offer="${r.id}">Offer appointment</button></td></tr>`).join('')}</tbody></table></div>`
}
function importPage() {
  return `${head('Import referrals','Preview and validate workbook rows before adding them.')}<div class="upload"><h2>Drop a workbook here</h2><p class="muted">Excel workbooks (.xlsx) · Frontend preview only</p><button class="button" id="chooseFile">Choose file</button><p><strong>August_Referrals.xlsx</strong></p></div><div class="validation"><div><span>Valid rows</span><strong>18</strong></div><div><span>Warnings</span><strong>3</strong></div><div><span>Errors</span><strong>1</strong></div><div><span>Duplicates</span><strong>2</strong></div></div><div class="panel"><div class="panel-head"><h2>Import preview</h2><span class="muted">Showing first 4 of 24 rows</span></div>${table(referrals.slice(0,4),false)}<div class="toolbar" style="margin-top:16px"><button class="button">Cancel import</button><button class="button primary" id="importValid">Import 18 valid records</button></div></div>`
}
function reports() {
  const sections=[['Referrals by current stage',[['New',8],['Reviewing',6],['Outreach',11],['Intake',9],['Ready',7],['Scheduled',5]]],['Workload by coordinator',[['Priya Shah',24],['Devon Lee',22]]],['Referral source breakdown',[['Self referral',14],['Primary care',12],['Community partners',9],['University',6]]],['Closure outcomes',[['Scheduled',19],['Unable to reach',7],['Patient declined',5],['Referred elsewhere',3]]]];
  return `${head('Reports','Simple operational summaries for workload and flow.','<button class="button">Export report</button>')}<div class="layout">${sections.map(([title,items])=>`<div class="panel"><div class="panel-head"><h2>${title}</h2></div><div class="bars">${items.map(([label,n])=>`<div class="bar-row"><span>${label}</span><div class="bar"><i style="width:${Math.min(100,n*4)}%"></i></div><strong>${n}</strong></div>`).join('')}</div></div>`).join('')}<div class="panel full"><div class="panel-head"><h2>Referral aging</h2><span class="muted">Active referrals</span></div><div class="pipeline">${[['0–7 days',18],['8–14 days',12],['15–30 days',9],['31+ days',7]].map(x=>`<div class="stage"><span>${x[0]}</span><strong>${x[1]}</strong></div>`).join('')}</div></div></div>`
}
function settings() {
  const items=[['Office Information','Name, contact information, and default location'],['Coordinators','Manage referral owners and workload'],['Providers','Provider availability and assignment options'],['Locations','Office and telehealth locations'],['Services','Requested-service dropdown choices'],['Insurance Carriers','Accepted carrier reference list'],['Dropdown Options','Customize reusable field choices'],['Workflow Rules','Statuses, actions, and follow-up timing'],['Data and Backup','Workbook location and local backups']];
  return `${head('Settings','Configure the local ReferralFlow workspace.')}<div class="settings-grid">${items.map(([t,d])=>`<button class="setting-card" data-setting="${t}"><span>□</span><h2>${t}</h2><p>${d}</p></button>`).join('')}</div>`
}
function bind() {
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=> {
    activePage=b.dataset.go;
    render()
  });
  document.querySelectorAll('tr[data-id]').forEach(r=>r.onclick=e=> {
    if(!e.target.matches('input,button'))openDrawer(r.dataset.id)
  });
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=> {
    activeView=b.dataset.view;
    selected.clear();
    render()
  });
const rs = document.querySelector('#refSearch');

if (rs) {
  rs.oninput = e => {
    const search = e.target.value;
    const cursor = e.target.selectionStart;

    render(search);

    const newSearch = document.querySelector('#refSearch');

    if (newSearch) {
      newSearch.focus();
      newSearch.setSelectionRange(cursor, cursor);
    }
  };
}
  document.querySelectorAll('.row-check').forEach(c=>c.onchange=()=> {
    c.checked?selected.add(c.dataset.check):selected.delete(c.dataset.check);
    render(rs?.value||'')
  });
  const all=document.querySelector('#selectAll');
  if(all)all.onchange=()=> {
    filterData(rs?.value||'').forEach(r=>all.checked?selected.add(r.id):selected.delete(r.id));
    render(rs?.value||'')
  };
  document.querySelectorAll('[data-bulk]').forEach(b=>b.onclick=()=>bulk(b.dataset.bulk));
  document.querySelectorAll('[data-complete]').forEach(b=>b.onclick=()=>toast('Follow-up completed.','Undo'));
  document.querySelectorAll('[data-reschedule]').forEach(b=>b.onclick=()=>toast('Follow-up moved to tomorrow.','Undo'));
  document.querySelectorAll('[data-offer]').forEach(b=>b.onclick=()=>toast('Appointment offer noted.'));
  document.querySelectorAll('[data-setting]').forEach(b=>b.onclick=()=>toast(`${b.dataset.setting} is a prototype placeholder.`));
  document.querySelector('#chooseFile')?.addEventListener('click',()=>toast('File selection is a frontend mockup.'));
  document.querySelector('#importValid')?.addEventListener('click',()=>toast('18 fictional records imported.','Undo'))
}
function openDrawer(id) {
  const r=referrals.find(x=>x.id===id);
  if(!r)return;
  drawer.innerHTML=`<div class="drawer-head"><div><h2>${r.name}</h2><span>${r.id} · ${badge(r.status)}</span></div><button class="button" id="closeDrawer" aria-label="Close details">×</button></div><div class="drawer-content"><dl class="summary"><div><dt>Assigned coordinator</dt><dd>${r.coordinator}</dd></div><div><dt>Assigned provider</dt><dd>${r.provider}</dd></div><div><dt>Next action</dt><dd>${r.action}</dd></div><div><dt>Follow-up date</dt><dd>${fmt(r.follow)}</dd></div><div><dt>Days open</dt><dd>${r.days}</dd></div></dl><div class="progress">${['Received','Reviewed','Contacted','Intake','Ready','Scheduled'].map((x,i)=>`<span class="${i<2?'done':''}">${x}</span>`).join('')}</div><div class="tabs">${['Overview','Contact','Insurance','Intake','Activity'].map((x,i)=>`<button class="tab ${i===0?'active':''}" data-tab="${x}">${x}</button>`).join('')}</div><div class="tab-content" id="tabContent"><strong>Referral source</strong><p>${r.source}</p><strong>Requested service</strong><p>${r.service}</p></div><h3>Quick actions</h3><div class="quick-actions"><button class="button" id="changeStatus">Change status</button><button class="button" id="setFollow">Set follow-up</button><button class="button">Assign coordinator</button><button class="button">Assign provider</button><button class="button">Add activity</button><button class="button danger">Close referral</button></div></div>`;
  drawer.classList.add('open');
  scrim.classList.add('open');
  drawer.setAttribute('aria-hidden','false');
  document.querySelector('#closeDrawer').onclick=closeDrawer;
  document.querySelectorAll('[data-tab]').forEach(t=>t.onclick=()=> {
    document.querySelectorAll('[data-tab]').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    document.querySelector('#tabContent').innerHTML=`<p>${t.dataset.tab} information for this fictional referral will appear here.</p>`
  });
  document.querySelector('#changeStatus').onclick=()=> {
    r.status=r.status==='Ready to Schedule'?'Scheduled':'Ready to Schedule';
    markDirty();
    toast(`Status changed to ${r.status}.`);
    openDrawer(id)
  };
  document.querySelector('#setFollow').onclick=()=> {
    r.follow='2026-08-06';
    markDirty();
    toast('Follow-up set for Aug 6.');
    openDrawer(id)
  }
}
function closeDrawer() {
  drawer.classList.remove('open');
  scrim.classList.remove('open');
  drawer.setAttribute('aria-hidden','true')
}
function bulk(status) {
  lastBulk=[...selected].map(id=>[id,referrals.find(r=>r.id===id).status]);
  lastBulk.forEach(([id])=>referrals.find(r=>r.id===id).status=status);
  selected.clear();
  markDirty();
  render();
  toast(`Bulk action applied to ${lastBulk.length} referrals.`,'Undo',()=> {
    lastBulk.forEach(([id,s])=>referrals.find(r=>r.id===id).status=s);
    render()
  })
}
function markDirty() {
  document.querySelector('#saveState').textContent='Unsaved changes'
}
function save() {
  document.querySelector('#saveState').textContent='All changes saved';
  toast('Workspace saved locally (mock).')
}
function toast(message,action,callback) {
  const t=document.createElement('div');
  t.className='toast';
  t.innerHTML=`${esc(message)}${action?`<button>${action}</button>`:''}`;
  document.querySelector('#toasts').append(t);
  if(action)t.querySelector('button').onclick=()=> {
    callback?.();
    t.remove()
  };
  setTimeout(()=>t.remove(),4200)
}
init();
