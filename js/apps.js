const mediaBasePath='/media/';
const fsData={
'C:':{type:'dir',children:{
'Users':{type:'dir',children:{
'TheDustBwlDuck':{type:'dir',children:{
'Desktop':{type:'dir',children:{}},
'Documents':{type:'dir',children:{
'school_essay.txt':{type:'file',content:'The American Revolution - by TheDustBwlDuck\n\nThe American Revolution was a war fought between\nthe American colonies and Great Britain from 1775 to 1783.\n\nI still need to finish this. Due friday.\n\nActually im gonna play tf2 first.'},
'tf2_binds.txt':{type:'file',content:'TF2 CUSTOM BINDS:\n\nbind f "voicemenu 0 1" (MEDIC!)\nbind g "voicemenu 2 1" (Nice Shot)\nbind h "say GET DUSTBOWLED"\nbind j "say UBERSAW TIME"\nbind mouse4 "+jump"\n\nNote to self: stop spamming the medic bind\npeople are getting mad'},
'server_favorites.txt':{type:'file',content:'MY FAVORITE SERVERS:\n\n192.168.1.13:27015 - Dustbowl 24/7 (THE BEST ONE)\n74.91.113.73:27015 - 2Fort Unlimited\n208.100.45.21:27015 - cp_granary tryhard server\n\nDustbowl 24/7 has the best regulars\nIm there pretty much every night'},
'grocery_list.txt':{type:'file',content:'Mom said to get:\n- milk\n- bread\n- cereal (the good kind not the healthy one)\n- hot pockets\n- mountain dew\n\ni keep forgetting this list so im putting it on the computer'},
'todo.txt':{type:'file',content:'TODO:\n- finish essay (FRIDAY)\n- clean room (mom keeps asking)\n- update steam profile pic\n- ask mike about half life 2 episode 2\n- practice scout movement on dustbowl\n- fix microphone buzzing'}
}},
'Pictures':{type:'dir',children:{
'dustbowl_screenshot1.png':{type:'img',src:`${mediaBasePath}img/dustbowl1.png`},
'dustbowl_screenshot2.png':{type:'img',src:`${mediaBasePath}img/dustbowl2.png`},
'funny_spray.png':{type:'img',src:`${mediaBasePath}img/spray1.png`},
'my_scout_loadout.png':{type:'img',src:`${mediaBasePath}img/scout1.png`},
'desktop_wallpaper_backup.png':{type:'img',src:`${mediaBasePath}img/wallpaper1.png`}
}},
'Music':{type:'dir',children:{
'song1.mp3':{type:'audio',src:`${mediaBasePath}audio/song1.mp3`},
'song2.mp3':{type:'audio',src:`${mediaBasePath}audio/song2.mp3`}
}},
'Videos':{type:'dir',children:{
'dustbowl_gameplay.mp4':{type:'video',src:`${mediaBasePath}video/gameplay1.mp4`},
'funny_kill.mp4':{type:'video',src:`${mediaBasePath}video/funnykill.mp4`}
}}
}}
}},
'System':{type:'dir',children:{
'config.sys':{type:'file',content:'SOOS_VERSION=1.0.2\nINIT_PROCESS=soos-init\nHOST=TheDustBwlDuck\nLAST_BOOT=2007-05-27T18:32:00\nUPTIME=5h34m'},
'error.log':{type:'file',content:'[2007-05-27 18:32:15] INFO: System boot completed successfully\n[2007-05-27 18:32:20] INFO: Network adapter connected\n[2007-05-27 18:33:01] INFO: Audio driver loaded - SigmaTel STAC 9227\n[2007-05-27 19:15:42] WARN: High CPU usage detected (Steam.exe)\n[2007-05-27 20:01:13] INFO: Application launched: hl2.exe (Team Fortress 2)\n[2007-05-27 23:45:00] INFO: Application closed: hl2.exe\n[2007-05-28 00:04:22] INFO: System idle'}
}}
}}};

