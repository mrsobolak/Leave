const getFS=()=>({
'C:':{type:'dir',children:{
  'Users':{type:'dir',children:{
    'TheDustBwlDuck':{type:'dir',children:{
      'Documents':{type:'dir',children:{}},
      'Downloads':{type:'dir',children:{}},
      'Pictures':{type:'dir',children:{}},
      'Music':{type:'dir',children:{}},
      'Videos':{type:'dir',children:{}},
      'Desktop':{type:'dir',children:{}}
    }}
  }}
}}
});
const getChats=()=>({});
const getEmails=()=>([]);
const getBookmarks=()=>([]);
const getHistory=()=>([]);
const openExplorer=(path)=>{
const p=path??'C:/Users/TheDustBwlDuck';
const h=`<div class="app-explorer"><div class="explorer-toolbar"><button class="explorer-back-btn" id="exp-back">◀</button><div class="explorer-path" id="exp-path">${p}</div></div><div class="explorer-content" id="exp-content"></div></div>`;
createWindow('explorer',`Files - ${p}`,550,400,h);
renderExplorerPath(p);
};
const renderExplorerPath=(path)=>{
const parts=path.split('/').filter(Boolean);
const fs=getFS();
let node=fs;
for(const part of parts){if(node[part]){if(node[part].type==='dir'){node=node[part].children}else{handleFileOpen(node[part],part);return}}else{return}}
const contentEl=document.getElementById('exp-content');
const pathEl=document.getElementById('exp-path');
if(!contentEl)return;
pathEl.textContent=path;
contentEl.innerHTML='';
Object.entries(node).forEach(([name,item])=>{
const d=document.createElement('div');d.className='explorer-item';
const iconMap={dir:'📁',img:'🖼',audio:'🎵',video:'🎬'};
d.innerHTML=`<div class="explorer-item-icon">${iconMap[item.type]??'📄'}</div><div class="explorer-item-name">${name}</div>`;
d.addEventListener('click',()=>{item.type==='dir'?renderExplorerPath(`${path}/${name}`):handleFileOpen(item,name)});
contentEl.appendChild(d);
});
const backBtn=document.getElementById('exp-back');
if(backBtn){backBtn.onclick=()=>{const parent=path.split('/').slice(0,-1).join('/');if(parent)renderExplorerPath(parent)}}
};
const handleFileOpen=(item,name)=>{
if(item.type==='file')openTextEditor(item.content,name);
else if(item.type==='img')openImageViewerSingle(item.src,name);
else if(item.type==='audio'||item.type==='video')openMediaPlayerFile(item.src,name,item.type);
};
const openBrowser=()=>{
const homeHtml='<div style="color:#808080;margin-bottom:16px;font-size:14px;font-family:Tahoma,sans-serif">EPICCUSTAMBROSWER v4.20</div><div style="font-size:12px;font-family:Tahoma,sans-serif;color:#888">No bookmarks yet.</div>';
const h=`<div class="app-browser"><div class="browser-toolbar"><input class="browser-url" id="browser-url" value="epiccustam://home"><button class="browser-go-btn" id="browser-home">⌂</button></div><div class="browser-content" id="browser-body">${homeHtml}</div></div>`;
if(openWindows['browser'])closeWindow('browser');
createWindow('browser','EPICCUSTAMBROSWER',600,450,h);
};
const openApp=(id)=>{
const apps={explorer:openExplorer,browser:openBrowser,terminal:openTerminal,texteditor:()=>openTextEditor('','Select a file...'),mediaplayer:openMediaPlayer,imageviewer:openImageViewer,email:openEmail,settings:openSettings,calculator:openCalculator,paint:openPaint,recyclebin:openRecycleBin,platformer:openPlatformer,snake:openSnake,webcam:openWebcam,taskmgr:openTaskMgr,defrag:openDefrag,solitaire:openSolitaire,stickynotes:openStickyNotes,calendar:openCalendar,cmd:openCmd};
if(apps[id])apps[id]();
};
const openTerminal=()=>{
const ver='v1.0.2';
const h=`<div class="app-terminal"><div class="terminal-output" id="term-out">SoOS Terminal ${ver}\nType "help" for available commands.\n\n</div><div class="terminal-input-line"><span class="terminal-prompt">TheDustBwlDuck@soos:~$</span><input class="terminal-input" id="term-in" autofocus spellcheck="false"></div></div>`;
createWindow('terminal','Terminal',550,350,h);
const inp=document.getElementById('term-in');
if(inp){inp.focus();inp.addEventListener('keydown',(e)=>{if(e.key==='Enter'){const cmd=inp.value.trim();inp.value='';termProcessCmd(cmd)}})}
};
const termProcessCmd=(cmd)=>{
const out=document.getElementById('term-out');if(!out)return;
out.innerHTML+=`<span style="color:#999">TheDustBwlDuck@soos:~$</span> ${cmd}\n`;
const lower=cmd.toLowerCase();
if(window.pcState===2){
const responses=['i see you.','why did you turn it on?','im still here.','at home.','you cant help him.','0.0.0.0','i knew you would come back.','you always do.','BACK','201','stop.','leave.'];
out.innerHTML+=`${responses[Math.floor(Math.random()*responses.length)]}\n\n`;
out.scrollTop=out.scrollHeight;return;
}
if(lower==='help'){out.innerHTML+='Available commands:\n  help     - show this message\n  whoami   - display current user\n  date     - show system date\n  ls       - list files\n  clear    - clear terminal\n  uptime   - system uptime\n  ps       - list processes\n  neofetch - system info\n\n'}
else if(lower==='whoami'){out.innerHTML+='TheDustBwlDuck\n\n'}
else if(lower==='date'){out.innerHTML+='Thu Sep 30 19:42:00 UTC 2010\n\n'}
else if(lower==='clear'){out.innerHTML=''}
else if(lower==='ls'){out.innerHTML+='Desktop/  Documents/  Pictures/  Music/  Videos/\n\n'}
else if(lower==='uptime'){out.innerHTML+='up 0 days, 0:32, load average: 0.42, 0.38, 0.35\n\n'}
else if(lower==='ps'){out.innerHTML+='  PID  STAT  COMMAND\n    1  S     init\n    2  S     soos-core\n    7  S     display-server\n   14  S     soos-shell\n   28  S     Steam.exe\n   31  S     hl2.exe\n\n'}
else if(lower==='neofetch'){out.innerHTML+='<span style="color:#fff">  ___  ___  ___  ___\n / __||   || _ \\/ __|\n \\__ \\| | ||  _/\\__ \\\n |___/|___||_|  |___/</span>\n\n  OS: SoOS 1.0.2\n  Host: TheDustBwlDuck\n  Uptime: 32 minutes\n  Shell: soos-sh\n  CPU: Intel Core 2 Quad Q6600 @ 2.40GHz\n  GPU: ATI Radeon HD 3870 512 MB\n  Memory: 4096 MB DDR2 (43% used)\n\n'}

else if(lower==='201'){out.innerHTML+='you know the password.\n\n'}
else if(lower==='exit'){closeWindow('terminal');return}
else if(cmd!==''){out.innerHTML+=`<span style="color:#fff">Unknown command: ${cmd}</span>\n\n`}
out.scrollTop=out.scrollHeight;
};
const openTextEditor=(content,filename)=>{
const h=`<div class="app-texteditor"><div class="texteditor-toolbar"><span class="texteditor-filename">${filename}</span></div><div class="texteditor-content">${content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div></div>`;
if(openWindows['texteditor'])closeWindow('texteditor');
createWindow('texteditor',`hackerman notepad - ${filename}`,480,360,h);
};
const openMediaPlayer=()=>{
const h='<div class="app-mediaplayer"><div class="mediaplayer-display"><div class="mediaplayer-placeholder">No media loaded.<br>Open files from File Explorer.</div></div><div class="mediaplayer-controls"><button class="mediaplayer-btn" id="mp-play">\u25B6</button><button class="mediaplayer-btn" id="mp-stop">\u25A0</button><span style="color:#444;font-size:11px;flex:1;text-align:center" id="mp-title">-</span></div></div>';
createWindow('mediaplayer','Media Player',450,350,h);
};
const openMediaPlayerFile=(src,name,type)=>{
const tag=type==='video'?`<video src="${src}" controls style="width:100%;height:100%"></video>`:`<audio src="${src}" controls style="margin-top:20px"></audio>`;
const h=`<div class="app-mediaplayer"><div class="mediaplayer-display">${tag}</div><div class="mediaplayer-controls"><span style="color:#888;font-size:11px;flex:1;text-align:center">${name}</span></div></div>`;
if(openWindows['mediaplayer'])closeWindow('mediaplayer');
createWindow('mediaplayer',`Media - ${name}`,500,380,h);
};
const openImageViewer=()=>{
const fs=getFS();
const images=[];
const pics=fs['C:'].children['Users'].children['TheDustBwlDuck'].children['Pictures'].children;
Object.entries(pics).forEach(([k,v])=>{if(v.type==='img')images.push({name:k,src:v.src})});
const h='<div class="app-imageviewer"><div class="imageviewer-display" id="iv-display"><div class="mediaplayer-placeholder">No images found.</div></div><div class="imageviewer-nav"><button class="imageviewer-nav-btn" id="iv-prev">\u25C0</button><span class="imageviewer-counter" id="iv-counter">0/0</span><button class="imageviewer-nav-btn" id="iv-next">\u25B6</button></div></div>';
createWindow('imageviewer','Gallery',500,400,h);
if(images.length>0){let idx=0;const showImg=()=>{document.getElementById('iv-display').innerHTML=`<img src="${images[idx].src}" onerror="this.parentElement.innerHTML='<div class=mediaplayer-placeholder>Image not found</div>'">`;document.getElementById('iv-counter').textContent=`${idx+1}/${images.length} - ${images[idx].name}`};showImg();document.getElementById('iv-prev').onclick=()=>{idx=(idx-1+images.length)%images.length;showImg()};document.getElementById('iv-next').onclick=()=>{idx=(idx+1)%images.length;showImg()}}
};
const openImageViewerSingle=(src,name)=>{
const h=`<div class="app-imageviewer"><div class="imageviewer-display"><img src="${src}" onerror="this.parentElement.innerHTML='<div class=mediaplayer-placeholder>Image not found</div>'"></div><div class="imageviewer-nav"><span class="imageviewer-counter">${name}</span></div></div>`;
if(openWindows['imageviewer'])closeWindow('imageviewer');
createWindow('imageviewer',`Gallery - ${name}`,500,400,h);
};

const openEmail=()=>{
const emails=getEmails();let list='';
emails.forEach((e)=>{list+=`<div class="email-item${e.unread?' unread':''}" data-email-id="${e.id}"><div class="email-unread-dot${e.unread?'':' read'}"></div><div class="email-info"><div class="email-subject">${e.subject}</div><div class="email-from">${e.from}</div></div><div class="email-date">${e.date}</div></div>`});
const h=`<div class="app-email"><div class="email-list" id="email-list">${list}</div></div>`;
if(openWindows['email'])closeWindow('email');
createWindow('email','Mail',520,400,h);
document.querySelectorAll('.email-item').forEach((item)=>{item.addEventListener('click',()=>{const id=parseInt(item.dataset.emailId);const email=emails.find((e)=>e.id===id);if(!email)return;const body=document.querySelector('#win-email .window-body');if(body){body.innerHTML=`<div class="email-view"><button class="email-view-back" id="email-back">\u25C0 Back</button><div class="email-view-header"><div class="email-view-subject">${email.subject}</div><div class="email-view-meta">From: ${email.from} | ${email.date}</div></div><div class="email-view-body">${email.body}</div></div>`;document.getElementById('email-back').addEventListener('click',()=>openEmail())}})});
};
const openSettings=()=>{
const isC=false;
let h='<div class="app-settings"><div class="settings-section"><div class="settings-section-title">System</div><div class="settings-row"><span class="settings-label">OS Version</span><span class="settings-value">SoOS 1.0.2</span></div><div class="settings-row"><span class="settings-label">User</span><span class="settings-value">TheDustBwlDuck</span></div><div class="settings-row"><span class="settings-label">Hostname</span><span class="settings-value">dustbowl-pc</span></div></div><div class="settings-section"><div class="settings-section-title">Hardware</div><div class="settings-row"><span class="settings-label">CPU</span><span class="settings-value">Intel Core 2 Quad Q6600</span></div><div class="settings-row"><span class="settings-label">RAM</span><span class="settings-value">4096 MB DDR2</span></div><div class="settings-row"><span class="settings-label">GPU</span><span class="settings-value">ATI Radeon HD 3870 512 MB</span></div><div class="settings-row"><span class="settings-label">HDD</span><span class="settings-value">320 GB (3 years old)</span></div></div><div class="settings-section"><div class="settings-section-title">Network</div><div class="settings-row"><span class="settings-label">Status</span><span class="settings-value">'+(isC?'<span style="color:#c00">0.0.0.0 [ANOMALOUS]</span>':'Connected')+'</span></div></div>';
if(isC){
h+='<div class="settings-section" style="border-top:2px solid #c00;margin-top:10px;padding-top:10px"><div class="settings-section-title" style="color:#c00">Danger Zone</div><div class="settings-row"><span class="settings-label" style="color:#888">Factory Reset</span><span class="settings-value"><button id="factory-reset-btn" style="background:#c00;color:#fff;border:2px outset #f44;padding:3px 12px;font-family:Tahoma,sans-serif;font-size:11px;cursor:pointer">RESET SYSTEM</button></span></div><div style="font-size:9px;color:#888;margin-top:4px;padding:0 4px">Warning: This will erase all data and restore SoOS to factory defaults. This action cannot be undone.</div></div>';
}
h+='</div>';
createWindow('settings','Settings',400,isC?440:380,h);
if(isC){
setTimeout(()=>{
const btn=document.getElementById('factory-reset-btn');
if(btn)btn.addEventListener('click',()=>{window.triggerFactoryReset()});
},100);
}
};
const openCalculator=()=>{
const btns=['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];let grid='';
btns.forEach((b)=>{grid+=`<button class="calc-btn${['/','*','-','+','=','C'].includes(b)?' op':''}" data-calc="${b}">${b}</button>`});
const h=`<div class="app-calculator"><div class="calc-display" id="calc-disp">0</div><div class="calc-buttons" id="calc-btns">${grid}</div></div>`;
createWindow('calculator','Calc',260,340,h);
const disp=document.getElementById('calc-disp');let expr='';
document.querySelectorAll('[data-calc]').forEach((btn)=>{btn.addEventListener('click',()=>{const v=btn.dataset.calc;if(v==='C'){expr='';disp.textContent='0'}else if(v==='='){try{const r=Function('"use strict";return ('+expr+')')();disp.textContent=r;expr=String(r)}catch{disp.textContent='ERR';expr=''}}else{expr+=v;disp.textContent=expr}})});
};
const openPaint=()=>{
const isC=false;
const allColors=['#ffffff','#000000','#ff0000','#ff6600','#ffff00','#00cc00','#0066ff','#cc00ff','#ff69b4','#00cccc','#884400','#666666','#cccccc','#ff4444','#44ff44','#4444ff'];
let cb='';
allColors.forEach((c,i)=>{cb+=`<div class="paint-color-btn${i===0?' active':''}" data-color="${c}" style="background:${c};width:16px;height:16px;border:1px solid #555;cursor:pointer;display:inline-block"></div>`});
const h=`<div class="app-paint"><div class="paint-toolbar" style="display:flex;gap:4px;align-items:center;flex-wrap:wrap;padding:4px;background:#ece9d8;border-bottom:1px solid #aaa">${cb}<span style="margin-left:6px"></span><button class="paint-size-btn active" data-size="2">S</button><button class="paint-size-btn" data-size="5">M</button><button class="paint-size-btn" data-size="10">L</button><button class="paint-clear-btn" id="paint-clear" style="margin-left:8px">Clear</button><button id="paint-gallery-btn" style="margin-left:8px;padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:10px;cursor:pointer">Duck's Drawings (${isC?60:30})</button></div><div class="paint-canvas-wrap" id="paint-wrap"><canvas id="paint-canvas"></canvas></div></div>`;
createWindow('paint','Paint',550,420,h);
setTimeout(()=>{const wrap=document.getElementById('paint-wrap');const canvas=document.getElementById('paint-canvas');if(!wrap||!canvas)return;const ctx=canvas.getContext('2d');canvas.width=wrap.offsetWidth;canvas.height=wrap.offsetHeight;ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,canvas.width,canvas.height);let drawing=false;let color='#ffffff';let size=2;canvas.addEventListener('mousedown',(e)=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY)});canvas.addEventListener('mousemove',(e)=>{if(!drawing)return;ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke()});canvas.addEventListener('mouseup',()=>{drawing=false});canvas.addEventListener('mouseleave',()=>{drawing=false});document.querySelectorAll('.paint-color-btn').forEach((btn)=>{btn.addEventListener('click',()=>{document.querySelectorAll('.paint-color-btn').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');color=btn.dataset.color})});document.querySelectorAll('.paint-size-btn').forEach((btn)=>{btn.addEventListener('click',()=>{document.querySelectorAll('.paint-size-btn').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');size=parseInt(btn.dataset.size)})});document.getElementById('paint-clear').addEventListener('click',()=>{ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,canvas.width,canvas.height)});
document.getElementById('paint-gallery-btn').addEventListener('click',()=>openPaintGallery());
},50);
};

