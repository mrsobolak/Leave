// SoOS SOUNDTRACK v3.0 — 12 tracks, procedural Web Audio API
let _a=null,_mg=null,_ct=null,_nd=[],_lp=[],_iv=[];
const soosAudio={
init(){if(_a)return;_a=new(window.AudioContext||window.webkitAudioContext)();_mg=_a.createGain();_mg.gain.value=0.5;_mg.connect(_a.destination);if(_a.state==='suspended')_a.resume()},
stop(){_lp.forEach(clearTimeout);_iv.forEach(clearInterval);_nd.forEach(n=>{try{n.stop()}catch(e){}});_nd=[];_lp=[];_iv=[];_ct=null},
fadeOut(d,cb){if(!_mg){cb&&cb();return}_mg.gain.setValueAtTime(_mg.gain.value,_a.currentTime);_mg.gain.linearRampToValueAtTime(0.001,_a.currentTime+d);setTimeout(()=>{soosAudio.stop();_mg.gain.value=0.5;cb&&cb()},d*1000+100)},
setVolume(v){if(_mg)_mg.gain.value=Math.max(0,Math.min(1,v))},
// helpers
_n(f,s,d,ty,v,dt){if(!_a)return;const o=_a.createOscillator(),g=_a.createGain(),fl=_a.createBiquadFilter();fl.type='lowpass';fl.frequency.value=2800;o.type=ty||'sine';o.frequency.value=f;if(dt)o.detune.value=dt;const t=_a.currentTime+s;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v||0.04,t+0.02);g.gain.exponentialRampToValueAtTime(0.001,t+d);o.connect(fl);fl.connect(g);g.connect(_mg);o.start(t);o.stop(t+d+0.05);_nd.push(o)},
_ns(s,d,v,h){if(!_a)return;const sz=Math.floor(_a.sampleRate*Math.min(d,30)),b=_a.createBuffer(1,sz,_a.sampleRate),da=b.getChannelData(0);for(let i=0;i<sz;i++)da[i]=Math.random()*2-1;const sr=_a.createBufferSource();sr.buffer=b;const g=_a.createGain(),fl=_a.createBiquadFilter();fl.type='lowpass';fl.frequency.value=h||400;const t=_a.currentTime+s;g.gain.setValueAtTime(v||0.01,t);g.gain.exponentialRampToValueAtTime(0.001,t+d);sr.connect(fl);fl.connect(g);g.connect(_mg);sr.start(t);sr.stop(t+d+0.05);_nd.push(sr)},
_pd(fr,s,d,v){fr.forEach(f=>{this._n(f,s,d,'sine',v||0.015);this._n(f*1.003,s+0.08,d*0.9,'sine',(v||0.015)*0.5)})},
_pick(a){return a[Math.floor(Math.random()*a.length)]},

// 1. "TheDustBowlDuck" — Main Menu
playMenu(){this.init();this.stop();_ct='menu';
const B=60/105;let iter=0;
// C major, gentle piano — every phrase resolves to C (523) for seamless loop
// [freq, beat, duration in beats]
const phrases=[
  // A: gentle rise and fall
  [[523,0,1.5],[587,1.5,1],[659,2.5,1.5],[587,4,1],[523,5,2],
   [440,7,1],[494,8,1.5],[523,9.5,1],[587,10.5,1.5],
   [523,12,1],[494,13,1],[440,14,1],[523,15,1]],
  // B: higher, more hopeful
  [[659,0,1.5],[698,1.5,1],[659,2.5,1],[587,3.5,1.5],[523,5,2],
   [587,7,1],[659,8,1],[784,9,2],[659,11,1],
   [587,12,1],[523,13,1],[494,14,1],[523,15,1]],
  // C: descending, thoughtful
  [[784,0,2],[659,2,1.5],[587,3.5,1],[523,4.5,2],
   [494,6.5,1],[440,7.5,1.5],[392,9,1],[440,10,1.5],
   [494,11.5,1],[523,12.5,1.5],[494,14,1],[523,15,1]],
  // D: simple, nostalgic
  [[440,0,2],[523,2,1.5],[587,3.5,1],[523,4.5,2],
   [440,6.5,1.5],[494,8,1],[523,9,2],[587,11,1],
   [523,12,1.5],[440,13.5,0.5],[494,14,1],[523,15,1]],
];
const chords=[[262,330,392],[220,262,330],[175,220,262],[196,247,294]];
const bassR=[131,110,87,98];
const play=()=>{
  if(_ct!=='menu')return;
  const ph=phrases[iter%4];
  ph.forEach(([f,t,d])=>{
    this._n(f,t*B,d*B*0.95,'sine',0.04);
    this._n(f*2,t*B+0.04,d*B*0.5,'sine',0.009);// music box
  });
  // Warm pads C Am F G
  for(let i=0;i<4;i++)this._pd(chords[i],i*4*B,B*3.8,0.016);
  // Bass
  bassR.forEach((f,i)=>this._n(f,i*4*B,B*3.8,'triangle',0.04));
  // Twinkle — 2 per loop, random from high register
  for(let i=0;i<2;i++){
    const f=this._pick([1047,1175,1319,1397,1568]);
    this._n(f,(4+i*6+Math.random()*2)*B,B*2,'sine',0.006);
  }
  // Gentle pulse
  for(let i=0;i<8;i++){this._n(65,i*2*B,0.12,'sine',0.02)}
  iter++;
  _lp.push(setTimeout(()=>play(),16*B*1000-30));
};play()},

