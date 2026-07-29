// ============================================================
// 工具函数
// ============================================================

function getRecipeById(id) {
  return RECIPES.find((r) => r.id === id);
}

function cuisineMeta(cuisine) {
  return CUISINE_META[cuisine] || { emoji: "🍽️", gradient: "linear-gradient(135deg,#f0a,#f80)" };
}

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

const mealTimeLabel = (k) => { const m = MEAL_TIMES.find(t => t.key === k); return m ? `${m.emoji} ${m.label}` : k; };
const diffStars = (d) => d === "hard" ? "⭐⭐⭐" : d === "medium" ? "⭐⭐" : "⭐";
const diffLabel = (d) => DIFFICULTY_LABELS[d] || d;

// ============================================================
// 卡片渲染（更新：含卡路里、过敏原、用餐时间徽章）
// ============================================================

function cardHTML(recipe) {
  const meta = cuisineMeta(recipe.cuisine);
  const times = (recipe.mealTime || []).map(mealTimeLabel).join(" · ");
  const cal = recipe.calories ? `🔥 ${recipe.calories} kcal` : "";
  const allergens = (recipe.allergens && recipe.allergens.length) ? `⚠️ ${recipe.allergens.join("·")}` : "";
  const diff = recipe.difficulty ? `${diffStars(recipe.difficulty)} ${diffLabel(recipe.difficulty)}` : "";
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);

  return `
    <div class="card" onclick="openDetail('${recipe.id}')">
      <div class="card-image" style="background:${meta.gradient}">${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" loading="lazy">` : recipe.emoji}</div>
      <div class="card-body">
        <h4>${recipe.name}</h4>
        <p>${recipe.intro}</p>
        <div class="card-badges">
          ${cal ? `<span class="badge badge-calories">${cal}</span>` : ""}
          ${diff ? `<span class="badge badge-difficulty">${diff}</span>` : ""}
          ${totalTime ? `<span class="badge badge-mealtime">⏱ ${totalTime}分钟</span>` : ""}
        </div>
        <div class="card-badges">
          ${times ? `<span class="badge badge-mealtime">${times}</span>` : ""}
          ${allergens ? `<span class="badge badge-allergen">${allergens}</span>` : ""}
        </div>
        <span class="card-cuisine">${recipe.cuisine}</span>
            ${typeof calculateRecipeCost === "function" ? "<span class=\"card-cost\">💰 ≈¥" + calculateRecipeCost(recipe).total + "</span>" : ""}
      </div>
    </div>
  `;
}

function gridHTML(recipes) {
  if (!recipes || recipes.length === 0) {
    return `<div class="empty-state"><div class="icon">🍜</div><p>没有找到相关菜谱，换个条件试试吧</p></div>`;
  }
  return `<div class="grid">${recipes.map(cardHTML).join("")}</div>`;
}

// ============================================================
// 筛选状态管理
// ============================================================

const filterState = {
  mealTime: [],
  taste: [],
  allergens: [],
  diet: null,
  cuisine: [],
  situation: null,
  skill: null,
  servings: 3,
};

function toggleChip(containerId, value, stateKey, multi = true) {
  if (multi) {
    const idx = filterState[stateKey].indexOf(value);
    if (idx >= 0) filterState[stateKey].splice(idx, 1);
    else filterState[stateKey].push(value);
  } else {
    filterState[stateKey] = filterState[stateKey] === value ? null : value;
  }
  renderFilterChips();
}

function changeServings(delta) {
  filterState.servings = Math.max(1, Math.min(8, filterState.servings + delta));
  document.getElementById("servings-count").textContent = filterState.servings;
  updateMatchCount();
}

function updateMatchCount() {
  const cnt = filterRecipes().length;
  const badge = document.getElementById("match-count");
  if (badge) {
    badge.textContent = cnt + " 道匹配";
    badge.style.color = cnt === 0 ? "#c0392b" : cnt < 5 ? "#e67e22" : "#2e7d32";
  }
}

function resetFilters() {
  filterState.mealTime = [];
  filterState.taste = [];
  filterState.allergens = [];
  filterState.diet = null;
  filterState.cuisine = [];
  filterState.situation = null;
  filterState.skill = null;
  filterState.servings = 3;
  renderFilterChips();
  document.getElementById("plan-results").innerHTML = "";
  // 如果面板开着就关掉
  const panel = document.getElementById("filter-panel");
  if (panel.classList.contains("open")) toggleFilter();
}

function toggleFilter() {
  const panel = document.getElementById("filter-panel");
  const btn = document.getElementById("filter-toggle");
  const isOpen = panel.classList.toggle("open");
  btn.classList.toggle("open", isOpen);
  // 移动端背景遮罩（不用 body overflow:hidden，iOS Safari 有 bug 会阻止 fixed 子元素滚动）
  if (isOpen && window.innerWidth <= 640) {
    let backdrop = document.getElementById("filter-backdrop");
    if (!backdrop) {
      backdrop = document.createElement("div");
      backdrop.id = "filter-backdrop";
      // touch-action:none 阻止触摸穿透到 body，替代 body overflow:hidden
      backdrop.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.4);z-index:149;touch-action:none;";
      backdrop.addEventListener("click", toggleFilter);
      document.body.appendChild(backdrop);
    }
    backdrop.style.display = "block";
  } else {
    const backdrop = document.getElementById("filter-backdrop");
    if (backdrop) backdrop.style.display = "none";
  }
}

// ============================================================
// 筛选芯片渲染
// ============================================================

function renderChipGroup(containerId, items, stateKey, multi, labelFn) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const selected = filterState[stateKey];
  const isActive = (v) => multi ? (Array.isArray(selected) && selected.includes(v)) : (selected === v);

  container.innerHTML = items.map(item => {
    const value = typeof item === "string" ? item : item.key || item;
    const label = labelFn ? labelFn(item) : (typeof item === "string" ? item : item.label || item);
    return `<span class="chip${isActive(value) ? " active" : ""}" onclick="toggleChip('${containerId}','${value}','${stateKey}',${multi})">${label}</span>`;
  }).join("");
}

function renderFilterChips() {
  renderChipGroup("filter-mealtime", MEAL_TIMES, "mealTime", true, t => `${t.emoji} ${t.label}`);
  renderChipGroup("filter-taste", TASTES, "taste", true);
  renderChipGroup("filter-allergens", ALLERGENS, "allergens", true, a => `🚫 ${a}`);
  renderChipGroup("filter-diet", DIETARY_TYPES, "diet", false);
  renderChipGroup("filter-cuisine", CATEGORIES, "cuisine", true, c => `${cuisineMeta(c).emoji} ${c}`);
  renderChipGroup("filter-situation", SITUATIONS, "situation", false);
  renderChipGroup("filter-skill", ["新手", "中级", "高手"], "skill", false);
  document.getElementById("servings-count").textContent = filterState.servings;
}

// ============================================================
// 菜谱过滤逻辑
// ============================================================

function filterRecipes() {
  let results = [...RECIPES];

  // 用餐时间筛选（OR 关系：菜谱匹配任一选中时间）
  if (filterState.mealTime.length > 0) {
    results = results.filter(r =>
      r.mealTime && r.mealTime.some(t => filterState.mealTime.includes(t))
    );
  }

  // 口味筛选（AND 关系：菜谱需包含所有选中口味）
  if (filterState.taste.length > 0) {
    results = results.filter(r =>
      r.taste && filterState.taste.some(t => r.taste.includes(t))
    );
  }

  // 过敏原排除：如果有选中过敏原，排除包含该过敏原的菜
  if (filterState.allergens.length > 0) {
    results = results.filter(r =>
      !r.allergens || !r.allergens.some(a => filterState.allergens.includes(a))
    );
  }

  // 菜系筛选
  if (filterState.cuisine.length > 0) {
    results = results.filter(r => filterState.cuisine.includes(r.cuisine));
  }

  // 饮食类型筛选
  if (filterState.diet === "素食" || filterState.diet === "纯素") {
    const meats = ["肉", "鸡", "鸭", "鱼", "虾", "蟹", "贝", "鲍", "参", "肠", "排", "鸽", "牛", "猪", "羊"];
    const animalProducts = ["蚝油", "鱼露", "虾酱", "鸡汤", "高汤", "猪骨", "牛骨", "柴鱼", "干贝", "鲍", "海参", "花胶"];
    results = results.filter(r =>
      !r.ingredients.some(i => meats.some(m => i.includes(m))) &&
      !r.ingredients.some(i => animalProducts.some(a => i.includes(a)))
    );
  }
  if (filterState.diet === "清真") {
    const pork = ["猪", "五花", "腊肠", "腊肉", "培根", "火腿", "排骨"];
    results = results.filter(r =>
      !r.ingredients.some(i => pork.some(p => i.includes(p)))
    );
  }
  if (filterState.diet === "高蛋白") {
    results = results.filter(r => (r.calories || 0) >= 350);
  }
  if (filterState.diet === "低碳水") {
    results = results.filter(r => (r.calories || 0) <= 350);
  }

  // 用餐情况：影响份数匹配
  if (filterState.situation === "一人食") {
    results = results.filter(r => (r.servings || 2) <= 2);
  }
  if (filterState.situation === "家庭用餐") {
    results = results.filter(r => (r.servings || 2) >= 2);
  }
  if (filterState.situation === "朋友聚会") {
    results = results.filter(r => (r.servings || 2) >= 3);
  }

  // 技能筛选
  if (filterState.skill === "新手") {
    results = results.filter(r => r.difficulty === "easy");
  } else if (filterState.skill === "中级") {
    results = results.filter(r => r.difficulty === "easy" || r.difficulty === "medium");
  } else if (filterState.skill === "高手") {
    // 高手模式：全部可选，但优先困难菜
    results.sort((a, b) => {
      const order = { hard: 0, medium: 1, easy: 2 };
      return (order[a.difficulty] || 1) - (order[b.difficulty] || 1);
    });
  }

  return results;
}

// ============================================================
// 菜谱计划生成
// ============================================================

function generatePlan() {
  const filtered = filterRecipes();
  const requested = filterState.servings;

  // 无结果 → 全部用近似匹配
  if (filtered.length === 0) {
    const resultsDiv = document.getElementById("plan-results");
    resultsDiv.innerHTML = `
      <section style="max-width:1300px;margin:0 auto;padding:0 24px 40px;">
        <div class="empty-state">
          <div class="icon">🔍</div>
          <h3 style="margin:12px 0;color:var(--text)">没有完全匹配的菜谱</h3>
          <p style="margin-bottom:12px;color:var(--text-soft)">但别担心，AI 正在寻找最接近的选择…</p>
          <button onclick="generatePlanWithSimilar()" style="padding:12px 28px;background:var(--accent);color:#fff;border:none;border-radius:22px;cursor:pointer;font-weight:700;font-size:1rem;">✨ 查看近似推荐</button>
          <button onclick="resetFilters()" style="margin-left:8px;padding:10px 20px;background:none;border:1px solid var(--border);border-radius:20px;cursor:pointer;font-size:0.9rem;color:var(--text-soft);">🔄 重置筛选</button>
        </div>
      </section>`;
    resultsDiv.scrollIntoView({ behavior: "smooth" });
    return;
  }

  // 正常流程：精确匹配 + 不够时补近似
  generatePlanWithData(filtered, requested);
}

// 核心规划逻辑
function generatePlanWithData(filtered, requested, similarPool) {
  const needSimilar = filtered.length < requested;
  
  // --- 精确匹配评分 ---
  const scored = filtered.map(r => {
    let score = 0;
    if (r.difficulty === "easy") score += 35;
    else if (r.difficulty === "medium") score += 20;
    else score += 5;
    const totalTime = (r.prepTime || 0) + (r.cookTime || 0);
    if (totalTime <= 20) score += 35;
    else if (totalTime <= 45) score += 20;
    else score += 5;
    if (r.featured) score += 15;
    if (filterState.taste.length > 0 && r.taste) {
      score += filterState.taste.filter(t => r.taste.includes(t)).length * 10;
    }
    return { recipe: r, score, similarity: 100, isExact: true };
  });

  scored.sort((a, b) => b.score - a.score);
  
  let plan = scored.slice(0, Math.min(requested, scored.length));

  // --- 不够则补近似匹配 ---
  if (needSimilar && similarPool === undefined) {
    const exactIds = new Set(filtered.map(r => r.id));
    const allOthers = RECIPES.filter(r => !exactIds.has(r.id));
    
    // 排除过敏原
    const safeOthers = allOthers.filter(r => {
      if (filterState.allergens.length === 0) return true;
      return !r.allergens || !r.allergens.some(a => filterState.allergens.includes(a));
    });
    
    // 计算相似度
    const similar = safeOthers.map(r => {
      let sim = 0;
      
      // 菜系匹配 (最高30分)
      if (filterState.cuisine.length > 0) {
        if (filterState.cuisine.includes(r.cuisine)) sim += 30;
      }
      
      // 口味匹配 (最高30分)
      if (filterState.taste.length > 0 && r.taste) {
        const matched = filterState.taste.filter(t => r.taste.includes(t)).length;
        sim += Math.min(30, matched * 10);
      } else if (filterState.taste.length === 0) {
        sim += 15; // 无口味要求时给基准分
      }
      
      // 用餐时间匹配 (最高20分)
      if (filterState.mealTime.length > 0 && r.mealTime) {
        const matched = filterState.mealTime.filter(t => r.mealTime.includes(t)).length;
        sim += Math.min(20, matched * 10);
      } else if (filterState.mealTime.length === 0) {
        sim += 10;
      }
      
      // 份数匹配 (最高10分)
      if (filterState.situation === "一人食" && (r.servings || 2) <= 2) sim += 10;
      else if (filterState.situation === "家庭用餐" && (r.servings || 2) >= 2) sim += 10;
      else if (filterState.situation === "朋友聚会" && (r.servings || 2) >= 3) sim += 10;
      else if (!filterState.situation) sim += 5;
      
      // 技能匹配 (最高10分)
      if (filterState.skill === "新手" && r.difficulty === "easy") sim += 10;
      else if (filterState.skill === "中级" && r.difficulty !== "hard") sim += 10;
      else if (!filterState.skill) sim += 5;
      else if (filterState.skill === "新手" && r.difficulty === "medium") sim += 3;
      
      return { recipe: r, similarity: Math.round(sim), isExact: false };
    });
    
    // 按相似度排序
    similar.sort((a, b) => b.similarity - a.similarity);
    
    const needed = requested - plan.length;
    plan = plan.concat(similar.slice(0, needed));
  }

  // 渲染
  renderPlanResults(plan, filtered.length, needSimilar);
}

// 无精确匹配时的入口
function generatePlanWithSimilar() {
  const all = [...RECIPES];
  // 排除过敏原
  const safe = all.filter(r => {
    if (filterState.allergens.length === 0) return true;
    return !r.allergens || !r.allergens.some(a => filterState.allergens.includes(a));
  });
  
  const similar = safe.map(r => {
    let sim = 50; // 基础分
    if (filterState.cuisine.length > 0 && filterState.cuisine.includes(r.cuisine)) sim += 25;
    if (filterState.taste.length > 0 && r.taste) {
      sim += Math.min(20, filterState.taste.filter(t => r.taste.includes(t)).length * 10);
    }
    if (filterState.mealTime.length > 0 && r.mealTime) {
      sim += Math.min(15, filterState.mealTime.filter(t => r.mealTime.includes(t)).length * 7);
    }
    return { recipe: r, similarity: Math.min(99, Math.round(sim)), isExact: false };
  });
  
  similar.sort((a, b) => b.similarity - a.similarity);
  const plan = similar.slice(0, filterState.servings);
  renderPlanResults(plan, 0, true);
}

// 渲染计划结果
function renderPlanResults(plan, exactCount, hasSimilar) {
  const totalCal = plan.reduce((sum, r) => sum + (r.recipe.calories || 0), 0);
  const totalTime = plan.reduce((sum, r) => sum + ((r.recipe.prepTime || 0) + (r.recipe.cookTime || 0)), 0);
  const allAllergens = [...new Set(plan.flatMap(r => r.recipe.allergens || []))];
  const excludedAllergens = filterState.allergens.length > 0 ? filterState.allergens : [];

  const planCards = plan.map((item, i) => {
    const r = item.recipe;
    const meta = cuisineMeta(r.cuisine);
    const isExact = item.isExact;
    const sim = item.similarity;
    
    // 相似度标签
    let simBadge = "";
    if (!isExact) {
      const simColor = sim >= 70 ? "#2e7d32" : sim >= 40 ? "#e67e22" : "#c0392b";
      const simBg = sim >= 70 ? "#e8f5e9" : sim >= 40 ? "#fff3e0" : "#ffeaea";
      simBadge = `<span style="display:inline-block;font-size:0.7rem;padding:2px 8px;border-radius:8px;background:${simBg};color:${simColor};font-weight:700;margin-left:6px;">${sim}% 匹配</span>`;
    }

    return `
      <div class="plan-card${isExact ? '' : ' plan-similar'}" onclick="openDetail('${r.id}')">
        <div class="plan-image" style="background:${meta.gradient}">${r.image ? `<img src="${r.image}" alt="${r.name}" loading="lazy">` : r.emoji}</div>
        <div class="plan-body">
          <h4>
            <span class="plan-dish-index">${i + 1}.</span>
            <span class="plan-dish-name">${r.name || "(?)"}</span>
            ${!isExact ? simBadge : '<span style="font-size:0.65rem;color:#2e7d32;margin-left:4px;">✓ 精确</span>'}
            <span class="badge badge-difficulty">${diffStars(r.difficulty)} ${diffLabel(r.difficulty)}</span>
          </h4>
          <p style="font-size:0.85rem;color:var(--text-soft);margin:4px 0">${r.intro}</p>
          ${!isExact ? `<p style="font-size:0.75rem;color:var(--accent);margin:2px 0">💡 ${getSimilarReason(item)}</p>` : ''}
          <div class="plan-meta">
            <span class="badge badge-calories">🔥 ${r.calories} kcal</span>
            <span class="badge badge-mealtime">⏱ ${(r.prepTime||0)+(r.cookTime||0)}分钟</span>
            <span class="badge badge-mealtime">👥 ${r.servings||2}人份</span>
            ${(r.allergens||[]).map(a => `<span class="badge badge-allergen">⚠️ ${a}</span>`).join("")}
          </div>
        </div>
      </div>
    `;
  }).join("");

  const resultsDiv = document.getElementById("plan-results");
  resultsDiv.innerHTML = `
    <section style="max-width:1300px;margin:0 auto;padding:0 24px 40px;">
      <div class="section-title">
        📋 你的专属菜谱计划 <span class="tag">${plan.length} 道菜</span>
        ${hasSimilar ? `<span style="font-size:0.8rem;color:#e67e22;margin-left:4px;">（含近似推荐）</span>` : ''}
        <button onclick="resetFilters()" style="margin-left:auto;padding:4px 12px;background:none;border:1px solid var(--border);border-radius:14px;cursor:pointer;font-size:0.78rem;color:var(--text-soft);">🔄 重置</button>
      </div>
      ${exactCount > 0 && hasSimilar ? `<p style="font-size:0.85rem;color:var(--text-soft);margin:-12px 0 16px 0;">✅ ${exactCount} 道精确匹配 + 🧠 ${plan.length - exactCount} 道智能推荐</p>` : ''}
      ${exactCount === 0 ? `<p style="font-size:0.85rem;color:var(--accent);margin:-12px 0 16px 0;">🧠 以下为 AI 根据你的偏好智能推荐的近似菜谱</p>` : ''}
      <div class="plan-summary">
        <div class="stat"><span class="value">${plan.length}</span><span class="label">精选菜品</span></div>
        <div class="stat"><span class="value">${totalCal}</span><span class="label">总卡路里 kcal</span></div>
        <div class="stat"><span class="value">${totalTime}</span><span class="label">总耗时(分钟)</span></div>
        ${allAllergens.length ? `<div class="stat"><span class="value" style="color:#c0392b">${allAllergens.length}</span><span class="label">含过敏原种类</span></div>` : ""}
        ${excludedAllergens.length ? `<div class="stat"><span class="value" style="color:#2e7d32">✓</span><span class="label">已排除: ${excludedAllergens.join("·")}</span></div>` : ""}
      </div>
      ${planCards}
    </section>
  `;

  // 关闭筛选面板
  closeFilterPanel();
  resultsDiv.scrollIntoView({ behavior: "smooth" });
}

// 近似匹配的原因说明
function getSimilarReason(item) {
  const r = item.recipe;
  const reasons = [];
  if (filterState.cuisine.length > 0 && filterState.cuisine.includes(r.cuisine)) reasons.push("菜系匹配");
  if (filterState.taste.length > 0 && r.taste) {
    const matched = filterState.taste.filter(t => r.taste.includes(t));
    if (matched.length > 0) reasons.push("口味接近(" + matched.join("/") + ")");
  }
  if (filterState.mealTime.length > 0 && r.mealTime) {
    const matched = filterState.mealTime.filter(t => r.mealTime.includes(t));
    if (matched.length > 0) reasons.push("时段合适");
  }
  if (reasons.length === 0) reasons.push("综合推荐");
  return reasons.join(" · ");
}

// 关闭筛选面板辅助
function closeFilterPanel() {
  const panel = document.getElementById("filter-panel");
  if (panel.classList.contains("open")) {
    panel.classList.remove("open");
    document.getElementById("filter-toggle").classList.remove("open");
    const bd = document.getElementById("filter-backdrop");
    if (bd) bd.style.display = "none";
    if (!document.getElementById("detail-overlay").classList.contains("open")) {
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }
}

// ============================================================
// 视图渲染
// ============================================================

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
        <div class="daily-image" style="background:${dailyMeta.gradient}">${daily.image ? `<img src="${daily.image}" alt="${daily.name}" loading="lazy">` : daily.emoji}</div>
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
  document.getElementById("plan-results").innerHTML = "";
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
  document.getElementById("plan-results").innerHTML = "";
}

function showSearchResults(query) {
  setActiveNav(null);
  const q = query.trim().toLowerCase();
  const results = RECIPES.filter((r) => {
    const inName = r.name.toLowerCase().includes(q);
    const inIntro = r.intro.toLowerCase().includes(q);
    const inIngredients = r.ingredients.some((i) => i.toLowerCase().includes(q));
    const inCuisine = r.cuisine.toLowerCase().includes(q);
    const inTaste = r.taste ? r.taste.some(t => t.toLowerCase().includes(q)) : false;
    const inAllergen = r.allergens ? r.allergens.some(a => a.toLowerCase().includes(q)) : false;
    return inName || inIntro || inIngredients || inCuisine || inTaste || inAllergen;
  });

  main.innerHTML = `
    <section>
      <div class="section-title">🔍 搜索结果："${query}" <span class="tag">${results.length} 道菜</span></div>
      ${gridHTML(results)}
    </section>
  `;
  document.getElementById("plan-results").innerHTML = "";
}

function setActiveNav(view) {
  document.querySelectorAll("#nav-main button").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

// ============================================================
// 详情弹层（更新：含过敏原、卡路里、用餐时间等新字段）
// ============================================================

function openDetail(id) {
  const r = getRecipeById(id);
  if (!r) return;
  const meta = cuisineMeta(r.cuisine);
  const panel = document.getElementById("detail-panel");
  const totalTime = (r.prepTime || 0) + (r.cookTime || 0);
  const hasAllergens = r.allergens && r.allergens.length > 0;
  const times = (r.mealTime || []).map(mealTimeLabel).join(" · ");
  const tastes = (r.taste || []).map(t => `<span class="badge badge-taste">${t}</span>`).join("");

  panel.innerHTML = `
    <div class="detail-hero" style="background:${meta.gradient}">
      ${r.image ? `<img src="${r.image}" alt="${r.name}" class="detail-hero-img">` : r.emoji}
      <button class="detail-close" onclick="closeDetail()">✕</button>
    </div>
    <div class="detail-body">
      <h2>${r.name}</h2>
      <div class="meta">
        <span class="cuisine-badge">${r.cuisine}</span>
        <span>${meta.emoji} ${r.cuisine}</span>
        ${r.featured ? '<span class="badge badge-calories">精选</span>' : ""}
      </div>
      <p class="intro">${r.intro}</p>

      <!-- 过敏原提示 -->
      ${hasAllergens
        ? `<div class="allergen-warning">⚠️ 过敏原提示：本菜品含有 <strong>${r.allergens.join("、")}</strong>，如有相关过敏请谨慎食用。</div>`
        : `<div class="allergen-warning safe">✅ 本品不含常见过敏原</div>`
      }

      <!-- 关键信息行 -->
      <div class="info-row">
        ${r.calories ? `<span>🔥 <strong>${r.calories} kcal</strong> / 份</span>` : ""}
        ${r.difficulty ? `<span>${diffStars(r.difficulty)} <strong>${diffLabel(r.difficulty)}</strong></span>` : ""}
        ${r.prepTime ? `<span>🔪 准备 <strong>${r.prepTime}分钟</strong></span>` : ""}
        ${r.cookTime ? `<span>🍳 烹饪 <strong>${r.cookTime}分钟</strong></span>` : ""}
        ${totalTime ? `<span>⏱ 总计 <strong>${totalTime}分钟</strong></span>` : ""}
        ${r.servings ? `<span>👥 <strong>${r.servings}人份</strong></span>` : ""}
      </div>

      <!-- 口味标签 -->
      ${tastes ? `<div class="taste-tags">${tastes}</div>` : ""}

      <!-- 适用用餐时间 -->
      ${times ? `<div class="info-row"><span>🕐 适用：${times}</span></div>` : ""}

      ${typeof calculateRecipeCost === "function" ? "<div class=\"recipe-total-cost\"><span>💰 预估总成本</span><span class=\"cost-value\">≈¥" + calculateRecipeCost(r).total + "</span></div>" : ""}
      <div class="detail-columns">
        <div>
          <h3>食材清单</h3>
          <ul class="ingredient-list">
            ${r.ingredients.map((i) => `<li>${i} ${typeof formatIngredientPrice==="function"?formatIngredientPrice(i):""}</li>`).join("")}
          </ul>
        </div>
        <div>
          <h3>烹饪步骤</h3>
          <ol class="step-list">
            ${r.steps.map((s) => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      </div>
      <!-- AI 问答区域 -->
      <div class="ask-recipe-area" id="ask-recipe-area">
        <h4>💬 问 AI 关于这道菜</h4>
        <div class="ask-recipe-row">
          <input id="ask-recipe-input" type="text" placeholder="例如：有什么替代食材？如何减脂？">
          <button onclick="askRecipe()">提问</button>
        </div>
        <div class="ask-answer" id="ask-recipe-answer"></div>
      </div>
    </div>
  `;

  document.getElementById("detail-overlay").classList.add("open");
  // iOS Safari bug: body overflow:hidden 阻止 fixed 子元素滚动，改用 overlay 自带的 touch-action
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  history.replaceState(null, "", `#recipe-${id}`);
  // 显示 AI 问答区域
  if (typeof showRecipeAsk === "function") { showRecipeAsk(r); }
}

function closeDetail() {
  document.getElementById("detail-overlay").classList.remove("open");
  document.body.style.position = "";
  document.body.style.width = "";
  history.replaceState(null, "", location.pathname);
}

document.getElementById("detail-overlay").addEventListener("click", (e) => {
  if (e.target.id === "detail-overlay") closeDetail();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDetail();
});

// ============================================================
// 导航与搜索事件
// ============================================================

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

document.getElementById("search-btn").addEventListener("click", () => {
  if (typeof aiSearchRecipes === "function") {
    aiSearchRecipes(document.getElementById("search-input").value);
  } else {
    runSearch();
  }
});
document.getElementById("search-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // 如果 AI 在线，使用 AI 智能搜索
    if (typeof aiSearchRecipes === "function") {
      aiSearchRecipes(document.getElementById("search-input").value);
    } else {
      runSearch();
    }
  }
});

// ============================================================
// 初始化
// ============================================================

(function init() {
  renderFilterChips();
  const hash = location.hash;
  if (hash.startsWith("#recipe-")) {
    showHome();
    openDetail(hash.replace("#recipe-", ""));
  } else {
    showHome();
  }
})();
