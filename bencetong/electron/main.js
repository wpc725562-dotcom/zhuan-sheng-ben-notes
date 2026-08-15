import { app, BrowserWindow, ipcMain } from 'electron'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'

// 笔记仓库路径
const NOTES_PATH = join(app.getPath('appData'), 'reasonix', 'global-workspace', 'zhuan-sheng-ben-notes')

let mainWindow = null

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: '本科通',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '..', 'dist', 'index.html'))
  }
}

// ===== IPC 处理器 =====

// 获取仓库目录结构
ipcMain.handle('fs:listTree', async (_, dirPath) => {
  try {
    const basePath = dirPath || NOTES_PATH
    return listDirectoryTree(basePath, basePath)
  } catch (e) {
    return { error: e.message }
  }
})

// 读取文件内容
ipcMain.handle('fs:readFile', async (_, filePath) => {
  try {
    const fullPath = join(NOTES_PATH, filePath)
    const content = fs.readFileSync(fullPath, 'utf-8')
    return { content }
  } catch (e) {
    return { error: e.message }
  }
})

// Git 同步 - 拉取最新
ipcMain.handle('git:pull', async () => {
  try {
    const result = execSync('git pull', { cwd: NOTES_PATH, encoding: 'utf-8' })
    return { success: true, message: result }
  } catch (e) {
    return { success: false, message: e.stderr || e.message }
  }
})

// Git 同步 - 推送
ipcMain.handle('git:push', async () => {
  try {
    execSync('git add -A', { cwd: NOTES_PATH, encoding: 'utf-8' })
    execSync('git commit -m "本科通: 自动同步"', { cwd: NOTES_PATH, encoding: 'utf-8' })
    const result = execSync('git push', { cwd: NOTES_PATH, encoding: 'utf-8' })
    return { success: true, message: result }
  } catch (e) {
    return { success: false, message: e.stderr || e.message }
  }
})

// 获取仓库状态
ipcMain.handle('git:status', async () => {
  try {
    const status = execSync('git status --short', { cwd: NOTES_PATH, encoding: 'utf-8' })
    const log = execSync('git log --oneline -5', { cwd: NOTES_PATH, encoding: 'utf-8' })
    return { success: true, status, log }
  } catch (e) {
    return { success: false, message: e.message }
  }
})

// 获取仓库路径
ipcMain.handle('app:getNotesPath', () => NOTES_PATH)

// 辅助：递归列出目录树
function listDirectoryTree(dirPath, basePath) {
  const items = fs.readdirSync(dirPath, { withFileTypes: true })
  const result = []
  for (const item of items) {
    if (item.name.startsWith('.') || item.name === 'node_modules') continue
    const fullPath = join(dirPath, item.name)
    const relativePath = fullPath.replace(basePath + '\\', '').replace(basePath + '/', '')
    if (item.isDirectory()) {
      result.push({
        name: item.name,
        path: relativePath,
        type: 'directory',
        children: listDirectoryTree(fullPath, basePath)
      })
    } else if (item.name.endsWith('.md') || item.name.endsWith('.txt')) {
      result.push({
        name: item.name,
        path: relativePath,
        type: 'file'
      })
    }
  }
  return result
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})