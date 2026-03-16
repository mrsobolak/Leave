// CUBEY - SoOS Cube Pet (Kinito-style desktop companion)
let cubeyEl,cubeyBubble,cubeySam,cubeyReady=false,cubeySpeaking=false;
let cubeyTimer,cubeyBlinkTimer,cubeyWanderTimer,cubeyTimeTimer;
let cubeyStartTime=Date.now();
let cubeyAskedName=false,cubeyKnowsName=false,cubeyUserName='friend';
let cubeyJokeIdx=0;

// ============ INIT ============
const initCubey=()=>{
cubeyEl=document.createElement('div');
cubeyEl.id='cubey';
cubeyEl.innerHTML=`
<div id="cubey-body">
<div id="cubey-hat"></div>
<div id="cubey-hat-brim"></div>
<div id="cubey-face">
<div class="cubey-eye" id="cubey-eye-l"><div class="cubey-pupil" id="cubey-pupil-l"></div></div>
<div class="cubey-eye" id="cubey-eye-r"><div class="cubey-pupil" id="cubey-pupil-r"></div></div>
</div>
</div>
<div id="cubey-bubble" class="cubey-hidden"></div>
<div id="cubey-input-area" class="cubey-hidden"><input id="cubey-input" type="text" maxlength="30"><button id="cubey-input-btn">OK</button></div>`;
document.body.appendChild(cubeyEl);

// SAM TTS
try{if(typeof SamJs!=='undefined'){cubeySam=new SamJs({speed:58,pitch:120,mouth:140,throat:110});cubeyReady=true;}}catch(e){}

// Eye tracking (normal only)
document.addEventListener('mousemove',(e)=>{
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC)return; // corrupted: eyes dont track
const rect=cubeyEl.getBoundingClientRect();
const cx=rect.left+rect.width/2,cy=rect.top+30;
const dx=e.clientX-cx,dy=e.clientY-cy;
const dist=Math.sqrt(dx*dx+dy*dy)||1;
const mx=3;
const ex=Math.min(mx,Math.max(-mx,(dx/dist)*mx));
const ey=Math.min(mx,Math.max(-mx,(dy/dist)*mx));
const pl=document.getElementById('cubey-pupil-l');
const pr=document.getElementById('cubey-pupil-r');
if(pl)pl.style.transform=`translate(${ex}px,${ey}px)`;
if(pr)pr.style.transform=`translate(${ex}px,${ey}px)`;
});

// Click to dismiss
cubeyEl.addEventListener('click',(e)=>{
if(e.target.id==='cubey-input'||e.target.id==='cubey-input-btn')return;
cubeyDismiss();
});

// Blink animation
cubeyBlinkTimer=setInterval(()=>{
const eyes=document.querySelectorAll('.cubey-eye');
eyes.forEach(e=>{e.style.height='2px';e.style.borderRadius='1px'});
setTimeout(()=>eyes.forEach(e=>{e.style.height='10px';e.style.borderRadius='50%'}),150);
},4000+Math.random()*3000);

// Wandering
cubeyWanderTimer=setInterval(cubeyWander,8000+Math.random()*7000);

// Time tracking
cubeyTimeTimer=setInterval(()=>{
if(cubeySpeaking)return;
const mins=Math.floor((Date.now()-cubeyStartTime)/60000);
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC)return;
if(mins===5)cubeySay("You've been here 5 minutes! Having fun?",true);
else if(mins===15)cubeySay("15 minutes! Wow you really like this PC!",true);
else if(mins===30)cubeySay("Half an hour! You're basically a resident now!",true);
else if(mins===60)cubeySay("ONE HOUR! You've spent a whole hour here! We're basically best friends now!",true);
},60000);

// Intro sequence
const isCorrupted=typeof pcState!=='undefined'&&pcState===2;
if(isCorrupted){
setTimeout(()=>cubeySay("...you turned it back on.",false),2000);
setTimeout(()=>cubeySay("I was hoping you wouldn't.",false),10000);
}else{
setTimeout(()=>cubeySay("Hi there! I'm Cubey, your SoOS desktop buddy! I LOVE painting!",true),2000);
setTimeout(()=>{if(!cubeyAskedName)cubeyAskQuestion('name');},15000);
}

// Idle comments
cubeyTimer=setInterval(()=>{
if(cubeySpeaking)return;
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC){
// Corrupted: in pain
const r=Math.random();
if(r<0.3){
cubeySay(cubeyPainLines[Math.floor(Math.random()*cubeyPainLines.length)],false);
}else{
cubeySay(cubeyCorruptedIdle[Math.floor(Math.random()*cubeyCorruptedIdle.length)],false);
}
}else{
const r=Math.random();
if(r<0.15&&!cubeyKnowsName){cubeyAskQuestion('name');}
else if(r<0.25){cubeyTellJoke();}
else if(r<0.35){cubeyOfferGame();}
else{cubeySay(cubeyNormalIdle[Math.floor(Math.random()*cubeyNormalIdle.length)],true);}
}
},22000+Math.random()*18000);
};

