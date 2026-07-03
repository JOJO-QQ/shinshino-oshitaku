// ── DATA ──────────────────────────────────────────────────────
// index.html(v5) 行505-592 から移設。内容は無変更。

export const PART_LABELS = ['ボディ','タイヤ','ライト','エンブレム','スペシャル'];

export const STAGES = [
  // World 0
  {id:'fire',   name:'しょうぼうしゃ',     emoji:'🚒',color:'#E53935',world:0,
   parts:['しょうぼうボディ','タイヤ','あかいろとう','しょうぼうマーク','はしご'],
   ev:{e:'🔥',a:'💧'}},
  {id:'police', name:'ぱとかー',           emoji:'🚓',color:'#1565C0',world:0,
   parts:['ぱとかーボディ','タイヤ','あかいろとう','けいさつバッジ','さいれん'],
   ev:{e:'🦹',a:'✋'}},
  {id:'ambu',   name:'きゅうきゅうしゃ',   emoji:'🚑',color:'#E65100',world:0,
   parts:['きゅうきゅうボディ','タイヤ','あかいろとう','きゅうきゅうマーク','きゅうきゅうキット'],
   ev:{e:'🤕',a:'❤️'}},
  {id:'taxi',   name:'たくしー',           emoji:'🚕',color:'#F9A825',world:0,
   parts:['たくしーボディ','タイヤ','さいんらいと','たくしーマーク','ルーフサイン'],
   ev:{e:'👋',a:'😊'}},
  // World 1
  {id:'excav',  name:'しょべるかー',       emoji:'🚜',color:'#FF8F00',world:1,
   parts:['しょべるボディ','きゃたぴら','らいと','けんせつマーク','ばけっと'],
   ev:{e:'🪨',a:'💨'}},
  {id:'bull',   name:'ぶるどーざー',       emoji:'🚧',color:'#BF360C',world:1,
   parts:['ぶるどーボディ','きゃたぴら','らいと','けんせつマーク','ぶれーど'],
   ev:{e:'🪵',a:'💨'}},
  {id:'crane',  name:'くれーんしゃ',       emoji:'🏗️',color:'#4E342E',world:1,
   parts:['くれーんボディ','タイヤ','らいと','けんせつマーク','くれーんブーム'],
   ev:{e:'📦',a:'✅'}},
  {id:'dump',   name:'だんぷかー',         emoji:'🚚',color:'#D84315',world:1,
   parts:['だんぷボディ','タイヤ','らいと','けんせつマーク','ダンプベッド'],
   ev:{e:'🪨',a:'💨'}},
  // World 2
  {id:'bus',    name:'ばす',               emoji:'🚌',color:'#2E7D32',world:2,
   parts:['ばすボディ','タイヤ','ドア','ばすマーク','まど'],
   ev:{e:'🙋',a:'😊'}},
  {id:'truck',  name:'とらっく',           emoji:'🚛',color:'#1B5E20',world:2,
   parts:['とらっくボディ','タイヤ','らいと','かいしゃマーク','にもつだい'],
   ev:{e:'📦',a:'✅'}},
  {id:'mail',   name:'ゆうびんしゃ',       emoji:'🚐',color:'#B71C1C',world:2,
   parts:['ゆうびんボディ','タイヤ','らいと','ゆうびんマーク','ゆうびんBOX'],
   ev:{e:'✉️',a:'😊'}},
  {id:'garb',   name:'ごみしゅうしゅうしゃ',emoji:'🚚',color:'#558B2F',world:2,
   parts:['ごみしゃボディ','タイヤ','らいと','かんきょうマーク','ゴミかいてん'],
   ev:{e:'🗑️',a:'✅'}},
  // World 3
  {id:'tow',    name:'れっかーしゃ',       emoji:'🚗',color:'#6A1B9A',world:3,
   parts:['れっかーボディ','タイヤ','らいと','れっかーマーク','れっかーくれーん'],
   ev:{e:'🚙',a:'✅'}},
  {id:'snow',   name:'じょせつしゃ',       emoji:'🚜',color:'#0277BD',world:3,
   parts:['じょせつボディ','きゃたぴら','らいと','じょせつマーク','ゆきかきぶれーど'],
   ev:{e:'❄️',a:'💨'}},
  {id:'roller', name:'ろーどろーらー',     emoji:'🛞',color:'#4E342E',world:3,
   parts:['ろーらーボディ','ろーらー','らいと','どうろマーク','バイブレーター'],
   ev:{e:'🛣️',a:'✅'}},
  {id:'aerial', name:'こうしょさぎょうしゃ',emoji:'🚒',color:'#AD1457',world:3,
   parts:['さぎょうボディ','タイヤ','らいと','さぎょうマーク','こうくうバスケット'],
   ev:{e:'💡',a:'✅'}},
  // World 4
  {id:'ladder', name:'はしごしょうぼうしゃ',emoji:'🚒',color:'#B71C1C',world:4,
   parts:['はしごボディ','タイヤ','あかいろとう','しょうぼうマーク','ちょうはしご'],
   ev:{e:'🔥',a:'💧'}},
  {id:'tanker', name:'たんくろーりー',     emoji:'🚛',color:'#E65100',world:4,
   parts:['たんくボディ','タイヤ','らいと','ねんりょうマーク','タンク'],
   ev:{e:'⛽',a:'✅'}},
  {id:'school', name:'すくーるばす',       emoji:'🚌',color:'#F57F17',world:4,
   parts:['すくーるボディ','タイヤ','ドア','スクールマーク','こどもシート'],
   ev:{e:'🎒',a:'😊'}},
  {id:'water',  name:'さんすいしゃ',       emoji:'🚒',color:'#006064',world:4,
   parts:['さんすいボディ','タイヤ','らいと','さんすいマーク','さんすいノズル'],
   ev:{e:'🏙️',a:'💧'}},
];

export const WORLDS=[
  {name:'まちのヒーロー',  emoji:'🏙️',bg:'linear-gradient(to bottom,#bbdefb,#e3f2fd)'},
  {name:'こうじげんば',    emoji:'🏗️',bg:'linear-gradient(to bottom,#ffe0b2,#fff3e0)'},
  {name:'はたらくしゃりょう',emoji:'🛣️',bg:'linear-gradient(to bottom,#c8e6c9,#e8f5e9)'},
  {name:'とくしゅしゃりょう',emoji:'🌨️',bg:'linear-gradient(to bottom,#bbdefb,#e8eaf6)'},
  {name:'でかい！すごい！',emoji:'🌟',bg:'linear-gradient(to bottom,#f8bbd0,#fce4ec)'},
];

export const TASKS=[
  {id:'breakfast',name:'あさごはん',emoji:'🍚',partIdx:0},
  {id:'dress',    name:'きがえ',    emoji:'👕',partIdx:1},
  {id:'teeth',    name:'はみがき',  emoji:'🪥',partIdx:2},
  {id:'bag',      name:'にもつ',    emoji:'🎒',partIdx:3},
];

export const SPARKS=['⭐','✨','🌟','💫','🎉','🎊','⚡'];
export const BUILDING_EMOJIS=['🏠','🏢','🏥','🚉','🏗️','🏭','🏢','🏬','🏫','🏦','🏨','⛪','🏛️','❄️','🛣️','🔧','🏯','⛽','🎓','🌊'];
export const ALL_FALSE=[false,false,false,false,false];

export function stageIndexById(id){return STAGES.findIndex(x=>x.id===id);}
