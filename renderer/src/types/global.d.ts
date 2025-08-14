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

export interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
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
  api: {
    get: <T>(url: string, headers?: Record<string, string>) => Promise<ApiResponse<T>>
    post: <T>(url: string, body?: any, headers?: Record<string, string>) => Promise<ApiResponse<T>>
    put: <T>(url: string, body?: any, headers?: Record<string, string>) => Promise<ApiResponse<T>>
    patch: <T>(url: string, body?: any, headers?: Record<string, string>) => Promise<ApiResponse<T>>
    delete: <T>(url: string, headers?: Record<string, string>) => Promise<ApiResponse<T>>
    request: <T>(request: {
      url: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      headers?: Record<string, string>
      body?: any
      timeout?: number
    }) => Promise<ApiResponse<T>>
  }
}

declare global {
  interface Window {
    api: ElectronAPI
  }
}

export {}