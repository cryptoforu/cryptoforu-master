import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  chakra,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Fragment, useState } from 'react';

import { ProseHeadings } from '@/Components/Elements/Typography';

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, unknown>[];
  title: string;
};

function DataTable<Data extends object>({
  data,
  columns,
  title,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Card
      overflowX={{ sm: 'scroll', xl: 'hidden' }}
      bg="gray.900"
      borderRadius="15px"
      minWidth="full"
      p="8"
    >
      <CardHeader p="6px 0px 22px 0px">
        <ProseHeadings component="h2" size="xl">
          {title}
        </ProseHeadings>
      </CardHeader>
      <CardBody>
        <Table variant="simple">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id} my=".8rem" pl="0px" color="slate.400">
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <Fragment key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Fragment>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default DataTable;
