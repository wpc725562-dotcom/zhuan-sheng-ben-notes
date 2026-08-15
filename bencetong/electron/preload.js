import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('bencetong', {
  // 文件系统
  listTree: (dirPath) => ipcRenderer.invoke('fs:listTree', dirPath),
  readFile: (filePath) => ipcRenderer.invoke('fs:readFile', filePath),

  // Git 同步
  gitPull: () => ipcRenderer.invoke('git:pull'),
  gitPush: () => ipcRenderer.invoke('git:push'),
  gitStatus: () => ipcRenderer.invoke('git:status'),

  // 应用信息
  getNotesPath: () => ipcRenderer.invoke('app:getNotesPath'),

  // 平台信息
  platform: process.platform
})