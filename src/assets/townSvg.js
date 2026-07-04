// ── 見下ろしタウン用SVG（地面・道路・自然・雲・建物20種） ───────
// DESIGN_GUIDE準拠: フラット絵本風・太線#2F3A3D・丸い形・やさしい色。
// 地面タイルは輪郭線なし（継ぎ目が見えないように）。

const OUTLINE='#2F3A3D';

// 季節パレット（実日付から state.currentSeason() で選ぶ）
export const SEASON_PALETTES={
  spring:{grass:'#A8D98A',grassLight:'#B2DF95',grassDark:'#9ED381',blade:'#8FCB74',
          leaf:'#8FD18A',leafDark:'#6FB56A',blossom:'#F9BBD0',snow:null,sky:'#A8D98A'},
  summer:{grass:'#96CF74',grassLight:'#A4D984',grassDark:'#89C468',blade:'#77B858',
          leaf:'#57A85C',leafDark:'#3F8E48',blossom:null,snow:null,sky:'#96CF74'},
  autumn:{grass:'#C9BC7C',grassLight:'#D4C88C',grassDark:'#BFB070',blade:'#AC9C5C',
          leaf:'#E5953F',leafDark:'#C97430',blossom:null,snow:null,sky:'#C9BC7C'},
  winter:{grass:'#E6EFF2',grassLight:'#EEF5F7',grassDark:'#DCE8EC',blade:'#C4D5DB',
          leaf:'#9FC49A',leafDark:'#84AC80',blossom:null,snow:'#FFFFFF',sky:'#E6EFF2'},
};

