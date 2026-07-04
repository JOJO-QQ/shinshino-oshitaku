// ── 見下ろしタウン用SVG（どうぶつの森ライク v2） ─────────────────
// 柔らかい光と影・ふっくら立体感・三角グラス模様。
// 全アセットはグラデーション+ぼかし影で描く。DOMに複数埋め込んでも
// 衝突しないよう、グラデーション等のidは呼び出しごとにユニーク化する。

let _uid=0;
const uq=()=>`ac${(_uid++).toString(36)}`;

// 色ユーティリティ: hexをwhite/black方向へ混ぜる
function mix(hex,to,f){
  const h=hex.replace('#',''),t=to.replace('#','');
  const c=i=>Math.round(parseInt(h.substr(i,2),16)*(1-f)+parseInt(t.substr(i,2),16)*f)
    .toString(16).padStart(2,'0');
  return`#${c(0)}${c(2)}${c(4)}`;
}
const lite=(c,f=.35)=>mix(c,'#FFFFFF',f);
const dark=(c,f=.25)=>mix(c,'#000000',f);

const OUT='#6B4A2E';          // 柔らかい暖色アウトライン
const SHADOW='#2F5E2A';       // 地面の影（草の上）

// ぼかしフィルタdef
const blurDef=id=>`<filter id="${id}" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="4"/></filter>`;

// ── 季節パレット ────────────────────────────────────────────────
// base=芝生ベース tris=三角模様6色 leaf/leaf2=木の光→影 path=道(縁/中/明)
export const SEASON_PALETTES={
  spring:{base:'#7DB65C',tris:['#86BF64','#76AE55','#82BA60','#79B258','#84BD62','#7CB45A'],
    leaf:['#8ED06E','#5FAE4C','#3E8A38'],leaf2:['#6FBB58','#4E9E42','#357A31'],
    blossom:'#F9BBD0',snow:null,path:['#B8935E','#CFA971','#DBB981'],sky:'#7DB65C'},
  summer:{base:'#69AC4B',tris:['#72B554','#5FA044','#6EB050','#63A747','#70B252','#66A94A'],
    leaf:['#7CC45E','#4A9E3F','#2F7A2E'],leaf2:['#5CAC48','#3E8E38','#2A6E2A'],
    blossom:null,snow:null,path:['#B08A55','#C9A26B','#D6B47C'],sky:'#69AC4B'},
  autumn:{base:'#C0A662',tris:['#C9B06C','#B69C58','#C5AB67','#BAA05C','#C7AE6A','#BDA35F'],
    leaf:['#F2B25C','#DE8A3A','#B4652A'],leaf2:['#E09A48','#C67630','#9E5524'],
    blossom:null,snow:null,path:['#A98552','#C09A62','#CFA971'],sky:'#C0A662'},
  winter:{base:'#E4ECEF',tris:['#EBF2F4','#DDE7EB','#E8F0F2','#E0EAED','#EAF1F3','#DEE8EC'],
    leaf:['#B7D6B4','#8BB489','#699467'],leaf2:['#9CC49A','#7AA678','#5C875C'],
    blossom:null,snow:'#FFFFFF',path:['#B8A288','#CDB99E','#DCCBB0'],sky:'#E4ECEF'},
};

// 三角グラスのpattern定義（50px単位・シームレス）
function grassPat(id,pal,off=0){
  const t=pal.tris,c=i=>t[(i+off)%6];
  return`<pattern id="${id}" width="50" height="50" patternUnits="userSpaceOnUse">
<rect width="50" height="50" fill="${pal.base}"/>
<path d="M0 0 L25 0 L12.5 12.5 Z" fill="${c(0)}"/>
<path d="M25 0 L50 0 L37.5 12.5 Z" fill="${c(1)}"/>
<path d="M12.5 12.5 L37.5 12.5 L25 25 Z" fill="${c(2)}"/>
<path d="M0 25 L25 25 L12.5 37.5 Z" fill="${c(3)}"/>
<path d="M25 25 L50 25 L37.5 37.5 Z" fill="${c(4)}"/>
<path d="M12.5 37.5 L37.5 37.5 L25 50 Z" fill="${c(5)}"/>
<path d="M-12.5 12.5 L12.5 12.5 L0 25 Z" fill="${c(1)}"/>
<path d="M37.5 12.5 L62.5 12.5 L50 25 Z" fill="${c(3)}"/>
<path d="M-12.5 37.5 L12.5 37.5 L0 50 Z" fill="${c(4)}"/>
<path d="M37.5 37.5 L62.5 37.5 L50 50 Z" fill="${c(0)}"/>
</pattern>`;
}

// 草地タイル 200×200
export function grassTile(variant=0,pal=SEASON_PALETTES.spring){
  const id=uq();
  return`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs>${grassPat(id,pal,variant*2)}</defs>
<rect width="200" height="200" fill="url(#${id})"/></svg>`;
}

