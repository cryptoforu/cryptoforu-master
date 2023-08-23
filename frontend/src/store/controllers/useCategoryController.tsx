import { useParams } from 'next/navigation'
import { useCallback } from 'react'
import { shallow } from 'zustand/shallow'

import { fetchCategory } from '@/requests/fetchCategory'
import { useCategoryContext } from '@/store/useCategoryStore'

export function useUpdateCategory() {
  const params = useParams() as { category: string }
  const [setPageUp, setPageDown] = useCategoryContext((state) => [
    state.setPageUp,
    state.setPageDown,
  ])
  const [updateCategory, pageSize] = useCategoryContext(
    (state) => [state.updateCategory, state.pageSize],
    shallow
  )
  return useCallback(
    async (direction: 'up' | 'down') => {
      direction === 'up' ? setPageUp(6) : setPageDown(6)
      const newSize = direction === 'up' ? pageSize + 6 : pageSize - 6
      const data = await fetchCategory(params.category, newSize.toString())
      if (data) {
        updateCategory(data)
      }
    },
    [pageSize, params.category, setPageDown, setPageUp, updateCategory]
  )
}
