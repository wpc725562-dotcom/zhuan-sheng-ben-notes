<template>
  <div class="settings">
    <h1 class="page-title">⚙️ 设置与同步</h1>
    <p class="page-subtitle">管理笔记仓库同步和应用设置</p>

    <!-- 仓库信息 -->
    <div class="card" style="margin-bottom: 16px;">
      <h3 style="margin-bottom: 12px;">📂 笔记仓库</h3>
      <div class="info-row">
        <span class="info-label">仓库路径</span>
        <span class="info-value">{{ notesPath }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">最近提交</span>
        <span class="info-value">{{ recentLog }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">文件状态</span>
        <span class="info-value" :class="{ dirty: isDirty }">{{ isDirty ? '有未提交更改' : '干净' }}</span>
      </div>
    </div>

    <!-- 同步操作 -->
    <div class="card" style="margin-bottom: 16px;">
      <h3 style="margin-bottom: 12px;">🔄 同步管理</h3>
      <div class="sync-actions">
        <button class="btn btn-primary" @click="doPull" :disabled="syncing">
          {{ syncing ? '同步中...' : '📥 从 GitHub 拉取最新' }}
        </button>
        <button class="btn btn-success" @click="doPush" :disabled="syncing || !isDirty">
          {{ syncing ? '同步中...' : '📤 推送本地更改' }}
        </button>
      </div>
      <div v-if="syncMessage" class="sync-message" :class="{ success: syncSuccess, error: !syncSuccess }">
        {{ syncMessage }}
      </div>
    </div>

    <!-- 学习偏好 -->
    <div class="card" style="margin-bottom: 16px;">
      <h3 style="margin-bottom: 12px;">🎯 学习偏好</h3>
      <div class="pref-item">
        <span class="pref-label">目标分数</span>
        <span class="pref-value">80 分以上</span>
      </div>
      <div class="pref-item">
        <span class="pref-label">当前水平</span>
        <span class="pref-value">零基础</span>
      </div>
      <div class="pref-item">
        <span class="pref-label">每周投入</span>
        <span class="pref-value">3-6 小时</span>
      </div>
      <div class="pref-item">
        <span class="pref-label">考试省份</span>
        <span class="pref-value">广东</span>
      </div>
    </div>

    <!-- AI 配置 -->
    <div class="card" style="margin-bottom: 16px;">
      <h3 style="margin-bottom: 12px;">🤖 AI 学习助手配置</h3>
      <div class="config-item">
        <label class="config-label">DeepSeek API Key</label>
        <div class="config-input-row">
          <input
            v-model="apiKeyInput"
            :type="showApiKey ? 'text' : 'password'"
            class="config-input"
            placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
          />
          <button class="btn btn-sm btn-secondary" @click="showApiKey = !showApiKey">
            {{ showApiKey ? '🙈' : '👁️' }}
          </button>
        </div>
        <div class="config-hint">
          在 <a href="https://platform.deepseek.com/api_keys" target="_blank" class="config-link">DeepSeek 官网</a>
          注册获取 API Key（免费有额度）
        </div>
        <div v-if="apiKeySaved" class="config-success">✅ 已保存</div>
      </div>
      <div class="config-actions">
        <button class="btn btn-primary" @click="saveApiKey" :disabled="!apiKeyInput.trim()">
          💾 保存 Key
        </button>
        <button v-if="apiKeyInput" class="btn btn-secondary" @click="clearApiKey">
          🗑️ 清除
        </button>
        <button class="btn btn-secondary" @click="testApiKey" :disabled="testingKey">
          {{ testingKey ? '测试中...' : '🔍 测试连接' }}
        </button>
      </div>
      <div v-if="testResult" class="sync-message" :class="testResult.success ? 'success' : 'error'">
        {{ testResult.message }}
      </div>
    </div>

    <!-- 关于 -->
    <div class="card">
      <h3 style="margin-bottom: 8px;">📘 关于本科通</h3>
      <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">
        本科通 v1.0.0 — 广东专升本学习助手<br/>
        基于认知科学的 All-in-one 学习工具：计划看板 + 笔记阅读 + 刷题练习 + 科学学习指南<br/>
        数据源：zhuan-sheng-ben-notes 笔记仓库
      </p>
      <div class="shortcuts" style="margin-top: 12px;">
        <h4 style="font-size: 13px; margin-bottom: 6px;">🔗 快捷链接</h4>
        <a href="https://github.com/wpc725562-dotcom/zhuan-sheng-ben-notes" target="_blank" class="shortcut-link">GitHub 仓库</a>
        <a href="https://a3292334877-star.github.io/blog" target="_blank" class="shortcut-link">Sakiko 真题源</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const API_KEY_STORAGE = 'bencetong_deepseek_key'

const notesPath = ref('加载中...')
const recentLog = ref('')
const isDirty = ref(false)
const syncing = ref(false)
const syncMessage = ref('')
const syncSuccess = ref(false)

// API Key 配置
const apiKeyInput = ref('')
const showApiKey = ref(false)
const apiKeySaved = ref(false)
const testingKey = ref(false)
const testResult = ref(null)

onMounted(async () => {
  // 恢复 API Key
  const saved = localStorage.getItem(API_KEY_STORAGE)
  if (saved) apiKeyInput.value = saved

  if (window.bencetong) {
    const path = await window.bencetong.getNotesPath()
    notesPath.value = path

    const status = await window.bencetong.gitStatus()
    if (status.success) {
      isDirty.value = status.status.trim().length > 0
      const lines = status.log.split('\n').filter(l => l.trim())
      recentLog.value = lines.slice(0, 3).join(' | ') || '无提交记录'
    }
  }
})

function saveApiKey() {
  const key = apiKeyInput.value.trim()
  if (!key) return
  localStorage.setItem(API_KEY_STORAGE, key)
  apiKeySaved.value = true
  setTimeout(() => { apiKeySaved.value = false }, 3000)
}

function clearApiKey() {
  localStorage.removeItem(API_KEY_STORAGE)
  apiKeyInput.value = ''
  apiKeySaved.value = false
  testResult.value = null
}

async function testApiKey() {
  const key = apiKeyInput.value.trim()
  if (!key) return
  testingKey.value = true
  testResult.value = null

  try {
    const resp = await fetch('https://api.deepseek.com/v1/models', {
      headers: { 'Authorization': `Bearer ${key}` }
    })
    if (resp.ok) {
      testResult.value = { success: true, message: '✅ 连接成功！API Key 有效。' }
      // 自动保存
      localStorage.setItem(API_KEY_STORAGE, key)
      apiKeySaved.value = true
    } else {
      const err = await resp.json()
      testResult.value = { success: false, message: `❌ 连接失败：${err.error?.message || 'Key 无效'}` }
    }
  } catch (e) {
    testResult.value = { success: false, message: `❌ 网络错误：${e.message}` }
  }
  testingKey.value = false
}

async function doPull() {
  if (!window.bencetong) return
  syncing.value = true
  syncMessage.value = ''
  const result = await window.bencetong.gitPull()
  syncing.value = false
  syncSuccess.value = result.success
  syncMessage.value = result.success
    ? '✅ 同步成功！' + (result.message || '')
    : '❌ 同步失败: ' + (result.message || '未知错误')
}

async function doPush() {
  if (!window.bencetong) return
  syncing.value = true
  syncMessage.value = ''
  const result = await window.bencetong.gitPush()
  syncing.value = false
  syncSuccess.value = result.success
  syncMessage.value = result.success
    ? '✅ 推送成功！' + (result.message || '')
    : '❌ 推送失败: ' + (result.message || '未知错误')
  if (result.success) isDirty.value = false
}
</script>

<style scoped>
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.info-row:last-child {
  border-bottom: none;
}
.info-label {
  font-size: 13px;
  color: var(--text-secondary);
}
.info-value {
  font-size: 13px;
  font-weight: 500;
  max-width: 60%;
  text-align: right;
  word-break: break-all;
}
.info-value.dirty {
  color: var(--warning);
}
.sync-actions {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.sync-message {
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
}
.sync-message.success {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.sync-message.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.pref-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.pref-item:last-child {
  border-bottom: none;
}
.pref-label {
  font-size: 13px;
  color: var(--text-secondary);
}
.pref-value {
  font-size: 13px;
  font-weight: 500;
}
.shortcut-link {
  display: inline-block;
  padding: 4px 10px;
  margin-right: 8px;
  margin-top: 4px;
  border-radius: 4px;
  background: #f1f5f9;
  color: var(--primary);
  text-decoration: none;
  font-size: 13px;
}
.shortcut-link:hover {
  background: #eef2ff;
}

/* AI 配置 */
.config-item {
  margin-bottom: 12px;
}
.config-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
.config-input-row {
  display: flex;
  gap: 8px;
}
.config-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 13px;
  outline: none;
  font-family: monospace;
}
.config-input:focus {
  border-color: var(--primary);
}
.config-hint {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 6px;
  line-height: 1.5;
}
.config-link {
  color: var(--primary);
  text-decoration: none;
}
.config-link:hover {
  text-decoration: underline;
}
.config-success {
  font-size: 12px;
  color: var(--success);
  margin-top: 4px;
}
.config-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
</style>