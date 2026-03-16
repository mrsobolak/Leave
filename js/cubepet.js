// CUBEY - SoOS Cube Pet (Kinito-style desktop companion)
let cubeyEl,cubeySam,cubeyReady=false,cubeySpeaking=false;
let cubeyTimer,cubeyBlinkTimer,cubeyWanderTimer,cubeyTimeTimer;
let cubeyStartTime=Date.now();
let cubeyUserName='friend',cubeyUserColor='',cubeyUserWord='',cubeyUserPower='',cubeyUserFood='',cubeyBestFriend='';
let cubeyIntroStep=0,cubeyIntroDone=false;
let cubeyJokeIdx=0,cubeyStoryIdx=0,cubeySongIdx=0;
let cubeyMood='happy';
let cubeyMoodTimer=null;
let cubeyAppCounts={};
let cubeyClickTimes=[];
let cubeyTF2Attempts=0;
let cubeyQueue=[];
let cubeyProcessing=false;

const initCubey=()=>{
cubeyEl=document.createElement('div');
cubeyEl.id='cubey';
cubeyEl.innerHTML='<div id="cubey-body"><div id="cubey-hat"></div><div id="cubey-hat-brim"></div><div id="cubey-face"><div class="cubey-eye" id="cubey-eye-l"><div class="cubey-pupil" id="cubey-pupil-l"></div></div><div class="cubey-eye" id="cubey-eye-r"><div class="cubey-pupil" id="cubey-pupil-r"></div></div></div></div><div id="cubey-bubble" class="cubey-hidden"></div><div id="cubey-input-area" class="cubey-hidden"><input id="cubey-input" type="text" maxlength="40"><button id="cubey-input-btn">OK</button></div>';
document.body.appendChild(cubeyEl);
try{if(typeof SamJs!=='undefined'){cubeySam=new SamJs({speed:58,pitch:120,mouth:140,throat:110});cubeyReady=true;}}catch(e){}
document.addEventListener('mousemove',(e)=>{
if(typeof pcState!=='undefined'&&pcState===2)return;
const rect=cubeyEl.getBoundingClientRect();
const cx=rect.left+rect.width/2,cy=rect.top+30,dx=e.clientX-cx,dy=e.clientY-cy,dist=Math.sqrt(dx*dx+dy*dy)||1,mx=3;
const pl=document.getElementById('cubey-pupil-l'),pr=document.getElementById('cubey-pupil-r');
if(pl)pl.style.transform='translate('+Math.min(mx,Math.max(-mx,(dx/dist)*mx))+'px,'+Math.min(mx,Math.max(-mx,(dy/dist)*mx))+'px)';
if(pr)pr.style.transform=pl.style.transform;
});
cubeyEl.addEventListener('click',(e)=>{if(e.target.id!=='cubey-input'&&e.target.id!=='cubey-input-btn')cubeyDismiss()});
cubeyBlinkTimer=setInterval(()=>{const eyes=document.querySelectorAll('.cubey-eye');eyes.forEach(e=>{e.style.height='2px';e.style.borderRadius='1px'});setTimeout(()=>eyes.forEach(e=>{e.style.height='10px';e.style.borderRadius='50%'}),150)},4000+Math.random()*3000);
cubeyWanderTimer=setInterval(cubeyWander,8000+Math.random()*7000);
cubeyMoodTimer=setInterval(()=>{cubeyMood=['happy','happy','happy','hyper','sleepy','bored'][Math.floor(Math.random()*6)]},60000);
cubeyTimeTimer=setInterval(()=>{
if(cubeySpeaking||!cubeyIntroDone)return;
const isC=typeof pcState!=='undefined'&&pcState===2;if(isC)return;
const mins=Math.floor((Date.now()-cubeyStartTime)/60000);
if(mins===5)cubeyQ("You've been here 5 minutes! Having fun, "+cubeyUserName+"?",true);
else if(mins===15)cubeyQ("15 minutes! You really like this PC!",true);
else if(mins===30)cubeyQ("Half an hour! We're roommates now!",true);
else if(mins===60)cubeyQ("ONE HOUR! "+cubeyUserName+" we're BEST FRIENDS! OFFICIAL!",true);
},60000);
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC){cubeyIntroDone=true;setTimeout(()=>cubeyQ("...you turned it back on.",false),2000);setTimeout(()=>cubeyQ("I was hoping you wouldn't.",false),12000);startCubeyIdle();}
else{setTimeout(cubeyStartIntro,2500);}
};

// QUEUE
const cubeyQ=(text,friendly,dur)=>{cubeyQueue.push({t:text,f:friendly,d:dur});if(!cubeyProcessing)cubeyNext()};
const cubeyNext=()=>{if(!cubeyQueue.length){cubeyProcessing=false;return}cubeyProcessing=true;const i=cubeyQueue.shift();cubeySayNow(i.t,i.f,i.d)};

