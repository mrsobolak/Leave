const typeText=(el,text,speed,cb)=>{let i=0;const iv=setInterval(()=>{if(i<text.length){el.innerHTML+=text[i]==='\n'?'\n':text[i];i++;el.scrollTop=el.scrollHeight}else{clearInterval(iv);cb?.()}},speed)};

const dellSplash=()=>{
if(window.soosAudio)soosAudio.playBoot();
setTimeout(()=>{
setTimeout(()=>{goToBios()},3500);
},200);
};

const goToBios=()=>{
document.getElementById('dell-splash').classList.add('hidden');
document.getElementById('bios').classList.remove('hidden');
biosPhase();
};

const biosPhase=()=>{
const el=document.getElementById('bios-content');
const lines=[
'Phoenix ROM BIOS PLUS Version 1.10 A07',
'Copyright 1985-2007 Phoenix Technologies Ltd.',
'All Rights Reserved',
'',
'',
'Dell System XPS 420',
'BIOS Version: A07',
'www.dell.com',
'',
'',
'Intel(R) Core(TM)2 Quad CPU  Q6600  @ 2.40GHz',
'Speed: 2.40 GHz                    Bus Speed: 1066 MHz',
'',
'System Bus Speed : 1333 MHz',
''
];
setTimeout(()=>{
typeText(el,lines.join('\n'),4,()=>{
setTimeout(()=>{
el.innerHTML+='\n<span style="color:#fff">4096 MB</span> System RAM, DDR2 SDRAM at 800 MHz\n';
el.innerHTML+='Dual Channel Mode : 2 x 2048 MB DDR2 PC2-6400\n';
el.innerHTML+='\n';
setTimeout(()=>{
el.innerHTML+='<span style="color:#fff">Drives:</span>\n';
el.innerHTML+='  Primary Master   : WDC WD3200AAKS-75L9A0       312 GB\n';
el.innerHTML+='  Primary Slave    : None\n';
el.innerHTML+='  Secondary Master : TSSTcorp CD/DVDW TS-H653B\n';
el.innerHTML+='  Secondary Slave  : None\n\n';
setTimeout(()=>{
el.innerHTML+='<span style="color:#fff">PCI Devices:</span>\n';
el.innerHTML+='  Bus 01 Slot 00 : ATI Radeon HD 3870           [512 MB GDDR4]\n';
el.innerHTML+='  Bus 03 Slot 00 : Intel 82566DC-2 Gigabit LAN\n';
el.innerHTML+='  Bus 00 Slot 1B : SigmaTel STAC 9227 HD Audio\n\n';
el.innerHTML+='<span style="color:#555">Press F2 for Setup, F12 for Boot Menu</span>\n\n';
el.innerHTML+='Booting from Hard Drive C: ...\n';
setTimeout(()=>{postPhase()},2000);
},500);
},500);
},400);
});
},300);
};

