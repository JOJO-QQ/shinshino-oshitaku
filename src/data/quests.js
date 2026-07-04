// ── きょうのおねがい（日替わりクエスト） ───────────────────────
// 住人が1日1つお願いをしてくる。3テンプレ:
//  talk   : 住人○○とおはなしする
//  visit  : たてもの○○をタップして見にいく
//  flowers: おはなを3つさわる
// 報酬 = ほめられる + お願いした住人の友好度+1。state.quest に保存（日替わり）。

import {RESIDENTS, activeResidents} from './residents.js';
import {BUILDING_NAMES} from '../assets/townSvg.js';
import {dateString} from '../state/state.js';

function seededPick(arr,seedStr,salt){
  let h=salt;
  for(let i=0;i<seedStr.length;i++)h=(h*31+seedStr.charCodeAt(i))>>>0;
  return arr[h%arr.length];
}

// 町に住人がいれば今日のお願いを生成する（既にあれば何もしない）
export function ensureDailyQuest(state){
  const today=dateString();
  if(state.quest&&state.quest.createdOn===today)return;
  state.quest=null;
  const active=activeResidents(state,today);
  if(!active.length)return;

  const giver=seededPick(active,today,7);
  const kinds=['flowers'];
  if(active.length>=2)kinds.push('talk');
  const built=(state.buildings||[]).map((b,i)=>b?i:-1).filter(i=>i>=0);
  if(built.length)kinds.push('visit');
  const kind=seededPick(kinds,today,13);

  const q={id:`q-${today}`,kind,giverId:giver.id,createdOn:today,need:1,got:0,done:false};
  if(kind==='talk'){
    const others=active.filter(r=>r.id!==giver.id);
    q.targetId=seededPick(others,today,29).id;
  }else if(kind==='visit'){
    q.targetIdx=seededPick(built,today,31);
  }else{
    q.need=3;
  }
  state.quest=q;
}

export function questText(q){
  const giver=RESIDENTS.find(r=>r.id===q.giverId);
  const name=giver?giver.name:'みんな';
  if(q.done)return`${name}のおねがい できた！`;
  if(q.kind==='talk'){
    const t=RESIDENTS.find(r=>r.id===q.targetId);
    return`${name}のおねがい: ${t?t.name:'ともだち'}と おはなししてみて`;
  }
  if(q.kind==='visit')return`${name}のおねがい: ${BUILDING_NAMES[q.targetIdx]||'たてもの'}を みにいってタップ`;
  return`${name}のおねがい: おはなを ${q.need}つ さわってみて（あと${q.need-q.got}）`;
}

export function questGiver(q){return RESIDENTS.find(r=>r.id===q.giverId)||null;}

// 進捗イベントを流し込み、達成した瞬間だけお願い主（住人）を返す。
// ev: {type:'talk'|'visit'|'flower', id?, idx?}
export function applyQuestEvent(state,ev){
  return questProgress(state,ev)?questGiver(state.quest):null;
}

function questProgress(state,ev){
  const q=state.quest;
  if(!q||q.done||q.createdOn!==dateString())return false;
  if(q.kind==='talk'&&ev.type==='talk'&&ev.id===q.targetId)q.got=1;
  else if(q.kind==='visit'&&ev.type==='visit'&&ev.idx===q.targetIdx)q.got=1;
  else if(q.kind==='flowers'&&ev.type==='flower')q.got=Math.min(q.need,q.got+1);
  else return false;
  if(q.got>=q.need){
    q.done=true;
    // お願いした住人の友好度+1（1日1回制限とは別枠のごほうび）
    const rec=state.residents[q.giverId]||{metOn:dateString(),friendship:0,lastTalkedOn:''};
    rec.friendship=Math.min(5,(rec.friendship||0)+1);
    state.residents[q.giverId]=rec;
    return true;
  }
  return false;
}
