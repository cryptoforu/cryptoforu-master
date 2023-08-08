'use client'
import Pagination from '@/components/tables/Pagination'
import { useListContext } from '@/store/useListStore'
import { ListData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'

const ListPagination = () => {
  const list_data = useListContext((state) => state.data?.list_data) as ListData
  const setPage = useListContext((state) => state.setPage)
  const { from, to, total, links, prev_page_url, next_page_url, current_page } =
    list_data
  return (
    <div className={'mt-6 w-full'}>
      <Pagination
        onPageChange={setPage}
        current_page={current_page}
        from={from}
        links={links}
        prev_page_url={prev_page_url}
        to={to}
        total={total}
        next_page_url={next_page_url}
      />
    </div>
  )
}
export default ListPagination
