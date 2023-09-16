'use client'
import { listDatum } from 'contentlayer/generated'
import { useCallback, useTransition } from 'react'

import { getList } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/api/listFactory'
import { FaucetsListData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import { Button } from '@/components/elements'
import LazyImage from '@/components/elements/LazyImage'
import type { CurrencyState } from '@/store/types/faucet-list-store'
import { useList, useListDispatch } from '@/store/useFaucetListProvider'

const ListTabs = () => {
  const {
    data: { list, symbol },
  } = useList()
  const dispatch = useListDispatch()
  const [isPending, startTransition] = useTransition()

  const updateList = useCallback(
    async (currency) => {
      const data = (await getList(
        currency,
        `page[size]=${list.meta.per_page}&page[number]=${list.meta.current_page}`
      )) as FaucetsListData
      if (data) {
        startTransition(() => {
          dispatch({
            type: 'SET_DATA',
            payload: {
              data,
            },
          })
        })
      }
    },
    [dispatch, list.meta.current_page, list.meta.per_page]
  )
  const { tabs } = listDatum
  return tabs.map((tab) => (
    <Button
      layoutId={'selectedTab'}
      style={{
        borderBottom:
          tab.id === symbol ? '2.5px solid teal' : '2.5px solid transparent',
      }}
      colorScheme={'secondary'}
      className={'relative overflow-hidden rounded-full'}
      size={'lg'}
      key={tab.label}
      onPress={() => updateList(tab.id as CurrencyState)}
      isDisabled={isPending}
    >
      <LazyImage
        src={tab.image}
        alt={tab.label}
        width={128}
        height={128}
        className={'relative z-10 mr-1 h-5 w-5'}
      />
      <span className={'relative z-10'}>{tab.label}</span>
    </Button>
  ))
}
export default ListTabs
