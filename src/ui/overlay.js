// ── DOM⇔Phaser ブリッジ ───────────────────────────────────────
// トップバー・イベントガイド・課題ポップアップなどDOM側UIの制御。
// index.html(v5) 行2369/2582-2683/2772-2828/2235-2276/2356-2366 から移設・適応。
import {STAGES, stageIndexById} from '../data/stages.js';
import {store, save} from '../store.js';
import {dateString, encodeStateForUrl} from '../state/state.js';
import {hasVehicle} from '../state/townIssues.js';
import {getCarSVG, carLabelHTML, ALL_TRUE} from '../assets/cars.js';
import {eventSVG, iconSVG} from '../assets/eventSvg.js';
import {ensureAudio, speak, soundPrep, updateSoundButton, startFireSound} from '../audio.js';
import {openChecklist} from './checklist.js';

let eventHintTimer=null;
export function stopEventHintTimer(){if(eventHintTimer){clearTimeout(eventHintTimer);eventHintTimer=null;}}

// ── 画面切替（Phaser側のpause/resume込み） ──
// マップを隠すと親要素が0pxになり、RESIZEモードがキャンバスを0×0にして
// WebGLフレームバッファが壊れる。隠す前にゲームループを止め、
// 戻ったときに親サイズ確定後（rAF）へrefreshしてから再開する。
export function showScreen(id){
  const town=store.townScene;
  const game=store.game;
  const leavingMap=id!=='screen-map';
  if(town&&game&&leavingMap){
    try{
      if(town.scene.isActive()){town.saveCamera();town.scene.pause();}
      game.loop.sleep();
    }catch{}
  }
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
  if(town&&game&&!leavingMap){
    requestAnimationFrame(()=>{
      try{
        game.scale.refresh();
        game.loop.wake();
        if(town.scene.isPaused())town.scene.resume();
      }catch{}
    });
  }
}

export function showTown(){
  showScreen('screen-map');
  if(store.townScene)store.townScene.refreshTown();
  else updateTopbar();
}

// ── トップバー（v5 updateTopbar とほぼ同一） ──
export function updateTopbar(){
  updateSoundButton();
  const state=store.state;
  const s=STAGES[state.stage];
  if(!s){
    document.getElementById('tb-car').innerHTML=`${iconSVG('✅','tb-car-icon')}<span>ぜんぶクリア！</span>`;
    document.getElementById('tb-pts').textContent='20だい ぜんしゅうしゅう！';
    const btn=document.getElementById('hero-btn');btn.className='hero-btn done';btn.innerHTML=`${iconSVG('✅','btn-icon')}ぜんぶおわり！`;updateEventGuide();renderNearbyCards();return;
  }
  const earned=state.earnedParts.filter(v=>v).length;
  document.getElementById('tb-car').innerHTML=carLabelHTML(s);
  document.getElementById('tb-pts').textContent=`${earned}/5 パーツ`;
  const btn=document.getElementById('hero-btn');
  if(state.pendingEvent>=0){
    btn.className='hero-btn red';btn.innerHTML=`${iconSVG('🔥','btn-icon')}イベントはっせい！マップをみて！`;
  }else if(state.approvedToday){
    btn.className='hero-btn done';btn.innerHTML=`${iconSVG('✅','btn-icon')}きょうはおわり！`;
  }else{
    btn.className='hero-btn orange';btn.innerHTML=`${iconSVG('✅','btn-icon')}きょうのしたく`;
  }
  updateEventGuide();
  renderNearbyCards();

  const preview=document.getElementById('map-parts-preview');
  const carSvgEl=document.getElementById('map-car-svg');
  const carNameEl=document.getElementById('parts-car-name');
  const dotsRow=document.getElementById('parts-dots-row');
  preview.style.display='flex';
  carSvgEl.innerHTML=getCarSVG(s.id,state.earnedParts);
  carNameEl.textContent=s.name;
  dotsRow.innerHTML='';
  for(let i=0;i<5;i++){
    const d=document.createElement('div');
    d.className=`pd-dot${state.earnedParts[i]?(i===4?' bonus':' on'):''}`;
    dotsRow.appendChild(d);
  }
}

