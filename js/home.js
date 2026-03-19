// home.js v3.8 — No lights. MeshBasicMaterial only. PS1 resolution. Guaranteed visible.
const openHomeGame=()=>{
createWindow('home','home.exe',640,480,
'<div id="hc" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#000;overflow:hidden">'+
'<div id="hHud" style="position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:2">'+
'<div id="hCross" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#888;font-size:18px">+</div>'+
'<div id="hInt" style="position:absolute;bottom:50px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#999;opacity:0;transition:opacity .3s;text-align:center"></div>'+
'<div id="hMsg" style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#888;text-align:center;max-width:90%">Click to play. WASD move. Mouse look. E interact. F flashlight.</div>'+
'<div id="hRoom" style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:12px;color:#666"></div>'+
'<div id="hCnt" style="position:absolute;top:8px;right:12px;font-family:VT323,monospace;font-size:12px;color:#666"></div>'+
'</div></div>');
setTimeout(()=>{
if(typeof THREE!=='undefined')return go();
const s=document.createElement('script');
s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
s.onload=go;document.head.appendChild(s);
},400);
};

function go(){
const hc=document.getElementById('hc');
if(!hc||typeof THREE==='undefined')return;

// PS1 resolution
const PW=320,PH=240;
const cvs=document.createElement('canvas');
cvs.width=PW;cvs.height=PH;
cvs.style.cssText='display:block;width:100%;height:100%;image-rendering:pixelated';
hc.insertBefore(cvs,hc.firstChild);

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a0a0e);
const cam=new THREE.PerspectiveCamera(75,PW/PH,0.1,50);
cam.position.set(0,1.5,0);
const ren=new THREE.WebGLRenderer({canvas:cvs,antialias:false});
ren.setSize(PW,PH);

// === LIGHTING — dark, flashlight essential ===
const ambLight=new THREE.AmbientLight(0x080808,0.15);scene.add(ambLight);
// Narrow spotlight — cheap flashlight beam
const flash=new THREE.SpotLight(0xeeddaa,1.5,20,0.7,0.4,1);
scene.add(flash);scene.add(flash.target);
let flashOn=true;

// NO LIGHTS. All MeshBasicMaterial. Colors ARE the brightness.
const DS=THREE.DoubleSide;
function M(c){return new THREE.MeshPhongMaterial({color:c,side:DS})}
function BX(x,y,z,m){return new THREE.Mesh(new THREE.BoxGeometry(x,y,z),m)}
function CY(r,h,s,m){return new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,s||6),m)}
function PL(w,h,m){return new THREE.Mesh(new THREE.PlaneGeometry(w,h),m)}
const PI=Math.PI;

// Color palette — everything visible, muted tones
const cFloor=M(0x665848);
const cWall=M(0x666060);
const cCeil=M(0x444444);
const cExit=M(0x080808);

// === FURNITURE ===
function mkPC(){
const g=new THREE.Group();
// Desk
const dt=BX(1.2,.06,.7,M(0x3a3520));dt.position.set(0,.72,0);g.add(dt);
const dl=BX(.06,.72,.65,M(0x2a2510));dl.position.set(-.55,.36,0);g.add(dl);
const dr=BX(.06,.72,.65,M(0x2a2510));dr.position.set(.55,.36,0);g.add(dr);
// Tower
const tw=BX(.22,.55,.42,M(0x1a1a2a));tw.position.set(-.35,1.02,.05);g.add(tw);
const cd=BX(.14,.02,.01,M(0x111115));cd.position.set(-.35,1.15,-.17);g.add(cd);
const pw=BX(.02,.02,.02,M(0x00aa00));pw.position.set(-.28,.85,-.17);g.add(pw);// power LED
// Monitor
const ms=BX(.08,.12,.08,M(0x181818));ms.position.set(.12,.8,0);g.add(ms);
const mb=BX(.5,.4,.32,M(0x181818));mb.position.set(.12,1.1,.02);g.add(mb);
const sc=BX(.42,.32,.01,M(0x182838));sc.position.set(.12,1.1,-.15);g.add(sc);// screen - blue tint
// Keyboard
const kb=BX(.38,.02,.12,M(0x151515));kb.position.set(.12,.74,-.3);g.add(kb);
// Keys detail
for(let r=0;r<3;r++)for(let c=0;c<8;c++){
const k=BX(.03,.005,.02,M(0x1a1a1a));k.position.set(-.04+c*.05,.755,-.24+r*.04);g.add(k);}
// Mouse + pad
const mp=BX(.12,.005,.14,M(0x111111));mp.position.set(.42,.735,-.3);g.add(mp);
const mo=BX(.05,.02,.08,M(0x1a1a1a));mo.position.set(.42,.75,-.3);g.add(mo);
return g;}

