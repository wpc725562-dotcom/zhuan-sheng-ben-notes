#!/usr/bin/env node
/**
 * 英文黏连自动修复：句号/逗号后缺空格 → 补空格
 * 用法：
 *   node scripts/fix-english-spacing.mjs                # 修复 docs/posts/english 下的英文笔记
 *   node scripts/fix-english-spacing.mjs --dry-run      # 只报告不修改
 *   node scripts/fix-english-spacing.mjs --path <文件>  # 指定文件
 *   node scripts/fix-english-spacing.mjs --all          # 全库英文相关文件
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DRY = process.argv.includes('--dry-run')
const getArg = (n) => { const i = process.argv.indexOf('--' + n); return i >= 0 ? process.argv[i + 1] : undefined }

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (name.startsWith('.') || name === 'node_modules' || name === 'dist' || name === 'cache') continue
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith('.md')) out.push(p)
  }
  return out
}

// 修复规则：句号/逗号/问号/感叹号 后紧跟字母（无空格）→ 补空格
// 排除：URL 域名、数字小数点（3.5）、省略号（...）、时间、版本号
function fixSpacing(text) {
  let count = 0
  // 先保护 URL（http/https 开头的完整链接）——用占位符替换，最后恢复
  const urls = []
  text = text.replace(/https?:\/\/[^\s)"'》]+/g, (m) => {
    urls.push(m)
    return `\u0000URL${urls.length - 1}\u0000`
  })
  // 1. 句号后无空格：word.word 或 word.）word
  text = text.replace(/([a-zA-Z0-9])\.([a-zA-Z])/g, (m, a, b) => {
    // 排除数字小数点（如 3.5, 2.0）
    if (/^\d$/.test(a) && /^\d$/.test(b)) return m
    count++
    return `${a}. ${b}`
  })
  // 2. 逗号后无空格：word,word
  text = text.replace(/([a-zA-Z0-9]),([a-zA-Z])/g, (m, a, b) => {
    if (/^\d$/.test(a) && /^\d$/.test(b)) return m
    count++
    return `${a}, ${b}`
  })
  // 3. 问号/感叹号后无空格
  text = text.replace(/([a-zA-Z0-9])([?!])([a-zA-Z])/g, (m, a, p, b) => {
    count++
    return `${a}${p} ${b}`
  })
  // 恢复 URL
  text = text.replace(/\u0000URL(\d+)\u0000/g, (m, i) => urls[Number(i)] ?? m)
  return { text, count }
}

// 目标文件
let files = []
const pathArg = getArg('path')
if (pathArg) files = [resolve(ROOT, pathArg)]
else if (process.argv.includes('--all')) files = walk(ROOT).filter(p => p.includes('英语') || p.includes('english'))
else files = walk(join(ROOT, 'docs/posts/english')).concat(walk(join(ROOT, '资料/ForestDeer资源/英语')))

let totalFixes = 0
for (const f of files) {
  const content = readFileSync(f, 'utf-8')
  const { text, count } = fixSpacing(content)
  if (count > 0) {
    totalFixes += count
    if (!DRY) writeFileSync(f, text, 'utf-8')
    console.log(`${DRY ? '🔍 发现' : '✅ 修复'} ${count} 处 | ${f.slice(ROOT.length + 1)}`)
  }
}
console.log(`\n${DRY ? '🔍 共发现' : '✅ 共修复'} ${totalFixes} 处黏连${DRY ? '（--dry-run 未修改）' : ''}`)
