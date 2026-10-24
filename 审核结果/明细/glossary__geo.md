# 审计明细：What is GEO? — Complete Guide to Generative Engine Optimization

- 文件：docs/glossary/geo.html
- 页面类型：术语
- 审计日期：2026-10-10
- 正文字数（近似）：950（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO（Generative Engine Optimization）是针对 AI 大模型检索与生成机制、优化品牌内容使其在 AI 答案中被优先引用的方法论；底层是 RAG 检索竞争，四步落地（诊断→答案资产→技术→监测），是 SEO 的演进而非替代。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is GEO? → 答案：优化品牌内容使其在 AI 回答中被优先提及的方法论，面向 ChatGPT、DeepSeek、Gemini 等大模型的检索与生成机制。【原文证据：answer-box 一句话定义 + FAQPage JSON-LD】
  2. 问题：What's the difference between GEO and SEO? → 答案：对象（AI 模型 vs 传统引擎）、成功指标（AI 引用+品牌提及 vs 排名+点击）、流量形态、杠杆（直接性+权威 vs 关键词+外链）、见效周期（1–3 月 vs 3–6 月）五维对比；GEO 不替代 SEO。【原文证据：第 3 节对比表 + 表后段落】
  3. 问题：How to do GEO optimization? → 答案：四步——诊断现状（在 AI 平台搜品牌词）→ 答案资产创作 → 技术实施（Schema + LLMs.txt + 开放 AI 爬虫）→ 监测迭代（citation share）。【原文证据：第 4 节有序列表 1–4】
  4. 问题：Why does GEO matter now? → 答案：SparkToro 称 2026 年初约 68% Google 搜索无点击（2024 年为 60%）；Gartner 预测 2026 年传统搜索量因 AI 助手下降 25%。【原文证据：第 1 节含两处外链段落】
  5. 问题：What is the academic origin of GEO? → 答案：2023 年普林斯顿大学首次提出（arXiv:2311.09735，KDD'24），优化可使可见度提升最高 40%；2025 CMU AutoGEO、2026 北航 AgenticGEO 延续该方向。【原文证据：第 7 节列表 + Primary Sources】

## 2. 准确性测试
- 核心概念与术语理解：准确。RAG 三步（Retrieval/Augmented/Generation）、检索期竞争、GEO 与 SEO 关系、四个步骤的解释均与通行认知一致。
- 数字、日期、对象、条件引用：多数关键数字有明确外链——68%（SparkToro）、60%（2024）、Gartner 25%、40%（arXiv:2311.09735）、2023/2024/2025/2026 时间线；但 "Customer acquisition cost reduced 32%–62%"（归因为 "reported by GEO service providers"，模糊归因）、"Results in 1–3 months"、SEO "3–6 months" 均无来源。
- 断章取义 / 过度推断 / 遗漏限制条件："GEO was born from ... zero-click search"（第 1 节）与第 7 节 "2023 Princeton first proposed the GEO concept" 对起源叙述不一致；"Most businesses haven't started yet" 无数据支撑；表格中见效周期为无据对比。
- 前后矛盾 / 无法验证的事实：正文 "Last updated: 2026-07-28" 与 JSON-LD dateModified 2026-08-16 不一致（datePublished 同为 2026-07-28）；arXiv:2510.11438、arXiv:2603.20213 两个编号链接待核实（原文证据不足以确认真实存在）。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 68% Google 搜索无点击（2026 初） | 第 1 节 | 有（SparkToro 链接） | 可 | 是 | 采样方法说明 |
| 2026 传统搜索量降 25% | 第 1 节 | 有（Gartner 2024-02-19） | 可 | 部分（预测非事实） | 标注为预测及其假设 |
| GEO 优化可提升可见度最高 40% | 第 7 节 | 有（arXiv:2311.09735） | 可 | 部分（论文实验条件未交代） | 适用范围与实验设置 |
| 获客成本降低 32%–62% | 第 5 节 | 无（"GEO service providers"） | 不可 | 否 | 具体研究或平台数据 |
| GEO 见效 1–3 个月、SEO 3–6 个月 | 第 3 节表格、第 5 节 | 无 | 不可 | 否 | 行业调查或案例数据 |
| AutoGEO / AgenticGEO 论文存在 | 第 7 节 | 有（arXiv 链接） | 待核实 | 部分 | 链接可达性验证 |