function mkFridge(){
const g=new THREE.Group();
const b=BX(.7,1.8,.55,M(0x404040));b.position.set(0,.9,0);g.add(b);
const hl=BX(.03,.35,.03,M(0x666666));hl.position.set(.28,1.1,-.29);g.add(hl);
const ln=BX(.6,.02,.01,M(0x2a2a2a));ln.position.set(0,1.35,-.28);g.add(ln);
// Magnets
const m1=BX(.04,.04,.01,M(0xaa3333));m1.position.set(-.15,1.5,-.28);g.add(m1);
const m2=BX(.04,.06,.01,M(0x3333aa));m2.position.set(.1,1.6,-.28);g.add(m2);
// Grocery list (small white rectangle)
const gl=BX(.08,.1,.005,M(0xccccaa));gl.position.set(-.15,1.45,-.285);g.add(gl);
return g;}

function mkStove(){
const g=new THREE.Group();
const b=BX(.7,.9,.55,M(0x333330));b.position.set(0,.45,0);g.add(b);
// Burners
for(let bx=-.15;bx<=.15;bx+=.3)for(let bz=-.1;bz<=.1;bz+=.2){
const bu=CY(.06,.015,8,M(0x222222));bu.position.set(bx,.91,bz);g.add(bu);}
// Oven door
const d=BX(.55,.35,.02,M(0x2a2a28));d.position.set(0,.3,-.28);g.add(d);
// Handle
const oh=BX(.3,.02,.02,M(0x555555));oh.position.set(0,.52,-.29);g.add(oh);
// Knobs
for(let i=0;i<4;i++){const kn=CY(.015,.015,6,M(0x444444));kn.rotation.x=PI/2;kn.position.set(-.2+i*.13,.82,-.28);g.add(kn);}
return g;}

function mkTable(){
const g=new THREE.Group();
const t=BX(1.3,.05,.9,M(0x3a2a10));t.position.set(0,.72,0);g.add(t);
for(const lx of[-.55,.55])for(const lz of[-.38,.38]){
const l=BX(.05,.72,.05,M(0x2a1a05));l.position.set(lx,.36,lz);g.add(l);}
// Plate
const pl=CY(.12,.015,8,M(0x555555));pl.position.set(-.2,.745,0);g.add(pl);
// Chair
const cs=BX(.38,.04,.38,M(0x2a2a2a));cs.position.set(.45,.44,.55);g.add(cs);
for(const cx of[-.14,.14])for(const cz of[-.14,.14]){
const cl=BX(.04,.44,.04,M(0x222222));cl.position.set(.45+cx,.22,.55+cz);g.add(cl);}
const cb=BX(.34,.4,.04,M(0x2a2a2a));cb.position.set(.45,.68,.73);g.add(cb);
return g;}

function mkCouch(){
const g=new THREE.Group();
const s=BX(2,.25,.8,M(0x1e1e30));s.position.set(0,.22,0);g.add(s);
const b=BX(2,.55,.15,M(0x1a1a28));b.position.set(0,.52,.36);g.add(b);
const al=BX(.14,.4,.8,M(0x1a1a2a));al.position.set(-.95,.32,0);g.add(al);
const ar=BX(.14,.4,.8,M(0x1a1a2a));ar.position.set(.95,.32,0);g.add(ar);
// Cushions
for(let i=-1;i<=1;i++){
const cu=BX(.55,.08,.5,M(0x222238));cu.position.set(i*.6,.38,-.05);g.add(cu);}
// Throw pillow
const tp=BX(.2,.2,.1,M(0x2a1a1a));tp.position.set(-.7,.48,.2);tp.rotation.z=.2;g.add(tp);
return g;}

function mkTV(){
const g=new THREE.Group();
const st=BX(.9,.35,.42,M(0x1e1e15));st.position.set(0,.175,0);g.add(st);
// Drawer handle
const dh=BX(.2,.02,.02,M(0x444444));dh.position.set(0,.2,-.22);g.add(dh);
const bd=BX(.85,.65,.55,M(0x151518));bd.position.set(0,.7,0);g.add(bd);
const sc=BX(.65,.48,.02,M(0x0a0a10));sc.position.set(0,.72,-.28);g.add(sc);
// Power light
const pw=BX(.02,.02,.01,M(0x880000));pw.position.set(.35,.48,-.28);g.add(pw);
return g;}

function mkBed(){
const g=new THREE.Group();
// Frame
const f=BX(1.5,.2,2.1,M(0x201810));f.position.set(0,.12,0);g.add(f);
// Mattress
const mt=BX(1.4,.12,2,M(0x1e1e2a));mt.position.set(0,.28,0);g.add(mt);
// Pillow
const p=BX(.45,.08,.25,M(0x2a2a2a));p.position.set(0,.38,.8);g.add(p);
// Headboard
const hb=BX(1.5,.7,.08,M(0x1e1510));hb.position.set(0,.55,1);g.add(hb);
// Blanket (messy, slightly off)
const bl=BX(1.2,.05,1.3,M(0x181835));bl.position.set(.05,.34,-.2);bl.rotation.z=.03;g.add(bl);
// Sheet poking out
const sh=BX(.8,.02,.3,M(0x2a2a28));sh.position.set(-.1,.3,-.85);g.add(sh);
return g;}