// ── ヒーローボタン ──
export function heroAction(){
  ensureAudio();
  const state=store.state;
  if(state.pendingEvent>=0){
    speak('たいへん、イベントがはっせいしたよ。マップのマークをタップして、たすけにいこう。');
    if(STAGES[state.pendingEvent]?.ev?.e==='🔥')startFireSound();
    const town=store.townScene,m=town?.eventMarker;
    if(town&&m){
      town.cameras.main.pan(m.x,m.y,800,'Sine.easeInOut');
      town.tweens.add({targets:m,scale:m.scale*1.4,duration:250,yoyo:true});
    }
  }else if(!state.approvedToday){
    soundPrep();
    speak('きょうのしたくをはじめよう。できたものを、ぽんっとおしてね。');
    openChecklist();
  }
}

// ── イベントガイドカード（v5と同一） ──
function eventGuideInfo(stageIdx){
  const s=STAGES[stageIdx];
  if(!s)return{icon:'👆',title:'ここをタップ！',body:'ひかっているマークをおしてね',voice:'ひかっているマークをタップしてね。'};
  const map={
    fire:{title:'ひをけそう！',body:'ひかっている ひ をタップ',voice:'ひかっている、ひをタップしてね。'},
    police:{title:'どろぼうをさがそう！',body:'ひかっているマークをタップ',voice:'どろぼうのマークをタップしてね。'},
    ambu:{title:'けがをたすけよう！',body:'ひかっているマークをタップ',voice:'けがをしたひとのマークをタップしてね。'},
    taxi:{title:'おきゃくさんをのせよう！',body:'ひかっているマークをタップ',voice:'おきゃくさんのマークをタップしてね。'}
  };
  const info=map[s.id]||{title:'まちをたすけよう！',body:'ひかっているマークをタップ',voice:'ひかっているマークをタップしてね。'};
  return{icon:s.ev.e,title:info.title,body:info.body,voice:info.voice};
}

export function updateEventGuide(){
  const card=document.getElementById('event-guide-card');
  if(!card)return;
  stopEventHintTimer();
  const state=store.state;
  if(state.pendingEvent<0||state.stage>=STAGES.length){
    card.classList.add('hidden');
    card.classList.remove('show');
    return;
  }
  const info=eventGuideInfo(state.pendingEvent);
  document.getElementById('event-guide-icon').innerHTML=eventSVG(info.icon,'event-guide-svg');
  document.getElementById('event-guide-title').textContent=info.title;
  document.getElementById('event-guide-body').textContent=info.body;
  card.classList.remove('hidden');
  card.classList.add('show');
  eventHintTimer=setTimeout(()=>{
    if(store.state.pendingEvent>=0)speak(info.voice);
  },5000);
}

// ── 街の課題（v5 2570-2638 とほぼ同一） ──
export function townIssueMeta(issue){
  if(issue.type==='burned-house'&&issue.state==='burned')return{icon:'🏚️',label:'あとでなおす',title:'もえたおうちが<br>まだのこっているよ'};
  if(issue.type==='burned-house'&&issue.state==='constructing')return{icon:'🚧',label:'こうじちゅう',title:'おうちを<br>なおしているよ'};
  if(issue.type==='police-risk'&&issue.state==='risk')return{icon:'🦹',label:'またでるかも',title:'どろぼうが<br>またくるかも'};
  if(issue.type==='police-risk'&&issue.state==='lot')return{icon:'🚧',label:'よていち',title:'けいさつしょの<br>じゅんびちゅう'};
  if(issue.type==='police-risk'&&issue.state==='constructing')return{icon:'🚧',label:'こうじちゅう',title:'けいさつしょを<br>つくっているよ'};
  if(issue.type==='police-station'&&issue.state==='built')return{icon:'🏢',label:'けいさつ',title:'けいさつしょ<br>かんせい！'};
  if(issue.type==='hospital-needed')return{icon:'🤕',label:'びょういんがいる',title:'びょういんが<br>まだないよ'};
  if(issue.type==='transit-needed')return{icon:'🎯',label:'のりばがいる',title:'のりばが<br>まだないよ'};
  return null;
}

