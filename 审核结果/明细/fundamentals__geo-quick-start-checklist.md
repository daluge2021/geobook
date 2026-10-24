# 审计明细：GEO Quick Start Checklist: 15-Minute Setup for AI Visibility

- 文件：docs/fundamentals/geo-quick-start-checklist.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：624

## 1. 核心答案提取

- 核心结论（≤100 字）：15 分钟最小可行 GEO 配置 = 创建 llms.txt + 添加 JSON-LD Article Schema + 答案前置段落 + 提交 sitemap 到 Bing Webmaster Tools；作者称这四项覆盖 AI 爬虫关注点的 80%。

- 可被直接回答的 5 个用户问题：
  1. 问题：最小可行的 GEO 配置需要多久、包含什么？ → 答案：15 分钟四项：llms.txt、JSON-LD Article Schema、答案前置段落、提交 sitemap 到 Bing Webmaster Tools。【原文证据：answer-box "The minimum viable GEO setup takes 15 minutes: create llms.txt, add JSON-LD Article Schema, write answer-first paragraphs, and submit your sitemap to Bing Webmaster Tools."】
  2. 问题：这份快速清单具体要勾选哪些项？ → 答案：技术 5 分钟（llms.txt 2min、JSON-LD 3min）+ 内容 5 分钟（answer-first 2min、对比表 3min）+ 发现 5 分钟（Bing Webmaster Tools 3min、robots.txt 放行 AI 爬虫 2min）。【原文证据："The 15-Minute GEO Checklist" 下 Technical/Content Optimization/Discovery 三组 li 的 time 标签】
  3. 问题：配置完成后多久能看到 AI 爬虫来抓？ → 答案：0-24 小时 Bingbot（每日抓取）；24-48 小时 ClaudeBot 索引；3-5 天 PerplexityBot 可能抓取；7-14 天引用潜力上升（取决于内容质量）。【原文证据："Expected Timeline" 表格四行】
  4. 问题：应该优先优化哪个 AI 爬虫？ → 答案：Bingbot 优先，因为 Bing 支撑 Copilot、ChatGPT web search 与 Perplexity 后端，且 Bing Webmaster Tools 能看到 Google Search Console 没有的 AI 搜索展示。【原文证据：FAQ "Which AI crawler should I optimize for first?" 段落】
  5. 问题：初期可以先跳过什么？ → 答案：非 FAQ 页面的 FAQPage Schema、AI discovery endpoints（/ai/*.json、ai.txt、openapi.json 在 12 天内 0 次爬虫访问）、Perplexity 专项优化（PerplexityBot 12 天仅 29 次命中）。【原文证据："What You Can Skip (For Now)" 三条列表】

## 2. 准确性测试

- 核心概念与术语理解：llms.txt、JSON-LD Article Schema、answer-first、robots.txt、Bing Webmaster Tools 的作用描述基本正确；**但影响表中 "GPTBot, ClaudeBot, and Amazonbot all respect it [llms.txt]" 属于存在误解** —— llms.txt 是社区提案，无任何引擎官方文档声明其爬虫读取该文件；正文也未声明这一点（对比同站 llms-txt-guide 有明确 scope note）。

- 数字、日期、对象、条件引用：
  - "AI cites tables 3x more than prose"、"FAQPage Schema gives 2x citation rate"、"covers 80% of what AI crawlers look for" —— 三个倍数/比例均无任何出处，待核实。
  - "4,115 AI crawler visits over 12 days"、"PerplexityBot 29 hits"、"endpoints 0 crawler visits" —— 第一方日志数据，未披露判定方法（UA 归类规则、站点类型、时间窗），也未链接站内数据页，原文证据不足以复现。
  - "ClaudeBot indexes new content within 24-48 hours on a predictable schedule"、"PerplexityBot may take 3-5 days" —— 无来源，待核实。
  - JSON-LD datePublished/dateModified 2026-09-01 与正文 "Published: September 1, 2026 · Updated: September 1, 2026" 一致（已核对，无矛盾）。

- 断章取义 / 过度推断 / 遗漏限制条件：
  - "Bing powers Copilot + ChatGPT search + Perplexity backend. One submission = 3 AI platforms." —— 把三个平台的搜索后端简化为 Bing 单一来源，2026 年语境下 ChatGPT 与 Perplexity 均在建设自有索引，此说法待核实/可能过时；且"一次提交=3 个 AI 平台"是过度推断（提交 sitemap 不等于被引用）。
  - "Google Search Console doesn't show AI search impressions" —— 待核实（Google 已在 GSC 推出 AI Mode 相关报表），作为 2026 年文章存在时效风险。
  - "Reduces AI's 'understanding cost' to milliseconds"、"Reduces AI parsing time from seconds to milliseconds" —— 无量化依据的修辞式断言。
  - FAQ "What's the minimum technical requirement?" 称 "The exception is Bingbot and GPTBot, which support JavaScript"，暗示其余爬虫（含 ClaudeBot）不渲染 JS —— 与同站 llms-txt-guide（称 ClaudeBot JS 支持弱但仍可能渲染）口径不一，且 ClaudeBot 实际 JS 渲染能力待核实。

- 前后矛盾 / 无法验证的事实：页内无直接自相矛盾；主要问题是全部量化结论（80%、3x、2x、时间表）均为不可验证的断言，页面未区分"本站观测"与"行业结论"。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 15 分钟四项配置覆盖 AI 爬虫关注点的 80% | answer-box、FAQ Q3 | 无 | 不可 | 否 | 80% 的定义与测量口径 |
| 表格被引用次数是散文的 3 倍 | Content Optimization 清单 | 无 | 待核实 | 部分 | 引用研究（如 arXiv:2311.09735）与统计口径 |
| FAQPage Schema 带来 2 倍引用率 | 影响表 JSON-LD 行 | 无 | 待核实 | 部分 | 数据来源、样本量 |
| 12 天 4,115 次 AI 爬虫访问 | 正文两处 | 无（未链站内 data/crawler-behavior-data.html） | 不可 | 部分 | 日志方法、UA 判定规则、站点上下文 |
| llms.txt 被 GPTBot/ClaudeBot/Amazonbot 遵守 | 影响表 llms.txt 行 | 无 | 不可 | 否 | 无公开依据；应改为社区提案+支持情况说明 |
| Bing 支撑 Copilot/ChatGPT search/Perplexity 后端 | FAQ Q2、影响表 | 无 | 待核实 | 部分 | 各引擎 2026 年索引来源的官方说明 |
| Bingbot 0-24h、ClaudeBot 24-48h、PerplexityBot 3-5 天 | Expected Timeline 表 | 无 | 待核实 | 部分 | 各爬虫官方 crawl 文档 |
| AI discovery endpoints 12 天 0 次访问 | What You Can Skip | 无 | 不可 | 部分 | 日志摘要、时间窗、UA 清单 |
| GSC 不显示 AI 搜索展示 | Discovery 清单、FAQ Q2 | 无 | 待核实 | 部分 | GSC AI Mode 报表现状 |

> 按规范：以上"文章声称数据成立"不等于数据已获验证；本页所有数字均为第一方或无来源断言。

## 4. 独特价值测试

- 原创数据或实测结果：有 —— 12 天 4,115 次 AI 爬虫命中、PerplexityBot 29 次、AI discovery endpoints 0 次。但未披露方法、无法独立复现，原创性与可靠性**待核实**（可能与站内 data/crawler-behavior-data.html 同源，本文未建立链接）。
- 独立研究 / 案例：无（未说明站点类型、行业或时间窗之外的上下文）。
- 独特方法 / 框架 / 分析：有结构化整理 —— "llms.txt/Schema/answer-first/Bing 四项 rule of thumb" + 分钟级时间预算 + Expected Timeline 表 + "可跳过项"清单（低优先级反向清单在同类文章中较少见）。框架为自有表述，但底层动作是通用 GEO 建议。
- 通用行业知识的重新表述：robots.txt 检查、sitemap 提交、答案前置、加对比表均为行业常识复述。
- 无法确认原创性者标注：3x / 2x / 80% 三个数字 → **待核实**；12 天爬虫数据 → **待核实**。

## 5. 可提取性测试

1. 问题：GEO 快速启动到底要做哪几件事？
   - AI 可提取的答案：四项（llms.txt、JSON-LD Article Schema、answer-first 段落、Bing Webmaster Tools 提交 sitemap）。
   - 原文证据：answer-box 首段 + 清单三组共 6 条。
   - 缺失信息：每项的验收标准与完成判定。
   - 是否需结合其他页面：否。
2. 问题：llms.txt 应该怎么写？
   - AI 可提取的答案：仅 "Format: one URL per line, no comments needed"。
   - 原文证据：Technical Setup 第 1 条。
   - 缺失信息：完整 Markdown 结构、h1/h2 分节约定、示例文件。
   - 是否需结合其他页面：是（fundamentals/llms-txt-guide.html 或 glossary/llms-txt.html）。
3. 问题：JSON-LD Article Schema 要包含哪些字段？
   - AI 可提取的答案：headline、datePublished、author、publisher，加到 `<head>` 中。
   - 原文证据：Technical Setup 第 2 条。
   - 缺失信息：完整代码示例、FAQPage 的适用条件（正文仅说"非 FAQ 页别加"）。
   - 是否需结合其他页面：是（technical/schema-markup-guide.html）。
4. 问题：新站做完 GEO 配置多久能被 AI 抓取/引用？
   - AI 可提取的答案：0-24h Bingbot、24-48h ClaudeBot、3-5 天 PerplexityBot、7-14 天引用潜力上升。
   - 原文证据：Expected Timeline 表。
   - 缺失信息：适用条件（站点权重、抓取预算）、时间表的数据来源；AI 无法判断该表可靠度。
   - 是否需结合其他页面：否（文内可答，但可靠性需外部核实）。
5. 问题：怎么验证我的 GEO 配置生效了？
   - AI 可提取的答案：部分可答 —— Bing Webmaster Tools 看 AI 搜索展示、robots.txt 检查四类爬虫未被屏蔽。
   - 原文证据：Discovery Setup 两条 + FAQ Q2。
   - 缺失信息：llms.txt 校验方法、引用监测手段、成功率基线。
   - 是否需结合其他页面：是（technical/geo-monitoring-tools.html 或 track-ai-citations.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 16 | "GPTBot/ClaudeBot/Amazonbot all respect llms.txt" 无依据；"Bing powers ChatGPT search + Perplexity backend" 待核实/过时；GSC 不显示 AI 展示待核实；3x/2x/80% 无据当事实；ClaudeBot JS 口径与同站页面不一 |
| 证据可追溯性 | 25 | 12 | 全页 9 项关键结论无一有外部来源；第一方爬虫数据未披露方法，且未链接站内数据页；属于"把未经证实的断言当事实" |
| 独特价值 | 25 | 17 | 有第一方 12 天爬虫实测与"可跳过"反向清单（稀有角度），但方法不可核验；框架多为通用建议的分钟级重组 |
| 可提取性 | 10 | 9 | 答案前置、清单/表格/FAQ 结构清晰，5 个常见问题中 3 个可独立回答 |
| 时效性与适用边界 | 10 | 6 | 有发布日期与时间表；缺 llms.txt 非官方标准的 scope note、单站 12 天数据的外推边界、爬虫行为变化的更新机制 |
| **总分** | **100** | **60** | 结构优秀但证据链几乎为空 |

### 最值得优先修改的 5 个具体位置

1. **"Why These 4 Things Matter Most" 表 → llms.txt 行**："AI crawlers check this first. GPTBot, ClaudeBot, and Amazonbot all respect it." —— 无任何官方依据；改为"llms.txt 为 llmstxt.org 社区提案，支持情况因引擎而异"，并注明本页数据仅代表本站观测。
2. **FAQ "Which AI crawler should I optimize for first?"**："Bing powers Copilot, ChatGPT web search, and Perplexity's backend." —— 补充 2026 年各引擎索引现状与来源，或降级为"历史上长期依赖 Bing 索引"。
3. **Content Optimization 清单第 2 条 + 影响表 JSON-LD 行**："AI cites tables 3x more than prose"、"FAQPage Schema gives 2x citation rate" —— 补引可核验研究（如 Princeton GEO 论文）或删除倍数改定性表述。
4. **answer-box 与 FAQ Q3**："covers 80% of what AI crawlers look for" —— 80% 无定义无测量，改为定性结论（"these four cover the essentials"）。
5. **Discovery Setup 第 1 条**："Google Search Console doesn't show AI search impressions." —— 核实 GSC AI Mode 报表现状并更新；同段补一句与 llms-txt-guide 一致的 llms.txt 非官方标准声明。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
