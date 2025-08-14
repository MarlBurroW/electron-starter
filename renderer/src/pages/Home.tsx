import { 
  Users, 
  ShoppingCart, 
  DollarSign,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Données de démonstration inspirées de TweakCN
const stats = [
  {
    title: "Total Revenue",
    value: "$15,231.89",
    change: "+20.1% from last month",
    trend: "up" as const,
    icon: DollarSign,
  },
  {
    title: "Subscriptions",
    value: "+2,350",
    change: "+180.1% from last month", 
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    trend: "up" as const,
    icon: ShoppingCart,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201 since last hour",
    trend: "up" as const,
    icon: Activity,
  },
]

const recentSales = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    amount: "+$1,999.00",
  },
  {
    name: "Jackson Lee", 
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com", 
    amount: "+$299.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
]

const teamMembers = [
  {
    name: "Sofia Davis",
    email: "m@example.com",
    role: "Owner",
    avatar: "S"
  },
  {
    name: "Jackson Lee", 
    email: "p@example.com",
    role: "Developer",
    avatar: "J"
  },
  {
    name: "Isabella Nguyen",
    email: "i@example.com", 
    role: "Billing",
    avatar: "I"
  },
]

export function Home() {

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Voici un aperçu de vos métriques pour ce mois.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Jan 20, 2024 - Feb 09, 2024
          </Button>
          <Button size="sm">
            Download
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const gradientClasses = [
            'bg-linear-to-br from-primary/5 via-primary/10 to-primary/5',
            'bg-linear-to-br from-secondary/5 via-secondary/10 to-secondary/5', 
            'bg-linear-to-br from-accent/5 via-accent/10 to-accent/5',
            'bg-linear-to-br from-muted/20 via-muted/30 to-muted/20'
          ]
          
          return (
            <Card 
              key={stat.title} 
              className={`relative overflow-hidden border-0 shadow-xs hover:shadow-md transition-all duration-200 hover:scale-[1.02] ${gradientClasses[index]}`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="rounded-full p-2 bg-background/50 backdrop-blur-xs">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-background/10 to-transparent pointer-events-none opacity-50" />
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Area */}
        <Card className="col-span-4 relative overflow-hidden border-0 shadow-xs bg-linear-to-br from-card/80 via-card/50 to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Overview
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-end justify-between px-4">
              {/* Simulation d'un graphique en barres avec gradients du thème */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-linear-to-t from-primary to-primary/60 rounded-t shadow-xs" style={{height: "120px"}}></div>
                <span className="text-xs text-muted-foreground">Jan</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-linear-to-t from-primary/80 to-primary/40 rounded-t shadow-xs" style={{height: "80px"}}></div>
                <span className="text-xs text-muted-foreground">Feb</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-linear-to-t from-primary/70 to-primary/30 rounded-t shadow-xs" style={{height: "100px"}}></div>
                <span className="text-xs text-muted-foreground">Mar</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-linear-to-t from-primary/90 to-primary/50 rounded-t shadow-xs" style={{height: "140px"}}></div>
                <span className="text-xs text-muted-foreground">Apr</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-linear-to-t from-primary/60 to-primary/20 rounded-t shadow-xs" style={{height: "90px"}}></div>
                <span className="text-xs text-muted-foreground">May</span>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 bg-linear-to-t from-primary to-primary/70 rounded-t shadow-xs" style={{height: "160px"}}></div>
                <span className="text-xs text-muted-foreground">Jun</span>
              </div>
            </div>
          </CardContent>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-background/10 to-transparent pointer-events-none opacity-30" />
        </Card>

        {/* Recent Sales */}
        <Card className="col-span-3 relative overflow-hidden border-0 shadow-xs bg-linear-to-br from-secondary/10 via-secondary/20 to-secondary/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Sales
              <Badge variant="secondary" className="bg-background/50 backdrop-blur-xs">
                265 sales
              </Badge>
            </CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 backdrop-blur-xs text-sm font-medium text-primary">
                    {sale.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-primary">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-background/10 to-transparent pointer-events-none opacity-20" />
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Team Members */}
        <Card className="relative overflow-hidden border-0 shadow-xs bg-linear-to-br from-accent/10 via-accent/20 to-accent/10">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Team Members
              <Button variant="outline" size="sm" className="bg-background/50 backdrop-blur-xs hover:bg-background/70">
                Invite
              </Button>
            </CardTitle>
            <CardDescription>
              Invite your team members to collaborate.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-primary/80 text-primary-foreground text-sm font-medium shadow-xs">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-background/50 backdrop-blur-xs">
                    {member.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-background/10 to-transparent pointer-events-none opacity-20" />
        </Card>

        {/* Project Status */}
        <Card className="relative overflow-hidden border-0 shadow-xs bg-linear-to-br from-muted/30 via-muted/40 to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Project Status
              <div className="flex -space-x-1">
                <div className="h-6 w-6 rounded-full bg-primary/20 border-2 border-primary"></div>
                <div className="h-6 w-6 rounded-full bg-secondary/20 border-2 border-secondary"></div>
                <div className="h-6 w-6 rounded-full bg-accent/20 border-2 border-accent"></div>
              </div>
            </CardTitle>
            <CardDescription>
              Track your project progress and milestones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/30 backdrop-blur-xs">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-primary shadow-xs"></div>
                  <span className="text-sm font-medium">Design System</span>
                </div>
                <Badge variant="outline" className="text-primary bg-primary/10 border-primary/20">
                  Completed
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/30 backdrop-blur-xs">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-secondary shadow-xs animate-pulse"></div>
                  <span className="text-sm font-medium">Frontend Development</span>
                </div>
                <Badge variant="outline" className="text-secondary bg-secondary/10 border-secondary/20">
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/30 backdrop-blur-xs">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-accent shadow-xs"></div>
                  <span className="text-sm font-medium">API Integration</span>
                </div>
                <Badge variant="outline" className="text-accent bg-accent/10 border-accent/20">
                  Pending
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-background/30 backdrop-blur-xs">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground shadow-xs"></div>
                  <span className="text-sm font-medium">Testing & QA</span>
                </div>
                <Badge variant="outline" className="text-muted-foreground bg-muted border-muted-foreground/20">
                  Not Started
                </Badge>
              </div>
            </div>
          </CardContent>
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-background/10 to-transparent pointer-events-none opacity-20" />
        </Card>
      </div>
    </div>
  )
}