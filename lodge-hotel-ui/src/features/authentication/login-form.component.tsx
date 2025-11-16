import { Button, Input } from "@ui/atoms";
import { Form, FormRowVertical } from "@ui/atoms/Form";
import { useState, type FormEvent } from "react";
import { useLogin } from "./use-login.hook";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { username: email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Username">
        <Input
          type="text"
          id="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button type="submit" size="large" disabled={isLoading}>
          Log in
        </Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
