// home.js v3.6 — rebuilt from scratch for reliability
let _homeLoaded=false;
const openHomeGame=()=>{
// Simple HTML - no overlay, canvas fills container
const h='<div id="hc" style="width:100%;height:100%;min-height:300px;background:#000;position:relative;overflow:hidden"><canvas id="h3d"></canvas><div id="hCross" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#888;font-size:18px;pointer-events:none">+</div><div id="hInt" style="position:absolute;bottom:50px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#888;pointer-events:none;opacity:0;transition:opacity 0.3s;text-align:center"></div><div id="hMsg" style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#888;pointer-events:none;text-align:center;max-width:90%">Click to play. WASD move. Mouse look. E interact. F flashlight.</div><div id="hRoom" style="position:absolute;top:8px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:12px;color:#555;pointer-events:none"></div><div id="hCount" style="position:absolute;top:8px;right:12px;font-family:VT323,monospace;font-size:12px;color:#555;pointer-events:none"></div></div>';
createWindow('home','home.exe',640,480,h);
setTimeout(()=>{
if(typeof THREE!=='undefined')return initHome();
const s=document.createElement('script');
s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
s.onload=()=>initHome();
s.onerror=()=>{const m=document.getElementById('hMsg');if(m)m.textContent='3D engine failed to load'};
document.head.appendChild(s);
},300);
};

function initHome(){
const box=document.getElementById('hc');
const cvs=document.getElementById('h3d');
if(!box||!cvs)return;

// Get actual pixel dimensions
const W=box.clientWidth||640;
const H=box.clientHeight||400;

// Set canvas size explicitly
cvs.width=W;cvs.height=H;
cvs.style.width=W+'px';
cvs.style.height=H+'px';
cvs.style.display='block';

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x0a0a0a);

const cam=new THREE.PerspectiveCamera(75,W/H,0.1,50);
cam.position.set(0,1.5,0);

const ren=new THREE.WebGLRenderer({canvas:cvs});
ren.setSize(W,H);

// === MATERIALS — all DoubleSide ===
const DS=THREE.DoubleSide;
function Mat(c){return new THREE.MeshBasicMaterial({color:c,side:DS})}
function MatL(c){return new THREE.MeshPhongMaterial({color:c,side:DS,flatShading:true})}
function Box(x,y,z,m){return new THREE.Mesh(new THREE.BoxGeometry(x,y,z),m)}
function Cyl(r,h,s,m){return new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,s||6),m)}

// === LIGHTS ===
const amb=new THREE.AmbientLight(0x444444);scene.add(amb);
const flash=new THREE.SpotLight(0xffffff,2,20,0.6,0.5);
flash.position.copy(cam.position);scene.add(flash);scene.add(flash.target);
let flashOn=true;

// === ROOM SYSTEM ===
const grp=new THREE.Group();scene.add(grp);
let curRoom='hallway',locked=false,yaw=0,pitch=0;
const keys={},interacted={};
let totalObj=0,totalDone=0,lookAt=null,msgT=null;
let objs=[],exits=[];
let roomLit=null;
let mazeActive=false;

