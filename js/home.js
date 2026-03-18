// home.js — 3D first-person exploration of Duck's house
// Three.js r128 loaded from CDN at runtime
let _homeLoaded=false;

const openHomeGame=()=>{
const h='<div id="home-container" style="width:100%;height:100%;background:#000;position:relative;cursor:crosshair;overflow:hidden"><canvas id="home-canvas" style="width:100%;height:100%;display:block"></canvas><div id="home-crosshair" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#555;font-size:18px;pointer-events:none">+</div><div id="home-interact" style="position:absolute;bottom:55px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#888;pointer-events:none;opacity:0;transition:opacity 0.3s;text-align:center;text-shadow:0 0 4px #000"></div><div id="home-msg" style="position:absolute;bottom:15px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:14px;color:#666;pointer-events:none;text-align:center;max-width:90%;text-shadow:0 0 4px #000">WASD to move. Mouse to look. E to interact. Click to start.</div><div id="home-room-name" style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-counter" style="position:absolute;top:10px;right:15px;font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div></div>';
createWindow('home','home.exe',640,480,h);
setTimeout(()=>{
  if(typeof THREE!=='undefined'){_homeLoaded=true;initHome3D()}
  else if(!_homeLoaded){
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload=()=>{_homeLoaded=true;initHome3D()};
    s.onerror=()=>{document.getElementById('home-msg').textContent='Failed to load 3D engine. Check internet connection.'};
    document.head.appendChild(s);
  }else{initHome3D()}
},200);
};

function initHome3D(){
const container=document.getElementById('home-container');
const canvas=document.getElementById('home-canvas');
if(!container||!canvas||typeof THREE==='undefined')return;

const W=container.clientWidth,H=container.clientHeight;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x030303);
scene.fog=new THREE.Fog(0x030303,1,14);

const camera=new THREE.PerspectiveCamera(70,W/H,0.1,20);
camera.position.set(0,1.5,0);

const renderer=new THREE.WebGLRenderer({canvas,antialias:false});
renderer.setSize(W,H);
renderer.shadowMap.enabled=true;

// Materials
const matFloor=new THREE.MeshLambertMaterial({color:0x1a1816});
const matWall=new THREE.MeshLambertMaterial({color:0x181818});
const matCeil=new THREE.MeshLambertMaterial({color:0x0c0c0c});
const matExit=new THREE.MeshLambertMaterial({color:0x080808,emissive:0x050505});

// Room definitions
const rooms={
hallway:{size:[8,3,3],
  light:{c:0x554433,i:0.5},
  objs:[
    {p:[-3.5,0.9,0],s:[0.15,1.8,1.2],c:0x2a1800,n:'Front Door',m:'its locked. it was always locked.'},
    {p:[0,2.4,0],s:[0.4,0.08,0.4],c:0x443322,e:0x221100,n:'Hallway Light',m:'the light flickers sometimes. it didnt use 2'},
  ],
  exits:[
    {p:[-1,0.9,-1.45],s:[1,1.8,0.15],to:'kitchen',sp:[0,1.5,1.8]},
    {p:[2,0.9,-1.45],s:[1,1.8,0.15],to:'livingroom',sp:[0,1.5,2]},
    {p:[0,0.9,1.45],s:[1,1.8,0.15],to:'bedroom',sp:[0,1.5,-2.2]},
    {p:[3.8,0.9,0],s:[0.15,1.8,1],to:'outside',sp:[0,1.5,-3.5]},
  ]},
kitchen:{size:[6,3,5],
  light:{c:0x444430,i:0.4},
  objs:[
    {p:[-2.2,0.9,2],s:[1,1.8,0.6],c:0x2a2a2a,n:'Fridge',m:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
    {p:[1.8,0.5,2],s:[1,1,0.6],c:0x222220,n:'Stove',m:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
    {p:[0,0.42,0],s:[1.4,0.06,0.9],c:0x2a1a0a,n:'Table',m:'we ate here as a family. before everything changed.'},
    {p:[-0.3,0.38,-0.2],s:[0.25,0.02,0.25],c:0x1a1a1a,n:'Plate',m:'moms plate. food still on it. untouched.'},
  ],
  exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[-1,1.5,-0.5]}]},
livingroom:{size:[7,3,5],
  light:{c:0x333340,i:0.35},
  objs:[
    {p:[-2,0.35,1.5],s:[2.2,0.7,0.9],c:0x1a1a22,n:'Couch',m:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
    {p:[2.5,1,-2],s:[1.4,0.9,0.15],c:0x111118,n:'TV',m:'its off. it hasnt been on in a long time.'},
    {p:[-2.8,1,2],s:[0.4,2,1.5],c:0x2a2a1a,n:'Bookshelf',m:'moms books. she liked mystery novels. guess i became one.'},
  ],
  exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[2,1.5,-0.5]}]},
