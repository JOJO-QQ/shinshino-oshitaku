// ── 教育コア（したく・親確認・パーツ・完成・ガレージ） ─────────
// index.html(v5) 行3514-3749 からほぼ無改変で移設。state参照をstore経由に変更。
import {STAGES, TASKS, PART_LABELS, ALL_FALSE, SPARKS, BUILDING_EMOJIS} from '../data/stages.js';
import {store, save} from '../store.js';
import {defState, SAVE_KEY, awardStamp} from '../state/state.js';
import {getCarSVG, carLabelHTML, carInlineHTML, ALL_TRUE} from '../assets/cars.js';
import {iconSVG} from '../assets/eventSvg.js';
import {ensureAudio, speak, soundTask, soundAttach, soundComplete, startReminderLoop, stopReminderLoop, stopFireSound} from '../audio.js';
import {showScreen, showTown} from './overlay.js';

// ── SPARKLES ──
export function burstAt(el){
  const r=el.getBoundingClientRect();
  for(let i=0;i<4;i++){const s=document.createElement('div');s.className='spark';s.textContent=SPARKS[Math.random()*SPARKS.length|0];s.style.cssText=`font-size:${18+Math.random()*10}px;left:${r.left+r.width*Math.random()}px;top:${r.top+r.height*.3}px;`;document.body.appendChild(s);setTimeout(()=>s.remove(),700);}
}
export function randSpark(){
  const s=document.createElement('div');s.className='spark';s.textContent=SPARKS[Math.random()*SPARKS.length|0];
  s.style.cssText=`font-size:${20+Math.random()*13}px;left:${5+Math.random()*90}vw;top:${5+Math.random()*85}vh;`;
  document.body.appendChild(s);setTimeout(()=>s.remove(),700);
}

// ── CHECKLIST ──
export function openChecklist(){
  ensureAudio();
  startReminderLoop();
  const state=store.state;
  const s=STAGES[state.stage];
  document.getElementById('cl-preview').innerHTML=s?`${carInlineHTML(s)}をつくろう！`:'';
  const list=document.getElementById('task-list');list.innerHTML='';
  TASKS.forEach(t=>{
    const done=state.tasks[t.id];
    const partName=s?s.parts[t.partIdx]:PART_LABELS[t.partIdx];
    const item=document.createElement('div');item.className=`task-item${done?' done':''}`;item.id=`ti-${t.id}`;
    item.addEventListener('click',()=>toggleTask(t.id));
    item.innerHTML=`
      <div class="t-emoji">${t.emoji}</div>
      <div style="flex:1">
        <div class="t-name">${t.name}</div>
        <div class="t-part">→ ${partName}</div>
      </div>
      <div class="t-check">${done?'✓':''}</div>`;
    list.appendChild(item);
  });
  syncBtn();showScreen('screen-checklist');
}

export function toggleTask(id){
  ensureAudio();
  const state=store.state;
  state.tasks[id]=!state.tasks[id];save();
  const item=document.getElementById(`ti-${id}`),done=state.tasks[id];
  item.classList.toggle('done',done);item.querySelector('.t-check').textContent=done?'✓':'';
  if(done){
    soundTask();
    burstAt(item);
    const task=TASKS.find(t=>t.id===id);
    if(task)speak(`${task.name}、できたね。`);
  }
  syncBtn();
}

function syncBtn(){
  const state=store.state;
  const allDone=TASKS.every(t=>state.tasks[t.id]);
  document.getElementById('btn-done').disabled=!TASKS.some(t=>state.tasks[t.id]);
  const banner=document.getElementById('bonus-banner');
  banner.classList.toggle('hidden',allDone);
  if(allDone){banner.textContent='⭐ ぜんぶクリア！Special パーツゲット！';banner.classList.remove('hidden');}
  else if(TASKS.some(t=>state.tasks[t.id])){banner.textContent='⭐ ぜんぶできたら Special パーツももらえる！';banner.classList.remove('hidden');}
  else banner.classList.add('hidden');
}

