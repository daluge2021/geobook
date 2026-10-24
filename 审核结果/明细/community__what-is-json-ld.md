# 审计明细：What is JSON-LD? — The Structured Data That Gets AI to Cite You

- 文件：docs/community/what-is-json-ld.html
- 页面类型：文章（社区，术语/技术型）
- 审计日期：2026-10-10
- 正文字数（近似）：950（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：JSON-LD 是用 Schema.org 词表向机器描述页面含义的 JSON 格式，由 @context、@type、properties 三元素构成，帮助 AI 识别实体、建立引用信任、理解结构、提取答案。
- 可被直接回答的 5 个用户问题：
  1. 问题：什么是 JSON-LD？ → 答案：一种基于 JSON、用 Schema.org 词表描述页面含义的格式，放在 <head> 的 <script type="application/ld+json"> 中。【原文证据："JSON-LD (JavaScript Object Notation for Linked Data) is a JSON-based format for describing a page's meaning to machines."】
  2. 问题：JSON-LD 由哪三个元素组成？ → 答案：@context（词表）、@type（对象类型）、properties（字段）。【原文证据：三元素列表】
  3. 问题：为什么 AI 引擎在意结构化数据？ → 答案：便于实体识别、引用信任、站点结构理解、答案抽取。【原文证据："Why Do AI Engines Care?" 表】
  4. 问题：JSON-LD 该放在页面哪里？ → 答案：<head>，绝不放 <body> 底部。【原文证据：FAQ "In the <head>, near your other metadata — never at the bottom of the <body>."】
  5. 问题：JSON-LD 能保证被 ChatGPT/Perplexity 引用吗？ → 答案：不能保证，但是强清晰/信任信号，是"前提条件而非魔法开关"。【原文证据："Structured data alone does not guarantee citations…Treat JSON-LD as a prerequisite, not a magic switch."】

## 2. 准确性测试
- 核心概念与术语理解：准确。JSON-LD 定义、三元素、head 放置、@id 锚点串联对象、WebSite/Organization/ItemList 用途等均符合 Schema.org 与 Google 文档通行做法。
- 数字、日期、对象、条件引用：无精确数字需要核验；schema 示例（WebSite 的 potentialAction/SearchAction）真实展示。声称 Google 推荐 JSON-LD（"the one Google recommends"）属可核验的通行事实，但本页未附官方链接。
- 断章取义 / 过度推断 / 遗漏限制条件：标题 "The Structured Data That Gets AI to Cite You" 语气偏承诺，但正文与 FAQ 明确 "does not guarantee citations"，形成自我修正，未构成误导。
- 前后矛盾 / 无法验证的事实：无内部矛盾；首页三个 JSON-LD 块声称 "live on <a>our homepage</a>" 可核验（内链）。"This maps to the five-step GEO loop from our own audit" 指向站内页，属内链。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| JSON-LD 定义与三元素 | 定义段 + 列表 | 无（规范类常识） | 可（schema.org 规范） | 是 | 官方链接 |
| Google 推荐 JSON-LD | "the one Google recommends" | 无 | 可（但未给链接） | 是 | Google 开发者文档链接 |
| 首页三块 schema 确实存在 | 代码块 + 内链首页 | 有（站内可核验） | 可 | 是 | — |
| AI 需要 vs JSON-LD 提供映射 | "What AI needs / What JSON-LD provides" 表 | 无 | 不可 | 部分 | 实测或研究 |
| 结构化数据提升引用 | FAQ 自我限定为"信号/前提" | 无 | 不可 | 部分 | 效果数据 |

> 注意：规范类陈述应可核验，但本页未附官方来源链接。

## 4. 独特价值测试
- 原创数据或实测结果：无。
- 独立研究 / 案例：以本站首页真实 JSON-LD（WebSite/Organization/ItemList）为活体示例，可核验。
- 独特方法 / 框架 / 分析：中等——把 JSON-LD 融入 GEO 语境（实体识别、引用信任、ItemList 作为"机器版站点地图"），并给出 JSON-LD vs Microdata vs RDFa 对比表与五条常见错误。
- 通用行业知识的重新表述：主体为 JSON-LD/结构化数据通用知识（定义、三元素、head 放置、常见错误）的清晰复述；增量在本站示例与 GEO 视角。
- 无法确认原创性者标注：AI 引用提升效果 待核实。

## 5. 可提取性测试
1. 问题：JSON-LD 的三元素是什么？
   - AI 可提取的答案：@context、@type、properties。
   - 原文证据："Every JSON-LD block is built from three elements" 列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：JSON-LD 放 body 会怎样？
   - AI 可提取的答案：仍能通过校验，但信号错误、破坏爬虫预期的约定。
   - 原文证据："Five Common Mistakes" 第一条。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：JSON-LD 与 Microdata/RDFa 有何区别？
   - AI 可提取的答案：JSON-LD 独立成块、易维护，Microdata/RDFa 属性内嵌 HTML。
   - 原文证据："JSON-LD vs Microdata vs RDFa" 表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：有了 llms.txt 还需要 JSON-LD 吗？
   - AI 可提取的答案：需要，二者职责不同、可叠加。
   - 原文证据：FAQ "Do I need JSON-LD if I already have an llms.txt?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
5. 问题：CommonMistakes 有哪些？
   - AI 可提取的答案：放 body、漏 @context、用错 @type、Article 缺日期、重复实体。
   - 原文证据："Five Common Mistakes"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 26 | 概念准确、有自我修正避免过度承诺 |
| 证据可追溯性 | 25 | 18 | 规范类陈述缺官方链接；首页示例可核验、AI 效果部分无来源 |
| 独特价值 | 25 | 16 | 通用 JSON-LD 知识的清晰重组 + 本站活体示例，增量有限 |
| 可提取性 | 10 | 10 | 问题式 H2、答案前置、代码块、表格、FAQ |
| 时效性与适用边界 | 10 | 8 | 有日期；适用边界说明较一般 |
| **总分** | **100** | **78** | |

### 最值得优先修改的 5 个具体位置
1. "JSON-LD is not the only structured-data syntax, but it is the one Google recommends"：补 Google 开发者文档链接。
2. "What is JSON-LD?" 定义段：附 schema.org 官方规范链接，使规范类陈述可核验。
3. "What AI needs / What JSON-LD provides" 表：为"GEO impact"列补充来源或明确标注为经验性判断。
4. 首页三个 schema 代码块：确认与当前线上 homepage 完全一致（若首页已改，需同步，避免"live on our homepage"失真）。
5. 五条常见错误建议补一条"多个 @type 对象缺共享 @id 时如何正确串联"的操作示例，衔接 Organization/WebSite 的 @id 说明。
