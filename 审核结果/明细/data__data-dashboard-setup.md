# 审计明细：GEO Data Dashboard Setup — Your GEO "Cockpit"

- 文件：docs/data/data-dashboard-setup.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1,600

## 1. 核心答案提取
- 核心结论（≤100 字）：GEO 仪表盘按"概览层（高管 4-6 指标）— 主题层（执行团队按话题看推荐率/引用份额/优先级）— 明细层（内容与技术团队的可执行建议）"三层设计，配红黄绿阈值、更新频率与工具选型（表格 → BI → 自建）。
- 可被直接回答的 5 个用户问题：
  1. 问题：GEO 仪表盘应该分几层？ → 答案：三层——Overview（给老板的 4-6 个核心指标）、Topic（按主题的深度分析，给执行团队）、Detail（可执行的优化建议，给内容/技术团队）。【原文证据：Section II "Three-Layer Design" 各 h3】
  2. 问题：概览层放哪些指标？ → 答案：Brand AI Referral Rate、Citation Share、Brand Description Accuracy、AI Sentiment、Estimated Monthly GEO Value，每项显示当前值、环比趋势、状态灯。【原文证据：Layer 1 表格 + Design Points 三条】
  3. 问题：描述准确率的红黄绿阈值怎么设？ → 答案：绿 ≥85%，黄 70-85%，红 <70%。【原文证据：Section V "Description Accuracy" 列表】
  4. 问题：推荐率的红黄绿阈值怎么设？ → 答案：按月目标完成度——绿 ≥80%，黄 50-80%，红 <50%。【原文证据：Section V "Referral Rate" 列表】
  5. 问题：用什么工具搭 GEO 仪表盘？ → 答案：小团队用 Excel/Google Sheets；中等数据量用 Google Data Studio / Tableau Public / Power BI；有数据团队的企业用 Metabase / Superset / 内部系统集成。【原文证据：Section IV 三个 Option】
  （更新频率表与"仪表盘生命周期"三阶段在 Section VI 有直接对应内容。）

## 2. 准确性测试
- 核心概念与术语理解：Outcome/Asset/Process 指标命名与 core-metrics-system.html 一致，跨页术语无冲突；"仪表盘三层按受众切分"属通用 BI 实践，表述无概念错误。
- 数字、日期、对象、条件引用：**头部日期冲突**——JSON-LD dateModified 为 2026-08-16，页面 article-meta 显示 "Updated: 2026-07-28"，同页两个"最后更新"不一致。示例数字算术自洽（6 个月投资 ¥35,000×6=¥210,000；缺口 114,000/210,000≈54.3% ✓）；但这些演示数值（12%、88%、¥22,000、-54.3%、Month 14 回本）**全文未标注为虚构示例**，且"第 14 月回本"依赖未给出的增长假设，无法从文中推导。
- 断章取义 / 过度推断 / 遗漏限制条件："Google Data Studio" 已于 2022 年更名 Looker Studio，沿用旧名属过时；工具免费/足够使用的断言（如 "Tableau Public free version is sufficient"）无依据；阈值建议（绿 ≥80% 目标等）以确定口吻给出，实为经验值。
- 前后矛盾 / 无法验证的事实：article-meta 行声明 "**All data is linked to verifiable sources**"，但正文**没有任何外部来源链接**，全部数字为演示值——这是把示例包装成"可验证数据"的元信息失实，是本页最严重的可信度问题。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 仪表盘应做三层（Overview/Topic/Detail） | Section II 三层表格 | 无 | 不可 | 部分（属设计主张，通用 BI 常识） | 与单层仪表盘的效果对比 |
| 概览指标 12%/10%/88%/¥22,000 | Layer 1 表 | 无（声明"链接可验证来源"但无链接） | 不可 | 否（演示值被呈现为真实读数） | 明确标注 "sample/demo data" |
| 红黄绿阈值（≥85%、≥80% 目标等） | Section V | 无 | 不可 | 否（经验值无依据） | 行业分布数据 |
| 每周/每月更新频率建议 | Section VI 表 | 无 | 不可 | 部分（合理但无依据） | — |
| 六月累计 ROI -54.3%、第 14 月回本 | Module 3 ASCII 表 | 无 | 待核实 | 部分（算术自洽，回本依赖未披露假设） | 月度价值增长曲线 |
| 工具免费版足够（Tableau Public 等） | Section IV | 无 | 待核实 | 否 | 功能限制说明 |

