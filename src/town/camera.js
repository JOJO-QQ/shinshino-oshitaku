// ── カメラ: ドラッグスクロール + 慣性 + タップ判定 ─────────────
// 触り心地の核。5歳児の指を想定してタップ判定はゆるめ（12px/300ms）。

export const TAP_DIST=12, TAP_MS=300;

export function isTap(pointer){
  return pointer.getDistance()<TAP_DIST&&(pointer.upTime-pointer.downTime)<TAP_MS;
}

const MIN_ZOOM=.55, MAX_ZOOM=1.8;

export function setupCamera(scene,worldW,worldH){
  const cam=scene.cameras.main;
  cam.setBounds(0,0,worldW,worldH);
  scene.input.addPointer(1); // 2本指ピンチ用
  let dragging=false,lx=0,ly=0,vx=0,vy=0;
  let pinching=false,pinchDist=0,pinchZoom=1;
  const p1=scene.input.pointer1,p2=scene.input.pointer2;

  scene.input.on('pointerdown',p=>{
    if(scene.eventRunning)return; // ミニゲーム中はカメラを動かさない
    dragging=true;lx=p.x;ly=p.y;vx=0;vy=0;
  });
  scene.input.on('pointermove',p=>{
    if(scene.eventRunning){dragging=false;return;}
    // 2本指: ピンチズーム
    if(p1.isDown&&p2.isDown){
      const d=Phaser.Math.Distance.Between(p1.x,p1.y,p2.x,p2.y);
      if(!pinching){pinching=true;pinchDist=d;pinchZoom=cam.zoom;}
      else if(pinchDist>0)cam.setZoom(Phaser.Math.Clamp(pinchZoom*d/pinchDist,MIN_ZOOM,MAX_ZOOM));
      dragging=false;vx=0;vy=0;
      return;
    }
    if(pinching)return; // ピンチ後、指が1本残っている間はドラッグしない
    if(!dragging||!p.isDown)return;
    const dx=p.x-lx,dy=p.y-ly;
    lx=p.x;ly=p.y;
    cam.scrollX-=dx/cam.zoom;
    cam.scrollY-=dy/cam.zoom;
    vx=dx;vy=dy;
  });
  const stop=()=>{
    dragging=false;
    if(!p1.isDown&&!p2.isDown)pinching=false;
  };
  scene.input.on('pointerup',stop);
  scene.input.on('pointerupoutside',stop);
  // PC: ホイールでもズームできる
  scene.input.on('wheel',(p,objs,dx,dy)=>{
    cam.setZoom(Phaser.Math.Clamp(cam.zoom-dy*.0011,MIN_ZOOM,MAX_ZOOM));
  });
  scene.events.on('update',()=>{
    if(dragging||pinching||scene.eventRunning)return;
    if(Math.abs(vx)<.4&&Math.abs(vy)<.4){vx=0;vy=0;return;}
    vx*=.93;vy*=.93;   // 慣性の減衰
    cam.scrollX-=vx/cam.zoom;
    cam.scrollY-=vy/cam.zoom;
  });
  return cam;
}

// 対象へゆっくりパン（起動時に「今日やること」を見せる導線）
export function panTo(scene,x,y,ms=900){
  scene.cameras.main.pan(x,y,ms,'Sine.easeInOut');
}