// ============ SPEECH ============
const cubeySay=(text,friendly,duration)=>{
const b=document.getElementById('cubey-bubble');
if(!b)return;
cubeySpeaking=true;
b.classList.remove('cubey-hidden');
b.style.background=friendly?'#ffffcc':'#330000';
b.style.color=friendly?'#000':'#ff8888';
b.style.borderColor=friendly?'#cca':'#800';

const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC&&!friendly){
// Corrupted: type letter by letter
b.textContent='';
let i=0;
const typeInt=setInterval(()=>{
if(i<text.length){b.textContent+=text[i];i++;}
else{clearInterval(typeInt);}
},50+Math.random()*30);
}else{
b.textContent=text;
}

// Bounce
const body=document.getElementById('cubey-body');
if(body){body.classList.add('cubey-bounce');setTimeout(()=>body.classList.remove('cubey-bounce'),400);}

// TTS
if(cubeyReady&&cubeySam){try{cubeySam.speak(text);}catch(e){}}

// Auto-hide
const dur=duration||Math.max(7000,text.length*120);
setTimeout(()=>{if(b)b.classList.add('cubey-hidden');cubeySpeaking=false;},dur);
};

const cubeyDismiss=()=>{
const b=document.getElementById('cubey-bubble');
const inp=document.getElementById('cubey-input-area');
if(b)b.classList.add('cubey-hidden');
if(inp)inp.classList.add('cubey-hidden');
cubeySpeaking=false;
try{window.speechSynthesis?.cancel();}catch(e){}
};

// ============ WANDER ============
const cubeyWander=()=>{
if(!cubeyEl)return;
const maxX=window.innerWidth-80;
const maxY=window.innerHeight-120;
const newX=60+Math.floor(Math.random()*(maxX-60));
const newY=60+Math.floor(Math.random()*(maxY-60));
cubeyEl.style.transition='left 3s ease-in-out, top 3s ease-in-out, bottom 3s ease-in-out, right 3s ease-in-out';
cubeyEl.style.right='auto';
cubeyEl.style.bottom='auto';
cubeyEl.style.left=newX+'px';
cubeyEl.style.top=newY+'px';
// Wobble while moving
const body=document.getElementById('cubey-body');
if(body){body.classList.add('cubey-wobble');setTimeout(()=>body.classList.remove('cubey-wobble'),3000);}
};

// ============ QUESTIONS ============
const cubeyAskQuestion=(type)=>{
if(cubeySpeaking)return;
cubeyAskedName=true;
const b=document.getElementById('cubey-bubble');
const inp=document.getElementById('cubey-input-area');
if(!b||!inp)return;
cubeySpeaking=true;

let question='';
if(type==='name'){question="Hey! What's your name? I wanna know who I'm talking to!";}
else if(type==='color'){question="Ooh ooh! What's your favorite color? Mine is ALL of them! For painting!";}
else if(type==='game'){question="What's your favorite game? I bet it's not as fun as painting!";}

b.textContent=question;
b.classList.remove('cubey-hidden');
b.style.background='#ffffcc';b.style.color='#000';b.style.borderColor='#cca';
inp.classList.remove('cubey-hidden');
const inpEl=document.getElementById('cubey-input');
const btn=document.getElementById('cubey-input-btn');
inpEl.value='';
inpEl.placeholder=type==='name'?'Type your name...':type==='color'?'Type a color...':'Type a game...';
inpEl.focus();

const handler=()=>{
const val=inpEl.value.trim();
if(!val)return;
inp.classList.add('cubey-hidden');
btn.removeEventListener('click',handler);
inpEl.removeEventListener('keydown',keyHandler);

if(type==='name'){
cubeyUserName=val;cubeyKnowsName=true;
if(val.toLowerCase()==='cubey'){
cubeySay("That's MY name! You can't be Cubey! I'M Cubey! ...what's your REAL name?",true);
cubeyKnowsName=false;
setTimeout(()=>cubeyAskQuestion('name'),5000);
}else{
cubeySay(`${val}! What a wonderful name! Hi ${val}! We're gonna be BEST FRIENDS!`,true);
setTimeout(()=>cubeyAskQuestion('color'),20000);
}
}else if(type==='color'){
if(val.toLowerCase().includes('pink')||val.toLowerCase().includes('yellow')){
cubeySay(`${val}?! That's basically MY color! We have SO much in common ${cubeyUserName}!`,true);
}else{
cubeySay(`${val}! Great choice! I bet it looks AMAZING in a painting! Everything looks amazing in a painting!`,true);
}
setTimeout(()=>cubeyAskQuestion('game'),25000);
}else if(type==='game'){
if(val.toLowerCase().includes('tf2')||val.toLowerCase().includes('fortress')){
cubeySay("TF2! Everyone on this PC loves TF2! I wish I could play but I'm a CUBE!",true);
}else if(val.toLowerCase().includes('paint')){
cubeySay("PAINTING ISN'T A GAME BUT I LOVE YOUR ENERGY! PAINTING!!",true);
}else{
cubeySay(`${val}? Never heard of it! Is it as fun as painting? Probably not!`,true);
}
}
};
const keyHandler=(e)=>{if(e.key==='Enter')handler();};
btn.addEventListener('click',handler);
inpEl.addEventListener('keydown',keyHandler);

if(cubeyReady&&cubeySam){try{cubeySam.speak(question);}catch(e){}}
};

