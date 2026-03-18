// home.js — PS1-style 3D first-person exploration of Duck's house
let _homeLoaded=false;
const openHomeGame=()=>{
const h='<div id="home-container" style="width:100%;height:100%;background:#000;position:relative;cursor:crosshair;overflow:hidden"><canvas id="home-canvas" style="width:100%;height:100%;display:block;image-rendering:pixelated"></canvas><div id="home-crosshair" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#555;font-size:18px;pointer-events:none">+</div><div id="home-interact" style="position:absolute;bottom:55px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#888;pointer-events:none;opacity:0;transition:opacity 0.3s;text-align:center;text-shadow:0 0 6px #000"></div><div id="home-msg" style="position:absolute;bottom:15px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:14px;color:#666;pointer-events:none;text-align:center;max-width:90%;text-shadow:0 0 6px #000">WASD move. Mouse look. E interact. F flashlight. Click to start.</div><div id="home-room-name" style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-counter" style="position:absolute;top:10px;right:15px;font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-flash-hint" style="position:absolute;top:30px;right:15px;font-family:VT323,monospace;font-size:11px;color:#444;pointer-events:none">[F] Flashlight</div></div>';
createWindow('home','home.exe',640,480,h);
setTimeout(()=>{
  if(typeof THREE!=='undefined'){_homeLoaded=true;initHome3D()}
  else{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=()=>{_homeLoaded=true;initHome3D()};document.head.appendChild(s)}
},200);
};

function initHome3D(){
const container=document.getElementById('home-container');
const canvas=document.getElementById('home-canvas');
if(!container||!canvas||typeof THREE==='undefined')return;

const PS1_W=320,PS1_H=240;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x020202);
scene.fog=new THREE.Fog(0x020202,1,14);

const camera=new THREE.PerspectiveCamera(75,PS1_W/PS1_H,0.1,18);
camera.position.set(0,1.5,0);

const renderer=new THREE.WebGLRenderer({canvas,antialias:false});
renderer.setSize(PS1_W,PS1_H);renderer.setPixelRatio(1);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.BasicShadowMap;

// Materials
function M(c,e){const m=new THREE.MeshPhongMaterial({color:c,flatShading:true,shininess:0});if(e)m.emissive=new THREE.Color(e);return m}
function B(x,y,z,m){return new THREE.Mesh(new THREE.BoxGeometry(x,y,z),m)}
function C(r,h,s,m){return new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,s||6),m)}

const matF=M(0x1a1816),matW=M(0x181818),matC=M(0x0c0c0c),matE=M(0x080808,0x040404);

// ===== FURNITURE BUILDERS =====
// All face TOWARD -Z by default (toward camera when placed against back wall)

function mkPC(x,y,z){
  const g=new THREE.Group();
  // Desk first
  const dTop=B(1.2,0.05,0.7,M(0x1a1a0a));dTop.position.set(0,0.72,0);g.add(dTop);
  const dL=B(0.05,0.72,0.6,M(0x151505));dL.position.set(-0.55,0.36,0);g.add(dL);
  const dR=B(0.05,0.72,0.6,M(0x151505));dR.position.set(0.55,0.36,0);g.add(dR);
  // Tower on desk left
  const tower=B(0.25,0.55,0.45,M(0x1a1a2a));tower.position.set(-0.35,1.02,0);g.add(tower);
  // CD drive slot
  const cd=B(0.15,0.02,0.01,M(0x111111));cd.position.set(-0.35,1.15,-0.23);g.add(cd);
  // Monitor center
  const monStand=B(0.08,0.15,0.08,M(0x151515));monStand.position.set(0.15,0.82,0);g.add(monStand);
  const monBody=B(0.5,0.4,0.35,M(0x151515));monBody.position.set(0.15,1.12,0);g.add(monBody);
  // Screen faces -Z (toward player)
  const screen=B(0.42,0.32,0.01,M(0x0a0a1a,0x060612));screen.position.set(0.15,1.12,-0.18);g.add(screen);
  // Keyboard
  const kb=B(0.35,0.02,0.12,M(0x111111));kb.position.set(0.15,0.74,-0.4);g.add(kb);
  // Mouse
  const mouse=B(0.06,0.02,0.08,M(0x141414));mouse.position.set(0.45,0.74,-0.38);g.add(mouse);
  g.position.set(x,y,z);return g;
}