// Furniture builders
function mkPC(){
const g=new THREE.Group();
const dt=Box(1.2,0.05,0.65,MatL(0x2a2a10));dt.position.set(0,0.72,0);g.add(dt);
const dl=Box(0.05,0.72,0.6,MatL(0x1a1a08));dl.position.set(-0.55,0.36,0);g.add(dl);
const dr=Box(0.05,0.72,0.6,MatL(0x1a1a08));dr.position.set(0.55,0.36,0);g.add(dr);
const tw=Box(0.22,0.5,0.4,MatL(0x1a1a2a));tw.position.set(-0.35,1,0.05);g.add(tw);
const mn=Box(0.48,0.38,0.3,MatL(0x151515));mn.position.set(0.1,1.08,0.02);g.add(mn);
const sc=Box(0.4,0.3,0.01,MatL(0x1a1a3a));sc.position.set(0.1,1.08,-0.16);g.add(sc);
const kb=Box(0.35,0.02,0.1,MatL(0x111111));kb.position.set(0.1,0.74,-0.28);g.add(kb);
return g;
}
function mkFridge(){
const g=new THREE.Group();
const b=Box(0.65,1.8,0.55,MatL(0x3a3a3a));b.position.set(0,0.9,0);g.add(b);
const h=Box(0.03,0.4,0.03,MatL(0x666666));h.position.set(0.25,1.05,-0.3);g.add(h);
return g;
}
function mkStove(){
const g=new THREE.Group();
const b=Box(0.65,0.9,0.5,MatL(0x2a2a28));b.position.set(0,0.45,0);g.add(b);
return g;
}
function mkTable(){
const g=new THREE.Group();
const t=Box(1.3,0.05,0.85,MatL(0x3a2a0a));t.position.set(0,0.72,0);g.add(t);
for(const lx of[-0.55,0.55])for(const lz of[-0.35,0.35]){
const l=Box(0.05,0.72,0.05,MatL(0x2a1a00));l.position.set(lx,0.36,lz);g.add(l);}
return g;
}
function mkCouch(){
const g=new THREE.Group();
const s=Box(1.8,0.22,0.75,MatL(0x1a1a30));s.position.set(0,0.22,0);g.add(s);
const b=Box(1.8,0.5,0.12,MatL(0x181828));b.position.set(0,0.5,0.35);g.add(b);
return g;
}
function mkTV(){
const g=new THREE.Group();
const st=Box(0.9,0.35,0.4,MatL(0x1a1a10));st.position.set(0,0.175,0);g.add(st);
const bd=Box(0.8,0.65,0.55,MatL(0x111118));bd.position.set(0,0.68,0);g.add(bd);
const sc=Box(0.6,0.45,0.02,MatL(0x08080a));sc.position.set(0,0.7,-0.29);g.add(sc);
return g;
}
function mkBed(){
const g=new THREE.Group();
const f=Box(1.4,0.18,2,MatL(0x1a1410));f.position.set(0,0.12,0);g.add(f);
const m=Box(1.3,0.1,1.9,MatL(0x1a1a28));m.position.set(0,0.27,0);g.add(m);
const hb=Box(1.4,0.65,0.07,MatL(0x1a1208));hb.position.set(0,0.5,0.97);g.add(hb);
return g;
}
function mkBookshelf(){
const g=new THREE.Group();
const f=Box(0.9,1.9,0.3,MatL(0x2a2a1a));f.position.set(0,0.95,0);g.add(f);
const cols=[0x3a1a1a,0x1a3a1a,0x1a1a3a,0x3a3a1a];
for(let sy=0;sy<4;sy++)for(let bk=0;bk<4;bk++){
const b=Box(0.06,0.18,0.18,MatL(cols[(sy+bk)%4]));b.position.set(-0.28+bk*0.17,0.25+sy*0.48,0);g.add(b);}
return g;
}
function mkSink(){
const g=new THREE.Group();
const b=Box(0.45,0.07,0.3,MatL(0x3a3a3a));b.position.set(0,0.82,0);g.add(b);
const p=Box(0.1,0.82,0.1,MatL(0x2a2a2a));p.position.set(0,0.41,0);g.add(p);
return g;
}
function mkBathtub(){
const g=new THREE.Group();
const o=Box(0.65,0.45,1.4,MatL(0x2a2a2a));o.position.set(0,0.225,0);g.add(o);
return g;
}
function mkMailbox(){
const g=new THREE.Group();
const p=Box(0.06,1,0.06,MatL(0x3a3a3a));p.position.set(0,0.5,0);g.add(p);
const m=Box(0.22,0.18,0.3,MatL(0x2a2a2a));m.position.set(0,1.08,0);g.add(m);
return g;
}