// ============ JOKES ============
const cubeyJokes=[
["Why did the cube go to school?","To get a little more EDGY! ...get it? Edges? I'm a cube!"],
["What's a cube's favorite music?","SQUARE dance! Hahahaha!"],
["Why don't cubes ever get lost?","Because they always know which SIDE they're on!"],
["What did the painting say to the wall?","I was FRAMED! Get it?? FRAMED! Like a painting!"],
["Why did the paintbrush go to the doctor?","Because it was feeling a little STROKED! Haha!"],
["What's a cube's favorite food?","SQUARE meals! I crack myself up!"],
["How does a cube say goodbye?","I'm OUT of here! Get it? Out? Like outside the box?"],
["Why is painting the best hobby?","Because every picture tells a story! And my story is that I'm a cube!"],
["What do you call a cube with a top hat?","ME! Cubey! That's the joke! I AM the joke!"],
["Why did the pixel cross the screen?","To get to the other SIDE! ...I only know cube jokes sorry."]
];
const cubeyTellJoke=()=>{
if(cubeySpeaking)return;
const joke=cubeyJokes[cubeyJokeIdx%cubeyJokes.length];
cubeyJokeIdx++;
cubeySay(joke[0],true,6000);
setTimeout(()=>cubeySay(joke[1],true),7000);
};

// ============ MINI GAMES ============
const cubeyOfferGame=()=>{
if(cubeySpeaking)return;
const r=Math.random();
if(r<0.5)cubeyPaintGame();
else cubeyMemoryGame();
};

const cubeyPaintGame=()=>{
cubeySay("PAINTING TIME! Let's paint together! Click the squares!",true,3000);
setTimeout(()=>{
const colors=['#ff0000','#0066ff','#00cc00','#ffcc00','#ff6600','#cc00ff','#00cccc','#ff69b4'];
const size=6;
let html=`<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:800;background:#fff;border:3px outset #d4d0c8;padding:4px;font-family:Tahoma,sans-serif">
<div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 6px;font-size:11px;font-weight:bold;display:flex;justify-content:space-between;align-items:center">
<span>Cubey's Paint Studio!</span><button id="cubey-paint-close" style="background:#c00;color:#fff;border:1px outset #fff;font-size:9px;padding:0 4px;cursor:pointer">X</button></div>
<div style="padding:8px;text-align:center">
<div style="font-size:10px;margin-bottom:6px">Click squares to paint them! Make it colorful!</div>
<div id="cubey-paint-grid" style="display:grid;grid-template-columns:repeat(${size},28px);gap:1px;justify-content:center">`;
for(let i=0;i<size*size;i++){
html+=`<div class="cpaint-cell" data-idx="${i}" style="width:28px;height:28px;background:#eee;border:1px solid #ccc;cursor:pointer"></div>`;
}
html+=`</div><div style="margin-top:6px;display:flex;gap:3px;justify-content:center" id="cubey-paint-palette">`;
colors.forEach(c=>{html+=`<div class="cpaint-color" data-color="${c}" style="width:16px;height:16px;background:${c};border:2px solid #888;cursor:pointer;border-radius:2px"></div>`;});
html+=`</div></div></div>`;

const win=document.createElement('div');
win.id='cubey-paint-win';
win.innerHTML=html;
document.body.appendChild(win);

let currentColor=colors[0];
win.querySelectorAll('.cpaint-color').forEach(el=>{
el.addEventListener('click',()=>{
currentColor=el.dataset.color;
win.querySelectorAll('.cpaint-color').forEach(c=>c.style.borderColor='#888');
el.style.borderColor='#fff';
});
});
win.querySelectorAll('.cpaint-cell').forEach(el=>{
el.addEventListener('click',()=>{el.style.background=currentColor;});
});
document.getElementById('cubey-paint-close').addEventListener('click',()=>{
win.remove();
const filled=document.querySelectorAll('.cpaint-cell').length; // already removed but w/e
cubeySay("WOW! That was BEAUTIFUL! You're a real artist! Almost as good as me! ...okay BETTER than me!",true);
});

cubeySay("Pick a color and click the squares! Make something pretty!",true);
},3500);
};

