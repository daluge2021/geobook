# 审计明细：What AI Assistants Say About Entity Density — And How Claude Cited This Site

- 文件：docs/cases/what-ai-assistants-say-entity-density.html
- 页面类型：案例
- 审计日期：2026-10-10
- 正文字数（近似）：1000

## 1. 核心答案提取
- 核心结论（≤100 字）：2026 年 9 月向四引擎提同一问题"What is entity association density?"。ChatGPT、Claude、Grok 三引擎一致认为该词在 GEO/SEO/知识图谱文献中无规范定义；Perplexity 视为新兴 GEO/AEO 指标。把本站 entity density 页 URL 给 Claude 后，Claude 近乎逐字复述本站定义、连带 Yext 统计并附来源链接——构成"先定义、先被引用"的活演示。启示：新术语需先定义、用数据锚定、接受被标注为 niche source 的正常过程。
- 可被直接回答的 5 个用户问题：
  1. 问题：entity association density 是标准指标吗？ → 答案：不是。四引擎中三个称无规范定义，Perplexity 视为新兴指标；entity density（每千词唯一实体数）才是可度量、有研究的近亲概念。【原文证据："The Surprising Consensus" 一节及引擎对比表】
  2. 问题：entity density 和 entity association density 有什么区别？ → 答案：前者数"每 1,000 词唯一实体数量"（GEO Lab 定义），后者衡量实体间被连接的丰富度/关系密度（源于知识图谱的 relationship richness）。【原文证据："Entity Density: Countable and Tested" 一节】
  3. 问题：keyword density 和 entity association density 有何不同？ → 答案：keyword density 问"用了多少次这个词"；entity association density 问"AI 看到我的实体与目标概念之间有多少有意义、一致的关联"。【原文证据：ChatGPT 引文块】
  4. 问题：这个站点（geo010.com）是怎么被 Claude 引用的？ → 答案：Claude 首次回答称找不到定义；拿到本页 URL 后第二条回复逐字复述本页定义、传递 Yext 统计与改进清单，并链接回来源页。【原文证据："How Claude Ended Up Citing This Site" 一节】
  5. 问题：围绕新概念写内容该怎么做？ → 答案：在答案块首句定义它；用可测数据锚定（如"每千词唯一实体数"、Yext 86%）；预期被引用后会被标注为 niche source，属术语扩散的正常第一阶段，需借交叉验证外推。【原文证据："What This Tells Us About Emerging GEO Terminology" 三要点】

## 2. 准确性测试
- 核心概念与术语理解：准确。区分 entity density（可计数）与 entity association density（关系密度）、并点出源泉在知识图谱关系研究而非 SEO 标准，理解到位。
- 数字、日期、对象、条件引用：测试时间与方法（2026-09、公共界面、摘要化回答）标注清晰；Yext 统计（86% 引用来自权威品牌渠道、品牌自有网站占 44%，基于 6.8 百万引用研究）为承袭本站 metrics 页的二手转述，非本文直接测得。
- 断章取义 / 过度推断 / 遗漏限制条件：良好。Claude"这是该站自建术语、非行业标准"的 caveat 被完整保留并正面回应，未掩己短。
- 前后矛盾 / 无法验证的事实：核心数字"86% / 44%"仅有一个笼统来源名（Yext 的 6.8-million-citation study），无可点击出处；"GEO Lab experiments"也无外链，"The GEO Lab"实体指代不精确。抓取行为演示为第一方实测，外部不可重放（未附对话全文/截图）。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 三引擎认为术语无规范定义 | 引擎对比表 | 无（第一方实测） | 待核实 | 是（对"引擎说了什么"而言） | 原始回复未公开 |
| entity density = 每 1,000 词唯一实体数，高密度提升可提取性但不突破域名权威门槛 | "The GEO Lab experiments" | 无（转述） | 不可 | 部分 | 指向 GEO Lab 实验原文 |
| Yext：86% 引用来自权威品牌来源，品牌官网占 44% | 承袭本站 metrics/entity-density 页 | 间接 | 待核实 | 部分（二手转述） | Yext 研究原文链接 |
| Claude 第二次回复逐字复述本站定义并带来源链接 | 引文块 + method note | 无 | 不可 | 是 | 附对话截图/转储存档 |
| "实体互联使 AI 更易一次提取多事实" | ChatGPT 引文 + 正文论证 | 无 | 不可 | 部分（逻辑主张非实证） | 提供可复现实测 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。

