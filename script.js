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
  ,'read-receipt-beast': {
    hook:'你不是故意冷淡，而是越重要的訊息越容易讓你卡住。這份報告會幫你把「想回好一點」變成「先真實地回出去」。',
    love:'你心動時會反覆修稿，怕太熱情、怕太敷衍，也怕一句話改變關係。最適合你的不是猜謎高手，而是願意直接確認、容許你慢半拍的人。',
    money:'你容易在等待回覆、覺得尷尬或想轉移注意力時滑購物頁。先把那則訊息回完，再決定那筆東西是不是真的需要。',
    mission:'挑一則卡住的訊息，用三句以內回覆；不准修稿超過三次。'
  },
  'party-ghost': {
    hook:'你不是討厭聚會，你只是靈魂比身體更早顯示低電量。這份報告會教你體面撤退，而不是撐到整個人消失。',
    love:'你需要一個不把安靜解讀成冷淡的人。最舒服的關係，是可以一起出門，也允許你提早回家，不用用耗盡自己證明在乎。',
    money:'聚會中你可能因為不好意思掃興而跟著續攤、叫車、加點。先替自己設定離場時間與預算，離開不是失禮，是電量管理。',
    mission:'下一次想離場時，清楚說「我今天電量到了，先回去充電」。'
  },
  'love-brain-sealer': {
    hook:'你的理性不是沒有感情，而是心動後臨時加蓋的保護殼。這份報告會幫你保留分寸，也不把好感封到對方完全看不見。',
    love:'你常把曖昧處理得像專案會議：分析很多、證據很多、明示很少。真正有效的是給出一個可辨識的好感訊號，而不是期待對方破解全部暗號。',
    money:'心動時你可能在外表、禮物或約會細節上偷偷加碼，卻不肯直接表達。先確認這筆花費是在享受關係，還是在替沉默付費。',
    mission:'給喜歡或重視的人一個明確但不過量的訊號，例如主動約一次或直接稱讚一次。'
  },
  'human-memo-fairy': {
    hook:'你把別人的生日、喜好與小情緒都存得很好，卻常把自己的需求設成稍後提醒。這份報告會把你也放回照顧清單。',
    love:'你表達喜歡的方式是記得細節、預先準備、替對方補位。適合你的人會珍惜這份細心，也會反過來記得你的疲累與偏好。',
    money:'你容易在禮物、人情與替大家準備上超支。送得剛好比送得最多更長久，先設定每月「照顧別人預算」。',
    mission:'今天替自己安排一件你平常只會替別人記得的事。'
  },
  'owl-saver': {
    hook:'你不是沒有反應，而是在低耗能模式裡默默掃描。這份報告會幫你把夜裡想通的事，在白天也留下可被看見的輸出。',
    love:'你需要安靜、穩定、不逼迫即時回應的關係。你真正要練習的，是讓對方知道你仍在線，而不是讓沉默替你回答。',
    money:'深夜是你研究與下單的高峰時段。任何晚上突然很想買的東西，先加入清單，隔天白天再做第二次判斷。',
    mission:'把一個只在深夜想過的計畫，白天傳給一個人或做出第一步。'
  },
  'cloud-jellyfish': {
    hook:'你很柔軟，也很容易被環境的水流帶走。這份報告不是要你變遲鈍，而是建立一層能分辨「這是誰的情緒」的薄膜。',
    love:'你很容易感受到對方的變化，也容易因此調整自己。適合你的人會願意說清楚，不讓你長期靠感應猜答案。',
    money:'情緒低氣壓時，你可能透過療癒小物、食物或送禮讓氣氛變好。先問：這筆消費是在照顧我，還是在替別人的情緒買單？',
    mission:'今天感到氣氛不對時，先說「我注意到你有點不同，需要聊嗎？」而不是直接怪自己。'
  },
  'laydown-knight': {
    hook:'你不是放棄人生，而是系統正在要求回血。這份報告會幫你分清楚真正休息與用躺平延後焦慮的差別。',
    love:'你在低電量時最怕被要求立刻振作。適合你的關係會容許你休息，但也能溫柔地陪你完成一個小動作，不讓你困在棉被副本。',
    money:'累的時候你容易用外送、影音訂閱或隨手購物換取最低成本的快樂。保留舒適預算，但不要讓所有疲累都自動連到付款。',
    mission:'先完成一件五分鐘任務，再安心休息二十分鐘，不邊躺邊責怪自己。'
  },
  'rebel-imp': {
    hook:'你不是為反對而反對，而是對沒道理的規則特別敏感。這份報告會把你的反骨從情緒輸出，升級成真正能改變事情的提案。',
    love:'你會被有想法、有個性、不盲從的人吸引，但關係不是辯論賽。當你想吐槽時，先讓對方知道你站在他這邊。',
    money:'新奇、小眾、反主流的東西很容易打中你。買之前問：我是真的喜歡，還是只是不想跟大家一樣？',
    mission:'把今天最想吐槽的一件事，改寫成包含問題、原因與一個解法的三句提案。'
  }

};

