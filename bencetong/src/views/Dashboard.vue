<template>
  <div class="dashboard">
    <h1 class="page-title">📊 学习看板</h1>
    <p class="page-subtitle">你的广东专升本高数学习进度总览</p>

    <!-- 统计卡片 -->
    <div class="grid-3 stats-row">
      <div class="card stat-card">
        <div class="stat-number">{{ stats.totalChapters }}</div>
        <div class="stat-label">考纲章节</div>
      </div>
      <div class="card stat-card">
        <div class="stat-number">{{ stats.completed }}</div>
        <div class="stat-label">已完成</div>
      </div>
      <div class="card stat-card">
        <div class="stat-number">{{ stats.progress }}%</div>
        <div class="stat-label">总进度</div>
      </div>
    </div>

    <!-- 进度条 + 今日学习 -->
    <div class="card" style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3>学习进度</h3>
        <div class="today-study">
          <span class="today-icon">⏱️</span>
          <span>今日学习 <strong>{{ todayMinutes }}</strong> 分钟</span>
          <button v-if="!timerRunning" class="btn btn-sm timer-btn" @click="startTimer">▶ 开始计时</button>
          <button v-else class="btn btn-sm timer-btn timer-active" @click="stopTimer">
            ⏹ {{ timerSeconds }}s
          </button>
        </div>
      </div>
      <div class="progress-bar" style="height: 14px;">
        <div class="progress-fill" :style="{ width: stats.progress + '%' }"></div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 12px; color: var(--text-secondary);">
        <span>零基础起步</span>
        <span>目标: 80分</span>
        <span>2027.3 考试</span>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="grid-2 quick-actions" style="margin-top: 16px;">
      <router-link to="/learn" class="card action-card" style="text-decoration: none;">
        <div class="action-icon">📚</div>
        <div class="action-text">
          <div class="action-title">开始学习</div>
          <div class="action-desc">查看知识点讲解</div>
        </div>
      </router-link>
      <router-link to="/quiz" class="card action-card" style="text-decoration: none;">
        <div class="action-icon">✏️</div>
        <div class="action-text">
          <div class="action-title">刷题练习</div>
          <div class="action-desc">做真题巩固知识</div>
        </div>
      </router-link>
    </div>

    <!-- 🍅 番茄钟模式 -->
    <div class="card" style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <h3>🍅 番茄钟</h3>
        <span class="hint-text">25 分钟专注学习，5 分钟休息</span>
      </div>
      <div class="pomodoro-display">
        <div class="pomodoro-time" :class="{ 'pomodoro-break': pomodoroMode === 'break' }">
          {{ pomodoroDisplay }}
        </div>
        <div class="pomodoro-status">
          {{ pomodoroMode === 'focus' ? '🔴 专注中' : pomodoroMode === 'break' ? '🟢 休息中' : '⏸ 未开始' }}
        </div>
      </div>
      <div class="pomodoro-progress">
        <div class="progress-bar" style="height: 6px;">
          <div class="progress-fill" :style="{ width: pomodoroProgress + '%', background: pomodoroMode === 'break' ? '#22c55e' : undefined }"></div>
        </div>
      </div>
      <div class="pomodoro-actions">
        <button v-if="!pomodoroRunning" class="btn btn-primary" @click="startPomodoro">
          ▶ 开始 25 分钟专注
        </button>
        <button v-else class="btn btn-danger" @click="stopPomodoro">
          ⏹ 停止（{{ pomodoroMode === 'focus' ? '专注中' : '休息中' }}）
        </button>
        <span class="pomodoro-count">已完成 {{ pomodoroCount }} 个番茄钟</span>
      </div>
      <div v-if="pomodoroMode === 'break'" class="break-tip">
        💡 站起来活动一下，看看窗外，让大脑休息
      </div>
    </div>

    <!-- 🔀 交错学习建议 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 12px;">🔀 交错学习建议</h3>
      <div class="interleave-content">
        <div v-if="interleaveTip" class="interleave-tip">
          <div class="interleave-icon">{{ interleaveTip.icon }}</div>
          <div class="interleave-text">
            <p class="interleave-title">{{ interleaveTip.title }}</p>
            <p class="interleave-desc">{{ interleaveTip.desc }}</p>
          </div>
        </div>
        <div v-else class="interleave-empty">
          完成更多章节后，我会为你推荐交错学习方案
        </div>
      </div>
    </div>

    <!-- 阶段计划 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 16px;">📅 阶段学习计划</h3>
      <div class="phase-list">
        <div v-for="(phase, i) in phases" :key="i" class="phase-item" :class="{ active: phase.active, completed: phase.done }">
          <div class="phase-dot" :style="{ background: phase.color }"></div>
          <div class="phase-info">
            <div class="phase-name">{{ phase.name }}</div>
            <div class="phase-dates">{{ phase.dates }}</div>
            <div class="phase-desc">{{ phase.desc }}</div>
          </div>
          <div class="phase-status">
            <span class="badge" v-if="phase.active" style="background: var(--primary);">当前阶段</span>
            <span class="badge" v-if="phase.done" style="background: var(--success);">✅ 已完成</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 考纲章节速览（可点击标记完成） -->
    <div class="card" style="margin-top: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3>📚 高数考纲章节</h3>
        <span class="hint-text">点击章节切换完成状态</span>
      </div>
      <div class="chapter-list">
        <div
          v-for="(ch, i) in chapters"
          :key="i"
          class="chapter-item"
          :class="{ done: chapterDone[ch.num] }"
          @click="toggleChapter(ch.num)"
        >
          <div class="chapter-info">
            <span class="chapter-num">{{ ch.num }}</span>
            <span class="chapter-name">{{ ch.name }}</span>
          </div>
          <div class="chapter-right">
            <span class="chapter-weight">{{ ch.weight }}</span>
            <span v-if="chapterDone[ch.num]" class="chapter-check">✅</span>
            <span v-else class="chapter-check ch-muted">⬜</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 今日建议（动态变化） -->
    <div class="card" style="margin-top: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff;">
      <h3 style="margin-bottom: 8px;">💡 今日学习建议</h3>
      <p>{{ todayTip }}</p>
    </div>

    <!-- 成就徽章 -->
    <div class="card" style="margin-top: 16px;" v-if="stats.completed > 0">
      <h3 style="margin-bottom: 12px;">🏆 学习成就</h3>
      <div class="badges-row">
        <div class="badge-item" v-if="stats.completed >= 1">
          <span class="badge-icon">🌱</span>
          <span class="badge-label">迈出第一步</span>
        </div>
        <div class="badge-item" v-if="stats.completed >= 3">
          <span class="badge-icon">📖</span>
          <span class="badge-label">初窥门径</span>
        </div>
        <div class="badge-item" v-if="stats.completed >= 5">
          <span class="badge-icon">🔥</span>
          <span class="badge-label">渐入佳境</span>
        </div>
        <div class="badge-item" v-if="stats.completed >= 8">
          <span class="badge-icon">🎓</span>
          <span class="badge-label">大功告成</span>
        </div>
        <div class="badge-item" v-if="todayMinutes >= 30">
          <span class="badge-icon">💪</span>
          <span class="badge-label">今日学习达人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { CHAPTERS, getChapterProgress, saveChapterProgress, getTodayStudyTime, saveTodayStudyTime } from '../data/chapters-data.js'

