# 审计明细：Multilingual GEO Strategy — How to Get Cited by AI in Every Language

- 文件：docs/content/multilingual-geo.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：2200 词（英文）

## 1. 核心答案提取

- 核心结论（≤100 字）：多语言 GEO 不是翻译项目，而是多套独立的答案资产策略共享一套技术骨架——用正确 hreflang 做技术基建、以本地化（非直译）生产内容、按各语言自身基线衡量引用表现。
- 可被直接回答的 5 个用户问题：
  1. 问题：hreflang 对 AI 搜索还重要吗？ → 答案：重要，AI 爬虫与传统搜索引擎一样用 hreflang 决定索引/检索哪个语言版本；缺失或错误会导致 AI 引用错误语言版本或忽略本地化版本。【原文证据：第 IV 节 "Hreflang tags still matter for AI because crawlers use them to decide which language version of a page to index, retrieve, and cite."】
  2. 问题：机器翻译够用吗？ → 答案：不够。直译保留措辞但丢失文化语境、本地案例与区域数据；机器翻译可作初稿，之后必须人工本地化。【原文证据：第 III 节 "Direct translation fails at GEO..." 及六维对比表；FAQ 亦复述】
  3. 问题：应该优先做哪些语言？ → 答案：按市场商业价值、本地语内容竞争度、自身维护能力三/四维度打分；多数全球品牌的首选波次是西班牙语、德语、日语、葡萄牙语（pt-BR）、法语；简体中文仅在能运营中国独立 AI 生态（百度、豆包、Kimi）时才做。【原文证据：第 V 节 "Choosing Priority Languages" 四问 + 结论段；FAQ 复述】
  4. 问题：怎么衡量非英语市场的 AI 引用表现？ → 答案：按语言跟踪五项指标——AI 爬虫访问（日志按 UA × 语言路径）、各语言固定提示词集的引用数、按地区分的引荐流量、品牌搜索量、各版本索引覆盖率；每语言对照自身英语基线，绝不横向对比绝对值。【原文证据：第 VI 节指标表格 + "Measure each language version against its own baseline"】
  5. 问题：多语言 GEO 的落地检查清单有哪些？ → 答案：10 项——完整 hreflang（双向、自引用、含 x-default）、语言化 schema、本地案例、文化适配、母语校对、语言专属 sitemap、区域分析看板、本地外链、本地化 FAQ、各市场竞品分析。【原文证据：第 VII 节 "Practical Multilingual GEO Checklist" 1–10】

## 2. 准确性测试

