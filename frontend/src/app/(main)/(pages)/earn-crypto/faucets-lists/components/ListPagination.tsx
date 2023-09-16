'use client'
import { useTransition } from 'react'

import { updatePage } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/api/listActions'
import Pagination from '@/components/tables/Pagination'
import { useList } from '@/store/useFaucetListProvider'

const ListPagination = () => {
  const {
    data: { list },
  } = useList()
  const [isPending, startTransition] = useTransition()

  function onPageChange(page: string) {
    startTransition(() => {
      void updatePage(page)
    })
  }

  return (
    <div className={'mt-6 w-full'}>
      <Pagination
        onPageChange={onPageChange}
        current_page={list.meta.current_page}
        from={list.meta.from}
        links={list.links}
        prev_page_url={list.meta.prev_page_url}
        to={list.meta.to}
        total={list.meta.total}
        next_page_url={list.meta.next_page_url}
        isDisabled={isPending}
      />
    </div>
  )
}
export default ListPagination
