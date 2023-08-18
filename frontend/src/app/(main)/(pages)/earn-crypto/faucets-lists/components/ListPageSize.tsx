'use client'
import { listDatum } from 'contentlayer/generated'

import { MenuButton, MenuItem } from '@/components/elements/Menu'
import { useListActions } from '@/store/controllers/useListController'
import { useListContext } from '@/store/useListStore'

const ListPageSize = () => {
  const { isPending, handleSize } = useListActions()
  const items = listDatum.page_size
  const page_size = useListContext((state) => state.page_size)

  return (
    <MenuButton
      colorScheme={'secondary'}
      disabled={isPending}
      label={page_size.toString()}
      items={items}
      onAction={(key) => handleSize(key as string)}
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
