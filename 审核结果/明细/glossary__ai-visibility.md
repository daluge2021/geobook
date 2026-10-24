# 审计明细：What is AI Visibility Index? — Measuring GEO Performance

- 文件：docs/glossary/ai-visibility.html
- 页面类型：术语
- 审计日期：2026-10-10
- 正文字数（近似）：380（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：AI Visibility Index 是衡量品牌在 AI 生成答案中被提及与被引用频率的复合指标，通常以 0–100 分呈现；测量流程为选题集 → 多平台提问 → NLP 分析 → 综合打分，三个子指标为 Brand Mention Rate、Citation Share、Description Accuracy。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is AI Visibility Index? → 答案：衡量品牌在 AI 回答中被提及和被引用次数的综合指标，反映"AI 谈到你所在行业时你出现的概率"。【原文证据：answer-box "One-Line Definition"】
  2. 问题：How to measure AI visibility? → 答案：四步——选题集（约 20–50 个）→ 跨 5–8 个 AI 平台重复提问 → 用 NLP 提取品牌提及、链接引用、情感与位置 → 综合打分。【原文证据：第 2 节有序列表 1–4】
  3. 问题：AI Visibility Index 有哪三个子指标？ → 答案：Brand Mention Rate、Citation Share、Description Accuracy。【原文证据：第 3 节表格】
  4. 问题：如何设基线（baseline）？ → 答案：开始 GEO 的第一天列出 10 个最想出现的话题，在 ChatGPT/Perplexity 提问，记录是否被提及、如何被描述、提到几个竞品，之后每月复测。【原文证据：第 4 节有序列表 1–4】
  5. 问题：为什么 SEO 的排名指标在 GEO 不适用？ → 答案：AI 回答有随机性、不呈现"第一名第二名"、不同 AI 平台偏好不同，故需概率型复合评分。【原文证据：第 1 节三个列表项】

## 2. 准确性测试
- 核心概念与术语理解：准确。对复合指标、子指标的解释与常见 GEO 监测口径一致，无术语误用。
- 数字、日期、对象、条件引用：多处经验值无来源——"0–100 score"、"about 20–50" topics、"typically 5–8" platforms、"List 10 topics"；均为建议值但未标注依据。工具名 Profound、SEMrush、BrightEdge 被指"work this way"，无引用。
- 断章取义 / 过度推断 / 遗漏限制条件："AI doesn't show '1st place, 2nd place'" 属绝对化表述，AI 答案中确有推荐清单/排序列表形态，遗漏了该情形；"AI answers have randomness" 未说明可通过重复采样缓解的程度。
- 前后矛盾 / 无法验证的事实：正文 "Last updated: 2026-07-16" 早于 JSON-LD datePublished 2026-07-28，且与 dateModified 2026-08-16 不一致，三处日期互相矛盾。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| AI Visibility Index 为 0–100 复合评分 | 第 1 节末句 | 无 | 不可 | 部分 | 指标定义出处或任一工具文档 |
| 主流 GEO 工具均按四步法测量 | 第 2 节首句 | 无 | 不可 | 否 | Profound/SEMrush 官方方法说明 |
| 三个子指标构成评估体系 | 第 3 节表格 | 无 | 不可 | 部分 | 子指标定义来源与计算口径 |
| 建议 20–50 话题、5–8 平台 | 第 2 节列表 | 无 | 不可 | 否 | 样本量与统计功效依据 |
| AI 回答随机导致需概率指标 | 第 1 节列表 | 无 | 不可 | 部分 | 同问多次答案差异的实测数据 |

> 注意：文中全部数值均为建议经验值，属"文章声称"而非"已验证"，无任何外部可核验来源。

## 4. 独特价值测试
- 原创数据或实测结果：无。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：弱——四步测量法与三子指标表为通用流程整理，无本站独有框架；基线四步清单有一定操作性但属常识步骤。
- 通用行业知识的重新表述：绝大部分。定义、工具罗列、子指标解释均为行业共识的转述。
- 无法确认原创性者标注：待核实。

## 5. 可提取性测试
1. 问题：What is AI Visibility Index?
   - AI 可提取的答案：衡量品牌在 AI 生成答案中被提及与引用频率的综合指标，通常 0–100 分。
   - 原文证据：answer-box 一句话定义。
   - 缺失信息：该指标非行业标准、不同工具口径不同（原文未说明）。
   - 是否需结合其他页面：否。
2. 问题：How to measure AI visibility?
   - AI 可提取的答案：选题集 → 多平台提问 → NLP 内容分析 → 综合打分四步。
   - 原文证据：第 2 节有序列表。
   - 缺失信息：每步的工具选择与成本、误差范围。
   - 是否需结合其他页面：否。
3. 问题：What are the key sub-metrics of AI visibility?
   - AI 可提取的答案：Brand Mention Rate、Citation Share、Description Accuracy 三项及含义。
   - 原文证据：第 3 节表格。
   - 缺失信息：各指标计算公式与阈值基准。
   - 是否需结合其他页面：部分（Citation Share 细节需 metrics/citation-share 页）。
4. 问题：How to set an AI visibility baseline?
   - AI 可提取的答案：首日列 10 个话题、在主流 AI 提问、记录提及与描述、每月复测。
   - 原文证据：第 4 节有序列表。
   - 缺失信息：记录模板、判断"表现好坏"的参考线。
   - 是否需结合其他页面：否。
5. 问题：Why can't SEO ranking metrics measure GEO?
   - AI 可提取的答案：AI 回答有随机性、不显示名次、各平台偏好不同。
   - 原文证据：第 1 节三个列表项。
   - 缺失信息：随机性程度的量化数据。
   - 是否需结合其他页面：是（GEO/SEO 对比需 geo.html、seo.html）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念准确，但绝对化表述与多处无据经验值需修正 |
| 证据可追溯性 | 25 | 15 | 全文零外部来源，工具方法与样本量均为断言（有标注属建议值） |
| 独特价值 | 25 | 14 | 仅结构化整理，无原创数据或独有框架 |
| 可提取性 | 10 | 9 | 答案前置、表格与有序列表清晰，可独立回答 |
| 时效性与适用边界 | 10 | 5 | 正文日期早于发布日期且与修改日期不一致；缺"非标准指标、口径不一"边界说明 |
| **总分** | **100** | **67** | |

### 最值得优先修改的 5 个具体位置
1. 第 2 节首句 "Most GEO monitoring tools (Profound, SEMrush, BrightEdge, etc.) work this way"：需给出至少一处工具方法文档引用，否则改为"常见做法"。
2. 第 1 节 "AI doesn't show '1st place, 2nd place'"：过于绝对，建议补充"AI 亦会输出推荐列表"的例外说明。
3. 第 2 节 "about 20–50" / "typically 5–8"：标注为经验值来源或改为"取决于预算与覆盖需求"。
4. 元信息 "Last updated: 2026-07-16"：早于 JSON-LD datePublished 2026-07-28，与 dateModified 2026-08-16 冲突，需统一。
5. 缺少适用边界段落：应说明 AI Visibility Index 无统一行业标准、各工具数值不可横向比较、0–100 分制为约定俗成。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
