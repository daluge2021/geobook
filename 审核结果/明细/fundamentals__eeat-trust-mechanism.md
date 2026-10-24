# 审计明细：Why Should AI Trust You? — A Deep GEO Interpretation of E-E-A-T

- 文件：docs/fundamentals/eeat-trust-mechanism.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,900

> JSON-LD：headline 与 H1 一致；datePublished 2026-01-15，dateModified **2026-08-16**；正文 meta "Updated: **2026-07-28**" → **头部与正文日期不一致**。

## 1. 核心答案提取

- 核心结论（≤100 字）：E-E-A-T（经验/专业/权威/可信）是 Google 判断内容是否值得推荐的标准，在 AI 时代直接决定是否被引用——Yext 对 680 万次 AI 引用的分析称 86% 来自品牌可管理的权威来源，即"可信度 > 相关性"；AI 信任 = 内容质量(E-E-A-T) × 技术表达(结构化数据)。
- 可被直接回答的 5 个用户问题：
  1. 问题：E-E-A-T 是什么？ → 答案：Experience、Expertise、Authoritativeness、Trustworthiness 四个维度，Google 衡量"内容是否值得被推荐"的黄金标准；AI 搜索时代它直接决定 AI 是否愿意引用你。【原文证据：Section I 定义段 + FAQPage JSON-LD】
  2. 问题：为什么 AI 引用偏向高 E-E-A-T 内容？ → 答案：两点——训练阶段模型已从互联网数据中学到高 E-E-A-T 内容更可信；RAG 检索阶段来源可信度是检索器排序的重要信号，低 E-E-A-T 站点即使语义匹配也常排在后面。【原文证据：Section III 两个加粗段】
  3. 问题：E-E-A-T 四个维度分别怎么落地？ → 答案：Experience 用第一人称实测与过程细节；Expertise 展示作者资历（YMYL 需正式资质，非 YMYL 日常专长即可）；Authoritativeness 靠第三方背书（百科收录、白皮书案例、行业署名文章）；Trustworthiness 靠来源透明、数据可核验、利益披露、HTTPS。【原文证据：Section II 四个 Layer + Section III 检查表】
  4. 问题：结构化数据为什么能提升 AI 信任？ → 答案：Schema 用机器可读标签标出标题/作者/FAQ/评分，为 AI 创造"理解捷径"；优先落地 5 类——FAQ、Article、Person、Product、BreadcrumbList。【原文证据：Section IV】
  5. 问题：一周内怎么提升 AI 对我的信任？ → 答案：第 1–2 天在各 AI 平台搜品牌并记录描述；3–4 天用 Google Rich Results Test 检查并优先补 FAQ/Article Schema；第 5 天补作者页真实身份信息；6–7 天列出 3 家行业最权威媒体/机构并制定被引用计划。【原文证据：Section VI 六天排期】

## 2. 准确性测试

- 核心概念与术语理解：准确。E-E-A-T 四维定义、E 于 2022 年加入、YMYL 需正式资质/非 YMYL 重"日常专长"、Trust 为金字塔顶层的表述均与 Google 质量评估指南口径一致。
- 数字、日期、对象、条件引用：
  - "In 2025, Yext conducted a large-scale analysis of 6.8 million AI citation behaviors ... 86% of AI citations come from authoritative, verifiable sources"：**有可点击外部链接**（yext.com/research/article/ai-citations-user-locations-query-context），是本批 5 篇中唯一带真链接的关键数据 → 可核验（具体数值本次未逐项比对，标注：链接可达性与 6.8M/86% 数值待核实）。
  - "Experience added by Google in 2022"：准确。
  - "click-through rate increased by 22%"（Section II）：位于引号内的假设性示例语句中，属举例而非事实断言，可接受。
  - Schema 5 类、Rich Results Test 工具名称：准确。
- 断章取义 / 过度推断 / 遗漏限制条件：
  - **"Trustworthiness, not raw relevance, is what drives AI citation decisions"**：由"86% 引用来自权威可核验来源"推出"信任而非相关性驱动引用"，属于把相关性与可信度对立的过度推断——来源权威并不能证明相关性不起作用 → 需修正。
  - **"if Wikipedia and a small blog both discuss the same topic, AI will almost certainly choose Wikipedia"**：绝对化表述（"almost certainly"），无实证，属合理直觉但不宜作事实陈述。
  - "AI doesn't call a function called E-E-A-T score" 这一句已主动限缩，措辞得当。
- 前后矛盾 / 无法验证的事实：JSON-LD(2026-08-16) 与正文(2026-07-28) 日期不一致；页头 "All data is linked to verifiable sources" 实际正文仅 1 条外链（Yext），与"全部数据"的措辞不符。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 86% AI 引用来自权威、品牌可管理来源 | Section I + FAQPage | 有（Yext 研究，带链接） | 可（数值待核实） | 是（在其研究范围内） | 研究方法、平台覆盖范围 |
| 信任度 > 相关性驱动 AI 引用 | Section I 末段 | 无（基于 Yext 数据的解读） | 不可 | **部分**（数据不支持"相关性不重要"的对立结论） | 区分"来源类型"与"信任/相关"的论证 |
| AI 训练中已学到高 E-E-A-T 内容更可信 | Section III | 无 | 不可 | 部分（机制推测，合理但无出处） | 模型/论文层面引用 |
| 来源可信度是检索器排序信号 | Section III | 无 | 不可 | 部分（未指明是哪一引擎哪一代） | 引擎官方文档或研究 |
| RAG 检索偏好"具体细节"内容 | Section II | 无 | 不可 | 部分 | 对照实验 |
| E 于 2022 年加入 E-E-A-T | Section II | 无（公认事实） | 可（通行常识） | 是 | 可补 Google 官方博客链接 |
| article-meta "All data is linked to verifiable sources" | 元信息行 | — | — | **部分**：正文仅 1 条外链 | 扩充链接或收窄措辞 |

