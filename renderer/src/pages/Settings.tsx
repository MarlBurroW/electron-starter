import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSettingsStore } from '@/store/settings'
import { useTheme } from '@/lib/theme-provider'

export function Settings() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()
  
  const { 
    notifications, 
    autoSave, 
    username, 
    email,
    updateNotifications,
    updateAutoSave,
    updateUsername,
    updateEmail,
    resetSettings
  } = useSettingsStore()

  const handleSaveSettings = () => {
    toast.success(t('pages.settings.saved'))
  }

  const handleResetSettings = () => {
    resetSettings()
    toast.success(t('pages.settings.reset'))
  }

  const handleExportSettings = async () => {
    try {
      const settings = useSettingsStore.getState()
      const settingsJson = JSON.stringify(settings, null, 2)
      
      // You could use IPC to save to file
      await window.api.writeFile('user-settings.json', settingsJson)
      toast.success('Settings exported successfully!')
    } catch (error) {
      toast.error(`Export failed: ${error}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.settings.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('pages.settings.description')}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t('pages.settings.tabs.general')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('pages.settings.tabs.appearance')}</TabsTrigger>
          <TabsTrigger value="advanced">{t('pages.settings.tabs.advanced')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.settings.general.profile')}</CardTitle>
              <CardDescription>
                {t('pages.settings.general.profileDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t('pages.settings.general.username')}</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => updateUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('pages.settings.general.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('pages.settings.general.preferences')}</CardTitle>
              <CardDescription>
                {t('pages.settings.general.preferencesDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('pages.settings.general.notifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('pages.settings.general.notificationsDescription')}
                  </p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={updateNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t('pages.settings.general.autoSave')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('pages.settings.general.autoSaveDescription')}
                  </p>
                </div>
                <Switch
                  checked={autoSave}
                  onCheckedChange={updateAutoSave}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.settings.appearance.theme')}</CardTitle>
              <CardDescription>
                {t('pages.settings.appearance.themeDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setTheme('light')}
                  >
                    {t('theme.light')}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setTheme('dark')}
                  >
                    {t('theme.dark')}
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    className="w-full"
                    onClick={() => setTheme('system')}
                  >
                    {t('theme.system')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.settings.advanced.title')}</CardTitle>
              <CardDescription>
                {t('pages.settings.advanced.description')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button onClick={handleExportSettings} variant="outline">
                  {t('pages.settings.advanced.export')}
                </Button>
                <Button onClick={handleResetSettings} variant="destructive">
                  {t('pages.settings.advanced.reset')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          {t('pages.settings.save')}
        </Button>
      </div>
    </div>
  )
}