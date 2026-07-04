// ── 住人（動物キャラ）SVGジェネレータ ──────────────────────────
// DESIGN_GUIDE準拠: 1.5頭身・丸顔・点の目・にこにこ・太線・フラット。
// 1つの基本形 + 種族ごとの耳/特徴の差分で12種を展開する。

const OL='#2F3A3D';

// species: dog cat rabbit bear panda fox pig frog penguin bird squirrel sheep
// c: {fur:毛色, dark:濃い毛色, shirt:服の色}
export function animalSVG(species,c){
  const ears={
    dog:`<path d="M18 22 Q8 30 12 46 Q20 48 26 38 Z" fill="${c.dark}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M62 22 Q72 30 68 46 Q60 48 54 38 Z" fill="${c.dark}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`,
    cat:`<path d="M20 24 L14 6 L34 14 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M60 24 L66 6 L46 14 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M22 20 L18 10 L30 15 Z" fill="#F7B2C9"/>
<path d="M58 20 L62 10 L50 15 Z" fill="#F7B2C9"/>`,
    rabbit:`<ellipse cx="27" cy="8" rx="8" ry="18" fill="${c.fur}" stroke="${OL}" stroke-width="3.5"/>
<ellipse cx="53" cy="8" rx="8" ry="18" fill="${c.fur}" stroke="${OL}" stroke-width="3.5"/>
<ellipse cx="27" cy="9" rx="3.5" ry="11" fill="#F7B2C9"/>
<ellipse cx="53" cy="9" rx="3.5" ry="11" fill="#F7B2C9"/>`,
    bear:`<circle cx="20" cy="16" r="9" fill="${c.fur}" stroke="${OL}" stroke-width="3.5"/>
<circle cx="60" cy="16" r="9" fill="${c.fur}" stroke="${OL}" stroke-width="3.5"/>
<circle cx="20" cy="16" r="4" fill="${c.dark}"/>
<circle cx="60" cy="16" r="4" fill="${c.dark}"/>`,
    panda:`<circle cx="19" cy="15" r="9" fill="#3A3A3A" stroke="${OL}" stroke-width="3.5"/>
<circle cx="61" cy="15" r="9" fill="#3A3A3A" stroke="${OL}" stroke-width="3.5"/>`,
    fox:`<path d="M18 24 L12 4 L34 12 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M62 24 L68 4 L46 12 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M21 19 L17 7 L30 12 Z" fill="${c.dark}"/>
<path d="M59 19 L63 7 L50 12 Z" fill="${c.dark}"/>`,
    pig:`<path d="M18 22 Q10 14 14 6 Q24 8 27 18 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M62 22 Q70 14 66 6 Q56 8 53 18 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`,
    frog:`<circle cx="24" cy="10" r="10" fill="${c.fur}" stroke="${OL}" stroke-width="3.5"/>
<circle cx="56" cy="10" r="10" fill="${c.fur}" stroke="${OL}" stroke-width="3.5"/>
<circle cx="24" cy="10" r="4" fill="${OL}"/>
<circle cx="56" cy="10" r="4" fill="${OL}"/>`,
    penguin:'',
    bird:`<path d="M40 8 Q34 -4 26 2 Q32 6 30 12 Q36 14 40 8Z" fill="${c.dark}" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`,
    squirrel:`<path d="M22 22 L18 8 L32 14 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M58 22 L62 8 L48 14 Z" fill="${c.fur}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M66 60 Q86 52 82 30 Q78 14 64 18 Q74 26 68 40 Q64 50 62 58Z" fill="${c.dark}" stroke="${OL}" stroke-width="3.5" stroke-linejoin="round"/>`,
    sheep:`<circle cx="24" cy="12" r="8" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="40" cy="8" r="9" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="56" cy="12" r="8" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>`,
  }[species]||'';

  // 顔の差分（目・鼻・口まわり）
  let face;
  if(species==='panda'){
    face=`<ellipse cx="29" cy="36" rx="7" ry="9" fill="#3A3A3A"/>
<ellipse cx="51" cy="36" rx="7" ry="9" fill="#3A3A3A"/>
<circle cx="30" cy="35" r="2.8" fill="#FFFFFF"/>
<circle cx="50" cy="35" r="2.8" fill="#FFFFFF"/>
<ellipse cx="40" cy="46" rx="4" ry="3" fill="${OL}"/>
<path d="M34 52 Q40 57 46 52" fill="none" stroke="#7A2E1D" stroke-width="3" stroke-linecap="round"/>`;
  }else if(species==='pig'){
    face=`<circle cx="30" cy="34" r="3.2" fill="${OL}"/>
<circle cx="50" cy="34" r="3.2" fill="${OL}"/>
<ellipse cx="40" cy="45" rx="9" ry="7" fill="${c.dark}" stroke="${OL}" stroke-width="3"/>
<circle cx="36.5" cy="45" r="1.8" fill="${OL}"/>
<circle cx="43.5" cy="45" r="1.8" fill="${OL}"/>
<path d="M31 54 Q40 59 49 54" fill="none" stroke="#7A2E1D" stroke-width="3" stroke-linecap="round"/>`;
  }else if(species==='penguin'||species==='bird'){
    face=`<circle cx="30" cy="33" r="3.2" fill="${OL}"/>
<circle cx="50" cy="33" r="3.2" fill="${OL}"/>
<path d="M33 42 L47 42 L40 51 Z" fill="#FFB74D" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/>`;
  }else{
    const muzzle=(species==='fox'||species==='dog'||species==='squirrel')
      ?`<ellipse cx="40" cy="47" rx="11" ry="8" fill="#FFF7EC" opacity=".9"/>`:'';
    const whiskers=species==='cat'
      ?`<path d="M14 40 L26 42 M14 48 L26 46 M66 40 L54 42 M66 48 L54 46" stroke="${OL}" stroke-width="2" stroke-linecap="round"/>`:'';
    face=`${muzzle}
<circle cx="30" cy="34" r="3.2" fill="${OL}"/>
<circle cx="50" cy="34" r="3.2" fill="${OL}"/>
<ellipse cx="40" cy="43" rx="3" ry="2.4" fill="${OL}"/>
<path d="M33 49 Q40 55 47 49" fill="none" stroke="#7A2E1D" stroke-width="3" stroke-linecap="round"/>
${whiskers}`;
  }

  const headFill=species==='penguin'?c.dark:c.fur;
  const headExtra=species==='penguin'
    ?`<path d="M40 16 Q22 16 18 36 Q28 26 40 28 Q52 26 62 36 Q58 16 40 16Z" fill="${c.dark}"/>
<ellipse cx="40" cy="42" rx="16" ry="14" fill="#FFFFFF"/>`
    :(species==='sheep'?`<circle cx="16" cy="26" r="7" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="64" cy="26" r="7" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>`:'');

  return `<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="40" cy="95" rx="20" ry="4" fill="rgba(0,0,0,.16)"/>
${ears}
<rect x="24" y="60" width="32" height="30" rx="13" fill="${c.shirt}" stroke="${OL}" stroke-width="3.5"/>
<path d="M25 68 Q40 76 55 68" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="21" cy="72" r="5.5" fill="${headFill}" stroke="${OL}" stroke-width="3"/>
<circle cx="59" cy="72" r="5.5" fill="${headFill}" stroke="${OL}" stroke-width="3"/>
<ellipse cx="31" cy="93" rx="6.5" ry="4.5" fill="${species==='penguin'?'#FFB74D':headFill}" stroke="${OL}" stroke-width="3"/>
<ellipse cx="49" cy="93" rx="6.5" ry="4.5" fill="${species==='penguin'?'#FFB74D':headFill}" stroke="${OL}" stroke-width="3"/>
<circle cx="40" cy="36" r="26" fill="${headFill}" stroke="${OL}" stroke-width="4"/>
${headExtra}
${face}
<circle cx="22" cy="43" r="4.5" fill="#F09A9A" opacity=".5"/>
<circle cx="58" cy="43" r="4.5" fill="#F09A9A" opacity=".5"/>
</svg>`;
}
