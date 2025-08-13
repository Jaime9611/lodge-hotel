import CabinTable from "@features/cabins/cabin-table.component";
import { Heading } from "@ui/atoms";

// TODO: CREATE COMPONENTS FOR ROW
const Cabins = () => (
  <>
    <div className="flex justify-between items-center">
      <Heading as="h2">Cabins</Heading>
    </div>
    <div className="flex flex-col gap-6">
      <CabinTable />
    </div>
  </>
);

export default Cabins;