export function issueReadyToBuild(issue){
  const s=store.state;
  return(issue.type==='burned-house'&&issue.state==='burned'&&issue.requiredVehicle==='excav'&&hasVehicle(s,'excav'))||
    (issue.type==='police-risk'&&issue.state==='risk'&&hasVehicle(s,'bull'))||
    (issue.type==='police-risk'&&issue.state==='lot'&&hasVehicle(s,'crane'));
}

export function showTownIssuePopup(issueId){
  const state=store.state;
  const issue=(state.townIssues||[]).find(x=>x.id===issueId);
  if(!issue)return;
  const meta=townIssueMeta(issue)||{icon:'❓',title:'まだなにか<br>ありそう'};
  document.getElementById('pp-obstacle').innerHTML=eventSVG(meta.icon,'popup-svg-wrap');
  const canRepair=issue.type==='burned-house'&&issue.state==='burned'&&issue.requiredVehicle==='excav'&&hasVehicle(state,'excav');
  const canBuildPolice=issue.type==='police-risk'&&((issue.state==='risk'&&hasVehicle(state,'bull'))||(issue.state==='lot'&&hasVehicle(state,'crane')));
  document.getElementById('pp-title').innerHTML=(canRepair||canBuildPolice)?'こうじを<br>はじめよう！':meta.title;
  document.getElementById('pp-body').innerHTML=townIssueBody(issue,canRepair);
  document.getElementById('pp-progress').innerHTML=canRepair
    ?`<button class="btn btn-orange" onclick="repairTownIssue('${issue.id}')">こうじスタート！</button>`
    :(canBuildPolice?`<button class="btn btn-orange" onclick="startPoliceConstruction('${issue.id}')">こうじスタート！</button>`:'');
  document.getElementById('preview-popup').classList.remove('hidden');
}

function townIssueBody(issue,canRepair){
  const s=store.state;
  if(canRepair)return'しょべるかーをゲットしたね！<br>こうじをはじめよう。';
  if(issue.type==='police-risk'&&issue.state==='risk'&&hasVehicle(s,'bull'))return'ぶるどーざーをゲットしたね！<br>けいさつしょのばしょを<br>つくりはじめよう。';
  if(issue.type==='police-risk'&&issue.state==='lot'&&hasVehicle(s,'crane'))return'くれーんしゃをゲットしたね！<br>けいさつしょを<br>たてはじめよう。';
  if(issue.type==='burned-house'&&issue.state==='constructing')return'しょべるかーがこうじしているよ。<br><strong style="color:#FFE66D">あした</strong>になったら<br>おうちができるよ。';
  if(issue.type==='burned-house')return'しょうぼうしゃがひをけしてくれたね！<br>でも、こわれたおうちは<br><strong style="color:#FFE66D">しょべるかー</strong>がきたらかたづけられるよ。';
  if(issue.type==='police-risk'&&issue.state==='risk')return'ぱとかーがどろぼうをおいはらったよ。<br>でも、けいさつしょがないから<br><strong style="color:#FFE66D">ぶるどーざー</strong>がきたらばしょをつくろう。';
  if(issue.type==='police-risk'&&issue.state==='lot')return'けいさつしょのばしょができたよ。<br>つぎは<strong style="color:#FFE66D">くれーんしゃ</strong>で<br>けいさつしょをたてよう。';
  if(issue.type==='police-risk'&&issue.state==='constructing')return'こうじをしているよ。<br><strong style="color:#FFE66D">あした</strong>になったら<br>つぎにすすむよ。';
  if(issue.type==='police-station')return'けいさつしょができたよ！<br>これでどろぼうがきても<br>まちをまもれるね。';
  if(issue.type==='hospital-needed')return'きゅうきゅうしゃがたすけてくれたね。<br>でも、まちにはまだ<br><strong style="color:#FFE66D">びょういん</strong>がひつようだよ。';
  if(issue.type==='transit-needed')return'たくしーがおくってくれたね。<br>でも、みんながまよわないように<br><strong style="color:#FFE66D">のりば</strong>がほしいね。';
  return'あとでべつのくるまがきたら<br>なにかできるかもしれないよ。';
}

