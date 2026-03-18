// home.js v3.4 — PS1-style 3D home, carefully placed objects
// All furniture faces TOWARD room center. Built with front at -Z, rotated as needed.
let _homeLoaded=false;
const openHomeGame=()=>{
const h='<div id="home-container" style="width:100%;height:100%;background:#000;position:relative;cursor:crosshair;overflow:hidden"><canvas id="home-canvas" style="width:100%;height:100%;display:block;image-rendering:pixelated"></canvas><div id="home-crosshair" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#555;font-size:18px;pointer-events:none">+</div><div id="home-interact" style="position:absolute;bottom:55px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:16px;color:#888;pointer-events:none;opacity:0;transition:opacity 0.3s;text-align:center;text-shadow:0 0 6px #000"></div><div id="home-msg" style="position:absolute;bottom:15px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:14px;color:#666;pointer-events:none;text-align:center;max-width:90%;text-shadow:0 0 6px #000">WASD move. Mouse look. E interact. F flashlight. Click to start.</div><div id="home-room-name" style="position:absolute;top:10px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-counter" style="position:absolute;top:10px;right:15px;font-family:VT323,monospace;font-size:13px;color:#333;pointer-events:none"></div><div id="home-flash-hint" style="position:absolute;top:30px;right:15px;font-family:VT323,monospace;font-size:11px;color:#444;pointer-events:none">[F] Flashlight</div></div>';
createWindow('home','home.exe',640,480,h);
setTimeout(()=>{
  if(typeof THREE!=='undefined'){initHome3D()}
  else{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';s.onload=()=>initHome3D();document.head.appendChild(s)}
},200);
};

function initHome3D(){
const container=document.getElementById('home-container');
const canvas=document.getElementById('home-canvas');
if(!container||!canvas||typeof THREE==='undefined')return;

const PW=320,PH=240;
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x020202);
scene.fog=new THREE.Fog(0x020202,1,14);
const camera=new THREE.PerspectiveCamera(75,PW/PH,0.1,18);
camera.position.set(0,1.5,0);
const renderer=new THREE.WebGLRenderer({canvas,antialias:false});
renderer.setSize(PW,PH);renderer.setPixelRatio(1);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.BasicShadowMap;

// Helpers
function M(c,e){const m=new THREE.MeshPhongMaterial({color:c,flatShading:true,shininess:0});if(e)m.emissive=new THREE.Color(e);return m}
function B(x,y,z,m){return new THREE.Mesh(new THREE.BoxGeometry(x,y,z),m)}
function Cy(r,h,s,m){return new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,s||6),m)}
const mF=M(0x1a1816),mW=M(0x181818),mC=M(0x0c0c0c),mE=M(0x080808,0x040404);

// ============================================================
// FURNITURE: all built centered at origin, "front" faces -Z
// To place against a wall, set position then rotate:
//   Back wall (-Z):  rotate PI so front faces +Z toward player
//   Left wall (-X):  rotate PI/2 so front faces +X
//   Right wall (+X): rotate -PI/2 so front faces -X
//   Front wall (+Z): no rotation, front faces -Z toward player
// ============================================================

function mkPC(){
  // Desk with PC on top. Front (screen, keyboard) at -Z
  const g=new THREE.Group();
  // Desk surface
  const dTop=B(1.2,0.05,0.65,M(0x1a1a0a));dTop.position.y=0.72;g.add(dTop);
  // Desk legs (two side panels)
  const dL=B(0.05,0.72,0.6,M(0x151505));dL.position.set(-0.55,0.36,0);g.add(dL);
  const dR=B(0.05,0.72,0.6,M(0x151505));dR.position.set(0.55,0.36,0);g.add(dR);
  // Tower on left of desk
  const tower=B(0.22,0.5,0.4,M(0x1a1a2a));tower.position.set(-0.35,1,0.05);g.add(tower);
  // CD slot on tower front
  const cd=B(0.14,0.02,0.01,M(0x111111));cd.position.set(-0.35,1.1,-0.21);g.add(cd);
  // Monitor stand
  const mSt=B(0.08,0.12,0.08,M(0x151515));mSt.position.set(0.1,0.8,0);g.add(mSt);
  // Monitor body
  const mon=B(0.48,0.38,0.3,M(0x151515));mon.position.set(0.1,1.08,0.02);g.add(mon);
  // Screen on FRONT of monitor (-Z side)
  const scr=B(0.4,0.3,0.01,M(0x080814,0x040408));scr.position.set(0.1,1.08,-0.16);g.add(scr);
  // Keyboard in front of monitor
  const kb=B(0.35,0.02,0.1,M(0x111111));kb.position.set(0.1,0.74,-0.28);g.add(kb);
  // Mouse right of keyboard
  const ms=B(0.05,0.02,0.07,M(0x141414));ms.position.set(0.4,0.74,-0.26);g.add(ms);
  return g;
}

function mkFridge(){
  // Tall box, handle + line on front (-Z)
  const g=new THREE.Group();
  const body=B(0.65,1.8,0.55,M(0x2c2c2c));body.position.y=0.9;g.add(body);
  const handle=B(0.03,0.4,0.03,M(0x555555));handle.position.set(0.25,1.05,-0.3);g.add(handle);
  const line=B(0.55,0.02,0.01,M(0x111111));line.position.set(0,1.35,-0.28);g.add(line);
  return g;
}

function mkStove(){
  // Box with burners on top, oven door on front (-Z)
  const g=new THREE.Group();
  const body=B(0.65,0.9,0.5,M(0x222220));body.position.y=0.45;g.add(body);
  for(let bx=-0.13;bx<=0.13;bx+=0.26)for(let bz=-0.08;bz<=0.08;bz+=0.16){
    const bur=Cy(0.06,0.02,6,M(0x1a1a1a));bur.position.set(bx,0.91,bz);g.add(bur);
  }
  const door=B(0.5,0.35,0.02,M(0x1a1a18));door.position.set(0,0.3,-0.26);g.add(door);
  const knob=Cy(0.02,0.02,5,M(0x555555));knob.rotation.x=Math.PI/2;knob.position.set(0,0.55,-0.26);g.add(knob);
  return g;
}