const state = {
  current: 0,
  answers: Array(questions.length).fill(null),
  scores: {},
  currentRole: null,
  resultId: null,
  generatedImage: null,
  duoResult: null,
  duoMode: 'friends',
  paymentContext: {type:'report'},
  answerLocked: false,
  isGenerating: false
};
const STORAGE_KEYS = {
  saved: 'lifequest:saved',
  premiumPrefix: 'lifequest:premium:',
  unlockedReports: 'lifequest:unlockedReports',
  customerId: 'lifequest:customerId',
  remoteRoleIds: 'lifequest:remoteRoleIds',
  pendingPayment: 'lifequest:pendingPayment',
  lastSyncAt: 'lifequest:lastSyncAt'
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
      <p>資料僅用於付款確認、同步購買權限、客服處理與改善服務，不會販售個人資料。</p>
      <h3>保存方式</h3>
      <p>角色卡主要保存在瀏覽器本機；購買權限會記錄於本站後端。使用者可保存私人備份碼，在其他裝置同步已購買角色。</p>
      <h3>聯絡方式</h3>
      <p>如需查詢或刪除付款與購買權限資料，請來信：miller20031102@gmail.com</p>`
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
  openModalElement(modal);
}
function closePolicy(){
  closeModalElement($('policyModal'));
}
function openModalElement(modal){
  if(!modal) return;
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const focusable = modal.querySelector('button, input, [href], [tabindex]:not([tabindex="-1"])');
  setTimeout(()=>focusable?.focus(),20);
}
function closeModalElement(modal){
  if(!modal) return;
  modal.classList.add('hidden');
  if(!document.querySelector('.modal:not(.hidden)')) document.body.classList.remove('modal-open');
}

document.addEventListener('DOMContentLoaded', init);

async function init(){
  renderSamples();
  renderQuestion();
  bindEvents();
  populateDuoSelectors();
  renderDuoSavedChips();
  resetPaymentButton();

  await syncEntitlements({mergeCards:true});

  const savedResult = loadLastResult();
  if(savedResult){
    state.answers = Array.isArray(savedResult.answers) ? savedResult.answers : Array(questions.length).fill(null);
    state.currentRole = getRoleById(savedResult.roleId);
    state.resultId = savedResult.resultId;
    if(state.currentRole && state.resultId){
      state.scores = calculateScores();
      renderResult(state.currentRole);
      $('resultSection').classList.remove('hidden');
      if(hasPremiumAccess(state.resultId)) showPremiumReport();
    }
  }

  await handlePaymentReturn();
  await resumePendingPayment();
}

function bindEvents(){
  const on = (id, event, handler) => { const el = $(id); if(el) el.addEventListener(event, handler); };
  on('prevBtn','click',()=>{ if(state.current>0){ state.current--; renderQuestion(); scrollToQuiz(); }});
  on('resetBtn','click',resetQuiz);
  on('againBtn','click',resetQuiz);
  on('downloadBtn','click',downloadCard);
  on('shareBtn','click',copyShareText);
  on('duoFromResultBtn','click',openDuoWithCurrent);
  on('savedDuoBtn','click',()=>{ closeSavedModal(); openDuoWithCurrent(); });
  on('generateDuoBtn','click',generateDuoCard);
  on('unlockDuoBtn','click',openDuoPayModal);
  on('swapDuoBtn','click',swapDuoRoles);
  on('downloadDuoBtn','click',downloadDuoCard);
  on('shareDuoBtn','click',copyDuoShareText);
  on('changeDuoBtn','click',resetDuoResult);
  on('duoRoleA','change',()=>updateDuoSelectPreview('A'));
  on('duoRoleB','change',()=>updateDuoSelectPreview('B'));
  document.querySelectorAll('[data-duo-mode]').forEach(button=>{
    button.addEventListener('click',()=>setDuoMode(button.dataset.duoMode));
  });
  on('savedBtn','click',showSavedCards);
  on('chooseUnlockBtn','click',openUnlockChooser);
  on('copyPremiumBtn','click',copyPremiumReport);
  on('payNowBtn','click',startEcpayPayment);
  on('syncCardsBtn','click',async()=>{ await syncEntitlements({mergeCards:true,showFeedback:true}); renderSavedCards(); });
  on('backupCodeBtn','click',openRecoveryModal);
  on('copyRecoveryBtn','click',()=>copyText(getCustomerId(),'已複製私人備份碼'));
  on('restoreRecoveryBtn','click',restoreFromRecoveryCode);
  on('checkPaymentBtn','click',()=>resumePendingPayment({force:true}));
  on('dismissPaymentBtn','click',hidePendingPaymentBar);
  document.querySelectorAll('[data-open-pay]').forEach(btn=>btn.addEventListener('click',openPayModal));
  document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closePayModal));
  document.querySelectorAll('[data-close-saved]').forEach(el=>el.addEventListener('click',closeSavedModal));
  document.querySelectorAll('[data-close-save-image]').forEach(el=>el.addEventListener('click',closeSaveImageModal));
    document.querySelectorAll('[data-policy]').forEach(btn=>btn.addEventListener('click',()=>openPolicy(btn.dataset.policy)));
  document.querySelectorAll('[data-close-policy]').forEach(el=>el.addEventListener('click',closePolicy));
  document.querySelectorAll('[data-close-recovery]').forEach(el=>el.addEventListener('click',closeRecoveryModal));
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closePayModal(); closeSavedModal(); closeSaveImageModal(); closePolicy(); closeRecoveryModal(); } });
  window.addEventListener('pageshow',()=>{ resetPaymentButton(); resumePendingPayment(); });
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
}
function getMood(i){ return ['新手村入口','角色建立中','讀取戀愛屬性','社交電量檢測','戰鬥模式分析','弱點掃描','人生地圖載入','台詞校準','工作模式分析','朋友定位中','升級需求確認','準備結算'][i] || '副本進行中'; }
function selectOption(index){
  if(state.answerLocked || state.isGenerating) return;

  state.answerLocked = true;
  document.querySelectorAll('.option-btn').forEach(btn=>{ btn.disabled = true; });
  state.answers[state.current] = index;

  if(state.current < questions.length-1){
    state.current++;
    renderQuestion();
    scrollToQuiz();
    setTimeout(()=>{ state.answerLocked = false; }, 220);
  }else{
    $('progressBar').style.width = '100%';
    generateResult();
  }
}
function resetQuiz(){
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  state.currentRole = null;
  state.resultId = null;
  state.answerLocked = false;
  state.isGenerating = false;

  localStorage.removeItem('lifequest:lastResult');
  $('resultSection').classList.add('hidden');
  $('premiumReport').classList.add('hidden');
  $('lockedUpsell').classList.remove('hidden');
  renderQuestion();
  location.hash = '#quiz';
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
  if(state.isGenerating) return;
  state.isGenerating = true;

  state.scores = calculateScores();
  const role = findBestRole(state.scores);
  state.currentRole = role;
  state.resultId = makeResultId(role.id,state.answers);

  renderResult(role);
  saveLastResult();
  saveResultToCollection(false);
  $('resultSection').classList.remove('hidden');
  $('resultSection').scrollIntoView({behavior:'smooth',block:'start'});
  if(hasPremiumAccess(state.resultId)) showPremiumReport();

  // 保持鎖定直到使用者按「重新測一次」，避免最後一題被重複結算。
  state.answerLocked = false;
}
const ROLE_SIGNATURE_RULES = {
  'warm-assassin': { picks:[[0,2,.045],[4,0,.035],[11,0,.025]] },
  'love-runaway': { picks:[[1,0,.08],[7,1,.035],[3,3,.02]], combos:[{picks:[[1,0],[7,1]],bonus:.12}] },
  'battery-hunter': { picks:[[0,1,.035],[2,2,.06],[3,2,.065]], combos:[{picks:[[0,1],[3,2]],bonus:.14}] },
  'restart-hero': { picks:[[2,3,.04],[6,2,.06],[7,2,.045],[11,2,.035]] },
  'emotion-wizard': { picks:[[4,3,.06],[5,0,.04],[7,0,.04]] },
  'happy-clown': { picks:[[0,1,.05],[6,3,.05],[7,3,.07],[9,1,.04]] },
  'midnight-sorcerer': { picks:[[1,2,.045],[2,0,.055],[7,0,.045],[3,2,.02]] },
  'procrastination-smith': { picks:[[2,1,.08],[8,2,.075],[11,3,.03]] },
  'quiet-knight': { picks:[[4,1,.07],[3,2,.03],[11,0,.035]] },
  'warm-guardian': { picks:[[0,3,.065],[4,0,.04],[9,2,.055]], combos:[{picks:[[0,3],[4,0]],bonus:.13}] },
  'doubt-summoner': { picks:[[2,0,.06],[4,3,.065],[5,0,.06]] },
  'healer-friend': { picks:[[0,3,.07],[9,2,.09],[5,1,.02]], combos:[{picks:[[0,3],[9,2]],bonus:.14}] },
  'vanish-ninja': { picks:[[3,3,.085],[7,1,.05],[2,2,.025]] },
  'burnout-warrior': { picks:[[2,3,.07],[6,2,.055],[8,1,.045],[10,0,.035]] },
  'love-ghost': { picks:[[1,0,.045],[3,3,.065],[7,1,.05],[10,1,.035]], combos:[{picks:[[1,0],[3,3]],bonus:.13}] },
  'quiet-ambition': { picks:[[5,2,.08],[6,2,.05],[10,0,.045],[11,0,.03]] },
  'passive-cat': { picks:[[3,1,.05],[3,3,.055],[9,3,.06],[11,1,.035]], combos:[{picks:[[3,3],[9,3]],bonus:.18}] },
  'mouth-strategist': { picks:[[9,0,.09],[4,2,.065],[0,1,.035]], combos:[{picks:[[4,2],[9,0]],bonus:.15}] },
  'glass-tank': { picks:[[5,1,.085],[2,3,.04],[7,0,.04]] },
  'hidden-boss': { picks:[[5,2,.06],[6,2,.05],[7,2,.055],[11,2,.035]] },
  'wandering-maker': { picks:[[2,1,.055],[6,1,.055],[8,2,.07],[11,3,.045]] },
  'steady-farmer': { picks:[[8,3,.09],[10,3,.07],[11,1,.025]], combos:[{picks:[[8,3],[10,3]],bonus:.15}] },
  'chaos-rocket': { picks:[[1,3,.04],[2,1,.07],[6,3,.055],[8,1,.045]] },
  'silent-archer': { picks:[[0,2,.045],[4,2,.06],[8,0,.05],[9,3,.045],[11,0,.035]] },
  'sunny-shield': { picks:[[3,0,.06],[9,1,.065],[11,1,.055],[0,0,.035]], combos:[{picks:[[3,0],[9,1]],bonus:.12}] },
  'read-receipt-beast': { picks:[[1,2,.075],[2,0,.055],[5,0,.04]], combos:[{picks:[[1,2],[2,0]],bonus:.20},{picks:[[1,2],[5,0]],bonus:.08}] },
  'party-ghost': { picks:[[0,1,.045],[3,2,.07],[9,1,.04],[2,2,.035]], combos:[{picks:[[0,1],[3,2]],bonus:.18},{picks:[[3,2],[9,1]],bonus:.10}] },
  'love-brain-sealer': { picks:[[1,0,.055],[4,0,.065],[11,0,.035],[10,1,.03]], combos:[{picks:[[1,0],[4,0]],bonus:.13}] },
  'human-memo-fairy': { picks:[[0,3,.06],[9,0,.06],[9,2,.055],[8,3,.04]], combos:[{picks:[[0,3],[9,0]],bonus:.14}] },
  'owl-saver': { picks:[[2,2,.07],[3,2,.08],[9,3,.04],[11,0,.035]] },
  'cloud-jellyfish': { picks:[[4,3,.075],[5,1,.055],[7,0,.045],[11,1,.035]] },
  'laydown-knight': { picks:[[2,2,.075],[6,0,.05],[10,3,.075],[8,3,.025]], combos:[{picks:[[2,2],[10,3]],bonus:.16}] },
  'rebel-imp': { picks:[[0,1,.04],[4,2,.06],[6,3,.04],[8,2,.055],[9,0,.05],[11,3,.035]] }
};

const QUIZ_MATCH_STATS = buildQuizMatchStats();

function buildQuizMatchStats(){
  const user = {};
  const role = {};

  for(const axis of axes){
    let mean = 0;
    let variance = 0;

    for(const question of questions){
      const values = question.options.map(option=>Number(option.score[axis] || 0));
      const questionMean = values.reduce((sum,value)=>sum+value,0) / values.length;
      mean += questionMean;
      variance += values.reduce((sum,value)=>sum+((value-questionMean) ** 2),0) / values.length;
    }

    const roleValues = roles.map(item=>Number(item.vector[axis] || 0));
    const roleMean = roleValues.reduce((sum,value)=>sum+value,0) / roleValues.length;
    const roleVariance = roleValues.reduce((sum,value)=>sum+((value-roleMean) ** 2),0) / roleValues.length;

    user[axis] = { mean, std:Math.sqrt(variance) || 1 };
    role[axis] = { mean:roleMean, std:Math.sqrt(roleVariance) || 1 };
  }

  return { user, role };
}

function getRoleSignatureBonus(roleId,answers){
  const rules = ROLE_SIGNATURE_RULES[roleId];
  if(!rules || !Array.isArray(answers)) return 0;

  let bonus = 0;

  for(const [questionIndex,optionIndex,value] of (rules.picks || [])){
    if(answers[questionIndex] === optionIndex) bonus += value;
  }

  for(const combo of (rules.combos || [])){
    const matched = combo.picks.every(([questionIndex,optionIndex])=>answers[questionIndex] === optionIndex);
    if(matched) bonus += combo.bonus;
  }

  return bonus;
}

function findBestRole(scores){
  const userProfile = {};
  let userNormSquared = 0;

  for(const axis of axes){
    const stat = QUIZ_MATCH_STATS.user[axis];
    const standardized = ((scores[axis] || 0) - stat.mean) / stat.std;
    userProfile[axis] = standardized;
    userNormSquared += standardized * standardized;
  }

  const userNorm = Math.sqrt(userNormSquared) || 1;
  let best = roles[0];
  let bestScore = -Infinity;

  for(const currentRole of roles){
    let dot = 0;
    let roleNormSquared = 0;

    for(const axis of axes){
      const stat = QUIZ_MATCH_STATS.role[axis];
      const standardizedRole = ((currentRole.vector[axis] || 0) - stat.mean) / stat.std;
      dot += userProfile[axis] * standardizedRole;
      roleNormSquared += standardizedRole * standardizedRole;
    }

    const roleNorm = Math.sqrt(roleNormSquared) || 1;
    const similarity = dot / (userNorm * roleNorm);
    const signature = getRoleSignatureBonus(currentRole.id,state.answers);

    // 只用極小值處理完全同分，不再讓稀有度或角色向量大小左右人格結果。
    const tieBreaker = seededRandom(JSON.stringify(state.answers)+currentRole.id) * 0.0000001;
    const total = similarity + signature + tieBreaker;

    if(total > bestScore){
      bestScore = total;
      best = currentRole;
    }
  }

  return best;
}

function rarityBonus(rarity){ return 0; }
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
  updatePremiumUpsell(role);
}

function firstSentence(text, maxLength=90){
  const clean = String(text || '').replace(/\s+/g,' ').trim();
  const match = clean.match(/^.*?[。！？!?]/);
  const sentence = match ? match[0] : clean;
  return sentence.length > maxLength ? `${sentence.slice(0,maxLength).trim()}…` : sentence;
}

function updatePremiumUpsell(role){
  if(!role) return;

  const note = rolePremiumNotes[role.id] || {};
  const tone = getTonePack(role);
  const mission = note.mission || role.quest.replace('本週任務：','');

  const setText = (id,text)=>{
    const node = $(id);
    if(node) node.textContent = text;
  };

  setText('upsellRoleBadge', `${role.emoji} ${role.name}｜${role.rarity}`);
  setText('upsellHeadline', `這張「${role.name}」卡，真正有料的是後面的 10 個章節`);
  setText('upsellTeaser', firstSentence(note.hook || roleContradiction(role), 110));
  setText('upsellLovePreview', `你最容易卡在：${tone.loveRisk}`);
  setText('upsellBossPreview', `完整拆解「${roleBossName(role)}」，以及這張卡真正的破關條件。`);
  setText('upsellMissionPreview', mission);
  setText('upsellCtaRole', role.name);
}


function roleContradiction(role){
  return `${role.line} 你的核心反差是「${role.traits[0]}」和「${role.traits[1]}」同時存在：外面的人先看見前者，真正熟的人才會發現後者。`;
}
function roleSocialSignature(role){
  return `你的群體價值不是固定職稱，而是「${role.skill}」：當別人卡住時，你最自然的反應就是啟動這個能力。`;
}
function roleWorkSignature(role){
  return `最能代表你的工作優勢是「${role.skill}」；最需要管理的工作風險則是「${role.weakness}」`;
}
function roleBossName(role){
  return `${role.traits[2] || role.traits[0]}反向關卡`;
}
function roleRoadmap(role,note){
  return [
    {title:'第 1 週｜辨認觸發點', text:`記錄「${role.weakness}」通常在什麼人、什麼時間、什麼情境出現。只記錄，不急著批評。`},
    {title:'第 2 週｜主動使用技能', text:`每天刻意使用一次「${role.skill}」，但只用在真正重要的地方，不把能力浪費在討好所有人。`},
    {title:'第 3 週｜讓別人讀懂你', text:`練習把「${role.passive}」背後的真實需求說成一句清楚的話，減少別人只能猜。`},
    {title:'第 4 週｜留下升級證據', text:`完成並保存一個具體成果：${note.mission || role.quest.replace('本週任務：','')}。重點不是完美，是留下你真的做過的證據。`}
  ];
}
function roleQuotes(role,note){
  return [
    role.line,
    role.summary,
    `我的主技能不是缺點：${role.skill}`,
    `這週我要做的事：${note.mission || role.quest.replace('本週任務：','')}`
  ];
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
      html:`<p>${roleContradiction(role)}</p>
      <ul class="cute-list"><li><b>外顯標籤：</b>${role.traits.join('、')}</li><li><b>主技能：</b>${role.skill}</li><li><b>被動技能：</b>${role.passive}</li><li><b>真正想要：</b>${tone.need}</li></ul>
      <p class="soft-card"><b>角色指紋：</b>${role.skill}｜${role.passive}｜${role.weakness}</p>`
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
      <p class="soft-card">${roleSocialSignature(role)}</p>`
    },
    {
      title:'工作&賺錢｜你的升級路線圖',
      html:`<p>${role.work}</p>
      <div class="tiny-cards"><div><b>⏱ 適合節奏</b><span>${workRhythm(v)}</span></div><div><b>🧩 適合任務</b><span>${workTask(v)}</span></div><div><b>🪤 容易卡住</b><span>${workTrap(v)}</span></div></div>
      <p class="soft-card">${roleWorkSignature(role)}</p>`
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
      <div class="boss-card"><b>${roleBossName(role)}｜${bossSkill(v)}</b><span>常見失誤：${badBossStrategy(v)}</span><span>推薦打法：${goodBossStrategy(v)}</span></div>
      <p class="soft-card"><b>本角色破關條件：</b>${note.mission || role.quest.replace('本週任務：','')}</p>`
    },
    {
      title:'7 日小任務｜每天一點點變強',
      html:`<ol class="mission-list cute-missions">${sevenDayMissions(role, v, note).map((m,i)=>`<li><b>Day ${i+1}</b><span>${m}</span></li>`).join('')}</ol>
      <p class="soft-card">不用每天大改變。你只要每天完成一個小動作，這張角色卡就會開始慢慢升級。</p>`
    },
    {
      title:'30 天養成地圖｜慢慢把自己養好',
      html:`<div class="roadmap-cute">${roleRoadmap(role,note).map(step=>`<div><b>${step.title}</b><span>${step.text}</span></div>`).join('')}</div>
      <p>這不是所有角色都共用的養成表；四週內容直接取自你的主技能、被動、弱點與專屬任務。</p>`
    },
    {
      title:'專屬台詞貼紙包｜截圖分享用',
      html:`<ul class="quote-list sticker-lines">${roleQuotes(role,note).map(line=>`<li>「${line}」</li>`).join('')}</ul>
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
    `角色盤點：寫下「${role.name}」最像你的地方，以及一個你不同意的地方。`,
    `技能實戰：今天刻意使用一次「${role.skill}」。`,
    `關係練習：${note.love || role.love}`,
    `被動覺察：當「${role.passive}」出現時，記下當時你真正需要什麼。`,
    `弱點拆招：針對「${role.weakness}」做一個比平常早 10% 的行動。`,
    `專屬任務：${note.mission || role.quest.replace('本週任務：','')}`,
    `保存證據：寫下這週最像升級的一刻，並選一句專屬台詞留在手機裡。`
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
        showSaveImageModal(dataUrl, fileName, blob, {
          title:'角色卡已生成',
          alt:`${state.currentRole.name} 人生副本角色卡`
        });
        if(!isIOSLike() && !isInAppBrowser()) triggerBlobDownload(blob, fileName);
      }, 'image/jpeg', 0.94);
    }else{
      showSaveImageModal(dataUrl, fileName, null, {
        title:'角色卡已生成',
        alt:`${state.currentRole.name} 人生副本角色卡`
      });
    }
  }catch(err){
    console.error(err);
    toast('圖片生成失敗，請再試一次或直接截圖保存');
  }finally{
    if(btn){ btn.disabled = false; btn.textContent = originalText || '下載角色卡 JPG'; }
    hideToast();
  }
}

