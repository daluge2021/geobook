# 审计明细：Advanced LLMs.txt Applications and Robots.txt Strategy — Managing AI's "First Impression" of You

- 文件：docs/technical/llms-txt-advanced.html
- 页面类型：文章
- 审计日期：2026-10-10（JSON-LD datePublished 2026-01-15 / dateModified 2026-10-10，与正文 meta "Updated: 2026-10-10" 一致）
- 正文字数（近似）：1,200

## 1. 核心答案提取

- 核心结论（≤100 字）：GEO 的前置基础是三个纯文本文件，按 robots.txt → sitemap.xml → llms.txt 顺序部署：先放行 AI 爬虫、再列出重要页面、最后给支持的引擎一份品牌事实摘要；llms.txt 只对读它的引擎生效，不能替代页面内容。

- 可被直接回答的 5 个用户问题：
  1. 问题：llms.txt 放在哪儿、写什么内容？ → 答案：放网站根目录（如 `https://yourbrand.com/llms.txt`）的纯文本文件，含品牌一句话简介、核心信息（成立时间/总部/核心产品/客户规模）、核心能力、FAQ、相关链接；建议 500–1,000 词。【原文证据：第 1 节 "LLMs.txt is a plain text file placed in your website's root directory"；"Deployment Recommendations for LLMs.txt" 列表；示例格式块】
  2. 问题：robots.txt 应该允许还是屏蔽 AI 爬虫？ → 答案：默认对已知 AI 爬虫逐条 `Allow: /`；有内页需求时可对 `/admin/`、`/test/` 等选择性 Disallow；除非有意，否则绝不能写 `User-agent: * / Disallow: /`，否则 "GEO back to zero"。【原文证据：第 2 节 "Basic configuration: Allow all AI crawlers"、"Advanced configuration: Selective blocking"、Note 1】
  3. 问题：需要在 robots.txt 里认识哪些 AI 爬虫 UA？ → 答案：OAI-SearchBot、GPTBot（OpenAI）、Google-Extended（Google）、PerplexityBot（Perplexity）、Baidu 系列、KimiBot（Kimi）。【原文证据：第 2 节 "Different AI platforms have their own crawlers" 列表】
  4. 问题：三个文件的正确部署顺序是什么？ → 答案：① robots.txt（前门是否打开）→ ② sitemap.xml（路线图是否清晰）→ ③ llms.txt（介绍信是否写好）。【原文证据："Deployment Order for the Three Files" 有序三点列表】
  5. 问题：部署后如何验证 llms.txt 有没有生效？ → 答案：分别访问 `/robots.txt` 直接检查、在 Google Search Console 提交并检查 sitemap、用 ChatGPT 等 AI 直接问 "Do you know XX brand?" 并比对回答是否与 llms.txt 一致。【原文证据："Post-Deployment Verification" 有序三点列表】

## 2. 准确性测试

- 核心概念与术语理解：**准确（主体）**。robots.txt / sitemap.xml / llms.txt 三者职责区分正确，"灵感来自 robots.txt 与 sitemap.xml" 的类比成立，"AI 爬虫也在读 robots.txt" 正确。
- 数字、日期、对象、条件引用：**有偏差**
  - "`llms.txt` is also acceptable (place in `llms/` directory)" —— 与通行 llms.txt 提议（站点根目录 `/llms.txt`）不符，原文证据不足，疑为杜撰路径。
  - "Keep within 500-1,000 words"、"8-15 words description" —— 经验值，无来源。
  - "KimiBot" 用户代理名 —— 待核实，原文未给出官方文档链接。
  - "Google AIO → Google-Extended" —— 有偏差：Google-Extended 控制 Gemini 应用侧内容使用，并非 AI Overviews 的抓取通道（后者走 Googlebot）。属简化过度。
