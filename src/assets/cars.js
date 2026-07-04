// ── CAR SVG ──────────────────────────────────────────────────
// index.html(v5) 行799-2073 から無改変で移設（20車種の手描きSVG関数群）。
import {STAGES} from '../data/stages.js';

function vis(i,dots,animIdx){
  if(!dots[i]) return 'style="opacity:0"';
  if(i===animIdx) return 'style="animation:partSnap .55s cubic-bezier(.34,1.56,.64,1) .05s both"';
  return '';
}

// ── 消防車 SVG ───────────────────────────────────────────────
function fireTruckSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="5" y="30" width="85" height="80" rx="10" fill="#D0D0D0"/>
<rect x="84" y="52" width="110" height="58" rx="8" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="160" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="84" y="52" width="110" height="58" rx="8" fill="#E53935" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="30" width="85" height="80" rx="10" fill="#E53935" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="7" y="30" width="81" height="18" rx="8" fill="#C62828"/>
<rect x="13" y="38" width="68" height="42" rx="7" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="16" y="41" width="26" height="15" rx="4" fill="rgba(255,255,255,.72)"/>
<line x1="48" y1="38" x2="48" y2="80" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="3" y="74" width="13" height="22" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="9" cy="85" rx="4" ry="7" fill="#FFEE58"/>
<rect x="3" y="97" width="20" height="11" rx="5" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<rect x="3" y="77" width="11" height="19" rx="2" fill="#B71C1C"/>
<line x1="3" y1="82" x2="14" y2="82" stroke="#EF5350" stroke-width="1.5"/>
<line x1="3" y1="87" x2="14" y2="87" stroke="#EF5350" stroke-width="1.5"/>
<line x1="3" y1="92" x2="14" y2="92" stroke="#EF5350" stroke-width="1.5"/>
<line x1="55" y1="55" x2="55" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<line x1="114" y1="56" x2="114" y2="108" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<line x1="152" y1="56" x2="152" y2="108" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<rect x="190" y="62" width="6" height="14" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="160" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="160" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="160" cy="120" r="6" fill="#9E9E9E"/><circle cx="160" cy="120" r="2.5" fill="#424242"/>
<circle cx="160" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M144 113 Q160 107 176 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="17" y="18" width="58" height="14" rx="6" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="35" cy="18" rx="14" ry="10" fill="#F44336" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="32" cy="15" rx="6" ry="3.5" fill="rgba(255,255,255,.6)"/>
<ellipse cx="59" cy="18" rx="14" ry="10" fill="#1E88E5" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="56" cy="15" rx="6" ry="3.5" fill="rgba(255,255,255,.6)"/>
</g>
<g ${v(3)}>
<path d="M66 62 L53 65 L53 76 Q53 84 66 88 Q79 84 79 76 L79 65 Z" fill="#FFD700" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"/>
<line x1="60" y1="70" x2="72" y2="82" stroke="#E65100" stroke-width="2.5" stroke-linecap="round"/>
<line x1="72" y1="70" x2="60" y2="82" stroke="#E65100" stroke-width="2.5" stroke-linecap="round"/>
<path d="M56 65 Q66 62 78 65" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.8" stroke-linecap="round"/>
</g>
<g ${v(4)}>
<rect x="86" y="40" width="108" height="14" rx="4" fill="#90A4AE" stroke="#1A1A1A" stroke-width="2"/>
<line x1="86" y1="44" x2="194" y2="44" stroke="#78909C" stroke-width="1.5"/>
<line x1="86" y1="51" x2="194" y2="51" stroke="#78909C" stroke-width="1.5"/>
<line x1="97" y1="40" x2="97" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="109" y1="40" x2="109" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="121" y1="40" x2="121" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="133" y1="40" x2="133" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="145" y1="40" x2="145" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="157" y1="40" x2="157" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="169" y1="40" x2="169" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<line x1="181" y1="40" x2="181" y2="54" stroke="#607D8B" stroke-width="1.8"/>
<rect x="86" y="38" width="12" height="18" rx="3" fill="#607D8B" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="182" y="38" width="12" height="18" rx="3" fill="#607D8B" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── パトカー SVG ─────────────────────────────────────────────
function policeSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="80" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="60" width="184" height="46" rx="8" fill="#D0D0D0"/>
<rect x="50" y="32" width="100" height="32" rx="10" fill="#C4C4C4"/>
<circle cx="46" cy="116" r="16" fill="#B0B0B0"/><circle cx="154" cy="116" r="16" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="8" y="60" width="184" height="46" rx="8" fill="#F5F5F5" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="50" y="32" width="100" height="32" rx="10" fill="#F5F5F5" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="8" y="60" width="44" height="16" rx="4" fill="#2A2A2A" opacity="0.75"/>
<rect x="148" y="60" width="44" height="16" rx="4" fill="#2A2A2A" opacity="0.75"/>
<rect x="8" y="76" width="184" height="12" rx="0" fill="#1565C0" opacity="0.9"/>
<line x1="50" y1="60" x2="60" y2="32" stroke="#1A1A1A" stroke-width="2.5"/>
<line x1="150" y1="60" x2="140" y2="32" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="54" y="34" width="40" height="26" rx="5" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="57" y="37" width="15" height="10" rx="3" fill="rgba(255,255,255,.72)"/>
<rect x="106" y="34" width="40" height="26" rx="5" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="109" y="37" width="15" height="10" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="100" y1="62" x2="100" y2="105" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="4" y="67" width="14" height="11" rx="3" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="182" y="66" width="10" height="14" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="4" y="95" width="22" height="10" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
<rect x="174" y="95" width="22" height="10" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
</g>
<g ${v(1)}>
<circle cx="46" cy="116" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="46" cy="116" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="46" cy="116" r="5" fill="#9E9E9E"/><circle cx="46" cy="116" r="2" fill="#424242"/>
<circle cx="46" cy="116" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M32 110 Q46 104 60 110" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="154" cy="116" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="154" cy="116" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="154" cy="116" r="5" fill="#9E9E9E"/><circle cx="154" cy="116" r="2" fill="#424242"/>
<circle cx="154" cy="116" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M140 110 Q154 104 168 110" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="66" y="20" width="68" height="14" rx="6" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="82" cy="20" rx="14" ry="10" fill="#F44336" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="79" cy="17" rx="6" ry="3.5" fill="rgba(255,255,255,.6)"/>
<ellipse cx="100" cy="20" rx="14" ry="10" fill="#EEEEEE" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="118" cy="20" rx="14" ry="10" fill="#1E88E5" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="115" cy="17" rx="6" ry="3.5" fill="rgba(255,255,255,.6)"/>
</g>
<g ${v(3)}>
<polygon points="100,64 103,72 112,72 105.5,77 108,85 100,80 92,85 94.5,77 88,72 97,72" fill="#FFD700" stroke="#1A1A1A" stroke-width="1.8"/>
<circle cx="100" cy="75" r="4.5" fill="#1565C0" stroke="#1A1A1A" stroke-width="1"/>
<circle cx="100" cy="75" r="2" fill="#FFD700"/>
</g>
<g ${v(4)}>
<rect x="148" y="22" width="24" height="12" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
<path d="M148 23 L162 27 L162 29 L148 33 Z" fill="#616161" stroke="#1A1A1A" stroke-width="1.5" stroke-linejoin="round"/>
<ellipse cx="170" cy="28" rx="4" ry="6" fill="#424242" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── 救急車 SVG ───────────────────────────────────────────────
function ambuSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="68" y="22" width="124" height="86" rx="8" fill="#D2D2D2"/>
<rect x="5" y="28" width="67" height="80" rx="8" fill="#C4C4C4"/>
<circle cx="42" cy="118" r="17" fill="#AEAEAE"/><circle cx="160" cy="118" r="17" fill="#AEAEAE"/>
<g ${v(0)}>
<rect x="68" y="22" width="124" height="86" rx="8" fill="#F8F8F8" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="28" width="67" height="80" rx="8" fill="#F0F0F0" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="68" y="66" width="124" height="14" fill="#E65100" opacity="0.85"/>
<rect x="7" y="28" width="63" height="15" rx="6" fill="#E65100" opacity="0.7"/>
<line x1="70" y1="22" x2="70" y2="108" stroke="#1A1A1A" stroke-width="2"/>
<rect x="10" y="36" width="52" height="42" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="13" y="39" width="20" height="14" rx="4" fill="rgba(255,255,255,.72)"/>
<line x1="37" y1="36" x2="37" y2="78" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="3" y="70" width="10" height="16" rx="3" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="3" y="96" width="18" height="10" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
<line x1="183" y1="24" x2="183" y2="106" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="34" width="5" height="14" rx="2" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="42" cy="118" r="17" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="42" cy="118" r="10" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="42" cy="118" r="5.5" fill="#9E9E9E"/><circle cx="42" cy="118" r="2.5" fill="#424242"/>
<circle cx="42" cy="118" r="15" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M27 111 Q42 105 57 111" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="160" cy="118" r="17" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="160" cy="118" r="10" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="160" cy="118" r="5.5" fill="#9E9E9E"/><circle cx="160" cy="118" r="2.5" fill="#424242"/>
<circle cx="160" cy="118" r="15" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M145 111 Q160 105 175 111" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="16" width="50" height="13" rx="6" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="33" cy="16" rx="13" ry="9" fill="#F44336" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="30" cy="13" rx="5.5" ry="3" fill="rgba(255,255,255,.6)"/>
<ellipse cx="55" cy="16" rx="13" ry="9" fill="#F44336" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="52" cy="13" rx="5.5" ry="3" fill="rgba(255,255,255,.6)"/>
</g>
<g ${v(3)}>
<rect x="108" y="32" width="48" height="48" rx="6" fill="white" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="124" y="36" width="16" height="40" rx="4" fill="#E53935"/>
<rect x="112" y="50" width="40" height="16" rx="4" fill="#E53935"/>
</g>
<g ${v(4)}>
<rect x="78" y="32" width="26" height="20" rx="5" fill="#E53935" stroke="#1A1A1A" stroke-width="2"/>
<rect x="87" y="28" width="8" height="6" rx="3" fill="#C62828" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="88" y="35" width="6" height="14" rx="2" fill="white" opacity="0.9"/>
<rect x="82" y="41" width="18" height="6" rx="2" fill="white" opacity="0.9"/>
</g>
</svg>`;
}

// ── タクシー SVG ─────────────────────────────────────────────
function taxiSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="80" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="60" width="184" height="46" rx="8" fill="#D0D0D0"/>
<rect x="50" y="32" width="100" height="32" rx="10" fill="#C4C4C4"/>
<circle cx="46" cy="116" r="16" fill="#B0B0B0"/><circle cx="154" cy="116" r="16" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="8" y="60" width="184" height="46" rx="8" fill="#F9A825" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="50" y="32" width="100" height="32" rx="10" fill="#F9A825" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<line x1="50" y1="60" x2="60" y2="32" stroke="#1A1A1A" stroke-width="2.5"/>
<line x1="150" y1="60" x2="140" y2="32" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="54" y="34" width="40" height="26" rx="5" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="57" y="37" width="15" height="10" rx="3" fill="rgba(255,255,255,.72)"/>
<rect x="106" y="34" width="40" height="26" rx="5" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="109" y="37" width="15" height="10" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="100" y1="62" x2="100" y2="105" stroke="rgba(0,0,0,.28)" stroke-width="2"/>
<rect x="5" y="68" width="14" height="10" rx="3" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="183" y="66" width="9" height="14" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="4" y="96" width="20" height="10" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
<rect x="176" y="96" width="20" height="10" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
<rect x="72" y="76" width="18" height="4" rx="2" fill="rgba(0,0,0,.18)"/>
<rect x="110" y="76" width="18" height="4" rx="2" fill="rgba(0,0,0,.18)"/>
</g>
<g ${v(1)}>
<circle cx="46" cy="116" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="46" cy="116" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="46" cy="116" r="5" fill="#9E9E9E"/><circle cx="46" cy="116" r="2" fill="#424242"/>
<circle cx="46" cy="116" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M32 110 Q46 104 60 110" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="154" cy="116" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="154" cy="116" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="154" cy="116" r="5" fill="#9E9E9E"/><circle cx="154" cy="116" r="2" fill="#424242"/>
<circle cx="154" cy="116" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M140 110 Q154 104 168 110" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="136" y="22" width="30" height="12" rx="5" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2"/>
<rect x="138" y="24" width="26" height="8" rx="3" fill="#FFD54F"/>
<rect x="141" y="26" width="20" height="4" rx="1" fill="#E65100" opacity="0.6"/>
</g>
<g ${v(3)}>
<rect x="52" y="68" width="96" height="16" rx="3" fill="white" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="52" y="68" width="8" height="8" fill="#1A1A1A"/><rect x="68" y="68" width="8" height="8" fill="#1A1A1A"/>
<rect x="84" y="68" width="8" height="8" fill="#1A1A1A"/><rect x="100" y="68" width="8" height="8" fill="#1A1A1A"/>
<rect x="116" y="68" width="8" height="8" fill="#1A1A1A"/><rect x="132" y="68" width="8" height="8" fill="#1A1A1A"/>
<rect x="60" y="76" width="8" height="8" fill="#1A1A1A"/><rect x="76" y="76" width="8" height="8" fill="#1A1A1A"/>
<rect x="92" y="76" width="8" height="8" fill="#1A1A1A"/><rect x="108" y="76" width="8" height="8" fill="#1A1A1A"/>
<rect x="124" y="76" width="8" height="8" fill="#1A1A1A"/><rect x="140" y="76" width="8" height="8" fill="#1A1A1A"/>
</g>
<g ${v(4)}>
<rect x="70" y="20" width="60" height="14" rx="5" fill="white" stroke="#1A1A1A" stroke-width="2"/>
<rect x="72" y="22" width="56" height="10" rx="3" fill="#F9A825"/>
<rect x="77" y="24" width="6" height="6" rx="1" fill="#1A1A1A"/>
<rect x="87" y="24" width="6" height="6" rx="1" fill="#1A1A1A"/>
<rect x="87" y="24" width="12" height="2" fill="#1A1A1A"/>
<rect x="103" y="24" width="6" height="6" rx="1" fill="#1A1A1A"/>
<rect x="103" y="26" width="6" height="2" fill="#1A1A1A"/>
<rect x="113" y="24" width="2" height="6" fill="#1A1A1A"/>
<rect x="117" y="24" width="2" height="6" fill="#1A1A1A"/>
</g>
</svg>`;
}

