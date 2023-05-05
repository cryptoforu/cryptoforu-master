import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import DataTabs from '@/Components/Elements/Content/DataTabs';
import { useLibraryForms } from '@/Store/useLibraryForms';
import { Card, CardBody } from '@chakra-ui/react';

const LibraryCreate = () => {
  const data = useLibraryForms();
  return (
    <>
      <AppHead />
      <SuspenseWrapper>
        <PanelWrapper>
          <Card variant="containerCard">
            <CardBody>
              <DataTabs data={data} />
            </CardBody>
          </Card>
        </PanelWrapper>
      </SuspenseWrapper>
    </>
  );
};
LibraryCreate.layout = (page: string) => <AdminLayout children={page} />;
export default LibraryCreate;