// 2. "Dell XPS 420" — Boot Chime
playBoot(){this.init();this._n(1000,0,0.1,'square',0.08);this._n(440,0.5,0.3,'sine',0.06);this._n(554,0.8,0.3,'sine',0.06);this._n(659,1.1,0.3,'sine',0.06);this._n(880,1.4,0.6,'sine',0.07);this._n(880*2,1.5,0.8,'sine',0.02);this._n(880*1.5,1.6,0.5,'sine',0.015);this._pd([440,554,659],0.5,2,0.01)},

// 3. "His Room" — Normal Desktop (upbeat chiptune exploration)
playDesktop(){this.init();this.stop();_ct='desktop';
const B=60/115;let iter=0;
// Key of C major, 16-beat phrases, every phrase ENDS on C (262/523) for clean loop
// Melodies have shape: rise → peak → resolve back home
const melA=[
  // A: climb up, come back down to C
  [[262,0,1],[330,1,1],[392,2,0.75],[440,2.75,0.75],[523,3.5,1.5],
   [494,5,0.75],[440,5.75,0.75],[392,6.5,1],[330,7.5,0.5],
   [392,8,1],[440,9,0.75],[523,9.75,0.75],[587,10.5,1.5],
   [523,12,1],[440,13,1],[392,14,1],[262,15,1]],
  // B: start high, wander down
  [[523,0,1],[494,1,0.75],[440,1.75,0.75],[392,2.5,1.5],
   [440,4,1],[494,5,0.75],[523,5.75,0.75],[587,6.5,1],[523,7.5,0.5],
   [440,8,1],[392,9,1],[330,10,1.5],
   [392,11.5,0.75],[440,12.25,0.75],[392,13,1],[330,14,1],[262,15,1]],
  // C: playful bounce
  [[262,0,0.5],[330,0.5,0.5],[392,1,1],[523,2,0.5],[494,2.5,0.5],[440,3,1],
   [392,4,0.5],[440,4.5,0.5],[494,5,1],[523,6,1],[440,7,1],
   [392,8,1],[494,9,0.5],[523,9.5,0.5],[587,10,1.5],
   [523,11.5,1],[440,12.5,1],[392,13.5,0.5],[330,14,1],[262,15,1]],
  // D: gentle, spacious
  [[392,0,2],[440,2,1],[494,3,1],
   [523,4,2],[494,6,1],[440,7,1],
   [392,8,2],[523,10,1],[587,11,1],
   [523,12,1.5],[440,13.5,0.5],[392,14,1],[262,15,1]],
];
// Chords: C Am F G — each lasts 4 beats
const chords=[[262,330,392],[220,262,330],[175,220,262],[196,247,294]];
// Bass follows chord roots
const bassRoots=[131,110,87,98];
const play=()=>{
  if(_ct!=='desktop')return;
  const mel=melA[iter%4];
  // Melody
  mel.forEach(([f,t,d])=>{
    this._n(f,t*B,d*B*0.9,'square',0.02);
    this._n(f*2,t*B+0.03,d*B*0.4,'square',0.004);
  });
  // Chords — 4 beats each, gentle
  for(let i=0;i<4;i++){
    chords[i].forEach(f=>{
      this._n(f,i*4*B,B*3.5,'sine',0.01);
      this._n(f*1.002,i*4*B+0.06,B*3,'sine',0.005);
    });
  }
  // Bass
  bassRoots.forEach((f,i)=>this._n(f,i*4*B,B*3.8,'triangle',0.03));
  // Drums — 16 beats
  for(let i=0;i<16;i++){
    if(i%2===0)this._ns(i*B,0.035,0.018,6000);// hi-hat on beats
    if(i%4===0)this._ns(i*B,0.06,0.04,180);// kick on 1
    if(i%4===2)this._ns(i*B,0.04,0.03,3500);// snare on 3
  }
  // Small fills every other loop
  if(iter%2===1){
    this._ns(14.5*B,0.03,0.02,5000);
    this._ns(14.75*B,0.03,0.02,5500);
    this._ns(15*B,0.04,0.025,4000);
  }
  iter++;
  _lp.push(setTimeout(()=>play(),16*B*1000-30));
};play()},

