# 审计明细：What AI Assistants Say About Citation Share — A Four-Engine Field Test

- 文件：docs/cases/what-ai-assistants-say-citation-share.html
- 页面类型：案例
- 审计日期：2026-10-10
- 正文字数（近似）：1100

## 1. 核心答案提取
- 核心结论（≤100 字）：2026 年 9 月向 ChatGPT、Claude、Perplexity、Grok 四引擎提同一问题"citation share in GEO 是什么"。四引擎共识：它是 SOV 在 AI 时代的等价物、公式形态 = 你的引用 ÷ 总引用，mention≠citation，且尚无统一标准。分歧在于分母（按答案数 vs 按总引用数）。实操建议：锁同一方法论、按月跟踪趋势。
- 可被直接回答的 5 个用户问题：
  1. 问题：GEO 中的 citation share 是什么？ → 答案：定义查询集上 AI 答案中引用你域名的来源占总体引用（或答案数）的比例，是 AI 时代的 share of voice。【原文证据：Perplexity 共识陈述及 "The Shared Core Definition" 一节】
  2. 问题：citation 和 mention 有什么区别？ → 答案：mention 是品牌名出现在文字叙述中；citation 是答案明确以你的内容为支撑证据。四引擎都视 citation 为更强信号。【原文证据："Mention is not a citation" 一条】
  3. 问题：为什么不同 GEO 工具报出不同 citation share？ → 答案：无统一标准；查询集、分母定义（答案比例 vs 总引用比例）、模型覆盖不同。【原文证据：FAQ 第三条及 "Why This Matters for Your Dashboard"】
  4. 问题：排 Google 前十等于被 AI 引用吗？ → 答案：不。Grok 引用的研究显示 Google 前十结果与 AI 引用 URL 重叠仅约 12%。【原文证据："Rankings Correlate Only Weakly with AI Citations" 一节】
  5. 问题：平台方自己在统一这个指标吗？ → 答案：是。Bing Webmaster Tools 上线 AI Citation Share 指标与 AI Performance 报告，给出按 grounding query 的引用百分比与被引用 URL。【原文证据："Platforms Are Standardizing the Metric Themselves" 一节】

## 2. 准确性测试
- 核心概念与术语理解：准确。对 citation share 的两种分母口径（按答案数 vs 按总引用数）拆解清晰，并能解释不同工具数字差异的成因。
- 数字、日期、对象、条件引用：方法说明透明（2026 年 9 月、公共网页界面、回答经摘要）；具体示例数字（ChatGPT 25/100=25%、Grok 4/80=5%、Perplexity 35/250=14%）来源清楚为各家引擎举例。仅一处依赖二手转述："~12% overlap" 来自"Grok 引用的研究"，研究本身未点名。
- 断章取义 / 过度推断 / 遗漏限制条件：整体谨慎，正文多次提醒"与你同时正确的同事可能有不同分母"；未发现明显过度推断。"All data is linked to verifiable sources"字面上是指站内 about/metrics 页面，外部链接有限。
- 前后矛盾 / 无法验证的事实：正文将引擎回答当作行业事实转述（如 Bing 功能、12% 重叠），这些属于"AI 声称的事实"，文中虽在 method note 注明"trace back to sources cited in each engine's response"，但未列出实际来源，外部无法核验。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 四引擎定义收敛于五要点 | 各家回答经摘要引用 | 无（第一方实测） | 待核实 | 是（对"引擎说了什么"而言） | 原始对话/截图未公开 |
| 分母分两派（答案数 vs 总引用） | 对比表（ChatGPT/Claude/Perplexity/Grok） | 无 | 待核实 | 是 | 需逐条原始回复可查 |
| Google 前十与 AI 引用重叠约 12% | "Grok's answer cited studies" | 无（经 Grok 转述） | 不可 | 部分 | 点名研究名称，勿只经引擎转述 |
| Bing WMT 提供 AI Citation Share 与 AI Performance | 文中声明 + 指向站内 metrics/citation-share.html#tools | 间接 | 待核实 | 是 | 直链 Bing 官方文档页 |
| 建议锁方法论、看趋势 | ChatGPT 8%→17% 举例 | 无 | 不可 | 是（属合理建议） | 缺方法论选择的具体判据 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。

