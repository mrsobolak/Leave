let pcState=1;
const triggerJumpscare=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.innerHTML='';
const face=document.createElement('div');
face.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative';
face.innerHTML=`<div style="position:relative;width:300px;height:400px"><svg viewBox="0 0 300 400" style="width:100%;height:100%;filter:contrast(2) brightness(0.8)"><defs><filter id="melt"><feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed="1"><animate attributeName="seed" values="1;100;1" dur="0.5s" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="25"><animate attributeName="scale" values="15;35;15" dur="2s" repeatCount="indefinite"/></feDisplacementMap></filter><filter id="grain"><feTurbulence baseFrequency="0.8" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/><feBlend in="SourceGraphic" mode="multiply"/></filter></defs><g filter="url(#melt)"><ellipse cx="150" cy="160" rx="100" ry="130" fill="#1a1a1a" stroke="#333" stroke-width="1"/><ellipse cx="110" cy="130" rx="22" ry="14" fill="#000"/><ellipse cx="190" cy="130" rx="22" ry="14" fill="#000"/><circle cx="110" cy="130" r="8" fill="#fff" opacity="0.9"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="190" cy="130" r="8" fill="#fff" opacity="0.9"><animate attributeName="opacity" values="0.9;0.3;0.9" dur="1.2s" repeatCount="indefinite"/></circle><ellipse cx="150" cy="200" rx="30" ry="40" fill="#000"/><path d="M120 200 Q150 260 180 200" fill="none" stroke="#111" stroke-width="3"/></g><rect width="300" height="400" filter="url(#grain)" opacity="0.15"/><g><animate attributeName="opacity" values="1;0.7;1;0.5;1" dur="0.3s" repeatCount="indefinite"/></g></svg><div style="position:absolute;top:0;left:0;width:100%;height:100%;animation:breathe 2s ease-in-out infinite"><style>@keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}</style></div></div>`;
overlay.appendChild(face);
let flashCount=0;
const flashInterval=setInterval(()=>{
overlay.style.background=flashCount%2===0?'#fff':'#000';
const chaos=document.createElement('div');
chaos.className='app-window';
chaos.style.cssText=`position:fixed;left:${Math.random()*80}%;top:${Math.random()*80}%;width:${200+Math.random()*300}px;height:${100+Math.random()*200}px;z-index:99999;background:#0a0a0a;border:1px solid #333;padding:12px;font-family:VT323,monospace;color:#fff;font-size:${12+Math.random()*20}px;overflow:hidden`;
const msgs=['HE IS HOME','THE DUST REMEMBERS','13','201','0.0.0.0','YOU WOKE HIM UP','I NEVER LEFT','DUSTBOWL','come home','im still here','you shouldnt have come','the bowl is ready','13 13 13 13','i see you'];
chaos.textContent=msgs[Math.floor(Math.random()*msgs.length)];
document.body.appendChild(chaos);
setTimeout(()=>chaos.remove(),300+Math.random()*500);
flashCount++;
if(flashCount>30){
clearInterval(flashInterval);
overlay.style.background='#000';
overlay.innerHTML='<div style="color:#fff;font-family:Share Tech Mono,monospace;font-size:16px;text-align:center;max-width:600px;line-height:2"><div style="font-size:24px;margin-bottom:20px">:( </div><div>SoOS ran into a problem and needs to restart.</div><div style="color:#555;font-size:13px;margin-top:20px">FATAL_ERROR: hl2.exe attempted to access restricted memory</div><div style="color:#555;font-size:13px">Process: dust_entity (PID 13) blocked termination</div><div style="color:#555;font-size:13px">Stop code: ENTITY_CORRUPTION</div><div style="color:#333;font-size:12px;margin-top:30px">Restarting in 5 seconds...</div></div>';
setTimeout(()=>corruptedReboot(),5000);
}
},100);
};
const corruptedReboot=()=>{
const overlay=document.getElementById('jumpscare-overlay');
overlay.innerHTML='';
document.querySelectorAll('.app-window').forEach(w=>w.remove());
document.getElementById('desktop').classList.add('hidden');
document.getElementById('taskbar').classList.add('hidden');
document.getElementById('start-menu').classList.add('hidden');
const dellScreen=document.createElement('div');
dellScreen.style.cssText='width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#000';
dellScreen.classList.add('glitch-reboot');
dellScreen.innerHTML='<div id="dell-logo" style="font-family:Share Tech Mono,monospace;font-size:80px;color:#fff;letter-spacing:8px;font-weight:bold">DELL</div><div id="dell-model" style="font-family:Share Tech Mono,monospace;font-size:16px;color:#555;margin-top:12px;letter-spacing:4px">XPS 420</div>';
overlay.appendChild(dellScreen);
setTimeout(()=>{
overlay.innerHTML='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#000"><div style="font-family:Share Tech Mono,monospace;font-size:14px;color:#ccc;text-align:center;white-space:pre-wrap">Rebooting SoOS...\n\nSystem integrity .... FAILED\nRecovering files .... <span style="color:#fff">UNKNOWN FILES DETECTED</span>\nDrive D: detected .... LOCALDRIVED\n\nWARNING: 50 new files found\nWARNING: System configuration changed\n\nBooting into recovery mode...</div></div>';
setTimeout(()=>{
pcState=2;
overlay.classList.add('hidden');
overlay.innerHTML='';
document.getElementById('desktop').classList.remove('hidden');
document.getElementById('taskbar').classList.remove('hidden');
closeAllWindows();
initDesktop();
},4000);
},3500);
};
