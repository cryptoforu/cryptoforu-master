import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Skeleton,
  Spacer,
} from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Suspense, useTransition } from 'react';

import { ProsePa } from '@/Components/Elements/Typography';
import { DataTable } from '@/Components/Table';
import useScrollTo from '@/Hooks/useScrollTo';
import { usePageProps } from '@/Hooks/useTypedPage';
import { useRoute } from '@/Providers/RouteProvider';

import { ActionCell, ImageTitleCell, StatusCell, TextCell } from '../Cells';
import type { PostsProps, PostsTable as P } from '../Types/tables';

const PostsTable = () => {
  const { post_table } = usePageProps<P>();
  const columnHelper = createColumnHelper<PostsProps>();
  const { meta, links } = post_table;
  const [isPending, startTransition] = useTransition();
  const { navigate } = useRoute();

  function onPaginate(url: string) {
    startTransition(() => {
      navigate(
        url,
        {},
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            setTimeout(() => {
              scrollTo({ y: 100 });
            }, 1000);
          },
        }
      );
    });
  }

  const scrollTo = useScrollTo();
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
  return (
    <>
      <Suspense fallback={<Skeleton />}>
        <DataTable
          columns={columns}
          data={post_table.data}
          title="Blog Posts"
        />
      </Suspense>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p={2}>
          <ProsePa>
            Showing {meta.from} to {meta.to} of {meta.total}
          </ProsePa>
        </Box>
        <Spacer />
        <ButtonGroup gap={2}>
          {links.map((link) =>
            link.url !== null ? (
              <Button
                key={link.label}
                isDisabled={isPending}
                onClick={() => onPaginate(link.url as string)}
                colorScheme={link.active ? 'emerald' : 'gray'}
              >
                <ProsePa
                  dangerouslySetInnerHTML={{ __html: link.label as string }}
                />
              </Button>
            ) : null
          )}
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default PostsTable;
