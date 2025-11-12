import { AddCabin, CabinTable, CabinTableOperations } from "@features/cabins";
import { Heading, Row } from "@ui/atoms";

const Cabins = () => (
  <>
    <Row>
      <Heading as="h1">Cabins</Heading>
      <CabinTableOperations />
    </Row>
    <Row type="vertical">
      <CabinTable />
      <AddCabin />
    </Row>
  </>
);

export default Cabins;
