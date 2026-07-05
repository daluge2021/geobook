# LLMs.txt是什么——AI爬虫时代的入门基建

> 假设你花了一个月时间，把网站内容全部按GEO标准重写了——EEAT到位、Schema标记完善、数据引用全部附上来源。
> 你信心满满地在ChatGPT上测试："我们的品牌信息应该被AI引用了吧？"
> 结果AI的回答里关于你的信息还是错的、过时的。
> 
> 为什么？原因可能非常简单，也非常残酷：
> **AI爬虫根本就没能访问到你的网站。**

---

📖 **本文目录**

1. 一、GEO基础层：所有优化的"0号前提"
2. 二、LLMs.txt：写给AI的"网站说明书"
3. 核心产品
4. 常见问题
5. 权威信源
6. 不推荐
7. Getting Started
8. Core Concepts
9. API Reference
10. Uncrawlable
11. 三、AI爬虫 vs Googlebot：四个关键区别
12. 四、操作指南：30分钟完成GEO基础层搭建
13. 一句话简介
14. 核心产品/服务
15. 权威来源
16. 常见问题
17. 不推荐访问
18. 五、常见陷阱
19. 六、总结

---


## 一、GEO基础层：所有优化的"0号前提"

很多人做GEO容易犯一个错误：**一来就直接干内容。** 翻资料、写文章、加上Schema标记、结构化数据全套配齐——然后发现AI还是没反应。

他们忽略了一个最基本的问题：**AI能不能"看到"你的内容？**

这个问题的答案，取决于你的"GEO基础层"有没有做好。

GEO基础层（GEO Foundation Layer）是所有GEO优化的**最低工作层级**——它不关心你的内容好不好、有没有Schema标记，只关心一个最原始的问题：**AI的爬虫能不能顺利访问你的网站，读取你的内容？**

如果答案是"不能"——后面所有的优化全部白做。就像一个大门锁死的房子，里面的装修再豪华也没人看得见。


### GEO基础层的"三关"考验

AI爬虫访问你的网站，要过三关：

**第一关：爬取（Crawl）——"AI能连上你的服务器吗？"**
AI爬虫通过HTTP请求访问你的网站URL。如果返回：
- **404** — 页面不存在，AI放弃
- **500+** — 服务器错误，AI放弃
- **请求超时** — 你的服务器响应太慢，AI等不及放弃了
- **被屏蔽** — robots.txt拒绝了AI爬虫，AI乖乖离开

这一关是"生死关"。过不去，什么都不用谈了。

**第二关：解析（Parse）——"AI能读懂你的页面吗？"**
AI爬虫获取到HTML内容后，需要解析出文本、链接、结构化数据。但如果你的网站是重度JavaScript渲染的SPA（单页应用），问题就来了：
- AI爬虫的JS引擎不一定能完整渲染所有内容
- 一些AI爬虫（如GPTBot对JS的支持就比不上Googlebot）
- 如果关键内容依赖JS动态加载，AI可能看到的是一个大白页面

**第三关：索引（Index）——"AI记住了你的内容吗？"**
解析后的内容被AI存入检索索引库。如果你的内容本身质量不够、或者和AI的检索标准不匹配，索引阶段也可能被滤掉。

**GEO基础层的意义就在于：确保你在"第一关"和第二关"不掉链子"，让AI有机会看到你的优质内容。**

---


## 二、LLMs.txt：写给AI的"网站说明书"

LLMs.txt是GEO基础层中**投入产出比最高的一个动作**——花10分钟创建，可能带来巨大的收益。


### 什么是LLMs.txt？

LLMs.txt是一个放在网站根目录下的纯文本文件（比如`example.com/llms.txt`），专门给大语言模型看的"网站使用说明书"。它告诉AI：

> **"我网站上有这些重要页面，分别讲什么内容；那几个页面是次要的，不用浪费时间去爬。"**

格式非常简单，用Markdown写就行：

```markdown
# 品牌名

## 核心产品
- [产品A - 面向中小企业的CRM系统](https://example.com/product-a)
- [产品B - 数据分析平台](https://example.com/product-b)

## 常见问题
- [如何开始使用产品A](https://example.com/faq/get-started)
- [定价和套餐说明](https://example.com/pricing)

## 权威信源
- [2026年行业白皮书 - PDF下载](https://example.com/whitepaper-2026)

## 不推荐
- https://example.com/internal (内部文档，不需要被引用)
```


### LLMs.txt和sitemap.xml的区别

很多人问：我已经有sitemap.xml了，还需要LLMs.txt吗？

| 维度 | sitemap.xml | LLMs.txt |
|------|-------------|----------|
| **面向对象** | 传统搜索引擎（Googlebot等） | AI大语言模型（ChatGPT、Perplexity等） |
| **格式** | XML，机器可读 | Markdown，人也可读 |
| **语义** | 只有URL和更新频率 | 带一句话描述，帮助AI理解每个页面的内容 |
| **优先级提示** | `<priority>`字段（但Google基本忽略） | 自然语言排序（最重要的放最前面） |
| **排除规则** | 通常不在这里做排除 | 可以直接说"这些页面不需要被引用" |

**两者不是替代关系，是互补关系。** sitemap.xml告诉Googlebot"我有这些页面"；LLMs.txt告诉AI"这些页面分别讲什么、哪些最重要"。


### 一个真实的LLMs.txt案例

以Mintlify（一个文档平台）为例，他们的LLMs.txt长这样：

