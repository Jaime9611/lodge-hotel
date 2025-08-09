import { LoginForm } from "@features/authentication";
import { LoginLayout } from "@ui/layouts";
import { Heading } from "@ui/atoms";

const Login = () => {
  return (
    <LoginLayout>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
