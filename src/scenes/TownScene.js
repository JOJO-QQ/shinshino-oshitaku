// ── TownScene: 見下ろし2Dタウン本体 ────────────────────────────
import {STAGES} from '../data/stages.js';
import {store, save} from '../store.js';
import {WORLD_SIZE, GRID, ROAD_GRID, DISTRICTS, BUILDING_SPOTS, TREES, FLOWERS, PLAYER_SPAWN, PLAZA} from '../data/townLayout.js';
import {setupCamera, panTo, isTap} from '../town/camera.js';
import {runGenericEvent} from '../town/events.js';
import {spawnResidents} from '../town/residentsCtrl.js';
import {soundTask, soundComplete, speak} from '../audio.js';
import {addBurnedHouseIssue, addPoliceRiskIssue, addHospitalNeededIssue, addTransitNeededIssue} from '../state/townIssues.js';
import {currentSeason, weatherFor, dateString} from '../state/state.js';
import {BUILDING_NAMES} from '../assets/townSvg.js';
import {applyQuestEvent} from '../data/quests.js';

const FONT="'Hiragino Maru Gothic Pro','BIZ UDPGothic',sans-serif";

export class TownScene extends Phaser.Scene{
  constructor(){super('Town');}

  create(){
    store.townScene=this;
    this.eventRunning=false;
    setupCamera(this,WORLD_SIZE,WORLD_SIZE);
    this.buildStatic();
    this.dyn=this.add.container(0,0);       // 状態依存の要素（建物・マーカー）はここに入れて丸ごと再生成
    this.fx=this.add.container(0,0);        // 演出用（雲より上）
    this.fx.setDepth(6000);
    this.buildDynamic();
    this.spawnPlayer();
    this._unlockedWorld=Math.floor(store.state.stage/4);
    this.buildClouds();
    this.buildStreakDecor();
    this.buildAmbient();
    spawnResidents(this);

    const c=store.state.camera;
    this.cameras.main.centerOn(c?.x??PLAZA.x,c?.y??PLAZA.y-100);
    if(store.state.pendingEvent>=0){
      const spot=BUILDING_SPOTS[store.state.pendingEvent];
      if(spot)this.time.delayedCall(500,()=>panTo(this,spot.x,spot.y,1100));
    }
    this.time.delayedCall(800,()=>this.checkCompletedConstructions());
    if(store.ui)store.ui.updateTopbar();
  }

  // ── 静的レイヤー: 地面・道路・木・花 ──
  buildStatic(){
    this.add.tileSprite(0,0,WORLD_SIZE,WORLD_SIZE,'grass0').setOrigin(0).setDepth(0);
    // 草の変化（単調さ防止のパッチ）
    for(let i=0;i<14;i++){
      const gx=(i*577)%WORLD_SIZE,gy=(i*811+400)%WORLD_SIZE;
      this.add.image(gx,gy,`grass${1+i%2}`).setDisplaySize(GRID,GRID).setDepth(0.5).setAlpha(.7);
    }
    ROAD_GRID.forEach((row,r)=>{
      for(let col=0;col<row.length;col++){
        const ch=row[col];
        if(ch==='.')continue;
        const key=ch==='-'?'road_h':ch==='|'?'road_v':ch==='P'?'plaza':'road_x';
        this.add.image(col*GRID,r*GRID,key).setOrigin(0).setDisplaySize(GRID,GRID).setDepth(1);
      }
    });
    TREES.forEach(t=>{
      this.add.image(t.x,t.y,'tree').setDisplaySize(112,136).setOrigin(.5,.92).setDepth(t.y);
    });
    if(currentSeason()!=='winter'){ // 冬は花を出さない（雪の季節感）
      FLOWERS.forEach(f=>{
        const key=f.c==='#FFB74D'?'flower_o':f.c==='#9FA8DA'?'flower_v':'flower_p';
        const fl=this.add.image(f.x,f.y,key).setDisplaySize(44,44).setOrigin(.5,.9).setDepth(f.y);
        this.makeTappable(fl,()=>this.tapFlower(f)); // おねがい「おはなを3つ」用
      });
    }
  }

