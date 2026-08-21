#!/usr/bin/env node
/**
 * 每日刷题计划 + 随机抽题
 * 用法：
 *   node scripts/daily-drill.mjs                    # 生成今日刷题计划（随机抽题）
 *   node scripts/daily-drill.mjs --subject 政治      # 只抽政治
 *   node scripts/daily-drill.mjs --count 10          # 每题科目抽 10 道（默认 5）
 *   node scripts/daily-drill.mjs --output plan.md    # 输出到文件
 *   node scripts/daily-drill.mjs --list              # 列出各题库题量
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const getArg = (name) => { const i = args.indexOf('--' + name); return i >= 0 ? args[i + 1] : undefined }
const subject = getArg('subject')
const count = parseInt(getArg('count') || '5', 10)
const output = getArg('output')

// ============ 题库源 ============
const BANKS = {
  '政治': { file: join(ROOT, '资料', '政治选择题题库.md'), type: 'choice' },
  '高数': { file: join(ROOT, '资料', '高数计算题专项训练.md'), type: 'calc' },
  '简答': { file: join(ROOT, '资料', '高频简答题库.md'), type: 'short' },
}

// ============ 解析器 ============
function parseChoice(content) {
  const norm = content.replace(/\r\n/g, '\n')
  // 按 "**单选题 Q1.**" 或 "**多选题 Q3.**" 拆分
  const blocks = norm.split(/(?=\*\*(?:单选|多选)题 Q\d+\.\*\*)/)
  const items = []
  for (const b of blocks) {
    const m = b.match(/^\*\*(单选|多选)题 Q(\d+)\.\*\*(.*?)(?=\n> \*\*答案\*\*)/s)
    if (!m) continue
    const ans = b.match(/> \*\*答案\*\*：([A-D]+)/)
    items.push({ q: m[3].trim(), type: m[1], ans: ans ? ans[1] : '?' })
  }
  return items
}

function parseCalc(content) {
  const norm = content.replace(/\r\n/g, '\n')
  const blocks = norm.split(/(?=### 计算题 #\d+)/)
  const items = []
  for (const b of blocks) {
    const m = b.match(/### 计算题 #(\d+)（(.+?)）\n\n\*\*题目\*\*：(.*?)(?=\n\*\*解\*\*)/s)
    if (!m) continue
    items.push({ q: m[3].trim(), topic: m[2], ans: '见原文档' })
  }
  return items
}

function parseShort(content) {
  const norm = content.replace(/\r\n/g, '\n')
  const blocks = norm.split(/(?=### |\d+\.\s|##)/)
  const items = []
  for (const b of blocks) {
    const m = b.match(/(?:### |^)\d+\.\s*(.+)/m)
    if (m) items.push({ q: m[1].trim(), ans: '见原文档' })
  }
  return items
}

// ============ 主逻辑 ============
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

if (args.includes('--list')) {
  console.log('📚 题库题量统计：')
  for (const [name, bank] of Object.entries(BANKS)) {
    if (!existsSync(bank.file)) { console.log(`  ${name}: 文件不存在`); continue }
    const c = readFileSync(bank.file, 'utf-8')
    let n = 0
    if (bank.type === 'choice') n = parseChoice(c).length
    else if (bank.type === 'calc') n = parseCalc(c).length
    else if (bank.type === 'short') n = parseShort(c).length
    console.log(`  ${name}: ${n} 题`)
  }
  process.exit(0)
}

const subjects = subject ? [subject] : Object.keys(BANKS)
const today = new Date()
const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
const lines = [`# 📅 每日刷题计划 · ${dateStr}`, '', '> 由 scripts/daily-drill.mjs 随机生成，每天不一样。', '']

let total = 0
for (const s of subjects) {
  const bank = BANKS[s]
  if (!bank || !existsSync(bank.file)) { lines.push(`⚠️ ${s}: 题库不存在`); continue }
  const content = readFileSync(bank.file, 'utf-8')
  let items = []
  if (bank.type === 'choice') items = parseChoice(content)
  else if (bank.type === 'calc') items = parseCalc(content)
  else if (bank.type === 'short') items = parseShort(content)
  const picked = shuffle(items).slice(0, Math.min(count, items.length))
  lines.push(`## ${s}（抽 ${picked.length} 题）`, '')
  picked.forEach((it, i) => {
    lines.push(`### ${s} #${i + 1} ${it.type ? `（${it.type}）` : ''}${it.topic ? `【${it.topic}】` : ''}`, '')
    lines.push(it.q, '')
    lines.push('<details><summary>查看答案</summary>', '', `**答案**：${it.ans}`, '', '</details>', '')
  })
  total += picked.length
}
lines.push('---', `共 ${total} 题。完成后记录错题：docs/checklists/错题本模板.md`)

const out = output ? join(ROOT, output) : join(ROOT, 'plan', `每日刷题-${dateStr}.md`)
writeFileSync(out, lines.join('\n'), 'utf-8')
console.log(`✅ 已生成每日刷题计划：${out}（${total} 题）`)
