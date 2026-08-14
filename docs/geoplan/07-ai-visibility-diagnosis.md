# GEO 国际平台测试结果诊断与行动建议

> 来源：`planResult/`（2026-08-14 国际 AI 平台测试，3 问题 × 4 平台 = 12 次回答）
>
> 结论先行：**12 个回答中仅 1 次成功引用 geo010.com（Claude 追问索源后），引用池尚未建立。**

---

## 一、测试结果总览

| 问题 | Claude | GPT | Grok | Perplexity |
|------|--------|-----|------|------------|
| What is citation share in GEO | ❌ | ❌ | ❌ | ❌ |
| What is entity association density | ⚠️ 追问后才引用，并称"niche site" | ❌ 引用 GetSEO.tools 等竞品 | ❌ 声称"无标准定义" | ❌ 引用 thestarrconspiracy.com |
| Can a website become AI-discoverable in one week | ❌ | ❌ | ❌ | ❌ |

**关键事实：**
- 4 平台的观点与 geo010.com 高度一致，但均引用行业大站（Google/OpenAI/Bing 官方、The GEO Lab、UpGrowth 等）
- Claude 能检索到实体密度页（复述出 Yext 86% 研究、CRM→Salesforce 例子），说明**内容已被 Claude 索引**，但需主动索源才出现
- Grok 对"entity association density"明确称 "No widely established definition"——**这个词的定义权是空的，是抢占机会**
- Claude 负面评价：*"appears to be a niche/independent site rather than an established industry standard"*——站点被 AI 定位为"小众独立站"

## 二、诊断：为什么被抓取却没被引用

| 问题 | 现状 | 影响 |
|------|------|------|
| 内容质量 | 观点正确、与 AI 答案一致 | ✅ 已达标 |
| 抓取覆盖 | GPTBot/ClaudeBot/Bingbot 持续抓取 | ✅ 已达标 |
| **权威信号（外链）** | 无外部网站链接到 geo010.com | ❌ AI 无佐证来源 |
| **第三方佐证** | 仅 1 个 Reddit 帖子 | ❌ 跨源验证不足 |
| **实体注册** | 站点 Schema 有 Organization，但未在知识图谱平台登记 | ❌ 实体未被识别为权威 |
| 检索优先级 | 新站、低外链、无品牌搜索量 | ❌ 排序靠后 |

**根本原因：内容好 ≠ 引用池。** 引用需要"权威信号 + 跨源佐证 + 实体识别"三重叠加，目前三者都薄弱。

## 三、行动建议（按优先级）

### P0 立即（本周）

**1. 抢占"entity association density"定义权**
- Grok 称该词"无标准定义"，GPT 引用的是竞品小站——这是未被占据的定义空位
- 做法：在实体密度页 **meta description 与首段** 用业界标准定义句（当前首段是 "two critical factors"，不够直接）
- 在 llms.txt 的 Quick Answers 区前置该定义句，方便 AI 直接引用

**2. 扩散第三方佐证（对标 Claude 的成功路径）**
- Claude 在索源后能定位到内容 → 说明检索已通，缺的是"出镜率"
- 做法：在更多平台（Medium / LinkedIn / Hacker News / Indie Hackers / SEO 论坛）发布同一篇"实体密度实测"长文，互相链接回 geo010.com
- 目标：让"entity association density"查询时，geo010.com 出现在 ≥2 个独立域名的引用中

**3. 建外链（打破"无外部引用"）**
- 当前无任何外站链接（测试显示 AI 优先引有佐证的站）
- 最低成本：给 GEO 相关的 GitHub 项目、DuckDuckGo/AI 目录站提交收录；在 Reddit r/GenEngineOptimization 持续发帖
- 短期目标：≥5 个独立域名链接到 geo010.com

### P1 本月

**4. 知识图谱平台登记实体**
- 在 Bing Places / Google Business Profile（若适用）、GitHub Organization、LinkedIn Company 页登记 "GEO Encyclopedia" 实体，保持名称/描述一致
- 让 AI 的实体图谱里出现该品牌，而非"陌生域名"

**5. 强化站点级权威信号**
- 在 about.html 补"机构成立时间、编辑团队、内容审查流程"等 E-E-A-T 信号（Claude 说"niche site"源于缺少这些）
- 让独立站点公开标注引用 geo010.com（站点徽标互认）

**6. 建立"one-week"话题的差异化数据钩子**
- 该问题全平台都答"一周可抓取但引用需更久"——与你的实战数据（24h 被爬）形成对照
- 做法：把实战文章中的原始数据做成独立可下载的 dataset（CSV/JSON），让 AI 引用你的"一手数据"而非泛泛观点

### P2 持续

**7. 每周复测（用 06-ai-platform-test-suite.md）**
- 重点关注：实体密度题的 Claude 是否开始**主动**引用（不再需索源）
- 记录第 1/2/3 层命中率变化

**8. 与 stats.html 交叉验证**
- 检查 D1 日志：PerplexityBot 是否抓过实体密度页（当前日志中 Perplexity 访问量极低）
- 若 Perplexity 从未抓取 → 需手动提交 URL 或在站内加链接

## 四、验收标准（下一次测试）

| 指标 | 当前 | 目标（4 周后） |
|------|------|--------------|
| 主动引用（无需索源） | 0/12 | ≥2/12 |
| 实体密度题命中 | 1/4（仅索源后） | ≥2/4 |
| Perplexity 引用 | 0 | ≥1 |
| Grok 能找到实体密度定义 | 否 | 是 |

---

*记录说明：本文件与 `planResult/` 中的原始回答配套使用。执行 P0 后即可重跑 06 清单验证。*