> 注意：本页是 5 篇中证据最好的一篇（有 1 条真实外链），但除 Yext 数据外，"AI 因果层面偏好 E-E-A-T"的核心论断均属机制推测，未获来源支持。

## 4. 独特价值测试

- 原创数据或实测结果：无（Yext 数据为第三方引用）。
- 独立研究 / 案例：无（跨境电商 A/B 人物对照、CTM 公司开场均为设定性举例）。
- 独特方法 / 框架 / 分析：**部分有**——E-E-A-T 金字塔层级重排（可信度为顶）、"AI Trust = E-E-A-T × Structured Data"乘法式表达（文中自认为比喻，未冒充事实）、内容层/技术层双维检查表、6 天行动计划，是较好的结构化整合与再组织。
- 通用行业知识的重新表述：四维定义、YMYL 说明、Schema 五类、权威背书途径属行业常识复述，约占篇幅 55–60%。
- 无法确认原创性者标注：检查表与行动计划的原创性待核实。

## 5. 可提取性测试

1. 问题：E-E-A-T 是什么意思？
   - AI 可提取的答案：Experience/Expertise/Authoritativeness/Trustworthiness，Google 衡量内容是否值得推荐的标准，AI 时代决定是否被引用。
   - 原文证据：Section I 定义段 + FAQPage。
   - 缺失信息：术语出处（Google 质量评估指南）的直接链接。
   - 是否需结合其他页面：是（深入见 glossary/eeat.html，本页有链接）。
2. 问题：AI 为什么会引用权威网站而不是小博客？
   - AI 可提取的答案：训练阶段已学到高 E-E-A-T 更可信；RAG 检索中来源可信度是排序信号；举例称同主题下 AI"几乎必然"选 Wikipedia。
   - 原文证据：Section III 两个加粗段 + Section II 第 3 层。
   - 缺失信息：具体引擎/研究证据，"almost certainly" 无实证。
   - 是否需结合其他页面：是（机制细节需 external 来源）。
3. 问题：怎么在内容里体现 E-E-A-T？
   - AI 可提取的答案：首人称实测与过程数据、展示作者资历与资质、引用权威来源、披露利益相关、标注数据来源与更新时间。
   - 原文证据：Section II 四个 Layer 的 bullet + Section III 检查表。
   - 缺失信息：各维度的量化评估方式。
   - 是否需结合其他页面：是（实施细节见 content/eeat-in-geo.html 与 brand/eeat-brand-implementation.html）。
4. 问题：哪些 Schema 对 E-E-A-T 最有用？
   - AI 可提取的答案：FAQ、Article、Person、Product、BreadcrumbList 五类，Person Schema 直接支撑 Expertise。
   - 原文证据：Section IV "The 5 Most Priority Schema Types"。
   - 缺失信息：代码示例（本页指向 glossary/schema.html）、各类型对 AI 引用的实测影响。
   - 是否需结合其他页面：是。
5. 问题：一周内能做什么来提升 AI 信任？
   - AI 可提取的答案：6 天排期——AI 平台描述诊断 → Rich Results Test + Schema → 作者页 → 3 家权威媒体背书计划。
   - 原文证据：Section VI。
   - 缺失信息：每步的判定标准与完成标志。
   - 是否需结合其他页面：是（可配合 fundamentals/geo-quick-start-checklist.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念与年份准确、限定语到位；扣分："trustworthiness not raw relevance" 由数据过度推断、"almost certainly choose Wikipedia" 绝对化、正文与 JSON-LD 日期不一致 |
| 证据可追溯性 | 25 | 18 | 全批唯一带真实外链的关键数据（Yext 6.8M/86%），但其余核心因果论断（训练偏好、检索信号）均无来源；meta 称"全部数据链接"而实际仅 1 条 |
| 独特价值 | 25 | 16 | 金字塔重排、乘法式表达、双维检查表与 6 天计划有结构化价值，无原创数据，约六成篇幅为常识复述 |
| 可提取性 | 10 | 9 | 答案前置、分层小节、表格检查表、FAQPage schema、通向 glossary 的深读链接，单页即可回答多数问题 |
| 时效性与适用边界 | 10 | 6 | 有日期但两处不一致（2026-08-16 vs 2026-07-28）；无更新机制；Google 框架与 Schema 类型会演进，未注适用范围 |
| **总分** | **100** | **73** | |

### 最值得优先修改的 5 个具体位置
1. 头部 JSON-LD `dateModified: 2026-08-16` vs 正文 "Updated: 2026-07-28"：统一日期，否则修改时间自相矛盾。
2. Section I 末句 "Trustworthiness, not raw relevance, is what drives AI citation decisions"：Yext 数据统计的是"来源类型"，不能推出"相关性不起作用"，应改为"来源可信度是关键因素之一"。
3. Section II "AI will almost certainly choose Wikipedia"：去掉绝对化措辞，或补实测证据（不同引擎在同主题下的实际选择分布）。
4. Section III "AI language models have already learned during training..." 与 "source credibility is an important ranking signal in the AI retriever's relevance ranking model"：两条核心因果论断零来源，至少补 1 条可核验引用，否则与页头"All data is linked to verifiable sources"冲突。
5. article-meta 来源声明：正文仅 Yext 一条链接，需为其余断言补链或把措辞收窄为"部分数据引自公开研究"。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
