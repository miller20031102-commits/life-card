const axes = [
  "warm", "cool", "social", "solo", "romance", "avoid", "ambition", "chaos", "support", "warrior", "creative", "overthink"
];

const questions = [
  {
    title: "朋友通常覺得你是？",
    hint: "選最常被說中的那個，不用選你想成為的樣子。",
    options: [
      { icon: "🧃", title: "很好相處但其實有邊界", desc: "笑笑的，心裡有自己的安全距離。", score: { warm: 2, solo: 1, support: 1 } },
      { icon: "⚡", title: "很有梗，負責讓場子活起來", desc: "可以講到大家笑，但回家會突然安靜。", score: { social: 2, creative: 2, chaos: 1 } },
      { icon: "🧊", title: "看起來冷，熟了才知道很暖", desc: "不是難相處，只是慢熱。", score: { cool: 2, warm: 1, solo: 1 } },
      { icon: "🛡️", title: "默默照顧大家的人", desc: "不一定講好聽話，但會真的處理事情。", score: { support: 3, warm: 1, warrior: 1 } }
    ]
  },
  {
    title: "遇到喜歡的人，你通常會？",
    hint: "這題會影響你的戀愛屬性。",
    options: [
      { icon: "🏃", title: "越喜歡越裝沒差", desc: "心裡很在意，外表像剛睡醒。", score: { romance: 2, avoid: 3, cool: 1, overthink: 1 } },
      { icon: "💬", title: "會主動，但會觀察對方反應", desc: "我可以丟球，但你要接。", score: { romance: 2, social: 1, warm: 1 } },
      { icon: "🌀", title: "會想太多，開始腦補 30 集", desc: "一句話可以分析到凌晨兩點。", score: { romance: 2, overthink: 3, solo: 1 } },
      { icon: "🔥", title: "喜歡就衝，不想浪費時間", desc: "人生太短，曖昧太慢。", score: { romance: 2, warrior: 2, chaos: 1 } }
    ]
  },
  {
    title: "你最常卡在哪裡？",
    hint: "人生副本的主要阻礙通常都藏在這題。",
    options: [
      { icon: "⏳", title: "想很多，做很慢", desc: "腦中已經做好了，現實還沒開始。", score: { overthink: 3, creative: 1, avoid: 1 } },
      { icon: "🌪️", title: "三分鐘熱度，但靈感很多", desc: "開始很猛，收尾像失蹤人口。", score: { chaos: 3, creative: 2 } },
      { icon: "🪫", title: "社交跟生活電量都很低", desc: "不是不努力，是系統快沒電。", score: { solo: 3, overthink: 1 } },
      { icon: "🥊", title: "太想變強，反而逼死自己", desc: "休息時也覺得自己不夠好。", score: { ambition: 3, warrior: 2, overthink: 1 } }
    ]
  },
  {
    title: "你的社交電量大概是？",
    hint: "請誠實，系統不會扣你社交分數。",
    options: [
      { icon: "🔋", title: "人越多越有精神", desc: "聊天會回血，聚會是補包。", score: { social: 3, warm: 1 } },
      { icon: "🌓", title: "看人，看場，看心情", desc: "熟人局 OK，陌生局要讀條。", score: { social: 1, solo: 1, overthink: 1 } },
      { icon: "🛌", title: "可以社交，但回家必須關機", desc: "白天很正常，晚上直接省電模式。", score: { solo: 3, support: 1 } },
      { icon: "🐈", title: "我比較像路過的貓", desc: "想出現就出現，想消失就消失。", score: { solo: 2, cool: 1, avoid: 1 } }
    ]
  },
  {
    title: "你生氣時通常怎樣？",
    hint: "這會決定你的隱藏殺傷力。",
    options: [
      { icon: "🧊", title: "變超冷，直接不想講", desc: "不是沒脾氣，是開始扣分。", score: { cool: 3, avoid: 1 } },
      { icon: "💣", title: "忍很久，最後一次爆炸", desc: "平常沒事，爆的時候大家安靜。", score: { warrior: 2, chaos: 2, overthink: 1 } },
      { icon: "🧾", title: "開始列證據，一條一條講", desc: "情緒可以有，但邏輯不能輸。", score: { cool: 1, ambition: 1, warrior: 1 } },
      { icon: "🥲", title: "先檢討自己是不是太敏感", desc: "生氣五分鐘，自責兩小時。", score: { warm: 1, support: 1, overthink: 3 } }
    ]
  },
  {
    title: "你最怕別人發現你其實？",
    hint: "這題會影響你的致命弱點。",
    options: [
      { icon: "🫥", title: "其實很怕被討厭", desc: "表面都可以，心裡其實很在乎。", score: { warm: 1, overthink: 3, support: 1 } },
      { icon: "🥀", title: "其實沒有看起來那麼堅強", desc: "可以扛，但不代表不痛。", score: { warrior: 1, overthink: 2, warm: 1 } },
      { icon: "👑", title: "其實很想贏，很想被看見", desc: "低調是真的，野心也是真的。", score: { ambition: 3, cool: 1 } },
      { icon: "🎭", title: "其實常常不知道自己在幹嘛", desc: "我看起來有劇本，其實全靠即興。", score: { chaos: 3, creative: 1 } }
    ]
  },
  {
    title: "你的人生目前比較像？",
    hint: "請選最有畫面的那個。",
    options: [
      { icon: "🎮", title: "卡關但不想刪遊戲", desc: "很累，但還是想破關。", score: { warrior: 2, ambition: 1, overthink: 1 } },
      { icon: "🧭", title: "地圖很大，但不知道去哪", desc: "不是不努力，是任務提示太少。", score: { solo: 1, creative: 1, overthink: 2 } },
      { icon: "🚀", title: "想升級，想變強，想翻身", desc: "現在不是最終版，我知道。", score: { ambition: 3, warrior: 1 } },
      { icon: "🍿", title: "一邊崩潰，一邊覺得很好笑", desc: "人生很荒謬，但我有梗。", score: { chaos: 2, creative: 2, social: 1 } }
    ]
  },
  {
    title: "你最常被哪句話打中？",
    hint: "這題會讓文案更像你。",
    options: [
      { icon: "🌙", title: "你不是沒事，你只是很會忍", desc: "好，這句有點痛。", score: { support: 1, overthink: 3, warm: 1 } },
      { icon: "🗡️", title: "你不是冷淡，你是在保護自己", desc: "我只是先把門關小一點。", score: { cool: 2, avoid: 2, solo: 1 } },
      { icon: "🔥", title: "你不是普通，你只是還沒開大", desc: "我需要的是機會，不是安慰。", score: { ambition: 3, warrior: 2 } },
      { icon: "🃏", title: "你越好笑，越不像真的沒事", desc: "糟糕，被抓到了。", score: { creative: 2, social: 1, overthink: 2 } }
    ]
  },
  {
    title: "你的做事風格偏哪種？",
    hint: "工作模式會用到這題。",
    options: [
      { icon: "📋", title: "先規劃，確定再做", desc: "我不是慢，我是在降低爆炸率。", score: { ambition: 1, cool: 1, overthink: 2 } },
      { icon: "⚒️", title: "邊做邊修，先有再說", desc: "版本可以醜，但不能永遠沒有。", score: { warrior: 2, chaos: 1, creative: 1 } },
      { icon: "🎨", title: "靠靈感爆發", desc: "靈感來了像神，沒有靈感像石頭。", score: { creative: 3, chaos: 2 } },
      { icon: "🧱", title: "默默堆，慢慢變強", desc: "我不一定快，但我會一直補等級。", score: { support: 1, ambition: 2, warrior: 1 } }
    ]
  },
  {
    title: "你在朋友群裡通常是？",
    hint: "朋友團隊卡未來會用這個延伸。",
    options: [
      { icon: "🧠", title: "軍師，幫大家分析", desc: "別人戀愛我比本人還清醒。", score: { cool: 1, support: 2, overthink: 1 } },
      { icon: "💬", title: "氣氛組，負責有趣", desc: "群組冷掉，我會丟梗。", score: { social: 3, creative: 1 } },
      { icon: "🩹", title: "補師，大家有事會找你", desc: "我不是客服，但常常被當客服。", score: { support: 3, warm: 2 } },
      { icon: "👻", title: "偶爾出現，但存在感很強", desc: "我不常講話，但一講就中。", score: { solo: 2, cool: 1, creative: 1 } }
    ]
  },
  {
    title: "你最近最想升級的是？",
    hint: "這會影響你的本週任務。",
    options: [
      { icon: "💸", title: "賺錢能力", desc: "我需要的是現實世界的金幣。", score: { ambition: 3, warrior: 1 } },
      { icon: "💘", title: "戀愛能力", desc: "不是沒人要，是我也不知道怎麼開始。", score: { romance: 3, overthink: 1 } },
      { icon: "🧍", title: "外表跟自信", desc: "我想讓自己看起來更像主角。", score: { ambition: 2, romance: 1 } },
      { icon: "🌱", title: "穩定生活", desc: "先不要變強，先不要每天崩。", score: { support: 1, solo: 1, overthink: 2 } }
    ]
  },
  {
    title: "你希望抽到的角色偏向？",
    hint: "最後一題，讓系統知道你想要的 vibe。",
    options: [
      { icon: "🖤", title: "酷一點，有神秘感", desc: "不要太陽光，我想要有故事。", score: { cool: 3, solo: 1 } },
      { icon: "💛", title: "暖一點，有被懂的感覺", desc: "可以嘴我，但也要抱我一下。", score: { warm: 3, support: 1 } },
      { icon: "⚔️", title: "燃一點，有變強感", desc: "我要看到自己會升級。", score: { warrior: 2, ambition: 2 } },
      { icon: "🃏", title: "怪一點，有梗最好", desc: "普通的人設我不要。", score: { creative: 3, chaos: 1 } }
    ]
  }
];

