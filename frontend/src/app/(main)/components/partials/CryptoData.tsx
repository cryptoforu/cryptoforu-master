'use client'
import { Suspense, useMemo } from 'react'

import { TableSkeleton } from '@/components/skeletons'
import CurrentPrice from '@/components/tables/Cells/CurrentPrice'
import ImageCell from '@/components/tables/Cells/ImageCell'
import PriceCell from '@/components/tables/Cells/PriceCell'
import TextCell from '@/components/tables/Cells/TextCell'
import DataTable from '@/components/tables/DataTable'
import useCryptoController from '@/store/controllers/useCryptoController'

const CryptoData = () => {
  const data = useCryptoController()

  const columns = useMemo(
    () => [
      {
        header: '#',
        id: 'attributes.market_cap_rank',
        accessorFn: (row) => row.attributes.market_cap_rank,
        cell: (column) => TextCell(column.getValue()),
      },
      {
        header: 'Name',
        id: 'attributes.name',
        accessorFn: (row) => row.attributes.name,
        cell: (column) =>
          ImageCell({
            image: column.row.original.attributes.image,
            alt: column.getValue(),
            title: column.getValue(),
          }),
      },
      {
        header: 'Price',
        id: 'attributes.current_price',
        accessorFn: (row) => row.attributes.current_price,
        cell: (column) =>
          CurrentPrice({
            nextPrice: column.getValue(),
            color: column.row.original.attributes.current_color,
          }),
      },
      {
        header: '1h(%)',
        id: 'attributes.price_change_percentage_1h_in_currency',
        accessorFn: (row) =>
          row.attributes.price_change_percentage_1h_in_currency,
        cell: (column) => PriceCell({ price: column.getValue() }),
      },
      {
        header: '24h(%)',
        id: 'attributes.price_change_percentage_24h_in_currency',
        accessorFn: (row) =>
          row.attributes.price_change_percentage_24h_in_currency,
        cell: (column) => PriceCell({ price: column.getValue() }),
      },
      {
        header: '7d(%)',
        id: 'attributes.price_change_percentage_7d_in_currency',
        accessorFn: (row) =>
          row.attributes.price_change_percentage_7d_in_currency,
        cell: (column) => PriceCell({ price: column.getValue() }),
      },
      {
        header: 'Market Cap',
        id: 'attributes.market_cap',
        accessorFn: (row) => row.attributes.market_cap,
        cell: (column) => TextCell(column.getValue()),
      },
    ],
    []
  )

  return (
    <Suspense fallback={<TableSkeleton rows={6} />}>
      <DataTable data={data} columns={columns} />
    </Suspense>
  )
}
export default CryptoData
