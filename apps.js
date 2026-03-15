var mediaBasePath='/media/';
var fsData={
'C:':{type:'dir',children:{
'Users':{type:'dir',children:{
'TheDustBwlDuck':{type:'dir',children:{
'Desktop':{type:'dir',children:{}},
'Documents':{type:'dir',children:{
'diary_001.txt':{type:'file',content:'May 3, 2008\n\nI keep seeing it. On dustbowl. The same figure.\nEveryone says its just a bot but bots dont WATCH you.\nBots dont stand still in the corner of the map.\nBots dont know your name.\n\nI shouldnt have joined that server.'},
'diary_002.txt':{type:'file',content:'May 10, 2008\n\nIt followed me. Different server. Different map.\nSame figure. Same spot in my peripheral vision.\nWhen I turn, nothing. When I check the scoreboard, no extra player.\n\nBut the chat logs. Oh god the chat logs.\nIt typed my real name.'},
'diary_003.txt':{type:'file',content:'May 15, 2008\n\nI cant sleep. Every time I close my eyes\nI see dustbowl. Not the game. Like im THERE.\nThe tunnels. The dust. Its so dry.\n\nMy hands keep shaking. My wrists hurt.\nI think its getting worse.'},
'diary_004.txt':{type:'file',content:'May 20, 2008\n\nI uninstalled TF2. Deleted everything.\nFormatted my hard drive.\n\nOpened my browser. My homepage was dustbowl.\nA screenshot. But wrong. The sky was black.\nAnd there was something in the tunnel.\nLooking at me.\n\nThrough the screen.'},
'diary_005.txt':{type:'file',content:'May 25, 2008\n\nit speaks to me now\nnot through the game\nthrough everything\nmy phone my dreams my reflection\n\nit says i belong there\nin the dust\nin the bowl\n\nmaybe it is right'},
'diary_006.txt':{type:'file',content:'May 27, 2008\n\ni am so tired\n\nthe dust is all i see\nthe bowl is all i know\n\ntomorrow i go home'},
'DONT_READ.txt':{type:'file',content:'Y O U   S H O U L D N T   B E   H E R E\n\n\n\n\n\n\nI   S E E   Y O U\n\n\n\n\n\nT H E   D U S T   R E M E M B E R S'},
'server_list.txt':{type:'file',content:'SERVERS I PLAYED ON:\n\n192.168.1.13:27015 - [REDACTED] Dustbowl 24/7\n10.0.13.1:27015 - The Bowl (DO NOT JOIN)\n0.0.0.0:27015 - ???\n\nNote: The last one appeared on its own.\nI never added it.\nIt joins ME.'}
}},
'Pictures':{type:'dir',children:{
'dustbowl_screenshot1.png':{type:'img',src:mediaBasePath+'img/dustbowl1.png'},
'dustbowl_screenshot2.png':{type:'img',src:mediaBasePath+'img/dustbowl2.png'},
'face_distorted.png':{type:'img',src:mediaBasePath+'img/face1.png'},
'UNKNOWN_001.png':{type:'img',src:mediaBasePath+'img/unknown1.png'},
'UNKNOWN_002.png':{type:'img',src:mediaBasePath+'img/unknown2.png'}
}},
'Music':{type:'dir',children:{
'recording_052808.mp3':{type:'audio',src:mediaBasePath+'audio/recording1.mp3'},
'server_audio_rip.mp3':{type:'audio',src:mediaBasePath+'audio/server_audio.mp3'}
}},
'Videos':{type:'dir',children:{
'last_session.mp4':{type:'video',src:mediaBasePath+'video/last_session.mp4'},
'footage_corrupted.mp4':{type:'video',src:mediaBasePath+'video/corrupted.mp4'}
}}
}}
}},
'System':{type:'dir',children:{
'config.sys':{type:'file',content:'SOOS_VERSION=0.6.66\nKERNEL=soos-core\nINIT_PROCESS=dust\nWARNING_LEVEL=CRITICAL\nENTITY_STATUS=ACTIVE\nHOST=TheDustBwlDuck\nLAST_HEARTBEAT=2008-05-28T00:06:00'},
'error.log':{type:'file',content:'[2008-05-27 23:41:12] ERR: Process \'dust_entity\' consuming 98% memory\n[2008-05-27 23:42:00] ERR: Unable to terminate process - access denied\n[2008-05-27 23:45:33] WARN: Network traffic to unknown destination\n[2008-05-27 23:50:01] ERR: File system corruption detected\n[2008-05-27 23:55:00] CRIT: User session anomaly\n[2008-05-28 00:00:00] CRIT: Time synchronization failed\n[2008-05-28 00:01:13] ERR: 13 processes unresponsive\n[2008-05-28 00:05:59] CRIT: =============================\n[2008-05-28 00:06:00] CRIT: SYSTEM HALTED\n[2008-05-28 00:06:00] ???: he is home now'}
}}
}}};