// ── PARENT ──
export function openParent(){
  const state=store.state;
  const s=STAGES[state.stage];
  const allDone=TASKS.every(t=>state.tasks[t.id]);
  const list=document.getElementById('par-list');list.innerHTML='';
  TASKS.forEach(t=>{
    const done=state.tasks[t.id];
    const partName=s?s.parts[t.partIdx]:PART_LABELS[t.partIdx];
    const row=document.createElement('div');row.className='par-row';
    row.innerHTML=`
      <span style="font-size:30px">${t.emoji}</span>
      <div class="par-lbl">${t.name}<div class="par-part">→ ${done?partName:'（まだ）'}</div></div>
      <span style="font-size:26px">${done?'✅':'⬜'}</span>`;
    list.appendChild(row);
  });
  const bonus=document.getElementById('par-bonus');
  if(allDone){bonus.classList.remove('hidden');bonus.textContent='⭐ ぜんぶできた！Special パーツボーナス！';}
  else bonus.classList.add('hidden');
  showScreen('screen-parent');
}

// ── APPROVE & PARTS ──
let _q=[],_willComplete=false;

// がんばりカード（スタンプ）: approve成功時に月間カレンダーへポン！
function showStampCard(proceed){
  const st=store.state.stamps;
  const popup=document.getElementById('stamp-popup');
  if(!popup||!st){proceed();return;}
  const now=new Date();
  const daysInMonth=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
  const grid=document.getElementById('stamp-grid');
  grid.innerHTML='';
  for(let d=1;d<=daysInMonth;d++){
    const cell=document.createElement('div');
    const stamped=st.days.includes(d);
    cell.className=`stamp-cell${stamped?(d===now.getDate()?' on today':' on'):''}`;
    cell.textContent=stamped?'⭐':String(d);
    grid.appendChild(cell);
  }
  document.getElementById('stamp-streak').textContent=`れんぞく ${st.streak}にち！`;
  const MILESTONES=[[3,'ひろばに ふうせん'],[7,'ひろばに にじ'],[14,'きんの ふんすい'],[30,'とくべつな ともだち']];
  const next=MILESTONES.find(m=>st.streak<m[0]);
  document.getElementById('stamp-reward').textContent=
    next?`あと${next[0]-st.streak}にちで ${next[1]}！`:'まちが キラキラだね！';
  popup.classList.remove('hidden');
  soundComplete();
  speak(`スタンプ、ぽん！れんぞく${st.streak}にちだよ。`);
  setTimeout(()=>{popup.classList.add('hidden');proceed();},3000);
}

export function approve(){
  ensureAudio();
  stopReminderLoop();
  const state=store.state;
  state.approvedToday=true;
  const stamped=awardStamp(state);
  const finish=fn=>{save();if(stamped)showStampCard(fn);else fn();};
  if(state.stage>=STAGES.length){finish(showTown);return;}

  const s=STAGES[state.stage];
  const prevEarned=[...state.earnedParts];
  const newPis=[];

  TASKS.forEach(t=>{
    if(state.tasks[t.id]&&!prevEarned[t.partIdx]){
      newPis.push(t.partIdx);
    }
  });

  if(!newPis.length){finish(showTown);return;}

  const newEarned=[...prevEarned];
  newPis.forEach(pi=>newEarned[pi]=true);

  if(newEarned.slice(0,4).every(v=>v)&&!newEarned[4]){
    newEarned[4]=true;newPis.push(4);
  }

  newPis.sort((a,b)=>a-b);
  const willComplete=newEarned.every(v=>v);

  state.earnedParts=willComplete?[...ALL_FALSE]:newEarned;
  if(willComplete){state.pendingEvent=state.stage;state.stage=Math.min(state.stage+1,STAGES.length);}
  save();

  let dotsAcc=[...prevEarned];
  _q=newPis.map(pi=>{
    dotsAcc=[...dotsAcc];dotsAcc[pi]=true;
    return{id:s.id,name:s.parts[pi],idx:pi,dots:[...dotsAcc],color:s.color,isSpecial:pi===4};
  });
  _willComplete=willComplete;
  finish(nextPart);
}

