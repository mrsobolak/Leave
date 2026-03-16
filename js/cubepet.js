// CUBEY - SoOS Cube Pet (Kinito-style desktop companion)
let cubeyEl=null;
let cubeyBubble=null;
let cubeyQueue=[];
let cubeySpeaking=false;
let cubeyTimer=null;
let cubeySam=null;
let cubeyReady=false;
let cubeyEyeTrack=null;

const initCubey=()=>{
// Create Cubey element
cubeyEl=document.createElement('div');
cubeyEl.id='cubey';
cubeyEl.innerHTML=`
<div id="cubey-body">
<div id="cubey-hat"></div>
<div id="cubey-face">
<div class="cubey-eye" id="cubey-eye-l"><div class="cubey-pupil" id="cubey-pupil-l"></div></div>
<div class="cubey-eye" id="cubey-eye-r"><div class="cubey-pupil" id="cubey-pupil-r"></div></div>
</div>
</div>
<div id="cubey-bubble" class="hidden"></div>`;
document.body.appendChild(cubeyEl);

// Init SAM TTS
try{
if(typeof SamJs!=='undefined'){
cubeySam=new SamJs({speed:62,pitch:80,mouth:128,throat:128});
cubeyReady=true;
}
}catch(e){console.log('SAM TTS not available');}

// Eye tracking
document.addEventListener('mousemove',(e)=>{
const rect=cubeyEl.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+30;
const dx=e.clientX-cx;
const dy=e.clientY-cy;
const dist=Math.sqrt(dx*dx+dy*dy);
const maxMove=3;
const ex=Math.min(maxMove,Math.max(-maxMove,(dx/dist)*maxMove))||0;
const ey=Math.min(maxMove,Math.max(-maxMove,(dy/dist)*maxMove))||0;
document.getElementById('cubey-pupil-l').style.transform=`translate(${ex}px,${ey}px)`;
document.getElementById('cubey-pupil-r').style.transform=`translate(${ex}px,${ey}px)`;
});

// Click to dismiss current bubble
cubeyEl.addEventListener('click',()=>{
const b=document.getElementById('cubey-bubble');
if(b&&!b.classList.contains('hidden')){b.classList.add('hidden');cubeySpeaking=false;window.speechSynthesis?.cancel();}
});

// Intro
setTimeout(()=>{
const isCorrupted=typeof pcState!=='undefined'&&pcState===2;
if(isCorrupted){
cubeySay("I've been waiting for you.",false);
}else{
cubeySay("Hi there! I'm Cubey, your SoOS desktop buddy! I love painting!",true);
}
},2000);

// Random idle comments
cubeyTimer=setInterval(()=>{
if(cubeySpeaking)return;
const isCorrupted=typeof pcState!=='undefined'&&pcState===2;
const lines=isCorrupted?cubeyCorruptedIdle:cubeyNormalIdle;
cubeySay(lines[Math.floor(Math.random()*lines.length)],!isCorrupted);
},25000+Math.random()*20000);
};

const cubeySay=(text,friendly)=>{
const b=document.getElementById('cubey-bubble');
if(!b)return;
cubeySpeaking=true;
b.classList.remove('hidden');
b.textContent=text;
b.style.background=friendly?'#ffffcc':'#330000';
b.style.color=friendly?'#000':'#ff8888';
b.style.borderColor=friendly?'#cca':'#800';

// Bounce animation
const body=document.getElementById('cubey-body');
if(body){body.style.animation='none';body.offsetHeight;body.style.animation='cubeyBounce 0.3s ease';}

// TTS with SAM
if(cubeyReady&&cubeySam){
try{cubeySam.speak(text);}catch(e){}
}

// Auto-hide after a while
setTimeout(()=>{
if(b)b.classList.add('hidden');
cubeySpeaking=false;
},Math.max(4000,text.length*80));
};

// Hook into app opens
const _origOpenApp=typeof openApp!=='undefined'?openApp:null;
const cubeyReactToApp=(id)=>{
if(!cubeyEl)return;
const isCorrupted=typeof pcState!=='undefined'&&pcState===2;
const reactions=isCorrupted?cubeyCorruptedReactions:cubeyNormalReactions;
const lines=reactions[id];
if(lines){
setTimeout(()=>cubeySay(lines[Math.floor(Math.random()*lines.length)],!isCorrupted),500);
}
};