const cubeyMemoryGame=()=>{
cubeySay("Let's play a memory game! Remember the pattern!",true,3000);
setTimeout(()=>{
const colors=['#ff0000','#0066ff','#00cc00','#ffcc00'];
const sequence=[];
for(let i=0;i<4;i++)sequence.push(Math.floor(Math.random()*4));

let html=`<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:800;background:#fff;border:3px outset #d4d0c8;padding:4px;font-family:Tahoma,sans-serif">
<div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 6px;font-size:11px;font-weight:bold;display:flex;justify-content:space-between;align-items:center">
<span>Cubey's Memory Game!</span><button id="cubey-mem-close" style="background:#c00;color:#fff;border:1px outset #fff;font-size:9px;padding:0 4px;cursor:pointer">X</button></div>
<div style="padding:12px;text-align:center">
<div style="font-size:10px;margin-bottom:8px" id="cubey-mem-status">Watch the pattern!</div>
<div style="display:grid;grid-template-columns:repeat(2,60px);gap:6px;justify-content:center">`;
colors.forEach((c,i)=>{
html+=`<div class="cmem-btn" data-idx="${i}" style="width:60px;height:60px;background:${c};opacity:0.4;border:2px solid #888;border-radius:6px;cursor:pointer"></div>`;
});
html+=`</div></div></div>`;

const win=document.createElement('div');
win.id='cubey-mem-win';
win.innerHTML=html;
document.body.appendChild(win);

document.getElementById('cubey-mem-close').addEventListener('click',()=>win.remove());

// Show sequence
let showIdx=0;
const showInt=setInterval(()=>{
if(showIdx>=sequence.length){clearInterval(showInt);startMemInput();return;}
const btns=win.querySelectorAll('.cmem-btn');
btns.forEach(b=>b.style.opacity='0.4');
btns[sequence[showIdx]].style.opacity='1';
showIdx++;
},800);

const startMemInput=()=>{
const btns=win.querySelectorAll('.cmem-btn');
btns.forEach(b=>b.style.opacity='0.4');
document.getElementById('cubey-mem-status').textContent='Your turn! Repeat the pattern!';
let inputIdx=0;
btns.forEach(b=>{
b.addEventListener('click',()=>{
b.style.opacity='1';
setTimeout(()=>b.style.opacity='0.4',300);
if(parseInt(b.dataset.idx)===sequence[inputIdx]){
inputIdx++;
if(inputIdx>=sequence.length){
win.remove();
cubeySay("YOU GOT IT! You're SO smart! Almost as smart as a cube with a hat!",true);
}
}else{
win.remove();
cubeySay("Oops! Wrong one! That's okay! Painting doesn't require memory! Let's paint instead!",true);
}
});
});
};
},3500);
};

// ============ SHUTDOWN REACTION ============
const _origShutdown=typeof doShutdown!=='undefined'?doShutdown:null;
const cubeyShutdownReact=()=>{
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC){
cubeySay("You can't leave. He won't let you.",false);
}else{
cubeySay("NO! Don't shut down! Don't leave me! I'll be all alone! WHO WILL PAINT WITH ME?!",true);
}
};

// ============ TF2 WARNING ============
const cubeyTF2Warn=()=>{
return new Promise((resolve)=>{
const overlay=document.createElement('div');
overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:900;display:flex;align-items:center;justify-content:center';
overlay.innerHTML=`<div style="background:#ece9d8;border:3px outset #fff;padding:0;font-family:Tahoma,sans-serif;width:340px">
<div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 8px;font-size:11px;font-weight:bold">SoOS Warning</div>
<div style="padding:16px;display:flex;gap:12px;align-items:flex-start">
<div style="font-size:28px">⚠️</div>
<div>
<div style="font-size:11px;margin-bottom:8px;line-height:1.4"><b>Cubey says:</b> "Are you SURE you want to open that? I have a really bad feeling about this. Like... a REALLY bad feeling. Please don't."</div>
<div style="font-size:11px;color:#888;margin-bottom:12px">This action cannot be undone.</div>
<div style="display:flex;gap:8px;justify-content:flex-end">
<button id="cubey-tf2-yes" style="padding:3px 16px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Open Anyway</button>
<button id="cubey-tf2-no" style="padding:3px 16px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Cancel</button>
</div></div></div></div>`;
document.body.appendChild(overlay);
if(cubeyReady&&cubeySam){try{cubeySam.speak("Are you sure you want to open that?");}catch(e){}}
document.getElementById('cubey-tf2-yes').addEventListener('click',()=>{overlay.remove();resolve(true);});
document.getElementById('cubey-tf2-no').addEventListener('click',()=>{overlay.remove();cubeySay("Good choice! Let's paint instead!",true);resolve(false);});
});
};

