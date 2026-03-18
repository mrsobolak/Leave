// home.js — PS1-style 3D first-person exploration of Duck's house
// Three.js r128, vertex jitter, low-res, flashlight
let _homeLoaded=false;

const openHomeGame=()=>{
const h='<div id="home-container" style="width:100%;height:100%;background:#000;position:relative;cursor:crosshair;overflow:hidden"><canvas id="home-canvas" style="width:100%;height:100%;display:block;image-rendering:pixelated"></canvas><div id="home-crosshair" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#555;font-size:18px;pointer-events:none">+</div><div id="home-interact" style="position:absolute;bottom:55px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#888;pointer-events:none;opacity:0;transition:opacity 0.3s;text-align:center;text-shadow:0 0 6px #000"></div><div id="home-msg" style="position:absolute;bottom:15px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:14px;color:#666;pointer-events:none;text-align:center;max-width:90%;text-shadow:0 0 6px #000">WASD move. Mouse look. E interact. F flashlight. Click to start.</div><div id="home-room-name" style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-counter" style="position:absolute;top:10px;right:15px;font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-flash-hint" style="position:absolute;top:30px;right:15px;font-family:VT323,monospace;font-size:11px;color:#444;pointer-events:none">[F] Flashlight</div></div>';
createWindow('home','home.exe',640,480,h);
setTimeout(()=>{
  if(typeof THREE!=='undefined'){_homeLoaded=true;initHome3D()}
  else if(!_homeLoaded){
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload=()=>{_homeLoaded=true;initHome3D()};
    s.onerror=()=>{const m=document.getElementById('home-msg');if(m)m.textContent='Failed to load 3D engine.'};
    document.head.appendChild(s);
  }else{initHome3D()}
},200);
};

function initHome3D(){
const container=document.getElementById('home-container');
const canvas=document.getElementById('home-canvas');
if(!container||!canvas||typeof THREE==='undefined')return;

// PS1 resolution — render low, scale up
const PS1_W=320,PS1_H=240;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x020202);
scene.fog=new THREE.Fog(0x020202,0.5,10);

const camera=new THREE.PerspectiveCamera(75,PS1_W/PS1_H,0.1,15);
camera.position.set(0,1.5,0);

const renderer=new THREE.WebGLRenderer({canvas,antialias:false});
renderer.setSize(PS1_W,PS1_H);
renderer.setPixelRatio(1);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.BasicShadowMap;

// === PS1 HELPERS ===
function makeMat(color,emissive){
  const m=new THREE.MeshPhongMaterial({color,flatShading:true,shininess:0});
  if(emissive)m.emissive=new THREE.Color(emissive);
  return m;
}
function box(sx,sy,sz,mat){return new THREE.Mesh(new THREE.BoxGeometry(sx,sy,sz),mat)}
// Low-poly cylinder
function cyl(rt,rb,h,seg,mat){return new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg||5),mat)}

