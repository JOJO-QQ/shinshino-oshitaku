// ── AUDIO（WebAudio合成音 + SpeechSynthesis） ─────────────────
// index.html(v5) 行691-790 から移設。グローバルstate参照をstore経由に変更。
import {TASKS} from './data/stages.js';
import {store} from './store.js';

const REMINDER_TEXT={
  breakfast:'あさごはん、たべたかな？',
  dress:'きがえは、おわったかな？',
  teeth:'はみがきも、したかな？',
  bag:'にもつのじゅんびは、おわったかな？'
};

let audioCtx=null, audioReady=false, soundUnlocked=false, fireSoundTimer=null, reminderTimer=null, eventHintTimer=null, lastReminderIdx=0;

// ── 事前生成音声（edge-tts / tools/gen_voices.mjs で作成） ──
// manifest.json: {セリフ: mp3ファイル名}。ある場合は自然音声を再生、
// ない場合・再生できない場合は SpeechSynthesis にフォールバック。
let voiceMap=null, currentVoice=null;
const voiceCache=new Map();
fetch('audio/manifest.json').then(r=>r.ok?r.json():null).then(m=>{voiceMap=m;}).catch(()=>{});
function stopVoice(){
  if(currentVoice){try{currentVoice.pause();currentVoice.currentTime=0;}catch{}currentVoice=null;}
  try{if('speechSynthesis' in window)speechSynthesis.cancel();}catch{}
}
function playVoiceFile(text){
  if(!voiceMap||!voiceMap[text])return false;
  try{
    let a=voiceCache.get(text);
    if(!a){a=new Audio('audio/'+voiceMap[text]);a.preload='auto';voiceCache.set(text,a);}
    stopVoice();
    a.currentTime=0;
    const p=a.play();
    if(p&&p.catch)p.catch(()=>{speakSynth(text);}); // 自動再生ブロック時は合成音声で代替
    currentVoice=a;
    soundUnlocked=true;updateSoundButton();
    return true;
  }catch{return false;}
}
function updateSoundButton(){
  const btn=document.getElementById('sound-unlock');
  if(!btn)return;
  btn.classList.toggle('show',!soundUnlocked);
}
async function ensureAudio(){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;
    if(AC&&!audioCtx)audioCtx=new AC();
    if(audioCtx&&audioCtx.state==='suspended')await audioCtx.resume();
    audioReady=!!audioCtx&&audioCtx.state==='running';
    soundUnlocked=audioReady||soundUnlocked;
    updateSoundButton();
  }catch{}
}
async function unlockSound(){
  await ensureAudio();
  soundPrep();
  speak('おとがでるよ。');
  soundUnlocked=true;
  updateSoundButton();
}
function speak(text){
  ensureAudio();
  if(playVoiceFile(text))return;   // 自然音声があればそちらを使う
  speakSynth(text);
}
function speakSynth(text){
  try{
    if(!('speechSynthesis' in window))return;
    const u=new SpeechSynthesisUtterance(text);
    u.lang='ja-JP';u.rate=.88;u.pitch=1.22;u.volume=.95;
    let voices=speechSynthesis.getVoices();
    const v=voices.find(x=>/ja|Japan|日本/i.test(x.lang+x.name));
    if(v)u.voice=v;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    soundUnlocked=true;updateSoundButton();
    if(!voices.length)setTimeout(()=>{try{speechSynthesis.getVoices();}catch{}},250);
  }catch{}
}
function tone(freq,dur=.18,type='sine',vol=.16,delay=0){
  if(!audioCtx)return;
  const t=audioCtx.currentTime+delay;
  const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
  osc.type=type;osc.frequency.setValueAtTime(freq,t);
  gain.gain.setValueAtTime(0,t);
  gain.gain.linearRampToValueAtTime(vol,t+.012);
  gain.gain.exponentialRampToValueAtTime(.001,t+dur);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(t);osc.stop(t+dur+.03);
}
function noiseBurst(dur=.3,vol=.12,delay=0,filterFreq=900){
  if(!audioCtx)return;
  const t=audioCtx.currentTime+delay;
  const len=Math.max(1,Math.floor(audioCtx.sampleRate*dur));
  const buf=audioCtx.createBuffer(1,len,audioCtx.sampleRate);
  const data=buf.getChannelData(0);
  for(let i=0;i<len;i++)data[i]=(Math.random()*2-1)*(1-i/len);
  const src=audioCtx.createBufferSource(),gain=audioCtx.createGain(),filter=audioCtx.createBiquadFilter();
  filter.type='bandpass';filter.frequency.setValueAtTime(filterFreq,t);filter.Q.value=.9;
  gain.gain.setValueAtTime(vol,t);gain.gain.exponentialRampToValueAtTime(.001,t+dur);
  src.buffer=buf;src.connect(filter).connect(gain).connect(audioCtx.destination);
  src.start(t);src.stop(t+dur+.02);
}
function soundPrep(){ensureAudio();tone(523,.12,'triangle',.12);tone(659,.12,'triangle',.12,.11);tone(784,.18,'triangle',.13,.22);}
function soundTask(){ensureAudio();tone(740,.09,'square',.08);tone(980,.13,'triangle',.1,.08);}
function soundAttach(){ensureAudio();tone(185,.18,'sawtooth',.12);tone(370,.14,'square',.11,.08);tone(740,.24,'triangle',.14,.19);noiseBurst(.16,.08,.08,2600);}
function soundComplete(){ensureAudio();[523,659,784,1046].forEach((f,i)=>tone(f,.18,'triangle',.14,i*.11));}
function soundSiren(){
  ensureAudio();
  for(let i=0;i<8;i++){tone(i%2?880:520,.18,'sawtooth',.09,i*.18);}
}
function soundWater(){ensureAudio();for(let i=0;i<8;i++)noiseBurst(.24,.09,i*.08,1200+i*110);}
function startFireSound(){
  ensureAudio();stopFireSound();
  const crackle=()=>{noiseBurst(.18,.055,0,2600+Math.random()*900);if(Math.random()>.45)tone(90+Math.random()*45,.08,'sawtooth',.035);};
  crackle();fireSoundTimer=setInterval(crackle,240);
}
function stopFireSound(){if(fireSoundTimer){clearInterval(fireSoundTimer);fireSoundTimer=null;}}
function nextReminderText(){
  const pending=TASKS.filter(t=>!store.state.tasks[t.id]);
  if(!pending.length)return '';
  const t=pending[lastReminderIdx%pending.length];
  lastReminderIdx++;
  return REMINDER_TEXT[t.id]||`${t.name}は、おわったかな？`;
}
function startReminderLoop(){
  if(reminderTimer)return;
  reminderTimer=setInterval(()=>{
    if(store.state.approvedToday||TASKS.every(t=>store.state.tasks[t.id]))return;
    const text=nextReminderText();
    if(text)speak(text);
  },5*60*1000);
}
function stopReminderLoop(){if(reminderTimer){clearInterval(reminderTimer);reminderTimer=null;}}

export {REMINDER_TEXT, updateSoundButton, ensureAudio, unlockSound, speak, tone, noiseBurst,
  soundPrep, soundTask, soundAttach, soundComplete, soundSiren, soundWater,
  startFireSound, stopFireSound, nextReminderText, startReminderLoop, stopReminderLoop};