var chatData={
'beeper_2008':[
{u:'TheDustBwlDuck',t:'11:30 PM',m:'beeper are you there'},
{u:'beeper',t:'11:31 PM',m:'yeah whats up'},
{u:'TheDustBwlDuck',t:'11:31 PM',m:'something is wrong with my game'},
{u:'beeper',t:'11:32 PM',m:'what do you mean'},
{u:'TheDustBwlDuck',t:'11:32 PM',m:'theres someone on dustbowl. same server every time'},
{u:'TheDustBwlDuck',t:'11:32 PM',m:'but theyre not on the scoreboard'},
{u:'beeper',t:'11:33 PM',m:'probably just a spectator or something'},
{u:'TheDustBwlDuck',t:'11:34 PM',m:'no. they typed my real name in chat'},
{u:'beeper',t:'11:34 PM',m:'...what?'},
{u:'TheDustBwlDuck',t:'11:35 PM',m:'i need to show you something'},
{u:'TheDustBwlDuck',t:'11:35 PM',m:'can you join the server'},
{u:'beeper',t:'11:36 PM',m:'which one'},
{u:'TheDustBwlDuck',t:'11:36 PM',m:'0.0.0.0:27015'},
{u:'beeper',t:'11:37 PM',m:'that doesnt look like a real ip'},
{u:'TheDustBwlDuck',t:'11:38 PM',m:'just try it please'},
{u:'beeper',t:'11:42 PM',m:'it connected me somewhere. but the map is wrong'},
{u:'beeper',t:'11:42 PM',m:'this isnt dustbowl'},
{u:'beeper',t:'11:43 PM',m:'or it is but everything is dark'},
{u:'TheDustBwlDuck',t:'11:43 PM',m:'do you see him'},
{u:'beeper',t:'11:44 PM',m:'see who'},
{u:'TheDustBwlDuck',t:'11:45 PM',m:'the duck'},
{u:'beeper',t:'11:45 PM',m:'im leaving this server'},
{u:'TheDustBwlDuck',t:'11:46 PM',m:'you cant'},
{u:'beeper',t:'11:46 PM',m:'what do you mean i cant'},
{u:'beeper',t:'11:47 PM',m:'the disconnect button isnt working'},
{u:'beeper',t:'11:47 PM',m:'dude what the hell'},
{u:'TheDustBwlDuck',t:'11:48 PM',m:'im sorry'},
{u:'TheDustBwlDuck',t:'11:48 PM',m:'i just didnt want to be alone with it'}
],
'unknown_user':[
{u:'???',t:'00:01',m:'you found the machine'},
{u:'???',t:'00:02',m:'good'},
{u:'???',t:'00:03',m:'he tried to delete everything'},
{u:'???',t:'00:04',m:'but the dust remembers'},
{u:'???',t:'00:05',m:'it always remembers'},
{u:'???',t:'00:06',m:'welcome home'}
]
};