// 土の道タイル 200×200。type: 'h'横 'v'縦 'x'十字 'plaza'広場
export function roadTile(type,pal=SEASON_PALETTES.spring){
  const g=uq(),b=uq();
  const [edge,mid,hi]=pal.path;
  const band=`<linearGradient id="${b}" x1="0" y1="0" x2="${type==='v'?'1':'0'}" y2="${type==='v'?'0':'1'}">
<stop offset="0" stop-color="${edge}"/><stop offset=".16" stop-color="${mid}"/>
<stop offset=".5" stop-color="${hi}"/>
<stop offset=".84" stop-color="${mid}"/><stop offset="1" stop-color="${edge}"/></linearGradient>`;
  const grass=`<defs>${grassPat(g,pal)}${band}</defs><rect width="200" height="200" fill="url(#${g})"/>`;
  const pebbles=(pts)=>pts.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${edge}" opacity=".45"/>`).join('');
  if(type==='h')return`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${grass}
<rect x="0" y="40" width="200" height="120" fill="url(#${b})"/>
${pebbles([[40,80,4],[120,120,5],[170,70,3.5],[80,140,3.5]])}</svg>`;
  if(type==='v')return`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${grass}
<rect x="40" y="0" width="120" height="200" fill="url(#${b})"/>
${pebbles([[80,40,4],[120,120,5],[70,170,3.5],[140,80,3.5]])}</svg>`;
  if(type==='x'){
    const b2=uq();
    return`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${grass}
<defs><linearGradient id="${b2}" x1="1" y1="0" x2="0" y2="0">
<stop offset="0" stop-color="${edge}"/><stop offset=".16" stop-color="${mid}"/>
<stop offset=".5" stop-color="${hi}"/>
<stop offset=".84" stop-color="${mid}"/><stop offset="1" stop-color="${edge}"/></linearGradient></defs>
<rect x="0" y="40" width="200" height="120" fill="url(#${b})"/>
<rect x="40" y="0" width="120" height="200" fill="url(#${b2})"/>
<rect x="44" y="44" width="112" height="112" rx="20" fill="${hi}"/>
${pebbles([[100,100,5],[60,60,3.5],[140,140,3.5]])}</svg>`;
  }
  // plaza: あたたかい石畳の広場
  const p=uq();
  return`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<defs>${grassPat(g,pal)}
<radialGradient id="${p}" cx=".5" cy=".42" r=".75">
<stop offset="0" stop-color="#F3E8CE"/><stop offset=".65" stop-color="#E6D6B2"/><stop offset="1" stop-color="#D3BE93"/>
</radialGradient></defs>
<rect width="200" height="200" fill="url(#${g})"/>
<rect x="2" y="2" width="196" height="196" rx="34" fill="url(#${p})"/>
<rect x="2" y="2" width="196" height="196" rx="34" fill="none" stroke="#C4AC7F" stroke-width="5"/>
<circle cx="100" cy="100" r="46" fill="none" stroke="#D9C7A0" stroke-width="7"/>
<circle cx="100" cy="100" r="12" fill="#E9B94F" stroke="#C4933B" stroke-width="3"/>
<path d="M100 93 L102.4 98 L108 98.6 L104 102.4 L105 108 L100 105.2 L95 108 L96 102.4 L92 98.6 L97.6 98 Z" fill="#FFF3D2"/></svg>`;
}

// 木 140×170（ぷっくり3層キャノピー+柔らか影）
export function treeSVG(pal=SEASON_PALETTES.spring){
  const top=uq(),mid=uq(),tr=uq(),f=uq();
  const [h1,h2,h3]=pal.leaf,[m1,m2,m3]=pal.leaf2;
  const blossom=pal.blossom?`
<circle cx="42" cy="52" r="8" fill="${pal.blossom}"/><circle cx="40" cy="50" r="3" fill="${lite(pal.blossom,.5)}"/>
<circle cx="98" cy="46" r="7" fill="${pal.blossom}"/><circle cx="96" cy="44" r="2.6" fill="${lite(pal.blossom,.5)}"/>
<circle cx="70" cy="30" r="6" fill="${pal.blossom}"/>
<circle cx="112" cy="76" r="6" fill="${pal.blossom}"/>
<circle cx="30" cy="88" r="6" fill="${pal.blossom}"/>`:'';
  const snow=pal.snow?`
<path d="M26 56 Q40 30 70 26 Q102 30 114 54 Q98 44 70 44 Q44 44 26 56Z" fill="${pal.snow}" opacity=".95"/>
<ellipse cx="40" cy="82" rx="17" ry="8" fill="${pal.snow}" opacity=".88"/>
<ellipse cx="102" cy="78" rx="15" ry="7" fill="${pal.snow}" opacity=".88"/>`:'';
  return`<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="${top}" cx=".38" cy=".3" r=".95">
<stop offset="0" stop-color="${h1}"/><stop offset=".55" stop-color="${h2}"/><stop offset="1" stop-color="${h3}"/></radialGradient>
<radialGradient id="${mid}" cx=".4" cy=".32" r=".95">
<stop offset="0" stop-color="${m1}"/><stop offset=".6" stop-color="${m2}"/><stop offset="1" stop-color="${m3}"/></radialGradient>
<linearGradient id="${tr}" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stop-color="#8A6238"/><stop offset=".5" stop-color="#A87C4B"/><stop offset="1" stop-color="#6E4C2A"/></linearGradient>
${blurDef(f)}
</defs>
<ellipse cx="70" cy="158" rx="46" ry="11" fill="${SHADOW}" opacity=".32" filter="url(#${f})"/>
<path d="M63 156 Q61 122 65 106 L75 106 Q79 122 77 156 Q70 160 63 156Z" fill="url(#${tr})" stroke="#5D4126" stroke-width="3"/>
<ellipse cx="70" cy="74" rx="54" ry="42" fill="url(#${mid})"/>
<ellipse cx="40" cy="92" rx="30" ry="24" fill="url(#${mid})"/>
<ellipse cx="102" cy="92" rx="28" ry="22" fill="url(#${mid})"/>
<ellipse cx="67" cy="62" rx="40" ry="30" fill="url(#${top})"/>
<circle cx="50" cy="50" r="6" fill="${lite(h1,.45)}" opacity=".85"/>
<circle cx="64" cy="44" r="4" fill="${lite(h1,.45)}" opacity=".7"/>
<circle cx="80" cy="52" r="5" fill="${lite(h1,.35)}" opacity=".65"/>
${snow}${blossom}</svg>`;
}

