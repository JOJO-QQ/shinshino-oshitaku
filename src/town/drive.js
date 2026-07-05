// ── 道路走行: 広場から現場まで道路グリッドをBFSで走る ──────────
import {ROAD_GRID, GRID} from '../data/townLayout.js';

const ROWS=ROAD_GRID.length, COLS=ROAD_GRID[0].length;
const isRoad=(c,r)=>r>=0&&r<ROWS&&c>=0&&c<COLS&&ROAD_GRID[r][c]!=='.';
const center=(c,r)=>({x:c*GRID+GRID/2,y:r*GRID+GRID/2});

// 目的地に一番近い道路セルを探す
function nearestRoadCell(x,y){
  let best=null,bd=Infinity;
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
    if(!isRoad(c,r))continue;
    const p=center(c,r),d=(p.x-x)**2+(p.y-y)**2;
    if(d<bd){bd=d;best={c,r};}
  }
  return best;
}

// BFS経路（セル列）
function bfs(from,to){
  const key=(c,r)=>r*COLS+c;
  const prev=new Map();
  prev.set(key(from.c,from.r),null);
  const q=[from];
  while(q.length){
    const cur=q.shift();
    if(cur.c===to.c&&cur.r===to.r)break;
    for(const[dc,dr]of[[1,0],[-1,0],[0,1],[0,-1]]){
      const c=cur.c+dc,r=cur.r+dr;
      if(!isRoad(c,r)||prev.has(key(c,r)))continue;
      prev.set(key(c,r),cur);
      q.push({c,r});
    }
  }
  if(!prev.has(key(to.c,to.r)))return[from];
  const path=[];
  let cur=to;
  while(cur){path.unshift(cur);cur=prev.get(key(cur.c,cur.r));}
  return path;
}

// 直線部分の中間点を省いてtween数を減らす
function simplify(pts){
  if(pts.length<3)return pts;
  const out=[pts[0]];
  for(let i=1;i<pts.length-1;i++){
    const a=out[out.length-1],b=pts[i],c=pts[i+1];
    if((a.x===b.x&&b.x===c.x)||(a.y===b.y&&b.y===c.y))continue;
    out.push(b);
  }
  out.push(pts[pts.length-1]);
  return out;
}

// 広場(6,6)→目的地近くの道路→現場わきの停車位置、のワールド座標列
export function drivePath(toX,toY){
  const goal=nearestRoadCell(toX,toY);
  const cells=bfs({c:6,r:6},goal);
  const pts=simplify(cells.map(({c,r})=>center(c,r)));
  // 停車位置: 現場の手前（左下寄り）
  pts.push({x:toX-95,y:toY+55});
  return pts;
}

// スプライトを経路に沿って走らせる（flipX付き）。完了でonArrive。
export function driveAlong(scene,sprite,pts,speed,onArrive){
  let i=1;
  const step=()=>{
    if(!sprite.active){return;}
    if(i>=pts.length){onArrive&&onArrive();return;}
    const p=pts[i],d=Phaser.Math.Distance.Between(sprite.x,sprite.y,p.x,p.y);
    if(Math.abs(p.x-sprite.x)>6)sprite.setFlipX(p.x<sprite.x);
    scene.tweens.add({targets:sprite,x:p.x,y:p.y,duration:Math.max(120,d/speed*1000),
      ease:i===pts.length-1?'Sine.easeOut':'Linear',
      onUpdate:()=>sprite.setDepth(sprite.y+2000),
      onComplete:()=>{i++;step();},
    });
  };
  step();
}