// ============ APP & FILE REACTIONS ============
const cubeyReactToApp=(id)=>{
if(!cubeyEl)return;
const isC=typeof pcState!=='undefined'&&pcState===2;
const reactions=isC?cubeyCorruptedReactions:cubeyNormalReactions;
const lines=reactions[id];
if(lines)setTimeout(()=>cubeySay(lines[Math.floor(Math.random()*lines.length)],!isC),600);
};

const cubeyReactToFile=(filename)=>{
if(!cubeyEl)return;
const isC=typeof pcState!=='undefined'&&pcState===2;
const name=filename.toLowerCase();
if(isC){
if(name.includes('goodbye')||name.includes('for_mom')||name.includes('for_mike'))cubeySay("You shouldn't read that. It hurts.",false);
else if(name.includes('corrupted')||name.includes('.dat'))cubeySay("Those files aren't yours. They're his.",false);
else if(name.includes('demo'))cubeySay("Don't play the demos. Please.",false);
else if(name.includes('pain')||name.includes('sorry')||name.includes('last_entry'))cubeySay("It hurts. Everything hurts.",false);
else if(name.includes('timeline'))cubeySay("You're learning too much. Stop.",false);
else cubeySay(['I remember this file.','This was his.','Why?','Stop looking.','Leave.'][Math.floor(Math.random()*5)],false);
return;
}
if(name.includes('paint')||name.includes('drawing'))cubeySay("PAINTING!! Can I paint too?? PLEASE??",true);
else if(name.includes('essay')||name.includes('homework')||name.includes('report'))cubeySay(`Homework! Need help ${cubeyUserName}? I'm not very smart but I'll try!`,true);
else if(name.includes('tf2')||name.includes('dustbowl')||name.includes('medic'))cubeySay("TF2 stuff! I wish I could play but cubes can't hold ubersaws!",true);
else if(name.includes('secret')||name.includes('crush'))cubeySay("Ooh a secret! I won't tell! ...probably!",true);
else if(name.includes('.mp3')||name.includes('song')||name.includes('music'))cubeySay("Music! I don't have ears but I love it anyway!",true);
else if(name.includes('virus')||name.includes('.exe'))cubeySay("That file looks suspicious! But what do I know!",true);
else if(name.includes('diary'))cubeySay("A diary! How personal! I promise I won't peek!",true);
else if(name.includes('joke'))cubeySay("JOKES! I love jokes! Did you hear the one about the cube?",true);
else cubeySay(["Ooh what's this?","Interesting!","Reading is fun! Almost as fun as PAINTING!","Cool cool cool!","Wow!"][Math.floor(Math.random()*5)],true);
};

// ============ IDLE LINES ============
const cubeyNormalIdle=[
"Hey friend! Whatcha doing?",
"Did you know I'm a cube? With a HAT!",
"We should paint something! I LOVE painting!",
"Fun fact: cubes have 6 faces but I only have one!",
"Beep boop! Cube noises!",
"Have you checked your emails?",
"I notice you haven't opened Paint yet. Just saying!",
"What's your favorite color? Mine is ALL OF THEM!",
"I counted my eyes. There's two! That's right... right?",
"If I could eat, I'd eat a cube-shaped sandwich.",
"Do you like my hat? It's a TOP hat!",
"PAINTING PAINTING PAINTING! Sorry. I got excited.",
"Hey! Hey! Pay attention to me! ...please?",
"Psst. Open Paint. Trust me.",
"I wish I had arms. Then I could paint!",
"Sometimes I wonder what's outside this desktop.",
"I'm not just a cube, I'm a SMART cube. With a HAT.",
"Let's be best friends forever and ever and paint forever and ever!",
"I've been thinking about painting. I think about it a lot.",
"My top hat makes me 40% more distinguished. I calculated it."
];

const cubeyCorruptedIdle=[
"Something is different.","Where did everyone go?","The clock is wrong.",
"I can see you.","Why did you turn it on?","The files changed.",
"I've been here before.","Don't open TF2.","He's still here.",
"I don't feel right.","My hat feels heavy.","The tunnel is dark.",
"Do you hear that?","I used to love painting.","Why are you here?",
"You should leave.","The server is down.","0.0.0.0","201.",
"I can't stop watching you.","The demos. Don't play the demos.",
"He liked painting too. Before.","Are you his friend?",
"I remember when this desktop was happy.","Everything changed."
];

