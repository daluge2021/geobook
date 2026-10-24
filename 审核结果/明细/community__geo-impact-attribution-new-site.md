# 审计明细：What GEO Work Actually Moves AI Crawlers? Our Data, and a New-Site Launch Checklist

- 文件：docs/community/geo-impact-attribution-new-site.html
- 页面类型：文章（社区，数据型案例）
- 审计日期：2026-10-10
- 正文字数（近似）：1600（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：基于本站 15 天（2026-08-04 至 08-19）crawler 日志归因九项 GEO 措施——robots.txt 与 sitemap.xml 是唯一被所有主流 AI 爬虫使用的入口，AI discovery endpoints 与 FAQPage 对爬取零作用。
- 可被直接回答的 5 个用户问题：
  1. 问题：新站应为 AI 爬虫先建什么？ → 答案：正确的 robots.txt、每个 URL 返回 200 的 sitemap.xml、服务端渲染首页 + 几篇真文章。【原文证据："a correct robots.txt, a sitemap.xml where every URL returns 200, and a server-rendered homepage…plus a few genuinely useful articles"】
  2. 问题：/ai/summary.json 等发现端点有用吗？ → 答案：15 天日志内零请求；爬虫通过 robots/sitemap 发现内容。【原文证据："never requested /ai/summary.json, /ai/faq.json, /.well-known/ai.txt or ai-plugin.json"】
  3. 问题：GPTBot 与 ClaudeBot 行为有何不同？ → 答案：ClaudeBot 恪守 robots/sitemap（各 104 次）但极少进内容页；GPTBot 几乎不读 robots，遍历全站（121 个内容页）。【原文证据："ClaudeBot follows the classic crawl path…GPTBot ignores robots.txt almost entirely"】
  4. 问题：加 FAQPage 标记会让页面被更多爬取吗？ → 答案：无可见爬取效果，属引用层杠杆。【原文证据："In our data, no measurable crawl effect."】
  5. 问题：之前的分析哪里错了？ → 答案：把"新文章发布日被爬 6-10 次"归为发布效应，实为浏览器/自测/噪声。【原文证据："most of those hits were browser visitors and our own checks; each AI crawler visited the new page once."】

## 2. 准确性测试
- 核心概念与术语理解：准确。crawler user agent 可伪造、需交叉验证 path/status；robots/sitemap 为传统入口；FAQPage 属引用层而非爬取层——表述专业且区分清晰。
- 数字、日期、对象、条件引用：数据窗口明确（August 4–19, 2026），逐条给出计数（ClaudeBot 104、Googlebot 32、GPTBot 121 内容页、GPTBot 单次遍历 "touching 60 pages"、08-17 总计 1,066/371 个 200）。数字相互一致，并明确"crawler label is only a user agent…we cross-checked"。
- 断章取义 / 过度推断 / 遗漏限制条件：方法限制有专门说明（user agent 伪造、自身 curl 流量过滤）；结论限定为"in our logs"。表现克制。
- 前后矛盾 / 无法验证的事实：无内部矛盾；作者主动列出并修正早前文章的错误归因（"What Did We Get Wrong in Earlier Analyses?"），诚实度高。数据为第一方、无公开日志文件可外部核验。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| robots/sitemap 是唯一通用入口 | 归因表（ClaudeBot 104、Bingbot 11、GPTBot 9 等） | 无（第一方日志） | 待核实（无公开数据集） | 是（对本站样本成立） | 日志导出/截图 |
| discovery endpoints 零请求 | "0 requests in 15 days" | 无 | 待核实 | 是 | 原始计数 |
| GPTBot 121 内容页 / 单次 60 页 | 正文与 Aug 17 表 | 无 | 待核实 | 是 | 日志明细 |
| FAQPage 无爬取效果 | "0 visits from major AI crawlers after shipping" | 无 | 待核实 | 是 | 变化前后对照 |
| 早前归因错误 | "What Did We Get Wrong" 列表 | 无 | 可（自我修正） | 是 | — |

> 注意：第一方日志方法透明，但无外部/可下载数据，他人无法独立复算。

## 4. 独特价值测试
- 原创数据或实测结果：有，且是本页核心——15 天逐请求归因、按 crawler 与 path 分类的原创实测数据。
- 独立研究 / 案例：本站自建 Worker+D1 的爬虫归因案例。
- 独特方法 / 框架 / 分析：高价值——提出"crawl foundation（robots+sitemap+homepage) vs citation-layer优化"的分层框架，并给出可复制的新站 launch checklist。
- 通用行业知识的重新表述：部分（"robots.txt 重要"属常识），但被原创数据证实并量化。
- 无法确认原创性者标注：具体计数 待核实（无公开数据）。

## 5. 可提取性测试
1. 问题：新站上线的爬取前置工作有哪些？
   - AI 可提取的答案：四项（正确 robots、100% 有效 sitemap、服务端渲染首页、先发 3-5 篇真文章）。
   - 原文证据："What Should a New Site Build First?" 有序列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：哪些 GEO 动作对爬取无效？
   - AI 可提取的答案：AI 发现端点、全站 FAQPage、监控面板、freshness plumbing（作为优先项）。
   - 原文证据："What Should a New Site NOT Build First?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：ClaudeBot 和 GPTBot 该分别怎么应对？
   - AI 可提取的答案：ClaudeBot 依赖 robots/sitemap，需保证其正确；GPTBot 遍历全站，需保证内容深度。
   - 原文证据：两爬虫行为对比表。
   - 缺失信息：其他引擎爬虫。
   - 是否需结合其他页面：是（per-engine 页）。
4. 问题：如何判断爬取增长是真是假？
   - AI 可提取的答案：看路径不看总量；攻击者借用爬虫名。
   - 原文证据："How Do You Tell a Real Spike…"（本页含此主题于"What Three More Days Confirmed"）。
   - 缺失信息：具体过滤规则。
   - 是否需结合其他页面：是（two-week-crawler-data）。
5. 问题：FAQPage 有什么用？
   - AI 可提取的答案：引用层杠杆——页面已被考虑时提升被引用机会，非爬取驱动。
   - 原文证据：FAQ "Does adding FAQPage markup get a page crawled more?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 27 | 概念准确、口径透明、主动修正旧结论；仅限单站样本 |
| 证据可追溯性 | 25 | 19 | 第一方实操数据、方法透明并自陈局限；但无公开数据集、无外部可核验 |
| 独特价值 | 25 | 23 | 原创 15 天逐请求归因 + 修正旧错误 + 可复制 checklist |
| 可提取性 | 10 | 10 | 问题式 H2、答案前置、多表格、FAQ |
| 时效性与适用边界 | 10 | 8 | 有明确日期窗口与方法边界；样本单站单周期 |
| **总分** | **100** | **87** | |

### 最值得优先修改的 5 个具体位置
1. "How Did We Attribute Traffic to Each GEO Measure?" 段：建议公开或附上日志聚合结果（CSV/图表链接），让第一方数据可被外部复核。
2. 归因表 "Impact" 列：将 "Highest / High / Low" 等定性词补上判定阈值（如"≥N 次/周期"）。
3. "Why Do GPTBot and ClaudeBot Crawl Completely Differently?" 小节：明确标注该差异的观测窗口与是否跨多个版本，避免被当作引擎的固定特性。
4. 正文 "GPTBot…reads llms.txt occasionally" 与表格 "llms.txt…only GPTBot treats it as an entry" 应统一表述（前者更弱）。
5. "What Three More Days Confirmed" 段：Aug 17 "1,066 / 371 个 200" 建议说明攻击噪声占比口径，便于复算。