// ── ショベルカー SVG ─────────────────────────────────────────
function excavSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="10" y="110" width="180" height="28" rx="14" fill="#D0D0D0"/>
<rect x="18" y="64" width="160" height="46" rx="8" fill="#C4C4C4"/>
<rect x="20" y="40" width="62" height="46" rx="8" fill="#BDBDBD"/>
<g ${v(0)}>
<rect x="18" y="64" width="160" height="46" rx="8" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="20" y="40" width="62" height="48" rx="8" fill="#E65100" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="22" y="40" width="58" height="14" rx="6" fill="#BF360C"/>
<rect x="26" y="50" width="46" height="28" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="29" y="53" width="17" height="11" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="50" y1="50" x2="50" y2="78" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="74" y="34" width="8" height="30" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="78" cy="32" rx="5" ry="4" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="150" y="68" width="26" height="38" rx="6" fill="#E65100" stroke="#1A1A1A" stroke-width="2"/>
<line x1="84" y1="68" x2="84" y2="108" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>
<line x1="130" y1="68" x2="130" y2="108" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<rect x="10" y="108" width="180" height="30" rx="15" fill="#2D2D2D" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="18" y="114" width="164" height="18" rx="9" fill="#424242"/>
<line x1="36" y1="108" x2="36" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="54" y1="108" x2="54" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="72" y1="108" x2="72" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="90" y1="108" x2="90" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="108" y1="108" x2="108" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="126" y1="108" x2="126" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="144" y1="108" x2="144" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="162" y1="108" x2="162" y2="138" stroke="#555" stroke-width="2.5"/>
<circle cx="25" cy="123" r="12" fill="#212121" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="25" cy="123" r="6" fill="#616161"/><circle cx="25" cy="123" r="3" fill="#424242"/>
<circle cx="175" cy="123" r="12" fill="#212121" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="175" cy="123" r="6" fill="#616161"/><circle cx="175" cy="123" r="3" fill="#424242"/>
<line x1="37" y1="110" x2="163" y2="110" stroke="rgba(255,255,255,.25)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="22" y="28" width="58" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="38" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="35" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="62" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="59" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="94" y="70" width="32" height="32" rx="4" fill="#FFD600" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="94" y1="78" x2="102" y2="70" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="94" y1="88" x2="112" y2="70" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="94" y1="98" x2="120" y2="72" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="98" y1="102" x2="126" y2="74" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="110" y1="102" x2="126" y2="86" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="118" y1="102" x2="126" y2="94" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<rect x="94" y="70" width="32" height="32" rx="4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(4)}>
<line x1="30" y1="78" x2="10" y2="26" stroke="#1A1A1A" stroke-width="13" stroke-linecap="round"/>
<line x1="30" y1="78" x2="10" y2="26" stroke="#FF8F00" stroke-width="9" stroke-linecap="round"/>
<line x1="10" y1="26" x2="5" y2="50" stroke="#1A1A1A" stroke-width="11" stroke-linecap="round"/>
<line x1="10" y1="26" x2="5" y2="50" stroke="#E65100" stroke-width="7" stroke-linecap="round"/>
<line x1="24" y1="54" x2="12" y2="36" stroke="#1A1A1A" stroke-width="5" stroke-linecap="round"/>
<line x1="24" y1="54" x2="12" y2="36" stroke="#9E9E9E" stroke-width="3" stroke-linecap="round"/>
<path d="M1 48 L12 42 L17 54 L11 64 Q5 66 2 60 Z" fill="#757575" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"/>
<line x1="4" y1="58" x2="15" y2="50" stroke="#9E9E9E" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── ブルドーザー SVG ─────────────────────────────────────────
function bullSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="10" y="110" width="180" height="28" rx="14" fill="#D0D0D0"/>
<rect x="28" y="56" width="144" height="52" rx="8" fill="#C4C4C4"/>
<rect x="100" y="34" width="72" height="44" rx="8" fill="#BDBDBD"/>
<g ${v(0)}>
<rect x="28" y="56" width="144" height="52" rx="8" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="100" y="34" width="72" height="54" rx="8" fill="#E65100" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="102" y="34" width="68" height="14" rx="6" fill="#BF360C"/>
<rect x="106" y="44" width="50" height="30" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="109" y="47" width="19" height="12" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="132" y1="44" x2="132" y2="74" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="86" y="40" width="8" height="30" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="90" cy="38" rx="5" ry="4" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="58" y1="58" x2="58" y2="108" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<line x1="88" y1="58" x2="88" y2="108" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<rect x="167" y="78" width="8" height="26" rx="4" fill="#BF360C" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<rect x="10" y="108" width="180" height="30" rx="15" fill="#2D2D2D" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="18" y="114" width="164" height="18" rx="9" fill="#424242"/>
<line x1="36" y1="108" x2="36" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="54" y1="108" x2="54" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="72" y1="108" x2="72" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="90" y1="108" x2="90" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="108" y1="108" x2="108" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="126" y1="108" x2="126" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="144" y1="108" x2="144" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="162" y1="108" x2="162" y2="138" stroke="#555" stroke-width="2.5"/>
<circle cx="25" cy="123" r="12" fill="#212121" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="25" cy="123" r="6" fill="#616161"/><circle cx="25" cy="123" r="3" fill="#424242"/>
<circle cx="175" cy="123" r="12" fill="#212121" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="175" cy="123" r="6" fill="#616161"/><circle cx="175" cy="123" r="3" fill="#424242"/>
<line x1="37" y1="110" x2="163" y2="110" stroke="rgba(255,255,255,.25)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="104" y="22" width="66" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="120" cy="22" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="117" cy="19" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="152" cy="22" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="149" cy="19" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="38" y="64" width="32" height="32" rx="4" fill="#FFD600" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="38" y1="72" x2="46" y2="64" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="38" y1="82" x2="56" y2="64" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="38" y1="92" x2="64" y2="66" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="42" y1="96" x2="70" y2="68" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="52" y1="96" x2="70" y2="78" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="60" y1="96" x2="70" y2="86" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<rect x="38" y="64" width="32" height="32" rx="4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(4)}>
<line x1="32" y1="68" x2="14" y2="86" stroke="#1A1A1A" stroke-width="8" stroke-linecap="round"/>
<line x1="32" y1="68" x2="14" y2="86" stroke="#9E9E9E" stroke-width="5" stroke-linecap="round"/>
<line x1="32" y1="96" x2="14" y2="102" stroke="#1A1A1A" stroke-width="7" stroke-linecap="round"/>
<line x1="32" y1="96" x2="14" y2="102" stroke="#9E9E9E" stroke-width="4" stroke-linecap="round"/>
<rect x="4" y="70" width="14" height="46" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="6" y="72" width="4" height="42" rx="2" fill="rgba(255,255,255,.4)"/>
<rect x="3" y="112" width="16" height="5" rx="2" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── クレーン車 SVG ───────────────────────────────────────────
function craneSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="35" width="82" height="75" rx="10" fill="#D0D0D0"/>
<rect x="84" y="65" width="108" height="45" rx="8" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="158" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="84" y="65" width="108" height="45" rx="8" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="8" y="35" width="82" height="75" rx="10" fill="#4E342E" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="10" y="35" width="78" height="18" rx="8" fill="#3E2723"/>
<rect x="16" y="44" width="60" height="40" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="19" y="47" width="22" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="47" y1="44" x2="47" y2="84" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="78" width="14" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="12" cy="87" rx="5" ry="6" fill="#FFEE58"/>
<rect x="5" y="98" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="52" y1="58" x2="52" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<line x1="96" y1="67" x2="96" y2="108" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<line x1="140" y1="67" x2="140" y2="108" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<line x1="86" y1="80" x2="190" y2="80" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<rect x="187" y="72" width="6" height="12" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="158" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="158" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="158" cy="120" r="6" fill="#9E9E9E"/><circle cx="158" cy="120" r="2.5" fill="#424242"/>
<circle cx="158" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M142 113 Q158 107 174 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="23" width="52" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="34" cy="23" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="31" cy="20" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="56" cy="23" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="53" cy="20" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="100" y="70" width="32" height="32" rx="4" fill="#FFD600" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="100" y1="78" x2="108" y2="70" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="100" y1="88" x2="118" y2="70" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="100" y1="98" x2="126" y2="72" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="104" y1="102" x2="132" y2="74" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="114" y1="102" x2="132" y2="84" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="122" y1="102" x2="132" y2="92" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<rect x="100" y="70" width="32" height="32" rx="4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(4)}>
<rect x="142" y="52" width="20" height="16" rx="4" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2"/>
<line x1="152" y1="60" x2="174" y2="14" stroke="#1A1A1A" stroke-width="13" stroke-linecap="round"/>
<line x1="152" y1="60" x2="174" y2="14" stroke="#9E9E9E" stroke-width="9" stroke-linecap="round"/>
<line x1="156" y1="50" x2="162" y2="34" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
<line x1="156" y1="50" x2="162" y2="34" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
<line x1="160" y1="40" x2="167" y2="24" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
<line x1="160" y1="40" x2="167" y2="24" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
<line x1="174" y1="14" x2="174" y2="42" stroke="#1A1A1A" stroke-width="2" stroke-dasharray="3 2"/>
<circle cx="174" cy="44" r="4" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
<path d="M170 44 Q174 50 178 44" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
</g>
</svg>`;
}

// ── ダンプカー SVG ───────────────────────────────────────────
function dumpSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="38" width="74" height="72" rx="10" fill="#D0D0D0"/>
<rect x="76" y="55" width="116" height="55" rx="8" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="162" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="8" y="38" width="74" height="72" rx="10" fill="#D84315" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="10" y="38" width="70" height="18" rx="8" fill="#BF360C"/>
<rect x="76" y="72" width="116" height="38" rx="8" fill="#388E3C" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="16" y="46" width="54" height="38" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="19" y="49" width="20" height="12" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="44" y1="46" x2="44" y2="84" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="78" width="14" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="12" cy="87" rx="5" ry="6" fill="#FFEE58"/>
<rect x="5" y="98" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="50" y1="60" x2="50" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="78" width="6" height="14" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="78" y1="84" x2="190" y2="84" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="6" fill="#9E9E9E"/><circle cx="162" cy="120" r="2.5" fill="#424242"/>
<circle cx="162" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M146 113 Q162 107 178 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="26" width="50" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="34" cy="26" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="31" cy="23" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="56" cy="26" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="53" cy="23" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="90" y="76" width="32" height="28" rx="4" fill="#FFD600" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="90" y1="84" x2="98" y2="76" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="90" y1="94" x2="108" y2="76" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="94" y1="104" x2="120" y2="78" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="106" y1="104" x2="122" y2="88" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="116" y1="104" x2="122" y2="98" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<rect x="90" y="76" width="32" height="28" rx="4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(4)}>
<path d="M76 55 L76 72 L192 72 L192 55 Q180 44 100 44 Z" fill="#F9A825" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<line x1="76" y1="60" x2="192" y2="60" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<line x1="120" y1="55" x2="120" y2="72" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<line x1="160" y1="55" x2="160" y2="72" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<rect x="188" y="54" width="6" height="18" rx="3" fill="#E65100" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── バス SVG ─────────────────────────────────────────────────
function busSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="5" y="26" width="190" height="84" rx="10" fill="#D0D0D0"/>
<circle cx="40" cy="120" r="16" fill="#B0B0B0"/><circle cx="162" cy="120" r="16" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="5" y="26" width="190" height="84" rx="10" fill="#2E7D32" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="26" width="42" height="84" rx="10" fill="#1B5E20" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="156" y="26" width="39" height="84" rx="10" fill="#1B5E20" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="8" y="40" width="32" height="42" rx="5" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="11" y="43" width="12" height="14" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="25" y1="40" x2="25" y2="82" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="84" width="16" height="10" rx="3" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="168" y="36" width="22" height="30" rx="4" fill="#81D4FA" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="179" y="82" width="13" height="10" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="90" width="190" height="8" fill="#1B5E20" opacity="0.7"/>
<rect x="44" y="28" width="70" height="14" rx="4" fill="#1A1A1A"/>
</g>
<g ${v(1)}>
<circle cx="40" cy="120" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="40" cy="120" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="40" cy="120" r="5" fill="#9E9E9E"/><circle cx="40" cy="120" r="2" fill="#424242"/>
<circle cx="40" cy="120" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M26 114 Q40 108 54 114" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="5" fill="#9E9E9E"/><circle cx="162" cy="120" r="2" fill="#424242"/>
<circle cx="162" cy="120" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M148 114 Q162 108 176 114" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="140" y="38" width="16" height="52" rx="4" fill="#245E25" stroke="#1A1A1A" stroke-width="2"/>
<rect x="158" y="38" width="16" height="52" rx="4" fill="#245E25" stroke="#1A1A1A" stroke-width="2"/>
<line x1="156" y1="38" x2="156" y2="90" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="142" y="41" width="12" height="20" rx="3" fill="#81D4FA" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="160" y="41" width="12" height="20" rx="3" fill="#81D4FA" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="140" y="90" width="34" height="8" rx="3" fill="#424242" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(3)}>
<rect x="46" y="30" width="66" height="10" rx="3" fill="#FF8F00"/>
<rect x="48" y="31" width="14" height="8" rx="2" fill="#FFD54F"/>
<rect x="64" y="31" width="14" height="8" rx="2" fill="#FFD54F"/>
<rect x="80" y="31" width="14" height="8" rx="2" fill="#FFD54F"/>
<rect x="84" y="91" width="44" height="12" rx="5" fill="#4CAF50" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="90" y="94" width="12" height="6" rx="2" fill="white" opacity="0.6"/>
<rect x="104" y="94" width="12" height="6" rx="2" fill="white" opacity="0.6"/>
</g>
<g ${v(4)}>
<rect x="46" y="30" width="18" height="20" rx="4" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="48" y="32" width="7" height="9" rx="2" fill="rgba(255,255,255,.65)"/>
<rect x="68" y="30" width="18" height="20" rx="4" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="70" y="32" width="7" height="9" rx="2" fill="rgba(255,255,255,.65)"/>
<rect x="90" y="30" width="18" height="20" rx="4" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="92" y="32" width="7" height="9" rx="2" fill="rgba(255,255,255,.65)"/>
<rect x="112" y="30" width="18" height="20" rx="4" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="114" y="32" width="7" height="9" rx="2" fill="rgba(255,255,255,.65)"/>
<rect x="134" y="30" width="18" height="20" rx="4" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="136" y="32" width="7" height="9" rx="2" fill="rgba(255,255,255,.65)"/>
</g>
</svg>`;
}

