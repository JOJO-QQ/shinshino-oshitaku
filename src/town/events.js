// ── イベント: 車が道路を走って現場へ→ミニゲームで解決 ──────────
// v5の「タップ3回」から刷新。車は広場から道路グリッドを走行し、
// 到着後に車種ごとのミニゲーム（spray/find/drag/swipe/crane）が始まる。
import {STAGES} from '../data/stages.js';
import {BUILDING_SPOTS} from '../data/townLayout.js';
import {ensureAudio, speak, soundSiren, soundComplete} from '../audio.js';
import {drivePath, driveAlong} from './drive.js';
import {MINIGAMES, TYPE_BY_ID, TYPE_GUIDE, TITLE_BY_ID} from './minigames.js';

const FONT="'Hiragino Maru Gothic Pro','BIZ UDPGothic',sans-serif";

export function runGenericEvent(scene,fi,onDone){
  ensureAudio();
  const st=STAGES[fi];
  const spot=BUILDING_SPOTS[fi];
  const type=TYPE_BY_ID[st.id]||'swipe';
  const guide=TYPE_GUIDE[type];
  const title=TITLE_BY_ID[st.id]||guide.title;

  const banner=scene.add.text(scene.scale.width/2,64,title,{
    fontFamily:FONT,fontSize:'24px',color:'#fff',backgroundColor:'rgba(58,42,20,.72)',padding:{x:16,y:9},
  }).setOrigin(.5,0).setScrollFactor(0).setDepth(6800);
  if(st.id==='fire'||st.id==='ladder'||st.id==='police')soundSiren();

  // 現場の困りごとを見せておく（ミニゲーム開始時に消す）
  const preview=scene.icon(spot.x,spot.y-46,st.ev.e,92);
  preview.setDepth(6001);
  scene.fx.add(preview);
  scene.tweens.add({targets:preview,y:preview.y-8,duration:600,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});

  // 車が広場から道路を走って駆けつける（カメラが追いかける）
  const pts=drivePath(spot.x,spot.y);
  const car=scene.add.image(pts[0].x,pts[0].y,`car_${st.id}`).setDisplaySize(170,128).setDepth(6000);
  scene.fx.add(car);
  scene.cameras.main.startFollow(car,true,.08,.08);
  driveAlong(scene,car,pts,430,()=>{
    scene.cameras.main.stopFollow();
    scene.cameras.main.pan(spot.x,spot.y-40,420,'Sine.easeOut');
    speak(guide.voice);

    // 背景タップ吸収 + 画面を少し暗く（視線誘導）
    const dim=scene.add.rectangle(0,0,scene.scale.width*2,scene.scale.height*2,0x000000,.26)
      .setScrollFactor(0).setDepth(5500).setInteractive();
    scene.tweens.killTweensOf(preview);
    preview.destroy();

    let finished=false;
    const finish=(cleanup)=>{
      if(finished)return;
      finished=true;
      soundComplete();
      speak('やったね。まちをたすけたよ。');
      const ok=scene.icon(spot.x,spot.y-70,'✅',84);
      const okScale=ok.scale;
      ok.setDepth(6400);ok.setScale(0);scene.fx.add(ok);
      scene.tweens.add({targets:ok,scale:okScale,duration:380,ease:'Back.easeOut'});
      scene.sparkle(spot.x,spot.y-60,12);
      if(cleanup)cleanup();
      if(objs&&objs.cleanupExtra)objs.cleanupExtra();
      scene.time.delayedCall(900,()=>{
        scene.tweens.add({targets:car,x:car.x+620,duration:900,ease:'Sine.easeIn',onComplete:()=>car.destroy()});
      });
      scene.time.delayedCall(1700,()=>{
        dim.destroy();banner.destroy();ok.destroy();
        onDone();
      });
    };

    const objs=MINIGAMES[type](scene,spot,st,car,finish);
    scene._mgObjs=objs; // デバッグ・自動テスト用
    // クレーンは「画面のどこでもタップ」で操作
    if(objs&&objs.onTapAnywhere)dim.on('pointerdown',objs.onTapAnywhere);
  });
}
