import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCounterStore } from '@/store/counter'

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  ...jest.requireActual('zustand/middleware'),
  persist: (fn: any) => fn,
  devtools: (fn: any) => fn,
}))

describe('Counter Store', () => {
  beforeEach(() => {
    useCounterStore.setState({ count: 0 })
  })

  it('should initialize with count 0', () => {
    const { result } = renderHook(() => useCounterStore())
    expect(result.current.count).toBe(0)
  })

  it('should increment count', () => {
    const { result } = renderHook(() => useCounterStore())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounterStore())
    
    act(() => {
      result.current.increment()
      result.current.decrement()
    })
    
    expect(result.current.count).toBe(0)
  })

  it('should increment by specific value', () => {
    const { result } = renderHook(() => useCounterStore())
    
    act(() => {
      result.current.incrementBy(5)
    })
    
    expect(result.current.count).toBe(5)
  })

  it('should reset count to 0', () => {
    const { result } = renderHook(() => useCounterStore())
    
    act(() => {
      result.current.incrementBy(10)
      result.current.reset()
    })
    
    expect(result.current.count).toBe(0)
  })
})