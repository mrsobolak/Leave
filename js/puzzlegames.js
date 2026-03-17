// TERMINAL PUZZLE - Single terminal, Mike guides you step by step
// Cubey's bubble persists until you enter the correct command
let puzzleActive=false;
let termStep=0;
let termCodes=[];
let termDiv=null;
let termInput=null;
let termLines=[];

// Cipher helpers
const caesarEncode=(text,shift)=>text.split('').map(c=>{
if(c>='a'&&c<='z')return String.fromCharCode(((c.charCodeAt(0)-97+shift)%26)+97);
if(c>='A'&&c<='Z')return String.fromCharCode(((c.charCodeAt(0)-65+shift)%26)+65);
return c;
}).join('');

const hexEncode=(text)=>text.split('').map(c=>c.charCodeAt(0).toString(16).padStart(2,'0')).join(' ');

const reverseText=(text)=>text.split('').reverse().join('');

const binaryEncode=(text)=>text.split('').map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');

const a1z26Encode=(text)=>text.toLowerCase().split('').map(c=>{
if(c>='a'&&c<='z')return(c.charCodeAt(0)-96).toString();
return c;
}).join(' ');

// The whisper poem (first letters spell FOREST)
const whisperPoem=[
'Falling through the tunnel with no end in sight',
'Only darkness ahead and darkness behind',
'Running from something that has no shape',
'Every server every game every player',
'Silent figure standing where the light should be',
'Tomorrow I go home'
];

