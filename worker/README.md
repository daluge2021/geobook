# AI Crawler Access Logger — Worker

记录 geo010.com 的 AI 爬虫抓取信息并生成统计页。

## 架构

```
AI 爬虫 / 用户 → Cloudflare (geo010.com/*) → Worker → raw.githubusercontent.com (docs/ 文件)
                        ↓
                     D1 数据库 (crawler_logs)
                        ↓
               /stats.html 统计页 (服务端渲染，无 JS)
```

> **www 归一**：`www.geo010.com/*` 路由绑定同一 Worker，请求会 301 重定向到
> `geo010.com`（含路径），避免 www/裸域重复内容。

> **源站说明**：Cloudflare Workers 的 `fetch()` 无法覆盖 `Host` 头（运行时强制为
> URL host），而 GitHub Pages 按 Host 头路由站点（`Host: geo010.com` → 200，其他
> → 404）。Origin Rules 的 Host 头覆盖是 Enterprise 计划专属（Free 不可用）。
> 因此 Worker 直连 `raw.githubusercontent.com`（不校验 Host 头，直接服务仓库
> `docs/` 文件），并配合 Cloudflare 边缘缓存（`cf.cacheEverything`）缓解限流。
> GitHub Pages 继续作为仓库内容与部署流程存在。
>
> **路径安全**：`sanitizePath()` 拒绝 `..`、`.` 及空段，防止路径穿越读取仓库
> 内其他文件；无扩展名路径自动 fallback 到 `.html`（友好 URL）。

## 文件

| 文件 | 说明 |
|------|------|
| `index.js` | Worker 主逻辑：UA 分类、日志写入、转发、统计页渲染 |
| `schema.sql` | D1 建表语句 |
| `wrangler.toml` | 部署配置（D1 绑定 + 兼容性日期） |

## 统计页访问控制

- URL: `https://geo010.com/stats.html`（仅通过完整链接访问）
- `<meta name="robots" content="noindex, nofollow">`
- `docs/robots.txt` 中所有 agent 组已加 `Disallow: /stats.html`
- 不加入 sitemap.xml / llms.txt / 导航栏

## 部署

```bash
# 1. 创建 D1 数据库并建表（一次性）
npx wrangler d1 create geo010-crawler-log
npx wrangler d1 execute geo010-crawler-log --file schema.sql

# 2. 部署 Worker
npx wrangler deploy

# 3. 绑定路由（Worker 控制台或 API）
#  pattern: geo010.com/*
#  pattern: www.geo010.com/*
```

> **API 部署（本机 wrangler 不可用时的替代）**：ES module Worker 通过 API 上传时，
> 代码 part 的 `Content-Type` 必须为 `application/javascript+module`（否则报
> `Unexpected token 'export'`）；分离的 `POST .../versions` + 部署端点需要额外的
> Deployment 权限，直接 `PUT .../workers/scripts/{name}`（上传即部署）最省权限。

## 环境变量

| 变量 | 说明 |
|------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token（不提交 git） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID |

## 说明

- 仅记录 HTML 页面请求，静态资源（ico/png/svg/css/js 等）不记录
- 统计页自身请求不记录，避免自污染
- token.txt 已加入 .gitignore，绝不提交