> 注：正文没有任何外链，"All data is linked to verifiable sources" 属未经证实的来源声称。

## 4. 独特价值测试
- 原创数据或实测结果：无（所有数字均为虚构演示值）。
- 独立研究 / 案例：无真实案例；开头的"向老板汇报"场景为情景化写作，非案例。
- 独特方法 / 框架 / 分析：三层仪表盘设计 + 按受众分层的更新节奏（高管月度/团队周会/个人日查）+ 红黄绿阈值模板，属结构化整理；在 GEO 语境下做了一次通用 BI 骨架的映射。原创性标注：待核实（三层仪表盘是通用方法论）。
- 通用行业知识的重新表述：Google Sheets、条件格式、BI 工具选型、Metabase/Superset 开源等均为通用工具常识复述；"没有仪表盘像无仪表飞行"为比喻性收尾。

## 5. 可提取性测试
1. 问题：GEO 仪表盘应该包含哪些指标？
   - AI 可提取的答案：概览层 4-6 个（推荐率、引用份额、描述准确率、AI 情感、月度估值）；另含覆盖类（语义覆盖、结构化完整度、多平台数、来源权威分）与价值类（投入、价值、ROI、回本月）。
   - 原文证据：Layer 1 表 + Module 1/2/3。
   - 缺失信息：各指标从哪个工具取数。
   - 是否需结合其他页面：是（指标定义在 data/core-metrics-system）。
2. 问题：描述准确率低于多少要报警？
   - AI 可提取的答案：<70% 红，70-85% 黄，≥85% 绿。
   - 原文证据：Section V。
   - 缺失信息：阈值依据。
   - 是否需结合其他页面：否。
3. 问题：GEO 仪表盘多久更新一次？
   - AI 可提取的答案：Outcome 与 Process 指标每周，Asset 与 Value 指标每月。
   - 原文证据：Section VI "Update Frequency" 表。
   - 缺失信息：数据抓取的具体实现（API 还是人工）。
   - 是否需结合其他页面：否。
4. 问题：小团队用什么工具做 GEO 仪表盘？
   - AI 可提取的答案：Excel/Google Sheets——按月建工作表、手工录入、条件格式做红黄绿灯。
   - 原文证据：Section IV Option 1（含 4 步 setup）。
   - 缺失信息：Google Data Studio 已更名 Looker Studio（文中未更新）。
   - 是否需结合其他页面：否。
5. 问题：仪表盘上线后怎么分阶段用？
   - AI 可提取的答案：前 3 个月看基线与趋势、3-6 个月看目标达成、6 个月以上看 ROI 与效率。
   - 原文证据：Section VI "Dashboard Lifecycle"。
   - 缺失信息：无（该点完整）。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 21 | 同页两处最后更新日期冲突（2026-08-16 vs 2026-07-28）；"Google Data Studio" 为过时名称；演示数值未标示例，易被当作真实案例读取 |
| 证据可追溯性 | 25 | 13 | meta 声称"所有数据链接可验证来源"但全文零外链、零来源；阈值与频率建议均无依据即以确定口吻给出 |
| 独特价值 | 25 | 15 | 三层设计+阈值模板为结构化整理（原创性待核实），无原创实测数据；工具选型为通用常识复述 |
| 可提取性 | 10 | 8 | 分层结构与表格清晰、可独立回答"仪表盘放什么/阈值/频率"，但无 FAQ、标题（H1）非问题式、ASCII 模块图渲染易碎 |
| 时效性与适用边界 | 10 | 6 | 有更新日期但自相矛盾；有团队规模分档（一定的适用边界），却无"示例数据说明"与阈值适用条件 |
| **总分** | **100** | **63** | |

### 最值得优先修改的 5 个具体位置
1. article-meta 行："All data is linked to verifiable sources" 与正文零外链矛盾——删除该声明，或改为 "All figures are illustrative examples"。
2. 头部日期：统一 JSON-LD dateModified（2026-08-16）与页面 "Updated: 2026-07-28" 为同一日期。
3. Layer 1/2 表与 Module 1-3 ASCII 表：在表头或表注明确标注 "demo data (illustrative)"，避免 12%/¥22,000/-54.3% 被当作真实案例引用。
4. Section IV Option 2："Google Data Studio" 改为 "Looker Studio (formerly Google Data Studio)"。
5. Section V 阈值列表前加一句适用条件：说明阈值为经验起点、需按品类基线与月目标校准，并链接到 geo-benchmarks 的自建基线方法。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