// ── トラック SVG ─────────────────────────────────────────────
function truckSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="40" width="74" height="70" rx="10" fill="#D0D0D0"/>
<rect x="76" y="76" width="116" height="34" rx="6" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="162" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="8" y="40" width="74" height="70" rx="10" fill="#1B5E20" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="10" y="40" width="70" height="18" rx="8" fill="#1A4A1F"/>
<rect x="76" y="76" width="116" height="34" rx="6" fill="#2E7D32" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="16" y="50" width="54" height="38" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="19" y="53" width="20" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="44" y1="50" x2="44" y2="88" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="82" width="14" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="12" cy="91" rx="5" ry="6" fill="#FFEE58"/>
<rect x="5" y="100" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="50" y1="62" x2="50" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="82" width="6" height="12" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="78" y1="88" x2="190" y2="88" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="6" fill="#9E9E9E"/><circle cx="162" cy="120" r="2.5" fill="#424242"/>
<circle cx="162" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M146 113 Q162 107 178 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="28" width="52" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="34" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="31" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="56" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="53" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="92" y="80" width="70" height="22" rx="4" fill="#1B5E20" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="96" y="83" width="18" height="16" rx="3" fill="#4CAF50"/>
<rect x="118" y="83" width="14" height="16" rx="3" fill="#4CAF50"/>
<rect x="136" y="83" width="14" height="16" rx="3" fill="#4CAF50"/>
<rect x="100" y="86" width="10" height="10" rx="2" fill="#2E7D32"/>
<rect x="120" y="86" width="8" height="10" rx="2" fill="#2E7D32"/>
<rect x="138" y="86" width="8" height="10" rx="2" fill="#2E7D32"/>
</g>
<g ${v(4)}>
<rect x="78" y="44" width="114" height="34" rx="6" fill="#388E3C" stroke="#1A1A1A" stroke-width="2.5"/>
<line x1="78" y1="58" x2="192" y2="58" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<line x1="120" y1="44" x2="120" y2="78" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<line x1="158" y1="44" x2="158" y2="78" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<rect x="188" y="44" width="4" height="34" rx="2" fill="#2E7D32" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── 郵便車 SVG ───────────────────────────────────────────────
function mailSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="68" y="20" width="124" height="88" rx="8" fill="#D2D2D2"/>
<rect x="5" y="28" width="67" height="80" rx="8" fill="#C4C4C4"/>
<circle cx="40" cy="118" r="16" fill="#AEAEAE"/><circle cx="160" cy="118" r="16" fill="#AEAEAE"/>
<g ${v(0)}>
<rect x="68" y="20" width="124" height="88" rx="8" fill="#B71C1C" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="28" width="67" height="80" rx="8" fill="#C62828" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="7" y="28" width="63" height="14" rx="6" fill="#7F0000"/>
<line x1="70" y1="20" x2="70" y2="108" stroke="#1A1A1A" stroke-width="2"/>
<rect x="10" y="36" width="52" height="40" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="13" y="39" width="20" height="13" rx="4" fill="rgba(255,255,255,.72)"/>
<line x1="37" y1="36" x2="37" y2="76" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="3" y="68" width="10" height="16" rx="3" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="3" y="96" width="18" height="10" rx="4" fill="#9E9E9E" stroke="#1A1A1A" stroke-width="2"/>
<line x1="183" y1="22" x2="183" y2="106" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="32" width="5" height="12" rx="2" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="40" cy="118" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="40" cy="118" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="40" cy="118" r="5" fill="#9E9E9E"/><circle cx="40" cy="118" r="2.5" fill="#424242"/>
<circle cx="40" cy="118" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M26 112 Q40 106 54 112" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="160" cy="118" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="160" cy="118" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="160" cy="118" r="5" fill="#9E9E9E"/><circle cx="160" cy="118" r="2.5" fill="#424242"/>
<circle cx="160" cy="118" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M146 112 Q160 106 174 112" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="16" width="50" height="13" rx="6" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="33" cy="16" rx="13" ry="9" fill="#FF8F00" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="30" cy="13" rx="5.5" ry="3" fill="rgba(255,255,255,.6)"/>
<ellipse cx="55" cy="16" rx="13" ry="9" fill="#FF8F00" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="52" cy="13" rx="5.5" ry="3" fill="rgba(255,255,255,.6)"/>
</g>
<g ${v(3)}>
<rect x="108" y="38" width="38" height="6" rx="2" fill="#FFD700" stroke="#1A1A1A" stroke-width="1"/>
<rect x="108" y="46" width="38" height="6" rx="2" fill="#FFD700" stroke="#1A1A1A" stroke-width="1"/>
<rect x="125" y="52" width="4" height="24" rx="2" fill="#FFD700" stroke="#1A1A1A" stroke-width="1"/>
</g>
<g ${v(4)}>
<rect x="80" y="28" width="24" height="20" rx="5" fill="#C62828" stroke="#1A1A1A" stroke-width="2"/>
<rect x="88" y="24" width="8" height="6" rx="3" fill="#B71C1C" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="82" y="36" width="20" height="4" rx="1" fill="#7F0000"/>
<rect x="82" y="30" width="20" height="5" rx="1" fill="rgba(255,255,255,.18)"/>
<rect x="88" y="42" width="8" height="4" rx="1" fill="#FFD700" stroke="#1A1A1A" stroke-width="1"/>
</g>
</svg>`;
}

// ── ゴミ収集車 SVG ───────────────────────────────────────────
function garbSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="5" y="36" width="74" height="74" rx="10" fill="#D0D0D0"/>
<rect x="74" y="50" width="120" height="60" rx="8" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="160" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="74" y="50" width="120" height="60" rx="8" fill="#558B2F" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="36" width="74" height="74" rx="10" fill="#558B2F" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="7" y="36" width="70" height="18" rx="8" fill="#33691E"/>
<rect x="12" y="46" width="56" height="40" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="15" y="49" width="22" height="14" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="40" y1="46" x2="40" y2="86" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="3" y="80" width="13" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="9" cy="89" rx="4" ry="6" fill="#FFEE58"/>
<rect x="3" y="100" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="48" y1="58" x2="48" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<line x1="110" y1="54" x2="110" y2="108" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="160" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="160" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="160" cy="120" r="6" fill="#9E9E9E"/><circle cx="160" cy="120" r="2.5" fill="#424242"/>
<circle cx="160" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M144 113 Q160 107 176 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="14" y="24" width="52" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="30" cy="24" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="27" cy="21" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="52" cy="24" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="49" cy="21" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<circle cx="130" cy="80" r="18" fill="#33691E" stroke="#1A1A1A" stroke-width="1.5"/>
<polygon points="130,63 135,72 125,72" fill="#8BC34A"/>
<polygon points="143,90 135,84 138,93" fill="#8BC34A"/>
<polygon points="117,90 122,93 125,84" fill="#8BC34A"/>
<path d="M129 72 Q138 73 141 83" fill="none" stroke="#8BC34A" stroke-width="3" stroke-linecap="round"/>
<path d="M136 92 Q124 94 120 83" fill="none" stroke="#8BC34A" stroke-width="3" stroke-linecap="round"/>
<path d="M120 80 Q119 69 127 64" fill="none" stroke="#8BC34A" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(4)}>
<rect x="162" y="42" width="30" height="68" rx="6" fill="#33691E" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="164" y="44" width="26" height="20" rx="4" fill="#1B5E20" stroke="#1A1A1A" stroke-width="1.5"/>
<circle cx="177" cy="78" r="13" fill="#558B2F" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="177" cy="78" r="8" fill="#33691E" stroke="#444" stroke-width="1.5"/>
<circle cx="177" cy="78" r="4" fill="#1B5E20"/>
<line x1="169" y1="70" x2="185" y2="86" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
<line x1="185" y1="70" x2="169" y2="86" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
<rect x="164" y="102" width="26" height="6" rx="3" fill="#1B5E20" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── レッカー車 SVG ───────────────────────────────────────────
function towSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="38" width="76" height="72" rx="10" fill="#D0D0D0"/>
<rect x="78" y="68" width="114" height="42" rx="8" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="160" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="78" y="68" width="114" height="42" rx="8" fill="#6A1B9A" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="8" y="38" width="76" height="72" rx="10" fill="#6A1B9A" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="10" y="38" width="72" height="18" rx="8" fill="#4A148C"/>
<rect x="16" y="48" width="56" height="38" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="19" y="51" width="20" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="46" y1="48" x2="46" y2="86" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="82" width="14" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="12" cy="91" rx="5" ry="6" fill="#FFEE58"/>
<rect x="5" y="100" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="52" y1="60" x2="52" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="74" width="6" height="12" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="80" y1="80" x2="190" y2="80" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="160" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="160" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="160" cy="120" r="6" fill="#9E9E9E"/><circle cx="160" cy="120" r="2.5" fill="#424242"/>
<circle cx="160" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M144 113 Q160 107 176 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="26" width="52" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="34" cy="26" rx="13" ry="10" fill="#FF8F00" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="31" cy="23" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="56" cy="26" rx="13" ry="10" fill="#FF8F00" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="53" cy="23" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="90" y="72" width="24" height="24" rx="4" fill="#FFD700" stroke="#1A1A1A" stroke-width="1.5"/>
<path d="M95 79 Q95 74 100 74 Q105 74 105 79 Q105 85 99 86 L99 90" fill="none" stroke="#4A148C" stroke-width="3" stroke-linecap="round"/>
<line x1="96" y1="90" x2="102" y2="90" stroke="#4A148C" stroke-width="2.5" stroke-linecap="round"/>
</g>
<g ${v(4)}>
<rect x="148" y="56" width="20" height="16" rx="4" fill="#6A1B9A" stroke="#1A1A1A" stroke-width="2"/>
<line x1="158" y1="60" x2="182" y2="22" stroke="#1A1A1A" stroke-width="13" stroke-linecap="round"/>
<line x1="158" y1="60" x2="182" y2="22" stroke="#9E9E9E" stroke-width="9" stroke-linecap="round"/>
<line x1="162" y1="50" x2="170" y2="32" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
<line x1="162" y1="50" x2="170" y2="32" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round"/>
<line x1="182" y1="22" x2="182" y2="48" stroke="#1A1A1A" stroke-width="3" stroke-dasharray="3 2"/>
<circle cx="182" cy="50" r="4" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
<path d="M178 50 Q182 56 186 50" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
</g>
</svg>`;
}

