import { BrowserWindow, session } from 'electron'

/**
 * Security utilities for Electron application
 */

export function setupSecurityHeaders(): void {
  // Set up Content Security Policy
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' data: blob:; " +
          "script-src 'self' 'unsafe-eval' 'unsafe-inline'; " +
          "style-src 'self' 'unsafe-inline'; " +
          "img-src 'self' data: blob: https:; " +
          "font-src 'self' data:; " +
          "connect-src 'self' https:; " +
          "media-src 'self' data: blob:;"
        ]
      }
    })
  })
}

export function setupSecureDefaults(window: BrowserWindow): void {
  // Prevent navigation to external URLs
  window.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://') && !url.startsWith('http://localhost')) {
      event.preventDefault()
    }
  })

  // Prevent new window creation
  window.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })

  // Remove menu in production
  if (process.env.NODE_ENV === 'production') {
    window.setMenuBarVisibility(false)
  }
}

export const ALLOWED_EXTERNAL_DOMAINS = [
  'github.com',
  'electron.build',
  'vitejs.dev',
  'react.dev',
  'tailwindcss.com'
]

export function isUrlAllowed(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.protocol === 'https:' && 
           ALLOWED_EXTERNAL_DOMAINS.includes(urlObj.hostname)
  } catch {
    return false
  }
}