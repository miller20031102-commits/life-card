/*
  人生副本｜角色卡販賣機
  上線前只需要改這裡：
  1) APPS_SCRIPT_URL：貼上 Google Apps Script Web App URL，才能啟用一次性解鎖碼。
  2) PAYMENT_NOTE：改成你的付款方式或表單連結。
*/
const CONFIG = {
  price: 'NT$49',
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbxQ8TxLBVIQgeTQkBbHeryba07gJWhDpgqpSzROdKgqktHGy3LKou2-QyMu5cUcn1V5/exec',
  PAYMENT_NOTE: '付款方式：請改成你的銀行轉帳 / LINE Pay / 表單連結。付款後傳截圖與訂單編號給站主。',
  brand: '人生副本'
};

const axes = ['warm','cool','social','solo','romance','avoid','ambition','chaos','support','warrior','creative','overthink'];

const questions = [
  { title:'朋友通常覺得你是？', hint:'選最常被說中的那個，不用選你想成為的樣子。', options:[
    opt('🧃','很好相處但其實有邊界','笑笑的，心裡有自己的安全距離。',{warm:2,solo:1,support:1}),
    opt('⚡','很有梗，負責讓場子活起來','可以講到大家笑，但回家會突然安靜。',{social:2,creative:2,chaos:1}),
    opt('🧊','看起來冷，熟了才知道很暖','不是難相處，只是慢熱。',{cool:2,warm:1,solo:1}),
    opt('🛡️','默默照顧大家的人','不一定講好聽話，但會真的處理事情。',{support:3,warm:1,warrior:1})
  ]},
  { title:'遇到喜歡的人，你通常會？', hint:'這題會影響你的戀愛屬性。', options:[
    opt('🏃','越喜歡越裝沒差','心裡很在意，外表像剛睡醒。',{romance:2,avoid:3,cool:1,overthink:1}),
    opt('💬','會主動，但會觀察對方反應','我可以丟球，但你要接。',{romance:2,social:1,warm:1}),
    opt('🌀','會想太多，開始腦補 30 集','一句話可以分析到凌晨兩點。',{romance:2,overthink:3,solo:1}),
    opt('🔥','喜歡就衝，不想浪費時間','人生太短，曖昧太慢。',{romance:2,warrior:2,chaos:1})
  ]},
  { title:'你最常卡在哪裡？', hint:'人生副本的主要阻礙通常都藏在這題。', options:[
    opt('⏳','想很多，做很慢','腦中已經做好了，現實還沒開始。',{overthink:3,creative:1,avoid:1}),
    opt('🌪️','三分鐘熱度，但靈感很多','開始很猛，收尾像失蹤人口。',{chaos:3,creative:2}),
    opt('🪫','社交跟生活電量都很低','不是不努力，是系統快沒電。',{solo:3,overthink:1}),
    opt('🥊','太想變強，反而逼死自己','休息時也覺得自己不夠好。',{ambition:3,warrior:2,overthink:1})
  ]},
  { title:'你的社交電量大概是？', hint:'請誠實，系統不會扣你社交分數。', options:[
    opt('🔋','人越多越有精神','聊天會回血，聚會是補包。',{social:3,warm:1}),
    opt('🌓','看人，看場，看心情','熟人局 OK，陌生局要讀條。',{social:1,solo:1,overthink:1}),
    opt('🛌','可以社交，但回家必須關機','白天很正常，晚上直接省電模式。',{solo:3,support:1}),
    opt('🐈','我比較像路過的貓','想出現就出現，想消失就消失。',{solo:2,cool:1,avoid:1})
  ]},
  { title:'你生氣時通常怎樣？', hint:'這會決定你的隱藏殺傷力。', options:[
    opt('🧊','變超冷，直接不想講','不是沒脾氣，是開始扣分。',{cool:3,avoid:1}),
    opt('💣','忍很久，最後一次爆炸','平常沒事，爆的時候大家安靜。',{warrior:2,chaos:2,overthink:1}),
    opt('🧾','開始列證據，一條一條講','情緒可以有，但邏輯不能輸。',{cool:1,ambition:1,warrior:1}),
    opt('🥲','先檢討自己是不是太敏感','生氣五分鐘，自責兩小時。',{warm:1,support:1,overthink:3})
  ]},
  { title:'你最怕別人發現你其實？', hint:'這題會影響你的致命弱點。', options:[
    opt('🫥','其實很怕被討厭','表面都可以，心裡其實很在乎。',{warm:1,overthink:3,support:1}),
    opt('🥀','其實沒有看起來那麼堅強','可以扛，但不代表不痛。',{warrior:1,overthink:2,warm:1}),
    opt('👑','其實很想贏，很想被看見','低調是真的，野心也是真的。',{ambition:3,cool:1}),
    opt('🎭','其實常常不知道自己在幹嘛','我看起來有劇本，其實全靠即興。',{chaos:3,creative:1})
  ]},
  { title:'你的人生目前比較像？', hint:'請選最有畫面的那個。', options:[
    opt('🎮','卡關但不想刪遊戲','很累，但還是想破關。',{warrior:2,ambition:1,overthink:1}),
    opt('🧭','地圖很大，但不知道去哪','不是不努力，是任務提示太少。',{solo:1,creative:1,overthink:2}),
    opt('🚀','想升級，想變強，想翻身','現在不是最終版，我知道。',{ambition:3,warrior:1}),
    opt('🍿','一邊崩潰，一邊覺得很好笑','人生很荒謬，但我有梗。',{chaos:2,creative:2,social:1})
  ]},
  { title:'你最常被哪句話打中？', hint:'這題會讓文案更像你。', options:[
    opt('🌙','你不是沒事，你只是很會忍','好，這句有點痛。',{support:1,overthink:3,warm:1}),
    opt('🗡️','你不是冷淡，你是在保護自己','我只是先把門關小一點。',{cool:2,avoid:2,solo:1}),
    opt('🔥','你不是普通，你只是還沒開大','我需要的是機會，不是安慰。',{ambition:3,warrior:2}),
    opt('🃏','你越好笑，越不像真的沒事','糟糕，被抓到了。',{creative:2,social:1,overthink:2})
  ]},
  { title:'你的做事風格偏哪種？', hint:'工作模式會用到這題。', options:[
    opt('📋','先規劃，確定再做','我不是慢，我是在降低爆炸率。',{ambition:1,cool:1,overthink:2}),
    opt('⚒️','邊做邊修，先有再說','版本可以醜，但不能永遠沒有。',{warrior:2,chaos:1,creative:1}),
    opt('🎨','靠靈感爆發','靈感來了像神，沒有靈感像石頭。',{creative:3,chaos:2}),
    opt('🧱','默默堆，慢慢變強','我不一定快，但我會一直補等級。',{support:1,ambition:2,warrior:1})
  ]},
  { title:'你在朋友群裡通常是？', hint:'朋友團隊卡未來會用這個延伸。', options:[
    opt('🧠','軍師，幫大家分析','別人戀愛我比本人還清醒。',{cool:1,support:2,overthink:1}),
    opt('💬','氣氛組，負責有趣','群組冷掉，我會丟梗。',{social:3,creative:1}),
    opt('🩹','補師，大家有事會找你','我不是客服，但常常被當客服。',{support:3,warm:2}),
    opt('👻','偶爾出現，但存在感很強','我不常講話，但一講就中。',{solo:2,cool:1,creative:1})
  ]},
  { title:'你最近最想升級的是？', hint:'這會影響你的本週任務。', options:[
    opt('💸','賺錢能力','我需要的是現實世界的金幣。',{ambition:3,warrior:1}),
    opt('💘','戀愛能力','不是沒人要，是我也不知道怎麼開始。',{romance:3,overthink:1}),
    opt('🧍','外表跟自信','我想讓自己看起來更像主角。',{ambition:2,romance:1}),
    opt('🌱','穩定生活','先不要變強，先不要每天崩。',{support:1,solo:1,overthink:2})
  ]},
  { title:'你希望抽到的角色偏向？', hint:'最後一題，讓系統知道你想要的 vibe。', options:[
    opt('🖤','酷一點，有神秘感','不要太陽光，我想要有故事。',{cool:3,solo:1}),
    opt('💛','暖一點，有被懂的感覺','可以嘴我，但也要抱我一下。',{warm:3,support:1}),
    opt('⚔️','燃一點，有變強感','我要看到自己會升級。',{warrior:2,ambition:2}),
    opt('🃏','怪一點，有梗最好','普通的人設我不要。',{creative:3,chaos:1})
  ]}
];