function mkShelf(){
const g=new THREE.Group();
const f=BX(.9,1.9,.32,M(0x302a1a));f.position.set(0,.95,0);g.add(f);
// Shelves
for(const sy of[.22,.68,1.14,1.6]){
const s=BX(.85,.03,.3,M(0x281e0a));s.position.set(0,sy,0);g.add(s);}
// Books
const cl=[0x3a1a1a,0x1a3a1a,0x1a1a3a,0x3a3a1a,0x3a1a3a,0x1a3a3a];
for(let r=0;r<4;r++){let x=-.32;const sy=[.26,.72,1.18,1.64][r];
while(x<.3){const w=.03+Math.random()*.05;const h=.12+Math.random()*.1;
const b=BX(w,h,.2,M(cl[Math.floor(Math.random()*cl.length)]));
b.position.set(x+w/2,sy+h/2,0);g.add(b);x+=w+.01;}}
return g;}

function mkSink(){
const g=new THREE.Group();
const ba=BX(.5,.08,.35,M(0x3a3a3a));ba.position.set(0,.82,0);g.add(ba);
const in2=BX(.4,.07,.28,M(0x252525));in2.position.set(0,.81,0);g.add(in2);
const pd=BX(.12,.82,.12,M(0x303030));pd.position.set(0,.41,0);g.add(pd);
const fb=BX(.03,.15,.03,M(0x555555));fb.position.set(0,.92,.1);g.add(fb);
const fs=BX(.03,.03,.08,M(0x555555));fs.position.set(0,.98,.06);g.add(fs);
return g;}

function mkTub(){
const g=new THREE.Group();
const o=BX(.7,.48,1.5,M(0x303030));o.position.set(0,.24,0);g.add(o);
const i=BX(.58,.44,1.35,M(0x1a1a1a));i.position.set(0,.27,0);g.add(i);
// Faucet
const fh=BX(.04,.15,.04,M(0x555555));fh.position.set(0,.55,.65);g.add(fh);
const fs=BX(.04,.04,.08,M(0x555555));fs.position.set(0,.6,.6);g.add(fs);
return g;}

function mkMbox(){
const g=new THREE.Group();
const p=BX(.06,1,.06,M(0x3a3a3a));p.position.set(0,.5,0);g.add(p);
const m=BX(.25,.2,.35,M(0x2a2a2a));m.position.set(0,1.1,0);g.add(m);
const fl=BX(.02,.14,.02,M(0xcc2222));fl.position.set(.15,1.18,0);g.add(fl);
// Stuffed mail
const ml=BX(.15,.04,.02,M(0xccccaa));ml.position.set(0,1.22,-.18);ml.rotation.x=-.3;g.add(ml);
return g;}

