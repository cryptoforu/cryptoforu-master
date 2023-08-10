import { Container } from '@chakra-ui/react';
import pMinDelay from 'p-min-delay';
import { lazy } from 'react';

import AppHead from '@/Components/AppHead';
import { usePageProps } from '@/Hooks/useTypedPage';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import FormProvider from '@/Store/useFormProvider';
import type { FormData, LibraryData } from '@/Types/generated';

const DynamicForm = lazy(() =>
  pMinDelay(import(`@/Forms/DynamicForm.js`), 1000)
);

type OptionsProps = {
  id: string | number;
  name: string;
};

interface EarnEditProps {
  edit_form: {
    initialValues: {
      id: 'edit_form';
    };
    form_route: string;
    form_schema: {
      id: FormData<OptionsProps>;
    };
  };
}

const EarnEdit = () => {
  const { edit_form } = usePageProps<EarnEditProps>();
  const { media } = usePageProps<LibraryData>();
  console.log(media);
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Container maxWidth="5xl">
          <SuspenseWrapper>
            <FormProvider
              initialValues={edit_form.initialValues}
              form_route={edit_form.form_route}
              form_schema={edit_form.form_schema}
              method="put"
            >
              <DynamicForm />
            </FormProvider>
          </SuspenseWrapper>
        </Container>
      </PanelWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
EarnEdit.layout = (page: string) => <AdminLayout children={page} />;

export default EarnEdit;