const roles = [
  {
    id: "warm-assassin", name: "嘴硬型溫柔刺客", rarity: "SR", emoji: "🗡️", accent: "#ff6da8",
    vector: { warm: 3, cool: 2, solo: 1, avoid: 2, support: 2, overthink: 2 },
    line: "嘴上說沒事，手上已經幫你把事情處理好。",
    traits: ["外冷內熱", "嘴硬", "守護系"],
    skill: "無聲支援：不會講漂亮話，但會默默把爛攤子收掉。",
    passive: "越在意越假裝沒差，越喜歡越裝得很像路人。",
    weakness: "怕自己太認真，也怕別人發現你其實很柔軟。",
    love: "戀愛時容易用冷靜包裝在意，需要遇到會接住你彆扭的人。",
    social: "朋友眼中你像可靠的暗器，平常安靜，關鍵時刻很準。",
    work: "適合做需要判斷、收尾、保密感的任務。你不一定愛出風頭，但很能扛責任。",
    boss: "隱藏 Boss 是『我沒關係』。你每說一次，血條就少一點。",
    quest: "本週任務：把一句『隨便』改成真正想要的答案。",
    summary: "你不是冷，你只是把溫柔藏得很深。"
  },
  {
    id: "love-runaway-mage", name: "戀愛逃跑法師", rarity: "SSR", emoji: "🧙‍♂️", accent: "#a979ff",
    vector: { romance: 4, avoid: 4, overthink: 3, cool: 1, solo: 1 },
    line: "越喜歡越冷淡，越在意越裝沒差。",
    traits: ["曖昧讀條", "小劇場", "逃跑大師"],
    skill: "已讀後小劇場：對方一句話，你可以分析出三種宇宙。",
    passive: "心動時自動開啟防禦結界，看起來超冷，其實超慌。",
    weakness: "怕主動後輸掉，所以常常假裝自己沒有很想要。",
    love: "你的戀愛攻略不是更會撩，而是學會不要在喜歡時裝成 NPC。",
    social: "你在熟人面前很有趣，在喜歡的人面前突然像網路斷線。",
    work: "適合需要觀察、感受、文案、創意的事，但要小心想太多導致延遲交付。",
    boss: "隱藏 Boss 是『我是不是太明顯』。其實你通常一點都不明顯。",
    quest: "本週任務：主動傳一次訊息，傳完不要立刻後悔。",
    summary: "你不是不會愛，是太怕自己先認真。"
  },
  {
    id: "social-battery-hunter", name: "社交電量獵人", rarity: "R", emoji: "🔋", accent: "#62e4ff",
    vector: { social: 3, solo: 3, creative: 1, support: 1 },
    line: "可以很會聊，但回家需要關機八小時。",
    traits: ["可外向", "需充電", "看場發揮"],
    skill: "場合適應：熟人局輸出爆表，陌生局先觀察地形。",
    passive: "社交後自動進入省電模式，已讀不回不是討厭，是沒電。",
    weakness: "太常硬撐社交，最後連喜歡的人都懶得回。",
    love: "適合慢慢靠近，不適合高壓追問。你需要空間，但不是不在乎。",
    social: "你是朋友群裡的可變型角色，需要時能上場，不需要時會回洞穴。",
    work: "適合彈性高、有獨立作業時間的工作。一直開會會讓你精神扣血。",
    boss: "隱藏 Boss 是『大家都在等我回』。你可以不用即時服務全世界。",
    quest: "本週任務：安排一段真正沒有 guilt 的關機時間。",
    summary: "你不是難約，你只是需要先充滿電。"
  },
  {
    id: "restart-hero", name: "人生重開勇者", rarity: "UR", emoji: "⚔️", accent: "#ffcf5a",
    vector: { warrior: 4, ambition: 4, overthink: 2, warm: 1 },
    line: "常常覺得自己廢，但其實一直在偷偷升級。",
    traits: ["想變強", "不服輸", "主角感"],
    skill: "重開不刪檔：跌倒後會嘴硬說沒差，然後半夜開始查攻略。",
    passive: "遇到壓力會痛苦，但也會被壓力逼出新技能。",
    weakness: "太急著變好，容易把現在的自己罵到沒血。",
    love: "你需要的是會支持你變強，也會提醒你休息的人。",
    social: "朋友可能覺得你有點ㄍㄧㄥ，但也知道你其實很認真。",
    work: "適合有成長曲線、能累積技能的路線。短期看不見進步會讓你焦慮。",
    boss: "隱藏 Boss 是『我怎麼還不是理想中的自己』。",
    quest: "本週任務：選一件小事完成，不要只規劃巨大人生。",
    summary: "你不是失敗者，你只是還在新手村刷等。"
  },
  {
    id: "emotion-watcher", name: "情緒觀察系巫師", rarity: "SR", emoji: "🔮", accent: "#b389ff",
    vector: { overthink: 4, support: 2, warm: 2, creative: 1 },
    line: "你很會讀空氣，也很容易被空氣讀到累。",
    traits: ["敏銳", "共感", "想太多"],
    skill: "氣氛偵測：一句話、一個表情，你都能感覺哪裡怪怪的。",
    passive: "別人的情緒會自動進入你的系統，像沒關掉通知。",
    weakness: "容易把別人的低氣壓當成自己的錯。",
    love: "你很會照顧對方感受，但要記得不是所有沉默都需要你修復。",
    social: "朋友常找你聊心事，因為你有一種懂人的超能力。",
    work: "適合內容、服務、設計、諮詢類任務，但需要清楚邊界。",
    boss: "隱藏 Boss 是『是不是我哪裡做不好』。很多時候真的不是你。",
    quest: "本週任務：不要幫每個人的情緒買單。",
    summary: "你的敏感不是缺點，但需要設定防護罩。"
  },
  {
    id: "happy-clown", name: "表面樂觀小丑", rarity: "SR", emoji: "🃏", accent: "#ff8a4c",
    vector: { social: 3, creative: 3, chaos: 2, overthink: 2 },
    line: "越會逗別人笑，越不一定是真的沒事。",
    traits: ["有梗", "反差", "氣氛組"],
    skill: "尷尬破冰：只要場面冷掉，你會自動丟出一個梗。",
    passive: "把壓力包成笑話，讓大家以為你很輕鬆。",
    weakness: "習慣用玩笑帶過真正的需求。",
    love: "你喜歡能接住你幽默，也能看穿你逞強的人。",
    social: "你是群體裡的開場動畫，但不是永遠都想表演。",
    work: "適合創意、社群、企劃、內容型工作。無聊重複會讓你靈魂掉線。",
    boss: "隱藏 Boss 是『我是不是只能有趣，不能脆弱』。",
    quest: "本週任務：認真說一次自己的真心話，不要加哈哈。",
    summary: "你很好笑，但你也值得被認真對待。"
  },
  {
    id: "midnight-sorcerer", name: "深夜想太多術士", rarity: "SSR", emoji: "🌙", accent: "#6d8bff",
    vector: { overthink: 5, solo: 2, creative: 2, romance: 1 },
    line: "白天像正常人，晚上像人生分析師。",
    traits: ["夜間開大", "腦補", "內耗"],
    skill: "凌晨推演：能把一句話推論到人生結局。",
    passive: "安靜時大腦自動播放未解任務清單。",
    weakness: "常常想完所有可能，卻忘了先做第一步。",
    love: "你需要穩定、明確、不玩猜謎的人，不然腦袋會開 99 個分頁。",
    social: "你不一定常說，但觀察很細，常常一針見血。",
    work: "適合研究、寫作、分析、設計策略。缺點是容易完美主義。",
    boss: "隱藏 Boss 是『萬一失敗怎麼辦』。但你連開始都還沒開始。",
    quest: "本週任務：把一個想法做成 10 分醜版，不要等完美。",
    summary: "你的腦很強，但不要讓它變成你的監獄。"
  },
  {
    id: "delay-genius", name: "拖延型天才工匠", rarity: "SR", emoji: "🛠️", accent: "#70f2a4",
    vector: { creative: 3, chaos: 3, ambition: 2, overthink: 1 },
    line: "平常像沒動，截止前突然開神裝。",
    traits: ["靈感派", "壓線王", "爆發型"],
    skill: "最後一晚鍛造：越接近死線，輸出越不像人類。",
    passive: "腦中有很多版本，但手上通常是 v0.1。",
    weakness: "太依賴爆發，導致平常一直有罪惡感。",
    love: "你喜歡有趣、有空間的人。太規訓的關係會讓你逃跑。",
    social: "朋友覺得你很有才，但也常想把你抓去交稿。",
    work: "適合專案、創作、網站、設計、企劃。需要把大任務切小。",
    boss: "隱藏 Boss 是『等等再做』。它看起來很弱，其實是魔王。",
    quest: "本週任務：今天只完成 15 分鐘，不准等狀態來。",
    summary: "你不是沒能力，是太常把能力留到最後一刻。"
  },
  {
    id: "silent-berserker", name: "安靜暴走騎士", rarity: "SSR", emoji: "🐺", accent: "#ff6969",
    vector: { warrior: 3, cool: 3, chaos: 2, solo: 1 },
    line: "平常不吵，爆發時直接全場靜音。",
    traits: ["沉默", "爆發", "界線感"],
    skill: "忍耐蓄力：越安靜，代表技能條可能越滿。",
    passive: "不愛抱怨，但會默默記住誰越線。",
    weakness: "太常忍到最後，讓別人以為你沒有底線。",
    love: "需要尊重你空間的人。你不是難懂，只是不想一直解釋自己。",
    social: "朋友知道你話不多，但真的出事你會站出來。",
    work: "適合處理危機、執行、技術、管理邊界。討厭無效社交。",
    boss: "隱藏 Boss 是『算了』。你每算了一次，爆擊值就上升。",
    quest: "本週任務：在爆炸前，先講一次你的底線。",
    summary: "你的沉默不是沒脾氣，是還沒拔劍。"
  },
  {
    id: "cold-warm-guardian", name: "外冷內熱守護者", rarity: "SR", emoji: "🛡️", accent: "#7bdcff",
    vector: { cool: 3, warm: 2, support: 3, solo: 1 },
    line: "你不一定溫柔地說，但會很實際地做。",
    traits: ["可靠", "慢熱", "實際派"],
    skill: "現實支援：比起安慰，你更擅長直接幫忙解決。",
    passive: "熟了才會解鎖柔軟版本，陌生人只看得到防護殼。",
    weakness: "不擅長表達需求，常常照顧別人到忘記自己。",
    love: "你的愛很實際，會用行動代替甜言蜜語。",
    social: "你是朋友群的安全屋，話不多但讓人安心。",
    work: "適合穩定、責任感高、需要細心的任務。你討厭空話。",
    boss: "隱藏 Boss 是『反正我自己來』。你可以不用每次都自己扛。",
    quest: "本週任務：接受一次別人的幫忙，不要馬上拒絕。",
    summary: "你不是不浪漫，你只是把浪漫做成了行動。"
  },
  {
    id: "self-doubt-summoner", name: "自我懷疑召喚師", rarity: "R", emoji: "👾", accent: "#9aa4ff",
    vector: { overthink: 4, avoid: 2, solo: 2, warm: 1 },
    line: "還沒開始，腦中已經召喚三隻失敗怪。",
    traits: ["內耗", "謹慎", "怕失敗"],
    skill: "風險預知：你能先看到很多問題，雖然有時候太多。",
    passive: "每次想前進，腦袋會先跳出『你確定嗎』。",
    weakness: "把準備不足誤認成自己不夠好。",
    love: "很容易在關係裡反覆確認自己有沒有被喜歡。",
    social: "你比自己想像中更被在意，只是你常常不相信。",
    work: "適合需要檢查、規劃、風險控管的事。不要讓謹慎變成停滯。",
    boss: "隱藏 Boss 是『我是不是不適合』。它最會在你要開始時出現。",
    quest: "本週任務：做一件沒有百分百把握的小事。",
    summary: "你不是不行，你只是太會懷疑自己。"
  },
  {
    id: "party-healer", name: "朋友群補血師", rarity: "SR", emoji: "🩹", accent: "#7fffd0",
    vector: { support: 5, warm: 3, social: 1, overthink: 1 },
    line: "大家都找你充電，但你自己也需要補包。",
    traits: ["療癒", "可靠", "心很軟"],
    skill: "情緒急救：朋友一崩，你會自動進入客服模式。",
    passive: "容易記得別人的小事，然後默默照顧。",
    weakness: "太怕讓人失望，所以常常答應太多。",
    love: "戀愛裡你很願意付出，但要小心變成單方面照顧。",
    social: "你是朋友群裡的補血點，大家靠近你會比較安心。",
    work: "適合服務、教育、照顧、社群經營、客戶關係。需要學會拒絕。",
    boss: "隱藏 Boss 是『我不想麻煩別人』。但你也可以被照顧。",
    quest: "本週任務：拒絕一件你其實不想做的事。",
    summary: "你很會照顧世界，也要記得把自己放進世界。"
  },
  {
    id: "vanish-ninja", name: "突然消失忍者", rarity: "R", emoji: "🥷", accent: "#7f8cff",
    vector: { solo: 4, avoid: 3, cool: 2, chaos: 1 },
    line: "上一秒還在，下一秒進入潛行模式。",
    traits: ["低電量", "自由", "神出鬼沒"],
    skill: "社交煙霧彈：壓力一大，整個人會從聊天列表消失。",
    passive: "需要大量獨處來恢復人類模式。",
    weakness: "消失太久，會讓在乎你的人以為自己做錯事。",
    love: "你需要能給空間的人，但也要練習留下簡短訊號。",
    social: "朋友知道你不是不見，只是在別的地圖刷怪。",
    work: "適合獨立任務、遠端作業、創作和研究。過多即時溝通會讓你扣血。",
    boss: "隱藏 Boss 是『我先躲一下』。躲可以，但不要躲到任務失敗。",
    quest: "本週任務：消失前留一句話，不要直接人間蒸發。",
    summary: "你不是冷漠，你只是需要自己的洞穴。"
  },
  {
    id: "overtime-warrior", name: "爆肝任務戰士", rarity: "SR", emoji: "⚒️", accent: "#ffb86b",
    vector: { warrior: 3, ambition: 3, support: 1, overthink: 1 },
    line: "嘴上說快死了，身體還在繼續解任務。",
    traits: ["能扛", "硬撐", "責任感"],
    skill: "硬撐衝刺：別人停下來時，你還能多撐一段。",
    passive: "越重要的事越不敢擺爛，常常把自己當工具人。",
    weakness: "把累當成努力的證明，忘記效率也需要休息。",
    love: "你會想為對方付出很多，但需要有人提醒你不是只靠付出換愛。",
    social: "朋友覺得你很可靠，但也常擔心你哪天突然燒壞。",
    work: "適合執行、專案、創業、服務業、考試準備。要小心過勞。",
    boss: "隱藏 Boss 是『再撐一下』。它聽起來勵志，其實很危險。",
    quest: "本週任務：安排一次真正的休息，不能邊休息邊焦慮。",
    summary: "你很能扛，但人生不是耐久度測試。"
  },
  {
    id: "love-ghost", name: "想愛不敢愛幽靈", rarity: "SSR", emoji: "👻", accent: "#d8c6ff",
    vector: { romance: 3, avoid: 3, solo: 2, overthink: 3 },
    line: "心動是真的，裝作路過也是真的。",
    traits: ["暗戀系", "怕尷尬", "觀察者"],
    skill: "無聲靠近：會默默注意對方所有小細節。",
    passive: "只要氣氛太明顯，就會自動透明化。",
    weakness: "怕被拒絕，所以常常把機會讓給空氣。",
    love: "你需要降低一次成功的壓力，先從自然互動開始。",
    social: "熟人知道你其實很有感情，只是不太會說出口。",
    work: "適合細膩、觀察、內容、設計、資料整理類任務。",
    boss: "隱藏 Boss 是『算了不要打擾他』。但你也可能只是錯過。",
    quest: "本週任務：給喜歡的人一個明確但不沉重的訊號。",
    summary: "你不是沒有勇氣，你只是太怕喜歡被看見。"
  },
  {
    id: "quiet-ambition", name: "低調野心家", rarity: "SSR", emoji: "👑", accent: "#ffcf5a",
    vector: { ambition: 5, cool: 2, solo: 1, warrior: 2 },
    line: "看起來很淡，其實心裡有一座王國要蓋。",
    traits: ["有野心", "低調", "想翻身"],
    skill: "暗中升級：不一定會講，但你會偷偷準備下一步。",
    passive: "被小看時不一定反駁，但會記在成長清單。",
    weakness: "太想證明自己，偶爾會把人生變成壓力比賽。",
    love: "你欣賞有目標的人，也需要不會拖垮你的人。",
    social: "你不一定愛曝光，但你希望自己的成果被看見。",
    work: "適合創業、銷售、金融、技術累積、個人品牌。你需要明確獎勵感。",
    boss: "隱藏 Boss 是『我一定要比現在更好』。它能推你，也能壓垮你。",
    quest: "本週任務：設定一個能在 48 小時內完成的升級目標。",
    summary: "你不是佛系，你只是還沒亮出野心。"
  },
  {
    id: "passive-social-cat", name: "被動社交貓", rarity: "R", emoji: "🐈", accent: "#ffd18f",
    vector: { solo: 3, warm: 2, avoid: 2, social: 1 },
    line: "你不是不想靠近，只是希望別人先伸手。",
    traits: ["慢熟", "被動", "可愛但防備"],
    skill: "安全距離：可以親近，但要循序漸進。",
    passive: "只要對方穩定出現，你就會慢慢解除警戒。",
    weakness: "太等別人主動，容易讓關係停在門口。",
    love: "你需要溫和又明確的人，但自己也要偶爾伸爪子。",
    social: "熟了之後其實很好相處，還有一點黏人。",
    work: "適合穩定環境、少消耗社交、能逐步熟悉的任務。",
    boss: "隱藏 Boss 是『他不找我我就不找他』。這招容易雙方都消失。",
    quest: "本週任務：主動約一次熟人，不要只等邀請。",
    summary: "你不是難搞，你只是需要一點安全感。"
  },
  {
    id: "trash-talk-strategist", name: "嘴砲型軍師", rarity: "SR", emoji: "🧠", accent: "#62e4ff",
    vector: { social: 2, cool: 2, creative: 2, support: 2 },
    line: "嘴上很壞，建議很準，朋友戀愛都該先問你。",
    traits: ["很會講", "分析派", "有梗"],
    skill: "吐槽診斷：用一句很欠的話點出問題核心。",
    passive: "越熟越敢講真話，但通常是為對方好。",
    weakness: "有時候太習慣用幽默包裝關心，溫柔會被誤會成嘴。",
    love: "你喜歡能跟你互嘴的人，但也需要練習認真表達喜歡。",
    social: "你是朋友群的即時評論員，清醒又好笑。",
    work: "適合企劃、行銷、顧問、社群、銷售、談判。你需要舞台感。",
    boss: "隱藏 Boss 是『我只是開玩笑』。有時候那句其實是真心。",
    quest: "本週任務：對一個人講一句不包裝的稱讚。",
    summary: "你的嘴很快，但你的心其實沒有那麼壞。"
  },
  {
    id: "glass-tank", name: "玻璃心坦克", rarity: "SR", emoji: "🛡️", accent: "#ff8fb3",
    vector: { warrior: 2, support: 2, overthink: 4, warm: 2 },
    line: "可以幫大家扛傷害，但自己被一句話爆擊。",
    traits: ["能扛", "敏感", "保護型"],
    skill: "隊友護盾：看到身邊的人受傷，你會第一個站出來。",
    passive: "外表看起來很能撐，內心其實有傷害數字飄過。",
    weakness: "太在意評價，容易把小事放大成自我否定。",
    love: "你需要真誠、穩定、會好好說話的人。冷暴力會讓你直接破防。",
    social: "朋友覺得你很可靠，但你也會偷偷因為一句話難過。",
    work: "適合需要責任感和同理心的工作，但要建立心理邊界。",
    boss: "隱藏 Boss 是『他是不是在討厭我』。不一定，可能他只是餓了。",
    quest: "本週任務：不要把別人的語氣自動翻譯成討厭。",
    summary: "你很勇敢，但你的心也需要防具。"
  },
  {
    id: "hidden-boss", name: "隱藏版人生 Boss", rarity: "UR", emoji: "🐉", accent: "#ff5252",
    vector: { ambition: 3, warrior: 3, chaos: 2, cool: 2, creative: 2 },
    line: "平常像路人，真的認真起來會讓全場升難度。",
    traits: ["反差", "爆發", "潛力怪物"],
    skill: "二階段覺醒：被逼到某個程度後，能力值突然不合理。",
    passive: "越被低估，越容易觸發隱藏劇情。",
    weakness: "不穩定。你強是真的，容易亂也是真的。",
    love: "你吸引到的人通常會被你的反差打中，但穩定度是你的修練題。",
    social: "朋友有時覺得你怪，但也知道你不是普通人。",
    work: "適合創業、創作、競爭型任務、需要破局的地方。不要把人生都靠爆發。",
    boss: "隱藏 Boss 是你自己。你最大的敵人不是別人，是失控的節奏。",
    quest: "本週任務：把一個混亂想法整理成可執行的第一步。",
    summary: "你不是 NPC，你只是還沒進入第二階段。"
  }
];