// Rooms
const PI=Math.PI;
const rooms={
hallway:{sz:[12,3,4],lc:0x887766,li:1.5,
build(g){
const l1=Box(0.3,0.06,0.3,Mat(0x887766));l1.position.set(-2,2.7,0);g.add(l1);
const l2=Box(0.3,0.06,0.3,Mat(0x776655));l2.position.set(2,2.7,0);g.add(l2);
const rack=Box(0.08,1.6,0.08,MatL(0x2a1a0a));rack.position.set(-5,0.8,1.2);g.add(rack);
const shoe=Box(0.3,0.08,0.15,MatL(0x1a1a1a));shoe.position.set(-5,0.04,0.6);g.add(shoe);
return[
{m:l1,n:'Hallway Light',t:'the light flickers sometimes. it didnt use 2'},
{m:rack,n:'Coat Rack',t:'ducks jacket is still hanging here. he stopped going outside months ago.'},
{m:shoe,n:'Shoes',t:'old sneakers. the laces are still tied from the last time he wore them.'},
];},
exits:[
{p:[-3,0.9,-1.95],s:[1,1.8,0.15],to:'kitchen',sp:[0,1.5,1.8]},
{p:[3,0.9,-1.95],s:[1,1.8,0.15],to:'living',sp:[0,1.5,2.2]},
{p:[-1,0.9,1.95],s:[1,1.8,0.15],to:'bedroom',sp:[0,1.5,-2.2]},
{p:[3,0.9,1.95],s:[1,1.8,0.15],to:'bath',sp:[0,1.5,-1.2]},
{p:[5.9,0.9,0],s:[0.15,1.8,1],to:'outside',sp:[-4,1.5,0]},
{p:[-4,0.9,1.95],s:[1,1.8,0.15],to:'master',sp:[0,1.5,-2.5]},
]},
kitchen:{sz:[6,3,5],lc:0x777760,li:1.2,
build(g){
const fr=mkFridge();fr.position.set(-2,0,-2.1);fr.rotation.y=PI;g.add(fr);
const st=mkStove();st.position.set(1.5,0,-2);st.rotation.y=PI;g.add(st);
const tb=mkTable();tb.position.set(0,0,0.2);g.add(tb);
return[
{m:fr,n:'Fridge',t:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
{m:st,n:'Stove',t:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
{m:tb,n:'Table',t:'we ate here as a family. before everything changed.'},
];},
exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[-3,1.5,-1]}]},
living:{sz:[8,3,6],lc:0x666680,li:1.2,
build(g){
const tv=mkTV();tv.position.set(0,0,-2.6);tv.rotation.y=PI;g.add(tv);
const co=mkCouch();co.position.set(0,0,0.8);g.add(co);
const sh=mkBookshelf();sh.position.set(-3.65,0,0);sh.rotation.y=PI/2;g.add(sh);
return[
{m:tv,n:'TV',t:'its off. it hasnt been on in a long time.'},
{m:co,n:'Couch',t:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
{m:sh,n:'Bookshelf',t:'moms books. she liked mystery novels. guess i became one.'},
];},
exits:[{p:[0,0.9,2.95],s:[1,1.8,0.15],to:'hallway',sp:[3,1.5,-1]}]},
bedroom:{sz:[7,3,6],lc:0x5566aa,li:1.0,
build(g){
const pc=mkPC();pc.position.set(-3,0,-0.5);pc.rotation.y=-PI/2;g.add(pc);
const bed=mkBed();bed.position.set(2.3,0,0.5);g.add(bed);
const bp=Box(0.3,0.3,0.25,MatL(0x2a1a1a));bp.position.set(-1,0.15,-2.3);g.add(bp);
return[
{m:pc,n:'My PC',t:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
{m:bed,n:'Bed',t:'i stopped sleeping. the dreams were always dustbowl.'},
{m:bp,n:'Backpack',t:'i havent been to school in weeks. they stopped calling.'},
];},
exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[-1,1.5,1]}]},
bath:{sz:[4,3,4],lc:0x668888,li:1.0,
build(g){
const sk=mkSink();sk.position.set(1.5,0,-0.5);sk.rotation.y=-PI/2;g.add(sk);
const tb=mkBathtub();tb.position.set(-1.3,0,0.3);g.add(tb);
const tw=Box(0.35,0.5,0.02,MatL(0x1a3a3a));tw.position.set(-1.92,1.3,-0.5);g.add(tw);
return[
{m:sk,n:'Sink',t:'the faucet drips. has for months. nobody fixed it.'},
{m:tb,n:'Bathtub',t:'cold water. duck stopped taking warm showers. didnt care anymore.'},
{m:tw,n:'Towel',t:'still damp. like someone just used it. but no one has been here in a long time.'},
];},
exits:[{p:[0,0.9,-1.95],s:[1,1.8,0.15],to:'hallway',sp:[3,1.5,1]}]},
master:{sz:[7,3,6],lc:0x443322,li:0.8,
build(g){
const fr=Box(1.4,0.18,2,MatL(0x1a1208));fr.position.set(2,0.09,1);g.add(fr);
const trap=Box(0.9,0.04,0.9,MatL(0x3a2a0a));trap.position.set(-0.5,0.02,0);g.add(trap);
const ring=Cyl(0.06,0.03,6,MatL(0x666666));ring.position.set(-0.5,0.06,0);g.add(ring);
return[
{m:fr,n:'Bed Frame',t:'no mattress. just springs. this was their room. before mom left.'},
{m:trap,n:'Trapdoor',t:'MAZE'},
];},
exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[-4,1.5,1]}]},
outside:{sz:[14,6,12],lc:0x444455,li:0.8,
build(g){
const yd=Box(5,0.03,5,MatL(0x0a2a0a));yd.position.set(0,0.015,0);g.add(yd);
const mb=mkMailbox();mb.position.set(3,0,3);g.add(mb);
const tr=Cyl(0.12,2.2,5,MatL(0x2a1a08));tr.position.set(-2,1.1,-3);g.add(tr);
const my=Box(0.7,0.7,0.7,Mat(0x444444));my.position.set(4,0.35,0);g.add(my);
return[
{m:yd,n:'Yard',t:'the grass is dead. everything is dead.'},
{m:mb,n:'Mailbox',t:'full of mail nobody opened.'},
{m:tr,n:'Dead Tree',t:'this tree used to have a tire swing. dad took it down.'},
{m:my,n:'???',t:''},
];},
exits:[{p:[-6.9,0.9,0],s:[0.15,1.8,1.2],to:'hallway',sp:[5,1.5,0]}]},
};

