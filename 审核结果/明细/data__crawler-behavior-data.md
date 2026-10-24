# 审计明细：AI Crawler Behavior Report: 12 Days of Real Crawl Data on a GEO Site

- 文件：docs/data/crawler-behavior-data.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：2,000

## 1. 核心答案提取
- 核心结论（≤100 字）：对 geo010.com 做 12 天（2026-08-21 至 09-01）Cloudflare Worker + D1 全量请求日志分析：Bingbot 最多（326 次/95 页/12 天全勤），ClaudeBot 最稳（18-42 次/天），Amazonbot 覆盖面最广（117 页），OpenAI 分 OAI-SearchBot（稳）与 ChatGPT-User（用户触发、单日冲 57 次）两种行为。
- 可被直接回答的 5 个用户问题：
  1. 问题：哪个 AI 爬虫访问最多？ → 答案：Bingbot，326 次请求、95 个唯一页面、12 天全勤；因 Bing 是 Copilot/ChatGPT 搜索/Perplexity 的后端，是 AI 流量主入口。【原文证据：爬虫表 Bingbot 行 + "Bing is the primary AI gateway"】
  2. 问题：ClaudeBot 的爬取规律是什么？ → 答案：12 天中 11 天活跃、每日 18-42 次、无突发，新内容约 24-48 小时被收录，无需手动提交。【原文证据："2. ClaudeBot is the most predictable" + FAQ 第 2 问】
  3. 问题：OpenAI 有几种爬虫行为？ → 答案：两种——OAI-SearchBot（111 次/12 天，平稳、Bing 驱动）与 ChatGPT-User（61 次/仅 4 天，单日冲 57 次，用户实时搜索触发）。【原文证据："4. OpenAI shows two distinct behaviors" + 表格两行】
  4. 问题：爬虫最常访问哪些页面？ → 答案：首页 571 次、robots.txt 247 次、sitemap.xml 138 次，随后是 what-is-geo（40）、citation-share（37）、llms-txt-guide（36）。【原文证据："Which Pages Do Crawlers Prioritize?" 表】
  5. 问题：爬虫数据对 GEO 有什么操作建议？ → 答案：以 Bing Webmaster Tools 为主 AI 数据源、内容做成可独立引用的问答式、按 Claude 节奏稳定发布、把第三方提及当增长信号、过滤伪装 UA 扫描噪音。【原文证据："What Are the Practical Implications for GEO?" 5 条列表】
  （数据采集方法在 "How We Collected the Data" 有完整说明：按 UA 打标、记录路径/状态/页面类型/推荐来源，剔除 null UA。）

## 2. 准确性测试
- 核心概念与术语理解：UA 识别、引用份额、爬取≠引用等概念使用基本正确；"爬虫可访问/可理解是被引用的前两个条件"这一表述逻辑通顺。
- 数字、日期、对象、条件引用：表内算术全部自洽（326/12≈27、254/11≈23、111/12≈9、61/4≈15 等 10 行均验证通过）。但存在**口径矛盾**：摘要称 "4,115 crawler hits"，下一段又称 "roughly 2,744 additional hits came from null user-agent scanners **excluded from the crawler totals**"——若 4,115 已排除扫描器，则不应再"additional"；若未排除，则 4,115 不该称为 crawler hits。另：正文称 "13 identified crawlers"，表格**只列 10 行**且无"仅前 10"标注（1,371−1,257=114 次属未列的 3 个爬虫，需读者自行推算）。
- 断章取义 / 过度推断 / 遗漏限制条件：多处从"抓取日志"推断"索引"——ClaudeBot"24-48 小时收录"、PerplexityBot"优先偏好带结构化数据的页面"（文中无该分层数据支撑，仅 "apparently"）、"外部提及与爬虫爆发相关"（文中未呈现相关性数据）——均属证据不足的推断。"Bing 是 ChatGPT 搜索与 Perplexity 的后端"为无来源断言（Perplexity 后端构成有变化史，待核实）。
- 前后矛盾 / 无法验证的事实：FacebookBot 23 次但仅 1 个唯一页面、Google-Extended 仅 1 天 14 次等细节无解释；"Only six external domains... google.com (18), sahammurah.com (11), reddit.com (3), and a handful of singles" 只列 3 个域名，与"six"之间的差额靠"a handful"带过，模糊。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 12 天 4,115 次请求、Bingbot 326 次居首 | 爬虫明细表 + 采集方法段 | 无（第一方 D1 日志，未公开原始数据） | 不可（外部） | 部分（方法透明但数据不可第三方复核） | 原始日志导出或可复现查询 |
| ClaudeBot 24-48 小时收录新页 | "ClaudeBot is the most predictable" | 无 | 不可 | 否（爬取时间≠收录/索引时间，日志无法证明索引） | 与 Claude 内实际可见性的时间对比 |
| Bing 是 Copilot/ChatGPT 搜索/Perplexity 后端 | "Bing is the primary AI gateway" | 无 | 待核实 | 部分（ChatGPT 搜索曾用 Bing 属实，Perplexity 后端构成待核实） | 官方文档链接 |
| Bing Webmaster Tools 提供免费引用份额数据 | 同节 Action 段 | 无 | 待核实 | 部分 | Bing 官方功能页链接 |
| PerplexityBot 偏好带结构化数据的页面 | "What Sets PerplexityBot Apart" | 无 | 不可 | 否（无该维度数据） | 按有无 JSON-LD 分层的抓取对比数据 |
| 外部提及触发新爬虫爆发 | Referrers 节 + 第 4 条建议 | 无 | 不可 | 否（只给 referrer 计数，未给爆发时序） | 时序相关图 |
| Amazonbot 为 Alexa+ 建全量索引 | "Amazon is scanning the widest surface"（标 suggests） | 无 | 不可 | 部分（已标为推测） | — |