// === PS1 FURNITURE BUILDERS ===
function buildPC(x,y,z){
  const g=new THREE.Group();
  // Tower
  const tower=box(0.35,0.7,0.6,makeMat(0x1a1a2a));tower.position.set(-0.4,0.35,0);g.add(tower);
  // Monitor
  const monBase=box(0.5,0.04,0.35,makeMat(0x181818));monBase.position.set(0.2,0.52,0);g.add(monBase);
  const monBody=box(0.55,0.45,0.3,makeMat(0x151515));monBody.position.set(0.2,0.77,0);g.add(monBody);
  // Screen glow
  const screen=box(0.45,0.35,0.02,makeMat(0x0a0a1a,0x050510));screen.position.set(0.2,0.77,-0.16);g.add(screen);
  // Keyboard
  const kb=box(0.4,0.03,0.15,makeMat(0x111111));kb.position.set(0.2,0.52,-0.3);g.add(kb);
  g.position.set(x,y,z);return g;
}
function buildFridge(x,y,z){
  const g=new THREE.Group();
  const body=box(0.8,1.8,0.6,makeMat(0x2a2a2a));body.position.set(0,0.9,0);g.add(body);
  // Handle
  const handle=box(0.04,0.5,0.04,makeMat(0x444444));handle.position.set(0.35,1,0.32);g.add(handle);
  // Top freezer line
  const line=box(0.7,0.02,0.02,makeMat(0x111111));line.position.set(0,1.4,0.31);g.add(line);
  g.position.set(x,y,z);return g;
}
function buildStove(x,y,z){
  const g=new THREE.Group();
  const body=box(0.8,0.9,0.6,makeMat(0x222220));body.position.set(0,0.45,0);g.add(body);
  // Burners (4 circles = low-poly cyls)
  for(let bx=-0.2;bx<=0.2;bx+=0.4)for(let bz=-0.12;bz<=0.12;bz+=0.24){
    const b=cyl(0.08,0.08,0.02,6,makeMat(0x1a1a1a));b.position.set(bx,0.91,bz);g.add(b);
  }
  g.position.set(x,y,z);return g;
}
function buildTable(x,y,z){
  const g=new THREE.Group();
  const top=box(1.2,0.06,0.8,makeMat(0x2a1a0a));top.position.set(0,0.7,0);g.add(top);
  // 4 legs
  for(let lx=-0.5;lx<=0.5;lx+=1)for(let lz=-0.3;lz<=0.3;lz+=0.6){
    const leg=box(0.06,0.7,0.06,makeMat(0x1a0a00));leg.position.set(lx,0.35,lz);g.add(leg);
  }
  g.position.set(x,y,z);return g;
}
function buildCouch(x,y,z){
  const g=new THREE.Group();
  // Seat
  const seat=box(2,0.3,0.8,makeMat(0x1a1a28));seat.position.set(0,0.25,0);g.add(seat);
  // Back
  const back=box(2,0.6,0.2,makeMat(0x181825));back.position.set(0,0.6,0.35);g.add(back);
  // Arms
  const armL=box(0.2,0.45,0.8,makeMat(0x1a1a25));armL.position.set(-1,0.35,0);g.add(armL);
  const armR=box(0.2,0.45,0.8,makeMat(0x1a1a25));armR.position.set(1,0.35,0);g.add(armR);
  g.position.set(x,y,z);return g;
}
function buildTV(x,y,z){
  const g=new THREE.Group();
  // CRT body
  const body=box(1,0.8,0.7,makeMat(0x111115));body.position.set(0,0.4,0);g.add(body);
  // Screen (dark, off)
  const scr=box(0.8,0.6,0.02,makeMat(0x050508));scr.position.set(0,0.42,-0.36);g.add(scr);
  // Stand
  const stand=box(0.6,0.08,0.5,makeMat(0x0f0f0f));stand.position.set(0,0,0);g.add(stand);
  g.position.set(x,y,z);return g;
}
function buildBed(x,y,z){
  const g=new THREE.Group();
  // Frame
  const frame=box(1.8,0.25,1.2,makeMat(0x1a1410));frame.position.set(0,0.2,0);g.add(frame);
  // Mattress
  const mat=box(1.7,0.15,1.1,makeMat(0x1a1a20));mat.position.set(0,0.4,0);g.add(mat);
  // Pillow
  const pill=box(0.5,0.1,0.3,makeMat(0x1a1a1a));pill.position.set(0,0.5,0.45);g.add(pill);
  // Headboard
  const hb=box(1.8,0.6,0.1,makeMat(0x1a1208));hb.position.set(0,0.55,0.6);g.add(hb);
  g.position.set(x,y,z);return g;
}
function buildDesk(x,y,z){
  const g=new THREE.Group();
  const top=box(1.2,0.06,0.6,makeMat(0x1a1a0a));top.position.set(0,0.7,0);g.add(top);
  // Legs
  for(let lx=-0.5;lx<=0.5;lx+=1){
    const p=box(0.06,0.7,0.5,makeMat(0x151505));p.position.set(lx,0.35,0);g.add(p);
  }
  // Papers
  const paper=box(0.3,0.01,0.4,makeMat(0x2a2a2a));paper.position.set(0.2,0.74,0);g.add(paper);
  g.position.set(x,y,z);return g;
}
function buildBookshelf(x,y,z){
  const g=new THREE.Group();
  const frame=box(0.4,2,1.2,makeMat(0x2a2a1a));frame.position.set(0,1,0);g.add(frame);
  // Books (colored blocks on shelves)
  const colors=[0x2a1a1a,0x1a2a1a,0x1a1a2a,0x2a2a1a,0x2a1a2a];
  for(let sh=0;sh<4;sh++){
    for(let bk=0;bk<3;bk++){
      const b=box(0.08+Math.random()*0.04,0.2,0.15,makeMat(colors[Math.floor(Math.random()*5)]));
      b.position.set(-0.08+bk*0.12,0.3+sh*0.5,-0.3+Math.random()*0.1);g.add(b);
    }
  }
  g.position.set(x,y,z);return g;
}
function buildDoor(x,y,z,rot){
  const g=new THREE.Group();
  const d=box(0.9,1.9,0.1,makeMat(0x2a1800));d.position.set(0,0.95,0);g.add(d);
  // Handle
  const h=cyl(0.03,0.03,0.08,5,makeMat(0x555555));h.rotation.z=Math.PI/2;h.position.set(0.3,0.9,-0.06);g.add(h);
  g.position.set(x,y,z);if(rot)g.rotation.y=rot;return g;
}
function buildMailbox(x,y,z){
  const g=new THREE.Group();
  const post=box(0.08,0.9,0.08,makeMat(0x222222));post.position.set(0,0.45,0);g.add(post);
  const mb=box(0.3,0.25,0.2,makeMat(0x2a2a2a));mb.position.set(0,1,0);g.add(mb);
  // Flag
  const fl=box(0.02,0.15,0.02,makeMat(0x881111));fl.position.set(0.17,1.1,0);g.add(fl);
  g.position.set(x,y,z);return g;
}

