# AGENTS.md — GEO知识全书

> 本文件供 AI 编码助手（如 opencode）在操作此仓库时使用。

## 项目概述

GEO知识全书（GEO 知识全书）是一个纯静态文档网站，托管于 GitHub Pages（geo010.com）。内容是中文 Generative Engine Optimization（生成式引擎优化）知识体系，包含 9 大章节共 45 篇深度文章。来源为 Markdown，输出为 HTML。

## 构建/测试/部署

**此项目无构建系统、无包管理器、无测试框架、无 linter。** 无需运行 `npm install` 或 `pip install`。

| 命令 | 说明 |
|------|------|
| `无` | 纯静态 HTML，直接编辑文件即可 |
| 部署 | 推送到 `main` 分支，GitHub Pages 自动发布 `docs/` 目录 |
| 预览 | 用浏览器直接打开 `docs/*.html` 文件 |
| 本地 | 无需任何构建步骤 |

## 目录结构

```
GEOhtml/
├── AGENTS.md              # 本文件
├── .gitignore             # 忽略"公众号文章"
└── docs/                  # GitHub Pages 根目录
    ├── index.html         # 首页
    ├── ch01.html ~ ch09.html  # 各章节 HTML
    ├── ch01.md ~ ch09.md      # 各章节 Markdown 源文件
    ├── CNAME              # geo010.com
    ├── robots.txt         # 面向 AI 爬虫的规则
    ├── sitemap.xml        # 站点地图
    └── LLMs.txt           # AI 爬虫指引
```

## 代码规范

### HTML 规范

- **编码**: `<!DOCTYPE html>` + `<html lang="zh-CN">` + `<meta charset="UTF-8">`
- **CSS**: 全部内联在 `<style>` 标签内的 `<head>` 中，不使用外部 CSS 文件
  - 全局重置: `* { margin: 0; padding: 0; box-sizing: border-box; }`
  - 字体栈: `-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif`
  - 行高: `line-height: 1.9`
  - 内容区背景: `#f5f5f5`（body）; 文章卡片: `#fff`
  - 侧边栏背景: `#1a1a2e`; 强调色: `#4fc3f7`; 链接色: `#0066cc`
  - 表格: 交替行背景 `tr:nth-child(even)`
  - 媒介查询断点: `768px`（移动端隐藏侧边栏）
- **JS**: 不写 JavaScript（首页底部仅嵌入了 51.la 统计脚本，不要移除或修改）
- **布局**: 固定三栏式 — `div.layout` > `nav.sidebar` + `div.main` > `div.content`
  - 侧边栏宽度 240px, sticky 定位
  - 内容区 max-width: 800px, 居中
- **侧边栏导航**: `<nav class="sidebar">`，当前页高亮用 `class="active"`
- **文章分隔**: 多篇文章间用 `<div class="article-separator"><span>···</span></div>`
- **页脚导航**: `div.nav-links` 含上一章/下一章链接
- **图片**: 使用 `<img>` 标签，max-width: 100%，勿加外链图片

### Markdown 规范

- **章节标题**: 章标题用 `#`（h1），文章标题用 `##`（h2），小节用 `###`（h3）、`####`（h4）
- **摘要**: 文章开头用 `> 引言` blockquote 风格
- **分隔线**: 用 `---` 分隔文章
- **表格**: 使用标准 GFM 表格格式，表头用 `| --- |` 分隔
- **列表**: 使用 `-` 无序列表
- **代码块**: 用 ` ``` ` 围栏，标注语言（如 `markdown`, `html`, `robots.txt`）
- **加粗/强调**: 用 `**加粗**` 突出关键概念
- **图片**: 图片引用格式 `![alt](url)`

### 内容规范

- **语言**: 全中文（zh-CN），术语首次出现时附英文全称括号（如 "生成式引擎优化（GEO）"）
- **风格**: 对话式、案例驱动、段落精短（每段不超过 6 行）
- **引用**: 重要数据标注来源，用表格对比
- **标题命名**: 章标题 `第X章 名称`；文章标题简短有力，不用 "如何" "怎样" 等冗长前缀

### Git 提交规范

- commit message 用中文
- 格式: `类型: 简短说明`（如 `feat: 新增第X章内容`、`fix: 修正错别字`、`style: 调整样式`）
- 不要提交 `docs/` 之外的无关文件
- .gitignore 已忽略 `公众号文章` 目录，不要追踪此目录

### 工作流程

1. 编辑 `docs/chXX.md` 修改内容文本
2. 生成对应的 `docs/chXX.html`（需保持 HTML 与 Markdown 内容一致，样式模板与现有 HTML 文件完全一致）
3. 如果新增章节：更新 `index.html` 的导航栏、首页章节列表
4. 如果修改了页面标题或描述：更新 `sitemap.xml` 和 `LLMs.txt`
5. 提交并推送到 `main`，GitHub Pages 自动部署

## 注意事项

- 绝不修改 CNAME、robots.txt 中的 AI 爬虫规则
- 绝不删除 51.la 统计脚本
- 不要引入外部 CSS/JS 库或构建工具
- GitHub Pages 根目录是 `docs/`，所有路径相对于此
