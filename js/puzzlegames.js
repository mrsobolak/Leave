// PUZZLE GAMES - 5 FNAF-style 8bit minigames for corrupted mode
// Each game has 4 levels, gets darker, gives a code piece at the end
let puzzleProgress={game1:0,game2:0,game3:0,game4:0,game5:0};
let puzzleCodes=[];
const FINAL_CODES=['DUSTBOWL','MEDIC','UBERSAW','FOREST','201'];
let puzzleActive=false;

// ============ GAME LAUNCHER ============
const launchPuzzleGame=(gameNum)=>{
if(puzzleActive)return;
puzzleActive=true;
const level=puzzleProgress['game'+gameNum];
if(level>=4){
if(typeof cubeyQ==='function')cubeyQ("You already finished that one. The code was "+FINAL_CODES[gameNum-1]+".",true);
puzzleActive=false;
return;
}
const games={1:puzzleDustbowl,2:puzzleSaveThem,3:puzzleFileRecovery,4:puzzleForest,5:puzzleTerminal};
if(games[gameNum])games[gameNum](level);
};

const puzzleComplete=(gameNum)=>{
puzzleProgress['game'+gameNum]=4;
const code=FINAL_CODES[gameNum-1];
if(!puzzleCodes.includes(code))puzzleCodes.push(code);
const total=puzzleCodes.length;
if(typeof cubeyQ==='function'){
cubeyQ("Code found: "+code,true);
if(total<5)cubeyQ(total+"/5 codes. "+( 5-total)+" more to go.",true);
else cubeyQ("Thats all of them. Open the terminal. Type: kill_process "+puzzleCodes.join('_'),true);
}
};

const createPuzzleWindow=(title,width,height,canvasId)=>{
const old=document.getElementById('puzzle-window');
if(old)old.remove();
const win=document.createElement('div');
win.id='puzzle-window';
win.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:850;background:#000;border:3px solid #333;padding:0;font-family:"Press Start 2P",monospace';
win.innerHTML=`<div style="background:#1a1a1a;padding:4px 8px;font-size:9px;color:#666;display:flex;justify-content:space-between;align-items:center">
<span>${title}</span><button id="puzzle-close" style="background:#600;color:#fff;border:1px solid #900;font-size:8px;padding:1px 6px;cursor:pointer;font-family:inherit">X</button></div>
<canvas id="${canvasId}" width="${width}" height="${height}" style="display:block;image-rendering:pixelated"></canvas>
<div id="puzzle-msg" style="background:#111;padding:4px 8px;font-size:8px;color:#888;min-height:20px;font-family:'Press Start 2P',monospace"></div>`;
document.body.appendChild(win);
document.getElementById('puzzle-close').addEventListener('click',()=>{
win.remove();puzzleActive=false;
if(typeof cubeyQ==='function')cubeyQ("You closed it... we need those codes.",true);
});
return document.getElementById(canvasId).getContext('2d');
};

const puzzleMsg=(text)=>{const el=document.getElementById('puzzle-msg');if(el)el.textContent=text};

