# 审计明细：Structured Data for GEO — The Complete Guide to Schema Markup

- 文件：docs/technical/schema-markup-guide.html
- 页面类型：文章
- 审计日期：2026-10-10（JSON-LD datePublished 2026-01-15 / dateModified 2026-10-10，与正文 meta "Updated: 2026-10-10" 一致）
- 正文字数（近似）：1,150

## 1. 核心答案提取

- 核心结论（≤100 字）：结构化数据是让 AI 以最低成本读懂页面字段（类型/作者/日期/价格）的"说明书"；GEO 场景优先做 7 类 Schema（Article、Organization、Person、FAQPage、Product、HowTo、BreadcrumbList），一律用 JSON-LD，按"审计→核心部署→验证"四周推进，避免标记与内容不符。

- 可被直接回答的 5 个用户问题：
  1. 问题：什么是结构化数据，AI 为什么依赖它？ → 答案：用机器可直接理解的格式描述页面字段，把 AI 的"理解成本"降到最低——纯文本要推断语义，JSON-LD 直接给出 price=3000、currency=CNY、rating=4.7。【原文证据：第 1 节 "Structured Data = A 'Manual' for AI" + Product JSON-LD 示例】
  2. 问题：GEO 最重要的 Schema 类型有哪几种？ → 答案：7 种——Article/NewsArticle、Organization、Person、FAQPage、Product、HowTo、BreadcrumbList，各配关键字段与 GEO 价值说明。【原文证据：第 2 节 7 个小标题（1.–7.）+ head FAQPage JSON-LD 第二问】
  3. 问题：三种实现格式该选哪个？ → 答案：只用 JSON-LD（不改页面内容、易维护、AI 爬虫兼容性最好，五星推荐）；Microdata 三星、RDFa 两星基本不用。【原文证据：第 3 节三种格式对比 + "Use JSON-LD format exclusively"】
  4. 问题：结构化数据落地的排期怎么做？ → 答案：第 1 周用 Rich Results Test / Schema Validator 审计；第 2–3 周按 Organization→Article→FAQPage→Product→Person→BreadcrumbList 顺序部署；第 4 周用免费验证工具 + GEO 工具测试。【原文证据：第 4 节 "Week 1 / Weeks 2-3 / Week 4" 三小节】
  5. 问题：常见的 Schema 错误有哪些？ → 答案：四类——标记了页面上不存在的内容、漏填必填字段、页面文案与标记数据不一致（如页面 3,000 元 / 标记 2500）、同一实体重复标记。【原文证据：第 5 节 Mistake 1–4】

## 2. 准确性测试

- 核心概念与术语理解：**准确**。JSON-LD / Microdata / RDFa 三格式定义与优劣判断与行业共识一致；7 类 Schema 的用途与关键字段（headline、sameAs、mainEntity、itemListElement 等）引用正确；"结构化数据降低解析成本" 的论证成立。
- 数字、日期、对象、条件引用：**有 2 处需修正**
  - "FAQ pages with this markup are over 3 times more likely to be cited by AI than regular FAQ pages" —— 明确的量化断言，正文无来源链接，与 meta 行 "external figures are linked to sources" 矛盾，原文证据不足。
  - "AI parses this JSON-LD snippet in just milliseconds" —— 修辞性数字，无依据。
  - 示例中的日期（2026-03-15）、价格（3,000 元）、评分（4.7）均为示例值，标注为示例可接受，无误导。
- 断章取义 / 过度推断 / 遗漏限制条件：**有 1 处遗漏** —— 未提 Google 已于 2023 年起大幅收窄 FAQ/HowTo 富结果展示（HowTo 富结果已在桌面端移除、FAQ 富结果仅限高权威站点），也未提结构化数据本身不是排名因素；文末"there are exceptions"过于笼统，未点明具体例外。首段 "results vary by engine" 是合格的限定语。
- 前后矛盾 / 无法验证的事实：正文与 head FAQPage JSON-LD 三问一致，无内部矛盾。"When AI detects content doesn't match markup, it may reduce trust in your entire site's markup" 属合理但未证实的机制推断，语气已用 "may" 限定。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| JSON-LD 是推荐格式、AI 兼容性最好 | 第 3 节 + FAQ | 无 | 可（与 Google 官方推荐一致） | 部分 | Google 结构化数据文档链接 |
| 7 类 Schema 是 GEO 核心 | 第 2 节 | 无 | 待核实（属经验清单） | 部分 | 说明清单依据（如各引擎引用场景统计） |
| FAQPage 标记使引用概率提高 3 倍以上 | 第 2 节第 4 条 | 无 | 不可 | 否 | 原始研究（作者、年份、样本）；否则改为定性表述 |
| 标记与内容不一致会降低整站标记信任 | Mistake 3 | 无 | 待核实 | 部分（机制合理但未证实） | 官方文档中关于 spam/错误标记处理的说明 |
| 用 Rich Results Test 与 Schema.org Validator 验证 | 第 4 节 | 无（工具名本身即事实） | 可 | 是 | 工具链接 |
| 每类 Schema 的 GEO 价值（如 Breadcrumb 帮助评估 topic authority） | 第 2 节各条 | 无 | 待核实 | 部分（多为合理推断） | 引擎侧证据 |

> 注意：meta 行承诺 "external figures are linked to sources"，正文外部来源链接数为 0，3x 数字因此成为不可核验断言。

## 4. 独特价值测试