// 4. "Best Friends!" — Cubey Jingle
playCubey(){this.init();this.stop();_ct='cubey';
const B=60/138;let iter=0;
// All phrases end on C (523) for clean loop, [freq, beat, dur]
const melodies=[
  [[523,0,0.5],[523,0.5,0.5],[659,1,0.5],[784,1.5,1],[659,2.5,0.5],[523,3,0.5],
   [587,3.5,0.5],[659,4,1],[587,5,0.5],[523,5.5,0.5],
   [440,6,0.5],[494,6.5,0.5],[523,7,1]],
  [[784,0,0.5],[659,0.5,0.5],[523,1,1],[587,2,0.5],[659,2.5,0.5],
   [784,3,1],[659,4,0.5],[587,4.5,0.5],
   [523,5,0.5],[440,5.5,0.5],[494,6,0.5],[523,6.5,0.5],[523,7,1]],
  [[659,0,0.5],[523,0.5,0.5],[659,1,0.5],[784,1.5,1],[698,2.5,0.5],
   [659,3,0.5],[587,3.5,0.5],[523,4,1],
   [587,5,0.5],[659,5.5,0.5],[587,6,0.5],[523,6.5,0.5],[523,7,1]],
];
const play=()=>{
  if(_ct!=='cubey')return;
  const mel=melodies[iter%3];
  mel.forEach(([f,t,d])=>{this._n(f,t*B,d*B*0.85,'square',0.022);this._n(f*2,t*B,d*B*0.35,'square',0.005)});
  // Bass — always resolves to C
  [[262,0],[220,2],[175,4],[196,6]].forEach(([f,t])=>this._n(f,t*B,B*1.9,'triangle',0.035));
  // Drums
  for(let i=0;i<8;i++){
    this._ns(i*B,0.04,0.025,7000);
    if(i%4===0)this._ns(i*B,0.07,0.05,200);
    if(i%4===2)this._ns(i*B,0.04,0.035,4000);
  }
  // Chord stab on beat 1
  const stabs=[[523,659,784],[440,523,659],[349,440,523]];
  stabs[iter%3].forEach(f=>this._n(f,0,B*0.3,'square',0.01));
  iter++;
  _lp.push(setTimeout(()=>play(),8*B*1000-30));
};play()},

// 5. "12:06 AM" — Corrupted Desktop
playCorrupted(){this.init();this.stop();_ct='corrupted';
const sounds=[
  ()=>{this._n(28+Math.random()*22,0,2.5+Math.random()*4,'sine',0.02+Math.random()*0.01)},// sub
  ()=>{const f=this._pick([262,294,330,349,440,494,523]);this._n(f,0,1.5+Math.random()*2,'sine',0.012);this._n(f*1.012,0.06,1.2,'sine',0.006)},// piano
  ()=>{this._ns(0,0.08+Math.random()*0.15,0.015+Math.random()*0.01,1500+Math.random()*1500)},// static
  ()=>{for(let i=0;i<2+Math.floor(Math.random()*3);i++)this._n(1800+Math.random()*1200,i*0.12,0.02,'square',0.008+Math.random()*0.005)},// HDD
  ()=>{// descending tone
    const o=_a.createOscillator(),g=_a.createGain();o.type='sine';
    o.frequency.setValueAtTime(400+Math.random()*400,_a.currentTime);
    o.frequency.exponentialRampToValueAtTime(40,_a.currentTime+2.5+Math.random()*2);
    g.gain.setValueAtTime(0.008,_a.currentTime);g.gain.exponentialRampToValueAtTime(0.001,_a.currentTime+3);
    o.connect(g);g.connect(_mg);o.start();o.stop(_a.currentTime+3.5);_nd.push(o)},
  ()=>{// whisper-like filtered noise burst
    this._ns(0,0.6+Math.random()*0.8,0.006,800+Math.random()*600)},
  ()=>{// two wrong notes together (dissonant)
    const f=this._pick([262,330,440]);this._n(f,0,2,'sine',0.01);this._n(f*1.06,0.3,1.5,'sine',0.008)},
];
const tick=()=>{
  if(_ct!=='corrupted')return;
  if(Math.random()<0.35)sounds[Math.floor(Math.random()*sounds.length)]();
  _lp.push(setTimeout(tick,6000+Math.random()*20000));
};
_lp.push(setTimeout(tick,4000+Math.random()*8000))},

