/**
 * Client IPC pour la communication avec le processus principal
 * Wrapper typé autour de l'API exposée par le preload script
 */

import type { SystemInfo } from '@/lib/schemas'

class IPCClient {
  private checkApi() {
    if (!window.api) {
      throw new Error('Electron API not available. Are you running in Electron?')
    }
  }

  // Opérations sur les fichiers
  async readFile(path: string): Promise<string> {
    this.checkApi()
    return window.api.readFile(path)
  }

  async writeFile(path: string, content: string): Promise<void> {
    this.checkApi()
    return window.api.writeFile(path, content)
  }

  // Informations système
  async getSystemInfo(): Promise<SystemInfo> {
    this.checkApi()
    return window.api.getSystemInfo()
  }

  // Dialogues et notifications
  async showMessageBox(options: {
    type: 'info' | 'warning' | 'error'
    title: string
    message: string
  }): Promise<number> {
    this.checkApi()
    return window.api.showMessageBox(options)
  }

  // Liens externes
  async openExternal(url: string): Promise<void> {
    this.checkApi()
    return window.api.openExternal(url)
  }

  // Compteur (exemple)
  async updateCounter(value: number): Promise<void> {
    this.checkApi()
    return window.api.updateCounter(value)
  }

  // Event listeners
  onCounterUpdate(callback: (value: number) => void): () => void {
    this.checkApi()
    return window.api.onCounterUpdate(callback)
  }

  onThemeUpdate(callback: (theme: 'light' | 'dark') => void): () => void {
    this.checkApi()
    return window.api.onThemeUpdate(callback)
  }

  // Vérification de disponibilité
  isAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.api
  }
}

// Export d'une instance singleton
export const ipcClient = new IPCClient()

// Export de la classe pour les tests
export { IPCClient }