// 花 60×60（グラデ花びら）
export function flowerSVG(petal='#EE8DB4',petalLight='#FBD5E4'){
  const p=uq(),c=uq(),f=uq();
  return`<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="${p}" cx=".4" cy=".35" r=".9">
<stop offset="0" stop-color="${petalLight}"/><stop offset="1" stop-color="${petal}"/></radialGradient>
<radialGradient id="${c}" cx=".4" cy=".35" r=".9">
<stop offset="0" stop-color="#FFE9AE"/><stop offset="1" stop-color="#F0B23E"/></radialGradient>
${blurDef(f)}
</defs>
<ellipse cx="30" cy="55" rx="12" ry="4" fill="${SHADOW}" opacity=".28" filter="url(#${f})"/>
<path d="M30 44 Q28 50 30 56" stroke="#4E9E42" stroke-width="3" fill="none" stroke-linecap="round"/>
${[0,72,144,216,288].map(a=>`<ellipse cx="30" cy="17" rx="8.5" ry="12" fill="url(#${p})" transform="rotate(${a} 30 29)"/>`).join('')}
<circle cx="30" cy="29" r="7.5" fill="url(#${c})"/></svg>`;
}

// 雲（未開放地区カバー）300×180
export function cloudSVG(){
  const g=uq();
  return`<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="${g}" cx=".42" cy=".3" r=".95">
<stop offset="0" stop-color="#FFFFFF"/><stop offset=".8" stop-color="#F2F7FB"/><stop offset="1" stop-color="#E2ECF4"/></radialGradient></defs>
<ellipse cx="150" cy="105" rx="140" ry="62" fill="url(#${g})" opacity=".97"/>
<ellipse cx="80" cy="80" rx="66" ry="48" fill="url(#${g})" opacity=".97"/>
<ellipse cx="205" cy="72" rx="72" ry="52" fill="url(#${g})" opacity=".97"/>
<ellipse cx="150" cy="132" rx="118" ry="38" fill="#DDE9F2" opacity=".8"/></svg>`;
}

// 建設予定地 120×110（土の広場+木の立て看板）
export function lotSVG(){
  const w=uq(),f=uq();
  return`<svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg">
<defs><linearGradient id="${w}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#C9A26B"/><stop offset="1" stop-color="#A87C4B"/></linearGradient>${blurDef(f)}</defs>
<ellipse cx="60" cy="98" rx="46" ry="9" fill="${SHADOW}" opacity=".3" filter="url(#${f})"/>
<ellipse cx="60" cy="78" rx="48" ry="26" fill="#D6B47C"/>
<ellipse cx="60" cy="76" rx="40" ry="20" fill="#E2C48E"/>
<rect x="42" y="26" width="36" height="26" rx="6" fill="url(#${w})" stroke="${OUT}" stroke-width="3.5"/>
<path d="M52 52 V72 M68 52 V72" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>
<path d="M50 36 H70 M50 43 H64" stroke="#FFF3D2" stroke-width="3.5" stroke-linecap="round"/>
<path d="M88 70 Q90 62 96 60 Q94 68 90 72 Z" fill="#6FBB58"/></svg>`;
}

// タップ誘導の光るリング 160×160
export function ringSVG(color='#FFE66D'){
  return`<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="80" r="66" fill="none" stroke="${color}" stroke-width="10" opacity=".95"/>
<circle cx="80" cy="80" r="52" fill="${color}" opacity=".22"/></svg>`;
}

// ── 建物20種（どうぶつの森ライク） ──────────────────────────────
// 共通素材: ぼかし地影・クリーム壁グラデ・丸屋根グラデ・丸窓+反射

