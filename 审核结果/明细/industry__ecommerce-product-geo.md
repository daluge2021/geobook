# 审计明细：E-Commerce Product GEO — How to Get AI to Recommend Your Products

- 文件：docs/industry/ecommerce-product-geo.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1250
- 头部日期核对：JSON-LD `datePublished` 2026-01-15 / `dateModified` 2026-08-27，正文元信息 `Updated: 2026-08-27`，两者一致。

## 1. 核心答案提取
- 核心结论（≤100 字）：电商 GEO 的关键是让产品页具备可被 AI 结构化抽取的数据：Product Schema（价格/库存/评分）、对比表、真实评论与 FAQ；缺这些，AI 无法把你的产品纳入推荐。
- 可被直接回答的 5 个用户问题：
  1. 问题：AI 是怎么选出推荐产品的？ → 答案：三步——Retrieve（检索语义匹配页面）、Evaluate（按信息完整度、来源权威性、数据新鲜度打分）、Synthesize（抽取数据点并生成带理由的推荐）。【原文证据：Section I 有序列表】
  2. 问题：产品页最该加哪种结构化数据？ → 答案：Product Schema，重点字段为 `name`、`offers.price`+`priceCurrency`、`offers.availability`、`aggregateRating`、`brand`。【原文证据：Section II "Fields AI extracts most frequently" 列表及完整 JSON-LD 示例】
  3. 问题：AI 最爱引用什么形式的电商内容？ → 答案：对比内容（comparison content），文中称对比表比散文被引用多 3 倍，并给出同品类对比与使用场景推荐两种表格格式。【原文证据：Section III 及 Section VI checklist "3x higher citation rate than prose"】（该 3 倍数字无外部出处，见第 2、3 节）
  4. 问题：评论应该怎么优化才能被 AI 引用？ → 答案：加 Review Schema（`reviewBody`/`ratingValue`/`author`）、引导含具体场景的详细评论、置顶"最有帮助"评论、做 FAQ 区。【原文证据：Section IV 四步有序列表】
  5. 问题：独立站、平台卖家、社交电商分别该做什么？ → 答案：独立站全量部署 Product+Review+FAQPage Schema 与 llms.txt；平台卖家填满属性字段、优化标题、用 A+ 内容；社交电商配视频+详细文案、鼓励场景化评论。【原文证据：Section V 三个小节】

## 2. 准确性测试
- 核心概念与术语理解：整体准确。Product / Offer / AggregateRating / Brand 等 schema.org 类型使用正确，JSON-LD 示例可直接运行；Retrieve–Evaluate–Synthesize 三步与主流 RAG 流程一致。
- 数字、日期、对象、条件引用："AI cites comparison tables 3x more than prose" 与 checklist 中 "3x higher citation rate than prose" 为量化断言，全文无出处、无实验说明，属无来源数字。示例产品（ProNoise ANC-500、SilenceMax Pro）及其 35dB/45dB 降噪参数为虚构示意，但正文未标注"示例/虚构"，有被当作真实产品数据误引的风险。
- 断章取义 / 过度推断 / 遗漏限制条件："Missing `availability` — AI assumes product doesn't exist if not specified" 与 "AI won't recommend unavailable products" 属绝对化推断，未说明是哪一代模型/哪个引擎的行为；"AI cross-references multiple sources（识破刷评）" 同样无依据。
- 前后矛盾 / 无法验证的事实：面包屑 JSON-LD（BreadcrumbList）指向 `VI. Brand Strategy → brand/ecommerce-geo.html`，与本页实际路径 `industry/ecommerce-product-geo.html` 及正文面包屑 `VII. Industry` 不一致，属结构化数据自相矛盾。另有 HTML 标记错误：`<code>offers.availability</strong>`（code 起始、strong 闭合）。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| AI 选品三步流程 | Section I 有序列表 | 无 | 不可 | 部分 | 该流程对应的引擎/论文出处 |
| 对比表被引用多 3 倍 | Section I 表格、Section VI checklist | 无 | 不可 | 否 | 原始研究、样本量、统计口径 |
| Product Schema 是最关键优化 | Section II 首段 | 无（仅站内 glossary 内链） | 不可 | 部分 | 搜索/AI 引用结构化数据的实测比例 |
| 缺 availability 则 AI 认为产品不存在 | Section II "Common mistakes" | 无 | 不可 | 否 | 具体引擎行为证据 |
| 详细评论提升 AI 引用 | Section IV | 无 | 不可 | 部分 | 引用量与评论数相关性数据 |
| 平台分层策略有效 | Section V | 无 | 不可 | 部分 | 各平台被 AI 引用的案例 |

> 元信息行声称 "All data is linked to verifiable sources"，但正文没有任何指向外部可核验来源的链接，仅站内 glossary 内链——该声明与实际不符。

