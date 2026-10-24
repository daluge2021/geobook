# 审计明细：SHEEP Framework — A Five-Step Methodology for GEO Implementation

- 文件：docs/metrics/sheep-framework.html
- 页面类型：文章（II. Metrics 栏目）
- 审计日期：2026-10-10
- 正文字数（近似）：1,794 词（英文，含表格）
- 页面日期（JSON-LD）：datePublished 2026-01-15 / dateModified 2026-08-16

## 1. 核心答案提取

- 核心结论（≤100 字）：SHEEP 是五步 GEO 实施顺序——S 语义覆盖让 AI 看见你、H 人类信任信号让 AI 信任你、E 证据结构让 AI 读懂你、E 生态整合让 AI 记住你、P 效果监控让优化可衡量；价值不在维度而在不可跳步的先后顺序，配 10 周落地时间线。

- 可被直接回答的 5 个用户问题：
  1. 问题：SHEEP 框架是什么？ → 答案：五步 GEO 实施方法论——Semantic Coverage、Human Trust Signals、Evidence Structuring、Ecosystem Integration、Performance Monitoring，按 S→H→E→E→P 递进。【原文证据：第 I 节五行表格 + FAQ 第一问】
  2. 问题：SHEEP 的第一步是什么、怎么做？ → 答案：S=语义覆盖——围绕核心业务列出 50-100 个子话题（脑暴/ChatGPT/AnswerThePublic），逐条审计"我有没有内容覆盖"，按"搜索量 × 业务价值"排序补缺；目标是核心主题语义覆盖 ≥70%、每个子话题至少 1 篇答案前置的"答案资产化"内容。【原文证据：第 II 节 Step 1-3 + Target Completion Level】
  3. 问题：为什么这几个步骤不能调换顺序？ → 答案：五步是递进关系——没有 S，H 无处附着；没有 H，E 建在沙上；没有 E，E（生态）不够"AI 友好"；前四步不牢，P 的数据给不出优化方向，如同盖房不能先软装。【原文证据："Note the order of these five steps — they can't be skipped or rearranged." + 盖房比喻】
  4. 问题：证据结构化（E）有哪五个具体技巧？ → 答案：① 关键数据用独立成行的列表而非埋进段落 ② 对比用表格而非文字 ③ 引用来源用 blockquote ④ 关键实体/数据加粗 ⑤ FAQ 页加 FAQ Schema，让 AI 直接抽取问答对。【原文证据："Five Specific Structuring Techniques" 五小节】
  5. 问题：按 SHEEP 完整落地要多久？ → 答案：10 周——第 1-2 周 S、3-4 周 H、5-6 周 E（证据结构）、7-8 周 E（生态）、9-10 周 P（监控）。【原文证据：第 VII 节 "Complete SHEEP Implementation Timeline" 五段周次清单】

（额外可答）P 步跟踪哪三个指标？ → Citation share（被引用占比）、AI visibility index（品牌提及综合分）、description accuracy（AI 对你的描述是否正确）；工具免费档 Bing Webmaster Tools + 手工，付费档 Profound、SEMrush GEO、AthenaHQ。

## 2. 准确性测试

- 核心概念与术语理解：大体准确。五维度（内容覆盖、信任信号、结构化、外部生态、监控）本身是公认 GEO/SEO 要素，"先内容后信任再结构再外链再监控"的顺序符合一般实施逻辑；"GEO 于 2023 年首次提出"与 GEO 论文时间相符。
- 数字、日期、对象、条件引用：**需修正多处无据断言**——① "Baidu Baike 与 Wikipedia 是 AI 最常引用的来源之一"；② "知乎内容在中国 AI 搜索中被高频引用，因其 Q&A 格式天然适配 RAG"；③ "AI particularly loves citing table data""list 格式提取准确率显著更高""blockquote 被识别为第三方引用""加粗内容会被 AI 视为重要"——四条关于引擎行为的断言全部无来源；④ 目标数字（覆盖 ≥70%、50-100 子话题、3 个客户案例、≥3 家行业媒体）以 "Target Completion Level" 口吻给出，未标注为建议值或示例。
- 断章取义 / 过度推断 / 遗漏限制条件：① 自我标榜 "It's currently the GEO industry's **most practical** five-step implementation methodology"——无比较依据的自我排名；② "**they can't be skipped or rearranged**" 过度绝对（小团队并行推进 S 与 H 并不违规）；③ 全篇未说明适用边界（企业规模、行业、预算差异），把 10 周时间线写成通用排期。
- 前后矛盾 / 无法验证的事实：**明确矛盾**——页头 article-meta 声称 "All data is linked to verifiable sources"，但正文全部外部数据只有 1 处 Yext 外链，其余数字与引擎行为断言零出处。其余内部无自相矛盾（FAQ 与正文口径一致）。

