import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table'
import { clsx } from 'clsx'
import { memo } from 'react'

import { InteractiveDiv } from '@/components/elements'

const tableVariant = {
  full: 'w-full',
  sm: 'inline-block',
}

export interface DataTableProps<D extends object> {
  data: D[]
  columns: ColumnDef<D, any>[]
  variant?: keyof typeof tableVariant
  options?: Omit<TableOptions<D>, 'data' | 'columns' | 'getCoreRowModel'>
}

const DataTable = memo(function DataTable<D extends object>({
  data,
  columns,
  variant = 'sm',
  options,
}: DataTableProps<D>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...options,
  })

  return (
    <div className={'mt-2 overflow-x-auto lg:overflow-hidden'}>
      <div
        className={clsx(
          'min-w-full rounded-xl bg-slate-50 transition-shadow hover:shadow-md hover:shadow-slate-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5',
          tableVariant[variant]
        )}
      >
        <div className="mt-4 overflow-x-auto rounded-xl shadow-sm ring-1 ring-black/5">
          <table className="min-w-full table-auto divide-y divide-slate-300 text-left text-sm dark:divide-slate-900">
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
                        <InteractiveDiv
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
                        </InteractiveDiv>
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