// 进度数据
const chapterProgress = reactive(getChapterProgress())
const todayStudy = reactive(getTodayStudyTime())

const stats = computed(() => {
  const total = 8
  const completed = Object.values(chapterProgress).filter(v => v).length
  const progress = total > 0 ? Math.round(completed / total * 100) : 0
  return { totalChapters: total, completed, progress }
})

const chapterDone = computed(() => {
  const map = {}
  CHAPTERS.forEach(ch => {
    map[ch.num] = !!chapterProgress[ch.id]
  })
  return map
})

function toggleChapter(num) {
  const ch = CHAPTERS.find(c => c.num === num)
  if (!ch) return
  const newVal = !chapterProgress[ch.id]
  chapterProgress[ch.id] = newVal
  saveChapterProgress(ch.id, newVal)
}

const phases = ref([
  { name: '基础期', dates: '当前 → 2026.6', desc: '函数与极限 → 一元函数微积分，零基础打地基', color: '#6366f1', active: true, done: false },
  { name: '强化期', dates: '2026.7 → 2026.10', desc: '多元函数、重积分、级数、微分方程，全面覆盖', color: '#f59e0b', active: false, done: false },
  { name: '冲刺期', dates: '2026.11 → 2027.2', desc: '真题刷题 + 错题回顾 + 模拟考试', color: '#ef4444', active: false, done: false },
  { name: '考试', dates: '2027.3', desc: '广东专升本考试', color: '#22c55e', active: false, done: false }
])

// 计时器
const timerRunning = ref(false)
const timerSeconds = ref(0)
let timerInterval = null

