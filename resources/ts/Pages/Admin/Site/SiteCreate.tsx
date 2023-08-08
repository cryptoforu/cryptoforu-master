import AppHead from '@/Components/AppHead';
import { FormArray } from '@/Forms';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';

const SiteCreate = () => {
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <FormArray />
      </PanelWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
SiteCreate.layout = (page: string) => <AdminLayout children={page} />;
export default SiteCreate;
