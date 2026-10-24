# 审计明细：Owned vs Third-Party Sources: The Source Matrix Strategy for GEO

- 文件：docs/content/source-matrix-strategy.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1500

## 1. 核心答案提取
- 核心结论（≤100 字）：AI 答案的引用来源分为 owned / earned / platform / controlled partner 四类；约 86% 引用来自品牌可管理来源（Yext 2025），但社区平台仍占约两成可见份额。策略是按事实类型分配来源，并保持跨源一致。
- 可被直接回答的 5 个用户问题：
  1. 问题：什么是 GEO 的 source matrix 策略？ → 答案：把品牌事实按 owned（自有站）、earned（媒体报道/奖项/数据库）、platform（Reddit/Quora 等社区）、controlled partner（目录/合作页）四类来源分配，各司其职：owned 记录事实，earned 独立佐证，platform 承载体验讨论。【原文证据："A source matrix sorts every place your facts can exist into four buckets…" 及四列表格】
  2. 问题：AI 引用中自有来源占多少比例？ → 答案：Yext 2025 年对 680 万条 AI 引用的分析显示约 86% 来自品牌可管理来源。【原文证据："Yext's 2025 analysis of 6.8 million AI citations concluded that roughly 86% of citations came from brand-managed sources"】
  3. 问题：哪些事实应只放在自有站点？ → 答案：权威性、变更敏感或 YMYL 类事实——产品规格、定价、公司沿革、合规与安全声明——应放在有可见日期的自有页面上，第三方只做佐证、不可替代。【原文证据："Authoritative, change-sensitive, or high-risk belongs on your own pages first" 及 FAQ 段】
  4. 问题：如何给不同类型事实分配来源权重？ → 答案：建议起始权重：产品规格/定价 80% owned / 15% earned / 5% platform；体验对比类 30% / 25% / 45%；本地服务类 40% / 20% / 40%。文章明确标注为 starting weights, not dogma。【原文证据："A Working Allocation Framework" 表格】
  5. 问题：跨源一致性为什么重要？ → 答案：若自有站说 2021 而过期目录说 2019，每个同时检索到两者的引擎都必须"做决定"，而决策点正是错误答案的诞生地。发布新事实前须核对所有现存来源一致。【原文证据："The matrix fails the moment your sources disagree… decision points are where wrong answers get born"】
  （信息基本充分，无需补充事实。）

## 2. 准确性测试
- 核心概念与术语理解：准确。owned/earned/platform 分类是 PESO（Paid/Earned/Shared/Owned）媒体模型向 GEO 场景的合理迁移，四类职责划分逻辑自洽。
- 数字、日期、对象、条件引用：86% / 680 万引用有明确来源（Yext 2025）与条件限定（brand-managed sources），表述规范。"high-teens percentage"（社区平台份额）与 "~38% overlap"（AI 引用页与 Google 排名页重叠度）分别只挂靠在模糊的 "Omnius-type monitoring and others" 与未具名的 "research shows" 上，条件与口径均未交代。
- 断章取义 / 过度推断 / 遗漏限制条件：分配框架表以"typical mid-size brand"为前提并声明"starting weights, not dogma"，限制条件交代清楚，无过度推断。"Reddit alone often accounts for a large slice" 属于量级描述而非精确断言，可接受。
- 前后矛盾 / 无法验证的事实：FAQ 段与正文的 86%、high-teens 表述一致，无内部矛盾。~38% 重叠率与 high-teens 份额在文内无法验证，来源具名度不足。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| ~86% AI 引用来自品牌可管理来源 | "Yext's 2025 analysis of 6.8 million AI citations" | 有（Yext） | 可（有机构+年份+样本量） | 是 | Yext 报告链接/标题 |
| 社区平台占 AI 引用 high-teens 份额 | "Omnius-type monitoring and others" | 有（模糊） | 待核实（来源非正式引用） | 部分 | 具体研究名称、样本口径、时间段 |
| AI 引用页与 Google 排名页仅 ~38% 重叠 | "research shows the pages AI cites and the pages Google ranks overlap only modestly (~38%)" | 无（未具名） | 不可 | 部分 | 研究机构、样本量、测量方法 |
| 四类来源信任度分层（owned=Good、earned=High、platform=High for experience） | 四列表格 | 无 | 不可（为作者判断） | 部分 | 引擎侧信任机制的引用或数据 |
| 按事实类型的来源分配比例（80/15/5 等） | "As a starting allocation for a typical mid-size brand" | 无（作者建议） | 不可 | 部分（文章已声明是建议） | 实际投放效果回测数据 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。86% 有具名来源；其余关键数字均为无名或模糊来源。

