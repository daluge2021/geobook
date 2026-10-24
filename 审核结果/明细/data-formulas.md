# 审计明细：Redirecting...（data-formulas.html → data/core-metrics-system.html）

- 文件：docs/data-formulas.html
- 页面类型：重定向页（非内容文章，建议汇总时单列或不计入内容评分）
- 审计日期：2026-10-10
- 正文字数（近似）：0（正文仅一句 "Redirecting to the new page..."，约 5 词）

> 本页无 Article JSON-LD；`<title>Redirecting...</title>`；含 `<meta name="robots" content="noindex, follow">` 与 `<meta http-equiv="refresh" content="0; url=data/core-metrics-system.html">`。

## 1. 核心答案提取

- 核心结论（≤100 字）：本页无内容正文，是一个 0 秒 meta refresh 跳转页，指向 `data/core-metrics-system.html`（该文件存在，跳转有效），并以 noindex,follow 告诉爬虫不要收录本 URL。
- 可被直接回答的 5 个用户问题：
  1. 问题：这个页面讲什么？ → 答案：原文证据不足（页面仅提供一句跳转提示 "Redirecting to the new page..."）。
  2. 问题：GEO 数据公式在哪里？ → 答案：原文证据不足（本页不作答，跳转至 Core Metrics 页面）。
  3. 问题：为什么访问 data-formulas.html 会立刻跳转？ → 答案：因该 URL 已迁移，页面用 0 秒 meta refresh 指向 data/core-metrics-system.html。【原文证据：`<meta http-equiv="refresh" content="0; url=data/core-metrics-system.html">`】
  4. 问题：这个页面会被搜索引擎收录吗？ → 答案：不会，robots meta 为 noindex,follow。【原文证据：`<meta name="robots" content="noindex, follow">`】
  5. 问题：跳转目标是否存在？ → 答案：存在，`docs/data/core-metrics-system.html`。【原文证据：文件系统核验 + 侧边栏"IX. Data → Core Metrics"链接】

## 2. 准确性测试

- 核心概念与术语理解：不适用（无内容性陈述）。
- 数字、日期、对象、条件引用：跳转目标路径为相对路径 `data/core-metrics-system.html`。**注意潜在缺陷**：相对路径以当前 URL 目录为基准，`data-formulas.html` 位于 `docs/` 根，故解析为 `/data/core-metrics-system.html`，正确；但若该 HTML 被从其他路径引用（如子目录内复制），路径会失效——当前站点结构下无问题。
- 断章取义 / 过度推断 / 遗漏限制条件：不适用。
- 前后矛盾 / 无法验证的事实：正文无断言，无矛盾。`<title>Redirecting...</title>` 与无 Article schema 一致。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 页面用途为 URL 迁移跳转 | meta refresh 标签 | 无 | 可（本地核验） | 是 | 无 |
| 该 URL 不应被收录 | `<meta name="robots" content="noindex, follow">` | 无 | 可 | 是 | 无 |
| 跳转目标有效 | href 指向 data/core-metrics-system.html | 无 | 可（文件存在） | 是 | 无 |
| 旧 URL 是否仍被站内/外链引用 | — | — | 不可 | 原文证据不足 | 需检查 sitemap.xml、feed.xml、站内链接是否已清理 |

> 注意：跳转目标"存在"已在本地文件系统核实；但旧 URL 是否仍出现在 sitemap/llms.txt/外链中，本页未提供任何信息。

## 4. 独特价值测试

- 原创数据或实测结果：无。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：无（仅为技术性 301 替代方案——因 GitHub Pages 无法配服务端 301，用 meta refresh 是本项目的合理工程取舍，属实现细节而非内容价值）。
- 通用行业知识的重新表述：无内容可复述。
- 无法确认原创性者标注：不适用。

## 5. 可提取性测试

1. 问题：data-formulas 页面的内容是什么？
   - AI 可提取的答案：无实质内容，只有 "Redirecting..."。
   - 原文证据：正文 `<p>Redirecting to <a href="data/core-metrics-system.html">the new page</a>...</p>`。
   - 缺失信息：全部内容性信息。
   - 是否需结合其他页面：是（必须抓取 data/core-metrics-system.html 才能作答）。
2. 问题：GEO 的核心指标公式有哪些？
   - AI 可提取的答案：原文证据不足。
   - 原文证据：本页无相关内容。
   - 缺失信息：全部。
   - 是否需结合其他页面：是（唯一可行路径是跟随跳转）。
3. 问题：这一页应不应该被抓取？
   - AI 可提取的答案：robots meta 为 noindex,follow，指示不要收录本页但可跟踪链接。
   - 原文证据：meta robots 标签。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：旧链接 data-formulas.html 还能用吗？
   - AI 可提取的答案：能，会 0 秒跳转到新页面（前提：客户端执行 meta refresh；不执行 JS/refresh 的抓取器只会看到一句提示）。
   - 原文证据：meta http-equiv="refresh"。
   - 缺失信息：服务端 301 无法在 GitHub Pages 配置的说明。
   - 是否需结合其他页面：是。
5. 问题：跳转后的新地址是什么？
   - AI 可提取的答案：https://geo010.com/data/core-metrics-system.html。
   - 原文证据：refresh url 与正文链接一致。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 20 | 无事实性陈述，无错误；但页面对任何内容性问题都无法作答，作为"内容页"不具可评的准确性（按无内容给中性分） |
| 证据可追溯性 | 25 | 0 | 无任何结论、无来源、无正文 |
| 独特价值 | 25 | 0 | 无内容 |
| 可提取性 | 10 | 2 | 只有一句跳转提示；不执行 meta refresh 的抓取器拿不到任何答案，需跟随跳转才能取到内容 |
| 时效性与适用边界 | 10 | 6 | noindex + 0 秒跳转处理规范、目标存在；但无"为何迁移/何时迁移"的说明，且 meta refresh 在部分 AI 抓取器中不被跟随，存在抓取风险 |
| **总分** | **100** | **28** | |

### 最值得优先修改的 5 个具体位置
1. `<body>` 正文：仅有跳转提示，建议补一句"本页内容已迁移至 Core Metrics System（含 301 迁移说明）"，让不跟随 meta refresh 的抓取器至少拿到主题信息。
2. 头部：建议增加 `<link rel="canonical" href="https://geo010.com/data/core-metrics-system.html">`，把权重/信号明确指向新页（当前无 canonical）。
3. 站点层面（非本文件）：确认 sitemap.xml、feed.xml、llms.txt、summary.json 中不再出现 data-formulas.html，避免爬虫反复抓取空页。
4. 站点层面：检查站内是否仍有链接指向 data-formulas.html，应改为直链 data/core-metrics-system.html，减少一跳延迟。
5. 可选：GitHub Pages 无法发服务端 301，若该旧 URL 有外链权重，考虑在 Cloudflare Worker（本项目已有 worker）中加 301 规则，比 meta refresh 对 AI 爬虫更可靠。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
