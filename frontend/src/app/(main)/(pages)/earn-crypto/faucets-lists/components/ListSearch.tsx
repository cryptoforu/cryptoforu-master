'use client'
import { Search } from '@/components/elements'
import { useListContext } from '@/store/useListStore'

const ListSearch = () => {
  const [globalFilter, setGlobalFilter] = useListContext((state) => [
    state.globalFilter,
    state.setGlobalFilter,
  ])
  return (
    <Search
      aria-label={'List Data'}
      value={globalFilter}
      onChange={setGlobalFilter}
    />
  )
}
export default ListSearch
