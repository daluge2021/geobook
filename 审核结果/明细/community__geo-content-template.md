# 审计明细：The GEO Content Template — How We Structure Every Article So AI Cites Us

- 文件：docs/community/geo-content-template.html
- 页面类型：文章（社区）
- 审计日期：2026-10-10
- 正文字数（近似）：1150（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO 内容模板是一套面向 AI 检索/抽取/引用而设计的可复制页面结构——场景开场、问题式 H2、答案前置块、对比表、FAQPage JSON-LD 与发布前清单。
- 可被直接回答的 5 个用户问题：
  1. 问题：什么是 GEO 内容模板？ → 答案：为 AI 答案引擎"检索—抽取—引用"方式设计的可重复页面结构。【原文证据："A GEO content template is a repeatable page structure engineered for the way AI answer engines retrieve, extract, and cite content"】
  2. 问题：为什么有些页面被引用、有些被跳过？ → 答案：需通过 Retrieve/Extract/Cite 三阶段；被引用页 H2 匹配提问、答案在 H2 后首句、定义独立成引用块、有作者/日期/来源/结构化数据。【原文证据：三阶段表】
  3. 问题：为什么从编号 H2 换成问题式 H2？ → 答案：问题 H2 直接匹配用户提问形状，RAG 检索更直接；旧编号样式仍有效。【原文证据："question H2s map directly onto how a user asks…Both work — questions are the safer default."】
  4. 问题：模板用哪些结构化区块？ → 答案：场景 blockquote、定义 blockquote strong、对比表、FAQ+FAQPage JSON-LD、Article JSON-LD、BreadcrumbList。【原文证据："Which Structured Blocks Does the Template Use?" 表】
  5. 问题：发布前检查清单有哪些项？ → 答案：10 项，含 H1 长度、问题 H2、答案前置、定义独立块、表格、JSON-LD、canonical/RSS、日期同步、来源内链、结尾一句总结。【原文证据："What Does the Final Pre-Publish Checklist Look Like?" 有序列表】

## 2. 准确性测试
- 核心概念与术语理解：准确。RAG 检索/抽取/引用三阶段、答案前置、结构化数据、"片段形状"优先于文笔等表述符合 GEO/RAG 通行认知。
- 数字、日期、对象、条件引用：反复声称 "We have written 50 articles on this site"、"all 50 articles"、"every article in the nine chapters"。该"50 篇"为本文自述计数，本页未提供可核验清单；与站内其他页面（如 one-week 页声称 47/48 篇）存在数字口径不一致，属待核实。
- 断章取义 / 过度推断 / 遗漏限制条件："every figure on this site traces back to a named origin" 属对全站的自述性断言，本页未逐条举证。
- 前后矛盾 / 无法验证的事实：无内部逻辑矛盾；示例（Citation Share 开场、"JSON-LD vs Microdata vs RDFa" 表）均指向站内真实页面，可核验（内链）。"50 篇"计数不可核验。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 模板基于 50 篇实操提炼 | "We have written 50 articles on this site, watched what AI actually retrieves and quotes" | 无 | 待核实 | 部分 | 文章清单、检索/引用观测数据 |
| 被引用页 vs 被跳过页差异 | 三阶段对比表 | 无（内链 Citation Share / JSON-LD 页） | 可（部分，作为示例） | 部分 | 独立观测数据 |
| 问题 H2 更利于 RAG 检索 | "question H2s map directly onto how a user asks" | 无 | 不可 | 部分 | 检索实验对照 |
| 三类结构化区块有效 | 区块表 | 无（内链本站页面） | 可（示例真实存在） | 部分 | 效果数据 |
| 日期/来源等信任信号 | "Citations are a trust decision. Three signals…" | 无 | 不可 | 部分 | 来源引用 |

> 注意：文中示例页面链接真实存在，可验证"结构存在"，但不能验证"该结构带来引用"。

## 4. 独特价值测试
- 原创数据或实测结果：无量化数据；但声称"watched what AI actually retrieves and quotes"（观测，无数据呈现）。
- 独立研究 / 案例：以本站自身页面（Citation Share、What is GEO?、What is JSON-LD?）作为活体案例，具一定独特性。
- 独特方法 / 框架 / 分析：价值较高——一套完整、可复制的 GEO 内容结构框架（3 原则 + 3 阶段 + 区块表 + 10 项清单），且每点配真实页面示例；"numbered H2 vs question H2" 对照与分析属本站经验输出。
- 通用行业知识的重新表述：答案前置、FAQ 结构化、E-E-A-T 等属通用常识；本页的增量在"打包成模板 + 站内实证示例"。
- 无法确认原创性者标注：50 篇计数与"AI 实际引用观测" 待核实。

## 5. 可提取性测试
1. 问题：写 GEO 文章用什么问题式标题？
   - AI 可提取的答案：What / Why do / How do you / Which / Do I need 五类。
   - 原文证据："How Do You Write an H2 That RAG Retrieves?" 列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：GEO 页面开头怎么写？
   - AI 可提取的答案：场景式 blockquote 开场，不做问候。
   - 原文证据："It opens with a scenario, not a greeting"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：AI 引用页与被跳过页区别在哪？
   - AI 可提取的答案：三阶段差异表。
   - 原文证据："Stage / Quoted pages / Skipped pages" 表。
   - 缺失信息：量化效果。
   - 是否需结合其他页面：否。
4. 问题：发布前要检查什么？
   - AI 可提取的答案：10 项清单。
   - 原文证据："What Does the Final Pre-Publish Checklist Look Like?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
5. 问题：JSON-LD 是必须的吗？
   - AI 可提取的答案：非强制，但 Article+BreadcrumbList 是便宜的信任增益，FAQPage 增加被逐字引用的机会。
   - 原文证据：FAQ "Is JSON-LD mandatory in the template?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 25 | 概念准确、示例可核验；"50 篇"计数与他页冲突且未验证 |
| 证据可追溯性 | 25 | 16 | 多为第一方内链/自述，缺外部可核验来源与观测量化 |
| 独特价值 | 25 | 19 | 完整可复制的原创模板框架 + 真实活体示例 |
| 可提取性 | 10 | 10 | 问题式 H2、答案前置、表格与 10 项清单 |
| 时效性与适用边界 | 10 | 8 | 有日期、明确适用边界；缺更新机制说明 |
| **总分** | **100** | **78** | |

### 最值得优先修改的 5 个具体位置
1. 开头 blockquote "We have written 50 articles on this site"：与站内他页（47/48 篇）冲突，建议统一口径或改为"50+"并说明计数时点。
2. "Why Do Answer Engines Quote Some Pages and Skip Others?" 三阶段表：建议补充一次可复核的小样本观测（哪些页被引用），把"watched what AI retrieves"落成证据。
3. "Which Structured Blocks Does the Template Use?" 表末列示例多为内链，建议为每类区块附一个真实被引用的外部佐证或站内检索记录。
4. "How Do We Handle Trust, Dates, and Sources?" 段 "every figure on this site traces back to a named origin" 属全站断言，建议限定范围或删去。
5. 结尾清单第 8 条 "dateModified and sitemap <lastmod> are today"：建议补"仅在实质编辑时"的限定，避免鼓励无意义刷新日期。