  tapFlower(f){
    soundTask();
    this.sparkle(f.x,f.y-24,5);
    const giver=applyQuestEvent(store.state,{type:'flower'});
    save();
    if(giver)this.time.delayedCall(600,()=>this.celebrate(giver));
    else if(store.ui)store.ui.updateTopbar();
  }

  tapBuilding(i,spot){
    const s=store.state;
    if(!s.zukanSeen)s.zukanSeen={residents:[],buildings:[]};
    if(!s.zukanSeen.buildings.includes(i))s.zukanSeen.buildings.push(i);
    soundTask();
    this.sparkle(spot.x,spot.y-80,6);
    speak(BUILDING_NAMES[i]||'たてもの');
    const label=this.add.text(spot.x,spot.y-165,BUILDING_NAMES[i]||'たてもの',{
      fontFamily:FONT,fontSize:'26px',color:'#263238',backgroundColor:'#FFF7CC',padding:{x:14,y:7},
    }).setOrigin(.5).setDepth(7000).setScale(0);
    this.fx.add(label);
    this.tweens.add({targets:label,scale:1,duration:240,ease:'Back.easeOut'});
    this.time.delayedCall(1500,()=>{
      this.tweens.add({targets:label,alpha:0,scale:.6,duration:200,onComplete:()=>label.destroy()});
    });
    const giver=applyQuestEvent(s,{type:'visit',idx:i});
    save();
    if(giver)this.time.delayedCall(1100,()=>this.celebrate(giver));
    else if(store.ui)store.ui.updateTopbar();
  }

  // おねがい達成のお祝い
  celebrate(giver){
    soundComplete();
    speak(`おねがい だいせいこう！${giver.name}が よろこんでいるよ。`);
    const c=this.cameras.main;
    this.sparkle(c.midPoint.x,c.midPoint.y-60,14);
    if(store.ui)store.ui.updateTopbar();
  }

