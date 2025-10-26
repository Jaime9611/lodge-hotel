import { SignUpForm } from "@features/authentication";
import { LoginLayout } from "@ui/layouts";
import { Heading } from "@ui/atoms";

const SignUp = () => {
  return (
    <LoginLayout>
      <Heading as="h4">Create an account</Heading>
      <SignUpForm />
    </LoginLayout>
  );
};

export default SignUp;
