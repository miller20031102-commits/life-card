/* 人生副本｜角色卡販賣機 */
const CONFIG = {
  price: 'NT$49',
  WORKER_URL: 'https://lifequest-api.miller20031102.workers.dev',
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
    opt('🩹','補師，大家有事會找你','不是負責所有人，但大家有事常常會想到你。',{support:3,warm:2}),
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
  role('sunny-shield','陽光防禦盾','R','☀️','#ffd15c',{warm:4,social:2,support:2,avoid:1},['溫暖','好相處','保護色'],'你看起來很陽光，其實也有不想被問的陰影。','暖場護盾：你會讓大家舒服，也會順手保護氣氛。','你能讓陌生人放鬆，像人形小太陽。','太在意大家開不開心，會忘記你自己也可以不開心。','本週任務：今天不用照亮所有人，留一點電給自己。'),
  role('read-receipt-beast','已讀不回召喚獸','SR','📱','#9fd8ff',{overthink:4,avoid:2,romance:2,solo:1},['已讀','小劇場','訊息焦慮'],'你不是不回，你是在腦內排練 12 種回法。','訊息結界：看到訊息後先進入精神讀取條。','越重要的人，越容易讓你不知道怎麼回。','拖太久會讓別人以為你冷掉，其實你只是卡住。','本週任務：今天回一則訊息，不要修稿超過三次。'),
  role('party-ghost','社恐派對幽靈','R','🪩','#d7b0ff',{social:2,solo:4,avoid:2,warm:1},['會出現','會消失','低電量'],'你可以出門社交，但靈魂常常先提早下班。','短暫現形：一開始很正常，電量掉完就想飄走。','你不是討厭大家，你只是需要回到安靜的補血點。','太常突然消失，朋友會以為自己是不是說錯話。','本週任務：想撤退前，留一句「我先回去充電」。'),
  role('love-brain-sealer','戀愛腦封印師','SSR','🔒','#ff9eb6',{romance:4,cool:2,avoid:3,overthink:2},['心動','封印','裝冷靜'],'你越心動，越會把自己封印成理性大師。','心動封印術：明明在意，表面卻像在開會。','你很會保護自尊，也很會讓曖昧變成猜謎。','太怕露餡，可能把好感也一起封死。','本週任務：給對方一個明確一點的好感訊號。'),
  role('human-memo-fairy','人間備忘錄精靈','R','📝','#73f2ad',{support:4,warm:2,overthink:1,cool:1},['細心','記得','照顧型'],'你常記得別人的小事，卻忘記把自己排進行事曆。','細節補給：生日、喜好、情緒變化，你都會默默存檔。','你的溫柔很實用，常讓人覺得被放在心上。','太常幫大家記得，會把自己累成免費客服。','本週任務：今天也幫自己記一件需要被照顧的事。'),
  role('owl-saver','省電模式貓頭鷹','R','🦉','#62e7ff',{solo:4,cool:2,overthink:2,creative:1},['夜行','省電','安靜觀察'],'你看起來很安靜，其實是在低耗能模式掃描全場。','夜間分析：越晚腦袋越清醒，白天像在省電。','你適合安靜累積，不適合一直被打斷。','太省電會讓機會也以為你不在線。','本週任務：把一個想法在白天也說出來。'),
  role('cloud-jellyfish','情緒雲朵水母','SR','🫧','#b8f0ff',{warm:3,overthink:4,support:2,avoid:1},['敏感','柔軟','漂浮'],'你的情緒像雲，也像水母，漂亮但很容易被水流帶走。','情緒感應：氣氛一變，你比通知還快收到。','你能感覺很多細節，也能溫柔接住別人。','太容易吸收別人的情緒，會忘記哪個才是自己的。','本週任務：今天把別人的情緒還給別人一次。'),
  role('laydown-knight','今天先躺平騎士','R','🛌','#ffcf8a',{avoid:2,solo:3,warm:1,overthink:2},['想休息','低耗能','慢慢來'],'你不是放棄人生，你只是今天真的需要回血。','棉被防禦：壓力太大時，先用休息擋一波傷害。','你知道自己需要慢下來，這其實是一種自救能力。','躺太久會把休息變成逃避，起床變得更難。','本週任務：躺可以，但先完成一件 5 分鐘任務。'),
  role('rebel-imp','反骨小惡魔軍師','SR','😈','#ff7fcd',{creative:3,cool:2,chaos:2,social:2},['反骨','聰明','不按牌理'],'你不是故意唱反調，你只是很難忍受沒道理的規則。','反向破解：別人照流程走，你在找漏洞和捷徑。','你很會把無聊的事情變有梗，也很會看穿假正經。','太快反骨會讓別人先防禦，聽不到你的聰明。','本週任務：今天把一個吐槽改成可執行建議。')
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

const premiumBlueprints = [
  '付費總覽', '角色核心設定', '戀愛攻略', '朋友與社交定位', '工作與賺錢模式', '金錢弱點', '隱藏 Boss 攻略', '7 日升級任務', '30 天養成路線', '專屬台詞包'
];

const rolePremiumNotes = {
  'warm-assassin': {
    hook:'你最容易讓人誤會的地方，是你明明很在乎，卻總是用「沒差」包裝。你的付費報告重點是：把溫柔講得更清楚，而不是一直藏在行動裡。',
    love:'你喜歡一個人時，不一定會變黏，反而會變得更克制。真正適合你的相處方式，是讓對方知道你不是冷淡，而是需要安全感才會慢慢打開。',
    money:'你常為了「不想麻煩別人」自己扛成本，或為了照顧氣氛而多花錢。付費版提醒：你的溫柔不應該變成你的財務漏洞。',
    mission:'本週把一次照顧別人的行動，改成一句直接的關心。'
  },
  'love-runaway': {
    hook:'你的戀愛副本最大特色是「越心動越像沒事」。你不是不想愛，是太怕一旦認真就會輸。這份報告會幫你把逃跑反射拆開。',
    love:'你需要練習的不是撩人技巧，而是小幅度誠實。像是「我剛剛其實有在等你回」這種一句話，會比裝冷淡更有用。',
    money:'你容易為了維持形象、轉移焦慮或讓自己看起來沒那麼在意而消費。付款前先問自己：這是我真的想要，還是在補曖昧的不安？',
    mission:'傳一則你平常會刪掉的訊息，但不要寫太滿，只多真誠 10%。'
  },
  'battery-hunter': {
    hook:'你不是不愛社交，你是需要電量管理。你有外向的一面，也有必須關機的一面；真正懂你的人，會尊重這個切換。',
    love:'戀愛裡你最需要的是「可以一起熱鬧，也可以一起安靜」的人。對方若把你的低電量解讀成冷掉，你會很快感到壓力。',
    money:'你容易在累到沒電時用消費換回血，例如飲料、宵夜、網購、小廢物。不是不能買，而是要分清楚補血和逃避。',
    mission:'安排一個不回訊息也不愧疚的休息時段，並事先告知重要的人。'
  },
  'restart-hero': {
    hook:'你是那種明明覺得自己很廢，卻一直沒有真的放棄的人。你的強不是現在多完美，而是你總會想辦法重開一局。',
    love:'你在感情裡容易想證明自己值得被選，但真正穩的關係不是靠表現換來的。你要找的是看見你努力，也允許你累的人。',
    money:'你適合把錢花在會讓自己升級的東西：課程、工具、作品、形象、健康。要小心的是衝動買「立刻變強」的幻覺。',
    mission:'選一個最小可完成任務，今天做完，不准再規劃十年人生。'
  },
  'emotion-wizard': {
    hook:'你的感覺系統太敏銳，常常別人還沒講，你已經感覺到氣氛歪掉。付費報告重點：學會分辨「我的情緒」和「我接收到的情緒」。',
    love:'戀愛中你很容易讀對方表情、語氣、已讀速度。這是天賦，但也會讓你過度解讀。你需要的是能清楚溝通的人。',
    money:'你容易為了安撫情緒而消費，尤其是壓力大、被冷落、覺得自己不被理解時。先安頓心情，再決定要不要付款。',
    mission:'今天遇到情緒波動時，先寫下「這真的是我的嗎？」'
  },
  'happy-clown': {
    hook:'你很會把場面變好笑，但付費版要講真話：你不該永遠靠搞笑證明自己沒事。你的快樂不是義務，是能力。',
    love:'你戀愛時會用玩笑試探，也用玩笑保護自己。真正親密的關係，需要你偶爾把梗收起來，讓對方碰到真心。',
    money:'你容易為了氣氛、人情、朋友聚會而花錢。你不是小氣，你只是需要知道哪些熱鬧值得，哪些只是消耗。',
    mission:'今天講一句不包裝成玩笑的真心話。'
  },
  'midnight-sorcerer': {
    hook:'你的人生很多大魔王都出現在深夜。白天能處理的事，晚上會變成巨大劇情。這份報告會幫你把腦內劇場降噪。',
    love:'戀愛裡你最容易因為一點細節開始推演。對你來說，安全感不是猜出來的，是問出來、確認出來的。',
    money:'深夜消費、情緒購物、突然想改變人生，是你的高風險時段。晚上想買的東西，先放到早上再判斷。',
    mission:'睡前把三個擔心寫下來，旁邊補一句「明天再處理」。'
  },
  'procrastination-smith': {
    hook:'你不是沒能力，而是太常把開始設定得太巨大。你的天賦需要被「小版本」救回來。',
    love:'戀愛裡你可能會拖著不說、拖著不確認、拖著不開始。你以為是在等時機，其實有時是在等自己不害怕。',
    money:'你容易買工具、課程、設備，幻想買了就會開始。真正該買的是能降低開始阻力的東西，不是新的逃避入口。',
    mission:'今天只做 20 分鐘，把任務切到小到不能再小。'
  },
  'quiet-knight': {
    hook:'你平常安靜，但你的忍耐條其實有上限。付費報告重點：不要等暴走才讓別人知道你受傷。',
    love:'你在關係裡很能扛，但如果一直不講，對方會以為你真的沒事。你要練習的是提前說不舒服，而不是最後一次離開。',
    money:'你容易因為責任感硬扛費用、幫人收拾爛攤。請記得：可靠不等於什麼都要自己付。',
    mission:'在不爆炸之前，先說一句「這樣我不太舒服」。'
  },
  'warm-guardian': {
    hook:'你是護短型角色，愛一個人或重視一個朋友時，會默默把對方放進保護範圍。問題是，你不一定會讓對方知道。',
    love:'戀愛中你是行動派守護者，會做很多但不一定會講。付費版建議：行動之外，要補上語言，否則你的愛容易被低估。',
    money:'你容易替重要的人花錢，甚至覺得這是照顧。照顧可以，但不要讓愛變成沒有上限的付款。',
    mission:'把一次默默付出，改成一句清楚的「因為我在乎」。'
  },
  'doubt-summoner': {
    hook:'你的腦袋很會開自我審判庭。付費版不是要灌你雞湯，而是幫你建立證據：你其實沒有你想得那麼差。',
    love:'你很容易把對方的普通反應解讀成自己不夠好。穩定關係的關鍵，是不要替別人的沉默亂寫判決書。',
    money:'你可能會為了補自信而消費，買形象、買療癒、買「我應該變更好」。可以投資自己，但別因自責付款。',
    mission:'寫下今天一件做得不錯的事，句尾不能加「可是」。'
  },
  'healer-friend': {
    hook:'你是很多人的安全屋，但安全屋也需要維修。付費報告重點：讓你知道怎麼照顧別人，同時不把自己耗乾。',
    love:'你戀愛時容易給很多，甚至還沒確認對方值不值得就先付出。你要學會看回應，而不是只看自己的投入。',
    money:'你容易因為人情、同情、朋友需求而花錢。記住：你可以善良，但不需要用錢證明你是好人。',
    mission:'今天拒絕一件超出你電量的請求。'
  },
  'vanish-ninja': {
    hook:'你很會消失，不是因為不在乎，而是壓力一大就想切隱身。付費版會幫你把「消失」改成「有交代地休息」。',
    love:'戀愛中你需要空間，但對方需要知道你不是丟下他。你最適合的句型是：我需要休息，但我不是不在乎。',
    money:'你容易在想逃避社交或壓力時，用一個人的消費讓自己恢復。不要禁止，而是設定上限。',
    mission:'下次想消失前，留一句「我先安靜一下，晚點回」。'
  },
  'burnout-warrior': {
    hook:'你太習慣燃燒自己。付費報告要提醒你：真正的戰士不是一直硬撐，而是知道什麼時候維修裝備。',
    love:'你在關係中容易把自己搞得很有用，卻忘了你不需要靠功能性被愛。你可以不是最強，也依然值得被留住。',
    money:'你適合投資效率工具、健康、睡眠、技能，但要避免用花錢買焦慮感的解藥。',
    mission:'今天排一段休息，並把它當成任務，不是偷懶。'
  },
  'love-ghost': {
    hook:'你像半透明角色，明明出現了，卻又不敢完全被看見。付費版重點：讓你的在意不要永遠只停在朋友名義。',
    love:'你的攻略不是突然告白，而是提高存在感。多一點主動、多一點回應、多一點讓對方知道他是特別的。',
    money:'你容易為了暗戀、曖昧、想被注意而花錢。先確認這筆錢是為自己開心，不是為了換對方看見。',
    mission:'承認一次「我其實有在意」，可以先寫在備忘錄。'
  },
  'quiet-ambition': {
    hook:'你看起來低調，但內心其實有排行榜。這份報告會幫你把野心從暗處拿出來，變成真的路線。',
    love:'感情裡你可能會假裝不在乎輸贏，但你其實很在意自己有沒有被選擇。你要找的是欣賞你野心，也不怕你變強的人。',
    money:'你適合把錢花在能累積身份感與能力的項目：作品集、技能、形象、工具。避免為了比較而消費。',
    mission:'把一個目標寫成第一步，今天就做 15 分鐘。'
  },
  'passive-cat': {
    hook:'你是貓系角色：不是不需要人，是需要安全又不壓迫的靠近。付費報告重點：讓被動不再害你錯過重要關係。',
    love:'你喜歡被溫柔邀請，但也要偶爾主動伸爪。對方如果一直得猜，你的在意會被誤會成無感。',
    money:'你容易為了安撫孤單或提升生活小確幸而花錢。小確幸可以，但不要讓它變成逃避主動的替代品。',
    mission:'主動約一個你其實想見的人，訊息不用完美。'
  },
  'mouth-strategist': {
    hook:'你有軍師腦，也有嘴砲外殼。付費版要把你的吐槽升級成影響力：讓真話被聽見，而不是只被當玩笑。',
    love:'感情裡你可能會用鬧、嘴、吐槽掩飾認真。真正有用的不是更會講，而是知道什麼時候不要用玩笑逃開。',
    money:'你容易被有趣、新奇、能讓你有話題的東西吸引。買之前問：這會變成作品或經驗，還是只是一時好玩？',
    mission:'今天給一個人一句不酸、不鬧、很直球的稱讚。'
  },
  'glass-tank': {
    hook:'你是坦克外殼、玻璃內心。付費報告重點：讓你不必一直假裝不痛，還能保留你的耐打。',
    love:'你在關係裡很容易硬撐，甚至受傷還說沒事。你需要的是能接住你脆弱的人，不是只看見你能扛的人。',
    money:'你容易在受傷後買東西補償自己。補償可以，但要小心把每次情緒都變成付款。',
    mission:'今天如果被一句話刺到，練習說出「剛剛那句我有點受傷」。'
  },
  'hidden-boss': {
    hook:'你平常可能很低調，但認真起來很有壓迫感。付費報告重點：讓你的 Boss 感不要只在被逼急時才出現。',
    love:'你需要能承受你強度的人。太弱的關係會讓你縮小自己；真正適合你的人，會希望你越來越像自己。',
    money:'你適合投資能放大你實力的東西。要小心的是為了證明自己而花錢，尤其在被看輕之後。',
    mission:'把一件你想贏的事說出口，至少對自己承認。'
  },
  'wandering-maker': {
    hook:'你腦中有很多宇宙，但出口常常還沒蓋好。付費版重點：把靈感變成可分享的小作品。',
    love:'你在關係裡需要能理解你跳躍腦袋的人。對方不一定要跟你一樣怪，但要願意聽你說那些奇怪的想法。',
    money:'你容易為了新點子買工具。先問自己：這個工具會服務哪個作品？如果答不出來，先不要買。',
    mission:'選一個點子做最小版本，今天只完成第一格。'
  },
  'steady-farmer': {
    hook:'你的強不是爆紅，而是養成。付費報告重點：讓你看見穩定其實是很稀有的能力。',
    love:'你適合慢慢變熟、慢慢累積安全感的關係。太刺激的人可能讓你心動，但太不穩的人會消耗你。',
    money:'你適合固定存、固定投資自己、固定升級生活品質。不要因為別人衝很快就亂跟單。',
    mission:'選一個小習慣維持三天，不要求完美。'
  },
  'chaos-rocket': {
    hook:'你很有爆發力，但容易同時點燃太多火箭。付費報告重點：保留你的衝勁，但減少炸到自己的機率。',
    love:'你在感情裡可能來得快、熱得快，也容易因為無聊想找刺激。你需要的是能一起冒險，但也能幫你降落的人。',
    money:'你容易為了新鮮感、限時、衝動而消費。最有效的做法不是禁止，而是設定冷卻時間。',
    mission:'今天只開一個任務，不准同時啟動三條主線。'
  },
  'silent-archer': {
    hook:'你不一定話多，但觀察很準。付費報告重點：讓你的準度被看見，而不是一直藏在沉默裡。',
    love:'感情裡你會先觀察很久，確定安全才出手。這很好，但要小心觀察到最後，機會已經走遠。',
    money:'你適合謹慎投資、慢慢累積，不適合被煽動型銷售帶走。只要有人催你立刻買，就先退一步。',
    mission:'把一個觀察變成一句具體表達。'
  },
  'sunny-shield': {
    hook:'你像小太陽，但太陽也會沒電。付費報告重點：讓你的溫暖不再變成討好。',
    love:'你在關係裡很容易讓對方舒服，但也可能忘記問自己舒不舒服。你值得被照顧，不只是照亮別人。',
    money:'你容易為了聚會、禮物、氣氛、大家開心而花錢。請把自己的感受也列入預算。',
    mission:'今天不用照亮所有人，留一點電給自己。'
  }
};

const DAILY_PLAY_LIMIT = 2;
const state = { current:0, answers:Array(questions.length).fill(null), scores:{}, currentRole:null, resultId:null, generatedImage:null };
const STORAGE_KEYS = {
  saved: 'lifequest:saved',
  premiumPrefix: 'lifequest:premium:',
  unlockedReports: 'lifequest:unlockedReports',
  dailyPlays: 'lifequest:dailyPlays',
  customerId: 'lifequest:customerId',
  remoteRoleIds: 'lifequest:remoteRoleIds',
  pendingPayment: 'lifequest:pendingPayment'
};
const $ = (id)=>document.getElementById(id);


const POLICY_CONTENT = {
  terms: {
    title: '服務條款',
    html: `
      <p>歡迎使用「人生副本」。本服務提供娛樂性角色卡測驗與個人化數位內容。</p>
      <h3>一、服務內容</h3>
      <p>使用者可免費完成測驗並生成角色卡；部分完整角色報告需付費解鎖。</p>
      <h3>二、使用規範</h3>
      <ul>
        <li>不得破解、轉售、散布、冒用付款或解鎖權限。</li>
        <li>不得以自動化方式大量操作、攻擊或干擾網站。</li>
        <li>網站內容可能因優化、維護或版本更新而調整。</li>
      </ul>
      <h3>三、聯絡方式</h3>
      <p>如有付款、解鎖或使用問題，請來信：miller20031102@gmail.com</p>`
  },
  refund: {
    title: '退款政策',
    html: `
      <p>完整角色報告屬於數位內容與線上服務。</p>
      <ul>
        <li>付款完成前，如遇重複扣款、系統異常或未取得已付款內容，可聯絡處理。</li>
        <li>付款成功並顯示完整報告後，即視為服務已完成。</li>
        <li>除系統錯誤、重複付款或未取得已付款內容外，數位內容完成後不接受退款。</li>
      </ul>
      <p>退款或付款問題請來信：miller20031102@gmail.com</p>`
  },
  privacy: {
    title: '隱私權政策',
    html: `
      <p>我們僅蒐集提供服務所必要的資料。</p>
      <h3>蒐集資料</h3>
      <ul>
        <li>角色結果編號、解鎖狀態與網站內收藏資料。</li>
        <li>付款時由綠界科技處理的交易資料，以及本站用於核對訂單的結果編號與角色資訊。</li>
      </ul>
      <h3>使用目的</h3>
      <p>資料僅用於付款確認、提供解鎖碼、客服處理與改善服務，不會販售個人資料。</p>
      <h3>保存方式</h3>
      <p>角色卡與已解鎖報告主要保存在使用者目前瀏覽器的本機儲存空間；清除瀏覽器資料或更換裝置可能導致本機紀錄消失。</p>
      <h3>聯絡方式</h3>
      <p>如需查詢或刪除付款回報資料，請來信：miller20031102@gmail.com</p>`
  },
  disclaimer: {
    title: '免責聲明',
    html: `
      <p>本服務為娛樂性角色卡生成與個人化數位內容。</p>
      <p>測驗結果與完整角色報告僅供娛樂、自我觀察與社群分享參考，不構成心理諮商、醫療診斷、命理保證、法律、投資、就業或人生決策建議。</p>
      <p>如遇心理、醫療、法律或財務等專業問題，請尋求合格專業人士協助。</p>`
  }
};

function openPolicy(type){
  const data = POLICY_CONTENT[type];
  if(!data) return;
  const modal = $('policyModal');
  $('policyTitle').textContent = data.title;
  $('policyContent').innerHTML = data.html;
  modal.classList.remove('hidden');
}
function closePolicy(){
  $('policyModal')?.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', init);

async function init(){
  renderSamples();
  renderQuestion();
  bindEvents();
  updateDailyLimitUI();

  await syncEntitlements();

  const savedResult = loadLastResult();
  if(savedResult){
    state.answers = Array.isArray(savedResult.answers) ? savedResult.answers : Array(questions.length).fill(null);
    state.currentRole = getRoleById(savedResult.roleId);
    state.resultId = savedResult.resultId;
    if(state.currentRole && state.resultId){
      renderResult(state.currentRole);
      $('resultSection').classList.remove('hidden');
      if(hasPremiumAccess(state.resultId)) showPremiumReport();
    }
  }

  await handlePaymentReturn();
}

function bindEvents(){
  const on = (id, event, handler) => { const el = $(id); if(el) el.addEventListener(event, handler); };
  on('prevBtn','click',()=>{ if(state.current>0){ state.current--; renderQuestion(); scrollToQuiz(); }});
  on('resetBtn','click',resetQuiz);
  on('againBtn','click',resetQuiz);
  on('downloadBtn','click',downloadCard);
  on('shareBtn','click',copyShareText);
  on('savedBtn','click',showSavedCards);
  on('chooseUnlockBtn','click',openUnlockChooser);
  on('copyPremiumBtn','click',copyPremiumReport);
  on('payNowBtn','click',startEcpayPayment);
  document.querySelectorAll('[data-open-pay]').forEach(btn=>btn.addEventListener('click',openPayModal));
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closePayModal));
  document.querySelectorAll('[data-close-saved]').forEach(el=>el.addEventListener('click',closeSavedModal));
  document.querySelectorAll('[data-close-save-image]').forEach(el=>el.addEventListener('click',closeSaveImageModal));
    document.querySelectorAll('[data-policy]').forEach(btn=>btn.addEventListener('click',()=>openPolicy(btn.dataset.policy)));
  document.querySelectorAll('[data-close-policy]').forEach(el=>el.addEventListener('click',closePolicy));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closePayModal(); closeSavedModal(); closeSaveImageModal(); closePolicy(); } });
}

