let pcState=1;

const triggerTF2Launch=()=>{
// show TF2 loading screen first
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='default';

const loading=document.createElement('div');
loading.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#2b2b2b';
loading.innerHTML=`
<div style="font-family:Arial,sans-serif;font-size:32px;color:#f0ad4e;font-weight:bold;letter-spacing:2px;margin-bottom:8px">TEAM FORTRESS 2</div>
<div style="font-family:Arial,sans-serif;font-size:13px;color:#808080;margin-bottom:40px">Powered by Source</div>
<div style="width:300px;height:4px;background:#1a1a1a;border:1px solid #444;overflow:hidden">
<div id="tf2-load-bar" style="width:0%;height:100%;background:#f0ad4e;transition:width 0.3s"></div>
</div>
<div style="font-family:Arial,sans-serif;font-size:11px;color:#555;margin-top:12px">Loading...</div>
<div style="font-family:Arial,sans-serif;font-size:10px;color:#333;margin-top:30px">Map: cp_dustbowl</div>
`;
overlay.appendChild(loading);

// animate loading bar
let pct=0;
const bar=document.getElementById('tf2-load-bar');
const iv=setInterval(()=>{
pct+=Math.random()*3+1;
if(pct>78)pct=78;
if(bar)bar.style.width=pct+'%';
},200);

// after a minute of "loading", jumpscare hits
setTimeout(()=>{
clearInterval(iv);
if(bar)bar.style.width='100%';
setTimeout(()=>{
// brief black flash then face
overlay.innerHTML='';
overlay.style.background='#000';
setTimeout(()=>triggerJumpscare(),500);
},800);
},8000);
};

const triggerJumpscare=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

const style=document.createElement('style');
style.textContent=`
@keyframes meltStretch{
0%{transform:scaleY(1);filter:contrast(1.4) brightness(0.7) grayscale(0.7) saturate(0.3)}
20%{transform:scaleY(1.03);filter:contrast(1.6) brightness(0.6) grayscale(0.8) saturate(0.2)}
40%{transform:scaleY(1.08);filter:contrast(1.9) brightness(0.5) grayscale(0.9) saturate(0.1)}
60%{transform:scaleY(1.15);filter:contrast(2.3) brightness(0.35) grayscale(1) saturate(0)}
80%{transform:scaleY(1.25);filter:contrast(2.8) brightness(0.25) grayscale(1) saturate(0)}
100%{transform:scaleY(1.4);filter:contrast(3.5) brightness(0.15) grayscale(1) saturate(0)}
}
@keyframes dripDown{0%{height:0}100%{height:400px}}
@keyframes riseBlack{0%{height:0%}100%{height:60%}}
`;
document.head.appendChild(style);

const container=document.createElement('div');
container.style.cssText='position:relative;width:100%;height:100%;overflow:hidden';

// face.png stretched to fill entire screen, NO movement, just melts
const img=document.createElement('img');
img.src='face.png';
img.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;animation:meltStretch 8s ease-in forwards;transform-origin:center top';

container.appendChild(img);

// black drip streaks
for(let i=0;i<25;i++){
const streak=document.createElement('div');
const x=Math.random()*100;
const w=1+Math.random()*6;
const delay=Math.random()*4;
const dur=2+Math.random()*4;
const startY=10+Math.random()*40;
streak.style.cssText=`position:absolute;top:${startY}%;left:${x}%;width:${w}px;height:0;background:rgba(0,0,0,${0.5+Math.random()*0.5});z-index:4;animation:dripDown ${dur}s ease-in ${delay}s forwards;border-radius:0 0 2px 2px`;
container.appendChild(streak);
}

// black fog rising from bottom
const fog=document.createElement('div');
fog.style.cssText='position:absolute;bottom:0;left:0;width:100%;height:0%;background:linear-gradient(0deg,#000 0%,rgba(0,0,0,0.85) 50%,transparent 100%);z-index:5;animation:riseBlack 8s ease-in forwards';
container.appendChild(fog);

overlay.appendChild(container);

// after 8 seconds show XP BSOD
setTimeout(()=>{
overlay.style.cursor='default';
overlay.innerHTML='';
showBSOD(()=>{
setTimeout(()=>corruptedReboot(),5000);
});
},8000);
};

const triggerSteamCrash=()=>{
// steam just crashes - no face, straight to BSOD
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';

// brief steam splash then crash
const steam=document.createElement('div');
steam.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#1b2838';
steam.innerHTML=`
<div style="font-family:Arial,sans-serif;font-size:28px;color:#c7d5e0;font-weight:bold;letter-spacing:3px;margin-bottom:8px">STEAM</div>
<div style="font-family:Arial,sans-serif;font-size:12px;color:#66c0f4;margin-bottom:30px">Updating Steam...</div>
<div style="width:200px;height:3px;background:#1a1a2e;overflow:hidden">
<div style="width:35%;height:100%;background:#66c0f4"></div>
</div>
`;
overlay.appendChild(steam);

setTimeout(()=>{
overlay.innerHTML='';
showBSOD(()=>{
setTimeout(()=>corruptedReboot(),5000);
});
},2500);
};

const showBSOD=(cb)=>{
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
cb?.();
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

// dell reboot - NO shaking
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
