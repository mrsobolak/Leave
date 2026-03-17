// ========== SAVE/LOAD SYSTEM (FILE-BASED) ==========
const saveGame=()=>{
const data={
  pcState:window.pcState||1,
  cubeyIntroDone:window.cubeyIntroDone||false,
  cubeyUserName:window.cubeyUserName||'',
  cubeyGamesWon:window.cubeyGamesWon||0,
  terminalLaunched:window.terminalLaunched||false,
  mikeAwakened:window.mikeAwakened||false,
  cubeyKilled:window.cubeyKilled||false,
  path2Counter:window.path2Counter||0,
  termStep:window.termStep||0,
  timestamp:Date.now(),
  version:'2.3'
};
const json=JSON.stringify(data,null,2);
const blob=new Blob([json],{type:'application/json'});
const url=URL.createObjectURL(blob);
const a=document.createElement('a');
a.href=url;
a.download='soos_save.json';
a.click();
URL.revokeObjectURL(url);
};

const loadGameFromFile=(callback)=>{
const input=document.createElement('input');
input.type='file';
input.accept='.json';
input.addEventListener('change',(e)=>{
const file=e.target.files[0];
if(!file)return;
const reader=new FileReader();
reader.onload=(ev)=>{
try{
const data=JSON.parse(ev.target.result);
if(!data.version){alert('Invalid save file.');return}
callback(data);
}catch(err){alert('Corrupted save file.')}
};
reader.readAsText(file);
});
input.click();
};

// Menu music now handled by soosAudio in audio.js


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

// Gate: click ENTER -> music starts instantly, gate disappears
document.getElementById('gate-enter').addEventListener('click',()=>{
document.getElementById('menu-gate').style.display='none';
window.soosAudio&&soosAudio.playMenu();
});
// Hover style for gate button
const gateBtn=document.getElementById('gate-enter');
if(gateBtn){gateBtn.addEventListener('mouseenter',()=>{gateBtn.style.color='#fff';gateBtn.style.borderColor='#cf6a32';gateBtn.style.background='rgba(207,106,50,0.1)'});gateBtn.addEventListener('mouseleave',()=>{gateBtn.style.color='#aaa';gateBtn.style.borderColor='#555';gateBtn.style.background='transparent'})}

document.getElementById('menu-new').addEventListener('click',()=>{if(window.soosAudio)soosAudio.stop();startBoot(null)});
document.getElementById('menu-load').addEventListener('click',()=>{
if(window.soosAudio)soosAudio.stop();
loadGameFromFile((save)=>{startBoot(save)});
});
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
window.pcState=saveData.pcState||1;
window.cubeyIntroDone=saveData.cubeyIntroDone||false;
window.cubeyUserName=saveData.cubeyUserName||'friend';
window.cubeyGamesWon=saveData.cubeyGamesWon||0;
window.terminalLaunched=saveData.terminalLaunched||false;
window.mikeAwakened=saveData.mikeAwakened||false;
window.cubeyKilled=saveData.cubeyKilled||false;
if(saveData.termStep&&window.termStep!==undefined)window.termStep=saveData.termStep;
if(saveData.path2Counter&&window.path2Counter!==undefined)window.path2Counter=saveData.path2Counter;

setTimeout(()=>{
if(window.initDesktop)window.initDesktop();
if(window.initCubey)setTimeout(window.initCubey,500);
// Start audio for save load
setTimeout(()=>{
  if(window.soosAudio){
    soosAudio.init();
    window.pcState===2?soosAudio.playCorrupted():soosAudio.playDesktop();
  }
},800);
},300);
}else{
document.getElementById('dell-splash').classList.remove('hidden');
dellSplash();
}
};
window.saveGame=saveGame;