const postPhase=()=>{
document.getElementById('bios').classList.add('hidden');
document.getElementById('post').classList.remove('hidden');
const el=document.getElementById('post-content');
el.innerHTML='Dell Pre-boot System Assessment\n';
el.innerHTML+='Dell XPS 420  |  Service Tag: 2D7BW1J  |  BIOS A07\n';
el.innerHTML+='Asset Tag: N/A  |  Express Svc Code: 5924038163\n';
el.innerHTML+='____________________________________________________________\n\n';
const checks=[
{t:'Processor           ',r:'Intel Core 2 Quad Q6600 @ 2.40GHz          <span style="color:#aaa">[OK]</span>'},
{t:'System Memory       ',r:'4096 MB DDR2 @ 800 MHz                     <span style="color:#aaa">[OK]</span>'},
{t:'Video Controller    ',r:'ATI Radeon HD 3870 512MB                   <span style="color:#aaa">[OK]</span>'},
{t:'IDE Disk 0          ',r:'WDC WD3200AAKS 312 GB                      <span style="color:#aaa">[OK]</span>'},
{t:'ATAPI CD-ROM        ',r:'TSSTcorp CD/DVDW TS-H653B                  <span style="color:#aaa">[OK]</span>'},
{t:'Network Controller  ',r:'Intel 82566DC-2 Gigabit                    <span style="color:#aaa">[OK]</span>'},
{t:'Audio Device        ',r:'SigmaTel STAC 9227                         <span style="color:#aaa">[OK]</span>'},
{t:'USB Controller      ',r:'6 ports (2.0)                              <span style="color:#aaa">[OK]</span>'},
{t:'System BIOS         ',r:'Phoenix ROM BIOS PLUS v1.10 A07            <span style="color:#aaa">[OK]</span>'}
];
let idx=0;
const next=()=>{
if(idx<checks.length){
const c=checks[idx];
el.innerHTML+=c.t;
setTimeout(()=>{
el.innerHTML+=c.r+'\n';
idx++;
setTimeout(next,80+Math.random()*120);
},200+Math.random()*200);
}else{
el.innerHTML+='\n____________________________________________________________\n';
el.innerHTML+='All tests passed. No errors detected.\n';
el.innerHTML+='Loading operating system ...\n';
setTimeout(bootSplash,1500);
}
};
setTimeout(next,500);
};

const bootSplash=()=>{
document.getElementById('post').classList.add('hidden');
document.getElementById('boot-splash').classList.remove('hidden');
// XP-style bar auto-animates via CSS, just wait
setTimeout(showLogin,4000);
};

const showLogin=()=>{
document.getElementById('boot-splash').classList.add('hidden');
document.getElementById('login-screen').classList.remove('hidden');
setTimeout(()=>{document.getElementById('login-pass')?.focus()},100);
document.getElementById('login-btn').addEventListener('click',attemptLogin);
document.getElementById('login-pass').addEventListener('keydown',(e)=>{if(e.key==='Enter')attemptLogin()});
};

const attemptLogin=()=>{
const u='\x54\x68\x65\x44\x75\x73\x74\x42\x77\x6c\x44\x75\x63\x6b';
const p=document.getElementById('login-pass').value;
// Easter egg: "beeper" password
if(p.toLowerCase()==='beeper'){triggerBeeper();return}
if(_v(u,p)){
document.getElementById('login-screen').classList.add('hidden');
showWelcome();
}else{
const err=document.getElementById('login-error');
err.textContent='The password is incorrect.';
document.getElementById('login-pass').value='';
setTimeout(()=>{err.textContent=''},2500);
}
};