## 4. 独特价值测试
- 原创数据或实测结果：无
- 独立研究 / 案例：无（未给出任何本站实测案例）
- 独特方法 / 框架 / 分析：四类来源矩阵向 GEO 场景的迁移、"按事实类型分配权重"的起始配比表、跨源一致性规则（发布前后核对所有来源），属于本站的具体化框架，有一定独创性。
- 通用行业知识的重新表述：owned/earned/shared 分类本身是经典 PESO 模型的重述；"第三方佐证优于自有声明"是公关/SEO 常识；"社区平台在 AI 答案中权重高"是 2025-2026 行业共识。
- 无法确认原创性者标注：分配比例表的来源策略（是否参考过其他 GEO 研究）待核实。

## 5. 可提取性测试
1. 问题：什么是 GEO source matrix？
   - AI 可提取的答案：把品牌事实分布在 owned（自有站）、earned（媒体/奖项/数据库）、platform（Reddit/Quora 等社区）、controlled partner（目录/合作页）四类来源中，按事实类型分配角色。
   - 原文证据：四来源类型表格 + "What Belongs on…" 各节
   - 缺失信息：无（该问题在本页可独立完整回答）
   - 是否需结合其他页面：否
2. 问题：AI 引用里自有内容占多少？
   - AI 可提取的答案：Yext 2025 年 680 万条 AI 引用分析中约 86% 来自品牌可管理来源。
   - 原文证据："The Underlying Numbers" 第 1 条
   - 缺失信息：Yext 报告原始链接
   - 是否需结合其他页面：否
3. 问题：产品定价类事实应该发布在哪里？
   - AI 可提取的答案：应以自有页面为权威记录（80% owned 起始权重），第三方来源做佐证不可替代；须带可见日期。
   - 原文证据："What Belongs on Owned Sources" 列表 + 分配表
   - 缺失信息：无
   - 是否需结合其他页面：否
4. 问题：如何应对 Reddit 等社区平台在 AI 答案中的高占比？
   - AI 可提取的答案：在被问到的社区真实回答品类常见问题，绝不灌水/astroturf；给社区提供易引用的通俗答案与数据；健康的一致性平台 presence 同时降低幻觉风险。
   - 原文证据："What Belongs on Platform Sources" 三条 playbook
   - 缺失信息：无
   - 是否需结合其他页面：否（但引用了 black-hat-prevention 等站内页作延伸）
5. 问题：各来源说法不一致怎么办？
   - AI 可提取的答案：发布前核对所有现存来源一致；发布后更新可控来源，对不可控来源发更正请求；像管理资产清单一样列出每个事实的 canonical owned source、佐证 earned source 与 platform 表现并定期审计。
   - 原文证据："Cross-Source Consistency Is the Requirement" 的 blockquote 规则
   - 缺失信息：无
   - 是否需结合其他页面：否

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 25 | 核心概念与 86% 数字准确；~38% 重叠率与 high-teens 份额来源模糊、口径未交代，属 1-2 处需修正 |
| 证据可追溯性 | 25 | 19 | 86% 有具名来源可核验；~38% 无来源、high-teens 来源具名度低、分配表为无据建议（已声明），多为"无来源但标注清楚"档 |
| 独特价值 | 25 | 17 | 有结构化矩阵与分配框架的具体化整理，但无原创实测/独立数据；PESO 分类与社区平台重要性为行业共识复述 |
| 可提取性 | 10 | 9 | 答案前置、表格清晰、FAQ 可独立回答，主要问题均可本页提取 |
| 时效性与适用边界 | 10 | 7 | 2026-09-16 发布/更新，数据标注年份；分配表限定了"mid-size brand"适用边界并声明非定论，但无更新机制说明、"high-teens"未给具体时间窗 |
| **总分** | **100** | **77** | |

### 最值得优先修改的 5 个具体位置
1. "The Underlying Numbers" 第 2 条中 ~38% overlap：补上研究机构名称、样本量与链接，或改为可溯源引用；当前 "research shows" 无法核验。
2. 同段 "Omnius-type monitoring and others"：替换为正式来源名（报告/文章标题+日期），或明确标注为"多项监测的近似共识区间"并给出区间依据。
3. 四来源类型表的 "Trust level engines assign" 列：注明这是作者基于公开观察的判断而非引擎文档，或引用引擎侧说明。
4. 分配框架表：补充一句校准方法的验证口径（例如"以 competitive AI analysis 的结果为调整依据"已有提及，可再说明如何定义 gap 最大）。
5. FAQ 第 1 问答案：当前与正文几乎逐字重复；可差异化——FAQ 聚焦"能否只做自有内容"的决策问题，正文聚焦数据。
