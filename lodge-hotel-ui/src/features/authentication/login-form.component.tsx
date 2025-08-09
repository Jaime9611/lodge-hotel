import { Form } from "@ui/library/Form";
import FormRowVertical from "@ui/library/Form/form-row-vertical.component";

const LoginForm = () => {
  return (
    <Form onSubmit={() => undefined}>
      <FormRowVertical label="Email Address">
        <input type="email" id="email" />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <input type="password" id="password" />
      </FormRowVertical>
      <FormRowVertical>
        <button type="button">Log in</button>
      </FormRowVertical>
    </Form>
  );
};

export default LoginForm;