function mkFridge(x,y,z){
  const g=new THREE.Group();
  const body=B(0.7,1.8,0.6,M(0x2c2c2c));body.position.set(0,0.9,0);g.add(body);
  // Handle on front face (-Z)
  const handle=B(0.03,0.4,0.03,M(0x555555));handle.position.set(0.28,1.1,-0.32);g.add(handle);
  // Freezer line
  const line=B(0.6,0.02,0.01,M(0x111111));line.position.set(0,1.35,-0.31);g.add(line);
  g.position.set(x,y,z);return g;
}

function mkStove(x,y,z){
  const g=new THREE.Group();
  const body=B(0.7,0.9,0.55,M(0x222220));body.position.set(0,0.45,0);g.add(body);
  // Burners on top
  for(let bx=-0.15;bx<=0.15;bx+=0.3)for(let bz=-0.1;bz<=0.1;bz+=0.2){
    const b=C(0.07,0.02,6,M(0x1a1a1a));b.position.set(bx,0.91,bz);g.add(b);
  }
  // Oven door on front
  const door=B(0.55,0.4,0.02,M(0x1a1a1a));door.position.set(0,0.35,-0.28);g.add(door);
  const knob=C(0.02,0.02,5,M(0x444444));knob.rotation.x=Math.PI/2;knob.position.set(0,0.35,-0.29);g.add(knob);
  g.position.set(x,y,z);return g;
}

function mkTable(x,y,z){
  const g=new THREE.Group();
  const top=B(1.3,0.05,0.9,M(0x2a1a0a));top.position.set(0,0.72,0);g.add(top);
  for(let lx=-0.55;lx<=0.55;lx+=1.1)for(let lz=-0.35;lz<=0.35;lz+=0.7){
    const leg=B(0.05,0.72,0.05,M(0x1a0a00));leg.position.set(lx,0.36,lz);g.add(leg);
  }
  // Plate
  const plate=C(0.12,0.02,6,M(0x2a2a2a));plate.position.set(-0.2,0.76,0);g.add(plate);
  g.position.set(x,y,z);return g;
}

function mkCouch(x,y,z){
  const g=new THREE.Group();
  const seat=B(2,0.25,0.8,M(0x1a1a28));seat.position.set(0,0.25,0);g.add(seat);
  // Back faces +Z (against wall)
  const back=B(2,0.55,0.15,M(0x181825));back.position.set(0,0.55,0.35);g.add(back);
  const armL=B(0.15,0.4,0.8,M(0x1a1a25));armL.position.set(-0.95,0.32,0);g.add(armL);
  const armR=B(0.15,0.4,0.8,M(0x1a1a25));armR.position.set(0.95,0.32,0);g.add(armR);
  // Cushions
  for(let cx=-0.45;cx<=0.45;cx+=0.45){
    const cush=B(0.4,0.08,0.35,M(0x1e1e30));cush.position.set(cx,0.42,-0.1);g.add(cush);
  }
  g.position.set(x,y,z);return g;
}

function mkTV(x,y,z){
  const g=new THREE.Group();
  // TV stand/cabinet
  const stand=B(1,0.4,0.4,M(0x151510));stand.position.set(0,0.2,0);g.add(stand);
  // CRT body
  const body=B(0.9,0.7,0.6,M(0x111115));body.position.set(0,0.75,0);g.add(body);
  // Screen faces -Z
  const scr=B(0.7,0.5,0.02,M(0x050508));scr.position.set(0,0.78,-0.31);g.add(scr);
  g.position.set(x,y,z);return g;
}

