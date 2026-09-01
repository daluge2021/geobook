# GEO 竞争重爬分析（2026-09-01）

> 6 个核心关键词重爬结果。对比上次（08-xx，尚无存档）——本次重点验证：答案前置段落 6 篇 + Person schema + ecommerce-product-geo 重写后，引用率是否提升。

## 结论：geo010.com 仍未进入任何关键词首页前 10

## 一、6 关键词结果汇总

| 关键词 | geo010.com 出现 | 主导竞品 |
|--------|----------------|---------|
| **What is GEO** | ❌ | arxiv、SEMrush、Wikipedia、GEO Wiki、Coursera、Backlinko、serps.io |
| **GEO vs SEO** | ❌ | Search Engine Land、Ahrefs、SEMrush、loudpixel、flux.la、TurboAudit、Frase |
| **How to do GEO** | ❌ | SEMrush、Similarweb、arxiv、llmpulse、rankops、layer3labs |
| **LLMs.txt guide** | ❌ | llmstxt.org、Ahrefs、llmpulse、openhermit、TurboAudit、tinycommand、gitbook |
| **Schema markup for GEO** | ❌ | Citovo、uplify、searchscore、upgrowth、digitalmatters、skayle |
| **Citation share** | ❌ | aisearchglossary、ai-advisors、citability.dev、Similarweb、uygen、choice |

## 二、重要情报（重爬中发现的新信息）

### 1. Bing Webmaster Tools 已免费提供 Citation Share
- **2026-06-16 起**，Bing AI Performance 报告新增 Citation Share（你的站点在某个 grounding query 全部引用中的占比）、Intents、Topics、Compare 四指标
- Bing 是唯一免费提供此数据的平台；Google Search Console 不报 AI 引用
- **与我们的 crawler 数据吻合**：Bingbot 是主力爬虫
- **行动建议**：立即在 Bing Webmaster Tools 查看 geo010.com 的 AI Performance / Citation Share 数据——这是当前最可操作的免费 AI 归因工具

### 2. UGC 平台主导 AI 引用
- Similarweb 分析 ~600k 引用事件：ChatGPT 中 **Wikipedia 和 Reddit 各占 ~12-13%**，排所有域名前二
- Google AI Mode 中 Fandom 领先，其次 Wikipedia、YouTube
- 多来源一致确认：**Reddit、YouTube、G2、Wikipedia、LinkedIn 是 AI 引用重点来源**
- **行动建议**：Reddit 发帖（当前被 CQS 卡住）和 Wikipedia 词条是高价值目标

### 3. Input 三大门（uygen/Citation share 文章提出）
Citation share 由三件事决定：
1. **Access**：crawler 能否访问（我们 OK）
2. **Understanding**：AI 能否提取清晰答案（我们已做答案前置，OK）
3. **Authority**：第三方是否独立提及你（**我们薄弱——这是主要瓶颈**）

> "以 Google 排名但不在 Gemini/ChatGPT 出现的品牌，通常卡在 off-site presence（第三方提及）。" —— 完全符合我们现状

### 4. 关键数据点
- **Ahrefs**：仅 ~10% 的 ChatGPT 引用 URL 也在 Google 前 10 → 内容即使 Google 不排名，仍可能被 AI 引用
- **Semrush AI Visibility Study**：只有 6-27% 的最常被提及品牌也是最常被引用的来源（"被知道 ≠ 被引用"）
- **Citation Share vs 排名**：谷歌排名看链接/站内信号；AI 引用看实体权威（第三方引用 + 结构化可提取内容 + 词汇对齐）

## 三、结论与差距定位

**我们卡在"第三门：Authority（第三方独立提及）"**。

内容（Understanding）和访问（Access）已经做好，但没有：
- 第三方网站提及/反向链接
- Reddit/UGC 平台上的品牌讨论
- Wikipedia/G2/LinkedIn 等 AI 常引平台的存在

## 四、下一步行动（按优先级）

### 高优先级
1. **查 Bing Webmaster Tools Citation Share**：立即登录看 geo010.com 的 AI Performance 数据，确认当前引用基线（0 还是 >0）
2. **Bing 提交 sitemap**：确保 Bing 完整索引（当前 Bingbot 已爬但需确认验证）
3. **破 Authority 门**：这是拉大差距的关键：
   - Reddit 发帖（养号 14 天后）→ 好
   - **Medium/DEV.to 发布**（立即，无需养号）→ 获得第三方提及 + backlink
   - 创建 **原创研究数据**（爬虫数据报告）让其他站点引用

### 中优先级
4. 期待 1-2 周后再次重爬，观察答案前置是否开始显效（AI 引用延迟 2-8 周）

## 五、验证清单（下次重爬时核对）
- [ ] Bing Webmaster Tools Citation Share 是否 > 0
- [ ] Medium/DEV.to 文章发布后，搜索 "AI crawler data" 是否出现
- [ ] 6 关键词中 geo010.com 首次出现时间点