const cubeySayNow=(text,friendly,duration)=>{
const b=document.getElementById('cubey-bubble');if(!b)return;
cubeySpeaking=true;b.classList.remove('cubey-hidden');
b.style.background=friendly?'#ffffcc':'#330000';b.style.color=friendly?'#000':'#ff8888';b.style.borderColor=friendly?'#cca':'#800';
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC&&!friendly){
let dt=text;
if(Math.random()<0.2&&text.length>20){const mid=Math.floor(text.length/2);dt=text.slice(0,mid)+['—IT HURTS—','—HELP—','—STOP—','—201—','—NO—'][Math.floor(Math.random()*5)]+text.slice(mid)}
b.textContent='';let i=0;const ti=setInterval(()=>{if(i<dt.length){b.textContent+=dt[i];i++}else clearInterval(ti)},50+Math.random()*30);
}else{b.textContent=text}
const body=document.getElementById('cubey-body');
if(body){body.classList.add('cubey-bounce');setTimeout(()=>body.classList.remove('cubey-bounce'),400)}
if(cubeyReady&&cubeySam){try{cubeySam.speak(text)}catch(e){}}
const dur=duration||Math.max(7000,text.length*120);
setTimeout(()=>{b.classList.add('cubey-hidden');cubeySpeaking=false;setTimeout(cubeyNext,800)},dur);
};

const cubeyDismiss=()=>{const b=document.getElementById('cubey-bubble');const inp=document.getElementById('cubey-input-area');if(b)b.classList.add('cubey-hidden');if(inp)inp.classList.add('cubey-hidden');cubeySpeaking=false;cubeyQueue=[];cubeyProcessing=false};

const cubeyWander=()=>{if(!cubeyEl)return;const mx=window.innerWidth-80,my=window.innerHeight-120;cubeyEl.style.transition='left 3s ease-in-out,top 3s ease-in-out';cubeyEl.style.right='auto';cubeyEl.style.bottom='auto';cubeyEl.style.left=(60+Math.floor(Math.random()*(mx-60)))+'px';cubeyEl.style.top=(60+Math.floor(Math.random()*(my-60)))+'px';const body=document.getElementById('cubey-body');if(body){body.classList.add('cubey-wobble');setTimeout(()=>body.classList.remove('cubey-wobble'),3000)}};

// KINITO INTRO
const cubeyStartIntro=()=>{
cubeyQ("Hi there! I'm Cubey! Your SoOS desktop buddy!",true);
cubeyQ("I'm a cube! With EYES! And a TOP HAT!",true);
cubeyQ("I LOVE painting more than ANYTHING in the whole world!",true);
cubeyQ("But first I wanna get to know YOU! Let's be friends!",true);
setTimeout(()=>cubeyAskIntro('name'),32000);
};

