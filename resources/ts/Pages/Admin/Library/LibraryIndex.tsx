import { lazy } from 'react';
import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import ActionHeader from '@/PageContainers/Admin/ActionHeader';
import { MenuSelectProvider, MenuSelect } from '@/Store/useMenuSelect';
import { SelectAll } from '@/PageContainers/Admin/Library';
import type { SelectProps } from '@/types';
import pMinDelay from 'p-min-delay';

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
LibraryIndex.layout = (page: string) => <AdminLayout children={page} />;
export default LibraryIndex;