function showSaveImageModal(dataUrl, fileName, blob, options={}){
  const old = state.generatedImage;
  if(old && old.objectUrl) URL.revokeObjectURL(old.objectUrl);

  const objectUrl = blob ? URL.createObjectURL(blob) : '';
  const imageUrl = objectUrl || dataUrl;
  state.generatedImage = { dataUrl, objectUrl, fileName };

  const title = $('saveImageTitle');
  const copy = $('saveImageCopy');
  if(title) title.textContent = options.title || '點圖片儲存到手機';
  if(copy) copy.textContent = options.copy || 'JPG 圖片已經產生。點下方圖片會嘗試儲存；如果手機沒有反應，再長按圖片選「儲存影像」。';

  const img = $('saveImagePreview');
  if(img){
    img.src = imageUrl;
    img.alt = options.alt || '人生副本 JPG 圖片預覽';
    img.title = '點一下嘗試儲存 JPG';
    img.onclick = retryImageDownload;
  }
  hideToast();
  openModalElement($('saveImageModal'));
}

function closeSaveImageModal(){
  closeModalElement($('saveImageModal'));
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


const DUO_AXIS_LABELS = {
  warm:'暖光', cool:'月影', social:'派對', solo:'夜行',
  romance:'心動', avoid:'隱身', ambition:'升級', chaos:'混亂',
  support:'補血', warrior:'闖關', creative:'靈感', overthink:'深夜'
};

const DUO_MODES = Object.freeze({
  friends:{
    label:'朋友模式', badge:'FRIEND DUO', icon:'🫶',
    calibration:[0.4472666667,0.914425],
    weights:{rhythm:.22,closeness:.08,drive:.10,fun:.25,communication:.20,support:.15}
  },
  couple:{
    label:'情侶模式', badge:'COUPLE DUO', icon:'💞',
    calibration:[0.4205666667,0.88023],
    weights:{rhythm:.15,closeness:.25,drive:.08,fun:.10,communication:.20,support:.22}
  },
  crush:{
    label:'曖昧模式', badge:'CRUSH DUO', icon:'💌',
    calibration:[0.4671166667,0.914425],
    weights:{rhythm:.14,closeness:.28,drive:.05,fun:.18,communication:.20,support:.15}
  },
  teammates:{
    label:'搭檔模式', badge:'TEAM DUO', icon:'⚔️',
    calibration:[0.35569,0.8849566667],
    weights:{rhythm:.15,closeness:.05,drive:.28,fun:.10,communication:.20,support:.22}
  }
});

function populateDuoSelectors(){
  const selects = [$('duoRoleA'),$('duoRoleB')].filter(Boolean);
  if(!selects.length) return;

  const rarityOrder = {UR:0,SSR:1,SR:2,R:3};
  const sorted = [...roles].sort((a,b)=>
    (rarityOrder[a.rarity] ?? 9) - (rarityOrder[b.rarity] ?? 9) ||
    a.name.localeCompare(b.name,'zh-Hant')
  );

  selects.forEach((select,index)=>{
    const current = select.value;
    select.innerHTML = `<option value="">${index===0?'選擇第一張角色卡':'選擇第二張角色卡'}</option>` +
      sorted.map(role=>`<option value="${role.id}">${role.emoji} ${role.name}｜${role.rarity}</option>`).join('');
    if(current && getRoleById(current)) select.value = current;
  });
}

function renderDuoSavedChips(){
  const box = $('duoSavedChips');
  if(!box) return;

  const unique = [];
  const seen = new Set();
  getSavedList().forEach(item=>{
    if(item?.roleId && !seen.has(item.roleId) && getRoleById(item.roleId)){
      seen.add(item.roleId);
      unique.push(getRoleById(item.roleId));
    }
  });

  if(!unique.length){
    box.innerHTML = '<span class="duo-no-saved">完成測驗後，你的角色會出現在這裡。</span>';
    return;
  }

  box.innerHTML = unique.slice(0,12).map(role=>
    `<button type="button" class="duo-saved-chip" data-duo-role="${role.id}">
      <span>${role.emoji}</span>${role.name}
    </button>`
  ).join('');

  box.querySelectorAll('[data-duo-role]').forEach(button=>{
    button.addEventListener('click',()=>quickPickDuoRole(button.dataset.duoRole));
  });
}

function quickPickDuoRole(roleId){
  const first = $('duoRoleA');
  const second = $('duoRoleB');
  if(!first || !second) return;

  if(!first.value || (first.value && second.value)){
    first.value = roleId;
    if(second.value === roleId && roles.length > 1) second.value = '';
    updateDuoSelectPreview('A');
  }else{
    second.value = roleId;
    updateDuoSelectPreview('B');
  }
}

function openDuoWithCurrent(){
  closeSavedModal();
  populateDuoSelectors();
  renderDuoSavedChips();

  if(state.currentRole && $('duoRoleA')){
    $('duoRoleA').value = state.currentRole.id;
    updateDuoSelectPreview('A');
  }

  location.hash = '#duo';
  setTimeout(()=>$('duo')?.scrollIntoView({behavior:'smooth',block:'start'}),80);
}

function setDuoMode(mode){
  if(!DUO_MODES[mode]) return;
  state.duoMode = mode;

  document.querySelectorAll('[data-duo-mode]').forEach(button=>{
    const active = button.dataset.duoMode === mode;
    button.classList.toggle('is-active',active);
    button.setAttribute('aria-pressed',active?'true':'false');
  });

  if(state.duoResult){
    generateDuoCard({silent:true});
  }
}

function updateDuoSelectPreview(side){
  const select = $(side==='A' ? 'duoRoleA' : 'duoRoleB');
  const preview = $(side==='A' ? 'duoRoleAPreview' : 'duoRoleBPreview');
  if(!select || !preview) return;

  const role = getRoleById(select.value);
  preview.textContent = role
    ? `${role.emoji} ${role.line}`
    : (side==='A' ? '完成測驗後，可以自動帶入你的角色。' : '知道朋友的角色名稱就能直接選。');
}

function swapDuoRoles(){
  const a = $('duoRoleA');
  const b = $('duoRoleB');
  if(!a || !b) return;
  [a.value,b.value] = [b.value,a.value];
  updateDuoSelectPreview('A');
  updateDuoSelectPreview('B');
  if(state.duoResult) generateDuoCard({silent:true});
}

function clampNumber(value,min,max){
  return Math.min(max,Math.max(min,value));
}

function stablePairHash(firstId,secondId,extra=''){
  const input = `${[firstId,secondId].sort().join('|')}|${extra}`;
  let hash = 2166136261;
  for(let i=0;i<input.length;i++){
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash,16777619);
  }
  return Math.abs(hash >>> 0);
}