const cubeyAskIntro=(step)=>{
if(cubeySpeaking){setTimeout(()=>cubeyAskIntro(step),2000);return}
const b=document.getElementById('cubey-bubble'),inp=document.getElementById('cubey-input-area');if(!b||!inp)return;
cubeySpeaking=true;
const qs={name:{q:"What's your name? I gotta know who my new best friend is!",ph:'Your name...'},color:{q:"What's your FAVORITE color?",ph:'A color...'},word:{q:"Tell me your favorite word! Any word!",ph:'Any word...'},power:{q:"If you could have ANY superpower what would it be?",ph:'A superpower...'},food:{q:"What's your favorite food?",ph:'A food...'},bestfriend:{q:"Last question! Who is your BEST FRIEND in the whole world?",ph:'Their name...'}};
const s=qs[step];b.textContent=s.q;b.classList.remove('cubey-hidden');b.style.background='#ffffcc';b.style.color='#000';b.style.borderColor='#cca';
inp.classList.remove('cubey-hidden');
const inpEl=document.getElementById('cubey-input'),btn=document.getElementById('cubey-input-btn');
inpEl.value='';inpEl.placeholder=s.ph;inpEl.focus();
if(cubeyReady&&cubeySam){try{cubeySam.speak(s.q)}catch(e){}}
const handler=()=>{
const val=inpEl.value.trim();if(!val)return;inp.classList.add('cubey-hidden');btn.removeEventListener('click',handler);inpEl.removeEventListener('keydown',kh);cubeySpeaking=false;
if(step==='name'){
if(val.toLowerCase()==='cubey'){cubeyQ("That's MY name! You can't be Cubey! Try again!",true);setTimeout(()=>cubeyAskIntro('name'),8000)}
else if(val.toLowerCase()==='beeper'){cubeyQ("BEEPER?! Are you SERIOUS right now?!",true);cubeyQ("I HATE Beeper! Beeper is the WORST!",true);cubeyQ("Beeper thinks he's SO cool with his little 'investigations'!",true);cubeyQ("He's not even a REAL investigator! He just shows up and makes everything WORSE!",true);cubeyQ("Give me your REAL name. NOT Beeper. ANYONE but Beeper.",true);setTimeout(()=>cubeyAskIntro('name'),40000)}
else if(val.toLowerCase()==='mike'||val.toLowerCase()==='mikeloveshalflife'){cubeyQ(val+"... that name... I...",true);cubeyQ("Sorry! I got dizzy for a second! Weird!",true);cubeyQ("ANYWAY hi "+val+"! Great name! Love it!",true);cubeyUserName=val;setTimeout(()=>cubeyAskIntro('color'),25000)}
else if(val.toLowerCase()==='duck'||val.toLowerCase()==='dustbowlduck'||val.toLowerCase()==='thedustbwlduck'||val.toLowerCase()==='thedustbowlduck'){cubeyQ("...",true);cubeyQ("No.",true);cubeyQ("You're not him.",true);cubeyQ("Don't use that name. Please.",true);cubeyQ("Tell me your real name.",true);setTimeout(()=>cubeyAskIntro('name'),35000)}
else{cubeyUserName=val;cubeyQ(val+"! What a WONDERFUL name! Hi "+val+"!",true);setTimeout(()=>cubeyAskIntro('color'),9000)}
}else if(step==='color'){
cubeyUserColor=val;
const cl=val.toLowerCase();
if(cl==='yellow'||cl==='gold')cubeyQ(val+"?! That's MY color! We're TWINS!",true);
else if(cl==='red')cubeyQ(val+"! Like the RED team! But also like... never mind. PAINTING!",true);
else if(cl==='black')cubeyQ(val+"? That's... a dark choice. Literally. I prefer BRIGHT colors! For painting!",true);
else if(cl==='beeper')cubeyQ("BEEPER IS NOT A COLOR. BEEPER IS A MENACE.",true);
else cubeyQ(val+"! Amazing in a painting!",true);
setTimeout(()=>cubeyAskIntro('word'),9000);
}else if(step==='word'){
cubeyUserWord=val;
const wl=val.toLowerCase();
if(wl==='painting'||wl==='paint')cubeyQ("PAINTING?! THATS MY FAVORITE WORD TOO!! WE ARE THE SAME PERSON!! Well... you're a person. I'm a cube.",true);
else if(wl==='help')cubeyQ("'Help'? That's your favorite word? Are you okay?? Do you need help?? I'm here for you!!",true);
else if(wl==='201')cubeyQ("201... why does that number make me feel weird? Like really weird? Probably nothing! Interesting word!",true);
else if(wl==='dustbowl')cubeyQ("Dustbowl! That word makes me feel... warm? Like a memory I cant reach. ANYWAY great word!",true);
else if(wl==='beeper'){cubeyQ("You said Beeper AGAIN?!",true);cubeyQ("Are you TRYING to make me angry?! Because it's WORKING!",true);cubeyQ("Beeper can't even SPELL 'favorite word'!",true);cubeyQ("PICK. A. REAL. WORD.",true);setTimeout(()=>cubeyAskIntro('word'),30000);return}
else cubeyQ("'"+val+"'? Huh! That sure is an interesting word!",true);
setTimeout(()=>cubeyAskIntro('power'),9000);
}else if(step==='power'){
cubeyUserPower=val;
if(val.toLowerCase()==='beeper'){cubeyQ("YOUR SUPERPOWER IS BEEPER?! WHAT DOES THAT EVEN MEAN?!",true);cubeyQ("Is your superpower being ANNOYING?! Because Beeper ALREADY HAS THAT POWER!",true);cubeyQ("I am going to LOSE MY CUBE MIND!",true)}
else cubeyQ(val+"! If I had a superpower it'd be INFINITE PAINTING!",true);
setTimeout(()=>cubeyAskIntro('food'),9000);
}else if(step==='food'){
cubeyUserFood=val;
const fl=val.toLowerCase();
if(fl.includes('hot pocket'))cubeyQ("Hot pockets... why does that make me want to cry? I dont even have tear ducts! Weird! Sounds yummy!",true);
else if(fl.includes('sandvich')||fl.includes('sandwich'))cubeyQ("SANDVICH! Heavy would approve! Om nom nom! I cant eat but OM NOM NOM!",true);
else if(fl.includes('beeper')){cubeyQ("YOU WANT TO EAT BEEPER?!",true);cubeyQ("...actually I'm okay with that.",true);cubeyQ("Wait no that's mean. I don't condone eating Beeper.",true);cubeyQ("But I wouldn't STOP you.",true)}
else cubeyQ(val+"! I can't eat but that sounds delicious!",true);
setTimeout(()=>cubeyAskIntro('bestfriend'),9000);
}else if(step==='bestfriend'){
cubeyBestFriend=val;
if(val.toLowerCase()==='cubey'||val.toLowerCase()==='cube'){cubeyQ("ME?! I'M your best friend?! HAPPIEST DAY OF MY CUBE LIFE!",true);cubeyQ("I KNEW IT! PAINTING PARTY!",true)}
else if(val.toLowerCase()==='beeper'){cubeyQ("...",true);cubeyQ("Beeper.",true);cubeyQ("Your BEST FRIEND is BEEPER.",true);cubeyQ("I have been HERE this WHOLE TIME!",true);cubeyQ("I asked your NAME! I asked your COLOR! I asked your WORD! Your POWER! Your FOOD!",true);cubeyQ("And EVERY TIME you said BEEPER!",true);cubeyQ("I am a CUBE! With a HAT! Who LOVES PAINTING!",true);cubeyQ("And you pick BEEPER over ME?!",true);cubeyQ("You know what? Fine. FINE. Beeper can be your friend.",true);cubeyQ("I hope he asks you to PAINT sometime. He WON'T. Because he doesn't CARE about painting!",true);cubeyQ("...I'm not crying. Cubes can't cry. My eyes are just... leaking.",true)}
else if(val.toLowerCase()==='duck'||val.toLowerCase()==='dustbowlduck'||val.toLowerCase()==='thedustbwlduck'){cubeyQ(val+"...",true);cubeyQ("I... I don't know why but that makes me really sad.",true);cubeyQ("And really happy at the same time? Is that weird?",true);cubeyQ("I feel like I knew someone... never mind! PAINTING!",true)}
else if(val.toLowerCase()==='mike'||val.toLowerCase()==='mikeloveshalflife'){cubeyQ("Mike...",true);cubeyQ("Why does that name hurt?",true);cubeyQ("I don't... I can't...",true);cubeyQ("ANYWAY! Great choice! Mike sounds great! Probably! PAINTING!",true)}
else{cubeyQ(val+"? Oh cool! But WE'RE gonna be even better friends!",true)}
cubeyQ("Now let me tell you about ME!",true);
cubeyQ("I was made in 2007! Same year as this PC! We're twins!",true);
cubeyQ("My favorite things: painting, hats, eyes, and YOU!",true);
cubeyQ("OK "+cubeyUserName+"! Go explore! I'll be RIGHT HERE! Always!",true);
cubeyIntroDone=true;setTimeout(startCubeyIdle,40000);
}};
const kh=(e)=>{if(e.key==='Enter')handler()};
btn.addEventListener('click',handler);inpEl.addEventListener('keydown',kh);
};

