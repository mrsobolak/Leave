const desktopApps=[
{id:'explorer',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>',label:'Files',desk:true},
{id:'browser',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',label:'Browser',desk:true},
{id:'terminal',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8l4 4-4 4M13 16h4"/></svg>',label:'Terminal',desk:true},
{id:'texteditor',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>',label:'Notes',desk:false},
{id:'mediaplayer',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5,3 19,12 5,21"/></svg>',label:'Media',desk:true},
{id:'imageviewer',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',label:'Gallery',desk:true},
{id:'chat',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',label:'Chat',desk:true},
{id:'email',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',label:'Mail',desk:true},
{id:'settings',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',label:'Settings',desk:false},
{id:'calculator',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><rect x="7" y="5" width="10" height="5"/><circle cx="8" cy="14" r=".5" fill="currentColor"/><circle cx="12" cy="14" r=".5" fill="currentColor"/><circle cx="16" cy="14" r=".5" fill="currentColor"/><circle cx="8" cy="18" r=".5" fill="currentColor"/><circle cx="12" cy="18" r=".5" fill="currentColor"/><circle cx="16" cy="18" r=".5" fill="currentColor"/></svg>',label:'Calc',desk:false},
{id:'paint',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',label:'Paint',desk:false},
{id:'tf2',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 7h8v2h-3v8h-2V9H8V7z"/></svg>',label:'TF2',desk:true},
{id:'steam',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 18.5A6 6 0 0112 14a6 6 0 015 4.5"/></svg>',label:'Steam',desk:true}
];
let startOpen=false;
const initDesktop=()=>{
document.getElementById('desktop').classList.remove('hidden');
const iconsEl=document.getElementById('desktop-icons');
desktopApps.forEach((app)=>{
if(!app.desk)return;
const d=document.createElement('div');
d.className='desktop-icon';
d.innerHTML=`<div class="desktop-icon-img">${app.icon}</div><div class="desktop-icon-label">${app.label}</div>`;
d.addEventListener('dblclick',()=>openApp(app.id));
iconsEl.appendChild(d);
});
const menuEl=document.getElementById('start-menu-apps');
desktopApps.forEach((app)=>{
const b=document.createElement('button');
b.className='start-menu-item';
b.innerHTML=`<span class="start-menu-item-icon">${app.icon}</span><span class="start-menu-item-label">${app.label}</span>`;
b.addEventListener('click',()=>{openApp(app.id);toggleStart(false)});
menuEl.appendChild(b);
});
document.getElementById('start-menu-user').textContent='TheDustBwlDuck';
document.getElementById('tray-clock').textContent='12:06 AM  5/28/2007';
document.getElementById('start-btn').addEventListener('click',(e)=>{e.stopPropagation();toggleStart(!startOpen)});
document.addEventListener('click',(e)=>{if(startOpen&&!document.getElementById('start-menu').contains(e.target)){toggleStart(false)}});
document.getElementById('start-shutdown').addEventListener('click',doShutdown);
};
const toggleStart=(show)=>{
startOpen=show;
const m=document.getElementById('start-menu');
show?m.classList.remove('hidden'):m.classList.add('hidden');
};
const doShutdown=()=>{
toggleStart(false);
closeAllWindows();
document.getElementById('desktop').classList.add('hidden');
document.getElementById('shutdown-screen').classList.remove('hidden');
};
