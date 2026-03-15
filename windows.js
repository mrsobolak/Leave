var openWindows={};
var winZIndex=100;
var activeWinId=null;
function createWindow(id,title,width,height,contentHtml){
if(openWindows[id]){focusWindow(id);return openWindows[id]}
var w=document.createElement('div');
w.className='app-window';
w.id='win-'+id;
w.style.width=width+'px';
w.style.height=height+'px';
w.style.left=Math.max(40,Math.random()*300)+'px';
w.style.top=Math.max(20,Math.random()*200)+'px';
var tb=document.createElement('div');
tb.className='window-titlebar';
var tt=document.createElement('span');
tt.className='window-title';
tt.textContent=title;
var ctrls=document.createElement('div');
ctrls.className='window-controls';
var minBtn=document.createElement('button');
minBtn.className='window-ctrl-btn';
minBtn.innerHTML='_';
minBtn.addEventListener('click',function(e){e.stopPropagation();minimizeWindow(id)});
var maxBtn=document.createElement('button');
maxBtn.className='window-ctrl-btn';
maxBtn.innerHTML='\u25A1';
maxBtn.addEventListener('click',function(e){e.stopPropagation();maximizeWindow(id)});
var clsBtn=document.createElement('button');
clsBtn.className='window-ctrl-btn close-btn';
clsBtn.innerHTML='\u00D7';
clsBtn.addEventListener('click',function(e){e.stopPropagation();closeWindow(id)});
ctrls.appendChild(minBtn);
ctrls.appendChild(maxBtn);
ctrls.appendChild(clsBtn);
tb.appendChild(tt);
tb.appendChild(ctrls);
var body=document.createElement('div');
body.className='window-body';
body.innerHTML=contentHtml;
var rh=document.createElement('div');
rh.className='window-resize-handle';
w.appendChild(tb);
w.appendChild(body);
w.appendChild(rh);
document.getElementById('windows-area').appendChild(w);
openWindows[id]={el:w,minimized:false,maximized:false,preMax:null};
makeDraggable(w,tb,id);
makeResizable(w,rh);
w.addEventListener('mousedown',function(){focusWindow(id)});
focusWindow(id);
addTaskbarBtn(id,title);
return openWindows[id];
}
function focusWindow(id){
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
document.querySelectorAll('.taskbar-app-btn').forEach(function(b){b.classList.toggle('active',b.dataset.appId===id)});
}
function minimizeWindow(id){
if(!openWindows[id])return;
openWindows[id].el.style.display='none';
openWindows[id].minimized=true;
}
function maximizeWindow(id){
if(!openWindows[id])return;
var w=openWindows[id];
if(w.maximized){
w.el.classList.remove('window-maximized');
if(w.preMax){
w.el.style.left=w.preMax.l;
w.el.style.top=w.preMax.t;
w.el.style.width=w.preMax.w;
w.el.style.height=w.preMax.h;
}
w.maximized=false;
}else{
w.preMax={l:w.el.style.left,t:w.el.style.top,w:w.el.style.width,h:w.el.style.height};
w.el.classList.add('window-maximized');
w.maximized=true;
}
}
function closeWindow(id){
if(!openWindows[id])return;
openWindows[id].el.remove();
delete openWindows[id];
removeTaskbarBtn(id);
if(activeWinId===id)activeWinId=null;
}
function closeAllWindows(){
Object.keys(openWindows).forEach(closeWindow);
}
function addTaskbarBtn(id,title){
var b=document.createElement('button');
b.className='taskbar-app-btn active';
b.dataset.appId=id;
b.textContent=title;
b.addEventListener('click',function(){
if(openWindows[id]){
if(openWindows[id].minimized){focusWindow(id)}
else if(activeWinId===id){minimizeWindow(id)}
else{focusWindow(id)}
}
});
document.getElementById('taskbar-apps').appendChild(b);
}
function removeTaskbarBtn(id){
var b=document.querySelector('.taskbar-app-btn[data-app-id="'+id+'"]');
if(b)b.remove();
}
function makeDraggable(win,handle,id){
var ox,oy,sx,sy,dragging=false;
handle.addEventListener('mousedown',function(e){
if(openWindows[id]&&openWindows[id].maximized)return;
dragging=true;
ox=e.clientX;oy=e.clientY;
sx=win.offsetLeft;sy=win.offsetTop;
e.preventDefault();
});
document.addEventListener('mousemove',function(e){
if(!dragging)return;
win.style.left=(sx+(e.clientX-ox))+'px';
win.style.top=(sy+(e.clientY-oy))+'px';
});
document.addEventListener('mouseup',function(){dragging=false});
}
function makeResizable(win,handle){
var ox,oy,sw,sh,resizing=false;
handle.addEventListener('mousedown',function(e){
resizing=true;
ox=e.clientX;oy=e.clientY;
sw=win.offsetWidth;sh=win.offsetHeight;
e.preventDefault();
e.stopPropagation();
});
document.addEventListener('mousemove',function(e){
if(!resizing)return;
var nw=Math.max(320,sw+(e.clientX-ox));
var nh=Math.max(200,sh+(e.clientY-oy));
win.style.width=nw+'px';
win.style.height=nh+'px';
});
document.addEventListener('mouseup',function(){resizing=false});
}
