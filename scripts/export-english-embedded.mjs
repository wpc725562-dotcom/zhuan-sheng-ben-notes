/**
 * 把 OCR 卷面 + 答案 转成 Sakiko 体例的「题干嵌入 + 答案引用块」Markdown
 * 输出到 docs/posts/english/{year}.md
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const BY = path.join(ROOT, '资料/英语真题原卷/_by_year')
const OUT = path.join(ROOT, 'docs/posts/english')

const YEARS = [
  2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
  2011, 2010, 2009, 2008,
]

function read(p) {
  try {
    return fs.readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

/** 轻量修复 OCR 常见粘连（不完全，仅可读性） */
function softFix(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/<!--\s*page\s+\d+\s*-->/gi, '')
    .trim()
}

/** 从答案文本里抽「题号.选项」映射 */
function parseAnswerMap(ansText) {
  const map = new Map()
  const t = softFix(ansText)
  // 1.D  1. D  1、D  答案：D 等
  const re = /(?:^|\s)(\d{1,2})\s*[\.、:：]\s*([A-Ea-e])\b/g
  let m
  while ((m = re.exec(t))) {
    map.set(Number(m[1]), m[2].toUpperCase())
  }
  // 答案：D 紧跟题号
  const re2 = /(\d{1,2})\s*[.、]?\s*答案\s*[:：]\s*([A-Ea-e])/g
  while ((m = re2.exec(t))) {
    map.set(Number(m[1]), m[2].toUpperCase())
  }
  return map
}

/** 抽取写作范文片段 */
function extractWriting(ansText) {
  const t = softFix(ansText)
  const idx = t.search(/Part\s*III|Writing|【参考范文】|参考范文|应用文/i)
  if (idx < 0) return ''
  let chunk = t.slice(idx, idx + 2500)
  // 截到下一 page 或解析
  chunk = chunk.split(/<!--|广东省\s*\d{4}.*解析|第一节/)[0]
  return chunk.trim()
}

/** 把答案解析按「数字.答案」切成段落 */
function extractExplanations(ansText) {
  const t = softFix(ansText)
  // 找「解析」主体
  let body = t
  const p = t.search(/解析|第一节|PartI|阅读理解/)
  if (p >= 0) body = t.slice(p)
  // 保留前 12000 字防爆
  if (body.length > 14000) body = body.slice(0, 14000) + '\n\n…（解析过长已截断，完整见原卷 OCR）'
  return body
}

function splitQuestionsRough(paper) {
  const t = softFix(paper)
  // 按题号切：行首 1. 2. 或 1、
  const parts = t.split(/(?=^\s*\d{1,2}\s*[\.、]\s*)/m).filter((x) => x.trim())
  const qs = []
  for (const part of parts) {
    const m = part.match(/^\s*(\d{1,2})\s*[\.、]\s*([\s\S]*)/)
    if (!m) continue
    const n = Number(m[1])
    let body = m[2].trim()
    // 跳过卷首注意事项等非题目；真实英语题通常含英文或 A-D 选项
    if (/^(考生|答卷|注意事项|本试卷|密封|姓名|准考证|必须|请|共\s*\d|试卷共|选择题|非选择题|用2B|黑色字迹)/.test(body)) continue
    if (body.length < 12) continue
    const hasEn = /[A-Za-z]{3,}/.test(body)
    const hasOpt = /[A-D]\s*[\.、]/.test(body)
    if (!hasEn && !hasOpt) continue
    if (body.length > 1800) body = body.slice(0, 1800) + '…'
    qs.push({ n, body })
  }
  return qs
}