function makeDuoPairKey(firstId,secondId){
  return `duo:${[firstId,secondId].sort().join(':')}`;
}

function parseDuoPairKey(pairKey){
  const parts = String(pairKey||'').split(':');
  if(parts.length!==3 || parts[0]!=='duo') return null;
  const roleA = getRoleById(parts[1]);
  const roleB = getRoleById(parts[2]);
  return roleA && roleB ? {roleA,roleB} : null;
}

function roleVectorArray(role){
  return axes.map(axis=>Number(role?.vector?.[axis] || 0));
}

function duoValue(role,axis){
  return Number(role?.vector?.[axis] || 0) / 5;
}

function duoProfile(role){
  return {
    warmth:(duoValue(role,'warm')+duoValue(role,'support'))/2,
    coolness:(duoValue(role,'cool')+duoValue(role,'solo'))/2,
    social:(duoValue(role,'social')+(1-duoValue(role,'solo')))/2,
    closeness:(duoValue(role,'romance')+duoValue(role,'warm')+(1-duoValue(role,'avoid')))/3,
    drive:(duoValue(role,'ambition')+duoValue(role,'warrior'))/2,
    fun:(duoValue(role,'creative')+duoValue(role,'chaos'))/2,
    sensitivity:duoValue(role,'overthink'),
    care:(duoValue(role,'support')+duoValue(role,'warm'))/2,
    avoid:duoValue(role,'avoid'),
    chaos:duoValue(role,'chaos'),
    romance:duoValue(role,'romance'),
    warrior:duoValue(role,'warrior'),
    ambition:duoValue(role,'ambition'),
    creative:duoValue(role,'creative'),
    solo:duoValue(role,'solo'),
    socialRaw:duoValue(role,'social')
  };
}

function smoothStep(value){
  const t=clampNumber(value,0,1);
  return t*t*(3-2*t);
}

function componentScore(value,penalty=0){
  return Math.round(clampNumber(24 + 74*value - 24*penalty,18,98));
}

function computeDuoMetrics(roleA,roleB,mode){
  const config=DUO_MODES[mode] || DUO_MODES.friends;
  const a=duoProfile(roleA);
  const b=duoProfile(roleB);

  const rhythm=clampNumber(1-Math.abs(a.social-b.social),0,1);
  const closeness=clampNumber(1-Math.abs(a.closeness-b.closeness),0,1);
  const drive=clampNumber(1-Math.abs(a.drive-b.drive),0,1);
  const fun=clampNumber(1-Math.abs(a.fun-b.fun),0,1);

  const styleA=a.warmth-a.coolness;
  const styleB=b.warmth-b.coolness;
  const styleFit=clampNumber(1-Math.abs(styleA-styleB)/1.5,0,1);
  const closenessMismatch=Math.max(a.romance*b.avoid,b.romance*a.avoid);
  const communication=clampNumber(
    .65*styleFit + .35*((a.care+b.care)/2) - .18*closenessMismatch,
    0,1
  );

  const emotionalSupport=Math.max(a.care*b.sensitivity,b.care*a.sensitivity);
  const mutualCare=(a.care+b.care)/2;
  const support=clampNumber(.55*emotionalSupport+.45*mutualCare,0,1);

  const grounding=Math.max(a.drive*b.fun,b.drive*a.fun);
  const rescue=Math.max(a.care*b.sensitivity,b.care*a.sensitivity);
  const courage=Math.max(a.warrior*b.avoid,b.warrior*a.avoid);
  const complementBase=clampNumber(.42*grounding+.38*rescue+.20*courage,0,1);

  const avoidBoth=a.avoid*b.avoid;
  const overthinkBoth=a.sensitivity*b.sensitivity;
  const chaosBoth=a.chaos*b.chaos;
  const socialMismatch=Math.abs(a.solo-b.solo)*Math.max(a.socialRaw,b.socialRaw);
  const styleMismatch=1-styleFit;

  const penalties={
    avoidBoth,
    overthinkBoth,
    chaosBoth,
    closenessMismatch,
    socialMismatch,
    styleMismatch
  };

  const w=config.weights;
  const raw=
    w.rhythm*rhythm +
    w.closeness*closeness +
    w.drive*drive +
    w.fun*fun +
    w.communication*communication +
    w.support*support;

  const bonus=.08*grounding+.08*rescue+.05*courage;
  const penalty=
    .16*avoidBoth+
    .12*overthinkBoth+
    .12*chaosBoth+
    .11*closenessMismatch+
    .08*socialMismatch;

  const quality=raw+bonus-penalty;
  const [minQuality,maxQuality]=config.calibration;
  const normalized=clampNumber((quality-minQuality)/(maxQuality-minQuality),0,1);
  const score=Math.round(38+59*smoothStep(normalized));

  const coverage=roleVectorArray(roleA).reduce(
    (sum,value,index)=>sum+Math.max(value,roleVectorArray(roleB)[index])/5,0
  )/axes.length;
  const tension=roleVectorArray(roleA).reduce(
    (sum,value,index)=>sum+Math.abs(value-roleVectorArray(roleB)[index])/5,0
  )/axes.length;
  const complementFit=clampNumber(1-Math.abs(tension-.30)/.30,0,1);
  const complement=clampNumber(.48*complementBase+.30*coverage+.22*complementFit,0,1);
  const safety=clampNumber(
    .38*mutualCare+.30*closeness+.22*(1-avoidBoth)+.10*communication-.16*overthinkBoth,
    0,1
  );
  const action=clampNumber(
    .48*drive+.27*grounding+.25*(1-chaosBoth)-.12*Math.abs(a.drive-b.drive),
    0,1
  );

  return {
    score,
    quality,
    rhythm:componentScore(rhythm,socialMismatch*.35),
    communication:componentScore(communication,styleMismatch*.15),
    complement:componentScore(complement),
    safety:componentScore(safety,avoidBoth*.20+overthinkBoth*.10),
    action:componentScore(action,chaosBoth*.20),
    raw:{rhythm,closeness,drive,fun,communication,support,complement,safety,action},
    penalties
  };
}

function getDuoDominantAxes(roleA,roleB){
  return axes
    .map(axis=>({axis,value:(roleA.vector[axis]||0)+(roleB.vector[axis]||0)}))
    .sort((a,b)=>b.value-a.value || a.axis.localeCompare(b.axis))
    .slice(0,3);
}

function duoScoreTier(score){
  if(score>=90) return {label:'傳說級默契',className:'tier-legend'};
  if(score>=80) return {label:'高默契隊伍',className:'tier-high'};
  if(score>=70) return {label:'穩定同盟',className:'tier-good'};
  if(score>=60) return {label:'可培養默契',className:'tier-mid'};
  if(score>=50) return {label:'反差磨合組',className:'tier-challenge'};
  return {label:'高難度副本',className:'tier-hard'};
}

function duoScoreRange(score){
  const low=Math.floor(score/10)*10;
  const high=score>=90?97:low+9;
  return `${low}–${high}`;
}

function determineDuoType(roleA,roleB,mode,metrics){
  const total=axis=>(roleA.vector[axis]||0)+(roleB.vector[axis]||0);

  if(metrics.score<50) return '高難度磨合組';
  if(total('romance')+total('avoid')>=11 && ['couple','crush'].includes(mode)) return '心動拉扯搭檔';
  if(total('support')+total('warm')>=12) return '溫柔補血同盟';
  if(total('ambition')+total('warrior')>=12) return '雙核心闖關隊';
  if(total('creative')+total('chaos')>=11) return '混亂靈感聯盟';
  if(total('cool')+total('solo')>=12) return '靜音默契組';
  if(total('social')+total('creative')>=10) return '氣氛爆擊雙人組';
  if(total('overthink')+total('support')>=12) return '深夜理解同盟';
  if(metrics.communication>=84 && metrics.rhythm>=82) return '同頻共振組';
  if(metrics.complement>=82 && Math.abs(metrics.rhythm-metrics.complement)>=8) return '反差互補組';
  if(metrics.action>=85) return '主線推進小隊';
  return '穩定合作組';
}

const DUO_TITLE_SUFFIXES = {
  '心動拉扯搭檔':['祕密契約','訊號偵測局','心動防線','曖昧讀條組'],
  '溫柔補血同盟':['雙向補血站','守護同盟','安全屋小隊','柔光支援組'],
  '雙核心闖關隊':['破關同盟','主線加速組','雙核心戰隊','升級遠征隊'],
  '混亂靈感聯盟':['火花製造局','新坑發射站','靈感暴走組','混亂創作社'],
  '靜音默契組':['夜行同盟','無聲連線組','低電量基地','安靜共振局'],
  '氣氛爆擊雙人組':['派對接管局','冷場救援隊','笑點連鎖組','氣氛點火站'],
  '深夜理解同盟':['月光聊天室','凌晨共感組','情緒翻譯局','深夜安全站'],
  '同頻共振組':['同步開大隊','共振同盟','同頻連線組','默契直連局'],
  '反差互補組':['缺口補位隊','反差小隊','互補連攜組','雙向支援局'],
  '主線推進小隊':['任務推進局','進度加速隊','行動連攜組','目標突破隊'],
  '高難度磨合組':['高難度攻略隊','反差試煉組','磨合副本隊','需要說明書組'],
  '穩定合作組':['長線搭檔','日常同盟','穩定連線組','耐玩合作隊']
};