const roles = [
  role('warm-assassin','嘴硬型溫柔刺客','SR','🗡️','#ff6cab',{warm:3,cool:2,solo:1,avoid:2,support:2,overthink:2},['外冷內熱','嘴硬','守護系'],'嘴上說沒事，手上已經幫你把事情處理好。','無聲支援：不會講漂亮話，但會默默把爛攤子收掉。','越在意越假裝沒差，越喜歡越裝得很像路人。','怕自己太認真，也怕別人發現你其實很柔軟。','本週任務：把一句「隨便」改成真正想要的答案。'),
  role('love-runaway','戀愛逃跑法師','SSR','🧙‍♂️','#a87cff',{romance:4,avoid:4,overthink:3,cool:1,solo:1},['曖昧讀條','小劇場','逃跑大師'],'越喜歡越冷淡，越在意越裝沒差。','已讀後小劇場：對方一句話，你可以分析出三種宇宙。','心動時自動開啟防禦結界，看起來超冷，其實超慌。','怕主動後輸掉，所以常常假裝自己沒有很想要。','本週任務：主動傳一次訊息，傳完不要立刻後悔。'),
  role('battery-hunter','社交電量獵人','R','🔋','#62e7ff',{social:3,solo:3,creative:1,support:1},['可外向','需充電','看場發揮'],'可以很會聊，但回家需要關機八小時。','場合適應：熟人局輸出爆表，陌生局先觀察地形。','社交後自動進入省電模式，已讀不回不是討厭，是沒電。','太常硬撐社交，最後連喜歡的人都懶得回。','本週任務：安排一段真正沒有罪惡感的關機時間。'),
  role('restart-hero','人生重開勇者','UR','⚔️','#ffd15c',{warrior:4,ambition:4,overthink:2,warm:1},['想變強','不服輸','主角感'],'常常覺得自己廢，但其實一直在偷偷升級。','重開不刪檔：跌倒後會嘴硬說沒差，然後半夜開始查攻略。','遇到壓力會痛苦，但也會被壓力逼出新技能。','太急著變好，容易把現在的自己罵到沒血。','本週任務：選一件小事完成，不要只規劃巨大人生。'),
  role('emotion-wizard','情緒觀察系巫師','SR','🔮','#b389ff',{overthink:4,support:2,warm:2,creative:1},['敏銳','共感','想太多'],'你很會讀空氣，也很容易被空氣讀到累。','氣氛偵測：一句話、一個表情，你都能感覺哪裡怪怪的。','別人的情緒會自動進入你的系統，像沒關掉通知。','容易把別人的低氣壓當成自己的錯。','本週任務：把「他是不是不開心」改成「我先照顧自己」。'),
  role('happy-clown','表面樂觀小丑','SR','🃏','#ff8fc3',{creative:3,social:2,overthink:3,chaos:1},['好笑','藏痛','氣氛組'],'你越好笑，越不像真的沒事。','尷尬粉碎：只要場面冷，你會自動丟出一個梗。','用幽默擋掉脆弱，讓別人笑，也讓自己不要掉下去。','常常把自己的難過包裝成笑話，結果沒人真的看見你。','本週任務：對一個信任的人講一句真的心情。'),
  role('midnight-sorcerer','深夜想太多術士','SSR','🌙','#7da7ff',{overthink:5,solo:2,romance:1,creative:1},['夜貓','腦補','內耗'],'白天還好，晚上腦袋開始開全圖。','凌晨推演：任何小事都能被你推演成巨大人生議題。','安靜時戰鬥力下降，思考力上升 300%。','想太多會讓你把還沒發生的事先痛一次。','本週任務：睡前把腦中 3 件事寫下來，寫完就關機。'),
  role('procrastination-smith','拖延型天才工匠','R','⚒️','#73f2ad',{creative:4,chaos:3,overthink:1,ambition:1},['有才','拖延','臨場爆發'],'不是不會做，是不到最後一刻不開大。','死線爆發：越靠近截止，越像被神附身。','腦中版本永遠比交出去的版本漂亮。','你怕開始後發現自己沒那麼強，所以先拖。','本週任務：只做 20 分鐘，不准等完美狀態。'),
  role('quiet-knight','安靜暴走騎士','SR','🛡️','#8dd8ff',{warrior:3,cool:2,solo:2,support:1},['安靜','能扛','忍耐值高'],'平常很安靜，但不是沒有戰鬥力。','蓄力防禦：越沉默越在整理戰場。','你可以忍很久，但一旦決定離開就很難回頭。','別人常低估你的底線，直到你真的冷掉。','本週任務：在不爆炸前，先說一次「我不舒服」。'),
  role('warm-guardian','外冷內熱守護者','SSR','🐺','#ffb36c',{warm:3,cool:3,support:3,avoid:1},['可靠','護短','慢熱'],'看起來不好靠近，但靠近後很難被你丟下。','護短結界：自己可以被欺負，朋友不行。','越熟越暖，越重要越不會亂說好聽話。','你的關心常常太隱晦，別人不一定看得懂。','本週任務：把一次關心講出口，不要只用行動暗示。'),
  role('doubt-summoner','自我懷疑召喚師','R','🫥','#c7c1ff',{overthink:4,avoid:2,warm:1,solo:1},['敏感','自省','常懷疑'],'你不是不夠好，你只是太常開審判庭。','自省召喚：事情還沒失敗，你已經先檢討三輪。','遇到稱讚會先懷疑對方是不是客氣。','容易把一次失誤當成整個人的失敗。','本週任務：記錄一件你做得不錯的事，不准加「可是」。'),
  role('healer-friend','朋友群補血師','SR','🩹','#73f2ad',{support:5,warm:3,social:1,overthink:1},['補師','可靠','情緒垃圾桶'],'大家有事會找你，因為你像行動安全屋。','情緒急救：別人崩潰時，你會自動切換照顧模式。','你很會接住別人，卻不一定會麻煩別人接住你。','太習慣當補師，忘記自己也會扣血。','本週任務：不要秒回一次求救，先問自己有沒有力氣。'),
  role('vanish-ninja','突然消失忍者','R','🥷','#9db2ff',{solo:4,avoid:3,cool:1,chaos:1},['消失','自由','貓系'],'你不是不見，你只是切到隱身模式。','煙霧彈：感覺壓力太大時會自動消失。','你需要自由感，太黏的關係會讓你想逃。','消失太久會讓在乎你的人以為自己被丟下。','本週任務：消失前留一句「我需要休息一下」。'),
  role('burnout-warrior','爆肝任務戰士','SR','🔥','#ff7f5c',{ambition:4,warrior:4,overthink:1,support:1},['燃燒','硬撐','任務感'],'你不是沒累，是太習慣硬推進度。','燃命衝刺：只要認定目標，就會把自己當電池用。','壓力越大越想證明自己可以。','容易把休息誤認成落後，最後整個系統過熱。','本週任務：排一個休息，不是獎勵，是維修。'),
  role('love-ghost','想愛不敢愛幽靈','SSR','👻','#d7b0ff',{romance:4,avoid:3,solo:2,overthink:2},['曖昧','怕輸','透明感'],'你不是沒感覺，你只是怕靠近後失去退路。','半透明靠近：喜歡會出現，但不敢完全現身。','你很會關心，但常用朋友名義包裝。','對方如果太直接，你會先嚇到後退。','本週任務：承認一次「我其實有在意」。'),
  role('quiet-ambition','低調野心家','SSR','👑','#ffd15c',{ambition:5,cool:2,solo:1,warrior:2},['低調','野心','升級中'],'你看起來安靜，其實內心有一張排行榜。','暗線升級：不張揚，但一直在偷偷變強。','你不一定想被所有人看見，但想被重要的人認可。','太怕輸，會假裝自己沒有很想贏。','本週任務：把一個目標寫成可執行的第一步。'),
  role('passive-cat','被動社交貓','R','🐈','#ffcf8a',{solo:3,warm:2,avoid:2,social:1},['貓系','慢熱','可愛難約'],'你不是不想見人，你只是需要被溫柔邀請。','靠近判定：安全感夠了才會慢慢靠近。','熟了很黏，不熟時像隔著玻璃。','太被動會讓別人誤會你不需要陪伴。','本週任務：主動約一個你其實想見的人。'),
  role('mouth-strategist','嘴砲型軍師','SR','🧠','#62e7ff',{creative:3,social:2,cool:2,support:1},['吐槽','分析','神預言'],'嘴上很欠，但分析常常準到可怕。','精準吐槽：用玩笑講出大家不敢講的真話。','你很會幫別人看局，也很會把沉重變好笑。','有時候太習慣嘴，反而讓真心聽起來不真。','本週任務：今天給一個人不包裝的稱讚。'),
  role('glass-tank','玻璃心坦克','SR','🧱','#ff9eb6',{warm:2,warrior:3,overthink:3,support:1},['能扛','易痛','反差'],'看起來很能扛，其實被一句話打到會內傷。','重甲外殼：別人以為你很硬，其實裡面很軟。','你會邊受傷邊把事情完成。','最怕被說你太敏感，所以常常假裝沒事。','本週任務：受傷時不要只逞強，直接說出哪句話刺到你。'),
  role('hidden-boss','隱藏版人生 Boss','UR','🐉','#ff5f87',{cool:3,ambition:3,warrior:3,creative:2},['壓迫感','反差','Boss感'],'你平常像普通路人，認真起來像最終關卡。','氣場開啟：只要決定要贏，整個人會變成不同模式。','你不常出手，但一出手會讓人記得。','你最大的敵人不是別人，是你常常低估自己。','本週任務：把一件你其實很想贏的事放上檯面。'),
  role('wandering-maker','迷路系創作者','R','🎨','#ffb5df',{creative:5,chaos:2,solo:1,overthink:1},['靈感','迷路','漂亮腦袋'],'你腦中有很多宇宙，但出口常常還沒蓋好。','靈感開洞：任何小事都能變成一個新點子。','你擅長讓普通東西變有趣。','最大的問題不是沒想法，是想法太多不知道先做哪個。','本週任務：選一個點子做成最小版本，不要開新坑。'),
  role('steady-farmer','穩定種田系玩家','R','🌱','#73f2ad',{support:2,warm:2,ambition:1,solo:1},['穩定','慢慢來','耐久'],'你不一定爆衝，但很適合慢慢養成。','每日任務：別人衝刺時，你在累積基本功。','你的強不是瞬間爆發，是能撐很久。','怕自己太普通，忽略了穩定也是一種稀有能力。','本週任務：維持一件小習慣 3 天，不需要完美。'),
  role('chaos-rocket','混亂火箭騎士','SR','🚀','#ff8a5b',{chaos:4,warrior:2,creative:2,social:1},['衝動','好玩','高能量'],'你的人生像火箭，有時飛很高，有時忘記煞車。','瞬間點火：看到有趣的事會直接衝。','你能把低迷場面炸出新路，但也容易炸到自己。','太快答應、太快開始、太慢收尾，是你的三連擊。','本週任務：今天只開一個任務，不要同時點燃三顆火箭。'),
  role('silent-archer','沉默命中弓手','SR','🏹','#9fd8ff',{cool:3,solo:3,ambition:2,overthink:1},['冷靜','觀察','精準'],'你不吵，但通常看得很清楚。','遠距觀察：先看懂局，再決定要不要出手。','你適合在安靜中累積命中率。','太常不說，會讓你的能力被低估。','本週任務：把一個觀察變成一句具體建議。'),
  role('sunny-shield','陽光防禦盾','R','☀️','#ffd15c',{warm:4,social:2,support:2,avoid:1},['溫暖','好相處','保護色'],'你看起來很陽光，其實也有不想被問的陰影。','暖場護盾：你會讓大家舒服，也會順手保護氣氛。','你能讓陌生人放鬆，像人形小太陽。','太在意大家開不開心，會忘記你自己也可以不開心。','本週任務：今天不用照亮所有人，留一點電給自己。')
];