- 原创数据或实测结果：**无**（3x 数字非本站产出且未给出处）。
- 独立研究 / 案例：**无**。
- 独特方法 / 框架：**有（结构化整理）**——"7 类 Schema × 关键字段 × GEO 价值" 三段式清单、四周边界路线图（审计→部署→验证）、四类常见错误，属体系化整理；框架原创性**待核实**（属通用工程经验的重组）。
- 通用行业知识的重新表述：结构化数据定义、JSON-LD 优于 Microdata/RDFa、"标记需与内容一致"、验证工具用法，均为行业常识复述；与 community/what-is-json-ld.html、glossary/schema.html 存在主题重叠（页尾已主动互链，重叠部分为常识）。
- 无法确认原创性者标注：7 类优先级清单、四步路线图 —— 待核实。

## 5. 可提取性测试

1. 问题：GEO 应该用哪几种 Schema？
   - AI 可提取的答案：7 种（Article/NewsArticle、Organization、Person、FAQPage、Product、HowTo、BreadcrumbList），每种给出适用页面与关键字段。
   - 原文证据：第 2 节七个编号小节；head FAQPage 第二问答完全一致。
   - 缺失信息：未说明优先级依据，也未提 Video/LocalBusiness/Review 等其他可能相关的类型及其取舍。
   - 是否需结合其他页面：否（本页可完整回答清单）。
2. 问题：结构化数据用 JSON-LD 还是 Microdata？
   - AI 可提取的答案：只用 JSON-LD——不干扰页面内容、最好维护、AI 爬虫兼容性最佳；Microdata 维护复杂易错，RDFa 很少用。
   - 原文证据：第 3 节三种格式优劣 + "Conclusion: Use JSON-LD format exclusively"。
   - 缺失信息：未提及 JSON-LD 可与页面内容分离导致的"标记与可见内容不一致"检测风险（虽在 Mistake 3 有间接提示）。
   - 是否需结合其他页面：否。
3. 问题：结构化数据的部署顺序和排期？
   - AI 可提取的答案：四周——第 1 周审计；第 2–3 周按 Organization→Article→FAQPage→Product→Person→BreadcrumbList 部署；第 4 周验证。
   - 原文证据：第 4 节三小节有序列表。
   - 缺失信息：缺 HowTo 的部署位次（第 2 节列为 7 类之一，第 4 节优先级列表只出现 6 类，前后不对齐）。
   - 是否需结合其他页面：否，但存在内部清单不一致。
4. 问题：加了 Schema 就能提升 AI 引用吗？
   - AI 可提取的答案：不能保证——文章称可降低歧义、FAQPage 类内容更易被部分引擎提取，但结果因引擎而异；应加"为凑数而加标记"的例外。
   - 原文证据：首段 "Pages with FAQPage markup are more easily extracted for some answer features, though results vary by engine" + 结尾 "there are exceptions, and markup should never be added just for the sake of it"。
   - 缺失信息：无任何量化证据说明 Schema 对引用率的实际影响（3x 断言无出处）；未说明 Schema 非排名因素。
   - 是否需结合其他页面：是（效果证据需外部来源，本页无法独立支撑）。
5. 问题：怎么检查我的网站 Schema 有没有写错？
   - AI 可提取的答案：用 Google Rich Results Test 与 Schema.org Validator（均免费）检查错误，重点看四类问题：标记内容不存在、缺必填字段、页面与标记数据不一致、重复标记。
   - 原文证据：第 4 节 Week 4 列表 + 第 5 节 Mistake 1–4。
   - 缺失信息：缺真实校验输出示例与常见报错解读。
   - 是否需结合其他页面：否。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 核心概念与 7 类 Schema 字段引用准确、限定语到位；扣分点为 3x 引用率与 "milliseconds" 无据数字、未说明 FAQ/HowTo 富结果政策变化与"Schema 非排名因素"边界、第 4 节优先级清单漏掉 HowTo（与第 2 节不齐） |
| 证据可追溯性 | 25 | 14 | meta 承诺"外链来源"但全文 0 外部来源；3x 量化结论不可核验，GEO 价值多为合理推断而非证据 |
| 独特价值 | 25 | 16 | 7 类清单 + 四周路线图 + 四类错误是完整体系化整理，但无原创实测/独立数据，常识复述比重高 |
| 可提取性 | 10 | 8 | 首段答案前置、编号小节 + 每类 GEO Value + 表格清单，可独立回答多数问题；扣分点是示例代码块用 `<code>`</code>` 占位符渲染，JSON 被拆成多段 p 标签影响机器提取 |
| 时效性与适用边界 | 10 | 6 | 有更新日期（2026-10-10）与"结果因引擎而异"限定；扣分点是完全未提 Google 富结果政策收紧、HowTo 富结果移除等时效风险，也未标注 7 类清单的适用范围 |
| **总分** | **100** | **68** | |

### 最值得优先修改的 5 个具体位置
1. 第 2 节第 4 条 "FAQ pages … are over 3 times more likely to be cited by AI" —— 补原始研究（作者/年份/样本）外链，否则删除数字改为定性表述；这是全文最大的不可核验断言。
2. 第 4 节 "Weeks 2-3" 优先级列表 —— 只列 6 类且无 HowTo，与第 2 节"7 类"不一致；补上 HowTo 或说明为何不进第一梯队。
3. 第 3 节与第 5 节的示例块 —— 用 `<code>`</code>` 占位符包裹导致 JSON 被渲染成多个段落、script 字符串被切断，改为 `<pre><code>` 以保留可复制的完整代码。
4. 第 2 节 HowTo 条目 —— 补充时效边界："Google 已于 2023 年停止展示 HowTo 富结果，此处价值在于引擎抽取步骤而非富结果展示"。
5. 第 1 节与结尾 —— 明确写入"结构化数据不是排名因素，且不保证被 AI 引用"的边界句，替代目前笼统的 "there are exceptions"。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
