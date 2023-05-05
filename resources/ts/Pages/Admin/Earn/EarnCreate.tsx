import { lazy } from 'react';
import pMinDelay from 'p-min-delay';
import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { usePageProps } from '@/Hooks/useTypedPage';
import FormProvider from '@/Store/useFormProvider';
import type { FormData } from '@/Types/generated';
import { Container } from '@chakra-ui/react';
import { SuspenseWrapper } from '@/Motion';

const DynamicForm = lazy(() =>
  pMinDelay(import(`@/Forms/DynamicForm.js`), 1000)
);

type OptionsProps = {
  id: string | number;
  name: string;
};

interface EarnCreateProps {
  earn_form: {
    initialValues: {
      id: 'earn_form';
    };
    form_route: string;
    form_schema: {
      id: FormData<OptionsProps>;
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
EarnCreate.layout = (page: string) => <AdminLayout children={page} />;

export default EarnCreate;
