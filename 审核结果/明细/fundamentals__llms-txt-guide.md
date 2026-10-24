# 审计明细：What Is LLMs.txt? A Practical Guide for the AI Crawler Era

- 文件：docs/fundamentals/llms-txt-guide.html
- 页面类型：文章（操作指南）
- 审计日期：2026-10-10
- 备注：本页已做“元声明/过度承诺”治理（meta 与多处措辞已改为“advisory / not a prerequisite”口径），Updated 2026-10-10
- 正文字数（近似）：1,600（英文正文）

## 1. 核心答案提取
- 核心结论（≤100 字）：LLMs.txt 是放在站点根目录、写给 AI 的 Markdown“网站说明书”，用于提示重要页面；它是低成本的可选步骤而非被引用前提，只有部分引擎支持，且访问≠索引≠引用。文中以“AI 抓取三关（Crawl/Parse/Index-Retrieve）”解释 GEO 基础层。
- 可被直接回答的 5 个用户问题：
  1. 问题：LLMs.txt 是什么？ → 答案：置于网站根目录、面向 LLM 的纯文本 Markdown 文件，说明重要页面及其内容。【原文证据：“LLMs.txt is a plain text file placed in the website root directory … specifically serving as a ‘website usage manual' for large language models.”】
  2. 问题：LLMs.txt 是引用前提/标准吗？ → 答案：不是。它是社区提案（llms.txt），只有部分引擎读取，无法保证被引用。【原文证据：meta blockquote “It is not a prerequisite for citation.” 与首段。】
  3. 问题：LLMs.txt 和 sitemap.xml 有什么区别？ → 答案：见对比表（受众/格式/语义/优先级/排除规则）。【原文证据：II 章表。】
  4. 问题：AI 爬虫和 Googlebot 有哪些关键差异？ → 答案：四点：JS 渲染、超时、robots 规则、类型更多。【原文证据：III 章四点。】
  5. 问题：如何 30 分钟内搭好 GEO 基础层？ → 答案：四步：查 robots.txt（5m）、创建 LLMs.txt（10m）、测可抓取性（10m）、查服务器响应（5m）。【原文证据：IV 章四步。】
- 其他可提取项：AI 爬虫清单（GPTBot/ClaudeBot/Google-Extended/PerplexityBot/CCBot）；三关定义。

## 2. 准确性测试
- 概念与术语：LLMs.txt 定位、三关模型、sitemap 对比、爬虫差异总体准确；已明确“访问≠索引≠引用”这一关键边界（治理后口径正确）。
- 数字/对象/条件：
  - “Pages under 2 seconds”（Step 3）、“TTFB within 500ms”（Step 4）、“AI crawlers give up after a few hundred milliseconds”（Difference 2）—— 均为经验阈值，无来源；措辞用 may/generally 部分对冲。
  - 超时“a few hundred milliseconds”对部分爬虫属偏强的具体化表述，无实测来源。
- 断章取义/过度推断/遗漏限制：总体已加限定；但 “Difference 3: Google-Extended” 描述为“Google's crawler specifically designed for AI search (AI Overviews)”——Google-Extended 实为 robots.txt 控制 *training/grounding* 用途的 token，而非独立“爬虫名称”，此处表述不严谨（待核实/宜修正）。
- 前后矛盾/不可验证：Step 1 示例 robots.txt 中 “User-agent: GPTBot / Disallow: / → 内容在 ChatGPT web search 完全不可见” —— GPTBot 控制的是训练抓取，ChatGPT 搜索使用不同的 UA（OAI-SearchBot），把二者等同属常见误述（待核实）。Mintlify 示例内容无法在本次审计内核验。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| LLMs.txt 非引用前提 | 首段/meta | 无外链（提 llms.txt 约定） | 部分 | 是（常识+官方博客普遍口径） | 引用来源 |
| 30 分钟四步搭建 | IV 章 | 无 | 不可 | 是（操作步骤） | 工具链接 |
| AI 爬虫四差异 | III 章 | 无 | 部分 | 大体 | OpenAI/Anthropic 文档 |
| GPTBot Disallow ⇒ ChatGPT 搜索不可见 | Step 1 | 无 | 不可 | 否（UA 不符） | OAI-SearchBot 说明 |
| Google-Extended 是 AI Overviews 爬虫 | III 章 | 无 | 不可 | 否 | Google 官方说明 |
| 三关模型 | I 章 | 无 | 部分 | 是（自建框架） | 标注为框架 |

## 4. 独特价值测试
- 原创数据/实测：无。
- 独立研究：无。
- 独特框架/分析：“AI 抓取三关（Crawl / Parse / Index-Retrieve）”与“GEO 基础层”概念链条，是本文较有价值的组织框架（属作者自建，宜标注为框架而非事实）。
- 通用知识再表述：LLMs.txt 用法、sitemap 对比、爬虫清单，均为行业常见材料；Mintlify 为公开示例。
- 无法确认者：待核实。

## 5. 可提取性测试
1. 问题：LLMs.txt 一句话定义？ → 答案：根目录下写给 LLM 的 Markdown 网站说明书。原文证据：II 章。缺失：无。跨页：否。
2. 问题：要不要做 LLMs.txt？ → 答案：低成本、可选、非前提，仅部分引擎支持。证据：首段/meta/VI 章。缺失：支持引擎名单待补。跨页：否。
3. 问题：AI 爬虫有哪些？ → 答案：GPTBot、ClaudeBot、Google-Extended、PerplexityBot、CCBot。证据：III 章列表。缺失：各 UA 用途（含 OAI-SearchBot）。跨页：否。
4. 问题：怎么搭 GEO 基础层？ → 答案：四步（robots→llms.txt→测试→服务器响应）。证据：IV 章。缺失：具体工具链接。跨页：否。
5. 问题：为什么速度对 GEO 更重要？ → 答案：AI 爬虫超时更短。证据：Difference 2 / Step 4。缺失：实测来源。跨页：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 23 | 三关/sitemap/边界口径准确；GPTBot 与 ChatGPT 搜索、Google-Extended 定义存在技术性误述 |
| 证据可追溯性 | 25 | 13 | 全文 0 外部链接；爬虫行为与阈值无来源可核验 |
| 独特价值 | 25 | 16 | “三关”框架有组织价值，但无原创数据，多为通识再表达 |
| 可提取性 | 10 | 9 | 答案前置、分步、列表、表格，易提取 |
| 时效性与适用边界 | 10 | 8 | 已明确“advisory/非前提/部分引擎支持”边界；但 UA 归属与时点需更新 |
| 总分 | 100 | 69 | 结构与边界都强，可提取性高；证据链与个别爬虫技术定义需订正 |

## 6b. 优先修改 5 条
1. Step 1 / Difference 3：区分 GPTBot（训练）与 OAI-SearchBot（ChatGPT 搜索）；不要把 “GPTBot Disallow” 直接等同“ChatGPT 搜索不可见”。
2. III 章 “Google-Extended — Google's crawler specifically designed for AI search (AI Overviews)”：修正为“robots.txt 中控制 Google 生成式 AI 训练/grounding 用途的 token”。
3. 全文补 3-5 条权威外链（OpenAI 爬虫文档、Anthropic、Google-Extended 说明、llms.txt 约定），兑现 meta “external figures are linked to sources”。
4. 将“三关模型/Crawl-Parse-Index”标注为作者框架（framework），并指出 crawl/index/citation 由各引擎独立决定。
5. 将 2 秒/500ms/“几百毫秒”阈值改为带来源或明确标注为经验建议。
