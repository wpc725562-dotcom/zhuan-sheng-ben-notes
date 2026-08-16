<template>
  <div class="ai-tutor">
    <div class="tutor-header">
      <h1 class="page-title">🤖 AI 学习助手</h1>
      <p class="page-subtitle">问高数问题，AI 帮你解答</p>
    </div>

    <!-- 未配置 API key -->
    <div v-if="!hasApiKey" class="card no-key">
      <div class="no-key-icon">🔑</div>
      <h3>需要配置 DeepSeek API Key</h3>
      <p>请先在设置页面填入你的 DeepSeek API Key，即可使用 AI 学习助手</p>
      <router-link to="/settings" class="btn btn-primary">去设置 →</router-link>
    </div>

    <!-- 对话区域 -->
    <div v-else class="chat-layout">
      <!-- 左侧：历史会话列表 -->
      <div class="history-panel">
        <div class="history-header">
          <h3 class="history-title">📋 历史会话</h3>
          <button class="btn btn-sm btn-primary new-session-btn" @click="createNewSession">
            ＋ 新建
          </button>
        </div>

        <div class="session-list" v-if="sessions.length > 0">
          <div
            v-for="s in sessions"
            :key="s.id"
            class="session-item"
            :class="{ active: s.id === currentSessionId }"
            @click="switchSession(s.id)"
          >
            <div class="session-info">
              <div class="session-title">{{ s.title }}</div>
              <div class="session-meta">
                <span class="session-time">{{ formatTime(s.updatedAt) }}</span>
                <span class="session-count">{{ s.messages.length }} 条</span>
              </div>
            </div>
            <button
              class="session-delete"
              @click.stop="confirmDelete(s)"
              title="删除会话"
            >✕</button>
          </div>
        </div>

        <div v-else class="history-empty">
          <div class="empty-icon">💬</div>
          <p>暂无历史会话</p>
          <p class="empty-hint">发送消息后会自动保存</p>
        </div>

        <!-- 删除确认弹窗 -->
        <div v-if="deleteTarget" class="delete-overlay" @click="deleteTarget = null">
          <div class="delete-dialog" @click.stop>
            <div class="delete-icon">🗑️</div>
            <p>确定删除「{{ deleteTarget.title }}」？</p>
            <p class="delete-hint">此操作不可撤销</p>
            <div class="delete-actions">
              <button class="btn btn-sm" @click="deleteTarget = null">取消</button>
              <button class="btn btn-sm btn-danger" @click="doDelete">删除</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：聊天区域 -->
      <div class="chat-container">
        <!-- 消息列表 -->
        <div class="chat-messages" ref="messagesRef">
          <div v-for="(msg, i) in messages" :key="i" class="message" :class="msg.role">
            <div class="msg-avatar">{{ msg.role === 'user' ? '👤' : '🤖' }}</div>
            <div class="msg-content">
              <div class="msg-text" v-html="renderMessage(msg.content)"></div>
              <div v-if="msg.role === 'assistant' && msg.sources" class="msg-sources">
                <div v-for="(src, j) in msg.sources" :key="j" class="source-chip">
                  📖 {{ src }}
                </div>
              </div>
            </div>
          </div>

          <!-- 加载中 -->
          <div v-if="loading" class="message assistant">
            <div class="msg-avatar">🤖</div>
            <div class="msg-content">
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="messages.length === 0 && !loading" class="welcome">
            <div class="welcome-icon">🧮</div>
            <h3>有什么高数问题想问？</h3>
            <p class="welcome-hint">比如：</p>
            <div class="suggestions">
              <div v-for="(q, i) in suggestedQuestions" :key="i"
                class="suggestion-chip"
                @click="askSuggestion(q)">
                {{ q }}
              </div>
            </div>
          </div>
        </div>

        <!-- 当前会话信息 -->
        <div class="chat-info-bar" v-if="currentSessionId">
          <span class="chat-info-label">💬 当前：{{ currentSessionTitle }}</span>
          <span class="chat-info-count">{{ messages.length }} 条消息</span>
          <button class="btn btn-sm btn-text" @click="exportSession" title="导出会话">📥 导出</button>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input-bar">
          <textarea
            v-model="inputText"
            class="chat-input"
            placeholder="输入你的高数问题..."
            rows="1"
            @keydown.enter.exact="sendMessage"
            @input="autoResize"
            :disabled="loading"
          ></textarea>
          <button
            class="btn btn-primary send-btn"
            @click="sendMessage"
            :disabled="loading || !inputText.trim()"
          >
            {{ loading ? '思考中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'

const API_KEY_STORAGE = 'bencetong_deepseek_key'
const API_URL = 'https://api.deepseek.com/v1/chat/completions'

// ===== 会话管理 =====
const SESSIONS_KEY = 'bencetong_ai_sessions'
const CURRENT_KEY = 'bencetong_ai_current'

const hasApiKey = ref(false)
const messages = ref([])
const inputText = ref('')
const loading = ref(false)
const messagesRef = ref(null)
const sessions = ref([])
const currentSessionId = ref(null)
const deleteTarget = ref(null)
const suggestedQuestions = [
  '极限 lim(x→0) sin(x)/x 为什么等于 1？',
  '导数 f\'(x) 和微分 dy/dx 有什么区别？',
  '积分 ∫ x² dx 怎么算？能给我讲详细步骤吗？',
  '什么是链式法则？举个简单例子',
  '我零基础，应该先学什么？给我一个学习计划'
]

// 当前会话标题
const currentSessionTitle = computed(() => {
  const s = sessions.value.find(s => s.id === currentSessionId.value)
  return s ? s.title : '新会话'
})

// 加载所有会话
function loadSessions() {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY)
    sessions.value = raw ? JSON.parse(raw) : []
  } catch {
    sessions.value = []
  }
}