bedroom:{size:[7,3,6],
  light:{c:0x2a3050,i:0.28},
  objs:[
    {p:[-2.5,0.45,-2.2],s:[1,0.9,0.8],c:0x1a1a2a,e:0x050510,n:'My PC',m:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
    {p:[1.2,0.35,1.2],s:[2,0.6,1.3],c:0x181818,n:'Bed',m:'i stopped sleeping. the dreams were always dustbowl.'},
    {p:[-3,1.3,1],s:[0.08,0.8,1.5],c:0x2a1a1a,n:'Posters',m:'tf2 posters. i put them up when i first got the game. they used to make me happy.'},
    {p:[2.8,0.45,-1.5],s:[1.2,0.9,0.8],c:0x1a1a0a,n:'Desk',m:'homework i never finished. essays i never turned in. none of it mattered at the end.'},
    {p:[1.2,0.25,-2.3],s:[0.5,0.5,0.5],c:0x2a1a1a,n:'Backpack',m:'i havent been to school in weeks. they stopped calling.'},
  ],
  exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[0,1.5,0.5]}]},
outside:{size:[12,6,10],
  light:{c:0x1a1a22,i:0.18},
  objs:[
    {p:[-3,0.02,0],s:[3,0.04,3],c:0x0a1a0a,n:'Yard',m:'the grass is dead. everything is dead.'},
    {p:[3.5,0.6,2.5],s:[0.3,1.2,0.3],c:0x2a2a2a,n:'Mailbox',m:'full of mail nobody opened.'},
    {p:[0,0.6,-3.5],s:[1,1.2,1],c:0x333333,e:0x0a0000,n:'???',m:''},
  ],
  exits:[{p:[-5.8,0.9,0],s:[0.15,1.8,1.2],to:'hallway',sp:[3,1.5,0]}]}
};

// State
let curRoom='hallway',locked=false,yaw=0,pitch=0;
const keys={},interacted={};
let totalObjs=0,totalDone=0;
Object.values(rooms).forEach(r=>totalObjs+=r.objs.length);
let lookingAt=null,msgTimer=null;

// Room building
let roomGrp=new THREE.Group();scene.add(roomGrp);
let roomLight=null,roomAmb=null;
let objMeshes=[],exitMeshes=[];

function buildRoom(name){
while(roomGrp.children.length)roomGrp.remove(roomGrp.children[0]);
if(roomLight)scene.remove(roomLight);
if(roomAmb)scene.remove(roomAmb);
objMeshes=[];exitMeshes=[];
const r=rooms[name];
const sx=r.size[0],sy=r.size[1],sz=r.size[2];
// Floor
const fl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),matFloor);
fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;roomGrp.add(fl);
// Ceiling
if(name!=='outside'){const cl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),matCeil);cl.rotation.x=Math.PI/2;cl.position.y=sy;roomGrp.add(cl)}
// Walls
const wm=matWall;
if(name!=='outside'){
  const bk=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),wm);bk.position.set(0,sy/2,-sz/2);roomGrp.add(bk);
  const fr=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),wm);fr.position.set(0,sy/2,sz/2);fr.rotation.y=Math.PI;roomGrp.add(fr);
  const le=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),wm);le.position.set(-sx/2,sy/2,0);le.rotation.y=Math.PI/2;roomGrp.add(le);
  const ri=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),wm);ri.position.set(sx/2,sy/2,0);ri.rotation.y=-Math.PI/2;roomGrp.add(ri);
}
// Light
roomLight=new THREE.PointLight(r.light.c,r.light.i,12);
roomLight.position.set(0,sy-0.3,0);roomLight.castShadow=true;scene.add(roomLight);
roomAmb=new THREE.AmbientLight(0x111111,0.2);scene.add(roomAmb);
// Objects
r.objs.forEach(o=>{
  const mat=new THREE.MeshLambertMaterial({color:o.c});
  if(o.e)mat.emissive=new THREE.Color(o.e);
  const m=new THREE.Mesh(new THREE.BoxGeometry(o.s[0],o.s[1],o.s[2]),mat);
  m.position.set(o.p[0],o.p[1],o.p[2]);
  m.castShadow=true;m.receiveShadow=true;
  m.userData={name:o.n,msg:o.m,room:name,origColor:o.c};
  roomGrp.add(m);objMeshes.push(m);
});
// Exits
r.exits.forEach(ex=>{
  const m=new THREE.Mesh(new THREE.BoxGeometry(ex.s[0],ex.s[1],ex.s[2]),matExit);
  m.position.set(ex.p[0],ex.p[1],ex.p[2]);
  m.userData={exit:true,to:ex.to,spawn:ex.sp};
  roomGrp.add(m);exitMeshes.push(m);
});
document.getElementById('home-room-name').textContent=name.toUpperCase();
document.getElementById('home-counter').textContent=totalDone+'/'+totalObjs;
}
buildRoom('hallway');

