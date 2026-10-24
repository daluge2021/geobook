# 审计明细：How to Do Multi-Brand GEO Strategy?

- 文件：docs/brand/multi-brand-geo.html
- 页面类型：文章
- 审计日期：2026-10-10
- 正文字数（近似）：1200（英文词）

## 1. 核心答案提取
- 核心结论（≤100 字）：多品牌 GEO 是品牌架构工程：让 AI 准确识别每个品牌的独立身份、理解品牌间关系、在恰当场景推荐正确品牌；用 parentOrganization/subOrganization schema 标注关系，并平衡独立性与关联性。
- 可被直接回答的 5 个用户问题：
  1. 问题：多品牌关系在 AI 认知中分几类？ → 答案：母品牌–子品牌（从属）、母品牌–产品品牌、集团–独立品牌（组合）三类。【原文证据：I. Three Types】
  2. 问题：多品牌 GEO 的核心原则有哪些？ → 答案：明确身份标签、构建匹配用户体验的品牌联想、平衡独立与关联。【原文证据：II. 三条 Principle】
  3. 问题：如何用 Schema 标注品牌关系？ → 答案：母品牌用 subOrganization 列出子品牌，子品牌在 Organization schema 用 parentOrganization 指向母品牌。【原文证据：II. Principle 1 与 III. Step 2】
  4. 问题：多品牌 GEO 常见陷阱？ → 答案：共用单一 LLMs.txt、子品牌关键词互相蚕食、收购品牌身份丢失。【原文证据：IV. Pitfall 1–3】
  5. 问题：收购品牌应如何处理？ → 答案：收购后前 6 个月保持独立身份，再逐步加 parentOrganization 字段实现"自然过渡"。【原文证据：IV. Pitfall 3 Solution】

## 2. 准确性测试
- 核心概念与术语理解：准确。母/子品牌、组合品牌、parentOrganization/subOrganization schema 概念使用正确，符合 schema.org 规范。
- 数字、日期、对象、条件引用：真实商业案例引用准确——Alibaba→Taobao/Tmall/1688、ByteDance→Douyin/Toutiao/Feishu、P&G→Head & Shoulders/Rejoice/Pantene/Crest，均与实际股权/产品关系相符。但"6 months"过渡期、"10+ platforms"等建议数字无来源。
- 断章取义 / 过度推断 / 遗漏限制条件：整体克制；对"AI 会做加权信任评估"类机制推断较少，主要停留在结构建议层面。
- 前后矛盾 / 无法验证的事实：JSON-LD dateModified 2026-08-16 与正文 "Updated: 2026-07-28" 不一致。

## 3. 证据质量测试
| 主要结论 | 原文依据 | 外部来源 | 可否核验 | 证据是否支持结论 | 需补充信息 |
|---|---|---|---|---|---|
| 三类多品牌关系 | I. Three Types + 真实案例 | 无链接（案例为公共常识） | 可（案例） | 是 | 建议补官方来源链接 |
| parentOrganization/subOrganization 用法 | II./III. Schema 示例 | 无（schema.org 规范） | 可 | 是 | 可链 schema.org 文档 |
| 有效多品牌 GEO 的四项目标 | 结尾有序列表 | 无 | 不可 | 部分 | 依据 |
| 收购后 6 个月保持独立 | IV. Pitfall 3 | 无 | 不可 | 部分 | 依据 |
| 独立监测与差异化关键词 | III./IV. | 无 | 不可 | 部分 | 无 |

> 注意：文中 Alibaba/ByteDance/P&G 等案例为公开事实，可独立核验；但"6 个月过渡期"等操作性数字属经验建议，非验证结论。

## 4. 独特价值测试
- 原创数据或实测结果：无。
- 独立研究 / 案例：使用真实公共商业案例（阿里、字节、宝洁），提升了可信度，但非独立研究。
- 独特方法 / 框架 / 分析：有——"三类关系 + 三原则 + 品牌关系图 + 差异化内容角色表 + 三陷阱"构成清晰的多品牌 GEO 操作框架，结构化程度较高。
- 通用行业知识的重新表述：品牌架构（brand architecture）、schema 关系标注、关键词蚕食属常识复述。
- 无法确认原创性者标注：待核实。

## 5. 可提取性测试
1. 问题：AI 如何理解多品牌关系？
   - AI 可提取的答案：从属、产品、组合三类；以"XX belongs to YY"、"XX is a YY product"、"XX and YY both belong to ZZ"表达。
   - 原文证据：I. 两类列表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
2. 问题：多品牌如何部署 schema？
   - AI 可提取的答案：母品牌 subOrganization 列子品牌；子品牌 parentOrganization 指母品牌。
   - 原文证据：II. Principle 1 + III. Step 2 JSON 示例。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
3. 问题：收购品牌如何避免身份丢失？
   - AI 可提取的答案：前 6 个月保持独立身份，之后逐步加 parentOrganization。
   - 原文证据：IV. Pitfall 3。
   - 缺失信息：6 个月的依据。
   - 是否需结合其他页面：否。
4. 问题：多品牌内容策略如何差异化？
   - AI 可提取的答案：母品牌做"门面"讲实力历史；旗舰子品牌讲竞争力与案例；价值子品牌讲价格与适配；收购品牌保持独立。
   - 原文证据：III. Step 3 角色表。
   - 缺失信息：无。
   - 是否需结合其他页面：否。
5. 问题：多品牌有哪些常见坑？
   - AI 可提取的答案：共用单一 LLMs.txt、关键词互相蚕食、收购品牌身份丢失。
   - 原文证据：IV. Pitfall 1–3。
   - 缺失信息：无。
   - 是否需结合其他页面：否。

## 6. 最终评分
| 维度 | 满分 | 得分 | 扣分原因 |
|---|---|---|---|
| 答案准确性 | 30 | 24 | 概念与 schema 用法准确，真实案例引用无误；个别建议数字无据 |
| 证据可追溯性 | 25 | 15 | 真实案例可核验但未附链接；操作性数字与结论无来源 |
| 独特价值 | 25 | 18 | 多品牌 GEO 关系框架较完整，含真实案例与实操步骤 |
| 可提取性 | 10 | 9 | 关系表、步骤、schema 示例齐备，可独立回答 |
| 时效性与适用边界 | 10 | 6 | 日期字段与可见日期不一致，无边界说明 |
| **总分** | **100** | **72** | |

### 最值得优先修改的 5 个具体位置
1. I. 案例（Alibaba→Taobao/Tmall/1688 等）：建议补官方来源链接，使可核验事实有据可依。
2. IV. Pitfall 3 "前 6 个月保持独立身份"：操作性数字无依据，建议标注为经验建议。
3. III. Step 2 中 "Sub-brand:" 标题后示例代码缺失（仅有母品牌 JSON，子品牌 schema 未补全）：应补 parentOrganization 完整示例。
4. JSON-LD dateModified (2026-08-16) 与正文 "Updated: 2026-07-28" 不一致：需统一。
5. 全文无 schema.org 官方链接：建议在 parentOrganization/subOrganization 处链接规范文档以强化证据。

> 评分是内部诊断工具，不代表任何 AI 平台的真实排名或引用概率。
