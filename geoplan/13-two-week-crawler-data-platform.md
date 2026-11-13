# 阶段性成果文章 — 多平台分发草稿（2026-08-16）

> 文章已发布在 geo010.com：https://geo010.com/community/two-week-crawler-data.html
> 本文件用于各外部平台分发。全平台统一标题与核心数据，按平台政策调整格式与外链。
> 外链目标：每平台正文含 1 个指向 https://geo010.com/community/two-week-crawler-data.html 的外链。

## 一、统一标题

**What Actually Gets Your Site Crawled by AI? Our Two-Week Data, and the Mistake We Retired**

## 二、核心数据（所有平台共用）

| 日期 | 总请求 | 爬虫请求 | 关键事件 |
|------|--------|---------|----------|
| 08-04 | 303 | 90 | Worker 日志上线，建立基线 |
| 08-08 | 281 | 122 | GPTBot 59 次；freshness 刷新 |
| 08-09 | 172 | 28 | Community 模块 + 2 篇 JSON-LD 文章 |
| 08-10 | 459 | 97 | 内容模板文章、安全头、校验脚本 |
| 08-11 | 778 | 559 | ⚠️ 扫描攻击高峰（ChatGPT-User/Amazonbot 探测敏感路径） |
| 08-12 | 356 | 70 | 新文章发布当天被爬 10 次；首页 FAQPage |
| 08-13 | 502 | 182 | GPTBot 95；含伪造 GPTBot 攻击被拦截 |
| 08-14 | 222 | 148 | 实体密度页定义前置 |
| 08-15 | 187 | 127 | Amazonbot 82（67 个 404 来自其自身 URL 解析 bug） |

**三类结论：**

1. **新文章 = 最有效的抓取驱动**：新页发布当天被 GPTBot/ClaudeBot 抓 6-10 次，并持续回访数日。
2. **AI 发现端点 = 零回报**：`/ai/summary.json`、`/ai/faq.json`、`/.well-known/ai.txt` 上线两周零访问；GPTBot 等只抓 robots.txt 和 sitemap.xml（几乎每天）。
3. **假高峰 = 扫描攻击**：08-11 的 778 请求大部分是 ChatGPT-User/Amazonbot 探测 `/.env.production`、`/debug`、`/telescope/requests` 等敏感路径——借爬虫名做攻击。

**给站长的优先序：** 发布新内容 → 保持 robots/sitemap 健康 → 日期新鲜 → 加 FAQPage → AI 端点只作低成本对冲。

## 三、各平台适配

### Medium

- **发布方式**：用 Import 工具导入本站正文，canonical 指向原站（防 Medium 抢权重）。
- **外链**：全文 ≤2 个；正文中 1 个链接到原站文章。首段附近放。
- **标题**：使用统一标题。
- **注意**：Medium 外链是 nofollow，价值在曝光与 AI 引用，不在 SEO 权重传递。

### LinkedIn

- **发布方式**：直接发布全文（或长文摘要 + 链接）。
- **外链**：1 个，正文末尾 "Full analysis and daily table: <link>"。
- **标题**：统一标题。
- **注意**：LinkedIn 政策最宽松，无 nofollow 限制。

### DEV.to

- **frontmatter**：
  ```yaml
  ---
  title: "What Actually Gets Your Site Crawled by AI? Our Two-Week Data, and the Mistake We Retired"
  published: true
  tags: [geo, seo, ai]
  canonical_url: https://geo010.com/community/two-week-crawler-data.html
  series: "GEO Encyclopedia Field Notes"
  cover_image: https://geo010.com/og-image.png
  description: "Two weeks of crawl logs stripped of scanner noise: which GEO changes drove real AI crawler visits, and why AI discovery endpoints got zero requests."
  ---
  ```
- **外链**：正文含 1 个链接到原站（dofollow）。
- **注意**：DEV.to 允许 canonical 声明，不会抢原站权重。

### Hashnode

- **frontmatter**：
  ```yaml
  ---
  title: "What Actually Gets Your Site Crawled by AI? Our Two-Week Data, and the Mistake We Retired"
  subtitle: "Two weeks of crawl logs from geo010.com, stripped of scanner noise."
  date: "2026-08-16T00:00:00.000Z"
  tags: [geo, seo, ai-search]
  canonicalURL: https://geo010.com/community/two-week-crawler-data.html
  coverImage: https://geo010.com/og-image.png
  ---
  ```
- **外链**：正文 1 个（dofollow）。
- **注意**：Hashnode 支持 canonical，AI 引用率高。

### Reddit（可选，受 9:1 规则约束）

- **sub**：r/GenEngineOptimization（已有账号）。
- **策略**：正文自足（不点链接也有价值），开头披露 "I run GEO Encyclopedia"，标题用数据钩子，1 个链接放正文末尾。
- **注意**：Reddit 外链为 nofollow，主要价值是曝光与 AI 引用，不计数进外链域名验收。

### Indie Hackers / Hacker News（下一步可选）

- **Indie Hackers**：产品推广友好，发实战帖带链接是常规操作。
- **HN**：标题突出数据钩子（"We logged 2 weeks of AI crawlers and 90% of the 'growth' was a scanner attack"），正文不提推广，链接放自然位置。

## 四、发布状态跟踪

| 平台 | 状态 | 外链 | 日期 |
|------|------|------|------|
| geo010.com | ✅ 已发布 | — | 2026-08-16 |
| Medium | ⬜ 待发布 | 1（canonical 指向原站） | |
| LinkedIn | ⬜ 待发布 | 1 | |
| DEV.to | ⬜ 待发布 | 1（canonical） | |
| Hashnode | ⬜ 待发布 | 1（canonical） | |
| Reddit | ⬜ 待发布 | 1（nofollow，不计入外链验收） | |
| Indie Hackers / HN | ⬜ 待发布 | 1 | |

> 外链验收缺口：当前已有 Medium/LinkedIn/DEV.to/Hashnode 四域名（来自上篇），本篇再发布 4 平台后，累计 ≥5 达标（第 4 篇起各平台可交替投放以避免同质化）。

## 五、发布注意

- 全平台语言：英文。
- 数据表格在部分平台会丢失列对齐，建议转 Markdown 表格或列表。
- 发布后回填本文件状态，便于验收。
- geoplan 文件仅本地提交，不推送 origin/main。