## 4. 独特价值测试
- 原创数据或实测结果：有——同题问四引擎并对比的现场测试（field test），含两派分母的并存对照，属本站一手数据。
- 独立研究 / 案例：有——四引擎横向对比本身即小型独立研究；Bing 平台功能的中文梳理。
- 独特方法 / 框架 / 分析：有——"测量漏斗"（AI Visibility → Mention Share → Citation Share → Recommendation Rate → 引流/转化）及反向诊断用法，是实现层方法。
- 通用行业知识的重新表述：citation share 基本定义、"没有统一标准"、"不要跨平台比绝对值"等，属行业常识复述。
- 无法确认原创性者标注：待核实（12% 重叠率的研究出处、Bing 功能细节）。

## 5. 可提取性测试
1. 问题：citation share 怎么定义？
   - AI 可提取的答案：定义查询集上引用你域名作为来源的比例，AI 时代 SOV 等价物。
   - 原文证据：首段加粗定义 + Perplexity 共识块。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：citation 和 mention 差别是什么？
   - AI 可提取的答案：citation 是答案以你内容为证据，mention 只是名字出现；citation 信号更强。
   - 原文证据："Mention is not a citation" 列表项。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：为何两个工具数字对不上？
   - AI 可提取的答案：分母口径与查询集不一致，都可能正确。
   - 原文证据："The Two Formulas in Practice" 及示例数字。
   - 缺失信息：如何选口径的判据。
   - 是否需结合其他页面：是（建议见 metrics/citation-share.html）。
4. 问题：Google SEO 排名 = AI 引用吗？
   - AI 可提取的答案：仅约 12% 重叠，GEO 是独立棋盘。
   - 原文证据：12% 一节。
   - 缺失信息：研究的名称/出处不可核验。
   - 是否需结合其他页面：否。
5. 问题：citation share 该单看一个数吗？
   - AI 可提取的答案：不应单看，用测量漏斗逐层诊断，追踪趋势而非绝对值。
   - 原文证据："Build a Measurement Funnel, Not a Single Number" 及结论句。
   - 缺失信息：无。
   - 是否需结合其他页面：是（漏斗落地需配合 metrics 章节）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 26 | 概念与分母拆解准确、限定到位；仅 12% 重叠等二手数字缺乏直接来源 |
| 证据可追溯性 | 25 | 17 | 第一方实测但原始回答未公开；转述行业事实（12%、Bing 功能）缺直链 |
| 独特价值 | 25 | 21 | 四引擎同题对比为原创实测，测量漏斗为独有框架；部分定义属常识复述 |
| 可提取性 | 10 | 9 | 定义前置、对比表与 FAQ 结构化清晰，可独立回答 |
| 时效性与适用边界 | 10 | 8 | 有测试日期与方法说明；引擎行为会随时间变化，缺有效期/复测机制说明 |
| **总分** | **100** | **81** | |

### 最值得优先修改的 5 个具体位置
1. （"Rankings Correlate Only Weakly" 一节）"~12% overlap"：改为直接点名研究（名称/机构/年份）或将数字标注为"经 Grok 转述，待核实"，并补直链。
2. （"Platforms Are Standardizing" 一节）Bing Webmaster Tools 的 AI Citation Share / AI Performance：补上 Bing 官方文档链接，替代站内转发链接。
3. （Method note 段）把"trace back to the sources cited in each engine's response"落成具体的来源清单或附录链接，避免"证据指向证据"。
4. （正文多处）"engine's answer cited studies / Three of the four engines mentioned"：对直接引用的引擎原话给出日期与摘要标注，便于他人复核。
5. （文章末）补一段"测试有效期"：说明引擎定义会随模型更新漂移、建议复测周期（如季度），落实时效边界。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。