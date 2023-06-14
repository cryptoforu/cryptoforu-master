import { Container, Skeleton } from '@chakra-ui/react';
import pMinDelay from 'p-min-delay';
import { lazy, Suspense } from 'react';

import AppHead from '@/Components/AppHead';
import { usePageProps } from '@/Hooks/useTypedPage';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
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

// eslint-disable-next-line react/no-children-prop
EditPost.layout = (page: string) => <AdminLayout children={page} />;

export default EditPost;
