# 审计明细：GEO vs AEO: What's the Difference and How They Overlap

- 文件：docs/models/geo-vs-aeo.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,137 词（英文，不含导航/页脚/CSS/JS）

> 头部 JSON-LD（仅用于确认标题与日期）：headline "GEO vs AEO: What's the Difference and How They Overlap"；datePublished 2026-09-16，dateModified 2026-09-16。正文 meta 行 "Updated: 2026-09-16"——**三处日期一致**。

## 1. 核心答案提取

- 核心结论（≤100 字）：AEO 是让引擎"选中并展示"你的段落（精选摘要/语音），GEO 是让 LLM 在合成答案里"引用并推荐"你的品牌；两者机制不同（选择 vs 合成）、指标不同（摘要胜率 vs 引用份额），但战术高度重叠——内容做一份、测量分开做。

- 可被直接回答的 5 个用户问题：
  1. 问题：What is the difference between AEO and GEO? → 答案：AEO 优化内容被"选中"为摘要/语音答案，GEO 优化品牌在 LLM 生成答案中被"引用推荐"；分界线是 selection vs synthesis。【原文证据：FAQ 首问 "AEO optimizes content to be selected…GEO optimizes a brand to be cited and recommended…Selection vs synthesis is the dividing line"】
  2. 问题：Which came first, AEO or GEO? → 答案：AEO 更早，源自精选摘要与语音搜索时代；GEO 由 2024 年 Princeton 论文正式提出。【原文证据："AEO came first, out of the snippet and voice era. GEO was formalized around 2024 by the Princeton paper"】
  3. 问题：Is GEO just a rebrand of AEO? → 答案：不是，但两者真实重叠——机制、指标、内容深度不同，共享问题驱动结构、Schema 与信任信号。【原文证据：FAQ "Is GEO just a rebrand of AEO? No, but they genuinely overlap…"】
  4. 问题：Should I run AEO and GEO as separate programs? → 答案：分开测量，不分开内容——一个 answer-first 资产同时服务两者，分别追踪 snippet win-rate 与 citation share。【原文证据："Separate the measurement, not the content"】
  5. 问题：How do AEO and GEO differ in metrics? → 答案：AEO 看摘要胜率与摘要带来的点击；GEO 看引用份额、share of voice、推荐率，且回答常为零点击、品牌提及在后续转化。【原文证据："The Difference in One Table" 中 Core metric 与 CTR logic 两行】

## 2. 准确性测试

- 核心概念与术语理解：AEO（选中机制、精选摘要、FAQPage/QAPage Schema、问题式标题）与 GEO（检索—生成—引用、实体密度、信任门槛、引用份额）的定义与机制区分准确，表格 7 个维度对比严谨、内部一致。**小瑕疵**：把 Google AI Overviews 归入 GEO 的目标面——AI Overviews 更接近"搜索结果页内生成式摘要"，与 AEO 的边界在文中被一句话带过，未讨论这种混合形态。
- 数字、日期、对象、条件引用：
  - AEO 起源写作 "mid-2010s onward"——模糊但不错误；无具体年份与出处。
  - "Princeton research published in 2024 that coined the term"——与站内 geo-evolution.html "GEO was first proposed in 2023" **跨页口径不一致**（预印本 2023-11、KDD 2024）；本页也未给出论文链接（geo-evolution 页给了 arXiv 链接）。
  - "The central definition and the first causal evidence come from the Princeton research"——"first causal evidence"为强断言，无引用支撑。
  - 日期一致（2026-09-16 三处），优于站内其他页。
- 断章取义 / 过度推断 / 遗漏限制条件：
  - "Both quietly reduce click-through"（零点击现实）作为共同点给出，未给数据。
  - "Snippets reward format; LLMs reward trust and corroboration"等对比为高度概括，未标注为经验判断。
  - FAQ 的 JSON-LD 中有一处笔误："Practically, AEO is AEO's predecessor"（应为 AEO is GEO's predecessor），该错句会被结构化数据抓取并可能直接进入 AI 引用。
- 前后矛盾 / 无法验证的事实：正文与 FAQ 内部一致；与站内 geo-evolution 起源年份矛盾（见上）；JSON-LD 病句（见上）。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| AEO=选中机制，GEO=合成+引用机制 | 定义两节 + 对比表 | 无 | 不可（概念性论述） | 部分（逻辑自洽但无文献支撑） | Princeton 论文链接、AEO 术语出处 |
| GEO 由 2024 Princeton 论文正式化并给出首个因果证据 | What Is GEO 一节 | 无（未附链接） | 待核实（站内另一页有 arXiv 链接） | 部分 | 链接 arXiv:2311.09735 |
| 两学科战术重叠度高（问题驱动/答案前置/Schema/E-E-A-T） | "Where They Overlap" 列表 | 无 | 不可 | 部分（常识性归纳） | 行业调研佐证 |
| 摘要胜率数天至数周见效，引用份额以月计 | "One Asset, Two Measurements" 末段 | 无（站内 timeline 页链接） | 不可（站内互证） | 部分 | 实测时间序列数据 |
| 一个 answer-first 资产可同时服务两者 | 操作模型 4 步 | 无 | 不可 | 部分（策略建议而非事实） | A/B 实测 |
| 站内 10 处交叉链接支撑概念定义 | 正文内链 | 无（仅站内） | 可（站内） | 部分 | — |

