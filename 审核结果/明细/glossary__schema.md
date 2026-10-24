# 审计明细：What is Schema? — Structured Data for AI Understanding

- 文件：docs/glossary/schema.html
- 页面类型：术语
- 审计日期：2026-10-10
- 正文字数（近似）：330

## 1. 核心答案提取
- 核心结论（≤100 字）：Schema 结构化数据是用机器可标记告诉 AI 页面各部分（标题、作者、FAQ、评分等）含义的技术，为 AI 建立"理解捷径"；建议优先实施 FAQ、Article、Person、Product、BreadcrumbList 五种类型；E-E-A-T 决定是否值得信任，Schema 决定能否被精确理解，两者缺一不可。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is Schema structured data? → 答案：用机器可读"标签"告诉 AI 页面哪部分是标题、作者、FAQ、评分，为 AI 建立理解捷径。【原文证据：answer-box 一句定义】
  2. 问题：Which Schema types should I implement first? → 答案：FAQ Schema、Article Schema、Person Schema、Product Schema、BreadcrumbList 五种。【原文证据：第 2 节五个 h3 小节 + JSON-LD FAQ】
  3. 问题：Why does Schema matter for GEO? → 答案：加了 FAQ Schema 后 AI 能直接识别问答对，并可能精确引用其中一条。【原文证据：第 1 节"If you add FAQ Schema markup, AI can directly identify the 'question-answer' pairs and may precisely cite one of them"】
  4. 问题：How does Schema relate to E-E-A-T? → 答案：AI Trust = E-E-A-T（内容质量）× Structured Data（技术表达）；E-E-A-T 无 Schema 则 AI 看不到你的好，Schema 无 E-E-A-T 则 AI 理解你但不愿引用。【原文证据：第 3 节引文块与列表】
  5. 问题：What does each Schema type do? → 答案：FAQ 提取问答对；Article 标记标题/作者/日期/头图；Person 标记作者资历支撑 Expertise；Product 标记名称/价格/库存/评分；BreadcrumbList 标记站点层级。【原文证据：第 2 节各小节】

## 2. 准确性测试
- 核心概念与术语理解：Schema 作为机器可读结构化标记的定义准确；五种类型的字段描述（如 Person 含 LinkedIn/教育背景、Product 含价格库存评分）与 schema.org 常见属性基本相符。
- 数字、日期、对象、条件引用："Five Most Valuable Schema Types" 为本站编辑判断，未标注依据，也未说明为何恰是这五种、相对 HowTo/Video/LocalBusiness 等类型的取舍标准——属无来源的优先级断言。
- 断章取义 / 过度推断 / 遗漏限制条件："AI 可直接识别 FAQ 对并精确引用"省略了关键限制：主要搜索引擎的 FAQ 富结果展示已大幅收紧，且 AI 引用与否还受内容质量、权威度等影响，原文把"可能"当作一般机制描述，易被理解为加代码即获引用的因果暗示。
- 前后矛盾 / 无法验证的事实：meta description 承诺 "This article covers Schema definition, 5 recommended Schema types, **and code examples**"，但正文**没有任何代码示例**——描述与内容不符。可见"Last updated: 2026-07-16"与 JSON-LD `dateModified: 2026-10-10` 矛盾（差近三个月）。"AI Trust = E-E-A-T × Structured Data" 公式为本站自创表述，原文未声明其为观点模型，易被当作公认结论提取。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| Schema 为 AI 建立"理解捷径" | answer-box、第 1 节 | 无 | 不可 | 部分（合理推断但无出处） | 搜索引擎/平台关于结构化数据的官方文档 |
| 五种 Schema 最值得优先实施 | 第 2 节 | 无 | 不可 | 否（编辑判断未标注） | 标注为本站推荐并给出取舍理由 |
| FAQ Schema 使 AI 可能精确引用问答对 | 第 1 节 | 无 | 不可 | 部分 | 引用 AI 搜索如何消费结构化数据的公开研究 |
| AI Trust = E-E-A-T × Structured Data | 第 3 节引文块 | 无 | 不可 | 否（自创公式当结论） | 声明为本站框架模型 |
| Person Schema 支撑 E-E-A-T 的 Expertise | 第 2 节第 3 条 | 无 | 不可 | 部分 | Google 对作者身份标记的官方建议 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。本页正文零外部来源。

