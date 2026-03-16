const openWindows={};
let winZIndex=100;
let activeWinId=null;
const createWindow=(id,title,width,height,contentHtml)=>{
if(openWindows[id]){focusWindow(id);return openWindows[id]}
const w=document.createElement('div');
w.className='app-window';
w.id=`win-${id}`;
w.style.width=`${Math.min(width,window.innerWidth-40)}px`;
w.style.height=`${Math.min(height,window.innerHeight-80)}px`;
const maxL=Math.max(0,window.innerWidth-width-20);
const maxT=Math.max(0,window.innerHeight-height-80);
w.style.left=`${Math.min(40+Math.random()*200,maxL)}px`;
w.style.top=`${Math.min(20+Math.random()*100,maxT)}px`;
const tb=document.createElement('div');
tb.className='window-titlebar';
const tt=document.createElement('span');
tt.className='window-title';
tt.textContent=title;
const ctrls=document.createElement('div');
ctrls.className='window-controls';
const minBtn=document.createElement('button');
minBtn.className='window-ctrl-btn';
minBtn.innerHTML='\u2014';
minBtn.addEventListener('click',(e)=>{e.stopPropagation();minimizeWindow(id)});
const maxBtn=document.createElement('button');
maxBtn.className='window-ctrl-btn';
maxBtn.innerHTML='\u25A1';
maxBtn.addEventListener('click',(e)=>{e.stopPropagation();maximizeWindow(id)});
const clsBtn=document.createElement('button');
clsBtn.className='window-ctrl-btn close-btn';
clsBtn.innerHTML='\u00D7';
clsBtn.addEventListener('click',(e)=>{e.stopPropagation();closeWindow(id)});
ctrls.appendChild(minBtn);
ctrls.appendChild(maxBtn);
ctrls.appendChild(clsBtn);
tb.appendChild(tt);
tb.appendChild(ctrls);
const body=document.createElement('div');
body.className='window-body';
body.innerHTML=contentHtml;
const rh=document.createElement('div');
rh.className='window-resize-handle';
w.appendChild(tb);
w.appendChild(body);
w.appendChild(rh);
document.getElementById('windows-area').appendChild(w);
openWindows[id]={el:w,minimized:false,maximized:false,preMax:null};
makeDraggable(w,tb,id);
makeResizable(w,rh);
w.addEventListener('mousedown',()=>focusWindow(id));
focusWindow(id);
addTaskbarBtn(id,title);
return openWindows[id];
};
const focusWindow=(id)=>{
if(!openWindows[id])return;
if(activeWinId&&openWindows[activeWinId]){openWindows[activeWinId].el.classList.remove('focused')}
winZIndex++;
openWindows[id].el.style.zIndex=winZIndex;
openWindows[id].el.classList.add('focused');
activeWinId=id;
if(openWindows[id].minimized){
openWindows[id].el.style.display='flex';
openWindows[id].minimized=false;
}
document.querySelectorAll('.taskbar-app-btn').forEach((b)=>b.classList.toggle('active',b.dataset.appId===id));
};
const minimizeWindow=(id)=>{
if(!openWindows[id])return;
openWindows[id].el.style.display='none';
openWindows[id].minimized=true;
};
const maximizeWindow=(id)=>{
if(!openWindows[id])return;
const w=openWindows[id];
if(w.maximized){
w.el.classList.remove('window-maximized');
if(w.preMax){w.el.style.left=w.preMax.l;w.el.style.top=w.preMax.t;w.el.style.width=w.preMax.w;w.el.style.height=w.preMax.h}
w.maximized=false;
}else{
w.preMax={l:w.el.style.left,t:w.el.style.top,w:w.el.style.width,h:w.el.style.height};
w.el.classList.add('window-maximized');
w.maximized=true;
}
};
const closeWindow=(id)=>{
if(!openWindows[id])return;
openWindows[id].el.remove();
delete openWindows[id];
removeTaskbarBtn(id);
if(activeWinId===id)activeWinId=null;
};
const closeAllWindows=()=>{Object.keys(openWindows).forEach(closeWindow)};
const addTaskbarBtn=(id,title)=>{
const b=document.createElement('button');
b.className='taskbar-app-btn active';
b.dataset.appId=id;
b.textContent=title;
b.addEventListener('click',()=>{
if(openWindows[id]){
if(openWindows[id].minimized){focusWindow(id)}
else if(activeWinId===id){minimizeWindow(id)}
else{focusWindow(id)}
}
});
document.getElementById('taskbar-apps').appendChild(b);
};
const removeTaskbarBtn=(id)=>{
document.querySelector(`.taskbar-app-btn[data-app-id="${id}"]`)?.remove();
};
const makeDraggable=(win,handle,id)=>{
let ox,oy,sx,sy,dragging=false;
handle.addEventListener('mousedown',(e)=>{
if(openWindows[id]?.maximized)return;
dragging=true;
ox=e.clientX;oy=e.clientY;
sx=win.offsetLeft;sy=win.offsetTop;
e.preventDefault();
});
document.addEventListener('mousemove',(e)=>{
if(!dragging)return;
let nx=sx+(e.clientX-ox);
let ny=sy+(e.clientY-oy);
nx=Math.max(-win.offsetWidth+100,Math.min(nx,window.innerWidth-100));
ny=Math.max(0,Math.min(ny,window.innerHeight-80));
win.style.left=`${nx}px`;
win.style.top=`${ny}px`;
});
document.addEventListener('mouseup',()=>{dragging=false});
};
const makeResizable=(win,handle)=>{
let ox,oy,sw,sh,resizing=false;
handle.addEventListener('mousedown',(e)=>{
resizing=true;
ox=e.clientX;oy=e.clientY;
sw=win.offsetWidth;sh=win.offsetHeight;
e.preventDefault();
e.stopPropagation();
});
document.addEventListener('mousemove',(e)=>{
if(!resizing)return;
const nw=Math.max(320,Math.min(sw+(e.clientX-ox),window.innerWidth-win.offsetLeft));
const nh=Math.max(200,Math.min(sh+(e.clientY-oy),window.innerHeight-win.offsetTop-40));
win.style.width=`${nw}px`;
win.style.height=`${nh}px`;
});
document.addEventListener('mouseup',()=>{resizing=false});
};
