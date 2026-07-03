// ── kuruma-v5 → kuruma-v6 マイグレーション ─────────────────────
// 子供のセーブデータを守る最重要ファイル。
// ルール: kuruma-v5 キーは絶対に削除しない（legacy/index-v5.html のロールバック保険）。
// 依存なしの純粋関数のみ。state.js から呼ばれる。

export const SAVE_KEY='kuruma-v6';
export const LEGACY_KEY='kuruma-v5';

export function defV6Extras(){
  return{
    version:6,
    residents:{},                 // {bobo:{metOn,friendship,lastTalkedOn}}
    quest:null,                   // 今日のお願いごと {id,residentId,kind,targetId,createdOn,done}
    stamps:{month:'',days:[],streak:0,best:0,lastStampDate:''},
    zukanSeen:{residents:[],buildings:[]},
    camera:null,                  // 最終カメラ位置 {x,y}
  };
}

// v5生データ（またはフィールド欠損のあるv6）にv6新フィールドを付与する。
// v5由来のフィールド（date/approvedToday/tasks/stage/earnedParts/pendingEvent/
// buildings/townIssues/completedConstructions）は一切書き換えない。
export function migrateV5toV6(raw){
  if(!raw||typeof raw!=='object')return null;
  const ex=defV6Extras();
  const s={...ex,...raw};
  s.version=6;
  if(!s.residents||typeof s.residents!=='object')s.residents={};
  if(s.quest!==null&&typeof s.quest!=='object')s.quest=null;
  if(!s.stamps||typeof s.stamps!=='object')s.stamps=ex.stamps;
  s.stamps={...ex.stamps,...s.stamps};
  if(!Array.isArray(s.stamps.days))s.stamps.days=[];
  if(!s.zukanSeen||typeof s.zukanSeen!=='object')s.zukanSeen=ex.zukanSeen;
  if(!Array.isArray(s.zukanSeen.residents))s.zukanSeen.residents=[];
  if(!Array.isArray(s.zukanSeen.buildings))s.zukanSeen.buildings=[];
  return s;
}

// 読み込み優先順位: URLハッシュ > v6キー > v5キー > null
// v5から読んだ場合 {raw, fromLegacy:true} を返し、呼び出し側がv6キーへ保存する。
export function pickRawState({urlRaw=null,v6Raw=null,v5Raw=null}){
  if(urlRaw)return{raw:migrateV5toV6(urlRaw),fromLegacy:false};
  if(v6Raw)return{raw:migrateV5toV6(v6Raw),fromLegacy:false};
  if(v5Raw)return{raw:migrateV5toV6(v5Raw),fromLegacy:true};
  return{raw:null,fromLegacy:false};
}
