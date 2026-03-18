// home.js v3.6 — rebuilt for reliability
// Step 1: create window with a simple black div
// Step 2: load three.js, get actual pixel size, init renderer
// Step 3: use MeshBasicMaterial (no lights needed) to GUARANTEE visibility

const openHomeGame=()=>{
// Use absolute positioning so container fills window-body regardless of flex
createWindow('home','home.exe',640,480,
'<div id="hc" style="position:absolute;top:0;left:0;right:0;bottom:0;background:#000;overflow:hidden">'+
'<div id="hHud" style="position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:2">'+
'<div id="hCross" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#888;font-size:18px">+</div>'+
'<div id="hInt" style="position:absolute;bottom:50px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#999;opacity:0;transition:opacity .3s;text-align:center"></div>'+
'<div id="hMsg" style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#888;text-align:center;max-width:90%">Click to play. WASD move. Mouse look. E interact. F flashlight.</div>'+
'<div id="hRoom" style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:12px;color:#666"></div>'+
'<div id="hCnt" style="position:absolute;top:8px;right:12px;font-family:VT323,monospace;font-size:12px;color:#666"></div>'+
'</div></div>');
// Load Three.js then init
setTimeout(loadAndInit,400);
};

function loadAndInit(){
if(typeof THREE!=='undefined')return startGame();
const s=document.createElement('script');
s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
s.onload=startGame;
document.head.appendChild(s);
}

function startGame(){
const hc=document.getElementById('hc');
if(!hc||typeof THREE==='undefined')return;

// Create canvas, get ACTUAL pixel size from container
const W=hc.offsetWidth||640;
const H=hc.offsetHeight||400;
const cvs=document.createElement('canvas');
cvs.id='h3d';
cvs.width=W;
cvs.height=H;
cvs.style.cssText='display:block;width:100%;height:100%';
hc.insertBefore(cvs,hc.firstChild);

// === THREE.JS SETUP ===
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x111111);
const cam=new THREE.PerspectiveCamera(75,W/H,0.1,50);
cam.position.set(0,1.5,0);
const ren=new THREE.WebGLRenderer({canvas:cvs,antialias:false});
ren.setSize(W,H);

// === MATERIALS — DoubleSide, Phong for lighting ===
const DS=THREE.DoubleSide;
function ML(c,e){const m=new THREE.MeshPhongMaterial({color:c,side:DS,flatShading:true});if(e)m.emissive=new THREE.Color(e);return m}
function MB(c){return new THREE.MeshBasicMaterial({color:c,side:DS})}
function BX(x,y,z,m){return new THREE.Mesh(new THREE.BoxGeometry(x,y,z),m)}
function CY(r,h,s,m){return new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,s||6),m)}
const PI=Math.PI;

// === LIGHTS ===
const ambLight=new THREE.AmbientLight(0x333333,1);
scene.add(ambLight);
const flash=new THREE.SpotLight(0xffffff,3,18,0.55,0.5);
scene.add(flash);scene.add(flash.target);
let flashOn=true;

// === STATE ===
const grp=new THREE.Group();scene.add(grp);
let curRoom='hallway',locked=false,yaw=0,pitch=0;
const keys={},seen={};
let nObj=0,nDone=0,lookAt=null,msgTm=null;
let objList=[],exitList=[];
let rLight=null,mazeOn=false;

// === FURNITURE ===
function mkPC(){
const g=new THREE.Group();
const dt=BX(1.2,0.05,0.65,ML(0x2a2a10));dt.position.set(0,0.72,0);g.add(dt);
const dl=BX(0.05,0.72,0.6,ML(0x1a1a08));dl.position.set(-0.55,0.36,0);g.add(dl);
const dr=BX(0.05,0.72,0.6,ML(0x1a1a08));dr.position.set(0.55,0.36,0);g.add(dr);
const tw=BX(0.22,0.5,0.4,ML(0x1a1a2a));tw.position.set(-0.35,1,0.05);g.add(tw);
const mn=BX(0.48,0.38,0.3,ML(0x151515));mn.position.set(0.1,1.08,0.02);g.add(mn);
const sc=BX(0.4,0.3,0.01,ML(0x0a0a1a,0x060612));sc.position.set(0.1,1.08,-0.16);g.add(sc);
const kb=BX(0.35,0.02,0.1,ML(0x111111));kb.position.set(0.1,0.74,-0.28);g.add(kb);
return g;}

