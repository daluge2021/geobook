# 审计明细：Per-Engine Optimization: What Each AI Engine Actually Reads

- 文件：docs/technical/per-engine-optimization.html
- 页面类型：文章
- 审计日期：2026-10-10（JSON-LD datePublished 2026-09-16 / dateModified 2026-09-16，与正文 meta "Updated: 2026-09-16" 一致）
- 正文字数（近似）：950

## 1. 核心答案提取

- 核心结论（≤100 字）：先做对所有引擎通用的基线（可抓取、答案前置、实体标注、llms.txt + 稳定 robots），基线覆盖约九成；per-engine 只在分发与度量层做差异化（robots/速率、sitemap 分层、llms.txt 段落、更新节奏、按引擎拆分的引用监测），不要为每个引擎做一套内容。

- 可被直接回答的 5 个用户问题：
  1. 问题：GEO 在每个 AI 引擎上做法一样吗？ → 答案：不一样，抓取方式、信任信号权重、是否读 llms.txt 都不同；正确范围是"通用基线 + 轻量 per-engine 分层"。【原文证据：FAQ "Does GEO work the same way on every AI engine?" 与 head FAQPage JSON-LD 一致答案】
  2. 问题：GPTBot、ClaudeBot、PerplexityBot 行为差异是什么？ → 答案：GPTBot 全站深度遍历、会读 sitemap、偏内容深度与新鲜度；ClaudeBot 方法化、sitemap 优先、偏来源一致性与结构化数据；PerplexityBot 按需"验证式"抓取、一页多轮，偏实时核验与引用密度。【原文证据："What the Major Crawlers Actually Do Differently" 表格前三行，含 "Observed on geo010.com" 列】
  3. 问题：所有 AI 引擎都读 llms.txt 吗？ → 答案：不，只有少数引擎与工具读，Google 已声明其 AI 产品不使用它；仍值得发布（低成本、引擎无关的控制文件），但绝不能作为唯一通道。【原文证据："llms.txt: The Engine-Agnostic Misunderstanding" 一节 + FAQ 第三问】
  4. 问题：预算有限时应优先优化哪个引擎？ → 答案：按三个输入排序——① 受众在哪里提问；② 你能否观测到变化；③ 竞争对手已在哪个引擎赢。落地起点：GPTBot + ClaudeBot 保索引覆盖，能测 PerplexityBot 后再加，AI Overviews 作为 Google 邻近面按地区监测。【原文证据："Prioritization: The Three-Input Ranking" 有序列表 + 结尾加粗句】
  5. 问题：怎么做 per-engine 优化又不用做多套内容？ → 答案：答案资产保持唯一，只在分发（robots/速率、sitemap 分层、llms.txt 段落）、新鲜度、结构化数据与监测四类"层"上差异化。【原文证据："Per-Engine Layers to Apply" 六行表格 + 结尾规则句】

## 2. 准确性测试

- 核心概念与术语理解：**准确（主体）**。"baseline 优先、per-engine 是其上的边际层"贯穿全文，未把 per-engine 夸大为替代方案；llms.txt 的定位（少数引擎读、不能作为唯一通道）与公开认知一致；Google 声明 AI 产品不使用 llms.txt 属实。
- 数字、日期、对象、条件引用：**有 1 处需修正**
  - 表格 "Google-Extended … Weighted signals = Same as Google ranking + retrieval" —— 有偏差：Google-Extended 是 Gemini 应用侧的内容引用/训练控制信号，不参与 Google 搜索排名，把它描述为"与 Google 排名相同权重"易误导。同行 "Uses the Googlebot pipeline" 的抓取路径表述可接受。
  - "This baseline gets you the first 90 percent of coverage" —— 修辞性数字，无数据支撑，原文证据不足。
  - 各引擎"Observed on geo010.com"列的定性描述（首个几天内全站遍历、每日 sitemap 优先、按需 burst）—— 属第一方观测声明，无法从文章外部核验，标注为待核实。
- 断章取义 / 过度推断 / 遗漏限制条件：**控制良好**。多处显式限定（"llms.txt usage not guaranteed"、"Rare but spiky; not worth daily attention"、"mind your referral path is often zero-click"、"many do not"），未把"文章声称"包装成已验证结论。"Public datasets we track" 一句含糊，未说明是哪些数据集。
- 前后矛盾 / 无法验证的事实：正文与 head FAQPage JSON-LD 四问答内容一致，无内部矛盾。article-meta 声称 "observed on geo010.com + vendor documentation"，但正文未链接任何 vendor 文档 —— 声明部分未兑现。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 三大爬虫抓取模式差异（全站/sitemap 优先/按需验证） | 差异表 + meta 声称 vendor documentation | 无（未附链接） | 待核实 | 部分（与公开文档方向一致但未引用） | OpenAI/Anthropic/Perplexity 官方 bot 文档链接 |
| geo010.com 观测到的爬虫行为（列 5） | "Observed on geo010.com" 列 | 无（第一方日志未链接） | 待核实 | 部分（站内 crawler-behavior-data 页可佐证但本文未直接给出样本） | 两周日志样本/日期区间/图表 |
| 只有少数域名发布 llms.txt 且几乎零请求、Google 不用它 | "Public datasets we track" 段 | 无 | 待核实 | 部分（Google 声明属实，数据集未指明） | 数据集名称与链接；Google 官方声明出处 |
| 三输入优先级排序法 | "Prioritization" 三列表 | 无 | 可（属方法论） | 是（方法论自洽，非事实断言） | 可补一个真实排序实例 |
| baseline 覆盖"前 90%" | 基线一节 | 无 | 不可 | 否（修辞性数字） | 改为定性表述或给数据 |