const demoRoleIds = ["warm-assassin", "love-runaway-mage", "social-battery-hunter", "restart-hero"];
const state = {
  current: 0,
  answers: new Array(questions.length).fill(null),
  currentRole: null,
  currentScore: null
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  demoCards: $("#demoCards"),
  progressText: $("#progressText"),
  progressMood: $("#progressMood"),
  progressBar: $("#progressBar"),
  questionTitle: $("#questionTitle"),
  questionHint: $("#questionHint"),
  optionsGrid: $("#optionsGrid"),
  prevBtn: $("#prevBtn"),
  resetBtn: $("#resetBtn"),
  resultSection: $("#resultSection"),
  resultCard: $("#resultCard"),
  shareCopy: $("#shareCopy"),
  toast: $("#toast"),
  savedDrawer: $("#savedDrawer"),
  savedList: $("#savedList")
};

function init() {
  renderDemoCards();
  renderQuestion();
  bindEvents();
  restoreSession();
}

function renderDemoCards() {
  elements.demoCards.innerHTML = demoRoleIds.map(id => {
    const role = roles.find(item => item.id === id);
    return `
      <article class="demo-card" style="--accent: ${role.accent}">
        <span class="rarity-pill">${role.rarity}</span>
        <div class="demo-emoji">${role.emoji}</div>
        <h3>${role.name}</h3>
        <p>${role.line}</p>
      </article>
    `;
  }).join("");
}

