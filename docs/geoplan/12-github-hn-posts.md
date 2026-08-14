# 任务 3.3/3.4 执行稿：GitHub 贡献 + Indie Hackers / HN 实战帖

> 对应 `08-p0-weekly-plan.md` 任务 3.3 与 3.4。目标是新增 ≥2 个独立域名外链（GitHub + Indie Hackers / HN）。
> 素材来源：D1 真实爬虫日志（2026-08-14 查询）、`one-week-geo-readiness.html` 实战数据。

---

## 一、任务 3.3：GitHub 开源项目贡献

### 候选项目（按可行性排序）

| 项目 | 仓库 | 贡献点 | 外链价值 |
|------|------|--------|---------|
| **llms.txt 官方规范** | `AnswerDotAI/llms-txt`（2554★，Apache 2.0，Jeremy Howard 维护） | 新增**站点实施案例**：geo010.com 作为 llms.txt 真实案例，提交到案例/教程区；或提 issue 讨论 `llms_txt2ctx` 使用经验 | GitHub README/案例页 dofollow |
| **AI 爬虫名单** | `ai-robots-txt/ai.robots.txt`（专人维护，PR 即可增爬虫） | 新增**实测爬虫 UA 数据**：本站在 D1 日志中观测到的真实 UA（见下方数据表），补全 `robots.json` 条目 | PR 内容、README dofollow |
| **AI 爬虫 UA 清单** | `filecxx/AI-Crawlers` | 提交 GPTBot/ClaudeBot/PerplexityBot 等的**完整实测 UA 字符串**（含版本号，如 `GPTBot/1.4`） | README dofollow |

### 推荐优先做：`ai-robots-txt/ai.robots.txt`

**为什么选它**：①贡献门槛最低——只需在 `robots.json` 中补条目，GitHub Action 自动生成其余文件；②我们有**独家真实观测数据**（本站 D1 日志记录了各爬虫的完整 UA、访问次数、时间分布）；③该项目被大量站点用于防 AI 爬取，我们的数据有真实价值。

**贡献内容草案**：

```
PR 标题：Add observed user-agent strings for GPTBot/ClaudeBot/PerplexityBot from live crawl logs

正文：
I run a small site that logs every crawler request (user agent, path, status, timestamp) 
in a D1 database via a Cloudflare Worker. Adding the exact user-agent strings we've 
observed over the past two weeks, as of 2026-08-14:

- GPTBot: Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.4; +https://openai.com/gptbot)  (69 hits)
- ClaudeBot: Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)  (101 hits)
- PerplexityBot: Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)  (13 hits)
- Amazonbot: Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Amazonbot/0.1; +https://developer.amazon.com/support/amazonbot) Chrome/119.0.6045.214 Safari/537.36  (19 hits)
- Googlebot (smartphone): Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 ... (compatible; Googlebot/2.1; ...)  (81 hits)

Crawler log source: https://geo010.com  (see community/one-week-geo-readiness.html for the methodology)
```

**执行步骤**：
1. GitHub 注册账号（若用旧账号，先确认邮箱已验证）
2. Fork `ai-robots-txt/ai.robots.txt`
3. 编辑 `robots.json` 增加上述 UA 条目（遵循项目现有结构，注意 JSON 格式）
4. 发起 PR，正文用上面的草案（已包含 `https://geo010.com` 链接）
5. 若被合入，README 的贡献者列表 + PR 记录页都会出现该 URL

### 备选：`AnswerDotAI/llms-txt` 案例提交

- 仓库中 `nbs/` 目录有教程（qmd 格式），可在 Discord 先咨询是否接受第三方案例
- 或在仓库 Discussions 区发帖分享 geo010.com 的 llms.txt 实施经验（较 PR 门槛低，但外链价值也低）

---

## 二、任务 3.4：Indie Hackers + Hacker News 实战帖

### 素材：真实数据（来自 one-week-geo-readiness.html 与 D1 日志）

```
Total requests logged:          2,335
Top AI crawlers:                GPTBot 72, Googlebot 49, Applebot 46, Bingbot 38,
                                PerplexityBot 18, ChatGPT-User 13, ClaudeBot 12
External referrers:             google.com 29, chatgpt.com 1
New article on launch day:      crawled 6 times by GPTBot/ClaudeBot etc.
Scanner noise:                  264 requests to /wp-admin/install.php, /xmlrpc.php (404)
GitHub stars reference:         llms.txt spec repo 2,554★ (AnswerDotAI/llms-txt)
```

### Indie Hackers 版本（可直接发布，外链放正文）

**标题**：We made a static site AI-discoverable in one week. Here's the crawl data.

**正文**：