// ── 除雪車 SVG ───────────────────────────────────────────────
function snowSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="10" y="110" width="180" height="28" rx="14" fill="#D0D0D0"/>
<rect x="28" y="56" width="144" height="52" rx="8" fill="#C4C4C4"/>
<rect x="98" y="34" width="74" height="44" rx="8" fill="#BDBDBD"/>
<g ${v(0)}>
<rect x="28" y="56" width="144" height="52" rx="8" fill="#0277BD" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="98" y="34" width="74" height="54" rx="8" fill="#01579B" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="100" y="34" width="70" height="14" rx="6" fill="#003E6B"/>
<rect x="104" y="44" width="52" height="30" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="107" y="47" width="19" height="12" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="130" y1="44" x2="130" y2="74" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="86" y="40" width="8" height="28" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="90" cy="38" rx="5" ry="4" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="58" y1="58" x2="58" y2="108" stroke="rgba(0,0,0,.2)" stroke-width="1.5"/>
<rect x="165" y="60" width="8" height="44" rx="4" fill="#01579B" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<rect x="10" y="108" width="180" height="30" rx="15" fill="#2D2D2D" stroke="#1A1A1A" stroke-width="2.5"/>
<rect x="18" y="114" width="164" height="18" rx="9" fill="#424242"/>
<line x1="36" y1="108" x2="36" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="54" y1="108" x2="54" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="72" y1="108" x2="72" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="90" y1="108" x2="90" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="108" y1="108" x2="108" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="126" y1="108" x2="126" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="144" y1="108" x2="144" y2="138" stroke="#555" stroke-width="2.5"/>
<line x1="162" y1="108" x2="162" y2="138" stroke="#555" stroke-width="2.5"/>
<circle cx="25" cy="123" r="12" fill="#212121" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="25" cy="123" r="6" fill="#616161"/><circle cx="25" cy="123" r="3" fill="#424242"/>
<circle cx="175" cy="123" r="12" fill="#212121" stroke="#1A1A1A" stroke-width="2"/>
<circle cx="175" cy="123" r="6" fill="#616161"/><circle cx="175" cy="123" r="3" fill="#424242"/>
</g>
<g ${v(2)}>
<rect x="100" y="22" width="70" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="116" cy="22" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="113" cy="19" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="154" cy="22" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="151" cy="19" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<circle cx="58" cy="82" r="16" fill="white" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="58" y1="66" x2="58" y2="98" stroke="#0277BD" stroke-width="3"/>
<line x1="42" y1="74" x2="74" y2="90" stroke="#0277BD" stroke-width="3"/>
<line x1="74" y1="74" x2="42" y2="90" stroke="#0277BD" stroke-width="3"/>
<line x1="58" y1="66" x2="54" y2="70" stroke="#0277BD" stroke-width="2"/>
<line x1="58" y1="66" x2="62" y2="70" stroke="#0277BD" stroke-width="2"/>
<line x1="58" y1="98" x2="54" y2="94" stroke="#0277BD" stroke-width="2"/>
<line x1="58" y1="98" x2="62" y2="94" stroke="#0277BD" stroke-width="2"/>
</g>
<g ${v(4)}>
<line x1="32" y1="68" x2="14" y2="84" stroke="#1A1A1A" stroke-width="8" stroke-linecap="round"/>
<line x1="32" y1="68" x2="14" y2="84" stroke="#9E9E9E" stroke-width="5" stroke-linecap="round"/>
<line x1="32" y1="96" x2="14" y2="102" stroke="#1A1A1A" stroke-width="7" stroke-linecap="round"/>
<line x1="32" y1="96" x2="14" y2="102" stroke="#9E9E9E" stroke-width="4" stroke-linecap="round"/>
<path d="M2 68 L14 72 L14 110 L2 110 Q0 100 0 88 Z" fill="#B3E5FC" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="0" y="106" width="16" height="5" rx="2" fill="#616161" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── ロードローラー SVG ───────────────────────────────────────
function rollerSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<circle cx="42" cy="112" r="24" fill="#D0D0D0"/>
<rect x="58" y="72" width="128" height="52" rx="8" fill="#C4C4C4"/>
<rect x="72" y="42" width="88" height="44" rx="8" fill="#BDBDBD"/>
<circle cx="162" cy="116" r="16" fill="#C0C0C0"/>
<g ${v(0)}>
<rect x="58" y="72" width="128" height="52" rx="8" fill="#4E342E" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="72" y="42" width="88" height="44" rx="8" fill="#6D4C41" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="74" y="42" width="84" height="14" rx="6" fill="#4E342E"/>
<rect x="78" y="52" width="70" height="28" rx="5" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="82" y="55" width="24" height="12" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="106" y1="52" x2="106" y2="80" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="178" y="80" width="8" height="40" rx="4" fill="#4E342E" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="60" y="84" width="118" height="8" rx="4" fill="#3E2723" opacity="0.5"/>
</g>
<g ${v(1)}>
<circle cx="42" cy="112" r="24" fill="#2D2D2D" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="42" cy="112" r="18" fill="#424242"/>
<line x1="18" y1="106" x2="66" y2="106" stroke="#555" stroke-width="2"/>
<line x1="18" y1="112" x2="66" y2="112" stroke="#555" stroke-width="2"/>
<line x1="18" y1="118" x2="66" y2="118" stroke="#555" stroke-width="2"/>
<circle cx="42" cy="112" r="8" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="42" cy="112" r="4" fill="#9E9E9E"/>
<path d="M22 103 Q42 96 62 103" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="116" r="16" fill="#2D2D2D" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="116" r="10" fill="#424242"/>
<line x1="146" y1="110" x2="178" y2="110" stroke="#555" stroke-width="1.5"/>
<line x1="146" y1="116" x2="178" y2="116" stroke="#555" stroke-width="1.5"/>
<line x1="146" y1="122" x2="178" y2="122" stroke="#555" stroke-width="1.5"/>
<circle cx="162" cy="116" r="5" fill="#616161"/>
</g>
<g ${v(2)}>
<rect x="74" y="30" width="86" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="90" cy="30" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="87" cy="27" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="148" cy="30" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="145" cy="27" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="118" y="76" width="32" height="32" rx="4" fill="#FFD600" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="118" y1="84" x2="126" y2="76" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="118" y1="94" x2="136" y2="76" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="118" y1="104" x2="144" y2="78" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="122" y1="108" x2="150" y2="80" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="132" y1="108" x2="150" y2="90" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<line x1="142" y1="108" x2="150" y2="100" stroke="#1A1A1A" stroke-width="3.5" stroke-linecap="square"/>
<rect x="118" y="76" width="32" height="32" rx="4" fill="none" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(4)}>
<rect x="60" y="76" width="14" height="18" rx="4" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2"/>
<line x1="52" y1="92" x2="38" y2="112" stroke="rgba(255,150,0,.6)" stroke-width="4" stroke-linecap="round"/>
<line x1="58" y1="94" x2="44" y2="112" stroke="rgba(255,150,0,.6)" stroke-width="4" stroke-linecap="round"/>
<line x1="64" y1="93" x2="52" y2="112" stroke="rgba(255,150,0,.6)" stroke-width="4" stroke-linecap="round"/>
</g>
</svg>`;
}

// ── 高所作業車 SVG ───────────────────────────────────────────
function aerialSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="40" width="76" height="70" rx="10" fill="#D0D0D0"/>
<rect x="78" y="70" width="114" height="40" rx="8" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="160" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="78" y="70" width="114" height="40" rx="8" fill="#AD1457" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="8" y="40" width="76" height="70" rx="10" fill="#AD1457" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="10" y="40" width="72" height="18" rx="8" fill="#880E4F"/>
<rect x="16" y="50" width="56" height="38" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="19" y="53" width="20" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="46" y1="50" x2="46" y2="88" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="84" width="14" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="12" cy="93" rx="5" ry="6" fill="#FFEE58"/>
<rect x="5" y="102" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="52" y1="62" x2="52" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="76" width="6" height="12" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="160" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="160" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="160" cy="120" r="6" fill="#9E9E9E"/><circle cx="160" cy="120" r="2.5" fill="#424242"/>
<circle cx="160" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M144 113 Q160 107 176 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="28" width="52" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="34" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="31" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="56" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="53" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<rect x="90" y="74" width="32" height="32" rx="4" fill="#FFD700" stroke="#1A1A1A" stroke-width="1.5"/>
<polygon points="106,80 112,88 108,88 108,100 104,100 104,88 100,88" fill="#AD1457"/>
<polygon points="106,80 100,88 104,88 104,100 108,100 108,88 112,88" fill="#880E4F"/>
</g>
<g ${v(4)}>
<rect x="128" y="58" width="18" height="16" rx="4" fill="#AD1457" stroke="#1A1A1A" stroke-width="2"/>
<line x1="137" y1="62" x2="152" y2="28" stroke="#1A1A1A" stroke-width="12" stroke-linecap="round"/>
<line x1="137" y1="62" x2="152" y2="28" stroke="#9E9E9E" stroke-width="8" stroke-linecap="round"/>
<line x1="152" y1="28" x2="188" y2="22" stroke="#1A1A1A" stroke-width="11" stroke-linecap="round"/>
<line x1="152" y1="28" x2="188" y2="22" stroke="#9E9E9E" stroke-width="7" stroke-linecap="round"/>
<rect x="182" y="12" width="16" height="14" rx="3" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2"/>
<line x1="182" y1="12" x2="182" y2="26" stroke="#1A1A1A" stroke-width="1.5"/>
<line x1="198" y1="12" x2="198" y2="26" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="180" y="24" width="20" height="3" rx="1" fill="#616161" stroke="#1A1A1A" stroke-width="1"/>
</g>
</svg>`;
}