- 核心概念与术语理解：整体准确。hreflang 技术细节（ISO 639-1 小写 + ISO 3166-1 大写如 `pt-BR`、双向互指、自引用 canonical、`x-default`、"缺少 return link 会被丢弃"）与 Google 官方文档一致；GDPR→DSGVO（德语）、LGPD（巴西）、APPI（日本）法规缩写正确；中国 AI 生态（文心一言/豆包/Kimi/混元）与 Naver 生态描述符合事实；"多语言重复不触发惩罚但弱竞争"的表述谨慎、无误导。
- 数字、日期、对象、条件引用：**一处需修正**——"Common Crawl 语料约一半是英语"却标注来源为 "(W3Techs, 2026)"：Common Crawl 语料统计与 W3Techs 网站语言统计是两个不同数据源，归因混用。语言占比表（英语 ~49%、西语 ~6%、德语 ~5%、日语 ~5%、葡语 ~4%、俄语 ~4%、阿拉伯语 <3%）称源自 W3Techs，其中西语与日语比例偏高于 W3Techs 常见口径，**待核实**。"ChatGPT 90+ 语言、Gemini 40+ 语言"有归属（OpenAI）但无链接，**待核实**。表格中 "Relative AI Answer Quality / Competitive Density" 两列来自 "internal testing across major AI engines"，无方法说明，不可核验。**一处过度断言**：错误代码表把 `de-de`（小写变体）与 `deu` 并列声称会导致"Annotation ignored silently"——Google 文档对大小写变体实际较为宽容，真正致命的是无效语言代码与缺失回链，此行表述过强。
- 断章取义 / 过度推断 / 遗漏限制条件："Fewer native-language competitors + rising non-English AI usage = the cheapest GEO win available today" 是合理推断但缺数据支撑其"最便宜"判断；"once an AI engine cites you repeatedly in one language, you become its default source" 属机制推断，未标注为假设。
- 前后矛盾 / 无法验证的事实：正文内部无自相矛盾；日期一致（页面 2026-08-21 = JSON-LD 2026-08-21）✓。"internal testing" 结论与 W3Techs 数据混排在同源标注下，是证据层级混淆而非直接矛盾。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 约一半网络内容为英语，非英语 AI 查询候选池更薄 | 第 I 节 + 语言占比表 | 有（标注 W3Techs, 2026；但与 Common Crawl 混用） | 待核实 | 部分 | 拆分 Common Crawl 与 W3Techs 两条来源并附链接 |
| 各语言 AI 回答质量与竞争密度不同 | 第 II 节表格后两列 | 无（标注为 internal testing） | 不可 | 部分 | 公开测试方法、提示词集与样本量 |
| ChatGPT 支持 90+ 语言、Gemini 40+ 语言 | 第 I 节首段 | 有（标注 OpenAI，无链接） | 待核实 | 部分 | OpenAI/Gemini 官方文档链接 |
| 缺失 return link 会导致语言版本被丢弃 | 第 IV 节错误表 "Missing return links" 行 | 有（"Google docs explicitly warn"） | 可 | 是 | 直接引用 Google 文档段落 |
| 直译内容 AI 引用可能性低 | 第 III 节对比表末行 | 无 | 不可 | 部分 | 直译 vs 本地化版本的引用率对比数据 |
| 非英语市场引用份额更易获得 | 第 I 节三点后果 | 无 | 不可 | 部分 | 分语言引用份额样本 |

> 全篇有"具名来源但无链接"与"第一方 internal testing 无方法"两类弱点；具名来源优于纯无来源，但均未达到"关键结论均可核验"的档位。

## 4. 独特价值测试

- 原创数据或实测结果：无公开数据。语言占比表转引 W3Techs；"internal testing" 结论未披露方法，**待核实**是否来自本站真实测试。
- 独立研究 / 案例：无。东京买家、柏林创始人、"德语页面达到英语 30% 引用"均为假设性情景。
- 独特方法 / 框架：有四件结构化整理——①翻译 vs 本地化六维对比表 ②"两个模型家族、两套打法"（全球模型 vs 市场专属生态）③选语言四问评分 ④月度/季度/半年的监测节奏。其中"两个模型家族"的切分视角有一定整理价值，**原创性待核实**。
- 通用行业知识的重新表述：hreflang 最佳实践、`html lang`、语言专属 sitemap、结构化数据 `inLanguage` 等均为 Google/SEO 行业标准知识的复述；"本地案例替换、单位货币日期适配"是常规本地化操作清单。
- 无法确认原创性者标注：待核实（模型家族 playbook、选语言四问）。

## 5. 可提取性测试

1. 问题：AI 爬虫是否使用 hreflang？
   - AI 可提取的答案：使用。hreflang 决定索引/检索哪个语言版本；无 hreflang 时 AI 会索引任意版本，其余不可见；必须双向互指、自引用 canonical、含 x-default。
   - 原文证据：第 IV 节首段 + 示例代码块 + 错误表前四行。
   - 缺失信息：未区分各引擎（GPTBot vs Google AI Overviews）对 hreflang 的实际依赖程度。
   - 是否需结合其他页面：否。
2. 问题：机器翻译的内容能否用于多语言 GEO？
   - AI 可提取的答案：不能直接用。直译在措辞、案例、数据、单位、覆盖问题五个层面失效；可行流程是机翻初稿→人工改写→替换本地案例与数据→母语校对。
   - 原文证据：第 III 节对比表与 "a workable workflow is..." 段落。
   - 缺失信息：无翻译成本/周期参考。
   - 是否需结合其他页面：否。
