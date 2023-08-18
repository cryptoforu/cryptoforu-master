'use client'
import { Key, ReactNode, useMemo } from 'react'
import { Item } from 'react-stately'

import { Tabs } from '@/components/elements'
import { useDataTabs } from '@/store/useTabs'

interface IDataTabsProps {
  data: {
    id: string
    key: Key
    label: string
    content: ReactNode
  }[]
  listVariant?: 'horizontal' | 'vertical'
  listPosition?: 'left' | 'center' | 'full'
}

export default function DataTabsV2({ data, ...props }: IDataTabsProps) {
  const tabsData = useMemo(() => data, [data])
  const { isPending, onSelectionChange, isSelected } = useDataTabs()
  const { listVariant = 'horizontal', listPosition = 'left' } = props
  return (
    <Tabs
      aria-label={'Tabs Data'}
      items={tabsData}
      selectedKey={isSelected}
      onSelectionChange={onSelectionChange}
      defaultSelectedKey={'1'}
      tabPosition={listPosition}
      variant={listVariant}
      isDisabled={isPending}
    >
      {(item) => (
        <Item key={item.id} title={item.label}>
          {item.content}
        </Item>
      )}
    </Tabs>
  )
}