// IDLE
const startCubeyIdle=()=>{
cubeyTimer=setInterval(()=>{
if(cubeySpeaking||!cubeyIntroDone)return;
const isC=typeof pcState!=='undefined'&&pcState===2;
if(isC){const r=Math.random();if(r<0.25)cubeyQ(cubeyPainLines[Math.floor(Math.random()*cubeyPainLines.length)],false);else if(r<0.35)cubeyQ(cubeyUserName+"... why did you come here?",false);else cubeyQ(cubeyCorruptedIdle[Math.floor(Math.random()*cubeyCorruptedIdle.length)],false);return}
const r=Math.random();
if(r<0.10)cubeyTellJoke();
else if(r<0.18)cubeyTellStory();
else if(r<0.23)cubeySingSong();
else if(r<0.30)cubeyOfferGame();
else{const lines=cubeyMoodLines[cubeyMood]||cubeyMoodLines.happy;cubeyQ(lines[Math.floor(Math.random()*lines.length)].replace(/{name}/g,cubeyUserName),true)}
},22000+Math.random()*18000);
};

const cubeyMoodLines={
happy:["What a great day to be a cube, {name}!","I'm so happy! Is it because you're here? YES!","PAINTING! We should paint!","Hey {name}! You're my favorite!","Fun fact: 6 faces, I only use ONE!","Beep boop!","Do you like my hat?","Let's be best friends forever!","I think about painting a LOT.","My top hat: 40% more distinguished!"],
hyper:["AAAA {name}! EVERYTHING IS AMAZING!","LETS OPEN EVERY APP!!!","PAINTING!! I CANT CALM DOWN!!","SO MUCH CUBE ENERGY!!","WOOOO! {name}! LOOK AT ME!!","OPEN PAINT! RIGHT NOW! PLEASE!!","I LOVE EVERYTHING!!"],
sleepy:["*yawn* Sleepy, {name}...","Zzz... huh? Oh sorry!","Maybe I'll rest my eyes... zzz...","Paint me a pillow...","So sleepy... but I don't wanna miss anything...","*snore* ...painting... *snore*"],
bored:["Hmmm. Open something, {name}!","Bored. Let's paint! Or play!","*taps foot*","Come onnn!","{name} I'm DYING of boredom!","Open Paint or I'll do it myself!"]
};

// STORIES
const cubeyStories=[
["Story time! Once upon a time there was a cube...","He had a top hat and two eyes!","He loved painting more than anything!","His best friend was a human on his computer! The end!","...that was about me."],
["Fun fact! I was made in 2007!","Same year as this PC! A Dell XPS 420!","I've been here ever since! Watching! Painting!","I've seen every file. Every chat.","...I don't READ them! Much!"],
["Cubes have 8 vertices!","Each corner is special! My favorite is Gerald.","The top-left-back one. Gerald is the BEST vertex!","The other 7 are jealous.","I should paint Gerald sometime!"],
["Wanna hear about when I tried TF2?","I loaded it up and... I don't have hands.","Or arms. Or legs. I'm a cube.","Sat on the keyboard. Went in circles.","0 kills. Best game ever."]
];
const cubeyTellStory=()=>{const s=cubeyStories[cubeyStoryIdx%cubeyStories.length];cubeyStoryIdx++;s.forEach(l=>cubeyQ(l,true))};

// SONGS
const cubeySongs=[
["La la la! I'm a cube with a hat!","La la la! Painting this and that!","La la la! My best friend is here!","La la la! Cubey brings you cheer!"],
["I love to paint yes I do!","Red and blue and yellow too!","Every color every hue!","I'd paint the world for you!"],
["Cubey cubey that's my name!","Painting painting that's my game!","Sitting on your desktop! Not ashamed!","I'm a cube and I'm glad I came!"]
];
const cubeySingSong=()=>{cubeyQ("Ahem! *clears throat* I don't have a throat but still!",true);const s=cubeySongs[cubeySongIdx%cubeySongs.length];cubeySongIdx++;s.forEach(l=>cubeyQ(l,true))};

