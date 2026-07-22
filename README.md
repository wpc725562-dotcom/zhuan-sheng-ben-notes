# 广东专升本 · 复习笔记站

> VitePress 静态站 · **Sakiko 式正文嵌题** · 樱花二次元主题（Live2D / 樱花粒子 / 暗色网格）

**线上：** https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/

## 主题致谢

视觉组件与 Live2D 资源参考开源仓库 [a3292334877-star/blog](https://github.com/a3292334877-star/blog)（Sakiko の博客，MIT）。
高数 2024/2026 详解移植自其公开博文；英语 / 计算机考点拆分为本库增量内容。

### 看板娘（可切换）

- 引擎：[hacxy/l2d-widget](https://github.com/hacxy/l2d-widget)（Cubism 2 + 6，MIT）
- 模型 CDN：`https://model.hacxy.cn`（[hacxy/l2d-models](https://github.com/hacxy/l2d-models)，仅学习/非商用）
- 默认：仙狐 Senko；菜单可换：小春 / 响 / Haru / Hiyori / 雫 / 黑猫 / 22 / 本地默认
- 桌面宽度 ≥ 900px 显示；左下角「🎭」切换、「×」关闭（记忆到 localStorage）


---

# 广东专升本 · 复习笔记库

> Obsidian 同步仓库 · 公共课 + 计算机专业课  
> 仓库：[`wpc725562-dotcom/zhuan-sheng-ben-notes`](https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes)

## 网站（像 Sakiko 博客那样打开）

- **在线地址（修好后）**：[https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/)
- 技术栈：**VitePress** + 公式渲染 + 本地搜索 + GitHub Pages（**不需要个人服务器**）
- 静态成品已推到 **`gh-pages` 分支**（可直接挂载）

### 若打开是 404（必做，约 1 分钟）

免费账号的 **GitHub Pages 不能挂私有仓库**。当前仓库若是 Private，会一直 404。

1. 打开：https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes/settings  
2. 滚到 **Danger Zone → Change repository visibility → Make public**（公开）  
3. 打开：https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes/settings/pages  
4. **Build and deployment → Source** 选 **Deploy from a branch**  
5. Branch 选 **`gh-pages`** / 文件夹 **`/ (root)`** → Save  
6. 等 1～2 分钟，刷新上面的在线地址  

> 备选：Source 选 **GitHub Actions**，再去 Actions 跑 `Deploy VitePress site to GitHub Pages`（同样要先 Public）。

### 本地预览网站

```bash
npm install
npm run docs:dev
# 浏览器打开终端提示的地址（路径含 /zhuan-sheng-ben-notes/）
```

### 网站目录

```
docs/
├── .vitepress/          # 站点配置与主题
├── index.md             # 首页
├── guide/               # 使用说明
├── posts/               # 网页版文章（从历年真题导出）
└── public/
```

### 英语：网页内直接看卷（不用本地 PDF）

- 入口：[公共英语总览](https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/posts/english/)
- 每年页顶部 **内嵌 PDF 预览** + 下载链接
- 文件在 `docs/public/papers/english/`（如 `2023-full.pdf`）

---

## 目录结构

```
.
├── 计算机程序设计.md          # C + 数据结构 21 考点 MoC
├── 计算机程序设计/            # 系统笔记 1.x / 2.x
├── 高等数学.md / 高等数学/
├── 政治.md / 英语.md
├── 历年真题/
│   ├── 00-资料来源与使用说明.md
│   ├── 总索引.md
│   ├── 计算机程序设计/
│   │   ├── _索引.md
│   │   ├── 2018.md … 2024.md
│   │   └── 考点拆分/          # 2024 按考点分批刷
│   ├── 公共英语/
│   ├── 高等数学/
│   └── 政治理论/
└── 编程技能/
```

---

## ★ 推荐先看：计算机 2024 全卷详解

路径：[`历年真题/计算机程序设计/2024.md`](./历年真题/计算机程序设计/2024.md)

- **科目**：《计算机基础与程序设计》（广东普通专升本统考）
- **满分** 200 · **时长** 150 分钟
- **体例**：全量回忆版题干 + 答案 + 逐步解析 + 考点分布 + 备考策略
- **对标博客**：[Sakiko · 2024 真题回忆版+详解](https://sakikoblog.info/posts/2024-zhuanchaben-c-programming)  
  已全量整理入库，并加本库系统笔记 / 考点拆分双向链接

### 考点拆分（分批刷）

| 拆分 | 内容 |
|:---|:---|
| [01 C 基础](./历年真题/计算机程序设计/考点拆分/01-C语言基础.md) | 语法 / 表达式 / 选择循环 |
| [02 数组指针](./历年真题/计算机程序设计/考点拆分/02-数组指针.md) | 数组 · 串 · 指针 |
| [03 链表栈队列](./历年真题/计算机程序设计/考点拆分/03-链表栈队列.md) | 顺序表 · 链表 · 栈序 |
| [04 树图查找](./历年真题/计算机程序设计/考点拆分/04-树图与查找.md) | 树 · 图 · 折半 · ADT |
| [05 手写编程](./历年真题/计算机程序设计/考点拆分/05-手写编程.md) | 3 道编程 + 简答模板 |

---

## 资料边界（必读）

见 [`历年真题/00-资料来源与使用说明.md`](./历年真题/00-资料来源与使用说明.md)

1. 考试院**不公开**原卷 PDF；网络流传多为**考生回忆版**
2. 本库保证：**广东题型结构 + 得分逻辑 + 可默写解法**
3. 措辞若与正版真题册不一致，**以纸质/当次正式卷为准**
4. 仅供个人学习，请勿当泄题卷传播

---

## 刷题建议

```
1. 闭卷限时做 2024 全卷摸底
2. 错题进「考点拆分」01–05 回炉
3. 回系统笔记 1.x / 2.x 补概念
4. 每周手撕 ≥2 道编程 + 1 道简答
```

---

## 本地使用

1. `git clone` 本仓库  
2. 用 [Obsidian](https://obsidian.md) 打开文件夹为库  
3. 图链图已用 `[[wikilink]]` 串联，点即可跳转  

---

## 致谢 / 来源

- 2024 计算机全卷详解体例参考：[sakikoblog.info](https://sakikoblog.info/posts/2024-zhuanchaben-c-programming)（Sakiko）  
- 系统笔记与考点拆分由个人备考过程维护  

---

## 更新

| 日期 | 内容 |
|:---|:---|
| 2026-07-22 | 初建四科历年真题骨架 |
| 2026-07-23 | 计算机 2024 全量详解 + 考点拆分入库；README 上线 |
| 2026-07-23 | VitePress 学习站骨架 + 2024 计算机网页版 + Pages 自动部署 |
| 2026-07-23 | **补全资料**：英语 2008–2024 真题入库（PDF 抽取）+ 谭浩强辅导书本地归档；网站英语页上线 |

