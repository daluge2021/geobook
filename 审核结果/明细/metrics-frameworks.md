# 审计明细：Redirecting...（原 II. Metrics & Frameworks 栏目页）

- 文件：docs/metrics-frameworks.html
- 页面类型：栏目页（重定向占位页，非内容页）
- 审计日期：2026-10-10
- 正文字数（近似）：7 词（唯一正文：`Redirecting to the new page...`）
- 页面日期（JSON-LD）：无 Article/日期标注（该页无 JSON-LD）

## 0. 页面性质说明（本页特殊，先定性）

该文件不是内容页，而是一个 **meta-refresh 重定向 stub**：

```html
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=metrics/citation-share.html">
<title>Redirecting...</title>
...
<p>Redirecting to <a href="metrics/citation-share.html">the new page</a>...</p>
```

- 无 `<h1>`、无正文段落、无 JSON-LD（Article/FAQ/Breadcrumb 均无）、无图片。
- `noindex, follow` + 0 秒刷新 → 原"II. Metrics & Frameworks"栏目页内容已迁至 `metrics/citation-share.html`。
- 已核对：`sitemap.xml`、`llms.txt`、`summary.json` 中均**不再包含** `metrics-frameworks` 条目（检索零命中），即该页未被当作内容页提交给索引器。
- 因此本页无"事实断言"可审计，以下各节按"空内容页"口径记录。

## 1. 核心答案提取

- 核心结论（≤100 字）：本页无内容，仅为指向 metrics/citation-share.html 的即时重定向占位；II. Metrics & Frameworks 栏目已由 Citation Share 文章承载入口。
- 可被直接回答的 5 个用户问题：
  1. 问题：II. Metrics & Frameworks 栏目页讲了什么？ → 答案：原文证据不足——该页无正文，仅提示"Redirecting to the new page"。
  2. 问题：GEO 的核心指标有哪些？ → 答案：本页无法回答；重定向目标 metrics/citation-share.html 给出 Citation Share 与 Semantic Coverage 两项。【原文证据：`url=metrics/citation-share.html`】
  3. 问题：这个页面可以被引用吗？ → 答案：不可——页面带 `noindex, follow`，且 meta refresh 立即跳转，无内容可引。【原文证据：`<meta name="robots" content="noindex, follow">`】
  4. 问题：栏目下的文章列表在哪里？ → 答案：原文证据不足（本页无列表）；需转至 index.html 或重定向目标页的面包屑/导航。
  5. 问题：该页有更新日期或作者吗？ → 答案：无——无 JSON-LD、无 article-meta、无日期。【原文证据：文件全文 22 行，head 中仅有 title/canonical 之外的 RSS link 与两个 meta】

## 2. 准确性测试

- 核心概念与术语理解：无概念内容，不存在概念误解。
- 数字、日期、对象、条件引用：无数字与日期；唯一引用对象 `metrics/citation-share.html` 为站内真实存在的文件，重定向目标有效。
- 断章取义 / 过度推断 / 遗漏限制条件：不适用（无断言）。
- 前后矛盾 / 无法验证的事实：无内部矛盾。**外部一致性问题**：站内多处面包屑与部分链接仍指向 `metrics-frameworks.html`（如各 metrics 子页的 "II. Metrics & Frameworks" 面包屑、SHEEP 页 nav-links "Metrics & Frameworks"），点击可正常跳转（follow 生效），但存在"链接到重定向页"的间接性——对 AI 抓取而言，跟随 meta refresh 而非 301，属较弱的信号传递。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 本页已迁移至 metrics/citation-share.html | meta refresh + 正文链接 | 无（站内自证） | 可（目标文件存在） | 是 | 无 |
| 本页不应被索引 | `noindex, follow` | 无 | 可（meta 可见） | 是 | 无 |
| （原栏目页的任何内容结论） | 无正文 | — | — | — | 原栏目页内容如仍需保留，应恢复为真实栏目页 |

> 注：本页零外部来源是合理的（重定向页无需来源），不按"无来源事实"扣分；扣分来自"无内容可评"。

## 4. 独特价值测试

