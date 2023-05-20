import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { AddData } from '@/PageContainers/Admin/SiteData';
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
SiteCreate.layout = (page: string) => <AdminLayout children={page} />;
export default SiteCreate;