function buildDuoTitle(roleA,roleB,mode,type,dominant){
  const hash=stablePairHash(roleA.id,roleB.id,mode);
  const first=DUO_AXIS_LABELS[dominant[0]?.axis] || '未知';
  const second=DUO_AXIS_LABELS[dominant[1]?.axis] || '冒險';
  const suffixes=DUO_TITLE_SUFFIXES[type] || DUO_TITLE_SUFFIXES['穩定合作組'];
  const suffix=suffixes[hash%suffixes.length];

  const modePrefix={
    friends:['好友','日常','友情','並肩'],
    couple:['戀人','雙向','心動','親密'],
    crush:['曖昧','訊號','心跳','未讀'],
    teammates:['任務','主線','作戰','合作']
  }[mode] || ['雙人'];

  return `${modePrefix[(hash>>>4)%modePrefix.length]}・${first}${second}${suffix}`;
}

function highestDuoMetric(metrics){
  return [
    ['communication',metrics.communication],
    ['rhythm',metrics.rhythm],
    ['complement',metrics.complement],
    ['safety',metrics.safety],
    ['action',metrics.action]
  ].sort((a,b)=>b[1]-a[1])[0][0];
}

function largestDuoRisk(metrics){
  return Object.entries(metrics.penalties).sort((a,b)=>b[1]-a[1])[0][0];
}

function buildDuoSummary(roleA,roleB,mode,type,metrics){
  const tier=duoScoreTier(metrics.score).label;
  const modeText={
    friends:'當朋友時',
    couple:'進入親密關係時',
    crush:'還在曖昧讀訊號時',
    teammates:'一起完成任務時'
  }[mode];

  const main=highestDuoMetric(metrics);
  const strengths={
    communication:'最容易出現的優勢是「話有機會說進對方心裡」',
    rhythm:'最容易出現的優勢是「不用一直解釋彼此的電量」',
    complement:'最容易出現的優勢是「一個人的缺口剛好有人能補」',
    safety:'最容易出現的優勢是「可以不用一直表現得很好」',
    action:'最容易出現的優勢是「兩個人一起比單獨更容易開始」'
  };

  return `${modeText}，你們屬於「${type}」。${strengths[main]}。免費結果顯示為 ${tier}，完整副本會揭曉精確分數與真正的卡關點。`;
}

function buildDuoSkill(result){
  const {roleA,roleB,type,mode}=result;
  const skillA=String(roleA.skill||'').split('：')[0];
  const skillB=String(roleB.skill||'').split('：')[0];

  const templates={
    friends:`友情連攜・${skillA} × ${skillB}：一個人開始掉線時，另一個人通常能用最自然的方式把對方拉回隊伍。`,
    couple:`親密連攜・${skillA} × ${skillB}：安全感建立後，你們會把彼此原本藏起來的能力一起放大。`,
    crush:`訊號連攜・${skillA} × ${skillB}：一句普通訊息也能產生只有你們看得懂的第二層意思。`,
    teammates:`任務連攜・${skillA} × ${skillB}：一個人負責打開局面，另一個人負責讓結果真的落地。`
  };
  return templates[mode] || `${skillA} × ${skillB} 形成專屬雙人技能。`;
}

function buildDuoStrength(result){
  const {roleA,roleB,metrics,mode}=result;
  const top=highestDuoMetric(metrics);
  const byMetric={
    communication:`${roleA.name} 與 ${roleB.name} 的表達方式雖不一定相同，但比較有機會在誤會變大前抓到重點。`,
    rhythm:`你們對出現、安靜、聊天與關機的節奏相對容易找到交集，不需要靠高頻互動證明關係。`,
    complement:`你們真正的優勢不是很像，而是角色能力能補位。有人卡住時，另一個人比較有機會提供不同解法。`,
    safety:`這組合最珍貴的是情緒安全感。狀態不好時，不必先整理成完美版本才有資格靠近對方。`,
    action:`你們一起做事時比較容易進入狀態，適合把想很久的計畫變成一個真的完成的版本。`
  };
  const modeTail={
    friends:'這會讓友情很耐玩。',
    couple:'這會成為長期關係的重要底盤。',
    crush:'這會讓曖昧不只停在猜測。',
    teammates:'這會直接反映在合作效率上。'
  }[mode];
  return `${byMetric[top]}${modeTail}`;
}

function buildDuoFriction(result){
  const {roleA,roleB,metrics,mode}=result;
  const risk=largestDuoRisk(metrics);
  const copy={
    avoidBoth:`兩個人不舒服時都可能先退後。${roleA.name} 與 ${roleB.name} 如果同時切成隱身模式，「需要休息」很容易被誤會成「不在乎」。`,
    overthinkBoth:'你們都可能從語氣、回覆時間或一個小動作延伸出很多版本。越想確認，越可能只在腦內互相對話。',
    chaosBoth:'你們很容易一起興奮、一起開新任務，也可能一起忘記收尾。快樂是真的，行程失控也是真的。',
    closenessMismatch:mode==='crush'
      ? '一個人的好感訊號可能剛好撞上另一個人的防禦模式。越在意，反而越容易把話說得不像在意。'
      : '你們需要的靠近速度不同。有人想確認關係時，另一個人可能正在保護自己的空間。',
    socialMismatch:'一個人想聊天、出門或熱鬧時，另一個人可能剛好需要關機。沒說明電量，就會被解讀成掃興或冷淡。',
    styleMismatch:'你們表達在乎的方式不同：一個人期待明確回應，另一個人可能覺得自己已經用行動說明了。',
  };
  return copy[risk] || '最容易卡在「以為對方應該懂」。越熟，越需要把真正需求說出來。';
}

function buildDuoRepair(result){
  const risk=largestDuoRisk(result.metrics);
  const repairs={
    avoidBoth:'建立一句固定關機訊號，例如：「我現在沒電，不是對你冷掉，晚點會回來。」先交代狀態，再保留空間。',
    overthinkBoth:'不要問「你是不是怎樣」，改成各說一句：「我剛剛看到的事實是＿＿，我腦中猜的是＿＿。」把事實與腦補拆開。',
    chaosBoth:'每次一起開新坑前，先指定一個人負責收尾，並把完成標準縮到 20 分鐘內看得見。',
    closenessMismatch:'使用 10% 靠近法：不要逼一次說完全部真心，只提供一個比平常更清楚的訊號，讓對方有時間接住。',
    socialMismatch:'見面或聊天前先報電量 0～10 分，再決定今天適合熱鬧、安靜陪伴，還是各自休息。',
    styleMismatch:'各自說出一件「你做了我會感覺被在乎」的具體小事，禁止回答隨便、都可以或你應該知道。'
  };
  return repairs[risk] || '把「你應該懂」改成「我真正需要的是＿＿」。說清楚不是破壞默契，而是在保護默契。';
}

function buildDuoBestScene(result){
  const top=highestDuoMetric(result.metrics);
  const mode=result.mode;
  const scenes={
    communication:{
      friends:'最適合深夜散步、長訊息或只有兩個人的真心局。',
      couple:'最適合在情緒還沒爆炸前，安排固定的關係更新時間。',
      crush:'最適合用有一點認真、又不會壓迫的方式把訊號說清楚。',
      teammates:'最適合開會前先對齊目標與分工，避免各做各的。'
    },
    rhythm:{
      friends:'最適合低壓陪伴：各做各的，也知道對方還在線。',
      couple:'最適合建立兩個人的日常儀式，不必昂貴但要穩定。',
      crush:'最適合自然增加互動頻率，不用突然把曖昧推到最終關卡。',
      teammates:'最適合有明確截止、但允許各自安排節奏的合作。'
    },
    complement:{
      friends:'最適合一個人卡關時，請另一個人提供完全不同的觀點。',
      couple:'最適合把生活分工建立在強項，而不是要求兩個人做事方式一樣。',
      crush:'最適合一起完成一件小事，比只靠聊天更容易看見彼此的可靠度。',
      teammates:'最適合角色分工清楚的專案：有人開路、有人整合、有人收尾。'
    },
    safety:{
      friends:'最適合在其中一個人狀態差時，提供不急著解決的陪伴。',
      couple:'最適合把脆弱說出來，而不是只展示自己很好相處的一面。',
      crush:'最適合坦白一點點真實感受，測試彼此是否能溫柔接住。',
      teammates:'最適合在失誤後先處理問題，不把錯誤直接等同能力不足。'
    },
    action:{
      friends:'最適合一起挑戰新體驗、運動、學習或完成拖很久的小目標。',
      couple:'最適合共同規劃旅行、存錢或生活升級，但要保留個人空間。',
      crush:'最適合用一起做事創造自然相處，不必每次都把重點放在關係定義。',
      teammates:'最適合短週期、有成果、能快速回饋的任務。'
    }
  };
  return scenes[top][mode];
}

function buildDuoQuest(result){
  const risk=largestDuoRisk(result.metrics);
  const mode=result.mode;
  const base={
    friends:'安排一次 15 分鐘友情副本：一個人說最近最卡的事，另一個人先不給建議，只重述自己聽懂的內容。',
    couple:'各自完成一句：「最近我最希望你多知道的是＿＿。」說完先不辯解，只確認有沒有聽懂。',
    crush:'各自丟出一個比平常清楚 10% 的訊號，例如主動約時間、說出期待，或明確表達見面後很開心。',
    teammates:'選一件 30 分鐘能完成的小任務，先寫清楚誰開始、誰收尾、什麼叫完成。'
  }[mode];

  const riskTail={
    avoidBoth:'結束前再約定關機訊號。',
    overthinkBoth:'過程中出現猜測時，要把事實與腦補分開說。',
    chaosBoth:'任務完成前不准再開第二個新坑。',
    closenessMismatch:'不要求立刻給答案，只要求訊號更清楚。',
    socialMismatch:'開始前先互報今天電量。',
    styleMismatch:'每人說一件具體會感覺被在乎的行動。'
  }[risk] || '';

  return `${base}${riskTail}`;
}