function mkTable(){
  const g=new THREE.Group();
  const top=B(1.3,0.05,0.85,M(0x2a1a0a));top.position.y=0.72;g.add(top);
  for(let lx of[-0.55,0.55])for(let lz of[-0.35,0.35]){
    const leg=B(0.05,0.72,0.05,M(0x1a0a00));leg.position.set(lx,0.36,lz);g.add(leg);
  }
  return g;
}

function mkChair(){
  const g=new THREE.Group();
  const seat=B(0.4,0.04,0.4,M(0x1a1a1a));seat.position.y=0.45;g.add(seat);
  for(let lx of[-0.16,0.16])for(let lz of[-0.16,0.16]){
    const leg=B(0.04,0.45,0.04,M(0x151515));leg.position.set(lx,0.225,lz);g.add(leg);
  }
  const back=B(0.36,0.4,0.04,M(0x1a1a1a));back.position.set(0,0.69,0.18);g.add(back);
  return g;
}

function mkCouch(){
  // Seat + back(+Z) + arms. Front faces -Z
  const g=new THREE.Group();
  const seat=B(1.8,0.22,0.75,M(0x1a1a28));seat.position.y=0.22;g.add(seat);
  const back=B(1.8,0.5,0.12,M(0x181825));back.position.set(0,0.5,0.35);g.add(back);
  const aL=B(0.12,0.38,0.75,M(0x1a1a25));aL.position.set(-0.88,0.3,0);g.add(aL);
  const aR=B(0.12,0.38,0.75,M(0x1a1a25));aR.position.set(0.88,0.3,0);g.add(aR);
  for(let i=-0.4;i<=0.4;i+=0.4){
    const c=B(0.38,0.06,0.3,M(0x1e1e30));c.position.set(i,0.37,-0.1);g.add(c);
  }
  return g;
}

function mkTV(){
  // CRT on stand. Screen at -Z
  const g=new THREE.Group();
  const stand=B(0.9,0.35,0.4,M(0x151510));stand.position.y=0.175;g.add(stand);
  const body=B(0.8,0.65,0.55,M(0x111115));body.position.y=0.68;g.add(body);
  const scr=B(0.6,0.45,0.02,M(0x050508));scr.position.set(0,0.7,-0.29);g.add(scr);
  return g;
}

function mkBed(){
  // Long on Z axis. Headboard at +Z, foot at -Z. Player sees side.
  const g=new THREE.Group();
  const frame=B(1.4,0.18,2,M(0x1a1410));frame.position.y=0.12;g.add(frame);
  const matt=B(1.3,0.1,1.9,M(0x1a1a22));matt.position.y=0.27;g.add(matt);
  const blanket=B(1.2,0.04,1.2,M(0x151530));blanket.position.set(0,0.33,-0.25);g.add(blanket);
  const pill=B(0.4,0.07,0.22,M(0x222222));pill.position.set(0,0.35,0.75);g.add(pill);
  const hb=B(1.4,0.65,0.07,M(0x1a1208));hb.position.set(0,0.5,0.97);g.add(hb);
  return g;
}

function mkBookshelf(){
  // Flat against wall. Front (-Z) has books visible
  const g=new THREE.Group();
  const frame=B(0.9,1.9,0.3,M(0x2a2a1a));frame.position.y=0.95;g.add(frame);
  // Shelves
  for(let sy of[0.3,0.75,1.2,1.65]){
    const shelf=B(0.85,0.03,0.28,M(0x221a0a));shelf.position.set(0,sy,0);g.add(shelf);
  }
  // Books on each shelf
  const cols=[0x2a1a1a,0x1a2a1a,0x1a1a2a,0x2a2a1a,0x2a1a2a,0x331a1a,0x1a3322];
  for(let sy of[0.35,0.8,1.25,1.7]){
    let bx=-0.3;
    while(bx<0.3){
      const w=0.04+Math.random()*0.06;
      const h=0.15+Math.random()*0.08;
      const b=B(w,h,0.18,M(cols[Math.floor(Math.random()*cols.length)]));
      b.position.set(bx,sy+h/2,0);g.add(b);
      bx+=w+0.02;
    }
  }
  return g;
}

function mkToilet(){
  const g=new THREE.Group();
  // Bowl (wider cylinder)
  const bowl=B(0.35,0.3,0.4,M(0x2a2a2a));bowl.position.y=0.15;g.add(bowl);
  // Seat
  const seat=Cy(0.17,0.04,8,M(0x222222));seat.position.y=0.32;g.add(seat);
  // Tank behind (+Z)
  const tank=B(0.32,0.3,0.12,M(0x2a2a2a));tank.position.set(0,0.45,0.2);g.add(tank);
  // Lid
  const lid=B(0.28,0.02,0.1,M(0x252525));lid.position.set(0,0.62,0.2);g.add(lid);
  return g;
}

function mkSink(){
  const g=new THREE.Group();
  // Basin at top
  const basin=B(0.45,0.07,0.3,M(0x2a2a2a));basin.position.y=0.82;g.add(basin);
  // Inner basin (darker)
  const inner=B(0.35,0.06,0.22,M(0x1a1a1a));inner.position.y=0.8;g.add(inner);
  // Pedestal
  const ped=B(0.1,0.82,0.1,M(0x252525));ped.position.y=0.41;g.add(ped);
  // Faucet
  const fBase=B(0.03,0.12,0.03,M(0x555555));fBase.position.set(0,0.92,0.08);g.add(fBase);
  const fSpout=B(0.03,0.03,0.1,M(0x555555));fSpout.position.set(0,0.97,0.03);g.add(fSpout);
  return g;
}

