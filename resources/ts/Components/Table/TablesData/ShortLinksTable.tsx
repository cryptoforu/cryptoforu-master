import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { DataTable } from '@/Components/Table';
import { TextCell, TitleCell } from '@/Components/Table/Cells';
import LinkCell from '@/Components/Table/Cells/LinkCell';
import { EarnData } from '@/Types/generated';

interface ShortlinksData extends EarnData {
  payout: string;
  cpm: string;
  methods: string;
}

const ShortLinksTable = ({ shortlinks }: { shortlinks: EarnData[] }) => {
  const columnHelper = createColumnHelper<ShortlinksData>();

  const shortlinksData = shortlinks.map((el) => {
    const temp = el.main_features?.split('*');
    temp?.shift();
    let newObj: object = {};
    if (temp) {
      newObj = {
        ...el,
        payout: temp[0].substring(temp[0].indexOf(':') + 1),
        cpm: temp[1].substring(temp[1].indexOf(':') + 1),
        methods: temp[2].substring(temp[2].indexOf(':') + 1),
      };
    }
    return newObj as ShortlinksData;
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '#',
        id: 'id',
        cell: (props) => TextCell(props.row.index.toString()),
      }),
      columnHelper.accessor('title', {
        header: 'Name',
        id: 'title',
        cell: (props) => TitleCell(props.getValue()),
      }),
      columnHelper.accessor('payout', {
        header: 'Min.Payout',
        id: 'payout',
        cell: (props) => TextCell(props.getValue()),
      }),
      columnHelper.accessor('cpm', {
        header: 'CPM',
        id: 'cpm',
        cell: (props) => TextCell(props.getValue()),
      }),
      columnHelper.accessor('methods', {
        header: 'Payment Methods',
        id: 'methods',
        cell: (props) => TextCell(props.getValue()),
      }),
      columnHelper.accessor('link', {
        header: 'Visit',
        id: 'link',
        cell: (props) => LinkCell('Visit', props.getValue()),
      }),
    ],
    [columnHelper]
  );
  return (
    <DataTable data={shortlinksData} columns={columns} title={'Shortlinks'} />
  );
};
export default ShortLinksTable;
