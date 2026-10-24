# 审计明细：How to Track AI Citations — A Practical Guide to Measuring Your GEO Performance

- 文件：docs/technical/track-ai-citations.html
- 页面类型：文章
- 审计日期：2026-10-10（JSON-LD datePublished 2026-08-21 / dateModified 2026-08-21，与正文 meta "Updated: 2026-08-21" 一致）
- 正文字数（近似）：1,550

## 1. 核心答案提取

- 核心结论（≤100 字）：AI 引用没有 Search Console，只能自建度量——以服务器日志（Cloudflare Worker + D1）证明"谁读了页面"、每周人工提问测"谁引用了我"、GA4 referral 测"谁送了访客"；三源互为下界，两源一致才下结论，再把数字转成下月的编辑动作。

- 可被直接回答的 5 个用户问题：
  1. 问题：怎么知道 AI 模型在引用我的内容？ → 答案：三源三角验证——服务器日志确认 AI 爬虫来过、每周在 ChatGPT/Claude/Perplexity 用 10–30 个固定问题人工测引用、GA4 过滤 chatgpt.com / perplexity.ai 等 referral；单一来源都不完整。【原文证据：head FAQPage 第一问答 + 第 VI 节 "The Workaround: Triangulate Three Sources" 引用块】
  2. 问题：日志里该监控哪些 user-agent？ → 答案：至少 GPTBot、OAI-SearchBot、ChatGPT-User、ClaudeBot、Claude-User、PerplexityBot、Perplexity-User、Google-Extended；每条请求按 UA 分类，得到"哪个 AI 系统何时读了哪页、状态码多少"。【原文证据：head FAQPage 第二问答；第 II 节 "What to Record for Every Request" 表格】
  3. 问题：多久测一次 AI 是否引用我？ → 答案：每周用 10–20 个重点问题在至少 3 个平台测，每次开新会话消除个性化偏差；每月做一次含竞品对比、描述准确性与引用份额趋势的深度复盘。【原文证据：head FAQPage 第三问答 + 第 IV 节 "The Testing Routine" 四步】
  4. 为什么 ChatGPT 的访问没出现在我的统计里？ → 答案：App 内打开链接常不发 referer，被记为直接访问；API 检索根本没有浏览器。referral 只能当下界，必须与日志、人工测试合并看。【原文证据：head FAQPage 第四问答 + 第 VI 节 Challenge 1/2】
  5. 问题：GEO 仪表盘应该放哪几个数字？ → 答案：五个——按 bot 的爬虫访问量、被爬内容页数、AI 引用频次、品牌提及率、AI 平台 referral 流量；覆盖"发现→爬取→引用→推荐→点击"全漏斗，没有 owner 和动作的指标就砍掉。【原文证据：第 V 节 "A useful GEO dashboard needs five numbers, not fifty" + 五行指标表】

## 2. 准确性测试

- 核心概念与术语理解：**准确**。"AI citation 含链接与不链接两种"、"日志=第一方读取证据、人工测试=引用真值、referral=下界"的三者分工正确；referer 缺失导致记为 direct、API 抓取无浏览器两点技术判断正确；UA 命名（GPTBot / OAI-SearchBot / ChatGPT-User / ClaudeBot / Claude-User / PerplexityBot / Perplexity-User）与各厂官方 bot 文档一致。
- 数字、日期、对象、条件引用：**有 1 处需修正**
  - 第 III 节表格 "GPTBot … feeds training **and retrieval** corpora" —— 有偏差：GPTBot 主要用于模型训练数据采集，检索/搜索场景由 OAI-SearchBot 与 ChatPT-User 承担；把 retrieval 归给 GPTBot 会与同表 OAI-SearchBot 行（"fetches pages surfaced by ChatGPT Search"）打架。
  - 10–30 个问题、每周/每月节奏、10 分钟/周 —— 均为经验建议值，语气为方法建议而非事实断言，可接受。
  - 示例表格日期（2026-08-14 / 2026-08-21）与发布日期 2026-08-21 一致，示例自洽 ✓。
  - SQL 示例日期阈值 `>= '2026-07-22'` 与"last 30 days"（相对 8-21）一致 ✓。
  - 第 I 节 "Citations grew from 3% to 18%" 为引号内预算话术示例，未冒充实测数据，但紧邻论证句，AI 摘要时有被误读为本站实测的风险。