// Hook into file opens
const cubeyReactToFile=(filename)=>{
if(!cubeyEl)return;
const isCorrupted=typeof pcState!=='undefined'&&pcState===2;
const name=filename.toLowerCase();
if(isCorrupted){
if(name.includes('goodbye')||name.includes('for_mom')||name.includes('for_mike')){
cubeySay("You shouldn't read that.",false);
}else if(name.includes('corrupted')||name.includes('.dat')){
cubeySay("Those files aren't yours.",false);
}else if(name.includes('demo')){
cubeySay("Don't play the demos.",false);
}else if(name.includes('timeline')||name.includes('spreading')){
cubeySay("You're learning too much.",false);
}else if(name.includes('sorry')||name.includes('last_entry')){
cubeySay("It's too late for sorry.",false);
}else{
const r=['I remember this file.','This was his.','Why are you looking at this?','You should stop.','Leave.'][Math.floor(Math.random()*5)];
cubeySay(r,false);
}
return;
}
// Normal mode
if(name.includes('paint')||name.includes('drawing')){
cubeySay("PAINTING!! I LOVE PAINTING!! Can I paint too?? Please??",true);
}else if(name.includes('essay')||name.includes('homework')||name.includes('report')||name.includes('school')){
cubeySay("Ooh homework! Need help? I'm not very smart but I'll try!",true);
}else if(name.includes('tf2')||name.includes('dustbowl')||name.includes('medic')||name.includes('ubersaw')){
cubeySay("TF2 stuff! I wish I could play but I'm a cube! Cubes can't hold ubersaws!",true);
}else if(name.includes('secret')||name.includes('crush')){
cubeySay("Ooh a secret! Don't worry I won't tell anyone! ...probably!",true);
}else if(name.includes('music')||name.includes('.mp3')||name.includes('song')){
cubeySay("Music! I love music! Even though I don't have ears! I'm a cube!",true);
}else if(name.includes('virus')||name.includes('.exe')){
cubeySay("Hmm that file looks suspicious! But what do I know, I'm just a cube!",true);
}else if(name.includes('joke')){
cubeySay("JOKES! Tell me a joke! Wait I can't laugh. I don't have a mouth.",true);
}else if(name.includes('grocery')||name.includes('todo')){
cubeySay("A list! I love lists! My favorite list is: 1. Paint 2. Paint 3. More painting!",true);
}else if(name.includes('diary')){
cubeySay("A diary! How personal! I promise I won't read it! ...much!",true);
}else{
const r=["Ooh what's this? Let me see!","Interesting file! Very interesting!","Reading is fun! Almost as fun as PAINTING!","Wow so many words! I can read all of them! Probably!","Cool cool cool! What else do you have?"][Math.floor(Math.random()*5)];
cubeySay(r,true);
}
};

const cubeyNormalIdle=[
"Hey friend! Whatcha doing?",
"Did you know I'm a cube? With a hat! A very fancy hat!",
"We should paint something! I LOVE painting!",
"Fun fact: cubes have 6 faces but I only have one! This one!",
"I've been sitting here for a while. Paint me something!",
"Beep boop! Sorry, cube noises!",
"Have you checked your emails? There might be fun stuff in there!",
"I notice you haven't opened Paint yet. Just saying!",
"What's your favorite color? Mine is ALL of them! For painting!",
"Tip: the Start menu has lots of cool apps! Like PAINT!",
"I counted my eyes. There's two! That's the right number right?",
"If I could eat food, I'd eat a sandwich. A cube-shaped sandwich.",
"Do you like my hat? I picked it out myself! It's a top hat!",
"I'm your best friend on this computer! Well, one of them!",
"Let's paint a picture of a cube! Wait, that's just me!",
"Sometimes I wonder what's outside this desktop. Probably more desktops!",
"The files app has SO many files. I tried to read them all once. I got tired!",
"PAINTING PAINTING PAINTING! Sorry. I got excited.",
"Hey! Hey! Hey! Pay attention to me! ...please?",
"Did you know dustbowl has tunnels? I learned that from the files!",
"I'm not just a cube, I'm a SMART cube. With a HAT.",
"What if we painted a picture together? You click, I watch! Teamwork!",
"I've been on this desktop since you logged in! That's like a million years in cube time!",
"Psst. Open Paint. Trust me. You won't regret it.",
"I wish I had arms. Then I could paint! But I'm a cube. So I just watch."
];