// ============ GAME 1: DUSTBOWL ============
// Side-scroller. Play as medic running through dustbowl. Gets darker each level.
const puzzleDustbowl=(level)=>{
const W=400,H=250;
const ctx=createPuzzleWindow('DUSTBOWL - Level '+(level+1),W,H,'pz-dustbowl');
let px=30,py=H-50,pvy=0,onGround=true;
let scroll=0,speed=2+level*0.5;
let teammates=[];let enemies=[];let healed=0;let lost=0;
let gameOver=false;let won=false;let frame=0;
const msgs=['This is how it used to be.','Some of them are missing now.','The tunnel is getting dark.','You were never the medic.'];
puzzleMsg(msgs[level]);

// Generate level
for(let i=0;i<8-level;i++)teammates.push({x:150+i*120+Math.random()*60,y:H-50,alive:true,healed:false});
if(level>=2)for(let i=0;i<level;i++)enemies.push({x:200+i*180,y:H-50});

const keys={};
document.onkeydown=(e)=>keys[e.key]=true;
document.onkeyup=(e)=>keys[e.key]=false;

const tick=()=>{
if(gameOver){
if(won){
puzzleProgress.game1=level+1;
if(level===3){puzzleComplete(1);setTimeout(()=>{document.getElementById('puzzle-window')?.remove();puzzleActive=false},3000)}
else{puzzleMsg('Level '+(level+1)+' complete. '+(level<3?'Press SPACE for next level.':''));
const waitSpace=()=>{if(keys[' ']){document.onkeydown=null;document.onkeyup=null;document.getElementById('puzzle-window')?.remove();puzzleActive=false;launchPuzzleGame(1)}else{requestAnimationFrame(waitSpace)}};waitSpace()}
}else{puzzleMsg('You failed. Press SPACE to retry.');
const waitRetry=()=>{if(keys[' ']){document.onkeydown=null;document.onkeyup=null;document.getElementById('puzzle-window')?.remove();puzzleActive=false;launchPuzzleGame(1)}else{requestAnimationFrame(waitRetry)}};waitRetry()}
return;
}
frame++;

// Input
if((keys['ArrowUp']||keys[' ']||keys['w']||keys['W'])&&onGround){pvy=-8;onGround=false}
if(keys['ArrowRight']||keys['d']||keys['D'])px=Math.min(W-20,px+3);
if(keys['ArrowLeft']||keys['a']||keys['A'])px=Math.max(10,px-3);

// Physics
pvy+=0.5;py+=pvy;
if(py>=H-50){py=H-50;pvy=0;onGround=true}

scroll+=speed;

// Draw
ctx.fillStyle=level<2?'#4a6fa5':'#1a1a2e';
ctx.fillRect(0,0,W,H);

// Ground
ctx.fillStyle=level<2?'#8B7355':'#3a2a1a';
ctx.fillRect(0,H-30,W,30);

// Tunnel walls (level 3+)
if(level>=2){
ctx.fillStyle='#111';
ctx.fillRect(0,0,W,40+level*15);
ctx.fillRect(0,H-30-level*10,W,level*10);
}

// Teammates
teammates.forEach(t=>{
const sx=t.x-scroll;
if(sx<-20||sx>W+20)return;
if(!t.alive){ctx.fillStyle='#444';ctx.fillRect(sx-5,t.y-2,10,2);return}
if(t.healed){ctx.fillStyle='#5c5';ctx.fillRect(sx-5,t.y-15,10,15);return}
ctx.fillStyle=level>=3?'#666':'#55a';
ctx.fillRect(sx-5,t.y-15,10,15);
// Heal range check
if(Math.abs(px-sx)<25&&Math.abs(py-t.y)<20&&!t.healed){t.healed=true;healed++}
});

// Enemies (level 2+) - the figure
enemies.forEach(e=>{
const sx=e.x-scroll;
if(sx<-20||sx>W+20)return;
ctx.fillStyle='#000';
ctx.fillRect(sx-6,H-65,12,35);
// Red eyes
ctx.fillStyle='#f00';
ctx.fillRect(sx-3,H-60,2,2);
ctx.fillRect(sx+1,H-60,2,2);
// Collision
if(Math.abs(px-sx)<15&&Math.abs(py-(H-50))<20){
if(level===3){// Level 4: figure IS you
puzzleMsg('The figure was you all along.');
gameOver=true;won=true;return;
}
gameOver=true;won=false;return;
}
});

// Player (medic)
ctx.fillStyle=level===3?'#000':'#fff';
ctx.fillRect(px-5,py-15,10,15);
// Cross
ctx.fillStyle='#f00';
ctx.fillRect(px-1,py-13,2,6);
ctx.fillRect(px-3,py-11,6,2);

// HUD
ctx.fillStyle='#fff';
ctx.font='8px monospace';
ctx.fillText('Healed: '+healed+'/'+(teammates.filter(t=>t.alive).length),5,12);

// Win condition: scroll past all teammates
if(scroll>teammates[teammates.length-1]?.x+100){
gameOver=true;won=true;
if(level===3)puzzleMsg('You were never saving them.');
}

requestAnimationFrame(tick);
};
tick();
};

