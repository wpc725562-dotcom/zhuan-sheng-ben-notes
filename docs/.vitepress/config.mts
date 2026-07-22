import { defineConfig } from 'vitepress'

// GitHub Pages 项目站固定 base（本地 dev 也用同一路径，避免线上资源 404）
// 本地预览：npm run docs:dev 后打开 http://localhost:5173/zhuan-sheng-ben-notes/
const base = process.env.VITEPRESS_BASE || '/zhuan-sheng-ben-notes/'

export default defineConfig({
  title: '广东专升本 · 复习笔记',
  description: '公共课 + 计算机专业课 · 历年真题详解 · 考点拆分',
  lang: 'zh-CN',
  base,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#e85d75' }],
  ],

  markdown: {
    math: true,
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },

  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: '专升本笔记',
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
          modal: {
            noResultsText: '没有结果',
            resetButtonTitle: '清空',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
          },
        },
      },
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '历年真题',
        items: [
          { text: '计算机 · 2024 全卷', link: '/posts/computer/2024' },
          { text: '计算机 · 考点拆分', link: '/posts/computer/topics/' },
          { text: '高等数学', link: '/posts/math/' },
          { text: '公共英语', link: '/posts/english/' },
          { text: '政治理论', link: '/posts/politics/' },
        ],
      },
      { text: '使用说明', link: '/guide/' },
      {
        text: 'GitHub',
        link: 'https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes',
      },
    ],
    sidebar: {
      '/posts/computer/': [
        {
          text: '计算机程序设计',
          items: [
            { text: '真题总览', link: '/posts/computer/' },
            { text: '2024 全卷详解', link: '/posts/computer/2024' },
          ],
        },
        {
          text: '2024 考点拆分',
          items: [
            { text: '拆分索引', link: '/posts/computer/topics/' },
            { text: '01 C 语言基础', link: '/posts/computer/topics/01-c-basics' },
            { text: '02 数组指针', link: '/posts/computer/topics/02-array-pointer' },
            { text: '03 链表栈队列', link: '/posts/computer/topics/03-list-stack-queue' },
            { text: '04 树图与查找', link: '/posts/computer/topics/04-tree-graph' },
            { text: '05 手写编程', link: '/posts/computer/topics/05-coding' },
          ],
        },
      ],
      '/posts/math/': [
        {
          text: '高等数学',
          items: [{ text: '真题总览', link: '/posts/math/' }],
        },
      ],
      '/posts/english/': [
        {
          text: '公共英语',
          items: [{ text: '真题总览', link: '/posts/english/' }],
        },
      ],
      '/posts/politics/': [
        {
          text: '政治理论',
          items: [{ text: '真题总览', link: '/posts/politics/' }],
        },
      ],
      '/guide/': [
        {
          text: '使用说明',
          items: [
            { text: '站点说明', link: '/guide/' },
            { text: '资料边界', link: '/guide/sources' },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes',
      },
    ],
    footer: {
      message: '仅供个人学习 · 考生回忆版 · 非考试院原卷',
      copyright: '内容整理自公开回忆版与个人笔记',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdatedText: '最后更新',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切到浅色',
    darkModeSwitchTitle: '切到深色',
  },
})