## 4. 独特价值测试
- 原创数据或实测结果：无
- 独立研究 / 案例：无
- 独特方法 / 框架：有结构化整理——"五种优先类型"清单与 "AI Trust = E-E-A-T × Schema" 公式是本站自有表达；但清单属于行业常见推荐的重排，公式无推导过程。
- 通用行业知识的重新表述：Schema 定义、各类型字段说明、"结构化数据帮助机器理解"均为 SEO 行业常识复述。
- 无法确认原创性者标注：待核实（五类型清单在 GEO/SEO 科普中常见）

## 5. 可提取性测试
模拟 5 个相关问题，逐一输出：
1. 问题：What is Schema structured data in simple terms?
   - AI 可提取的答案：机器可读标签，告诉 AI 页面各部分含义，建立理解捷径。
   - 原文证据：answer-box（答案前置）
   - 缺失信息：无
   - 是否需结合其他页面：否
2. 问题：Which 5 Schema types are recommended for GEO?
   - AI 可提取的答案：FAQ、Article、Person、Product、BreadcrumbList。
   - 原文证据：第 2 节 h3 列表
   - 缺失信息：推荐依据、优先级排序理由
   - 是否需结合其他页面：否（但建议同时读 technical/schema-markup-guide.html 获取实施细节）
3. 问题：How to implement FAQ Schema (with code)?
   - AI 可提取的答案：原文证据不足——meta 承诺 code examples，正文无任何代码。
   - 原文证据：无（第 2 节仅有类型说明，无 JSON-LD 示例）
   - 缺失信息：完整的 JSON-LD 代码示例
   - 是否需结合其他页面：是（须转至 community/what-is-json-ld.html 或 technical/schema-markup-guide.html）
4. 问题：Does adding Schema guarantee AI citations?
   - AI 可提取的答案：原文称 FAQ Schema 让 AI"可能精确引用"，并强调 Schema 无 E-E-A-T 时 AI 不愿引用；不能保证。
   - 原文证据：第 1 节与第 3 节列表末条
   - 缺失信息：引用概率相关数据、生效条件
   - 是否需结合其他页面：建议（eeat.html）
5. 问题：What is the relationship between E-E-A-T and Schema?
   - AI 可提取的答案：E-E-A-T 判断内容是否值得信任，Schema 帮助 AI 精确理解，二者相乘构成 AI 信任。
   - 原文证据：第 3 节
   - 缺失信息：该公式为本站观点，无外部依据，AI 引用时宜注明出处性质
   - 是否需结合其他页面：建议（eeat.html）

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 20 | "五种最有价值"无依据；FAQ→AI 引用的机制描述省略限制条件；meta 承诺 code examples 但正文缺失，描述与内容不符 |
| 证据可追溯性 | 25 | 11 | 正文零外部来源；自创公式以结论口吻呈现，属"大量无来源"档 |
| 独特价值 | 25 | 14 | 有结构化清单与公式化表达，但主体为常识复述，无实测或独有研究 |
| 可提取性 | 10 | 8 | 基础定义与五类型清单易提取；实施类问题（代码示例）无法在页内回答，页面偏薄（约 330 词） |
| 时效性与适用边界 | 10 | 5 | 可见日期与 JSON-LD dateModified 严重矛盾（07-16 vs 10-10）；未说明 FAQ 富结果政策收紧等适用边界；无更新机制 |
| **总分** | **100** | **58** | |

### 最值得优先修改的 5 个具体位置
1. meta description（第 19 行）：删除 "and code examples" 或在正文补一段 FAQ Schema JSON-LD 示例，消除描述与内容不符。
2. 第 2 节标题"Five Most Valuable Schema Types"：改为 "Five Schema Types We Recommend Starting With（editorial pick）"，避免客观化断言。
3. 第 1 节 FAQ Schema 段：补充限制条件（如 "results vary by engine; markup alone doesn't guarantee citation"），防止"加代码即获引用"的过度暗示。
4. 第 3 节引文块公式：标注 "a working model used by this site"，与公认结论区分。
5. 信息行"Last updated: 2026-07-16"与 JSON-LD dateModified "2026-10-10"：统一日期；并考虑扩充正文（现约 330 词）以覆盖实施要点。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
