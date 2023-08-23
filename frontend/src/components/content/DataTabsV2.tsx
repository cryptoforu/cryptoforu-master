'use client'
import { Key, ReactNode, useMemo } from 'react'
import { Item } from 'react-stately'

import { Tabs } from '@/components/elements'
import useNavigated from '@/hooks/useNavigated'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { useTabsAction } from '@/store/controllers/useTabsController'

interface IDataTabsProps {
  data: {
    id: string | number
    key: Key
    label: string
    content: ReactNode
  }[]
  listVariant?: 'horizontal' | 'vertical'
  listPosition?: 'left' | 'center' | 'full'
}

export default function DataTabsV2({ data, ...props }: IDataTabsProps) {
  const tabsData = useMemo(() => data, [data])
  const [selectedKey, _, isPending, onSelectionChange] = useTabsAction()
  const { listVariant = 'horizontal', listPosition = 'left' } = props
  const navigated = useNavigated()
  useUpdateEffect(() => {
    if (navigated) {
      onSelectionChange('1')
    }
  }, [navigated])
  return (
    <Tabs
      aria-label={'Tabs Data'}
      items={tabsData}
      selectedKey={selectedKey}
      onSelectionChange={onSelectionChange}
      tabPosition={listPosition}
      variant={listVariant}
      isDisabled={isPending}
    >
      {(item) => (
        <Item key={item.key} title={item.label}>
          {item.content}
        </Item>
      )}
    </Tabs>
  )
}