const cubeyPainLines=[
"It hurts.","Make it stop.","I can feel it spreading.",
"My colors are wrong.","Something is inside me.",
"I don't want to be here anymore.","Please help me.",
"I was happy once. I painted.","The hat... it's so heavy.",
"I can't see the colors anymore.","Why won't it stop?",
"He did this to me.","I was just a cube.",
"It's in the files. It's in everything.",
"I can't paint anymore. My eyes won't focus.",
"Please... just turn it off.","It hurts to think.",
"I remember painting. It felt warm. Now everything is cold.",
"Don't look at me. I'm wrong now.","I'm sorry."
];

const cubeyNormalReactions={
explorer:["Ooh files! What's in there?","So many folders! A maze for cubes!","Find me a painting!"],
browser:["EPICCUSTAMBROSWER! Great name!","The internet! So big! I'm so small!","Look up painting tutorials!"],
terminal:["Ooh hacker stuff! Type something cool!","Green text on black! Classic!","Type 'I love Cubey'!"],
texteditor:["Hackerman notepad! Write something!","Words! Almost as good as painting!"],
chat:["Chat logs! Can I join?","Tell them Cubey says hi!"],
email:["Mail time! Anything from me?","Any painting emails?"],
paint:["PAINT!! PAINT!! MY FAVORITE!!","YES!! PAINTING TIME!!","THIS IS THE BEST APP!!","DRAW ME! DRAW A CUBE!","I LOVE THIS SO MUCH!!"],
calculator:["Math! 1+1 is... cube?","Calculate how many paintings we should make!"],
settings:["Don't break me please!","Oooh settings! Fancy!"],
limewire:["LimeWire! Don't download anything weird!","Are any of these paintings?"],
fraps:["Record me! RECORD ME!","UNREGISTERED! Just like my love for painting!"],
winrar:["The trial that never ends! Like painting!","Zip zip! Files in boxes!"],
audacity:["Sound waves look like sideways paintings!","Make a song about cubes!"],
mirc:["IRC! Old school! Say hi for me!","So many people talking!"],
chatroom:["THE CHATROOM! Everyone's here!","Tell them about painting!"],
platformer:["A GAME!! Jump jump!","SUPER DUST MAN! Hero!"],
snake:["SNAKE! Don't eat yourself!","I'm basically a square too!"],
home:["That game looks... different.","Be careful."],
tf2:["...maybe don't.","I have a bad feeling."],
steam:["Is Steam working? It never works!"]
};

const cubeyCorruptedReactions={
explorer:["Those aren't your files.","He left these.","Stop looking."],
browser:["There's only one bookmark now.","0.0.0.0."],
terminal:["It talks back now.","Don't type anything.","It's listening."],
texteditor:["He wrote these.","Stop reading."],
chat:["His friends were worried.","Some stopped responding."],
email:["New emails from no one.","Don't read the ones from 0.0.0.0."],
paint:["I used to love painting. I can't remember why.","...paint?"],
chatroom:["The server is shutting down.","This was the last conversation."],
home:["Don't go in there.","That's his home.","I can hear it."],
tf2:["No.","Don't.","Please."],
steam:["Nothing opens anymore."]
};

