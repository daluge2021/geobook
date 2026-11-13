# 暂存区（drafts/）— 一周后恢复步骤

2026-11-13 起，以下 7 篇文章从发布目录移出，等待补充第一方数据后恢复：

| 文件 | 缺的数据 | 恢复前要补的内容 |
|---|---|---|
| `industry/healthcare-geo.html` | 行业真实经历（有/无） | 无真实经历则维持现有"方法文 + 免责"结构，加一句补充说明即可上线 |
| `industry/finance-geo.html` | 同上 | 同上 |
| `industry/education-geo.html` | 同上 | 同上 |
| `industry/legal-geo.html` | 同上 | 同上 |
| `data/geo-benchmarks.html` | GSC 展示/点击导出（近 90 天） | 把真实曝光侧数字写进基准表，替换"待补"表述 |
| `data/ai-referral-attribution.html` | GSC / 分析后台转介数据 | 真实转介路径数字 |
| `data/roi-calculation.html` | 收入口径确认（当前为 0） | 确认后保持"收入为零、比例未定义"表述即可 |

## 恢复操作清单（按顺序）

1. 补数据、改文章（在 `drafts/` 下直接改，每篇记得同步可见 `Updated:` 与 JSON-LD `dateModified`）。
2. `git mv` 回原位置：
   ```bash
   git mv drafts/industry/healthcare-geo.html docs/industry/
   git mv drafts/industry/finance-geo.html docs/industry/
   git mv drafts/industry/education-geo.html docs/industry/
   git mv drafts/industry/legal-geo.html docs/industry/
   git mv drafts/data/geo-benchmarks.html docs/data/
   git mv drafts/data/ai-referral-attribution.html docs/data/
   git mv drafts/data/roi-calculation.html docs/data/
   ```
3. **Worker**：删除 `worker/index.js` 中的 `HELD_BACK` 表整块及其 `legacyRedirect` 里的 `HELD_BACK` 分支（代码里有注释"Do not convert these to 301"，删干净）。`node --check worker/index.js` 通过后按 `worker/README.md` 部署。
4. **导航**：86 个页面的 mega-menu 中 VII / IX 章节列需把这 7 个链接加回（对照 git 历史里本文件同目录提交前的版本即可）。
5. **章节页**：
   - `docs/industry-applications.html`：4 → 8 articles（meta 行、subtitle、JSON-LD `numberOfItems` 与 ItemList），卡片列表加回 4 篇，首段改回含 YMYL 的版本，"Start with" 改回 healthcare。
   - `docs/data-formulas.html`：3 → 6 articles，同样四处。
   - `docs/index.html`：VII/IX 章节列表与 `desc`，prefetch 数组，`ItemList` 第 7 项。
   - 全站计数 "59" 改回 "66"（footer、meta 描述、llms.txt、llms-small.txt、.well-known/llms.txt、about、search.html、summary.json、ai/summary.json、feed.xml、geo-content-template、topical-authority、multimodal-content）。
6. **清单文件**：sitemap.xml、feed.xml、worker/search-index.json、docs/summary.json、docs/ai/summary.json、llms.txt 加回条目（参考本目录 git 历史）。
7. 校验：死链 0、标签平衡 0、JSON-LD 全部可解析、sitemap URL 与文件一一对应。
8. 提交并推送。

> 注意：恢复时把这 7 篇的可见日期更新为恢复当日，并跑一遍日期对齐脚本，避免出现可见日期 ≠ dateModified 的旧问题。
