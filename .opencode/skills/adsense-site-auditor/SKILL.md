---
name: adsense-site-auditor
description: Google AdSense 站点审计（申请前 / 拒审诊断 / 已投放合规）。用于检查站点是否满足 AdSense 资格、站点所有权、内容质量、导航 UX、爬虫可访问性、ads.txt、隐私政策、Google Publisher Policies 与 Restrictions，并逐项输出 Pass/Fail/Unknown/N/A。触发词：AdSense、adsense 检查、广告审核、站点审计、申请 AdSense、拒审、ads.txt、广告合规、ad readiness、publisher policy。
---

# AdSense 站点审计 Skill

本 Skill 把 Google AdSense Help、AdSense Program policies、Google Publisher Policies 与 Restrictions 转成可执行的站点审计流程。适用于 geo010.com，也适用于任意站点。

## 1. 何时使用

- 准备申请 Google AdSense，判断站点是否够格
- AdSense 申请被拒，需要把拒审原因映射到具体检查项
- 站点已在投放广告，需要做合规与广告展示排查（CSP、无效流量、内容风险）

## 2. 核心规则

1. **官方文档为准**：Google 文档更新即覆盖本 Skill；有网络时先核对参考文件中的来源 URL。
2. **逐项覆盖**：必须评估 `references/adsense-requirements.md` 中的**全部 73 个 ADS-\* ID**，不得抽样或只查可疑项。
3. **四态判定**：每项只标记 `Pass`、`Fail`、`Unknown`、`N/A`。`N/A` 必须说明不适用的站点条件。
4. **无证据不判 Pass**：`Pass` 必须附带证据（文件路径/行号、线上响应头、抓取结果）。
5. **不保证过审**：最终结论只是准备度判断，不是 Google 的审核结果。

## 3. 必读文件

- `references/adsense-requirements.md` — 73 项完整清单、严重级别、官方来源、输出模板
- `references/usage-prompts.md` — 可直接复用的审计 prompt

## 4. 审计流程

1. **确认阶段与目标**
   - 目标：线上 URL、仓库路径，或两者
   - 阶段：申请前 / 拒审后 / 已投放清理
   - 站点类型：内容站、CMS/博客、目录站、电商、工具站、UGC、视频站、登录后产品

2. **收集证据**
   - 线上：首页、代表性文章页、`robots.txt`、`sitemap.xml`、`ads.txt`、隐私政策页、About/Contact、分类页；检查状态码、重定向、CSP/安全头
   - 仓库：模板、路由、内容源、页脚/导航、统计与广告脚本、数据收集代码
   - 本项目线上验证注意：本机 hosts 把 `geo010.com` 指向 `127.0.0.1`，必须用
     `curl -sk --resolve geo010.com:443:104.21.40.133 https://geo010.com/...` 验证真实线上

3. **重点核查（已投放广告的站点）**
   - **CSP 是否放行广告与统计脚本**：`worker/index.js` 的自定义 `Content-Security-Policy` 若未包含 `pagead2.googlesyndication.com`、`googletagmanager.com` 及广告 iframe 域名，浏览器会直接阻止 AdSense/GA，表现为后台无展示、控制台 CSP 报错。同时检查 `frame-src`（`default-src 'none'` 会默认拦截广告 iframe）
   - **广告脚本覆盖一致性**：统计含 `adsbygoogle.js` 的页面数，与全部 HTML 页数对比，找出漏装页
   - **ads.txt**：Google 授权行存在、publisher ID 与页面 `client=ca-pub-*` 一致、线上返回 `text/plain` 且 200
   - **隐私政策可达性**：是否全站可点达（页脚/导航），而不只是少数页面正文提及
   - **披露完整性**：AdSense cookie、GA4（`_ga`）、第三方统计（51.la）、评论/聊天等表单收集的姓名/邮箱/IP 是否都写入隐私政策；政策与实际代码不符即按误导性陈述处理
   - **UGC 与用户输入**：评论是否审核、聊天查询是否入库、是否涉及 PII
   - **地域同意**：EEA/UK 流量是否配置 Google 认证 CMP（EU user consent policy）
   - **索引一致性**：`noindex` 页是否仍提交 sitemap；工具页/极薄页面是否应排除

4. **分级**
   - `Blocker`：硬性政策违规、所有权/抓取失败、无原创内容、严重欺骗性 UX、禁止内容
   - `High`：很可能审核失败或广告受限（如广告脚本被 CSP 拦截、隐私披露缺失、无 CMP）
   - `Medium`：质量、信任、UX、披露或证据缺口
   - `Unknown`：需要 AdSense 后台、账号、服务器或站长确认
   - `N/A`：明确不适用，并说明原因

5. **输出报告**
   - 总结论：`Ready` / `Ready after fixes` / `Not ready`
   - 先列问题（按严重级别排序），每条含：ADS ID、问题、证据、官方依据、具体修复
   - 最后附**完整逐项表**（每个 ID 恰好一行）：ID / Status / Evidence / Next action

## 5. Completeness Gate

结束前统计 `references/adsense-requirements.md` 中的 ID 数量（当前 73），与报告表格中的 ID 数量比对；缺失任何一个 ID 视为审计未完成，补齐后才能给最终结论。

## 6. 报告模板

```markdown
**Decision**
Not ready / Ready after fixes / Ready

**Blockers**
- `ADS-XXX-01`: 问题。证据。修复。

**High Risks**
- `ADS-XXX-02`: 问题。证据。修复。

**Medium Risks**
- `ADS-XXX-03`: 问题。证据。修复。

**Exhaustive Checklist**

| ID | Status | Evidence | Next action |
| --- | --- | --- | --- |
| ADS-ELIG-01 | Pass/Fail/Unknown/N/A | ... | ... |

**Completeness Check**
- Requirement IDs in reference: 73
- Requirement IDs in report: <count>
- Missing IDs: none
```
