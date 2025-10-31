import CreateUserForm from "@features/authentication/create-user-form.component";
import { Heading, Row } from "@ui/atoms";

const Account = () => {
  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Update your account</Heading>

        <div className="max-w-2xl mt-10">
          <CreateUserForm />
        </div>
      </Row>
    </>
  );
};

export default Account;