function buildMd(year, paper, answers) {
  const map = parseAnswerMap(answers)
  const writing = extractWriting(answers)
  const expl = extractExplanations(answers)
  const qs = splitQuestionsRough(paper)

  const lines = []
  lines.push('---')
  lines.push(`title: 公共英语 ${year} 真题详解`)
  lines.push(
    `description: 广东专升本公共英语 ${year} · 正文嵌入题干 + 答案解析（Sakiko 体例）`,
  )
  lines.push(`tags: [专升本, 公共英语, 真题, ${year}]`)
  lines.push('---')
  lines.push('')
  lines.push(`# 公共英语 · ${year} 年真题详解`)
  lines.push('')
  lines.push(
    `> **体例**：题干直接写在网页里（非 PDF 预览）· 对标 [Sakiko 博客体例](https://sakikoblog.info/)`,
  )
  lines.push(
    `> **资料层级**：OCR 回忆/汇编卷 · 空格粘连以卷面为准 · 仅供个人备考`,
  )
  lines.push(`> [英语总览](/posts/english/) · [资料说明](/guide/sources)`)
  lines.push('')
  lines.push('## 试卷结构（备考）')
  lines.push('')
  lines.push('| 题型 | 约分 | 说明 |')
  lines.push('|:---|---:|:---|')
  lines.push('| 阅读理解 | ~30–40 | 多篇短文 / 信息匹配 |')
  lines.push('| 语言运用（完形/语法/词汇） | ~30–45 | 单选 + 语法填空 |')
  lines.push('| 写作 | 15 | 应用文约 100 词 |')
  lines.push('')
  lines.push('---')
  lines.push('')

  if (qs.length >= 5) {
    lines.push('## 客观题（正文嵌入）')
    lines.push('')
    lines.push(
      '> 下列题干来自 OCR，个别单词可能粘连（如 `thesentence`）。刷题时以选项与答案为准。',
    )
    lines.push('')
    for (const q of qs.slice(0, 55)) {
      lines.push(`### ${q.n}.`)
      lines.push('')
      // 把 body 里的 A. B. C. D. 尽量分行
      let b = q.body
        .replace(/\s*([A-D])\s*[\.、]\s*/g, '\n\n$1. ')
        .replace(/\n{3,}/g, '\n\n')
        .trim()
      lines.push(b)
      lines.push('')
      const ans = map.get(q.n)
      if (ans) {
        lines.push(`> **答案：${ans}**`)
        lines.push('>')
        lines.push('> 详见下方「答案解析」对应题号。')
      } else {
        lines.push('> **答案：** 见文末答案速查')
      }
      lines.push('')
      lines.push('---')
      lines.push('')
    }
  } else {
    lines.push('## 卷面正文（OCR 全文嵌入）')
    lines.push('')
    lines.push(
      '> 本年份 OCR 未能稳定切题号，以下为全文嵌入（可复制）。仍**不是 PDF 预览**。',
    )
    lines.push('')
    const body = softFix(paper)
    // escape vue interpolation
    const safe = body.replace(/\{\{/g, '{{\'{{\'}}').replace(/\}\}/g, '{{\'}}}\'}}')
    lines.push(safe.slice(0, 25000) || '_（本年份卷面文本暂缺）_')
    lines.push('')
  }

  // 答案速查
  if (map.size) {
    lines.push('## 客观题答案速查')
    lines.push('')
    const keys = [...map.keys()].sort((a, b) => a - b)
    const chunks = []
    for (let i = 0; i < keys.length; i += 10) {
      chunks.push(keys.slice(i, i + 10).map((k) => `${k}.${map.get(k)}`).join('  '))
    }
    lines.push('```')
    lines.push(chunks.join('\n'))
    lines.push('```')
    lines.push('')
  }

  if (writing) {
    lines.push('## 写作 · 参考范文')
    lines.push('')
    lines.push('```')
    lines.push(writing.slice(0, 2000).replace(/\{\{/g, '&#123;&#123;'))
    lines.push('```')
    lines.push('')
  }

  if (expl) {
    lines.push('## 答案解析（OCR）')
    lines.push('')
    lines.push(
      '> 解析原文可能粘连；重点看「答案：X」与中文解析句。',
    )
    lines.push('')
    const safe = expl.replace(/\{\{/g, '{{\'{{\'}}').replace(/\}\}/g, '{{\'}}}\'}}')
    lines.push('```')
    lines.push(safe)
    lines.push('```')
    lines.push('')
  }

  lines.push('## 备用：原卷 PDF（可选下载）')
  lines.push('')
  lines.push(
    `若需要原排版对照，可下载：`,
  )
  lines.push('')
  lines.push(
    `- [完整卷面](/papers/english/${year}-full.pdf) · [仅卷面](/papers/english/${year}-paper.pdf) · [答案](/papers/english/${year}-answers.pdf)`,
  )
  lines.push('')
  lines.push(
    '> PDF 仅作对照，**主学习路径是本页正文嵌入**。',
  )
  lines.push('')
  lines.push(
    '*免责声明：回忆/汇编卷 OCR，非考试院原卷；仅供个人备考。*',
  )
  lines.push('')
  return lines.join('\n')
}

function main() {
  fs.mkdirSync(OUT, { recursive: true })
  const indexRows = []
  for (const year of YEARS) {
    const paper =
      read(path.join(BY, `${year}-paper.txt`)) ||
      read(path.join(BY, `${year}-full.txt`)) ||
      ''
    const answers =
      read(path.join(BY, `${year}-answers.txt`)) ||
      read(path.join(BY, `${year}-answers-partial.txt`)) ||
      ''
    // 2024 特殊
    const paper2 =
      paper ||
      (year === 2024 ? read(path.join(BY, '2024-answers-partial.txt')) : '')
    const md = buildMd(year, paper2 || paper, answers || paper2)
    const out = path.join(OUT, `${year}.md`)
    fs.writeFileSync(out, md, 'utf8')
    const qs = splitQuestionsRough(paper2 || paper).length
    indexRows.push(`| ${year} | [打开](/posts/english/${year}) | 正文嵌入 · 切题约 ${qs} 道 |`)
    console.log('wrote', year, 'qs~', qs, 'ans', parseAnswerMap(answers).size)
  }

  const index = `---
title: 公共英语 · 真题总览
description: 广东专升本公共英语 2008–2024 · 正文嵌入题干（非 PDF）
---

# 公共英语 · 真题总览

> 学习方式已升级为 **Sakiko 式正文嵌入**：题干、选项、答案块直接写在网页里，不再依赖 PDF 预览。

| 年份 | 页面 | 说明 |
|:---:|:---|:---|
${indexRows.join('\n')}

## 刷题建议

1. 先闭卷做「客观题」区
2. 对答案速查
3. 精读解析 OCR 中的中文说明
4. 写作默写范文结构（称呼 / 目的 / 三点理由 / 落款）

← [回首页](/)
`
  fs.writeFileSync(path.join(OUT, 'index.md'), index, 'utf8')
  console.log('index ok')
}

main()
