import { LoginForm } from "@features/authentication";
import { LoginLayout } from "@ui/layouts";
import { Heading } from "@ui/atoms";
import { useSettings } from "@features/settings";
import { useRef } from "react";

const Login = () => {
  const { settings } = useSettings();
  const imgRef = useRef("");

  console.log(imgRef);

  return (
    <LoginLayout>
      <div className="flex justify-center">
        <img
          ref={imgRef}
          className="h-36 w-auto text-center"
          src={settings.logoImage}
          onLoad={() => {
            console.log(imgRef);
          }}
        />
      </div>
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};

export default Login;
