import { useCallback } from 'react'
import { count } from '@/app/actions'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist } from 'zustand/middleware'
import createSelectors from '@/store/createSelectors'

type PostCounter = {
  post_count: {
    id: number
    count: number
  }[]
}

type PostCounterActions = {
  setCount: (count: number, id: number) => void
}

interface PostCountStore extends PostCounter, PostCounterActions {}

export const useCountStore = create(
  persist(
    immer<PostCountStore>((set, get) => ({
      post_count: [],
      setCount: (count, id) => {
        set((state) => {
          let post = state.post_count.findIndex((el) => el.id === id)
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
    }
  )
)
export const useCountPost = createSelectors(useCountStore)
const usePostCount = () => {
  const setCount = useCountPost.use.setCount()
  const postCount = useCountPost.use.post_count()

  function filterPost(id: number) {
    return postCount.find((el) => el.id === id)
  }

  const updateCount = useCallback(
    async (slug: string, id: number) => {
      const countData = (await count(slug)) as number
      setCount(countData, id)
    },
    [setCount]
  )
  return {
    updateCount,
    filterPost,
  }
}
export default usePostCount