function bindEvents() {
  elements.prevBtn.addEventListener("click", goPrev);
  elements.resetBtn.addEventListener("click", resetQuiz);
  $("#againBtn").addEventListener("click", resetQuiz);
  $("#downloadBtn").addEventListener("click", downloadCard);
  $("#shareBtn").addEventListener("click", copyShareText);
  $("#saveBtn").addEventListener("click", saveCurrentCard);
  $("#waitlistBtn").addEventListener("click", () => {
    const text = "我想解鎖人生副本完整角色報告，等開放時通知我。";
    navigator.clipboard?.writeText(text);
    showToast("已複製等待名單文字，可以拿去發文或貼表單測試付費意願");
  });
  $("#openSavedBtn").addEventListener("click", openSavedDrawer);
  $("#closeSavedBtn").addEventListener("click", closeSavedDrawer);
  $("#drawerBackdrop").addEventListener("click", closeSavedDrawer);
}

function restoreSession() {
  try {
    const saved = JSON.parse(localStorage.getItem("lifeQuestSession") || "null");
    if (!saved) return;
    if (Array.isArray(saved.answers) && typeof saved.current === "number") {
      state.answers = saved.answers;
      state.current = Math.min(saved.current, questions.length - 1);
      renderQuestion();
    }
  } catch (error) {
    console.warn("restore failed", error);
  }
}

