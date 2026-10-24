# 审计明细：GEO AI-Readiness Audit — A Knowledge Site's Own GEO Walkthrough

- 文件：docs/cases/geo-ai-audit.html
- 页面类型：案例
- 审计日期：2026-10-10
- 正文字数（近似）：1,100 词

## 1. 核心答案提取
- 核心结论（≤100 字）：对本站做一周 AI 就绪审计，走完六步：可发现（llms.txt/ai.txt/MCP manifest）→ 可测量（爬虫日志）→ 可读（JSON-LD 置于 head 并带日期）→ 可信（品牌统一/去重）→ 修隐形故障（剥掉 raw.githubusercontent 的 sandbox CSP）→ 规范化（www 301）。
- 可被直接回答的 5 个用户问题：
  1. 问题：什么是 GEO AI 就绪审计？ → 答案：检查站点能否被 AI 爬虫发现、理解、信任，覆盖发现端点（llms.txt、ai.txt、sitemap）、爬虫可观测性、结构化数据、E-E-A-T、技术健康（CSP 头）与规范化。【原文证据：FAQPage JSON-LD 第 1 问；正文 Section I-VI 对应六步】
  2. 问题：网站自查 AI 就绪的六个步骤是什么？ → 答案：(1) llms.txt + sitemap 让站点可发现；(2) 优化前先上爬虫日志；(3) 补机器可读结构化数据；(4) 用 E-E-A-T 建立信任；(5) 修隐藏技术故障（如 sandbox CSP 头）；(6) 规范化 canonical，停止制造重复页。【原文证据：FAQPage 第 2 问 + Section I-VI 标题】
  3. 问题：这次审计发现并修了什么具体问题？ → 答案：补 /ai/summary.json 与 FAQPage schema、修正爬虫访问规则、加剥除 sandbox CSP 头（曾导致脚本被禁用）、合并重复 URL；每项修复均对照真实爬虫日志验证。【原文证据：FAQPage 第 3 问 + Section V/VI；注意正文未逐字列出 summary.json 一项】
  4. 问题：为什么要在优化之前先做爬虫日志？ → 答案："无法度量的优化不算优化"——内容再好，AI 没爬、没读、没引就价值为零；只有看得见"爬了/没爬"才能推理。做法是用 Cloudflare Worker 按 User-Agent 分类（GPTBot、ClaudeBot、PerplexityBot、Google-Extended 及 25+ 种），每条 HTML 请求写一行入库。【原文证据：Section II 及其 blockquote】
  5. 问题：raw.githubusercontent.com 会带来什么隐蔽故障？ → 答案：它对每个 HTML 响应附带 `Content-Security-Policy: default-src 'none'; sandbox`，浏览器中会禁用全部页面脚本（侧边栏失效、统计不加载）；修复是在 Worker 中剥掉 CSP 与 X-Frame-Options。【原文证据：Section V "Fix the Hidden Outage — Sandbox CSP Header"】

## 2. 准确性测试
- 核心概念与术语理解：llms.txt、.well-known/ai.txt、JSON-LD 放 head、Organization + Article + BreadcrumbList、E-E-A-T 三项映射（品牌一致/真实 About-Contact/去重复页）、www→裸域 301 规范化——均与通行实践一致，术语使用准确。"canonical normalization + knowledge entropy" 的表述为站内框架借用，方向合理。
- 数字、日期、对象、条件引用：`25+ more` 爬虫种类、"one week" 审计周期、"one row per HTML request"——均为第一方 Worker 实现细节，合理但**本页未附日志条数、抓取频次等可核验数字**；`SEP-1960` 这一 MCP manifest 提案编号**待核实**（本页未给出链接或出处，无法在文内确认）。
- 断章取义 / 过度推断 / 遗漏限制条件：(1) "duplicate URLs dilute entity density and subtract from the chance AI chooses to cite you"——把规范化与引用概率直接挂钩，属合理但**无来源的因果推断**；(2) "AI answer engines come through different doors" 的 llms.txt/ai.txt 作用描述未区分"已被各引擎采纳"与"建议性端点"，ai.txt 的采纳程度缺限定；(3) FAQPage JSON-LD 的三条问答在**正文中没有对应的 FAQ 小节**，其中"added /ai/summary.json"仅出现在 schema 中、正文未提，属 schema 与正文不同步。
- 前后矛盾 / 无法验证的事实：正文称审计发现的问题"each fix was verified against real crawler logs"（schema 中），但正文未展示任何日志数据或前后对比，读者无法核验"验证"这一断言本身。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| raw.githubusercontent 返回 sandbox CSP 头并禁用脚本 | Section V | 无（但任何人可自行请求验证） | 可 | 是（技术行为可复现） | 附一次响应头抓取示例 |
| 站点已上线 llms.txt / ai.txt / MCP manifest | Section I | 无 | 可（站点文件公开可访问） | 是 | 直接给出 URL 路径清单 |
| Worker 按 UA 分类并逐请求入库 | Section II | 无 | 可（若公开 stats 端点） | 部分 | 日志样例、条数、时间窗 |
| "25+ 种爬虫"分类 | Section II | 无 | 待核实 | 部分 | UA 清单或 stats 页面 |
| 修复后经真实爬虫日志验证 | FAQPage 第 3 问 | 无 | 不可 | 否（正文无前后数据） | 前后抓取量对比表 |
| 重复 URL 稀释实体密度、降低被引概率 | Section VI | 无 | 待核实 | 部分（方向合理） | 引用规范化与引用率关系的研究 |
| SEP-1960 manifest 为正式声明方式 | Section I | 无 | 待核实 | 部分（编号未给出处） | 提案链接或规范文档 |

