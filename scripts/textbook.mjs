#!/usr/bin/env node
/**
 * textbook.mjs —— 课本原文检索器（遇到知识问题先查原书，不凭记忆讲）
 *
 * 数据源：谭浩强《C语言程序设计》第4版 全文 txt（有版权 → 不进 git；本地副本见 CANDIDATES）
 *   路径可用环境变量 TEXTBOOK_TXT 覆盖；每次运行会在末尾打印实际使用的文件路径作为取证凭证。
 *
 * 用法：
 *   node scripts/textbook.mjs 赋值表达式              搜概念 → 命中页 + 上下文
 *   node scripts/textbook.mjs for语句 --limit 5       限定命中页数
 *   node scripts/textbook.mjs --page 81               打印整页原文
 *   node scripts/textbook.mjs --pages 81-83           打印连续页
 *   node scripts/textbook.mjs --toc                   章节目录（含页码）
 *   node scripts/textbook.mjs --ch 5                  第 5 章的页码范围
 *
 * ⚠️ 输出会标注该页是否含代码/公式：那份 txt 是 PDF 直排抽取件，
 *    右花括号缺 142 个、0↔g/6、1↔l 互混、上标丢失（x²→x2）。
 *    **散文可信，代码与数学式必须回 PDF 核对后才可出题。**
 */
import fs from 'node:fs';

/* 有版权教材 → 不进 git。按顺序找本地副本，任一存在即可用。 */
const CANDIDATES = [
  process.env.TEXTBOOK_TXT,
  'D:/deeepseek/zhuan-sheng-ben-notes/guangdong-zhuanshengben-resources/计算机基础与程序设计/《C语言程序设计》.txt',
  'C:/Users/Administrator/Desktop/广东专升本资料/guangdong-zhuanshengben-resources/计算机基础与程序设计/《C语言程序设计》.txt',
].filter(Boolean);

const TXT = CANDIDATES.find((p) => fs.existsSync(p));

if (!TXT) {
  console.error('❌ 课本 txt 找不到。已尝试：');
  for (const p of CANDIDATES) console.error('   ' + p);
  console.error('\n恢复方式：把《C语言程序设计》.txt 放回上述任一路径，或设环境变量 TEXTBOOK_TXT 指向它。');
  console.error('找不到时：如实告诉用户"课本文件找不到了"，退回仓库笔记并标 ⚠️ 推算，不许装作查过。');
  process.exit(2);
}

const raw = fs.readFileSync(TXT, 'utf8').replace(/\r/g, '');
/* 取证凭证：无论走哪个分支，退出前都说明"这次查的是哪个文件"，防止凭记忆假装查过 */
process.on('exit', () => process.stdout.write(`\n[课本数据源] ${TXT}\n`));
/* 按「===== 第 N 页 =====」切分，页号即 PDF 物理页 */
const seg = raw.split(/=+ 第 (\d+) 页 =+/);
const pages = [];
for (let i = 1; i < seg.length; i += 2) pages[+seg[i]] = seg[i + 1] || '';
const TOTAL = pages.reduce((m, _v, i) => Math.max(m, +i), 0);

/* 章节页码地图（实测：正文里各章标题首次出现的 PDF 物理页） */
const CHAPTERS = {
  1: { name: '程序设计与C语言', from: 22 },
  2: { name: '数据的存储与运算', from: 36 },
  3: { name: '顺序程序设计（含 3.4 赋值）', from: 74 },
  4: { name: '选择结构程序设计', from: 102 },
  5: { name: '循环结构程序设计', from: 148 },
  6: { name: '用数组处理批量数据', from: 176 },
  7: { name: '用函数实现模块化程序设计', from: 208 },
  8: { name: '地址与指针', from: 240 },
  9: { name: '用户自定义数据类型（结构体）', from: 302 },
  10: { name: '利用文件保存数据', from: 332 },
};

/** 该页是否含代码/公式特征 —— 决定可信度标注 */
function riskOf(text) {
  const r = [];
  if (/#include|int main|printf|scanf|return\s/.test(text)) r.push('代码');
  if (/[{}]/.test(text)) r.push('花括号(可能缺失)');
  if (/[²³]|\^\d|\d+n\b/.test(text) || /[＋－×÷—]/.test(text)) r.push('公式(可能乱码)');
  return r;
}

function flag(text) {
  const r = riskOf(text);
  return r.length ? `⚠️ 含${r.join('/')}` : '✅ 散文';
}

function chapterOf(n) {
  let cur = 0;
  for (const [k, v] of Object.entries(CHAPTERS)) if (n >= v.from) cur = +k;
  return cur;
}

/** 从命中处截一段上下文（约 300 字） */
function contextOf(pageText, kw, width = 300) {
  const idx = pageText.indexOf(kw);
  if (idx < 0) return pageText.slice(0, width).trim();
  const start = Math.max(0, idx - 120);
  return (start > 0 ? '…' : '') + pageText.slice(start, idx + width).trim();
}

const args = process.argv.slice(2);
const opt = (name, dft) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : dft;
};
const has = (name) => args.includes(name);

