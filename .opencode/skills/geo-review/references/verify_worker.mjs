import worker from 'file:///E:/D/GEOhtml/worker/index.js';

const calls = [];
const insertBinds = [];
const commentBinds = [];
let rateLimited = false;

const DB_COLS = ['id', 'ts', 'date', 'ua', 'crawler_name', 'path', 'status', 'is_html', 'referer_host'];

const env = {
  COMMENTS_ADMIN_KEY: 'test-secret',
  DB: {
    prepare(sql) {
      if (/PRAGMA table_info/i.test(sql)) {
        return { all: async () => ({ results: DB_COLS.map((name) => ({ name })) }) };
      }
      if (/CREATE TABLE IF NOT EXISTS comments/i.test(sql)) {
        return { run: async () => { calls.push('DB:comments-create'); } };
      }
      if (/INSERT INTO crawler_logs/i.test(sql)) {
        return {
          bind: (...args) => ({
            run: async () => { insertBinds.push(args); calls.push('DB:insert'); },
          }),
        };
      }
      if (/INSERT INTO comments/i.test(sql)) {
        return {
          bind: (...args) => ({
            run: async () => { commentBinds.push(args); calls.push('DB:comment-insert'); },
          }),
        };
      }
      if (/SELECT COUNT\(\*\) AS n FROM comments WHERE ip/i.test(sql)) {
        return {
          bind: (...args) => ({
            first: async () => ({ n: rateLimited ? 1 : 0 }),
          }),
        };
      }
      if (/^UPDATE comments SET status/i.test(sql)) {
        return {
          bind: (...args) => ({
            run: async () => { calls.push('DB:comment-update'); },
          }),
        };
      }
      if (/status = 'approved'/i.test(sql)) {
        return {
          bind: (...args) => ({
            all: async () => ({ results: [{ id: 1, author: 'Alice', date: '2026-08-08', body: 'Great post!' }] }),
          }),
        };
      }
      if (/status = 'pending'/i.test(sql) || /ORDER BY id DESC LIMIT 50/i.test(sql)) {
        return { all: async () => ({ results: [] }) };
      }
      // stats/aggregate queries
      return {
        all: async () => ({ results: [{ label: 'chatgpt.com', n: 12 }] }),
        first: async () => ({ total: 100, ai: 30, clicks: 9 }),
      };
    },
  },
};

let pass = 0, fail = 0;
const check = (name, cond, extra = '') => {
  if (cond) { pass++; console.log('  PASS', name); }
  else { fail++; console.log('  FAIL', name, extra); }
};

let res = await worker.fetch(new Request('https://geo010.com/.well-known/mcp'), env);
let body = await res.text();
check('mcp 200', res.status === 200);
check('mcp json content-type', (res.headers.get('Content-Type') || '').includes('application/json'));
check('mcp nosniff', res.headers.get('X-Content-Type-Options') === 'nosniff');
check('mcp CORS', res.headers.get('Access-Control-Allow-Origin') === '*');
check('mcp cache 3600', (res.headers.get('Cache-Control') || '').includes('3600'));
const m = JSON.parse(body);
check('mcp server_name', m.server_name === 'GEO Encyclopedia');

res = await worker.fetch(new Request('https://www.geo010.com/x.html'), env);
check('www 301 apex', res.status === 301);
check('location strip www', res.headers.get('Location') === 'https://geo010.com/x.html');

// CSP 沙箱头必须被删除（否则侧边栏脚本被禁用）
globalThis.fetch = async (url) => new Response('<html></html>', {
  status: 200,
  headers: { 'Content-Security-Policy': 'default-src \'none\'; sandbox', 'X-Frame-Options': 'deny' },
});
res = await worker.fetch(new Request('https://geo010.com/index.html', { headers: { 'user-agent': 'x' } }), env);
check('CSP stripped (R1!)', res.headers.get('Content-Security-Policy') === null,
  '→ 未删会被浏览器禁脚本，菜单无法展开');
check('X-Frame-Options stripped', res.headers.get('X-Frame-Options') === null);

