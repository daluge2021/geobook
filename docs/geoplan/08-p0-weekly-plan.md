# P0 本周行动详细计划（2026-08-14 起）

> 依据：`07-ai-visibility-diagnosis.md` 的 P0 三项行动。本周内完成，周五重跑 06 清单验收。

---

## 任务 1：抢占 "entity association density" 定义权 ✅ 已完成（08-14）

**已完成并上线**（commit `df674c4` 已推送 origin/main）：
- 实体密度页 `docs/metrics/entity-density.html` H1 后新增答案前置定义块（含 Yext 6.8M 研究、86% 数据）
- meta description / og / twitter description 改为直接定义句
- `docs/llms.txt` 条目描述改写为定义式
- 全站格式校验 0 FAIL，线上已验证（HTTP 200，新定义句已生效）

**收尾待办（约 1 小时）：**
- [ ] 重跑 06 清单中 "entity association density" 题，看 Grok 是否开始找到定义（重点观察项）
- [ ] 若仍无，下周在 Perplexity 手动提交该 URL

## 任务 2：扩散第三方佐证（对标 Claude 成功路径）

**目标：** 让 "entity association density" 查询时，geo010.com 出现在 ≥2 个独立域名引用中

**平台外链政策要点（2026-08 调研）：**
- **Medium**：外链一律 `nofollow`，不传 SEO 权重，价值在曝光与 AI 引用。严禁"主要是为给外部站导流"的内容 → 必须用 **Import 工具导入并设 canonical 指向原站**，否则 Medium 会抢原站权重；全文链接 ≤2 个。
- **Reddit**：允许自推但受 9:1/10% 规则约束，且 sub 版规优先 → 发布前先查 r/GenEngineOptimization 版规，正文披露 "I run GEO Encyclopedia"、内容自足（不点链接也值）。
- **LinkedIn**：外链无 nofollow 限制，政策最宽松，纯发布即可。
- **Indie Hackers**：产品推广友好社区，发实战帖带链接是常规操作。
- **Hacker News**：对推广帖最敏感，易被 flag/降权 → 标题突出数据钩子（如 one-week 抓取数）而非品牌名，正文不提推广。

| 步骤 | 动作 | 时长 |
|------|------|------|
| 2.1 | 把实体密度页核心内容改写成 1 篇 800 词英文短文（定义 + Yext 数据 + CRM/Salesforce 例子 + 3 条改进清单）→ 草稿在 `09-entity-density-draft.md` ✅ | 90 分钟 |
| 2.2 | **Medium 用 Import 工具发布 + 设 canonical 指向原站**（保护原站权重，只 1-2 个链接） | 30 分钟 |
| 2.3 | 发布精简版到 **LinkedIn 文章** | 20 分钟 |
| 2.4 | **Reddit r/GenEngineOptimization**：先查版规；披露 "I run GEO Encyclopedia"；正文自足 | 15 分钟 |
| 2.5 | 三篇都回链 `geo010.com/metrics/entity-density.html`，正文点名 "GEO Encyclopedia" | 随写作完成 |
| 2.6 | 发布后各平台间互链（Medium→LinkedIn→Reddit）形成三角佐证 | 15 分钟 |

## 任务 3：建外链（打破"零外部引用"）

**目标：** ≥5 个独立域名链接到 geo010.com

**关键发现（2026-08 调研）：** **DEV.to 与 Hashnode** 外链为 `dofollow`（Medium 是 nofollow），且 AI 引用率高——比 Medium 更适合"建外链"目标，优先列入本任务。

| 步骤 | 动作 | 时长 |
|------|------|------|
| 3.1 | **DEV.to 发布短文**（外链 dofollow、AI 引用率高，可用 canonical_url 字段指向原站） | 30 分钟 |
| 3.2 | **Hashnode 发布短文**（dofollow；优先用 "are you republishing?" 字段设置 canonical） | 30 分钟 |
| 3.3 | GitHub 上给 GEO 相关开源项目（llms.txt 规范、AI crawler 工具）提交文档/代码贡献，README 或 issue 中自然链接站点 | 2 小时 |
| 3.4 | 在 Indie Hackers、Hacker News 发布 one-week 实战经验帖（HN 用数据钩子标题、避免品牌化推广；Indie Hackers 直接发） | 45 分钟 |
| 3.5 | 向 DuckDuckGo 和几个 AI 工具目录站提交站点收录 | 30 分钟 |
| 3.6 | 在 about.html / contact.html 加"引用本站"说明（含引用格式示例，方便第三方引用） | 30 分钟 |

## 时间安排（本周）

| 天 | 任务 | 交付 |
|----|------|------|
| 周一 | 任务 2.1（写短文）✅ 草稿已就绪 | 800 词文章（`09-entity-density-draft.md`） |
| 周二 | 任务 2.2-2.6（Medium/Import+canonical、LinkedIn、Reddit 三平台发布+互链） | 3 个外链平台 |
| 周三 | 任务 3.1-3.4（DEV.to、Hashnode、GitHub、IndieHackers/HN） | 4-5 个新外链 |
| 周四 | 任务 3.5-3.6 + 复核 | 目录收录 + about 页引用说明 |
| 周五 | 重跑 06 清单 12 题 | 对比首周数据 |

## 验收（下周一）

- [ ] "entity association density" 题：Grok 能找到定义；Claude 主动引用
- [ ] geo010.com 外部引用域名 ≥5（优先 DEV.to / Hashnode / GitHub / IndieHackers / 目录站）
- [ ] 12 题主动引用 ≥2

---

*记录说明：本文件为内部执行计划（geoplan 随站发布但不进入导航，仅本地提交不推送）。*
