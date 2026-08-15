<template>
  <div class="guide">
    <h1 class="page-title">🧠 科学学习指南</h1>
    <p class="page-subtitle">基于认知科学的学习方法论，帮你学得更快、记得更牢</p>

    <!-- 核心方法概览 -->
    <div class="grid-3" style="margin-bottom: 16px;">
      <div v-for="(method, i) in coreMethods" :key="i" class="card method-card" @click="activeMethod = i">
        <div class="method-icon">{{ method.icon }}</div>
        <div class="method-name">{{ method.name }}</div>
        <div class="method-brief">{{ method.brief }}</div>
      </div>
    </div>

    <!-- 详细展开 -->
    <div class="card" v-if="activeMethod !== null">
      <div class="detail-header">
        <h2>{{ coreMethods[activeMethod].icon }} {{ coreMethods[activeMethod].name }}</h2>
        <button class="btn btn-secondary" @click="activeMethod = null">收起</button>
      </div>
      <div class="detail-content">
        <div class="detail-section">
          <h4>📌 它是什么</h4>
          <p>{{ coreMethods[activeMethod].what }}</p>
        </div>
        <div class="detail-section">
          <h4>💡 为什么有效</h4>
          <p>{{ coreMethods[activeMethod].why }}</p>
        </div>
        <div class="detail-section">
          <h4>🎯 怎么用在高数学习上</h4>
          <ul>
            <li v-for="(tip, ti) in coreMethods[activeMethod].tips" :key="ti">{{ tip }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 学习系统总览 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 16px;">🔗 把这些方法串成你的学习系统</h3>
      <div class="system-flow">
        <div class="flow-step">
          <div class="step-num">1</div>
          <div class="step-content">
            <strong>预习</strong>
            <p>用费曼技巧浏览新章节，找出不懂的地方</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">2</div>
          <div class="step-content">
            <strong>学习</strong>
            <p>看笔记/视频，用具体例子理解概念，配合双重编码（文字+图示）</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">3</div>
          <div class="step-content">
            <strong>主动回忆</strong>
            <p>合上书本，试着默写定义、推导公式、做练习题</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">4</div>
          <div class="step-content">
            <strong>间隔复习</strong>
            <p>错题和易忘点进 Anki，按遗忘曲线自动安排复习</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">5</div>
          <div class="step-content">
            <strong>交替练习</strong>
            <p>混合不同章节的题目练习，训练大脑区分不同题型</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 番茄钟 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 12px;">⏱️ 番茄学习钟</h3>
      <p style="color: var(--text-secondary); margin-bottom: 12px;">
        25分钟专注学习 + 5分钟休息。番茄钟是启动学习最有效的方式。
      </p>
      <div class="pomodoro">
        <div class="timer-display">{{ formatTime(timer) }}</div>
        <div class="timer-phase">{{ timerPhase }}</div>
        <div class="timer-actions">
          <button v-if="!timerRunning" class="btn btn-primary" @click="startTimer">开始学习</button>
          <button v-if="timerRunning" class="btn btn-danger" @click="stopTimer">停止</button>
          <button class="btn btn-secondary" @click="resetTimer" style="margin-left: 8px;">重置</button>
        </div>
      </div>
    </div>

    <!-- 每日科学学习实战流程 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 16px;">🎯 每日科学学习实战流程</h3>
      <p style="color: var(--text-secondary); margin-bottom: 12px;">按照这个流程，每天 3-6 小时高效学习</p>
      <div class="system-flow">
        <div class="flow-step">
          <div class="step-num">①</div>
          <div class="step-content">
            <strong>打开本科通</strong>
            <p>看学习看板 → 今日建议 → 明确今天学什么</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">②</div>
          <div class="step-content">
            <strong>提取练习（先做题，不翻书）</strong>
            <p>去刷题模块 → 选上次学的章节 → 先空手做，卡住再看笔记</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">③</div>
          <div class="step-content">
            <strong>番茄钟集中学习</strong>
            <p>点上面的番茄钟 → 25分钟专注学新知识点 → 5分钟休息</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">④</div>
          <div class="step-content">
            <strong>交错练习</strong>
            <p>混 2-3 个考点做题：比如 3 道极限 + 3 道求导 + 3 道积分交叉做</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">⑤</div>
          <div class="step-content">
            <strong>费曼复述</strong>
            <p>合上书，把今天学的概念讲给"虚拟学生"听，卡住的地方标记</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">⑥</div>
          <div class="step-content">
            <strong>错题进 Anki</strong>
            <p>刷题时点"推送到 Anki" → 错题自动按遗忘曲线安排复习</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">⑦</div>
          <div class="step-content">
            <strong>刷 Anki 旧卡片</strong>
            <p>用 Anki 桌面版复习之前的错题（每天坚持，不要断）</p>
          </div>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <div class="step-num">⑧</div>
          <div class="step-content">
            <strong>回顾 + 计划明天</strong>
            <p>今天学了什么？明天学什么？写在笔记里</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 考情速览 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 12px;">📋 广东专升本高数考情速览</h3>
      <div class="exam-info">
        <div class="exam-row">
          <span class="exam-label">满分</span>
          <span class="exam-value">100 分</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">考试时间</span>
          <span class="exam-value">120 分钟</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">题型分布</span>
          <span class="exam-value">选择题 5×3 + 填空 5×3 + 计算 8×6 + 综合 2(10+12)</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">考纲章节</span>
          <span class="exam-value">8 章（函数→极限→微分→积分→向量→多元→方程→级数）</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">目标分数</span>
          <span class="exam-value" style="color: var(--success);">80 分以上</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">当前水平</span>
          <span class="exam-value" style="color: var(--warning);">零基础</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">考试日期</span>
          <span class="exam-value">2027 年 3 月</span>
        </div>
      </div>
    </div>

    <!-- 教材与视频对照 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 12px;">📖 教材与视频对照表</h3>
      <p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 13px;">你没有实体教材，用这些免费视频当"教材锚点"</p>
      <div class="resource-list">
        <div class="resource-item">
          <span class="resource-icon">📐</span>
          <div class="resource-info">
            <div class="resource-name">高数：同济第八版</div>
            <div class="resource-desc">B站搜「宋浩老师高等数学」直接配套，或者「杰哥专升本」真题向</div>
          </div>
        </div>
        <div class="resource-item">
          <span class="resource-icon">💻</span>
          <div class="resource-info">
            <div class="resource-name">C语言：谭浩强第5版</div>
            <div class="resource-desc">B站搜「小甲鱼C语言」零基础经典，或「翁恺C语言」浙大系统课</div>
          </div>
        </div>
        <div class="resource-item">
          <span class="resource-icon">📝</span>
          <div class="resource-info">
            <div class="resource-name">政治：2023版官方教材</div>
            <div class="resource-desc">B站搜「专升本政治」或「考研政治 徐涛」导学+模板</div>
          </div>
        </div>
        <div class="resource-item">
          <span class="resource-icon">🔤</span>
          <div class="resource-info">
            <div class="resource-name">英语：高职英语课标3000词</div>
            <div class="resource-desc">已进 Anki 牌组「专升本英语-高频词」，B站搜「我是瑞斯拜」作文模板</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 学习资源推荐 -->
    <div class="card" style="margin-top: 16px;">
      <h3 style="margin-bottom: 12px;">📚 推荐学习资源</h3>

      <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px;">📖 经典书籍与课程</h4>
      <div class="resource-list" style="margin-bottom: 16px;">
        <div class="resource-item">
          <span class="resource-icon">📖</span>
          <div class="resource-info">
            <div class="resource-name">《Make It Stick》/《认知天性》</div>
            <div class="resource-desc">认知科学经典，讲透主动回忆和间隔重复的原理</div>
          </div>
        </div>
        <div class="resource-item">
          <span class="resource-icon">🎓</span>
          <div class="resource-info">
            <div class="resource-name">Learning How to Learn (Coursera)</div>
            <div class="resource-desc">Barbara Oakley 的免费课程，B站搜索"Learning How to Learn"有中文字幕版</div>
          </div>
        </div>
      </div>

      <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px;">🎬 B站推荐视频（科学学习方法）</h4>
      <div class="resource-list" style="margin-bottom: 16px;">
        <div class="resource-item" v-for="(v, i) in biliMethodVideos" :key="'m'+i">
          <span class="resource-icon">🎬</span>
          <div class="resource-info">
            <div class="resource-name">{{ v.title }}</div>
            <div class="resource-desc">
              <a :href="v.url" target="_blank" class="video-link">去B站观看</a>
              <span v-if="v.duration" style="margin-left: 8px;">⏱ {{ v.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px;">🎬 B站推荐视频（专升本高数零基础）</h4>
      <div class="resource-list" style="margin-bottom: 16px;">
        <div class="resource-item" v-for="(v, i) in biliMathVideos" :key="'h'+i">
          <span class="resource-icon">📐</span>
          <div class="resource-info">
            <div class="resource-name">{{ v.title }}</div>
            <div class="resource-desc">
              <a :href="v.url" target="_blank" class="video-link">去B站观看</a>
              <span v-if="v.duration" style="margin-left: 8px;">⏱ {{ v.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px;">🐙 GitHub 开源学习工具</h4>
      <div class="resource-list" style="margin-bottom: 16px;">
        <div class="resource-item" v-for="(r, i) in githubRepos" :key="'g'+i">
          <span class="resource-icon">⭐</span>
          <div class="resource-info">
            <div class="resource-name">{{ r.name }}</div>
            <div class="resource-desc">{{ r.desc }}</div>
          </div>
        </div>
      </div>

      <h4 style="font-size: 14px; color: var(--primary); margin-bottom: 8px;">▶️ YouTube 推荐视频（高赞学习方法）</h4>
      <div class="resource-list">
        <div class="resource-item" v-for="(v, i) in youtubeVideos" :key="'y'+i">
          <span class="resource-icon">▶️</span>
          <div class="resource-info">
            <div class="resource-name">{{ v.title }}</div>
            <div class="resource-desc">
              <a :href="v.url" target="_blank" class="video-link">去YouTube观看</a>
              <span style="margin-left: 8px;">👍 {{ v.likes }} · 👁 {{ v.views }}</span>
            </div>
          </div>
        </div>
        <div v-if="youtubeVideos.length === 0" class="resource-item" style="color: var(--text-secondary);">
          <span class="resource-icon">🔄</span>
          <div class="resource-info">
            <div class="resource-name">数据加载中...</div>
            <div class="resource-desc">正在从 YouTube 获取高赞学习方法视频</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeMethod = ref(null)

const coreMethods = ref([
  {
    icon: '🧠',
    name: '主动回忆',
    brief: '最有效的学习方法：不看书，先回想',
    what: '主动回忆（Active Recall）是指在学完一段内容后，合上书本/笔记，主动从大脑中提取知识。不是"再读一遍"，而是"考考自己还记得什么"。',
    why: '被动阅读（重读、划线、高亮）会让你产生"我懂了"的错觉，实际上大脑并没有真正编码信息。主动回忆造成"必要的难度"，迫使大脑重建记忆路径，这个重建过程正是学习发生的时刻。研究显示主动回忆比被动阅读效果高 50% 以上。',
    tips: [
      '学完一个公式后，合上书默写出来',
      '看完一章笔记，试着复述核心概念',
      '做练习题前先不翻公式，看自己能做多少',
      '用 Anki 卡片做主动回忆（正面是问题，反面是答案）'
    ]
  },
  {
    icon: '🔄',
    name: '间隔重复',
    brief: '按照遗忘曲线安排复习，事半功倍',
    what: '间隔重复（Spaced Repetition）是指在学习后，按逐渐拉长的时间间隔安排复习——比如 1 天、3 天、1 周、1 个月。你已经在用的 Anki 就是基于这个原理。',
    why: '艾宾浩斯遗忘曲线告诉我们，学完新知识后遗忘速度极快。但在记忆即将消失前复习一次，记忆强度会大幅提升。每次复习都"卡在遗忘边缘"，大脑就知道这个信息很重要，需要长期保存。',
    tips: [
      '每天坚持刷 Anki 卡片，不要断',
      '新知识学完后 24 小时内必须第一次复习',
      '错题当天就做成 Anki 卡片',
      '设置固定的 Anki 复习时间（比如每天早饭后）'
    ]
  },
  {
    icon: '🔄',
    name: '交替练习',
    brief: '混合不同题型练习，避免"只会一种"',
    what: '交替练习（Interleaving）是指把不同章节、不同类型的题目混合在一起练习，而不是把同一类题目做完再做下一类。',
    why: '连续练习同一类题（blocked practice）会让你形成"机械记忆"——看到题目类型就知道用哪个公式，但考试时题目是混合的。交替练习迫使大脑先判断"这道题属于哪个知识点"，这个判断过程本身就是深度学习。',
    tips: [
      '不要一次刷完同一章所有题，每章选几道题轮着做',
      '每周做一次"混合周测"，随机抽各章节的题',
      '用 Sakiko 真题源做整套卷子，天然就是交替练习',
      '刷题时先扫一眼所有题，挑不同类型的做'
    ]
  },
  {
    icon: '👨‍🏫',
    name: '费曼技巧',
    brief: '用自己的话讲一遍，卡住的地方就是没真懂',
    what: '费曼技巧（Feynman Technique）是诺贝尔物理学奖得主理查德·费曼的学习方法：用最简单的语言把一个概念讲给一个完全不懂的人听，如果讲不下去，说明你还没真正理解。',
    why: '自以为自己懂了和真的能讲出来是两回事。卡住的地方就是"理解的黑洞"——你以为知道，实际上说不清楚。这种"知识的缺口"只有通过输出的方式才能发现。',
    tips: [
      '学完一个定理后，假装在给同桌讲题',
      '用最通俗的比喻解释复杂概念（比如把极限比作"越来越接近但永远到不了"）',
      '讲不下去的地方标记出来，回看笔记直到能讲通',
      '把你的讲解写下来或录下来，你会发现很多"你以为懂"的漏洞'
    ]
  },
  {
    icon: '🎨',
    name: '双重编码',
    brief: '文字 + 图像同时学，大脑两条通路记忆',
    what: '双重编码（Dual Coding）是指同时用语言和视觉两种方式呈现信息。比如学函数图像时，既看文字描述，也看函数曲线图。',
    why: '大脑有两条独立的信息处理通道：语言通道和视觉通道。同时使用两条通道，信息的编码和提取线索就加倍了。而且图像比文字更容易被记住（图画优势效应）。',
    tips: [
      '学每个函数时，都画出它的图像',
      '用思维导图整理章节知识框架',
      '把公式和它的几何意义联系起来',
      '在笔记中多用图示、表格、流程图代替纯文字'
    ]
  },
  {
    icon: '🍅',
    name: '番茄工作法',
    brief: '25分钟专注+5分钟休息，启动学习零阻力',
    what: '番茄工作法（Pomodoro Technique）是把学习时间分成 25 分钟的"番茄钟"，每个番茄钟后休息 5 分钟，每 4 个番茄钟后休息 15-30 分钟。',
    why: '最大的学习障碍不是"学不会"，而是"不想开始"。25分钟足够短，短到让你觉得"就试一下"，一旦开始，前额叶皮质被激活，专注力自然就来了。而且频繁休息能保持大脑高效运转。',
    tips: [
      '用本页的番茄钟，每天先完成 2 个番茄钟再干别的',
      '番茄钟内手机静音，不被打断',
      '如果中途走神了，这个番茄钟作废，重新开始',
      '休息时站起来走走，不要刷手机'
    ]
  }
])

// 番茄钟
const timer = ref(25 * 60)
const timerRunning = ref(false)
const timerPhase = ref('准备开始')
let timerInterval = null

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function startTimer() {
  timerRunning.value = true
  timerPhase.value = '专注学习'
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      stopTimer()
      timerPhase.value = '休息时间！'
      alert('🍅 番茄钟结束！休息 5 分钟吧')
    }
  }, 1000)
}

function stopTimer() {
  timerRunning.value = false
  clearInterval(timerInterval)
  timerInterval = null
  timerPhase.value = '已暂停'
}

function resetTimer() {
  stopTimer()
  timer.value = 25 * 60
  timerPhase.value = '准备开始'
}

// B站推荐视频 - 科学学习方法
const biliMethodVideos = ref([
  { title: '金字塔原理+费曼学习法+思维导图到底有多牛？高效学习方法合集！', url: 'https://www.bilibili.com/video/BV1UeujziEsi/', duration: '9:09:21' },
  { title: '科学认证记忆术：遗忘率低于1%的高效学习方法！', url: 'https://www.bilibili.com/video/BV14zoLBcEsd/', duration: '2:49' },
  { title: '吊打学霸最快的方法，没有之一！', url: 'https://www.bilibili.com/video/BV1TUKfzjEr1/', duration: '3:09' },
  { title: '背书实操：遗忘率降低90%的终极学习法！', url: 'https://www.bilibili.com/video/BV1mHXjBoEYu/', duration: '3:42' },
  { title: '深度探究脑科学记忆原理，5个硬核方法，短期内让记忆力暴涨！', url: 'https://www.bilibili.com/video/BV1Xw4m1y7jR/', duration: '1:56:56' },
  { title: '分享20个被科学严证实的记忆原理', url: 'https://www.bilibili.com/video/BV1Rkm5Y4EiC/', duration: '4:37' },
  { title: '长期摆烂后，如何快速恢复300%学习状态！超强海马体学习法', url: 'https://www.bilibili.com/video/BV1Eh4y1J7S6/', duration: '10:20:09' }
])

// B站推荐视频 - 专升本高数零基础
const biliMathVideos = ref([
  { title: '【阶段二】江苏专转本高数116个题型的解题方法总结[从零基础到拔高]', url: 'https://www.bilibili.com/video/BV1vkG16sEXt/', duration: '9:35:20' },
  { title: '【专升本高等数学0基础学习】函数的对应法则及求解方法', url: 'https://www.bilibili.com/video/BV1SC6hYLETC/', duration: '20:03' },
  { title: '【高等数学基础】专升本/考研', url: 'https://www.bilibili.com/video/BV1RccMeMEkp/', duration: '11:14:38' },
  { title: '上班族零基础自学高数专用指南，不用跟班上课', url: 'https://www.bilibili.com/video/BV1a3gY6gEro/', duration: '1:37' },
  { title: '山东专升本高数第八讲，零基础小白也能学会', url: 'https://www.bilibili.com/video/BV1hA411y7wn/', duration: '1:02:20' },
  { title: '【精通学堂】零基础 高分必看', url: 'https://www.bilibili.com/video/BV1oT411b7MZ/', duration: '6:27:16' }
])

// GitHub 高星学习工具仓库
const githubRepos = ref([
  { name: '⭐ alyssaxuu/carden (★486)', desc: 'Flashcards with spaced repetition and gamification' },
  { name: '⭐ hluaguo/learn-faster-kit (★354)', desc: 'AI-powered learning coach with spaced repetition' },
  { name: '⭐ SYuan03/Skill-Anything (★317)', desc: 'Any source to interactive learning package with quizzes & flashcards' },
  { name: '⭐ Human-Centric-Machine-Learning/memorize (★188)', desc: '"Enhancing Human Learning via Spaced Repetition Optimization", PNAS 2019' },
  { name: '⭐ ctrlaltwill/LearnKit (★160)', desc: 'A native study system for Obsidian vault - turns notes into flashcards' },
  { name: '⭐ helloworld1/AnyMemo (★159)', desc: 'Advanced Spaced Repetition flashcard learning software for Android' }
])

// YouTube 推荐视频（高赞学习方法）
const youtubeVideos = ref([
  { title: 'How to Remember Everything You Read (988万次观看)', url: 'https://www.youtube.com/watch?v=okHkUIW46ks', likes: '988万', views: 'Justin Sung' },
  { title: 'The Feynman Technique (763万次观看)', url: 'https://www.youtube.com/watch?v=tkm0TNFzIeg', likes: '763万', views: 'Sprouts' },
  { title: 'How to study for exams - Evidence-based revision tips (546万次观看)', url: 'https://www.youtube.com/watch?v=ukLnPbIffxE', likes: '546万', views: 'Ali Abdaal' },
  { title: 'The Most Powerful Way to Remember What You Study (387万次观看)', url: 'https://www.youtube.com/watch?v=eVajQPuRmk8', likes: '387万', views: 'Thomas Frank' },
  { title: 'How to Study for Exams - An Evidence-Based Masterclass (315万次观看)', url: 'https://www.youtube.com/watch?v=Lt54CX9DmS4', likes: '315万', views: 'Ali Abdaal' },
  { title: 'How to Study SMART? 12 Scientific Study Techniques (267万次观看)', url: 'https://www.youtube.com/watch?v=kVo_YlnquFs', likes: '267万', views: 'ClassXplained' },
  { title: 'How to Study for Exams - Spaced Repetition (226万次观看)', url: 'https://www.youtube.com/watch?v=Z-zNHHpXoMM', likes: '226万', views: 'Ali Abdaal' },
  { title: 'How To Use Anki Like A Pro (223万次观看)', url: 'https://www.youtube.com/watch?v=WmPx333n5UQ', likes: '223万', views: 'TheMDJourney' },
  { title: 'How to Study Effectively with Flash Cards (217万次观看)', url: 'https://www.youtube.com/watch?v=mzCEJVtED0U', likes: '217万', views: 'Thomas Frank' }
])
</script>

<style scoped>
.method-card {
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  padding: 20px;
}
.method-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.method-icon {
  font-size: 36px;
  margin-bottom: 8px;
}
.method-name {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}
.method-brief {
  font-size: 12px;
  color: var(--text-secondary);
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.detail-header h2 {
  font-size: 20px;
}
.detail-section {
  margin-bottom: 16px;
}
.detail-section h4 {
  font-size: 14px;
  color: var(--primary);
  margin-bottom: 6px;
}
.detail-section p {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text);
}
.detail-section ul {
  padding-left: 20px;
}
.detail-section li {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 4px;
}
.system-flow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 8px;
}
.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}
.step-content strong {
  display: block;
  margin-bottom: 2px;
}
.step-content p {
  font-size: 13px;
  color: var(--text-secondary);
}
.flow-arrow {
  font-size: 20px;
  color: var(--text-secondary);
}
.pomodoro {
  text-align: center;
  padding: 20px 0;
}
.timer-display {
  font-size: 64px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--primary);
  margin-bottom: 8px;
}
.timer-phase {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}
.timer-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
}
.resource-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.resource-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px;
  border-radius: 8px;
  background: #f8fafc;
}
.resource-icon {
  font-size: 24px;
}
.resource-name {
  font-weight: 600;
  font-size: 14px;
}
.resource-desc {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
}
.exam-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.exam-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background: #f8fafc;
}
.exam-label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}
.exam-value {
  font-size: 13px;
  font-weight: 600;
  text-align: right;
}
.video-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}
.video-link:hover {
  text-decoration: underline;
}
</style>