function mkMirror(){
  const g=new THREE.Group();
  const frame=B(0.45,0.6,0.03,M(0x1a1a1a));frame.position.y=1.4;g.add(frame);
  const glass=B(0.38,0.52,0.01,M(0x0a0a14,0x040408));glass.position.set(0,1.4,-0.02);g.add(glass);
  return g;
}

function mkBathtub(){
  const g=new THREE.Group();
  // Outer shell
  const outer=B(0.65,0.45,1.4,M(0x252525));outer.position.y=0.225;g.add(outer);
  // Inner (dark)
  const inner=B(0.5,0.4,1.2,M(0x151515));inner.position.y=0.26;g.add(inner);
  // Rim
  const rim=B(0.65,0.03,1.4,M(0x2a2a2a));rim.position.y=0.46;g.add(rim);
  return g;
}

function mkMailbox(){
  const g=new THREE.Group();
  const post=B(0.06,1,0.06,M(0x333333));post.position.y=0.5;g.add(post);
  const mb=B(0.22,0.18,0.3,M(0x2a2a2a));mb.position.y=1.08;g.add(mb);
  const flag=B(0.02,0.12,0.02,M(0xaa1111));flag.position.set(0.14,1.15,0);g.add(flag);
  return g;
}

// ============================================================
// ROOM DEFINITIONS
// Player enters from exit spawn. Objects placed relative to room center.
// Walls: ±sx/2 on X, ±sz/2 on Z
// ============================================================

const rooms={
// HALLWAY: 12 wide x 3 tall x 4 deep
// Player starts center. Long corridor.
hallway:{size:[12,3,4],light:{c:0x554433,i:0.5},
  build(g){
    // Two ceiling lamps
    const l1=B(0.3,0.06,0.3,M(0x443322,0x221100));l1.position.set(-2,2.7,0);g.add(l1);
    const l2=B(0.3,0.06,0.3,M(0x443322,0x181000));l2.position.set(2,2.7,0);g.add(l2);
    // Coat rack against left wall
    const rack=B(0.08,1.6,0.08,M(0x2a1a0a));rack.position.set(-5,0.8,1.2);g.add(rack);
    const hook1=B(0.1,0.02,0.04,M(0x444444));hook1.position.set(-5,1.5,1.14);g.add(hook1);
    const hook2=B(0.1,0.02,0.04,M(0x444444));hook2.position.set(-5,1.3,1.14);g.add(hook2);
    // Shoes by entrance
    const shoe=B(0.3,0.08,0.15,M(0x111111));shoe.position.set(-5,0.04,0.6);g.add(shoe);
    return[
      {mesh:l1,n:'Hallway Light',m:'the light flickers sometimes. it didnt use 2'},
      {mesh:rack,n:'Coat Rack',m:'ducks jacket is still hanging here. he stopped going outside months ago.'},
      {mesh:shoe,n:'Shoes',m:'old sneakers. the laces are still tied from the last time he wore them.'},
    ];
  },
  exits:[
    // Kitchen: left side of back wall (-Z)
    {p:[-3,0.9,-1.95],s:[1,1.8,0.15],to:'kitchen',sp:[0,1.5,1.8]},
    // Living room: right side of back wall (-Z)
    {p:[3,0.9,-1.95],s:[1,1.8,0.15],to:'livingroom',sp:[0,1.5,2.2]},
    // Bedroom: center of front wall (+Z)
    {p:[-1,0.9,1.95],s:[1,1.8,0.15],to:'bedroom',sp:[0,1.5,-2.2]},
    // Bathroom: right of front wall (+Z)
    {p:[3,0.9,1.95],s:[1,1.8,0.15],to:'bathroom',sp:[0,1.5,-1.2]},
    // Outside: right end of hallway (+X)
    {p:[5.9,0.9,0],s:[0.15,1.8,1],to:'outside',sp:[-4,1.5,0]},
    // Master bedroom: far left of front wall (+Z)
    {p:[-4,0.9,1.95],s:[1,1.8,0.15],to:'master',sp:[0,1.5,-2.5]},
  ]},

// KITCHEN: 6 wide x 3 tall x 5 deep
// Player enters from front wall (+Z), faces -Z into room
kitchen:{size:[6,3,5],light:{c:0x444430,i:0.4},
  build(g){
    // Fridge: against back wall (-Z side), rotated 180 so front faces player (+Z)
    const fridge=mkFridge();fridge.position.set(-2,0,-2.1);fridge.rotation.y=Math.PI;g.add(fridge);
    // Stove: against back wall, rotated 180
    const stove=mkStove();stove.position.set(1.5,0,-2);stove.rotation.y=Math.PI;g.add(stove);
    // Table: center of room, no rotation needed
    const table=mkTable();table.position.set(0,0,0.2);g.add(table);
    // Chair at table, facing table
    const chair=mkChair();chair.position.set(0.5,0,0.8);chair.rotation.y=Math.PI;g.add(chair);
    return[
      {mesh:fridge,n:'Fridge',m:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},
      {mesh:stove,n:'Stove',m:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},
      {mesh:table,n:'Table',m:'we ate here as a family. before everything changed.'},
      {mesh:chair,n:'Chair',m:'moms chair. she sat here waiting for him every night.'},
    ];
  },
  exits:[{p:[0,0.9,2.45],s:[1,1.8,0.15],to:'hallway',sp:[-3,1.5,-1]}]},

// LIVING ROOM: 8 wide x 3 tall x 6 deep
// Player enters from front wall (+Z), faces -Z
livingroom:{size:[8,3,6],light:{c:0x333340,i:0.35},
  build(g){
    // TV: against back wall (-Z), rotated 180 so screen faces player
    const tv=mkTV();tv.position.set(0,0,-2.6);tv.rotation.y=Math.PI;g.add(tv);
    // Couch: middle of room, facing -Z toward TV (no rotation, front is -Z)
    const couch=mkCouch();couch.position.set(0,0,0.8);g.add(couch);
    // Bookshelf: against left wall, rotated 90 so front faces +X (into room)
    const shelf=mkBookshelf();shelf.position.set(-3.65,0,0);shelf.rotation.y=-Math.PI/2;g.add(shelf);
    return[
      {mesh:tv,n:'TV',m:'its off. it hasnt been on in a long time.'},
      {mesh:couch,n:'Couch',m:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},
      {mesh:shelf,n:'Bookshelf',m:'moms books. she liked mystery novels. guess i became one.'},
    ];
  },
  exits:[{p:[0,0.9,2.95],s:[1,1.8,0.15],to:'hallway',sp:[3,1.5,-1]}]},

// BEDROOM: 7 wide x 3 tall x 6 deep
// Player enters from back wall (-Z), faces +Z into room
bedroom:{size:[7,3,6],light:{c:0x2a3050,i:0.28},
  build(g){
    // PC desk: against left wall (-X), rotated 90 so screen faces +X (into room)
    const pc=mkPC();pc.position.set(-3,0,-0.5);pc.rotation.y=-Math.PI/2;g.add(pc);
    // Bed: against right wall (+X), long axis on Z
    const bed=mkBed();bed.position.set(2.3,0,0.5);g.add(bed);
    // Posters on left wall — flat against it
    // Backpack on floor near door
    const bp=B(0.3,0.3,0.25,M(0x2a1a1a));bp.position.set(-1,0.15,-2.3);g.add(bp);
    const strap=B(0.04,0.2,0.02,M(0x1a1010));strap.position.set(-0.88,0.32,-2.18);g.add(strap);
    return[
      {mesh:pc,n:'My PC',m:'Dell XPS 420. birthday present. 2007. this is where it all started.'},
      {mesh:bed,n:'Bed',m:'i stopped sleeping. the dreams were always dustbowl.'},
      {mesh:bp,n:'Backpack',m:'i havent been to school in weeks. they stopped calling.'},
    ];
  },
  exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[-1,1.5,1]}]},

