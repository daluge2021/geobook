/**
 * GEO 内容格式自动校验
 *
 * 用法：
 *   node check_content_format.mjs <file-or-dir> [more...]
 *   无参数时默认扫描 docs/ 下全部 HTML。
 *
 * 输出：PASS / 提示（建议，按需优化）/ FAIL（必须修复后再发布）。
 * 只覆盖结构性指标；语义项（答案前置、场景化开场、来源标注）见 SKILL.md 第 2 节人工清单。
 */

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const roots = args.length ? args : ['docs'];

const gitModCache = new Map();
function gitLastMod(file) {
  if (gitModCache.has(file)) return gitModCache.get(file);
  let date = null;
  try {
    const out = execFileSync(
      'git', ['log', '-1', '--date=short', '--format=%ad', '--', file],
      { encoding: 'utf8' }
    ).trim();
    date = out || null;
  } catch {
    date = null;
  }
  gitModCache.set(file, date);
  return date;
}

// 最后一次提交是否只回写了 dateModified（未改正文）→ 视为已同步。
// 兼容多行与单行压缩 JSON-LD：成对比较 -/+ 行，去掉 dateModified 值后其余相同即视为纯日期回写。
function pureDateRewrite(removed, added) {
  if (!removed.length || removed.length !== added.length) return false;
  const norm = (s) => s.replace(/"dateModified"\s*:\s*"[^"]*"/g, '"dateModified":""');
  return removed.every((s, i) => norm(s) === norm(added[i]));
}

const gitShowCache = new Map();
function isPureDateRewrite(file) {
  if (gitShowCache.has(file)) return gitShowCache.get(file);
  let pure = false;
  try {
    const diff = execFileSync('git', ['show', '-U0', '--format=', '--', file], { encoding: 'utf8' });
    const removed = [];
    const added = [];
    for (const l of diff.split('\n')) {
      if (l.startsWith('-') && !l.startsWith('--')) removed.push(l.slice(1));
      else if (l.startsWith('+') && !l.startsWith('++')) added.push(l.slice(1));
    }
    pure = pureDateRewrite(removed, added);
  } catch {
    pure = false;
  }
  gitShowCache.set(file, pure);
  return pure;
}

// 工作区相对 HEAD 的改动（含未提交/已暂存），用于抓「改了正文但没更新日期」
function gitDiffHead(file) {
  try {
    const diff = execFileSync('git', ['diff', 'HEAD', '-U0', '--', file], { encoding: 'utf8' });
    const removed = [];
    const added = [];
    for (const l of diff.split('\n')) {
      if (l.startsWith('-') && !l.startsWith('--')) removed.push(l.slice(1));
      else if (l.startsWith('+') && !l.startsWith('++')) added.push(l.slice(1));
    }
    return { removed, added };
  } catch {
    return null;
  }
}

function todayLocal() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// 已知例外（有意跳过，勿当质量问题）：
// - monitor.html / stats.html：隐私统计页，故意无 JSON-LD 与 51.la 脚本（三重保护）
// - docs 根目录旧章节页（fundamentals.html 等）：历史遗留孤儿页，不在 sitemap/llms.txt/导航中
const SKIP = new Set([
  'docs/monitor.html',
  'docs/stats.html',
  'docs/fundamentals.html',
  'docs/metrics-frameworks.html',
  'docs/models-methods.html',
  'docs/content-strategy.html',
  'docs/technical-implementation.html',
  'docs/brand-strategy.html',
  'docs/industry-applications.html',
  'docs/case-studies.html',
  'docs/data-formulas.html',
]);

