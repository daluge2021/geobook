# 审计明细：How to Benchmark Competitors in AI Answers

- 文件：docs/metrics/competitive-ai-analysis.html
- 页面类型：文章（II. Metrics 栏目）
- 审计日期：2026-10-10
- 正文字数（近似）：1,006 词（英文，含表格与 FAQ）
- 页面日期（JSON-LD）：datePublished 2026-09-16 / dateModified 2026-09-16

## 1. 核心答案提取

- 核心结论（≤100 字）：竞品 AI 分析 = 固定问题集 + 固定 0-3 在场度量表 + 固定节奏；按引擎分别比较（绝不跨引擎平均），把榜单拆成"谁赢"与"为什么赢"（自有/earned/platform 来源分桶），再转成可复测的目标，只看跨周期趋势不看点值。

- 可被直接回答的 5 个用户问题：
  1. 问题：最快的竞品 AI 基准测试方法是什么？ → 答案：手工跑——20-50 个固定买家问题、2-3 个引擎、每周执行，每个竞品按 0-3 在场度打分并汇总；一致性比工具更重要。【原文证据：FAQ "Manually, weekly: 20-50 fixed questions across 2-3 engines … Consistency beats tooling."】
  2. 问题：如何给竞品在 AI 回答中的出现打分？ → 答案：0=未出现、1=被提及（无来源链接）、2=被引用（有明确来源）、3=被推荐（作为首选）；收入关键子集加权，每轮用同一量表、只报趋势不报点值。【原文证据：Step 3 的 0-3 四行表 + "The scale is directional on purpose"】
  3. 问题：竞品分析多久做一次？ → 答案：核心优先问题每周、更宽的问题库每月；AI 回答逐月漂移，单次快照是噪音，四个周期以上的趋势才是信号。【原文证据：FAQ "Weekly for priority queries, monthly for the wider library … four or more cycles"】
  4. 问题：问题集怎么选、竞品集怎么定？ → 答案：问题分三桶（收入关键 / 品类归属 / 对比类），按买家原话逐字保存并标注哪 3-5 个真正带来成交；竞品跟踪 4-6 个（3-4 个真实对手 + 1-2 个对标目标如品类领导者或新锐）。【原文证据：Step 1 三桶列表 + Step 2 "Track 4-6 names"】
  5. 问题：拿到榜单后如何转化为行动？ → 答案：找出对手在收入关键问题上比你高 cite/recommend 级的位置，打开其被引来源分成 自有站点 / 媒体报告 / 社区平台 三桶，挑 5 个差距补答案资产，每月复测、连续两个周期改善才庆祝。【原文证据：Step 5 来源分桶 + Step 6 三步闭环】

## 2. 准确性测试