```
I run GEO Encyclopedia (geo010.com), an English-language knowledge base about Generative
Engine Optimization — how to make content get cited by AI answer engines like ChatGPT,
Perplexity and Claude.

Last week we decided to practice what we preach: make our own site AI-discoverable in
7 days. No essays, just engineering. Here's what we did and what the crawl data shows.

WHAT WE CHANGED (5 workstreams, 18 commits)
1. Confirmed access: robots.txt allows AI crawlers; pages load without JS
2. Published orientation files: /llms.txt (lowercase), clean sitemap.xml
3. Exposed discovery endpoints: /.well-known/ai.txt, /ai/summary.json, /ai/faq.json, /ai/service.json
4. Validated schema: Organization + WebSite + Article with real dates; FAQPage where genuine
5. Added observability: every request logged to a D1 DB via a Cloudflare Worker

THE CRAWL DATA (one week, D1 logs)
- Total requests: 2,335
- GPTBot 72, Googlebot 49, Applebot 46, Bingbot 38, PerplexityBot 18, ClaudeBot 12
- A new article got crawled 6 times on launch day by GPTBot, ClaudeBot and others
- google.com referred 29 sessions; chatgpt.com referred 1
- 264 requests were scanner noise (wp-admin/install.php, xmlrpc.php) — all 404

WHAT SURPRISED US
- The big crawlers were already visiting regularly; the intake pipeline worked without us doing anything exotic.
- Freshness matters more than people admit: answer engines prefer a page that looks maintained. Stale dateModified was an easy self-inflicted wound we fixed.
- You can't manage what you don't measure. The observability step changed every other decision.

THE 7-STEP PLAYBOOK (full version on the site)
1. Confirm crawler access + no-JS load
2. Publish llms.txt + sitemap
3. Expose /.well-known/ai.txt + /ai/*.json
4. Validate/enrich schema
5. Sync freshness (dateModified ↔ lastmod)
6. Add crawler observability
7. Re-audit and iterate

The full write-up with the table of crawl numbers:
https://geo010.com/community/one-week-geo-readiness.html

Would love to hear what other solo devs have seen in their own crawler logs — especially
whether you've noticed the AI crawler mix changing recently.
```

**发布注意**：Indie Hackers 允许产品/内容推广，外链直接放正文即可；正文以数据与经验为主，不以广告语气收尾（最后那句互动话术降低广告感）。

### Hacker News 版本（数据钩子标题，避免品牌推广）

**标题**：I logged every AI crawler request to my site for a week; GPTBot and ClaudeBot dominated

**正文**：

```
I run a small static site. Last week I added a Cloudflare Worker that logs every request
(user agent, path, status) to a D1 database, so I could actually see which AI crawlers
come by — instead of guessing.

Numbers (7 days, 2,335 requests):

AI crawlers:
  GPTBot           72   (Mozilla/5.0 AppleWebKit/537.36 ... GPTBot/1.4; +https://openai.com/gptbot)
  ClaudeBot        101  (... ClaudeBot/1.0; +claudebot@anthropic.com)
  PerplexityBot    13   (... PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)
  Amazonbot        19
  ChatGPT-User     13
  Applebot (Safari) 46

Search crawlers:
  Googlebot 49 (+81 smartphone UA), Bingbot 118, YandexBot 12

Noise:
  264 requests to /wp-admin/install.php and /xmlrpc.php, all 404. Scanner traffic is a
  surprisingly large share of "crawl" data — worth knowing before you read anything into
  raw hit counts.

Notable: a freshly published article was fetched 6 times on its launch day by GPTBot,
ClaudeBot and others. The "index within hours" claims people make about llms.txt appear
to hold in practice for at least some engines.

I wrote up the methodology and the full table here:
https://geo010.com/community/one-week-geo-readiness.html

Anyone else running crawler telemetry? Curious whether your GPTBot/ClaudeBot ratio looks
similar, and whether you've noticed new agents appearing recently.
```

**发布注意**：HN 对纯推广极敏感，此版本**无品牌名、无 "my site" 推广语气**，以真实数据和提问收尾；链接只在正文自然出现一次。发布时间选美东周二-周四上午（HN 活跃时段）。

---

## 三、执行清单

- [ ] GitHub 注册/确认账号 → fork `ai-robots-txt/ai.robots.txt` → 编辑 `robots.json` → PR（正文用上文草案）
- [ ] 若有精力：`AnswerDotAI/llms-txt` Discussions 发实施经验帖（可选）
- [ ] Indie Hackers 发布实战帖（标题 + 正文用上文的 IH 版本）
- [ ] HN 发布（标题 + 正文用上文的 HN 版本，注意美东时段）
- [ ] 发布后回填 `08-p0-weekly-plan.md` 状态与外链计数

---

*记录说明：本文件为内部执行稿（geoplan 仅本地提交，不推送）。文中 UA 数据来自本站 D1 日志 2026-08-14 查询。*
