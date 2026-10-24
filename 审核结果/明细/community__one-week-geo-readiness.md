# 审计明细：How We Made GEO Encyclopedia AI-Discoverable in One Week — a Site-Owner Playbook

- 文件：docs/community/one-week-geo-readiness.html
- 页面类型：文章（社区，实操复盘）
- 审计日期：2026-10-10
- 正文字数（近似）：1600（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO Encyclopedia 用一周（18 commits、5 条工作线）补齐"机器可读外围"——发现端点、schema、新鲜度同步、爬虫可观测——并总结出 7 步站点可发现性 playbook。
- 可被直接回答的 5 个用户问题：
  1. 问题：内容丰富的站点为何仍需 GEO？ → 答案：内容不等于 AI 可发现；答案引擎需先能找到、理解结构、信任实体。【原文证据："Content alone does not make a site AI-discoverable."】
  2. 问题：如何让站点对 AI 工具可发现？ → 答案：补齐 /.well-known、/ai/ JSON 端点、规范化 llms.txt。【原文证据："How Do You Make a Site Discoverable to AI Tools?" 三层表格】
  3. 问题：/ai/summary.json 对引用有帮助吗？ → 答案：帮助发现而非直接引用；缺失只是"未就绪"信号。【原文证据：FAQ "It helps with discovery, not citation directly."】
  4. 问题：爬虫可观测性能揭示什么？ → 答案：一周 2,335 请求；主流爬虫已在定期到访；新文当天被爬；大量为扫描噪声。【原文证据："What Does Crawler Observability Reveal?" 表】
  5. 问题：优化 AI 时不应做什么？ → 答案：不要伪造 sameAs 知识图谱链接；不要把私有遥测暴露给 AI。【原文证据："What Should You NOT Do When Optimizing for AI?" 两条】

## 2. 准确性测试
- 核心概念与术语理解：准确。access→orientation→entity 三层、机器可读外围、新鲜度契约等表述专业。
- 数字、日期、对象、条件引用：存在轻微口径出入——开场称站点有 "47 well-written articles"，后文又称 "verifiable freshness trail across all 48 pages"，两处计数不一致。另有一周数据："2,335 total requests"、"GPTBot 72, Googlebot 49, Applebot 46, Bingbot 38, PerplexityBot 18, ChatGPT-User 13, ClaudeBot 12"、"264 requests…all 404"。均有具体数值。
- 断章取义 / 过度推断 / 遗漏限制条件："What Do AI Assistants Say About One-Week Readiness?" 引用 2026 年 9 月向 ChatGPT/Claude/Perplexity/Grok 提问的结论并作成表，但未提供提问原文、日期截图或对话链接，属不可核验的第一方转述；文中也自我限定标题实为 "one-week AI-ready" 而非"被引用"。
- 前后矛盾 / 无法验证的事实：47 vs 48 篇文章计数不一致；"New article on launch day: crawled 6 times by GPTBot, ClaudeBot and others" 与站内 geo-impact 页后来判定该类计数为噪声（"each AI crawler visited the new page once"）冲突，属待核实。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 一周内补齐发现端点 | "18 commits, five workstreams"、端点表 | 有（Reddit 主来源链接） | 部分（可访 Reddit） | 部分 | 提交记录、端点实际内容 |
| 爬虫数据 2,335 / 各爬虫计数 | "What Does Crawler Observability Reveal?" 表 | 无 | 待核实 | 部分 | 日志导出 |
| 四引擎一致性结论 | "In September 2026, we asked ChatGPT, Claude, Perplexity and Grok…" | 无 | 不可 | 部分 | 对话截图/链接 |
| sameAs 造假有害 | 推理 + 建议 | 无 | 不可 | 是（逻辑上成立） | — |
| 47/48 篇文章 | 开场 blockquote 与正文 | 无 | 待核实 | 部分 | 准确计数 |

> 注意：多引擎结论为第一方转述，未附证据，不能等同于已核实。

## 4. 独特价值测试
- 原创数据或实测结果：有——一周 crawl 数据（2,335 请求、各爬虫分布、264 攻击请求），为本站自采。
- 独立研究 / 案例：本站自身一周 sprint 复盘。
- 独特方法 / 框架 / 分析：价值较高——7 步 playbook（access→orientation→discovery→schema→freshness→observability→re-audit）、三层发现文件表，以及"向四个 AI 引擎提问并比对"的独特做法（尽管未给证据）。
- 通用行业知识的重新表述：部分（schema 重要性、llms.txt 属常识）。
- 无法确认原创性者标注：四引擎问卷、精确计数 待核实。

## 5. 可提取性测试
1. 问题：一周内让站点 AI 可发现的步骤？
   - AI 可提取的答案：7 步（确认访问→发布 orientation→暴露发现端点→schema→新鲜度→可观测→再审计）。
   - 原文证据："How Can You Run the Same Playbook on Your Own Site?" 有序列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：AI 发现端点包含哪些文件？
   - AI 可提取的答案：/.well-known/ai.txt、ai.json、ai-plugin.json、openapi.json；/ai/summary.json、faq.json、service.json。
   - 原文证据：发现层表格。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：如何保持日期/新鲜度可信？
   - AI 可提取的答案：dateModified 与 sitemap lastmod 同步，datePublished 不变，构建时校验。
   - 原文证据："How Do We Keep Dates and Freshness Honest?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：一周内可发现 ≠ 被引用吗？
   - AI 可提取的答案：是，crawlability 一周内近乎确定，引用则可能但不保证。
   - 原文证据："crawlability and indexing are near-certain within a week; citations are possible but not guaranteed"。
   - 缺失信息：无。
   - 是否需结合其他页面：是（two-week-crawler-data）。
5. 问题：哪些"优化"其实不该做？
   - AI 可提取的答案：伪造 sameAs、暴露私有遥测。
   - 原文证据："What Should You NOT Do…" 两条。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念准确；47/48 计数不一致，四引擎结论不可核验，"6 次爬取"与他页冲突 |
| 证据可追溯性 | 25 | 18 | 第一方数据 + Reddit 主来源；引擎问卷与日志无公开证据 |
| 独特价值 | 25 | 21 | 原创一周实操 + 独特四引擎问卷 + 7 步框架 |
| 可提取性 | 10 | 10 | 问题式 H2、答案前置、表格、FAQ、编号清单 |
| 时效性与适用边界 | 10 | 8 | 有日期与 caveat；计数与时间口径需澄清 |
| **总分** | **100** | **81** | |

### 最值得优先修改的 5 个具体位置
1. 开场 "47 well-written articles" 与后文 "all 48 pages"：统一文章计数并注明时点。
2. "What Do AI Assistants Say About One-Week Readiness?" 全节：为四引擎结论补充提问原文/日期截图或对话链接，否则标注为"第一方转述、待核实"。
3. "New article on launch day: crawled 6 times"：与站内 geo-impact 页结论冲突，建议统一表述或加注修正说明。
4. "How Do We Keep Dates and Freshness Honest?" 段末 "a pre-publish check now fails a build if dateModified disagrees…"：建议说明该检查的实现/位置，便于读者复用。
5. "Primary Source" 段 Reddit 链接建议补充该帖与文中数据的一致性说明（哪些数字可在帖内验证）。
