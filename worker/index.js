/**
 * GEO Encyclopedia — AI Crawler Access Logger
 *
 * Sits in front of the static content of geo010.com.
 * 1. Classifies each request by User-Agent (AI crawler vs. human).
 * 2. Writes one row per HTML page request into D1.
 * 3. Serves /stats.html (rendered server-side, no client JS).
 * 4. Forwards everything else to raw.githubusercontent.com (serves the docs/
 *    files directly — this origin does not validate the Host header, unlike
 *    GitHub Pages, whose custom-domain routing requires Host: geo010.com).
 *
 * Note: Cloudflare Workers fetch() cannot override the Host header, and the
 * Host-header override via Origin Rules is an Enterprise-only feature, so a
 * direct GitHub Pages origin was not possible on the Free plan.
 */

const ORIGIN = 'https://raw.githubusercontent.com/daluge2021/geobook/main/docs';
const STATS_PATH = '/stats.html';
const MCP_PATH = '/.well-known/mcp';
const COMMENTS_API_PATH = '/api/comments';
const ADMIN_COMMENTS_PATH = '/admin/comments.html';
const CACHE_TTL = 300;

// Site search: a generated article index lives in worker/search-index.json in the
// same GitHub repo but outside docs/, so it is never exposed at geo010.com and
// cannot create duplicate-content for crawlers. The worker loads it on demand and
// caches it in Cloudflare's cache layer for CACHE_TTL seconds.
const SEARCH_PATH = '/api/search';
const SEARCH_INDEX_URL = 'https://raw.githubusercontent.com/daluge2021/geobook/main/worker/search-index.json';

// Site assistant chat: answers are produced locally from the FAQ rules below plus
// the generated article index (search-index.json). No external AI call is made.
const CHAT_PATH = '/api/chat';

// Comment pages must look like a real site page (/foo.html or /section/foo.html),
// never an API, admin, stats or well-known path.
const COMMENT_PAGE_RE = /^\/([a-z0-9-]+\.html|[a-z0-9-]+\/[a-z0-9-]+\.html)$/i;
const COMMENT_DENY = ['/stats.html', '/monitor.html', ADMIN_COMMENTS_PATH];
function isCommentablePage(p) {
  if (!COMMENT_PAGE_RE.test(p)) return false;
  if (COMMENT_DENY.includes(p)) return false;
  if (p.startsWith('/.well-known/') || p.startsWith('/api/') || p.startsWith('/admin/')) return false;
  return true;
}

const MCP_MANIFEST = {
  mcp_version: '1.0',
  server_name: 'GEO Encyclopedia',
  server_version: '1.0.0',
  description:
    'A static English-language knowledge base about Generative Engine Optimization (GEO). ' +
    'This site hosts no MCP tools, resources or prompts. Its content is fully readable by ' +
    'AI crawlers and licensed for citation; see https://geo010.com/llms.txt for the AI guide.',
  endpoints: {},
  capabilities: { tools: false, resources: false, prompts: false },
  documentation: 'https://geo010.com/llms.txt',
};

const AI_CRAWLERS = [
  { name: 'GPTBot', re: /GPTBot/i },
  { name: 'OAI-SearchBot', re: /OAI-SearchBot/i },
  { name: 'ChatGPT-User', re: /ChatGPT-User/i },
  { name: 'ClaudeBot', re: /ClaudeBot/i },
  { name: 'Claude-SearchBot', re: /Claude-SearchBot/i },
  { name: 'Claude-User', re: /Claude-User|claude-web/i },
  { name: 'anthropic-ai', re: /anthropic-ai/i },
  { name: 'PerplexityBot', re: /PerplexityBot/i },
  { name: 'Perplexity-User', re: /Perplexity-User/i },
  { name: 'Google-Extended', re: /Google-Extended/i },
  { name: 'Google-CloudVertexBot', re: /Google-CloudVertexBot/i },
  { name: 'Googlebot', re: /Googlebot/i },
  { name: 'Bingbot', re: /bingbot/i },
  { name: 'Applebot-Extended', re: /Applebot-Extended/i },
  { name: 'Applebot', re: /Applebot/i },
  { name: 'Amazonbot', re: /Amazonbot/i },
  { name: 'CCBot', re: /CCBot/i },
  { name: 'Meta-ExternalAgent', re: /meta-externalagent|Meta-ExternalAgent/i },
  { name: 'cohere-ai', re: /cohere-ai/i },
  { name: 'Bytespider', re: /Bytespider/i },
  { name: 'DuckAssistBot', re: /DuckAssistBot/i },
  { name: 'MistralAI', re: /MistralAI/i },
  { name: 'YouBot', re: /YouBot/i },
  { name: 'Grok', re: /Grok/i },
  { name: 'PhindBot', re: /PhindBot/i },
  { name: 'KagiBot', re: /KagiBot/i },
  { name: 'Diffbot', re: /Diffbot/i },
  { name: 'ai2bot', re: /ai2bot/i },
  { name: 'FacebookBot', re: /facebookexternalhit|Facebot/i },
];

const STATIC_EXT = /\.(ico|png|jpe?g|gif|svg|webp|css|js|json|xml|txt|woff2?|map|md)(\?.*)?$/i;

// AI 爬虫进入站点的关键入口文件。静态扩展默认不记录，但这些路径是 GEO 的
// 核心观测点（AI 是否读取 robots/llms/sitemap/feed/well-known），爬虫访问需单独记录。
const AI_ENTRY_FILES = new Set([
  '/llms.txt',
  '/robots.txt',
  '/sitemap.xml',
  '/feed.xml',
  '/summary.json',
  '/.well-known/ai.txt',
  '/.well-known/ai.json',
  '/.well-known/llms.txt',
  '/.well-known/ai-plugin.json',
  '/.well-known/openapi.json',
]);

