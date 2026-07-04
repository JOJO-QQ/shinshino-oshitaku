// ── BootScene: 全SVGをテクスチャ化 + ロード進捗 ────────────────
import {STAGES} from '../data/stages.js';
import {RESIDENTS} from '../data/residents.js';
import {getCarSVG, ALL_TRUE} from '../assets/cars.js';
import {EVT_SVGS, BUILDING_SVGS, BOY_SVG} from '../assets/eventSvg.js';
import {SEASON_PALETTES, grassTile, roadTile, treeSVG, flowerSVG, cloudSVG, lotSVG, ringSVG, buildingSVG} from '../assets/townSvg.js';
import {animalSVG} from '../assets/peopleSvg.js';
import {queueSvg, releaseSvgUrls} from '../assets/textures.js';
import {currentSeason} from '../state/state.js';

export class BootScene extends Phaser.Scene{
  constructor(){super('Boot');}

  preload(){
    const W=this.scale.width,H=this.scale.height;
    const pal=SEASON_PALETTES[currentSeason()];
    this.cameras.main.setBackgroundColor(pal.sky);
    const barBg=this.add.rectangle(W/2,H/2,W*.6,14,0xffffff,.4).setOrigin(.5);
    const bar=this.add.rectangle(W/2-W*.3,H/2,4,14,0xffffff).setOrigin(0,.5);
    this.add.text(W/2,H/2-40,'まちをつくっているよ…',{fontFamily:'sans-serif',fontSize:'20px',color:'#2F3A3D'}).setOrigin(.5);
    this.load.on('progress',v=>{bar.width=Math.max(4,W*.6*v);});

    // 地面・道路・自然（季節パレットで色が変わる）
    queueSvg(this,'grass0',grassTile(0,pal),200,200);
    queueSvg(this,'grass1',grassTile(1,pal),200,200);
    queueSvg(this,'grass2',grassTile(2,pal),200,200);
    queueSvg(this,'road_h',roadTile('h',pal),200,200);
    queueSvg(this,'road_v',roadTile('v',pal),200,200);
    queueSvg(this,'road_x',roadTile('x',pal),200,200);
    queueSvg(this,'plaza',roadTile('plaza',pal),200,200);
    queueSvg(this,'tree',treeSVG(pal.leaf,pal.leafDark,pal.blossom,pal.snow),140,170);
    queueSvg(this,'flower_p',flowerSVG('#F49AC1'),60,60);
    queueSvg(this,'flower_o',flowerSVG('#FFB74D'),60,60);
    queueSvg(this,'flower_v',flowerSVG('#9FA8DA'),60,60);
    queueSvg(this,'cloud',cloudSVG(),300,180);
    queueSvg(this,'lot',lotSVG(),120,110);
    queueSvg(this,'ring',ringSVG(),160,160);
    queueSvg(this,'boy',BOY_SVG,80,96);

    // 車20種（側面ビューをそのまま使用）
    STAGES.forEach(s=>queueSvg(this,`car_${s.id}`,getCarSVG(s.id,ALL_TRUE),200,150));

    // 建物20種（ステージごとに固有デザイン）
    STAGES.forEach((s,i)=>queueSvg(this,`bld_${i}`,buildingSVG(i),120,120));

    // 住人12体
    RESIDENTS.forEach(r=>queueSvg(this,`res_${r.id}`,animalSVG(r.species,r.c),80,100));

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
