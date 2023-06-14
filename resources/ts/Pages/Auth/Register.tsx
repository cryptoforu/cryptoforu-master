import { Button, Checkbox, HStack, Input, Stack } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

import { Label } from '@/Components/Elements/Forms';
import { NavigationLink } from '@/Components/Elements/Navigation';
import AuthLayout from '@/Layouts/AuthLayout';
import { useRoute } from '@/Providers/RouteProvider';

const Register = () => {
  const { route } = useRoute();
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('register'));
  };
  return (
    <AuthLayout
      title="Admin Register"
      desc="Already have account?"
      label="Login"
      to={'login'}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={'6'}>
          <Stack spacing={'4'}>
            <Label errors={errors} label="Name" name="name">
              <Input
                name="name"
                type="text"
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
              />
            </Label>
            <Label errors={errors} name="email" label="Login">
              <Input
                variant={'auth'}
                name="email"
                type="text"
                placeholder="E-mail"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </Label>
            <Label errors={errors} label="Password" name="password">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
            </Label>
            <Label
              errors={errors}
              label="Confirm Password"
              name="password_confirmation"
            >
              <Input
                variant={'auth'}
                name="password_confirmation"
                type="password"
                placeholder="Confirm Password"
                value={data.password_confirmation}
                onChange={(e) =>
                  setData('password_confirmation', e.target.value)
                }
              />
            </Label>
          </Stack>
          <HStack spacing={'4'}>
            <Checkbox defaultChecked>Remember me</Checkbox>
            <NavigationLink to="password.request">
              Forgot Password?
            </NavigationLink>
          </HStack>
          <Stack>
            <Button
              variant="primaryBtn"
              type="submit"
              isLoading={processing}
              loadingText="Submitting"
            >
              Register
            </Button>
          </Stack>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default Register;
