# 审计明细：Entity Recognition and Knowledge Graph Integration — Getting Found on AI's "Cognitive Map"

- 文件：docs/technical/entity-knowledge-graph.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1350 词

## 1. 核心答案提取
- 核心结论（≤100 字）：AI 通过"实体识别→实体链接→信息检索→交叉验证→生成答案"认识品牌，其中实体链接最关键；品牌要进入 AI 知识图谱，靠百科词条、Organization Schema、权威数据库登记与知名实体关联四条路径，并可用 1–5 星健康分自检。
- 可被直接回答的 5 个用户问题：
  1. 问题：How does AI recognize a brand? → 答案：五步——命名实体识别、实体链接（查知识图谱节点，最关键）、信息检索、交叉验证、答案生成；不在图谱中则 AI 只能"赌一把"或用"据称"等模糊措辞。【原文证据：§1 Step 1–5 及其后两条选择列表】
  2. 问题：What is a knowledge graph? → 答案：记录现实世界实体及其关系的"关系超级网络"，示例为 [品牌]—总部所在地/所属行业/产品/创始人 四条边；Google、百度、微软各有自己的知识图谱。【原文证据：§1 "What Is a Knowledge Graph?" 含示例代码块】
  3. 问题：How can a brand get into AI's knowledge graph? → 答案：四法——建百科词条（Wikipedia/百度百科，最强信号）、官网部署 Organization Schema、登记权威数据库（国家企业信用系统、天眼查/企查查、行业协会名录、LinkedIn）、与知名实体建立关联（合作、创始人背书、标准制定、权威媒体报道）。【原文证据：§3 Method 1–4】
  4. 问题：What signals make AI treat a brand as credible? → 答案：三类信号——唯一身份（百科词条、知识图谱 ID、统一社会信用代码）、跨平台一致性（名称/Logo/核心描述）、可信实体背书（协会、政府、权威媒体）；信号强度呈金字塔，百科词条最强、官网自述最弱。【原文证据：§2 Signal 1–3 与"Signal Strength"金字塔】
  5. 问题：How do I score my brand's entity health? → 答案：五项自检（百科、结构化数据、10 平台名称一致、权威外链、Google 知识面板）+ 1–5 星评级表，五星=百科+完整结构化数据+跨平台一致。【原文证据：§4 健康检查列表与 Health Score 表】

## 2. 准确性测试
- 核心概念与术语理解：NER、Entity Linking、知识图谱、Organization Schema、sameAs 的用法均**准确**且与通行定义一致；"实体链接是关键一步"与知识图谱消歧的常识相符。JSON-LD 示例字段（name/alternateName/logo/foundingDate/founder/address/sameAs）**准确可用**。
- 数字、日期、对象、条件引用："Wikipedia 是全球 AI 平台共享数据源""百度百科是中国 AI 平台核心数据源"为合理简化但未附证据；"AI can now recognize logos"（§2 Signal 2）为具体能力断言，待核实；"10 大平台名称完全一致"（§4）为作者自定阈值，未标注经验值；国家企业信用信息公示系统、天眼查等对象引用**准确**。
- 断章取义 / 过度推断 / 遗漏限制条件："百科词条是最重要/最强信号"未说明 Wikipedia 编辑规则与利益冲突（品牌方自建词条常被删）这一重大限制；"Google Knowledge Graph ID"作为可获得的身份信号，对多数中小企业实际不可申请，遗漏了适用边界。
- 前后矛盾 / 无法验证的事实：元信息行"Updated: 2026-10-10"与 JSON-LD `dateModified` 2026-10-10 **一致**（无矛盾）；但元信息同样声明"external figures are linked to sources"，正文无任何外部来源链接，属声明与内容不符。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| AI 识别品牌的五步流程、实体链接最关键 | §1 Step 1–5 | 无 | 待核实 | 部分（与通行 NER/EL 流程一致但无出处） | 引 NLP/知识图谱综述或某平台官方说明 |
| 各平台知识图谱均有独立体系 | §1 末段（Google/百度/微软） | 无 | 可（存在性易核） | 是（存在性成立） | 各图谱收录入口链接 |
| 百科词条是最强信号、金字塔排序 | §2 金字塔 | 无 | 不可 | 否（排序无依据） | 实证研究或标注"本站经验排序" |
| Organization Schema 可直接传递实体信息 | §3 Method 2 + JSON 示例 | 无（示例本身符合 schema.org） | 可（语法可验证） | 是（示例正确） | schema.org/Documentation 链接 |
| "AI 现在能识别 Logo" | §2 Signal 2 | 无 | 待核实 | 否 | 多模态模型能力说明 |
| 五星健康分评级标准 | §4 Health Score 表 | 无 | 不可 | 否（自建评级，未标注） | 标注"本站自建评估框架" |

