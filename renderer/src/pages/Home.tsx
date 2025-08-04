import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Loader2, Plus, Minus, RefreshCw, FileText } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useCounterStore } from '@/store/counter'

// Mock API function for demonstration
const fetchDemoData = async (): Promise<{ message: string; timestamp: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simulate random success/error
  if (Math.random() > 0.8) {
    throw new Error('Random API error for demonstration')
  }
  
  return {
    message: 'Hello from mock API!',
    timestamp: Date.now()
  }
}

export function Home() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  
  // Zustand store
  const { count, increment, decrement, reset } = useCounterStore()
  
  // Local state for IPC demo
  const [filePath, setFilePath] = useState('')
  const [fileContent, setFileContent] = useState('')
  const [systemInfo, setSystemInfo] = useState<any>(null)
  
  // TanStack Query example
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['demo-data'],
    queryFn: fetchDemoData,
    retry: 1,
  })

  // Mutation example
  const mutation = useMutation({
    mutationFn: fetchDemoData,
    onSuccess: (data) => {
      toast.success('Data refreshed successfully!')
      queryClient.setQueryData(['demo-data'], data)
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  // IPC handlers
  const handleGetSystemInfo = async () => {
    try {
      const info = await window.api.getSystemInfo()
      setSystemInfo(info)
      toast.success('System info loaded!')
    } catch (error) {
      toast.error(`Error getting system info: ${error}`)
    }
  }

  const handleReadFile = async () => {
    if (!filePath.trim()) {
      toast.error('Please enter a file path')
      return
    }
    
    try {
      const content = await window.api.readFile(filePath)
      setFileContent(content)
      toast.success('File read successfully!')
    } catch (error) {
      toast.error(`Error reading file: ${error}`)
    }
  }

  const handleShowDialog = async () => {
    try {
      await window.api.showMessageBox({
        type: 'info',
        title: 'Demo Dialog',
        message: 'This is a demonstration of IPC communication!'
      })
    } catch (error) {
      toast.error(`Error showing dialog: ${error}`)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('pages.home.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('pages.home.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Counter Demo - Zustand Store */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {t('pages.home.counter.title')}
            </CardTitle>
            <CardDescription>
              {t('pages.home.counter.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{count}</div>
            </div>
            <div className="flex justify-center gap-2">
              <Button onClick={decrement} variant="outline" size="sm">
                <Minus className="h-4 w-4" />
              </Button>
              <Button onClick={increment} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
              <Button onClick={reset} variant="outline" size="sm">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* TanStack Query Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              {t('pages.home.query.title')}
            </CardTitle>
            <CardDescription>
              {t('pages.home.query.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">
                Error: {error.message}
              </div>
            ) : (
              <div className="space-y-2">
                <p><strong>Message:</strong> {data?.message}</p>
                <p><strong>Timestamp:</strong> {new Date(data?.timestamp || 0).toLocaleString()}</p>
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={() => refetch()} variant="outline" size="sm" disabled={isLoading}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refetch
              </Button>
              <Button onClick={() => mutation.mutate()} size="sm" disabled={mutation.isPending}>
                {mutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-1" />
                )}
                Mutate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* IPC Demo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('pages.home.ipc.title')}
            </CardTitle>
            <CardDescription>
              {t('pages.home.ipc.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="file-path">File Path</Label>
                <Input
                  id="file-path"
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}
                  placeholder="/path/to/file.txt"
                />
                <Button onClick={handleReadFile} className="w-full" size="sm">
                  Read File
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Actions</Label>
                <div className="flex gap-2">
                  <Button onClick={handleGetSystemInfo} variant="outline" size="sm">
                    System Info
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Show Dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>IPC Dialog Demo</DialogTitle>
                        <DialogDescription>
                          This dialog demonstrates the IPC communication between renderer and main process.
                        </DialogDescription>
                      </DialogHeader>
                      <Button onClick={handleShowDialog}>
                        Show Native Dialog
                      </Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            {fileContent && (
              <div className="space-y-2">
                <Label>File Content:</Label>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-40">
                  {fileContent}
                </pre>
              </div>
            )}
            
            {systemInfo && (
              <div className="space-y-2">
                <Label>System Information:</Label>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto">
                  {JSON.stringify(systemInfo, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}