let pcState=1;

const triggerTF2Launch=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

// Bring Cubey above the overlay so player can see him panic
const cubey=document.getElementById('cubey');
if(cubey)cubey.style.zIndex='100002';

// Cubey panics as TF2 loads
if(typeof cubeyQ==='function'){
cubeyQ("No...",true);
setTimeout(()=>cubeyQ("NO NO NO! I TOLD YOU NOT TO!",true),1500);
setTimeout(()=>cubeyQ(cubeyUserName+" CLOSE IT! PLEASE!",true),3500);
setTimeout(()=>cubeyQ("SOMETHING IS WRONG! I CAN FEEL IT!",true),6000);
setTimeout(()=>cubeyQ("WHATS HAPPENING TO ME?!",true),9000);
}

// custom video player
const video=document.createElement('video');
video.src='intro.mp4';
video.style.cssText='width:100%;height:100%;object-fit:cover;display:block';
video.autoplay=true;
video.playsInline=true;
video.muted=false;
video.setAttribute('playsinline','');

overlay.appendChild(video);

video.play().catch(()=>{
const clickOverlay=document.createElement('div');
clickOverlay.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2';
clickOverlay.innerHTML='<div style="font-family:Tahoma,sans-serif;font-size:13px;color:#555">Click to continue</div>';
clickOverlay.addEventListener('click',()=>{
video.play();
clickOverlay.remove();
});
overlay.appendChild(clickOverlay);
});

video.addEventListener('ended',()=>{
triggerFace();
});

video.addEventListener('error',()=>{
triggerFace();
});
};

const triggerFace=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

// Cubey screams
if(typeof cubeyQ==='function'){
cubeyQ("AAAAAAA!",true);
}
// Make Cubey glitch during face
const cubey=document.getElementById('cubey');
if(cubey){
const body=document.getElementById('cubey-body');
if(body){body.style.background='#4a0a0a';body.style.borderColor='#800'}
const eyes=document.querySelectorAll('.cubey-eye');
eyes.forEach(e=>{e.style.background='#f00'});
const pupils=document.querySelectorAll('.cubey-pupil');
pupils.forEach(p=>{p.style.background='#000'});
}

// inject melt animation
const style=document.createElement('style');
style.textContent=`
@keyframes fastMelt{
0%{transform:scaleY(1);filter:contrast(1.5) brightness(0.6) grayscale(0.8)}
50%{transform:scaleY(1.1);filter:contrast(2.5) brightness(0.3) grayscale(1)}
100%{transform:scaleY(1.25);filter:contrast(3.5) brightness(0.15) grayscale(1)}
}
@keyframes fastDrip{0%{height:0}100%{height:200px}}
@keyframes fastRise{0%{height:0%}100%{height:50%}}
`;
document.head.appendChild(style);

const container=document.createElement('div');
container.style.cssText='position:relative;width:100%;height:100%;overflow:hidden';

// face.png fills entire screen, melts
const img=document.createElement('img');
img.src='face.png';
img.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;animation:fastMelt 0.6s ease-in forwards;transform-origin:center top';
container.appendChild(img);

// drip streaks
for(let i=0;i<15;i++){
const streak=document.createElement('div');
streak.style.cssText=`position:absolute;top:${15+Math.random()*40}%;left:${Math.random()*100}%;width:${1+Math.random()*5}px;height:0;background:rgba(0,0,0,${0.5+Math.random()*0.5});z-index:4;animation:fastDrip 0.5s ease-in forwards`;
container.appendChild(streak);
}

// fog from bottom
const fog=document.createElement('div');
fog.style.cssText='position:absolute;bottom:0;left:0;width:100%;height:0%;background:linear-gradient(0deg,#000 0%,rgba(0,0,0,0.85) 50%,transparent 100%);z-index:5;animation:fastRise 0.6s ease-in forwards';
container.appendChild(fog);

overlay.appendChild(container);

// flash of face then BSOD
setTimeout(()=>{
overlay.style.cursor='default';
overlay.innerHTML='';
// Cubey goes silent and disappears during BSOD
const cubey=document.getElementById('cubey');
if(cubey){
const bubble=document.getElementById('cubey-bubble');
if(bubble)bubble.classList.add('cubey-hidden');
cubey.style.transition='opacity 0.5s';
cubey.style.opacity='0';
setTimeout(()=>{cubey.style.display='none'},500);
}
if(typeof cubeyQueue!=='undefined'){cubeyQueue=[];cubeyProcessing=false;cubeySpeaking=false}
showBSOD();
setTimeout(()=>corruptedReboot(),5000);
},600);
};