Object.values(rooms).forEach(r=>{const g=new THREE.Group();totalObj+=r.build(g).length});

function buildRoom(name){
while(grp.children.length)grp.remove(grp.children[0]);
if(roomLit){scene.remove(roomLit);roomLit=null}
objs=[];exits=[];
const r=rooms[name];
const sx=r.sz[0],sy=r.sz[1],sz=r.sz[2];
// Floor
const fl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),MatL(0x3a3428));
fl.rotation.x=-Math.PI/2;grp.add(fl);
// Ceiling
if(name!=='outside'){
const cl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),MatL(0x2a2a2a));
cl.rotation.x=Math.PI/2;cl.position.y=sy;grp.add(cl);
}
// Walls
const wMat=MatL(0x353535);
if(name!=='outside'){
const bk=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),wMat);bk.position.set(0,sy/2,-sz/2);grp.add(bk);
const fr=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),wMat);fr.position.set(0,sy/2,sz/2);fr.rotation.y=PI;grp.add(fr);
const le=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),wMat);le.position.set(-sx/2,sy/2,0);le.rotation.y=PI/2;grp.add(le);
const ri=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),wMat);ri.position.set(sx/2,sy/2,0);ri.rotation.y=-PI/2;grp.add(ri);
}
// Room light
roomLit=new THREE.PointLight(r.lc,r.li,25);roomLit.position.set(0,sy-0.3,0);scene.add(roomLit);
// Objects
const built=r.build(grp);
built.forEach(b=>{b.m.userData={name:b.n,msg:b.t,room:name};objs.push(b.m)});
// Exits
r.exits.forEach(ex=>{
const m=Box(ex.s[0],ex.s[1],ex.s[2],Mat(0x0a0a0a));
m.position.set(ex.p[0],ex.p[1],ex.p[2]);
m.userData={exit:true,to:ex.to,spawn:ex.sp};
grp.add(m);exits.push(m);
});
const rn=document.getElementById('hRoom');if(rn)rn.textContent=name.toUpperCase();
const cn=document.getElementById('hCount');if(cn)cn.textContent=totalDone+'/'+totalObj;
}
buildRoom('hallway');

// === CONTROLS ===
box.addEventListener('click',()=>{if(!locked)box.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===box});
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*0.002;pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*0.002))});
document.addEventListener('keydown',e=>{
const k=e.key.toLowerCase();keys[k]=true;
if(k==='f'){flashOn=!flashOn;flash.intensity=flashOn?2:0}
});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function showMsg(t){const el=document.getElementById('hMsg');if(!el)return;el.textContent=t;clearTimeout(msgT);msgT=setTimeout(()=>{el.textContent=''},5000)}

