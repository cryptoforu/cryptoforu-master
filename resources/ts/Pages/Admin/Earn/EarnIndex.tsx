import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import ActionHeader from '@/PageContainers/Admin/ActionHeader';
import { ContextGrid } from '@/PageContainers/Admin/EarnMethods';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { MenuSelect, MenuSelectProvider } from '@/Store/useMenuSelect';

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
// eslint-disable-next-line react/no-children-prop
EarnIndex.layout = (page: string) => <AdminLayout children={page} />;
export default EarnIndex;
