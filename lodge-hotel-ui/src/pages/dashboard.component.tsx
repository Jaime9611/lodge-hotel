import { DashboardFilter, DashboardLayout } from "@features/dashboard";
import { Heading } from "@ui/atoms";
import { Row } from "@ui/atoms/Row";

const Dashboard = () => (
  <>
    <Row>
      <Heading as="h1">Dashboard</Heading>
      <DashboardFilter />
    </Row>
    <Row type="vertical">
      <DashboardLayout />
    </Row>
  </>
);

export default Dashboard;