function mkBed(x,y,z){
  const g=new THREE.Group();
  const frame=B(1.5,0.2,2,M(0x1a1410));frame.position.set(0,0.15,0);g.add(frame);
  const mattress=B(1.4,0.12,1.9,M(0x1a1a22));mattress.position.set(0,0.32,0);g.add(mattress);
  // Pillow at +Z end (headboard end)
  const pill=B(0.45,0.08,0.25,M(0x222222));pill.position.set(0,0.42,0.75);g.add(pill);
  // Headboard
  const hb=B(1.5,0.7,0.08,M(0x1a1208));hb.position.set(0,0.55,0.97);g.add(hb);
  // Blanket
  const blank=B(1.3,0.04,1.2,M(0x151530));blank.position.set(0,0.38,-0.2);g.add(blank);
  g.position.set(x,y,z);return g;
}

function mkBookshelf(x,y,z){
  const g=new THREE.Group();
  const frame=B(1,2,0.35,M(0x2a2a1a));frame.position.set(0,1,0);g.add(frame);
  const colors=[0x2a1a1a,0x1a2a1a,0x1a1a2a,0x2a2a1a,0x2a1a2a,0x331a1a];
  for(let sh=0;sh<4;sh++){
    for(let bk=0;bk<4;bk++){
      const b=B(0.06+Math.random()*0.04,0.18,0.2,M(colors[Math.floor(Math.random()*6)]));
      b.position.set(-0.3+bk*0.18,0.25+sh*0.48,0);g.add(b);
    }
  }
  g.position.set(x,y,z);return g;
}

function mkDoor(x,y,z,ry){
  const g=new THREE.Group();
  const d=B(0.85,1.9,0.08,M(0x2a1800));d.position.set(0,0.95,0);g.add(d);
  // Panel details
  const p1=B(0.3,0.6,0.01,M(0x221500));p1.position.set(0,1.3,-0.045);g.add(p1);
  const p2=B(0.3,0.6,0.01,M(0x221500));p2.position.set(0,0.6,-0.045);g.add(p2);
  const handle=C(0.025,0.06,5,M(0x666666));handle.rotation.z=Math.PI/2;handle.position.set(0.3,0.95,-0.05);g.add(handle);
  g.position.set(x,y,z);if(ry)g.rotation.y=ry;return g;
}

function mkMailbox(x,y,z){
  const g=new THREE.Group();
  const post=B(0.06,1,0.06,M(0x333333));post.position.set(0,0.5,0);g.add(post);
  const mb=B(0.25,0.2,0.35,M(0x2a2a2a));mb.position.set(0,1.1,0);g.add(mb);
  // Rounded top
  const top=C(0.13,0.04,6,M(0x2a2a2a));top.position.set(0,1.22,0);g.add(top);
  const flag=B(0.02,0.15,0.02,M(0xaa1111));flag.position.set(0.15,1.2,0);g.add(flag);
  g.position.set(x,y,z);return g;
}

// Bathroom objects
function mkToilet(x,y,z){
  const g=new THREE.Group();
  const base=C(0.2,0.35,6,M(0x2a2a2a));base.position.set(0,0.18,0);g.add(base);
  const seat=C(0.2,0.04,6,M(0x222222));seat.position.set(0,0.37,0);g.add(seat);
  const tank=B(0.3,0.35,0.15,M(0x2a2a2a));tank.position.set(0,0.52,0.18);g.add(tank);
  g.position.set(x,y,z);return g;
}

function mkSink(x,y,z){
  const g=new THREE.Group();
  const basin=B(0.5,0.08,0.35,M(0x2a2a2a));basin.position.set(0,0.8,0);g.add(basin);
  const pedestal=B(0.12,0.8,0.12,M(0x252525));pedestal.position.set(0,0.4,0);g.add(pedestal);
  // Faucet
  const faucet=B(0.03,0.15,0.03,M(0x555555));faucet.position.set(0,0.92,0.1);g.add(faucet);
  const spout=B(0.03,0.03,0.1,M(0x555555));spout.position.set(0,0.98,0.05);g.add(spout);
  g.position.set(x,y,z);return g;
}