function renderSamples(){
  const samples = ['love-runaway','restart-hero','warm-assassin','mouth-strategist','passive-cat','hidden-boss','midnight-sorcerer','procrastination-smith','read-receipt-beast','party-ghost','love-brain-sealer','human-memo-fairy','owl-saver','cloud-jellyfish','laydown-knight','rebel-imp'];
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
  updateDailyLimitUI();
}
function getMood(i){ return ['新手村入口','角色建立中','讀取戀愛屬性','社交電量檢測','戰鬥模式分析','弱點掃描','人生地圖載入','台詞校準','工作模式分析','朋友定位中','升級需求確認','準備結算'][i] || '副本進行中'; }
function selectOption(index){
  if(!canGenerateToday()){
    showDailyLimitNotice();
    updateDailyLimitUI();
    return;
  }
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

function scrollToQuiz(){
  // 手機版不要跳回整個測驗區頂部，否則上方說明區會把題目往下擠。
  // 直接對準題目卡，並預留 sticky header + iPhone 安全區高度。
  const panel = $('quizPanel');
  if(!panel) return;

  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const isMobile = window.matchMedia('(max-width: 700px)').matches;
  const offset = isMobile ? headerHeight + 14 : headerHeight + 18;
  const y = panel.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}


function getTodayKey(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

function getDailyUsage(){
  const today = getTodayKey();
  let data = null;
  try{ data = JSON.parse(localStorage.getItem(STORAGE_KEYS.dailyPlays) || 'null'); }catch{ data = null; }
  if(!data || data.date !== today){
    data = { date: today, count: 0 };
    localStorage.setItem(STORAGE_KEYS.dailyPlays, JSON.stringify(data));
  }
  data.count = Math.max(0, Number(data.count) || 0);
  return data;
}

function getDailyRemaining(){
  const usage = getDailyUsage();
  return Math.max(0, DAILY_PLAY_LIMIT - usage.count);
}

function canGenerateToday(){
  return getDailyRemaining() > 0;
}

function recordDailyPlay(){
  const usage = getDailyUsage();
  usage.count = Math.min(DAILY_PLAY_LIMIT, (Number(usage.count) || 0) + 1);
  localStorage.setItem(STORAGE_KEYS.dailyPlays, JSON.stringify(usage));
  updateDailyLimitUI();
}

function updateDailyLimitUI(){
  const left = getDailyRemaining();
  const card = $('dailyLimitCard');
  const leftText = $('dailyLeftText');
  const hint = $('dailyLimitHint');
  if(leftText) leftText.textContent = String(left);
  if(hint) hint.textContent = left > 0 ? `今天還可以抽 ${left} 次。抽完會自動存進卡冊。` : '今天免費抽卡已用完，明天會自動恢復。卡冊與已解鎖報告仍可查看。';
  if(card) card.classList.toggle('is-empty', left <= 0);
}

function showDailyLimitNotice(){
  toast('今天免費抽卡已用完，明天再來抽新卡 ♡');
  const hint = $('dailyLimitHint');
  if(hint) hint.textContent = '今天免費抽卡已用完。你仍然可以查看卡冊、下載已抽到的卡、或閱讀已解鎖報告。';
}

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
  if(!canGenerateToday()){
    showDailyLimitNotice();
    updateDailyLimitUI();
    return;
  }
  state.scores = calculateScores();
  const role = findBestRole(state.scores);
  state.currentRole = role;
  state.resultId = makeResultId(role.id, state.answers);
  recordDailyPlay();
  renderResult(role);
  saveLastResult();
  saveResultToCollection(false);
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
  $('premiumTitle').textContent = `${role.name}｜完整角色報告 ♡`;
}

function buildPremium(role){
  const note = rolePremiumNotes[role.id] || {};
  const v = role.vector || {};
  const topAxes = Object.entries(v).sort((a,b)=>(b[1]||0)-(a[1]||0)).slice(0,4).map(([k])=>axisLabel(k));
  const score = premiumScore(v);
  const tone = getTonePack(role);
  const miniMood = topAxes.slice(0,3).join(' × ');
  const report = [
    {
      title:'開箱小卡｜這張卡在說你哪裡',
      html:`<p class="lead cute-lead">${note.hook || `${role.name} 的付費版不是再講一次卡面，而是把你這張卡背後的反差、可愛雷點和升級路線拆開給你看。`}</p>
      <div class="premium-sticker-row"><span>✨ ${role.rarity} 稀有度</span><span>🧃 ${miniMood}</span><span>🎮 已保存報告</span></div>
      <div class="premium-kpis cute-kpis">
        <span><b>${role.rarity}</b><small>卡牌稀有度</small></span>
        <span><b>${score.power}</b><small>爆發能量</small></span>
        <span><b>${score.sensitivity}</b><small>感受雷達</small></span>
        <span><b>${score.growth}</b><small>升級潛力</small></span>
      </div>
      <div class="cute-note"><b>這份報告的重點：</b>不是叫你變成別人，而是讓你更會操作自己這張卡。</div>`
    },
    {
      title:'核心人設｜你可愛又麻煩的地方',
      html:`<p>${role.name} 的可愛之處，是你不是單薄的人設。你有看得見的反應，也有很多不太會說出口的小開關。</p>
      <ul class="cute-list"><li><b>外顯標籤：</b>${role.traits.join('、')}</li><li><b>主技能：</b>${role.skill}</li><li><b>被動技能：</b>${role.passive}</li><li><b>真正想要：</b>${tone.need}</li></ul>
      <p class="soft-card">你不是難搞，你只是需要被用正確的方法理解。當你的安全感夠了，你其實會比自己想像的更溫柔、更有行動力。</p>`
    },
    {
      title:'戀愛小抄｜靠近你的使用說明書',
      html:`<p>${note.love || role.love}</p>
      <div class="tiny-cards"><div><b>💌 心動訊號</b><span>${tone.loveSignal}</span></div><div><b>🥲 容易扣分</b><span>${tone.loveRisk}</span></div><div><b>🌷 適合對象</b><span>${tone.bestPartner}</span></div></div>
      <p class="quote cute-quote">小提醒：你不用變得超會談戀愛，只要讓對方多讀懂你 10%，關係就會順很多。</p>`
    },
    {
      title:'朋友模式｜你在群裡的隱藏職位',
      html:`<p>${role.social}</p>
      <ul class="cute-list"><li><b>隊伍定位：</b>${teamRole(v)}</li><li><b>你被需要的原因：</b>${tone.socialValue}</li><li><b>要小心的地方：</b>${tone.socialWarning}</li></ul>
      <p class="soft-card">你的社交不是一定要很大聲才算有價值。有些人是輸出，有些人是補血，有些人只是坐在那裡，大家就覺得安心。</p>`
    },
    {
      title:'工作&賺錢｜你的升級路線圖',
      html:`<p>${role.work}</p>
      <div class="tiny-cards"><div><b>⏱ 適合節奏</b><span>${workRhythm(v)}</span></div><div><b>🧩 適合任務</b><span>${workTask(v)}</span></div><div><b>🪤 容易卡住</b><span>${workTrap(v)}</span></div></div>
      <p>你不一定適合靠熱血撐到底，你比較適合把目標做成「看得到進度條」的小副本。每完成一格，你就會更願意繼續。</p>`
    },
    {
      title:'金錢雷點｜錢包守護咒',
      html:`<p>${note.money || moneyNote(v)}</p>
      <ul class="cute-list"><li><b>高風險時刻：</b>${moneyRiskTime(v)}</li><li><b>購買前先問：</b>${moneyQuestion(v)}</li><li><b>比較值得花：</b>${moneyGoodSpend(v)}</li></ul>
      <p class="quote cute-quote">不是叫你不要花錢，是讓每一筆錢更像升級裝備，不像情緒補包。</p>`
    },
    {
      title:'隱藏 Boss｜你最常打輸的那一關',
      html:`<p>${role.boss}</p>
      <div class="boss-card"><b>Boss 技能：${bossSkill(v)}</b><span>常見失誤：${badBossStrategy(v)}</span><span>推薦打法：${goodBossStrategy(v)}</span></div>
      <p>你要打贏的不是整個人生，是今天那個最小、最煩、最容易拖延的一格任務。</p>`
    },
    {
      title:'7 日小任務｜每天一點點變強',
      html:`<ol class="mission-list cute-missions">${sevenDayMissions(role, v, note).map((m,i)=>`<li><b>Day ${i+1}</b><span>${m}</span></li>`).join('')}</ol>
      <p class="soft-card">不用每天大改變。你只要每天完成一個小動作，這張角色卡就會開始慢慢升級。</p>`
    },
    {
      title:'30 天養成地圖｜慢慢把自己養好',
      html:`<div class="roadmap-cute"><div><b>第 1 週｜觀察自己</b><span>記錄最常出現的反應，不急著責怪自己。</span></div><div><b>第 2 週｜降低內耗</b><span>把大問題拆成每天 15 分鐘的小任務。</span></div><div><b>第 3 週｜練習表達</b><span>把「沒事、隨便、都可以」換成更真實的句子。</span></div><div><b>第 4 週｜做出成果</b><span>完成一個能被看見的小作品、小改變或小決定。</span></div></div>
      <p>30 天後，你不一定變成完全不同的人，但你會更知道怎麼照顧自己、推動自己，也更懂自己這張卡的玩法。</p>`
    },
    {
      title:'專屬台詞貼紙包｜截圖分享用',
      html:`<ul class="quote-list sticker-lines"><li>「${role.summary}」</li><li>「我不是沒感覺，我只是需要一點安全讀條。」</li><li>「我的人生還沒滿等，但我已經不是新手村的我。」</li><li>「${note.mission || role.quest.replace('本週任務：','')}」</li></ul>
      <p class="cute-note">這張角色卡不是要限制你，而是給你一個有梗、有畫面、也有一點點真心的自我介紹。</p>`
    }
  ];
  return report;
}

const premiumDecor = [
  {icon:'💎',chip:'稀有總覽',wink:'先看這格，最適合保存 ♡'},
  {icon:'🪄',chip:'角色設定',wink:'你的反差魅力都在這裡 ✦'},
  {icon:'💘',chip:'戀愛雷達',wink:'這段超容易被說「好像我」 ⸝⸝'},
  {icon:'🫶',chip:'朋友定位',wink:'你在隊伍裡的位置很可愛 ✿'},
  {icon:'💼',chip:'升級路線',wink:'比較偏實用，會有被懂的感覺 ☼'},
  {icon:'💸',chip:'花錢提醒',wink:'不是管你花錢，是幫你少失血 ✧'},
  {icon:'👾',chip:'Boss 攻略',wink:'看完比較知道怎麼對付自己 ᐟ'},
  {icon:'🗓️',chip:'7日任務',wink:'最有陪伴感的一格 ◡̈'},
  {icon:'🌷',chip:'30天養成',wink:'不是說教，是溫柔版升級地圖 ♡'},
  {icon:'📸',chip:'台詞保存',wink:'這格超適合截圖發限動 ✨'}
];

function showPremiumReport(){
  const role = state.currentRole;
  if(!role) return;
  $('premiumGrid').innerHTML = buildPremium(role).map((item,index)=>{
    const meta = premiumDecor[index] || {icon:'✨',chip:'完整報告',wink:'這一格也值得保存 ♡'};
    return `<article class="premium-item premium-style-${(index % 4) + 1}">
      <div class="premium-card-head">
        <span class="premium-icon">${meta.icon}</span>
        <div class="premium-head-copy">
          <span class="premium-chip">${meta.chip}</span>
          <h3>${item.title}</h3>
        </div>
      </div>
      <div class="premium-body">${item.html}</div>
      <div class="premium-footnote">${meta.wink}</div>
    </article>`;
  }).join('');
  $('premiumReport').classList.remove('hidden');
  $('lockedUpsell').classList.add('hidden');
}

function stripHtml(html){
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent.replace(/\s+\n/g,'\n').replace(/\n\s+/g,'\n').replace(/\s{2,}/g,' ').trim();
}

function axisLabel(axis){
  return {warm:'溫柔感',cool:'冷靜感',social:'社交輸出',solo:'獨處能量',romance:'戀愛感',avoid:'防禦感',ambition:'野心值',chaos:'混亂靈感',support:'支援力',warrior:'戰鬥力',creative:'創造力',overthink:'腦內劇場'}[axis] || axis;
}
function premiumScore(v){
  const power = Math.min(99, 55 + ((v.warrior||0)+(v.ambition||0)+(v.chaos||0))*7);
  const sensitivity = Math.min(99, 50 + ((v.overthink||0)+(v.warm||0)+(v.support||0))*6);
  const growth = Math.min(99, 58 + ((v.ambition||0)+(v.creative||0)+(v.warrior||0))*6);
  return {power, sensitivity, growth};
}
function getTonePack(role){
  const v = role.vector;
  return {
    need: (v.avoid||0)>=3 ? '你需要安全感與退路，才敢真的靠近。' : (v.support||0)>=3 ? '你需要被照顧，而不是永遠當照顧別人的人。' : (v.ambition||0)>=4 ? '你需要看見自己正在升級，而不是只被要求忍耐。' : '你需要有人看見你真正的節奏。',
    loveSignal: (v.romance||0)>=3 && (v.avoid||0)>=2 ? '越在意越會假裝自然，訊息可能打了又刪。' : (v.warm||0)>=3 ? '會用小動作照顧對方，而不是一直講甜言蜜語。' : (v.cool||0)>=3 ? '會先觀察很久，確認安全才出手。' : '會在好奇、靠近、退後之間來回測試。',
    loveRisk: (v.overthink||0)>=3 ? '把對方的小反應解讀成大劇情。' : (v.avoid||0)>=3 ? '太會保護自己，連機會也一起擋掉。' : '把真心藏太深，讓對方以為你沒有很在意。',
    bestPartner: (v.solo||0)>=3 ? '尊重空間、回應穩定、不逼你立刻表態的人。' : (v.ambition||0)>=3 ? '欣賞你想變強，也不會因為你低潮就看輕你的人。' : '能接住你的真心，也能跟你一起笑的人。',
    socialValue: (v.support||0)>=3 ? '你讓人覺得安全、可靠、可以講真話。' : (v.social||0)>=3 ? '你能讓氣氛動起來，讓場子不那麼尷尬。' : (v.cool||0)>=3 ? '你觀察準、判斷清楚，關鍵時候很有用。' : '你有自己的味道，不需要一直刷存在感。',
    socialWarning: (v.support||0)>=3 ? '不要把每個人的情緒都當成你的責任。' : (v.solo||0)>=3 ? '不要消失到讓在乎你的人以為自己被討厭。' : '不要為了維持好相處而犧牲自己的感受。'
  };
}
function teamRole(v){
  if((v.support||0)>=4) return '補師／安全屋，負責接住大家的情緒。';
  if((v.social||0)>=3) return '氣氛輸出，負責讓場面活起來。';
  if((v.cool||0)>=3) return '軍師／觀察手，負責看清局勢。';
  if((v.warrior||0)>=3) return '前排戰士，關鍵時候負責扛。';
  return '特殊輔助位，有自己的節奏和存在感。';
}
function workRhythm(v){ return (v.chaos||0)>=3 ? '短衝刺 + 明確收尾，不適合無限開新坑。' : (v.overthink||0)>=3 ? '低壓開始 + 小步交付，比巨大計畫更有效。' : (v.ambition||0)>=3 ? '有目標、有回饋、有排名或成長曲線時最能爆發。' : '穩定累積，慢慢養成。'; }
function workTask(v){ return (v.creative||0)>=3 ? '企劃、內容、設計、網站、短影音、個人品牌、把無聊變有趣的事。' : (v.support||0)>=3 ? '整理、協調、服務、專案支援、社群經營、讓系統穩定的事。' : (v.cool||0)>=3 ? '分析、規劃、資料整理、策略判斷、需要冷靜的任務。' : '需要行動力與抗壓的任務。'; }
function workTrap(v){ return (v.overthink||0)>=3 ? '想太久，開始太晚。' : (v.chaos||0)>=3 ? '開始很快，收尾失蹤。' : (v.avoid||0)>=3 ? '怕失敗，所以假裝自己沒有很想要。' : '太想一次做到最好，反而卡住。'; }
function moneyNote(v){ return (v.overthink||0)>=3 ? '你容易在焦慮時消費，像是在買一個「我會變好」的保證。' : (v.chaos||0)>=3 ? '你容易被限時、新鮮、好玩帶走，冷卻時間對你很重要。' : (v.support||0)>=3 ? '你容易為了別人舒服而花錢，但你也要把自己算進預算。' : '你最值得花的錢，是能留下能力、作品或健康的錢。'; }
function moneyRiskTime(v){ return (v.overthink||0)>=3 ? '深夜、心情差、被比較、覺得自己落後時。' : (v.social||0)>=3 ? '朋友局、聚會、氣氛到了、不想掃興時。' : '累、煩、想立刻變好的時候。'; }
function moneyQuestion(v){ return (v.ambition||0)>=3 ? '這筆錢會讓我真的升級，還是只是讓我看起來像在努力？' : '這是我真的需要，還是我正在用付款安撫情緒？'; }
function moneyGoodSpend(v){ return (v.creative||0)>=3 ? '能做出作品的工具、素材、課程。' : (v.ambition||0)>=3 ? '技能、健康、形象、能累積長期價值的東西。' : '睡眠、健康、生活穩定與讓你少內耗的東西。'; }
function bossSkill(v){ return (v.overthink||0)>=3 ? '把小事放大成連續劇。' : (v.avoid||0)>=3 ? '把你推回安全區，順便關掉機會。' : (v.chaos||0)>=3 ? '一次開太多任務，讓你無法收尾。' : '用「你還不夠好」消耗你的行動力。'; }
function badBossStrategy(v){ return (v.overthink||0)>=3 ? '一直想通、一直分析、一直重播。' : (v.avoid||0)>=3 ? '假裝不想要，等自己不怕再說。' : '靠一陣熱血硬衝，然後把自己耗乾。'; }
function goodBossStrategy(v){ return (v.overthink||0)>=3 ? '把腦內問題寫成下一個具體動作。' : (v.avoid||0)>=3 ? '只前進 10%，不要逼自己一次全裸真心。' : (v.chaos||0)>=3 ? '限制同時任務數，把收尾當成主線。' : '每天留下一個可被看見的小證據。'; }
function sevenDayMissions(role, v, note){
  return [
    `寫下你的角色名：${role.name}，再寫一句你最想保留的能力。`,
    `做一件拖很久、但 15 分鐘內能開始的小事。`,
    (v.romance||0)>=3 ? '傳一則比平常真誠 10% 的訊息。' : '主動聯絡一個你其實有點想念的人。',
    (v.solo||0)>=3 ? '安排一段不愧疚的關機時間。' : '整理一個讓你最煩的小角落。',
    (v.support||0)>=3 ? '拒絕一件超出你電量的請求。' : '拒絕一個會讓你內耗的小誘惑。',
    `完成你的專屬任務：${note.mission || role.quest.replace('本週任務：','')}`,
    '截圖或複製一句你最有感的台詞，當作下週提醒。'
  ];
}

function hasPremiumAccess(resultId){
  if(!resultId) return false;
  if(localStorage.getItem(`${STORAGE_KEYS.premiumPrefix}${resultId}`)) return true;
  const reports = getUnlockedReports();
  if(reports[resultId]) return true;

  const saved = getSavedList().find(item=>item.resultId === resultId);
  const roleId = saved?.roleId || state.currentRole?.id;
  return hasRolePremiumAccess(roleId);
}
function grantPremiumAccess(resultId, code='ECPAY'){
  if(!resultId || !state.currentRole) return;
  const data = {
    resultId,
    roleId: state.currentRole.id,
    roleName: state.currentRole.name,
    rarity: state.currentRole.rarity,
    answers: [...state.answers],
    code: code === 'ECPAY' ? 'ECPAY' : maskCode(code),
    at: new Date().toISOString()
  };
  localStorage.setItem(`${STORAGE_KEYS.premiumPrefix}${resultId}`, JSON.stringify(data));
  const reports = getUnlockedReports();
  reports[resultId] = data;
  localStorage.setItem(STORAGE_KEYS.unlockedReports, JSON.stringify(reports));
  saveResultToCollection(true);
}
function grantRoleAccessToCurrentResult(){
  if(!state.currentRole || !state.resultId) return;
  const matched = findUnlockedResultByRole(state.currentRole.id);
  const data = {
    resultId: state.resultId,
    roleId: state.currentRole.id,
    roleName: state.currentRole.name,
    rarity: state.currentRole.rarity,
    answers: [...state.answers],
    code: matched?.code || 'ROLE-UNLOCKED',
    at: matched?.at || new Date().toISOString(),
    inheritedFrom: matched?.resultId || ''
  };
  localStorage.setItem(`${STORAGE_KEYS.premiumPrefix}${state.resultId}`, JSON.stringify(data));
  const reports = getUnlockedReports();
  reports[state.resultId] = data;
  localStorage.setItem(STORAGE_KEYS.unlockedReports, JSON.stringify(reports));
  saveResultToCollection(false);
}
function maskCode(code){ return code ? code.slice(0,4)+'****'+code.slice(-4) : ''; }

async function downloadCard(){
  if(!state.currentRole) return toast('請先完成測驗');
  if(typeof html2canvas === 'undefined') return toast('圖片套件還在載入，請再按一次');

  const btn = $('downloadBtn');
  const originalText = btn ? btn.textContent : '';
  if(btn){ btn.disabled = true; btn.textContent = '正在產生圖片…'; }
  hideToast();

  const card = $('resultCard');
  try{
    const sourceCanvas = await html2canvas(card, {
      backgroundColor:'#fff8fb',
      scale: Math.min(3, Math.max(2, window.devicePixelRatio || 2)),
      useCORS:true,
      allowTaint:true,
      logging:false
    });

    const jpgCanvas = document.createElement('canvas');
    jpgCanvas.width = sourceCanvas.width;
    jpgCanvas.height = sourceCanvas.height;
    const ctx = jpgCanvas.getContext('2d');
    ctx.fillStyle = '#fff8fb';
    ctx.fillRect(0,0,jpgCanvas.width,jpgCanvas.height);
    ctx.drawImage(sourceCanvas,0,0);

    const fileName = `${state.currentRole.name}-人生副本角色卡.jpg`;
    const dataUrl = jpgCanvas.toDataURL('image/jpeg', 0.94);

    if(jpgCanvas.toBlob){
      jpgCanvas.toBlob(blob=>{
        showSaveImageModal(dataUrl, fileName, blob);
        if(!isIOSLike() && !isInAppBrowser()) triggerBlobDownload(blob, fileName);
      }, 'image/jpeg', 0.94);
    }else{
      showSaveImageModal(dataUrl, fileName, null);
    }
  }catch(err){
    console.error(err);
    toast('圖片生成失敗，請再試一次或直接截圖保存');
  }finally{
    if(btn){ btn.disabled = false; btn.textContent = originalText || '下載角色卡 JPG'; }
    hideToast();
  }
}

function showSaveImageModal(dataUrl, fileName, blob){
  const old = state.generatedImage;
  if(old && old.objectUrl) URL.revokeObjectURL(old.objectUrl);

  const objectUrl = blob ? URL.createObjectURL(blob) : '';
  const imageUrl = objectUrl || dataUrl;
  state.generatedImage = { dataUrl, objectUrl, fileName };

  const img = $('saveImagePreview');
  if(img){
    img.src = imageUrl;
    img.title = '點一下嘗試儲存 JPG';
    img.onclick = retryImageDownload;
  }
  hideToast();
  $('saveImageModal')?.classList.remove('hidden');
}

function closeSaveImageModal(){
  $('saveImageModal')?.classList.add('hidden');
  hideToast();
}

function retryImageDownload(){
  const data = state.generatedImage;
  if(!data) return toast('請先生成角色卡圖片');
  if(data.objectUrl){
    triggerUrlDownload(data.objectUrl, data.fileName);
  }else{
    triggerUrlDownload(data.dataUrl, data.fileName);
  }
  toast('已嘗試儲存；如果沒反應，請長按圖片儲存');
}

function triggerBlobDownload(blob, fileName){
  if(!blob) return;
  const url = URL.createObjectURL(blob);
  triggerUrlDownload(url, fileName);
  setTimeout(()=>URL.revokeObjectURL(url), 1600);
}

function triggerUrlDownload(url, fileName){
  const link = document.createElement('a');
  link.download = fileName;
  link.href = url;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function isIOSLike(){
  return /iPad|iPhone|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

function isInAppBrowser(){
  return /Line|Instagram|FBAN|FBAV|Threads|MicroMessenger|GSA|TikTok|Snapchat/i.test(navigator.userAgent);
}

function copyShareText(){
  if(!state.currentRole) return;
  const r = state.currentRole;
  const text = `我在「人生副本」抽到：${r.name}｜${r.rarity}\n\n${r.line}\n主技能：${r.skill}\n弱點：${r.weakness}\n\n你也去抽看看，我想知道你是什麼角色。`;
  copyText(text,'已複製 Threads 分享文');
  $('shareBox').textContent = '已複製，可以直接貼到 Threads。';
}
function getSavedList(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.saved)||'[]')}catch{return []}
}
function setSavedList(list){ localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(list.slice(0,40))); }
function getUnlockedReports(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.unlockedReports)||'{}')}catch{return {}}
}
function getUnlockedRoleIds(){
  const reports = getUnlockedReports();
  return new Set(Object.values(reports).map(item=>item && item.roleId).filter(Boolean));
}
function getRemoteRoleIds(){
  try{return new Set(JSON.parse(localStorage.getItem(STORAGE_KEYS.remoteRoleIds)||'[]'))}
  catch{return new Set()}
}
function hasRolePremiumAccess(roleId){
  if(!roleId) return false;
  return getUnlockedRoleIds().has(roleId) || getRemoteRoleIds().has(roleId);
}
function findUnlockedResultByRole(roleId){
  const reports = getUnlockedReports();
  return Object.values(reports).find(item=>item && item.roleId === roleId) || null;
}
function saveResultToCollection(showToast=true){
  if(!state.currentRole || !state.resultId) return;
  const list = getSavedList();
  const item = {
    roleId: state.currentRole.id,
    roleName: state.currentRole.name,
    rarity: state.currentRole.rarity,
    emoji: state.currentRole.emoji,
    line: state.currentRole.line,
    resultId: state.resultId,
    answers: [...state.answers],
    premium: hasPremiumAccess(state.resultId),
    at: new Date().toISOString()
  };
  const idx = list.findIndex(x=>x.resultId===item.resultId);
  if(idx >= 0) list[idx] = {...list[idx], ...item, at:list[idx].at || item.at};
  else list.unshift(item);
  setSavedList(list);
  if(showToast) toast(item.premium ? '已保存完整報告到我的卡冊' : '已自動存進我的卡冊');
}
function saveCurrentCard(){ saveResultToCollection(true); }
function showSavedCards(){
  const title = $('savedTitle');
  if(title) title.textContent = '選擇你要查看或解鎖的卡';
  const copy = document.querySelector('#savedModal .modal-copy');
  if(copy) copy.textContent = '每張卡都會自動保存到這裡。同一種角色只要解鎖過一次，這台裝置就會保留該角色的完整報告查看權。';
  renderSavedCards();
  $('savedModal').classList.remove('hidden');
}
function openUnlockChooser(){
  const list = getSavedList();
  if(!list.length){
    location.hash = '#quiz';
    toast('先完成一次測驗，抽到卡後才能選擇解鎖');
    return;
  }
  const title = $('savedTitle');
  if(title) title.textContent = '選擇要解鎖完整報告的卡';
  const copy = document.querySelector('#savedModal .modal-copy');
  if(copy) copy.textContent = '同一種角色只要解鎖一次。請選擇想解鎖的角色卡，解鎖後同角色都能在這台裝置查看完整報告。';
  renderSavedCards();
  $('savedModal').classList.remove('hidden');
}
function closeSavedModal(){ $('savedModal')?.classList.add('hidden'); }
function renderSavedCards(){
  const list = getSavedList();
  const box = $('savedList');
  if(!list.length){
    box.innerHTML = `<div class="empty-saved">目前還沒有卡牌。先完成一次測驗，系統會自動幫你存到卡冊。</div>`;
    return;
  }
  box.innerHTML = list.map(item=>{
    const role = getRoleById(item.roleId);
    const unlocked = hasPremiumAccess(item.resultId) || hasRolePremiumAccess(item.roleId);
    const date = item.at ? new Date(item.at).toLocaleDateString('zh-TW') : '';
    return `<article class="saved-card ${unlocked?'is-unlocked':''}">
      <div class="saved-emoji">${item.emoji || role?.emoji || '🎴'}</div>
      <div class="saved-main">
        <div class="saved-title"><strong>${item.roleName || role?.name || '未知角色'}</strong><span>${item.rarity || role?.rarity || ''}</span></div>
        <p>${item.line || role?.line || '這張卡是舊版紀錄，仍可查看。'}</p>
        <small>${item.resultId}${date ? '｜'+date : ''}</small>
      </div>
      <div class="saved-actions">
        <button class="secondary-btn tiny" type="button" data-view-saved="${item.resultId}">查看</button>
        ${unlocked ? `<button class="primary-btn tiny" type="button" data-view-report="${item.resultId}">查看完整報告</button>` : `<button class="primary-btn tiny" type="button" data-unlock-saved="${item.resultId}">解鎖這張</button>`}
      </div>
    </article>`;
  }).join('');
  box.querySelectorAll('[data-view-saved]').forEach(btn=>btn.addEventListener('click',()=>restoreSavedCard(btn.dataset.viewSaved, {openReport:false})));
  box.querySelectorAll('[data-view-report]').forEach(btn=>btn.addEventListener('click',()=>restoreSavedCard(btn.dataset.viewReport, {openReport:true})));
  box.querySelectorAll('[data-unlock-saved]').forEach(btn=>btn.addEventListener('click',()=>{ restoreSavedCard(btn.dataset.unlockSaved, {openReport:false, silent:true}); closeSavedModal(); openPayModal(); }));
}
function restoreSavedCard(resultId, opts={}){
  const item = getSavedList().find(x=>x.resultId===resultId);
  if(!item) return toast('找不到這張卡');
  const role = getRoleById(item.roleId);
  if(!role) return toast('找不到角色資料');
  state.currentRole = role;
  state.resultId = item.resultId;
  state.answers = Array.isArray(item.answers) && item.answers.length === questions.length ? item.answers : synthesizeAnswersFromRole(role);
  state.scores = calculateScores();
  renderResult(role);
  $('resultSection').classList.remove('hidden');
  if(hasPremiumAccess(state.resultId)){
    if(!localStorage.getItem(`${STORAGE_KEYS.premiumPrefix}${state.resultId}`)) grantRoleAccessToCurrentResult();
    showPremiumReport();
  }
  else { $('premiumReport').classList.add('hidden'); $('lockedUpsell').classList.remove('hidden'); }
  saveLastResult();
  if(!opts.silent) closeSavedModal();
  if(opts.openReport && hasPremiumAccess(state.resultId)){ setTimeout(()=>$('premiumReport').scrollIntoView({behavior:'smooth',block:'start'}),120); }
  else setTimeout(()=>$('resultSection').scrollIntoView({behavior:'smooth',block:'start'}),120);
}
function synthesizeAnswersFromRole(role){
  // 舊版紀錄沒有 answers 時使用穩定預設，避免報告打不開。
  return questions.map((q, qi)=> qi % q.options.length);
}
function copyPremiumReport(){
  if(!state.currentRole) return;
  const text = buildPremium(state.currentRole).map(item=>`【${item.title}】\n${stripHtml(item.html)}`).join('\n\n');
  copyText(`${state.currentRole.name}｜完整角色報告\n\n${text}`,'已複製完整報告');
}

