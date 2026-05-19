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

// PC power button click — mechanical transient + low thump
playClick(){this.init();const t=_a.currentTime;const sz=Math.floor(_a.sampleRate*0.018),b=_a.createBuffer(1,sz,_a.sampleRate),da=b.getChannelData(0);for(let i=0;i<sz;i++)da[i]=(Math.random()*2-1)*(1-i/sz);const sr=_a.createBufferSource();sr.buffer=b;const g=_a.createGain(),fl=_a.createBiquadFilter();fl.type='bandpass';fl.frequency.value=1800;fl.Q.value=0.8;g.gain.setValueAtTime(0.6,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.018);sr.connect(fl);fl.connect(g);g.connect(_mg);sr.start(t);sr.stop(t+0.025);const o=_a.createOscillator(),og=_a.createGain();o.type='sine';o.frequency.setValueAtTime(120,t);o.frequency.exponentialRampToValueAtTime(40,t+0.06);og.gain.setValueAtTime(0.35,t);og.gain.exponentialRampToValueAtTime(0.001,t+0.08);o.connect(og);og.connect(_mg);o.start(t);o.stop(t+0.09)},
};
window.soosAudio=soosAudio;
// REMOVED: playCubey (4. "Best Friends!") — Cubey retired