function mkMirror(x,y,z){
  const g=new THREE.Group();
  const frame=B(0.5,0.7,0.04,M(0x1a1a1a));frame.position.set(0,1.4,0);g.add(frame);
  const glass=B(0.42,0.62,0.01,M(0x0a0a12,0x040408));glass.position.set(0,1.4,-0.025);g.add(glass);
  g.position.set(x,y,z);return g;
}

function mkBathtub(x,y,z){
  const g=new THREE.Group();
  const outer=B(1.5,0.5,0.7,M(0x252525));outer.position.set(0,0.25,0);g.add(outer);
  // Inner hollow
  const inner=B(1.3,0.45,0.55,M(0x1a1a1a));inner.position.set(0,0.3,0);g.add(inner);
  g.position.set(x,y,z);return g;
}

// ===== ROOMS =====
// Hallway is now 12x3x4 — big central corridor
const rooms={
hallway:{size:[12,3,4],light:{c:0x554433,i:0.5},
  build(g){
    // Front door at -X end, faces +X (player sees front)
    const door=mkDoor(-5.5,0,0,Math.PI/2);g.add(door);
    // Hallway light
    const lamp=B(0.3,0.06,0.3,M(0x443322,0x221100));lamp.position.set(0,2.7,0);g.add(lamp);
    const lamp2=B(0.3,0.06,0.3,M(0x443322,0x181000));lamp2.position.set(-3,2.7,0);g.add(lamp2);
    // Coat rack
    const rack=B(0.08,1.6,0.08,M(0x2a1a0a));rack.position.set(-4,0.8,1.5);g.add(rack);
    const hook=B(0.12,0.02,0.02,M(0x444444));hook.position.set(-4,1.5,1.42);g.add(hook);
    return[
      {mesh:door,n:'Front Door',m:'its locked. it was always locked.'},
      {mesh:lamp,n:'Hallway Light',m:'the light flickers sometimes. it didnt use 2'},
      {mesh:rack,n:'Coat Rack',m:'ducks jacket is still hanging here. he stopped going outside months ago.'},
    ];
  },
  exits:[
    {p:[-2,0.9,-1.95],s:[1,1.8,0.15],to:'kitchen',sp:[0,1.5,2]},
    {p:[2,0.9,-1.95],s:[1,1.8,0.15],to:'livingroom',sp:[0,1.5,2]},
    {p:[0,0.9,1.95],s:[1,1.8,0.15],to:'bedroom',sp:[0,1.5,-2.5]},
    {p:[4,0.9,1.95],s:[1,1.8,0.15],to:'bathroom',sp:[0,1.5,-1]},
    {p:[5.8,0.9,0],s:[0.15,1.8,1],to:'outside',sp:[0,1.5,-4]},
  ]},
kitchen:{size:[6,3,5],light:{c:0x444430,i:0.4},
  build(g){
    // Fridge against back wall (+Z), facing player (-Z)
    const fridge=mkFridge(-2,0,-2);g.add(fridge);
    // Stove against back wall, facing player
    const stove=mkStove(1.5,0,-2);g.add(stove);
    // Table in center
    const table=mkTable(0,0,0.3);g.add(table);
    return[
      {mesh:fridge,n:'Fridge',m:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
      {mesh:stove,n:'Stove',m:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
      {mesh:table,n:'Table',m:'we ate here as a family. before everything changed.'},
    ];
  },
  exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[-2,1.5,-1]}]},
livingroom:{size:[8,3,6],light:{c:0x333340,i:0.35},
  build(g){
    // TV against back wall, screen faces player (-Z)
    const tv=mkTV(0,0,-2.5);g.add(tv);
    // Couch facing TV, back toward +Z
    const couch=mkCouch(0,0,0.5);g.add(couch);
    // Bookshelf on left wall
    const shelf=mkBookshelf(-3.5,0,0);g.add(shelf);
    return[
      {mesh:tv,n:'TV',m:'its off. it hasnt been on in a long time.'},
      {mesh:couch,n:'Couch',m:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
      {mesh:shelf,n:'Bookshelf',m:'moms books. she liked mystery novels. guess i became one.'},
    ];
  },
  exits:[{p:[0,0.9,2.95],s:[1,1.8,0.15],to:'hallway',sp:[2,1.5,-1]}]},
bedroom:{size:[7,3,6],light:{c:0x2a3050,i:0.28},
  build(g){
    // PC desk against left wall, screen faces right (+X toward room center)
    const pc=mkPC(-2.5,0,-1.5);pc.rotation.y=Math.PI/2;g.add(pc);
    // Bed against right wall
    const bed=mkBed(2,0,0.5);g.add(bed);
    // Posters on left wall
    const poster1=B(0.6,0.4,0.02,M(0x2a1a1a));poster1.position.set(-3.2,1.5,0.5);poster1.rotation.y=Math.PI/2;g.add(poster1);
    const poster2=B(0.4,0.5,0.02,M(0x1a2a1a));poster2.position.set(-3.2,1.5,-0.5);poster2.rotation.y=Math.PI/2;g.add(poster2);
    // Backpack on floor
    const bp=B(0.35,0.35,0.3,M(0x2a1a1a));bp.position.set(0,0.18,-2.3);g.add(bp);
    // Strap
    const strap=B(0.04,0.25,0.02,M(0x1a1010));strap.position.set(0.1,0.35,-2.15);g.add(strap);
    return[
      {mesh:pc,n:'My PC',m:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
      {mesh:bed,n:'Bed',m:'i stopped sleeping. the dreams were always dustbowl.'},
      {mesh:poster1,n:'Posters',m:'tf2 posters. i put them up when i first got the game. they used to make me happy.'},
      {mesh:bp,n:'Backpack',m:'i havent been to school in weeks. they stopped calling.'},
    ];
  },
  exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[0,1.5,1]}]},
bathroom:{size:[4,3,4],light:{c:0x334444,i:0.3},
  build(g){
    const toilet=mkToilet(-1.2,0,-1.2);g.add(toilet);
    const sink=mkSink(1,0,-1.5);g.add(sink);
    const mirror=mkMirror(1,0,-1.95);g.add(mirror);
    const tub=mkBathtub(0,0,1);g.add(tub);
    // Towel on wall
    const towel=B(0.4,0.6,0.02,M(0x1a2a2a));towel.position.set(1.8,1.3,0);towel.rotation.y=-Math.PI/2;g.add(towel);
    return[
      {mesh:toilet,n:'Toilet',m:'someone left the seat up. probably duck.'},
      {mesh:sink,n:'Sink',m:'the faucet drips. has for months. nobody fixed it.'},
      {mesh:mirror,n:'Mirror',m:'i look at the mirror. nothing looks back.'},
      {mesh:tub,n:'Bathtub',m:'cold water. duck stopped taking warm showers at some point. didnt care anymore.'},
      {mesh:towel,n:'Towel',m:'still damp. like someone just used it. but no one has been here in a long time.'},
    ];
  },
  exits:[{p:[0,0.9,-1.95],s:[1,1.8,0.15],to:'hallway',sp:[4,1.5,1]}]},
outside:{size:[14,6,12],light:{c:0x1a1a22,i:0.18},
  build(g){
    // Dead grass
    const yard=B(6,0.03,6,M(0x0a1a0a));yard.position.set(-2,0.015,0);g.add(yard);
    // Path
    const path=B(1,0.02,4,M(0x1a1a1a));path.position.set(0,0.01,-4);g.add(path);
    const mb=mkMailbox(4,0,3);g.add(mb);
    // Tree
    const trunk=C(0.15,2,5,M(0x1a1008));trunk.position.set(-4,1,-2);g.add(trunk);
    const leaves=B(1.5,1,1.5,M(0x0a1a08));leaves.position.set(-4,2.5,-2);g.add(leaves);
    // Mystery
    const mystery=B(0.8,0.8,0.8,M(0x333333,0x0a0000));mystery.position.set(0,0.4,4);g.add(mystery);
    return[
      {mesh:yard,n:'Yard',m:'the grass is dead. everything is dead.'},
      {mesh:mb,n:'Mailbox',m:'full of mail nobody opened.'},
      {mesh:trunk,n:'Dead Tree',m:'this tree used to have a tire swing. dad took it down.'},
      {mesh:mystery,n:'???',m:''},
    ];
  },
  exits:[{p:[-6.8,0.9,0],s:[0.15,1.8,1.2],to:'hallway',sp:[5,1.5,0]}]}
};