function interact(){
if(!lookAt)return;const ud=lookAt.userData;
if(ud.exit){curRoom=ud.to;cam.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);return}
if(!ud.name)return;
const key=ud.room+'-'+ud.name;
if(!interacted[key]){interacted[key]=true;totalDone++;const cn=document.getElementById('hCount');if(cn)cn.textContent=totalDone+'/'+totalObj}
if(ud.msg==='MAZE'){showMsg('descending...');setTimeout(()=>launchMaze(),1500);return}
if(curRoom==='outside'&&ud.name==='???'){
if(totalDone>=totalObj)showMsg('Im still here at home');
else showMsg('i cant go yet. theres more i need to remember. ('+totalDone+'/'+totalObj+')');
return;}
showMsg(ud.msg||'...');
}

// Raycast
const ray=new THREE.Raycaster(),ctr=new THREE.Vector2(0,0);

// === MAIN LOOP ===
function loop(){
if(!document.getElementById('h3d'))return;
requestAnimationFrame(loop);
// Move
const spd=0.06,dir=new THREE.Vector3();
if(keys['w'])dir.z-=1;if(keys['s'])dir.z+=1;if(keys['a'])dir.x-=1;if(keys['d'])dir.x+=1;
if(dir.lengthSq()>0){
dir.normalize().multiplyScalar(spd);dir.applyAxisAngle(new THREE.Vector3(0,1,0),yaw);
const nx=cam.position.x+dir.x,nz=cam.position.z+dir.z;
if(mazeActive){
if(mazeOk(nx,cam.position.z))cam.position.x=nx;
if(mazeOk(cam.position.x,nz))cam.position.z=nz;
}else{
const r=rooms[curRoom];if(r){
const hx=r.sz[0]/2-0.4,hz=r.sz[2]/2-0.4;
if(nx>-hx&&nx<hx)cam.position.x=nx;
if(nz>-hz&&nz<hz)cam.position.z=nz;
}}}
cam.rotation.set(0,0,0);cam.rotateY(yaw);cam.rotateX(pitch);
// Flash
flash.position.copy(cam.position);
const fd=new THREE.Vector3(0,0,-1).applyQuaternion(cam.quaternion);
flash.target.position.copy(cam.position).add(fd.multiplyScalar(6));
// Interact
if(keys['e']){interact();keys['e']=false}
// Maze
if(mazeActive){updateEntity();checkExit()}
// Raycast
if(!mazeActive){
const allM=[];
objs.forEach(o=>{if(o.isMesh)allM.push(o);else o.traverse(c=>{if(c.isMesh)allM.push(c)})});
exits.forEach(m=>allM.push(m));
ray.setFromCamera(ctr,cam);
const hits=ray.intersectObjects(allM,false);
const iEl=document.getElementById('hInt'),ch=document.getElementById('hCross');
lookAt=null;
if(hits.length&&hits[0].distance<4){
let o=hits[0].object;
while(o&&!o.userData.name&&!o.userData.exit&&o.parent&&o.parent!==grp)o=o.parent;
if(o.userData.name||o.userData.exit){lookAt=o;if(iEl){iEl.textContent=o.userData.exit?'[E] '+o.userData.to:'[E] '+o.userData.name;iEl.style.opacity='1'}if(ch)ch.style.color='#cf6a32'}
}
if(!lookAt){if(iEl)iEl.style.opacity='0';if(ch)ch.style.color='#888'}
for(let i=0;i<exits.length;i++){if(cam.position.distanceTo(exits[i].position)<0.9){const ud=exits[i].userData;curRoom=ud.to;cam.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);break}}
}
ren.render(scene,cam);
}
loop();

// Resize
new ResizeObserver(()=>{const w=box.clientWidth,h=box.clientHeight;if(w>0&&h>0){ren.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix()}}).observe(box);

// ============ MAZE ============
let mazeGrid=null,entityMesh=null,entityPos={x:0,z:0};
const MS=20,CL=2,WH=3;

