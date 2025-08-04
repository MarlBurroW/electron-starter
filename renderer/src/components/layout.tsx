import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Settings, Info } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from '@/components/language-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const { t } = useTranslation()

  const navigation = [
    {
      name: t('nav.home'),
      href: '/',
      icon: Home,
    },
    {
      name: t('nav.settings'),
      href: '/settings',
      icon: Settings,
    },
    {
      name: t('nav.about'),
      href: '/about',
      icon: Info,
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="flex flex-col w-64 bg-card border-r">
        <div className="flex items-center justify-center h-16 border-b">
          <h1 className="text-xl font-bold">{t('app.title')}</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('nav.theme')}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t('nav.language')}</span>
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}