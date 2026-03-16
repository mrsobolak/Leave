let pcState=1;

const triggerTF2Launch=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

// custom video player - no controls, fullscreen, looks like the game is running
const video=document.createElement('video');
video.src='intro.mp4';
video.style.cssText='width:100%;height:100%;object-fit:cover;display:block';
video.autoplay=true;
video.playsInline=true;
video.muted=false;
video.setAttribute('playsinline','');

overlay.appendChild(video);

video.play().catch(()=>{
// if autoplay blocked, add click to play
const clickOverlay=document.createElement('div');
clickOverlay.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2';
clickOverlay.innerHTML='<div style="font-family:Tahoma,sans-serif;font-size:13px;color:#555">Click to continue</div>';
clickOverlay.addEventListener('click',()=>{
video.play();
clickOverlay.remove();
});
overlay.appendChild(clickOverlay);
});

// when video ends, show face
video.addEventListener('ended',()=>{
triggerFace();
});

// fallback if video fails to load
video.addEventListener('error',()=>{
triggerFace();
});
};

const triggerFace=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

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
WARNING: Unknown process running (PID 13)

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
