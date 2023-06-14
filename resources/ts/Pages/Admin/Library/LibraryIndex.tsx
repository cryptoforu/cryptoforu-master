import pMinDelay from 'p-min-delay';
import { lazy } from 'react';

import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import ActionHeader from '@/PageContainers/Admin/ActionHeader';
import { SelectAll } from '@/PageContainers/Admin/Library';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { MenuSelect, MenuSelectProvider } from '@/Store/useMenuSelect';
import type { SelectProps } from '@/types';

const ImageGrid = lazy(() =>
  pMinDelay(import('@/PageContainers/Admin/Library/ImageGrid'), 500)
);

const LibraryIndex = ({ select }: SelectProps) => {
  return (
    <>
      <AppHead />
      <SuspenseWrapper>
        <PanelWrapper>
          <MenuSelectProvider select={select} selected="posts">
            <ActionHeader title="Media Library" desc="Filtered By Category">
              <SelectAll />
              <MenuSelect />
            </ActionHeader>
            <ImageGrid />
          </MenuSelectProvider>
        </PanelWrapper>
      </SuspenseWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
LibraryIndex.layout = (page: string) => <AdminLayout children={page} />;
export default LibraryIndex;