> 注：页面 meta 行标注 "First-party walkthrough of our own site; findings are specific to geo010.com"——**第一方数据标注清楚，但"文章声称已验证"不等于"该验证已向读者公开"**。

## 4. 独特价值测试
- 原创数据或实测结果：**部分有**——爬虫日志体系与 CSP sandbox 修复为本站真实实施；但本页**未呈现任何日志数据/图表/前后对比**，数据本身缺失
- 独立研究 / 案例：**有**——对自有站点的第一方审计案例，是站内少见的"动手做"内容，且修复细节具体可复现
- 独特方法 / 框架 / 分析：**有**——"Discoverable → Measurable → Understandable → Trustworthy → Direct & canonical" 五阶段循环表（Section VII）是本站归纳的框架，与六步叙事对应清晰
- 通用行业知识的重新表述：llms.txt、Schema、E-E-A-T、canonical 等概念解释与站内其他章节（schema-markup-guide、eeat-trust-mechanism 等）重复，属已有知识的自我应用复述
- 无法确认原创性者标注：五阶段循环框架的原创性待核实；CSP sandbox 现象为真实技术事实，非原创

## 5. 可提取性测试
1. 问题：AI 就绪审计要检查哪些方面？
   - AI 可提取的答案：发现端点（llms.txt/ai.txt/sitemap）、爬虫可观测性、结构化数据、E-E-A-T、技术健康（CSP）、规范化六类。
   - 原文证据：FAQPage 第 1 问 + Section I-VI 标题体系。
   - 缺失信息：各检查项的通过/不通过判定标准。
   - 是否需结合其他页面：否（本页自足）
2. 问题：如何给网站做一次 AI 就绪自查？
   - AI 可提取的答案：按六步执行（可发现→先度量→机器可读→建信任→修隐形故障→规范化）。
   - 原文证据：FAQPage 第 2 问的编号清单 + 正文六个 h2。
   - 缺失信息：每步的耗时、优先级、验证命令。
   - 是否需结合其他页面：是（具体配置需 fundamentals/llms-txt-guide、technical/schema-markup-guide）
3. 问题：为什么我的网站侧边栏/统计脚本不工作？
   - AI 可提取的答案：若源站为 raw.githubusercontent.com，其 sandbox CSP 头会禁用页面脚本；在中间层剥掉 CSP 与 X-Frame-Options 即可。
   - 原文证据：Section V 全段（含具体头名称）。
   - 缺失信息：Worker 中的具体代码片段；其他托管平台是否同样存在。
   - 是否需结合其他页面：是（worker/index.js 或 technical/tech-stack-overview）
4. 问题：上线 llms.txt 之后怎么知道 AI 真的来爬了？
   - AI 可提取的答案：在源站前放爬虫日志层（Cloudflare Worker 按 User-Agent 分类、逐 HTML 请求入库），观察哪个爬虫访问哪个路径、频率与中断位置。
   - 原文证据：Section II 段落与 "An optimization that cannot be measured is not an optimization"。
   - 缺失信息：日志字段设计、保留期、可公开的 stats 端点地址与实测数据。
   - 是否需结合其他页面：是（data/core-metrics-system、technical/geo-monitoring-tools）
5. 问题：www 和裸域名双版本会怎样影响 GEO？
   - AI 可提取的答案：同一内容两个 URL 会制造重复、稀释实体信号；做法是 301 归一到单一 host，并对过期跳转页 noindex。
   - 原文证据：Section VI。
   - 缺失信息：量化影响的证据（"subtract from citation chance" 无数据支撑）。
   - 是否需结合其他页面：是（technical/llms-txt-advanced）

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 26 | 技术事实准确且多可自行复现；扣分在 SEP-1960 编号无出处、"重复 URL 降低被引概率"无来源因果、FAQPage schema 与正文不同步 |
| 证据可追溯性 | 25 | 19 | 无外部引用，但断言大多指向站点上真实存在、可公开访问的文件与可复现的 HTTP 行为；扣分在"经日志验证"未附任何数据 |
| 独特价值 | 25 | 20 | 第一方动手案例 + 五阶段框架具独立价值；扣分在未展示日志实测数据，且大量概念为站内已有知识复述 |
| 可提取性 | 10 | 9 | 六步标题 + 五阶段表格 + FAQPage 结构，答案前置、块状清晰 |
| 时效性与适用边界 | 10 | 9 | 有 Updated 2026-10-10 与 "findings are specific to geo010.com" 明确边界；扣分在 ai.txt/SEP-1960 的采纳状态未标时点 |
| **总分** | **100** | **83** | |

### 最值得优先修改的 5 个具体位置
1. Section II "the data spoke"：附上真实日志样例或 stats 端点链接（如 7 天内各爬虫请求数表），把"已验证"变成读者可核验的证据。
2. FAQPage JSON-LD 第 3 问提到的 "/ai/summary.json"：正文 Step 中补写这一项，消除 schema 与正文不同步；否则从 schema 中移除。
3. Section I "SEP-1960 manifest"：补提案/规范链接与状态（草案或已采纳），并给出 `.well-known/mcp` 的实际路径供核验。
4. Section VI "duplicate URLs … subtract from the chance AI chooses to cite you"：改为"可能影响"并注明为经验判断，或补充任何支持证据。
5. Section I 对 `.well-known/ai.txt` 的描述：加一句说明各 AI 引擎对该端点的采纳程度不一、属建议性配置，避免读者高估其作用。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