// === ROOMS ===
const rooms={
hallway:{sz:[12,3,4],
build(g){
const l1=BX(.3,.06,.3,M(0x665544));l1.position.set(-2,2.7,0);g.add(l1);
const l2=BX(.3,.06,.3,M(0x665544));l2.position.set(2,2.7,0);g.add(l2);
const rk=BX(.08,1.6,.08,M(0x2a1a0a));rk.position.set(-5,.8,1.2);g.add(rk);
const hk=BX(.12,.02,.04,M(0x555555));hk.position.set(-5,1.5,1.14);g.add(hk);
const sh=BX(.3,.08,.15,M(0x1a1a1a));sh.position.set(-5,.04,.6);g.add(sh);
return[{m:l1,n:'Hallway Light',t:'the light flickers sometimes. it didnt use 2'},
{m:rk,n:'Coat Rack',t:'ducks jacket is still hanging here. he stopped going outside months ago.'},
{m:sh,n:'Shoes',t:'old sneakers. the laces are still tied from the last time he wore them.'}];},
exits:[
{p:[-3,.9,-1.95],s:[1,1.8,.15],to:'kitchen',sp:[0,1.5,1.8]},
{p:[3,.9,-1.95],s:[1,1.8,.15],to:'living',sp:[0,1.5,2.2]},
{p:[-1,.9,1.95],s:[1,1.8,.15],to:'bedroom',sp:[0,1.5,-2.2]},
{p:[3,.9,1.95],s:[1,1.8,.15],to:'bath',sp:'LOCKED'},
{p:[5.9,.9,0],s:[.15,1.8,1],to:'outside',sp:[-4,1.5,0]},
{p:[-4,.9,1.95],s:[1,1.8,.15],to:'master',sp:[0,1.5,-2.5]}]},

kitchen:{sz:[6,3,5],
build(g){
const fr=mkFridge();fr.position.set(-2,0,-2.1);fr.rotation.y=PI;g.add(fr);
const st=mkStove();st.position.set(1.5,0,-2);st.rotation.y=PI;g.add(st);
const tb=mkTable();tb.position.set(0,0,.2);g.add(tb);
return[{m:fr,n:'Fridge',t:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
{m:st,n:'Stove',t:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
{m:tb,n:'Table',t:'we ate here as a family. before everything changed.'}];},
exits:[{p:[0,.9,2.45],s:[1,1.8,.15],to:'hallway',sp:[-3,1.5,-1]}]},

living:{sz:[8,3,6],
build(g){
const tv=mkTV();tv.position.set(0,0,-2.6);tv.rotation.y=PI;g.add(tv);
const co=mkCouch();co.position.set(0,0,.8);g.add(co);
const sh=mkShelf();sh.position.set(-3.65,0,0);sh.rotation.y=PI/2;g.add(sh);
return[{m:tv,n:'TV',t:'its off. it hasnt been on in a long time.'},
{m:co,n:'Couch',t:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
{m:sh,n:'Bookshelf',t:'moms books. she liked mystery novels. guess i became one.'}];},
exits:[{p:[0,.9,2.95],s:[1,1.8,.15],to:'hallway',sp:[3,1.5,-1]}]},

bedroom:{sz:[7,3,6],
build(g){
const pc=mkPC();pc.position.set(-3,0,-.5);pc.rotation.y=-PI/2;g.add(pc);
const bd=mkBed();bd.position.set(2.3,0,.5);g.add(bd);
return[{m:pc,n:'My PC',t:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
{m:bd,n:'Bed',t:'i stopped sleeping. the dreams were always dustbowl.'}];},
exits:[{p:[0,.9,-2.95],s:[1,1.8,.15],to:'hallway',sp:[-1,1.5,1]}]},

bath:{sz:[4,3,4],
build(g){
const sk=mkSink();sk.position.set(1.5,0,-.5);sk.rotation.y=-PI/2;g.add(sk);
const tb=mkTub();tb.position.set(-1.3,0,.3);g.add(tb);
const tw=BX(.35,.5,.02,M(0x1a3a3a));tw.position.set(-1.92,1.3,-.5);g.add(tw);
return[{m:sk,n:'Sink',t:'the faucet drips. has for months. nobody fixed it.'},
{m:tb,n:'Bathtub',t:'cold water. duck stopped taking warm showers. didnt care anymore.'},
{m:tw,n:'Towel',t:'still damp. like someone just used it. but no one has been here in a long time.'}];},
exits:[{p:[0,.9,-1.95],s:[1,1.8,.15],to:'hallway',sp:[3,1.5,1]}]},

master:{sz:[7,3,6],
build(g){
// Empty room - bare bed frame
const fr=BX(1.5,.2,2.1,M(0x1a1208));fr.position.set(2,.1,1);g.add(fr);
for(const lx of[1.35,2.65])for(const lz of[.05,1.95]){
const lg=BX(.06,.35,.06,M(0x151005));lg.position.set(lx,.27,lz);g.add(lg);}
// Trapdoor — RAISED so raycast can hit it when looking forward/down
const trap=BX(1,.15,1,M(0x4a3a18));trap.position.set(-.5,.075,0);g.add(trap);
// Metal ring on top
const ring=CY(.08,.04,8,M(0x888888));ring.position.set(-.5,.16,0);g.add(ring);
// Hinge detail
const hn=BX(.15,.03,.04,M(0x555555));hn.position.set(-.5,.15,.48);g.add(hn);
return[{m:fr,n:'Bed Frame',t:'no mattress. just springs. this was their room. before mom left.'},
{m:trap,n:'Trapdoor',t:'MAZE'}];},
exits:[{p:[0,.9,-2.95],s:[1,1.8,.15],to:'hallway',sp:[-4,1.5,1]}]},

outside:{sz:[14,6,12],
build(g){
const yd=BX(6,.03,6,M(0x0a1a0a));yd.position.set(0,.015,0);g.add(yd);
const mb=mkMbox();mb.position.set(3,0,3);g.add(mb);
const tr=CY(.12,2.5,5,M(0x2a1a08));tr.position.set(-2,1.25,-3);g.add(tr);
const br=BX(.8,.06,.06,M(0x2a1a08));br.position.set(-1.7,2.1,-3);br.rotation.z=.3;g.add(br);
const my=BX(.7,.7,.7,M(0x444444));my.position.set(4,.35,0);g.add(my);
return[{m:yd,n:'Yard',t:'the grass is dead. everything is dead.'},
{m:mb,n:'Mailbox',t:'full of mail nobody opened.'},
{m:tr,n:'Dead Tree',t:'this tree used to have a tire swing. dad took it down.'},
{m:my,n:'???',t:''}];},
exits:[{p:[-6.9,.9,0],s:[.15,1.8,1.2],to:'hallway',sp:[5,1.5,0]}]},
};

// State
const grp=new THREE.Group();scene.add(grp);
let curRoom='hallway',locked=false,yaw=0,pitch=0;
const keys={},seen={};
let nObj=0,nDone=0,lookAt=null,msgTm=null;
let objList=[],exitList=[],mazeOn=false,entActive=false,rLight=null;
Object.values(rooms).forEach(r=>{const g=new THREE.Group();nObj+=r.build(g).length});

// Build room
function build(name){
while(grp.children.length)grp.remove(grp.children[0]);
if(rLight){scene.remove(rLight);rLight=null}
// Restore ambient for rooms (maze dims it)
ambLight.intensity=0.2;ambLight.color.setHex(0x0a0a0a);
objList=[];exitList=[];
const r=rooms[name],sx=r.sz[0],sy=r.sz[1],sz=r.sz[2];
const fl=PL(sx,sz,cFloor);fl.rotation.x=-PI/2;grp.add(fl);
if(name!=='outside'){
const ce=PL(sx,sz,cCeil);ce.rotation.x=PI/2;ce.position.y=sy;grp.add(ce);
const bk=PL(sx,sy,cWall);bk.position.set(0,sy/2,-sz/2);grp.add(bk);
const ft=PL(sx,sy,cWall);ft.position.set(0,sy/2,sz/2);ft.rotation.y=PI;grp.add(ft);
const lt=PL(sz,sy,cWall);lt.position.set(-sx/2,sy/2,0);lt.rotation.y=PI/2;grp.add(lt);
const rt=PL(sz,sy,cWall);rt.position.set(sx/2,sy/2,0);rt.rotation.y=-PI/2;grp.add(rt);}
// Dim room point light — gives shape without flashlight
rLight=new THREE.PointLight(0x332211,0.15,12);
rLight.position.set(0,sy-.3,0);scene.add(rLight);
const built=r.build(grp);
built.forEach(b=>{b.m.userData={name:b.n,msg:b.t,room:name};objList.push(b.m)});
r.exits.forEach(e=>{
const m=BX(e.s[0],e.s[1],e.s[2],cExit);
m.position.set(e.p[0],e.p[1],e.p[2]);
m.userData={exit:true,to:e.to,spawn:e.sp};
grp.add(m);exitList.push(m);});
const el=document.getElementById('hRoom');if(el)el.textContent=name.toUpperCase();
const cn=document.getElementById('hCnt');if(cn)cn.textContent=nDone+'/'+nObj;
}
build('hallway');

// Controls
hc.addEventListener('click',()=>{if(!locked)hc.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=(document.pointerLockElement===hc)});
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*.002;pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*.002))});
document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;if(k==='f'){flashOn=!flashOn;flash.intensity=flashOn?1.5:0}});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function msg(t){const el=document.getElementById('hMsg');if(!el)return;el.textContent=t;clearTimeout(msgTm);msgTm=setTimeout(()=>{el.textContent=''},5000)}

