export interface SystemInfo {
  platform: string
  arch: string
  nodeVersion: string
  electronVersion: string
  appVersion: string
  osVersion: string
  totalMemory: number
  freeMemory: number
  uptime: number
}

export interface ElectronAPI {
  readFile: (path: string) => Promise<string>
  writeFile: (path: string, content: string) => Promise<void>
  getSystemInfo: () => Promise<SystemInfo>
  openExternal: (url: string) => Promise<void>
  showMessageBox: (options: {
    type: 'info' | 'warning' | 'error'
    title: string
    message: string
  }) => Promise<number>
  updateCounter: (value: number) => Promise<void>
  onCounterUpdate: (callback: (value: number) => void) => () => void
  onThemeUpdate: (callback: (theme: 'light' | 'dark') => void) => () => void
}

declare global {
  interface Window {
    api: ElectronAPI
  }
}

export {}