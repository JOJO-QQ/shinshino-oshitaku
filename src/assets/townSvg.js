// ── 見下ろしタウン用SVG（Phase 1: 地面・道路・自然・雲） ───────
// DESIGN_GUIDE準拠: フラット絵本風・太線#2F3A3D・丸い形・やさしい色。
// 地面タイルは輪郭線なし（継ぎ目が見えないように）。

const OUTLINE='#2F3A3D';

// 草地タイル 200×200。variant 0-2 で模様違い。
export function grassTile(variant=0){
  const dots=[
    [[36,60],[120,30],[170,140],[60,160],[150,90]],
    [[80,44],[30,120],[160,50],[110,170],[190,110]],
    [[50,30],[140,150],[24,170],[176,26],[100,100]],
  ][variant%3];
  const blades=dots.map(([x,y])=>
    `<path d="M${x} ${y+6} Q${x+3} ${y-4} ${x+6} ${y+6}" fill="none" stroke="#8FCB74" stroke-width="4" stroke-linecap="round"/>`).join('');
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="#A8D98A"/>
<circle cx="${dots[0][0]+40}" cy="${dots[1][1]+20}" r="26" fill="#B2DF95" opacity=".8"/>
<circle cx="${dots[2][0]}" cy="${dots[2][1]-30}" r="18" fill="#9ED381" opacity=".8"/>
${blades}</svg>`;
}

// 道路タイル 200×200。type: 'h'横 'v'縦 'x'十字 'plaza'広場
export function roadTile(type){
  const band='#8B7355', edge='#7A644A', dash='#F5EFE0';
  if(type==='h')return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="#A8D98A"/>
<rect x="0" y="46" width="200" height="108" fill="${band}"/>
<rect x="0" y="46" width="200" height="7" fill="${edge}"/>
<rect x="0" y="147" width="200" height="7" fill="${edge}"/>
<path d="M14 100 H50 M84 100 H120 M154 100 H190" stroke="${dash}" stroke-width="8" stroke-linecap="round"/></svg>`;
  if(type==='v')return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="#A8D98A"/>
<rect x="46" y="0" width="108" height="200" fill="${band}"/>
<rect x="46" y="0" width="7" height="200" fill="${edge}"/>
<rect x="147" y="0" width="7" height="200" fill="${edge}"/>
<path d="M100 14 V50 M100 84 V120 M100 154 V190" stroke="${dash}" stroke-width="8" stroke-linecap="round"/></svg>`;
  if(type==='x')return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
<rect width="200" height="200" fill="#A8D98A"/>
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

// 木 140×170。leafColor差し替えで季節対応（Phase 2）。
export function treeSVG(leaf='#74B86F',leafDark='#5FA35B'){
  return `<svg viewBox="0 0 140 170" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="70" cy="162" rx="44" ry="7" fill="rgba(0,0,0,.14)"/>
<rect x="61" y="112" width="18" height="46" rx="7" fill="#8B6B4A" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="70" cy="66" r="48" fill="${leaf}" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="40" cy="86" r="30" fill="${leaf}" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="102" cy="84" r="28" fill="${leaf}" stroke="${OUTLINE}" stroke-width="4"/>
<circle cx="56" cy="58" r="12" fill="${leafDark}" opacity=".55"/>
<circle cx="90" cy="72" r="9" fill="${leafDark}" opacity=".55"/>
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