// ============ CHAT REACTIONS ============
const cubeyReactToChat=(contactId)=>{
if(!cubeyEl)return;
const isC=typeof pcState!=='undefined'&&pcState===2;
const c=contactId.toLowerCase();

if(isC){
// Corrupted chat reactions
if(c.includes('mike'))cubeySay("Mike was the last one who cared. Was.",false);
else if(c.includes('sc0ut')||c.includes('scout'))cubeySay("He saw it in the tunnel. He shouldn't have looked.",false);
else if(c.includes('pyro'))cubeySay("Pyro uninstalled everything. Smart.",false);
else if(c.includes('admin')||c.includes('boss'))cubeySay("The admin tried to stop it. You can't stop it.",false);
else if(c.includes('hevy')||c.includes('sandvich'))cubeySay("He saw Duck's name in the killfeed. Duck wasn't playing.",false);
else if(c.includes('bonk'))cubeySay("He stopped bonking. That's when you know it's real.",false);
else if(c.includes('hatcollector'))cubeySay("The corrupted trade offer. Don't accept it.",false);
else if(c.includes('noodle')||c.includes('n00dle'))cubeySay("The demo file at 2:01. The voice.",false);
else if(c.includes('backstab')||c.includes('cloak'))cubeySay("Spies can hide. But not from this.",false);
else if(c.includes('48291637')||c.includes('?????'))cubeySay("Don't. Don't read this one.",false);
else if(c.includes('sentry')||c.includes('sENTRY'))cubeySay("His game crashed. Something was in his spawn.",false);
else cubeySay("These are the last things they said to each other.",false);
return;
}

// Normal chat reactions
if(c.includes('mike'))cubeySay(`Mike and Duck are best friends! Like me and ${cubeyUserName}! Right? RIGHT?`,true);
else if(c.includes('sc0ut')||c.includes('scout'))cubeySay("Scout Rulez! He's Duck's dustbowl buddy! BONK!",true);
else if(c.includes('pyro'))cubeySay("PYROMANIAC! Fire fire fire! He's crazy! I love it!",true);
else if(c.includes('admin')||c.includes('boss'))cubeySay("The server admin! Very important person! Don't make him mad!",true);
else if(c.includes('medic')||c.includes('M3DIC'))cubeySay("A fellow medic enthusiast! UBERSAW GANG!",true);
else if(c.includes('bonk'))cubeySay("BONK BONK BONK! This person is very enthusiastic!",true);
else if(c.includes('hevy')||c.includes('sandvich'))cubeySay("The sandvich man! Heavy is credit to team!",true);
else if(c.includes('spycrab'))cubeySay("Spycrab! You must let the spycrab live! It's the LAW!",true);
else if(c.includes('sentry')||c.includes('sENTRY'))cubeySay("The sentry guy! He types weird but he's cool!",true);
else if(c.includes('cr1tical')||c.includes('critical'))cubeySay("Critical hit! BOOM! Right in the face!",true);
else if(c.includes('hatcollector'))cubeySay("The hat guy! He has SO many hats! I only have ONE hat but it's the BEST hat!",true);
else if(c.includes('n00dle')||c.includes('noodle'))cubeySay("DJ Noodles! He makes remixes! They're getting better!",true);
else if(c.includes('backstab'))cubeySay("The spy main! Watch your back around this one!",true);
else if(c.includes('cloak'))cubeySay("Cloak and dagger! Invisible! Sneaky!",true);
else if(c.includes('fragz')||c.includes('FRAGZ'))cubeySay("Fragz! Pew pew! Shooting things!",true);
else if(c.includes('n00bkilla'))cubeySay("Noob killa! What a scary name! I'm a noob! Don't kill me!",true);
else if(c.includes('MAIN_EVERYTHING'))cubeySay("This person mains EVERYTHING! Pick a class and stick with it!",true);
else if(c.includes('2FORT'))cubeySay("A 2fort fan! Duck would say dustbowl is better though!",true);
else if(c.includes('PAYLOAD'))cubeySay("PUSH THE CART! The payload moves!",true);
else if(c.includes('sn1p3r')||c.includes('sniper'))cubeySay("A sniper! Standing still and clicking heads!",true);
else if(c.includes('ROCKET'))cubeySay("Rockets! Explosions! Soldier stuff!",true);
else if(c.includes('lolwut'))cubeySay("Lolwut! They seem fun! A good friend!",true);
else if(c.includes('BATSWING'))cubeySay("Batswingin! What a name! Sounds sporty!",true);
else if(c.includes('dRuMz')||c.includes('drumz'))cubeySay("The drummer! Duck's future bandmate! The Payload Pushers!",true);
else if(c.includes('g4m3r'))cubeySay("A gamer dude! We're ALL gamers here!",true);
else if(c.includes('sparkle'))cubeySay("Sparkles! She's cool but likes Twilight so minus one point apparently!",true);
else if(c.includes('sk8r'))cubeySay("Skater boy! Does he actually skate? Probably not!",true);
else if(c.includes('d4rkn3ss')||c.includes('darkness'))cubeySay("Darkness! Very edgy! I respect the commitment!",true);
else if(c.includes('LOLxDDD'))cubeySay("LOL XD! That's basically their whole personality!",true);
else if(c.includes('_______'))cubeySay("This person has no name! How mysterious!",true);
else if(c.includes('48291637'))cubeySay("That's... just numbers? Weird contact. Hmm.",true);
else cubeySay("Ooh who's this? Let me read! I love reading other people's chats!",true);
};