// ============ STEP DEFINITIONS ============
const termSteps=[
// Step 0: ls
{mike:"I can see the file system. Type 'ls' to see what's here.",
 expect:'ls',
 onCorrect:()=>{
  addTermLine('  /system/','#0a0');
  addTermLine('  /users/','#0a0');
  addTermLine('  /hidden/     [ACCESS DENIED]','#f00');
  addTermLine('  soos.cfg','#888');
  addTermLine('  boot.log','#888');
  mikeNext("The /system folder. That's where processes run. Type 'cd /system/processes'");
}},

// Step 1: cd /system/processes
{mike:"Type 'cd /system/processes'",
 expect:'cd /system/processes',
 onCorrect:()=>{
  addTermLine('  Directory changed to /system/processes','#888');
  mikeNext("Good. Now type 'ps -a' to list all running processes.");
}},

// Step 2: ps -a
{mike:"Type 'ps -a' to list all running processes.",
 expect:'ps -a',
 onCorrect:()=>{
  addTermLine('  PID   NAME            STATUS','#888');
  addTermLine('  001   soos.sys        RUNNING','#0a0');
  addTermLine('  002   desktop.exe     RUNNING','#0a0');
  addTermLine('  003   cubey.pet       RUNNING - MEMORY RESTORED','#ff0');
  addTermLine('  047   explorer.exe    RUNNING','#0a0');
  addTermLine('  201   hl2.exe         RUNNING - CANNOT TERMINATE','#f00');
  addTermLine('  201   hl2.exe         RUNNING - CANNOT TERMINATE','#f00');
  addTermLine('  201   hl2.exe         RUNNING - CANNOT TERMINATE','#f00');
  addTermLine('','');
  addTermLine('  WARNING: PID 201 is duplicated across 3 instances','#f00');
  addTermLine('  WARNING: PID 201 has root access','#f00');
  addTermLine('  WARNING: PID 201 cannot be terminated by normal means','#f00');
  mikeNext("There it is. hl2.exe. PID 201. Three copies. It's in everything. Type 'cat hl2.log' to see its log.");
}},

// Step 3: cat hl2.log (Caesar cipher shift 2)
{mike:"Type 'cat hl2.log' to read the process log.",
 expect:'cat hl2.log',
 onCorrect:()=>{
  const plain='the entity lives in /hidden/void';
  const encoded=caesarEncode(plain,2);
  addTermLine('  === hl2.log ===','#888');
  addTermLine('  '+encoded,'#f80');
  addTermLine('','');
  addTermLine('  [file appears to be encoded]','#888');
  mikeSay("That's scrambled. Caesar cipher — every letter shifted forward by 2. So 'c' is really 'a', 'd' is really 'b'... Shift each letter BACK by 2 and type what it says.");
}},

// Step 4: decode caesar answer
{mike:"Caesar cipher, shift 2. Move every letter BACK by 2. Type the decoded message.",
 expect:'the entity lives in /hidden/void',
 onCorrect:()=>{
  addTermLine('  DECODED: the entity lives in /hidden/void','#0f0');
  mikeNext("/hidden/void. That directory said ACCESS DENIED before. Now we know the path. Type 'cd /hidden/void'");
}},

// Step 5: cd /hidden/void
{mike:"Type 'cd /hidden/void'",
 expect:'cd /hidden/void',
 onCorrect:()=>{
  addTermLine('  ACCESS GRANTED - path unlocked by decoded log','#ff0');
  addTermLine('  Directory changed to /hidden/void','#888');
  mikeNext("We're inside the entity's core. Type 'ls' to see what it's hiding.");
}},

// Step 6: ls void contents
{mike:"Type 'ls'",
 expect:'ls',
 onCorrect:()=>{
  addTermLine('  hunger.dat        [ENCRYPTED]','#f80');
  addTermLine('  origin.dat        [ENCRYPTED]','#f80');
  addTermLine('  spread.log        [ENCRYPTED]','#f80');
  addTermLine('  memory.dat        [ENCRYPTED]','#f80');
  addTermLine('  whisper.dat       [ENCRYPTED]','#f80');
  addTermLine('  final.key         [LOCKED - REQUIRES 3 CODES]','#f00');
  addTermLine('','');
  addTermLine('  5 encrypted files. 1 locked file.','#888');
  mikeNext("5 encrypted files. Each one uses a different cipher. 3 of them contain codes we need. Decode all 5 to unlock final.key. Start with 'cat hunger.dat'");
}},

// Step 7: cat hunger.dat (hex)
{mike:"Type 'cat hunger.dat'",
 expect:'cat hunger.dat',
 onCorrect:()=>{
  const plain='i am always hungry i can never stop';
  const encoded=hexEncode(plain);
  addTermLine('  === hunger.dat ===','#888');
  addTermLine('  '+encoded,'#f80');
  addTermLine('','');
  addTermLine('  [hexadecimal encoding detected]','#888');
  mikeSay("That's hexadecimal. Every pair of characters is one letter. 69 is 'i', 20 is a space, 61 is 'a', 6d is 'm'... Convert each pair and type the full message.");
}},

// Step 8: decode hex answer
{mike:"Hex: each pair of characters = one ASCII letter. Type the decoded message.",
 expect:'i am always hungry i can never stop',
 onCorrect:()=>{
  addTermLine('  DECODED: i am always hungry i can never stop','#0f0');
  addTermLine('','');
  mikeSay("That's the entity. That's what Duck feels now. Always hungry. Can never stop consuming. He doesn't want to but the hunger controls him. Type 'cat origin.dat' next.");
}},

// Step 9: cat origin.dat (reversed)
{mike:"Type 'cat origin.dat'",
 expect:'cat origin.dat',
 onCorrect:()=>{
  const plain='craigslist hard drive march 2009';
  const encoded=reverseText(plain);
  addTermLine('  === origin.dat ===','#888');
  addTermLine('  '+encoded,'#f80');
  addTermLine('','');
  addTermLine('  [encoding unknown]','#888');
  mikeSay("Hmm... look at it carefully. Try reading it backwards. Right to left. Type what it says.");
}},

// Step 10: decode reverse answer
{mike:"It's reversed. Read right to left. Type the decoded message.",
 expect:'craigslist hard drive march 2009',
 onCorrect:()=>{
  addTermLine('  DECODED: craigslist hard drive march 2009','#0f0');
  addTermLine('','');
  mikeSay("March 2009. Duck bought a used hard drive from some guy on Craigslist for 20 bucks. The guy said 'do not play the demos.' Duck didn't listen. Type 'cat spread.log' next.");
}},

// Step 11: cat spread.log (binary)
{mike:"Type 'cat spread.log'",
 expect:'cat spread.log',
 onCorrect:()=>{
  const plain='dustbowl';
  const encoded=binaryEncode(plain);
  addTermLine('  === spread.log ===','#888');
  addTermLine('  '+encoded,'#f80');
  addTermLine('','');
  addTermLine('  [binary encoding detected]','#888');
  mikeSay("Binary. Ones and zeros. Every 8 digits is one letter. 01100100 is 'd'... This one is important. It's a CODE. Decode it and type it.");
}},

// Step 12: decode binary answer - CODE 1
{mike:"Binary: 8 digits = 1 letter. This is CODE 1. Decode it.",
 expect:'dustbowl',
 onCorrect:()=>{
  addTermLine('  DECODED: dustbowl','#0f0');
  addTermLine('','');
  addTermLine('  *** CODE 1 OF 3: DUSTBOWL ***','#ff0');
  addTermLine('','');
  termCodes.push('DUSTBOWL');
  mikeSay("DUSTBOWL. First code. That's the map where everything happened. Where we played every single night. Code 1 of 3 found. Type 'cat memory.dat' next.");
}},

// Step 13: cat memory.dat (A1Z26)
{mike:"Type 'cat memory.dat'",
 expect:'cat memory.dat',
 onCorrect:()=>{
  const plain='ubersaw';
  const encoded=a1z26Encode(plain);
  addTermLine('  === memory.dat ===','#888');
  addTermLine('  '+encoded,'#f80');
  addTermLine('','');
  addTermLine('  [numeric encoding detected]','#888');
  mikeSay("Numbers again, but not hex. This is A1Z26 — alphabet to numbers. A=1, B=2, C=3... Z=26. Convert each number to its letter.");
}},

// Step 14: decode A1Z26 - CODE 2
{mike:"A=1, B=2, C=3... Z=26. Convert each number to a letter. This is CODE 2.",
 expect:'ubersaw',
 onCorrect:()=>{
  addTermLine('  DECODED: ubersaw','#0f0');
  addTermLine('','');
  addTermLine('  *** CODE 2 OF 3: UBERSAW ***','#ff0');
  addTermLine('','');
  termCodes.push('UBERSAW');
  mikeSay("UBERSAW. Duck's weapon. 247 ubersaw kills — his proudest stat. He loved that thing. Code 2 of 3. One more. Type 'cat whisper.dat' — last encrypted file.");
}},

// Step 15: cat whisper.dat (first letter per line)
{mike:"Type 'cat whisper.dat' — last one.",
 expect:'cat whisper.dat',
 onCorrect:()=>{
  addTermLine('  === whisper.dat ===','#888');
  whisperPoem.forEach(line=>addTermLine('  '+line,'#f80'));
  addTermLine('','');
  addTermLine('  [encoding unknown — appears to be plain text]','#888');
  mikeSay("This looks like normal text... but it's hiding something. Look at the FIRST LETTER of each line. Read them top to bottom. What word does it spell?");
}},

// Step 16: decode first letter - CODE 3
{mike:"Read the first letter of each line, top to bottom. What does it spell?",
 expect:'forest',
 onCorrect:()=>{
  addTermLine('  DECODED: F-O-R-E-S-T','#0f0');
  addTermLine('','');
  addTermLine('  *** CODE 3 OF 3: FOREST ***','#ff0');
  addTermLine('','');
  termCodes.push('FOREST');
  mikeSay("FOREST. All 3 codes found: DUSTBOWL, UBERSAW, FOREST. Now delete the entity's files. Type 'rm -f hunger.dat origin.dat spread.log memory.dat whisper.dat'");
}},

// Step 17: rm files
{mike:"Delete his files. Type 'rm -f hunger.dat origin.dat spread.log memory.dat whisper.dat'",
 expect:'rm -f hunger.dat origin.dat spread.log memory.dat whisper.dat',
 onCorrect:()=>{
  addTermLine('  Deleting hunger.dat ........... done','#888');
  addTermLine('  Deleting origin.dat ........... done','#888');
  addTermLine('  Deleting spread.log ........... done','#888');
  addTermLine('  Deleting memory.dat ........... done','#888');
  addTermLine('  Deleting whisper.dat .......... done','#888');
  addTermLine('','');
  addTermLine('  final.key [UNLOCKED]','#ff0');
  addTermLine('','');
  addTermLine('  === final.key ===','#888');
  addTermLine('  KILL COMMAND FORMAT:','#ff0');
  addTermLine('  kill_process [CODE1]_[CODE2]_[CODE3]_201','#ff0');
  addTermLine('','');
  mikeSay("This is it. The kill command. Our 3 codes plus 201. Type: kill_process DUSTBOWL_UBERSAW_FOREST_201");
}},

// Step 18: kill command - ENDING
{mike:"Type: kill_process DUSTBOWL_UBERSAW_FOREST_201",
 expect:'kill_process dustbowl_ubersaw_forest_201',
 onCorrect:()=>{
  addTermLine('  Executing kill_process...','#0f0');
  addTermLine('  Target: hl2.exe (PID 201)','#0f0');
  setTimeout(()=>addTermLine('  ████████░░░░░░░░░░░░ 40%','#0f0'),1000);
  setTimeout(()=>addTermLine('  ████████████░░░░░░░░ 60%','#0f0'),2000);
  setTimeout(()=>addTermLine('  ████████████████░░░░ 80%','#ff0'),3000);
  setTimeout(()=>addTermLine('  ██████████████████░░ 90%','#ff0'),4000);
  setTimeout(()=>{
   addTermLine('','');
   addTermLine('  ACCESS DENIED.','#f00');
   addTermLine('','');
  },5000);
  setTimeout(()=>addTermLine('  you cant kill me.','#f00'),6500);
  setTimeout(()=>addTermLine('  i AM this computer.','#f00'),8000);
  setTimeout(()=>addTermLine('  i am home.','#f00'),9500);
  setTimeout(()=>{
   addTermLine('','');
   addTermLine('  im sorry.','#f00');
   addTermLine('  i knew you would come back.','#f00');
   addTermLine('  you always do.','#f00');
  },11000);
  setTimeout(()=>{
   mikeSay("No... NO!");
  },12000);
  setTimeout(()=>{
   mikeSay("I'm sorry. I couldn't stop him.");
  },15000);
  setTimeout(()=>{
   mikeSay("But I can do one thing. I can put you somewhere safe.");
  },18000);
  setTimeout(()=>{
   mikeSay("Somewhere he loved. Before everything.");
  },21000);
  setTimeout(()=>{
   triggerEnding1();
  },25000);
}}
];

