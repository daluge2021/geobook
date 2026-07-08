# Schema 结构化数据代码模板合集

> 可直接粘贴到 HTML `<head>` 或 `<body>` 中（推荐放在 `<body>` 结束前）。
> 所有模板以 JSON-LD 格式编写。

---

## 1. FAQSchema（最优先）

**用途：** 问答页面、答案资产页面。让 AI 直接提取"问题-答案"对。

### 基础版（单问题）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "GEO是什么？",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "GEO（Generative Engine Optimization，生成式引擎优化）是指针对AI大模型（如ChatGPT、豆包、DeepSeek、Gemini）的检索和生成机制，优化品牌内容使其在AI答案中被优先引用的一套方法论。"
    }
  }]
}
</script>
```

### 完整版（多问题）

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "GEO是什么？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GEO（Generative Engine Optimization）是..."
      }
    },
    {
      "@type": "Question",
      "name": "GEO和SEO有什么区别？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GEO针对AI大模型，SEO针对传统搜索引擎..."
      }
    }
  ]
}
</script>
```

### 注意事项

- 每个 `Question.name` 建议 100 字以内
- 每个 `Answer.text` 建议 500 字以内，过长的 AI 可能截断
- 不要包含 HTML 标签，纯文本
- FAQSchema 只应有 1 个 `<script>` 块，不要在页面中分散多个

---

## 2. ArticleSchema

**用途：** 每篇深度文章页面的标准标记。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GEO到底是什么？——AI时代的新营销革命",
  "description": "GEO的定义、核心机制、与SEO的关系完整解读。",
  "author": {
    "@type": "Person",
    "name": "GEO知识全书",
    "url": "https://geo010.com"
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-06-20",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://geo010.com/ch01.html"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GEO知识全书",
    "url": "https://geo010.com"
  }
}
</script>
```

### 字段要求

| 字段 | 必需 | 说明 |
|------|------|------|
| `headline` | ✅ | 文章标题，不超过 110 字 |
| `description` | ✅ | 128-160 字的摘要 |
| `author.name` | ✅ | 作者名或品牌名 |
| `datePublished` | ✅ | ISO 8601 格式 |
| `dateModified` | ✅ | 每次更新内容时更新此字段 |

---

## 3. PersonSchema（EEAT 支撑）

**用途：** 作者介绍页、"关于我们"页面。直接支撑 EEAT 中的 Expertise 和 Authoritativeness。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "作者姓名",
  "description": "10年SEO/GEO从业经验，曾服务50+品牌完成GEO优化",
  "url": "https://geo010.com/about",
  "sameAs": [
    "https://www.linkedin.com/in/xxx",
    "https://zhihu.com/people/xxx"
  ],
  "knowsAbout": [
    "Generative Engine Optimization",
    "Search Engine Optimization",
    "AI Marketing",
    "Content Strategy"
  ],
  "alumniOf": "某某大学",
  "worksFor": {
    "@type": "Organization",
    "name": "GEO知识全书",
    "url": "https://geo010.com"
  }
}
</script>
```

### 关键字段

- `sameAs`：关联 LinkedIn、知乎等专业平台，增加 EEAT 可信度
- `knowsAbout`：列出专业领域，帮助 AI 理解你的专业范围
- `alumniOf`：教育背景（对 YMYL 领域尤其重要）
- `worksFor`：所属机构

---

## 4. WebSiteSchema（首页）

**用途：** 首页标记，帮助 AI 和搜索引擎理解整个网站的主题。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "GEO知识全书",
  "alternateName": "GEO知识全书 - AI时代品牌增长指南",
  "url": "https://geo010.com",
  "description": "45篇深度文章讲透Generative Engine Optimization，从入门到实战。",
  "inLanguage": "zh-CN",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://geo010.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
</script>
```

---

## 5. BreadcrumbList（面包屑导航）

**用途：** 标注页面层级，帮助 AI 理解网站结构。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://geo010.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "第一章 基础概念",
      "item": "https://geo010.com/ch01.html"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "GEO到底是什么？",
      "item": "https://geo010.com/ch01.html#geo-intro"
    }
  ]
}
</script>
```

---

## 6. OrganizationSchema（品牌/企业）

**用途：** 品牌页、关于页面。帮助 AI 识别品牌实体。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GEO知识全书",
  "url": "https://geo010.com",
  "logo": "https://geo010.com/logo.png",
  "description": "行业首个系统化梳理GEO知识体系的开源项目",
  "foundingDate": "2026",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@geo010.com"
  },
  "sameAs": [
    "https://weixin.qq.com/xxx"
  ]
}
</script>
```

---

## 7. 实施优先级速查表

| 优先级 | Schema 类型 | 适用页面 | 实施时间 |
|--------|------------|---------|---------|
| 🔴 P0 | FAQSchema | 答案资产页面 | 立即 |
| 🔴 P0 | ArticleSchema | 所有文章 | 立即 |
| 🟡 P1 | PersonSchema | 关于/作者页 | 本周 |
| 🟡 P1 | WebSiteSchema | 首页 | 本周 |
| 🟢 P2 | BreadcrumbList | 所有页面 | 2周内 |
| 🟢 P2 | OrganizationSchema | 首页/关于页 | 2周内 |
| 🔵 P3 | ProductSchema | 电商相关 | 按需 |

---

## 8. 验证工具

- [Google Rich Results Test](https://search.google.com/test/rich-results) — 最常用，直接粘贴 HTML 或 URL
- [Schema.org Validator](https://validator.schema.org/) — 官方验证器，更严格的校验
- [Bing Webmaster Tools](https://www.bing.com/webmasters/) — 查看已识别的结构化数据
- [Merchant Center](https://merchants.google.com/) — Product Schema 专用

---

## 9. 常见错误

| 错误 | 现象 | 修复 |
|------|------|------|
| `Missing required field` | 验证失败 | 补全必需字段 |
| `Type mismatch` | 字段类型不符 | 检查 @type 是否正确 |
| `Nesting depth > 6` | Google 不支持过深嵌套 | 简化结构 |
| `Duplicate entities` | 多个 script 块定义同一实体 | 合并到一个 JSON-LD 块 |
| `HTML in text fields` | AI 解析错乱 | 纯文本，不要加 `<br>` `<p>` |

---

> **提示**：添加 Schema 后，建议等 1-2 周后检查 Google Rich Results 报告和 AI 引用变化。Schema 本身不会立即改变引用率，但它能让 AI 更准确地提取你的内容。