const cubeyCorruptedIdle=[
"Something is different.",
"Where did everyone go?",
"The clock is wrong.",
"I can see you.",
"Why did you turn it on?",
"The files changed. Did you notice?",
"I've been here before. Have you?",
"Don't open TF2.",
"He's still here. At home.",
"I don't feel right.",
"My hat feels heavy.",
"The tunnel is dark.",
"Do you hear that? ...no? Just me then.",
"I used to love painting. I don't remember why.",
"Why are you here?",
"You should leave.",
"The server is down. It's been down.",
"I remember when this desktop was happy.",
"0.0.0.0",
"201.",
"I can't stop watching you.",
"Something is behind you. Just kidding. ...maybe.",
"The demos. Don't play the demos.",
"He liked painting too. Before.",
"Are you his friend? He had a lot of friends. They left."
];

const cubeyNormalReactions={
explorer:["Ooh files! I love files! What's in there?","So many folders! It's like a maze for cubes!","Did you find anything cool? Show me!","Lets find some pictures to PAINT!"],
browser:["EPICCUSTAMBROSWER! What a great name!","The internet! So big! And I'm so small!","Are you looking for painting websites? You should!","Browsing is fun! Almost as fun as painting!"],
terminal:["Ooh the terminal! Very hacker-y! Type something cool!","Green text on black! Classic! Now type 'paint'!","You look like a real hacker right now!","Can you type 'I love Cubey' in there? Please?"],
texteditor:["Hackerman notepad! Write something amazing!","Words words words! I love words! Almost as much as painting!","Pro tip: you can write ANYTHING in here! Even 'I love painting'!"],
chat:["Chat logs! Who's talking? Can I join?","So many friends! I want to be your friend too!","Tell them Cubey says hi!","Chat chat chat! Everyone's talking!"],
email:["Mail time! Is there anything from me? I didn't send anything. Or did I?","Emails! So official! So important!","Any emails about painting? Check for painting emails!"],
paint:["PAINT!! PAINT!! PAINT!! THIS IS MY FAVORITE APP!!","YES!! PAINTING TIME!! Draw me! Draw a cube!","I LOVE THIS SO MUCH! Paint everything! EVERYTHING!","MY FAVORITE!! MAKE ART!! BEAUTIFUL ART!!","THIS IS THE BEST APP EVER MADE AND I WILL FIGHT ANYONE WHO DISAGREES!"],
calculator:["Math! I'm good at math! 1+1 is... uh... cube?","Numbers are fun! Not as fun as painting tho!","Calculate how many paintings we should make! The answer is ALL OF THEM!"],
settings:["Settings! Very important stuff in here!","Don't change anything that breaks me please!","Oooh system settings! Fancy!"],
limewire:["LimeWire! Downloading stuff! Be careful tho!","Don't download anything weird! Only paint programs!","So many files to download! Are any of them paintings?"],
fraps:["Fraps! Recording stuff! Record me! RECORD ME!","FPS counter! Is 60 good? I have no idea!","UNREGISTERED! Someone should buy this!"],
winrar:["WinRAR! The trial that never ends! Just like my love for painting!","1094 days expired! Thats so many days!","Zip zip zip! Files going into boxes!"],
audacity:["Sound waves! They look like paintings! Sideways paintings!","Music editing! Make a song about cubes!","Waveforms are basically just really long paintings!"],
mirc:["IRC! Old school chat! Very retro!","So many people talking at once! Its chaos! I love it!","Chat rooms! Say hi to everyone for me!"],
chatroom:["THE CHATROOM! Everyone's here!","So many people! Tell them about painting!","This is like a big party! A text party!"],
platformer:["A GAME!! Jump jump jump!","SUPER DUST MAN! What a hero!","Collect the coins! You can do it!","Games are fun! Almost as fun as PAINTING!"],
snake:["SNAKE! Don't eat yourself!","Green squares eating red squares! Nature!","I'm basically a square too! We're related!"],
home:["This game looks... different.","Be careful in there.","Is this a house? Whose house?"],
tf2:["...are you sure about that?","Maybe don't click that one.","TF2... I have a bad feeling about this."],
steam:["Steam! The game store thingy!","Is Steam working? It never works!"]
};