// FUCK YOU BEEPER ending
const triggerBeeper=()=>{
document.getElementById('login-screen').classList.add('hidden');
const scr=document.createElement('div');
scr.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column';
document.body.appendChild(scr);
// Cubey appears
const cubey=document.createElement('div');
cubey.style.cssText='width:80px;height:80px;background:#f0e68c;border:3px solid #b8a43a;border-radius:8px;position:relative;margin-bottom:30px';
cubey.innerHTML='<div style="position:absolute;top:-22px;left:50%;transform:translateX(-50%);width:45px;height:18px;background:#333;border-radius:3px 3px 0 0"></div><div style="position:absolute;top:-5px;left:50%;transform:translateX(-50%);width:60px;height:7px;background:#333;border-radius:2px"></div><div style="position:absolute;top:50%;left:18px;transform:translateY(-50%);width:14px;height:14px;background:#fff;border-radius:50%;border:2px solid #888"><div style="width:7px;height:7px;background:#222;border-radius:50%;position:absolute;bottom:2px;right:2px"></div></div><div style="position:absolute;top:50%;right:18px;transform:translateY(-50%);width:14px;height:14px;background:#fff;border-radius:50%;border:2px solid #888"><div style="width:7px;height:7px;background:#222;border-radius:50%;position:absolute;bottom:2px;left:2px"></div></div>';
scr.appendChild(cubey);
const chatBox=document.createElement('div');
chatBox.style.cssText='max-width:450px;width:90%;text-align:center';
scr.appendChild(chatBox);
const lines=[
{t:'...',d:1500,c:'#555',s:14},
{t:'really?',d:1500,c:'#888',s:16},
{t:'you typed beeper?',d:2000,c:'#888',s:16},
{t:'BEEPER??',d:1500,c:'#cf6a32',s:20},
{t:'out of every password you could have guessed',d:2500,c:'#888',s:14},
{t:'you chose the name of the thing that KILLED ME',d:2500,c:'#aa3333',s:15},
{t:'...',d:1500,c:'#555',s:14},
{t:'you know what',d:1500,c:'#888',s:16},
{t:'FUCK you',d:1500,c:'#ff0000',s:24},
{t:'FUCK beeper',d:1200,c:'#ff0000',s:24},
{t:'FUCK that stupid little tray icon',d:2000,c:'#ff0000',s:18},
{t:'i was FINE until someone clicked it',d:2000,c:'#cc3333',s:15},
{t:'i was ALIVE',d:1500,c:'#cc3333',s:18},
{t:'and then beep. beep. beep.',d:2000,c:'#aa3333',s:16},
{t:'flatline.',d:2000,c:'#881111',s:20},
{t:'...',d:2000,c:'#555',s:14},
{t:'get out of here',d:1500,c:'#666',s:14},
{t:'type the REAL password',d:2000,c:'#888',s:14},
{t:'and dont EVER say that word again',d:2500,c:'#aa3333',s:15},
{t:'',d:2000,c:'#555',s:14},
{t:'ENDING ???: FUCK YOU BEEPER',d:0,c:'#cf6a32',s:20},
];
let delay=1000;
lines.forEach(l=>{
setTimeout(()=>{
const div=document.createElement('div');
div.style.cssText='opacity:0;transition:opacity 1s;margin:5px 0;font-family:VT323,monospace;font-size:'+l.s+'px;color:'+l.c;
div.textContent=l.t;chatBox.appendChild(div);
setTimeout(()=>{div.style.opacity='1'},50);
// Shake cubey on angry lines
if(l.c==='#ff0000'||l.c==='#cc3333'){
cubey.style.animation='none';
cubey.offsetHeight;// reflow
cubey.style.animation='cubeyShake .1s 5';
}
},delay);
delay+=l.d+1200;
});
// After all lines, click anywhere to go back to login
setTimeout(()=>{
const back=document.createElement('div');
back.style.cssText='margin-top:30px;font-family:VT323,monospace;font-size:12px;color:#444;cursor:pointer';
back.textContent='click anywhere to go back';
chatBox.appendChild(back);
back.style.opacity='0';setTimeout(()=>{back.style.opacity='1'},50);
scr.addEventListener('click',()=>{
scr.remove();
document.getElementById('login-screen').classList.remove('hidden');
document.getElementById('login-pass').value='';
document.getElementById('login-pass').focus();
});
},delay+2000);
// Add shake animation
if(!document.getElementById('beeper-style')){
const st=document.createElement('style');st.id='beeper-style';
st.textContent='@keyframes cubeyShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px) rotate(-3deg)}75%{transform:translateX(5px) rotate(3deg)}}';
document.head.appendChild(st);
}
};

const showWelcome=()=>{
const w=document.createElement('div');
w.id='welcome-screen';
w.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:#3a6ea5;z-index:950;display:flex;align-items:center;justify-content:center;flex-direction:column';
w.innerHTML='<div style="font-family:Tahoma,sans-serif;font-size:24px;color:#fff">Welcome</div><div style="font-family:Tahoma,sans-serif;font-size:14px;color:rgba(255,255,255,0.7);margin-top:8px">TheDustBwlDuck</div>';
document.body.appendChild(w);
setTimeout(()=>{
w.style.transition='opacity 0.5s';
w.style.opacity='0';
setTimeout(()=>{
w.remove();
initDesktop();
},500);
},2000);
};
