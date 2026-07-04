// ── 起動 ──────────────────────────────────────────────────────
import {loadState} from './state/state.js';
import {store, save} from './store.js';
import {BootScene} from './scenes/BootScene.js';
import {TownScene} from './scenes/TownScene.js';
import * as overlay from './ui/overlay.js';
import * as checklist from './ui/checklist.js';
import {unlockSound} from './audio.js';

store.state=loadState();
save();

// TownScene→DOM の参照（循環import回避のため関数参照をstoreに置く）
store.ui={
  updateTopbar:overlay.updateTopbar,
  townIssueMeta:overlay.townIssueMeta,
  showTownIssuePopup:overlay.showTownIssuePopup,
  issueReadyToBuild:overlay.issueReadyToBuild,
};

// HTMLのonclick属性から呼ばれる関数をグローバルに公開
Object.assign(window,{
  openGarage:checklist.openGarage,
  setGarTab:checklist.setGarTab,
  openParent:checklist.openParent,
  approve:checklist.approve,
  testNextDay:checklist.testNextDay,
  testSkipCar:checklist.testSkipCar,
  startReset:checklist.startReset,
  cancelReset:checklist.cancelReset,
  showMap:overlay.showTown,
  showScreen:overlay.showScreen,
  heroAction:overlay.heroAction,
  copyShareUrl:overlay.copyShareUrl,
  repairTownIssue:overlay.repairTownIssue,
  startPoliceConstruction:overlay.startPoliceConstruction,
  unlockSound,
});
window.__store=store; // デバッグ・自動テスト用（ゲームからは未使用）

// 先にマップ画面を表示してから（=キャンバス親のサイズ確定後）Phaserを起動
overlay.showScreen('screen-map');
overlay.updateTopbar();

store.game=new Phaser.Game({
  type:Phaser.AUTO,
  parent:'phaser-town',
  backgroundColor:'#7DB65C',
  scale:{mode:Phaser.Scale.RESIZE,autoCenter:Phaser.Scale.CENTER_BOTH},
  scene:[BootScene,TownScene],
});

// ヒーロー領域のDOM（おねがいカード等）が増減すると #phaser-town の高さが変わるが、
// Phaserは親要素のサイズ変化を自動検知しないので、こちらから追従させる。
// 高さ0（画面切替でdisplay:none）のときはrefreshしない（WebGLが壊れるため）。
const townEl=document.getElementById('phaser-town');
new ResizeObserver(()=>{
  if(store.game&&townEl.offsetWidth>0&&townEl.offsetHeight>0)store.game.scale.refresh();
}).observe(townEl);