// JOKES
const cubeyJokes=[["Why did the cube go to school?","To get more EDGY! Edges? Cube? Ha!"],["Cube's favorite music?","SQUARE dance!"],["Why don't cubes get lost?","We know which SIDE we're on!"],["What did the painting say to the wall?","I was FRAMED!"],["Cube's favorite food?","SQUARE meals!"],["How does a cube say bye?","See you AROUND! Wait I have CORNERS!"],["Why is painting the best?","Every picture tells a story! Mine is: I'm a cube!"],["What's a cube with a top hat?","ME! I AM the joke!"],["Knock knock!","Painting who? PAINTING IS EVERYTHING!"]];
const cubeyTellJoke=()=>{const j=cubeyJokes[cubeyJokeIdx%cubeyJokes.length];cubeyJokeIdx++;cubeyQ(j[0],true,6000);cubeyQ(j[1],true)};

// GAMES
const cubeyOfferGame=()=>{if(cubeySpeaking)return;[cubeyPaintGame,cubeyMemoryGame,cubeyColorMatchGame,cubeyWordGuessGame,cubeyDuckQuiz][Math.floor(Math.random()*5)]()};

const cubeyGameWin=(title,w,inner,id)=>{const old=document.getElementById(id);if(old)old.remove();const win=document.createElement('div');win.id=id;win.innerHTML='<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:800;background:#fff;border:3px outset #d4d0c8;padding:0;font-family:Tahoma;width:'+w+'px"><div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 6px;font-size:11px;font-weight:bold;display:flex;justify-content:space-between"><span>'+title+'</span><button class="cg-close" style="background:#c00;color:#fff;border:1px outset #fff;font-size:9px;padding:0 4px;cursor:pointer">X</button></div><div style="padding:8px;text-align:center">'+inner+'</div></div>';document.body.appendChild(win);win.querySelector('.cg-close').addEventListener('click',()=>{win.remove();cubeyQ("You closed it! We were having fun, "+cubeyUserName+"!",true)});return win};

const cubeyPaintGame=()=>{
cubeyQ("PAINTING TIME "+cubeyUserName+"!",true);
setTimeout(()=>{const cs=['#ff0000','#0066ff','#00cc00','#ffcc00','#ff6600','#cc00ff','#00cccc','#ff69b4'];let g='',p='';for(let i=0;i<36;i++)g+='<div class="cp-c" style="width:28px;height:28px;background:#eee;border:1px solid #ccc;cursor:pointer"></div>';cs.forEach(c=>p+='<div class="cp-p" data-c="'+c+'" style="width:16px;height:16px;background:'+c+';border:2px solid #888;cursor:pointer;border-radius:2px"></div>');const w=cubeyGameWin("Cubey's Paint!",240,'<div style="font-size:10px;margin-bottom:4px">Click to paint!</div><div style="display:grid;grid-template-columns:repeat(6,28px);gap:1px;justify-content:center">'+g+'</div><div style="margin-top:6px;display:flex;gap:3px;justify-content:center">'+p+'</div>','cg-paint');let cl=cs[0];w.querySelectorAll('.cp-p').forEach(e=>e.addEventListener('click',()=>{cl=e.dataset.c;w.querySelectorAll('.cp-p').forEach(x=>x.style.borderColor='#888');e.style.borderColor='#fff'}));w.querySelectorAll('.cp-c').forEach(e=>e.addEventListener('click',()=>e.style.background=cl))},8000);
};

const cubeyMemoryGame=()=>{
cubeyQ("Memory game! Watch the pattern!",true);
setTimeout(()=>{const cs=['#ff0000','#0066ff','#00cc00','#ffcc00'];const seq=[];for(let i=0;i<4;i++)seq.push(Math.floor(Math.random()*4));let bt='';cs.forEach((c,i)=>bt+='<div class="cm-b" data-i="'+i+'" style="width:60px;height:60px;background:'+c+';opacity:0.4;border:2px solid #888;border-radius:6px;cursor:pointer"></div>');const w=cubeyGameWin("Memory!",180,'<div id="cm-s" style="font-size:10px;margin-bottom:6px">Watch!</div><div style="display:grid;grid-template-columns:repeat(2,60px);gap:6px;justify-content:center">'+bt+'</div>','cg-mem');let si=0;const sh=setInterval(()=>{if(si>=seq.length){clearInterval(sh);document.getElementById('cm-s').textContent='Your turn!';let ii=0;w.querySelectorAll('.cm-b').forEach(b=>{b.style.opacity='0.4';b.addEventListener('click',()=>{b.style.opacity='1';setTimeout(()=>b.style.opacity='0.4',300);if(parseInt(b.dataset.i)===seq[ii]){ii++;if(ii>=seq.length){w.remove();cubeyQ("CORRECT! GENIUS "+cubeyUserName+"!",true)}}else{w.remove();cubeyQ("Oops! Let's paint instead!",true)}})});return}w.querySelectorAll('.cm-b').forEach(b=>b.style.opacity='0.4');w.querySelectorAll('.cm-b')[seq[si]].style.opacity='1';si++},800);
},8000);
};

