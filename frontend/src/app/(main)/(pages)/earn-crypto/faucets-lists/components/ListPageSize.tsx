'use client'
import { listDatum } from 'contentlayer/generated'
import { useTransition } from 'react'
import { useListData } from 'react-stately'

import { updateSize } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/api/listActions'
import { MenuButton, MenuItem } from '@/components/elements/Menu'

const ListPageSize = () => {
  const items = listDatum.page_size
  const listData = useListData({
    initialItems: items,
    initialSelectedKeys: ['50'],
    getKey: (item) => item.size,
  })

  const [isPending, startTransition] = useTransition()

  function onSizeChange(size: string) {
    startTransition(() => {
      void updateSize(size)
    })
  }

  return (
    <MenuButton
      colorScheme={'secondary'}
      label={listData.selectedKeys}
      items={listData.items}
      selectionMode={'single'}
      selectedKeys={listData.selectedKeys}
      onSelectionChange={listData.setSelectedKeys}
      onAction={(key) => onSizeChange(key as string)}
      disabled={isPending}
    >
      {(item) => (
        <MenuItem id={item.size} key={item.size}>
          {item.size}
        </MenuItem>
      )}
    </MenuButton>
  )
}
export default ListPageSize