## 3. 证据质量测试

| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| SHEEP 五步顺序不可跳过/调换 | 第 I 节 | 无 | 不可 | 否（规范性主张，无对比数据） | 并行/乱序实施的失败案例或 A/B 比较 |
| 86% 的 AI 引用来自品牌可管理来源 | Technique 3 引例 | 有（yext.com 报告外链） | 可 | 部分（数字可核，与"blockquote 被当第三方引用"的论点不直接相关） | 该数据与结构化格式对引用率影响的关联证据 |
| 列表/表格/加粗/ blockquote 提升 AI 抽取与引用 | 第 IV 节五技巧 | 无 | 不可 | 部分（方向合理但无实测） | 各格式的抽取准确率对比实验 |
| 百科条目、知乎是 AI 高频引用来源 | 第 V 节 | 无 | 待核实 | 部分 | 中文 AI 搜索来源构成统计 |
| 目标值：覆盖 ≥70%、50-100 子话题、10 周排期 | 各步 Target + 时间线 | 无 | 不可 | 部分（建议值未标示） | 说明是建议基准还是实测得出 |
| SHEEP 是行业最实用五步法 | 第 I 节 | 无 | 不可 | 否（自评） | 竞品方法论对比表 |

> 注：article-meta 的 "All data is linked to verifiable sources" 与实际正文不符，属可核查的证据声明失实，本页证据分因此明显低于同栏目其他页。

## 4. 独特价值测试

- 原创数据或实测结果：无（唯一外部数字来自 Yext 报告，且作为引用格式示例使用）。
- 独立研究 / 案例：无。全文无案例、无实测、无访谈；只有虚构示例（22% 转化提升、部署 2 天 / ¥3,000 的对比表）且未标注为示例。
- 独特方法 / 框架 / 分析：SHEEP 五字母缩写、五步先后顺序、10 周时间线、每步 Target Completion Level 属本站独有编排——是本页核心资产；但文章自己也承认 "you've probably heard of every dimension"。
- 通用行业知识的重新表述：作者署名与 Person Schema、About/Contact 页、客户案例、认证、百科条目、行业媒体、知乎/Quora 回答、月度监测——全部是 GEO/SEO 通用清单的重新表述，未提供新的机制解释或数据。
- 无法确认原创性者标注：SHEEP 框架的最早出处与是否已被第三方采用 → 待核实（无站外引用佐证）；各 Target 数值的经验来源 → 待核实。

## 5. 可提取性测试

1. 问题：SHEEP 每个字母代表什么？
   - AI 可提取的答案：S=Semantic Coverage、H=Human Trust Signals、E=Evidence Structuring、E=Ecosystem Integration、P=Performance Monitoring，分别对应让 AI 看见/信任/读懂/记住/可衡量。
   - 原文证据：第 I 节四列表格（Step/Letter/Meaning/In One Sentence）。
   - 缺失信息：无（本问题单页可完整回答）。
   - 是否需结合其他页面：否。

2. 问题：GEO 实施应该先做内容还是先做外链？
   - AI 可提取的答案：按 SHEEP 先 S（语义覆盖/内容）再 H（信任信号）再 E（证据结构）再 E（生态/外链）最后 P（监控），因为每步是下一步的地基。
   - 原文证据：第 I 节递进说明 + 盖房比喻。
   - 缺失信息：无反例讨论（为何不能并行）。
   - 是否需结合其他页面：否（但要评估该顺序主张需外部证据）。