var emailData=[
{id:1,from:'beeper@dustbowl.net',subject:'RE: that server',date:'May 26, 2008',unread:true,body:'Dude I still cant get that server out of my head.\nMy game keeps crashing now and when it does\nfor a split second I see that map.\nThe dark one.\n\nDont connect to that server again. Please.\nIm serious.\n\n- beeper'},
{id:2,from:'admin@community-tf2.net',subject:'Account Warning',date:'May 24, 2008',unread:true,body:'Dear TheDustBwlDuck,\n\nYour account has been flagged for unusual activity.\nMultiple connection attempts to non-existent servers\nhave been logged from your IP address.\n\nAdditionally, several players have reported\na user matching your description appearing in\nservers you are not connected to.\n\nPlease contact support immediately.\n\n- Server Administration'},
{id:3,from:'no-reply@0.0.0.0',subject:'come home',date:'May 27, 2008',unread:true,body:'the dust is waiting\nthe bowl is ready\n\nyou know what you have to do\n\n\n\n\n\n\n\n\n\n\nwe are the same'},
{id:4,from:'TheDustBwlDuck@dustbowl.net',subject:'[no subject]',date:'May 28, 2008',unread:true,body:'if anyone finds this\n\nim sorry\n\ni couldnt stop it\n\nthe dust took everything\n\ndont look for me on dustbowl\n\n\n\nor maybe do\n\nmaybe then youll understand'},
{id:5,from:'system@soos.local',subject:'CRITICAL: Process cannot be terminated',date:'May 28, 2008',unread:false,body:'SYSTEM ALERT\n\nProcess: dust_entity\nPID: 13\nStatus: CANNOT BE TERMINATED\n\nThis process has root access and is\nmodifying system files.\n\nRecommended action: FULL SYSTEM WIPE\n\nWARNING: Process is aware of termination attempts.'}
];

var browserBookmarks=[
{title:'Dustbowl 24/7 - Community Server',url:'http://dustbowl247.community-tf2.net'},
{title:'TF2 Wiki - Dustbowl',url:'http://wiki.teamfortress.com/wiki/Dustbowl'},
{title:'Steam Community :: TheDustBwlDuck',url:'http://steamcommunity.com/id/thedustbwlduck'},
{title:'what is following me on dustbowl?? - Forum Post',url:'http://forums.community-tf2.net/thread/48291'},
{title:'how to remove unknown process from pc',url:'http://answers.com/q/remove-unknown-process'},
{title:'entity attachment to video games real?',url:'http://paranormal-forums.net/thread/gaming-entities'}
];

var browserHistory=[
{title:'google: "dustbowl entity tf2"',date:'May 27, 2008'},
{title:'google: "someone watching me through game"',date:'May 26, 2008'},
{title:'google: "how to tell if youre going insane"',date:'May 25, 2008'},
{title:'google: "0.0.0.0 server address meaning"',date:'May 22, 2008'},
{title:'google: "can a game be haunted"',date:'May 18, 2008'},
{title:'google: "process 13 wont close"',date:'May 15, 2008'},
{title:'google: "i keep dreaming about the same place"',date:'May 10, 2008'}
];

function openApp(id){
switch(id){
case 'explorer':openExplorer();break;
case 'browser':openBrowser();break;
case 'terminal':openTerminal();break;
case 'texteditor':openTextEditor('','Select a file...');break;
case 'mediaplayer':openMediaPlayer();break;
case 'imageviewer':openImageViewer();break;
case 'chat':openChat();break;
case 'email':openEmail();break;
case 'settings':openSettings();break;
case 'calculator':openCalculator();break;
case 'paint':openPaint();break;
}
}

function openExplorer(path){
var p=path||'C:/Users/TheDustBwlDuck';
var h='<div class="app-explorer"><div class="explorer-toolbar"><button class="explorer-back-btn" id="exp-back">\u25C0</button><div class="explorer-path" id="exp-path">'+p+'</div></div><div class="explorer-content" id="exp-content"></div></div>';
var w=createWindow('explorer','Files - '+p,550,400,h);
renderExplorerPath(p);
}

