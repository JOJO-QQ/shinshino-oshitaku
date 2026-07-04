// ── カメラ: ドラッグスクロール + 慣性 + タップ判定 ─────────────
// 触り心地の核。5歳児の指を想定してタップ判定はゆるめ（12px/300ms）。

export const TAP_DIST=12, TAP_MS=300;

export function isTap(pointer){
  return pointer.getDistance()<TAP_DIST&&(pointer.upTime-pointer.downTime)<TAP_MS;
}

export function setupCamera(scene,worldW,worldH){
  const cam=scene.cameras.main;
  cam.setBounds(0,0,worldW,worldH);
  let dragging=false,lx=0,ly=0,vx=0,vy=0;
  scene.input.on('pointerdown',p=>{dragging=true;lx=p.x;ly=p.y;vx=0;vy=0;});
  scene.input.on('pointermove',p=>{
    if(!dragging||!p.isDown)return;
    const dx=p.x-lx,dy=p.y-ly;
    lx=p.x;ly=p.y;
    cam.scrollX-=dx/cam.zoom;
    cam.scrollY-=dy/cam.zoom;
    vx=dx;vy=dy;
  });
  const stop=()=>{dragging=false;};
  scene.input.on('pointerup',stop);
  scene.input.on('pointerupoutside',stop);
  scene.events.on('update',()=>{
    if(dragging)return;
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