// ── はしご消防車 SVG ─────────────────────────────────────────
function ladderSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="5" y="32" width="74" height="78" rx="10" fill="#D0D0D0"/>
<rect x="72" y="54" width="120" height="56" rx="8" fill="#C4C4C4"/>
<circle cx="42" cy="120" r="18" fill="#B0B0B0"/><circle cx="162" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="72" y="54" width="120" height="56" rx="8" fill="#B71C1C" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="32" width="74" height="78" rx="10" fill="#B71C1C" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="7" y="32" width="70" height="18" rx="8" fill="#7F0000"/>
<rect x="14" y="40" width="58" height="40" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="17" y="43" width="22" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="44" y1="40" x2="44" y2="80" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="3" y="78" width="13" height="20" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="9" cy="88" rx="4" ry="7" fill="#FFEE58"/>
<rect x="3" y="100" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="50" y1="57" x2="50" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<line x1="118" y1="58" x2="118" y2="108" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<line x1="158" y1="58" x2="158" y2="108" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<rect x="188" y="62" width="6" height="14" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="42" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="42" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="42" cy="120" r="6" fill="#9E9E9E"/><circle cx="42" cy="120" r="2.5" fill="#424242"/>
<circle cx="42" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M26 113 Q42 107 58 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="6" fill="#9E9E9E"/><circle cx="162" cy="120" r="2.5" fill="#424242"/>
<circle cx="162" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M146 113 Q162 107 178 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="16" y="20" width="54" height="14" rx="6" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="33" cy="20" rx="14" ry="10" fill="#F44336" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="30" cy="17" rx="6" ry="3.5" fill="rgba(255,255,255,.6)"/>
<ellipse cx="57" cy="20" rx="14" ry="10" fill="#1E88E5" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="54" cy="17" rx="6" ry="3.5" fill="rgba(255,255,255,.6)"/>
</g>
<g ${v(3)}>
<path d="M60 58 L47 61 L47 72 Q47 80 60 84 Q73 80 73 72 L73 61 Z" fill="#FFD700" stroke="#1A1A1A" stroke-width="2" stroke-linejoin="round"/>
<line x1="54" y1="66" x2="66" y2="78" stroke="#E65100" stroke-width="2.5" stroke-linecap="round"/>
<line x1="66" y1="66" x2="54" y2="78" stroke="#E65100" stroke-width="2.5" stroke-linecap="round"/>
</g>
<g ${v(4)}>
<rect x="110" y="44" width="40" height="12" rx="4" fill="#78909C" stroke="#1A1A1A" stroke-width="2"/>
<line x1="130" y1="48" x2="162" y2="10" stroke="#1A1A1A" stroke-width="12" stroke-linecap="round"/>
<line x1="130" y1="48" x2="162" y2="10" stroke="#90A4AE" stroke-width="8" stroke-linecap="round"/>
<line x1="162" y1="10" x2="192" y2="2" stroke="#1A1A1A" stroke-width="9" stroke-linecap="round"/>
<line x1="162" y1="10" x2="192" y2="2" stroke="#B0BEC5" stroke-width="5" stroke-linecap="round"/>
<line x1="138" y1="38" x2="148" y2="22" stroke="#546E7A" stroke-width="2" stroke-linecap="round"/>
<line x1="144" y1="32" x2="154" y2="16" stroke="#546E7A" stroke-width="2" stroke-linecap="round"/>
<line x1="168" y1="8" x2="174" y2="4" stroke="#607D8B" stroke-width="2" stroke-linecap="round"/>
<line x1="176" y1="6" x2="182" y2="3" stroke="#607D8B" stroke-width="2" stroke-linecap="round"/>
<line x1="184" y1="4" x2="190" y2="2" stroke="#607D8B" stroke-width="2" stroke-linecap="round"/>
</g>
</svg>`;
}

// ── タンクローリー SVG ───────────────────────────────────────
function tankerSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="8" y="40" width="72" height="70" rx="10" fill="#D0D0D0"/>
<rect x="74" y="76" width="118" height="34" rx="6" fill="#C4C4C4"/>
<circle cx="44" cy="120" r="18" fill="#B0B0B0"/><circle cx="162" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="74" y="76" width="118" height="34" rx="6" fill="#E65100" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="8" y="40" width="72" height="70" rx="10" fill="#E65100" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="10" y="40" width="68" height="18" rx="8" fill="#BF360C"/>
<rect x="16" y="50" width="52" height="38" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="19" y="53" width="19" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="42" y1="50" x2="42" y2="88" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="84" width="14" height="18" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="12" cy="93" rx="5" ry="6" fill="#FFEE58"/>
<rect x="5" y="102" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="48" y1="62" x2="48" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<rect x="187" y="82" width="6" height="12" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="44" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="44" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="44" cy="120" r="6" fill="#9E9E9E"/><circle cx="44" cy="120" r="2.5" fill="#424242"/>
<circle cx="44" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M28 113 Q44 107 60 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="6" fill="#9E9E9E"/><circle cx="162" cy="120" r="2.5" fill="#424242"/>
<circle cx="162" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M146 113 Q162 107 178 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="18" y="28" width="50" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="33" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="30" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="55" cy="28" rx="13" ry="10" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="52" cy="25" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<circle cx="110" cy="80" r="16" fill="#BF360C" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="106" y="72" width="8" height="16" rx="2" fill="#FF8F00"/>
<rect x="102" y="78" width="16" height="4" rx="2" fill="#FF8F00"/>
<ellipse cx="110" cy="70" rx="4" ry="3" fill="#FFD54F" stroke="#1A1A1A" stroke-width="1"/>
</g>
<g ${v(4)}>
<ellipse cx="140" cy="60" rx="52" ry="18" fill="#FF8F00" stroke="#1A1A1A" stroke-width="2.5"/>
<ellipse cx="140" cy="60" rx="50" ry="16" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="6"/>
<line x1="112" y1="44" x2="112" y2="76" stroke="rgba(0,0,0,.2)" stroke-width="2"/>
<line x1="140" y1="42" x2="140" y2="78" stroke="rgba(0,0,0,.2)" stroke-width="2"/>
<line x1="168" y1="44" x2="168" y2="76" stroke="rgba(0,0,0,.2)" stroke-width="2"/>
<ellipse cx="188" cy="60" rx="4" ry="16" fill="#E65100" stroke="#1A1A1A" stroke-width="2"/>
<rect x="185" y="56" width="8" height="8" rx="2" fill="#424242" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
</svg>`;
}