const chatData={
'mikeloveshalflife':[
{u:'mikeloveshalflife',t:'6:45 PM',m:'yo duck you see the new update?'},
{u:'TheDustBwlDuck',t:'6:46 PM',m:'YEAH the new maps look sick'},
{u:'mikeloveshalflife',t:'6:46 PM',m:'we gotta try them this weekend'},
{u:'TheDustBwlDuck',t:'6:47 PM',m:'for sure. but honestly nothing beats dustbowl'},
{u:'mikeloveshalflife',t:'6:47 PM',m:'bro you are OBSESSED with dustbowl'},
{u:'TheDustBwlDuck',t:'6:48 PM',m:'its the perfect map mike. the chokepoints. the tunnels. the CHAOS'},
{u:'mikeloveshalflife',t:'6:48 PM',m:'its literally just a hallway simulator'},
{u:'TheDustBwlDuck',t:'6:49 PM',m:'you take that back'},
{u:'mikeloveshalflife',t:'6:49 PM',m:'lmaooo'},
{u:'TheDustBwlDuck',t:'6:50 PM',m:'anyway how was your day'},
{u:'mikeloveshalflife',t:'6:50 PM',m:'not bad. school was whatever. got a new gpu coming friday'},
{u:'TheDustBwlDuck',t:'6:51 PM',m:'nice what card'},
{u:'mikeloveshalflife',t:'6:51 PM',m:'hd 2600 xt'},
{u:'TheDustBwlDuck',t:'6:52 PM',m:'solid. i got the 3870 its a beast'},
{u:'mikeloveshalflife',t:'6:52 PM',m:'showoff'},
{u:'TheDustBwlDuck',t:'6:53 PM',m:'haha nah the xps 420 came with it. dell hooked it up'},
{u:'mikeloveshalflife',t:'6:53 PM',m:'rich kid'},
{u:'TheDustBwlDuck',t:'6:54 PM',m:'birthday present dude cmon'},
{u:'mikeloveshalflife',t:'6:54 PM',m:'im kidding. see you on dustbowl later?'},
{u:'TheDustBwlDuck',t:'6:55 PM',m:'always'},
{u:'mikeloveshalflife',t:'7:12 PM',m:'btw have you played episode 2 yet'},
{u:'TheDustBwlDuck',t:'7:13 PM',m:'not yet i keep meaning to'},
{u:'mikeloveshalflife',t:'7:13 PM',m:'DUDE you have to. the ending is insane'},
{u:'TheDustBwlDuck',t:'7:14 PM',m:'no spoilers!!'},
{u:'mikeloveshalflife',t:'7:14 PM',m:'i would never'},
{u:'TheDustBwlDuck',t:'7:15 PM',m:'ill play it after i finish this essay. maybe this weekend'},
{u:'mikeloveshalflife',t:'7:15 PM',m:'the revolution one?'},
{u:'TheDustBwlDuck',t:'7:16 PM',m:'yeah mrs. hendersons class'},
{u:'mikeloveshalflife',t:'7:16 PM',m:'i did mine in like 20 minutes lol'},
{u:'TheDustBwlDuck',t:'7:17 PM',m:'yeah and you got a C'},
{u:'mikeloveshalflife',t:'7:17 PM',m:'...fair'}
],
'48291637':[
{u:'48291637',t:'00:00',m:'13'},
{u:'48291637',t:'00:00',m:'13'},
{u:'48291637',t:'00:00',m:'13'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:01',m:'201'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:02',m:'0.0.0.0'},
{u:'48291637',t:'00:03',m:'52 75 6E'},
{u:'48291637',t:'00:03',m:'48 6F 6D 65'},
{u:'48291637',t:'00:04',m:'13 13 13 13 13 13 13'},
{u:'48291637',t:'00:04',m:'13 13 13 13 13 13 13 13 13 13 13 13 13'},
{u:'48291637',t:'00:05',m:'201201201201201201201201'},
{u:'48291637',t:'00:05',m:'000000000000000000000000'},
{u:'48291637',t:'00:06',m:'h e  i s  h e r e'},
{u:'48291637',t:'00:06',m:'13'}
]
};

