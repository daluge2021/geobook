# AI Crawler Access Logger — Worker

记录 geo010.com 的 AI 爬虫抓取信息并生成统计页。

## 架构

```
AI 爬虫 / 用户 → Cloudflare (geo010.com/*) → Worker → GitHub Pages 源站
                       ↓
                    D1 数据库 (crawler_logs)
                       ↓
              /stats.html 统计页 (服务端渲染，无 JS)
```

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

## 环境变量

| 变量 | 说明 |
|------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token（不提交 git） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账号 ID |

## 说明

- 仅记录 HTML 页面请求，静态资源（ico/png/svg/css/js 等）不记录
- 统计页自身请求不记录，避免自污染
- token.txt 已加入 .gitignore，绝不提交