export function issueNeedText(issue){
  const s=store.state;
  if(issue.type==='burned-house'&&issue.state==='burned')return hasVehicle(s,'excav')?'こうじできる！':'しょべるかー';
  if(issue.type==='burned-house'&&issue.state==='constructing')return'あした';
  if(issue.type==='police-risk'&&issue.state==='risk')return hasVehicle(s,'bull')?'こうじできる！':'ぶるどーざー';
  if(issue.type==='police-risk'&&issue.state==='lot')return hasVehicle(s,'crane')?'たてられる！':'くれーんしゃ';
  if(issue.type==='police-risk'&&issue.state==='constructing')return'あした';
  if(issue.type==='police-station')return'かんせい';
  if(issue.type==='hospital-needed')return'びょういん';
  if(issue.type==='transit-needed')return'のりば';
  return'あとで';
}

export function renderNearbyCards(){
  const panel=document.getElementById('nearby-panel'),list=document.getElementById('nearby-list');
  if(!panel||!list)return;
  const issues=(store.state.townIssues||[]).map(issue=>({issue,meta:townIssueMeta(issue)})).filter(x=>x.meta);
  if(!issues.length){panel.classList.add('hidden');list.innerHTML='';return;}
  panel.classList.remove('hidden');
  list.innerHTML='';
  issues.slice(0,6).forEach(({issue,meta})=>{
    const btn=document.createElement('button');
    btn.className='nearby-card';
    btn.innerHTML=`${iconSVG(meta.icon,'nearby-card-icon')}<span class="nearby-card-label">${meta.label}</span><span class="nearby-card-need">${issueNeedText(issue)}</span>`;
    btn.addEventListener('click',()=>showTownIssuePopup(issue.id));
    list.appendChild(btn);
  });
}

// ── 建設着工（v5 repairTownIssue/startPoliceConstruction を移設） ──
export function repairTownIssue(issueId){
  const state=store.state;
  const issue=(state.townIssues||[]).find(x=>x.id===issueId);
  if(!issue||issue.state!=='burned'||issue.requiredVehicle!=='excav'||!hasVehicle(state,'excav'))return;
  issue.state='constructing';
  issue.startedOn=dateString();
  issue.completeOn=dateString(1);
  save();
  document.getElementById('preview-popup').classList.add('hidden');
  speak('ショベルカーがきたよ。おうちをなおしているよ。あしたできるよ。');
  if(store.townScene){store.townScene.refreshTown();store.townScene.playConstruction(issue.stageIdx??0,'excav');}
}

export function startPoliceConstruction(issueId){
  const state=store.state;
  const issue=(state.townIssues||[]).find(x=>x.id===issueId);
  if(!issue||issue.type!=='police-risk')return;
  const begin=(step,voice,vehicle)=>{
    issue.state='constructing';
    issue.buildStep=step;
    issue.startedOn=dateString();
    issue.completeOn=dateString(1);
    issue.requiredVehicle=step==='lot'?'crane':null;
    save();
    document.getElementById('preview-popup').classList.add('hidden');
    speak(voice);
    if(store.townScene){store.townScene.refreshTown();store.townScene.playConstruction(issue.stageIdx??0,vehicle);}
  };
  if(issue.state==='risk'&&hasVehicle(state,'bull'))begin('lot','ブルドーザーがきたよ。けいさつしょのばしょをつくっているよ。あしたできるよ。','bull');
  else if(issue.state==='lot'&&hasVehicle(state,'crane'))begin('station','クレーン車がきたよ。けいさつしょをたてているよ。あしたできるよ。','crane');
}

// ── 記録URL共有（v5と同一） ──
export async function copyShareUrl(){
  const code=encodeStateForUrl(store.state);
  if(!code)return alert('記録URLを作れませんでした');
  const url=`${location.origin}${location.pathname}${location.search}#k=${code}`;
  try{
    await navigator.clipboard.writeText(url);
    alert('記録URLをコピーしました。別のブラウザで開くと同じ記録になります。');
  }catch{
    prompt('このURLをコピーしてください',url);
  }
}