```markdown
# Mintlify Documentation

## Getting Started
- [Quickstart Guide](https://mintlify.com/docs/quickstart)
- [Installation](https://mintlify.com/docs/installation)

## Core Concepts
- [Configuration](https://mintlify.com/docs/configuration)
- [Content Structure](https://mintlify.com/docs/content)

## API Reference
- [REST API](https://mintlify.com/docs/api-reference)
- [SDKs](https://mintlify.com/docs/sdks)

## Uncrawlable
- https://mintlify.com/docs/changelog
- https://mintlify.com/terms
```

你看，它甚至指定了"Uncrawlable"部分——告诉AI这些页面不值得爬取。这是一种**资源主动配置**：让AI的"注意力"集中在最有价值的页面上。

---


## 三、AI爬虫 vs Googlebot：四个关键区别

很多企业有个误解："我的网站在Googlebot那里表现很好，AI爬虫应该也没问题吧？"

**不一定。** AI爬虫（GPTBot、ClaudeBot、Google-Extended等）和Googlebot有几个关键区别：

**区别一：JS渲染能力不同**
Googlebot的JS渲染引擎已经非常成熟。但AI爬虫——特别是较晚推出的（如ClaudeBot）——JS渲染能力可能弱很多。如果你的关键内容是通过前端JS动态加载的，AI可能看不到。

**区别二：超时时间更短**
AI爬虫的"耐心"比Googlebot差。Googlebot可以等几秒钟，AI爬虫可能几百毫秒没响应就直接跳过了。所以**网站速度在GEO中比在SEO中更重要**。

**区别三：robots.txt的规则不同**
很多网站在robots.txt中屏蔽了"GPTBot"（因为担心OpenAI未经授权抓取内容做训练）。如果您的robots.txt中有`Disallow: /`针对GPTBot，那您的内容在ChatGPT联网搜索中就完全不可见。

**区别四：类型更多样**
Googlebot基本就一种。AI爬虫目前有：
- **GPTBot** — OpenAI的爬虫，用于ChatGPT搜索
- **ClaudeBot** — Anthropic的爬虫
- **Google-Extended** — Google专门为AI搜索（AI Overviews）设计的爬虫
- **PerplexityBot** — Perplexity的爬虫
- **CCBot** — Common Crawl，很多AI模型的训练数据来源

**需要检查你的robots.txt是否对所有AI爬虫开放。**

---


## 四、操作指南：30分钟完成GEO基础层搭建


### 步骤1：检查robots.txt（5分钟）

访问你的网站 `example.com/robots.txt`，检查是否有以下规则：

```robots.txt
# 如果有以下规则，GPTBot将无法访问你的网站
User-agent: GPTBot
Disallow: /

# 建议改为：
User-agent: GPTBot
Allow: /
# 如果不想被用做训练但允许搜索使用
# 参考OpenAI的官方指南
```


### 步骤2：创建LLMs.txt（10分钟）

在网站根目录创建`llms.txt`文件。参考下面的模板：

```markdown
# [品牌名]

## 一句话简介
[一句话说明公司/产品是做什么的]

## 核心产品/服务
- [产品名 - 一句话描述](产品链接)
- [产品名 - 一句话描述](产品链接)

## 权威来源
- [行业白皮书 - 标题、发布时间](下载链接)
- [客户案例 - 哪些客户用了我们的方案](案例链接)

## 常见问题
- [问题 - 一句话答案，附链接](FAQ页面链接)
- [问题 - 一句话答案，附链接](FAQ页面链接)

## 不推荐访问
- 内部文档页面
- 隐私政策
- 其他不需要被引用的页面
```


### 步骤3：测试AI爬取能力（10分钟）

使用以下工具测试关键页面的AI爬取能力：
- **Google Search Console** — 测试Google-Extended的爬取情况
- **PageSpeed Insights** — 检查加载速度（AI爬虫超时更短，建议核心页面控制在2秒以内）
- **手动测试** — 在Perplexity上搜索你的品牌，看AI能否引用到你的内容


### 步骤4：检查服务器响应（5分钟）

确保关键页面在500ms内返回首字节（TTFB），状态码为200。AI爬虫对慢速服务器的容忍度远低于Googlebot。

---


## 五、常见陷阱

**陷阱1：以为"AI爬虫会自动找到所有重要页面"**
不是的。AI爬虫的"预算"有限，如果一个页面链接深度超过3层，它可能就放弃爬取了。LLMs.txt就是解决这个问题的——直接把最重要的页面推荐给AI。

**陷阱2：以为"Googlebot可以 = AI爬虫也可以"**
JS渲染、超时设置、robots规则三者都可能不同。一定要针对AI爬虫做独立的测试。

**陷阱3：只建了LLMs.txt但不维护**
AI爬虫会定期重新抓取LLMs.txt。如果你的内容更新了但LLMs.txt没更新，AI引用的可能是过时的描述。

---


## 六、总结

GEO基础层的逻辑其实很简单：

> **让AI"看得见"你，是一切GEO的前提。没有基础层，内容再好也白费。**

而LLMs.txt是这个基础层中最高效的一个动作——10分钟创建，零成本，但能显著提升AI对你内容的抓取效率。它就像你家门口的"地图"：告诉AI你的网站上有什么、最重要的内容在哪、哪些不值得关注。

**你花了几万块做内容、做优化。难道不应该花10分钟确保AI能读取到吗？**

---

**本章简介：** 从零讲透GEO的五个核心概念——GEO是什么、与SEO的关系、EEAT信任机制、LLMs.txt基建、答案资产化。适合刚接触GEO的读者快速建立认知框架。

------

**下一篇预告：进入第二章「内容为王 · GEO内容策略」——什么是答案资产化。** 我们会讲GEO中最核心的概念之一：如何把企业的常见问题变成"AI可以直接拿来用的标准答案"。

---

*本文是GEO知识全书系列的第4篇，共45篇。*