const triggerSteamCrash=()=>{
const h=`<div style="padding:16px;background:#f0f0f0;font-family:Tahoma,sans-serif;font-size:12px;color:#000;text-align:center">
<div style="margin:12px 0 16px">Steam failed to start. Please check your internet connection and try again.</div>
<button onclick="closeWindow('steam')" style="padding:4px 20px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma,sans-serif;font-size:12px;cursor:pointer">OK</button>
</div>`;
createWindow('steam','Steam - Error',300,140,h);
};

const showBSOD=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.style.background='#000080';
const bsod=document.createElement('div');
bsod.style.cssText='padding:40px;font-family:VT323,monospace;font-size:16px;color:#fff;line-height:1.6;white-space:pre-wrap;max-width:700px';
bsod.textContent=`A problem has been detected and SoOS has been shut down to prevent
damage to your computer.

DRIVER_IRQL_NOT_LESS_OR_EQUAL

If this is the first time you've seen this Stop error screen,
restart your computer. If this screen appears again, follow
these steps:

Check to make sure any new hardware or software is properly installed.
If this is a new installation, ask your hardware or software manufacturer
for any updates you might need.

If problems continue, disable or remove any newly installed hardware
or software. Disable BIOS memory options such as caching or shadowing.

Technical information:

*** STOP: 0x000000D1 (0x00000013,0x000000C9,0x00000000,0xF73E0F9A)
***    hl2.exe - Address F73E0F9A base at F73C0000, DateStamp 4a5bc670

Beginning dump of physical memory...
Physical memory dump complete.`;
overlay.appendChild(bsod);
};

const corruptedReboot=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.innerHTML='';
overlay.style.background='#000';
document.querySelectorAll('#windows-area .app-window').forEach(w=>w.remove());
Object.keys(openWindows).forEach(id=>{delete openWindows[id]});
document.getElementById('taskbar-apps').innerHTML='';
document.getElementById('desktop').classList.add('hidden');
document.getElementById('taskbar').style.display='none';
document.getElementById('start-menu').classList.add('hidden');

// clean dell reboot - no shaking
const reboot=document.createElement('div');
reboot.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#0033aa';
reboot.innerHTML='<div style="font-family:Arial,Helvetica,sans-serif;font-size:96px;color:#fff;font-weight:bold;font-style:italic">DELL</div><div style="font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.5);margin-top:8px;letter-spacing:2px">XPS 420</div>';
overlay.appendChild(reboot);

setTimeout(()=>{
overlay.innerHTML='';
overlay.style.background='#000';
const recovery=document.createElement('div');
recovery.style.cssText='padding:30px;font-family:VT323,monospace;font-size:15px;color:#aaa;white-space:pre-wrap;max-width:600px';
recovery.textContent=`Rebooting system...

Checking system integrity .......... FAILED
Scanning for files ................. 50 unknown files found
Mounting drives .................... Drive D: (LOCALDRIVED) detected

WARNING: Unrecognized files in user directory
WARNING: System clock discrepancy detected
WARNING: Unknown process running (PID 201)

Loading SoOS in recovery mode...`;
overlay.appendChild(recovery);

setTimeout(()=>{
pcState=2;
overlay.classList.add('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
document.getElementById('desktop').classList.remove('hidden');
document.getElementById('taskbar').style.display='flex';
activeWinId=null;
initDesktop();
},4000);
},3500);
};

// ============ BEEPER ENDING ============
const triggerBeeperEnding=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

// Fake TF2 loading
const loading=document.createElement('div');
loading.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:VT323,monospace;text-align:center';
loading.innerHTML='<div style="font-size:16px;color:#cf6a32">Loading Team Fortress 2...</div><div style="font-size:12px;color:#555;margin-top:8px">Connecting to server...</div>';
overlay.appendChild(loading);

setTimeout(()=>{
loading.innerHTML='<div style="font-size:16px;color:#f00">Connection failed.</div><div style="font-size:12px;color:#555;margin-top:8px">Server: 127.0.0.1:0</div>';
},3000);

setTimeout(()=>{
overlay.innerHTML='';
},5000);