function nextPart(){
  if(!_q.length){
    if(_willComplete){_willComplete=false;showComplete(STAGES[store.state.stage-1]);}
    else showTown();return;
  }
  const p=_q.shift();
  soundAttach();
  document.getElementById('pg-svg').innerHTML=getCarSVG(p.id,p.dots,p.idx);

  const label=document.getElementById('pg-label');
  const nameEl=document.getElementById('pg-name');
  if(p.isSpecial){
    label.textContent='⭐ スペシャル パーツゲット！';
    nameEl.className='pg-special fadeup';
    nameEl.textContent=p.name;
  }else{
    label.textContent='パーツゲット！';
    nameEl.className='pg-name fadeup';
    nameEl.textContent=p.name;
  }

  const dots=document.getElementById('pg-dots');dots.innerHTML='';
  for(let i=0;i<5;i++){
    const d=document.createElement('div');
    const isBonus=i===4;
    d.className=`pg-dot${p.dots[i]?(isBonus?' bonus':' on'):''}`;
    if(p.dots[i])d.style.background=isBonus?'#FFD700':p.color;
    dots.appendChild(d);
  }

  document.querySelectorAll('#screen-part-gain .fadeup').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation='';});
  showScreen('screen-part-gain');

  const delay=p.isSpecial?2200:1500;
  setTimeout(nextPart,delay);
}

// ── CAR COMPLETE ──
function showComplete(s){
  soundComplete();
  speak(`${s.name}、かんせい。やったね。`);
  document.getElementById('cc-svg').innerHTML=getCarSVG(s.id,ALL_TRUE);
  document.getElementById('cc-title').textContent=`${s.name} かんせい！`;
  showScreen('screen-car-complete');
  for(let i=0;i<22;i++)setTimeout(randSpark,i*65);
}

// ── GARAGE ──
export function openGarage(){
  const state=store.state;
  document.getElementById('gar-sub').textContent=`${state.stage} / ${STAGES.length} だいしゅうしゅう！`;
  const grid=document.getElementById('gar-grid');grid.innerHTML='';
  STAGES.forEach((s,i)=>{
    const owned=i<state.stage;
    const cell=document.createElement('div');cell.className=`gar-cell ${owned?'owned':'locked'}`;
    if(owned){
      const hasBldg=state.buildings&&state.buildings[i];
      const bldgEmoji=hasBldg?(BUILDING_EMOJIS[i]||'🏠'):'🚧';
      cell.innerHTML=`<div class="gar-cell-svg">${getCarSVG(s.id,ALL_TRUE)}</div><span class="cn">${s.name}</span><span class="bldg">${iconSVG(bldgEmoji,'bldg-icon')}</span>`;
      cell.addEventListener('click',()=>showCarDetail(i));
    }else{
      cell.innerHTML=`<span class="ce">❓</span><span class="cn">???</span>`;
    }
    grid.appendChild(cell);
  });
  showScreen('screen-garage');
}

function showCarDetail(i){
  const state=store.state;
  const s=STAGES[i];
  const hasBldg=state.buildings&&state.buildings[i];
  const bldg=hasBldg?(BUILDING_EMOJIS[i]||'🏠'):'🚧';
  document.getElementById('cdp-bldg').innerHTML=iconSVG(bldg,'popup-svg-wrap');
  document.getElementById('cdp-svg').innerHTML=getCarSVG(s.id,ALL_TRUE);
  document.getElementById('cdp-title').innerHTML=`${carInlineHTML(s)} かんせい！`;
  document.getElementById('cdp-body').textContent=hasBldg?'このくるまが まちにたてものをつくった！':'イベントをクリアすると まちにたてものができるよ！';
  document.getElementById('car-detail-popup').classList.remove('hidden');
}

// ── RESET ──
// v6キーのみ削除する。kuruma-v5キーはlegacy版の保険なので消さない。
let _rt=null;
export function startReset(){
  const bar=document.getElementById('reset-bar');bar.classList.add('go');
  _rt=setTimeout(()=>{
    bar.classList.remove('go');
    if(!confirm('さいしょからやりなおしますか？'))return;
    stopReminderLoop();stopFireSound();
    localStorage.removeItem(SAVE_KEY);store.state=defState();save();showTown();
  },3000);
}
export function cancelReset(){
  clearTimeout(_rt);_rt=null;
  const bar=document.getElementById('reset-bar');bar.style.transition='none';bar.classList.remove('go');
  requestAnimationFrame(()=>bar.style.transition='');
}

// ── TEST HELPERS ──
export function testNextDay(){
  const state=store.state;
  state.approvedToday=false;
  state.tasks=Object.fromEntries(TASKS.map(t=>[t.id,false]));
  save();startReminderLoop();openGarage();
}
export function testSkipCar(){
  const state=store.state;
  if(state.stage>=STAGES.length){alert('もう全部クリア！');return;}
  state.pendingEvent=state.stage;state.earnedParts=[...ALL_FALSE];
  state.stage=Math.min(state.stage+1,STAGES.length);
  save();showTown();
}
