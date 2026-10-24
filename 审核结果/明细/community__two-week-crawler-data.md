# 审计明细：What Actually Gets Your Site Crawled by AI? Our Two-Week Data, and the Mistake We Retired

- 文件：docs/community/two-week-crawler-data.html
- 页面类型：文章（社区，数据型案例）
- 审计日期：2026-10-10
- 正文字数（近似）：1300（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：本站两周 crawl 日志显示：内容新增产生真实爬取峰值，基础设施端点零请求，多数"增长日"实为扫描器攻击；判断真假要看路径而非总量。
- 可被直接回答的 5 个用户问题：
  1. 问题：哪些 GEO 改动真正增加爬取？ → 答案：发布新文章带来最大真实峰值，新页上线日被多次爬取并持续回访。【原文证据："New articles…New pages hit 6-10 times on launch day, revisited for days after"】
  2. 问题：如何区分真实爬取峰值与扫描攻击？ → 答案：看请求路径而非计数；攻击者借用爬虫 UA 探测敏感路径。【原文证据："Check the requested paths, not just the count."】
  3. 问题：/ai/summary.json 会被爬取吗？ → 答案：两周内零请求。【原文证据："zero crawlers requested them"】
  4. 问题：站点应优先内容还是技术？ → 答案：内容优先，其次结构化数据，再把基础设施端点当作低成本对冲。【原文证据："Publish new content first…treat infrastructure endpoints as a low-cost hedge, not a growth driver."】
  5. 问题：08-11 的 778 请求是增长吗？ → 答案：不是，主要是 ChatGPT-User 与 Amazonbot 扫描敏感路径。【原文证据："778-request day…was actually ChatGPT-User and Amazonbot scanning for exposed files."】

## 2. 准确性测试
- 核心概念与术语理解：准确。扫描器借用 UA、按 path/status 过滤、robots/sitemap 为真实入口等表述正确。
- 数字、日期、对象、条件引用：有逐日计数表（08-04 至 08-15），数据窗口 meta 标 "August 4-16, 2026"，正文结论处又写 "our sample is one site, twelve days"。存在时间口径不一致——标题与 meta 称"两周（two-week）"，但八月初至月中实际约 12 天，正文自身也承认 "twelve days"。
- 断章取义 / 过度推断 / 遗漏限制条件：表内 "FAQPage markup…New visits to those pages / ClaudeBot and OAI-SearchBot hit the six pages within a day of markup" 与站内 geo-impact 页明确修正的结论（"the six pages got no visits from major AI crawlers after the markup shipped"）直接冲突；同页 "New pages hit 6-10 times on launch day" 亦被 geo-impact 页判定为噪声（"each AI crawler visited the new page once"）。本页保留了已被本站后续文章否证的断言。
- 前后矛盾 / 无法验证的事实：本页"两周"与"12 天"自相矛盾；FAQPage、新文章 6-10 次两处结论与站内他页矛盾，属未经证实且已被推翻的断言。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 新文章是最大真实峰值 | "Which Changes Actually Drove Real Crawls?" 表 | 无（第一方日志） | 待核实 | 部分（后被本站修正） | 逐请求明细 |
| 778 请求日为扫描攻击 | 08-11 行 + 扫描路径列表 | 无 | 待核实 | 是 | 日志导出 |
| FAQPage 带来新访问 | "ClaudeBot and OAI-SearchBot hit the six pages within a day" | 无 | 不可（他页已否证） | 否 | 修正或删除 |
| discovery endpoints 零请求 | "zero crawlers requested them" | 无 | 待核实 | 是 | 计数截图 |
| 逐日总量数据 | 日期表 | 无 | 待核实 | 部分 | 数据集 |

> 注意：多个被当作事实的断言（FAQPage 效应、6-10 次爬取）已在同站其他页面被否定。

## 4. 独特价值测试
- 原创数据或实测结果：有——逐日爬取总量、按改动类别分组的效果表、扫描攻击案例。
- 独立研究 / 案例：本站自采两周日志案例。
- 独特方法 / 框架 / 分析：价值较高——"看路径不看总量"识别伪增长的方法、攻击 UA 清单、按改动类型归因。
- 通用行业知识的重新表述：部分（"内容为王""robots/sitemap 重要"）。
- 无法确认原创性者标注：精确计数、FAQPage/新文章效应 待核实（后者已被推翻）。

## 5. 可提取性测试
1. 问题：新站优先做内容还是技术？
   - AI 可提取的答案：内容优先，其次结构化数据，端点作对冲。
   - 原文证据："What Should a Site Owner Do With This Data?" 有序列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：怎样识别伪爬取增长？
   - AI 可提取的答案：看路径；扫描器探测 /.env.production、/debug 等。
   - 原文证据："How Do You Tell a Real Spike from a Scanner Attack?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：AI discovery 端点有用吗？
   - AI 可提取的答案：两周零请求，属对未来工具的对冲。
   - 原文证据："Did the AI Discovery Endpoints Fail, or Just Not Get Used Yet?"。
   - 缺失信息：无。
   - 是否需结合其他页面：是（one-week / geo-impact）。
4. 问题：一周内基准爬取量是多少？
   - AI 可提取的答案：逐日表（08-04 303 至 08-15 187）。
   - 原文证据："What Did Two Weeks of Crawl Logs Show?" 表。
   - 缺失信息：样本局限性说明。
   - 是否需结合其他页面：否。
5. 问题：FAQPage 能提升爬取吗？
   - AI 可提取的答案：本页称能；但该结论与站内他页冲突，需谨慎。
   - 原文证据："FAQPage markup…New visits to those pages"。
   - 缺失信息：可复核的对照数据。
   - 是否需结合其他页面：是（geo-impact 页给出相反结论）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 20 | "两周/12 天"口径矛盾；FAQPage 与新文章 6-10 次结论已被站内他页证伪却未修正 |
| 证据可追溯性 | 25 | 16 | 第一方数据方法透明，但把未经证实/后被否证的断言当事实，无公开数据 |
| 独特价值 | 25 | 21 | 原创逐日数据 + 伪增长识别方法 + 攻击案例 |
| 可提取性 | 10 | 9 | 问题式 H2、表格、FAQ；个别表头为名词短语 |
| 时效性与适用边界 | 10 | 7 | 有日期与样本局限声明，但"两周"与实际窗口不一致 |
| **总分** | **100** | **73** | |

### 最值得优先修改的 5 个具体位置
1. 标题/meta 的 "Two-Week" 与正文结论 "one site, twelve days"：统一时间口径（数据实为 08-04 至 08-16）。
2. "Which Changes Actually Drove Real Crawls?" 表中 "FAQPage markup…New visits to those pages / ClaudeBot and OAI-SearchBot hit the six pages within a day"：与 geo-impact 页结论冲突，应修正或加注。
3. "What Did Two Weeks of Crawl Logs Show?" 正文与 08-12 行 "New article crawled 10× on launch day"：与 geo-impact 页"每爬虫仅 1 次"冲突，需修正。
4. "Did the AI Discovery Endpoints Fail…" 段可考虑与 geo-impact 页合并/互链，避免全站对同一实验给出不一致结论。
5. 逐日表末尾（08-15）后无 08-16，建议补全或明确标注窗口终点，避免"两周"被误读。