function persistSession() {
  localStorage.setItem("lifeQuestSession", JSON.stringify({ current: state.current, answers: state.answers }));
}

function renderQuestion() {
  const question = questions[state.current];
  const number = state.current + 1;
  const percent = (state.current / questions.length) * 100;
  elements.progressText.textContent = `第 ${number} / ${questions.length} 題`;
  elements.progressMood.textContent = getProgressMood(number);
  elements.progressBar.style.width = `${percent}%`;
  elements.questionTitle.textContent = question.title;
  elements.questionHint.textContent = question.hint;
  elements.prevBtn.disabled = state.current === 0;
  elements.prevBtn.style.opacity = state.current === 0 ? ".45" : "1";

  elements.optionsGrid.innerHTML = question.options.map((option, index) => {
    const selected = state.answers[state.current] === index ? "selected" : "";
    return `
      <button class="option-btn ${selected}" type="button" data-index="${index}">
        <span class="option-icon">${option.icon}</span>
        <span class="option-copy"><strong>${option.title}</strong><span>${option.desc}</span></span>
        <span class="option-arrow">→</span>
      </button>
    `;
  }).join("");

  $$(".option-btn").forEach(button => {
    button.addEventListener("click", () => selectOption(Number(button.dataset.index)));
  });
}

function getProgressMood(number) {
  if (number <= 3) return "新手村入口";
  if (number <= 6) return "角色成形中";
  if (number <= 9) return "技能讀取中";
  if (number <= 11) return "準備結算";
  return "最後選擇";
}

