# 审计明细：GEO for Healthcare — The "Three Highs" Battlefield: High Authority, High Compliance, High Trust

- 文件：docs/industry/healthcare-geo.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1100
- 头部日期核对：JSON-LD `dateModified` 2026-08-16，正文元信息 `Updated: 2026-07-28`，**两者不一致**。

## 1. 核心答案提取
- 核心结论（≤100 字）：医疗 GEO 的核心不是优化技巧，而是让 AI 对你的权威性无可置疑——资质可核验、数据有文献支撑、时效有标注，且必须"合规优先、优化其次"。
- 可被直接回答的 5 个用户问题：
  1. 问题：AI 处理医疗问题时有什么特殊之处？ → 答案：三条——严格来源筛选（优先政府卫生机构 CDC/WHO/NHC、权威医院医学院、专业期刊、药品说明书、医学百科）、非权威来源会附加"请咨询医生"式免责声明、时效要求极高。【原文证据：Section I "AI's Special Handling of Medical Information" 有序列表】
  2. 问题：医疗机构 GEO 三大策略是什么？ → 答案：①资质显性化（执业许可证放首页与 About、每篇医疗内容标注审核/撰写医生姓名职称执业机构并加 Schema、产品页展示注册证号，并在 Organization Schema 加 `hasCredential`）；②学术引用背书（发临床研究、参与指南制定、站内引用权威期刊）；③建设结构化医学知识库（疾病科普/药品/诊疗路径/预防，用 MedicalCondition、Drug、Treatment 等 Schema 并标注来源与更新日期）。【原文证据：Section II Strategy 1-3】
  3. 问题：医疗内容的红线和写作原则是什么？ → 答案：禁止未经批准宣称疗效、编造医学数据、攻击其他疗法、使用"根治/100%/绝对"等绝对化用语；三条原则是事实与观点分层、信息分级标注（定论 vs 有争议方向）、引用时效控制。【原文证据：Section III Strictly Prohibited Practices 与 Principle 1-3】
  4. 问题：医疗内容引用文献的时效标准是什么？ → 答案：临床指南不超过 5 年、研究文献不超过 10 年（里程碑研究除外），并标注内容最近复核日期。【原文证据：Section III Principle 3 三条】（数字无外部出处）
  5. 问题：医美/健康管理/保健品牌怎么做 GEO？ → 答案："轻医疗"分层——医美强调机构资质与"结果因人而异"声明；健康管理强调科学证据与合作机构、避免暗示诊疗的表述；保健品须声明"非药物不能替代治疗"、引用市场监管部门批准文号，争取被归为膳食补充剂而非治疗性药物。【原文证据：Section V 三小节】

## 2. 准确性测试
- 核心概念与术语理解：准确。MedicalCondition、Drug、Treatment 均为 schema.org 真实类型；YMYL 概念与"AI 对 YMYL 最严格"的表述与通行理解一致。
- 数字、日期、对象、条件引用："Clinical guidelines no older than 5 years / literature no older than 10 years" 为具体数字规则但无出处，属经验法则被写成规则；`hasCredential` 字段在 schema.org 中主要用于描述 **Person** 的资质/证书，原文建议加到 **Organization Schema** 上，用法**存疑（待核实）**，且无文档链接。"a 2025 study in XX Medical Journal" 为占位示例，尚可辨识。
- 断章取义 / 过度推断 / 遗漏限制条件："AI cross-validates（编造数据会被 AI 交叉验证识破）"、"AI prioritizes these sources"、"AI applies the most rigorous review standards" 均为无来源的行为断言；"whoever does healthcare GEO well first builds an extremely strong competitive moat" 属营销式推断，无竞争数据支撑。
- 前后矛盾 / 无法验证的事实：日期头部与页面不一致；示例含中国市场监管口径（State Administration for Market Regulation、NHC）与英文站点受众错位；首屏称"医疗是最难做的 GEO 领域"，与 finance 页"金融是最复杂"、legal 页"法律最有趣"属跨页并列式最高级表述，站内口径不统一（各页分别自称"最"）。原文无自相矛盾的事实陈述。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| AI 优先引用 CDC/WHO/NHC 等权威源 | Section I 有序列表 | 有外链 CDC/WHO（作为来源示例，非结论证据） | 部分可 | 部分 | 各引擎医疗来源排序的实测样本 |
| 非权威来源会被附加免责声明 | Section I 第 2 条 | 无 | 不可 | 部分 | 免责声明触发机制的实例 |
| 医疗指南数年内更新、AI 对过时信息谨慎 | Section I 第 3 条 | 无 | 不可 | 部分 | 指南更新周期与 AI 行为数据 |
| Organization Schema 加 hasCredential | Section II Strategy 1 | 无（仅站内 glossary 内链） | 不可 | 部分（字段适用对象待核实） | schema.org 字段文档 |
| 学术引用是最强背书 | Section II Strategy 2 | 无 | 不可 | 部分 | 学术引用与 AI 引用相关性研究 |
| 指南 5 年 / 文献 10 年时效标准 | Section III Principle 3 | 无 | 不可 | 否 | 该标准的行业出处 |
| 保健品应被归为膳食补充剂 | Section V | 无 | 不可 | 部分 | 各引擎对保健品的分类规则 |

