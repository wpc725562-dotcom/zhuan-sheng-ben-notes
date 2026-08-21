#!/usr/bin/env node
/**
 * 修复被 spacing 脚本误伤的 URL（github. com → github.com, www. xxx → www.xxx）
 * 用法：node scripts/fix-url-damage.mjs [--dry-run]
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DRY = process.argv.includes('--dry-run')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (name.startsWith('.') || name === 'node_modules' || name === 'dist' || name === 'cache' || name === '.git') continue
    if (statSync(p).isDirectory()) walk(p, out)
    else if (p.endsWith('.md')) out.push(p)
  }
  return out
}

function fixUrls(text) {
  let count = 0
  // 1. 域名被拆：github. com → github.com（含 https:// 后的）
  const before = text
  text = text.replace(/(https?:\/\/[a-zA-Z0-9_-]+)\. ([a-zA-Z]{2,5})\b/g, (m, a, b) => { count++; return `${a}.${b}` })
  // 2. www. xxx → www.xxx（www 后空格）
  text = text.replace(/\b(www)\. ([a-zA-Z0-9])/g, (m, a, b) => { count++; return `${a}.${b}` })
  // 3. 常见顶级域被拆：. com / . cn / . org 等（前面是域名片段）
  text = text.replace(/([a-zA-Z0-9_-])\. (com|cn|org|net|edu|io|gov|info|me|co)\b/g, (m, a, b) => { count++; return `${a}.${b}` })
  // 4. markdown 链接内的 https://... 被拆的恢复（兜底：url 内 . 空格）
  text = text.replace(/([a-z0-9])\. ([a-z0-9])/gi, (m, a, b) => {
    // 仅在看起来像域名上下文中恢复（前面有 // 或 . 或 www）
    // 简化：检查周围是否 URL 特征
    return m
  })
  return { text, count }
}

const files = walk(ROOT)
let total = 0
for (const f of files) {
  const content = readFileSync(f, 'utf-8')
  const { text, count } = fixUrls(content)
  if (count > 0) {
    total += count
    if (!DRY) writeFileSync(f, text, 'utf-8')
    console.log(`${DRY ? '🔍' : '✅'} ${count} 处 | ${f.slice(ROOT.length + 1)}`)
  }
}
console.log(`\n${DRY ? '🔍 发现' : '✅ 修复'} ${total} 处 URL 破坏`)