function selectOption(index) {
  state.answers[state.current] = index;
  persistSession();
  renderQuestion();

  setTimeout(() => {
    if (state.current < questions.length - 1) {
      state.current += 1;
      persistSession();
      renderQuestion();
    } else {
      elements.progressBar.style.width = "100%";
      generateResult();
    }
  }, 180);
}

function goPrev() {
  if (state.current === 0) return;
  state.current -= 1;
  persistSession();
  renderQuestion();
}

function resetQuiz() {
  state.current = 0;
  state.answers = new Array(questions.length).fill(null);
  state.currentRole = null;
  state.currentScore = null;
  persistSession();
  elements.resultSection.classList.add("hidden");
  renderQuestion();
  document.querySelector("#quiz").scrollIntoView({ behavior: "smooth", block: "start" });
}

function calculateScore() {
  const score = Object.fromEntries(axes.map(axis => [axis, 0]));
  state.answers.forEach((answerIndex, questionIndex) => {
    const option = questions[questionIndex].options[answerIndex];
    if (!option) return;
    Object.entries(option.score).forEach(([axis, value]) => {
      score[axis] = (score[axis] || 0) + value;
    });
  });
  return score;
}

function roleMatch(role, score) {
  let dot = 0;
  let vectorTotal = 0;
  Object.entries(role.vector).forEach(([axis, weight]) => {
    dot += (score[axis] || 0) * weight;
    vectorTotal += weight;
  });
  const rarityBoost = { R: 0, SR: 1.5, SSR: 2.6, UR: 3.2 }[role.rarity] || 0;
  return dot / Math.max(vectorTotal, 1) + rarityBoost;
}