// === ROOM DATA ===
const rooms={
hallway:{size:[8,3,3],light:{c:0x554433,i:0.5},
  build(g){
    g.add(buildDoor(-3.7,0,0,0));
    const lamp=box(0.3,0.06,0.3,makeMat(0x443322,0x221100));lamp.position.set(0,2.6,0);g.add(lamp);
    return[
      {mesh:g.children[0],n:'Front Door',m:'its locked. it was always locked.'},
      {mesh:lamp,n:'Hallway Light',m:'the light flickers sometimes. it didnt use 2'},
    ];
  },
  exits:[
    {p:[-1,0.9,-1.45],s:[1,1.8,0.15],to:'kitchen',sp:[0,1.5,1.8]},
    {p:[2,0.9,-1.45],s:[1,1.8,0.15],to:'livingroom',sp:[0,1.5,2]},
    {p:[0,0.9,1.45],s:[1,1.8,0.15],to:'bedroom',sp:[0,1.5,-2.2]},
    {p:[3.8,0.9,0],s:[0.15,1.8,1],to:'outside',sp:[0,1.5,-3.5]},
  ]},
kitchen:{size:[6,3,5],light:{c:0x444430,i:0.4},
  build(g){
    const fridge=buildFridge(-2.2,0,2);g.add(fridge);
    const stove=buildStove(1.8,0,2);g.add(stove);
    const table=buildTable(0,0,0);g.add(table);
    const plate=cyl(0.15,0.15,0.02,6,makeMat(0x2a2a2a));plate.position.set(-0.2,0.74,-0.1);g.add(plate);
    return[
      {mesh:fridge,n:'Fridge',m:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
      {mesh:stove,n:'Stove',m:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
      {mesh:table,n:'Table',m:'we ate here as a family. before everything changed.'},
      {mesh:plate,n:'Plate',m:'moms plate. food still on it. untouched.'},
    ];
  },
  exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[-1,1.5,-0.5]}]},
livingroom:{size:[7,3,5],light:{c:0x333340,i:0.35},
  build(g){
    const couch=buildCouch(-1.5,0,1.5);g.add(couch);
    const tv=buildTV(2.5,0.3,-1.8);g.add(tv);
    const shelf=buildBookshelf(-2.8,0,1.5);g.add(shelf);
    return[
      {mesh:couch,n:'Couch',m:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
      {mesh:tv,n:'TV',m:'its off. it hasnt been on in a long time.'},
      {mesh:shelf,n:'Bookshelf',m:'moms books. she liked mystery novels. guess i became one.'},
    ];
  },
  exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[2,1.5,-0.5]}]},
bedroom:{size:[7,3,6],light:{c:0x2a3050,i:0.28},
  build(g){
    const pc=buildPC(-2.3,0.5,-2.2);g.add(pc);
    const bed=buildBed(1.2,0,1.2);g.add(bed);
    const poster=box(0.05,0.7,1.2,makeMat(0x2a1a1a));poster.position.set(-3.1,1.4,1);g.add(poster);
    const desk=buildDesk(2.5,0,-1.5);g.add(desk);
    const bp=box(0.4,0.4,0.35,makeMat(0x2a1a1a));bp.position.set(1.2,0.2,-2.3);g.add(bp);
    return[
      {mesh:pc,n:'My PC',m:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
      {mesh:bed,n:'Bed',m:'i stopped sleeping. the dreams were always dustbowl.'},
      {mesh:poster,n:'Posters',m:'tf2 posters. i put them up when i first got the game. they used to make me happy.'},
      {mesh:desk,n:'Desk',m:'homework i never finished. essays i never turned in. none of it mattered at the end.'},
      {mesh:bp,n:'Backpack',m:'i havent been to school in weeks. they stopped calling.'},
    ];
  },
  exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[0,1.5,0.5]}]},
