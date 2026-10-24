# 审计明细：How Long Does GEO Take to Work? A Data-Backed Timeline

- 文件：docs/cases/geo-timeline.html
- 页面类型：案例
- 审计日期：2026-10-10
- 正文字数（近似）：1600

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO 见效分两个阶段：结构优化（robots/sitemap/首页可被爬取）2-4 周可见，AI 答案中的占有率（citation share / SOV）通常需 3-6 个月；品类级位次要接近一年。速度差异主要取决于起点（域名权威、模型已知度、内容厚度），无人能保证固定时间表。
- 可被直接回答的 5 个用户问题：
  1. 问题：GEO 多久能看到效果？ → 答案：结构层 2-4 周被 AI 爬虫可见，SOV 一般 3-6 个月，首个 citations 可能更早，但可测量的品类位次是"一个季度起步"的承诺。【原文证据：FAQ "structural optimization becomes visible to AI crawlers in 2-4 weeks, while share of voice in AI answers typically takes 3-6 months"】
  2. 问题：做 GEO 一个月后该看到什么结果？ → 答案：爬取就绪（robots.txt、sitemap、首页被爬虫发现并定期访问），是爬取层面的里程碑，而非 citation share 的变化。【原文证据：FAQ "In month one, the realistic wins are crawl readiness…Expect a crawl-level milestone, not a citation-share movement."】
  3. 问题：为什么对手见效比我快？ → 答案：通常因为对手有既有域名权威与外链、模型已认识的品牌提及、以及 GEO 前就建好的内容深度；新域名面临冷启动。【原文证据："Why Your Timeline Differs From Your Competitor's" 一节及表格】
  4. 问题：有人能保证 GEO 在 X 周内见效吗？ → 答案：不能。AI 答案输出跨引擎、跨时间都不稳定，引用机制非任何单一厂商可控；固定的排名承诺不符合检索与生成原理。【原文证据："The Warning: Nobody Can Guarantee a Timeline" 一节】
  5. 问题：不同起点对时间线的影响是什么？ → 答案：成熟域名/已知品牌/内容深厚者可在数周出 citations 或压缩周期；全新域名、内容薄、无第三方信号者预计 3-6 个月窗口。【原文证据：Starting condition 对比表】

## 2. 准确性测试
- 核心概念与术语理解：准确。"crawl readiness"与"share of voice"两阶段划分清晰，且反复用"consensus ranges / heuristics / directional"限定，避免把行业数字当确定事实。
- 数字、日期、对象、条件引用：
  - 时间表（Weeks 1-4 / 3-8+ / Months 3-6 / 6-12）内有细微不一致：表格写 crawl readiness 为 Weeks 1-4，正文小标题为 "Weeks 1-2"，FAQ 又写 2-4 周；因表述对象不同（发现 vs 完全就绪）尚可自洽，但读者易混。
  - "Citation rates under ~10%…20-30% band…40%+ range" 的 SOV 分段，声明为 monitoring vendors 提供的 "directional reference"，未点名来源。
- 断章取义 / 过度推断 / 遗漏限制条件：有 1 处需注意——正文把 internal full-process case（CRM 品牌"稳定被引用"在第 12 周）当作"our own full-process case study"的既有事实引用，而被引用的源页面 full-process-case.html 自标为 "Illustrative composite case; figures are representative examples"。时间线文章未标注该示例属性，读者会误读为真实观测。
- 前后矛盾 / 无法验证的事实："industry reports most commonly put…3-6 months"、"the consensus of the reports we cross-checked"均未列具体报告名，"monitoring vendors"的 SOV 带宽无出处；"GPTBot traversed the entire site in a single pass"为第一方日志声明，外部不可核验。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 结构优化 2-4 周可见、SOV 3-6 个月 | "industry reports most commonly put first meaningful AI-answer presence at 3-6 months" | 无（仅称"industry reports"） | 不可 | 部分 | 点名报告与日期，否则不可追溯 |
| 自家站点爬虫日志：ClaudeBot 每日读 robots/sitemap，GPTBot 单次遍历全站 | 15-day attribution on geo010.com | 无（第一方日志） | 不可 | 部分 | 提供日志概括口径/时间窗；仅对工程类结论成立 |
| 基建修复是可测的 2 周里程碑 | "Fixing infrastructure is a 2-week milestone you can literally measure" | 无 | 待核实 | 是 | 需交代"两周"在什么条件下成立 |
| CRM 品牌约 3 个月稳定被引用 | 引用 full-process-case.html | 无（站内跨引） | 待核实 | 部分（源页面标注为示例复合案例） | 标注示例性，勿表述为实测 |
| SOV 分段 <10% / 20-30% / 40%+ | "A useful directional reference from monitoring vendors" | 无 | 不可 | 部分 | 给出 vendor 名称或报告链接 |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。

