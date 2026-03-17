// ========== SAVE/LOAD SYSTEM (FILE-BASED) ==========
const saveGame=()=>{
const data={
  pcState:typeof pcState!=='undefined'?pcState:1,
  cubeyIntroDone:typeof cubeyIntroDone!=='undefined'?cubeyIntroDone:false,
  cubeyUserName:typeof cubeyUserName!=='undefined'?cubeyUserName:'',
  cubeyGamesWon:typeof cubeyGamesWon!=='undefined'?cubeyGamesWon:0,
  terminalLaunched:typeof terminalLaunched!=='undefined'?terminalLaunched:false,
  mikeAwakened:typeof mikeAwakened!=='undefined'?mikeAwakened:false,
  cubeyKilled:typeof cubeyKilled!=='undefined'?cubeyKilled:false,
  path2Counter:typeof path2Counter!=='undefined'?path2Counter:0,
  termStep:typeof termStep!=='undefined'?termStep:0,
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

// ========== MENU MUSIC ==========
let menuAudioCtx=null;
let menuMusicPlaying=false;

const playMenuMusic=()=>{
if(menuMusicPlaying)return;
menuAudioCtx=new(window.AudioContext||window.webkitAudioContext)();
// Resume context if browser suspended it
if(menuAudioCtx.state==='suspended')menuAudioCtx.resume();
menuMusicPlaying=true;

const pn=(freq,start,dur,type,vol)=>{
const osc=menuAudioCtx.createOscillator();
const g=menuAudioCtx.createGain();
const f=menuAudioCtx.createBiquadFilter();
f.type='lowpass';f.frequency.value=2000;
osc.type=type||'sine';osc.frequency.value=freq;
g.gain.setValueAtTime(0,menuAudioCtx.currentTime+start);
g.gain.linearRampToValueAtTime(vol||0.06,menuAudioCtx.currentTime+start+0.02);
g.gain.exponentialRampToValueAtTime(0.001,menuAudioCtx.currentTime+start+dur);
osc.connect(f);f.connect(g);g.connect(menuAudioCtx.destination);
osc.start(menuAudioCtx.currentTime+start);
osc.stop(menuAudioCtx.currentTime+start+dur);
};

const BPM=108;
const B=60/BPM;

// Piano melody - gentle, music box feel, original composition
// Key of C, slightly melancholic
const melody=()=>{
const notes=[
// Phrase 1 - gentle intro
[523,0],[494,0.75],[523,1],[659,1.5],[587,2.5],[523,3],[494,3.5],[440,4],
// Phrase 2 - rising hope
[440,5],[523,5.5],[587,6],[659,7],[698,7.5],[659,8],[587,8.5],[523,9],
// Phrase 3 - descending, thoughtful
[659,10],[587,10.5],[523,11],[494,11.5],[440,12],[392,13],[440,13.5],[494,14],[523,15],
// Phrase 4 - resolution
[523,16],[587,16.5],[659,17],[784,18],[659,18.5],[587,19],[523,19.5],[494,20],[523,21],
// Phrase 5 - variation
[784,22],[698,22.5],[659,23],[587,23.5],[523,24],[587,24.5],[659,25],[523,26],
// Phrase 6 - gentle ending
[440,27],[494,27.5],[523,28],[587,28.5],[523,29],[494,29.5],[440,30],[392,31],[523,32],
];
notes.forEach(([f,t])=>pn(f,t*B,B*1.8,'sine',0.045));
// Ghost octave above, quieter (music box shimmer)
notes.forEach(([f,t])=>pn(f*2,t*B+0.05,B*1.2,'sine',0.012));
};

// Warm pad chords - C Am F G
const pads=()=>{
const chords=[
[[262,330,392],0],// C
[[220,262,330],4],// Am  
[[175,220,262],8],// F
[[196,247,294],12],// G
[[262,330,392],16],// C
[[220,262,330],20],// Am
[[175,220,262],24],// F
[[196,247,294],28],// G
[[262,330,392],32],// C
];
chords.forEach(([ch,t])=>{
ch.forEach(f=>{
pn(f,t*B,B*3.8,'sine',0.02);
pn(f*0.998,t*B+0.1,B*3.5,'sine',0.01);// slight detune for warmth
});
});
};

// Gentle bass
const bass=()=>{
const notes=[
[131,0],[110,4],[87,8],[98,12],
[131,16],[110,20],[87,24],[98,28],[131,32],
];
notes.forEach(([f,t])=>pn(f,t*B,B*3.5,'triangle',0.06));
};

// High twinkle - sparse, like distant wind chimes
const twinkle=()=>{
const notes=[
[1568,2],[2093,6],[1760,10],[1568,14],
[2093,18],[1760,22],[1568,26],[2093,30],
];
notes.forEach(([f,t])=>pn(f,t*B,B*2,'sine',0.01));
};

// Soft rhythmic pulse (not drums, just gentle heartbeat)
const pulse=()=>{
for(let i=0;i<17;i++){
pn(65,i*2*B,0.15,'sine',0.04);
pn(55,i*2*B+B,0.1,'sine',0.02);
}
};

// Play all layers
const playAllLayers=()=>{
if(!menuMusicPlaying||!menuAudioCtx)return;
melody();pads();bass();twinkle();pulse();
};
playAllLayers();

// Seamless infinite loop - schedule next before current ends
const loopTime=33*B*1000;
const scheduleLoop=()=>{
if(!menuMusicPlaying)return;
setTimeout(()=>{
if(!menuMusicPlaying||!menuAudioCtx)return;
playAllLayers();
scheduleLoop();
},loopTime-200);// overlap slightly for seamless transition
};
scheduleLoop();
};

const stopMenuMusic=()=>{
menuMusicPlaying=false;
if(menuAudioCtx){
menuAudioCtx.close().catch(()=>{});
menuAudioCtx=null;
}
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

// Gate: click ENTER -> music starts instantly, gate disappears
document.getElementById('gate-enter').addEventListener('click',()=>{
document.getElementById('menu-gate').style.display='none';
playMenuMusic();
});
// Hover style for gate button
const gateBtn=document.getElementById('gate-enter');
if(gateBtn){gateBtn.addEventListener('mouseenter',()=>{gateBtn.style.color='#fff';gateBtn.style.borderColor='#cf6a32';gateBtn.style.background='rgba(207,106,50,0.1)'});gateBtn.addEventListener('mouseleave',()=>{gateBtn.style.color='#aaa';gateBtn.style.borderColor='#555';gateBtn.style.background='transparent'})}

document.getElementById('menu-new').addEventListener('click',()=>{stopMenuMusic();startBoot(null)});
document.getElementById('menu-load').addEventListener('click',()=>{
stopMenuMusic();
loadGameFromFile((save)=>{startBoot(save)});
});
document.getElementById('menu-about').addEventListener('click',()=>{document.getElementById('menu-about-panel').classList.remove('hidden')});
document.getElementById('menu-about-back').addEventListener('click',()=>{document.getElementById('menu-about-panel').classList.add('hidden')});
});

const startBoot=(saveData)=>{
stopMenuMusic();
const el=document.documentElement;
if(el.requestFullscreen)el.requestFullscreen();
else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();
else if(el.msRequestFullscreen)el.msRequestFullscreen();

document.getElementById('main-menu').classList.add('hidden');
document.getElementById('scanlines').style.display='block';

if(saveData){
window.pcState=saveData.pcState||1;
window.cubeyIntroDone=saveData.cubeyIntroDone||false;
window.cubeyUserName=saveData.cubeyUserName||'';
window.cubeyGamesWon=saveData.cubeyGamesWon||0;
window.terminalLaunched=saveData.terminalLaunched||false;
window.mikeAwakened=saveData.mikeAwakened||false;
window.cubeyKilled=saveData.cubeyKilled||false;

setTimeout(()=>{
if(window.initDesktop)window.initDesktop();
if(window.initCubey)setTimeout(window.initCubey,500);
},300);
}else{
document.getElementById('dell-splash').classList.remove('hidden');
dellSplash();
}
};
window.saveGame=saveGame;