function renderExplorerPath(path){
var parts=path.split('/').filter(Boolean);
var node=fsData;
for(var i=0;i<parts.length;i++){
if(node[parts[i]]){
if(node[parts[i]].type==='dir'){node=node[parts[i]].children}
else{handleFileOpen(node[parts[i]],parts[i]);return}
}else{return}
}
var contentEl=document.getElementById('exp-content');
var pathEl=document.getElementById('exp-path');
if(!contentEl)return;
pathEl.textContent=path;
contentEl.innerHTML='';
Object.keys(node).forEach(function(name){
var item=node[name];
var d=document.createElement('div');
d.className='explorer-item';
var icon=item.type==='dir'?'\uD83D\uDCC1':item.type==='img'?'\uD83D\uDDBC':item.type==='audio'?'\uD83C\uDFB5':item.type==='video'?'\uD83C\uDFAC':'\uD83D\uDCC4';
d.innerHTML='<div class="explorer-item-icon">'+icon+'</div><div class="explorer-item-name">'+name+'</div>';
d.addEventListener('dblclick',function(){
if(item.type==='dir'){renderExplorerPath(path+'/'+name)}
else{handleFileOpen(item,name)}
});
contentEl.appendChild(d);
});
var backBtn=document.getElementById('exp-back');
if(backBtn){backBtn.onclick=function(){
var parent=path.split('/').slice(0,-1).join('/');
if(parent&&parent!=='')renderExplorerPath(parent);
}}
}

function handleFileOpen(item,name){
if(item.type==='file'){openTextEditor(item.content,name)}
else if(item.type==='img'){openImageViewerSingle(item.src,name)}
else if(item.type==='audio'||item.type==='video'){openMediaPlayerFile(item.src,name,item.type)}
}

function openBrowser(){
var bm='';
browserBookmarks.forEach(function(b){bm+='<div class="browser-bookmark" data-url="'+b.url+'">'+b.title+'</div>'});
var hist='';
browserHistory.forEach(function(h){hist+='<div class="browser-history-item"><span>'+h.title+'</span> <span style="color:#333;margin-left:8px">'+h.date+'</span></div>'});
var h='<div class="app-browser"><div class="browser-toolbar"><input class="browser-url" id="browser-url" value="soos://home" readonly><button class="browser-go-btn">\u27A1</button></div><div class="browser-content"><div style="color:#555;margin-bottom:16px;font-size:14px">SoOS Browser v0.1</div><div style="color:#444;margin-bottom:8px;font-size:12px">BOOKMARKS</div><div class="browser-bookmarks">'+bm+'</div><div style="color:#444;margin:16px 0 8px;font-size:12px">RECENT HISTORY</div>'+hist+'</div></div>';
createWindow('browser','SoOS Browser',600,450,h);
}

function openTerminal(){
var h='<div class="app-terminal"><div class="terminal-output" id="term-out">SoOS Terminal v0.6.66\nType "help" for available commands.\n\n</div><div class="terminal-input-line"><span class="terminal-prompt">TheDustBwlDuck@soos:~$</span><input class="terminal-input" id="term-in" autofocus spellcheck="false"></div></div>';
createWindow('terminal','Terminal',550,350,h);
var inp=document.getElementById('term-in');
if(inp){inp.focus();inp.addEventListener('keydown',function(e){
if(e.key==='Enter'){
var cmd=inp.value.trim();
inp.value='';
processCommand(cmd);
}
})}
}

