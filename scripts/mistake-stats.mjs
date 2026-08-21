#!/usr/bin/env node
/**
 * 错题统计：分析错题本，统计薄弱知识点与错误原因分布
 * 用法：
 *   node scripts/mistake-stats.mjs                 # 统计 备考计划/错题本模板.md
 *   node scripts/mistake-stats.mjs --file <path>   # 指定文件
 *   node scripts/mistake-stats.mjs --json          # JSON 输出
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const getArg = (name) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : undefined }
const file = getArg('file') || join(ROOT, '备考计划', '错题本模板.md')
const JSON_OUT = args.includes('--json')

if (!existsSync(file)) {
  console.error(`文件不存在: ${file}`)
  process.exit(1)
}

const content = readFileSync(file, 'utf-8')

// 拆分错题块：### 错题 #XXX 到下一个 ### 或文件尾
const blocks = content.split(/(?=### 错题 #)/).slice(1)
const stats = {
  total: blocks.length,
  bySubject: {},
  byReason: {},
  byKnowledge: {},
  mastered: 0,
  pending: 0,
}

for (const b of blocks) {
  const idMatch = b.match(/### 错题 #([A-Z])(\d+)/)
  const subject = idMatch ? idMatch[1] : '?'
  const subjectName = { C: '计算机', M: '高数', P: '政治', E: '英语' }[subject] || subject
  stats.bySubject[subjectName] = (stats.bySubject[subjectName] || 0) + 1

  const reason = b.match(/- \*\*错误原因\*\*：(.+)/)
  if (reason) {
    const r = reason[1].trim()
    stats.byReason[r] = (stats.byReason[r] || 0) + 1
  }
  const knowledge = b.match(/- \*\*知识点\*\*：(.+)/)
  if (knowledge) {
    const k = knowledge[1].trim()
    stats.byKnowledge[k] = (stats.byKnowledge[k] || 0) + 1
  }
  const review = b.match(/- \*\*复习记录\*\*：([\s\S]*?)(?=\n\n|\n- \*\*|$)/)
  if (review) {
    const okCount = (review[1].match(/✅/g) || []).length
    const failCount = (review[1].match(/❌/g) || []).length
    if (okCount >= 3 && failCount === 0) stats.mastered++
    else stats.pending++
  }
}

if (JSON_OUT) {
  console.log(JSON.stringify(stats, null, 2))
  process.exit(0)
}

console.log('📊 错题统计报告')
console.log('='.repeat(40))
console.log(`错题总数：${stats.total}`)
console.log(`已掌握：${stats.mastered} · 待复习：${stats.pending}`)
console.log('')
console.log('📚 按科目：')
for (const [k, v] of Object.entries(stats.bySubject).sort((a, b) => b[1] - a[1]))
  console.log(`  ${k}: ${v} 题`)
console.log('')
console.log('❌ 按错误原因（薄弱环节）：')
for (const [k, v] of Object.entries(stats.byReason).sort((a, b) => b[1] - a[1]))
  console.log(`  ${k}: ${v}`)
console.log('')
console.log('🎯 按知识点（高频错点 = 优先复习）：')
for (const [k, v] of Object.entries(stats.byKnowledge).sort((a, b) => b[1] - a[1]))
  console.log(`  ${k}: ${v}`)