function bldDefs(roofC){
  const ids={f:uq(),roof:uq(),wall:uq(),door:uq()};
  const defs=`<defs>${blurDef(ids.f)}
<linearGradient id="${ids.roof}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="${lite(roofC,.28)}"/><stop offset=".55" stop-color="${roofC}"/><stop offset="1" stop-color="${dark(roofC,.22)}"/></linearGradient>
<linearGradient id="${ids.wall}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#FBF3DC"/><stop offset="1" stop-color="#EAD9B4"/></linearGradient>
<linearGradient id="${ids.door}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#B98A52"/><stop offset="1" stop-color="#94683A"/></linearGradient>
</defs>`;
  return{ids,defs};
}
const gShadow=f=>`<ellipse cx="60" cy="107" rx="45" ry="10" fill="${SHADOW}" opacity=".32" filter="url(#${f})"/>`;
const winRound=(x,y,r=9)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#BEE3F5" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M${x} ${y-r} V${y+r} M${x-r} ${y} H${x+r}" stroke="#8A6B45" stroke-width="2.5"/>
<path d="M${x-r*.62} ${y-r*.5} Q${x-r*.2} ${y-r*.78} ${x+r*.15} ${y-r*.6}" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".9" fill="none"/>`;
const winSq=(x,y,w=18,h=14)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#BEE3F5" stroke="#8A6B45" stroke-width="3"/>
<path d="M${x+3} ${y+h-3.5} L${x+w*.55} ${y+2.5}" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".8"/>`;
const doorArch=(dg,x=52,y=72,w=20,h=32)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w/2-1}" fill="url(#${dg})" stroke="#6E4C2A" stroke-width="3.5"/>
<circle cx="${x+w-5.5}" cy="${y+h*.55}" r="2.4" fill="#F3E1B0"/>`;
const wrap=inner=>`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;

// 基本形1: 丸屋根のいえ
function houseBase({roof='#DE6A4A',sign=''}={}){
  const{ids,defs}=bldDefs(roof);
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="22" y="50" width="76" height="56" rx="9" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<rect x="24" y="50" width="72" height="10" fill="#B99764" opacity=".4"/>
<path d="M12 54 Q12 22 40 15 L80 15 Q108 22 108 54 L96 58 Q80 47 60 47 Q40 47 24 58 Z" fill="url(#${ids.roof})" stroke="${dark(roof,.42)}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M24 40 Q40 22 60 21 Q80 22 96 40" fill="none" stroke="${lite(roof,.42)}" stroke-width="5" stroke-linecap="round" opacity=".7"/>
${winRound(40,72)}${winRound(82,72)}
${doorArch(ids.door)}
<rect x="46" y="103" width="32" height="7" rx="3.5" fill="#C9A26B" stroke="#8A6B45" stroke-width="2.5"/>
${sign}`);
}
// 基本形2: ひさし付きのおみせ（スカラップ）
function shopBase({awn='#DE6A4A',awn2='#FFF6E2',sign=''}={}){
  const{ids,defs}=bldDefs(awn);
  const scallops=[0,1,2,3].map(i=>{
    const x=27+i*17;
    return`<path d="M${x} 46 A8.5 8 0 0 0 ${x+17} 46 V42 H${x} Z" fill="${i%2?awn2:`url(#${ids.roof})`}" stroke="${dark(awn,.35)}" stroke-width="2.5"/>`;
  }).join('');
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="20" y="40" width="80" height="66" rx="9" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<rect x="22" y="42" width="76" height="8" fill="#B99764" opacity=".4"/>
<path d="M22 42 Q22 24 40 22 H80 Q98 24 98 42 Z" fill="url(#${ids.roof})" stroke="${dark(awn,.35)}" stroke-width="3.5"/>
${scallops}
<rect x="28" y="58" width="30" height="24" rx="5" fill="#BEE3F5" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M32 78 L48 61" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".85"/>
${doorArch(ids.door,66,62,22,44)}
${sign}`);
}
// 基本形3: ビル
function towerBase({wall='#7FA9DC',floors=3,sign=''}={}){
  const{ids,defs}=bldDefs(wall);
  const wg=uq();
  let wins='';
  for(let r=0;r<floors;r++)for(let c=0;c<2;c++)wins+=winSq(33+c*33,42+r*20,20,13);
  return wrap(`${defs}
<defs><linearGradient id="${wg}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${lite(wall,.3)}"/><stop offset="1" stop-color="${dark(wall,.16)}"/></linearGradient></defs>
${gShadow(ids.f)}
<rect x="24" y="26" width="72" height="82" rx="9" fill="url(#${wg})" stroke="${dark(wall,.4)}" stroke-width="3.5"/>
<rect x="19" y="16" width="82" height="15" rx="7.5" fill="url(#${ids.roof})" stroke="${dark(wall,.42)}" stroke-width="3.5"/>
<path d="M26 21 H70" stroke="${lite(wall,.5)}" stroke-width="4" stroke-linecap="round" opacity=".75"/>
${wins}
${doorArch(ids.door,50,88,20,20)}
${sign}`);
}