> 外链 CDC/WHO 是"你应引用的权威源"，不是"本文结论的证据"；元信息"数据可验证"声明在本页同样无对应外部证据。

## 4. 独特价值测试
- 原创数据或实测结果：无。
- 独立研究 / 案例：无真实机构或临床案例；"XX Dental Hospital"、"2025 study" 均为占位。
- 独特方法 / 框架 / 分析："三高"定位、内容两层分离 + 信息分级 + 引用时效的三原则、三场景（品牌认知/疾病科普/治疗方案）、轻医疗三分层，属有组织的框架（原创性待核实）。
- 通用行业知识的重新表述：展示执业许可证、引用权威期刊、禁用绝对化用语、免责声明等属医疗营销与 YMYL 合规常识复述。
- 无法确认原创性者标注：待核实。

## 5. 可提取性测试
1. 问题：医疗机构做 GEO 的第一步是什么？
   - AI 可提取的答案：把资质放到 AI 最容易取到的位置——首页与 About 的执业许可证、医疗内容的医生署名、产品页注册证号，并在 Organization Schema 标注 `hasCredential`。
   - 原文证据：Section II Strategy 1 列表与 "Key action"。
   - 缺失信息：`hasCredential` 适用对象未给文档依据（存疑）。
   - 是否需结合其他页面：是（Schema 细则需结合 technical/schema-markup-guide）。
2. 问题：AI 回答医疗问题时优先用哪些来源？
   - AI 可提取的答案：政府卫生机构（CDC/WHO/NHC）、权威医疗机构、专业期刊、药品说明书、医学百科；非权威来源常被附免责声明。
   - 原文证据：Section I 有序列表 1-3。
   - 缺失信息：无各来源实际引用占比或引擎差异。
   - 是否需结合其他页面：是（来源权威性机制需结合 models/source-authority）。
3. 问题：医疗内容多久要更新一次？
   - AI 可提取的答案：临床指南不早于 5 年、研究文献不早于 10 年（里程碑除外），并标注最近复核日期。
   - 原文证据：Section III Principle 3。
   - 缺失信息：该标准的出处；不同科室/疾病差异未说明。
   - 是否需结合其他页面：否（但时效机制可结合 content/content-freshness）。
4. 问题：疾病科普页该怎么建？
   - AI 可提取的答案：用 MedicalCondition Schema 做结构化页面，标注信息来源（期刊、指南编号）与最近更新日期。
   - 原文证据：Section II Strategy 3 与 Section IV Scenario 2。
   - 缺失信息：单页内容结构模板（标题/段落顺序）缺失。
   - 是否需结合其他页面：是（页面模板需结合 community/geo-content-template）。
5. 问题：医美和保健品品牌能宣称什么？
   - AI 可提取的答案：医美只强调机构资质与医生履历、加"结果因人而异"；保健品须写明"非药物不能替代治疗"并引批准文号，避免"预防 XX 病"等暗示诊疗表述。
   - 原文证据：Section V 三个小节。
   - 缺失信息：中国/美国/其他市场批准文号体系差异未区分。
   - 是否需结合其他页面：是（合规需按辖区另查）。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 23 | Schema 类型与 YMYL 概念准确；但 5 年/10 年时效规则无出处、`hasCredential` 用于 Organization 的用法存疑（待核实）、多处 AI 行为断言无依据 |
| 证据可追溯性 | 25 | 14 | 关键结论均无可核验外部来源，CDC/WHO 外链仅为来源示例；元信息"数据可验证"声明落空 |
| 独特价值 | 25 | 16 | 三原则/三场景/轻医疗分层结构完整，但无原创数据与真实案例，多为 YMYL 合规常识 |
| 可提取性 | 10 | 9 | 答案前置、清单化表达、场景分节清晰，单页可独立回答 |
| 时效性与适用边界 | 10 | 7 | 有更新日期与"最近复核日期"倡导；但头部日期不一致、5/10 年规则无出处、示例为单一辖区口径 |
| **总分** | **100** | **69** | |

### 最值得优先修改的 5 个具体位置
1. Section II "Key action" 的 `hasCredential` → Organization Schema：核实 schema.org 字段适用对象（通常关联 Person），改为给医生署名处标注或补官方文档链接。
2. Section III Principle 3 的 "5 年 / 10 年"：标注来源或改为"建议不超过"的柔性表述，避免被 AI 当作行业硬标准引用。
3. `<head>` JSON-LD `dateModified`（2026-08-16）与正文 `Updated: 2026-07-28`：统一日期。
4. Section I "AI prioritizes these sources / AI cross-validates" 等行为断言：改为"实践中常见"并补可核验样本，或标注为观察而非事实。
5. 元信息行 "All data is linked to verifiable sources"：为关键断言补外部来源，否则删除该声明；同时与 finance/legal 页统一"最 X 的 GEO 领域"口径，避免跨页并列式最高级互相冲突。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