// 6. "Do Not Play The Demos" — TF2 Crash
playTF2Crash(){this.init();this._ns(0,0.8,0.15,8000);this._ns(0.05,0.6,0.12,12000);for(let i=0;i<20;i++)this._n(2000-i*80,i*0.04,0.08,'sawtooth',0.04);this._n(40,0.1,1.5,'sine',0.08);for(let i=0;i<30;i++)this._ns(0.8+i*0.05,0.02,0.02+Math.random()*0.02,6000);this._n(55,2,4,'sine',0.03)},

// 7. "Where Am I?" — Mike Awakening (76s build)
playAwakening(){this.init();this.stop();_ct='awakening';const dur=76;
const o1=_a.createOscillator(),g1=_a.createGain(),f1=_a.createBiquadFilter();
f1.type='lowpass';f1.frequency.setValueAtTime(80,_a.currentTime);f1.frequency.linearRampToValueAtTime(900,_a.currentTime+dur);
o1.type='sawtooth';o1.frequency.value=55;g1.gain.setValueAtTime(0.001,_a.currentTime);g1.gain.linearRampToValueAtTime(0.035,_a.currentTime+dur);
o1.connect(f1);f1.connect(g1);g1.connect(_mg);o1.start();o1.stop(_a.currentTime+dur+1);_nd.push(o1);
// detuned fifth
const o2=_a.createOscillator(),g2=_a.createGain();o2.type='sine';o2.frequency.value=82.5;
g2.gain.setValueAtTime(0.001,_a.currentTime);g2.gain.linearRampToValueAtTime(0.02,_a.currentTime+dur);
o2.connect(g2);g2.connect(_mg);o2.start();o2.stop(_a.currentTime+dur+1);_nd.push(o2);
// LFO heartbeat that speeds up
const lfo=_a.createOscillator(),lG=_a.createGain(),sub=_a.createOscillator(),sG=_a.createGain();
lfo.frequency.setValueAtTime(0.4,_a.currentTime);lfo.frequency.linearRampToValueAtTime(2.5,_a.currentTime+dur);
lG.gain.value=20;sub.type='sine';sub.frequency.value=38;
sG.gain.setValueAtTime(0.001,_a.currentTime);sG.gain.linearRampToValueAtTime(0.045,_a.currentTime+dur);
lfo.connect(lG);lG.connect(sub.frequency);sub.connect(sG);sG.connect(_mg);
lfo.start();sub.start();lfo.stop(_a.currentTime+dur+1);sub.stop(_a.currentTime+dur+1);_nd.push(lfo,sub);
// memory flickers — different each time
for(let i=0;i<15;i++){const t=8+Math.random()*65,f=600+Math.random()*2400,v=0.002+(t/dur)*0.012;this._n(f,t,0.3+Math.random()*0.8,Math.random()<0.5?'sine':'triangle',v)}
// noise build
this._ns(0,dur*0.4,0.002,80);this._ns(dur*0.25,dur*0.5,0.006,150);this._ns(dur*0.5,dur*0.5,0.012,300);this._ns(dur*0.7,dur*0.3,0.018,500)},

// 8. "root@void" — Puzzle Terminal
playPuzzle(){this.init();this.stop();_ct='puzzle';let intensity=0;
const pulse=()=>{
  if(_ct!=='puzzle')return;
  const bpm=55+intensity*3.5,B=60/bpm;
  // Main pulse — pitch rises with intensity
  this._n(40+intensity*2.5,0,B*0.7,'sine',0.028+intensity*0.0015);
  // Sub
  this._n(28,0,B*0.35,'triangle',0.035);
  // Layer 2 — enters at step 4
  if(intensity>3)this._n(80+intensity*5,B*0.25,B*0.4,'triangle',0.006+intensity*0.001);
  // Layer 3 — enters at step 8
  if(intensity>7){
    this._n(165+intensity*6,0,B*0.2,'sawtooth',0.003+intensity*0.0004);
    if(Math.random()<0.25)this._ns(B*0.5,0.04,0.004+intensity*0.0008,800+intensity*150);
  }
  // Layer 4 — enters at step 13
  if(intensity>12){
    this._n(280+Math.random()*80,0,0.25,'sine',0.005);
    this._n(50,B*0.5,B*0.25,'sine',0.018);
    if(Math.random()<0.15)this._n(this._pick([440,494,523,587]),0,0.15,'triangle',0.004);
  }
  // Layer 5 — final steps
  if(intensity>16){
    this._n(60+Math.random()*20,B*0.75,B*0.2,'sawtooth',0.008);
    this._ns(0,0.03,0.008,2000+intensity*200);
  }
  _lp.push(setTimeout(pulse,B*1000));
};pulse();
window._puzzleStepUp=()=>{intensity=Math.min(19,intensity+1)}},