> 注：本页几乎没有外部来源，其核心论点属概念框架型论述；article-meta 自述 "Terminology: Princeton GEO paper (2024) and answer-engine practice" 是全站少数对术语来源做了明确标注的写法。

## 4. 独特价值测试

- 原创数据或实测结果：无。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：**7 维对比表、4 行"AEO 倾向 vs GEO 倾向"场景决策表、"一份资产两套测量"操作模型（4 步）、"分开测量而非分开内容"结论**——结构化程度高，属站内独有整理（原创性**待核实**，AEO vs GEO 对比是红海话题，大量第三方文章已有类似表格）。
- 通用行业知识的重新表述：AEO 定义与战术清单（可引用段落、问题式标题、FAQ Schema、长尾问题）是标准 SEO/AEO 常识；重叠点 5 条（问题驱动、答案前置、Schema、E-E-A-T、零点击）也是行业共识复述。本页价值主要在"组织方式"而非新知。

## 5. 可提取性测试

1. 问题：What is the difference between AEO and GEO?
   - AI 可提取的答案：机制（选中 vs 合成+引用）、指标（摘要胜率/点击 vs 引用份额/推荐率）、内容形态（紧凑可引用段落 vs 深度、实体关联、多源佐证）。
   - 原文证据："The Difference in One Table" 全表 + FAQ 首问。
   - 缺失信息：AEO 术语的提出者/年份。
   - 是否需结合其他页面：否（本页可独立完整回答）。
2. 问题：Which came first, AEO or GEO?
   - AI 可提取的答案：AEO 更早（精选摘要/语音时代），GEO 约 2024 年由 Princeton 论文正式化。
   - 原文证据："Which came first, AEO or GEO? AEO came first…GEO was formalized around 2024"。
   - 缺失信息：与站内 geo-evolution "2023 年提出" 的口径冲突；无论文链接。
   - 是否需结合其他页面：是（跨页年份不一致会产生矛盾引用）。
3. 问题：Should AEO and GEO be separate strategies?
   - AI 可提取的答案：分开测量、不分开内容；一个 answer-first 资产同时服务两者，分别追踪 snippet win-rate 与 citation share。
   - 原文证据："Separate the measurement, not the content" + FAQ 末问。
   - 缺失信息：两套指标的基线值与工具。
   - 是否需结合其他页面：是（指标定义在 metrics/citation-share.html、data/dashboard-setup.html）。
4. 问题：In which scenarios should I prioritize AEO over GEO?
   - AI 可提取的答案：需要立刻的摘要 CTR、或新域名无权威度想拿长尾摘要快速胜利时偏 AEO；要做对比类"best/vs/alternatives"查询入引用集合、或看长期品牌引用时偏 GEO。
   - 原文证据："Where They Diverge" 场景表 4 行。
   - 缺失信息：每类场景的预期投入产出与时间窗口（仅给了"数天至数周 vs 数月"）。
   - 是否需结合其他页面：是（归因在 data/ai-referral-attribution.html）。
5. 问题：How does AEO content differ from GEO content?
   - AI 可提取的答案：AEO 要紧凑、可引用、首句给答案的段落；GEO 要深度、实体关联、被独立多方佐证的来源——但一份 answer-first 资产可兼顾。
   - 原文证据：对比表 Content shape 行 + "One Asset, Two Measurements" 第 1 步。
   - 缺失信息：两种内容形态的具体长度/结构模板。
   - 是否需结合其他页面：是（模板在 community/geo-content-template.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 机制/指标区分准确、内部一致、日期三处一致；扣分：GEO 起源年份与站内另一页矛盾、"first causal evidence" 无引用、AI Overviews 归类讨论不足、FAQ JSON-LD 有病句 |
| 证据可追溯性 | 25 | 15 | 全文零外部链接（Princeton 论文未附链接）、重叠点与时间窗口均为无出处的经验陈述；但文章属概念框架型、术语来源已在 meta 中标注，未把数字当事实 |
| 独特价值 | 25 | 16 | 对比表+场景决策表+双测量模型结构化程度高，但主题为红海话题、核心内容多为行业常识重组，无自有数据 |
| 可提取性 | 10 | 9 | 答案前置、每节首句即结论、三张表 + 4 问 FAQ、站内链接丰富，5 问均可独立提取 |
| 时效性与适用边界 | 10 | 8 | 发布/更新日期一致且最新（2026-09-16）、有明确场景边界与见效节奏；扣分：AEO 起源年代模糊、无适用范围与更新机制说明 |
| **总分** | **100** | **72** | |

### 最值得优先修改的 5 个具体位置
1. 头部 FAQPage JSON-LD 第 2 问答句 "Practically, AEO is AEO's predecessor"：笔误，应为 "AEO is GEO's predecessor"——该错句会被 AI 直接抓取引用。
2. "What Is GEO" 一节 "the Princeton research published in 2024 that coined the term"：补 arXiv:2311.09735 链接，并与 docs/models/geo-evolution.html 的 "first proposed in 2023" 统一口径。
3. "What Is GEO" 一节 "the first causal evidence"：强断言需引证（论文结果），否则弱化为 "an early empirical study"。
4. 对比表 "Target surface" 行：补一句说明 Google AI Overviews 这类"搜索页内生成摘要"横跨 AEO/GEO，避免分类被质疑。
5. "Where They Overlap" 与 "Where They Diverge" 两节：为"零点击降低 CTR""摘要数天至数周见效"等结论补实测来源或标注为经验判断。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