function opt(icon,title,desc,score){ return {icon,title,desc,score}; }
function role(id,name,rarity,emoji,accent,vector,traits,line,skill,passive,weakness,quest){
  return {id,name,rarity,emoji,accent,vector,traits,line,skill,passive,weakness,quest,
    love: buildLove(name, vector), social: buildSocial(name, vector), work: buildWork(vector), boss: buildBoss(vector), summary: buildSummary(name, vector)};
}
function buildLove(name,v){
  if((v.romance||0)+(v.avoid||0)>=6) return `你的戀愛模式是「想靠近，但先開防禦」。不是沒感覺，是太怕自己先認真。${name} 的攻略不是更會撩，而是學會讓對方看見一點真心。`;
  if((v.warm||0)>=3) return `你戀愛時偏照顧型，會把喜歡藏在小動作裡。你需要的是懂得回應的人，不是只會消耗你的人。`;
  if((v.cool||0)>=3) return `你在戀愛裡慢熱又謹慎，安全感建立前會保持距離。對的人會願意等你，不會逼你立刻表態。`;
  return `你對感情有好奇也有防備，容易在心動和觀望之間來回。真正適合你的人，會讓你覺得不用演。`;
}
function buildSocial(name,v){
  if((v.support||0)>=3) return `你在朋友群裡像補師，大家有事很容易想到你。請記得：你可以幫人回血，但你不是免費無限藥水。`;
  if((v.social||0)>=3) return `你有帶動氣氛的能力，熟人局特別強。只是熱鬧完需要一段時間把自己撿回來。`;
  if((v.solo||0)>=3) return `你是低頻但高存在感的人，不一定常出現，但一出現就有你的味道。你需要的是尊重你節奏的關係。`;
  return `你的社交定位很彈性，能聊天也能安靜。你真正討厭的不是人，是被迫進入不舒服的場。`;
}
function buildWork(v){
  if((v.ambition||0)>=4) return `你適合有成長曲線、能累積戰力的路線。只要看到升級感，你會比自己想像的更能撐。`;
  if((v.creative||0)>=4) return `你適合內容、設計、企劃、創作、網站或任何能把普通東西變有趣的工作。重點是要把靈感變成版本，不是永遠停在想法。`;
  if((v.support||0)>=3) return `你適合需要耐心、協調、服務、整理、陪伴或收尾的角色。你不一定最吵，但能讓系統穩定運作。`;
  return `你的工作模式需要一點自由度與清楚目標。太混亂會內耗，太死板會失去動力。`;
}
function buildBoss(v){
  if((v.overthink||0)>=4) return `隱藏 Boss 是「想太多」。你不是沒有能力，是常在開始前先跟腦內怪物打了三回合。`;
  if((v.avoid||0)>=3) return `隱藏 Boss 是「逃跑」。你很會保護自己，但有時也把機會一起擋在門外。`;
  if((v.ambition||0)>=4) return `隱藏 Boss 是「我怎麼還不夠好」。你想變強是優點，但不要把自己打到沒血才叫努力。`;
  if((v.chaos||0)>=3) return `隱藏 Boss 是「開太多任務」。你不是沒能力，是同時點太多火，最後不知道先救哪裡。`;
  return `隱藏 Boss 是「假裝沒事」。你越說沒關係，越需要有人真的問你一次。`;
}
function buildSummary(name,v){
  if((v.ambition||0)>=4) return `你不是還不夠好，你只是還在升級。`;
  if((v.overthink||0)>=4) return `你不是太敏感，你只是感覺系統太強。`;
  if((v.support||0)>=4) return `你很會照顧別人，也該把自己放進照顧名單。`;
  if((v.creative||0)>=4) return `你的腦袋很有趣，下一步是把它做出來。`;
  return `${name} 的真正能力，是在普通日子裡活出自己的設定。`;
}

