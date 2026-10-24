# 审计明细：Full-Process GEO Optimization Case Study — A Brand's Complete Zero-to-One Journey

- 文件：docs/cases/full-process-case.html
- 页面类型：案例
- 审计日期：2026-10-10
- 正文字数（近似）：1,500 词

## 1. 核心答案提取
- 核心结论（≤100 字）：一个 CRM 品牌用 12 周分三阶段做 GEO：1-2 周修基础设施（robots、Schema、llms.txt），3-6 周建内容（FAQ、文章、知乎），7-12 周监测迭代，最终从 0 引用到核心话题 11% 引用份额；FAQ 页与知乎矩阵是最有效动作。
- 可被直接回答的 5 个用户问题：
  1. 问题：GEO 从零开始的完整流程是什么？ → 答案：三阶段——Week 1-2 基础修复（放开爬虫、部署 Schema、建 llms.txt、建基线）→ Week 3-6 内容建设（5 篇选题文章 + 15 问 FAQ + 知乎回答 + 深度文）→ Week 7-12 监测迭代（复测、定位问题、补内容）。【原文证据：Section II/III/IV 及结尾总结句 "Weeks 1-2 fix infrastructure → Weeks 3-6 build content → Weeks 7-12 monitor and iterate"】
  2. 问题：案例的起点状况有多差？ → 答案：robots.txt 写 `Disallow: /` 全站拦截、无结构化数据、仅 3 个产品页 + 1 篇博客、无百科词条、无知乎账号、AI 引荐率与引用份额均为 0%、官网 DAU 200。【原文证据：Section I "Pre-Optimization: Week 0"】
  3. 问题：12 周后的结果如何？ → 答案：AI 引荐率 0→2%→8%，核心话题引用份额 0→3%→11%，品牌描述准确度 N/A→60%→85%，知乎被引用数 0→3→15，官网自然流量 200→250→420/天。【原文证据：Section IV "Final data comparison" 表格】
  4. 问题：哪些 GEO 动作最有效？ → 答案：TOP1 FAQ 页 + FAQPage Schema（被引用最多）、TOP2 知乎矩阵（中文 AI 搜索引用率极高）、TOP3 每篇文章首段直接给答案（AI 几乎只抽首段）。【原文证据：Section V "Top 3 Most Effective Actions"】
  5. 问题：哪些事该做但被漏掉了？ → 答案：百科词条应 Day 1 就申请（建立需 3-6 个月）；只测了 ChatGPT/豆包/Perplexity，漏了 Kimi 与文心一言。【原文证据：Section V "Actions Not Taken But Should Have Been"】
  （重要限定：全部数字为合成案例的代表性示例，非保证结果——见原文 Disclosure）

## 2. 准确性测试
- 核心概念与术语理解：技术描述基本准确——`Disallow: /` 会拦截所有爬虫、GPTBot / Google-Extended / PerplexityBot 为真实爬虫名、Organization/Product/FAQPage Schema、llms.txt 定位文件、FAQ 首答利于提取，均与通行认知一致。"AI 几乎只抽首段"作为经验结论合理但表述绝对化。
- 数字、日期、对象、条件引用：所有成效数字（8%、11%、85%、420/天等）来自**合成案例**，原文已用加粗 Disclosure 声明"representative examples, not guaranteed"——因此不构成误导，但也**不可核验、不可外推**；"百科词条需 3-6 个月""正常 GEO 见效周期"类数字无来源。
- 断章取义 / 过度推断 / 遗漏限制条件：(1) "知乎内容在中文 AI 搜索中引用率极高"是站内单案例观察，未说明仅覆盖 3 个平台的测试范围（文中自己承认漏测 Kimi/文心，但结论句未重复该限制）；(2) "2026 Top 5 SME CRM Recommendations" 由品牌自己写并把自己列入——原文未提示此类自荐内容的独立性问题，属遗漏限制条件。
- 前后矛盾 / 无法验证的事实：无内部矛盾；品牌名"QiKeTong（anonymized）"与"composite"披露一致。基线"竞品引用份额 8%/12%/15%"同样无测量方法与工具说明。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 三阶段 12 周流程有效 | Section II-IV 周计划与结果表 | 无 | 不可（合成案例） | 部分（内部逻辑自洽，但数据为构造值） | 真实项目的可核验前后数据 |
| FAQ 页 + FAQPage Schema 是最有效动作 | Section V TOP1 | 无 | 不可 | 部分 | 被引用次数的原始日志 |
| 知乎在中文 AI 搜索中引用率极高 | Section V TOP2 | 无 | 待核实 | 部分（受测试平台数限制） | 多平台引用源统计 |
| robots.txt `Disallow: /` 拦截全部 AI 爬虫 | Section II Action 1 | 无 | 可（robots 协议为公开标准） | 是 | 可补 robots.txt 官方文档链接 |
| 百科词条建立需 3-6 个月 | Section V 未做事项 | 无 | 不可 | 否 | 各百科平台审核时效数据 |
| 首段直接给答案利于 AI 抽取 | Section V TOP3 | 无 | 待核实 | 部分 | 关于 LLM 答案抽取的实测或研究 |

