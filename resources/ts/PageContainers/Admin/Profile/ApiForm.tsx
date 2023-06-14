import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { TextField } from '@/Components/Elements/Forms';
import { useRoute } from '@/Providers/RouteProvider';

const ApiForm = () => {
  const { navigate } = useRoute();
  return (
    <Card>
      <CardHeader>
        <Text color={mode('slate.900', 'slate.100')}>Api Key</Text>
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{ token_name: '' }}
          onSubmit={(values, formikHelpers) => {
            navigate('/tokens/create', values, {
              method: 'post',
              onSuccess: () => {
                formikHelpers.setSubmitting(false);
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <TextField
                name={'token_name'}
                label={'Api Key'}
                placeholder={'Api Key'}
              />
              <Stack mt={'8'}>
                <Button
                  width={'full'}
                  type={'submit'}
                  isLoading={isSubmitting}
                  loadingText={'Submitting'}
                >
                  Generate Api Token
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};
export default ApiForm;