3. 问题：怎么把已有文章改得更容易被 AI 引用？
   - AI 可提取的答案：五个技巧——关键数据独立成行列表、对比改表格、引用来源用 blockquote、关键实体加粗、FAQ 页加 FAQ Schema；自检标准是"AI 能否在半秒内找到最可引用的那句"。
   - 原文证据：第 IV 节 Technique 1-5 + "half a second" 测试句。
   - 缺失信息：各技巧的效果量化（无数据支撑）。
   - 是否需结合其他页面：否。

4. 问题：GEO 多久能看到效果 / 怎么监控？
   - AI 可提取的答案：第 9-10 周建立基线并启动月度复测，跟踪 citation share、AI visibility index、description accuracy 三项；免费用 Bing Webmaster Tools 与手工测试，付费用 Profound/SEMrush GEO/AthenaHQ。
   - 原文证据：第 VI 节 4 小节 + 时间线 "Weeks 9-10: P"。
   - 缺失信息：预期见效周期与各行业差异（未说明 10 周是否足以见效）。
   - 是否需结合其他页面：是（指标定义需 metrics/citation-share.html，工具详情需 technical/geo-monitoring-tools.html）。

5. 问题：新站做 GEO 的 10 周计划是什么？
   - AI 可提取的答案：1-2 周话题聚类与内容审计；3-4 周补 About/作者/认证/案例；5-6 周给核心内容加表格列表 blockquote 与 FAQ Schema；7-8 周提交百科、发 1-2 篇行业媒体、开始答知乎/Quora；9-10 周建基线并月度监控。
   - 原文证据：第 VII 节五段周次清单。
   - 缺失信息：适用企业规模与预算假设；每步的人力/成本估计。
   - 是否需结合其他页面：是（各步细节分散在 fundamentals/content/technical 栏目）。

## 6. 最终评分

| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 20 | 框架自洽、GEO 2023 年提出准确、FAQ 与正文一致；扣分于"行业最实用"自评、"不可跳步"绝对化、四条引擎行为断言与百科/知乎高频引用无据、article-meta "All data is linked to verifiable sources" 与正文不符 |
| 证据可追溯性 | 25 | 13 | 全文仅 1 条外链（Yext），其余数字与引擎行为断言零出处，且页面自带的证据声明失实——落入"大量无来源"档 |
| 独特价值 | 25 | 19 | SHEEP 缩写、五步顺序、10 周时间线、每步验收标准为本站独有编排；但五个维度内容是通用常识重组，无自有数据验证 |
| 可提取性 | 10 | 9 | 表格总览、每步 What/How/Target 三段式、时间线、FAQ schema 齐备，是全站最易被整段抽取的结构之一 |
| 时效性与适用边界 | 10 | 6 | 有 Updated 2026-08-16；但缺适用边界（企业规模/行业/预算），目标值未标"建议值"，10 周排期被写成通用解 |
| **总分** | **100** | **67** | |

### 最值得优先修改的 5 个具体位置
1. 页头 article-meta "All data is linked to verifiable sources"：正文实际只有 Yext 一条外链，该声明失实——要么补足所有数据的来源链接，要么改为 "Framework overview; external figures link to sources where used"。
2. 第 I 节 "It's currently the GEO industry's most practical five-step implementation methodology"：删除或改为 "a practical five-step methodology"——无比较依据的自我排名，也是最容易被 AI 原样复述的夸大句。
3. 第 I 节 "they can't be skipped or rearranged"：改为"建议按序推进，资源充足时 S 与 H 可并行"，避免把经验建议写成硬规则。
4. 第 IV 节四条格式断言（列表提取准确率显著更高 / AI 爱引表格 / blockquote 被识别为第三方引用 / 加粗被视作重要）：逐条补研究链接（如 Princeton GEO 论文的 statistics/citation 类提升），否则降级为"实践建议"。
5. 各步 Target Completion Level（≥70%、50-100 子话题、3 个案例、≥3 家媒体）与第 VII 节 10 周时间线：加一行 "illustrative targets for a mid-size site; adjust to resources"，与站内其他页面的示例披露口径统一。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