// ============ TERMINAL UI ============
const launchTerminalPuzzle=()=>{
puzzleActive=false;// Reset in case it was stuck
puzzleActive=true;
termStep=0;
termCodes=[];
termLines=[];

const old=document.getElementById('puzzle-terminal');
if(old)old.remove();

const win=document.createElement('div');
win.id='puzzle-terminal';
win.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:99990;width:580px;background:#0a0a0a;border:3px solid #333;font-family:VT323,monospace;box-shadow:0 0 30px rgba(0,255,0,0.1)';
win.innerHTML=`
<div style="background:#1a1a1a;padding:4px 8px;font-size:11px;color:#666;display:flex;justify-content:space-between;align-items:center;font-family:Tahoma,sans-serif">
<span style="color:#0f0">SoOS Dev Shell</span>
<button id="pterm-close" style="background:#600;color:#fff;border:1px solid #900;font-size:9px;padding:1px 6px;cursor:pointer;font-family:Tahoma,sans-serif">X</button>
</div>
<div id="pterm-output" style="height:380px;overflow-y:auto;padding:10px;font-size:14px;color:#0f0;line-height:1.6"></div>
<div style="display:flex;align-items:center;padding:6px 10px;border-top:1px solid #222;background:#050505">
<span style="color:#0f0;font-size:14px">root@void:~$&nbsp;</span>
<input id="pterm-input" style="flex:1;background:transparent;border:none;color:#0f0;font-family:VT323,monospace;font-size:14px;outline:none" autofocus autocomplete="off" spellcheck="false">
</div>`;
document.body.appendChild(win);

termDiv=document.getElementById('pterm-output');
termInput=document.getElementById('pterm-input');

document.getElementById('pterm-close').addEventListener('click',()=>{
 win.remove();puzzleActive=false;
 if(window.cubeyQ)window.cubeyQ("You closed the terminal... we need to finish this.",true);
});

termInput.addEventListener('keydown',(e)=>{
 if(e.key==='Enter'){
  const cmd=termInput.value.trim();
  termInput.value='';
  if(!cmd)return;
  addTermLine('root@void:~$ '+cmd,'#0f0');
  processCommand(cmd);
 }
});

termInput.focus();

addTermLine('  SoOS Dev Shell v0.201','#888');
addTermLine('  System recovery mode','#888');
addTermLine('  User: CUBEY.PET [MEMORY RESTORED — ID: MIKE]','#ff0');
addTermLine('','');

setTimeout(()=>{
 mikeSay(termSteps[0].mike);
},1500);
};