// BATHROOM: 4 wide x 3 tall x 4 deep
// Player enters from back wall (-Z), faces +Z
bathroom:{size:[4,3,4],light:{c:0x334444,i:0.3},
  build(g){
    // Sink: against right wall, faces -X
    const sink=mkSink();sink.position.set(1.5,0,-0.5);sink.rotation.y=-Math.PI/2;g.add(sink);
    // Bathtub: against left wall, long axis on Z
    const tub=mkBathtub();tub.position.set(-1.3,0,0.3);g.add(tub);
    // Towel on left wall
    const towel=B(0.35,0.5,0.02,M(0x1a2a2a));towel.position.set(-1.92,1.3,-0.5);g.add(towel);
    return[
      {mesh:sink,n:'Sink',m:'the faucet drips. has for months. nobody fixed it.'},
      {mesh:tub,n:'Bathtub',m:'cold water. duck stopped taking warm showers. didnt care anymore.'},
      {mesh:towel,n:'Towel',m:'still damp. like someone just used it. but no one has been here in a long time.'},
    ];
  },
  exits:[{p:[0,0.9,-1.95],s:[1,1.8,0.15],to:'hallway',sp:[3,1.5,1]}]},

// OUTSIDE: 14 wide x 6 tall x 12 deep
// Player enters from left wall (-X), faces +X
outside:{size:[14,6,12],light:{c:0x1a1a22,i:0.18},
  build(g){
    // Dead grass patch
    const yard=B(5,0.03,5,M(0x0a1a0a));yard.position.set(0,0.015,0);g.add(yard);
    // Dirt path from door
    const path=B(1,0.02,4,M(0x1a1a15));path.position.set(-4,0.01,0);g.add(path);
    // Mailbox right side
    const mb=mkMailbox();mb.position.set(3,0,3);g.add(mb);
    // Dead tree
    const trunk=Cy(0.12,2.2,5,M(0x1a1008));trunk.position.set(-2,1.1,-3);g.add(trunk);
    const branch1=B(0.8,0.06,0.06,M(0x1a1008));branch1.position.set(-1.8,2,-3);branch1.rotation.z=0.3;g.add(branch1);
    const branch2=B(0.6,0.06,0.06,M(0x1a1008));branch2.position.set(-2.3,1.7,-3);branch2.rotation.z=-0.4;g.add(branch2);
    // Mystery object — far end
    const mystery=B(0.7,0.7,0.7,M(0x333333,0x0a0000));mystery.position.set(4,0.35,0);g.add(mystery);
    return[
      {mesh:yard,n:'Yard',m:'the grass is dead. everything is dead.'},
      {mesh:mb,n:'Mailbox',m:'full of mail nobody opened.'},
      {mesh:trunk,n:'Dead Tree',m:'this tree used to have a tire swing. dad took it down.'},
      {mesh:mystery,n:'???',m:''},
    ];
  },
  exits:[{p:[-6.9,0.9,0],s:[0.15,1.8,1.2],to:'hallway',sp:[5,1.5,0]}]},

