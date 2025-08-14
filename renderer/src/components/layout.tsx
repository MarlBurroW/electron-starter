import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Home, 
  Settings, 
  Info, 
  BarChart3,
  Users,
  Calendar,
  FileText,
  Zap,
  Palette,
  FileCheck
} from 'lucide-react'

import { ThemeModeToggleSidebar } from '@/components/theme-mode-toggle-sidebar'
import { LanguageToggle } from '@/components/language-toggle'
import { Badge } from '@/components/ui/badge'
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
      name: t('nav.dashboard'),
      href: '/',
      icon: Home,
      badge: null,
    },
    {
      name: t('nav.designSystem'),
      href: '/design-system',
      icon: Palette,
      badge: 'New',
    },
    {
      name: t('nav.formDemo'),
      href: '/form-demo',
      icon: FileCheck,
      badge: 'Cool',
    },
    {
      name: t('nav.apiDemo'),
      href: '/api-demo',
      icon: Zap,
      badge: 'Demo',
    },
 
  ]

  const bottomNavigation = [
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
      {/* Barre de titre moderne intégrée */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-background/95 backdrop-blur-xs border-b border-border/50 drag-region z-50 flex items-center justify-between px-4 select-none">
        <div className="flex items-center space-x-2 ml-16 pointer-events-none">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Zap className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-foreground/80">Electron Starter</span>
        </div>
        <div className="flex items-center space-x-2 no-drag">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors cursor-pointer"
            onClick={() => {
              if (window.api?.openExternal) {
                window.api.openExternal('https://tweakcn.com/editor/theme')
              } else {
                window.open('https://tweakcn.com/editor/theme', '_blank')
              }
            }}
            title="Personnaliser ce thème avec TweakCN"
          >
            <Palette className="mr-1 h-3 w-3" />
            cosmic-night
          </Button>
        </div>
      </div>

      {/* Content avec padding pour la barre de titre */}
      <div className="flex w-full pt-10">
        {/* Sidebar */}
        <div className="flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 no-drag">
            <div className="mb-4 px-3">
              <h2 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
                Navigation
              </h2>
            </div>
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link key={item.name} to={item.href}>
                <div
                  className={cn(
                    'flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </div>
                  {item.badge && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            )
          })}
          </nav>

          {/* Bottom Navigation */}
          <div className="px-3 py-4 border-t border-sidebar-border space-y-1 no-drag">
          {bottomNavigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href
            
            return (
              <Link key={item.name} to={item.href}>
                <div
                  className={cn(
                    'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive 
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <Icon className="mr-3 h-4 w-4" />
                  {item.name}
                </div>
              </Link>
            )
          })}
          
          {/* Theme and Language Controls */}
          <div className="mt-4 pt-4 border-t border-sidebar-border space-y-3">
            <div className="flex items-center justify-between px-3">
              <span className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                Preferences
              </span>
            </div>
            <div className="px-3 space-y-2">
                                        <div className="flex items-center justify-between">
                            <span className="text-sm text-sidebar-foreground">Theme</span>
                            <ThemeModeToggleSidebar />
                          </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-sidebar-foreground">Language</span>
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}