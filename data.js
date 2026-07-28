// ============================================================
// 全局常量 — 供筛选面板使用
// ============================================================

const ALLERGENS = ["牛奶", "鸡蛋", "花生", "坚果", "大豆", "小麦", "鱼类", "贝类"];
const TASTES = ["麻辣", "鲜香", "清淡", "酸甜", "咸香", "甜", "酸辣", "五香", "蒜香", "酱香", "酒香", "茶香", "清香"];
const MEAL_TIMES = [
  { key: "breakfast", label: "早餐", emoji: "🌅" },
  { key: "lunch",     label: "午饭", emoji: "☀️" },
  { key: "dinner",    label: "晚饭", emoji: "🌙" },
  { key: "late-night",label: "夜宵", emoji: "🦉" },
];
const DIFFICULTIES = ["easy", "medium", "hard"];
const DIFFICULTY_LABELS = { easy: "简单", medium: "中等", hard: "困难" };
const SITUATIONS = ["一人食", "二人世界", "家庭用餐", "朋友聚会"];
const DIETARY_TYPES = ["无限制", "素食", "纯素", "清真", "低碳水", "高蛋白"];

const CUISINE_META = {
  "川菜": { emoji: "🌶️", gradient: "linear-gradient(135deg,#ff6b6b,#ee5a24)" },
  "粤菜": { emoji: "🥢", gradient: "linear-gradient(135deg,#feca57,#ff9f43)" },
  "鲁菜": { emoji: "🍲", gradient: "linear-gradient(135deg,#c0392b,#e17055)" },
  "闽菜": { emoji: "🌊", gradient: "linear-gradient(135deg,#00b894,#00cec9)" },
  "浙菜": { emoji: "🍃", gradient: "linear-gradient(135deg,#6ab04c,#badc58)" },
  "湘菜": { emoji: "🔥", gradient: "linear-gradient(135deg,#eb4d4b,#e74c3c)" },
  "徽菜": { emoji: "⛰️", gradient: "linear-gradient(135deg,#8d6e63,#a1887f)" },
  "苏菜": { emoji: "🌸", gradient: "linear-gradient(135deg,#fd79a8,#e84393)" },
  "日本料理": { emoji: "🍣", gradient: "linear-gradient(135deg,#f8a5c2,#e84393)" },
  "韩国料理": { emoji: "🥩", gradient: "linear-gradient(135deg,#e74c3c,#3498db)" },
  "意大利菜": { emoji: "🍝", gradient: "linear-gradient(135deg,#27ae60,#e74c3c)" },
  "法国菜": { emoji: "🥐", gradient: "linear-gradient(135deg,#2c3e50,#b8860b)" },
  "泰国菜": { emoji: "🦐", gradient: "linear-gradient(135deg,#f39c12,#2ecc71)" },
  "印度菜": { emoji: "🍛", gradient: "linear-gradient(135deg,#e67e22,#e74c3c)" },
  "墨西哥菜": { emoji: "🌮", gradient: "linear-gradient(135deg,#27ae60,#e67e22)" },
  "越南菜": { emoji: "🍲", gradient: "linear-gradient(135deg,#00b894,#6ab04c)" },
  "地中海菜": { emoji: "🫒", gradient: "linear-gradient(135deg,#3498db,#f39c12)" },
  "美式菜": { emoji: "🍔", gradient: "linear-gradient(135deg,#e74c3c,#3498db)" },
};

const CATEGORIES = Object.keys(CUISINE_META);

// ============================================================
// 食谱数据 — 72道菜，18大菜系
// ============================================================

