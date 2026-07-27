// ---------- 工具函数 ----------

function getRecipeById(id) {
  return RECIPES.find((r) => r.id === id);
}

function cuisineMeta(cuisine) {
  return CUISINE_META[cuisine] || { emoji: "🍽️", gradient: "linear-gradient(135deg,#f0a,#f80)" };
}

// 每日主厨推荐：基于当天日期（年内第几天）确定性选取，不随机，
// 同一天内始终显示同一道菜，第二天自动切换到下一道。
function getDailyRecipe() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / 86400000);
  const index = dayOfYear % RECIPES.length;
  return RECIPES[index];
}

function formatToday() {
  const now = new Date();
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
}

// ---------- 卡片渲染 ----------

function cardHTML(recipe) {
  const meta = cuisineMeta(recipe.cuisine);
  return `
    <div class="card" onclick="openDetail('${recipe.id}')">
      <div class="card-image" style="background:${meta.gradient}">${recipe.emoji}</div>
      <div class="card-body">
        <h4>${recipe.name}</h4>
        <p>${recipe.intro}</p>
        <span class="card-cuisine">${recipe.cuisine}</span>
      </div>
    </div>
  `;
}

function gridHTML(recipes) {
  if (recipes.length === 0) {
    return `<div class="empty-state"><div class="icon">🍜</div><p>没有找到相关菜谱，换个关键词试试吧</p></div>`;
  }
  return `<div class="grid">${recipes.map(cardHTML).join("")}</div>`;
}

// ---------- 视图渲染 ----------

const main = document.getElementById("main-content");

function showHome() {
  setActiveNav("home");
  const daily = getDailyRecipe();
  const dailyMeta = cuisineMeta(daily.cuisine);
  const featured = RECIPES.filter((r) => r.featured);

  main.innerHTML = `
    <section>
      <div class="section-title">👨‍🍳 今日主厨推荐 <span class="tag">${formatToday()}</span></div>
      <div class="daily-card" onclick="openDetail('${daily.id}')">
        <div class="daily-image" style="background:${dailyMeta.gradient}">${daily.emoji}</div>
        <div class="daily-info">
          <div class="date">主厨每日精选 · 每天固定更新一道</div>
          <h3>${daily.name}</h3>
          <p>${daily.intro}</p>
          <span class="cuisine-badge">${daily.cuisine}</span>
        </div>
      </div>
    </section>

    <section>
      <div class="section-title">✨ 精选食谱</div>
      ${gridHTML(featured)}
    </section>

    <section>
      <div class="section-title">📖 按菜系浏览</div>
      <div class="category-chips">
        ${CATEGORIES.map((c) => `<button onclick="showCategories('${c}')">${cuisineMeta(c).emoji} ${c}</button>`).join("")}
      </div>
    </section>
  `;
}

function showCategories(activeCuisine) {
  setActiveNav("categories");
  const current = activeCuisine || CATEGORIES[0];
  const filtered = RECIPES.filter((r) => r.cuisine === current);

  main.innerHTML = `
    <section>
      <div class="section-title">📖 分类浏览</div>
      <div class="category-chips">
        ${CATEGORIES.map(
          (c) =>
            `<button class="${c === current ? "active" : ""}" onclick="showCategories('${c}')">${cuisineMeta(c).emoji} ${c}</button>`
        ).join("")}
      </div>
      ${gridHTML(filtered)}
    </section>
  `;
}

function showSearchResults(query) {
  setActiveNav(null);
  const q = query.trim().toLowerCase();
  const results = RECIPES.filter((r) => {
    const inName = r.name.toLowerCase().includes(q);
    const inIntro = r.intro.toLowerCase().includes(q);
    const inIngredients = r.ingredients.some((i) => i.toLowerCase().includes(q));
    const inCuisine = r.cuisine.toLowerCase().includes(q);
    return inName || inIntro || inIngredients || inCuisine;
  });

  main.innerHTML = `
    <section>
      <div class="section-title">🔍 搜索结果："${query}" <span class="tag">${results.length} 道菜</span></div>
      ${gridHTML(results)}
    </section>
  `;
}

function setActiveNav(view) {
  document.querySelectorAll("#nav-main button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

// ---------- 详情弹层 ----------

function openDetail(id) {
  const r = getRecipeById(id);
  if (!r) return;
  const meta = cuisineMeta(r.cuisine);
  const panel = document.getElementById("detail-panel");

  panel.innerHTML = `
    <div class="detail-hero" style="background:${meta.gradient}">
      ${r.emoji}
      <button class="detail-close" onclick="closeDetail()">✕</button>
    </div>
    <div class="detail-body">
      <h2>${r.name}</h2>
      <div class="meta">
        <span class="cuisine-badge">${r.cuisine}</span>
        <span>${meta.emoji} ${r.cuisine}系代表菜</span>
      </div>
      <p class="intro">${r.intro}</p>
      <div class="detail-columns">
        <div>
          <h3>食材清单</h3>
          <ul class="ingredient-list">
            ${r.ingredients.map((i) => `<li>${i}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>烹饪步骤</h3>
          <ol class="step-list">
            ${r.steps.map((s) => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      </div>
    </div>
  `;

  document.getElementById("detail-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  history.replaceState(null, "", `#recipe-${id}`);
}

function closeDetail() {
  document.getElementById("detail-overlay").classList.remove("open");
  document.body.style.overflow = "";
  history.replaceState(null, "", location.pathname);
}

document.getElementById("detail-overlay").addEventListener("click", (e) => {
  if (e.target.id === "detail-overlay") closeDetail();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDetail();
});

// ---------- 导航与搜索事件 ----------

document.getElementById("nav-main").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  const view = btn.dataset.view;
  if (view === "home") showHome();
  if (view === "categories") showCategories();
});

function runSearch() {
  const input = document.getElementById("search-input");
  const q = input.value.trim();
  if (!q) {
    showHome();
    return;
  }
  showSearchResults(q);
}

document.getElementById("search-btn").addEventListener("click", runSearch);
document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

// ---------- 初始化 ----------

(function init() {
  const hash = location.hash;
  if (hash.startsWith("#recipe-")) {
    showHome();
    openDetail(hash.replace("#recipe-", ""));
  } else {
    showHome();
  }
})();