function processCommand(cmd){
var out=document.getElementById('term-out');
if(!out)return;
out.innerHTML+='<span style="color:#00aa00">TheDustBwlDuck@soos:~$</span> '+cmd+'\n';
var lower=cmd.toLowerCase();
if(lower==='help'){
out.innerHTML+='Available commands:\n  help     - show this message\n  whoami   - display current user\n  date     - show system date\n  ls       - list files\n  cat      - read a file\n  clear    - clear terminal\n  uptime   - system uptime\n  ps       - list processes\n  neofetch - system info\n\n';
}else if(lower==='whoami'){
out.innerHTML+='TheDustBwlDuck\n\n';
}else if(lower==='date'){
out.innerHTML+='Wed May 28 00:06:00 UTC 2008\n\n';
}else if(lower==='clear'){
out.innerHTML='';
}else if(lower==='ls'){
out.innerHTML+='Desktop/  Documents/  Pictures/  Music/  Videos/\n\n';
}else if(lower==='uptime'){
out.innerHTML+='up 0 days, 0:06, load average: <span style="color:#ff3333">13.00, 13.00, 13.00</span>\n\n';
}else if(lower==='ps'){
out.innerHTML+='  PID  STAT  COMMAND\n    1  S     init\n    2  S     soos-core\n    7  S     dust_renderer\n   13  R     <span style="color:#ff3333">dust_entity [CANNOT TERMINATE]</span>\n   14  Z     user_session (zombie)\n   28  S     soos-shell\n\n';
}else if(lower==='neofetch'){
out.innerHTML+='<span style="color:#cc0000">  ___  ___  ___  ___\n / __||   || _ \\/ __|\n \\__ \\| | ||  _/\\__ \\\n |___/|___||_|  |___/</span>\n\n  OS: SoOS 0.6.66\n  Host: TheDustBwlDuck\n  Kernel: dust-core 2.6.13\n  Uptime: 6 minutes\n  Shell: soos-sh\n  Terminal: soos-term\n  CPU: CORRUPTED\n  Memory: 256MB (98% used)\n\n';
}else if(lower.indexOf('cat ')===0){
out.innerHTML+='<span style="color:#ff3333">Permission denied: files can only be accessed through the File Explorer</span>\n\n';
}else if(lower==='exit'){
closeWindow('terminal');return;
}else if(cmd!==''){
out.innerHTML+='<span style="color:#ff3333">Unknown command: '+cmd+'</span>\n\n';
}
out.scrollTop=out.scrollHeight;
}

function openTextEditor(content,filename){
var h='<div class="app-texteditor"><div class="texteditor-toolbar"><span class="texteditor-filename">'+filename+'</span></div><div class="texteditor-content">'+content.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div></div>';
createWindow('texteditor','Notes - '+filename,480,360,h);
}

function openMediaPlayer(){
var h='<div class="app-mediaplayer"><div class="mediaplayer-display"><div class="mediaplayer-placeholder">No media loaded.<br>Open files from File Explorer.</div></div><div class="mediaplayer-controls"><button class="mediaplayer-btn" id="mp-play">\u25B6</button><button class="mediaplayer-btn" id="mp-stop">\u25A0</button><span style="color:#444;font-size:11px;flex:1;text-align:center" id="mp-title">-</span></div></div>';
createWindow('mediaplayer','Media Player',450,350,h);
}

function openMediaPlayerFile(src,name,type){
var tag=type==='video'?'<video src="'+src+'" controls style="width:100%;height:100%"></video>':'<audio src="'+src+'" controls style="margin-top:20px"></audio>';
var h='<div class="app-mediaplayer"><div class="mediaplayer-display">'+tag+'</div><div class="mediaplayer-controls"><span style="color:#888;font-size:11px;flex:1;text-align:center">'+name+'</span></div></div>';
if(openWindows['mediaplayer'])closeWindow('mediaplayer');
createWindow('mediaplayer','Media - '+name,500,380,h);
}

function openImageViewer(){
var images=[];
var pics=fsData['C:'].children['Users'].children['TheDustBwlDuck'].children['Pictures'].children;
Object.keys(pics).forEach(function(k){if(pics[k].type==='img')images.push({name:k,src:pics[k].src})});
var h='<div class="app-imageviewer"><div class="imageviewer-display" id="iv-display"><div class="mediaplayer-placeholder">No images found.<br>Add images to /media/img/ folder.</div></div><div class="imageviewer-nav"><button class="imageviewer-nav-btn" id="iv-prev">\u25C0</button><span class="imageviewer-counter" id="iv-counter">0/0</span><button class="imageviewer-nav-btn" id="iv-next">\u25B6</button></div></div>';
createWindow('imageviewer','Gallery',500,400,h);
if(images.length>0){
var idx=0;
function showImg(){
document.getElementById('iv-display').innerHTML='<img src="'+images[idx].src+'" onerror="this.parentElement.innerHTML=\'<div class=mediaplayer-placeholder>Image not found:<br>'+images[idx].name+'</div>\'">';
document.getElementById('iv-counter').textContent=(idx+1)+'/'+images.length+' - '+images[idx].name;
}
showImg();
document.getElementById('iv-prev').onclick=function(){idx=(idx-1+images.length)%images.length;showImg()};
document.getElementById('iv-next').onclick=function(){idx=(idx+1)%images.length;showImg()};
}
}

