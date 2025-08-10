// Dev shim: si l'app est ouverte dans un navigateur (hors Electron),
// on crée une API minimale pour éviter les erreurs dans le renderer.

import type { ElectronAPI } from '@/types/global'

if (typeof window !== 'undefined' && typeof window.api === 'undefined') {
  // Shim minimal pour le dev web (vite preview / navigateur)
  (window as any).api = {
    async getSystemInfo() {
      return {
        platform: navigator.platform || 'web',
        arch: 'unknown',
        nodeVersion: 'N/A',
        electronVersion: 'N/A',
        appVersion: '1.0.0',
        osVersion: navigator.userAgent,
        totalMemory: 8000000000, // 8GB fictif
        freeMemory: 4000000000,  // 4GB fictif
        uptime: 86400, // 1 jour fictif
      }
    },
    async openExternal(url: string) {
      window.open(url, '_blank', 'noopener,noreferrer')
    },
    async readFile() {
      throw new Error('File operations not available in browser mode')
    },
    async writeFile() {
      throw new Error('File operations not available in browser mode')
    },
    async showMessageBox() {
      return 0
    },
    async updateCounter() {
      // No-op in browser
    },
    onCounterUpdate: () => () => {},
    onThemeUpdate: () => () => {},
  } as ElectronAPI
  // eslint-disable-next-line no-console
  console.warn('[electron-shim] window.api non disponible. Shim dev activé (navigateur).')
}

export {}


