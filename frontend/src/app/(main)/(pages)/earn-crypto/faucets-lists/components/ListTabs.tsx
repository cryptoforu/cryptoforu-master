'use client'
import { listDatum } from 'contentlayer/generated'

import { Button } from '@/components/elements'
import LazyImage from '@/components/elements/LazyImage'
import { useListActions } from '@/store/controllers/useListController'
import type { CurrencyState } from '@/store/useListStore'
import { useListContext } from '@/store/useListStore'

const ListTabs = () => {
  const { isPending, handleCurrency } = useListActions()
  const currency = useListContext((state) => state.currency)
  const { tabs } = listDatum
  return tabs.map((tab) => (
    <Button
      layoutId={'selectedTab'}
      style={{
        borderBottom:
          tab.id === currency ? '2.5px solid teal' : '2.5px solid transparent',
      }}
      colorScheme={'secondary'}
      className={'relative overflow-hidden rounded-full'}
      size={'lg'}
      disabled={isPending}
      key={tab.label}
      onPress={() => handleCurrency(tab.id as CurrencyState)}
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
