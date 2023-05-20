import { Formik, Form } from 'formik';
import { Button, Stack, Input } from '@chakra-ui/react';
import { btnOutline } from '@/Motion/variants';
import { m } from 'framer-motion';
const SimpleSubscribe = () => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <Stack direction="row" spacing={8} align="stretch">
          <Input name="email" placeholder="Subscribe with email" size="lg" />

          <Button
            as={m.button}
            initial="initial"
            whileHover="hover"
            variants={btnOutline}
            variant="primaryBtn"
            type="submit"
            size="lg"
            textTransform="uppercase"
            fontSize="sm"
            fontWeight="bold"
          >
            Subscribe
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};
export default SimpleSubscribe;