- 核心概念与术语理解：准确。在场度 0-3 量表与 "absent/mention/cite/recommend" 对应清晰；"提及≠引用"、"方向性量表 vs 精细情感打分"、"按引擎分别比较不可跨引擎平均" 等方法学要点正确；与 citation share 的类比（share-like figure）表述得当。
- 数字、日期、对象、条件引用：20-50 问、4-6 竞品、2-3 引擎、0-3 分、30-60 分钟/轮均为方法建议，无需外部核验。**需修正**：榜单解读段 "sustained overall presence around 15%+ is typically considered a leadership-ish position and 40%+ clearly so" 挂靠 "vendor-published norms" 却未点名任何厂商或报告 → 阈值来源 **原文证据不足 / 待核实**。示例榜单表（You 28%、Rival A 44%、Rival B 19%、Benchmark 61%）未显式标注为虚构示例，仅有 meta 中 "no proprietary data required" 暗示。
- 断章取义 / 过度推断 / 遗漏限制条件：① "AI answers drift substantially month to month" 作为方法前提反复出现却无来源；② 15%/40% 阈值以"通常被视为"的行业共识口吻给出，实为不可核验断言；③ 未遗漏关键限制——文中明确写了"量表是方向性的""只看趋势""不要让工具中途改量表""早期做双人盲评"，边界声明是本文强项。
- 前后矛盾 / 无法验证的事实：无内部矛盾；FAQ 与正文口径一致（0-3 定义、周/月节奏均一致）。无法验证项：示例榜单数字、15%/40% 门槛、"漂移"论断。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 固定问题集 + 固定量表 + 固定节奏是可靠方法 | 开篇两段 + Step 1 | 无（方法论主张） | 不可（属规范性建议） | 是（作为方法建议自洽） | 无需外部证据，但应说明这是惯例而非验证结论 |
| 0-3 在场度量表优于精细情感打分 | Step 3 段落 | 无 | 不可 | 部分 | 对比数据：粗粒度与细粒度打分的信度差异 |
| AI 回答逐月大幅漂移，四周期以上趋势才可信 | 首节 + FAQ | 无 | 不可 | 部分 | 漂移幅度的实测数据（如同 query 同模型跨月一致率） |
| 整体 presence ≥15% 即"领先"、≥40% 明确领先 | Step 4 末段 | 无（称 vendor-published norms） | 待核实 | 否（出处缺失，无法判断是否支持） | 厂商名、报告名、样本口径、指标定义是否与本文 presence% 一致 |
| 示例榜单（28/44/19/61%） | Step 4 表格 | 无 | 不可（未标为示例） | 部分 | 应在表下补一行 "illustrative, not measured data" |
| 来源三桶（owned/earned/platform）决定补哪类内容 | Step 5 | 无（站内链 source-matrix-strategy） | 可（站内） | 部分 | 各来源类型实际被引占比的数据 |

> 注：本文属方法论/操作指南，多数条目是规范性建议而非事实断言，不按"无来源事实"同等扣分；扣分集中在 15%/40% 阈值与"漂移"论断这两处被当成事实陈述的无出处内容。

## 4. 独特价值测试

- 原创数据或实测结果：无（article-meta 自述 "Methodology outlined; no proprietary data required"；示例榜率为虚构）。
- 独立研究 / 案例：无。全文无实测案例、无访谈、无数据集。
- 独特方法 / 框架 / 分析：0-3 在场度量表 + 三桶问题集 + 来源三桶诊断 + "两周期趋势才庆祝"的纪律，构成一套完整可执行流程；但 absent/mention/cite/recommend 分级是行业通行写法，非本站独创 → 属结构化整理。
- 通用行业知识的重新表述：固定 query set、固定 cadence、按引擎分列、trend over snapshot 等均为调研/SEO 常识在 GEO 场景的移植复述；与站内 data/geo-benchmarks.html 的纪律高度同源（文中自认 "Everything that makes GEO benchmarking honest applies to competitors"）。
- 无法确认原创性者标注：0-3 分级的最早出处 → 待核实；15%/40% vendor norms → 待核实（且本页未给出处）。

## 5. 可提取性测试

1. 问题：竞品 AI 可见度怎么打分？
   - AI 可提取的答案：0=未出现、1=被提及、2=被引用（带来源）、3=被推荐为首选；收入关键问题加权，全周期沿用同一量表。
   - 原文证据：Step 3 表格 + FAQ 第二问。
   - 缺失信息：权重具体怎么算（加权公式未给）。
   - 是否需结合其他页面：否。

2. 问题：竞品 AI 分析的完整步骤是什么？
   - AI 可提取的答案：1) 固定 20-50 个问题（收入关键/品类归属/对比三桶）2) 定 4-6 个竞品 3) 0-3 在场度打分 4) 同日跑 2-3 引擎并汇总三项指标 5) 打开对手被引来源分桶诊断 6) 挑 5 个差距转成月度目标。
   - 原文证据：Step 1-6 六个 H2 标题及其内容。
   - 缺失信息：汇总公式（presence score 是否除以问题数）未明示。
   - 是否需结合其他页面：否（本页可独立完整回答）。