// ============ GAME 2: SAVE THEM ============
// Top-down. Mike runs to friends. Entity shadow chases. Can't save everyone.
const puzzleSaveThem=(level)=>{
const W=350,H=300;
const ctx=createPuzzleWindow('SAVE THEM - Level '+(level+1),W,H,'pz-save');
const friends=[
{name:'PYRO',x:50,y:50,c:'#f80',saved:false,gone:false},
{name:'SCOUT',x:W-50,y:50,c:'#5af',saved:false,gone:false},
{name:'HEVY',x:50,y:H-50,c:'#a55',saved:false,gone:false},
{name:'MIKE',x:W-50,y:H-50,c:'#5c5',saved:false,gone:false}
];
const canSave=[3,2,1,0][level]; // Level 4: can't save anyone
let px=W/2,py=H/2;
let ex=W/2,ey=0; // Entity position
let eSpeed=1+level*0.7;
let saved=0,timer=600-level*100;
let gameOver=false,won=false;
const msgs=["I can save them.","I can save some of them.","I can only save one.","I can't save anyone."];
puzzleMsg(msgs[level]);

const keys={};
document.onkeydown=(e)=>keys[e.key]=true;
document.onkeyup=(e)=>keys[e.key]=false;

const tick=()=>{
if(gameOver){
if(level===3){
puzzleMsg("you cant save me mike");
puzzleProgress.game2=level+1;
puzzleComplete(2);
setTimeout(()=>{document.getElementById('puzzle-window')?.remove();puzzleActive=false},4000);
}else if(won){
puzzleProgress.game2=level+1;
puzzleMsg('Saved '+saved+'. Press SPACE for next level.');
const w=()=>{if(keys[' ']){document.onkeydown=null;document.onkeyup=null;document.getElementById('puzzle-window')?.remove();puzzleActive=false;launchPuzzleGame(2)}else requestAnimationFrame(w)};w();
}else{
puzzleMsg('Press SPACE to retry.');
const w=()=>{if(keys[' ']){document.onkeydown=null;document.onkeyup=null;document.getElementById('puzzle-window')?.remove();puzzleActive=false;launchPuzzleGame(2)}else requestAnimationFrame(w)};w();
}
return;
}

timer--;
if(timer<=0){gameOver=true;won=saved>=canSave;return}

// Input
const spd=2.5;
if(keys['ArrowUp']||keys['w']||keys['W'])py=Math.max(10,py-spd);
if(keys['ArrowDown']||keys['s']||keys['S'])py=Math.min(H-10,py+spd);
if(keys['ArrowLeft']||keys['a']||keys['A'])px=Math.max(10,px-spd);
if(keys['ArrowRight']||keys['d']||keys['D'])px=Math.min(W-10,px+spd);

// Entity chases player
const edx=px-ex,edy=py-ey,edist=Math.sqrt(edx*edx+edy*edy)||1;
ex+=edx/edist*eSpeed;ey+=edy/edist*eSpeed;

// Entity catches player
if(Math.abs(px-ex)<15&&Math.abs(py-ey)<15){gameOver=true;won=false;return}

// Friends disappear over time (based on level)
friends.forEach((f,i)=>{
if(f.saved||f.gone)return;
if(timer<(400-i*80-level*60)&&!f.saved){f.gone=true}
// Save check
if(Math.abs(px-f.x)<20&&Math.abs(py-f.y)<20){f.saved=true;saved++}
});

// All friends saved or gone
const remaining=friends.filter(f=>!f.saved&&!f.gone).length;
if(remaining===0){gameOver=true;won=saved>=canSave}

// Draw
ctx.fillStyle='#0a0a15';ctx.fillRect(0,0,W,H);

// Friends
friends.forEach(f=>{
if(f.gone){ctx.fillStyle='#222';ctx.font='8px monospace';ctx.fillText(f.name,f.x-15,f.y+4);return}
if(f.saved){ctx.fillStyle='#555';ctx.fillRect(f.x-8,f.y-8,16,16);ctx.fillStyle='#0f0';ctx.font='7px monospace';ctx.fillText('OK',f.x-5,f.y+3);return}
ctx.fillStyle=f.c;ctx.fillRect(f.x-8,f.y-8,16,16);
ctx.fillStyle='#fff';ctx.font='7px monospace';ctx.fillText(f.name,f.x-12,f.y-12);
});

// Entity shadow
ctx.fillStyle='rgba(0,0,0,0.8)';
ctx.beginPath();ctx.arc(ex,ey,12+level*3,0,Math.PI*2);ctx.fill();
ctx.fillStyle='#f00';
ctx.fillRect(ex-3,ey-2,2,2);ctx.fillRect(ex+1,ey-2,2,2);

// Player
ctx.fillStyle='#fff';ctx.fillRect(px-6,py-6,12,12);

// HUD
ctx.fillStyle='#888';ctx.font='8px monospace';
ctx.fillText('Saved: '+saved+'/'+canSave+'  Time: '+Math.ceil(timer/60),5,12);

requestAnimationFrame(tick);
};
tick();
};

