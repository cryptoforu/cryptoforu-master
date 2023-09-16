'use client'
import { Search } from '@/components/elements'
import { useGlobalFilter } from '@/store/controllers/useFaucetListActions'

const ListSearch = () => {
  const [globalFilter, setGlobalFilter] = useGlobalFilter()
  return (
    <Search
      aria-label={'List Data'}
      value={globalFilter}
      onChange={setGlobalFilter}
    />
  )
}
export default ListSearch
