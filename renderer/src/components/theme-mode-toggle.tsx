import { Sun, Moon, Monitor } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/lib/theme-provider'

export function ThemeModeToggle() {
  const { t } = useTranslation()
  const { currentThemeMode, setThemeMode } = useTheme()

  const modes = [
    { value: 'light' as const, icon: Sun, label: t('theme.light') },
    { value: 'dark' as const, icon: Moon, label: t('theme.dark') },
    { value: 'system' as const, icon: Monitor, label: t('theme.system') }
  ]

  return (
    <div className="grid grid-cols-3 gap-2">
      {modes.map(({ value, icon: Icon, label }) => (
        <Button
          key={value}
          variant={currentThemeMode === value ? 'default' : 'outline'}
          size="sm"
          onClick={() => setThemeMode(value)}
          className="flex items-center gap-2"
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  )
}
