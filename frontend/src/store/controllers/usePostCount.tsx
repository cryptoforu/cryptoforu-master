import { useCallback } from 'react'

import { count } from '@/app/actions'
import { useCountStore } from '@/store/useCountStore'
import useHydrateStore from '@/store/useHydrateStore'

const useCountPost = () => {
  const setCount = useCountStore((state) => state.setCount)

  return useCallback(
    async (slug: string, id: number) => {
      const countPost = await count(slug)
      if (countPost) {
        console.log(countPost)
        setCount(countPost.views, id)
      }
    },
    [setCount]
  )
}
export default useCountPost

export const usePostCount = () => {
  const postCount = useHydrateStore(useCountStore, (state) => state.post_count)
  const hasHydrated = useCountStore((state) => state._hasHydrated)

  return useCallback(
    (id: number) => {
      let currentCount = 0
      if (hasHydrated) {
        const post = postCount?.find((post) => post.id === id)
        if (post) {
          currentCount = post.count
        }
      }
      return currentCount
    },
    [hasHydrated, postCount]
  )
}
