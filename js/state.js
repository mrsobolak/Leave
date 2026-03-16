let pcState=1;

const triggerJumpscare=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
overlay.style.background='#000';
overlay.style.cursor='none';

// inject all animations once
const style=document.createElement('style');
style.textContent=`
@keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.15) translateY(15px)}}
@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes darken{0%{filter:contrast(1.5) brightness(0.7) grayscale(0.8) saturate(0.3)}50%{filter:contrast(2.2) brightness(0.4) grayscale(1) saturate(0)}100%{filter:contrast(3) brightness(0.2) grayscale(1) saturate(0)}}
@keyframes dripDown{0%{height:0}100%{height:350px}}
@keyframes riseBlack{0%{height:0%}100%{height:55%}}
`;
document.head.appendChild(style);

const container=document.createElement('div');
container.style.cssText='position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;overflow:hidden';

// breathing wrapper (separate from the zoom so transforms dont clash)
const breatheWrap=document.createElement('div');
breatheWrap.style.cssText='animation:breathe 3s ease-in-out infinite;display:flex;align-items:center;justify-content:center';

// the face - zooms in slowly and gets darker
const img=document.createElement('img');
img.src='face.png';
img.style.cssText='max-width:70%;max-height:75%;object-fit:contain;animation:slowZoom 8s ease-in forwards,darken 8s ease-in forwards';

breatheWrap.appendChild(img);
container.appendChild(breatheWrap);

// black drip streaks falling down from random positions
for(let i=0;i<20;i++){
const streak=document.createElement('div');
const x=5+Math.random()*90;
const w=1+Math.random()*5;
const delay=Math.random()*4;
const dur=2+Math.random()*4;
const startY=15+Math.random()*45;
streak.style.cssText=`position:absolute;top:${startY}%;left:${x}%;width:${w}px;height:0;background:rgba(0,0,0,${0.6+Math.random()*0.4});z-index:4;animation:dripDown ${dur}s ease-in ${delay}s forwards;border-radius:0 0 2px 2px`;
container.appendChild(streak);
}

// black fog rising from bottom
const fog=document.createElement('div');
fog.style.cssText='position:absolute;bottom:0;left:0;width:100%;height:0%;background:linear-gradient(0deg,#000 0%,rgba(0,0,0,0.8) 60%,transparent 100%);z-index:5;animation:riseBlack 8s ease-in forwards';
container.appendChild(fog);

overlay.appendChild(container);

// after 8 seconds of face, show XP-style BSOD
setTimeout(()=>{
overlay.style.cursor='default';
overlay.innerHTML='';
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
setTimeout(()=>corruptedReboot(),5000);
},8000);
};

const corruptedReboot=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.innerHTML='';
overlay.style.background='#000';
// clean up all windows
document.querySelectorAll('#windows-area .app-window').forEach(w=>w.remove());
Object.keys(openWindows).forEach(id=>{delete openWindows[id]});
document.getElementById('taskbar-apps').innerHTML='';
document.getElementById('desktop').classList.add('hidden');
document.getElementById('taskbar').style.display='none';
document.getElementById('start-menu').classList.add('hidden');

// glitchy dell reboot
const reboot=document.createElement('div');
reboot.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#0033aa';
reboot.classList.add('glitch-reboot');
reboot.innerHTML='<div class="r-dell-logo" style="font-family:Arial,Helvetica,sans-serif;font-size:96px;color:#fff;font-weight:bold;font-style:italic">DELL</div><div style="font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.5);margin-top:8px;letter-spacing:2px">XPS 420</div>';
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
