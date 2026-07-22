# 站点说明

这个站是从你的 **Obsidian 笔记库** 编译出来的 **VitePress 静态网站**，部署在 **GitHub Pages**，**不需要个人服务器**。

## 它和 Sakiko 博客的关系

| 层 | Sakiko | 本站 |
|:---|:---|:---|
| 内容 | Markdown | 同源：你的专升本笔记 |
| 框架 | VitePress | VitePress |
| 公式 | KaTeX / math 插件 | `markdown.math: true` |
| 托管 | GitHub Pages | GitHub Pages |
| 主题 | 自定义樱花风 | 轻量粉系 brand 色（可再美化） |

差别主要在「主题皮肤」和「文章数量」，**技术路线一致**。

## 仓库结构（和站点相关的部分）

```text
zhuan-sheng-ben-notes/
├── package.json                 # npm scripts
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts           # 导航 / 侧栏 / base
│   │   └── theme/               # 主题色
│   ├── index.md                 # 首页
│   ├── guide/                   # 使用说明
│   ├── posts/                   # 网站文章（从笔记导出）
│   └── public/                  # 静态资源
├── 历年真题/                    # Obsidian 源笔记（继续用）
└── .github/workflows/deploy.yml # push 自动发布
```

## 日常怎么更新

1. 在 Obsidian 里改 `历年真题/...` 源笔记  
2. 需要上网站时，把对应 md 同步/拷进 `docs/posts/...`（wikilink 改成标准链接）  
3. `git push` → GitHub Actions 自动构建并发布  

## 本地命令

```bash
npm install          # 第一次
npm run docs:dev     # 本地预览
npm run docs:build   # 构建到 docs/.vitepress/dist
npm run docs:preview # 预览构建结果
```

## 上线地址

开启 GitHub Pages（Source = GitHub Actions）后，访问：

**https://wpc725562-dotcom.github.io/zhuan-sheng-ben-notes/**

首次需在仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**。
