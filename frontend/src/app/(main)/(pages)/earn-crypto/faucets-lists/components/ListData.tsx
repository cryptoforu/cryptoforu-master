'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'

import { FaucetData } from '@/app/(main)/(pages)/earn-crypto/faucets-lists/faucets-lists'
import { BtnExternalLink } from '@/components/elements'
import LinkCell from '@/components/tables/Cells/LinkCell'
import MeterCell from '@/components/tables/Cells/MeterCell'
import TextCell from '@/components/tables/Cells/TextCell'
import TimeCell from '@/components/tables/Cells/TimeCell'
import UsdCryptoCell from '@/components/tables/Cells/UsdCryptoCell'
import DataTable from '@/components/tables/DataTable'
import useListController from '@/store/controllers/useListController'
import { useListContext } from '@/store/useListStore'

const helper = createColumnHelper<FaucetData>()

const defColumns = [
  helper.accessor('name', {
    header: 'Name',
    id: 'name',
    cell: (column) => {
      return LinkCell({
        href: column.row.original.url,
        label: column.getValue(),
      })
    },
  }),
  helper.accessor('paid_today', {
    header: 'Paid Today',
    id: 'paid_today',
    cell: (column) => {
      return UsdCryptoCell({
        priceUsd: column.getValue(),
        priceCrypto: column.row.original.paid_today_coin,
        crypto: column.row.original.currency,
      })
    },
  }),
  helper.accessor('active_users', {
    header: 'Active | Paid Today',
    id: 'active_users',
    cell: (column) => {
      return TextCell(
        column.getValue() + '|' + column.row.original.total_users_paid
      )
    },
  }),
  helper.accessor('reward', {
    header: 'Reward',
    id: 'reward',
    cell: (column) => {
      return UsdCryptoCell({
        priceUsd: column.getValue(),
        priceCrypto: column.row.original.reward_coin,
        crypto: column.row.original.currency,
      })
    },
  }),
  helper.accessor('timer_in_minutes', {
    header: 'Timer',
    id: 'timer',
    cell: (column) => {
      return TimeCell(column.getValue())
    },
  }),
  helper.accessor('health', {
    header: 'Health',
    id: 'health',
    cell: (column) => {
      return MeterCell({
        meter: parseFloat(column.getValue()),
        priceUsd: column.row.original.balance,
      })
    },
  }),
  helper.accessor('url', {
    header: '#',
    id: 'url',
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
  }),
]

const ListData = () => {
  const data = useListController()
  const columns = useMemo(() => defColumns, [])
  const [globalFilter, setGlobalFilter] = useListContext((state) => [
    state.globalFilter,
    state.setGlobalFilter,
  ])

  return (
    <DataTable
      /* @ts-ignore eslint-disable-next-line */
      columns={columns}
      data={data.list_data.data}
      variant={'full'}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  )
}
export default ListData
