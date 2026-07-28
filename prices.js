// 食材参考价格数据库 (元/500g 或 元/个/瓶 市场估算价)
const INGREDIENT_PRICES = {
  "DEFAULT": 5,
  "三文鱼": 65,
  "三黄鸡": 32,
  "九层塔": 10,
  "五花肉": 18,
  "五香粉": 8,
  "八角": 10,
  "冬瓜": 2.5,
  "冬阴功酱": 15,
  "冰糖": 6,
  "剁椒": 8,
  "南瓜": 3,
  "叉烧肉": 28,
  "叉烧酱": 12,
  "可可粉": 18,
  "咖喱粉": 12,
  "啤酒": 6,
  "土豆": 2.5,
  "坚果": 25,
  "培根": 22,
  "大葱": 3,
  "大虾": 40,
  "天妇罗粉": 15,
  "奶油芝士": 25,
  "姜黄粉": 12,
  "嫩豆腐": 3.5,
  "孜然粉": 8,
  "小番茄": 6,
  "小葱": 4,
  "小麦饼": 6,
  "小龙虾": 28,
  "帕马森芝士": 45,
  "干贝": 80,
  "干辣椒": 12,
  "彩椒": 6,
  "意面": 8,
  "手指饼干": 15,
  "拉面": 6,
  "排骨": 30,
  "整鸡": 28,
  "料酒": 6,
  "柠檬": 5,
  "柠檬草": 6,
  "柴鱼片": 30,
  "格鲁耶尔芝士": 40,
  "桂皮": 8,
  "桂鱼": 45,
  "梨": 5,
  "椰奶": 8,
  "椰浆": 10,
  "橄榄油": 35,
  "毛豆腐": 5,
  "沙茶酱": 12,
  "河粉": 4,
  "法棍": 8,
  "洋葱": 3,
  "浓缩咖啡": 15,
  "海参": 200,
  "消化饼干": 12,
  "淀粉": 4,
  "淡奶油": 18,
  "澄面": 6,
  "火腿": 25,
  "炼乳": 10,
  "烤猪肉": 25,
  "牛五花": 48,
  "牛奶": 8,
  "牛油果": 12,
  "牛肉": 45,
  "牛肉末": 40,
  "牛膝": 38,
  "牡蛎": 25,
  "猪梅花肉": 20,
  "猪肉": 15,
  "猪肉末": 16,
  "猪里脊": 22,
  "猪骨": 12,
  "玉米片": 8,
  "玉米饼": 8,
  "甜椒粉": 15,
  "甜虾": 50,
  "甜面酱": 6,
  "生抽": 8,
  "生粉": 4,
  "生菜": 5,
  "番茄": 4,
  "番茄酱": 8,
  "白糖": 5,
  "白胡椒": 12,
  "白菜": 2,
  "白萝卜": 2,
  "白葡萄酒": 28,
  "白豆腐干": 4,
  "白醋": 4,
  "百里香": 8,
  "短粒米": 5,
  "碱水面": 4,
  "笋": 8,
  "米": 3,
  "粘米粉": 5,
  "糯米": 5,
  "紫洋葱": 4,
  "红曲酒": 25,
  "红糖": 6,
  "红葡萄酒": 32,
  "红薯": 3,
  "红豆": 5,
  "红酒醋": 12,
  "绿咖喱酱": 15,
  "罗勒": 10,
  "羊乳酪": 30,
  "羊肉": 42,
  "老抽": 8,
  "肉末": 16,
  "肋排": 35,
  "肝酱": 9,
  "胡萝卜": 3,
  "腊肉": 35,
  "腊肠": 30,
  "腊鱼": 28,
  "芒果": 10,
  "芝士": 28,
  "芝麻": 10,
  "芝麻酱": 12,
  "芦笋": 12,
  "花椒": 15,
  "花生油": 18,
  "花生米": 8,
  "花生酱": 10,
  "花胶": 150,
  "芹菜": 4,
  "茄子": 4,
  "草鱼": 12,
  "荸荠": 6,
  "莫扎瑞拉芝士": 22,
  "菠菜": 4,
  "菠萝": 6,
  "蒜苗": 5,
  "蓝纹芝士": 50,
  "薄荷": 10,
  "藏红花": 80,
  "蘑菇": 10,
  "虾": 35,
  "虾仁": 42,
  "蚝油": 9,
  "蛋清": 0.8,
  "蛋黄": 1.5,
  "蛋黄酱": 8,
  "蜂蜜": 30,
  "蟹": 50,
  "西兰花": 7,
  "西芹": 5,
  "西葫芦": 3.5,
  "豆瓣酱": 8,
  "豆腐": 3,
  "豆芽": 2,
  "豆豉": 8,
  "越南米纸": 10,
  "车达芝士": 28,
  "辣椒粉": 10,
  "迷迭香": 8,
  "通心粉": 8,
  "郫县豆瓣酱": 10,
  "酱油": 8,
  "酵母": 3,
  "酸奶": 10,
  "酸奶油": 16,
  "金枪鱼": 80,
  "长粒香米": 8,
  "青口贝": 18,
  "青尖椒": 4.5,
  "青柠": 8,
  "青柠叶": 8,
  "青椒": 4,
  "青豆": 5,
  "面包糠": 6,
  "面粉": 3,
  "韩式年糕": 8,
  "韩式辣酱": 12,
  "香叶": 6,
  "香油": 22,
  "香草精": 12,
  "香菇": 15,
  "香菜": 8,
  "香醋": 5,
  "马斯卡彭芝士": 35,
  "高筋面粉": 5,
  "鱼": 15,
  "鱼头": 16,
  "鱼露": 9,
  "鱼饼": 15,
  "鱿鱼": 22,
  "鲈鱼": 28,
  "鲍鱼": 120,
  "鲤鱼": 10,
  "鸡翅": 18,
  "鸡肉": 12,
  "鸡胸肉": 14,
  "鸡腿肉": 13,
  "鸡蛋": 1.2,
  "鸭": 20,
  "鸽子蛋": 3,
  "鹌鹑蛋": 0.5,
  "鹰嘴豆": 6,
  "麻鸭": 25,
  "黄油": 25,
  "黄瓜": 3.5,
  "黑巧克力": 16,
  "黑橄榄": 15,
  "黑胡椒": 15,
  "龙井茶": 25,
};