> 注意：Gartner 条目属预测而非已发生事实，正文虽写 "predicts" 但后续推论按既成事实展开；32%–62% 的模糊归因不构成有效证据。

## 4. 独特价值测试
- 原创数据或实测结果：无。
- 独立研究 / 案例：无（引用均为第三方研究）。
- 独特方法 / 框架 / 分析：有——四步法、GEO vs SEO 五维对比表、2026 平台生态表（6 平台 × GEO 相关性）、学术里程碑时间线、Primary Sources 汇总清单，作为入口页的结构化程度全站较高。
- 通用行业知识的重新表述：RAG 原理、四步流程、平台特性描述多为共识复述。
- 无法确认原创性者标注：待核实（对比表与生态表的独创性）。

## 5. 可提取性测试
1. 问题：What is GEO (Generative Engine Optimization)?
   - AI 可提取的答案：面向 AI 大模型检索与生成机制、优化品牌内容以被优先引用的方法论。
   - 原文证据：answer-box 一句话定义。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：GEO vs SEO: what's the difference?
   - AI 可提取的答案：目标、指标、流量、杠杆、周期五维对比表 + "演进而非替代"结论。
   - 原文证据：第 3 节表格与表后段落。
   - 缺失信息：见效周期数据的来源。
   - 是否需结合其他页面：部分（详见 glossary/seo.html）。
3. 问题：What are the four steps of GEO?
   - AI 可提取的答案：诊断 → 答案资产 → 技术实施（Schema/LLMs.txt/开放爬虫）→ 监测迭代。
   - 原文证据：第 4 节有序列表。
   - 缺失信息：各步详细操作与工具。
   - 是否需结合其他页面：是（每步需对应章节页）。
4. 问题：How does GEO differ from traditional search / why act now?
   - AI 可提取的答案：68% 无点击、Gartner 预测 2026 传统搜索降 25%、蓝海窗口。
   - 原文证据：第 1、5、7 节。
   - 缺失信息：32%–62% 降本的可核验来源。
   - 是否需结合其他页面：否。
5. 问题：Where did GEO come from academically?
   - AI 可提取的答案：2023 普林斯顿论文提出（arXiv:2311.09735，KDD'24，最高 40% 提升），2025 CMU AutoGEO，2026 北航 AgenticGEO。
   - 原文证据：第 7 节 + Primary Sources。
   - 缺失信息：后两篇论文的具体结论。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 25 | 概念准确、引用丰富；起源叙述前后不一致与 1 处模糊归因数字需修正 |
| 证据可追溯性 | 25 | 20 | 六项关键外部来源可核验；32%–62%、见效周期等仍为无据断言 |
| 独特价值 | 25 | 16 | 结构化整理程度高（对比表/生态表/时间线/一手来源），但无原创数据 |
| 可提取性 | 10 | 9 | 答案前置、表格与步骤清晰，核心问题可独立回答 |
| 时效性与适用边界 | 10 | 6 | 有明确年份与更新日期，但三处日期不一致、预测被当事实、缺数据时效说明 |
| **总分** | **100** | **76** | |

### 最值得优先修改的 5 个具体位置
1. 第 1 节 "GEO was born from ... zero-click search" 与第 7 节 "2023 Princeton first proposed the GEO concept"：起源叙述不一致，建议第 1 节改为"GEO 概念由学术界提出，其现实驱动是 zero-click 趋势"。
2. 第 5 节 "Customer acquisition cost reduced 32%–62% (reported by GEO service providers)"：模糊归因数据，需具体研究或删除数值。
3. 第 3 节表格 "Time to Results: SEO 3–6 months / GEO 1–3 months"：无来源的经验对比，应标注为估计或补证据。
4. 第 1 节 Gartner 25%：明确标注为 2024 年发布的预测，避免读者当作 2026 年已实现数据。
5. 元信息 "Last updated: 2026-07-28" 与 JSON-LD dateModified 2026-08-16 不一致：需统一并补更新说明。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
