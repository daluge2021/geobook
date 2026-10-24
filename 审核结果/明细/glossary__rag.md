# 审计明细：What is RAG? — Retrieval-Augmented Generation Explained

- 文件：docs/glossary/rag.html
- 页面类型：术语
- 审计日期：2026-10-10
- 正文字数（近似）：480

## 1. 核心答案提取
- 核心结论（≤100 字）：RAG（检索增强生成）指 AI 回答问题时先实时检索相关网页、再基于检索结果生成答案的机制，被视为当前 AI 搜索产品的通用底层架构；对 GEO 而言，内容必须在"检索阶段"被选中才能进入 AI 回答。
- 可被直接回答的 5 个用户问题：
  1. 问题：What is RAG? → 答案：Retrieval-Augmented Generation，AI 先实时从互联网检索相关网页，再基于检索结果生成综合答案。【原文证据：answer-box 一句定义 + JSON-LD FAQ】
  2. 问题：How does RAG work? → 答案：三步——Retrieval（将问题转为语义向量并检索最相关文档）、Augmented（将检索结果作为参考材料附加到问题后）、Generation（模型基于问题与参考材料生成自然语言回答）。【原文证据：第 1 节 Step 1–3】
  3. 问题：Why is RAG important for GEO? → 答案：内容只有在检索阶段被 AI 选中才能出现在答案中；AI 的检索逻辑接近语义搜索而非传统排名信号。【原文证据：第 2 节引文块"Your content can only appear in answers if it is selected by AI during the retrieval stage."】
  4. 问题：What content does RAG favor? → 答案：三项要求——语义相关（覆盖用户各种"问法"）、结构清晰（Schema、答案前置、标题层级）、可信可引用（满足 E-E-A-T、标注数据来源）。【原文证据：第 3 节表格】
  5. 问题：How to get RAG to select your content? → 答案：答案资产创作、语义覆盖、结构化标记（FAQ/Article Schema）、提升可信度、配置 LLMs.txt。【原文证据：第 5 节 5 条列表】

## 2. 准确性测试
- 核心概念与术语理解：RAG 三步流程（检索-增强-生成）的解释基本准确，适合作为术语科普；但"转换为语义向量再搜索"是简化表述——实际检索系统常为 BM25/稠密向量/混合检索，原文未说明此简化边界，属轻微有偏差。
- 数字、日期、对象、条件引用："RAG 是**所有**当前 AI 搜索产品的底层技术架构"（answer-box 与 meta description 均如此断言）为无来源的全称判断，存在过度概括——并非所有 AI 搜索产品都采用同一种 RAG 架构，原文未给任何限定（如"主流""多数"）。
- 断章取义 / 过度推断 / 遗漏限制条件："语义匹配意味着它理解你在找'高性能、好评的国产手机'"为举例性推断，可接受；但"Augmented 步骤决定 AI 答案质量上限"是未经论证的因果断言。
- 前后矛盾 / 无法验证的事实：可见信息行"Last updated: 2026-07-16"与 JSON-LD `dateModified: 2026-08-16` 不一致，读者与机器拿到的更新日期矛盾。正文其余事实（如 ChatGPT 检索流程细节）无法从原文核验，原文也未提供任何外部依据。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| RAG 是所有当前 AI 搜索产品的底层架构 | answer-box 一句定义 | 无 | 不可 | 否 | 各产品架构说明或行业来源；改为"主流 AI 搜索产品的常见架构" |
| RAG 三步流程（Retrieval/Augmented/Generation） | 第 1 节分步说明 | 无 | 不可（凭原文） | 部分（表述自洽但无出处） | RAG 原始论文（Lewis et al. 2020）等出处 |
| 检索基于语义向量而非关键词匹配 | Step 1 段落 | 无 | 不可 | 部分 | 说明混合检索等例外情形 |
| 内容须经检索阶段被选中才能进入答案 | 第 2 节引文 | 无 | 不可 | 部分（行业共识但无引用） | 引用 AI 搜索工作原理的公开资料 |
| 三项内容要求 + 5 条实践建议 | 第 3、5 节 | 无 | 不可 | 部分 | 标注为本站经验总结而非事实陈述 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。本页正文零外部来源。

