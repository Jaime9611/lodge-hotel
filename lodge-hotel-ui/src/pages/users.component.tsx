import { AddUser, UserGrid } from "@features/authentication";
import { Heading } from "@ui/atoms";
import { Row } from "@ui/atoms/Row";

const Users = () => (
  <>
    <Row>
      <Heading as="h1">Users</Heading>
    </Row>
    <Row type="vertical">
      <AddUser />
      <UserGrid />
    </Row>
  </>
);

export default Users;