function openImageViewerSingle(src,name){
var h='<div class="app-imageviewer"><div class="imageviewer-display"><img src="'+src+'" onerror="this.parentElement.innerHTML=\'<div class=mediaplayer-placeholder>Image not found:<br>'+name+'</div>\'"></div><div class="imageviewer-nav"><span class="imageviewer-counter">'+name+'</span></div></div>';
if(openWindows['imageviewer'])closeWindow('imageviewer');
createWindow('imageviewer','Gallery - '+name,500,400,h);
}

function openChat(){
var contacts=Object.keys(chatData);
var tabs='';
contacts.forEach(function(c,i){tabs+='<button class="chat-contact'+(i===0?' active':'')+'" data-chat="'+c+'">'+c+'</button>'});
var h='<div class="app-chat"><div class="chat-sidebar" id="chat-tabs">'+tabs+'</div><div class="chat-messages" id="chat-msgs"></div></div>';
createWindow('chat','Chat Logs',480,400,h);
renderChat(contacts[0]);
document.querySelectorAll('.chat-contact').forEach(function(btn){
btn.addEventListener('click',function(){
document.querySelectorAll('.chat-contact').forEach(function(b){b.classList.remove('active')});
btn.classList.add('active');
renderChat(btn.dataset.chat);
});
});
}

function renderChat(contactId){
var msgs=chatData[contactId];
var el=document.getElementById('chat-msgs');
if(!el||!msgs)return;
el.innerHTML='';
msgs.forEach(function(m){
var d=document.createElement('div');
d.className='chat-msg';
d.innerHTML='<span class="chat-msg-time">['+m.t+']</span> <span class="chat-msg-user" style="color:'+(m.u==='TheDustBwlDuck'?'#cc0000':'#557799')+'">'+m.u+'</span><div class="chat-msg-text">'+m.m+'</div>';
el.appendChild(d);
});
el.scrollTop=el.scrollHeight;
}

function openEmail(){
var list='';
emailData.forEach(function(e){
list+='<div class="email-item'+(e.unread?' unread':'')+'" data-email-id="'+e.id+'"><div class="email-unread-dot'+(e.unread?'':' read')+'"></div><div class="email-info"><div class="email-subject">'+e.subject+'</div><div class="email-from">'+e.from+'</div></div><div class="email-date">'+e.date+'</div></div>';
});
var h='<div class="app-email"><div class="email-list" id="email-list">'+list+'</div></div>';
createWindow('email','Mail',520,380,h);
document.querySelectorAll('.email-item').forEach(function(item){
item.addEventListener('click',function(){
var id=parseInt(item.dataset.emailId);
var email=emailData.find(function(e){return e.id===id});
if(!email)return;
var body=document.querySelector('#win-email .window-body');
if(body){body.innerHTML='<div class="email-view"><button class="email-view-back" id="email-back">\u25C0 Back</button><div class="email-view-header"><div class="email-view-subject">'+email.subject+'</div><div class="email-view-meta">From: '+email.from+' | '+email.date+'</div></div><div class="email-view-body">'+email.body+'</div></div>';
document.getElementById('email-back').addEventListener('click',function(){openEmail()});}
});
});
}

function openSettings(){
var h='<div class="app-settings"><div class="settings-section"><div class="settings-section-title">System</div><div class="settings-row"><span class="settings-label">OS Version</span><span class="settings-value">SoOS 0.6.66</span></div><div class="settings-row"><span class="settings-label">Kernel</span><span class="settings-value">dust-core 2.6.13</span></div><div class="settings-row"><span class="settings-label">User</span><span class="settings-value">TheDustBwlDuck</span></div><div class="settings-row"><span class="settings-label">Hostname</span><span class="settings-value">dustbowl-pc</span></div></div><div class="settings-section"><div class="settings-section-title">Hardware</div><div class="settings-row"><span class="settings-label">CPU</span><span class="settings-value">Unknown (corrupted)</span></div><div class="settings-row"><span class="settings-label">RAM</span><span class="settings-value">256 MB (98% used)</span></div><div class="settings-row"><span class="settings-label">HDD</span><span class="settings-value">80 GB - 13 bad sectors</span></div><div class="settings-row"><span class="settings-label">Audio</span><span class="settings-value" style="color:#ff3333">DEVICE NOT RECOGNIZED</span></div></div><div class="settings-section"><div class="settings-section-title">Network</div><div class="settings-row"><span class="settings-label">Status</span><span class="settings-value">Connected</span></div><div class="settings-row"><span class="settings-label">Last Connection</span><span class="settings-value" style="color:#ff3333">0.0.0.0:27015</span></div></div></div>';
createWindow('settings','Settings',400,420,h);
}