const emailData=[
{id:1,from:'mikeloveshalflife@yahoo.com',subject:'RE: dustbowl tonight?',date:'May 26, 2007',unread:true,body:'Yeah im down for tonight. Ill be on around 8.\n\nAlso did you finish the essay yet? Im not\ngonna lie I totally copied some of mine from\nwikipedia lol. Dont tell henderson.\n\nSee you on dustbowl\n- mike'},
{id:2,from:'admin@dustbowl247.com',subject:'Welcome to Dustbowl 24/7!',date:'May 20, 2007',unread:false,body:'Hey TheDustBwlDuck,\n\nWelcome to the Dustbowl 24/7 community server!\n\nYou have been added to our regulars list.\nEnjoy your stay and remember:\n- No cheating\n- No mic spam\n- Have fun!\n\nSee you on the battlefield,\n- Server Admin Team'},
{id:3,from:'steampowered@steampowered.com',subject:'Your receipt for Team Fortress 2',date:'Oct 10, 2007',unread:false,body:'Thank you for your purchase!\n\nTeam Fortress 2\nThe Orange Box\nPrice: $49.99\n\nThis game has been added to your Steam library.\n\nEnjoy!\n- The Steam Team'},
{id:4,from:'mom',subject:'dinner',date:'May 27, 2007',unread:true,body:'Hey sweetie,\n\nDinner is at 7. Please come down on time\nthis time and not 20 minutes late because\nyoure playing your game.\n\nAlso please clean your room this weekend.\n\nLove,\nMom'},
{id:5,from:'newsletter@valvesoftware.com',subject:'TF2 Update - New Maps!',date:'May 25, 2007',unread:false,body:'Team Fortress 2 has been updated!\n\nChanges include:\n- New community maps added\n- Fixed backstab hit detection\n- Improved server browser performance\n- Various bug fixes\n\nSee the full patch notes on our website.\n\n- Valve'}
];

const browserBookmarks=[
{title:'Dustbowl 24/7 - Community Server',url:'http://dustbowl247.community-tf2.net'},
{title:'TF2 Wiki - Dustbowl',url:'http://wiki.teamfortress.com/wiki/Dustbowl'},
{title:'Steam Community :: TheDustBwlDuck',url:'http://steamcommunity.com/id/thedustbwlduck'},
{title:'YouTube',url:'http://youtube.com'},
{title:'Newgrounds',url:'http://newgrounds.com'},
{title:'GameFAQs - TF2 Board',url:'http://gamefaqs.com/boards/tf2'},
{title:'MySpace',url:'http://myspace.com'}
];

const browserHistory=[
{title:'google: "tf2 dustbowl tips"',date:'May 27, 2007'},
{title:'google: "best tf2 medic loadout"',date:'May 27, 2007'},
{title:'youtube.com - TF2 Spy Frag Movie',date:'May 26, 2007'},
{title:'google: "half life 2 episode 2 release date"',date:'May 25, 2007'},
{title:'newgrounds.com - Flash Games',date:'May 24, 2007'},
{title:'google: "how to make tf2 spray"',date:'May 22, 2007'},
{title:'gamefaqs.com - tf2 best class for beginners',date:'May 20, 2007'},
{title:'google: "dell xps 420 specs"',date:'May 18, 2007'},
{title:'myspace.com',date:'May 15, 2007'}
];

const openApp=(id)=>{
const apps={explorer:openExplorer,browser:openBrowser,terminal:openTerminal,texteditor:()=>openTextEditor('','Select a file...'),mediaplayer:openMediaPlayer,imageviewer:openImageViewer,chat:openChat,email:openEmail,settings:openSettings,calculator:openCalculator,paint:openPaint,tf2:openTF2,steam:openSteam};
apps[id]?.();
};

const openExplorer=(path)=>{
const p=path??'C:/Users/TheDustBwlDuck';
const h=`<div class="app-explorer"><div class="explorer-toolbar"><button class="explorer-back-btn" id="exp-back">◀</button><div class="explorer-path" id="exp-path">${p}</div></div><div class="explorer-content" id="exp-content"></div></div>`;
createWindow('explorer',`Files - ${p}`,550,400,h);
renderExplorerPath(p);
};

const renderExplorerPath=(path)=>{
const parts=path.split('/').filter(Boolean);
let node=fsData;
for(const part of parts){
if(node[part]){
if(node[part].type==='dir'){node=node[part].children}
else{handleFileOpen(node[part],part);return}
}else{return}
}
const contentEl=document.getElementById('exp-content');
const pathEl=document.getElementById('exp-path');
if(!contentEl)return;
pathEl.textContent=path;
contentEl.innerHTML='';
Object.entries(node).forEach(([name,item])=>{
const d=document.createElement('div');
d.className='explorer-item';
const iconMap={dir:'📁',img:'🖼',audio:'🎵',video:'🎬'};
const icon=iconMap[item.type]??'📄';
d.innerHTML=`<div class="explorer-item-icon">${icon}</div><div class="explorer-item-name">${name}</div>`;
d.addEventListener('dblclick',()=>{
item.type==='dir'?renderExplorerPath(`${path}/${name}`):handleFileOpen(item,name);
});
contentEl.appendChild(d);
});
const backBtn=document.getElementById('exp-back');
if(backBtn){backBtn.onclick=()=>{
const parent=path.split('/').slice(0,-1).join('/');
if(parent)renderExplorerPath(parent);
}}
};