function openPayModal(){
  if(!state.currentRole){
    const list = getSavedList();
    if(list.length){ openUnlockChooser(); return; }
    location.hash = '#quiz';
    toast('先完成測驗，才會知道要解鎖哪份報告');
    return;
  }

  if(hasPremiumAccess(state.resultId)){
    closePayModal();
    if(!localStorage.getItem(`${STORAGE_KEYS.premiumPrefix}${state.resultId}`)){
      grantRoleAccessToCurrentResult();
    }
    showPremiumReport();
    toast('這個角色已經解鎖，可以直接查看完整報告');
    $('premiumReport').scrollIntoView({behavior:'smooth',block:'start'});
    return;
  }

  const target = $('unlockTargetText');
  if(target){
    target.textContent = `解鎖卡牌：${state.currentRole.name}｜${state.currentRole.rarity}
結果編號：${state.resultId}`;
  }

  setModalMessage('', true);
  $('payModal').classList.remove('hidden');
}

function closePayModal(){
  $('payModal')?.classList.add('hidden');
}

function getCustomerId(){
  let id = localStorage.getItem(STORAGE_KEYS.customerId);
  if(id) return id;

  const random = (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`)
    .replace(/[^A-Za-z0-9_-]/g,'')
    .slice(0,48);

  id = `guest_${random}`;
  localStorage.setItem(STORAGE_KEYS.customerId,id);
  return id;
}

async function syncEntitlements(){
  try{
    const customerId = getCustomerId();
    const response = await fetch(
      `${CONFIG.WORKER_URL}/entitlements?customerId=${encodeURIComponent(customerId)}`,
      {cache:'no-store'}
    );

    if(!response.ok) return;

    const data = await response.json();
    if(!data.ok || !Array.isArray(data.entitlements)) return;

    const roleIds = [...new Set(data.entitlements.map(item=>item.role_id).filter(Boolean))];
    localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify(roleIds));
  }catch(error){
    console.warn('entitlements sync failed',error);
  }
}

async function startEcpayPayment(){
  if(!state.currentRole || !state.resultId){
    setModalMessage('請先完成測驗並選擇要解鎖的卡牌。',false);
    return;
  }

  if(hasPremiumAccess(state.resultId)){
    closePayModal();
    showPremiumReport();
    toast('這個角色已經解鎖');
    return;
  }

  const button = $('payNowBtn');
  if(button){
    button.disabled = true;
    button.textContent = '正在前往綠界…';
  }
  setModalMessage('正在建立安全付款頁面…',true);

  try{
    const customerId = getCustomerId();
    const response = await fetch(`${CONFIG.WORKER_URL}/create-payment`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        customerId,
        resultId:state.resultId,
        roleId:state.currentRole.id,
        roleName:state.currentRole.name
      })
    });

    const data = await response.json();

    if(!response.ok || !data.ok){
      throw new Error(data.message || '建立付款失敗');
    }

    if(data.alreadyOwned){
      const remote = getRemoteRoleIds();
      remote.add(state.currentRole.id);
      localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify([...remote]));
      grantRoleAccessToCurrentResult();
      closePayModal();
      showPremiumReport();
      toast('這個角色已經解鎖');
      return;
    }

    localStorage.setItem(
      STORAGE_KEYS.pendingPayment,
      JSON.stringify({
        tradeNo:data.tradeNo,
        customerId,
        resultId:state.resultId,
        roleId:state.currentRole.id,
        createdAt:new Date().toISOString()
      })
    );

    submitPaymentForm(data.action,data.fields);
  }catch(error){
    setModalMessage(error.message || '付款服務暫時無法使用，請稍後再試。',false);
    if(button){
      button.disabled = false;
      button.textContent = '前往綠界安全付款 NT$49';
    }
  }
}

function submitPaymentForm(action,fields){
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = action;
  form.style.display = 'none';

  Object.entries(fields || {}).forEach(([name,value])=>{
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

async function handlePaymentReturn(){
  const url = new URL(location.href);
  const payment = url.searchParams.get('payment');
  const tradeNo = url.searchParams.get('tradeNo');

  if(payment === 'cancelled'){
    toast('付款尚未完成');
    clearPaymentQuery();
    return;
  }

  if(payment === 'invalid'){
    toast('付款結果驗證失敗，請聯絡客服');
    clearPaymentQuery();
    return;
  }

  if(payment !== 'return' || !tradeNo) return;

  toast('正在確認付款結果…');

  const pending = getPendingPayment();
  const customerId = pending?.customerId || getCustomerId();

  try{
    const order = await pollOrderStatus(tradeNo,customerId);
    if(!order?.paid){
      toast('付款仍在確認中，稍後重新開啟網站即可');
      return;
    }

    applyPaidOrder(order.order);
    localStorage.removeItem(STORAGE_KEYS.pendingPayment);
    clearPaymentQuery();
    toast('付款成功，完整報告已解鎖');
  }catch(error){
    console.warn(error);
    toast('付款結果仍在確認中，稍後重新整理即可');
  }
}

function getPendingPayment(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.pendingPayment)||'null')}
  catch{return null}
}

async function pollOrderStatus(tradeNo,customerId){
  for(let attempt=0; attempt<10; attempt+=1){
    const response = await fetch(
      `${CONFIG.WORKER_URL}/order-status?tradeNo=${encodeURIComponent(tradeNo)}&customerId=${encodeURIComponent(customerId)}`,
      {cache:'no-store'}
    );

    if(response.ok){
      const data = await response.json();
      if(data.ok && data.paid) return data;
    }

    await new Promise(resolve=>setTimeout(resolve,1500));
  }

  return null;
}

function applyPaidOrder(order){
  if(!order) return;

  const remote = getRemoteRoleIds();
  remote.add(order.role_id);
  localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify([...remote]));

  const saved = getSavedList().find(item=>item.resultId===order.result_id)
    || getSavedList().find(item=>item.roleId===order.role_id);

  const role = getRoleById(order.role_id);
  if(!role) return;

  state.currentRole = role;
  state.resultId = saved?.resultId || order.result_id;
  state.answers = Array.isArray(saved?.answers) && saved.answers.length===questions.length
    ? saved.answers
    : synthesizeAnswersFromRole(role);
  state.scores = calculateScores();

  grantPremiumAccess(state.resultId,'ECPAY');
  renderResult(role);
  $('resultSection').classList.remove('hidden');
  showPremiumReport();
  saveLastResult();

  setTimeout(
    ()=>$('premiumReport').scrollIntoView({behavior:'smooth',block:'start'}),
    150
  );
}

function clearPaymentQuery(){
  const clean = `${location.origin}${location.pathname}${location.hash || ''}`;
  history.replaceState({},document.title,clean);
}

function setModalMessage(msg,ok){ const el=$('modalMessage'); el.textContent=msg; el.style.color=ok?'var(--green)':'var(--danger)'; }
function normalizeCode(code){ return String(code||'').trim().toUpperCase().replace(/\s+/g,''); }

function saveLastResult(){ if(!state.currentRole || !state.resultId) return; localStorage.setItem('lifequest:lastResult',JSON.stringify({answers:state.answers,roleId:state.currentRole.id,resultId:state.resultId})); }
function loadLastResult(){ try{return JSON.parse(localStorage.getItem('lifequest:lastResult')||'null')}catch{return null} }
function getRoleById(id){ return roles.find(r=>r.id===id); }
async function copyText(text,msg){
  try{ await navigator.clipboard.writeText(text); toast(msg || '已複製'); }
  catch{ const area=document.createElement('textarea'); area.value=text; document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove(); toast(msg || '已複製'); }
}
function toast(msg){
  const t=$('toast');
  if(!t) return;
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer=setTimeout(hideToast,1800);
}
function hideToast(){
  const t=$('toast');
  if(!t) return;
  t.classList.remove('show');
  t.textContent='';
  clearTimeout(window.__toastTimer);
}
