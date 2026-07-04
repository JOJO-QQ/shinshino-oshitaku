// ── 汎用イベント（Phase 1: タップ3回で解決） ───────────────────
// v5の個別ミニゲーム15種はPhase 4でPhaserネイティブに移植して復活させる。
// 5歳児にはタップ連打でも十分成立する（計画で確認済み）。
import {STAGES} from '../data/stages.js';
import {BUILDING_SPOTS} from '../data/townLayout.js';
import {ensureAudio, speak, soundSiren, soundWater, soundTask, soundComplete} from '../audio.js';

const FONT="'Hiragino Maru Gothic Pro','BIZ UDPGothic',sans-serif";

const GUIDE={
  fire:{title:'ひをけそう！',voice:'ひかっている、ひをタップしてね。'},
  police:{title:'どろぼうをつかまえよう！',voice:'どろぼうのマークをタップしてね。'},
  ambu:{title:'けがをたすけよう！',voice:'けがをしたひとのマークをタップしてね。'},
  taxi:{title:'おきゃくさんをのせよう！',voice:'おきゃくさんのマークをタップしてね。'},
};

export function runGenericEvent(scene,fi,onDone){
  ensureAudio();
  const st=STAGES[fi];
  const spot=BUILDING_SPOTS[fi];
  const g=GUIDE[st.id]||{title:'まちをたすけよう！',voice:'ひかっているマークをタップしてね。'};

  // 画面を少し暗くして対象へ視線誘導（カメラ固定）
  const dim=scene.add.rectangle(0,0,scene.scale.width*2,scene.scale.height*2,0x000000,.30)
    .setScrollFactor(0).setDepth(5500).setInteractive(); // 背面へのタップも吸収
  const banner=scene.add.text(scene.scale.width/2,74,g.title,{
    fontFamily:FONT,fontSize:'24px',color:'#fff',backgroundColor:'rgba(0,0,0,.6)',padding:{x:16,y:9},
  }).setOrigin(.5,0).setScrollFactor(0).setDepth(6800);
  speak(g.voice);
  if(st.id==='fire'||st.id==='ladder')soundSiren();

  // 車が駆けつける
  const car=scene.add.image(spot.x-560,spot.y+80,`car_${st.id}`).setDisplaySize(180,135).setDepth(6000);
  scene.fx.add(car);
  scene.tweens.add({targets:car,x:spot.x-150,duration:1100,ease:'Sine.easeOut'});

  // 障害物（光るリング付き）
  const ring=scene.add.image(spot.x,spot.y-46,'ring').setDisplaySize(160,160).setDepth(5900);
  scene.fx.add(ring);
  scene.tweens.add({targets:ring,scale:{from:ring.scale,to:ring.scale*1.3},alpha:{from:.95,to:.2},duration:750,repeat:-1});
  const obstacle=scene.icon(spot.x,spot.y-46,st.ev.e,100);
  obstacle.setDepth(6001);
  scene.fx.add(obstacle);

  let taps=0,needed=3,finished=false;
  obstacle.setInteractive({useHandCursor:true});
  obstacle.on('pointerdown',()=>{
    if(finished)return;
    taps++;
    if(st.id==='fire'||st.id==='ladder'||st.id==='water')soundWater();else soundTask();
    scene.tweens.add({targets:obstacle,scale:obstacle.scale*1.18,duration:90,yoyo:true});
    const act=scene.icon(spot.x+Phaser.Math.Between(-36,36),spot.y-100,st.ev.a,56);
    act.setDepth(6400);scene.fx.add(act);
    scene.tweens.add({targets:act,y:act.y-46,alpha:0,duration:620,onComplete:()=>act.destroy()});
    scene.sparkle(spot.x,spot.y-60,4);
    if(taps>=needed){
      finished=true;
      ring.destroy();
      scene.tweens.add({targets:obstacle,alpha:0,scale:obstacle.scale*.6,duration:420,onComplete:()=>obstacle.destroy()});
      const ok=scene.icon(spot.x,spot.y-70,'✅',84);
      const okScale=ok.scale;
      ok.setDepth(6400);ok.setScale(0);scene.fx.add(ok);
      scene.tweens.add({targets:ok,scale:okScale,duration:380,ease:'Back.easeOut'});
      scene.sparkle(spot.x,spot.y-60,12);
      soundComplete();
      speak('やったね。まちをたすけたよ。');
      scene.time.delayedCall(900,()=>{
        scene.tweens.add({targets:car,x:spot.x+600,duration:900,ease:'Sine.easeIn',onComplete:()=>car.destroy()});
      });
      scene.time.delayedCall(1700,()=>{
        dim.destroy();banner.destroy();ok.destroy();
        onDone();
      });
    }
  });
}
