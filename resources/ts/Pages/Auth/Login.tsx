import { FormEvent } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import { useForm } from '@inertiajs/react';
import { Label } from '@/Components/Elements/Forms';
import { Button, Checkbox, HStack, Stack, Input } from '@chakra-ui/react';
import { NavLink } from '@/Components/Elements/Navigation';
import { useRoute } from '@/Providers/RouteProvider';
const Login = () => {
  const { route } = useRoute();

  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('login'));
  };
  return (
    <AuthLayout
      title="Admin Login"
      desc="Dont have an account?"
      label="Sign Up"
      to={'register'}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={'6'}>
          <Stack spacing={'4'}>
            <Label errors={errors} label="Login" name="email">
              <Input
                name="email"
                type="text"
                placeholder="E-mail"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
              />
            </Label>
            <Label label="Password" errors={errors} name="password">
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
              />
            </Label>
          </Stack>
          <HStack spacing={'4'}>
            <Checkbox defaultChecked>Remember me</Checkbox>
            <NavLink to="password.request">Forgot Password?</NavLink>
          </HStack>
          <Stack>
            <Button
              variant="primaryBtn"
              type="submit"
              isLoading={processing}
              loadingText="Submitting"
            >
              Sign In
            </Button>
          </Stack>
        </Stack>
      </form>
    </AuthLayout>
  );
};

export default Login;
