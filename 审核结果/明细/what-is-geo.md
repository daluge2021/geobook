# 审计明细：What is GEO? — A Complete Guide to Generative Engine Optimization

- 文件：docs/what-is-geo.html
- 页面类型：文章（GEO 入门快答页；canonical 指向 `fundamentals/what-is-geo.html`，本页为简版入口页）
- 审计日期：2026-10-10
- 正文字数（近似）：约 500 词（英文，含对比表格）

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO 是优化品牌内容以在 AI 回答中获得优先呈现的方法论，针对大模型的检索与生成机制；以 RAG 检索环节为主战场，按"诊断→答案资产→技术实施→监测迭代"四步执行，与 SEO 并行而非替代。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is GEO? → 答案：GEO (Generative Engine Optimization) 是优化品牌内容使其在 AI 回答中被优先呈现的方法论，目标是 ChatGPT、豆包、DeepSeek、Gemini 等大模型的检索与生成机制。【原文证据：answer-box "In one sentence" 段】
  2. 问题：GEO 的核心机制是什么？ → 答案：底层是 RAG，分检索（语义向量找相关片段）、增强（附加参考材料）、生成（基于问题+材料生成回答）三步；GEO 的目标是在检索环节被选中，AI 选取依据为相关性、可信度（E-E-A-T）、结构清晰度（Schema）。【原文证据：第 II 节 "The Core Mechanism of GEO"】
  3. 问题：GEO 和 SEO 有什么区别？ → 答案：SEO 面向传统搜索引擎，成功指标是排名+点击；GEO 面向 AI 大模型，指标是 AI 引用+品牌提及；GEO 不是 SEO 的替代品而是进化版，可并行优化。【原文证据：第 III 节对比表 + "GEO is not a replacement for SEO, but an evolved version."】
  4. 问题：如何实施 GEO？ → 答案：四步：诊断现状（在 AI 平台搜品牌词看引用情况）→ 答案资产创作（把常见客户问题写成前置答案）→ 技术实施（Schema、LLMs.txt、开放 AI 爬虫）→ 监测迭代（定期测 citation share）。【原文证据：第 IV 节 "The Four Steps of GEO"】
  5. 问题：为什么现在要做 GEO？ → 答案：文章给出三点：90% 的企业尚未入场（窗口期）、获客成本降低 32%-62%、1-3 个月即可见效。【原文证据：第 V 节 "Why Do GEO Now?"；注：三个数字原文均无来源，见第 2、3 节】

## 2. 准确性测试
- 核心概念与术语理解：zero-click search、RAG、E-E-A-T、Schema、citation share 等术语使用基本准确（准确）；但两处有偏差——(a) "GEO 的底层技术基础是 RAG" 属过度断言，RAG 只是 AI 获取外部信息的机制之一，并非所有 AI 回答都走联网 RAG；(b) RAG 第一步描述为 "searches the internet"，遗漏了基于内部知识库/向量库的 RAG 场景。
- 数字、日期、对象、条件引用：68% 无点击（引 SparkToro，2026 年初，2024 年为 60%）与所链文章标题 "less than one-third... still send a click" 方向一致；Gartner 2026 年搜索流量降 25%（引 2024-02-19 新闻稿）引用形式规范、可核验——以上待与原文逐字核实（待核实）。问题数字："90% of businesses haven't entered the game yet"、"Customer acquisition costs reduced by 32%-62%"、"GEO 见效 1-3 个月 / SEO 3-6 个月" 均为无来源的事实性断言。
- 断章取义 / 过度推断 / 遗漏限制条件："AI 推荐自带信任、转化更高" 将 32%-62% 的降幅直接归因为 GEO，无条件限定（行业、样本、口径均缺）；"1-3 个月见效" 未说明前提（内容基础、品牌已有提及等）。
- 前后矛盾 / 无法验证的事实：**日期矛盾**——页面可见 "Last updated: 2026-07-08"，JSON-LD `datePublished` 为 2026-07-28、`dateModified` 为 2026-08-16，三者互不一致；正文无其他自相矛盾；90%、32%-62% 无法在文中验证。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 2026 年初约 68% Google 搜索无点击（2024 年为 60%） | 第 I 节，附 SparkToro 链接 | 有（sparktoro.com 博文） | 待核实 | 部分（链接标题与数字方向一致，未逐字比对正文） | 引用具体图表/日期 |
| 2026 年传统搜索流量将降 25% | 第 I 节，附 Gartner 2024-02-19 新闻稿链接 | 有（gartner.com） | 待核实（链接与标题格式规范） | 部分 | 无（该断言形式规范） |
| GEO 底层技术基础是 RAG，分三步 | 第 II 节 | 无 | 不可 | 部分（通用机制描述，非可引证研究） | 标注为通用简化说明或加来源 |
| AI 选取引用的三标准：相关性/可信度/结构清晰 | 第 II 节 | 无 | 不可 | 部分（属本站归纳框架，未声明） | 标注"本站框架"或给出处 |
| GEO 见效 1-3 个月 / SEO 3-6 个月 | 第 III 节表格 | 无 | 不可 | 否（无数据支撑，且为绝对化区间） | 来源或改为条件性表述 |
| 90% 企业尚未入场 GEO | 第 V 节 | 无 | 不可 | 否（无出处的精确百分比） | 删除或补来源 |
| 获客成本降低 32%-62% | 第 V 节 | 无 | 不可 | 否（最可疑：精确区间+无来源+无口径） | 补研究来源、样本与适用条件 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。上表中第 3-7 行均为未经证实的断言。

