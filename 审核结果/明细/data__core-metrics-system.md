# 审计明细：GEO Core Metrics System — Data-Driven GEO Decision Making

- 文件：docs/data/core-metrics-system.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,700

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO 指标分三层——Outcome（推荐率/引用份额/描述准确率）、Asset（语义覆盖/结构化完整度/来源权威分）、Process（产出/更新/多平台/EEAT），用 Process 改动推动 Outcome 结果，目标值仅为示例方向区间。
- 可被直接回答的 5 个用户问题：
  1. 问题：GEO 指标体系分哪几层？ → 答案：Outcome → Asset → Process 三层，Process 改变 Asset 状态、进而影响 Outcome。【原文证据：Section I "GEO metrics can be broken down into three layers: Outcome → Asset → Process" 及 Logical Relationships 两条】
  2. 问题：Brand AI Referral Rate 怎么算？ → 答案：(被推荐的查询数 ÷ 主题查询总数) × 100%。【原文证据：Section II "Brand AI Referral Rate = (Number of queries where brand was recommended ÷ Total topic queries) × 100%"】
  3. 问题：Citation Share 的定义是什么？ → 答案：你的内容在 AI 回答该主题全部被引来源中的占比，被称为 GEO 的"市场份额"。【原文证据：Section II Core Metric 2 定义与 Interpretation】
  4. 问题：Source Authority Score 怎么评分？ → 答案：5 个维度各 20 分（百科词条、知识面板、权威媒体引用、行业白皮书引用、政府/学术外链），总分 0-100。【原文证据：Section III Metric 3 Scoring Dimensions】
  5. 问题：1-3 个月的 GEO 初始目标参考值是多少？ → 答案：推荐率起点 0-2% 目标 5-8%；引用份额 0% → 3-5%；语义覆盖 10-20% → 40-50%；结构化完整度 0-20% → 70%+（均为示例方向区间）。【原文证据：Section VI "Initial Goals (1-3 months) — Example direction ranges" 表】
  （其余如 AI Sentiment 三级定义、E-E-A-T 检查清单均在原文有直接对应段落。）

## 2. 准确性测试
- 核心概念与术语理解：三层划分与 Citation Share、Schema、E-E-A-T 等术语使用基本准确；但 Brand AI Referral Rate 的**定义与公式分母口径不一致**——定义写"100 次品牌相关查询中被推荐次数"，公式分母却是"Total topic queries"（主题查询总数），两者不是同一集合。
- 数字、日期、对象、引用：第 VI 节三张阶段表的起止值前后衔接一致（5-8% → 10-15% → 20-30%+），算术无矛盾。但 Section III 给出 "Semantic Coverage ≥70%" 为固定目标，与 Section VI 阶段表（70% 要到 6-12 个月才达成、3-6 个月仅 60-70%）口径不一致。
- 断章取义 / 过度推断 / 遗漏限制条件：Section VI 已明确声明"Targets are example direction ranges, not universal standards"，边界意识好；但 Section III 的 "≥70%"、Section IV 的 "≥70% 更新覆盖 / ≥5 平台 / 每月 10-15 篇" **未被该声明覆盖**（原文只说 "Targets in the tables below"），易被读作硬标准。
- 前后矛盾 / 无法验证的事实：页头 meta 声称 "external figures are linked to sources"，但正文**没有任何外部来源链接**，全部为第一方框架与示例值——元信息与正文不符。Source Authority Score 的 20×5 打分法、各解读区间（<5%、5-15% 等）均无出处，除标注 "(example)" 者外。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 三层指标框架（Outcome→Asset→Process） | Section I 文字 + ASCII 图 | 无 | 不可 | 部分（属框架主张，非事实） | 框架出处/与既有方法论的关系 |
| 推荐率解读区间 <5%/5-15%/15-30%/>30% | Section II 列表，标注 "(example)" | 无 | 不可 | 部分（明确标为示例即自我限定） | 区间依据的样本量 |
| Source Authority Score 每维 20 分 | Section III 列表 | 无 | 不可 | 否（打分权重无依据） | 权重设计依据或文献 |
| 阶段目标值（5-8%/3-5%/70%+ 等） | Section VI 三表，标 "example direction ranges" | 无 | 不可 | 部分（自述为从业者观察） | "practitioner observations" 的具体出处 |
| Process→Asset→Outcome 因果表 | Section V 表格（如 FAQ 文章→引用份额↑） | 无 | 不可 | 否（方向性断言，无数据） | 因果验证数据 |
| 元信息"external figures are linked to sources" | article-meta 行 | 无 | 不可 | 否（正文无外链） | 移除该声明或补真实外链 |