function estimatePrice(ingredientText) {
  // "嫩豆腐 400g" → 找到"嫩豆腐"
  const cleaned = ingredientText.replace(/\s*\d+.*$/, "").replace(/\s*适量.*$/, "").replace(/\s*少许.*$/, "").replace(/\s*半根.*$/, "").replace(/\s*半个.*$/, "").replace(/\s*一个.*$/, "").trim();
  
  // 精确匹配
  if (INGREDIENT_PRICES[cleaned]) return INGREDIENT_PRICES[cleaned];
  
  // 模糊匹配
  for (const [key, price] of Object.entries(INGREDIENT_PRICES)) {
    if (cleaned.includes(key) || key.includes(cleaned)) return price;
  }
  
  return INGREDIENT_PRICES["DEFAULT"] || 5;
}

function estimateQuantity(ingredientText) {
  // 提取用量数字
  const numMatch = ingredientText.match(/(\d+)\s*g/);
  if (numMatch) return parseInt(numMatch[1]) / 500; // 转换为斤
  
  const numMatch2 = ingredientText.match(/(\d+)\s*只/);
  if (numMatch2) return parseInt(numMatch2[1]);
  
  const numMatch3 = ingredientText.match(/(\d+)\s*个/);
  if (numMatch3) return parseInt(numMatch3[1]);
  
  return 0.25; // 适量/少许默认0.25斤(125g)
}

function calculateRecipeCost(recipe) {
  if (!recipe || !recipe.ingredients) return null;
  
  let totalCost = 0;
  const pricedItems = recipe.ingredients.map(i => {
    const price = estimatePrice(i);
    const qty = estimateQuantity(i);
    const cost = price * qty;
    totalCost += cost;
    return { text: i, price, qty, cost };
  });
  
  return { items: pricedItems, total: Math.round(totalCost) };
}

function formatIngredientPrice(ingredientText) {
  const price = estimatePrice(ingredientText);
  const qty = estimateQuantity(ingredientText);
  const cost = price * qty;
  
  if (qty >= 1 && ingredientText.match(/\d+\s*只/)) {
    return `<span class="ingredient-price">≈¥${cost.toFixed(1)} (${price}元/只)</span>`;
  }
  if (qty >= 1 && ingredientText.match(/\d+\s*个/)) {
    return `<span class="ingredient-price">≈¥${cost.toFixed(1)} (${price}元/个)</span>`;
  }
  return `<span class="ingredient-price">≈¥${cost.toFixed(1)} (${price}元/500g)</span>`;
}