function mkFridge(){
const g=new THREE.Group();
const b=BX(0.65,1.8,0.55,ML(0x3a3a3a));b.position.set(0,0.9,0);g.add(b);
const h=BX(0.03,0.4,0.03,ML(0x666666));h.position.set(0.25,1.05,-0.3);g.add(h);
const ln=BX(0.55,0.02,0.01,ML(0x222222));ln.position.set(0,1.35,-0.28);g.add(ln);
return g;}

function mkStove(){
const g=new THREE.Group();
const b=BX(0.65,0.9,0.5,ML(0x2a2a28));b.position.set(0,0.45,0);g.add(b);
const d=BX(0.5,0.35,0.02,ML(0x1a1a18));d.position.set(0,0.3,-0.26);g.add(d);
return g;}

function mkTable(){
const g=new THREE.Group();
const t=BX(1.3,0.05,0.85,ML(0x3a2a0a));t.position.set(0,0.72,0);g.add(t);
for(const lx of[-0.55,0.55])for(const lz of[-0.35,0.35]){
const l=BX(0.05,0.72,0.05,ML(0x2a1a00));l.position.set(lx,0.36,lz);g.add(l);}
return g;}

function mkCouch(){
const g=new THREE.Group();
const s=BX(1.8,0.22,0.75,ML(0x1a1a30));s.position.set(0,0.22,0);g.add(s);
const b=BX(1.8,0.5,0.12,ML(0x181828));b.position.set(0,0.5,0.35);g.add(b);
const al=BX(0.12,0.38,0.75,ML(0x1a1a28));al.position.set(-0.88,0.3,0);g.add(al);
const ar=BX(0.12,0.38,0.75,ML(0x1a1a28));ar.position.set(0.88,0.3,0);g.add(ar);
return g;}

function mkTV(){
const g=new THREE.Group();
const st=BX(0.9,0.35,0.4,ML(0x1a1a10));st.position.set(0,0.175,0);g.add(st);
const bd=BX(0.8,0.65,0.55,ML(0x111118));bd.position.set(0,0.68,0);g.add(bd);
const sc=BX(0.6,0.45,0.02,ML(0x08080a));sc.position.set(0,0.7,-0.29);g.add(sc);
return g;}

function mkBed(){
const g=new THREE.Group();
const f=BX(1.4,0.18,2,ML(0x1a1410));f.position.set(0,0.12,0);g.add(f);
const m=BX(1.3,0.1,1.9,ML(0x1a1a28));m.position.set(0,0.27,0);g.add(m);
const hb=BX(1.4,0.65,0.07,ML(0x1a1208));hb.position.set(0,0.5,0.97);g.add(hb);
const p=BX(0.4,0.07,0.22,ML(0x282828));p.position.set(0,0.35,0.75);g.add(p);
return g;}

function mkShelf(){
const g=new THREE.Group();
const f=BX(0.9,1.9,0.3,ML(0x2a2a1a));f.position.set(0,0.95,0);g.add(f);
const cl=[0x3a1a1a,0x1a3a1a,0x1a1a3a,0x3a3a1a];
for(let r=0;r<4;r++)for(let c=0;c<4;c++){
const b=BX(0.06,0.18,0.18,ML(cl[(r+c)%4]));b.position.set(-0.28+c*0.17,0.25+r*0.48,0);g.add(b);}
return g;}

function mkSink(){
const g=new THREE.Group();
const b=BX(0.45,0.07,0.3,ML(0x3a3a3a));b.position.set(0,0.82,0);g.add(b);
const p=BX(0.1,0.82,0.1,ML(0x2a2a2a));p.position.set(0,0.41,0);g.add(p);
return g;}

function mkTub(){
const g=new THREE.Group();
const o=BX(0.65,0.45,1.4,ML(0x2a2a2a));o.position.set(0,0.225,0);g.add(o);
return g;}

function mkMbox(){
const g=new THREE.Group();
const p=BX(0.06,1,0.06,ML(0x3a3a3a));p.position.set(0,0.5,0);g.add(p);
const m=BX(0.22,0.18,0.3,ML(0x2a2a2a));m.position.set(0,1.08,0);g.add(m);
const fl=BX(0.02,0.12,0.02,ML(0xaa1111));fl.position.set(0.14,1.15,0);g.add(fl);
return g;}