// Controls
container.addEventListener('click',()=>{if(!locked)container.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===container});
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*0.002;pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*0.002))});
document.addEventListener('keydown',e=>{keys[e.key.toLowerCase()]=true});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function showMsg(t){const el=document.getElementById('home-msg');if(!el)return;el.style.color='#888';el.textContent=t;el.style.opacity='1';clearTimeout(msgTimer);msgTimer=setTimeout(()=>{el.style.opacity='0.3'},5000)}

function interact(){
if(!lookingAt)return;
const ud=lookingAt.userData;
if(ud.exit){curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);return}
if(!ud.name)return;
const key=ud.room+'-'+ud.name;
if(!interacted[key]){interacted[key]=true;totalDone++;document.getElementById('home-counter').textContent=totalDone+'/'+totalObjs}
if(curRoom==='outside'&&ud.name==='???'){
  if(totalDone>=totalObjs){showMsg('Im still here at home');lookingAt.material=new THREE.MeshLambertMaterial({color:0x550000,emissive:0x220000})}
  else showMsg('i cant go yet. theres more i need to remember. ('+totalDone+'/'+totalObjs+')');
  return;
}
showMsg(ud.msg||'...');
lookingAt.material=new THREE.MeshLambertMaterial({color:0x2a2a2a});
}

// Raycaster
const ray=new THREE.Raycaster();
const ctr=new THREE.Vector2(0,0);

function loop(){
if(!document.getElementById('home-canvas'))return;
requestAnimationFrame(loop);
// Move
const spd=0.055;const dir=new THREE.Vector3();
if(keys['w'])dir.z-=1;if(keys['s'])dir.z+=1;if(keys['a'])dir.x-=1;if(keys['d'])dir.x+=1;
if(dir.lengthSq()>0){
  dir.normalize().multiplyScalar(spd);dir.applyAxisAngle(new THREE.Vector3(0,1,0),yaw);
  const r=rooms[curRoom],hx=r.size[0]/2-0.35,hz=r.size[2]/2-0.35;
  const nx=camera.position.x+dir.x,nz=camera.position.z+dir.z;
  if(nx>-hx&&nx<hx)camera.position.x=nx;
  if(nz>-hz&&nz<hz)camera.position.z=nz;
}
// Camera
camera.rotation.set(0,0,0);camera.rotateY(yaw);camera.rotateX(pitch);
// Interact
if(keys['e']){interact();keys['e']=false}
// Raycast
ray.setFromCamera(ctr,camera);
const hits=ray.intersectObjects([...objMeshes,...exitMeshes]);
const iEl=document.getElementById('home-interact'),ch=document.getElementById('home-crosshair');
if(hits.length&&hits[0].distance<3.5){
  lookingAt=hits[0].object;const ud=lookingAt.userData;
  if(iEl){iEl.textContent=ud.exit?'[E] Go to '+ud.to:'[E] '+ud.name;iEl.style.opacity='1'}
  if(ch)ch.style.color='#cf6a32';
}else{lookingAt=null;if(iEl)iEl.style.opacity='0';if(ch)ch.style.color='#555'}
// Auto-enter exits
exitMeshes.forEach(ex=>{if(camera.position.distanceTo(ex.position)<0.8){const ud=ex.userData;curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom)}});
renderer.render(scene,camera);
}
loop();

// Resize
const ro=new ResizeObserver(()=>{const w=container.clientWidth,h=container.clientHeight;if(w&&h){camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h)}});
ro.observe(container);
}