## 4. 独特价值测试
- 原创数据或实测结果：无
- 独立研究 / 案例：无（ChatGPT 搜索框提问为虚构举例，非实测）
- 独特方法 / 框架：有轻度整理——"三项内容要求"表格与"RAG→GEO 含义"的推导链是本站结构化组织，但框架本身（语义相关/结构清晰/可信可引用）是对通用 GEO 说法的归纳。
- 通用行业知识的重新表述：RAG 定义、三步流程、RAG vs 传统搜索对比表均为行业常识复述；"语义搜索 vs 关键词搜索"对比在多数 GEO/SEO 科普中常见。
- 无法确认原创性者标注：待核实

## 5. 可提取性测试
模拟 5 个相关问题，逐一输出：
1. 问题：What is RAG in one sentence?
   - AI 可提取的答案：RAG 是 AI 回答前先实时检索相关网页、再基于结果生成答案的机制。
   - 原文证据：answer-box 一句定义（答案前置，结构清晰）
   - 缺失信息：无
   - 是否需结合其他页面：否
2. 问题：What are the three steps of RAG?
   - AI 可提取的答案：Retrieval、Augmented、Generation 三步及各自含义。
   - 原文证据：第 1 节 h3 分步标题
   - 缺失信息：各步骤的技术变体（混合检索等）
   - 是否需结合其他页面：否
3. 问题：How does RAG change content strategy for GEO?
   - AI 可提取的答案：内容需语义相关、结构清晰、可信可引用；实践上做答案资产、语义覆盖、Schema、E-E-A-T、LLMs.txt。
   - 原文证据：第 3、5 节表格与列表
   - 缺失信息：各策略的优先级依据与效果数据
   - 是否需结合其他页面：建议（E-E-A-T、Schema 细节在 glossary/eeat.html、glossary/schema.html）
4. 问题：Is RAG the same as traditional search ranking?
   - AI 可提取的答案：不同——传统搜索为关键词匹配+链接列表，RAG 为语义向量匹配+合成答案段落。
   - 原文证据：第 4 节对比表
   - 缺失信息：AI 检索中传统信号（如外链）是否仍起作用
   - 是否需结合其他页面：部分（与 fundamentals/ai-vs-traditional-search.html 有重叠）
5. 问题：Does every AI search product use RAG?
   - AI 可提取的答案：原文声称 RAG 是所有当前 AI 搜索产品的底层架构。
   - 原文证据：answer-box 首句
   - 缺失信息：该断言无任何来源，且缺少"主流/部分"限定——AI 提取此句存在传播失实风险
   - 是否需结合其他页面：原文证据不足，无法可靠回答

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 22 | "所有 AI 搜索产品"全称断言过度；"语义向量"表述简化且未说明边界；"Augmented 决定质量上限"为无依据因果断言 |
| 证据可追溯性 | 25 | 12 | 正文零外部来源，关键断言（全称判断、因果论断）均无出处，属"大量无来源"档 |
| 独特价值 | 25 | 13 | 结构化整理但主体为通用 RAG 知识复述；无原创数据、实测或独有框架 |
| 可提取性 | 10 | 9 | answer-box 答案前置、h2/h3 清晰、表格对比，多数问题可独立回答 |
| 时效性与适用边界 | 10 | 6 | 可见更新日期与 JSON-LD dateModified 矛盾（07-16 vs 08-16）；全称断言缺适用边界；无更新机制说明 |
| **总分** | **100** | **62** | |

### 最值得优先修改的 5 个具体位置
1. answer-box 一句定义（及 meta/JSON-LD description）："the underlying technical architecture of all current AI search products"——将 all 改为 "most mainstream"，或补充来源，消除全称误导。
2. Step 1 段落："doesn't rely on keyword matching but on semantic matching"——补一句说明现实中多为混合检索（关键词+语义），避免绝对化。
3. Step 2 段落："This step determines the upper limit of AI answer quality"——改为观点性表述（如 "largely shapes"）或补充依据。
4. 信息行"Last updated: 2026-07-16"与 JSON-LD dateModified "2026-08-16"——统一为同一实际更新日期。
5. 第 3/5 节——为"三项内容要求"与 5 条实践建议至少加 1–2 个可核验外部来源（或明确标注 "editorial framework"），提升证据分。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