// === ROOMS ===
// Each room: sz=[w,h,d], lc=light color, li=light intensity
// build(g) adds furniture to group, returns [{m:mesh,n:name,t:text}]
// exits=[{p:position,s:size,to:room,sp:spawn}]
const rooms={
hallway:{sz:[12,3,4],lc:0x887766,li:2,
build(g){
const l1=BX(0.3,0.06,0.3,ML(0x887766,0x221100));l1.position.set(-2,2.7,0);g.add(l1);
const l2=BX(0.3,0.06,0.3,ML(0x776655,0x181000));l2.position.set(2,2.7,0);g.add(l2);
const rk=BX(0.08,1.6,0.08,ML(0x2a1a0a));rk.position.set(-5,0.8,1.2);g.add(rk);
const sh=BX(0.3,0.08,0.15,ML(0x1a1a1a));sh.position.set(-5,0.04,0.6);g.add(sh);
return[{m:l1,n:'Hallway Light',t:'the light flickers sometimes. it didnt use 2'},
{m:rk,n:'Coat Rack',t:'ducks jacket is still hanging here. he stopped going outside months ago.'},
{m:sh,n:'Shoes',t:'old sneakers. the laces are still tied from the last time he wore them.'}];},
exits:[
{p:[-3,0.9,-1.95],s:[1,1.8,.15],to:'kitchen',sp:[0,1.5,1.8]},
{p:[3,0.9,-1.95],s:[1,1.8,.15],to:'living',sp:[0,1.5,2.2]},
{p:[-1,0.9,1.95],s:[1,1.8,.15],to:'bedroom',sp:[0,1.5,-2.2]},
{p:[3,0.9,1.95],s:[1,1.8,.15],to:'bath',sp:[0,1.5,-1.2]},
{p:[5.9,0.9,0],s:[.15,1.8,1],to:'outside',sp:[-4,1.5,0]},
{p:[-4,0.9,1.95],s:[1,1.8,.15],to:'master',sp:[0,1.5,-2.5]}]},

kitchen:{sz:[6,3,5],lc:0x777760,li:1.5,
build(g){
const fr=mkFridge();fr.position.set(-2,0,-2.1);fr.rotation.y=PI;g.add(fr);
const st=mkStove();st.position.set(1.5,0,-2);st.rotation.y=PI;g.add(st);
const tb=mkTable();tb.position.set(0,0,0.2);g.add(tb);
return[{m:fr,n:'Fridge',t:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
{m:st,n:'Stove',t:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
{m:tb,n:'Table',t:'we ate here as a family. before everything changed.'}];},
exits:[{p:[0,0.9,2.45],s:[1,1.8,.15],to:'hallway',sp:[-3,1.5,-1]}]},

living:{sz:[8,3,6],lc:0x666680,li:1.5,
build(g){
const tv=mkTV();tv.position.set(0,0,-2.6);tv.rotation.y=PI;g.add(tv);
const co=mkCouch();co.position.set(0,0,0.8);g.add(co);
const sh=mkShelf();sh.position.set(-3.65,0,0);sh.rotation.y=PI/2;g.add(sh);
return[{m:tv,n:'TV',t:'its off. it hasnt been on in a long time.'},
{m:co,n:'Couch',t:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
{m:sh,n:'Bookshelf',t:'moms books. she liked mystery novels. guess i became one.'}];},
exits:[{p:[0,0.9,2.95],s:[1,1.8,.15],to:'hallway',sp:[3,1.5,-1]}]},

bedroom:{sz:[7,3,6],lc:0x5566aa,li:1.2,
build(g){
const pc=mkPC();pc.position.set(-3,0,-.5);pc.rotation.y=-PI/2;g.add(pc);
const bd=mkBed();bd.position.set(2.3,0,.5);g.add(bd);
const bp=BX(.3,.3,.25,ML(0x2a1a1a));bp.position.set(-1,.15,-2.3);g.add(bp);
return[{m:pc,n:'My PC',t:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
{m:bd,n:'Bed',t:'i stopped sleeping. the dreams were always dustbowl.'},
{m:bp,n:'Backpack',t:'i havent been to school in weeks. they stopped calling.'}];},
exits:[{p:[0,0.9,-2.95],s:[1,1.8,.15],to:'hallway',sp:[-1,1.5,1]}]},

bath:{sz:[4,3,4],lc:0x668888,li:1.2,
build(g){
const sk=mkSink();sk.position.set(1.5,0,-.5);sk.rotation.y=-PI/2;g.add(sk);
const tb=mkTub();tb.position.set(-1.3,0,.3);g.add(tb);
const tw=BX(.35,.5,.02,ML(0x1a3a3a));tw.position.set(-1.92,1.3,-.5);g.add(tw);
return[{m:sk,n:'Sink',t:'the faucet drips. has for months. nobody fixed it.'},
{m:tb,n:'Bathtub',t:'cold water. duck stopped taking warm showers. didnt care anymore.'},
{m:tw,n:'Towel',t:'still damp. like someone just used it. but no one has been here in a long time.'}];},
exits:[{p:[0,0.9,-1.95],s:[1,1.8,.15],to:'hallway',sp:[3,1.5,1]}]},

master:{sz:[7,3,6],lc:0x443322,li:1,
build(g){
const fr=BX(1.4,.18,2,ML(0x1a1208));fr.position.set(2,.09,1);g.add(fr);
const trap=BX(.9,.04,.9,ML(0x3a2a0a,0x0a0500));trap.position.set(-.5,.02,0);g.add(trap);
const ring=CY(.06,.03,6,ML(0x666666));ring.position.set(-.5,.06,0);g.add(ring);
return[{m:fr,n:'Bed Frame',t:'no mattress. just springs. this was their room. before mom left.'},
{m:trap,n:'Trapdoor',t:'MAZE'}];},
exits:[{p:[0,0.9,-2.95],s:[1,1.8,.15],to:'hallway',sp:[-4,1.5,1]}]},

outside:{sz:[14,6,12],lc:0x444455,li:1,
build(g){
const yd=BX(5,.03,5,ML(0x0a2a0a));yd.position.set(0,.015,0);g.add(yd);
const mb=mkMbox();mb.position.set(3,0,3);g.add(mb);
const tr=CY(.12,2.2,5,ML(0x2a1a08));tr.position.set(-2,1.1,-3);g.add(tr);
const my=BX(.7,.7,.7,ML(0x444444,0x0a0000));my.position.set(4,.35,0);g.add(my);
return[{m:yd,n:'Yard',t:'the grass is dead. everything is dead.'},
{m:mb,n:'Mailbox',t:'full of mail nobody opened.'},
{m:tr,n:'Dead Tree',t:'this tree used to have a tire swing. dad took it down.'},
{m:my,n:'???',t:''}];},
exits:[{p:[-6.9,0.9,0],s:[.15,1.8,1.2],to:'hallway',sp:[5,1.5,0]}]},
};

// Count total objects
Object.values(rooms).forEach(r=>{const g=new THREE.Group();nObj+=r.build(g).length});

// === BUILD ROOM ===
function build(name){
while(grp.children.length)grp.remove(grp.children[0]);
if(rLight){scene.remove(rLight);rLight=null}
objList=[];exitList=[];
const r=rooms[name],sx=r.sz[0],sy=r.sz[1],sz=r.sz[2];
// Floor
const fl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),ML(0x3a3428));
fl.rotation.x=-PI/2;grp.add(fl);
// Walls + ceiling
if(name!=='outside'){
const ce=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),ML(0x2a2a2a));
ce.rotation.x=PI/2;ce.position.y=sy;grp.add(ce);
const wM=ML(0x353535);
const bk=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),wM);bk.position.set(0,sy/2,-sz/2);grp.add(bk);
const ft=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),wM);ft.position.set(0,sy/2,sz/2);ft.rotation.y=PI;grp.add(ft);
const lt=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),wM);lt.position.set(-sx/2,sy/2,0);lt.rotation.y=PI/2;grp.add(lt);
const rt=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),wM);rt.position.set(sx/2,sy/2,0);rt.rotation.y=-PI/2;grp.add(rt);
}
// Room point light
rLight=new THREE.PointLight(r.lc,r.li,25);
rLight.position.set(0,sy-.3,0);scene.add(rLight);
// Furniture
const built=r.build(grp);
built.forEach(b=>{b.m.userData={name:b.n,msg:b.t,room:name};objList.push(b.m)});
// Exit doorways
r.exits.forEach(e=>{
const m=BX(e.s[0],e.s[1],e.s[2],MB(0x060606));
m.position.set(e.p[0],e.p[1],e.p[2]);
m.userData={exit:true,to:e.to,spawn:e.sp};
grp.add(m);exitList.push(m);});
const el=document.getElementById('hRoom');if(el)el.textContent=name.toUpperCase();
const cn=document.getElementById('hCnt');if(cn)cn.textContent=nDone+'/'+nObj;
}
build('hallway');

