import { createColumnHelper } from '@tanstack/react-table';

import { DataTable } from '@/Components/Table';
import { usePageProps } from '@/Hooks/useTypedPage';

import { ActionCell, ImageTitleCell, StatusCell, TextCell } from '../Cells';
import type { PostsTable as P } from '../Types/tables';

const PostsTable = () => {
  const { post_table } = usePageProps<Array<P>>();
  const columnHelper = createColumnHelper<P>();

  const columns = [
    columnHelper.accessor('title', {
      header: 'Post Title',
      id: 'title',
      cell: (column) => {
        return ImageTitleCell({
          title: column.getValue(),
          image: column.row.original.image_name,
        });
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      id: 'category',
      cell: (column) => {
        return TextCell(column.getValue().name);
      },
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      id: 'status',
      cell: (column) => {
        return StatusCell({
          status: column.getValue(),
          options: {
            route: column.row.original.endpoints.status,
            values: column.row.original.statusValues,
          },
          color: column.row.original.color,
        });
      },
    }),
    columnHelper.accessor('endpoints.edit', {
      header: 'Edit',
      id: 'endpoints.edit',
      cell: (column) => {
        return ActionCell({
          action: 'edit',
          href: column.getValue(),
          method: 'get',
        });
      },
    }),
    columnHelper.accessor('endpoints.delete', {
      header: 'Delete',
      id: 'endpoints.delete',
      cell: (column) => {
        return ActionCell({
          action: 'delete',
          href: column.getValue(),
          method: 'delete',
        });
      },
    }),
  ];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <DataTable columns={columns} data={post_table} title="Blog Posts" />;
};

export default PostsTable;