// Referrer tracking: 8 binds, 外部 host 被记录
insertBinds.length = 0;
await worker.fetch(new Request('https://geo010.com/index.html', {
  headers: { 'user-agent': 'Mozilla/5.0', 'Referer': 'https://chatgpt.com/c/abc' },
}), env);
check('referer record written', insertBinds.length === 1, `got ${insertBinds.length}`);
check('referer bind has 8 args', insertBinds[0]?.length === 8, JSON.stringify(insertBinds[0]));
check('external referer host stored', insertBinds[0]?.[7] === 'chatgpt.com', insertBinds[0]?.[7]);

// 同站 referer 置 null（避免自污染）
insertBinds.length = 0;
await worker.fetch(new Request('https://geo010.com/index.html', {
  headers: { 'user-agent': 'Mozilla/5.0', 'Referer': 'https://geo010.com/fundamentals/what-is-geo.html' },
}), env);
check('same-site referer dismissed', insertBinds[0]?.[7] === null, String(insertBinds[0]?.[7]));

// 无 referer → null
insertBinds.length = 0;
await worker.fetch(new Request('https://geo010.com/index.html', {
  headers: { 'user-agent': 'Mozilla/5.0' },
}), env);
check('missing referer is null', insertBinds[0]?.[7] === null);

// stats 页含来源统计区块
const statsBody = await (await worker.fetch(new Request('https://geo010.com/stats.html'), env)).text();
check('stats references external clicks', statsBody.includes('外部来源点击'));
check('stats renders referrer table', statsBody.includes('来源域名'));
check('stats renders referrer host data', statsBody.includes('chatgpt.com'));

// ---- Comments API ----
// 合法提交 → pending 入库
commentBinds.length = 0;
rateLimited = false;
res = await worker.fetch(new Request('https://geo010.com/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.2.3.4' },
  body: JSON.stringify({ page: '/community/what-is-json-ld.html', author: 'Bob', email: '', body: 'Clear explanation, thanks!' }),
}), env);
check('comment post accepted', res.status === 200, `got ${res.status}`);
check('comment inserted with pending', commentBinds[0]?.[4] === 'pending', JSON.stringify(commentBinds[0]));
check('comment page recorded', commentBinds[0]?.[0] === '/community/what-is-json-ld.html', commentBinds[0]?.[0]);

// 非法 page → 400
res = await worker.fetch(new Request('https://geo010.com/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ page: '/stats.html', author: 'X', body: 'hi' }),
}), env);
check('comment rejected on stats page', res.status === 400);

// HTML 注入 → 400
res = await worker.fetch(new Request('https://geo010.com/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ page: '/community.html', author: 'X', body: '<script>alert(1)</script>' }),
}), env);
check('comment HTML rejected', res.status === 400);

// 频率限制 → 429
rateLimited = true;
res = await worker.fetch(new Request('https://geo010.com/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': '1.2.3.4' },
  body: JSON.stringify({ page: '/community.html', author: 'Bob', body: 'again' }),
}), env);
rateLimited = false;
check('comment rate-limited', res.status === 429, `got ${res.status}`);

// GET 仅返回 approved 评论
res = await worker.fetch(new Request('https://geo010.com/api/comments?page=/community/what-is-json-ld.html'), env);
const cl = await res.json();
check('comments GET 200', res.status === 200);
check('comments GET returns approved', cl.comments?.length === 1 && cl.comments[0].author === 'Alice');

// 管理：无 key → 403
res = await worker.fetch(new Request('https://geo010.com/api/comments?action=approve&id=1'), env);
check('admin no key forbidden', res.status === 403);
// 管理：错误 key → 403
res = await worker.fetch(new Request('https://geo010.com/api/comments?action=approve&id=1&key=wrong'), env);
check('admin wrong key forbidden', res.status === 403);
// 管理：正确 key → ok
res = await worker.fetch(new Request('https://geo010.com/api/comments?action=approve&id=1&key=test-secret'), env);
check('admin approve ok', res.status === 200);
// 管理页：无 key → 403
res = await worker.fetch(new Request('https://geo010.com/admin/comments.html'), env);
check('admin page no key forbidden', res.status === 403);
// 管理页：正确 key → 200 且含队列
res = await worker.fetch(new Request('https://geo010.com/admin/comments.html?key=test-secret'), env);
const adminHtml = await res.text();
check('admin page renders', res.status === 200 && adminHtml.includes('Comments Admin'));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);