const handleFileOpen=(item,name)=>{
if(item.type==='file')openTextEditor(item.content,name);
else if(item.type==='img')openImageViewerSingle(item.src,name);
else if(item.type==='audio'||item.type==='video')openMediaPlayerFile(item.src,name,item.type);
};

const openBrowser=()=>{
let bm='';
browserBookmarks.forEach((b)=>{bm+=`<div class="browser-bookmark" data-url="${b.url}">${b.title}</div>`});
let hist='';
browserHistory.forEach((h)=>{hist+=`<div class="browser-history-item"><span>${h.title}</span> <span style="color:#333;margin-left:8px">${h.date}</span></div>`});
const h=`<div class="app-browser"><div class="browser-toolbar"><input class="browser-url" id="browser-url" value="soos://home" readonly><button class="browser-go-btn">➡</button></div><div class="browser-content"><div style="color:#555;margin-bottom:16px;font-size:14px">SoOS Browser v0.1</div><div style="color:#444;margin-bottom:8px;font-size:12px">BOOKMARKS</div><div class="browser-bookmarks">${bm}</div><div style="color:#444;margin:16px 0 8px;font-size:12px">RECENT HISTORY</div>${hist}</div></div>`;
createWindow('browser','SoOS Browser',600,450,h);
};

const openTerminal=()=>{
const h='<div class="app-terminal"><div class="terminal-output" id="term-out">SoOS Terminal v1.0.2\nType "help" for available commands.\n\n</div><div class="terminal-input-line"><span class="terminal-prompt">TheDustBwlDuck@soos:~$</span><input class="terminal-input" id="term-in" autofocus spellcheck="false"></div></div>';
createWindow('terminal','Terminal',550,350,h);
const inp=document.getElementById('term-in');
if(inp){inp.focus();inp.addEventListener('keydown',(e)=>{
if(e.key==='Enter'){
const cmd=inp.value.trim();
inp.value='';
processCommand(cmd);
}
})}
};

const processCommand=(cmd)=>{
const out=document.getElementById('term-out');
if(!out)return;
out.innerHTML+=`<span style="color:#999">TheDustBwlDuck@soos:~$</span> ${cmd}\n`;
const lower=cmd.toLowerCase();
if(lower==='help'){
out.innerHTML+='Available commands:\n  help     - show this message\n  whoami   - display current user\n  date     - show system date\n  ls       - list files\n  cat      - read a file\n  clear    - clear terminal\n  uptime   - system uptime\n  ps       - list processes\n  neofetch - system info\n\n';
}else if(lower==='whoami'){
out.innerHTML+='TheDustBwlDuck\n\n';
}else if(lower==='date'){
out.innerHTML+='Sun May 27 23:58:00 UTC 2007\n\n';
}else if(lower==='clear'){
out.innerHTML='';
}else if(lower==='ls'){
out.innerHTML+='Desktop/  Documents/  Pictures/  Music/  Videos/\n\n';
}else if(lower==='uptime'){
out.innerHTML+='up 0 days, 5:34, load average: 0.42, 0.38, 0.35\n\n';
}else if(lower==='ps'){
out.innerHTML+='  PID  STAT  COMMAND\n    1  S     init\n    2  S     soos-core\n    7  S     display-server\n   14  S     soos-shell\n   28  S     Steam.exe\n   31  S     hl2.exe\n\n';
}else if(lower==='neofetch'){
out.innerHTML+='<span style="color:#fff">  ___  ___  ___  ___\n / __||   || _ \\/ __|\n \\__ \\| | ||  _/\\__ \\\n |___/|___||_|  |___/</span>\n\n  OS: SoOS 1.0.2\n  Host: TheDustBwlDuck\n  Uptime: 5 hours, 34 minutes\n  Shell: soos-sh\n  Terminal: soos-term\n  CPU: Intel Core 2 Quad Q6600 @ 2.40GHz\n  GPU: ATI Radeon HD 3870 512 MB\n  Memory: 4096 MB DDR2 (43% used)\n\n';
}else if(lower.startsWith('cat ')){
out.innerHTML+='<span style="color:#fff">Use the File Explorer to open files.</span>\n\n';
}else if(lower==='exit'){
closeWindow('terminal');return;
}else if(cmd!==''){
out.innerHTML+=`<span style="color:#fff">Unknown command: ${cmd}</span>\n\n`;
}
out.scrollTop=out.scrollHeight;
};