// 保存所有会话到 localStorage
function persistSessions() {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.value))
}

// 获取一个会话
function getSession(id) {
  return sessions.value.find(s => s.id === id)
}

// 创建新会话
function createNewSession() {
  // 先保存当前会话
  saveCurrentSession()

  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  const newSession = {
    id,
    title: '新会话',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: []
  }
  sessions.value.unshift(newSession)
  persistSessions()

  currentSessionId.value = id
  localStorage.setItem(CURRENT_KEY, id)
  messages.value = []
  inputText.value = ''
}

// 切换会话
function switchSession(id) {
  // 保存当前会话
  saveCurrentSession()

  currentSessionId.value = id
  localStorage.setItem(CURRENT_KEY, id)

  // 加载目标会话
  const session = getSession(id)
  messages.value = session ? JSON.parse(JSON.stringify(session.messages)) : []
  inputText.value = ''
}

// 保存当前会话
function saveCurrentSession() {
  if (!currentSessionId.value) return
  const session = getSession(currentSessionId.value)
  if (!session) return

  // 只保存有内容的会话
  if (messages.value.length === 0) return

  session.messages = JSON.parse(JSON.stringify(messages.value))
  session.updatedAt = Date.now()

  // 自动生成标题：用第一条用户消息
  const firstUserMsg = messages.value.find(m => m.role === 'user')
  if (firstUserMsg) {
    session.title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '…' : '')
  }

  persistSessions()
}

// 确认删除
function confirmDelete(session) {
  deleteTarget.value = session
}

// 执行删除
function doDelete() {
  if (!deleteTarget.value) return
  const idx = sessions.value.findIndex(s => s.id === deleteTarget.value.id)
  if (idx === -1) return

  sessions.value.splice(idx, 1)
  persistSessions()
  deleteTarget.value = null

  // 如果删除的是当前会话，切换到最近的会话或新建
  if (deleteTarget.value?.id === currentSessionId.value) {
    if (sessions.value.length > 0) {
      switchSession(sessions.value[0].id)
    } else {
      currentSessionId.value = null
      localStorage.removeItem(CURRENT_KEY)
      messages.value = []
    }
  }
}

