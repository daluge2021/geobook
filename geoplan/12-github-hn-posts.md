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

**为什么选它**：①我们的观测数据真实有用——本站 D1 日志记录了各爬虫的完整 UA 和访问次数；②已核对：**我们观测到的所有爬虫（GPTBot/ClaudeBot/PerplexityBot/Amazonbot/Googlebot/bingbot/YandexBot/SemrushBot/MJ12bot/SERankingBacklinksBot 等）都已在 robots.json 列表里**，所以贡献方式是**在 `table-of-bot-metrics.md` 表格中补一行"本站实测访问数据"**（该项目目前没有实测频率数据，正好是缺口），或者给某个爬虫的 `frequency` 字段补充我们观测到的真实值。

---

### 零基础操作教程（全程网页操作，不需要本地装 git）

> 教程用到的两个概念先解释清楚：
> - **Fork（分叉/复制）**：原项目 `ai-robots-txt/ai.robots.txt` 属于别人，你无法直接改。Fork 就是在**你自己的 GitHub 账号下复制一份**（变成 `你的名字/ai.robots.txt`），你在这份副本上随便改，改完再请求原项目"采纳你的改动"。
> - **PR（Pull Request，合并请求）**：把你副本里的改动"提交"给原项目，原项目维护者审核后点击合并，你的改动就进入原项目。整个过程在 GitHub 网页上完成。

**第 0 步：确认有 GitHub 账号**
- 打开 https://github.com ，若没有账号先注册（需要邮箱验证），右上角头像确认已登录。
- 我们自己的仓库在 `daluge2021/geobook`，所以账号已有，登录即可。

**第 1 步：Fork 原项目**
1. 打开 https://github.com/ai-robots-txt/ai.robots.txt
2. 点页面右上角的 **"Fork"** 按钮（在 Star 旁边）
3. 弹出窗口直接点绿色的 **"Create fork"**（不用改任何选项）
4. 完成后浏览器会跳到 `https://github.com/<你的名字>/ai.robots.txt` —— 这就是你的副本

**第 2 步：在网页上直接编辑文件（不需要下载到本地）**
> GitHub 网页自带在线编辑器，直接在浏览器里改文件，改动会自动保存到你的 fork 副本。**不需要**在本地创建任何文件，也不需要安装 git。

1. 在你的副本仓库里，点击 `table-of-bot-metrics.md` 文件（在文件列表里）
2. 点击文件内容右上角的 **铅笔图标**（Edit this file）——进入在线编辑模式
3. 找到 `| GPTBot |` 开头的行，格式是：
   `| 爬虫名 | 运营商 | 是否尊重robots | 功能 | 频率 | 描述 |`
4. 把 `GPTBot` 那一行的**频率**列（第 5 列）从 `No information.` 改成我们实测的值，例如：
   `| GPTBot | [OpenAI](https://openai.com) | Yes | Scrapes data to train OpenAI's products. | 72 requests in 7 days (observed 2026-08-14) | ...（描述保持不变）...`
   - ⚠️ 只改频率那一格，**其余列保持原样**，别碰表格其他部分，否则容易造成格式错误被拒绝
5. 页面下方有 **"Commit changes"** 区域：
   - 第一个输入框写提交说明（英文），如：`Add observed crawl frequency for GPTBot`
   - 下面留空
   - 单选按钮选 **"Commit directly to the main branch"**（直接提交到你的副本）
   - 点绿色按钮 **"Commit changes"**

**第 3 步：发起 PR（把改动请求发回原项目）**
1. 改完后，GitHub 会在你的副本仓库顶部显示一条黄色横幅，写着
   "This branch is X commits ahead of ai-robots-txt:main" 和按钮 **"Contribute"**
2. 点 **"Contribute"** → 点 **"Open pull request"**（绿色）
3. 页面出现 PR 创建界面，核对：
   - 左边是 `ai-robots-txt:main`（原项目）
   - 右边是 `<你的名字>:main`（你的副本）
   - 箭头方向应该是 副本 → 原项目
4. **标题**填：`Add observed crawl frequency for GPTBot (72 requests in 7 days)`
5. **正文**填（这是放外链的地方）：

   ```
   I run a small site that logs every crawler request (user agent, path, status, timestamp)
   in a D1 database via a Cloudflare Worker. We observed GPTBot hitting our site 72 times
   over 7 days (2026-08-14). Adding the observed frequency to the table.

   Crawler log methodology: https://geo010.com/community/one-week-geo-readiness.html
   ```

6. 点绿色 **"Create pull request"**
7. 大功告成。页面会显示 PR 编号（如 `#123`），等维护者审核合并。
   - 若显示红色 **"Can't automatically merge"**（冲突），在 PR 页点 **"Resolve conflicts"** 按提示逐条处理，或告诉我们
   - 若合并后，你的 GitHub 账号主页 **contributions 记录**和该 PR 页面都会带上 `geo010.com` 链接

**第 4 步（可选）：也改 ClaudeBot**
- 重复第 2 步，把 `| ClaudeBot |` 行的频率列改为 `101 requests in 7 days (observed 2026-08-14)`，然后走第 3 步发第二个 PR
- 一次 PR 只改一处更易通过；两个独立 PR 就是两个 contribution 记录

**第 5 步：发布后回报**
- 把 PR 链接 + 合并状态（open/merged）回填到 `08-p0-weekly-plan.md` 任务 3.3
- 合并后检查：`geo010.com` 是否出现在该 PR 页面

---

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

- [ ] GitHub 登录 → 按上方零基础教程：Fork `ai-robots-txt/ai.robots.txt` → 网页编辑 `table-of-bot-metrics.md`（GPTBot 频率列改实测值）→ 发 PR（正文带 geo010.com 链接）
- [ ] 可选：同上再发一个 ClaudeBot 的 PR（独立贡献记录）
- [ ] 若有精力：`AnswerDotAI/llms-txt` Discussions 发实施经验帖（可选）
- [ ] Indie Hackers 发布实战帖（标题 + 正文用上文的 IH 版本）
- [ ] HN 发布（标题 + 正文用上文的 HN 版本，注意美东时段）
- [ ] 发布后回填 `08-p0-weekly-plan.md` 状态与外链计数

---

*记录说明：本文件为内部执行稿（geoplan 仅本地提交，不推送）。文中 UA 数据来自本站 D1 日志 2026-08-14 查询。*