// 草地タイル 200×200。variant 0-2 で模様違い。pal で季節色。
export function grassTile(variant=0,pal=SEASON_PALETTES.spring){
  const dots=[
    [[36,60],[120,30],[170,140],[60,160],[150,90]],
    [[80,44],[30,120],[160,50],[110,170],[190,110]],
    [[50,30],[140,150],[24,170],[176,26],[100,100]],
  ][variant%3];
  const blades=dots.map(([x,y])=>
    `<path d="M${x} ${y+6} Q${x+3} ${y-4} ${x+6} ${y+6}" fill="none" stroke="${pal.blade}" stroke-width="4" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="${pal.grass}"/>
<circle cx="${dots[0][0]+40}" cy="${dots[1][1]+20}" r="26" fill="${pal.grassLight}" opacity=".8"/>
<circle cx="${dots[2][0]}" cy="${dots[2][1]-30}" r="18" fill="${pal.grassDark}" opacity=".8"/>
${blades}</svg>`;
}

// 道路タイル 200×200。type: 'h'横 'v'縦 'x'十字 'plaza'広場。pal で路肩の草色。
export function roadTile(type,pal=SEASON_PALETTES.spring){
  const band='#8B7355', edge='#7A644A', dash='#F5EFE0', g=pal.grass;
  if(type==='h')return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="${g}"/>
<rect x="0" y="46" width="200" height="108" fill="${band}"/>
<rect x="0" y="46" width="200" height="7" fill="${edge}"/>
<rect x="0" y="147" width="200" height="7" fill="${edge}"/>
<path d="M14 100 H50 M84 100 H120 M154 100 H190" stroke="${dash}" stroke-width="8" stroke-linecap="round"/></svg>`;
  if(type==='v')return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="${g}"/>
<rect x="46" y="0" width="108" height="200" fill="${band}"/>
<rect x="46" y="0" width="7" height="200" fill="${edge}"/>
<rect x="147" y="0" width="7" height="200" fill="${edge}"/>
<path d="M100 14 V50 M100 84 V120 M100 154 V190" stroke="${dash}" stroke-width="8" stroke-linecap="round"/></svg>`;
  if(type==='x')return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="${g}"/>
<rect x="0" y="46" width="200" height="108" fill="${band}"/>
<rect x="46" y="0" width="108" height="200" fill="${band}"/>
<circle cx="100" cy="100" r="10" fill="${dash}" opacity=".35"/></svg>`;
  // plaza: 石畳の広場
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="#D9C9A8"/>
<circle cx="100" cy="100" r="72" fill="#E6D8BB"/>
<circle cx="100" cy="100" r="46" fill="#EFE4CC"/>
<circle cx="100" cy="100" r="14" fill="#F3B94D" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M100 92 L103 99 L110 99 L104 103 L107 110 L100 105 L93 110 L96 103 L90 99 L97 99 Z" fill="#FFF7E0"/></svg>`;
}

// 木 140×170。季節対応: blossom=花の色（春）、snow=雪の色（冬）。
export function treeSVG(leaf='#74B86F',leafDark='#5FA35B',blossom=null,snow=null){
  const flowers=blossom?`
<circle cx="42" cy="52" r="8" fill="${blossom}" stroke="${OUTLINE}" stroke-width="2.5"/>
<circle cx="92" cy="46" r="7" fill="${blossom}" stroke="${OUTLINE}" stroke-width="2.5"/>
<circle cx="66" cy="34" r="6" fill="${blossom}" stroke="${OUTLINE}" stroke-width="2.5"/>
<circle cx="108" cy="76" r="6" fill="${blossom}" stroke="${OUTLINE}" stroke-width="2.5"/>
<circle cx="34" cy="94" r="6" fill="${blossom}" stroke="${OUTLINE}" stroke-width="2.5"/>`:'';
  const snowCaps=snow?`
<path d="M28 52 Q42 30 70 26 Q100 28 112 50 Q98 44 70 44 Q44 44 28 52Z" fill="${snow}" opacity=".92"/>
<ellipse cx="40" cy="80" rx="16" ry="8" fill="${snow}" opacity=".85"/>
<ellipse cx="100" cy="76" rx="14" ry="7" fill="${snow}" opacity=".85"/>`:'';
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="70" cy="162" rx="44" ry="7" fill="rgba(0,0,0,.14)"/>
<rect x="61" y="112" width="18" height="46" rx="7" fill="#8B6B4A" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="70" cy="66" r="48" fill="${leaf}" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="40" cy="86" r="30" fill="${leaf}" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="102" cy="84" r="28" fill="${leaf}" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="56" cy="58" r="12" fill="${leafDark}" opacity=".55"/>
<circle cx="90" cy="72" r="9" fill="${leafDark}" opacity=".55"/>
${snowCaps}${flowers}
<circle cx="60" cy="90" r="8" fill="#FFFFFF" opacity=".28"/></svg>`;
}

// 花 60×60
export function flowerSVG(petal='#F49AC1'){
  return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
<path d="M30 44 Q28 54 30 58" stroke="#5FA35B" stroke-width="4" fill="none" stroke-linecap="round"/>
${[0,72,144,216,288].map(a=>`<ellipse cx="30" cy="18" rx="9" ry="13" fill="${petal}" stroke="${OUTLINE}" stroke-width="3" transform="rotate(${a} 30 30)"/>`).join('')}
<circle cx="30" cy="30" r="8" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/></svg>`;
}

// 雲（未開放地区カバー）300×180。やわらかい白、輪郭なし。
export function cloudSVG(){
  return `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="150" cy="105" rx="140" ry="62" fill="#FFFFFF" opacity=".96"/>
<ellipse cx="80" cy="80" rx="66" ry="48" fill="#FFFFFF" opacity=".96"/>
<ellipse cx="205" cy="72" rx="72" ry="52" fill="#FFFFFF" opacity=".96"/>
<ellipse cx="150" cy="128" rx="120" ry="40" fill="#EDF4FA" opacity=".9"/></svg>`;
}

// 建設予定地マーカー（未完成ステージ用）120×110
export function lotSVG(){
  return `<svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="60" cy="102" rx="42" ry="6" fill="rgba(0,0,0,.12)"/>
<rect x="18" y="34" width="84" height="64" rx="8" fill="#E8DCC0" stroke="${OUTLINE}" stroke-width="4" stroke-dasharray="10 7"/>
<path d="M34 88 L60 24 L86 88 Z" fill="#FFB74D" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M46 70 H74 M52 54 H68" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/></svg>`;
}

// タップ誘導の光るリング 160×160
export function ringSVG(color='#FFE66D'){
  return `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
<circle cx="80" cy="80" r="66" fill="none" stroke="${color}" stroke-width="10" opacity=".95"/>
<circle cx="80" cy="80" r="52" fill="${color}" opacity=".22"/></svg>`;
}

// ── 建物20種（ステージ0-19対応） ────────────────────────────────
// 各車が建てた建物。viewBox 120×120・下端に影・DESIGN_GUIDE準拠。
// 共通ヘルパーで差分展開（基本形: いえ・みせ・タワー + 特殊形）。

const shadow=`<ellipse cx="60" cy="112" rx="42" ry="6" fill="rgba(0,0,0,.16)"/>`;
const win=(x,y,w=14,h=12,f='#A7D7F9')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${f}" stroke="${OUTLINE}" stroke-width="3"/>`;
const door=(x,y,w=18,h=22,f='#5F87A1')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${f}" stroke="${OUTLINE}" stroke-width="3"/>`;
const wrap=inner=>`<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">${shadow}${inner}</svg>`;

// 基本形1: 三角屋根のいえ
function houseBase({wall='#FFE0B2',roof='#E57373',sign=''}={}){
  return wrap(`
<path d="M20 52 L60 22 L100 52 V108 H20 Z" fill="${wall}" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M12 54 L60 16 L108 54" fill="none" stroke="${roof}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 54 L60 16 L108 54" fill="none" stroke="${OUTLINE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity=".3"/>
${door(51,84,18,24)}${win(28,62)}${win(78,62)}
${sign}`);
}
// 基本形2: 平屋根のみせ（ひさし付き）
function shopBase({wall='#F6DFC0',awn1='#FF7A5C',awn2='#FFFFFF',sign=''}={}){
  return wrap(`
<rect x="16" y="42" width="88" height="66" rx="6" fill="${wall}" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M12 42 H108 L102 26 H18 Z" fill="${awn1}" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M20 42 V52 M37 42 V52 M54 42 V52 M71 42 V52 M88 42 V52 M104 42 V52" stroke="${awn2}" stroke-width="6" stroke-linecap="round"/>
${door(66,80,20,28,'#74B86F')}${win(26,62,22,16)}${win(26,86,22,14)}
${sign}`);
}
// 基本形3: タワー（窓グリッド）
function towerBase({wall='#5F87D8',winf='#CDEFFF',floors=3,roofBand='#2E5AA7',sign=''}={}){
  let wins='';
  for(let r=0;r<floors;r++)for(let c=0;c<2;c++)
    wins+=win(34+c*32,40+r*20,18,13,winf);
  return wrap(`
<rect x="24" y="24" width="72" height="84" rx="6" fill="${wall}" stroke="${OUTLINE}" stroke-width="4"/>
<rect x="20" y="16" width="80" height="12" rx="5" fill="${roofBand}" stroke="${OUTLINE}" stroke-width="4"/>
${wins}${door(50,88,20,20)}
${sign}`);
}

const BUILDING_FNS=[
// 0 fire → おうち（火事からなおったいえ）
()=>houseBase({wall:'#FFE0B2',roof:'#E57373',
  sign:`<path d="M60 44 C55 40 52 37 53 34 C54 31 58 30 60 33 C62 30 66 31 67 34 C68 37 65 40 60 44Z" fill="#F15B64" stroke="${OUTLINE}" stroke-width="2"/>`}),
// 1 police → けいさつしょ
()=>towerBase({wall:'#7EA6D8',winf:'#DCEFFF',roofBand:'#2E5AA7',floors:2,
  sign:`<circle cx="60" cy="34" r="10" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M60 27 L62 32 L67 32 L63 35 L65 40 L60 37 L55 40 L57 35 L53 32 L58 32 Z" fill="#2E5AA7"/>
<rect x="44" y="10" width="32" height="9" rx="4" fill="#E64A3B" stroke="${OUTLINE}" stroke-width="3"/>`}),
// 2 ambu → びょういん
()=>towerBase({wall:'#FFFFFF',winf:'#CDEFFF',roofBand:'#EAF6FF',floors:2,
  sign:`<rect x="52" y="28" width="16" height="34" rx="3" fill="#E64A3B"/><rect x="43" y="37" width="34" height="16" rx="3" fill="#E64A3B"/>`}),
// 3 taxi → タクシーのりば
()=>shopBase({wall:'#FFF3D6',awn1:'#F9A825',awn2:'#2F3A3D',
  sign:`<rect x="38" y="8" width="44" height="15" rx="6" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/>
<circle cx="48" cy="15" r="3" fill="#2F3A3D"/><circle cx="60" cy="15" r="3" fill="#2F3A3D"/><circle cx="72" cy="15" r="3" fill="#2F3A3D"/>`}),
// 4 excav → けんせつじむしょ
()=>shopBase({wall:'#FFD9A6',awn1:'#FF8F00',awn2:'#FFFFFF',
  sign:`<path d="M46 8 L60 -2 L74 8 V22 H46 Z" transform="translate(0 10)" fill="#FFB74D" stroke="${OUTLINE}" stroke-width="3" stroke-linejoin="round"/>
<path d="M53 24 H67" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`}),
// 5 bull → こうじょう
()=>wrap(`
<rect x="14" y="52" width="92" height="56" rx="6" fill="#B0BEC5" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M14 52 L38 36 V52 L62 36 V52 L86 36 V52" fill="#CFD8DC" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<rect x="82" y="18" width="16" height="34" rx="4" fill="#90A4AE" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M86 12 Q80 6 88 2 Q97 5 93 14" fill="#CFD8DC" opacity=".8"/>
${win(24,66,16,14)}${win(48,66,16,14)}${door(74,80,20,28,'#546E7A')}`),
// 6 crane → オフィスビル
()=>towerBase({wall:'#8FB8E8',winf:'#EAF6FF',roofBand:'#4A6FA5',floors:3}),
// 7 dump → デパート
()=>shopBase({wall:'#F9C9D4',awn1:'#E91E63',awn2:'#FFFFFF',
  sign:`<circle cx="60" cy="14" r="9" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M56 14 L59 17 L65 11" fill="none" stroke="${OUTLINE}" stroke-width="2.5" stroke-linecap="round"/>`}),
// 8 bus → がっこう
()=>wrap(`
<rect x="12" y="40" width="96" height="68" rx="6" fill="#FFF3D6" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M8 40 H112 L104 26 H16 Z" fill="#74B86F" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<circle cx="60" cy="54" r="10" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M60 48 V54 L64 57" fill="none" stroke="${OUTLINE}" stroke-width="2.5" stroke-linecap="round"/>
<path d="M104 26 V12 M104 12 H120 L104 20 Z" stroke="${OUTLINE}" stroke-width="3" fill="#E64A3B" stroke-linejoin="round"/>
${win(22,72)}${win(46,72)}${win(84,72)}${door(50,84,20,24,'#8B6B4A')}`),
// 9 truck → ぎんこう
()=>wrap(`
<rect x="16" y="46" width="88" height="62" rx="4" fill="#F5F0E1" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M10 46 L60 20 L110 46 Z" fill="#D9C9A8" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M28 54 V100 M46 54 V100 M74 54 V100 M92 54 V100" stroke="#D9C9A8" stroke-width="9" stroke-linecap="round"/>
<path d="M28 54 V100 M46 54 V100 M74 54 V100 M92 54 V100" stroke="${OUTLINE}" stroke-width="2" opacity=".3"/>
<circle cx="60" cy="38" r="8" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M60 34 V42 M57 36 H63 M57 40 H63" stroke="${OUTLINE}" stroke-width="2"/>
${door(52,82,16,26,'#8B6B4A')}`),
// 10 mail → ゆうびんきょく
()=>shopBase({wall:'#FFD6D6',awn1:'#E64A3B',awn2:'#FFFFFF',
  sign:`<rect x="44" y="6" width="32" height="20" rx="4" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M44 8 L60 20 L76 8" fill="none" stroke="${OUTLINE}" stroke-width="2.5" stroke-linejoin="round"/>`}),
// 11 garb → リサイクルセンター
()=>wrap(`
<rect x="14" y="46" width="92" height="62" rx="8" fill="#C8E6C9" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M14 50 Q14 30 34 30 H86 Q106 30 106 50" fill="#74B86F" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="60" cy="66" r="15" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="3"/>
<polygon points="60,54 64,62 56,62" fill="#2E7D32"/>
<polygon points="70,70 63,73 66,65" fill="#2E7D32"/>
<polygon points="50,70 57,67 56,75" fill="#2E7D32"/>
${door(28,84,18,24,'#558B2F')}${win(76,84,20,14)}`),
// 12 tow → はくぶつかん
()=>wrap(`
<rect x="14" y="50" width="92" height="58" rx="3" fill="#EDE3D0" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M8 50 L60 22 L112 50 Z" fill="#D9C9A8" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M24 58 V100 M42 58 V100 M60 58 V100 M78 58 V100 M96 58 V100" stroke="#D9C9A8" stroke-width="10" stroke-linecap="round"/>
<circle cx="60" cy="40" r="7" fill="#6A1B9A" stroke="${OUTLINE}" stroke-width="3"/>`),
// 13 snow → スケートリンク
()=>wrap(`
<path d="M16 108 V64 Q16 34 60 34 Q104 34 104 64 V108 Z" fill="#DDF1FA" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M60 42 V58 M53 50 H67 M54 44 L66 56 M66 44 L54 56" stroke="#42A5F5" stroke-width="3.5" stroke-linecap="round"/>
${win(28,72,18,14,'#FFFFFF')}${win(74,72,18,14,'#FFFFFF')}${door(50,84,20,24,'#5F87A1')}`),
// 14 roller → こうえん
()=>wrap(`
<path d="M22 108 V56 Q22 40 38 40 H82 Q98 40 98 56 V108" fill="none" stroke="#8B6B4A" stroke-width="9" stroke-linecap="round"/>
<rect x="34" y="30" width="52" height="18" rx="9" fill="#74B86F" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="38" cy="76" r="16" fill="#8FD18A" stroke="${OUTLINE}" stroke-width="3.5"/>
<rect x="34" y="88" width="8" height="20" fill="#8B6B4A" stroke="${OUTLINE}" stroke-width="3"/>
<rect x="62" y="88" width="34" height="8" rx="4" fill="#FFB74D" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M66 96 V108 M92 96 V108" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>
<circle cx="86" cy="66" r="10" fill="#F49AC1" stroke="${OUTLINE}" stroke-width="3"/>`),
// 15 aerial → でんきや（しゅうりこうじょう）
()=>shopBase({wall:'#D8D2F2',awn1:'#7E57C2',awn2:'#FFFFFF',
  sign:`<circle cx="60" cy="15" r="10" fill="#FFF9C4" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M58 9 L55 16 H60 L57 22" fill="none" stroke="#FF8F00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`}),
// 16 ladder → おしろ
()=>wrap(`
<rect x="26" y="62" width="68" height="46" rx="4" fill="#F5F0E1" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M20 62 Q24 50 34 50 H86 Q96 50 100 62 Z" fill="#455A64" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<rect x="38" y="30" width="44" height="22" rx="3" fill="#F5F0E1" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M34 30 Q38 18 48 18 H72 Q82 18 86 30 Z" fill="#455A64" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<path d="M56 18 Q60 8 64 18" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/>
${win(38,72,12,10)}${win(70,72,12,10)}${door(51,84,18,24,'#8B6B4A')}`),
// 17 tanker → ガソリンスタンド
()=>wrap(`
<rect x="14" y="26" width="92" height="14" rx="6" fill="#E64A3B" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M24 40 V108 M96 40 V108" stroke="${OUTLINE}" stroke-width="6" stroke-linecap="round"/>
<rect x="60" y="60" width="26" height="48" rx="5" fill="#ECEFF1" stroke="${OUTLINE}" stroke-width="4"/>
<rect x="65" y="66" width="16" height="12" rx="2" fill="#B3E5FC" stroke="${OUTLINE}" stroke-width="2.5"/>
<path d="M86 70 Q94 70 94 80 V92" fill="none" stroke="${OUTLINE}" stroke-width="4" stroke-linecap="round"/>
<rect x="30" y="44" width="30" height="14" rx="4" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/>`),
// 18 school → だいがく
()=>wrap(`
<rect x="12" y="46" width="96" height="62" rx="5" fill="#D6E4F7" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M8 46 L60 22 L112 46 Z" fill="#2E5AA7" stroke="${OUTLINE}" stroke-width="4" stroke-linejoin="round"/>
<polygon points="46,34 60,28 74,34 60,40" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="2.5"/>
<path d="M72 36 V44" stroke="#FFE66D" stroke-width="2.5" stroke-linecap="round"/>
${win(22,58)}${win(48,58)}${win(84,58)}${win(22,80)}${win(84,80)}${door(50,82,20,26,'#4A6FA5')}`),
// 19 water → すいぞくかん
()=>wrap(`
<path d="M14 108 V70 Q14 36 60 36 Q106 36 106 70 V108 Z" fill="#7EC8F5" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M22 62 Q34 54 46 62 Q58 70 70 62 Q82 54 94 62" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" opacity=".85"/>
<circle cx="42" cy="82" r="10" fill="#FFB74D" stroke="${OUTLINE}" stroke-width="3"/>
<path d="M50 82 L58 76 V88 Z" fill="#FFB74D" stroke="${OUTLINE}" stroke-width="3" stroke-linejoin="round"/>
<circle cx="39" cy="80" r="2" fill="${OUTLINE}"/>
${door(70,84,20,24,'#2E5AA7')}`),
];

export function buildingSVG(stageIdx){
  const fn=BUILDING_FNS[stageIdx];
  return fn?fn():houseBase();
}

// 図鑑・完成演出用の建物名
export const BUILDING_NAMES=['おうち','けいさつしょ','びょういん','タクシーのりば','けんせつじむしょ','こうじょう','オフィスビル','デパート','がっこう','ぎんこう','ゆうびんきょく','リサイクルセンター','はくぶつかん','スケートリンク','こうえん','でんきや','おしろ','ガソリンスタンド','だいがく','すいぞくかん'];

// ── streakごほうび（広場のかざり） ──────────────────────────────
// 3日=風船 / 7日=虹 / 14日=金の噴水（TownSceneが streak に応じて広場に置く）

export function balloonSVG(color='#FF7A9A'){
  return `<svg viewBox="0 0 60 110" xmlns="http://www.w3.org/2000/svg">
<path d="M30 62 Q26 80 30 104" fill="none" stroke="${OUTLINE}" stroke-width="3" stroke-linecap="round"/>
<ellipse cx="30" cy="32" rx="24" ry="29" fill="${color}" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M24 60 L30 68 L36 60 Z" fill="${color}" stroke="${OUTLINE}" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="21" cy="22" rx="7" ry="10" fill="#FFFFFF" opacity=".4"/></svg>`;
}

export function rainbowSVG(){
  const bands=[['#F15B64',56],['#FFB74D',48],['#FFE66D',40],['#74B86F',32],['#5F87D8',24]];
  return `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
${bands.map(([c,r])=>`<path d="M${80-r} 84 A${r} ${r} 0 0 1 ${80+r} 84" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`).join('')}
<ellipse cx="22" cy="82" rx="16" ry="10" fill="#FFFFFF" opacity=".95"/>
<ellipse cx="138" cy="82" rx="16" ry="10" fill="#FFFFFF" opacity=".95"/></svg>`;
}

export function fountainSVG(){
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="60" cy="110" rx="46" ry="8" fill="rgba(0,0,0,.14)"/>
<path d="M18 92 Q18 78 32 78 H88 Q102 78 102 92 Q102 108 60 108 Q18 108 18 92Z" fill="#FFD65C" stroke="${OUTLINE}" stroke-width="4"/>
<ellipse cx="60" cy="82" rx="34" ry="9" fill="#7EC8F5" stroke="${OUTLINE}" stroke-width="3"/>
<rect x="52" y="46" width="16" height="34" rx="6" fill="#F3B94D" stroke="${OUTLINE}" stroke-width="4"/>
<path d="M60 40 Q46 26 38 42 M60 40 Q74 26 82 42 M60 38 V24" fill="none" stroke="#7EC8F5" stroke-width="6" stroke-linecap="round"/>
<circle cx="38" cy="46" r="4" fill="#A7D7F9"/><circle cx="82" cy="46" r="4" fill="#A7D7F9"/><circle cx="60" cy="19" r="5" fill="#A7D7F9"/>
<circle cx="60" cy="44" r="7" fill="#FFE66D" stroke="${OUTLINE}" stroke-width="3"/></svg>`;
}

// ── 天気・季節パーティクル用の小さなかけら ──────────────────────
export function petalSVG(){
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="12" cy="12" rx="9" ry="6" fill="#F9BBD0" transform="rotate(-24 12 12)"/>
<ellipse cx="10" cy="10" rx="4" ry="2.5" fill="#FCE0EA" transform="rotate(-24 12 12)"/></svg>`;
}
export function leafFallSVG(){
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18 Q4 6 20 4 Q20 16 8 20 Z" fill="#E5953F"/>
<path d="M6 18 Q12 12 18 6" fill="none" stroke="#C97430" stroke-width="1.6" stroke-linecap="round"/></svg>`;
}
export function snowflakeSVG(){
  return `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="8" fill="#FFFFFF" opacity=".95"/>
<circle cx="12" cy="12" r="4.5" fill="#EAF4FB"/></svg>`;
}
export function raindropSVG(){
  return `<svg viewBox="0 0 10 30" xmlns="http://www.w3.org/2000/svg">
<path d="M5 2 L5 28" stroke="#7EC8F5" stroke-width="4" stroke-linecap="round" opacity=".8"/></svg>`;
}