> 注意：不得把"文章声称某事实成立"等同于"该事实已获验证"。

## 4. 独特价值测试
- 原创数据或实测结果：无
- 独立研究 / 案例：无（"XX 公司"为占位示例，非真实案例）
- 独特方法 / 框架 / 分析：有——**信号强度金字塔**（百科→知识图谱节点→政府教育站点→权威媒体→白皮书→协会名录→知乎→官网自述）与 **1–5 星实体健康分**均为本站自建评估框架；五步识别流程 + 五项自检为结构化整理
- 通用行业知识的重新表述：知识图谱定义、实体一致性（NAP 类比）、百科与 Schema 的重要性属 GEO/SEO 常识复述；Organization JSON-LD 字段说明为 schema.org 文档的转述
- 无法确认原创性者标注：金字塔排序与健康分原创性待核实（原文未声明为独创、也未引用外部）

## 5. 可提取性测试
1. 问题：How does AI recognize and identify brands?
   - AI 可提取的答案：五步流程 + "实体链接最关键"结论，开篇 blockquote 与 §1 可独立成答。
   - 原文证据：§1 Step 1–5、FAQPage schema
   - 缺失信息：流程对应的平台差异（OpenAI/Google/百度各不相同）
   - 是否需结合其他页面：否
2. 问题：How do I get my brand into Google's knowledge graph?
   - AI 可提取的答案：四条方法路径（百科、Schema、数据库登记、实体关联），§3 单章完整覆盖。
   - 原文证据：§3 Method 1–4
   - 缺失信息：Google 官方知识面板申请入口与资格条件；原文证据不足
   - 是否需结合其他页面：是（与 `technical/schema-markup-guide.html` 的字段级教程、`brand/brand-as-source.html` 组合更完整）
3. 问题：What Organization Schema should I use for my brand?
   - AI 可提取的答案：可直接提取完整 JSON-LD 示例（含 sameAs 数组）与字段说明。
   - 原文证据：§3 Method 2 代码块
   - 缺失信息：WebPage/LocalBusiness 等其他相关类型、JSON-LD 放置位置
   - 是否需结合其他页面：是（放哪、如何验证需 schema 指南页）
4. 问题：How do I check my brand's entity health?
   - AI 可提取的答案：五项自检问题 + 五行星级评级表，可整段作答。
   - 原文证据：§4 两个小节
   - 缺失信息：各星级的量化判定（多少外链算"足够"）
   - 是否需结合其他页面：否
5. 问题：Why does inconsistent brand information hurt AI answers?
   - AI 可提取的答案：交叉验证步骤会因多源矛盾触发"据称/据报道"式模糊表述，且信号 2 要求名称/Logo/描述跨平台一致。
   - 原文证据：§1 Step 4 与无节点时的两种选择、§2 Signal 2
   - 缺失信息：一致性问题导致错误描述的实例或数据（原文证据不足）
   - 是否需结合其他页面：是（案例可参照 `brand/ai-hallucination-protection.html`）

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 核心概念与 JSON-LD 示例准确；扣分在"AI 能识别 Logo"待核实、"10 平台一致"等自定阈值未标注、百科路径遗漏 Wikipedia 删除风险与知识面板资格边界 |
| 证据可追溯性 | 25 | 12 | 全文无外部来源；多数为方法论（可容忍），但信号金字塔排序与健康分被写成客观事实，且元信息声称外部数字有链接而实际没有 |
| 独特价值 | 25 | 16 | 信号金字塔与五星健康分是本站自建框架、五步流程+四法结构清晰；但无原创数据、无实测、无真实案例 |
| 可提取性 | 10 | 9 | 问题式小标题、编号步骤、表格与可复制 JSON 示例齐备，多数问题可页内独立回答 |
| 时效性与适用边界 | 10 | 7 | 更新日期新（2026-10-10）；缺各平台图谱收录入口的核验日期与"中小品牌适用性"边界（如知识面板不可自助申请） |
| **总分** | **100** | **68** | |

### 最值得优先修改的 5 个具体位置
1. §2 Signal 2"Is the logo consistent (AI can now recognize logos)"：补多模态识别的来源或改为"部分平台支持图像比对，待核实"。
2. §2 "Signal Strength"金字塔：标注"本站经验排序，非实证结果"，或引研究支撑百科>政府站点>媒体的排序。
3. §4 Health Score 表与"10 大平台"阈值：明确写为"本站自建评估框架，供内部参考"，避免被当作行业标准引用。
4. article-meta 行"external figures are linked to sources"：正文零外链，删除声明或为 schema.org、Wikipedia 收录规则、知识面板帮助页补真实链接。
5. §3 Method 1"Create Encyclopedia Entries"：补一段 Wikipedia 不得含宣传语、品牌方自建易被删的限制条件，避免给出高失败率的行动建议。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
