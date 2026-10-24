# 审计明细：Source Authority — AI's Most Important "Credit Score"

- 文件：docs/models/source-authority.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,774 词（英文，不含导航/页脚/CSS/JS）

> 头部 JSON-LD（仅用于确认标题与日期）：headline "What is Source Authority? — AI's Most Important Trust Signal"；datePublished 2026-01-15，dateModified 2026-08-16。正文 meta 行显示 "Updated: 2026-07-28"。

## 1. 核心答案提取

- 核心结论（≤100 字）：Source Authority 指内容被权威第三方认可、引用与链接的程度；因 AI 无法直接判断真伪，只能靠"被他人引用"做社会性验证，故它是被引用与否的首要因素——但最难速成，需 6-12 个月积累。

- 可被直接回答的 5 个用户问题：
  1. 问题：What is Source Authority in GEO? → 答案：衡量内容源被权威第三方认可、引用与链接的程度——不看你怎么自称，看别人怎么说你。【原文证据："Source Authority measures: the degree to which a content source is recognized, cited, and linked by authoritative third parties"】
  2. 问题：What evidence shows source authority is the top GEO factor? → 答案：Yext 2025 年对 Gemini、OpenAI、Perplexity 上 680 万次 AI 引用行为的分析显示，86% 的 AI 引用来自权威、品牌可控的来源（自有站 44% + 品牌管理的列表/目录 42%）。【原文证据：第 I 节 "6.8 million AI citation behaviors…86% of all AI citations come from authoritative, brand-managed sources" + 分类表】
  3. 问题：Why does AI care about authority so much? → 答案：AI 缺乏人类式主观判断，只能用"社会验证"间接判断——被权威站点多次引用的内容被视为可信，由此形成"信任传递链"；这在联网搜索（RAG）场景尤为关键。【原文证据：第 II 节 "social verification" 与 "trust transfer chain" 两段】
  4. 问题：How do you build source authority? → 答案：三条路径——(1) 主动引用权威第三方来源（快）；(2) 让权威来源引用你（发布一手数据、投稿行业媒体、行业协会、学术合作，长期）；(3) 建立百度百科/维基百科词条。【原文证据：第 IV 节 Path 1/2/3】
  5. 问题：What are the four dimensions of source authority? → 答案：权威站外链的数量与质量、行业媒体提及频率、学术论文被引次数、被列为维基/百科参考资料。【原文证据：第 III 节 Dimension 1-4】

## 2. 准确性测试

- 核心概念与术语理解：Source Authority 定义清楚；"社会验证/信任传递链"对 RAG 场景的解释在机制上成立；预训练数据 vs 联网搜索两套知识系统的划分合理。**但**："Source Authority 是 GEO 中唯一/最重要因素"这一全站反复出现的绝对化表述，其证据链存在推断跳跃（见下）。
- 数字、日期、对象、条件引用：
  - **唯一外部来源**：Yext 2025 研究，680 万次 AI 引用、86% 来自权威品牌可控来源，附链接 https://www.yext.com/research/article/ai-citations-user-locations-query-context；表内 44%+42%+8%+6%=100%，44+42=86%，**表内自洽**。具体 URL 与数字**待核实**（链接已给、可核验，但本次审计未做站外验证）。
  - **明显存疑**："GPT-4 的知识截止是 2023 年 9 月"——常见公开说法为 GPT-4 原版截止 2021 年 9 月，原文数字**待核实且有误导风险**。
  - **无来源数字**：".gov.cn 一条外链价值等于 100 条普通博客外链"、"过去 6 个月 5 家行业媒体报道"举例、时间线表（Weeks 1-2 / Months 6-12）。
- 断章取义 / 过度推断 / 遗漏限制条件：
  - **关键推断问题**：Yext 表格的分类维度是"品牌可控性"（brand-owned / brand-managed listings / brand-influenced reviews / uncontrolled），文章据此推出"source authority（权威性）是被引用的最重要因素"——**两个维度不同**（可控 ≠ 权威），属过度推断；且"86% 来自品牌可控源"反而说明"自有内容+自有目录"占大头，与"必须靠外部权威背书"的论证方向并不完全一致。
  - "负媒体报道也比没有报道好"：无来源、无边界（危机/合规行业不适用），属过度断言。
  - "百科是 AI 最常引用的来源之一""学术引用是最高等级权威信号"：无来源。
  - 结尾"引用份额增长是指数而非线性"：无来源的比喻被当作结论。
- 前后矛盾 / 无法验证的事实："Yu Lei（人本 GEO 提倡者）反复强调…"——人物与主张无任何出处链接，**待核实**；JSON-LD dateModified（2026-08-16）与正文 Updated（2026-07-28）不一致。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 86% AI 引用来自权威、品牌可控来源（680 万样本） | 第 I 节表 + Yext 链接 | 有（Yext 研究页） | 可（待站外核实） | 部分（数据支持"品牌可控"但不直接等于"权威性最重要"） | Yext 分类口径说明 |
| Source Authority 是"唯一最重要因素" | 第 I 节末、结论段 | 无（仅 Yext 数据间接支撑） | 不可 | 部分 | 将"可控性"与"权威性"区分的对照数据 |
| GPT-4 知识截止 2023 年 9 月 | 第 II 节 System 1 | 无 | 待核实（存疑） | 否 | 官方模型卡出处 |
| .gov.cn 一条外链 = 100 条博客外链 | 第 III 节 Dimension 1 | 无 | 不可 | 否 | 权重研究出处 |
| 负媒体报道好过无报道 | 第 III 节 Dimension 2 | 无 | 不可 | 否 | 适用条件与实证 |
| 人本 GEO 提倡者余磊："AI 信任与人类信任最终一致" | 第 V 节 | 无 | 不可（待核实） | 否 | 文章/访谈出处 |
| 百科词条是 AI 高频引用来源 | 第 IV 节 Path 3 | 无 | 不可 | 否 | 引用占比数据 |