> 注：正文宣称的外部来源与实际内容不符，"声称有来源"不等于"已核验"。

## 4. 独特价值测试
- 原创数据或实测结果：无（全文无本站实测数据、无样本量、无观测窗口）。
- 独立研究 / 案例：无（无案例、无实验）。
- 独特方法 / 框架 / 分析：三层指标框架 + Process→Asset→Outcome 因果链表 + 三阶段目标表为本站结构化整理；Source Authority Score 打分卡有一定独创形态。原创性标注：待核实（三层/计分卡思路在通用管理框架中常见，站内未说明来源）。
- 通用行业知识的重新表述：Schema 类型清单（Organization/Article/FAQPage/BreadcrumbList 等）、"数据驱动决策""数据是线索不是答案"等收尾论述属常识复述；E-E-A-T 检查清单属通用合规清单。

## 5. 可提取性测试
1. 问题：GEO 核心指标有哪些？
   - AI 可提取的答案：Outcome 层 4 个（推荐率、引用份额、描述准确率、AI 情感），Asset 层 3 个，Process 层 4 个。
   - 原文证据：Section II/III/IV 各 h3 小节标题与定义段。
   - 缺失信息：各指标的采集方法（去哪取数）。
   - 是否需结合其他页面：部分（采集方法需看 data-dashboard-setup 或 monitoring 工具页）。
2. 问题：引用份额达到多少算好？
   - AI 可提取的答案：初始 3-5%、成长 8-12%、成熟 15-25%+，且是示例方向区间。
   - 原文证据：Section VI 三张阶段表。
   - 缺失信息：这些区间的样本来源。
   - 是否需结合其他页面：建议结合 geo-benchmarks.html（该页给 8-15%/20-30%/40%+ 分档，**与本页阶段值口径不同，跨页会产生冲突答案**）。
3. 问题：结构化数据完整度怎么打分？
   - AI 可提取的答案：已部署 Schema 类型数 ÷ 应部署类型数 × 100%，附 6 项检查清单。
   - 原文证据：Section III Metric 2。
   - 缺失信息："应部署类型"如何按站点类型确定。
   - 是否需结合其他页面：是（具体部署见 schema-markup-guide）。
4. 问题：发现引用份额下降该怎么排查？
   - AI 可提取的答案：先查 Asset 层（语义覆盖、来源权威、结构化是否失效），再查 Process 层（产出量、更新频率是否下降）。
   - 原文证据：结尾段落。
   - 缺失信息：各层指标的异常阈值。
   - 是否需结合其他页面：是（阈值在本页 Section V/VI，但红黄绿定义在 data-dashboard-setup）。
5. 问题：每月要发多少篇 GEO 内容？
   - AI 可提取的答案：初期每月至少 10-15 篇"答案资产"内容（标注 example）。
   - 原文证据：Section IV Metric 1。
   - 缺失信息：内容长度/类型定义、该数字依据。
   - 是否需结合其他页面：是。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 23 | 推荐率定义与公式分母口径不一致；Section III 固定目标与 Section VI 阶段表口径冲突；页头"外链来源"声明与正文不符 |
| 证据可追溯性 | 25 | 15 | 全部结论为第一方框架、零外部来源；好在示例值大多标注 "(example)"，但部分目标值未标 |
| 独特价值 | 25 | 17 | 三层框架与因果表为结构化整理（原创性待核实），无任何实测数据；Schema 清单、E-E-A-T 清单属常识 |
| 可提取性 | 10 | 8 | 分节清晰、公式与表格可直接提取，但无 FAQ、标题非问题式、ASCII 架构图用 `<p>`+单反引号渲染易碎 |
| 时效性与适用边界 | 10 | 7 | 有更新日期 2026-10-10 与阶段化声明，但"not universal standards"仅覆盖表格，未覆盖前文固定目标 |
| **总分** | **100** | **70** | |

### 最值得优先修改的 5 个具体位置
1. Section II Core Metric 1：统一"品牌相关查询"与"Total topic queries"两个分母表述，否则同一指标有两种算法。
2. Section III Metric 1："Semantic Coverage ≥70%" 与 Section VI 阶段表冲突，应改为分阶段区间或注明"长期目标"。
3. 页头 article-meta："external figures are linked to sources" 与正文无外链矛盾——删除该句或为行业数字补真实来源链接。
4. Section I 与 Section II/III 的 ASCII/伪代码图：用 `<pre><code>` 包裹整段，避免 `<p>` 拆行导致渲染破碎。
5. Section VI 之后新增一段"适用边界"：声明所有目标值为示例方向区间、适用于何种站点规模与查询集，将声明范围从"tables below"扩展到全文。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
