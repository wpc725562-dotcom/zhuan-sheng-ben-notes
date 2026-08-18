/**
 * 修复 docs/ 下所有 Obsidian wiki 双链 → VitePress 路由链接
 * 运行: node scripts/fix-wiki-links.mjs
 * 
 * 精确映射表（每处链接都经过人工确认）：
 *   - 有对应发布页的 → 转为 [显示文字](/路由)
 *   - 无对应发布页的 → 转为纯文字说明
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const replacements = [
  // ═══════════════════════════════════════════════════════════════
  // docs/guide/2026考纲全解.md  (23处)
  // ═══════════════════════════════════════════════════════════════
  ['docs/guide/2026考纲全解.md', '[[历年真题/计算机程序设计/2026|2026 真题复盘]]', '[2026 真题复盘](/posts/computer/2026)'],
  ['docs/guide/2026考纲全解.md', '[[计算机专业-报考指南]]', '[计算机专业-报考指南](/guide/计算机专业-报考指南)'],
  ['docs/guide/2026考纲全解.md', '[[零基础学习路线]]', '[零基础学习路线](/guide/零基础学习路线)'],
  // 计算机笔记链接 (20处)
  ['docs/guide/2026考纲全解.md', '[[1.1 C语言概述与基本概念]]', '[1.1 C语言概述与基本概念](/posts/computer/notes/1.1-C语言概述与基本概念)'],
  ['docs/guide/2026考纲全解.md', '[[1.2 数据的存储与运算]]', '[1.2 数据的存储与运算](/posts/computer/notes/1.2-数据的存储与运算)'],
  ['docs/guide/2026考纲全解.md', '[[1.3 顺序程序设计]]', '[1.3 顺序程序设计](/posts/computer/notes/1.3-顺序程序设计)'],
  ['docs/guide/2026考纲全解.md', '[[1.4 选择结构程序设计]]', '[1.4 选择结构程序设计](/posts/computer/notes/1.4-选择结构程序设计)'],
  ['docs/guide/2026考纲全解.md', '[[1.5 循环结构程序设计]]', '[1.5 循环结构程序设计](/posts/computer/notes/1.5-循环结构程序设计)'],
  ['docs/guide/2026考纲全解.md', '[[1.6 数组]]', '[1.6 数组](/posts/computer/notes/1.6-数组)'],
  ['docs/guide/2026考纲全解.md', '[[1.7 函数]]', '[1.7 函数](/posts/computer/notes/1.7-函数)'],
  ['docs/guide/2026考纲全解.md', '[[1.8 指针]]', '[1.8 指针](/posts/computer/notes/1.8-指针)'],
  ['docs/guide/2026考纲全解.md', '[[1.9 结构体与共用体]]', '[1.9 结构体与共用体](/posts/computer/notes/1.9-结构体与共用体)'],
  ['docs/guide/2026考纲全解.md', '[[1.10 文件操作]]', '[1.10 文件操作](/posts/computer/notes/1.10-文件操作)'],
  ['docs/guide/2026考纲全解.md', '[[1.11 程序运行环境与调试]]', '[1.11 程序运行环境与调试](/posts/computer/notes/1.11-程序运行环境与调试)'],
  ['docs/guide/2026考纲全解.md', '[[2.1 数据结构基本概念]]', '[2.1 数据结构基本概念](/posts/computer/notes/2.1-数据结构基本概念)'],
  ['docs/guide/2026考纲全解.md', '[[2.2 线性表]]', '[2.2 线性表](/posts/computer/notes/2.2-线性表)'],
  ['docs/guide/2026考纲全解.md', '[[2.3 栈和队列]]', '[2.3 栈和队列](/posts/computer/notes/2.3-栈和队列)'],
  ['docs/guide/2026考纲全解.md', '[[2.4 串、数组和广义表]]', '[2.4 串、数组和广义表](/posts/computer/notes/2.4-串、数组和广义表)'],
  ['docs/guide/2026考纲全解.md', '[[2.5 树和二叉树]]', '[2.5 树和二叉树](/posts/computer/notes/2.5-树和二叉树)'],
  ['docs/guide/2026考纲全解.md', '[[2.6 图]]', '[2.6 图](/posts/computer/notes/2.6-图)'],
  ['docs/guide/2026考纲全解.md', '[[2.7 查找]]', '[2.7 查找](/posts/computer/notes/2.7-查找)'],
  ['docs/guide/2026考纲全解.md', '[[2.8 排序]]', '[2.8 排序](/posts/computer/notes/2.8-排序)'],
  ['docs/guide/2026考纲全解.md', '[[2.9 算法基本概念与分析]]', '[2.9 算法基本概念与分析](/posts/computer/notes/2.9-算法基本概念与分析)'],

  // ═══════════════════════════════════════════════════════════════
  // docs/guide/公办院校与录取.md  (4处)
  // ═══════════════════════════════════════════════════════════════
  ['docs/guide/公办院校与录取.md', '[[省控线-录取分数线]]', '[省控线-录取分数线](/guide/省控线-录取分数线)'],
  ['docs/guide/公办院校与录取.md', '[[省控线-录取分数线|省控线]]', '[省控线](/guide/省控线-录取分数线)'],
  ['docs/guide/公办院校与录取.md', '[[政治理论/16-时事政治备考|时事备考]]', '[时事备考](/posts/politics/notes/16-时事政治备考)'],
  ['docs/guide/公办院校与录取.md', '[[历年真题/总索引|真题总索引]]', '真题总索引（源库文件，站点未发布版）'],

  // ═══════════════════════════════════════════════════════════════
  // docs/guide/省控线-录取分数线.md  (3处)
  // ═══════════════════════════════════════════════════════════════
  ['docs/guide/省控线-录取分数线.md', '[[公办院校与录取]]', '[公办院校与录取](/guide/公办院校与录取)'],
  ['docs/guide/省控线-录取分数线.md', '[[政治理论/16-时事政治备考|时事备考]]', '[时事备考](/posts/politics/notes/16-时事政治备考)'],
  ['docs/guide/省控线-录取分数线.md', '[[历年真题/总索引|真题总索引]]', '真题总索引（源库文件，站点未发布版）'],

  // ═══════════════════════════════════════════════════════════════
  // docs/guide/计算机专业-报考指南.md  (6处，省控线+公办院校各2次)
  // ═══════════════════════════════════════════════════════════════
  ['docs/guide/计算机专业-报考指南.md', '[[省控线-录取分数线|省控线]]', '[省控线](/guide/省控线-录取分数线)'],
  ['docs/guide/计算机专业-报考指南.md', '[[公办院校与录取|公办院校]]', '[公办院校](/guide/公办院校与录取)'],
  ['docs/guide/计算机专业-报考指南.md', '[[历年真题/00-资料来源与使用说明|资料来源与使用说明]]', '[资料来源与使用说明](/guide/sources)'],
  ['docs/guide/计算机专业-报考指南.md', '[[历年真题/总索引|真题总索引]]', '真题总索引（源库文件，站点未发布版）'],

  // ═══════════════════════════════════════════════════════════════
  // docs/guide/B站学习资源库.md  (2处，同一文本)
  // ═══════════════════════════════════════════════════════════════
  ['docs/guide/B站学习资源库.md', '[[资料/学习资源大全|📚 学习资源大全]]', '📚 学习资源大全（源库文件，站点未发布版）'],

  // ═══════════════════════════════════════════════════════════════
  // docs/guide/video-ka-map.md  (7处)
  // ═══════════════════════════════════════════════════════════════
  ['docs/guide/video-ka-map.md', '[[1.1 C语言概述与基本概念]]', '[1.1 C语言概述与基本概念](/posts/computer/notes/1.1-C语言概述与基本概念)'],
  ['docs/guide/video-ka-map.md', '[[1.2 数据的存储与运算]]', '[1.2 数据的存储与运算](/posts/computer/notes/1.2-数据的存储与运算)'],
  ['docs/guide/video-ka-map.md', '[[1.3 顺序程序设计]]', '[1.3 顺序程序设计](/posts/computer/notes/1.3-顺序程序设计)'],
  ['docs/guide/video-ka-map.md', '[[1.4 选择结构程序设计]]', '[1.4 选择结构程序设计](/posts/computer/notes/1.4-选择结构程序设计)'],
  ['docs/guide/video-ka-map.md', '[[1.5 循环结构程序设计]]', '[1.5 循环结构程序设计](/posts/computer/notes/1.5-循环结构程序设计)'],
  ['docs/guide/video-ka-map.md', '[[1.6 数组]]', '[1.6 数组](/posts/computer/notes/1.6-数组)'],
  ['docs/guide/video-ka-map.md', '[[1.7 函数]]', '[1.7 函数](/posts/computer/notes/1.7-函数)'],

  // ═══════════════════════════════════════════════════════════════
  // docs/posts/computer/notes/syllabus.md  (24处)
  // ═══════════════════════════════════════════════════════════════
  ['docs/posts/computer/notes/syllabus.md', '[[1.1 C语言概述与基本概念]]', '[1.1 C语言概述与基本概念](/posts/computer/notes/1.1-C语言概述与基本概念)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.2 数据的存储与运算]]', '[1.2 数据的存储与运算](/posts/computer/notes/1.2-数据的存储与运算)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.3 顺序程序设计]]', '[1.3 顺序程序设计](/posts/computer/notes/1.3-顺序程序设计)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.4 选择结构程序设计]]', '[1.4 选择结构程序设计](/posts/computer/notes/1.4-选择结构程序设计)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.5 循环结构程序设计]]', '[1.5 循环结构程序设计](/posts/computer/notes/1.5-循环结构程序设计)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.6 数组]]', '[1.6 数组](/posts/computer/notes/1.6-数组)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.7 函数]]', '[1.7 函数](/posts/computer/notes/1.7-函数)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.8 指针]]', '[1.8 指针](/posts/computer/notes/1.8-指针)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.9 结构体与共用体]]', '[1.9 结构体与共用体](/posts/computer/notes/1.9-结构体与共用体)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.10 文件操作]]', '[1.10 文件操作](/posts/computer/notes/1.10-文件操作)'],
  ['docs/posts/computer/notes/syllabus.md', '[[1.11 程序运行环境与调试]]', '[1.11 程序运行环境与调试](/posts/computer/notes/1.11-程序运行环境与调试)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.1 数据结构基本概念]]', '[2.1 数据结构基本概念](/posts/computer/notes/2.1-数据结构基本概念)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.2 线性表]]', '[2.2 线性表](/posts/computer/notes/2.2-线性表)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.3 栈和队列]]', '[2.3 栈和队列](/posts/computer/notes/2.3-栈和队列)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.4 串、数组和广义表]]', '[2.4 串、数组和广义表](/posts/computer/notes/2.4-串、数组和广义表)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.5 树和二叉树]]', '[2.5 树和二叉树](/posts/computer/notes/2.5-树和二叉树)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.6 图]]', '[2.6 图](/posts/computer/notes/2.6-图)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.7 查找]]', '[2.7 查找](/posts/computer/notes/2.7-查找)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.8 排序]]', '[2.8 排序](/posts/computer/notes/2.8-排序)'],
  ['docs/posts/computer/notes/syllabus.md', '[[2.9 算法基本概念与分析]]', '[2.9 算法基本概念与分析](/posts/computer/notes/2.9-算法基本概念与分析)'],
  ['docs/posts/computer/notes/syllabus.md', '[[历年真题/计算机程序设计/2024|2024 全卷]]', '[2024 全卷](/posts/computer/2024)'],
  ['docs/posts/computer/notes/syllabus.md', '[[历年真题/计算机程序设计/考点拆分/_索引|考点拆分]]', '[考点拆分](/posts/computer/topics/)'],
  ['docs/posts/computer/notes/syllabus.md', '[[计算机程序设计]]', '计算机程序设计（源库文件，站点未发布版）'],

  // ═══════════════════════════════════════════════════════════════
  // docs/posts/math/notes/syllabus.md  (9处)
  // ═══════════════════════════════════════════════════════════════
  ['docs/posts/math/notes/syllabus.md', '[[第一章 函数与极限]]', '第一章 函数与极限（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第二章 一元函数微分学]]', '第二章 一元函数微分学（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第三章 一元函数积分学]]', '第三章 一元函数积分学（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第四章 向量与空间几何]]', '第四章 向量与空间几何（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第五章 多元函数]]', '第五章 多元函数（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第六章 重积分与曲线积分]]', '第六章 重积分与曲线积分（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第七章 常微分方程]]', '第七章 常微分方程（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[第八章 无穷级数]]', '第八章 无穷级数（笔记见 /posts/math/notes/）'],
  ['docs/posts/math/notes/syllabus.md', '[[高等数学]]', '高等数学（笔记见 /posts/math/notes/）'],
];

// ═══════════════════════════════════════════════════════════════
// 执行替换
// ═══════════════════════════════════════════════════════════════
const fileStats = {};
let total = 0;

for (const [relPath, oldText, newText] of replacements) {
  const fullPath = join(ROOT, relPath);
  let content;
  try {
    content = readFileSync(fullPath, 'utf-8');
  } catch {
    console.error(`❌ 文件不存在: ${relPath}`);
    continue;
  }

  const oldCount = countOccurrences(content, oldText);
  if (oldCount === 0) {
    console.warn(`⚠️ 未找到匹配: ${relPath} → "${oldText.slice(0, 30)}..."`);
    continue;
  }

  const newContent = content.split(oldText).join(newText);
  // 验证旧文本确实被替换了
  const remaining = countOccurrences(newContent, oldText);
  const replaced = oldCount - remaining;

  writeFileSync(fullPath, newContent, 'utf-8');
  fileStats[relPath] = (fileStats[relPath] || 0) + replaced;
  total += replaced;
  console.log(`✅ ${relPath}: 替换 ${replaced} 处`);
}

// ═══════════════════════════════════════════════════════════════
// 报告
// ═══════════════════════════════════════════════════════════════
console.log('\n' + '='.repeat(60));
console.log('📊 修复完成');
console.log('='.repeat(60));
console.log(`总替换: ${total} 处`);
console.log(`涉及文件: ${Object.keys(fileStats).length} 个`);
console.log('\n修改变更:');
for (const [f, count] of Object.entries(fileStats).sort()) {
  console.log(`  ${f}: ${count} 处`);
}
console.log('\n💡 验证: 运行 npm run health:check 确认断链清零');

function countOccurrences(str, sub) {
  let count = 0, pos = 0;
  while ((pos = str.indexOf(sub, pos)) !== -1) {
    count++;
    pos += sub.length;
  }
  return count;
}