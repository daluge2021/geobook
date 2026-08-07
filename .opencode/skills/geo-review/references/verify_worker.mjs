import worker from 'file:///E:/D/GEOhtml/worker/index.js';

const calls = [];
globalThis.fetch = async (url) => {
  calls.push(String(url));
  if (String(url).includes('.well-known/mcp')) return new Response('', { status: 200 });
  return new Response('<html>mock origin</html>', { status: 200 });
};

const env = {
  DB: {
    prepare: () => ({
      bind: () => ({ run: async () => { calls.push('DB:insert'); } }),
      all: async () => ({ results: [] }),
      first: async () => ({ total: 0, ai: 0 }),
    }),
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
calls.length = 0;
globalThis.fetch = async (url) => new Response('<html></html>', {
  status: 200,
  headers: { 'Content-Security-Policy': 'default-src \'none\'; sandbox', 'X-Frame-Options': 'deny' },
});
res = await worker.fetch(new Request('https://geo010.com/index.html', { headers: { 'user-agent': 'x' } }), env);
check('CSP stripped (R1!)', res.headers.get('Content-Security-Policy') === null,
  '→ 未删会被浏览器禁脚本，菜单无法展开');
check('X-Frame-Options stripped', res.headers.get('X-Frame-Options') === null);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);