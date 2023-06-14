import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { AddData } from '@/PageContainers/Admin/SiteData';
import PanelWrapper from '@/PageContainers/PanelWrapper';

const SiteCreate = () => {
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <AddData />
      </PanelWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
SiteCreate.layout = (page: string) => <AdminLayout children={page} />;
export default SiteCreate;
