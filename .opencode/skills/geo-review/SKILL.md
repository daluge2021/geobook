---
name: geo-review
description: GEO 站点历史已解决问题的回归检查清单。每次对 geo010.com 或 worker 改动后、提交发布前核对一遍，防止之前影响明显的问题复发。触发词：复发、回归、检查、deploy、部署 worker、verify、核对、问题清单。
---

# GEO 项目回归检查（历史问题清单）

本项目（GEO Encyclopedia，geo010.com）出现过多次影响明显、修复后仍可能被误改回来的问题。
**每次改动 HTML / Worker / 部署 / 提交前后，逐项核对下表**，命中任何失败项则先修复再继续。

## 0. 三条红线（最严重，违反即用户可见故障）

- **R1｜不要通过 API 部署 Worker 时丢掉 bindings**
  用 Cloudflare API PUT 上传 `worker/index.js` 时，`metadata` 必须包含 `bindings`（d1 DB）。
  只传 `main_module` 会把 D1 的 `env.DB` binding 清掉 → 日志写入**静默失败**、`/stats.html` 返回 **500**、抓取统计归零，但网页仍正常（不依赖 DB），极难察觉。
  务必运行 `references/verify_worker.py` 验证 ① stats 200  ② D1 记录能新增。
- **R1｜raw 源站会附加沙箱 CSP，必须删除**
  `raw.githubusercontent.com` 对 HTML 响应附带 `Content-Security-Policy: default-src 'none'; sandbox` + `X-Frame-Options: deny`。
  Worker 转发时必须 `headers.delete('Content-Security-Policy')` 与 `headers.delete('X-Frame-Options')`，
  否则**浏览器禁用页面全部脚本**：侧边栏折叠菜单无法展开、51.la 统计失效。
  若这两行被删，侧边栏点击会无反应。
- **R2｜不删不改 51.la 统计脚本**（AGENTS.md R-2）。侧边栏折叠 JS、ping 脚本保持在 body 尾部。

## 1. 部署/修改后必检（含命令）

```bash
# Worker 部署后（--resolve 是为了绕过本机 hosts 把 geo010.com 指向 127.0.0.1 的问题）
IP=104.21.40.133
curl -sk --resolve geo010.com:443:$IP -o /dev/null -w "stats=%{http_code} " https://geo010.com/stats.html
curl -sk --resolve geo010.com:443:$IP -o /dev/null -w "home=%{http_code} " https://geo010.com/
curl -sk --resolve geo010.com:443:$IP -o /dev/null -w "mcp=%{http_code}\n" https://geo010.com/.well-known/mcp
# 全部应为 200（stats=200 说明 D1 binding 在）
```

- [ ] `stats.html` = 200（≥300 立即查 bindings）
- [ ] 首页 = 200；`.well-known/mcp` = 200（SEP-1960 manifest）且 `Content-Type: application/json`
- [ ] 响应**有**自定义 `Content-Security-Policy` 头（`curl -skI` 检查）：含 `sdk.51.la` 与 `'unsafe-inline'`，且**不含** `sandbox`；另有 `X-Frame-Options: DENY`、`Referrer-Policy`、`Permissions-Policy`
- [ ] 统计页 `stats.html` 应能反映到 D1：改后查 `SELECT COUNT(*) FROM crawler_logs` 有新增

## 1. err.txt / 检查报告误报项（已修复或本就存在，勿重复修）

以下在仓库里是**正常的**，若外部检查器再报不要当新问题处理：
- `.well-known/ai.txt`、`ai.json`、`llms.txt`、`ai-plugin.json`、`openapi.json` 均存在 ✅
- `summary.json` 存在 ✅
- `about.html`（AboutPage）、`contact.html`（ContactPage + contactPoint）存在且 schema 正常 ✅
- 首页 head 含 `WebSite` + `Organization` + `ItemList` JSON-LD ✅；全站 JSON-LD 均已在 `<head>`，Article 含日期 ✅
- 这些若被报"Missing"，大概率是检查器缓存/未抓到最新部署，别为此改动文件。

## 2. 品牌与内容一致性（防回归）

- [ ] 全站品牌统一英文 "GEO Encyclopedia"，无中文品牌名残留（HTML/JSON/XML/TXT/SVG/*.md）
- [ ] `og-image.png`、`og-image.svg` 为英文版（旧 png 是中文「GEO知识全书」，已替换，勿用旧文件覆盖）
- [ ] `what-is-geo.html` canonical 指向 `fundamentals/...` 完整版（避免重复页）
- [ ] RSS 发现链接 `<link rel="alternate" .../feed.xml>` 位于 canonical 之后

## 四、Worker 部署流程（防止 binding 丢失）

1. 改 `worker/index.js`
2. **用 `references/verify_worker.mjs` 本地跑一遍逻辑测试**（node，mock fetch/DB）
3. 用 API PUT 上传，**metadata 必须含 bindings**：
```json
{ "main_module": "index.js",
  "bindings": [ { "type": "d1", "name": "DB", "database_id": "a80440ae-3754-4ace-89b9-847aed8ed289" } ] }
```
4. 参照本文第 2 节验证线上
5. 提交：commit message 用中文，类型号（fix/feat/refactor 等），如 `fix: 补充D1 binding并提交验证`

## 五、不会重复踩的坑

- **本机 hosts**：`geo010.com → 127.0.0.1`，本机直接访问会 10061 连接拒绝。线上其实正常（真实解析 104.21.40.133 / 172.67.151.244）。验证线上必须 `curl --resolve geo010.com:443:104.21.40.133` 或走 `www`。
- `worker/index.js` 中 `www.geo010.com` → `geo010.com` 301 逻辑勿删，否则 www 裸域重复内容。
- `stats.html` 三重保护（robots Disallow + meta noindex + 不进 sitemap/llms.txt)勿动。
- 报告文件 `err.txt`/`check.txt`/`*.txt` 等是否跟踪；如无必要不提交它们，避免误把报告快照进 git。