/**
 * 食光味道 · 盈利模块
 * 功能: 食材购买链接（联盟营销）
 */

// ============================================================
// 食材一键购买 — 生成购物链接
// ============================================================

const SHOP_PLATFORMS = [
  { name: "京东到家", emoji: "🛒", url: "https://search.jd.com/Search?keyword=", color: "#e4393c" },
  { name: "美团买菜", emoji: "🥬", url: "https://chaoshi.meituan.com/search?q=", color: "#FFD100" },
  { name: "盒马", emoji: "📦", url: "https://www.freshhema.com/search?q=", color: "#00a0e9" },
];

function buyIngredients(recipe) {
  if (!recipe || !recipe.ingredients) return "";

  const items = recipe.ingredients.map(i => {
    return i.replace(/\s*\d+.*$/, "").replace(/\s*适量.*$/, "").replace(/\s*少许.*$/, "").trim();
  }).filter(Boolean);

  const query = encodeURIComponent(items.slice(0, 6).join(" "));

  const links = SHOP_PLATFORMS.map(p =>
    `<a href="${p.url}${query}" target="_blank" rel="nofollow sponsored"
        style="display:flex;align-items:center;gap:6px;padding:10px 14px;background:#fff;border:1px solid var(--border);border-radius:12px;text-decoration:none;color:var(--text);font-size:0.85rem;transition:all 0.15s;"
        onmouseover="this.style.borderColor='${p.color}';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
      ${p.emoji} <strong>${p.name}</strong> 搜索食材
    </a>`
  ).join("");

  return `
    <div style="margin-top:20px;padding-top:18px;border-top:1px solid var(--border);">
      <h4 style="font-size:0.9rem;margin-bottom:10px;">🛒 一键购买食材</h4>
      <p style="font-size:0.8rem;color:var(--text-soft);margin-bottom:10px;">
        食材清单：${items.slice(0, 6).join("、")}${items.length > 6 ? " 等" : ""}
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${links}
      </div>
    </div>
  `;
}

function injectBuyButton(recipe) {
  const askArea = document.getElementById("ask-recipe-area");
  if (!askArea) return;
  const existingBuy = document.getElementById("buy-ingredients-area");
  if (existingBuy) existingBuy.remove();
  const buyDiv = document.createElement("div");
  buyDiv.id = "buy-ingredients-area";
  buyDiv.innerHTML = buyIngredients(recipe);
  askArea.parentNode.insertBefore(buyDiv, askArea);
}


// ============================================================
// 烹饪教学视频搜索
// ============================================================

const VIDEO_PLATFORMS = [
  { name: "Bilibili", emoji: "📺", url: "https://search.bilibili.com/all?keyword=", color: "#fb7299" },
  { name: "YouTube", emoji: "▶️", url: "https://www.youtube.com/results?search_query=", color: "#ff0000" },
  { name: "抖音", emoji: "🎵", url: "https://www.douyin.com/search/", color: "#000000" },
  { name: "下厨房", emoji: "🍳", url: "https://www.xiachufang.com/search/?keyword=", color: "#5eaB43" },
];

function videoSearchHTML(recipe) {
  if (!recipe) return "";
  const query = encodeURIComponent(recipe.name + " 做法 教程");

  const links = VIDEO_PLATFORMS.map(p =>
    `<a href="${p.url}${query}" target="_blank" rel="nofollow"
        style="display:flex;align-items:center;gap:6px;padding:10px 14px;background:#fff;border:1px solid var(--border);border-radius:12px;text-decoration:none;color:var(--text);font-size:0.85rem;transition:all 0.15s;"
        onmouseover="this.style.borderColor='${p.color}';this.style.boxShadow='0 2px 8px rgba(0,0,0,0.08)'"
        onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
      ${p.emoji} <strong>${p.name}</strong> 搜索「${recipe.name}」教程
    </a>`
  ).join("");

  return `
    <div style="margin-top:20px;padding-top:18px;border-top:1px solid var(--border);">
      <h4 style="font-size:0.9rem;margin-bottom:10px;">🎬 观看教学视频</h4>
      <p style="font-size:0.8rem;color:var(--text-soft);margin-bottom:10px;">
        点击下方平台搜索「${recipe.name}」的详细做法视频
      </p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${links}
      </div>
    </div>
  `;
}

function injectVideoButton(recipe) {
  const buyArea = document.getElementById("buy-ingredients-area");
  const askArea = document.getElementById("ask-recipe-area");
  const target = buyArea || askArea;
  if (!target) return;
  const existing = document.getElementById("video-search-area");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.id = "video-search-area";
  div.innerHTML = videoSearchHTML(recipe);
  target.parentNode.insertBefore(div, target);
}

// ============================================================
// 初始化
// ============================================================

(function init() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
    return;
  }

  // 包装 openDetail 注入购买按钮
  const _openDetail = window.openDetail;
  if (_openDetail) {
    window.openDetail = function(id) {
      _openDetail(id);
      const recipe = getRecipeById(id);
      if (recipe) { setTimeout(() => injectBuyButton(recipe), 100); setTimeout(() => injectVideoButton(recipe), 150); }
    };
  }
})();
