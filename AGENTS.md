# AGENTS.md — GEO知识全书

## 项目概述

GEO（Generative Engine Optimization）知识全书，45篇深度文章构成的静态知识网站。
托管于 GitHub Pages：`https://daluge2021.github.io/geobook/`

- 源文件（Markdown）→ 编译生成 HTML → 部署到 `docs/`
- 仓库根目录即 GitHub Pages 源目录（push 后自动部署）

## 目录结构

```
/
├── docs/                    # GitHub Pages 根目录
│   ├── index.html           # 首页
│   ├── ch01.html ~ ch09.html  # 每章页面（从 .md 编译生成）
│   ├── ch01.md  ~ ch09.md   # Markdown 源文件
│   ├── LLMs.txt             # AI 爬虫摘要文件
│   ├── robots.txt           # 爬虫规则
│   └── sitemap.xml          # 站点地图
├── .git/
└── AGENTS.md
```

## 构建/测试/部署命令

当前项目**无构建工具/包管理器**（无 package.json）。操作均为手动：

| 操作 | 命令 |
|------|------|
| 本地预览 | `start docs/index.html` 或在浏览器中直接打开 |
| 本地 HTTP 服务器预览 | `python -m http.server 8080 -d docs` |
| 编译 Markdown → HTML | 使用 pandoc: `pandoc docs/chXX.md -o docs/chXX.html --template=template.html` |
| 检查 HTML 标签闭合 | 在浏览器中打开 → F12 → Console 查看错误 |
| 检查链接有效性 | 手动点击所有导航链接 |
| 部署 | `git push origin main`（GitHub Actions 自动部署） |

**编译 Markdown 为 HTML 时**，必须复用现有 HTML 的完整结构（侧边栏、样式块、导航、页脚），不能仅转换 body 内容。

## 章节篇数对照表

每一章包含的文章数量及 `.current` 中显示的篇数范围必须精确：

| 章节 | 文章编号 | 篇数 |
|------|----------|------|
| ch01 基础概念 | 第1-5篇 | 5篇 |
| ch02 指标与框架 | 第6-8篇 | 3篇 |
| ch03 模型与方法 | 第9-11篇 | 3篇 |
| ch04 内容策略 | 第12-19篇 | 8篇 |
| ch05 技术实施 | 第20-26篇 | 7篇 |
| ch06 品牌战略 | 第27-32篇 | 6篇 |
| ch07 行业应用 | 第33-38篇 | 6篇 |
| ch08 实战案例 | 第39-42篇 | 4篇 |
| ch09 数据与公式 | 第43-45篇 | 3篇 |

侧边栏 `.current` 格式：`第X-Y篇 · Z篇`，例如 `第1-5篇 · 5篇`、`第6-8篇 · 3篇`。

## HTML 模板结构

每个章节 HTML 文件必须严格遵循以下模板：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>第X章 章节名 - GEO知识全书</title>
<meta name="description" content="...">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  /* ... 完整样式块，与现有文件完全一致 ... */
</style>
</head>
<body>
<div class="layout">
  <nav class="sidebar">
    <h3>📖 GEO知识全书</h3>
    <a href="index.html" class="home-link">🏠 回到首页</a>
    <a href="ch01.html" class="[空格+]active">一. 基础概念</a>
    <a href="ch02.html" class="">二. 指标与框架</a>
    <!-- 依此类推，当前页加 ` active`（注意前导空格） -->
    <div class="current">第X-Y篇 · Z篇</div>
  </nav>
  <div class="main">
    <div class="content">
      <div class="chapter-title">第X章 章节名</div>
      <div class="chapter-desc">📚 第X-Y篇 · 主题描述</div>
      <blockquote>主题描述</blockquote>
      <hr>

      <!-- 文章内容 -->
      <h1>文章标题</h1>
      <p>文章内容...</p>

      <hr class="article-separator">
      <span>第X篇 · 文章标题</span>
      <p>文章内容...</p>

      <div class="nav-links">
        <a href="chXX.html">← 上一章</a>
        <a href="chXX.html">下一章 →</a>
      </div>
    </div>
  </div>
