# 审计明细：Why AI Answers Change: Result Fluctuation and the Myth of Guaranteed Rankings

- 文件：docs/cases/why-ai-answers-vary.html
- 页面类型：文章（案例栏目）
- 审计日期：2026-10-10
- 正文字数（近似）：1400（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：AI 答案输出"结构性地不稳定"，波动来自检索集变化、模型更新、采样方差、内部 A/B 与用户上下文五种机制；"保证排名"不真实，只有"持续趋势"可追求。
- 可被直接回答的 5 个用户问题：
  1. 问题：为什么同一个 AI 问题不同天答案不同？ → 答案：检索集变化、模型权重更新、采样方差、引擎内部实验共同作用，属正常。【原文证据："The retrieval set changes as model weights get updated, sampling adds randomness, and engines A/B test ranking internally."（FAQ/JSON-LD 文字）】
  2. 问题：AI 答案波动多少算正常？ → 答案：独立 2026 监测常见报告 40-60% 的答案月环比发生改变。【原文证据："commonly reports that a large share of AI answers change on a month-over-month basis — frequently in the 40-60% range"】
  3. 问题：GEO 供应商能保证我出现在 ChatGPT 答案里吗？ → 答案：不能合法保证，该承诺本身是警示信号。【原文证据："Any vendor that guarantees a specific AI-answer placement 'within X weeks' is promising to control a system they do not control"】
  4. 问题：如何降低波动的影响？ → 答案：分层来源、强化实体、保持新鲜、固定节奏测量、设定现实预期。【原文证据："Layered presence…Entity strength…Freshness discipline…Fixed-cadence measurement…Realistic expectations."】
  5. 问题：不同引擎的波动一样吗？ → 答案：不一样；低引用量引擎（如 ChatGPT）掉出答案的信号重于高引用量引擎（如 Perplexity，常见显示 15-25 个来源）。【原文证据："high-citation engines like Perplexity commonly show 15-25 sources…low-citation engines like ChatGPT show far fewer sources"】

## 2. 准确性测试
- 核心概念与术语理解：准确。对检索集、模型更新、采样方差、reranking 等机制的描述符合业界共识；对"answer engine 不像 Google 那样排页面"的区分表述正确。
- 数字、日期、对象、条件引用：存在若干未给出可点击来源的数字。"40-60%" 仅以括号命名来源（"MaximusLabs and similar trackers"），正文与 meta 均未附链接；"Perplexity commonly show 15-25 sources" 无来源；"2-4 weeks for crawl readiness, 3-6 months for share of voice" 亦无来源。
- 断章取义 / 过度推断 / 遗漏限制条件：文章多处强调"the precise figure depends on engine and topic"，条件表述较克制，未发现明显过度推断。"Google #1 does not automatically put you in an AI answer" 指向站内 geo-benchmarks 页面，属内链而非第三方证据。
- 前后矛盾 / 无法验证的事实："MaximusLabs" 这一监测机构无法在本页核验（无链接、无报告名称），属待核实事实；其余无内部矛盾。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 40-60% 的答案月环比变动 | "Independent monitoring in 2026 (MaximusLabs and similar trackers) commonly reports…" | 有（命名 MaximusLabs，但无链接） | 待核实 | 部分 | 报告链接、样本口径、时间范围 |
| 五种波动机制 | 五机制表 | 无（机制为行业共识） | 可（作为机制解释） | 部分 | 具体引擎文档引用 |
| 保证排名不可信 | 纸面上推理（无外部证据） | 无 | 不可 | 是（作为逻辑论断成立） | — |
| AI 引用页与 Google top10 重叠有限 | "overlap between AI-cited pages and Google top-10 pages"（内链 geo-benchmarks） | 无（指向本站） | 不可 | 部分 | 独立数据来源 |
| Perplexity 显示 15-25 个来源 | "high-citation engines like Perplexity commonly show 15-25 sources" | 无 | 不可 | 部分 | 抽样方法与截图 |

> 注意：文章声称"独立监测"存在，不等于该数据已被验证。

## 4. 独特价值测试
- 原创数据或实测结果：无。本页未提供本站采集的波动实测。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：有中等价值的结构化框架——五机制归因表、"procurement 三红旗"清单、"What You Control"五条控制措施。
- 通用行业知识的重新表述：主体为行业常识的组织化复述（如"采样有随机性""排名不保证"）。真正新增的是把波动五机制与控制手段打包成一份可操作清单。
- 无法确认原创性者标注：MaximusLabs 数据 待核实。

## 5. 可提取性测试
1. 问题：为什么 AI 答案会天天变？
   - AI 可提取的答案：五机制（检索集、模型更新、采样、内部 A/B、用户上下文）。
   - 原文证据："The Five Mechanisms Behind Fluctuation" 表。
   - 缺失信息：各机制对波动的量化贡献。
   - 是否需结合其他页面：否（本页自足）。
2. 问题：AI 答案波动正常范围是多少？
   - AI 可提取的答案：40-60% 月环比。
   - 原文证据："frequently in the 40-60% range"。
   - 缺失信息：来源报告链接、按引擎细分。
   - 是否需结合其他页面：是（应结合 data/geo-benchmarks 说明）。
3. 问题：怎样识别不可信的 GEO 承诺？
   - AI 可提取的答案：三红旗（保证 #1、买断关键词、单次点击测量）。
   - 原文证据："Three concrete red flags to carry into procurement" 列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：品牌方能控制哪些因素以减少波动？
   - AI 可提取的答案：分层存在、实体强度、新鲜度、固定节奏测量、现实预期。
   - 原文证据："What You Control: Making Fluctuation Less Consequential" 有序列表。
   - 缺失信息：每项的可量化效果。
   - 是否需结合其他页面：部分（多项内链）。
5. 问题：低引用量引擎与高引用量引擎哪个更值得担心？
   - AI 可提取的答案：低引用量引擎掉出更严重。
   - 原文证据："losing presence in a low-citation engine is a bigger signal"。
   - 缺失信息：引擎覆盖清单。
   - 是否需结合其他页面：是（per-engine-optimization）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念准确、条件表述克制；关键数字（40-60%、15-25）无来源，来源仅以机构名带过 |
| 证据可追溯性 | 25 | 15 | 核心数字无链接、不可核验；证据多为第一方论断或内链 |
| 独特价值 | 25 | 14 | 以行业常识复述为主，仅有清单式结构化整理，无原创实测 |
| 可提取性 | 10 | 9 | 问题式 H2、答案前置、表格与 FAQ 齐备 |
| 时效性与适用边界 | 10 | 7 | 有日期与更新标注，但缺明确适用边界与数字口径 |
| **总分** | **100** | **69** | |

### 最值得优先修改的 5 个具体位置
1. "The Drift Isn't Your Imagination" 段：给 "MaximusLabs and similar trackers" 的 40-60% 补报告链接、样本口径与统计周期（原文证据不足，需补）。
2. "Engine Differences Make It Worse" 段："Perplexity commonly show 15-25 sources" 无来源，建议附抽样方法与截图或改为模糊表述。
3. 五机制表："How often it matters" 列的具体频率为定性描述，建议标注依据或改为"机制性说明"。
4. "What You Control" 第 5 条："2-4 weeks for crawl readiness, 3-6 months for share of voice" 应给出依据（可链接 geo-timeline 的原始数据）。
5. 结尾结论句可增加适用边界（不同引擎/行业差异），避免读者把 40-60% 当作通用常数。
