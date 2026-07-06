// ── ミニゲーム8種（Phaserネイティブ） ───────────────────────────
// spray: ながおしで放水 / find: かくれんぼ / drag: 車にのせる /
// swipe: スワイプでどかす / crane: タイミングタップ /
// trace: なぞってきれいに / seq: 順番タップ / dragTo: 目的地まで運ぶ
// 各ゲームは (scene,spot,st,car,finish) で開始し、終わったら finish() を呼ぶ。
// 使うアイコンはそのステージの ev.e か各CFGの絵文字（SVGが無ければText代替）。

import {soundTask, soundWater, soundAttach, soundComplete, speak} from '../audio.js';

const FONT="'Hiragino Maru Gothic Pro','BIZ UDPGothic',sans-serif";

export const TYPE_BY_ID={
  fire:'spray',ladder:'spray',
  police:'find',tow:'find',
  ambu:'seq',school:'seq',
  taxi:'dragTo',bus:'dragTo',mail:'dragTo',tanker:'dragTo',
  truck:'drag',dump:'drag',garb:'drag',
  excav:'swipe',
  bull:'trace',snow:'trace',roller:'trace',water:'trace',
  crane:'crane',aerial:'crane',
};

export const TYPE_GUIDE={
  spray:{title:'みずをかけよう！',voice:'ながおしで みずを かけてね。'},
  find:{title:'どこにいるかな？',voice:'かくれているのを さがして タップしてね。'},
  drag:{title:'くるまにのせよう！',voice:'ひっぱって くるまに のせてね。'},
  swipe:{title:'スワイプでどかそう！',voice:'スワイプで どかしてね。'},
  crane:{title:'タイミングをあわせて！',voice:'いいタイミングで タップしてね。'},
  trace:{title:'なぞってきれいに！',voice:'ゆびで なぞって きれいにしてね。'},
  seq:{title:'じゅんばんにタップ！',voice:'じゅんばんに タップしてね。'},
  dragTo:{title:'はこんでとどけよう！',voice:'ひっぱって はこんでね。'},
};
// ステージごとのタイトル上書き（バナー表示のみ・音声はguideForで決まる）
export const TITLE_BY_ID={
  fire:'ひをけそう！',ladder:'ひをけそう！',
  police:'どろぼうをさがそう！',tow:'こわれたくるまをさがそう！',
  truck:'にもつをのせよう！',dump:'いしをのせよう！',garb:'ごみをあつめよう！',
  excav:'いわをどかそう！',
};

// ── ステージ別テーマ設定 ──
const TRACE_CFG={
  bull:  {patch:'🪵',title:'みちをたいらに！',   voice:'なぞって みちを たいらにしてね。'},
  snow:  {patch:'❄️',title:'ゆきをかこう！',     voice:'なぞって ゆきを かいてね。'},
  roller:{patch:'🕳️',title:'でこぼこをなおそう！',voice:'なぞって みちを たいらにしてね。'},
  water: {patch:'🥀',after:'🌼',title:'おはなにみずをまこう！',voice:'なぞって おはなに みずをまいてね。'},
};
const SEQ_CFG={
  ambu:  {steps:['🩹','❤️','🏥'],title:'じゅんばんにタップ！',voice:'ばんそうこう、ハート、びょういんの じゅんばんに タップしてね。'},
  school:{steps:['🙋','🎒','🎓'],title:'じゅんばんにタップ！',voice:'こども、にもつ、がっこうの じゅんばんに タップしてね。'},
};
const DRAGTO_CFG={
  taxi:  {item:'👋',target:'🏠',title:'おうちまでおくろう！',  voice:'おきゃくさんを おうちまで はこんでね。'},
  bus:   {item:'🙋',target:'🚏',title:'ばすていにあつめよう！',voice:'おきゃくさんを ばすていまで はこんでね。'},
  mail:  {item:'✉️',target:'📮',title:'てがみをとどけよう！',  voice:'てがみを ぽすとまで はこんでね。'},
  tanker:{item:'🛢️',target:'⛽',title:'ねんりょうをはこぼう！',voice:'ねんりょうを すたんどまで はこんでね。'},
};

// ステージ→バナータイトル・ガイド音声（テーマ設定 > TITLE_BY_ID > タイプ既定）
export function guideFor(st){
  const type=TYPE_BY_ID[st.id]||'swipe';
  const cfg=({trace:TRACE_CFG,seq:SEQ_CFG,dragTo:DRAGTO_CFG}[type]||{})[st.id];
  const g=TYPE_GUIDE[type];
  return {type,title:(cfg&&cfg.title)||TITLE_BY_ID[st.id]||g.title,voice:(cfg&&cfg.voice)||g.voice};
}