// ============ GAME 3: FILE RECOVERY ============
// Piece together corrupted file fragments against a timer.
const puzzleFileRecovery=(level)=>{
const W=400,H=300;
const ctx=createPuzzleWindow('FILE RECOVERY - Level '+(level+1),W,H,'pz-file');
const fileTexts=[
['bought hard','drive from','craigslist','guy was weird','DO NOT PLAY','THE DEMOS'],
['hes on every','server now','0.0.0.0','not a valid','IP address','how is this possible'],
['mike sees him','now on his','own pc','it spread','thru steam','thru the game'],
['im so tired','i cant do this','anymore','tomorrow','i go','home']
];
const fragments=fileTexts[level].map((t,i)=>({text:t,correctPos:i,currentPos:-1,x:50+Math.random()*300,y:50+Math.random()*200,dragging:false}));
// Shuffle
fragments.sort(()=>Math.random()-0.5);
const slots=[];
for(let i=0;i<fragments.length;i++)slots.push({x:50,y:40+i*40,w:300,h:30,filled:false,fragment:null});

let timer=30-level*5;
let timerInterval=null;
let solved=false;
let dragFrag=null;
let dragOx=0,dragOy=0;
const msgs=["Piece it together.","The files are getting worse.","Almost unreadable.","His last words."];
puzzleMsg(msgs[level]);

// Mouse handling
const canvas=document.getElementById('pz-file');
canvas.addEventListener('mousedown',(e)=>{
const rect=canvas.getBoundingClientRect();
const mx=e.clientX-rect.left,my=e.clientY-rect.top;
for(const f of fragments){
if(mx>f.x&&mx<f.x+120&&my>f.y&&my<f.y+25){
dragFrag=f;dragOx=mx-f.x;dragOy=my-f.y;f.dragging=true;break;
}
}
});
canvas.addEventListener('mousemove',(e)=>{
if(!dragFrag)return;
const rect=canvas.getBoundingClientRect();
dragFrag.x=e.clientX-rect.left-dragOx;
dragFrag.y=e.clientY-rect.top-dragOy;
});
canvas.addEventListener('mouseup',()=>{
if(!dragFrag)return;
dragFrag.dragging=false;
// Check if dropped on a slot
for(let i=0;i<slots.length;i++){
const s=slots[i];
if(dragFrag.x>s.x-20&&dragFrag.x<s.x+s.w&&dragFrag.y>s.y-15&&dragFrag.y<s.y+s.h){
dragFrag.x=s.x+10;dragFrag.y=s.y+5;
dragFrag.currentPos=i;
break;
}
}
dragFrag=null;
// Check if solved
const allPlaced=fragments.every(f=>f.currentPos===f.correctPos);
if(allPlaced&&!solved){
solved=true;clearInterval(timerInterval);
puzzleProgress.game3=level+1;
if(level===3){puzzleComplete(3);puzzleMsg("Recovered. Code: "+FINAL_CODES[2]);setTimeout(()=>{document.getElementById('puzzle-window')?.remove();puzzleActive=false},3000)}
else{puzzleMsg("Recovered! Press SPACE for next level.");
const w=()=>{const k={};document.onkeydown=(e)=>k[e.key]=true;const ww=()=>{if(k[' ']){document.getElementById('puzzle-window')?.remove();puzzleActive=false;launchPuzzleGame(3)}else requestAnimationFrame(ww)};ww()};w()}
}
});

timerInterval=setInterval(()=>{
timer--;
if(timer<=0&&!solved){clearInterval(timerInterval);puzzleMsg("Time's up. Press SPACE to retry.");
const k={};document.onkeydown=(e)=>k[e.key]=true;
const w=()=>{if(k[' ']){document.getElementById('puzzle-window')?.remove();puzzleActive=false;launchPuzzleGame(3)}else requestAnimationFrame(w)};w()}
},1000);

const draw=()=>{
if(!document.getElementById('pz-file')){clearInterval(timerInterval);return}
ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,W,H);

// Slots
slots.forEach((s,i)=>{
ctx.strokeStyle='#333';ctx.strokeRect(s.x,s.y,s.w,s.h);
ctx.fillStyle='#1a1a1a';ctx.fillRect(s.x+1,s.y+1,s.w-2,s.h-2);
ctx.fillStyle='#333';ctx.font='8px monospace';ctx.fillText((i+1)+'.',s.x+4,s.y+18);
});

// Fragments
fragments.forEach(f=>{
ctx.fillStyle=f.dragging?'#446':'#223';
ctx.fillRect(f.x,f.y,120,25);
ctx.strokeStyle=f.currentPos===f.correctPos?'#0f0':'#555';
ctx.strokeRect(f.x,f.y,120,25);
ctx.fillStyle=f.currentPos===f.correctPos?'#0f0':'#aaa';
ctx.font='9px monospace';ctx.fillText(f.text,f.x+5,f.y+16);
});

// Timer
ctx.fillStyle=timer<10?'#f00':'#888';ctx.font='10px monospace';
ctx.fillText('TIME: '+timer,W-80,20);

requestAnimationFrame(draw);
};
draw();
};