function buildDuoSevenDays(result){
  const mode=result.mode;
  const modeTasks={
    friends:[
      '互相選出對方角色卡上最像本人的一句話。',
      '分享一件最近沒有跟其他人說的小煩惱。',
      '一起完成一個 20 分鐘的小任務。',
      '各自說出一次被對方幫到、但當時沒有說的事。',
      '交換一首最近很像自己狀態的歌。',
      '安排一段不用一直聊天的低壓陪伴。',
      '替這段友情取一個只有你們懂的副本名稱。'
    ],
    couple:[
      '各自報告今天的情緒電量與需要的陪伴方式。',
      '說出一個最近有被對方照顧到的細節。',
      '安排 20 分鐘無手機對話。',
      '各自完成一句：「我生氣時其實最需要＿＿。」',
      '一起完成一件生活小任務，不評論彼此做法。',
      '交換一個下週可以幫對方減少負擔的行動。',
      '建立一句吵架或關機時的安全訊號。'
    ],
    crush:[
      '主動丟出一次不含糊的聊天開場。',
      '分享一個只有熟人才知道的小偏好。',
      '提出一次有日期或時間的具體邀約。',
      '回覆時少修稿一次，保留真實語氣。',
      '稱讚對方一個外表以外的特點。',
      '觀察對方是否也有主動投入，而不是只看自己心動。',
      '完成一句：「跟你相處時，我最喜歡的是＿＿。」'
    ],
    teammates:[
      '各自寫下自己最擅長與最不想負責的任務。',
      '把一個大目標拆成 30 分鐘能完成的版本。',
      '明確指定一位開始者與一位收尾者。',
      '交換一次不帶批評的具體回饋。',
      '一起完成最不想做的那個小步驟。',
      '檢查目前是否同時開了太多任務。',
      '完成一次復盤：留下有效做法，刪掉沒用流程。'
    ]
  };
  return modeTasks[mode].map((task,index)=>{
    if(index===3) return `${task}（${result.roleA.name} 與 ${result.roleB.name} 都要回答）`;
    return task;
  });
}

function buildDuoSecret(result){
  const typeLines={
    '心動拉扯搭檔':'你們不是沒有訊號，只是兩個人都可能把在意藏成沒事。真正的升級，是讓訊號不必一直靠猜。',
    '溫柔補血同盟':'真正好的補師關係，不是永遠照顧對方，而是兩個人都敢說自己也需要回血。',
    '雙核心闖關隊':'你們可以一起變強，但別把關係也變成一張永遠做不完的任務表。',
    '混亂靈感聯盟':'你們負責把世界玩得有趣，也要記得留一個人負責存檔。',
    '靜音默契組':'安靜不是距離，只要彼此知道門沒有真的關上。',
    '氣氛爆擊雙人組':'你們很會讓場面快樂，兩個人單獨相處時也可以不用一直有梗。',
    '深夜理解同盟':'你們能聽懂彼此沒說完的話，也別忘了有些答案需要白天真的去做。',
    '同頻共振組':'很像是一種幸運，但保留不同，才不會把彼此困在同一個盲點裡。',
    '反差互補組':'你們不需要變成一樣，真正的默契是知道何時接手、何時讓對方自己完成。',
    '主線推進小隊':'一起前進很強，但也要允許其中一個人偶爾只想被陪，而不是被推進。',
    '高難度磨合組':'分數低不是判定不適合，而是你們需要更多明確說明書；願意理解差異，才是這關真正的獎勵。',
    '穩定合作組':'最耐玩的關係不一定最戲劇化，而是每次回頭都還找得到彼此。'
  };
  return typeLines[result.type] || '你們的雙人副本，不是要證明多完美，而是學會怎麼一起玩得更久。';
}

function buildDuoResult(roleA,roleB,mode=state.duoMode){
  const metrics=computeDuoMetrics(roleA,roleB,mode);
  const dominant=getDuoDominantAxes(roleA,roleB);
  const type=determineDuoType(roleA,roleB,mode,metrics);
  const pairKey=makeDuoPairKey(roleA.id,roleB.id);
  const hash=stablePairHash(roleA.id,roleB.id,mode);
  const tier=duoScoreTier(metrics.score);

  const result={
    roleA,roleB,mode,pairKey,metrics,
    score:metrics.score,
    scoreRange:duoScoreRange(metrics.score),
    tier,
    type,
    title:buildDuoTitle(roleA,roleB,mode,type,dominant),
    code:`#DUO-${String(hash%10000).padStart(4,'0')}`,
    resultId:`DUO-${String(stablePairHash(roleA.id,roleB.id)).padStart(1,'0')}-${mode}`.slice(0,100),
    traits:dominant.map(item=>DUO_AXIS_LABELS[item.axis]).filter(Boolean)
  };

  result.summary=buildDuoSummary(roleA,roleB,mode,type,metrics);
  result.skill=buildDuoSkill(result);
  result.strength=buildDuoStrength(result);
  result.friction=buildDuoFriction(result);
  result.repair=buildDuoRepair(result);
  result.bestScene=buildDuoBestScene(result);
  result.quest=buildDuoQuest(result);
  result.sevenDays=buildDuoSevenDays(result);
  result.secret=buildDuoSecret(result);
  return result;
}

function hasDuoAccess(pairKey){
  if(!pairKey) return false;
  if(localStorage.getItem(`lifequest:duoAccess:${pairKey}`)) return true;
  return getRemoteRoleIds().has(pairKey);
}

function grantDuoAccess(pairKey){
  if(!pairKey) return;
  localStorage.setItem(`lifequest:duoAccess:${pairKey}`,JSON.stringify({
    pairKey,at:new Date().toISOString(),source:'ECPAY'
  }));
  const remote=getRemoteRoleIds();
  remote.add(pairKey);
  localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify([...remote]));
}

function generateDuoCard(options={}){
  const roleA=getRoleById($('duoRoleA')?.value);
  const roleB=getRoleById($('duoRoleB')?.value);

  if(!roleA || !roleB){
    if(!options.silent) toast('請先選擇兩張角色卡');
    return;
  }

  const result=buildDuoResult(roleA,roleB,state.duoMode);
  state.duoResult=result;
  renderDuoResult(result);

  $('duoEmptyState')?.classList.add('hidden');
  $('duoResult')?.classList.remove('hidden');

  if(!options.silent){
    setTimeout(()=>$('duoResult')?.scrollIntoView({behavior:'smooth',block:'nearest'}),100);
  }
}

function renderDuoResult(result){
  const set=(id,value)=>{
    const node=$(id);
    if(node) node.textContent=value;
  };

  set('duoEmojiA',result.roleA.emoji);
  set('duoEmojiB',result.roleB.emoji);
  set('duoRoleNames',`${result.roleA.name} × ${result.roleB.name}`);
  set('duoTitle',result.title);
  set('duoType',result.type);
  set('duoPairCode',result.code);
  set('duoModeBadge',DUO_MODES[result.mode].badge);
  set('duoScoreRange',result.scoreRange);
  set('duoSummary',result.summary);

  const row=$('duoTraitRow');
  if(row) row.innerHTML=result.traits.map(trait=>`<span>${trait}</span>`).join('');

  const card=$('duoCard');
  if(card){
    card.style.setProperty('--duo-a',result.roleA.accent||'#a87cff');
    card.style.setProperty('--duo-b',result.roleB.accent||'#ff6cab');
  }

  if(hasDuoAccess(result.pairKey)) revealDuoPremium(result,{silent:true});
  else lockDuoPremium();
}

function lockDuoPremium(){
  $('duoLockedPanel')?.classList.remove('hidden');
  $('duoPremiumDetails')?.classList.add('hidden');
  $('downloadDuoBtn')?.classList.add('hidden');
  $('shareDuoBtn')?.classList.add('hidden');
  $('duoCard')?.classList.add('duo-card-free');
  $('duoCard')?.classList.remove('duo-card-unlocked');
}

function revealDuoPremium(result=state.duoResult,options={}){
  if(!result) return;

  const set=(id,value)=>{
    const node=$(id);
    if(node) node.textContent=value;
  };
  const setBar=(id,value)=>{
    const node=$(id);
    if(node) node.style.width=`${clampNumber(value,0,100)}%`;
  };

  set('duoScore',result.score);
  set('duoTierLabel',result.tier.label);
  set('duoExactTitle',`${DUO_MODES[result.mode].icon} ${DUO_MODES[result.mode].label}完整攻略`);
  set('duoExactSummary',`${result.roleA.name} × ${result.roleB.name} 的精確默契為 ${result.score}。分數反映此模式下的溝通、節奏、互補、安全感與行動配合。`);
  set('duoMetricCommunication',result.metrics.communication);
  set('duoMetricRhythm',result.metrics.rhythm);
  set('duoMetricComplement',result.metrics.complement);
  set('duoMetricSafety',result.metrics.safety);
  set('duoMetricAction',result.metrics.action);
  setBar('duoBarCommunication',result.metrics.communication);
  setBar('duoBarRhythm',result.metrics.rhythm);
  setBar('duoBarComplement',result.metrics.complement);
  setBar('duoBarSafety',result.metrics.safety);
  setBar('duoBarAction',result.metrics.action);

  set('duoSkill',result.skill);
  set('duoStrength',result.strength);
  set('duoFriction',result.friction);
  set('duoRepair',result.repair);
  set('duoBestScene',result.bestScene);
  set('duoQuest',result.quest);
  set('duoModeLabel',DUO_MODES[result.mode].label);
  set('duoSecret',result.secret);

  const list=$('duoSevenDayList');
  if(list) list.innerHTML=result.sevenDays.map((task,index)=>`<li><b>DAY ${index+1}</b><span>${task}</span></li>`).join('');

  const ring=$('duoScoreRing');
  if(ring) ring.style.setProperty('--duo-score',`${result.score*3.6}deg`);

  const tier=$('duoTierLabel');
  if(tier){
    tier.className=`duo-tier-label ${result.tier.className}`;
  }

  $('duoLockedPanel')?.classList.add('hidden');
  $('duoPremiumDetails')?.classList.remove('hidden');
  $('downloadDuoBtn')?.classList.remove('hidden');
  $('shareDuoBtn')?.classList.remove('hidden');
  $('duoCard')?.classList.remove('duo-card-free');
  $('duoCard')?.classList.add('duo-card-unlocked');

  if(!options.silent) toast('完整雙人副本已解鎖');
}

function resetDuoResult(){
  state.duoResult=null;
  $('duoResult')?.classList.add('hidden');
  $('duoEmptyState')?.classList.remove('hidden');
  $('duoRoleA')?.focus();
  $('duo')?.scrollIntoView({behavior:'smooth',block:'start'});
}