function genMaze(w,h){
const g=[];
for(let y=0;y<h;y++){g[y]=[];for(let x=0;x<w;x++)g[y][x]={n:1,s:1,e:1,w:1,v:0}}
const st=[];let cx=0,cy=0;g[cy][cx].v=1;st.push([cx,cy]);
while(st.length){
const nb=[];
if(cy>0&&!g[cy-1][cx].v)nb.push([cx,cy-1,'n','s']);
if(cy<h-1&&!g[cy+1][cx].v)nb.push([cx,cy+1,'s','n']);
if(cx>0&&!g[cy][cx-1].v)nb.push([cx-1,cy,'w','e']);
if(cx<w-1&&!g[cy][cx+1].v)nb.push([cx+1,cy,'e','w']);
if(nb.length){const[nx,ny,wl,op]=nb[Math.floor(Math.random()*nb.length)];g[cy][cx][wl]=0;g[ny][nx][op]=0;g[ny][nx].v=1;st.push([cx,cy]);cx=nx;cy=ny}
else{const p=st.pop();cx=p[0];cy=p[1]}}
return g;
}

function launchMaze(){
mazeActive=true;curRoom='maze';
while(grp.children.length)grp.remove(grp.children[0]);
if(roomLit)scene.remove(roomLit);
objs=[];exits=[];
mazeGrid=genMaze(MS,MS);
const tw=MS*CL;
const mW=MatL(0x2a2a2a),mF2=MatL(0x1a1815);
// Floor + ceiling
const fl=new THREE.Mesh(new THREE.PlaneGeometry(tw+2,tw+2),mF2);
fl.rotation.x=-PI/2;fl.position.set(tw/2,0,tw/2);grp.add(fl);
const cl=new THREE.Mesh(new THREE.PlaneGeometry(tw+2,tw+2),MatL(0x0f0f0f));
cl.rotation.x=PI/2;cl.position.set(tw/2,WH,tw/2);grp.add(cl);
// Walls
const wg=new THREE.BoxGeometry(CL,WH,0.1);
const wgs=new THREE.BoxGeometry(0.1,WH,CL);
for(let y=0;y<MS;y++)for(let x=0;x<MS;x++){
const c=mazeGrid[y][x];
if(c.n){const w=new THREE.Mesh(wg,mW);w.position.set(x*CL+CL/2,WH/2,y*CL);grp.add(w)}
if(c.w){const w=new THREE.Mesh(wgs,mW);w.position.set(x*CL,WH/2,y*CL+CL/2);grp.add(w)}
}
for(let x=0;x<MS;x++){const w=new THREE.Mesh(wg,mW);w.position.set(x*CL+CL/2,WH/2,MS*CL);grp.add(w)}
for(let y=0;y<MS;y++){const w=new THREE.Mesh(wgs,mW);w.position.set(MS*CL,WH/2,y*CL+CL/2);grp.add(w)}
// Exit glow
const ex=Box(0.5,0.1,0.5,Mat(0x00ff00));ex.position.set((MS-1)*CL+CL/2,0.05,(MS-1)*CL+CL/2);grp.add(ex);
// Dim ambient
scene.remove(amb);const da=new THREE.AmbientLight(0x050505,0.1);scene.add(da);
// Entity
entityMesh=new THREE.Group();
const eB=Box(0.35,2,0.25,Mat(0x050505));eB.position.y=1;entityMesh.add(eB);
const eH=Box(0.3,0.35,0.25,Mat(0x080808));eH.position.y=2.15;entityMesh.add(eH);
const eEL=Box(0.04,0.04,0.02,Mat(0xff0000));eEL.position.set(-0.08,2.2,-0.14);entityMesh.add(eEL);
const eER=Box(0.04,0.04,0.02,Mat(0xff0000));eER.position.set(0.08,2.2,-0.14);entityMesh.add(eER);
const eAL=Box(0.08,1.3,0.08,Mat(0x050505));eAL.position.set(-0.25,0.7,0);entityMesh.add(eAL);
const eAR=Box(0.08,1.3,0.08,Mat(0x050505));eAR.position.set(0.25,0.7,0);entityMesh.add(eAR);
entityPos.x=(MS-1)*CL+CL/2;entityPos.z=(MS-3)*CL+CL/2;
entityMesh.position.set(entityPos.x,0,entityPos.z);
grp.add(entityMesh);
cam.position.set(CL/2,1.5,CL/2);yaw=0;pitch=0;
const rn=document.getElementById('hRoom');if(rn)rn.textContent='BASEMENT';
showMsg('find the green light. dont look back.');
if(window.soosAudio){soosAudio.stop();soosAudio.playPuzzle&&soosAudio.playPuzzle()}
}