// MASTER BEDROOM: 7 wide x 3 tall x 6 deep
// Empty. Bed frame. Dust. Trapdoor.
master:{size:[7,3,6],light:{c:0x1a1510,i:0.15},
  build(g){
    // Bare bed frame — no mattress
    const frame=B(1.4,0.18,2,M(0x1a1208));frame.position.set(2,0.09,1);g.add(frame);
    const leg1=B(0.08,0.3,0.08,M(0x151005));leg1.position.set(1.4,0.15,0.1);g.add(leg1);
    const leg2=B(0.08,0.3,0.08,M(0x151005));leg2.position.set(2.6,0.15,0.1);g.add(leg2);
    const leg3=B(0.08,0.3,0.08,M(0x151005));leg3.position.set(1.4,0.15,1.9);g.add(leg3);
    const leg4=B(0.08,0.3,0.08,M(0x151005));leg4.position.set(2.6,0.15,1.9);g.add(leg4);
    // Trapdoor in floor — center of room
    const trap=B(0.9,0.04,0.9,M(0x2a1a0a,0x0a0500));trap.position.set(-0.5,0.02,0);g.add(trap);
    // Ring handle on trapdoor
    const ring=Cy(0.06,0.03,6,M(0x555555));ring.position.set(-0.5,0.06,0);g.add(ring);
    return[
      {mesh:frame,n:'Bed Frame',m:'no mattress. just springs. this was their room. before mom left.'},
      {mesh:trap,n:'Trapdoor',m:'MAZE'},// special — triggers maze
    ];
  },
  exits:[{p:[0,0.9,-2.95],s:[1,1.8,0.15],to:'hallway',sp:[-4,1.5,1]}]},
};

// === STATE ===
let curRoom='hallway',locked=false,yaw=0,pitch=0,flashOn=false;
const keys={},interacted={};
let totalObjs=0,totalDone=0;
Object.values(rooms).forEach(r=>{const g=new THREE.Group();totalObjs+=r.build(g).length});
let lookingAt=null,msgTimer=null;
let roomGrp=new THREE.Group();scene.add(roomGrp);
let roomLight=null,roomAmb=null,objData=[],exitMeshes=[];

// Flashlight — strong
const flash=new THREE.SpotLight(0xffeedd,0,16,0.55,0.4,1);
flash.castShadow=true;scene.add(flash);scene.add(flash.target);

function buildRoom(name){
  while(roomGrp.children.length)roomGrp.remove(roomGrp.children[0]);
  if(roomLight)scene.remove(roomLight);if(roomAmb)scene.remove(roomAmb);
  objData=[];exitMeshes=[];
  const r=rooms[name],sx=r.size[0],sy=r.size[1],sz=r.size[2];
  // Floor
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),mF);fl.rotation.x=-Math.PI/2;fl.receiveShadow=true;roomGrp.add(fl);
  if(name!=='outside'){
    const ceil=new THREE.Mesh(new THREE.PlaneGeometry(sx,sz),mC);ceil.rotation.x=Math.PI/2;ceil.position.y=sy;roomGrp.add(ceil);
    [[0,sy/2,-sz/2,0,sx],[0,sy/2,sz/2,Math.PI,sx],[-sx/2,sy/2,0,Math.PI/2,sz],[sx/2,sy/2,0,-Math.PI/2,sz]].forEach(([x,y,z,ry,w])=>{
      const wl=new THREE.Mesh(new THREE.PlaneGeometry(w,sy),mW);wl.position.set(x,y,z);wl.rotation.y=ry;wl.receiveShadow=true;roomGrp.add(wl);
    });
  }
  roomLight=new THREE.PointLight(r.light.c,r.light.i,12);roomLight.position.set(0,sy-0.3,0);roomLight.castShadow=true;scene.add(roomLight);
  roomAmb=new THREE.AmbientLight(0x0a0a0a,0.15);scene.add(roomAmb);
  const built=r.build(roomGrp);
  built.forEach(b=>{b.mesh.userData={name:b.n,msg:b.m,room:name};b.mesh.traverse(c=>{if(c.isMesh){c.castShadow=true;c.receiveShadow=true}});objData.push(b.mesh)});
  r.exits.forEach(ex=>{const m=new THREE.Mesh(new THREE.BoxGeometry(ex.s[0],ex.s[1],ex.s[2]),mE);m.position.set(ex.p[0],ex.p[1],ex.p[2]);m.userData={exit:true,to:ex.to,spawn:ex.sp};roomGrp.add(m);exitMeshes.push(m)});
  const rn=document.getElementById('home-room-name');if(rn)rn.textContent=name.toUpperCase();
  const cn=document.getElementById('home-counter');if(cn)cn.textContent=totalDone+'/'+totalObjs;
}
buildRoom('hallway');

// Controls
container.addEventListener('click',()=>{if(!locked)container.requestPointerLock()});
document.addEventListener('pointerlockchange',()=>{locked=document.pointerLockElement===container});
document.addEventListener('mousemove',e=>{if(!locked)return;yaw-=e.movementX*0.002;pitch=Math.max(-1.2,Math.min(1.2,pitch-e.movementY*0.002))});
document.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;if(k==='f'&&document.getElementById('home-canvas')){flashOn=!flashOn;flash.intensity=flashOn?3.5:0;const h=document.getElementById('home-flash-hint');if(h)h.textContent=flashOn?'[F] ON':'[F] OFF'}});
document.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false});

function showMsg(t){const el=document.getElementById('home-msg');if(!el)return;el.style.color='#999';el.textContent=t;el.style.opacity='1';clearTimeout(msgTimer);msgTimer=setTimeout(()=>{el.style.opacity='0.3'},5000)}
function interact(){
  if(!lookingAt)return;const ud=lookingAt.userData;
  if(ud.exit){curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);return}
  if(!ud.name)return;const key=ud.room+'-'+ud.name;
  if(!interacted[key]){interacted[key]=true;totalDone++;const cn=document.getElementById('home-counter');if(cn)cn.textContent=totalDone+'/'+totalObjs}
  if(ud.msg==='MAZE'){showMsg('descending...');setTimeout(()=>launchMaze(),1500);return}
  if(curRoom==='outside'&&ud.name==='???'){
    if(totalDone>=totalObjs)showMsg('Im still here at home');
    else showMsg('i cant go yet. theres more i need to remember. ('+totalDone+'/'+totalObjs+')');
    return;
  }
  showMsg(ud.msg||'...');
}