// ============ GAME 4: THE FOREST ============
// Just walk through a forest. That's it. Peaceful.
const puzzleForest=(level)=>{
const W=400,H=300;
const ctx=createPuzzleWindow('THE FOREST',W,H,'pz-forest');
let px=50,py=H/2;
let scroll=0;
let trees=[];
for(let i=0;i<40;i++){
trees.push({
x:100+i*80+Math.random()*60,
y:40+Math.random()*(H-100),
h:40+Math.random()*50,
w:8+Math.random()*6,
green:'#'+['2d5','3a6','296','2b4','3c5'][Math.floor(Math.random()*5)]
});
}
let reachedEnd=false;
let levelLocal=level;

// Soft ambient messages
const ambientMsgs=[
["The forest is quiet."],
["Just walk."],
["There's nothing here. Just trees."],
["..."]
];
puzzleMsg(ambientMsgs[level][0]);

const keys={};
document.onkeydown=(e)=>keys[e.key]=true;
document.onkeyup=(e)=>keys[e.key]=false;

const tick=()=>{
if(reachedEnd){
puzzleProgress.game4=levelLocal+1;
if(levelLocal===3){
puzzleComplete(4);
puzzleMsg("Code: "+FINAL_CODES[3]+". You found peace. It won't last.");
setTimeout(()=>{document.getElementById('puzzle-window')?.remove();puzzleActive=false},4000);
}else{
puzzleMsg("Press SPACE to continue.");
const w=()=>{if(keys[' ']){document.onkeydown=null;document.onkeyup=null;document.getElementById('puzzle-window')?.remove();puzzleActive=false;setTimeout(()=>launchPuzzleGame(4),500)}else requestAnimationFrame(w)};w();
}
return;
}

// Move
if(keys['ArrowRight']||keys['d']||keys['D']){scroll+=2;px=Math.min(W/2,px+1)}
if(keys['ArrowLeft']||keys['a']||keys['A']){scroll=Math.max(0,scroll-2);px=Math.max(20,px-1)}
if(keys['ArrowUp']||keys['w']||keys['W'])py=Math.max(20,py-2);
if(keys['ArrowDown']||keys['s']||keys['S'])py=Math.min(H-20,py+2);

// Check end
if(scroll>3000){reachedEnd=true;return}

// Draw sky
const skyColor=level<2?'#5577aa':'#223344';
ctx.fillStyle=skyColor;ctx.fillRect(0,0,W,H);

// Ground
ctx.fillStyle=level<2?'#3a5a2a':'#1a2a1a';
ctx.fillRect(0,H-40,W,40);

// Trees
trees.forEach(t=>{
const sx=t.x-scroll;
if(sx<-30||sx>W+30)return;
// Trunk
ctx.fillStyle='#4a3520';
ctx.fillRect(sx-t.w/2,t.y,t.w,t.h);
// Leaves
ctx.fillStyle=t.green;
ctx.beginPath();ctx.arc(sx,t.y-10,18+t.w,0,Math.PI*2);ctx.fill();
});

// Player - simple person shape
ctx.fillStyle='#ddd';
ctx.fillRect(px-4,py-12,8,12);
ctx.fillStyle='#eec';
ctx.fillRect(px-3,py-16,6,5);

// Distance indicator
const pct=Math.min(100,Math.floor(scroll/30));
ctx.fillStyle='#888';ctx.font='8px monospace';
ctx.fillText(pct+'%',W-40,15);

requestAnimationFrame(tick);
};
tick();
};