function mazeOk(x,z){
if(!mazeGrid)return false;
const cx=Math.floor(x/CL),cz=Math.floor(z/CL);
if(cx<0||cx>=MS||cz<0||cz>=MS)return false;
const lx=x-cx*CL,lz=z-cz*CL;
if(lz<0.3&&mazeGrid[cz][cx].n)return false;
if(lz>CL-0.3&&(cz>=MS-1||mazeGrid[cz][cx].s))return false;
if(lx<0.3&&mazeGrid[cz][cx].w)return false;
if(lx>CL-0.3&&(cx>=MS-1||mazeGrid[cz][cx].e))return false;
return true;
}

let eTick=0;
function updateEntity(){
if(!entityMesh||!mazeActive)return;
eTick++;if(eTick%3)return;
const s=0.04;
const dx=cam.position.x-entityPos.x,dz=cam.position.z-entityPos.z;
const d=Math.sqrt(dx*dx+dz*dz);if(d<0.01)return;
const nx=entityPos.x+dx/d*s,nz=entityPos.z+dz/d*s;
if(mazeOk(nx,entityPos.z))entityPos.x=nx;
else if(mazeOk(entityPos.x,nz))entityPos.z=nz;
entityMesh.position.set(entityPos.x,0,entityPos.z);
entityMesh.lookAt(cam.position.x,0,cam.position.z);
}

function checkExit(){
if(!mazeActive)return;
const ex=(MS-1)*CL+CL/2,ez=(MS-1)*CL+CL/2;
const dx=cam.position.x-ex,dz=cam.position.z-ez;
if(Math.sqrt(dx*dx+dz*dz)<1.2)triggerFreedom();
}

function triggerFreedom(){
mazeActive=false;
if(window.soosAudio)soosAudio.stop();
const fb=document.createElement('div');
fb.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;z-index:999';
box.appendChild(fb);
setTimeout(()=>{
if(window.soosAudio&&soosAudio.playFreedom)soosAudio.playFreedom();
fb.innerHTML='';
fb.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;z-index:999;display:flex;align-items:center;justify-content:center';
const lines=[
{t:'the pc exploded.',d:2500,s:18,c:'#333'},
{t:'glass everywhere. smoke.',d:2500,s:14,c:'#555'},
{t:'his mom found him on the floor.',d:3000,s:14,c:'#555'},
{t:'he couldnt remember anything.',d:2500,s:14,c:'#555'},
{t:'not the pc. not the demos. not dustbowl.',d:3000,s:13,c:'#666'},
{t:'not 201.',d:2000,s:13,c:'#666'},
{t:'he spent 3 weeks in the hospital.',d:2500,s:14,c:'#555'},
{t:'burns on his hands and face.',d:2500,s:14,c:'#555'},
{t:'but he survived.',d:3000,s:16,c:'#333'},
{t:'and for the first time in 14 months',d:3000,s:14,c:'#555'},
{t:'he went outside.',d:3000,s:16,c:'#333'},
{t:'',d:3000},
{t:'ENDING 4: freedom',d:0,s:20,c:'#cf6a32'},
];
const tb=document.createElement('div');
tb.style.cssText='text-align:center;padding:40px;max-width:500px';
fb.appendChild(tb);
let delay=2000;
lines.forEach(l=>{
setTimeout(()=>{
const d=document.createElement('div');
d.style.cssText='opacity:0;transition:opacity 1.5s;margin:6px 0;font-family:VT323,monospace;font-size:'+(l.s||14)+'px;color:'+(l.c||'#555');
d.textContent=l.t;tb.appendChild(d);
setTimeout(()=>{d.style.opacity='1'},50);
},delay);delay+=l.d+1500;
});
},3000);
}
}// end initHome
