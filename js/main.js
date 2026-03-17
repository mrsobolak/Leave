// ========== SAVE/LOAD SYSTEM ==========
const SAVE_KEY='soos_save';

const saveGame=()=>{
const data={
  pcState:typeof pcState!=='undefined'?pcState:1,
  cubeyIntroDone:typeof cubeyIntroDone!=='undefined'?cubeyIntroDone:false,
  cubeyUserName:typeof cubeyUserName!=='undefined'?cubeyUserName:'',
  cubeyGamesWon:typeof cubeyGamesWon!=='undefined'?cubeyGamesWon:0,
  terminalLaunched:typeof terminalLaunched!=='undefined'?terminalLaunched:false,
  mikeAwakened:typeof mikeAwakened!=='undefined'?mikeAwakened:false,
  cubeyKilled:typeof cubeyKilled!=='undefined'?cubeyKilled:false,
  timestamp:Date.now()
};
try{localStorage.setItem(SAVE_KEY,JSON.stringify(data));return true}catch(e){return false}
};

const loadGame=()=>{
try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return null;return JSON.parse(raw)}catch(e){return null}
};

const deleteSave=()=>{try{localStorage.removeItem(SAVE_KEY)}catch(e){}};

const hasSave=()=>{try{return localStorage.getItem(SAVE_KEY)!==null}catch(e){return false}};

// Auto-save every 30 seconds
let autoSaveTimer=null;
const startAutoSave=()=>{
if(autoSaveTimer)clearInterval(autoSaveTimer);
autoSaveTimer=setInterval(()=>{
if(document.getElementById('desktop')&&!document.getElementById('desktop').classList.contains('hidden'))saveGame();
},30000);
};

// ========== MENU BACKGROUND ==========
const initMenuBg=()=>{
const canvas=document.getElementById('menu-bg');
if(!canvas)return;
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
const particles=[];
for(let i=0;i<40;i++){
particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-0.5)*0.3,vy:-Math.random()*0.5-0.1,size:Math.random()*3+1,alpha:Math.random()*0.15+0.03,color:Math.random()>0.7?'#cf6a32':'#4488cc'});
}
const draw=()=>{
if(!document.getElementById('menu-bg'))return;
ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,canvas.width,canvas.height);
const grad=ctx.createRadialGradient(canvas.width*0.3,canvas.height*0.5,0,canvas.width*0.3,canvas.height*0.5,canvas.height*0.8);
grad.addColorStop(0,'rgba(42,90,154,0.08)');grad.addColorStop(1,'transparent');
ctx.fillStyle=grad;ctx.fillRect(0,0,canvas.width,canvas.height);
particles.forEach(p=>{ctx.fillStyle=p.color;ctx.globalAlpha=p.alpha;ctx.fillRect(p.x,p.y,p.size,p.size);p.x+=p.vx;p.y+=p.vy;if(p.y<-10){p.y=canvas.height+10;p.x=Math.random()*canvas.width}if(p.x<-10)p.x=canvas.width+10;if(p.x>canvas.width+10)p.x=-10});
ctx.globalAlpha=1;
ctx.fillStyle='rgba(0,0,0,0.03)';for(let y=0;y<canvas.height;y+=4)ctx.fillRect(0,y,canvas.width,1);
requestAnimationFrame(draw);
};draw();
};

// ========== MENU LOGIC ==========
document.addEventListener('DOMContentLoaded',()=>{
initMenuBg();

if(hasSave()){
const btn=document.getElementById('menu-continue');
if(btn){btn.style.display='block';const save=loadGame();if(save){const d=new Date(save.timestamp);btn.textContent='Continue ('+d.toLocaleDateString()+')'}}
}

document.getElementById('menu-new').addEventListener('click',()=>{deleteSave();startBoot(null)});
document.getElementById('menu-continue').addEventListener('click',()=>{const save=loadGame();startBoot(save)});
document.getElementById('menu-about').addEventListener('click',()=>{document.getElementById('menu-about-panel').classList.remove('hidden')});
document.getElementById('menu-about-back').addEventListener('click',()=>{document.getElementById('menu-about-panel').classList.add('hidden')});
});

const startBoot=(saveData)=>{
const el=document.documentElement;
if(el.requestFullscreen)el.requestFullscreen();
else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();
else if(el.msRequestFullscreen)el.msRequestFullscreen();

document.getElementById('main-menu').classList.add('hidden');
document.getElementById('scanlines').style.display='block';

if(saveData){
// LOAD - restore state and skip to desktop
window.pcState=saveData.pcState||1;
window.cubeyIntroDone=saveData.cubeyIntroDone||false;
window.cubeyUserName=saveData.cubeyUserName||'';
window.cubeyGamesWon=saveData.cubeyGamesWon||0;
window.terminalLaunched=saveData.terminalLaunched||false;
window.mikeAwakened=saveData.mikeAwakened||false;
window.cubeyKilled=saveData.cubeyKilled||false;

setTimeout(()=>{
if(typeof initDesktop==='function')initDesktop();
if(typeof initCubey==='function')setTimeout(initCubey,500);
startAutoSave();
},300);
}else{
// NEW GAME - full boot
document.getElementById('dell-splash').classList.remove('hidden');
dellSplash();
setTimeout(startAutoSave,30000);
}
};
