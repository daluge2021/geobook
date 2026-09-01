# Reddit Post: Revised Version (Bot-Safe)

> **当前状态（2026-09-01）**: 上次发到 r/SEO 被删，err.txt 显示原因是 **CQS Score 太低**（账号 v3 歧视系统评分不足）。恢复发布前必须先养号 7-14 天。见文末「养号计划」。


> **修改要点**:
> 1. 去掉所有外部域名引用
> 2. 去掉 "my site" 等自我推广词汇
> 3. 标题改为提问式（引发讨论）
> 4. 正文缩短，去掉 Markdown 表格（用列表替代）
> 5. 去掉 TL;DR（有些 sub 反感 TL;DR）
> 6. 语气更像提问而非分享

---

## Option A: 提问式标题（推荐，不易被删）

**Title**: Has anyone actually measured which AI crawlers visit their site most?

**Body**:

I've been tracking bot visits on a site for about two weeks using Cloudflare Worker + D1. Wanted to share what I found because I haven't seen much real data on this.

The numbers (excluding null/unknown user agents):

- Bingbot: ~326 hits, visited every day, covered 95 pages
- ClaudeBot: ~254 hits, 11 out of 12 days, very consistent
- Googlebot: ~216 hits, but seems to be slowing down
- Amazonbot: ~178 hits, surprisingly covered 117 different pages
- OAI-SearchBot: ~111 hits, steady
- ChatGPT-User: ~61 hits but only on 4 days (spiky)
- GPTBot: ~45 hits
- PerplexityBot: ~29 hits, very selective
- FacebookBot: ~23 hits

The biggest surprise was Amazonbot. It visited more unique pages than any other crawler. Anyone know what they're building?

Also noticed that Bing is basically the backend for multiple AI products now (Copilot, ChatGPT search, Perplexity). So Bing Webmaster Tools might be more useful than Google Search Console for tracking AI visibility.

Has anyone else tracked this? What patterns are you seeing?

---

## Option B: 数据分享式标题

**Title**: Two weeks of AI crawler data — Bing is the new gateway to AI search

**Body**:

Been logging every bot visit on a small content site for 12 days. Here's the breakdown:

**Top crawlers by volume:**
- Bingbot: 326 hits (visited every single day)
- ClaudeBot: 254 hits (11/12 days)
- Googlebot: 216 hits
- Amazonbot: 178 hits (117 unique pages!)
- OpenAI search bots: 172 combined hits
- PerplexityBot: 29 hits

**What surprised me:**
1. Bing is the dominant crawler, not Google. Makes sense when you realize Bing powers Copilot + ChatGPT search + Perplexity backend
2. Amazon is scanning way more pages than I expected. They covered 117 unique pages — more than any other crawler
3. ClaudeBot is the most consistent. Same time every day, steady volume
4. ChatGPT web search is real — got 57 hits in one day when users were searching

**What I changed based on this data:**
- Bing Webmaster Tools is now my primary analytics tool
- Added structured data (JSON-LD) to every page
- First paragraph of every article now answers the question directly
- Added llms.txt to root directory

Anyone else tracking AI crawlers? Would love to compare notes.

---

## Option C: 问题讨论式（最安全）

**Title**: What's your experience with AI crawlers on your site?

**Body**:

Curious what others are seeing. I set up basic logging on a content site and after about two weeks noticed some interesting patterns:

Bingbot is by far the most active crawler. Way more than Google. ClaudeBot is very consistent — visits almost every day at roughly the same time. Amazonbot was a surprise — it's crawling way more pages than I expected.

The ChatGPT web search crawler (ChatGPT-User) is interesting too. It only showed up on 4 days but one of those days had 57 hits. Seems like it activates when users actually use the search feature.

Questions for the community:
1. Are you seeing similar patterns with Bing being dominant?
2. What's your experience with Amazonbot? What are they building?
3. Has anyone noticed PerplexityBot behavior?

---

## 发帖前检查清单

### 账号准备
- [ ] Reddit 账号注册超过 7 天
- [ ] 邮箱已验证
- [ ] 先在 r/SEO 评论 5-10 条其他帖子（积累 karma）
- [ ] 不要在同一天发多个帖子

### 帖子检查
- [ ] 标题不含 "my"、"our"、"I built" 等自我推广词
- [ ] 正文不含外部域名链接
- [ ] 正文不含 Markdown 表格（用列表替代）
- [ ] 帖子长度适中（300-500 词）
- [ ] 语气像讨论/提问，不像广告

### 发帖时间
- [ ] 美东时间 周二-周四 上午 9-11 点（最佳 engagement）
- [ ] 避免周末发帖

### 发帖后
- [ ] 回复每一条评论
- [ ] 不要主动提网站（等别人问）
- [ ] 如果有人问 "where's the data from?"，回复时可以提 geo010.com
- [ ] 不要在评论中重复发链接

---

## 养号计划（CQS 恢复，2026-09-01 起）

> 背景：r/SEO 删帖，err.txt 提示 "account has a low CQS Score. Please contribute more positively on Reddit overall before posting." 账号 v3 歧视系统分数不足，纯技术性限制，非内容问题。

### 目标
14 天内把 CQS 从低分养到可发帖水平，期间**不尝试发帖**。

### 每日执行表

| 天数 | 操作 | 频率 |
|------|------|------|
| 第 1-3 天 | 在 r/SEO 回复别人的帖子，纯文字、有价值、**不带任何链接** | 每天 3-5 条 |
| 第 4-7 天 | 继续评论，积累 upvote；可扩展到 r/bigseo、r/TechSEO | 每天 2-3 条 |
| 第 8-10 天 | 评论中可偶尔分享非链接的经验/数据 | 每天 2 条 |
| 第 11-14 天 | 视 CQS 情况尝试发帖（用 Option A 提问式标题，无链接） | 每 2-3 天最多 1 帖 |
| 之后 | 成功后逐步发帖，间隔 ≥ 48 小时 | — |

### 评论技巧（获得 upvote，快速提 CQS）
1. **先回答再补充**：直接回答 OP 问题，再补自己的相关经验
2. **多给可操作建议**：步骤式、清单式回复 upvote 率高
3. **用专业术语**：r/SEO 吃专业度，泛泛而谈反而被忽略
4. **及时**：新帖发布 1-2 小时内评论更容易被看到
5. **不要杠**：即使不同意见也保持建设性

### 评论示例（r/SEO）
- 回复 "How to optimize for AI search?"：`Good points. I've also noticed Bing Webmaster Tools shows AI search impressions that Google Search Console doesn't. Worth checking if you haven't already.`
- 回复 "Is SEO dead?"：`SEO isn't dead, it's evolving. The fundamentals (good content, technical hygiene, user intent) still matter. The difference now is AI systems also need to `understand` your content, not just index it.`
- 回复 "What Schema types matter most for GEO?"：`Article + FAQPage are the two I'd prioritize. FAQPage gives AI structured Q&A it can directly extract. Article gives it metadata about author, date, and topic.`

### 避坑清单
- ❌ 发帖间隙更新账号资料/昵称头像（会重置部分权重）
- ❌ 从同一 IP 多账号操作
- ❌ 回复时提及自家网站 geo010.com 或任何 SaaS
- ❌ 复制粘贴相同内容到多个帖子
- ✅ 每次评论都像「真人新用户」在答问题