const RECIPES = [

  // ===== 川菜 =====
  {
    id: "chuan-mapo-tofu",
    name: "麻婆豆腐",
    cuisine: "川菜",
    emoji: "🌶️",
    intro: "麻、辣、鲜、香俱全的经典川菜，豆腐嫩滑，肉末香浓。",
    image: "images/chuan-mapo-tofu.svg",    featured: true,
    allergens: ["大豆"], calories: 320, mealTime: ["lunch","dinner"], taste: ["麻辣","鲜香"], difficulty: "easy", prepTime: 10, cookTime: 10, servings: 2,
    ingredients: ["嫩豆腐 400g", "牛肉末 100g", "郫县豆瓣酱 2勺", "花椒粉 1勺", "蒜末 1勺", "姜末 1勺", "葱花 适量", "水淀粉 适量"],
    steps: [
      "豆腐切小块，放入淡盐水中焯烫1分钟去豆腥味，捞出沥干。",
      "热油爆香蒜末、姜末，下牛肉末炒至变色。",
      "加入郫县豆瓣酱炒出红油，倒入适量清水烧开。",
      "下豆腐块，轻轻推匀，中小火焖煮3分钟入味。",
      "淋入水淀粉勾芡，撒花椒粉、葱花出锅。",
    ],
  },

  {
    id: "chuan-kungpao-chicken", name: "宫保鸡丁", cuisine: "川菜", emoji: "🍗",
    intro: "鸡丁滑嫩、花生香脆，酸甜微辣，老少皆宜的国民川菜。",
    image: "images/chuan-kungpao-chicken.svg",    featured: false,
    allergens: ["花生","大豆","小麦"], calories: 380, mealTime: ["lunch","dinner"],
    taste: ["酸甜","麻辣"], difficulty: "easy", prepTime: 20, cookTime: 10, servings: 2,
    ingredients: ["鸡胸肉 300g","油炸花生米 80g","干辣椒 10个","花椒 1勺","葱段 适量","蒜片 适量","生抽 2勺","香醋 1勺","白糖 1勺"],
    steps: ["鸡胸肉切丁，用料酒、生抽、淀粉腌制15分钟。","调宫保汁：生抽、香醋、白糖、淀粉、清水混合备用。","热油滑炒鸡丁至变色盛出。","锅中爆香干辣椒、花椒，下葱蒜炒香，倒入鸡丁快速翻炒。","倒入宫保汁炒至浓稠，最后拌入花生米即可。"],
  },

  {
    id: "chuan-boiled-fish",
    name: "水煮鱼",
    cuisine: "川菜",
    emoji: "🐟",
    intro: "麻辣鲜香、鱼片滑嫩，红油浇头香气扑鼻的重庆经典菜。",
    image: "images/chuan-boiled-fish.svg",    featured: false,
    allergens: ["鱼类","大豆","鸡蛋"], calories: 450, mealTime: ["lunch","dinner"], taste: ["麻辣","鲜香"], difficulty: "medium", prepTime: 25, cookTime: 15, servings: 3,
    ingredients: ["草鱼 1条", "豆芽 200g", "干辣椒 20g", "花椒 1勺", "郫县豆瓣酱 2勺", "蒜末 适量", "姜片 适量", "鸡蛋清 1个"],
    steps: [
      "鱼肉片成薄片，用蛋清、淀粉、盐抓匀腌制。",
      "豆芽垫底铺入大碗中焯熟备用。",
      "锅中爆香豆瓣酱、姜蒜，加水烧开煮出红汤。",
      "下鱼骨煮5分钟后捞出放在豆芽上，再下鱼片滑煮至变色。",
      "将鱼片连汤倒入碗中，表面撒干辣椒花椒，浇热油激香。",
    ],
  },

  {
    id: "chuan-twice-cooked-pork", name: "回锅肉", cuisine: "川菜", emoji: "🥓",
    intro: "肥而不腻、酱香浓郁，四川家常菜的灵魂之作。",
    image: "images/chuan-twice-cooked-pork.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 520, mealTime: ["lunch","dinner"],
    taste: ["酱香","咸香"], difficulty: "easy", prepTime: 10, cookTime: 15, servings: 2,
    ingredients: ["五花肉 400g","青蒜苗 100g","郫县豆瓣酱 2勺","甜面酱 1勺","姜片 适量","蒜片 适量","料酒 适量"],
    steps: ["五花肉冷水下锅，加姜片料酒煮至八分熟，捞出晾凉切薄片。","热锅冷油下肉片，煸炒至微微卷曲出油。","加入豆瓣酱、甜面酱炒出红油和香气。","下姜蒜片炒香，倒入蒜苗段翻炒。","蒜苗断生即可出锅装盘。"],
  },

  // ===== 粤菜 =====
  {
    id: "yue-white-cut-chicken",
    name: "白切鸡",
    cuisine: "粤菜",
    emoji: "🍗",
    intro: "皮爽肉滑，原汁原味，蘸姜葱料吃出鸡肉本味的粤菜代表。",
    image: "images/yue-white-cut-chicken.svg",    featured: true,
    allergens: [], calories: 280, mealTime: ["lunch","dinner"], taste: ["清淡","鲜香"], difficulty: "medium", prepTime: 15, cookTime: 25, servings: 4,
    ingredients: ["三黄鸡 1只", "姜 30g", "葱 30g", "盐 适量", "料酒 适量", "花生油 2勺"],
    steps: [
      "整鸡处理干净，加姜葱、料酒煮水去腥。",
      "水烧开后放入整鸡，转小火浸煮20分钟不揭盖。",
      "捞出鸡后立刻放入冰水中浸泡，使皮脆肉紧。",
      "姜葱剁碎，加盐、热油制成姜葱蘸料。",
      "鸡斩件装盘，配姜葱料食用。",
    ],
  },

  {
    id: "yue-char-siu", name: "蜜汁叉烧", cuisine: "粤菜", emoji: "🍖",
    intro: "甜咸交织、色泽红亮，港式茶餐厅经典烤肉。",
    image: "images/yue-char-siu.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 420, mealTime: ["lunch","dinner"],
    taste: ["甜","咸香"], difficulty: "medium", prepTime: 480, cookTime: 30, servings: 3,
    ingredients: ["猪梅花肉 500g","叉烧酱 3勺","蜂蜜 2勺","生抽 1勺","料酒 1勺","蒜末 适量"],
    steps: ["梅花肉切长条，用叉烧酱、生抽、料酒、蒜末腌制过夜。","烤箱预热200度，肉条放烤架上先烤15分钟。","取出刷一层蜂蜜水，翻面再烤15分钟。","两面各刷两次蜜汁，烤至表面焦香上色。","取出静置5分钟后切片装盘。"],
  },

  {
    id: "yue-steamed-ribs",
    name: "豉汁蒸排骨",
    cuisine: "粤菜",
    emoji: "🍖",
    intro: "豉香浓郁、排骨鲜嫩多汁，清蒸也能做出满满风味。",
    image: "images/yue-steamed-ribs.svg",    featured: false,
    allergens: ["大豆"], calories: 350, mealTime: ["lunch","dinner"], taste: ["蒜香","咸香"], difficulty: "easy", prepTime: 30, cookTime: 12, servings: 2,
    ingredients: ["肋排 400g", "豆豉 2勺", "蒜末 适量", "姜末 适量", "生抽 1勺", "淀粉 1勺", "小米辣 适量"],
    steps: [
      "排骨斩小段，清水浸泡去血水后沥干。",
      "豆豉剁碎，与蒜末、姜末、生抽、淀粉拌入排骨腌制20分钟。",
      "排骨摆盘，撒少许小米辣圈。",
      "水开后大火蒸12分钟。",
      "出锅撒葱花，淋少许热油即可。",
    ],
  },

  {
    id: "yue-chang-fen", name: "广式肠粉", cuisine: "粤菜", emoji: "🥟",
    intro: "米浆薄滑透亮，搭配鲜甜豉油，早茶必点小食。",
    image: "images/yue-chang-fen.svg",    featured: false,
    allergens: ["大豆","鸡蛋","小麦"], calories: 220, mealTime: ["breakfast","late-night"],
    taste: ["清淡","鲜香"], difficulty: "medium", prepTime: 30, cookTime: 10, servings: 2,
    ingredients: ["粘米粉 100g","澄面 20g","生粉 10g","清水 300ml","鸡蛋 2个","生抽 2勺","葱花 适量"],
    steps: ["粘米粉、澄面、生粉加水调成米浆，静置20分钟。","蒸盘刷油，倒入薄薄一层米浆，大火蒸2分钟。","打入鸡蛋液，继续蒸至凝固。","用刮板将肠粉卷起取出。","淋上煮开的豉油汁，撒葱花即可。"],
  },

  // ===== 鲁菜 =====
  {
    id: "lu-jiuzhuan-dachang",
    name: "九转大肠",
    cuisine: "鲁菜",
    emoji: "🍲",
    intro: "酸甜苦辣咸五味调和，色泽红亮，济南名菜之首。",
    image: "images/lu-jiuzhuan-dachang.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 550, mealTime: ["lunch","dinner"], taste: ["酸甜","酱香"], difficulty: "hard", prepTime: 60, cookTime: 40, servings: 3,
    ingredients: ["猪大肠 500g", "白糖 3勺", "香醋 2勺", "生抽 1勺", "桂皮 1块", "八角 2个", "花椒粉 适量", "香菜 适量"],
    steps: [
      "大肠反复清洗翻面去除异味，煮至软烂切段。",
      "热油炸大肠段至表皮微焦捞出。",
      "另起锅下糖炒糖色，加入大肠翻炒上色。",
      "加生抽、香醋、桂皮八角小火烧至入味收汁。",
      "撒花椒粉、香菜出锅。",
    ],
  },

  {
    id: "lu-sweet-sour-carp", name: "糖醋鲤鱼", cuisine: "鲁菜", emoji: "🐟",
    intro: "外酥里嫩，酸甜适口，造型如松鼠跃动的经典鲁菜。",
    image: "images/lu-sweet-sour-carp.svg",    featured: false,
    allergens: ["鱼类","小麦"], calories: 480, mealTime: ["lunch","dinner"],
    taste: ["酸甜","鲜香"], difficulty: "hard", prepTime: 30, cookTime: 20, servings: 4,
    ingredients: ["鲤鱼 1条","番茄酱 2勺","白糖 3勺","香醋 2勺","淀粉 适量","姜末 适量","蒜末 适量"],
    steps: ["鲤鱼两侧打花刀，抹盐料酒腌制，拍匀干淀粉。","热油炸至定型捞出，油温升高复炸至金黄酥脆。","锅留底油炒香姜蒜，加番茄酱、糖、醋、水熬成糖醋汁。","水淀粉勾芡至浓稠光亮。","将糖醋汁均匀浇淋在炸鱼上即可。"],
  },

  {
    id: "lu-braised-sea-cucumber",
    name: "葱烧海参",
    cuisine: "鲁菜",
    emoji: "🦑",
    intro: "海参软糯入味，葱香浓郁，鲁菜宴席中的高档菜品。",
    image: "images/lu-braised-sea-cucumber.svg",    featured: false,
    allergens: ["贝类","大豆","小麦"], calories: 320, mealTime: ["dinner"], taste: ["咸香","蒜香"], difficulty: "hard", prepTime: 240, cookTime: 20, servings: 4,
    ingredients: ["水发海参 4只", "大葱 2根", "蚝油 2勺", "生抽 1勺", "老抽 少许", "料酒 适量", "高汤 200ml"],
    steps: [
      "海参焯水去腥备用。",
      "大葱切段，油炸至金黄捞出制成葱油。",
      "葱油锅中加蚝油、生抽、老抽、料酒和高汤煮开。",
      "放入海参小火煨煮8分钟入味。",
      "水淀粉勾芡，放回炸葱段即可出锅。",
    ],
  },

  {
    id: "lu-dezhou-chicken", name: "德州扒鸡", cuisine: "鲁菜", emoji: "🍗",
    intro: "五香脱骨、皮酥肉烂，山东德州百年传统卤味。",
    image: "images/lu-dezhou-chicken.svg",    featured: false,
    allergens: ["大豆"], calories: 400, mealTime: ["lunch","dinner"],
    taste: ["五香","咸香"], difficulty: "medium", prepTime: 30, cookTime: 120, servings: 4,
    ingredients: ["整鸡 1只","八角 3个","桂皮 1块","香叶 3片","花椒 1勺","老抽 2勺","冰糖 适量"],
    steps: ["整鸡处理干净，造型定型后过油炸至金黄。","锅中放入所有香料、老抽、冰糖，加水调成卤汤。","放入炸好的鸡，大火烧开转小火卤煮1.5小时。","关火后浸泡2小时使其充分入味。","捞出摆盘即可食用，肉质酥烂脱骨。"],
  },

  // ===== 闽菜 =====
  {
    id: "min-buddha-jumps-wall",
    name: "佛跳墙",
    cuisine: "闽菜",
    emoji: "🍲",
    intro: "集山珍海味于一坛，香气浓郁，闽菜中的顶级功夫菜。",
    image: "images/min-buddha-jumps-wall.svg",    featured: true,
    allergens: ["贝类","鱼类","鸡蛋"], calories: 650, mealTime: ["dinner"], taste: ["鲜香","酒香"], difficulty: "hard", prepTime: 720, cookTime: 200, servings: 6,
    ingredients: ["鲍鱼 6只", "花胶 100g", "干贝 50g", "海参 3只", "鸽子蛋 6个", "香菇 6朵", "高汤 500ml", "料酒 适量"],
    steps: [
      "各类食材分别涨发、焯水处理干净。",
      "所有食材按顺序码入坛中，加高汤、料酒。",
      "坛口用荷叶或锡纸密封。",
      "隔水小火慢炖3小时以上使味道融合。",
      "开坛后即可上桌，香气四溢。",
    ],
  },

  {
    id: "min-lychee-pork", name: "荔枝肉", cuisine: "闽菜", emoji: "🍑",
    intro: "外形似荔枝、口感酸甜酥脆，福州经典宴席菜。",
    image: "images/min-lychee-pork.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 380, mealTime: ["lunch","dinner"],
    taste: ["酸甜","鲜香"], difficulty: "medium", prepTime: 30, cookTime: 15, servings: 3,
    ingredients: ["猪里脊 300g","荸荠 6个","番茄酱 2勺","白糖 2勺","香醋 1勺","淀粉 适量"],
    steps: ["里脊肉切花刀改刀成块，裹淀粉。","热油炸至金黄卷曲呈荔枝状捞出。","锅中调番茄酱、糖、醋熬成酸甜汁。","倒入炸好的肉块和荸荠块快速翻炒。","使酱汁均匀裹附即可出锅。"],
  },

  {
    id: "min-drunken-ribs",
    name: "醉排骨",
    cuisine: "闽菜",
    emoji: "🍖",
    intro: "酒香浓郁、外酥里嫩，福建家常宴客菜。",
    image: "images/min-drunken-ribs.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 460, mealTime: ["lunch","dinner"], taste: ["酒香","咸香"], difficulty: "medium", prepTime: 70, cookTime: 15, servings: 3,
    ingredients: ["排骨 400g", "红曲酒 3勺", "生抽 1勺", "白糖 1勺", "淀粉 适量", "五香粉 少许"],
    steps: [
      "排骨切小段，用红曲酒、生抽、糖、五香粉腌制1小时。",
      "腌好的排骨裹上淀粉。",
      "热油炸至表皮金黄酥脆。",
      "复炸一次使口感更酥。",
      "沥油装盘即可趁热食用。",
    ],
  },

  {
    id: "min-shacha-noodles", name: "沙茶面", cuisine: "闽菜", emoji: "🍜",
    intro: "沙茶酱浓香咸鲜，汤头醇厚，厦门街头人气小吃。",
    image: "images/min-shacha-noodles.svg",    featured: false,
    allergens: ["花生","贝类","小麦","大豆"], calories: 380, mealTime: ["breakfast","lunch","late-night"],
    taste: ["咸香","鲜香"], difficulty: "easy", prepTime: 15, cookTime: 10, servings: 1,
    ingredients: ["碱水面 200g","沙茶酱 2勺","虾仁 适量","豆腐泡 适量","猪骨高汤 400ml","葱花 适量"],
    steps: ["猪骨高汤加沙茶酱调成汤底煮开。","虾仁、豆腐泡下锅煮熟。","面条另起水煮熟捞出。","面条放入碗中，浇入沙茶汤底和配料。","撒葱花即可享用。"],
  },

  // ===== 浙菜 =====
  {
    id: "zhe-west-lake-fish",
    name: "西湖醋鱼",
    cuisine: "浙菜",
    emoji: "🐟",
    intro: "鱼肉鲜嫩清淡，糖醋汁酸甜可口，杭州名菜。",
    image: "images/zhe-west-lake-fish.svg",    featured: true,
    allergens: ["鱼类"], calories: 260, mealTime: ["lunch","dinner"], taste: ["酸甜","清淡"], difficulty: "medium", prepTime: 15, cookTime: 15, servings: 2,
    ingredients: ["草鱼 1条", "香醋 3勺", "白糖 2勺", "生抽 1勺", "姜末 适量", "水淀粉 适量"],
    steps: [
      "草鱼去腥处理，改刀后清水浸泡。",
      "水开后放入鱼，小火煮8分钟断生捞出装盘。",
      "锅中加糖、醋、生抽、姜末煮开调成糖醋汁。",
      "水淀粉勾芡至浓稠透亮。",
      "将糖醋汁均匀浇在鱼身上即可。",
    ],
  },

  {
    id: "zhe-dongpo-pork", name: "东坡肉", cuisine: "浙菜", emoji: "🥩",
    intro: "肥而不腻、入口即化，苏东坡传世名菜。",
    image: "images/zhe-dongpo-pork.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 620, mealTime: ["lunch","dinner"],
    taste: ["酱香","甜"], difficulty: "medium", prepTime: 20, cookTime: 130, servings: 4,
    ingredients: ["带皮五花肉 600g","冰糖 3勺","老抽 2勺","料酒 200ml","葱段 适量","姜片 适量"],
    steps: ["五花肉切大块焯水后皮朝下垫葱姜入砂锅。","加冰糖、老抽、料酒，不加水或少量水。","大火烧开转最小火慢炖1.5小时。","翻面皮朝上继续炖30分钟收汁。","肉块装碗蒸10分钟定型，扣盘装碗即可。"],
  },

  {
    id: "zhe-longjing-shrimp",
    name: "龙井虾仁",
    cuisine: "浙菜",
    emoji: "🍤",
    intro: "虾仁洁白鲜嫩，茶香清雅，杭州特色茶宴菜。",
    image: "images/zhe-longjing-shrimp.svg",    featured: false,
    allergens: ["贝类","鸡蛋"], calories: 200, mealTime: ["lunch","dinner"], taste: ["茶香","清淡"], difficulty: "medium", prepTime: 20, cookTime: 5, servings: 2,
    ingredients: ["河虾仁 250g", "龙井茶叶 5g", "蛋清 1个", "淀粉 适量", "料酒 适量"],
    steps: [
      "虾仁用蛋清、淀粉、盐抓匀腌制。",
      "龙井茶叶用开水冲泡，留茶叶和茶汤备用。",
      "热油低温滑炒虾仁至变色盛出。",
      "锅中放入茶叶略炒出香。",
      "倒入虾仁和少许茶汤快速翻炒均匀即可。",
    ],
  },

  {
    id: "zhe-beggars-chicken", name: "叫花鸡", cuisine: "浙菜", emoji: "🍗",
    intro: "荷叶裹泥烤制，鸡肉酥烂原香四溢，江南传统名菜。",
    image: "images/zhe-beggars-chicken.svg",    featured: false,
    allergens: [], calories: 480, mealTime: ["dinner"],
    taste: ["五香","咸香"], difficulty: "hard", prepTime: 60, cookTime: 90, servings: 4,
    ingredients: ["整鸡 1只","荷叶 2张","葱姜 适量","料酒 适量","五香粉 适量","黄泥或锡纸 适量"],
    steps: ["整鸡处理干净，内外抹盐、五香粉、料酒腌制。","鸡腹内塞入葱姜。","用荷叶将整鸡包裹严实。","外层再包裹黄泥或锡纸密封。","入烤箱200度烤制1.5小时后剥开享用。"],
  },

  // ===== 湘菜 =====
  {
    id: "xiang-chopped-pepper-fish-head",
    name: "剁椒鱼头",
    cuisine: "湘菜",
    emoji: "🐟",
    intro: "鱼头肥美、剁椒鲜辣，湖南招牌硬菜。",
    image: "images/xiang-chopped-pepper-fish-head.svg",    featured: true,
    allergens: ["鱼类","大豆"], calories: 350, mealTime: ["lunch","dinner"], taste: ["酸辣","鲜香"], difficulty: "easy", prepTime: 15, cookTime: 15, servings: 2,
    ingredients: ["鱼头 1个", "剁椒 3勺", "蒜末 适量", "姜末 适量", "豆豉 1勺", "葱花 适量"],
    steps: [
      "鱼头对半剖开洗净，抹盐料酒腌制10分钟。",
      "剁椒、蒜末、姜末、豆豉调匀铺在鱼头上。",
      "水开后大火蒸12分钟至熟透。",
      "另起锅烧热油。",
      "取出鱼头淋热油激香，撒葱花即可。",
    ],
  },

  {
    id: "xiang-pepper-fried-pork", name: "辣椒炒肉", cuisine: "湘菜", emoji: "🌶️",
    intro: "简单粗犷、香辣下饭，湖南家常菜的灵魂担当。",
    image: "images/xiang-pepper-fried-pork.svg",    featured: false,
    allergens: ["大豆","小麦"], calories: 420, mealTime: ["lunch","dinner"],
    taste: ["麻辣","咸香"], difficulty: "easy", prepTime: 5, cookTime: 10, servings: 2,
    ingredients: ["五花肉 300g","青尖椒 6个","蒜片 适量","豆豉 1勺","生抽 1勺","料酒 适量"],
    steps: ["五花肉切薄片，青椒切滚刀块。","热锅冷油下肉片煸炒出油至微焦。","加蒜片、豆豉炒香。","倒入青椒块大火快炒至断生。","调入生抽炒匀出锅。"],
  },

  {
    id: "xiang-crayfish",
    name: "口味虾",
    cuisine: "湘菜",
    emoji: "🦐",
    intro: "麻辣鲜香、汤汁浓郁，长沙夜宵摊经典必点。",
    image: "images/xiang-crayfish.svg",    featured: false,
    allergens: ["贝类","大豆"], calories: 380, mealTime: ["dinner","late-night"], taste: ["麻辣","鲜香"], difficulty: "medium", prepTime: 30, cookTime: 20, servings: 3,
    ingredients: ["小龙虾 500g", "干辣椒 20g", "花椒 1勺", "郫县豆瓣酱 2勺", "啤酒 200ml", "姜蒜 适量"],
    steps: [
      "小龙虾刷洗干净，剪去虾枪。",
      "热油爆香姜蒜、干辣椒、花椒。",
      "加豆瓣酱炒出红油，倒入小龙虾翻炒。",
      "加啤酒没过虾身，大火烧开转中火焖10分钟。",
      "收汁至浓稠即可出锅。",
    ],
  },

  {
    id: "xiang-preserved-meat-steam", name: "腊味合蒸", cuisine: "湘菜", emoji: "🍖",
    intro: "多种腊味同蒸，咸香交融，湘菜传统蒸菜代表。",
    image: "images/xiang-preserved-meat-steam.svg",    featured: false,
    allergens: ["大豆"], calories: 500, mealTime: ["lunch","dinner"],
    taste: ["咸香","五香"], difficulty: "easy", prepTime: 20, cookTime: 25, servings: 3,
    ingredients: ["腊肉 150g","腊鱼 150g","腊肠 150g","剁椒 1勺","蒜末 适量","葱花 适量"],
    steps: ["各类腊味用温水泡软洗净，切片摆盘。","撒上剁椒和蒜末。","水开后大火蒸20分钟至软糯入味。","取出后撒葱花。","淋少许热油即可上桌。"],
  },

  // ===== 徽菜 =====
  {
    id: "hui-stinky-mandarin-fish",
    name: "臭鳜鱼",
    cuisine: "徽菜",
    emoji: "🐟",
    intro: "闻着臭吃着香，肉质紧实鲜美，徽州经典腌制名菜。",
    image: "images/hui-stinky-mandarin-fish.svg",    featured: false,
    allergens: ["鱼类","大豆"], calories: 380, mealTime: ["lunch","dinner"], taste: ["咸香","蒜香"], difficulty: "medium", prepTime: 1440, cookTime: 30, servings: 2,
    ingredients: ["腌制鳜鱼 1条", "五花肉丁 50g", "笋丁 50g", "豆瓣酱 1勺", "姜蒜 适量", "料酒 适量"],
    steps: [
      "腌好的鳜鱼冲洗干净，两面煎至微黄。",
      "另起锅炒香肉丁、笋丁、姜蒜。",
      "加豆瓣酱炒出红油，加水烧开。",
      "放入煎好的鱼小火烧15分钟入味。",
      "大火收汁装盘即可。",
    ],
  },

  {
    id: "hui-mao-tofu", name: "毛豆腐", cuisine: "徽菜", emoji: "🧈",
    intro: "表面长绒毛发酵而成，煎后外酥内嫩，徽州特色小吃。",
    image: "images/hui-mao-tofu.svg",    featured: false,
    allergens: ["大豆"], calories: 250, mealTime: ["breakfast","late-night"],
    taste: ["咸香","蒜香"], difficulty: "easy", prepTime: 5, cookTime: 8, servings: 2,
    ingredients: ["毛豆腐 6块","豆瓣酱 1勺","蒜末 适量","小葱 适量","辣椒粉 适量"],
    steps: ["毛豆腐表面轻轻拍去多余绒毛。","平底锅刷油，小火煎至两面金黄结壳。","另调蒜末、豆瓣酱、辣椒粉制成蘸料。","煎好的豆腐盛出装盘。","配蘸料撒葱花食用。"],
  },

  {
    id: "hui-yuanzi",
    name: "徽州圆子",
    cuisine: "徽菜",
    emoji: "🍡",
    intro: "外皮软糯、内馅鲜香，徽州逢年过节必备团圆菜。",
    image: "images/hui-yuanzi.svg",    featured: false,
    allergens: ["小麦","大豆"], calories: 320, mealTime: ["lunch","dinner"], taste: ["咸香","鲜香"], difficulty: "medium", prepTime: 30, cookTime: 15, servings: 3,
    ingredients: ["糯米粉 200g", "猪肉末 150g", "香菇丁 适量", "荸荠丁 适量", "生抽 1勺", "葱姜末 适量"],
    steps: [
      "肉末加香菇丁、荸荠丁、生抽、葱姜末拌匀成馅。",
      "糯米粉加水揉成光滑面团。",
      "取面团包入馅料搓圆。",
      "水开后下锅煮至圆子浮起。",
      "或改用蒸制10分钟，两种做法均可。",
    ],
  },

  {
    id: "hui-braised-fish-tail", name: "红烧划水", cuisine: "徽菜", emoji: "🐟",
    intro: "以草鱼尾为主料，浓油赤酱、鲜嫩入味的徽帮名菜。",
    image: "images/hui-braised-fish-tail.svg",    featured: false,
    allergens: ["鱼类","大豆"], calories: 300, mealTime: ["lunch","dinner"],
    taste: ["酱香","咸香"], difficulty: "medium", prepTime: 10, cookTime: 20, servings: 2,
    ingredients: ["草鱼尾 1条","老抽 1勺","生抽 1勺","冰糖 适量","姜蒜 适量","料酒 适量"],
    steps: ["鱼尾处理干净，两面煎至微黄定型。","加姜蒜爆香，烹入料酒去腥。","加生抽、老抽、冰糖和适量水。","中小火烧10分钟入味。","大火收浓汤汁即可出锅。"],
  },

  // ===== 苏菜 =====
  {
    id: "su-squirrel-fish",
    name: "松鼠桂鱼",
    cuisine: "苏菜",
    emoji: "🐟",
    intro: "造型似松鼠、外酥里嫩，酸甜可口的苏州名菜。",
    image: "images/su-squirrel-fish.svg",    featured: true,
    allergens: ["鱼类","小麦"], calories: 420, mealTime: ["lunch","dinner"], taste: ["酸甜","鲜香"], difficulty: "hard", prepTime: 35, cookTime: 20, servings: 3,
    ingredients: ["桂鱼 1条", "番茄酱 3勺", "白糖 3勺", "香醋 2勺", "淀粉 适量", "姜末 适量"],
    steps: [
      "桂鱼去骨改花刀，拍匀干淀粉。",
      "热油炸至定型呈松鼠状捞出，复炸至金黄酥脆。",
      "锅中炒香姜末，加番茄酱、糖、醋熬成糖醋汁。",
      "水淀粉勾芡至浓稠。",
      "将糖醋汁浇淋在炸好的鱼身上即可。",
    ],
  },

  {
    id: "su-lion-head", name: "狮子头", cuisine: "苏菜", emoji: "🍡",
    intro: "肉丸硕大松软、入口即化，扬州淮扬菜经典代表。",
    image: "images/su-lion-head.svg",    featured: false,
    allergens: ["鸡蛋","小麦"], calories: 480, mealTime: ["lunch","dinner"],
    taste: ["咸香","鲜香"], difficulty: "medium", prepTime: 40, cookTime: 70, servings: 4,
    ingredients: ["猪五花肉末 400g","荸荠 4个","鸡蛋 1个","葱姜水 适量","淀粉 适量","白菜叶 适量"],
    steps: ["肉末剁至半茸半粒，加荸荠碎、鸡蛋、葱姜水拌匀上劲。","手蘸水团成大丸子，裹薄淀粉。","热油微炸定型捞出。","砂锅垫白菜叶，放入丸子加高汤没过。","小火慢炖1小时至软烂即可。"],
  },

  {
    id: "su-salted-duck",
    name: "盐水鸭",
    cuisine: "苏菜",
    emoji: "🦆",
    intro: "皮白肉嫩、咸鲜适口，南京地道传统名吃。",
    image: "images/su-salted-duck.svg",    featured: false,
    allergens: [], calories: 320, mealTime: ["lunch","dinner","late-night"], taste: ["咸香","清淡"], difficulty: "easy", prepTime: 250, cookTime: 50, servings: 4,
    ingredients: ["麻鸭 1只", "盐 适量", "花椒 1勺", "八角 2个", "姜片 适量", "葱段 适量"],
    steps: [
      "花椒盐炒香，均匀涂抹鸭身内外腌制4小时。",
      "腌好的鸭子冲洗干净。",
      "锅中加姜葱、八角和水煮开。",
      "放入鸭子小火煮25分钟关火焖20分钟。",
      "捞出晾凉后斩件装盘。",
    ],
  },

  {
    id: "su-dry-shredded-tofu", name: "大煮干丝", cuisine: "苏菜", emoji: "🍜",
    intro: "豆腐干切丝如发、汤清味鲜，淮扬菜刀工绝活代表。",
    image: "images/su-dry-shredded-tofu.svg",    featured: false,
    allergens: ["大豆","贝类"], calories: 200, mealTime: ["breakfast","lunch"],
    taste: ["清淡","鲜香"], difficulty: "hard", prepTime: 20, cookTime: 12, servings: 2,
    ingredients: ["白豆腐干 200g","虾仁 适量","火腿丝 适量","鸡汤 400ml","姜丝 适量","盐 适量"],
    steps: ["豆腐干片薄切成细丝，焯水去豆腥味。","锅中倒入鸡汤煮开。","放入豆腐干丝、虾仁、火腿丝、姜丝。","小火煮8分钟使其充分吸味。","调盐出锅即可。"],
  },

  // ===== 日本料理 =====
  {id:"jp-salmon-sashimi",name:"刺身盛合",cuisine:"日本料理",emoji:"🍣",intro:"新鲜鱼生薄切，搭配芥末酱油，品味海洋最纯粹的鲜美。", image:"images/jp-salmon-sashimi.svg",ingredients:["三文鱼 150g","金枪鱼 150g","甜虾 6只","萝卜丝 适量","芥末 适量","酱油 适量"],steps:["所有鱼生冷藏后取出，保持新鲜低温。","三文鱼、金枪鱼斜刀切成薄片。","甜虾去壳留尾。","盘底铺萝卜丝，将鱼生摆盘。","配芥末和酱油碟上桌。"]},
  {id:"jp-tonkotsu-ramen",name:"豚骨拉面",cuisine:"日本料理",emoji:"🍜",intro:"浓白猪骨汤底配弹牙面条，叉烧溏心蛋是灵魂配料。", image:"images/jp-tonkotsu-ramen.svg",ingredients:["猪骨 1kg","拉面 200g","叉烧肉 4片","溏心蛋 2个","葱花 适量","海苔 2片","蒜泥 适量"],steps:["猪骨焯水后大火熬煮6小时至汤白浓稠。","叉烧肉用酱油味醂腌制后烤制切片。","溏心蛋煮6分钟泡酱油入味。","拉面煮熟沥干入碗，浇滚烫骨汤。","摆上叉烧、溏心蛋、海苔、葱花。"]},
  {id:"jp-tempura",name:"天妇罗拼盘",cuisine:"日本料理",emoji:"🍤",intro:"薄脆面衣锁住食材鲜甜，蘸天汁享用更添风味。", image:"images/jp-tempura.svg",ingredients:["大虾 4只","南瓜 4片","茄子 半根","红薯 4片","天妇罗粉 100g","冰水 150ml","鸡蛋 1个"],steps:["所有蔬菜切厚片，虾去壳留尾挑虾线。","天妇罗粉加冰水鸡蛋调成稀面糊。","油温170度，食材裹薄糊入锅油炸。","炸至面衣微黄酥脆捞出沥油。","配天汁食用。"]},
  {id:"jp-miso-soup",name:"味噌汤",cuisine:"日本料理",emoji:"🍵",intro:"日式家庭必备汤品，豆腐海带搭配发酵味噌的温暖滋味。", image:"images/jp-miso-soup.svg",ingredients:["嫩豆腐 150g","海带 10g","柴鱼片 10g","白味噌 2勺","葱花 适量"],steps:["海带泡发切小片。","水烧开加柴鱼片煮3分钟捞出成高汤。","豆腐切小丁入高汤。","关火后用汤勺溶入味噌。","撒葱花即可。"],},

  // ===== 韩国料理 =====
  {id:"kr-bibimbap",name:"石锅拌饭",cuisine:"韩国料理",emoji:"🍚",intro:"各色蔬菜配辣酱在滚烫石锅中拌出焦香锅巴，韩式经典。", image:"images/kr-bibimbap.svg",ingredients:["米饭 1碗","牛肉末 100g","菠菜 50g","胡萝卜 50g","豆芽 50g","香菇 3朵","鸡蛋 1个","韩式辣酱 2勺","香油 1勺"],steps:["各种蔬菜分别焯水或炒熟调味。","牛肉末用酱油糖腌制后炒熟。","石锅刷香油加热至滚烫。","盛入米饭，蔬菜和牛肉按颜色码放。","中间打入生鸡蛋，配辣酱拌匀食用。"],},
  {id:"kr-kimchi-jjigae",name:"泡菜汤",cuisine:"韩国料理",emoji:"🥘",intro:"酸辣浓郁的发酵泡菜与五花肉炖煮，韩国家常暖心汤。", image:"images/kr-kimchi-jjigae.svg",ingredients:["韩式泡菜 200g","五花肉 150g","豆腐 200g","洋葱 半个","大葱 1根","韩式辣酱 1勺","蒜末 适量"],steps:["五花肉切片，泡菜切段，豆腐切块。","锅中炒香五花肉出油。","加入泡菜翻炒，加水和辣酱煮开。","放入豆腐、洋葱中火炖15分钟。","撒大葱段出锅。"],},
  {id:"kr-korean-bbq",name:"韩式烤肉",cuisine:"韩国料理",emoji:"🥩",intro:"腌制的牛五花在烤盘上滋滋作响，生菜包裹一口满足。", image:"images/kr-korean-bbq.svg",ingredients:["牛五花 500g","梨汁 3勺","酱油 3勺","蒜末 2勺","白糖 1勺","香油 1勺","生菜 适量","蒜片 适量"],steps:["牛肉切薄片。","梨汁、酱油、蒜末、糖、香油调成腌料。","牛肉腌制1小时入味。","烤盘烧热，肉片烤至两面微焦。","用生菜包裹肉片、蒜片、辣酱食用。"],},
  {id:"kr-tteokbokki",name:"辣炒年糕",cuisine:"韩国料理",emoji:"🫕",intro:"软糯的年糕条裹满甜辣酱汁，韩国街头最火的小吃。", image:"images/kr-tteokbokki.svg",ingredients:["韩式年糕条 300g","鱼饼 2片","韩式辣酱 2勺","辣椒粉 1勺","白糖 1勺","大葱 1根","芝麻 适量"],steps:["年糕条温水泡10分钟软化。","水烧开加辣酱、辣椒粉、糖调成酱汤。","放入年糕条煮至软糯。","加入鱼饼片、葱段继续煮3分钟。","收汁至浓稠，撒芝麻出锅。"],},

  // ===== 意大利菜 =====
  {id:"it-carbonara",name:"培根蛋酱意面",cuisine:"意大利菜",emoji:"🍝",intro:"蛋黄和芝士乳化成的浓郁酱汁包裹每根面条，罗马经典。", image:"images/it-carbonara.svg",ingredients:["意面 200g","培根 150g","蛋黄 3个","帕马森芝士碎 50g","黑胡椒 适量","盐 适量"],steps:["大锅盐水煮意面至弹牙口感。","培根切丁干锅煎至酥脆出油。","蛋黄加芝士碎和大量黑胡椒调成蛋液。","面捞出趁热拌入培根和油。","关火后倒入蛋液快速搅拌至乳化挂面。"],},
  {id:"it-margherita",name:"玛格丽特披萨",cuisine:"意大利菜",emoji:"🍕",intro:"番茄酱、莫扎瑞拉芝士与新鲜罗勒，那不勒斯三色经典。", image:"images/it-margherita.svg",ingredients:["高筋面粉 250g","酵母 3g","番茄酱 100g","莫扎瑞拉芝士 150g","新鲜罗勒 适量","橄榄油 适量"],steps:["面粉加酵母水和面，发酵1小时至两倍大。","面团擀成薄饼，边缘稍厚。","涂抹番茄酱，铺上撕碎的芝士。","烤箱250度烤10-12分钟至芝士融化微焦。","出炉放罗勒叶，淋橄榄油。"],},
  {id:"it-osso-buco",name:"米兰炖牛膝",cuisine:"意大利菜",emoji:"🍖",intro:"牛膝慢炖至骨中精华融入浓郁酱汁，配藏红花烩饭绝配。", image:"images/it-osso-buco.svg",ingredients:["牛膝 2片","洋葱 1个","胡萝卜 1根","西芹 1根","白葡萄酒 200ml","番茄罐头 200g","高汤 500ml"],steps:["牛膝绑线定型，裹面粉煎至金黄。","洋葱、胡萝卜、西芹切丁炒香。","倒入白葡萄酒煮至酒精挥发。","加入番茄和高汤没过牛膝。","小火慢炖2小时至骨肉分离。"],},
  {id:"it-tiramisu",name:"提拉米苏",cuisine:"意大利菜",emoji:"🍰",intro:"咖啡浸透的手指饼干层层叠加马斯卡彭芝士，意式经典甜点。", image:"images/it-tiramisu.svg",ingredients:["马斯卡彭芝士 250g","蛋黄 3个","白糖 80g","手指饼干 200g","浓缩咖啡 200ml","可可粉 适量"],steps:["蛋黄加糖打至浓稠发白。","加入马斯卡彭芝士搅拌成奶油糊。","手指饼干快速蘸咖啡液铺一层。","盖一层芝士奶油糊抹平。","重复层叠，冷藏4小时后撒可可粉。"],},

  // ===== 法国菜 =====
  {id:"fr-onion-soup",name:"法式洋葱汤",cuisine:"法国菜",emoji:"🧅",intro:"焦糖化洋葱慢熬出深甜，覆盖焗烤芝士面包的暖心汤品。", image:"images/fr-onion-soup.svg",ingredients:["洋葱 4个","黄油 30g","牛肉高汤 600ml","白葡萄酒 100ml","法棍面包 2片","格鲁耶尔芝士 100g"],steps:["洋葱切薄丝。","黄油小火炒洋葱30分钟至深焦糖色。","加白葡萄酒收干，倒入高汤煮20分钟。","汤盛入烤碗，放面包片。","铺满芝士，入烤箱200度烤至芝士冒泡微焦。"],},
  {id:"fr-coq-au-vin",name:"红酒炖鸡",cuisine:"法国菜",emoji:"🍗",intro:"整鸡用红葡萄酒慢炖，蘑菇培根提香，勃艮第乡间名菜。", image:"images/fr-coq-au-vin.svg",ingredients:["整鸡 1只","红葡萄酒 750ml","培根 100g","蘑菇 200g","小洋葱 6个","胡萝卜 1根","百里香 适量","黄油 30g"],steps:["鸡斩块，培根切丁炒出油盛出。","鸡块用培根油煎至金黄。","加洋葱胡萝卜炒香，倒红酒煮沸。","加入百里香和培根，盖盖小火炖1.5小时。","蘑菇用黄油炒香加入，再炖20分钟收汁。"],},
  {id:"fr-ratatouille",name:"普罗旺斯炖菜",cuisine:"法国菜",emoji:"🥗",intro:"缤纷夏日蔬菜层层叠放慢烤，南法阳光的味道。", image:"images/fr-ratatouille.svg",ingredients:["茄子 1根","西葫芦 1根","番茄 3个","彩椒 1个","洋葱 1个","大蒜 3瓣","橄榄油 适量","百里香 适量"],steps:["所有蔬菜切成均匀薄片。","炒香洋葱蒜末铺烤盘底。","蔬菜片按颜色交替排列在烤盘中。","淋橄榄油、盐、百里香。","盖锡纸180度烤40分钟，揭锡纸再烤20分钟。"],},
  {id:"fr-creme-brulee",name:"焦糖布蕾",cuisine:"法国菜",emoji:"🍮",intro:"丝滑的香草蛋奶冻配上脆脆的焦糖壳，敲开的瞬间最治愈。", image:"images/fr-creme-brulee.svg",ingredients:["淡奶油 400ml","蛋黄 4个","白糖 80g","香草精 1勺"],steps:["淡奶油加香草精小火加热至微沸。","蛋黄加一半糖打匀，倒入热奶油搅拌。","过筛入烤碗。","水浴法150度烤40分钟至凝固。","冷藏后撒糖用喷枪焦化表面。"],},

  // ===== 泰国菜 =====
  {id:"th-tom-yum",name:"冬阴功汤",cuisine:"泰国菜",emoji:"🦐",intro:"酸辣鲜香一锅煮，柠檬草和南姜是泰式风味的灵魂。", image:"images/th-tom-yum.svg",ingredients:["大虾 8只","柠檬草 3根","南姜 5片","青柠叶 5片","小番茄 6个","蘑菇 100g","冬阴功酱 2勺","椰奶 200ml","鱼露 适量","青柠汁 适量"],steps:["柠檬草切段拍扁，南姜切片。","水烧开加柠檬草、南姜、青柠叶煮5分钟出香。","加冬阴功酱、蘑菇、番茄煮3分钟。","放入大虾煮至变红。","关火加椰奶、鱼露、青柠汁调味。"],},
  {id:"th-pad-thai",name:"泰式炒河粉",cuisine:"泰国菜",emoji:"🍜",intro:"酸甜咸鲜交织的炒粉，花生碎和青柠是点睛之笔。", image:"images/th-pad-thai.svg",ingredients:["河粉 200g","虾仁 100g","鸡蛋 2个","豆芽 100g","花生碎 2勺","鱼露 2勺","罗望子酱 1勺","白糖 1勺","青柠 1个"],steps:["河粉温水泡软沥干。","调酱汁：鱼露、罗望子酱、白糖混合。","热油炒虾仁盛出，同锅炒鸡蛋。","加入河粉、酱汁大火翻炒均匀。","加豆芽、虾仁翻匀，撒花生碎配青柠。"],},
  {id:"th-green-curry",name:"绿咖喱鸡",cuisine:"泰国菜",emoji:"🍛",intro:"椰奶柔和了绿咖喱的辛辣，鸡肉鲜嫩入味，配饭无敌。", image:"images/th-green-curry.svg",ingredients:["鸡腿肉 300g","绿咖喱酱 2勺","椰奶 400ml","茄子 2个","青豆 100g","鱼露 适量","罗勒 适量","白糖 1勺"],steps:["鸡腿肉切块，茄子切滚刀块。","锅中倒入一半椰奶煮至出油。","加绿咖喱酱炒出香味。","放入鸡肉翻炒，加剩余椰奶和蔬菜。","煮至鸡肉熟透，加鱼露糖调味，撒罗勒。"],},
  {id:"th-mango-rice",name:"芒果糯米饭",cuisine:"泰国菜",emoji:"🥭",intro:"椰香糯米配甜芒果，酸甜交织的泰式经典甜品。", image:"images/th-mango-rice.svg",ingredients:["糯米 200g","椰奶 200ml","白糖 3勺","芒果 2个","盐 少许"],steps:["糯米泡水4小时后沥干。","糯米蒸20分钟至熟透。","椰奶加糖和小许盐小火加热融化。","热椰奶倒入熟糯米拌匀，盖布焖10分钟。","芒果切片摆盘，糯米配椰浆上桌。"],},

  // ===== 印度菜 =====
  {id:"in-butter-chicken",name:"黄油鸡",cuisine:"印度菜",emoji:"🍛",intro:"番茄奶油酱汁包裹烤鸡块，印度最受全球欢迎的一道咖喱。", image:"images/in-butter-chicken.svg",ingredients:["鸡腿肉 500g","酸奶 100g","番茄 3个","黄油 50g","淡奶油 100ml","洋葱 1个","姜蒜泥 适量","咖喱粉 2勺","姜黄粉 1勺"],steps:["鸡肉用酸奶、姜蒜泥、香料腌制1小时。","鸡肉串烤或煎至表面微焦。","黄油炒洋葱至金黄，加姜蒜泥和香料。","加番茄煮成酱，用料理机打滑。","酱汁回锅加鸡肉和奶油炖15分钟。"],},
  {id:"in-biryani",name:"印度香饭",cuisine:"印度菜",emoji:"🍚",intro:"长粒香米与腌制羊肉层层叠放，藏红花点缀的皇家料理。", image:"images/in-biryani.svg",ingredients:["长粒香米 300g","羊肉 400g","洋葱 2个","番茄 2个","酸奶 100g","姜蒜泥 适量","藏红花 少许","薄荷叶 适量"],steps:["羊肉用酸奶和香料腌制1小时。","洋葱切丝炸至金黄酥脆。","香米泡水30分钟后煮至半熟沥干。","锅底放羊肉、洋葱、番茄、香料，盖上半熟米。","藏红花泡水淋在米上，密封小火焖30分钟。"],},
  {id:"in-chana-masala",name:"鹰嘴豆咖喱",cuisine:"印度菜",emoji:"🫘",intro:"鹰嘴豆在香料番茄酱汁中炖煮入味，印度素食经典。", image:"images/in-chana-masala.svg",ingredients:["鹰嘴豆 200g","番茄 2个","洋葱 1个","姜蒜泥 适量","咖喱粉 2勺","姜黄粉 1勺","辣椒粉 适量","香菜 适量"],steps:["鹰嘴豆泡水过夜，煮至软糯备用。","洋葱炒至金黄，加姜蒜泥和香料炒香。","加番茄丁炒成酱。","倒入鹰嘴豆和适量水炖15分钟入味。","收汁撒香菜，配烤饼或米饭。"],},
  {id:"in-garlic-naan",name:"蒜香烤饼",cuisine:"印度菜",emoji:"🫓",intro:"外酥内软的泥窑烤饼，刷上蒜香黄油，蘸咖喱的最佳伴侣。", image:"images/in-garlic-naan.svg",ingredients:["面粉 300g","酸奶 100g","酵母 3g","蒜末 3勺","黄油 30g","香菜 适量"],steps:["面粉加酵母、酸奶和水和面，发酵1小时。","面团分小份擀成椭圆形。","蒜末加融化黄油调成蒜香黄油。","饼贴烤盘入250度烤箱烤3分钟。","出炉趁热刷蒜香黄油，撒香菜。"],},

  // ===== 墨西哥菜 =====
  {id:"mx-tacos",name:"墨西哥卷饼",cuisine:"墨西哥菜",emoji:"🌮",intro:"玉米饼包裹香料烤肉，配莎莎酱和酸奶油，一口到拉美。", image:"images/mx-tacos.svg",ingredients:["玉米饼 6张","猪梅花肉 300g","菠萝 适量","洋葱 半个","青柠 2个","香菜 适量","辣椒粉 1勺","孜然粉 1勺","莎莎酱 适量"],steps:["猪肉切片用辣椒粉、孜然、青柠汁腌制。","洋葱切丁，菠萝切小块，香菜切碎。","热锅煎肉片至微焦。","玉米饼加热变软。","饼上放肉、菠萝、洋葱、香菜，挤青柠汁。"],},
  {id:"mx-guacamole",name:"牛油果酱配玉米片",cuisine:"墨西哥菜",emoji:"🥑",intro:"绵密牛油果与番茄洋葱青柠碰撞，蘸玉米片的派对必备。", image:"images/mx-guacamole.svg",ingredients:["牛油果 3个","番茄 1个","洋葱 半个","青柠 1个","香菜 适量","墨西哥辣椒 1个","玉米片 适量"],steps:["牛油果对半切开去核取肉。","用叉子压成粗泥保留颗粒感。","番茄洋葱辣椒切细丁拌入。","挤青柠汁加盐调味。","配玉米片直接食用。"],},
  {id:"mx-quesadilla",name:"芝士馅饼",cuisine:"墨西哥菜",emoji:"🫔",intro:"拉丝芝士夹在金黄脆饼间，简单又满足的墨式快餐。", image:"images/mx-quesadilla.svg",ingredients:["小麦饼 2张","芝士碎 100g","鸡肉丝 50g","青椒 半个","洋葱 适量","酸奶油 适量","莎莎酱 适量"],steps:["青椒洋葱切细丝。","平底锅不放油，放一张饼。","铺满芝士、鸡肉丝和蔬菜。","盖上另一张饼，小火煎至底面金黄。","翻面再煎至芝士融化，切块配酱。"],},
  {id:"mx-chili-con-carne",name:"香辣肉酱豆",cuisine:"墨西哥菜",emoji:"🫘",intro:"牛肉末与红豆在辣椒和香料中慢炖，浓郁暖心的德州风味。", image:"images/mx-chili-con-carne.svg",ingredients:["牛肉末 400g","红豆 200g","番茄罐头 200g","洋葱 1个","大蒜 3瓣","辣椒粉 2勺","孜然粉 1勺","黑巧克力 10g"],steps:["红豆泡水煮至软烂备用。","洋葱蒜末炒香加牛肉末炒散。","加辣椒粉、孜然粉炒出香气。","倒入番茄罐头和红豆，加水炖30分钟。","加一小块黑巧克力融化使酱汁更醇厚。"],},

  // ===== 越南菜 =====
  {id:"vn-pho",name:"越南牛肉河粉",cuisine:"越南菜",emoji:"🍜",intro:"清澈鲜美的牛骨汤底配滑嫩河粉，越南国菜的灵魂之作。", image:"images/vn-pho.svg",ingredients:["牛骨 1kg","河粉 200g","牛肉薄片 150g","豆芽 100g","九层塔 适量","青柠 1个","辣椒 适量","鱼露 适量","八角 2个","桂皮 1块"],steps:["牛骨焯水后加八角桂皮烤香，熬汤3小时。","汤过滤加鱼露调味。","河粉煮熟入碗，放生牛肉薄片。","浇入滚烫高汤烫熟牛肉。","配豆芽、九层塔、青柠、辣椒上桌。"],},
  {id:"vn-spring-rolls",name:"鲜虾春卷",cuisine:"越南菜",emoji:"🫔",intro:"透明的米纸包裹鲜虾蔬菜，蘸花生酱清新爽口。", image:"images/vn-spring-rolls.svg",ingredients:["越南米纸 8张","大虾 8只","米粉 100g","生菜 适量","薄荷叶 适量","胡萝卜丝 适量","花生酱 2勺"],steps:["虾煮熟对半切开，米粉煮熟过冷水。","米纸在温水中快速浸软取出。","铺上生菜、米粉、虾、香草、胡萝卜丝。","卷紧成春卷。","花生酱加海鲜酱和水调成蘸酱。"],},
  {id:"vn-banh-mi",name:"越南法棍三明治",cuisine:"越南菜",emoji:"🥖",intro:"法越融合的完美代表，酥脆法棍夹腌萝卜和烤肉。", image:"images/vn-banh-mi.svg",ingredients:["越南法棍 2个","烤猪肉 150g","腌萝卜丝 适量","黄瓜片 适量","香菜 适量","辣椒 适量","肝酱 适量","蛋黄酱 适量"],steps:["猪肉用酱油腌制后烤熟切片。","白萝卜胡萝卜切丝用糖醋腌制。","法棍烤脆横剖不切断。","涂抹肝酱和蛋黄酱。","夹入烤肉、腌萝卜、黄瓜、香菜、辣椒。"],},
  {id:"vn-egg-coffee",name:"蛋咖啡",cuisine:"越南菜",emoji:"☕",intro:"蛋黄炼乳打发成的奶盖漂浮在浓咖啡上，河内特色饮品。", image:"images/vn-egg-coffee.svg",ingredients:["越南浓缩咖啡 1杯","蛋黄 1个","炼乳 2勺","白糖 1勺"],steps:["蛋黄加炼乳和糖打发至蓬松乳白。","冲一杯浓郁的越南咖啡。","将打发的蛋奶霜舀在咖啡表面。","喝时搅拌均匀。"],},

  // ===== 地中海菜 =====
  {id:"md-greek-salad",name:"希腊沙拉",cuisine:"地中海菜",emoji:"🥗",intro:"新鲜蔬果配羊乳酪和橄榄油，地中海饮食的健康代表。", image:"images/md-greek-salad.svg",ingredients:["番茄 2个","黄瓜 1根","青椒 半个","紫洋葱 半个","黑橄榄 适量","羊乳酪 100g","橄榄油 3勺","红酒醋 1勺"],steps:["番茄、黄瓜、青椒、洋葱切块。","所有蔬菜放入大碗。","加入黑橄榄。","大块掰碎羊乳酪铺在表面。","淋橄榄油和红酒醋，撒牛至叶。"],},
  {id:"md-hummus",name:"鹰嘴豆泥",cuisine:"地中海菜",emoji:"🫒",intro:"丝滑的鹰嘴豆芝麻酱，蘸皮塔饼的地中海经典小食。", image:"images/md-hummus.svg",ingredients:["鹰嘴豆 300g","芝麻酱 3勺","柠檬汁 2勺","大蒜 2瓣","橄榄油 3勺","盐 适量","孜然粉 少许"],steps:["鹰嘴豆泡水过夜后煮至软烂。","料理机中放入鹰嘴豆、芝麻酱、柠檬汁、蒜。","边打边加冰水至顺滑。","加盐和孜然粉调味。","盛盘淋橄榄油和辣椒粉装饰。"],},
  {id:"md-grilled-seabass",name:"地中海烤鲈鱼",cuisine:"地中海菜",emoji:"🐟",intro:"整条鲈鱼填香草柠檬烤制，简单调味呈现大海本味。", image:"images/md-grilled-seabass.svg",ingredients:["鲈鱼 1条","柠檬 1个","大蒜 4瓣","迷迭香 适量","百里香 适量","橄榄油 适量","小番茄 200g"],steps:["鲈鱼处理干净，两面划刀。","鱼腹塞入柠檬片、蒜瓣和香草。","烤盘铺小番茄垫底，放上鱼。","淋橄榄油撒盐和黑胡椒。","200度烤25分钟至鱼眼变白。"],},
  {id:"md-paella",name:"西班牙海鲜饭",cuisine:"地中海菜",emoji:"🥘",intro:"藏红花染金的米饭吸饱海鲜精华，焦脆锅底是精华所在。", image:"images/md-paella.svg",ingredients:["短粒米 300g","大虾 6只","青口贝 6只","鱿鱼圈 100g","鸡腿肉 200g","藏红花 少许","甜椒粉 1勺","番茄 1个","高汤 600ml"],steps:["藏红花泡高汤备用。","鸡腿肉煎至金黄盛出。","同锅炒香蒜末和番茄丁，加米翻炒。","倒入藏红花高汤和甜椒粉。","摆上海鲜和鸡肉，中火煮至米饭吸饱汤汁。"],},

  // ===== 美式菜 =====
  {id:"us-bbq-ribs",name:"美式烤肋排",cuisine:"美式菜",emoji:"🍖",intro:"低温慢烤至脱骨，刷上烟熏甜辣烧烤酱，美式烧烤之王。", image:"images/us-bbq-ribs.svg",ingredients:["猪肋排 1整架","烧烤酱 200ml","苹果醋 2勺","红糖 2勺","烟熏辣椒粉 1勺","蒜粉 1勺","洋葱粉 1勺","盐 适量"],steps:["肋排撕掉背膜，用干香料抹匀腌制2小时。","烤箱120度低温慢烤2.5小时。","烧烤酱加红糖、苹果醋调匀。","每30分钟刷一层酱，共刷3-4次。","最后230度烤10分钟至表面焦香。"],},
  {id:"us-buffalo-wings",name:"水牛城辣翅",cuisine:"美式菜",emoji:"🍗",intro:"炸鸡翅裹上酸辣黄油酱，配蓝纹芝士酱和芹菜条的派对经典。", image:"images/us-buffalo-wings.svg",ingredients:["鸡翅 12只","黄油 50g","辣椒酱 100ml","白醋 1勺","蒜粉 1勺","蓝纹芝士酱 适量","芹菜条 适量"],steps:["鸡翅腌制后裹粉油炸至金黄酥脆。","黄油融化加辣椒酱、白醋调成酱汁。","炸好的鸡翅趁热倒入酱汁中翻滚裹匀。","配蓝纹芝士酱和芹菜条上桌。"],},
  {id:"us-mac-and-cheese",name:"芝士通心粉",cuisine:"美式菜",emoji:"🧀",intro:"三种芝士融合成的浓郁白酱包裹通心粉，美式终极comfort food。", image:"images/us-mac-and-cheese.svg",ingredients:["通心粉 300g","车达芝士 150g","帕马森芝士 50g","奶油芝士 50g","黄油 30g","面粉 2勺","牛奶 400ml","面包糠 适量"],steps:["通心粉煮至弹牙沥干。","黄油融化加面粉炒成面糊。","分次加牛奶搅拌至顺滑白酱。","加入三种芝士搅拌至融化。","拌入通心粉，撒面包糠200度烤15分钟。"],},
  {id:"us-cheesecake",name:"纽约芝士蛋糕",cuisine:"美式菜",emoji:"🍰",intro:"浓稠绵密的奶油芝士配酥脆饼干底，经典纽约风格的甜蜜。", image:"images/us-cheesecake.svg",ingredients:["奶油芝士 500g","白糖 150g","鸡蛋 3个","酸奶油 200g","消化饼干 200g","黄油 80g","柠檬汁 1勺","香草精 1勺"],steps:["饼干压碎拌入融化黄油压成饼底。","奶油芝士加糖打至顺滑。","逐个加鸡蛋、酸奶油、柠檬汁、香草精拌匀。","倒入饼底模具，水浴法160度烤60分钟。","烤箱焖1小时后冷藏过夜。"],},

];
