# LLMs.txt的高级应用与Robots.txt策略——管理AI对你的"第一印象"

> 假设你刚搬进一栋新房。
> 客人第一次来拜访，凭什么找到你的房间？
> 靠门牌号和楼层指引。
>
> 在AI的世界里，LLMs.txt和Robots.txt就是你的"门牌号"和"楼层指引"——
> 它们告诉AI爬虫：你在这，这是你的信息，按这个方式来找你。
>
> 这两个文件平时不起眼，但它们决定了AI对你的"第一印象"。

---

📖 **本文目录**

1. 一、LLMs.txt：你给AI的"自荐信"
2. 核心信息
3. 核心能力
4. 常见问题
5. 相关链接
6. 二、Robots.txt：AI爬虫的"交通规则"
7. 三、LLMs.txt + Robots.txt + Sitemap.xml = AI友好的"配置三件套"

---


## 一、LLMs.txt：你给AI的"自荐信"


### 什么是LLMs.txt？

LLMs.txt是一个纯文本文件，放在网站的根目录下（如`https://yourbrand.com/llms.txt`），专门为AI大模型提供结构化的品牌信息摘要。

它的概念灵感来自`robots.txt`（告诉搜索引擎该爬什么）和`sitemap.xml`（告诉搜索引擎该索引什么），但LLMs.txt是专门为**AI大模型**设计的。


### LLMs.txt里写什么？

标准格式如下：

```
# 品牌名
> 一句话品牌描述，8-15个字

## 核心信息
- 成立于：2015年
- 总部：上海
- 核心产品：XX CRM系统
- 客户规模：5000+企业用户

## 核心能力
- 销售管理自动化
- 营销自动化
- 客户服务管理

## 常见问题
- 问：XX CRM适合什么规模的企业？
- 答：适合10-500人规模的中小企业

## 相关链接
- 官网：https://yourbrand.com
- 博客：https://yourbrand.com/blog
- 帮助中心：https://yourbrand.com/help
```


### LLMs.txt的GEO价值

**价值1：消除信息偏差。**
AI在没有LLMs.txt时，对你的品牌信息的来源可能是知乎、论坛、行业媒体——这些来源的信息可能不准确、过时、或者有偏差。

LLMs.txt让你**直接告诉AI**你希望它了解的关于你的一切——品牌名、核心产品、定位、关键数据。

**价值2：提升描述准确度。**
部署了LLMs.txt的品牌，AI在回答"XX公司是做什么的"时，描述准确率可以大幅提升。因为LLMs.txt是AI优先读取的"官方信息来源"。

**价值3：建立AI可见度的"基线"。**
当你做好其他GEO优化后，LLMs.txt是AI"验证"你对自身描述的参考标准。AI会对比你在任何"第三方"来源上的描述是否和你自己写的LLMs.txt一致——如果一致，信任度增加；如果不一致，信任度降低。


### LLMs.txt的部署建议

- 放在网站根目录
- 使用纯文本格式（不要用Markdown的扩展语法）
- 控制在500-1000字以内（AI会在有限Token内读取）
- 保持核心信息稳定，有变化时及时更新
- 用`llms.txt`也可以（放在`llms/`目录下）

---


## 二、Robots.txt：AI爬虫的"交通规则"


### Robots.txt的GEO角色变化

Robots.txt在传统SEO中的作用是"告诉搜索引擎爬虫该爬什么、不该爬什么"。

在GEO时代，Robots.txt的"读者"发生了变化——**不只是Googlebot在看，AI爬虫也在看。**

不同的AI平台有自己的爬虫：
- **ChatGPT / OpenAI** → `OAI-SearchBot`、`GPTBot`
- **Google AIO** → `Google-Extended`
- **Perplexity** → `PerplexityBot`
- **百度文心一言** → `Baidu` 系列爬虫
- **Kimi** → `KimiBot`


### Robots.txt应该怎么写？

**基础配置：允许所有AI爬虫抓取。**

```
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /
```

**进阶配置：选择性禁止。**

如果你有些页面不想被AI抓取（比如内部管理后台、测试页面）：

```
User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /test/

User-agent: PerplexityBot
Allow: /
Disallow: /admin/
```

**高级配置：针对不同AI爬虫差异化策略。**

不同的AI平台对内容的偏好不同，你可以根据策略决定是否开放内容给特定AI爬虫：

```
User-agent: GPTBot
Allow: /blog/
Allow: /products/
Disallow: /privacy/

User-agent: Google-Extended
Allow: /
```


### Robots.txt的GEO注意事项

**注意1：不要误封AI爬虫。**

有些网站的robots.txt配置比较严格，会"误伤"AI爬虫。比如：

```
User-agent: *
Disallow: /
```

这个规则会阻止所有爬虫（包括AI爬虫）抓取你的网站。除非你是故意的，否则这会让你的GEO从0开始。

**注意2：了解AI爬虫的"用户代理"名字。**

AI爬虫的用户代理名称不是标准化的，而且经常变化。建议定期检查AI平台官方文档，确认最新的爬虫名称。

**注意3：保持和sitemap.xml一致。**

你在robots.txt中允许AI爬虫抓取的页面，应该在sitemap.xml中有对应的URL。

---


## 三、LLMs.txt + Robots.txt + Sitemap.xml = AI友好的"配置三件套"

这三个文件共同构成了AI爬虫进入网站时的"引导系统"：

| 文件 | 功能 | AI如何使用 |
|------|------|-----------|
| **Robots.txt** | 告诉AI爬虫"能爬什么、不能爬什么" | 爬虫到达网站时，第一个读取的文件 |
| **Sitemap.xml** | 告诉AI爬虫"网站有哪些重要页面" | 爬虫决定"从哪些页面开始抓取" |
| **LLMs.txt** | 告诉AI大模型"品牌的核心信息是什么" | 大模型在回答品牌类问题时优先读取 |


### 三个文件的部署顺序

1. **先做Robots.txt**：确保AI爬虫能访问你的网站。这是"大门是否打开"的问题。
2. **再做Sitemap.xml**：确保AI爬虫能找到你的重要页面。这是"路线图是否清晰"的问题。
3. **最后做LLMs.txt**：确保AI大模型能直接获取你的品牌信息。这是"介绍信是否写好"的问题。


### 部署后的验证

部署完成后，需要做三件事验证效果：

1. **测试Robots.txt**：用`https://yourbrand.com/robots.txt`直接访问，确认配置正确
2. **测试Sitemap.xml**：用Google Search Console提交并检查
3. **测试LLMs.txt**：用ChatGPT等AI直接问"你知道XX品牌吗？"看AI的回答是否和LLMs.txt中的信息一致

---

LLMs.txt和Robots.txt都不需要品牌投入大量资源——它们只是两个纯文本文件，写完放在根目录就可以了。

但这两个文件决定了AI对你的"第一印象"。

Robots.txt决定AI能不能找到你的内容。
LLMs.txt决定AI知不知道你的核心信息。

**在开始任何复杂的GEO优化之前，先把这两个文件配置好。门开好了，路指好了，AI才会进来拜访你。**

---

**本章简介：** 从Schema结构化数据到AgenticGEO工具，七篇文章覆盖GEO技术栈全链路，帮你建立AI友好的技术基础设施。

------

**下一篇预告：实体识别与知识图谱对接。** AI是怎么"认出"你的品牌的？怎么让你的品牌在AI的知识图谱中拥有一个"正式身份"？

---

*本文是GEO知识全书系列的第21篇，共45篇。*
