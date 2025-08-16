import CabinTable from "@features/cabins/cabin-table.component";
import { Heading } from "@ui/atoms";
import { Row } from "@ui/atoms/Row";

// TODO: CREATE COMPONENTS FOR ROW
const Cabins = () => (
  <>
    <Row>
      <Heading as="h2">Cabins</Heading>
    </Row>
    <Row type="vertical">
      <CabinTable />
    </Row>
  </>
);

export default Cabins;
