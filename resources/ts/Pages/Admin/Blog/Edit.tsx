import { Suspense, lazy } from 'react';
import pMinDelay from 'p-min-delay';
import { Skeleton } from '@chakra-ui/react';
import AppHead from '@/Components/AppHead';
import { Container } from '@chakra-ui/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { usePageProps } from '@/Hooks/useTypedPage';
import FormProvider from '@/Store/useFormProvider';
import type { FormData } from '@/Types/generated';

const DynamicForm = lazy(() =>
  pMinDelay(import(`@/Forms/DynamicForm.js`), 1000)
);

type OptionsProps = {
  id: string | number;
  name: string;
};

interface EditProps {
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

const EditPost = () => {
  const { edit_form } = usePageProps<EditProps>();

  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Container maxWidth="5xl">
          <Suspense fallback={<Skeleton />}>
            <FormProvider
              initialValues={edit_form.initialValues}
              form_route={edit_form.form_route}
              form_schema={edit_form.form_schema}
              method="put"
            >
              <DynamicForm />
            </FormProvider>
          </Suspense>
        </Container>
      </PanelWrapper>
    </>
  );
};

EditPost.layout = (page: string) => <AdminLayout children={page} />;

export default EditPost;