const openTextEditor=(content,filename)=>{
const h=`<div class="app-texteditor"><div class="texteditor-toolbar"><span class="texteditor-filename">${filename}</span></div><div class="texteditor-content">${content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</div></div>`;
createWindow('texteditor',`Notes - ${filename}`,480,360,h);
};

const openMediaPlayer=()=>{
const h='<div class="app-mediaplayer"><div class="mediaplayer-display"><div class="mediaplayer-placeholder">No media loaded.<br>Open files from File Explorer.</div></div><div class="mediaplayer-controls"><button class="mediaplayer-btn" id="mp-play">▶</button><button class="mediaplayer-btn" id="mp-stop">■</button><span style="color:#444;font-size:11px;flex:1;text-align:center" id="mp-title">-</span></div></div>';
createWindow('mediaplayer','Media Player',450,350,h);
};

const openMediaPlayerFile=(src,name,type)=>{
const tag=type==='video'?`<video src="${src}" controls style="width:100%;height:100%"></video>`:`<audio src="${src}" controls style="margin-top:20px"></audio>`;
const h=`<div class="app-mediaplayer"><div class="mediaplayer-display">${tag}</div><div class="mediaplayer-controls"><span style="color:#888;font-size:11px;flex:1;text-align:center">${name}</span></div></div>`;
if(openWindows['mediaplayer'])closeWindow('mediaplayer');
createWindow('mediaplayer',`Media - ${name}`,500,380,h);
};

const openImageViewer=()=>{
const images=[];
const pics=fsData['C:'].children['Users'].children['TheDustBwlDuck'].children['Pictures'].children;
Object.entries(pics).forEach(([k,v])=>{if(v.type==='img')images.push({name:k,src:v.src})});
const h='<div class="app-imageviewer"><div class="imageviewer-display" id="iv-display"><div class="mediaplayer-placeholder">No images found.<br>Add images to /media/img/ folder.</div></div><div class="imageviewer-nav"><button class="imageviewer-nav-btn" id="iv-prev">◀</button><span class="imageviewer-counter" id="iv-counter">0/0</span><button class="imageviewer-nav-btn" id="iv-next">▶</button></div></div>';
createWindow('imageviewer','Gallery',500,400,h);
if(images.length>0){
let idx=0;
const showImg=()=>{
document.getElementById('iv-display').innerHTML=`<img src="${images[idx].src}" onerror="this.parentElement.innerHTML='<div class=mediaplayer-placeholder>Image not found:<br>${images[idx].name}</div>'">`;
document.getElementById('iv-counter').textContent=`${idx+1}/${images.length} - ${images[idx].name}`;
};
showImg();
document.getElementById('iv-prev').onclick=()=>{idx=(idx-1+images.length)%images.length;showImg()};
document.getElementById('iv-next').onclick=()=>{idx=(idx+1)%images.length;showImg()};
}
};

const openImageViewerSingle=(src,name)=>{
const h=`<div class="app-imageviewer"><div class="imageviewer-display"><img src="${src}" onerror="this.parentElement.innerHTML='<div class=mediaplayer-placeholder>Image not found:<br>${name}</div>'"></div><div class="imageviewer-nav"><span class="imageviewer-counter">${name}</span></div></div>`;
if(openWindows['imageviewer'])closeWindow('imageviewer');
createWindow('imageviewer',`Gallery - ${name}`,500,400,h);
};

const openChat=()=>{
const contacts=Object.keys(chatData);
let tabs='';
contacts.forEach((c,i)=>{tabs+=`<button class="chat-contact${i===0?' active':''}" data-chat="${c}">${c}</button>`});
const h=`<div class="app-chat"><div class="chat-sidebar" id="chat-tabs">${tabs}</div><div class="chat-messages" id="chat-msgs"></div></div>`;
createWindow('chat','Chat Logs',480,400,h);
renderChat(contacts[0]);
document.querySelectorAll('.chat-contact').forEach((btn)=>{
btn.addEventListener('click',()=>{
document.querySelectorAll('.chat-contact').forEach((b)=>b.classList.remove('active'));
btn.classList.add('active');
renderChat(btn.dataset.chat);
});
});
};

