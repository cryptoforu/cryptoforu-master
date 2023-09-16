import { useCallback } from 'react'

import { useList, useListDispatch } from '@/store/useFaucetListProvider'

export function useGlobalFilter() {
  const dispatch = useListDispatch()
  const { globalFilter } = useList()
  const setGlobalFilter = useCallback(
    (filter: string) => {
      dispatch({
        type: 'SET_FILTER',
        payload: {
          globalFilter: filter,
        },
      })
    },
    [dispatch]
  )
  return [globalFilter, setGlobalFilter] as const
}