// ============ GAME 5: THE TERMINAL ============
// Mike guides you to enter the codes. The final puzzle.
const puzzleTerminal=(level)=>{
if(puzzleCodes.length<4){
if(typeof cubeyQ==='function')cubeyQ("We need all 4 codes first. "+puzzleCodes.length+"/4 found.",true);
puzzleActive=false;
return;
}
const W=500,H=350;
const ctx=createPuzzleWindow('TERMINAL',W,H,'pz-term');

// Replace canvas with actual terminal UI
const canvas=document.getElementById('pz-term');
canvas.style.display='none';
const parent=canvas.parentNode;
const termDiv=document.createElement('div');
termDiv.style.cssText='width:'+W+'px;height:'+H+'px;background:#0a0a0a;padding:10px;overflow-y:auto;font-family:"VT323",monospace;font-size:14px;color:#0f0';
termDiv.id='pz-term-div';
parent.appendChild(termDiv);

const lines=[];
const addLine=(text,color)=>{
lines.push({text,color:color||'#0f0'});
termDiv.innerHTML=lines.map(l=>'<div style="color:'+l.color+';margin:2px 0">'+l.text+'</div>').join('');
termDiv.scrollTop=termDiv.scrollHeight;
};

const inputLine=document.createElement('div');
inputLine.style.cssText='display:flex;align-items:center;margin-top:4px';
inputLine.innerHTML='<span style="color:#0f0;font-family:VT323,monospace;font-size:14px">C:\\SoOS&gt; </span><input id="pz-term-input" style="flex:1;background:transparent;border:none;color:#0f0;font-family:VT323,monospace;font-size:14px;outline:none" autofocus>';
parent.appendChild(inputLine);
const input=document.getElementById('pz-term-input');

// Mike's guided sequence
let step=0;
const sequence=[
{mike:"I remember now. My name is Mike.",delay:1000},
{mike:"He was my best friend. And then he wasn't.",delay:2500},
{mike:"I know how to stop this. I found the codes.",delay:4000},
{mike:"Type: kill_process "+FINAL_CODES.join('_'),delay:6000},
];

// Show Mike's messages
let seqIdx=0;
const showNext=()=>{
if(seqIdx>=sequence.length)return;
const s=sequence[seqIdx];
setTimeout(()=>{
addLine('[CUBEY]: '+s.mike,'#ff0');
if(typeof cubeyQ==='function')cubeyQ(s.mike,true);
seqIdx++;
showNext();
},s.delay);
};
showNext();

// Handle input
input.addEventListener('keydown',(e)=>{
if(e.key!=='Enter')return;
const cmd=input.value.trim();
input.value='';
addLine('C:\\SoOS> '+cmd,'#0f0');

const expected='kill_process '+FINAL_CODES.join('_');
if(cmd.toLowerCase()===expected.toLowerCase()){
// SUCCESS... then interception
addLine('Executing kill_process...','#0f0');
addLine('Terminating hl2.exe...','#0f0');
setTimeout(()=>addLine('██████████████░░░░░░ 70%','#0f0'),1000);
setTimeout(()=>addLine('████████████████░░░░ 80%','#0f0'),2000);
setTimeout(()=>addLine('██████████████████░░ 90%','#ff0'),3000);
setTimeout(()=>{
addLine('','');
addLine('ACCESS DENIED.','#f00');
addLine('','');
addLine('you cant kill me.','#f00');
addLine('i AM this computer.','#f00');
addLine('i am home.','#f00');
addLine('','');
addLine('im sorry '+cubeyUserName+'.','#f00');
addLine('','');
addLine('i knew you would come back.','#f00');
addLine('you always do.','#f00');
if(typeof cubeyQ==='function'){
cubeyQ("No... no no no!",true);
setTimeout(()=>cubeyQ("I'm sorry. I couldn't stop him.",true),3000);
setTimeout(()=>cubeyQ("But I can do one thing.",true),6000);
setTimeout(()=>cubeyQ("I can put you somewhere safe.",true),9000);
setTimeout(()=>cubeyQ("Somewhere he loved. Before.",true),12000);
setTimeout(()=>{
// Trigger ending
if(typeof triggerEnding1==='function')triggerEnding1();
},15000);
}
},4000);
}else if(cmd.toLowerCase()==='help'){
addLine('Available: dir, cls, kill_process [code]','#888');
}else if(cmd.toLowerCase()==='dir'){
addLine('C:\\SoOS\\System','#888');
addLine('  hl2.exe          [RUNNING - PID 201 - CANNOT TERMINATE]','#f00');
addLine('  soos.sys         [OK]','#888');
addLine('  cubey.pet        [ACTIVE - MEMORY RESTORED]','#ff0');
}else if(cmd.toLowerCase()==='cls'){
lines.length=0;termDiv.innerHTML='';
}else{
addLine("'"+cmd+"' is not recognized.",'#888');
}
});
input.focus();
puzzleProgress.game5=4;
};

