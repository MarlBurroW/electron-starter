import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Calendar,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  CreditCard,
  Heart,
  Mail,
  MessageSquare,
  Palette,
  Plus,
  Settings,
  Star,
  User,
  X
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

export default function DesignSystem() {
  const { t } = useTranslation()
  const [switchValue, setSwitchValue] = useState(false)

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('pages.designSystem.title')}</h1>
        <p className="text-muted-foreground">
          {t('pages.designSystem.description')}
        </p>
        <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <Palette className="h-4 w-4 text-primary" />
          <p className="text-sm">
            <strong>{t('pages.designSystem.themeCustomizationTip')}</strong>{' '}
            <a 
              href="https://tweakcn.com/editor/theme" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              TweakCN
            </a>
          </p>
        </div>
      </div>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('pages.designSystem.sections.buttons')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('pages.designSystem.sections.buttonVariants')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="default">{t('pages.designSystem.buttons.default')}</Button>
                <Button variant="destructive">{t('pages.designSystem.buttons.destructive')}</Button>
                <Button variant="outline">{t('pages.designSystem.buttons.outline')}</Button>
                <Button variant="secondary">{t('pages.designSystem.buttons.secondary')}</Button>
                <Button variant="ghost">{t('pages.designSystem.buttons.ghost')}</Button>
                <Button variant="link">{t('pages.designSystem.buttons.link')}</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Button Sizes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Button States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  With Icon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Form Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Form Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Disabled Input</Label>
                <Input id="disabled" placeholder="Disabled input" disabled />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Textarea & Select</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." />
              </div>
              <div className="space-y-2">
                <Label>Select Option</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>
                A basic card with header and content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the card content area.</p>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-primary/5 via-primary/10 to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Gradient Card
              </CardTitle>
              <CardDescription>
                A card with gradient background.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has a subtle gradient background based on the theme colors.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>
                This card includes footer actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Badge Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge className="bg-linear-to-r from-primary to-primary/80">
                Gradient
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interactive Elements */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Interactive Elements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Switch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="disabled-switch" disabled />
                <Label htmlFor="disabled-switch">Disabled Switch</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Icon Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <User className="h-6 w-6" />
                  <span className="text-xs">User</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Mail className="h-6 w-6" />
                  <span className="text-xs">Mail</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  <span className="text-xs">Calendar</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Settings className="h-6 w-6" />
                  <span className="text-xs">Settings</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Star className="h-6 w-6" />
                  <span className="text-xs">Star</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <span className="text-xs">Heart</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Theme Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-12 w-full bg-primary rounded border flex items-center justify-center text-primary-foreground text-sm font-medium">
                    Primary
                  </div>
                  <div className="h-12 w-full bg-secondary rounded border flex items-center justify-center text-secondary-foreground text-sm font-medium">
                    Secondary
                  </div>
                  <div className="h-12 w-full bg-accent rounded border flex items-center justify-center text-accent-foreground text-sm font-medium">
                    Accent
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-12 w-full bg-muted rounded border flex items-center justify-center text-muted-foreground text-sm font-medium">
                    Muted
                  </div>
                  <div className="h-12 w-full bg-destructive rounded border flex items-center justify-center text-destructive-foreground text-sm font-medium">
                    Destructive
                  </div>
                  <div className="h-12 w-full bg-card rounded border border-border flex items-center justify-center text-card-foreground text-sm font-medium">
                    Card
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gradients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-12 w-full bg-linear-to-r from-primary to-primary/50 rounded border flex items-center justify-center text-primary-foreground text-sm font-medium">
                  Primary Gradient
                </div>
                <div className="h-12 w-full bg-linear-to-br from-primary/10 via-primary/20 to-primary/10 rounded border flex items-center justify-center text-foreground text-sm font-medium">
                  Subtle Gradient
                </div>
                <div className="h-12 w-full bg-linear-to-r from-secondary via-accent to-primary rounded border flex items-center justify-center text-primary-foreground text-sm font-medium">
                  Multi-color
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Typography</h2>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Text Styles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-3xl font-semibold">Heading 2</h2>
              <h3 className="text-2xl font-semibold">Heading 3</h3>
              <h4 className="text-xl font-semibold">Heading 4</h4>
              <p className="text-base">Regular paragraph text with normal weight.</p>
              <p className="text-sm text-muted-foreground">Small muted text for descriptions.</p>
              <p className="text-lg font-medium">Large medium text for emphasis.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
