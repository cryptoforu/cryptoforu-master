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

interface CreateProps {
  post_form: {
    initialValues: {
      id: 'create_form';
    };
    form_route: string;
    form_schema: {
      id: FormData<OptionsProps>;
    };
  };
}

const PostCreate = () => {
  const { post_form } = usePageProps<CreateProps>();
  console.log(post_form);
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Container maxWidth="5xl">
          <Suspense fallback={<Skeleton />}>
            <FormProvider
              initialValues={post_form.initialValues}
              form_route={post_form.form_route}
              form_schema={post_form.form_schema}
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
PostCreate.layout = (page: string) => <AdminLayout children={page} />;

export default PostCreate;