const premiumTemplates = [
  ['角色核心','你這張卡的核心不是單一性格，而是一種反差：你有想被懂的一面，也有不想被看穿的一面。免費版像卡面，付費版才是設定集。'],
  ['戀愛攻略','你不需要突然變成很會撩的人。你真正要練的是「清楚一點點」：比平常多一句在意、少一次裝沒事，關係就會開始不同。'],
  ['社交定位','你在群體裡的價值不是一直輸出，而是你有自己的節奏。有人會喜歡熱鬧版的你，也會有人願意等你安靜版回來。'],
  ['金錢弱點','你最容易花錢的時刻通常不是最需要，而是最累、最想補償自己的時候。買之前先問：這是在升級，還是在逃避？'],
  ['工作模式','你需要看得到進度條。把大目標拆成小任務，會比靠意志力硬撐有效。你不是不能努力，是不能一直在沒有回饋的黑暗裡努力。'],
  ['隱藏 Boss','你的 Boss 不一定是外面的敵人，常常是腦內那個一直說「你還不夠」的聲音。打敗它的方法不是反駁，是拿出實際行動紀錄。'],
  ['7 日升級任務','Day1 寫下你現在的角色名稱。Day2 做一件拖很久的小事。Day3 主動傳一則訊息。Day4 整理一個角落。Day5 拒絕一件消耗你的事。Day6 保存一個自己的優點。Day7 發布或分享一個小成果。'],
  ['最終提醒','這份報告不是要定義你，而是給你一個有趣的切入點。你可以笑，也可以認真；真正重要的是你下一步要怎麼讓角色升級。']
];

