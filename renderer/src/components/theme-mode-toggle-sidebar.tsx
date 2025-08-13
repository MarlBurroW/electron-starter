import { Sun, Moon, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-provider'

export function ThemeModeToggleSidebar() {
  const { t } = useTranslation()
  const { currentThemeMode, setThemeMode } = useTheme()

  const modes = [
    { value: 'light' as const, icon: Sun, label: t('theme.light') },
    { value: 'dark' as const, icon: Moon, label: t('theme.dark') },
    { value: 'system' as const, icon: Monitor, label: t('theme.system') }
  ]

  const currentMode = modes.find(mode => mode.value === currentThemeMode) || modes[0]
  const CurrentIcon = currentMode.icon

  const toggleTheme = () => {
    const currentIndex = modes.findIndex(mode => mode.value === currentThemeMode)
    const nextIndex = (currentIndex + 1) % modes.length
    setThemeMode(modes[nextIndex].value)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <CurrentIcon className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
