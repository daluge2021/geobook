---
name: geo-content-format
description: 生成或改写 GEO 页面/文章时，验证内容格式是否适合被 AI 引用与检索（问题式标题、答案前置、结构化块、来源标注）。触发词：新页面、新文章、写内容、生成内容、新内容、GEO内容格式、内容格式、格式检查、内容优化、content、article、write article、check content。
---

# GEO 内容格式验证

本项目（GEO Encyclopedia）的目标是让 AI 引擎检索、引用、推荐本站内容。
**每次生成新页面/新文章，或大幅改写现有内容时，按本 skill 校验内容格式**；不满足则调整后再发布。

## 0. 核心原则

> **一页 = 一组"可被单独引用的答案资产"。每个 H2 是一个独立答案。**

AI（RAG）按用户查询抓取的是页面片段而不是全文：它检索到你的 H2 → 摘录 H2 下的前几句。
所以：**答案必须前置、句子必须短、结构必须清晰、结论必须有来源。**

## 1. 快速校验（自动脚本）

生成/改写完 HTML 后运行：

```bash
node .opencode/skills/geo-content-format/references/check_content_format.mjs docs/你的文章.html
# 支持多文件/目录：node .../check_content_format.mjs docs/metrics docs/community.html
# 无参数：全站扫描 docs/
```

输出三类结果：
- **PASS** — 满足
- **提示** — 建议项，按需优化
- **FAIL** — 必须修复后才可发布

> 脚本只校验结构性指标；语义项（答案前置、场景化开场、来源标注）见第 2 节人工清单，脚本无法完全替代。

**已知例外**（全站扫描出现这些不表示新内容可接受）：
- `monitor.html` / `stats.html`：隐私统计页，故意无 JSON-LD 与 51.la（三重保护）
- `docs/` 根目录旧章节页（`fundamentals.html` 等）：历史遗留孤儿页，不在 sitemap/llms.txt/导航中
- `/glossary/` 术语页：可无面包屑/blockquote，`<br>` 容忍
- `docs/industry/manufacturing-geo.html`：历史遗留 H1 略超 100 字符
- **新生成的文章页必须 0 FAIL**，以上例外不适用。

## 2. 人工检查清单（语义项，脚本覆盖不了）

| 检查项 | 标准 | 反例（需改） |
|--------|------|--------------|
| **答案前置** | 每个 H2 段落开头 1-2 句直接给答案，再展开论证 | 先铺垫三段背景才进入主题 |
| **场景化开场** | 文章开头用 `<blockquote>` 虚拟场景/疑问带入 | 直接"本篇文章将介绍..."式开头 |
| **问题式 H2** | H2 以 What/How/Why/Which/When/Do/Can/Should 开头为主 | 纯名词短语 "Citation Share Metrics" |
| **精短段落** | 每段 ≤6 行（≤400 字符）；长句拆短 | 一段 15 行以上的长文本 |
| **来源标注** | 数据/研究/案例附来源或出处链接 | "研究表明"无出处 |
| **术语全称** | 首次出现附全称，如 Generative Engine Optimization (GEO) | 直接用缩写 |
| **一页一主题** | 页面聚焦单一查询意图 | 一个页面塞多个不相干主题 |

## 3. 页面级结构检查（针对 HTML 文章页）

- [ ] H1 简短有力、含主关键词（≤100 字符）
- [ ] 开头面包屑 + 元信息行（作者 / Updated 日期 / 来源链接）
- [ ] 关键定义用 `<blockquote><strong>...</strong></blockquote>` 强调（AI 爱摘这类短句）
- [ ] 对比/数据用 `<table>`（表头加粗、偶数行交替底色）
- [ ] 问答类文章含 FAQ 区块 + `FAQPage` JSON-LD
- [ ] 结尾一句话总结（AI 常引作 "in short"）
- [ ] `.nav-links` 上篇/下篇
- [ ] JSON-LD（Article + BreadcrumbList）在 `<head>`，含 datePublished/dateModified
- [ ] `dateModified` 更新为本次修改日，`datePublished` 保持创建日；`sitemap.xml` 对应 `<lastmod>` 同步（脚本自动比对 git 最后修改日与工作区改动）
- [ ] canonical + RSS alternate link 齐全；51.la 统计脚本在 body 尾部（R2，不删改）

## 4. 站内格式参考（最优实例）

- `docs/metrics/citation-share.html` — 场景开场 + 问题式 H2 + 定义块 + 对比表 + 结尾总结
- `docs/community/what-is-json-ld.html` — 问答式 + FAQPage + JSON-LD 代码拆解
- `docs/fundamentals/what-is-geo.html` — 定义型文章标杆

## 5. 反模式（GEO 大忌，命中即 FAIL）

- 纯散文、无小标题 → AI 无法定位答案
- 答案埋在段落中间 → RAG 截断时核心观点被切掉
- 观点无来源 → AI 优先引用可验证内容
- 一页多主题 → 无法被特定查询命中

## 6. 生成流程建议

1. **先定 H1 + 全部 H2 大纲**（尽量问题式），确认一页一主题
2. 逐节写：答案前置一句 → 展开（短段落/列表/表格）→ 定义块
3. 补来源链接、结尾总结
4. 跑第 1 节脚本 + 第 2 节人工清单
5. 同步时间戳与索引：本文 `dateModified` 与 `sitemap.xml` 对应 `<lastmod>` 更新为当天（`datePublished` 保持创建日）；再同步 `index.html`、`llms.txt`、`sitemap.xml`、`feed.xml`、`summary.json`（必要时 `.well-known/`）
6. 发布前再跑 `geo-review` 回归清单（R1/R2/51.la/无中文/品牌一致性）