const kill=(scene,objs)=>objs.forEach(o=>{if(o&&o.active!==false){scene.tweens.killTweensOf(o);o.destroy();}});

// 共通: ちいさな達成演出
function popDone(scene,x,y){
  soundTask();
  scene.sparkle(x,y,6);
}

// ── spray: 炎(ev.e)3つをながおしで消す ──
function spray(scene,spot,st,car,finish){
  const objs=[];
  const flames=[[-72,-26],[0,-72],[72,-26]].map(([dx,dy],i)=>{
    const f=scene.icon(spot.x+dx,spot.y+dy-30,st.ev.e,86);
    f.setDepth(6300);f.hp=10;f.baseScale=f.scale;
    f.setInteractive({useHandCursor:true});
    scene.tweens.add({targets:f,scale:f.scale*1.07,duration:420,yoyo:true,repeat:-1,delay:i*140});
    objs.push(f);
    return f;
  });
  let holding=null,doneCount=0,tick=0;
  const timer=scene.time.addEvent({delay:110,loop:true,callback:()=>{
    if(!holding||!holding.active)return;
    holding.hp--;
    tick++;
    if(tick%3===0)soundWater();
    // 水しぶき
    const d=scene.icon(holding.x+Phaser.Math.Between(-22,22),holding.y-56,'💧',30);
    d.setDepth(6400);objs.push(d);
    scene.tweens.add({targets:d,y:d.y+46,alpha:0,duration:300,onComplete:()=>d.destroy()});
    scene.tweens.killTweensOf(holding);
    holding.setScale(holding.baseScale*(0.4+holding.hp/10*0.6));
    if(holding.hp<=0){
      const f=holding;holding=null;
      const puff=scene.icon(f.x,f.y,'💨',60);puff.setDepth(6400);objs.push(puff);
      scene.tweens.add({targets:puff,y:puff.y-36,alpha:0,duration:700,onComplete:()=>puff.destroy()});
      popDone(scene,f.x,f.y);
      f.destroy();
      if(++doneCount>=flames.length){timer.remove();finish(()=>kill(scene,objs));}
    }
  }});
  flames.forEach(f=>{
    f.on('pointerdown',()=>{holding=f;});
  });
  const up=()=>{holding=null;};
  scene.input.on('pointerup',up);
  objs.cleanupExtra=()=>{scene.input.off('pointerup',up);timer.remove(false);};
  return objs;
}

// ── find: しげみ3つから ev.e をさがす（2回） ──
function find(scene,spot,st,car,finish){
  const objs=[];
  let round=0,busy=false;
  const bushes=[[-84,10],[0,-46],[84,10]].map(([dx,dy])=>{
    const b=scene.add.image(spot.x+dx,spot.y+dy-20,'bush').setDisplaySize(96,78).setOrigin(.5,.85).setDepth(6300);
    b.setInteractive({useHandCursor:true});
    objs.push(b);
    return b;
  });
  let correct=Phaser.Math.Between(0,2);
  // 正解のしげみはちょっとだけ大きくゆれる（5歳児へのヒント）
  const wobble=()=>bushes.forEach((b,i)=>{
    scene.tweens.killTweensOf(b);
    scene.tweens.add({targets:b,angle:{from:-2,to:2},duration:i===correct?260:520,yoyo:true,repeat:-1});
  });
  wobble();
  bushes.forEach((b,i)=>{
    b.on('pointerdown',()=>{
      if(busy)return;
      if(i!==correct){
        busy=true;
        scene.tweens.add({targets:b,angle:{from:-8,to:8},duration:80,yoyo:true,repeat:3,onComplete:()=>{b.angle=0;busy=false;}});
        return;
      }
      busy=true;
      const t=scene.icon(b.x,b.y-40,st.ev.e,74);
      t.setDepth(6400);objs.push(t);
      popDone(scene,b.x,b.y-40);
      round++;
      if(round>=2){
        scene.tweens.add({targets:t,y:t.y-26,duration:420,ease:'Back.easeOut'});
        finish(()=>kill(scene,objs));
      }else{
        correct=(i+Phaser.Math.Between(1,2))%3;
        scene.tweens.add({targets:t,x:bushes[correct].x,y:bushes[correct].y-30,alpha:0,duration:560,ease:'Sine.easeIn',
          onComplete:()=>{t.destroy();busy=false;wobble();}});
      }
    });
  });
  return objs;
}

