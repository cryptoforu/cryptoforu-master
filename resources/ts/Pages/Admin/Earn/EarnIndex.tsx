import AdminLayout from '@/Layouts/AdminLayout';
import AppHead from '@/Components/AppHead';
import { SuspenseWrapper } from '@/Motion';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import ActionHeader from '@/PageContainers/Admin/ActionHeader';
import { MenuSelectProvider, MenuSelect } from '@/Store/useMenuSelect';
import { ContextGrid } from '@/PageContainers/Admin/EarnMethods';
type SelectProps = {
  select: [
    {
      id: string;
      label: string;
    }
  ];
};

const EarnIndex = ({ select }: SelectProps) => {
  return (
    <>
      <AppHead />
      <SuspenseWrapper>
        <PanelWrapper>
          <MenuSelectProvider select={select} selected="crypto-faucets">
            <ActionHeader
              title="Earning Methods"
              desc="Filtered By Category and Earning Oportunity"
            >
              <MenuSelect />
            </ActionHeader>
            <ContextGrid />
          </MenuSelectProvider>
        </PanelWrapper>
      </SuspenseWrapper>
    </>
  );
};
EarnIndex.layout = (page: string) => <AdminLayout children={page} />;
export default EarnIndex;