function doInteract(){
if(!lookAt)return;const ud=lookAt.userData;
if(ud.exit){
// Locked bathroom
if(ud.spawn==='LOCKED'){msg('the door is locked. something is blocking it from the other side.');return}
curRoom=ud.to;cam.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);build(curRoom);return;}
if(!ud.name)return;
const k=ud.room+'-'+ud.name;
if(!seen[k]){seen[k]=1;nDone++;const cn=document.getElementById('hCnt');if(cn)cn.textContent=nDone+'/'+nObj}
if(ud.msg==='MAZE'){msg('descending...');setTimeout(startMaze,1500);return}
if(curRoom==='outside'&&ud.name==='???'){
if(nDone>=nObj)msg('Im still here at home');
else msg('i cant go yet. theres more i need to remember. ('+nDone+'/'+nObj+')');return;}
msg(ud.msg||'...');
}

const ray=new THREE.Raycaster(),c2=new THREE.Vector2(0,0);

function tick(){
if(!document.getElementById('hc'))return;
requestAnimationFrame(tick);
const spd=.06,d=new THREE.Vector3();
if(keys.w)d.z-=1;if(keys.s)d.z+=1;if(keys.a)d.x-=1;if(keys.d)d.x+=1;
if(d.lengthSq()>0){
d.normalize().multiplyScalar(spd);d.applyAxisAngle(new THREE.Vector3(0,1,0),yaw);
const nx=cam.position.x+d.x,nz=cam.position.z+d.z;
if(mazeOn){if(mzOk(nx,cam.position.z))cam.position.x=nx;if(mzOk(cam.position.x,nz))cam.position.z=nz}
else{const r=rooms[curRoom];if(r){const hx=r.sz[0]/2-.4,hz=r.sz[2]/2-.4;if(nx>-hx&&nx<hx)cam.position.x=nx;if(nz>-hz&&nz<hz)cam.position.z=nz}}}
cam.rotation.set(0,0,0);cam.rotateY(yaw);cam.rotateX(pitch);
// Flashlight follows camera direction
flash.position.copy(cam.position);
const fDir=new THREE.Vector3(0,0,-1).applyQuaternion(cam.quaternion);
flash.target.position.copy(cam.position).add(fDir.multiplyScalar(5));
if(keys.e){doInteract();keys.e=false}
if(mazeOn){mzEnt();mzExit()}
if(!mazeOn){
const all=[];objList.forEach(o=>{if(o.isMesh)all.push(o);else o.traverse(c=>{if(c.isMesh)all.push(c)})});exitList.forEach(m=>all.push(m));
ray.setFromCamera(c2,cam);const h=ray.intersectObjects(all,false);
const ie=document.getElementById('hInt'),ch=document.getElementById('hCross');lookAt=null;
if(h.length&&h[0].distance<4){let o=h[0].object;while(o&&!o.userData.name&&!o.userData.exit&&o.parent&&o.parent!==grp)o=o.parent;
if(o.userData.name||o.userData.exit){lookAt=o;if(ie){ie.textContent=o.userData.exit?'[E] '+o.userData.to:'[E] '+o.userData.name;ie.style.opacity='1'}if(ch)ch.style.color='#cf6a32'}}
if(!lookAt){if(ie)ie.style.opacity='0';if(ch)ch.style.color='#888'}
}
ren.render(scene,cam);
}
tick();