// === CONTROLS ===
hc.addEventListener('click',()=>{if(!locked)hc.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=(document.pointerLockElement===hc)});
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*.002;pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*.002))});
document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;if(k==='f'){flashOn=!flashOn;flash.intensity=flashOn?3:0}});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function msg(t){const el=document.getElementById('hMsg');if(!el)return;el.textContent=t;clearTimeout(msgTm);msgTm=setTimeout(()=>{el.textContent=''},5000)}

function doInteract(){
if(!lookAt)return;const ud=lookAt.userData;
if(ud.exit){curRoom=ud.to;cam.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);build(curRoom);return}
if(!ud.name)return;
const k=ud.room+'-'+ud.name;
if(!seen[k]){seen[k]=1;nDone++;const cn=document.getElementById('hCnt');if(cn)cn.textContent=nDone+'/'+nObj}
if(ud.msg==='MAZE'){msg('descending...');setTimeout(startMaze,1500);return}
if(curRoom==='outside'&&ud.name==='???'){
if(nDone>=nObj)msg('Im still here at home');
else msg('i cant go yet. theres more i need to remember. ('+nDone+'/'+nObj+')');return;}
msg(ud.msg||'...');
}

// === RAYCAST ===
const ray=new THREE.Raycaster(),ctr2=new THREE.Vector2(0,0);