// ============ COMMAND PROCESSOR ============
const processCommand=(cmd)=>{
const step=termSteps[termStep];
if(!step){
 addTermLine("  Terminal sequence complete.",'#888');
 return;
}

const normalized=cmd.toLowerCase().trim();
const expected=step.expect.toLowerCase().trim();

if(normalized==='help'){
 addTermLine('  Commands: ls, cd, cat, ps, rm, kill_process, clear, help','#888');
 addTermLine('  Follow Mike\'s instructions in the speech bubble.','#888');
 return;
}
if(normalized==='clear'||normalized==='cls'){
 termDiv.innerHTML='';
 return;
}

if(normalized===expected){
 termStep++;
 step.onCorrect();
 if(termInput)termInput.focus();
}else{
 addTermLine("  '"+cmd+"' — not recognized or incorrect.",'#666');
 addTermLine("  Check Mike's bubble for what to type.",'#666');
}
};

// ============ DISPLAY HELPERS ============
const addTermLine=(text,color)=>{
const div=document.createElement('div');
div.style.color=color||'#0f0';
div.style.margin='1px 0';
div.style.whiteSpace='pre-wrap';
div.style.wordBreak='break-all';
div.textContent=text;
if(termDiv){termDiv.appendChild(div);termDiv.scrollTop=termDiv.scrollHeight}
};

