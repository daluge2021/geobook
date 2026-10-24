# 审计明细：Topical Authority — Becoming the "Domain Expert" in AI's Eyes

- 文件：docs/content/topical-authority.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1600

## 1. 核心答案提取
- 核心结论（≤100 字）：Topical Authority 是 AI 在特定子领域把你识别为"专家型来源"的程度，区别于全行业维度的 Brand Authority。资源有限团队应先做单点 topical authority：深耕一个子题、建内容集群、跨 3+ 平台分发，约 12 个月进入引用雪球效应。
- 可被直接回答的 5 个用户问题：
  1. 问题：什么是 GEO 语境下的 Topical Authority？ → 答案：衡量你的内容是否被 AI 识别为特定领域的"专家型来源"；与覆盖全行业的 brand authority 不同，它聚焦特定子话题的深度专长。【原文证据："Topical Authority measures: whether your content is recognized by AI as an 'expert-type source' in a specific domain"】
  2. 问题：AI 如何决定引用谁？ → 答案：通过三个维度评估：内容深度（话题下是否形成完整知识体系）、内容广度（是否有知识盲点）、来源网络（多少权威来源在该话题下引用你）；机制上，RAG 检索从海量候选中挑选，持续深耕单一话题会提升"专长评分"。【原文证据："Three Evaluation Dimensions" 三节 + "AI's selection logic is…"】
  3. 问题：建立 topical authority 的临界点是多少内容？ → 答案：20-30 篇高质量、互相关联的内容，其中 5-10 篇被至少一个权威来源引用/链接，且在 3 个以上平台有存在感。【原文证据："Having 20-30 pieces of high-quality, comprehensive, interrelated content on a topic; Of which 5-10 pieces are cited or linked by at least one authoritative source; Presence on 3 or more platforms"】
  4. 问题：topical authority 和 brand authority 哪个先做？ → 答案：对多数资源有限团队，topical authority 优先——投入更低、路径可量化；多个"针尖"式 topical authority 可汇聚成 brand authority。【原文证据："For most companies, topical authority takes priority over brand authority" 及第 4 节四步法】
  5. 问题：需要多长时间？ → 答案：12 个月时间线：第 1 月选题聚类；第 2-3 月产出 20-30 篇集群内容；第 4-5 月 3+ 平台分发；第 6-8 月获取至少 5 个权威来源引用；第 9-12 月持续更新、进入雪球效应。【原文证据："Practical Timeline" 表格】
  （信息充分，无"原文证据不足"项。）

## 2. 准确性测试
- 核心概念与术语理解：定义准确。Topical Authority 概念自 SEO 时代迁移到 GEO，"专深优于泛广"的理解方向正确；与 brand authority 的区分表述清晰。"AI 的专家识别逻辑与人类相同"是类比性简化，作为解释可以接受但不是机制事实。
- 数字、日期、对象、条件引用：临界点（20-30 篇 / 5-10 篇被引用 / 3+ 平台）、时间线（12 个月分五阶段）、FAQ 中的"6-12 months"均无外部来源，原文仅以 "Based on practical experience in the GEO field" 挂靠，属经验性断言而非可核验引用。示例对象（SME CRM 选择）贴切。
- 断章取义 / 过度推断 / 遗漏限制条件："百科词条是最强的 topical authority 信号"是无依据的绝对化断言；"AI 检索数百或数千条候选"是数量级简化，未标注来源。
- 前后矛盾 / 无法验证的事实：**日期矛盾**——JSON-LD `dateModified` 为 2026-08-16，meta `http-equiv="Last-Updated"` 为 2026-07-28，页面元信息行显示 "Updated: 2026-07-28"，三处不一致。文章 meta 行声称 "All data is linked to verifiable sources"，但正文实际未链接任何外部可验证来源，该声明与事实不符。JSON-LD 定义了 3 个 FAQPage 问答，但正文中不存在 FAQ 章节（仅 schema 声明）。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| Topical Authority 是 AI 专家型来源识别度 | "Topical Authority measures…" | 无 | 不可（概念性定义） | 部分（为定义非事实断言） | 概念出处（行业定义/研究） |
| 三维度评估（深度/广度/来源网络） | "Three Evaluation Dimensions" | 无 | 不可 | 部分 | 引擎侧评估机制的引用或研究 |
| 临界点：20-30 篇 / 5-10 篇被引用 / 3+ 平台 | "Based on practical experience in the GEO field" | 无（自认经验） | 不可 | 部分（经验断言，未伪装成研究） | 实际项目回测数据、样本量 |
| 12 个月时间线（五阶段） | "Practical Timeline" 表格 | 无 | 不可 | 部分 | 真实项目的阶段耗时统计 |
| "百科词条是最强的 topical authority 信号" | Method 3 列表末条 | 无 | 不可 | 否（绝对化断言无任何支撑） | AI 引用中百科类来源占比数据 |
| 雪球效应循环（更深内容→更多引用→…） | "Snowball Effect" blockquote | 无 | 不可 | 部分（逻辑自洽的模型，非实证） | 引用频次随内容量变化的实测 |

