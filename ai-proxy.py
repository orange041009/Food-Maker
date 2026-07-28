#!/usr/bin/env python3
"""食光味道 AI 代理服务 — 将前端请求转发到 DeepSeek API。零依赖，纯标准库。"""

import json, os, re, sys, urllib.request, urllib.error
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

PORT = 8081
API_KEY = os.environ.get("DEEPSEEK_API_KEY", "")
BASE = "https://api.deepseek.com"
MODEL = "deepseek-chat"

if not API_KEY:
    print("ERROR: Set DEEPSEEK_API_KEY environment variable")
    sys.exit(1)

def call_api(messages, max_tokens=2048, temperature=0.7):
    url = f"{BASE}/v1/chat/completions"
    body = json.dumps({"model": MODEL, "messages": messages, "stream": False, "max_tokens": max_tokens, "temperature": temperature}).encode()
    req = urllib.request.Request(url, data=body)
    req.add_header("Authorization", f"Bearer {API_KEY}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        return {"error": True, "status": e.code, "message": (e.read().decode() if e.fp else str(e))}
    except Exception as e:
        return {"error": True, "message": str(e)}

SYS_CHAT = "你是食光味道AI烹饪助手。数据库32道菜: 川菜-麻婆豆腐(麻辣320kcal)宫保鸡丁(酸甜380)水煮鱼(麻辣450)回锅肉(酱香520); 粤菜-白切鸡(清淡280)蜜汁叉烧(甜420)豉汁蒸排骨(蒜香350)广式肠粉(清淡220); 鲁菜-九转大肠(酸甜550)糖醋鲤鱼(酸甜480)葱烧海参(咸香320)德州扒鸡(五香400); 闽菜-佛跳墙(鲜香650)荔枝肉(酸甜380)醉排骨(酒香460)沙茶面(咸香380); 浙菜-西湖醋鱼(酸甜260)东坡肉(酱香620)龙井虾仁(茶香200)叫花鸡(五香480); 湘菜-剁椒鱼头(酸辣350)辣椒炒肉(麻辣420)口味虾(麻辣380)腊味合蒸(咸香500); 徽菜-臭鳜鱼(咸香380)毛豆腐(蒜香250)徽州圆子(咸香320)红烧划水(酱香300); 苏菜-松鼠桂鱼(酸甜420)狮子头(咸香480)盐水鸭(咸香320)大煮干丝(清淡200)。规则:优先推荐库内菜谱+理由，中文友好简洁200字内。"

SYS_SEARCH = "你是菜谱匹配器。根据用户描述从库中找3-6道最匹配的菜。只输出JSON数组:[\"id1\",\"id2\"]。库: chuan-mapo-tofu|麻婆豆腐|川菜|320|麻辣 chuan-kungpao-chicken|宫保鸡丁|川菜|380|酸甜 chuan-boiled-fish|水煮鱼|川菜|450|麻辣 chuan-twice-cooked-pork|回锅肉|川菜|520|酱香 yue-white-cut-chicken|白切鸡|粤菜|280|清淡 yue-char-siu|蜜汁叉烧|粤菜|420|甜 yue-steamed-ribs|豉汁蒸排骨|粤菜|350|蒜香 yue-chang-fen|广式肠粉|粤菜|220|清淡 lu-jiuzhuan-dachang|九转大肠|鲁菜|550|酸甜 lu-sweet-sour-carp|糖醋鲤鱼|鲁菜|480|酸甜 lu-braised-sea-cucumber|葱烧海参|鲁菜|320|咸香 lu-dezhou-chicken|德州扒鸡|鲁菜|400|五香 min-buddha-jumps-wall|佛跳墙|闽菜|650|鲜香 min-lychee-pork|荔枝肉|闽菜|380|酸甜 min-drunken-ribs|醉排骨|闽菜|460|酒香 min-shacha-noodles|沙茶面|闽菜|380|咸香 zhe-west-lake-fish|西湖醋鱼|浙菜|260|酸甜 zhe-dongpo-pork|东坡肉|浙菜|620|酱香 zhe-longjing-shrimp|龙井虾仁|浙菜|200|茶香 zhe-beggars-chicken|叫花鸡|浙菜|480|五香 xiang-chopped-pepper-fish-head|剁椒鱼头|湘菜|350|酸辣 xiang-pepper-fried-pork|辣椒炒肉|湘菜|420|麻辣 xiang-crayfish|口味虾|湘菜|380|麻辣 xiang-preserved-meat-steam|腊味合蒸|湘菜|500|咸香 hui-stinky-mandarin-fish|臭鳜鱼|徽菜|380|咸香 hui-mao-tofu|毛豆腐|徽菜|250|蒜香 hui-yuanzi|徽州圆子|徽菜|320|咸香 hui-braised-fish-tail|红烧划水|徽菜|300|酱香 su-squirrel-fish|松鼠桂鱼|苏菜|420|酸甜 su-lion-head|狮子头|苏菜|480|咸香 su-salted-duck|盐水鸭|苏菜|320|咸香 su-dry-shredded-tofu|大煮干丝|苏菜|200|清淡"

SYS_ASK = "你是烹饪专家。根据菜谱信息回答用户问题。中文简洁100-150字。"

class H(BaseHTTPRequestHandler):
    def _json(self, d, s=200):
        b = json.dumps(d, ensure_ascii=False).encode()
        self.send_response(s)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Content-Length", str(len(b)))
        self.end_headers()
        self.wfile.write(b)
    def _body(self):
        n = int(self.headers.get("Content-Length", 0))
        return json.loads(self.rfile.read(n)) if n else {}
    def do_OPTIONS(self): self._json({"ok": True})
    def do_GET(self):
        p = urlparse(self.path).path
        self._json({"status": "ok", "model": MODEL}) if p == "/health" else self._json({"error": "not found"}, 404)
    def do_POST(self):
        p = urlparse(self.path).path
        {"chat": self._chat, "search": self._search, "ask": self._ask}.get(p[1:] if p.startswith("/") else p, lambda: self._json({"error": "not found"}, 404))()
    def _chat(self):
        b = self._body()
        ms = [{"role": "system", "content": SYS_CHAT}]
        for h in b.get("history", [])[-10:]:
            ms.append({"role": h.get("role", "user"), "content": h.get("content", "")})
        ms.append({"role": "user", "content": b.get("message", "")})
        r = call_api(ms)
        self._json({"error": True, "message": str(r.get("message", ""))}, 503) if r.get("error") else self._json({"reply": r["choices"][0]["message"]["content"]})
    def _search(self):
        b = self._body()
        r = call_api([{"role": "system", "content": SYS_SEARCH}, {"role": "user", "content": f"找: {b.get('query','')}"}], temperature=0.3, max_tokens=200)
        if r.get("error"): self._json({"error": True}, 503); return
        try:
            t = r["choices"][0]["message"]["content"].strip()
            m = re.search(r'\[.*?\]', t, re.DOTALL)
            self._json({"ids": json.loads(m.group()) if m else json.loads(t)})
        except: self._json({"ids": []})
    def _ask(self):
        b = self._body()
        rc = b.get("recipe", {})
        ctx = f"菜谱:{rc.get('name','')}({rc.get('cuisine','')})|卡路里:{rc.get('calories','')}|食材:{', '.join(rc.get('ingredients',[]))}|步骤:{'; '.join(rc.get('steps',[]))}|过敏原:{', '.join(rc.get('allergens',[]))}"
        r = call_api([{"role": "system", "content": SYS_ASK}, {"role": "user", "content": f"{ctx}\n提问:{b.get('question','')}"}], max_tokens=300)
        self._json({"error": True}, 503) if r.get("error") else self._json({"reply": r["choices"][0]["message"]["content"]})
    def log_message(self, f, *a): print(f"[AI] {a[0]}")

if __name__ == "__main__":
    s = HTTPServer(("0.0.0.0", PORT), H)
    print(f"AI proxy: http://localhost:{PORT} | model: {MODEL}")
    try: s.serve_forever()
    except KeyboardInterrupt: print("\nBye"); s.server_close()
