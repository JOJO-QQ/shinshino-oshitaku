// ── 住人（動物キャラ）SVGジェネレータ（どうぶつの森ライク v2） ──
// ふっくら立体感: 顔は放射グラデ・目にハイライト・ほっぺ・柔らか影。
// 1つの基本形 + 種族ごとの耳/特徴の差分で12種+αを展開する。

let _uid=0;
const uq=()=>`pp${(_uid++).toString(36)}`;
function mix(hex,to,f){
  const h=hex.replace('#',''),t=to.replace('#','');
  const c=i=>Math.round(parseInt(h.substr(i,2),16)*(1-f)+parseInt(t.substr(i,2),16)*f)
    .toString(16).padStart(2,'0');
  return`#${c(0)}${c(2)}${c(4)}`;
}
const lite=(c,f=.35)=>mix(c,'#FFFFFF',f);
const dark=(c,f=.25)=>mix(c,'#000000',f);

const OL='#7C5A33';   // 暖かいブラウンの輪郭
const INK='#3A2A1A';  // 目・鼻

// species: dog cat rabbit bear panda fox pig frog penguin bird squirrel sheep
// c: {fur:毛色, dark:濃い毛色, shirt:服の色}
export function animalSVG(species,c){
  const hg=uq(),sg=uq(),f=uq();
  const furOL=dark(c.fur,.5)==='#000000'?OL:mix(dark(c.fur,.45),'#7C5A33',.4);
  const defs=`<defs>
<radialGradient id="${hg}" cx=".38" cy=".32" r=".92">
<stop offset="0" stop-color="${lite(c.fur,.32)}"/><stop offset=".62" stop-color="${c.fur}"/><stop offset="1" stop-color="${dark(c.fur,.16)}"/></radialGradient>
<linearGradient id="${sg}" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="${lite(c.shirt,.3)}"/><stop offset="1" stop-color="${dark(c.shirt,.12)}"/></linearGradient>
<filter id="${f}" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>`;

  const ears={
    dog:`<path d="M18 22 Q8 30 12 46 Q20 48 26 38 Z" fill="${c.dark}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M62 22 Q72 30 68 46 Q60 48 54 38 Z" fill="${c.dark}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>`,
    cat:`<path d="M20 24 L14 6 L34 14 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M60 24 L66 6 L46 14 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M22 20 L18 10 L30 15 Z" fill="#F7B2C9"/>
<path d="M58 20 L62 10 L50 15 Z" fill="#F7B2C9"/>`,
    rabbit:`<ellipse cx="27" cy="8" rx="8" ry="18" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5"/>
<ellipse cx="53" cy="8" rx="8" ry="18" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5"/>
<ellipse cx="27" cy="9" rx="3.5" ry="11" fill="#F7B2C9"/>
<ellipse cx="53" cy="9" rx="3.5" ry="11" fill="#F7B2C9"/>`,
    bear:`<circle cx="20" cy="16" r="9" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5"/>
<circle cx="60" cy="16" r="9" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5"/>
<circle cx="20" cy="16" r="4" fill="${c.dark}"/>
<circle cx="60" cy="16" r="4" fill="${c.dark}"/>`,
    panda:`<circle cx="19" cy="15" r="9" fill="#4A4A4A" stroke="#2E2E2E" stroke-width="3.5"/>
<circle cx="61" cy="15" r="9" fill="#4A4A4A" stroke="#2E2E2E" stroke-width="3.5"/>
<circle cx="17" cy="12" r="3" fill="#6E6E6E"/>
<circle cx="59" cy="12" r="3" fill="#6E6E6E"/>`,
    fox:`<path d="M18 24 L12 4 L34 12 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M62 24 L68 4 L46 12 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M21 19 L17 7 L30 12 Z" fill="${c.dark}"/>
<path d="M59 19 L63 7 L50 12 Z" fill="${c.dark}"/>`,
    pig:`<path d="M18 22 Q10 14 14 6 Q24 8 27 18 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M62 22 Q70 14 66 6 Q56 8 53 18 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>`,
    frog:`<circle cx="24" cy="10" r="10" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5"/>
<circle cx="56" cy="10" r="10" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5"/>
<circle cx="24" cy="10" r="4" fill="${INK}"/><circle cx="25.4" cy="8.6" r="1.4" fill="#fff"/>
<circle cx="56" cy="10" r="4" fill="${INK}"/><circle cx="57.4" cy="8.6" r="1.4" fill="#fff"/>`,
    penguin:'',
    bird:`<path d="M40 8 Q34 -4 26 2 Q32 6 30 12 Q36 14 40 8Z" fill="${c.dark}" stroke="${furOL}" stroke-width="3" stroke-linejoin="round"/>`,
    squirrel:`<path d="M22 22 L18 8 L32 14 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M58 22 L62 8 L48 14 Z" fill="${c.fur}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M66 60 Q86 52 82 30 Q78 14 64 18 Q74 26 68 40 Q64 50 62 58Z" fill="${c.dark}" stroke="${furOL}" stroke-width="3.5" stroke-linejoin="round"/>
<path d="M72 30 Q76 38 70 48" stroke="${lite(c.dark,.3)}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`,
    sheep:`<circle cx="24" cy="12" r="8" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="40" cy="8" r="9" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="56" cy="12" r="8" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="36" cy="6" r="3" fill="#FFFFFF"/>`,
  }[species]||'';

  // 顔の差分（目・鼻・口まわり）
  const eyes=(lx,rx,y)=>`<circle cx="${lx}" cy="${y}" r="3.4" fill="${INK}"/>
<circle cx="${lx+1.3}" cy="${y-1.3}" r="1.3" fill="#fff"/>
<circle cx="${rx}" cy="${y}" r="3.4" fill="${INK}"/>
<circle cx="${rx+1.3}" cy="${y-1.3}" r="1.3" fill="#fff"/>`;
  let face;
  if(species==='panda'){
    face=`<ellipse cx="29" cy="36" rx="7" ry="9" fill="#4A4A4A"/>
<ellipse cx="51" cy="36" rx="7" ry="9" fill="#4A4A4A"/>
<circle cx="30" cy="35" r="2.8" fill="#FFFFFF"/><circle cx="31" cy="34" r="1.1" fill="#4A4A4A"/>
<circle cx="50" cy="35" r="2.8" fill="#FFFFFF"/><circle cx="51" cy="34" r="1.1" fill="#4A4A4A"/>
<ellipse cx="40" cy="46" rx="4" ry="3" fill="${INK}"/>
<path d="M34 52 Q40 57 46 52" fill="none" stroke="#7A2E1D" stroke-width="3" stroke-linecap="round"/>`;
  }else if(species==='pig'){
    face=`${eyes(30,50,34)}
<ellipse cx="40" cy="45" rx="9" ry="7" fill="${c.dark}" stroke="${furOL}" stroke-width="3"/>
<ellipse cx="37" cy="42.6" rx="3.5" ry="2" fill="${lite(c.dark,.4)}"/>
<circle cx="36.5" cy="45" r="1.8" fill="${INK}"/>
<circle cx="43.5" cy="45" r="1.8" fill="${INK}"/>
<path d="M31 54 Q40 59 49 54" fill="none" stroke="#7A2E1D" stroke-width="3" stroke-linecap="round"/>`;
  }else if(species==='penguin'||species==='bird'){
    face=`${eyes(30,50,33)}
<path d="M33 42 L47 42 L40 51 Z" fill="#F8B84A" stroke="#C4842A" stroke-width="3" stroke-linejoin="round"/>
<path d="M35.5 43.5 Q38 45 40 44" stroke="#FFDFA6" stroke-width="2" stroke-linecap="round" fill="none"/>`;
  }else{
    const muzzle=(species==='fox'||species==='dog'||species==='squirrel'||species==='bear')
      ?`<ellipse cx="40" cy="46" rx="12" ry="9" fill="${lite(c.fur,.55)}" opacity=".95"/>`:'';
    const whiskers=species==='cat'
      ?`<path d="M14 40 L26 42 M14 48 L26 46 M66 40 L54 42 M66 48 L54 46" stroke="${furOL}" stroke-width="2" stroke-linecap="round" opacity=".8"/>`:'';
    face=`${muzzle}
${eyes(30,50,34)}
<ellipse cx="40" cy="43" rx="3.2" ry="2.5" fill="${INK}"/>
<path d="M33 49 Q40 55 47 49" fill="none" stroke="#7A2E1D" stroke-width="3" stroke-linecap="round"/>
${whiskers}`;
  }

  const headFill=species==='penguin'?c.dark:`url(#${hg})`;
  const headOL=species==='penguin'?dark(c.dark,.35):(species==='panda'?'#5A5A5A':furOL);
  const headExtra=species==='penguin'
    ?`<path d="M40 16 Q22 16 18 36 Q28 26 40 28 Q52 26 62 36 Q58 16 40 16Z" fill="${c.dark}"/>
<ellipse cx="40" cy="42" rx="16" ry="14" fill="#FFFFFF"/>
<ellipse cx="34" cy="24" rx="6" ry="4" fill="${lite(c.dark,.25)}" opacity=".8"/>`
    :(species==='sheep'?`<circle cx="16" cy="26" r="7" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>
<circle cx="64" cy="26" r="7" fill="#FFF7EC" stroke="${OL}" stroke-width="3"/>`:
    `<ellipse cx="30" cy="22" rx="10" ry="6" fill="${lite(c.fur,.4)}" opacity=".55" transform="rotate(-18 30 22)"/>`);

  const handFill=species==='penguin'?c.dark:c.fur;
  const footFill=species==='penguin'?'#F8B84A':c.fur;
  return`<svg viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
${defs}
<ellipse cx="40" cy="94" rx="21" ry="5" fill="#2F5E2A" opacity=".32" filter="url(#${f})"/>
${ears}
<rect x="24" y="60" width="32" height="30" rx="13" fill="url(#${sg})" stroke="${dark(c.shirt,.35)}" stroke-width="3.5"/>
<path d="M27 66 Q40 73 53 66" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity=".5"/>
<circle cx="21" cy="72" r="5.5" fill="${handFill}" stroke="${headOL}" stroke-width="3"/>
<circle cx="59" cy="72" r="5.5" fill="${handFill}" stroke="${headOL}" stroke-width="3"/>
<ellipse cx="31" cy="93" rx="6.5" ry="4.5" fill="${footFill}" stroke="${headOL}" stroke-width="3"/>
<ellipse cx="49" cy="93" rx="6.5" ry="4.5" fill="${footFill}" stroke="${headOL}" stroke-width="3"/>
<circle cx="40" cy="36" r="26" fill="${headFill}" stroke="${headOL}" stroke-width="4"/>
${headExtra}
${face}
<ellipse cx="22" cy="43" rx="5" ry="4" fill="#F09A9A" opacity=".6"/>
<ellipse cx="58" cy="43" rx="5" ry="4" fill="#F09A9A" opacity=".6"/>
</svg>`;
}
