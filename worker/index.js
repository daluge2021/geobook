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
  const { totals, byCrawler, byDate, byPath, byReferrer, byEntry, recent } = data;
  const rows = (arr) =>
    arr
      .map(
        (r, i) =>
          `<tr${i % 2 ? ' class="alt"' : ''}><td>${r.label}</td><td>${r.n}</td></tr>`
      )
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
  const [totals, byCrawler, byDate, byPath, byReferrer, byEntry, recent] = await Promise.all([
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
    byPath: byPath?.results || [],
    byReferrer: byReferrer?.results || [],
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

    const headers = new Headers(res.headers);
    applySecurityHeaders(headers, true);
    headers.set('Content-Type', status === 404 ? 'text/html; charset=utf-8' : contentTypeFor(served));
    headers.set('Cache-Control', `public, max-age=${CACHE_TTL}`);
    if (status === 404) headers.set('X-Robots-Tag', 'noindex, nofollow');

    return new Response(body, { status, headers });
  },
};