// Resize - keep PS1 res, stretch canvas
new ResizeObserver(()=>{cvs.style.width=hc.offsetWidth+'px';cvs.style.height=hc.offsetHeight+'px'}).observe(hc);

// ============ MAZE ============
let mzGrid=null,ent=null,ePos={x:0,z:0};
const MN=20,MC=2,MH=3;

function mzGen(w,h){
const g=[];for(let y=0;y<h;y++){g[y]=[];for(let x=0;x<w;x++)g[y][x]={n:1,s:1,e:1,w:1,v:0}}
const st=[];let cx=0,cy=0;g[0][0].v=1;st.push([0,0]);
while(st.length){const nb=[];
if(cy>0&&!g[cy-1][cx].v)nb.push([cx,cy-1,'n','s']);
if(cy<h-1&&!g[cy+1][cx].v)nb.push([cx,cy+1,'s','n']);
if(cx>0&&!g[cy][cx-1].v)nb.push([cx-1,cy,'w','e']);
if(cx<w-1&&!g[cy][cx+1].v)nb.push([cx+1,cy,'e','w']);
if(nb.length){const[nx,ny,a,b]=nb[Math.floor(Math.random()*nb.length)];g[cy][cx][a]=0;g[ny][nx][b]=0;g[ny][nx].v=1;st.push([cx,cy]);cx=nx;cy=ny}
else{const p=st.pop();cx=p[0];cy=p[1]}}return g;}

