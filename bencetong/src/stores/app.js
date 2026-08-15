import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getChapterProgress, getTodayStudyTime } from '../data/chapters-data.js'

export const useAppStore = defineStore('app', () => {
  const notesPath = ref('')
  const syncStatus = ref('idle') // idle | syncing | success | error
  const lastSyncTime = ref(null)

  // 学习进度统计（从 localStorage 读取）
  const chapterProgress = computed(() => getChapterProgress())
  const completedChapters = computed(() => {
    return Object.values(chapterProgress.value).filter(v => v).length
  })
  const totalProgress = computed(() => {
    return Math.round(completedChapters.value / 8 * 100)
  })
  const todayStudy = computed(() => getTodayStudyTime())

  return {
    notesPath, syncStatus, lastSyncTime,
    chapterProgress, completedChapters, totalProgress, todayStudy
  }
})