const state = { current:0, answers:Array(questions.length).fill(null), scores:{}, currentRole:null, resultId:null };
const $ = (id)=>document.getElementById(id);

document.addEventListener('DOMContentLoaded', init);

function init(){
  renderSamples();
  renderQuestion();
  bindEvents();
  setOrderId();
  const savedResult = loadLastResult();
  if(savedResult){ state.answers = savedResult.answers; state.currentRole = getRoleById(savedResult.roleId); state.resultId = savedResult.resultId; }
}

function bindEvents(){
  $('prevBtn').addEventListener('click',()=>{ if(state.current>0){ state.current--; renderQuestion(); scrollToQuiz(); }});
  $('resetBtn').addEventListener('click',resetQuiz);
  $('againBtn').addEventListener('click',resetQuiz);
  $('downloadBtn').addEventListener('click',downloadCard);
  $('shareBtn').addEventListener('click',copyShareText);
  $('saveCardBtn').addEventListener('click',saveCurrentCard);
  $('savedBtn').addEventListener('click',showSavedCards);
  $('copyPremiumBtn').addEventListener('click',copyPremiumReport);
  $('copyOrderBtn').addEventListener('click',()=>copyText($('orderIdText').textContent,'已複製訂單編號'));
  $('copyPayInfoBtn').addEventListener('click',copyPaymentInfo);
  $('redeemBtn').addEventListener('click',redeemCode);
  document.querySelectorAll('[data-open-pay]').forEach(btn=>btn.addEventListener('click',openPayModal));
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closePayModal));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closePayModal(); });
}