// State
let curRoom='hallway',locked=false,yaw=0,pitch=0,flashOn=false;
const keys={},interacted={};
let totalObjs=0,totalDone=0;
// Count objects
Object.values(rooms).forEach(r=>{const g=new THREE.Group();totalObjs+=r.build(g).length});
let lookingAt=null,msgTimer=null;

let roomGrp=new THREE.Group();scene.add(roomGrp);
let roomLight=null,roomAmb=null,objData=[],exitMeshes=[];

// Flashlight — STRONG spotlight
const flashlight=new THREE.SpotLight(0xffeedd,0,16,0.55,0.5,1);
flashlight.castShadow=true;
scene.add(flashlight);scene.add(flashlight.target);

function buildRoom(name){
  while(roomGrp.children.length)roomGrp.remove(roomGrp.children[0]);
  if(roomLight)scene.remove(roomLight);
  if(roomAmb)scene.remove(roomAmb);
  objData=[];exitMeshes=[];
  const r=rooms[name];
  const sx=r.size[0],sy=r.size[1],sz=r.size[2];
  // Floor
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),matF);fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;roomGrp.add(fl);
  // Ceiling + walls
  if(name!=='outside'){
    const cl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),matC);cl.rotation.x=Math.PI/2;cl.position.y=sy;roomGrp.add(cl);
    [[0,sy/2,-sz/2,0],[0,sy/2,sz/2,Math.PI],[-sx/2,sy/2,0,Math.PI/2],[sx/2,sy/2,0,-Math.PI/2]].forEach(([x,y,z,ry])=>{
      const w=new THREE.Mesh(new THREE.PlaneGeometry(ry===Math.PI/2||ry===-Math.PI/2?sz:sx,sy),matW);
      w.position.set(x,y,z);w.rotation.y=ry;w.receiveShadow=true;roomGrp.add(w);
    });
  }
  // Room light
  roomLight=new THREE.PointLight(r.light.c,r.light.i,12);
  roomLight.position.set(0,sy-0.3,0);roomLight.castShadow=true;scene.add(roomLight);
  roomAmb=new THREE.AmbientLight(0x0a0a0a,0.15);scene.add(roomAmb);
  // Build furniture
  const built=r.build(roomGrp);
  built.forEach(b=>{
    b.mesh.userData={name:b.n,msg:b.m,room:name};
    b.mesh.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true}});
    objData.push(b.mesh);
  });
  // Exits
  r.exits.forEach(ex=>{
    const m=new THREE.Mesh(new THREE.BoxGeometry(ex.s[0],ex.s[1],ex.s[2]),matE);
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
  if(k==='f'&&document.getElementById('home-canvas')){
    flashOn=!flashOn;flashlight.intensity=flashOn?3:0;
    const h=document.getElementById('home-flash-hint');if(h)h.textContent=flashOn?'[F] Flashlight ON':'[F] Flashlight OFF';
  }
});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function showMsg(t){const el=document.getElementById('home-msg');if(!el)return;el.style.color='#999';el.textContent=t;el.style.opacity='1';clearTimeout(msgTimer);msgTimer=setTimeout(()=>{el.style.opacity='0.3'},5000)}