// 番茄钟
const POMODORO_FOCUS = 25 * 60  // 25 分钟
const POMODORO_BREAK = 5 * 60   // 5 分钟
const pomodoroRunning = ref(false)
const pomodoroSeconds = ref(0)
const pomodoroMode = ref('idle')  // idle | focus | break
const pomodoroCount = ref(0)
let pomodoroInterval = null

const pomodoroDisplay = computed(() => {
  const total = pomodoroMode.value === 'focus' ? POMODORO_FOCUS : POMODORO_BREAK
  const remaining = total - pomodoroSeconds.value
  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
})

const pomodoroProgress = computed(() => {
  const total = pomodoroMode.value === 'focus' ? POMODORO_FOCUS : POMODORO_BREAK
  if (total === 0) return 0
  return Math.round(pomodoroSeconds.value / total * 100)
})

function startPomodoro() {
  if (pomodoroRunning.value) return
  pomodoroRunning.value = true
  pomodoroMode.value = 'focus'
  pomodoroSeconds.value = 0
  pomodoroInterval = setInterval(() => {
    pomodoroSeconds.value++
    // 专注结束
    if (pomodoroMode.value === 'focus' && pomodoroSeconds.value >= POMODORO_FOCUS) {
      pomodoroCount.value++
      localStorage.setItem('bencetong_pomodoro_count', pomodoroCount.value.toString())
      pomodoroMode.value = 'break'
      pomodoroSeconds.value = 0
      // 记录专注时间
      const today = new Date().toLocaleDateString('zh-CN')
      const current = getTodayStudyTime()
      if (current.date === today) {
        todayStudy.minutes = current.minutes + 25
      } else {
        todayStudy.minutes = 25
      }
      todayStudy.date = today
      saveTodayStudyTime(todayStudy.minutes)
    }
    // 休息结束
    if (pomodoroMode.value === 'break' && pomodoroSeconds.value >= POMODORO_BREAK) {
      pomodoroMode.value = 'idle'
      pomodoroRunning.value = false
      clearInterval(pomodoroInterval)
      pomodoroInterval = null
    }
  }, 1000)
}

function stopPomodoro() {
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval)
    pomodoroInterval = null
  }
  pomodoroRunning.value = false
  pomodoroMode.value = 'idle'
  pomodoroSeconds.value = 0
}

const todayMinutes = computed(() => {
  const today = new Date().toLocaleDateString('zh-CN')
  if (todayStudy.date === today) return todayStudy.minutes
  return 0
})

