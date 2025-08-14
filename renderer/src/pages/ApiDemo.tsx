import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  RefreshCw, 
  Users, 
  FileText, 
  CheckSquare,
  AlertCircle,
  Loader2,
  ExternalLink
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Types pour les données de l'API
interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

// Services API - Via main process pour éviter CORS et CSP
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await window.api.api.get<T>(`${API_BASE_URL}${endpoint}`)
      return response.data
    } catch (error: any) {
      throw new ApiError(
        error.message || 'API request failed',
        error.status,
        error.statusText,
        error.code
      )
    }
  },
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response = await window.api.api.post<T>(`${API_BASE_URL}${endpoint}`, data)
      return response.data
    } catch (error: any) {
      throw new ApiError(
        error.message || 'API request failed',
        error.status,
        error.statusText,
        error.code
      )
    }
  }
}

// Services spécifiques
const userService = {
  getUsers: () => apiClient.get<User[]>('/users'),
  getUser: (id: number) => apiClient.get<User>(`/users/${id}`),
}

const postService = {
  getPosts: () => apiClient.get<Post[]>('/posts'),
  getPost: (id: number) => apiClient.get<Post>(`/posts/${id}`),
  createPost: (post: Omit<Post, 'id'>) => apiClient.post<Post>('/posts', post),
}

const todoService = {
  getTodos: () => apiClient.get<Todo[]>('/todos'),
  getTodo: (id: number) => apiClient.get<Todo>(`/todos/${id}`),
}

// Composants de démonstration
function UsersSection() {
  const { t } = useTranslation()
  
  const { 
    data: users, 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('pages.apiDemo.sections.users')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            {t('pages.apiDemo.loading')}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('pages.apiDemo.sections.users')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-center text-muted-foreground">
              {t('pages.apiDemo.error')}: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('pages.apiDemo.retry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {t('pages.apiDemo.sections.users')}
          </div>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            size="sm"
            disabled={isRefetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? 'animate-spin' : ''}`} />
            {t('pages.apiDemo.refreshData')}
          </Button>
        </CardTitle>
        <CardDescription>
          {users?.length || 0} {t('pages.apiDemo.messages.usersLoaded')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {users?.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{user.company.name}</p>
                <p className="text-xs text-muted-foreground">{user.address.city}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PostsSection() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  
  const { 
    data: posts, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
    select: (data) => data.slice(0, 8), // Limiter à 8 posts
  })

  const createPostMutation = useMutation({
    mutationFn: postService.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleCreatePost = () => {
    createPostMutation.mutate({
      userId: 1,
      title: 'Nouveau post créé depuis l\'app Electron',
      body: 'Ceci est un exemple de création de post via l\'API JSONPlaceholder.',
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('pages.apiDemo.sections.posts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            {t('pages.apiDemo.loading')}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('pages.apiDemo.sections.posts')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-center text-muted-foreground">
              {t('pages.apiDemo.error')}: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('pages.apiDemo.retry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('pages.apiDemo.sections.posts')}
          </div>
          <Button 
            onClick={handleCreatePost}
            disabled={createPostMutation.isPending}
            size="sm"
          >
            {createPostMutation.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileText className="h-4 w-4 mr-2" />
            )}
            {t('pages.apiDemo.messages.createPost')}
          </Button>
        </CardTitle>
        <CardDescription>
          {posts?.length || 0} {t('pages.apiDemo.messages.recentPosts')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {posts?.map((post) => (
            <div key={post.id} className="p-3 border rounded-lg">
              <h4 className="font-medium line-clamp-1">{post.title}</h4>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.body}</p>
              <div className="flex justify-between items-center mt-2">
                <Badge variant="secondary">User {post.userId}</Badge>
                <span className="text-xs text-muted-foreground">ID: {post.id}</span>
              </div>
            </div>
          ))}
        </div>
        {createPostMutation.isSuccess && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              ✅ {t('pages.apiDemo.messages.postCreated')} (ID: {createPostMutation.data?.id})
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function TodosSection() {
  const { t } = useTranslation()
  
  const { 
    data: todos, 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getTodos,
    select: (data) => data.slice(0, 10), // Limiter à 10 todos
  })

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            {t('pages.apiDemo.sections.todos')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            {t('pages.apiDemo.loading')}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            {t('pages.apiDemo.sections.todos')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-center text-muted-foreground">
              {t('pages.apiDemo.error')}: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('pages.apiDemo.retry')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const completedTodos = todos?.filter(todo => todo.completed).length || 0
  const totalTodos = todos?.length || 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          {t('pages.apiDemo.sections.todos')}
        </CardTitle>
        <CardDescription>
          {completedTodos}/{totalTodos} {t('pages.apiDemo.messages.tasksCompleted')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {todos?.map((todo) => (
            <div key={todo.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                todo.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-muted-foreground'
              }`}>
                {todo.completed && (
                  <CheckSquare className="h-3 w-3 text-white" />
                )}
              </div>
              <span className={`text-sm flex-1 ${
                todo.completed ? 'line-through text-muted-foreground' : ''
              }`}>
                {todo.title}
              </span>
              <Badge variant="outline" className="text-xs">
                User {todo.userId}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ApiDemo() {
  const { t } = useTranslation()

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t('pages.apiDemo.title')}</h1>
        <p className="text-muted-foreground">
          {t('pages.apiDemo.description')}
        </p>
        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <p className="text-sm">
            <strong>{t('pages.apiDemo.messages.apiUsed')}</strong>{' '}
            <a 
              href="https://jsonplaceholder.typicode.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              JSONPlaceholder
            </a>{' '}
            - {t('pages.apiDemo.messages.freeApiDescription')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <UsersSection />
        <PostsSection />
        <TodosSection />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>🏗️ {t('pages.apiDemo.architecture.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">✅ {t('pages.apiDemo.architecture.implemented')}</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• {t('pages.apiDemo.architecture.features.tanstackQuery')}</li>
                <li>• {t('pages.apiDemo.architecture.features.errorHandling')}</li>
                <li>• {t('pages.apiDemo.architecture.features.loadingStates')}</li>
                <li>• {t('pages.apiDemo.architecture.features.cacheInvalidation')}</li>
                <li>• {t('pages.apiDemo.architecture.features.optimisticMutations')}</li>
                <li>• {t('pages.apiDemo.architecture.features.centralizedClient')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎯 {t('pages.apiDemo.architecture.recommendations')}</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• {t('pages.apiDemo.architecture.features.mainProcessCalls')}</li>
                <li>• {t('pages.apiDemo.architecture.features.rendererProcess')}</li>
                <li>• {t('pages.apiDemo.architecture.features.dataValidation')}</li>
                <li>• {t('pages.apiDemo.architecture.features.rateLimiting')}</li>
                <li>• {t('pages.apiDemo.architecture.features.errorLogging')}</li>
                <li>• {t('pages.apiDemo.architecture.features.unitTesting')}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
