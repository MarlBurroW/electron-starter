import { useEffect } from 'react'

// Types pour les logs API
export interface ApiLogEntry {
  type: 'request' | 'response' | 'error'
  data: any
  timestamp: string
}

// Hook pour écouter et afficher les logs API dans la console
export function useApiLogger() {
  useEffect(() => {
    if (!window.api?.onApiLog) {
      console.warn('API logging not available - running in web mode?')
      return
    }

    const cleanup = window.api.onApiLog((log: ApiLogEntry) => {
      const time = new Date(log.timestamp).toLocaleTimeString()
      
      switch (log.type) {
        case 'request':
          console.group(`🚀 API Request [${time}]`)
          console.log(`${log.data.method} ${log.data.url}`)
          if (log.data.body) {
            console.log('Body:', JSON.parse(log.data.body))
          }
          console.log('Headers:', log.data.headers)
          console.groupEnd()
          break
          
        case 'response':
          console.group(`✅ API Response [${time}]`)
          console.log(`${log.data.method} ${log.data.url}`)
          console.log(`Status: ${log.data.status} ${log.data.statusText}`)
          console.log(`Data size: ${log.data.dataSize} bytes`)
          console.log('Headers:', log.data.headers)
          console.groupEnd()
          break
          
        case 'error':
          console.group(`❌ API Error [${time}]`)
          console.error(`${log.data.method} ${log.data.url}`)
          if (log.data.status) {
            console.error(`Status: ${log.data.status} ${log.data.statusText}`)
          }
          console.error('Error:', log.data.error)
          if (log.data.data) {
            console.error('Response data:', log.data.data)
          }
          console.groupEnd()
          break
      }
    })

    return cleanup
  }, [])
}

// Version standalone pour initialiser le logging sans React
export function initApiLogger() {
  if (!window.api?.onApiLog) {
    console.warn('API logging not available - running in web mode?')
    return
  }

  return window.api.onApiLog((log: ApiLogEntry) => {
    const time = new Date(log.timestamp).toLocaleTimeString()
    
    switch (log.type) {
      case 'request':
        console.group(`🚀 API Request [${time}]`)
        console.log(`${log.data.method} ${log.data.url}`)
        if (log.data.body) {
          console.log('Body:', JSON.parse(log.data.body))
        }
        console.log('Headers:', log.data.headers)
        console.groupEnd()
        break
        
      case 'response':
        console.group(`✅ API Response [${time}]`)
        console.log(`${log.data.method} ${log.data.url}`)
        console.log(`Status: ${log.data.status} ${log.data.statusText}`)
        console.log(`Data size: ${log.data.dataSize} bytes`)
        console.log('Headers:', log.data.headers)
        console.groupEnd()
        break
        
      case 'error':
        console.group(`❌ API Error [${time}]`)
        console.error(`${log.data.method} ${log.data.url}`)
        if (log.data.status) {
          console.error(`Status: ${log.data.status} ${log.data.statusText}`)
        }
        console.error('Error:', log.data.error)
        if (log.data.data) {
          console.error('Response data:', log.data.data)
        }
        console.groupEnd()
        break
    }
  })
}