> 注意：本页把第一方观测（geo010.com）与行业公开事实并列呈现，观测列未附样本链接，不能等同于已核验数据。

## 4. 独特价值测试

- 原创数据或实测结果：**部分**——"Observed on geo010.com" 列为第一方爬虫观测记录，是本文最有价值部分；但未给出样本量、时间窗口或日志链接，量化程度不足，标注**待核实**。
- 独立研究 / 案例：无独立案例；引用了站内 competitive-ai-analysis、crawler-behavior-data、citation-share 等页作为方法承接。
- 独特方法 / 框架：**有**——"baseline + 分发层/度量层" 的 per-engine 分层模型与"三输入排序法"是清晰的分析框架，站内独有框架，原创性可认（但方法本身无外部对标）。
- 通用行业知识的重新表述：AI 爬虫 UA 列表、robots/sitemap 基础、"不要做多套内容" 的结论属于常识复述；llms.txt 现状（少数引擎读）也是行业公开讨论内容。
- 无法确认原创性者标注：geo010.com 观测结论的样本基础 —— 待核实。

## 5. 可提取性测试

1. 问题：不同 AI 爬虫的行为差异是什么？
   - AI 可提取的答案：五列表格直接给出每个爬虫的发现模式、对 sitemap/llms.txt 的响应、加权信号与本站观测，可整段引用。
   - 原文证据："What the Major Crawlers Actually Do Differently" 表格。
   - 缺失信息：观测列无样本与时间范围，AI 引用时无法标注数据规模。
   - 是否需结合其他页面：否（表格可独立回答）。
2. 问题：我该为哪个 AI 引擎优先做优化？
   - AI 可提取的答案：按受众所在、可观测性、竞争对手已赢三因素排序；起点 GPTBot+ClaudeBot，其次可测的 PerplexityBot。
   - 原文证据："Prioritization: The Three-Input Ranking" 有序列表 + 加粗落地句。
   - 缺失信息：未给出"如何判断受众在哪个引擎"的具体操作（仅给方向）。
   - 是否需结合其他页面：是（竞品扫描需 metrics/competitive-ai-analysis.html）。
3. 问题：llms.txt 值得做吗？
   - AI 可提取的答案：值得但别指望——少数引擎读、Google AI 不用；发布它，同时确保关键答案在渲染页面上存在。
   - 原文证据："llms.txt: The Engine-Agnostic Misunderstanding" 两条后果列表。
   - 缺失信息："少数" 的具体比例与数据来源缺失。
   - 是否需结合其他页面：是（完整写法见 technical/llms-txt-advanced.html，文内已链）。
4. 问题：怎么避免为每个 AI 引擎做多套内容？
   - AI 可提取的答案：唯一答案资产 + 六类分发/度量层（robots 速率、sitemap 分层、llms.txt 段落、新鲜度、结构化数据、按引擎拆分的引用监测）。
   - 原文证据："Per-Engine Layers to Apply" 表格 + 规则句。
   - 缺失信息：每层缺具体配置示例（robots 分速率的写法、按引擎 sitemap 的实现）。
   - 是否需结合其他页面：是（实现细节分散在 ai-crawler-management、data-dashboard-setup 等页）。
5. 问题：如何分别衡量每个引擎的表现？
   - AI 可提取的答案：四项指标——按引擎的抓取覆盖（服务器日志）、sitemap 分段遍历完整度、按引擎的引用份额、按引擎的零点击/品牌访问提升；把拆分视图放上仪表盘。
   - 原文证据："Measuring Per-Engine Performance" 四项列表 + 收尾句。
   - 缺失信息：每项缺计算口径与工具配置步骤。
   - 是否需结合其他页面：是（文内已链 crawler-behavior-data、citation-share、ai-referral-attribution、data-dashboard-setup 四页）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 主体准确、限定语充分；扣分点为 Google-Extended "Same as Google ranking + retrieval" 表述有误导、"first 90 percent" 为无据修辞数字 |
| 证据可追溯性 | 25 | 16 | 有第一方观测列且 meta 标注数据类型（诚实），但 vendor documentation 与 "public datasets we track" 均无链接，观测结论无样本可核验 |
| 独特价值 | 25 | 21 | per-engine 分层模型 + 三输入排序法为站内独有框架，附带 geo010.com 第一方爬虫观测；量化不足扣分 |
| 可提取性 | 10 | 9 | 首段即给结论、双表格 + FAQ 结构完整、站内链接指向承接页；几乎可独立回答全部核心问题 |
| 时效性与适用边界 | 10 | 8 | 有日期（2026-09-16）、多处适用边界（不值得每日关注的爬虫、referral 常为零点击）；扣分点是未提醒 UA 名称会变、未标注观测数据的时间窗口 |
| **总分** | **100** | **78** | |

### 最值得优先修改的 5 个具体位置
1. 差异表 Google-Extended 行 "Weighted signals: Same as Google ranking + retrieval" —— 改为 "Gemini 应用侧内容引用与训练控制；不参与 Google 搜索排名"，避免把两套系统混为一谈。
2. "llms.txt: The Engine-Agnostic Misunderstanding" 段 "Public datasets we track" —— 补数据集名称与链接，或改为"我们站点日志与公开抽样显示"，否则该结论不可核验。
3. 差异表 "Observed on geo010.com" 列 —— 每格补上观测时间窗口（如 "2026-07~08 两周日志"）并链到 data/crawler-behavior-data.html，让第一方观测可追溯。
4. "This baseline gets you the first 90 percent of coverage" —— 无数据支撑，改为定性表述（"the large majority of coverage"）或给出测量依据。
5. meta 行 "vendor documentation" 承诺 —— 在差异表下补一行官方 bot 文档链接（OpenAI/Anthropic/Perplexity），使声明兑现。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