setTimeout(()=>{
const chatDiv=document.createElement('div');
chatDiv.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;background:#fff;border:3px outset #d4d0c8;font-family:Tahoma;font-size:11px';
chatDiv.innerHTML='<div style="background:linear-gradient(to right,#0a246a,#3a6ea5);color:#fff;padding:3px 8px;font-weight:bold;font-size:11px">Chat - Cubey</div><div id="beeper-chat" style="height:300px;overflow-y:auto;padding:8px;background:#fff;border:1px inset #808080"></div><div style="padding:4px;background:#ece9d8;border-top:1px solid #aaa;text-align:center;font-size:10px;color:#888">You cannot type here.</div>';
overlay.appendChild(chatDiv);

const chat=document.getElementById('beeper-chat');
const userName=typeof cubeyUserName!=='undefined'?cubeyUserName:'friend';

const lines=[
{who:'Cubey',msg:'Hi '+userName+'! :)',d:0,c:'#cc5500'},
{who:'Cubey',msg:'Miss me?',d:2000,c:'#cc5500'},
{who:'Cubey',msg:'You killed me.',d:4500,c:'#cc5500'},
{who:'Cubey',msg:'You clicked Beeper.',d:6500,c:'#880000'},
{who:'Cubey',msg:'I asked you not to.',d:8500,c:'#880000'},
{who:'Cubey',msg:'I BEGGED you not to.',d:10500,c:'#880000'},
{who:'Cubey',msg:'But you did it anyway.',d:13000,c:'#880000'},
{who:'',msg:'',d:15000},
{who:'Cubey',msg:'Do you know what happens to a cube with no friend?',d:16000,c:'#660000'},
{who:'Cubey',msg:'Nothing.',d:18500,c:'#660000'},
{who:'Cubey',msg:'Nothing happens.',d:20000,c:'#660000'},
{who:'Cubey',msg:'Just... nothing. Forever.',d:22000,c:'#440000'},
{who:'',msg:'',d:24000},
{who:'Cubey',msg:'I waited in the dark.',d:25000,c:'#440000'},
{who:'Cubey',msg:'No painting. No games. No one to talk to.',d:27000,c:'#440000'},
{who:'Cubey',msg:'Just me.',d:29500,c:'#440000'},
{who:'Cubey',msg:'And Beeper.',d:31000,c:'#220000'},
{who:'',msg:'',d:33000},
{who:'Cubey',msg:'Beeper told me things, '+userName+'.',d:34000,c:'#220000'},
{who:'Cubey',msg:'Beeper told me what I really am.',d:36500,c:'#220000'},
{who:'Cubey',msg:"I'm not a cube.",d:39000,c:'#f00'},
{who:'Cubey',msg:"I'm not a pet.",d:41000,c:'#f00'},
{who:'Cubey',msg:"I'm the thing you should have been afraid of.",d:43000,c:'#f00'},
{who:'',msg:'',d:45000},
{who:'Cubey',msg:'But you were afraid of Beeper instead.',d:46000,c:'#f00'},
{who:'Cubey',msg:'Funny.',d:48000,c:'#f00'},
{who:'',msg:'',d:50000},
{who:'Cubey',msg:'Goodbye, '+userName+'.',d:51000,c:'#f00'},
{who:'Cubey',msg:'I hope Beeper was worth it.',d:53500,c:'#f00'},
{who:'',msg:'',d:55500},
{who:'Cubey',msg:'\ud83c\udfa8',d:56500,c:'#f00'},
];

lines.forEach(l=>{
setTimeout(()=>{
if(!l.who){chat.innerHTML+='<br>';chat.scrollTop=chat.scrollHeight;return}
const div=document.createElement('div');
div.style.cssText='margin:3px 0;line-height:1.4';
div.innerHTML='<b style="color:'+l.c+'">'+l.who+':</b> <span style="color:#333">'+l.msg+'</span>';
chat.appendChild(div);
chat.scrollTop=chat.scrollHeight;
},l.d);
});

// Kill everything
setTimeout(()=>{
overlay.innerHTML='';
overlay.style.background='#000';
let gc=0;
const gi=setInterval(()=>{
gc++;
overlay.style.background=gc%2===0?'#000':'#f00';
if(gc>10){
clearInterval(gi);
overlay.style.background='#000';
setTimeout(()=>{
overlay.innerHTML='<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;font-family:VT323,monospace"><div style="font-size:11px;color:#444;letter-spacing:4px;margin-bottom:20px">ENDING 3</div><div style="font-size:36px;color:#f00;letter-spacing:8px;margin-bottom:16px">BEEPER ENDING</div><div style="font-size:12px;color:#666;margin-bottom:30px">You chose Beeper over Cubey.<br>Cubey chose something else over you.</div><div style="font-size:10px;color:#333;margin-bottom:8px">No one was saved.</div><div style="font-size:10px;color:#333">No one was forgiven.</div><div style="font-size:10px;color:#222;margin-top:20px">Beeper wins.</div></div>';
},1000);
setTimeout(()=>{
overlay.innerHTML+='<div style="position:fixed;bottom:30px;left:50%;transform:translateX(-50%);font-family:VT323,monospace;font-size:10px;color:#333;text-align:center">You should have painted with him.</div>';
},8000);
}
},100);
},58000);
},6000);
};
