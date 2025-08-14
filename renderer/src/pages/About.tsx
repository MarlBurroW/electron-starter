import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink, Info, Cpu, HardDrive, Monitor } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { SystemInfo } from '@/types/global'

export function About() {
  const { t } = useTranslation()
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const loadSystemInfo = async () => {
    setLoading(true)
    try {
      const info = await window.api.getSystemInfo()
      setSystemInfo(info)
    } catch (error) {
      toast.error(`Error loading system info: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSystemInfo()
  }, [])

  const handleOpenExternal = async (url: string) => {
    try {
      await window.api.openExternal(url)
    } catch (error) {
      toast.error(`Cannot open URL: ${error}`)
    }
  }

  const formatBytes = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Bytes'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.about.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('pages.about.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              {t('pages.about.app.title')}
            </CardTitle>
            <CardDescription>
              {t('pages.about.app.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">App Version:</span>
                <span>{systemInfo?.appVersion || 'Loading...'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Electron Version:</span>
                <span>{systemInfo?.electronVersion || 'Loading...'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Node Version:</span>
                <span>{systemInfo?.nodeVersion || 'Loading...'}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t space-y-2">
              <h4 className="font-medium">Tech Stack:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>• React 18</span>
                <span>• TypeScript</span>
                <span>• Electron</span>
                <span>• Vite</span>
                <span>• TailwindCSS</span>
                <span>• ShadCN UI</span>
                <span>• Zustand</span>
                <span>• TanStack Query</span>
                <span>• React Router</span>
                <span>• i18next</span>
                <span>• Zod</span>
                <span>• Vitest</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              {t('pages.about.system.title')}
            </CardTitle>
            <CardDescription>
              {t('pages.about.system.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-4">Loading system info...</div>
            ) : systemInfo ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span className="font-medium">Platform:</span>
                  <span>{systemInfo.platform} ({systemInfo.arch})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">OS Version:</span>
                  <span>{systemInfo.osVersion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span className="font-medium">Total Memory:</span>
                  <span>{formatBytes(systemInfo.totalMemory)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span className="font-medium">Free Memory:</span>
                  <span>{formatBytes(systemInfo.freeMemory)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span className="font-medium">Uptime:</span>
                  <span>{formatUptime(systemInfo.uptime)}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Button onClick={loadSystemInfo} variant="outline">
                  Reload System Info
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('pages.about.links.title')}</CardTitle>
            <CardDescription>
              {t('pages.about.links.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => handleOpenExternal('https://github.com/electron/electron')}
              >
                <ExternalLink className="h-5 w-5" />
                <span>Electron</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => handleOpenExternal('https://react.dev')}
              >
                <ExternalLink className="h-5 w-5" />
                <span>React</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => handleOpenExternal('https://vitejs.dev')}
              >
                <ExternalLink className="h-5 w-5" />
                <span>Vite</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => handleOpenExternal('https://tailwindcss.com')}
              >
                <ExternalLink className="h-5 w-5" />
                <span>Tailwind</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}