function openCalculator(){
var btns=['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];
var grid='';
btns.forEach(function(b){var cls='calc-btn'+(['/','*','-','+','=','C'].indexOf(b)!==-1?' op':'');grid+='<button class="'+cls+'" data-calc="'+b+'">'+b+'</button>'});
var h='<div class="app-calculator"><div class="calc-display" id="calc-disp">0</div><div class="calc-buttons" id="calc-btns">'+grid+'</div></div>';
createWindow('calculator','Calculator',260,340,h);
var disp=document.getElementById('calc-disp');
var expr='';
document.querySelectorAll('[data-calc]').forEach(function(btn){
btn.addEventListener('click',function(){
var v=btn.dataset.calc;
if(v==='C'){expr='';disp.textContent='0'}
else if(v==='='){try{var r=Function('"use strict";return ('+expr+')')();disp.textContent=r;expr=String(r)}catch(e){disp.textContent='ERR';expr=''}}
else{expr+=v;disp.textContent=expr}
});
});
}

function openPaint(){
var colors=['#ffffff','#ff0000','#00ff00','#0000ff','#ffff00','#ff00ff','#00ffff','#ff3333','#333333','#666666'];
var colorBtns='';
colors.forEach(function(c,i){colorBtns+='<div class="paint-color-btn'+(i===0?' active':'')+'" data-color="'+c+'" style="background:'+c+'"></div>'});
var h='<div class="app-paint"><div class="paint-toolbar">'+colorBtns+'<button class="paint-size-btn active" data-size="2">S</button><button class="paint-size-btn" data-size="5">M</button><button class="paint-size-btn" data-size="10">L</button><button class="paint-clear-btn" id="paint-clear">Clear</button></div><div class="paint-canvas-wrap" id="paint-wrap"><canvas id="paint-canvas"></canvas></div></div>';
createWindow('paint','Paint',550,400,h);
setTimeout(function(){initPaintCanvas()},50);
}

function initPaintCanvas(){
var wrap=document.getElementById('paint-wrap');
var canvas=document.getElementById('paint-canvas');
if(!wrap||!canvas)return;
var ctx=canvas.getContext('2d');
canvas.width=wrap.offsetWidth;
canvas.height=wrap.offsetHeight;
ctx.fillStyle='#0a0a0a';
ctx.fillRect(0,0,canvas.width,canvas.height);
var drawing=false;
var color='#ffffff';
var size=2;
canvas.addEventListener('mousedown',function(e){drawing=true;ctx.beginPath();ctx.moveTo(e.offsetX,e.offsetY)});
canvas.addEventListener('mousemove',function(e){if(!drawing)return;ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineTo(e.offsetX,e.offsetY);ctx.stroke()});
canvas.addEventListener('mouseup',function(){drawing=false});
canvas.addEventListener('mouseleave',function(){drawing=false});
document.querySelectorAll('.paint-color-btn').forEach(function(btn){
btn.addEventListener('click',function(){document.querySelectorAll('.paint-color-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');color=btn.dataset.color});
});
document.querySelectorAll('.paint-size-btn').forEach(function(btn){
btn.addEventListener('click',function(){document.querySelectorAll('.paint-size-btn').forEach(function(b){b.classList.remove('active')});btn.classList.add('active');size=parseInt(btn.dataset.size)});
});
document.getElementById('paint-clear').addEventListener('click',function(){ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,canvas.width,canvas.height)});
}
