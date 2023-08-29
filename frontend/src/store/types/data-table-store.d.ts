import { TableOptions } from '@tanstack/react-table'
import { PropsWithChildren } from 'react'

export type CellType =
  | 'link'
  | 'usd_crypto'
  | 'time'
  | 'meter'
  | 'image'
  | 'price'

export type ItemID = {
  id: string
}

export type CellProps = {
  header: string
  id: string
  cellType: CellType
  value: string | number | { name: string; image: string }
}
export type DataItems<T> = Array<ItemID & Record<keyof T, CellProps>>

export interface DataTableProps<T extends object> {
  data: DataItems<T>
}

export type TableContextData<T extends object> = {
  columns: Array<any>
  tableOptions?: Omit<TableOptions<T>, 'data' | 'columns' | 'getCoreRowModel'>
} & DataTableProps<T>

export interface TableProviderProps<T extends object>
  extends PropsWithChildren,
    DataTableProps<T> {
  tableOptions?: Omit<TableOptions<any>, 'data' | 'columns' | 'getCoreRowModel'>
}

export type ColumnProps = {
  id: string
  accessorKey?: string
  accessorFn?: (originalRow: any, index?: number) => any
  cell: (col: any) => JSX.Element
  header: string | ((column: any) => string)
}
