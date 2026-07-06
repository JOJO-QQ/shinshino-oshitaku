// ── セリフ音声の事前生成（edge-tts / ja-JP-NanamiNeural） ───────
// ゲーム内の speak() 全セリフを列挙して audio/*.mp3 と manifest.json を作る。
// 使い方: node tools/gen_voices.mjs   （生成済みファイルはスキップ＝再実行安全）
import {STAGES, TASKS} from '../src/data/stages.js';
import {RESIDENTS} from '../src/data/residents.js';
import {BUILDING_NAMES} from '../src/assets/townSvg.js';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const run=promisify(execFile);
const ROOT=path.join(path.dirname(fileURLToPath(import.meta.url)),'..');
const OUT=path.join(ROOT,'audio');
fs.mkdirSync(OUT,{recursive:true});

const VOICE='ja-JP-NanamiNeural';
const RATE='+12%';
const PITCH='+18Hz'; // 少し高め＝子供向けにやさしい声

// ── セリフ一覧 ──
const lines=new Set();
const add=t=>{if(t)lines.add(t);};

// audio.js
add('おとがでるよ。');
add('あさごはん、たべたかな？');
add('きがえは、おわったかな？');
add('はみがきも、したかな？');
add('にもつのじゅんびは、おわったかな？');
TASKS.forEach(t=>add(`${t.name}は、おわったかな？`));
// checklist.js
TASKS.forEach(t=>add(`${t.name}、できたね。`));
add('スタンプ、ぽん！きょうも がんばったね！');
STAGES.forEach(s=>add(`${s.name}、かんせい。やったね。`));
RESIDENTS.forEach(r=>add(`${r.name}だよ。`));
// overlay.js
add('たいへん、イベントがはっせいしたよ。マップのマークをタップして、たすけにいこう。');
add('きょうのしたくをはじめよう。できたものを、ぽんっとおしてね。');
add('ひかっている、ひをタップしてね。');
add('どろぼうのマークをタップしてね。');
add('けがをしたひとのマークをタップしてね。');
add('おきゃくさんのマークをタップしてね。');
add('ひかっているマークをタップしてね。');
add('ショベルカーがきたよ。おうちをなおしているよ。あしたできるよ。');
add('ブルドーザーがきたよ。けいさつしょのばしょをつくっているよ。あしたできるよ。');
add('クレーン車がきたよ。けいさつしょをたてているよ。あしたできるよ。');
// events.js / minigames.js
add('やったね。まちをたすけたよ。');
add('ながおしで みずを かけてね。');
add('かくれているのを さがして タップしてね。');
add('ひっぱって くるまに のせてね。');
add('スワイプで どかしてね。');
add('いいタイミングで タップしてね。');
// minigames.js trace/seq/dragTo（タイプ既定＋ステージ別）
add('ゆびで なぞって きれいにしてね。');
add('じゅんばんに タップしてね。');
add('ひっぱって はこんでね。');
add('なぞって みちを たいらにしてね。');
add('なぞって ゆきを かいてね。');
add('なぞって おはなに みずをまいてね。');
add('ばんそうこう、ハート、びょういんの じゅんばんに タップしてね。');
add('こども、にもつ、がっこうの じゅんばんに タップしてね。');
add('おきゃくさんを おうちまで はこんでね。');
add('おきゃくさんを ばすていまで はこんでね。');
add('てがみを ぽすとまで はこんでね。');
add('ねんりょうを すたんどまで はこんでね。');
// TownScene.js
BUILDING_NAMES.forEach(n=>add(n));
add('たてもの');
RESIDENTS.forEach(r=>add(`おねがい だいせいこう！${r.name}が よろこんでいるよ。`));
['まちのヒーロー','こうじげんば','はたらくしゃりょう','とくしゅしゃりょう','でかい！すごい！']
  .forEach(n=>add(`あたらしいまちが ひらけたよ。${n}だ！`));
add('おうちができたよ。 まちがなおったね。');
add('よていちができたよ。 つぎはくれーんしゃだよ。');
add('けいさつしょができたよ。 まちをまもれるね。');
// residentsCtrl.js
RESIDENTS.forEach(r=>{
  add(`こんにちは！${r.name}だよ！`);
  r.lines.forEach(l=>add(l));
});
add('こんにちは！きらりだよ！');
add('まいにち がんばってて すごいね！');
add('いっしょにいると きらきらしちゃう！');

// ── 生成 ──
const all=[...lines];
console.log('セリフ数:',all.length);
const manifest={};
const hash=t=>{let h=5381;for(const c of t)h=((h*33)^c.codePointAt(0))>>>0;return h.toString(36);};

let done=0,skipped=0;
const queue=[...all];
async function worker(){
  while(queue.length){
    const text=queue.shift();
    const file=`v_${hash(text)}.mp3`;
    manifest[text]=file;
    const fp=path.join(OUT,file);
    if(fs.existsSync(fp)&&fs.statSync(fp).size>1000){skipped++;continue;}
    try{
      await run('edge-tts',['--voice',VOICE,`--rate=${RATE}`,`--pitch=${PITCH}`,
        '--text',text,'--write-media',fp]);
      done++;
      if(done%10===0)console.log(`  ${done}/${all.length}`);
    }catch(e){
      console.error('FAILED:',text,e.message.slice(0,120));
    }
  }
}
await Promise.all(Array.from({length:6},worker));
fs.writeFileSync(path.join(OUT,'manifest.json'),JSON.stringify(manifest,null,0));
console.log(`生成${done} スキップ${skipped} → audio/manifest.json (${Object.keys(manifest).length}件)`);
