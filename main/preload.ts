import { contextBridge, ipcRenderer, shell } from 'electron'
import { z } from 'zod'

// Validation schemas for IPC communication
const ReadFileSchema = z.object({
  path: z.string().min(1),
})

const OpenExternalSchema = z.object({
  url: z.string().url(),
})

const CounterUpdateSchema = z.object({
  value: z.number(),
})

// Type-safe IPC API
const api = {
  // File operations
  readFile: async (path: string): Promise<string> => {
    const validated = ReadFileSchema.parse({ path })
    return ipcRenderer.invoke('app/read-file', validated.path)
  },

  writeFile: async (path: string, content: string): Promise<void> => {
    return ipcRenderer.invoke('app/write-file', path, content)
  },

  // System operations
  getSystemInfo: async (): Promise<{
    platform: string
    arch: string
    nodeVersion: string
    electronVersion: string
    appVersion: string
    osVersion: string
    totalMemory: number
    freeMemory: number
    uptime: number
  }> => {
    return ipcRenderer.invoke('app/get-system-info')
  },

  openExternal: async (url: string): Promise<void> => {
    const validated = OpenExternalSchema.parse({ url })
    // Security: Only allow HTTPS URLs and specific domains
    const allowedDomains = ['github.com', 'electron.build', 'vitejs.dev', 'tweakcn.com']
    const urlObj = new URL(validated.url)
    
    if (urlObj.protocol !== 'https:' || !allowedDomains.includes(urlObj.hostname)) {
      throw new Error('URL not allowed')
    }
    
    return shell.openExternal(validated.url)
  },

  // App operations
  showMessageBox: async (options: {
    type: 'info' | 'warning' | 'error'
    title: string
    message: string
  }): Promise<number> => {
    return ipcRenderer.invoke('app/show-message-box', options)
  },

  // Counter example (for demonstration)
  updateCounter: async (value: number): Promise<void> => {
    const validated = CounterUpdateSchema.parse({ value })
    return ipcRenderer.invoke('app/update-counter', validated.value)
  },

  // Event listeners
  onCounterUpdate: (callback: (value: number) => void) => {
    ipcRenderer.on('counter-updated', (_, value) => callback(value))
    return () => ipcRenderer.removeAllListeners('counter-updated')
  },

  onThemeUpdate: (callback: (theme: 'light' | 'dark') => void) => {
    ipcRenderer.on('theme-updated', (_, theme) => callback(theme))
    return () => ipcRenderer.removeAllListeners('theme-updated')
  },

  // API calls via main process (secure)
  api: {
    get: async <T>(url: string, headers?: Record<string, string>): Promise<{
      data: T
      status: number
      statusText: string
      headers: Record<string, string>
    }> => {
      return ipcRenderer.invoke('api/get', url, headers)
    },

    post: async <T>(url: string, body?: any, headers?: Record<string, string>): Promise<{
      data: T
      status: number
      statusText: string
      headers: Record<string, string>
    }> => {
      return ipcRenderer.invoke('api/post', url, body, headers)
    },

    put: async <T>(url: string, body?: any, headers?: Record<string, string>): Promise<{
      data: T
      status: number
      statusText: string
      headers: Record<string, string>
    }> => {
      return ipcRenderer.invoke('api/put', url, body, headers)
    },

    patch: async <T>(url: string, body?: any, headers?: Record<string, string>): Promise<{
      data: T
      status: number
      statusText: string
      headers: Record<string, string>
    }> => {
      return ipcRenderer.invoke('api/patch', url, body, headers)
    },

    delete: async <T>(url: string, headers?: Record<string, string>): Promise<{
      data: T
      status: number
      statusText: string
      headers: Record<string, string>
    }> => {
      return ipcRenderer.invoke('api/delete', url, headers)
    },

    request: async <T>(request: {
      url: string
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      headers?: Record<string, string>
      body?: any
      timeout?: number
    }): Promise<{
      data: T
      status: number
      statusText: string
      headers: Record<string, string>
    }> => {
      return ipcRenderer.invoke('api/request', request)
    }
  }
}

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('api', api)

// Export types for TypeScript
export type ElectronAPI = typeof api