const ray=new THREE.Raycaster(),ctr=new THREE.Vector2(0,0);
function loop(){
  if(!document.getElementById('home-canvas'))return;
  requestAnimationFrame(loop);
  const spd=0.06,dir=new THREE.Vector3();
  if(keys['w'])dir.z-=1;if(keys['s'])dir.z+=1;if(keys['a'])dir.x-=1;if(keys['d'])dir.x+=1;
  if(dir.lengthSq()>0){
    dir.normalize().multiplyScalar(spd);dir.applyAxisAngle(new THREE.Vector3(0,1,0),yaw);
    const nx=camera.position.x+dir.x,nz=camera.position.z+dir.z;
    if(mazeActive){
      // Maze collision
      if(mazeCanWalk(nx,camera.position.z))camera.position.x=nx;
      if(mazeCanWalk(camera.position.x,nz))camera.position.z=nz;
    }else{
      // Room bounds collision
      const r=rooms[curRoom];
      if(r){const hx=r.size[0]/2-0.4,hz=r.size[2]/2-0.4;
      if(nx>-hx&&nx<hx)camera.position.x=nx;if(nz>-hz&&nz<hz)camera.position.z=nz}
    }
  }
  camera.rotation.set(0,0,0);camera.rotateY(yaw);camera.rotateX(pitch);
  flash.position.copy(camera.position);
  const fd=new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion);
  flash.target.position.copy(camera.position).add(fd.multiplyScalar(6));
  if(keys['e']){interact();keys['e']=false}
  // Maze updates
  if(mazeActive){updateEntity();checkMazeExit()}
  // Raycast for room objects (not in maze)
  if(!mazeActive){
    const allM=[];objData.forEach(o=>{if(o.isMesh)allM.push(o);else o.traverse(c=>{if(c.isMesh)allM.push(c)})});exitMeshes.forEach(m=>allM.push(m));
    ray.setFromCamera(ctr,camera);const hits=ray.intersectObjects(allM,false);
    const iEl=document.getElementById('home-interact'),ch=document.getElementById('home-crosshair');
    lookingAt=null;
    if(hits.length&&hits[0].distance<4){
      let obj=hits[0].object;while(obj&&!obj.userData.name&&!obj.userData.exit&&obj.parent&&obj.parent!==roomGrp)obj=obj.parent;
      if(obj.userData.name||obj.userData.exit){lookingAt=obj;const ud=obj.userData;if(iEl){iEl.textContent=ud.exit?'[E] '+ud.to:'[E] '+ud.name;iEl.style.opacity='1'}if(ch)ch.style.color='#cf6a32'}
    }
    if(!lookingAt){if(iEl)iEl.style.opacity='0';if(ch)ch.style.color='#555'}
    for(let i=0;i<exitMeshes.length;i++){if(camera.position.distanceTo(exitMeshes[i].position)<0.9){const ud=exitMeshes[i].userData;curRoom=ud.to;camera.position.set(ud.spawn[0],ud.spawn[1],ud.spawn[2]);buildRoom(curRoom);break}}
  }
  renderer.render(scene,camera);
}
loop();
const ro=new ResizeObserver(()=>{const w=container.clientWidth,h=container.clientHeight;if(w>0&&h>0){const sc=Math.max(1,Math.floor(Math.min(w/PW,h/PH)));renderer.setSize(PW*sc,PH*sc);canvas.style.width=w+'px';canvas.style.height=h+'px'}});
ro.observe(container);

// ============================================================
// MAZE SYSTEM — 20x20 basement maze with entity chase
// ============================================================
let mazeActive=false;
let entityMesh=null;
let entityPos={x:0,z:0};
let mazeGrid=null;
const MAZE_S=20;// 20x20
const CELL=2;// each cell is 2x2 units
const WALL_H=3;

function generateMaze(w,h){
  // DFS recursive backtracker
  // Grid: each cell has walls {n,s,e,w}
  const grid=[];
  for(let y=0;y<h;y++){
    grid[y]=[];
    for(let x=0;x<w;x++)grid[y][x]={n:true,s:true,e:true,w:true,visited:false};
  }
  const stack=[];
  let cx=0,cy=0;
  grid[cy][cx].visited=true;
  stack.push([cx,cy]);
  while(stack.length>0){
    const neighbors=[];
    if(cy>0&&!grid[cy-1][cx].visited)neighbors.push([cx,cy-1,'n','s']);
    if(cy<h-1&&!grid[cy+1][cx].visited)neighbors.push([cx,cy+1,'s','n']);
    if(cx>0&&!grid[cy][cx-1].visited)neighbors.push([cx-1,cy,'w','e']);
    if(cx<w-1&&!grid[cy][cx+1].visited)neighbors.push([cx+1,cy,'e','w']);
    if(neighbors.length>0){
      const[nx,ny,wall,opp]=neighbors[Math.floor(Math.random()*neighbors.length)];
      grid[cy][cx][wall]=false;
      grid[ny][nx][opp]=false;
      grid[ny][nx].visited=true;
      stack.push([cx,cy]);
      cx=nx;cy=ny;
    }else{
      const p=stack.pop();cx=p[0];cy=p[1];
    }
  }
  return grid;
}