> 注：本页是 models 章节中唯一给出外部可核验来源的页面，但 7 条主要结论中仅 1 条有外部来源，其余为无出处断言。

## 4. 独特价值测试

- 原创数据或实测结果：无（Yext 数据为第三方，非本站实测）。
- 独立研究 / 案例：无自有案例；引用了 Yext 研究（外部）与"余磊/人本 GEO"观点（出处待核实）。
- 独特方法 / 框架 / 分析：**Source Authority 四维评估模型、"社会验证—信任传递链"机制图解、三路径建设法、Weeks 1→Months 12 时间线、黑帽 GEO vs 人本 GEO 对比**——站内独有结构化整理（原创性**待核实**）。
- 通用行业知识的重新表述：外链权重、媒体提及、学术引用、百科词条四条本质是 E-E-A-T/数字公关常识的重打包；黑帽/白帽对比是 SEO 领域的老话题移植。

## 5. 可提取性测试

1. 问题：What is Source Authority?
   - AI 可提取的答案：内容源被权威第三方认可、引用、链接的程度；不是自述权威，而是他人的评价。
   - 原文证据：第 I 节首段定义。
   - 缺失信息：量化口径（无评分公式）。
   - 是否需结合其他页面：否。
2. 问题：What data supports source authority's importance in AI citations?
   - AI 可提取的答案：Yext 2025 年 680 万次 AI 引用分析：86% 来自权威、品牌可控来源（自有站 44%、列表目录 42%、评论社交 8%、不受控 6%）。
   - 原文证据：第 I 节表 + Yext 外链。
   - 缺失信息：Yext 分类是否等于"权威性"维度、样本时间窗。
   - 是否需结合其他页面：是（口径讨论可对照 metrics/citation-share.html）。
3. 问题：How do I improve source authority quickly?
   - AI 可提取的答案：快路径是主动引用权威第三方来源（并保证引用真实可核验）；中期建百科词条；长期靠一手数据、媒体投稿、行业协会、学术合作赢得被引用。
   - 原文证据：第 IV 节 Path 1/2/3。
   - 缺失信息：每条路径的成功率、成本与具体操作步骤。
   - 是否需结合其他页面：是（一手数据与外链执行可对照 content/backlinks-in-geo.html、content/source-matrix-strategy.html）。
4. 问题：What are the four dimensions of source authority?
   - AI 可提取的答案：权威外链量质、行业媒体提及频率、学术被引、维基/百科参考资料收录。
   - 原文证据：第 III 节 Dimension 1-4。
   - 缺失信息：各维度的权重与及格线。
   - 是否需结合其他页面：否。
5. 问题：Is black-hat GEO worth it?
   - AI 可提取的答案：不值得——互链农场、AI 训练化灌水、伪造数据引用三类黑帽会被 RAG 交叉验证、E-E-A-T 评估与算法更新淘汰；人本 GEO 具备抗算法迭代、复利与累积三重优势。
   - 原文证据：第 V 节整节。
   - 缺失信息：黑帽被检测/惩罚的实例证据（纯论证）。
   - 是否需结合其他页面：是（案例在 cases/black-hat-prevention.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 19 | 定义与机制解释清楚、Yext 表内自洽；但存在 3 处问题：GPT-4 截止日期存疑、".gov.cn=100 条外链"等无据数字、由"品牌可控 86%"推到"权威性最重要"的维度混淆型过度推断 |
| 证据可追溯性 | 25 | 14 | 有 1 个带链接的外部来源（Yext，值得肯定），但 7 条主要结论中 6 条无来源且被当事实陈述（含"余磊"引语、指数增长、负报道有益），刚触及 14 分档下限 |
| 独特价值 | 25 | 16 | 四维模型+三路径+时间线为站内独有整理（原创性待核实），核心数据来自第三方，方法论部分为 E-E-A-T/数字公关常识重组 |
| 可提取性 | 10 | 9 | 定义前置、四维/三路径结构清晰、含分类表与时间线表，5 问均可独立回答；正文无站内链接略减交叉支撑 |
| 时效性与适用边界 | 10 | 6 | 有更新日期与周/月时间线，但 JSON-LD（2026-08-16）与正文（2026-07-28）不一致；GPT-4 截止日期属时效风险点；"负报道有益"等无适用边界、无更新机制 |
| **总分** | **100** | **64** | |

### 最值得优先修改的 5 个具体位置
1. 第 II 节 "Knowledge has a cutoff date (GPT-4 is September 2023)"：核对官方模型卡并改正/去具体化——这是全文最容易被 AI 直接引用复述的事实性错误风险点。
2. 第 I 节末段 "making source authority the single most important factor"：说明 Yext 分类是"品牌可控性"而非"权威性"，重写推导或补真正衡量权威性的数据，避免维度混淆。
3. 第 III 节 "A backlink from a .gov.cn domain may be worth 100 links from ordinary blogs"：补来源或改为定性表述（"质量远重于数量"）。
4. 第 III 节 "even negative coverage is better than no coverage"：补适用边界（行业/舆情风险），否则删除。
5. 第 V 节 "Yu Lei…repeatedly emphasizes"：补可核验出处（文章/访谈链接）；同时统一 JSON-LD dateModified 与正文 Updated 日期。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
