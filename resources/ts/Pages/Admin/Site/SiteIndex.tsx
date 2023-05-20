import AppHead from '@/Components/AppHead';
import { lazy } from 'react';
import pMinDelay from 'p-min-delay';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { SuspenseWrapper } from '@/Motion';
import ActionHeader from '@/PageContainers/Admin/ActionHeader';
import { MenuSelectProvider, MenuSelect } from '@/Store/useMenuSelect';
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
SiteIndex.layout = (page: string) => <AdminLayout children={page} />;
export default SiteIndex;
