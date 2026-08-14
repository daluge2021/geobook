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

| 步骤 | 动作 | 时长 |
|------|------|------|
| 2.1 | 把实体密度页核心内容改写成 1 篇 800 词英文短文（定义 + Yext 数据 + CRM/Salesforce 例子 + 3 条改进清单） | 90 分钟 |
| 2.2 | 发布到 **Medium**（最重要，Google 权重高、AI 常引） | 30 分钟 |
| 2.3 | 发布精简版到 **LinkedIn 文章** | 20 分钟 |
| 2.4 | 发布到 **Reddit r/GenEngineOptimization**（已有账号验证过可用） | 15 分钟 |
| 2.5 | 三篇都回链 `geo010.com/metrics/entity-density.html`，正文点名 "GEO Encyclopedia" | 随写作完成 |
| 2.6 | 发布后各平台间互链（Medium→LinkedIn→Reddit）形成三角佐证 | 15 分钟 |

## 任务 3：建外链（打破"零外部引用"）

**目标：** ≥5 个独立域名链接到 geo010.com

| 步骤 | 动作 | 时长 |
|------|------|------|
| 3.1 | GitHub 上给 GEO 相关开源项目（llms.txt 规范、AI crawler 工具）提交文档/代码贡献，README 或 issue 中自然链接站点 | 2 小时 |
| 3.2 | 在 Indie Hackers、Hacker News 发布 one-week 实战经验帖（含原文链接） | 45 分钟 |
| 3.3 | 向 DuckDuckGo 和几个 AI 工具目录站提交站点收录 | 30 分钟 |
| 3.4 | 在 about.html / contact.html 加"引用本站"说明（含引用格式示例，方便第三方引用） | 30 分钟 |

## 时间安排（本周）

| 天 | 任务 | 交付 |
|----|------|------|
| 周一 | 任务 2.1（写短文） | 800 词文章 |
| 周二 | 任务 2.2-2.6（三平台发布+互链） | 3 个外链平台 |
| 周三 | 任务 3.1-3.3（GitHub/IndieHackers/HN/目录） | 4-5 个新外链 |
| 周四 | 任务 3.4 + 复核 | about 页引用说明 |
| 周五 | 重跑 06 清单 12 题 | 对比首周数据 |

## 验收（下周一）

- [ ] "entity association density" 题：Grok 能找到定义；Claude 主动引用
- [ ] geo010.com 外部引用域名 ≥5
- [ ] 12 题主动引用 ≥2

---

*记录说明：本文件为内部执行计划（geoplan 随站发布但不进入导航，仅本地提交不推送）。*
