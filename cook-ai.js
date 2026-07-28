/**
 * 食光味道 · AI 智能体前端模块
 * 处理聊天窗口、智能搜索和菜谱问答的 UI 和 API 交互
 */

const AI_PROXY = "http://localhost:8081";

// ============================================================
// 聊天历史持久化
// ============================================================

function loadChatHistory() {
  try {
    const raw = localStorage.getItem("foodmaker-chat-history");
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveChatHistory(history) {
  // 只保留最近 30 条
  const trimmed = history.slice(-30);
  localStorage.setItem("foodmaker-chat-history", JSON.stringify(trimmed));
}

let chatHistory = loadChatHistory();

// ============================================================
// AI API 调用
// ============================================================

async function aiChat(message) {
  try {
    const resp = await fetch(`${AI_PROXY}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history: chatHistory }),
    });
    const data = await resp.json();
    if (data.error) throw new Error(data.message);
    return data.reply;
  } catch (e) {
    return `抱歉，AI 助手暂时无法响应：${e.message}`;
  }
}

async function aiSearch(query) {
  try {
    const resp = await fetch(`${AI_PROXY}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await resp.json();
    if (data.error) throw new Error(data.message);
    return data.ids || [];
  } catch (e) {
    console.error("AI 搜索失败:", e);
    return null; // null 表示降级到普通搜索
  }
}

async function aiAskRecipe(recipe, question) {
  try {
    // 提取 AI 需要的菜谱字段
    const ctx = {
      name: recipe.name,
      cuisine: recipe.cuisine,
      taste: recipe.taste || [],
      calories: recipe.calories || 0,
      difficulty: recipe.difficulty || "",
      ingredients: recipe.ingredients || [],
      steps: recipe.steps || [],
      allergens: recipe.allergens || [],
    };
    const resp = await fetch(`${AI_PROXY}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, recipe: ctx }),
    });
    const data = await resp.json();
    if (data.error) throw new Error(data.message);
    return data.reply;
  } catch (e) {
    return `抱歉，AI 暂时无法回答：${e.message}`;
  }
}

// ============================================================
// 聊天窗口
// ============================================================

function toggleChat() {
  const panel = document.getElementById("chat-panel");
  const isOpen = panel.classList.contains("open");
  if (isOpen) {
    panel.classList.remove("open");
  } else {
    panel.classList.add("open");
    document.getElementById("chat-input").focus();
    scrollChatBottom();
  }
}

function sendChat() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;
  input.value = "";

  addChatBubble("user", msg);
  chatHistory.push({ role: "user", content: msg });

  // 显示打字动画
  const typingId = addChatBubble("bot", "思考中...", "typing");

  aiChat(msg).then(reply => {
    // 移除打字动画
    removeChatBubble(typingId);
    addChatBubble("bot", reply);
    chatHistory.push({ role: "assistant", content: reply });
    saveChatHistory(chatHistory);
  });
}

function addChatBubble(role, text, className) {
  const container = document.getElementById("chat-messages");
  const id = "msg-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);
  const bubble = document.createElement("div");
  bubble.id = id;
  bubble.className = `chat-bubble ${role} ${className || ""}`;
  bubble.innerHTML = role === "bot" ? formatChatReply(text) : escapeHtml(text);
  container.appendChild(bubble);
  scrollChatBottom();
  return id;
}

function removeChatBubble(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function formatChatReply(text) {
  // 简单的 Markdown 转换：**粗体**、换行
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function scrollChatBottom() {
  const container = document.getElementById("chat-messages");
  if (container) {
    setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
  }
}

// 恢复聊天历史
function restoreChatHistory() {
  const container = document.getElementById("chat-messages");
  if (!container) return;
  container.innerHTML = "";
  chatHistory.forEach(h => {
    const role = h.role === "assistant" ? "bot" : "user";
    addChatBubble(role, h.content);
  });
}

// 聊天输入框回车发送
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    const chatInput = document.getElementById("chat-input");
    const chatPanel = document.getElementById("chat-panel");
    if (chatInput === document.activeElement && chatPanel.classList.contains("open")) {
      e.preventDefault();
      sendChat();
    }
    // 菜谱问答输入框
    const askInput = document.getElementById("ask-recipe-input");
    if (askInput === document.activeElement) {
      e.preventDefault();
      askRecipe();
    }
  }
});

// ============================================================
// AI 智能搜索
// ============================================================

async function aiSearchRecipes(query) {
  if (!query || !query.trim()) {
    showHome();
    return;
  }
  const ids = await aiSearch(query.trim());
  if (ids === null || ids.length === 0) {
    // AI 未返回结果或失败，降级到普通搜索
    showSearchResults(query);
    return;
  }
  // 用 ID 列表查找菜谱
  const results = ids.map(id => getRecipeById(id)).filter(Boolean);
  if (results.length === 0) {
    showSearchResults(query);
    return;
  }
  setActiveNav(null);
  main.innerHTML = `
    <section>
      <div class="section-title">🧠 AI 智能匹配："${query}" <span class="tag">${results.length} 道菜</span></div>
      <div style="font-size:0.85rem;color:var(--text-soft);margin-bottom:16px;">🤖 AI 根据你的描述智能匹配以下菜谱</div>
      ${gridHTML(results)}
    </section>
  `;
  document.getElementById("plan-results").innerHTML = "";
}

// ============================================================
// 菜谱详情 AI 问答
// ============================================================

let currentAskRecipe = null;

function showRecipeAsk(recipe) {
  currentAskRecipe = recipe;
  const container = document.getElementById("ask-recipe-area");
  if (!container) return;
  container.style.display = "block";
  document.getElementById("ask-recipe-answer").innerHTML = "";
  document.getElementById("ask-recipe-input").value = "";
}

function askRecipe() {
  const input = document.getElementById("ask-recipe-input");
  const answerDiv = document.getElementById("ask-recipe-answer");
  const q = input.value.trim();
  if (!q || !currentAskRecipe) return;

  answerDiv.innerHTML = `<span style="color:var(--text-soft);">🤔 思考中...</span>`;
  aiAskRecipe(currentAskRecipe, q).then(reply => {
    answerDiv.innerHTML = `<strong>🤖 AI 回答：</strong><br>${formatChatReply(reply)}`;
  });
  input.value = "";
}

// ============================================================
// 健康检查
// ============================================================

async function checkAIAvailable() {
  try {
    const resp = await fetch(`${AI_PROXY}/health`);
    const data = await resp.json();
    return data.status === "ok";
  } catch {
    return false;
  }
}

// 页面加载时检查并显示状态
(function initAI() {
  checkAIAvailable().then(ok => {
    const badge = document.getElementById("ai-status-badge");
    if (badge) {
      badge.textContent = ok ? "🟢 AI 在线" : "🔴 AI 离线";
      badge.style.color = ok ? "#2e7d32" : "#c0392b";
    }
    const aiSearchBtn = document.getElementById("ai-search-btn");
    if (aiSearchBtn) {
      aiSearchBtn.title = ok ? "AI 智能搜索" : "AI 不可用";
      aiSearchBtn.style.opacity = ok ? "1" : "0.4";
    }
  });
  restoreChatHistory();
})();