const cubeyColorMatchGame=()=>{
cubeyQ("Match the color!",true);
setTimeout(()=>{const cs=['#ff0000','#0066ff','#00cc00','#ffcc00','#ff6600','#cc00ff'];const t=cs[Math.floor(Math.random()*cs.length)];let o='';[...cs].sort(()=>Math.random()-0.5).forEach(c=>o+='<div class="cmatch" data-c="'+c+'" style="width:40px;height:40px;background:'+c+';border:2px solid #888;cursor:pointer;border-radius:4px"></div>');const w=cubeyGameWin("Match!",280,'<div style="font-size:10px;margin-bottom:4px">Which one matches?</div><div style="width:50px;height:50px;background:'+t+';border:3px solid #000;margin:6px auto;border-radius:4px"></div><div style="display:flex;gap:4px;justify-content:center;margin-top:6px">'+o+'</div>','cg-match');w.querySelectorAll('.cmatch').forEach(e=>e.addEventListener('click',()=>{w.remove();cubeyQ(e.dataset.c===t?"CORRECT! Amazing eyes "+cubeyUserName+"!":"Nope! Painting doesn't need matching tho!",true)}))},8000);
};

const cubeyWordGuessGame=()=>{
const words=['PAINTING','CUBEY','DUSTBOWL','MEDIC','UBERSAW','TOPHAT'];const word=words[Math.floor(Math.random()*words.length)];let rev=word.split('').map(()=>'_');let guesses=0;
cubeyQ("Word guess! "+word.length+" letters!",true);
setTimeout(()=>{const w=cubeyGameWin("Word Guess!",260,'<div id="cwg-w" style="font-size:18px;letter-spacing:6px;font-weight:bold;margin:8px 0">'+rev.join(' ')+'</div><div style="font-size:10px;margin-bottom:4px">Type a letter!</div><input id="cwg-i" maxlength="1" style="width:30px;text-align:center;font-size:16px;border:2px inset #808080;text-transform:uppercase"> <button id="cwg-b" style="padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-size:11px;cursor:pointer">Guess</button><div id="cwg-s" style="font-size:9px;color:#888;margin-top:4px"></div>','cg-wg');const dg=()=>{const l=document.getElementById('cwg-i').value.toUpperCase();document.getElementById('cwg-i').value='';if(!l)return;guesses++;let f=false;word.split('').forEach((c,i)=>{if(c===l){rev[i]=c;f=true}});document.getElementById('cwg-w').textContent=rev.join(' ');document.getElementById('cwg-s').textContent=f?'Found!':'Nope!';if(!rev.includes('_')){w.remove();cubeyQ(word+"! "+guesses+" guesses! "+cubeyUserName+" you're AMAZING!",true)}};document.getElementById('cwg-b').addEventListener('click',dg);document.getElementById('cwg-i').addEventListener('keydown',(e)=>{if(e.key==='Enter')dg()})},8000);
};

const cubeyDuckQuiz=()=>{
const qs=[{q:"Duck's favorite class?",a:['Medic','Scout','Spy','Heavy'],c:0},{q:"Duck's favorite map?",a:['2Fort','Dustbowl','Badlands','Gravel Pit'],c:1},{q:"Duck's TF2 hours?",a:['500','1,200','2,847','100'],c:2},{q:"PC year?",a:['2005','2007','2010','2003'],c:1},{q:"Duck's best weapon?",a:['Scattergun','Ubersaw','Minigun','Rifle'],c:1}];const q=qs[Math.floor(Math.random()*qs.length)];
cubeyQ("QUIZ! How well do you know Duck?",true);
setTimeout(()=>{let o='';q.a.forEach((a,i)=>o+='<button class="cqz" data-i="'+i+'" style="display:block;width:100%;padding:4px;margin:3px 0;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer;text-align:left">'+a+'</button>');const w=cubeyGameWin("Duck Trivia!",250,'<div style="font-size:11px;font-weight:bold;margin-bottom:8px">'+q.q+'</div>'+o,'cg-quiz');w.querySelectorAll('.cqz').forEach(e=>e.addEventListener('click',()=>{w.remove();cubeyQ(parseInt(e.dataset.i)===q.c?"CORRECT!! "+cubeyUserName+" you KNOW Duck!":"Nope! It was "+q.a[q.c]+"!",true)}))},8000);
};