// 站点安全响应头。raw.githubusercontent.com 附带的沙箱 CSP
// (default-src 'none'; sandbox) 会禁用页面全部脚本，必须删除；但删后要换成
// 允许内联脚本/样式与 51.la 的自定义 CSP，避免整站无 CSP 防护（防 XSS）。
// R1 约束：script-src 必须含 'unsafe-inline' 与 sdk.51.la，否则侧边栏折叠/
// 51.la 统计/评论前端会被禁用。
const CSP_HEADER = [
  "default-src 'none'",
  "script-src 'unsafe-inline' https://sdk.51.la",
  "style-src 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');
const SECURITY_HEADERS = {
  'Content-Security-Policy': CSP_HEADER,
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000',
};

/** 删除 raw 源的沙箱头，并应用站点自定义安全头。html=true 时附加 CSP。 */
function applySecurityHeaders(headers, html = true) {
  headers.delete('Content-Security-Policy');
  headers.delete('X-Frame-Options');
  if (html) headers.set('Content-Security-Policy', SECURITY_HEADERS['Content-Security-Policy']);
  headers.set('X-Frame-Options', SECURITY_HEADERS['X-Frame-Options']);
  headers.set('Referrer-Policy', SECURITY_HEADERS['Referrer-Policy']);
  headers.set('Permissions-Policy', SECURITY_HEADERS['Permissions-Policy']);
  headers.set('Strict-Transport-Security', SECURITY_HEADERS['Strict-Transport-Security']);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

function classifyCrawler(ua) {
  if (!ua) return null;
  for (const c of AI_CRAWLERS) {
    if (c.re.test(ua)) return c.name;
  }
  return null;
}

// Referral-source tracking. The DB schema predates the referer_host column, so we
// migrate it lazily: PRAGMA tells us the columns once, then we ALTER if missing.
let schemaChecked = false;
async function ensureRefererColumn(env) {
  if (schemaChecked) return;
  try {
    const { results } = await env.DB.prepare('PRAGMA table_info(crawler_logs)').all();
    const cols = (results || []).map((r) => r.name);
    if (!cols.includes('referer_host')) {
      await env.DB.prepare('ALTER TABLE crawler_logs ADD COLUMN referer_host TEXT').run();
    }
  } catch (e) {
    console.error('referer migration failed:', e.message);
  }
  schemaChecked = true;
}

/** Extract hostname from a Referer header, or null when absent/invalid/same-site. */
function refererHost(raw) {
  if (!raw) return null;
  try {
    const h = new URL(raw).hostname.toLowerCase();
    return h === 'geo010.com' || h === 'www.geo010.com' ? null : h;
  } catch (e) {
    return null;
  }
}

// ---------- Comments (Community) ----------

function json(obj, status = 200) {
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  applySecurityHeaders(headers, false);
  return new Response(JSON.stringify(obj), { status, headers });
}

function safeEq(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------- Site Search (/api/search?q=...) ----------

async function loadSearchIndex() {
  const res = await fetch(SEARCH_INDEX_URL, {
    headers: { 'User-Agent': 'geo010-crawler-log/1.0 (geo010.com site search)' },
    cf: { cacheEverything: true, cacheTtl: CACHE_TTL, cacheKey: SEARCH_INDEX_URL },
  });
  if (!res.ok) throw new Error('search index fetch ' + res.status);
  return res.json();
}

function tokenizeQuery(q) {
  return (q.toLowerCase().match(/[a-z0-9\u00e0-\u024f]+/g) || []).slice(0, 8);
}

function searchDocScore(doc, terms) {
  const title = (doc.title || '').toLowerCase();
  const summary = (doc.summary || '').toLowerCase();
  const text = (doc.text || '').toLowerCase();
  const hit = (s) => terms.filter((t) => s.includes(t)).length;
  return hit(title) * 60 + hit(summary) * 20 + hit(text) * 5;
}

function searchDocHit(doc, terms) {
  const hay = ((doc.title || '') + ' ' + (doc.summary || '') + ' ' + (doc.text || '')).toLowerCase();
  return terms.every((t) => hay.includes(t));
}

async function handleSearch(url) {
  const q = (url.searchParams.get('q') || '').trim();
  if (!q) return json({ error: 'Missing q parameter.' }, 400);
  const terms = tokenizeQuery(q);
  if (terms.length === 0) return json({ error: 'Invalid query.' }, 400);

  let index;
  try {
    index = await loadSearchIndex();
  } catch (e) {
    console.error('search index failed:', e.message);
    return json({ error: 'Search index unavailable.' }, 503);
  }

  const scored = [];
  for (const doc of index.docs || []) {
    if (!searchDocHit(doc, terms)) continue;
    scored.push({ doc, score: searchDocScore(doc, terms) });
  }
  scored.sort((a, b) => b.score - a.score);

  const hits = scored.slice(0, 12).map(({ doc }) => ({
    slug: doc.slug,
    title: doc.title,
    chapter: doc.chapter,
    url: 'https://geo010.com/' + doc.slug,
    summary: doc.summary,
  }));

  const res = json({ query: q, count: hits.length, hits });
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

// ---------- Site Assistant Chat (/api/chat) ----------
// Answers are assembled locally: FAQ intent matching first (bilingual), then a
// ranked lookup over the article index with a keyword-context snippet. Nothing is
// sent to a third party. Queries are logged anonymously (no IP) to D1.

const FAQS = [
  {
    en: [/\bgeo\b/, /generative engine optimization/],
    zh: ['什么是geo', 'geo是什么', 'geo 是什么', 'geo是什么？', '生成式引擎优化', 'geo的意思'],
    enText:
      'GEO (Generative Engine Optimization) is the practice of structuring and optimizing content so AI answer engines — ChatGPT, Perplexity, Google AI Overviews, Claude and similar — can find, understand and cite your brand when users ask questions. The encyclopedia covers it end to end; the definition article is the best place to start.',
    zhText:
      'GEO（Generative Engine Optimization，生成式引擎优化）是指优化你的内容，让 ChatGPT、Perplexity、Google AI Overviews、Claude 等 AI 回答引擎在用户提问时能找到、理解并引用你的品牌。知识库有完整体系，推荐从定义篇读起。',
    sources: [
      { title: 'What is GEO? (Glossary)', url: 'https://geo010.com/glossary/geo.html' },
      { title: 'What is GEO? — The Full Guide', url: 'https://geo010.com/fundamentals/what-is-geo.html' },
    ],
  },
  {
    en: [/llms\.txt/, /\bllms\b/, /for large language models/],
    zh: ['llms.txt', 'llms 文件', '站点摘要文件'],
    enText:
      'llms.txt is a plain-text file placed in the root of a site that lists the most important pages with short summaries — an orientation layer that helps AI crawlers and LLMs understand what the site covers, similar to how sitemap.xml helps search engines.',
    zhText:
      'llms.txt 是放在网站根目录的纯文本文件，用一小段文字列出站内最重要的页面——它像 sitemap.xml 之于搜索引擎那样，帮助 AI 爬虫和大模型快速了解你站点的结构与主题。',
    sources: [
      { title: 'LLMs.txt Guide', url: 'https://geo010.com/fundamentals/llms-txt-guide.html' },
      { title: 'What is LLMs.txt? (Glossary)', url: 'https://geo010.com/glossary/llms-txt.html' },
    ],
  },
  {
    en: [/seo dead/, /seo vs geo/, /is seo/, /difference between seo/, /seo and geo/],
    zh: ['seo死了', 'seo已死', 'seo和geo', 'seo与geo', 'seo vs geo', 'seo区别'],
    enText:
      'SEO is not dead. GEO and SEO overlap and compound: the technical SEO basics remain prerequisites, while GEO adds answer-engine-specific signals such as question H2s, structured data and llms.txt for being cited inside AI answers.',
    zhText:
      'SEO 并没有死。GEO 与 SEO 是重叠且相互放大的关系：技术 SEO 基本功仍是一切的前提，GEO 在此之上叠加针对回答引擎的信号（问题式小标题、结构化数据、llms.txt），让 AI 在答案里引用你。',
    sources: [
      { title: 'Is SEO Dead?', url: 'https://geo010.com/fundamentals/seo-vs-geo.html' },
    ],
  },
  {
    en: [/citation share/, /citation/],
    zh: ['引用占比', '引用份额', 'citation share', '引用率'],
    enText:
      'Citation share is the share of AI-generated answers in your market that cite your brand as a source — the core GEO performance metric. It is typically measured by polling key questions across answer engines (ChatGPT, Perplexity, Google AI Overviews, Copilot) and counting how often your brand appears as a reference.',
    zhText:
      '引用占比（citation share）指在你的目标市场里，AI 生成的回答中引用你的品牌作为来源的比例——这是 GEO 最核心的绩效指标。通常做法是：在 ChatGPT、Perplexity、Google AI Overviews、Copilot 等引擎上反复提问关键问题，统计你的品牌被引用为来源的次数占比。',
    sources: [
      { title: 'Citation Share — Metrics', url: 'https://geo010.com/metrics/citation-share.html' },
      { title: 'Track AI Citations — Technical', url: 'https://geo010.com/technical/track-ai-citations.html' },
    ],
  },
  {
    en: [/entity density/, /entity/],
    zh: ['实体密度', 'entity density', '实体'],
    enText:
      'Entity density measures how many unique, meaningful named entities appear in content relative to word count (typically per 1,000 words), and how clearly they are connected. Higher entity density helps AI engines map your content to a topic graph and cite it with confidence.',
    zhText:
      '实体密度（entity density）衡量内容中出现的独特、有意义的命名实体数量（通常按每 1000 词计数），以及这些实体间的关联是否清晰。实体密度越高，AI 引擎越容易把你的内容映射进主题图谱并放心引用。',
    sources: [
      { title: 'Entity Density — Metrics', url: 'https://geo010.com/metrics/entity-density.html' },
    ],
  },
  {
    en: [/schema/, /structured data/, /json-ld/],
    zh: ['结构化数据', 'schema', 'json-ld', 'jsonld', '微数据'],
    enText:
      'Structured data is machine-readable markup (JSON-LD with Schema.org vocabulary) that describes what each page means. Markup such as Article, FAQPage, Organization and BreadcrumbList lets AI engines extract clean, confident facts instead of guessing — it is a core GEO trust signal.',
    zhText:
      '结构化数据是机器可读的标记（基于 Schema.org 词表的 JSON-LD），用来描述每个页面的含义。Article、FAQPage、Organization、BreadcrumbList 等标记让 AI 引擎能直接提取干净可信的事实而不是去猜——这是 GEO 的重要信任信号。',
    sources: [
      { title: 'Schema Markup Guide', url: 'https://geo010.com/technical/schema-markup-guide.html' },
      { title: 'What is JSON-LD?', url: 'https://geo010.com/community/what-is-json-ld.html' },
    ],
  },
  {
    en: [/e-?e-?a-?t/, /experience.*expertise/, /expertise.*authoritative/],
    zh: ['eeat', 'e-e-a-t', '经验', '专业知识', '权威'],
    enText:
      'E-E-A-T stands for Experience, Expertise, Authoritativeness and Trust — the quality framework (rooted in Googles search quality guidelines) that shapes how much credibility AI engines assign to a source. High E-E-A-T means authorship, citations, primary data and transparent sourcing.',
    zhText:
      'E-E-A-T 是 Experience（经验）、Expertise（专业度）、Authoritativeness（权威性）、Trust（可信度）四要素，源于 Google 搜索质量指南的质量框架。AI 引擎会据此判断一个来源的可信度，高 E-E-A-T 意味着署名清楚、引用来源、有一手数据、来源透明。',
    sources: [
      { title: 'E-E-A-T in GEO', url: 'https://geo010.com/content/eeat-in-geo.html' },
      { title: 'E-E-A-T Trust Mechanism', url: 'https://geo010.com/fundamentals/eeat-trust-mechanism.html' },
    ],
  },
  {
    en: [/how.*(start|begin).*geo/, /start(ing)? with geo/, /roadmap/, /from zero/, /get started/],
    zh: ['怎么开始', '如何开始', '从零开始', '开启', '入门', '新手', '第一步', 'roadmap', '路线图', '检查清单', 'checklist'],
    enText:
      'The fastest path: audit your current AI visibility, fix crawlability and orientation (robots.txt, llms.txt, sitemap), add structured data, create question-driven answer content, then measure citation share and iterate. The GEO Quick Start checklist can be done in 15 minutes.',
    zhText:
      '最快路径：先审计当前 AI 可见度，修复可抓取性与"自我介绍"（robots.txt、llms.txt、sitemap），加结构化数据，创作问题驱动的回答型内容，然后测量引用占比并迭代。15 分钟的 GEO Quick Start 检查清单可以直接上手。',
    sources: [
      { title: 'GEO Quick Start Checklist', url: 'https://geo010.com/fundamentals/geo-quick-start-checklist.html' },
      { title: 'Zero to One GEO Roadmap', url: 'https://geo010.com/cases/zero-to-one-roadmap.html' },
    ],
  },
  {
    en: [/monitor/, /measure.*(ai|crawler|crawl)/, /track.*(ai|crawler)/, /stats/, /analytics/],
    zh: ['监控', '统计', '数据分析', '跟踪抓捕', '怎么测量', '怎么看数据', '爬虫数据'],
    enText:
      'You can monitor AI visibility in two ways: (1) AI crawler analytics — Bing Webmaster Tools is the only major free source of AI citation-share data, since Bing powers Copilot, ChatGPT search and Perplexity; (2) direct answer polling across engines to count citations.',
    zhText:
      '监控 AI 可见度有两条路径：(1) AI 爬虫统计——由于 Bing 是 Copilot、ChatGPT 搜索和 Perplexity 的后端，Bing Webmaster Tools 是唯一免费提供引用数据的主流工具；(2) 在各引擎直接答题轮询，统计引用次数。',
    sources: [
      { title: 'AI Crawler Management', url: 'https://geo010.com/technical/ai-crawler-management.html' },
      { title: 'Track AI Citations', url: 'https://geo010.com/technical/track-ai-citations.html' },
    ],
  },
  {
    en: [/contact|email|reach you|get in touch/],
    zh: ['联系', '邮箱', '联系方式', '发邮件', '合作'],
    enText:
      'You can reach the GEO Encyclopedia team via the contact page.',
    zhText: '你可以通过 contact 页面联系 GEO Encyclopedia 团队。',
    sources: [
      { title: 'Contact', url: 'https://geo010.com/contact.html' },
    ],
  },
];

const CHAT_SUGGESTIONS = [
  'What is GEO?',
  'What is llms.txt?',
  'How do I measure citation share?',
  'How do I start GEO from zero?',
];

function langOf(q) {
  const cjk = (q.match(/[\u4e00-\u9fff]/g) || []).length;
  // Any meaningful CJK presence (>= 2 characters) counts as Chinese-language mode,
  // so mixed queries like "llms.txt 是什么" answer in Chinese.
  return cjk >= 2 ? 'zh' : 'en';
}

// Latin tokens + CJK blocks, so a Chinese query keeps its recognizable English terms.
function tokenizeMixed(q) {
  const lower = q.toLowerCase();
  const tokens = [];
  for (const m of lower.match(/[a-z0-9\u00e0-\u024f]{2,}/g) || []) tokens.push(m);
  for (const c of lower.match(/[\u4e00-\u9fff]{2,}/g) || []) tokens.push(c);
  return tokens.filter((t) => t !== 'geo').slice(0, 10);
}

// For chat we deliberately use a loose match: any query term hitting a doc counts
// (stopwords dropped), so an open-ended question still surfaces relevant articles.
const CHAT_STOPWORDS = new Set([
  'what', 'which', 'when', 'where', 'who', 'why', 'how', 'is', 'do', 'does',
  'the', 'a', 'an', 'to', 'of', 'in', 'on', 'for', 'and', 'or', 'with', 'at',
  'from', 'can', 'i', 'you', 'your', 'my', 'me', 'it', 'its', 'this', 'that',
  'about', 'much', 'many', 'not', 'no', 'are', 'was', 'were', 'as', 'be', 'by',
]);

function chatDocHits(doc, terms) {
  const use = terms.filter((t) => !CHAT_STOPWORDS.has(t));
  const list = use.length ? use : terms;
  const title = (doc.title || '').toLowerCase();
  const summary = (doc.summary || '').toLowerCase();
  const text = (doc.text || '').toLowerCase();
  let hits = 0;
  for (const t of list) {
    if (title.includes(t)) hits += 4;
    else if (summary.includes(t)) hits += 2;
    else if (text.includes(t)) hits += 1;
  }
  return { hits, rank: hits, list };
}

function snippetFor(doc, terms, lang) {
  const text = doc.text || '';
  if (lang === 'en') {
    const lower = text.toLowerCase();
    for (const t of terms) {
      const i = lower.indexOf(t);
      if (i === -1) continue;
      const start = Math.max(0, i - 90);
      const end = Math.min(text.length, i + t.length + 150);
      return text.slice(start, end).replace(/\s+/g, ' ').trim() + '…';
    }
  }
  const s = (doc.summary || '').trim();
  return s.length > 260 ? s.slice(0, 260) + '…' : s;
}

function chatReply(payload) {
  const res = json(payload);
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

let chatTableChecked = false;
async function ensureChatTable(env) {
  if (chatTableChecked) return;
  try {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS chat_queries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ts TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
        q TEXT NOT NULL,
        hits INTEGER NOT NULL DEFAULT 0
      )`
    ).run();
  } catch (e) {
    console.error('chat table init failed:', e.message);
  }
  chatTableChecked = true;
}

// Simple per-IP in-memory rate limit (no identity stored on disk — stays anonymous).
const chatRate = new Map();
function chatRateLimited(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const now = Date.now();
  const arr = (chatRate.get(ip) || []).filter((t) => now - t < 60000);
  if (arr.length >= 5) {
    chatRate.set(ip, arr);
    return true;
  }
  arr.push(now);
  chatRate.set(ip, arr);
  if (chatRate.size > 20000) chatRate.clear();
  return false;
}

async function handleChat(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  const q = String(data.q || '').trim();
  if (q.length < 3 || q.length > 300) {
    return json({ error: 'Please ask a question between 3 and 300 characters.' }, 400);
  }
  if (chatRateLimited(request)) {
    return json({ error: 'Too many questions — please wait a moment.' }, 429);
  }

  const lang = langOf(q);
  const lower = q.toLowerCase();

  // 1) FAQ intent match (bilingual answers)
  for (const f of FAQS) {
    const enHit = f.en.some((re) => re.test(lower));
    const zhHit = f.zh.some((k) => lower.includes(k));
    if (enHit || zhHit) {
      await logChat(env, q, 1);
      return chatReply({
        type: 'faq',
        lang,
        text: lang === 'zh' ? f.zhText : f.enText,
        sources: f.sources,
      });
    }
  }

  // 2) Ranked lookup over the article index with a keyword-context snippet
  let index;
  try {
    index = await loadSearchIndex();
  } catch (e) {
    console.error('chat index failed:', e.message);
    await logChat(env, q, 0);
    return chatReply({
      type: 'error',
      lang,
      text:
        lang === 'zh'
          ? '知识库暂时不可用（索引加载失败），请稍后再试。'
          : 'The knowledge index is temporarily unavailable — please try again in a moment.',
      sources: [],
    });
  }

  const terms = tokenizeMixed(q);
  const ranked = [];
  for (const doc of index.docs || []) {
    const { hits, rank, list } = chatDocHits(doc, terms);
    if (hits > 0) ranked.push({ doc, score: rank, terms: list });
  }
  ranked.sort((a, b) => b.score - a.score);
  const top = ranked.slice(0, 3);

  // 3) Anonymized log (no IP) with the hit count for content-idea analytics
  await logChat(env, q, top.length);

  if (top.length === 0) {
    const zhText =
      '我目前在英文知识库中最接近你的问题。建议用这些英文问题重新提问，能拿到直接答案：';
    const enText =
      'I could not find a direct match in the encyclopedia. Try one of these questions:';
    return chatReply({
      type: 'guide',
      lang,
      text: lang === 'zh' ? zhText : enText,
      sources: CHAT_SUGGESTIONS.map((s) => ({ title: s, url: '' })),
      suggestions: true,
    });
  }

  return chatReply({
    type: 'answer',
    lang,
    text:
      lang === 'zh'
        ? '我为你匹配到知识库中相关的内容（站点内容为英文，以下为摘要）：'
        : 'Here is what the encyclopedia says:',
    sources: top.map(({ doc, terms }) => ({
      title: doc.title,
      url: 'https://geo010.com/' + doc.slug,
      chapter: doc.chapter,
      snippet: snippetFor(doc, terms, lang),
    })),
  });
}

async function logChat(env, q, hits) {
  try {
    await ensureChatTable(env);
    await env.DB.prepare('INSERT INTO chat_queries (q, hits) VALUES (?, ?)')
      .bind(q.slice(0, 300), hits)
      .run();
  } catch (e) {
    console.error('chat log failed:', e.message);
  }
}

let commentsChecked = false;
async function ensureCommentsTable(env) {
  if (commentsChecked) return;
  try {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        page TEXT NOT NULL,
        author TEXT NOT NULL,
        email TEXT,
        body TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        ts TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
        ip TEXT
      )`
    ).run();
  } catch (e) {
    console.error('comments table init failed:', e.message);
  }
  commentsChecked = true;
}

async function handleCommentPost(request, env) {
  await ensureCommentsTable(env);
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json({ error: 'Invalid JSON body.' }, 400);
  }
  const page = String(data.page || '').trim();
  const author = String(data.author || '').trim();
  const email = String(data.email || '').trim();
  const body = String(data.body || '').trim();

  if (!isCommentablePage(page)) return json({ error: 'Comments are only accepted on site pages.' }, 400);
  if (!author || author.length > 40) return json({ error: 'Please enter a name (max 40 characters).' }, 400);
  if (body.length < 2 || body.length > 1000) return json({ error: 'Message must be 2–1000 characters.' }, 400);
  if (/<[a-z/!][^>]*>/i.test(body)) return json({ error: 'HTML is not allowed in comments.' }, 400);
  if (email && (email.length > 80 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    return json({ error: 'Invalid email address.' }, 400);
  }

  const ip =
    request.headers.get('CF-Connecting-IP') ||
    (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown';

  const recent = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM comments WHERE ip = ? AND ts > datetime('now', '-5 minutes')`
  )
    .bind(ip)
    .first();
  if ((recent?.n || 0) >= 1) {
    return json({ error: 'Please wait a few minutes before posting again.' }, 429);
  }

  try {
    await env.DB.prepare(
      `INSERT INTO comments (page, author, email, body, status, ip) VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(page, author, email || null, body, 'pending', ip)
      .run();
  } catch (e) {
    console.error('comment insert failed:', e.message);
    return json({ error: 'Could not save your comment.' }, 500);
  }
  return json({ ok: true, message: 'Thanks! Your comment is awaiting approval.' });
}

async function handleCommentsApi(request, env) {
  if (request.method === 'POST') return handleCommentPost(request, env);
  await ensureCommentsTable(env);
  const url = new URL(request.url);
  const params = url.searchParams;

  const action = params.get('action');
  if (action) return handleAdminAction(params, env);

  const page = params.get('page') || '';
  if (!page) return json({ error: 'Missing page.' }, 400);
  const { results } = await env.DB.prepare(
    `SELECT id, author, substr(ts, 1, 10) AS date, body
     FROM comments WHERE page = ? AND status = 'approved'
     ORDER BY id ASC`
  )
    .bind(page)
    .all();
  return json({ comments: results || [] });
}

async function handleAdminAction(params, env) {
  const key = params.get('key') || '';
  if (!env.COMMENTS_ADMIN_KEY || !safeEq(key, env.COMMENTS_ADMIN_KEY)) {
    return json({ error: 'Forbidden.' }, 403);
  }
  const action = params.get('action');
  const id = parseInt(params.get('id') || '', 10);
  if (!id) return json({ error: 'Missing id.' }, 400);
  if (action === 'approve') {
    await env.DB.prepare(`UPDATE comments SET status = 'approved' WHERE id = ?`).bind(id).run();
  } else if (action === 'delete') {
    await env.DB.prepare(`UPDATE comments SET status = 'deleted' WHERE id = ?`).bind(id).run();
  } else {
    return json({ error: 'Unknown action.' }, 400);
  }
  return json({ ok: true });
}

async function handleAdminComments(request, env) {
  await ensureCommentsTable(env);
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!env.COMMENTS_ADMIN_KEY || !safeEq(key, env.COMMENTS_ADMIN_KEY)) {
    const headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
    applySecurityHeaders(headers, false);
    return new Response('Forbidden', { status: 403, headers });
  }
  const [pending, recent] = await Promise.all([
    env.DB.prepare(
      `SELECT id, page, author, substr(ts,1,16) AS date, body FROM comments WHERE status = 'pending' ORDER BY id DESC`
    ).all(),
    env.DB.prepare(
      `SELECT id, page, author, status, substr(ts,1,16) AS date FROM comments ORDER BY id DESC LIMIT 50`
    ).all(),
  ]);
  const pendingRows = (pending?.results || [])
    .map(
      (r) =>
        `<tr><td>${r.id}</td><td>${escapeHtml(r.page)}</td><td>${escapeHtml(r.author)}</td><td>${r.date}</td><td>${escapeHtml(r.body)}</td><td><a href="/api/comments?action=approve&amp;id=${r.id}&amp;key=${encodeURIComponent(key)}">Approve</a> · <a href="/api/comments?action=delete&amp;id=${r.id}&amp;key=${encodeURIComponent(key)}">Delete</a></td></tr>`
    )
    .join('') || '<tr><td colspan="6">No pending comments.</td></tr>';
  const recentRows = (recent?.results || [])
    .map(
      (r) =>
        `<tr><td>${r.id}</td><td>${escapeHtml(r.page)}</td><td>${escapeHtml(r.author)}</td><td>${escapeHtml(r.status)}</td><td>${r.date}</td></tr>`
    )
    .join('') || '<tr><td colspan="5">No comments yet.</td></tr>';

  return new Response(
    `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="robots" content="noindex, nofollow">
<title>Comments Admin — GEO Encyclopedia</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif; background: #f5f5f5; line-height: 1.7; color: #222; }
.main { max-width: 1000px; margin: 0 auto; padding: 32px 20px; }
h1 { font-size: 24px; margin-bottom: 8px; }
h2 { font-size: 18px; margin: 28px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #4fc3f7; }
table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; font-size: 14px; }
th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #eee; vertical-align: top; }
th { background: #1a1a2e; color: #fff; }
tr.alt td { background: #f8f9fb; }
a { color: #0066cc; }
.sub { color: #666; font-size: 14px; margin-bottom: 20px; }
</style>
</head>
<body>
<div class="main">
<h1>Comments Admin</h1>
<p class="sub">geo010.com · moderation queue</p>
<h2>Pending (${(pending?.results || []).length})</h2>
<table><tr><th>ID</th><th>Page</th><th>Author</th><th>Date</th><th>Body</th><th>Action</th></tr>${pendingRows}</table>
<h2>Recent 50</h2>
<table><tr><th>ID</th><th>Page</th><th>Author</th><th>Status</th><th>Date</th></tr>${recentRows}</table>
</div>
</body>
</html>`,
    {
      headers: (() => {
        const h = new Headers({ 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
        applySecurityHeaders(h, true);
        return h;
      })(),
    }
  );
}

async function logRequest(env, { ts, ua, crawler, path, status, isHtml, refHost }) {
  try {
    await env.DB.prepare(
      `INSERT INTO crawler_logs (ts, date, ua, crawler_name, path, status, is_html, referer_host)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(ts, ts.slice(0, 10), ua, crawler, path, status, isHtml ? 1 : 0, refHost || null)
      .run();
  } catch (e) {
    // logging must never break the site
    console.error('log insert failed:', e.message);
  }
}

function renderStatsPage(data) {
  const { totals, byCrawler, byDate, byDateDaily, byPath, byReferrer, byClickPath, byEntry, recent } = data;
  const rows = (arr) =>
    arr
      .map(
        (r, i) =>
          `<tr${i % 2 ? ' class="alt"' : ''}><td>${r.label}</td><td>${r.n}</td></tr>`
      )
      .join('');
  // 按天细分：总 = AI + 非 AI；点击仅计 referer 非空调试来源
  const dailyRows = (arr) =>
    arr
      .map((r, i) => {
        const total = r.total || 0;
        const ai = r.ai || 0;
        const clicks = r.clicks || 0;
        return (
          `<tr${i % 2 ? ' class="alt"' : ''}>` +
          `<td>${r.label}</td><td>${total}</td><td>${ai}</td><td>${total - ai}</td>` +
          `<td>${clicks}</td><td>${total ? Math.round((ai / total) * 100) : 0}%</td></tr>`
        );
      })
      .join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>AI Crawler Log — GEO Encyclopedia</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", sans-serif; background: #f5f5f5; line-height: 1.9; color: #222; }
.layout { display: flex; max-width: 1100px; margin: 0 auto; min-height: 100vh; }
.main { flex: 1; }
.content { max-width: 800px; margin: 0 auto; padding: 40px 24px; }
h1 { font-size: 26px; margin-bottom: 8px; }
h2 { font-size: 20px; margin: 28px 0 10px; padding-bottom: 6px; border-bottom: 2px solid #4fc3f7; }
.sub { color: #666; margin-bottom: 20px; font-size: 14px; }
.card { background: #fff; border-radius: 8px; padding: 20px 24px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
.kpis { display: flex; gap: 16px; flex-wrap: wrap; }
.kpi { flex: 1; min-width: 150px; background: #1a1a2e; color: #fff; border-radius: 8px; padding: 18px; text-align: center; }
.kpi .num { font-size: 30px; font-weight: 700; color: #4fc3f7; }
.kpi .lbl { font-size: 13px; opacity: .85; }
table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; }
th, td { padding: 8px 12px; text-align: left; border-bottom: 1px solid #eee; font-size: 14px; }
th { background: #1a1a2e; color: #fff; }
tr.alt td { background: #f8f9fb; }
.footer { color: #999; font-size: 12px; margin-top: 30px; text-align: center; }
a { color: #0066cc; }
</style>
</head>
<body>
<div class="layout">
  <div class="main">
    <div class="content">
      <h1>AI Crawler Access Log</h1>
      <p class="sub">geo010.com · 爬虫与请求抓取统计（仅供内部查看）</p>

      <div class="kpis">
        <div class="kpi"><div class="num">${totals.total}</div><div class="lbl">总请求</div></div>
        <div class="kpi"><div class="num">${totals.ai}</div><div class="lbl">AI 爬虫请求</div></div>
        <div class="kpi"><div class="num">${totals.aiPct}%</div><div class="lbl">AI 占比</div></div>
        <div class="kpi"><div class="num">${totals.clicks}</div><div class="lbl">外部来源点击</div></div>
      </div>

      <h2>按爬虫统计</h2>
      <div class="card"><table>
        <tr><th>爬虫</th><th>请求数</th></tr>
        ${rows(byCrawler)}
      </table></div>

      <h2>按日期统计</h2>
      <div class="card"><table>
        <tr><th>日期</th><th>请求数</th></tr>
        ${rows(byDate)}
      </table></div>

      <h2>按日期细分（总 / AI / 非 AI / 点击）</h2>
      <div class="card"><table>
        <tr><th>日期</th><th>总请求</th><th>AI</th><th>非 AI</th><th>点击</th><th>AI 占比</th></tr>
        ${dailyRows(byDateDaily)}
      </table></div>

      <h2>热门被抓取页面</h2>
      <div class="card"><table>
        <tr><th>路径</th><th>请求数</th></tr>
        ${rows(byPath)}
      </table></div>

      <h2>AI 入口文件访问（llms/robots/sitemap/feed/well-known）</h2>
      <div class="card"><table>
        <tr><th>路径</th><th>AI 爬虫访问数</th></tr>
        ${rows(byEntry)}
      </table></div>

      <h2>外部来源点击 Top</h2>
      <div class="card"><table>
        <tr><th>来源域名</th><th>点击数</th></tr>
        ${rows(byReferrer)}
      </table></div>

      <h2>被点击页面 Top（最近 7 天）</h2>
      <div class="card"><table>
        <tr><th>路径</th><th>点击数</th></tr>
        ${rows(byClickPath)}
      </table></div>

      <h2>最近 20 条记录</h2>
      <div class="card"><table>
        <tr><th>时间</th><th>爬虫</th><th>路径</th><th>状态</th><th>来源</th></tr>
        ${recent
          .map(
            (r) =>
              `<tr><td>${r.ts}</td><td>${r.crawler_name || r.ua || '—'}</td><td>${r.path}</td><td>${r.status}</td><td>${r.referer_host || '—'}</td></tr>`
          )
          .join('')}
      </table></div>

      <p class="footer">GEO Encyclopedia · private stats endpoint</p>
    </div>
  </div>
</div>
</body>
</html>`;
}

async function handleStats(env) {
  await ensureRefererColumn(env);
  const entryPlaceholders = [...AI_ENTRY_FILES].map(() => '?').join(',');
  const [totals, byCrawler, byDate, byDateDaily, byPath, byReferrer, byClickPath, byEntry, recent] = await Promise.all([
    env.DB.prepare(
      `SELECT COUNT(*) AS total,
              SUM(CASE WHEN crawler_name IS NOT NULL THEN 1 ELSE 0 END) AS ai,
              SUM(CASE WHEN referer_host IS NOT NULL THEN 1 ELSE 0 END) AS clicks
       FROM crawler_logs`
    ).first(),
    env.DB.prepare(
      `SELECT crawler_name AS label, COUNT(*) AS n FROM crawler_logs
       WHERE crawler_name IS NOT NULL
       GROUP BY crawler_name ORDER BY n DESC LIMIT 30`
    ).all(),
    env.DB.prepare(
      `SELECT date AS label, COUNT(*) AS n FROM crawler_logs
       GROUP BY date ORDER BY date DESC LIMIT 30`
    ).all(),
    env.DB.prepare(
      `SELECT date AS label,
              COUNT(*) AS total,
              SUM(CASE WHEN crawler_name IS NOT NULL THEN 1 ELSE 0 END) AS ai,
              SUM(CASE WHEN referer_host IS NOT NULL AND referer_host != '' THEN 1 ELSE 0 END) AS clicks
       FROM crawler_logs
       GROUP BY date ORDER BY date DESC LIMIT 14`
    ).all(),
    env.DB.prepare(
      `SELECT path AS label, COUNT(*) AS n FROM crawler_logs
       GROUP BY path ORDER BY n DESC LIMIT 30`
    ).all(),
    env.DB.prepare(
      `SELECT referer_host AS label, COUNT(*) AS n FROM crawler_logs
       WHERE referer_host IS NOT NULL AND referer_host != ''
       GROUP BY referer_host ORDER BY n DESC LIMIT 30`
    ).all(),
    env.DB.prepare(
      `SELECT path AS label, COUNT(*) AS n FROM crawler_logs
       WHERE referer_host IS NOT NULL AND referer_host != ''
         AND date >= date('now', '-7 days')
       GROUP BY path ORDER BY n DESC LIMIT 30`
    ).all(),
    env.DB.prepare(
      `SELECT path AS label, COUNT(*) AS n FROM crawler_logs
       WHERE crawler_name IS NOT NULL AND path IN (${entryPlaceholders})
       GROUP BY path ORDER BY n DESC LIMIT 30`
    )
      .bind(...AI_ENTRY_FILES)
      .all(),
    env.DB.prepare(
      `SELECT ts, crawler_name, ua, path, status, referer_host FROM crawler_logs
       ORDER BY id DESC LIMIT 20`
    ).all(),
  ]);

  const total = totals?.total || 0;
  const ai = totals?.ai || 0;
  const clicks = totals?.clicks || 0;
  const data = {
    totals: { total, ai, clicks, aiPct: total ? Math.round((ai / total) * 100) : 0 },
    byCrawler: byCrawler?.results || [],
    byDate: byDate?.results || [],
    byDateDaily: byDateDaily?.results || [],
    byPath: byPath?.results || [],
    byReferrer: byReferrer?.results || [],
    byClickPath: byClickPath?.results || [],
    byEntry: byEntry?.results || [],
    recent: recent?.results || [],
  };
  return new Response(renderStatsPage(data), {
    headers: (() => {
      const h = new Headers({
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      });
      applySecurityHeaders(h, true);
      return h;
    })(),
  });
}

/** Normalize a URL path, blocking traversal. Returns null if unsafe. */
function sanitizePath(raw) {
  let p;
  try {
    p = decodeURIComponent(raw);
  } catch (e) {
    return null;
  }
  if (p === '' || p === '/') return '/index.html';
  const segs = p.split('/').filter((s) => s !== '');
  for (const s of segs) {
    if (s === '.' || s === '..') return null;
  }
  return '/' + segs.join('/');
}

// 敏感路径探测防护：常见的 secret/config 字典扫描路径一律不转发源站。
// 命中即 404（保持与源站一致的外观，不暴露拦截意图）。
const SUSPICIOUS_PATH_RE =
  /\.(env|git|svn|bak|old|log|ini|conf|cfg|config|yaml|yml|json|sql|sh|py|key|pem|crt|tfstate)(\.|$)|\.(git|svn|hg)\/|\.aws\/|\.ssh\/|\.npmrc|\.boto|\.s3cfg|\.rclone\.conf|wp-(admin|login|json|content)|xmlrpc\.php|(^|\/)\.env(\b|\.)|settings\.py|web\.config|terraform|composer\.lock|\.env\.|storage\/logs|(^|\/)server\.key|graphql(\b|$)/i;

function isSuspiciousPath(p) {
  if (SUSPICIOUS_PATH_RE.test(p)) return true;
  return false;
}

function contentTypeFor(path) {
  const idx = path.lastIndexOf('.');
  if (idx === -1) return 'application/octet-stream';
  return MIME[path.slice(idx).toLowerCase()] || 'application/octet-stream';
}

async function fetchFile(path) {
  const url = ORIGIN + path;
  const init = {
    headers: { 'User-Agent': 'geo010-crawler-log/1.0 (geo010.com private stats)' },
    cf: { cacheEverything: true, cacheTtl: CACHE_TTL, cacheKey: url },
  };
  let res = await fetch(url, init);
  let served = path;
  // Friendly URL fallback: /foo -> /foo.html
  if (res.status === 404 && !path.includes('.')) {
    const alt = ORIGIN + path + '.html';
    res = await fetch(alt, {
      ...init,
      cf: { cacheEverything: true, cacheTtl: CACHE_TTL, cacheKey: alt },
    });
    if (res.status === 200) served = path + '.html';
  }
  return { res, served };
}

// Assistant chat widget, injected into every ordinary HTML page before </body>.
// The site CSP allows inline scripts/styles (no 'self'), so the widget is fully
// inlined — no external asset, no changes to any static page needed.
const ASSISTANT_WIDGET = `
<div id="geo-assistant" style="position:fixed;bottom:16px;right:16px;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Noto Sans SC','Microsoft YaHei',sans-serif;line-height:1.6;">
<style>
#geo-assistant *{box-sizing:border-box;margin:0;padding:0}
#ga-fab{width:56px;height:56px;border-radius:50%;border:none;cursor:pointer;background:#1a1a2e;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 14px rgba(0,0,0,.25);transition:transform .15s}
#ga-fab:hover{transform:scale(1.06)}
#ga-panel{position:fixed;bottom:84px;right:16px;width:340px;max-width:calc(100vw - 32px);height:440px;max-height:calc(100vh - 120px);background:#fff;border-radius:14px;box-shadow:0 8px 30px rgba(0,0,0,.25);display:none;flex-direction:column;overflow:hidden;border:1px solid #eee}
#geo-assistant.open #ga-panel{display:flex}
#ga-head{background:#1a1a2e;color:#fff;padding:12px 16px;display:flex;align-items:center;justify-content:space-between}
#ga-head b{font-size:14px}
#ga-close{background:none;border:none;color:#ccc;font-size:18px;cursor:pointer;padding:0 4px}
#ga-msgs{flex:1;overflow-y:auto;padding:14px;background:#f5f5f5}
.ga-msg{max-width:86%;margin-bottom:10px;padding:9px 12px;border-radius:12px;font-size:13.5px;word-break:break-word;white-space:pre-wrap}
.ga-msg.user{background:#1a1a2e;color:#fff;margin-left:auto;border-bottom-right-radius:3px}
.ga-msg.bot{background:#fff;color:#222;box-shadow:0 1px 2px rgba(0,0,0,.08);border-bottom-left-radius:3px}
.ga-msg .ga-src{display:block;margin-top:6px;border-top:1px solid #eee;padding-top:6px}
.ga-msg .ga-src a{color:#0066cc;font-size:12.5px;text-decoration:none}
.ga-msg .ga-src a:hover{text-decoration:underline}
.ga-msg .ga-src .ga-snip{color:#666;font-size:12px;margin-top:2px}
.ga-chip{display:inline-block;background:#fff;border:1px solid #4fc3f7;color:#1a1a2e;border-radius:16px;padding:5px 12px;font-size:12.5px;cursor:pointer;margin:0 6px 6px 0;transition:background .15s}
.ga-chip:hover{background:#e3f5ff}
#ga-inputrow{display:flex;gap:8px;padding:10px;border-top:1px solid #eee;background:#fff}
#ga-input{flex:1;border:1px solid #ddd;border-radius:18px;padding:9px 14px;font-size:13.5px;outline:none}
#ga-input:focus{border-color:#4fc3f7}
#ga-send{border:none;border-radius:18px;padding:9px 16px;background:#1a1a2e;color:#fff;font-size:13.5px;cursor:pointer}
#ga-send:hover{background:#0066cc}
@media (max-width:768px){#ga-panel{width:100vw;max-width:100vw;bottom:0;right:0;height:70vh;max-height:70vh;border-radius:14px 14px 0 0}}
</style>
<div id="ga-panel" role="dialog" aria-label="GEO assistant">
<div id="ga-head"><b>GEO Assistant</b><button id="ga-close" aria-label="Close">×</button></div>
<div id="ga-msgs"></div>
<div id="ga-actions" style="padding:0 12px;background:#f5f5f5"></div>
<div id="ga-inputrow"><input id="ga-input" type="text" placeholder="Ask about GEO…（可中文提问）" autocomplete="off"><button id="ga-send">Send</button></div>
</div>
<button id="ga-fab" aria-label="Open assistant">🤖</button>
<script>
(function(){
var FAB='#ga-fab',PANEL='#ga-panel',MSGS='#ga-msgs',ACT='#ga-actions',INP='#ga-input',BTN='#ga-send',CLOSE='#ga-close';
var root=document.getElementById('geo-assistant');
var msgs=document.getElementById(MSGS.slice(1));
var welcome="Hi! I answer quick questions about Generative Engine Optimization. Ask in English or Chinese — 中文提问也可以。";
var suggestions=['What is GEO?','What is llms.txt?','How do I measure citation share?','How do I start GEO from zero?'];
function addMsg(t,who,srcs,chips){
  var d=document.createElement('div');d.className='ga-msg '+who;d.textContent=t;
  if(srcs&&srcs.length){
    var box=document.createElement('div');box.className='ga-src';
    srcs.forEach(function(s){
      if(s.url){var a=document.createElement('a');a.href=s.url;a.target='_blank';a.rel='noopener';a.textContent='🔗 '+s.title;box.appendChild(a);}
      else{var c=document.createElement('span');c.textContent=s.title;box.appendChild(c);}
      if(s.snippet){var sn=document.createElement('div');sn.className='ga-snip';sn.textContent=s.snippet;box.appendChild(sn);}
    });
    d.appendChild(box);
  }
  if(chips){var ch=document.createElement('div');ch.className='ga-chip';ch.textContent=chips;ch.style.display='inline-block';d.appendChild(ch);}
  document.getElementById(MSGS.slice(1)).appendChild(d);
  document.getElementById(MSGS.slice(1)).scrollTop=document.getElementById(MSGS.slice(1)).scrollHeight;
}
function send(text){
  if(!text)return;
  addMsg(text,'user');
  var inp=document.getElementById(INP.slice(1));inp.value='';
  fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({q:text})})
  .then(function(r){return r.json().then(function(d){return {ok:r.ok,d:d};});})
  .then(function(res){
    if(!res.ok||!res.d.text){
      addMsg('No answer right now — please try again.','bot');return;
    }
    if(res.d.suggestions){addMsg(res.d.text,'bot');renderChips(res.d.sources);return;}
    addMsg(res.d.text,'bot',res.d.sources);
  })
  .catch(function(){addMsg('Network error — please refresh and try again.','bot');});
}
function renderChips(srcs){
  var act=document.getElementById(ACT.slice(1));act.innerHTML='';
  (srcs||[]).forEach(function(s){
    var c=document.createElement('span');c.className='ga-chip';c.textContent=s.title;
    c.addEventListener('click',function(){send(s.title);act.innerHTML='';});
    act.appendChild(c);
  });
}
document.getElementById(FAB.slice(1)).addEventListener('click',function(){root.classList.toggle('open');});
document.getElementById(CLOSE.slice(1)).addEventListener('click',function(){root.classList.remove('open');});
document.getElementById(BTN.slice(1)).addEventListener('click',function(){send(document.getElementById(INP.slice(1)).value);});
document.getElementById(INP.slice(1)).addEventListener('keydown',function(e){if(e.key==='Enter')send(document.getElementById(INP.slice(1)).value);});
addMsg(welcome,'bot');
renderChips(suggestions);
})();
</script>
</div>`;

/** Append the assistant widget to an HTML body. Never throws. */
function injectAssistant(html) {
  if (!html || typeof html !== 'string') return html;
  if (!/<\/body>/i.test(html)) return html;
  return html.replace(/<\/body>/i, ASSISTANT_WIDGET + '\n</body>');
}

const NOT_FOUND_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>404 — GEO Encyclopedia</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Noto Sans SC","Microsoft YaHei",sans-serif;background:#f5f5f5;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;color:#222}div{text-align:center}p{color:#666;margin-top:8px}a{color:#0066cc}</style>
</head>
<body><div><h1>404</h1><p>Page not found or has been moved.</p><a href="/">Back to Home</a></div></body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const rawPath = url.pathname;

    // Redirect www -> apex to avoid duplicate content (canonical host is geo010.com)
    if (url.hostname === 'www.geo010.com') {
      const target = new URL(request.url);
      target.host = 'geo010.com';
      return Response.redirect(target.toString(), 301);
    }

    // Stats page — never logged, never cached
    if (rawPath === STATS_PATH) {
      return handleStats(env);
    }

    // Site search API — reads the generated article index (never logged)
    if (rawPath === SEARCH_PATH || rawPath === SEARCH_PATH + '/') {
      return handleSearch(url);
    }

    // Site assistant chat API — local FAQ + knowledge-index answers (anonymous log)
    if (rawPath === CHAT_PATH || rawPath === CHAT_PATH + '/') {
      return handleChat(request, env);
    }

    // MCP discovery manifest (SEP-1960): declare that this site hosts no MCP server
    if (rawPath === MCP_PATH) {
      const ua = request.headers.get('user-agent') || '';
      const crawler = classifyCrawler(ua);
      if (crawler) {
        await ensureRefererColumn(env);
        await logRequest(env, {
          ts: new Date().toISOString().slice(0, 19) + 'Z',
          ua,
          crawler,
          path: rawPath,
          status: 200,
          isHtml: false,
          refHost: refererHost(request.headers.get('Referer')),
        });
      }
      return new Response(JSON.stringify(MCP_MANIFEST), {
        headers: (() => {
          const h = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            'X-Content-Type-Options': 'nosniff',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          });
          applySecurityHeaders(h, false);
          return h;
        })(),
      });
    }

    // Community comments: public read + moderated write, plus a key-protected admin page
    if (rawPath === COMMENTS_API_PATH || rawPath === COMMENTS_API_PATH + '/') {
      return handleCommentsApi(request, env);
    }
    if (rawPath === ADMIN_COMMENTS_PATH) {
      return handleAdminComments(request, env);
    }

    const clean = sanitizePath(rawPath);
    if (!clean) {
      return new Response('Bad request', { status: 400 });
    }

    // Block secret/config path-scanning before it reaches the origin.
    if (isSuspiciousPath(clean)) {
      return new Response(NOT_FOUND_HTML, {
        status: 404,
        headers: (() => {
          const h = new Headers({ 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
          applySecurityHeaders(h, true);
          h.set('X-Robots-Tag', 'noindex, nofollow');
          return h;
        })(),
      });
    }

    let { res, served } = await fetchFile(clean);
    let status = res.status;
    let body = res.body;

    if (status === 404) {
      body = NOT_FOUND_HTML;
      status = 404;
    }

    // Record: HTML pages, plus AI-crawler hits on key entry files (llms/robots/sitemap/feed/well-known)
    const ua = request.headers.get('user-agent') || '';
    const crawler = classifyCrawler(ua);
    const isHtml = !STATIC_EXT.test(rawPath);
    if (isHtml || (crawler && AI_ENTRY_FILES.has(rawPath))) {
      await ensureRefererColumn(env);
      await logRequest(env, {
        ts: new Date().toISOString().slice(0, 19) + 'Z',
        ua,
        crawler,
        path: rawPath,
        status,
        isHtml,
        refHost: refererHost(request.headers.get('Referer')),
      });
    }

    // Inject the assistant chat widget into ordinary HTML pages only
    // (stats/admin pages and 404 are rendered elsewhere and excluded).
    if (status !== 404 && served && served.endsWith('.html')) {
      body = injectAssistant(await res.text());
    }

    const headers = new Headers(res.headers);
    applySecurityHeaders(headers, true);
    headers.set('Content-Type', status === 404 ? 'text/html; charset=utf-8' : contentTypeFor(served));
    headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);
    if (status === 404) headers.set('X-Robots-Tag', 'noindex, nofollow');

    return new Response(body, { status, headers });
  },
};