// ── スクールバス SVG ─────────────────────────────────────────
function schoolSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="5" y="26" width="190" height="84" rx="8" fill="#D0D0D0"/>
<circle cx="40" cy="120" r="16" fill="#B0B0B0"/><circle cx="162" cy="120" r="16" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="5" y="26" width="190" height="84" rx="8" fill="#F57F17" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="26" width="44" height="84" rx="8" fill="#E65100" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="155" y="26" width="40" height="84" rx="8" fill="#E65100" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="26" width="190" height="10" rx="5" fill="#1A1A1A"/>
<rect x="5" y="100" width="190" height="10" rx="5" fill="#1A1A1A"/>
<rect x="8" y="40" width="34" height="40" rx="5" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="11" y="43" width="13" height="14" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="26" y1="40" x2="26" y2="80" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="5" y="82" width="16" height="10" rx="3" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<rect x="167" y="36" width="24" height="30" rx="4" fill="#81D4FA" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="179" y="82" width="13" height="10" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="44" y="28" width="70" height="14" rx="4" fill="#1A1A1A"/>
</g>
<g ${v(1)}>
<circle cx="40" cy="120" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="40" cy="120" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="40" cy="120" r="5" fill="#9E9E9E"/><circle cx="40" cy="120" r="2" fill="#424242"/>
<circle cx="40" cy="120" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M26 114 Q40 108 54 114" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="16" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="9" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="5" fill="#9E9E9E"/><circle cx="162" cy="120" r="2" fill="#424242"/>
<circle cx="162" cy="120" r="14" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="4 4"/>
<path d="M148 114 Q162 108 176 114" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="138" y="38" width="16" height="52" rx="4" fill="#E65100" stroke="#1A1A1A" stroke-width="2"/>
<rect x="156" y="38" width="16" height="52" rx="4" fill="#E65100" stroke="#1A1A1A" stroke-width="2"/>
<line x1="154" y1="38" x2="154" y2="90" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="140" y="41" width="12" height="20" rx="3" fill="#81D4FA" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="158" y="41" width="12" height="20" rx="3" fill="#81D4FA" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="138" y="90" width="34" height="8" rx="3" fill="#424242" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(3)}>
<rect x="46" y="30" width="66" height="10" rx="3" fill="#F57F17"/>
<circle cx="90" cy="78" r="14" fill="#F44336" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="89" y="64" width="2" height="6" rx="1" fill="#33691E" stroke="#1A1A1A" stroke-width="1"/>
<path d="M89 66 Q84 60 80 65" fill="none" stroke="#33691E" stroke-width="2" stroke-linecap="round"/>
<ellipse cx="90" cy="78" rx="5" ry="5" fill="#FFCDD2" stroke="#C62828" stroke-width="1.5"/>
</g>
<g ${v(4)}>
<circle cx="60" cy="52" r="7" fill="#FFCC80" stroke="#1A1A1A" stroke-width="1.5"/>
<circle cx="84" cy="52" r="7" fill="#FFCC80" stroke="#1A1A1A" stroke-width="1.5"/>
<circle cx="108" cy="52" r="7" fill="#FFCC80" stroke="#1A1A1A" stroke-width="1.5"/>
<circle cx="132" cy="52" r="7" fill="#FFCC80" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="52" y="58" width="16" height="14" rx="3" fill="#F57F17" stroke="#1A1A1A" stroke-width="1.2"/>
<rect x="76" y="58" width="16" height="14" rx="3" fill="#F57F17" stroke="#1A1A1A" stroke-width="1.2"/>
<rect x="100" y="58" width="16" height="14" rx="3" fill="#F57F17" stroke="#1A1A1A" stroke-width="1.2"/>
<rect x="124" y="58" width="16" height="14" rx="3" fill="#F57F17" stroke="#1A1A1A" stroke-width="1.2"/>
</g>
</svg>`;
}

// ── 散水車 SVG ───────────────────────────────────────────────
function waterSVG(dots,anim=-1){
  const v=i=>vis(i,dots,anim);
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.18)"/>
<rect x="5" y="32" width="76" height="78" rx="10" fill="#D0D0D0"/>
<rect x="74" y="58" width="118" height="52" rx="8" fill="#C4C4C4"/>
<circle cx="42" cy="120" r="18" fill="#B0B0B0"/><circle cx="162" cy="120" r="18" fill="#B0B0B0"/>
<g ${v(0)}>
<rect x="74" y="58" width="118" height="52" rx="8" fill="#006064" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="5" y="32" width="76" height="78" rx="10" fill="#006064" stroke="#1A1A1A" stroke-width="2.5" stroke-linejoin="round"/>
<rect x="7" y="32" width="72" height="18" rx="8" fill="#00363a"/>
<rect x="14" y="42" width="58" height="40" rx="6" fill="#81D4FA" stroke="#1A1A1A" stroke-width="2"/>
<rect x="17" y="45" width="22" height="13" rx="3" fill="rgba(255,255,255,.72)"/>
<line x1="44" y1="42" x2="44" y2="82" stroke="#1A1A1A" stroke-width="1.5"/>
<rect x="3" y="78" width="13" height="20" rx="4" fill="#FFF176" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="9" cy="88" rx="4" ry="7" fill="#FFEE58"/>
<rect x="3" y="100" width="18" height="10" rx="4" fill="#424242" stroke="#1A1A1A" stroke-width="2"/>
<line x1="50" y1="55" x2="50" y2="108" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
<line x1="116" y1="62" x2="116" y2="108" stroke="rgba(0,0,0,.15)" stroke-width="1.5"/>
<rect x="187" y="66" width="6" height="14" rx="3" fill="#FF1744" stroke="#1A1A1A" stroke-width="1.5"/>
</g>
<g ${v(1)}>
<circle cx="42" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="42" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="42" cy="120" r="6" fill="#9E9E9E"/><circle cx="42" cy="120" r="2.5" fill="#424242"/>
<circle cx="42" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M26 113 Q42 107 58 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
<circle cx="162" cy="120" r="18" fill="#212121" stroke="#1A1A1A" stroke-width="2.5"/>
<circle cx="162" cy="120" r="11" fill="#616161" stroke="#444" stroke-width="1.5"/>
<circle cx="162" cy="120" r="6" fill="#9E9E9E"/><circle cx="162" cy="120" r="2.5" fill="#424242"/>
<circle cx="162" cy="120" r="16" fill="none" stroke="#333" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M146 113 Q162 107 178 113" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="3" stroke-linecap="round"/>
</g>
<g ${v(2)}>
<rect x="16" y="20" width="52" height="13" rx="5" fill="#37474F" stroke="#1A1A1A" stroke-width="2"/>
<ellipse cx="32" cy="20" rx="13" ry="10" fill="#4FC3F7" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="29" cy="17" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
<ellipse cx="54" cy="20" rx="13" ry="10" fill="#4FC3F7" stroke="#1A1A1A" stroke-width="1.8"/>
<ellipse cx="51" cy="17" rx="5.5" ry="3" fill="rgba(255,255,255,.7)"/>
</g>
<g ${v(3)}>
<circle cx="136" cy="84" r="16" fill="#00363a" stroke="#1A1A1A" stroke-width="1.5"/>
<path d="M136 70 Q130 76 132 84 Q134 90 136 86 Q138 90 140 84 Q142 76 136 70 Z" fill="#4FC3F7"/>
<path d="M128 78 Q126 84 130 88" fill="none" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
<path d="M144 78 Q146 84 142 88" fill="none" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
</g>
<g ${v(4)}>
<rect x="3" y="60" width="16" height="10" rx="4" fill="#006064" stroke="#1A1A1A" stroke-width="2"/>
<path d="M3 65 L-6 55" stroke="#1A1A1A" stroke-width="4" stroke-linecap="round"/>
<path d="M3 65 L-6 55" stroke="#4FC3F7" stroke-width="2.5" stroke-linecap="round"/>
<path d="M0 56 Q-8 50 -6 44" fill="none" stroke="#4FC3F7" stroke-width="2.5" stroke-linecap="round"/>
<path d="M-3 58 Q-12 54 -12 46" fill="none" stroke="#4FC3F7" stroke-width="2" stroke-linecap="round"/>
<path d="M-6 60 Q-16 58 -18 50" fill="none" stroke="#81D4FA" stroke-width="1.8" stroke-linecap="round"/>
<circle cx="-2" cy="52" r="3" fill="#81D4FA" opacity="0.8"/>
<circle cx="-8" cy="46" r="2.5" fill="#4FC3F7" opacity="0.8"/>
<circle cx="-14" cy="54" r="2" fill="#B3E5FC" opacity="0.8"/>
</g>
</svg>`;
}

