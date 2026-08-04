# AGENTS.md — GEO Encyclopedia

> 本文件供 AI 编码助手（如 opencode）在操作此仓库时使用。

## 项目概述

GEO Encyclopedia（geo010.com）是一个纯英文静态文档网站，托管于 GitHub Pages，前端接入 Cloudflare Worker 用于 AI 爬虫访问日志。内容是英文 Generative Engine Optimization（生成式引擎优化）知识体系，包含 9 大章节（I.–IX.）共 45 篇深度文章 + 10 个术语（Glossary）。每篇文章是 docs/ 下一个独立 HTML 文件，无 Markdown 源。

## 构建/测试/部署

**此项目无构建系统、无包管理器、无测试框架、无 linter。** 无需运行 `npm install` 或 `pip install`。

| 命令 | 说明 |
|------|------|
| `无` | 纯静态 HTML，直接编辑文件即可 |
| 部署 | 推送到 `main` 分支，GitHub Pages 自动发布 `docs/` 目录 |
| 预览 | 用浏览器直接打开 `docs/*.html` 文件 |
| Worker | `worker/index.js` 通过 Cloudflare API 部署（见 `worker/README.md`），前端缓存 TTL 300s |
| 本地 | 无需任何构建步骤 |

## 目录结构

```
GEOhtml/
├── AGENTS.md              # 本文件
├── .gitignore             # 忽略 token.txt、"公众号文章"
├── worker/                # Cloudflare Worker（AI 爬虫日志）
│   ├── index.js           # 源站 raw.githubusercontent + D1 日志 + www→主域 301
│   ├── wrangler.toml      # D1 binding 配置
│   └── README.md          # 部署说明（用 API 上传，本机 wrangler 会崩）
└── docs/                  # GitHub Pages 根目录
    ├── index.html         # 首页
    ├── what-is-geo.html   # GEO 概述页（canonical 指向 fundamentals 完整版）
    ├── about.html / contact.html / monitor.html / stats.html
    ├── llms.txt / robots.txt / sitemap.xml / feed.xml / summary.json
    ├── og-image.svg / og-image.png / favicon.svg
    ├── .well-known/       # ai.txt / ai.json / llms.txt / ai-plugin.json / openapi.json
    ├── CNAME              # geo010.com（不要修改）
    ├── fundamentals/ metrics/ models/ content/ technical/   # 9 大章节子目录
    ├── brand/ industry/ cases/ data/ glossary/
    └── geoplan/           # 内部规划文档（.md，随站发布但不影响导航）
```

## 代码规范

### HTML 规范

- **编码**: `<!DOCTYPE html>` + `<html lang="en">` + `<meta charset="UTF-8">`
- **CSS**: 全部内联在 `<style>` 标签内的 `<head>` 中，不使用外部 CSS 文件
  - 全局重置: `* { margin: 0; padding: 0; box-sizing: border-box; }`
  - 字体栈: `-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif`
  - 行高: `line-height: 1.9`; 内容区背景: `#f5f5f5`（body）; 文章卡片: `#fff`
  - 侧边栏背景: `#1a1a2e`; 强调色: `#4fc3f7`; 链接色: `#0066cc`
  - 表格: 交替行背景 `tr:nth-child(even)`; 媒介查询断点: `768px`
- **JSON-LD**: 必须放在 `<head>` 中（勿放 body 底部）。每页含 `Article`/`FAQPage` 等 schema；首页含 `WebSite` + `Organization` + `ItemList`
- **RSS 发现**: 每个页面 `<head>` 的 canonical 之后须有
  `<link rel="alternate" type="application/rss+xml" title="GEO Encyclopedia RSS" href="https://geo010.com/feed.xml">`
- **JS**: 除各页的 51.la 统计脚本（`LA.init`）与侧边栏折叠脚本外不写其他 JS；**绝不删除或修改 51.la 统计脚本**
- **布局**: `div.layout` > `nav.sidebar` + `div.main` > `div.content`
  - 侧边栏 240px sticky；内容区 max-width 800px 居中；当前页高亮 `class="active"`
- **文章页**（子目录内）: `<span class="tag">` + `<h1>` + 元信息行 + `.answer-box` 摘要 + 正文（h2/h3/ul/ol/table） + `.nav-links` 上下篇
- **图片**: `<img>` 标签 max-width 100%，勿加外链图片

### 内容规范

- **语言**: 全英文（en）。术语首次出现附全称括号，如 "Generative Engine Optimization (GEO)"
- **品牌名**: 固定为 **GEO Encyclopedia**（title/og/JSON-LD/feed 统一），不用中文名
- **风格**: 对话式、案例驱动、段落精短（每段不超过 6 行）；重要数据标注来源，用表格对比
- **标题命名**: 章标题 `I. Fundamentals` 等罗马数字；文章标题简短有力

### Git 提交规范

- commit message 用中文
- 格式: `类型: 简短说明`（如 `feat: 新增第X章内容`、`fix: 修正错别字`、`style: 调整样式`）
- 不要提交 `docs/` 之外的无关文件；**绝不提交 token.txt**（.gitignore 已忽略）
- .gitignore 已忽略 `公众号文章` 目录，不要追踪此目录

### 工作流程

1. 直接编辑 `docs/**/*.html`（每篇文章一个独立 HTML，无 Markdown 源）
2. 如果新增/重命名页面：同步更新 `index.html` 侧边栏与章节列表、`llms.txt`、`sitemap.xml`、`feed.xml`、`summary.json`
3. 如果修改了页面标题或描述：更新 `sitemap.xml` 中对应条目
4. 修改 `worker/index.js` 后：用 `worker/README.md` 中的 API 部署流程重新部署（不要用本机 wrangler）
5. 提交并推送到 `main`，GitHub Pages 自动部署；Cloudflare Worker 缓存 300s 内自动刷新

## 注意事项

- 绝不修改 CNAME、robots.txt 中的 AI 爬虫规则
- 绝不删除 51.la 统计脚本；`stats.html` 保持三重保护（robots Disallow + meta noindex + 不进 sitemap/llms.txt）
- 不要引入外部 CSS/JS 库或构建工具
- GitHub Pages 根目录是 `docs/`，所有路径相对于此
- token.txt 含 Cloudflare API token，操作 Worker/DNS 时读取使用，绝不提交或外发
