import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSettingsStore } from '@/store/settings'

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  ...jest.requireActual('zustand/middleware'),
  persist: (fn: any) => fn,
  devtools: (fn: any) => fn,
}))

describe('Settings Store', () => {
  beforeEach(() => {
    useSettingsStore.getState().resetSettings()
  })

  it('should initialize with default settings', () => {
    const { result } = renderHook(() => useSettingsStore())
    expect(result.current.notifications).toBe(true)
    expect(result.current.autoSave).toBe(true)
    expect(result.current.language).toBe('en')
    expect(result.current.theme).toBe('system')
    expect(result.current.username).toBe('')
    expect(result.current.email).toBe('')
  })

  it('should update notifications setting', () => {
    const { result } = renderHook(() => useSettingsStore())
    
    act(() => {
      result.current.updateNotifications(false)
    })
    
    expect(result.current.notifications).toBe(false)
  })

  it('should update user profile', () => {
    const { result } = renderHook(() => useSettingsStore())
    
    act(() => {
      result.current.updateUsername('testuser')
      result.current.updateEmail('test@example.com')
    })
    
    expect(result.current.username).toBe('testuser')
    expect(result.current.email).toBe('test@example.com')
  })

  it('should update theme setting', () => {
    const { result } = renderHook(() => useSettingsStore())
    
    act(() => {
      result.current.updateTheme('dark')
    })
    
    expect(result.current.theme).toBe('dark')
  })

  it('should toggle sidebar', () => {
    const { result } = renderHook(() => useSettingsStore())
    
    act(() => {
      result.current.toggleSidebar()
    })
    
    expect(result.current.sidebarCollapsed).toBe(true)
    
    act(() => {
      result.current.toggleSidebar()
    })
    
    expect(result.current.sidebarCollapsed).toBe(false)
  })

  it('should reset all settings', () => {
    const { result } = renderHook(() => useSettingsStore())
    
    act(() => {
      result.current.updateUsername('testuser')
      result.current.updateNotifications(false)
      result.current.updateTheme('dark')
      result.current.resetSettings()
    })
    
    expect(result.current.username).toBe('')
    expect(result.current.notifications).toBe(true)
    expect(result.current.theme).toBe('system')
  })
})