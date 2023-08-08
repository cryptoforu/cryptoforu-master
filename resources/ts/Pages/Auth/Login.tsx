import { Button, Flex, HStack, Image, Stack } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';

import { CheckBoxField, TextField } from '@/Components/Elements/Forms';
import { NavigationLink } from '@/Components/Elements/Navigation';
import github from '@/images/social/github_240px.png';
import google from '@/images/social/google_240px.png';
import AuthLayout from '@/Layouts/AuthLayout';
import { useRoute } from '@/Providers/RouteProvider';
import { InertiaSharedProps } from '@/types';

const Login = ({ errors }: InertiaSharedProps) => {
  const { route, navigate } = useRoute();

  const initialValues = {
    email: '',
    password: '',
    remember: false,
  };
  const handleSubmit = (
    values: typeof initialValues,
    action: FormikHelpers<typeof initialValues>
  ) => {
    navigate(route('login'), values, {
      method: 'post',
      onSuccess: () => {
        action.setSubmitting(false);
      },
    });
  };

  return (
    <AuthLayout
      title="Admin Login"
      desc="Dont have an account?"
      label="Sign Up"
      to={'register'}
    >
      <Formik
        initialValues={{ email: '', password: '', remember: false }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={'6'}>
              <Stack spacing={'4'}>
                <TextField
                  name={'email'}
                  label={'Your Email'}
                  errors={errors}
                  type={'text'}
                  placeholder={'Email'}
                />
                <TextField
                  name={'password'}
                  label={'password'}
                  errors={errors}
                  type={'password'}
                  placeholder={'Password'}
                />
                <HStack spacing={'4'}>
                  <CheckBoxField
                    name={'remember'}
                    label={'Remember Me'}
                    errors={errors}
                  />
                  <NavigationLink to="password.request">
                    Forgot Password?
                  </NavigationLink>
                </HStack>
                <Stack>
                  <Button
                    colorScheme="twitter"
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                  >
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
      <Flex
        direction={'column'}
        maxW={'full'}
        gap={'4'}
        mt={8}
        align={'center'}
      >
        <form action={'/login/github'} className={'mt-8'}>
          <Button w={'full'} maxW={'md'} type={'submit'}>
            <Image
              w={'24px'}
              h={'24px'}
              align={'center'}
              src={github}
              mr={'2'}
            />
            Login With Github
          </Button>
        </form>
        <form action={'/login/google'} className={'mt-8'}>
          <Button w={'full'} maxW={'md'} variant={'outline'} type={'submit'}>
            <Image
              w={'24px'}
              h={'24px'}
              align={'center'}
              src={google}
              mr={'2'}
            />
            Login With Google
          </Button>
        </form>
      </Flex>
    </AuthLayout>
  );
};

export default Login;
