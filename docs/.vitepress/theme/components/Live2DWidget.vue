<template>
  <div class="live2d-controls" v-if="desktopEligible">
    <template v-if="loaded && !disabled">
      <button
        class="live2d-close"
        type="button"
        aria-label="关闭看板娘"
        title="关闭看板娘"
        @click="disableWidget"
      >×</button>
      <div class="live2d-picker" :class="{ open: pickerOpen }">
        <button
          class="live2d-switch"
          type="button"
          title="切换看板娘"
          @click="pickerOpen = !pickerOpen"
        >🎭 {{ currentName }}</button>
        <ul v-if="pickerOpen" class="live2d-list" role="listbox">
          <li
            v-for="(m, i) in MODELS"
            :key="m.id"
            :class="{ active: i === modelIndex }"
            role="option"
            :aria-selected="i === modelIndex"
            @click="selectModel(i)"
          >
            <span class="name">{{ m.name }}</span>
            <span class="tag">{{ m.tag }}</span>
          </li>
        </ul>
      </div>
    </template>
    <button
      v-else-if="disabled"
      class="live2d-restore"
      type="button"
      title="显示看板娘"
      @click="restoreWidget"
    >🌸 看板娘</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'

/** 公开模型 CDN：https://model.hacxy.cn （学习/非商用） */
const CDN = 'https://model.hacxy.cn'

type LiveModel = {
  id: string
  name: string
  tag: string
  path: string
  scale?: number
  offset?: [number, number]
}

/**
 * A+B：默认好看模型 + 多模型切换
 * 无高木/洛琪希正版包；气质接近：小春≈短发少女、仙狐≈魔法萝莉感
 * Cubism2 + Cubism3+ 均支持（l2d-widget）
 */
/**
   * 统一视觉高度：画布固定 300×430，各模型 scale 按引擎/源文件校准到相近占位。
   * Cubism3（.model3）默认单位更大 → scale 偏低；Cubism2 偏高。
   * 整体约比旧配置大 1.8～2 倍，和 Sakiko 那种「左下角真人尺寸」更接近。
   */
  const MODELS: LiveModel[] = [
  {
    id: 'senko',
    name: '仙狐',
    tag: '狐耳 · 魔法感',
    path: `${CDN}/Senko_Normals/senko.model3.json`,
    scale: 0.2,
    offset: [0, 0.08],
  },
  {
    id: 'koharu',
    name: '小春',
    tag: '短发 · 像高木',
    path: `${CDN}/koharu/model.json`,
    scale: 0.18,
    offset: [0, 0.02],
  },
  {
    id: 'hibiki',
    name: '响',
    tag: '舰娘 · 短发',
    path: `${CDN}/hibiki/hibiki.model.json`,
    scale: 0.28,
    offset: [0, 0],
  },
  {
    id: 'haru',
    name: 'Haru',
    tag: '官方样例',
    path: `${CDN}/Haru/Haru.model3.json`,
    scale: 0.2,
    offset: [0, 0.02],
  },
  {
    id: 'hiyori',
    name: 'Hiyori',
    tag: '官方样例',
    path: `${CDN}/Hiyori/Hiyori.model3.json`,
    scale: 0.18,
    offset: [0, 0.02],
  },
  {
    id: 'shizuku',
    name: '雫',
    tag: '经典 Cubism2',
    path: `${CDN}/shizuku/shizuku.model.json`,
    scale: 0.28,
    offset: [0, 0],
  },
  {
    id: 'cat-black',
    name: '黑猫',
    tag: '猫系萌',
    path: `${CDN}/cat-black/model.json`,
    scale: 0.26,
    offset: [0, 0],
  },
  {
    id: 'bilibili-22',
    name: '22',
    tag: 'B站娘',
    path: `${CDN}/bilibili-22/index.json`,
    scale: 0.28,
    offset: [0, 0],
  },
  {
    id: 'local',
    name: '默认',
    tag: '站内本地',
    // withBase 在客户端解析 base 路径
    path: '',
    scale: 1,
    offset: [0, 0],
  },
]

const STORAGE_DISABLED = 'zsb-live2d-disabled'
const STORAGE_MODEL = 'zsb-live2d-model'

const loaded = ref(false)
const disabled = ref(false)
const desktopEligible = ref(false)
const pickerOpen = ref(false)
const modelIndex = ref(0)
const switching = ref(false)

const currentName = computed(() => MODELS[modelIndex.value]?.name || '看板娘')

type WidgetApi = {
  switchModel: (index: number) => Promise<void>
  sleep: () => void
  destroy: () => Promise<void>
}

let widget: WidgetApi | null = null
let loadTimer: ReturnType<typeof setTimeout> | null = null
let idleHandle: number | null = null
let outsideHandler: ((e: MouseEvent) => void) | null = null

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

function resolveModels() {
  return MODELS.map((m) => {
    const path = m.id === 'local'
      ? withBase('/live2d/model.json')
      : m.path
    return {
      path,
      scale: m.scale ?? 0.2,
      offset: m.offset ?? ([0, 0] as [number, number]),
      volume: 0,
      tips: {
        welcomeMessage: [
          '主人好～今天刷哪一科？',
          '专升本加油！我陪你。',
          'Ciallo～欢迎回来。',
        ],
        messages: [
          '休息一下眼睛吧～',
          '高数公式背完了吗？',
          '英语单词别偷懒哦。',
          '计算机指针再看一眼～',
        ],
        duration: 3500,
        interval: 12000,
      },
    }
  })
}

function shouldLoad(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)').matches
    && !connection?.saveData
}

