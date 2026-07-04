// ── SVG文字列→Phaserテクスチャ ────────────────────────────────
// PNGファイルを作らず、既存のSVG生成関数の出力を起動時にラスタライズする。
// 2xサイズで読み込んでRetina対応（表示側でdisplaySizeを指定する）。

const urls=[];

export function queueSvg(scene,key,svgStr,w,h){
  if(scene.textures.exists(key))return;
  const url=URL.createObjectURL(new Blob([svgStr],{type:'image/svg+xml'}));
  urls.push(url);
  scene.load.svg(key,url,{width:Math.round(w*2),height:Math.round(h*2)});
}

// ロード完了後に呼んでBlob URLを解放する
export function releaseSvgUrls(){
  urls.forEach(u=>{try{URL.revokeObjectURL(u);}catch{}});
  urls.length=0;
}
