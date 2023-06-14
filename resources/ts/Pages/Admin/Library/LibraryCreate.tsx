import { Card, CardBody } from '@chakra-ui/react';

import AppHead from '@/Components/AppHead';
import DataTabs from '@/Components/Elements/Content/DataTabs';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { useLibraryForms } from '@/Store/useLibraryForms';

const LibraryCreate = () => {
  const data = useLibraryForms();
  return (
    <>
      <AppHead />
      <SuspenseWrapper>
        <PanelWrapper>
          <Card variant="containerCard">
            <CardBody>
              <DataTabs data={data} variant="secondary" />
            </CardBody>
          </Card>
        </PanelWrapper>
      </SuspenseWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
LibraryCreate.layout = (page: string) => <AdminLayout children={page} />;
export default LibraryCreate;
