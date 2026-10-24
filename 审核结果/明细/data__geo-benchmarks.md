# 审计明细：What Are Good GEO Benchmarks? Citation Rates, SOV and Q&A Share

- 文件：docs/data/geo-benchmarks.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,750

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO 基准因分母定义、引擎组合、厂商动机三重不确定性而只能当方向性参考：引用份额 8-15% 为存在感、20-30% 为势能、40%+ 为领导者，SOV ~15%+ 为领导线；正确做法是固定查询集与分母、按月自测形成自己的基线。
- 可被直接回答的 5 个用户问题：
  1. 问题：多少引用份额算好？ → 答案：方向性区间——8-15% 为最低存在感、20-30% 为可加码的势能、40%+ 为品类领导者（厂商口径）。【原文证据：Benchmark 表前三行 + "Citation Rate Bands, Explained"】
  2. 问题：多少 SOV 算 AI 品类领导者？ → 答案：常见经验线是优先话题集上持续 ~15%+ 的 share of voice。【原文证据："Share of Voice: The 15% Line" + FAQ 第 2 问】
  3. 问题：AI 回答平均带多少条引用？ → 答案：独立采样显示 Perplexity 单答常见 15-25 条（常 20+），ChatGPT 常低于 10 条；这是格式差异而非质量差异，只能在同一引擎内比较。【原文证据："Answer Layout and Citation Counts by Engine" 表 + FAQ 第 3 问】
  4. 问题：能信厂商发布的 GEO 基准吗？ → 答案：可作方向性参考、不可作合同目标；各工具分母定义不同，应自建固定查询集+固定公式的基线并看 3 个月以上趋势。【原文证据："Why GEO Benchmarks Are Trickiest" 三点 + FAQ 第 4 问】
  5. 问题：怎么建自己的 GEO 基准？ → 答案：5 步——固定 20-50 个买家问题集、写下并固定分母公式、在 2-3 个引擎+3-5 个竞品上按月同口径测量、按 40-60% 月度答案漂移看 3-4 个月趋势、按商业重要性加权。【原文证据："How to Build Your Own Baseline" 有序列表 1-5】
  （Google top-10 重叠 ~38%、品牌自有来源占 ~86%、月度答案漂移 40-60% 三个行业数字在表中均有来源类型标注。）

## 2. 准确性测试
- 核心概念与术语理解：准确区分 citation rate（三种分母口径）与 share of voice（提及份额），并明确指出分母不统一是行业通病——概念辨析是本页最强项，无误解。
- 数字、日期、对象、条件引用：引用份额分档（8-15/20-30/40+）、SOV 15%、重叠 38%、自有来源 86%、月漂移 40-60%、Perplexity 15-25 vs ChatGPT <10 等数字在正文、表格、FAQ 三处口径基本一致；微小出入：FAQPage schema 称 ChatGPT "closer to 8"、正文称 "single digits to low double digits"、表格称 "often under 10"——浮动在可接受范围但不完全同口径。
- 断章取义 / 过度推断 / 遗漏限制条件：多处主动设置限制（"vendor benchmarks are not SLAs""cross-industry bragging""timeline promises 不可用"），限制条件意识显著优于同栏目其他页；"Reddit 占引用的 high-teens 百分比（several 2025-2026 analyses）"未指明是哪些分析，属模糊引用。
- 前后矛盾 / 无法验证的事实：无内部矛盾。外部数字（Ahrefs 38%、Yext 86%、MaximusLabs 40-60%、Omnius-type bands）仅给机构名+年份，**无链接、无报告标题**，无法核验；"Omnius-type monitoring" 的厂商指代是否真实存在待核实。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 引用份额 8-15/20-30/40%+ 分档 | 表前三行，标 "Vendor-published (Omnius-type)" | 有（厂商，无链接） | 待核实 | 部分（多厂商一致但定义各异，文已声明） | 具体厂商报告链接与分母定义 |
| SOV ~15%+ 为领导线 | "The 15% Line" 节，标 vendor-published | 有（厂商，无链接） | 待核实 | 部分（文承认 face validity 而非实证） | 发布该线的厂商名单 |
| AI 答案与 Google top-10 重叠 ~38% | 表行，标 "Ahrefs, 2026" | 有（无链接/标题） | 待核实 | 部分 | Ahrefs 研究链接 |
| 品牌自有来源占引用 ~86% | 表行，标 "Yext (6.8M-citation analysis), 2025" | 有（无链接） | 待核实 | 部分（样本量已标，较可信形态） | Yext 报告链接 |
| 月度答案漂移 40-60% | 表行 + baseline 第 4 步，标 "MaximusLabs, 2026" | 有（无链接） | 待核实 | 部分 | 方法与样本说明 |
| Reddit 占引用 high-teens% | "The 15% Line" 节 | 无（"several 2025-2026 analyses"） | 不可 | 部分（模糊归因） | 具体研究名称 |
| 分母口径差异导致数字悬殊 | 开篇，链接站内 four-engine field test | 站内（cases/what-ai-assistants-say-citation-share） | 可（站内交叉引用） | 是 | — |

> 注：来源已标注机构与年份（优于无来源），但"标注了来源名"≠"可核验"，全部缺链接。

