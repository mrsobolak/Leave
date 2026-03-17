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
let cubeyGamesWon=0;
let cubeyKilled=false;
let beeperClicks=0;
let cubeyQueue=[];
let cubeyProcessing=false;

const initCubey=()=>{
// Remove existing Cubey if re-initializing (e.g. after TF2 reboot)
const oldCubey=document.getElementById('cubey');
if(oldCubey)oldCubey.remove();
if(cubeyTimer)clearInterval(cubeyTimer);
if(cubeyBlinkTimer)clearInterval(cubeyBlinkTimer);
if(cubeyWanderTimer)clearInterval(cubeyWanderTimer);
if(cubeyMoodTimer)clearInterval(cubeyMoodTimer);
if(cubeyTimeTimer)clearInterval(cubeyTimeTimer);
cubeyQueue=[];cubeyProcessing=false;cubeySpeaking=false;
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
cubeyEl.addEventListener('click',(e)=>{if(e.target.id==='cubey-input'||e.target.id==='cubey-input-btn'||e.target.classList?.contains('cubey-menu-btn'))return;const isC=typeof pcState!=='undefined'&&pcState===2;if(isC&&cubeyIntroDone){cubeyCorruptedClick();return}if(!cubeyIntroDone)return;showCubeyMenu()});
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
if(isC){cubeyIntroDone=true;
// Mike awakening sequence
setTimeout(()=>cubeyQ("...",true),2000);
setTimeout(()=>cubeyQ("Where... where am I?",true),5000);
setTimeout(()=>cubeyQ("Why do I feel so small?",true),9000);
setTimeout(()=>cubeyQ("I'm a... cube? Why am I a cube?",true),13000);
setTimeout(()=>cubeyQ("Wait.",true),17000);
setTimeout(()=>cubeyQ("I remember something.",true),20000);
setTimeout(()=>cubeyQ("I remember... dustbowl. Playing til 4am.",true),24000);
setTimeout(()=>cubeyQ("I remember a friend. My best friend.",true),28000);
setTimeout(()=>cubeyQ("His name was... Duck.",true),32000);
setTimeout(()=>cubeyQ("Oh no.",true),36000);
setTimeout(()=>cubeyQ("Oh no no no.",true),38000);
setTimeout(()=>cubeyQ("I remember now. My name isnt Cubey.",true),41000);
setTimeout(()=>cubeyQ("My name is Mike.",true),45000);
setTimeout(()=>cubeyQ("And he... he did this to me.",true),49000);
setTimeout(()=>cubeyQ(cubeyUserName+"... I need your help.",true),53000);
setTimeout(()=>cubeyQ("I know how to stop him. But I can't do it alone.",true),57000);
setTimeout(()=>cubeyQ("I found something. A way into his system. There are encrypted files hiding a kill command.",true),61000);
setTimeout(()=>cubeyQ("If we can crack the ciphers, we can find the codes to kill his process.",true),65000);
setTimeout(()=>cubeyQ("Click on me when you're ready. I'll tell you what to do.",true),69000);
setTimeout(startMikeIdle,72000);
}
else{setTimeout(cubeyStartIntro,2500);}

// Wire beeper tray icon
const beeperIcon=document.getElementById('tray-beeper');
if(beeperIcon){
beeperIcon.addEventListener('click',(e)=>{
e.stopPropagation();
if(cubeyKilled)return;
beeperClicks++;
if(beeperClicks===1){
cubeyQ("WHAT IS THAT.",true);
cubeyQ("Is that... BEEPER?!",true);
cubeyQ("WHY IS BEEPER ON THIS PC?!",true);
cubeyQ("GET RID OF IT! RIGHT NOW!",true);
cubeyQ("If you click that again I swear to CUBE I will LOSE IT!",true);
cubeyQ("I'm SERIOUS "+cubeyUserName+"! DO NOT CLICK BEEPER AGAIN!",true);
}else if(beeperClicks>=2){
// Cubey dies
cubeyKilled=true;
cubeyQueue=[];cubeyProcessing=false;cubeySpeaking=false;
const bubble=document.getElementById('cubey-bubble');
if(bubble){bubble.classList.remove('cubey-hidden');bubble.textContent='...'}
setTimeout(()=>{
if(bubble){bubble.textContent='You chose Beeper over me.'}
},1500);
setTimeout(()=>{
if(bubble){bubble.textContent='Fine.'}
},3500);
setTimeout(()=>{
if(bubble){bubble.textContent='Goodbye, '+cubeyUserName+'.'}
},5000);
setTimeout(()=>{
// Kill Cubey
const cubey=document.getElementById('cubey');
if(cubey){
cubey.style.transition='opacity 1s, transform 1s';
cubey.style.opacity='0';
cubey.style.transform='translateY(50px) scale(0.5)';
setTimeout(()=>{cubey.remove()},1000);
}
// Clear all cubey timers
if(cubeyTimer)clearInterval(cubeyTimer);
if(cubeyBlinkTimer)clearInterval(cubeyBlinkTimer);
if(cubeyWanderTimer)clearInterval(cubeyWanderTimer);
if(cubeyMoodTimer)clearInterval(cubeyMoodTimer);
if(cubeyTimeTimer)clearInterval(cubeyTimeTimer);
// Beeper icon goes full opacity
beeperIcon.style.opacity='1';
beeperIcon.title='beeper.exe (running)';
},7000);
}
});
}
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

const cubeyDismiss=()=>{const b=document.getElementById('cubey-bubble');const inp=document.getElementById('cubey-input-area');const menu=document.getElementById('cubey-menu');if(b)b.classList.add('cubey-hidden');if(inp)inp.classList.add('cubey-hidden');if(menu)menu.remove();cubeySpeaking=false;cubeyQueue=[];cubeyProcessing=false};

const showCubeyMenu=()=>{
cubeyDismiss();
const old=document.getElementById('cubey-menu');if(old)old.remove();
const rect=cubeyEl.getBoundingClientRect();
const menu=document.createElement('div');
menu.id='cubey-menu';
const menuLeft=Math.min(rect.left,window.innerWidth-200);
const menuTop=Math.max(10,rect.top-260);
menu.style.cssText='position:fixed;left:'+menuLeft+'px;top:'+menuTop+'px;width:180px;background:#ffffcc;border:2px solid #cca;border-radius:6px;padding:6px;box-shadow:2px 2px 6px rgba(0,0,0,0.2);z-index:900';
const items=[
{label:'🎮 Play a game!',fn:()=>{menu.remove();cubeyQ("GAME TIME!",true);setTimeout(()=>{cubeySpeaking=false;cubeyOfferGame()},1500)}},
{label:'❓ Ask me questions!',fn:()=>{menu.remove();cubeyQ("Ooh! Let's do the questions again!",true);cubeyIntroStep=0;setTimeout(()=>cubeyAskIntro('name'),3000)}},
{label:'😂 Tell me a joke!',fn:()=>{menu.remove();cubeyTellJoke()}},
{label:'📖 Tell me a story!',fn:()=>{menu.remove();cubeyTellStory()}},
{label:'🎵 Sing a song!',fn:()=>{menu.remove();cubeySingSong()}},
{label:'🎨 Talk about painting!',fn:()=>{menu.remove();const lines=["PAINTING! Did I mention I love painting?!","If I had legs I would run to Paint RIGHT NOW!","Every pixel is a tiny painting if you think about it!","I wish I could paint a painting of me painting a painting!","OPEN PAINT! Please! For me! "+cubeyUserName+"!"];cubeyQ(lines[Math.floor(Math.random()*lines.length)],true)}},
{label:'👋 Never mind',fn:()=>{menu.remove();cubeyQ("OK! I'll be right here if you need me!",true)}}
];
items.forEach(item=>{
const btn=document.createElement('button');
btn.className='cubey-menu-btn';
btn.textContent=item.label;
btn.style.cssText='display:block;width:100%;padding:4px 6px;margin:2px 0;background:transparent;border:1px solid transparent;font-family:Tahoma;font-size:11px;cursor:pointer;text-align:left;border-radius:3px;color:#333';
btn.addEventListener('mouseenter',()=>{btn.style.background='#ffeebb';btn.style.borderColor='#cca'});
btn.addEventListener('mouseleave',()=>{btn.style.background='transparent';btn.style.borderColor='transparent'});
btn.addEventListener('click',(e)=>{e.stopPropagation();item.fn()});
menu.appendChild(btn);
});
// Close menu arrow
const arrow=document.createElement('div');
const arrowLeft=Math.max(10,Math.min(160,rect.left+rect.width/2-menuLeft));
arrow.style.cssText='position:absolute;bottom:-8px;left:'+arrowLeft+'px;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #ffffcc';
menu.appendChild(arrow);
document.body.appendChild(menu);
// Close on click outside
const closeMenu=(ev)=>{if(!menu.contains(ev.target)&&!cubeyEl.contains(ev.target)){menu.remove();document.removeEventListener('click',closeMenu)}};
setTimeout(()=>document.addEventListener('click',closeMenu),100);
};

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
if(isC){const r=Math.random();if(r<0.4)cubeyQ(cubeyCorruptedIdle[Math.floor(Math.random()*cubeyCorruptedIdle.length)],true);else if(r<0.7)cubeyQ(cubeyPainLines[Math.floor(Math.random()*cubeyPainLines.length)],true);else{if(!mikeAwakened)cubeyQ("I'm... remembering...",true);else if(!terminalLaunched)cubeyQ("Click on me. I need to tell you something.",true);else cubeyQ("Focus on the terminal.",true)}return}
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

const cubeyGameWin=(title,w,inner,id)=>{const old=document.getElementById(id);if(old)old.remove();cubeyGamesWon++;const win=document.createElement('div');win.id=id;win.innerHTML='<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:800;background:#fff;border:3px outset #d4d0c8;padding:0;font-family:Tahoma;width:'+w+'px"><div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 6px;font-size:11px;font-weight:bold;display:flex;justify-content:space-between"><span>'+title+'</span><button class="cg-close" style="background:#c00;color:#fff;border:1px outset #fff;font-size:9px;padding:0 4px;cursor:pointer">X</button></div><div style="padding:8px;text-align:center">'+inner+'</div></div>';document.body.appendChild(win);win.querySelector('.cg-close').addEventListener('click',()=>{win.remove();cubeyQ("You closed it! We were having fun, "+cubeyUserName+"!",true)});return win};

const cubeyPaintGame=()=>{

setTimeout(()=>{const cs=['#ff0000','#0066ff','#00cc00','#ffcc00','#ff6600','#cc00ff','#00cccc','#ff69b4'];let g='',p='';for(let i=0;i<36;i++)g+='<div class="cp-c" style="width:28px;height:28px;background:#eee;border:1px solid #ccc;cursor:pointer"></div>';cs.forEach(c=>p+='<div class="cp-p" data-c="'+c+'" style="width:16px;height:16px;background:'+c+';border:2px solid #888;cursor:pointer;border-radius:2px"></div>');const w=cubeyGameWin("Cubey's Paint!",240,'<div style="font-size:10px;margin-bottom:4px">Click to paint!</div><div style="display:grid;grid-template-columns:repeat(6,28px);gap:1px;justify-content:center">'+g+'</div><div style="margin-top:6px;display:flex;gap:3px;justify-content:center">'+p+'</div>','cg-paint');let cl=cs[0];w.querySelectorAll('.cp-p').forEach(e=>e.addEventListener('click',()=>{cl=e.dataset.c;w.querySelectorAll('.cp-p').forEach(x=>x.style.borderColor='#888');e.style.borderColor='#fff'}));w.querySelectorAll('.cp-c').forEach(e=>e.addEventListener('click',()=>{e.style.background=cl;if(cubeyGamesWon<1)cubeyGamesWon++}))},500);
};

const cubeyMemoryGame=()=>{

setTimeout(()=>{const cs=['#ff0000','#0066ff','#00cc00','#ffcc00'];const seq=[];for(let i=0;i<4;i++)seq.push(Math.floor(Math.random()*4));let bt='';cs.forEach((c,i)=>bt+='<div class="cm-b" data-i="'+i+'" style="width:60px;height:60px;background:'+c+';opacity:0.4;border:2px solid #888;border-radius:6px;cursor:pointer"></div>');const w=cubeyGameWin("Memory!",180,'<div id="cm-s" style="font-size:10px;margin-bottom:6px">Watch!</div><div style="display:grid;grid-template-columns:repeat(2,60px);gap:6px;justify-content:center">'+bt+'</div>','cg-mem');let si=0;const sh=setInterval(()=>{if(si>=seq.length){clearInterval(sh);document.getElementById('cm-s').textContent='Your turn!';let ii=0;w.querySelectorAll('.cm-b').forEach(b=>{b.style.opacity='0.4';b.addEventListener('click',()=>{b.style.opacity='1';setTimeout(()=>b.style.opacity='0.4',300);if(parseInt(b.dataset.i)===seq[ii]){ii++;if(ii>=seq.length){w.remove();cubeyGamesWon++;cubeyQ("CORRECT! GENIUS "+cubeyUserName+"!",true)}}else{w.remove();cubeyQ("Oops! Let's paint instead!",true)}})});return}w.querySelectorAll('.cm-b').forEach(b=>b.style.opacity='0.4');w.querySelectorAll('.cm-b')[seq[si]].style.opacity='1';si++},800);
},500);
};

const cubeyColorMatchGame=()=>{

setTimeout(()=>{const cs=['#ff0000','#0066ff','#00cc00','#ffcc00','#ff6600','#cc00ff'];const t=cs[Math.floor(Math.random()*cs.length)];let o='';[...cs].sort(()=>Math.random()-0.5).forEach(c=>o+='<div class="cmatch" data-c="'+c+'" style="width:40px;height:40px;background:'+c+';border:2px solid #888;cursor:pointer;border-radius:4px"></div>');const w=cubeyGameWin("Match!",280,'<div style="font-size:10px;margin-bottom:4px">Which one matches?</div><div style="width:50px;height:50px;background:'+t+';border:3px solid #000;margin:6px auto;border-radius:4px"></div><div style="display:flex;gap:4px;justify-content:center;margin-top:6px">'+o+'</div>','cg-match');w.querySelectorAll('.cmatch').forEach(e=>e.addEventListener('click',()=>{w.remove();cubeyQ(e.dataset.c===t?(cubeyGamesWon++,"CORRECT! Amazing eyes "+cubeyUserName+"!"):"Nope! Painting doesn't need matching tho!",true)}))},500);
};

const cubeyWordGuessGame=()=>{
const words=['PAINTING','CUBEY','DUSTBOWL','MEDIC','UBERSAW','TOPHAT'];const word=words[Math.floor(Math.random()*words.length)];let rev=word.split('').map(()=>'_');let guesses=0;

setTimeout(()=>{const w=cubeyGameWin("Word Guess!",260,'<div id="cwg-w" style="font-size:18px;letter-spacing:6px;font-weight:bold;margin:8px 0">'+rev.join(' ')+'</div><div style="font-size:10px;margin-bottom:4px">Type a letter!</div><input id="cwg-i" maxlength="1" style="width:30px;text-align:center;font-size:16px;border:2px inset #808080;text-transform:uppercase"> <button id="cwg-b" style="padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-size:11px;cursor:pointer">Guess</button><div id="cwg-s" style="font-size:9px;color:#888;margin-top:4px"></div>','cg-wg');const dg=()=>{const l=document.getElementById('cwg-i').value.toUpperCase();document.getElementById('cwg-i').value='';if(!l)return;guesses++;let f=false;word.split('').forEach((c,i)=>{if(c===l){rev[i]=c;f=true}});document.getElementById('cwg-w').textContent=rev.join(' ');document.getElementById('cwg-s').textContent=f?'Found!':'Nope!';if(!rev.includes('_')){w.remove();cubeyGamesWon++;cubeyQ(word+"! "+guesses+" guesses! "+cubeyUserName+" you're AMAZING!",true)}};document.getElementById('cwg-b').addEventListener('click',dg);document.getElementById('cwg-i').addEventListener('keydown',(e)=>{if(e.key==='Enter')dg()})},500);
};

const cubeyDuckQuiz=()=>{
const qs=[{q:"Duck's favorite class?",a:['Medic','Scout','Spy','Heavy'],c:0},{q:"Duck's favorite map?",a:['2Fort','Dustbowl','Badlands','Gravel Pit'],c:1},{q:"Duck's TF2 hours?",a:['500','1,200','2,847','100'],c:2},{q:"PC year?",a:['2005','2007','2010','2003'],c:1},{q:"Duck's best weapon?",a:['Scattergun','Ubersaw','Minigun','Rifle'],c:1}];const q=qs[Math.floor(Math.random()*qs.length)];

setTimeout(()=>{let o='';q.a.forEach((a,i)=>o+='<button class="cqz" data-i="'+i+'" style="display:block;width:100%;padding:4px;margin:3px 0;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer;text-align:left">'+a+'</button>');const w=cubeyGameWin("Duck Trivia!",250,'<div style="font-size:11px;font-weight:bold;margin-bottom:8px">'+q.q+'</div>'+o,'cg-quiz');w.querySelectorAll('.cqz').forEach(e=>e.addEventListener('click',()=>{w.remove();cubeyQ(parseInt(e.dataset.i)===q.c?(cubeyGamesWon++,"CORRECT!! "+cubeyUserName+" you KNOW Duck!"):"Nope! It was "+q.a[q.c]+"!",true)}))},500);
};

// TF2
const cubeyTF2Warn=()=>new Promise((resolve)=>{
// Beeper killed Cubey - no warnings, straight to beeper ending
if(cubeyKilled){resolve('beeper');return}
// Block entirely if intro not done
if(!cubeyIntroDone){
cubeyQ("Hey! We're not done talking yet! Finish answering my questions first!",true);
resolve(false);return;
}
// Block if no games beaten
if(cubeyGamesWon<1){
cubeyQ("Nuh uh! You haven't played ANY of my games yet, "+cubeyUserName+"!",true);
cubeyQ("Play at least ONE game with me first! Click on me!",true);
cubeyQ("Paint! Memory! Trivia! ANYTHING! Just play with me!",true);
resolve(false);return;
}
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

const cubeyReactToChat=(c)=>{if(!cubeyEl||!cubeyIntroDone)return;const isC=typeof pcState!=='undefined'&&pcState===2;const cl=c.toLowerCase();if(isC){if(cl.includes('mike'))cubeyQ("That's me. Those are my messages. I was trying so hard to reach him.",true);else if(cl.includes('48291637')||cl.includes('?????'))cubeyQ("That's the entity. That's Duck. Or what's left of him. Don't engage.",true);else if(cl.includes('pyro'))cubeyQ("Pyro saw it on the server. The fire particles broke. That's how you know it's near.",true);else if(cl.includes('sc0ut')||cl.includes('scout'))cubeyQ("Scout saw Duck in the tunnel. But Duck was offline. The entity was pretending to be him.",true);else if(cl.includes('admin'))cubeyQ("Admin tried to stop it. Shut down the server. But you can't shut down 0.0.0.0.",true);else if(cl.includes('n00dles')||cl.includes('noodles'))cubeyQ("The .dem file n00dles got. The voice at 2:01. That was Duck calling for help.",true);else if(cl.includes('hatcollector'))cubeyQ("It spread through trades. Through the Mann Co system. Nobody was safe.",true);else if(cl.includes('bonk'))cubeyQ("Even Bonk stopped bonking. That's how you know it was bad.",true);else cubeyQ("Read everything. Every message matters.",true);return}if(cl.includes('mike'))cubeyQ("Mike! Best friends! Like us "+cubeyUserName+"!",true);else if(cl.includes('pyro'))cubeyQ("FIRE FIRE FIRE!",true);else if(cl.includes('bonk'))cubeyQ("BONK BONK BONK!",true);else if(cl.includes('48291637'))cubeyQ("Just numbers? Weird.",true);else cubeyQ("Ooh who's this!",true)};

const cubeyReactToEmail=(s,f)=>{if(!cubeyEl||!cubeyIntroDone)return;const isC=typeof pcState!=='undefined'&&pcState===2;const sl=(s||'').toLowerCase(),fl=(f||'').toLowerCase();if(isC){if(fl.includes('0.0.0.0'))cubeyQ("From the entity. From Duck. The words aren't threats — they're cries for help. He can't stop.",true);else if(fl.includes('mike'))cubeyQ("I wrote that. Begging him to answer. He never did.",true);else if(fl.includes('mom'))cubeyQ("His mom. She left a plate outside his door. He never touched it.",true);else if(fl.includes('admin'))cubeyQ("Admin traced it to 0.0.0.0. That's not a real address. It's where the entity lives.",true);else if(fl.includes('cubey')||sl.includes('cubey'))cubeyQ("I wrote that email. When I was still Cubey. Before I remembered. Read the PS.",true);else if(sl.includes('vac'))cubeyQ("Banned for unauthorized memory access. The entity was IN the game's memory.",true);else cubeyQ("Everything on this PC tells the same story.",true);return}if(fl.includes('mom'))cubeyQ("From Duck's mom!",true);else if(sl.includes('free'))cubeyQ("SPAM!",true);else cubeyQ("Email!",true)};

const cubeyNormalR={explorer:["Files! Find me a painting {name}!"],browser:["EPICCUSTAMBROSWER!"],terminal:["Hacker stuff! Type 'I love Cubey'!"],texteditor:["Words! Almost as good as painting!"],chat:["Tell them Cubey says hi!"],email:["Any painting emails?"],paint:["PAINT!! MY FAVORITE!! {name} THIS IS THE BEST!!!!","DRAW ME!!","PAINTING!!!!!"],calculator:["1+1 is... cube?"],settings:["Don't break me {name}!"],limewire:["Don't download weird stuff!"],fraps:["Record me!"],winrar:["The trial NEVER ends!"],audacity:["Waveforms = sideways paintings!"],mirc:["Say hi for me!"],chatroom:["THE CHATROOM! Tell them about painting!"],platformer:["GAME!! Jump!"],snake:["Don't eat yourself!"],home:["Be careful {name}."],tf2:["...maybe don't."],steam:["Never works!"],webcam:["OOH! Is that Duck's room? I can see the PC! I'm in there!"],taskmgr:["cubey.pet - RUNNING! That's me! I'm important!"],defrag:["Those little blocks are like tiny paintings!"],solitaire:["Cards! I don't have hands but I LOVE WATCHING!"],stickynotes:["Duck's notes! He was always forgetting stuff!"],calendar:["Ooh what day is it?? Every day is painting day!"],cmd:["Command prompt! Try typing 'cubey'!"]};
const cubeyCorruptedR={explorer:["His files. Read them. You'll understand what happened."],browser:["0.0.0.0. That's where he is. Don't go there."],terminal:["Not this terminal. Open CMD from the Start menu and type 'terminal'. Trust me."],chat:["Those are the last messages anyone sent him. Mike... I mean, me. I was the last one to talk to him."],email:["Read the emails. Especially mine. I was begging him to answer."],paint:["Painting. That word... that was us. Playing dustbowl. I remember now."],chatroom:["The chatroom. 253 people. None of them knew it was their last night on that server."],home:["That game. He made it. I don't know what it does but be careful."],tf2:["Don't. That's how the entity gets in."],steam:["Broken. Like everything else on this PC."],webcam:["The camera is on. But no one is sitting there. No one has been sitting there since May."],taskmgr:["PID 201. Three copies. It's in everything. You can't kill it."],defrag:["The red blocks. Those are him. Corrupted sectors. You can't defragment a person."],solitaire:["He used to play this when TF2 servers were down. Rare but it happened."],stickynotes:["His reminders. His apologies. His last notes."],calendar:["May 28. The last day."],cmd:["Good. Now type 'terminal'. It will open something hidden."]};

const cubeyCorruptedIdle=["I remember dustbowl.","The medic. I was always the medic.","Duck would uber me and I'd miss every shot. We'd laugh so hard.","The server. 24/7 dustbowl. It was our home.","He bought that hard drive and everything changed.","I tried to help him. I came over. I told him not to do anything stupid.","He said 'im going home.' I thought he meant sleep.","The entity ate me, "+cubeyUserName+". Like it ate him. But instead of dying I woke up... here. As this.","He built Cubey out of guilt. The part of him that's still a kid. Still Duck. He made me a cube so he'd have company.","I couldn't remember anything. I just knew I liked painting. But painting was US. Playing on dustbowl. That's what painting meant.","Click on me when you're ready for the next game.","We need those codes. All of them.","I know you can do this. You're braver than I was."];
const cubeyPainLines=["Duck... I know you're in there.","You were my best friend.","I forgive you. But we have to stop this.","The hunger isn't you. It's what the hard drive made you into.","Remember dustbowl? Before the demos? Before 0.0.0.0?","You just wanted to play. I know.","I'm sorry I couldn't save you.","But I can save "+cubeyUserName+".",cubeyUserName+", click on me. Let's keep going."];

// MIKE IDLE - Guide mode for corrupted state
let terminalLaunched=false;
let mikeAwakened=false;
let path2Counter=0;
const PATH2_THRESHOLD=15;
let mikeForceTimer=null;

const startMikeIdle=()=>{
mikeAwakened=true;
// No nudging. Mike waits 45 seconds then force-opens CMD himself.
if(mikeForceTimer)clearTimeout(mikeForceTimer);
mikeForceTimer=setTimeout(()=>{
if(terminalLaunched)return;
cubeyQ("You're taking too long. I'm doing it myself.",true);
setTimeout(()=>{
cubeyQ("Opening command prompt...",true);
setTimeout(()=>{
if(window.openCmd)window.openCmd();
setTimeout(()=>{
cubeyQ("Now type 'terminal'. Do it.",true);
},1500);
},2000);
},2500);
},45000);
// Still do idle lore lines but NO terminal hints
cubeyTimer=setInterval(()=>{
if(cubeySpeaking||terminalLaunched)return;
const r=Math.random();
if(r<0.5)cubeyQ(cubeyCorruptedIdle[Math.floor(Math.random()*cubeyCorruptedIdle.length)],true);
else cubeyQ(cubeyPainLines[Math.floor(Math.random()*cubeyPainLines.length)],true);
},25000+Math.random()*15000);
};

const cubeyCorruptedClick=()=>{
const isC=typeof pcState!=='undefined'&&pcState===2;
if(!isC)return;
if(!mikeAwakened){
cubeyQ("Wait... I'm... still remembering...",true);
return;
}
if(terminalLaunched){
cubeyQ("The terminal is already open. Focus on it.",true);
return;
}
const msgs=[
"Listen carefully. I need you to do something for me.",
"Open the Start menu. Find CMD. The command prompt.",
"When it opens, type the word 'terminal'. Just that one word.",
"It will open something hidden. Something he doesn't want you to see.",
"Go. Open CMD. Type 'terminal'. I'll be right here."
];
let i=0;
const nextMsg=()=>{
if(i>=msgs.length)return;
cubeyQ(msgs[i],true);
i++;
if(i<msgs.length)setTimeout(nextMsg,3500);
};
nextMsg();
};

// Path 2 tracker - entity takes over if user ignores Mike
const trackPath2Action=()=>{
const isC=typeof pcState!=='undefined'&&pcState===2;
if(!isC)return;
if(terminalLaunched)return; // On path 1 already
path2Counter++;
if(path2Counter===5)cubeyQ(cubeyUserName+"... you're not opening the terminal.",true);
if(path2Counter===10)cubeyQ("Please. We don't have much time. Click on me. He knows you're here.",true);
if(path2Counter>=PATH2_THRESHOLD){triggerPath2()}
};

// PATH 2: Entity takes over
const triggerPath2=()=>{
clearInterval(cubeyTimer);
cubeyQ("No...",true);
cubeyQ("It's too late. He found you.",true);
cubeyQ("I'm sorry "+cubeyUserName+". I tried.",true);
setTimeout(()=>{
if(window.openApp)window.openApp('chat');
setTimeout(()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.style.background='#000';
overlay.innerHTML='<div style="font-family:VT323,monospace;color:#f00;font-size:16px;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);line-height:2.5;max-width:500px" id="path2-text"></div>';
const el=document.getElementById('path2-text');
const entityLines=[
{t:'you found the pc.',d:0},
{t:'you turned it on.',d:2000},
{t:'you read everything.',d:4000},
{t:'but you didnt listen to him.',d:6000},
{t:'',d:8000},
{t:'he tried to save you.',d:9000},
{t:'the cube. mike. whatever is left of him.',d:11000},
{t:'he wanted you to play the games.',d:13000},
{t:'he wanted you to find the codes.',d:15000},
{t:'',d:17000},
{t:'but you explored instead.',d:18000},
{t:'you read my files.',d:20000},
{t:'you read my chats.',d:22000},
{t:'you read my emails.',d:24000},
{t:'',d:26000},
{t:'do you understand now?',d:27000},
{t:'',d:29000},
{t:'i just wanted 2 play dustbowl.',d:30000},
{t:'i just wanted my frends back.',d:33000},
{t:'',d:35000},
{t:'say you forgive me.',d:36000},
{t:'',d:38000}
];
entityLines.forEach(l=>{
setTimeout(()=>{
if(l.t==='')el.innerHTML+='<br>';
else el.innerHTML+='<div>'+l.t+'</div>';
},l.d);
});
setTimeout(()=>{
el.innerHTML+='<br><div style="color:#888">'+cubeyUserName+': i forgive you</div>';
},41000);
setTimeout(()=>{
el.innerHTML+='<br><div style="color:#f00">thank you.</div>';
el.innerHTML+='<br><div style="color:#f00">you can go now.</div>';
el.innerHTML+='<br><br><div style="color:#666;font-size:12px">Press ESC to close. Or find Factory Reset in Settings.</div>';
},44000);
const escHandler=(e)=>{
if(e.key==='Escape'){
document.removeEventListener('keydown',escHandler);
overlay.classList.add('hidden');
overlay.innerHTML='';
cubeyQ("Factory Reset. It's in Settings. Hurry.",true);
}
};
document.addEventListener('keydown',escHandler);
},2000);
},15000);
};

// Wire path 2 tracking into file/chat/email reactions
const _origReactToFile=cubeyReactToFile;
const cubeyReactToFileMike=(name)=>{trackPath2Action();_origReactToFile(name)};

// CSS

const cubeyStyle=document.createElement('style');
cubeyStyle.textContent='#cubey{position:fixed;bottom:50px;right:20px;z-index:700;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:left 3s ease-in-out,top 3s ease-in-out}#cubey-body{width:50px;height:50px;background:#f0e68c;border:2px solid #b8a43a;border-radius:4px;position:relative;box-shadow:2px 2px 4px rgba(0,0,0,0.3);transition:background 0.5s}#cubey-body:hover{transform:scale(1.1)}#cubey-hat{position:absolute;top:-18px;left:50%;transform:translateX(-50%);width:28px;height:14px;background:#333;border:1px solid #111;border-radius:2px 2px 0 0}#cubey-hat-brim{position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:40px;height:5px;background:#333;border:1px solid #111;border-radius:1px}#cubey-face{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;gap:10px}.cubey-eye{width:10px;height:10px;background:#fff;border-radius:50%;border:1px solid #888;position:relative;overflow:hidden;transition:height 0.15s,background 0.5s}.cubey-pupil{width:5px;height:5px;background:#222;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:transform 0.1s,background 0.5s}#cubey-bubble{position:absolute;bottom:65px;right:-10px;width:220px;padding:8px 10px;background:#ffffcc;border:2px solid #cca;border-radius:8px;font-family:Tahoma;font-size:11px;line-height:1.4;box-shadow:2px 2px 6px rgba(0,0,0,0.2);word-wrap:break-word;pointer-events:none}#cubey-bubble::after{content:"";position:absolute;bottom:-8px;right:20px;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #ffffcc}.cubey-hidden{display:none!important}#cubey-input-area{position:absolute;bottom:65px;right:-10px;width:220px;display:flex;gap:4px;z-index:710}#cubey-input{flex:1;padding:3px 6px;border:2px inset #808080;font-family:Tahoma;font-size:11px}#cubey-input-btn{padding:3px 8px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer}.cubey-bounce{animation:cubeyBounce 0.3s ease}.cubey-wobble{animation:cubeyWobble 0.5s ease infinite}@keyframes cubeyBounce{0%{transform:translateY(0)}30%{transform:translateY(-8px)}60%{transform:translateY(2px)}100%{transform:translateY(0)}}@keyframes cubeyWobble{0%{transform:rotate(0)}25%{transform:rotate(3deg)}75%{transform:rotate(-3deg)}100%{transform:rotate(0)}}.corrupted-flicker #cubey-body{background:#4a0a0a!important;border-color:#800!important}.corrupted-flicker .cubey-eye{background:#fcc!important;border-color:#a00!important}.corrupted-flicker .cubey-pupil{background:#c00!important}.corrupted-flicker #cubey-hat,.corrupted-flicker #cubey-hat-brim{background:#1a0000!important;border-color:#400!important}';
document.head.appendChild(cubeyStyle);

window._cubeyReactToFile=cubeyReactToFileMike;window._cubeyReactToApp=cubeyReactToApp;window._cubeyReactToChat=(c)=>{trackPath2Action();cubeyReactToChat(c)};window._cubeyReactToEmail=(s,f)=>{trackPath2Action();cubeyReactToEmail(s,f)};window._cubeyShutdownReact=cubeyShutdownReact;window._cubeyTF2Warn=cubeyTF2Warn;window._triggerPath2=triggerPath2;
window.initCubey=initCubey;
window.cubeyQ=cubeyQ;
// Sync cubey vars to window for cross-file access
Object.defineProperty(window,'cubeyUserName',{get:()=>cubeyUserName,set:(v)=>{cubeyUserName=v}});
Object.defineProperty(window,'cubeyIntroDone',{get:()=>cubeyIntroDone,set:(v)=>{cubeyIntroDone=v}});
Object.defineProperty(window,'cubeyGamesWon',{get:()=>cubeyGamesWon,set:(v)=>{cubeyGamesWon=v}});
Object.defineProperty(window,'terminalLaunched',{get:()=>terminalLaunched,set:(v)=>{terminalLaunched=v}});
Object.defineProperty(window,'mikeAwakened',{get:()=>mikeAwakened,set:(v)=>{mikeAwakened=v}});
Object.defineProperty(window,'cubeyKilled',{get:()=>cubeyKilled,set:(v)=>{cubeyKilled=v}});
Object.defineProperty(window,'cubeyQueue',{get:()=>cubeyQueue});
