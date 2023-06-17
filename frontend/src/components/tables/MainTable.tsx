import type {
  ColumnProps,
  RowProps,
  TableHeaderProps,
  TableProps,
} from 'react-aria-components'
import {
  Collection,
  Column,
  Row,
  Table,
  TableHeader,
} from 'react-aria-components'
import { clsx } from 'clsx'

export function MainTableHeader<T extends object>({
  columns,
  children,
}: TableHeaderProps<T>) {
  return (
    <TableHeader>
      <Collection items={columns}>{children}</Collection>
    </TableHeader>
  )
}

export function MainTableColumn<T extends object>(props: ColumnProps<T>) {
  return (
    <Column
      {...props}
      className={clsx(
        'px-4 py-3 text-sm font-semibold text-slate-900 dark:text-slate-100',
        props.isRowHeader && ''
      )}
    >
      {({ allowsSorting, sortDirection }) => (
        <>
          {props.children}
          {allowsSorting && (
            <span aria-hidden="true" className="cursor-pointer select-none">
              {sortDirection === 'ascending' ? '▲' : '▼'}
            </span>
          )}
        </>
      )}
    </Column>
  )
}

export function MainTableRow<T extends object>({
  id,
  columns,
  children,
}: RowProps<T>) {
  return (
    <Row
      id={id}
      className={
        'text-sm text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-900'
      }
    >
      <Collection items={columns}>{children}</Collection>
    </Row>
  )
}

const MainTable = ({ children, ...props }: TableProps) => {
  return (
    <div
      className={
        'mt-4 h-auto w-full overflow-x-auto rounded-xl shadow-sm ring-1 ring-black/5'
      }
    >
      <Table
        className={
          'h-auto w-full min-w-full table-auto divide-y divide-slate-300 text-left text-sm dark:divide-slate-900'
        }
        {...props}
      >
        {children}
      </Table>
    </div>
  )
}
export default MainTable