outside:{size:[12,6,10],light:{c:0x1a1a22,i:0.18},
  build(g){
    // Dead grass patches
    const yard=box(4,0.04,4,makeMat(0x0a1a0a));yard.position.set(-2,0.02,0);g.add(yard);
    const mb=buildMailbox(3.5,0,2.5);g.add(mb);
    // Mystery object
    const mystery=box(0.8,0.8,0.8,makeMat(0x333333,0x0a0000));mystery.position.set(0,0.4,-3.5);g.add(mystery);
    return[
      {mesh:yard,n:'Yard',m:'the grass is dead. everything is dead.'},
      {mesh:mb,n:'Mailbox',m:'full of mail nobody opened.'},
      {mesh:mystery,n:'???',m:''},
    ];
  },
  exits:[{p:[-5.8,0.9,0],s:[0.15,1.8,1.2],to:'hallway',sp:[3,1.5,0]}]}
};

// State
let curRoom='hallway',locked=false,yaw=0,pitch=0;
const keys={},interacted={};
let totalObjs=0,totalDone=0;
Object.values(rooms).forEach(r=>{const g=new THREE.Group();totalObjs+=r.build(g).length});
let lookingAt=null,msgTimer=null,flashOn=false;

// Room group
let roomGrp=new THREE.Group();scene.add(roomGrp);
let roomLight=null,roomAmb=null;
let objData=[],exitMeshes=[];

// Flashlight
const flashlight=new THREE.SpotLight(0xeeddaa,0,12,0.5,0.6,1.5);
flashlight.castShadow=true;
scene.add(flashlight);scene.add(flashlight.target);

const matFloor=makeMat(0x1a1816);
const matWall=makeMat(0x181818);
const matCeil=makeMat(0x0c0c0c);
const matExit=makeMat(0x080808,0x040404);

function buildRoom(name){
  while(roomGrp.children.length)roomGrp.remove(roomGrp.children[0]);
  if(roomLight)scene.remove(roomLight);
  if(roomAmb)scene.remove(roomAmb);
  objData=[];exitMeshes=[];
  const r=rooms[name];
  const sx=r.size[0],sy=r.size[1],sz=r.size[2];
  // Floor
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),matFloor);
  fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;roomGrp.add(fl);
  // Ceiling + walls
  if(name!=='outside'){
    const cl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),matCeil);cl.rotation.x=Math.PI/2;cl.position.y=sy;roomGrp.add(cl);
    const bk=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),matWall);bk.position.set(0,sy/2,-sz/2);roomGrp.add(bk);
    const fr=new THREE.Mesh(new THREE.PlaneGeometry(sx,sy),matWall);fr.position.set(0,sy/2,sz/2);fr.rotation.y=Math.PI;roomGrp.add(fr);
    const le=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),matWall);le.position.set(-sx/2,sy/2,0);le.rotation.y=Math.PI/2;roomGrp.add(le);
    const ri=new THREE.Mesh(new THREE.PlaneGeometry(sz,sy),matWall);ri.position.set(sx/2,sy/2,0);ri.rotation.y=-Math.PI/2;roomGrp.add(ri);
  }
  // Light
  roomLight=new THREE.PointLight(r.light.c,r.light.i,10);
  roomLight.position.set(0,sy-0.3,0);roomLight.castShadow=true;scene.add(roomLight);
  roomAmb=new THREE.AmbientLight(0x080808,0.2);scene.add(roomAmb);
  // Build furniture
  const built=r.build(roomGrp);
  built.forEach(b=>{
    b.mesh.userData={name:b.n,msg:b.m,room:name};
    b.mesh.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true}});
    objData.push(b.mesh);
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
document.addEventListener('keydown',e=>{
  const k=e.key.toLowerCase();keys[k]=true;
  if(k==='f'&&document.getElementById('home-canvas')){flashOn=!flashOn;flashlight.intensity=flashOn?1.5:0;const h=document.getElementById('home-flash-hint');if(h)h.textContent=flashOn?'[F] Flashlight ON':'[F] Flashlight OFF'}
});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function showMsg(t){const el=document.getElementById('home-msg');if(!el)return;el.style.color='#999';el.textContent=t;el.style.opacity='1';clearTimeout(msgTimer);msgTimer=setTimeout(()=>{el.style.opacity='0.3'},5000)}

