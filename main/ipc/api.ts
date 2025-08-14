import { ipcMain } from 'electron'
import log from 'electron-log'

// Types pour les requêtes API
interface ApiRequest {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  timeout?: number
}

interface ApiResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

interface ApiError {
  message: string
  status?: number
  statusText?: string
  code?: string
}

// Configuration par défaut
const DEFAULT_TIMEOUT = 10000 // 10 secondes
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'User-Agent': 'ElectronApp/1.0.0',
}

// Domaines autorisés pour la sécurité
const ALLOWED_DOMAINS = [
  'jsonplaceholder.typicode.com',
  'api.github.com',
  'httpbin.org',
  // Ajoutez d'autres domaines de confiance ici
]

// Fonction utilitaire pour valider les URLs
function isUrlAllowed(url: string): boolean {
  try {
    const urlObj = new URL(url)
    
    // Vérifier le protocole
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false
    }
    
    // Vérifier le domaine
    return ALLOWED_DOMAINS.some(domain => 
      urlObj.hostname === domain || urlObj.hostname.endsWith('.' + domain)
    )
  } catch {
    return false
  }
}

// Service API principal
class ApiService {
  private async makeRequest<T>(request: ApiRequest): Promise<ApiResponse<T>> {
    const { url, method, headers = {}, body, timeout = DEFAULT_TIMEOUT } = request
    
    // Validation de sécurité
    if (!isUrlAllowed(url)) {
      throw new Error(`Domain not allowed: ${new URL(url).hostname}`)
    }
    
    log.info(`API Request: ${method} ${url}`)
    
    try {
      // Utiliser fetch avec AbortController pour le timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)
      
      const response = await fetch(url, {
        method,
        headers: { ...DEFAULT_HEADERS, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      // Extraire les headers de réponse
      const responseHeaders: Record<string, string> = {}
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })
      
      // Essayer de parser le JSON, sinon retourner le texte
      let data: T
      const contentType = response.headers.get('content-type') || ''
      
      if (contentType.includes('application/json')) {
        data = await response.json()
      } else {
        data = (await response.text()) as unknown as T
      }
      
      const apiResponse: ApiResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
      }
      
      if (!response.ok) {
        log.error(`API Error: ${response.status} ${response.statusText}`, { url, data })
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          statusText: response.statusText,
          code: 'HTTP_ERROR',
        } as ApiError
      }
      
      log.info(`API Success: ${method} ${url} - ${response.status}`)
      return apiResponse
      
    } catch (error: any) {
      log.error(`API Request failed: ${method} ${url}`, error)
      
      // Gestion spécifique des erreurs
      if (error.name === 'AbortError') {
        throw {
          message: 'Request timeout',
          code: 'TIMEOUT',
        } as ApiError
      }
      
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw {
          message: 'Network error - please check your internet connection',
          code: 'NETWORK_ERROR',
        } as ApiError
      }
      
      // Si c'est déjà une ApiError, la propager
      if (error.status && error.message) {
        throw error
      }
      
      // Erreur générique
      throw {
        message: error.message || 'Unknown error occurred',
        code: 'UNKNOWN_ERROR',
      } as ApiError
    }
  }
  
  async get<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ url, method: 'GET', headers })
  }
  
  async post<T>(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ url, method: 'POST', body, headers })
  }
  
  async put<T>(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ url, method: 'PUT', body, headers })
  }
  
  async patch<T>(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ url, method: 'PATCH', body, headers })
  }
  
  async delete<T>(url: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.makeRequest<T>({ url, method: 'DELETE', headers })
  }
}

// Instance singleton
const apiService = new ApiService()

// Handlers IPC
ipcMain.handle('api/request', async (_, request: ApiRequest) => {
  try {
    return await apiService.makeRequest(request)
  } catch (error) {
    // Les erreurs sont déjà loggées dans makeRequest
    throw error
  }
})

// Méthodes de convenance
ipcMain.handle('api/get', async (_, url: string, headers?: Record<string, string>) => {
  try {
    return await apiService.get(url, headers)
  } catch (error) {
    throw error
  }
})

ipcMain.handle('api/post', async (_, url: string, body?: any, headers?: Record<string, string>) => {
  try {
    return await apiService.post(url, body, headers)
  } catch (error) {
    throw error
  }
})

ipcMain.handle('api/put', async (_, url: string, body?: any, headers?: Record<string, string>) => {
  try {
    return await apiService.put(url, body, headers)
  } catch (error) {
    throw error
  }
})

ipcMain.handle('api/patch', async (_, url: string, body?: any, headers?: Record<string, string>) => {
  try {
    return await apiService.patch(url, body, headers)
  } catch (error) {
    throw error
  }
})

ipcMain.handle('api/delete', async (_, url: string, headers?: Record<string, string>) => {
  try {
    return await apiService.delete(url, headers)
  } catch (error) {
    throw error
  }
})

export { ApiService, ApiRequest, ApiResponse, ApiError }
