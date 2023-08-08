import { useCallback, useDeferredValue, useEffect, useTransition } from 'react'
import { CurrencyState, useListContext } from '@/store/useListStore'
import { fetchList } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/getLists'
import usePrev from '@/hooks/usePrev'
import { shallow } from 'zustand/shallow'
import { FaucetListData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

const useListController = () => {
  const { currency, page_size, page } = useListContext((state) => ({
    currency: state.currency,
    page_size: state.page_size,
    page: state.page,
  }))
  const setPage = useListContext((state) => state.setPage)
  const prev = usePrev(currency)
  const [data, updateList] = useListContext(
    (state) => [state.data, state.updateList],
    shallow
  )

  const updateData = useCallback(async () => {
    const list = await fetchList(currency, page_size, page)
    if (list) {
      updateList(list)
    }
  }, [currency, page, page_size, updateList])
  useEffect(() => {
    void updateData()
  }, [updateData])

  useEffect(() => {
    prev !== currency && setPage('1')
  }, [currency, prev, setPage])
  return useDeferredValue(data) as FaucetListData
}

export default useListController

export const useListActions = () => {
  const [isPending, startTransition] = useTransition()
  const setCurrency = useListContext((state) => state.setCurrency)
  const setSize = useListContext((state) => state.setPageSize)

  function handleCurrency(param: CurrencyState) {
    startTransition(() => {
      setCurrency(param)
    })
  }

  function handleSize(param: string) {
    startTransition(() => {
      setSize(param)
    })
  }

  return { isPending, handleCurrency, handleSize }
}