## 4. 独特价值测试
- 原创数据或实测结果：无（"3x" 无出处，不构成可采信原创数据）。
- 独立研究 / 案例：无真实案例；对比表与产品参数为虚构示意。
- 独特方法 / 框架 / 分析：P0/P1/P2 优先级 checklist、两种对比内容格式（同品类对比 / 使用场景推荐）、独立站-平台-社交三类分工，属较好的结构化整理（原创性待核实）。
- 通用行业知识的重新表述：三步流程（即通用 RAG 常识）、"FAQ 直接映射用户查询"、"加 Schema" 等属常识复述；"well-optimized product pages dominated Google Shopping a decade ago" 为类比修辞而非证据。
- 无法确认原创性者标注：待核实。

## 5. 可提取性测试
1. 问题：做电商 GEO 要先做哪件事？
   - AI 可提取的答案：给每个产品页部署 Product Schema（P0），并为头部产品做对比表（P0）。
   - 原文证据：Section VI checklist 表格（Action/Priority/Impact 三列）。
   - 缺失信息：无优先级排序依据与预期收益量化。
   - 是否需结合其他页面：否。
2. 问题：Product JSON-LD 应包含哪些字段？
   - AI 可提取的答案：name、description、sku、brand、offers（price/priceCurrency/availability/seller）、aggregateRating（ratingValue/reviewCount），原文给了完整可复制示例。
   - 原文证据：Section II `<pre><code>` 代码块。
   - 缺失信息：无 offers 的 priceValidUntil 等可选字段说明。
   - 是否需结合其他页面：否（但 schema 细则需结合站内 schema-markup-guide）。
3. 问题：产品页对比内容有哪几种格式？
   - AI 可提取的答案：格式 A 同品类横向对比表（价格/降噪/续航/重量/适用场景），格式 B 使用场景推荐表（场景-推荐产品-理由）。
   - 原文证据：Section III 两张表格。
   - 缺失信息：无发布位置的效果差异数据（只给了 4 个渠道列表）。
   - 是否需结合其他页面：否。
4. 问题：市场卖家（Amazon/Shopify）该怎么做 GEO？
   - AI 可提取的答案：标题带关键规格、填满属性字段、回复 Q&A、用 A+/增强品牌内容。
   - 原文证据：Section V "Marketplace Sellers" 列表。
   - 缺失信息：未区分 Amazon 与 Shopify 的机制差异（如 Amazon 不允许自部署 Schema），也未说明第三方平台内容 AI 是否可抓取。
   - 是否需结合其他页面：可能需要（平台限制未覆盖）。
5. 问题：AI 会推荐缺评论的新产品吗？
   - AI 可提取的答案：原文称评论是 AI 最看重的信任信号、会形成"评论-推荐"飞轮，但未给出最低评论数阈值。
   - 原文证据：Section IV "review-citation loop"。
   - 缺失信息：阈值、无评论时的替代方案均缺失；"AI 是否会推荐零评论产品"原文证据不足。
   - 是否需结合其他页面：是（评论/信任机制需结合 brand 与 metrics 章节）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | Schema 知识准确，但 "3x" 无依据、"缺 availability 即视为产品不存在"等绝对化推断需修正；面包屑 JSON-LD 指向 brand/ecommerce-geo.html 与实际路径矛盾；`offers.availability` 标签闭合错误 |
| 证据可追溯性 | 25 | 13 | 全文零外部可核验来源，唯一量化结论（3x）无出处；meta 声称"数据均可验证"与实际不符 |
| 独特价值 | 25 | 17 | 有 P0/P1/P2 checklist 与两种对比格式的结构化整理，但无原创实测/案例，多数为通用 GEO 常识复述 |
| 可提取性 | 10 | 9 | 答案前置、表格与代码块齐全，单页可独立回答多数问题 |
| 时效性与适用边界 | 10 | 8 | 有发布/更新日期与 2026 年示例；缺平台差异与引擎行为变化的边界说明 |
| **总分** | **100** | **71** | |

### 最值得优先修改的 5 个具体位置
1. Section I 表格与 Section VI checklist 的 "3x"：删除或补上可核验出处，否则改为定性表述（"更常被引用"）。
2. Section II "Common mistakes" 之 "AI assumes product doesn't exist if not specified"：改为有边界的表述并注明引擎差异，避免绝对化。
3. `<head>` 中 BreadcrumbList JSON-LD：item 链接应改为 `industry/ecommerce-product-geo.html` 并把上级改为 `VII. Industry`，与正文面包屑一致。
4. 元信息行 "All data is linked to verifiable sources"：要么为关键结论补外部来源，要么删除该声明。
5. Section III 对比表中的虚构产品参数：加 "(illustrative example)" 标注，避免被 AI 当作真实产品数据引用；同时修复 `<code>offers.availability</strong>` 标签错误。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
