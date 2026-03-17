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
const B=60/108;let iteration=0;
// 4 different melody phrases that rotate
const phrases=[
  [[523,0],[494,0.75],[523,1],[659,1.5],[587,2.5],[523,3],[494,3.5],[440,4],[440,5],[523,5.5],[587,6],[659,7],[698,7.5],[659,8]],
  [[659,0],[587,0.5],[523,1],[494,1.5],[440,2],[392,3],[440,3.5],[494,4],[523,5],[587,5.5],[659,6],[784,7],[659,7.5],[523,8]],
  [[784,0],[698,0.5],[659,1],[587,1.5],[523,2],[587,2.5],[659,3],[523,4],[440,5],[494,5.5],[523,6],[587,6.5],[523,7],[494,8]],
  [[440,0],[494,0.5],[523,1],[587,1.5],[659,2],[587,2.5],[523,3],[440,4],[392,5],[440,5.5],[523,6],[659,7],[587,7.5],[523,8]],
];
const chordSets=[
  [[262,330,392],[220,262,330],[175,220,262],[196,247,294]],
  [[220,262,330],[175,220,262],[196,247,294],[262,330,392]],
];
const bassNotes=[[131,110,87,98],[110,87,98,131],[87,98,131,110]];
const play=()=>{
  if(_ct!=='menu')return;
  const ph1=phrases[iteration%4];
  const ph2=phrases[(iteration+1)%4];
  // Phrase 1
  ph1.forEach(([f,t])=>{this._n(f,t*B,B*1.8,'sine',0.04);this._n(f*2,t*B+0.05,B*1,'sine',0.009)});
  // Phrase 2 offset
  ph2.forEach(([f,t])=>{this._n(f,(t+9)*B,B*1.8,'sine',0.04);this._n(f*2,(t+9)*B+0.05,B*1,'sine',0.009)});
  // Chords
  const chs=chordSets[iteration%2];
  for(let i=0;i<4;i++)this._pd(chs[i],i*4.5*B,B*4,'sine',0.016);
  // Bass
  const bn=bassNotes[iteration%3];
  bn.forEach((f,i)=>this._n(f,i*4.5*B,B*4,'triangle',0.045));
  // Twinkle — randomized
  for(let i=0;i<4;i++){const f=this._pick([1047,1175,1319,1397,1568,1760]);this._n(f,(3+i*4)*B,B*2,'sine',0.007)}
  // Soft pulse
  for(let i=0;i<9;i++){this._n(65,i*2*B,0.15,'sine',0.025);this._n(55,(i*2+1)*B,0.1,'sine',0.015)}
  iteration++;
  _lp.push(setTimeout(()=>play(),18*B*1000-150));
};play()},

// 2. "Dell XPS 420" — Boot Chime
playBoot(){this.init();this._n(1000,0,0.1,'square',0.08);this._n(440,0.5,0.3,'sine',0.06);this._n(554,0.8,0.3,'sine',0.06);this._n(659,1.1,0.3,'sine',0.06);this._n(880,1.4,0.6,'sine',0.07);this._n(880*2,1.5,0.8,'sine',0.02);this._n(880*1.5,1.6,0.5,'sine',0.015);this._pd([440,554,659],0.5,2,0.01)},

// 3. "His Room" — Normal Desktop Ambient
playDesktop(){this.init();this.stop();_ct='desktop';
const play=()=>{
  if(_ct!=='desktop')return;
  // Fan — varies slightly each loop
  const fanFreq=58+Math.random()*4;
  this._ns(0,25,0.006+Math.random()*0.003,180+Math.random()*40);
  this._n(fanFreq,0,25,'sine',0.005);
  this._n(fanFreq*2,0,25,'sine',0.002);
  // HDD — random count and timing
  const clicks=2+Math.floor(Math.random()*5);
  for(let i=0;i<clicks;i++){
    const t=1+Math.random()*22;
    this._n(2200+Math.random()*600,t,0.02,'square',0.01+Math.random()*0.008);
    if(Math.random()<0.5)this._n(1600+Math.random()*400,t+0.03,0.015,'square',0.008);
  }
  // Room sounds — very rare
  if(Math.random()<0.15)this._ns(8+Math.random()*12,0.4,0.004,120);// creak
  if(Math.random()<0.1){// distant car or something outside
    const t=5+Math.random()*15;
    this._ns(t,2,0.002,80);
  }
  _lp.push(setTimeout(()=>play(),24000));
};play()},

// 4. "Best Friends!" — Cubey Jingle
playCubey(){this.init();this.stop();_ct='cubey';
const B=60/140;let iter=0;
const melodies=[
  [[523,0],[523,0.5],[659,1],[784,1.5],[659,2],[523,2.5],[587,3],[659,3.5],[587,4],[523,4.5],[440,5],[523,5.5],[659,6],[784,6.5],[880,7],[784,7.5]],
  [[880,0],[784,0.5],[659,1],[523,1.5],[587,2],[659,2.5],[784,3],[659,3.5],[523,4],[440,4.5],[523,5],[587,5.5],[659,6],[523,6.5],[440,7],[523,7.5]],
  [[659,0],[523,0.25],[659,0.5],[784,1],[698,1.5],[659,2],[587,2.5],[523,3],[587,3.5],[659,4],[784,4.5],[880,5],[784,5.5],[659,6],[523,6.5],[659,7]],
];
const play=()=>{
  if(_ct!=='cubey')return;
  const mel=melodies[iter%3];
  mel.forEach(([f,t])=>{this._n(f,t*B,B*0.7,'square',0.022);this._n(f*2,t*B,B*0.3,'square',0.005)});
  // Bass varies
  const basses=[[262,220,175,196],[220,175,196,262],[175,196,262,220]];
  basses[iter%3].forEach((f,i)=>this._n(f,i*2*B,B*1.8,'triangle',0.035));
  // Drums — slight variation
  for(let i=0;i<8;i++){
    this._ns(i*B,0.04,0.025,7000+Math.random()*2000);
    if(i%4===0)this._ns(i*B,0.07,0.05,200);
    if(i%4===2)this._ns(i*B,0.04,0.035,4000+Math.random()*2000);
    if(i%2===1&&Math.random()<0.3)this._ns(i*B+B*0.5,0.03,0.015,9000);// ghost hi-hat
  }
  // Chord stab — rotates
  const chStabs=[[[523,659,784]],[[440,523,659]],[[349,440,523]],[[392,494,587]]];
  const cs=chStabs[(iter*2)%4][0];
  cs.forEach(f=>this._n(f,(iter%2===0?0:4)*B,B*0.25,'square',0.01));
  iter++;
  _lp.push(setTimeout(()=>play(),8*B*1000-50));
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
