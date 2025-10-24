import { AddCabin, CabinTable } from "@features/cabins";
import { Heading, Row } from "@ui/atoms";

const Cabins = () => (
  <>
    <Row>
      <Heading as="h1">Cabins</Heading>
    </Row>
    <Row type="vertical">
      <CabinTable />
      <AddCabin />
    </Row>
  </>
);

export default Cabins;
