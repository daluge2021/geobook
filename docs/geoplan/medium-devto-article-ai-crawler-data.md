# Medium / DEV.to Article Draft — AI Crawler Behavior Report (v2)

> **发布平台**: Medium + DEV.to（同步发布）
> **Canonical**: https://geo010.com/data/crawler-behavior-data.html（指向主站原创数据报告）
> **目的**: 增加反向链接 + 品牌提及 + E-E-A-T 信号 + 原创数据被引用
> **素材**: 主站刚发布的 AI Crawler Behavior Report（12 天 / 4,115 hits，真实 D1 爬虫日志）

---

## Title

I Tracked Every AI Crawler on My Site for 12 Days — Here's the Real Data (4,115 Hits)

## Subtitle

A primary-data study of how ChatGPT, Claude, Perplexity, Bing and Amazon actually crawl a live site, and what the patterns mean for Generative Engine Optimization (GEO) and citation share.

## Tags

`GEO` `SEO` `AI` `ChatGPT` `Data Analysis` `Technical SEO`

---

## Article Body

### TL;DR

I run a site about Generative Engine Optimization (GEO) and configured a Cloudflare Worker to log **every crawler visit into a D1 database**. Over 12 days I captured **4,115 hits** and could finally see, with hard numbers, which AI crawlers visit, how often, and which pages they prioritize.

**The short version:** Bing is the dominant AI gateway, ClaudeBot is the most consistent, Amazon scans the widest surface, and OpenAI crawls in two very distinct modes.

---

### The Setup

[GEO Encyclopedia](https://geo010.com) is a 59-article English knowledge base on Generative Engine Optimization. It is fully server-rendered static HTML — no JavaScript dependency for content — so every crawler receives the same clean, answer-first pages a human sees.

Each request passes through a Cloudflare Worker that writes (user agent, path, HTTP status, page type, referer) to a D1 database. We identify crawlers by user agent and aggregate day by day.

**Tracking period:** August 21 – September 1, 2026
**Total hits logged:** 4,115
**Unique crawlers identified:** 13
*(Excluded: ~2,744 "null" user-agent hits that largely probed sensitive paths — a scanner signature, not a real crawler.)*

---

### The Data: Crawler Breakdown

| Crawler | Total Hits | Unique Pages | Active Days | Avg Hits/Day |
|---------|-----------|-------------|-------------|-------------|
| Bingbot | 326 | 95 | 12/12 | 27 |
| ClaudeBot | 254 | 38 | 11/12 | 23 |
| Googlebot | 216 | 68 | 11/12 | 20 |
| Amazonbot | 178 | 117 | 11/12 | 16 |
| OAI-SearchBot | 111 | 80 | 12/12 | 9 |
| ChatGPT-User | 61 | 45 | 4/12 | 15 |
| GPTBot | 45 | 33 | 11/12 | 4 |
| PerplexityBot | 29 | 24 | 7/12 | 4 |
| FacebookBot | 23 | 1 | 11/12 | 2 |
| Google-Extended | 14 | 14 | 1/12 | 14 |

---

### Key Findings

**1. Bing is the #1 AI gateway.**

Bingbot logged 326 hits across 95 unique pages and visited every single day. That matters because Bing is the indexing backend for Copilot, ChatGPT's web search and Perplexity. When you optimize for Bing, you are effectively optimizing for the largest share of AI answer traffic.

Implication: **Bing Webmaster Tools is now the most valuable free AI analytics source** — and since June 2026 it reports citation share, a metric Google Search Console does not expose.

**2. ClaudeBot is the most consistent — publish and wait.**

ClaudeBot visited 11 of 12 days with remarkably steady volume (18–42 hits/day) and no burst patterns. It indexes new content on a predictable cadence.

Implication: **New articles are picked up by Claude within roughly 24–48 hours, with no manual submission needed.**

**3. Amazon is scanning the widest surface.**

Amazonbot reached 117 unique pages — the highest page diversity of any crawler despite ranking mid-pack on volume. That breadth suggests Amazon is building a comprehensive content index for AI shopping (Alexa+).

Implication: **If you sell products, Amazon's AI is evaluating your product pages. Product schema is no longer optional.**

**4. OpenAI runs two very different crawlers.**

- **OAI-SearchBot** (111 hits over 12 days): a steady, Bing-powered search crawler.
- **ChatGPT-User** (61 hits over just 4 days): user-triggered and bursty — it spiked to 57 requests on a single day, then went quiet.

Implication: **When a real user asks ChatGPT to search, it re-crawls the cited pages in real time. Answer-first, well-structured content directly improves your odds of a live citation.**

**5. Perplexity is selective but high-quality.**

Only 29 hits over 7 days, but covering 24 unique pages. Perplexity crawls less but more deliberately, prioritizing structured data and clear answers. A Perplexity citation functions like a high-authority backlink for AI surfaces.

**6. External mentions are rare but disproportionately valuable.**

Only six external domains sent referral traffic — google.com, sahammurah.com, reddit.com and a few singles. But each one correlates with bursts of visits from domains you have never seen.

Implication: **A single Reddit post or a link from an unfamiliar domain is a leading indicator of AI discovery.**

---

### Which Pages Do Crawlers Prioritize?

| Page | Total Hits | What It Tells Us |
|------|-----------|-----------------|
| `/` (homepage) | 571 | Crawlers always check the root |
| `/robots.txt` | 247 | Every crawler respects robots.txt first |
| `/sitemap.xml` | 138 | Sitemaps are still the primary discovery mechanism |
| `/fundamentals/what-is-geo.html` | 40 | "What is GEO" is high-demand |
| `/metrics/citation-share.html` | 37 | Metrics content attracts analytical crawlers |
| `/fundamentals/llms-txt-guide.html` | 36 | LLMs.txt is a hot topic for AI crawlers |

---

### What This Means for GEO / Citation Share

Citation share depends on three gates: **Access** (can a crawler reach you), **Understanding** (can it extract a clear answer), and **Authority** (do third parties independently mention you). Crawl logs reveal the first two.

Because Bing dominates our logs, and Bing is the only major engine offering free citation-share reporting, the data points to one concrete first step for any site:

> **Start with Bing Webmaster Tools → watch your citation share → publish consistent, answer-first content that Claude can index in 48 hours, structured so Amazon and OpenAI can extract and cite it.**

The full primary-data report, with methodology and more granular tables, is live on GEO Encyclopedia: `https://geo010.com/data/crawler-behavior-data.html`.

---

## 发布说明

### Medium
- 创建 Medium 账号（geo010 或类似）
- 发布文章时添加 canonical URL：`https://geo010.com/data/crawler-behavior-data.html`
- 标签：GEO, SEO, AI, ChatGPT, Data Analysis

### DEV.to
- 创建 DEV.to 账号，同步发布（可直接复制）
- 标签：geo, seo, ai, chatgpt, data-analysis

### Canonical 策略
- Medium/DEV.to 文章添加 `<link rel="canonical" href="https://geo010.com/data/crawler-behavior-data.html">`
- 这样搜索引擎将权重归到主站原创报告
- 但反向链接和品牌提及仍然有效

### 发布时间
- 周二或周三上午发布（最佳 engagement）
- 发布后在 Twitter/X 与 LinkedIn 分享（标签 #GEO #SEO #AI））
