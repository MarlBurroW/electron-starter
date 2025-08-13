import { app, BrowserWindow, Menu, shell } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import log from 'electron-log'
import { autoUpdater } from 'electron-updater'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Configure logging
log.transports.file.level = 'info'
autoUpdater.logger = log

// Import IPC handlers
import './ipc/files'
import './ipc/system'

class ElectronApp {
  private mainWindow: BrowserWindow | null = null
  // private tray: Tray | null = null

  constructor() {
    this.init()
  }

  private init(): void {
    // This method will be called when Electron has finished initialization
    app.whenReady().then(() => {
      // Set app user model id for windows
      electronApp.setAppUserModelId('com.electron.starter')

      // Default open or close DevTools by F12 in development
      // and ignore CommandOrControl + R in production.
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })

      this.createWindow()
      this.setupMenu()
      this.setupAutoUpdater()

      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) this.createWindow()
      })
    })

    // Quit when all windows are closed, except on macOS
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    // Single instance lock
    const gotTheLock = app.requestSingleInstanceLock()
    if (!gotTheLock) {
      app.quit()
    } else {
      app.on('second-instance', () => {
        // Someone tried to run a second instance, we should focus our window instead.
        if (this.mainWindow) {
          if (this.mainWindow.isMinimized()) this.mainWindow.restore()
          this.mainWindow.focus()
        }
      })
    }

    // Security: Prevent new window creation from renderer
    app.on('web-contents-created', (_, contents) => {
      contents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return { action: 'deny' }
      })
    })
  }

  private createWindow(): void {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
      show: false,
      autoHideMenuBar: true,
      titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'hidden',
      titleBarOverlay: process.platform !== 'darwin' ? {
        color: 'var(--background)',
        symbolColor: 'var(--foreground)',
        height: 40
      } : false,

      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        sandbox: true,
        contextIsolation: true,
        nodeIntegration: false,
        webSecurity: true,
        allowRunningInsecureContent: false,
        experimentalFeatures: false,
      }
    })

    this.mainWindow.on('ready-to-show', () => {
      this.mainWindow?.show()
    })

    this.mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
    }

    // Open DevTools in development
    if (is.dev) {
      this.mainWindow.webContents.openDevTools()
    }
  }

  private setupMenu(): void {
    const template: Electron.MenuItemConstructorOptions[] = [
      {
        label: 'Application',
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'selectAll' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  private setupAutoUpdater(): void {
    // Auto updater setup (commented for development)
    /*
    autoUpdater.checkForUpdatesAndNotify()
    
    autoUpdater.on('checking-for-update', () => {
      log.info('Checking for update...')
    })
    
    autoUpdater.on('update-available', (info) => {
      log.info('Update available.', info)
    })
    
    autoUpdater.on('update-not-available', (info) => {
      log.info('Update not available.', info)
    })
    
    autoUpdater.on('error', (err) => {
      log.error('Error in auto-updater.', err)
    })
    
    autoUpdater.on('download-progress', (progressObj) => {
      let log_message = 'Download speed: ' + progressObj.bytesPerSecond
      log_message = log_message + ' - Downloaded ' + progressObj.percent + '%'
      log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
      log.info(log_message)
    })
    
    autoUpdater.on('update-downloaded', (info) => {
      log.info('Update downloaded', info)
      autoUpdater.quitAndInstall()
    })
    */
  }
}

// Initialize the app
new ElectronApp()