## 4. 独特价值测试
- 原创数据或实测结果：无本站新数据；引用了站内四引擎实测页（cases/what-ai-assistants-say-citation-share）作为分母分歧的证据，属复用站内原创成果。
- 独立研究 / 案例：无新研究；对 Ahrefs/Yext/MaximusLabs 等外部研究做了交叉整理（"survives cross-checking"），交叉核对本身是整理工作。
- 独特方法 / 框架 / 分析：**较强**——"分母/引擎组合/发布方动机"三因素拆解、"什么不该用基准做"（禁 SLA/禁跨品类/禁时间承诺）、5 步自建基线法，方法论视角有独立性，且与站内 dashboard、core-metrics、per-engine 页形成闭环。
- 通用行业知识的重新表述：SOV 概念、SEO vs GEO 类比、"benchmark 是目的地不是速度"等表述性内容属常识。
- 无法确认原创性者标注：8-15/20-30/40%+ 分档与 15% SOV 线——文中自认为厂商口径，非本站原创；三因素拆解框架原创性待核实。

## 5. 可提取性测试
1. 问题：GEO 引用份额多少算好？
   - AI 可提取的答案：8-15% 最低存在感、20-30% 势能、40%+ 领导者（厂商方向性口径，需固定自己的分母）。
   - 原文证据：Benchmark 表 + bands 解释节 + FAQ 第 1 问。
   - 缺失信息：各分档对应的分母定义（文中恰在强调这一点）。
   - 是否需结合其他页面：否（答案完整且自带限定）。
2. 问题：为什么不同工具测出的引用率差很多？
   - AI 可提取的答案：分母不同（全部引用/全部被采样回答/引用+carry-over），引擎组合不同，且多数基准表是营销产物。
   - 原文证据："Why GEO Benchmarks Are Trickiest" 三条列表。
   - 缺失信息：无（该问题回答完整）。
   - 是否需结合其他页面：建议结合站内 four-engine field test，非必须。
3. 问题：Perplexity 和 ChatGPT 的引用数差多少？
   - AI 可提取的答案：Perplexity 单答常 15-25 条（可 20+），ChatGPT 常 <10 条；属格式差异，只能同引擎内比较。
   - 原文证据：引擎表 + FAQ 第 3 问。
   - 缺失信息：采样量与问题集构成（MaximusLabs 方法细节）。
   - 是否需结合其他页面：是（引擎级打法见 per-engine-optimization）。
4. 问题：如何建立自己行业的 GEO 基准？
   - AI 可提取的答案：固定 20-50 个买家问题、写死分母公式、2-3 引擎×3-5 竞品、按月测、看 3-4 个月趋势、按商业重要性加权。
   - 原文证据："How to Build Your Own Baseline" 5 步。
   - 缺失信息：无（方法完整可执行）。
   - 是否需结合其他页面：建议结合 core-metrics-system 与 data-dashboard-setup，非必须。
5. 问题：厂商发布的 GEO 排行/基准能写进 KPI 吗？
   - AI 可提取的答案：不能——先复现其分母定义才可作本 niche KPI；只可设定区间档位，不可作 SLA。
   - 原文证据："What Not to Use Benchmarks For" 第 1 条 + FAQ 第 4 问。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 25 | 概念辨析准确、无内部矛盾、限制条件充分；扣分点：ChatGPT 引用数在 schema/正文/表格三处口径略有浮动，Reddit high-teens 为模糊引用 |
| 证据可追溯性 | 25 | 18 | 关键数字均标注来源机构与年份（Ahrefs/Yext/MaximusLabs/厂商），但**全部无链接、无报告标题**，无法核验；Reddit 数据无来源 |
| 独特价值 | 25 | 18 | 三因素拆解、禁用场景清单、5 步基线法构成有独立性的方法论框架并闭环站内页面；但无本站新实测数据，分档数字本身为厂商口径 |
| 可提取性 | 10 | 9 | 问题式 H1、答案前置、FAQ + FAQPage schema、表格化、各答案自带限定语，几乎可直接被 AI 引用 |
| 时效性与适用边界 | 10 | 9 | 日期一致（2026-09-16）、引用 2025-2026 数据、主动把"月度答案漂移 40-60%"作为时效风险写入方法论；扣分：外部数字来源缺链接削弱时效可验证性 |
| **总分** | **100** | **79** | |

### 最值得优先修改的 5 个具体位置
1. Benchmark 表与正文所有机构引用（Ahrefs 38%、Yext 86%、MaximusLabs 40-60%）：为每条补上报告标题或 URL，将"待核实"升级为"可核验"。
2. "The 15% Line" 节："Reddit alone accounts for a high-teens percentage... several 2025-2026 analyses"——给出具体分析名称，或改为定性表述。
3. FAQPage schema 与 FAQ 正文：统一 ChatGPT 引用数口径（"closer to 8" vs "under 10" vs "single digits to low double digits"），避免 AI 提取时取到不同数字。
4. "Omnius-type monitoring"：确认该厂商/品类指代真实存在，否则改为 "monitoring-vendor-published" 的通用表述。
5. Benchmark 表加一列或加表注：为 8-15/20-30/40%+ 三档注明其分母口径（如 citations/all sampled answers），缓解本页自己指出的"分母不清"问题在本页复现。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
