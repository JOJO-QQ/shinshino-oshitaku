// ── STATE (v6) ────────────────────────────────────────────────
// index.html(v5) 行2077-2131 のロジックを移設し、v6スキーマに拡張。
// localStorage/location はテスト可能なように引数で注入できる（省略時はブラウザのものを使用）。
import {TASKS, ALL_FALSE, stageIndexById} from '../data/stages.js';
import {syncStoryIssues, completeDueConstructions, shouldRepeatPoliceEvent} from './townIssues.js';
import {SAVE_KEY, LEGACY_KEY, defV6Extras, migrateV5toV6, pickRawState} from './migrate.js';

export {SAVE_KEY, LEGACY_KEY};

export function dateString(offsetDays=0,base=new Date()){
  const d=new Date(base);
  d.setDate(d.getDate()+offsetDays);
  return d.toDateString();
}

// 季節は実日付から導出（保存しない）。3-5月=はる 6-8月=なつ 9-11月=あき 12-2月=ふゆ
export function currentSeason(d=new Date()){
  const m=d.getMonth()+1;
  if(m>=3&&m<=5)return'spring';
  if(m>=6&&m<=8)return'summer';
  if(m>=9&&m<=11)return'autumn';
  return'winter';
}

// 天気は日付文字列シードの決定論的擬似乱数（URL引き継ぎ先でも同じ天気になる）
export function weatherFor(dateStr=dateString()){
  let h=0;
  for(let i=0;i<dateStr.length;i++)h=(h*31+dateStr.charCodeAt(i))>>>0;
  const r=(h%100)/100;
  if(r<0.70)return'sunny';
  if(r<0.85)return'cloudy';
  return'rain';
}

export function defState(){
  return{...defV6Extras(),
    date:'',approvedToday:false,
    tasks:Object.fromEntries(TASKS.map(t=>[t.id,false])),
    stage:0, earnedParts:[...ALL_FALSE], pendingEvent:-1,
    buildings:[], townIssues:[], completedConstructions:[]};
}

export function encodeStateForUrl(s){
  try{return btoa(unescape(encodeURIComponent(JSON.stringify(s)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
  catch{return '';}
}

export function decodeStateFromUrl(hash){
  try{
    // v5の正規表現は先頭の'#'を考慮しておらず共有URLの復元が常に失敗していた（v6で修正）
    const m=(hash??location.hash).replace(/^#/,'').match(/(?:^|&)k=([^&]+)/);
    if(!m)return null;
    let raw=m[1].replace(/-/g,'+').replace(/_/g,'/');
    raw+=Array((4-raw.length%4)%4+1).join('=');
    return JSON.parse(decodeURIComponent(escape(atob(raw))));
  }catch{return null;}
}

export function normalizeState(s,today=dateString()){
  const base=defState();
  if(!s||typeof s!=='object')return base;
  s=migrateV5toV6({...base,...s});
  s.tasks={...base.tasks,...(s.tasks||{})};
  if(!Array.isArray(s.earnedParts))s.earnedParts=[...ALL_FALSE];
  if(s.pendingEvent===undefined)s.pendingEvent=-1;
  if(!Array.isArray(s.buildings))s.buildings=[];
  if(!Array.isArray(s.townIssues))s.townIssues=[];
  if(!Array.isArray(s.completedConstructions))s.completedConstructions=[];
  syncStoryIssues(s);
  const isNewDay=s.date!==today;
  if(isNewDay){
    s.date=today;s.approvedToday=false;
    s.tasks=Object.fromEntries(TASKS.map(t=>[t.id,false]));
    if(s.quest&&s.quest.createdOn!==today)s.quest=null; // お願いごとは日替わり
  }
  completeDueConstructions(s,today);
  if(isNewDay&&s.pendingEvent<0&&shouldRepeatPoliceEvent(s))s.pendingEvent=stageIndexById('police');
  return s;
}

export function loadState(storage,hash){
  storage=storage??localStorage;
  try{
    const parse=k=>{try{return JSON.parse(storage.getItem(k)||'null');}catch{return null;}};
    const {raw,fromLegacy}=pickRawState({
      urlRaw:decodeStateFromUrl(hash),
      v6Raw:parse(SAVE_KEY),
      v5Raw:parse(LEGACY_KEY),
    });
    const s=normalizeState(raw);
    if(fromLegacy)saveState(s,storage);  // v5からの移行時は即v6キーへ保存（v5キーは残す）
    return s;
  }catch{return defState();}
}

export function saveState(s,storage){
  storage=storage??localStorage;
  s.date=dateString();
  storage.setItem(SAVE_KEY,JSON.stringify(s));
}

// デイリースタンプ。approve()成功時に呼ぶ。押せたらtrue。
export function awardStamp(s,now=new Date()){
  const ym=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
  const today=dateString(0,now);
  const st=s.stamps;
  if(st.lastStampDate===today)return false;
  if(st.month!==ym){st.month=ym;st.days=[];}
  const day=now.getDate();
  if(!st.days.includes(day))st.days.push(day);
  st.streak=(st.lastStampDate===dateString(-1,now))?st.streak+1:1;
  st.best=Math.max(st.best||0,st.streak);
  st.lastStampDate=today;
  return true;
}