async function downloadDuoCard(){
  const result=state.duoResult;
  if(!result) return toast('請先生成雙人副本');
  if(!hasDuoAccess(result.pairKey)) return openDuoPayModal();
  if(typeof html2canvas==='undefined') return toast('圖片套件還在載入，請再按一次');

  const button=$('downloadDuoBtn');
  const original=button?.textContent||'';
  if(button){
    button.disabled=true;
    button.textContent='正在生成完整雙人卡…';
  }

  try{
    const sourceCanvas=await html2canvas($('duoCard'),{
      backgroundColor:'#100f1f',
      scale:Math.min(3,Math.max(2,window.devicePixelRatio||2)),
      useCORS:true,
      allowTaint:true,
      logging:false
    });

    const jpgCanvas=document.createElement('canvas');
    jpgCanvas.width=sourceCanvas.width;
    jpgCanvas.height=sourceCanvas.height;
    const ctx=jpgCanvas.getContext('2d');
    ctx.fillStyle='#100f1f';
    ctx.fillRect(0,0,jpgCanvas.width,jpgCanvas.height);
    ctx.drawImage(sourceCanvas,0,0);

    const fileName=`${result.title}-人生副本完整雙人卡.jpg`;
    const dataUrl=jpgCanvas.toDataURL('image/jpeg',.94);

    if(jpgCanvas.toBlob){
      jpgCanvas.toBlob(blob=>{
        showSaveImageModal(dataUrl,fileName,blob,{
          title:'完整雙人卡已生成',
          alt:`${result.roleA.name}與${result.roleB.name}完整雙人卡`,
          copy:'完整雙人卡已經產生。點圖片嘗試儲存；手機沒有反應時，可以長按圖片選擇儲存影像。'
        });
        if(!isIOSLike()&&!isInAppBrowser()) triggerBlobDownload(blob,fileName);
      },'image/jpeg',.94);
    }else{
      showSaveImageModal(dataUrl,fileName,null,{
        title:'完整雙人卡已生成',
        alt:`${result.roleA.name}與${result.roleB.name}完整雙人卡`
      });
    }
  }catch(error){
    console.error(error);
    toast('雙人卡生成失敗，請再試一次或直接截圖保存');
  }finally{
    if(button){
      button.disabled=false;
      button.textContent=original||'下載完整雙人合卡 JPG';
    }
  }
}

function copyDuoShareText(){
  const result=state.duoResult;
  if(!result) return toast('請先生成雙人副本');
  if(!hasDuoAccess(result.pairKey)) return openDuoPayModal();

  const text=`我們在「人生副本」合出：
${result.title}｜精確默契 ${result.score}

${result.roleA.emoji} ${result.roleA.name}
×
${result.roleB.emoji} ${result.roleB.name}

模式：${DUO_MODES[result.mode].label}
隊伍類型：${result.type}
合體技能：${result.skill}
最容易卡關：${result.friction}
修復攻略：${result.repair}
雙人任務：${result.quest}

你和朋友會開出什麼雙人副本？`;

  copyText(text,'已複製完整 Threads 合卡文');
  const box=$('duoShareBox');
  if(box) box.textContent='已複製，可以貼到 Threads 並標記對方一起玩。';
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
  renderDuoSavedChips();
  if(showToast) toast(item.premium ? '已保存完整報告到我的卡冊' : '已自動存進我的卡冊');
}
function saveCurrentCard(){ saveResultToCollection(true); }
function showSavedCards(){
  const title = $('savedTitle');
  if(title) title.textContent = '選擇你要查看或解鎖的卡';
  const copy = document.querySelector('#savedModal .modal-copy');
  if(copy) copy.textContent = '每張卡都會自動保存在這裡。同一種角色只需要購買一次；可用私人備份碼在其他裝置同步已購買角色。';
  renderSavedCards();
  openModalElement($('savedModal'));
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
  if(copy) copy.textContent = '同一種角色只需購買一次。請選擇想購買完整報告的角色卡。';
  renderSavedCards();
  openModalElement($('savedModal'));
}
function closeSavedModal(){ closeModalElement($('savedModal')); }
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
        ${unlocked ? `<button class="primary-btn tiny" type="button" data-view-report="${item.resultId}">查看完整報告</button>` : `<button class="primary-btn tiny" type="button" data-unlock-saved="${item.resultId}">完整報告 · NT$49</button>`}
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

function configurePayModal(config){
  const set=(id,value)=>{
    const node=$(id);
    if(node) node.textContent=value;
  };

  set('payTitle',config.title);
  set('payModalCopy',config.copy);
  set('payRoleHeading',config.heading);
  set('payRoleTeaser',config.teaser);
  set('unlockTargetText',config.target);
  set('payStepTwo',`完成 NT$${config.amount} 付款`);
  set('payStepThree',config.returnText);
  set('payPolicyNote',config.policy);
  set('payNowBtn',`前往綠界安全付款｜NT$${config.amount}`);

  const values=$('payValueSummary');
  if(values) values.innerHTML=config.values.map(item=>`<span><b>${item.title}</b>${item.text}</span>`).join('');

  setModalMessage('',true);
  openModalElement($('payModal'));
}

function openPayModal(){
  if(!state.currentRole){
    const list=getSavedList();
    if(list.length){ openUnlockChooser(); return; }
    location.hash='#quiz';
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

  state.paymentContext={
    type:'report',
    amount:49,
    roleId:state.currentRole.id,
    resultId:state.resultId
  };

  const note=rolePremiumNotes[state.currentRole.id]||{};
  configurePayModal({
    title:'解鎖這張角色的完整攻略',
    copy:'你將解鎖這張角色專屬的 10 個章節。付款成功後會自動返回網站並立即顯示完整內容。',
    heading:`${state.currentRole.emoji} ${state.currentRole.name}｜${state.currentRole.rarity}`,
    teaser:firstSentence(note.hook||roleContradiction(state.currentRole),105),
    target:`購買角色：${state.currentRole.name}｜${state.currentRole.rarity}
結果編號：${state.resultId}`,
    amount:49,
    returnText:'返回網站，自動解鎖完整報告',
    policy:'🎀 本服務為娛樂性數位內容；付款成功並顯示完整報告後，即視為服務完成。',
    values:[
      {title:'10 章',text:'角色專屬解析'},
      {title:'一次',text:'同角色不重複付費'},
      {title:'自動',text:'付款成功立即解鎖'}
    ]
  });
}

function openDuoPayModal(){
  const result=state.duoResult;
  if(!result){
    toast('請先免費試算雙人副本');
    return;
  }

  if(hasDuoAccess(result.pairKey)){
    revealDuoPremium(result);
    return;
  }

  state.paymentContext={
    type:'duo',
    amount:10,
    pairKey:result.pairKey,
    roleAId:result.roleA.id,
    roleBId:result.roleB.id,
    resultId:result.resultId,
    duoMode:result.mode
  };

  configurePayModal({
    title:'解鎖完整雙人副本',
    copy:'付款後會揭曉精確默契分數、五項能力、合體技能、衝突攻略與 7 日雙人任務。',
    heading:`${result.roleA.emoji} ${result.roleA.name} × ${result.roleB.emoji} ${result.roleB.name}`,
    teaser:`目前免費試算為「${result.type}｜默契 ${result.scoreRange}」。同一組角色解鎖一次，四種關係模式都可以查看。`,
    target:`購買項目：完整雙人副本
配對編號：${result.code}`,
    amount:10,
    returnText:'返回網站，自動顯示完整雙人副本',
    policy:'🎀 完整雙人副本為娛樂性數位內容；付款成功並顯示完整內容後，即視為服務完成。',
    values:[
      {title:'精確',text:'默契與五項能力'},
      {title:'4 模式',text:'朋友／情侶／曖昧／搭檔'},
      {title:'一次',text:'同一組角色永久解鎖'}
    ]
  });
}

function closePayModal(){ closeModalElement($('payModal')); }


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

async function syncEntitlements(opts={}){
  try{
    const customerId = getCustomerId();
    const data = await fetchJsonWithTimeout(`${CONFIG.WORKER_URL}/entitlements`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({customerId})
    },12000);

    if(!data.ok) throw new Error(data.message || '同步服務暫時無法使用');
    if(!data.ok || !Array.isArray(data.entitlements)) throw new Error('同步資料格式錯誤');

    const roleIds = [...new Set(data.entitlements.map(item=>item.role_id).filter(Boolean))];
    localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify(roleIds));
    localStorage.setItem(STORAGE_KEYS.lastSyncAt,new Date().toISOString());

    if(opts.mergeCards) mergeRemoteEntitlements(data.entitlements);
    if(state.duoResult && hasDuoAccess(state.duoResult.pairKey)){
      revealDuoPremium(state.duoResult,{silent:true});
    }
    if(opts.showFeedback) toast(`已同步 ${roleIds.length} 個已購買項目`);
    return data.entitlements;
  }catch(error){
    console.warn('entitlements sync failed',error);
    if(opts.showFeedback) toast('目前無法同步，請稍後再試');
    if(opts.throwOnError) throw error;
    return [];
  }
}

function mergeRemoteEntitlements(entitlements){
  const list = getSavedList();
  let changed = false;

  entitlements.forEach(item=>{
    const role = getRoleById(item.role_id);
    if(!role) return;

    const existing = list.find(card=>card.roleId===role.id);
    if(existing){
      existing.premium = true;
      if(!existing.resultId && item.source_result_id) existing.resultId = item.source_result_id;
      return;
    }

    list.unshift({
      roleId:role.id, roleName:role.name, rarity:role.rarity, emoji:role.emoji,
      line:role.line, resultId:item.source_result_id || `REMOTE-${role.id}`,
      answers:synthesizeAnswersFromRole(role), premium:true,
      at:item.granted_at || new Date().toISOString(), remote:true
    });
    changed = true;
  });

  if(changed || entitlements.length) setSavedList(list);
}

