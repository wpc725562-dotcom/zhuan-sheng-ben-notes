<template>
  <div class="tree-branch">
    <!-- 目录节点 -->
    <div
      v-if="item.type === 'directory'"
      class="tree-dir"
      :style="{ paddingLeft: depth * 16 + 'px' }"
      @click="toggle"
    >
      <span class="dir-icon">{{ item.expanded ? '📂' : '📁' }}</span>
      <span>{{ item.name }}</span>
    </div>
    <!-- 文件节点 -->
    <div
      v-else
      class="tree-file"
      :style="{ paddingLeft: depth * 16 + 'px' }"
      :class="{ selected: currentFile === item.path }"
      @click="openFile"
    >
      <span class="file-icon">📄</span>
      <span>{{ item.name }}</span>
    </div>
    <!-- 递归子节点（深度不限） -->
    <div v-if="item.type === 'directory' && item.expanded" class="tree-children">
      <TreeItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :depth="depth + 1"
        :current-file="currentFile"
        @open="(p) => $emit('open', p)"
      />
    </div>
  </div>
</template>

<script setup>
// 递归目录树节点：任意深度均可展开/打开（修复原 Reader 只渲染两层的缺陷）
const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 },
  currentFile: { type: String, default: null }
})
const emit = defineEmits(['open'])

function toggle() {
  // 树节点对象来自父组件 ref，直接修改其 expanded 字段即可触发响应式更新
  props.item.expanded = !props.item.expanded
}

function openFile() {
  emit('open', props.item)
}
</script>