function generateResult() {
  if (state.answers.some(answer => answer === null)) {
    showToast("還有題目沒答完");
    return;
  }
  const score = calculateScore();
  const ranked = roles
    .map(role => ({ role, match: roleMatch(role, score) }))
    .sort((a, b) => b.match - a.match);
  const role = ranked[0].role;
  state.currentRole = role;
  state.currentScore = score;
  localStorage.setItem("lifeQuestLastResult", JSON.stringify({ roleId: role.id, score, createdAt: new Date().toISOString() }));
  renderResult(role, score);
  elements.resultSection.classList.remove("hidden");
  setTimeout(() => elements.resultSection.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

function renderResult(role, score) {
  document.documentElement.style.setProperty("--dynamic-accent", role.accent);
  $("#resultCard").style.background = `linear-gradient(135deg, ${role.accent}, rgba(255,207,90,.65), rgba(98,228,255,.45)), rgba(255,255,255,.12)`;
  $("#resultRarity").textContent = role.rarity;
  $("#resultCode").textContent = `#${String(roles.indexOf(role) + 1).padStart(3, "0")}`;
  $("#resultEmoji").textContent = role.emoji;
  $("#resultName").textContent = role.name;
  $("#resultLine").textContent = role.line;
  $("#traitRow").innerHTML = role.traits.map(trait => `<span>${trait}</span>`).join("");
  $("#resultSkill").textContent = role.skill;
  $("#resultPassive").textContent = role.passive;
  $("#resultWeakness").textContent = role.weakness;
  $("#resultQuest").textContent = role.quest;
  $("#resultSummary").textContent = role.summary;
  $("#detailLove").textContent = role.love;
  $("#detailSocial").textContent = role.social;
  $("#detailWork").textContent = role.work;
  $("#detailBoss").textContent = role.boss;
  elements.shareCopy.textContent = "按「複製 Threads 分享文」會產生可直接貼上的文案。";
}

function getShareText(role = state.currentRole) {
  if (!role) return "";
  return `我剛剛在「人生副本」抽到：${role.name}｜${role.rarity}\n\n${role.line}\n\n主技能：${role.skill}\n致命弱點：${role.weakness}\n本週任務：${role.quest}\n\n這張真的有像我嗎？`;
}

async function copyShareText() {
  if (!state.currentRole) return;
  const text = getShareText();
  try {
    await navigator.clipboard.writeText(text);
    elements.shareCopy.textContent = text;
    showToast("已複製分享文，可以直接貼到 Threads");
  } catch (error) {
    elements.shareCopy.textContent = text;
    showToast("複製失敗，但文案已顯示在下方");
  }
}

function saveCurrentCard() {
  if (!state.currentRole) return;
  const saved = getSavedCards();
  const exists = saved.some(item => item.id === state.currentRole.id);
  if (!exists) {
    saved.unshift({ id: state.currentRole.id, createdAt: new Date().toISOString() });
    localStorage.setItem("lifeQuestSavedCards", JSON.stringify(saved.slice(0, 12)));
  }
  showToast(exists ? "這張已經收藏過了" : "已收藏這張角色卡");
}

function getSavedCards() {
  try { return JSON.parse(localStorage.getItem("lifeQuestSavedCards") || "[]"); }
  catch { return []; }
}

function openSavedDrawer() {
  renderSavedList();
  elements.savedDrawer.classList.add("open");
  elements.savedDrawer.setAttribute("aria-hidden", "false");
}

function closeSavedDrawer() {
  elements.savedDrawer.classList.remove("open");
  elements.savedDrawer.setAttribute("aria-hidden", "true");
}

function renderSavedList() {
  const saved = getSavedCards();
  if (!saved.length) {
    elements.savedList.innerHTML = `<div class="saved-item"><strong>還沒有收藏</strong><p>抽到喜歡的角色卡後，可以按收藏保存。</p></div>`;
    return;
  }
  elements.savedList.innerHTML = saved.map(item => {
    const role = roles.find(roleItem => roleItem.id === item.id);
    if (!role) return "";
    return `<div class="saved-item"><strong>${role.emoji} ${role.name}｜${role.rarity}</strong><p>${role.line}</p></div>`;
  }).join("");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => elements.toast.classList.remove("show"), 2400);
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 99) {
  const chars = Array.from(text);
  let line = "";
  let lines = [];
  chars.forEach(char => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines);
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1) + "…";
  }
  lines.forEach((item, index) => ctx.fillText(item, x, y + index * lineHeight));
  return y + lines.length * lineHeight;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