function renderSamples(){
  const samples = ['love-runaway','restart-hero','warm-assassin','mouth-strategist','passive-cat','hidden-boss','midnight-sorcerer','procrastination-smith'];
  $('sampleGrid').innerHTML = samples.map(id=>{
    const r=getRoleById(id);
    return `<article class="sample-card"><div class="sample-emoji">${r.emoji}</div><span class="rarity-badge">${r.rarity}</span><h3>${r.name}</h3><p>${r.line}</p><div class="sample-tags">${r.traits.map(t=>`<span>${t}</span>`).join('')}</div></article>`;
  }).join('');
}

function renderQuestion(){
  const q = questions[state.current];
  $('progressText').textContent = `第 ${state.current+1} / ${questions.length} 題`;
  $('progressMood').textContent = getMood(state.current);
  $('progressBar').style.width = `${((state.current)/questions.length)*100}%`;
  $('questionTitle').textContent = q.title;
  $('questionHint').textContent = q.hint;
  $('optionsGrid').innerHTML = q.options.map((o,i)=>`
    <button class="option-btn" type="button" data-index="${i}">
      <span class="option-icon">${o.icon}</span>
      <span><strong>${o.title}</strong><span>${o.desc}</span></span>
    </button>`).join('');
  document.querySelectorAll('.option-btn').forEach(btn=>btn.addEventListener('click',()=>selectOption(Number(btn.dataset.index))));
  $('prevBtn').disabled = state.current===0;
}
function getMood(i){ return ['新手村入口','角色建立中','讀取戀愛屬性','社交電量檢測','戰鬥模式分析','弱點掃描','人生地圖載入','台詞校準','工作模式分析','朋友定位中','升級需求確認','準備結算'][i] || '副本進行中'; }
function selectOption(index){
  state.answers[state.current] = index;
  if(state.current < questions.length-1){ state.current++; renderQuestion(); scrollToQuiz(); }
  else { $('progressBar').style.width = '100%'; generateResult(); }
}
function resetQuiz(){
  state.current=0; state.answers=Array(questions.length).fill(null); state.currentRole=null; state.resultId=null;
  localStorage.removeItem('lifequest:lastResult');
  $('resultSection').classList.add('hidden'); $('premiumReport').classList.add('hidden'); $('lockedUpsell').classList.remove('hidden');
  renderQuestion(); location.hash = '#quiz';
}
function scrollToQuiz(){ $('quiz').scrollIntoView({behavior:'smooth',block:'start'}); }