function startMaze(){
mazeOn=true;
// Make maze pitch black — flashlight only
ambLight.intensity=0.02;ambLight.color.setHex(0x030303);
if(rLight){scene.remove(rLight);rLight=null}
while(grp.children.length)grp.remove(grp.children[0]);
objList=[];exitList=[];
mzGrid=mzGen(MN,MN);
const tw=MN*MC,mW=M(0x252525),mF2=M(0x151210);
const fl=PL(tw+2,tw+2,mF2);fl.rotation.x=-PI/2;fl.position.set(tw/2,0,tw/2);grp.add(fl);
const cl=PL(tw+2,tw+2,M(0x0e0e0e));cl.rotation.x=PI/2;cl.position.set(tw/2,MH,tw/2);grp.add(cl);
const wg=new THREE.BoxGeometry(MC,MH,.1),wgs=new THREE.BoxGeometry(.1,MH,MC);
for(let y=0;y<MN;y++)for(let x=0;x<MN;x++){
if(mzGrid[y][x].n){const w=new THREE.Mesh(wg,mW);w.position.set(x*MC+MC/2,MH/2,y*MC);grp.add(w)}
if(mzGrid[y][x].w){const w=new THREE.Mesh(wgs,mW);w.position.set(x*MC,MH/2,y*MC+MC/2);grp.add(w)}}
for(let x=0;x<MN;x++){const w=new THREE.Mesh(wg,mW);w.position.set(x*MC+MC/2,MH/2,MN*MC);grp.add(w)}
for(let y=0;y<MN;y++){const w=new THREE.Mesh(wgs,mW);w.position.set(MN*MC,MH/2,y*MC+MC/2);grp.add(w)}
const em=BX(.5,.1,.5,M(0x00ff00));em.position.set((MN-1)*MC+MC/2,.05,(MN-1)*MC+MC/2);grp.add(em);
// Entity
// Entity - built but hidden, spawns at player start after 5s
ent=new THREE.Group();
const eM=M(0x050505),eDM=M(0x030303),eRM=M(0xff0000);
// Torso — thin, tall
const torso=BX(.3,1.6,.18,eM);torso.position.set(0,1.4,0);ent.add(torso);
// Ribs
for(let i=0;i<4;i++){const rib=BX(.32,.02,.01,M(0x0a0a0a));rib.position.set(0,1+i*.25,-.1);ent.add(rib);}
// Spine bumps
for(let i=0;i<5;i++){const sp=BX(.04,.04,.06,M(0x080808));sp.position.set(0,.9+i*.3,.1);ent.add(sp);}
// Head — too big, tilted
const eHead=new THREE.Group();
const skull=BX(.28,.32,.24,M(0x080808));eHead.add(skull);
const jaw=BX(.22,.08,.15,M(0x060606));jaw.position.set(0,-.18,-.04);jaw.rotation.x=.15;eHead.add(jaw);
// Eyes — glowing red, uneven
const eyeL=BX(.06,.04,.02,eRM);eyeL.position.set(-.07,.05,-.13);eHead.add(eyeL);
const eyeR=BX(.05,.06,.02,eRM);eyeR.position.set(.08,.03,-.13);eHead.add(eyeR);
const gL=BX(.1,.08,.01,M(0x330000));gL.position.set(-.07,.05,-.14);eHead.add(gL);
const gR=BX(.09,.1,.01,M(0x330000));gR.position.set(.08,.03,-.14);eHead.add(gR);
eHead.position.set(0,2.35,-.05);eHead.rotation.z=.08;ent.add(eHead);
// Neck
const neck=BX(.08,.2,.08,eDM);neck.position.set(0,2.15,0);ent.add(neck);
// Arms — jointed with claws
const eLArm=new THREE.Group();
const eLArmUp=BX(.06,1,.06,eDM);eLArmUp.position.set(0,-.5,0);eLArm.add(eLArmUp);
const eLArmLo=BX(.05,.8,.05,eDM);eLArmLo.position.set(0,-1.1,.1);eLArmLo.rotation.x=-.3;eLArm.add(eLArmLo);
for(let i=-1;i<=1;i++){const c=BX(.015,.2,.015,M(0x080808));c.position.set(i*.03,-1.55,.15);c.rotation.x=-.4;eLArm.add(c);}
eLArm.position.set(-.22,1.8,0);ent.add(eLArm);
const eRArm=new THREE.Group();
const eRArmUp=BX(.06,1,.06,eDM);eRArmUp.position.set(0,-.5,0);eRArm.add(eRArmUp);
const eRArmLo=BX(.05,.8,.05,eDM);eRArmLo.position.set(0,-1.1,.1);eRArmLo.rotation.x=-.3;eRArm.add(eRArmLo);
for(let i=-1;i<=1;i++){const c=BX(.015,.2,.015,M(0x080808));c.position.set(i*.03,-1.55,.15);c.rotation.x=-.4;eRArm.add(c);}
eRArm.position.set(.22,1.8,0);ent.add(eRArm);
// Legs — jointed with feet
const eLLeg=new THREE.Group();
const eLLegUp=BX(.08,.7,.08,eM);eLLegUp.position.set(0,-.35,0);eLLeg.add(eLLegUp);
const eLLegLo=BX(.06,.6,.06,eM);eLLegLo.position.set(0,-.8,.08);eLLegLo.rotation.x=.2;eLLeg.add(eLLegLo);
const eLFoot=BX(.1,.04,.18,eDM);eLFoot.position.set(0,-1.1,.12);eLLeg.add(eLFoot);
eLLeg.position.set(-.1,.45,0);ent.add(eLLeg);
const eRLeg=new THREE.Group();
const eRLegUp=BX(.08,.7,.08,eM);eRLegUp.position.set(0,-.35,0);eRLeg.add(eRLegUp);
const eRLegLo=BX(.06,.6,.06,eM);eRLegLo.position.set(0,-.8,.08);eRLegLo.rotation.x=.2;eRLeg.add(eRLegLo);
const eRFoot=BX(.1,.04,.18,eDM);eRFoot.position.set(0,-1.1,.12);eRLeg.add(eRFoot);
eRLeg.position.set(.1,.45,0);ent.add(eRLeg);
// Store animation refs
ent.userData={aL:eLArm,aR:eRArm,lL:eLLeg,lR:eRLeg,hd:eHead,jw:jaw,t:0};
// Start at player spawn but invisible
ePos.x=MC/2;ePos.z=MC/2;
ent.position.set(ePos.x,0,ePos.z);
ent.visible=false;
grp.add(ent);
// Show entity after 5 seconds
entActive=false;
setTimeout(()=>{if(mazeOn&&ent){ent.visible=true;entActive=true;msg('something is here.')}},5000);
cam.position.set(MC/2,1.5,MC/2);yaw=0;pitch=0;
const el=document.getElementById('hRoom');if(el)el.textContent='BASEMENT';
msg('find the green light.');
if(window.soosAudio){try{soosAudio.stop();soosAudio.playPuzzle()}catch(e){}}
}

function mzOk(x,z){
if(!mzGrid)return false;
const cx=Math.floor(x/MC),cz=Math.floor(z/MC);
if(cx<0||cx>=MN||cz<0||cz>=MN)return false;
const lx=x-cx*MC,lz=z-cz*MC;
if(lz<.3&&mzGrid[cz][cx].n)return false;
if(lz>MC-.3&&(cz>=MN-1||mzGrid[cz][cx].s))return false;
if(lx<.3&&mzGrid[cz][cx].w)return false;
if(lx>MC-.3&&(cx>=MN-1||mzGrid[cz][cx].e))return false;
return true;}

let eTk=0,ePath=[],ePathTm=0;

