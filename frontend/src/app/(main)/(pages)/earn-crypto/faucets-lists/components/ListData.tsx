'use client'
import { getFilteredRowModel, getSortedRowModel } from '@tanstack/react-table'
import { useState } from 'react'

import DataTable from '@/components/tables/DataTable'
import { filterFns } from '@/components/tables/filters'
import { useGlobalFilter } from '@/store/controllers/useFaucetListActions'
import { useList } from '@/store/useFaucetListProvider'

const ListData = () => {
  const {
    data: { list },
    columns,
  } = useList()
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useGlobalFilter()
  const tableOptions = {
    state: {
      globalFilter,
      sorting,
    },
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterFns.fuzzy,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  }
  return (
    <DataTable
      columns={columns}
      data={list.listData}
      variant={'full'}
      options={tableOptions}
    />
  )
}
export default ListData