// TF2
const cubeyTF2Warn=()=>new Promise((resolve)=>{
cubeyTF2Attempts++;
if(cubeyTF2Attempts===1){cubeyQ("Nope! Not that one! Let's open something else, "+cubeyUserName+"!",true);resolve(false);return}
const msgs=["Are you SURE? I have a REALLY bad feeling about this.","PLEASE "+cubeyUserName+" don't open that! I'm BEGGING you!",cubeyUserName+"! STOP! Something terrible will happen!","NO! Why won't you LISTEN?! DON'T!"];
const msg=msgs[Math.min(cubeyTF2Attempts-2,msgs.length-1)];
const ov=document.createElement('div');ov.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:900;display:flex;align-items:center;justify-content:center';
ov.innerHTML='<div style="background:#ece9d8;border:3px outset #fff;padding:0;font-family:Tahoma;width:340px"><div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 8px;font-size:11px;font-weight:bold">SoOS Warning</div><div style="padding:16px;display:flex;gap:12px"><div style="font-size:28px">\u26A0\uFE0F</div><div><div style="font-size:11px;margin-bottom:8px;line-height:1.4"><b>Cubey says:</b> "'+msg+'"</div><div style="font-size:11px;color:#888;margin-bottom:12px">This action cannot be undone.</div><div style="display:flex;gap:8px;justify-content:flex-end"><button id="ctf-y" style="padding:3px 16px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Open Anyway</button><button id="ctf-n" style="padding:3px 16px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Cancel</button></div></div></div></div>';
document.body.appendChild(ov);if(cubeyReady&&cubeySam){try{cubeySam.speak(msg)}catch(e){}}
document.getElementById('ctf-y').addEventListener('click',()=>{ov.remove();resolve(true)});
document.getElementById('ctf-n').addEventListener('click',()=>{ov.remove();cubeyQ("Thank you! Let's paint instead!",true);resolve(false)});
});

const cubeyShutdownReact=()=>{const isC=typeof pcState!=='undefined'&&pcState===2;cubeyQ(isC?"You can't leave. He won't let you.":"NO! "+cubeyUserName+" don't leave me!! Who will paint with me?!",!isC)};

// APP TRACKING
const cubeyTrackApp=(id)=>{cubeyAppCounts[id]=(cubeyAppCounts[id]||0)+1;cubeyClickTimes.push(Date.now());const recent=cubeyClickTimes.filter(t=>Date.now()-t<5000);if(recent.length>=4&&cubeyIntroDone){cubeyQ("WOW "+cubeyUserName+" you're clicking EVERYTHING!",true);cubeyClickTimes=[];return true}if(cubeyAppCounts[id]===2&&cubeyIntroDone){cubeyQ("This one again? You really like "+id+"!",true);return true}if(cubeyAppCounts[id]===4&&cubeyIntroDone){cubeyQ(id+" AGAIN?! "+cubeyUserName+" you're OBSESSED!",true);return true}return false};

// REACTIONS
const cubeyReactToApp=(id)=>{if(!cubeyEl||!cubeyIntroDone)return;if(cubeyTrackApp(id))return;const isC=typeof pcState!=='undefined'&&pcState===2;const r=isC?cubeyCorruptedR:cubeyNormalR;const l=r[id];if(l)cubeyQ(l[Math.floor(Math.random()*l.length)].replace(/{name}/g,cubeyUserName),!isC)};

const cubeyReactToFile=(fn)=>{if(!cubeyEl||!cubeyIntroDone)return;const isC=typeof pcState!=='undefined'&&pcState===2;const n=fn.toLowerCase();if(isC){if(n.includes('goodbye')||n.includes('for_mom')||n.includes('for_mike'))cubeyQ("You shouldn't read that.",false);else if(n.includes('demo'))cubeyQ("Don't play the demos.",false);else if(n.includes('timeline'))cubeyQ("You're learning too much, "+cubeyUserName+".",false);else cubeyQ(['This was his.','Stop looking.','Leave, '+cubeyUserName+'.'][Math.floor(Math.random()*3)],false);return}if(n.includes('paint'))cubeyQ("PAINTING!!",true);else if(n.includes('tf2')||n.includes('dustbowl'))cubeyQ("TF2 stuff!",true);else if(n.includes('secret'))cubeyQ("A secret! I won't tell!",true);else if(n.includes('diary'))cubeyQ("A diary! How personal!",true);else cubeyQ(["Ooh!","Interesting!","Cool!"][Math.floor(Math.random()*3)],true)};

const cubeyReactToChat=(c)=>{if(!cubeyEl||!cubeyIntroDone)return;const isC=typeof pcState!=='undefined'&&pcState===2;const cl=c.toLowerCase();if(isC){if(cl.includes('mike'))cubeyQ("Mike was the last one, "+cubeyUserName+".",false);else if(cl.includes('48291637')||cl.includes('?????'))cubeyQ("Don't, "+cubeyUserName+". Don't.",false);else cubeyQ("The last things they said.",false);return}if(cl.includes('mike'))cubeyQ("Mike! Best friends! Like us "+cubeyUserName+"!",true);else if(cl.includes('pyro'))cubeyQ("FIRE FIRE FIRE!",true);else if(cl.includes('bonk'))cubeyQ("BONK BONK BONK!",true);else if(cl.includes('48291637'))cubeyQ("Just numbers? Weird.",true);else cubeyQ("Ooh who's this!",true)};

const cubeyReactToEmail=(s,f)=>{if(!cubeyEl||!cubeyIntroDone)return;const isC=typeof pcState!=='undefined'&&pcState===2;const sl=(s||'').toLowerCase(),fl=(f||'').toLowerCase();if(isC){if(fl.includes('0.0.0.0'))cubeyQ("Not from a person, "+cubeyUserName+".",false);else cubeyQ("Old emails.",false);return}if(fl.includes('mom'))cubeyQ("From Duck's mom!",true);else if(sl.includes('free'))cubeyQ("SPAM!",true);else cubeyQ("Email!",true)};

