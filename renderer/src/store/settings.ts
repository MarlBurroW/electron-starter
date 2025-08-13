import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface SettingsState {
  // User preferences
  notifications: boolean
  autoSave: boolean
  language: 'en' | 'fr'
  currentThemeMode: 'light' | 'dark' | 'system' // Mode du thème actuel
  
  // User profile
  username: string
  email: string
  
  // App settings
  windowSize: {
    width: number
    height: number
  }
  sidebarCollapsed: boolean
  
  // Actions
  updateNotifications: (enabled: boolean) => void
  updateAutoSave: (enabled: boolean) => void
  updateLanguage: (language: 'en' | 'fr') => void
  updateCurrentThemeMode: (mode: 'light' | 'dark' | 'system') => void
  updateUsername: (username: string) => void
  updateEmail: (email: string) => void
  updateWindowSize: (width: number, height: number) => void
  toggleSidebar: () => void
  resetSettings: () => void
}

const defaultSettings = {
  notifications: true,
  autoSave: true,
  language: 'en' as const,
  currentThemeMode: 'system' as const,
  username: '',
  email: '',
  windowSize: {
    width: 1200,
    height: 800,
  },
  sidebarCollapsed: false,
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      immer((set) => ({
        ...defaultSettings,
        
        updateNotifications: (enabled: boolean) =>
          set((state) => {
            state.notifications = enabled
          }),
          
        updateAutoSave: (enabled: boolean) =>
          set((state) => {
            state.autoSave = enabled
          }),
          
        updateLanguage: (language: 'en' | 'fr') =>
          set((state) => {
            state.language = language
          }),
          
        updateCurrentThemeMode: (mode: 'light' | 'dark' | 'system') =>
          set((state) => {
            state.currentThemeMode = mode
          }),
          
        updateUsername: (username: string) =>
          set((state) => {
            state.username = username
          }),
          
        updateEmail: (email: string) =>
          set((state) => {
            state.email = email
          }),
          
        updateWindowSize: (width: number, height: number) =>
          set((state) => {
            state.windowSize = { width, height }
          }),
          
        toggleSidebar: () =>
          set((state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed
          }),
          
        resetSettings: () =>
          set((state) => {
            Object.assign(state, defaultSettings)
          }),
      })),
      {
        name: 'app-settings',
        version: 1,
      }
    ),
    {
      name: 'settings-store',
    }
  )
)

// Selectors
export const useNotifications = () => useSettingsStore((state) => state.notifications)
export const useAutoSave = () => useSettingsStore((state) => state.autoSave)
export const useAppLanguage = () => useSettingsStore((state) => state.language)
export const useCurrentThemeMode = () => useSettingsStore((state) => state.currentThemeMode)
export const useWindowSize = () => useSettingsStore((state) => state.windowSize)
export const useSidebarState = () => useSettingsStore((state) => state.sidebarCollapsed)