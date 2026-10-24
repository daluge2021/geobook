# 审计明细：How I Built a RAG Knowledge Base That Passed 100% of Its Own Eval — 6 Debugging Lessons

- 文件：docs/community/rag-knowledge-base-from-scratch.html
- 页面类型：文章（社区，工程实操复盘）
- 审计日期：2026-10-10
- 正文字数（近似）：1500（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：一个基于 SQLite + numpy 从零自建的 RAG 知识库通过自写 12 题评估（94.4%→98.6%→100%）；真正可迁移的是"关系库为真源、filter-before-fuse、评估先行"与六条调试经验，而非分数。
- 可被直接回答的 5 个用户问题：
  1. 问题：做 RAG 一定要向量数据库吗？ → 答案：不必；SQLite 存真值、numpy 存派生向量索引。【原文证据：FAQ "No. This build uses SQLite for the truth…and numpy for a derived vector index"】
  2. 问题：什么是 filter-before-fuse？ → 答案：在合并检索路径前先限定哪些数据可竞争。【原文证据："Filter before you fuse…If you filter after fusion, dead candidates occupy your top-5 slots"】
  3. 问题：为什么评估（eval）比模型更重要？ → 答案：每次改动双向影响质量，没有量化衡量就是抛硬币。【原文证据：FAQ "without a quantifiable measure, 'it seems better' is a coin flip"】
  4. 问题：100% 分数可靠吗？ → 答案：不可靠；12 道自写题、6 项检查、60-chunk 玩具语料、无真实用户。【原文证据："12 self-written questions with 6 checks each, on a 60-chunk toy corpus"】
  5. 问题：方法能迁移到新领域吗？ → 答案：引擎可迁移，阈值不可；换数据、归一化规则、prompt 三项即可复制到第二领域。【原文证据："The engine ports; the thresholds do not."】

## 2. 准确性测试
- 核心概念与术语理解：准确且专业。Reciprocal Rank Fusion（rank-only 融合）、BM25 与 dense 分数尺度不可比、bge-small-zh-v1.5 512 维、Qwen3-8B temperature 0.1、SQL 精确匹配优先等描述符合工程实际。
- 数字、日期、对象、条件引用：数据自洽——12 questions × 6 checks、94.4%→98.6%→100%、10 documents → 60 chunks、约 600 行 Python、authority 3/2/1、timeout 由 180s 降至 60s。
- 断章取义 / 过度推断 / 遗漏限制条件：有专门的局限章节（"Why Should You Read '100%' with a Grain of Salt?"），并全程声明 demo data only。局限披露充分，无过度推断。
- 前后矛盾 / 无法验证的事实：无内部矛盾；"Merged from two field reports shared on Reddit and LinkedIn" 但未给具体帖子链接，原始来源不可核验。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 100% 通过自建 eval | 轨迹 94.4%→98.6%→100% | 有（声称源于 Reddit/LinkedIn，无链接） | 待核实 | 部分 | 原始帖子、eval 题集 |
| filter-before-fuse 有效 | 设计说明 + 六教训 | 无 | 不可 | 部分（工程逻辑成立） | 对照实验 |
| 六条调试经验 | 教训表（bug/fix） | 无 | 不可 | 是（经验性、自洽） | 代码/日志 |
| 方法迁移到第二领域 | "reached 100% after fixes" | 无 | 待核实 | 部分 | 第二领域数据 |
| 600 行 / 60 chunks 等 | 正文数字 | 无 | 不可 | 部分 | 仓库链接 |

> 注意：自建 eval 与"Reddit/LinkedIn 来源"均无链接，无法复核。

## 4. 独特价值测试
- 原创数据或实测结果：有——自建 RAG 的评测轨迹与实现细节（自采工程数据）。
- 独立研究 / 案例：个人从零构建的工程案例（两个领域复制）。
- 独特方法 / 框架 / 分析：价值高——"关系库为真源 + filter-before-fuse + rank-only RRF + 统一 rank 消除顺序偏置 + query expansion 取 MAX 而非 SUM"等具体可迁移经验，六条 bug 修复（别名归一化、排序偏置、向量盲区、表格盲区、查询扩展、post-check 误报）具原创性。
- 通用行业知识的重新表述：部分（"eval 重要"属共识），但本页给出可操作细节。
- 无法确认原创性者标注：来源帖子、代码仓库 待核实。

## 5. 可提取性测试
1. 问题：没有向量数据库怎么搭 RAG？
   - AI 可提取的答案：SQLite 存真值、numpy 存派生向量、四条召回路径 + RRF。
   - 原文证据："How Does Retrieval Work Without a Vector DB?"。
   - 缺失信息：代码实现。
   - 是否需结合其他页面：否。
2. 问题：RAG 检索里最常见的坑是什么？
   - AI 可提取的答案：六条（别名归一化、SQL 顺序偏置、向量盲区、表格盲区、查询扩展、post-check 误报）。
   - 原文证据：六教训表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：为什么先做 eval 再调优？
   - AI 可提取的答案：改动双向影响，无量化即抛硬币。
   - 原文证据："Why Should You Evaluate Before You Tune?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
4. 问题：如何避免模型串号（跨模型数字泄漏）？
   - AI 可提取的答案：per-model 隔离 + 过滤前置 + eval 第 3 项检查。
   - 原文证据："Model isolation…did another model's numbers leak into the answer?"。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
5. 问题：这套方法通用吗？
   - AI 可提取的答案：引擎通用、阈值不通用，已在第二领域验证。
   - 原文证据："How Much of the Method Transfers to a New Domain?"。
   - 缺失信息：第二领域证据。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 27 | 技术准确、数字自洽、局限披露充分 |
| 证据可追溯性 | 25 | 17 | 第一方工程数据、方法透明；来源帖子无链接、无代码仓库、不可外部核验 |
| 独特价值 | 25 | 22 | 原创工程经验与可迁移方法，六条调试经验具独创性 |
| 可提取性 | 10 | 10 | 问题式 H2、答案前置、表格、FAQ、"In Short" |
| 时效性与适用边界 | 10 | 9 | 有日期、demo data 与 toy corpus 边界披露充分 |
| **总分** | **100** | **85** | |

### 最值得优先修改的 5 个具体位置
1. "Merged from two field reports shared on Reddit and LinkedIn"：补充原始帖子链接或截图，使来源可核验。
2. 局限章节之外，建议附代码仓库链接（geo_build/geo_query/geo_eval 三文件），让"600 行"与六条修复可复现。
3. 六教训表中第 2、3 条均以"统一 rank(1)"为解，建议合并说明并给出一次对照数据（另加排序 vs 不加）。
4. "How Much of the Method Transfers to a New Domain?" 段：给出第二领域的具体名称与 eval 过程，否则"迁移成功"属待核实断言。
5. FAQ "Is a 100% score reliable?" 与 "Why Should You Read '100%'…" 内容重复，建议合并以精简并避免重复提取。
