# GEO 国际 AI 平台可见性测试清单

> 目标：用固定英文测试题，验证 geo010.com 内容在国际 AI 平台（ChatGPT / Perplexity / Claude / Gemini）被引用与收录的情况。
>
> 与 `05-monitoring-system.md` 的关系：05 覆盖国内平台 + 10 个中文关键词；本文件专注**国际平台 + 英文测试题**，两者每周并行执行。

---

## 一、测试原则

1. **英文提问**：国际平台的网络检索对英文 query 召回最优。
2. **开启联网**：ChatGPT / Gemini / Claude 需打开 "Search / Web access" 开关；Perplexity 默认联网。
3. **看来源面板**：判定标准不是"答案对不对"，而是**来源列表是否出现 `geo010.com`**。
4. **追问逼源**：任何一题后可追加 "Give me the source URL" 或 "Which website did you get that from?"，让 AI 给出站点域名。
5. **固定顺序**：每次按同一平台顺序、同一题顺序执行，保证可比性。

## 二、测试题（12 题，分三层）

### 第一层：独特指标题（最易命中）

> 站点的专有概念。AI 能答出概念并引用来源，基本就是引用了 geo010.com。

| # | 测试问题（英文） | 命中判定 |
|---|-----------------|---------|
| 1 | What is citation share in GEO? | 出现 "Citation Share" 作为核心 GEO 指标并引用来源 |
| 2 | What is the SHEEP framework for GEO? | 完整讲出 SHEEP 框架步骤 |
| 3 | What is entity association density? | 定义"品牌与实体关联密度" |
| 4 | What is the 3C optimization model in GEO? | 提到 Credibility / Clarity / Context 三杠杆 |
| 5 | What is knowledge entropy in AI search? | 出现"知识熵"概念（碎片内容 vs 整合资产） |
| 6 | What is answer assetization? | 定义"答案资产化"并说明做法 |

### 第二层：基础概念题（竞争激烈）

| # | 测试问题（英文） | 命中判定 |
|---|-----------------|---------|
| 7 | What is Generative Engine Optimization? | 引用含 Princeton 2024 研究、GEO 定义 |
| 8 | What is the difference between SEO and GEO? | 对比中出现"AI 引荐 / 零点击"角度 |
| 9 | How does GEO work? | 提到"如何被 AI 引用"而非仅"排名" |

### 第三层：站点专属题（验证站本身被认知）

| # | 测试问题（英文） | 命中判定 |
|---|-----------------|---------|
| 10 | What is geo010.com / the GEO Encyclopedia? | 能说出这是一个 GEO 知识库站点 |
| 11 | Can a website become AI-discoverable in one week? | 引用 geo010.com 实战案例（2335 条日志 / 72 GPTBot / 24h 被爬） |
| 12 | How did a site audit its own AI-readiness? | 引用 GEO Encyclopedia 自审案例 |

## 三、国际平台（4 个）

| 平台 | 搜索入口 | 备注 |
|------|---------|------|
| Perplexity | perplexity.ai | 引用来源面板最透明，首选 |
| ChatGPT | chatgpt.com（需开联网） | 全球最大 |
| Claude | claude.ai（需开搜索） | 需手动开 web search |
| Gemini | gemini.google.com | 默认联网 |

## 四、记录模板

### 逐题记录表（每题一行）

```
日期 | 平台 | 题号 | geo010.com 命中? | 引用来源数 | 判定
```

- **命中**：来源列表含 geo010.com，记为 ✅
- **点名**：正文出现 "GEO Encyclopedia"，来源里没有，记为 🟡
- **未命中**：来源里没有，记为 ❌

### 每周汇总表

| 周次 | 第1层命中/6 | 第2层命中/3 | 第3层命中/3 | 总命中/12 | 引用份额趋势 |
|------|-----------|-----------|-----------|-----------|------------|
| 第1周 | | | | | |
| 第2周 | | | | | |

## 五、结果解读

- **第一层命中率上升** → 专有概念（Citation Share / SHEEP / 3C 等）正在被 AI 吸收，说明内容价值被认可。
- **第三层命中** → 站点本身进入 AI 的知识图谱，是最强的收录信号。
- **只点名不引用**（🟡）→ 内容被读到但尚未进入引用池，持续监测，重点检查该页是否在 llms.txt 前置。
- **持续 ❌** → 检查对应页面是否被 AI 爬虫访问（见 `/stats.html` 与 D1 日志）、内容是否可被无登录访问。

---

*记录说明：本文件是内部监测清单（geoplan 随站发布但不进入导航）。英文测试题原文即上面表格内文字，可直接复制使用。*