// Duck's saved drawings - rendered on mini canvases
const duckDrawings={
normal:[
{title:'dustbowl!!!',draw:(c,w,h)=>{c.fillStyle='#c4a04a';c.fillRect(0,h*0.6,w,h*0.4);c.fillStyle='#5577aa';c.fillRect(0,0,w,h*0.6);c.fillStyle='#8B7355';c.fillRect(w*0.1,h*0.35,w*0.3,h*0.3);c.fillRect(w*0.55,h*0.3,w*0.35,h*0.35);c.fillStyle='#000';c.fillRect(w*0.4,h*0.45,w*0.15,h*0.2);c.fillStyle='#fff';c.font='bold 10px sans-serif';c.fillText('DUSTBOWL',w*0.15,h*0.2)}},
{title:'me (medic)',draw:(c,w,h)=>{c.fillStyle='#fff';c.fillRect(w*0.4,h*0.15,w*0.2,h*0.15);c.fillRect(w*0.42,h*0.3,w*0.16,h*0.3);c.fillRect(w*0.35,h*0.35,w*0.3,w*0.04);c.fillRect(w*0.42,h*0.6,w*0.06,h*0.25);c.fillRect(w*0.52,h*0.6,w*0.06,h*0.25);c.fillStyle='#f00';c.fillRect(w*0.47,h*0.35,w*0.06,h*0.15);c.fillRect(w*0.44,h*0.42,w*0.12,h*0.04);c.fillStyle='#000';c.fillRect(w*0.44,h*0.2,w*0.03,w*0.03);c.fillRect(w*0.53,h*0.2,w*0.03,w*0.03);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('me!! medic main',w*0.2,h*0.95)}},
{title:'mike',draw:(c,w,h)=>{c.fillStyle='#f8d878';c.fillRect(w*0.4,h*0.15,w*0.2,h*0.15);c.fillStyle='#44a';c.fillRect(w*0.42,h*0.3,w*0.16,h*0.3);c.fillRect(w*0.35,h*0.35,w*0.3,w*0.04);c.fillRect(w*0.42,h*0.6,w*0.06,h*0.25);c.fillRect(w*0.52,h*0.6,w*0.06,h*0.25);c.fillStyle='#000';c.fillRect(w*0.44,h*0.2,w*0.03,w*0.03);c.fillRect(w*0.53,h*0.2,w*0.03,w*0.03);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('mike (best frend)',w*0.15,h*0.95)}},
{title:'mom',draw:(c,w,h)=>{c.fillStyle='#f8d878';c.fillRect(w*0.4,h*0.1,w*0.2,h*0.15);c.fillStyle='#884400';c.fillRect(w*0.38,h*0.05,w*0.24,h*0.1);c.fillStyle='#c44';c.fillRect(w*0.42,h*0.25,w*0.16,h*0.35);c.fillRect(w*0.42,h*0.6,w*0.06,h*0.25);c.fillRect(w*0.52,h*0.6,w*0.06,h*0.25);c.fillStyle='#000';c.fillRect(w*0.44,h*0.15,w*0.03,w*0.03);c.fillRect(w*0.53,h*0.15,w*0.03,w*0.03);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('mom <3',w*0.35,h*0.95)}},
{title:'ubersaw',draw:(c,w,h)=>{c.fillStyle='#888';c.fillRect(w*0.15,h*0.45,w*0.5,h*0.08);c.fillStyle='#aaa';c.fillRect(w*0.6,h*0.3,w*0.25,h*0.04);c.fillRect(w*0.6,h*0.55,w*0.25,h*0.04);c.fillRect(w*0.8,h*0.3,w*0.04,h*0.29);c.fillStyle='#c44';c.fillRect(w*0.65,h*0.38,w*0.12,h*0.12);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('UBERSAW (247 kills!!)',w*0.1,h*0.9)}},
{title:'my pc',draw:(c,w,h)=>{c.fillStyle='#555';c.fillRect(w*0.2,h*0.1,w*0.6,h*0.5);c.fillStyle='#3a6ea5';c.fillRect(w*0.23,h*0.13,w*0.54,h*0.4);c.fillStyle='#333';c.fillRect(w*0.35,h*0.62,w*0.3,h*0.05);c.fillRect(w*0.25,h*0.67,w*0.5,h*0.03);c.fillStyle='#444';c.fillRect(w*0.3,h*0.75,w*0.4,h*0.15);c.fillStyle='#0f0';c.fillRect(w*0.67,h*0.82,w*0.02,w*0.02);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('dell xps 420 BEAST',w*0.15,h*0.97)}},
{title:'a duck (me lol)',draw:(c,w,h)=>{c.fillStyle='#ff0';c.beginPath();c.arc(w*0.5,h*0.4,w*0.15,0,Math.PI*2);c.fill();c.beginPath();c.ellipse(w*0.5,h*0.6,w*0.12,h*0.15,0,0,Math.PI*2);c.fill();c.fillStyle='#f80';c.fillRect(w*0.55,h*0.35,w*0.12,h*0.06);c.fillStyle='#000';c.fillRect(w*0.47,h*0.35,w*0.03,w*0.03);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('quack',w*0.4,h*0.85)}},
{title:'sandvich',draw:(c,w,h)=>{c.fillStyle='#d4a04a';c.beginPath();c.moveTo(w*0.2,h*0.4);c.lineTo(w*0.8,h*0.4);c.lineTo(w*0.75,h*0.5);c.lineTo(w*0.25,h*0.5);c.fill();c.fillStyle='#4a4';c.fillRect(w*0.22,h*0.5,w*0.56,h*0.05);c.fillStyle='#c44';c.fillRect(w*0.24,h*0.55,w*0.52,h*0.05);c.fillStyle='#ff0';c.fillRect(w*0.26,h*0.6,w*0.48,h*0.03);c.fillStyle='#d4a04a';c.fillRect(w*0.25,h*0.63,w*0.5,h*0.1);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('om nom nom',w*0.3,h*0.9)}},
{title:'the sun',draw:(c,w,h)=>{c.fillStyle='#ff0';c.beginPath();c.arc(w*0.5,h*0.35,w*0.15,0,Math.PI*2);c.fill();for(let i=0;i<8;i++){const a=i*Math.PI/4;c.strokeStyle='#ff0';c.lineWidth=3;c.beginPath();c.moveTo(w*0.5+Math.cos(a)*w*0.18,h*0.35+Math.sin(a)*w*0.18);c.lineTo(w*0.5+Math.cos(a)*w*0.28,h*0.35+Math.sin(a)*w*0.28);c.stroke()}c.fillStyle='#000';c.fillRect(w*0.45,h*0.32,w*0.03,w*0.03);c.fillRect(w*0.52,h*0.32,w*0.03,w*0.03);c.strokeStyle='#000';c.lineWidth=1;c.beginPath();c.arc(w*0.5,h*0.4,w*0.05,0,Math.PI);c.stroke();c.fillStyle='#fff';c.font='8px sans-serif';c.fillText(':)',w*0.45,h*0.8)}},
{title:'sentry gun',draw:(c,w,h)=>{c.fillStyle='#888';c.fillRect(w*0.35,h*0.3,w*0.3,h*0.35);c.fillStyle='#666';c.fillRect(w*0.3,h*0.65,w*0.4,h*0.08);c.fillStyle='#555';c.fillRect(w*0.55,h*0.35,w*0.25,h*0.06);c.fillRect(w*0.55,h*0.5,w*0.25,h*0.06);c.fillStyle='#c00';c.fillRect(w*0.4,h*0.35,w*0.08,h*0.08);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('pew pew pew',w*0.2,h*0.9)}},
{title:'DUSTBOWL RULES',draw:(c,w,h)=>{c.fillStyle='#f00';c.font='bold 16px sans-serif';c.fillText('DUSTBOWL',w*0.12,h*0.35);c.fillStyle='#ff0';c.font='bold 20px sans-serif';c.fillText('RULES!!!',w*0.18,h*0.6);for(let i=0;i<5;i++){c.fillStyle=['#f00','#ff0','#0f0','#0ff','#f0f'][i];c.fillRect(w*0.1+i*w*0.17,h*0.7,w*0.12,h*0.05)}}},
{title:'ghastly gibus',draw:(c,w,h)=>{c.fillStyle='#3a3a2a';c.beginPath();c.moveTo(w*0.25,h*0.6);c.lineTo(w*0.35,h*0.2);c.lineTo(w*0.5,h*0.15);c.lineTo(w*0.65,h*0.2);c.lineTo(w*0.75,h*0.6);c.fill();c.fillRect(w*0.15,h*0.6,w*0.7,h*0.08);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('best hat ever (free)',w*0.15,h*0.85)}},
{title:'my dog',draw:(c,w,h)=>{c.fillStyle='#a0704a';c.fillRect(w*0.3,h*0.3,w*0.35,h*0.25);c.fillRect(w*0.25,h*0.55,w*0.08,h*0.2);c.fillRect(w*0.37,h*0.55,w*0.08,h*0.2);c.fillRect(w*0.5,h*0.55,w*0.08,h*0.2);c.fillRect(w*0.6,h*0.55,w*0.08,h*0.2);c.beginPath();c.arc(w*0.27,h*0.3,w*0.1,0,Math.PI*2);c.fill();c.fillStyle='#000';c.fillRect(w*0.25,h*0.28,w*0.02,w*0.02);c.fillStyle='#c44';c.fillRect(w*0.22,h*0.34,w*0.06,h*0.03);c.fillStyle='#a0704a';c.fillRect(w*0.62,h*0.28,w*0.12,h*0.04);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('good boy',w*0.35,h*0.9)}},
{title:'school (boring)',draw:(c,w,h)=>{c.fillStyle='#a44';c.fillRect(w*0.15,h*0.3,w*0.7,h*0.45);c.fillStyle='#884';c.beginPath();c.moveTo(w*0.1,h*0.3);c.lineTo(w*0.5,h*0.1);c.lineTo(w*0.9,h*0.3);c.fill();c.fillStyle='#55a';c.fillRect(w*0.3,h*0.45,w*0.15,h*0.15);c.fillRect(w*0.55,h*0.45,w*0.15,h*0.15);c.fillStyle='#884';c.fillRect(w*0.44,h*0.5,w*0.12,h*0.25);c.fillStyle='#f00';c.font='bold 12px sans-serif';c.fillText('BORING',w*0.25,h*0.9)}},
{title:'heavy eating',draw:(c,w,h)=>{c.fillStyle='#f8d878';c.fillRect(w*0.35,h*0.1,w*0.3,h*0.2);c.fillStyle='#a44';c.fillRect(w*0.3,h*0.3,w*0.4,h*0.35);c.fillRect(w*0.3,h*0.65,w*0.12,h*0.2);c.fillRect(w*0.58,h*0.65,w*0.12,h*0.2);c.fillStyle='#d4a04a';c.beginPath();c.arc(w*0.75,h*0.45,w*0.08,0,Math.PI*2);c.fill();c.fillStyle='#000';c.fillRect(w*0.42,h*0.17,w*0.03,w*0.03);c.fillRect(w*0.55,h*0.17,w*0.03,w*0.03);c.strokeStyle='#000';c.lineWidth=1;c.beginPath();c.arc(w*0.5,h*0.25,w*0.04,0,Math.PI);c.stroke();c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('OM NOM NOM',w*0.25,h*0.95)}},
{title:'spy (sneaky)',draw:(c,w,h)=>{c.fillStyle='#44a';c.fillRect(w*0.42,h*0.3,w*0.16,h*0.35);c.fillStyle='#446';c.fillRect(w*0.4,h*0.12,w*0.2,h*0.18);c.fillStyle='#000';c.fillRect(w*0.38,h*0.2,w*0.24,h*0.04);c.fillRect(w*0.42,h*0.6,w*0.06,h*0.25);c.fillRect(w*0.52,h*0.6,w*0.06,h*0.25);c.fillStyle='#888';c.fillRect(w*0.62,h*0.4,w*0.15,h*0.03);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('*backstab noises*',w*0.15,h*0.95)}},
{title:'i <3 tf2',draw:(c,w,h)=>{c.fillStyle='#f00';c.font='bold 14px sans-serif';c.fillText('I',w*0.2,h*0.45);c.beginPath();c.moveTo(w*0.45,h*0.45);c.bezierCurveTo(w*0.45,h*0.3,w*0.3,h*0.3,w*0.3,h*0.45);c.bezierCurveTo(w*0.3,h*0.55,w*0.45,h*0.6,w*0.45,h*0.7);c.bezierCurveTo(w*0.45,h*0.6,w*0.6,h*0.55,w*0.6,h*0.45);c.bezierCurveTo(w*0.6,h*0.3,w*0.45,h*0.3,w*0.45,h*0.45);c.fillStyle='#f00';c.fill();c.fillStyle='#ff6600';c.font='bold 14px sans-serif';c.fillText('TF2',w*0.65,h*0.5)}},
{title:'drums!',draw:(c,w,h)=>{c.fillStyle='#c44';c.fillRect(w*0.15,h*0.4,w*0.25,h*0.3);c.fillRect(w*0.6,h*0.4,w*0.25,h*0.3);c.fillStyle='#cc8';c.beginPath();c.arc(w*0.5,h*0.25,w*0.08,0,Math.PI*2);c.fill();c.fillStyle='#888';c.fillRect(w*0.49,h*0.25,w*0.02,h*0.5);c.fillRect(w*0.27,h*0.7,w*0.02,h*0.15);c.fillRect(w*0.72,h*0.7,w*0.02,h*0.15);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('im not terrible - drumz guy',w*0.05,h*0.95)}},
{title:'pizza',draw:(c,w,h)=>{c.fillStyle='#d4a04a';c.beginPath();c.moveTo(w*0.5,h*0.15);c.lineTo(w*0.15,h*0.8);c.lineTo(w*0.85,h*0.8);c.fill();c.fillStyle='#ff0';c.beginPath();c.moveTo(w*0.5,h*0.2);c.lineTo(w*0.2,h*0.75);c.lineTo(w*0.8,h*0.75);c.fill();c.fillStyle='#c44';for(let i=0;i<6;i++){c.beginPath();c.arc(w*(0.35+Math.random()*0.3),h*(0.35+Math.random()*0.35),w*0.03,0,Math.PI*2);c.fill()}c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('yum',w*0.43,h*0.95)}},
{title:'xbox',draw:(c,w,h)=>{c.fillStyle='#333';c.beginPath();c.arc(w*0.5,h*0.45,w*0.22,0,Math.PI*2);c.fill();c.fillStyle='#0a0';c.beginPath();c.arc(w*0.5,h*0.45,w*0.05,0,Math.PI*2);c.fill();c.fillStyle='#222';c.beginPath();c.arc(w*0.4,h*0.35,w*0.04,0,Math.PI*2);c.fill();c.beginPath();c.arc(w*0.6,h*0.35,w*0.04,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('want 4 christmas',w*0.2,h*0.85)}},
{title:'skateboard',draw:(c,w,h)=>{c.fillStyle='#884';c.fillRect(w*0.1,h*0.45,w*0.8,h*0.08);c.fillStyle='#888';c.fillRect(w*0.25,h*0.53,w*0.08,h*0.06);c.fillRect(w*0.65,h*0.53,w*0.08,h*0.06);c.fillStyle='#333';c.beginPath();c.arc(w*0.29,h*0.62,w*0.03,0,Math.PI*2);c.fill();c.beginPath();c.arc(w*0.69,h*0.62,w*0.03,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('i will learn someday',w*0.15,h*0.85)}},
{title:'BOOM',draw:(c,w,h)=>{for(let i=0;i<8;i++){c.fillStyle=['#f00','#ff0','#f80'][i%3];const a=i*Math.PI/4,d=w*0.15;c.beginPath();c.moveTo(w*0.5,h*0.45);c.lineTo(w*0.5+Math.cos(a)*d,h*0.45+Math.sin(a)*d);c.lineTo(w*0.5+Math.cos(a+0.2)*(d*1.5),h*0.45+Math.sin(a+0.2)*(d*1.5));c.fill()}c.fillStyle='#ff0';c.font='bold 18px sans-serif';c.fillText('BOOM!!',w*0.25,h*0.85)}},
{title:'the crew',draw:(c,w,h)=>{const names=['me','mike','pyro','scout','hevy','bonk'];const colors=['#fff','#44a','#f80','#4af','#a44','#f44'];names.forEach((n,i)=>{const x=w*0.08+i*w*0.15;c.fillStyle=colors[i];c.fillRect(x,h*0.3,w*0.1,h*0.2);c.fillStyle='#f8d878';c.fillRect(x+w*0.02,h*0.2,w*0.06,h*0.1);c.fillStyle='#fff';c.font='6px sans-serif';c.fillText(n,x,h*0.6)})}},
{title:'xmas tree',draw:(c,w,h)=>{c.fillStyle='#0a0';c.beginPath();c.moveTo(w*0.5,h*0.1);c.lineTo(w*0.2,h*0.65);c.lineTo(w*0.8,h*0.65);c.fill();c.fillStyle='#840';c.fillRect(w*0.42,h*0.65,w*0.16,h*0.2);c.fillStyle='#ff0';c.font='14px serif';c.fillText('\u2605',w*0.45,h*0.15);c.fillStyle='#f00';for(let i=0;i<5;i++){c.beginPath();c.arc(w*(0.35+Math.random()*0.3),h*(0.25+Math.random()*0.35),w*0.02,0,Math.PI*2);c.fill()}}},
{title:'bday cake',draw:(c,w,h)=>{c.fillStyle='#ff88cc';c.fillRect(w*0.2,h*0.4,w*0.6,h*0.35);c.fillStyle='#ff44aa';c.fillRect(w*0.2,h*0.4,w*0.6,h*0.06);c.fillStyle='#ff0';for(let i=0;i<5;i++){c.fillRect(w*(0.28+i*0.1),h*0.3,w*0.02,h*0.1);c.fillStyle='#f80';c.beginPath();c.arc(w*(0.29+i*0.1),h*0.29,w*0.02,0,Math.PI*2);c.fill();c.fillStyle='#ff0'}c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('happy bday mike!!',w*0.15,h*0.9)}},
{title:'a castle',draw:(c,w,h)=>{c.fillStyle='#888';c.fillRect(w*0.2,h*0.35,w*0.6,h*0.45);c.fillRect(w*0.15,h*0.25,w*0.12,h*0.55);c.fillRect(w*0.73,h*0.25,w*0.12,h*0.55);c.fillStyle='#000';c.fillRect(w*0.43,h*0.55,w*0.14,h*0.25);c.fillStyle='#55a';c.fillRect(w*0.3,h*0.45,w*0.08,h*0.08);c.fillRect(w*0.62,h*0.45,w*0.08,h*0.08);c.fillStyle='#888';for(let i=0;i<4;i++){c.fillRect(w*(0.17+i*0.22),h*0.2,w*0.04,h*0.05)}}},
{title:'mountains',draw:(c,w,h)=>{c.fillStyle='#5577aa';c.fillRect(0,0,w,h);c.fillStyle='#5a5';c.fillRect(0,h*0.7,w,h*0.3);c.fillStyle='#888';c.beginPath();c.moveTo(0,h*0.7);c.lineTo(w*0.3,h*0.2);c.lineTo(w*0.5,h*0.7);c.fill();c.beginPath();c.moveTo(w*0.4,h*0.7);c.lineTo(w*0.7,h*0.15);c.lineTo(w,h*0.7);c.fill();c.fillStyle='#fff';c.beginPath();c.moveTo(w*0.3,h*0.2);c.lineTo(w*0.25,h*0.3);c.lineTo(w*0.35,h*0.3);c.fill();c.beginPath();c.moveTo(w*0.7,h*0.15);c.lineTo(w*0.65,h*0.25);c.lineTo(w*0.75,h*0.25);c.fill()}},
{title:'mike + duck',draw:(c,w,h)=>{c.fillStyle='#f00';c.font='bold 11px sans-serif';c.fillText('mike + duck',w*0.15,h*0.35);c.fillText('= best frends',w*0.15,h*0.5);c.fillText('4 EVER',w*0.25,h*0.65);c.beginPath();c.moveTo(w*0.75,h*0.45);c.bezierCurveTo(w*0.75,h*0.3,w*0.6,h*0.3,w*0.6,h*0.45);c.bezierCurveTo(w*0.6,h*0.55,w*0.75,h*0.6,w*0.75,h*0.7);c.bezierCurveTo(w*0.75,h*0.6,w*0.9,h*0.55,w*0.9,h*0.45);c.bezierCurveTo(w*0.9,h*0.3,w*0.75,h*0.3,w*0.75,h*0.45);c.fillStyle='#f00';c.fill()}},
{title:'hot pocket',draw:(c,w,h)=>{c.fillStyle='#d4a04a';c.beginPath();c.ellipse(w*0.5,h*0.45,w*0.3,h*0.2,0,0,Math.PI*2);c.fill();c.fillStyle='#c44';c.beginPath();c.ellipse(w*0.5,h*0.42,w*0.2,h*0.1,0,0,Math.PI*2);c.fill();c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('mom makes the best ones',w*0.08,h*0.85)}},
{title:'2fort',draw:(c,w,h)=>{c.fillStyle='#5577aa';c.fillRect(0,0,w,h*0.5);c.fillStyle='#c4a04a';c.fillRect(0,h*0.5,w,h*0.5);c.fillStyle='#a44';c.fillRect(w*0.05,h*0.25,w*0.35,h*0.35);c.fillStyle='#44a';c.fillRect(w*0.6,h*0.25,w*0.35,h*0.35);c.fillStyle='#5af';c.fillRect(w*0.4,h*0.4,w*0.2,h*0.15);c.fillStyle='#fff';c.font='8px sans-serif';c.fillText('2fort (ok i guess)',w*0.2,h*0.9)}},
],
corrupted:[
{title:'the tunnel',draw:(c,w,h)=>{c.fillStyle='#111';c.fillRect(0,0,w,h);c.fillStyle='#1a1a1a';c.beginPath();c.moveTo(w*0.3,0);c.lineTo(w*0.7,0);c.lineTo(w*0.6,h);c.lineTo(w*0.4,h);c.fill();c.fillStyle='#000';c.beginPath();c.moveTo(w*0.4,h*0.2);c.lineTo(w*0.6,h*0.2);c.lineTo(w*0.55,h*0.7);c.lineTo(w*0.45,h*0.7);c.fill();c.fillStyle='#f00';c.fillRect(w*0.48,h*0.35,w*0.01,w*0.01);c.fillRect(w*0.51,h*0.35,w*0.01,w*0.01)}},
{title:'he sees me',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.fillRect(w*0.3,h*0.35,w*0.15,h*0.08);c.fillRect(w*0.55,h*0.35,w*0.15,h*0.08);c.fillRect(w*0.35,h*0.37,w*0.05,h*0.04);c.fillRect(w*0.6,h*0.37,w*0.05,h*0.04);c.fillStyle='#600';c.font='8px sans-serif';c.fillText('he sees me',w*0.3,h*0.8)}},
{title:'0.0.0.0',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.font='bold 16px monospace';c.fillText('0.0.0.0',w*0.2,h*0.3);c.font='12px monospace';c.fillText(':27015',w*0.3,h*0.5);c.font='8px monospace';c.fillText('not a real address',w*0.15,h*0.7);c.fillText('but its real',w*0.25,h*0.8)}},
{title:'help',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#c00';c.font='bold 24px sans-serif';c.fillText('HELP',w*0.2,h*0.3);c.fillText('HELP',w*0.3,h*0.5);c.fillText('HELP',w*0.15,h*0.7);c.font='8px sans-serif';c.fillText('help',w*0.5,h*0.9)}},
{title:'201',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.font='bold 10px monospace';for(let y=0;y<15;y++)for(let x=0;x<10;x++)c.fillText('201',w*0.05+x*w*0.1,h*0.05+y*h*0.07)}},
{title:'dustbowl (dark)',draw:(c,w,h)=>{c.fillStyle='#0a0a0a';c.fillRect(0,0,w,h);c.fillStyle='#1a1a0a';c.fillRect(0,h*0.6,w,h*0.4);c.fillStyle='#111';c.fillRect(w*0.1,h*0.35,w*0.3,h*0.3);c.fillRect(w*0.55,h*0.3,w*0.35,h*0.35);c.fillStyle='#000';c.fillRect(w*0.4,h*0.45,w*0.15,h*0.2);c.fillStyle='#f00';c.fillRect(w*0.46,h*0.5,w*0.02,w*0.02);c.fillRect(w*0.52,h*0.5,w*0.02,w*0.02)}},
{title:'melting',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f8d878';c.fillRect(w*0.3,h*0.15,w*0.4,h*0.35);c.fillStyle='#000';c.fillRect(w*0.38,h*0.25,w*0.08,h*0.08);c.fillRect(w*0.55,h*0.25,w*0.08,h*0.08);c.fillStyle='#f8d878';for(let i=0;i<5;i++)c.fillRect(w*(0.32+i*0.08),h*0.5,w*0.04,h*(0.15+Math.random()*0.25));c.fillStyle='#600';c.font='8px sans-serif';c.fillText('its melting',w*0.3,h*0.95)}},
{title:'red',draw:(c,w,h)=>{c.fillStyle='#f00';c.fillRect(0,0,w,h);for(let i=0;i<50;i++){c.fillStyle='rgba(0,0,0,'+Math.random()*0.5+')';c.fillRect(Math.random()*w,Math.random()*h,Math.random()*w*0.1,Math.random()*h*0.05)}}},
{title:'12:06',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.font='bold 28px monospace';c.fillText('12:06',w*0.2,h*0.45);c.font='12px monospace';c.fillText('AM',w*0.7,h*0.45);c.font='10px sans-serif';c.fillText('5/28/2010',w*0.25,h*0.65)}},
{title:'the hard drive',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#444';c.fillRect(w*0.2,h*0.2,w*0.6,h*0.15);c.fillStyle='#333';c.beginPath();c.arc(w*0.5,h*0.55,w*0.2,0,Math.PI*2);c.fill();c.fillStyle='#444';c.beginPath();c.arc(w*0.5,h*0.55,w*0.05,0,Math.PI*2);c.fill();c.fillStyle='#600';c.font='8px sans-serif';c.fillText('$20 from craigslist',w*0.15,h*0.9);c.fillText('worst purchase ever',w*0.15,h*0.97)}},
{title:'im sorry',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#888';c.font='12px sans-serif';c.fillText('im sorry mom',w*0.15,h*0.25);c.fillText('im sorry mike',w*0.15,h*0.4);c.fillText('im sorry pyro',w*0.15,h*0.55);c.fillText('im sorry every1',w*0.15,h*0.7);c.fillStyle='#444';c.font='8px sans-serif';c.fillText('i cudnt stop it',w*0.2,h*0.9)}},
{title:'hands',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#333';for(let i=0;i<6;i++){c.fillRect(w*(0.1+i*0.14),h*0.7,w*0.08,h*0.3);c.fillRect(w*(0.1+i*0.14)+w*0.01,h*0.55,w*0.02,h*0.2);c.fillRect(w*(0.1+i*0.14)+w*0.04,h*0.5,w*0.02,h*0.25)}}},
{title:'the void',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);for(let i=0;i<3;i++){c.strokeStyle='rgba('+Math.floor(Math.random()*50)+',0,0,0.3)';c.lineWidth=1;c.beginPath();c.arc(w*0.5,h*0.5,w*(0.1+i*0.12),0,Math.PI*2);c.stroke()}}},
{title:'cubey crying',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#8a7a3a';c.fillRect(w*0.3,h*0.3,w*0.4,h*0.4);c.fillStyle='#fff';c.fillRect(w*0.38,h*0.42,w*0.08,h*0.08);c.fillRect(w*0.55,h*0.42,w*0.08,h*0.08);c.fillStyle='#55f';c.fillRect(w*0.4,h*0.52,w*0.04,h*0.2);c.fillRect(w*0.57,h*0.52,w*0.04,h*0.2);c.fillStyle='#600';c.font='8px sans-serif';c.fillText('he doesnt remember',w*0.15,h*0.9)}},
{title:'DONT OPEN TF2',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.font='bold 12px sans-serif';for(let i=0;i<8;i++)c.fillText('DONT OPEN TF2',w*0.1,h*0.1+i*h*0.11)}},
{title:'static',draw:(c,w,h)=>{const img=c.createImageData(w,h);for(let i=0;i<img.data.length;i+=4){const v=Math.random()*60;img.data[i]=v*(Math.random()>0.8?3:1);img.data[i+1]=0;img.data[i+2]=0;img.data[i+3]=255}c.putImageData(img,0,0)}},
{title:'im going home',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#666';c.font='14px sans-serif';c.fillText('im going home',w*0.15,h*0.5);c.fillStyle='#333';c.font='10px sans-serif';c.fillText('5/28/2010 12:06 AM',w*0.15,h*0.7)}},
{title:'craigslist',draw:(c,w,h)=>{c.fillStyle='#ddd';c.fillRect(0,0,w,h);c.fillStyle='#609';c.font='bold 12px sans-serif';c.fillText('craigslist',w*0.05,h*0.15);c.fillStyle='#000';c.font='10px sans-serif';c.fillText('FOR SALE: Hard Drive $20',w*0.05,h*0.35);c.fillText('DO NOT PLAY THE DEMOS',w*0.05,h*0.5);c.fillStyle='#c00';c.font='8px sans-serif';c.fillText('i shud have listend',w*0.15,h*0.8)}},
{title:'figure',draw:(c,w,h)=>{c.fillStyle='#0a0a0a';c.fillRect(0,0,w,h);c.fillStyle='#000';c.fillRect(w*0.42,h*0.15,w*0.16,h*0.65);c.fillRect(w*0.45,h*0.1,w*0.1,h*0.1);c.fillStyle='#f00';c.fillRect(w*0.47,h*0.13,w*0.02,w*0.02);c.fillRect(w*0.52,h*0.13,w*0.02,w*0.02)}},
{title:'201 201 201',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.font='bold 40px monospace';c.fillText('201',w*0.2,h*0.55)}},
{title:'empty server',draw:(c,w,h)=>{c.fillStyle='#1a1a2a';c.fillRect(0,0,w,h);c.fillStyle='#222';c.fillRect(0,h*0.7,w,h*0.3);c.fillStyle='#888';c.font='10px monospace';c.fillText('Players: 0/24',w*0.1,h*0.15);c.fillText('Map: cp_dustbowl',w*0.1,h*0.3);c.fillText('Server: 0.0.0.0:27015',w*0.1,h*0.45);c.fillStyle='#444';c.font='8px sans-serif';c.fillText('every1 left',w*0.25,h*0.85)}},
{title:'corrupted cubey',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#4a0a0a';c.fillRect(w*0.3,h*0.3,w*0.4,h*0.4);c.fillStyle='#fcc';c.fillRect(w*0.38,h*0.42,w*0.08,h*0.08);c.fillRect(w*0.55,h*0.42,w*0.08,h*0.08);c.fillStyle='#c00';c.fillRect(w*0.4,h*0.44,w*0.04,h*0.04);c.fillRect(w*0.57,h*0.44,w*0.04,h*0.04);c.fillStyle='#1a0000';c.fillRect(w*0.38,h*0.22,w*0.24,h*0.08);c.fillStyle='#600';c.font='8px sans-serif';c.fillText('he did this to me',w*0.2,h*0.9)}},
{title:'mike run',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#c00';c.font='bold 18px sans-serif';c.fillText('MIKE',w*0.2,h*0.4);c.fillText('RUN',w*0.3,h*0.6);c.fillStyle='#600';c.font='10px sans-serif';c.fillText('get away from this pc',w*0.1,h*0.8)}},
{title:'black',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#f00';c.fillRect(w*0.49,h*0.49,w*0.02,h*0.02)}},
{title:'the demos',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#888';c.font='9px monospace';c.fillText('demo001.dem',w*0.1,h*0.2);c.fillText('demo002.dem',w*0.1,h*0.3);c.fillText('demo003.dem',w*0.1,h*0.4);c.fillText('demo004.dem',w*0.1,h*0.5);c.fillText('demo005.dem',w*0.1,h*0.6);c.fillStyle='#c00';c.font='8px sans-serif';c.fillText('DO NOT PLAY',w*0.1,h*0.8);c.fillText('THE DEMOS',w*0.15,h*0.9)}},
{title:'who had this b4 me',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#888';c.font='10px sans-serif';c.fillText('who had this drive',w*0.1,h*0.3);c.fillText('before me?',w*0.2,h*0.45);c.fillText('who had it before them?',w*0.05,h*0.6);c.fillStyle='#444';c.fillText('how many?',w*0.25,h*0.8)}},
{title:'moms plate',draw:(c,w,h)=>{c.fillStyle='#111';c.fillRect(0,0,w,h);c.fillStyle='#ddd';c.beginPath();c.ellipse(w*0.5,h*0.5,w*0.2,h*0.12,0,0,Math.PI*2);c.fill();c.fillStyle='#d4a04a';c.fillRect(w*0.38,h*0.42,w*0.08,h*0.06);c.fillStyle='#444';c.font='8px sans-serif';c.fillText('she left it outside my door',w*0.08,h*0.8);c.fillText('i never touched it',w*0.15,h*0.9)}},
{title:'last drawing',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#333';c.font='10px sans-serif';c.fillText('this is my last drawing',w*0.1,h*0.3);c.fillText('i dont want 2 draw anymore',w*0.05,h*0.45);c.fillText('i dont want 2 do anything',w*0.05,h*0.6);c.fillText('anymore',w*0.3,h*0.75)}},
{title:'i just wanted 2 play',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#5577aa';c.fillRect(0,0,w,h*0.4);c.fillStyle='#c4a04a';c.fillRect(0,h*0.4,w,h*0.6);c.fillStyle='#8B7355';c.fillRect(w*0.3,h*0.2,w*0.4,h*0.25);c.fillStyle='#000';c.fillRect(w*0.45,h*0.3,w*0.1,h*0.15);c.fillStyle='#c00';c.font='9px sans-serif';c.fillText('i just wanted 2 play dustbowl',w*0.05,h*0.8);c.fillText('with my frends',w*0.2,h*0.9)}},
{title:'i can feel it eating',draw:(c,w,h)=>{c.fillStyle='#000';c.fillRect(0,0,w,h);c.fillStyle='#200';c.beginPath();c.arc(w*0.5,h*0.5,w*0.3,0,Math.PI*2);c.fill();c.fillStyle='#000';c.beginPath();c.arc(w*0.5,h*0.5,w*0.15,0,Math.PI*2);c.fill();c.fillStyle='#600';c.font='8px sans-serif';c.fillText('i can feel it eating me',w*0.15,h*0.9);c.fillText('from the inside',w*0.25,h*0.97)}},
]};

const openPaintGallery=()=>{
const isC=false;
const drawings=isC?[...duckDrawings.normal,...duckDrawings.corrupted]:duckDrawings.normal;
let thumbs='<div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px;max-height:500px;overflow-y:auto">';
drawings.forEach((d,i)=>{
thumbs+='<div class="gallery-thumb" data-idx="'+i+'" style="cursor:pointer;text-align:center;width:90px"><canvas class="gt-canvas" width="90" height="70" style="border:1px solid #888;display:block;background:#0a0a0a"></canvas><div style="font-size:9px;color:#555;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:90px">'+d.title+'</div></div>';
});
thumbs+='</div>';
createWindow('gallery',"Duck's Saved Drawings",520,400,thumbs);
setTimeout(()=>{
document.querySelectorAll('.gt-canvas').forEach((canvas,i)=>{
if(i>=drawings.length)return;
const ctx=canvas.getContext('2d');
ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,90,70);
drawings[i].draw(ctx,90,70);
});
document.querySelectorAll('.gallery-thumb').forEach(thumb=>{
thumb.addEventListener('click',()=>{
const idx=parseInt(thumb.dataset.idx);
if(idx>=drawings.length)return;
const d=drawings[idx];
const h='<div style="text-align:center;padding:8px;background:#222"><canvas id="gallery-big" width="400" height="300" style="border:1px solid #888;display:block;margin:0 auto;background:#0a0a0a"></canvas><div style="font-size:12px;color:#aaa;margin-top:6px;font-family:Tahoma">'+d.title+'</div><div style="font-size:9px;color:#666;margin-top:2px">by TheDustBwlDuck</div></div>';
createWindow('gallery-view',d.title,440,370,h);
setTimeout(()=>{
const bigCanvas=document.getElementById('gallery-big');
if(!bigCanvas)return;
const ctx=bigCanvas.getContext('2d');
ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,400,300);
d.draw(ctx,400,300);
},50);
});
});
},100);
};
const openLimeWire=()=>{
const files=[
{name:'linkin_park_numb.mp3',size:'4.2 MB',status:'Complete',sources:247},
{name:'System_Of_A_Down_-_Chop_Suey.mp3',size:'3.8 MB',status:'Complete',sources:189},
{name:'Dragonforce_-_Through_Fire.mp3',size:'7.1 MB',status:'Complete',sources:312},
{name:'Green_Day_-_Holiday.mp3',size:'3.5 MB',status:'Downloading... 78%',sources:94},
{name:'Blink_182_-_All_The_Small_Things.mp3',size:'3.1 MB',status:'Queued',sources:156},
{name:'DEFINITELY_NOT_A_VIRUS.exe',size:'847 KB',status:'Complete',sources:2},
{name:'naruto_opening_4.mp3',size:'4.0 MB',status:'Complete',sources:88}
];
let rows='';files.forEach(f=>{
const color=f.status==='Complete'?'#0a0':'#888';
rows+=`<div style="display:flex;gap:8px;padding:3px 6px;border-bottom:1px solid #d4d0c8;font-size:11px"><div style="flex:2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${f.name}</div><div style="width:60px;text-align:right">${f.size}</div><div style="width:110px;color:${color}">${f.status}</div><div style="width:50px;text-align:right">${f.sources}</div></div>`;
});
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#fff;font-family:Tahoma,sans-serif;font-size:12px;color:#000">
<div style="background:#e8f5e8;padding:4px 8px;border-bottom:1px solid #808080;display:flex;align-items:center;gap:8px">
<span style="font-weight:bold;color:#2d7a2d">LimeWire PRO</span>
<span style="color:#808080;font-size:10px">5.5.10</span>
<span style="margin-left:auto;color:#2d7a2d;font-size:10px">● Connected (247 sources)</span>
</div>
<div style="padding:4px 8px;background:#ece9d8;border-bottom:1px solid #808080;display:flex;gap:4px">
<input style="flex:1;padding:2px 4px;border:2px inset #808080;font-size:11px;font-family:Tahoma" value="tf2 soundtrack" readonly>
<button style="padding:2px 12px;background:#2d7a2d;color:#fff;border:2px outset #5cb85c;font-size:11px;font-family:Tahoma">Search</button>
</div>
<div style="display:flex;gap:8px;padding:3px 6px;border-bottom:2px solid #808080;font-size:10px;font-weight:bold;background:#d4d0c8">
<div style="flex:2">Filename</div><div style="width:60px;text-align:right">Size</div><div style="width:110px">Status</div><div style="width:50px;text-align:right">Sources</div>
</div>
<div style="flex:1;overflow-y:auto">${rows}</div>
<div style="padding:4px 8px;background:#ece9d8;border-top:1px solid #808080;font-size:10px;color:#808080;display:flex;justify-content:space-between">
<span>Downloads: 7 files</span><span>Upload Speed: 12 KB/s</span><span>Shared: 12 files</span>
</div></div>`;
createWindow('limewire','LimeWire PRO 5.5.10',520,340,h);
};

const openFraps=()=>{
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#2b2b2b;font-family:Tahoma,sans-serif;color:#fff">
<div style="display:flex;border-bottom:1px solid #444">
<div style="padding:6px 14px;background:#3a3a3a;font-size:11px;border-bottom:2px solid #f0ad4e;color:#f0ad4e;font-weight:bold">FPS</div>
<div style="padding:6px 14px;font-size:11px;color:#888">Movies</div>
<div style="padding:6px 14px;font-size:11px;color:#888">Screenshots</div>
</div>
<div style="padding:16px;flex:1">
<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px">
<span style="font-size:48px;color:#f0ad4e;font-weight:bold">60</span>
<span style="font-size:14px;color:#888">FPS</span>
</div>
<div style="margin-bottom:12px;font-size:12px">
<div style="color:#888;margin-bottom:4px">Overlay Corner</div>
<div style="display:flex;gap:4px">
<button style="padding:3px 10px;background:#444;border:1px solid #555;color:#f0ad4e;font-size:11px;font-family:Tahoma">Top Left</button>
<button style="padding:3px 10px;background:#333;border:1px solid #555;color:#888;font-size:11px;font-family:Tahoma">Top Right</button>
<button style="padding:3px 10px;background:#333;border:1px solid #555;color:#888;font-size:11px;font-family:Tahoma">Bottom</button>
</div></div>
<div style="font-size:12px">
<div style="color:#888;margin-bottom:4px">Overlay Hotkey</div>
<div style="padding:4px 8px;background:#333;border:1px solid #555;display:inline-block;font-size:11px">F11</div>
</div>
</div>
<div style="padding:8px 16px;background:#222;border-top:1px solid #444;font-size:10px;color:#f00">UNREGISTERED VERSION - www.fraps.com</div>
</div>`;
createWindow('fraps','Fraps 3.4.7 (unregistered)',380,300,h);
};

const openWinRAR=()=>{
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#ece9d8;font-family:Tahoma,sans-serif;font-size:12px">
<div style="padding:20px;text-align:center;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">
<div style="font-size:14px;font-weight:bold;margin-bottom:12px">WinRAR</div>
<div style="font-size:12px;color:#000;margin-bottom:4px">Your evaluation copy of WinRAR has expired.</div>
<div style="font-size:11px;color:#808080;margin-bottom:16px">Days since expiration: <b style="color:#cc0000">1,094</b></div>
<div style="border:1px solid #808080;padding:12px;background:#fff;margin-bottom:16px;font-size:11px;text-align:left;width:280px">
<div style="margin-bottom:4px">WinRAR 3.93 - Evaluation Copy</div>
<div style="color:#808080">Please purchase a license at www.rarlab.com</div>
<div style="color:#808080;margin-top:8px">This is not free software. After a 40 day trial peroid you must either buy a license or remove it from your computer.</div>
</div>
<div style="display:flex;gap:6px">
<button onclick="closeWindow('winrar')" style="padding:4px 20px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Close</button>
<button style="padding:4px 20px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer;color:#808080">Buy Now</button>
</div>
</div></div>`;
createWindow('winrar','WinRAR - Evaluation Copy',340,280,h);
};

const openAudacity=()=>{
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#c0c0c0;font-family:Tahoma,sans-serif;font-size:11px;color:#000">
<div style="display:flex;gap:2px;padding:2px 4px;background:#ece9d8;border-bottom:1px solid #808080;font-size:11px">
<span style="padding:1px 6px">File</span><span style="padding:1px 6px">Edit</span><span style="padding:1px 6px">View</span><span style="padding:1px 6px">Transport</span><span style="padding:1px 6px">Tracks</span><span style="padding:1px 6px">Generate</span><span style="padding:1px 6px">Effect</span><span style="padding:1px 6px">Help</span>
</div>
<div style="display:flex;gap:4px;padding:4px 8px;background:#ece9d8;border-bottom:1px solid #808080;align-items:center">
<button style="padding:2px 6px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer">⏮</button>
<button style="padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer;color:#0a0">▶</button>
<button style="padding:2px 8px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer;color:#c00">●</button>
<button style="padding:2px 6px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer">⏹</button>
<button style="padding:2px 6px;background:#ece9d8;border:2px outset #fff;font-size:14px;cursor:pointer">⏭</button>
<span style="margin-left:12px;color:#808080">Volume:</span>
<div style="width:60px;height:8px;background:#fff;border:1px inset #808080"><div style="width:75%;height:100%;background:#316ac5"></div></div>
</div>
<div style="flex:1;background:#333;position:relative;overflow:hidden;margin:4px">
<div style="position:absolute;top:0;left:0;width:100%;height:16px;background:#444;font-size:9px;color:#aaa;display:flex;align-items:center;padding:0 4px">0.0 &nbsp;&nbsp; 1.0 &nbsp;&nbsp; 2.0 &nbsp;&nbsp; 3.0 &nbsp;&nbsp; 4.0 &nbsp;&nbsp; 5.0 &nbsp;&nbsp; 6.0 &nbsp;&nbsp; 7.0</div>
<div style="position:absolute;top:20px;left:4px;right:4px;height:35%;background:#1a1a2a;border:1px solid #555">
<div style="color:#88f;font-size:9px;padding:2px 4px">1 Audio Track (Stereo, 44100Hz, 32-bit)</div>
<canvas id="aud-wave" width="400" height="40" style="width:100%;height:30px"></canvas>
</div>
<div style="position:absolute;top:52%;left:4px;right:4px;height:35%;background:#1a2a1a;border:1px solid #555">
<div style="color:#8f8;font-size:9px;padding:2px 4px">2 Audio Track (Stereo, 44100Hz, 32-bit)</div>
<canvas id="aud-wave2" width="400" height="40" style="width:100%;height:30px"></canvas>
</div>
</div>
<div style="padding:2px 8px;background:#ece9d8;border-top:1px solid #808080;font-size:10px;color:#808080;display:flex;justify-content:space-between">
<span>Project Rate: 44100 Hz</span><span>Selection: 0.000 - 7.234</span><span>Audacity 1.3.12-beta</span>
</div></div>`;
createWindow('audacity','Audacity - tf2_remix_v47_FINAL_FINAL2',550,350,h);
setTimeout(()=>{
['aud-wave','aud-wave2'].forEach(id=>{
const c=document.getElementById(id);if(!c)return;const ctx=c.getContext('2d');
ctx.fillStyle=id==='aud-wave'?'#1a1a2a':'#1a2a1a';ctx.fillRect(0,0,400,40);
const col=id==='aud-wave'?'#4444cc':'#44cc44';
ctx.strokeStyle=col;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,20);
for(let x=0;x<400;x++){const a=Math.sin(x*0.05)*Math.sin(x*0.02)*(8+Math.random()*8);ctx.lineTo(x,20+a)}
ctx.stroke();
});
},100);
};

const openMirc=()=>{
const msgs=[
{t:'19:30',u:'dustbowlBOSS_admin',m:'welcome evry1 to dustbowl 24/7'},
{t:'19:31',u:'xX_SC0UT_RULEZ_Xx',m:'BONK'},
{t:'19:31',u:'hevy_sandvich_man',m:'sandvich time'},
{t:'19:32',u:'PYROMANIAC_99',m:'FIRE FIRE FIRE'},
{t:'19:32',u:'cr1tical_h1t',m:'any1 wanna do mge after this?'},
{t:'19:33',u:'spycrab_lol',m:'*does spycrab*'},
{t:'19:33',u:'M3DIC_OR_RIOT',m:'MEDIC MEDIC MEDIC'},
{t:'19:34',u:'TheDustBwlDuck',m:'hey guys'},
{t:'19:34',u:'sENTRY_gUY_420',m:'hEY dUCK'},
{t:'19:35',u:'hatcollector3000',m:'any1 have a vintage merryweather for trade?'},
{t:'19:35',u:'BONKBONKBONK',m:'BONK'},
{t:'19:36',u:'TheDustBwlDuck',m:'whos on red team rn'},
{t:'19:36',u:'xX_SC0UT_RULEZ_Xx',m:'ME IM DOMINATING EVERYONE'},
{t:'19:37',u:'cr1tical_h1t',m:'you went 2 and 9 last round'},
{t:'19:37',u:'xX_SC0UT_RULEZ_Xx',m:'THOSE WERE TACTICAL'},
{t:'19:38',u:'dustbowlBOSS_admin',m:'play nice evry1'},
{t:'19:38',u:'PYROMANIAC_99',m:'no'},
{t:'19:39',u:'TheDustBwlDuck',m:'lmaooo'},
{t:'19:39',u:'n00bkillaXD',m:'IM THE BEST PLAYER HERE'},
{t:'19:40',u:'TheDustBwlDuck',m:'u literaly just joined'},
{t:'19:40',u:'spycrab_lol',m:'gentlemen'},
{t:'19:41',u:'backstabMASTA',m:'FYI going spy next round'},
{t:'19:41',u:'cloakedNdaggerd',m:'oh no not again'}
];
let log='';msgs.forEach(m=>{log+=`<div style="font-size:11px;line-height:1.4;padding:1px 0"><span style="color:#808080">[${m.t}]</span> <span style="color:${m.u==='TheDustBwlDuck'?'#00c':'#c00'};font-weight:bold">&lt;${m.u}&gt;</span> ${m.m}</div>`});
const users=['@dustbowlBOSS_admin','+TheDustBwlDuck','xX_SC0UT_RULEZ_Xx','PYROMANIAC_99','cr1tical_h1t','M3DIC_OR_RIOT','BONKBONKBONK','hevy_sandvich_man','spycrab_lol','sENTRY_gUY_420','hatcollector3000','n00bkillaXD','backstabMASTA','cloakedNdaggerd','2FORT_4EVER','xx_FRAGZ_xx','sn1p3r_n0_sc0p3','ROCKETLAUNCHER69','PAYLOAD_PUSHR','I_MAIN_EVERYTHING','iiiiillllllllll','dj_n00dles','_______'];
let userList='';users.forEach(u=>{const col=u.startsWith('@')?'#c00':u.startsWith('+')?'#00c':'#000';userList+=`<div style="font-size:10px;color:${col};padding:1px 4px">${u}</div>`});
const h=`<div style="display:flex;flex-direction:column;height:100%;background:#fff;font-family:Tahoma,sans-serif;font-size:12px;color:#000">
<div style="padding:2px 6px;background:#ece9d8;border-bottom:1px solid #808080;font-size:10px;color:#808080">#tf2-dustbowl on irc.gamesurge.net</div>
<div style="flex:1;display:flex;overflow:hidden">
<div style="flex:1;overflow-y:auto;padding:4px 8px;border-right:1px solid #808080;background:#fff">${log}</div>
<div style="width:140px;overflow-y:auto;padding:4px 0;background:#f8f8f8">
<div style="font-size:10px;font-weight:bold;padding:2px 4px;border-bottom:1px solid #d4d0c8;color:#808080">${users.length} users</div>
${userList}
</div>
</div>
<div style="display:flex;padding:2px 4px;background:#ece9d8;border-top:1px solid #808080;gap:4px">
<input style="flex:1;padding:2px 4px;border:2px inset #808080;font-size:11px;font-family:Tahoma" value="" placeholder="Type a message...">
<button style="padding:2px 10px;background:#ece9d8;border:2px outset #fff;font-size:11px;font-family:Tahoma">Send</button>
</div></div>`;
createWindow('mirc','mIRC - #tf2-dustbowl',520,380,h);
};

// Recycle Bin
const openRecycleBin=()=>{
const items=window.pcState===2?[
{name:'its_not_real.txt',content:'i keep telling myself its not real\nits just a game\nits just pixels\n\nbut then y does he kno my name'},
{name:'DELETED_photo_001.png',content:'[IMAGE FILE - CORRUPTED]\n[Cannot display]'},
{name:'uninstall_tf2.bat',content:'@echo off\necho Uninstalling Team Fortress 2...\necho ERROR: Access denied\necho ERROR: File in use by process (PID 201)\necho Uninstall failed.'},
{name:'help_me.txt',content:'somebody pls help me\ni dont kno who 2 ask\nmy friends think im crazy\nmaybe i am crazy\n\nbut hes real\nhes real hes real hes real'}
]:[
{name:'essay_draft_OLD.txt',content:'ok so the american revoltion\n\nu kno what forget it im starting over'},
{name:'screenshot_003.png',content:'[IMAGE FILE]\n[dustbowl screenshot - bad quality]'},
{name:'untitled.txt',content:''},
{name:'New Folder',content:'[EMPTY FOLDER]'}
];
let list='';items.forEach((item,i)=>{
list+=`<div class="explorer-item" data-bin-idx="${i}"><div class="explorer-item-icon">\uD83D\uDCC4</div><div class="explorer-item-name">${item.name}</div></div>`;
});
const h=`<div class="app-explorer"><div class="explorer-toolbar"><span style="font-family:Tahoma,sans-serif;font-size:11px;color:#000;padding:2px 4px">Recycle Bin - ${items.length} item(s)</span></div><div class="explorer-content" style="background:#fff">${list}</div></div>`;
createWindow('recyclebin','Recycle Bin',400,300,h);
document.querySelectorAll('[data-bin-idx]').forEach(el=>{
el.addEventListener('click',()=>{const idx=parseInt(el.dataset.binIdx);openTextEditor(items[idx].content,items[idx].name)});
});
};

// Browser with fake pages
const browserPages={
'dustbowl247.community-tf2.net':{title:'Dustbowl 24/7 - Community Server',body:`<div style="background:#2b2b2b;padding:16px;min-height:100%">
<div style="color:#f0ad4e;font-size:18px;font-weight:bold;font-family:Tahoma,sans-serif">DUSTBOWL 24/7</div>
<div style="color:#808080;font-size:11px;margin-top:4px;font-family:Tahoma,sans-serif">Community TF2 Server | cp_dustbowl</div>
<div style="border:1px solid #444;margin:12px 0;padding:8px;background:#1a1a1a;font-family:Tahoma,sans-serif;font-size:12px">
<div style="color:#fff;margin-bottom:8px">Server Status: <span style="color:#5cb85c">ONLINE</span></div>
<div style="color:#aaa">Players: 22/24</div>
<div style="color:#aaa">Map: cp_dustbowl</div>
<div style="color:#aaa">IP: 68.142.15.201:27015</div>
</div>
<div style="color:#888;font-size:11px;font-family:Tahoma,sans-serif">Top Players This Week:</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">1. xx_FRAGZ_xx - 2,847 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">2. TheDustBwlDuck - 2,415 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">3. cr1tical_h1t - 1,923 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">4. PYROMANIAC_99 - 1,876 pts</div>
<div style="color:#aaa;font-size:11px;font-family:Tahoma,sans-serif;padding:4px 0">5. sENTRY_gUY_420 - 1,654 pts</div>
<div style="color:#555;font-size:10px;margin-top:16px;font-family:Tahoma,sans-serif">Admin: dustbowlDAVE | Est. 2008 | Rules: No cheating, no sprays with nsfw</div>
</div>`},
'steamcommunity.com/id/thedustbwlduck':{title:'Steam Community :: TheDustBwlDuck',body:`<div style="background:#1b2838;padding:16px;min-height:100%;font-family:Tahoma,sans-serif">
<div style="display:flex;gap:12px;align-items:center;margin-bottom:16px">
<div style="width:64px;height:64px;background:#2a475e;border:1px solid #4a6b8a;display:flex;align-items:center;justify-content:center;color:#66c0f4;font-size:10px">IMAGE<br>MISSING</div>
<div>
<div style="color:#fff;font-size:16px">TheDustBwlDuck</div>
<div style="color:#57cbde;font-size:11px">Currently Online</div>
<div style="color:#8f98a0;font-size:10px;margin-top:4px">Member since October 10, 2007</div>
</div>
</div>
<div style="background:#2a475e;padding:8px;margin-bottom:8px;border:1px solid #4a6b8a">
<div style="color:#fff;font-size:12px;margin-bottom:4px">Currently In-Game</div>
<div style="color:#90ba3c;font-size:11px">Team Fortress 2</div>
</div>
<div style="color:#8f98a0;font-size:11px;border-top:1px solid #2a475e;padding-top:8px">
<div style="margin-bottom:4px"><span style="color:#fff">2,847</span> hrs on record</div>
<div style="margin-bottom:4px">Most played: Team Fortress 2 (2,847 hrs)</div>
<div>Games owned: 3 (The Orange Box)</div>
</div>
<div style="color:#8f98a0;font-size:10px;margin-top:12px;border-top:1px solid #2a475e;padding-top:8px">
<div style="color:#fff;font-size:11px;margin-bottom:4px">About me:</div>
<div>dustbowl is the best map ever made and u cant change my mind. medic main btw. dont add me if ur gona be weird.</div>
<div style="margin-top:8px">i play on dustbowl 24/7 server evry nite. come say hi.</div>
</div>
</div>`}
};

const openPlatformer=()=>{
const h=`<div style="width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column"><canvas id="plat-canvas" width="480" height="320" style="border:1px solid #333;image-rendering:pixelated;background:#1a0a2e"></canvas><div id="plat-hud" style="font-family:'Press Start 2P',monospace;font-size:9px;color:#ff0;margin-top:4px;text-align:center">Arrow Keys to move. Space to jump.</div></div>`;
createWindow('platformer','SUPER DUST MAN v2.1 (FREE)',520,400,h);
setTimeout(()=>initPlatformer(),100);
};
const initPlatformer=()=>{
const canvas=document.getElementById('plat-canvas');
if(!canvas)return;
const ctx=canvas.getContext('2d');
const W=480,H=320;
let px=40,py=200,pvx=0,pvy=0,onGround=false,score=0,dead=false,frame=0;
const gravity=0.5,jumpForce=-8,speed=3;
const keys={};
document.addEventListener('keydown',(e)=>{keys[e.key]=true;if(e.key===' ')e.preventDefault()});
document.addEventListener('keyup',(e)=>{keys[e.key]=false});
const platforms=[
{x:0,y:280,w:480,h:40},
{x:80,y:230,w:80,h:10},
{x:200,y:190,w:100,h:10},
{x:340,y:220,w:80,h:10},
{x:50,y:150,w:70,h:10},
{x:180,y:120,w:90,h:10},
{x:320,y:100,w:80,h:10},
{x:420,y:150,w:60,h:10},
{x:100,y:80,w:80,h:10},
{x:250,y:50,w:100,h:10}
];
const coins=[
{x:110,y:210,w:10,h:10,got:false},
{x:240,y:170,w:10,h:10,got:false},
{x:370,y:200,w:10,h:10,got:false},
{x:80,y:130,w:10,h:10,got:false},
{x:210,y:100,w:10,h:10,got:false},
{x:350,y:80,w:10,h:10,got:false},
{x:440,y:130,w:10,h:10,got:false},
{x:130,y:60,w:10,h:10,got:false},
{x:290,y:30,w:10,h:10,got:false}
];
const enemies=[
{x:150,y:268,w:14,h:12,sx:150,ex:260,dir:1,spd:1},
{x:200,y:178,w:14,h:12,sx:200,ex:290,dir:1,spd:0.8},
{x:100,y:68,w:14,h:12,sx:100,ex:170,dir:1,spd:1.2}
];
const collide=(ax,ay,aw,ah,bx,by,bw,bh)=>ax<bx+bw&&ax+aw>bx&&ay<by+bh&&ay+ah>by;
const restart=()=>{px=40;py=200;pvx=0;pvy=0;dead=false;score=0;coins.forEach(c=>c.got=false);enemies.forEach(e=>{e.x=e.sx;e.dir=1})};
const loop=()=>{
if(!document.getElementById('plat-canvas'))return;
frame++;
if(!dead){
if(keys['ArrowLeft']||keys['a'])pvx=-speed;
else if(keys['ArrowRight']||keys['d'])pvx=speed;
else pvx*=0.7;
if((keys[' ']||keys['ArrowUp']||keys['w'])&&onGround){pvy=jumpForce;onGround=false}
pvy+=gravity;
px+=pvx;py+=pvy;
onGround=false;
platforms.forEach(p=>{
if(pvy>=0&&py+14<=p.y+pvy+1&&py+14+pvy>=p.y&&px+12>p.x&&px<p.x+p.w){
py=p.y-14;pvy=0;onGround=true;
}
});
if(px<0)px=0;if(px>W-12)px=W-12;
if(py>H+20)restart();
coins.forEach(c=>{if(!c.got&&collide(px,py,12,14,c.x,c.y,c.w,c.h)){c.got=true;score++}});
enemies.forEach(e=>{
e.x+=e.spd*e.dir;
if(e.x<=e.sx||e.x>=e.ex)e.dir*=-1;
if(collide(px,py,12,14,e.x,e.y,e.w,e.h)){
if(pvy>0&&py+14<e.y+6){e.y=-100;score+=3;pvy=-5}
else{dead=true}
}
});
}else{
if(keys[' '])restart();
}
// draw
ctx.fillStyle='#1a0a2e';ctx.fillRect(0,0,W,H);
// stars
if(frame%2===0){for(let i=0;i<3;i++){ctx.fillStyle='rgba(255,255,255,0.3)';ctx.fillRect(Math.random()*W,Math.random()*H,1,1)}}
// platforms
platforms.forEach((p,i)=>{ctx.fillStyle=i===0?'#2d5a1e':'#4a2a6e';ctx.fillRect(p.x,p.y,p.w,p.h);if(i>0){ctx.fillStyle='#5a3a8e';ctx.fillRect(p.x,p.y,p.w,2)}});
// coins
coins.forEach(c=>{if(!c.got){ctx.fillStyle=frame%20<10?'#ffcc00':'#ff9900';ctx.fillRect(c.x+1,c.y+1,8,8);ctx.fillStyle='#ffee88';ctx.fillRect(c.x+3,c.y+2,3,4)}});
// enemies
enemies.forEach(e=>{if(e.y>-50){ctx.fillStyle='#cc2222';ctx.fillRect(e.x,e.y,e.w,e.h);ctx.fillStyle='#fff';ctx.fillRect(e.x+2,e.y+2,3,3);ctx.fillRect(e.x+8,e.y+2,3,3)}});
// player
ctx.fillStyle=dead?'#666':'#44aaff';ctx.fillRect(px,py,12,14);
ctx.fillStyle='#fff';ctx.fillRect(px+2,py+2,3,3);ctx.fillRect(px+7,py+2,3,3);
ctx.fillStyle='#ffcc00';ctx.fillRect(px+1,py-3,10,3);
// hud
ctx.fillStyle='#ff0';ctx.font='10px Press Start 2P';ctx.textAlign='left';
ctx.fillText('COINS: '+score+'/'+coins.length,8,16);
ctx.textAlign='right';ctx.fillText('SUPER DUST MAN',W-8,16);
if(dead){ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#f00';ctx.font='16px Press Start 2P';ctx.textAlign='center';ctx.fillText('GAME OVER',W/2,H/2-10);ctx.fillStyle='#fff';ctx.font='9px Press Start 2P';ctx.fillText('Press SPACE to retry',W/2,H/2+15)}
if(score>=coins.length&&!dead){ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#0f0';ctx.font='14px Press Start 2P';ctx.textAlign='center';ctx.fillText('YOU WIN!!',W/2,H/2-10);ctx.fillStyle='#fff';ctx.font='9px Press Start 2P';ctx.fillText('Press SPACE to play again',W/2,H/2+15);if(keys[' '])restart()}
requestAnimationFrame(loop);
};
loop();
};

const openSnake=()=>{
const h=`<div style="width:100%;height:100%;background:#000;display:flex;align-items:center;justify-content:center;flex-direction:column"><canvas id="snake-canvas" width="300" height="300" style="border:2px solid #333;image-rendering:pixelated;background:#0a0a0a"></canvas><div id="snake-hud" style="font-family:'Press Start 2P',monospace;font-size:9px;color:#0f0;margin-top:6px">Arrow Keys to move</div></div>`;
createWindow('snake','Snake',340,380,h);
setTimeout(()=>initSnake(),100);
};
const initSnake=()=>{
const canvas=document.getElementById('snake-canvas');
if(!canvas)return;
const ctx=canvas.getContext('2d');
const G=15,C=300/G;
let snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
let dir={x:1,y:0};
let nextDir={x:1,y:0};
let food=spawnFood();
let score=0;
let dead=false;
let speed=120;
let lastTime=0;
function spawnFood(){
let f;
do{f={x:Math.floor(Math.random()*C),y:Math.floor(Math.random()*C)}}
while(snake.some(s=>s.x===f.x&&s.y===f.y));
return f;
}
document.addEventListener('keydown',(e)=>{
if(e.key==='ArrowUp'&&dir.y===0){nextDir={x:0,y:-1};e.preventDefault()}
else if(e.key==='ArrowDown'&&dir.y===0){nextDir={x:0,y:1};e.preventDefault()}
else if(e.key==='ArrowLeft'&&dir.x===0){nextDir={x:-1,y:0};e.preventDefault()}
else if(e.key==='ArrowRight'&&dir.x===0){nextDir={x:1,y:0};e.preventDefault()}
else if(e.key===' '&&dead){snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};nextDir={x:1,y:0};food=spawnFood();score=0;dead=false;speed=120}
});
const loop=(t)=>{
if(!document.getElementById('snake-canvas'))return;
if(t-lastTime>speed&&!dead){
lastTime=t;
dir=nextDir;
const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
if(head.x<0||head.x>=C||head.y<0||head.y>=C||snake.some(s=>s.x===head.x&&s.y===head.y)){
dead=true;
}else{
snake.unshift(head);
if(head.x===food.x&&head.y===food.y){
score++;
food=spawnFood();

if(score===25){triggerSpoonEnding();return}
}else{
snake.pop();
}
}
}
ctx.fillStyle='#0a0a0a';
ctx.fillRect(0,0,300,300);
// grid
ctx.strokeStyle='#111';
ctx.lineWidth=0.5;
for(let i=0;i<=C;i++){
ctx.beginPath();ctx.moveTo(i*G,0);ctx.lineTo(i*G,300);ctx.stroke();
ctx.beginPath();ctx.moveTo(0,i*G);ctx.lineTo(300,i*G);ctx.stroke();
}
// food
ctx.fillStyle='#ff0000';
ctx.fillRect(food.x*G+1,food.y*G+1,G-2,G-2);
ctx.fillStyle='#ff4444';
ctx.fillRect(food.x*G+3,food.y*G+2,G-6,G-5);
// snake
snake.forEach((s,i)=>{
ctx.fillStyle=i===0?'#00ff00':'#00cc00';
ctx.fillRect(s.x*G+1,s.y*G+1,G-2,G-2);
if(i===0){
ctx.fillStyle='#000';
const ex=dir.x===1?9:dir.x===-1?2:3;
const ey=dir.y===1?9:dir.y===-1?2:3;
ctx.fillRect(s.x*G+ex,s.y*G+ey,3,3);
ctx.fillRect(s.x*G+ex+(dir.y!==0?6:0),s.y*G+ey+(dir.x!==0?6:0),3,3);
}
});
// score
ctx.fillStyle='#0f0';
ctx.font='10px Press Start 2P';
ctx.textAlign='left';
ctx.fillText('SCORE: '+score,6,14);
// dead
if(dead){
ctx.fillStyle='rgba(0,0,0,0.7)';
ctx.fillRect(0,0,300,300);
ctx.fillStyle='#f00';
ctx.font='14px Press Start 2P';
ctx.textAlign='center';
ctx.fillText('GAME OVER',150,140);
ctx.fillStyle='#0f0';
ctx.font='9px Press Start 2P';
ctx.fillText('Score: '+score,150,165);
ctx.fillStyle='#888';
ctx.fillText('SPACE to retry',150,190);
}
requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
};

// SPOON ENDING
function triggerSpoonEnding(){
const scr=document.createElement('div');
scr.style.cssText='position:fixed;top:0;left:0;width:100vw;height:100vh;background:#000;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;cursor:pointer';
document.body.appendChild(scr);
const box=document.createElement('div');
box.style.cssText='text-align:center;max-width:600px;padding:40px';
scr.appendChild(box);
const lines=[
{t:'wait.',d:1500,s:16,c:'#888'},
{t:'25 points?',d:1500,s:18,c:'#aaa'},
{t:'in SNAKE?',d:1500,s:18,c:'#aaa'},
{t:'on a dead kids computer?',d:2000,s:14,c:'#666'},
{t:'...',d:1500,s:14,c:'#555'},
{t:'you know what you deserve?',d:2000,s:16,c:'#888'},
{t:'',d:1000,s:14,c:'#555'},
{t:'spoon',d:800,s:20,c:'#cf6a32'},
{t:'spoon',d:600,s:22,c:'#cf6a32'},
{t:'spoon',d:500,s:24,c:'#cf6a32'},
{t:'spoon',d:400,s:28,c:'#cf6a32'},
{t:'SPOON',d:400,s:32,c:'#cf6a32'},
{t:'SPOON',d:300,s:36,c:'#ff6a32'},
{t:'SPOON',d:300,s:40,c:'#ff6a32'},
{t:'SPOON SPOON SPOON',d:300,s:28,c:'#ff4444'},
{t:'SPOON SPOON SPOON SPOON SPOON',d:300,s:22,c:'#ff4444'},
{t:'SPOOOOOOOOOOOON',d:500,s:36,c:'#ff0000'},
{t:'',d:2000,s:14,c:'#555'},
{t:'ENDING: spoon.',d:0,s:20,c:'#cf6a32'},
];
let delay=1500;
lines.forEach(l=>{
setTimeout(()=>{
const div=document.createElement('div');
div.style.cssText='opacity:0;transition:opacity .8s;margin:4px 0;font-family:VT323,monospace;font-size:'+l.s+'px;color:'+l.c;
div.textContent=l.t;box.appendChild(div);
setTimeout(()=>{div.style.opacity='1'},50);
// Shake screen on big spoons
if(l.s>=28){scr.style.animation='none';scr.offsetHeight;scr.style.animation='spoonShake .08s '+(l.s>32?8:4)}
},delay);delay+=l.d+800;
});
// Click to dismiss
setTimeout(()=>{
const back=document.createElement('div');
back.style.cssText='margin-top:20px;font-family:VT323,monospace;font-size:12px;color:#444;opacity:0;transition:opacity 1s';
back.textContent='click to go back to your regularly scheduled ARG';
box.appendChild(back);setTimeout(()=>{back.style.opacity='1'},50);
scr.addEventListener('click',()=>scr.remove());
},delay+2000);
if(!document.getElementById('spoon-style')){
const st=document.createElement('style');st.id='spoon-style';
st.textContent='@keyframes spoonShake{0%,100%{transform:translate(0)}25%{transform:translate(-8px,4px)}50%{transform:translate(6px,-6px)}75%{transform:translate(-4px,8px)}}';
document.head.appendChild(st);
}
};

// ============ WEBCAM ============
const openWebcam=()=>{
const isC=false;
const cW=320,cH=240;
const h='<div style="background:#000;padding:0"><canvas id="webcam-canvas" width="'+cW+'" height="'+cH+'" style="display:block;width:100%"></canvas><div style="background:#222;padding:4px 8px;font-family:Tahoma;font-size:10px;color:#888;display:flex;justify-content:space-between"><span>'+(isC?'<span style="color:#f00">FEED CORRUPTED</span>':'USB Camera - No Signal')+'</span><span>REC</span></div></div>';
createWindow('webcam','Webcam',340,290,h);
setTimeout(()=>{
const canvas=document.getElementById('webcam-canvas');if(!canvas)return;
const ctx=canvas.getContext('2d');
const draw=()=>{
if(!document.getElementById('webcam-canvas'))return;
const img=ctx.createImageData(cW,cH);
for(let i=0;i<img.data.length;i+=4){
const v=Math.random()*(isC?40:60);
img.data[i]=v*(isC&&Math.random()>0.85?2:1);
img.data[i+1]=isC?0:v;
img.data[i+2]=isC?0:v;
img.data[i+3]=255;
}
ctx.putImageData(img,0,0);
if(isC&&Math.random()>0.95){
ctx.fillStyle='rgba(0,0,0,0.8)';
ctx.fillRect(cW/2-15,cH/2-40,30,80);
ctx.fillRect(cW/2-5,cH/2-50,10,15);
}
ctx.font='10px monospace';ctx.fillStyle=isC?'#f00':'#888';
ctx.fillText(isC?'05/28/2010 12:06:00':'09/30/2010 19:42:'+String(Math.floor(Math.random()*60)).padStart(2,'0'),5,cH-5);
requestAnimationFrame(draw);
};draw();
},100);
};

// ============ TASK MANAGER ============
const openTaskMgr=()=>{
const isC=false;
const procs=isC?[
{name:'soos.sys',pid:'001',mem:'12,480 K',cpu:'2%',status:'Running'},
{name:'desktop.exe',pid:'002',mem:'8,192 K',cpu:'1%',status:'Running'},
{name:'cubey.pet',pid:'003',mem:'2,048 K',cpu:'3%',status:'<span style="color:#ff0">MEMORY RESTORED</span>'},
{name:'explorer.exe',pid:'047',mem:'6,144 K',cpu:'1%',status:'Running'},
{name:'hl2.exe',pid:'201',mem:'999,999 K',cpu:'99%',status:'<span style="color:#f00">CANNOT TERMINATE</span>'},
{name:'hl2.exe',pid:'201',mem:'999,999 K',cpu:'99%',status:'<span style="color:#f00">CANNOT TERMINATE</span>'},
{name:'hl2.exe',pid:'201',mem:'999,999 K',cpu:'99%',status:'<span style="color:#f00">CANNOT TERMINATE</span>'},
]:[
{name:'soos.sys',pid:'001',mem:'12,480 K',cpu:'2%',status:'Running'},
{name:'desktop.exe',pid:'002',mem:'8,192 K',cpu:'1%',status:'Running'},
{name:'cubey.pet',pid:'003',mem:'2,048 K',cpu:'3%',status:'Running'},
{name:'explorer.exe',pid:'047',mem:'6,144 K',cpu:'1%',status:'Running'},
{name:'samjs.dll',pid:'088',mem:'1,024 K',cpu:'0%',status:'Running'},
{name:'chat.exe',pid:'012',mem:'3,072 K',cpu:'0%',status:'Running'},
{name:'email.exe',pid:'015',mem:'2,560 K',cpu:'0%',status:'Running'},
];
let rows='';
procs.forEach(p=>{
const isHl2=p.name==='hl2.exe';
rows+='<tr style="'+(isHl2?'background:#2a0a0a;color:#f88':'')+'"><td>'+p.name+'</td><td>'+p.pid+'</td><td>'+p.mem+'</td><td>'+p.cpu+'</td><td>'+p.status+'</td></tr>';
});
const cpuUsage=isC?'99%':'8%';
const memUsage=isC?'3,847 MB / 4,096 MB':'1,240 MB / 4,096 MB';
const h='<div style="font-family:Tahoma;font-size:11px"><div style="background:#ece9d8;padding:4px 8px;border-bottom:1px solid #aaa"><b>Processes</b> | Performance</div><table style="width:100%;border-collapse:collapse;font-size:10px"><tr style="background:#d4d0c8"><th style="text-align:left;padding:2px 4px">Name</th><th>PID</th><th>Memory</th><th>CPU</th><th>Status</th></tr>'+rows+'</table><div style="background:#ece9d8;padding:6px 8px;border-top:1px solid #aaa;display:flex;justify-content:space-between;font-size:10px"><span>CPU: '+cpuUsage+'</span><span>Memory: '+memUsage+'</span><span>Processes: '+procs.length+'</span></div></div>';
createWindow('taskmgr','Task Manager',480,300,h);
};

// ============ DEFRAG ============
const openDefrag=()=>{
const isC=false;
const h='<div style="font-family:Tahoma;font-size:11px;padding:10px"><div style="font-weight:bold;margin-bottom:8px">SoOS Disk Defragmenter</div><div style="font-size:10px;color:#666;margin-bottom:8px">Drive C: — '+(isC?'<span style="color:#f00">CORRUPTED SECTORS DETECTED</span>':'Healthy')+'</div><canvas id="defrag-canvas" width="400" height="200" style="border:1px inset #808080;display:block;margin-bottom:8px;background:#000"></canvas><div style="display:flex;gap:6px;align-items:center"><button id="defrag-btn" style="padding:3px 16px;background:#ece9d8;border:2px outset #fff;font-family:Tahoma;font-size:11px;cursor:pointer">Defragment</button><span id="defrag-status" style="font-size:10px;color:#888">Ready</span></div><div style="margin-top:8px;font-size:9px;color:#888;display:flex;gap:12px"><span><span style="display:inline-block;width:8px;height:8px;background:#4a4"></span> System</span><span><span style="display:inline-block;width:8px;height:8px;background:#44a"></span> Data</span><span><span style="display:inline-block;width:8px;height:8px;background:#aaa"></span> Free</span>'+(isC?'<span><span style="display:inline-block;width:8px;height:8px;background:#f00"></span> Corrupted</span>':'')+'</div></div>';
createWindow('defrag','Disk Defragmenter',440,320,h);
setTimeout(()=>{
const canvas=document.getElementById('defrag-canvas');if(!canvas)return;
const ctx=canvas.getContext('2d');
const cols=50,rows=25,bw=8,bh=8;
const blocks=[];
for(let i=0;i<cols*rows;i++){
if(isC&&Math.random()<0.15)blocks.push('#f00');
else if(Math.random()<0.3)blocks.push('#4a4');
else if(Math.random()<0.5)blocks.push('#44a');
else blocks.push('#222');
}
const drawBlocks=()=>{
ctx.fillStyle='#000';ctx.fillRect(0,0,400,200);
blocks.forEach((c,i)=>{
const x=(i%cols)*bw;const y=Math.floor(i/cols)*bh;
ctx.fillStyle=c;ctx.fillRect(x,y,bw-1,bh-1);
});
};
drawBlocks();
const btn=document.getElementById('defrag-btn');
if(btn)btn.addEventListener('click',()=>{
const status=document.getElementById('defrag-status');
if(status)status.textContent='Defragmenting...';
btn.disabled=true;
let step=0;
const defragStep=()=>{
if(!document.getElementById('defrag-canvas'))return;
if(step>=200){
if(status)status.textContent=isC?'ERROR: Cannot defragment corrupted sectors (PID 201)':'Complete!';
btn.disabled=false;return;
}
// Move a random block
const i=Math.floor(Math.random()*blocks.length);
const j=Math.floor(Math.random()*blocks.length);
if(isC&&blocks[i]==='#f00'){}// Can't move corrupted
else{const tmp=blocks[i];blocks[i]=blocks[j];blocks[j]=tmp}
drawBlocks();step++;
setTimeout(defragStep,30);
};defragStep();
});
},100);
};

// ============ SOLITAIRE ============
const openSolitaire=()=>{
const suits=['\u2660','\u2665','\u2666','\u2663'];
const vals=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let deck=[];
suits.forEach(s=>vals.forEach(v=>deck.push({s,v,c:s==='\u2665'||s==='\u2666'?'#c00':'#000'})));
// Shuffle
for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}
// Build 7 columns
let cols='';
for(let c=0;c<7;c++){
const card=deck.pop();
cols+='<div style="display:inline-block;width:50px;height:70px;background:#fff;border:1px solid #888;border-radius:3px;margin:2px;padding:3px;font-size:11px;font-family:serif;vertical-align:top"><div style="color:'+card.c+'">'+card.v+card.s+'</div><div style="text-align:center;font-size:20px;color:'+card.c+';margin-top:10px">'+card.s+'</div></div>';
}
// Stack
let stackCards='';
for(let i=0;i<4;i++){stackCards+='<div style="display:inline-block;width:50px;height:70px;background:#1a5a1a;border:1px solid #0a3a0a;border-radius:3px;margin:2px"></div>'}
const h='<div style="background:#1a5a1a;padding:10px;min-height:300px"><div style="margin-bottom:10px">'+stackCards+'<div style="display:inline-block;width:50px;height:70px;background:#2a2a8a;border:1px solid #1a1a6a;border-radius:3px;margin:2px;margin-left:20px"></div></div><div>'+cols+'</div><div style="font-family:Tahoma;font-size:10px;color:#8a8;text-align:center;margin-top:15px">SoOS Solitaire — Click cards to play (just kidding, it\'s just for show)</div></div>';
createWindow('solitaire','Solitaire',420,380,h);
};

// ============ STICKY NOTES ============
const openStickyNotes=()=>{
const isC=false;
const notes=isC?[
{color:'#ffff88',text:'remember 2 eat\n\n...i havent eaten today\nor yesterday'},
{color:'#88ffff',text:'DONT OPEN TF2\nDONT OPEN TF2\nDONT OPEN TF2'},
{color:'#ff88ff',text:'mikes number:\n555-0142\n\ncall him. tell him\nim sorry.'},
{color:'#ffbb88',text:'201\n201\n201\n201'},
{color:'#88ff88',text:'if ur reading this\nand im gone\n\ncheck LOCALDRIVED'},
]:[
{color:'#ffff88',text:'REMEMBER:\n- do math hw (due monday)\n- clean room b4 mom gets home\n- feed the dog'},
{color:'#88ffff',text:'TF2 goals:\n- hit 3000 hours\n- get an unusual hat\n- beat mike at 1v1\n  (impossible but ill try)'},
{color:'#ff88ff',text:'mikes bday is oct 15\nget him something good\nmaybe a tf2 poster??'},
{color:'#ffbb88',text:'band practice saturday\nim on drums (barely)\ndrumz guy said im\n"not terrible" which is\nbasically a compliment'},
{color:'#88ff88',text:'passwords:\nemail: dustbowl4life\nsteam: ********\nmyspace: idk i forgot'},
];
let notesHtml='<div style="display:flex;flex-wrap:wrap;gap:8px;padding:8px">';
notes.forEach(n=>{
notesHtml+='<div style="width:140px;min-height:120px;background:'+n.color+';padding:8px;font-family:\'Comic Sans MS\',cursive;font-size:11px;line-height:1.5;white-space:pre-wrap;box-shadow:2px 2px 4px rgba(0,0,0,0.2);transform:rotate('+(Math.random()*6-3)+'deg)">'+n.text.replace(/\n/g,'<br>')+'</div>';
});
notesHtml+='</div>';
createWindow('stickynotes','Sticky Notes',500,320,notesHtml);
};

// ============ CALENDAR ============
const openCalendar=()=>{
const isC=false;
const month=isC?'May 2010':'September 2010';
const days=isC?31:30;
const startDay=isC?6:3;// May 2010 starts Sat, Sep 2010 starts Wed
const special=isC?{28:'bg:#f00;color:#fff',15:'bg:#ff8;color:#000',24:'bg:#ff8;color:#000',27:'bg:#ff8;color:#000'}:{15:'bg:#ff8;color:#000',25:'bg:#ff8;color:#000',30:'bg:#aaf;color:#000'};
const specialTips=isC?{28:'12:06 AM',15:'server crash',24:'the nite evrythng fell apart',27:'mom left a plate outside'}:{15:"mike's bday soon",25:'band practice',30:'TODAY'};
let cal='<div style="font-family:Tahoma;font-size:11px;padding:8px"><div style="text-align:center;font-weight:bold;font-size:14px;margin-bottom:8px">'+month+'</div>';
cal+='<table style="width:100%;border-collapse:collapse;text-align:center"><tr style="background:#d4d0c8">';
['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>cal+='<th style="padding:3px;font-size:10px;border:1px solid #ccc">'+d+'</th>');
cal+='</tr><tr>';
for(let i=0;i<startDay;i++)cal+='<td style="border:1px solid #eee;padding:4px"></td>';
for(let d=1;d<=days;d++){
const sp=special[d];
const tip=specialTips[d]||'';
const style=sp?'background:'+sp.split(';')[0].split(':')[1]+';color:'+sp.split(';')[1].split(':')[1]:'';
cal+='<td style="border:1px solid #ccc;padding:4px;font-size:11px;cursor:default;'+style+'" title="'+tip+'">'+d+'</td>';
if((startDay+d)%7===0)cal+='</tr><tr>';
}
cal+='</tr></table>';
if(isC)cal+='<div style="font-size:9px;color:#c00;margin-top:8px;text-align:center">May 28 — 12:06 AM</div>';
else cal+='<div style="font-size:9px;color:#888;margin-top:8px;text-align:center">Today: September 30, 2010 — 7:42 PM</div>';
cal+='</div>';
createWindow('calendar','Calendar',320,280,cal);
};

// ============ COMMAND PROMPT ============
const openCmd=()=>{
const isC=false;
const h='<div id="cmd-wrapper" style="background:#000;padding:8px;font-family:\'Courier New\',monospace;font-size:13px;color:#ccc;min-height:280px;max-height:400px;overflow-y:auto"><div id="cmd-output">SoOS Command Prompt v1.0<br>Copyright (c) 2010 SoOS Project<br>'+(isC?'<span style="color:#f00">WARNING: System integrity compromised</span><br>':'')+'<br></div><div id="cmd-prompt-line" style="display:flex"><span id="cmd-prompt-text" style="color:#ccc;white-space:nowrap">C:\\Users\\TheDustBwlDuck&gt;&nbsp;</span><input id="cmd-input" style="flex:1;background:transparent;border:none;color:#ccc;font-family:\'Courier New\',monospace;font-size:13px;outline:none" autocomplete="off" spellcheck="false"></div></div>';
createWindow('cmd','Command Prompt',520,340,h);
setTimeout(()=>{
const input=document.getElementById('cmd-input');
const output=document.getElementById('cmd-output');
const wrapper=document.getElementById('cmd-wrapper');
const promptText=document.getElementById('cmd-prompt-text');
if(!input||!output)return;
input.focus();

let devShellMode=false;

input.addEventListener('keydown',(e)=>{
if(e.key!=='Enter')return;
e.preventDefault();
const cmd=input.value.trim();
input.value='';
if(!cmd)return;

// ===== DEV SHELL MODE =====
if(devShellMode){
  // Show typed command
  const line=document.createElement('div');
  line.style.cssText='color:#0f0;margin:1px 0;white-space:pre-wrap;word-break:break-all';
  line.textContent='root@void:~$ '+cmd;
  output.appendChild(line);
  // Process puzzle command
  if(window._puzzleProcessCommand){
    window._puzzleProcessCommand(cmd);
  }
  wrapper.scrollTop=wrapper.scrollHeight;
  return;
}

// ===== NORMAL CMD MODE =====
output.innerHTML+='<span style="color:#ccc">C:\\Users\\TheDustBwlDuck&gt; '+cmd+'</span><br>';
const cl=cmd.toLowerCase();
if(cl==='help')output.innerHTML+='Commands: help, dir, cls, date, whoami, ver, echo, ipconfig, tasklist, terminal, save, color<br>';
else if(cl==='dir')output.innerHTML+='<br> Directory of C:\\Users\\TheDustBwlDuck<br><br> Documents/<br> Downloads/<br> Desktop/<br> '+(isC?'<span style="color:#f00">LOCALDRIVED/</span><br>':'')+'<br>';
else if(cl==='cls'){output.innerHTML=''}
else if(cl==='date')output.innerHTML+=(isC?'05/28/2010 12:06 AM':'09/30/2010 7:42 PM')+'<br>';
else if(cl==='whoami')output.innerHTML+='TheDustBwlDuck<br>';
else if(cl==='ver')output.innerHTML+='SoOS Version 1.0.2 (Build 2010.09.30)'+(isC?' <span style="color:#f00">[COMPROMISED]</span>':'')+'<br>';
else if(cl.startsWith('echo '))output.innerHTML+=cmd.substring(5)+'<br>';
else if(cl==='ipconfig')output.innerHTML+=(isC?'<span style="color:#f00">IPv4 Address: 0.0.0.0<br>Subnet: 0.0.0.0<br>Gateway: 0.0.0.0<br>Status: ANOMALOUS</span>':'IPv4 Address: 192.168.1.47<br>Subnet: 255.255.255.0<br>Gateway: 192.168.1.1<br>Status: Connected')+'<br>';
else if(cl==='tasklist'){
output.innerHTML+='<br>PID   Name            Status<br>';
output.innerHTML+='001   soos.sys        Running<br>';
output.innerHTML+='002   desktop.exe     Running<br>';
output.innerHTML+='003   cubey.pet       Running     (cubey32.exe)<br>';
if(isC){output.innerHTML+='<span style="color:#f00">201   hl2.exe         CANNOT TERMINATE<br>201   hl2.exe         CANNOT TERMINATE<br>201   hl2.exe         CANNOT TERMINATE</span><br>'}
output.innerHTML+='<br>';
}
else if(cl==='color'){const colors=['#0f0','#0ff','#ff0','#f0f','#f80'];wrapper.style.color=colors[Math.floor(Math.random()*colors.length)]}
else if(isC&&(cl==='kill 201'||cl==='taskkill /f /im hl2.exe'||cl==='kill hl2.exe'))output.innerHTML+='<span style="color:#f00">ACCESS DENIED. Process cannot be terminated.</span><br><span style="color:#f00">Nice try.</span><br>';
else if(cl==='201')output.innerHTML+=(isC?'<span style="color:#f00">you know what that means.</span>':'201? What about it?')+'<br>';
else if(cl==='cubey')output.innerHTML+=(isC?'<span style="color:#ff0">His name is Mike.</span>':'<span style="color:#ff0">PAINTING!!</span>')+'<br>';
else if(cl==='kill cubey32.exe'||cl==='taskkill /f /im cubey32.exe'||cl==='kill cubey.pet'){
if(isC){
output.innerHTML+='<span style="color:#ff0">Terminating cubey.pet (PID 003)...</span><br>';
output.innerHTML+='<span style="color:#ff0">Process terminated.</span><br>';
setTimeout(()=>{
const cubey=document.getElementById('cubey');
if(cubey){cubey.style.transition='opacity 0.5s';cubey.style.opacity='0';setTimeout(()=>{cubey.style.display='none'},500)}
const bubble=document.getElementById('cubey-bubble');
if(bubble)bubble.classList.add('cubey-hidden');
output.innerHTML+='<br><span style="color:#f00">.....</span><br>';
setTimeout(()=>{
output.innerHTML+='<span style="color:#f00">you killed the only thing trying to help you.</span><br>';
setTimeout(()=>{
output.innerHTML+='<span style="color:#f00">now there\'s nothing between you and me.</span><br>';
},2000);
},1500);
},800);
}else{
output.innerHTML+='<span style="color:#ff0">Terminating cubey.pet (PID 003)...</span><br>';
setTimeout(()=>{
output.innerHTML+='<span style="color:#f00">ACCESS DENIED. Cubey cannot be killed. He loves you too much.</span><br>';
if(window.cubeyQ)window.cubeyQ("HEY! Don't do that! That's MEAN!",true);
},500);
}
}
else if(cl==='terminal'||cl==='run terminal'){
if(isC){
// === SWITCH TO DEV SHELL MODE ===
devShellMode=true;
window.terminalLaunched=true;
output.innerHTML+='<br><span style="color:#0f0">SoOS Dev Shell v0.201</span><br>';
output.innerHTML+='<span style="color:#0f0">System recovery mode</span><br>';
output.innerHTML+='<span style="color:#ff0">User: CUBEY.PET [MEMORY RESTORED — ID: MIKE]</span><br><br>';
promptText.style.color='#0f0';
promptText.textContent='root@void:~$ ';
input.style.color='#0f0';
wrapper.style.background='#000';
// Init puzzle system
if(window.launchTerminalInCmd){
  window.launchTerminalInCmd(output,wrapper);
}
}else{output.innerHTML+='Use the Terminal app from the Start menu.<br>'}
}
else if(cl==='save'){if(window.saveGame){window.saveGame();output.innerHTML+='<span style="color:#0f0">Game saved to soos_save.json</span><br>'}else{output.innerHTML+='Save system unavailable.<br>'}}
else output.innerHTML+="'"+cmd+"' is not recognized as a command.<br>";
wrapper.scrollTop=wrapper.scrollHeight;
});
},100);
};

// ============ SCREENSAVER ============
let screenSaverTimer=null;
let screenSaverActive=false;
const startScreenSaverTimer=()=>{
if(screenSaverTimer)clearTimeout(screenSaverTimer);
screenSaverTimer=setTimeout(()=>{
if(screenSaverActive)return;
screenSaverActive=true;
const isC=false;
const ss=document.createElement('div');
ss.id='screensaver';
ss.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:850;cursor:none';
const canvas=document.createElement('canvas');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
canvas.style.cssText='width:100%;height:100%';
ss.appendChild(canvas);
document.body.appendChild(ss);
const ctx=canvas.getContext('2d');
let x=canvas.width/2,y=canvas.height/2;
let dx=2+Math.random()*2,dy=1.5+Math.random()*2;
let hue=0;
const drawSS=()=>{
if(!document.getElementById('screensaver'))return;
ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,canvas.width,canvas.height);
if(isC){
// Corrupted: just "201" bouncing in red
ctx.font='bold 48px "Courier New",monospace';
ctx.fillStyle='#f00';
ctx.fillText('201',x,y);
}else{
// Normal: "SoOS" bouncing with color change
ctx.font='bold 36px "Courier New",monospace';
ctx.fillStyle='hsl('+hue+',80%,60%)';
ctx.fillText('SoOS',x,y);
hue=(hue+2)%360;
}
x+=dx;y+=dy;
if(x<0||x>canvas.width-80){dx=-dx;hue=(hue+60)%360}
if(y<30||y>canvas.height-10){dy=-dy;hue=(hue+60)%360}
requestAnimationFrame(drawSS);
};
drawSS();
// Click/key to dismiss
const dismiss=()=>{
ss.remove();screenSaverActive=false;
document.removeEventListener('mousemove',dismiss);
document.removeEventListener('keydown',dismiss);
document.removeEventListener('click',dismiss);
startScreenSaverTimer();
};
setTimeout(()=>{
document.addEventListener('mousemove',dismiss,{once:false});
document.addEventListener('keydown',dismiss,{once:true});
document.addEventListener('click',dismiss,{once:true});
},500);
},120000);// 2 minutes idle
};
// Reset timer on any activity
['mousemove','keydown','click'].forEach(e=>document.addEventListener(e,()=>{
if(screenSaverActive)return;
startScreenSaverTimer();
}));
startScreenSaverTimer();
window.openCmd=openCmd;
window.openApp=openApp;