const renderChat=(contactId)=>{
const msgs=chatData[contactId];
const el=document.getElementById('chat-msgs');
if(!el||!msgs)return;
el.innerHTML='';
msgs.forEach((m)=>{
const d=document.createElement('div');
d.className='chat-msg';
d.innerHTML=`<span class="chat-msg-time">[${m.t}]</span> <span class="chat-msg-user" style="color:${m.u==='TheDustBwlDuck'?'#fff':'#999'}">${m.u}</span><div class="chat-msg-text">${m.m}</div>`;
el.appendChild(d);
});
el.scrollTop=el.scrollHeight;
};

const openEmail=()=>{
let list='';
emailData.forEach((e)=>{
list+=`<div class="email-item${e.unread?' unread':''}" data-email-id="${e.id}"><div class="email-unread-dot${e.unread?'':' read'}"></div><div class="email-info"><div class="email-subject">${e.subject}</div><div class="email-from">${e.from}</div></div><div class="email-date">${e.date}</div></div>`;
});
const h=`<div class="app-email"><div class="email-list" id="email-list">${list}</div></div>`;
createWindow('email','Mail',520,380,h);
document.querySelectorAll('.email-item').forEach((item)=>{
item.addEventListener('click',()=>{
const id=parseInt(item.dataset.emailId);
const email=emailData.find((e)=>e.id===id);
if(!email)return;
const body=document.querySelector('#win-email .window-body');
if(body){body.innerHTML=`<div class="email-view"><button class="email-view-back" id="email-back">◀ Back</button><div class="email-view-header"><div class="email-view-subject">${email.subject}</div><div class="email-view-meta">From: ${email.from} | ${email.date}</div></div><div class="email-view-body">${email.body}</div></div>`;
document.getElementById('email-back').addEventListener('click',()=>openEmail());}
});
});
};

const openSettings=()=>{
const h='<div class="app-settings"><div class="settings-section"><div class="settings-section-title">System</div><div class="settings-row"><span class="settings-label">OS Version</span><span class="settings-value">SoOS 1.0.2</span></div><div class="settings-row"><span class="settings-label">User</span><span class="settings-value">TheDustBwlDuck</span></div><div class="settings-row"><span class="settings-label">Hostname</span><span class="settings-value">dustbowl-pc</span></div></div><div class="settings-section"><div class="settings-section-title">Hardware</div><div class="settings-row"><span class="settings-label">CPU</span><span class="settings-value">Intel Core 2 Quad Q6600</span></div><div class="settings-row"><span class="settings-label">RAM</span><span class="settings-value">4096 MB DDR2</span></div><div class="settings-row"><span class="settings-label">GPU</span><span class="settings-value">ATI Radeon HD 3870 512 MB</span></div><div class="settings-row"><span class="settings-label">HDD</span><span class="settings-value">320 GB</span></div><div class="settings-row"><span class="settings-label">Audio</span><span class="settings-value">SigmaTel STAC 9227</span></div></div><div class="settings-section"><div class="settings-section-title">Network</div><div class="settings-row"><span class="settings-label">Status</span><span class="settings-value">Connected</span></div><div class="settings-row"><span class="settings-label">Adapter</span><span class="settings-value">Intel 82566DC Gigabit</span></div></div></div>';
createWindow('settings','Settings',400,420,h);
};