function startTimer() {
  timerRunning.value = true
  timerSeconds.value = 0
  timerInterval = setInterval(() => {
    timerSeconds.value++
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  timerRunning.value = false
  const minutes = Math.round(timerSeconds.value / 60)
  if (minutes > 0) {
    const today = new Date().toLocaleDateString('zh-CN')
    const current = getTodayStudyTime()
    if (current.date === today) {
      todayStudy.minutes = current.minutes + minutes
    } else {
      todayStudy.minutes = minutes
    }
    todayStudy.date = today
    saveTodayStudyTime(todayStudy.minutes)
  }
  timerSeconds.value = 0
}

// 交错学习建议
const interleaveTip = computed(() => {
  const completed = Object.values(chapterProgress).filter(v => v).length
  if (completed === 0) {
    return null
  }
  if (completed === 1) {
    return {
      icon: '📖',
      title: '学完第1章了！建议搭配练习',
      desc: '第1章函数与极限学完后，不要急着学第2章。先去做几道极限的练习题，巩固后再开始第2章微分学。穿插练习比一直学新知识效果好。'
    }
  }
  if (completed === 2) {
    return {
      icon: '🔄',
      title: '试试交错复习',
      desc: '今天复习第1章极限的概念，再学第3章积分学的新内容。把不同类型的题目混在一起练习，大脑被迫找出差异，记忆更深刻。'
    }
  }
  if (completed >= 3 && completed < 5) {
    return {
      icon: '🎯',
      title: '基础期到强化期的过渡',
      desc: '你已经学完了基础的核心章节（函数、微分、积分），建议：今天花30分钟复习第2章的导数公式，再开始第5章多元函数。新旧交替效率更高。'
    }
  }
  if (completed >= 5) {
    return {
      icon: '⚡',
      title: '强化冲刺阶段',
      desc: '剩余章节（向量、重积分、微分方程、级数）难度较大，建议每天学一个新章节 + 复习一个旧章节的基础题，保持"新旧穿插"的节奏。'
    }
  }
  return null
})

// 今日建议（动态）
const todayTip = computed(() => {
  const completed = Object.values(chapterProgress).filter(v => v).length
  if (completed === 0) {
    return '🚀 还没开始呢！建议从第1章"函数与极限"开始，先理解极限的定义和性质。每天1小时，先看概念再做题，错题记进 Anki。'
  }
  if (completed < 3) {
    return `📖 已完成 ${completed} 章，继续加油！建议先学完基础期的函数与极限、微分学、积分学，这三章占考分55%。每学完一章就去刷题练习巩固。`
  }
  if (completed < 5) {
    return `🔥 已学完 ${completed} 章，进度不错！接下来进入向量与空间几何、多元函数部分。注意这些章节公式较多，建议多动手推导。`
  }
  if (completed < 8) {
    return `💪 已完成 ${completed} 章，离通关只差 ${8 - completed} 章了！最后的重积分、微分方程、级数难度较大，建议分配更多时间。`
  }
  return '🎉 恭喜你学完了全部 8 章！现在进入刷题冲刺阶段，大量做真题，错题进 Anki 反复复习。目标 80 分，你一定行！'
})

onMounted(() => {
  // 恢复进度
  const saved = getChapterProgress()
  Object.assign(chapterProgress, saved)
  // 恢复今日学习时间
  const savedStudy = getTodayStudyTime()
  Object.assign(todayStudy, savedStudy)
  // 恢复番茄钟计数
  const savedCount = localStorage.getItem('bencetong_pomodoro_count')
  if (savedCount) pomodoroCount.value = parseInt(savedCount)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  if (pomodoroInterval) {
    clearInterval(pomodoroInterval)
  }
})
</script>

<style scoped>
.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.action-card:hover {
  border-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99,102,241,0.12);
}
.action-icon {
  font-size: 36px;
  width: 48px;
  text-align: center;
}
.action-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}
.action-desc {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.today-study {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}
.today-icon {
  font-size: 16px;
}
.timer-btn {
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}
.timer-btn:hover {
  background: #4f46e5;
}
.timer-active {
  background: #ef4444 !important;
  animation: pulse 1s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.hint-text {
  font-size: 12px;
  color: var(--text-secondary);
  font-style: italic;
}

.chapter-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.chapter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}
.chapter-item:hover {
  background: #eef2ff;
  border-color: #c7d2fe;
}
.chapter-item.done {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.chapter-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.chapter-num {
  font-weight: 600;
  color: var(--primary);
  font-size: 13px;
  min-width: 48px;
}
.chapter-name {
  font-size: 14px;
}
.chapter-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chapter-weight {
  font-size: 12px;
  color: var(--text-secondary);
  background: #e2e8f0;
  padding: 2px 8px;
  border-radius: 4px;
}
.chapter-check {
  font-size: 16px;
  width: 24px;
  text-align: center;
}
.ch-muted {
  opacity: 0.4;
}

.phase-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.phase-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8fafc;
  transition: all 0.2s;
}
.phase-item.active {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
}
.phase-item.completed {
  opacity: 0.7;
}
.phase-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}
.phase-info {
  flex: 1;
}
.phase-name {
  font-weight: 600;
  font-size: 15px;
}
.phase-dates {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}
.phase-desc {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}
.badge {
  color: #fff;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

/* 成就徽章 */
.badges-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 10px;
  min-width: 80px;
}
.badge-icon {
  font-size: 28px;
}
.badge-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
}

/* 番茄钟 */
.pomodoro-display {
  text-align: center;
  padding: 16px 0;
}
.pomodoro-time {
  font-size: 56px;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  color: var(--primary);
  letter-spacing: 4px;
}
.pomodoro-time.pomodoro-break {
  color: var(--success);
}
.pomodoro-status {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}
.pomodoro-progress {
  padding: 0 0 12px;
}
.pomodoro-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}
.btn-danger {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
.btn-danger:hover {
  background: #dc2626;
}
.pomodoro-count {
  font-size: 12px;
  color: var(--text-secondary);
}
.break-tip {
  margin-top: 12px;
  padding: 10px 14px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  font-size: 13px;
  color: #16a34a;
}

/* 交错学习 */
.interleave-content {
  min-height: 60px;
}
.interleave-tip {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}
.interleave-icon {
  font-size: 36px;
  flex-shrink: 0;
}
.interleave-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}
.interleave-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.interleave-empty {
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
  padding: 8px;
}
</style>