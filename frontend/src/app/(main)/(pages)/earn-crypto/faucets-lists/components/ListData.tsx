'use client'
import {
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'

import { BtnExternalLink } from '@/components/elements'
import LinkCell from '@/components/tables/Cells/LinkCell'
import MeterCell from '@/components/tables/Cells/MeterCell'
import TextCell from '@/components/tables/Cells/TextCell'
import TimeCell from '@/components/tables/Cells/TimeCell'
import UsdCryptoCell from '@/components/tables/Cells/UsdCryptoCell'
import DataTable from '@/components/tables/DataTable'
import { filterFns } from '@/components/tables/filters'
import useListController from '@/store/controllers/useListController'
import { useListContext } from '@/store/useListStore'

const ListData = () => {
  const data = useListController()
  const columns = useMemo(
    () => [
      {
        id: 'name',
        accessorFn: (row) => row.name,
        header: 'Name',
        cell: (column) =>
          LinkCell({
            href: column.row.original.url,
            label: column.getValue(),
          }),
      },
      {
        id: 'paid_today',
        accessorFn: (row) => row.paid_today,
        header: 'Paid Today',
        cell: (column) =>
          UsdCryptoCell({
            priceUsd: column.getValue(),
            priceCrypto: column.row.original.paid_today_coin,
            crypto: column.row.original.currency,
          }),
      },
      {
        id: 'active_users',
        accessorFn: (row) => row.active_users,
        header: 'Active | Paid Today',
        cell: (column) =>
          TextCell(
            column.getValue() + '|' + column.row.original.total_users_paid
          ),
      },
      {
        id: 'reward',
        accessorFn: (row) => row.reward,
        header: 'Reward',
        cell: (column) =>
          UsdCryptoCell({
            priceUsd: column.getValue(),
            priceCrypto: column.row.original.reward_coin,
            crypto: column.row.original.currency,
          }),
      },
      {
        id: 'timer_in_minutes',
        accessorFn: (row) => row.timer_in_minutes,
        header: 'Timer',
        cell: (column) => TimeCell(column.getValue()),
      },
      {
        id: 'health',
        accessorFn: (row) => row.health,
        header: 'Health',
        cell: (column) =>
          MeterCell({
            meter: parseFloat(column.getValue()),
            priceUsd: column.row.original.balance,
          }),
      },
      {
        id: 'url',
        accessorFn: (row) => row.url,
        header: '#',
        cell: (column) => {
          return (
            <div className={'p-2'}>
              <BtnExternalLink
                href={column.getValue()}
                className={'z-10 overflow-hidden rounded-full'}
                size={'sm'}
              >
                Visit
              </BtnExternalLink>
            </div>
          )
        },
      },
    ],
    []
  )

  const [globalFilter, setGlobalFilter] = useListContext((state) => [
    state.globalFilter,
    state.setGlobalFilter,
  ])
  const [sorting, setSorting] = useState<SortingState>([])
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
      data={data.list_data.data}
      variant={'full'}
      options={tableOptions}
    />
  )
}
export default ListData
