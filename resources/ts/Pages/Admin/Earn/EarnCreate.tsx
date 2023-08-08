import { Container } from '@chakra-ui/react';
import pMinDelay from 'p-min-delay';
import { lazy } from 'react';

import AppHead from '@/Components/AppHead';
import { usePageProps } from '@/Hooks/useTypedPage';
import AdminLayout from '@/Layouts/AdminLayout';
import { SuspenseWrapper } from '@/Motion';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import type { FormData } from '@/Store/useFormProvider';
import FormProvider from '@/Store/useFormProvider';

const DynamicForm = lazy(() =>
  pMinDelay(import(`@/Forms/DynamicForm.js`), 1000)
);

interface EarnCreateProps {
  earn_form: {
    initialValues: {
      id: 'earn_form';
    };
    form_route: string;
    form_schema: {
      id: FormData;
    };
  };
}

const EarnCreate = () => {
  const { earn_form } = usePageProps<EarnCreateProps>();

  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Container maxWidth="5xl">
          <SuspenseWrapper>
            <FormProvider
              initialValues={earn_form.initialValues}
              form_route={earn_form.form_route}
              form_schema={earn_form.form_schema}
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
EarnCreate.layout = (page: string) => <AdminLayout children={page} />;

export default EarnCreate;
