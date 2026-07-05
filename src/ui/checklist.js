// ── 教育コア（したく・親確認・パーツ・完成・ガレージ） ─────────
// index.html(v5) 行3514-3749 からほぼ無改変で移設。state参照をstore経由に変更。
import {STAGES, TASKS, PART_LABELS, ALL_FALSE, SPARKS, BUILDING_EMOJIS} from '../data/stages.js';
import {RESIDENTS} from '../data/residents.js';
import {store, save} from '../store.js';
import {defState, SAVE_KEY, awardStamp} from '../state/state.js';
import {getCarSVG, carLabelHTML, carInlineHTML, ALL_TRUE} from '../assets/cars.js';
import {iconSVG} from '../assets/eventSvg.js';
import {animalSVG} from '../assets/peopleSvg.js';
import {buildingSVG, BUILDING_NAMES} from '../assets/townSvg.js';
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
  speak('スタンプ、ぽん！きょうも がんばったね！'); // 事前生成音声のため固定文言（連続日数は画面に表示）
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

// ── GARAGE（図鑑3タブ: くるま・じゅうにん・たてもの） ──
let _garTab='cars';

export function openGarage(){
  renderGarage();
  showScreen('screen-garage');
}

export function setGarTab(tab){
  _garTab=tab;
  renderGarage();
}

function renderGarage(){
  document.querySelectorAll('.gar-tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===_garTab));
  const grid=document.getElementById('gar-grid');grid.innerHTML='';
  if(_garTab==='cars')renderGarCars(grid);
  else if(_garTab==='residents')renderGarResidents(grid);
  else renderGarBuildings(grid);
}

function renderGarCars(grid){
  const state=store.state;
  document.getElementById('gar-sub').textContent=`くるま ${state.stage} / ${STAGES.length} だい`;
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
}

function renderGarResidents(grid){
  const state=store.state;
  const met=r=>!!(state.residents&&state.residents[r.id]);
  const count=RESIDENTS.filter(met).length;
  document.getElementById('gar-sub').textContent=`ともだち ${count} / ${RESIDENTS.length} にん`;
  RESIDENTS.forEach(r=>{
    const known=met(r);
    const rec=known?state.residents[r.id]:null;
    const cell=document.createElement('div');
    cell.className=`gar-cell owned`;
    if(known){
      cell.innerHTML=`<div class="gar-cell-svg">${animalSVG(r.species,r.c)}</div><span class="cn">${r.name}</span><span class="hearts">${'❤️'.repeat(Math.min(rec.friendship||1,5))}</span>`;
      cell.addEventListener('click',()=>showResidentDetail(r));
    }else{
      cell.innerHTML=`<div class="gar-cell-svg zukan-sil">${animalSVG(r.species,r.c)}</div><span class="cn">？？？</span><span class="hearts">まだあってない</span>`;
    }
    grid.appendChild(cell);
  });
  // 30日streakの特別なともだち（会えた人だけ図鑑に載る）
  if(state.residents&&state.residents.kirari){
    const cell=document.createElement('div');
    cell.className='gar-cell owned';
    cell.style.boxShadow='0 0 0 3px #FFD65C, 0 3px 10px rgba(95,135,161,.12)';
    cell.innerHTML=`<div class="gar-cell-svg">${animalSVG('bird',{fur:'#FFE082',dark:'#F3B94D',shirt:'#FFD65C'})}</div><span class="cn">きらり ⭐</span><span class="hearts">${'❤️'.repeat(Math.min(state.residents.kirari.friendship||1,5))}</span>`;
    grid.appendChild(cell);
  }
}

function renderGarBuildings(grid){
  const state=store.state;
  const built=i=>!!(state.buildings&&state.buildings[i]);
  const count=STAGES.map((_,i)=>i).filter(built).length;
  document.getElementById('gar-sub').textContent=`たてもの ${count} / ${STAGES.length} けん`;
  STAGES.forEach((s,i)=>{
    const has=built(i);
    const cell=document.createElement('div');
    cell.className='gar-cell owned';
    if(has){
      cell.innerHTML=`<div class="gar-cell-svg">${buildingSVG(i)}</div><span class="cn">${BUILDING_NAMES[i]}</span>`;
      cell.addEventListener('click',()=>showBuildingDetail(i));
    }else{
      cell.innerHTML=`<div class="gar-cell-svg zukan-sil">${buildingSVG(i)}</div><span class="cn">？？？</span>`;
    }
    grid.appendChild(cell);
  });
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

function showResidentDetail(r){
  const rec=store.state.residents[r.id]||{friendship:1};
  document.getElementById('cdp-bldg').innerHTML='';
  document.getElementById('cdp-svg').innerHTML=animalSVG(r.species,r.c);
  document.getElementById('cdp-title').textContent=r.name;
  document.getElementById('cdp-body').innerHTML=`${'❤️'.repeat(Math.min(rec.friendship||1,5))}<br>「${r.lines[0]}」`;
  document.getElementById('car-detail-popup').classList.remove('hidden');
  speak(`${r.name}だよ。`);
}

function showBuildingDetail(i){
  const s=STAGES[i];
  document.getElementById('cdp-bldg').innerHTML='';
  document.getElementById('cdp-svg').innerHTML=buildingSVG(i);
  document.getElementById('cdp-title').textContent=BUILDING_NAMES[i];
  document.getElementById('cdp-body').innerHTML=`${carInlineHTML(s)}が つくったよ！`;
  document.getElementById('car-detail-popup').classList.remove('hidden');
  speak(BUILDING_NAMES[i]);
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