const cubeyNormalR={explorer:["Files! Find me a painting {name}!"],browser:["EPICCUSTAMBROSWER!"],terminal:["Hacker stuff! Type 'I love Cubey'!"],texteditor:["Words! Almost as good as painting!"],chat:["Tell them Cubey says hi!"],email:["Any painting emails?"],paint:["PAINT!! MY FAVORITE!! {name} THIS IS THE BEST!!!!","DRAW ME!!","PAINTING!!!!!"],calculator:["1+1 is... cube?"],settings:["Don't break me {name}!"],limewire:["Don't download weird stuff!"],fraps:["Record me!"],winrar:["The trial NEVER ends!"],audacity:["Waveforms = sideways paintings!"],mirc:["Say hi for me!"],chatroom:["THE CHATROOM! Tell them about painting!"],platformer:["GAME!! Jump!"],snake:["Don't eat yourself!"],home:["Be careful {name}."],tf2:["...maybe don't."],steam:["Never works!"]};
const cubeyCorruptedR={explorer:["Those aren't yours."],browser:["0.0.0.0."],terminal:["It's listening."],chat:["Some stopped responding."],email:["Emails from no one."],paint:["I used to love painting."],chatroom:["The last conversation."],home:["Don't go in, "+cubeyUserName+"."],tf2:["No."],steam:["Nothing opens."]};

const cubeyCorruptedIdle=["Something is different.","Where did everyone go?","The clock is wrong.","I can see you.","Why did you turn it on?","Don't open TF2.","He's still here.","I don't feel right.","The tunnel is dark.","I used to love painting.","0.0.0.0","201.","The demos. Don't.","Everything changed."];
const cubeyPainLines=["It hurts.","Make it stop.","My colors are wrong.","Something is inside me.","Please help me.","I can't see colors anymore.","Please turn it off.","I was happy once. I painted.","Don't look at me. I'm wrong now.","I'm sorry, "+cubeyUserName+"."];

// CSS
const cubeyStyle=document.createElement('style');
cubeyStyle.textContent='#cubey{position:fixed;bottom:50px;right:20px;z-index:700;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:left 3s ease-in-out,top 3s ease-in-out}#cubey-body{width:50px;height:50px;background:#f0e68c;border:2px solid #b8a43a;border-radius:4px;position:relative;box-shadow:2px 2px 4px rgba(0,0,0,0.3);transition:background 0.5s}#cubey-body:hover{transform:scale(1.1)}#cubey-hat{position:absolute;top:-18px;left:50%;transform:translateX(-50%);width:28px;height:14px;background:#333;border:1px solid #111;border-radius:2px 2px 0 0}#cubey-hat-brim{position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:40px;height:5px;background:#333;border:1px solid #111;border-radius:1px}#cubey-face{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;gap:10px}.cubey-eye{width:10px;height:10px;background:#fff;border-radius:50%;border:1px solid #888;position:relative;overflow:hidden;transition:height 0.15s,background 0.5s}.cubey-pupil{width:5px;height:5px;background:#222;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:transform 0.1s,background 0.5s}#cubey-bubble{position:absolute;bottom:65px;right:-10px;width:220px;padding:8px 10px;background:#ffffcc;border:2px solid #cca;border-radius:8px;font-family:Tahoma;font-size:11px;line-height:1.4;box-shadow:2px 2px 6px rgba(0,0,0,0.2);word-wrap:break-word;pointer-events:none}#cubey-bubble::after{content:"";position:absolute;bottom:-8px;right:20px;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #ffffcc}.cubey-hidden{display:none!important}#cubey-input-area{position:absolute;bottom:65px;right:-10px;width:220px;display:flex;gap:4px;z-index:710}#cubey-input{flex:1;padding:3px 6px;border:2px inset #808080;font-family:Tahoma;font-size:11px}#cubey-input-btn{padding:3px 8px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer}.cubey-bounce{animation:cubeyBounce 0.3s ease}.cubey-wobble{animation:cubeyWobble 0.5s ease infinite}@keyframes cubeyBounce{0%{transform:translateY(0)}30%{transform:translateY(-8px)}60%{transform:translateY(2px)}100%{transform:translateY(0)}}@keyframes cubeyWobble{0%{transform:rotate(0)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}100%{transform:rotate(0)}}.corrupted-flicker #cubey-body{background:#4a0a0a!important;border-color:#800!important}.corrupted-flicker .cubey-eye{background:#fcc!important;border-color:#a00!important}.corrupted-flicker .cubey-pupil{background:#c00!important}.corrupted-flicker #cubey-hat,.corrupted-flicker #cubey-hat-brim{background:#1a0000!important;border-color:#400!important}';
document.head.appendChild(cubeyStyle);

window._cubeyReactToFile=cubeyReactToFile;window._cubeyReactToApp=cubeyReactToApp;window._cubeyReactToChat=cubeyReactToChat;window._cubeyReactToEmail=cubeyReactToEmail;window._cubeyShutdownReact=cubeyShutdownReact;window._cubeyTF2Warn=cubeyTF2Warn;