> 注意：meta 行 "All data is linked to verifiable sources" 不得被当作来源已核实的证据——正文实际无外部链接，该声明与页面内容矛盾。

## 4. 独特价值测试
- 原创数据或实测结果：无
- 独立研究 / 案例：无（未给出任何可验证项目案例；SME CRM 示例是假设性举例）
- 独特方法 / 框架 / 分析：三维度评估（深度/广度/来源网络）+ 临界点阈值 + 12 个月时间线的组合是本站的具体化整理，有一定结构价值；"针尖→面→品牌"的路径表述有可操作性。
- 通用行业知识的重新表述：**大量**——"深耕单一话题"是 SEO 时代 topical authority 标准论（HubSpot 等早已普及）；content cluster（旗舰+子题+Q&A+数据+案例）是经典集群模型重述；"白帽=真正做好内容"是通用原则；"雪球效应"是循环逻辑重述。
- 无法确认原创性者标注：三维度划分与临界点数字是否参考了其他 GEO 从业者共识，待核实。

## 5. 可提取性测试
1. 问题：topical authority 在 GEO 中是什么意思？
   - AI 可提取的答案：内容被 AI 识别为特定领域"专家型来源"的程度；区别于全行业 brand authority，聚焦子话题深度。
   - 原文证据：第 1 节定义 + brand/topical 对比列表
   - 缺失信息：无
   - 是否需结合其他页面：否
2. 问题：多少内容才能让 AI 认可我的专业度？
   - AI 可提取的答案：约 20-30 篇高质量互链内容，其中 5-10 篇被权威来源引用，3+ 平台有存在感（经验性阈值）。
   - 原文证据："The Tipping Point Effect" 列表
   - 缺失信息：该阈值的实证依据（原文仅称"practical experience"）
   - 是否需结合其他页面：否
3. 问题：做 topical authority 还是 brand authority？
   - AI 可提取的答案：资源有限团队先做 topical authority——投入低、路径可量化；多个针尖式 topical authority 汇聚为 brand authority。
   - 原文证据：第 4 节四步法
   - 缺失信息：无
   - 是否需结合其他页面：否
4. 问题：建立 topical authority 的 12 个月计划是什么？
   - AI 可提取的答案：M1 选题聚类→M2-3 产出 20-30 篇→M4-5 3+ 平台分发→M6-8 拿 5+ 权威引用→M9-12 更新监测进入雪球。
   - 原文证据："Practical Timeline" 表格
   - 缺失信息：无
   - 是否需结合其他页面：否
5. 问题：如何构建内容集群？
   - AI 可提取的答案：旗舰长文 + 子题深文 + 高频 Q&A + 数据文 + 案例文，通过内链互联成知识网络，让爬虫一站理解完整知识体系。
   - 原文证据："Method 2: Build 'Content Clusters'" 列表
   - 缺失信息：无
   - 是否需结合其他页面：否（但站内有更详细的文章可补充）

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 18 | 定义与方向正确，但临界点/时间线等全部核心数字无外部依据；"百科词条最强信号"绝对化断言无据；日期三处不一致；meta 声称数据可验证但正文无来源——多处需修正 |
| 证据可追溯性 | 25 | 12 | 全文零外部来源；几乎所有量化断言为"经验"挂靠；meta 声明与事实矛盾，属"把未经证实的断言当事实+大量无来源"档 |
| 独特价值 | 25 | 14 | 有三维度+临界点+时间线的结构化整理，但无原创实测；topical authority 概念、content cluster、白帽原则均为行业常识重述 |
| 可提取性 | 10 | 8 | 答案前置、分节清晰、表格完整，主要问题可独立回答；但无正文 FAQ（仅 schema），且 JSON-LD 声明的 3 问不在正文中 |
| 时效性与适用边界 | 10 | 5 | 日期三处矛盾（08-16 vs 07-28）；无适用边界（未区分站点规模/行业/资源条件，12 个月时间线对新站与老站含义不同）；无更新机制 |
| **总分** | **100** | **57** | |

### 最值得优先修改的 5 个具体位置
1. 全文日期统一：JSON-LD `dateModified`(2026-08-16)、meta Last-Updated(2026-07-28)、元信息行(2026-07-28) 三处不一致，应统一为真实修改日期。
2. 元信息行 "All data is linked to verifiable sources"：正文无任何外部链接，此声明与事实矛盾——删除或改为"经验性建议，阈值因行业而异"。
3. "The Tipping Point Effect" 的 20-30/5-10/3+ 数字：补上经验来源的限定（如"基于 N 个项目的观察"）或引用行业研究；否则应弱化为"常见观察区间"。
4. Method 3 末条 "Included in encyclopedia entries… the strongest 'topical authority' signal"：绝对化断言无支撑，建议改为"百科类来源在 AI 引用中权重较高（待数据验证）"或删除"strongest"。
5. 正文增加 FAQ 章节：JSON-LD 已声明 3 个 FAQ 问答但正文缺失，违反 schema 与可见内容一致性要求；应将 3 问补入正文（或移除 FAQPage schema）。
