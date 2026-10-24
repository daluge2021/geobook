# 审计明细：What is E-E-A-T? — Trust Mechanism in the AI Era

- 文件：docs/glossary/eeat.html
- 页面类型：术语
- 审计日期：2026-10-10
- 正文字数（近似）：480（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：E-E-A-T（Experience, Expertise, Authoritativeness, Trustworthiness）是 Google 衡量内容可信度的框架，呈信任金字塔，Trust 为顶；在 AI 搜索时代它直接影响 AI 是否愿意引用你，文中以 Yext 6.8M 引用研究的 86% 作为佐证。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is E-E-A-T? → 答案：Experience、Expertise、Authoritativeness、Trustworthiness 四个维度构成的信任金字塔，是 Google 衡量"内容是否值得被推荐"的黄金标准。【原文证据：answer-box 一句话定义】
  2. 问题：What are the four dimensions? → 答案：经验（你真的做过吗）、专业（你真的懂吗）、权威（别人认可你吗）、可信（你值得信任吗），Trust 位于金字塔顶，前三层服务于它。【原文证据：第 1 节 Layer 1–4 标题与段落】
  3. 问题：Why does E-E-A-T matter in AI search? → 答案：Yext 2025 年对 680 万次 AI 引用行为的分析显示 86% 的 AI 引用来自权威、可验证的来源，说明可信度在 AI 选择中优先于相关性。【原文证据：第 2 节含外链段落】
  4. 问题：How to implement E-E-A-T? → 答案：四维检查表——内容层（真实案例/资历标注/权威引用/数据来源）+ 技术层（Person/Author Schema、外链、HTTPS、隐私政策）。【原文证据：第 3 节表格】
  5. 问题：How does E-E-A-T differ between YMYL and non-YMYL? → 答案：YMYL（医疗、金融、法律等）要求作者持有正式专业资格，非 YMYL 要求"日常专业性（everyday expertise）"。【原文证据：第 1 节 Layer 2 列表】

## 2. 准确性测试
- 核心概念与术语理解：准确。四维定义、Trust 为核心、YMYL 资格要求、Experience 于 2022 年加入，均与通行理解一致。
- 数字、日期、对象、条件引用：6.8 million citations、86%、2025、"added ... only in 2022" 有明确对象与年份；其中 6.8M/86% 有外链可核验，2022 年份待核实。
- 断章取义 / 过度推断 / 遗漏限制条件：由"86% 引用来自权威可验证来源"直接推出 "credibility > relevance" 属单数据点的强推断，未说明该研究的口径与限制；"AI actively favors high-EEAT sources ... low-EEAT websites often rank below" 无来源；meta description 称 E-E-A-T 是"the core factor determining whether AI will cite your brand"，强于正文的"directly influences"。
- 前后矛盾 / 无法验证的事实：正文 "Last updated: 2026-07-16" 早于 JSON-LD datePublished 2026-07-28、异于 dateModified 2026-08-16；编辑缺陷——第 1 节 Layer 3 段落中英混排（"how much others认可 you"），影响纯英文页面的文本提取质量。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 86% AI 引用来自权威可验证来源 | 第 2 节（含链接） | 有（Yext 研究） | 可 | 是 | 研究方法、样本行业分布 |
| credibility > relevance | 第 2 节推论 | 无 | 不可 | 部分 | 多研究交叉验证 |
| AI 检索中低 EEAT 排在高 EEAT 之后 | 第 2 节末段 | 无 | 不可 | 否 | 检索排序/引用偏好实验 |
| Experience 维度 2022 年新增 | 第 1 节 Layer 1 | 无 | 待核实 | 部分 | Google 指南更新记录 |
| Trust 为金字塔顶、其余三维服务它 | 第 1 节 Layer 4 | 无 | 待核实 | 部分 | Google 原始图示 |

> 注意：除 Yext 一项外，全文其余机制性结论均为无来源断言；"文章声称"不等于"已验证"。

## 4. 独特价值测试
- 原创数据或实测结果：无（Yext 数据为第三方引用）。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：有但有限——四维"内容层 × 技术层"检查表把 E-E-A-T 落到可执行动作，属结构化整理；金字塔分层解释本身是既有共识。
- 通用行业知识的重新表述：绝大部分。四维定义、YMYL 说明、透明度/准确性/客观性/安全性四要素均为常识复述。
- 无法确认原创性者标注：待核实（检查表原创性）。

## 5. 可提取性测试
1. 问题：What does E-E-A-T stand for?
   - AI 可提取的答案：Experience, Expertise, Authoritativeness, Trustworthiness，Google 衡量内容可信度的框架。
   - 原文证据：answer-box + 第 1 节标题。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：Why is E-E-A-T important for AI citations?
   - AI 可提取的答案：Yext 对 680 万次 AI 引用的分析显示 86% 来自权威可验证来源。
   - 原文证据：第 2 节含外链段落。
   - 缺失信息：该研究的行业/平台覆盖限制。
   - 是否需结合其他页面：部分（GEO 视角需 content/eeat-in-geo.html）。
3. 问题：How do you implement E-E-A-T on a page?
   - AI 可提取的答案：按四维执行内容层与技术层动作（真实案例、资历标注、权威引用、数据来源标注、Person/Author Schema、HTTPS）。
   - 原文证据：第 3 节检查表。
   - 缺失信息：优先级排序与常见失败模式。
   - 是否需结合其他页面：是（技术细节需 technical/schema-markup-guide.html）。
4. 问题：What is YMYL and how does it affect E-E-A-T?
   - AI 可提取的答案：医疗/金融/法律等 YMYL 需正式专业资格，非 YMYL 需日常专业性。
   - 原文证据：第 1 节 Layer 2。
   - 缺失信息：YMYL 完整定义（仅站内 ymyl.html 有）。
   - 是否需结合其他页面：是（需 glossary/ymyl.html）。
5. 问题：What are the four layers of the E-E-A-T pyramid?
   - AI 可提取的答案：Experience→Expertise→Authoritativeness→Trustworthiness，Trust 为顶。
   - 原文证据：第 1 节 Layer 1–4。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念准确；1 处强推断、1 处无来源机制断言、1 处中英混排编辑缺陷 |
| 证据可追溯性 | 25 | 17 | 有 1 个可核验外部研究，其余机制结论均无来源但未伪装成数据 |
| 独特价值 | 25 | 14 | 内容层×技术层检查表有整理价值，主体为通用知识复述 |
| 可提取性 | 10 | 9 | 答案前置、分层小标题与表格清晰，多数问题可独立回答 |
| 时效性与适用边界 | 10 | 5 | 三处日期不一致；缺"E-E-A-T 为指南非直接排名因子、AI 引用影响未经官方确认"的边界 |
| **总分** | **100** | **69** | |

### 最值得优先修改的 5 个具体位置
1. 第 1 节 Layer 3 段落 "how much others认可 you"：英文正文混入中文，必须改为 "how much others recognize you"。
2. 第 2 节 "in AI's 'selection criteria,' credibility > relevance"：由单一 86% 数据推导出普适排序，应加"基于该研究口径"限定。
3. 第 2 节末段 "low-EEAT websites often rank below high-EEAT websites"：无来源机制断言，需补研究或改为假设表述。
4. meta description "the core factor determining whether AI will cite your brand"：强于正文，需降级为"influences"。
5. 元信息 "Last updated: 2026-07-16"：与 datePublished 2026-07-28、dateModified 2026-08-16 冲突，需统一。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