> 注：页面 meta 行明确 "Illustrative composite case; figures are representative examples, not guaranteed results"，正文亦有加粗 Disclosure——**披露充分，但"已披露的合成数据"仍不等于"已验证的事实"**。

## 4. 独特价值测试
- 原创数据或实测结果：无（数据明示为合成/代表性示例；站内 crawler 日志未在此页呈现）
- 独立研究 / 案例：合成案例 + 匿名品牌，属"多个真实 GEO 项目综合"的叙述，非独立可复现案例
- 独特方法 / 框架 / 分析：**有**——Week 0 基线报告模板（引荐率/引用份额/描述准确度/竞品份额四指标）、分周执行排期、以及"最有效 TOP3 / 效果一般 / 该做没做"的三层复盘结构，是本站整理的实用框架（原创性待核实）
- 通用行业知识的重新表述：robots/Schema/llms.txt/FAQ 的价值论述与站内其他章节重复，属通用知识复述；"先修基建再做内容"是行业常识
- 无法确认原创性者标注：三阶段排期与三层复盘结构的原创性待核实；成效数字为构造值，无原创性可言

## 5. 可提取性测试
1. 问题：GEO 零到一要分几个阶段、各做什么？
   - AI 可提取的答案：三阶段——1-2 周修 robots/Schema/llms.txt/基线，3-6 周产出 7 篇内容 + 15 问 FAQ + 知乎，7-12 周复测迭代。
   - 原文证据：Section II/III/IV 的 h2-h3 分层与结尾总结段。
   - 缺失信息：各动作的工时投入、内容字数口径（仅给出 2000/2500 词两篇）。
   - 是否需结合其他页面：否（本页自成完整流程）
2. 问题：GEO 三个月能带来多少效果？
   - AI 可提取的答案：本站合成示例为引用份额 0→11%、AI 引荐率 0→8%、流量 200→420/天；但原文明示为 representative examples，非保证结果。
   - 原文证据：Section IV 对比表 + 头部 Disclosure。
   - 缺失信息：真实样本分布、行业差异区间——AI 若引用必须同时带上"合成案例、不可外推"限定。
   - 是否需结合其他页面：是（需 data/geo-benchmarks 或 data/core-metrics-system 提供基准口径）
3. 问题：哪些 GEO 动作性价比最高？
   - AI 可提取的答案：FAQ 页 + FAQPage Schema、知乎矩阵、首段直答为 TOP3；深文与内链效果一般；百科与多平台监测是漏项。
   - 原文证据：Section V 三小节。
   - 缺失信息：各动作的成本与"效果"的量化定义。
   - 是否需结合其他页面：否
4. 问题：一个网站的 GEO 基线应该测哪些指标？
   - AI 可提取的答案：AI 引荐率、引用份额、品牌描述准确度、竞品引用份额，外加各平台的人工提问抽查。
   - 原文证据：Section I 基线清单 + Section II Action 4。
   - 缺失信息：各指标的测量工具与计算公式。
   - 是否需结合其他页面：是（需 data/core-metrics-system 给出定义）
5. 问题：robots.txt 配错了怎么改才能让 AI 爬虫进来？
   - AI 可提取的答案：移除 `Disallow: /`，为 GPTBot、Google-Extended、PerplexityBot 分别写 `Allow: /` 规则。
   - 原文证据：Section II Action 1 代码块。
   - 缺失信息：完整的 robots.txt 示例（含对其他目录的处理）、各爬虫 UA 的官方名称核对。
   - 是否需结合其他页面：是（需 technical/ai-crawler-management 或 fundamentals/llms-txt-guide）

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 技术步骤与概念准确；扣分在"AI 几乎只抽首段"等绝对化表述、自荐式 Top5 未提示独立性、3-6 个月等数字无依据 |
| 证据可追溯性 | 25 | 17 | 全文无外部来源、数据为构造值；但披露声明完整且置于显眼位置，属"无来源但标注清楚" |
| 独特价值 | 25 | 17 | 周计划模板与三层复盘结构有整理价值，但无原创实测数据，方法论多为常识组合 |
| 可提取性 | 10 | 9 | 周次分段 + 两张对比表 + 结尾三句总结，答案前置、极易抽取 |
| 时效性与适用边界 | 10 | 9 | Updated 2026-10-10、明确 composite/non-guaranteed 披露、适用对象（3 人团队中小品牌）清晰；扣分在未随披露重复说明"仅测 3 平台"的范围限制 |
| **总分** | **100** | **76** | |

### 最值得优先修改的 5 个具体位置
1. 头部 Disclosure 之后补一句适用边界："流程适用于从零起步的中小品牌；数字为合成示例，不应作为目标值"，把限定从免责移到正文。
2. Section IV "Final data comparison" 表格上方加标注"synthetic figures"，避免 AI 抽表时丢失上方 blockquote 中的披露语境。
3. Section V TOP2 "知乎内容在中文 AI 搜索中引用率极高" → 改为"在本案例测试的中文平台（豆包等）中引用率高"，并补回"未覆盖 Kimi/文心"的限制。
4. Section III Week 3 Article 1 自列 Top5 的做法旁加一句提醒：品牌自荐型榜单需第三方佐证才具备可引用性。
5. Section V "百科词条 3-6 个月" 补来源或改为"通常需数周至数月，视平台而定"。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