// === GAME LOOP ===
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
flash.position.copy(cam.position);
const fv=new THREE.Vector3(0,0,-1).applyQuaternion(cam.quaternion);
flash.target.position.copy(cam.position).add(fv.multiplyScalar(6));
if(keys.e){doInteract();keys.e=false}
if(mazeOn){mzEntity();mzCheckExit()}
if(!mazeOn){
const all=[];objList.forEach(o=>{if(o.isMesh)all.push(o);else o.traverse(c=>{if(c.isMesh)all.push(c)})});exitList.forEach(m=>all.push(m));
ray.setFromCamera(ctr2,cam);const h=ray.intersectObjects(all,false);
const ie=document.getElementById('hInt'),ch=document.getElementById('hCross');lookAt=null;
if(h.length&&h[0].distance<4){let o=h[0].object;while(o&&!o.userData.name&&!o.userData.exit&&o.parent&&o.parent!==grp)o=o.parent;
if(o.userData.name||o.userData.exit){lookAt=o;if(ie){ie.textContent=o.userData.exit?'[E] '+o.userData.to:'[E] '+o.userData.name;ie.style.opacity='1'}if(ch)ch.style.color='#cf6a32'}}
if(!lookAt){if(ie)ie.style.opacity='0';if(ch)ch.style.color='#888'}
for(let i=0;i<exitList.length;i++){if(cam.position.distanceTo(exitList[i].position)<.9){const u=exitList[i].userData;curRoom=u.to;cam.position.set(u.spawn[0],u.spawn[1],u.spawn[2]);build(curRoom);break}}}
ren.render(scene,cam);
}
tick();

