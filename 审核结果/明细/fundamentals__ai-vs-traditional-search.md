# 审计明细：AI Search vs Traditional Search — How Results, Ranking, and User Behavior Fundamentally Differ

- 文件：docs/fundamentals/ai-vs-traditional-search.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,500

> JSON-LD：headline 与 H1 一致；datePublished = dateModified = 2026-08-21，正文 meta "Updated: 2026-08-21"（一致）。

## 1. 核心答案提取

- 核心结论（≤100 字）：AI 搜索把"十个蓝链"变成"一段合成答案"，排名逻辑从关键词转向语义与权威；检索按段落而非页面抽取（RAG），故每个 H2 需可独立作答。零点击使价值从流量转向权威，正确策略是 SEO 打底 + GEO 叠加，两者约重叠 70%。
- 可被直接回答的 5 个用户问题：
  1. 问题：AI 搜索和传统搜索最根本的区别是什么？ → 答案：传统搜索返回 10 条链接列表，AI 搜索返回一段合成答案（可能附 1–2 个来源）；内容的角色从"排名获取点击"变为"被答案引用"。【原文证据：Section I 开头加粗句与对比表】
  2. 问题：AI 搜索的排名因素和 Google 有什么不同？ → 答案：传统靠关键词、外链、技术 SEO、用户信号、域名权重；AI 靠语义匹配、权威信号、内容结构、E-E-A-T、结构化数据——AI 关心意是否直接回答问题。【原文证据：Section II 两组列表 + "Key difference" 段】
  3. 问题：AI 是怎么找到并引用内容的？ → 答案：四步——语义向量化 → 检索最相关网页 → 抽取最相关段落 → 合成答案，即 RAG；"你的内容是被按段落而非页面检索的"，所以 H2 是"mini-page"。【原文证据：Section III 编号列表与结论句】
  4. 问题：零点击趋势有多严重，该怎么应对？ → 答案：文中称 60% Google 搜索无点击（SparkToro 2025）、40% Perplexity 查询无站点访问、ChatGPT 带浏览 25% 查询带来点击；对策是"成为 AI 引用的来源"——零点击不等于零价值，价值从流量转向权威。【原文证据：Section V 列表与 "Zero-click doesn't mean zero-value"】
  5. 问题：我该做 SEO 还是 GEO？ → 答案：两者都要——技术 SEO 打底 + GEO 层叠加，并同时追踪传统排名与 AI 引用；GEO 友好的内容通常也利于 SEO，反之不成立。【原文证据：Section VII 编号列表与末段加粗句】

## 2. 准确性测试

- 核心概念与术语理解：基本准确。RAG 四步流程、E-E-A-T 组成、"按段落检索"的表述与通行理解一致；"AI 不看关键词密度、看语义覆盖"是合理简化（略有绝对化）。
- 数字、日期、对象、条件引用：**存在偏差与不可核验数字**：
  - **"~2-3% for position 1"（Section I 表格，传统搜索第一名 CTR）**：与业界通行引用的自然第一位 CTR（普遍在 20% 以上量级）差距过大，疑似把"某类特殊 SERP/长尾平均"当成通用值，属明显偏差，需修正或注明统计口径。
  - "60% of Google searches end without a click (SparkToro 2025)"：有署名来源，量级与 SparkToro/Datos 公开研究方向一致，但正文未给链接、未注明是否含 AI 展开结果等口径 → 待核实。
  - "40% of Perplexity queries end without site visits (internal data analysis)"：标注为 internal，无方法、无样本量 → 不可核验。
  - "ChatGPT with browsing: 25% of queries result in a site click (OpenAI 2025)"：无链接、无报告名 → 待核实。
  - "SEO 与 GEO 重叠约 70%"（Section VI 与 FAQPage JSON-LD）：精确到个位数但完全无来源，属伪精确。
  - 表格 "Revenue model: Direct answer (no ad model yet)"：AI 平台商业化在 2025–2026 快速演进，此断言有明显时效风险 → 待核实。
- 断章取义 / 过度推断 / 遗漏限制条件："A page with zero keyword matches but perfect semantic coverage can outrank..." 用 "can" 而非 "will"，措辞留有余地；FAQPage 中 "AI doesn't care about keyword density" 更绝对，属轻度过度推断。
- 前后矛盾 / 无法验证的事实：正文与 FAQPage JSON-LD 的数字一致（60%/40%），内部无矛盾；但 meta description 承诺 "All data is linked to verifiable sources"（article-meta 行），实际正文**无一条外链**，属于声明与事实不符。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 60% Google 搜索无点击 | Section I/V | SparkToro 2025（纯文本，无链接） | 待核实 | 部分 | 原文链接与统计口径 |
| 40% Perplexity 查询无站点访问 | Section V | 标 "internal data analysis" | 不可 | 部分 | 方法、样本量、时间窗 |
| ChatGPT 浏览 25% 查询带来点击 | Section V | 标 "OpenAI 2025"（无链接） | 待核实 | 部分 | 具体报告名与链接 |
| 传统搜索第一名 CTR ~2-3% | Section I 表格 | 无 | 不可 | **否**（与通行量级明显不符） | 口径来源；建议改为有出处的数值 |
| SEO/GEO 重叠约 70% | Section VI + FAQPage | 无 | 不可 | 部分（合理定性、精确数字无据） | 改为定性表述或补来源 |
| AI 检索按段落抽取（RAG） | Section III | 无 | 不可 | 部分（描述与通行 RAG 原理一致，但无出处） | 链接 RAG 或引擎官方文档 |
| article-meta "All data is linked to verifiable sources" | 元信息行 | — | — | **否**：正文零外链 | 补齐链接或改写该声明 |

