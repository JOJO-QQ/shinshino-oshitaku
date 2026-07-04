// ── 住人データ（12体） ─────────────────────────────────────────
// stageIdx の建物が建つと引っ越してくる。homeは建物スポットからのオフセット。
// 同時に町にいるのは6体まで（residentsCtrl.jsが日替わりでローテーション）。

export const RESIDENTS=[
  {id:'wanta',  name:'わんた',    species:'dog',     stageIdx:0,
   c:{fur:'#D9A05B',dark:'#B57F3E',shirt:'#4FC3F7'},
   lines:['おうちがなおって うれしいなあ！','きょうも いいてんきだね！']},
  {id:'mikeko', name:'みけこ',    species:'cat',     stageIdx:1,
   c:{fur:'#F2C879',dark:'#D9A05B',shirt:'#F49AC1'},
   lines:['けいさつしょが できて あんしんだね','おひるねするの だいすき！']},
  {id:'usami',  name:'うさみ',    species:'rabbit',  stageIdx:2,
   c:{fur:'#F5F0E8',dark:'#DAD2C4',shirt:'#74B86F'},
   lines:['びょういんが あるから もう こわくないよ','ぴょんぴょん はねるの とくいだよ！']},
  {id:'kumakichi',name:'くまきち',species:'bear',    stageIdx:3,
   c:{fur:'#B08050',dark:'#8E6238',shirt:'#FFB74D'},
   lines:['タクシーで おでかけしようかな','はちみつが たべたいなあ']},
  {id:'panko',  name:'ぱんこ',    species:'panda',   stageIdx:4,
   c:{fur:'#FFFFFF',dark:'#3A3A3A',shirt:'#E57373'},
   lines:['こうじのおと どんどんって すごいね！','ささのは もぐもぐ おいしいよ']},
  {id:'konkon', name:'こんこん',  species:'fox',     stageIdx:5,
   c:{fur:'#EA8C3F',dark:'#C96F28',shirt:'#9575CD'},
   lines:['こうじょうから けむりが ぽっぽっ でてるね','かくれんぼ しようよ！']},
  {id:'buhi',   name:'ぶーこ',    species:'pig',     stageIdx:6,
   c:{fur:'#F7B8C4',dark:'#E896A8',shirt:'#4DB6AC'},
   lines:['おっきなビルが できたねえ！','おなか すいちゃった']},
  {id:'kerota', name:'けろた',    species:'frog',    stageIdx:7,
   c:{fur:'#8BC96A',dark:'#6DAB4E',shirt:'#FFE66D'},
   lines:['デパートで おかいもの たのしいな','あめのひも だいすきだよ！']},
  {id:'pen',    name:'ぺんすけ',  species:'penguin', stageIdx:8,
   c:{fur:'#FFFFFF',dark:'#37474F',shirt:'#FF8A65'},
   lines:['がっこうで おべんきょう するんだ！','よちよち あるくの じょうずでしょ']},
  {id:'piyo',   name:'ぴよちゃん',species:'bird',    stageIdx:9,
   c:{fur:'#FFE082',dark:'#FFB74D',shirt:'#81D4FA'},
   lines:['ぎんこうに ちょきん してるんだよ','ぴよぴよ うたを うたうよ！']},
  {id:'risurin',name:'りすりん',  species:'squirrel',stageIdx:10,
   c:{fur:'#C98A4B',dark:'#A66B31',shirt:'#AED581'},
   lines:['どんぐり いっぱい あつめたよ！','おてがみ とどいたかなあ']},
  {id:'mokomoko',name:'もこもこ', species:'sheep',   stageIdx:11,
   c:{fur:'#FFF7EC',dark:'#E8DCC8',shirt:'#7986CB'},
   lines:['もこもこの けが じまんなの','リサイクル えらいねえ！']},
];

// 引っ越し済み（=建物が建っている）住人のうち、今日町にいる最大6体を返す。
// 日付シードでローテーションして毎日顔ぶれが少し変わる。
export function activeResidents(state,dateStr){
  const moved=RESIDENTS.filter(r=>state.buildings&&state.buildings[r.stageIdx]);
  if(moved.length<=6)return moved;
  let h=0;for(let i=0;i<dateStr.length;i++)h=(h*31+dateStr.charCodeAt(i))>>>0;
  const start=h%moved.length;
  return Array.from({length:6},(_,i)=>moved[(start+i)%moved.length]);
}
