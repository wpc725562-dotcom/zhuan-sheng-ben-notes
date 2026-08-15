<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo">📘 本科通</div>
      <div class="subtitle">广东专升本学习助手</div>
    </div>
    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" exact-active-class="active">
        <span class="nav-icon">📊</span>
        <span class="nav-label">学习看板</span>
      </router-link>
      <router-link to="/learn" class="nav-item" active-class="active">
        <span class="nav-icon">📚</span>
        <span class="nav-label">学习内容</span>
      </router-link>
      <router-link to="/reader" class="nav-item" active-class="active">
        <span class="nav-icon">📖</span>
        <span class="nav-label">笔记阅读</span>
      </router-link>
      <router-link to="/quiz" class="nav-item" active-class="active">
        <span class="nav-icon">✏️</span>
        <span class="nav-label">刷题练习</span>
      </router-link>
      <router-link to="/guide" class="nav-item" active-class="active">
        <span class="nav-icon">🧠</span>
        <span class="nav-label">科学学习指南</span>
      </router-link>
      <router-link to="/ai" class="nav-item" active-class="active">
        <span class="nav-icon">🤖</span>
        <span class="nav-label">AI 学习助手</span>
      </router-link>
      <router-link to="/settings" class="nav-item" active-class="active">
        <span class="nav-icon">⚙️</span>
        <span class="nav-label">设置与同步</span>
      </router-link>
    </nav>
    <div class="sidebar-footer">
      <div class="sync-status" :class="{ syncing: syncing }">
        {{ syncing ? '🔄 同步中...' : (lastSync ? '✅ 已同步' : '⏸ 未同步') }}
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

const syncing = ref(false)
const lastSync = ref(false)
</script>

<style scoped>
.sidebar {
  width: 220px;
  min-width: 220px;
  background: #1a1a2e;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;
  user-select: none;
}
.sidebar-header {
  padding: 20px 16px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.logo {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}
.subtitle {
  font-size: 12px;
  color: #8899aa;
  margin-top: 4px;
}
.sidebar-nav {
  flex: 1;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #b0b8c8;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}
.nav-item:hover {
  background: rgba(255,255,255,0.06);
  color: #fff;
}
.nav-item.active {
  background: rgba(99, 102, 241, 0.2);
  color: #818cf8;
}
.nav-icon {
  font-size: 18px;
  width: 24px;
  text-align: center;
}
.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
  font-size: 12px;
}
.sync-status {
  color: #8899aa;
}
.sync-status.syncing {
  color: #fbbf24;
}
</style>