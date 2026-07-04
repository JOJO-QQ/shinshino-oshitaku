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

// 先にマップ画面を表示してから（=キャンバス親のサイズ確定後）Phaserを起動
overlay.showScreen('screen-map');
overlay.updateTopbar();

store.game=new Phaser.Game({
  type:Phaser.AUTO,
  parent:'phaser-town',
  backgroundColor:'#A8D98A',
  scale:{mode:Phaser.Scale.RESIZE,autoCenter:Phaser.Scale.CENTER_BOTH},
  scene:[BootScene,TownScene],
});