const BUILDING_FNS=[
// 0 fire → おうち（ハートの看板）
()=>houseBase({roof:'#DE6A4A',
  sign:`<path d="M60 40 C55 36 52 33 53 30 C54 27 58 26 60 29 C62 26 66 27 67 30 C68 33 65 36 60 40Z" fill="#F15B64" stroke="#B03A42" stroke-width="2"/>`}),
// 1 police → けいさつしょ（金の星+赤ランプ）
()=>towerBase({wall:'#6E9AD4',floors:2,
  sign:`<circle cx="60" cy="36" r="10" fill="#FFDD66" stroke="#C4933B" stroke-width="3"/>
<path d="M60 29 L62 34 L67 34 L63 37 L65 42 L60 39 L55 42 L57 37 L53 34 L58 34 Z" fill="#3D6BB0"/>
<rect x="46" y="8" width="28" height="10" rx="5" fill="#E85B4D" stroke="#A83A32" stroke-width="3"/>
<ellipse cx="53" cy="11" rx="5" ry="2.5" fill="#F8A196"/>`}),
// 2 ambu → びょういん（赤十字）
()=>towerBase({wall:'#F2EFE6',floors:2,
  sign:`<rect x="53" y="30" width="14" height="30" rx="4" fill="#E85B4D"/>
<rect x="45" y="38" width="30" height="14" rx="4" fill="#E85B4D"/>
<path d="M56 33 Q60 31 64 33" stroke="#F8A196" stroke-width="3" stroke-linecap="round" fill="none"/>`}),
// 3 taxi → タクシーのりば（黄ひさし）
()=>shopBase({awn:'#EFAF3A',
  sign:`<rect x="36" y="4" width="48" height="15" rx="7.5" fill="#FFE082" stroke="#C4933B" stroke-width="3"/>
<circle cx="48" cy="11.5" r="3" fill="#6B4A2E"/><circle cx="60" cy="11.5" r="3" fill="#6B4A2E"/><circle cx="72" cy="11.5" r="3" fill="#6B4A2E"/>`}),
// 4 excav → けんせつじむしょ（ヘルメット看板）
()=>shopBase({awn:'#E88A3A',
  sign:`<path d="M48 16 Q48 5 60 5 Q72 5 72 16 L74 18 H46 Z" fill="#FFD65C" stroke="#C4933B" stroke-width="3" stroke-linejoin="round"/>
<path d="M52 9 Q56 6 60 6" stroke="#FFF3D2" stroke-width="3" stroke-linecap="round" fill="none"/>`}),
// 5 bull → こうじょう
()=>{const{ids,defs}=bldDefs('#8FA3B0');const wg=uq();
  return wrap(`${defs}
<defs><linearGradient id="${wg}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#C4D2DA"/><stop offset="1" stop-color="#9DB0BC"/></linearGradient></defs>
${gShadow(ids.f)}
<rect x="16" y="50" width="88" height="56" rx="9" fill="url(#${wg})" stroke="#5F7480" stroke-width="3.5"/>
<path d="M16 52 L40 36 V52 L64 36 V52 L88 36 V52" fill="#D5E1E8" stroke="#5F7480" stroke-width="3.5" stroke-linejoin="round"/>
<rect x="82" y="16" width="15" height="36" rx="5" fill="#8FA3B0" stroke="#5F7480" stroke-width="3.5"/>
<ellipse cx="90" cy="10" rx="9" ry="6" fill="#E9EFF3" opacity=".9"/>
<ellipse cx="98" cy="4" rx="6" ry="4" fill="#F2F6F8" opacity=".75"/>
${winSq(26,64,18,14)}${winSq(50,64,18,14)}
<rect x="76" y="78" width="20" height="28" rx="9" fill="#5F7480" stroke="#46565F" stroke-width="3"/>`);},
// 6 crane → オフィスビル（ガラス張り）
()=>towerBase({wall:'#8FB8E8',floors:3}),
// 7 dump → デパート（ピンク+リボン）
()=>shopBase({awn:'#E87A9C',
  sign:`<circle cx="60" cy="12" r="9" fill="#FFE082" stroke="#C4933B" stroke-width="3"/>
<path d="M56 12 L59 15 L65 9" fill="none" stroke="#B03A5A" stroke-width="2.5" stroke-linecap="round"/>`}),
// 8 bus → がっこう（時計+旗）
()=>{const{ids,defs}=bldDefs('#6FA860');
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="14" y="42" width="92" height="64" rx="9" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M10 44 Q10 26 30 24 H90 Q110 26 110 44 Z" fill="url(#${ids.roof})" stroke="#4A7A40" stroke-width="3.5"/>
<path d="M20 36 Q40 27 60 26" stroke="${lite('#6FA860',.4)}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>
<circle cx="60" cy="52" r="10" fill="#FFF9EA" stroke="#8A6B45" stroke-width="3"/>
<path d="M60 46 V52 L64 55" fill="none" stroke="#6B4A2E" stroke-width="2.5" stroke-linecap="round"/>
<path d="M98 24 V8 M98 8 Q108 10 112 14 Q106 17 98 17" stroke="#B03A42" stroke-width="3" fill="#E85B4D" stroke-linejoin="round"/>
${winSq(22,68)}${winSq(80,68)}
${doorArch(ids.door,50,74,20,32)}`);},
// 9 truck → ぎんこう（柱+コイン）
()=>{const{ids,defs}=bldDefs('#D9C7A0');
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="18" y="48" width="84" height="58" rx="6" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M12 48 Q12 44 18 42 L60 22 L102 42 Q108 44 108 48 Z" fill="url(#${ids.roof})" stroke="#A08350" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M28 56 V98 M46 56 V98 M74 56 V98 M92 56 V98" stroke="#E4D4AC" stroke-width="9" stroke-linecap="round"/>
<path d="M25 56 V98 M43 56 V98 M71 56 V98 M89 56 V98" stroke="#C4AC7F" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>
<circle cx="60" cy="38" r="8" fill="#FFDD66" stroke="#C4933B" stroke-width="3"/>
<path d="M60 34 V42 M57 36.5 H63 M57 39.5 H63" stroke="#A2762C" stroke-width="2"/>
${doorArch(ids.door,52,80,16,26)}`);},
// 10 mail → ゆうびんきょく（封筒）
()=>shopBase({awn:'#E85B4D',
  sign:`<rect x="44" y="4" width="32" height="20" rx="4" fill="#FFF9EA" stroke="#8A6B45" stroke-width="3"/>
<path d="M44 6 L60 18 L76 6" fill="none" stroke="#8A6B45" stroke-width="2.5" stroke-linejoin="round"/>`}),
// 11 garb → リサイクルセンター
()=>{const{ids,defs}=bldDefs('#6FA860');const wg=uq();
  return wrap(`${defs}
<defs><linearGradient id="${wg}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#D8EBCB"/><stop offset="1" stop-color="#B9D8A6"/></linearGradient></defs>
${gShadow(ids.f)}
<rect x="16" y="46" width="88" height="60" rx="10" fill="url(#${wg})" stroke="#4A7A40" stroke-width="3.5"/>
<path d="M16 50 Q16 28 38 28 H82 Q104 28 104 50 Z" fill="url(#${ids.roof})" stroke="#4A7A40" stroke-width="3.5"/>
<path d="M26 40 Q44 30 62 30" stroke="${lite('#6FA860',.4)}" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>
<circle cx="60" cy="64" r="14" fill="#FFF9EA" stroke="#4A7A40" stroke-width="3"/>
<polygon points="60,53 64,61 56,61" fill="#4A9E3F"/>
<polygon points="69,68 62,71 65,63" fill="#4A9E3F"/>
<polygon points="51,68 58,65 57,73" fill="#4A9E3F"/>
${doorArch(ids.door,30,82,18,24)}${winSq(76,82,20,14)}`);},
// 12 tow → はくぶつかん
()=>{const{ids,defs}=bldDefs('#C9B08F');
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="16" y="52" width="88" height="54" rx="5" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M10 52 L60 24 L110 52 Z" fill="url(#${ids.roof})" stroke="#A08350" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M24 46 L60 27 L96 46" stroke="${lite('#C9B08F',.4)}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
<path d="M26 60 V98 M44 60 V98 M62 60 V98 M80 60 V98 M96 60 V98" stroke="#E4D4AC" stroke-width="9" stroke-linecap="round"/>
<circle cx="60" cy="42" r="6.5" fill="#9C6BC9" stroke="#6E4692" stroke-width="3"/>
<circle cx="58" cy="40" r="2" fill="#D9C1F0"/>`);},
// 13 snow → スケートリンク（氷のドーム）
()=>{const{ids,defs}=bldDefs('#8FC8E8');const dg=uq();
  return wrap(`${defs}
<defs><radialGradient id="${dg}" cx=".4" cy=".28" r="1">
<stop offset="0" stop-color="#EAF7FD"/><stop offset=".65" stop-color="#C3E4F5"/><stop offset="1" stop-color="#93C4E2"/></radialGradient></defs>
${gShadow(ids.f)}
<path d="M14 106 V64 Q14 30 60 30 Q106 30 106 64 V106 Z" fill="url(#${dg})" stroke="#5F94B8" stroke-width="3.5"/>
<path d="M26 48 Q40 36 60 35" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>
<path d="M60 44 V60 M53 52 H67 M54.5 45.5 L65.5 58.5 M65.5 45.5 L54.5 58.5" stroke="#4A9BD4" stroke-width="3.5" stroke-linecap="round"/>
${winRound(34,80,8)}${winRound(86,80,8)}
${doorArch(ids.door,50,80,20,26)}`);},
// 14 roller → こうえん（アーチ+すべりだい）
()=>{const{ids,defs}=bldDefs('#6FA860');const sl=uq();
  return wrap(`${defs}
<defs><linearGradient id="${sl}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#F8C46A"/><stop offset="1" stop-color="#E89A3A"/></linearGradient></defs>
${gShadow(ids.f)}
<path d="M22 106 V58 Q22 40 40 40 H80 Q98 40 98 58 V106" fill="none" stroke="#A87C4B" stroke-width="9" stroke-linecap="round"/>
<rect x="32" y="28" width="56" height="20" rx="10" fill="url(#${ids.roof})" stroke="#4A7A40" stroke-width="3.5"/>
<path d="M38 34 Q50 30 62 31" stroke="${lite('#6FA860',.45)}" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".85"/>
<path d="M40 64 Q40 58 46 58 L52 58 Q58 58 60 66 L68 96 Q69 102 62 102 L50 102" fill="url(#${sl})" stroke="#B87A2A" stroke-width="3"/>
<path d="M40 70 V102 M44 86 H36" stroke="#A87C4B" stroke-width="4" stroke-linecap="round"/>
<circle cx="84" cy="72" r="10" fill="#F0A8C4" stroke="#C4708F" stroke-width="3"/>
<circle cx="81" cy="69" r="3" fill="#F9D3E1"/>
<path d="M84 82 V98 M76 98 H92" stroke="#A87C4B" stroke-width="4" stroke-linecap="round"/>`);},
// 15 aerial → でんきや（電球）
()=>shopBase({awn:'#9C7BC9',
  sign:`<circle cx="60" cy="12" r="9" fill="#FFF6CE" stroke="#C4933B" stroke-width="3"/>
<path d="M58 7 L55 13 H60 L57 19" fill="none" stroke="#E88A3A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`}),
// 16 ladder → おしろ
()=>{const{ids,defs}=bldDefs('#5C7180');
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="26" y="62" width="68" height="44" rx="5" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M18 62 Q24 48 36 48 H84 Q96 48 102 62 Z" fill="url(#${ids.roof})" stroke="#3E4E58" stroke-width="3.5" stroke-linejoin="round"/>
<rect x="38" y="30" width="44" height="20" rx="4" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M32 30 Q37 17 48 17 H72 Q83 17 88 30 Z" fill="url(#${ids.roof})" stroke="#3E4E58" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M54 17 Q60 6 66 17" fill="#FFDD66" stroke="#C4933B" stroke-width="3"/>
<path d="M40 24 Q50 19 60 19" stroke="#8FA6B4" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".85"/>
${winSq(38,70,13,10)}${winSq(69,70,13,10)}
${doorArch(ids.door,51,80,18,26)}`);},
// 17 tanker → ガソリンスタンド
()=>{const{ids,defs}=bldDefs('#E85B4D');const pg=uq();
  return wrap(`${defs}
<defs><linearGradient id="${pg}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#F5F1E6"/><stop offset="1" stop-color="#DDD4BE"/></linearGradient></defs>
${gShadow(ids.f)}
<rect x="12" y="22" width="96" height="16" rx="8" fill="url(#${ids.roof})" stroke="#A83A32" stroke-width="3.5"/>
<path d="M18 27 H60" stroke="#F8A196" stroke-width="4" stroke-linecap="round" opacity=".85"/>
<path d="M24 38 V104 M96 38 V104" stroke="#8A6B45" stroke-width="6" stroke-linecap="round"/>
<rect x="58" y="58" width="28" height="48" rx="6" fill="url(#${pg})" stroke="#8A6B45" stroke-width="3.5"/>
<rect x="63" y="64" width="18" height="13" rx="3" fill="#BEE3F5" stroke="#8A6B45" stroke-width="2.5"/>
<path d="M86 68 Q95 68 95 78 V92" fill="none" stroke="#6B4A2E" stroke-width="4" stroke-linecap="round"/>
<rect x="30" y="44" width="30" height="14" rx="7" fill="#FFDD66" stroke="#C4933B" stroke-width="3"/>`);},
// 18 school → だいがく
()=>{const{ids,defs}=bldDefs('#4E77B8');
  return wrap(`${defs}${gShadow(ids.f)}
<rect x="14" y="46" width="92" height="60" rx="8" fill="url(#${ids.wall})" stroke="#8A6B45" stroke-width="3.5"/>
<path d="M8 46 L60 22 L112 46 Z" fill="url(#${ids.roof})" stroke="#33517E" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M22 41 L60 25 L98 41" stroke="${lite('#4E77B8',.4)}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
<polygon points="46,36 60,30 74,36 60,42" fill="#FFDD66" stroke="#C4933B" stroke-width="2.5"/>
<path d="M72 38 V45" stroke="#FFDD66" stroke-width="2.5" stroke-linecap="round"/>
${winSq(22,58)}${winSq(48,58)}${winSq(80,58)}${winSq(22,80)}${winSq(80,80)}
${doorArch(ids.door,50,80,20,26)}`);},
// 19 water → すいぞくかん
()=>{const{ids,defs}=bldDefs('#4A9BD4');const dg=uq();
  return wrap(`${defs}
<defs><radialGradient id="${dg}" cx=".4" cy=".3" r="1">
<stop offset="0" stop-color="#9FD4F0"/><stop offset=".7" stop-color="#5FA8DC"/><stop offset="1" stop-color="#3E7FB4"/></radialGradient></defs>
${gShadow(ids.f)}
<path d="M14 106 V68 Q14 34 60 34 Q106 34 106 68 V106 Z" fill="url(#${dg})" stroke="#33638C" stroke-width="3.5"/>
<path d="M24 56 Q36 48 48 56 Q60 64 72 56 Q84 48 96 56" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".85"/>
<circle cx="42" cy="80" r="10" fill="#F8B84A" stroke="#C4842A" stroke-width="3"/>
<path d="M50 80 L58 74 V86 Z" fill="#F8B84A" stroke="#C4842A" stroke-width="3" stroke-linejoin="round"/>
<circle cx="39" cy="78" r="2" fill="#6B4A2E"/>
<circle cx="30" cy="68" r="2.5" fill="#D9EEFA" opacity=".9"/>
<circle cx="34" cy="62" r="2" fill="#D9EEFA" opacity=".8"/>
${doorArch(ids.door,68,82,20,24)}`);},
];

export function buildingSVG(stageIdx){
  const fn=BUILDING_FNS[stageIdx];
  return fn?fn():houseBase();
}

// 図鑑・完成演出用の建物名
export const BUILDING_NAMES=['おうち','けいさつしょ','びょういん','タクシーのりば','けんせつじむしょ','こうじょう','オフィスビル','デパート','がっこう','ぎんこう','ゆうびんきょく','リサイクルセンター','はくぶつかん','スケートリンク','こうえん','でんきや','おしろ','ガソリンスタンド','だいがく','すいぞくかん'];

// ── streakごほうび（広場のかざり） ──────────────────────────────

export function balloonSVG(color='#FF7A9A'){
  const g=uq();
  return`<svg viewBox="0 0 60 110" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="${g}" cx=".38" cy=".3" r=".95">
<stop offset="0" stop-color="${lite(color,.42)}"/><stop offset=".6" stop-color="${color}"/><stop offset="1" stop-color="${dark(color,.18)}"/></radialGradient></defs>
<path d="M30 62 Q26 80 30 104" fill="none" stroke="${OUT}" stroke-width="2.5" stroke-linecap="round" opacity=".8"/>
<ellipse cx="30" cy="32" rx="24" ry="29" fill="url(#${g})" stroke="${dark(color,.32)}" stroke-width="3"/>
<path d="M24 60 L30 68 L36 60 Z" fill="${color}" stroke="${dark(color,.32)}" stroke-width="2.5" stroke-linejoin="round"/>
<ellipse cx="21" cy="20" rx="7" ry="10" fill="#FFFFFF" opacity=".45"/></svg>`;
}

export function rainbowSVG(){
  const c=uq();
  const bands=[['#F15B64',56],['#F8B84A',48],['#FFE082',40],['#6FBB58',32],['#5F94D8',24]];
  return`<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
<defs><radialGradient id="${c}" cx=".42" cy=".3" r=".95">
<stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E2ECF4"/></radialGradient></defs>
${bands.map(([col,r])=>`<path d="M${80-r} 84 A${r} ${r} 0 0 1 ${80+r} 84" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" opacity=".92"/>`).join('')}
<ellipse cx="22" cy="82" rx="17" ry="11" fill="url(#${c})"/>
<ellipse cx="138" cy="82" rx="17" ry="11" fill="url(#${c})"/></svg>`;
}

export function fountainSVG(){
  const g=uq(),w=uq(),f=uq();
  return`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#FFE082"/><stop offset="1" stop-color="#E9B94F"/></linearGradient>
<radialGradient id="${w}" cx=".45" cy=".4" r=".8">
<stop offset="0" stop-color="#BDE6F8"/><stop offset="1" stop-color="#7EC8F5"/></radialGradient>
${blurDef(f)}
</defs>
<ellipse cx="60" cy="110" rx="46" ry="9" fill="${SHADOW}" opacity=".3" filter="url(#${f})"/>
<path d="M18 92 Q18 78 32 78 H88 Q102 78 102 92 Q102 108 60 108 Q18 108 18 92Z" fill="url(#${g})" stroke="#C4933B" stroke-width="3.5"/>
<ellipse cx="60" cy="82" rx="34" ry="9" fill="url(#${w})" stroke="#C4933B" stroke-width="2.5"/>
<rect x="52" y="46" width="16" height="34" rx="6" fill="#E9B94F" stroke="#C4933B" stroke-width="3.5"/>
<path d="M60 40 Q46 26 38 42 M60 40 Q74 26 82 42 M60 38 V24" fill="none" stroke="#7EC8F5" stroke-width="6" stroke-linecap="round"/>
<circle cx="38" cy="46" r="4" fill="#BDE6F8"/><circle cx="82" cy="46" r="4" fill="#BDE6F8"/><circle cx="60" cy="19" r="5" fill="#BDE6F8"/>
<circle cx="60" cy="44" r="7" fill="#FFE082" stroke="#C4933B" stroke-width="3"/></svg>`;
}

// ── 天気・季節パーティクル用の小さなかけら ──────────────────────
export function petalSVG(){
  return`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="12" cy="12" rx="9" ry="6" fill="#F9BBD0" transform="rotate(-24 12 12)"/>
<ellipse cx="10" cy="10" rx="4" ry="2.5" fill="#FCE0EA" transform="rotate(-24 12 12)"/></svg>`;
}
export function leafFallSVG(){
  return`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18 Q4 6 20 4 Q20 16 8 20 Z" fill="#E5953F"/>
<path d="M6 18 Q12 12 18 6" fill="none" stroke="#C97430" stroke-width="1.6" stroke-linecap="round"/></svg>`;
}
export function snowflakeSVG(){
  return`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="8" fill="#FFFFFF" opacity=".95"/>
<circle cx="12" cy="12" r="4.5" fill="#EAF4FB"/></svg>`;
}
export function raindropSVG(){
  return`<svg viewBox="0 0 10 30" xmlns="http://www.w3.org/2000/svg">
<path d="M5 2 L5 28" stroke="#7EC8F5" stroke-width="4" stroke-linecap="round" opacity=".8"/></svg>`;
}
