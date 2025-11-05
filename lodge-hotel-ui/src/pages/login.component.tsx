import { LoginForm } from "@features/authentication";
import { LoginLayout } from "@ui/layouts";
import { Heading } from "@ui/atoms";

const Login = () => {
  return (
    <LoginLayout>
      <div className="flex justify-center">
        <img className="h-36 w-auto text-center" src="default-logo.png" />
      </div>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
