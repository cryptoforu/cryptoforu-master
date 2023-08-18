import { useParams } from 'next/navigation'
import { useCallback, useDeferredValue, useEffect, useTransition } from 'react'

import { loadMore } from '@/app/actions'
import { useFirstRender } from '@/hooks/useFirstRender'
import { useCategoryContext } from '@/store/useCategoryStore'

export default function useCategoryController() {
  const [isPending, startTransition] = useTransition()
  const params = useParams() as { category: string }
  const isFirstRender = useFirstRender()
  const updateCategory = useCategoryContext((state) => state.updateCategory)
  const [pageSize, setPageUp, setPageDown] = useCategoryContext((state) => [
    state.pageSize,
    state.setPageUp,
    state.setPageDown,
  ])
  const currentSize = useDeferredValue(pageSize)
  const isStale = currentSize !== pageSize
  const updatePosts = useCallback(async () => {
    const optimisticData = await loadMore({ slug: params.category, pageSize })
    updateCategory(optimisticData.posts)
  }, [pageSize, params.category, updateCategory])

  useEffect(() => {
    if (isFirstRender) return
    if (!isStale) void updatePosts()
  }, [pageSize, isStale, isFirstRender, updatePosts])

  function onChangeUp() {
    startTransition(() => {
      setPageUp(6)
    })
  }

  function onChangeDown() {
    startTransition(() => {
      setPageDown(6)
    })
  }

  return {
    isPending,
    onChangeDown,
    onChangeUp,
  }
}