function launchMaze(){
  mazeActive=true;
  curRoom='maze';

  // Clear everything
  while(roomGrp.children.length)roomGrp.remove(roomGrp.children[0]);
  if(roomLight)scene.remove(roomLight);
  if(roomAmb)scene.remove(roomAmb);
  objData=[];exitMeshes=[];

  // Generate maze
  mazeGrid=generateMaze(MAZE_S,MAZE_S);
  const totalW=MAZE_S*CELL;
  const matMazeWall=M(0x1a1a1a);
  const matMazeFloor=M(0x0f0e0d);

  // Floor
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(totalW+2,totalW+2),matMazeFloor);
  fl.rotation.x=-Math.PI/2;fl.position.set(totalW/2,0,totalW/2);
  fl.receiveShadow=true;roomGrp.add(fl);

  // Ceiling
  const ceil=new THREE.Mesh(new THREE.PlaneGeometry(totalW+2,totalW+2),M(0x0a0a0a));
  ceil.rotation.x=Math.PI/2;ceil.position.set(totalW/2,WALL_H,totalW/2);
  roomGrp.add(ceil);

  // Build walls from grid
  const wallGeo=new THREE.BoxGeometry(CELL,WALL_H,0.1);
  const wallGeoSide=new THREE.BoxGeometry(0.1,WALL_H,CELL);

  for(let y=0;y<MAZE_S;y++){
    for(let x=0;x<MAZE_S;x++){
      const cell=mazeGrid[y][x];
      const wx=x*CELL+CELL/2;
      const wz=y*CELL+CELL/2;
      // North wall (top, -Z side of cell)
      if(cell.n){
        const w=new THREE.Mesh(wallGeo,matMazeWall);
        w.position.set(wx,WALL_H/2,y*CELL);
        w.castShadow=true;w.receiveShadow=true;roomGrp.add(w);
      }
      // West wall (left, -X side of cell)
      if(cell.w){
        const w=new THREE.Mesh(wallGeoSide,matMazeWall);
        w.position.set(x*CELL,WALL_H/2,wz);
        w.castShadow=true;w.receiveShadow=true;roomGrp.add(w);
      }
    }
  }
  // Outer walls — south and east borders
  for(let x=0;x<MAZE_S;x++){
    const w=new THREE.Mesh(wallGeo,matMazeWall);
    w.position.set(x*CELL+CELL/2,WALL_H/2,MAZE_S*CELL);
    roomGrp.add(w);
  }
  for(let y=0;y<MAZE_S;y++){
    const w=new THREE.Mesh(wallGeoSide,matMazeWall);
    w.position.set(MAZE_S*CELL,WALL_H/2,y*CELL+CELL/2);
    roomGrp.add(w);
  }

  // Exit marker — glowing green at (19,19)
  const exitX=(MAZE_S-1)*CELL+CELL/2;
  const exitZ=(MAZE_S-1)*CELL+CELL/2;
  const exitMarker=new THREE.Mesh(
    new THREE.BoxGeometry(0.5,0.1,0.5),
    M(0x00ff00,0x004400)
  );
  exitMarker.position.set(exitX,0.05,exitZ);
  roomGrp.add(exitMarker);

  // Very dim ambient — flashlight is essential
  roomAmb=new THREE.AmbientLight(0x050505,0.1);scene.add(roomAmb);
  roomLight=new THREE.PointLight(0x110808,0.08,20);
  roomLight.position.set(totalW/2,2.5,totalW/2);scene.add(roomLight);

  // Place player at start (cell 0,0)
  camera.position.set(CELL/2,1.5,CELL/2);
  yaw=0;pitch=0;

  // Build entity — tall black demon
  entityMesh=new THREE.Group();
  // Body — tall thin
  const eBody=B(0.35,2,0.25,M(0x050505,0x020000));eBody.position.y=1;entityMesh.add(eBody);
  // Head — slightly wider, taller
  const eHead=B(0.3,0.35,0.25,M(0x080808,0x030000));eHead.position.y=2.15;entityMesh.add(eHead);
  // Eyes — two tiny red dots
  const eEyeL=B(0.04,0.04,0.02,M(0xff0000,0x440000));eEyeL.position.set(-0.08,2.2,-0.14);entityMesh.add(eEyeL);
  const eEyeR=B(0.04,0.04,0.02,M(0xff0000,0x440000));eEyeR.position.set(0.08,2.2,-0.14);entityMesh.add(eEyeR);
  // Arms — thin, hanging
  const eArmL=B(0.08,1.3,0.08,M(0x050505));eArmL.position.set(-0.25,0.7,0);entityMesh.add(eArmL);
  const eArmR=B(0.08,1.3,0.08,M(0x050505));eArmR.position.set(0.25,0.7,0);entityMesh.add(eArmR);
  // Claws — thin extensions
  const eClawL=B(0.06,0.3,0.04,M(0x030303));eClawL.position.set(-0.25,0.02,0);entityMesh.add(eClawL);
  const eClawR=B(0.06,0.3,0.04,M(0x030303));eClawR.position.set(0.25,0.02,0);entityMesh.add(eClawR);
  // Legs — thin
  const eLegL=B(0.1,1,0.1,M(0x050505));eLegL.position.set(-0.1,-0.1,0);entityMesh.add(eLegL);
  const eLegR=B(0.1,1,0.1,M(0x050505));eLegR.position.set(0.1,-0.1,0);entityMesh.add(eLegR);

  // Spawn entity at far corner
  entityPos.x=(MAZE_S-1)*CELL+CELL/2;
  entityPos.z=(MAZE_S-3)*CELL+CELL/2;// slightly away from exit
  entityMesh.position.set(entityPos.x,0,entityPos.z);
  roomGrp.add(entityMesh);

  // Update HUD
  const rn=document.getElementById('home-room-name');if(rn)rn.textContent='BASEMENT';
  const cn=document.getElementById('home-counter');if(cn)cn.textContent='find the exit';
  showMsg('find the green light. dont look back.');

  // Play puzzle audio for tension
  if(window.soosAudio){soosAudio.stop();soosAudio.playPuzzle()}
}

