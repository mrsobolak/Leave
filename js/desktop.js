const desktopApps=[
{id:'explorer',icon:'📁',label:'Files',desk:true},
{id:'browser',icon:'🌐',label:'Browser',desk:true},
{id:'terminal',icon:'▶',label:'Terminal',desk:true},
{id:'texteditor',icon:'📄',label:'Notes',desk:false},
{id:'mediaplayer',icon:'▶️',label:'Media',desk:true},
{id:'imageviewer',icon:'🖼',label:'Gallery',desk:true},
{id:'chat',icon:'💬',label:'Chat',desk:true},
{id:'email',icon:'✉',label:'Mail',desk:true},
{id:'settings',icon:'⚙',label:'Settings',desk:false},
{id:'calculator',icon:'🧮',label:'Calc',desk:false},
{id:'paint',icon:'🎨',label:'Paint',desk:false}
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
document.getElementById('tray-clock').textContent='12:06 AM  5/28/2008';
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