function openRecoveryModal(){
  const code = getCustomerId();
  $('recoveryCodeText').textContent = code;
  $('recoveryCodeInput').value = '';
  setRecoveryMessage('',true);
  openModalElement($('recoveryModal'));
}
function closeRecoveryModal(){ closeModalElement($('recoveryModal')); }
function setRecoveryMessage(message,ok){
  const el=$('recoveryMessage'); if(!el) return;
  el.textContent=message; el.style.color=ok?'var(--green)':'var(--danger)';
}
async function restoreFromRecoveryCode(){
  const code=String($('recoveryCodeInput').value||'').trim();
  if(!/^guest_[A-Za-z0-9_-]{12,80}$/.test(code)){
    setRecoveryMessage('備份碼格式不正確，請完整貼上。',false); return;
  }
  const button=$('restoreRecoveryBtn'); button.disabled=true; button.textContent='正在同步…';
  const previous=getCustomerId();
  try{
    localStorage.setItem(STORAGE_KEYS.customerId,code);
    localStorage.removeItem(STORAGE_KEYS.remoteRoleIds);
    const entitlements=await syncEntitlements({mergeCards:true,throwOnError:true});
    if(!entitlements.length){
      localStorage.setItem(STORAGE_KEYS.customerId,previous);
      await syncEntitlements({mergeCards:true});
      throw new Error('這組備份碼目前沒有已購買紀錄');
    }
    renderSavedCards();
    $('recoveryCodeText').textContent=code;
    setRecoveryMessage(`同步完成，共找到 ${entitlements.length} 個已購買項目。`,true);
    toast('卡冊購買紀錄已同步');
  }catch(error){
    setRecoveryMessage(error.message||'同步失敗，請稍後再試。',false);
  }finally{
    button.disabled=false; button.textContent='同步我的已購買角色';
  }
}

async function startEcpayPayment(){
  const context=state.paymentContext||{type:'report'};

  if(context.type==='duo'){
    const result=state.duoResult;
    if(!result || result.pairKey!==context.pairKey){
      setModalMessage('雙人副本資料已變更，請關閉視窗後重新試算。',false);
      return;
    }
    if(hasDuoAccess(result.pairKey)){
      closePayModal();
      revealDuoPremium(result);
      return;
    }
  }else{
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
  }

  const amount=context.type==='duo'?10:49;
  const button=$('payNowBtn');
  if(button){
    button.disabled=true;
    button.textContent='正在前往綠界…';
  }
  hidePendingPaymentBar();
  setModalMessage('正在建立安全付款頁面…',true);

  try{
    const customerId=getCustomerId();
    const payload=context.type==='duo'
      ? {
          customerId,
          productType:'duo',
          resultId:context.resultId,
          roleAId:context.roleAId,
          roleBId:context.roleBId
        }
      : {
          customerId,
          productType:'report',
          resultId:state.resultId,
          roleId:state.currentRole.id
        };

    const data=await fetchJsonWithTimeout(`${CONFIG.WORKER_URL}/create-payment`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    },15000);

    if(!data.ok) throw new Error(data.message||'建立付款失敗');

    if(data.alreadyOwned){
      const remote=getRemoteRoleIds();
      remote.add(data.productKey || (context.type==='duo'?context.pairKey:state.currentRole.id));
      localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify([...remote]));
      closePayModal();

      if(context.type==='duo'){
        grantDuoAccess(context.pairKey);
        revealDuoPremium(state.duoResult);
      }else{
        grantRoleAccessToCurrentResult();
        showPremiumReport();
        toast('這個角色已經解鎖');
      }
      return;
    }

    localStorage.setItem(
      STORAGE_KEYS.pendingPayment,
      JSON.stringify({
        tradeNo:data.tradeNo,
        customerId,
        productType:context.type,
        productKey:data.productKey || (context.type==='duo'?context.pairKey:state.currentRole.id),
        resultId:context.type==='duo'?context.resultId:state.resultId,
        roleId:context.type==='report'?state.currentRole.id:'',
        roleAId:context.roleAId||'',
        roleBId:context.roleBId||'',
        duoMode:context.duoMode||'friends',
        amount,
        createdAt:new Date().toISOString()
      })
    );

    submitPaymentForm(data.action,data.fields);
  }catch(error){
    console.warn('create payment failed',error);
    let message='付款服務暫時無法使用，請稍後再試。';
    if(error?.name==='AbortError') message='付款服務連線逾時，請確認網路後再試。';
    else if(error?.name==='NetworkError' || error?.message==='Failed to fetch') message='目前無法連上付款服務，請重新整理頁面後再試。';
    else if(error?.message) message=error.message;

    setModalMessage(message,false);
    if(button){
      button.disabled=false;
      button.textContent=`重新前往綠界安全付款｜NT$${amount}`;
    }
  }
}

async function fetchJsonWithTimeout(url,options={},timeoutMs=12000){
  if(typeof navigator!=='undefined' && navigator.onLine===false){
    throw new Error('目前沒有網路連線，請連線後再試。');
  }

  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),timeoutMs);

  try{
    let response;
    try{
      response=await fetch(url,{
        ...options,
        mode:'cors',
        credentials:'omit',
        cache:'no-store',
        signal:controller.signal
      });
    }catch(error){
      if(error?.name==='AbortError') throw error;
      const networkError=new Error('目前無法連上付款服務，請重新整理頁面後再試。');
      networkError.name='NetworkError';
      throw networkError;
    }

    let data;
    try{ data=await response.json(); }
    catch{ throw new Error('付款服務回傳格式錯誤，請稍後再試。'); }

    if(!response.ok){
      throw new Error(data.message || `付款服務暫時異常（${response.status}）`);
    }
    return data;
  }finally{
    clearTimeout(timeout);
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
    resetPaymentButton();
    toast('付款尚未完成，不會產生扣款');
    clearPaymentQuery();
    showPendingPaymentBar();
    return;
  }

  if(payment === 'invalid'){
    resetPaymentButton();
    toast('付款返回資料驗證失敗，請聯絡客服');
    clearPaymentQuery();
    return;
  }

  if(payment !== 'return' || !tradeNo) return;

  const pending=getPendingPayment();
  if(pending && pending.tradeNo!==tradeNo){
    pending.tradeNo=tradeNo;
    localStorage.setItem(STORAGE_KEYS.pendingPayment,JSON.stringify(pending));
  }

  clearPaymentQuery();
  toast('正在確認付款結果…');
  await confirmPendingPayment({tradeNo,attempts:20});
}

function getPendingPayment(){
  try{return JSON.parse(localStorage.getItem(STORAGE_KEYS.pendingPayment)||'null')}
  catch{return null}
}

async function resumePendingPayment(opts={}){
  const pending=getPendingPayment();
  if(!pending?.tradeNo) return;
  const age=Date.now()-new Date(pending.createdAt||0).getTime();
  if(age>24*60*60*1000){
    localStorage.removeItem(STORAGE_KEYS.pendingPayment); hidePendingPaymentBar(); return;
  }
  if(!opts.force && age<3000) return;
  showPendingPaymentBar('正在確認付款結果…');
  await confirmPendingPayment({tradeNo:pending.tradeNo,attempts:opts.force?12:2});
}

async function confirmPendingPayment({tradeNo,attempts}){
  const pending=getPendingPayment();
  const customerId=pending?.customerId||getCustomerId();
  try{
    const data=await pollOrderStatus(tradeNo,customerId,attempts);
    if(data?.paid){
      applyPaidOrder(data.order);
      localStorage.removeItem(STORAGE_KEYS.pendingPayment);
      hidePendingPaymentBar(); resetPaymentButton();
      toast(data.order?.role_id?.startsWith('duo:') ? '付款成功，完整雙人副本已解鎖' : '付款成功，完整報告已解鎖');
      return true;
    }
    showPendingPaymentBar('尚未收到付款成功通知；請勿重複付款，可稍後重新確認。');
    resetPaymentButton();
    return false;
  }catch(error){
    console.warn(error);
    showPendingPaymentBar('目前無法確認付款，請稍後再試；請勿重複付款。');
    resetPaymentButton();
    return false;
  }
}

async function pollOrderStatus(tradeNo,customerId,attempts=10){
  for(let attempt=0; attempt<attempts; attempt+=1){
    try{
      const data=await fetchJsonWithTimeout(`${CONFIG.WORKER_URL}/order-status`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({tradeNo,customerId})
      },10000);
      if(data.ok && data.paid) return data;
      if(data.ok && ['FAILED','EXPIRED'].includes(data.order?.status)) return data;
    }catch(error){
      if(attempt===attempts-1) throw error;
    }
    if(attempt<attempts-1) await new Promise(resolve=>setTimeout(resolve,1500));
  }
  return null;
}

function showPendingPaymentBar(message){
  const bar=$('pendingPaymentBar'); if(!bar) return;
  if(message) $('pendingPaymentText').textContent=message;
  bar.classList.remove('hidden');
}
function hidePendingPaymentBar(){ $('pendingPaymentBar')?.classList.add('hidden'); }
function resetPaymentButton(){
  const button=$('payNowBtn');
  if(!button) return;
  const context=state.paymentContext||{type:'report'};
  const amount=context.type==='duo'?10:49;
  button.disabled=false;
  button.textContent=`前往綠界安全付款｜NT$${amount}`;
}

function applyPaidOrder(order){
  if(!order) return;

  const remote=getRemoteRoleIds();
  remote.add(order.role_id);
  localStorage.setItem(STORAGE_KEYS.remoteRoleIds,JSON.stringify([...remote]));

  if(String(order.role_id||'').startsWith('duo:')){
    const parsed=parseDuoPairKey(order.role_id);
    if(!parsed) return;

    grantDuoAccess(order.role_id);

    const pending=getPendingPayment();
    const mode=DUO_MODES[pending?.duoMode] ? pending.duoMode : 'friends';
    state.duoMode=mode;

    if($('duoRoleA')) $('duoRoleA').value=parsed.roleA.id;
    if($('duoRoleB')) $('duoRoleB').value=parsed.roleB.id;
    setDuoMode(mode);
    updateDuoSelectPreview('A');
    updateDuoSelectPreview('B');

    const result=buildDuoResult(parsed.roleA,parsed.roleB,mode);
    state.duoResult=result;
    renderDuoResult(result);
    revealDuoPremium(result,{silent:true});
    $('duoEmptyState')?.classList.add('hidden');
    $('duoResult')?.classList.remove('hidden');

    setTimeout(()=>$('duoPremiumDetails')?.scrollIntoView({behavior:'smooth',block:'start'}),150);
    return;
  }

  const saved=getSavedList().find(item=>item.resultId===order.result_id)
    || getSavedList().find(item=>item.roleId===order.role_id);

  const role=getRoleById(order.role_id);
  if(!role) return;

  state.currentRole=role;
  state.resultId=saved?.resultId||order.result_id;
  state.answers=Array.isArray(saved?.answers)&&saved.answers.length===questions.length
    ? saved.answers
    : synthesizeAnswersFromRole(role);
  state.scores=calculateScores();

  grantPremiumAccess(state.resultId,'ECPAY');
  renderResult(role);
  $('resultSection').classList.remove('hidden');
  showPremiumReport();
  saveLastResult();

  setTimeout(()=>$('premiumReport').scrollIntoView({behavior:'smooth',block:'start'}),150);
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