// Resize
new ResizeObserver(()=>{const w=hc.offsetWidth,h=hc.offsetHeight;if(w>0&&h>0){ren.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()}}).observe(hc);

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
while(grp.children.length)grp.remove(grp.children[0]);
if(rLight){scene.remove(rLight);rLight=null}
objList=[];exitList=[];
mzGrid=mzGen(MN,MN);
const tw=MN*MC,mW=ML(0x2a2a2a),mF=ML(0x1a1815);
const fl=new THREE.Mesh(new THREE.PlaneGeometry(tw+2,tw+2),mF);fl.rotation.x=-PI/2;fl.position.set(tw/2,0,tw/2);grp.add(fl);
const cl=new THREE.Mesh(new THREE.PlaneGeometry(tw+2,tw+2),ML(0x0f0f0f));cl.rotation.x=PI/2;cl.position.set(tw/2,MH,tw/2);grp.add(cl);
const wg=new THREE.BoxGeometry(MC,MH,.1),wgs=new THREE.BoxGeometry(.1,MH,MC);
for(let y=0;y<MN;y++)for(let x=0;x<MN;x++){
if(mzGrid[y][x].n){const w=new THREE.Mesh(wg,mW);w.position.set(x*MC+MC/2,MH/2,y*MC);grp.add(w)}
if(mzGrid[y][x].w){const w=new THREE.Mesh(wgs,mW);w.position.set(x*MC,MH/2,y*MC+MC/2);grp.add(w)}}
for(let x=0;x<MN;x++){const w=new THREE.Mesh(wg,mW);w.position.set(x*MC+MC/2,MH/2,MN*MC);grp.add(w)}
for(let y=0;y<MN;y++){const w=new THREE.Mesh(wgs,mW);w.position.set(MN*MC,MH/2,y*MC+MC/2);grp.add(w)}
const em=BX(.5,.1,.5,MB(0x00ff00));em.position.set((MN-1)*MC+MC/2,.05,(MN-1)*MC+MC/2);grp.add(em);
// Dim ambient for maze
ambLight.intensity=0.1;ambLight.color.setHex(0x050505);
// Entity
ent=new THREE.Group();
const eB=BX(.35,2,.25,MB(0x050505));eB.position.set(0,1,0);ent.add(eB);
const eH=BX(.3,.35,.25,MB(0x080808));eH.position.set(0,2.15,0);ent.add(eH);
const eL=BX(.04,.04,.02,MB(0xff0000));eL.position.set(-.08,2.2,-.14);ent.add(eL);
const eR=BX(.04,.04,.02,MB(0xff0000));eR.position.set(.08,2.2,-.14);ent.add(eR);
const aL=BX(.08,1.3,.08,MB(0x050505));aL.position.set(-.25,.7,0);ent.add(aL);
const aR=BX(.08,1.3,.08,MB(0x050505));aR.position.set(.25,.7,0);ent.add(aR);
ePos.x=(MN-1)*MC+MC/2;ePos.z=(MN-3)*MC+MC/2;
ent.position.set(ePos.x,0,ePos.z);grp.add(ent);
cam.position.set(MC/2,1.5,MC/2);yaw=0;pitch=0;
const el=document.getElementById('hRoom');if(el)el.textContent='BASEMENT';
msg('find the green light. dont look back.');
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

let eTk=0;
function mzEntity(){
if(!ent||!mazeOn)return;eTk++;if(eTk%3)return;
const s=.04,dx=cam.position.x-ePos.x,dz=cam.position.z-ePos.z;
const dd=Math.sqrt(dx*dx+dz*dz);if(dd<.01)return;
const nx=ePos.x+dx/dd*s,nz=ePos.z+dz/dd*s;
if(mzOk(nx,ePos.z))ePos.x=nx;else if(mzOk(ePos.x,nz))ePos.z=nz;
ent.position.set(ePos.x,0,ePos.z);
ent.lookAt(cam.position.x,0,cam.position.z);
}

function mzCheckExit(){
if(!mazeOn)return;
const ex=(MN-1)*MC+MC/2,ez=ex;
if(Math.hypot(cam.position.x-ex,cam.position.z-ez)<1.2)doFreedom();}

function doFreedom(){
mazeOn=false;if(window.soosAudio)try{soosAudio.stop()}catch(e){}
const fb=document.createElement('div');
fb.style.cssText='position:absolute;top:0;left:0;right:0;bottom:0;background:#fff;z-index:99';
hc.appendChild(fb);
setTimeout(()=>{
if(window.soosAudio&&soosAudio.playFreedom)try{soosAudio.playFreedom()}catch(e){}
fb.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%"><div id="fTxt" style="text-align:center;padding:40px;max-width:500px"></div></div>';
const lines=[
['the pc exploded.',18,'#333',2500],
['glass everywhere. smoke.',14,'#555',2500],
['his mom found him on the floor.',14,'#555',3000],
['he couldnt remember anything.',14,'#555',2500],
['not the pc. not the demos. not dustbowl.',13,'#666',3000],
['not 201.',13,'#666',2000],
['he spent 3 weeks in the hospital.',14,'#555',2500],
['burns on his hands and face.',14,'#555',2500],
['but he survived.',16,'#333',3000],
['and for the first time in 14 months',14,'#555',3000],
['he went outside.',16,'#333',3000],
['',14,'#555',3000],
['ENDING 4: freedom',20,'#cf6a32',0]];
const tb=document.getElementById('fTxt');let dl=2000;
lines.forEach(([t,s,c,d])=>{setTimeout(()=>{
const e=document.createElement('div');
e.style.cssText='opacity:0;transition:opacity 1.5s;margin:6px 0;font-family:VT323,monospace;font-size:'+s+'px;color:'+c;
e.textContent=t;tb.appendChild(e);setTimeout(()=>{e.style.opacity='1'},50)},dl);dl+=d+1500});
},3000);
}
}// end startGame