- 断章取义 / 过度推断 / 遗漏限制条件：**有 1 处明显推断** —— Value 3 "AI compares whether your description on any third-party source matches your own LLMs.txt — if consistent, trust increases; if inconsistent, trust decreases" 描述了一个未被证实的比对机制，原文证据不足。正面之处：Value 2 已自带限制条件（"only engines that read llms.txt will use it, and it does not override other sources"）。
- 前后矛盾 / 无法验证的事实：正文与 FAQPage JSON-LD 的三问三答内容一致，无内部矛盾。但 article-meta 声称 "external figures are linked to sources"，**正文实际零外部来源链接**（仅站内互链），声明与实际不符，属无法验证的自我声明。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| llms.txt 是根目录纯文本文件，为 LLM 提供结构化品牌摘要 | 第 1 节定义段 | 无 | 待核实 | 部分（属通行说法但未引规范） | llms.txt 规范（llmstxt.org 等）链接 |
| 三件套分工与部署顺序（robots→sitemap→llms.txt） | 第 3 节表格 + 有序列表 | 无 | 可（逻辑自洽） | 部分（顺序为经验建议，非官方要求） | 标明"本站建议顺序"而非通用规则 |
| 各 AI 平台爬虫 UA 名称 | 第 2 节列表 | 无 | 待核实（KimiBot 尤其） | 部分 | OpenAI/Anthropic/Perplexity 官方 bot 文档链接 |
| 全站 `Disallow: /` 会让 GEO 归零 | Note 1 | 无 | 可（原理显然） | 是 | 可补一条被误屏蔽的实例 |
| llms.txt 会让 AI 交叉验证并据此增减信任（Value 3） | 第 1 节 Value 3 | 无 | 不可 | 否 | 任何官方或实测证据；否则应降级为推测 |
| FAQPage schema 中三问答与正文一致 | head JSON-LD | 无（内部一致性） | 可 | 是 | — |

> 注意：本页所有"价值"表述均为文章声称，未见任何外部来源核验；meta 行的"linked to sources"承诺未兑现。

## 4. 独特价值测试

- 原创数据或实测结果：**无**（未引用本站日志、样本或任何量化结果）。
- 独立研究 / 案例：**无**。
- 独特方法 / 框架：有 "AI-Friendly Configuration Trio（三件套）+ 部署顺序 + 三步验证" 的结构化整理，属本站框架，但**原创性待核实**（三件套提法在行业内亦有流传）。
- 通用行业知识的重新表述：AI 爬虫 UA 列表、robots.txt 基础写法、"不要全站屏蔽"、"sitemap 与 robots 保持一致" 均为通用常识复述；llms.txt 与 glossary/llms-txt、fundamentals/llms-txt-guide 存在内容重叠（本文侧重 robots + 组合，重叠部分为常识复述）。
- 无法确认原创性者标注：三件套框架、部署顺序 —— 待核实。

## 5. 可提取性测试

1. 问题：llms.txt 和 robots.txt 有什么区别？
   - AI 可提取的答案：robots.txt 告诉爬虫"能不能抓"，llms.txt 告诉大模型"品牌核心信息是什么"；前者是流量规则，后者是介绍信。
   - 原文证据：第 1 节首段 + 第 3 节三行表格（File / Function / How AI Uses It）。
   - 缺失信息：无外部权威定义引用，AI 无法据此核对定义边界。
   - 是否需结合其他页面：否（本页表格可独立回答）。
2. 问题：robots.txt 要不要屏蔽 GPTBot？
   - AI 可提取的答案：默认逐条 Allow；只有对特定路径（admin/test）选择性 Disallow；全站 Disallow 会让 GEO 归零。
   - 原文证据：第 2 节三段配置示例 + Note 1。
   - 缺失信息：未说明屏蔽/放行的商业权衡（如训练数据授权 vs 检索可见性），也未区分 GPTBot 与 OAI-SearchBot 的不同用途。
   - 是否需结合其他页面：建议（AI Crawler Management 页有更完整规则），但本页可给出基本答案。