## 4. 独特价值测试
- 原创数据或实测结果：无（68%、25% 均引自外部；90%、32%-62% 无来源，不能视为本站数据，标"待核实"）
- 独立研究 / 案例：无
- 独特方法 / 框架 / 分析：四步法（Diagnose→Answer Assets→Technical→Monitor）与 SEO/GEO 五维对比表属结构化整理，"AI 引用三标准"为归纳框架——但均未声明原创，是否独创待核实
- 通用行业知识的重新表述：RAG 三步解释、zero-click 背景说明、"GEO 是 SEO 的进化而非替代" 均为行业常识复述
- 无法确认原创性者标注：四步法与对比表的原创性待核实

## 5. 可提取性测试
模拟 5 个相关问题，逐一输出：
1. 问题：GEO 多久能看到效果？和 SEO 比哪个快？
   - AI 可提取的答案：文章称 GEO 1-3 个月见效，SEO 需 3-6 个月
   - 原文证据：第 III 节表格 "Time to Results" 行 + 第 V 节第 3 点
   - 缺失信息：来源、前提条件、行业差异
   - 是否需结合其他页面：否（可独立回答，但答案可靠性低）
2. 问题：AI 依据什么决定引用哪条内容？
   - AI 可提取的答案：相关性（直接回答问题）、可信度（符合 E-E-A-T）、结构清晰（Schema 维护良好）
   - 原文证据：第 II 节末段
   - 缺失信息：三者的权重、具体判定细节
   - 是否需结合其他页面：是（详细机制在 `fundamentals/eeat-trust-mechanism.html` 与 `technical/schema-markup-guide.html`）
3. 问题：GEO 主要针对哪些 AI 平台？
   - AI 可提取的答案：ChatGPT、豆包（Doubao）、DeepSeek、Gemini（定义段），正文另提及 ChatGPT/Doubao/DeepSeek
   - 原文证据：answer-box 定义句 + 第 I 节首段
   - 缺失信息：Perplexity、Copilot 等其他主流引擎未覆盖，各平台差异未说明
   - 是否需结合其他页面：是（分引擎优化在 `technical/per-engine-optimization.html`）
4. 问题：做 GEO 会不会取代/影响现有 SEO 投入？
   - AI 可提取的答案：不会，GEO 是 SEO 的进化版而非替代，良好 SEO 基础是 GEO 成功前提，可并行优化
   - 原文证据：第 III 节末段 + FAQPage JSON-LD 第二问
   - 缺失信息：预算分配建议、冲突场景
   - 是否需结合其他页面：是（深入对比在 `fundamentals/seo-vs-geo.html`）
5. 问题：零点击搜索的最新数据是多少？
   - AI 可提取的答案：2026 年初约 68% Google 搜索无点击（2024 年为 60%），Gartner 预测 2026 年传统搜索流量降 25%
   - 原文证据：第 I 节，附 SparkToro 与 Gartner 外链
   - 缺失信息：SparkToro 数据的具体口径（dateModified、样本）、Gartner 预测原文未转述限定条件
   - 是否需结合其他页面：否（外链可直接核验）

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 20 | 核心概念与外部数据引用基本准确，但 "GEO 底层基础是 RAG" 过度断言；90%、32%-62%、1-3 个月等无依据断言以事实口吻陈述；页面日期与 JSON-LD 三处不一致 |
| 证据可追溯性 | 25 | 15 | 仅 SparkToro、Gartner 两处带链接来源（待逐字核实）；第 V 节全部关键营销数字无来源且未标注，属把未证实断言当事实 |
| 独特价值 | 25 | 15 | 四步法与对比表为结构化整理但非可确认原创；无原创实测/独立数据；多为常识复述 |
| 可提取性 | 10 | 9 | 一句话答案前置、h2 结构清晰、FAQPage schema 与正文一致，核心问题可独立回答 |
| 时效性与适用边界 | 10 | 6 | 有 last updated 日期但与 JSON-LD 矛盾；无适用边界（平台覆盖、数字口径、见效前提）与更新机制说明 |
| **总分** | **100** | **65** | |

### 最值得优先修改的 5 个具体位置
1. 第 V 节 "Customer acquisition costs reduced by 32%-62%"：精确区间且完全无来源、无口径，是全页最易被 AI 引用后证伪的断言；补研究出处（含样本与条件）或删除。
2. 第 V 节 "90% of businesses haven't entered the game yet"：无来源精确百分比，补来源或改为定性表述（"多数企业尚未系统布局"）。
3. 元信息行 "Last updated: 2026-07-08"（h1 下方）：与 JSON-LD `datePublished` 2026-07-28、`dateModified` 2026-08-16 三处不一致，应统一为同一真实日期。
4. 第 III 节表格 "Time to Results: SEO 3-6 Months / GEO 1-3 Months"：无来源的绝对化区间，改为条件性表述（"在内容基础较好的情况下，通常……"）或加引用。
5. 第 II 节首句 "The underlying technical foundation of GEO is RAG"：改为 "one of the key mechanisms GEO relies on" 并注明此为简化模型，同时修正三步描述中 "searches the internet" 以涵盖非联网 RAG 场景。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