const openCalculator=()=>{
const btns=['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];
let grid='';
btns.forEach((b)=>{const cls=`calc-btn${['/','*','-','+','=','C'].includes(b)?' op':''}`;grid+=`<button class="${cls}" data-calc="${b}">${b}</button>`});
const h=`<div class="app-calculator"><div class="calc-display" id="calc-disp">0</div><div class="calc-buttons" id="calc-btns">${grid}</div></div>`;
createWindow('calculator','Calculator',260,340,h);
const disp=document.getElementById('calc-disp');
let expr='';
document.querySelectorAll('[data-calc]').forEach((btn)=>{
btn.addEventListener('click',()=>{
const v=btn.dataset.calc;
if(v==='C'){expr='';disp.textContent='0'}
else if(v==='='){try{const r=Function('"use strict";return ('+expr+')')();disp.textContent=r;expr=String(r)}catch{disp.textContent='ERR';expr=''}}
else{expr+=v;disp.textContent=expr}
});
});
};

const openPaint=()=>{
const colors=['#ffffff','#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff','#ff3333','#333333','#666666'];
let colorBtns='';
colors.forEach((c,i)=>{colorBtns+=`<div class="paint-color-btn${i===0?' active':''}" data-color="${c}" style="background:${c}"></div>`});
const h=`<div class="app-paint"><div class="paint-toolbar">${colorBtns}<button class="paint-size-btn active" data-size="2">S</button><button class="paint-size-btn" data-size="5">M</button><button class="paint-size-btn" data-size="10">L</button><button class="paint-clear-btn" id="paint-clear">Clear</button></div><div class="paint-canvas-wrap" id="paint-wrap"><canvas id="paint-canvas"></canvas></div></div>`;
createWindow('paint','Paint',550,400,h);
setTimeout(()=>initPaintCanvas(),50);
};

const initPaintCanvas=()=>{
const wrap=document.getElementById('paint-wrap');
const canvas=document.getElementById('paint-canvas');
if(!wrap||!canvas)return;
const ctx=canvas.getContext('2d');
canvas.width=wrap.offsetWidth;
canvas.height=wrap.offsetHeight;
ctx.fillStyle='#0a0a0a';
ctx.fillRect(0,0,canvas.width,canvas.height);
let drawing=false;
let color='#ffffff';
let size=2;
canvas.addEventListener('mousedown',(e)=>{drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY)});
canvas.addEventListener('mousemove',(e)=>{if(!drawing)return;ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke()});
canvas.addEventListener('mouseup',()=>{drawing=false});
canvas.addEventListener('mouseleave',()=>{drawing=false});
document.querySelectorAll('.paint-color-btn').forEach((btn)=>{
btn.addEventListener('click',()=>{document.querySelectorAll('.paint-color-btn').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');color=btn.dataset.color});
});
document.querySelectorAll('.paint-size-btn').forEach((btn)=>{
btn.addEventListener('click',()=>{document.querySelectorAll('.paint-size-btn').forEach((b)=>b.classList.remove('active'));btn.classList.add('active');size=parseInt(btn.dataset.size)});
});
document.getElementById('paint-clear').addEventListener('click',()=>{ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,canvas.width,canvas.height)});
};

const openTF2=()=>{
const h=`<div style="padding:16px;height:100%;display:flex;flex-direction:column;gap:12px">
<div style="font-size:16px;color:#fff;border-bottom:1px solid #222;padding-bottom:8px">Team Fortress 2</div>
<div style="color:#888;font-size:13px">Status: <span style="color:#fff">Installed</span></div>
<div style="color:#888;font-size:13px">Last Played: <span style="color:#fff">May 27, 2007 - 11:45 PM</span></div>
<div style="color:#888;font-size:13px">Hours Played: <span style="color:#fff">347</span></div>
<div style="color:#888;font-size:13px">Favorite Map: <span style="color:#fff">cp_dustbowl</span></div>
<div style="color:#888;font-size:13px">Favorite Class: <span style="color:#fff">Medic</span></div>
<div style="color:#888;font-size:13px">Last Server: <span style="color:#fff">Dustbowl 24/7 (192.168.1.13:27015)</span></div>
</div>`;
createWindow('tf2','Team Fortress 2',420,320,h);
};

const openSteam=()=>{
document.getElementById('desktop').classList.add('hidden');
document.getElementById('taskbar').classList.add('hidden');
document.getElementById('start-menu').classList.add('hidden');
const crash=document.createElement('div');
crash.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:99990;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Share Tech Mono,monospace';
crash.innerHTML=`<div style="color:#fff;font-size:16px;text-align:center;max-width:600px;line-height:2">
<div style="font-size:24px;margin-bottom:20px">:( </div>
<div>SoOS ran into a problem and needs to restart.</div>
<div style="color:#555;font-size:13px;margin-top:20px">FATAL_ERROR: steam.exe attempted to access restricted memory</div>
<div style="color:#555;font-size:13px">Stop code: UNEXPECTED_CRASH</div>
<div style="color:#333;font-size:12px;margin-top:30px">Restarting in 5 seconds...</div>
</div>`;
document.body.appendChild(crash);
setTimeout(()=>{crash.remove();document.getElementById('desktop').classList.remove('hidden');document.getElementById('taskbar').classList.remove('hidden')},5000);
};