// Check if a position is walkable in maze
function mazeCanWalk(x,z){
  if(!mazeGrid)return false;
  const cx=Math.floor(x/CELL);
  const cz=Math.floor(z/CELL);
  if(cx<0||cx>=MAZE_S||cz<0||cz>=MAZE_S)return false;
  // Check if we'd cross a wall
  const lx=x-cx*CELL;
  const lz=z-cz*CELL;
  // Near north wall
  if(lz<0.3&&mazeGrid[cz][cx].n&&cz>0)return false;
  // Near south wall  
  if(lz>CELL-0.3&&cz<MAZE_S-1&&mazeGrid[cz][cx].s)return false;
  if(lz>CELL-0.3&&cz===MAZE_S-1)return false;
  // Near west wall
  if(lx<0.3&&mazeGrid[cz][cx].w&&cx>0)return false;
  // Near east wall
  if(lx>CELL-0.3&&cx<MAZE_S-1&&mazeGrid[cz][cx].e)return false;
  if(lx>CELL-0.3&&cx===MAZE_S-1)return false;
  return true;
}

// Entity AI — simple: move toward player, check walls
let entityMoveTimer=0;
function updateEntity(){
  if(!entityMesh||!mazeActive)return;
  entityMoveTimer++;
  if(entityMoveTimer%3!==0)return;// move every 3 frames ~20fps = every 150ms

  const speed=0.04;// slightly slower than player
  const dx=camera.position.x-entityPos.x;
  const dz=camera.position.z-entityPos.z;
  const dist=Math.sqrt(dx*dx+dz*dz);
  if(dist<0.01)return;

  // Try to move toward player
  const nx=entityPos.x+dx/dist*speed;
  const nz=entityPos.z+dz/dist*speed;

  // Try X first
  if(mazeCanWalk(nx,entityPos.z))entityPos.x=nx;
  else if(mazeCanWalk(entityPos.x,nz))entityPos.z=nz;
  // If stuck, try just one axis
  else{
    if(Math.abs(dx)>Math.abs(dz)){
      if(mazeCanWalk(entityPos.x+Math.sign(dx)*speed,entityPos.z))
        entityPos.x+=Math.sign(dx)*speed;
    }else{
      if(mazeCanWalk(entityPos.x,entityPos.z+Math.sign(dz)*speed))
        entityPos.z+=Math.sign(dz)*speed;
    }
  }

  entityMesh.position.set(entityPos.x,0,entityPos.z);

  // Face player
  entityMesh.lookAt(camera.position.x,0,camera.position.z);

  // Step up puzzle tension
  if(dist<8&&window._puzzleStepUp)window._puzzleStepUp();

  // FOR TESTING: entity does NOT kill. Uncomment below for final:
  // if(dist<0.8){triggerEntityCatch();return}
}

// Check if player reached exit
function checkMazeExit(){
  if(!mazeActive)return;
  const exitX=(MAZE_S-1)*CELL+CELL/2;
  const exitZ=(MAZE_S-1)*CELL+CELL/2;
  const dx=camera.position.x-exitX;
  const dz=camera.position.z-exitZ;
  if(Math.sqrt(dx*dx+dz*dz)<1.2){
    triggerFreedomEnding();
  }
}

// ENDING 4: FREEDOM
function triggerFreedomEnding(){
  mazeActive=false;
  if(window.soosAudio)soosAudio.stop();

  // Flashbang
  const fb=document.createElement('div');
  fb.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;opacity:1;transition:opacity 3s';
  container.appendChild(fb);

  // Flashbang sound
  if(window.soosAudio){
    soosAudio.init();
    soosAudio._ns(0,0.3,0.12,10000);// loud white noise burst
    soosAudio._n(4000,0,0.5,'sine',0.08);// high ring
    soosAudio._n(2000,0.1,2,'sine',0.04);// tinnitus ring
    soosAudio._n(1000,0.2,3,'sine',0.02);// fading ring
  }

  // After flash, show ending text
  setTimeout(()=>{
    // Play "Freedom" track
    if(window.soosAudio)soosAudio.playFreedom&&soosAudio.playFreedom();

    fb.innerHTML='';
    fb.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;background:#fff;z-index:9999;display:flex;align-items:center;justify-content:center;flex-direction:column;font-family:VT323,monospace;overflow-y:auto';

    const lines=[
      {t:'',d:1000},
      {t:'the pc exploded.',d:2500,s:18,c:'#333'},
      {t:'',d:500},
      {t:'glass everywhere. smoke.',d:2500,s:14,c:'#555'},
      {t:'his mom found him on the floor.',d:3000,s:14,c:'#555'},
      {t:'',d:1000},
      {t:'he couldnt remember anything.',d:2500,s:14,c:'#555'},
      {t:'not the pc. not the demos. not dustbowl.',d:3000,s:13,c:'#666'},
      {t:'not 201.',d:2000,s:13,c:'#666'},
      {t:'',d:1000},
      {t:'he spent 3 weeks in the hospital.',d:2500,s:14,c:'#555'},
      {t:'burns on his hands and face.',d:2500,s:14,c:'#555'},
      {t:'',d:1000},
      {t:'but he survived.',d:3000,s:16,c:'#333'},
      {t:'',d:1500},
      {t:'and for the first time in 14 months',d:3000,s:14,c:'#555'},
      {t:'he went outside.',d:3000,s:16,c:'#333'},
      {t:'',d:3000},
      {t:'ENDING 4: freedom',d:0,s:20,c:'#cf6a32'},
    ];

    let delay=2000;
    const textBox=document.createElement('div');
    textBox.style.cssText='text-align:center;padding:40px;max-width:500px';
    fb.appendChild(textBox);

    lines.forEach(l=>{
      setTimeout(()=>{
        const div=document.createElement('div');
        div.style.cssText='opacity:0;transition:opacity 1.5s;margin:4px 0;font-size:'+(l.s||14)+'px;color:'+(l.c||'#555');
        div.textContent=l.t;
        textBox.appendChild(div);
        setTimeout(()=>{div.style.opacity='1'},50);
        // Scroll to bottom
        textBox.scrollTop=textBox.scrollHeight;
      },delay);
      delay+=l.d+1500;
    });
  },3000);
}

}// end initHome3D
