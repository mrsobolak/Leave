const openHomeGame=()=>{
const h=`<div style="width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column"><canvas id="home-canvas" width="480" height="360" style="border:1px solid #222;image-rendering:pixelated"></canvas><div id="home-msg" style="font-family:Press Start 2P,monospace;font-size:10px;color:#555;margin-top:8px;text-align:center">WASD or Arrow Keys to move. Space to interact.</div></div>`;
createWindow('home','home.exe',520,430,h);
setTimeout(()=>initHomeGame(),100);
};
const initHomeGame=()=>{
const canvas=document.getElementById('home-canvas');
if(!canvas)return;
const ctx=canvas.getContext('2d');
const S=16;
const rooms={
hallway:{w:12,h:4,color:'#1a1a1a',objects:[{x:0,y:1,w:1,h:2,c:'#2a1a00',t:'Front Door',msg:'its locked. it was always locked.'},{x:11,y:1,w:1,h:2,c:'#1a1a2a',t:'Hallway Light',msg:'the light flickers sometimes. it didnt use 2'}],exits:[{x:3,y:0,to:'kitchen',sx:3,sy:5},{x:8,y:0,to:'livingroom',sx:4,sy:5},{x:5,y:3,to:'bedroom',sx:3,sy:0},{x:6,y:3,to:'outside',sx:3,sy:0}]},
kitchen:{w:8,h:6,color:'#1a1a18',objects:[{x:1,y:1,w:2,h:1,c:'#2a2a2a',t:'Fridge',msg:'moms grocery list is still here. milk bread cereal hot pockets mountain dew. i never got them.'},{x:5,y:1,w:2,h:1,c:'#222',t:'Stove',msg:'mom made dinner at 7 every night. i was always late bc of dustbowl.'},{x:3,y:3,w:2,h:1,c:'#1a1a1a',t:'Table',msg:'we ate here as a family. before everything changed.'}],exits:[{x:3,y:5,to:'hallway',sx:3,sy:0}]},
livingroom:{w:10,h:6,color:'#1a1a1a',objects:[{x:1,y:1,w:3,h:1,c:'#222',t:'Couch',msg:'dad used to sit here and watch the news. i sat here when i didnt want to be alone.'},{x:6,y:1,w:2,h:2,c:'#1a1a2a',t:'TV',msg:'its off. it hasnt been on in a long time.'},{x:1,y:4,w:2,h:1,c:'#2a2a1a',t:'Bookshelf',msg:'moms books. she liked mystery novels. guess i became one.'}],exits:[{x:4,y:5,to:'hallway',sx:8,sy:0}]},
bedroom:{w:10,h:8,color:'#111',objects:[{x:1,y:1,w:2,h:2,c:'#1a1a2a',t:'My PC',msg:'Dell XPS 420. birthday present. 2007. this is where it all started.'},{x:5,y:1,w:3,h:1,c:'#1a1a1a',t:'Bed',msg:'i stopped sleeping. the dreams were always dustbowl.'},{x:1,y:5,w:2,h:1,c:'#222',t:'Posters',msg:'tf2 posters. i put them up when i first got the game. they used to make me happy.'},{x:7,y:4,w:2,h:2,c:'#1a1a0a',t:'Desk',msg:'homework i never finished. essays i never turned in. none of it mattered at the end.'},{x:4,y:6,w:1,h:1,c:'#2a1a1a',t:'Backpack',msg:'i havent been to school in weeks. they stopped calling.'}],exits:[{x:3,y:0,to:'hallway',sx:5,sy:3}]},
outside:{w:12,h:8,color:'#0a0a0a',objects:[{x:2,y:2,w:2,h:1,c:'#1a2a1a',t:'Yard',msg:'the grass is dead. everything is dead.'},{x:8,y:2,w:1,h:1,c:'#2a2a2a',t:'Mailbox',msg:'full of mail nobody opened.'},{x:5,y:5,w:2,h:2,c:'#333',t:'???',msg:''}],exits:[{x:3,y:0,to:'hallway',sx:6,sy:3}]}
};
let curRoom='hallway';
let px=6,py=2;
let interacted={};
let totalObjects=0;
let totalInteracted=0;
Object.values(rooms).forEach(r=>totalObjects+=r.objects.length);
const keys={};
document.addEventListener('keydown',(e)=>{keys[e.key]=true});
document.addEventListener('keyup',(e)=>{keys[e.key]=false});
let lastMove=0;
const canMove=(nx,ny)=>{
const room=rooms[curRoom];
if(nx<0||ny<0||nx>=room.w||ny>=room.h)return false;
for(const o of room.objects){
if(nx>=o.x&&nx<o.x+o.w&&ny>=o.y&&ny<o.y+o.h)return false;
}
return true;
};
const interact=()=>{
const room=rooms[curRoom];
for(const o of room.objects){
if(px>=o.x-1&&px<=o.x+o.w&&py>=o.y-1&&py<=o.y+o.h){
const key=curRoom+'-'+o.t;
if(!interacted[key]){
interacted[key]=true;
totalInteracted++;
}
if(curRoom==='outside'&&o.t==='???'){
if(totalInteracted>=totalObjects){
const msgEl=document.getElementById('home-msg');
if(msgEl){msgEl.style.color='#fff';msgEl.textContent='Im still here at home';}
return;
}else{
showMsg('i cant go yet. theres more i need to remember.');
return;
}
}
showMsg(o.msg||'...');
return;
}
}
for(const ex of room.exits){
if(px===ex.x&&py===ex.y){
curRoom=ex.to;
px=ex.sx;py=ex.sy;
return;
}
}
};
const showMsg=(msg)=>{
const msgEl=document.getElementById('home-msg');
if(msgEl){msgEl.style.color='#888';msgEl.textContent=msg}
};
const gameLoop=()=>{
if(!document.getElementById('home-canvas'))return;
const now=Date.now();
if(now-lastMove>150){
let nx=px,ny=py;
if(keys['ArrowUp']||keys['w']||keys['W'])ny--;
if(keys['ArrowDown']||keys['s']||keys['S'])ny++;
if(keys['ArrowLeft']||keys['a']||keys['A'])nx--;
if(keys['ArrowRight']||keys['d']||keys['D'])nx++;
if(keys[' '])interact();
if((nx!==px||ny!==py)&&canMove(nx,ny)){
px=nx;py=ny;
const room=rooms[curRoom];
for(const ex of room.exits){
if(px===ex.x&&py===ex.y){curRoom=ex.to;px=ex.sx;py=ex.sy;break}
}
}
lastMove=now;
}
const room=rooms[curRoom];
ctx.fillStyle='#000';
ctx.fillRect(0,0,480,360);
const ox=(480-room.w*S)/2;
const oy=(360-room.h*S)/2;
ctx.fillStyle=room.color;
ctx.fillRect(ox,oy,room.w*S,room.h*S);
room.objects.forEach((o)=>{
const key=curRoom+'-'+o.t;
ctx.fillStyle=interacted[key]?'#333':o.c;
ctx.fillRect(ox+o.x*S,oy+o.y*S,o.w*S,o.h*S);
});
room.exits.forEach((ex)=>{
ctx.fillStyle='#2a2a2a';
ctx.fillRect(ox+ex.x*S,oy+ex.y*S,S,S);
});
ctx.fillStyle='#fff';
ctx.fillRect(ox+px*S+4,oy+py*S+4,S-8,S-8);
ctx.fillStyle='#555';
ctx.font='8px Press Start 2P';
ctx.textAlign='center';
ctx.fillText(curRoom.toUpperCase(),240,20);
ctx.fillText(`${totalInteracted}/${totalObjects}`,240,350);
requestAnimationFrame(gameLoop);
};
gameLoop();
};
