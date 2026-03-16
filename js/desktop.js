const desktopApps=[
{id:'explorer',icon:'<svg viewBox="0 0 24 24"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" fill="#e8c84a" stroke="#b8960a" stroke-width="1"/></svg>',label:'Files',desk:true,menu:true},
{id:'browser',icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#4488cc" stroke="#2266aa" stroke-width="1"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" fill="none" stroke="#fff" stroke-width="1" opacity="0.6"/></svg>',label:'EPICCUSTAMBROSWER',desk:true,menu:true},
{id:'terminal',icon:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#1a1a1a" stroke="#555" stroke-width="1"/><path d="M7 8l4 4-4 4" fill="none" stroke="#0f0" stroke-width="1.5"/><path d="M13 16h4" stroke="#0f0" stroke-width="1.5"/></svg>',label:'Terminal',desk:false,menu:true},
{id:'texteditor',icon:'<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" fill="#ddd" stroke="#888" stroke-width="1"/><path d="M14 2v6h6" fill="#bbb" stroke="#888" stroke-width="1"/><path d="M8 13h8M8 17h8" stroke="#666" stroke-width="1"/></svg>',label:'hackerman notepad',desk:true,menu:true},
{id:'mediaplayer',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#2a2a5a"/><polygon points="9,6 18,12 9,18" fill="#6cf"/></svg>',label:'Media',desk:false,menu:true},
{id:'imageviewer',icon:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" fill="#2a4a2a" stroke="#4a8a4a" stroke-width="1"/><circle cx="8.5" cy="8.5" r="1.5" fill="#ee4"/><path d="M21 15l-5-5L5 21" fill="#4a8a4a"/></svg>',label:'Gallery',desk:false,menu:true},
{id:'chat',icon:'<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="#5b9bd5" stroke="#3a7ab5" stroke-width="1"/><path d="M8 8h8M8 12h5" stroke="#fff" stroke-width="1" opacity="0.7"/></svg>',label:'Chat',desk:true,menu:true},
{id:'email',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" fill="#d4a84a" stroke="#b48828" stroke-width="1"/><path d="M22 4l-10 8L2 4" fill="none" stroke="#fff" stroke-width="1" opacity="0.6"/></svg>',label:'Mail',desk:true,menu:true},
{id:'settings',icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="#888"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" fill="none" stroke="#999" stroke-width="1.5"/></svg>',label:'Settings',desk:false,menu:true},
{id:'calculator',icon:'<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" fill="#555" stroke="#777" stroke-width="1"/><rect x="7" y="5" width="10" height="4" rx="1" fill="#8cb88c"/><circle cx="8" cy="13" r="1" fill="#aaa"/><circle cx="12" cy="13" r="1" fill="#aaa"/><circle cx="16" cy="13" r="1" fill="#aaa"/><circle cx="8" cy="17" r="1" fill="#aaa"/><circle cx="12" cy="17" r="1" fill="#aaa"/><circle cx="16" cy="17" r="1" fill="#e88"/></svg>',label:'Calc',desk:false,menu:true},
{id:'paint',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" fill="#fff" stroke="#888" stroke-width="1"/><circle cx="7" cy="17" r="2" fill="#e33"/><circle cx="12" cy="15" r="2" fill="#33e"/><circle cx="10" cy="10" r="2" fill="#ee3"/><circle cx="16" cy="12" r="2" fill="#3c3"/><path d="M17 4l2 2-8 8-2-2z" fill="#333"/></svg>',label:'Paint',desk:false,menu:true},
{id:'tf2',icon:'<span style="font-size:24px;color:#999">?</span>',label:'TF2',desk:true,menu:true},
{id:'steam',icon:'<span style="font-size:24px;color:#999">?</span>',label:'Steam',desk:true,menu:true},
{id:'limewire',icon:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2d7a2d" stroke="#1a5a1a" stroke-width="1"/><path d="M8 12l3 3 5-5" fill="none" stroke="#fff" stroke-width="2"/></svg>',label:'LimeWire',desk:true,menu:true},
{id:'fraps',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#2b2b2b" stroke="#444" stroke-width="1"/><text x="12" y="16" text-anchor="middle" fill="#f0ad4e" font-family="Arial" font-weight="bold" font-size="11">fps</text></svg>',label:'Fraps',desk:true,menu:true},
{id:'winrar',icon:'<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2" fill="#6a5acd" stroke="#4a3aad" stroke-width="1"/><rect x="10" y="4" width="4" height="3" fill="#fff" opacity="0.3"/><rect x="10" y="9" width="4" height="3" fill="#fff" opacity="0.3"/><rect x="10" y="14" width="4" height="3" fill="#fff" opacity="0.3"/></svg>',label:'WinRAR',desk:true,menu:true},
{id:'audacity',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#2244aa" stroke="#1a3388" stroke-width="1"/><path d="M4 12h2l1.5-4 1.5 8 1.5-6 1.5 4 1.5-2 1.5 6 1.5-8 1.5 4H20" fill="none" stroke="#ff8800" stroke-width="1.5"/></svg>',label:'Audacity',desk:true,menu:true},
{id:'mirc',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#fff" stroke="#888" stroke-width="1"/><text x="12" y="15" text-anchor="middle" fill="#228b22" font-family="Arial" font-weight="bold" font-size="8">mIRC</text></svg>',label:'mIRC',desk:true,menu:true},
{id:'recyclebin',icon:'<svg viewBox="0 0 24 24"><path d="M6 6l1 14a2 2 0 002 2h6a2 2 0 002-2l1-14" fill="#8899aa" stroke="#667788" stroke-width="1"/><rect x="5" y="4" width="14" height="2" rx="1" fill="#667788"/><rect x="9" y="2" width="6" height="2" rx="1" fill="#667788"/></svg>',label:'Recycle Bin',desk:true,menu:false},
{id:'platformer',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#1a0a2e" stroke="#5a3a8e" stroke-width="1"/><rect x="10" y="8" width="4" height="5" fill="#44aaff"/><rect x="10" y="6" width="4" height="2" fill="#ffcc00"/><rect x="7" y="14" width="10" height="2" fill="#4a2a6e"/></svg>',label:'SUPER DUST MAN',desk:true,menu:true},
{id:'snake',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#0a0a0a" stroke="#333" stroke-width="1"/><rect x="6" y="10" width="4" height="4" fill="#0f0"/><rect x="10" y="10" width="4" height="4" fill="#0c0"/><rect x="14" y="10" width="4" height="4" fill="#0a0"/><rect x="16" y="6" width="4" height="4" fill="#f00"/></svg>',label:'Snake',desk:true,menu:true},
{id:'chatroom',icon:'<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="#2a4a7a" stroke="#1a3a6a" stroke-width="1"/><path d="M6 7h12M6 10h10M6 13h8M6 16h11" stroke="#8ab" stroke-width="1"/></svg>',label:'Chatroom',desk:true,menu:true}
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
if(typeof initCubey==='function')initCubey();
};
const toggleStart=(show)=>{
startOpen=show;
const m=document.getElementById('start-menu');
show?m.classList.remove('hidden'):m.classList.add('hidden');
};
const doShutdown=()=>{
if(typeof window._cubeyShutdownReact==='function')window._cubeyShutdownReact();
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
