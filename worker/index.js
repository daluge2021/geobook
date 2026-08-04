/**
 * GEO Encyclopedia — AI Crawler Access Logger
 *
 * Sits in front of the GitHub Pages origin on geo010.com.
 * 1. Classifies each request by User-Agent (AI crawler vs. human).
 * 2. Writes one row per HTML page request into D1.
 * 3. Serves /stats.html (rendered server-side, no client JS).
 * 4. Forwards everything else to the GitHub Pages origin.
 */

const ORIGIN = 'https://daluge2021.github.io';
const STATS_PATH = '/stats.html';

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

const STATIC_EXT = /\.(ico|png|jpe?g|gif|svg|webp|css|js|json|xml|txt|woff2?|map)(\?.*)?$/i;

function classifyCrawler(ua) {
  if (!ua) return null;
  for (const c of AI_CRAWLERS) {
    if (c.re.test(ua)) return c.name;
  }
  return null;
}

async function logRequest(env, { ts, ua, crawler, path, status, isHtml }) {
  if (!isHtml) return; // skip static assets entirely
  try {
    await env.DB.prepare(
      `INSERT INTO crawler_logs (ts, date, ua, crawler_name, path, status, is_html)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(ts, ts.slice(0, 10), ua, crawler, path, status, isHtml ? 1 : 0)
      .run();
  } catch (e) {
    // logging must never break the site
    console.error('log insert failed:', e.message);
  }
}

function renderStatsPage(data) {
  const { totals, byCrawler, byDate, byPath, recent } = data;
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

      <h2>最近 20 条记录</h2>
      <div class="card"><table>
        <tr><th>时间</th><th>爬虫</th><th>路径</th><th>状态</th></tr>
        ${recent
          .map(
            (r) =>
              `<tr><td>${r.ts}</td><td>${r.crawler_name || r.ua || '—'}</td><td>${r.path}</td><td>${r.status}</td></tr>`
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
  const [totals, byCrawler, byDate, byPath, recent] = await Promise.all([
    env.DB.prepare(
      `SELECT COUNT(*) AS total,
              SUM(CASE WHEN crawler_name IS NOT NULL THEN 1 ELSE 0 END) AS ai
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
      `SELECT ts, crawler_name, ua, path, status FROM crawler_logs
       ORDER BY id DESC LIMIT 20`
    ).all(),
  ]);

  const total = totals?.total || 0;
  const ai = totals?.ai || 0;
  const data = {
    totals: { total, ai, aiPct: total ? Math.round((ai / total) * 100) : 0 },
    byCrawler: byCrawler?.results || [],
    byDate: byDate?.results || [],
    byPath: byPath?.results || [],
    recent: recent?.results || [],
  };
  return new Response(renderStatsPage(data), {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Stats page — never logged, never cached
    if (path === STATS_PATH) {
      return handleStats(env);
    }

    // Forward everything to the origin first
    const origUrl = new URL(url);
    origUrl.host = new URL(ORIGIN).host;
    origUrl.protocol = 'https:';

    // GitHub Pages routes by Host header — keep the geo010.com host so the
    // CNAME'd pages site resolves correctly on the shared github.io edge.
    const headers = new Headers(request.headers);
    headers.set('Host', 'geo010.com');

    let status = 0;
    try {
      const upstream = await fetch(origUrl.toString(), {
        method: request.method,
        headers,
        redirect: 'manual',
      });
      status = upstream.status;

      // Record (HTML pages only)
      const ua = request.headers.get('user-agent') || '';
      const crawler = classifyCrawler(ua);
      const isHtml = !STATIC_EXT.test(path);
      if (isHtml) {
        await logRequest(env, {
          ts: new Date().toISOString().replace('T', 'T').slice(0, 19) + 'Z',
          ua,
          crawler,
          path,
          status,
          isHtml,
        });
      }

      return new Response(upstream.body, {
        status: upstream.status,
        headers: upstream.headers,
      });
    } catch (e) {
      console.error('origin fetch failed:', e.message);
      return new Response('Origin fetch failed', { status: 502 });
    }
  },
};
