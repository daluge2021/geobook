# 审计明细：What is LLMs.txt? — AI Crawler Infrastructure

- 文件：docs/glossary/llms-txt.html
- 页面类型：术语
- 审计日期：2026-10-10
- 正文字数（近似）：520（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：LLMs.txt 是放在站点根目录、面向大模型的 Markdown 纯文本清单，用一句话描述告诉 AI 哪些页面最重要；它由社区提议（llmstxt.org）而非官方标准，仅支持的引擎会读，与 sitemap.xml 互补而非替代。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is LLMs.txt? → 答案：根目录下（如 example.com/llms.txt）面向 LLM 的纯文本文件，提供站点内容与重点页面的结构化摘要；是社区提议、非官方标准，仅支持它的引擎会读。【原文证据：answer-box 一句话定义】
  2. 问题：What is the difference between LLMs.txt and sitemap.xml? → 答案：受众（搜索引擎 vs AI 模型）、格式（XML vs Markdown）、语义（仅 URL 与更新频率 vs 每页一句话描述）、优先级提示（priority 字段 vs 自然语言排序）、排除规则（无 vs 建议低优先页）五维不同，二者互补不互斥。【原文证据：第 2 节五行对比表 + 表后句】
  3. 问题：What does an LLMs.txt file look like? → 答案：Markdown——一级标题写品牌名，二级标题分区（Core Products/FAQ/Not Recommended），每行 `- [描述](URL)`。【原文证据：第 3 节 code 示例六行】
  4. 问题：How to implement LLMs.txt in 30 minutes? → 答案：4 步——查 robots.txt（5 分钟）→ 建 LLMs.txt（10 分钟）→ 测 AI 抓取（10 分钟，Perplexity 搜品牌词）→ 查服务器响应（5 分钟）。【原文证据：第 5 节有序列表】
  5. 问题：How are AI crawlers different from Googlebot? → 答案：JS 渲染能力不同、超时更短（数百毫秒无响应可能跳过）、robots.txt 规则需逐一确认、爬虫类型更多（GPTBot、ClaudeBot、Google-Extended、PerplexityBot、CCBot）。【原文证据：第 4 节四点列表】

## 2. 准确性测试
- 核心概念与术语理解：准确且边界意识好——明确"community proposal (llmstxt.org), not an official standard"、"advisory, and only read by supporting engines"、"not replacements — they are complements"，未夸大作用。
- 数字、日期、对象、条件引用："few hundred milliseconds" 超时无来源、待核实；30 分钟拆解（5/10/10/5）为规划性经验值；爬虫名单（GPTBot、ClaudeBot、Google-Extended、PerplexityBot、CCBot）对象明确但无出处。
- 断章取义 / 过度推断 / 遗漏限制条件："Google mostly ignores [priority]" 属常见说法但无来源；"AI crawlers' JS engines may not fully render all content" 未给出具体引擎差异。
- 前后矛盾 / 无法验证的事实：文件名大小写不一致——answer-box 写 `llms.txt`（URL 路径），第 5 节步骤写 "Create LLMs.txt"，URL 大小写敏感场景下会误导操作；h1 "What is LLMs.txt? — AI Crawler Infrastructure" 与 `<title>`/JSON-LD headline "A Guide for AI Crawlers" 不一致；正文 "Last updated: 2026-07-16" 早于 datePublished 2026-07-28、且与 dateModified 2026-10-10 不一致。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| LLMs.txt 是社区提议非官方标准 | answer-box | 无链接（文字提及 llmstxt.org） | 待核实 | 部分 | 链接至 llmstxt.org 原始提案 |
| sitemap priority 字段被 Google 忽视 | 第 2 节表格 | 无 | 不可 | 部分 | Google 官方文档引用 |
| AI 爬虫数百毫秒无响应即跳过 | 第 4 节列表 | 无 | 不可 | 否 | 各爬虫超时实测数据 |
| AI 爬虫 JS 渲染能力弱于 Googlebot | 第 4 节列表 | 无 | 不可 | 部分 | 渲染对比测试 |
| LLMs.txt 格式与写法 | 第 3 节示例 | 无（指向社区规范） | 部分 | 是 | 引用规范文档原文 |