> 注：一手爬虫日志是真实采集，但"文章声称数据成立"≠"数据已获第三方验证"。

## 4. 独特价值测试
- 原创数据或实测结果：**有**——12 天、单站、Cloudflare Worker + D1 全量请求日志的爬虫分布明细（10 个爬虫 × 命中/唯一页/活跃天数 + Top 页面表），为本站一手实测。
- 独立研究 / 案例：即本页研究本身（方法与数据窗口透明：2026-08-21 至 09-01）。
- 独特方法 / 框架 / 分析：按 UA 打标入库再聚合的方法可复制，"null UA 扫描器噪音剔除"是有价值的实践细节。
- 通用行业知识的重新表述："Bing 支撑 Copilot""sitemap 是发现入口""robots.txt 先行"等属行业常识；"Perplexity 引用≈高质量外链"为修辞性类比。
- 无法确认原创性者标注：PerplexityBot 偏好结构化数据、外链与爬虫爆发相关两处分析的原创性——原文证据不足（无数据支撑）。

## 5. 可提取性测试
1. 问题：哪个 AI 爬虫访问量最大？
   - AI 可提取的答案：Bingbot，326 次、95 个唯一页面、12/12 天活跃。
   - 原文证据：爬虫表 Bingbot 行 + FAQ 第 1 问。
   - 缺失信息：4,115 总量口径（是否含 2,744 次扫描器）。
   - 是否需结合其他页面：否。
2. 问题：ClaudeBot 多久抓一次我的新文章？
   - AI 可提取的答案：约每日一次量级（18-42 次/天、11/12 天），文中称新页 24-48 小时被收录、无需提交。
   - 原文证据："ClaudeBot is the most predictable"。
   - 缺失信息：收录 vs 索引的区分、单页级抓取频率。
   - 是否需结合其他页面：否。
3. 问题：GPTBot 和 ChatGPT-User 有什么区别？
   - AI 可提取的答案：GPTBot 用于模型训练采集（45 次/33 页，平稳低量）；ChatGPT-User 是用户实时搜索触发（61 次/4 天，单日 57 次突发）。文中未明说 GPTBot 的训练用途，仅呈现两者量级与节奏差异。
   - 原文证据：表格两行 + "OpenAI shows two distinct behaviors"。
   - 缺失信息：GPTBot 用途定义（需 OpenAI 官方 UA 文档）。
   - 是否需结合其他页面：是（GPTBot 用途需外部/technical 页）。
4. 问题：哪些页面最容易被 AI 爬虫抓？
   - AI 可提取的答案：入口页——首页 571、robots.txt 247、sitemap.xml 138，内容页以 what-is-geo（40）居首。
   - 原文证据："Which Pages Do Crawlers Prioritize?" 表。
   - 缺失信息：按爬虫分列的页面偏好（只有总量）。
   - 是否需结合其他页面：否。
5. 问题：从爬虫日志能看出引用份额吗？
   - AI 可提取的答案：不能直接看出；文中称爬取日志只反映"可访问/可理解"两个条件，引用还需被第三方/引擎选中；Bing Webmaster Tools 才提供免费引用份额数据。
   - 原文证据：FAQ 第 4 问 + "Bing is the primary AI gateway" Action 段。
   - 缺失信息：从日志到引用的中间环节说明较简略。
   - 是否需结合其他页面：是（引用份额定义见 metrics/citation-share）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 22 | 4,115"crawler hits"与"排除扫描器"口径自相矛盾；称 13 个爬虫但表仅 10 行无说明；多处由抓取推断索引/偏好/相关性 |
| 证据可追溯性 | 25 | 15 | 一手日志方法透明但外部不可核验；Bing 后端、Bing 引用份额功能、Perplexity 偏好、外链相关性均无来源 |
| 独特价值 | 25 | 22 | 12 天 4,115 次真实爬虫日志的一手研究，数据表完整、方法可复现，是全站稀缺的实测资产（受单站点限制） |
| 可提取性 | 10 | 9 | 摘要答案前置、FAQ + FAQPage schema、每节有数据表与 Action，问题式小标题清晰 |
| 时效性与适用边界 | 10 | 6 | 数据窗口与采集日期明确，但**全文未声明单站点/12 天样本的外推局限**，且 4,115 口径歧义削弱可信度 |
| **总分** | **100** | **74** | |

### 最值得优先修改的 5 个具体位置
1. 摘要与 "Which Crawlers Visited" 段：统一 4,115 的口径——建议改为"4,115 次请求（含约 2,744 次 null UA 扫描器），识别出的爬虫共 1,371 次 / 13 个"。
2. 爬虫明细表：补上未列的 3 个爬虫行，或在表头明确"Top 10 of 13"。
3. "ClaudeBot is the most predictable"：将"indexing new pages within 24-48 hours"改为"re-visits within 24-48 hours（抓取时间，非索引确认）"。
4. "What Sets PerplexityBot Apart" 节：补一张"有无 JSON-LD 页面被抓频次"对比数据，或删去"re-check pages that carry explicit structured data"的断言。
5. 文末新增"Limitations"小节：声明单站点、12 天窗口、UA 识别可能被仿冒（正文已提扫描器借用 UA，应把外推局限也写明）。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
