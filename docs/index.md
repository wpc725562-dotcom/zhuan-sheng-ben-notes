---
layout: home
title: 广东专升本 · 复习笔记
hero:
  name: 广东专升本
  text: 复习笔记站
  tagline: Obsidian 全库上站 · Sakiko 式正文嵌题 · 樱花二次元主题
  image:
    src: /avatar.webp
    alt: 看板娘
  actions:
    - theme: brand
      text: 高数章节笔记
      link: /posts/math/notes/
    - theme: brand
      text: 计算机知识点
      link: /posts/computer/notes/
    - theme: alt
      text: 英语真题
      link: /posts/english/
    - theme: alt
      text: GitHub
      link: https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes

features:
  - title: Obsidian 学习库上站
    details: 高数 50+ 章节、计算机 1.1–2.9、英语系统笔记、各科真题——不再只开本地库。
  - title: 题目嵌在正文里
    details: 题干、选项、答案解析直接写在 Markdown 页面中，可搜索、可复制、可公式渲染。
  - title: 二次元主题
    details: 樱花色 · 暗色网格 · 左下 Live2D · 樱花粒子 · 音乐按钮 · 阅读进度条。
  - title: 零服务器
    details: VitePress + GitHub Pages。源库仍在 Obsidian，网站是可读可刷的网页版。
---

<div class="hero-sakura">

# 怎么刷（推荐顺序）

1. **计算机** → [知识点](/posts/computer/notes/) → [2024 全卷](/posts/computer/2024) → [考点拆分](/posts/computer/topics/)
2. **高数** → [章节笔记](/posts/math/notes/) → [2026](/posts/math/2026) / [2024](/posts/math/2024)
3. **英语** → [学习笔记](/posts/english/notes/) → 近三年真题
4. **政治** → [真题总览](/posts/politics/)

</div>

## 科目入口

<div class="home-grid">
  <a class="home-card" href="./posts/math/notes/">
    <h3>📐 高数章节</h3>
    <p>函数极限 · 微分 · 积分 · 多元 · 级数 · 全库同步</p>
  </a>
  <a class="home-card" href="./posts/computer/notes/">
    <h3>💻 计算机知识点</h3>
    <p>C 1.1–1.11 + 数据结构 2.1–2.9</p>
  </a>
  <a class="home-card" href="./posts/english/notes/">
    <h3>英文 英语笔记</h3>
    <p>词汇 · 语法 · 阅读 · 作文模板</p>
  </a>
  <a class="home-card" href="./posts/math/2026">
    <h3>📝 高数 2026 卷</h3>
    <p>Sakiko 同款正文嵌题 + 公式</p>
  </a>
  <a class="home-card" href="./posts/computer/2024">
    <h3>📝 计算机 2024 卷</h3>
    <p>全卷详解 · 单选到编程</p>
  </a>
  <a class="home-card" href="./posts/english/">
    <h3>📝 英语真题</h3>
    <p>2008–2024 正文嵌入</p>
  </a>
  <a class="home-card" href="./posts/politics/">
    <h3>📕 政治理论</h3>
    <p>2018–2024 同型演练</p>
  </a>
  <a class="home-card" href="./posts/computer/topics/">
    <h3>🎯 考点拆分</h3>
    <p>C 基础 · 指针 · 链表 · 树图 · 手写</p>
  </a>
</div>

## 本站有什么（相对 Obsidian）

| 区块 | 站内位置 | 来源 |
|:---|:---|:---|
| 高数章节 50+ 篇 | [/posts/math/notes/](/posts/math/notes/) | `高等数学/` |
| 计算机 20 篇知识点 | [/posts/computer/notes/](/posts/computer/notes/) | `计算机程序设计/` |
| 英语系统笔记 | [/posts/english/notes/](/posts/english/notes/) | `编程技能/专升本英语/` |
| 高数真题 | [/posts/math/](/posts/math/) | 2024/2026 完整 + 历年演练 |
| 计算机真题 | [/posts/computer/](/posts/computer/) | 2024 完整 + 历年演练 |
| 英语真题 | [/posts/english/](/posts/english/) | 2008–2024 |
| 政治真题 | [/posts/politics/](/posts/politics/) | 2018–2024 |

## 和 Sakiko 的关系（透明说明）

| 项 | 说明 |
|:---|:---|
| 视觉 / 主题 | 参考 [a3292334877-star/blog](https://github.com/a3292334877-star/blog) 樱花主题与 Live2D |
| 高数 2024/2026 详解 | 移植其公开回忆版文 |
| 你的增量 | **Obsidian 全科学习库**、英语 17 年、计算机考点拆分与知识点 |
| 版权边界 | 回忆版仅供个人备考；主题保留致谢 |

## 本地预览

```bash
cd "D:/专升本/专升本"
npm install
npm run docs:dev
```

## 资料边界

本站真题为**考生回忆版 / OCR 汇编 / 同型演练**，非考试院原卷。详见 [使用说明](/guide/) 与 [资料边界](/guide/sources)。
