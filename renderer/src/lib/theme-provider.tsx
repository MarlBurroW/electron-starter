import { createContext, useContext, useEffect } from "react"
import { useSettingsStore } from "@/store/settings"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  currentThemeMode: 'light' | 'dark' | 'system'
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const { currentThemeMode, updateCurrentThemeMode } = useSettingsStore()

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    const actualTheme = currentThemeMode === "system" 
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : currentThemeMode

    root.classList.add(actualTheme)
  }, [currentThemeMode])

  // Écouter les changements du système
  useEffect(() => {
    if (currentThemeMode !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      
      const actualTheme = mediaQuery.matches ? "dark" : "light"
      root.classList.add(actualTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [currentThemeMode])

  const value = {
    currentThemeMode,
    setThemeMode: updateCurrentThemeMode,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}