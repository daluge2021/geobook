# 14. GEO 影响归因与新站冷启动清单 — 多平台分发草稿

> 本文件是 `geo-impact-attribution-new-site.html` 的对外发布计划与平台适配草稿。
> 仅本地提交，不推送 origin/main（geoplan 规则）。发布前请参考 13 号文档的已发布链接与数据口径。

## 一、文章信息

- **本站 URL（canonical）**: https://geo010.com/community/geo-impact-attribution-new-site.html
- **H1 / 平台统一标题**: What GEO Work Actually Moves AI Crawlers? Our Data, and a New-Site Launch Checklist
- **核心论点**: 我们给 geo010.com 的 9 类 GEO 措施逐一做了两周爬虫流量归因——真正起作用的只有 robots.txt + sitemap.xml + 首页 + 真实内容；llms.txt 只有 GPTBot 关注；FAQPage 与 AI 发现端点对"抓取"零作用。由此给出新站冷启动清单（先做三件套 + 3-5 篇真文章），并修正了两条此前写错的结论。
- **发布日期**: 2026-08-16（与 two-week-crawler-data 同日）
- **文章计数**: 全站 49 → 50（所有索引已同步）

## 二、核心数据表（各平台共享）

| 措施 | 关键证据 | 影响评级 |
|------|---------|---------|
| robots.txt | ClaudeBot 68、Googlebot 19、OAI-SearchBot 18、Bingbot 12 | 最高 |
| sitemap.xml | ClaudeBot 68、Bingbot 8、GPTBot 6 | 最高 |
| 首页 / | GPTBot 17、PerplexityBot 12、OAI-SearchBot 10、ClaudeBot 8 | 高 |
| 新内容页 | GPTBot 66/83 次请求为内容页 | 高 |
| freshness | 08-08/08-12 爬虫访问高峰随 freshness 刷新 | 中 |
| llms.txt | 4 次（GPTBot 2、Amazonbot 1、Googlebot 1） | 低 |
| 定义前置 | entity-density 页被 7+ 爬虫触达 | 低-中 |
| FAQPage | 补全后 6 页 0 次主流 AI 爬虫访问 | 无（引用层） |
| AI 发现端点 | /ai/*.json、ai.txt、插件 0 次访问 | 无 |

爬虫行为对比表：

| 行为 | GPTBot | ClaudeBot |
|------|--------|-----------|
| robots.txt | 1 次 | 68 次 |
| sitemap.xml | 6 次 | 68 次 |
| 内容页 | 66/83 | 极少 |
| 策略 | 全站遍历 | 严格走入口 |

修正的两条旧结论（重要卖点，体现数据诚意）：
1. "新文章发布当天被爬 6-10 次" → 实际多为浏览器/自测，AI 爬虫各 1 次。
2. "FAQ 上线当天即有 ClaudeBot/OAI-SearchBot 访问" → 日志不支持，补全后 6 页无主流 AI 爬虫访问。

## 三、平台适配

### 1. Medium（主阵地，Import 模式）
- 标题: What GEO Work Actually Moves AI Crawlers? Our Data, and a New-Site Launch Checklist
- 副标题（导入原文链接）: 原文发布在 GEO Encyclopedia —— https://geo010.com/community/geo-impact-attribution-new-site.html
- 首图: https://geo010.com/og-image.png（新增计数已是 50）
- 文末固定链接段（必加，否则与站内文章重复率过高）:
  > *This article was originally published on the GEO Encyclopedia (geo010.com). We log every AI crawler request on our own site and write about what the data shows. The full index of articles — including the launch-time checklist and the two-week crawler data it builds on — is at [geo010.com/community.html](https://geo010.com/community.html).*
- 标签: #GEO #AI #GenerativeEngineOptimization #DigitalMarketing #ContentStrategy #SEO

### 2. LinkedIn（文章）
- 标题: What GEO Work Actually Moves AI Crawlers? Our Data, and a New-Site Launch Checklist
- 摘要（约 60 词）:
  "We attributed two weeks of AI crawler traffic to nine GEO measures on geo010.com. Result: robots.txt + sitemap.xml + the homepage + real content produced nearly all real crawler traffic. llms.txt helped only GPTBot. FAQPage and AI discovery endpoints produced zero crawl visits — and we corrected two of our own earlier conclusions. Full data and a new-site launch checklist in the article."
- 链接: https://geo010.com/community/geo-impact-attribution-new-site.html
- 标签: #GEO #AI #ContentStrategy #DigitalMarketing

### 3. DEV.to
- 标题同上。
- 正文: 去掉站内侧边栏/评论区/JSON-LD 后的纯 Markdown（见文末复制说明）。
- tags（最多 5 个，全小写）: geo, ai, seo, content, marketing
- canonical_url: https://geo010.com/community/geo-impact-attribution-new-site.html
- 文末加原创声明段（同 Medium）。

### 4. Hashnode
- 标题同上。
- canonical: https://geo010.com/community/geo-impact-attribution-new-site.html
- 封面: https://geo010.com/og-image.png
- tags: geo, ai, content, seo

### 5. Reddit（r/SEO、r/ArtificialIntelligence、r/DigitalMarketing）
- 标题（不带"checklist"字样，防营销判定）:
  "We logged every AI crawler hit on our site for 2 weeks — here's which GEO work actually moved the needle"
- 首评即放数据要点 + 链接。
- 遵守 9:1 规则；不重复发多个 sub 的同一天。
- 备选标题: "LLMs.txt got 4 visits in 2 weeks. robots.txt got 68. Here's what we learned"

### 6. Indie Hackers
- 标题: What GEO Work Actually Moves AI Crawlers? (our data, + a new-site checklist)
- 走 founder story 角度：自建站点 + 爬虫日志 + 用数据砍掉无效工作。
- 链接 + 数据要点。

### 7. Hacker News（Show HN / 普通帖）
- 标题: We logged every AI crawler for 2 weeks and attributed GEO work to traffic
- 首评放方法论（去噪、自测过滤、伪造 UA 甄别），避免只发链接。

### 8. X / 微博（中文短帖，用于引流）
- 中文: "给 geo010.com 的 9 类 GEO 措施做了两周爬虫归因：真正起作用的是 robots.txt/sitemap/首页/真实内容；llms.txt 只有 GPTBot 看；FAQPage 和 AI 端点对抓取零作用。新站先做三件套+3-5篇真文章。英文全文→ https://geo010.com/community/geo-impact-attribution-new-site.html"

## 四、发布跟踪表

| 平台 | 链接 | 发布日 | 状态 | 备注 |
|------|------|--------|------|------|
| geo010.com（canonical） | https://geo010.com/community/geo-impact-attribution-new-site.html | 2026-08-16 | ✅ 已发布 | 已推送 df297aa |
| Medium | 待填 | | ⏳ | Import 模式 |
| LinkedIn | 待填 | | ⏳ | |
| DEV.to | 待填 | | ⏳ | |
| Hashnode | 待填 | | ⏳ | |
| Reddit | 待填 | | ⏳ | 9:1 规则 |
| Indie Hackers | 待填 | | ⏳ | |
| HN | 待填 | | ⏳ | |
| X | 待填 | | ⏳ | |

发布优先级（建议）：Medium → DEV.to → LinkedIn → Reddit → Indie Hackers → HN → X。
四个外链平台发布后，外链验收可补足到 ≥5 域名。

## 五、正文 Markdown 复制说明

从 HTML 转 Markdown 时：
1. 保留 blockquote 场景开场（转 Markdown 引用块）。
2. 两张对比表原样转 Markdown 表格。
3. H2 层级：How / Why / What / Should / Should NOT 全保留（问题式标题）。
4. FAQ 部分：转为 Markdown 小节，保留 Q/A 文本（各平台通常把 FAQPage 渲染成折叠项，转文本时保留完整问答内容）。
5. 删除：侧边栏、评论区、JSON-LD、51.la、导航链接。
6. canonical_url 只设给支持它的平台（DEV.to、Hashnode）；其余平台文末放原创声明段。
