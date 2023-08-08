import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { memo, useState } from 'react'
import { clsx } from 'clsx'
import { filterFns } from '@/components/tables/filters'

const tableVariant = {
  full: 'w-full',
  sm: 'w-[48rem] sm:w-[57rem]',
}

export interface DataTableProps<D extends object> {
  data: D[]
  columns: ColumnDef<D>[]
  variant?: keyof typeof tableVariant
  filterFn?: FilterFn<D>
  globalFilter?: string
  setGlobalFilter?: (filter: string) => void
}

const DataTable = memo(function DataTable<D extends object>({
  data,
  columns,
  variant = 'sm',
  filterFn = filterFns.fuzzy,
  globalFilter,
  setGlobalFilter,
}: DataTableProps<D>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: filterFn,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  })

  return (
    <div className={'mt-2'}>
      <div
        className={clsx(
          'max-w-none rounded-xl bg-slate-50 transition-shadow hover:shadow-md hover:shadow-slate-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5',
          tableVariant[variant]
        )}
      >
        <div className="mt-4 h-auto w-full overflow-x-auto rounded-xl shadow-sm ring-1 ring-black/5">
          <table className="h-auto w-full min-w-full table-auto divide-y divide-slate-300 text-left text-sm dark:divide-slate-900">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100"
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr
                    className={clsx(
                      'text-sm text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-900'
                    )}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className={'px-4 py-3'}>
                          <span className="line-clamp-3">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
})
export default DataTable