function collectFiles(target) {
  const out = [];
  const stat = fs.statSync(target);
  if (stat.isFile()) {
    if (target.endsWith('.html')) out.push(target);
    return out;
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(target, entry.name);
    if (entry.isDirectory()) out.push(...collectFiles(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// 文章页判定：位于章节子目录或 community/ 下的 .html，且不是入口页
function isArticlePage(file) {
  const rel = path.relative('docs', file).replace(/\\/g, '/');
  const dir = path.dirname(rel);
  if (rel === 'community.html' || rel === 'index.html' || rel === 'about.html' ||
      rel === 'contact.html' || rel === 'monitor.html' || rel === 'stats.html' ||
      rel === 'what-is-geo.html') return false;
  return dir !== '.'; // 有子目录 → 文章页
}

const QUESTION_RE = /^<h2[^>]*>\s*(?:<a[^>]*>\s*)?(?:What|How|Why|Which|When|Where|Who|Do|Does|Is|Are|Can|Could|Should|Will|Would)\b/i;
const H2_RE = /<h2[^>]*>(.*?)<\/h2>/gis;

function extractText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function check(file) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const results = [];
  const article = isArticlePage(file);

  // ok: 通过；hint: true 表示"建议项"，不通过也不算 FAIL
  const add = (ok, name, detail = '', hint = false) =>
    results.push({ ok, name, detail, hint });

  // --- 基础骨架 ---
  add(html.includes('<!DOCTYPE html>') && /<html lang="en">/i.test(html), 'DOCTYPE + html lang=en');
  add(/<meta charset="UTF-8">/i.test(html), 'meta charset=UTF-8');
  add(/<meta name="description"[^>]*content=/i.test(html), 'meta description');
  add(/<title>[^<]*GEO Encyclopedia/i.test(html), 'title 含 "GEO Encyclopedia"');
  add(/<link rel="canonical" href=/i.test(html), 'canonical 链接');

  // RSS 发现链接（须在 canonical 之后）
  const cIdx = html.indexOf('rel="canonical"');
  const rIdx = html.indexOf('application/rss+xml');
  add(cIdx !== -1 && rIdx > cIdx, 'RSS alternate 链接在 canonical 之后');

  // JSON-LD 在 head 内
  const headEnd = html.indexOf('</head>');
  const head = headEnd === -1 ? html : html.slice(0, headEnd);
  const ldCount = (head.match(/<script type="application\/ld\+json">/g) || []).length;
  add(ldCount >= 1, 'JSON-LD 位于 head（至少 1 块）', `共 ${ldCount} 块`);
  if (article) {
    add(head.includes('"@type": "Article"') || head.includes('"@type":"Article"'), '文章页含 Article JSON-LD');
    // 术语页（/glossary/）可无面包屑，降为提示项
    add(head.includes('BreadcrumbList'), '文章页含 BreadcrumbList JSON-LD', '', /\/glossary\//.test(rel));
    add(/datePublished/.test(head) && /dateModified/.test(head), 'Article 含 datePublished/dateModified');
    // 更新时间同步：dateModified ≥ datePublished；已提交文件应与 git 最后修改日一致
    const dp = (head.match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})"/) || [])[1];
    const dm = (head.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/) || [])[1];
    if (dp && dm) {
      add(dm >= dp, 'dateModified 不早于 datePublished', `${dp} → ${dm}`);
      const git = gitLastMod(file);
      if (git) {
        const wd = gitDiffHead(file);
        const hasWd = wd && (wd.removed.length > 0 || wd.added.length > 0);
        if (hasWd && !pureDateRewrite(wd.removed, wd.added)) {
          // 工作区有内容改动（未提交）：dateModified 应更新为本次修改日
          const today = todayLocal();
          add(dm === today, 'dateModified 已更新为本次修改日', `今天=${today} / 页面=${dm}`);
        } else if (hasWd) {
          add(true, 'dateModified 与修改日期一致', '（仅日期回写）');
        } else {
          // 工作区干净：比对 git 最后修改日，HEAD 提交若只是日期回写则视为同步
          const sync = dm === git || isPureDateRewrite(file);
          add(sync, 'dateModified 与 git 最后修改日一致', `git=${git} / 页面=${dm}${dm !== git && sync ? '（仅日期回写）' : ''}`);
        }
      } else {
        add(true, 'dateModified 同步', '新文件未提交，跳过 git 对比', true);
      }
    }
  }

  // 51.la 统计（R2）
  add(/LA\.init\(/i.test(html), '51.la 统计脚本存在（R2）');

  // --- 内容结构 ---
  const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
  if (article && h1) {
    const h1Text = extractText(h1[1]);
    add(h1Text.length <= 110, 'H1 简短（≤110 字符）', `${h1Text.length} 字符`);
  }

  const h2s = [...html.matchAll(H2_RE)];
  if (article) {
    add(h2s.length >= 3, 'H2 数量 ≥ 3（层级完整）', `共 ${h2s.length} 个`);
    const q = h2s.filter((m) => QUESTION_RE.test(m[0])).length;
    add(q >= 2, '问题式 H2 至少 2 个（What/How/Why…）', `${q}/${h2s.length}`, true);
  } else {
    add(h2s.length >= 1, '页面含 H2 结构');
  }

  // blockquote（定义/场景化元素）；术语页精简结构可无，降为提示
  const bq = (html.match(/<blockquote/g) || []).length;
  if (article) add(bq >= 1, '含 blockquote（定义/场景强调）', `共 ${bq} 处`, /\/glossary\//.test(rel));

  // 表格或列表（结构化内容）
  const table = html.includes('<table');
  const ul = html.includes('<ul');
  if (article) {
    add(table || ul, '含表格或列表（结构化）', table ? '有表格' : ul ? '仅有列表' : '无');
    if (table) add(html.includes('<th'), '表格有表头 th');
  }

  // 段落长度（精短：平均 ≤440 字符；存在超长段落为建议）
  if (article) {
    const ps = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => extractText(m[1]).length);
    if (ps.length) {
      const avg = Math.round(ps.reduce((a, b) => a + b, 0) / ps.length);
      const max = Math.max(...ps);
      add(avg <= 440, '段落平均长度精短（≤440 字符）', `平均 ${avg}`);
      add(max <= 990, '无超长段落（≤990 字符）', `最长 ${max}`, true);
    }
  }

  // 结尾 nav-links（文章页）
  if (article) {
    add(html.includes('class="nav-links"'), 'nav-links 上下篇导航');
    add(html.includes('class="active"'), '侧边栏当前页 active');
  }

  // 反模式：不应使用 <br> 排版；术语页除外
  if (article) {
    add(!/<br\s*\/?>/i.test(html), '未使用 <br> 排版（用段落/列表）', /<br\s*\/?>/i.test(html) ? '发现 <br>' : '', /\/glossary\//.test(rel));
  }

  return { rel, results };
}

let total = 0, fails = 0, hints = 0;
const files = [...new Set(roots.flatMap((r) => collectFiles(r)))].filter((f) => {
  const rel = path.relative(process.cwd(), f).replace(/\\/g, '/');
  return !SKIP.has(rel);
});
for (const file of files) {
  const { rel, results } = check(file);
  const f = results.filter((r) => !r.ok && !r.hint).length;
  const h = results.filter((r) => !r.ok && r.hint).length;
  total++;
  if (f === 0 && h === 0) {
    console.log(`\n✓ ${rel} — 全部通过`);
  } else if (f === 0) {
    console.log(`\n⚠ ${rel} — ${h} 项提示（建议优化）`);
  } else {
    console.log(`\n✗ ${rel} — ${f} 项 FAIL`);
  }
  for (const r of results) {
    if (r.ok) console.log(`  PASS  ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
    else if (r.hint) console.log(`  提示  ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
    else console.log(`  FAIL  ${r.name}${r.detail ? ' — ' + r.detail : ''}`);
  }
  fails += f;
  hints += h;
}

console.log(`\n---\n检查 ${total} 个文件：FAIL ${fails} 项 · 提示 ${hints} 项`);