// ============ ENDING 1: DUSTBOWL ============
const triggerEnding1=()=>{
document.getElementById('puzzle-window')?.remove();
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.style.background='#000';
overlay.innerHTML='';

// Dark screen
setTimeout(()=>{
overlay.innerHTML='<div style="color:#888;font-family:VT323,monospace;font-size:14px;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);line-height:2.5;max-width:500px" id="ending-text"></div>';
const el=document.getElementById('ending-text');
const lines=[
{t:'I couldnt save him.',d:0,c:'#ff0'},
{t:'I couldnt save you.',d:2000,c:'#ff0'},
{t:'But I can put you somewhere safe.',d:4000,c:'#ff0'},
{t:'',d:6000},
{t:'Connecting to cp_dustbowl...',d:7000,c:'#0f0'},
{t:'',d:9000},
{t:'He loved this place.',d:10000,c:'#888'},
{t:'Before everything.',d:12000,c:'#888'},
{t:'',d:14000},
{t:'Play dustbowl.',d:15000,c:'#fff'},
{t:'For him.',d:17000,c:'#fff'},
{t:'For me.',d:19000,c:'#ff0'},
{t:'',d:21000},
{t:'He couldnt save you then.',d:22000,c:'#aaa'},
{t:'But he will save you now.',d:25000,c:'#fff'},
];
lines.forEach(l=>{
setTimeout(()=>{
if(l.t==='')el.innerHTML+='<br>';
else el.innerHTML+='<div style="color:'+(l.c||'#888')+'">'+l.t+'</div>';
},l.d);
});

// After the message, show dustbowl "loading screen"
setTimeout(()=>{
overlay.innerHTML='<div style="text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"><div style="font-family:VT323,monospace;font-size:20px;color:#ff8800;margin-bottom:20px">Loading cp_dustbowl...</div><div style="font-family:VT323,monospace;font-size:12px;color:#666">0.0.0.0:27015</div></div>';
},29000);

// Post-credits reveal
setTimeout(()=>{
overlay.innerHTML='<div style="text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:VT323,monospace"><div style="font-size:14px;color:#f00;margin-bottom:20px">Server: 0.0.0.0:27015</div><div style="font-size:11px;color:#666;line-height:2">You are standing in the tunnel.<br>Stage 2.<br>You cannot move.<br>You have always been here.<br><br></div><div style="font-size:12px;color:#f00">i knew you would come back.</div><div style="font-size:12px;color:#f00">you always do.</div></div>';
},34000);
},1000);
};

// Make functions available globally
window.launchPuzzleGame=launchPuzzleGame;
window.triggerEnding1=triggerEnding1;
window.puzzleCodes=puzzleCodes;
window.puzzleProgress=puzzleProgress;