- 断章取义 / 过度推断 / 遗漏限制条件：**控制良好**——多处显式限定："Expect undercounting — treat it as a floor"、"Treat every single source as a lower bound"、"gaps are structural, not bugs"、"sampled and subjective at the edges"。未把文章声称包装成已验证结论。
- 前后矛盾 / 无法验证的事实：正文、第 V 节表格与 head FAQPage 四问答一致，无内部矛盾。**结构性缺陷**：第 II 节 "Then classify the User-Agent and log only what matters:" 之后的 UA 分类代码块缺失（HTML 中为空行），承诺的内容没有兑现。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 服务器日志是唯一第一方读取记录 | 第 II 节 | 无（技术常识） | 可 | 是 | 可补业界通行做法引用 |
| 本站 Cloudflare Worker + D1 实现与两周实验 | 第 II 节（链至 two-week-crawler-data、geo-impact-attribution-new-site） | 站内第一方 | 可（站内页面可核验） | 是 | —（已给站内证据链） |
| 各平台爬虫行为模式表 | 第 III 节 | 无 | 待核实 | 部分（与公开文档方向一致但未链接） | OpenAI/Anthropic/Perplexity/Google 官方 bot 文档 |
| GPTBot "feeds training and retrieval corpora" | 第 III 节 | 无 | 不可 | 部分（retrieval 归属有误） | OpenAI bot 文档区分 GPTBot 与 OAI-SearchBot |
| Browser AI 不发 referer、API 无浏览器 | 第 VI 节 | 无 | 可（技术常识） | 是 | 可补 referer 行为的测试截图 |
| "AI citation share is the new organic traffic"、3%→18% 预算话术 | 第 I 节 | 无 | 不可（主张/示例） | 部分 | 3%→18% 需标注为虚构示例 |
| meta 声称 "All data is linked to verifiable sources" | article-meta | — | 不可 | 部分（外链均为站内页，无外部来源） | 区分"站内第一方数据"与"外部来源" |

> 注意：本文的可信度主要来自**站内第一方实现可复现**（Worker + D1 + SQL），而非外部权威引用；meta 行的"verifiable sources"指站内页面，措辞略有拔高。

## 4. 独特价值测试

- 原创数据或实测结果：**有（第一方实现与实验）**——自建 Cloudflare Worker + D1 日志方案、建表 DDL、两条可直接执行的报表 SQL，并链接两周爬虫数据实验与后续归因研究；SQL 与表结构可复现，是全站最实的一手资产。量化引用结论（引用份额涨跌）本文未给数字。
- 独立研究 / 案例：站内 two-week-crawler-data 与 geo-impact-attribution-new-site 两篇被作为证据承接（本文只引用、不复述数据）。
- 独特方法 / 框架：**有**——"日志 / 人工测试 / referral 三源三角验证 + 每源皆为下界、两源一致才下结论" 的归因方法，与"五指标漏斗仪表盘（发现→爬取→引用→推荐→点击）"，为站内独有框架。
- 通用行业知识的重新表述：UA 清单、日志字段（时间/UA/路径/状态码）、"每周测引用"、"注意 referer" 属通用监测常识复述，但被整合进可执行流程，复述部分不显冗余。
- 无法确认原创性者标注：三源三角验证法在行业内有类似讨论 —— **待核实**；本文的实现细节与 SQL 可认作本站原创。

## 5. 可提取性测试

1. 问题：如何监测 AI 是否引用我的网站？
   - AI 可提取的答案：三源三角验证——日志（谁读了页面）+ 每周人工提问（谁引用了我）+ GA4 referral（谁送了访客），任一来源只当下界，两源一致才下结论。
   - 原文证据：head FAQPage 第一问 + 第 VI 节引用块与三条对比列表。
   - 缺失信息：缺"两源不一致时的判定流程"具体步骤。
   - 是否需结合其他页面：否（本页可完整回答）。
2. 问题：服务器日志要记录哪些字段、怎么建表？
   - AI 可提取的答案：记 timestamp、crawler name（UA）、path、status、referer；并给出 `crawler_logs` 建表 DDL 与两条聚合 SQL。
   - 原文证据：第 II 节字段表 + CREATE TABLE 代码块 + 第 V 节两条 SELECT 语句。
   - 缺失信息：**UA 分类代码段缺失**——"classify the User-Agent and log only what matters" 后无任何代码，AI 无法给出可复制的 UA 判定实现。
   - 是否需结合其他页面：是（分类逻辑可能需看 worker/index.js 或站内 crawler-data 页）。