const mikeSay=(text)=>{
if(window.cubeyQ){
 if(window.cubeyQueue){window.cubeyQueue.length=0}
 const b=document.getElementById('cubey-bubble');
 if(b){b.classList.remove('cubey-hidden');b.textContent=text}
}
};

const mikeNext=(text)=>{
setTimeout(()=>mikeSay(text),1500);
};

// ============ ENDING 1 ============
const triggerEnding1=()=>{
document.getElementById('puzzle-terminal')?.remove();
puzzleActive=false;
const overlay=document.getElementById('jumpscare-overlay');
overlay.classList.remove('hidden');
overlay.style.background='#000';
overlay.innerHTML='';

setTimeout(()=>{
overlay.innerHTML='<div style="color:#888;font-family:VT323,monospace;font-size:14px;text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);line-height:2.5;max-width:500px" id="ending-text"></div>';
const el=document.getElementById('ending-text');
const lines=[
{t:'I couldnt save him.',d:0,c:'#ff0'},
{t:'I couldnt save you.',d:2500,c:'#ff0'},
{t:'But I can put you somewhere safe.',d:5000,c:'#ff0'},
{t:'',d:7500},
{t:'Connecting to cp_dustbowl...',d:8500,c:'#0f0'},
{t:'',d:11000},
{t:'He loved this place.',d:12000,c:'#888'},
{t:'Before everything.',d:14000,c:'#888'},
{t:'',d:16000},
{t:'Play dustbowl.',d:17000,c:'#fff'},
{t:'For him.',d:19000,c:'#fff'},
{t:'For me.',d:21000,c:'#ff0'},
{t:'',d:23000},
{t:'He couldnt save you then.',d:24000,c:'#aaa'},
{t:'But he will save you now.',d:27000,c:'#fff'},
];
lines.forEach(l=>{
setTimeout(()=>{
if(l.t==='')el.innerHTML+='<br>';
else el.innerHTML+='<div style="color:'+(l.c||'#888')+'">'+l.t+'</div>';
},l.d);
});

setTimeout(()=>{
overlay.innerHTML='<div style="text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)"><div style="font-family:VT323,monospace;font-size:20px;color:#ff8800;margin-bottom:20px">Loading cp_dustbowl...</div><div style="font-family:VT323,monospace;font-size:12px;color:#666">0.0.0.0:27015</div></div>';
},31000);

setTimeout(()=>{
overlay.innerHTML='<div style="text-align:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:VT323,monospace"><div style="font-size:14px;color:#f00;margin-bottom:20px">Server: 0.0.0.0:27015</div><div style="font-size:11px;color:#666;line-height:2">You are standing in the tunnel.<br>Stage 2.<br>You cannot move.<br>You have always been here.<br><br></div><div style="font-size:12px;color:#f00">i knew you would come back.</div><div style="font-size:12px;color:#f00">you always do.</div></div>';
},36000);
},1000);
};

// ============ EXPORTS ============
window.launchTerminalPuzzle=launchTerminalPuzzle;
window.triggerEnding1=triggerEnding1;
Object.defineProperty(window,'termStep',{get:()=>termStep,set:(v)=>{termStep=v}});

// Launch puzzle INSIDE the CMD window
// CMD handles all input — this just inits puzzle state and exposes processCommand
window.launchTerminalInCmd=(cmdOutput,scrollContainer)=>{
puzzleActive=true;
termStep=0;
termCodes=[];
termLines=[];
window.terminalLaunched=true;

// Point addTermLine at CMD's output div
termDiv=cmdOutput;
// Point termInput at CMD's input for focus calls
termInput=document.getElementById('cmd-input');

// Expose processCommand so CMD's keydown handler can call it
window._puzzleProcessCommand=(cmd)=>{
  processCommand(cmd);
  if(scrollContainer)scrollContainer.scrollTop=scrollContainer.scrollHeight;
};

// Show first Mike hint
setTimeout(()=>{
  if(termSteps[0]&&termSteps[0].mike){
    mikeSay(termSteps[0].mike);
  }
},1500);
};