// ── SVG未実装車両の仮表示 ─────────────────────────────────────
function placeholderSVG(color,name,dots,anim=-1){
  const hasAny=dots.some(b=>b);
  const earned=dots.filter(b=>b).length;
  return `<svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="100" cy="147" rx="82" ry="5" fill="rgba(0,0,0,.15)"/>
<rect x="14" y="20" width="172" height="108" rx="14" fill="${color}" opacity="0.22" stroke="#1A1A1A" stroke-width="2" stroke-dasharray="6 4"/>
<text x="100" y="70" text-anchor="middle" font-family="sans-serif" font-size="22" fill="${color}" opacity="0.9">${name}</text>
${hasAny?`<rect x="20" y="84" width="${earned/5*160}" height="10" rx="5" fill="${color}" opacity="0.7" stroke="#1A1A1A" stroke-width="1.5"/>`:''}
<text x="100" y="112" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#aaa">SVGじゅんびちゅう</text>
</svg>`;
}

// ── SVGルーティング ───────────────────────────────────────────
const CAR_SVG_FNS={fire:fireTruckSVG,police:policeSVG,ambu:ambuSVG,taxi:taxiSVG,excav:excavSVG,bull:bullSVG,crane:craneSVG,dump:dumpSVG,bus:busSVG,truck:truckSVG,mail:mailSVG,garb:garbSVG,tow:towSVG,snow:snowSVG,roller:rollerSVG,aerial:aerialSVG,ladder:ladderSVG,tanker:tankerSVG,school:schoolSVG,water:waterSVG};