// 导出会话为文本
function exportSession() {
  if (messages.value.length === 0) return
  let text = `# 本科通 AI 对话 - ${currentSessionTitle.value}\n`
  text += `# 导出时间：${new Date().toLocaleString('zh-CN')}\n\n`
  for (const msg of messages.value) {
    const role = msg.role === 'user' ? '👤 我' : '🤖 AI'
    text += `## ${role}\n${msg.content}\n\n`
  }
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `AI对话_${new Date().toISOString().slice(0, 10)}.md`
  a.click()
  URL.revokeObjectURL(url)
}

// 格式化时间
function formatTime(ts) {
  const d = new Date(ts)
  const now = new Date()
  const diff = now - d
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`
  if (diff < 259200000) return `${Math.floor(diff / 86400000)} 天前`
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

// ===== 聊天功能 =====
onMounted(() => {
  checkApiKey()
  loadSessions()

  // 恢复上次会话
  const lastId = localStorage.getItem(CURRENT_KEY)
  if (lastId && getSession(lastId)) {
    switchSession(lastId)
  } else if (sessions.value.length > 0) {
    switchSession(sessions.value[0].id)
  }

  // 页面关闭/刷新前自动保存
  window.addEventListener('beforeunload', saveOnExit)
})

onUnmounted(() => {
  saveOnExit()
  window.removeEventListener('beforeunload', saveOnExit)
})

function saveOnExit() {
  saveCurrentSession()
}

function checkApiKey() {
  const key = localStorage.getItem(API_KEY_STORAGE)
  hasApiKey.value = !!key && key.length > 10
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 150) + 'px'
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || loading.value) return

  // 如果没有会话，自动创建
  if (!currentSessionId.value) {
    createNewSession()
  }

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  await scrollToBottom()

  loading.value = true

  try {
    const apiKey = localStorage.getItem(API_KEY_STORAGE)

    // 构建历史消息（取最近20条作为上下文）
    const historyMessages = messages.value.slice(-20).map(m => ({
      role: m.role,
      content: m.content
    }))

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是本科通 AI 学习助手，专门辅导广东专升本高等数学。

你的教学风格：
1. 用通俗比喻和生活中的例子解释数学概念（适合零基础）
2. 解答要详细，分步骤，每个公式都要解释
3. 遇到难题时，先问用户哪里不懂，再针对性解答
4. 鼓励用户，给 positive feedback
5. 如果用户问的不是高数问题，委婉引导回高数话题

学习背景：用户是广东专升本考生，零基础起步，目标 80 分，每周学习 3-6 小时。`
          },
          ...historyMessages
        ],
        temperature: 0.7,
        max_tokens: 2000,
        stream: false
      })
    })

    if (!response.ok) {
      const err = await response.json()
      throw new Error(err.error?.message || `API 请求失败 (${response.status})`)
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content || '抱歉，我没有理解你的问题，能再详细说说吗？'

    messages.value.push({ role: 'assistant', content: reply })

    // 自动保存
    saveCurrentSession()
  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: `❌ 出错了：${e.message}\n\n请检查：\n1. API Key 是否正确\n2. 网络是否通畅\n3. 在设置页面重新配置`
    })
  }

  loading.value = false
  await scrollToBottom()
}

function askSuggestion(q) {
  inputText.value = q
  sendMessage()
}

async function scrollToBottom() {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

function renderMessage(text) {
  if (!text) return ''
  let html = text
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
  return html
}


</script>

<style scoped>
.ai-tutor {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
}

.tutor-header {
  margin-bottom: 16px;
}

/* 未配置 Key */
.no-key {
  text-align: center;
  padding: 60px 40px;
  margin: 40px auto;
  max-width: 400px;
}
.no-key-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.no-key h3 {
  margin-bottom: 12px;
}
.no-key p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
}

/* ===== 左右布局 ===== */
.chat-layout {
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
}