// ── drag: ev.e 2つを車までひっぱる ──
function drag(scene,spot,st,car,finish){
  const objs=[];
  let loaded=0,grab=null;
  const ring=scene.add.image(car.x,car.y-14,'ring').setDisplaySize(150,150).setDepth(6200).setAlpha(.9);
  scene.tweens.add({targets:ring,scale:ring.scale*1.2,alpha:.25,duration:800,yoyo:true,repeat:-1});
  objs.push(ring);
  const items=[[-60,-70],[64,-58]].map(([dx,dy])=>{
    const it=scene.icon(spot.x+dx,spot.y+dy,st.ev.e,72);
    it.setDepth(6400);it.homeX=it.x;it.homeY=it.y;
    it.setInteractive({useHandCursor:true});
    scene.tweens.add({targets:it,y:it.y-8,duration:600,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    it.on('pointerdown',()=>{grab=it;scene.tweens.killTweensOf(it);});
    objs.push(it);
    return it;
  });
  const move=p=>{
    if(!grab||!grab.active)return;
    grab.x=p.worldX;grab.y=p.worldY;
  };
  const up=()=>{
    if(!grab||!grab.active){grab=null;return;}
    const it=grab;grab=null;
    if(Phaser.Math.Distance.Between(it.x,it.y,car.x,car.y)<95){
      soundAttach();
      scene.tweens.add({targets:it,x:car.x,y:car.y-16,scale:it.scale*.45,alpha:0,duration:340,ease:'Sine.easeIn',
        onComplete:()=>{it.destroy();popDone(scene,car.x,car.y-40);
          if(++loaded>=items.length)finish(()=>kill(scene,objs));}});
    }else{
      scene.tweens.add({targets:it,x:it.homeX,y:it.homeY,duration:300,ease:'Back.easeOut'});
    }
  };
  scene.input.on('pointermove',move);
  scene.input.on('pointerup',up);
  objs.cleanupExtra=()=>{scene.input.off('pointermove',move);scene.input.off('pointerup',up);};
  return objs;
}

// ── swipe: ev.e 3つをスワイプではじきとばす ──
function swipe(scene,spot,st,car,finish){
  const objs=[];
  let cleared=0,active=null,sx=0,sy=0;
  [[-76,-14],[6,-64],[82,-8]].forEach(([dx,dy])=>{
    const it=scene.icon(spot.x+dx,spot.y+dy-16,st.ev.e,78);
    it.setDepth(6300);
    it.setInteractive({useHandCursor:true});
    it.on('pointerdown',p=>{active=it;sx=p.worldX;sy=p.worldY;});
    objs.push(it);
  });
  const move=p=>{
    if(!active||!active.active)return;
    const dx=p.worldX-sx,dy=p.worldY-sy;
    if(Math.hypot(dx,dy)>72){
      const it=active;active=null;
      soundTask();
      const puff=scene.icon(it.x,it.y,'💨',54);puff.setDepth(6250);objs.push(puff);
      scene.tweens.add({targets:puff,alpha:0,duration:600,onComplete:()=>puff.destroy()});
      scene.tweens.add({targets:it,x:it.x+dx*3.2,y:it.y+dy*3.2,angle:dx>0?340:-340,alpha:0,duration:460,ease:'Sine.easeIn',
        onComplete:()=>{it.destroy();popDone(scene,spot.x,spot.y-40);
          if(++cleared>=3)finish(()=>kill(scene,objs));}});
    }
  };
  const up=()=>{active=null;};
  scene.input.on('pointermove',move);
  scene.input.on('pointerup',up);
  objs.cleanupExtra=()=>{scene.input.off('pointermove',move);scene.input.off('pointerup',up);};
  return objs;
}

// ── crane: ゆれるフックをタイミングよくおろして ev.e をつかむ（2回） ──
function crane(scene,spot,st,car,finish){
  const objs=[];
  const topY=spot.y-190;
  let round=0,dropping=false;
  const rope=scene.add.graphics().setDepth(6280);objs.push(rope);
  const hook=scene.icon(spot.x,topY,'🪝',54);
  hook.setDepth(6300);objs.push(hook);
  let box=null;
  const newBox=()=>{
    box=scene.icon(spot.x+Phaser.Math.Between(-60,60),spot.y-16,st.ev.e,72);
    box.setDepth(6260);objs.push(box);
  };
  newBox();
  const swing=()=>scene.tweens.add({targets:hook,x:{from:spot.x-110,to:spot.x+110},duration:1100,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
  let swingTween=swing();
  const drawRope=()=>{
    if(!rope.active)return;
    rope.clear();
    rope.lineStyle(5,0x6B4A2E,1);
    rope.lineBetween(spot.x,topY-26,hook.x,hook.y-16);
  };
  const ev=scene.events.on('update',drawRope);
  const tap=()=>{
    if(dropping||!hook.active)return;
    dropping=true;
    swingTween.stop();
    scene.tweens.add({targets:hook,y:spot.y-30,duration:340,ease:'Sine.easeIn',onComplete:()=>{
      const hit=box&&Math.abs(hook.x-box.x)<48;
      if(hit){
        soundAttach();
        scene.tweens.add({targets:[hook,box],y:'-=160',duration:520,ease:'Sine.easeOut',
          onUpdate:()=>{if(box)box.x=hook.x;},
          onComplete:()=>{
            popDone(scene,hook.x,hook.y);
            if(box){box.destroy();box=null;}
            round++;
            if(round>=2){finish(()=>{scene.events.off('update',drawRope);kill(scene,objs);});return;}
            hook.y=topY;dropping=false;swingTween=swing();newBox();
          }});
      }else{
        scene.tweens.add({targets:hook,angle:{from:-10,to:10},duration:90,yoyo:true,repeat:2,onComplete:()=>{hook.angle=0;}});
        scene.tweens.add({targets:hook,y:topY,duration:340,delay:280,ease:'Sine.easeOut',
          onComplete:()=>{dropping=false;swingTween=swing();}});
      }
    }});
  };
  // 画面のどこをタップしてもOK（dimレイヤーから呼んでもらう）
  objs.onTapAnywhere=tap;
  objs.cleanupExtra=()=>{scene.events.off('update',drawRope);};
  return objs;
}

// ── trace: パッチ3つをゆびでなぞって消す（除雪・整地・水まき） ──
function trace(scene,spot,st,car,finish){
  const cfg=TRACE_CFG[st.id]||TRACE_CFG.bull;
  const objs=[];
  let cleared=0,down=false,tick=0;
  const patches=[[-82,-8],[0,-60],[82,-4]].map(([dx,dy],i)=>{
    const p=scene.icon(spot.x+dx,spot.y+dy-16,cfg.patch,80);
    p.setDepth(6300);p.hp=6;p.baseScale=p.scale;
    scene.tweens.add({targets:p,angle:{from:-3,to:3},duration:520,yoyo:true,repeat:-1,delay:i*130});
    objs.push(p);
    return p;
  });
  const downFn=()=>{down=true;};
  const upFn=()=>{down=false;};
  const move=p=>{
    if(!down)return;
    tick++;
    // なぞった軌跡（水まきは💧・それ以外は✨）
    if(tick%2===0){
      const tr=scene.icon(p.worldX,p.worldY,cfg.after?'💧':'✨',26);
      tr.setDepth(6250);objs.push(tr);
      scene.tweens.add({targets:tr,alpha:0,y:tr.y+14,duration:320,onComplete:()=>tr.destroy()});
    }
    patches.forEach(pt=>{
      if(!pt.active||pt.hp<=0)return;
      if(Phaser.Math.Distance.Between(p.worldX,p.worldY,pt.x,pt.y)<54){
        pt.hp--;
        if(tick%3===0)soundWater();
        scene.tweens.killTweensOf(pt);
        pt.setScale(pt.baseScale*(0.4+pt.hp/6*0.6));
        if(pt.hp<=0){
          if(cfg.after){
            const fl=scene.icon(pt.x,pt.y,cfg.after,72);
            const fs=fl.scale;fl.setDepth(6300);fl.setScale(0);objs.push(fl);
            scene.tweens.add({targets:fl,scale:fs,duration:380,ease:'Back.easeOut'});
          }else{
            const puff=scene.icon(pt.x,pt.y,'💨',54);puff.setDepth(6300);objs.push(puff);
            scene.tweens.add({targets:puff,alpha:0,y:puff.y-24,duration:500,onComplete:()=>puff.destroy()});
          }
          popDone(scene,pt.x,pt.y);
          pt.destroy();
          if(++cleared>=patches.length)finish(()=>kill(scene,objs));
        }
      }
    });
  };
  scene.input.on('pointerdown',downFn);
  scene.input.on('pointermove',move);
  scene.input.on('pointerup',upFn);
  objs.cleanupExtra=()=>{
    scene.input.off('pointerdown',downFn);
    scene.input.off('pointermove',move);
    scene.input.off('pointerup',upFn);
  };
  return objs;
}

// ── seq: 番号バッジつきアイコンを 1→2→3 の順にタップ ──
function seq(scene,spot,st,car,finish){
  const cfg=SEQ_CFG[st.id]||SEQ_CFG.ambu;
  const objs=[];
  let step=0,busy=false;
  const groups=cfg.steps.map((key,i)=>{
    const x=spot.x+(i-1)*88,y=spot.y-42;
    const it=scene.icon(x,y,key,72);
    it.setDepth(6300);it.baseScale=it.scale;
    const ring=scene.add.circle(x+26,y-28,15,0xFFB74D).setStrokeStyle(3,0xffffff).setDepth(6340);
    const num=scene.add.text(x+26,y-28,String(i+1),{fontFamily:FONT,fontSize:'18px',color:'#fff'}).setOrigin(.5).setDepth(6350);
    objs.push(it,ring,num);
    return {it,ring,num};
  });
  const refresh=()=>groups.forEach((g,i)=>{
    if(!g.it.active)return;
    scene.tweens.killTweensOf(g.it);
    g.it.setAlpha(i===step?1:.8);
    g.it.setScale(g.it.baseScale);
    if(i===step)scene.tweens.add({targets:g.it,scale:g.it.baseScale*1.12,duration:420,yoyo:true,repeat:-1});
  });
  refresh();
  groups.forEach((g,i)=>{
    g.it.setInteractive({useHandCursor:true});
    g.it.on('pointerdown',()=>{
      if(busy)return;
      if(i!==step){ // まちがい: ぶるぶる
        busy=true;
        scene.tweens.add({targets:g.it,angle:{from:-8,to:8},duration:80,yoyo:true,repeat:3,onComplete:()=>{g.it.angle=0;busy=false;}});
        return;
      }
      busy=true;
      soundAttach();
      g.ring.setVisible(false);g.num.setVisible(false);
      scene.tweens.killTweensOf(g.it);
      scene.tweens.add({targets:g.it,x:car.x,y:car.y-16,scale:g.it.baseScale*.45,alpha:0,duration:360,ease:'Sine.easeIn',
        onComplete:()=>{
          g.it.destroy(); // 透明のまま残すとタップを吸ってしまう
          popDone(scene,car.x,car.y-40);
          step++;busy=false;
          if(step>=groups.length)finish(()=>kill(scene,objs));
          else refresh();
        }});
    });
  });
  return objs;
}

// ── dragTo: アイテム2つを目的地アイコンまでひっぱる ──
function dragTo(scene,spot,st,car,finish){
  const cfg=DRAGTO_CFG[st.id]||DRAGTO_CFG.mail;
  const objs=[];
  let loaded=0,grab=null;
  const tx=spot.x+96,ty=spot.y-34;
  const tgt=scene.icon(tx,ty,cfg.target,88);
  tgt.setDepth(6250);objs.push(tgt);
  const ring=scene.add.image(tx,ty,'ring').setDisplaySize(140,140).setDepth(6200).setAlpha(.9);
  scene.tweens.add({targets:ring,scale:ring.scale*1.2,alpha:.25,duration:800,yoyo:true,repeat:-1});
  objs.push(ring);
  const items=[[-104,-66],[-46,-14]].map(([dx,dy])=>{
    const it=scene.icon(spot.x+dx,spot.y+dy,cfg.item,70);
    it.setDepth(6400);it.homeX=it.x;it.homeY=it.y;
    it.setInteractive({useHandCursor:true});
    scene.tweens.add({targets:it,y:it.y-8,duration:600,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    it.on('pointerdown',()=>{grab=it;scene.tweens.killTweensOf(it);});
    objs.push(it);
    return it;
  });
  const move=p=>{
    if(!grab||!grab.active)return;
    grab.x=p.worldX;grab.y=p.worldY;
  };
  const up=()=>{
    if(!grab||!grab.active){grab=null;return;}
    const it=grab;grab=null;
    if(Phaser.Math.Distance.Between(it.x,it.y,tx,ty)<95){
      soundAttach();
      scene.tweens.add({targets:it,x:tx,y:ty-10,scale:it.scale*.45,alpha:0,duration:340,ease:'Sine.easeIn',
        onComplete:()=>{it.destroy();popDone(scene,tx,ty-40);
          if(++loaded>=items.length)finish(()=>kill(scene,objs));}});
    }else{
      scene.tweens.add({targets:it,x:it.homeX,y:it.homeY,duration:300,ease:'Back.easeOut'});
    }
  };
  scene.input.on('pointermove',move);
  scene.input.on('pointerup',up);
  objs.cleanupExtra=()=>{scene.input.off('pointermove',move);scene.input.off('pointerup',up);};
  return objs;
}

export const MINIGAMES={spray,find,drag,swipe,crane,trace,seq,dragTo};
