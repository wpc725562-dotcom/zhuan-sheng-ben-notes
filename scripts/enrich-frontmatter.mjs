// 批量给专升本笔记 frontmatter 添加 difficulty/frequency/mastery 字段
// 用法: node scripts/enrich-frontmatter.mjs   (在 zhuan-sheng-ben-notes 目录下)
import fs from 'node:fs';
import path from 'node:path';

const NOTES_DIR = path.resolve('docs/posts/computer/notes');
const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.md') && !/^(index|syllabus)\.md$/.test(f));

// 频次星级 → 枚举值（来自各篇"历年真题考情"表的出题频次）
function starToLevel(starStr) {
  const s = (starStr || '').trim();
  const count = (s.match(/★/g) || []).length;
  if (count >= 4) return 'high';      // ★★★★☆ 以上
  if (count === 3) return 'medium';   // ★★★☆☆
  if (count >= 1) return 'low';       // ★★☆☆☆ 及以下
  return 'unknown';
}

// 按文件名前缀推断难度：1.x 基础 / 2.x 进阶 / 3.x 专项；0.0 总览
function inferDifficulty(name) {
  const m = name.match(/^(\d+)\.(\d+)/);
  if (!m) return 'overview';
  const [ch, sec] = [parseInt(m[1]), parseInt(m[2])];
  if (ch === 0) return 'overview';
  if (ch === 1) {
    if (sec <= 5) return 'basic';     // 概述/数据/顺序/选择/循环
    return 'intermediate';            // 数组/函数/指针/结构体/文件
  }
  if (ch === 2) return 'advanced';    // 数据结构
  if (ch === 3) return 'special';     // 专项训练
  return 'unknown';
}

let updated = 0, skipped = 0;
for (const f of files) {
  const p = path.join(NOTES_DIR, f);
  let text = fs.readFileSync(p, 'utf8');

  // 解析现有 frontmatter
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) { console.log(`⚠️ ${f}: 无 frontmatter，跳过`); skipped++; continue; }
  const fmBlock = fmMatch[1];
  if (/\b(difficulty|frequency|mastery):/.test(fmBlock)) {
    console.log(`ℹ️ ${f}: 已含元数据字段，跳过`); skipped++; continue;
  }

  // 从考情表提取出题频次星级
  const freqMatch = text.match(/出题频次[^\n]*?(\★{1,5}☆{0,4})/);
  const frequency = starToLevel(freqMatch ? freqMatch[1] : '');
  const difficulty = inferDifficulty(f);
  const mastery = 'review'; // 初始状态：待复习

  // 在 category/part 之后追加新字段（保持 title/description/category/part 原有顺序）
  const lines = fmBlock.split(/\r?\n/);
  const insertAt = lines.length; // 追加到 frontmatter 末尾
  lines.splice(insertAt, 0, `difficulty: "${difficulty}"`, `frequency: "${frequency}"`, `mastery: "${mastery}"`);

  const newFm = lines.join('\n');
  text = text.replace(fmBlock, newFm);
  fs.writeFileSync(p, text, 'utf8'); // Node 写 UTF-8 无 BOM
  console.log(`✅ ${f}: difficulty=${difficulty} frequency=${frequency} mastery=${mastery}`);
  updated++;
}

console.log(`\n完成：更新 ${updated} 篇，跳过 ${skipped} 篇`);
