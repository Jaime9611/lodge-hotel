import { useUser } from "@features/authentication";
import CreateUserForm from "@features/authentication/create-user-form.component";
import { Heading, Row, Spinner } from "@ui/atoms";

const Account = () => {
  const { isPending, user } = useUser();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row type="vertical">
        <Heading as="h1">Update your account</Heading>

        <div className="max-w-2xl mt-10">
          <CreateUserForm userToEdit={user} />
        </div>
      </Row>
    </>
  );
};

export default Account;