function interact(){
  if(!lookingAt)return;const ud=lookingAt.userData;
  if(ud.exit){curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);return}
  if(!ud.name)return;
  const key=ud.room+'-'+ud.name;
  if(!interacted[key]){interacted[key]=true;totalDone++;document.getElementById('home-counter').textContent=totalDone+'/'+totalObjs}
  if(curRoom==='outside'&&ud.name==='???'){
    if(totalDone>=totalObjs)showMsg('Im still here at home');
    else showMsg('i cant go yet. theres more i need to remember. ('+totalDone+'/'+totalObjs+')');
    return;
  }
  showMsg(ud.msg||'...');
}

const ray=new THREE.Raycaster();const ctr=new THREE.Vector2(0,0);

function loop(){
  if(!document.getElementById('home-canvas'))return;
  requestAnimationFrame(loop);
  const spd=0.06,dir=new THREE.Vector3();
  if(keys['w'])dir.z-=1;if(keys['s'])dir.z+=1;if(keys['a'])dir.x-=1;if(keys['d'])dir.x+=1;
  if(dir.lengthSq()>0){
    dir.normalize().multiplyScalar(spd);dir.applyAxisAngle(new THREE.Vector3(0,1,0),yaw);
    const r=rooms[curRoom],hx=r.size[0]/2-0.4,hz=r.size[2]/2-0.4;
    const nx=camera.position.x+dir.x,nz=camera.position.z+dir.z;
    if(nx>-hx&&nx<hx)camera.position.x=nx;
    if(nz>-hz&&nz<hz)camera.position.z=nz;
  }
  camera.rotation.set(0,0,0);camera.rotateY(yaw);camera.rotateX(pitch);
  // Flashlight
  flashlight.position.copy(camera.position);
  const fd=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
  flashlight.target.position.copy(camera.position).add(fd.multiplyScalar(6));
  // Interact
  if(keys['e']){interact();keys['e']=false}
  // Raycast
  const allM=[];
  objData.forEach(o=>{if(o.isMesh)allM.push(o);else o.traverse(c=>{if(c.isMesh)allM.push(c)})});
  exitMeshes.forEach(m=>allM.push(m));
  ray.setFromCamera(ctr,camera);
  const hits=ray.intersectObjects(allM,false);
  const iEl=document.getElementById('home-interact'),ch=document.getElementById('home-crosshair');
  lookingAt=null;
  if(hits.length&&hits[0].distance<4){
    let obj=hits[0].object;
    while(obj&&!obj.userData.name&&!obj.userData.exit&&obj.parent&&obj.parent!==roomGrp)obj=obj.parent;
    if(obj.userData.name||obj.userData.exit){
      lookingAt=obj;const ud=obj.userData;
      if(iEl){iEl.textContent=ud.exit?'[E] '+ud.to:'[E] '+ud.name;iEl.style.opacity='1'}
      if(ch)ch.style.color='#cf6a32';
    }
  }
  if(!lookingAt){if(iEl)iEl.style.opacity='0';if(ch)ch.style.color='#555'}
  // Auto-enter
  for(let i=0;i<exitMeshes.length;i++){
    if(camera.position.distanceTo(exitMeshes[i].position)<0.9){
      const ud=exitMeshes[i].userData;curRoom=ud.to;
      camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);break;
    }
  }
  renderer.render(scene,camera);
}
loop();

const ro=new ResizeObserver(()=>{
  const w=container.clientWidth,h=container.clientHeight;
  if(w>0&&h>0){const sc=Math.max(1,Math.floor(Math.min(w/PS1_W,h/PS1_H)));renderer.setSize(PS1_W*sc,PS1_H*sc);canvas.style.width=w+'px';canvas.style.height=h+'px'}
});
ro.observe(container);
}
