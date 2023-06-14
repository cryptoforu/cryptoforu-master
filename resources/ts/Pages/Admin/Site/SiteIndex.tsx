import pMinDelay from 'p-min-delay';
import { lazy } from 'react';

import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import ActionHeader from '@/PageContainers/Admin/ActionHeader';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { MenuSelect, MenuSelectProvider } from '@/Store/useMenuSelect';
import type { SelectProps } from '@/types';

const PagesData = lazy(() =>
  pMinDelay(import('@/PageContainers/Admin/SiteData/PagesData'), 500)
);

const SiteIndex = ({ select }: SelectProps) => {
  return (
    <>
      <AppHead />
      <SuspenseWrapper>
        <PanelWrapper>
          <MenuSelectProvider select={select} selected="home-page">
            <ActionHeader title="Pages Data" desc="Front End Pages Data">
              <MenuSelect />
            </ActionHeader>
            <PagesData />
          </MenuSelectProvider>
        </PanelWrapper>
      </SuspenseWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
SiteIndex.layout = (page: string) => <AdminLayout children={page} />;
export default SiteIndex;
