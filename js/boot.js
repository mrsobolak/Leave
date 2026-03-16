const typeText=(el,text,speed,cb)=>{let i=0;const iv=setInterval(()=>{if(i<text.length){el.innerHTML+=text[i]==='\n'?'\n':text[i];i++;el.scrollTop=el.scrollHeight}else{clearInterval(iv);cb?.()}},speed)};

const dellSplash=()=>{
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
const bar=document.getElementById('boot-loader-bar');
let pct=0;
const iv=setInterval(()=>{
pct+=Math.random()*6+2;
if(pct>=100){pct=100;clearInterval(iv);setTimeout(showLogin,800)}
bar.style.width=pct+'%';
},250);
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
if(_v(u,p)){
document.getElementById('login-screen').classList.add('hidden');
initDesktop();
}else{
const err=document.getElementById('login-error');
err.textContent='The password is incorrect.';
document.getElementById('login-pass').value='';
setTimeout(()=>{err.textContent=''},2500);
}
};