3. 问题：llms.txt 标准格式是什么、写多少字？
   - AI 可提取的答案：纯文本、根目录、500–1,000 词，含品牌简介/核心信息/核心能力/FAQ/相关链接五段。
   - 原文证据：第 1 节示例块 + 部署建议列表。
   - 缺失信息：示例块以 `<code>`</code>` 占位符包裹，渲染后示例中的 H1/H2 被输出为真实标题层级，AI 抓取易把示例误当正文结构（可提取性受损）。
   - 是否需结合其他页面：是（页尾明确指向 glossary/llms-txt.html 获取完整格式）。
4. 问题：部署 llms.txt 后怎么知道它起作用了？
   - AI 可提取的答案：三步验证——直接访问 /robots.txt、在 GSC 提交检查 sitemap、用 ChatGPT 提问品牌名比对回答。
   - 原文证据："Post-Deployment Verification" 列表。
   - 缺失信息：未说明"读取 llms.txt"的服务端日志验证方式（这才是可量化的方法）；比对法主观性强。
   - 是否需结合其他页面：是（服务器日志方法见 technical/track-ai-citations.html）。
5. 问题：一个新站点做 GEO，技术侧最小配置是什么？
   - AI 可提取的答案：先做 robots.txt 放行 AI 爬虫，再配置 sitemap.xml，最后写 llms.txt；三个纯文本文件成本极低但决定 AI 第一印象。
   - 原文证据：第 3 节部署顺序 + 结尾段 "Before starting any complex GEO optimization, configure these two files first"。
   - 缺失信息：缺 HTTPS、渲染可抓取性、结构化数据等同级前置项（会误导为"只做这两个文件即可"）。
   - 是否需结合其他页面：是（完整前置清单需 fundamentals/geo-quick-start-checklist.html）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 22 | 主体概念准确且有关键限定语，但 `llms/` 目录说法与通行规范冲突、KimiBot 待核实、Google-Extended 等同 AI Overviews 为简化过度、Value 3 信任比对机制属未证实推断（合计 4 处需修正） |
| 证据可追溯性 | 25 | 13 | 全文零外部来源，却在 meta 行承诺 "external figures are linked to sources"；关键价值主张（信任基线、字数阈值、UA 清单）均无可核验出处 |
| 独特价值 | 25 | 15 | 三件套 + 部署顺序 + 三步验证属清晰的结构化整理，但无原创数据/实测，且与站内 llms.txt 两篇存在重叠 |
| 可提取性 | 10 | 8 | 答案前置、h2/h3 清晰、有表格与部署顺序列表；扣分点是示例代码块被渲染成真实 H1/H2 标题，污染文档大纲 |
| 时效性与适用边界 | 10 | 8 | 有更新日期（2026-10-10）、有"UA 会变请定期核对官方文档"提醒与 llms.txt 适用边界；扣分点是无任何外部来源可追踪时效、llms.txt 规范状态未标注 |
| **总分** | **100** | **66** | |

### 最值得优先修改的 5 个具体位置
1. 第 1 节 "Deployment Recommendations" 最后一条 "`llms.txt` is also acceptable (place in `llms/` directory)" —— 与根目录规范冲突且无出处；删除，或改为引用 llms.txt 官方规范链接。
2. 第 1 节 "What Goes in LLMs.txt?" 示例块 —— 用 `<code>`</code>` 包裹导致示例内 H1/H2 被浏览器渲染为真实标题，污染文档大纲与 AI 结构提取；改为 `<pre><code>`。
3. 第 2 节爬虫列表 "Google AIO → `Google-Extended`" —— 改为 "Google-Extended（控制 Gemini 应用侧内容使用）"，并注明 AI Overviews 的抓取走 Googlebot。
4. 第 1 节 Value 3 "AI compares … if consistent, trust increases" —— 补可核验来源，否则改写为明确标注的推测（"we have not seen this confirmed"）。
5. 顶部 article-meta "external figures are linked to sources" —— 正文零外链，要么给 500–1,000 词、UA 清单等补来源，要么改写这句不成立的承诺。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
