import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type PostCounter = {
  post_count: {
    id: number
    count: number
  }[]
}

type PostCounterActions = {
  setCount: (count: number, id: number) => void
}

interface PostCountStore extends PostCounter, PostCounterActions {
  _hasHydrated: boolean
  setHydrated: (state: boolean) => void
}

export const useCountStore = create(
  persist(
    immer<PostCountStore>((set, get) => ({
      post_count: [],
      _hasHydrated: false,
      setHydrated: (state) => set({ _hasHydrated: state }),
      setCount: (count, id) => {
        set((state) => {
          const post = state.post_count.findIndex((el) => el.id === id)
          if (post === -1) {
            state.post_count.push({
              id: id,
              count: count,
            })
          } else {
            state.post_count[post].count = count
          }
        })
      },
    })),
    {
      name: 'post-count-storage',
      partialize: (state) => ({ post_count: state.post_count }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)