async function downloadCard() {
  if (!state.currentRole) return;
  const role = state.currentRole;
  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = 900 * scale;
  canvas.height = 1300 * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  const accent = hexToRgb(role.accent);
  const bg = ctx.createLinearGradient(0, 0, 900, 1300);
  bg.addColorStop(0, role.accent);
  bg.addColorStop(0.45, "#ffcf5a");
  bg.addColorStop(1, "#62e4ff");
  ctx.fillStyle = bg;
  roundRect(ctx, 30, 30, 840, 1240, 56);
  ctx.fill();

  ctx.fillStyle = "rgba(14, 13, 20, 0.94)";
  roundRect(ctx, 58, 58, 784, 1184, 44);
  ctx.fill();

  const glow = ctx.createRadialGradient(450, 190, 20, 450, 190, 360);
  glow.addColorStop(0, `rgba(${accent.r}, ${accent.g}, ${accent.b}, .32)`);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(60, 60, 780, 480);

  ctx.fillStyle = "#171018";
  roundRect(ctx, 86, 92, 112, 48, 24);
  ctx.fill();
  ctx.fillStyle = "#ffcf5a";
  ctx.font = "900 24px 'Noto Sans TC', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(role.rarity, 142, 124);

  ctx.fillStyle = "rgba(255,255,255,.64)";
  ctx.font = "700 24px 'Noto Sans TC', sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("人生副本", 800, 125);

  const artGradient = ctx.createLinearGradient(300, 180, 600, 470);
  artGradient.addColorStop(0, "#ffffff");
  artGradient.addColorStop(0.2, "#ffcf5a");
  artGradient.addColorStop(1, role.accent);
  ctx.fillStyle = artGradient;
  roundRect(ctx, 310, 176, 280, 280, 58);
  ctx.fill();
  ctx.font = "150px serif";
  ctx.textAlign = "center";
  ctx.fillText(role.emoji, 450, 365);

  ctx.fillStyle = "#fff8ff";
  ctx.font = "900 54px 'Noto Sans TC', sans-serif";
  ctx.textAlign = "center";
  drawWrappedText(ctx, role.name, 450, 535, 700, 68, 2);

  ctx.fillStyle = "#d9d0e6";
  ctx.font = "500 28px 'Noto Sans TC', sans-serif";
  drawWrappedText(ctx, role.line, 450, 660, 680, 42, 2);

  let tagX = 450 - ((role.traits.length * 150) / 2);
  role.traits.forEach((trait, index) => {
    const x = tagX + index * 150;
    ctx.fillStyle = "#ffcf5a";
    roundRect(ctx, x, 735, 132, 42, 21);
    ctx.fill();
    ctx.fillStyle = "#171018";
    ctx.font = "900 20px 'Noto Sans TC', sans-serif";
    ctx.fillText(trait, x + 66, 763);
  });

  const abilityY = 825;
  const abilities = [
    ["主技能", role.skill],
    ["被動技能", role.passive],
    ["致命弱點", role.weakness],
    ["本週任務", role.quest]
  ];
  let y = abilityY;
  abilities.forEach(([label, value]) => {
    ctx.fillStyle = "rgba(255,255,255,.075)";
    roundRect(ctx, 105, y, 690, 90, 24);
    ctx.fill();
    ctx.textAlign = "left";
    ctx.fillStyle = "#ffcf5a";
    ctx.font = "900 18px 'Noto Sans TC', sans-serif";
    ctx.fillText(label, 130, y + 30);
    ctx.fillStyle = "#f5efff";
    ctx.font = "500 22px 'Noto Sans TC', sans-serif";
    drawWrappedText(ctx, value, 130, y + 62, 640, 30, 1);
    y += 105;
  });

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,.64)";
  ctx.font = "500 22px 'Noto Sans TC', sans-serif";
  drawWrappedText(ctx, role.summary, 450, 1220, 680, 32, 1);

  const link = document.createElement("a");
  const safeName = role.name.replace(/[\\/:*?"<>|]/g, "");
  link.download = `人生副本_${safeName}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("角色卡 PNG 已產生");
}

init();