/* 分支一：章节目录 / 某章范围 */
if (has('--toc') || has('--ch')) {
  if (has('--toc')) {
    console.log(`谭浩强《C语言程序设计》第4版 · 共 ${TOTAL} 页 · 章节页码地图`);
    console.log('（页码 = txt 的 PDF 物理页，与书 printing 页码差约 13 页）\n');
    for (const [k, v] of Object.entries(CHAPTERS)) {
      const next = CHAPTERS[+k + 1];
      console.log(`第${k}章 ${v.name}  p${v.from}${next ? '-' + (next.from - 1) : '+'}`);
    }
    console.log('\n⚠️ 第4版 vs 第5版：仓库其他页登记的是第5版，本 txt 是第4版，引用须标「第4版第N页」。');
  } else {
    const c = +opt('--ch', '1');
    const v = CHAPTERS[c];
    if (!v) { console.error('无此章：' + c); process.exit(1); }
    const next = CHAPTERS[c + 1];
    const end = next ? next.from - 1 : TOTAL;
    console.log(`第${c}章 ${v.name} → p${v.from} 到 p${end}`);
    for (let p = v.from; p <= end; p++) {
      if (/^\s*习题\s*$/.test((pages[p] || '').trim())) console.log(`  本章习题起始页 p${p}`);
    }
    console.log('（本章题目原文请用 --pages 逐页看；含公式的题必须回原 PDF 核对）');
  }
  process.exit(0);
}

/* 分支二：按页取原文 */
const pg = opt('--page') || opt('--pages');
if (pg) {
  const [a, b] = pg.includes('-') ? pg.split('-') : [pg, pg];
  for (let p = +a; p <= +b; p++) {
    const text = pages[p];
    if (text === undefined) { console.log(`(第 ${p} 页不存在)`); continue; }
    console.log(`\n===== 第 ${p} 页 · ${flag(text)} · 第${chapterOf(p)}章 =====`);
    console.log(text.trim());
  }
  console.log('\n' + '='.repeat(56));
  console.log('提醒：标 ⚠️ 的页里代码/公式已被 PDF 抽取损坏，只可读不可抄；出题须回原 PDF 核对。');
  process.exit(0);
}

/* 分支三：关键词检索 */
const used = new Set();
const query = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) { i++; continue; } // 跳过选项及其取值
  const k = args[i];
  if (!used.has(k)) { used.add(k); query.push(k); }
}
if (!query.length) {
  console.log('用法：node scripts/textbook.mjs <关键词> [--limit N] | --page N | --pages A-B | --toc | --ch N');
  process.exit(0);
}
const LIMIT = +opt('--limit', 8);
const CH = opt('--ch');

let shown = 0;
for (const kw of query) {
  console.log(`\n########## 检索「${kw}」${CH ? `（限第${CH}章）` : ''} ##########`);
  const hits = [];
  for (let p = 1; p <= TOTAL; p++) {
    const text = pages[p] || '';
    if (!text.includes(kw)) continue;
    if (CH && chapterOf(p) !== +CH) continue;
    hits.push({ p, count: text.split(kw).length - 1, text });
  }
  hits.sort((x, y) => y.count - x.count);
  if (!hits.length) { console.log('（无命中。换词试试，或 --toc 看章节名）'); continue; }
  console.log(`命中 ${hits.length} 页，显示前 ${Math.min(LIMIT, hits.length)} 页：\n`);
  for (const h of hits.slice(0, LIMIT)) {
    console.log(`--- p${h.p}（出现 ${h.count} 次，第${chapterOf(h.p)}章）${flag(h.text)} ---`);
    console.log(contextOf(h.text, kw) + '\n');
  }
  shown++;
}
if (!shown) console.log('\n都没命中 —— 可能用词与教材术语不同，试试 --toc 查章节小节名。');
console.log('\n' + '='.repeat(56));
console.log('引用格式：谭浩强《C语言程序设计》第4版 第N页　｜　无命中时禁止编造页码，改标 ⚠️ 推算');
