<template>
  <div class="reader">
    <h1 class="page-title">📖 笔记阅读器</h1>
    <p class="page-subtitle">浏览笔记仓库中的学习资料</p>

    <div class="reader-layout">
      <!-- 目录树 -->
      <div class="card tree-panel">
        <h3 style="margin-bottom: 12px;">📂 目录</h3>
        <div class="search-box">
          <input v-model="searchQuery" type="text" placeholder="搜索笔记..." class="search-input" />
        </div>
        <div class="tree">
          <TreeItem
            v-for="item in filteredTree"
            :key="item.path"
            :item="item"
            :depth="0"
            :current-file="currentFile"
            @open="openFile"
          />
          <div v-if="filteredTree.length === 0" class="empty-tree">暂无笔记文件</div>
        </div>
      </div>

      <!-- 内容预览 -->
      <div class="card content-panel">
        <div v-if="loading" class="loading">加载中...</div>
        <div v-else-if="error" class="error-msg">{{ error }}</div>
        <div v-else-if="!currentFile" class="placeholder">
          <div class="placeholder-icon">📖</div>
          <p>从左侧目录选择一个笔记文件查看</p>
        </div>
        <div v-else class="markdown-content" v-html="renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import TreeItem from '../components/TreeItem.vue'

const tree = ref([])
const currentFile = ref(null)
const content = ref('')
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')

// 配置 marked
marked.setOptions({
  breaks: true,
  gfm: true
})

onMounted(async () => {
  if (window.bencetong) {
    const result = await window.bencetong.listTree()
    if (result.error) {
      error.value = '读取目录失败: ' + result.error
    } else {
      tree.value = result.map(item => ({ ...item, expanded: false }))
    }
  }
})

// 递归过滤目录树：搜索词命中文件或其任意层级子项时保留并自动展开
function matchTree(items, q) {
  return items.map(item => {
    if (item.type === 'file') {
      return item.name.toLowerCase().includes(q) ? item : null
    }
    const matched = matchTree(item.children || [], q).filter(Boolean)
    if (item.name.toLowerCase().includes(q) || matched.length > 0) {
      return { ...item, children: matched, expanded: true }
    }
    return null
  }).filter(Boolean)
}

const filteredTree = computed(() => {
  if (!searchQuery.value) return tree.value
  return matchTree(tree.value, searchQuery.value.toLowerCase())
})

async function openFile(item) {
  currentFile.value = item.path
  loading.value = true
  error.value = ''
  if (window.bencetong) {
    const result = await window.bencetong.readFile(item.path)
    if (result.error) {
      error.value = '读取失败: ' + result.error
    } else {
      content.value = result.content
    }
  }
  loading.value = false
}

const renderedContent = computed(() => {
  if (!content.value) return ''
  try {
    // DOMPurify 过滤 marked 产物，防止笔记内容注入可执行 HTML（XSS）
    return DOMPurify.sanitize(marked.parse(content.value))
  } catch {
    return content.value
  }
})
</script>

<style scoped>
.reader-layout {
  display: flex;
  gap: 16px;
  height: calc(100vh - 140px);
}
.tree-panel {
  width: 280px;
  min-width: 280px;
  overflow-y: auto;
}
.content-panel {
  flex: 1;
  overflow-y: auto;
}
.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  margin-bottom: 12px;
}
.search-input:focus {
  border-color: var(--primary);
}
.tree-item {
  margin-bottom: 2px;
}
.tree-dir, .tree-file {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}
.tree-dir:hover, .tree-file:hover {
  background: #f1f5f9;
}
.tree-file.selected {
  background: #eef2ff;
  color: var(--primary);
}
.tree-children {
  padding-left: 20px;
}
.empty-tree {
  color: var(--text-secondary);
  text-align: center;
  padding: 20px;
}
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
}
.placeholder-icon {
  font-size: 48px;
  margin-bottom: 12px;
}
.markdown-content {
  line-height: 1.8;
}
.markdown-content :deep(h1) { font-size: 22px; margin: 16px 0 8px; }
.markdown-content :deep(h2) { font-size: 18px; margin: 14px 0 6px; }
.markdown-content :deep(h3) { font-size: 16px; margin: 12px 0 4px; }
.markdown-content :deep(p) { margin: 8px 0; }
.markdown-content :deep(code) { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
.markdown-content :deep(pre) { background: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; }
.markdown-content :deep(pre code) { background: none; padding: 0; color: inherit; }
.markdown-content :deep(ul), .markdown-content :deep(ol) { padding-left: 20px; margin: 8px 0; }
.markdown-content :deep(table) { border-collapse: collapse; width: 100%; margin: 12px 0; }
.markdown-content :deep(th), .markdown-content :deep(td) { border: 1px solid var(--border); padding: 8px 12px; text-align: left; }
.markdown-content :deep(th) { background: #f8fafc; font-weight: 600; }
.markdown-content :deep(blockquote) { border-left: 4px solid var(--primary); padding-left: 12px; margin: 8px 0; color: var(--text-secondary); }
</style>