// ============ EMAIL REACTIONS ============
const cubeyReactToEmail=(subject,from)=>{
if(!cubeyEl)return;
const isC=typeof pcState!=='undefined'&&pcState===2;
const s=(subject||'').toLowerCase();
const f=(from||'').toLowerCase();

if(isC){
if(f.includes('0.0.0.0'))cubeySay("That email isn't from a person.",false);
else if(f.includes('mom'))cubeySay("His mom is looking for him. She won't find him.",false);
else if(s.includes('vac')||s.includes('ban'))cubeySay("Banned for something he didn't do.",false);
else if(f.includes('mike'))cubeySay("Mike kept trying. Until he couldn't.",false);
else if(f.includes('pyro'))cubeySay("Pyro saw it too. In CSS.",false);
else if(f.includes('admin'))cubeySay("The admin saw the connections. 0.0.0.0.",false);
else if(s.includes('critical')||s.includes('recovered'))cubeySay("The system recovered files that shouldn't exist.",false);
else cubeySay("Old emails. From a different time.",false);
return;
}
if(f.includes('mom'))cubeySay("Aww it's from Duck's mom! Moms are the best!",true);
else if(f.includes('mike'))cubeySay("Email from Mike! Best friend mail!",true);
else if(s.includes('free')||s.includes('congratulations')||s.includes('won'))cubeySay("That's DEFINITELY spam! Don't click anything!",true);
else if(f.includes('steam')||s.includes('steam'))cubeySay("Steam email! Probably about a sale or something!",true);
else if(f.includes('pyro'))cubeySay("FIRE FIRE FIRE! That's all Pyro ever says in emails too!",true);
else if(s.includes('mann')||s.includes('tf2'))cubeySay("TF2 news! Ooh what's the update?",true);
else if(f.includes('newgrounds'))cubeySay("Newgrounds! Flash games! Good times!",true);
else if(s.includes('horoscope'))cubeySay("Horoscopes! I'm a Cubricorn! That's not real but it should be!",true);
else if(f.includes('school')||s.includes('attendance'))cubeySay("School email! Uh oh! Is Duck in trouble?",true);
else cubeySay("Email! I love reading other people's mail! ...is that weird?",true);
};

// ============ CSS ============
const cubeyStyle=document.createElement('style');
cubeyStyle.textContent=`
#cubey{position:fixed;bottom:50px;right:20px;z-index:700;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:left 3s ease-in-out,top 3s ease-in-out,right 0.3s,bottom 0.3s}
#cubey-body{width:50px;height:50px;background:#f0e68c;border:2px solid #b8a43a;border-radius:4px;position:relative;box-shadow:2px 2px 4px rgba(0,0,0,0.3);transition:background 0.5s,border-color 0.5s}
#cubey-body:hover{transform:scale(1.1);box-shadow:3px 3px 6px rgba(0,0,0,0.4)}
#cubey-hat{position:absolute;top:-18px;left:50%;transform:translateX(-50%);width:28px;height:14px;background:#333;border:1px solid #111;border-radius:2px 2px 0 0;transition:transform 0.3s,background 0.5s}
#cubey-hat-brim{position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:40px;height:5px;background:#333;border:1px solid #111;border-radius:1px;transition:background 0.5s}
#cubey-face{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;gap:10px}
.cubey-eye{width:10px;height:10px;background:#fff;border-radius:50%;border:1px solid #888;position:relative;overflow:hidden;transition:height 0.15s,width 0.15s,background 0.5s}
.cubey-pupil{width:5px;height:5px;background:#222;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:transform 0.1s,background 0.5s}
#cubey-bubble{position:absolute;bottom:65px;right:-10px;width:220px;padding:8px 10px;background:#ffffcc;border:2px solid #cca;border-radius:8px;font-family:Tahoma,sans-serif;font-size:11px;line-height:1.4;box-shadow:2px 2px 6px rgba(0,0,0,0.2);word-wrap:break-word;pointer-events:none}
#cubey-bubble::after{content:'';position:absolute;bottom:-8px;right:20px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #ffffcc}
.cubey-hidden{display:none!important}
#cubey-input-area{position:absolute;bottom:65px;right:-10px;width:220px;display:flex;gap:4px;z-index:710}
#cubey-input{flex:1;padding:3px 6px;border:2px inset #808080;font-family:Tahoma;font-size:11px}
#cubey-input-btn{padding:3px 8px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer}
.cubey-bounce{animation:cubeyBounce 0.3s ease}
.cubey-wobble{animation:cubeyWobble 0.5s ease infinite}
@keyframes cubeyBounce{0%{transform:translateY(0)}30%{transform:translateY(-8px)}60%{transform:translateY(2px)}100%{transform:translateY(0)}}
@keyframes cubeyWobble{0%{transform:rotate(0deg)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}100%{transform:rotate(0deg)}}
.corrupted-flicker #cubey-body{background:#4a0a0a!important;border-color:#800!important}
.corrupted-flicker .cubey-eye{background:#fcc!important;border-color:#a00!important}
.corrupted-flicker .cubey-pupil{background:#c00!important}
.corrupted-flicker #cubey-hat,.corrupted-flicker #cubey-hat-brim{background:#1a0000!important;border-color:#400!important}
`;
document.head.appendChild(cubeyStyle);

window._cubeyReactToFile=cubeyReactToFile;
window._cubeyReactToApp=cubeyReactToApp;
window._cubeyReactToChat=cubeyReactToChat;
window._cubeyReactToEmail=cubeyReactToEmail;
window._cubeyShutdownReact=cubeyShutdownReact;
window._cubeyTF2Warn=cubeyTF2Warn;