function calculateScores(){
  const scores = Object.fromEntries(axes.map(a=>[a,0]));
  state.answers.forEach((answerIdx,qIdx)=>{
    const answer = questions[qIdx].options[answerIdx];
    if(!answer) return;
    Object.entries(answer.score).forEach(([k,v])=>{ scores[k]=(scores[k]||0)+v; });
  });
  return scores;
}
function generateResult(){
  state.scores = calculateScores();
  const role = findBestRole(state.scores);
  state.currentRole = role;
  state.resultId = makeResultId(role.id, state.answers);
  renderResult(role);
  saveLastResult();
  $('resultSection').classList.remove('hidden');
  $('resultSection').scrollIntoView({behavior:'smooth',block:'start'});
  if(hasPremiumAccess(state.resultId)) showPremiumReport();
}
function findBestRole(scores){
  let best = roles[0], bestScore = -Infinity;
  for(const r of roles){
    let total = 0;
    for(const axis of axes){ total += (scores[axis]||0) * (r.vector[axis]||0); }
    total += rarityBonus(r.rarity);
    const noise = seededRandom(JSON.stringify(state.answers)+r.id) * 0.35;
    if(total + noise > bestScore){ bestScore = total + noise; best = r; }
  }
  return best;
}
function rarityBonus(rarity){ return {R:0,SR:.4,SSR:.7,UR:.85}[rarity] || 0; }
function seededRandom(str){ let h=2166136261; for(let i=0;i<str.length;i++){ h ^= str.charCodeAt(i); h += (h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24); } return ((h>>>0)%1000)/1000; }
function makeResultId(roleId, answers){ return `LQR-${hashString(roleId+'|'+answers.join('-')).toString(36).toUpperCase()}`; }
function hashString(str){ let h=0; for(let i=0;i<str.length;i++){ h=((h<<5)-h)+str.charCodeAt(i); h|=0; } return Math.abs(h); }

function renderResult(role){
  const card = $('resultCard');
  card.className = `result-card rarity-${role.rarity}`;
  card.style.setProperty('--role-accent', role.accent);
  $('resultRarity').textContent = role.rarity;
  $('resultCode').textContent = '#'+String(roles.indexOf(role)+1).padStart(3,'0');
  $('resultEmoji').textContent = role.emoji;
  $('resultName').textContent = role.name;
  $('resultLine').textContent = role.line;
  $('traitRow').innerHTML = role.traits.map(t=>`<span>${t}</span>`).join('');
  $('resultSkill').textContent = role.skill;
  $('resultPassive').textContent = role.passive;
  $('resultWeakness').textContent = role.weakness;
  $('resultQuest').textContent = role.quest;
  $('resultSummary').textContent = role.summary;
  $('detailLove').textContent = role.love;
  $('detailSocial').textContent = role.social;
  $('detailWork').textContent = role.work;
  $('detailBoss').textContent = role.boss;
  $('premiumTitle').textContent = `${role.name}｜完整角色報告`;
  setOrderId();
}

function buildPremium(role){
  return premiumTemplates.map(([title,base],idx)=>{
    if(idx===0) return [title, `${role.name} 的核心設定是：${role.summary} 你的主技能「${role.skill}」代表你最擅長的不是表面上的個性，而是在關鍵時刻展現出的處理方式。`];
    if(idx===1) return [title, role.love + ' 付費版提醒：你不一定要變外向，也不一定要秒回，但你要練習讓對方知道你不是完全沒感覺。'];
    if(idx===2) return [title, role.social + ' 你的社交價值不是取悅所有人，而是找到會尊重你節奏的人。'];
    if(idx===5) return [title, role.boss + ' 面對這個 Boss，你的打法是把模糊焦慮變成具體行動，而不是一直在腦內重播。'];
    return [title, base];
  });
}
function showPremiumReport(){
  const role = state.currentRole;
  if(!role) return;
  $('premiumGrid').innerHTML = buildPremium(role).map(([title,text])=>`<article class="premium-item"><h3>${title}</h3><p>${text}</p></article>`).join('');
  $('premiumReport').classList.remove('hidden');
  $('lockedUpsell').classList.add('hidden');
}
function hasPremiumAccess(resultId){ return Boolean(localStorage.getItem(`lifequest:premium:${resultId}`)); }
function grantPremiumAccess(resultId, code){ localStorage.setItem(`lifequest:premium:${resultId}`, JSON.stringify({code:maskCode(code), at:new Date().toISOString()})); }
function maskCode(code){ return code ? code.slice(0,4)+'****'+code.slice(-4) : ''; }

