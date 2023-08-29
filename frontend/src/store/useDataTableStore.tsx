'use client'
import { Context, createContext, useContext } from 'react'

import CurrentPrice from '@/components/tables/Cells/CurrentPrice'
import ImageCell from '@/components/tables/Cells/ImageCell'
import LinkCell from '@/components/tables/Cells/LinkCell'
import MeterCell from '@/components/tables/Cells/MeterCell'
import TextCell from '@/components/tables/Cells/TextCell'
import TimeCell from '@/components/tables/Cells/TimeCell'
import UsdCryptoCell from '@/components/tables/Cells/UsdCryptoCell'
import type {
  ColumnProps,
  DataTableProps,
  TableContextData,
  TableProviderProps,
} from '@/store/types/data-table-store'

const TableContext = createContext<TableContextData<object> | null>(null)

function filterKeys(key) {
  let keys: string[] = ['']
  for (const values of key) {
    keys = Object.keys(values)
  }
  return keys
}

function generateColumns<T extends object>({ data }: DataTableProps<T>) {
  const columns: ColumnProps[] = []
  const keys = filterKeys(data).slice(1)

  for (let i = 0; i < keys.length; i++) {
    columns.push({
      header: data[i][keys[i]].header,
      id: data[i][keys[i]].id,
      accessorFn: (col) => col[keys[i]].value,
      cell: (col) => {
        switch (data[i][keys[i]].cellType) {
          case 'link':
            return LinkCell({
              href: col.getValue().url,
              label: col.getValue().label,
            })
          case 'usd_crypto':
            return UsdCryptoCell({
              priceUsd: col.getValue().priceUsd,
              priceCrypto: col.getValue().priceCrypto,
              crypto: col.getValue().crypto,
            })
          case 'time':
            return TimeCell(col.getValue())
          case 'meter':
            return MeterCell({
              meter: parseFloat(col.getValue().meter),
              priceUsd: col.getValue().priceUsd,
            })
          case 'image':
            return ImageCell({
              image: col.getValue().image,
              alt: col.getValue().name,
              title: col.getValue().name,
            })
          case 'price':
            return CurrentPrice({
              nextPrice: col.getValue(),
            })
          default:
            return TextCell(col.getValue())
        }
      },
    })
  }
  return columns
}

export default function TableProvider<T extends object>({
  children,
  data,
  tableOptions,
}: TableProviderProps<T>) {
  const columns = generateColumns({ data })

  return (
    <TableContext.Provider value={{ data, columns, tableOptions }}>
      {children}
    </TableContext.Provider>
  )
}

export function useTableContext<T extends object>() {
  const tableContext = useContext<TableContextData<T>>(
    TableContext as unknown as Context<TableContextData<T>>
  )
  if (!tableContext) {
    throw new Error('Table Context Must Be Under Table Provider')
  }
  return tableContext
}
