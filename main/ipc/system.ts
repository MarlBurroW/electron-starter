import { ipcMain, dialog, app } from 'electron'
import log from 'electron-log'
import * as os from 'os'

// System information
ipcMain.handle('app/get-system-info', async () => {
  try {
    const systemInfo = {
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      electronVersion: process.versions.electron,
      appVersion: app.getVersion(),
      osVersion: os.release(),
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
      uptime: os.uptime()
    }
    
    log.info('System info requested:', systemInfo)
    return systemInfo
  } catch (error) {
    log.error('Error getting system info:', error)
    throw error
  }
})

// Message box
ipcMain.handle('app/show-message-box', async (event, options: {
  type: 'info' | 'warning' | 'error'
  title: string
  message: string
}) => {
  try {
    const result = await dialog.showMessageBox({
      type: options.type,
      title: options.title,
      message: options.message,
      buttons: ['OK']
    })
    return result.response
  } catch (error) {
    log.error('Error showing message box:', error)
    throw error
  }
})

// Counter demonstration (for store sync)
let counterValue = 0

ipcMain.handle('app/update-counter', async (event, value: number) => {
  try {
    counterValue = value
    
    // Broadcast to all renderer processes
    const { BrowserWindow } = require('electron')
    BrowserWindow.getAllWindows().forEach(window => {
      window.webContents.send('counter-updated', counterValue)
    })
    
    log.info(`Counter updated to: ${counterValue}`)
  } catch (error) {
    log.error('Error updating counter:', error)
    throw error
  }
})

ipcMain.handle('app/get-counter', async () => {
  return counterValue
})

// Theme management
ipcMain.handle('app/set-theme', async (event, theme: 'light' | 'dark') => {
  try {
    // Store theme preference (you could save to file)
    const userDataPath = app.getPath('userData')
    const { promises: fs } = require('fs')
    const configPath = require('path').join(userDataPath, 'config.json')
    
    let config = {}
    try {
      const configData = await fs.readFile(configPath, 'utf-8')
      config = JSON.parse(configData)
    } catch {
      // File doesn't exist yet
    }
    
    const newConfig = { ...config, theme }
    await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2))
    
    // Broadcast theme change
    const { BrowserWindow } = require('electron')
    BrowserWindow.getAllWindows().forEach(window => {
      window.webContents.send('theme-updated', theme)
    })
    
    log.info(`Theme set to: ${theme}`)
  } catch (error) {
    log.error('Error setting theme:', error)
    throw error
  }
})

ipcMain.handle('app/get-theme', async () => {
  try {
    const userDataPath = app.getPath('userData')
    const { promises: fs } = require('fs')
    const configPath = require('path').join(userDataPath, 'config.json')
    
    try {
      const configData = await fs.readFile(configPath, 'utf-8')
      const config = JSON.parse(configData)
      return config.theme || 'light'
    } catch {
      return 'light'
    }
  } catch (error) {
    log.error('Error getting theme:', error)
    return 'light'
  }
})