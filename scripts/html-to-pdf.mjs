#!/usr/bin/env node
/**
 * 用本机 Chrome headless 把可打印 HTML 批量转成 PDF
 * 用法：node scripts/html-to-pdf.mjs            # 转 docs/public/printable 下所有 html
 *       node scripts/html-to-pdf.mjs math       # 只转 math 前缀
 */
import { readdirSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const HTML_DIR = join(ROOT, 'docs', 'public', 'printable')
const PDF_DIR = join(ROOT, 'docs', 'public', 'papers', 'printable')
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'

const filter = process.argv[2] || ''
const files = readdirSync(HTML_DIR).filter((f) => f.endsWith('.html') && (!filter || f.startsWith(filter)))
const { mkdirSync } = await import('node:fs')
mkdirSync(PDF_DIR, { recursive: true })

let ok = 0, fail = 0
for (const f of files) {
  const src = 'file:///' + join(HTML_DIR, f).replace(/\\/g, '/')
  const pdf = join(PDF_DIR, f.replace(/\.html$/, '.pdf'))
  const r = spawnSync(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox',
    '--print-to-pdf=' + pdf,
    '--no-pdf-header-footer',
    src
  ], { stdio: 'ignore', timeout: 30000 })
  if (r.status === 0 && existsSync(pdf)) { ok++; console.log(`✅ ${f} -> ${pdf.replace(ROOT + '\\', '')}`) }
  else { fail++; console.log(`❌ ${f}`) }
}
console.log(`\n完成：${ok} 成功，${fail} 失败`)
console.log(`PDF 目录：docs/public/papers/printable/`)
