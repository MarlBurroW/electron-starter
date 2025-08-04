import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
  incrementBy: (value: number) => void
  reset: () => void
}

export const useCounterStore = create<CounterState>()(
  devtools(
    persist(
      immer((set) => ({
        count: 0,
        
        increment: () =>
          set((state) => {
            state.count += 1
          }),
          
        decrement: () =>
          set((state) => {
            state.count -= 1
          }),
          
        incrementBy: (value: number) =>
          set((state) => {
            state.count += value
          }),
          
        reset: () =>
          set((state) => {
            state.count = 0
          }),
      })),
      {
        name: 'counter-storage',
        version: 1,
      }
    ),
    {
      name: 'counter-store',
    }
  )
)

// Selectors for performance optimization
export const useCount = () => useCounterStore((state) => state.count)
export const useCounterActions = () => 
  useCounterStore((state) => ({
    increment: state.increment,
    decrement: state.decrement,
    incrementBy: state.incrementBy,
    reset: state.reset,
  }))