> 注意："文章声称某数据来自某机构"不等于"该数据已获验证"——本页 4 组关键数字中，仅 SparkToro 一项有机构名，且均无可点击来源。

## 4. 独特价值测试

- 原创数据或实测结果：无。全部引用（或转述）第三方数据，且多数不可核验。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：**部分有**——"十蓝链 vs 一段答案"五维对比表、RAG 四步 → "H2 是 mini-page"的推论、"可点击 vs 可信任"的行为对比、"GEO 好的内容通常也利于 SEO，反之不然"的非对称关系，属较好的结构化整合。
- 通用行业知识的重新表述：传统/AI 排名因素列表、零点击概念、SEO+GEO 并行策略均为行业常识复述，占篇幅约 60%。
- 无法确认原创性者标注：对比表与"mini-page"提法的原创性待核实。

## 5. 可提取性测试

1. 问题：AI 搜索和传统搜索有什么区别？
   - AI 可提取的答案：结果格式、用户动作、内容角色、点击率、商业模式五维对比（Section I 表格可整段摘录）。
   - 原文证据：Section I 表格。
   - 缺失信息：各平台（ChatGPT/Perplexity/Google AI Overviews）分列数据。
   - 是否需结合其他页面：否。
2. 问题：AI 搜索排名因素有哪些？
   - AI 可提取的答案：语义匹配、权威信号、内容结构、E-E-A-T、结构化数据五项 + 与传统五项的对照。
   - 原文证据：Section II 两个列表。
   - 缺失信息：各因素权重（无量化依据）。
   - 是否需结合其他页面：是（权重细节需看 metrics/ 与 technical/ 章节）。
3. 问题：什么是零点击搜索，比例是多少？
   - AI 可提取的答案：用户在结果页直接获得答案不点击；文中给 60%（Google）、40%（Perplexity）、25%（ChatGPT 浏览带来点击）。
   - 原文证据：Section V 列表。
   - 缺失信息：来源链接与统计口径；各数字年份。
   - 是否需结合其他页面：建议结合 glossary/zero-click.html（本页未链接）。
4. 问题：做 GEO 会不会影响我的 SEO？
   - AI 可提取的答案：不会冲突，两者约重叠 70%，应并行——技术 SEO 打底 + GEO 叠加，同时追踪两套指标。
   - 原文证据：Section VI/VII。
   - 缺失信息："70%" 的测算依据。
   - 是否需结合其他页面：是（对立观点见 fundamentals/seo-vs-geo.html）。
5. 问题：AI 如何选择引用哪段内容？
   - AI 可提取的答案：RAG 四步——向量化、检索、抽取段落、合成；因此每个 H2 要能独立成答。
   - 原文证据：Section III。
   - 缺失信息：不同引擎检索层差异（如是否使用搜索索引）。
   - 是否需结合其他页面：是（深度见 glossary/rag.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 22 | 概念与流程准确；但"第一名 CTR ~2-3%"明显偏低、"70% 重叠"属伪精确、"no ad model yet" 有时效风险 |
| 证据可追溯性 | 25 | 15 | 4 组关键数字仅 1 组有机构名且无链接，其余标 internal/OpenAI 2025 均不可核验；meta 声称"全部数据链接到可验证来源"与零外链事实不符 |
| 独特价值 | 25 | 16 | 对比表与 RAG→H2 推论有结构化价值，但无原创数据，约六成篇幅为行业常识复述 |
| 可提取性 | 10 | 9 | 答案前置、表格化、FAQPage schema、章节自洽，单页可答多数问题 |
| 时效性与适用边界 | 10 | 6 | 有日期（2026-08-21）且正文/JSON-LD 一致；但缺适用边界与更新机制，"no ad model yet"、CTR 等断言已有时效风险 |
| **总分** | **100** | **68** | |

### 最值得优先修改的 5 个具体位置
1. Section I 对比表 "Click-through: ~2-3% for position 1"：数值与通行认知差距过大，需补来源与口径（是否为含 SERP 特性后的平均），或改为有出处的区间。
2. Section V 数据列表：为 SparkToro 2025、OpenAI 2025 两组数字补上可点击链接；Perplexity "40%" 标 internal，应补方法说明或降级为"约数/示例"。
3. article-meta "All data is linked to verifiable sources"：与正文零外链矛盾，必须补链接或改写措辞，否则本身即为不可信信号。
4. Section VI "they overlap about 70%"：精确百分比无依据，建议改为定性表述（"大部分重叠"）或注明测算方式。
5. Section I 表格 "Revenue model: Direct answer (no ad model yet)"：加时间戳（截至 2026-08）并核实 AI 平台广告现状，避免抓取后直接复述过时信息。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