> 注意：本页全部论断均为第一方整理，无一条外部可核验引用；多数属规范性建议，但超时与渲染差异属可测事实却未给依据。

## 4. 独特价值测试
- 原创数据或实测结果：无。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：有——三关（Crawl/Parse/Index）基础层框架、五维 sitemap 对照表、四步 30 分钟实施清单、格式示例，作为术语页的操作性较强；均为整理而非原创。
- 通用行业知识的重新表述：AI 爬虫类型、robots.txt 检查、sitemap 作用属常识复述。
- 无法确认原创性者标注：待核实（30 分钟拆解与三关框架的原创来源）。

## 5. 可提取性测试
1. 问题：What is LLMs.txt?
   - AI 可提取的答案：根目录面向 LLM 的 Markdown 纯文本摘要文件，社区提议、非官方标准，仅支持的引擎读取。
   - 原文证据：answer-box。
   - 缺失信息：llmstxt.org 规范的可点击链接。
   - 是否需结合其他页面：否。
2. 问题：LLMs.txt vs sitemap.xml — which do I need?
   - AI 可提取的答案：两者互补；对比表五个维度（受众/格式/语义/优先级/排除）。
   - 原文证据：第 2 节表格 + 表后句。
   - 缺失信息：priority 被忽略的官方出处。
   - 是否需结合其他页面：部分（细节需 technical/llms-txt-advanced.html）。
3. 问题：How do I write an LLMs.txt file?
   - AI 可提取的答案：Markdown 分区 + `- [描述](URL)` 列表，含 Core Products/FAQ/Not Recommended 示例。
   - 原文证据：第 3 节 code 示例。
   - 缺失信息：完整语法（块引用、可选章节）与行数建议。
   - 是否需结合其他页面：是（完整规范需 fundamentals/llms-txt-guide.html）。
4. 问题：How long does LLMs.txt implementation take?
   - AI 可提取的答案：约 30 分钟，分查 robots、建文件、测抓取、查响应四步。
   - 原文证据：第 5 节有序列表。
   - 缺失信息：大型站点/多子域场景的例外说明。
   - 是否需结合其他页面：否。
5. 问题：Do AI crawlers read my site like Googlebot?
   - AI 可提取的答案：不同——JS 渲染、超时、robots 规则、爬虫类型四方面差异。
   - 原文证据：第 4 节列表。
   - 缺失信息：各爬虫 UA 与超时的具体数据。
   - 是否需结合其他页面：是（爬虫管理需 technical/ai-crawler-management.html）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 25 | 概念与边界表述准确；超时数字无据、文件名大小写与 h1/title 不一致 |
| 证据可追溯性 | 25 | 15 | 全文零外部引用（llmstxt.org 未链接），多为规范性建议且标注清楚 |
| 独特价值 | 25 | 15 | 三关框架+对照表+30 分钟清单结构完整，但纯属整理无原创 |
| 可提取性 | 10 | 8 | 答案前置、表格与代码示例清晰；h1 与 title 不一致影响标题提取 |
| 时效性与适用边界 | 10 | 7 | 边界说明为五页最佳（非标准/仅支持引擎读取），但三处日期互相矛盾 |
| **总分** | **100** | **70** | |

### 最值得优先修改的 5 个具体位置
1. `<title>`/JSON-LD headline（"A Guide for AI Crawlers"）与 h1（"AI Crawler Infrastructure"）不一致：统一标题，避免摘要与页面主题错配。
2. 正文 "Last updated: 2026-07-16" 与 datePublished 2026-07-28、dateModified 2026-10-10 三处不一致：统一并说明改了什么。
3. 第 4 节 "no response within a few hundred milliseconds"：无来源且可能与实际爬虫超时不符，需实测数据或删除具体量级。
4. 第 5 节 "Create LLMs.txt" 与 answer-box `example.com/llms.txt` 大小写不一：统一为实际可用的小写路径。
5. answer-box 中 "llmstxt.org" 与全文：应给出可点击的原始规范链接，补足外部可核验来源。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