// 9. "kill_process" — Final Kill Command
playKill(){this.init();this.stop();_ct='kill';
for(let i=0;i<8;i++){this._n(35+i*25,0,4,'sawtooth',0.012);this._n((35+i*25)*1.5,0.5,3,'triangle',0.008)}
for(let i=0;i<30;i++)this._n(38,i*0.13,0.08,'sine',0.055);
const o=_a.createOscillator(),g=_a.createGain(),fl=_a.createBiquadFilter();
o.type='sawtooth';o.frequency.setValueAtTime(50,_a.currentTime);o.frequency.exponentialRampToValueAtTime(2500,_a.currentTime+3.5);
g.gain.setValueAtTime(0.015,_a.currentTime);g.gain.linearRampToValueAtTime(0.05,_a.currentTime+3);g.gain.linearRampToValueAtTime(0,_a.currentTime+4);
fl.type='lowpass';fl.frequency.setValueAtTime(150,_a.currentTime);fl.frequency.exponentialRampToValueAtTime(5000,_a.currentTime+3.5);
o.connect(fl);fl.connect(g);g.connect(_mg);o.start();o.stop(_a.currentTime+4.5);_nd.push(o);
setTimeout(()=>{if(_ct==='kill')this.stop()},4000)},

// 10. "0.0.0.0" — Ending 1
playEnding1(){this.init();this.stop();_ct='ending1';
this._n(36,0,35,'sine',0.035);this._n(54,0,35,'sine',0.018);this._n(36.2,0.5,32,'sine',0.015);
this._ns(0,35,0.008,120);
// Ghost notes — different pitches each time
const pool=[220,262,294,330,349,392,440,494,523];
for(let i=0;i<10;i++){const t=2+i*2.8+Math.random()*2;this._n(this._pick(pool),t,2+Math.random()*2,'sine',0.004+Math.random()*0.006)}
// Breathing
for(let i=0;i<10;i++)this._n(28,i*3,1.8,'sine',0.02);
setTimeout(()=>{if(_ct==='ending1'&&_mg){_mg.gain.setValueAtTime(_mg.gain.value,_a.currentTime);_mg.gain.linearRampToValueAtTime(0,_a.currentTime+10)}},23000)},

// 11. "Again. And Again." — Ending 2
playEnding2(){this.init();this.stop();_ct='ending2';const B=60/72;let iter=0;
const wrongPhrases=[
  [[523,0],[440,1.2],[392,2],[494,2.8],[523,3.8],[659,4.5],[587,6]],
  [[659,0],[523,0.8],[440,1.5],[392,2.5],[349,3.5],[440,4.5],[523,6]],
  [[440,0],[494,0.8],[523,1.8],[392,2.5],[349,3.5],[440,5],[392,6]],
];
const play=()=>{
  if(_ct!=='ending2')return;
  const ph=wrongPhrases[iter%3];
  ph.forEach(([f,t])=>{
    this._n(f*0.98,t*B,B*2.8,'sine',0.022,-12-Math.random()*8);
    this._n(f*0.49,t*B+0.15,B*2,'sine',0.008);
  });
  // Minor pads
  const ch=[[262,311,392],[208,262,311],[175,208,262],[196,247,294]];
  this._pd(ch[(iter)%4],0,B*6,0.01);
  this._pd(ch[(iter+2)%4],7*B,B*6,0.01);
  // Wrong bass
  const bn=[131,104,87,98];
  this._n(bn[iter%4]*0.98,0,B*6,'triangle',0.03,-8);
  this._n(bn[(iter+2)%4]*0.98,7*B,B*6,'triangle',0.03,-8);
  // Crackle
  for(let i=0;i<3+Math.floor(Math.random()*4);i++)this._ns(i*3*B+Math.random()*2,0.04+Math.random()*0.03,0.005,2000+Math.random()*2000);
  iter++;
  _lp.push(setTimeout(()=>play(),14*B*1000));
};play()},

// 12. "Beeper." — Ending 3
playBeeper(){this.init();this.stop();_ct='beeper';this._n(1000,0,1.5,'square',0.1);this._ns(0,0.1,0.08,10000);setTimeout(()=>this.stop(),2000)},
};
window.soosAudio=soosAudio;
