import worker from 'file:///E:/D/GEOhtml/worker/index.js';

const calls = [];
const insertBinds = [];

const DB_COLS = ['id', 'ts', 'date', 'ua', 'crawler_name', 'path', 'status', 'is_html', 'referer_host'];

const env = {
  DB: {
    prepare(sql) {
      if (/PRAGMA table_info/i.test(sql)) {
        return { all: async () => ({ results: DB_COLS.map((name) => ({ name })) }) };
      }
      if (/INSERT INTO crawler_logs/i.test(sql)) {
        return {
          bind: (...args) => ({
            run: async () => { insertBinds.push(args); calls.push('DB:insert'); },
          }),
        };
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

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);