3. 问题：多语言 GEO 应该先做哪些语言？
   - AI 可提取的答案：按需求、竞争、商业契合、维护能力打分；首波多为西语、德语、日语、葡语、法语；中文需独立生态运营能力。
   - 原文证据：第 V 节四问列表与结论段。
   - 缺失信息：未给出各语言市场规模数据支撑"首波"建议。
   - 是否需结合其他页面：否。
4. 问题：如何监测各语言的 AI 引用表现？
   - AI 可提取的答案：五指标表（爬虫访问按 UA×路径、固定提示词集引用数、地区引荐流量、品牌搜索、索引覆盖率）+ 工具（原始日志/Cloudflare、GA4/Plausible/Matomo、GSC/Bing）+ 节奏（爬虫与索引月度、引用提示词季度、策略半年）。
   - 原文证据：第 VI 节两张表格与 "Review cadence" 段。
   - 缺失信息：固定提示词集的规模与提问规范未定义。
   - 是否需结合其他页面：部分（提示词集方法可参 `technical/track-ai-citations.html`）。
5. 问题：多语言站点最常见的引用阻断错误有哪些？
   - AI 可提取的答案：五类——无 hreflang、语言代码写错、标签与 sitemap URL 不一致、缺回链、一页混多语言。
   - 原文证据：第 IV 节 "Common Mistakes That Break Multilingual Citations" 表格。
   - 缺失信息：`de-de` 一行结论过强（见第 2 节），AI 直接提取会继承该不精确。
   - 是否需结合其他页面：否。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | hreflang/法规/生态描述准确；扣分：Common Crawl 与 W3Techs 归因混用、`de-de` 被称"静默忽略"过强、语言占比与 90+/40+ 语言数待核实 |
| 证据可追溯性 | 25 | 18 | 优于站内多数文章（有 W3Techs/OpenAI/Google docs 具名来源），但均无链接，核心竞争密度结论依赖未公开的 internal testing |
| 独特价值 | 25 | 17 | 结构化整理完整（六维对比、双 playbook、四问选语言、10 项 checklist），但无原创数据与真实案例，hreflang 部分是官方知识复述 |
| 可提取性 | 10 | 9 | 每节加粗导语即答案、表格密集、编号 checklist、FAQ JSON-LD 与正文高度一致 |
| 时效性与适用边界 | 10 | 8 | 日期一致且新（2026-08-21）；有明确条件边界（中文需独立生态、维护能力门槛、复核节奏）；扣分：表格数据未标注复核频率 |
| **总分** | **100** | **76** | |

### 最值得优先修改的 5 个具体位置

1. 第 I 节 "roughly half of the content in the Common Crawl corpus is in English ... (W3Techs, 2026)"：Common Crawl 语料与 W3Techs 网站统计是两个来源，拆成两条引用并各附链接，否则删除 Common Crawl 归因。
2. 第 IV 节错误表 "Wrong codes (`de-DE` written as `de-de` or `deu`)" 行：`de-de` 大小写变体 Google 实际可识别，与无效代码 `deu`/`br` 并列会误导；改为区分"格式不推荐"与"代码无效"两类。
3. 第 II 节语言占比表脚注 "internal testing across major AI engines"：补充测试方法（引擎版本、提示词集、评测日期）或把 "Relative AI Answer Quality / Competitive Density" 两列改为主观判断标注，避免与 W3Techs 数据同栏呈现造成"同等可信"错觉。
4. 第 I 节 "ChatGPT understands more than 90 languages according to OpenAI, Google's Gemini covers 40+ languages"：补官方文档链接，便于核验且可被 AI 检索时作为可追溯引用。
5. 第 VI 节 "Fixed prompt set run monthly in each language"：定义提示词集的最小规模与品牌词/品类词配比，否则该方法无法被读者直接执行。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