// BFS pathfinding through maze grid
function mzBFS(sx,sz,tx,tz){
const scx=Math.floor(sx/MC),scz=Math.floor(sz/MC);
const tcx=Math.floor(tx/MC),tcz=Math.floor(tz/MC);
if(scx===tcx&&scz===tcz)return[];
const visited=[];for(let y=0;y<MN;y++){visited[y]=[];for(let x=0;x<MN;x++)visited[y][x]=false}
const queue=[[scx,scz,[]]];visited[scz][scx]=true;
while(queue.length){
const[cx,cz,path]=queue.shift();
const dirs=[['n',0,-1],['s',0,1],['w',-1,0],['e',1,0]];
for(const[wall,dx,dz] of dirs){
const nx=cx+dx,nz=cz+dz;
if(nx<0||nx>=MN||nz<0||nz>=MN||visited[nz][nx])continue;
if(mzGrid[cz][cx][wall])continue;// wall blocking
visited[nz][nx]=true;
const np=[...path,[nx*MC+MC/2,nz*MC+MC/2]];
if(nx===tcx&&nz===tcz)return np;
queue.push([nx,nz,np]);
}}
return[];// no path
}

function mzEnt(){
if(!ent||!mazeOn||!entActive)return;
eTk++;
const ud=ent.userData;ud.t+=.15;

// Recalculate path every 30 frames
if(eTk-ePathTm>30){ePathTm=eTk;ePath=mzBFS(ePos.x,ePos.z,cam.position.x,cam.position.z)}

// Move along path
const s=.055;
if(ePath.length>0){
const[tx,tz]=ePath[0];
const dx=tx-ePos.x,dz=tz-ePos.z;
const dd=Math.sqrt(dx*dx+dz*dz);
if(dd<.2){ePath.shift()}// reached waypoint
else{
const nx=ePos.x+dx/dd*s,nz=ePos.z+dz/dd*s;
ePos.x=nx;ePos.z=nz;
}
}
ent.position.set(ePos.x,0,ePos.z);
ent.lookAt(cam.position.x,0,cam.position.z);

// Walk animation — legs swing, arms sway, head bob, jaw clicks
const swing=Math.sin(ud.t)*0.4;
if(ud.lL)ud.lL.rotation.x=swing;
if(ud.lR)ud.lR.rotation.x=-swing;
if(ud.aL)ud.aL.rotation.x=-swing*.6;
if(ud.aR)ud.aR.rotation.x=swing*.6;
// Head slight bob
if(ud.hd){ud.hd.rotation.x=Math.sin(ud.t*2)*.05;ud.hd.rotation.z=.08+Math.sin(ud.t*.7)*.03}
// Jaw open/close
if(ud.jw)ud.jw.rotation.x=.15+Math.abs(Math.sin(ud.t*.5))*.15;
}

function mzExit(){
if(!mazeOn)return;
const ex=(MN-1)*MC+MC/2;
if(Math.hypot(cam.position.x-ex,cam.position.z-ex)<1.2)doFreedom();}

function doFreedom(){
mazeOn=false;entActive=false;
if(window.soosAudio)try{soosAudio.stop()}catch(e){}
// Kill Cubey
const cubeyDiv=document.getElementById('cubey');
if(cubeyDiv)cubeyDiv.style.display='none';
window.cubeyDead=true;
// FULLSCREEN white flash over entire page
const fb=document.createElement('div');
fb.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;background:#fff;z-index:99999';
document.body.appendChild(fb);
// Exit pointer lock
if(document.exitPointerLock)document.exitPointerLock();
setTimeout(()=>{
if(window.soosAudio&&soosAudio.playFreedom)try{soosAudio.playFreedom()}catch(e){}
fb.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100vh"><div id="fTxt" style="text-align:center;padding:40px;max-width:500px"></div></div>';
const lines=[
['the pc exploded.',18,'#333',2500],
['glass everywhere. smoke.',14,'#555',2500],
['your mom found you on the floor.',14,'#555',3000],
['you couldnt remember anything.',14,'#555',2500],
['not the pc. not the demos. not dustbowl.',13,'#666',3000],
['not 201.',13,'#666',2000],
['you spent 3 weeks in the hospital.',14,'#555',2500],
['burns on your hands and face.',14,'#555',2500],
['but you survived.',16,'#333',3000],
['and for the first time in 14 months',14,'#555',3000],
['you went outside.',16,'#333',3000],
['',14,'#555',3000],
['ENDING 4: freedom',20,'#cf6a32',0]];
const tb=document.getElementById('fTxt');let dl=2000;
lines.forEach(([t,s,c,d])=>{setTimeout(()=>{
const e=document.createElement('div');
e.style.cssText='opacity:0;transition:opacity 1.5s;margin:6px 0;font-family:VT323,monospace;font-size:'+s+'px;color:'+c;
e.textContent=t;tb.appendChild(e);setTimeout(()=>{e.style.opacity='1'},50)},dl);dl+=d+1500});
},3000);}
}// end go