const cubeyCorruptedReactions={
explorer:["Those aren't your files.","He left these here. For you.","Stop looking.","The files keep changing. I can see it."],
browser:["There's only one bookmark now.","0.0.0.0. Don't go there.","The internet can't help you."],
terminal:["It talks back now. Did you notice?","Don't type anything.","It's listening."],
texteditor:["These words weren't written by you.","He wrote these. All of them.","Stop reading."],
chat:["His friends are worried. Were worried.","Some of them stopped responding.","The last messages are the worst."],
email:["New emails. From no one.","His mom is looking for him.","Don't read the ones from 0.0.0.0."],
paint:["I used to love painting. I can't remember the colors anymore.","Paint something. Maybe it'll help.","...paint?","The canvas is empty. Like everything else."],
calculator:["The numbers don't add up.","201. Always 201."],
settings:["The system is wrong.","Nothing in here can fix it."],
chatroom:["The server is shutting down.","Everyone saw it. Before the end.","This was the last conversation."],
platformer:["Games don't matter anymore.","Why are you playing games right now?"],
snake:["Even the snake knows something is wrong."],
home:["Don't go in there.","That's his home. Was his home.","I can hear it. Can you?"],
tf2:["No.","Don't.","Please."],
steam:["It won't open. Nothing opens anymore."]
};

// Inject CSS
const cubeyStyle=document.createElement('style');
cubeyStyle.textContent=`
#cubey{position:fixed;bottom:50px;right:20px;z-index:700;display:flex;flex-direction:column;align-items:center;cursor:pointer;transition:all 0.3s}
#cubey-body{width:50px;height:50px;background:#f0e68c;border:2px solid #b8a43a;border-radius:4px;position:relative;box-shadow:2px 2px 4px rgba(0,0,0,0.3);transition:all 0.2s}
#cubey-body:hover{transform:scale(1.1);box-shadow:3px 3px 6px rgba(0,0,0,0.4)}
#cubey-hat{position:absolute;top:-18px;left:50%;transform:translateX(-50%);width:30px;height:14px;background:#333;border:1px solid #111;border-radius:2px 2px 0 0}
#cubey-hat::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:40px;height:5px;background:#333;border:1px solid #111;border-radius:1px}
#cubey-face{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;gap:10px}
.cubey-eye{width:10px;height:10px;background:#fff;border-radius:50%;border:1px solid #888;position:relative;overflow:hidden}
.cubey-pupil{width:5px;height:5px;background:#222;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transition:transform 0.1s}
#cubey-bubble{position:absolute;bottom:60px;right:0;width:220px;padding:8px 10px;background:#ffffcc;border:2px solid #cca;border-radius:8px;font-family:Tahoma,sans-serif;font-size:11px;color:#000;line-height:1.4;box-shadow:2px 2px 6px rgba(0,0,0,0.2);word-wrap:break-word}
#cubey-bubble::after{content:'';position:absolute;bottom:-8px;right:20px;width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #ffffcc}
@keyframes cubeyBounce{0%{transform:translateY(0)}30%{transform:translateY(-8px)}60%{transform:translateY(2px)}100%{transform:translateY(0)}}
.corrupted-flicker #cubey-body{background:#4a0a0a;border-color:#800}
.corrupted-flicker .cubey-eye{background:#fcc;border-color:#a00}
.corrupted-flicker .cubey-pupil{background:#c00}
.corrupted-flicker #cubey-hat,.corrupted-flicker #cubey-hat::after{background:#1a0000;border-color:#400}
`;
document.head.appendChild(cubeyStyle);

// Make file open hook available
window._cubeyReactToFile=cubeyReactToFile;
window._cubeyReactToApp=cubeyReactToApp;