function readSavedIndex(): number {
  const raw = localStorage.getItem(STORAGE_MODEL)
  if (raw == null) return 0
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 0 || n >= MODELS.length) return 0
  return n
}

async function loadWidget(): Promise<void> {
  if (disabled.value || loaded.value || widget) return
  try {
    // 仅客户端动态导入，避免 SSR 触碰 document
    const { createWidget } = await import('l2d-widget')
    const models = resolveModels()
    const startIndex = modelIndex.value

    // MODELS 下标 == switchModel 下标；默认加载第 0 个后切到已保存下标
    widget = createWidget({
      model: models,
      position: 'bottom-left',
      // 与 Sakiko 同级「存在感」：比旧 220×320 大约 1.5 倍可视面积
      size: { width: 300, height: 430 },
      primaryColor: 'rgba(228, 89, 111, 0.92)',
      transitionDuration: 900,
      transitionType: 'fade',
      menus: {
        align: 'right',
      },
    }) as WidgetApi

    if (startIndex > 0) {
      await widget.switchModel(startIndex)
    }

    loaded.value = true
  } catch (e) {
    console.error('Live2D (l2d-widget) load failed:', e)
    widget = null
    loaded.value = false
  }
}

async function selectModel(index: number): Promise<void> {
  if (switching.value || index === modelIndex.value) {
    pickerOpen.value = false
    return
  }
  if (!widget) return
  switching.value = true
  pickerOpen.value = false
  try {
    await widget.switchModel(index)
    modelIndex.value = index
    localStorage.setItem(STORAGE_MODEL, String(index))
  } catch (e) {
    console.error('switchModel failed:', e)
  } finally {
    switching.value = false
  }
}

function disableWidget(): void {
  disabled.value = true
  pickerOpen.value = false
  localStorage.setItem(STORAGE_DISABLED, '1')
  try {
    widget?.sleep()
  } catch {
    // ignore
  }
}

async function restoreWidget(): Promise<void> {
  disabled.value = false
  localStorage.removeItem(STORAGE_DISABLED)
  if (widget) {
    // sleep 后点状态条可唤醒；若状态条不可见则重建
    try {
      // 重新 create 更稳妥
      await destroyWidget()
    } catch {
      // ignore
    }
  }
  await loadWidget()
}

async function destroyWidget(): Promise<void> {
  if (!widget) return
  const w = widget
  widget = null
  loaded.value = false
  try {
    await w.destroy()
  } catch {
    // ignore
  }
}

onMounted(() => {
  desktopEligible.value = shouldLoad()
  disabled.value = localStorage.getItem(STORAGE_DISABLED) === '1'
  modelIndex.value = readSavedIndex()

  outsideHandler = (e: MouseEvent) => {
    const t = e.target as HTMLElement | null
    if (!t?.closest?.('.live2d-picker')) pickerOpen.value = false
  }
  document.addEventListener('click', outsideHandler)

  if (!desktopEligible.value || disabled.value) return

  const idleWindow = window as IdleWindow
  if (idleWindow.requestIdleCallback) {
    idleHandle = idleWindow.requestIdleCallback(() => {
      void loadWidget()
    }, { timeout: 5000 })
  } else {
    loadTimer = setTimeout(() => {
      void loadWidget()
    }, 2500)
  }
})

onUnmounted(() => {
  if (loadTimer) clearTimeout(loadTimer)
  if (idleHandle !== null) {
    const idleWindow = window as IdleWindow
    idleWindow.cancelIdleCallback?.(idleHandle)
  }
  if (outsideHandler) {
    document.removeEventListener('click', outsideHandler)
    outsideHandler = null
  }
  void destroyWidget()
})
</script>

<style scoped>
.live2d-close,
.live2d-restore,
.live2d-switch {
  border: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 88%, transparent);
  color: var(--vp-c-text-2);
  box-shadow: 0 4px 16px rgba(0, 0, 0, .1);
  backdrop-filter: blur(10px);
  cursor: pointer;
}
.live2d-close {
  position: fixed;
  left: 16px;
  /* 对齐放大后的画布高度 430 */
  bottom: 410px;
  z-index: 102;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 20px;
  line-height: 1;
}
.live2d-picker {
  position: fixed;
  left: 16px;
  bottom: 18px;
  z-index: 102;
}
.live2d-switch {
  padding: 7px 12px;
  border-radius: 999px;
  font-size: 12px;
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.live2d-restore {
  position: fixed;
  left: 16px;
  bottom: 18px;
  z-index: 102;
  padding: 7px 11px;
  border-radius: 999px;
  font-size: 12px;
}
.live2d-list {
  position: absolute;
  left: 0;
  bottom: calc(100% + 8px);
  margin: 0;
  padding: 6px;
  list-style: none;
  min-width: 168px;
  max-height: 280px;
  overflow: auto;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  box-shadow: 0 8px 28px rgba(0, 0, 0, .16);
  backdrop-filter: blur(12px);
}
.live2d-list li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: var(--vp-c-text-1);
}
.live2d-list li:hover,
.live2d-list li.active {
  background: color-mix(in srgb, var(--sakura-pink, #e4596f) 16%, transparent);
}
.live2d-list .tag {
  font-size: 11px;
  color: var(--vp-c-text-3);
}
.live2d-close:hover,
.live2d-restore:hover,
.live2d-switch:hover {
  color: var(--accent-color, #e4596f);
  border-color: var(--sakura-pink, #e4596f);
}
@media (max-width: 899px) {
  .live2d-controls { display: none; }
}
</style>