3. 问题：怎么解读竞品 AI 榜单才算不夸大？
   - AI 可提取的答案：按引擎分列不平均；与"下一个最近竞品的差距"比较而非绝对百分比；只认跨四个周期以上的趋势；加权收入关键子集，避免虚荣榜。
   - 原文证据：首节 "engine-by-engine comparison only" + Step 4 "the only honest yardstick is your gap to the next competitor" + FAQ 第三问。
   - 缺失信息：15%/40% 行业门槛无出处（不可引用）。
   - 是否需结合其他页面：是（基准值口径需 data/geo-benchmarks.html）。

4. 问题：对手在 AI 答案里赢我，我该补什么？
   - AI 可提取的答案：打开其被引来源——对手自有站点=补答案资产；媒体/报告=自己做数据与公关；社区平台=去引擎真正引用的地方发内容；然后挑 5 个收入关键差距构建资产并月度复测。
   - 原文证据：Step 5 三桶 + Step 6 三步。
   - 缺失信息：各桶的投入产出优先级判断标准。
   - 是否需结合其他页面：是（来源分桶逻辑链到 content/source-matrix-strategy.html，行动落表链到 data/data-dashboard-setup.html）。

5. 问题：竞品 AI 分析要不要买工具？
   - AI 可提取的答案：先手工——每轮 30-60 分钟的表格 + 浏览器即可；量表锁定后再上工具扩规模，且不要让工具中途改你的评分刻度；早期做双人盲评校准。
   - 原文证据："Automation Notes (and When to Stay Manual)" 段。
   - 缺失信息：未列任何具体工具名（无工具清单，也无可核验的厂商来源）。
   - 是否需结合其他页面：是（工具清单在 technical/geo-monitoring-tools.html 或 geo-tools-review.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 23 | 方法学要点（分引擎比较、方向性量表、趋势优先）准确且内部一致；扣分于 15%/40% "vendor norms" 无出处、"AI 回答逐月大幅漂移"无据、示例榜单未显式标为虚构 |
| 证据可追溯性 | 25 | 15 | 全文零外部来源链接，仅 4 处站内互链；被当作事实的阈值与漂移论断无任何可核验依据（方法建议本身不扣分） |
| 独特价值 | 25 | 16 | 完整可执行流程 + 来源分桶诊断 + 两周期确认纪律属较好的结构化整理；0-3 分级与固定 query 纪律为行业通行做法，无自有数据 |
| 可提取性 | 10 | 9 | 六步 H2 结构、量表表格、FAQ 四问与正文完全一致、答案前置，单页可独立回答绝大多数问题 |
| 时效性与适用边界 | 10 | 8 | 有 Updated 2026-09-16；方向性/趋势优先/不跨引擎平均等边界声明是全站较强的一档；缺"结论随平台变化应复核"说明与阈值时效 |
| **总分** | **100** | **71** | |

### 最值得优先修改的 5 个具体位置
1. Step 4 末段 "Against vendor-published norms, sustained overall presence around 15%+ … 40%+ clearly so"：补厂商与报告名及链接，或整句删除——这是全文唯一像"可引用行业基准"的断言却零出处，最容易被 AI 当事实复述。
2. Step 4 示例榜单表（You 28% / Rival A 44% …）：表下补一行 "Illustrative figures, not measured data"，与站内其他页面的披露标准对齐。
3. 首节 "AI answers drift substantially month to month"：补一项可核验数据（同 query 同模型跨月一致率）或改为 "AI answers can vary between runs and over time"（弱化为可观察事实）。
4. FAQ 第三问与首节重复的 "four or more cycles"：说明该周期数是经验建议而非统计推导，避免被当作有样本支撑的阈值。
5. Automation Notes："Tools that offer competitive AI tracking" 无一具名 → 至少链到站内 technical/geo-monitoring-tools.html，使读者无需跨搜索即可落地。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