function interact(){
  if(!lookingAt)return;
  const ud=lookingAt.userData;
  if(ud.exit){curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);return}
  if(!ud.name)return;
  const key=ud.room+'-'+ud.name;
  if(!interacted[key]){interacted[key]=true;totalDone++;document.getElementById('home-counter').textContent=totalDone+'/'+totalObjs}
  if(curRoom==='outside'&&ud.name==='???'){
    if(totalDone>=totalObjs){showMsg('Im still here at home')}
    else showMsg('i cant go yet. theres more i need to remember. ('+totalDone+'/'+totalObjs+')');
    return;
  }
  showMsg(ud.msg||'...');
}

// Raycaster — checks all meshes in groups recursively
const ray=new THREE.Raycaster();
const ctr=new THREE.Vector2(0,0);

// PS1 vertex jitter — apply to all geometries
let jitterTime=0;

function loop(){
  if(!document.getElementById('home-canvas'))return;
  requestAnimationFrame(loop);
  jitterTime+=0.03;
  // Move
  const spd=0.055,dir=new THREE.Vector3();
  if(keys['w'])dir.z-=1;if(keys['s'])dir.z+=1;if(keys['a'])dir.x-=1;if(keys['d'])dir.x+=1;
  if(dir.lengthSq()>0){
    dir.normalize().multiplyScalar(spd);dir.applyAxisAngle(new THREE.Vector3(0,1,0),yaw);
    const r=rooms[curRoom],hx=r.size[0]/2-0.4,hz=r.size[2]/2-0.4;
    const nx=camera.position.x+dir.x,nz=camera.position.z+dir.z;
    if(nx>-hx&&nx<hx)camera.position.x=nx;
    if(nz>-hz&&nz<hz)camera.position.z=nz;
  }
  camera.rotation.set(0,0,0);camera.rotateY(yaw);camera.rotateX(pitch);
  // Flashlight follows camera
  flashlight.position.copy(camera.position);
  const fd=new THREE.Vector3(0,0,-1);fd.applyQuaternion(camera.quaternion);
  flashlight.target.position.copy(camera.position).add(fd.multiplyScalar(5));
  // Interact
  if(keys['e']){interact();keys['e']=false}
  // Raycast — get all meshes from objData groups
  const allMeshes=[];
  objData.forEach(o=>{if(o.isMesh)allMeshes.push(o);else o.traverse(c=>{if(c.isMesh)allMeshes.push(c)})});
  exitMeshes.forEach(m=>allMeshes.push(m));
  ray.setFromCamera(ctr,camera);
  const hits=ray.intersectObjects(allMeshes,false);
  const iEl=document.getElementById('home-interact'),ch=document.getElementById('home-crosshair');
  lookingAt=null;
  if(hits.length&&hits[0].distance<3.5){
    // Walk up parent chain to find userData
    let obj=hits[0].object;
    while(obj&&!obj.userData.name&&!obj.userData.exit&&obj.parent)obj=obj.parent;
    if(obj.userData.name||obj.userData.exit){
      lookingAt=obj;
      const ud=obj.userData;
      if(iEl){iEl.textContent=ud.exit?'[E] '+ud.to:'[E] '+ud.name;iEl.style.opacity='1'}
      if(ch)ch.style.color='#cf6a32';
    }
  }
  if(!lookingAt){if(iEl)iEl.style.opacity='0';if(ch)ch.style.color='#555'}
  // Auto-enter exits
  for(let i=0;i<exitMeshes.length;i++){
    if(camera.position.distanceTo(exitMeshes[i].position)<0.9){
      const ud=exitMeshes[i].userData;
      curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);break;
    }
  }
  renderer.render(scene,camera);
}
loop();

const ro=new ResizeObserver(()=>{
  const w=container.clientWidth,h=container.clientHeight;
  if(w>0&&h>0){
    // Keep PS1 low res but fill window
    const scale=Math.max(1,Math.floor(Math.min(w/PS1_W,h/PS1_H)));
    renderer.setSize(PS1_W*scale,PS1_H*scale);
    canvas.style.width=w+'px';canvas.style.height=h+'px';
  }
});
ro.observe(container);
}
