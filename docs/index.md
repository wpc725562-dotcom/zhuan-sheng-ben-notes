---
layout: home
title: 广东专升本 · 复习笔记
hero:
  name: 广东专升本
  text: 复习笔记站
  tagline: Sakiko 式正文嵌题 · 樱花二次元主题 · 你的专属学习构造
  image:
    src: /avatar.webp
    alt: 看板娘
  actions:
    - theme: brand
      text: 高数 2026 全卷
      link: /posts/math/2026
    - theme: brand
      text: 计算机 2024 全卷
      link: /posts/computer/2024
    - theme: alt
      text: 英语 2008–2024
      link: /posts/english/
    - theme: alt
      text: GitHub
      link: https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes

features:
  - title: 题目嵌在正文里
    details: 不再用 PDF 当主界面。题干、选项、答案解析像 Sakiko 一样直接写在 Markdown 页面中，可搜索、可复制、可公式渲染。
  - title: 二次元主题
    details: 樱花色 · 暗色网格背景 · 左下 Live2D 看板娘 · 樱花粒子 · 音乐按钮 · 阅读进度条。
  - title: 你的学习构造
    details: 计算机考点拆分 5 篇 + 英语 17 年 + 高数 2024/2026 全卷详解，按科目侧栏刷题。
  - title: 零服务器
    details: VitePress + GitHub Pages。Obsidian 源库照旧，网站用 docs/posts 网页版。
---

<div class="hero-sakura">

# 怎么刷（推荐顺序）

1. **计算机** → [2024 全卷](/posts/computer/2024) → [考点拆分](/posts/computer/topics/)
2. **高数** → [2026](/posts/math/2026) → [2024](/posts/math/2024)
3. **英语** → 近三年 [2024](/posts/english/2024) / [2023](/posts/english/2023) / [2022](/posts/english/2022)，再回溯

</div>

## 科目入口

<div class="home-grid">
  <a class="home-card" href="./posts/computer/2024">
    <h3>💻 计算机 2024</h3>
    <p>单选 / 判断 / 填空 / 简答 / 计算 / 编程 · 全量解析</p>
  </a>
  <a class="home-card" href="./posts/math/2026">
    <h3>📐 高等数学 2026</h3>
    <p>Sakiko 同款题干 + 公式 + 答案引用块</p>
  </a>
  <a class="home-card" href="./posts/english/">
    <h3>英文 公共英语</h3>
    <p>2008–2024 正文嵌入 · 答案速查 · 写作范文</p>
  </a>
  <a class="home-card" href="./posts/computer/topics/">
    <h3>🎯 考点拆分</h3>
    <p>C 基础 · 数组指针 · 链表 · 树图 · 手写代码</p>
  </a>
</div>

## 和 Sakiko 的关系（透明说明）

| 项 | 说明 |
|:---|:---|
| 视觉 / 主题 | 参考开源仓库 [a3292334877-star/blog](https://github.com/a3292334877-star/blog) 的 VitePress 樱花主题与 Live2D |
| 高数真题文 | 移植其公开的 2024/2026 回忆版详解，站内可离线阅读 |
| 你的增量 | 英语 17 年、计算机考点拆分、专升本导航与学习路径 |
| 版权边界 | 回忆版仅供个人备考；主题代码按原仓库 MIT 精神保留致谢 |

## 本地预览

```bash
cd "D:/专升本/专升本"
npm install
npm run docs:dev
```

打开终端里的本地地址即可（带 `/zhuan-sheng-ben-notes/` 前缀）。

## 资料边界

本站真题为**考生回忆版 / OCR 汇编**，非考试院原卷。详见 [使用说明](/guide/) 与 [资料边界](/guide/sources)。