</div>
</body>
</html>
```

## CSS 规范

- **重置**：`* { margin: 0; padding: 0; box-sizing: border-box; }`
- **字体**：`-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif`
- **行高**：`1.9`
- **颜色**：正文 `#333`，标题 `#1a1a2e` / `#111`，弱化文字 `#666` / `#999`
- **强调色**：`#4fc3f7`（链接、高亮、边框、徽章）
- **背景**：页面 `#f5f5f5`，卡片 `#fff`，侧边栏 `#1a1a2e`
- **布局**：`.layout` display:flex → `.sidebar`（width:240px, position:sticky）+ `.main`（flex:1, max-width:800px, margin:auto）
- **css 选择器顺序**：`*` → `body` → `.layout` → `.sidebar/*` → `.main` → `.content/*` → `@media`
- **响应式断点**：`@media (max-width: 768px)` — 隐藏侧边栏、缩小内边距、stack 导航
- **圆角**：卡片 `12px` / `16px`，按钮/标签 `20px`
- **阴影**：默认 `0 1px 3px rgba(0,0,0,0.06)`，hover `0 4px 16px rgba(0,0,0,0.1)`
- **过渡**：`transition: all 0.15s`（导航链接）或 `0.2s`（卡片）
- **文章分隔线**：`.article-separator` — 伪元素生成水平线，`span` 居中文字带白色背景遮罩

## Markdown → HTML 编译规则

| Markdown | HTML |
|----------|------|
| `# 标题` | `<h1>`（文章标题） |
| `## 标题` | `<h2>`（带 `border-bottom: 1px solid #f0f0f0`）|
| `> 引用` | `<blockquote>`（`border-left: 4px solid #4fc3f7`） |
| `**粗体**` | `<strong>`（color: `#111`） |
| `` `代码` `` | `<code>`（color: `#e74c3c`） |
| `---`（文章间） | `<hr class="article-separator"><span>第X篇 · 标题</span>` |
| `---`（章节内） | `<hr>` |
| 表格 | `<table>` + `tr:nth-child(even)` 斑马纹 |
| 无序列表 | `<ul>` |
| 有序列表 | `<ol>` |

## 首页规范

- 每个 `.chapter` 卡片包含：`.num`（"第一章"）、`h2`（章节名 + `<a>` 链接）、`.desc`（描述）、`.count`（"N篇"）
- 整个卡片用 `<a>` 包裹，`style="text-decoration:none"`
- Hero 区：`h1` + `.subtitle` + `p` + `.badge`

## 错误预防清单

修改文件后必须逐项检查：

- [ ] HTML 标签正确闭合（无未闭合的 `<div>`、`<p>` 等）
- [ ] 所有页面 `<title>` 唯一
- [ ] 每个页面有 `<meta name="description">`
- [ ] 侧边栏链接只有当前页有 ` active`（前导空格 + active）
- [ ] 侧边栏链接 href 指向正确的 HTML 文件
- [ ] `.current` 中的篇数范围正确
- [ ] `上一章` / `下一章` 链接正确（首页无、第一章无"上一章"、最后一章无"下一章"）
- [ ] sitemap.xml 使用完整线上 URL（https://daluge2021.github.io/geobook/...）
- [ ] robots.txt 末尾 Sitemap 指向线上地址
- [ ] 所有 style 写在 `<head>` 内单个 `<style>` 块中
- [ ] 中文内容使用全角标点符号
- [ ] 不存在 `http://localhost` 残留（必须是线上域名）

## 章节链接与篇数对照

| 文件 | 侧边栏文本 | 篇数范围 |
|------|-----------|----------|
| ch01.html | 一. 基础概念 | 第1-5篇 · 5篇 |
| ch02.html | 二. 指标与框架 | 第6-8篇 · 3篇 |
| ch03.html | 三. 模型与方法 | 第9-11篇 · 3篇 |
| ch04.html | 四. 内容策略 | 第12-19篇 · 8篇 |
| ch05.html | 五. 技术实施 | 第20-26篇 · 7篇 |
| ch06.html | 六. 品牌战略 | 第27-32篇 · 6篇 |
| ch07.html | 七. 行业应用 | 第33-38篇 · 6篇 |
| ch08.html | 八. 实战案例 | 第39-42篇 · 4篇 |
| ch09.html | 九. 数据与公式 | 第43-45篇 · 3篇 |

## Git 约定

- 提交信息用中文，简洁描述改动
- 无 lint 钩子，提交前手动运行上方错误预防清单

## 其他约束

- 不引入任何 npm/node 依赖，保持纯静态
- 不使用外部 CSS/JS 文件
- 所有路径使用相对路径（`ch01.html`，非 `/ch01.html`）
