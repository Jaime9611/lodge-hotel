import { CabinTable } from "@features/cabins";
import { Heading, Row } from "@ui/atoms";

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
