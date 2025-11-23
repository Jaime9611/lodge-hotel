import { LoginForm } from "@features/authentication";
import { LoginLayout } from "@ui/layouts";
import { Heading, Image } from "@ui/atoms";
import { useSettings } from "@features/settings";

const Login = () => {
  const { settings } = useSettings();

  return (
    <LoginLayout>
      <div className="flex justify-center">
        <Image
          className="h-36 w-auto text-center"
          src={settings.logoImage}
          alt="Logo image"
          type="cabin"
        />
      </div>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