## 4. 独特价值测试
- 原创数据或实测结果：有——geo010.com 抓取日志观察（ClaudeBot 逐日读 robots/sitemap、GPTBot 单次全站遍历、新内容按爬取趟次获得访问），并由此推导出"基建问题 vs 战略问题"的诊断逻辑。
- 独立研究 / 案例：有——站内 12 周 CRM 案例的再引用（但为示例性质，见上）。
- 独特方法 / 框架 / 分析：有——"两阶段曲线 + 起点变量表 + 4 阶段清单"的组合，按起点分档解释时间线差异、并以"cold-start"解释快慢，是较清晰的分析框架。
- 通用行业知识的重新表述：无来源的"3-6 个月行业共识"、SOV 分段带宽、以及"compounding 使后期增益更快"等，属于行业常识的复述而非本文实测。
- 无法确认原创性者标注：待核实（SOV 分段的 vendor 来源、3-6 个月的行业报告出处）。

## 5. 可提取性测试
1. 问题：GEO 见效要多长时间？
   - AI 可提取的答案：两阶段：结构优化 2-4 周可见，AI 答案中的 SOV 通常 3-6 个月；品类位次接近一年。
   - 原文证据：表格 + FAQ 首条。
   - 缺失信息：各数字的原始出处。
   - 是否需结合其他页面：否（本页已自足回答）。
2. 问题：一个月 GEO 该带来什么？
   - AI 可提取的答案：爬取就绪层面的里程碑（爬虫发现 robots/sitemap/首页并回访），不是引用份额变动。
   - 原文证据：FAQ 第二条。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：为什么别人见效快？
   - AI 可提取的答案：既有域名权威/外链、模型已认识的品牌、GEO 前已有内容深度；新域名有冷启动劣势。
   - 原文证据：起始条件对比表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：vendors 声称 X 周见效可信吗？
   - AI 可提取的答案：不可信；固定的 AI 排名保证违反系统工作原理，属营销话术。
   - 原文证据："The Warning" 一节。
   - 缺失信息：判断依据较强，但缺第三方支撑。
   - 是否需结合其他页面：否。
5. 问题：12 周能做出一套 GEO 占位吗？
   - AI 可提取的答案：站内 CRM 案例显示约 3 个月达到"稳定被引用"。
   - 原文证据："our own full-process case study…by the end of week 12"。
   - 缺失信息：该案例的示例/代表性属性未在本页标注。
   - 是否需结合其他页面：是（建议读者核对 full-process-case.html 的示例声明）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念准确、限定充分；但把示例复合案例表述为自有实测，且 SOV 分段无出处 |
| 证据可追溯性 | 25 | 16 | 关键数字（3-6 个月行业共识、SOV 带宽）无外部来源；仅第一方日志且不可核验 |
| 独特价值 | 25 | 18 | 有第一方爬取观察与起点分档框架；但相当部分属行业共识复述 |
| 可提取性 | 10 | 9 | 答案块+FAQ+表格+清单前置，结构化清晰 |
| 时效性与适用边界 | 10 | 8 | 有日期与冷启动边界说明；缺更新机制且无报告名单 |
| **总分** | **100** | **75** | |

### 最值得优先修改的 5 个具体位置
1. （第三节引用处）"our own full-process case study…hit 'stably cited' for a CRM brand"：补充"该案例为代表性示例（illustrative composite）"，避免读者误读为实证数据。
2. （Months 3-6 一节）"Citation rates under ~10% / 20-30% / 40%+"：给出来源 vendor 名称或报告链接，或将数字改述为"方向性示例而非测量值"。
3. （Two-Phase 一节）"industry reports most commonly put…3-6 months"：至少点 2-3 份具体报告及日期，使"共识"可追溯。
4. （Weeks 1-2 一节）"15-day attribution"日志结论：补充采样口径（在哪些日志中观察、几类爬虫、时间窗），提升第一方证据可信度。
5. （表格起止）Weeks 1-4 / Weeks 1-2 / 2-4 周三处口径统一，消除爬取就绪期表述差异。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。