import { Button } from "@ui/library";
import { Form, FormRowVertical } from "@ui/library/Form";

const LoginForm = () => {
  return (
    <Form onSubmit={() => undefined}>
      <FormRowVertical label="Email Address">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="email"
          id="email"
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="password"
          id="password"
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">Log in</Button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
