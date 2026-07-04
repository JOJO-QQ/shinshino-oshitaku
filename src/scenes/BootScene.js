// ── BootScene: 全SVGをテクスチャ化 + ロード進捗 ────────────────
import {STAGES, BUILDING_EMOJIS} from '../data/stages.js';
import {getCarSVG, ALL_TRUE} from '../assets/cars.js';
import {EVT_SVGS, BUILDING_SVGS, BOY_SVG} from '../assets/eventSvg.js';
import {grassTile, roadTile, treeSVG, flowerSVG, cloudSVG, lotSVG, ringSVG} from '../assets/townSvg.js';
import {queueSvg, releaseSvgUrls} from '../assets/textures.js';

export class BootScene extends Phaser.Scene{
  constructor(){super('Boot');}

  preload(){
    const W=this.scale.width,H=this.scale.height;
    this.cameras.main.setBackgroundColor('#A8D98A');
    const barBg=this.add.rectangle(W/2,H/2,W*.6,14,0xffffff,.4).setOrigin(.5);
    const bar=this.add.rectangle(W/2-W*.3,H/2,4,14,0xffffff).setOrigin(0,.5);
    this.add.text(W/2,H/2-40,'まちをつくっているよ…',{fontFamily:'sans-serif',fontSize:'20px',color:'#2F3A3D'}).setOrigin(.5);
    this.load.on('progress',v=>{bar.width=Math.max(4,W*.6*v);});

    // 地面・道路・自然
    queueSvg(this,'grass0',grassTile(0),200,200);
    queueSvg(this,'grass1',grassTile(1),200,200);
    queueSvg(this,'grass2',grassTile(2),200,200);
    queueSvg(this,'road_h',roadTile('h'),200,200);
    queueSvg(this,'road_v',roadTile('v'),200,200);
    queueSvg(this,'road_x',roadTile('x'),200,200);
    queueSvg(this,'plaza',roadTile('plaza'),200,200);
    queueSvg(this,'tree',treeSVG(),140,170);
    queueSvg(this,'flower_p',flowerSVG('#F49AC1'),60,60);
    queueSvg(this,'flower_o',flowerSVG('#FFB74D'),60,60);
    queueSvg(this,'flower_v',flowerSVG('#9FA8DA'),60,60);
    queueSvg(this,'cloud',cloudSVG(),300,180);
    queueSvg(this,'lot',lotSVG(),120,110);
    queueSvg(this,'ring',ringSVG(),160,160);
    queueSvg(this,'boy',BOY_SVG,80,96);

    // 車20種（側面ビューをそのまま使用）
    STAGES.forEach(s=>queueSvg(this,`car_${s.id}`,getCarSVG(s.id,ALL_TRUE),200,150));

    // 建物（Phase 1はBUILDING_SVGSの流用+🏠フォールバック）
    STAGES.forEach((s,i)=>{
      const svg=BUILDING_SVGS[BUILDING_EMOJIS[i]]||BUILDING_SVGS['🏠'];
      queueSvg(this,`bld_${i}`,svg,110,110);
    });

    // イベント/課題アイコン（SVGがある絵文字キーのみ。無いものは表示時にTextで代替）
    const iconKeys=new Set();
    STAGES.forEach(s=>{iconKeys.add(s.ev.e);iconKeys.add(s.ev.a);});
    ['🏚️','🚧','🤕','🎯','🦹','🏢','💨','✋','✅','🔥','💧'].forEach(k=>iconKeys.add(k));
    iconKeys.forEach(k=>{
      const svg=EVT_SVGS[k]||BUILDING_SVGS[k];
      if(svg)queueSvg(this,`icon_${k}`,svg,96,96);
    });
  }

  create(){
    releaseSvgUrls();
    this.scene.start('Town');
  }
}
