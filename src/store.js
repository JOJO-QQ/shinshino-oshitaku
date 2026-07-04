// ── 共有ストア ────────────────────────────────────────────────
// v5ではグローバル変数 state だったものをモジュール間で共有するための箱。
// main.js が起動時に store.state=loadState() をセットする。
import {saveState} from './state/state.js';

export const store={state:null};
export function save(){saveState(store.state);}