3. 问题：不同 AI 爬虫的行为有什么区别、分别意味着什么？
   - AI 可提取的答案：五爬虫表格给出运营方、抓取模式与对应动作（GPTBot 重 sitemap、OAI-SearchBot 是强引用信号、ClaudeBot 依赖 robots+sitemap、PerplexityBot 偏答案就绪文本、Googlebot 全面抓取兼供 AI Overviews）。
   - 原文证据：第 III 节表格 + 三条行为差异列表。
   - 缺失信息：GPTBot 的 retrieval 表述有误需修；未给各爬虫的频率量级。
   - 是否需结合其他页面：建议（UA 与放行规则见 ai-crawler-management.html，文内已链）。
4. 问题：GEO 仪表盘该放哪些指标？
   - AI 可提取的答案：五个指标及其数据源与健康信号——爬虫访问（D1/Cloudflare Analytics，3+ 爬虫稳定周访问）、内容页被爬（GROUP BY path，重点页至少月度）、引用频次、提及率（周测）、AI referral（GA4）；无主无动作的指标砍掉。
   - 原文证据：第 V 节五行表格 + 收尾句。
   - 缺失信息：各指标无目标阈值（除"3+ 爬虫"外），"healthy signal" 偏定性。
   - 是否需结合其他页面：是（GA4 过滤与看板搭建见 data/data-dashboard-setup.html，文内已链）。
5. 问题：为什么我的引用数据看起来互相矛盾？
   - AI 可提取的答案：三类结构性缺口——App 内点击不发 referer（记为直接访问）、API 检索无品牌 UA、有提及无链接；这些是结构性空洞而非 bug，需三源互证而不是追完美数据。
   - 原文证据：第 VI 节 Challenge 1–3 + "Even with perfect logging, some citations will stay invisible" 段。
   - 缺失信息：未给"有提及无链接"场景的检测手段（只有人工测试一种）。
   - 是否需结合其他页面：否。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 25 | UA 清单、referer/API 归因、三源分工全部准确且限定语充分；扣分点为 GPTBot "feeds training and retrieval" 归属有误（与 OAI-SearchBot 行冲突）、3%→18% 示例易被误读为实测 |
| 证据可追溯性 | 25 | 17 | 强项是第一方实现可复现（DDL/SQL/站内实验链），弱项是爬虫行为表与 meta "verifiable sources" 均无外部来源，全篇外链仅站内页 |
| 独特价值 | 25 | 22 | 本站 Cloudflare Worker + D1 方案、可执行 SQL、三源三角验证法、五指标漏斗仪表盘构成实打实的独有资产与框架；量化结论缺位扣分 |
| 可提取性 | 10 | 9 | 问题前置、I–VII 编号结构、四张表格、checklist 与 FAQPage 齐备，可独立回答绝大多数问题；扣分点为第 II 节 UA 分类代码块缺失造成内容断点 |
| 时效性与适用边界 | 10 | 9 | 日期明确（2026-08-21），显式边界（referral 是下界、UA 需 keep current、结构性缺口不可消除）；扣分点是 UA 清单未标"以官方 bot 文档为准"的具体链接 |
| **总分** | **100** | **82** | |

### 最值得优先修改的 5 个具体位置
1. 第 II 节 "Then classify the User-Agent and log only what matters:" 之后 —— UA 分类代码块为空（HTML 中丢失），直接补上 Worker 的 UA 判定代码，否则这是承诺未兑现的内容断点。
2. 第 III 节表格 GPTBot 行 "feeds training and retrieval corpora" —— 改为"feeds training corpora"，检索/搜索行为归到 OAI-SearchBot 与 ChatGPT-User 行，消除同表内部冲突。
3. 第 I 节 "Citations grew from 3% to 18%" —— 加"hypothetical example"标注，避免被 AI 摘要时当作本站实测引用数据。
4. 第 III 节爬虫表 —— 补 OpenAI/Anthropic/Perplexity/Google 官方 bot 文档外链，使 meta 行 "linked to verifiable sources" 的承诺在外部层面也成立。
5. head FAQPage 第二问 —— 补一句"UA 名称以各官方文档为准、需定期回查"，与第 II 节 "Keep the list current" 呼应，强化时效边界。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
