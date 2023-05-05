import { usePageProps } from '@/Hooks/useTypedPage';
import { DataTable } from '@/Components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionCell, ImageTitleCell } from '../Cells';
import type { CategoryTable } from '../Types/tables';
import { useCategory } from '@/Store/useCategories';
const CategoriesTable = () => {
  const { category_table } = usePageProps<Array<CategoryTable>>();
  const columnHelper = createColumnHelper<CategoryTable>();
  const { selectCategory, isPending } = useCategory();
  const columns = [
    columnHelper.accessor('name', {
      header: 'Category',
      id: 'name',
      cell: (column) => {
        return ImageTitleCell({
          title: column.getValue(),
          image: column.row.original.category_image,
        });
      },
    }),
    columnHelper.accessor('name', {
      header: 'Edit',
      id: 'id',
      cell: (column) => {
        return ActionCell({
          action: 'state',
          setState: () => selectCategory(column.getValue()),
          isPending: isPending,
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
  return (
    <DataTable
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      columns={columns}
      data={category_table}
      title="Blog Categories"
    />
  );
};

export default CategoriesTable;