- 原创数据或实测结果：无。
- 独立研究 / 案例：无。
- 独特方法 / 框架 / 分析：无（meta refresh + noindex 是通用技术处理，非本文贡献）。
- 通用行业知识的重新表述：不适用。
- 无法确认原创性者标注：不适用。

## 5. 可提取性测试

1. 问题：这个页面讲什么？
   - AI 可提取的答案：仅 "Redirecting to the new page"，无实质内容。
   - 原文证据：`<p>Redirecting to <a href="metrics/citation-share.html">the new page</a>...</p>`
   - 缺失信息：全部内容。
   - 是否需结合其他页面：是（必须转到 metrics/citation-share.html 才有答案）。

2. 问题：II. Metrics 栏目包含哪些文章？
   - AI 可提取的答案：原文证据不足；只能从 URL 推断目标为 Citation Share 一文。
   - 原文证据：`url=metrics/citation-share.html`
   - 缺失信息：栏目下其余文章（entity-density、sheep-framework、competitive-ai-analysis）清单。
   - 是否需结合其他页面：是（index.html 侧边栏 / 各栏目页）。

3. 问题：为什么该页会被 AI 抓到？
   - AI 可提取的答案：可能经由历史 sitemap/外链/站内面包屑进入；页面自身 noindex 表明不希望被收录。
   - 原文证据：`<meta name="robots" content="noindex, follow">`
   - 缺失信息：该 URL 是否仍被其他站外来源引用（无法从本页判断）。
   - 是否需结合其他页面：是。

4. 问题：metrics-frameworks.html 还有用吗？
   - AI 可提取的答案：仅作为重定向入口保留，价值在于让旧链接不断，实际内容在 citation-share.html。
   - 原文证据：meta refresh 0 秒 + 正文链接。
   - 缺失信息：原栏目页是否应恢复（若需栏目聚合视图）。
   - 是否需结合其他页面：是。

5. 问题：该页能作为 GEO 证据被引用吗？
   - AI 可提取的答案：不能——无内容、noindex、无 schema，不构成可引用证据。
   - 原文证据：全文件 22 行，head 仅 title/robots/refresh/RSS。
   - 缺失信息：不适用。
   - 是否需结合其他页面：是。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 无任何断言故无事实错误，重定向目标有效；按"无内容即无从验证"给中性偏低分，而非按有内容页的满分口径 |
| 证据可追溯性 | 25 | 5 | 无内容、无证据链；重定向自证不计为证据 |
| 独特价值 | 25 | 0 | 无任何原创内容 |
| 可提取性 | 10 | 3 | AI 只能提取到重定向提示与目标 URL（目标可跟随），无法从本页独立回答任何实质问题 |
| 时效性与适用边界 | 10 | 6 | 处理方式正确（noindex+follow+0 秒刷新，且 sitemap/llms.txt 已清除条目）——边界清晰是加分项；扣分于 meta refresh 而非 301，抓取器遵循度弱于服务端重定向 |
| **总分** | **100** | **38** | |

### 最值得优先修改的 5 个具体位置
1. **优先级最高**：确认该页的存留策略——若仅为兼容旧 URL，建议改为服务端 301（GitHub Pages 无法自定义 301，则保持 meta refresh 但在站内改链为直链，见第 2 条）。
2. 站内指向 `metrics-frameworks.html` 的链接共 9 处（citation-share.html:177/303、competitive-ai-analysis.html:155/321/422、entity-density.html:170/296、sheep-framework.html:171/297，含 JSON-LD BreadcrumbList 与可见面包屑）：改为直链 `metrics/citation-share.html`，或恢复一个含文章列表的真实栏目页，减少"经重定向取内容"的一跳。
3. 若栏目聚合仍被需要（导航体验、llms.txt 目录结构），建议把本文件恢复为真实栏目页：列出 II. Metrics 下 4 篇文章 + 每篇一句摘要，而不是重定向 stub。
4. 若确认不再需要该 URL：保留 noindex 与刷新即可，但应在内部文档注明它不是内容页，避免被后续审计/汇总环节当作栏目页评分对象。
5. head 中保留的 `<link rel="alternate" RSS>` 对一个重定向页无意义，可删除以减少噪音（低优先级）。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