/* ===== 左侧历史面板 ===== */
.history-panel {
  width: 240px;
  min-width: 240px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
}

.history-title {
  font-size: 15px;
  font-weight: 700;
  margin: 0;
}

.new-session-btn {
  font-size: 12px;
  padding: 3px 10px;
}

.session-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.session-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: 4px;
  border: 1px solid transparent;
}
.session-item:hover {
  background: #f1f5f9;
}
.session-item.active {
  background: #eef2ff;
  border-color: #c7d2fe;
}

.session-info {
  flex: 1;
  min-width: 0;
}

.session-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.session-meta {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.session-time {
  flex-shrink: 0;
}

.session-count {
  flex-shrink: 0;
}

.session-delete {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.15s;
  flex-shrink: 0;
}
.session-item:hover .session-delete {
  opacity: 1;
}
.session-delete:hover {
  background: #fee2e2;
  color: #ef4444;
}

.history-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  text-align: center;
}
.empty-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.empty-hint {
  font-size: 12px;
  margin-top: 4px;
  opacity: 0.7;
}

/* 删除确认弹窗 */
.delete-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.delete-dialog {
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  max-width: 320px;
}
.delete-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.delete-hint {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}
.delete-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
}

/* ===== 右侧聊天区域 ===== */
.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border);
  overflow: hidden;
  min-width: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  max-width: 85%;
}
.message.user {
  flex-direction: row-reverse;
  margin-left: auto;
}
.msg-avatar {
  font-size: 28px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}
.message.user .msg-avatar {
  background: #eef2ff;
}
.message.assistant .msg-avatar {
  background: #f0fdf4;
}
.msg-content {
  background: #f8fafc;
  padding: 14px 18px;
  border-radius: 12px;
  line-height: 1.7;
  font-size: 14px;
}
.message.user .msg-content {
  background: var(--primary);
  color: #fff;
}
.msg-text :deep(code) {
  background: rgba(0,0,0,0.08);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 13px;
}
.msg-text :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 14px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 8px 0;
  font-size: 13px;
}
.msg-text :deep(pre code) {
  background: none;
  padding: 0;
}
.msg-sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.source-chip {
  font-size: 11px;
  background: #eef2ff;
  color: var(--primary);
  padding: 2px 8px;
  border-radius: 4px;
}

/* 聊天信息栏 */
.chat-info-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--text-secondary);
  background: #fafafa;
}
.chat-info-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chat-info-count {
  flex-shrink: 0;
}
.btn-text {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 2px 8px;
  font-size: 11px;
  cursor: pointer;
  border-radius: 4px;
}
.btn-text:hover {
  background: #f1f5f9;
  color: var(--text);
}

/* 欢迎区 */
.welcome {
  text-align: center;
  padding: 40px 20px;
}
.welcome-icon {
  font-size: 64px;
  margin-bottom: 12px;
}
.welcome h3 {
  margin-bottom: 8px;
}
.welcome-hint {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 400px;
  margin: 0 auto;
}
.suggestion-chip {
  padding: 10px 16px;
  background: #f1f5f9;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}
.suggestion-chip:hover {
  background: #eef2ff;
  color: var(--primary);
}

/* 输入区域 */
.chat-input-bar {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border);
  background: #fff;
}
.chat-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  resize: none;
  font-family: inherit;
  line-height: 1.5;
}
.chat-input:focus {
  border-color: var(--primary);
}
.send-btn {
  align-self: flex-end;
  padding: 10px 20px;
}

/* 打字动画 */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}
.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  animation: bounce 1.4s infinite ease-in-out both;
}
.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* 按钮通用 */
.btn {
  /* 继承全局样式 */
}
.btn-sm {
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 6px;
}
.btn-primary {
  background: var(--primary);
  color: #fff;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: #4f46e5;
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-danger {
  background: #ef4444 !important;
  color: #fff;
  border: none;
  cursor: pointer;
}
.btn-danger:hover {
  background: #dc2626 !important;
}
</style>