## 4. 独特价值测试
- 原创数据或实测结果：有——同页被 Claude 引用前后两态对比（无定义 → 给 URL 后逐字复述并引用），是"答案块 + 实体密集 + 数据锚点"可提取性的现场演示。
- 独立研究 / 案例：有——四引擎横向测试 + 本站作为被测试对象的一手记录。
- 独特方法 / 框架 / 分析：有——把"被引用后被标注为 niche source"上升为术语扩散第一阶段的规律，并给对应动作（交叉验证、术语表覆盖、第三方外链），是可复用框架。
- 通用行业知识的重新表述：entity density 与 keyword density 的基础区别、GEO Lab 实验结论宣导，属既有知识复述，非本文首创。
- 无法确认原创性者标注：待核实（Yext 统计口径、GEO Lab 实验出处）。

## 5. 可提取性测试
1. 问题：entity association density 是什么？
   - AI 可提取的答案：衡量内容中提及的实体（术语、概念、品牌等）彼此互联与交叉引用的程度。
   - 原文证据：Claude 引文块（逐字定义）。
   - 缺失信息：来源为本站自建术语，AI 应知其未被标准化。
   - 是否需结合其他页面：否（定义自足），但语境验证需 metrics/entity-density.html。
2. 问题：这个指标是行业标准吗？
   - AI 可提取的答案：不是，四引擎中三个明言无规范定义，属新兴/自建术语。
   - 原文证据：引擎对比表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：keyword density 与 entity association density 区别？
   - AI 可提取的答案：前者数重复词，后者数实体间有意义的一致性关联。
   - 原文证据：ChatGPT 引文块 + CRM/Salesforce 举例。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：内容怎么更容易被 AI 引用？
   - AI 可提取的答案：首句定义放入答案块、密集互联实体、用可核验数据锚定；预期初期被标为 niche source。
   - 原文证据：三要点清单 + Claude 演示事实。
   - 缺失信息：量化建议（每千词实体数阈值）需引 GEO Lab 数据。
   - 是否需结合其他页面：是（metrics/entity-density.html、fundamentals/answer-assetization.html）。
5. 问题：Yext 关于 AI 引用的统计是什么？
   - AI 可提取的答案：86% 的 AI 引用出自权威品牌管理来源，品牌自有网站占 44%。
   - 原文证据："the page's supporting Yext statistic" 一处。
   - 缺失信息：Yext 研究名称/年份/方法（缺原点）。
   - 是否需结合其他页面：是（原文即承袭 metrics 页，需上溯）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 26 | 概念区分与 caveat 保留到位；Yext/core数据的转述无原点，无法复核 |
| 证据可追溯性 | 25 | 17 | 第一方实测未附原始对话/截图；GEO Lab、Yext 统计引而缺链接 |
| 独特价值 | 25 | 21 | 现场被引用的双向对比为少见原创素材，"术语扩散"框架有独特性 |
| 可提取性 | 10 | 9 | 定义块、引擎对比表、三要点清单结构化，核心问题可独立回答 |
| 时效性与适用边界 | 10 | 8 | 有日期与方法说明，并坦然承认术语未标准化；缺复测/更新机制 |
| **总分** | **100** | **81** | |

### 最值得优先修改的 5 个具体位置
1. （"How Claude Ended Up Citing This Site" 一段）为演示过程补一句可复核证据：附对话日期、模型版本，或把回复内容存档为可访问页面/截图说明。
2. （同段）Yext "86% / 44%"：附上 Yext 研究或 metrics 页上的原文链接，避免承袭式引用悬空。
3. （"Entity Density: Countable and Tested" 一段）"The GEO Lab experiments"改为指向可视实验/论文的明确链接，"The GEO Lab"实体名需被定义清楚。
4. （引擎对比表）对四引擎各自回答补充"摘要自原始回复 + 日期"的标注方式，提升第一方证据可信度。
5. （文章末）补"测试有效期"说明：术语标准化进程与模型知识会更新，建议季度复测并回填。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。