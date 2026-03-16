const desktopApps=[
{id:'explorer',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>',label:'Files',desk:true,menu:true},
{id:'browser',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',label:'EPICCUSTAMBROSWER',desk:true,menu:true},
{id:'terminal',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8l4 4-4 4M13 16h4"/></svg>',label:'Terminal',desk:false,menu:true},
{id:'texteditor',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/></svg>',label:'hackerman notepad',desk:true,menu:true},
{id:'mediaplayer',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5,3 19,12 5,21"/></svg>',label:'Media',desk:false,menu:true},
{id:'imageviewer',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>',label:'Gallery',desk:false,menu:true},
{id:'chat',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',label:'Chat',desk:true,menu:true},
{id:'email',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>',label:'Mail',desk:true,menu:true},
{id:'settings',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',label:'Settings',desk:false,menu:true},
{id:'calculator',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><rect x="7" y="5" width="10" height="5"/><circle cx="8" cy="14" r=".5" fill="currentColor"/><circle cx="12" cy="14" r=".5" fill="currentColor"/><circle cx="16" cy="14" r=".5" fill="currentColor"/><circle cx="8" cy="18" r=".5" fill="currentColor"/><circle cx="12" cy="18" r=".5" fill="currentColor"/><circle cx="16" cy="18" r=".5" fill="currentColor"/></svg>',label:'Calc',desk:false,menu:true},
{id:'paint',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',label:'Paint',desk:false,menu:true},
{id:'tf2',icon:'<span style="font-size:24px;color:#999">?</span>',label:'TF2',desk:true,menu:true},
{id:'steam',icon:'<span style="font-size:24px;color:#999">?</span>',label:'Steam',desk:true,menu:true},
{id:'limewire',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>',label:'LimeWire',desk:true,menu:true},
{id:'fraps',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',label:'Fraps',desk:true,menu:true},
{id:'winrar',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M10 2v20M10 6h4M10 10h4M10 14h4"/></svg>',label:'WinRAR',desk:true,menu:true},
{id:'audacity',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 12h2l2-4 2 8 2-6 2 4 2-2 2 6 2-8 2 4h2"/></svg>',label:'Audacity',desk:true,menu:true},
{id:'mirc',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9 9 9 0 019 9z"/><path d="M8 12h8M12 8v8"/></svg>',label:'mIRC',desk:true,menu:true},
{id:'recyclebin',icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>',label:'Recycle Bin',desk:true,menu:false},
{id:'platformer',icon:'<span style="font-size:24px;color:#ff0">&#9733;</span>',label:'SUPER DUST MAN',desk:true,menu:true},
{id:'snake',icon:'<span style="font-size:24px;color:#0f0">&#9632;</span>',label:'Snake',desk:true,menu:true}
];
let startOpen=false;
const initDesktop=()=>{
document.getElementById('desktop').classList.remove('hidden');
const iconsEl=document.getElementById('desktop-icons');
iconsEl.innerHTML='';
const appsToShow=typeof pcState!=='undefined'&&pcState===2?[...desktopApps,{id:'home',icon:'<span style="font-size:24px;color:#999">&#9751;</span>',label:'home',desk:true,menu:true}]:desktopApps;
appsToShow.forEach((app)=>{
if(!app.desk)return;
const d=document.createElement('div');
d.className='desktop-icon';
d.innerHTML=`<div class="desktop-icon-img">${app.icon}</div><div class="desktop-icon-label">${app.label}</div>`;
d.addEventListener('click',()=>openApp(app.id));
// draggable
let dragging=false,ox,oy,sx,sy;
d.addEventListener('mousedown',(e)=>{
dragging=false;ox=e.clientX;oy=e.clientY;
sx=d.offsetLeft;sy=d.offsetTop;
const move=(ev)=>{
const dx=ev.clientX-ox,dy=ev.clientY-oy;
if(Math.abs(dx)>4||Math.abs(dy)>4){
dragging=true;
d.style.position='absolute';
d.style.left=(sx+dx)+'px';
d.style.top=(sy+dy)+'px';
d.style.zIndex='12';
}
};
const up=()=>{
document.removeEventListener('mousemove',move);
document.removeEventListener('mouseup',up);
if(dragging){e.preventDefault();e.stopPropagation()}
};
document.addEventListener('mousemove',move);
document.addEventListener('mouseup',up);
});
iconsEl.appendChild(d);
});
const menuEl=document.getElementById('start-menu-apps');
menuEl.innerHTML='';
appsToShow.forEach((app)=>{
if(!app.menu)return;
const b=document.createElement('button');
b.className='start-menu-item';
b.innerHTML=`<span class="start-menu-item-icon">${app.icon}</span><span class="start-menu-item-label">${app.label}</span>`;
b.addEventListener('click',()=>{openApp(app.id);toggleStart(false)});
menuEl.appendChild(b);
});
document.getElementById('start-menu-user').textContent='TheDustBwlDuck';
const clockText=typeof pcState!=='undefined'&&pcState===2?'12:06 AM  5/28/2010':'7:42 PM  9/30/2010';
document.getElementById('tray-clock').textContent=clockText;
// easter egg: click clock
document.getElementById('tray-clock').style.cursor='pointer';
document.getElementById('tray-clock').onclick=()=>{
if(typeof pcState!=='undefined'&&pcState===2){
document.getElementById('tray-clock').textContent='00:00  5/28/2010';
setTimeout(()=>{document.getElementById('tray-clock').textContent='12:06 AM  5/28/2010'},3000);
}
};
document.getElementById('start-btn').onclick=(e)=>{e.stopPropagation();toggleStart(!startOpen)};
document.onclick=(e)=>{if(startOpen&&!document.getElementById('start-menu').contains(e.target)&&e.target!==document.getElementById('start-btn')){toggleStart(false)}};
document.getElementById('start-shutdown').onclick=doShutdown;
if(typeof pcState!=='undefined'&&pcState===2){document.getElementById('desktop').classList.add('corrupted-flicker')}
};
const toggleStart=(show)=>{
startOpen=show;
const m=document.getElementById('start-menu');
show?m.classList.remove('hidden'):m.classList.add('hidden');
};
const doShutdown=()=>{
if(typeof pcState!=='undefined'&&pcState===2){
// cant leave in corrupted mode
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:Tahoma,sans-serif;font-size:14px;color:#fff;text-align:center">you can\'t leave.</div>';
overlay.style.background='#000';
setTimeout(()=>{overlay.classList.add('hidden');overlay.innerHTML=''},2500);
toggleStart(false);
return;
}
toggleStart(false);
closeAllWindows();
document.getElementById('desktop').classList.add('hidden');
document.getElementById('shutdown-screen').classList.remove('hidden');
};
// konami code easter egg
let konamiSeq=[];
const konamiCode=['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
document.addEventListener('keydown',(e)=>{
konamiSeq.push(e.key);
if(konamiSeq.length>10)konamiSeq.shift();
if(konamiSeq.join(',')=== konamiCode.join(',')){
konamiSeq=[];
openTextEditor('you found it.\n\n201\n\nthe password is the key to everything.\n\n- TheDustBwlDuck','secret.txt');
}
});
