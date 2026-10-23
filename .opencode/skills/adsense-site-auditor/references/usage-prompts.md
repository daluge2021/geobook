# AdSense Site Auditor 使用提示词

本文件用于用户询问如何调用本 Skill，或需要现成的审计 prompt 模板时参考。

## 调用方式

opencode 中直接说明意图即可触发，例如：

```text
做一个 AdSense 站点审计：https://geo010.com，阶段是已投放合规检查。
```

也可以显式要求加载 Skill：

```text
加载 adsense-site-auditor Skill，审计本项目。
```

## 提示词原则

- 必须给出目标：线上 URL、本地仓库路径，或两者
- 说明阶段：申请前 / 拒审后 / 已投放合规 / 修复后复审
- 要求输出全量清单，而不是摘要
- 要求每个 `ADS-*` ID 标记 `Pass` / `Fail` / `Unknown` / `N/A`
- 每个 `Fail` 与 `Unknown` 都要有证据和具体修复动作

## 全站审计（申请前）

```text
加载 adsense-site-auditor Skill，完整审计这个网站是否适合申请 Google AdSense：

URL: https://example.com
阶段：申请前

要求：
1. 逐项检查所有 ADS-* 要求 ID。
2. 每项标记 Pass / Fail / Unknown / N/A。
3. 不允许只给摘要，不允许省略看起来不相关的项目。
4. 输出 Blocker / High / Medium 风险，并给每项的证据和修复建议。
5. 最后做 Completeness Check，确认覆盖全部 73 个 ID。
```

## 仅线上页面审计

```text
加载 adsense-site-auditor Skill，只基于线上可访问页面审计这个站的 AdSense 准备度：

URL: https://example.com

请抓取首页、robots.txt、sitemap、ads.txt、隐私政策、About/Contact、分类页和代表性内容页。
如果某项必须依赖 AdSense 后台、服务器配置或站长确认，请标为 Unknown，并说明需要什么证据。
```

## 仓库 + 线上联合审计

```text
加载 adsense-site-auditor Skill，结合本地仓库和线上站点审计 AdSense 合规情况：

线上 URL: https://example.com
本地仓库: /absolute/path/to/repo
阶段：已投放合规

请同时检查：
- 渲染后的页面与抓取可访问性（含 CSP 是否放行 AdSense/GA 脚本与 iframe）
- 模板/路由/内容来源、广告脚本覆盖是否一致
- robots.txt、sitemap、canonical、ads.txt、隐私政策及其可达性
- 是否存在低价值、复制、聚合、广告/联盟内容过多的问题
- 隐私政策是否与实际数据收集代码一致（统计、评论、聊天、表单）
- 是否满足全部 ADS-* 检查项
```

## 拒审诊断

```text
加载 adsense-site-auditor Skill，这个站 AdSense 申请被拒了，请按官方要求做拒审原因诊断：

URL: https://example.com
拒审信息：粘贴 AdSense 后台显示的原文

请把拒审信息映射到 ADS-* 要求 ID，逐项检查全部要求，并给出优先级修复清单。
```

## 修复后复审

```text
加载 adsense-site-auditor Skill，我已经按上次建议修复了网站，请复审是否可以重新提交 AdSense：

URL: https://example.com
已修复内容：
- ...
- ...

请重新逐项检查全部 ADS-* 要求 ID，不要只检查已修复项。输出 Ready / Ready after fixes / Not ready。
```

## 修复任务清单

```text
加载 adsense-site-auditor Skill，请把这个网站的 AdSense 问题转成可执行修复任务：

URL: https://example.com

输出格式：
1. Blocker 任务
2. High 任务
3. Medium 任务
4. 每个任务包含：涉及 ADS-* ID、文件/页面、修复动作、验收标准
5. 最后附完整逐项检查表
```

## 最短提示词

```text
加载 adsense-site-auditor Skill，审计 https://example.com 的 AdSense 合规性。必须逐项覆盖所有 ADS-* 检查项，并输出完整 Pass/Fail/Unknown/N/A 表。
```