async function downloadCard(){
  if(!state.currentRole) return toast('請先完成測驗');
  if(typeof html2canvas === 'undefined') return toast('圖片套件還在載入，請再按一次');
  const card = $('resultCard');
  const canvas = await html2canvas(card, {backgroundColor:null,scale:2,useCORS:true});
  const link = document.createElement('a');
  link.download = `${state.currentRole.name}-人生副本角色卡.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
  toast('角色卡已下載');
}
function copyShareText(){
  if(!state.currentRole) return;
  const r = state.currentRole;
  const text = `我在「人生副本」抽到：${r.name}｜${r.rarity}\n\n${r.line}\n主技能：${r.skill}\n弱點：${r.weakness}\n\n你也去抽看看，我想知道你是什麼角色。`;
  copyText(text,'已複製 Threads 分享文');
  $('shareBox').textContent = '已複製，可以直接貼到 Threads。';
}
function saveCurrentCard(){
  if(!state.currentRole) return;
  const list = JSON.parse(localStorage.getItem('lifequest:saved')||'[]');
  const item = {roleId:state.currentRole.id,resultId:state.resultId,at:new Date().toISOString()};
  if(!list.some(x=>x.resultId===item.resultId)) list.unshift(item);
  localStorage.setItem('lifequest:saved',JSON.stringify(list.slice(0,20)));
  toast('已收藏到我的卡冊');
}
function showSavedCards(){
  const list = JSON.parse(localStorage.getItem('lifequest:saved')||'[]');
  if(!list.length) return toast('目前還沒有收藏的卡');
  const msg = list.slice(0,8).map((x,i)=>`${i+1}. ${getRoleById(x.roleId)?.name || '未知角色'}｜${x.resultId}`).join('\n');
  alert(`我的卡冊：\n\n${msg}`);
}
function copyPremiumReport(){
  if(!state.currentRole) return;
  const text = buildPremium(state.currentRole).map(([t,p])=>`【${t}】\n${p}`).join('\n\n');
  copyText(`${state.currentRole.name}｜完整角色報告\n\n${text}`,'已複製完整報告');
}

function openPayModal(){
  if(!state.currentRole){ location.hash = '#quiz'; toast('先完成測驗，才會知道要解鎖哪份報告'); return; }
  setOrderId();
  $('payModal').classList.remove('hidden');
  $('unlockCodeInput').focus();
  $('modalMessage').textContent = CONFIG.APPS_SCRIPT_URL ? '' : '尚未設定 Apps Script URL：目前無法真正驗證一次性解鎖碼，請先照 README 設定後台。';
}
function closePayModal(){ $('payModal').classList.add('hidden'); }
function setOrderId(){
  const id = state.resultId || 'LQ-'+new Date().toISOString().slice(2,10).replaceAll('-','')+'-'+Math.floor(Math.random()*900+100);
  $('orderIdText').textContent = id;
}
function copyPaymentInfo(){
  const roleName = state.currentRole ? state.currentRole.name : '尚未完成測驗';
  const text = `我要解鎖人生副本完整報告\n角色：${roleName}\n訂單編號：${$('orderIdText').textContent}\n金額：${CONFIG.price}\n\n${CONFIG.PAYMENT_NOTE}`;
  copyText(text,'已複製付款回報訊息');
}
function redeemCode(){
  const code = normalizeCode($('unlockCodeInput').value);
  if(!state.currentRole) return setModalMessage('請先完成測驗。',false);
  if(!code) return setModalMessage('請輸入解鎖碼。',false);
  if(!CONFIG.APPS_SCRIPT_URL) return setModalMessage('還沒設定 Apps Script URL，所以目前不能真正驗證一次性解鎖碼。請照 README 完成後台設定。',false);
  $('redeemBtn').disabled = true;
  setModalMessage('正在驗證解鎖碼...',true);
  redeemViaJsonp(code, state.currentRole.id, state.resultId)
    .then(res=>{
      if(res.ok){
        grantPremiumAccess(state.resultId, code);
        showPremiumReport();
        closePayModal();
        toast('解鎖成功，完整報告已開啟');
        $('premiumReport').scrollIntoView({behavior:'smooth',block:'start'});
      } else {
        setModalMessage(res.message || '解鎖失敗，請確認代碼是否正確。', false);
      }
    })
    .catch(()=>setModalMessage('連線失敗，請確認 Apps Script 已部署成「任何人可存取」。', false))
    .finally(()=>{ $('redeemBtn').disabled = false; });
}
function redeemViaJsonp(code, roleId, resultId){
  return new Promise((resolve,reject)=>{
    const cb = 'lifequest_cb_' + Math.random().toString(36).slice(2);
    const script = document.createElement('script');
    const url = new URL(CONFIG.APPS_SCRIPT_URL);
    url.searchParams.set('action','redeem');
    url.searchParams.set('code',code);
    url.searchParams.set('roleId',roleId);
    url.searchParams.set('resultId',resultId);
    url.searchParams.set('callback',cb);
    url.searchParams.set('ts',String(Date.now()));
    const cleanup = ()=>{ delete window[cb]; script.remove(); clearTimeout(timer); };
    const timer = setTimeout(()=>{ cleanup(); reject(new Error('timeout')); },12000);
    window[cb] = (data)=>{ cleanup(); resolve(data); };
    script.onerror = ()=>{ cleanup(); reject(new Error('script error')); };
    script.src = url.toString();
    document.body.appendChild(script);
  });
}
function setModalMessage(msg,ok){ const el=$('modalMessage'); el.textContent=msg; el.style.color=ok?'var(--green)':'var(--danger)'; }
function normalizeCode(code){ return String(code||'').trim().toUpperCase().replace(/\s+/g,''); }

function saveLastResult(){ localStorage.setItem('lifequest:lastResult',JSON.stringify({answers:state.answers,roleId:state.currentRole.id,resultId:state.resultId})); }
function loadLastResult(){ try{return JSON.parse(localStorage.getItem('lifequest:lastResult')||'null')}catch{return null} }
function getRoleById(id){ return roles.find(r=>r.id===id); }
async function copyText(text,msg){
  try{ await navigator.clipboard.writeText(text); toast(msg || '已複製'); }
  catch{ const area=document.createElement('textarea'); area.value=text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); toast(msg || '已複製'); }
}
function toast(msg){ const t=$('toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>t.classList.remove('show'),2200); }