// ── v2トーン変換（どうぶつの森ライク・DESIGN_GUIDE v2） ────────
// 車20種は形はそのまま、黒輪郭→暖色ブラウン・接地影→ふんわり緑影にする。
// フィルタidは全車共通（同一定義なのでDOMに複数並んでも問題ない）。
const V2_SHADOW_FILTER='<defs><filter id="carsoftv2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter></defs>';
function toneV2(svg){
  return svg
    .replace(/<svg([^>]*)>/,`<svg$1>${V2_SHADOW_FILTER}`)
    .replace(/<ellipse cx="100" cy="147"/g,'<ellipse filter="url(#carsoftv2)" cx="100" cy="146"')
    .replaceAll('#1A1A1A','#6B4A2E')
    .replace(/fill="rgba\(0,0,0,(\.\d+)\)"/g,'fill="rgba(47,74,40,$1)"');
}

function getCarSVG(id,dots,animIdx=-1){
  const fn=CAR_SVG_FNS[id];
  if(fn)return toneV2(fn(dots,animIdx));
  const s=STAGES.find(x=>x.id===id);
  return toneV2(placeholderSVG(s?s.color:'#888',s?s.name:id,dots,animIdx));
}
function carLabelHTML(s){
  return `<span class="tb-car-icon">${getCarSVG(s.id,ALL_TRUE)}</span><span>${s.name}</span>`;
}
function carInlineHTML(s){
  return `<span class="inline-svg-icon">${getCarSVG(s.id,ALL_TRUE)}</span>${s.name}`;
}


export const ALL_TRUE=[true,true,true,true,true];
export {getCarSVG, carLabelHTML, carInlineHTML, CAR_SVG_FNS, placeholderSVG};