  // ── 動的レイヤー: 建物・イベント・課題マーカー ──
  buildDynamic(){
    const s=store.state;
    this.dyn.removeAll(true);
    const firstBuild=!this._builtShown;
    if(firstBuild)this._builtShown=new Set();

    STAGES.forEach((st,i)=>{
      const spot=BUILDING_SPOTS[i];
      if(s.buildings&&s.buildings[i]){
        const b=this.add.image(spot.x,spot.y,`bld_${i}`).setDisplaySize(150,150).setOrigin(.5,.86).setDepth(spot.y);
        this.makeTappable(b,()=>this.tapBuilding(i,spot));
        this.dyn.add(b);
        if(!firstBuild&&!this._builtShown.has(i)){
          // 新しく建った建物はぽんっと登場
          const target=b.scaleX;
          b.setScale(target*.12);
          this.tweens.add({targets:b,scale:target,duration:750,ease:'Back.easeOut'});
          this.sparkle(spot.x,spot.y-55,10);
        }
        this._builtShown.add(i);
      }else if(i===s.stage&&s.pendingEvent<0&&i<STAGES.length){
        // いま集めている車のスポット＝「つぎはここ」の予定地
        const l=this.add.image(spot.x,spot.y,'lot').setDisplaySize(104,95).setOrigin(.5,.9).setDepth(spot.y).setAlpha(.9);
        this.dyn.add(l);
      }
    });

    // 街の課題マーカー
    (s.townIssues||[]).forEach(issue=>{
      const meta=store.ui?.townIssueMeta(issue);
      if(!meta)return;
      const spot=BUILDING_SPOTS[issue.stageIdx??0];
      const m=this.icon(spot.x,spot.y-40,meta.icon,84);
      m.setDepth(spot.y+1);
      const label=this.add.text(spot.x,spot.y+16,meta.label,{
        fontFamily:FONT,fontSize:'17px',color:'#fff',backgroundColor:'rgba(0,0,0,.55)',padding:{x:9,y:4},
      }).setOrigin(.5,0).setDepth(spot.y+1);
      if(store.ui?.issueReadyToBuild(issue)){
        const ring=this.add.image(spot.x,spot.y-40,'ring').setDisplaySize(120,120).setDepth(spot.y).setAlpha(.9);
        this.tweens.add({targets:ring,scale:{from:ring.scale,to:ring.scale*1.25},alpha:{from:.9,to:.15},duration:900,repeat:-1});
        this.dyn.add(ring);
      }
      this.makeTappable(m,()=>store.ui?.showTownIssuePopup(issue.id));
      this.dyn.add(m);this.dyn.add(label);
    });

    // 発生中イベントのマーカー
    if(s.pendingEvent>=0&&s.pendingEvent<STAGES.length){
      const fi=s.pendingEvent,spot=BUILDING_SPOTS[fi];
      const ring=this.add.image(spot.x,spot.y-46,'ring').setDisplaySize(150,150).setDepth(spot.y).setAlpha(.95);
      this.tweens.add({targets:ring,scale:{from:ring.scale,to:ring.scale*1.3},alpha:{from:.95,to:.2},duration:800,repeat:-1});
      const m=this.icon(spot.x,spot.y-46,STAGES[fi].ev.e,96);
      m.setDepth(spot.y+2);
      this.tweens.add({targets:m,y:m.y-10,duration:700,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
      this.makeTappable(m,()=>this.startEvent(fi));
      this.eventMarker=m;
      this.dyn.add(ring);this.dyn.add(m);
    }else{
      this.eventMarker=null;
    }
  }

  // ── streakごほうび（広場のかざり: 3日=風船 7日=虹 14日=噴水） ──
  // 他のオブジェクトとY-sortを揃えるため、コンテナに入れず直接置く。
  buildStreakDecor(){
    (this.decorItems||[]).forEach(o=>{this.tweens.killTweensOf(o);o.destroy();});
    this.decorItems=[];
    const streak=(store.state.stamps&&store.state.stamps.streak)||0;
    if(streak>=3){
      [['balloon_p',1218,1248],['balloon_y',1300,1205],['balloon_b',1382,1248]].forEach(([k,x,y],i)=>{
        const b=this.add.image(x,y,k).setDisplaySize(50,92).setOrigin(.5,.95).setDepth(y);
        this.tweens.add({targets:b,y:y-9,angle:{from:-4,to:4},duration:1250+i*160,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
        this.decorItems.push(b);
      });
    }
    if(streak>=7){
      const r=this.add.image(1300,1140,'rainbow').setDisplaySize(350,195).setOrigin(.5,1).setDepth(1140).setAlpha(.96);
      this.tweens.add({targets:r,y:1132,duration:2100,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
      this.decorItems.push(r);
    }
    if(streak>=14){
      const f=this.add.image(1300,1272,'fountain').setDisplaySize(122,122).setOrigin(.5,.92).setDepth(1272);
      this.decorItems.push(f);
    }
  }

  // ── 天気・季節の空気感（画面固定パーティクル） ──
  buildAmbient(){
    if(this.ambient){this.ambient.destroy();this.ambient=null;}
    const W=this.scale.width;
    const season=currentSeason();
    const weather=weatherFor(dateString());
    let key=null,conf=null;
    if(weather==='rain'&&season!=='winter'){
      key='pt_rain';
      conf={x:{min:0,max:W},y:-30,speedY:{min:520,max:700},speedX:{min:-50,max:-15},
        lifespan:2200,scale:{min:.7,max:1.1},quantity:2,frequency:44};
    }else if(season==='winter'){
      key='pt_snow';
      conf={x:{min:0,max:W},y:-24,speedY:{min:36,max:76},speedX:{min:-26,max:26},
        lifespan:16000,scale:{min:.6,max:1.15},frequency:weather==='rain'?150:330};
    }else if(season==='spring'){
      key='pt_petal';
      conf={x:{min:-60,max:W},y:-24,speedY:{min:42,max:88},speedX:{min:22,max:72},
        rotate:{min:0,max:360},lifespan:15000,scale:{min:.75,max:1.25},frequency:640};
    }else if(season==='autumn'){
      key='pt_leaf';
      conf={x:{min:0,max:W+60},y:-24,speedY:{min:46,max:92},speedX:{min:-72,max:-22},
        rotate:{min:0,max:360},lifespan:15000,scale:{min:.75,max:1.25},frequency:640};
    }
    if(!key)return;
    this.ambient=this.add.particles(0,0,key,conf).setScrollFactor(0).setDepth(6600);
  }

  spawnPlayer(){
    this.player=this.add.image(PLAYER_SPAWN.x,PLAYER_SPAWN.y,'boy').setDisplaySize(66,79).setOrigin(.5,.94).setDepth(PLAYER_SPAWN.y);
    this.tweens.add({targets:this.player,y:this.player.y-6,duration:900,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
  }

  // ── 未開放地区の雲（現マップのfogの代替） ──
  buildClouds(){
    if(this.cloudGroup){
      this.cloudGroup.list.forEach(o=>this.tweens.killTweensOf(o));
      this.cloudGroup.destroy(true);
    }
    this.cloudGroup=this.add.container(0,0).setDepth(5000);
    const unlockedWorld=Math.floor(store.state.stage/4);
    DISTRICTS.forEach(d=>{
      if(d.world<=unlockedWorld)return;
      const{x,y,w,h}=d.rect;
      for(let i=0;i<6;i++){
        const cx=x+w*(0.16+(i%3)*0.34),cy=y+h*(i<3?0.3:0.72);
        const cl=this.add.image(cx,cy,'cloud').setDisplaySize(w*.62,h*.56).setAlpha(.97);
        cl.setData('world',d.world);
        this.tweens.add({targets:cl,x:cx+14,duration:2400+i*300,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
        this.cloudGroup.add(cl);
      }
      const q=this.add.text(x+w/2,y+h/2,'？',{fontFamily:FONT,fontSize:'46px',color:'#9FB4C8'}).setOrigin(.5);
      q.setData('world',d.world);
      this.cloudGroup.add(q);
    });
  }

  // ── 地区開放: 雲が晴れて新しいまちが見える ──
  revealDistricts(worlds){
    const d=DISTRICTS.find(x=>x.world===worlds[0]);
    if(!d){this.buildClouds();return;}
    panTo(this,d.focus.x,d.focus.y,900);
    const targets=this.cloudGroup
      ?this.cloudGroup.list.filter(o=>worlds.includes(o.getData('world')))
      :[];
    this.time.delayedCall(750,()=>{
      soundComplete();
      speak(`あたらしいまちが ひらけたよ。${d.name}だ！`);
      targets.forEach((cl,i)=>{
        this.tweens.killTweensOf(cl);
        this.tweens.add({targets:cl,alpha:0,scale:cl.scale*1.45,y:cl.y-70,duration:1000,delay:i*80,ease:'Sine.easeIn'});
      });
      this.time.delayedCall(1000+targets.length*80,()=>{
        this.sparkle(d.focus.x,d.focus.y,14);
        this.buildClouds();
      });
    });
  }

  // ── ヘルパー ──
  // SVGテクスチャがあればスプライト、無ければ絵文字Text
  icon(x,y,key,size){
    if(this.textures.exists(`icon_${key}`)){
      return this.add.image(x,y,`icon_${key}`).setDisplaySize(size,size);
    }
    return this.add.text(x,y,key,{fontSize:`${Math.round(size*.8)}px`}).setOrigin(.5);
  }

  // タップ判定（ドラッグと共存）+ 押下フィードバック
  makeTappable(obj,fn){
    obj.setInteractive({useHandCursor:true});
    if(obj.input&&obj.input.hitArea&&obj.input.hitArea.setTo){
      const ha=obj.input.hitArea;
      ha.setTo(ha.x-ha.width*.15,ha.y-ha.height*.15,ha.width*1.3,ha.height*1.3); // 5歳児の指対策
    }
    obj.on('pointerdown',()=>{
      this.tweens.add({targets:obj,scale:obj.scale*1.1,duration:90,yoyo:true});
    });
    obj.on('pointerup',p=>{if(isTap(p))fn();});
  }

  sparkle(x,y,n=8){
    const SP=['⭐','✨','🌟','💫'];
    for(let i=0;i<n;i++){
      const t=this.add.text(x,y,SP[i%SP.length],{fontSize:'26px'}).setOrigin(.5).setDepth(6500);
      this.fx.add(t);
      this.tweens.add({targets:t,x:x+Phaser.Math.Between(-70,70),y:y+Phaser.Math.Between(-90,20),
        alpha:0,scale:1.4,duration:650,delay:i*55,onComplete:()=>t.destroy()});
    }
  }

  // ── イベント ──
  startEvent(fi){
    if(this.eventRunning||store.state.pendingEvent!==fi)return;
    this.eventRunning=true;
    runGenericEvent(this,fi,()=>this.resolveEvent(fi));
  }

  // v5 playMapEvent の onDone と同じ状態遷移
  resolveEvent(fi){
    const s=store.state,id=STAGES[fi].id;
    if(id==='fire')addBurnedHouseIssue(s,fi);
    else{
      if(!s.buildings)s.buildings=[];
      s.buildings[fi]=true;
      if(id==='police')addPoliceRiskIssue(s,fi);
      if(id==='ambu')addHospitalNeededIssue(s,fi);
      if(id==='taxi')addTransitNeededIssue(s,fi);
    }
    s.pendingEvent=-1;
    save();
    this.eventRunning=false;
    this.refreshTown();
  }

  // ── 建設着工の演出（車が来て💨） ──
  playConstruction(stageIdx,vehicleId){
    const spot=BUILDING_SPOTS[stageIdx];
    const car=this.add.image(spot.x-500,spot.y+60,`car_${vehicleId}`).setDisplaySize(170,128).setDepth(6100);
    this.fx.add(car);
    this.tweens.add({targets:car,x:spot.x-30,duration:1000,ease:'Sine.easeOut',onComplete:()=>{
      for(let i=0;i<5;i++){
        const puff=this.icon(spot.x+Phaser.Math.Between(-30,30),spot.y-20-i*8,'💨',44);
        puff.setDepth(6200);this.fx.add(puff);
        this.tweens.add({targets:puff,y:puff.y-30,alpha:0,duration:1000,delay:i*120,onComplete:()=>puff.destroy()});
      }
      this.sparkle(spot.x,spot.y-30,8);
      this.time.delayedCall(1600,()=>{this.tweens.add({targets:car,x:spot.x+560,duration:900,ease:'Sine.easeIn',onComplete:()=>car.destroy()});});
    }});
    panTo(this,spot.x,spot.y,700);
  }

  // ── 建設完成（翌日）の演出 ──
  checkCompletedConstructions(){
    const s=store.state;
    const item=(s.completedConstructions||[])[0];
    if(!item)return;
    const spot=BUILDING_SPOTS[item.stageIdx??0];
    panTo(this,spot.x,spot.y,800);
    this.time.delayedCall(900,()=>{
      for(let i=0;i<7;i++){
        const puff=this.icon(spot.x+Phaser.Math.Between(-36,36),spot.y-10-i*6,'💨',48);
        puff.setDepth(6200);this.fx.add(puff);
        this.tweens.add({targets:puff,y:puff.y-34,alpha:0,duration:1100,delay:i*90,onComplete:()=>puff.destroy()});
      }
      this.time.delayedCall(700,()=>{
        this.sparkle(spot.x,spot.y-40,14);
        soundComplete();
        speak(`${item.title.replace('！','。')} ${item.body}。`);
        const label=this.add.text(spot.x,spot.y-120,'できた！',{
          fontFamily:FONT,fontSize:'30px',color:'#fff',backgroundColor:'#FF6B35',padding:{x:14,y:7},
        }).setOrigin(.5).setDepth(6300);
        this.fx.add(label);
        this.tweens.add({targets:label,y:label.y-16,duration:400,ease:'Back.easeOut'});
        s.completedConstructions=(s.completedConstructions||[]).filter(x=>x.id!==item.id);
        save();
        this.refreshTown();
        this.time.delayedCall(3600,()=>{label.destroy();this.checkCompletedConstructions();});
      });
    });
  }

  refreshTown(){
    this.buildDynamic();
    const unlocked=Math.floor(store.state.stage/4);
    if(unlocked>this._unlockedWorld){
      const newWorlds=[];
      for(let w=this._unlockedWorld+1;w<=Math.min(unlocked,DISTRICTS.length-1);w++)newWorlds.push(w);
      this._unlockedWorld=unlocked;
      this.revealDistricts(newWorlds);
    }else{
      this.buildClouds();
    }
    this.buildStreakDecor();
    spawnResidents(this);
    if(store.ui)store.ui.updateTopbar();
  }

  // 画面離脱時にカメラ位置を保存（overlay.jsから呼ぶ）
  saveCamera(){
    const cam=this.cameras.main;
    store.state.camera={x:Math.round(cam.midPoint.x),y:Math.round(cam.midPoint.y)};
    save();
  }
}
