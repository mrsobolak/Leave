var desktopApps=[
{id:'explorer',icon:'\uD83D\uDCC1',label:'Files',desk:true},
{id:'browser',icon:'\uD83C\uDF10',label:'Browser',desk:true},
{id:'terminal',icon:'\u25B6',label:'Terminal',desk:true},
{id:'texteditor',icon:'\uD83D\uDCC4',label:'Notes',desk:false},
{id:'mediaplayer',icon:'\u25B6\uFE0F',label:'Media',desk:true},
{id:'imageviewer',icon:'\uD83D\uDDBC',label:'Gallery',desk:true},
{id:'chat',icon:'\uD83D\uDCAC',label:'Chat',desk:true},
{id:'email',icon:'\u2709',label:'Mail',desk:true},
{id:'settings',icon:'\u2699',label:'Settings',desk:false},
{id:'calculator',icon:'\uD83E\uDDEE',label:'Calc',desk:false},
{id:'paint',icon:'\uD83C\uDFA8',label:'Paint',desk:false}
];
var startOpen=false;
function initDesktop(){
document.getElementById('desktop').classList.remove('hidden');
var iconsEl=document.getElementById('desktop-icons');
desktopApps.forEach(function(app){
if(!app.desk)return;
var d=document.createElement('div');
d.className='desktop-icon';
d.innerHTML='<div class="desktop-icon-img">'+app.icon+'</div><div class="desktop-icon-label">'+app.label+'</div>';
d.addEventListener('dblclick',function(){openApp(app.id)});
iconsEl.appendChild(d);
});
var menuEl=document.getElementById('start-menu-apps');
desktopApps.forEach(function(app){
var b=document.createElement('button');
b.className='start-menu-item';
b.innerHTML='<span class="start-menu-item-icon">'+app.icon+'</span><span class="start-menu-item-label">'+app.label+'</span>';
b.addEventListener('click',function(){openApp(app.id);toggleStart(false)});
menuEl.appendChild(b);
});
document.getElementById('start-menu-user').textContent='TheDustBwlDuck';
document.getElementById('tray-clock').textContent='12:06 AM  5/28/2008';
document.getElementById('start-btn').addEventListener('click',function(e){e.stopPropagation();toggleStart(!startOpen)});
document.addEventListener('click',function(e){if(startOpen&&!document.getElementById('start-menu').contains(e.target)){toggleStart(false)}});
document.getElementById('start-shutdown').addEventListener('click',doShutdown);
}
function toggleStart(show){
startOpen=show;
var m=document.getElementById('start-menu');
if(show){m.classList.remove('hidden')}else{m.classList.add('hidden')}
}
function doShutdown(){
toggleStart(false);
closeAllWindows();
document.getElementById('desktop').classList.add('hidden');
document.getElementById('shutdown-screen').classList.remove('hidden');
}
