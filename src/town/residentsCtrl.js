// ── 住人コントローラ: 出現・徘徊・タップであいさつ ─────────────
// 建物が建った住人が家のまわりをのんびり歩く。タップで吹き出し+読み上げ。
// 友好度は1日1回だけ上がる（v6 state.residents に記録）。

import {activeResidents} from '../data/residents.js';
import {applyQuestEvent} from '../data/quests.js';
import {BUILDING_SPOTS} from '../data/townLayout.js';
import {store, save} from '../store.js';
import {dateString} from '../state/state.js';
import {speak, soundTask} from '../audio.js';
import {isTap} from './camera.js';

const FONT="'Hiragino Maru Gothic Pro','BIZ UDPGothic',sans-serif";

// 30日streakのごほうび: 広場にあらわれる特別なともだち
const KIRARI={id:'kirari',name:'きらり',species:'bird',stageIdx:-1,
  lines:['まいにち がんばってて すごいね！','いっしょにいると きらきらしちゃう！']};

export function spawnResidents(scene){
  if(scene.residentGroup)scene.residentGroup.destroy(true);
  scene.residentGroup=scene.add.container(0,0);
  const today=dateString();
  const roster=activeResidents(store.state,today).map(r=>({r,home:BUILDING_SPOTS[r.stageIdx]}));
  if(((store.state.stamps&&store.state.stamps.streak)||0)>=30)roster.push({r:KIRARI,home:{x:1300,y:1440}});
  roster.forEach(({r,home})=>{
    if(!home)return;
    const x=home.x+Phaser.Math.Between(-90,90);
    const y=home.y+Phaser.Math.Between(30,100);
    const sp=scene.add.image(x,y,`res_${r.id}`).setDisplaySize(56,70).setOrigin(.5,.95).setDepth(y);
    sp.setInteractive({useHandCursor:true});
    if(sp.input?.hitArea?.setTo){
      const ha=sp.input.hitArea;
      ha.setTo(ha.x-ha.width*.2,ha.y-ha.height*.2,ha.width*1.4,ha.height*1.4);
    }
    sp.rdata=r;sp.home=home;sp.busy=false;
    sp.on('pointerup',p=>{if(isTap(p))greet(scene,sp);});
    scene.residentGroup.add(sp);
    scene.time.delayedCall(Phaser.Math.Between(300,2200),()=>wander(scene,sp));
  });
}

function wander(scene,sp){
  if(!sp.active||sp.busy)return;
  const tx=sp.home.x+Phaser.Math.Between(-130,130);
  const ty=sp.home.y+Phaser.Math.Between(20,120);
  const d=Phaser.Math.Distance.Between(sp.x,sp.y,tx,ty);
  sp.setFlipX(tx<sp.x);
  sp.walkTween=scene.tweens.add({
    targets:sp,x:tx,y:ty,duration:Math.max(600,d*24),ease:'Sine.easeInOut',
    onUpdate:()=>sp.setDepth(sp.y),
    onComplete:()=>{
      if(!sp.active)return;
      scene.time.delayedCall(Phaser.Math.Between(1400,3600),()=>wander(scene,sp));
    },
  });
  // ぽてぽて歩き（小さく揺れる）
  sp.bobTween=scene.tweens.add({targets:sp,angle:{from:-2.5,to:2.5},duration:260,yoyo:true,
    repeat:Math.max(1,Math.floor(d*24/520)),onComplete:()=>{sp.angle=0;}});
}

function greet(scene,sp){
  if(sp.busy)return;
  sp.busy=true;
  if(sp.walkTween)sp.walkTween.stop();
  if(sp.bobTween){sp.bobTween.stop();sp.angle=0;}
  const r=sp.rdata;
  const s=store.state;
  const today=dateString();

  // 記録（初対面・友好度は1日1回まで+1、最大5）
  if(!s.residents)s.residents={};
  const rec=s.residents[r.id]||{metOn:today,friendship:0,lastTalkedOn:''};
  const firstMeet=!s.residents[r.id];
  if(rec.lastTalkedOn!==today){rec.friendship=Math.min(5,(rec.friendship||0)+1);rec.lastTalkedOn=today;}
  s.residents[r.id]=rec;
  if(!s.zukanSeen)s.zukanSeen={residents:[],buildings:[]};
  if(!s.zukanSeen.residents.includes(r.id))s.zukanSeen.residents.push(r.id);
  const questGiver=applyQuestEvent(s,{type:'talk',id:r.id}); // おねがい「○○とおはなし」
  save();
  if(questGiver)scene.time.delayedCall(1800,()=>scene.celebrate(questGiver));

  const line=firstMeet
    ?`こんにちは！${r.name}だよ！`
    :r.lines[(rec.friendship+r.lines.length)%r.lines.length];
  soundTask();
  speak(line);
  scene.sparkle(sp.x,sp.y-60,5);
  scene.tweens.add({targets:sp,scaleX:sp.scaleX*1.12,scaleY:sp.scaleY*1.12,duration:130,yoyo:true});
  showBubble(scene,sp,line,firstMeet?'💛':'❤️'.repeat(Math.min(rec.friendship,5)));

  scene.time.delayedCall(2600,()=>{
    if(!sp.active)return;
    sp.busy=false;
    wander(scene,sp);
  });
}

function showBubble(scene,sp,text,hearts){
  const tx=scene.add.text(0,0,text,{
    fontFamily:FONT,fontSize:'19px',color:'#2F3A3D',align:'center',
    wordWrap:{width:230,useAdvancedWrap:true},
  }).setOrigin(.5);
  const hx=scene.add.text(0,tx.height/2+13,hearts,{fontSize:'14px'}).setOrigin(.5);
  const w=Math.max(tx.width,60)+30,h=tx.height+hx.height+26;
  const g=scene.add.graphics();
  g.fillStyle(0xFFFFFF,.97);
  g.lineStyle(4,0x2F3A3D,1);
  g.fillRoundedRect(-w/2,-h/2,w,h,15);
  g.strokeRoundedRect(-w/2,-h/2,w,h,15);
  g.fillTriangle(-9,h/2-1,9,h/2-1,0,h/2+13);
  const bubble=scene.add.container(sp.x,sp.y-105,[g,tx,hx]).setDepth(7000).setScale(0);
  scene.fx.add(bubble);
  scene.tweens.add({targets:bubble,scale:1,duration:240,ease:'Back.easeOut'});
  scene.time.delayedCall(2400,()=>{
    scene.tweens.add({targets:bubble,scale:0,alpha:0,duration:180,onComplete:()=>bubble.destroy()});
  });
}
